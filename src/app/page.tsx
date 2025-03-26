import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Monopoly Web</h1>
      <Link href="/board">
        <button className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Mergi la tabla de joc
        </button>
      </Link>
    </main>
  )
}
