/* Ten provisional US-first ten-day starter routes.
 * "Best" here means a curated first set to explore, not a personalized ranking.
 * Each outline reserves arrival and departure transport/buffer days and keeps
 * demanding activities optional. Solo is the default; guides and a partner are optional.
 * Seasons are approximate. Airports, roads, permits, lodging, and current access
 * require checks before any route becomes a booking-ready plan. No departure dates
 * or user progress are stored here. IDs are validated against the public catalog and
 * the existing geographic trip clusters; entries are choices, not daily quotas.
 */
window.LIFE_TRIP_SHORTLISTS = [
  {
    "id": "ten-utah-red-rock",
    "title": "Zion, Bryce & the quieter red-rock roads",
    "days": 10,
    "scope": "USA",
    "regionIds": [
      "zion-bryce"
    ],
    "itemIds": [
      "LA-0107",
      "LA-0244",
      "LA-0245",
      "LA-0106",
      "LA-0076",
      "LA-0463",
      "LA-0413"
    ],
    "theme": "Red-rock landscapes + optional active trails",
    "season": "Approximate: spring or fall for lower-elevation walks; Bryce can be cold, and Narrows conditions vary.",
    "why": "A concentrated southern-Utah chapter with room for one active Zion goal, sunrise at Bryce, and slower sandstone scenery.",
    "outline": [
      {
        "days": "1",
        "base": "St. George (SGU) or Las Vegas (LAS) → Springdale",
        "focus": "Arrival and transport buffer. Settle near Zion and confirm current access.",
        "itemIds": []
      },
      {
        "days": "2–3",
        "base": "Springdale / Zion",
        "focus": "Explore Zion Canyon. Choose Angels Landing or a Narrows outing only if permits, conditions, preparation, and suitable support fit; easier canyon walks are equally valid.",
        "itemIds": [
          "LA-0107",
          "LA-0244",
          "LA-0245"
        ]
      },
      {
        "days": "4–5",
        "base": "Bryce Canyon area",
        "focus": "Move to Bryce for its amphitheater and a sunrise viewpoint; keep walking distances adjustable.",
        "itemIds": [
          "LA-0106",
          "LA-0076"
        ]
      },
      {
        "days": "6",
        "base": "Bryce → Torrey",
        "focus": "A slow transfer along Scenic Byway 12, with breaks and a flexible arrival.",
        "itemIds": [
          "LA-0463"
        ]
      },
      {
        "days": "7–8",
        "base": "Torrey / Capitol Reef",
        "focus": "Explore Capitol Reef through a chosen day route and quieter time in town.",
        "itemIds": [
          "LA-0413"
        ]
      },
      {
        "days": "9",
        "base": "Torrey → gateway area",
        "focus": "Return-route buffer or an easy local day, depending on the chosen airport.",
        "itemIds": []
      },
      {
        "days": "10",
        "base": "SGU or LAS",
        "focus": "Departure and transport buffer.",
        "itemIds": []
      }
    ],
    "routeNote": "Solo by default, with guides where useful and a partner optional. SGU is a closer gateway to Springdale; LAS adds a longer road leg. This outline ends its sightseeing in Torrey, so reserve the return transfer before committing. Check actual driving legs, lodging, park access, and permits; it is a starter route, not a booking-ready schedule."
  },
  {
    "id": "ten-black-hills",
    "title": "Black Hills, Badlands & a little breathing room",
    "days": 10,
    "scope": "USA",
    "regionIds": [
      "black-hills"
    ],
    "itemIds": [
      "LA-0411",
      "LA-0115",
      "LA-0121",
      "LA-0390"
    ],
    "theme": "Prairie, caves + flexible outdoor days",
    "season": "Approximate: late spring through early fall; summer heat and storms can change walking plans.",
    "why": "A regional loop with varied landscapes, a cave experience, and enough space to choose outdoor effort day by day.",
    "outline": [
      {
        "days": "1",
        "base": "Rapid City (RAP)",
        "focus": "Arrival and transport buffer; settle into the region.",
        "itemIds": []
      },
      {
        "days": "2–3",
        "base": "Badlands / Wall area",
        "focus": "Choose a few Badlands viewpoints and suitable walks, with a quiet evening and weather flexibility.",
        "itemIds": [
          "LA-0411"
        ]
      },
      {
        "days": "4–5",
        "base": "Custer / Hot Springs area",
        "focus": "Use one cave visit as an anchor: Jewel Cave or Wind Cave, according to current tour access and the kind of route you want.",
        "itemIds": [
          "LA-0115",
          "LA-0121"
        ]
      },
      {
        "days": "6",
        "base": "Black Hills base",
        "focus": "Rest, a short local walk, or a weather buffer.",
        "itemIds": []
      },
      {
        "days": "7–8",
        "base": "Northern Black Hills / Spearfish area",
        "focus": "Keep one day for a possible Devils Tower outing and one for unhurried Black Hills exploring.",
        "itemIds": [
          "LA-0390"
        ]
      },
      {
        "days": "9",
        "base": "Rapid City area",
        "focus": "Return toward the airport base; use remaining time for a small local discovery.",
        "itemIds": []
      },
      {
        "days": "10",
        "base": "Rapid City (RAP)",
        "focus": "Departure and transport buffer.",
        "itemIds": []
      }
    ],
    "routeNote": "A solo-friendly RAP loop; a partner is optional. Devils Tower is a distinct Wyoming side trip, so check the road leg from the chosen northern base before including it. Cave routes and operating tours differ in effort and availability. Confirm driving times, tour access, and overnight bases rather than treating every cave and park as compulsory."
  },
  {
    "id": "ten-colorado-rockies",
    "title": "Colorado Rockies, alpine days & a warm-water pause",
    "days": 10,
    "scope": "USA",
    "regionIds": [
      "colorado"
    ],
    "itemIds": [
      "LA-0409",
      "LA-0462",
      "LA-0189",
      "LA-0436",
      "LA-0252",
      "LA-0382"
    ],
    "theme": "Mountain walks + recovery + live culture",
    "season": "Approximate: late June–September for high roads; September may add aspen color, with snow and access varying.",
    "why": "Two mountain bases provide several days to choose hiking effort, followed by a restorative pool visit and a possible Red Rocks evening.",
    "outline": [
      {
        "days": "1",
        "base": "Denver (DEN) → Front Range",
        "focus": "Arrival and transport buffer; take the day gently.",
        "itemIds": []
      },
      {
        "days": "2–4",
        "base": "Estes Park / Rocky Mountain National Park",
        "focus": "Choose park walks that fit your preparation. Add Trail Ridge Road when its seasonal access is suitable; keep one flexible weather/rest block.",
        "itemIds": [
          "LA-0409",
          "LA-0462"
        ]
      },
      {
        "days": "5",
        "base": "Estes Park → Roaring Fork Valley",
        "focus": "Mountain transfer day with breaks and an adjustable route.",
        "itemIds": []
      },
      {
        "days": "6–7",
        "base": "Aspen / Roaring Fork Valley",
        "focus": "Explore the Maroon Bells area through an appropriate route. Aspen-color viewing is a seasonal option rather than a guaranteed sight.",
        "itemIds": [
          "LA-0189",
          "LA-0436"
        ]
      },
      {
        "days": "8",
        "base": "Glenwood Springs",
        "focus": "A slower hot-springs pool day or rest.",
        "itemIds": [
          "LA-0252"
        ]
      },
      {
        "days": "9",
        "base": "Denver / Morrison",
        "focus": "Return toward Denver; a Red Rocks visit or performance is an optional finish if access and timing work.",
        "itemIds": [
          "LA-0382"
        ]
      },
      {
        "days": "10",
        "base": "Denver (DEN)",
        "focus": "Departure and transport buffer.",
        "itemIds": []
      }
    ],
    "routeNote": "Solo by default; trail support and a partner can be added if desired. DEN supports a loop between Estes Park and the Roaring Fork Valley, with a substantial mountain transfer in the middle. Trail Ridge Road must not be assumed to be an open through-route. Check the chosen roads, park-entry arrangements, trail conditions, Maroon Bells access, and any Red Rocks event separately."
  },
  {
    "id": "ten-northern-new-mexico",
    "title": "Northern New Mexico: art, adobe & mountain air",
    "days": 10,
    "scope": "USA",
    "regionIds": [
      "new-mexico"
    ],
    "itemIds": [
      "LA-0343",
      "LA-0053",
      "LA-0057",
      "LA-0203",
      "LA-0217",
      "LA-0237",
      "LA-0280",
      "LA-0553",
      "LA-0555"
    ],
    "theme": "Living culture + hands-on food/art + gentle walks",
    "season": "Approximate: spring or fall for walking and town exploring; mountain conditions and public cultural access vary.",
    "why": "A compact set of bases balances food and making with Pueblo history and high-desert scenery.",
    "outline": [
      {
        "days": "1",
        "base": "Albuquerque (ABQ)",
        "focus": "Arrival and transport buffer; an easy evening near the chosen base.",
        "itemIds": []
      },
      {
        "days": "2",
        "base": "Albuquerque",
        "focus": "Explore Old Town and locally presented history at a comfortable pace.",
        "itemIds": [
          "LA-0343"
        ]
      },
      {
        "days": "3–5",
        "base": "Santa Fe",
        "focus": "Choose among the plaza, museums, farmers market, a chile/tortilla class, and a pottery workshop; leave room between the chosen anchors.",
        "itemIds": [
          "LA-0053",
          "LA-0057",
          "LA-0203",
          "LA-0217",
          "LA-0237"
        ]
      },
      {
        "days": "6",
        "base": "Santa Fe / Los Alamos area",
        "focus": "A Bandelier day route with effort adapted to the selected paths.",
        "itemIds": [
          "LA-0280"
        ]
      },
      {
        "days": "7–8",
        "base": "Taos area",
        "focus": "Learn from Taos Pueblo through permitted visitor access, with a possible Chimayó stop and a slower town day.",
        "itemIds": [
          "LA-0553",
          "LA-0555"
        ]
      },
      {
        "days": "9",
        "base": "Taos → Albuquerque",
        "focus": "Return transfer and rest buffer.",
        "itemIds": []
      },
      {
        "days": "10",
        "base": "Albuquerque (ABQ)",
        "focus": "Departure and transport buffer.",
        "itemIds": []
      }
    ],
    "routeNote": "A solo-friendly ABQ–Santa Fe–Taos loop, with a partner optional. Choose workshop dates after actual availability is known. Taos Pueblo and other community sites control their own visitor access and may close for community reasons. Check roads, lodging, public opening arrangements, and class bookings; every listed Santa Fe experience is a choice, not a daily checklist."
  },
  {
    "id": "ten-olympic-coast",
    "title": "Seattle & the Olympic Peninsula, slowly",
    "days": 10,
    "scope": "USA",
    "regionIds": [
      "washington"
    ],
    "itemIds": [
      "LA-0201",
      "LA-0165",
      "LA-0240",
      "LA-0403",
      "LA-0446",
      "LA-0434"
    ],
    "theme": "Forest immersion + wild coast + a city beginning",
    "season": "Approximate: late spring–early fall for broad trail choice; coastal rain and local closures remain possible.",
    "why": "A peninsula-focused Washington route gives old-growth forests and coastal walks time to feel like experiences rather than quick stops.",
    "outline": [
      {
        "days": "1",
        "base": "Seattle (SEA)",
        "focus": "Arrival and transport buffer; settle in the city.",
        "itemIds": []
      },
      {
        "days": "2–3",
        "base": "Seattle",
        "focus": "Explore Pike Place and a café neighborhood, with an optional glassblowing class.",
        "itemIds": [
          "LA-0201",
          "LA-0165",
          "LA-0240"
        ]
      },
      {
        "days": "4–5",
        "base": "Port Angeles / northern Olympic Peninsula",
        "focus": "Move to a peninsula base and choose an Olympic National Park day route suited to weather and effort.",
        "itemIds": [
          "LA-0403"
        ]
      },
      {
        "days": "6",
        "base": "Northern peninsula → western peninsula",
        "focus": "A slow transfer or weather/rest day.",
        "itemIds": []
      },
      {
        "days": "7–8",
        "base": "Forks / western Olympic Peninsula",
        "focus": "Choose a Hoh forest walk and a Ruby Beach visit when roads and conditions allow; keep distances and beach time flexible.",
        "itemIds": [
          "LA-0446",
          "LA-0434"
        ]
      },
      {
        "days": "9",
        "base": "Western peninsula → Seattle area",
        "focus": "Return-route and rest buffer, with route choice based on current roads or ferries.",
        "itemIds": []
      },
      {
        "days": "10",
        "base": "Seattle (SEA)",
        "focus": "Departure and transport buffer.",
        "itemIds": []
      }
    ],
    "routeNote": "Solo by default; a guide or partner can join specific outings. Olympic is spread across different access roads, so northern and western bases serve different days. Check road conditions, tide-aware coastal access, trail status, and any ferry timetable if using one. Drive legs and a workshop appointment need confirmation before this becomes a saved schedule."
  },
  {
    "id": "ten-oregon-coast",
    "title": "Portland, the Gorge & the north Oregon coast",
    "days": 10,
    "scope": "USA",
    "regionIds": [
      "oregon"
    ],
    "itemIds": [
      "LA-0128",
      "LA-0168",
      "LA-0266",
      "LA-0433",
      "LA-0067",
      "LA-0312",
      "LA-0306"
    ],
    "theme": "Neighborhood food + waterfalls + coastal walks",
    "season": "Approximate: late spring–early fall for longer days; rain, coast wind, and local trail access vary.",
    "why": "A Portland-and-coast route mixes ordinary neighborhood pleasures with a handful of memorable landscapes.",
    "outline": [
      {
        "days": "1",
        "base": "Portland (PDX)",
        "focus": "Arrival and transport buffer.",
        "itemIds": []
      },
      {
        "days": "2–3",
        "base": "Portland",
        "focus": "Explore food carts, independent cafés, and the Japanese Garden, choosing one neighborhood at a time.",
        "itemIds": [
          "LA-0266",
          "LA-0168",
          "LA-0128"
        ]
      },
      {
        "days": "4",
        "base": "Portland / Columbia River Gorge",
        "focus": "Choose one waterfall or Gorge walking route based on current access and the effort you want.",
        "itemIds": [
          "LA-0433"
        ]
      },
      {
        "days": "5–6",
        "base": "Cannon Beach / north coast",
        "focus": "Move to the coast for beach walks, a relaxed town day, and a weather buffer.",
        "itemIds": [
          "LA-0067"
        ]
      },
      {
        "days": "7–8",
        "base": "Newport / central coast",
        "focus": "Use Yaquina Head as an anchor. Heceta Head is an optional farther-south day choice if the actual road leg feels comfortable.",
        "itemIds": [
          "LA-0312",
          "LA-0306"
        ]
      },
      {
        "days": "9",
        "base": "Coast → Portland",
        "focus": "Return transfer and an easy final evening.",
        "itemIds": []
      },
      {
        "days": "10",
        "base": "Portland (PDX)",
        "focus": "Departure and transport buffer.",
        "itemIds": []
      }
    ],
    "routeNote": "A solo-friendly PDX loop with a partner optional. Pick coastal overnight bases before calculating the road legs; Heceta Head is farther south than Newport. Waterfall paths, beaches, and lighthouse visitor programs have different access arrangements. Confirm current routes, tides where relevant, and opening hours; the coast days can be shortened or softened without losing the trip theme."
  },
  {
    "id": "ten-western-sierra",
    "title": "Yosemite & the giant trees of the western Sierra",
    "days": 10,
    "scope": "USA",
    "regionIds": [
      "sierra"
    ],
    "itemIds": [
      "LA-0406",
      "LA-0369",
      "LA-0645",
      "LA-0247",
      "LA-0419"
    ],
    "theme": "Optional demanding hike + spacious forest days",
    "season": "Approximate: late spring–fall, depending on the chosen roads and trails; Half Dome cable access is seasonal and separately controlled.",
    "why": "Two park bases allow one ambitious hiking choice if desired, with time left for easier valley and giant-tree experiences.",
    "outline": [
      {
        "days": "1",
        "base": "Fresno (FAT) → Yosemite gateway",
        "focus": "Arrival and transport buffer; settle near the chosen park entrance.",
        "itemIds": []
      },
      {
        "days": "2–3",
        "base": "Yosemite Valley / gateway",
        "focus": "Explore the valley and a suitable waterfall or viewpoint outing, adjusting distance and weather exposure.",
        "itemIds": [
          "LA-0406",
          "LA-0369",
          "LA-0645"
        ]
      },
      {
        "days": "4",
        "base": "Yosemite base",
        "focus": "Half Dome is an optional demanding goal only with the necessary permit, preparation, conditions, and support. A gentler Yosemite day is the alternative.",
        "itemIds": [
          "LA-0247"
        ]
      },
      {
        "days": "5",
        "base": "Yosemite base",
        "focus": "Rest or weather buffer after the selected active day.",
        "itemIds": []
      },
      {
        "days": "6",
        "base": "Yosemite gateway → Three Rivers area",
        "focus": "Transfer day, with the route based on the actual entrances and roads in use.",
        "itemIds": []
      },
      {
        "days": "7–9",
        "base": "Three Rivers / Sequoia–Kings Canyon base",
        "focus": "Choose giant-tree walks and accessible viewpoints across the park areas, with quiet time between outings.",
        "itemIds": [
          "LA-0419"
        ]
      },
      {
        "days": "10",
        "base": "Fresno (FAT)",
        "focus": "Departure and transport buffer.",
        "itemIds": []
      }
    ],
    "routeNote": "Solo by default, with appropriate hiking support and a partner optional. This uses western-Sierra bases and FAT as a gateway; actual park entrances can make transfers substantial. Yosemite entry, Half Dome permits, road openings, snow, and Sequoia/Kings Canyon access need separate checks. The ambitious hike is optional, and turning 40 is not an access or ability cutoff."
  },
  {
    "id": "ten-smokies-blue-ridge",
    "title": "The Smokies & Blue Ridge, with room to wander",
    "days": 10,
    "scope": "USA",
    "regionIds": [
      "appalachian-carolinas"
    ],
    "itemIds": [
      "LA-0184",
      "LA-0075",
      "LA-0186",
      "LA-0238",
      "LA-0324"
    ],
    "theme": "Forest walks + mountain roads + Appalachian making",
    "season": "Approximate: spring or fall for cooler walks; fall color varies by elevation and year, and road sections may close.",
    "why": "A two-base Appalachian route leaves space for forest time, local craft learning, and an ordinary mountain-town day.",
    "outline": [
      {
        "days": "1",
        "base": "Knoxville (TYS) → Smokies gateway",
        "focus": "Arrival and transport buffer.",
        "itemIds": []
      },
      {
        "days": "2–4",
        "base": "Gatlinburg / Smokies gateway",
        "focus": "Choose suitable Great Smoky Mountains walks and a Kuwohi viewpoint outing when its road access works; keep one flexible weather/rest block.",
        "itemIds": [
          "LA-0184",
          "LA-0075"
        ]
      },
      {
        "days": "5",
        "base": "Smokies gateway → Asheville",
        "focus": "Transfer day with stops chosen from the road sections actually open.",
        "itemIds": []
      },
      {
        "days": "6–8",
        "base": "Asheville / Blue Ridge base",
        "focus": "Choose a manageable Blue Ridge Parkway section and one hands-on craft or fiddle/banjo introduction, with time to explore locally.",
        "itemIds": [
          "LA-0186",
          "LA-0238",
          "LA-0324"
        ]
      },
      {
        "days": "9",
        "base": "Asheville area",
        "focus": "Easy local day or onward-airport transfer buffer.",
        "itemIds": []
      },
      {
        "days": "10",
        "base": "Asheville (AVL), or return to TYS",
        "focus": "Departure and transport buffer, according to the confirmed transport plan.",
        "itemIds": []
      }
    ],
    "routeNote": "Solo-friendly, with teachers or guides for the activities you choose and a partner optional. TYS arrival and AVL departure may reduce backtracking if flight and vehicle arrangements work; a TYS loop needs a deliberate return leg. Check Blue Ridge Parkway sections by current road status, park access, and workshop availability. One chosen Parkway sector is the road experience, not an assumption that the whole route fits."
  },
  {
    "id": "ten-new-england-fall",
    "title": "New England fall: White Mountains & Vermont towns",
    "days": 10,
    "scope": "USA",
    "regionIds": [
      "boston-new-england"
    ],
    "itemIds": [
      "LA-0049",
      "LA-0188",
      "LA-0363",
      "LA-0191",
      "LA-0360",
      "LA-0490"
    ],
    "theme": "Autumn landscapes + adjustable mountain effort",
    "season": "Approximate: late September–October; peak color changes with elevation, latitude, and weather rather than following a fixed date.",
    "why": "A focused northern-New-England route offers a different pace for autumn towns and mountain scenery, including places that could be meaningful revisits.",
    "outline": [
      {
        "days": "1",
        "base": "Boston (BOS)",
        "focus": "Arrival and transport buffer.",
        "itemIds": []
      },
      {
        "days": "2",
        "base": "Boston",
        "focus": "An easy Beacon Hill and neighborhood day before the mountain transfer.",
        "itemIds": [
          "LA-0049"
        ]
      },
      {
        "days": "3–5",
        "base": "Conway / White Mountains",
        "focus": "Explore Kancamagus Highway and choose suitable mountain walks. A Mount Washington outing is optional and highly weather-dependent; the access method changes the effort.",
        "itemIds": [
          "LA-0188",
          "LA-0363"
        ]
      },
      {
        "days": "6",
        "base": "White Mountains → Stowe area",
        "focus": "Transfer and rest buffer through a chosen route.",
        "itemIds": []
      },
      {
        "days": "7–8",
        "base": "Stowe / northern Vermont",
        "focus": "Explore Route 100 towns and autumn scenery with room to stop where the conditions look best.",
        "itemIds": [
          "LA-0191",
          "LA-0360",
          "LA-0490"
        ]
      },
      {
        "days": "9",
        "base": "Vermont base or return toward Boston",
        "focus": "A flexible local day if departing from Burlington, or a reserved return transfer for a Boston loop.",
        "itemIds": []
      },
      {
        "days": "10",
        "base": "Burlington (BTV) or Boston (BOS)",
        "focus": "Departure and transport buffer.",
        "itemIds": []
      }
    ],
    "routeNote": "Solo by default, with a partner optional. BOS arrival and BTV departure are a possible one-way structure only if actual flights and vehicle arrangements work; otherwise use day 9 for the Boston return. Check local roads, mountain access, lodging, and the chosen walking conditions. This is a foliage-season starter outline, not a promise of peak color or a claim that previously visited places are unfinished."
  },
  {
    "id": "ten-south-florida",
    "title": "Miami, the Everglades & a slower Keys chapter",
    "days": 10,
    "scope": "USA",
    "regionIds": [
      "south-florida"
    ],
    "itemIds": [
      "LA-0347",
      "LA-0220",
      "LA-0678",
      "LA-0476",
      "LA-0640",
      "LA-0332",
      "LA-0088"
    ],
    "theme": "City culture + wetlands + optional water skills",
    "season": "Approximate: the cooler, drier winter-to-spring period; marine conditions, storms, and wildlife access still vary.",
    "why": "A south-Florida corridor combines a city beginning with wetland learning and a few days to enjoy the water at your own skill level.",
    "outline": [
      {
        "days": "1",
        "base": "Miami (MIA) or Fort Lauderdale (FLL)",
        "focus": "Arrival and transport buffer; settle in the selected city base.",
        "itemIds": []
      },
      {
        "days": "2–3",
        "base": "Miami / Coral Gables",
        "focus": "Choose neighborhood culture and the tropical botanical garden, with an easy pace between city outings.",
        "itemIds": [
          "LA-0347",
          "LA-0220"
        ]
      },
      {
        "days": "4",
        "base": "Homestead / Everglades gateway",
        "focus": "Choose one appropriate Everglades visitor area or guided nature outing.",
        "itemIds": [
          "LA-0678"
        ]
      },
      {
        "days": "5–6",
        "base": "Key Largo / upper Keys",
        "focus": "Explore the marine environment around John Pennekamp and consider a guided beginner snorkel-skills session when conditions and comfort fit.",
        "itemIds": [
          "LA-0476",
          "LA-0640"
        ]
      },
      {
        "days": "7–8",
        "base": "Islamorada or lower Keys",
        "focus": "Choose a Keys base for slower coastal days. Key West and Mallory Square are optional if the farther-south transfer belongs in your route.",
        "itemIds": [
          "LA-0332",
          "LA-0088"
        ]
      },
      {
        "days": "9",
        "base": "Keys base or return toward Miami",
        "focus": "Rest/weather buffer or the deliberate mainland return transfer.",
        "itemIds": []
      },
      {
        "days": "10",
        "base": "Key West (EYW), MIA, or FLL",
        "focus": "Departure and transport buffer, using the transport arrangements actually confirmed.",
        "itemIds": []
      }
    ],
    "routeNote": "Solo-friendly; guided water activities fit a solo trip, and a partner is optional. A MIA/FLL–EYW one-way structure is conditional on workable flights and vehicle arrangements. Key Largo and Key West are different bases separated by a long Keys road corridor; decide how far south to go before booking. Check marine forecasts, permitted visitor access, driving legs, and snorkel instruction; no wildlife sighting or boat departure is guaranteed."
  }
];
