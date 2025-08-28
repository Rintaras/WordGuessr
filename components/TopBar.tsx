export default function TopBar(){
  return (
    <header className="w-full p-3 border-b bg-white">
      <div className="mx-auto max-w-5xl flex items-center justify-between">
        <a href="/" className="font-bold">WordGuessr</a>
        <a href="/about" className="text-sm underline text-gray-600">About</a>
      </div>
    </header>
  )
}
