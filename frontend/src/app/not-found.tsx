import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <h2 className="text-5xl text-foreground-50">Not Found</h2>
      <Link className="text-blue-500 transition rounded-full border-1 border-blue-500 px-4 py-1 hover:text-blue-400 hover:border-blue-400" href="/">Return Home</Link>
    </div>
  )
}