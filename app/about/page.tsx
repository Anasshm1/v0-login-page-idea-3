import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "ENISO - À propos",
  description: "En savoir plus sur ENISO",
}

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <Link href="/">
                <h1 className="text-xl font-bold text-slate-900">ENISO</h1>
              </Link>
              <div className="hidden md:flex gap-6">
                <Link href="/" className="text-slate-600 hover:text-slate-900 transition-colors">
                  Accueil
                </Link>
                <Link href="/about" className="text-slate-900 font-medium">
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

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8">À propos d'ENISO</h1>

        <div className="space-y-8 text-slate-600 text-lg leading-relaxed">
          <p>
            ENISO (Espace Numérique pour l'Innovation et les Solutions Opérationnelles) est une plateforme moderne
            conçue pour répondre aux besoins des entreprises d'aujourd'hui.
          </p>

          <div className="bg-white rounded-lg p-8 shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Notre Mission</h2>
            <p>
              Fournir des outils numériques innovants qui simplifient la gestion opérationnelle et permettent aux
              organisations de se concentrer sur leur cœur de métier.
            </p>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Nos Valeurs</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-slate-900 font-medium">Innovation:</span>
                <span>Rester à la pointe de la technologie</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-slate-900 font-medium">Simplicité:</span>
                <span>Rendre la complexité accessible</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-slate-900 font-medium">Fiabilité:</span>
                <span>Des services disponibles et sécurisés</span>
              </li>
            </ul>
          </div>

          <p>
            Notre équipe travaille chaque jour pour améliorer la plateforme et offrir la meilleure expérience possible à
            nos utilisateurs.
          </p>
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
