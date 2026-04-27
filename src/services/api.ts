const API_BASE = "https://fresse-api.onrender.com/api"

export async function login(email: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
  if (!res.ok) {
    throw new Error("Invalid credentials")
  }
  const data = await res.json()
  return data as { token: string; name: string }
}

export async function getPrices(token: string) {
  const res = await fetch(`${API_BASE}/prices`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  const data = await res.json()
  return data
}

export async function getBowls() {
  const res = await fetch(`${API_BASE}/bowls`)
  const data = await res.json()
  return data
}

export async function getCategories() {
  const res = await fetch(`${API_BASE}/categories`)
  const data = await res.json()
  return data
}

export async function getIngredients() {
  const res = await fetch(`${API_BASE}/ingredients`)
  const data = await res.json()
  return data
}
