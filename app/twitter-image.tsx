// Twitter/X card image — reuses the same generated design as
// opengraph-image.tsx. Next.js's `opengraph-image` convention is usually
// picked up for Twitter cards too, but shipping this file explicitly makes
// sure it isn't left blank on any Next.js version/config where it isn't.
export { default, alt, size, contentType } from "./opengraph-image";
