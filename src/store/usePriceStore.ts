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

    /*
     * The prices API may return duplicate entries for the same item_id
     * (e.g. item_id=101 appears twice with different prices).
     * This is believed to be a server-side artifact — the same ingredient
     * having different prices under Salad vs Curd mode.
     *
     * Since the API does not provide a type_id or base_type_id field to
     * distinguish which price belongs to which mode, we deduplicate by
     * keeping only the first occurrence for each item_id.
     *
     * Only 5 items are affected (categoryId=1, Curd-only ingredients),
     * and they only appear in Curd mode where the first price is correct.
     */
    const seen = new Set<number>()
    const deduped = data.filter((p: { item_id: number }) => {
      if (seen.has(p.item_id)) return false
      seen.add(p.item_id)
      return true
    })

    set({ prices: deduped })
  },
}))
