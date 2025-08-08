import type { Metadata } from "next";

export const APP_URL = () => {
  switch (process.env.VERCEL_ENV) {
    case "development":
      return "http://localhost:3000";
    case "preview":
      return `https://${process.env.VERCEL_URL}`;
    case "production":
      return `https://cambio.raphaelsalaja.com`;
    default:
      return "http://localhost:3000";
  }
};

export const APP_OG_ENDPOINT = `${APP_URL()}/opengraph.png`;
export const APP_DESCRIPTION = "A simple shared animation component for React";
export const APP_NAME = "Cambio";
export const KEYWORDS = ["Cambio", "Animation", "React"];

function createBaseMetadata(title: string, description: string): Metadata {
  return {
    metadataBase: new URL(APP_URL()),
    title,
    description,
    keywords: KEYWORDS,
    openGraph: {
      title,
      description,
      url: APP_URL(),
      siteName: title,
      type: "website",
      locale: "en_US",
      images: [{ url: APP_OG_ENDPOINT }],
    },
    twitter: {
      card: "summary_large_image",
      creator: "@raphaelsalaja",
      title,
      description,
      images: [{ url: APP_OG_ENDPOINT }],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export const opengraph: Metadata = {
  ...createBaseMetadata(APP_NAME, APP_DESCRIPTION),
  title: {
    default: APP_NAME,
    template: "%s",
  },
};
