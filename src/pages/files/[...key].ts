import type { APIRoute } from "astro";
import {
  createDownloadUrl,
  storageConfigured,
} from "../../lib/storage";

export const prerender = false;

export const GET: APIRoute = async ({ params, redirect }) => {
  const key = params.key;
  if (
    !key ||
    !key.startsWith("uploads/") ||
    key.includes("..") ||
    !storageConfigured
  ) {
    return new Response("Archivo no encontrado", { status: 404 });
  }

  try {
    return redirect(await createDownloadUrl(key), 302);
  } catch {
    return new Response("Archivo no encontrado", { status: 404 });
  }
};
