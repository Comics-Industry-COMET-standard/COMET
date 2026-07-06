#!/usr/bin/env node
/**
 * COMET reference-site generator.
 *
 * Reads the canonical YAML in ../standard/ and emits the reference pages that
 * Docusaurus renders. NOTHING under the generated output paths is hand-written:
 * every field/picklist page is produced from the YAML at build time, so the site
 * can never drift from the standard. Editing a field's YAML and rebuilding changes
 * the rendered page — that is the whole point.
 *
 * Outputs (all git-ignored, regenerated on every build):
 *   docs/fields/{essential,core,extended}.md   field reference, grouped by tier
 *   docs/picklists/<Name>.md                    one page per picklist
 *   docs/implementation-guide.md                copied from ../docs/
 *   docs/white-paper.md                         copied from ../docs/
 *   docs/changelog.md                           copied from ../CHANGELOG.md
 *   src/data/fields.json                        feeds the master Data Dictionary table
 *   src/data/meta.json                          version + tier counts
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const REPO = path.resolve(__dirname, '..', '..');
const SITE = path.resolve(__dirname, '..');

const FIELDS_DIR = path.join(REPO, 'standard', 'fields');
const PICKLISTS_DIR = path.join(REPO, 'standard', 'picklists');

const DOCS_OUT = path.join(SITE, 'docs');
const FIELDS_OUT = path.join(DOCS_OUT, 'fields');
const PICKLISTS_OUT = path.join(DOCS_OUT, 'picklists');
const DATA_OUT = path.join(SITE, 'src', 'data');

const TIERS = [
  { key: 'essential', label: 'Essential', owner: 'Publisher', blurb: 'The minimum data required to identify a product: title, a primary identifier (UPC/ISBN/EAN), price, and category.' },
  { key: 'core', label: 'Core', owner: 'Publisher', blurb: 'Everything that describes *what the product is* — series, creators, format, content details.' },
  { key: 'extended', label: 'Extended', owner: 'Distributor', blurb: 'Everything that describes *how to order it* — ordering, returns, and distribution logistics.' },
];

// ---------------------------------------------------------------------------
// helpers
// ---------------------------------------------------------------------------

function slug(name) {
  return String(name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function titleCase(s) {
  return String(s).charAt(0).toUpperCase() + String(s).slice(1);
}

/** Render a `required` YAML value as human-readable English. */
function requiredHuman(v) {
  const val = String(v).toLowerCase();
  switch (val) {
    case 'yes': case 'true': return 'Yes';
    case 'no': case 'false': return 'No';
    case 'for_comics': return 'Required for comics';
    case 'for_books': return 'Required for books';
    case 'for_comics_and_graphic_novels': return 'Required for comics and graphic novels';
    case 'for_variant_covers': return 'Required for variant covers';
    case 'for_kids_items': return "Required for kids' items";
    default:
      // Generic fallback for any future conditional value: for_foo_bar -> "Required for foo bar"
      if (val.startsWith('for_')) {
        return 'Required for ' + val.slice(4).replace(/_/g, ' ');
      }
      return titleCase(val);
  }
}

/** Short label for the master-table Required column / filter. */
function requiredShort(v) {
  const val = String(v).toLowerCase();
  if (val === 'yes' || val === 'true') return 'Yes';
  if (val === 'no' || val === 'false') return 'No';
  return 'Conditional';
}

/** Escape a value for safe inline use inside a Markdown table cell. */
function cell(s) {
  return String(s == null ? '' : s).replace(/\|/g, '\\|').replace(/\r?\n/g, ' ').trim();
}

/** Escape pipes for a table cell but keep it otherwise verbatim. */
function tableEscape(s) {
  return String(s == null ? '' : s).replace(/\|/g, '\\|').replace(/\r?\n+/g, '<br />').trim();
}

