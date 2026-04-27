import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/useAuthStore"
import { useIngredientStore } from "../store/useIngredientStore"
import { getRecipes, deleteRecipe, getBowls } from "../services/api"
import type { Bowl, Ingredient } from "../types"

interface ApiRecipe {
  id: number
  name: string
  bowl_id: number
  is_public: boolean
  slots?: Record<string, Ingredient>
  ingredient_ids?: number[]
}

export default function Community() {
  const token = useAuthStore((s) => s.token)
  const setBowl = useIngredientStore((s) => s.setBowl)
  const navigate = useNavigate()
  const [recipes, setRecipes] = useState<ApiRecipe[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!token) {
      setLoading(false)
      return
    }
    async function fetchRecipes() {
      try {
        const data = await getRecipes(token!)
        setRecipes(data)
      } catch {
        setError("Failed to load recipes")
      } finally {
        setLoading(false)
      }
    }
    fetchRecipes()
  }, [token])

  async function handleDelete(id: number) {
    if (!token || !window.confirm("Delete this recipe?")) return
    try {
      await deleteRecipe(token, id)
      setRecipes((prev) => prev.filter((r) => r.id !== id))
    } catch {
      setError("Failed to delete recipe")
    }
  }

  async function handleLoad(recipe: ApiRecipe) {
    try {
      const bowls: Bowl[] = await getBowls()
      const bowl = bowls.find((b) => b.id === recipe.bowl_id)
      if (!bowl) {
        setError("Bowl not found")
        return
      }
      setBowl(bowl)
      if (recipe.slots) {
        useIngredientStore.setState({ slots: recipe.slots })
      }
      navigate("/")
    } catch {
      setError("Failed to load recipe")
    }
  }

  if (!token) {
    return (
      <main className="flex-1 flex items-center justify-center">
        <p className="text-2xl text-gray-500">Login to see saved recipes</p>
      </main>
    )
  }

  if (loading) {
    return (
      <main className="flex-1 flex items-center justify-center">
        <p className="text-2xl text-gray-500">Loading...</p>
      </main>
    )
  }

  return (
    <main className="flex-1 max-w-4xl w-full mx-auto p-6">
      <h2 className="text-2xl font-bold text-black mb-6">Saved Recipes</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {recipes.length === 0 ? (
        <p className="text-gray-500">No saved recipes yet.</p>
      ) : (
        <div className="grid gap-4">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white border border-gray-200 rounded-xl p-4 flex justify-between items-center shadow-sm"
            >
              <div>
                <h3 className="font-bold text-black text-lg">{recipe.name}</h3>
                <p className="text-gray-500 text-sm">
                  {recipe.is_public ? "Public" : "Private"}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleLoad(recipe)}
                  className="text-[#A2D135] hover:bg-[#A2D135]/10 font-bold text-sm px-3 py-1 border border-[#A2D135] rounded-lg transition-colors"
                >
                  Load
                </button>
                <button
                  onClick={() => handleDelete(recipe.id)}
                  className="text-red-500 hover:text-red-700 font-bold text-sm px-3 py-1 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
