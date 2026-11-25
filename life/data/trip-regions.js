/* Life Atlas geographic trip clusters.
 * Approximate base/city/place areas; these are not exact venue geocodes.
 * Duration bands describe local experience time, not a guaranteed flight/drive-inclusive itinerary.
 * Seasons are approximate preferences, not forecasts, closures or booking advice.
 * A cluster is a set of route choices. Read routeNote: many need one chosen sector or multiple bases.
 * Generic multi-city and cross-country ideas remain unmapped rather than receiving invented points.
 */
window.LIFE_TRIP_REGIONS = [
  {
    "id": "bay-area",
    "name": "Bay Area, wine country & Santa Cruz",
    "base": "San Francisco, California",
    "lat": 37.77,
    "lon": -122.42,
    "states": [
      "CA"
    ],
    "airports": [
      "SFO",
      "SJC",
      "OAK"
    ],
    "region": "West",
    "days": [
      "afternoon",
      "2-3",
      "4-5"
    ],
    "season": "Approximate: year-round city exploring; spring/fall for coastal and wine-country outings.",
    "summary": "Neighborhood cafés, public art, coastal walks, food workshops and nearby wine-country days. Easy to shape around solo afternoons from the South Bay.",
    "routeNote": "An afternoon means one local neighborhood or nearby outing. San Francisco, Santa Cruz, Point Reyes and Napa/Sonoma are different day choices; traffic and the home base change the drive.",
    "highlightIds": [
      "LA-0046",
      "LA-0199",
      "LA-0216",
      "LA-0308",
      "LA-0641",
      "LA-0096"
    ],
    "foodIds": [
      "LA-0015",
      "LA-0163",
      "LA-0169",
      "LA-0199",
      "LA-0215",
      "LA-0216",
      "LA-0261",
      "LA-0685",
      "LA-0686",
      "LA-0690"
    ],
    "itemIds": [
      "LA-0015",
      "LA-0046",
      "LA-0096",
      "LA-0122",
      "LA-0163",
      "LA-0169",
      "LA-0180",
      "LA-0199",
      "LA-0211",
      "LA-0215",
      "LA-0216",
      "LA-0221",
      "LA-0261",
      "LA-0267",
      "LA-0307",
      "LA-0308",
      "LA-0328",
      "LA-0341",
      "LA-0370",
      "LA-0375",
      "LA-0384",
      "LA-0393",
      "LA-0507",
      "LA-0511",
      "LA-0520",
      "LA-0539",
      "LA-0575",
      "LA-0576",
      "LA-0606",
      "LA-0625",
      "LA-0638",
      "LA-0641",
      "LA-0654",
      "LA-0683",
      "LA-0685",
      "LA-0686",
      "LA-0690"
    ],
    "earlyIds": [
      "LA-0096",
      "LA-0641"
    ],
    "primaryDays": "afternoon",
    "foodNote": ""
  },
  {
    "id": "central-coast",
    "name": "Monterey, Big Sur & the Central Coast",
    "base": "Monterey, California",
    "lat": 36.6,
    "lon": -121.89,
    "states": [
      "CA"
    ],
    "airports": [
      "MRY",
      "SBA",
      "SBP"
    ],
    "region": "West",
    "days": [
      "2-3",
      "4-5",
      "7-14"
    ],
    "season": "Approximate: spring through fall; winter has quieter coast visits, storms and whale seasons.",
    "summary": "Aquarium visits, ocean viewpoints, food and coffee stops, coastal villages and wildlife observation. Boat or kayak outings can be guided on a solo trip.",
    "routeNote": "Choose a northern Monterey/Big Sur base or a southern San Luis Obispo/Santa Barbara base. The whole coastal collection is a longer multi-base trip. Highway 1 closures and coastal conditions require a current check.",
    "highlightIds": [
      "LA-0358",
      "LA-0084",
      "LA-0664",
      "LA-0196",
      "LA-0689",
      "LA-0009"
    ],
    "foodIds": [
      "LA-0196",
      "LA-0689"
    ],
    "itemIds": [
      "LA-0009",
      "LA-0084",
      "LA-0136",
      "LA-0159",
      "LA-0196",
      "LA-0358",
      "LA-0418",
      "LA-0430",
      "LA-0454",
      "LA-0457",
      "LA-0480",
      "LA-0531",
      "LA-0544",
      "LA-0609",
      "LA-0618",
      "LA-0639",
      "LA-0649",
      "LA-0664",
      "LA-0689",
      "LA-0698",
      "LA-1050"
    ],
    "earlyIds": [],
    "primaryDays": "4-5",
    "foodNote": ""
  },
  {
    "id": "northern-california",
    "name": "Redwoods, Shasta & Northern California",
    "base": "Arcata, California",
    "lat": 40.87,
    "lon": -124.08,
    "states": [
      "CA"
    ],
    "airports": [
      "ACV",
      "RDD"
    ],
    "region": "West",
    "days": [
      "4-5",
      "7-14"
    ],
    "season": "Approximate: late spring to early fall for broader access; rain and snow affect specific routes.",
    "summary": "Tall trees, quiet forest walks, volcanic landscapes and northern coast towns. Choose shorter forest routes or supported hikes to match your effort preference.",
    "routeNote": "Coastal redwoods and the Shasta/Lassen interior are different sectors with substantial drives between them. Pick one for a short stay; use separate bases for a wider loop.",
    "highlightIds": [
      "LA-0161",
      "LA-0633",
      "LA-0557",
      "LA-0404"
    ],
    "foodIds": [],
    "itemIds": [
      "LA-0161",
      "LA-0404",
      "LA-0557",
      "LA-0633"
    ],
    "earlyIds": [],
    "primaryDays": "4-5",
    "foodNote": "The catalog’s local food ideas here are still growing. Add dishes and stops during regional research."
  },
  {
    "id": "sierra",
    "name": "Sierra parks, Yosemite & Tahoe",
    "base": "South Lake Tahoe, California",
    "lat": 38.94,
    "lon": -119.98,
    "states": [
      "CA",
      "NV"
    ],
    "airports": [
      "RNO",
      "FAT"
    ],
    "region": "West",
    "days": [
      "2-3",
      "4-5",
      "7-14"
    ],
    "season": "Approximate: summer/early fall for high routes; spring waterfalls and winter sports have different access.",
    "summary": "Granite landscapes, giant trees, lake paddling and mountain-town routines. Introductory water or climbing sessions can be guided while the trip stays solo.",
    "routeNote": "Tahoe, Yosemite, Sequoia/Kings Canyon and the eastern Sierra are separate base choices. Mountain passes and park entry systems can change access; a weekend should focus on one area.",
    "highlightIds": [
      "LA-0406",
      "LA-0044",
      "LA-0644",
      "LA-0303",
      "LA-0589",
      "LA-0004"
    ],
    "foodIds": [],
    "itemIds": [
      "LA-0004",
      "LA-0044",
      "LA-0083",
      "LA-0111",
      "LA-0120",
      "LA-0243",
      "LA-0247",
      "LA-0257",
      "LA-0303",
      "LA-0367",
      "LA-0369",
      "LA-0406",
      "LA-0419",
      "LA-0421",
      "LA-0496",
      "LA-0497",
      "LA-0589",
      "LA-0610",
      "LA-0644",
      "LA-0645",
      "LA-0672"
    ],
    "earlyIds": [
      "LA-0004",
      "LA-0247",
      "LA-0644",
      "LA-0672"
    ],
    "primaryDays": "4-5",
    "foodNote": "The catalog’s local food ideas here are still growing. Add dishes and stops during regional research."
  },
  {
    "id": "los-angeles",
    "name": "Los Angeles, Orange County & desert edges",
    "base": "Los Angeles, California",
    "lat": 34.05,
    "lon": -118.24,
    "states": [
      "CA"
    ],
    "airports": [
      "LAX",
      "BUR",
      "SNA",
      "PSP"
    ],
    "region": "West",
    "days": [
      "2-3",
      "4-5",
      "7-14"
    ],
    "season": "Approximate: year-round city/coast; spring/fall for desert outings, with summer heat limits.",
    "summary": "Museums, global kitchens, performance, neighborhood coffee and coastal stops, with optional desert and theme-park days. City experiences work well as solo outings.",
    "routeNote": "Los Angeles traffic makes neighborhood grouping matter. Orange County, Palm Springs/Joshua Tree and the mountain/desert edges are separate excursions or bases, not one afternoon.",
    "highlightIds": [
      "LA-0056",
      "LA-0265",
      "LA-0200",
      "LA-0175",
      "LA-0037",
      "LA-0453"
    ],
    "foodIds": [
      "LA-0167",
      "LA-0200",
      "LA-0265"
    ],
    "itemIds": [
      "LA-0037",
      "LA-0040",
      "LA-0041",
      "LA-0056",
      "LA-0089",
      "LA-0167",
      "LA-0175",
      "LA-0200",
      "LA-0208",
      "LA-0225",
      "LA-0265",
      "LA-0269",
      "LA-0296",
      "LA-0316",
      "LA-0355",
      "LA-0377",
      "LA-0379",
      "LA-0389",
      "LA-0453",
      "LA-0473",
      "LA-0506",
      "LA-0535",
      "LA-0573",
      "LA-0574",
      "LA-0577",
      "LA-0616",
      "LA-0661"
    ],
    "earlyIds": [
      "LA-0573",
      "LA-0574"
    ],
    "primaryDays": "2-3",
    "foodNote": ""
  },
  {
    "id": "san-diego",
    "name": "San Diego, Encinitas & the southern coast",
    "base": "San Diego, California",
    "lat": 32.72,
    "lon": -117.16,
    "states": [
      "CA"
    ],
    "airports": [
      "SAN"
    ],
    "region": "West",
    "days": [
      "2-3",
      "4-5"
    ],
    "season": "Approximate: year-round; coastal cloud patterns and ocean conditions vary.",
    "summary": "Balboa Park, coastal neighborhoods, coffee, beaches and beginner ocean skills. A surf or water lesson is compatible with a solo trip.",
    "routeNote": "San Diego is the city core; Encinitas and North County are optional extensions. Ocean activities depend on conditions and instruction, and a gentle beach day is a separate valid choice.",
    "highlightIds": [
      "LA-0623",
      "LA-0001",
      "LA-0091",
      "LA-0069",
      "LA-0097",
      "LA-0140"
    ],
    "foodIds": [
      "LA-0097"
    ],
    "itemIds": [
      "LA-0001",
      "LA-0069",
      "LA-0091",
      "LA-0097",
      "LA-0140",
      "LA-0183",
      "LA-0333",
      "LA-0478",
      "LA-0516",
      "LA-0545",
      "LA-0608",
      "LA-0623",
      "LA-0656",
      "LA-0694"
    ],
    "earlyIds": [
      "LA-0001"
    ],
    "primaryDays": "2-3",
    "foodNote": ""
  },
  {
    "id": "oregon",
    "name": "Portland, the Oregon coast & mountain routes",
    "base": "Portland, Oregon",
    "lat": 45.52,
    "lon": -122.68,
    "states": [
      "OR"
    ],
    "airports": [
      "PDX",
      "EUG",
      "RDM",
      "MFR"
    ],
    "region": "West",
    "days": [
      "2-3",
      "4-5",
      "7-14"
    ],
    "season": "Approximate: late spring through early fall for wider touring; winter sports have their own season.",
    "summary": "Food carts and coffee, Columbia Gorge viewpoints, coastal wildlife and forest or high-desert routes. Choose a city stay or a supported outdoor focus.",
    "routeNote": "Portland/Gorge, the coast, Bend and southern Oregon are different sectors. Crater Lake and Ashland need their own base or a longer loop; no short stay is intended to cover every Oregon item.",
    "highlightIds": [
      "LA-0266",
      "LA-0168",
      "LA-0650",
      "LA-0297",
      "LA-0067",
      "LA-0003"
    ],
    "foodIds": [
      "LA-0101",
      "LA-0168",
      "LA-0193",
      "LA-0266",
      "LA-0487",
      "LA-0693"
    ],
    "itemIds": [
      "LA-0003",
      "LA-0067",
      "LA-0101",
      "LA-0128",
      "LA-0168",
      "LA-0187",
      "LA-0193",
      "LA-0258",
      "LA-0266",
      "LA-0297",
      "LA-0306",
      "LA-0312",
      "LA-0336",
      "LA-0356",
      "LA-0365",
      "LA-0433",
      "LA-0487",
      "LA-0512",
      "LA-0582",
      "LA-0631",
      "LA-0650",
      "LA-0662",
      "LA-0670",
      "LA-0693"
    ],
    "earlyIds": [
      "LA-0003"
    ],
    "primaryDays": "4-5",
    "foodNote": ""
  },
  {
    "id": "washington",
    "name": "Seattle, Puget Sound & Washington nature",
    "base": "Seattle, Washington",
    "lat": 47.61,
    "lon": -122.33,
    "states": [
      "WA"
    ],
    "airports": [
      "SEA",
      "PAE"
    ],
    "region": "West",
    "days": [
      "2-3",
      "4-5",
      "7-14"
    ],
    "season": "Approximate: summer/early fall for mountain access; city and coast visits vary year-round.",
    "summary": "Markets, ferry rituals, island wildlife, forests and mountain views. Guided sea kayaking or nature outings can sit inside an otherwise solo itinerary.",
    "routeNote": "Seattle is the short-trip core. San Juan Islands, Olympic Peninsula, Mount Rainier and eastern Washington each need a chosen route, ferry/access checks and sometimes another base.",
    "highlightIds": [
      "LA-0165",
      "LA-0642",
      "LA-0081",
      "LA-0403",
      "LA-0133",
      "LA-0240"
    ],
    "foodIds": [
      "LA-0165",
      "LA-0201",
      "LA-0488",
      "LA-0692"
    ],
    "itemIds": [
      "LA-0081",
      "LA-0090",
      "LA-0133",
      "LA-0165",
      "LA-0201",
      "LA-0232",
      "LA-0233",
      "LA-0240",
      "LA-0253",
      "LA-0272",
      "LA-0276",
      "LA-0294",
      "LA-0300",
      "LA-0335",
      "LA-0351",
      "LA-0366",
      "LA-0385",
      "LA-0403",
      "LA-0417",
      "LA-0434",
      "LA-0446",
      "LA-0488",
      "LA-0523",
      "LA-0529",
      "LA-0634",
      "LA-0642",
      "LA-0652",
      "LA-0655",
      "LA-0659",
      "LA-0692"
    ],
    "earlyIds": [
      "LA-0090",
      "LA-0642"
    ],
    "primaryDays": "4-5",
    "foodNote": ""
  },
  {
    "id": "las-vegas-desert",
    "name": "Las Vegas, Death Valley & the Mojave",
    "base": "Las Vegas, Nevada",
    "lat": 36.17,
    "lon": -115.14,
    "states": [
      "NV",
      "CA"
    ],
    "airports": [
      "LAS"
    ],
    "region": "Mountain West",
    "days": [
      "2-3",
      "4-5"
    ],
    "season": "Approximate: fall through spring for desert walking; extreme summer heat changes outdoor options.",
    "summary": "Desert geology, scenic viewpoints, dark skies and city entertainment. Choose low-effort viewpoints or carefully supported outdoor activity.",
    "routeNote": "Valley of Fire is a different outing from Death Valley. Long desert drives, limited services, heat and current road access matter; a weekend should choose one desert focus.",
    "highlightIds": [
      "LA-0077",
      "LA-0177",
      "LA-0181",
      "LA-0354",
      "LA-0172"
    ],
    "foodIds": [],
    "itemIds": [
      "LA-0077",
      "LA-0172",
      "LA-0177",
      "LA-0181",
      "LA-0354"
    ],
    "earlyIds": [],
    "primaryDays": "4-5",
    "foodNote": "The catalog’s local food ideas here are still growing. Add dishes and stops during regional research."
  },
  {
    "id": "northern-arizona",
    "name": "Sedona, Flagstaff & the Grand Canyon region",
    "base": "Flagstaff, Arizona",
    "lat": 35.2,
    "lon": -111.65,
    "states": [
      "AZ",
      "UT"
    ],
    "airports": [
      "FLG",
      "PHX"
    ],
    "region": "Mountain West",
    "days": [
      "2-3",
      "4-5",
      "7-14"
    ],
    "season": "Approximate: spring/fall; elevation creates snow and heat differences within the region.",
    "summary": "Red-rock scenery, canyon viewpoints, desert history and optional guided outdoor experiences. Effort ranges from overlooks to demanding hiking or rafting.",
    "routeNote": "Sedona/Flagstaff, the South Rim, Page and Monument Valley are separate sectors. Choose one or two nearby bases; rafting, Havasu access and guided canyon visits need their own research.",
    "highlightIds": [
      "LA-0082",
      "LA-0551",
      "LA-0108",
      "LA-0110",
      "LA-0666",
      "LA-0464"
    ],
    "foodIds": [],
    "itemIds": [
      "LA-0008",
      "LA-0082",
      "LA-0085",
      "LA-0105",
      "LA-0108",
      "LA-0110",
      "LA-0173",
      "LA-0226",
      "LA-0241",
      "LA-0281",
      "LA-0285",
      "LA-0302",
      "LA-0313",
      "LA-0400",
      "LA-0464",
      "LA-0491",
      "LA-0547",
      "LA-0551",
      "LA-0647",
      "LA-0666"
    ],
    "earlyIds": [
      "LA-0647"
    ],
    "primaryDays": "4-5",
    "foodNote": "The catalog’s local food ideas here are still growing. Add dishes and stops during regional research."
  },
  {
    "id": "southern-arizona",
    "name": "Phoenix, Tucson & the Sonoran Desert",
    "base": "Tucson, Arizona",
    "lat": 32.22,
    "lon": -110.97,
    "states": [
      "AZ"
    ],
    "airports": [
      "TUS",
      "PHX"
    ],
    "region": "Mountain West",
    "days": [
      "2-3",
      "4-5"
    ],
    "season": "Approximate: roughly fall through spring; summer heat can make outdoor activity unsuitable.",
    "summary": "Desert gardens, saguaro landscapes, cave visits and restorative stays, with city food discoveries to add. Solo sightseeing can be paired with guided hikes.",
    "routeNote": "Phoenix and Tucson are separate city bases. Cave tours, desert outings and spa stays should be chosen around access and conditions; the listed items are alternatives, not a single weekend checklist.",
    "highlightIds": [
      "LA-0176",
      "LA-0116",
      "LA-0543",
      "LA-0503",
      "LA-0219",
      "LA-0394"
    ],
    "foodIds": [],
    "itemIds": [
      "LA-0116",
      "LA-0176",
      "LA-0219",
      "LA-0394",
      "LA-0503",
      "LA-0543",
      "LA-0548"
    ],
    "earlyIds": [],
    "primaryDays": "4-5",
    "foodNote": "The catalog’s local food ideas here are still growing. Add dishes and stops during regional research."
  },
  {
    "id": "zion-bryce",
    "name": "Zion, Bryce & southern Utah",
    "base": "St. George, Utah",
    "lat": 37.1,
    "lon": -113.58,
    "states": [
      "UT"
    ],
    "airports": [
      "SGU",
      "LAS"
    ],
    "region": "Mountain West",
    "days": [
      "4-5",
      "7-14"
    ],
    "season": "Approximate: spring/fall for many routes; snow and heat differ between parks and elevations.",
    "summary": "Canyon scenery, sunrise viewpoints, geology and adjustable walking routes. Short walks and guided support offer alternatives to demanding trails.",
    "routeNote": "Zion and Bryce require a planned base change or substantial drives. Escalante and other Utah extensions make a longer trip; shuttle rules, permits and seasonal conditions need current checks.",
    "highlightIds": [
      "LA-0107",
      "LA-0076",
      "LA-0244",
      "LA-0463",
      "LA-0106",
      "LA-0245"
    ],
    "foodIds": [],
    "itemIds": [
      "LA-0076",
      "LA-0106",
      "LA-0107",
      "LA-0244",
      "LA-0245",
      "LA-0410",
      "LA-0413",
      "LA-0463",
      "LA-0567"
    ],
    "earlyIds": [
      "LA-0244"
    ],
    "primaryDays": "4-5",
    "foodNote": "The catalog’s local food ideas here are still growing. Add dishes and stops during regional research."
  },
  {
    "id": "moab",
    "name": "Moab, Arches & Canyonlands",
    "base": "Moab, Utah",
    "lat": 38.57,
    "lon": -109.55,
    "states": [
      "UT"
    ],
    "airports": [
      "CNY",
      "GJT"
    ],
    "region": "Mountain West",
    "days": [
      "4-5",
      "7-14"
    ],
    "season": "Approximate: spring/fall; summer heat and winter conditions affect outdoor choices.",
    "summary": "Desert arches, canyon overlooks, dark skies and optional guided climbing, paddling or scenic outings. Choose the effort and support that feel right.",
    "routeNote": "Moab is the core. Canyonlands districts and Natural Bridges/Blanding are not all close together; remote routes, permits, water and road conditions affect the plan.",
    "highlightIds": [
      "LA-0171",
      "LA-0080",
      "LA-0568",
      "LA-0504",
      "LA-0407",
      "LA-0412"
    ],
    "foodIds": [],
    "itemIds": [
      "LA-0080",
      "LA-0171",
      "LA-0407",
      "LA-0412",
      "LA-0504",
      "LA-0568"
    ],
    "earlyIds": [],
    "primaryDays": "4-5",
    "foodNote": "The catalog’s local food ideas here are still growing. Add dishes and stops during regional research."
  },
  {
    "id": "salt-lake-idaho",
    "name": "Salt Lake City, the Great Basin & southern Idaho",
    "base": "Salt Lake City, Utah",
    "lat": 40.76,
    "lon": -111.89,
    "states": [
      "UT",
      "ID",
      "NV",
      "CO"
    ],
    "airports": [
      "SLC",
      "BOI",
      "TWF"
    ],
    "region": "Mountain West",
    "days": [
      "2-3",
      "4-5",
      "7-14"
    ],
    "season": "Approximate: summer/early fall for many mountain routes; winter sports and cave access vary.",
    "summary": "City rituals, the Great Salt Lake, mountain sports and separate southern Idaho volcanic/river landscapes. Guided skills can fit a solo stay.",
    "routeNote": "Salt Lake/Park City is the short-trip core. Great Basin, Twin Falls and the Salmon River country require different bases and longer drives; choose a sector or a carefully paced longer route.",
    "highlightIds": [
      "LA-0449",
      "LA-0651",
      "LA-0629",
      "LA-0668",
      "LA-0558",
      "LA-0117"
    ],
    "foodIds": [],
    "itemIds": [
      "LA-0117",
      "LA-0391",
      "LA-0414",
      "LA-0449",
      "LA-0498",
      "LA-0558",
      "LA-0629",
      "LA-0651",
      "LA-0668"
    ],
    "earlyIds": [
      "LA-0668"
    ],
    "primaryDays": "4-5",
    "foodNote": "The catalog’s local food ideas here are still growing. Add dishes and stops during regional research."
  },
  {
    "id": "colorado",
    "name": "Colorado Front Range & the Rockies",
    "base": "Denver, Colorado",
    "lat": 39.74,
    "lon": -104.99,
    "states": [
      "CO"
    ],
    "airports": [
      "DEN",
      "COS",
      "DRO"
    ],
    "region": "Mountain West",
    "days": [
      "2-3",
      "4-5",
      "7-14"
    ],
    "season": "Approximate: summer/early fall for high-country routes; winter sports require separate planning.",
    "summary": "Denver/Boulder routines, mountain scenery, hot springs and outdoor skills. Effort varies by altitude, route and season; instructors and guides can support solo trips.",
    "routeNote": "A weekend should focus on Denver/Boulder or one mountain base. Aspen, Gunnison, Durango and the southern Rockies are major extensions, not casual Front Range day trips. Check passes and park systems.",
    "highlightIds": [
      "LA-0104",
      "LA-0409",
      "LA-0189",
      "LA-0667",
      "LA-0109",
      "LA-0131"
    ],
    "foodIds": [
      "LA-0104"
    ],
    "itemIds": [
      "LA-0104",
      "LA-0109",
      "LA-0131",
      "LA-0189",
      "LA-0252",
      "LA-0256",
      "LA-0278",
      "LA-0286",
      "LA-0319",
      "LA-0368",
      "LA-0382",
      "LA-0409",
      "LA-0436",
      "LA-0462",
      "LA-0471",
      "LA-0492",
      "LA-0499",
      "LA-0510",
      "LA-0667"
    ],
    "earlyIds": [
      "LA-0667"
    ],
    "primaryDays": "4-5",
    "foodNote": ""
  },
  {
    "id": "yellowstone-tetons",
    "name": "Yellowstone, Grand Teton & nearby Wyoming/Montana",
    "base": "Jackson, Wyoming",
    "lat": 43.48,
    "lon": -110.76,
    "states": [
      "WY",
      "MT"
    ],
    "airports": [
      "JAC",
      "BZN",
      "COD"
    ],
    "region": "Mountain West",
    "days": [
      "4-5",
      "7-14"
    ],
    "season": "Approximate: roughly late spring to early fall for broader road access; winter uses a different model.",
    "summary": "Geysers, mountain lakes, wildlife observation and supported water or walking experiences. Overlooks and gentle routes can balance more demanding days.",
    "routeNote": "Yellowstone and Grand Teton deserve separate time and possibly bases. The northern Montana history sites are longer route extensions. Distances, wildlife delays and seasonal closures rule out covering the full collection quickly.",
    "highlightIds": [
      "LA-0405",
      "LA-0362",
      "LA-0680",
      "LA-0671",
      "LA-0588",
      "LA-0192"
    ],
    "foodIds": [],
    "itemIds": [
      "LA-0192",
      "LA-0362",
      "LA-0401",
      "LA-0405",
      "LA-0493",
      "LA-0494",
      "LA-0588",
      "LA-0628",
      "LA-0671",
      "LA-0675",
      "LA-0679",
      "LA-0680"
    ],
    "earlyIds": [],
    "primaryDays": "4-5",
    "foodNote": "The catalog’s local food ideas here are still growing. Add dishes and stops during regional research."
  },
  {
    "id": "glacier-montana",
    "name": "Glacier, Flathead Valley & western Montana",
    "base": "Kalispell, Montana",
    "lat": 48.2,
    "lon": -114.32,
    "states": [
      "MT"
    ],
    "airports": [
      "FCA",
      "MSO"
    ],
    "region": "Mountain West",
    "days": [
      "4-5",
      "7-14"
    ],
    "season": "Approximate: summer/early fall for broader mountain-road access; exact opening dates vary.",
    "summary": "Mountain scenery, lakes, forest walks and western Montana stays. A solo trip can combine gentle viewpoints with optional guided hiking.",
    "routeNote": "Glacier/Flathead is one focus; Missoula and western Montana stays are extensions. Going-to-the-Sun access, weather and route length need current checks; high routes are optional, not required.",
    "highlightIds": [
      "LA-0459",
      "LA-0242",
      "LA-0612",
      "LA-0229",
      "LA-0299",
      "LA-0399"
    ],
    "foodIds": [],
    "itemIds": [
      "LA-0229",
      "LA-0242",
      "LA-0299",
      "LA-0399",
      "LA-0424",
      "LA-0459",
      "LA-0566",
      "LA-0612"
    ],
    "earlyIds": [],
    "primaryDays": "4-5",
    "foodNote": "The catalog’s local food ideas here are still growing. Add dishes and stops during regional research."
  },
  {
    "id": "new-mexico",
    "name": "Santa Fe, Albuquerque & northern New Mexico",
    "base": "Santa Fe, New Mexico",
    "lat": 35.69,
    "lon": -105.94,
    "states": [
      "NM",
      "CO"
    ],
    "airports": [
      "SAF",
      "ABQ"
    ],
    "region": "Mountain West",
    "days": [
      "2-3",
      "4-5",
      "7-14"
    ],
    "season": "Approximate: spring/fall for many outings; winter snow and summer heat change the route.",
    "summary": "Chile and tortilla workshops, farmers markets, galleries, Pueblo history and desert/river wildlife. City culture and guided heritage visits suit a solo stay.",
    "routeNote": "Santa Fe is the short-trip core; Albuquerque, Taos, Chimayó, Chaco and Bosque del Apache are different extensions. Community visitor rules and remote road conditions matter. Southern New Mexico belongs to a separate longer route.",
    "highlightIds": [
      "LA-0217",
      "LA-0203",
      "LA-0057",
      "LA-0553",
      "LA-0552",
      "LA-0007"
    ],
    "foodIds": [
      "LA-0203",
      "LA-0217"
    ],
    "itemIds": [
      "LA-0007",
      "LA-0033",
      "LA-0053",
      "LA-0057",
      "LA-0203",
      "LA-0206",
      "LA-0217",
      "LA-0237",
      "LA-0255",
      "LA-0280",
      "LA-0284",
      "LA-0337",
      "LA-0343",
      "LA-0470",
      "LA-0521",
      "LA-0534",
      "LA-0552",
      "LA-0553",
      "LA-0555",
      "LA-0684"
    ],
    "earlyIds": [],
    "primaryDays": "2-3",
    "foodNote": ""
  },
  {
    "id": "west-texas",
    "name": "Big Bend, west Texas & southern New Mexico edges",
    "base": "Alpine, Texas",
    "lat": 30.36,
    "lon": -103.66,
    "states": [
      "TX",
      "NM"
    ],
    "airports": [
      "MAF",
      "ELP"
    ],
    "region": "South",
    "days": [
      "4-5",
      "7-14"
    ],
    "season": "Approximate: fall through spring for many desert outings; summer heat changes outdoor options.",
    "summary": "Wide desert landscapes, Big Bend, Guadalupe Mountains and cave/white-sand extensions. Pick gentler viewpoints or supported hiking rather than treating effort as a fixed requirement.",
    "routeNote": "Airports are gateways with long onward drives. Big Bend, El Paso, Carlsbad and White Sands are separate sectors; a short trip should choose one. A wider loop needs additional time, services and heat/access checks.",
    "highlightIds": [
      "LA-0174",
      "LA-0114",
      "LA-0178"
    ],
    "foodIds": [],
    "itemIds": [
      "LA-0114",
      "LA-0174",
      "LA-0178"
    ],
    "earlyIds": [],
    "primaryDays": "4-5",
    "foodNote": "The catalog’s local food ideas here are still growing. Add dishes and stops during regional research."
  },
  {
    "id": "kansas-city",
    "name": "Kansas City & the eastern Kansas edge",
    "base": "Kansas City, Missouri",
    "lat": 39.1,
    "lon": -94.58,
    "states": [
      "MO",
      "KS"
    ],
    "airports": [
      "MCI"
    ],
    "region": "Central",
    "days": [
      "2-3",
      "4-5"
    ],
    "season": "Approximate: spring/fall; summer can be hot and winter weather changes road plans.",
    "summary": "Barbecue, city neighborhoods, jazz possibilities and the nearby Kansas history/prairie route. City experiences are easy to enjoy solo.",
    "routeNote": "Kansas City is the short-trip core. Topeka and the Tallgrass Prairie area are optional separate excursions; a prairie visit is not a quick downtown stop. St. Louis and the Ozarks belong to a different cluster.",
    "highlightIds": [
      "LA-0060",
      "LA-0147",
      "LA-0445"
    ],
    "foodIds": [
      "LA-0060"
    ],
    "itemIds": [
      "LA-0060",
      "LA-0147",
      "LA-0445"
    ],
    "earlyIds": [],
    "primaryDays": "2-3",
    "foodNote": ""
  },
  {
    "id": "st-louis-ozarks",
    "name": "St. Louis & Missouri Ozarks choices",
    "base": "St. Louis, Missouri",
    "lat": 38.63,
    "lon": -90.2,
    "states": [
      "MO",
      "IL"
    ],
    "airports": [
      "STL",
      "SGF"
    ],
    "region": "Central",
    "days": [
      "2-3",
      "4-5",
      "7-14"
    ],
    "season": "Approximate: spring/fall for many outings; summer offers longer days with heat.",
    "summary": "Barbecue, gardens, museums and city walks, with quieter Missouri town or Ozarks extensions. A solo city stay can stay gentle and compact.",
    "routeNote": "St. Louis is the weekend core. Hermann, Branson and the southern Ozarks require chosen extensions or a different base; the full Missouri collection is not one short trip. Arkansas has its own cluster.",
    "highlightIds": [
      "LA-0064",
      "LA-0127",
      "LA-0700",
      "LA-0287",
      "LA-0223",
      "LA-0318"
    ],
    "foodIds": [
      "LA-0064"
    ],
    "itemIds": [
      "LA-0064",
      "LA-0127",
      "LA-0223",
      "LA-0287",
      "LA-0318",
      "LA-0388",
      "LA-0700"
    ],
    "earlyIds": [],
    "primaryDays": "2-3",
    "foodNote": ""
  },
  {
    "id": "chicago",
    "name": "Chicago, nearby Wisconsin & city escapes",
    "base": "Chicago, Illinois",
    "lat": 41.88,
    "lon": -87.63,
    "states": [
      "IL",
      "WI",
      "IN"
    ],
    "airports": [
      "ORD",
      "MDW",
      "MKE"
    ],
    "region": "Central",
    "days": [
      "2-3",
      "4-5"
    ],
    "season": "Approximate: late spring through early fall for lakefront days; winter offers indoor culture.",
    "summary": "Architecture on the river, food neighborhoods, museums, improv and lakefront routines. A transit-based solo trip can focus on a few neighborhoods.",
    "routeNote": "Chicago is the short-trip core. Milwaukee/Madison, Galena and Indianapolis are separate extensions or bases. Michigan and the eastern Great Lakes are different trip choices, not adjacent city stops.",
    "highlightIds": [
      "LA-0045",
      "LA-0262",
      "LA-0580",
      "LA-0621",
      "LA-0560",
      "LA-0330"
    ],
    "foodIds": [
      "LA-0164",
      "LA-0198",
      "LA-0213",
      "LA-0262"
    ],
    "itemIds": [
      "LA-0045",
      "LA-0164",
      "LA-0198",
      "LA-0209",
      "LA-0213",
      "LA-0262",
      "LA-0270",
      "LA-0330",
      "LA-0344",
      "LA-0371",
      "LA-0500",
      "LA-0518",
      "LA-0528",
      "LA-0560",
      "LA-0561",
      "LA-0563",
      "LA-0580",
      "LA-0621",
      "LA-0701"
    ],
    "earlyIds": [],
    "primaryDays": "2-3",
    "foodNote": ""
  },
  {
    "id": "great-lakes",
    "name": "Great Lakes shores & northern Rust Belt cities",
    "base": "Detroit, Michigan",
    "lat": 42.33,
    "lon": -83.05,
    "states": [
      "MI",
      "OH",
      "PA",
      "NY"
    ],
    "airports": [
      "DTW",
      "CLE",
      "PIT",
      "BUF"
    ],
    "region": "Central",
    "days": [
      "2-3",
      "4-5",
      "7-14"
    ],
    "season": "Approximate: late spring through early fall for shore routes; foliage and winter culture vary.",
    "summary": "Lakeshore dunes, lighthouse routes, city museums and food/beer stops, with Niagara and western Pennsylvania choices. Solo city stays can mix with guided lake activities.",
    "routeNote": "Pick a city or a shore sector: Detroit/Michigan, Cleveland/Ohio, Pittsburgh or Buffalo/Niagara. These are alternatives across a broad corridor; a weekend should not attempt them all. Mackinac and northern Michigan need their own pacing.",
    "highlightIds": [
      "LA-0304",
      "LA-0607",
      "LA-0646",
      "LA-0100",
      "LA-0010",
      "LA-0014"
    ],
    "foodIds": [
      "LA-0100",
      "LA-0688"
    ],
    "itemIds": [
      "LA-0010",
      "LA-0014",
      "LA-0036",
      "LA-0100",
      "LA-0132",
      "LA-0179",
      "LA-0182",
      "LA-0268",
      "LA-0298",
      "LA-0304",
      "LA-0345",
      "LA-0428",
      "LA-0431",
      "LA-0437",
      "LA-0607",
      "LA-0611",
      "LA-0646",
      "LA-0688"
    ],
    "earlyIds": [],
    "primaryDays": "2-3",
    "foodNote": ""
  },
  {
    "id": "twin-cities",
    "name": "Twin Cities, Duluth & Lake Superior",
    "base": "Minneapolis, Minnesota",
    "lat": 44.98,
    "lon": -93.27,
    "states": [
      "MN",
      "WI",
      "MI"
    ],
    "airports": [
      "MSP",
      "DLH"
    ],
    "region": "Central",
    "days": [
      "2-3",
      "4-5",
      "7-14"
    ],
    "season": "Approximate: summer/early fall for lake country; winter has different activity and driving needs.",
    "summary": "City routines, northern lakes, sauna traditions and Boundary Waters possibilities. Guided paddling can support solo travel; the regional food catalog can keep growing.",
    "routeNote": "Twin Cities is the weekend base; Duluth/North Shore or Ely/Boundary Waters are different extensions. Multi-day wilderness paddling needs route, outfitter and permit decisions and cannot be inferred from a city weekend.",
    "highlightIds": [
      "LA-0190",
      "LA-0310",
      "LA-0657",
      "LA-0395",
      "LA-0429",
      "LA-0432"
    ],
    "foodIds": [],
    "itemIds": [
      "LA-0190",
      "LA-0310",
      "LA-0395",
      "LA-0429",
      "LA-0432",
      "LA-0444",
      "LA-0657"
    ],
    "earlyIds": [],
    "primaryDays": "2-3",
    "foodNote": "The catalog’s local food ideas here are still growing. Add dishes and stops during regional research."
  },
  {
    "id": "black-hills",
    "name": "Black Hills, Badlands & southwest South Dakota",
    "base": "Rapid City, South Dakota",
    "lat": 44.08,
    "lon": -103.23,
    "states": [
      "SD",
      "WY"
    ],
    "airports": [
      "RAP"
    ],
    "region": "Central",
    "days": [
      "4-5",
      "7-14"
    ],
    "season": "Approximate: late spring through early fall; heat, storms and winter conditions vary.",
    "summary": "Badlands scenery, cave visits, prairie wildlife and Black Hills walks. Cave tours and adjustable trails offer choices across effort levels.",
    "routeNote": "Rapid City is a gateway, not an exact location for every attraction. Badlands, Devils Tower across the Wyoming border and the southern Black Hills require planned drives; cave tours and outdoor access need current checks. North Dakota would be a separate longer trip.",
    "highlightIds": [
      "LA-0411",
      "LA-0121",
      "LA-0115",
      "LA-0390"
    ],
    "foodIds": [],
    "itemIds": [
      "LA-0115",
      "LA-0121",
      "LA-0390",
      "LA-0411"
    ],
    "earlyIds": [],
    "primaryDays": "4-5",
    "foodNote": "The catalog’s local food ideas here are still growing. Add dishes and stops during regional research."
  },
  {
    "id": "omaha-plains",
    "name": "Omaha, the Platte River & Iowa choices",
    "base": "Omaha, Nebraska",
    "lat": 41.26,
    "lon": -95.94,
    "states": [
      "NE",
      "IA"
    ],
    "airports": [
      "OMA",
      "DSM"
    ],
    "region": "Central",
    "days": [
      "2-3",
      "4-5",
      "7-14"
    ],
    "season": "Approximate: spring for crane migration; other city and prairie outings vary by season.",
    "summary": "City museums and family-friendly science/nature, Iowa fair traditions and a seasonal Platte River birding focus. Guided birding works well within a solo trip.",
    "routeNote": "Omaha, Des Moines and the central Nebraska crane area are different base choices. Migration timing and viewing etiquette need checking. A plains road trip should allow the actual distances rather than treating neighboring states as one city.",
    "highlightIds": [
      "LA-0011",
      "LA-0275",
      "LA-0438",
      "LA-0699"
    ],
    "foodIds": [],
    "itemIds": [
      "LA-0011",
      "LA-0275",
      "LA-0438",
      "LA-0699"
    ],
    "earlyIds": [],
    "primaryDays": "2-3",
    "foodNote": "The catalog’s local food ideas here are still growing. Add dishes and stops during regional research."
  },
  {
    "id": "arkansas",
    "name": "Arkansas: Hot Springs & northwest Ozarks",
    "base": "Little Rock, Arkansas",
    "lat": 34.75,
    "lon": -92.29,
    "states": [
      "AR"
    ],
    "airports": [
      "LIT",
      "XNA"
    ],
    "region": "Central",
    "days": [
      "2-3",
      "4-5"
    ],
    "season": "Approximate: spring/fall for walking and touring; summer is warmer and more humid.",
    "summary": "Hot Springs history, Eureka Springs streets and quieter Ozarks routines. Build a gentle solo town stay or add a suitable outdoor route; local food ideas can be added as research grows.",
    "routeNote": "Choose central Arkansas/Hot Springs or northwest Arkansas/Eureka Springs for a short stay. Moving between those sectors needs a longer drive and possibly another base; St. Louis is a separate trip.",
    "highlightIds": [
      "LA-0254",
      "LA-0526"
    ],
    "foodIds": [],
    "itemIds": [
      "LA-0254",
      "LA-0526"
    ],
    "earlyIds": [],
    "primaryDays": "2-3",
    "foodNote": "The catalog’s local food ideas here are still growing. Add dishes and stops during regional research."
  },
  {
    "id": "texas-cities",
    "name": "Austin, San Antonio & southeast Texas choices",
    "base": "Austin, Texas",
    "lat": 30.27,
    "lon": -97.74,
    "states": [
      "TX"
    ],
    "airports": [
      "AUS",
      "SAT",
      "IAH",
      "HOU"
    ],
    "region": "South",
    "days": [
      "2-3",
      "4-5",
      "7-14"
    ],
    "season": "Approximate: spring/fall for outdoor city touring; summer heat changes the pace.",
    "summary": "Tacos and barbecue, music, riverfront walks, history and optional Houston science. City food and performance experiences suit a solo stay.",
    "routeNote": "Austin/San Antonio is one route; Houston and the Gulf Coast are a different extension or base. A weekend should choose one core. West Texas/Big Bend is a distinct trip with much larger onward distances.",
    "highlightIds": [
      "LA-0065",
      "LA-0212",
      "LA-0349",
      "LA-0440",
      "LA-0538",
      "LA-0550"
    ],
    "foodIds": [
      "LA-0065",
      "LA-0098",
      "LA-0263",
      "LA-0691"
    ],
    "itemIds": [
      "LA-0065",
      "LA-0098",
      "LA-0212",
      "LA-0263",
      "LA-0349",
      "LA-0378",
      "LA-0440",
      "LA-0527",
      "LA-0538",
      "LA-0550",
      "LA-0595",
      "LA-0622",
      "LA-0691"
    ],
    "earlyIds": [],
    "primaryDays": "2-3",
    "foodNote": ""
  },
  {
    "id": "new-orleans",
    "name": "New Orleans & the Louisiana river/coast",
    "base": "New Orleans, Louisiana",
    "lat": 29.95,
    "lon": -90.07,
    "states": [
      "LA"
    ],
    "airports": [
      "MSY"
    ],
    "region": "South",
    "days": [
      "2-3",
      "4-5"
    ],
    "season": "Approximate: fall through spring for many walking days; festival dates, heat and storm season vary.",
    "summary": "Creole/Cajun food, neighborhood jazz, river history and unhurried café routines. A solo city stay can use guided heritage or wetland visits when useful.",
    "routeNote": "New Orleans is the short-trip core. River-parish history and coastal excursions are separate outings with transport needs. Choose guided historical interpretation and current storm/access information when planning.",
    "highlightIds": [
      "LA-0052",
      "LA-0170",
      "LA-0205",
      "LA-0321",
      "LA-0326",
      "LA-0509"
    ],
    "foodIds": [
      "LA-0170",
      "LA-0259",
      "LA-0485"
    ],
    "itemIds": [
      "LA-0052",
      "LA-0138",
      "LA-0154",
      "LA-0170",
      "LA-0205",
      "LA-0210",
      "LA-0259",
      "LA-0321",
      "LA-0326",
      "LA-0339",
      "LA-0376",
      "LA-0381",
      "LA-0485",
      "LA-0509",
      "LA-0513"
    ],
    "earlyIds": [],
    "primaryDays": "2-3",
    "foodNote": ""
  },
  {
    "id": "tennessee-kentucky",
    "name": "Memphis, Nashville & Tennessee/Kentucky choices",
    "base": "Nashville, Tennessee",
    "lat": 36.16,
    "lon": -86.78,
    "states": [
      "TN",
      "KY",
      "IN"
    ],
    "airports": [
      "BNA",
      "MEM",
      "SDF"
    ],
    "region": "South",
    "days": [
      "2-3",
      "4-5",
      "7-14"
    ],
    "season": "Approximate: spring/fall for city touring; music and sporting events have specific dates.",
    "summary": "Music scenes, barbecue, civil-rights history, Kentucky cave/horse traditions and optional quieter towns. Indoor culture offers a lower-effort solo route.",
    "routeNote": "Memphis and Nashville are different city bases; Louisville/Mammoth Cave and southern Indiana are extensions. Choose one core for a weekend. The Smokies are grouped separately with Appalachian nature routes.",
    "highlightIds": [
      "LA-0062",
      "LA-0119",
      "LA-0135",
      "LA-0207",
      "LA-0239",
      "LA-0149"
    ],
    "foodIds": [
      "LA-0062"
    ],
    "itemIds": [
      "LA-0062",
      "LA-0119",
      "LA-0135",
      "LA-0149",
      "LA-0156",
      "LA-0207",
      "LA-0239",
      "LA-0322",
      "LA-0325",
      "LA-0383",
      "LA-0416",
      "LA-0443",
      "LA-0455",
      "LA-0562"
    ],
    "earlyIds": [],
    "primaryDays": "2-3",
    "foodNote": ""
  },
  {
    "id": "atlanta-alabama",
    "name": "Atlanta & Alabama history/culture choices",
    "base": "Atlanta, Georgia",
    "lat": 33.75,
    "lon": -84.39,
    "states": [
      "GA",
      "AL"
    ],
    "airports": [
      "ATL",
      "BHM",
      "MGM"
    ],
    "region": "South",
    "days": [
      "2-3",
      "4-5",
      "7-14"
    ],
    "season": "Approximate: spring/fall for city walks; summer heat and humidity change the pace.",
    "summary": "City culture, public parks, museums and deeply interpreted civil-rights history, with regional food traditions. Solo trips can be structured around walking districts and guided history.",
    "routeNote": "Atlanta is one base; Birmingham, Montgomery/Selma and northern Alabama are different routes. A short stay should choose a city or history corridor. Savannah/coastal Georgia and the Carolinas have separate clusters.",
    "highlightIds": [
      "LA-0058",
      "LA-0126",
      "LA-0146",
      "LA-0624",
      "LA-0148",
      "LA-0152"
    ],
    "foodIds": [
      "LA-0058"
    ],
    "itemIds": [
      "LA-0058",
      "LA-0126",
      "LA-0146",
      "LA-0148",
      "LA-0152",
      "LA-0153",
      "LA-0157",
      "LA-0249",
      "LA-0565",
      "LA-0624",
      "LA-0697"
    ],
    "earlyIds": [],
    "primaryDays": "2-3",
    "foodNote": ""
  },
  {
    "id": "lowcountry",
    "name": "Charleston, Savannah & the Lowcountry",
    "base": "Charleston, South Carolina",
    "lat": 32.78,
    "lon": -79.93,
    "states": [
      "SC",
      "GA"
    ],
    "airports": [
      "CHS",
      "SAV"
    ],
    "region": "South",
    "days": [
      "2-3",
      "4-5"
    ],
    "season": "Approximate: spring/fall for walking; summer heat and coastal storm season vary.",
    "summary": "Lowcountry cooking, historic streets, gardens and coastal community interpretation. Easy to shape as a gentle solo city stay with optional guided outings.",
    "routeNote": "Charleston and Savannah are separate bases, not one walkable area. Marsh, island and coast visits need their own transport and access checks; a weekend should focus on one city.",
    "highlightIds": [
      "LA-0048",
      "LA-0063",
      "LA-0334",
      "LA-0439",
      "LA-0522",
      "LA-0050"
    ],
    "foodIds": [
      "LA-0063",
      "LA-0218",
      "LA-0264"
    ],
    "itemIds": [
      "LA-0048",
      "LA-0050",
      "LA-0063",
      "LA-0151",
      "LA-0218",
      "LA-0264",
      "LA-0273",
      "LA-0314",
      "LA-0334",
      "LA-0350",
      "LA-0392",
      "LA-0439",
      "LA-0522"
    ],
    "earlyIds": [],
    "primaryDays": "2-3",
    "foodNote": ""
  },
  {
    "id": "appalachian-carolinas",
    "name": "Blue Ridge, Smokies & the Carolinas",
    "base": "Asheville, North Carolina",
    "lat": 35.6,
    "lon": -82.55,
    "states": [
      "NC",
      "TN",
      "SC"
    ],
    "airports": [
      "AVL",
      "TYS",
      "CLT"
    ],
    "region": "South",
    "days": [
      "2-3",
      "4-5",
      "7-14"
    ],
    "season": "Approximate: spring through fall for many routes; foliage, fireflies and weather are seasonal.",
    "summary": "Mountain towns, breweries, waterfalls, forests and optional hiking, with separate Carolina food/coast choices. Route effort can be adjusted and guided outdoor sessions can support solo travel.",
    "routeNote": "Asheville/Smokies is one focus; Piedmont barbecue towns and the Outer Banks are different extensions with major distances. Pick a sector for short trips and check park/road reopening and reservation requirements.",
    "highlightIds": [
      "LA-0038",
      "LA-0059",
      "LA-0071",
      "LA-0238",
      "LA-0061",
      "LA-0075"
    ],
    "foodIds": [
      "LA-0059",
      "LA-0061",
      "LA-0103"
    ],
    "itemIds": [
      "LA-0038",
      "LA-0059",
      "LA-0061",
      "LA-0071",
      "LA-0075",
      "LA-0087",
      "LA-0103",
      "LA-0184",
      "LA-0186",
      "LA-0238",
      "LA-0305",
      "LA-0324",
      "LA-0615",
      "LA-0648"
    ],
    "earlyIds": [],
    "primaryDays": "4-5",
    "foodNote": ""
  },
  {
    "id": "central-florida",
    "name": "Orlando, the Space Coast & northern Florida",
    "base": "Orlando, Florida",
    "lat": 28.54,
    "lon": -81.38,
    "states": [
      "FL"
    ],
    "airports": [
      "MCO",
      "TPA",
      "JAX"
    ],
    "region": "South",
    "days": [
      "2-3",
      "4-5",
      "7-14"
    ],
    "season": "Approximate: roughly fall through spring for many outdoor days; storms and summer heat vary.",
    "summary": "Theme parks, space history, manatee observation, spring waters and optional Gulf beaches or St. Augustine history. Choose activities and support around comfort and interest.",
    "routeNote": "Orlando/Space Coast, Tampa/Sarasota and northern Florida are different sectors. A weekend should choose one; park reservations, launch schedules and seasonal wildlife conditions need checking.",
    "highlightIds": [
      "LA-0042",
      "LA-0072",
      "LA-0448",
      "LA-0474",
      "LA-0043",
      "LA-0054"
    ],
    "foodIds": [],
    "itemIds": [
      "LA-0042",
      "LA-0043",
      "LA-0054",
      "LA-0072",
      "LA-0092",
      "LA-0311",
      "LA-0448",
      "LA-0474",
      "LA-0536",
      "LA-0572",
      "LA-0617",
      "LA-0681"
    ],
    "earlyIds": [
      "LA-0617"
    ],
    "primaryDays": "4-5",
    "foodNote": "The catalog’s local food ideas here are still growing. Add dishes and stops during regional research."
  },
  {
    "id": "south-florida",
    "name": "Miami, Everglades & the Florida Keys",
    "base": "Miami, Florida",
    "lat": 25.76,
    "lon": -80.19,
    "states": [
      "FL"
    ],
    "airports": [
      "MIA",
      "FLL",
      "EYW"
    ],
    "region": "South",
    "days": [
      "2-3",
      "4-5",
      "7-14"
    ],
    "season": "Approximate: winter/spring for many outdoor days; hurricane season and summer conditions vary.",
    "summary": "Coastal neighborhoods, Everglades ecology, seafood and reef or snorkel possibilities. Guided wildlife and beginner water sessions fit a solo trip.",
    "routeNote": "Miami is the city core; Everglades access points and the Keys are separate outings/bases. Reaching Key West or offshore parks needs more time; conditions and transport determine which water activities fit.",
    "highlightIds": [
      "LA-0066",
      "LA-0315",
      "LA-0332",
      "LA-0476",
      "LA-0484",
      "LA-0640"
    ],
    "foodIds": [
      "LA-0484"
    ],
    "itemIds": [
      "LA-0066",
      "LA-0088",
      "LA-0220",
      "LA-0291",
      "LA-0315",
      "LA-0332",
      "LA-0347",
      "LA-0357",
      "LA-0460",
      "LA-0476",
      "LA-0484",
      "LA-0502",
      "LA-0640",
      "LA-0676",
      "LA-0678"
    ],
    "earlyIds": [
      "LA-0640"
    ],
    "primaryDays": "4-5",
    "foodNote": ""
  },
  {
    "id": "dc-virginia",
    "name": "Washington, Chesapeake & Virginia/Appalachian choices",
    "base": "Washington, District of Columbia",
    "lat": 38.91,
    "lon": -77.04,
    "states": [
      "DC",
      "MD",
      "VA",
      "WV"
    ],
    "airports": [
      "DCA",
      "IAD",
      "BWI",
      "RIC"
    ],
    "region": "Northeast",
    "days": [
      "2-3",
      "4-5",
      "7-14"
    ],
    "season": "Approximate: spring/fall for walking; blossom timing and mountain/coast conditions vary.",
    "summary": "Public museums, civic history, gardens and food regions, with separate Shenandoah, Virginia coast and West Virginia outdoor choices. City routes work solo; rafting can use guided support.",
    "routeNote": "DC/nearby Maryland is the weekend core. Charlottesville/Shenandoah, Williamsburg/Virginia Beach and West Virginia are different bases or extensions. This is a set of alternatives, not one short itinerary.",
    "highlightIds": [
      "LA-0051",
      "LA-0118",
      "LA-0246",
      "LA-0372",
      "LA-0483",
      "LA-0524"
    ],
    "foodIds": [
      "LA-0483",
      "LA-0687"
    ],
    "itemIds": [
      "LA-0051",
      "LA-0118",
      "LA-0129",
      "LA-0141",
      "LA-0142",
      "LA-0150",
      "LA-0155",
      "LA-0246",
      "LA-0250",
      "LA-0271",
      "LA-0282",
      "LA-0342",
      "LA-0372",
      "LA-0472",
      "LA-0483",
      "LA-0489",
      "LA-0524",
      "LA-0537",
      "LA-0541",
      "LA-0554",
      "LA-0586",
      "LA-0590",
      "LA-0593",
      "LA-0665",
      "LA-0669",
      "LA-0673",
      "LA-0687",
      "LA-0695"
    ],
    "earlyIds": [
      "LA-0673"
    ],
    "primaryDays": "2-3",
    "foodNote": ""
  },
  {
    "id": "new-york-philadelphia",
    "name": "New York, Philadelphia & Hudson/Catskills choices",
    "base": "New York City, New York",
    "lat": 40.71,
    "lon": -74.01,
    "states": [
      "NY",
      "NJ",
      "PA"
    ],
    "airports": [
      "JFK",
      "LGA",
      "EWR",
      "PHL"
    ],
    "region": "Northeast",
    "days": [
      "2-3",
      "4-5",
      "7-14"
    ],
    "season": "Approximate: year-round city culture; spring/fall for walking and autumn for upstate outings.",
    "summary": "Global food neighborhoods, performance, libraries, museums, public parks and nearby historical city routes. A car-free solo stay can focus on one city.",
    "routeNote": "New York and Philadelphia are separate bases; Hudson Valley/Catskills, Adirondacks, Gettysburg and central Pennsylvania need chosen extensions; Adirondacks require a different northern base. Pittsburgh and Niagara/western New York are in the Great Lakes corridor instead.",
    "highlightIds": [
      "LA-0260",
      "LA-0055",
      "LA-0451",
      "LA-0202",
      "LA-0585",
      "LA-0005"
    ],
    "foodIds": [
      "LA-0162",
      "LA-0195",
      "LA-0197",
      "LA-0202",
      "LA-0204",
      "LA-0214",
      "LA-0260"
    ],
    "itemIds": [
      "LA-0005",
      "LA-0039",
      "LA-0047",
      "LA-0055",
      "LA-0123",
      "LA-0124",
      "LA-0125",
      "LA-0130",
      "LA-0139",
      "LA-0143",
      "LA-0145",
      "LA-0162",
      "LA-0185",
      "LA-0195",
      "LA-0197",
      "LA-0202",
      "LA-0204",
      "LA-0214",
      "LA-0222",
      "LA-0224",
      "LA-0236",
      "LA-0260",
      "LA-0274",
      "LA-0301",
      "LA-0323",
      "LA-0327",
      "LA-0340",
      "LA-0348",
      "LA-0373",
      "LA-0374",
      "LA-0380",
      "LA-0387",
      "LA-0451",
      "LA-0508",
      "LA-0515",
      "LA-0530",
      "LA-0542",
      "LA-0564",
      "LA-0569",
      "LA-0579",
      "LA-0583",
      "LA-0584",
      "LA-0585",
      "LA-0591",
      "LA-0592",
      "LA-0594",
      "LA-0619",
      "LA-0626",
      "LA-0637",
      "LA-0653",
      "LA-0696"
    ],
    "earlyIds": [],
    "primaryDays": "2-3",
    "foodNote": ""
  },
  {
    "id": "boston-new-england",
    "name": "Boston & southern/northern New England choices",
    "base": "Boston, Massachusetts",
    "lat": 42.36,
    "lon": -71.06,
    "states": [
      "MA",
      "NH",
      "VT",
      "CT",
      "RI",
      "ME"
    ],
    "airports": [
      "BOS",
      "BTV",
      "MHT",
      "BDL"
    ],
    "region": "Northeast",
    "days": [
      "2-3",
      "4-5",
      "7-14"
    ],
    "season": "Approximate: spring through fall for broader touring; foliage and winter towns vary by year.",
    "summary": "City history, seafood, libraries, Cape Cod, arts retreats and Vermont/New Hampshire seasonal towns. City outings can stay solo and gentle; mountain routes are optional.",
    "routeNote": "Boston is the weekend core. Cape Cod, the Berkshires, Vermont and New Hampshire are different sectors with seasonal traffic/weather; a longer trip should use chosen bases. Maine/Acadia is grouped separately.",
    "highlightIds": [
      "LA-0012",
      "LA-0049",
      "LA-0068",
      "LA-0099",
      "LA-0329",
      "LA-0495"
    ],
    "foodIds": [
      "LA-0099",
      "LA-0194",
      "LA-0481"
    ],
    "itemIds": [
      "LA-0012",
      "LA-0049",
      "LA-0068",
      "LA-0099",
      "LA-0137",
      "LA-0188",
      "LA-0191",
      "LA-0194",
      "LA-0295",
      "LA-0320",
      "LA-0329",
      "LA-0353",
      "LA-0360",
      "LA-0363",
      "LA-0481",
      "LA-0490",
      "LA-0495",
      "LA-0505",
      "LA-0517",
      "LA-0532",
      "LA-0540",
      "LA-0546",
      "LA-0559",
      "LA-0581",
      "LA-0613",
      "LA-0620",
      "LA-0660"
    ],
    "earlyIds": [],
    "primaryDays": "2-3",
    "foodNote": ""
  },
  {
    "id": "maine-acadia",
    "name": "Maine coast, Portland & Acadia",
    "base": "Bar Harbor, Maine",
    "lat": 44.39,
    "lon": -68.2,
    "states": [
      "ME"
    ],
    "airports": [
      "BGR",
      "PWM"
    ],
    "region": "Northeast",
    "days": [
      "4-5",
      "7-14"
    ],
    "season": "Approximate: late spring through fall; foliage, boating and park access vary seasonally.",
    "summary": "Lobster and coffee, coastal towns, lighthouse views, schooner travel and Acadia walks. Scenic drives and shorter trails can balance guided water experiences.",
    "routeNote": "Portland, Camden and Bar Harbor/Acadia are separate coast bases with substantial travel between them. Choose one for a short stay; boat schedules, park vehicle systems and weather need current checks.",
    "highlightIds": [
      "LA-0074",
      "LA-0102",
      "LA-0309",
      "LA-0456",
      "LA-0643",
      "LA-0397"
    ],
    "foodIds": [
      "LA-0102",
      "LA-0486"
    ],
    "itemIds": [
      "LA-0074",
      "LA-0102",
      "LA-0309",
      "LA-0397",
      "LA-0450",
      "LA-0456",
      "LA-0486",
      "LA-0525",
      "LA-0643"
    ],
    "earlyIds": [],
    "primaryDays": "4-5",
    "foodNote": ""
  },
  {
    "id": "alaska",
    "name": "Alaska: choose a travel corridor",
    "base": "Anchorage, Alaska",
    "lat": 61.22,
    "lon": -149.9,
    "states": [
      "AK"
    ],
    "airports": [
      "ANC",
      "FAI",
      "JNU"
    ],
    "region": "Alaska & islands",
    "days": [
      "4-5",
      "7-14"
    ],
    "season": "Approximate: summer for many road/boat routes; aurora and winter activities need different planning.",
    "summary": "Glacier and marine landscapes, wildlife observation, museums and optional flight or boat experiences. Supported excursions can make an independent solo trip workable.",
    "routeNote": "Alaska is not one compact circuit. Choose Anchorage/Kenai/Denali, Fairbanks, Southeast Alaska or another specific route; many catalog places require flights or boats. A week or two should focus on one corridor, with weather buffers.",
    "highlightIds": [
      "LA-0006",
      "LA-0134",
      "LA-0227",
      "LA-0465",
      "LA-0533",
      "LA-0228"
    ],
    "foodIds": [],
    "itemIds": [
      "LA-0006",
      "LA-0134",
      "LA-0227",
      "LA-0228",
      "LA-0230",
      "LA-0231",
      "LA-0234",
      "LA-0235",
      "LA-0251",
      "LA-0279",
      "LA-0283",
      "LA-0352",
      "LA-0359",
      "LA-0361",
      "LA-0398",
      "LA-0408",
      "LA-0415",
      "LA-0422",
      "LA-0423",
      "LA-0425",
      "LA-0426",
      "LA-0427",
      "LA-0465",
      "LA-0533",
      "LA-0663",
      "LA-0674",
      "LA-0677",
      "LA-0682"
    ],
    "earlyIds": [],
    "primaryDays": "7-14",
    "foodNote": "The catalog’s local food ideas here are still growing. Add dishes and stops during regional research."
  },
  {
    "id": "hawaii",
    "name": "Hawaiʻi: choose an island",
    "base": "Honolulu, Oʻahu, Hawaiʻi",
    "lat": 21.31,
    "lon": -157.86,
    "states": [
      "HI"
    ],
    "airports": [
      "HNL",
      "OGG",
      "KOA",
      "LIH"
    ],
    "region": "Alaska & islands",
    "days": [
      "4-5",
      "7-14"
    ],
    "season": "Approximate: year-round with different rainfall, swell and wildlife seasons by island.",
    "summary": "Island food, cultural interpretation, volcanic scenery, beaches and optional beginner water skills. A solo stay can use practitioner-led or guided experiences.",
    "routeNote": "Oʻahu, Maui, Kauaʻi, Hawaiʻi Island and Lānaʻi are different island choices. Most island changes require flights; a short stay should choose one. Respect current community access, ocean conditions and site-specific visitor rules.",
    "highlightIds": [
      "LA-0070",
      "LA-0166",
      "LA-0248",
      "LA-0277",
      "LA-0331",
      "LA-0338"
    ],
    "foodIds": [
      "LA-0166",
      "LA-0482",
      "LA-1621"
    ],
    "itemIds": [
      "LA-0070",
      "LA-0073",
      "LA-0078",
      "LA-0079",
      "LA-0086",
      "LA-0112",
      "LA-0158",
      "LA-0160",
      "LA-0166",
      "LA-0248",
      "LA-0277",
      "LA-0289",
      "LA-0290",
      "LA-0292",
      "LA-0293",
      "LA-0317",
      "LA-0331",
      "LA-0338",
      "LA-0346",
      "LA-0364",
      "LA-0402",
      "LA-0461",
      "LA-0475",
      "LA-0477",
      "LA-0479",
      "LA-0482",
      "LA-0501",
      "LA-0519",
      "LA-0549",
      "LA-0556",
      "LA-0570",
      "LA-0571",
      "LA-0578",
      "LA-0587",
      "LA-0627",
      "LA-0630",
      "LA-0632",
      "LA-0658",
      "LA-1621"
    ],
    "earlyIds": [
      "LA-0079",
      "LA-0248",
      "LA-0578"
    ],
    "primaryDays": "4-5",
    "foodNote": ""
  },
  {
    "id": "puerto-rico",
    "name": "Puerto Rico: San Juan, coast & mountains",
    "base": "San Juan, Puerto Rico",
    "lat": 18.47,
    "lon": -66.11,
    "states": [
      "PR"
    ],
    "airports": [
      "SJU",
      "BQN"
    ],
    "region": "Alaska & islands",
    "days": [
      "4-5",
      "7-14"
    ],
    "season": "Approximate: roughly winter/spring for many outings; rainfall and Atlantic storm season vary.",
    "summary": "Old-city history, mountain coffee, forest scenery and regulated bioluminescent water experiences. Guided outings can be part of a solo stay.",
    "routeNote": "San Juan is one base; the west coast, central mountains and Vieques require different transport or lodging choices. Ferry/flight schedules, weather and night-water conditions determine what fits.",
    "highlightIds": [
      "LA-0093",
      "LA-0113",
      "LA-0603",
      "LA-0094",
      "LA-0095",
      "LA-0396"
    ],
    "foodIds": [
      "LA-0603"
    ],
    "itemIds": [
      "LA-0093",
      "LA-0094",
      "LA-0095",
      "LA-0113",
      "LA-0396",
      "LA-0596",
      "LA-0600",
      "LA-0603",
      "LA-0743"
    ],
    "earlyIds": [],
    "primaryDays": "4-5",
    "foodNote": ""
  },
  {
    "id": "us-virgin-islands",
    "name": "U.S. Virgin Islands: choose an island route",
    "base": "Charlotte Amalie, St. Thomas",
    "lat": 18.34,
    "lon": -64.93,
    "states": [
      "VI"
    ],
    "airports": [
      "STT",
      "STX"
    ],
    "region": "Alaska & islands",
    "days": [
      "4-5",
      "7-14"
    ],
    "season": "Approximate: roughly winter/spring for many outings; rainfall and Atlantic storm season vary.",
    "summary": "Coastal history, reef observation and national-park landscapes, with optional guided water skills. Independent travel can use local guided support.",
    "routeNote": "St. Thomas/St. John and St. Croix are different island routes. Ferries and flights require their own time and access checks; reef and marine excursions depend on conditions.",
    "highlightIds": [
      "LA-0288",
      "LA-0604",
      "LA-0597",
      "LA-0605"
    ],
    "foodIds": [],
    "itemIds": [
      "LA-0288",
      "LA-0597",
      "LA-0604",
      "LA-0605"
    ],
    "earlyIds": [],
    "primaryDays": "4-5",
    "foodNote": "The catalog’s local food ideas here are still growing. Add dishes and stops during regional research."
  },
  {
    "id": "guam-saipan",
    "name": "Guam or Saipan: Pacific island history",
    "base": "Tamuning, Guam",
    "lat": 13.49,
    "lon": 144.78,
    "states": [
      "GU",
      "MP"
    ],
    "airports": [
      "GUM",
      "SPN"
    ],
    "region": "Alaska & islands",
    "days": [
      "4-5",
      "7-14"
    ],
    "season": "Approximate: often a drier-season preference; tropical weather and visitor access need current checks.",
    "summary": "Chamorro cultural interpretation, island villages, WWII history and coastal landscapes. Choose public/local guidance appropriate to the site.",
    "routeNote": "Guam and Saipan are separate island bases connected by air, not a road trip. Long-haul transit is additional to local experience days; flight schedules and weather determine whether a second island is sensible.",
    "highlightIds": [
      "LA-0598",
      "LA-0599",
      "LA-0601"
    ],
    "foodIds": [],
    "itemIds": [
      "LA-0598",
      "LA-0599",
      "LA-0601"
    ],
    "earlyIds": [],
    "primaryDays": "4-5",
    "foodNote": "The catalog’s local food ideas here are still growing. Add dishes and stops during regional research."
  },
  {
    "id": "american-samoa",
    "name": "American Samoa: Tutuila & optional outer islands",
    "base": "Pago Pago, American Samoa",
    "lat": -14.28,
    "lon": -170.7,
    "states": [
      "AS"
    ],
    "airports": [
      "PPG"
    ],
    "region": "Alaska & islands",
    "days": [
      "7-14"
    ],
    "season": "Approximate: often the relatively drier months are preferred; local rain and access vary.",
    "summary": "Rainforest/coastal national-park landscapes and community-led cultural interpretation. Local support and respectful visitor arrangements matter for solo travel.",
    "routeNote": "Tutuila and Ofu/Taʻū are separate island logistics. Limited transport, local permissions and weather can require extra time; the national-park listing does not promise all islands fit one itinerary.",
    "highlightIds": [
      "LA-0602"
    ],
    "foodIds": [],
    "itemIds": [
      "LA-0602"
    ],
    "earlyIds": [],
    "primaryDays": "7-14",
    "foodNote": "The catalog’s local food ideas here are still growing. Add dishes and stops during regional research."
  }
];

