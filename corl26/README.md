# CoRL research atlas

The atlas is a static site. Research data is separate from the page templates. The map preserves the original 14-topic design; the library provides summaries, source links and a compact details table.

Run `python3 corl26/build.py` from the repository root to rebuild the knowledge-map landing page, panel page and source library . Python's standard library is sufficient. Preview through an HTTP server; inline transcripts use local fetches.

## Sources

- `data/talks.json`: 87 recorded entries, source-based research notes, corrected segment starts, original chapter starts and bounded transcripts.
- `data/visual-notes.json`: source-specific takeaways and diagram flows. These are editorial summaries, rather than attributed speaker quotations.
- `data/knowledge.json`: topic groups, transcript evidence, primary references and speaker notes.
- `data/paper-reading.json`: additional primary-paper reviews, each with its reading depth and limitations.
- `data/proceedings.json`: every entry in the accessible 687-paper main catalogue. Its attribution distinguishes the secondary catalogue from final official acceptance verification. Briefs are short source excerpts; use the primary links for the manuscripts.
- `data/workshop-papers.json`: the official 32-workshop directory and 484 published paper listings from organizer pages. Per-workshop records identify complete and incomplete lists.
- `data/coverage.json`: coverage boundaries and remaining source acquisition tasks.
- `data/timestamp-audit.json`: the timing audit. Caption alignment is separate from audiovisual verification.
- `transcripts/`: the original supplied day transcripts and generated talk excerpts.

`data/atlas-graph.json` collects the topic groups and source index, without cross-topic dependency edges. The main/workshop manifests contain further paper metadata.

## Maintaining the guide

Update source notes and references in the data files, then rebuild. Keep the original map design and source-specific illustrations within topics; do not infer cross-topic dependencies. Review video boundaries against playback before changing their verification status. Publishing remains a separate action.

`templates/field-map.html` preserves the original map layout and diagrams; `map.js` opens its topic details and `map.css` supplies the popup styling. The second-tab panel page keeps the original six questions and three perspectives, with `data/panel-synthesis.json` providing our separate editorial synthesis. The library has no diagrams or checkpoint feature.

Focused primary reviews are in `data/research-world.json`, `research-data.json`, `research-agentic.json`, and `research-deployment.json`. They preserve detailed source summaries, compact table fields, limitations, reading depth, and placement within the existing six perspectives panels. Only verified paper-to-recording matches are presented as original recordings.

The CoRL landing page is the knowledge map. `/field-map/` remains available; `/panels/` contains the six comparisons, and legacy `#panels`/`#panel-N` bookmarks redirect there. A shared `theme.css` keeps all pages and pop-ups dark. Profile imagery, biography and social links are removed from the guide; its homepage navigation link remains.
