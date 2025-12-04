import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "ENISO - Accueil",
  description: "Espace Numérique pour l'Innovation et les Solutions Opérationnelles",
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <h1 className="text-xl font-bold text-slate-900">ENISO</h1>
              <div className="hidden md:flex gap-6">
                <Link href="/" className="text-slate-900 font-medium">
                  Accueil
                </Link>
                <Link href="/about" className="text-slate-600 hover:text-slate-900 transition-colors">
                  À propos
                </Link>
                <Link href="/features" className="text-slate-600 hover:text-slate-900 transition-colors">
                  Fonctionnalités
                </Link>
                <Link href="/contact" className="text-slate-600 hover:text-slate-900 transition-colors">
                  Contact
                </Link>
              </div>
            </div>
            <Link href="/login">
              <Button>Connexion</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center space-y-8">
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 text-balance">
            Espace Numérique pour l'Innovation
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto text-balance">
            Une plateforme moderne pour gérer vos solutions opérationnelles avec efficacité et innovation
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/login">
              <Button size="lg" className="text-base">
                Commencer maintenant
              </Button>
            </Link>
            <Link href="/features">
              <Button size="lg" variant="outline" className="text-base bg-transparent">
                Découvrir les fonctionnalités
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg p-8 shadow-sm border border-slate-200">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Performance</h3>
            <p className="text-slate-600">Une interface rapide et réactive pour une expérience utilisateur optimale</p>
          </div>
          <div className="bg-white rounded-lg p-8 shadow-sm border border-slate-200">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Sécurité</h3>
            <p className="text-slate-600">Vos données sont protégées avec les dernières technologies de sécurité</p>
          </div>
          <div className="bg-white rounded-lg p-8 shadow-sm border border-slate-200">
            <div className="text-4xl mb-4">💡</div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Innovation</h3>
            <p className="text-slate-600">Des outils innovants pour rester à la pointe de la technologie</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-sm text-slate-500">© 2025 ENISO. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  )
}
