import './App.css'
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom'
import { SimpleEditor } from '../examples/simple-editor'
import MarkdownEditorDemo  from '../examples/markdown-editor'
import GeminiTest from '../examples/gemini-test.tsx'

// 路由配置
const routerConfig = [
  {
    path: '/',
    element: (
      <div className="app-container">
        <nav className="navigation">
          <h1>Tiptap Editor Examples</h1>
          <ul className="nav-list">
            <li><Link to="/simple">Simple Editor</Link></li>
            <li><Link to="/markdown">Markdown Editor</Link></li>
            <li><Link to="/gemini">Gemini API Test</Link></li>
          </ul>
        </nav>
        <main className="main-content">
          {/* 这里可以放首页内容 */}
          <h2>欢迎使用 Tiptap Editor</h2>
          <p>请选择左侧导航查看不同的编辑器示例</p>
        </main>
      </div>
    )
  },
  {
    path: '/simple',
    element: (
      <div className="app-container">
        <nav className="navigation">
          <h1>Tiptap Editor Examples</h1>
          <ul className="nav-list">
            <li><Link to="/simple">Simple Editor</Link></li>
            <li><Link to="/markdown">Markdown Editor</Link></li>
            <li><Link to="/gemini">Gemini API Test</Link></li>
          </ul>
        </nav>
        <main className="main-content">
          <h2>Simple Editor</h2>
          <SimpleEditor />
        </main>
      </div>
    )
  },
  {
    path: '/markdown',
    element: (
      <div className="app-container">
        <nav className="navigation">
          <h1>Tiptap Editor Examples</h1>
          <ul className="nav-list">
            <li><Link to="/simple">Simple Editor</Link></li>
            <li><Link to="/markdown">Markdown Editor</Link></li>
            <li><Link to="/gemini">Gemini API Test</Link></li>
          </ul>
        </nav>
        <main className="main-content">
          <h2>Markdown Editor</h2>
          <MarkdownEditorDemo />
        </main>
      </div>
    )
  },
  {
    path: '/gemini',
    element: (
      <div className="app-container">
        <nav className="navigation">
          <h1>Tiptap Editor Examples</h1>
          <ul className="nav-list">
            <li><Link to="/simple">Simple Editor</Link></li>
            <li><Link to="/markdown">Markdown Editor</Link></li>
            <li><Link to="/gemini">Gemini API Test</Link></li>
          </ul>
        </nav>
        <main className="main-content">
          <GeminiTest />
        </main>
      </div>
    )
  },
  {
    path: '*',
    element: (
      <div className="app-container">
        <nav className="navigation">
          <h1>Tiptap Editor Examples</h1>
          <ul className="nav-list">
            <li><Link to="/simple">Simple Editor</Link></li>
            <li><Link to="/markdown">Markdown Editor</Link></li>
            <li><Link to="/gemini">Gemini API Test</Link></li>
          </ul>
        </nav>
        <main className="main-content">
          <h2>404 - Page Not Found</h2>
          <p>抱歉，您访问的页面不存在</p>
          <Link to="/" className="back-home-link">返回首页</Link>
        </main>
      </div>
    )
  }
]

// 创建路由
const router = createBrowserRouter(routerConfig)

function App() {
  return <RouterProvider router={router} />
}

export default App
