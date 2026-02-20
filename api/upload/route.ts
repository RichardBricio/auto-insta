import { put } from "@vercel/blob";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return new Response("No file", { status: 400 });
  }

  const uniqueName = `${crypto.randomUUID()}-${file.name}`;

  const blob = await put(uniqueName, file, {
    access: "public",
  });

  return Response.json(blob);
}
