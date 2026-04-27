import { Link } from "react-router-dom"
import { useIngredientStore } from "../store/useIngredientStore"
import type { Ingredient } from "../types"

export default function SummaryBar() {
  const slots = useIngredientStore((s) => s.slots)
  const removeIngredient = useIngredientStore((s) => s.removeIngredient)

  const activeIngredients: Ingredient[] = Object.values(slots).filter(
    (i): i is Ingredient => i !== null
  )

  return (
    <div className="bg-zinc-800 rounded-[3rem] p-8 text-white w-full flex flex-col md:flex-row gap-8 shadow-xl">

      <div className="flex-1 bg-[#3a3a3a] rounded-3xl p-6 min-h-[150px] shadow-inner">
        <h3 className="text-lg font-semibold mb-2">
          Selected ingredients ({activeIngredients.length})
        </h3>
        <div className="flex flex-wrap gap-2">
          {activeIngredients.map((ing) => (
            <span
              key={ing.id}
              className="bg-[#A2D135] text-black text-sm font-bold px-3 py-1 rounded-full flex items-center gap-2"
            >
              {ing.name}
              <button
                onClick={() => removeIngredient(ing.id)}
                className="text-black hover:text-red-600 font-bold text-xs leading-none"
              >
                x
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center gap-6">
        <div className="flex flex-col items-center">
          <span className="bg-white text-black font-black text-2xl py-3 w-32 rounded-full mb-2 shadow-md text-center">
            0 g
          </span>
          <span className="text-sm opacity-80">Total Weight</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="bg-white text-black font-black text-2xl py-3 w-32 rounded-full mb-2 shadow-md text-center">
            0,00 €
          </span>
          <span className="text-sm opacity-80">Total Price</span>
        </div>
        <Link
          to="/print"
          className="bg-[#A2D135] text-black font-bold px-8 py-3 rounded-full hover:bg-opacity-80 transition-colors shadow-md"
        >
          Print
        </Link>
      </div>

    </div>
  )
}
