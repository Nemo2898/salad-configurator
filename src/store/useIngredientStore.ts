import { create } from "zustand"
import type { Bowl, Ingredient } from "../types"

interface IngredientStore {
  slots: Record<string, Ingredient | null>
  baseType: number
  selectedBowl: Bowl | null
  setBaseType: (id: number) => void
  setBowl: (bowl: Bowl) => void
  clearSelection: () => void
  addIngredient: (item: Ingredient) => void
  removeIngredient: (id: number) => void
  clearSlot: (slotId: string) => void
}

export const useIngredientStore = create<IngredientStore>((set, get) => ({
  slots: {},
  baseType: 1,
  selectedBowl: null,

  setBaseType: (id) => set({ baseType: id }),
  setBowl: (bowl) => set({ selectedBowl: bowl }),

  clearSelection: () =>
    set({ slots: {}, selectedBowl: null, baseType: 1 }),

  addIngredient: (item) => {
    const { slots, selectedBowl } = get()
    if (item.categoryId === 6) {
      set({ slots: { ...slots, base: item } })
    } else {
      const slotCount = selectedBowl?.slot_count ?? 0
      for (let i = 1; i <= slotCount; i++) {
        const key = `slot-${i}`
        if (!slots[key]) {
          set({ slots: { ...slots, [key]: item } })
          return
        }
      }
    }
  },

  removeIngredient: (id) => {
    const { slots } = get()
    const newSlots = { ...slots }
    const key = Object.keys(newSlots).find((k) => newSlots[k]?.id === id)
    if (key) {
      newSlots[key] = null
      set({ slots: newSlots })
    }
  },

  clearSlot: (slotId) => {
    const { slots } = get()
    if (slotId in slots) {
      set({ slots: { ...slots, [slotId]: null } })
    }
  },
}))
