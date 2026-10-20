import type { Metadata } from "next";

export function getSiteUrl(): string | undefined {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!configuredUrl) return undefined;

  try {
    const siteUrl = new URL(configuredUrl);
    const isLocalhost =
      siteUrl.hostname === "localhost" ||
      siteUrl.hostname.endsWith(".localhost") ||
      siteUrl.hostname === "127.0.0.1" ||
      siteUrl.hostname === "[::1]";

    if (siteUrl.protocol !== "https:" || isLocalhost) return undefined;

    siteUrl.pathname = "/";
    siteUrl.search = "";
    siteUrl.hash = "";
    return siteUrl.toString();
  } catch {
    return undefined;
  }
}

export function createPageMetadata(
  title: string,
  description: string,
): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      locale: "pt_BR",
      siteName: "Lativera",
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export function createCanonicalPageMetadata(
  path: string,
  title: string,
  description: string,
  image?: { url: string; alt: string },
  type: "website" | "article" = "website",
): Metadata {
  const pageMetadata = createPageMetadata(title, description);
  const siteUrl = getSiteUrl();
  if (!siteUrl) return pageMetadata;

  const canonical = new URL(path, siteUrl).toString();
  const imageUrl = image ? new URL(image.url, siteUrl).toString() : undefined;

  return {
    ...pageMetadata,
    alternates: { canonical },
    openGraph: {
      ...pageMetadata.openGraph,
      type,
      url: canonical,
      ...(image && imageUrl
        ? { images: [{ url: imageUrl, alt: image.alt }] }
        : {}),
    },
    ...(imageUrl
      ? { twitter: { ...pageMetadata.twitter, card: "summary_large_image", images: [imageUrl] } }
      : {}),
  };
}
