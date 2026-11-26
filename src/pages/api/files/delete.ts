import type { APIRoute } from "astro";
import { getSession, isSameOrigin } from "../../../lib/auth";
import { deleteFile } from "../../../lib/storage";

export const prerender = false;

export const POST: APIRoute = async ({ request, redirect }) => {
  const session = await getSession(request);
  if (!session) return new Response("No autorizado", { status: 401 });
  if (!isSameOrigin(request)) {
    return new Response("Origen inválido", { status: 403 });
  }

  const pathname = (await request.formData()).get("pathname");
  if (
    typeof pathname !== "string" ||
    !pathname.startsWith("uploads/") ||
    pathname.includes("..")
  ) {
    return new Response("Archivo inválido", { status: 400 });
  }

  await deleteFile(pathname);
  return redirect("/admin?deleted=1", 303);
};
