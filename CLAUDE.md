# PCam website agent instructions

## Operating model

This repository is **local-first**. The user's local Git repository is the source of truth for versions and rollback.

1. Work locally.
2. Run `npm run dev` for interactive review.
3. Run `npm run check` and `npm run build` before proposing a release.
4. Commit the intended revision to local Git.
5. **Never deploy unless the user explicitly asks to publish/deploy.**
6. Production deployment is `npm run deploy:production`; staging is `npm run deploy:staging`.
7. Deployment scripts reject a dirty Git tree by default.

Do not make production changes through the Cloudflare dashboard as a substitute for repository changes. Configuration belongs in Git unless it is a secret.

## Architecture

- Astro owns routing and static generation.
- English is implemented under `/en/`; `de`, `it`, `fr`, `es`, `pt` are reserved in Astro i18n configuration.
- React is for bounded interactive islands only. Do not turn the public site into a client-side SPA.
- Public acquisition IA: Solutions -> Applications -> Customer evidence -> Contact.
- Existing-customer tasks live under `/support/`.
- Partner workspace is currently a non-functional, noindex UX mock.
- SQL, license SOAP, protected downloads and authentication are intentionally not connected in this prototype.
- Canonical content identity is independent from localized URL slugs. Use `src/data/i18n/routes.json` and the canonical IDs in product/story facts; never derive a translated URL by replacing only the locale prefix.

## Content rules

- Preserve engineering meaning; do not invent product specifications or customer results.
- Claims and selected technical values should be traceable to `CONTENT_SOURCES.md` and/or the legacy source URL in product/story facts.
- Prefer buyer problems and operational outcomes over generic marketing adjectives.
- Keep product pages technically useful: problem, fit, capabilities, outcomes, specs, interfaces, evidence.
- Keep case-study pages explicit about what is reported versus what still needs customer validation.
- Canonical facts are language-neutral source records. Do not translate or rewrite facts in `src/data/products/facts.json` or `src/data/stories/facts.json` to make localized prose read better; put localized presentation in the locale copy instead.

## Multilingual change workflow

Localized content is **never propagated automatically** between languages.

When a request adds, removes, or changes user-visible content in one language and at least one other locale is already implemented:

1. Identify the canonical route/content ID and every implemented locale that already contains the equivalent content.
2. Determine which translated pages, UI strings, product copy, story narrative, SEO metadata, internal links, or localized slugs are affected.
3. **Ask the user whether the change should also be applied to those existing languages.** In the same question, propose concrete translations for each affected locale so the user can approve, edit, or decline them. Do not make the translations first and ask afterward.
4. Apply only the locales the user explicitly approves. Never infer approval from the fact that equivalent pages exist.
5. A source-language product/story/UI edit must increment its `revision`. Existing translated copies become stale until they are explicitly reviewed. For non-source locale copy, `reviewedAgainstRevision` records the source revision that the user/editor actually reviewed.
6. If the user explicitly decides that a translated copy needs no textual change, `reviewedAgainstRevision` may advance only after that decision and only when the existing translation remains semantically correct. Do not use the field merely to silence the audit.
7. A newly added canonical product or customer story requires an explicit decision for every already implemented locale before the multilingual audit can pass.
8. Localized slugs may differ by language. Add or update the explicit route/content mapping; never mechanically mirror the English slug.
9. Preserve original customer evidence. A translated customer quotation must live in localized story copy; the reported source quotation remains unchanged in canonical facts.
10. Run `npm run audit:translations` after any locale, route, UI copy, product copy, or story copy change. A stale translation is a review task, not permission to machine-update it.

This workflow applies to updates as well as new content. The goal is to keep languages aligned by explicit editorial decision without forcing them to be literal copies of one another.

## Media rules

- Existing PCam media is preferred over generic stock imagery.
- `src/data/media.json` maps legacy assets to stable local targets.
- Run `npm run media:sync` on a networked local workstation to retrieve protected legacy `/images/Module...` files using read-only GET requests.
- The migration target is Cloudflare. During prototype development the files can live in `public/media`; later the same manifest should be mapped to Cloudflare static assets/R2/Images without changing editorial content.
- Cloudflare Stream UIDs belong in `src/data/videos.ts` or a generated map; do not re-upload videos unless a migration decision explicitly requires it.

## Safety

- Never modify the legacy WordPress or SQL systems while doing content discovery unless the user explicitly authorizes a write operation.
- Never commit secrets, SQL credentials, API tokens or Cloudflare tokens.
- Use `.env` / Cloudflare secrets for future runtime credentials.

## Architecture Decision Records

`docs/adr/` holds the durable reasoning behind the redesign. This file states
the current rules; ADRs state why they exist and what it takes to change them.

**Before changing** information architecture, public URLs or routing, the
rendering model, React usage, the deployment model, editorial policy, media
architecture, or integration/authentication boundaries: read
[`docs/adr/ADR-DIGEST.md`](docs/adr/ADR-DIGEST.md) first — a keyword table plus
one current-state summary per ADR. Open a full ADR only when your change
touches its substance. Never read all twelve to answer one question.

