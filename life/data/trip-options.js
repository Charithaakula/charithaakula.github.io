/* Bay Area trip-family comparison: 16 provisional families, each with four-day
 * and ten-day variants. These are curated starting options, not universal rankings.
 * Door-to-door hour ranges are approximate planning assumptions, NOT live flight
 * or current drive estimates. They include home/airport access, check-in, flights
 * or connections, bags/vehicles, and destination transfers where relevant. Actual
 * schedules, traffic, weather, and access can require more time or a longer trip.
 * The first and last days are travel buffers. Four-day options use one compact
 * base; ten-day options add selected nearby sectors, transfers, and rest blocks.
 * Item IDs are choices, not a daily quota. No dates, budgets, or user progress
 * are stored here. Solo is the default; activity-specific guides and a partner
 * are optional. Effort is contextual rather than a before-40 medical cutoff.
 */
window.LIFE_TRIP_OPTIONS = [
  {
    "id": "sierra-from-bay",
    "title": "The Sierra from home",
    "regionIds": [
      "sierra"
    ],
    "scope": "USA",
    "season": "Approximate: late spring–fall, according to road, trail, and park access. Half Dome cable access is separately seasonal.",
    "theme": "Valley walks, optional demanding hiking, and giant trees",
    "why": "Driving avoids airport logistics; the longer version gives an ambitious Yosemite choice a recovery day and adds a second park base.",
    "variants": [
      {
        "id": "sierra-4",
        "days": 4,
        "title": "Four days in one Yosemite base",
        "mode": "drive",
        "departure": "BayArea",
        "gateways": [],
        "travelAllowance": {
          "outbound": "Approximate planning allowance: Reserve roughly 5–9 hours from the Bay Area to the chosen Yosemite gateway, including breaks and entry delays.",
          "basis": "planningassumption",
          "return": "Approximate planning allowance: Reserve roughly 5–9 hours from that gateway back home; traffic and route choice can make it longer."
        },
        "baseLabels": [
          "Yosemite gateway / valley"
        ],
        "itemIds": [
          "LA-0406",
          "LA-0369",
          "LA-0645"
        ],
        "outline": [
          {
            "day": 1,
            "base": "Bay Area → Yosemite gateway",
            "kind": "travel",
            "focus": "Outbound drive and arrival buffer; choose the entrance and lodging first.",
            "itemIds": []
          },
          {
            "day": 2,
            "base": "Yosemite base",
            "kind": "explore",
            "focus": "Choose valley walks and viewpoints at the distance you enjoy.",
            "itemIds": [
              "LA-0406",
              "LA-0369"
            ]
          },
          {
            "day": 3,
            "base": "Yosemite base",
            "kind": "explore",
            "focus": "A waterfall outing or a shorter valley day, with room for weather and rest.",
            "itemIds": [
              "LA-0645"
            ]
          },
          {
            "day": 4,
            "base": "Yosemite gateway → Bay Area",
            "kind": "travel",
            "focus": "Return-drive buffer; keep the day flexible.",
            "itemIds": []
          }
        ],
        "routeNote": "Use one Yosemite base for the whole break. Entrance roads, lodging location, traffic, and current park-entry arrangements determine the drive.",
        "fitnessNote": "Keep the four-day version focused on adjustable valley outings. A demanding Half Dome goal has more recovery room in the ten-day option.",
        "coverageNote": "A Yosemite sample with two full local days; other Sierra parks remain future choices."
      },
      {
        "id": "sierra-10",
        "days": 10,
        "title": "Yosemite and the western Sierra",
        "mode": "drive",
        "departure": "BayArea",
        "gateways": [],
        "travelAllowance": {
          "outbound": "Approximate planning allowance: Reserve roughly 5–9 hours for the Bay Area → Yosemite gateway drive and arrival.",
          "basis": "planningassumption",
          "return": "Approximate planning allowance: Reserve roughly 6–10 hours for the Three Rivers / western-Sierra → Bay Area drive, including breaks."
        },
        "baseLabels": [
          "Yosemite gateway / valley",
          "Three Rivers / Sequoia–Kings Canyon"
        ],
        "itemIds": [
          "LA-0406",
          "LA-0369",
          "LA-0645",
          "LA-0247",
          "LA-0419",
          "LA-0111"
        ],
        "outline": [
          {
            "day": 1,
            "base": "Bay Area → Yosemite gateway",
            "kind": "travel",
            "focus": "Outbound drive and settling-in buffer.",
            "itemIds": []
          },
          {
            "day": 2,
            "base": "Yosemite base",
            "kind": "explore",
            "focus": "Explore the valley at a gentle pace.",
            "itemIds": [
              "LA-0406",
              "LA-0369"
            ]
          },
          {
            "day": 3,
            "base": "Yosemite base",
            "kind": "explore",
            "focus": "Choose a suitable Yosemite Falls outing; conditions change the route.",
            "itemIds": [
              "LA-0645"
            ]
          },
          {
            "day": 4,
            "base": "Yosemite base",
            "kind": "explore",
            "focus": "Half Dome is an optional demanding choice with permit, preparation, conditions, and appropriate support; a gentler park day can replace it.",
            "itemIds": [
              "LA-0247"
            ]
          },
          {
            "day": 5,
            "base": "Yosemite base",
            "kind": "rest",
            "focus": "Recovery or weather buffer after the selected active day.",
            "itemIds": []
          },
          {
            "day": 6,
            "base": "Yosemite gateway → Three Rivers",
            "kind": "transfer",
            "focus": "Move between western-Sierra bases with breaks; use roads currently open.",
            "itemIds": []
          },
          {
            "day": 7,
            "base": "Sequoia / Kings Canyon base",
            "kind": "explore",
            "focus": "Choose a giant-tree walk and one park area.",
            "itemIds": [
              "LA-0419"
            ]
          },
          {
            "day": 8,
            "base": "Sequoia / Kings Canyon base",
            "kind": "explore",
            "focus": "Explore another suitable giant-tree or canyon route.",
            "itemIds": [
              "LA-0111"
            ]
          },
          {
            "day": 9,
            "base": "Three Rivers base",
            "kind": "rest",
            "focus": "An easy day, a short optional walk, or a weather buffer.",
            "itemIds": []
          },
          {
            "day": 10,
            "base": "Three Rivers → Bay Area",
            "kind": "travel",
            "focus": "Return drive with a full travel buffer.",
            "itemIds": []
          }
        ],
        "routeNote": "This is a western-Sierra route. Actual park entrances make the Yosemite-to-Three Rivers transfer substantial; verify road openings, permits, and lodging before committing.",
        "fitnessNote": "Half Dome is optional and demanding; the recovery day is deliberate. Route choice and support determine effort, not an age cutoff.",
        "coverageNote": "Adds Sequoia/Kings Canyon and more space around Yosemite; the eastern Sierra and Tahoe need their own route."
      }
    ]
  },
  {
    "id": "central-coast-drive",
    "title": "Monterey, Carmel & the Central Coast",
    "regionIds": [
      "central-coast"
    ],
    "scope": "USA",
    "season": "Approximate: town/coast outings are possible much of the year; marine weather and olive-harvest timing need separate checks.",
    "theme": "Marine learning, coastal town time, and hands-on local experiences",
    "why": "A short drive supports two local Monterey days. Ten days can continue down a chosen inland-supported coastal corridor.",
    "variants": [
      {
        "id": "central-coast-4",
        "days": 4,
        "title": "Monterey and Carmel, one coastal base",
        "mode": "drive",
        "departure": "BayArea",
        "gateways": [],
        "travelAllowance": {
          "outbound": "Approximate planning allowance: Reserve roughly 2–5 hours from the South Bay / Bay Area to the selected Monterey-area base, including breaks and traffic.",
          "basis": "planningassumption",
          "return": "Approximate planning allowance: Reserve roughly 2–5 hours back to the Bay Area; congestion and route choice can make it longer."
        },
        "baseLabels": [
          "Monterey / Carmel"
        ],
        "itemIds": [
          "LA-0358",
          "LA-0664",
          "LA-0639"
        ],
        "outline": [
          {
            "day": 1,
            "base": "Bay Area → Monterey area",
            "kind": "travel",
            "focus": "Outbound drive and settling-in buffer; use the road route actually open.",
            "itemIds": []
          },
          {
            "day": 2,
            "base": "Monterey base",
            "kind": "explore",
            "focus": "Choose an aquarium and marine-ecology day, with time for ordinary town life.",
            "itemIds": [
              "LA-0358"
            ]
          },
          {
            "day": 3,
            "base": "Monterey base",
            "kind": "explore",
            "focus": "A whale-watching outing is optional and weather-dependent; a beach-cleanup program is another optional local choice if one is operating.",
            "itemIds": [
              "LA-0664",
              "LA-0639"
            ]
          },
          {
            "day": 4,
            "base": "Monterey area → Bay Area",
            "kind": "travel",
            "focus": "Return-drive buffer and an easy finish.",
            "itemIds": []
          }
        ],
        "routeNote": "Use one Monterey/Carmel base. Inland approaches can support the trip when coastal roads are restricted; confirm the actual route, venue access, and any boat or community-program appointment. A Big Sur through-drive is not assumed.",
        "fitnessNote": "Coast walking and museum time can stay gentle. Boats and volunteer activities are optional; choose the amount of movement that feels useful.",
        "coverageNote": "Two local days around Monterey. This does not automatically complete the Big Sur coast or other Central Coast areas."
      },
      {
        "id": "central-coast-10",
        "days": 10,
        "title": "Monterey to Santa Barbara, with inland road choices",
        "mode": "drive",
        "departure": "BayArea",
        "gateways": [],
        "travelAllowance": {
          "outbound": "Approximate planning allowance: Reserve roughly 2–5 hours for the Bay Area → Monterey-area drive and arrival.",
          "basis": "planningassumption",
          "return": "Approximate planning allowance: Reserve roughly 6–11 hours for Santa Barbara → Bay Area, including road breaks; conditions can require more time."
        },
        "baseLabels": [
          "Monterey / Carmel",
          "Paso Robles / central-coast base",
          "Santa Barbara"
        ],
        "itemIds": [
          "LA-0358",
          "LA-0664",
          "LA-0196",
          "LA-0531",
          "LA-0009"
        ],
        "outline": [
          {
            "day": 1,
            "base": "Bay Area → Monterey area",
            "kind": "travel",
            "focus": "Outbound drive and arrival buffer.",
            "itemIds": []
          },
          {
            "day": 2,
            "base": "Monterey base",
            "kind": "explore",
            "focus": "Choose aquarium and marine-ecology learning.",
            "itemIds": [
              "LA-0358"
            ]
          },
          {
            "day": 3,
            "base": "Monterey base",
            "kind": "explore",
            "focus": "Choose a suitable whale-watching outing if current sea conditions and operations fit.",
            "itemIds": [
              "LA-0664"
            ]
          },
          {
            "day": 4,
            "base": "Monterey / Carmel base",
            "kind": "rest",
            "focus": "A slow town/coast day or weather buffer.",
            "itemIds": []
          },
          {
            "day": 5,
            "base": "Monterey area → Paso Robles / central coast",
            "kind": "transfer",
            "focus": "Use a deliberate transfer day, with inland US 101 as one route structure to check.",
            "itemIds": []
          },
          {
            "day": 6,
            "base": "Central-coast base",
            "kind": "explore",
            "focus": "An olive-harvest or mill visit is a seasonal, provider-dependent option; town time can replace it.",
            "itemIds": [
              "LA-0196"
            ]
          },
          {
            "day": 7,
            "base": "Central coast → Santa Barbara",
            "kind": "transfer",
            "focus": "Move toward Santa Barbara; a Solvang main-street stop is optional if the chosen road route fits.",
            "itemIds": [
              "LA-0531"
            ]
          },
          {
            "day": 8,
            "base": "Santa Barbara base",
            "kind": "explore",
            "focus": "An instructor-led glider introduction is optional and weather-dependent.",
            "itemIds": [
              "LA-0009"
            ]
          },
          {
            "day": 9,
            "base": "Santa Barbara base",
            "kind": "rest",
            "focus": "A slower local day or weather/recovery buffer.",
            "itemIds": []
          },
          {
            "day": 10,
            "base": "Santa Barbara → Bay Area",
            "kind": "travel",
            "focus": "Reserve the full return-drive block and road breaks.",
            "itemIds": []
          }
        ],
        "routeNote": "The connected route can use inland highways instead of relying on an open Highway 1 through Big Sur. Check actual roads and each side outing separately. Olive visits, boats, and flight instruction need confirmed operations.",
        "fitnessNote": "The glider introduction is a supported outing, not a compulsory fitness goal. Coast walking and activity choices remain adjustable.",
        "coverageNote": "Adds central-coast food/making and a Santa Barbara base. Big Sur side routes are optional and depend on current road access."
      }
    ]
  },
  {
    "id": "northern-california-drive",
    "title": "Lassen, Shasta & northern redwoods",
    "regionIds": [
      "northern-california"
    ],
    "scope": "USA",
    "season": "Approximate: summer–early fall for broader Lassen road/trail choice; snow, fire, and current access may change the route.",
    "theme": "Volcanic landscapes, forest walks, and a slower redwood chapter",
    "why": "A four-day version chooses one Lassen base. The ten-day loop adds mountain and redwood sectors while making the long transfers visible.",
    "variants": [
      {
        "id": "northern-california-4",
        "days": 4,
        "title": "One Lassen park base",
        "mode": "drive",
        "departure": "BayArea",
        "gateways": [],
        "travelAllowance": {
          "outbound": "Approximate planning allowance: Reserve roughly 7–11 hours for the Bay Area → selected Lassen gateway, including breaks and the final park-area roads.",
          "basis": "planningassumption",
          "return": "Approximate planning allowance: Reserve roughly 7–11 hours for the Lassen gateway → Bay Area drive; road and traffic conditions may extend it."
        },
        "baseLabels": [
          "Mineral / Lassen gateway"
        ],
        "itemIds": [
          "LA-0633"
        ],
        "outline": [
          {
            "day": 1,
            "base": "Bay Area → Lassen gateway",
            "kind": "travel",
            "focus": "Full outbound-drive buffer; choose lodging and an entrance with current access.",
            "itemIds": []
          },
          {
            "day": 2,
            "base": "Lassen base",
            "kind": "explore",
            "focus": "Choose a suitable Lassen Volcanic National Park day route.",
            "itemIds": [
              "LA-0633"
            ]
          },
          {
            "day": 3,
            "base": "Lassen base",
            "kind": "explore",
            "focus": "Another adjustable park day, or a weather/rest buffer; no summit is assumed.",
            "itemIds": []
          },
          {
            "day": 4,
            "base": "Lassen gateway → Bay Area",
            "kind": "travel",
            "focus": "Full return-drive buffer with breaks.",
            "itemIds": []
          }
        ],
        "routeNote": "Keep one Lassen gateway base. Confirm current park roads, snow, fire-related closures, and the actual entrance/overnight combination. This is a longer northern-California drive, not a short local hop.",
        "fitnessNote": "Elevation, trail distance, and conditions change effort. Pick established day routes suitable for preparation and support; a summit is optional.",
        "coverageNote": "Tracks one Lassen park goal with two local days. There are no Mendocino goals in the current mapped catalog, and none are falsely borrowed here."
      },
      {
        "id": "northern-california-10",
        "days": 10,
        "title": "Lassen, Mount Shasta, and a redwood-sector loop",
        "mode": "drive",
        "departure": "BayArea",
        "gateways": [],
        "travelAllowance": {
          "outbound": "Approximate planning allowance: Reserve roughly 7–11 hours for Bay Area → Lassen gateway and arrival.",
          "basis": "planningassumption",
          "return": "Approximate planning allowance: Reserve roughly 4–8 hours from a Ukiah/Willits-area return stop to the Bay Area; the longer coast-to-stop drive is reserved on day 9."
        },
        "baseLabels": [
          "Mineral / Lassen gateway",
          "Mount Shasta",
          "Crescent City / redwoods gateway",
          "Ukiah / inland return stop"
        ],
        "itemIds": [
          "LA-0633",
          "LA-0557",
          "LA-0161"
        ],
        "outline": [
          {
            "day": 1,
            "base": "Bay Area → Lassen gateway",
            "kind": "travel",
            "focus": "Full outbound-drive buffer.",
            "itemIds": []
          },
          {
            "day": 2,
            "base": "Lassen base",
            "kind": "explore",
            "focus": "Choose a suitable Lassen park route.",
            "itemIds": [
              "LA-0633"
            ]
          },
          {
            "day": 3,
            "base": "Lassen base",
            "kind": "rest",
            "focus": "Weather, recovery, or another short park day.",
            "itemIds": []
          },
          {
            "day": 4,
            "base": "Lassen gateway → Mount Shasta",
            "kind": "transfer",
            "focus": "Reserve the mountain-sector transfer and check actual roads.",
            "itemIds": []
          },
          {
            "day": 5,
            "base": "Mount Shasta area",
            "kind": "explore",
            "focus": "Choose a suitable Mount Shasta-area outing; climbing the summit is a separate optional goal, not assumed.",
            "itemIds": [
              "LA-0557"
            ]
          },
          {
            "day": 6,
            "base": "Mount Shasta → redwoods coast",
            "kind": "transfer",
            "focus": "Reserve the substantial mountain-to-coast road leg; select a road connection using current conditions.",
            "itemIds": []
          },
          {
            "day": 7,
            "base": "Crescent City / redwoods base",
            "kind": "explore",
            "focus": "Choose one Redwood National/State Parks sector and an appropriate forest walk.",
            "itemIds": [
              "LA-0161"
            ]
          },
          {
            "day": 8,
            "base": "Redwoods base",
            "kind": "rest",
            "focus": "A slow forest/coast day or weather buffer.",
            "itemIds": []
          },
          {
            "day": 9,
            "base": "Redwoods coast → Ukiah / inland return stop",
            "kind": "transfer",
            "focus": "Reserve the long southbound US 101 corridor leg and a return-stop overnight.",
            "itemIds": []
          },
          {
            "day": 10,
            "base": "Return stop → Bay Area",
            "kind": "travel",
            "focus": "Final return-drive buffer with road breaks.",
            "itemIds": []
          }
        ],
        "routeNote": "Three distinct northern sectors require several transfer days. The Shasta-to-redwoods road choice may pass through southern Oregon; check the actual connection rather than drawing a road from a schematic map. The return is split across days 9 and 10 so a very long coast-to-home drive is not hidden.",
        "fitnessNote": "Use appropriate Lassen and Shasta-area day routes; summit climbs are not assumed. Redwood walking can remain gentle, and rest blocks are deliberate.",
        "coverageNote": "Adds Mount Shasta and one redwood-park sector to Lassen. The long road legs reduce local exploration time; Mendocino remains a catalog gap rather than a claimed completed goal."
      }
    ]
  },
  {
    "id": "tahoe-eastern-sierra-drive",
    "title": "Tahoe, Truckee & the eastern Sierra",
    "regionIds": [
      "sierra"
    ],
    "scope": "USA",
    "season": "Approximate: warm-season lake activities and cooler shoulder-season Bishop climbing; snow, heat, and road conditions change the mix.",
    "theme": "Lake time, optional beginner climbing, and historical learning",
    "why": "One Tahoe base supports a four-day break. Ten days can follow the eastern-Sierra corridor with a deliberate northern return.",
    "variants": [
      {
        "id": "tahoe-4",
        "days": 4,
        "title": "One Tahoe base and two local days",
        "mode": "drive",
        "departure": "BayArea",
        "gateways": [],
        "travelAllowance": {
          "outbound": "Approximate planning allowance: Reserve roughly 5–9 hours for the Bay Area → selected Tahoe base, including breaks and mountain-road congestion.",
          "basis": "planningassumption",
          "return": "Approximate planning allowance: Reserve roughly 5–9 hours for Tahoe → Bay Area; snow controls and traffic can require extra time."
        },
        "baseLabels": [
          "South Lake Tahoe"
        ],
        "itemIds": [
          "LA-0303",
          "LA-0644"
        ],
        "outline": [
          {
            "day": 1,
            "base": "Bay Area → South Lake Tahoe",
            "kind": "travel",
            "focus": "Outbound-drive buffer; check the chosen mountain road and local conditions.",
            "itemIds": []
          },
          {
            "day": 2,
            "base": "Tahoe base",
            "kind": "explore",
            "focus": "Choose a Lake Tahoe shore route and ordinary lake-town time.",
            "itemIds": [
              "LA-0303"
            ]
          },
          {
            "day": 3,
            "base": "Tahoe base",
            "kind": "explore",
            "focus": "A guided/suitable sunrise paddleboard outing is optional when water, weather, and skill level fit; a shore day can replace it.",
            "itemIds": [
              "LA-0644"
            ]
          },
          {
            "day": 4,
            "base": "Tahoe → Bay Area",
            "kind": "travel",
            "focus": "Return-drive buffer with road breaks.",
            "itemIds": []
          }
        ],
        "routeNote": "Use one Tahoe base and choose its shore outings. A Truckee visit has its own road leg from South Lake Tahoe. Check US 50 or I-80 and local access; this short version does not need Tioga Pass.",
        "fitnessNote": "Paddleboarding is an optional active skill with suitable instruction and conditions. Lake walking can stay gentler.",
        "coverageNote": "Tracks Lake Tahoe and an optional water-skill goal with two local days; other Sierra sectors remain separate."
      },
      {
        "id": "tahoe-10",
        "days": 10,
        "title": "Tahoe, Bridgeport, and Bishop via the eastern corridor",
        "mode": "drive",
        "departure": "BayArea",
        "gateways": [],
        "travelAllowance": {
          "outbound": "Approximate planning allowance: Reserve roughly 5–9 hours for Bay Area → Tahoe and arrival.",
          "basis": "planningassumption",
          "return": "Approximate planning allowance: Reserve roughly 5–9 hours for Tahoe → Bay Area after returning north on day 9; actual roads and weather may need more time."
        },
        "baseLabels": [
          "South Lake Tahoe",
          "Bridgeport",
          "Bishop"
        ],
        "itemIds": [
          "LA-0303",
          "LA-0644",
          "LA-0257",
          "LA-0004",
          "LA-0589"
        ],
        "outline": [
          {
            "day": 1,
            "base": "Bay Area → Tahoe",
            "kind": "travel",
            "focus": "Outbound-drive and arrival buffer.",
            "itemIds": []
          },
          {
            "day": 2,
            "base": "Tahoe base",
            "kind": "explore",
            "focus": "Choose a Lake Tahoe shore outing; select any Truckee town side trip by actual road access.",
            "itemIds": [
              "LA-0303"
            ]
          },
          {
            "day": 3,
            "base": "Tahoe base",
            "kind": "explore",
            "focus": "A suitable sunrise paddleboard session is optional and conditions-dependent.",
            "itemIds": [
              "LA-0644"
            ]
          },
          {
            "day": 4,
            "base": "Tahoe → Bridgeport",
            "kind": "transfer",
            "focus": "Reserve the eastern-corridor transfer and check the chosen US 395/local roads.",
            "itemIds": []
          },
          {
            "day": 5,
            "base": "Bridgeport base",
            "kind": "rest",
            "focus": "A slower day with an optional Travertine Hot Springs visit through established public access and suitable conditions.",
            "itemIds": [
              "LA-0257"
            ]
          },
          {
            "day": 6,
            "base": "Bridgeport → Bishop",
            "kind": "transfer",
            "focus": "Move to the Bishop base with road breaks.",
            "itemIds": []
          },
          {
            "day": 7,
            "base": "Bishop base",
            "kind": "explore",
            "focus": "Choose an appropriate instructor-led indoor climbing or beginner bouldering introduction; heat and conditions determine the setting.",
            "itemIds": [
              "LA-0004"
            ]
          },
          {
            "day": 8,
            "base": "Bishop / Owens Valley",
            "kind": "explore",
            "focus": "A Manzanar visit offers historical interpretation and time for reflection, with its local road leg planned deliberately.",
            "itemIds": [
              "LA-0589"
            ]
          },
          {
            "day": 9,
            "base": "Bishop → Tahoe corridor",
            "kind": "transfer",
            "focus": "Reserve the northern return-road leg; do not assume a Yosemite/Tioga crossing is available.",
            "itemIds": []
          },
          {
            "day": 10,
            "base": "Tahoe corridor → Bay Area",
            "kind": "travel",
            "focus": "Final return-drive buffer with road breaks.",
            "itemIds": []
          }
        ],
        "routeNote": "This follows an eastern-Sierra corridor with a northern return. A Tioga Pass shortcut is not assumed; check current US 395, US 50/I-80, and local road conditions. Bridgeport, Bishop, and Manzanar are distinct stops, so the transfer days are real parts of the trip.",
        "fitnessNote": "Water skills and climbing are optional and depend on instruction, preparation, and conditions. Choose easier shore or indoor alternatives when useful; age is not a cutoff.",
        "coverageNote": "Adds Bridgeport, Bishop climbing, and Owens Valley history to Tahoe. The northern return uses day 9 before the final home drive; Yosemite is not silently added."
      }
    ]
  },
  {
    "id": "socal-coast",
    "title": "Southern California coast",
    "regionIds": [
      "san-diego",
      "los-angeles"
    ],
    "scope": "USA",
    "season": "Approximate: year-round city/coast trips; water, swell, heat, and local conditions vary.",
    "theme": "Beginner ocean confidence, museums, and neighborhood food",
    "why": "A short flight can support one city in four days; ten days permits a separate Los Angeles chapter without rushing the coast.",
    "variants": [
      {
        "id": "socal-4",
        "days": 4,
        "title": "San Diego, one coastal base",
        "mode": "fly",
        "departure": "BayArea",
        "gateways": [
          "SAN"
        ],
        "travelAllowance": {
          "outbound": "Approximate planning allowance: Reserve roughly 5–8 hours door to door via SAN under a workable Bay Area flight-and-ground plan.",
          "basis": "planningassumption",
          "return": "Approximate planning allowance: Reserve roughly 5–8 hours for the SAN → Bay Area journey; allow more for inconvenient schedules."
        },
        "baseLabels": [
          "San Diego"
        ],
        "itemIds": [
          "LA-0001",
          "LA-0091",
          "LA-0623"
        ],
        "outline": [
          {
            "day": 1,
            "base": "Bay Area airports → San Diego",
            "kind": "travel",
            "focus": "Outbound flight and arrival buffer.",
            "itemIds": []
          },
          {
            "day": 2,
            "base": "San Diego",
            "kind": "explore",
            "focus": "Choose a beginner surf lesson and an easy coast outing.",
            "itemIds": [
              "LA-0001",
              "LA-0091"
            ]
          },
          {
            "day": 3,
            "base": "San Diego",
            "kind": "explore",
            "focus": "Explore Balboa Park, or keep the day gentle near the chosen neighborhood.",
            "itemIds": [
              "LA-0623"
            ]
          },
          {
            "day": 4,
            "base": "San Diego → Bay Area airports",
            "kind": "travel",
            "focus": "Return flight and ground-transfer buffer.",
            "itemIds": []
          }
        ],
        "routeNote": "Choose SFO, SJC, or OAK based on actual flight service and home-to-airport access. Check the flight and ground-transfer plan before saving dates. Keep one San Diego base; local traffic and coast transfers still matter. Book instruction only after checking the actual conditions and provider.",
        "fitnessNote": "Surfing is an optional instructor-led activity; coast walking and museum time can be gentler.",
        "coverageNote": "Two local days in San Diego; the rest of Southern California remains a separate chapter."
      },
      {
        "id": "socal-10",
        "days": 10,
        "title": "San Diego coast and Los Angeles culture",
        "mode": "fly",
        "departure": "BayArea",
        "gateways": [
          "SAN",
          "LAX"
        ],
        "travelAllowance": {
          "outbound": "Approximate planning allowance: Reserve roughly 5–8 hours for Bay Area → SAN and local arrival.",
          "basis": "planningassumption",
          "return": "Approximate planning allowance: Reserve roughly 6–9 hours for LAX → Bay Area, including Los Angeles ground access."
        },
        "baseLabels": [
          "San Diego",
          "Los Angeles"
        ],
        "itemIds": [
          "LA-0001",
          "LA-0623",
          "LA-0069",
          "LA-0091",
          "LA-0056",
          "LA-0200",
          "LA-0265",
          "LA-0089"
        ],
        "outline": [
          {
            "day": 1,
            "base": "Bay Area airports → San Diego",
            "kind": "travel",
            "focus": "Outbound flight and settling-in buffer.",
            "itemIds": []
          },
          {
            "day": 2,
            "base": "San Diego",
            "kind": "explore",
            "focus": "Try an appropriate beginner surf lesson.",
            "itemIds": [
              "LA-0001"
            ]
          },
          {
            "day": 3,
            "base": "San Diego",
            "kind": "explore",
            "focus": "Explore Balboa Park.",
            "itemIds": [
              "LA-0623"
            ]
          },
          {
            "day": 4,
            "base": "San Diego",
            "kind": "rest",
            "focus": "A slower beach day or recovery buffer.",
            "itemIds": [
              "LA-0069"
            ]
          },
          {
            "day": 5,
            "base": "San Diego coast",
            "kind": "explore",
            "focus": "Choose a La Jolla or Torrey Pines coastal outing.",
            "itemIds": [
              "LA-0091"
            ]
          },
          {
            "day": 6,
            "base": "San Diego → Los Angeles",
            "kind": "transfer",
            "focus": "Use the whole block for the chosen rail or road transfer and check current service.",
            "itemIds": []
          },
          {
            "day": 7,
            "base": "Los Angeles",
            "kind": "explore",
            "focus": "Choose a Getty museum and architecture day.",
            "itemIds": [
              "LA-0056"
            ]
          },
          {
            "day": 8,
            "base": "Los Angeles",
            "kind": "explore",
            "focus": "Explore a food neighborhood and Grand Central Market.",
            "itemIds": [
              "LA-0200",
              "LA-0265"
            ]
          },
          {
            "day": 9,
            "base": "Los Angeles",
            "kind": "rest",
            "focus": "A slower Santa Monica outing or rest buffer.",
            "itemIds": [
              "LA-0089"
            ]
          },
          {
            "day": 10,
            "base": "Los Angeles → Bay Area airports",
            "kind": "travel",
            "focus": "Airport access and return-flight buffer.",
            "itemIds": []
          }
        ],
        "routeNote": "Choose SFO, SJC, or OAK based on actual flight service and home-to-airport access. Check the flight and ground-transfer plan before saving dates. A SAN arrival and LAX departure are one possible structure, conditional on fares and ground arrangements. San Diego-to-Los Angeles is a distinct transfer day; confirm rail or vehicle options.",
        "fitnessNote": "Beginner water activity can be replaced by gentler coast time. City outings are adjustable walking days.",
        "coverageNote": "Adds Los Angeles museums and food to the San Diego base; theme parks and desert routes remain separate choices."
      }
    ]
  },
  {
    "id": "oregon-days",
    "title": "Portland and the Oregon coast",
    "regionIds": [
      "oregon"
    ],
    "scope": "USA",
    "season": "Approximate: late spring–early fall for longer days; rain, wind, and current waterfall access vary.",
    "theme": "Food neighborhoods, waterfalls, and coastal walking",
    "why": "Four days can be a Portland-based sample; ten can connect the city to selected coastal bases.",
    "variants": [
      {
        "id": "oregon-4",
        "days": 4,
        "title": "Portland, with one Gorge outing",
        "mode": "fly",
        "departure": "BayArea",
        "gateways": [
          "PDX"
        ],
        "travelAllowance": {
          "outbound": "Approximate planning allowance: Reserve roughly 5–8 hours door to door via PDX with a workable itinerary.",
          "basis": "planningassumption",
          "return": "Approximate planning allowance: Reserve roughly 5–8 hours for the PDX → Bay Area journey and local ground transfers."
        },
        "baseLabels": [
          "Portland"
        ],
        "itemIds": [
          "LA-0168",
          "LA-0266",
          "LA-0128",
          "LA-0433"
        ],
        "outline": [
          {
            "day": 1,
            "base": "Bay Area airports → Portland",
            "kind": "travel",
            "focus": "Outbound flight and arrival buffer.",
            "itemIds": []
          },
          {
            "day": 2,
            "base": "Portland",
            "kind": "explore",
            "focus": "Choose a café neighborhood, food carts, and a garden visit as time feels comfortable.",
            "itemIds": [
              "LA-0168",
              "LA-0266",
              "LA-0128"
            ]
          },
          {
            "day": 3,
            "base": "Portland / Columbia River Gorge",
            "kind": "explore",
            "focus": "Choose one waterfall or Gorge outing, using roads and paths currently open.",
            "itemIds": [
              "LA-0433"
            ]
          },
          {
            "day": 4,
            "base": "Portland → Bay Area airports",
            "kind": "travel",
            "focus": "Return-flight and ground-access buffer.",
            "itemIds": []
          }
        ],
        "routeNote": "Choose SFO, SJC, or OAK based on actual flight service and home-to-airport access. Check the flight and ground-transfer plan before saving dates. Stay in Portland throughout. A Gorge day still needs a confirmed transport plan and an appropriate route.",
        "fitnessNote": "Choose a waterfall route by distance and conditions; a shorter garden or city day is available.",
        "coverageNote": "Two local days around one Portland base; the coast and southern Oregon need additional time."
      },
      {
        "id": "oregon-10",
        "days": 10,
        "title": "Portland, north coast, and Newport",
        "mode": "fly",
        "departure": "BayArea",
        "gateways": [
          "PDX"
        ],
        "travelAllowance": {
          "outbound": "Approximate planning allowance: Reserve roughly 5–8 hours for Bay Area → PDX and local arrival.",
          "basis": "planningassumption",
          "return": "Approximate planning allowance: Reserve roughly 5–8 hours for PDX → Bay Area, after returning to the airport area the previous day."
        },
        "baseLabels": [
          "Portland",
          "Cannon Beach / north coast",
          "Newport"
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
        "outline": [
          {
            "day": 1,
            "base": "Bay Area airports → Portland",
            "kind": "travel",
            "focus": "Outbound flight and arrival buffer.",
            "itemIds": []
          },
          {
            "day": 2,
            "base": "Portland",
            "kind": "explore",
            "focus": "Explore a garden and one café or food-cart neighborhood.",
            "itemIds": [
              "LA-0128",
              "LA-0168",
              "LA-0266"
            ]
          },
          {
            "day": 3,
            "base": "Portland / Gorge",
            "kind": "explore",
            "focus": "Choose one Columbia River Gorge outing.",
            "itemIds": [
              "LA-0433"
            ]
          },
          {
            "day": 4,
            "base": "Portland → Cannon Beach",
            "kind": "transfer",
            "focus": "A slow transfer to the north coast.",
            "itemIds": []
          },
          {
            "day": 5,
            "base": "Cannon Beach",
            "kind": "explore",
            "focus": "Beach walking and a relaxed coastal town day.",
            "itemIds": [
              "LA-0067"
            ]
          },
          {
            "day": 6,
            "base": "North coast base",
            "kind": "rest",
            "focus": "Weather or rest buffer.",
            "itemIds": []
          },
          {
            "day": 7,
            "base": "North coast → Newport",
            "kind": "transfer",
            "focus": "Move to one central-coast base with time for road breaks.",
            "itemIds": []
          },
          {
            "day": 8,
            "base": "Newport / central coast",
            "kind": "explore",
            "focus": "Choose Yaquina Head; Heceta Head is a farther-south option if its road leg belongs in the day.",
            "itemIds": [
              "LA-0312",
              "LA-0306"
            ]
          },
          {
            "day": 9,
            "base": "Coast → Portland",
            "kind": "transfer",
            "focus": "Return toward the airport base and keep the evening easy.",
            "itemIds": []
          },
          {
            "day": 10,
            "base": "Portland → Bay Area airports",
            "kind": "travel",
            "focus": "Return-flight and local ground-access buffer.",
            "itemIds": []
          }
        ],
        "routeNote": "Choose SFO, SJC, or OAK based on actual flight service and home-to-airport access. Check the flight and ground-transfer plan before saving dates. Choose actual coastal overnight bases before calculating drives. Heceta Head extends farther south than Newport; the coast day offers alternatives rather than two required lighthouse stops.",
        "fitnessNote": "Coastal walking can stay gentle; use tide-aware access and route lengths that suit you.",
        "coverageNote": "Adds a north/central Oregon coast chapter. Crater Lake and Bend would require a different route or more time."
      }
    ]
  },
  {
    "id": "washington-days",
    "title": "Seattle and the Olympic Peninsula",
    "regionIds": [
      "washington"
    ],
    "scope": "USA",
    "season": "Approximate: late spring–early fall for wider trail choice; rain and local closures remain possible.",
    "theme": "City craft learning, old-growth forest, and wild coast",
    "why": "Four days suits Seattle; ten provides the transfer time needed for different Olympic access roads.",
    "variants": [
      {
        "id": "washington-4",
        "days": 4,
        "title": "Seattle, one neighborhood-based break",
        "mode": "fly",
        "departure": "BayArea",
        "gateways": [
          "SEA"
        ],
        "travelAllowance": {
          "outbound": "Approximate planning allowance: Reserve roughly 6–9 hours door to door via SEA under a workable itinerary.",
          "basis": "planningassumption",
          "return": "Approximate planning allowance: Reserve roughly 6–9 hours for SEA → Bay Area, including city-airport ground access."
        },
        "baseLabels": [
          "Seattle"
        ],
        "itemIds": [
          "LA-0201",
          "LA-0165",
          "LA-0240"
        ],
        "outline": [
          {
            "day": 1,
            "base": "Bay Area airports → Seattle",
            "kind": "travel",
            "focus": "Outbound flight and arrival buffer.",
            "itemIds": []
          },
          {
            "day": 2,
            "base": "Seattle",
            "kind": "explore",
            "focus": "Explore Pike Place and a coffee neighborhood.",
            "itemIds": [
              "LA-0201",
              "LA-0165"
            ]
          },
          {
            "day": 3,
            "base": "Seattle",
            "kind": "explore",
            "focus": "Try a public glassblowing class or another relaxed city day.",
            "itemIds": [
              "LA-0240"
            ]
          },
          {
            "day": 4,
            "base": "Seattle → Bay Area airports",
            "kind": "travel",
            "focus": "Return-flight and ground-transfer buffer.",
            "itemIds": []
          }
        ],
        "routeNote": "Choose SFO, SJC, or OAK based on actual flight service and home-to-airport access. Check the flight and ground-transfer plan before saving dates. Use one Seattle base and plan city transport. Workshop timing needs an actual booking check.",
        "fitnessNote": "A supervised craft class is compatible with solo travel; city walking can be adjusted.",
        "coverageNote": "Two Seattle days; Olympic and Rainier are separate regional commitments."
      },
      {
        "id": "washington-10",
        "days": 10,
        "title": "Seattle and the Olympic forest/coast loop",
        "mode": "fly",
        "departure": "BayArea",
        "gateways": [
          "SEA"
        ],
        "travelAllowance": {
          "outbound": "Approximate planning allowance: Reserve roughly 6–9 hours for Bay Area → SEA and city arrival.",
          "basis": "planningassumption",
          "return": "Approximate planning allowance: Reserve roughly 6–9 hours for SEA → Bay Area, after the peninsula return the previous day."
        },
        "baseLabels": [
          "Seattle",
          "Port Angeles / northern peninsula",
          "Forks / western peninsula"
        ],
        "itemIds": [
          "LA-0201",
          "LA-0165",
          "LA-0240",
          "LA-0403",
          "LA-0446",
          "LA-0434"
        ],
        "outline": [
          {
            "day": 1,
            "base": "Bay Area airports → Seattle",
            "kind": "travel",
            "focus": "Outbound flight and settling-in buffer.",
            "itemIds": []
          },
          {
            "day": 2,
            "base": "Seattle",
            "kind": "explore",
            "focus": "Explore Pike Place and a coffee neighborhood.",
            "itemIds": [
              "LA-0201",
              "LA-0165"
            ]
          },
          {
            "day": 3,
            "base": "Seattle",
            "kind": "explore",
            "focus": "Choose a glassblowing class or city exploration.",
            "itemIds": [
              "LA-0240"
            ]
          },
          {
            "day": 4,
            "base": "Seattle → Port Angeles",
            "kind": "transfer",
            "focus": "Peninsula transfer day; confirm the road or ferry route.",
            "itemIds": []
          },
          {
            "day": 5,
            "base": "Northern Olympic base",
            "kind": "explore",
            "focus": "Choose an Olympic National Park day route suited to current access.",
            "itemIds": [
              "LA-0403"
            ]
          },
          {
            "day": 6,
            "base": "Northern → western peninsula",
            "kind": "transfer",
            "focus": "Move to a western base with road breaks.",
            "itemIds": []
          },
          {
            "day": 7,
            "base": "Western Olympic base",
            "kind": "explore",
            "focus": "Choose a Hoh forest walk at an appropriate distance.",
            "itemIds": [
              "LA-0446"
            ]
          },
          {
            "day": 8,
            "base": "Western Olympic base",
            "kind": "rest",
            "focus": "Weather/rest buffer with an optional Ruby Beach visit.",
            "itemIds": [
              "LA-0434"
            ]
          },
          {
            "day": 9,
            "base": "Western peninsula → Seattle",
            "kind": "transfer",
            "focus": "Reserve the return road or ferry journey and an easy evening.",
            "itemIds": []
          },
          {
            "day": 10,
            "base": "Seattle → Bay Area airports",
            "kind": "travel",
            "focus": "Return-flight and ground-access buffer.",
            "itemIds": []
          }
        ],
        "routeNote": "Choose SFO, SJC, or OAK based on actual flight service and home-to-airport access. Check the flight and ground-transfer plan before saving dates. Olympic has distinct access roads and multiple bases. Check current road, trail, tide, and any ferry arrangements before fixing the loop.",
        "fitnessNote": "Forest walks and coastal visits have adjustable distances; conditions and route choice set the effort.",
        "coverageNote": "Adds northern and western Olympic sectors; it does not imply a Rainier or San Juan Islands visit."
      }
    ]
  },
  {
    "id": "utah-days",
    "title": "Southern Utah red rock",
    "regionIds": [
      "zion-bryce"
    ],
    "scope": "USA",
    "season": "Approximate: spring or fall for lower-elevation walks; Bryce can be cold and Narrows conditions vary.",
    "theme": "Optional active Zion routes, sandstone, and sunrise",
    "why": "A four-day break can hold one Zion base; ten allows the slower west-to-east southern-Utah route.",
    "variants": [
      {
        "id": "utah-4",
        "days": 4,
        "title": "One Zion base, two park days",
        "mode": "fly",
        "departure": "BayArea",
        "gateways": [
          "LAS"
        ],
        "travelAllowance": {
          "outbound": "Approximate planning allowance: Reserve roughly 7–11 hours for Bay Area → LAS, airport/vehicle processes, and the Springdale road leg.",
          "basis": "planningassumption",
          "return": "Approximate planning allowance: Reserve roughly 7–11 hours for Springdale → LAS → Bay Area, using a workable same-day return."
        },
        "baseLabels": [
          "Springdale / Zion"
        ],
        "itemIds": [
          "LA-0107",
          "LA-0244",
          "LA-0245"
        ],
        "outline": [
          {
            "day": 1,
            "base": "Bay Area airports → LAS → Springdale",
            "kind": "travel",
            "focus": "Full outbound flight-and-road buffer.",
            "itemIds": []
          },
          {
            "day": 2,
            "base": "Zion base",
            "kind": "explore",
            "focus": "Explore Zion Canyon through suitable canyon walks.",
            "itemIds": [
              "LA-0107"
            ]
          },
          {
            "day": 3,
            "base": "Zion base",
            "kind": "explore",
            "focus": "Choose a permit- and conditions-appropriate Angels Landing or Narrows outing, or a gentler canyon day.",
            "itemIds": [
              "LA-0244",
              "LA-0245"
            ]
          },
          {
            "day": 4,
            "base": "Springdale → LAS → Bay Area airports",
            "kind": "travel",
            "focus": "Full road, airport, and return-flight buffer.",
            "itemIds": []
          }
        ],
        "routeNote": "Choose SFO, SJC, or OAK based on actual flight service and home-to-airport access. Check the flight and ground-transfer plan before saving dates. LAS-to-Springdale is a substantial road leg on both travel days. Confirm that the actual flight and ground schedule leaves two usable local days.",
        "fitnessNote": "Angels Landing is optional and demanding; Narrows effort and access depend on water and route conditions. Choose suitable support rather than treating either as mandatory.",
        "coverageNote": "A Zion sample, with alternative active goals. Bryce, Capitol Reef, and Moab are future route choices."
      },
      {
        "id": "utah-10",
        "days": 10,
        "title": "Zion, Bryce, and Capitol Reef",
        "mode": "fly",
        "departure": "BayArea",
        "gateways": [
          "LAS"
        ],
        "travelAllowance": {
          "outbound": "Approximate planning allowance: Reserve roughly 7–11 hours for Bay Area → LAS → Springdale, including breaks and airport processes.",
          "basis": "planningassumption",
          "return": "Approximate planning allowance: Reserve roughly 6–10 hours for LAS → Bay Area after returning to the gateway on day 9."
        },
        "baseLabels": [
          "Springdale",
          "Bryce area",
          "Torrey",
          "Las Vegas gateway"
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
        "outline": [
          {
            "day": 1,
            "base": "Bay Area airports → LAS → Springdale",
            "kind": "travel",
            "focus": "Full outbound flight-and-road buffer.",
            "itemIds": []
          },
          {
            "day": 2,
            "base": "Zion base",
            "kind": "explore",
            "focus": "Explore Zion Canyon at an adjustable distance.",
            "itemIds": [
              "LA-0107"
            ]
          },
          {
            "day": 3,
            "base": "Zion base",
            "kind": "explore",
            "focus": "Choose one appropriate active route or a gentler park day.",
            "itemIds": [
              "LA-0244",
              "LA-0245"
            ]
          },
          {
            "day": 4,
            "base": "Springdale → Bryce area",
            "kind": "transfer",
            "focus": "A deliberate transfer with a possible amphitheater viewpoint.",
            "itemIds": [
              "LA-0106"
            ]
          },
          {
            "day": 5,
            "base": "Bryce area",
            "kind": "explore",
            "focus": "Sunrise and a chosen Bryce route, with effort adapted to conditions.",
            "itemIds": [
              "LA-0076"
            ]
          },
          {
            "day": 6,
            "base": "Bryce → Torrey",
            "kind": "transfer",
            "focus": "A slow Scenic Byway 12 transfer with breaks.",
            "itemIds": [
              "LA-0463"
            ]
          },
          {
            "day": 7,
            "base": "Torrey / Capitol Reef",
            "kind": "explore",
            "focus": "Choose one Capitol Reef day route.",
            "itemIds": [
              "LA-0413"
            ]
          },
          {
            "day": 8,
            "base": "Torrey base",
            "kind": "rest",
            "focus": "Weather, recovery, or a quiet local day.",
            "itemIds": []
          },
          {
            "day": 9,
            "base": "Torrey → Las Vegas gateway",
            "kind": "transfer",
            "focus": "Reserve the substantial return-road day.",
            "itemIds": []
          },
          {
            "day": 10,
            "base": "LAS → Bay Area airports",
            "kind": "travel",
            "focus": "Return-flight and home-transfer buffer.",
            "itemIds": []
          }
        ],
        "routeNote": "Choose SFO, SJC, or OAK based on actual flight service and home-to-airport access. Check the flight and ground-transfer plan before saving dates. This southern-Utah route deliberately reserves the Torrey-to-LAS return before the flight day. Check actual drive legs, permits, park access, and lodging.",
        "fitnessNote": "An active Zion goal is optional. The longer outline adds recovery and weather space; age is not an activity deadline.",
        "coverageNote": "Adds Bryce and Capitol Reef to Zion. Moab and northern Utah are separate extensions."
      }
    ]
  },
  {
    "id": "arizona-days",
    "title": "Sedona and the Grand Canyon region",
    "regionIds": [
      "northern-arizona"
    ],
    "scope": "USA",
    "season": "Approximate: spring or fall; heat, winter weather, elevation, and local trail access vary.",
    "theme": "Desert viewpoints and optional walking",
    "why": "One Sedona base fits a shorter break; ten days allows a distinct South Rim chapter with a return buffer.",
    "variants": [
      {
        "id": "arizona-4",
        "days": 4,
        "title": "Sedona, one desert base",
        "mode": "fly",
        "departure": "BayArea",
        "gateways": [
          "PHX"
        ],
        "travelAllowance": {
          "outbound": "Approximate planning allowance: Reserve roughly 7–11 hours for Bay Area → PHX plus airport/vehicle processes and the Sedona road transfer.",
          "basis": "planningassumption",
          "return": "Approximate planning allowance: Reserve roughly 7–11 hours for Sedona → PHX → Bay Area under a workable itinerary."
        },
        "baseLabels": [
          "Sedona"
        ],
        "itemIds": [
          "LA-0085",
          "LA-0551"
        ],
        "outline": [
          {
            "day": 1,
            "base": "Bay Area airports → PHX → Sedona",
            "kind": "travel",
            "focus": "Full outbound flight-and-road buffer.",
            "itemIds": []
          },
          {
            "day": 2,
            "base": "Sedona",
            "kind": "explore",
            "focus": "Choose an Airport Mesa viewpoint and easy local exploring.",
            "itemIds": [
              "LA-0085"
            ]
          },
          {
            "day": 3,
            "base": "Sedona",
            "kind": "explore",
            "focus": "Choose a suitable Cathedral Rock area outing; a demanding ascent is not assumed.",
            "itemIds": [
              "LA-0551"
            ]
          },
          {
            "day": 4,
            "base": "Sedona → PHX → Bay Area airports",
            "kind": "travel",
            "focus": "Road, airport, and return-flight buffer.",
            "itemIds": []
          }
        ],
        "routeNote": "Choose SFO, SJC, or OAK based on actual flight service and home-to-airport access. Check the flight and ground-transfer plan before saving dates. Use one Sedona base and confirm actual Phoenix road legs, lodging, and local access.",
        "fitnessNote": "Choose viewpoints and trail lengths deliberately; heat and exposed terrain can change the effort.",
        "coverageNote": "A Sedona sample with two local days. The Grand Canyon and Page belong to longer or different routes."
      },
      {
        "id": "arizona-10",
        "days": 10,
        "title": "Sedona and a spacious South Rim chapter",
        "mode": "fly",
        "departure": "BayArea",
        "gateways": [
          "PHX"
        ],
        "travelAllowance": {
          "outbound": "Approximate planning allowance: Reserve roughly 7–11 hours for Bay Area → PHX → Sedona and arrival.",
          "basis": "planningassumption",
          "return": "Approximate planning allowance: Reserve roughly 6–10 hours for PHX → Bay Area after the gateway return the previous day."
        },
        "baseLabels": [
          "Sedona",
          "Grand Canyon South Rim / Tusayan",
          "Phoenix gateway"
        ],
        "itemIds": [
          "LA-0085",
          "LA-0551",
          "LA-0105",
          "LA-0082"
        ],
        "outline": [
          {
            "day": 1,
            "base": "Bay Area airports → PHX → Sedona",
            "kind": "travel",
            "focus": "Full outbound flight-and-road buffer.",
            "itemIds": []
          },
          {
            "day": 2,
            "base": "Sedona",
            "kind": "explore",
            "focus": "Explore viewpoints and a relaxed town route.",
            "itemIds": [
              "LA-0085"
            ]
          },
          {
            "day": 3,
            "base": "Sedona",
            "kind": "explore",
            "focus": "Choose a suitable Cathedral Rock area outing.",
            "itemIds": [
              "LA-0551"
            ]
          },
          {
            "day": 4,
            "base": "Sedona",
            "kind": "rest",
            "focus": "Rest or weather buffer.",
            "itemIds": []
          },
          {
            "day": 5,
            "base": "Sedona → South Rim base",
            "kind": "transfer",
            "focus": "Move to a chosen South Rim gateway, using current roads.",
            "itemIds": []
          },
          {
            "day": 6,
            "base": "Grand Canyon South Rim",
            "kind": "explore",
            "focus": "Explore the rim through an appropriate walking or viewpoint route.",
            "itemIds": [
              "LA-0105"
            ]
          },
          {
            "day": 7,
            "base": "South Rim base",
            "kind": "explore",
            "focus": "Choose a Hopi Point outing and another adjustable rim day.",
            "itemIds": [
              "LA-0082"
            ]
          },
          {
            "day": 8,
            "base": "South Rim base",
            "kind": "rest",
            "focus": "Rest, weather, or an easy local day.",
            "itemIds": []
          },
          {
            "day": 9,
            "base": "South Rim → Phoenix",
            "kind": "transfer",
            "focus": "Reserve the return road journey and gateway evening.",
            "itemIds": []
          },
          {
            "day": 10,
            "base": "PHX → Bay Area airports",
            "kind": "travel",
            "focus": "Return-flight and home-transfer buffer.",
            "itemIds": []
          }
        ],
        "routeNote": "Choose SFO, SJC, or OAK based on actual flight service and home-to-airport access. Check the flight and ground-transfer plan before saving dates. Choose actual South Rim lodging and park access before calculating the road legs. This is a Phoenix loop with a deliberate return day.",
        "fitnessNote": "Rim visits can stay gentle. Canyon descents and Rim-to-Rim require separate preparation and are not assumed in this outline.",
        "coverageNote": "Adds the South Rim to Sedona; Page, Monument Valley, and other northern-Arizona sectors need a different extension."
      }
    ]
  },
  {
    "id": "colorado-days",
    "title": "Colorado mountain bases",
    "regionIds": [
      "colorado"
    ],
    "scope": "USA",
    "season": "Approximate: late June–September for high roads; September may add aspen color and snow can change access.",
    "theme": "Adjustable mountain walks and recovery",
    "why": "A short break can concentrate on Estes Park; a longer one supports a second mountain base without treating the transfer as sightseeing time.",
    "variants": [
      {
        "id": "colorado-4",
        "days": 4,
        "title": "Estes Park and one Rocky Mountain base",
        "mode": "fly",
        "departure": "BayArea",
        "gateways": [
          "DEN"
        ],
        "travelAllowance": {
          "outbound": "Approximate planning allowance: Reserve roughly 7–12 hours for Bay Area → DEN, airport/vehicle processes, and the Estes Park transfer.",
          "basis": "planningassumption",
          "return": "Approximate planning allowance: Reserve roughly 7–12 hours for Estes Park → DEN → Bay Area, under a workable schedule."
        },
        "baseLabels": [
          "Estes Park"
        ],
        "itemIds": [
          "LA-0409",
          "LA-0462"
        ],
        "outline": [
          {
            "day": 1,
            "base": "Bay Area airports → DEN → Estes Park",
            "kind": "travel",
            "focus": "Outbound flight-and-road buffer; keep arrival gentle.",
            "itemIds": []
          },
          {
            "day": 2,
            "base": "Estes Park / Rocky Mountain National Park",
            "kind": "explore",
            "focus": "Choose a gentle park introduction and an appropriate walking distance.",
            "itemIds": [
              "LA-0409"
            ]
          },
          {
            "day": 3,
            "base": "Estes Park base",
            "kind": "explore",
            "focus": "Choose Trail Ridge Road when current access works, or another suitable park day.",
            "itemIds": [
              "LA-0462"
            ]
          },
          {
            "day": 4,
            "base": "Estes Park → DEN → Bay Area airports",
            "kind": "travel",
            "focus": "Road, airport, and return-flight buffer.",
            "itemIds": []
          }
        ],
        "routeNote": "Choose SFO, SJC, or OAK based on actual flight service and home-to-airport access. Check the flight and ground-transfer plan before saving dates. Use one Estes Park base. Check timed-entry arrangements, road status, and actual Denver ground transfers.",
        "fitnessNote": "Altitude, weather, and trail selection change effort. Keep the short version flexible rather than assuming a major summit goal.",
        "coverageNote": "Two local days around Rocky Mountain National Park; other Colorado mountain sectors need more time."
      },
      {
        "id": "colorado-10",
        "days": 10,
        "title": "Rocky Mountain and the Roaring Fork Valley",
        "mode": "fly",
        "departure": "BayArea",
        "gateways": [
          "DEN"
        ],
        "travelAllowance": {
          "outbound": "Approximate planning allowance: Reserve roughly 7–12 hours for Bay Area → DEN → Estes Park and arrival.",
          "basis": "planningassumption",
          "return": "Approximate planning allowance: Reserve roughly 7–11 hours for DEN → Bay Area after returning to the Front Range on day 9."
        },
        "baseLabels": [
          "Estes Park",
          "Aspen / Roaring Fork Valley",
          "Denver gateway"
        ],
        "itemIds": [
          "LA-0409",
          "LA-0462",
          "LA-0189",
          "LA-0436",
          "LA-0252",
          "LA-0382"
        ],
        "outline": [
          {
            "day": 1,
            "base": "Bay Area airports → DEN → Estes Park",
            "kind": "travel",
            "focus": "Outbound flight-and-road buffer.",
            "itemIds": []
          },
          {
            "day": 2,
            "base": "Estes Park base",
            "kind": "explore",
            "focus": "Choose a suitable Rocky Mountain park outing.",
            "itemIds": [
              "LA-0409"
            ]
          },
          {
            "day": 3,
            "base": "Estes Park base",
            "kind": "explore",
            "focus": "A Trail Ridge Road or other current-access park day.",
            "itemIds": [
              "LA-0462"
            ]
          },
          {
            "day": 4,
            "base": "Estes Park base",
            "kind": "rest",
            "focus": "Weather or recovery buffer.",
            "itemIds": []
          },
          {
            "day": 5,
            "base": "Estes Park → Roaring Fork Valley",
            "kind": "transfer",
            "focus": "Reserve the mountain transfer with road breaks.",
            "itemIds": []
          },
          {
            "day": 6,
            "base": "Aspen / Roaring Fork Valley",
            "kind": "explore",
            "focus": "Choose a Maroon Bells route that suits access and preparation.",
            "itemIds": [
              "LA-0189"
            ]
          },
          {
            "day": 7,
            "base": "Roaring Fork Valley",
            "kind": "explore",
            "focus": "An adjustable local day; aspen-color viewing is a seasonal option.",
            "itemIds": [
              "LA-0436"
            ]
          },
          {
            "day": 8,
            "base": "Glenwood Springs / valley base",
            "kind": "rest",
            "focus": "A slower pool or recovery day.",
            "itemIds": [
              "LA-0252"
            ]
          },
          {
            "day": 9,
            "base": "Valley → Denver / Morrison",
            "kind": "transfer",
            "focus": "Return toward the airport; a Red Rocks visit is optional if access and timing fit.",
            "itemIds": [
              "LA-0382"
            ]
          },
          {
            "day": 10,
            "base": "DEN → Bay Area airports",
            "kind": "travel",
            "focus": "Return-flight and home-transfer buffer.",
            "itemIds": []
          }
        ],
        "routeNote": "Choose SFO, SJC, or OAK based on actual flight service and home-to-airport access. Check the flight and ground-transfer plan before saving dates. A substantial mountain transfer separates Estes Park and the Roaring Fork Valley. Trail Ridge Road must not be assumed open as a through-route; check roads, park access, and Maroon Bells arrangements.",
        "fitnessNote": "Choose hiking distance and support individually. The longer version includes weather/recovery blocks rather than a compulsory sequence of strenuous days.",
        "coverageNote": "Adds a second Colorado mountain area and a restorative pool; southwest Colorado would be another route."
      }
    ]
  },
  {
    "id": "black-hills-days",
    "title": "Black Hills and the Badlands",
    "regionIds": [
      "black-hills"
    ],
    "scope": "USA",
    "season": "Approximate: late spring–early fall; summer heat, storms, and cave tour access vary.",
    "theme": "Prairie landscapes and cave learning",
    "why": "The airport and landscape are regionally close, but connecting flights can consume most of the short break’s travel days.",
    "variants": [
      {
        "id": "black-hills-4",
        "days": 4,
        "title": "Rapid City, Badlands, and one cave choice",
        "mode": "fly",
        "departure": "BayArea",
        "gateways": [
          "RAP"
        ],
        "travelAllowance": {
          "outbound": "Approximate planning allowance: Reserve roughly 9–15 hours door to door via RAP, including a possible connection; schedules can make this longer.",
          "basis": "planningassumption",
          "return": "Approximate planning allowance: Reserve roughly 9–15 hours for RAP → Bay Area, including a possible connection and home transfer."
        },
        "baseLabels": [
          "Rapid City"
        ],
        "itemIds": [
          "LA-0411",
          "LA-0115",
          "LA-0121"
        ],
        "outline": [
          {
            "day": 1,
            "base": "Bay Area airports → Rapid City",
            "kind": "travel",
            "focus": "Full travel-day buffer; confirm a workable same-day arrival first.",
            "itemIds": []
          },
          {
            "day": 2,
            "base": "Rapid City / Badlands",
            "kind": "explore",
            "focus": "Choose Badlands viewpoints and a suitable walk.",
            "itemIds": [
              "LA-0411"
            ]
          },
          {
            "day": 3,
            "base": "Rapid City / Black Hills",
            "kind": "explore",
            "focus": "Choose one Jewel Cave or Wind Cave visitor route according to actual tour access.",
            "itemIds": [
              "LA-0115",
              "LA-0121"
            ]
          },
          {
            "day": 4,
            "base": "Rapid City → Bay Area airports",
            "kind": "travel",
            "focus": "Full return travel-day buffer.",
            "itemIds": []
          }
        ],
        "routeNote": "Choose SFO, SJC, or OAK based on actual flight service and home-to-airport access. Check the flight and ground-transfer plan before saving dates. Use one Rapid City base. The four-day option depends on workable same-day flights in both directions; if an overnight connection is required, the duration must change.",
        "fitnessNote": "Badlands walks and cave tours vary in heat, stairs, distance, and exposure. Choose the route, not a universal effort label.",
        "coverageNote": "Two regional outing days from one base; the wider Black Hills loop remains a longer option."
      },
      {
        "id": "black-hills-10",
        "days": 10,
        "title": "Badlands, cave routes, and northern Black Hills",
        "mode": "fly",
        "departure": "BayArea",
        "gateways": [
          "RAP"
        ],
        "travelAllowance": {
          "outbound": "Approximate planning allowance: Reserve roughly 9–15 hours via RAP, including a possible connection and local arrival.",
          "basis": "planningassumption",
          "return": "Approximate planning allowance: Reserve roughly 9–15 hours for RAP → Bay Area; confirm whether the actual itinerary requires extra time."
        },
        "baseLabels": [
          "Rapid City",
          "Custer / Hot Springs",
          "Spearfish / northern Black Hills"
        ],
        "itemIds": [
          "LA-0411",
          "LA-0115",
          "LA-0121",
          "LA-0390"
        ],
        "outline": [
          {
            "day": 1,
            "base": "Bay Area airports → Rapid City",
            "kind": "travel",
            "focus": "Full outbound travel-day buffer.",
            "itemIds": []
          },
          {
            "day": 2,
            "base": "Rapid City / Badlands",
            "kind": "explore",
            "focus": "A chosen Badlands day route.",
            "itemIds": [
              "LA-0411"
            ]
          },
          {
            "day": 3,
            "base": "Rapid City base",
            "kind": "rest",
            "focus": "Weather or recovery buffer.",
            "itemIds": []
          },
          {
            "day": 4,
            "base": "Rapid City → Custer area",
            "kind": "transfer",
            "focus": "Move to a Black Hills base, with an optional Jewel Cave visit if its appointment fits.",
            "itemIds": [
              "LA-0115"
            ]
          },
          {
            "day": 5,
            "base": "Custer / Hot Springs area",
            "kind": "explore",
            "focus": "Choose a Wind Cave visitor route or another suitable local day.",
            "itemIds": [
              "LA-0121"
            ]
          },
          {
            "day": 6,
            "base": "Black Hills base",
            "kind": "rest",
            "focus": "Rest or short local wandering.",
            "itemIds": []
          },
          {
            "day": 7,
            "base": "Black Hills → northern base",
            "kind": "transfer",
            "focus": "Move toward a northern Black Hills base.",
            "itemIds": []
          },
          {
            "day": 8,
            "base": "Northern Black Hills / Devils Tower",
            "kind": "explore",
            "focus": "A Devils Tower side outing if its actual road leg belongs in the day.",
            "itemIds": [
              "LA-0390"
            ]
          },
          {
            "day": 9,
            "base": "Northern base → Rapid City",
            "kind": "transfer",
            "focus": "Return toward the airport and keep the evening easy.",
            "itemIds": []
          },
          {
            "day": 10,
            "base": "Rapid City → Bay Area airports",
            "kind": "travel",
            "focus": "Full return travel-day buffer.",
            "itemIds": []
          }
        ],
        "routeNote": "Choose SFO, SJC, or OAK based on actual flight service and home-to-airport access. Check the flight and ground-transfer plan before saving dates. Devils Tower is a Wyoming side trip from the northern base. Confirm road legs, cave appointments, and flights; the rest blocks can absorb weather or an inconvenient transfer.",
        "fitnessNote": "Select cave routes and outdoor distances that fit you. The outline leaves breathing room rather than requiring a hike every day.",
        "coverageNote": "Adds a fuller Black Hills loop and a possible Devils Tower day; it remains one regional corridor."
      }
    ]
  },
  {
    "id": "northern-new-mexico-days",
    "title": "Northern New Mexico culture and high desert",
    "regionIds": [
      "new-mexico"
    ],
    "scope": "USA",
    "season": "Approximate: spring or fall for town walks; mountain conditions and community visitor access vary.",
    "theme": "Food, making, and locally interpreted heritage",
    "why": "A four-day Santa Fe base offers a focused cultural break; ten allows Taos and a selected archaeological landscape.",
    "variants": [
      {
        "id": "new-mexico-4",
        "days": 4,
        "title": "Santa Fe, one art-and-food base",
        "mode": "fly",
        "departure": "BayArea",
        "gateways": [
          "ABQ"
        ],
        "travelAllowance": {
          "outbound": "Approximate planning allowance: Reserve roughly 6–10 hours for Bay Area → ABQ and the Santa Fe ground transfer, using a workable itinerary.",
          "basis": "planningassumption",
          "return": "Approximate planning allowance: Reserve roughly 6–10 hours for Santa Fe → ABQ → Bay Area, including airport processes."
        },
        "baseLabels": [
          "Santa Fe"
        ],
        "itemIds": [
          "LA-0053",
          "LA-0057",
          "LA-0237",
          "LA-0203",
          "LA-0217"
        ],
        "outline": [
          {
            "day": 1,
            "base": "Bay Area airports → ABQ → Santa Fe",
            "kind": "travel",
            "focus": "Outbound flight-and-road buffer.",
            "itemIds": []
          },
          {
            "day": 2,
            "base": "Santa Fe",
            "kind": "explore",
            "focus": "Choose the plaza, a museum, or one pottery workshop as a main anchor.",
            "itemIds": [
              "LA-0053",
              "LA-0057",
              "LA-0237"
            ]
          },
          {
            "day": 3,
            "base": "Santa Fe",
            "kind": "explore",
            "focus": "Choose a market visit or a chile/tortilla class, according to actual opening and booking times.",
            "itemIds": [
              "LA-0203",
              "LA-0217"
            ]
          },
          {
            "day": 4,
            "base": "Santa Fe → ABQ → Bay Area airports",
            "kind": "travel",
            "focus": "Road, airport, and return-flight buffer.",
            "itemIds": []
          }
        ],
        "routeNote": "Choose SFO, SJC, or OAK based on actual flight service and home-to-airport access. Check the flight and ground-transfer plan before saving dates. Stay in Santa Fe. Market days and workshops need an actual calendar check before choosing which anchor goes on each day.",
        "fitnessNote": "City walks and supervised making are adjustable; high-desert elevation still merits a gentle arrival.",
        "coverageNote": "Two Santa Fe days; Taos, Bandelier, and more distant New Mexico areas remain future choices."
      },
      {
        "id": "new-mexico-10",
        "days": 10,
        "title": "Albuquerque, Santa Fe, and Taos",
        "mode": "fly",
        "departure": "BayArea",
        "gateways": [
          "ABQ"
        ],
        "travelAllowance": {
          "outbound": "Approximate planning allowance: Reserve roughly 6–10 hours for Bay Area → ABQ and local arrival.",
          "basis": "planningassumption",
          "return": "Approximate planning allowance: Reserve roughly 6–10 hours for ABQ → Bay Area after the northern-route return on day 9."
        },
        "baseLabels": [
          "Albuquerque",
          "Santa Fe",
          "Taos"
        ],
        "itemIds": [
          "LA-0343",
          "LA-0053",
          "LA-0057",
          "LA-0237",
          "LA-0203",
          "LA-0217",
          "LA-0280",
          "LA-0555",
          "LA-0553"
        ],
        "outline": [
          {
            "day": 1,
            "base": "Bay Area airports → Albuquerque",
            "kind": "travel",
            "focus": "Outbound flight and arrival buffer.",
            "itemIds": []
          },
          {
            "day": 2,
            "base": "Albuquerque",
            "kind": "explore",
            "focus": "Explore Old Town and locally presented history.",
            "itemIds": [
              "LA-0343"
            ]
          },
          {
            "day": 3,
            "base": "Albuquerque → Santa Fe",
            "kind": "transfer",
            "focus": "Move to the Santa Fe base, with time for the plaza.",
            "itemIds": [
              "LA-0053"
            ]
          },
          {
            "day": 4,
            "base": "Santa Fe",
            "kind": "explore",
            "focus": "Choose an art or pottery anchor.",
            "itemIds": [
              "LA-0057",
              "LA-0237"
            ]
          },
          {
            "day": 5,
            "base": "Santa Fe",
            "kind": "explore",
            "focus": "Choose the market or a food-making class.",
            "itemIds": [
              "LA-0203",
              "LA-0217"
            ]
          },
          {
            "day": 6,
            "base": "Santa Fe / Bandelier",
            "kind": "explore",
            "focus": "Choose an appropriate Bandelier visitor route.",
            "itemIds": [
              "LA-0280"
            ]
          },
          {
            "day": 7,
            "base": "Santa Fe → Taos",
            "kind": "transfer",
            "focus": "Move to the Taos base, with an optional Chimayó stop if public access fits.",
            "itemIds": [
              "LA-0555"
            ]
          },
          {
            "day": 8,
            "base": "Taos base",
            "kind": "rest",
            "focus": "A slower town day with a possible Taos Pueblo visit through permitted access.",
            "itemIds": [
              "LA-0553"
            ]
          },
          {
            "day": 9,
            "base": "Taos → Albuquerque",
            "kind": "transfer",
            "focus": "Reserve the northern-route return and an easy evening.",
            "itemIds": []
          },
          {
            "day": 10,
            "base": "ABQ → Bay Area airports",
            "kind": "travel",
            "focus": "Return-flight and home-transfer buffer.",
            "itemIds": []
          }
        ],
        "routeNote": "Choose SFO, SJC, or OAK based on actual flight service and home-to-airport access. Check the flight and ground-transfer plan before saving dates. This uses a northern New Mexico corridor. Community sites control their visitor access and may close for their own events; confirm access, roads, and class appointments before fixing days.",
        "fitnessNote": "Choose Bandelier paths by distance and access requirements. The cultural and making days can remain gentle.",
        "coverageNote": "Adds Albuquerque, Bandelier, and Taos; southern New Mexico and Arizona need separate route decisions."
      }
    ]
  },
  {
    "id": "chicago-days",
    "title": "Chicago and a Midwest town loop",
    "regionIds": [
      "chicago"
    ],
    "scope": "USA",
    "season": "Approximate: late spring–fall for outdoor city time; market and performance calendars vary.",
    "theme": "Architecture, museums, food neighborhoods, and small towns",
    "why": "Cross-country transport uses the first and last days. Four days suits one city; ten adds selected regional towns.",
    "variants": [
      {
        "id": "chicago-4",
        "days": 4,
        "title": "Chicago, one city and two local days",
        "mode": "fly",
        "departure": "BayArea",
        "gateways": [
          "ORD",
          "MDW"
        ],
        "travelAllowance": {
          "outbound": "Approximate planning allowance: Reserve roughly 9–14 hours door to door via ORD or MDW, including flight and city-airport access.",
          "basis": "planningassumption",
          "return": "Approximate planning allowance: Reserve roughly 9–14 hours for Chicago → Bay Area; actual flight timing may require a different schedule."
        },
        "baseLabels": [
          "Chicago"
        ],
        "itemIds": [
          "LA-0045",
          "LA-0621",
          "LA-0371",
          "LA-0262"
        ],
        "outline": [
          {
            "day": 1,
            "base": "Bay Area airports → Chicago",
            "kind": "travel",
            "focus": "Full outbound travel-day buffer.",
            "itemIds": []
          },
          {
            "day": 2,
            "base": "Chicago",
            "kind": "explore",
            "focus": "Choose the architecture river experience and a lakefront walk.",
            "itemIds": [
              "LA-0045",
              "LA-0621"
            ]
          },
          {
            "day": 3,
            "base": "Chicago",
            "kind": "explore",
            "focus": "Choose an art museum and a food neighborhood at a comfortable pace.",
            "itemIds": [
              "LA-0371",
              "LA-0262"
            ]
          },
          {
            "day": 4,
            "base": "Chicago → Bay Area airports",
            "kind": "travel",
            "focus": "Full return travel-day buffer.",
            "itemIds": []
          }
        ],
        "routeNote": "Choose SFO, SJC, or OAK based on actual flight service and home-to-airport access. Check the flight and ground-transfer plan before saving dates. ORD and MDW are alternative gateways, not guaranteed services from every Bay Area airport. Keep one Chicago base and check actual flights and ground access.",
        "fitnessNote": "Urban walking can be shortened or mixed with transit and seated experiences.",
        "coverageNote": "A focused Chicago sample with two full local days; it does not cover the Great Lakes region."
      },
      {
        "id": "chicago-10",
        "days": 10,
        "title": "Chicago, Galena, and Madison",
        "mode": "fly",
        "departure": "BayArea",
        "gateways": [
          "ORD",
          "MDW"
        ],
        "travelAllowance": {
          "outbound": "Approximate planning allowance: Reserve roughly 9–14 hours via ORD or MDW and city arrival.",
          "basis": "planningassumption",
          "return": "Approximate planning allowance: Reserve roughly 9–14 hours for the Chicago → Bay Area return, after reaching the gateway area on day 9."
        },
        "baseLabels": [
          "Chicago",
          "Galena",
          "Madison"
        ],
        "itemIds": [
          "LA-0045",
          "LA-0621",
          "LA-0371",
          "LA-0262",
          "LA-0580",
          "LA-0528",
          "LA-0198"
        ],
        "outline": [
          {
            "day": 1,
            "base": "Bay Area airports → Chicago",
            "kind": "travel",
            "focus": "Full outbound travel-day buffer.",
            "itemIds": []
          },
          {
            "day": 2,
            "base": "Chicago",
            "kind": "explore",
            "focus": "Architecture river experience and a suitable lakefront route.",
            "itemIds": [
              "LA-0045",
              "LA-0621"
            ]
          },
          {
            "day": 3,
            "base": "Chicago",
            "kind": "explore",
            "focus": "An art museum and neighborhood food day.",
            "itemIds": [
              "LA-0371",
              "LA-0262"
            ]
          },
          {
            "day": 4,
            "base": "Chicago",
            "kind": "rest",
            "focus": "A slower city day, with an optional improv performance or class.",
            "itemIds": [
              "LA-0580"
            ]
          },
          {
            "day": 5,
            "base": "Chicago → Galena",
            "kind": "transfer",
            "focus": "Move to a chosen Galena base and keep the evening easy.",
            "itemIds": []
          },
          {
            "day": 6,
            "base": "Galena",
            "kind": "explore",
            "focus": "Explore the historic main street and nearby town life.",
            "itemIds": [
              "LA-0528"
            ]
          },
          {
            "day": 7,
            "base": "Galena → Madison",
            "kind": "transfer",
            "focus": "Regional transfer with road breaks.",
            "itemIds": []
          },
          {
            "day": 8,
            "base": "Madison",
            "kind": "explore",
            "focus": "A market-led local day if the farmers market is operating; order the days around its actual calendar.",
            "itemIds": [
              "LA-0198"
            ]
          },
          {
            "day": 9,
            "base": "Madison → Chicago gateway",
            "kind": "transfer",
            "focus": "Return toward the chosen airport, with an easy final evening.",
            "itemIds": []
          },
          {
            "day": 10,
            "base": "Chicago → Bay Area airports",
            "kind": "travel",
            "focus": "Full return travel-day buffer.",
            "itemIds": []
          }
        ],
        "routeNote": "Choose SFO, SJC, or OAK based on actual flight service and home-to-airport access. Check the flight and ground-transfer plan before saving dates. This is an Illinois/Wisconsin town loop using Chicago gateways. Check regional transport, market days, lodging, and actual airport legs before fixing the order.",
        "fitnessNote": "City and town days are adjustable walking experiences, with a slower day built into Chicago.",
        "coverageNote": "Adds Galena and Madison to Chicago. Michigan dunes and other Great Lakes shores would need a separate extension."
      }
    ]
  },
  {
    "id": "new-england-days",
    "title": "Boston and northern New England fall",
    "regionIds": [
      "boston-new-england"
    ],
    "scope": "USA",
    "season": "Approximate: late September–October for foliage; elevation, latitude, and weather shift peak color.",
    "theme": "City beginnings, autumn towns, and optional mountain effort",
    "why": "Four days is a Boston-centered break; ten supplies the road time and weather flexibility for northern foliage areas.",
    "variants": [
      {
        "id": "new-england-4",
        "days": 4,
        "title": "Boston, one autumn city base",
        "mode": "fly",
        "departure": "BayArea",
        "gateways": [
          "BOS"
        ],
        "travelAllowance": {
          "outbound": "Approximate planning allowance: Reserve roughly 10–16 hours door to door for Bay Area → BOS, including airport processes and city arrival.",
          "basis": "planningassumption",
          "return": "Approximate planning allowance: Reserve roughly 10–16 hours for BOS → Bay Area; flight timing and ground access can extend the day."
        },
        "baseLabels": [
          "Boston"
        ],
        "itemIds": [
          "LA-0049",
          "LA-0353",
          "LA-0540",
          "LA-0320"
        ],
        "outline": [
          {
            "day": 1,
            "base": "Bay Area airports → Boston",
            "kind": "travel",
            "focus": "Full outbound travel-day buffer.",
            "itemIds": []
          },
          {
            "day": 2,
            "base": "Boston",
            "kind": "explore",
            "focus": "Choose Beacon Hill and a manageable historic-neighborhood route.",
            "itemIds": [
              "LA-0049",
              "LA-0353"
            ]
          },
          {
            "day": 3,
            "base": "Boston base",
            "kind": "explore",
            "focus": "Choose a science museum or a suitable Walden Pond day outing, using a confirmed transport plan.",
            "itemIds": [
              "LA-0540",
              "LA-0320"
            ]
          },
          {
            "day": 4,
            "base": "Boston → Bay Area airports",
            "kind": "travel",
            "focus": "Full return travel-day buffer.",
            "itemIds": []
          }
        ],
        "routeNote": "Choose SFO, SJC, or OAK based on actual flight service and home-to-airport access. Check the flight and ground-transfer plan before saving dates. Confirm a flight plan that leaves two usable Boston days. Walden is an optional local outing; the default is one Boston base.",
        "fitnessNote": "Neighborhood and museum days can be gentle; choose any outing distance individually.",
        "coverageNote": "A Boston-centered sample. White Mountains and Vermont foliage need the longer route rather than being squeezed into this break."
      },
      {
        "id": "new-england-10",
        "days": 10,
        "title": "White Mountains and Vermont autumn towns",
        "mode": "fly",
        "departure": "BayArea",
        "gateways": [
          "BOS",
          "BTV"
        ],
        "travelAllowance": {
          "outbound": "Approximate planning allowance: Reserve roughly 10–16 hours for Bay Area → BOS and Boston arrival.",
          "basis": "planningassumption",
          "return": "Approximate planning allowance: Reserve roughly 12–18 hours from BTV via a possible connection, or roughly 10–16 hours from BOS; actual schedules may require extra time."
        },
        "baseLabels": [
          "Boston",
          "Conway / White Mountains",
          "Stowe / northern Vermont"
        ],
        "itemIds": [
          "LA-0049",
          "LA-0188",
          "LA-0363",
          "LA-0191",
          "LA-0360",
          "LA-0490"
        ],
        "outline": [
          {
            "day": 1,
            "base": "Bay Area airports → Boston",
            "kind": "travel",
            "focus": "Full outbound travel-day buffer.",
            "itemIds": []
          },
          {
            "day": 2,
            "base": "Boston",
            "kind": "explore",
            "focus": "An easy Beacon Hill and neighborhood day.",
            "itemIds": [
              "LA-0049"
            ]
          },
          {
            "day": 3,
            "base": "Boston → White Mountains",
            "kind": "transfer",
            "focus": "Reserve the northern road transfer with breaks.",
            "itemIds": []
          },
          {
            "day": 4,
            "base": "Conway / White Mountains",
            "kind": "explore",
            "focus": "Choose Kancamagus Highway viewpoints and a suitable walk.",
            "itemIds": [
              "LA-0188"
            ]
          },
          {
            "day": 5,
            "base": "White Mountains base",
            "kind": "explore",
            "focus": "A Mount Washington area outing is optional and weather-dependent; choose the access method deliberately.",
            "itemIds": [
              "LA-0363"
            ]
          },
          {
            "day": 6,
            "base": "White Mountains base",
            "kind": "rest",
            "focus": "Weather or recovery buffer.",
            "itemIds": []
          },
          {
            "day": 7,
            "base": "White Mountains → Stowe area",
            "kind": "transfer",
            "focus": "Move to a chosen northern Vermont base.",
            "itemIds": []
          },
          {
            "day": 8,
            "base": "Stowe / northern Vermont",
            "kind": "explore",
            "focus": "Choose Route 100 towns and autumn scenery.",
            "itemIds": [
              "LA-0191",
              "LA-0360",
              "LA-0490"
            ]
          },
          {
            "day": 9,
            "base": "Vermont base → selected departure gateway",
            "kind": "transfer",
            "focus": "Reserve the gateway repositioning: BTV-area transfer or the longer BOS return, according to the confirmed flight plan. Keep any remaining time easy.",
            "itemIds": []
          },
          {
            "day": 10,
            "base": "BTV or BOS → Bay Area airports",
            "kind": "travel",
            "focus": "Full return travel-day buffer; use the gateway arrangement actually confirmed.",
            "itemIds": []
          }
        ],
        "routeNote": "Choose SFO, SJC, or OAK based on actual flight service and home-to-airport access. Check the flight and ground-transfer plan before saving dates. BOS arrival with BTV departure is conditional on workable one-way flights and vehicle arrangements. A BOS loop uses day 9 for the return road leg. Peak foliage cannot be promised; check current access and local conditions.",
        "fitnessNote": "Mountain effort depends on access method, route, weather, and preparation. A summit is not assumed, and the rest block is deliberate.",
        "coverageNote": "Adds two northern foliage bases; the choice can include meaningful revisits without changing any completed-goal status."
      }
    ]
  },
  {
    "id": "south-florida-days",
    "title": "Miami, the Everglades, and the Keys",
    "regionIds": [
      "south-florida"
    ],
    "scope": "USA",
    "season": "Approximate: the cooler, drier winter-to-spring period; storms, marine conditions, and wildlife access vary.",
    "theme": "City culture, wetland learning, and optional water skills",
    "why": "Four days can sample Miami and one nearby nature choice; ten includes separate Keys bases and a mainland return day.",
    "variants": [
      {
        "id": "florida-4",
        "days": 4,
        "title": "Miami, one city base",
        "mode": "fly",
        "departure": "BayArea",
        "gateways": [
          "MIA",
          "FLL"
        ],
        "travelAllowance": {
          "outbound": "Approximate planning allowance: Reserve roughly 10–16 hours door to door via MIA or FLL, including possible connections and ground access.",
          "basis": "planningassumption",
          "return": "Approximate planning allowance: Reserve roughly 10–16 hours for south Florida → Bay Area; confirm actual same-day travel before choosing this duration."
        },
        "baseLabels": [
          "Miami"
        ],
        "itemIds": [
          "LA-0347",
          "LA-0220",
          "LA-0678"
        ],
        "outline": [
          {
            "day": 1,
            "base": "Bay Area airports → Miami area",
            "kind": "travel",
            "focus": "Full outbound travel-day buffer.",
            "itemIds": []
          },
          {
            "day": 2,
            "base": "Miami",
            "kind": "explore",
            "focus": "Choose neighborhood culture and a manageable local route.",
            "itemIds": [
              "LA-0347"
            ]
          },
          {
            "day": 3,
            "base": "Miami base",
            "kind": "explore",
            "focus": "Choose the tropical garden or one appropriate Everglades gateway outing, depending on transport and conditions.",
            "itemIds": [
              "LA-0220",
              "LA-0678"
            ]
          },
          {
            "day": 4,
            "base": "Miami area → Bay Area airports",
            "kind": "travel",
            "focus": "Full return travel-day buffer.",
            "itemIds": []
          }
        ],
        "routeNote": "Choose SFO, SJC, or OAK based on actual flight service and home-to-airport access. Check the flight and ground-transfer plan before saving dates. MIA and FLL are alternative gateways with different ground transfers. Keep one Miami base, and choose the nature outing only after checking its actual road and visitor arrangements.",
        "fitnessNote": "City and garden outings can be gentle. Everglades effort and exposure depend on the chosen visitor area and activity.",
        "coverageNote": "Two local days from Miami. A Keys chapter needs additional road time and a different base."
      },
      {
        "id": "florida-10",
        "days": 10,
        "title": "Miami and a chosen Florida Keys corridor",
        "mode": "fly",
        "departure": "BayArea",
        "gateways": [
          "MIA",
          "FLL"
        ],
        "travelAllowance": {
          "outbound": "Approximate planning allowance: Reserve roughly 10–16 hours via MIA or FLL and the selected Miami base.",
          "basis": "planningassumption",
          "return": "Approximate planning allowance: Reserve roughly 10–16 hours for MIA/FLL → Bay Area after returning to the mainland on day 9."
        },
        "baseLabels": [
          "Miami",
          "Key Largo / upper Keys",
          "Islamorada or selected lower Keys"
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
        "outline": [
          {
            "day": 1,
            "base": "Bay Area airports → Miami area",
            "kind": "travel",
            "focus": "Full outbound travel-day buffer.",
            "itemIds": []
          },
          {
            "day": 2,
            "base": "Miami",
            "kind": "explore",
            "focus": "Choose neighborhood culture and a manageable city route.",
            "itemIds": [
              "LA-0347"
            ]
          },
          {
            "day": 3,
            "base": "Miami / Coral Gables",
            "kind": "rest",
            "focus": "A slower botanical garden day or rest buffer.",
            "itemIds": [
              "LA-0220"
            ]
          },
          {
            "day": 4,
            "base": "Miami / Everglades gateway",
            "kind": "explore",
            "focus": "Choose one appropriate visitor area or guided nature outing.",
            "itemIds": [
              "LA-0678"
            ]
          },
          {
            "day": 5,
            "base": "Miami → upper Keys",
            "kind": "transfer",
            "focus": "Move to a Key Largo base with time for the road and lodging.",
            "itemIds": []
          },
          {
            "day": 6,
            "base": "Upper Keys",
            "kind": "explore",
            "focus": "Choose John Pennekamp marine learning and a suitable guided beginner snorkel session if conditions fit.",
            "itemIds": [
              "LA-0476",
              "LA-0640"
            ]
          },
          {
            "day": 7,
            "base": "Upper Keys base",
            "kind": "rest",
            "focus": "Weather or recovery buffer.",
            "itemIds": []
          },
          {
            "day": 8,
            "base": "Upper Keys → chosen lower Keys",
            "kind": "transfer",
            "focus": "Choose how far south to go. A Key West/Mallory Square evening is optional if its longer road leg fits the plan.",
            "itemIds": [
              "LA-0332",
              "LA-0088"
            ]
          },
          {
            "day": 9,
            "base": "Chosen Keys base → Miami area",
            "kind": "transfer",
            "focus": "Reserve the mainland return with road breaks.",
            "itemIds": []
          },
          {
            "day": 10,
            "base": "MIA/FLL → Bay Area airports",
            "kind": "travel",
            "focus": "Full return-flight and home-transfer buffer.",
            "itemIds": []
          }
        ],
        "routeNote": "Choose SFO, SJC, or OAK based on actual flight service and home-to-airport access. Check the flight and ground-transfer plan before saving dates. This is a mainland-return structure, not an assumed EYW flight connection. Key Largo, Islamorada, and Key West are distinct choices along a long road corridor; select the southern limit before booking. Check current roads, marine conditions, and providers.",
        "fitnessNote": "Guided water participation is compatible with solo travel and remains optional; use the rest block for weather or comfort.",
        "coverageNote": "Adds an upper-Keys chapter and an optional farther-south base. It does not automatically cover every island or water activity."
      }
    ]
  },
  {
    "id": "alaska-days",
    "title": "An Alaska corridor, with room for weather",
    "regionIds": [
      "alaska"
    ],
    "scope": "USA",
    "season": "Approximate: late spring–early fall for these south-central visitor routes; transport and tours may be seasonal.",
    "theme": "City learning, glacier landscapes, and supported nature outings",
    "why": "The short option stays in Anchorage. Ten days makes south-central transfers possible without treating Alaska as one compact destination.",
    "variants": [
      {
        "id": "alaska-4",
        "days": 4,
        "title": "Anchorage, one Alaska introduction",
        "mode": "fly",
        "departure": "BayArea",
        "gateways": [
          "ANC"
        ],
        "travelAllowance": {
          "outbound": "Approximate planning allowance: Reserve roughly 8–13 hours door to door via ANC with a workable itinerary; connections can extend this.",
          "basis": "planningassumption",
          "return": "Approximate planning allowance: Reserve roughly 8–13 hours for ANC → Bay Area, including airport and home transfers."
        },
        "baseLabels": [
          "Anchorage"
        ],
        "itemIds": [
          "LA-0279",
          "LA-0352"
        ],
        "outline": [
          {
            "day": 1,
            "base": "Bay Area airports → Anchorage",
            "kind": "travel",
            "focus": "Full outbound travel-day buffer.",
            "itemIds": []
          },
          {
            "day": 2,
            "base": "Anchorage",
            "kind": "explore",
            "focus": "Learn through the Alaska Native Heritage Center’s public visitor program.",
            "itemIds": [
              "LA-0279"
            ]
          },
          {
            "day": 3,
            "base": "Anchorage",
            "kind": "explore",
            "focus": "Choose city trails and a manageable local outing.",
            "itemIds": [
              "LA-0352"
            ]
          },
          {
            "day": 4,
            "base": "Anchorage → Bay Area airports",
            "kind": "travel",
            "focus": "Full return travel-day buffer.",
            "itemIds": []
          }
        ],
        "routeNote": "Choose SFO, SJC, or OAK based on actual flight service and home-to-airport access. Check the flight and ground-transfer plan before saving dates. Use one Anchorage base. The four-day option depends on actual flights leaving two usable local days; extend it if the schedule requires overnight connections.",
        "fitnessNote": "Choose local trail distance and support individually; city learning can remain gentle.",
        "coverageNote": "An Anchorage introduction. Denali, Seward, southeast Alaska, and remote fly-in areas are separate commitments."
      },
      {
        "id": "alaska-10",
        "days": 10,
        "title": "Anchorage, Seward, and a Talkeetna option",
        "mode": "fly",
        "departure": "BayArea",
        "gateways": [
          "ANC"
        ],
        "travelAllowance": {
          "outbound": "Approximate planning allowance: Reserve roughly 8–13 hours for Bay Area → ANC and city arrival; connections can make this longer.",
          "basis": "planningassumption",
          "return": "Approximate planning allowance: Reserve roughly 8–13 hours for ANC → Bay Area after returning to Anchorage on day 9."
        },
        "baseLabels": [
          "Anchorage",
          "Seward",
          "Talkeetna"
        ],
        "itemIds": [
          "LA-0279",
          "LA-0352",
          "LA-0465",
          "LA-0230",
          "LA-0235",
          "LA-0533",
          "LA-0006"
        ],
        "outline": [
          {
            "day": 1,
            "base": "Bay Area airports → Anchorage",
            "kind": "travel",
            "focus": "Full outbound travel-day buffer.",
            "itemIds": []
          },
          {
            "day": 2,
            "base": "Anchorage",
            "kind": "explore",
            "focus": "Choose the public heritage-center program and city learning.",
            "itemIds": [
              "LA-0279",
              "LA-0352"
            ]
          },
          {
            "day": 3,
            "base": "Anchorage → Seward",
            "kind": "transfer",
            "focus": "Choose the road or a currently operating Coastal Classic rail service; verify the timetable and onward arrangements.",
            "itemIds": [
              "LA-0465"
            ]
          },
          {
            "day": 4,
            "base": "Seward",
            "kind": "explore",
            "focus": "Choose an appropriate Exit Glacier area route.",
            "itemIds": [
              "LA-0230"
            ]
          },
          {
            "day": 5,
            "base": "Seward",
            "kind": "explore",
            "focus": "A Kenai Fjords cruise is optional and weather/provider-dependent.",
            "itemIds": [
              "LA-0235"
            ]
          },
          {
            "day": 6,
            "base": "Seward",
            "kind": "rest",
            "focus": "Weather/rest buffer with an optional Alaska SeaLife Center visit.",
            "itemIds": [
              "LA-0533"
            ]
          },
          {
            "day": 7,
            "base": "Seward → Talkeetna corridor",
            "kind": "transfer",
            "focus": "Reserve a substantial road-transfer day through the Anchorage corridor.",
            "itemIds": []
          },
          {
            "day": 8,
            "base": "Talkeetna base",
            "kind": "explore",
            "focus": "Licensed glacier flightseeing is an optional weather-dependent choice; a quiet local day can replace it.",
            "itemIds": [
              "LA-0006"
            ]
          },
          {
            "day": 9,
            "base": "Talkeetna → Anchorage",
            "kind": "transfer",
            "focus": "Return toward the airport with room for transport or weather recovery.",
            "itemIds": []
          },
          {
            "day": 10,
            "base": "Anchorage → Bay Area airports",
            "kind": "travel",
            "focus": "Full return travel-day buffer.",
            "itemIds": []
          }
        ],
        "routeNote": "Choose SFO, SJC, or OAK based on actual flight service and home-to-airport access. Check the flight and ground-transfer plan before saving dates. This is one south-central Alaska corridor with a northern side option. Confirm seasonal rail/road arrangements, actual transfer legs, tour operations, and backup lodging. Cruises and flightseeing cannot be guaranteed; the rest block is intentional.",
        "fitnessNote": "Exit Glacier route length changes effort. Cruise and flightseeing are supported outings rather than inferred strenuous goals; guides fit solo travel.",
        "coverageNote": "Adds Seward and a Talkeetna option. Denali park days, southeast Alaska, and remote fly-in destinations require different route decisions."
      }
    ]
  }
];
