import { MetadataRoute } from "next";

const BASE_URL = "https://mestizzo-studio.vercel.app";

const CASE_SLUGS = [
  "identidad-norte",
  "ecommerce-palma",
  "ai-operaciones-vertex",
  "web-boutique-sirka",
  "film-atlas",
  "3d-producto-manuk",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const caseStudies: MetadataRoute.Sitemap = CASE_SLUGS.map((slug) => ({
    url: `${BASE_URL}/trabajo/${slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/trabajo`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/servicios`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/estudio`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    ...caseStudies,
  ];
}
