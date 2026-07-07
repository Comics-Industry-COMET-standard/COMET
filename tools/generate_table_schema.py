#!/usr/bin/env python3
"""Generate a Frictionless Table Schema from standard/fields/*.yaml.

COMET data is exchanged as flat/tabular files (CSV), so a Frictionless
Table Schema (https://specs.frictionlessdata.io/table-schema/) is the natural
machine-readable contract: it validates a CSV column-by-column, including
types, required columns, and controlled-vocabulary (picklist) values.

The field and picklist YAML files remain the single source of truth; this
script derives the schema from them. Do not hand-edit the output.

Usage:  python3 tools/generate_table_schema.py [--check]
"""
import glob
import json
import os
import sys
import yaml

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FIELDS_DIR = os.path.join(ROOT, "standard", "fields")
PICKLIST_DIR = os.path.join(ROOT, "standard", "picklists")
OUT = os.path.join(ROOT, "schema", "comet.table-schema.json")
VERSION = "1.1.11"

# COMET field type -> Frictionless type.
# Note: "Number" covers identifiers (UPC/ISBN/EAN) where leading zeros and
# UPC supplements matter, so it maps to string to avoid false validation
# failures. Numeric-range validation can be tightened per-field later.
TYPE_MAP = {
    "Text": "string",
    "Number": "string",
    "Decimal": "number",
    "Date": "date",
    "YearMonth": "yearmonth",
    "Y/N": "boolean",
    "Composite": "string",
    "Pick List": "string",
}

# Human-readable rendering of the conditional-required slugs.
REQUIRED_LABEL = {
    "yes": "Always required",
    "no": "Optional",
    "for_comics": "Required for comics",
    "for_books": "Required for books",
    "for_comics_and_graphic_novels": "Required for comics & graphic novels",
    "for_variant_covers": "Required for variant (non-main) covers",
    "for_kids_items": "Required for kids' items",
}


def picklist_value_column(pl):
    """Which column in a picklist holds the canonical value used in data files."""
    if pl["name"] == "ProductCategories":
        return "ProductCategory"
    return pl["source_columns"][0]


def load_picklist_enums():
    enums = {}
    for path in glob.glob(os.path.join(PICKLIST_DIR, "*.yaml")):
        pl = yaml.safe_load(open(path))
        col = picklist_value_column(pl)
        values = [str(v[col]).strip() for v in pl["values"] if v.get(col)]
        enums[pl["name"]] = values
    return enums


def load_fields():
    fields = [yaml.safe_load(open(p)) for p in glob.glob(os.path.join(FIELDS_DIR, "*.yaml"))]
    fields.sort(key=lambda d: d["position"])
    return fields


def build_schema(fields, enums):
    out_fields = []
    for f in fields:
        entry = {
            "name": f.get("label", f["name"]),  # column header as it appears in files
            "title": f["name"],
            "type": TYPE_MAP.get(f["type"], "string"),
        }
        desc = (f.get("description", "") or "").strip().split("\n")[0]
        req_label = REQUIRED_LABEL.get(f["required"], f["required"])
        entry["description"] = (desc + f"  [{req_label}]").strip()

        if entry["type"] == "boolean":
            entry["trueValues"] = ["Y", "y", "Yes", "true"]
            entry["falseValues"] = ["N", "n", "No", "false"]

        constraints = {}
        if f["required"] == "yes":
            constraints["required"] = True
        # length as maxLength when it's a plain integer
        length = str(f.get("length", "")).strip()
        if length.isdigit() and entry["type"] == "string":
            constraints["maxLength"] = int(length)
        # picklist -> enum
        if f.get("picklist") and f["picklist"] in enums:
            constraints["enum"] = enums[f["picklist"]]

        if constraints:
            entry["constraints"] = constraints

        # preserve COMET metadata as custom properties
        entry["cometTier"] = f["tier"]
        entry["cometOwner"] = f["owner"]
        entry["cometRequired"] = f["required"]
        if f.get("picklist"):
            entry["cometPicklist"] = f["picklist"]
        out_fields.append(entry)

    return {
        "$schema": "https://specs.frictionlessdata.io/schemas/table-schema.json",
        "name": "comet-standard",
        "title": "COMET Standard",
        "description": "Frictionless Table Schema for the COMET comics metadata "
                       "standard. Generated from standard/fields/*.yaml. Validates "
                       "COMET CSV files by column, type, required status, and "
                       "controlled-vocabulary (picklist) values.",
        "version": VERSION,
        "fields": out_fields,
        "missingValues": [""],
    }


def main():
    check = "--check" in sys.argv
    schema = build_schema(load_fields(), load_picklist_enums())
    generated = json.dumps(schema, indent=2, ensure_ascii=False)

    if check:
        current = open(OUT, encoding="utf-8").read().rstrip("\n")
        if current != generated:
            print("ERROR: schema/comet.table-schema.json is out of date. "
                  "Run: python3 tools/generate_table_schema.py")
            return 1
        print("Table Schema is up to date.")
        return 0

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w", encoding="utf-8") as f:
        f.write(generated + "\n")
    n_enum = sum(1 for x in schema["fields"] if "enum" in x.get("constraints", {}))
    n_req = sum(1 for x in schema["fields"] if x.get("constraints", {}).get("required"))
    print(f"Wrote {OUT}")
    print(f"  {len(schema['fields'])} fields | {n_req} required | {n_enum} with picklist enums")
    return 0


if __name__ == "__main__":
    sys.exit(main())
