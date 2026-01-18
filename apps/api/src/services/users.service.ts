import { db } from '../db'
import type { CreateUserInput } from '../validator/user.schema'

export function createUser(data: CreateUserInput) {
  const query = db.prepare(`
    INSERT INTO users (name, email, created_at)
    VALUES (?, ?, ?)
  `)

  const result = query.run(
    data.name,
    data.email,
    new Date().toISOString()
  )

  return { id: result.lastInsertRowid }
}

export function listUsers() {
  return db.prepare(`
    SELECT id, name, email, created_at
    FROM users
    ORDER BY created_at DESC
  `).all()
}

export function deleteUser(id: number) {
  const result = db
    .prepare(`DELETE FROM users WHERE id = ?`)
    .run(id)

  return result.changes > 0
}
