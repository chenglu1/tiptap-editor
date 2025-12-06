# GitHub Packages 发布指南

GitHub Packages 是 GitHub 提供的包托管服务,与仓库紧密集成。

## 🔧 配置步骤

### 1. 创建 .npmrc 文件

在项目根目录创建 `.npmrc`:

```
@chenglu1:registry=https://npm.pkg.github.com
```

或者使用环境变量:

```
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

### 2. 修改 package.json

```json
{
  "name": "@chenglu1/tiptap-editor",
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  }
}
```

### 3. 生成 GitHub Token

1. 访问 https://github.com/settings/tokens
2. 点击 "Generate new token (classic)"
3. 勾选权限:
   - `write:packages` (上传包)
   - `read:packages` (下载包)
   - `delete:packages` (删除包,可选)
4. 复制生成的 token

### 4. 登录 GitHub Packages

```bash
# 使用 token 登录
npm login --scope=@chenglu1 --registry=https://npm.pkg.github.com

# 输入信息:
# Username: 你的 GitHub 用户名
# Password: 粘贴刚才生成的 token
# Email: 你的邮箱
```

### 5. 发布

```bash
# 构建
pnpm run build

# 发布到 GitHub Packages
npm publish
```

## 📥 用户如何安装

用户需要配置 `.npmrc`:

```
@chenglu1:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

然后安装:

```bash
npm install @chenglu1/tiptap-editor
```

## ✅ 优势

- ✅ 与 GitHub 仓库集成
- ✅ 支持私有包
- ✅ 免费(公开包)
- ✅ 版本管理方便
- ✅ 可以限制访问权限

## ⚠️ 注意事项

- 包名必须以 `@username` 或 `@organization` 开头
- 公开包免费,私有包需要 GitHub Pro
- 用户安装时需要 GitHub token(私有包)
