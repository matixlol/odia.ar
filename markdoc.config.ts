import { defineMarkdocConfig, component } from "@astrojs/markdoc/config";

export default defineMarkdocConfig({
  tags: {
    mediaappearance: {
      render: component("./src/components/MediaAppearance.astro"),
      attributes: {
        href: { type: String, required: true },
        title: { type: String, required: true },
        outlet: { type: String, required: false },
      },
    },
    timeline: {
      render: component("./src/components/Timeline.astro"),
      attributes: {
        title: { type: String, required: false },
      },
    },
    timelineevent: {
      render: component("./src/components/TimelineEvent.astro"),
      attributes: {
        title: { type: String, required: true },
        moment: { type: String, required: true },
      },
    },
    sociallink: {
      render: component("./src/components/SocialLink.astro"),
      attributes: {
        href: { type: String, required: true },
        icon: { type: String, required: true },
        ariaLabel: { type: String, required: false },
      },
    },
    pdfembed: {
      render: component("./src/components/PdfEmbed.astro"),
      attributes: {
        src: { type: String, required: true },
        title: { type: String, required: false },
        height: { type: Number, required: false },
      },
    },
  },
});
