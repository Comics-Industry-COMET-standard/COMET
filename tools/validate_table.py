#!/usr/bin/env python3
"""Validate a COMET CSV file against the Frictionless Table Schema.

Real COMET files carry a subset of the 125 fields in varying order, so the
schema is synced to each file's actual header (schema_sync). Columns present
are validated for type, required status, and picklist (enum) membership.

Usage:  python3 tools/validate_table.py path/to/file.csv
Requires: pip install frictionless
"""
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCHEMA = os.path.join(ROOT, "schema", "comet.table-schema.json")


def main():
    if len(sys.argv) != 2:
        print("Usage: python3 tools/validate_table.py path/to/file.csv")
        return 2
    path = sys.argv[1]

    try:
        import json
        from frictionless import Resource, Schema, Detector
    except ImportError:
        print("frictionless is not installed. Run: pip install frictionless")
        return 2

    # Load as a dict (not by path) so Frictionless doesn't apply path-safety
    # resolution to an absolute schema location.
    with open(SCHEMA, encoding="utf-8") as fh:
        schema = Schema.from_descriptor(json.load(fh))
    resource = Resource(path=path, schema=schema, detector=Detector(schema_sync=True))
    report = resource.validate()

    print(f"File: {path}")
    print(f"  Valid: {report.valid}")
    for task in report.tasks:
        if task.errors:
            print(f"  {len(task.errors)} issue(s):")
            for e in task.errors[:50]:
                field = getattr(e, "field_name", "")
                cell = getattr(e, "cell", "")
                row = getattr(e, "row_number", "")
                loc = f"row {row}, {field}" if field else e.type
                print(f"    - [{e.type}] {loc}: {getattr(e, 'note', '')[:80]}"
                      + (f"  value={cell!r}" if cell != "" else ""))
            if len(task.errors) > 50:
                print(f"    ... and {len(task.errors) - 50} more")
    return 0 if report.valid else 1


if __name__ == "__main__":
    sys.exit(main())
