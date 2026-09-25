import { SITEMAP_GROUPS, sitemapGroups, urlsetXml, type SitemapGroup } from "@/lib/sitemapEntries";

/** /sitemaps/{lang}.xml — one language's URLs (see app/sitemap.xml/route.ts). */
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return SITEMAP_GROUPS.map((g) => ({ file: `${g}.xml` }));
}

export function GET(_req: Request, { params }: { params: { file: string } }) {
  const group = params.file.replace(/\.xml$/, "") as SitemapGroup;
  if (!SITEMAP_GROUPS.includes(group)) return new Response("Not found", { status: 404 });
  return new Response(urlsetXml(sitemapGroups()[group]), {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
