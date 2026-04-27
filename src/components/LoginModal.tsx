import { useState } from "react"
import Modal from "./Modal"
import { login } from "../services/api"
import { useAuthStore } from "../store/useAuthStore"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const authLogin = useAuthStore((s) => s.login)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    try {
      const data = await login(email, password)
      authLogin(data.token, data.name)
      setEmail("")
      setPassword("")
      onClose()
    } catch {
      setError("Invalid email or password")
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 min-w-[300px]">
        <h2 className="text-xl font-bold text-black">Kirjaudu sisään</h2>

        {error && (
          <p className="text-red-500 text-sm font-medium">{error}</p>
        )}

        <label className="flex flex-col gap-1 text-sm text-gray-700">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-black"
            placeholder="email@example.com"
            required
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-gray-700">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-black"
            placeholder="••••••••"
            required
          />
        </label>

        <button
          type="submit"
          className="bg-[#A2D135] text-black font-bold py-2 rounded-lg hover:bg-opacity-80 transition-colors"
        >
          Log in
        </button>
      </form>
    </Modal>
  )
}
