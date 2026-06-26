---
name: feature-planning
description: Author and refine LexCursor feature "stories" (independently deployable features) under docs/features/ using the _TEMPLATE.md structure. Use when the user asks to plan a feature, write or update a story, break a feature into stories, or fill in docs/features/ or docs/MISSING_FEATURES.md.
---

# Feature Planning (Story Authoring)

Plans LexCursor work as **stories**: one story = one independently deployable
feature. Stories live in `docs/features/<feature-area>/<ID>-<kebab-name>.md` and
follow `docs/features/_TEMPLATE.md`. The backlog index is
`docs/MISSING_FEATURES.md`.

## Use a stronger model for planning

Planning quality compounds — early stories set the pattern every later story (and
the implementing agent) copies. So **delegate the actual drafting/refining of a
story to a stronger reasoning model** rather than writing it inline.

Run the drafting work through the `Task` tool with:

- **subagent_type:** `generalPurpose`
- **model:** `claude-opus-4-8-thinking-high`
- **readonly:** `true` for pure analysis/outline; `false` only when the subagent
  should write the story file itself.

Example invocation:

```
Task(
  subagent_type = "generalPurpose",
  model = "claude-opus-4-8-thinking-high",
  description = "Draft story <ID>",
  prompt = "<context + template + the section/row from MISSING_FEATURES.md to plan>"
)
```

If that model slug is unavailable, tell the user it could not be used and ask
how to proceed — do not silently substitute a weaker model for planning.

## Workflow

```
- [ ] 1. Locate the row in docs/MISSING_FEATURES.md (add it if missing)
- [ ] 2. Read 1–2 existing completed stories as the pattern to match
- [ ] 3. Read docs/features/_TEMPLATE.md and lexcursor_visual_language/DESIGN.md
- [ ] 4. Delegate the draft to the stronger model (see above)
- [ ] 5. Review the draft: fill EVERY template section, keep IDs/links consistent
- [ ] 6. Write the file as docs/features/<area>/<ID>-<kebab-name>.md
- [ ] 7. Link it from docs/MISSING_FEATURES.md (replace the _todo_ marker)
```

## Story rules

- **Independently deployable.** A story must ship on its own behind a flag. If it
  can't, split it or declare the dependency in `Depends on`.
- **Fill every section** of the template. If a section truly does not apply, write
  `N/A —` plus one clause of justification; never delete sections.
- **Testable requirements.** Functional reqs use MUST/SHOULD/MAY; acceptance
  criteria use Given/When/Then and each maps to at least one automated test.
- **Consistent IDs.** Match the `Feature ID` to the backlog row. Filename is
  `<ID>-<kebab-name>.md`. Keep `Depends on` / `Unblocks` in sync both directions.
- **Domain fit.** This is corporate-legal software: account for attorney–client
  privilege, SOC 2, GDPR/CCPA, data residency, retention, and WCAG 2.1 AA.

## Setting the pattern (important)

The first few stories are reference exemplars — AI works off patterns. When the
existing stories are few, prefer **thorough, fully-filled** stories over many thin
ones, and keep structure/heading order identical across stories.

## References

- Template: `docs/features/_TEMPLATE.md`
- Backlog: `docs/MISSING_FEATURES.md`
- Design tokens: `lexcursor_visual_language/DESIGN.md`
- Phasing context: `GAMEPLAN.md`
