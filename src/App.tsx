import './App.css'
import { SimpleEditor } from '../examples/simple-editor'
import MarkdownEditorDemo  from '../examples/markdown-editor'

function App() {


  return (
    <div className='flex justify-center w-screen'>
      <SimpleEditor />
      <MarkdownEditorDemo />
    </div>
  )
}

export default App
