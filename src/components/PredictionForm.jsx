import { useState } from 'react'

const defaultValues = {
  amount: 120.5,
  merchant: 'Acme Online',
  category: 'electronics',
  distance_from_home: 12,
  distance_from_last_transaction: 5,
  repeat_retailer: false,
  used_chip: false,
  used_pin_number: false,
  online_order: true,
  hour: 2,
  age: 34,
  international: false,
  velocity_24h: 6,
}

function PredictionForm() {
  const [values, setValues] = useState(defaultValues)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target
    setValues((v) => ({ ...v, [name]: type === 'checkbox' ? checked : (type === 'number' ? Number(value) : value) }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const res = await fetch(`${backend}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (!res.ok) throw new Error(`Request failed: ${res.status}`)
      const data = await res.json()
      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="predict" className="relative w-full bg-slate-50">
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Try a Transaction</h2>
          <p className="mt-2 text-slate-600">Adjust fields and submit to get a fraud probability and label.</p>

          <form onSubmit={handleSubmit} className="mt-6 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="flex flex-col gap-1">
                <span className="text-sm text-slate-600">Amount ($)</span>
                <input name="amount" type="number" step="0.01" value={values.amount} onChange={handleChange} className="input" />
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-sm text-slate-600">Merchant</span>
                <input name="merchant" value={values.merchant} onChange={handleChange} className="input" />
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-sm text-slate-600">Category</span>
                <input name="category" value={values.category} onChange={handleChange} className="input" />
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-sm text-slate-600">Distance from Home (km)</span>
                <input name="distance_from_home" type="number" value={values.distance_from_home} onChange={handleChange} className="input" />
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-sm text-slate-600">Distance from Last Txn (km)</span>
                <input name="distance_from_last_transaction" type="number" value={values.distance_from_last_transaction} onChange={handleChange} className="input" />
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-sm text-slate-600">Hour (0-23)</span>
                <input name="hour" type="number" value={values.hour} onChange={handleChange} className="input" />
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-sm text-slate-600">Age</span>
                <input name="age" type="number" value={values.age} onChange={handleChange} className="input" />
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-sm text-slate-600">Velocity (24h)</span>
                <input name="velocity_24h" type="number" value={values.velocity_24h} onChange={handleChange} className="input" />
              </label>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="flex items-center gap-2">
                <input name="repeat_retailer" type="checkbox" checked={values.repeat_retailer} onChange={handleChange} />
                <span className="text-slate-700">Repeat Retailer</span>
              </label>
              <label className="flex items-center gap-2">
                <input name="used_chip" type="checkbox" checked={values.used_chip} onChange={handleChange} />
                <span className="text-slate-700">Used Chip</span>
              </label>
              <label className="flex items-center gap-2">
                <input name="used_pin_number" type="checkbox" checked={values.used_pin_number} onChange={handleChange} />
                <span className="text-slate-700">Used PIN</span>
              </label>
              <label className="flex items-center gap-2">
                <input name="online_order" type="checkbox" checked={values.online_order} onChange={handleChange} />
                <span className="text-slate-700">Online Order</span>
              </label>
              <label className="flex items-center gap-2">
                <input name="international" type="checkbox" checked={values.international} onChange={handleChange} />
                <span className="text-slate-700">International</span>
              </label>
            </div>

            <button type="submit" disabled={loading} className="mt-6 w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl shadow-blue-600/30 shadow disabled:opacity-70">
              {loading ? 'Scoring...' : 'Predict Fraud Risk'}
            </button>

            {error && (
              <p className="mt-3 text-red-600 text-sm">{error}</p>
            )}
          </form>
        </div>

        <div>
          <div className="sticky top-6 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">Result</h3>
            {!result ? (
              <p className="mt-2 text-slate-600">Submit the form to see prediction results and explanation.</p>
            ) : (
              <div className="mt-4 space-y-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-slate-600">Score</span>
                  <span className="text-3xl font-bold">{(result.score * 100).toFixed(0)}%</span>
                </div>
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${result.label === 'Fraud' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
                  {result.label}
                </div>
                <p className="text-slate-700"><span className="font-semibold">Why:</span> {result.explanation}</p>
                {result.stored_id && (
                  <p className="text-xs text-slate-500">Saved with id: {result.stored_id}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .input { @apply w-full rounded-xl border border-slate-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/40; }
      `}</style>
    </section>
  )
}

export default PredictionForm
