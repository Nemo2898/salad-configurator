import { useState } from "react"
import Modal from "./Modal"
import { useAuthStore } from "../store/useAuthStore"
import { useIngredientStore } from "../store/useIngredientStore"
import { saveRecipe } from "../services/api"

interface SaveRecipeModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SaveRecipeModal({ isOpen, onClose }: SaveRecipeModalProps) {
  const [recipeName, setRecipeName] = useState("")
  const [isPublic, setIsPublic] = useState(false)
  const token = useAuthStore((s) => s.token)
  const slots = useIngredientStore((s) => s.slots)
  const selectedBowl = useIngredientStore((s) => s.selectedBowl)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!token || !selectedBowl) return

    const ingredientIds = Object.values(slots)
      .filter((i) => i !== null)
      .map((i) => i!.id)

    try {
      await saveRecipe(token, {
        name: recipeName,
        bowlId: selectedBowl.id,
        ingredientIds,
        is_public: isPublic,
      })
      setRecipeName("")
      setIsPublic(false)
      onClose()
    } catch {
      // error handled in Task 5.9
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 min-w-[300px]">
        <h2 className="text-xl font-bold text-black">Save Recipe</h2>

        <label className="flex flex-col gap-1 text-sm text-gray-700">
          Recipe Name
          <input
            type="text"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-black"
            placeholder="My Salad Bowl"
            required
          />
        </label>

        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
            className="accent-[#A2D135]"
          />
          Make Public
        </label>

        <button
          type="submit"
          className="bg-[#A2D135] text-black font-bold py-2 rounded-lg hover:bg-opacity-80 transition-colors"
        >
          Save
        </button>
      </form>
    </Modal>
  )
}
