

## Fix Rollup CVE-2026-27606 (High Severity Path Traversal)

### Problem
Your project uses Rollup **4.46.2** (via Vite), which is vulnerable to CVE-2026-27606 — an arbitrary file write via path traversal. The patched version is **4.59.0+**.

### Solution
Add an `overrides` field in `package.json` to force Rollup to update to a patched version, regardless of what Vite requests.

### Changes

**File: `package.json`**
- Add an `overrides` block to pin `rollup` to `>=4.59.0`:

```json
{
  "overrides": {
    "rollup": ">=4.59.0"
  }
}
```

This tells npm to use at least version 4.59.0 of rollup for all dependencies that require it (primarily Vite), resolving the vulnerability.

### Risk Assessment
- **Low risk**: Rollup 4.59.0 is a patch release with no breaking API changes, so Vite will continue to work normally.
- The override only affects the build toolchain, not your production website code.

