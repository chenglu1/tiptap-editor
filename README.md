# Tiptap Editor

一个功能丰富、基于 Tiptap 的 React 富文本编辑器组件库,支持 Markdown、表格、图片上传等功能。

[![npm version](https://img.shields.io/npm/v/@yourname/tiptap-editor.svg)](https://www.npmjs.com/package/@yourname/tiptap-editor)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ 特性

- 📝 完整的富文本编辑功能(加粗、斜体、下划线、删除线等)
- 📋 Markdown 实时解析与渲染
- 🎨 代码高亮和语法支持
- 📊 表格编辑与浮动工具栏
- 🖼️ 图片上传与插入
- ✅ 任务列表、待办清单
- 🔢 数学公式支持 (KaTeX)
- 🎯 多级标题、引用、分割线
- 📱 响应式设计,支持移动端
- 🌗 深色模式支持
- ⌨️ 快捷键支持

## 📦 安装

首先配置 npm registry,在项目根目录创建 `.npmrc` 文件:

```
@chenglu1:registry=https://npm.pkg.github.com
```

然后安装:

```bash
npm install @chenglu1/tiptap-editor
# 或
pnpm add @chenglu1/tiptap-editor
# 或
yarn add @chenglu1/tiptap-editor
```

### Peer Dependencies

需要同时安装以下依赖:

```bash
npm install react react-dom @tiptap/react @tiptap/core
```

## 🚀 快速开始

### 基础用法

```tsx
import { useEditor, EditorContent } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { 
  MarkButton, 
  Toolbar, 
  ToolbarGroup,
  ToolbarSeparator 
} from '@chenglu1/tiptap-editor'
import '@chenglu1/tiptap-editor/styles'

function MyEditor() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>开始编辑...</p>',
  })

  return (
    <div>
      <Toolbar data-variant="fixed">
        <ToolbarGroup>
          <MarkButton editor={editor} type="bold" />
          <MarkButton editor={editor} type="italic" />
          <MarkButton editor={editor} type="strike" />
        </ToolbarGroup>
      </Toolbar>
      <EditorContent editor={editor} />
    </div>
  )
}
```

## 📚 完整示例

包内提供了两个完整的编辑器示例,可以直接在你的项目中使用:

### 1. Simple Editor - 富文本编辑器

```tsx
// 从 examples 导入完整的编辑器组件
import SimpleEditor from '@chenglu1/tiptap-editor/examples/simple-editor'
import '@chenglu1/tiptap-editor/examples/simple-editor.scss'

function App() {
  return <SimpleEditor />
}
```

**功能包含:**
- 完整的工具栏(撤销/重做、标题、列表、样式等)
- 表格操作与浮动工具栏
- 图片上传
- 颜色高亮
- 链接插入
- 文本对齐

### 2. Markdown Editor - Markdown 编辑器

```tsx
// 从 examples 导入 Markdown 编辑器
import MarkdownEditor from '@chenglu1/tiptap-editor/examples/markdown-editor'
import '@chenglu1/tiptap-editor/examples/markdown-editor.scss'
import 'katex/dist/katex.min.css'

function App() {
  return <MarkdownEditor />
}
```

**功能包含:**
- 左右分栏布局(Markdown 输入 + 实时渲染)
- Markdown 语法解析
- 数学公式支持
- 代码块高亮
- 表格编辑

## 🎨 可用组件

### UI 组件

| 组件 | 说明 |
|------|------|
| `MarkButton` | 文本样式按钮(加粗、斜体等) |
| `HeadingDropdownMenu` | 标题下拉菜单 |
| `ListDropdownMenu` | 列表下拉菜单 |
| `BlockquoteButton` | 引用块按钮 |
| `CodeBlockButton` | 代码块按钮 |
| `TableDropdownMenu` | 表格下拉菜单 |
| `TableFloatingToolbar` | 表格浮动工具栏 |
| `ImageUploadButton` | 图片上传按钮 |
| `TextAlignButton` | 文本对齐按钮 |
| `UndoRedoButton` | 撤销/重做按钮 |
| `ColorHighlightPopover` | 颜色高亮选择器 |
| `LinkPopover` | 链接编辑弹窗 |

### UI Primitives

| 组件 | 说明 |
|------|------|
| `Button` | 基础按钮 |
| `Toolbar` | 工具栏容器 |
| `ToolbarGroup` | 工具栏分组 |
| `ToolbarSeparator` | 工具栏分隔符 |
| `DropdownMenu` | 下拉菜单 |
| `Popover` | 弹出层 |
| `Card` | 卡片 |
| `Badge` | 徽章 |
| `Input` | 输入框 |

## 🔧 高级用法

### 自定义工具栏

```tsx
import { useEditor, EditorContent } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { 
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  HeadingDropdownMenu,
  MarkButton,
  ListDropdownMenu,
  ImageUploadButton
} from '@yourname/tiptap-editor'
import '@yourname/tiptap-editor/styles'

function CustomEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      // 添加更多扩展...
    ],
  })

  return (
    <>
      <Toolbar data-variant="fixed">
        <ToolbarGroup>
          <HeadingDropdownMenu editor={editor} levels={[1, 2, 3]} />
          <ListDropdownMenu editor={editor} types={["bulletList", "orderedList"]} />
        </ToolbarGroup>
        
        <ToolbarSeparator />
        
        <ToolbarGroup>
          <MarkButton editor={editor} type="bold" />
          <MarkButton editor={editor} type="italic" />
          <MarkButton editor={editor} type="code" />
        </ToolbarGroup>
        
        <ToolbarSeparator />
        
        <ToolbarGroup>
          <ImageUploadButton editor={editor} text="上传图片" />
        </ToolbarGroup>
      </Toolbar>
      
      <EditorContent editor={editor} className="tiptap" />
    </>
  )
}
```

### 配置图片上传

```tsx
import { ImageUploadNode } from '@yourname/tiptap-editor'

const editor = useEditor({
  extensions: [
    // ...其他扩展
    ImageUploadNode.configure({
      accept: "image/*",
      maxSize: 5 * 1024 * 1024, // 5MB
      limit: 3, // 最多3张
      upload: async (file) => {
        // 自定义上传逻辑
        const formData = new FormData()
        formData.append('file', file)
        
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })
        
        const data = await response.json()
        return data.url // 返回图片 URL
      },
      onError: (error) => {
        console.error('上传失败:', error)
      },
    }),
  ],
})
```

## 📖 示例文件说明

包内 `examples/` 目录包含以下文件:

```
examples/
├── simple-editor.tsx         # 富文本编辑器组件
├── simple-editor.scss        # 富文本编辑器样式
├── markdown-editor.tsx       # Markdown 编辑器组件
├── markdown-editor.scss      # Markdown 编辑器样式
├── basic-usage.tsx           # 最简单的使用示例
├── theme-toggle.tsx          # 主题切换组件
└── data/
    └── content.ts            # 示例内容数据
```

你可以直接复制这些文件到你的项目中进行自定义修改。

## 🛠️ 开发

克隆仓库并本地开发:

```bash
git clone https://github.com/chenglu1/tiptap-editor.git
cd tiptap-editor
pnpm install
pnpm run dev
```

构建:

```bash
pnpm run build
```

## 📄 许可证

MIT © [Your Name]

## 🤝 贡献

欢迎提交 Issue 和 Pull Request!

## 🔗 相关链接

- [Tiptap 官方文档](https://tiptap.dev/)
- [GitHub 仓库](https://github.com/chenglu1/tiptap-editor)
- [npm 包](https://github.com/chenglu1/tiptap-editor/packages)
- [问题反馈](https://github.com/chenglu1/tiptap-editor/issues)
