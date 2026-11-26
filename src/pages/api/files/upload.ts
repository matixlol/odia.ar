import type { APIRoute } from "astro";
import { getSession, isSameOrigin } from "../../../lib/auth";
import {
  createUploadUrl,
  publicFilePath,
  storageConfigured,
} from "../../../lib/storage";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const session = await getSession(request);
    if (!session) throw new Error("No autorizado");
    if (!isSameOrigin(request)) throw new Error("Origen inválido");
    if (!storageConfigured) throw new Error("Bucket no configurado");

    const body = (await request.json()) as {
      filename?: unknown;
      contentType?: unknown;
      size?: unknown;
    };
    const filename =
      typeof body.filename === "string"
        ? body.filename.split(/[\\/]/).pop()?.trim()
        : undefined;
    const contentType =
      typeof body.contentType === "string" && body.contentType
        ? body.contentType
        : "application/octet-stream";

    if (!filename || filename.length > 180 || /[\u0000-\u001f]/.test(filename)) {
      throw new Error("Nombre de archivo inválido");
    }
    if (
      typeof body.size !== "number" ||
      body.size <= 0 ||
      body.size > 250 * 1024 * 1024
    ) {
      throw new Error("El archivo debe pesar menos de 250 MB");
    }

    const key = `uploads/${new Date().getFullYear()}/${crypto.randomUUID()}-${filename}`;
    const uploadUrl = await createUploadUrl(key, contentType);
    return Response.json({ uploadUrl, key, url: publicFilePath(key) });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "No se pudo subir el archivo";
    return Response.json(
      { error: message },
      {
        status:
          message === "No autorizado"
            ? 401
            : message === "Origen inválido"
              ? 403
              : 400,
      },
    );
  }
};
