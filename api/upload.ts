import { put } from "@vercel/blob";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const chunks = [];

  for await (const chunk of req) {
    chunks.push(chunk);
  }

  const buffer = Buffer.concat(chunks);

  const blob = await put("arquivo.png", buffer, {
    access: "public",
    contentType: req.headers["content-type"],
  });

  return res.status(200).json(blob);
}
