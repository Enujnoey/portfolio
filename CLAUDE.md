@AGENTS.md

# Portfolio Content Rules

## Project detail overview field formats

- `background`: string (paragraph, `whitespace-pre-line` for line breaks via `\n`)
- `goal` (Purpose): **array** — renders as bullet list
- `role` (My Role): **array** — renders as bullet list
- `duration`: **array** — renders as bullet list

Example:
```json
"overview": {
  "background": "문단 형식으로 작성합니다.",
  "goal": ["목적 항목 1", "목적 항목 2"],
  "role": ["역할 항목 1", "역할 항목 2"],
  "duration": ["2025.01 – 2025.03 (3개월)"]
}
```

## NDA rules

- Sample sizes: use `"00명"` / `"00 participants"`
- Feature counts: use `"00개"` / `"00 features"`
- No product codenames (e.g. LW1, OV1)
- Findings: abstracted to pattern level — no specific feature names

## Other conventions

- Korean descriptions: no trailing periods
- English outcome label for 조사 규모: `"Sample Size"` (not "Study scale")
- Findings per project: 3
- Card `description` and `detail.hero` are separate fields for independent line break control
