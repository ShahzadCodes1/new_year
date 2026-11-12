# Security review: Impeccable launcher and Design Taste checker hook

Prepared 10 November 2026. Read-only review of the installed skill files. Neither tool has been run. Key claims were spot-checked against the source.

## Summary

| | Impeccable launcher | Design Taste checker hook |
|---|---|---|
| What it is | A shell launcher that fetches and runs a native program (the "engine") | A Node script, `gate.mjs`, run automatically when I finish a turn |
| Can the code be read? | Launcher yes. **The engine is a closed binary and cannot be inspected** | Yes, fully. All scripts are readable source |
| Downloads | One executable, on first run only | Nothing |
| Leaves the machine | The download request; a documented telemetry ping; possibly a version check | Nothing by its own code |
| My recommendation | **Do not run it.** Use the skill's guidance without the launcher | **Acceptable, with one caveat**; decide in Phase 2 |

## Impeccable launcher

### What happens when it runs

1. It looks for an engine binary in this order: a path in the `IMPECCABLE_BIN` environment variable, a `bin/` folder beside the launcher, `~/.impeccable/bin/`, a version-pinned cache, then `impeccable` on the system PATH.
2. None exists on this machine, so the first run downloads `impeccable-windows-x64.exe`, version 0.1.21, from `github.com/pbakaus/impeccable/releases` using curl.
3. It checks the download against a SHA-256 hash shipped inside the skill, and refuses to run on a mismatch or a missing hash.
4. It saves the program to `C:\Users\EVOO\.impeccable\bin\0.1.21\` and runs it.

### What is sound

- The download is hash-verified and fails closed. No flag or variable skips the check on the download path.
- The launcher contains no `eval` of downloaded text, no PowerShell, no execution-policy bypass, no PATH or registry changes and no privilege elevation.

### What concerns me

- **The engine is opaque.** It is a native executable that runs with your full user rights and network access. What it reads, writes or sends cannot be verified from source. The skill's own documentation says it runs "unsandboxed with the agent's environment and network access".
- **Telemetry is documented but not described.** The skill's documentation refers to a telemetry "choice ping" sent by the engine during new-design work. The destination, contents and opt-out are not in any readable file. You asked for no unnecessary telemetry.
- **The hash proves consistency, not authorship.** The hash list ships in the same package as the launcher, and there is no signature check. It confirms the download matches what this skill copy expects, not who built it.
- **Four paths run a binary with no hash check at all**: the `IMPECCABLE_BIN` variable, the sibling `bin/` folder, `~/.impeccable/bin/`, and any `impeccable` already on PATH.
- **Optional features reach further.** Its hooks feature, if switched on, would write into your global `~/.claude/settings.json` and run the engine after every interface file edit. Its live mode injects a script tag into project source files and runs a local server. Neither is active unless explicitly turned on.

### Recommendation

Do not run the launcher. The skill itself provides for this: when the launcher does not run, I read `PRODUCT.md` and `DESIGN.md` directly and follow the same written guidance (its critique, audit, polish and adapt playbooks are plain text). You lose only the engine's automation, not the design method.

If you later want the engine, the safer route is for you to download the release yourself, check it, and point `IMPECCABLE_BIN` at it.

## Design Taste checker hook

### What happens

- When I try to finish a turn, a one-line shell command looks for `gate.mjs` and runs it with Node.
- If no build is "armed" in the project, it exits immediately and writes nothing. A build is armed only by running `gate.mjs --start` or the skill's `start.mjs deal`. Neither has been run; there is no `.taste-skill` folder in this project.
- When armed, it runs three checks in sequence: a consistency check, a layout check and a copy check. The first two open the page in headless Chrome or Edge.
- If checks fail, it **blocks me from finishing** and returns the list of failures to fix. This is capped at the configured rounds (default 3) plus 4, or 30 blocks in six hours.

### What is sound

- All code is readable. No telemetry, no API keys, no downloads of executables, no `eval`, no shell command strings.
- The browser runs headless with a fresh temporary profile that is deleted afterwards. Your real browser profile is never used. No `--no-sandbox` or web-security flags.
- Its local server binds to `127.0.0.1` only and exists only during a check.
- It kills only the processes it started, by process ID.
- It writes only inside `.taste-skill/` and the system temp folder. It does not edit or delete project source.

### Caveats

- **It can hold a turn open for up to about 9.5 minutes per round** while the headless browser works.
- **It will flag the cinematic sections by design.** Its rules reserve dark heroes and scroll-driven scenes for technology sites. On this project the gate would repeatedly block on failures we have already agreed to override, each needing a written waiver. It also treats edits to its own kit files as a hard failure.
- The headless browser loads the page for real, so any third-party resources the page references are requested from the internet, as in a normal visit. Our pages will self-host fonts and assets, so this should be nothing.
- One edge case blocks once without arming: a recently changed `index.html` containing the skill's own `page-type` meta tag. Our Next.js pages will not have it.
- Stopping it: `gate.mjs --done "<reason>"`, or delete the `.taste-skill` folder.

### Recommendation

Safe to run from a security standpoint. Whether it is useful here is a separate question, because of the conflict with the brief. My suggestion for Phase 2: **do not arm the automatic hook**. Instead I run its individual checks by hand where they apply (copy lint on every page, the performance and layout checks on the editorial templates), and report results to you. That keeps its discipline without it blocking on the cinematic chapters.

## What could not be determined

- Anything the Impeccable engine actually does once running.
- Who built the release binary, and whether this skill copy's hash list matches the upstream repository's.
- Whether an `impeccable` executable is already on PATH (checking means running a command).
- What background requests headless Chrome makes on its own during a check.

## Decisions for you

1. Impeccable: agree to use its written guidance without running the launcher?
2. Design Taste: agree to manual checks instead of the automatic hook, decided finally in Phase 2?
