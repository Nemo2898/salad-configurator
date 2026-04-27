import { useIngredientStore } from "../store/useIngredientStore"

const DIVIDER_4 = "https://www.cc.puv.fi/~asa/fresh/images/jakaja_4_lohkoa.png"
const DIVIDER_6 = "https://www.cc.puv.fi/~asa/fresh/images/jakaja_6_lohkoa.png"

function getDividerUrl(slotCount: number): string | null {
  if (slotCount === 4) return DIVIDER_4
  if (slotCount === 6) return DIVIDER_6
  return null
}

export default function CenterBowl() {
  const setBaseType = useIngredientStore((s) => s.setBaseType)
  const baseType = useIngredientStore((s) => s.baseType)
  const slots = useIngredientStore((s) => s.slots)
  const selectedBowl = useIngredientStore((s) => s.selectedBowl)
  const clearSelection = useIngredientStore((s) => s.clearSelection)
  const clearSlot = useIngredientStore((s) => s.clearSlot)

  const baseIngredient = slots.base ?? null
  const slotCount = selectedBowl?.slot_count ?? 0
  const dividerUrl = getDividerUrl(slotCount)

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
        {dividerUrl && (
          <img
            src={dividerUrl}
            alt="divider"
            className="absolute inset-0 w-full h-full object-cover rounded-full z-20"
          />
        )}
        {slotCount === 0 ? (
          <span className="text-gray-500 z-30">Select a bowl</span>
        ) : (
          Array.from({ length: slotCount }, (_, i) => i + 1).map((slotNum) => {
            const key = `slot-${slotNum}`
            const item = slots[key]
            const angle = (360 / slotCount) * (slotNum - 1)
            return (
              <div
                key={key}
                className="absolute inset-0 z-30 flex items-center justify-center"
                style={{ transform: `rotate(${angle}deg)` }}
              >
                {item && item.wedge_image_url ? (
                  <div className="relative w-1/2 h-1/2">
                    <img
                      src={item.wedge_image_url}
                      alt={item.name}
                      className="w-full h-full object-contain"
                      style={{ transform: `rotate(${-angle}deg)` }}
                    />
                    <button
                      onClick={() => clearSlot(key)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs leading-none hover:bg-red-700"
                      style={{ transform: `rotate(${-angle}deg)` }}
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <span className="text-gray-400 text-xs" style={{ transform: `rotate(${-angle}deg)` }}>
                    Slot {slotNum}
                  </span>
                )}
              </div>
            )
          })
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
