#!/bin/bash
# dot-ui — AI Agent Setup
#
# Configures Claude Code by:
#   - Creating .claude/skills/ symlink → scripts/skills/
#   - Copying AGENT.md → CLAUDE.md
#
# Usage:
#   ./scripts/setup-agent.sh

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(dirname "$SCRIPT_DIR")"
SOURCE="$REPO_ROOT/AGENT.md"
SKILLS_SOURCE="$SCRIPT_DIR/skills"
CLAUDE_DIR="$REPO_ROOT/.claude"
TARGET="$CLAUDE_DIR/skills"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m'

# =============================================================================
# HELPERS
# =============================================================================

check_source() {
    if [ ! -f "$SOURCE" ]; then
        echo -e "${RED}  ✗ AGENT.md not found at $SOURCE${NC}"
        exit 1
    fi
}

ensure_skills_dir() {
    if [ ! -d "$SKILLS_SOURCE" ]; then
        mkdir -p "$SKILLS_SOURCE"
        echo -e "${GREEN}  ✓ Created scripts/skills/${NC}"
    fi
}

ensure_claude_dir() {
    if [ ! -d "$CLAUDE_DIR" ]; then
        mkdir -p "$CLAUDE_DIR"
        echo -e "${GREEN}  ✓ Created .claude/${NC}"
    fi
}

setup_symlink() {
    # Remove existing symlink
    if [ -L "$TARGET" ]; then
        rm "$TARGET"
        echo -e "${YELLOW}  ! Removed existing symlink${NC}"
    fi

    # Backup existing directory
    if [ -d "$TARGET" ]; then
        mv "$TARGET" "${TARGET}.backup.$(date +%s)"
        echo -e "${YELLOW}  ! Existing .claude/skills/ backed up${NC}"
    fi

    # Compute relative path from .claude/ to scripts/skills/
    # .claude/ is one level deep from repo root
    # scripts/skills/ is also one level deep from repo root
    # So from .claude/ the relative path is: ../scripts/skills
    local relative_target="../scripts/skills"

    # Create symlink from inside .claude/ using relative path
    ln -s "$relative_target" "$TARGET"

    echo -e "${GREEN}  ✓ .claude/skills → ../scripts/skills (relative)${NC}"
}

verify_symlink() {
    if [ -d "$TARGET" ]; then
        local skill_count
        skill_count=$(find "$TARGET" -name "SKILL.md" 2>/dev/null | wc -l | tr -d ' ')
        echo -e "${GREEN}  ✓ Symlink verified — ${skill_count} skill(s) accessible${NC}"
    else
        echo -e "${RED}  ✗ Symlink does not resolve — check that scripts/skills/ exists${NC}"
        exit 1
    fi
}

copy_agent_md() {
    cp "$SOURCE" "$REPO_ROOT/CLAUDE.md"
    echo -e "${GREEN}  ✓ AGENT.md → CLAUDE.md${NC}"
}

# =============================================================================
# MAIN
# =============================================================================

echo ""
echo -e "${BOLD}dot-ui — AI Agent Setup${NC}"
echo "========================"
echo ""
echo -e "${BLUE}Configuring Claude Code...${NC}"
echo ""

check_source
ensure_skills_dir
ensure_claude_dir
setup_symlink
verify_symlink
copy_agent_md

# =============================================================================
# SUMMARY
# =============================================================================

echo ""
echo -e "${GREEN}✅ Done!${NC}"
echo ""
echo "  .claude/"
echo "  └── skills/  →  ../scripts/skills/"
echo "                      $(find "$SKILLS_SOURCE" -maxdepth 1 -mindepth 1 -type d | while read -r d; do echo "├── $(basename "$d")/SKILL.md"; done | tr '\n' ' ')"
echo ""
echo -e "${BLUE}Tip: AGENT.md is the source of truth.${NC}"
echo -e "${BLUE}     Edit it and re-run this script to sync.${NC}"
echo ""
