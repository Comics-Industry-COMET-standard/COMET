#!/usr/bin/env python3
"""Validate a COMET data file (CSV) against the current standard.

Checks that:
  - every column maps to a known COMET field (allowing the human label form,
    e.g. "Unit Width" for UnitWidth), and
  - every always-required field is present.

This is a lightweight conformance check for the repository, not the full
COMET Validator product (which is out of scope for this project).

Usage:  python3 tools/validate.py path/to/file.csv
"""
import csv
import glob
import os
import sys
import yaml

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FIELDS_DIR = os.path.join(ROOT, "standard", "fields")


def load_fields():
    fields = []
    for path in sorted(glob.glob(os.path.join(FIELDS_DIR, "*.yaml"))):
        with open(path) as f:
            fields.append(yaml.safe_load(f))
    return fields


def norm(s):
    return "".join(s.split()).lower()


def main():
    if len(sys.argv) != 2:
        print("Usage: python3 tools/validate.py path/to/file.csv")
        return 2
    path = sys.argv[1]

    fields = load_fields()
    # accept both machine name and human label, space-insensitive
    known = {}
    for fld in fields:
        known[norm(fld["name"])] = fld["name"]
        known[norm(fld.get("label", fld["name"]))] = fld["name"]
    required = [f["name"] for f in fields if f["required"] == "yes"]

    with open(path, newline="") as f:
        header = [h.strip() for h in next(csv.reader(f)) if h.strip()]

    present = set()
    unknown = []
    for col in header:
        if norm(col) in known:
            present.add(known[norm(col)])
        else:
            unknown.append(col)

    missing_required = [r for r in required if r not in present]

    print(f"File: {path}")
    print(f"  Columns: {len(header)}  |  mapped to standard: {len(present)}")
    if unknown:
        print(f"  UNKNOWN columns ({len(unknown)}): {', '.join(unknown)}")
    else:
        print("  All columns map to standard fields.")
    if missing_required:
        print(f"  MISSING required fields ({len(missing_required)}): "
              f"{', '.join(missing_required)}")
    else:
        print(f"  All {len(required)} always-required fields present.")

    ok = not unknown and not missing_required
    print("  RESULT:", "PASS" if ok else "ISSUES FOUND")
    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main())
