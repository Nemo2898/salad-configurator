const API_BASE = "https://fresse-api.onrender.com/api"

export async function getBowls(typeId?: number) {
  const url = typeId != null
    ? `${API_BASE}/bowls?type_id=${typeId}`
    : `${API_BASE}/bowls`
  const res = await fetch(url)
  const data = await res.json()
  return data
}

export async function getCategories(typeId?: number) {
  const url = typeId != null
    ? `${API_BASE}/categories?type_id=${typeId}`
    : `${API_BASE}/categories`
  const res = await fetch(url)
  const data = await res.json()
  return data
}

export async function getIngredients() {
  const res = await fetch(`${API_BASE}/ingredients`)
  const data = await res.json()
  return data
}

export async function getBaseIngredients() {
  const res = await fetch(`${API_BASE}/baseingredients`)
  const data = await res.json()
  return data
}
