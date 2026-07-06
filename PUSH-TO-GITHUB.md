# Pushing the COMET repo to GitHub

This walks you through getting this repository (the standard **and** the new docs site)
onto GitHub and live at **docs.cometstandard.com**.

- **Remote:** `git@github.com:Comics-Industry-COMET-standard/COMET.git`
- **Org / repo:** `Comics-Industry-COMET-standard` / `COMET`
- **Pages host (github.io):** `comics-industry-comet-standard.github.io`

There are three phases: **(A) push the code**, **(B) turn on GitHub Pages so it
auto-deploys**, and **(C) point DNS at it**. You can do A now; B and C are one-time setup.

---

## Before you start

1. **SSH access.** You're using the SSH remote, so you need an SSH key tied to your GitHub
   account that has push access to the `Comics-Industry-COMET-standard` org. Quick check:
   ```bash
   ssh -T git@github.com
   ```
   You should see `Hi <you>! You've successfully authenticated…`. If not, add a key at
   https://github.com/settings/keys (or use the HTTPS remote instead —
   `https://github.com/Comics-Industry-COMET-standard/COMET.git`).

2. **Run from the repo root:**
   ```bash
   cd /Users/brian/Agents/ClaudeCode/COMET-Standard/comet-standard-repo
   ```

3. **What will and won't be committed.** `site/.gitignore` already excludes everything that
   should never be in git — `site/node_modules/`, `site/build/`, `site/.docusaurus/`, and all
   the *generated* pages (`site/docs/fields/`, `site/docs/picklists/`, the copied
   guide/whitepaper/changelog, and `site/src/data/`). Those are rebuilt from the YAML on every
   run, so they don't belong in the repo. **Do** keep `site/package-lock.json` (CI needs it).
   Nothing sensitive is tracked.

---

## Phase A — Push the code

### A1. Initialise git and make the first commit

```bash
cd /Users/brian/Agents/ClaudeCode/COMET-Standard/comet-standard-repo

git init
git branch -M main
git add .
git status            # sanity-check: no node_modules/, no site/build/, no generated docs
git commit -m "COMET standard + Docusaurus reference site (Phase 2)"
```

If `git status` shows `site/node_modules/` or `site/build/`, stop — the ignore file isn't
being picked up. (It should be; `site/.gitignore` handles it.)

### A2. Add the remote and push

The org repo may already exist as an **empty** repo, or it may already have some files. Pick
the matching path.

**If the GitHub repo is empty** (freshly created, no commits):
```bash
git remote add origin git@github.com:Comics-Industry-COMET-standard/COMET.git
git push -u origin main
```

**If the GitHub repo already has commits** (e.g. a README created on the web), you have two
options:

- *Cleanest — you're sure local is the source of truth:* overwrite the remote.
  ```bash
  git remote add origin git@github.com:Comics-Industry-COMET-standard/COMET.git
  git push -u --force-with-lease origin main
  ```
  `--force-with-lease` is the safe force: it refuses if someone else pushed in the meantime.

- *Preserve what's on the remote:* pull and merge first.
  ```bash
  git remote add origin git@github.com:Comics-Industry-COMET-standard/COMET.git
  git pull --rebase origin main   # replay your commit on top of theirs
  # resolve any conflicts, then:
  git push -u origin main
  ```

After this, refresh https://github.com/Comics-Industry-COMET-standard/COMET — your files
should be there, and under the **Actions** tab you'll see two workflows: **Validate standard**
and **Docs site**.

> The **Docs site** run will *build* successfully on this first push, but its **deploy** step
> will fail until you finish Phase B (Pages isn't enabled yet). That's expected.

---

## Phase B — Turn on GitHub Pages (one-time)

The deploy is already automated in `.github/workflows/docs.yml`; you just have to tell GitHub
to accept Actions-based Pages deploys.

1. Go to **Settings → Pages** in the repo.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
   *(Do NOT choose "Deploy from a branch" — the workflow publishes the built site directly.)*
3. That's it. Now re-run the deploy: either

   ```bash
   git commit --allow-empty -m "Trigger Pages deploy"
   git push
   ```

   or open the failed **Docs site** run in the Actions tab and click **Re-run all jobs**.

When the workflow's `deploy` job goes green, the site is live. Until DNS is set (Phase C),
it's reachable at the temporary Pages URL GitHub shows in **Settings → Pages** (it will be
`https://comics-industry-comet-standard.github.io/COMET/` — note asset paths there won't be
perfect because the site is configured for the custom-domain root; that resolves itself once
Phase C is done).

### How deploys work from here on

- **Every push to `main`** → builds and deploys automatically. Edit a field's YAML in
  `standard/fields/…`, push, and the live page updates on its own.
- **Every pull request** that touches `site/`, `standard/`, `docs/`, or `CHANGELOG.md` →
  builds the site as a required check. A broken internal link or a generator error fails the
  PR (that's `onBrokenLinks: 'throw'`), so bad changes can't merge.

---

## Phase C — Point DNS at GitHub (the one step only you can do)

The repo already ships `site/static/CNAME` containing `docs.cometstandard.com`, so GitHub
knows the intended domain. You just need the DNS record at whoever hosts DNS for
`cometstandard.com` (your registrar / DNS provider):

| Type  | Host / Name | Value                                        |
|-------|-------------|----------------------------------------------|
| CNAME | `docs`      | `comics-industry-comet-standard.github.io`   |

Then, back in **Settings → Pages → Custom domain**, enter `docs.cometstandard.com` and save,
and tick **Enforce HTTPS** once the certificate is issued (can take a few minutes to an hour).

DNS propagation is usually minutes but can take up to 24h. Until it resolves, use the
github.io URL.

---

## Verification checklist

- [ ] `git status` before committing showed no `node_modules/`, `build/`, or generated docs.
- [ ] Repo visible at https://github.com/Comics-Industry-COMET-standard/COMET
- [ ] **Actions → Docs site** build job is green.
- [ ] Settings → Pages source = **GitHub Actions**.
- [ ] **Docs site** deploy job is green; Pages URL loads the site.
- [ ] DNS `CNAME docs → comics-industry-comet-standard.github.io` added.
- [ ] Custom domain `docs.cometstandard.com` set in Settings → Pages, HTTPS enforced.
- [ ] https://docs.cometstandard.com loads, search works, a field page renders.

---

## Quick reference — everyday updates after setup

```bash
# change some field YAML, then:
git add standard/
git commit -m "Update <field>: <what changed>"
git push
# → CI regenerates and redeploys the site automatically
```

To preview locally before pushing:
```bash
cd site
npm install      # first time only
npm start        # regenerates + serves at http://localhost:3000
```
