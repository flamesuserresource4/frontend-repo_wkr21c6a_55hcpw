import Spline from '@splinetool/react-spline'

function Hero({ onCTAClick }) {
  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white">
      <div className="absolute inset-0 opacity-80">
        <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="relative z-10 flex items-center min-h-[80vh]">
        <div className="container mx-auto px-6 md:px-10">
          <div className="backdrop-blur-md/50 bg-white/5 border border-white/10 rounded-2xl p-6 md:p-10 max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
              Credit Card Fraud Detection
            </h1>
            <p className="mt-4 text-slate-200 md:text-lg">
              Real-time risk scoring for transactions using a transparent rule-based engine. Try it with your own sample data and see the fraud probability instantly.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button onClick={onCTAClick} className="px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-semibold shadow-lg shadow-blue-500/30 transition">
                Try a Prediction
              </button>
              <a href="/test" className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold border border-white/10 transition">
                Check Backend & DB
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/80"></div>
    </section>
  )
}

export default Hero
