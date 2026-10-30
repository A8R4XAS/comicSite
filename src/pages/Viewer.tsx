import { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import comics from '../data/comics.json'

const btn =
  'rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40'

export default function Viewer() {
  const { id } = useParams()
  const comic = comics.find((c) => c.id === id)
  const [page, setPage] = useState(0)
  const total = comic?.pages.length ?? 0

  const prev = useCallback(() => setPage((p) => Math.max(0, p - 1)), [])
  const next = useCallback(() => setPage((p) => Math.min(total - 1, p + 1)), [total])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [prev, next])

  if (!comic) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-20 text-center">
        <p className="text-xl">Comic not found.</p>
        <Link to="/" className="mt-4 inline-block text-indigo-400 hover:underline">
          Back to Gallery
        </Link>
      </main>
    )
  }

  return (
    <main className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-4 py-6">
      <div className="flex w-full items-center justify-between">
        <Link to="/" className="text-sm text-indigo-400 transition hover:text-indigo-300">
          ← Back to Gallery
        </Link>
        <span className="text-sm text-slate-400">
          Page {page + 1} / {total}
        </span>
      </div>
      <h1 className="text-2xl font-bold">{comic.title}</h1>
      <img
        key={page}
        src={comic.pages[page]}
        alt={`${comic.title} page ${page + 1}`}
        className="w-full animate-[fade_0.4s_ease] rounded-lg shadow-xl"
      />
      <div className="flex gap-3">
        <button className={btn} onClick={prev} disabled={page === 0}>
          Previous
        </button>
        <button className={btn} onClick={next} disabled={page === total - 1}>
          Next
        </button>
      </div>
    </main>
  )
}
