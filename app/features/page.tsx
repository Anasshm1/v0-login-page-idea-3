import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "ENISO - Fonctionnalités",
  description: "Découvrez les fonctionnalités d'ENISO",
}

export default function Features() {
  const features = [
    {
      icon: "🎯",
      title: "Gestion Centralisée",
      description: "Gérez toutes vos opérations depuis une seule plateforme intuitive",
    },
    {
      icon: "📊",
      title: "Tableaux de Bord",
      description: "Visualisez vos données avec des graphiques interactifs et personnalisables",
    },
    {
      icon: "🔔",
      title: "Notifications en Temps Réel",
      description: "Restez informé des événements importants instantanément",
    },
    {
      icon: "👥",
      title: "Collaboration d'Équipe",
      description: "Travaillez ensemble efficacement avec des outils collaboratifs",
    },
    {
      icon: "📱",
      title: "Application Mobile",
      description: "Accédez à vos données partout, sur tous vos appareils",
    },
    {
      icon: "🔐",
      title: "Sécurité Avancée",
      description: "Protection des données avec chiffrement et authentification multi-facteurs",
    },
  ]

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
                <Link href="/about" className="text-slate-600 hover:text-slate-900 transition-colors">
                  À propos
                </Link>
                <Link href="/features" className="text-slate-900 font-medium">
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Fonctionnalités</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Découvrez tous les outils qui font d'ENISO une plateforme complète
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link href="/login">
            <Button size="lg">Essayer maintenant</Button>
          </Link>
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
