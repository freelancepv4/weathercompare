import { SITEMAP_FILES, sitemapGroups, urlsetXml } from "@/lib/sitemapEntries";

/** /sitemaps/{file}.xml — one language's pages, or its month pages (see app/sitemap.xml/route.ts). */
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return SITEMAP_FILES.map((g) => ({ file: `${g}.xml` }));
}

export async function GET(_req: Request, props: { params: Promise<{ file: string }> }) {
  const params = await props.params;
  const group = params.file.replace(/\.xml$/, "");
  if (!SITEMAP_FILES.includes(group)) return new Response("Not found", { status: 404 });
  return new Response(urlsetXml(sitemapGroups()[group] ?? []), {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
