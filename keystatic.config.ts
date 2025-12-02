import { config, fields, collection } from "@keystatic/core";
import { block, wrapper, repeating } from "@keystatic/core/content-components";

const outletOptions = [
  { label: "CELS", value: "cels" },
  { label: "Chequeado", value: "chequeado" },
  { label: "Vía Libre", value: "via-libre" },
  { label: "Página 12", value: "pagina12" },
  { label: "Ámbito", value: "ambito" },
  { label: "Clarín", value: "clarin" },
  { label: "La Nación", value: "la-nacion" },
  { label: "CNN Español", value: "cnn-espaniol" },
  { label: "The Japan Times", value: "the-japan-times" },
  { label: "Wired", value: "wired" },
  { label: "Diario Judicial", value: "diariojudicial" },
  { label: "Infobae", value: "infobae" },
  { label: "La Gaceta", value: "la-gaceta" },
  { label: "LAIA", value: "laia" },
  { label: "Palabras del Derecho", value: "palabrasdelderecho" },
] as const;

const contentComponents = {
  MediaAppearance: block({
    label: "Aparición en medios",
    schema: {
      href: fields.url({
        label: "URL del artículo",
        validation: { isRequired: true },
      }),
      title: fields.text({ label: "Título", validation: { isRequired: true } }),
      outlet: fields.select({
        label: "Medio (opcional, se detecta por URL)",
        options: [{ label: "Auto-detectar", value: "" }, ...outletOptions],
        defaultValue: "",
      }),
    },
  }),
  Timeline: repeating({
    label: "Línea de tiempo",
    children: ["TimelineEvent"],
    schema: {
      title: fields.text({ label: "Título (opcional)" }),
    },
  }),
  TimelineEvent: wrapper({
    label: "Evento de línea de tiempo",
    schema: {
      title: fields.text({ label: "Título", validation: { isRequired: true } }),
      moment: fields.text({
        label: "Fecha/momento",
        validation: { isRequired: true },
      }),
    },
  }),
  SocialLink: block({
    label: "Enlace social",
    schema: {
      href: fields.url({ label: "URL", validation: { isRequired: true } }),
      icon: fields.text({
        label: "Icono (nombre de astro-icon)",
        validation: { isRequired: true },
      }),
      ariaLabel: fields.text({ label: "Aria label (accesibilidad)" }),
    },
  }),
};

const blogSchema = {
  title: fields.slug({ name: { label: "Título" } }),
  description: fields.text({
    label: "Descripción",
    multiline: true,
  }),
  date: fields.date({
    label: "Fecha",
    validation: { isRequired: true },
  }),
  cover: fields.image({
    label: "Imagen de portada",
  }),
  draft: fields.checkbox({
    label: "Borrador",
    defaultValue: false,
  }),
  content: fields.mdx({
    label: "Contenido",
    components: contentComponents,
  }),
};

export default config({
  storage: {
    kind: "local",
  },
  collections: {
    blog: collection({
      label: "Blog",
      slugField: "title",
      path: "src/content/blog/**",
      format: { contentField: "content", data: "yaml" },
      entryLayout: "content",
      schema: blogSchema,
    }),
    casos: collection({
      label: "Casos",
      slugField: "title",
      path: "src/content/casos/*",
      format: { contentField: "content", data: "yaml" },
      entryLayout: "content",
      schema: {
        title: fields.slug({ name: { label: "Título" } }),
        shortTitle: fields.text({
          label: "Título corto",
        }),
        description: fields.text({
          label: "Descripción",
          multiline: true,
        }),
        cover: fields.image({
          label: "Imagen de portada",
          directory: "src/assets/genericos",
          publicPath: "../../assets/genericos/",
        }),
        draft: fields.checkbox({
          label: "Borrador",
          defaultValue: false,
        }),
        content: fields.mdx({
          label: "Contenido",
          components: contentComponents,
        }),
      },
    }),
  },
});
