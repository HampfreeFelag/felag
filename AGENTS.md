# FÉLAG — AI Agent Rules

## BUILD VERIFICATION RULE (MANDATORY)

**Before executing `git commit` and `git push`, the agent MUST run the full verification suite (`npm run verify`).**

If verification fails with errors, the agent MUST:
1. Analyze the error log
2. Fix the code
3. Re-run `npm run verify` until all checks pass

A commit is only allowed after successful verification.

### Verification command
```bash
npm run verify
```

### What it checks
1. **Build** — `astro build` succeeds with "Complete!"
2. **JSON-LD** — no raw `JSON.stringify` in `dist/` HTML/XML
3. **404 paths** — no `saga/saga` duplicate paths in `dist/`
4. **NUL bytes** — no null bytes in any `.md` files under `src/content`
5. **Internal links** — no broken saga links in markdown content

### Expected output
All 5 checks pass with green "OK" messages, ending with:
```
=== ВСЕ ПРОВЕРКИ ПРОЙДЕНЫ УСПЕШНО ===
```

### Common failure patterns to watch for
- CSS syntax errors (unclosed blocks, corrupted files)
- Import resolution errors (wrong relative paths)
- TypeScript type errors
- Missing dependencies
- NUL bytes in markdown files
- Duplicate `saga/saga` paths in RelatedPosts or RSS
