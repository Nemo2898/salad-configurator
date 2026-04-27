import type { Ingredient } from "../types"
import { useIngredientStore } from "../store/useIngredientStore"

interface Props {
  bases: Ingredient[]
}

export default function BaseSelection({ bases }: Props) {
  const addIngredient = useIngredientStore((s) => s.addIngredient)
  const slots = useIngredientStore((s) => s.slots)
  const selectedBase = slots.base ?? null

  return (
    <div className="bg-zinc-800 rounded-[3rem] p-6 text-white w-full lg:w-1/4 flex flex-col items-center shadow-lg">

      {/* Circle number */}
      <div className="bg-white text-black font-bold rounded-full w-8 h-8 flex items-center justify-center mb-4 shrink-0">
        2
      </div>

      {/* Title */}
      <h2 className="text-xl font-semibold mb-6">Valitse salaattipohja</h2>

      {/* Dynamic base options */}
      {bases.map((base) => (
        <div key={base.id} className="border-b border-gray-600 pb-2 flex justify-end gap-4 items-center w-full mb-3">
          <button
            onClick={() => addIngredient(base)}
            className={`hover:text-[#A2D135] transition-colors ${
              selectedBase?.id === base.id ? "text-[#A2D135] font-bold" : ""
            }`}
          >
            {base.name}
          </button>
        </div>
      ))}

    </div>
  )
}
