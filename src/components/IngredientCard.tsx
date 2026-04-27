import type { Ingredient } from "../types"
import { useIngredientStore } from "../store/useIngredientStore"

interface Props {
  ingredient: Ingredient
}

export default function IngredientCard({ ingredient }: Props) {
  const addIngredient = useIngredientStore((s) => s.addIngredient)

  return (
    <button
      onClick={() => addIngredient(ingredient)}
      className="bg-[#3a3a3a] rounded-2xl p-4 flex flex-col justify-between aspect-square shadow-md hover:shadow-lg transition-shadow cursor-pointer text-left w-full"
    >
      <span className="text-white text-sm font-medium leading-tight">
        {ingredient.name}
      </span>
      <div className="flex gap-1 mt-2">
        {ingredient.diets.map((diet) => (
          <span
            key={diet}
            className="bg-[#A2D135] text-black text-xs font-bold px-2 py-0.5 rounded-full"
          >
            {diet}
          </span>
        ))}
      </div>
    </button>
  )
}
