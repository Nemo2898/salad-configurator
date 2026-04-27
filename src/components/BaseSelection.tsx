import type { Ingredient } from "../types"

interface Props {
  baseIngredients: Ingredient[]
}

export default function BaseSelection({ baseIngredients }: Props) {

  return (
    <div className="bg-zinc-800 rounded-[3rem] p-6 text-white w-full lg:w-1/4 flex flex-col items-center shadow-lg">

      {/* Circle number */}
      <div className="bg-white text-black font-bold rounded-full w-8 h-8 flex items-center justify-center mb-4 shrink-0">
        2
      </div>

      {/* Title */}
      <h2 className="text-xl font-semibold mb-6">Valitse salaattipohja</h2>

      {/* Dynamic base options */}
      {baseIngredients.map((base) => (
        <div key={base.id} className="border-b border-gray-600 pb-2 flex justify-end gap-4 items-center w-full mb-3">
          <button className="hover:text-[#A2D135] transition-colors">
            {base.name}
          </button>
        </div>
      ))}

    </div>
  )
}
