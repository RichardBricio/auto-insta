import { put } from '@vercel/blob';
import { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';

export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const chunks: Buffer[] = [];

  for await (const chunk of req) {
    chunks.push(chunk);
  }

  const fileBuffer = Buffer.concat(chunks);
  const id = crypto.randomUUID();

  const blob = await put(`uploads/${id}`, fileBuffer, {
    access: 'public',
    contentType: req.headers['content-type'] || 'application/octet-stream',
    addRandomSuffix: false
  });

  return res.status(200).json({
    url: blob.url
  });
}
