/* Geographic corrections for the 101 goals used by the Bay Area trip options.
 * Hand-curated approximate city/place-area context from named catalog locations
 * and the selected trip-outline bases. These are not venue entrances, trailheads,
 * boat pickups, live geocodes, or computed road-route waypoints.
 * The original regionId is preserved. Merge this lookup AFTER the base
 * LIFE_TRIP_ITEM_LOCATIONS lookup; unrelated catalog records remain unchanged.
 * Linear and multi-place goals use one explicitly named context or endpoint;
 * their labels describe the limitation rather than implying one exact point.
 */
window.LIFE_LOCATION_CORRECTIONS = {
  "LA-0056": {
    "lat": 34.07,
    "lon": -118.47,
    "precision": "city area",
    "locationLabel": "Brentwood / western Los Angeles area; Getty access requires its own route",
    "regionId": "los-angeles"
  },
  "LA-0091": {
    "lat": 32.85,
    "lon": -117.26,
    "precision": "city area",
    "locationLabel": "La Jolla coast area; Torrey Pines is a separate northern outing",
    "regionId": "san-diego"
  },
  "LA-0111": {
    "lat": 36.8,
    "lon": -118.65,
    "precision": "place area",
    "locationLabel": "Kings Canyon / Cedar Grove area; park access roads determine the route",
    "regionId": "sierra"
  },
  "LA-0121": {
    "lat": 43.6,
    "lon": -103.48,
    "precision": "place area",
    "locationLabel": "Wind Cave National Park area near Hot Springs, South Dakota",
    "regionId": "black-hills"
  },
  "LA-0280": {
    "lat": 35.8,
    "lon": -106.28,
    "precision": "place area",
    "locationLabel": "Bandelier / Frijoles Canyon area; visitor routes and entrances vary",
    "regionId": "new-mexico"
  },
  "LA-0306": {
    "lat": 44.14,
    "lon": -124.12,
    "precision": "place area",
    "locationLabel": "Heceta Head coastal area north of Florence, Oregon",
    "regionId": "oregon"
  },
  "LA-0320": {
    "lat": 42.46,
    "lon": -71.35,
    "precision": "city area",
    "locationLabel": "Concord, Massachusetts; Walden Pond has its own local access route",
    "regionId": "boston-new-england"
  },
  "LA-0332": {
    "lat": 24.56,
    "lon": -81.78,
    "precision": "city area",
    "locationLabel": "Key West — one Lower Keys context; Islamorada is a separate option",
    "regionId": "south-florida"
  },
  "LA-0360": {
    "lat": 44.47,
    "lon": -72.69,
    "precision": "city area",
    "locationLabel": "Stowe, Vermont — one autumn-town context; Vermont/New Hampshire span multiple areas",
    "regionId": "boston-new-england"
  },
  "LA-0382": {
    "lat": 39.65,
    "lon": -105.19,
    "precision": "city area",
    "locationLabel": "Morrison, Colorado; Red Rocks has its own venue access route",
    "regionId": "colorado"
  },
  "LA-0413": {
    "lat": 38.3,
    "lon": -111.42,
    "precision": "city area",
    "locationLabel": "Torrey gateway for Capitol Reef; park routes extend east of town",
    "regionId": "zion-bryce"
  },
  "LA-0419": {
    "lat": 36.44,
    "lon": -118.9,
    "precision": "city area",
    "locationLabel": "Three Rivers gateway; Sequoia/Kings Canyon require separate park access",
    "regionId": "sierra"
  },
  "LA-0433": {
    "lat": 45.67,
    "lon": -121.89,
    "precision": "city area",
    "locationLabel": "Cascade Locks — one Columbia River Gorge context; waterfalls span a wider corridor",
    "regionId": "oregon"
  },
  "LA-0434": {
    "lat": 47.71,
    "lon": -124.4,
    "precision": "place area",
    "locationLabel": "Ruby Beach coastal area; beach access and tides need their own checks",
    "regionId": "washington"
  },
  "LA-0446": {
    "lat": 47.85,
    "lon": -123.94,
    "precision": "place area",
    "locationLabel": "Hoh rainforest area; trail choice and access determine the outing",
    "regionId": "washington"
  },
  "LA-0463": {
    "lat": 38.3,
    "lon": -111.42,
    "precision": "city area",
    "locationLabel": "Torrey endpoint context; Scenic Byway 12 is a Bryce–Torrey corridor, not one stop",
    "regionId": "zion-bryce"
  },
  "LA-0465": {
    "lat": 60.1,
    "lon": -149.44,
    "precision": "city area",
    "locationLabel": "Seward endpoint for the Anchorage–Seward Coastal Classic; the train route spans both cities",
    "regionId": "alaska"
  },
  "LA-0490": {
    "lat": 44.47,
    "lon": -72.69,
    "precision": "city area",
    "locationLabel": "Stowe, Vermont — one foliage context; Vermont/New Hampshire cover multiple areas",
    "regionId": "boston-new-england"
  },
  "LA-0555": {
    "lat": 36.0,
    "lon": -105.93,
    "precision": "city area",
    "locationLabel": "Chimayó, New Mexico; sanctuary access has its own local route",
    "regionId": "new-mexico"
  },
  "LA-0589": {
    "lat": 36.73,
    "lon": -118.15,
    "precision": "place area",
    "locationLabel": "Manzanar historic site area in Owens Valley, south of Independence",
    "regionId": "sierra"
  },
  "LA-0175": {
    "lat": 34.14,
    "lon": -116.05,
    "precision": "city area",
    "locationLabel": "Twentynine Palms gateway for Joshua Tree; park sectors require a separate drive",
    "regionId": "los-angeles"
  }
};
