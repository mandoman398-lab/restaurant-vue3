---
name: Security-blocked npm packages in Vue CLI projects
description: Vue CLI's dependency tree pulls in old packages blocked by Replit's security policy; fix with npm overrides
---

Vue CLI 5 pulls in old versions of these packages that are blocked by Replit's Socket Security Policy (Critical CVE):
- `shell-quote` → override to `1.8.4`
- `form-data` → override to `4.0.6`
- `sha.js` → override to `2.4.12`
- `pbkdf2` → override to `3.1.6`

**Why:** Replit's package firewall blocks specific old versions with known CVEs. The errors appear as `403 Forbidden - Blocked by Security Policy` during `npm install`. Each blocked package must be discovered iteratively (one per install run) and overridden.

**How to apply:** Add to package.json:
```json
"overrides": {
  "shell-quote": "1.8.4",
  "form-data": "4.0.6",
  "sha.js": "2.4.12",
  "pbkdf2": "3.1.6"
}
```

Also blocked: `json-server` (any version) — use a custom Node.js HTTP server instead.