window.LIFE_TRIP_ITEM_LOCATIONS = {
  "LA-0001": {
    "regionId": "san-diego",
    "lat": 32.72,
    "lon": -117.16,
    "precision": "city area",
    "locationLabel": "San Diego, CA"
  },
  "LA-0003": {
    "regionId": "oregon",
    "lat": 44.06,
    "lon": -121.32,
    "precision": "city area",
    "locationLabel": "Bend, OR"
  },
  "LA-0004": {
    "regionId": "sierra",
    "lat": 37.36,
    "lon": -118.4,
    "precision": "city area",
    "locationLabel": "Bishop, CA"
  },
  "LA-0005": {
    "regionId": "new-york-philadelphia",
    "lat": 40.71,
    "lon": -74.01,
    "precision": "city area",
    "locationLabel": "New York City, NY"
  },
  "LA-0006": {
    "regionId": "alaska",
    "lat": 62.32,
    "lon": -150.11,
    "precision": "city area",
    "locationLabel": "Talkeetna, AK"
  },
  "LA-0007": {
    "regionId": "new-mexico",
    "lat": 35.08,
    "lon": -106.65,
    "precision": "city area",
    "locationLabel": "Albuquerque, NM"
  },
  "LA-0008": {
    "regionId": "northern-arizona",
    "lat": 35.2,
    "lon": -111.65,
    "precision": "base area",
    "locationLabel": "Regional base: Flagstaff, Arizona; catalog example: Grand Canyon, AZ"
  },
  "LA-0009": {
    "regionId": "central-coast",
    "lat": 34.42,
    "lon": -119.7,
    "precision": "city area",
    "locationLabel": "Santa Barbara, CA"
  },
  "LA-0010": {
    "regionId": "great-lakes",
    "lat": 39.76,
    "lon": -84.19,
    "precision": "city area",
    "locationLabel": "Dayton, OH"
  },
  "LA-0011": {
    "regionId": "omaha-plains",
    "lat": 41.59,
    "lon": -93.62,
    "precision": "city area",
    "locationLabel": "Des Moines, IA"
  },
  "LA-0012": {
    "regionId": "boston-new-england",
    "lat": 42.36,
    "lon": -71.06,
    "precision": "base area",
    "locationLabel": "Regional base: Boston, Massachusetts; catalog example: New England towns, MA"
  },
  "LA-0014": {
    "regionId": "great-lakes",
    "lat": 42.28,
    "lon": -83.74,
    "precision": "city area",
    "locationLabel": "Ann Arbor, MI"
  },
  "LA-0015": {
    "regionId": "bay-area",
    "lat": 38.54,
    "lon": -121.74,
    "precision": "city area",
    "locationLabel": "Davis, CA"
  },
  "LA-0033": {
    "regionId": "new-mexico",
    "lat": 35.69,
    "lon": -105.94,
    "precision": "city area",
    "locationLabel": "Santa Fe"
  },
  "LA-0036": {
    "regionId": "great-lakes",
    "lat": 41.45,
    "lon": -82.71,
    "precision": "city area",
    "locationLabel": "Sandusky, OH"
  },
  "LA-0037": {
    "regionId": "los-angeles",
    "lat": 33.84,
    "lon": -117.91,
    "precision": "city area",
    "locationLabel": "Anaheim, CA"
  },
  "LA-0038": {
    "regionId": "appalachian-carolinas",
    "lat": 35.79,
    "lon": -83.55,
    "precision": "city area",
    "locationLabel": "Pigeon Forge, TN"
  },
  "LA-0039": {
    "regionId": "new-york-philadelphia",
    "lat": 40.29,
    "lon": -76.65,
    "precision": "city area",
    "locationLabel": "Hershey, PA"
  },
  "LA-0040": {
    "regionId": "los-angeles",
    "lat": 33.87,
    "lon": -118.0,
    "precision": "city area",
    "locationLabel": "Buena Park, CA"
  },
  "LA-0041": {
    "regionId": "los-angeles",
    "lat": 34.05,
    "lon": -118.24,
    "precision": "base area",
    "locationLabel": "Regional base: Los Angeles, California; catalog example: Valencia, CA"
  },
  "LA-0042": {
    "regionId": "central-florida",
    "lat": 28.54,
    "lon": -81.38,
    "precision": "city area",
    "locationLabel": "Orlando, FL"
  },
  "LA-0043": {
    "regionId": "central-florida",
    "lat": 28.54,
    "lon": -81.38,
    "precision": "base area",
    "locationLabel": "Regional base: Orlando, Florida; catalog example: Bay Lake, FL"
  },
  "LA-0044": {
    "regionId": "sierra",
    "lat": 38.94,
    "lon": -119.98,
    "precision": "base area",
    "locationLabel": "Regional base: South Lake Tahoe, California; catalog example: CA"
  },
  "LA-0045": {
    "regionId": "chicago",
    "lat": 41.88,
    "lon": -87.63,
    "precision": "city area",
    "locationLabel": "Chicago area; catalog example: IL"
  },
  "LA-0046": {
    "regionId": "bay-area",
    "lat": 37.77,
    "lon": -122.42,
    "precision": "city area",
    "locationLabel": "San Francisco area; catalog example: CA"
  },
  "LA-0047": {
    "regionId": "new-york-philadelphia",
    "lat": 39.95,
    "lon": -75.17,
    "precision": "city area",
    "locationLabel": "Philadelphia, PA"
  },
  "LA-0048": {
    "regionId": "lowcountry",
    "lat": 32.08,
    "lon": -81.1,
    "precision": "city area",
    "locationLabel": "Savannah, GA"
  },
  "LA-0049": {
    "regionId": "boston-new-england",
    "lat": 42.36,
    "lon": -71.06,
    "precision": "city area",
    "locationLabel": "Boston, MA"
  },
  "LA-0050": {
    "regionId": "lowcountry",
    "lat": 32.78,
    "lon": -79.93,
    "precision": "city area",
    "locationLabel": "Charleston, SC"
  },
  "LA-0051": {
    "regionId": "dc-virginia",
    "lat": 37.27,
    "lon": -76.71,
    "precision": "city area",
    "locationLabel": "Williamsburg, VA"
  },
  "LA-0052": {
    "regionId": "new-orleans",
    "lat": 29.95,
    "lon": -90.07,
    "precision": "city area",
    "locationLabel": "New Orleans, LA"
  },
  "LA-0053": {
    "regionId": "new-mexico",
    "lat": 35.69,
    "lon": -105.94,
    "precision": "city area",
    "locationLabel": "Santa Fe, NM"
  },
  "LA-0054": {
    "regionId": "central-florida",
    "lat": 29.9,
    "lon": -81.31,
    "precision": "city area",
    "locationLabel": "St. Augustine, FL"
  },
  "LA-0055": {
    "regionId": "new-york-philadelphia",
    "lat": 40.71,
    "lon": -74.01,
    "precision": "base area",
    "locationLabel": "Regional base: New York City, New York; catalog example: NY"
  },
  "LA-0056": {
    "regionId": "los-angeles",
    "lat": 34.05,
    "lon": -118.24,
    "precision": "base area",
    "locationLabel": "Regional base: Los Angeles, California; catalog example: CA"
  },
  "LA-0057": {
    "regionId": "new-mexico",
    "lat": 35.69,
    "lon": -105.94,
    "precision": "city area",
    "locationLabel": "Santa Fe area; catalog example: NM"
  },
  "LA-0058": {
    "regionId": "atlanta-alabama",
    "lat": 33.75,
    "lon": -84.39,
    "precision": "base area",
    "locationLabel": "Regional base: Atlanta, Georgia; catalog example: Decatur, AL"
  },
  "LA-0059": {
    "regionId": "appalachian-carolinas",
    "lat": 35.6,
    "lon": -82.55,
    "precision": "base area",
    "locationLabel": "Regional base: Asheville, North Carolina; catalog example: Ayden, NC"
  },
  "LA-0060": {
    "regionId": "kansas-city",
    "lat": 39.1,
    "lon": -94.58,
    "precision": "city area",
    "locationLabel": "Kansas City, MO"
  },
  "LA-0061": {
    "regionId": "appalachian-carolinas",
    "lat": 35.6,
    "lon": -82.55,
    "precision": "base area",
    "locationLabel": "Regional base: Asheville, North Carolina; catalog example: Lexington, NC"
  },
  "LA-0062": {
    "regionId": "tennessee-kentucky",
    "lat": 35.15,
    "lon": -90.05,
    "precision": "city area",
    "locationLabel": "Memphis, TN"
  },
  "LA-0063": {
    "regionId": "lowcountry",
    "lat": 32.78,
    "lon": -79.93,
    "precision": "base area",
    "locationLabel": "Regional base: Charleston, South Carolina; catalog example: Columbia, SC"
  },
  "LA-0064": {
    "regionId": "st-louis-ozarks",
    "lat": 38.63,
    "lon": -90.2,
    "precision": "city area",
    "locationLabel": "St. Louis, MO"
  },
  "LA-0065": {
    "regionId": "texas-cities",
    "lat": 30.27,
    "lon": -97.74,
    "precision": "city area",
    "locationLabel": "Austin, TX"
  },
  "LA-0066": {
    "regionId": "south-florida",
    "lat": 25.79,
    "lon": -80.13,
    "precision": "city area",
    "locationLabel": "Miami Beach, FL"
  },
  "LA-0067": {
    "regionId": "oregon",
    "lat": 45.89,
    "lon": -123.96,
    "precision": "city area",
    "locationLabel": "Cannon Beach, OR"
  },
  "LA-0068": {
    "regionId": "boston-new-england",
    "lat": 42.36,
    "lon": -71.06,
    "precision": "base area",
    "locationLabel": "Regional base: Boston, Massachusetts; catalog example: Eastham, MA"
  },
  "LA-0069": {
    "regionId": "san-diego",
    "lat": 32.68,
    "lon": -117.18,
    "precision": "city area",
    "locationLabel": "Coronado, CA"
  },
  "LA-0070": {
    "regionId": "hawaii",
    "lat": 21.4,
    "lon": -157.74,
    "precision": "city area",
    "locationLabel": "Kailua, HI"
  },
  "LA-0071": {
    "regionId": "appalachian-carolinas",
    "lat": 35.96,
    "lon": -75.62,
    "precision": "city area",
    "locationLabel": "Nags Head, NC"
  },
  "LA-0072": {
    "regionId": "central-florida",
    "lat": 27.34,
    "lon": -82.53,
    "precision": "city area",
    "locationLabel": "Sarasota, FL"
  },
  "LA-0073": {
    "regionId": "hawaii",
    "lat": 21.31,
    "lon": -157.86,
    "precision": "city area",
    "locationLabel": "Honolulu, HI"
  },
  "LA-0074": {
    "regionId": "maine-acadia",
    "lat": 44.34,
    "lon": -68.27,
    "precision": "place area",
    "locationLabel": "Acadia / Mount Desert Island area"
  },
  "LA-0075": {
    "regionId": "appalachian-carolinas",
    "lat": 35.71,
    "lon": -83.51,
    "precision": "city area",
    "locationLabel": "Gatlinburg, TN"
  },
  "LA-0076": {
    "regionId": "zion-bryce",
    "lat": 37.63,
    "lon": -112.17,
    "precision": "place area",
    "locationLabel": "Bryce Canyon area"
  },
  "LA-0077": {
    "regionId": "las-vegas-desert",
    "lat": 36.46,
    "lon": -116.87,
    "precision": "city area",
    "locationLabel": "Furnace Creek, CA"
  },
  "LA-0078": {
    "regionId": "hawaii",
    "lat": 20.71,
    "lon": -156.17,
    "precision": "place area",
    "locationLabel": "Haleakalā summit area"
  },
  "LA-0079": {
    "regionId": "hawaii",
    "lat": 21.4,
    "lon": -157.74,
    "precision": "city area",
    "locationLabel": "Kailua, HI"
  },
  "LA-0080": {
    "regionId": "moab",
    "lat": 38.45,
    "lon": -109.82,
    "precision": "place area",
    "locationLabel": "Canyonlands / Moab area"
  },
  "LA-0081": {
    "regionId": "washington",
    "lat": 46.85,
    "lon": -121.76,
    "precision": "place area",
    "locationLabel": "Mount Rainier area"
  },
  "LA-0082": {
    "regionId": "northern-arizona",
    "lat": 36.05,
    "lon": -112.14,
    "precision": "city area",
    "locationLabel": "Grand Canyon Village, AZ"
  },
  "LA-0083": {
    "regionId": "sierra",
    "lat": 37.75,
    "lon": -119.59,
    "precision": "place area",
    "locationLabel": "Yosemite Valley area"
  },
  "LA-0084": {
    "regionId": "central-coast",
    "lat": 36.27,
    "lon": -121.81,
    "precision": "city area",
    "locationLabel": "Big Sur, CA"
  },
  "LA-0085": {
    "regionId": "northern-arizona",
    "lat": 34.87,
    "lon": -111.76,
    "precision": "city area",
    "locationLabel": "Sedona, AZ"
  },
  "LA-0086": {
    "regionId": "hawaii",
    "lat": 20.71,
    "lon": -156.17,
    "precision": "place area",
    "locationLabel": "Haleakalā summit area"
  },
  "LA-0087": {
    "regionId": "appalachian-carolinas",
    "lat": 35.96,
    "lon": -75.62,
    "precision": "city area",
    "locationLabel": "Nags Head, NC"
  },
  "LA-0088": {
    "regionId": "south-florida",
    "lat": 24.56,
    "lon": -81.78,
    "precision": "city area",
    "locationLabel": "Key West, FL"
  },
  "LA-0089": {
    "regionId": "los-angeles",
    "lat": 34.02,
    "lon": -118.49,
    "precision": "city area",
    "locationLabel": "Santa Monica, CA"
  },
  "LA-0090": {
    "regionId": "washington",
    "lat": 48.53,
    "lon": -123.02,
    "precision": "city area",
    "locationLabel": "Friday Harbor, WA"
  },
  "LA-0091": {
    "regionId": "san-diego",
    "lat": 32.72,
    "lon": -117.16,
    "precision": "city area",
    "locationLabel": "San Diego, CA"
  },
  "LA-0092": {
    "regionId": "central-florida",
    "lat": 28.61,
    "lon": -80.81,
    "precision": "city area",
    "locationLabel": "Titusville, FL"
  },
  "LA-0093": {
    "regionId": "puerto-rico",
    "lat": 18.05,
    "lon": -67.06,
    "precision": "city area",
    "locationLabel": "Lajas, Puerto Rico"
  },
  "LA-0094": {
    "regionId": "puerto-rico",
    "lat": 18.33,
    "lon": -65.65,
    "precision": "city area",
    "locationLabel": "Fajardo, Puerto Rico"
  },
  "LA-0095": {
    "regionId": "puerto-rico",
    "lat": 18.12,
    "lon": -65.44,
    "precision": "place area",
    "locationLabel": "Vieques island area"
  },
  "LA-0096": {
    "regionId": "bay-area",
    "lat": 38.07,
    "lon": -122.81,
    "precision": "city area",
    "locationLabel": "Point Reyes Station, CA"
  },
  "LA-0097": {
    "regionId": "san-diego",
    "lat": 32.72,
    "lon": -117.16,
    "precision": "city area",
    "locationLabel": "San Diego, CA"
  },
  "LA-0098": {
    "regionId": "texas-cities",
    "lat": 30.27,
    "lon": -97.74,
    "precision": "city area",
    "locationLabel": "Austin, TX"
  },
  "LA-0099": {
    "regionId": "boston-new-england",
    "lat": 44.48,
    "lon": -73.21,
    "precision": "city area",
    "locationLabel": "Burlington, VT"
  },
  "LA-0100": {
    "regionId": "great-lakes",
    "lat": 42.96,
    "lon": -85.67,
    "precision": "city area",
    "locationLabel": "Grand Rapids, MI"
  },
  "LA-0101": {
    "regionId": "oregon",
    "lat": 45.52,
    "lon": -122.68,
    "precision": "city area",
    "locationLabel": "Portland, OR"
  },
  "LA-0102": {
    "regionId": "maine-acadia",
    "lat": 43.66,
    "lon": -70.26,
    "precision": "city area",
    "locationLabel": "Portland, ME"
  },
  "LA-0103": {
    "regionId": "appalachian-carolinas",
    "lat": 35.6,
    "lon": -82.55,
    "precision": "city area",
    "locationLabel": "Asheville, NC"
  },
  "LA-0104": {
    "regionId": "colorado",
    "lat": 39.74,
    "lon": -104.99,
    "precision": "city area",
    "locationLabel": "Denver, CO"
  },
  "LA-0105": {
    "regionId": "northern-arizona",
    "lat": 36.05,
    "lon": -112.14,
    "precision": "city area",
    "locationLabel": "Grand Canyon Village, AZ"
  },
  "LA-0106": {
    "regionId": "zion-bryce",
    "lat": 37.63,
    "lon": -112.17,
    "precision": "place area",
    "locationLabel": "Bryce Canyon area"
  },
  "LA-0107": {
    "regionId": "zion-bryce",
    "lat": 37.3,
    "lon": -113.03,
    "precision": "place area",
    "locationLabel": "Zion Canyon area"
  },
  "LA-0108": {
    "regionId": "northern-arizona",
    "lat": 36.91,
    "lon": -111.46,
    "precision": "city area",
    "locationLabel": "Page, AZ"
  },
  "LA-0109": {
    "regionId": "colorado",
    "lat": 38.48,
    "lon": -107.88,
    "precision": "city area",
    "locationLabel": "Montrose, CO"
  },
  "LA-0110": {
    "regionId": "northern-arizona",
    "lat": 36.91,
    "lon": -111.46,
    "precision": "city area",
    "locationLabel": "Page, AZ"
  },
  "LA-0111": {
    "regionId": "sierra",
    "lat": 38.94,
    "lon": -119.98,
    "precision": "base area",
    "locationLabel": "Regional base: South Lake Tahoe, California; catalog example: Kings Canyon National Park, CA"
  },
  "LA-0112": {
    "regionId": "hawaii",
    "lat": 22.05,
    "lon": -159.67,
    "precision": "place area",
    "locationLabel": "Waimea Canyon / Kauaʻi area"
  },
  "LA-0113": {
    "regionId": "puerto-rico",
    "lat": 18.47,
    "lon": -66.11,
    "precision": "city area",
    "locationLabel": "San Juan area; catalog example: PR"
  },
  "LA-0114": {
    "regionId": "west-texas",
    "lat": 32.42,
    "lon": -104.23,
    "precision": "city area",
    "locationLabel": "Carlsbad, NM"
  },
  "LA-0115": {
    "regionId": "black-hills",
    "lat": 43.77,
    "lon": -103.6,
    "precision": "city area",
    "locationLabel": "Custer, SD"
  },
  "LA-0116": {
    "regionId": "southern-arizona",
    "lat": 32.22,
    "lon": -110.97,
    "precision": "base area",
    "locationLabel": "Regional base: Tucson, Arizona; catalog example: Benson, AZ"
  },
  "LA-0117": {
    "regionId": "salt-lake-idaho",
    "lat": 39.01,
    "lon": -114.12,
    "precision": "city area",
    "locationLabel": "Baker, NV"
  },
  "LA-0118": {
    "regionId": "dc-virginia",
    "lat": 38.91,
    "lon": -77.04,
    "precision": "base area",
    "locationLabel": "Regional base: Washington, District of Columbia; catalog example: Luray, VA"
  },
  "LA-0119": {
    "regionId": "tennessee-kentucky",
    "lat": 37.19,
    "lon": -86.1,
    "precision": "place area",
    "locationLabel": "Mammoth Cave park area"
  },
  "LA-0120": {
    "regionId": "sierra",
    "lat": 38.94,
    "lon": -119.98,
    "precision": "base area",
    "locationLabel": "Regional base: South Lake Tahoe, California; catalog example: Vallecito, CA"
  },
  "LA-0121": {
    "regionId": "black-hills",
    "lat": 44.08,
    "lon": -103.23,
    "precision": "base area",
    "locationLabel": "Regional base: Rapid City, South Dakota; catalog example: Hot Springs, SD"
  },
  "LA-0122": {
    "regionId": "bay-area",
    "lat": 37.77,
    "lon": -122.42,
    "precision": "city area",
    "locationLabel": "San Francisco, CA"
  },
  "LA-0123": {
    "regionId": "new-york-philadelphia",
    "lat": 40.74,
    "lon": -74.17,
    "precision": "city area",
    "locationLabel": "Newark, NJ"
  },
  "LA-0124": {
    "regionId": "new-york-philadelphia",
    "lat": 40.68,
    "lon": -73.94,
    "precision": "city area",
    "locationLabel": "Brooklyn, NY"
  },
  "LA-0125": {
    "regionId": "new-york-philadelphia",
    "lat": 39.95,
    "lon": -75.17,
    "precision": "city area",
    "locationLabel": "Philadelphia, PA"
  },
  "LA-0126": {
    "regionId": "atlanta-alabama",
    "lat": 33.75,
    "lon": -84.39,
    "precision": "base area",
    "locationLabel": "Regional base: Atlanta, Georgia; catalog example: Macon, GA"
  },
  "LA-0127": {
    "regionId": "st-louis-ozarks",
    "lat": 38.63,
    "lon": -90.2,
    "precision": "city area",
    "locationLabel": "St. Louis, MO"
  },
  "LA-0128": {
    "regionId": "oregon",
    "lat": 45.52,
    "lon": -122.68,
    "precision": "city area",
    "locationLabel": "Portland, OR"
  },
  "LA-0129": {
    "regionId": "dc-virginia",
    "lat": 38.91,
    "lon": -77.04,
    "precision": "city area",
    "locationLabel": "Washington, DC"
  },
  "LA-0130": {
    "regionId": "new-york-philadelphia",
    "lat": 40.71,
    "lon": -74.01,
    "precision": "base area",
    "locationLabel": "Regional base: New York City, New York; catalog example: Bethlehem, PA"
  },
  "LA-0131": {
    "regionId": "colorado",
    "lat": 39.48,
    "lon": -106.04,
    "precision": "city area",
    "locationLabel": "Breckenridge, CO"
  },
  "LA-0132": {
    "regionId": "great-lakes",
    "lat": 42.33,
    "lon": -83.05,
    "precision": "base area",
    "locationLabel": "Regional base: Detroit, Michigan; catalog example: Frankenmuth, MI"
  },
  "LA-0133": {
    "regionId": "washington",
    "lat": 47.6,
    "lon": -120.66,
    "precision": "city area",
    "locationLabel": "Leavenworth, WA"
  },
  "LA-0134": {
    "regionId": "alaska",
    "lat": 64.75,
    "lon": -147.35,
    "precision": "city area",
    "locationLabel": "North Pole, AK"
  },
  "LA-0135": {
    "regionId": "tennessee-kentucky",
    "lat": 36.16,
    "lon": -86.78,
    "precision": "base area",
    "locationLabel": "Regional base: Nashville, Tennessee; catalog example: Santa Claus, IN"
  },
  "LA-0136": {
    "regionId": "central-coast",
    "lat": 34.6,
    "lon": -120.14,
    "precision": "city area",
    "locationLabel": "Solvang, CA"
  },
  "LA-0137": {
    "regionId": "boston-new-england",
    "lat": 44.47,
    "lon": -72.69,
    "precision": "city area",
    "locationLabel": "Stowe, VT"
  },
  "LA-0138": {
    "regionId": "new-orleans",
    "lat": 29.95,
    "lon": -90.07,
    "precision": "city area",
    "locationLabel": "New Orleans, United States"
  },
  "LA-0139": {
    "regionId": "new-york-philadelphia",
    "lat": 40.71,
    "lon": -74.01,
    "precision": "city area",
    "locationLabel": "New York, United States"
  },
  "LA-0140": {
    "regionId": "san-diego",
    "lat": 32.72,
    "lon": -117.16,
    "precision": "city area",
    "locationLabel": "San Diego / Encinitas, United States"
  },
  "LA-0141": {
    "regionId": "dc-virginia",
    "lat": 38.91,
    "lon": -77.04,
    "precision": "city area",
    "locationLabel": "Washington, DC"
  },
  "LA-0142": {
    "regionId": "dc-virginia",
    "lat": 38.91,
    "lon": -77.04,
    "precision": "city area",
    "locationLabel": "Washington, DC"
  },
  "LA-0143": {
    "regionId": "new-york-philadelphia",
    "lat": 40.71,
    "lon": -74.01,
    "precision": "city area",
    "locationLabel": "New York City, NY"
  },
  "LA-0145": {
    "regionId": "new-york-philadelphia",
    "lat": 39.95,
    "lon": -75.17,
    "precision": "city area",
    "locationLabel": "Philadelphia, PA"
  },
  "LA-0146": {
    "regionId": "atlanta-alabama",
    "lat": 33.52,
    "lon": -86.8,
    "precision": "city area",
    "locationLabel": "Birmingham, AL"
  },
  "LA-0147": {
    "regionId": "kansas-city",
    "lat": 39.05,
    "lon": -95.68,
    "precision": "city area",
    "locationLabel": "Topeka, KS"
  },
  "LA-0148": {
    "regionId": "atlanta-alabama",
    "lat": 33.75,
    "lon": -84.39,
    "precision": "city area",
    "locationLabel": "Atlanta, GA"
  },
  "LA-0149": {
    "regionId": "tennessee-kentucky",
    "lat": 35.15,
    "lon": -90.05,
    "precision": "city area",
    "locationLabel": "Memphis, TN"
  },
  "LA-0150": {
    "regionId": "dc-virginia",
    "lat": 38.91,
    "lon": -77.04,
    "precision": "city area",
    "locationLabel": "Washington, DC"
  },
  "LA-0151": {
    "regionId": "lowcountry",
    "lat": 32.78,
    "lon": -79.93,
    "precision": "city area",
    "locationLabel": "Charleston, SC"
  },
  "LA-0152": {
    "regionId": "atlanta-alabama",
    "lat": 33.75,
    "lon": -84.39,
    "precision": "base area",
    "locationLabel": "Regional base: Atlanta, Georgia; catalog example: Tuskegee, AL"
  },
  "LA-0153": {
    "regionId": "atlanta-alabama",
    "lat": 32.37,
    "lon": -86.3,
    "precision": "city area",
    "locationLabel": "Selma to Montgomery, AL"
  },
  "LA-0154": {
    "regionId": "new-orleans",
    "lat": 29.95,
    "lon": -90.07,
    "precision": "base area",
    "locationLabel": "Regional base: New Orleans, Louisiana; catalog example: Wallace, LA"
  },
  "LA-0155": {
    "regionId": "dc-virginia",
    "lat": 38.91,
    "lon": -77.04,
    "precision": "base area",
    "locationLabel": "Regional base: Washington, District of Columbia; catalog example: Church Creek, MD"
  },
  "LA-0156": {
    "regionId": "tennessee-kentucky",
    "lat": 36.16,
    "lon": -86.78,
    "precision": "base area",
    "locationLabel": "Regional base: Nashville, Tennessee; catalog example: TN"
  },
  "LA-0157": {
    "regionId": "atlanta-alabama",
    "lat": 32.37,
    "lon": -86.3,
    "precision": "city area",
    "locationLabel": "Montgomery area; catalog example: AL"
  },
  "LA-0158": {
    "regionId": "hawaii",
    "lat": 22.17,
    "lon": -159.64,
    "precision": "place area",
    "locationLabel": "Nā Pali coast area"
  },
  "LA-0159": {
    "regionId": "central-coast",
    "lat": 36.27,
    "lon": -121.81,
    "precision": "city area",
    "locationLabel": "Big Sur, United States"
  },
  "LA-0160": {
    "regionId": "hawaii",
    "lat": 19.43,
    "lon": -155.24,
    "precision": "city area",
    "locationLabel": "Volcano / Hawaiʻi Island area"
  },
  "LA-0161": {
    "regionId": "northern-california",
    "lat": 41.76,
    "lon": -124.2,
    "precision": "city area",
    "locationLabel": "Crescent City, United States"
  },
  "LA-0162": {
    "regionId": "new-york-philadelphia",
    "lat": 40.71,
    "lon": -74.01,
    "precision": "city area",
    "locationLabel": "New York, NY"
  },
  "LA-0163": {
    "regionId": "bay-area",
    "lat": 37.77,
    "lon": -122.42,
    "precision": "city area",
    "locationLabel": "San Francisco, CA"
  },
  "LA-0164": {
    "regionId": "chicago",
    "lat": 41.88,
    "lon": -87.63,
    "precision": "city area",
    "locationLabel": "Chicago, IL"
  },
  "LA-0165": {
    "regionId": "washington",
    "lat": 47.61,
    "lon": -122.33,
    "precision": "city area",
    "locationLabel": "Seattle, WA"
  },
  "LA-0166": {
    "regionId": "hawaii",
    "lat": 19.64,
    "lon": -155.99,
    "precision": "city area",
    "locationLabel": "Kailua-Kona, HI"
  },
  "LA-0167": {
    "regionId": "los-angeles",
    "lat": 34.05,
    "lon": -118.24,
    "precision": "city area",
    "locationLabel": "Los Angeles, CA"
  },
  "LA-0168": {
    "regionId": "oregon",
    "lat": 45.52,
    "lon": -122.68,
    "precision": "city area",
    "locationLabel": "Portland, OR"
  },
  "LA-0169": {
    "regionId": "bay-area",
    "lat": 36.97,
    "lon": -122.03,
    "precision": "city area",
    "locationLabel": "Santa Cruz, CA"
  },
  "LA-0170": {
    "regionId": "new-orleans",
    "lat": 29.95,
    "lon": -90.07,
    "precision": "city area",
    "locationLabel": "New Orleans area; catalog example: LA"
  },
  "LA-0171": {
    "regionId": "moab",
    "lat": 38.73,
    "lon": -109.59,
    "precision": "place area",
    "locationLabel": "Arches National Park area"
  },
  "LA-0172": {
    "regionId": "las-vegas-desert",
    "lat": 36.46,
    "lon": -116.87,
    "precision": "city area",
    "locationLabel": "Furnace Creek, CA"
  },
  "LA-0173": {
    "regionId": "northern-arizona",
    "lat": 35.2,
    "lon": -111.65,
    "precision": "base area",
    "locationLabel": "Regional base: Flagstaff, Arizona; catalog example: Kayenta, AZ"
  },
  "LA-0174": {
    "regionId": "west-texas",
    "lat": 29.25,
    "lon": -103.25,
    "precision": "place area",
    "locationLabel": "Big Bend park area"
  },
  "LA-0175": {
    "regionId": "los-angeles",
    "lat": 34.05,
    "lon": -118.24,
    "precision": "base area",
    "locationLabel": "Regional base: Los Angeles, California; catalog example: Twentynine Palms, CA"
  },
  "LA-0176": {
    "regionId": "southern-arizona",
    "lat": 32.22,
    "lon": -110.97,
    "precision": "city area",
    "locationLabel": "Tucson, AZ"
  },
  "LA-0177": {
    "regionId": "las-vegas-desert",
    "lat": 36.17,
    "lon": -115.14,
    "precision": "base area",
    "locationLabel": "Regional base: Las Vegas, Nevada; catalog example: Overton, NV"
  },
  "LA-0178": {
    "regionId": "west-texas",
    "lat": 32.78,
    "lon": -106.17,
    "precision": "place area",
    "locationLabel": "White Sands park area"
  },
  "LA-0179": {
    "regionId": "great-lakes",
    "lat": 39.76,
    "lon": -84.19,
    "precision": "city area",
    "locationLabel": "Dayton, OH"
  },
  "LA-0180": {
    "regionId": "bay-area",
    "lat": 37.77,
    "lon": -122.42,
    "precision": "city area",
    "locationLabel": "San Francisco, CA"
  },
  "LA-0181": {
    "regionId": "las-vegas-desert",
    "lat": 36.17,
    "lon": -115.14,
    "precision": "base area",
    "locationLabel": "Regional base: Las Vegas, Nevada; catalog example: Boulder City, NV"
  },
  "LA-0182": {
    "regionId": "great-lakes",
    "lat": 42.33,
    "lon": -83.05,
    "precision": "base area",
    "locationLabel": "Regional base: Detroit, Michigan; catalog example: Dearborn, MI"
  },
  "LA-0183": {
    "regionId": "san-diego",
    "lat": 32.72,
    "lon": -117.16,
    "precision": "city area",
    "locationLabel": "San Diego, CA"
  },
  "LA-0184": {
    "regionId": "appalachian-carolinas",
    "lat": 35.71,
    "lon": -83.51,
    "precision": "city area",
    "locationLabel": "Gatlinburg, TN"
  },
  "LA-0185": {
    "regionId": "new-york-philadelphia",
    "lat": 44.28,
    "lon": -73.98,
    "precision": "city area",
    "locationLabel": "Lake Placid, NY"
  },
  "LA-0186": {
    "regionId": "appalachian-carolinas",
    "lat": 35.6,
    "lon": -82.55,
    "precision": "city area",
    "locationLabel": "Asheville, NC"
  },
  "LA-0187": {
    "regionId": "oregon",
    "lat": 45.52,
    "lon": -122.68,
    "precision": "base area",
    "locationLabel": "Regional base: Portland, Oregon; catalog example: Hood River, OR"
  },
  "LA-0188": {
    "regionId": "boston-new-england",
    "lat": 43.98,
    "lon": -71.12,
    "precision": "city area",
    "locationLabel": "Conway, NH"
  },
  "LA-0189": {
    "regionId": "colorado",
    "lat": 39.19,
    "lon": -106.82,
    "precision": "city area",
    "locationLabel": "Aspen, CO"
  },
  "LA-0190": {
    "regionId": "twin-cities",
    "lat": 44.98,
    "lon": -93.27,
    "precision": "base area",
    "locationLabel": "Regional base: Minneapolis, Minnesota; catalog example: Ontonagon, MI"
  },
  "LA-0191": {
    "regionId": "boston-new-england",
    "lat": 44.47,
    "lon": -72.69,
    "precision": "city area",
    "locationLabel": "Stowe, VT"
  },
  "LA-0192": {
    "regionId": "yellowstone-tetons",
    "lat": 43.48,
    "lon": -110.76,
    "precision": "base area",
    "locationLabel": "Regional base: Jackson, Wyoming; catalog example: Wyoming ranch country, WY"
  },
  "LA-0193": {
    "regionId": "oregon",
    "lat": 45.52,
    "lon": -122.68,
    "precision": "base area",
    "locationLabel": "Regional base: Portland, Oregon; catalog example: Willamette Valley, OR"
  },
  "LA-0194": {
    "regionId": "boston-new-england",
    "lat": 42.36,
    "lon": -71.06,
    "precision": "base area",
    "locationLabel": "Regional base: Boston, Massachusetts; catalog example: Vermont countryside, VT"
  },
  "LA-0195": {
    "regionId": "new-york-philadelphia",
    "lat": 40.71,
    "lon": -74.01,
    "precision": "base area",
    "locationLabel": "Regional base: New York City, New York; catalog example: Hudson Valley, NY"
  },
  "LA-0196": {
    "regionId": "central-coast",
    "lat": 35.63,
    "lon": -120.69,
    "precision": "city area",
    "locationLabel": "Paso Robles, CA"
  },
  "LA-0197": {
    "regionId": "new-york-philadelphia",
    "lat": 40.71,
    "lon": -74.01,
    "precision": "city area",
    "locationLabel": "New York, NY"
  },
  "LA-0198": {
    "regionId": "chicago",
    "lat": 43.07,
    "lon": -89.4,
    "precision": "city area",
    "locationLabel": "Madison, WI"
  },
  "LA-0199": {
    "regionId": "bay-area",
    "lat": 37.77,
    "lon": -122.42,
    "precision": "city area",
    "locationLabel": "San Francisco, CA"
  },
  "LA-0200": {
    "regionId": "los-angeles",
    "lat": 34.05,
    "lon": -118.24,
    "precision": "city area",
    "locationLabel": "Los Angeles, CA"
  },
  "LA-0201": {
    "regionId": "washington",
    "lat": 47.61,
    "lon": -122.33,
    "precision": "city area",
    "locationLabel": "Seattle, WA"
  },
  "LA-0202": {
    "regionId": "new-york-philadelphia",
    "lat": 39.95,
    "lon": -75.17,
    "precision": "city area",
    "locationLabel": "Philadelphia, PA"
  },
  "LA-0203": {
    "regionId": "new-mexico",
    "lat": 35.69,
    "lon": -105.94,
    "precision": "city area",
    "locationLabel": "Santa Fe, NM"
  },
  "LA-0204": {
    "regionId": "new-york-philadelphia",
    "lat": 40.71,
    "lon": -74.01,
    "precision": "city area",
    "locationLabel": "New York, NY"
  },
  "LA-0205": {
    "regionId": "new-orleans",
    "lat": 29.95,
    "lon": -90.07,
    "precision": "city area",
    "locationLabel": "New Orleans, LA"
  },
  "LA-0206": {
    "regionId": "new-mexico",
    "lat": 35.08,
    "lon": -106.65,
    "precision": "city area",
    "locationLabel": "Albuquerque, NM"
  },
  "LA-0207": {
    "regionId": "tennessee-kentucky",
    "lat": 36.16,
    "lon": -86.78,
    "precision": "base area",
    "locationLabel": "Regional base: Nashville, Tennessee; catalog example: Manchester, TN"
  },
  "LA-0208": {
    "regionId": "los-angeles",
    "lat": 33.72,
    "lon": -116.22,
    "precision": "city area",
    "locationLabel": "Indio, CA"
  },
  "LA-0209": {
    "regionId": "chicago",
    "lat": 41.88,
    "lon": -87.63,
    "precision": "city area",
    "locationLabel": "Chicago, IL"
  },
  "LA-0210": {
    "regionId": "new-orleans",
    "lat": 29.95,
    "lon": -90.07,
    "precision": "city area",
    "locationLabel": "New Orleans, LA"
  },
  "LA-0211": {
    "regionId": "bay-area",
    "lat": 37.77,
    "lon": -122.42,
    "precision": "city area",
    "locationLabel": "San Francisco, CA"
  },
  "LA-0212": {
    "regionId": "texas-cities",
    "lat": 30.27,
    "lon": -97.74,
    "precision": "city area",
    "locationLabel": "Austin, TX"
  },
  "LA-0213": {
    "regionId": "chicago",
    "lat": 41.88,
    "lon": -87.63,
    "precision": "city area",
    "locationLabel": "Chicago, United States"
  },
  "LA-0214": {
    "regionId": "new-york-philadelphia",
    "lat": 40.71,
    "lon": -74.01,
    "precision": "city area",
    "locationLabel": "New York City, NY"
  },
  "LA-0215": {
    "regionId": "bay-area",
    "lat": 37.77,
    "lon": -122.42,
    "precision": "base area",
    "locationLabel": "Regional base: San Francisco, California; catalog example: Sonoma County, CA"
  },
  "LA-0216": {
    "regionId": "bay-area",
    "lat": 37.77,
    "lon": -122.42,
    "precision": "city area",
    "locationLabel": "San Francisco, CA"
  },
  "LA-0217": {
    "regionId": "new-mexico",
    "lat": 35.69,
    "lon": -105.94,
    "precision": "city area",
    "locationLabel": "Santa Fe, NM"
  },
  "LA-0218": {
    "regionId": "lowcountry",
    "lat": 32.78,
    "lon": -79.93,
    "precision": "city area",
    "locationLabel": "Charleston, SC"
  },
  "LA-0219": {
    "regionId": "southern-arizona",
    "lat": 33.45,
    "lon": -112.07,
    "precision": "city area",
    "locationLabel": "Phoenix, AZ"
  },
  "LA-0220": {
    "regionId": "south-florida",
    "lat": 25.72,
    "lon": -80.27,
    "precision": "city area",
    "locationLabel": "Coral Gables, FL"
  },
  "LA-0221": {
    "regionId": "bay-area",
    "lat": 37.77,
    "lon": -122.42,
    "precision": "base area",
    "locationLabel": "Regional base: San Francisco, California; catalog example: Woodside, CA"
  },
  "LA-0222": {
    "regionId": "new-york-philadelphia",
    "lat": 40.71,
    "lon": -74.01,
    "precision": "base area",
    "locationLabel": "Regional base: New York City, New York; catalog example: Kennett Square, PA"
  },
  "LA-0223": {
    "regionId": "st-louis-ozarks",
    "lat": 38.63,
    "lon": -90.2,
    "precision": "city area",
    "locationLabel": "St. Louis, MO"
  },
  "LA-0224": {
    "regionId": "new-york-philadelphia",
    "lat": 40.85,
    "lon": -73.86,
    "precision": "city area",
    "locationLabel": "Bronx, NY"
  },
  "LA-0225": {
    "regionId": "los-angeles",
    "lat": 34.12,
    "lon": -118.11,
    "precision": "city area",
    "locationLabel": "San Marino, CA"
  },
  "LA-0226": {
    "regionId": "northern-arizona",
    "lat": 35.2,
    "lon": -111.65,
    "precision": "base area",
    "locationLabel": "Regional base: Flagstaff, Arizona; catalog example: AZ"
  },
  "LA-0227": {
    "regionId": "alaska",
    "lat": 60.77,
    "lon": -148.68,
    "precision": "city area",
    "locationLabel": "Whittier, AK"
  },
  "LA-0228": {
    "regionId": "alaska",
    "lat": 58.41,
    "lon": -135.74,
    "precision": "city area",
    "locationLabel": "Gustavus, AK"
  },
  "LA-0229": {
    "regionId": "glacier-montana",
    "lat": 48.2,
    "lon": -114.32,
    "precision": "base area",
    "locationLabel": "Regional base: Kalispell, Montana; catalog example: West Glacier, MT"
  },
  "LA-0230": {
    "regionId": "alaska",
    "lat": 60.1,
    "lon": -149.44,
    "precision": "city area",
    "locationLabel": "Seward gateway area; Kenai Fjords excursions have their own routes"
  },
  "LA-0231": {
    "regionId": "alaska",
    "lat": 58.3,
    "lon": -134.42,
    "precision": "city area",
    "locationLabel": "Juneau, AK"
  },
  "LA-0232": {
    "regionId": "washington",
    "lat": 46.85,
    "lon": -121.76,
    "precision": "place area",
    "locationLabel": "Mount Rainier area"
  },
  "LA-0233": {
    "regionId": "washington",
    "lat": 48.54,
    "lon": -121.44,
    "precision": "city area",
    "locationLabel": "Marblemount, WA"
  },
  "LA-0234": {
    "regionId": "alaska",
    "lat": 60.94,
    "lon": -149.17,
    "precision": "city area",
    "locationLabel": "Girdwood, AK"
  },
  "LA-0235": {
    "regionId": "alaska",
    "lat": 60.1,
    "lon": -149.44,
    "precision": "city area",
    "locationLabel": "Seward gateway area; Kenai Fjords excursions have their own routes"
  },
  "LA-0236": {
    "regionId": "new-york-philadelphia",
    "lat": 40.71,
    "lon": -74.01,
    "precision": "base area",
    "locationLabel": "Regional base: New York City, New York; catalog example: Corning, NY"
  },
  "LA-0237": {
    "regionId": "new-mexico",
    "lat": 35.69,
    "lon": -105.94,
    "precision": "city area",
    "locationLabel": "Santa Fe, NM"
  },
  "LA-0238": {
    "regionId": "appalachian-carolinas",
    "lat": 35.6,
    "lon": -82.55,
    "precision": "city area",
    "locationLabel": "Asheville, NC"
  },
  "LA-0239": {
    "regionId": "tennessee-kentucky",
    "lat": 36.16,
    "lon": -86.78,
    "precision": "base area",
    "locationLabel": "Regional base: Nashville, Tennessee; catalog example: Paducah, KY"
  },
  "LA-0240": {
    "regionId": "washington",
    "lat": 47.61,
    "lon": -122.33,
    "precision": "city area",
    "locationLabel": "Seattle, WA"
  },
  "LA-0241": {
    "regionId": "northern-arizona",
    "lat": 36.05,
    "lon": -112.14,
    "precision": "city area",
    "locationLabel": "Grand Canyon Village, AZ"
  },
  "LA-0242": {
    "regionId": "glacier-montana",
    "lat": 48.2,
    "lon": -114.32,
    "precision": "base area",
    "locationLabel": "Regional base: Kalispell, Montana; catalog example: West Glacier, MT"
  },
  "LA-0243": {
    "regionId": "sierra",
    "lat": 37.75,
    "lon": -119.59,
    "precision": "place area",
    "locationLabel": "Yosemite Valley area"
  },
  "LA-0244": {
    "regionId": "zion-bryce",
    "lat": 37.19,
    "lon": -113.0,
    "precision": "city area",
    "locationLabel": "Springdale, UT"
  },
  "LA-0245": {
    "regionId": "zion-bryce",
    "lat": 37.19,
    "lon": -113.0,
    "precision": "city area",
    "locationLabel": "Springdale, UT"
  },
  "LA-0246": {
    "regionId": "dc-virginia",
    "lat": 38.91,
    "lon": -77.04,
    "precision": "base area",
    "locationLabel": "Regional base: Washington, District of Columbia; catalog example: Roanoke, VA"
  },
  "LA-0247": {
    "regionId": "sierra",
    "lat": 37.75,
    "lon": -119.59,
    "precision": "place area",
    "locationLabel": "Yosemite Valley area"
  },
  "LA-0248": {
    "regionId": "hawaii",
    "lat": 22.2,
    "lon": -159.5,
    "precision": "city area",
    "locationLabel": "Hanalei, HI"
  },
  "LA-0249": {
    "regionId": "atlanta-alabama",
    "lat": 33.52,
    "lon": -86.8,
    "precision": "city area",
    "locationLabel": "Montgomery / Selma / Birmingham, United States"
  },
  "LA-0250": {
    "regionId": "dc-virginia",
    "lat": 38.91,
    "lon": -77.04,
    "precision": "city area",
    "locationLabel": "Washington, United States"
  },
  "LA-0251": {
    "regionId": "alaska",
    "lat": 64.84,
    "lon": -147.72,
    "precision": "city area",
    "locationLabel": "Fairbanks, AK"
  },
  "LA-0252": {
    "regionId": "colorado",
    "lat": 39.55,
    "lon": -107.32,
    "precision": "city area",
    "locationLabel": "Glenwood Springs, CO"
  },
  "LA-0253": {
    "regionId": "washington",
    "lat": 44.06,
    "lon": -121.32,
    "precision": "city area",
    "locationLabel": "North Bend, WA"
  },
  "LA-0254": {
    "regionId": "arkansas",
    "lat": 34.5,
    "lon": -93.05,
    "precision": "city area",
    "locationLabel": "Hot Springs, AR"
  },
  "LA-0255": {
    "regionId": "new-mexico",
    "lat": 35.69,
    "lon": -105.94,
    "precision": "base area",
    "locationLabel": "Regional base: Santa Fe, New Mexico; catalog example: Ojo Caliente, NM"
  },
  "LA-0256": {
    "regionId": "colorado",
    "lat": 39.74,
    "lon": -104.99,
    "precision": "base area",
    "locationLabel": "Regional base: Denver, Colorado; catalog example: Steamboat Springs, CO"
  },
  "LA-0257": {
    "regionId": "sierra",
    "lat": 38.26,
    "lon": -119.23,
    "precision": "city area",
    "locationLabel": "Bridgeport, CA"
  },
  "LA-0258": {
    "regionId": "oregon",
    "lat": 45.52,
    "lon": -122.68,
    "precision": "base area",
    "locationLabel": "Regional base: Portland, Oregon; catalog example: Glide, OR"
  },
  "LA-0259": {
    "regionId": "new-orleans",
    "lat": 29.95,
    "lon": -90.07,
    "precision": "city area",
    "locationLabel": "New Orleans, LA"
  },
  "LA-0260": {
    "regionId": "new-york-philadelphia",
    "lat": 40.71,
    "lon": -74.01,
    "precision": "city area",
    "locationLabel": "New York, NY"
  },
  "LA-0261": {
    "regionId": "bay-area",
    "lat": 37.77,
    "lon": -122.42,
    "precision": "city area",
    "locationLabel": "San Francisco, CA"
  },
  "LA-0262": {
    "regionId": "chicago",
    "lat": 41.88,
    "lon": -87.63,
    "precision": "city area",
    "locationLabel": "Chicago, IL"
  },
  "LA-0263": {
    "regionId": "texas-cities",
    "lat": 30.27,
    "lon": -97.74,
    "precision": "city area",
    "locationLabel": "Austin, TX"
  },
  "LA-0264": {
    "regionId": "lowcountry",
    "lat": 32.78,
    "lon": -79.93,
    "precision": "city area",
    "locationLabel": "Charleston, SC"
  },
  "LA-0265": {
    "regionId": "los-angeles",
    "lat": 34.05,
    "lon": -118.24,
    "precision": "city area",
    "locationLabel": "Los Angeles, CA"
  },
  "LA-0266": {
    "regionId": "oregon",
    "lat": 45.52,
    "lon": -122.68,
    "precision": "city area",
    "locationLabel": "Portland, OR"
  },
  "LA-0267": {
    "regionId": "bay-area",
    "lat": 37.77,
    "lon": -122.42,
    "precision": "base area",
    "locationLabel": "Regional base: San Francisco, California; catalog example: Tiburon, CA"
  },
  "LA-0268": {
    "regionId": "great-lakes",
    "lat": 42.33,
    "lon": -83.05,
    "precision": "base area",
    "locationLabel": "Regional base: Detroit, Michigan; catalog example: Dearborn, MI"
  },
  "LA-0269": {
    "regionId": "los-angeles",
    "lat": 34.05,
    "lon": -118.24,
    "precision": "city area",
    "locationLabel": "Los Angeles, CA"
  },
  "LA-0270": {
    "regionId": "chicago",
    "lat": 41.88,
    "lon": -87.63,
    "precision": "city area",
    "locationLabel": "Chicago, IL"
  },
  "LA-0271": {
    "regionId": "dc-virginia",
    "lat": 38.91,
    "lon": -77.04,
    "precision": "city area",
    "locationLabel": "Washington, DC"
  },
  "LA-0272": {
    "regionId": "washington",
    "lat": 47.61,
    "lon": -122.33,
    "precision": "city area",
    "locationLabel": "Seattle, WA"
  },
  "LA-0273": {
    "regionId": "lowcountry",
    "lat": 32.78,
    "lon": -79.93,
    "precision": "base area",
    "locationLabel": "Regional base: Charleston, South Carolina; catalog example: Coastal Carolinas and Georgia, SC / GA / NC / FL"
  },
  "LA-0274": {
    "regionId": "new-york-philadelphia",
    "lat": 40.71,
    "lon": -74.01,
    "precision": "city area",
    "locationLabel": "New York, NY"
  },
  "LA-0275": {
    "regionId": "omaha-plains",
    "lat": 41.26,
    "lon": -95.94,
    "precision": "base area",
    "locationLabel": "Regional base: Omaha, Nebraska; catalog example: Cedar Rapids, IA"
  },
  "LA-0276": {
    "regionId": "washington",
    "lat": 47.61,
    "lon": -122.33,
    "precision": "city area",
    "locationLabel": "Seattle, WA"
  },
  "LA-0277": {
    "regionId": "hawaii",
    "lat": 19.43,
    "lon": -155.24,
    "precision": "city area",
    "locationLabel": "Volcano / Hawaiʻi Island area"
  },
  "LA-0278": {
    "regionId": "colorado",
    "lat": 37.35,
    "lon": -108.59,
    "precision": "city area",
    "locationLabel": "Cortez, CO"
  },
  "LA-0279": {
    "regionId": "alaska",
    "lat": 61.22,
    "lon": -149.9,
    "precision": "city area",
    "locationLabel": "Anchorage, AK"
  },
  "LA-0280": {
    "regionId": "new-mexico",
    "lat": 35.69,
    "lon": -105.94,
    "precision": "base area",
    "locationLabel": "Regional base: Santa Fe, New Mexico; catalog example: Los Alamos, NM"
  },
  "LA-0281": {
    "regionId": "northern-arizona",
    "lat": 36.15,
    "lon": -109.55,
    "precision": "city area",
    "locationLabel": "Chinle, AZ"
  },
  "LA-0282": {
    "regionId": "dc-virginia",
    "lat": 38.91,
    "lon": -77.04,
    "precision": "city area",
    "locationLabel": "Washington, DC"
  },
  "LA-0283": {
    "regionId": "alaska",
    "lat": 57.05,
    "lon": -135.33,
    "precision": "city area",
    "locationLabel": "Sitka, AK"
  },
  "LA-0284": {
    "regionId": "new-mexico",
    "lat": 35.69,
    "lon": -105.94,
    "precision": "base area",
    "locationLabel": "Regional base: Santa Fe, New Mexico; catalog example: Acoma, NM"
  },
  "LA-0285": {
    "regionId": "northern-arizona",
    "lat": 35.2,
    "lon": -111.65,
    "precision": "base area",
    "locationLabel": "Regional base: Flagstaff, Arizona; catalog example: Northeast Arizona, AZ"
  },
  "LA-0286": {
    "regionId": "colorado",
    "lat": 39.74,
    "lon": -104.99,
    "precision": "base area",
    "locationLabel": "Regional base: Denver, Colorado; catalog example: CO"
  },
  "LA-0287": {
    "regionId": "st-louis-ozarks",
    "lat": 38.63,
    "lon": -90.2,
    "precision": "base area",
    "locationLabel": "Regional base: St. Louis, Missouri; catalog example: IL"
  },
  "LA-0288": {
    "regionId": "us-virgin-islands",
    "lat": 18.34,
    "lon": -64.75,
    "precision": "place area",
    "locationLabel": "St. John island area"
  },
  "LA-0289": {
    "regionId": "hawaii",
    "lat": 19.43,
    "lon": -155.24,
    "precision": "city area",
    "locationLabel": "Volcano / Hawaiʻi Island area"
  },
  "LA-0290": {
    "regionId": "hawaii",
    "lat": 22.17,
    "lon": -159.64,
    "precision": "place area",
    "locationLabel": "Nā Pali coast area"
  },
  "LA-0291": {
    "regionId": "south-florida",
    "lat": 24.56,
    "lon": -81.78,
    "precision": "city area",
    "locationLabel": "Key West, FL"
  },
  "LA-0292": {
    "regionId": "hawaii",
    "lat": 20.88,
    "lon": -156.68,
    "precision": "city area",
    "locationLabel": "Lahaina, HI"
  },
  "LA-0293": {
    "regionId": "hawaii",
    "lat": 21.31,
    "lon": -157.86,
    "precision": "city area",
    "locationLabel": "Honolulu, HI"
  },
  "LA-0294": {
    "regionId": "washington",
    "lat": 48.7,
    "lon": -122.91,
    "precision": "city area",
    "locationLabel": "Eastsound, WA"
  },
  "LA-0295": {
    "regionId": "boston-new-england",
    "lat": 42.36,
    "lon": -71.06,
    "precision": "base area",
    "locationLabel": "Regional base: Boston, Massachusetts; catalog example: Edgartown, MA"
  },
  "LA-0296": {
    "regionId": "los-angeles",
    "lat": 33.34,
    "lon": -118.33,
    "precision": "city area",
    "locationLabel": "Avalon, CA"
  },
  "LA-0297": {
    "regionId": "oregon",
    "lat": 42.94,
    "lon": -122.11,
    "precision": "place area",
    "locationLabel": "Crater Lake area"
  },
  "LA-0298": {
    "regionId": "great-lakes",
    "lat": 42.38,
    "lon": -76.87,
    "precision": "city area",
    "locationLabel": "Watkins Glen, NY"
  },
  "LA-0299": {
    "regionId": "glacier-montana",
    "lat": 47.69,
    "lon": -114.16,
    "precision": "city area",
    "locationLabel": "Polson, MT"
  },
  "LA-0300": {
    "regionId": "washington",
    "lat": 47.61,
    "lon": -122.33,
    "precision": "base area",
    "locationLabel": "Regional base: Seattle, Washington; catalog example: Chelan, WA"
  },
  "LA-0301": {
    "regionId": "new-york-philadelphia",
    "lat": 43.43,
    "lon": -73.71,
    "precision": "city area",
    "locationLabel": "Lake George, NY"
  },
  "LA-0302": {
    "regionId": "northern-arizona",
    "lat": 36.91,
    "lon": -111.46,
    "precision": "city area",
    "locationLabel": "Page, AZ"
  },
  "LA-0303": {
    "regionId": "sierra",
    "lat": 38.94,
    "lon": -119.98,
    "precision": "city area",
    "locationLabel": "South Lake Tahoe, CA"
  },
  "LA-0304": {
    "regionId": "great-lakes",
    "lat": 44.85,
    "lon": -86.06,
    "precision": "place area",
    "locationLabel": "Sleeping Bear Dunes area"
  },
  "LA-0305": {
    "regionId": "appalachian-carolinas",
    "lat": 35.6,
    "lon": -82.55,
    "precision": "base area",
    "locationLabel": "Regional base: Asheville, North Carolina; catalog example: Buxton, NC"
  },
  "LA-0306": {
    "regionId": "oregon",
    "lat": 45.52,
    "lon": -122.68,
    "precision": "base area",
    "locationLabel": "Regional base: Portland, Oregon; catalog example: Florence, OR"
  },
  "LA-0307": {
    "regionId": "bay-area",
    "lat": 37.77,
    "lon": -122.42,
    "precision": "base area",
    "locationLabel": "Regional base: San Francisco, California; catalog example: Pescadero, CA"
  },
  "LA-0308": {
    "regionId": "bay-area",
    "lat": 38.07,
    "lon": -122.81,
    "precision": "city area",
    "locationLabel": "Point Reyes Station, CA"
  },
  "LA-0309": {
    "regionId": "maine-acadia",
    "lat": 43.56,
    "lon": -70.2,
    "precision": "city area",
    "locationLabel": "Cape Elizabeth, ME"
  },
  "LA-0310": {
    "regionId": "twin-cities",
    "lat": 44.98,
    "lon": -93.27,
    "precision": "base area",
    "locationLabel": "Regional base: Minneapolis, Minnesota; catalog example: Two Harbors, MN"
  },
  "LA-0311": {
    "regionId": "central-florida",
    "lat": 29.9,
    "lon": -81.31,
    "precision": "city area",
    "locationLabel": "St. Augustine, FL"
  },
  "LA-0312": {
    "regionId": "oregon",
    "lat": 44.64,
    "lon": -124.05,
    "precision": "city area",
    "locationLabel": "Newport, OR"
  },
  "LA-0313": {
    "regionId": "northern-arizona",
    "lat": 35.2,
    "lon": -111.65,
    "precision": "base area",
    "locationLabel": "Regional base: Flagstaff, Arizona; catalog example: Monument Valley, UT"
  },
  "LA-0314": {
    "regionId": "lowcountry",
    "lat": 32.08,
    "lon": -81.1,
    "precision": "city area",
    "locationLabel": "Savannah, GA"
  },
  "LA-0315": {
    "regionId": "south-florida",
    "lat": 24.56,
    "lon": -81.78,
    "precision": "city area",
    "locationLabel": "Key West, FL"
  },
  "LA-0316": {
    "regionId": "los-angeles",
    "lat": 34.05,
    "lon": -118.24,
    "precision": "city area",
    "locationLabel": "Los Angeles, CA"
  },
  "LA-0317": {
    "regionId": "hawaii",
    "lat": 21.42,
    "lon": -157.8,
    "precision": "city area",
    "locationLabel": "Kaneohe, HI"
  },
  "LA-0318": {
    "regionId": "st-louis-ozarks",
    "lat": 38.63,
    "lon": -90.2,
    "precision": "base area",
    "locationLabel": "Regional base: St. Louis, Missouri; catalog example: Hannibal, MO"
  },
  "LA-0319": {
    "regionId": "colorado",
    "lat": 40.38,
    "lon": -105.52,
    "precision": "city area",
    "locationLabel": "Estes Park, CO"
  },
  "LA-0320": {
    "regionId": "boston-new-england",
    "lat": 42.36,
    "lon": -71.06,
    "precision": "base area",
    "locationLabel": "Regional base: Boston, Massachusetts; catalog example: Concord, MA"
  },
  "LA-0321": {
    "regionId": "new-orleans",
    "lat": 29.95,
    "lon": -90.07,
    "precision": "city area",
    "locationLabel": "New Orleans, LA"
  },
  "LA-0322": {
    "regionId": "tennessee-kentucky",
    "lat": 35.15,
    "lon": -90.05,
    "precision": "city area",
    "locationLabel": "Memphis, TN"
  },
  "LA-0323": {
    "regionId": "new-york-philadelphia",
    "lat": 40.71,
    "lon": -74.01,
    "precision": "city area",
    "locationLabel": "New York City, NY"
  },
  "LA-0324": {
    "regionId": "appalachian-carolinas",
    "lat": 35.6,
    "lon": -82.55,
    "precision": "city area",
    "locationLabel": "Asheville, NC"
  },
  "LA-0325": {
    "regionId": "tennessee-kentucky",
    "lat": 36.16,
    "lon": -86.78,
    "precision": "city area",
    "locationLabel": "Nashville, TN"
  },
  "LA-0326": {
    "regionId": "new-orleans",
    "lat": 29.95,
    "lon": -90.07,
    "precision": "city area",
    "locationLabel": "New Orleans, LA"
  },
  "LA-0327": {
    "regionId": "new-york-philadelphia",
    "lat": 40.71,
    "lon": -74.01,
    "precision": "city area",
    "locationLabel": "New York, NY"
  },
  "LA-0328": {
    "regionId": "bay-area",
    "lat": 37.77,
    "lon": -122.42,
    "precision": "city area",
    "locationLabel": "San Francisco, CA"
  },
  "LA-0329": {
    "regionId": "boston-new-england",
    "lat": 42.36,
    "lon": -71.06,
    "precision": "city area",
    "locationLabel": "Boston, MA"
  },
  "LA-0330": {
    "regionId": "chicago",
    "lat": 41.88,
    "lon": -87.63,
    "precision": "city area",
    "locationLabel": "Chicago, IL"
  },
  "LA-0331": {
    "regionId": "hawaii",
    "lat": 21.31,
    "lon": -157.86,
    "precision": "city area",
    "locationLabel": "Honolulu, HI"
  },
  "LA-0332": {
    "regionId": "south-florida",
    "lat": 24.56,
    "lon": -81.78,
    "precision": "city area",
    "locationLabel": "Key West / Islamorada, FL"
  },
  "LA-0333": {
    "regionId": "san-diego",
    "lat": 32.72,
    "lon": -117.16,
    "precision": "city area",
    "locationLabel": "San Diego / North County, CA"
  },
  "LA-0334": {
    "regionId": "lowcountry",
    "lat": 32.08,
    "lon": -81.1,
    "precision": "city area",
    "locationLabel": "Savannah, GA"
  },
  "LA-0335": {
    "regionId": "washington",
    "lat": 47.61,
    "lon": -122.33,
    "precision": "city area",
    "locationLabel": "Seattle, WA"
  },
  "LA-0336": {
    "regionId": "oregon",
    "lat": 45.52,
    "lon": -122.68,
    "precision": "city area",
    "locationLabel": "Portland, OR"
  },
  "LA-0337": {
    "regionId": "new-mexico",
    "lat": 35.69,
    "lon": -105.94,
    "precision": "city area",
    "locationLabel": "Santa Fe, NM"
  },
  "LA-0338": {
    "regionId": "hawaii",
    "lat": 21.31,
    "lon": -157.86,
    "precision": "base area",
    "locationLabel": "Regional base: Honolulu, Oʻahu, Hawaiʻi; catalog example: HI"
  },
  "LA-0339": {
    "regionId": "new-orleans",
    "lat": 29.95,
    "lon": -90.07,
    "precision": "city area",
    "locationLabel": "New Orleans, LA"
  },
  "LA-0340": {
    "regionId": "new-york-philadelphia",
    "lat": 40.71,
    "lon": -74.01,
    "precision": "city area",
    "locationLabel": "New York, NY"
  },
  "LA-0341": {
    "regionId": "bay-area",
    "lat": 37.77,
    "lon": -122.42,
    "precision": "city area",
    "locationLabel": "San Francisco, CA"
  },
  "LA-0342": {
    "regionId": "dc-virginia",
    "lat": 38.91,
    "lon": -77.04,
    "precision": "city area",
    "locationLabel": "Washington, DC"
  },
  "LA-0343": {
    "regionId": "new-mexico",
    "lat": 35.08,
    "lon": -106.65,
    "precision": "city area",
    "locationLabel": "Albuquerque, NM"
  },
  "LA-0344": {
    "regionId": "chicago",
    "lat": 41.88,
    "lon": -87.63,
    "precision": "city area",
    "locationLabel": "Chicago, IL"
  },
  "LA-0345": {
    "regionId": "great-lakes",
    "lat": 42.33,
    "lon": -83.05,
    "precision": "city area",
    "locationLabel": "Detroit, MI"
  },
  "LA-0346": {
    "regionId": "hawaii",
    "lat": 21.31,
    "lon": -157.86,
    "precision": "city area",
    "locationLabel": "Honolulu, HI"
  },
  "LA-0347": {
    "regionId": "south-florida",
    "lat": 25.79,
    "lon": -80.13,
    "precision": "city area",
    "locationLabel": "Miami Beach / Miami, FL"
  },
  "LA-0348": {
    "regionId": "new-york-philadelphia",
    "lat": 39.95,
    "lon": -75.17,
    "precision": "city area",
    "locationLabel": "Philadelphia, PA"
  },
  "LA-0349": {
    "regionId": "texas-cities",
    "lat": 29.42,
    "lon": -98.49,
    "precision": "city area",
    "locationLabel": "San Antonio, TX"
  },
  "LA-0350": {
    "regionId": "lowcountry",
    "lat": 32.08,
    "lon": -81.1,
    "precision": "city area",
    "locationLabel": "Savannah, GA"
  },
  "LA-0351": {
    "regionId": "washington",
    "lat": 47.61,
    "lon": -122.33,
    "precision": "city area",
    "locationLabel": "Seattle, WA"
  },
  "LA-0352": {
    "regionId": "alaska",
    "lat": 61.22,
    "lon": -149.9,
    "precision": "city area",
    "locationLabel": "Anchorage, AK"
  },
  "LA-0353": {
    "regionId": "boston-new-england",
    "lat": 42.36,
    "lon": -71.06,
    "precision": "city area",
    "locationLabel": "Boston, MA"
  },
  "LA-0354": {
    "regionId": "las-vegas-desert",
    "lat": 36.17,
    "lon": -115.14,
    "precision": "city area",
    "locationLabel": "Las Vegas, NV"
  },
  "LA-0355": {
    "regionId": "los-angeles",
    "lat": 34.05,
    "lon": -118.24,
    "precision": "city area",
    "locationLabel": "Los Angeles, CA"
  },
  "LA-0356": {
    "regionId": "oregon",
    "lat": 45.52,
    "lon": -122.68,
    "precision": "city area",
    "locationLabel": "Portland, OR"
  },
  "LA-0357": {
    "regionId": "south-florida",
    "lat": 25.76,
    "lon": -80.19,
    "precision": "base area",
    "locationLabel": "Regional base: Miami, Florida; catalog example: FL"
  },
  "LA-0358": {
    "regionId": "central-coast",
    "lat": 36.6,
    "lon": -121.89,
    "precision": "city area",
    "locationLabel": "Monterey area; catalog example: CA"
  },
  "LA-0359": {
    "regionId": "alaska",
    "lat": 63.73,
    "lon": -148.89,
    "precision": "place area",
    "locationLabel": "Denali entrance area"
  },
  "LA-0360": {
    "regionId": "boston-new-england",
    "lat": 42.36,
    "lon": -71.06,
    "precision": "base area",
    "locationLabel": "Regional base: Boston, Massachusetts; catalog example: Vermont / New Hampshire, United States"
  },
  "LA-0361": {
    "regionId": "alaska",
    "lat": 63.73,
    "lon": -148.89,
    "precision": "place area",
    "locationLabel": "Denali entrance area"
  },
  "LA-0362": {
    "regionId": "yellowstone-tetons",
    "lat": 43.79,
    "lon": -110.68,
    "precision": "place area",
    "locationLabel": "Grand Teton area"
  },
  "LA-0363": {
    "regionId": "boston-new-england",
    "lat": 44.27,
    "lon": -71.3,
    "precision": "place area",
    "locationLabel": "Mount Washington / White Mountains area"
  },
  "LA-0364": {
    "regionId": "hawaii",
    "lat": 19.82,
    "lon": -155.47,
    "precision": "place area",
    "locationLabel": "Mauna Kea area"
  },
  "LA-0365": {
    "regionId": "oregon",
    "lat": 45.3,
    "lon": -121.75,
    "precision": "city area",
    "locationLabel": "Government Camp, OR"
  },
  "LA-0366": {
    "regionId": "washington",
    "lat": 46.85,
    "lon": -121.76,
    "precision": "place area",
    "locationLabel": "Mount Rainier area"
  },
  "LA-0367": {
    "regionId": "sierra",
    "lat": 36.61,
    "lon": -118.06,
    "precision": "city area",
    "locationLabel": "Lone Pine, CA"
  },
  "LA-0368": {
    "regionId": "colorado",
    "lat": 39.74,
    "lon": -104.99,
    "precision": "base area",
    "locationLabel": "Regional base: Denver, Colorado; catalog example: Colorado Springs, CO"
  },
  "LA-0369": {
    "regionId": "sierra",
    "lat": 37.75,
    "lon": -119.59,
    "precision": "place area",
    "locationLabel": "Yosemite Valley area"
  },
  "LA-0370": {
    "regionId": "bay-area",
    "lat": 37.77,
    "lon": -122.42,
    "precision": "city area",
    "locationLabel": "San Francisco, CA"
  },
  "LA-0371": {
    "regionId": "chicago",
    "lat": 41.88,
    "lon": -87.63,
    "precision": "city area",
    "locationLabel": "Chicago, IL"
  },
  "LA-0372": {
    "regionId": "dc-virginia",
    "lat": 38.91,
    "lon": -77.04,
    "precision": "city area",
    "locationLabel": "Washington, DC"
  },
  "LA-0373": {
    "regionId": "new-york-philadelphia",
    "lat": 40.71,
    "lon": -74.01,
    "precision": "city area",
    "locationLabel": "New York, NY"
  },
  "LA-0374": {
    "regionId": "new-york-philadelphia",
    "lat": 40.71,
    "lon": -74.01,
    "precision": "city area",
    "locationLabel": "New York, NY"
  },
  "LA-0375": {
    "regionId": "bay-area",
    "lat": 37.77,
    "lon": -122.42,
    "precision": "city area",
    "locationLabel": "San Francisco, CA"
  },
  "LA-0376": {
    "regionId": "new-orleans",
    "lat": 29.95,
    "lon": -90.07,
    "precision": "city area",
    "locationLabel": "New Orleans, LA"
  },
  "LA-0377": {
    "regionId": "los-angeles",
    "lat": 34.05,
    "lon": -118.24,
    "precision": "city area",
    "locationLabel": "Los Angeles, CA"
  },
  "LA-0378": {
    "regionId": "texas-cities",
    "lat": 30.27,
    "lon": -97.74,
    "precision": "city area",
    "locationLabel": "Austin, TX"
  },
  "LA-0379": {
    "regionId": "los-angeles",
    "lat": 34.05,
    "lon": -118.24,
    "precision": "city area",
    "locationLabel": "Los Angeles, CA"
  },
  "LA-0380": {
    "regionId": "new-york-philadelphia",
    "lat": 40.71,
    "lon": -74.01,
    "precision": "city area",
    "locationLabel": "New York, NY"
  },
  "LA-0381": {
    "regionId": "new-orleans",
    "lat": 29.95,
    "lon": -90.07,
    "precision": "city area",
    "locationLabel": "New Orleans, LA"
  },
  "LA-0382": {
    "regionId": "colorado",
    "lat": 39.74,
    "lon": -104.99,
    "precision": "base area",
    "locationLabel": "Regional base: Denver, Colorado; catalog example: Morrison, CO"
  },
  "LA-0383": {
    "regionId": "tennessee-kentucky",
    "lat": 36.16,
    "lon": -86.78,
    "precision": "city area",
    "locationLabel": "Nashville, TN"
  },
  "LA-0384": {
    "regionId": "bay-area",
    "lat": 37.77,
    "lon": -122.42,
    "precision": "city area",
    "locationLabel": "San Francisco, CA"
  },
  "LA-0385": {
    "regionId": "washington",
    "lat": 47.61,
    "lon": -122.33,
    "precision": "base area",
    "locationLabel": "Regional base: Seattle, Washington; catalog example: George, WA"
  },
  "LA-0387": {
    "regionId": "new-york-philadelphia",
    "lat": 40.71,
    "lon": -74.01,
    "precision": "city area",
    "locationLabel": "New York Harbor, NY / NJ"
  },
  "LA-0388": {
    "regionId": "st-louis-ozarks",
    "lat": 38.67,
    "lon": -89.98,
    "precision": "city area",
    "locationLabel": "Collinsville, IL"
  },
  "LA-0389": {
    "regionId": "los-angeles",
    "lat": 34.05,
    "lon": -118.24,
    "precision": "base area",
    "locationLabel": "Regional base: Los Angeles, California; catalog example: Keene, CA"
  },
  "LA-0390": {
    "regionId": "black-hills",
    "lat": 44.59,
    "lon": -104.71,
    "precision": "place area",
    "locationLabel": "Devils Tower area"
  },
  "LA-0391": {
    "regionId": "salt-lake-idaho",
    "lat": 40.76,
    "lon": -111.89,
    "precision": "base area",
    "locationLabel": "Regional base: Salt Lake City, Utah; catalog example: Jensen, UT / CO"
  },
  "LA-0392": {
    "regionId": "lowcountry",
    "lat": 32.78,
    "lon": -79.93,
    "precision": "city area",
    "locationLabel": "Charleston, SC"
  },
  "LA-0393": {
    "regionId": "bay-area",
    "lat": 37.77,
    "lon": -122.42,
    "precision": "base area",
    "locationLabel": "Regional base: San Francisco, California; catalog example: Mill Valley, CA"
  },
  "LA-0394": {
    "regionId": "southern-arizona",
    "lat": 32.37,
    "lon": -112.86,
    "precision": "city area",
    "locationLabel": "Ajo, AZ"
  },
  "LA-0395": {
    "regionId": "twin-cities",
    "lat": 44.98,
    "lon": -93.27,
    "precision": "base area",
    "locationLabel": "Regional base: Minneapolis, Minnesota; catalog example: Pipestone, MN"
  },
  "LA-0396": {
    "regionId": "puerto-rico",
    "lat": 18.47,
    "lon": -66.11,
    "precision": "city area",
    "locationLabel": "San Juan, PR"
  },
  "LA-0397": {
    "regionId": "maine-acadia",
    "lat": 44.34,
    "lon": -68.27,
    "precision": "place area",
    "locationLabel": "Acadia / Mount Desert Island area"
  },
  "LA-0398": {
    "regionId": "alaska",
    "lat": 63.73,
    "lon": -148.89,
    "precision": "place area",
    "locationLabel": "Denali entrance area"
  },
  "LA-0399": {
    "regionId": "glacier-montana",
    "lat": 48.2,
    "lon": -114.32,
    "precision": "base area",
    "locationLabel": "Regional base: Kalispell, Montana; catalog example: West Glacier, MT"
  },
  "LA-0400": {
    "regionId": "northern-arizona",
    "lat": 36.05,
    "lon": -112.14,
    "precision": "city area",
    "locationLabel": "Grand Canyon Village, AZ"
  },
  "LA-0401": {
    "regionId": "yellowstone-tetons",
    "lat": 43.79,
    "lon": -110.68,
    "precision": "place area",
    "locationLabel": "Grand Teton area"
  },
  "LA-0402": {
    "regionId": "hawaii",
    "lat": 19.43,
    "lon": -155.24,
    "precision": "city area",
    "locationLabel": "Volcano / Hawaiʻi Island area"
  },
  "LA-0403": {
    "regionId": "washington",
    "lat": 48.12,
    "lon": -123.43,
    "precision": "city area",
    "locationLabel": "Port Angeles, WA"
  },
  "LA-0404": {
    "regionId": "northern-california",
    "lat": 41.76,
    "lon": -124.2,
    "precision": "city area",
    "locationLabel": "Crescent City, CA"
  },
  "LA-0405": {
    "regionId": "yellowstone-tetons",
    "lat": 44.6,
    "lon": -110.5,
    "precision": "place area",
    "locationLabel": "Yellowstone park area"
  },
  "LA-0406": {
    "regionId": "sierra",
    "lat": 37.75,
    "lon": -119.59,
    "precision": "place area",
    "locationLabel": "Yosemite Valley area"
  },
  "LA-0407": {
    "regionId": "moab",
    "lat": 38.73,
    "lon": -109.59,
    "precision": "place area",
    "locationLabel": "Arches National Park area"
  },
  "LA-0408": {
    "regionId": "alaska",
    "lat": 58.41,
    "lon": -135.74,
    "precision": "city area",
    "locationLabel": "Gustavus, AK"
  },
  "LA-0409": {
    "regionId": "colorado",
    "lat": 40.38,
    "lon": -105.52,
    "precision": "city area",
    "locationLabel": "Estes Park, CO"
  },
  "LA-0410": {
    "regionId": "zion-bryce",
    "lat": 37.3,
    "lon": -113.03,
    "precision": "place area",
    "locationLabel": "Zion Canyon area"
  },
  "LA-0411": {
    "regionId": "black-hills",
    "lat": 43.86,
    "lon": -102.35,
    "precision": "place area",
    "locationLabel": "Badlands National Park area"
  },
  "LA-0412": {
    "regionId": "moab",
    "lat": 38.45,
    "lon": -109.82,
    "precision": "place area",
    "locationLabel": "Canyonlands / Moab area"
  },
  "LA-0413": {
    "regionId": "zion-bryce",
    "lat": 37.1,
    "lon": -113.58,
    "precision": "base area",
    "locationLabel": "Regional base: St. George, Utah; catalog example: Torrey, UT"
  },
  "LA-0414": {
    "regionId": "salt-lake-idaho",
    "lat": 39.01,
    "lon": -114.12,
    "precision": "city area",
    "locationLabel": "Baker, NV"
  },
  "LA-0415": {
    "regionId": "alaska",
    "lat": 60.1,
    "lon": -149.44,
    "precision": "city area",
    "locationLabel": "Seward gateway area; Kenai Fjords excursions have their own routes"
  },
  "LA-0416": {
    "regionId": "tennessee-kentucky",
    "lat": 37.19,
    "lon": -86.1,
    "precision": "place area",
    "locationLabel": "Mammoth Cave park area"
  },
  "LA-0417": {
    "regionId": "washington",
    "lat": 48.54,
    "lon": -121.44,
    "precision": "city area",
    "locationLabel": "Marblemount, WA"
  },
  "LA-0418": {
    "regionId": "central-coast",
    "lat": 36.6,
    "lon": -121.89,
    "precision": "base area",
    "locationLabel": "Regional base: Monterey, California; catalog example: Paicines, CA"
  },
  "LA-0419": {
    "regionId": "sierra",
    "lat": 38.94,
    "lon": -119.98,
    "precision": "base area",
    "locationLabel": "Regional base: South Lake Tahoe, California; catalog example: Three Rivers, CA"
  },
  "LA-0421": {
    "regionId": "sierra",
    "lat": 37.75,
    "lon": -119.59,
    "precision": "place area",
    "locationLabel": "Yosemite Valley area"
  },
  "LA-0422": {
    "regionId": "alaska",
    "lat": 64.84,
    "lon": -147.72,
    "precision": "city area",
    "locationLabel": "Fairbanks area; catalog example: AK"
  },
  "LA-0423": {
    "regionId": "alaska",
    "lat": 63.73,
    "lon": -148.89,
    "precision": "place area",
    "locationLabel": "Denali entrance area"
  },
  "LA-0424": {
    "regionId": "glacier-montana",
    "lat": 48.2,
    "lon": -114.32,
    "precision": "base area",
    "locationLabel": "Regional base: Kalispell, Montana; catalog example: West Glacier, MT"
  },
  "LA-0425": {
    "regionId": "alaska",
    "lat": 64.84,
    "lon": -147.72,
    "precision": "city area",
    "locationLabel": "Fairbanks, AK"
  },
  "LA-0426": {
    "regionId": "alaska",
    "lat": 67.25,
    "lon": -150.18,
    "precision": "city area",
    "locationLabel": "Coldfoot, AK"
  },
  "LA-0427": {
    "regionId": "alaska",
    "lat": 64.84,
    "lon": -147.72,
    "precision": "city area",
    "locationLabel": "Fairbanks, AK"
  },
  "LA-0428": {
    "regionId": "great-lakes",
    "lat": 42.33,
    "lon": -83.05,
    "precision": "base area",
    "locationLabel": "Regional base: Detroit, Michigan; catalog example: Mackinaw City, MI"
  },
  "LA-0429": {
    "regionId": "twin-cities",
    "lat": 44.98,
    "lon": -93.27,
    "precision": "base area",
    "locationLabel": "Regional base: Minneapolis, Minnesota; catalog example: International Falls, MN"
  },
  "LA-0430": {
    "regionId": "central-coast",
    "lat": 36.27,
    "lon": -121.81,
    "precision": "city area",
    "locationLabel": "Big Sur area; catalog example: CA"
  },
  "LA-0431": {
    "regionId": "great-lakes",
    "lat": 42.33,
    "lon": -83.05,
    "precision": "base area",
    "locationLabel": "Regional base: Detroit, Michigan; catalog example: Michigan"
  },
  "LA-0432": {
    "regionId": "twin-cities",
    "lat": 44.98,
    "lon": -93.27,
    "precision": "base area",
    "locationLabel": "Regional base: Minneapolis, Minnesota; catalog example: Wisconsin"
  },
  "LA-0433": {
    "regionId": "oregon",
    "lat": 45.52,
    "lon": -122.68,
    "precision": "base area",
    "locationLabel": "Regional base: Portland, Oregon; catalog example: Oregon"
  },
  "LA-0434": {
    "regionId": "washington",
    "lat": 47.61,
    "lon": -122.33,
    "precision": "base area",
    "locationLabel": "Regional base: Seattle, Washington; catalog example: Washington"
  },
  "LA-0436": {
    "regionId": "colorado",
    "lat": 39.19,
    "lon": -106.82,
    "precision": "city area",
    "locationLabel": "Aspen area; catalog example: Colorado"
  },
  "LA-0437": {
    "regionId": "great-lakes",
    "lat": 44.85,
    "lon": -86.06,
    "precision": "place area",
    "locationLabel": "Sleeping Bear Dunes area"
  },
  "LA-0438": {
    "regionId": "omaha-plains",
    "lat": 41.26,
    "lon": -95.94,
    "precision": "base area",
    "locationLabel": "Regional base: Omaha, Nebraska; catalog example: Nebraska Platte River"
  },
  "LA-0439": {
    "regionId": "lowcountry",
    "lat": 32.78,
    "lon": -79.93,
    "precision": "base area",
    "locationLabel": "Regional base: Charleston, South Carolina; catalog example: South Carolina"
  },
  "LA-0440": {
    "regionId": "texas-cities",
    "lat": 30.27,
    "lon": -97.74,
    "precision": "base area",
    "locationLabel": "Regional base: Austin, Texas; catalog example: Texas Gulf Coast"
  },
  "LA-0443": {
    "regionId": "tennessee-kentucky",
    "lat": 37.19,
    "lon": -86.1,
    "precision": "place area",
    "locationLabel": "Mammoth Cave park area"
  },
  "LA-0444": {
    "regionId": "twin-cities",
    "lat": 48.0,
    "lon": -91.5,
    "precision": "place area",
    "locationLabel": "Boundary Waters / Ely gateway area"
  },
  "LA-0445": {
    "regionId": "kansas-city",
    "lat": 39.1,
    "lon": -94.58,
    "precision": "base area",
    "locationLabel": "Regional base: Kansas City, Missouri; catalog example: Kansas"
  },
  "LA-0446": {
    "regionId": "washington",
    "lat": 47.61,
    "lon": -122.33,
    "precision": "base area",
    "locationLabel": "Regional base: Seattle, Washington; catalog example: Washington"
  },
  "LA-0448": {
    "regionId": "central-florida",
    "lat": 28.54,
    "lon": -81.38,
    "precision": "base area",
    "locationLabel": "Regional base: Orlando, Florida; catalog example: Florida"
  },
  "LA-0449": {
    "regionId": "salt-lake-idaho",
    "lat": 40.9,
    "lon": -112.4,
    "precision": "place area",
    "locationLabel": "Great Salt Lake area"
  },
  "LA-0450": {
    "regionId": "maine-acadia",
    "lat": 44.34,
    "lon": -68.27,
    "precision": "place area",
    "locationLabel": "Acadia / Mount Desert Island area"
  },
  "LA-0451": {
    "regionId": "new-york-philadelphia",
    "lat": 40.71,
    "lon": -74.01,
    "precision": "base area",
    "locationLabel": "Regional base: New York City, New York; catalog example: NY"
  },
  "LA-0453": {
    "regionId": "los-angeles",
    "lat": 34.05,
    "lon": -118.24,
    "precision": "city area",
    "locationLabel": "Los Angeles, CA"
  },
  "LA-0454": {
    "regionId": "central-coast",
    "lat": 36.27,
    "lon": -121.81,
    "precision": "city area",
    "locationLabel": "Big Sur, CA"
  },
  "LA-0455": {
    "regionId": "tennessee-kentucky",
    "lat": 35.15,
    "lon": -90.05,
    "precision": "city area",
    "locationLabel": "Memphis, TN"
  },
  "LA-0456": {
    "regionId": "maine-acadia",
    "lat": 43.66,
    "lon": -70.26,
    "precision": "city area",
    "locationLabel": "Portland, ME"
  },
  "LA-0457": {
    "regionId": "central-coast",
    "lat": 36.56,
    "lon": -121.92,
    "precision": "city area",
    "locationLabel": "Carmel-by-the-Sea, CA"
  },
  "LA-0459": {
    "regionId": "glacier-montana",
    "lat": 48.2,
    "lon": -114.32,
    "precision": "base area",
    "locationLabel": "Regional base: Kalispell, Montana; catalog example: West Glacier, MT"
  },
  "LA-0460": {
    "regionId": "south-florida",
    "lat": 24.56,
    "lon": -81.78,
    "precision": "city area",
    "locationLabel": "Key West, FL"
  },
  "LA-0461": {
    "regionId": "hawaii",
    "lat": 20.9,
    "lon": -156.37,
    "precision": "city area",
    "locationLabel": "Paia, HI"
  },
  "LA-0462": {
    "regionId": "colorado",
    "lat": 40.38,
    "lon": -105.52,
    "precision": "city area",
    "locationLabel": "Estes Park, CO"
  },
  "LA-0463": {
    "regionId": "zion-bryce",
    "lat": 37.1,
    "lon": -113.58,
    "precision": "base area",
    "locationLabel": "Regional base: St. George, Utah; catalog example: Torrey, UT"
  },
  "LA-0464": {
    "regionId": "northern-arizona",
    "lat": 36.05,
    "lon": -112.14,
    "precision": "city area",
    "locationLabel": "Williams to Grand Canyon Village, AZ"
  },
  "LA-0465": {
    "regionId": "alaska",
    "lat": 61.22,
    "lon": -149.9,
    "precision": "city area",
    "locationLabel": "Anchorage to Seward, AK"
  },
  "LA-0470": {
    "regionId": "new-mexico",
    "lat": 36.9,
    "lon": -106.58,
    "precision": "city area",
    "locationLabel": "Chama to Antonito, NM / CO"
  },
  "LA-0471": {
    "regionId": "colorado",
    "lat": 37.28,
    "lon": -107.88,
    "precision": "city area",
    "locationLabel": "Durango to Silverton, CO"
  },
  "LA-0472": {
    "regionId": "dc-virginia",
    "lat": 38.91,
    "lon": -77.04,
    "precision": "base area",
    "locationLabel": "Regional base: Washington, District of Columbia; catalog example: DC"
  },
  "LA-0473": {
    "regionId": "los-angeles",
    "lat": 33.34,
    "lon": -118.33,
    "precision": "city area",
    "locationLabel": "Avalon, CA"
  },
  "LA-0474": {
    "regionId": "central-florida",
    "lat": 28.9,
    "lon": -82.59,
    "precision": "city area",
    "locationLabel": "Crystal River, FL"
  },
  "LA-0475": {
    "regionId": "hawaii",
    "lat": 21.31,
    "lon": -157.86,
    "precision": "city area",
    "locationLabel": "Honolulu, HI"
  },
  "LA-0476": {
    "regionId": "south-florida",
    "lat": 25.09,
    "lon": -80.45,
    "precision": "city area",
    "locationLabel": "Key Largo, FL"
  },
  "LA-0477": {
    "regionId": "hawaii",
    "lat": 19.64,
    "lon": -155.99,
    "precision": "city area",
    "locationLabel": "Kailua-Kona, HI"
  },
  "LA-0478": {
    "regionId": "san-diego",
    "lat": 32.72,
    "lon": -117.16,
    "precision": "city area",
    "locationLabel": "San Diego, CA"
  },
  "LA-0479": {
    "regionId": "hawaii",
    "lat": 20.76,
    "lon": -156.45,
    "precision": "city area",
    "locationLabel": "Kihei, HI"
  },
  "LA-0480": {
    "regionId": "central-coast",
    "lat": 36.6,
    "lon": -121.89,
    "precision": "city area",
    "locationLabel": "Monterey, CA"
  },
  "LA-0481": {
    "regionId": "boston-new-england",
    "lat": 42.36,
    "lon": -71.06,
    "precision": "city area",
    "locationLabel": "Boston, MA"
  },
  "LA-0482": {
    "regionId": "hawaii",
    "lat": 21.31,
    "lon": -157.86,
    "precision": "city area",
    "locationLabel": "Honolulu, HI"
  },
  "LA-0483": {
    "regionId": "dc-virginia",
    "lat": 39.29,
    "lon": -76.61,
    "precision": "city area",
    "locationLabel": "Baltimore, MD"
  },
  "LA-0484": {
    "regionId": "south-florida",
    "lat": 24.56,
    "lon": -81.78,
    "precision": "city area",
    "locationLabel": "Key West, FL"
  },
  "LA-0485": {
    "regionId": "new-orleans",
    "lat": 29.95,
    "lon": -90.07,
    "precision": "city area",
    "locationLabel": "New Orleans, LA"
  },
  "LA-0486": {
    "regionId": "maine-acadia",
    "lat": 44.39,
    "lon": -68.2,
    "precision": "city area",
    "locationLabel": "Bar Harbor, ME"
  },
  "LA-0487": {
    "regionId": "oregon",
    "lat": 44.64,
    "lon": -124.05,
    "precision": "city area",
    "locationLabel": "Newport, OR"
  },
  "LA-0488": {
    "regionId": "washington",
    "lat": 47.61,
    "lon": -122.33,
    "precision": "city area",
    "locationLabel": "Seattle, WA"
  },
  "LA-0489": {
    "regionId": "dc-virginia",
    "lat": 38.91,
    "lon": -77.04,
    "precision": "city area",
    "locationLabel": "Washington area; catalog example: DC"
  },
  "LA-0490": {
    "regionId": "boston-new-england",
    "lat": 42.36,
    "lon": -71.06,
    "precision": "base area",
    "locationLabel": "Regional base: Boston, Massachusetts; catalog example: VT"
  },
  "LA-0491": {
    "regionId": "northern-arizona",
    "lat": 36.05,
    "lon": -112.14,
    "precision": "city area",
    "locationLabel": "Grand Canyon Village, United States"
  },
  "LA-0492": {
    "regionId": "colorado",
    "lat": 39.19,
    "lon": -106.82,
    "precision": "city area",
    "locationLabel": "Aspen, CO"
  },
  "LA-0493": {
    "regionId": "yellowstone-tetons",
    "lat": 45.28,
    "lon": -111.3,
    "precision": "city area",
    "locationLabel": "Big Sky, MT"
  },
  "LA-0494": {
    "regionId": "yellowstone-tetons",
    "lat": 43.48,
    "lon": -110.76,
    "precision": "city area",
    "locationLabel": "Jackson area; catalog example: Teton Village, WY"
  },
  "LA-0495": {
    "regionId": "boston-new-england",
    "lat": 42.36,
    "lon": -71.06,
    "precision": "base area",
    "locationLabel": "Regional base: Boston, Massachusetts; catalog example: Killington, VT"
  },
  "LA-0496": {
    "regionId": "sierra",
    "lat": 37.65,
    "lon": -118.97,
    "precision": "city area",
    "locationLabel": "Mammoth Lakes, CA"
  },
  "LA-0497": {
    "regionId": "sierra",
    "lat": 39.2,
    "lon": -120.23,
    "precision": "city area",
    "locationLabel": "Olympic Valley, CA"
  },
  "LA-0498": {
    "regionId": "salt-lake-idaho",
    "lat": 40.65,
    "lon": -111.5,
    "precision": "city area",
    "locationLabel": "Park City, UT"
  },
  "LA-0499": {
    "regionId": "colorado",
    "lat": 39.74,
    "lon": -104.99,
    "precision": "base area",
    "locationLabel": "Regional base: Denver, Colorado; catalog example: Vail, CO"
  },
  "LA-0500": {
    "regionId": "chicago",
    "lat": 41.88,
    "lon": -87.63,
    "precision": "city area",
    "locationLabel": "Chicago area; catalog example: Ottawa, IL"
  },
  "LA-0501": {
    "regionId": "hawaii",
    "lat": 21.58,
    "lon": -158.12,
    "precision": "city area",
    "locationLabel": "Waialua, HI"
  },
  "LA-0502": {
    "regionId": "south-florida",
    "lat": 24.56,
    "lon": -81.78,
    "precision": "city area",
    "locationLabel": "Key West area; catalog example: Sugarloaf Key, FL"
  },
  "LA-0503": {
    "regionId": "southern-arizona",
    "lat": 32.22,
    "lon": -110.97,
    "precision": "base area",
    "locationLabel": "Regional base: Tucson, Arizona; catalog example: Eloy, AZ"
  },
  "LA-0504": {
    "regionId": "moab",
    "lat": 38.57,
    "lon": -109.55,
    "precision": "city area",
    "locationLabel": "Moab, UT"
  },
  "LA-0505": {
    "regionId": "boston-new-england",
    "lat": 42.36,
    "lon": -71.06,
    "precision": "base area",
    "locationLabel": "Regional base: Boston, Massachusetts; catalog example: Lebanon, ME"
  },
  "LA-0506": {
    "regionId": "los-angeles",
    "lat": 34.05,
    "lon": -118.24,
    "precision": "base area",
    "locationLabel": "Regional base: Los Angeles, California; catalog example: Perris, CA"
  },
  "LA-0507": {
    "regionId": "bay-area",
    "lat": 37.77,
    "lon": -122.42,
    "precision": "base area",
    "locationLabel": "Regional base: San Francisco, California; catalog example: Byron, CA"
  },
  "LA-0508": {
    "regionId": "new-york-philadelphia",
    "lat": 40.71,
    "lon": -74.01,
    "precision": "city area",
    "locationLabel": "New York City, NY"
  },
  "LA-0509": {
    "regionId": "new-orleans",
    "lat": 29.95,
    "lon": -90.07,
    "precision": "city area",
    "locationLabel": "New Orleans, LA"
  },
  "LA-0510": {
    "regionId": "colorado",
    "lat": 40.02,
    "lon": -105.27,
    "precision": "city area",
    "locationLabel": "Boulder, CO"
  },
  "LA-0511": {
    "regionId": "bay-area",
    "lat": 36.97,
    "lon": -122.03,
    "precision": "city area",
    "locationLabel": "Santa Cruz, CA"
  },
  "LA-0512": {
    "regionId": "oregon",
    "lat": 45.52,
    "lon": -122.68,
    "precision": "city area",
    "locationLabel": "Portland, OR"
  },
  "LA-0513": {
    "regionId": "new-orleans",
    "lat": 18.34,
    "lon": -64.75,
    "precision": "place area",
    "locationLabel": "St. John island area"
  },
  "LA-0515": {
    "regionId": "new-york-philadelphia",
    "lat": 40.71,
    "lon": -74.01,
    "precision": "city area",
    "locationLabel": "New York City: Brooklyn, Queens or Upper West Side"
  },
  "LA-0516": {
    "regionId": "san-diego",
    "lat": 32.72,
    "lon": -117.16,
    "precision": "city area",
    "locationLabel": "San Diego coast: La Jolla / UCSD, Pacific Beach or Encinitas"
  },
  "LA-0517": {
    "regionId": "boston-new-england",
    "lat": 42.36,
    "lon": -71.06,
    "precision": "city area",
    "locationLabel": "Boston: Back Bay, Cambridge or Jamaica Plain"
  },
  "LA-0518": {
    "regionId": "chicago",
    "lat": 41.88,
    "lon": -87.63,
    "precision": "city area",
    "locationLabel": "Chicago: Lincoln Park, Lakeview or West Loop"
  },
  "LA-0519": {
    "regionId": "hawaii",
    "lat": 21.31,
    "lon": -157.86,
    "precision": "city area",
    "locationLabel": "Honolulu: Kaimukī, Mānoa or the Waikīkī edge"
  },
  "LA-0520": {
    "regionId": "bay-area",
    "lat": 37.77,
    "lon": -122.42,
    "precision": "city area",
    "locationLabel": "San Francisco: Inner Sunset, North Beach or Hayes Valley"
  },
  "LA-0521": {
    "regionId": "new-mexico",
    "lat": 35.69,
    "lon": -105.94,
    "precision": "city area",
    "locationLabel": "Santa Fe: Plaza or Railyard"
  },
  "LA-0522": {
    "regionId": "lowcountry",
    "lat": 32.78,
    "lon": -79.93,
    "precision": "city area",
    "locationLabel": "Savannah or Charleston"
  },
  "LA-0523": {
    "regionId": "washington",
    "lat": 47.61,
    "lon": -122.33,
    "precision": "city area",
    "locationLabel": "Seattle: Capitol Hill, Ballard or Fremont"
  },
  "LA-0524": {
    "regionId": "dc-virginia",
    "lat": 38.91,
    "lon": -77.04,
    "precision": "city area",
    "locationLabel": "Washington, DC: Dupont Circle / Capitol Hill / Adams Morgan"
  },
  "LA-0525": {
    "regionId": "maine-acadia",
    "lat": 44.39,
    "lon": -68.2,
    "precision": "city area",
    "locationLabel": "Bar Harbor, ME"
  },
  "LA-0526": {
    "regionId": "arkansas",
    "lat": 36.4,
    "lon": -93.74,
    "precision": "city area",
    "locationLabel": "Eureka Springs, AR"
  },
  "LA-0527": {
    "regionId": "texas-cities",
    "lat": 30.28,
    "lon": -98.87,
    "precision": "city area",
    "locationLabel": "Fredericksburg, TX"
  },
  "LA-0528": {
    "regionId": "chicago",
    "lat": 42.42,
    "lon": -90.43,
    "precision": "city area",
    "locationLabel": "Galena, IL"
  },
  "LA-0529": {
    "regionId": "washington",
    "lat": 48.12,
    "lon": -122.76,
    "precision": "city area",
    "locationLabel": "Port Townsend, WA"
  },
  "LA-0530": {
    "regionId": "new-york-philadelphia",
    "lat": 43.08,
    "lon": -73.79,
    "precision": "city area",
    "locationLabel": "Saratoga Springs, NY"
  },
  "LA-0531": {
    "regionId": "central-coast",
    "lat": 34.6,
    "lon": -120.14,
    "precision": "city area",
    "locationLabel": "Solvang, CA"
  },
  "LA-0532": {
    "regionId": "boston-new-england",
    "lat": 43.62,
    "lon": -72.52,
    "precision": "city area",
    "locationLabel": "Woodstock, VT"
  },
  "LA-0533": {
    "regionId": "alaska",
    "lat": 60.1,
    "lon": -149.44,
    "precision": "city area",
    "locationLabel": "Seward, AK"
  },
  "LA-0534": {
    "regionId": "new-mexico",
    "lat": 35.08,
    "lon": -106.65,
    "precision": "city area",
    "locationLabel": "Albuquerque, NM"
  },
  "LA-0535": {
    "regionId": "los-angeles",
    "lat": 34.05,
    "lon": -118.24,
    "precision": "city area",
    "locationLabel": "Los Angeles, CA"
  },
  "LA-0536": {
    "regionId": "central-florida",
    "lat": 28.54,
    "lon": -81.38,
    "precision": "base area",
    "locationLabel": "Regional base: Orlando, Florida; catalog example: Merritt Island, FL"
  },
  "LA-0537": {
    "regionId": "dc-virginia",
    "lat": 38.91,
    "lon": -77.04,
    "precision": "city area",
    "locationLabel": "Washington, DC"
  },
  "LA-0538": {
    "regionId": "texas-cities",
    "lat": 29.76,
    "lon": -95.37,
    "precision": "city area",
    "locationLabel": "Houston, TX"
  },
  "LA-0539": {
    "regionId": "bay-area",
    "lat": 37.77,
    "lon": -122.42,
    "precision": "city area",
    "locationLabel": "San Francisco, CA"
  },
  "LA-0540": {
    "regionId": "boston-new-england",
    "lat": 42.36,
    "lon": -71.06,
    "precision": "city area",
    "locationLabel": "Boston, MA"
  },
  "LA-0541": {
    "regionId": "dc-virginia",
    "lat": 38.91,
    "lon": -77.04,
    "precision": "base area",
    "locationLabel": "Regional base: Washington, District of Columbia; catalog example: Chantilly, VA"
  },
  "LA-0542": {
    "regionId": "new-york-philadelphia",
    "lat": 40.71,
    "lon": -74.01,
    "precision": "city area",
    "locationLabel": "New York, NY"
  },
  "LA-0543": {
    "regionId": "southern-arizona",
    "lat": 32.22,
    "lon": -110.97,
    "precision": "city area",
    "locationLabel": "Tucson, AZ"
  },
  "LA-0544": {
    "regionId": "central-coast",
    "lat": 36.27,
    "lon": -121.81,
    "precision": "city area",
    "locationLabel": "Big Sur, CA"
  },
  "LA-0545": {
    "regionId": "san-diego",
    "lat": 32.72,
    "lon": -117.16,
    "precision": "base area",
    "locationLabel": "Regional base: San Diego, California; catalog example: San Marcos, CA"
  },
  "LA-0546": {
    "regionId": "boston-new-england",
    "lat": 42.29,
    "lon": -73.32,
    "precision": "city area",
    "locationLabel": "Stockbridge, MA"
  },
  "LA-0547": {
    "regionId": "northern-arizona",
    "lat": 34.87,
    "lon": -111.76,
    "precision": "city area",
    "locationLabel": "Sedona, AZ"
  },
  "LA-0548": {
    "regionId": "southern-arizona",
    "lat": 32.22,
    "lon": -110.97,
    "precision": "city area",
    "locationLabel": "Tucson, AZ"
  },
  "LA-0549": {
    "regionId": "hawaii",
    "lat": 20.83,
    "lon": -156.92,
    "precision": "city area",
    "locationLabel": "Lanai City, HI"
  },
  "LA-0550": {
    "regionId": "texas-cities",
    "lat": 30.27,
    "lon": -97.74,
    "precision": "city area",
    "locationLabel": "Austin, TX"
  },
  "LA-0551": {
    "regionId": "northern-arizona",
    "lat": 34.87,
    "lon": -111.76,
    "precision": "city area",
    "locationLabel": "Sedona, AZ"
  },
  "LA-0552": {
    "regionId": "new-mexico",
    "lat": 35.69,
    "lon": -105.94,
    "precision": "base area",
    "locationLabel": "Regional base: Santa Fe, New Mexico; catalog example: Nageezi, NM"
  },
  "LA-0553": {
    "regionId": "new-mexico",
    "lat": 36.41,
    "lon": -105.57,
    "precision": "city area",
    "locationLabel": "Taos, NM"
  },
  "LA-0554": {
    "regionId": "dc-virginia",
    "lat": 38.91,
    "lon": -77.04,
    "precision": "city area",
    "locationLabel": "Washington, DC"
  },
  "LA-0555": {
    "regionId": "new-mexico",
    "lat": 35.69,
    "lon": -105.94,
    "precision": "base area",
    "locationLabel": "Regional base: Santa Fe, New Mexico; catalog example: Chimayo, NM"
  },
  "LA-0556": {
    "regionId": "hawaii",
    "lat": 19.82,
    "lon": -155.47,
    "precision": "place area",
    "locationLabel": "Mauna Kea area"
  },
  "LA-0557": {
    "regionId": "northern-california",
    "lat": 41.31,
    "lon": -122.31,
    "precision": "city area",
    "locationLabel": "Mount Shasta, CA"
  },
  "LA-0558": {
    "regionId": "salt-lake-idaho",
    "lat": 40.76,
    "lon": -111.89,
    "precision": "city area",
    "locationLabel": "Salt Lake City, UT"
  },
  "LA-0559": {
    "regionId": "boston-new-england",
    "lat": 42.36,
    "lon": -71.06,
    "precision": "city area",
    "locationLabel": "Boston, MA"
  },
  "LA-0560": {
    "regionId": "chicago",
    "lat": 41.88,
    "lon": -87.63,
    "precision": "city area",
    "locationLabel": "Chicago, IL"
  },
  "LA-0561": {
    "regionId": "chicago",
    "lat": 39.77,
    "lon": -86.16,
    "precision": "city area",
    "locationLabel": "Indianapolis, IN"
  },
  "LA-0562": {
    "regionId": "tennessee-kentucky",
    "lat": 38.25,
    "lon": -85.76,
    "precision": "city area",
    "locationLabel": "Louisville, KY"
  },
  "LA-0563": {
    "regionId": "chicago",
    "lat": 44.51,
    "lon": -88.01,
    "precision": "city area",
    "locationLabel": "Green Bay, WI"
  },
  "LA-0564": {
    "regionId": "new-york-philadelphia",
    "lat": 40.71,
    "lon": -74.01,
    "precision": "city area",
    "locationLabel": "New York, NY"
  },
  "LA-0565": {
    "regionId": "atlanta-alabama",
    "lat": 33.75,
    "lon": -84.39,
    "precision": "base area",
    "locationLabel": "Regional base: Atlanta, Georgia; catalog example: Augusta, GA"
  },
  "LA-0566": {
    "regionId": "glacier-montana",
    "lat": 48.2,
    "lon": -114.32,
    "precision": "base area",
    "locationLabel": "Regional base: Kalispell, Montana; catalog example: West Glacier, MT"
  },
  "LA-0567": {
    "regionId": "zion-bryce",
    "lat": 37.63,
    "lon": -112.17,
    "precision": "place area",
    "locationLabel": "Bryce Canyon area"
  },
  "LA-0568": {
    "regionId": "moab",
    "lat": 37.62,
    "lon": -109.48,
    "precision": "city area",
    "locationLabel": "Blanding, UT"
  },
  "LA-0569": {
    "regionId": "new-york-philadelphia",
    "lat": 40.71,
    "lon": -74.01,
    "precision": "base area",
    "locationLabel": "Regional base: New York City, New York; catalog example: Coudersport, PA"
  },
  "LA-0570": {
    "regionId": "hawaii",
    "lat": 19.82,
    "lon": -155.47,
    "precision": "place area",
    "locationLabel": "Mauna Kea area"
  },
  "LA-0571": {
    "regionId": "hawaii",
    "lat": 21.59,
    "lon": -158.1,
    "precision": "city area",
    "locationLabel": "Haleiwa, HI"
  },
  "LA-0572": {
    "regionId": "central-florida",
    "lat": 28.32,
    "lon": -80.61,
    "precision": "city area",
    "locationLabel": "Cocoa Beach, FL"
  },
  "LA-0573": {
    "regionId": "los-angeles",
    "lat": 33.66,
    "lon": -118.0,
    "precision": "city area",
    "locationLabel": "Huntington Beach, CA"
  },
  "LA-0574": {
    "regionId": "los-angeles",
    "lat": 34.03,
    "lon": -118.78,
    "precision": "city area",
    "locationLabel": "Malibu, CA"
  },
  "LA-0575": {
    "regionId": "bay-area",
    "lat": 37.46,
    "lon": -122.43,
    "precision": "city area",
    "locationLabel": "Half Moon Bay, CA"
  },
  "LA-0576": {
    "regionId": "bay-area",
    "lat": 36.97,
    "lon": -122.03,
    "precision": "city area",
    "locationLabel": "Santa Cruz, CA"
  },
  "LA-0577": {
    "regionId": "los-angeles",
    "lat": 33.43,
    "lon": -117.61,
    "precision": "city area",
    "locationLabel": "San Clemente, CA"
  },
  "LA-0578": {
    "regionId": "hawaii",
    "lat": 21.31,
    "lon": -157.86,
    "precision": "city area",
    "locationLabel": "Honolulu, HI"
  },
  "LA-0579": {
    "regionId": "new-york-philadelphia",
    "lat": 40.71,
    "lon": -74.01,
    "precision": "city area",
    "locationLabel": "New York City, NY"
  },
  "LA-0580": {
    "regionId": "chicago",
    "lat": 41.88,
    "lon": -87.63,
    "precision": "city area",
    "locationLabel": "Chicago, IL"
  },
  "LA-0581": {
    "regionId": "boston-new-england",
    "lat": 42.36,
    "lon": -71.06,
    "precision": "base area",
    "locationLabel": "Regional base: Boston, Massachusetts; catalog example: Becket, MA"
  },
  "LA-0582": {
    "regionId": "oregon",
    "lat": 42.19,
    "lon": -122.71,
    "precision": "city area",
    "locationLabel": "Ashland, OR"
  },
  "LA-0583": {
    "regionId": "new-york-philadelphia",
    "lat": 40.71,
    "lon": -74.01,
    "precision": "city area",
    "locationLabel": "New York City, NY"
  },
  "LA-0584": {
    "regionId": "new-york-philadelphia",
    "lat": 40.71,
    "lon": -74.01,
    "precision": "city area",
    "locationLabel": "New York Harbor, NY / NJ"
  },
  "LA-0585": {
    "regionId": "new-york-philadelphia",
    "lat": 39.95,
    "lon": -75.17,
    "precision": "city area",
    "locationLabel": "Philadelphia, PA"
  },
  "LA-0586": {
    "regionId": "dc-virginia",
    "lat": 38.91,
    "lon": -77.04,
    "precision": "city area",
    "locationLabel": "Washington, DC"
  },
  "LA-0587": {
    "regionId": "hawaii",
    "lat": 21.31,
    "lon": -157.86,
    "precision": "city area",
    "locationLabel": "Honolulu, HI"
  },
  "LA-0588": {
    "regionId": "yellowstone-tetons",
    "lat": 43.48,
    "lon": -110.76,
    "precision": "base area",
    "locationLabel": "Regional base: Jackson, Wyoming; catalog example: Crow Agency, MT"
  },
  "LA-0589": {
    "regionId": "sierra",
    "lat": 38.94,
    "lon": -119.98,
    "precision": "base area",
    "locationLabel": "Regional base: South Lake Tahoe, California; catalog example: Independence, CA"
  },
  "LA-0590": {
    "regionId": "dc-virginia",
    "lat": 38.03,
    "lon": -78.48,
    "precision": "city area",
    "locationLabel": "Charlottesville, VA"
  },
  "LA-0591": {
    "regionId": "new-york-philadelphia",
    "lat": 40.71,
    "lon": -74.01,
    "precision": "city area",
    "locationLabel": "New York, NY"
  },
  "LA-0592": {
    "regionId": "new-york-philadelphia",
    "lat": 39.83,
    "lon": -77.23,
    "precision": "city area",
    "locationLabel": "Gettysburg, PA"
  },
  "LA-0593": {
    "regionId": "dc-virginia",
    "lat": 37.27,
    "lon": -76.71,
    "precision": "city area",
    "locationLabel": "Williamsburg, VA"
  },
  "LA-0594": {
    "regionId": "new-york-philadelphia",
    "lat": 39.95,
    "lon": -75.17,
    "precision": "city area",
    "locationLabel": "Philadelphia, PA"
  },
  "LA-0595": {
    "regionId": "texas-cities",
    "lat": 29.42,
    "lon": -98.49,
    "precision": "city area",
    "locationLabel": "San Antonio, TX"
  },
  "LA-0596": {
    "regionId": "puerto-rico",
    "lat": 18.47,
    "lon": -66.11,
    "precision": "city area",
    "locationLabel": "San Juan, PR"
  },
  "LA-0597": {
    "regionId": "us-virgin-islands",
    "lat": 18.34,
    "lon": -64.75,
    "precision": "place area",
    "locationLabel": "St. John island area"
  },
  "LA-0598": {
    "regionId": "guam-saipan",
    "lat": 13.48,
    "lon": 144.75,
    "precision": "city area",
    "locationLabel": "Hagåtña / Piti, GU"
  },
  "LA-0599": {
    "regionId": "guam-saipan",
    "lat": 15.21,
    "lon": 145.75,
    "precision": "city area",
    "locationLabel": "Garapan, MP"
  },
  "LA-0600": {
    "regionId": "puerto-rico",
    "lat": 18.3,
    "lon": -65.79,
    "precision": "place area",
    "locationLabel": "El Yunque forest area"
  },
  "LA-0601": {
    "regionId": "guam-saipan",
    "lat": 13.48,
    "lon": 144.75,
    "precision": "city area",
    "locationLabel": "Hagåtña / South Guam, GU"
  },
  "LA-0602": {
    "regionId": "american-samoa",
    "lat": -14.28,
    "lon": -170.7,
    "precision": "base area",
    "locationLabel": "Regional base: Pago Pago, American Samoa; catalog example: Tutuila, Ofu & Taʻū, AS"
  },
  "LA-0603": {
    "regionId": "puerto-rico",
    "lat": 18.47,
    "lon": -66.11,
    "precision": "base area",
    "locationLabel": "Regional base: San Juan, Puerto Rico; catalog example: Adjuntas / Jayuya, PR"
  },
  "LA-0604": {
    "regionId": "us-virgin-islands",
    "lat": 17.75,
    "lon": -64.71,
    "precision": "city area",
    "locationLabel": "Christiansted, VI"
  },
  "LA-0605": {
    "regionId": "us-virgin-islands",
    "lat": 18.34,
    "lon": -64.75,
    "precision": "place area",
    "locationLabel": "St. John island area"
  },
  "LA-0606": {
    "regionId": "bay-area",
    "lat": 38.5,
    "lon": -123.0,
    "precision": "city area",
    "locationLabel": "Guerneville, CA"
  },
  "LA-0607": {
    "regionId": "great-lakes",
    "lat": 42.33,
    "lon": -83.05,
    "precision": "base area",
    "locationLabel": "Regional base: Detroit, Michigan; catalog example: Mackinac Island, MI"
  },
  "LA-0608": {
    "regionId": "san-diego",
    "lat": 32.68,
    "lon": -117.18,
    "precision": "city area",
    "locationLabel": "Coronado, CA"
  },
  "LA-0609": {
    "regionId": "central-coast",
    "lat": 36.27,
    "lon": -121.81,
    "precision": "city area",
    "locationLabel": "Big Sur, CA"
  },
  "LA-0610": {
    "regionId": "sierra",
    "lat": 37.75,
    "lon": -119.59,
    "precision": "place area",
    "locationLabel": "Yosemite Valley area"
  },
  "LA-0611": {
    "regionId": "great-lakes",
    "lat": 42.33,
    "lon": -83.05,
    "precision": "base area",
    "locationLabel": "Regional base: Detroit, Michigan; catalog example: Glenmont, OH"
  },
  "LA-0612": {
    "regionId": "glacier-montana",
    "lat": 48.2,
    "lon": -114.32,
    "precision": "base area",
    "locationLabel": "Regional base: Kalispell, Montana; catalog example: Greenough, MT"
  },
  "LA-0613": {
    "regionId": "boston-new-england",
    "lat": 42.36,
    "lon": -71.06,
    "precision": "base area",
    "locationLabel": "Regional base: Boston, Massachusetts; catalog example: Morris, CT"
  },
  "LA-0615": {
    "regionId": "appalachian-carolinas",
    "lat": 35.6,
    "lon": -82.55,
    "precision": "base area",
    "locationLabel": "Regional base: Asheville, North Carolina; catalog example: Elkmont, TN"
  },
  "LA-0616": {
    "regionId": "los-angeles",
    "lat": 34.05,
    "lon": -118.24,
    "precision": "base area",
    "locationLabel": "Regional base: Los Angeles, California; catalog example: Anza-Borrego Desert, CA"
  },
  "LA-0617": {
    "regionId": "central-florida",
    "lat": 28.61,
    "lon": -80.81,
    "precision": "city area",
    "locationLabel": "Titusville, FL"
  },
  "LA-0618": {
    "regionId": "central-coast",
    "lat": 36.62,
    "lon": -121.92,
    "precision": "city area",
    "locationLabel": "Pacific Grove, CA"
  },
  "LA-0619": {
    "regionId": "new-york-philadelphia",
    "lat": 40.71,
    "lon": -74.01,
    "precision": "city area",
    "locationLabel": "New York, NY"
  },
  "LA-0620": {
    "regionId": "boston-new-england",
    "lat": 42.36,
    "lon": -71.06,
    "precision": "city area",
    "locationLabel": "Boston, MA"
  },
  "LA-0621": {
    "regionId": "chicago",
    "lat": 41.88,
    "lon": -87.63,
    "precision": "city area",
    "locationLabel": "Chicago, IL"
  },
  "LA-0622": {
    "regionId": "texas-cities",
    "lat": 29.42,
    "lon": -98.49,
    "precision": "city area",
    "locationLabel": "San Antonio, TX"
  },
  "LA-0623": {
    "regionId": "san-diego",
    "lat": 32.72,
    "lon": -117.16,
    "precision": "city area",
    "locationLabel": "San Diego, CA"
  },
  "LA-0624": {
    "regionId": "atlanta-alabama",
    "lat": 33.75,
    "lon": -84.39,
    "precision": "city area",
    "locationLabel": "Atlanta, GA"
  },
  "LA-0625": {
    "regionId": "bay-area",
    "lat": 37.77,
    "lon": -122.42,
    "precision": "city area",
    "locationLabel": "San Francisco Bay Area, CA"
  },
  "LA-0626": {
    "regionId": "new-york-philadelphia",
    "lat": 40.71,
    "lon": -74.01,
    "precision": "city area",
    "locationLabel": "New York, NY"
  },
  "LA-0627": {
    "regionId": "hawaii",
    "lat": 20.71,
    "lon": -156.17,
    "precision": "place area",
    "locationLabel": "Haleakalā summit area"
  },
  "LA-0628": {
    "regionId": "yellowstone-tetons",
    "lat": 44.6,
    "lon": -110.5,
    "precision": "place area",
    "locationLabel": "Yellowstone park area"
  },
  "LA-0629": {
    "regionId": "salt-lake-idaho",
    "lat": 43.64,
    "lon": -113.3,
    "precision": "city area",
    "locationLabel": "Arco, ID"
  },
  "LA-0630": {
    "regionId": "hawaii",
    "lat": 19.43,
    "lon": -155.24,
    "precision": "city area",
    "locationLabel": "Volcano / Hawaiʻi Island area"
  },
  "LA-0631": {
    "regionId": "oregon",
    "lat": 42.94,
    "lon": -122.11,
    "precision": "place area",
    "locationLabel": "Crater Lake area"
  },
  "LA-0632": {
    "regionId": "hawaii",
    "lat": 20.71,
    "lon": -156.17,
    "precision": "place area",
    "locationLabel": "Haleakalā summit area"
  },
  "LA-0633": {
    "regionId": "northern-california",
    "lat": 40.49,
    "lon": -121.5,
    "precision": "place area",
    "locationLabel": "Lassen volcanic park area"
  },
  "LA-0634": {
    "regionId": "washington",
    "lat": 46.85,
    "lon": -121.76,
    "precision": "place area",
    "locationLabel": "Mount Rainier area"
  },
  "LA-0637": {
    "regionId": "new-york-philadelphia",
    "lat": 40.71,
    "lon": -74.01,
    "precision": "city area",
    "locationLabel": "New York City, NY"
  },
  "LA-0638": {
    "regionId": "bay-area",
    "lat": 37.77,
    "lon": -122.42,
    "precision": "city area",
    "locationLabel": "San Francisco Bay Area, CA"
  },
  "LA-0639": {
    "regionId": "central-coast",
    "lat": 36.6,
    "lon": -121.89,
    "precision": "city area",
    "locationLabel": "Monterey Bay, CA"
  },
  "LA-0640": {
    "regionId": "south-florida",
    "lat": 25.09,
    "lon": -80.45,
    "precision": "city area",
    "locationLabel": "Key Largo, FL"
  },
  "LA-0641": {
    "regionId": "bay-area",
    "lat": 37.77,
    "lon": -122.42,
    "precision": "city area",
    "locationLabel": "San Francisco, CA"
  },
  "LA-0642": {
    "regionId": "washington",
    "lat": 48.53,
    "lon": -123.02,
    "precision": "city area",
    "locationLabel": "Friday Harbor, WA"
  },
  "LA-0643": {
    "regionId": "maine-acadia",
    "lat": 44.21,
    "lon": -69.06,
    "precision": "city area",
    "locationLabel": "Camden, ME"
  },
  "LA-0644": {
    "regionId": "sierra",
    "lat": 38.94,
    "lon": -119.98,
    "precision": "city area",
    "locationLabel": "South Lake Tahoe, CA"
  },
  "LA-0645": {
    "regionId": "sierra",
    "lat": 37.75,
    "lon": -119.59,
    "precision": "place area",
    "locationLabel": "Yosemite Valley area"
  },
  "LA-0646": {
    "regionId": "great-lakes",
    "lat": 43.09,
    "lon": -79.04,
    "precision": "city area",
    "locationLabel": "Niagara Falls, NY"
  },
  "LA-0647": {
    "regionId": "northern-arizona",
    "lat": 35.2,
    "lon": -111.65,
    "precision": "base area",
    "locationLabel": "Regional base: Flagstaff, Arizona; catalog example: Supai, AZ"
  },
  "LA-0648": {
    "regionId": "appalachian-carolinas",
    "lat": 35.71,
    "lon": -83.51,
    "precision": "city area",
    "locationLabel": "Gatlinburg, TN"
  },
  "LA-0649": {
    "regionId": "central-coast",
    "lat": 36.27,
    "lon": -121.81,
    "precision": "city area",
    "locationLabel": "Big Sur, CA"
  },
  "LA-0650": {
    "regionId": "oregon",
    "lat": 45.52,
    "lon": -122.68,
    "precision": "base area",
    "locationLabel": "Regional base: Portland, Oregon; catalog example: Corbett, OR"
  },
  "LA-0651": {
    "regionId": "salt-lake-idaho",
    "lat": 42.56,
    "lon": -114.46,
    "precision": "city area",
    "locationLabel": "Twin Falls, ID"
  },
  "LA-0652": {
    "regionId": "washington",
    "lat": 47.53,
    "lon": -121.83,
    "precision": "city area",
    "locationLabel": "Snoqualmie, WA"
  },
  "LA-0653": {
    "regionId": "new-york-philadelphia",
    "lat": 40.71,
    "lon": -74.01,
    "precision": "base area",
    "locationLabel": "Regional base: New York City, New York; catalog example: Catskills, NY"
  },
  "LA-0654": {
    "regionId": "bay-area",
    "lat": 38.58,
    "lon": -122.58,
    "precision": "city area",
    "locationLabel": "Calistoga, CA"
  },
  "LA-0655": {
    "regionId": "washington",
    "lat": 47.61,
    "lon": -122.33,
    "precision": "base area",
    "locationLabel": "Regional base: Seattle, Washington; catalog example: Olympic Peninsula, WA"
  },
  "LA-0656": {
    "regionId": "san-diego",
    "lat": 33.04,
    "lon": -117.29,
    "precision": "city area",
    "locationLabel": "Encinitas, CA"
  },
  "LA-0657": {
    "regionId": "twin-cities",
    "lat": 46.79,
    "lon": -92.1,
    "precision": "city area",
    "locationLabel": "Duluth, MN"
  },
  "LA-0658": {
    "regionId": "hawaii",
    "lat": 20.88,
    "lon": -156.68,
    "precision": "city area",
    "locationLabel": "Lahaina, HI"
  },
  "LA-0659": {
    "regionId": "washington",
    "lat": 48.53,
    "lon": -123.02,
    "precision": "city area",
    "locationLabel": "Friday Harbor, WA"
  },
  "LA-0660": {
    "regionId": "boston-new-england",
    "lat": 42.36,
    "lon": -71.06,
    "precision": "base area",
    "locationLabel": "Regional base: Boston, Massachusetts; catalog example: Provincetown, MA"
  },
  "LA-0661": {
    "regionId": "los-angeles",
    "lat": 33.47,
    "lon": -117.7,
    "precision": "city area",
    "locationLabel": "Dana Point, CA"
  },
  "LA-0662": {
    "regionId": "oregon",
    "lat": 45.52,
    "lon": -122.68,
    "precision": "base area",
    "locationLabel": "Regional base: Portland, Oregon; catalog example: Depoe Bay, OR"
  },
  "LA-0663": {
    "regionId": "alaska",
    "lat": 60.1,
    "lon": -149.44,
    "precision": "city area",
    "locationLabel": "Seward gateway area; Kenai Fjords excursions have their own routes"
  },
  "LA-0664": {
    "regionId": "central-coast",
    "lat": 36.6,
    "lon": -121.89,
    "precision": "city area",
    "locationLabel": "Monterey, CA"
  },
  "LA-0665": {
    "regionId": "dc-virginia",
    "lat": 36.85,
    "lon": -75.98,
    "precision": "city area",
    "locationLabel": "Virginia Beach, VA"
  },
  "LA-0666": {
    "regionId": "northern-arizona",
    "lat": 35.2,
    "lon": -111.65,
    "precision": "city area",
    "locationLabel": "Flagstaff, AZ"
  },
  "LA-0667": {
    "regionId": "colorado",
    "lat": 38.84,
    "lon": -106.13,
    "precision": "city area",
    "locationLabel": "Buena Vista, CO"
  },
  "LA-0668": {
    "regionId": "salt-lake-idaho",
    "lat": 44.22,
    "lon": -114.94,
    "precision": "city area",
    "locationLabel": "Stanley, ID"
  },
  "LA-0669": {
    "regionId": "dc-virginia",
    "lat": 38.91,
    "lon": -77.04,
    "precision": "base area",
    "locationLabel": "Regional base: Washington, District of Columbia; catalog example: Fayetteville, WV"
  },
  "LA-0670": {
    "regionId": "oregon",
    "lat": 42.44,
    "lon": -123.33,
    "precision": "city area",
    "locationLabel": "Grants Pass, OR"
  },
  "LA-0671": {
    "regionId": "yellowstone-tetons",
    "lat": 43.48,
    "lon": -110.76,
    "precision": "city area",
    "locationLabel": "Jackson, WY"
  },
  "LA-0672": {
    "regionId": "sierra",
    "lat": 37.84,
    "lon": -120.23,
    "precision": "city area",
    "locationLabel": "Groveland, CA"
  },
  "LA-0673": {
    "regionId": "dc-virginia",
    "lat": 38.91,
    "lon": -77.04,
    "precision": "base area",
    "locationLabel": "Regional base: Washington, District of Columbia; catalog example: Summersville, WV"
  },
  "LA-0674": {
    "regionId": "alaska",
    "lat": 63.73,
    "lon": -148.89,
    "precision": "place area",
    "locationLabel": "Denali entrance area"
  },
  "LA-0675": {
    "regionId": "yellowstone-tetons",
    "lat": 44.6,
    "lon": -110.5,
    "precision": "place area",
    "locationLabel": "Yellowstone park area"
  },
  "LA-0676": {
    "regionId": "south-florida",
    "lat": 25.47,
    "lon": -80.48,
    "precision": "city area",
    "locationLabel": "Homestead, United States"
  },
  "LA-0677": {
    "regionId": "alaska",
    "lat": 63.73,
    "lon": -148.89,
    "precision": "place area",
    "locationLabel": "Denali entrance area"
  },
  "LA-0678": {
    "regionId": "south-florida",
    "lat": 25.47,
    "lon": -80.48,
    "precision": "city area",
    "locationLabel": "Homestead, FL"
  },
  "LA-0679": {
    "regionId": "yellowstone-tetons",
    "lat": 43.79,
    "lon": -110.68,
    "precision": "place area",
    "locationLabel": "Grand Teton area"
  },
  "LA-0680": {
    "regionId": "yellowstone-tetons",
    "lat": 44.6,
    "lon": -110.5,
    "precision": "place area",
    "locationLabel": "Yellowstone park area"
  },
  "LA-0681": {
    "regionId": "central-florida",
    "lat": 28.54,
    "lon": -81.38,
    "precision": "base area",
    "locationLabel": "Regional base: Orlando, Florida; catalog example: Orange City, FL"
  },
  "LA-0682": {
    "regionId": "alaska",
    "lat": 58.69,
    "lon": -156.66,
    "precision": "city area",
    "locationLabel": "King Salmon, AK"
  },
  "LA-0683": {
    "regionId": "bay-area",
    "lat": 38.07,
    "lon": -122.81,
    "precision": "city area",
    "locationLabel": "Point Reyes Station, CA"
  },
  "LA-0684": {
    "regionId": "new-mexico",
    "lat": 34.06,
    "lon": -106.89,
    "precision": "city area",
    "locationLabel": "Socorro, NM"
  },
  "LA-0685": {
    "regionId": "bay-area",
    "lat": 38.3,
    "lon": -122.29,
    "precision": "city area",
    "locationLabel": "Napa area; catalog example: CA"
  },
  "LA-0686": {
    "regionId": "bay-area",
    "lat": 38.3,
    "lon": -122.29,
    "precision": "city area",
    "locationLabel": "Napa, CA"
  },
  "LA-0687": {
    "regionId": "dc-virginia",
    "lat": 38.03,
    "lon": -78.48,
    "precision": "city area",
    "locationLabel": "Charlottesville, VA"
  },
  "LA-0688": {
    "regionId": "great-lakes",
    "lat": 42.38,
    "lon": -76.87,
    "precision": "city area",
    "locationLabel": "Watkins Glen, NY"
  },
  "LA-0689": {
    "regionId": "central-coast",
    "lat": 35.63,
    "lon": -120.69,
    "precision": "city area",
    "locationLabel": "Paso Robles, CA"
  },
  "LA-0690": {
    "regionId": "bay-area",
    "lat": 38.61,
    "lon": -122.87,
    "precision": "city area",
    "locationLabel": "Healdsburg, CA"
  },
  "LA-0691": {
    "regionId": "texas-cities",
    "lat": 30.28,
    "lon": -98.87,
    "precision": "city area",
    "locationLabel": "Fredericksburg, TX"
  },
  "LA-0692": {
    "regionId": "washington",
    "lat": 46.06,
    "lon": -118.34,
    "precision": "city area",
    "locationLabel": "Walla Walla, WA"
  },
  "LA-0693": {
    "regionId": "oregon",
    "lat": 45.21,
    "lon": -123.2,
    "precision": "city area",
    "locationLabel": "McMinnville, OR"
  },
  "LA-0694": {
    "regionId": "san-diego",
    "lat": 32.72,
    "lon": -117.16,
    "precision": "city area",
    "locationLabel": "San Diego, CA"
  },
  "LA-0695": {
    "regionId": "dc-virginia",
    "lat": 38.91,
    "lon": -77.04,
    "precision": "city area",
    "locationLabel": "Washington, DC"
  },
  "LA-0696": {
    "regionId": "new-york-philadelphia",
    "lat": 40.85,
    "lon": -73.86,
    "precision": "city area",
    "locationLabel": "Bronx, NY"
  },
  "LA-0697": {
    "regionId": "atlanta-alabama",
    "lat": 33.75,
    "lon": -84.39,
    "precision": "city area",
    "locationLabel": "Atlanta, GA"
  },
  "LA-0698": {
    "regionId": "central-coast",
    "lat": 36.6,
    "lon": -121.89,
    "precision": "city area",
    "locationLabel": "Monterey, CA"
  },
  "LA-0699": {
    "regionId": "omaha-plains",
    "lat": 41.26,
    "lon": -95.94,
    "precision": "city area",
    "locationLabel": "Omaha, NE"
  },
  "LA-0700": {
    "regionId": "st-louis-ozarks",
    "lat": 38.63,
    "lon": -90.2,
    "precision": "city area",
    "locationLabel": "St. Louis, MO"
  },
  "LA-0701": {
    "regionId": "chicago",
    "lat": 41.88,
    "lon": -87.63,
    "precision": "city area",
    "locationLabel": "Chicago, IL"
  },
  "LA-0743": {
    "regionId": "puerto-rico",
    "lat": 18.3,
    "lon": -65.79,
    "precision": "place area",
    "locationLabel": "El Yunque forest area"
  },
  "LA-1050": {
    "regionId": "central-coast",
    "lat": 36.6,
    "lon": -121.89,
    "precision": "base area",
    "locationLabel": "Regional base: Monterey, California; catalog example: California"
  },
  "LA-1621": {
    "regionId": "hawaii",
    "lat": 21.31,
    "lon": -157.86,
    "precision": "base area",
    "locationLabel": "Regional base: Honolulu, Oʻahu, Hawaiʻi; catalog example: Hawaiʻi"
  }
};

window.LIFE_TRIP_UNMAPPED_IDS = [
  "LA-0002",
  "LA-0013",
  "LA-0016",
  "LA-0017",
  "LA-0018",
  "LA-0019",
  "LA-0020",
  "LA-0021",
  "LA-0022",
  "LA-0023",
  "LA-0024",
  "LA-0025",
  "LA-0026",
  "LA-0027",
  "LA-0028",
  "LA-0029",
  "LA-0030",
  "LA-0031",
  "LA-0032",
  "LA-0034",
  "LA-0035",
  "LA-0144",
  "LA-0386",
  "LA-0420",
  "LA-0435",
  "LA-0441",
  "LA-0442",
  "LA-0447",
  "LA-0452",
  "LA-0458",
  "LA-0466",
  "LA-0467",
  "LA-0468",
  "LA-0469",
  "LA-0514",
  "LA-0614",
  "LA-0635",
  "LA-0636"
];
