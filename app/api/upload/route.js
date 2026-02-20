import { put } from "@vercel/blob";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return new Response("No file provided", { status: 400 });
    }

    const uniqueName = `${crypto.randomUUID()}-${file.name}`;

    const blob = await put(uniqueName, file, {
      access: "public",
    });

    return Response.json({ url: blob.url });

  } catch (error) {
    console.error(error);
    return new Response("Upload error", { status: 500 });
  }
}
