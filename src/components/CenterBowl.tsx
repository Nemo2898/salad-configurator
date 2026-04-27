import { useIngredientStore } from "../store/useIngredientStore"
import type { Ingredient } from "../types"

export default function CenterBowl() {
  const setBaseType = useIngredientStore((s) => s.setBaseType)
  const baseType = useIngredientStore((s) => s.baseType)
  const slots = useIngredientStore((s) => s.slots)

  const activeIngredients: Ingredient[] = Object.values(slots).filter(
    (i): i is Ingredient => i !== null
  )

  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[400px] mt-4 lg:mt-0">

      {/* Top button row */}
      <div className="flex gap-3 mb-6 items-center">
        <button
          onClick={() => setBaseType(1)}
          className={`px-4 py-2 rounded-lg transition-colors ${baseType === 1 ? "bg-green-400" : "bg-green-200"}`}
        >
          Salaatti
        </button>
        <button
          onClick={() => setBaseType(2)}
          className={`px-4 py-2 rounded-lg transition-colors ${baseType === 2 ? "bg-blue-400" : "bg-blue-200"}`}
        >
          Rahka
        </button>
        <button className="px-4 py-2 bg-gray-200 rounded-lg">Icon</button>
      </div>

      {/* Big Bowl */}
      <div className="w-80 h-80 rounded-full border-[12px] border-gray-200 bg-gray-50 flex flex-col items-center justify-center shadow-inner relative gap-1 p-4 overflow-hidden">
        {activeIngredients.length === 0 ? (
          <span className="text-gray-500">Bowl</span>
        ) : (
          activeIngredients.map((ing) => (
            <span
              key={ing.id}
              className="bg-[#A2D135] text-black text-xs font-bold px-3 py-1 rounded-full"
            >
              {ing.name}
            </span>
          ))
        )}
      </div>

      {/* Bottom info */}
      <div className="mt-4 text-center text-gray-600">
        <p>100 g / 1,99 €</p>
        <p>500 ml</p>
      </div>
    </div>
  );
}
