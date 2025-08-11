/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

// Fallback module declarations for asset imports (helps some editors/linters)
declare module "*.svg" {
  const src: string;
  export default src;
}
declare module "*.png" {
  const src: string;
  export default src;
}
declare module "*.jpg" {
  const src: string;
  export default src;
}
declare module "*.jpeg" {
  const src: string;
  export default src;
}
declare module "*.webp" {
  const src: string;
  export default src;
}
