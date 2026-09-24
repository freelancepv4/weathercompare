import type { Metadata } from "next";

// The favourites page is personal (stored in the visitor's browser), so it
// has nothing for search engines — keep it out of the index. It's a client
// component, so its metadata has to live here in a server layout.
export const metadata: Metadata = {
  title: "Your Saved Cities",
  robots: { index: false, follow: true },
};

export default function FavoritesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
