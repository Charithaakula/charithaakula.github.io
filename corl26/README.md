# CoRL research atlas

The atlas is a static site. Research data is separate from the page renderer. The Research Guide presents two illustrated chapters: execution, and learning/improvement. All 14 original research topics remain as expandable component notes with stable anchors. The library provides summaries, source links and a compact details table.

Run `python3 corl26/build.py` from the repository root to rebuild the knowledge-map landing page, panel page and source library . Python's standard library is sufficient. Preview through an HTTP server; inline transcripts use local fetches.

## Sources

- `data/talks.json`: 87 recorded entries, source-based research notes, corrected segment starts, original chapter starts and bounded transcripts.
- `data/guide-components.json`: the two chapters, original figure paths, component disclosures, curated reading routes and qualified figure source keys.
- `data/diagram-references.json`: November 25 primary-manuscript notes for AMP1, RAX and the Astra/RoboMME monitor, with reading scope and limitations.
- `assets/robot_architectures.png`, `assets/robot_learning.png`: unmodified original diagrams. `guide.js` adds enlargement, zoom and full-resolution downloads.
- `data/visual-notes.json`: source-specific takeaways. These are editorial summaries, rather than attributed speaker quotations.
- `data/knowledge.json`: topic groups, transcript evidence, primary references and speaker notes.
- `data/paper-reading.json`: additional primary-paper reviews, each with its reading depth and limitations.
- `data/proceedings.json`: every entry in the accessible 687-paper main catalogue. Its attribution distinguishes the secondary catalogue from final official acceptance verification. Briefs are short source excerpts; use the primary links for the manuscripts.
- `data/workshop-papers.json`: the official 32-workshop directory and 484 published paper listings from organizer pages. Per-workshop records identify complete and incomplete lists.
- `data/coverage.json`: coverage boundaries and remaining source acquisition tasks.
- `data/timestamp-audit.json`: the timing audit. Caption alignment is separate from audiovisual verification.
- `transcripts/`: the original supplied day transcripts and generated talk excerpts.

`data/atlas-graph.json` collects the topic groups and source index, without cross-topic dependency edges. The main/workshop manifests contain further paper metadata.

## Maintaining the guide

Update source notes and references in the data files, then rebuild. Preserve the original diagram pixels and qualify source-specific implementation claims; do not infer scientific dependencies from reading links. Review video boundaries against playback before changing their verification status. Publishing remains a separate action.

The previous map template and its illustrations remain in `templates/field-map.html` for source provenance. The current guide is rendered by `research_guide()` in `build.py`, with `guide.css` and `guide.js`. The second-tab AI-Synthesized Research Panels page keeps the original six questions and three perspectives, with `data/panel-synthesis.json` providing the separate editorial synthesis. The library has no diagrams or checkpoint feature.

Focused primary reviews are in `data/research-world.json`, `research-data.json`, `research-agentic.json`, and `research-deployment.json`. They preserve detailed source summaries, compact table fields, limitations, reading depth, and placement within the existing six perspectives panels. Only verified paper-to-recording matches are presented as original recordings.

The CoRL landing page is the two-loop Research Guide. `/field-map/` mirrors it for compatibility; `/panels/` contains the six comparisons, and legacy topic, `#panels` and `#panel-N` bookmarks remain supported. A shared `theme.css` keeps all page surfaces dark; original figure pixels retain their supplied colors. Profile imagery, biography and social links are removed from the guide; its homepage navigation link remains. Day transcripts and individual excerpts remain directly downloadable; a bundled export should not be labeled sharing-verified without documented source permissions.
