"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function Dashboard() {
  const router = useRouter()

  const handleLogout = () => {
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <Link href="/dashboard">
                <h1 className="text-xl font-bold text-slate-900">ENISO</h1>
              </Link>
              <div className="hidden md:flex gap-6">
                <Link href="/dashboard" className="text-slate-900 font-medium">
                  Tableau de bord
                </Link>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              Déconnexion
            </Button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Tableau de bord</h1>
          <p className="text-slate-600">Bienvenue dans votre espace ENISO</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
            <div className="text-2xl font-bold text-slate-900 mb-1">156</div>
            <p className="text-sm text-slate-600">Projets actifs</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
            <div className="text-2xl font-bold text-slate-900 mb-1">23</div>
            <p className="text-sm text-slate-600">Utilisateurs</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
            <div className="text-2xl font-bold text-slate-900 mb-1">89%</div>
            <p className="text-sm text-slate-600">Taux de réussite</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
            <div className="text-2xl font-bold text-slate-900 mb-1">12</div>
            <p className="text-sm text-slate-600">Tâches en cours</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg p-8 shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Activité récente</h2>
            <div className="space-y-4">
              {[
                { action: "Nouveau projet créé", time: "Il y a 2 heures" },
                { action: "Rapport généré", time: "Il y a 5 heures" },
                { action: "Équipe mise à jour", time: "Il y a 1 jour" },
                { action: "Configuration modifiée", time: "Il y a 2 jours" },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center py-3 border-b border-slate-100 last:border-0">
                  <span className="text-slate-900">{item.action}</span>
                  <span className="text-sm text-slate-500">{item.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Actions rapides</h2>
            <div className="space-y-3">
              <Button className="w-full justify-start bg-transparent" variant="outline">
                📝 Créer un nouveau projet
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                👥 Inviter des membres
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                📊 Générer un rapport
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                ⚙️ Paramètres
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-sm text-slate-500">© 2025 ENISO. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  )
}
