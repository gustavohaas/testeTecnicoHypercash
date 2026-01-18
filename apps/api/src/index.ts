import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => c.text('API com Hono + Bun 🚀'))

export default {
  port: 3001,
  fetch: app.fetch,
}