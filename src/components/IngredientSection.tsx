import { useState } from "react"
import type { Category, Ingredient } from "../types"
import IngredientCard from "./IngredientCard"

interface Props {
  categories: Category[]
  ingredients: Ingredient[]
}

export default function IngredientSection({ categories, ingredients }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const visibleCategories = categories.filter((c) => c.id !== 6)

  const filteredIngredients = ingredients.filter((i) => {
    if (i.categoryId === 6) return false
    if (activeCategory !== "all" && i.categoryId !== Number(activeCategory)) return false
    if (searchQuery && !i.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  return (
    <div className="bg-zinc-800 rounded-[3rem] p-8 text-white w-full shadow-lg">

      {/* Circle number */}
      <div className="bg-white text-black font-bold rounded-full w-8 h-8 flex items-center justify-center mb-4 shrink-0">
        3
      </div>

      {/* Title */}
      <h2 className="text-xl font-semibold mb-6">Lisaa raaka-aineet</h2>

      {/* Search field */}
      <input
        type="text"
        placeholder="Search ingredients..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="rounded-full px-6 py-3 text-black outline-none w-64 border-2 border-transparent focus:border-[#A2D135] mb-6"
      />

      {/* Category filter buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={() => setActiveCategory("all")}
          className={`font-bold px-6 py-2 rounded-full transition-colors ${
            activeCategory === "all"
              ? "bg-white text-black"
              : "bg-[#A2D135] text-black hover:bg-opacity-80"
          }`}
        >
          All
        </button>
        {visibleCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(String(cat.id))}
            className={`font-bold px-6 py-2 rounded-full transition-colors ${
              activeCategory === String(cat.id)
                ? "bg-white text-black"
                : "bg-[#A2D135] text-black hover:bg-opacity-80"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Ingredient cards grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredIngredients.map((ingredient) => (
          <IngredientCard key={ingredient.id} ingredient={ingredient} />
        ))}
      </div>

      {/* Dietary Legend */}
      <div className="flex gap-4 mt-6 justify-center">
        <span className="bg-white text-black text-xs font-bold px-3 py-1 rounded-full">G</span>
        <span className="bg-white text-black text-xs font-bold px-3 py-1 rounded-full">L</span>
        <span className="bg-white text-black text-xs font-bold px-3 py-1 rounded-full">V</span>
      </div>
    </div>
  )
}
