import { db } from '../db'
import type { CreateUserInput } from '../validator/user.schema'

export function createUser(data: CreateUserInput) {
  const query = db.prepare(`
    INSERT INTO users (
      name, email, cnpj, monthly_revenue, 
      whatsapp_admin, whatsapp_suport, password, project_type, created_at
    ) VALUES (
      $name, $email, $cnpj, $monthly_revenue, 
      $whatsapp_admin, $whatsapp_suport, $password, $project_type, $created_at
    )
  `)

  try {
    const result = query.run({
      $name: data.name,
      $email: data.email,
      $cnpj: data.cnpj,
      $monthly_revenue: data.monthlyRevenue,
      $whatsapp_admin: data.whatsappAdmin,
      $whatsapp_suport: data.whatsappSuport,
      $password: data.password, 
      $project_type: data.projectType,
      $created_at: new Date().toISOString()
    })

    return { id: result.lastInsertRowid }
  } catch (error: any) {
    if (error.message.includes("UNIQUE constraint failed: users.email")) {
      throw new Error("Este e-mail já está em uso.")
    }
    throw new Error(`Erro ao salvar no banco: ${error.message}`)
  }
}

export function listUsers() {
  return db.query(`
    SELECT 
      id, name, email, cnpj, monthly_revenue, 
      whatsapp_admin, whatsapp_suport, project_type, created_at 
    FROM users 
    ORDER BY created_at DESC
  `).all()
}

export function deleteUser(id: number | string) {
  const query = db.prepare(`DELETE FROM users WHERE id = ?`)
  const result = query.run(id)
  
  return result.changes > 0
}