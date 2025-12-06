/**
 * 这是使用 @yourname/tiptap-editor 包的示例
 * 
 * 在实际项目中，你需要:
 * 1. 安装包: pnpm add @yourname/tiptap-editor
 * 2. 导入组件和 hooks: 
 *    import { 
 *      MarkButton, 
 *      HeadingDropdownMenu,
 *      Toolbar,
 *      useTiptapEditor 
 *    } from '@yourname/tiptap-editor'
 * 3. 导入样式: import '@yourname/tiptap-editor/dist/tiptap-editor.css'
 * 4. 参考 simple-editor.tsx 和 markdown-editor.tsx 组装你自己的编辑器
 */

import { useEditor, EditorContent } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
// 导入你需要的组件
// import { MarkButton, Toolbar } from '@yourname/tiptap-editor'
// import '@yourname/tiptap-editor/dist/tiptap-editor.css'

function BasicEditor() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Hello World! 🌎️</p>',
  })

  return (
    <div>
      <EditorContent editor={editor} />
    </div>
  )
}

export default BasicEditor
