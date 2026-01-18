import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { createUserSchema } from '../validator/user.schema'
import { createUser, deleteUser, listUsers } from '../services/users.service'

export const usersRoutes = new Hono()

// GET /api/users
usersRoutes.get('/', (c) => {
  const users = listUsers()
  return c.json(users)
})

// POST /api/users
usersRoutes.post(
  '/',
  zValidator('json', createUserSchema),
  (c) => {
    try {
      const data = c.req.valid('json')
      const user = createUser(data)

      return c.json(
        { message: 'Usuário cadastrado com sucesso', user },
        201
      )
    } catch (error: any) {
      if (error.message.includes('UNIQUE')) {
        return c.json(
          { field: 'email', message: 'E-mail já cadastrado' },
          400
        )
      }

      return c.json(
        { message: 'Erro interno do servidor' },
        500
      )
    }
  }
)

// DELETE /api/users/:id
usersRoutes.delete('/:id', (c) => {
  const id = Number(c.req.param('id'))

  if (Number.isNaN(id)) {
    return c.json({ message: 'ID inválido' }, 400)
  }

  const deleted = deleteUser(id)

  if (!deleted) {
    return c.json({ message: 'Usuário não encontrado' }, 404)
  }

  return c.json({ message: 'Usuário deletado com sucesso' })
})
