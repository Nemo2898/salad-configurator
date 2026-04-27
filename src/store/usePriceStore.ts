import { create } from "zustand"
import type { PriceListItem } from "../types"
import { getPrices } from "../services/api"

interface PriceStore {
  prices: PriceListItem[]
  fetchPrices: (token: string) => Promise<void>
}

export const usePriceStore = create<PriceStore>((set) => ({
  prices: [],

  fetchPrices: async (token) => {
    const data = await getPrices(token)
    set({ prices: data })
  },
}))
