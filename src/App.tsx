import './App.css'
import { createBrowserRouter, RouterProvider, Link, useLocation } from 'react-router-dom'
import { SimpleEditor } from '../examples/simple-editor'
import MarkdownEditorDemo from '../examples/markdown-editor'
import GeminiTest from '../examples/gemini-test.tsx'

// 布局组件
function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation()

  return (
    <div className="app-container">
      {/* 顶部导航栏 */}
      <header className="app-header">
        <div className="header-content">
          <Link to="/" className="logo">
            <div className="logo-icon">✍️</div>
            <span className="logo-text">Tiptap Editor</span>
          </Link>
          <nav className="header-nav">
            <Link 
              to="/simple" 
              className={location.pathname === '/simple' ? 'nav-link active' : 'nav-link'}
            >
              <span className="nav-icon">📝</span>
              <span>富文本编辑器</span>
            </Link>
            <Link 
              to="/markdown" 
              className={location.pathname === '/markdown' ? 'nav-link active' : 'nav-link'}
            >
              <span className="nav-icon">📄</span>
              <span>Markdown 编辑器</span>
            </Link>
            {/* <Link 
              to="/gemini" 
              className={location.pathname === '/gemini' ? 'nav-link active' : 'nav-link'}
            >
              <span className="nav-icon">🤖</span>
              <span>AI 助手</span>
            </Link> */}
            {/* 外部链接：GitHub */}
            <a
              href="https://github.com/chenglu1/tiptap-editor"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
            >
              <span className="nav-icon">🐙</span>
              <span>GitHub</span>
            </a>
          </nav>
        </div>
      </header>

      {/* 主内容区域 */}
      <main className="app-main">
        {children}
      </main>
    </div>
  )
}

// 首页组件
function HomePage() {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="gradient-text">强大的富文本编辑器</span>
          </h1>
          <p className="hero-description">
            基于 Tiptap 构建，支持 Markdown、表格、图片上传、数学公式等丰富功能
          </p>
          <div className="hero-actions">
            <Link to="/simple" className="btn btn-primary">
              开始使用 →
            </Link>
            <Link to="/markdown" className="btn btn-secondary">
              查看示例
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="floating-card card-1">📝</div>
          <div className="floating-card card-2">📄</div>
          <div className="floating-card card-3">🎨</div>
        </div>
      </section>

      <section className="features-section">
        <h2 className="section-title">核心功能</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">✨</div>
            <h3>丰富的编辑功能</h3>
            <p>支持加粗、斜体、下划线、删除线、代码、标题、列表等常用格式</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>表格编辑</h3>
            <p>完整的表格支持，包括插入、删除、合并单元格等操作</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🖼️</div>
            <h3>图片上传</h3>
            <p>支持图片上传和插入，可自定义上传逻辑和样式</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>Markdown 支持</h3>
            <p>实时 Markdown 解析和渲染，支持数学公式和代码高亮</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎨</div>
            <h3>主题定制</h3>
            <p>支持深色模式和自定义主题，适配不同使用场景</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>高性能</h3>
            <p>基于 ProseMirror 构建，性能优异，支持大型文档编辑</p>
          </div>
        </div>
      </section>

      {/* 推荐区域 */}
      <section className="recommend-section">
        <div className="recommend-card">
          <div className="recommend-content">
            <div className="recommend-badge">🎉 推荐</div>
            <h3>好用的梯子工具</h3>
            <p>稳定快速，支持多平台使用</p>
            <a 
              href="https://wmsxwd-3.men/#/register?code=2YYQA7v6" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-white"
            >
              立即访问 →
            </a>
          </div>
          <div className="recommend-visual">
            <div className="recommend-gradient"></div>
          </div>
        </div>
      </section>
    </div>
  )
}

// 路由配置
const routerConfig = [
  {
    path: '/',
    element: (
      <Layout>
        <HomePage />
      </Layout>
    )
  },
  {
    path: '/simple',
    element: (
      <Layout>
        <div className="page-content">
          <div className="page-header">
            <h1>富文本编辑器</h1>
            <p>功能完整的富文本编辑器，支持表格、图片、链接等</p>
          </div>
          <div className="editor-wrapper">
            <SimpleEditor />
          </div>
        </div>
      </Layout>
    )
  },
  {
    path: '/markdown',
    element: (
      <Layout>
        <div className="page-content">
          <div className="page-header">
            <h1>Markdown 编辑器</h1>
            <p>实时预览的 Markdown 编辑器，支持数学公式和代码高亮</p>
          </div>
          <div className="editor-wrapper">
            <MarkdownEditorDemo />
          </div>
        </div>
      </Layout>
    )
  },
  {
    path: '/gemini',
    element: (
      <Layout>
        <div className="page-content">
          <div className="page-header">
            <h1>AI 助手</h1>
            <p>基于 Gemini API 的智能写作助手</p>
          </div>
          <div className="editor-wrapper">
            <GeminiTest />
          </div>
        </div>
      </Layout>
    )
  },
  {
    path: '*',
    element: (
      <Layout>
        <div className="error-page">
          <div className="error-content">
            <h1>404</h1>
            <p>抱歉，您访问的页面不存在</p>
            <Link to="/" className="btn btn-primary">
              返回首页
            </Link>
          </div>
        </div>
      </Layout>
    )
  }
]

// 创建路由
const router = createBrowserRouter(routerConfig)

function App() {
  return <RouterProvider router={router} />
}

export default App
