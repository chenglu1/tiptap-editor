import { GoogleGenAI } from "@google/genai"
import React, { useState } from "react"
import "./gemini-test.scss"

const GEMINI_API_KEY = "AIzaSyCy1smBSz97O1mmselp-OvpHkfQOtz4Ge4"
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY })

type TestMode = "text" | "stream" | "image-gen" | "image-understand" | "function" | "embedding"

const GeminiTest: React.FC = () => {
  const [prompt, setPrompt] = useState("")
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [model, setModel] = useState("gemini-2.5-flash")
  const [testMode, setTestMode] = useState<TestMode>("text")
  const [imageFile, setImageFile] = useState<File | null>(null)

  // 文本生成
  const testTextGeneration = async () => {
    if (!prompt.trim()) {
      setError("请输入提示词")
      return
    }

    setLoading(true)
    setError("")
    setResponse("")

    try {
      const result = await ai.models.generateContent({
        model,
        contents: prompt,
      })
      setResponse(result.text || "无响应")
    } catch (err) {
      setError(err instanceof Error ? err.message : "请求失败")
    } finally {
      setLoading(false)
    }
  }

  // 流式文本生成
  const testStreamGeneration = async () => {
    if (!prompt.trim()) {
      setError("请输入提示词")
      return
    }

    setLoading(true)
    setError("")
    setResponse("")

    try {
      const stream = await ai.models.generateContentStream({
        model,
        contents: prompt,
      })

      let accumulatedText = ""
      for await (const chunk of stream) {
        const text = chunk.text
        if (text) {
          accumulatedText += text
          setResponse(accumulatedText)
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "流式请求失败")
    } finally {
      setLoading(false)
    }
  }

  // 图片生成
  const testImageGeneration = async () => {
    if (!prompt.trim()) {
      setError("请输入图片描述")
      return
    }

    setLoading(true)
    setError("")
    setResponse("")

    try {
      const result = await ai.models.generateContent({
        model: "gemini-2.5-flash-image",
        contents: prompt,
      })

      if (!result.candidates?.[0]?.content?.parts) {
        setResponse("未生成图片")
        return
      }

      let imageGenerated = false
      for (const part of result.candidates[0].content.parts) {
        if (part.text) {
          setResponse((prev) => prev + part.text + "\n")
        } else if (part.inlineData) {
          const imageData = part.inlineData.data
          const mimeType = part.inlineData.mimeType || "image/png"
          
          // 创建可显示的图片 URL
          const base64String = `data:${mimeType};base64,${imageData}`
          setResponse((prev) => prev + `\n\n生成的图片:\n${base64String}`)
          imageGenerated = true
        }
      }

      if (!imageGenerated) {
        setResponse("未生成图片")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "图片生成失败")
    } finally {
      setLoading(false)
    }
  }

  // 图像理解
  const testImageUnderstanding = async () => {
    if (!imageFile) {
      setError("请先上传图片")
      return
    }

    setLoading(true)
    setError("")
    setResponse("")

    try {
      // 读取图片为 base64
      const reader = new FileReader()
      reader.onloadend = async () => {
        try {
          const base64data = reader.result as string
          const base64Content = base64data.split(",")[1]

          const result = await ai.models.generateContent({
            model,
            contents: [
              {
                parts: [
                  {
                    inlineData: {
                      data: base64Content,
                      mimeType: imageFile.type,
                    },
                  },
                  { text: prompt || "请描述这张图片" },
                ],
              },
            ],
          })

          setResponse(result.text || "无响应")
        } catch (err) {
          setError(err instanceof Error ? err.message : "图像理解失败")
        } finally {
          setLoading(false)
        }
      }
      reader.readAsDataURL(imageFile)
    } catch (err) {
      setError(err instanceof Error ? err.message : "读取图片失败")
      setLoading(false)
    }
  }

  // 函数调用 (简化版本 - Gemini SDK 的函数调用支持因版本不同而异)
  const testFunctionCalling = async () => {
    setLoading(true)
    setError("")
    setResponse("")

    try {
      const result = await ai.models.generateContent({
        model,
        contents: prompt || "波士顿今天天气如何？",
      })

      // 模拟函数调用结果
      const mockWeatherData = {
        city: "波士顿",
        temperature: "22°C",
        condition: "晴天",
        humidity: "65%",
      }

      setResponse(
        JSON.stringify(
          {
            userQuery: prompt || "波士顿今天天气如何？",
            aiResponse: result.text,
            note: "函数调用功能需要根据具体 SDK 版本实现",
            mockFunctionResult: mockWeatherData,
          },
          null,
          2
        )
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : "函数调用失败")
    } finally {
      setLoading(false)
    }
  }

  // Embedding
  const testEmbedding = async () => {
    if (!prompt.trim()) {
      setError("请输入文本")
      return
    }

    setLoading(true)
    setError("")
    setResponse("")

    try {
      const result = await ai.models.embedContent({
        model: "text-embedding-004",
        contents: prompt,
      })

      const embeddings = result.embeddings?.[0]?.values || []
      setResponse(
        `Embedding 向量 (前10维):\n${embeddings.slice(0, 10).join(", ")}...\n\n总维度: ${embeddings.length}`
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : "Embedding 失败")
    } finally {
      setLoading(false)
    }
  }

  // 执行测试
  const handleTest = () => {
    switch (testMode) {
      case "text":
        testTextGeneration()
        break
      case "stream":
        testStreamGeneration()
        break
      case "image-gen":
        testImageGeneration()
        break
      case "image-understand":
        testImageUnderstanding()
        break
      case "function":
        testFunctionCalling()
        break
      case "embedding":
        testEmbedding()
        break
      default:
        testTextGeneration()
    }
  }

  const modeLabels: Record<TestMode, string> = {
    text: "文本生成",
    stream: "流式生成",
    "image-gen": "图片生成",
    "image-understand": "图像理解",
    function: "函数调用",
    embedding: "文本嵌入",
  }

  return (
    <div className="gemini-test-container">
      {/* API 配置卡片 */}
      <div className="config-card">
        <div className="config-header">
          <div className="config-icon">⚙️</div>
          <h2>API 配置</h2>
        </div>
        <div className="config-grid">
          <div className="config-item">
            <span className="config-label">API Key</span>
            <span className="config-value">{GEMINI_API_KEY.slice(0, 20)}...</span>
          </div>
          <div className="config-item">
            <span className="config-label">SDK</span>
            <span className="config-value">@google/genai</span>
          </div>
          <div className="config-item">
            <span className="config-label">当前模型</span>
            <span className="config-value model-badge">{model}</span>
          </div>
          <div className="config-item">
            <span className="config-label">测试模式</span>
            <span className="config-value mode-badge">{modeLabels[testMode]}</span>
          </div>
        </div>
      </div>

      {/* 控制面板 */}
      <div className="control-panel">
        <div className="control-group">
          <label className="control-label">
            <span className="label-icon">🤖</span>
            选择模型
          </label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="control-select"
          >
            <option value="gemini-2.5-flash">Gemini 2.5 Flash</option>
          </select>
        </div>

        <div className="control-group">
          <label className="control-label">
            <span className="label-icon">🎯</span>
            测试模式
          </label>
          <select
            value={testMode}
            onChange={(e) => setTestMode(e.target.value as TestMode)}
            className="control-select"
          >
            <option value="text">文本生成</option>
            <option value="stream">流式生成</option>
            <option value="image-gen">图片生成</option>
            <option value="image-understand">图像理解</option>
            <option value="function">函数调用</option>
            <option value="embedding">文本嵌入</option>
          </select>
        </div>
      </div>

      {/* 输入区域 */}
      <div className="input-section">
        {testMode === "image-understand" && (
          <div className="file-upload-area">
            <label className="file-label">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="file-input"
              />
              <div className="file-button">
                <span className="file-icon">📷</span>
                {imageFile ? (
                  <span className="file-name">{imageFile.name}</span>
                ) : (
                  <span>上传图片</span>
                )}
              </div>
            </label>
          </div>
        )}

        <div className="input-wrapper">
          <textarea
            className="prompt-input"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={
              testMode === "image-gen"
                ? "描述你想生成的图片，例如：Create a picture of a nano banana dish in a fancy restaurant with a Gemini theme"
                : testMode === "image-understand"
                  ? "描述你想了解图片的什么内容"
                  : testMode === "function"
                    ? "询问天气，例如：波士顿今天天气如何？"
                    : "输入你的提示词，例如：写一首关于 AI 的诗"
            }
            rows={6}
          />
          <div className="input-footer">
            <span className="input-hint">💡 输入提示词后点击开始测试</span>
            <button 
              className="test-button" 
              onClick={handleTest} 
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading-spinner"></span>
                  请求中...
                </>
              ) : (
                <>
                  <span>🚀</span>
                  开始测试
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 错误提示 */}
      {error && (
        <div className="result-card error-card">
          <div className="result-header">
            <span className="result-icon">❌</span>
            <h3>错误信息</h3>
          </div>
          <div className="result-content error-content">{error}</div>
        </div>
      )}

      {/* 响应结果 */}
      {response && (
        <div className="result-card success-card">
          <div className="result-header">
            <span className="result-icon">✅</span>
            <h3>响应结果</h3>
          </div>
          <div className="result-content">
            {testMode === "image-gen" && response.includes("data:image") ? (
              <>
                {response.split("\n\n").map((section, idx) => {
                  if (section.startsWith("生成的图片:")) {
                    const imageUrl = section.replace("生成的图片:\n", "")
                    return (
                      <div key={idx} className="generated-image">
                        <img src={imageUrl} alt="Generated" />
                      </div>
                    )
                  }
                  return section ? <pre key={idx} className="response-text">{section}</pre> : null
                })}
              </>
            ) : (
              <pre className="response-text">{response}</pre>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default GeminiTest
