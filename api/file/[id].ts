import { VercelRequest, VercelResponse } from '@vercel/node'

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { id } = req.query

  if (!global.storage || !global.storage[id as string]) {
    return res.status(404).end()
  }

  const file = global.storage[id as string]

  res.setHeader('Content-Type', 'image/jpeg')
  res.send(file)

}
