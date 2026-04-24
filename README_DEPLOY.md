# VPS (1Panel) 部署指南

此项目已配置 GitHub Actions 自动部署流程，特别适配了 1Panel 面板环境。

## 1. VPS 环境准备 (1Panel)

在您的 VPS 上，请确保：

- **Node.js**: 建议通过 1Panel 的应用商店安装 Node.js 运行环境（v20+）。
- **PM2**: 全局安装 PM2：`npm install -g pm2`
- **目录权限**: 确保 `/opt/1panel/www/sites/vortexpay` 目录存在且 GitHub Actions 使用的 SSH 用户有权写入。

## 2. GitHub Secrets 配置

在 GitHub 仓库 **Settings > Secrets and variables > Actions** 中添加：

| Secret 名称 | 说明 |
| :--- | :--- |
| `VPS_HOST` | 服务器 IP |
| `VPS_USERNAME` | SSH 用户名 |
| `VPS_SSH_KEY` | SSH 私钥 |

## 3. 1Panel 反向代理设置

部署完成后，程序运行在 `3001` 端口。您需要在 1Panel 网站管理中：
1. 创建或选择一个网站。
2. 在 **反向代理** 中添加一条规则：
   - 代理地址：`http://127.0.0.1:3001`

## 4. 环境变量说明

在服务器的 `/opt/1panel/www/sites/vortexpay` 目录下，您可以手动创建一个 `.env` 文件来持久化配置。

---
**部署状态检查**:
- 查看运行状态: `pm2 status`
- 查看实时日志: `pm2 logs vortexpay`
