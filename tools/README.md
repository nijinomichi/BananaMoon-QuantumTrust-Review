# Tools

This directory contains utility scripts that are **not part of the main provenance/review pipeline**.

## x_montage_bot.py

X (Twitter) keyword image montage video generator.

- Source: `codex/create-core-architecture-and-modules-1tgmqm` @ `2fef0e4d`
- Uses Nitter RSS mirrors to retrieve public tweet images without X official API.
- Requires: `pip install requests moviepy`

> ⚠️ This script is isolated here intentionally. It should not be merged into `main`.
> Candidate for migration to a dedicated tools repository.
