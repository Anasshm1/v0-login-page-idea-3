"use client"

import type React from "react"

import { useState, useRef, useEffect, forwardRef } from "react"
import { Button } from "@/components/ui/button"

interface DrawingCanvasProps {
  onComplete: (isCorrect: boolean) => void
}

const DrawingCanvas = forwardRef<any, DrawingCanvasProps>(({ onComplete }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [points, setPoints] = useState<Array<{ x: number; y: number }>>([])
  const [feedback, setFeedback] = useState("")

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.fillStyle = "#f8fafc"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw guide text
    ctx.fillStyle = "#cbd5e1"
    ctx.font = "16px sans-serif"
    ctx.textAlign = "center"
    ctx.fillText("Dessinez un 'S' pour éveiller le serpent", canvas.width / 2, 30)
  }, [])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setPoints([{ x, y }])
    drawPoint(x, y)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const lastPoint = points[points.length - 1]
    ctx.strokeStyle = "#334155"
    ctx.lineWidth = 3
    ctx.lineCap = "round"
    ctx.lineJoin = "round"

    ctx.beginPath()
    ctx.moveTo(lastPoint.x, lastPoint.y)
    ctx.lineTo(x, y)
    ctx.stroke()

    setPoints([...points, { x, y }])
  }

  const drawPoint = (x: number, y: number) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.fillStyle = "#334155"
    ctx.beginPath()
    ctx.arc(x, y, 2, 0, Math.PI * 2)
    ctx.fill()
  }

  const endDrawing = () => {
    setIsDrawing(false)
    detectSShape()
  }

  const detectSShape = () => {
    if (points.length < 10) {
      setFeedback("Le tracé est trop court. Dessinez un S plus prononcé.")
      return
    }

    const minX = Math.min(...points.map((p) => p.x))
    const maxX = Math.max(...points.map((p) => p.x))
    const minY = Math.min(...points.map((p) => p.y))
    const maxY = Math.max(...points.map((p) => p.y))

    const width = maxX - minX
    const height = maxY - minY

    // S should have similar width and height (roughly square-ish)
    const aspectRatio = height / width

    // Check for S-like curves (multiple direction changes)
    let directionChanges = 0
    for (let i = 2; i < points.length; i++) {
      const dx1 = points[i - 1].x - points[i - 2].x
      const dy1 = points[i - 1].y - points[i - 2].y
      const dx2 = points[i].x - points[i - 1].x
      const dy2 = points[i].y - points[i - 1].y

      const dot = dx1 * dx2 + dy1 * dy2
      if (dot < 0) directionChanges++
    }

    const isSShape = aspectRatio > 0.7 && aspectRatio < 2 && directionChanges > 5

    if (isSShape) {
      setFeedback("Parfait ! Le serpent s'éveille...")
      setTimeout(() => onComplete(true), 800)
    } else {
      setFeedback("Tracé incorrect. Essayez à nouveau.")
      clearCanvas()
    }
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.fillStyle = "#f8fafc"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = "#cbd5e1"
    ctx.font = "16px sans-serif"
    ctx.textAlign = "center"
    ctx.fillText("Dessinez un 'S' pour éveiller le serpent", canvas.width / 2, 30)

    setPoints([])
    setFeedback("")
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 space-y-4">
      <h2 className="text-xl font-bold text-slate-900 text-center">Éveillez le Serpent</h2>

      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={endDrawing}
        onMouseLeave={endDrawing}
        className="w-full h-64 border-2 border-slate-300 rounded-lg cursor-crosshair bg-slate-50 hover:border-slate-400 transition-colors"
      />

      <div className="text-center min-h-6">
        {feedback && (
          <p className={`text-sm font-medium ${feedback.includes("Parfait") ? "text-green-600" : "text-amber-600"}`}>
            {feedback}
          </p>
        )}
      </div>

      <Button onClick={clearCanvas} variant="outline" className="w-full bg-transparent">
        Effacer
      </Button>
    </div>
  )
})

DrawingCanvas.displayName = "DrawingCanvas"

export default DrawingCanvas
