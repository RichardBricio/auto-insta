import { put } from "@vercel/blob";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const contentType = req.headers["content-type"] || "application/octet-stream";

    const chunks: Buffer[] = [];

    for await (const chunk of req) {
      chunks.push(chunk);
    }

    const buffer = Buffer.concat(chunks);

    const blob = await put(`arquivo-${Date.now()}`, buffer, {
      access: "public",
      contentType,
    });

    return res.status(200).json(blob);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "upload failed" });
  }
}