**All twelve ADRs are currently `Proposed`, so none is binding.** Treat them as
the intended direction under review. Do not describe a change as violating an
"accepted" ADR while that remains true.

- Reading/navigating ADRs → the `adr-lookup` skill.
- Writing, amending, accepting or superseding an ADR → the `adr-authoring`
  skill, which carries the full propagation checklist.
- Do not mark an ADR `Accepted` without an explicit decision from the user.
- If a requested change conflicts with an ADR, state the conflict and offer a
  superseding ADR; do not silently implement against it.
- `npm run audit:adr` (inside `npm run check`) fails when the ADR files, the
  digest, the master index and `adr-index.json` disagree.

## Git discipline

Commits are GPG-signed and carry an
OpenTimestamps attestation: `gpg.program` points at `ots-git-gpg-wrapper.sh`,
which signs and then stamps against the OpenTimestamps calendars. Identity and
signing are pinned in this repository's local `.git/config`, so they do not
depend on global settings.

A fresh commit verifies as `Pending confirmation in Bitcoin blockchain` —
that is normal, not a failure. On-chain attestation takes hours; upgrade the
proof later with `ots upgrade`. History up to and including
`docs: adopt Conventional Commits for commit subjects` was signed without a
timestamp and is not retro-stamped.

After each logical unit of work:

- create a git commit
- push to the current branch

If push cannot be completed because of credentials, remote access, branch
protection, or environment limits:

- say so explicitly
- do not claim the push succeeded

Commit messages must be short, specific, and scoped to the actual change.
Do not leave completed logical units of work uncommitted.
**Do not add a "Co-Authored-By" trailer to any commit message.**

**No external-project citations.** Never cite another project by name, by
repository name, by tool name, or as an acknowledged source of a pattern —
not in code, comments, documentation, ADRs, skills, or commit messages. This
repository's conventions stand on their own. Write the rule, not its
provenance: "Subjects follow Conventional Commits", never "as project X
does".

### Commit message format

Subjects follow Conventional Commits:

```
type(scope): imperative subject, lower case, no trailing period
```

The scope is optional but preferred. Wrap the subject at ~72 characters and
put the reasoning in the body — the body is the durable change record, since
there is no changelog.

| Type | Use for |
|---|---|
| `feat` | new user-visible capability or content system |
| `fix` | corrected behaviour, including layout and accessibility defects |
| `docs` | CLAUDE.md, ADRs, README and other prose |
| `chore` | repo plumbing with no runtime effect (git config, ignore rules) |
| `refactor` | restructuring with no behaviour change |
| `build` / `ci` | build pipeline, deploy scripts, checks |

Scopes in use: `adr`, `git`, `site`, `nav`, `brand`, `media`, `tools`, `deps`.

Examples:

```
feat(nav): highlight the active section and add a breadcrumb
fix(site): stop long product names widening the page on mobile
docs(adr): convert to the canonical template, revert all to proposed
chore(git): add .gitattributes, cover wrangler/env gaps in .gitignore
```

Never commit or push unless the user asks. Committing is not deploying:
deployment stays gated on the explicit request described in *Operating model*.

### Multi-fix prompts

When a single prompt asks for **more than one unrelated fix** (different files,
different bugs, different concerns — not the natural sub-tasks of one feature),
do not bundle them into a single commit. Instead, for each fix in turn:

1. implement only that one fix
2. run the impacted checks (`npm run check`, and `npm run build` when routing,
   config or assets changed); verify they pass
3. create one commit scoped to that fix, with a message describing only it
4. push, then move to the next fix

Each fix becomes one commit — independently reviewable, revertable and
bisectable. A multi-fix prompt produces N commits, not one.

Related sub-tasks of the same fix (a component change plus its styles plus a
doc cross-reference) belong in the same commit — they are not "different
fixes". The discriminator is whether the changes share a single root cause or
feature; if yes, one commit; if no, separate commits.

Do not bundle "while I'm here" cleanups into a fix commit. If unrelated drift
is discovered mid-fix, either note it explicitly and defer it, or handle it as
its own follow-up commit after the in-scope fix is committed.

### Shared-stylesheet caveat

`src/styles/global.css` is touched by nearly every change, so several
unrelated fixes can collide in one file. That is not a licence to bundle
them: stage the specific hunks per commit. If the hunks genuinely cannot be
separated, say so in the commit message rather than silently merging concerns.

### Debugging hygiene

When chasing a bug across several commits, do not squash the chain into a
single "fix X" commit. Each independent root cause deserves its own commit,
even when the surface symptom is the same. The discriminator is "single root
cause vs. distinct root causes", not "the user saw the same problem".

Clean up before committing: throw-away diagnostic instrumentation, one-shot
fixtures, and commented-out code from earlier hypotheses. Keep genuine
operational signals — a warning on a real fallback path, or a log of a
previously silent swallowed error — those are the fix, not noise.
