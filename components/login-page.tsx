"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import SnakeGame from "./snake-game"
import LoginForm from "./login-form"

export default function LoginPage() {
  const [showGame, setShowGame] = useState(false)
  const [isUnlocked, setIsUnlocked] = useState(false)
  const router = useRouter()

  const handleRobotCheckChanged = (checked: boolean) => {
    setShowGame(checked)
  }

  const handleSnakeGameComplete = (score: number) => {
    if (score >= 5) {
      setIsUnlocked(true)
    }
  }

  const handleReset = () => {
    setShowGame(false)
    setIsUnlocked(false)
  }

  const handleAccessGranted = () => {
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo / Title */}
        <div className="text-center mb-8">
          <Link href="/">
            <h1 className="text-3xl font-bold text-slate-900 font-sans cursor-pointer hover:text-slate-700 transition-colors">
              ENISO
            </h1>
          </Link>
          <p className="text-sm text-slate-500 mt-2">
            Espace Numérique pour l'Innovation et les Solutions Opérationnelles
          </p>
        </div>

        {/* Main Content */}
        <div className="relative">
          {!showGame && !isUnlocked && <LoginForm onRobotCheckChanged={handleRobotCheckChanged} />}

          {showGame && !isUnlocked && <SnakeGame onScoreReached={handleSnakeGameComplete} />}

          {isUnlocked && (
            <div className="bg-white rounded-lg shadow-lg p-8 text-center space-y-4">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-slate-900">Accès Déverrouillé !</h2>
              <p className="text-slate-600">Vous avez vaincu le serpent et obtenu l'accès au système ENISO.</p>
              <button
                onClick={handleAccessGranted}
                className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium w-full mb-2"
              >
                Accéder au tableau de bord
              </button>
              <button
                onClick={handleReset}
                className="px-6 py-2 bg-slate-200 text-slate-900 rounded-lg hover:bg-slate-300 transition-colors font-medium w-full"
              >
                Recommencer
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-400 mt-8">© 2025 ENISO. Tous droits réservés.</p>
      </div>
    </div>
  )
}
