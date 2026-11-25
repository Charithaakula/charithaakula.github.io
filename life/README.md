# life, fully.

A separate scrapbook and tracker for **/life/** on the personal GitHub Pages site. It is not linked from the homepage. Plain HTML, CSS, and JavaScript run directly on GitHub Pages with no build step or backend.

The public catalog contains 1,824 ideas: 1,353 entries consolidated from the original 1,362-row index, plus 471 suggested additions. Original descriptions and categories remain represented; repeated destinations keep their different angles. All new suggestions need detail and access verification. The collection is intentionally open-ended.

The page includes vision boards, search and filters, individual experience tracking, 99 cuisine families with tasting counts, a visited-place journal, undated solo-first plan drafts, color themes, custom ideas, and optional photo links. Visiting a city never automatically completes all its experiences. Cuisine history starts untracked.

## Geographic planning and the full list

**Trip map** loads all located US and world ideas together. Blue marks places, red marks activities, green marks food, and purple marks everyday or creative experiences. Toggle kinds, search, narrow a country or region, and collect selected ideas into a trip bucket. The day choice describes the bucket’s time budget; it does not silently hide destinations. The opening viewport favors the US, while the world-view control reveals the rest of the loaded locations.

Leaflet and MarkerCluster are bundled locally with their licenses. OpenStreetMap supplies the background tiles and attribution. Wheel/trackpad, double-click, and touch zoom work through the map library. Clicking clusters zooms in; shared city or country coordinates can fan apart at close zoom so each real catalog record can be opened. Points identify a place, city, or country area rather than an assumed venue entrance. The visible unplaced list retains generic or ambiguous ideas without inventing a home location. The previous Census-derived, ISC-licensed US outline is available as an offline fallback.

The geographic collection still has 45 US trip areas with bases, airport starting points, seasonal context, and route notes. These help organize candidates; some contain alternative bases and should not be treated as one short itinerary covering everything. Driving times and booking access are checked when a draft becomes a chosen route.

**Plans** compares 16 Bay Area trip families through 32 four-/ten-day variants. Four-day options use one base with outbound/return buffers; longer outlines add bases, transfers, and rest. The map preview, daily timeline, and travel allowances are planning context rather than live estimates. Geographic matching from a map area suggests presets that overlap those ideas; an area without a preset stays a custom-bucket task. A saved draft keeps its route ID in the public progress snapshot without publishing private notes or dates.

Each curated dream board previews a few items and opens its full matching collection. New matching ideas join automatically. Custom boards keep their explicitly selected items.

**Full list / CSV** reads `data/catalog.csv` directly into a sortable, searchable table. It includes all public catalog fields, trip-cluster names where available, optional device-local status, and 100/250/All row choices. Public and filtered downloads exclude private journal fields. A file-protocol preview falls back to the built-in catalog because browsers restrict local fetches.

After editing the catalog or geographic assignments, regenerate the CSV:

```sh
python3 life/tools/export_catalog.py
```

## Keep progress on GitHub

`data/catalog.js`, `data/cuisines.js`, and `data/seeds.js` hold the public library and starting context. `data/progress.js` is the publishable progress snapshot.

Browser changes save on the current device. **Save for GitHub** downloads a new `progress.js`; replace `life/data/progress.js` with that file, review the diff, and commit it. This makes the published snapshot available on a new device. Existing device edits remain local until imported or explicitly updated; there is no automatic account sync.

The publishable snapshot excludes private settings, private journal notes, photo URLs, and specific travel dates. It includes public goal states, cuisine counts, custom idea titles, board selections, visit labels, and undated plan outlines. Review the generated file before publishing anything personal.

**Export backup** saves the full journal as JSON, including private fields. Keep that in a private repository or personal backup location. **Import** restores a full backup. The local `.gitignore` excludes backup/state JSON and `private/` and `exports/` folders.

Public GitHub Pages content can be read by anyone with the URL. An unlinked page is still public. A private Git repository does not by itself guarantee a private Pages site; use an authenticated host if private access becomes a requirement.

## Planning preferences

The starting lens is US-first, solo travel with a partner optional, nearby afternoons and short domestic breaks, and occasional longer trips. The “before 40” board is a personal prioritization horizon. Effort labels concern the selected activity, terrain, training, and support; they are not medical assessments or claims that a destination expires at a certain age.

The plan templates are deliberately undated. India’s ten-day template does not assume an additional Asia stop fits within the same ten days. Work flexibility, transport, budget, season, entry requirements, and individual access should be supplied when a real itinerary is chosen. A guided activity can be part of a solo trip; activities that inherently involve other people are labeled separately from travel companions.

## Extend the collection

An agent can edit the structured records directly in `data/`. Keep IDs stable and avoid reusing removed IDs. Search the title and location before adding a record; distinct activities in one place can remain separate. Use blank or unknown metadata when details have not been checked. Add a specific dish, a small everyday experience, or a completed skill alongside larger destinations.

New ideas and boards can also be created in the page and exported to the repository snapshot. Photos currently use optional HTTPS links. A future private photo store can be added without changing the stable experience IDs.

## Preview

From the repository root:

```sh
python3 -m http.server 8765
```

Open `http://127.0.0.1:8765/life/`. Existing preview servers can serve the page immediately. Deploy by committing the `life/` files and pushing to the branch configured for GitHub Pages.

## References for discovery

- [BucketListly](https://www.bucketlistly.blog/): solo travel and photographic travel storytelling.
- [Day Zero Project](https://dayzeroproject.com/): personal lists and recorded progress; this site does not impose its 1,001-day deadline.
- [Atlas Obscura](https://www.atlasobscura.com/): unusual places and local discoveries.
- [TasteAtlas](https://www.tasteatlas.com/): regional food discovery; rankings are not treated as personal priorities.
- [UNESCO World Heritage](https://whc.unesco.org/en/list/) and [living heritage](https://ich.unesco.org/en/lists): places and cultural practices.

The original spreadsheet remains unchanged. A separate master workbook preserves a text-value archive of all 14 original tabs. Spreadsheet source links are excluded from the public catalog.

## Close references and sharing

Official product pages confirm related workflows: [Wanderlog](https://wanderlog.com/) combines maps and itineraries; [Mapstr](https://en.mapstr.com/fonctionnalites/preparer-un-voyage) organizes saved food/places with tags and tracking; [Visited](https://visitedapp.com/) has themed experience lists and maps; [Day Zero](https://dayzeroproject.com/) covers broader life goals and progress. These are references for a personal build, not evidence of a first-of-its-kind claim. A social post can show the collect → filter → bucket → plan → remember workflow after a public demo is published. No social post is sent by this static site.
