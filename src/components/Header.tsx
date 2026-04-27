import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuthStore } from "../store/useAuthStore"
import LoginModal from "./LoginModal"
import logoSrc from "../assets/fresse-logo.png"

export default function Header() {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const userName = useAuthStore((s) => s.userName)
  const logout = useAuthStore((s) => s.logout)

  return (
    <header className="bg-zinc-800 text-white w-full h-32 flex justify-between items-start px-8 pt-4">
      
      {/* Left Logo */}
      <Link
        to="/"
        className="w-24 h-24 rounded-full border-4 border-[#A2D135] flex items-center justify-center -mt-2 bg-zinc-800 shadow-lg overflow-hidden"
      >
        <img src={logoSrc} alt="FRESSE" className="w-full h-full object-contain p-1" />
      </Link>

      {/* Center Title */}
      <h1 className="text-3xl font-black tracking-widest mt-6">
        BOWL-LASKURI
      </h1>

      {/* Right Menu */}
      <div className="bg-[#A2D135] text-black rounded-b-3xl rounded-t-xl px-6 py-4 flex flex-col gap-2 min-w-[200px] shadow-md">
        {userName ? (
          <>
            <span className="text-left font-semibold">Hello, {userName}</span>
            <button className="text-left hover:underline" onClick={logout}>Logout</button>
          </>
        ) : (
          <button className="text-left hover:underline" onClick={() => setIsLoginOpen(true)}>Login</button>
        )}
        <Link to="/community" className="text-left hover:underline">Saved recipes</Link>
        <button className="text-left hover:underline">Settings</button>
      </div>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </header>
  )
}
