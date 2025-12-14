# Vercel 部署指南

本文档说明如何将项目部署到 Vercel，包括手动部署和 Git 自动部署。

## ⚡ 快速开始

**推荐方式：Git 自动部署**
1. 配置 GitHub Secrets（见下方步骤）
2. 推送到 `main` 分支即可自动部署

**手动部署**：
```bash
# Windows
.\deploy.ps1

# Linux/Mac
./deploy.sh
```

## 🚀 部署方式

### 方式一：使用 Vercel CLI（手动部署）

#### Windows (PowerShell)

```powershell
# 部署到生产环境（默认）
.\deploy.ps1

# 部署到预览环境
.\deploy.ps1 preview
```

#### Linux/Mac

```bash
chmod +x deploy.sh

# 部署到生产环境（默认）
./deploy.sh

# 部署到预览环境
./deploy.sh preview
```

#### 手动部署命令

```bash
# 安装 Vercel CLI（如果未安装）
npm install -g vercel

# 登录 Vercel
vercel login

# 部署到生产环境
npm run deploy

# 或部署到预览环境
npm run deploy:preview
```

### 方式二：Git 提交自动部署（推荐）

配置 GitHub Actions 后，每次推送到 `main` 分支会自动触发部署。

#### 配置步骤

**1. 获取 Vercel Token**

1. 访问 [Vercel Settings - Tokens](https://vercel.com/account/tokens)
2. 点击 **"Create Token"** 按钮
3. 输入 Token 名称：`github-actions-deploy`
4. 选择过期时间：**No expiration**（推荐）
5. **立即复制 Token**（只显示一次！）

**2. 获取项目信息**

项目信息可以从 `.vercel/project.json` 文件获取，或运行：
```bash
cat .vercel/project.json  # Linux/Mac
type .vercel\project.json  # Windows
```

**3. 在 GitHub 添加 Secrets**

1. 打开 GitHub 仓库
2. 进入：**Settings** → **Secrets and variables** → **Actions**
3. 点击 **"New repository secret"**，添加以下 3 个 Secrets：

| Secret 名称 | 值 | 说明 |
|------------|-----|------|
| `VERCEL_TOKEN` | 从步骤 1 获取 | Vercel API Token |
| `VERCEL_ORG_ID` | 从 `.vercel/project.json` 获取 `orgId` | 组织 ID |
| `VERCEL_PROJECT_ID` | 从 `.vercel/project.json` 获取 `projectId` | 项目 ID |

**4. 测试部署**

配置完成后，可以通过以下方式测试：

- **手动触发**：进入 GitHub Actions 页面，选择 "Deploy to Vercel" 工作流，点击 "Run workflow"
- **Git 提交触发**：
  ```bash
  git add .
  git commit -m "feat: enable auto deploy"
  git push origin main
  ```

#### 部署行为

| 操作 | 触发环境 | 说明 |
|------|---------|------|
| 推送到 `main` 分支 | 🟢 生产环境 | 自动部署到生产 |
| 创建 Pull Request | 🟡 预览环境 | 创建预览部署 |
| 合并 Pull Request | 🟢 生产环境 | 自动部署到生产 |
| 手动触发工作流 | 🟢 生产环境 | 在 Actions 页面手动运行 |

### 方式三：通过 Vercel 网站

1. 访问 [Vercel](https://vercel.com)
2. 导入你的 GitHub 仓库
3. Vercel 会自动检测项目配置并部署

## 📋 配置文件说明

### `vercel.json`

Vercel 配置文件，包含：
- 构建命令：`npm run build`
- 输出目录：`dist`
- SPA 路由重写规则（所有路由重定向到 `index.html`）
- 静态资源缓存策略（1 年缓存）

### `.github/workflows/deploy-vercel.yml`

GitHub Actions 工作流，自动：
- 安装依赖（使用 npm 缓存加速）
- 构建项目
- 部署到 Vercel
  - Pull Request → 预览环境
  - Push to main/master → 生产环境

## 🔧 环境变量

如果项目需要环境变量，可以在以下位置配置：

1. **Vercel 网站**：项目设置 → Environment Variables
2. **本地部署**：创建 `.env.local` 文件（不要提交到 Git）

## 🆘 常见问题

### 1. 部署后页面空白

检查 `vercel.json` 中的 `rewrites` 配置是否正确，确保所有路由都指向 `index.html`。

### 2. 构建失败

- 检查 Node.js 版本是否兼容
- 确保所有依赖都已正确安装
- 查看构建日志中的错误信息

### 3. 静态资源 404

检查 `vercel.json` 中的 `outputDirectory` 是否指向正确的构建输出目录。

### 4. GitHub Actions 工作流失败

- 检查 GitHub Secrets 是否已正确配置
- 确认 Secret 名称拼写正确（区分大小写）
- 确认 Vercel Token 未过期
- 查看 Actions 日志获取详细错误信息

## 🔗 相关链接

- [Vercel 文档](https://vercel.com/docs)
- [Vercel CLI 文档](https://vercel.com/docs/cli)
- [GitHub Actions 文档](https://docs.github.com/en/actions)
- **生产地址**: https://tiptapeditor-xi.vercel.app
