# odia.ar

Esta es la página web de ODIA, el Observatorio de Derecho Informatico Argentino.

## dev

```
pnpm install
pnpm dev
```

## Administración de archivos

El panel en `/admin` permite que integrantes del Google Workspace `@odia.ar`
suban, copien enlaces y eliminen archivos del bucket privado `odia-files` de
Railway. Los enlaces públicos estables usan `/files/<key>` y redirigen a una URL
firmada temporal, por lo que las credenciales nunca llegan al navegador.

1. El proyecto Railway `odia` y su bucket `odia-files` están creados en la
   región `iad`. Ejecuta `railway bucket credentials` dentro de este repo para
   obtener sus seis variables `AWS_*`.
2. El cliente OAuth 2.0 `odia.ar Admin` está creado en Google Cloud con estos
   redirect URIs:
   - `http://localhost:4321/api/auth/callback/google`
   - `https://odia.ar/api/auth/callback/google`
3. Las variables del bucket y de Google OAuth están configuradas como secretos
   de Production en Vercel. Usa `.env.example` como referencia para desarrollo.
4. El CORS del bucket permite `PUT` desde `https://odia.ar` y
   `http://localhost:4321`.

La autorización de subida y borrado se valida en el servidor, incluyendo el
claim de dominio de Google Workspace. Las cargas y descargas binarias viajan
directamente entre el navegador y Railway mediante URLs firmadas.
