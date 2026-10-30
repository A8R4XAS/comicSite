import { Link } from 'react-router-dom'
import type { Comic } from '../types'

export default function ComicCard({ comic }: { comic: Comic }) {
  return (
    <Link
      to={`/comic/${comic.id}`}
      className="group overflow-hidden rounded-xl border border-slate-800 bg-slate-900 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-indigo-500 hover:shadow-indigo-500/20"
    >
      <div className="aspect-[3/2] overflow-hidden">
        <img
          src={comic.cover}
          alt={`${comic.title} cover`}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold">{comic.title}</h2>
        <p className="mt-1 text-sm text-slate-400">{comic.description}</p>
        <p className="mt-3 text-xs uppercase tracking-wide text-indigo-400">
          {comic.pages.length} {comic.pages.length === 1 ? 'page' : 'pages'}
        </p>
      </div>
    </Link>
  )
}
