/* Curated finite 5/9-day route templates. Approximate bases, not bookings or exact venue coordinates. Actual coverage is added only after target-specific slots fit the day budgets. */
window.LIFE_COVERAGE_TRIPS = [
  {
    "id": "yosemite-sierra-5",
    "familyId": "yosemite-sierra",
    "title": "Yosemite Valley from one gateway · 5 days",
    "country": "United States",
    "scope": "USA",
    "days": 5,
    "ptoDays": 3,
    "hubIds": [
      "yosemite"
    ],
    "baseLabels": [
      "Yosemite Valley gateway"
    ],
    "basePoints": [
      {
        "lat": 37.75,
        "lon": -119.59,
        "label": "Yosemite Valley gateway",
        "precision": "city area"
      }
    ],
    "gateways": [
      "FAT",
      "Bay Area drive"
    ],
    "travelDays": 2,
    "transferDays": 0,
    "restDays": 0,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 90,
    "candidateItemIds": [],
    "season": "Approximate: late spring to fall according to park access",
    "routeNote": "A five-day outline uses one Yosemite gateway; nine days can add Sequoia. Half Dome is not credited without a separate permit/conditioning plan.",
    "assumptions": "5 consecutive calendar days from the Bay Area; 3 weekday PTO days before any holiday/WFH arrangement. 2 travel/arrival/jetlag buffer days, 0 base-change day, 0 rest day. One country, at most 1 overnight base(s). Door-to-door timing and site/program access still need checking."
  },
  {
    "id": "yosemite-sierra-9",
    "familyId": "yosemite-sierra",
    "title": "Yosemite and a western-Sierra choice · 9 days",
    "country": "United States",
    "scope": "USA",
    "days": 9,
    "ptoDays": 5,
    "hubIds": [
      "yosemite"
    ],
    "baseLabels": [
      "Yosemite Valley gateway",
      "Three Rivers / Sequoia"
    ],
    "basePoints": [
      {
        "lat": 37.75,
        "lon": -119.59,
        "label": "Yosemite Valley gateway",
        "precision": "city area"
      },
      {
        "lat": 36.44,
        "lon": -118.9,
        "label": "Three Rivers / Sequoia",
        "precision": "city area"
      }
    ],
    "gateways": [
      "FAT",
      "Bay Area drive"
    ],
    "travelDays": 2,
    "transferDays": 1,
    "restDays": 1,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 190,
    "candidateItemIds": [
      "LA-0419",
      "LA-0111"
    ],
    "season": "Approximate: late spring to fall according to park access",
    "routeNote": "A five-day outline uses one Yosemite gateway; nine days can add Sequoia. Half Dome is not credited without a separate permit/conditioning plan.",
    "assumptions": "9 consecutive calendar days from the Bay Area; 5 weekday PTO days before any holiday/WFH arrangement. 2 travel/arrival/jetlag buffer days, 1 base-change day, 1 rest day. One country, at most 2 overnight base(s). Door-to-door timing and site/program access still need checking."
  },
  {
    "id": "north-california-5",
    "familyId": "north-california",
    "title": "Redwood coast from Crescent City · 5 days",
    "country": "United States",
    "scope": "USA",
    "days": 5,
    "ptoDays": 3,
    "hubIds": [],
    "baseLabels": [
      "Crescent City / redwoods"
    ],
    "basePoints": [
      {
        "lat": 41.76,
        "lon": -124.2,
        "label": "Crescent City / redwoods",
        "precision": "city area"
      }
    ],
    "gateways": [
      "ACV",
      "RDD",
      "Bay Area drive"
    ],
    "travelDays": 2,
    "transferDays": 0,
    "restDays": 0,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 90,
    "candidateItemIds": [
      "LA-0161",
      "LA-0404"
    ],
    "season": "Approximate: late spring through early fall",
    "routeNote": "Coast and inland forest/mountain sectors require real drives; focus on the redwoods in five days.",
    "assumptions": "5 consecutive calendar days from the Bay Area; 3 weekday PTO days before any holiday/WFH arrangement. 2 travel/arrival/jetlag buffer days, 0 base-change day, 0 rest day. One country, at most 1 overnight base(s). Door-to-door timing and site/program access still need checking."
  },
  {
    "id": "north-california-9",
    "familyId": "north-california",
    "title": "Northern California forest corridor · 9 days",
    "country": "United States",
    "scope": "USA",
    "days": 9,
    "ptoDays": 5,
    "hubIds": [],
    "baseLabels": [
      "Crescent City / redwoods",
      "Mount Shasta"
    ],
    "basePoints": [
      {
        "lat": 41.76,
        "lon": -124.2,
        "label": "Crescent City / redwoods",
        "precision": "city area"
      },
      {
        "lat": 41.31,
        "lon": -122.31,
        "label": "Mount Shasta",
        "precision": "city area"
      }
    ],
    "gateways": [
      "ACV",
      "RDD",
      "Bay Area drive"
    ],
    "travelDays": 2,
    "transferDays": 1,
    "restDays": 1,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 190,
    "candidateItemIds": [
      "LA-0161",
      "LA-0404",
      "LA-0557",
      "LA-0633"
    ],
    "season": "Approximate: late spring through early fall",
    "routeNote": "Coast and inland forest/mountain sectors require real drives; focus on the redwoods in five days.",
    "assumptions": "9 consecutive calendar days from the Bay Area; 5 weekday PTO days before any holiday/WFH arrangement. 2 travel/arrival/jetlag buffer days, 1 base-change day, 1 rest day. One country, at most 2 overnight base(s). Door-to-door timing and site/program access still need checking."
  },
  {
    "id": "tetons-yellowstone-5",
    "familyId": "tetons-yellowstone",
    "title": "Grand Teton from a Jackson base · 5 days",
    "country": "United States",
    "scope": "USA",
    "days": 5,
    "ptoDays": 3,
    "hubIds": [
      "yellowstone-tetons"
    ],
    "baseLabels": [
      "Jackson / Grand Teton"
    ],
    "basePoints": [
      {
        "lat": 43.48,
        "lon": -110.76,
        "label": "Jackson / Grand Teton",
        "precision": "city area"
      }
    ],
    "gateways": [
      "JAC",
      "BZN"
    ],
    "travelDays": 2,
    "transferDays": 0,
    "restDays": 0,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 90,
    "candidateItemIds": [],
    "season": "Approximate: summer/early fall for broad road access",
    "routeNote": "Five days is a Teton base; a nine-day option adds a Yellowstone sector. It does not cover all park activities.",
    "assumptions": "5 consecutive calendar days from the Bay Area; 3 weekday PTO days before any holiday/WFH arrangement. 2 travel/arrival/jetlag buffer days, 0 base-change day, 0 rest day. One country, at most 1 overnight base(s). Door-to-door timing and site/program access still need checking."
  },
  {
    "id": "tetons-yellowstone-9",
    "familyId": "tetons-yellowstone",
    "title": "Grand Teton and a Yellowstone chapter · 9 days",
    "country": "United States",
    "scope": "USA",
    "days": 9,
    "ptoDays": 5,
    "hubIds": [
      "yellowstone-tetons"
    ],
    "baseLabels": [
      "Jackson / Grand Teton",
      "Yellowstone gateway"
    ],
    "basePoints": [
      {
        "lat": 43.48,
        "lon": -110.76,
        "label": "Jackson / Grand Teton",
        "precision": "city area"
      },
      {
        "lat": 44.66,
        "lon": -111.1,
        "label": "Yellowstone gateway",
        "precision": "city area"
      }
    ],
    "gateways": [
      "JAC",
      "BZN"
    ],
    "travelDays": 2,
    "transferDays": 1,
    "restDays": 1,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 190,
    "candidateItemIds": [],
    "season": "Approximate: summer/early fall for broad road access",
    "routeNote": "Five days is a Teton base; a nine-day option adds a Yellowstone sector. It does not cover all park activities.",
    "assumptions": "9 consecutive calendar days from the Bay Area; 5 weekday PTO days before any holiday/WFH arrangement. 2 travel/arrival/jetlag buffer days, 1 base-change day, 1 rest day. One country, at most 2 overnight base(s). Door-to-door timing and site/program access still need checking."
  },
  {
    "id": "utah-redrock-5",
    "familyId": "utah-redrock",
    "title": "Capitol Reef and a chosen Byway 12 section · 5 days",
    "country": "United States",
    "scope": "USA",
    "days": 5,
    "ptoDays": 3,
    "hubIds": [
      "southern-utah"
    ],
    "baseLabels": [
      "Torrey / Capitol Reef"
    ],
    "basePoints": [
      {
        "lat": 38.3,
        "lon": -111.42,
        "label": "Torrey / Capitol Reef",
        "precision": "city area"
      }
    ],
    "gateways": [
      "SLC",
      "LAS"
    ],
    "travelDays": 2,
    "transferDays": 0,
    "restDays": 0,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 90,
    "candidateItemIds": [],
    "season": "Approximate: spring/fall; elevation and road conditions vary",
    "routeNote": "Choose the airport/road approach for Torrey. A Byway 12 goal needs its own substantial scenic-drive allocation, not merely staying in Utah.",
    "assumptions": "5 consecutive calendar days from the Bay Area; 3 weekday PTO days before any holiday/WFH arrangement. 2 travel/arrival/jetlag buffer days, 0 base-change day, 0 rest day. One country, at most 1 overnight base(s). Door-to-door timing and site/program access still need checking.",
    "fullDayItemIds": [
      "LA-0463"
    ]
  },
  {
    "id": "utah-redrock-9",
    "familyId": "utah-redrock",
    "title": "Capitol Reef and a southern-Utah chapter · 9 days",
    "country": "United States",
    "scope": "USA",
    "days": 9,
    "ptoDays": 5,
    "hubIds": [
      "southern-utah"
    ],
    "baseLabels": [
      "Torrey / Capitol Reef",
      "Springdale / Zion"
    ],
    "basePoints": [
      {
        "lat": 38.3,
        "lon": -111.42,
        "label": "Torrey / Capitol Reef",
        "precision": "city area"
      },
      {
        "lat": 37.19,
        "lon": -113.0,
        "label": "Springdale / Zion",
        "precision": "city area"
      }
    ],
    "gateways": [
      "SLC",
      "LAS"
    ],
    "travelDays": 2,
    "transferDays": 1,
    "restDays": 1,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 190,
    "candidateItemIds": [],
    "season": "Approximate: spring/fall; elevation and road conditions vary",
    "routeNote": "Choose the airport/road approach for Torrey. A Byway 12 goal needs its own substantial scenic-drive allocation, not merely staying in Utah.",
    "assumptions": "9 consecutive calendar days from the Bay Area; 5 weekday PTO days before any holiday/WFH arrangement. 2 travel/arrival/jetlag buffer days, 1 base-change day, 1 rest day. One country, at most 2 overnight base(s). Door-to-door timing and site/program access still need checking.",
    "fullDayItemIds": [
      "LA-0463"
    ]
  },
  {
    "id": "blackhills-5",
    "familyId": "blackhills",
    "title": "Black Hills and Badlands · 5 days",
    "country": "United States",
    "scope": "USA",
    "days": 5,
    "ptoDays": 3,
    "hubIds": [
      "black-hills"
    ],
    "baseLabels": [
      "Rapid City / Badlands"
    ],
    "basePoints": [
      {
        "lat": 44.08,
        "lon": -103.23,
        "label": "Rapid City / Badlands",
        "precision": "city area"
      }
    ],
    "gateways": [
      "RAP"
    ],
    "travelDays": 2,
    "transferDays": 0,
    "restDays": 0,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 90,
    "candidateItemIds": [],
    "season": "Approximate: late spring through early fall",
    "routeNote": "Choose a compact Badlands/Black Hills sector; cave tours and winter access need checking.",
    "assumptions": "5 consecutive calendar days from the Bay Area; 3 weekday PTO days before any holiday/WFH arrangement. 2 travel/arrival/jetlag buffer days, 0 base-change day, 0 rest day. One country, at most 1 overnight base(s). Door-to-door timing and site/program access still need checking."
  },
  {
    "id": "blackhills-9",
    "familyId": "blackhills",
    "title": "Black Hills and Badlands · 9 days",
    "country": "United States",
    "scope": "USA",
    "days": 9,
    "ptoDays": 5,
    "hubIds": [
      "black-hills"
    ],
    "baseLabels": [
      "Rapid City / Badlands",
      "Custer"
    ],
    "basePoints": [
      {
        "lat": 44.08,
        "lon": -103.23,
        "label": "Rapid City / Badlands",
        "precision": "city area"
      },
      {
        "lat": 43.77,
        "lon": -103.6,
        "label": "Custer",
        "precision": "city area"
      }
    ],
    "gateways": [
      "RAP"
    ],
    "travelDays": 2,
    "transferDays": 1,
    "restDays": 1,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 190,
    "candidateItemIds": [],
    "season": "Approximate: late spring through early fall",
    "routeNote": "Choose a compact Badlands/Black Hills sector; cave tours and winter access need checking.",
    "assumptions": "9 consecutive calendar days from the Bay Area; 5 weekday PTO days before any holiday/WFH arrangement. 2 travel/arrival/jetlag buffer days, 1 base-change day, 1 rest day. One country, at most 2 overnight base(s). Door-to-door timing and site/program access still need checking."
  },
  {
    "id": "glacier-5",
    "familyId": "glacier",
    "title": "Glacier and Flathead Valley · 5 days",
    "country": "United States",
    "scope": "USA",
    "days": 5,
    "ptoDays": 3,
    "hubIds": [
      "glacier"
    ],
    "baseLabels": [
      "West Glacier / Kalispell"
    ],
    "basePoints": [
      {
        "lat": 48.2,
        "lon": -114.32,
        "label": "West Glacier / Kalispell",
        "precision": "city area"
      }
    ],
    "gateways": [
      "FCA"
    ],
    "travelDays": 2,
    "transferDays": 0,
    "restDays": 0,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 90,
    "candidateItemIds": [],
    "season": "Approximate: summer/early fall for broad mountain-road access",
    "routeNote": "Road opening, entry rules and specific trails determine what fits; no whole-park completion is inferred.",
    "assumptions": "5 consecutive calendar days from the Bay Area; 3 weekday PTO days before any holiday/WFH arrangement. 2 travel/arrival/jetlag buffer days, 0 base-change day, 0 rest day. One country, at most 1 overnight base(s). Door-to-door timing and site/program access still need checking."
  },
  {
    "id": "glacier-9",
    "familyId": "glacier",
    "title": "Glacier and Flathead Valley · 9 days",
    "country": "United States",
    "scope": "USA",
    "days": 9,
    "ptoDays": 5,
    "hubIds": [
      "glacier"
    ],
    "baseLabels": [
      "West Glacier / Kalispell"
    ],
    "basePoints": [
      {
        "lat": 48.2,
        "lon": -114.32,
        "label": "West Glacier / Kalispell",
        "precision": "city area"
      }
    ],
    "gateways": [
      "FCA"
    ],
    "travelDays": 2,
    "transferDays": 0,
    "restDays": 1,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 190,
    "candidateItemIds": [],
    "season": "Approximate: summer/early fall for broad mountain-road access",
    "routeNote": "Road opening, entry rules and specific trails determine what fits; no whole-park completion is inferred.",
    "assumptions": "9 consecutive calendar days from the Bay Area; 5 weekday PTO days before any holiday/WFH arrangement. 2 travel/arrival/jetlag buffer days, 0 base-change day, 1 rest day. One country, at most 1 overnight base(s). Door-to-door timing and site/program access still need checking."
  },
  {
    "id": "florida-south-5",
    "familyId": "florida-south",
    "title": "Miami and an Everglades chapter · 5 days",
    "country": "United States",
    "scope": "USA",
    "days": 5,
    "ptoDays": 3,
    "hubIds": [
      "miami"
    ],
    "baseLabels": [
      "Miami / Everglades gateway"
    ],
    "basePoints": [
      {
        "lat": 25.76,
        "lon": -80.19,
        "label": "Miami / Everglades gateway",
        "precision": "city area"
      }
    ],
    "gateways": [
      "MIA",
      "FLL"
    ],
    "travelDays": 2,
    "transferDays": 0,
    "restDays": 0,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 90,
    "candidateItemIds": [],
    "season": "Approximate: winter/spring; storms and marine conditions vary",
    "routeNote": "A short trip uses the mainland; nine days can add upper Keys. No automatic reef or wildlife encounter.",
    "assumptions": "5 consecutive calendar days from the Bay Area; 3 weekday PTO days before any holiday/WFH arrangement. 2 travel/arrival/jetlag buffer days, 0 base-change day, 0 rest day. One country, at most 1 overnight base(s). Door-to-door timing and site/program access still need checking."
  },
  {
    "id": "florida-south-9",
    "familyId": "florida-south",
    "title": "Miami and an Everglades chapter · 9 days",
    "country": "United States",
    "scope": "USA",
    "days": 9,
    "ptoDays": 5,
    "hubIds": [
      "miami",
      "florida-keys"
    ],
    "baseLabels": [
      "Miami / Everglades gateway",
      "Key Largo"
    ],
    "basePoints": [
      {
        "lat": 25.76,
        "lon": -80.19,
        "label": "Miami / Everglades gateway",
        "precision": "city area"
      },
      {
        "lat": 25.09,
        "lon": -80.45,
        "label": "Key Largo",
        "precision": "city area"
      }
    ],
    "gateways": [
      "MIA",
      "FLL"
    ],
    "travelDays": 2,
    "transferDays": 1,
    "restDays": 1,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 190,
    "candidateItemIds": [],
    "season": "Approximate: winter/spring; storms and marine conditions vary",
    "routeNote": "A short trip uses the mainland; nine days can add upper Keys. No automatic reef or wildlife encounter.",
    "assumptions": "9 consecutive calendar days from the Bay Area; 5 weekday PTO days before any holiday/WFH arrangement. 2 travel/arrival/jetlag buffer days, 1 base-change day, 1 rest day. One country, at most 2 overnight base(s). Door-to-door timing and site/program access still need checking."
  },
  {
    "id": "chicago-5",
    "familyId": "chicago",
    "title": "Chicago architecture, art and neighborhoods · 5 days",
    "country": "United States",
    "scope": "USA",
    "days": 5,
    "ptoDays": 3,
    "hubIds": [
      "chicago"
    ],
    "baseLabels": [
      "Chicago"
    ],
    "basePoints": [
      {
        "lat": 41.88,
        "lon": -87.63,
        "label": "Chicago",
        "precision": "city area"
      }
    ],
    "gateways": [
      "ORD",
      "MDW"
    ],
    "travelDays": 2,
    "transferDays": 0,
    "restDays": 0,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 90,
    "candidateItemIds": [],
    "season": "Approximate: late spring through fall; indoor culture works in winter",
    "routeNote": "Only explicit museums, river/architecture and other selected slots count. A city visit does not satisfy all Chicago goals.",
    "assumptions": "5 consecutive calendar days from the Bay Area; 3 weekday PTO days before any holiday/WFH arrangement. 2 travel/arrival/jetlag buffer days, 0 base-change day, 0 rest day. One country, at most 1 overnight base(s). Door-to-door timing and site/program access still need checking."
  },
  {
    "id": "chicago-9",
    "familyId": "chicago",
    "title": "Chicago and a chosen Midwest extension · 9 days",
    "country": "United States",
    "scope": "USA",
    "days": 9,
    "ptoDays": 5,
    "hubIds": [
      "chicago"
    ],
    "baseLabels": [
      "Chicago",
      "Madison"
    ],
    "basePoints": [
      {
        "lat": 41.88,
        "lon": -87.63,
        "label": "Chicago",
        "precision": "city area"
      },
      {
        "lat": 43.07,
        "lon": -89.4,
        "label": "Madison",
        "precision": "city area"
      }
    ],
    "gateways": [
      "ORD",
      "MDW"
    ],
    "travelDays": 2,
    "transferDays": 1,
    "restDays": 1,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 190,
    "candidateItemIds": [],
    "season": "Approximate: late spring through fall; indoor culture works in winter",
    "routeNote": "Only explicit museums, river/architecture and other selected slots count. A city visit does not satisfy all Chicago goals.",
    "assumptions": "9 consecutive calendar days from the Bay Area; 5 weekday PTO days before any holiday/WFH arrangement. 2 travel/arrival/jetlag buffer days, 1 base-change day, 1 rest day. One country, at most 2 overnight base(s). Door-to-door timing and site/program access still need checking."
  },
  {
    "id": "newmexico-north-5",
    "familyId": "newmexico-north",
    "title": "Santa Fe art, food and history · 5 days",
    "country": "United States",
    "scope": "USA",
    "days": 5,
    "ptoDays": 3,
    "hubIds": [
      "northern-new-mexico"
    ],
    "baseLabels": [
      "Santa Fe"
    ],
    "basePoints": [
      {
        "lat": 35.69,
        "lon": -105.94,
        "label": "Santa Fe",
        "precision": "city area"
      }
    ],
    "gateways": [
      "ABQ",
      "SAF"
    ],
    "travelDays": 2,
    "transferDays": 0,
    "restDays": 0,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 90,
    "candidateItemIds": [],
    "season": "Approximate: spring/fall; winter snow and visitor rules vary",
    "routeNote": "Use a compact northern-New-Mexico route. Pueblo/public cultural access and program dates need checking.",
    "assumptions": "5 consecutive calendar days from the Bay Area; 3 weekday PTO days before any holiday/WFH arrangement. 2 travel/arrival/jetlag buffer days, 0 base-change day, 0 rest day. One country, at most 1 overnight base(s). Door-to-door timing and site/program access still need checking."
  },
  {
    "id": "newmexico-north-9",
    "familyId": "newmexico-north",
    "title": "Santa Fe and a Taos chapter · 9 days",
    "country": "United States",
    "scope": "USA",
    "days": 9,
    "ptoDays": 5,
    "hubIds": [
      "northern-new-mexico"
    ],
    "baseLabels": [
      "Santa Fe",
      "Taos"
    ],
    "basePoints": [
      {
        "lat": 35.69,
        "lon": -105.94,
        "label": "Santa Fe",
        "precision": "city area"
      },
      {
        "lat": 36.41,
        "lon": -105.57,
        "label": "Taos",
        "precision": "city area"
      }
    ],
    "gateways": [
      "ABQ",
      "SAF"
    ],
    "travelDays": 2,
    "transferDays": 1,
    "restDays": 1,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 190,
    "candidateItemIds": [],
    "season": "Approximate: spring/fall; winter snow and visitor rules vary",
    "routeNote": "Use a compact northern-New-Mexico route. Pueblo/public cultural access and program dates need checking.",
    "assumptions": "9 consecutive calendar days from the Bay Area; 5 weekday PTO days before any holiday/WFH arrangement. 2 travel/arrival/jetlag buffer days, 1 base-change day, 1 rest day. One country, at most 2 overnight base(s). Door-to-door timing and site/program access still need checking."
  },
  {
    "id": "washington-dc-5",
    "familyId": "washington-dc",
    "title": "Washington and nearby public-history choices · 5 days",
    "country": "United States",
    "scope": "USA",
    "days": 5,
    "ptoDays": 3,
    "hubIds": [
      "washington-dc"
    ],
    "baseLabels": [
      "Washington, DC"
    ],
    "basePoints": [
      {
        "lat": 38.91,
        "lon": -77.04,
        "label": "Washington, DC",
        "precision": "city area"
      }
    ],
    "gateways": [
      "DCA",
      "IAD",
      "BWI"
    ],
    "travelDays": 2,
    "transferDays": 0,
    "restDays": 0,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 90,
    "candidateItemIds": [],
    "season": "Approximate: spring/fall; city museums work year-round",
    "routeNote": "A Library of Congress reading-room goal gets its own slot and access research; being on the National Mall is not equivalent.",
    "assumptions": "5 consecutive calendar days from the Bay Area; 3 weekday PTO days before any holiday/WFH arrangement. 2 travel/arrival/jetlag buffer days, 0 base-change day, 0 rest day. One country, at most 1 overnight base(s). Door-to-door timing and site/program access still need checking."
  },
  {
    "id": "washington-dc-9",
    "familyId": "washington-dc",
    "title": "Washington and nearby public-history choices · 9 days",
    "country": "United States",
    "scope": "USA",
    "days": 9,
    "ptoDays": 5,
    "hubIds": [
      "washington-dc"
    ],
    "baseLabels": [
      "Washington, DC"
    ],
    "basePoints": [
      {
        "lat": 38.91,
        "lon": -77.04,
        "label": "Washington, DC",
        "precision": "city area"
      }
    ],
    "gateways": [
      "DCA",
      "IAD",
      "BWI"
    ],
    "travelDays": 2,
    "transferDays": 0,
    "restDays": 1,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 190,
    "candidateItemIds": [],
    "season": "Approximate: spring/fall; city museums work year-round",
    "routeNote": "A Library of Congress reading-room goal gets its own slot and access research; being on the National Mall is not equivalent.",
    "assumptions": "9 consecutive calendar days from the Bay Area; 5 weekday PTO days before any holiday/WFH arrangement. 2 travel/arrival/jetlag buffer days, 0 base-change day, 1 rest day. One country, at most 1 overnight base(s). Door-to-door timing and site/program access still need checking."
  },
  {
    "id": "newyork-5",
    "familyId": "newyork",
    "title": "New York City museums and living culture · 5 days",
    "country": "United States",
    "scope": "USA",
    "days": 5,
    "ptoDays": 3,
    "hubIds": [
      "new-york"
    ],
    "baseLabels": [
      "New York City"
    ],
    "basePoints": [
      {
        "lat": 40.71,
        "lon": -74.01,
        "label": "New York City",
        "precision": "city area"
      }
    ],
    "gateways": [
      "JFK",
      "LGA",
      "EWR"
    ],
    "travelDays": 2,
    "transferDays": 0,
    "restDays": 0,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 90,
    "candidateItemIds": [],
    "season": "Approximate: year-round culture; weather changes walking plans",
    "routeNote": "Metropolitan Museum, Tenement Museum and Broadway are separate explicit opportunities; familiar-city history is not completion.",
    "assumptions": "5 consecutive calendar days from the Bay Area; 3 weekday PTO days before any holiday/WFH arrangement. 2 travel/arrival/jetlag buffer days, 0 base-change day, 0 rest day. One country, at most 1 overnight base(s). Door-to-door timing and site/program access still need checking."
  },
  {
    "id": "newyork-9",
    "familyId": "newyork",
    "title": "New York and a selected nearby chapter · 9 days",
    "country": "United States",
    "scope": "USA",
    "days": 9,
    "ptoDays": 5,
    "hubIds": [
      "new-york"
    ],
    "baseLabels": [
      "New York City"
    ],
    "basePoints": [
      {
        "lat": 40.71,
        "lon": -74.01,
        "label": "New York City",
        "precision": "city area"
      }
    ],
    "gateways": [
      "JFK",
      "LGA",
      "EWR"
    ],
    "travelDays": 2,
    "transferDays": 0,
    "restDays": 1,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 190,
    "candidateItemIds": [],
    "season": "Approximate: year-round culture; weather changes walking plans",
    "routeNote": "Metropolitan Museum, Tenement Museum and Broadway are separate explicit opportunities; familiar-city history is not completion.",
    "assumptions": "9 consecutive calendar days from the Bay Area; 5 weekday PTO days before any holiday/WFH arrangement. 2 travel/arrival/jetlag buffer days, 0 base-change day, 1 rest day. One country, at most 1 overnight base(s). Door-to-door timing and site/program access still need checking."
  },
  {
    "id": "mesa-verde-5",
    "familyId": "mesa-verde",
    "title": "Mesa Verde and Durango · 5 days",
    "country": "United States",
    "scope": "USA",
    "days": 5,
    "ptoDays": 3,
    "hubIds": [],
    "baseLabels": [
      "Cortez / Mesa Verde"
    ],
    "basePoints": [
      {
        "lat": 37.35,
        "lon": -108.59,
        "label": "Cortez / Mesa Verde",
        "precision": "city area"
      }
    ],
    "gateways": [
      "DRO"
    ],
    "travelDays": 2,
    "transferDays": 0,
    "restDays": 0,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 90,
    "candidateItemIds": [
      "LA-0278",
      "LA-0286",
      "LA-0471"
    ],
    "season": "Approximate: late spring through fall; tour access varies",
    "routeNote": "Mesa Verde is a separate southwestern-Colorado trip, not a Denver day trip. Specific tours require current access checks.",
    "assumptions": "5 consecutive calendar days from the Bay Area; 3 weekday PTO days before any holiday/WFH arrangement. 2 travel/arrival/jetlag buffer days, 0 base-change day, 0 rest day. One country, at most 1 overnight base(s). Door-to-door timing and site/program access still need checking."
  },
  {
    "id": "mesa-verde-9",
    "familyId": "mesa-verde",
    "title": "Mesa Verde and Durango · 9 days",
    "country": "United States",
    "scope": "USA",
    "days": 9,
    "ptoDays": 5,
    "hubIds": [],
    "baseLabels": [
      "Cortez / Mesa Verde",
      "Durango"
    ],
    "basePoints": [
      {
        "lat": 37.35,
        "lon": -108.59,
        "label": "Cortez / Mesa Verde",
        "precision": "city area"
      },
      {
        "lat": 37.28,
        "lon": -107.88,
        "label": "Durango",
        "precision": "city area"
      }
    ],
    "gateways": [
      "DRO"
    ],
    "travelDays": 2,
    "transferDays": 1,
    "restDays": 1,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 190,
    "candidateItemIds": [
      "LA-0278",
      "LA-0286",
      "LA-0471"
    ],
    "season": "Approximate: late spring through fall; tour access varies",
    "routeNote": "Mesa Verde is a separate southwestern-Colorado trip, not a Denver day trip. Specific tours require current access checks.",
    "assumptions": "9 consecutive calendar days from the Bay Area; 5 weekday PTO days before any holiday/WFH arrangement. 2 travel/arrival/jetlag buffer days, 1 base-change day, 1 rest day. One country, at most 2 overnight base(s). Door-to-door timing and site/program access still need checking."
  },
  {
    "id": "monterey-coast-5",
    "familyId": "monterey-coast",
    "title": "Monterey and a chosen Big Sur drive · 5 days",
    "country": "United States",
    "scope": "USA",
    "days": 5,
    "ptoDays": 3,
    "hubIds": [
      "monterey"
    ],
    "baseLabels": [
      "Monterey"
    ],
    "basePoints": [
      {
        "lat": 36.6,
        "lon": -121.89,
        "label": "Monterey",
        "precision": "city area"
      }
    ],
    "gateways": [
      "MRY",
      "Bay Area drive"
    ],
    "travelDays": 2,
    "transferDays": 0,
    "restDays": 0,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 90,
    "candidateItemIds": [],
    "season": "Approximate: year-round with winter storms and changing Highway 1 access",
    "routeNote": "Whale watching and a Big Sur road goal need actual slots/conditions; neither follows automatically from a coastal stay.",
    "assumptions": "5 consecutive calendar days from the Bay Area; 3 weekday PTO days before any holiday/WFH arrangement. 2 travel/arrival/jetlag buffer days, 0 base-change day, 0 rest day. One country, at most 1 overnight base(s). Door-to-door timing and site/program access still need checking."
  },
  {
    "id": "monterey-coast-9",
    "familyId": "monterey-coast",
    "title": "Monterey and a chosen Big Sur drive · 9 days",
    "country": "United States",
    "scope": "USA",
    "days": 9,
    "ptoDays": 5,
    "hubIds": [
      "monterey"
    ],
    "baseLabels": [
      "Monterey",
      "Big Sur"
    ],
    "basePoints": [
      {
        "lat": 36.6,
        "lon": -121.89,
        "label": "Monterey",
        "precision": "city area"
      },
      {
        "lat": 36.27,
        "lon": -121.81,
        "label": "Big Sur",
        "precision": "city area"
      }
    ],
    "gateways": [
      "MRY",
      "Bay Area drive"
    ],
    "travelDays": 2,
    "transferDays": 1,
    "restDays": 1,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 190,
    "candidateItemIds": [],
    "season": "Approximate: year-round with winter storms and changing Highway 1 access",
    "routeNote": "Whale watching and a Big Sur road goal need actual slots/conditions; neither follows automatically from a coastal stay.",
    "assumptions": "9 consecutive calendar days from the Bay Area; 5 weekday PTO days before any holiday/WFH arrangement. 2 travel/arrival/jetlag buffer days, 1 base-change day, 1 rest day. One country, at most 2 overnight base(s). Door-to-door timing and site/program access still need checking."
  },
  {
    "id": "alaska-southcentral-5",
    "familyId": "alaska-southcentral",
    "title": "Anchorage and nearby south-central discoveries · 5 days",
    "country": "United States",
    "scope": "USA",
    "days": 5,
    "ptoDays": 3,
    "hubIds": [
      "alaska-southcentral"
    ],
    "baseLabels": [
      "Anchorage"
    ],
    "basePoints": [
      {
        "lat": 61.22,
        "lon": -149.9,
        "label": "Anchorage",
        "precision": "city area"
      }
    ],
    "gateways": [
      "ANC"
    ],
    "travelDays": 2,
    "transferDays": 0,
    "restDays": 0,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 90,
    "candidateItemIds": [],
    "season": "Approximate: summer for regular Coastal Classic and broader boat/road options",
    "routeNote": "A Coastal Classic rail goal needs the actual scheduled train allocation. A car transfer cannot satisfy that rail goal.",
    "assumptions": "5 consecutive calendar days from the Bay Area; 3 weekday PTO days before any holiday/WFH arrangement. 2 travel/arrival/jetlag buffer days, 0 base-change day, 0 rest day. One country, at most 1 overnight base(s). Door-to-door timing and site/program access still need checking."
  },
  {
    "id": "alaska-southcentral-9",
    "familyId": "alaska-southcentral",
    "title": "Anchorage and a Seward corridor · 9 days",
    "country": "United States",
    "scope": "USA",
    "days": 9,
    "ptoDays": 5,
    "hubIds": [
      "alaska-southcentral"
    ],
    "baseLabels": [
      "Anchorage",
      "Seward"
    ],
    "basePoints": [
      {
        "lat": 61.22,
        "lon": -149.9,
        "label": "Anchorage",
        "precision": "city area"
      },
      {
        "lat": 60.1,
        "lon": -149.44,
        "label": "Seward",
        "precision": "city area"
      }
    ],
    "gateways": [
      "ANC"
    ],
    "travelDays": 3,
    "transferDays": 1,
    "restDays": 1,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 190,
    "candidateItemIds": [],
    "season": "Approximate: summer for regular Coastal Classic and broader boat/road options",
    "routeNote": "A Coastal Classic rail goal needs the actual scheduled train allocation. A car transfer cannot satisfy that rail goal.",
    "assumptions": "9 consecutive calendar days from the Bay Area; 5 weekday PTO days before any holiday/WFH arrangement. 3 travel/arrival/jetlag buffer days, 1 base-change day, 1 rest day. One country, at most 2 overnight base(s). Door-to-door timing and site/program access still need checking."
  },
  {
    "id": "socal-5",
    "familyId": "socal",
    "title": "San Diego coast and neighborhoods · 5 days",
    "country": "United States",
    "scope": "USA",
    "days": 5,
    "ptoDays": 3,
    "hubIds": [
      "san-diego"
    ],
    "baseLabels": [
      "San Diego"
    ],
    "basePoints": [
      {
        "lat": 32.72,
        "lon": -117.16,
        "label": "San Diego",
        "precision": "city area"
      }
    ],
    "gateways": [
      "SAN",
      "LAX"
    ],
    "travelDays": 2,
    "transferDays": 0,
    "restDays": 0,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 90,
    "candidateItemIds": [],
    "season": "Approximate: year-round; ocean and heat conditions vary",
    "routeNote": "Choose city sectors and qualified beginner instruction; Los Angeles traffic changes the transfer budget.",
    "assumptions": "5 consecutive calendar days from the Bay Area; 3 weekday PTO days before any holiday/WFH arrangement. 2 travel/arrival/jetlag buffer days, 0 base-change day, 0 rest day. One country, at most 1 overnight base(s). Door-to-door timing and site/program access still need checking."
  },
  {
    "id": "socal-9",
    "familyId": "socal",
    "title": "San Diego and a Los Angeles chapter · 9 days",
    "country": "United States",
    "scope": "USA",
    "days": 9,
    "ptoDays": 5,
    "hubIds": [
      "san-diego",
      "los-angeles"
    ],
    "baseLabels": [
      "San Diego",
      "Los Angeles"
    ],
    "basePoints": [
      {
        "lat": 32.72,
        "lon": -117.16,
        "label": "San Diego",
        "precision": "city area"
      },
      {
        "lat": 34.05,
        "lon": -118.24,
        "label": "Los Angeles",
        "precision": "city area"
      }
    ],
    "gateways": [
      "SAN",
      "LAX"
    ],
    "travelDays": 2,
    "transferDays": 1,
    "restDays": 1,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 190,
    "candidateItemIds": [],
    "season": "Approximate: year-round; ocean and heat conditions vary",
    "routeNote": "Choose city sectors and qualified beginner instruction; Los Angeles traffic changes the transfer budget.",
    "assumptions": "9 consecutive calendar days from the Bay Area; 5 weekday PTO days before any holiday/WFH arrangement. 2 travel/arrival/jetlag buffer days, 1 base-change day, 1 rest day. One country, at most 2 overnight base(s). Door-to-door timing and site/program access still need checking."
  },
  {
    "id": "sonoran-5",
    "familyId": "sonoran",
    "title": "Tucson and a Phoenix chapter · 5 days",
    "country": "United States",
    "scope": "USA",
    "days": 5,
    "ptoDays": 3,
    "hubIds": [
      "tucson-sonoran"
    ],
    "baseLabels": [
      "Tucson"
    ],
    "basePoints": [
      {
        "lat": 32.22,
        "lon": -110.97,
        "label": "Tucson",
        "precision": "city area"
      }
    ],
    "gateways": [
      "TUS",
      "PHX"
    ],
    "travelDays": 2,
    "transferDays": 0,
    "restDays": 0,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 90,
    "candidateItemIds": [],
    "season": "Approximate: fall through spring",
    "routeNote": "Desert walking in hot months may be unsuitable; this is a city/desert sector choice, not all Arizona.",
    "assumptions": "5 consecutive calendar days from the Bay Area; 3 weekday PTO days before any holiday/WFH arrangement. 2 travel/arrival/jetlag buffer days, 0 base-change day, 0 rest day. One country, at most 1 overnight base(s). Door-to-door timing and site/program access still need checking."
  },
  {
    "id": "sonoran-9",
    "familyId": "sonoran",
    "title": "Tucson and a Phoenix chapter · 9 days",
    "country": "United States",
    "scope": "USA",
    "days": 9,
    "ptoDays": 5,
    "hubIds": [
      "tucson-sonoran"
    ],
    "baseLabels": [
      "Tucson",
      "Phoenix"
    ],
    "basePoints": [
      {
        "lat": 32.22,
        "lon": -110.97,
        "label": "Tucson",
        "precision": "city area"
      },
      {
        "lat": 33.45,
        "lon": -112.07,
        "label": "Phoenix",
        "precision": "city area"
      }
    ],
    "gateways": [
      "TUS",
      "PHX"
    ],
    "travelDays": 2,
    "transferDays": 1,
    "restDays": 1,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 190,
    "candidateItemIds": [],
    "season": "Approximate: fall through spring",
    "routeNote": "Desert walking in hot months may be unsuitable; this is a city/desert sector choice, not all Arizona.",
    "assumptions": "9 consecutive calendar days from the Bay Area; 5 weekday PTO days before any holiday/WFH arrangement. 2 travel/arrival/jetlag buffer days, 1 base-change day, 1 rest day. One country, at most 2 overnight base(s). Door-to-door timing and site/program access still need checking."
  },
  {
    "id": "colorado-rockies-5",
    "familyId": "colorado-rockies",
    "title": "Rocky Mountain National Park from Estes Park · 5 days",
    "country": "United States",
    "scope": "USA",
    "days": 5,
    "ptoDays": 3,
    "hubIds": [
      "colorado-rockies"
    ],
    "baseLabels": [
      "Estes Park"
    ],
    "basePoints": [
      {
        "lat": 40.38,
        "lon": -105.52,
        "label": "Estes Park",
        "precision": "city area"
      }
    ],
    "gateways": [
      "DEN"
    ],
    "travelDays": 2,
    "transferDays": 0,
    "restDays": 0,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 90,
    "candidateItemIds": [],
    "season": "Approximate: summer/early fall for high routes; winter uses a different plan",
    "routeNote": "Altitude, mountain driving and trail conditions require pacing. Mesa Verde/Durango are not included in this route.",
    "assumptions": "5 consecutive calendar days from the Bay Area; 3 weekday PTO days before any holiday/WFH arrangement. 2 travel/arrival/jetlag buffer days, 0 base-change day, 0 rest day. One country, at most 1 overnight base(s). Door-to-door timing and site/program access still need checking."
  },
  {
    "id": "colorado-rockies-9",
    "familyId": "colorado-rockies",
    "title": "Front Range and an Aspen chapter · 9 days",
    "country": "United States",
    "scope": "USA",
    "days": 9,
    "ptoDays": 5,
    "hubIds": [
      "colorado-rockies"
    ],
    "baseLabels": [
      "Estes Park",
      "Aspen"
    ],
    "basePoints": [
      {
        "lat": 40.38,
        "lon": -105.52,
        "label": "Estes Park",
        "precision": "city area"
      },
      {
        "lat": 39.19,
        "lon": -106.82,
        "label": "Aspen",
        "precision": "city area"
      }
    ],
    "gateways": [
      "DEN"
    ],
    "travelDays": 2,
    "transferDays": 1,
    "restDays": 1,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 190,
    "candidateItemIds": [],
    "season": "Approximate: summer/early fall for high routes; winter uses a different plan",
    "routeNote": "Altitude, mountain driving and trail conditions require pacing. Mesa Verde/Durango are not included in this route.",
    "assumptions": "9 consecutive calendar days from the Bay Area; 5 weekday PTO days before any holiday/WFH arrangement. 2 travel/arrival/jetlag buffer days, 1 base-change day, 1 rest day. One country, at most 2 overnight base(s). Door-to-door timing and site/program access still need checking."
  },
  {
    "id": "oahu-5",
    "familyId": "oahu",
    "title": "Oahu and an optional Maui chapter · 5 days",
    "country": "United States",
    "scope": "USA",
    "days": 5,
    "ptoDays": 3,
    "hubIds": [
      "oahu"
    ],
    "baseLabels": [
      "Honolulu / Oahu"
    ],
    "basePoints": [
      {
        "lat": 21.31,
        "lon": -157.86,
        "label": "Honolulu / Oahu",
        "precision": "city area"
      }
    ],
    "gateways": [
      "HNL",
      "OGG"
    ],
    "travelDays": 2,
    "transferDays": 0,
    "restDays": 0,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 90,
    "candidateItemIds": [],
    "season": "Approximate: year-round with island-specific ocean/rain seasons",
    "routeNote": "Two islands require an actual flight/base-change day; no generic water skill or whole-island completion is inferred.",
    "assumptions": "5 consecutive calendar days from the Bay Area; 3 weekday PTO days before any holiday/WFH arrangement. 2 travel/arrival/jetlag buffer days, 0 base-change day, 0 rest day. One country, at most 1 overnight base(s). Door-to-door timing and site/program access still need checking."
  },
  {
    "id": "oahu-9",
    "familyId": "oahu",
    "title": "Oahu and an optional Maui chapter · 9 days",
    "country": "United States",
    "scope": "USA",
    "days": 9,
    "ptoDays": 5,
    "hubIds": [
      "oahu"
    ],
    "baseLabels": [
      "Honolulu / Oahu",
      "Maui"
    ],
    "basePoints": [
      {
        "lat": 21.31,
        "lon": -157.86,
        "label": "Honolulu / Oahu",
        "precision": "city area"
      },
      {
        "lat": 20.88,
        "lon": -156.68,
        "label": "Maui",
        "precision": "city area"
      }
    ],
    "gateways": [
      "HNL",
      "OGG"
    ],
    "travelDays": 2,
    "transferDays": 1,
    "restDays": 1,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 190,
    "candidateItemIds": [],
    "season": "Approximate: year-round with island-specific ocean/rain seasons",
    "routeNote": "Two islands require an actual flight/base-change day; no generic water skill or whole-island completion is inferred.",
    "assumptions": "9 consecutive calendar days from the Bay Area; 5 weekday PTO days before any holiday/WFH arrangement. 2 travel/arrival/jetlag buffer days, 1 base-change day, 1 rest day. One country, at most 2 overnight base(s). Door-to-door timing and site/program access still need checking."
  },
  {
    "id": "new-england-5",
    "familyId": "new-england",
    "title": "Boston public history and neighborhoods · 5 days",
    "country": "United States",
    "scope": "USA",
    "days": 5,
    "ptoDays": 3,
    "hubIds": [
      "boston"
    ],
    "baseLabels": [
      "Boston"
    ],
    "basePoints": [
      {
        "lat": 42.36,
        "lon": -71.06,
        "label": "Boston",
        "precision": "city area"
      }
    ],
    "gateways": [
      "BOS",
      "MHT"
    ],
    "travelDays": 2,
    "transferDays": 0,
    "restDays": 0,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 90,
    "candidateItemIds": [],
    "season": "Approximate: spring through fall; foliage timing varies",
    "routeNote": "Boston and mountain sectors are separate bases. Acadia and northern Vermont need a different extension.",
    "assumptions": "5 consecutive calendar days from the Bay Area; 3 weekday PTO days before any holiday/WFH arrangement. 2 travel/arrival/jetlag buffer days, 0 base-change day, 0 rest day. One country, at most 1 overnight base(s). Door-to-door timing and site/program access still need checking."
  },
  {
    "id": "new-england-9",
    "familyId": "new-england",
    "title": "Boston and a White Mountains chapter · 9 days",
    "country": "United States",
    "scope": "USA",
    "days": 9,
    "ptoDays": 5,
    "hubIds": [
      "boston"
    ],
    "baseLabels": [
      "Boston",
      "Conway / White Mountains"
    ],
    "basePoints": [
      {
        "lat": 42.36,
        "lon": -71.06,
        "label": "Boston",
        "precision": "city area"
      },
      {
        "lat": 43.98,
        "lon": -71.12,
        "label": "Conway / White Mountains",
        "precision": "city area"
      }
    ],
    "gateways": [
      "BOS",
      "MHT"
    ],
    "travelDays": 2,
    "transferDays": 1,
    "restDays": 1,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 190,
    "candidateItemIds": [],
    "season": "Approximate: spring through fall; foliage timing varies",
    "routeNote": "Boston and mountain sectors are separate bases. Acadia and northern Vermont need a different extension.",
    "assumptions": "9 consecutive calendar days from the Bay Area; 5 weekday PTO days before any holiday/WFH arrangement. 2 travel/arrival/jetlag buffer days, 1 base-change day, 1 rest day. One country, at most 2 overnight base(s). Door-to-door timing and site/program access still need checking."
  },
  {
    "id": "death-valley-5",
    "familyId": "death-valley",
    "title": "A chosen Death Valley sector · 5 days",
    "country": "United States",
    "scope": "USA",
    "days": 5,
    "ptoDays": 3,
    "hubIds": [
      "death-valley"
    ],
    "baseLabels": [
      "Furnace Creek"
    ],
    "basePoints": [
      {
        "lat": 36.46,
        "lon": -116.87,
        "label": "Furnace Creek",
        "precision": "city area"
      }
    ],
    "gateways": [
      "LAS"
    ],
    "travelDays": 2,
    "transferDays": 0,
    "restDays": 0,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 90,
    "candidateItemIds": [],
    "season": "Approximate: fall through spring; flood/road conditions need current checks",
    "routeNote": "Focus on paved visitor-core choices; flooding and remote-road closures can change feasibility.",
    "assumptions": "5 consecutive calendar days from the Bay Area; 3 weekday PTO days before any holiday/WFH arrangement. 2 travel/arrival/jetlag buffer days, 0 base-change day, 0 rest day. One country, at most 1 overnight base(s). Door-to-door timing and site/program access still need checking."
  },
  {
    "id": "death-valley-9",
    "familyId": "death-valley",
    "title": "A chosen Death Valley sector · 9 days",
    "country": "United States",
    "scope": "USA",
    "days": 9,
    "ptoDays": 5,
    "hubIds": [
      "death-valley"
    ],
    "baseLabels": [
      "Furnace Creek"
    ],
    "basePoints": [
      {
        "lat": 36.46,
        "lon": -116.87,
        "label": "Furnace Creek",
        "precision": "city area"
      }
    ],
    "gateways": [
      "LAS"
    ],
    "travelDays": 2,
    "transferDays": 0,
    "restDays": 1,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 190,
    "candidateItemIds": [],
    "season": "Approximate: fall through spring; flood/road conditions need current checks",
    "routeNote": "Focus on paved visitor-core choices; flooding and remote-road closures can change feasibility.",
    "assumptions": "9 consecutive calendar days from the Bay Area; 5 weekday PTO days before any holiday/WFH arrangement. 2 travel/arrival/jetlag buffer days, 0 base-change day, 1 rest day. One country, at most 1 overnight base(s). Door-to-door timing and site/program access still need checking."
  },
  {
    "id": "joshua-tree-5",
    "familyId": "joshua-tree",
    "title": "Joshua Tree and desert-town routines · 5 days",
    "country": "United States",
    "scope": "USA",
    "days": 5,
    "ptoDays": 3,
    "hubIds": [
      "joshua-tree"
    ],
    "baseLabels": [
      "Twentynine Palms"
    ],
    "basePoints": [
      {
        "lat": 34.14,
        "lon": -116.05,
        "label": "Twentynine Palms",
        "precision": "city area"
      }
    ],
    "gateways": [
      "PSP"
    ],
    "travelDays": 2,
    "transferDays": 0,
    "restDays": 0,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 90,
    "candidateItemIds": [],
    "season": "Approximate: fall through spring; winter nights can freeze",
    "routeNote": "Use a compact northern-park base; current road/trail closures and weather determine activities.",
    "assumptions": "5 consecutive calendar days from the Bay Area; 3 weekday PTO days before any holiday/WFH arrangement. 2 travel/arrival/jetlag buffer days, 0 base-change day, 0 rest day. One country, at most 1 overnight base(s). Door-to-door timing and site/program access still need checking."
  },
  {
    "id": "joshua-tree-9",
    "familyId": "joshua-tree",
    "title": "Joshua Tree and desert-town routines · 9 days",
    "country": "United States",
    "scope": "USA",
    "days": 9,
    "ptoDays": 5,
    "hubIds": [
      "joshua-tree"
    ],
    "baseLabels": [
      "Twentynine Palms"
    ],
    "basePoints": [
      {
        "lat": 34.14,
        "lon": -116.05,
        "label": "Twentynine Palms",
        "precision": "city area"
      }
    ],
    "gateways": [
      "PSP"
    ],
    "travelDays": 2,
    "transferDays": 0,
    "restDays": 1,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 190,
    "candidateItemIds": [],
    "season": "Approximate: fall through spring; winter nights can freeze",
    "routeNote": "Use a compact northern-park base; current road/trail closures and weather determine activities.",
    "assumptions": "9 consecutive calendar days from the Bay Area; 5 weekday PTO days before any holiday/WFH arrangement. 2 travel/arrival/jetlag buffer days, 0 base-change day, 1 rest day. One country, at most 1 overnight base(s). Door-to-door timing and site/program access still need checking."
  },
  {
    "id": "new-orleans-5",
    "familyId": "new-orleans",
    "title": "New Orleans and Louisiana public-history choices · 5 days",
    "country": "United States",
    "scope": "USA",
    "days": 5,
    "ptoDays": 3,
    "hubIds": [
      "new-orleans"
    ],
    "baseLabels": [
      "New Orleans"
    ],
    "basePoints": [
      {
        "lat": 29.95,
        "lon": -90.07,
        "label": "New Orleans",
        "precision": "city area"
      }
    ],
    "gateways": [
      "MSY"
    ],
    "travelDays": 2,
    "transferDays": 0,
    "restDays": 0,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 90,
    "candidateItemIds": [],
    "season": "Approximate: fall through spring; festival/heat/storm conditions vary",
    "routeNote": "Music, history and cuisine each require explicit selected experiences rather than city-wide credit.",
    "assumptions": "5 consecutive calendar days from the Bay Area; 3 weekday PTO days before any holiday/WFH arrangement. 2 travel/arrival/jetlag buffer days, 0 base-change day, 0 rest day. One country, at most 1 overnight base(s). Door-to-door timing and site/program access still need checking."
  },
  {
    "id": "new-orleans-9",
    "familyId": "new-orleans",
    "title": "New Orleans and Louisiana public-history choices · 9 days",
    "country": "United States",
    "scope": "USA",
    "days": 9,
    "ptoDays": 5,
    "hubIds": [
      "new-orleans"
    ],
    "baseLabels": [
      "New Orleans"
    ],
    "basePoints": [
      {
        "lat": 29.95,
        "lon": -90.07,
        "label": "New Orleans",
        "precision": "city area"
      }
    ],
    "gateways": [
      "MSY"
    ],
    "travelDays": 2,
    "transferDays": 0,
    "restDays": 1,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 190,
    "candidateItemIds": [],
    "season": "Approximate: fall through spring; festival/heat/storm conditions vary",
    "routeNote": "Music, history and cuisine each require explicit selected experiences rather than city-wide credit.",
    "assumptions": "9 consecutive calendar days from the Bay Area; 5 weekday PTO days before any holiday/WFH arrangement. 2 travel/arrival/jetlag buffer days, 0 base-change day, 1 rest day. One country, at most 1 overnight base(s). Door-to-door timing and site/program access still need checking."
  },
  {
    "id": "mexico-city-oaxaca-5",
    "familyId": "mexico-city-oaxaca",
    "title": "Mexico City neighborhoods and markets · 5 days",
    "country": "Mexico",
    "scope": "World",
    "days": 5,
    "ptoDays": 3,
    "hubIds": [
      "mexico-city"
    ],
    "baseLabels": [
      "Mexico City"
    ],
    "basePoints": [
      {
        "lat": 19.43,
        "lon": -99.13,
        "label": "Mexico City",
        "precision": "city area"
      }
    ],
    "gateways": [
      "MEX",
      "OAX"
    ],
    "travelDays": 2,
    "transferDays": 0,
    "restDays": 0,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 90,
    "candidateItemIds": [],
    "season": "Approximate: winter/spring; local programs/access vary",
    "routeNote": "Five days uses Mexico City; nine days can add Oaxaca with a full flight/base-change day. Monte Alban has its own visit slot.",
    "assumptions": "5 consecutive calendar days from the Bay Area; 3 weekday PTO days before any holiday/WFH arrangement. 2 travel/arrival/jetlag buffer days, 0 base-change day, 0 rest day. One country, at most 1 overnight base(s). Door-to-door timing and site/program access still need checking."
  },
  {
    "id": "mexico-city-oaxaca-9",
    "familyId": "mexico-city-oaxaca",
    "title": "Mexico City and a selected Oaxaca chapter · 9 days",
    "country": "Mexico",
    "scope": "World",
    "days": 9,
    "ptoDays": 5,
    "hubIds": [
      "mexico-city",
      "oaxaca"
    ],
    "baseLabels": [
      "Mexico City",
      "Oaxaca City"
    ],
    "basePoints": [
      {
        "lat": 19.43,
        "lon": -99.13,
        "label": "Mexico City",
        "precision": "city area"
      },
      {
        "lat": 17.06,
        "lon": -96.73,
        "label": "Oaxaca City",
        "precision": "city area"
      }
    ],
    "gateways": [
      "MEX",
      "OAX"
    ],
    "travelDays": 2,
    "transferDays": 1,
    "restDays": 1,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 190,
    "candidateItemIds": [],
    "season": "Approximate: winter/spring; local programs/access vary",
    "routeNote": "Five days uses Mexico City; nine days can add Oaxaca with a full flight/base-change day. Monte Alban has its own visit slot.",
    "assumptions": "9 consecutive calendar days from the Bay Area; 5 weekday PTO days before any holiday/WFH arrangement. 2 travel/arrival/jetlag buffer days, 1 base-change day, 1 rest day. One country, at most 2 overnight base(s). Door-to-door timing and site/program access still need checking."
  },
  {
    "id": "vancouver-5",
    "familyId": "vancouver",
    "title": "Vancouver neighborhoods and coast · 5 days",
    "country": "Canada",
    "scope": "World",
    "days": 5,
    "ptoDays": 3,
    "hubIds": [
      "vancouver"
    ],
    "baseLabels": [
      "Vancouver"
    ],
    "basePoints": [
      {
        "lat": 49.28,
        "lon": -123.12,
        "label": "Vancouver",
        "precision": "city area"
      }
    ],
    "gateways": [
      "YVR"
    ],
    "travelDays": 2,
    "transferDays": 0,
    "restDays": 0,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 90,
    "candidateItemIds": [],
    "season": "Approximate: late spring through fall; winter is wetter",
    "routeNote": "A short North-American city route, not broad Canadian wilderness coverage.",
    "assumptions": "5 consecutive calendar days from the Bay Area; 3 weekday PTO days before any holiday/WFH arrangement. 2 travel/arrival/jetlag buffer days, 0 base-change day, 0 rest day. One country, at most 1 overnight base(s). Door-to-door timing and site/program access still need checking."
  },
  {
    "id": "vancouver-9",
    "familyId": "vancouver",
    "title": "Vancouver neighborhoods and coast · 9 days",
    "country": "Canada",
    "scope": "World",
    "days": 9,
    "ptoDays": 5,
    "hubIds": [
      "vancouver"
    ],
    "baseLabels": [
      "Vancouver"
    ],
    "basePoints": [
      {
        "lat": 49.28,
        "lon": -123.12,
        "label": "Vancouver",
        "precision": "city area"
      }
    ],
    "gateways": [
      "YVR"
    ],
    "travelDays": 2,
    "transferDays": 0,
    "restDays": 1,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 190,
    "candidateItemIds": [],
    "season": "Approximate: late spring through fall; winter is wetter",
    "routeNote": "A short North-American city route, not broad Canadian wilderness coverage.",
    "assumptions": "9 consecutive calendar days from the Bay Area; 5 weekday PTO days before any holiday/WFH arrangement. 2 travel/arrival/jetlag buffer days, 0 base-change day, 1 rest day. One country, at most 1 overnight base(s). Door-to-door timing and site/program access still need checking."
  },
  {
    "id": "banff-5",
    "familyId": "banff",
    "title": "A Canadian Rockies sector · 5 days",
    "country": "Canada",
    "scope": "World",
    "days": 5,
    "ptoDays": 3,
    "hubIds": [
      "banff-rockies"
    ],
    "baseLabels": [
      "Banff"
    ],
    "basePoints": [
      {
        "lat": 51.18,
        "lon": -115.57,
        "label": "Banff",
        "precision": "city area"
      }
    ],
    "gateways": [
      "YYC"
    ],
    "travelDays": 2,
    "transferDays": 0,
    "restDays": 0,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 90,
    "candidateItemIds": [],
    "season": "Approximate: summer/early fall for broad access; winter requires a separate road/activity plan",
    "routeNote": "Use one or two nearby bases; Jasper and a full Icefields Parkway loop require extra route decisions.",
    "assumptions": "5 consecutive calendar days from the Bay Area; 3 weekday PTO days before any holiday/WFH arrangement. 2 travel/arrival/jetlag buffer days, 0 base-change day, 0 rest day. One country, at most 1 overnight base(s). Door-to-door timing and site/program access still need checking."
  },
  {
    "id": "banff-9",
    "familyId": "banff",
    "title": "A Canadian Rockies sector · 9 days",
    "country": "Canada",
    "scope": "World",
    "days": 9,
    "ptoDays": 5,
    "hubIds": [
      "banff-rockies"
    ],
    "baseLabels": [
      "Banff",
      "Lake Louise"
    ],
    "basePoints": [
      {
        "lat": 51.18,
        "lon": -115.57,
        "label": "Banff",
        "precision": "city area"
      },
      {
        "lat": 51.42,
        "lon": -116.22,
        "label": "Lake Louise",
        "precision": "city area"
      }
    ],
    "gateways": [
      "YYC"
    ],
    "travelDays": 2,
    "transferDays": 1,
    "restDays": 1,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 190,
    "candidateItemIds": [],
    "season": "Approximate: summer/early fall for broad access; winter requires a separate road/activity plan",
    "routeNote": "Use one or two nearby bases; Jasper and a full Icefields Parkway loop require extra route decisions.",
    "assumptions": "9 consecutive calendar days from the Bay Area; 5 weekday PTO days before any holiday/WFH arrangement. 2 travel/arrival/jetlag buffer days, 1 base-change day, 1 rest day. One country, at most 2 overnight base(s). Door-to-door timing and site/program access still need checking."
  },
  {
    "id": "japan-9",
    "familyId": "japan",
    "title": "Tokyo and a Kyoto chapter · 9 days",
    "country": "Japan",
    "scope": "World",
    "days": 9,
    "ptoDays": 5,
    "hubIds": [
      "tokyo",
      "kyoto"
    ],
    "baseLabels": [
      "Tokyo",
      "Kyoto"
    ],
    "basePoints": [
      {
        "lat": 35.68,
        "lon": 139.69,
        "label": "Tokyo",
        "precision": "city area"
      },
      {
        "lat": 35.01,
        "lon": 135.77,
        "label": "Kyoto",
        "precision": "city area"
      }
    ],
    "gateways": [
      "HND",
      "NRT",
      "KIX"
    ],
    "travelDays": 3,
    "transferDays": 1,
    "restDays": 1,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 190,
    "candidateItemIds": [],
    "season": "Approximate: spring/fall; city culture varies year-round",
    "routeNote": "Three calendar days are reserved for outbound travel, arrival/jetlag and return; a Kyoto transfer consumes another day.",
    "assumptions": "9 consecutive calendar days from the Bay Area; 5 weekday PTO days before any holiday/WFH arrangement. 3 travel/arrival/jetlag buffer days, 1 base-change day, 1 rest day. One country, at most 2 overnight base(s). Door-to-door timing and site/program access still need checking."
  },
  {
    "id": "istanbul-9",
    "familyId": "istanbul",
    "title": "A compact Istanbul stay · 9 days",
    "country": "Turkey",
    "scope": "World",
    "days": 9,
    "ptoDays": 5,
    "hubIds": [
      "istanbul"
    ],
    "baseLabels": [
      "Istanbul"
    ],
    "basePoints": [
      {
        "lat": 41.01,
        "lon": 28.98,
        "label": "Istanbul",
        "precision": "city area"
      }
    ],
    "gateways": [
      "IST"
    ],
    "travelDays": 3,
    "transferDays": 0,
    "restDays": 1,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 190,
    "candidateItemIds": [],
    "season": "Approximate: spring/fall; programs vary year-round",
    "routeNote": "One city base; public performance/craft sessions need actual provider and date research.",
    "assumptions": "9 consecutive calendar days from the Bay Area; 5 weekday PTO days before any holiday/WFH arrangement. 3 travel/arrival/jetlag buffer days, 0 base-change day, 1 rest day. One country, at most 1 overnight base(s). Door-to-door timing and site/program access still need checking."
  },
  {
    "id": "thailand-9",
    "familyId": "thailand",
    "title": "Bangkok and Chiang Mai · 9 days",
    "country": "Thailand",
    "scope": "World",
    "days": 9,
    "ptoDays": 5,
    "hubIds": [
      "bangkok",
      "chiang-mai"
    ],
    "baseLabels": [
      "Bangkok",
      "Chiang Mai"
    ],
    "basePoints": [
      {
        "lat": 13.76,
        "lon": 100.5,
        "label": "Bangkok",
        "precision": "city area"
      },
      {
        "lat": 18.79,
        "lon": 98.99,
        "label": "Chiang Mai",
        "precision": "city area"
      }
    ],
    "gateways": [
      "BKK",
      "CNX"
    ],
    "travelDays": 3,
    "transferDays": 1,
    "restDays": 1,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 190,
    "candidateItemIds": [],
    "season": "Approximate: often cooler/drier months; air quality and weather vary",
    "routeNote": "One country, two bases and a full transfer day. Food/market goals are explicit slots, not whole-cuisine completion.",
    "assumptions": "9 consecutive calendar days from the Bay Area; 5 weekday PTO days before any holiday/WFH arrangement. 3 travel/arrival/jetlag buffer days, 1 base-change day, 1 rest day. One country, at most 2 overnight base(s). Door-to-door timing and site/program access still need checking."
  },
  {
    "id": "portugal-9",
    "familyId": "portugal",
    "title": "Lisbon and a Porto chapter · 9 days",
    "country": "Portugal",
    "scope": "World",
    "days": 9,
    "ptoDays": 5,
    "hubIds": [
      "lisbon",
      "porto-douro"
    ],
    "baseLabels": [
      "Lisbon",
      "Porto"
    ],
    "basePoints": [
      {
        "lat": 38.72,
        "lon": -9.14,
        "label": "Lisbon",
        "precision": "city area"
      },
      {
        "lat": 41.15,
        "lon": -8.61,
        "label": "Porto",
        "precision": "city area"
      }
    ],
    "gateways": [
      "LIS",
      "OPO"
    ],
    "travelDays": 3,
    "transferDays": 1,
    "restDays": 1,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 190,
    "candidateItemIds": [],
    "season": "Approximate: spring/fall; cities vary year-round",
    "routeNote": "The historic tram goal requires an actual tram outing; being in Lisbon does not satisfy it.",
    "assumptions": "9 consecutive calendar days from the Bay Area; 5 weekday PTO days before any holiday/WFH arrangement. 3 travel/arrival/jetlag buffer days, 1 base-change day, 1 rest day. One country, at most 2 overnight base(s). Door-to-door timing and site/program access still need checking."
  },
  {
    "id": "italy-9",
    "familyId": "italy",
    "title": "Rome and Bologna · 9 days",
    "country": "Italy",
    "scope": "World",
    "days": 9,
    "ptoDays": 5,
    "hubIds": [
      "rome",
      "bologna"
    ],
    "baseLabels": [
      "Rome",
      "Bologna"
    ],
    "basePoints": [
      {
        "lat": 41.9,
        "lon": 12.5,
        "label": "Rome",
        "precision": "city area"
      },
      {
        "lat": 44.49,
        "lon": 11.34,
        "label": "Bologna",
        "precision": "city area"
      }
    ],
    "gateways": [
      "FCO",
      "BLQ"
    ],
    "travelDays": 3,
    "transferDays": 1,
    "restDays": 1,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 190,
    "candidateItemIds": [],
    "season": "Approximate: spring/fall; heat and entry arrangements vary",
    "routeNote": "Two overnight bases in Italy with a full transfer day; museum/site bookings remain research.",
    "assumptions": "9 consecutive calendar days from the Bay Area; 5 weekday PTO days before any holiday/WFH arrangement. 3 travel/arrival/jetlag buffer days, 1 base-change day, 1 rest day. One country, at most 2 overnight base(s). Door-to-door timing and site/program access still need checking."
  },
  {
    "id": "vietnam-9",
    "familyId": "vietnam",
    "title": "Hanoi and a Ho Chi Minh City chapter · 9 days",
    "country": "Vietnam",
    "scope": "World",
    "days": 9,
    "ptoDays": 5,
    "hubIds": [
      "hanoi",
      "ho-chi-minh-city"
    ],
    "baseLabels": [
      "Hanoi",
      "Ho Chi Minh City"
    ],
    "basePoints": [
      {
        "lat": 21.03,
        "lon": 105.83,
        "label": "Hanoi",
        "precision": "city area"
      },
      {
        "lat": 10.82,
        "lon": 106.63,
        "label": "Ho Chi Minh City",
        "precision": "city area"
      }
    ],
    "gateways": [
      "HAN",
      "SGN"
    ],
    "travelDays": 3,
    "transferDays": 1,
    "restDays": 1,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 190,
    "candidateItemIds": [],
    "season": "Approximate: season depends strongly on region; choose actual dates",
    "routeNote": "Two cities are connected by air, not a quick drive. Water-puppet and food goals need actual sessions.",
    "assumptions": "9 consecutive calendar days from the Bay Area; 5 weekday PTO days before any holiday/WFH arrangement. 3 travel/arrival/jetlag buffer days, 1 base-change day, 1 rest day. One country, at most 2 overnight base(s). Door-to-door timing and site/program access still need checking."
  },
  {
    "id": "france-9",
    "familyId": "france",
    "title": "Paris and Lyon · 9 days",
    "country": "France",
    "scope": "World",
    "days": 9,
    "ptoDays": 5,
    "hubIds": [
      "paris"
    ],
    "baseLabels": [
      "Paris",
      "Lyon"
    ],
    "basePoints": [
      {
        "lat": 48.86,
        "lon": 2.35,
        "label": "Paris",
        "precision": "city area"
      },
      {
        "lat": 45.76,
        "lon": 4.84,
        "label": "Lyon",
        "precision": "city area"
      }
    ],
    "gateways": [
      "CDG",
      "ORY",
      "LYS"
    ],
    "travelDays": 3,
    "transferDays": 1,
    "restDays": 1,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 190,
    "candidateItemIds": [],
    "season": "Approximate: spring/fall; cities work year-round",
    "routeNote": "A full base-change day; no generic French skill or cuisine credit without an explicit selected slot.",
    "assumptions": "9 consecutive calendar days from the Bay Area; 5 weekday PTO days before any holiday/WFH arrangement. 3 travel/arrival/jetlag buffer days, 1 base-change day, 1 rest day. One country, at most 2 overnight base(s). Door-to-door timing and site/program access still need checking."
  },
  {
    "id": "norway-rail-9",
    "familyId": "norway-rail",
    "title": "Oslo, Bergen and the named rail connection · 9 days",
    "country": "Norway",
    "scope": "World",
    "days": 9,
    "ptoDays": 5,
    "hubIds": [],
    "baseLabels": [
      "Oslo",
      "Bergen"
    ],
    "basePoints": [
      {
        "lat": 59.91,
        "lon": 10.75,
        "label": "Oslo",
        "precision": "city area"
      },
      {
        "lat": 60.39,
        "lon": 5.32,
        "label": "Bergen",
        "precision": "city area"
      }
    ],
    "gateways": [
      "OSL",
      "BGO"
    ],
    "travelDays": 3,
    "transferDays": 1,
    "restDays": 1,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 190,
    "candidateItemIds": [
      "LA-0991"
    ],
    "season": "Approximate: late spring through early fall for broad sightseeing; schedules vary",
    "routeNote": "Bergen Railway and Flam branch are allocated as separate rail portions. Actual schedules/connections must fit; one ride does not prove both.",
    "assumptions": "9 consecutive calendar days from the Bay Area; 5 weekday PTO days before any holiday/WFH arrangement. 3 travel/arrival/jetlag buffer days, 1 base-change day, 1 rest day. One country, at most 2 overnight base(s). Door-to-door timing and site/program access still need checking."
  },
  {
    "id": "bulgaria-rail-9",
    "familyId": "bulgaria-rail",
    "title": "Rhodope narrow-gauge rail choices · 9 days",
    "country": "Bulgaria",
    "scope": "World",
    "days": 9,
    "ptoDays": 5,
    "hubIds": [],
    "baseLabels": [
      "Septemvri",
      "Dobrinishte"
    ],
    "basePoints": [
      {
        "lat": 42.21,
        "lon": 24.1,
        "label": "Septemvri",
        "precision": "city area"
      },
      {
        "lat": 41.82,
        "lon": 23.55,
        "label": "Dobrinishte",
        "precision": "city area"
      }
    ],
    "gateways": [
      "SOF"
    ],
    "travelDays": 3,
    "transferDays": 1,
    "restDays": 1,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 190,
    "candidateItemIds": [
      "LA-1492"
    ],
    "season": "Approximate: spring through fall; rail schedules need checking",
    "routeNote": "A named narrow-gauge route with dedicated travel time; it does not stand in for generic overnight sleeper travel.",
    "assumptions": "9 consecutive calendar days from the Bay Area; 5 weekday PTO days before any holiday/WFH arrangement. 3 travel/arrival/jetlag buffer days, 1 base-change day, 1 rest day. One country, at most 2 overnight base(s). Door-to-door timing and site/program access still need checking."
  },
  {
    "id": "dolomites-9",
    "familyId": "dolomites",
    "title": "A supported Dolomites base · 9 days",
    "country": "Italy",
    "scope": "World",
    "days": 9,
    "ptoDays": 5,
    "hubIds": [],
    "baseLabels": [
      "Bolzano / Dolomites"
    ],
    "basePoints": [
      {
        "lat": 46.5,
        "lon": 11.35,
        "label": "Bolzano / Dolomites",
        "precision": "city area"
      }
    ],
    "gateways": [
      "VCE",
      "VRN"
    ],
    "travelDays": 3,
    "transferDays": 0,
    "restDays": 1,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 190,
    "candidateItemIds": [
      "LA-0937",
      "LA-0760"
    ],
    "season": "Approximate: summer/early fall for suitable guided routes",
    "routeNote": "A via ferrata is an explicit guided, ability-matched session; route, equipment and weather determine suitability.",
    "assumptions": "9 consecutive calendar days from the Bay Area; 5 weekday PTO days before any holiday/WFH arrangement. 3 travel/arrival/jetlag buffer days, 0 base-change day, 1 rest day. One country, at most 1 overnight base(s). Door-to-door timing and site/program access still need checking."
  },
  {
    "id": "malaysia-9",
    "familyId": "malaysia",
    "title": "Kuala Lumpur and Penang · 9 days",
    "country": "Malaysia",
    "scope": "World",
    "days": 9,
    "ptoDays": 5,
    "hubIds": [
      "kuala-lumpur",
      "penang"
    ],
    "baseLabels": [
      "Kuala Lumpur",
      "George Town"
    ],
    "basePoints": [
      {
        "lat": 3.14,
        "lon": 101.69,
        "label": "Kuala Lumpur",
        "precision": "city area"
      },
      {
        "lat": 5.41,
        "lon": 100.34,
        "label": "George Town",
        "precision": "city area"
      }
    ],
    "gateways": [
      "KUL",
      "PEN"
    ],
    "travelDays": 3,
    "transferDays": 1,
    "restDays": 1,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 190,
    "candidateItemIds": [],
    "season": "Approximate: year-round with monsoon/heat variations",
    "routeNote": "One country, two bases; roti canai receives an actual tasting opportunity, not assumed cuisine completion.",
    "assumptions": "9 consecutive calendar days from the Bay Area; 5 weekday PTO days before any holiday/WFH arrangement. 3 travel/arrival/jetlag buffer days, 1 base-change day, 1 rest day. One country, at most 2 overnight base(s). Door-to-door timing and site/program access still need checking."
  },
  {
    "id": "india-culture-9",
    "familyId": "india-culture",
    "title": "Hyderabad and Chennai · 9 days",
    "country": "India",
    "scope": "World",
    "days": 9,
    "ptoDays": 5,
    "hubIds": [
      "hyderabad"
    ],
    "baseLabels": [
      "Hyderabad",
      "Chennai"
    ],
    "basePoints": [
      {
        "lat": 17.39,
        "lon": 78.49,
        "label": "Hyderabad",
        "precision": "city area"
      },
      {
        "lat": 13.08,
        "lon": 80.27,
        "label": "Chennai",
        "precision": "city area"
      }
    ],
    "gateways": [
      "HYD",
      "MAA"
    ],
    "travelDays": 3,
    "transferDays": 1,
    "restDays": 1,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 190,
    "candidateItemIds": [
      "LA-0792"
    ],
    "season": "Approximate: often cooler months; heat/programs vary",
    "routeNote": "Two bases and a domestic transfer. A classical dance recital needs an actual advertised performance.",
    "assumptions": "9 consecutive calendar days from the Bay Area; 5 weekday PTO days before any holiday/WFH arrangement. 3 travel/arrival/jetlag buffer days, 1 base-change day, 1 rest day. One country, at most 2 overnight base(s). Door-to-door timing and site/program access still need checking."
  },
  {
    "id": "brazil-rio-9",
    "familyId": "brazil-rio",
    "title": "Rio cultural neighborhoods · 9 days",
    "country": "Brazil",
    "scope": "World",
    "days": 9,
    "ptoDays": 5,
    "hubIds": [],
    "baseLabels": [
      "Rio de Janeiro"
    ],
    "basePoints": [
      {
        "lat": -22.91,
        "lon": -43.17,
        "label": "Rio de Janeiro",
        "precision": "city area"
      }
    ],
    "gateways": [
      "GIG"
    ],
    "travelDays": 3,
    "transferDays": 0,
    "restDays": 1,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 190,
    "candidateItemIds": [
      "LA-1667",
      "LA-0724"
    ],
    "season": "Approximate: season/programs vary; check actual dates",
    "routeNote": "A public choro performance is a specific event opportunity, not merely arriving in Rio.",
    "assumptions": "9 consecutive calendar days from the Bay Area; 5 weekday PTO days before any holiday/WFH arrangement. 3 travel/arrival/jetlag buffer days, 0 base-change day, 1 rest day. One country, at most 1 overnight base(s). Door-to-door timing and site/program access still need checking."
  },
  {
    "id": "hong-kong-9",
    "familyId": "hong-kong",
    "title": "Hong Kong Cantonese food and city context · 9 days",
    "country": "China",
    "scope": "World",
    "days": 9,
    "ptoDays": 5,
    "hubIds": [],
    "baseLabels": [
      "Hong Kong"
    ],
    "basePoints": [
      {
        "lat": 22.32,
        "lon": 114.17,
        "label": "Hong Kong",
        "precision": "city area"
      }
    ],
    "gateways": [
      "HKG"
    ],
    "travelDays": 3,
    "transferDays": 0,
    "restDays": 1,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 190,
    "candidateItemIds": [
      "LA-1564"
    ],
    "season": "Approximate: often fall/spring; weather varies",
    "routeNote": "A Hong Kong context is chosen from the Hong Kong/Guangzhou example. Particular menus and exact entry/travel arrangements need research.",
    "assumptions": "9 consecutive calendar days from the Bay Area; 5 weekday PTO days before any holiday/WFH arrangement. 3 travel/arrival/jetlag buffer days, 0 base-change day, 1 rest day. One country, at most 1 overnight base(s). Door-to-door timing and site/program access still need checking."
  },
  {
    "id": "peru-9",
    "familyId": "peru",
    "title": "Cusco and the Sacred Valley · 9 days",
    "country": "Peru",
    "scope": "World",
    "days": 9,
    "ptoDays": 5,
    "hubIds": [
      "peru-sacred-valley"
    ],
    "baseLabels": [
      "Cusco",
      "Sacred Valley"
    ],
    "basePoints": [
      {
        "lat": -13.53,
        "lon": -71.97,
        "label": "Cusco",
        "precision": "city area"
      },
      {
        "lat": -13.29,
        "lon": -72.12,
        "label": "Sacred Valley",
        "precision": "city area"
      }
    ],
    "gateways": [
      "CUZ",
      "LIM"
    ],
    "travelDays": 4,
    "transferDays": 1,
    "restDays": 1,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 190,
    "candidateItemIds": [],
    "season": "Approximate: often drier months; altitude and access matter",
    "routeNote": "Allow acclimatization and check site/train access. A Cusco arrival is not a Machu Picchu visit.",
    "assumptions": "9 consecutive calendar days from the Bay Area; 5 weekday PTO days before any holiday/WFH arrangement. 4 travel/arrival/jetlag buffer days, 1 base-change day, 1 rest day. One country, at most 2 overnight base(s). Door-to-door timing and site/program access still need checking."
  },
  {
    "id": "kruger-9",
    "familyId": "kruger",
    "title": "A single Kruger access sector · 9 days",
    "country": "South Africa",
    "scope": "World",
    "days": 9,
    "ptoDays": 5,
    "hubIds": [
      "kruger"
    ],
    "baseLabels": [
      "Kruger access base"
    ],
    "basePoints": [
      {
        "lat": -24.0,
        "lon": 31.5,
        "label": "Kruger access base",
        "precision": "city area"
      }
    ],
    "gateways": [
      "JNB",
      "MQP"
    ],
    "travelDays": 4,
    "transferDays": 0,
    "restDays": 1,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 190,
    "candidateItemIds": [],
    "season": "Approximate: wildlife/weather conditions vary; choose season and sector",
    "routeNote": "Four calendar travel/connection days and a rest day are reserved. Cape Town is not added to this nine-day California trip.",
    "assumptions": "9 consecutive calendar days from the Bay Area; 5 weekday PTO days before any holiday/WFH arrangement. 4 travel/arrival/jetlag buffer days, 0 base-change day, 1 rest day. One country, at most 1 overnight base(s). Door-to-door timing and site/program access still need checking."
  },
  {
    "id": "new-zealand-south-9",
    "familyId": "new-zealand-south",
    "title": "A Fiordland South Island focus · 9 days",
    "country": "New Zealand",
    "scope": "World",
    "days": 9,
    "ptoDays": 5,
    "hubIds": [
      "new-zealand-south-island"
    ],
    "baseLabels": [
      "Te Anau / Fiordland"
    ],
    "basePoints": [
      {
        "lat": -45.41,
        "lon": 167.72,
        "label": "Te Anau / Fiordland",
        "precision": "city area"
      }
    ],
    "gateways": [
      "ZQN"
    ],
    "travelDays": 3,
    "transferDays": 0,
    "restDays": 1,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 190,
    "candidateItemIds": [],
    "season": "Approximate: often summer/early fall; mountain/marine conditions vary",
    "routeNote": "One South Island sector, not Fiordland plus Aoraki plus all New Zealand. Three calendar travel/arrival days are reserved.",
    "assumptions": "9 consecutive calendar days from the Bay Area; 5 weekday PTO days before any holiday/WFH arrangement. 3 travel/arrival/jetlag buffer days, 0 base-change day, 1 rest day. One country, at most 1 overnight base(s). Door-to-door timing and site/program access still need checking."
  },
  {
    "id": "iceland-9",
    "familyId": "iceland",
    "title": "Reykjavik and a chosen south-coast sector · 9 days",
    "country": "Iceland",
    "scope": "World",
    "days": 9,
    "ptoDays": 5,
    "hubIds": [
      "iceland-south-coast"
    ],
    "baseLabels": [
      "Reykjavik",
      "Vik"
    ],
    "basePoints": [
      {
        "lat": 64.15,
        "lon": -21.94,
        "label": "Reykjavik",
        "precision": "city area"
      },
      {
        "lat": 63.42,
        "lon": -19.01,
        "label": "Vik",
        "precision": "city area"
      }
    ],
    "gateways": [
      "KEF"
    ],
    "travelDays": 3,
    "transferDays": 1,
    "restDays": 1,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 190,
    "candidateItemIds": [],
    "season": "Approximate: summer for broad road access; winter is a different road/daylight plan",
    "routeNote": "One country, two bases, weather/rest buffers and a full base change; glacier/ice activities require qualified support.",
    "assumptions": "9 consecutive calendar days from the Bay Area; 5 weekday PTO days before any holiday/WFH arrangement. 3 travel/arrival/jetlag buffer days, 1 base-change day, 1 rest day. One country, at most 2 overnight base(s). Door-to-door timing and site/program access still need checking."
  },
  {
    "id": "swiss-alps-9",
    "familyId": "swiss-alps",
    "title": "Bernese Alps and a rail-angle choice · 9 days",
    "country": "Switzerland",
    "scope": "World",
    "days": 9,
    "ptoDays": 5,
    "hubIds": [
      "swiss-bernese-alps"
    ],
    "baseLabels": [
      "Interlaken / Bernese Oberland"
    ],
    "basePoints": [
      {
        "lat": 46.69,
        "lon": 7.86,
        "label": "Interlaken / Bernese Oberland",
        "precision": "city area"
      }
    ],
    "gateways": [
      "ZRH"
    ],
    "travelDays": 3,
    "transferDays": 0,
    "restDays": 1,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 190,
    "candidateItemIds": [],
    "season": "Approximate: summer/early fall for mountain paths; winter activities differ",
    "routeNote": "This one-country route does not claim the cross-border Bernina Express goal.",
    "assumptions": "9 consecutive calendar days from the Bay Area; 5 weekday PTO days before any holiday/WFH arrangement. 3 travel/arrival/jetlag buffer days, 0 base-change day, 1 rest day. One country, at most 1 overnight base(s). Door-to-door timing and site/program access still need checking."
  },
  {
    "id": "kerala-9",
    "familyId": "kerala",
    "title": "A backwater and hill-country Kerala focus · 9 days",
    "country": "India",
    "scope": "World",
    "days": 9,
    "ptoDays": 5,
    "hubIds": [
      "kerala"
    ],
    "baseLabels": [
      "Alappuzha / backwaters",
      "Munnar"
    ],
    "basePoints": [
      {
        "lat": 9.5,
        "lon": 76.34,
        "label": "Alappuzha / backwaters",
        "precision": "city area"
      },
      {
        "lat": 10.09,
        "lon": 77.06,
        "label": "Munnar",
        "precision": "city area"
      }
    ],
    "gateways": [
      "COK"
    ],
    "travelDays": 3,
    "transferDays": 1,
    "restDays": 1,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 190,
    "candidateItemIds": [],
    "season": "Approximate: seasonal rain/heat vary; choose actual dates",
    "routeNote": "One country and two overnight sectors; Kochi is an airport/transit gateway. The compound Kerala goal needs actual backwater and hill-country allocations.",
    "assumptions": "9 consecutive calendar days from the Bay Area; 5 weekday PTO days before any holiday/WFH arrangement. 3 travel/arrival/jetlag buffer days, 1 base-change day, 1 rest day. One country, at most 2 overnight base(s). Door-to-door timing and site/program access still need checking."
  },
  {
    "id": "rajasthan-9",
    "familyId": "rajasthan",
    "title": "Jaipur and Jodhpur fort-city choices · 9 days",
    "country": "India",
    "scope": "World",
    "days": 9,
    "ptoDays": 5,
    "hubIds": [
      "rajasthan"
    ],
    "baseLabels": [
      "Jaipur",
      "Jodhpur"
    ],
    "basePoints": [
      {
        "lat": 26.91,
        "lon": 75.79,
        "label": "Jaipur",
        "precision": "city area"
      },
      {
        "lat": 26.24,
        "lon": 73.02,
        "label": "Jodhpur",
        "precision": "city area"
      }
    ],
    "gateways": [
      "DEL",
      "JAI"
    ],
    "travelDays": 3,
    "transferDays": 1,
    "restDays": 1,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 190,
    "candidateItemIds": [],
    "season": "Approximate: often cooler months; heat and access vary",
    "routeNote": "One country and two fort-city bases. Agra/Jaisalmer are not added automatically.",
    "assumptions": "9 consecutive calendar days from the Bay Area; 5 weekday PTO days before any holiday/WFH arrangement. 3 travel/arrival/jetlag buffer days, 1 base-change day, 1 rest day. One country, at most 2 overnight base(s). Door-to-door timing and site/program access still need checking."
  },
  {
    "id": "bernina-rail-9",
    "familyId": "bernina-rail",
    "title": "St Moritz and the Bernina rail excursion · 9 days",
    "country": "Switzerland / Italy",
    "scope": "World",
    "days": 9,
    "ptoDays": 5,
    "hubIds": [],
    "baseLabels": [
      "St Moritz"
    ],
    "basePoints": [
      {
        "lat": 46.5,
        "lon": 9.84,
        "label": "St Moritz",
        "precision": "city area"
      }
    ],
    "gateways": [
      "ZRH"
    ],
    "travelDays": 3,
    "transferDays": 0,
    "restDays": 1,
    "exploreDayHours": 7,
    "transferDayHours": 8,
    "maxRadiusKm": 190,
    "candidateItemIds": [
      "LA-1016"
    ],
    "season": "Approximate: rail access/schedules and mountain weather vary",
    "routeNote": "An explicit St Moritz–Tirano international rail excursion and return, with one overnight base. The border crossing is disclosed; actual service dates and tickets need research.",
    "assumptions": "9 consecutive calendar days from the Bay Area; 5 weekday PTO days before any holiday/WFH arrangement. 3 travel/arrival/jetlag buffer days, 0 base-change day, 1 rest day. One Swiss overnight base with a disclosed Italian rail excursion, at most 1 overnight base(s). Door-to-door timing and site/program access still need checking.",
    "declaredContexts": {
      "LA-1016": {
        "lat": 46.5,
        "lon": 9.84,
        "label": "St Moritz boarding/base context for the named Bernina Express route; not a venue geocode."
      }
    },
    "fullDayItemIds": [
      "LA-1016"
    ]
  }
];
