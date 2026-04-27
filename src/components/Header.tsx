import { useState } from "react"
import { Link } from "react-router-dom"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-zinc-800 text-white w-full h-32 flex justify-between items-start px-8 pt-4">
      
      {/* Left Logo */}
      <Link
        to="/"
        className="w-24 h-24 rounded-full border-4 border-[#A2D135] flex items-center justify-center flex-col -mt-2 bg-zinc-800 shadow-lg"
      >
        <span className="text-xs">Fresh Food Factory</span>
        <span className="text-lg font-bold tracking-widest">FRESSE</span>
      </Link>

      {/* Center Title */}
      <h1 className="text-3xl font-black tracking-widest mt-6">
        BOWL-LASKURI
      </h1>

      {/* Right Menu */}
      <div className="relative">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex flex-col gap-1.5 p-2 mt-2"
        >
          <span className="block w-6 h-0.5 bg-white rounded" />
          <span className="block w-6 h-0.5 bg-white rounded" />
          <span className="block w-6 h-0.5 bg-white rounded" />
        </button>

        {isMenuOpen && (
          <div className="absolute right-0 top-full mt-2 bg-[#A2D135] text-black rounded-b-3xl rounded-t-xl px-6 py-4 flex flex-col gap-2 min-w-[200px] shadow-md z-10">
            <button className="text-left hover:underline">Login</button>
            <Link to="/community" className="text-left hover:underline">Saved recipes</Link>
            <button className="text-left hover:underline">Settings</button>
          </div>
        )}
      </div>
    </header>
  )
}
