import Image from "next/image";
import type { CityPhoto } from "@/lib/providers/photos";

/**
 * Wide hero photo + photographer credit, used at the top of weather and
 * guide pages. Renders nothing when no photo was found (no PEXELS_API_KEY
 * set, the request failed, network unavailable at build time, etc.) — see
 * lib/providers/photos.ts — so a page never breaks or shows a broken image
 * just because a photo wasn't available.
 */
export function HeroPhoto({ photo, priority = false }: { photo: CityPhoto | null; priority?: boolean }) {
  if (!photo) return null;
  return (
    <figure className="mb-6">
      <div
        className="relative aspect-[16/9] w-full overflow-hidden rounded-xl3"
        style={{ backgroundColor: photo.avgColor }}
      >
        <Image
          src={photo.url}
          alt={photo.alt}
          fill
          priority={priority}
          className="object-cover"
          sizes="(min-width: 1024px) 960px, 100vw"
        />
      </div>
      <figcaption className="mt-1.5 text-right text-[11px] text-slate-500 dark:text-slate-400">
        Photo by{" "}
        <a
          href={`${photo.photographerUrl}?utm_source=weathercompare&utm_medium=referral`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-brand-600 hover:underline"
        >
          {photo.photographer}
        </a>{" "}
        on{" "}
        <a
          href="https://www.pexels.com?utm_source=weathercompare&utm_medium=referral"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-brand-600 hover:underline"
        >
          Pexels
        </a>
      </figcaption>
    </figure>
  );
}
