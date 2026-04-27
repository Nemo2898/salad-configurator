import { useIngredientStore } from "../store/useIngredientStore"
import type { Ingredient } from "../types"

export default function CenterBowl() {
  const setBaseType = useIngredientStore((s) => s.setBaseType)
  const baseType = useIngredientStore((s) => s.baseType)
  const slots = useIngredientStore((s) => s.slots)
  const selectedBowl = useIngredientStore((s) => s.selectedBowl)
  const clearSelection = useIngredientStore((s) => s.clearSelection)

  const baseIngredient = slots.base ?? null

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

        <button
          onClick={() => {
            if (window.confirm("Are you sure you want to empty the bowl?")) {
              clearSelection()
            }
          }}
          className="px-3 py-2 rounded-lg bg-red-400 hover:bg-red-500 transition-colors text-lg"
          title="Empty bowl"
        >
          🗑️
        </button>
        <button
          onClick={() => alert("Feature coming soon!")}
          className="px-3 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors text-lg"
          title="Undo"
        >
          ↩️
        </button>
        <button
          onClick={() => alert("Feature coming soon!")}
          className="px-3 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors text-lg"
          title="Save"
        >
          💾
        </button>

      </div>

      {/* Big Bowl */}
      <div className="w-80 h-80 rounded-full border-[12px] border-gray-200 bg-gray-50 flex flex-col items-center justify-center shadow-inner relative gap-1 p-4 overflow-hidden">
        {baseIngredient && baseIngredient.image_url && (
          <img
            src={baseIngredient.image_url}
            alt={baseIngredient.name}
            className="absolute inset-0 w-full h-full object-cover rounded-full z-10"
          />
        )}
        {selectedBowl && selectedBowl.wedge_image_url && (
          <img
            src={selectedBowl.wedge_image_url}
            alt="divider"
            className="absolute inset-0 w-full h-full object-cover rounded-full z-20"
          />
        )}
        {activeIngredients.length === 0 ? (
          <span className="text-gray-500 z-30">Bowl</span>
        ) : (
          activeIngredients.filter((i) => i.categoryId !== 6).map((ing) => (
            <span
              key={ing.id}
              className="bg-[#A2D135] text-black text-xs font-bold px-3 py-1 rounded-full z-30"
            >
              {ing.name}
            </span>
          ))
        )}
      </div>

      {/* Bottom info */}
      <div className="mt-4 text-center text-gray-600">
        <p>100 g / 1,99 €</p>
        <p>{selectedBowl ? selectedBowl.volume : 0} ml</p>
      </div>
    </div>
  );
}
