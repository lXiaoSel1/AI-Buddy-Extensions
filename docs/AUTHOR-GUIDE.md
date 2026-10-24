# 独立作者：从模板到可添加的扩展源

本指南面向已实现的扩展能力，不代表任意 HTML、工具或工作引擎声明已经可执行。先在兼容的 AI Buddy 内部候选中隔离测试；目前旧公开 1.9.2 安装包没有本轮扩展中心。签名代表发布者对字节负责，不能替代源码审查。

## 1. 复制最小模板与工具

在你自己的源码仓库保留模板代码所适用的许可和作者信息。复制 `templates/empty-plugin/entry.mjs` 到准备目录（例 `my-plugin-files/`），复制 `plugin.template.json` 到目录外，改成自己的唯一 ID、名称、作者、版本及真实实现的能力。准备目录另放实际适用的 LICENSE.md 和第三方通知。不要把私钥、API Key、聊天记录、用户存档、node_modules 或模板 JSON 放进包文件目录。

本仓库 `scripts/package-plugin.mjs`、`scripts/catalog.mjs` 及其 `src/plugin-*.mjs` 依赖可以一起使用，保留本仓库原许可。不要把本项目的官方 keyId、source ID、作者或徽章复制成自己的身份。

## 2. 生成固定附件与哈希

选择不可变的包版本、发布标签和附件名称。`<owner>` 等必须替换为你自己的值；包文件名由 manifest 的 `<id>-<version>.zip` 产生。

```text
node scripts/package-plugin.mjs --manifest=my-plugin.template.json --files=my-plugin-files --out=out/my-plugin-1.0.0 --url=https://github.com/<owner>/<repo>/releases/download/my-plugin-v1.0.0/<id>-1.0.0.zip
node scripts/verify-plugin-package.mjs --entry=out/my-plugin-1.0.0/release-entry.json --archive=out/my-plugin-1.0.0/<id>-1.0.0.zip
```

`out/my-plugin-1.0.0/release-entry.json` 包含 URL、归档 SHA-256 和每个文件的哈希。先检查归档内容；不要手工修改打包后的 ZIP，否则必须重新生成清单和目录。上传固定 ZIP 到自己仓库的固定 Release 标签，连同 SHA256SUMS.txt。GitHub 页面生成的源码 ZIP 不是这个扩展归档。

## 3. 建立自己的签名身份

在自己的安全位置创建 Ed25519 签名密钥。私钥只留本机，或你控制的 CI secret；本仓库示例 CI 不含签名步骤。不要把私钥提交到任何仓库、附件或 source.json。可以发布 `.pub` 公钥和公开指纹。

```text
ssh-keygen -t ed25519 -f <安全位置/extension-signing> -C <你的发布者身份>
ssh-keygen -lf <安全位置/extension-signing.pub>
node scripts/catalog.mjs prepare --id=<你的源ID> --entries=out/my-plugin-1.0.0/release-entry.json --out=out/catalog-1
ssh-keygen -Y sign -n ai-buddy-plugin-catalog -f <安全位置/extension-signing> out/catalog-1/PAYLOAD.json
node scripts/catalog.mjs envelope --payload=out/catalog-1/PAYLOAD.json --signature=out/catalog-1/PAYLOAD.json.sig --key-id=<你的keyId> --out=catalog.json
node scripts/catalog.mjs verify --catalog=catalog.json --public-key=<安全位置/extension-signing.pub> --key-id=<你的keyId>
```

目录只能在验签成功后发布。每次更新重新生成 generatedAt、签名和目录，不能同一时间戳换不同内容；不要让附件 URL 指向以后会覆盖的文件。

## 4. 发布 source.json 并复制源 URL

在自己的默认分支放 `catalog.json` 和以下 `source.json`。只有公钥会进入描述符；keyId 应与目录信封一致。

```json
{
  "schemaVersion": 1,
  "id": "your-own-source-id",
  "name": "你的扩展源",
  "catalogUrl": "https://raw.githubusercontent.com/<owner>/<repo>/main/catalog.json",
  "publicKey": "ssh-ed25519 <你的公开公钥内容>",
  "keyId": "your-own-key-id",
  "repositoryUrl": "https://github.com/<owner>/<repo>",
  "feedbackUrl": "https://github.com/<owner>/<repo>/issues"
}
```

确认匿名用户可以访问描述符、目录和已发布附件，再将完整 source.json HTTPS URL 交给用户。兼容候选的“管理来源”中可粘贴该 URL 或 GitHub 仓库 URL；用户预览后核对公钥指纹、来源和包数量，主动信任后添加。更换公钥需要重新信任，不要把旧公钥悄悄替换。

示范可复制 URL：
`https://raw.githubusercontent.com/lXiaoSel1/AI-Buddy-Extensions/main/examples/community-source/source.json`

它是本项目自己的独立签名演示源，共用官方 Kimi 两份 ZIP。它不代表真正的外部作者或官方认证。用你自己的代码、附件、签名和源地址发布，才是你的独立扩展源。