function readYamlDir(dir) {
  return fs.readdirSync(dir)
    .filter((f) => f.endsWith('.yaml') || f.endsWith('.yml'))
    .map((f) => ({ file: f, data: yaml.load(fs.readFileSync(path.join(dir, f), 'utf8')) }));
}

function rmrf(p) {
  if (fs.existsSync(p)) fs.rmSync(p, { recursive: true, force: true });
}

function ensure(p) {
  fs.mkdirSync(p, { recursive: true });
}

function readVersion() {
  const changelog = fs.readFileSync(path.join(REPO, 'CHANGELOG.md'), 'utf8');
  const m = changelog.match(/^##\s*\[([^\]]+)\]/m);
  return m ? m[1] : 'unknown';
}

// ---------------------------------------------------------------------------
// load data
// ---------------------------------------------------------------------------

const version = readVersion();

const fields = readYamlDir(FIELDS_DIR)
  .map(({ data }) => data)
  .filter(Boolean)
  .sort((a, b) => (Number(a.position) || 0) - (Number(b.position) || 0));

const picklists = readYamlDir(PICKLISTS_DIR).map(({ data }) => data).filter(Boolean);
const picklistByName = new Map(picklists.map((p) => [p.name, p]));

// Which fields reference each picklist (for back-links). Keyed by picklist name.
const usedBy = new Map();
for (const f of fields) {
  const pl = f.picklist;
  if (pl && pl !== 'null' && picklistByName.has(pl)) {
    if (!usedBy.has(pl)) usedBy.set(pl, []);
    usedBy.get(pl).push(f);
  }
}

// ---------------------------------------------------------------------------
// clean output dirs
// ---------------------------------------------------------------------------

rmrf(FIELDS_OUT);
rmrf(PICKLISTS_OUT);
ensure(FIELDS_OUT);
ensure(PICKLISTS_OUT);
ensure(DATA_OUT);

// ---------------------------------------------------------------------------
// 1. Field reference pages, grouped by tier
// ---------------------------------------------------------------------------

function fieldTierPath(tierKey) {
  return `fields/${tierKey}`;
}

let sidebarPos = 20; // fields come after intro(1) and data-dictionary(10)
for (const tier of TIERS) {
  const inTier = fields.filter((f) => String(f.tier).toLowerCase() === tier.key);
  const out = [];
  out.push('---');
  out.push(`id: fields-${tier.key}`);
  out.push(`title: ${tier.label} Fields`);
  out.push(`sidebar_label: ${tier.label}`);
  out.push(`sidebar_position: ${sidebarPos++}`);
  out.push(`slug: /fields/${tier.key}`);
  out.push('---');
  out.push('');
  out.push(`<!-- GENERATED FILE — do not edit. Source: standard/fields/*.yaml (tier: ${tier.key}). -->`);
  out.push('');
  out.push(`# ${tier.label} Fields`);
  out.push('');
  out.push(`**Owner:** ${tier.owner} · **${inTier.length} fields**`);
  out.push('');
  out.push(tier.blurb);
  out.push('');
  out.push(`See the full [Data Dictionary](/data-dictionary) for a searchable table across all tiers.`);
  out.push('');

  for (const f of inTier) {
    const anchor = slug(f.name);
    out.push(`## ${f.label || f.name} {#${anchor}}`);
    out.push('');

    const meta = [];
    meta.push(`**Machine name:** \`${f.name}\``);
    if (f.position != null) meta.push(`**Position:** ${f.position}`);
    if (f.type) meta.push(`**Type:** ${f.type}`);
    if (f.length != null && String(f.length) !== '') meta.push(`**Length:** ${f.length}`);
    meta.push(`**Owner:** ${titleCase(f.owner || tier.owner)}`);
    meta.push(`**Required:** ${requiredHuman(f.required)}`);
    out.push(meta.join(' · '));
    out.push('');

    if (f.description) {
      out.push(String(f.description).trim());
      out.push('');
    }

    if (f.example != null && String(f.example) !== '') {
      out.push(`**Example:** \`${String(f.example).trim()}\``);
      out.push('');
    }

    const pl = f.picklist;
    if (pl && pl !== 'null' && picklistByName.has(pl)) {
      out.push(`**Picklist:** [${pl}](../picklists/${pl}.md)`);
      out.push('');
    } else if (String(f.type).toLowerCase() === 'pick list' && (!pl || pl === 'null')) {
      out.push(`**Picklist:** _controlled vocabulary not yet published_`);
      out.push('');
    }

    if (f.notes) {
      out.push(`**Notes:** ${String(f.notes).trim().replace(/\r?\n+/g, ' ')}`);
      out.push('');
    }

    out.push('---');
    out.push('');
  }

  fs.writeFileSync(path.join(FIELDS_OUT, `${tier.key}.md`), out.join('\n'));
}

// ---------------------------------------------------------------------------
// 2. Picklist pages
// ---------------------------------------------------------------------------

const sortedPicklists = picklists.slice().sort((a, b) => a.name.localeCompare(b.name));

// Picklists index / landing page (also the sidebar category index).
{
  const idx = [];
  idx.push('---');
  idx.push('id: picklists-index');
  idx.push('title: Picklists');
  idx.push('sidebar_label: Overview');
  idx.push('slug: /picklists');
  idx.push('---');
  idx.push('');
  idx.push('<!-- GENERATED FILE — do not edit. Source: standard/picklists/*.yaml -->');
  idx.push('');
  idx.push('# Picklists');
  idx.push('');
  idx.push(`The COMET Standard defines **${picklists.length} controlled vocabularies**. Pick List fields reference one of these lists; each list below links back to the fields that use it.`);
  idx.push('');
  idx.push('| Picklist | Values | Used by |');
  idx.push('| --- | --- | --- |');
  for (const pl of sortedPicklists) {
    const count = pl.count != null ? pl.count : (Array.isArray(pl.values) ? pl.values.length : 0);
    const users = usedBy.get(pl.name) || [];
    const usedLabel = users.length ? `${users.length} field${users.length === 1 ? '' : 's'}` : '—';
    idx.push(`| [${pl.name}](./${pl.name}.md) | ${count} | ${usedLabel} |`);
  }
  idx.push('');
  fs.writeFileSync(path.join(PICKLISTS_OUT, 'index.md'), idx.join('\n'));
}

let plPos = 40;
for (const pl of sortedPicklists) {
  const cols = Array.isArray(pl.source_columns) && pl.source_columns.length
    ? pl.source_columns
    : Object.keys((pl.values && pl.values[0]) || {});
  const rows = Array.isArray(pl.values) ? pl.values : [];
  const count = pl.count != null ? pl.count : rows.length;

  const out = [];
  out.push('---');
  out.push(`id: picklist-${slug(pl.name)}`);
  out.push(`title: ${pl.name}`);
  out.push(`sidebar_label: ${pl.name}`);
  out.push(`sidebar_position: ${plPos++}`);
  out.push(`slug: /picklists/${pl.name}`);
  out.push('---');
  out.push('');
  out.push(`<!-- GENERATED FILE — do not edit. Source: standard/picklists/${pl.name}.yaml -->`);
  out.push('');
  out.push(`# ${pl.name}`);
  out.push('');
  out.push(`Controlled vocabulary · **${count} values**`);
  out.push('');

  // Back-links to fields that use this picklist.
  const users = usedBy.get(pl.name) || [];
  if (users.length) {
    const links = users.map((f) => `[${f.label || f.name}](../fields/${f.tier}.md#${slug(f.name)})`);
    out.push(`**Used by:** ${links.join(', ')}`);
  } else {
    out.push(`**Used by:** _no field currently references this list._`);
  }
  out.push('');

  // Generic table from source_columns + values.
  out.push('| ' + cols.map(cell).join(' | ') + ' |');
  out.push('| ' + cols.map(() => '---').join(' | ') + ' |');
  for (const row of rows) {
    out.push('| ' + cols.map((c) => tableEscape(row ? row[c] : '')).join(' | ') + ' |');
  }
  out.push('');

  fs.writeFileSync(path.join(PICKLISTS_OUT, `${pl.name}.md`), out.join('\n'));
}

// ---------------------------------------------------------------------------
// 3. Copy authored prose (single source of truth stays in the repo root/docs)
// ---------------------------------------------------------------------------

const GH_BLOB = 'https://github.com/Comics-Industry-COMET-standard/COMET/blob/main';

function rewriteRepoLinks(md) {
  // These prose docs live at the repo root and link to sibling repo files
  // (GOVERNANCE.md, LICENSE, CONTRIBUTING.md, …) that are not published pages.
  // Point any repo-relative link at the file on GitHub so nothing breaks.
  return md.replace(/\]\((?!https?:\/\/|#|mailto:|\/)([^)\s]+)\)/g, (m, target) => {
    const clean = target.replace(/^\.\//, '');
    return `](${GH_BLOB}/${clean})`;
  });
}

function copyDoc(srcAbs, destName, frontMatter) {
  const raw = fs.readFileSync(srcAbs, 'utf8');
  const body = rewriteRepoLinks(raw);
  const fm = ['---', ...Object.entries(frontMatter).map(([k, v]) => `${k}: ${v}`), '---', ''].join('\n');
  fs.writeFileSync(path.join(DOCS_OUT, destName), fm + '\n' + body);
}

copyDoc(path.join(REPO, 'docs', 'implementation-guide.md'), 'implementation-guide.md', {
  id: 'implementation-guide',
  title: 'Implementation Guide',
  sidebar_label: 'Implementation Guide',
  sidebar_position: 60,
  slug: '/implementation-guide',
});

copyDoc(path.join(REPO, 'docs', 'white-paper.md'), 'white-paper.md', {
  id: 'white-paper',
  title: 'White Paper',
  sidebar_label: 'White Paper',
  sidebar_position: 61,
  slug: '/white-paper',
});

copyDoc(path.join(REPO, 'CHANGELOG.md'), 'changelog.md', {
  id: 'changelog',
  title: 'Changelog',
  sidebar_label: 'Changelog',
  sidebar_position: 70,
  slug: '/changelog',
});

// ---------------------------------------------------------------------------
// 4. Data for the master Data Dictionary table + site meta
// ---------------------------------------------------------------------------

const tableRows = fields.map((f) => ({
  name: f.name,
  label: f.label || f.name,
  tier: String(f.tier).toLowerCase(),
  owner: titleCase(f.owner || ''),
  required: requiredShort(f.required),
  requiredHuman: requiredHuman(f.required),
  type: f.type || '',
  length: f.length != null ? String(f.length) : '',
  position: Number(f.position) || 0,
  anchor: slug(f.name),
  href: `/${fieldTierPath(String(f.tier).toLowerCase())}`,
  picklist: f.picklist && f.picklist !== 'null' && picklistByName.has(f.picklist) ? f.picklist : null,
}));

fs.writeFileSync(path.join(DATA_OUT, 'fields.json'), JSON.stringify(tableRows, null, 2));

const meta = {
  version,
  totalFields: fields.length,
  totalPicklists: picklists.length,
  tiers: TIERS.map((t) => ({
    key: t.key,
    label: t.label,
    owner: t.owner,
    count: fields.filter((f) => String(f.tier).toLowerCase() === t.key).length,
  })),
  requiredCount: fields.filter((f) => requiredShort(f.required) === 'Yes').length,
  conditionalCount: fields.filter((f) => requiredShort(f.required) === 'Conditional').length,
};
fs.writeFileSync(path.join(DATA_OUT, 'meta.json'), JSON.stringify(meta, null, 2));

// ---------------------------------------------------------------------------
console.log(
  `Generated: ${fields.length} fields across ${TIERS.length} tiers, ` +
  `${picklists.length} picklists, version ${version}.`
);
