# AI Buddy Extensions / AI 酱扩展

AI 酱按需扩展的源码、签名目录与预览包。维护者：**lXiaoSel1**。首批仅提供 Kimi ACP 工作引擎及其匹配的 Windows x64 运行包。

**这是预览发行。需要带“扩展中心／多源管理”的 AI Buddy 1.9.2 内部候选。AI-Buddy 仓库之前公开的 1.9.2 Release 尚未集成本轮界面；仅下载旧公开安装包不会出现新入口。** 本仓库不更新或替换 AI Buddy 主程序，也不提供或请求 API Key。

## 安装与使用

在兼容候选的“扩展中心”中选择官方来源，安装“Kimi 工作引擎”；它会列出独立运行包依赖。安装完成后由用户明确启用。随后为角色选择已经配置的 Kimi 连接，再创建工作任务。安装或启用扩展不会自动调用模型、改变角色模型或启动工作。

- 官方源：`https://raw.githubusercontent.com/lXiaoSel1/AI-Buddy-Extensions/main/source.json`
- 官方目录：`https://raw.githubusercontent.com/lXiaoSel1/AI-Buddy-Extensions/main/catalog.json`
- 预览标签：`kimi-v1.0.0`，扩展包版本 `1.0.0`；原生运行时 `2.3.1`。
- 平台：Windows x64；两份 ZIP 在同一标签附件下。不要把单个扩展 ZIP 当主程序安装包。
- 工作执行器拥有本机 Node／进程能力，不是操作系统沙箱。仅信任你明确核对过的发布者与源码。

## 两个来源的演示

`examples/community-source/source.json` 是**本项目自建、使用独立签名的社区源演示**。它不是外部作者的作品、不是官方认证，也不是 Moonshot AI 官方发布的 AI Buddy 扩展。演示源共用同两份 Kimi 归档，演示来源信任和隔离，不能证明存在独立第三方开发者。

首次添加来源时核对指纹并明确确认。相同包 ID 同时只能安装一个来源；测试另一来源前先正常卸载对应扩展。移除来源不等于删除已安装扩展或个人资料。第三方原始作品保留其作者自己选择的许可，本仓库不替第三方重新许可。

## 本地构建

需要 Node 24+、Python 3。`npm ci --ignore-scripts` 安装固定构建工具，不执行 Kimi/npm 依赖的生命周期脚本。

```text
npm ci --ignore-scripts
python scripts/prepare-runtime.py
npm run build
npm run verify
```

运行时准备工具只下载固定的官方 2.3.1 tar.gz，先核对归档 SHA-256，再仅提取 `kimi.exe` 并核对二进制 SHA-256。它不会修改 PATH、用户配置或已有程序。构建时可传 `--runtime-exe=<已验证的 kimi.exe>`、`--out=<新输出目录>`；任何运行时哈希不匹配都会停止。

公开包重新从本仓库源码与通知文件构建；不会重用本机审核包或其临时签名。`BUILD-RECEIPT.json` 和 `SHA256SUMS.txt` 记录实际附件。Node／Kimi／JavaScript／native 依赖的原许可与声明放在运行包 `licenses/`，范围和证据见 `notices/kimi-runtime-2.3.1/AUDIT.md`。通知采集不等于法务认证。

## 目录签名

`scripts/catalog.mjs` 生成规范 JSON、合成目录信封并离线验签；**它不会寻找或读取私钥**。官方签名由维护者在独立授权的发布环境完成，私钥不能提交到此仓库或附件。

```text
node scripts/catalog.mjs prepare --id=ai-buddy-official --entries=<engine-entry.json>,<runtime-entry.json> --out=<new-directory>
ssh-keygen -Y sign -n ai-buddy-plugin-catalog -f <发布者自己的私钥> <new-directory>/PAYLOAD.json
node scripts/catalog.mjs envelope --payload=<new-directory>/PAYLOAD.json --signature=<new-directory>/PAYLOAD.json.sig --key-id=<key-id> --out=<catalog.json>
node scripts/catalog.mjs verify --catalog=<catalog.json> --public-key=<publisher.pub> --key-id=<key-id>
```

签名只证明指定发布者对这些目录字节负责；不证明插件可信、无漏洞或得到官方认可。请勿让第三方源复用官方标识。示例 CI 只构建与验证，不持有官方签名私钥、不自动发布附件。

## 作者模板与反馈

完整发布步骤见 [独立作者指南](docs/AUTHOR-GUIDE.md)。可复制演示源：`https://raw.githubusercontent.com/lXiaoSel1/AI-Buddy-Extensions/main/examples/community-source/source.json`。

`templates/empty-plugin/` 是没有工具、模型或 UI 权限的最小生命周期示例。按其说明选择唯一 ID、声明实际能力和独立许可，完成测试后使用自己的来源与签名。平台只启用已实现的能力，不能通过声明得到未实现接口。

反馈：<https://github.com/lXiaoSel1/AI-Buddy-Extensions/issues>。报告问题时写明主程序内部构建、来源指纹、扩展版本和复现步骤；不要上传 API Key、私聊或完整存档。

本仓库自身代码沿用 [LICENSE.md](LICENSE.md) 中的 Apache-2.0 + Commons Clause 条件。Kimi Code、Node 和其他第三方组件保持原许可；详见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。
