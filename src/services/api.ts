const API_BASE = "https://fresse-api.onrender.com/api"

export async function login(email: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
  if (!res.ok) throw new Error("Invalid credentials")
  const data = await res.json()
  return data as { token: string; name: string }
}

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

export async function getIngredients(categoryId?: number) {
  const url = categoryId != null
    ? `${API_BASE}/ingredients?category_id=${categoryId}`
    : `${API_BASE}/ingredients`
  const res = await fetch(url)
  const data = await res.json()
  return data
}

export async function getBaseIngredients() {
  const res = await fetch(`${API_BASE}/baseingredients`)
  const data = await res.json()
  return data
}

export async function getPrices(token: string) {
  const res = await fetch(`${API_BASE}/prices`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  const data = await res.json()
  return data
}

interface SaveRecipeData {
  name: string
  bowlId: number
  ingredientIds: number[]
  is_public: boolean
}

export async function saveRecipe(token: string, data: SaveRecipeData) {
  const res = await fetch(`${API_BASE}/recipes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("Failed to save recipe")
  return res.json()
}
