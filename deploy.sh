#!/bin/bash

# Vercel 自动化部署脚本
# 使用方法: ./deploy.sh

set -e

echo "🚀 开始部署到 Vercel..."

# 检查是否安装了 Vercel CLI
echo "📦 检查 Vercel CLI..."
if ! command -v vercel &> /dev/null; then
    echo "⚠️  Vercel CLI 未安装，正在安装..."
    npm install -g vercel
    if [ $? -ne 0 ]; then
        echo "❌ Vercel CLI 安装失败"
        exit 1
    fi
    echo "✅ Vercel CLI 安装成功"
else
    echo "✅ Vercel CLI 已安装"
fi

# 检查是否登录
echo "🔐 检查登录状态..."
if ! vercel whoami &> /dev/null; then
    echo "⚠️  未登录 Vercel，请先登录..."
    vercel login
    if [ $? -ne 0 ]; then
        echo "❌ 登录失败"
        exit 1
    fi
fi

# 安装依赖
echo "📥 安装项目依赖..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ 依赖安装失败"
    exit 1
fi
echo "✅ 依赖安装成功"

# 构建项目
echo "🔨 构建项目..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ 构建失败"
    exit 1
fi
echo "✅ 构建成功"

# 部署到 Vercel
echo "🌐 部署到 Vercel..."
ENV=${1:-prod}

if [ "$ENV" = "preview" ] || [ "$ENV" = "dev" ]; then
    echo "🚀 部署到预览环境..."
    vercel
else
    echo "🚀 部署到生产环境..."
    vercel --prod
fi

if [ $? -eq 0 ]; then
    echo "✅ 部署成功！"
else
    echo "❌ 部署失败"
    exit 1
fi

