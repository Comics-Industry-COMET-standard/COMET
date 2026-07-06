import React, { useMemo, useState } from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import fields from '@site/src/data/fields.json';

// Client-side searchable / sortable / filterable master table of every COMET
// field. Data comes from src/data/fields.json, which is generated from the
// canonical YAML at build time — this table is never hand-maintained.

const TIER_ORDER = { essential: 0, core: 1, extended: 2 };

function Badge({ kind, children }) {
  return <span className={`comet-badge comet-badge--${kind}`}>{children}</span>;
}

function TierBadge({ tier }) {
  return <Badge kind={tier}>{tier.charAt(0).toUpperCase() + tier.slice(1)}</Badge>;
}

function RequiredBadge({ required }) {
  const kind = required === 'Yes' ? 'yes' : required === 'Conditional' ? 'conditional' : 'no';
  return <Badge kind={kind}>{required}</Badge>;
}

function FieldLink({ row }) {
  const href = useBaseUrl(row.href);
  return <Link to={`${href}#${row.anchor}`}>{row.label}</Link>;
}

const COLUMNS = [
  { key: 'name', label: 'Field' },
  { key: 'tier', label: 'Tier' },
  { key: 'owner', label: 'Owner' },
  { key: 'required', label: 'Required' },
  { key: 'type', label: 'Type' },
  { key: 'length', label: 'Length' },
];

export default function DataDictionary() {
  const [query, setQuery] = useState('');
  const [tier, setTier] = useState('all');
  const [required, setRequired] = useState('all');
  const [sortKey, setSortKey] = useState('position');
  const [sortDir, setSortDir] = useState('asc');

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    let out = fields.filter((f) => {
      if (tier !== 'all' && f.tier !== tier) return false;
      if (required !== 'all' && f.required !== required) return false;
      if (q) {
        const hay = `${f.name} ${f.label} ${f.type} ${f.owner} ${f.picklist || ''}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    out = out.slice().sort((a, b) => {
      let av;
      let bv;
      if (sortKey === 'position') {
        av = a.position;
        bv = b.position;
      } else if (sortKey === 'tier') {
        av = TIER_ORDER[a.tier];
        bv = TIER_ORDER[b.tier];
      } else if (sortKey === 'length') {
        av = Number(a.length) || 0;
        bv = Number(b.length) || 0;
      } else if (sortKey === 'name') {
        av = a.label.toLowerCase();
        bv = b.label.toLowerCase();
      } else {
        av = String(a[sortKey] || '').toLowerCase();
        bv = String(b[sortKey] || '').toLowerCase();
      }
      if (av < bv) return sortDir === 'asc' ? -1 : 1;
      if (av > bv) return sortDir === 'asc' ? 1 : -1;
      // stable secondary sort by position
      return a.position - b.position;
    });
    return out;
  }, [query, tier, required, sortKey, sortDir]);

  function toggleSort(key) {
    const col = key === 'name' ? 'name' : key;
    if (sortKey === col) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(col);
      setSortDir('asc');
    }
  }

  function arrow(key) {
    const col = key === 'name' ? 'name' : key;
    if (sortKey !== col) return <span className="dd-arrow"> ↕</span>;
    return <span className="dd-arrow">{sortDir === 'asc' ? ' ▲' : ' ▼'}</span>;
  }

  return (
    <div>
      <div className="dd-controls">
        <div className="dd-control dd-search">
          <label htmlFor="dd-q">Search</label>
          <input
            id="dd-q"
            type="text"
            placeholder="Filter by name, type, owner…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="dd-control">
          <label htmlFor="dd-tier">Tier</label>
          <select id="dd-tier" value={tier} onChange={(e) => setTier(e.target.value)}>
            <option value="all">All tiers</option>
            <option value="essential">Essential</option>
            <option value="core">Core</option>
            <option value="extended">Extended</option>
          </select>
        </div>
        <div className="dd-control">
          <label htmlFor="dd-req">Required</label>
          <select id="dd-req" value={required} onChange={(e) => setRequired(e.target.value)}>
            <option value="all">All</option>
            <option value="Yes">Required</option>
            <option value="Conditional">Conditional</option>
            <option value="No">Optional</option>
          </select>
        </div>
        <div className="dd-count">
          {rows.length} of {fields.length} fields
        </div>
      </div>

      <div className="dd-table-wrap">
        <table className="dd-table">
          <thead>
            <tr>
              {COLUMNS.map((c) => (
                <th key={c.key} onClick={() => toggleSort(c.key)}>
                  {c.label}
                  {arrow(c.key)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.name}>
                <td>
                  <FieldLink row={row} />
                  <br />
                  <code>{row.name}</code>
                </td>
                <td><TierBadge tier={row.tier} /></td>
                <td>{row.owner}</td>
                <td title={row.requiredHuman}><RequiredBadge required={row.required} /></td>
                <td>{row.type}</td>
                <td>{row.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && <div className="dd-empty">No fields match those filters.</div>}
      </div>
    </div>
  );
}
