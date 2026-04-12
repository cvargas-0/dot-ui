Prepare current changes for delivery.

## Steps

1. **Lint** — run `pnpm lint`. If there are errors, fix them before continuing. Do not skip or suppress lint rules.

2. **Build** — run `pnpm build`. If it fails, fix all TypeScript errors before continuing.

3. **Commit** — once both pass, create a commit for the staged files using a conventional commit message:
   - New component: `feat: add Dot[Name] component`
   - Bug fix: `fix: [short description]`
   - Docs: `docs: [short description]`
   - Refactor: `refactor: [short description]`
   - Tooling: `chore: [short description]`

## Rules

- One PR per feature or component — keep PRs small and focused.
- Squash merge on GitHub to keep a clean linear history.
- Never force-push to `main`.
- If the version needs bumping, run `pnpm bump` interactively before committing.
