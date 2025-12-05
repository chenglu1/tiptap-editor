# Tiptap Editor Monorepo

一个基于 **Tiptap** 的现代化富文本编辑器组件库,采用 **Monorepo** 架构。

## 📦 项目结构

```
TiptapEditor/
├── apps/
│   └── demo/                    # 演示应用
├── packages/
│   ├── ui-primitives/           # 基础 UI 组件 (Button, Dropdown, Popover 等)
│   ├── nodes/                   # Tiptap 节点扩展 (Image, Blockquote, CodeBlock 等)
│   ├── ui-components/           # 业务 UI 组件 (HeadingDropdown, TableButton 等)
│   └── hooks/                   # 通用 Hooks
└── pnpm-workspace.yaml          # pnpm workspace 配置
```

## 🚀 快速开始

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

### 构建所有包

```bash
# 构建所有 packages
pnpm build:packages

# 构建 demo 应用
pnpm build:demo

# 构建全部
pnpm build
```

### 运行 Lint

```bash
pnpm lint
```

## 📚 Packages

### @tiptap-editor/ui-primitives

基础 UI 组件库,包含:
- Button, Dropdown Menu, Popover, Toolbar
- Input, Card, Badge, Tooltip
- Separator, Spacer

### @tiptap-editor/nodes

Tiptap 编辑器节点扩展:
- Blockquote, Code Block, Heading
- Horizontal Rule, Image, Image Upload
- List, Paragraph

### @tiptap-editor/ui-components

业务级 UI 组件:
- Heading/List Dropdown Menu
- Table Button & Floating Toolbar
- Image Upload Button, Link/Color Highlight Popover
- Mark Button, Text Align Button, Undo/Redo Button
- 完整的图标集

### @tiptap-editor/hooks

通用 React Hooks:
- `useComposedRef`, `useCursorVisibility`, `useElementRect`
- `useMenuNavigation`, `useMobile`, `useScrolling`
- `useThrottledCallback`, `useTiptapEditor`
- `useUnmount`, `useWindowSize`

## 🛠️ 技术栈

- **React 19** - UI 框架
- **TypeScript** - 类型安全
- **Tiptap 3.9** - 富文本编辑器核心
- **Vite 7** - 构建工具
- **pnpm** - 包管理器
- **Radix UI** - 无障碍组件库
- **SCSS** - 样式预处理

## ✨ 主要功能

- 富文本编辑（加粗、斜体、下划线、删除线、代码等）
- 表格节点支持行/列添加、删除，浮动工具栏操作
- 图片上传与插入
- 任务列表、待办清单
- 高亮、引用、标题、分割线等
- 支持移动端与响应式布局

## 📄 License

MIT
