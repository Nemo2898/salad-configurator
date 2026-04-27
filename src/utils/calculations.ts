import type { Ingredient } from "../types"

export function calculateTotalWeight(ingredients: Ingredient[]): number {
  return ingredients.reduce((sum, i) => sum + (i.weight_grams ?? 0), 0)
}
