import { put } from "@vercel/blob";

export const config = {
  api: {
    bodyParser: false, // MUITO IMPORTANTE
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const chunks: Buffer[] = [];

  for await (const chunk of req) {
    chunks.push(
      typeof chunk === "string" ? Buffer.from(chunk) : chunk
    );
  }

  const buffer = Buffer.concat(chunks);

  const blob = await put("arquivo.png", buffer, {
    access: "public",
    contentType: req.headers["content-type"] || "application/octet-stream",
  });

  return res.status(200).json(blob);
}
