# GitHub Actions 自动部署配置指南

## 📋 配置步骤

### 1. 获取 Vercel Token
1. 访问 [Vercel Settings - Tokens](https://vercel.com/account/tokens)
2. 点击 "Create Token"
3. 输入 Token 名称（例如：`github-actions`）
4. 复制生成的 Token

### 2. 获取 Vercel 项目信息
在项目根目录运行以下命令：
```bash
vercel link
```
这会创建 `.vercel/project.json` 文件，包含：
- `orgId` (VERCEL_ORG_ID)
- `projectId` (VERCEL_PROJECT_ID)

或者访问 Vercel Dashboard 获取：
1. 打开你的项目
2. 进入 Settings → General
3. 找到 Project ID 和 Organization ID

### 3. 在 GitHub 仓库添加 Secrets
1. 进入 GitHub 仓库
2. Settings → Secrets and variables → Actions
3. 点击 "New repository secret" 添加以下三个 secrets：

| Secret 名称 | 值 | 说明 |
|------------|-----|------|
| `VERCEL_TOKEN` | 从步骤1获取 | Vercel 访问令牌 |
| `VERCEL_ORG_ID` | 从步骤2获取 | 组织/团队 ID |
| `VERCEL_PROJECT_ID` | 从步骤2获取 | 项目 ID |

## 🚀 触发部署

### 自动触发
- 推送代码到 `main` 分支时自动部署

### 手动触发
1. 进入仓库的 Actions 页面
2. 选择 "Deploy to Vercel Production" 工作流
3. 点击 "Run workflow"
4. 选择分支并点击 "Run workflow"

## 📊 工作流说明

此工作流会：
1. ✅ 检出代码
2. ✅ 设置 pnpm 和 Node.js 环境
3. ✅ 安装依赖
4. ✅ 构建项目
5. ✅ 部署到 Vercel 生产环境
6. ✅ 显示部署状态通知

## 🔧 自定义配置

### 修改触发分支
编辑 `.github/workflows/deploy-production.yml`：
```yaml
on:
  push:
    branches:
      - main        # 改为你的主分支
      - production  # 可以添加多个分支
```

### 添加部署前测试
在 `Build project` 步骤前添加：
```yaml
- name: Run tests
  run: pnpm run test

- name: Lint check
  run: pnpm run lint
```

## 📝 注意事项

- 确保 Vercel Token 具有部署权限
- 首次部署可能需要在 Vercel 手动导入项目
- 部署失败时检查 Actions 日志获取详细错误信息
- 建议定期更新 Vercel Token
