import ComicCard from '../components/ComicCard'
import comics from '../data/comics.json'

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold sm:text-4xl">Short Webcomics</h1>
      <p className="mt-2 text-slate-400">Quick reads, one to four pages each.</p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {comics.map((c) => (
          <ComicCard key={c.id} comic={c} />
        ))}
      </div>
    </main>
  )
}
