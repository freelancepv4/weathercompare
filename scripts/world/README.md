# World city dataset (lib/data/world.json + lib/data/climate-world.json)

The 1,686 world cities (220 countries) that sit alongside the ~140 curated
cities in `config/countries.ts`. Together they produce ~206,000 URLs
(1,825 cities × city page + best-time guide + 12 month pages, in 8 languages).

## How the cities were chosen (`build-world.mjs`)
- Source: GeoNames via the `all-the-cities` and `cities.json` npm packages.
- Every country's capital first, then cities by population, weighted towards
  the markets that send traffic: **Spain first** (every free grid cell, ~200
  cities), Spanish-speaking Latin America, Europe, then big holiday markets.
- ~1,300 named holiday destinations (`tourist.mjs`) are boosted so resorts
  such as Tulum, Sorrento or Zermatt beat bigger but less-searched towns.
- **One city per NASA POWER grid cell (0.5° × 0.625°) and ≥25 km apart**, so
  no two pages share the same climate numbers (no duplicate content).
- Excluded: city districts (PPLX), known-bogus GeoNames records.

## Names (`finalize.mjs`)
- English name + 8 translations (it, de, fr, es, pt, nl, pl, tr) from Wikidata
  (via the GeoNames ID), cleaned (no "Ville de …", no municipality labels).
- Slugs are unique site-wide; a clash gets the country appended
  (`valencia-venezuela`, `leon-mexico`).

## Climate
NASA POWER daily data 2011–2020 (T2M_MAX, T2M_MIN, PRECTOTCORR, RH2M,
CLOUD_AMT), averaged per calendar month — the same method as
`scripts/fetch-climate.mjs`. World cities whose numbers came out identical to
another page's (same grid cell as a curated city, e.g. Monaco/Nice) keep only
their forecast page: no month or best-time pages.

## Re-running
The pipeline needs GeoNames/Wikidata/NASA access (it was run through a
browser, since NASA and Wikidata allow cross-origin requests):
1. `node build-world.mjs` → world-pick.json (selection)
2. fetch Wikidata labels → wd.txt / countries.txt, NASA climate → climate.txt
3. `node finalize.mjs` → writes lib/data/world.json and climate-world.json
