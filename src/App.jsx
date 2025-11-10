import { useRef } from 'react'
import Hero from './components/Hero'
import PredictionForm from './components/PredictionForm'

function App() {
  const formRef = useRef(null)

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <header className="fixed top-0 left-0 right-0 z-20 bg-slate-900/70 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="/" className="text-white font-semibold">FraudSense</a>
          <nav className="hidden sm:flex items-center gap-6 text-slate-200">
            <a href="#predict" className="hover:text-white">Predict</a>
            <a href="/test" className="hover:text-white">Status</a>
            <a href="https://en.wikipedia.org/wiki/Credit_card_fraud" target="_blank" className="hover:text-white">Learn</a>
          </nav>
        </div>
      </header>

      <main className="pt-14">
        <Hero onCTAClick={scrollToForm} />
        <div ref={formRef}>
          <PredictionForm />
        </div>
        <footer className="py-10 text-center text-slate-400 bg-slate-900">
          <p>Built for demo purposes. Not financial advice.</p>
        </footer>
      </main>
    </div>
  )
}

export default App
