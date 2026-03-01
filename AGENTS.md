# Project Instructions


## Testing Chatbot

When testing scripts uv is used, so use `uv run python` to run scripts.


## Frontend
pnpm is our package manager
React + Material UI is our frontend framework.
Keep all frontend files in the frontend directory, this includes pnpm related files.

## Cursor Cloud specific instructions

### Architecture
- **Frontend**: React + Vite + Material UI at `frontend/` (port 3000). See `frontend/README.md` for scripts.
- **Backend**: FastAPI + LangGraph at `backend.py` (port 8000). Uses Anthropic Claude `claude-3-5-haiku-20241022`.
- **Vector DB**: Milvus Lite (embedded, file-based `resume_db.db`) — no separate server needed.

### Running services
- **Backend**: `source /workspace/.venv/bin/activate && python -m uvicorn backend:app --host 0.0.0.0 --port 8000` from `/workspace`. Do NOT use `uv run uvicorn` — it tries to build the project via `pyproject.toml` which fails due to the flat package layout.
- **Frontend**: `pnpm dev --host 0.0.0.0` from `/workspace/frontend`.
- The `ANTHROPIC_API_KEY` env var must be set for the chatbot to work.

### Gotchas
- `uv run` fails because `pyproject.toml` uses setuptools with a flat layout (multiple top-level packages). Use the venv directly: `source .venv/bin/activate && python ...`.
- `pymilvus[model]` and `pymilvus[milvus_lite]` are required but not listed in `requirements.txt`. The update script installs them.
- `setuptools<81` is required because `milvus_lite` depends on `pkg_resources` which was removed in setuptools 81+.
- ESLint config (`.eslintrc.cjs`) references `@typescript-eslint/recommended` (should be `plugin:@typescript-eslint/recommended`). `pnpm lint` will fail until this is fixed.
- `@typescript-eslint/parser` and `@typescript-eslint/eslint-plugin` v7 must be installed for ESLint (not in the lockfile by default).

### Lint / Test / Build
- **Frontend lint**: `pnpm lint` (in `frontend/`, currently broken — see ESLint gotcha above)
- **Frontend build**: `pnpm build` (in `frontend/`)
- **Python lint**: `source .venv/bin/activate && python -m flake8 backend.py config.py main.py cli.py --max-line-length 120`
- **No automated tests** exist in the repo currently.