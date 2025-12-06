# Tiptap Editor

基于 Tiptap 的富文本编辑器组件库。

## 安装

```bash
npm install @yourname/tiptap-editor
# 或
pnpm add @yourname/tiptap-editor
```

## 快速开始

```tsx
import { useEditor, EditorContent } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { MarkButton, Toolbar, ToolbarGroup } from '@yourname/tiptap-editor'
import '@yourname/tiptap-editor/dist/tiptap-editor.css'

function MyEditor() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Hello World!</p>',
  })

  return (
    <div>
      <Toolbar>
        <ToolbarGroup>
          <MarkButton type="bold" />
          <MarkButton type="italic" />
        </ToolbarGroup>
      </Toolbar>
      <EditorContent editor={editor} />
    </div>
  )
}
```

## 完整示例

查看 [`examples/`](./examples) 目录获取完整的编辑器实现：

- `simple-editor.tsx` - 功能完整的富文本编辑器
- `markdown-editor.tsx` - Markdown 编辑器
- `basic-usage.tsx` - 最简单的起步示例

## 构建

```bash
pnpm run build
```

构建产物：

- `dist/index.js` - ES Module
- `dist/index.cjs` - CommonJS
- `dist/index.d.ts` - TypeScript 类型
- `dist/tiptap-editor.css` - 样式文件

## 开发

```bash
git clone https://github.com/chenglu1/tiptap-editor.git
cd tiptap-editor
pnpm install
pnpm run dev
```

## 许可证

MIT
