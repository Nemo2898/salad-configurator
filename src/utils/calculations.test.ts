import { describe, it, expect } from "vitest"
import { calculateTotalWeight } from "./calculations"
import type { Ingredient } from "../types"

describe("calculateTotalWeight", () => {
  it("sums weight_grams of all ingredients", () => {
    const ingredients: Ingredient[] = [
      { id: 1, name: "Tomato", image_url: "", barcode_url: "", categoryId: 1, diets: [], weight_grams: 50 },
      { id: 2, name: "Cucumber", image_url: "", barcode_url: "", categoryId: 1, diets: [], weight_grams: 100 },
    ]

    const result = calculateTotalWeight(ingredients)
    expect(result).toBe(150)
  })

  it("returns 0 for empty array", () => {
    expect(calculateTotalWeight([])).toBe(0)
  })

  it("handles missing weight_grams as 0", () => {
    const ingredients: Ingredient[] = [
      { id: 1, name: "Lettuce", image_url: "", barcode_url: "", categoryId: 1, diets: [] },
    ]

    expect(calculateTotalWeight(ingredients)).toBe(0)
  })
})
