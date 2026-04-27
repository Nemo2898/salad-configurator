import { useState, useEffect } from "react"
import type { Bowl, Category, Ingredient } from "../types"
import { getBowls, getCategories, getIngredients, getBaseIngredients } from "../services/api"
import { useIngredientStore } from "../store/useIngredientStore"
import BaseSelection from "../components/BaseSelection.tsx"
import BowlSelection from "../components/BowlSelection.tsx"
import CenterBowl from "../components/CenterBowl.tsx"
import IngredientSection from "../components/IngredientSection.tsx"
import SummaryBar from "../components/SummaryBar.tsx"

export default function Configurator() {
  const [bowls, setBowls] = useState<Bowl[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [baseIngredients, setBaseIngredients] = useState<Ingredient[]>([])
  const baseType = useIngredientStore((s) => s.baseType)

  useEffect(() => {
    async function fetchData() {
      try {
        const [bowlsData, categoriesData, ingredientsData, baseIngredientsData] = await Promise.all([
          getBowls(),
          getCategories(),
          getIngredients(),
          getBaseIngredients()
        ])
        setBowls(bowlsData)
        setCategories(categoriesData)
        setIngredients(ingredientsData)
        setBaseIngredients(baseIngredientsData)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  const filteredBowls = bowls.filter((b) => b.base_type_id === baseType)
  const filteredCategories = categories.filter((c) => c.base_type_id === baseType)

  return (
    <main className="flex-1 max-w-6xl w-full mx-auto p-6 flex flex-col gap-8 mt-4">

      {/* Top row: bowl selection, center bowl, base selection */}
      <div className="flex flex-col lg:flex-row gap-6 justify-between items-stretch">
        <BowlSelection bowls={filteredBowls} />
        <CenterBowl />
        <BaseSelection bases={baseIngredients} />
      </div>

      {/* Bottom row: ingredient section */}
        <IngredientSection categories={filteredCategories} ingredients={ingredients} />

      {/* Summary bar */}
      <SummaryBar />
    </main>
  )
}
