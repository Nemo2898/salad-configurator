import type { Ingredient } from "../types"
import { useIngredientStore } from "../store/useIngredientStore"
import { useAuthStore } from "../store/useAuthStore"
import { usePriceStore } from "../store/usePriceStore"

interface Props {
  ingredient: Ingredient
}

export default function IngredientCard({ ingredient }: Props) {
  const addIngredient = useIngredientStore((s) => s.addIngredient)
  const token = useAuthStore((s) => s.token)
  const prices = usePriceStore((s) => s.prices)

  const price = prices.find((p) => p.item_id === ingredient.id)

  return (
    <button
      onClick={() => addIngredient(ingredient)}
      className="bg-[#3a3a3a] rounded-2xl p-4 flex flex-col justify-between aspect-square shadow-md hover:shadow-lg transition-shadow cursor-pointer text-left w-full"
    >
      <span className="text-white text-sm font-medium leading-tight">
        {ingredient.name}
      </span>
      <div className="flex flex-col gap-1 mt-2">
        {token ? (
          price ? (
            <span className="text-[#A2D135] text-xs font-bold">
              + {price.price.toFixed(2)} €
            </span>
          ) : null
        ) : (
          <span className="text-gray-400 text-xs">Login to see price</span>
        )}
        <div className="flex gap-1">
          {ingredient.diets.map((diet) => (
            <span
              key={diet}
              className="bg-[#A2D135] text-black text-xs font-bold px-2 py-0.5 rounded-full"
            >
              {diet}
            </span>
          ))}
        </div>
      </div>
    </button>
  )
}
