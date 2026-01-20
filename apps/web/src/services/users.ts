import { CreateUserInput } from "@/schemas/user.schema"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function getUsers() {
  const res = await fetch(`${API_URL}/api/users`)
  if (!res.ok) throw new Error("Erro ao buscar usuários")
  return res.json()
}

export async function createUser(data: CreateUserInput) {
  const res = await fetch(`${API_URL}/api/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("Erro ao criar usuário")
  return res.json()
}

export async function deleteUser(id: number) {
  const res = await fetch(`${API_URL}/api/users/${id}`, {
    method: "DELETE",
  })
  if (!res.ok) throw new Error("Erro ao deletar usuário")
  return res.json()
}
