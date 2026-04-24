# VPS 部署指南

此项目已配置 GitHub Actions 自动部署流程。只需将代码推送到 GitHub 的 `main` 分支，即可自动部署到您的 VPS。

## 1. VPS 环境准备

在您的 VPS 上，请确保已安装以下软件：

- **Node.js (v20+)**
- **npm**
- **PM2**: `npm install -g pm2`

## 2. GitHub Secrets 配置

在您的 GitHub 仓库中，进入 **Settings > Secrets and variables > Actions**，添加以下 **Repository secrets**:

| Secret 名称 | 说明 |
| :--- | :--- |
| `VPS_HOST` | 您的 VPS IP 地址或域名 |
| `VPS_USERNAME` | SSH 用户名（如 `root` 或 `ubuntu`） |
| `VPS_SSH_KEY` | 您的 SSH 私钥 (`~/.ssh/id_rsa` 的内容) |

> **注意**: 请确保您的 VPS 已将对应的公钥添加到 `~/.ssh/authorized_keys` 中。

## 3. 首次部署手动步骤 (可选)

如果目标目录 `/var/www/vortexpay` 不存在，您可能需要先手动创建它并设置权限：

```bash
sudo mkdir -p /var/www/vortexpay
sudo chown -R $USER:$USER /var/www/vortexpay
```

## 4. 环境变量

在 VPS 的 `/var/www/vortexpay` 目录下，您可以手动创建一个 `.env` 文件来存储生产环境的密钥，如 `JWT_SECRET`。

---

配置完成后，每次 `git push origin main` 都会自动触发部署。
