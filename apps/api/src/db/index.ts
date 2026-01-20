import { Database } from 'bun:sqlite'

export const db = new Database('database.sqlite')

db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    cnpj TEXT NOT NULL,
    monthly_revenue TEXT NOT NULL,
    whatsapp_admin TEXT NOT NULL,
    whatsapp_suport TEXT NOT NULL,
    password TEXT NOT NULL,
    project_type TEXT NOT NULL,
    created_at TEXT NOT NULL
  )
`)
