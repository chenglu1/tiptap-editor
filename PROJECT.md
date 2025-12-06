# 项目结构说明

## 📁 目录结构

```
tiptap-editor/
├── src/                      # 源代码
│   ├── components/          # React 组件
│   │   ├── tiptap-ui/      # 编辑器 UI 组件
│   │   ├── tiptap-ui-primitive/  # 基础 UI 组件
│   │   └── tiptap-node/    # Tiptap 节点扩展
│   ├── hooks/              # React Hooks
│   ├── lib/                # 工具函数
│   ├── styles/             # 全局样式
│   └── index.ts            # 导出入口
│
├── examples/                # 完整示例
│   ├── simple-editor.tsx   # 富文本编辑器
│   ├── markdown-editor.tsx # Markdown 编辑器
│   └── data/               # 示例数据
│
├── dist/                    # 构建产物 (自动生成)
│   ├── index.js            # ES Module
│   ├── index.cjs           # CommonJS
│   └── style.css           # 样式文件
│
├── docs/                    # 文档
└── public/                  # 静态资源

```

## 🔨 开发命令

```bash
pnpm install    # 安装依赖
pnpm run dev    # 开发模式
pnpm run build  # 构建
pnpm run preview # 预览
```

## 📦 发布流程

1. 更新版本: `npm version patch/minor/major`
2. 构建: `pnpm run build`
3. 发布: `npm publish`

## 🎯 已优化

- ✅ 清理了多余的 markdown 文档
- ✅ 删除了 package-build 目录
- ✅ 删除了 src/components/tiptap-templates (重复)
- ✅ 优化了 .gitignore 和 .npmignore
- ✅ 增强了 package.json 关键词
- ✅ 精简了项目结构
