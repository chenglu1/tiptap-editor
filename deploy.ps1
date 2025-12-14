# Vercel 自动化部署脚本
# 使用方法: .\deploy.ps1

Write-Host "🚀 开始部署到 Vercel..." -ForegroundColor Green

# 检查是否安装了 Vercel CLI
Write-Host "📦 检查 Vercel CLI..." -ForegroundColor Yellow
$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue

if (-not $vercelInstalled) {
    Write-Host "⚠️  Vercel CLI 未安装，正在安装..." -ForegroundColor Yellow
    npm install -g vercel
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Vercel CLI 安装失败" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ Vercel CLI 安装成功" -ForegroundColor Green
} else {
    Write-Host "✅ Vercel CLI 已安装" -ForegroundColor Green
}

# 检查是否登录
Write-Host "🔐 检查登录状态..." -ForegroundColor Yellow
$whoami = vercel whoami 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  未登录 Vercel，请先登录..." -ForegroundColor Yellow
    vercel login
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ 登录失败" -ForegroundColor Red
        exit 1
    }
}

# 安装依赖
Write-Host "📥 安装项目依赖..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ 依赖安装失败" -ForegroundColor Red
    exit 1
}
Write-Host "✅ 依赖安装成功" -ForegroundColor Green

# 构建项目
Write-Host "🔨 构建项目..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ 构建失败" -ForegroundColor Red
    exit 1
}
Write-Host "✅ 构建成功" -ForegroundColor Green

# 部署到 Vercel
Write-Host "🌐 部署到 Vercel..." -ForegroundColor Yellow
$env = $args[0]

if ($env -eq "preview" -or $env -eq "dev") {
    Write-Host "🚀 部署到预览环境..." -ForegroundColor Cyan
    vercel
} else {
    Write-Host "🚀 部署到生产环境..." -ForegroundColor Cyan
    vercel --prod
}

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ 部署成功！" -ForegroundColor Green
} else {
    Write-Host "❌ 部署失败" -ForegroundColor Red
    exit 1
}

