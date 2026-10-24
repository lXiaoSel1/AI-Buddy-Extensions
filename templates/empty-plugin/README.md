# Minimal author template

Choose an original unique ID and an author-owned source. This template grants no model/tool/UI capabilities and starts no task. Place `entry.mjs` and your applicable `LICENSE.md` into a prepared package folder; do not put the manifest template inside that indexed folder.

```text
node scripts/package-plugin.mjs --manifest=templates/empty-plugin/plugin.template.json --files=<prepared-folder> --out=<new-output-folder> --url=https://github.com/<owner>/<repo>/releases/download/<fixed-tag>/<fixed-file>.zip
```

Retain applicable upstream notices on reused template code. Choose your own terms for your original work; do not mislabel other authors' code as yours or as officially certified. Request only implemented capabilities. Publish your own descriptor and signed catalog; users must explicitly trust its publisher fingerprint. Never include credentials or a signing private key.
