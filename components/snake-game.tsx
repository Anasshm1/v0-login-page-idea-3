"use client"
import { useState, useEffect, useRef, useCallback } from "react"

interface SnakeGameProps {
  onScoreReached: (score: number) => void
}

const GRID_SIZE = 20
const CELL_SIZE = 20
const GAME_SPEED = 100

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT"

export default function SnakeGame({ onScoreReached }: SnakeGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [snake, setSnake] = useState<Array<{ x: number; y: number }>>([
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 },
  ])
  const [food, setFood] = useState({ x: 15, y: 10 })
  const [direction, setDirection] = useState<Direction>("RIGHT")
  const [nextDirection, setNextDirection] = useState<Direction>("RIGHT")
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null)

  // Generate random food position
  const generateFood = useCallback(() => {
    return {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    }
  }, [])

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key.toUpperCase()) {
        case "ARROWUP":
        case "W":
          if (direction !== "DOWN") setNextDirection("UP")
          e.preventDefault()
          break
        case "ARROWDOWN":
        case "S":
          if (direction !== "UP") setNextDirection("DOWN")
          e.preventDefault()
          break
        case "ARROWLEFT":
        case "A":
          if (direction !== "RIGHT") setNextDirection("LEFT")
          e.preventDefault()
          break
        case "ARROWRIGHT":
        case "D":
          if (direction !== "LEFT") setNextDirection("RIGHT")
          e.preventDefault()
          break
        default:
          break
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [direction])

  // Game loop
  useEffect(() => {
    if (gameOver) return

    gameLoopRef.current = setInterval(() => {
      setSnake((prevSnake) => {
        setDirection(nextDirection)
        const newHead = { ...prevSnake[0] }

        switch (nextDirection) {
          case "UP":
            newHead.y = (newHead.y - 1 + GRID_SIZE) % GRID_SIZE
            break
          case "DOWN":
            newHead.y = (newHead.y + 1) % GRID_SIZE
            break
          case "LEFT":
            newHead.x = (newHead.x - 1 + GRID_SIZE) % GRID_SIZE
            break
          case "RIGHT":
            newHead.x = (newHead.x + 1) % GRID_SIZE
            break
        }

        let newSnake = [newHead, ...prevSnake]

        // Check if food is eaten
        if (newHead.x === food.x && newHead.y === food.y) {
          const newScore = score + 1
          setScore(newScore)
          setFood(generateFood())

          if (newScore >= 5) {
            setGameOver(true)
            onScoreReached(newScore)
          }
        } else {
          newSnake = newSnake.slice(0, -1)
        }

        // Check collision with self
        for (let i = 1; i < newSnake.length; i++) {
          if (newHead.x === newSnake[i].x && newHead.y === newSnake[i].y) {
            setGameOver(true)
            return prevSnake
          }
        }

        return newSnake
      })
    }, GAME_SPEED)

    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current)
    }
  }, [gameOver, score, food, nextDirection, onScoreReached, generateFood])

  // Draw game
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.fillStyle = "#f8fafc"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw grid
    ctx.strokeStyle = "#e2e8f0"
    ctx.lineWidth = 0.5
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath()
      ctx.moveTo(i * CELL_SIZE, 0)
      ctx.lineTo(i * CELL_SIZE, GRID_SIZE * CELL_SIZE)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(0, i * CELL_SIZE)
      ctx.lineTo(GRID_SIZE * CELL_SIZE, i * CELL_SIZE)
      ctx.stroke()
    }

    // Draw snake
    snake.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? "#334155" : "#475569"
      ctx.fillRect(segment.x * CELL_SIZE + 1, segment.y * CELL_SIZE + 1, CELL_SIZE - 2, CELL_SIZE - 2)

      // Draw eyes on head
      if (index === 0) {
        ctx.fillStyle = "#fff"
        const eyeSize = 3
        if (direction === "RIGHT") {
          ctx.fillRect(segment.x * CELL_SIZE + 12, segment.y * CELL_SIZE + 6, eyeSize, eyeSize)
          ctx.fillRect(segment.x * CELL_SIZE + 12, segment.y * CELL_SIZE + 12, eyeSize, eyeSize)
        } else if (direction === "LEFT") {
          ctx.fillRect(segment.x * CELL_SIZE + 5, segment.y * CELL_SIZE + 6, eyeSize, eyeSize)
          ctx.fillRect(segment.x * CELL_SIZE + 5, segment.y * CELL_SIZE + 12, eyeSize, eyeSize)
        } else if (direction === "UP") {
          ctx.fillRect(segment.x * CELL_SIZE + 6, segment.y * CELL_SIZE + 5, eyeSize, eyeSize)
          ctx.fillRect(segment.x * CELL_SIZE + 12, segment.y * CELL_SIZE + 5, eyeSize, eyeSize)
        } else {
          ctx.fillRect(segment.x * CELL_SIZE + 6, segment.y * CELL_SIZE + 12, eyeSize, eyeSize)
          ctx.fillRect(segment.x * CELL_SIZE + 12, segment.y * CELL_SIZE + 12, eyeSize, eyeSize)
        }
      }
    })

    // Draw food
    ctx.fillStyle = "#ef4444"
    ctx.beginPath()
    ctx.arc(food.x * CELL_SIZE + CELL_SIZE / 2, food.y * CELL_SIZE + CELL_SIZE / 2, CELL_SIZE / 2 - 2, 0, Math.PI * 2)
    ctx.fill()
  }, [snake, food, direction])

  const handleReset = () => {
    setSnake([
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 },
    ])
    setFood(generateFood())
    setDirection("RIGHT")
    setNextDirection("RIGHT")
    setScore(0)
    setGameOver(false)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 space-y-4">
      <div className="text-center">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Jeu du Serpent</h2>
        <p className="text-slate-600 text-sm mb-4">Obtenez un score de 5 pour déverrouiller l'accès</p>
      </div>

      <div className="flex justify-center">
        <canvas
          ref={canvasRef}
          width={GRID_SIZE * CELL_SIZE}
          height={GRID_SIZE * CELL_SIZE}
          className="border-2 border-slate-300 rounded-lg bg-slate-50"
        />
      </div>

      <div className="flex justify-between items-center">
        <div className="text-center flex-1">
          <p className="text-slate-600 text-sm">Score</p>
          <p className="text-2xl font-bold text-slate-900">{score} / 5</p>
        </div>
      </div>

      {gameOver && score >= 5 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <p className="text-green-700 font-semibold">Félicitations ! Accès déverrouillé !</p>
        </div>
      )}

      {gameOver && score < 5 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <p className="text-red-700 font-semibold mb-2">Collision ! Score: {score}</p>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium text-sm"
          >
            Réessayer
          </button>
        </div>
      )}

      <p className="text-center text-xs text-slate-500">Utilisez les flèches ou ZQSD pour vous déplacer</p>
    </div>
  )
}
