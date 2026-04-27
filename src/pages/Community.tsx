import { useState, useEffect } from "react"
import { useAuthStore } from "../store/useAuthStore"
import { getRecipes, deleteRecipe } from "../services/api"
import type { Recipe } from "../types"

export default function Community() {
  const token = useAuthStore((s) => s.token)
  const [recipes, setRecipes] = useState<Recipe[]>([])
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
                  {recipe.ingredientIds.length} ingredients
                  {recipe.is_public ? " · Public" : " · Private"}
                </p>
              </div>
              <button
                onClick={() => handleDelete(recipe.id)}
                className="text-red-500 hover:text-red-700 font-bold text-sm px-3 py-1 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
