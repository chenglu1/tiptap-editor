import './App.css'
import { SimpleEditor } from './components/tiptap-templates//simple/simple-editor'
import MarkdownEditorDemo  from './components/tiptap-templates//simple/markdown-editor'

function App() {


  return (
    <div className='flex justify-center w-screen'>
      <SimpleEditor />
      <MarkdownEditorDemo />
    </div>
  )
}

export default App
