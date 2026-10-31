# FÉLAG — AI Agent Rules

## BUILD VERIFICATION RULE (MANDATORY)

**Before executing `git commit` and `git push`, the agent MUST run the project build command (`npm run build`).**

If the build fails with errors, the agent MUST:
1. Analyze the error log
2. Fix the code
3. Re-run the build until it succeeds

A commit is only allowed after a successful local build.

### Build command
```bash
npm run build
```

### Expected output
- All pages built successfully
- No `[ERROR]` lines in the output
- Final line: `✓ Complete!`

### Common failure patterns to watch for
- CSS syntax errors (unclosed blocks, corrupted files)
- Import resolution errors (wrong relative paths)
- TypeScript type errors
- Missing dependencies
