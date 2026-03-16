#!/bin/bash
set -euo pipefail

# Only run in remote environments (Claude Code on the web / iPhone)
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

# Install dependencies as they are added to the project
# Uncomment the relevant section when you add dependency files:

# Node.js (package.json)
# if [ -f "$CLAUDE_PROJECT_DIR/package.json" ]; then
#   cd "$CLAUDE_PROJECT_DIR"
#   npm install
# fi

# Python (requirements.txt)
# if [ -f "$CLAUDE_PROJECT_DIR/requirements.txt" ]; then
#   pip install -r "$CLAUDE_PROJECT_DIR/requirements.txt"
# fi

# Python (pyproject.toml)
# if [ -f "$CLAUDE_PROJECT_DIR/pyproject.toml" ]; then
#   cd "$CLAUDE_PROJECT_DIR"
#   pip install -e ".[dev]"
# fi

echo "Session start hook completed successfully"
