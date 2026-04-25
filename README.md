# VortexPay Router

**A/B Polling & Core Isolation Gateway for E-commerce Platforms**

VortexPay is an intelligent payment routing gateway designed to separate your user-facing e-commerce store (Site A) from your payment gateways (Site B pools). It intercepts WooCommerce checkout requests on Site A, dynamic routes them to a healthy gateway on a Site B based on your algorithms (Random or Round-Robin), and manages asynchronous status synchronization.

---

## 🇺🇸 English Documentation

### 1. Deployment

This application is built as a Full-Stack Node.js app using Express + Vite.
It is designed to be easily deployed to any Docker-compatible environment or cloud hosting provider.

1. Clone the repository to your server.
2. Run `npm install` to install dependencies.
3. Run `npm run build` to compile the application.
4. Run `npm start` (with `NODE_ENV=production`) to start the server.

### 2. Configuration & Usage

#### Step 1: Add Ingress Sites (Site A)

Site A represents your user-facing business storefronts.

1. Open the **Configuration** tab.
2. Under **Configure Ingress (A Sites)**, enter the domain (e.g., `shop.com`) and a label.
3. Click **Add A Site**. The system will generate an API Key that you will use in your Site A plugin.

#### Step 2: Add Egress Gateways (Site B)

Site B represents the safe landing pages where real payment accounts (Stripe, PayPal, etc.) reside.

1. In the **Configuration** tab, under **Configure Gateways (B Sites)**, enter the safe domain (e.g., `secure-checkout.com`).
2. Add multiple B Sites to utilize the load-balancing mechanisms.

#### Step 3: Select a Routing Strategy

1. Go to the **Configuration** tab.
2. Under **Routing Rule Engine**, select either:
   - **Random Distribution**: Chooses any active Site B at random.
   - **Strict Round-Robin**: Cycles through Site B gateways sequentially to distribute volume evenly.

### 3. WordPress / WooCommerce Plugin Setup

For this ecosystem to work, you must install the provided WooCommerce plugins on your A and B sites.

1. Go to the **API & Integration** tab.
2. **Download Site A Plugin**: Click the download button for Site A. Install and activate it on your user-facing WooCommerce store.
   - Go to WooCommerce -> Settings -> Payments -> VortexPay Secure.
   - Enable it, paste the **Router URL** (this application's URL), and the **API Key** generated in Step 1.
3. **Download Site B Plugin**: Click the download button for Site B. Install and activate it on your gateway WooCommerce store.
   - Go to Settings -> VortexPay B Config.
   - Paste the **Router URL** (this application's URL) to ensure Webhooks can flow back correctly.

---

## 🇨🇳 中文说明文档

### 1. 部署指南

本系统是一个基于 Express + Vite 的全栈 Node.js 应用程序。设计之初即兼容 Docker，非常容易部署到各大云服务商。

1. 将代码克隆或上传到您的服务器。
2. 运行 `npm install` 安装所有相关依赖。
3. 运行 `npm run build` 进行生产化编译。
4. 执行 `npm start`（请确保设置 `NODE_ENV=production`）即可在自建服务器上运行网关。

### 2. 配置与使用指南

#### 第一步：配置业务前端 (A站)

A站代表直面用户的出海业务商城。

1. 进入系统后台的 **Configuration (配置)** 标签页。
2. 在 **Configure Ingress (A Sites)** 区域，输入A站域名（如 `shop.com`）与内部标签。
3. 点击添加。系统会自动生成一串 API Key，请妥善保存，它将用于A站插件配置。

#### 第二步：配置支付网关池 (B站)

B站代表挂载真实支付账号（Stripe/Paypal等）的安全收银台域名。

1. 在 **Configuration** 页面的 **Configure Gateways (B Sites)** 中，输入安全域名。
2. 您可以一次性录入多个 B 站，以构建网关防风控池。

#### 第三步：选择分流策略

1. 在 **Configuration** 页面的底部 **Routing Rule Engine (路由引擎)** 中。
2. 选择合适的并发规则：
   - **混沌随机分发 (Random)**: 流量随机打到任何一个处于“激活”状态的B站上。
   - **严格顺延均摊 (Round-Robin)**: 按照顺序均匀地将订单分发给每一个B站，完美实现收款流水平摊防爆单。

### 3. WordPress / WooCommerce 插件对接

要让该路由网关发挥作用，您需要在 A站 和 B站 分别安装专用插件。

1. 进入系统后台的 **API 接口与插件对接** 标签页。
2. **下载 A 站插件包**: 点击下载按钮获取ZIP包。在 A 站 WooCommerce 插件后台上传并启用。
   - 前往 "WooCommerce -> 设置 -> 付款 -> VortexPay Secure"。
   - 勾选启用，填入 **Router URL (当前路由系统的网址)** 以及第一步中生成的 **API Key**。
3. **下载 B 站插件包**: 点击下载按钮获取ZIP包。在 B 站后台上传并启用。
   - 前往 "设置 -> VortexPay B Config"。
   - 填入 **Router URL (当前路由系统网址)**，用以保障支付成功后的 Webhook 异步回调能正确推送给路由网关。

---

### 4. Admin Password Reset (Emergency / 紧急密码重置)

**🇺🇸 English:**
If you lose access to your admin account after deploying to your own server, you can use the built-in reset script:
1. Ensure the database file `data.db` exists in the root directory.
2. Run the following command:
   ```bash
   node scripts/reset-admin.js
   ```
3. This will reset the password for `samlau0086@gmail.com` to `admin123456` and disable 2FA.

**🇨🇳 中文:**
如果您在自建服务器部署后无法登录管理员账号，可以使用内置的重置脚本：
1. 确保根目录下存在 `data.db` 数据库文件。
2. 执行以下命令：
   ```bash
   node scripts/reset-admin.js
   ```
3. 该脚本会将账号 `samlau0086@gmail.com` 的密码重置为 `admin123456`，并强制关闭 2FA 二次验证。
