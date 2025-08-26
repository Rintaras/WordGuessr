export default function TopBar() {
  return (
    <header className="w-full p-3 border-b bg-white">
      <div className="mx-auto max-w-5xl relative flex items-center">
        <a href="/" className="font-bold absolute left-1/2 -translate-x-1/2">WordGuessr</a>
        <a href="/about" className="text-sm underline text-gray-600 ml-auto">About</a>
      </div>
    </header>
  )
}
