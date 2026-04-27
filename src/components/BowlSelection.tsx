import type { Bowl } from "../types"
import { useIngredientStore } from "../store/useIngredientStore"

interface Props {
  bowls: Bowl[]
}

export default function BowlSelection({ bowls }: Props) {
  const setBowl = useIngredientStore((s) => s.setBowl)
  const selectedBowl = useIngredientStore((s) => s.selectedBowl)

  return (
    <div className="bg-zinc-800 rounded-[3rem] p-6 text-white w-full lg:w-1/4 flex flex-col items-center shadow-lg">

      {/* Circle number */}
      <div className="bg-white text-black font-bold rounded-full w-8 h-8 flex items-center justify-center mb-4 shrink-0">
        1
      </div>

      {/* Title */}
      <h2 className="text-xl font-semibold mb-6">Valitse rasia</h2>

      {/* Dynamic bowl buttons */}
      {bowls.map((bowl) => (
        <button
          key={bowl.id}
          onClick={() => setBowl(bowl)}
          className={`h-12 border-2 rounded-xl flex items-center px-4 w-full mb-3 hover:border-[#A2D135] transition-colors ${
            selectedBowl?.id === bowl.id
              ? "border-[#A2D135] bg-[#A2D135]/10"
              : "border-gray-600"
          }`}
        >
          {bowl.name}
        </button>
      ))}

    </div>
  )
}
