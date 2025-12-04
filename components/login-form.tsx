"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

interface LoginFormProps {
  onRobotCheckChanged: (checked: boolean) => void
}

export default function LoginForm({ onRobotCheckChanged }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [isRobotChecked, setIsRobotChecked] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate login attempt
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }

  const handleRobotCheckChange = (checked: boolean) => {
    setIsRobotChecked(checked)
    onRobotCheckChanged(checked)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 space-y-6">
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-slate-700">
          Adresse email
        </label>
        <Input
          id="email"
          type="email"
          placeholder="vous@eniso.fr"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium text-slate-700">
          Mot de passe
        </label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="robot-check" checked={isRobotChecked} onCheckedChange={handleRobotCheckChange} />
        <label
          htmlFor="robot-check"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-700 cursor-pointer"
        >
          Je ne suis pas un robot
        </label>
      </div>

      <Button
        type="submit"
        disabled={loading || !email || !password}
        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-2 rounded-lg transition-colors"
      >
        {loading ? "Connexion..." : "Se connecter"}
      </Button>

      <div className="pt-4 border-t border-slate-200 text-center text-sm text-slate-600">
        <p>Cochez la case pour vérifier que vous n'êtes pas un robot</p>
      </div>
    </form>
  )
}
