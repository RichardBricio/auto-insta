import { VercelRequest, VercelResponse } from '@vercel/node'

let storage: Record<string, Buffer> = {}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    const chunks: Buffer[] = []

    for await (const chunk of req) {
      chunks.push(chunk)
    }

    const fileBuffer = Buffer.concat(chunks)
    const id = crypto.randomUUID()

    storage[id] = fileBuffer

    // Expira em 1 hora
    setTimeout(() => {
      delete storage[id]
    }, 3600000)

    return res.json({
      url: `${req.headers.host}/api/file/${id}`
    })
  }

  res.status(405).end()
}