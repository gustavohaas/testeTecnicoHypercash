import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { usersRoutes } from './routes/users'

const app = new Hono()

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  allowMethods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type'],
}))

app.route('/api/users', usersRoutes)

app.get('/', (c) => {
  return c.text('API rodando 🚀')
})

export default app
