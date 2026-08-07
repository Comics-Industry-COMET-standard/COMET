# Moving the docs site to docs.cometstandard.com

A step-by-step runbook for pointing **docs.cometstandard.com** at the GitHub Pages
docs site. Companion to [PUSH-TO-GITHUB.md](PUSH-TO-GITHUB.md), which covers the
initial push and turning Pages on.

**Time:** about 15 minutes of work, then up to an hour of waiting for the
certificate. DNS propagation is usually minutes but can take up to 24h.

---

## Where things stand today

Verified 2026-08-07:

| Thing | Current state |
|---|---|
| DNS host for `cometstandard.com` | **GoDaddy** (`ns57.domaincontrol.com`, `ns58.domaincontrol.com`) |
| `cometstandard.com` (apex) | `160.153.0.24` — the WordPress marketing site |
| `www.cometstandard.com` | CNAME → `cometstandard.com` |
| `docs.cometstandard.com` | **No record — does not resolve** |
| Docs site | Live at `https://comics-industry-comet-standard.github.io/COMET/` |
| Pages custom domain | Not set |
| Build mode | Project URL (`baseUrl: /COMET/`) |

**The WordPress site is not affected by any of this.** You are adding one new
subdomain record. Do not touch the apex `A` record or the `www` CNAME — those are
what keep cometstandard.com serving.

---

## The order matters

Do these in sequence. The two ways to get this wrong are both ordering mistakes:

- **Flipping the build to production before DNS resolves** → the github.io URL
  starts redirecting to a domain that doesn't answer yet, so the site appears down
  to the working group.
- **Setting the custom domain in GitHub Settings before the build emits a `CNAME`
  file** → because this repo deploys via GitHub Actions (not from a branch), the
  custom domain is taken from the `CNAME` file *inside the deployed artifact*. A
  later deploy without that file can reset the setting.

Following the order below avoids both.

---

## Step 1 — Add the DNS record at GoDaddy

This is safe to do at any time. Until the site is switched over, the record simply
resolves to a GitHub host that doesn't recognize the domain yet.

1. Sign in at [godaddy.com](https://godaddy.com) → **My Products** → find
   `cometstandard.com` → **DNS** / **Manage DNS**.
2. **Add** a new record:

   | Field | Value |
   |---|---|
   | **Type** | `CNAME` |
   | **Name** | `docs` |
   | **Value** | `comics-industry-comet-standard.github.io` |
   | **TTL** | 1 hour (or default) |

   > GoDaddy wants the **host only** in Name — enter `docs`, not
   > `docs.cometstandard.com`. Some GoDaddy screens require a trailing dot on the
   > value (`comics-industry-comet-standard.github.io.`); either form is accepted.

3. Save.

**Do not add** an A record for `docs`, and do not change the existing apex or `www`
records.

### Verify it resolved

Run this locally until it returns the GitHub Pages host:

```bash
dig +short docs.cometstandard.com
```

You want to see `comics-industry-comet-standard.github.io.` followed by a set of
GitHub IPs (185.199.108–111.153). Empty output means it hasn't propagated yet —
wait and re-run. **Do not proceed to Step 2 until this resolves.**

---

## Step 2 — Flip the build to production

This makes `baseUrl` `/` instead of `/COMET/` and makes the generator emit
`static/CNAME` containing `docs.cometstandard.com` into the deployed artifact.

Edit `.github/workflows/docs.yml` and uncomment the env block on the **build** step:

```yaml
      - name: Build site (runs the YAML→MDX generator via prebuild)
        run: npm run build
        env:
          COMET_DEPLOY_TARGET: production
```

Commit and push to `main`:

```bash
git add .github/workflows/docs.yml
git commit -m "Deploy docs site to docs.cometstandard.com"
git push
```

Watch **Actions → Docs site**. When the `deploy` job goes green, GitHub reads the
`CNAME` from the artifact and sets the custom domain automatically.

---

## Step 3 — Confirm the domain and enable HTTPS

1. Go to **Settings → Pages** in the repo.
2. Under **Custom domain**, you should now see `docs.cometstandard.com` already
   filled in, with a DNS check passing. If it's empty, type it in and click
   **Save**.
3. Wait for **"Certificate is being provisioned"** to finish — a few minutes,
   occasionally up to an hour.
4. Tick **Enforce HTTPS** once the checkbox becomes available. (It stays greyed out
   until the certificate is issued — that's normal, not an error.)

---

## Step 4 — Verify

```bash
curl -sSI https://docs.cometstandard.com | head -1        # expect HTTP/2 200
```

Then in a browser, check that:

- [ ] `https://docs.cometstandard.com` loads the site with styling intact.
- [ ] Search works (a broken `baseUrl` typically kills search first).
- [ ] A generated field page renders, e.g. `/docs/fields/FullTitle`.
- [ ] A picklist page renders.
- [ ] The implementation guide and changelog render.
- [ ] `http://docs.cometstandard.com` (plain http) redirects to https.
- [ ] `https://cometstandard.com` — the WordPress site — **still works**.

A site that loads but has no CSS and broken links almost always means the build
deployed without `COMET_DEPLOY_TARGET: production`, so it's still expecting
`/COMET/`. Re-check Step 2.

---

## Step 5 — Link it from the WordPress site

Once verified, in WordPress:

- Add a prominent link to `https://docs.cometstandard.com` from the main nav.
- Redirect the existing `/standard/` and implementation-guide URLs to their new
  equivalents, so existing links and search rankings survive.

This is the last item in the project plan's definition of done — no more
authoritative copies in Google Sheets or Drive.

---

## If you need to roll back

Re-comment the `COMET_DEPLOY_TARGET: production` env in `docs.yml` and push. The
next deploy rebuilds at `/COMET/` and removes the `CNAME` from the artifact. Then
clear the custom domain in **Settings → Pages**. The github.io URL works again
immediately; you can leave the GoDaddy CNAME record in place harmlessly.

---

## Troubleshooting

| Symptom | Likely cause |
|---|---|
| `dig` returns nothing | Record not saved, or not propagated yet. Re-check the Name field is `docs` alone. |
| Pages shows "domain does not resolve" | DNS hasn't propagated. Wait, then click **Save** again to re-check. |
| Site loads unstyled, links 404 | Build deployed without `COMET_DEPLOY_TARGET: production`. |
| Custom domain keeps clearing itself | A deploy ran without `CNAME` in the artifact — i.e. the workflow env is still commented out. |
| **Enforce HTTPS** greyed out | Certificate still provisioning. Normal; wait. |
| github.io URL now redirects to a dead domain | Step 2 was done before Step 1 finished. Add/fix the DNS record. |
