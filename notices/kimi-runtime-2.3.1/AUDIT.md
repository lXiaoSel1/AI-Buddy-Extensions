# Kimi 2.3.1 Windows x64 redistribution notice preparation

This is a technical provenance and notice-collection receipt, not legal advice or a legal certification. Kimi and every included third-party component retain their original licenses. The AI Buddy Extensions repository license does not relicense the runtime.

## Fixed upstream and unchanged binary

- Kimi upstream: MoonshotAI/kimi-code, commit `684bae9ea6a437f3bae98bba1dcb797a917d500b`, version 2.3.1. The npm SLSA provenance identifies that commit. Root Kimi MIT license and separate pi-tui MIT license are preserved.
- Official archive: `https://code.kimi.com/kimi-code/binaries/2.3.1/kimi-code-win32-x64.tar.gz`, SHA-256 `91514bebccf75019e5815eb405ff2063a4439d34e6d5bbd63fcb0863f6aa4400`.
- Unchanged `kimi.exe`: 161107232 bytes, SHA-256 `93878ac2bd12a8cf21b4e148e7f7705a7a6252c1398fd34eb50f8998ba0bf795`. We neither rebuilt nor patched it. The original archive contains only that regular file and no notice sidecars, so notices have been collected separately.

## Actual bundle coverage

- Node SEA reports Node v24.15.0. The full upstream Node v24.15.0 LICENSE, including its incorporated third-party notices, is retained.
- Extracted 537 SEA asset entries without modifying the executable; 529 byte hashes match the fixed source checkout. Remaining entries are two generated manifests, three published clipboard package files plus its package metadata, and two generated worker bundles. The actual clipboard native binary matches the published 0.3.9 Windows x64 package byte-for-byte. pi-tui's native Windows helper matches the fixed source prebuild. Generated workers are included in the actual runtime JS inventory.
- 215 name/version pairs in main/worker bundle source labels and embedded package metadata: original package notices or fixed-commit upstream notices collected. The index includes source URL, size and SHA-256. Three upstream packages (`@mariozechner/clipboard`, its Windows platform package and `boolbase`) omit their original full license file; their original published metadata/attribution and the referenced standard MIT/ISC text are explicitly distinguished. Standard terms are not represented as original upstream notices.
- The clipboard native component has Rust toolchain commit `59807616e1fa2540724bfbac14d7976d7e4a3860` (1.95.0). Rust's original MIT/Apache/COPYRIGHT files are retained and matched to the official 1.95.0 Windows standard-library distribution. That distribution supplies those three notice files; a separate generated COPYRIGHT-library.html was not shipped and is not falsely claimed here.
- Clipboard's exact source Cargo.lock has 121 registry packages; all their notices are retained as an **all-target conservative superset**, not a claim that macOS/Linux-only dependencies occur in this Windows binary. Its source-vendored clipboard-rs 0.3.1 license is also retained. The two zune packages' full Zlib license was retrieved at each package's exact VCS commit (the declared license permits MIT OR Apache-2.0 OR Zlib).
- Web assets match fixed source prebuilt output by hash. Their actual banners differ from the source lock: Vue 3.5.39, vue-i18n/intlify 11.4.6, Mermaid 11.16.0, DOMPurify 3.4.11, KaTeX 0.16.47 and 0.17.0. 89 web package notice records cover those actual versions and exact transitive bundle labels from their published packages; supplemental version records are labeled. 21 actual embedded legal-comment blocks are preserved verbatim. Minified bundles do not expose a complete formal SBOM; this notice collection is not an assertion that every unversioned minified symbol's original package identity was independently proved.
- All **67 actual font assets** have original embedded name/copyright/license fields recorded. KaTeX fonts use SIL OFL 1.1 (not the KaTeX JavaScript MIT license); original full KaTeX font OFL is included. JetBrains Mono, Noto Sans SC and Schibsted Grotesk full OFL texts are pinned by upstream Git blob. No font bytes or names were changed.
- The embedded 466610-byte Oniguruma WASM hash `fd885c2d12e5951e59d761ebd4a006e06254b1491fd6f530c92b69fb4d8d77d9` matches Shiki 2.5.0 / engine-oniguruma 2.5.0 and vscode-oniguruma 1.7.0 exactly. vscode-oniguruma's MIT LICENSE and NOTICES (Oniguruma BSD attribution) are retained. WebP WASM/codec original Google BSD terms and the @jsquash Apache wrapper terms are separately retained.

## Scope and use

No credentials, user profiles or authentication files are shipped. Package installation or enabling does not initiate a model request. Native utilities are not an OS sandbox. This preview requires the AI Buddy 1.9.2 internal candidate with extension-center/multi-source support; the already-public AI Buddy 1.9.2 release does not contain that interface.

`NPM-NOTICES-INDEX.json`, `WEB-NPM-NOTICES-INDEX.json`, `RUST-NOTICES-INDEX.json`, `FONT-NOTICES-INDEX.json`, `ASSET-PROVENANCE.json` and `RUNTIME-INVENTORY.json` describe the fixed evidence. Additional all-target or transitive notices are intentionally retained rather than omitted. Licensing ambiguities should be reported upstream; the package does not assert third-party authors endorse AI Buddy.
