# Field files

Each COMET field lives in its own YAML file in this folder, named by position and field name (for example, `037-IssueSort.yaml`). The docs site, the JSON Schema, and the Table Schema are all generated from these files.

## Writing field notes

The `notes` in each field file are COMET's implementation guidance: how to fill the field consistently. They appear on the field's page on the docs site.

Every field's notes answer the same five questions, in this order, one per line:

1. **What goes in it.** One plain sentence about what the field holds.
2. **Format.** Exact formatting rules, such as date format, capitalization, decimals, or the separator between multiple values.
3. **When empty.** The default value, or what to do when there's nothing to put in it.
4. **Examples.** One normal example, plus one edge case.
5. **Common mistakes.** What people get wrong, and the correct way to do it.

Start each line with its label, like this:

```yaml
notes: |-
  What goes in it: The number used to put the issues of a series in order.
  Format: A decimal number, with up to two decimal places.
  When empty: Use the SeriesNumber.
  Examples: Issue #12 has an IssueSort of 12. If issue #0 falls between issue #14 and issue #15, its IssueSort is 14.5.
  Common mistakes: Leaving it blank, which leaves every retailer to guess the order.
```

Skip a line only when it truly doesn't apply to the field. If a field needs more guidance than the five lines hold, such as an assembly pattern, add it as extra lines after them.

Notes are guidance, not part of the data contract. Adding or improving them never needs a version bump, but it should be recorded in `CHANGELOG.md`.

Adopted 2026-09-30 (Data Wish List G-001).
