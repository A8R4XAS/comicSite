import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import comics from '../data/comics.json'

const btn =
  'rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40'

export default function Viewer() {
  const { id } = useParams()
  const comic = comics.find((c) => c.id === id)
  const [page, setPage] = useState(0)
  const total = comic?.pages.length ?? 0
  const activeThumb = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    activeThumb.current?.scrollIntoView?.({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }, [page])

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
    <main className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-4 pb-28 pt-6">
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
      <nav
        aria-label="Page thumbnails"
        className="fixed inset-x-0 bottom-0 z-10 flex gap-2 overflow-x-auto bg-gray-900/80 p-2 backdrop-blur"
      >
        {comic.pages.map((src, i) => (
          <button
            key={src}
            ref={i === page ? activeThumb : undefined}
            onClick={() => setPage(i)}
            aria-label={`Go to page ${i + 1}`}
            aria-current={i === page ? 'page' : undefined}
            className={`h-16 w-12 shrink-0 overflow-hidden rounded transition-all sm:h-20 sm:w-16 ${
              i === page
                ? 'scale-105 ring-2 ring-blue-500'
                : 'opacity-70 transition-opacity hover:opacity-100'
            }`}
          >
            <img src={src} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </nav>
    </main>
  )
}
