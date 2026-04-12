#!/bin/bash
# dot-ui — AI Agent Setup
#
# Configures Claude Code by:
#   - Copying AGENT.md → CLAUDE.md
#   - Creating .claude/skills/    symlink → scripts/skills/
#   - Creating .claude/commands/  symlink → scripts/commands/
#   - Copying scripts/claude-settings.json → .claude/settings.json
#
# Usage:
#   ./scripts/setup-agent.sh

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(dirname "$SCRIPT_DIR")"
SOURCE="$REPO_ROOT/AGENT.md"
SKILLS_SOURCE="$SCRIPT_DIR/skills"
COMMANDS_SOURCE="$SCRIPT_DIR/commands"
SETTINGS_SOURCE="$SCRIPT_DIR/claude-settings.json"
CLAUDE_DIR="$REPO_ROOT/.claude"
SKILLS_TARGET="$CLAUDE_DIR/skills"
COMMANDS_TARGET="$CLAUDE_DIR/commands"
SETTINGS_TARGET="$CLAUDE_DIR/settings.json"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m'

check_source() {
    if [ ! -f "$SOURCE" ]; then
        echo -e "${RED}  ✗ AGENT.md not found at $SOURCE${NC}"
        exit 1
    fi
}

ensure_scripts_dirs() {
    if [ ! -d "$SKILLS_SOURCE" ]; then
        mkdir -p "$SKILLS_SOURCE"
        echo -e "${GREEN}  ✓ Created scripts/skills/${NC}"
    fi
    if [ ! -d "$COMMANDS_SOURCE" ]; then
        mkdir -p "$COMMANDS_SOURCE"
        echo -e "${GREEN}  ✓ Created scripts/commands/${NC}"
    fi
}

ensure_claude_dir() {
    if [ ! -d "$CLAUDE_DIR" ]; then
        mkdir -p "$CLAUDE_DIR"
        echo -e "${GREEN}  ✓ Created .claude/${NC}"
    fi
}

setup_symlink() {
    local target="$1"
    local relative_source="$2"
    local label="$3"

    # Remove existing symlink or directory (Windows Git Bash surfaces junctions as dirs)
    if [ -L "$target" ] || [ -d "$target" ]; then
        rm -rf "$target"
        echo -e "${YELLOW}  ! Removed existing $label${NC}"
    fi

    ln -s "$relative_source" "$target"
    echo -e "${GREEN}  ✓ $label → $relative_source (relative)${NC}"
}

verify_symlink() {
    local target="$1"
    local pattern="$2"
    local label="$3"

    if [ -d "$target" ]; then
        local count
        count=$(find "$target" -name "$pattern" 2>/dev/null | wc -l | tr -d ' ')
        echo -e "${GREEN}  ✓ $label verified — ${count} file(s) accessible${NC}"
    else
        echo -e "${RED}  ✗ $label does not resolve${NC}"
        exit 1
    fi
}

copy_settings() {
    if [ ! -f "$SETTINGS_SOURCE" ]; then
        echo -e "${YELLOW}  ! scripts/claude-settings.json not found — skipping${NC}"
        return
    fi
    cp "$SETTINGS_SOURCE" "$SETTINGS_TARGET"
    echo -e "${GREEN}  ✓ scripts/claude-settings.json → .claude/settings.json${NC}"
}

copy_agent_md() {
    cp "$SOURCE" "$REPO_ROOT/CLAUDE.md"
    echo -e "${GREEN}  ✓ AGENT.md → CLAUDE.md${NC}"
}


echo ""
echo -e "${BOLD}dot-ui — AI Agent Setup${NC}"
echo "========================"
echo ""
echo -e "${BLUE}Configuring Claude Code...${NC}"
echo ""

check_source
ensure_scripts_dirs
ensure_claude_dir
setup_symlink "$SKILLS_TARGET"   "../scripts/skills"    ".claude/skills/"
verify_symlink "$SKILLS_TARGET"  "SKILL.md"             ".claude/skills/"
setup_symlink "$COMMANDS_TARGET" "../scripts/commands"  ".claude/commands/"
verify_symlink "$COMMANDS_TARGET" "*.md"                ".claude/commands/"
copy_settings
copy_agent_md

echo ""
echo -e "${GREEN}✅ Done!${NC}"
echo ""
echo "  .claude/"
echo "  ├── skills/    →  ../scripts/skills/"
echo "  ├── commands/  →  ../scripts/commands/"
echo "  └── settings.json"
echo ""
echo -e "${BLUE}Tip: AGENT.md is the source of truth for rules and conventions.${NC}"
echo -e "${BLUE}     Edit it and re-run this script to sync.${NC}"
echo -e "${BLUE}     Slash commands live in scripts/commands/.${NC}"
echo ""
