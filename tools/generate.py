#!/usr/bin/env python3
"""Generate schema/comet.schema.json from standard/fields/*.yaml.

The field YAML files are the single source of truth. This script rebuilds the
machine-readable JSON Schema from them. Do not hand-edit the schema.

Usage:  python3 tools/generate.py [--check]
  --check : exit non-zero if the on-disk schema differs from the generated one
            (used in CI to ensure the schema is always up to date).
"""
import json
import os
import sys
import glob
import yaml

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FIELDS_DIR = os.path.join(ROOT, "standard", "fields")
SCHEMA_PATH = os.path.join(ROOT, "schema", "comet.schema.json")
VERSION = "1.1.11"


def load_fields():
    fields = []
    for path in sorted(glob.glob(os.path.join(FIELDS_DIR, "*.yaml"))):
        with open(path) as f:
            fields.append(yaml.safe_load(f))
    fields.sort(key=lambda d: d["position"])
    return fields


def build_schema(fields):
    props = {}
    required = []
    for fld in fields:
        entry = {
            "type": "string",
            "x-tier": fld["tier"],
            "x-required": fld["required"],
        }
        # YearMonth fields carry a YYYY-MM value; constrain the string shape.
        if fld.get("type") == "YearMonth":
            entry["pattern"] = r"^\d{4}-\d{2}$"
            entry["x-format"] = "yearmonth"
        if fld.get("picklist"):
            entry["x-picklist"] = fld["picklist"]
        props[fld["name"]] = entry
        if fld["required"] == "yes":
            required.append(fld["name"])
    return {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "$id": "https://cometstandard.com/schema/comet.schema.json",
        "title": "COMET Standard",
        "description": "Machine-readable schema for the COMET comics metadata "
                       "standard, generated from standard/fields/*.yaml",
        "version": VERSION,
        "type": "object",
        "properties": props,
        "required": required,
        "additionalProperties": False,
    }


def main():
    check = "--check" in sys.argv
    fields = load_fields()
    schema = build_schema(fields)
    generated = json.dumps(schema, indent=2)

    if check:
        with open(SCHEMA_PATH) as f:
            current = f.read().rstrip("\n")
        if current != generated:
            print("ERROR: schema/comet.schema.json is out of date. "
                  "Run: python3 tools/generate.py")
            return 1
        print("Schema is up to date.")
        return 0

    os.makedirs(os.path.dirname(SCHEMA_PATH), exist_ok=True)
    with open(SCHEMA_PATH, "w") as f:
        f.write(generated + "\n")
    print(f"Wrote {SCHEMA_PATH} ({len(fields)} fields, "
          f"{len(schema['required'])} required).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
