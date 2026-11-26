/* Destination-led discovery data: editorial starting values, not universal or
 * exhaustive rankings. Existing hub/family IDs retain personal-rating compatibility.
 * Map coordinates identify one approximate city/place/base context per hub;
 * multi-base choices and routing notes prevent treating a marker as an exact venue,
 * airport, computed road route, or promise of five-/nine-day coverage.
 * Existing location indexes supply coordinates except the rounded Twentynine Palms
 * gateway correction of a misleading Los Angeles fallback. No user progress is changed.
 */
window.LIFE_DISCOVERY_PRIORITIES = {
  "version": 1,
  "method": {
    "label": "Editorial discovery starting points",
    "scoreBasis": "Unrated editorial priority points are subjective starting values. A personal nonzero rating replaces the baseline with rating × 20. New exposure and familiar-city context are explicit modifiers only when unrated.",
    "familyPolicy": "Conservative first-activity equivalents and aliases for the same named place. Different parks, landmarks, cultures, and named route goals remain separate. Mixed alternative records do not prove a specific skill was completed.",
    "localPolicy": "Local-first prefers actual local/Anywhere goal examples or clearly labeled instructor research. A search is not a verified venue or booking.",
    "bundlePolicy": "Starter bundles contain at most one representative per canonical family, preserve independent item status, and defer generic skills to local options unless an intentional repeat or personal interest overrides."
  },
  "families": [
    {
      "id": "beginner-surf",
      "title": "Learn to surf on a suitable beginner beach",
      "kind": "activity",
      "classification": "while-there",
      "reason": "One beginner-learning goal with alternative settings. Watching advanced surf breaks is a separate place experience.",
      "itemIds": [
        "LA-0001",
        "LA-1055"
      ],
      "preferredItemIds": [
        "LA-0001"
      ],
      "variants": [
        {
          "itemId": "LA-0001",
          "role": "Instructor-led beginner lesson in San Diego",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": true
        },
        {
          "itemId": "LA-1055",
          "role": "Beginner-beach learning example in Portugal or Hawaiʻi; choose the actual site/provider",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": true
        }
      ],
      "localOption": {
        "itemId": null,
        "label": "Find an instructor-led beginner surf lesson at a suitable Bay Area beginner beach",
        "kind": "instructor-search",
        "searchUrl": "https://www.google.com/maps/search/?api=1&query=Find%20an%20instructor-led%20beginner%20surf%20lesson%20at%20a%20suitable%20Bay%20Area%20beginner%20beach%20San%20Francisco%20South%20Bay",
        "verification": "Local example or instructor search; a specific provider, date, and suitability still need checking."
      },
      "relatedLandmarkIds": [
        "LA-0571",
        "LA-0575",
        "LA-0576",
        "LA-0577"
      ]
    },
    {
      "id": "tandem-skydiving",
      "title": "Try one operator-assessed tandem skydive",
      "kind": "activity",
      "classification": "while-there",
      "reason": "Choose one licensed introductory tandem setting; another drop zone is an intentional repeat.",
      "itemIds": [
        "LA-0500",
        "LA-0501",
        "LA-0502",
        "LA-0503",
        "LA-0504",
        "LA-0505",
        "LA-0506",
        "LA-0507",
        "LA-1094"
      ],
      "preferredItemIds": [
        "LA-0507"
      ],
      "variants": [
        {
          "itemId": "LA-0500",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": true
        },
        {
          "itemId": "LA-0501",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": true
        },
        {
          "itemId": "LA-0502",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": true
        },
        {
          "itemId": "LA-0503",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": true
        },
        {
          "itemId": "LA-0504",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": true
        },
        {
          "itemId": "LA-0505",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": true
        },
        {
          "itemId": "LA-0506",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": true
        },
        {
          "itemId": "LA-0507",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": true
        },
        {
          "itemId": "LA-1094",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": true
        }
      ],
      "localOption": {
        "itemId": "LA-0507",
        "label": "Bay Area tandem skydiving example; confirm the operator and suitability",
        "kind": "catalog-example",
        "searchUrl": "https://www.google.com/maps/search/?api=1&query=Bay%20Area%20tandem%20skydiving%20example%3B%20confirm%20the%20operator%20and%20suitability%20San%20Francisco%20South%20Bay",
        "verification": "Local example or instructor search; a specific provider, date, and suitability still need checking."
      },
      "relatedLandmarkIds": []
    },
    {
      "id": "glider-introduction",
      "title": "Take an introductory glider flight",
      "kind": "activity",
      "classification": "while-there",
      "reason": "An introductory instructor-led glider experience can start near home.",
      "itemIds": [
        "LA-0009",
        "LA-1093"
      ],
      "preferredItemIds": [
        "LA-1093"
      ],
      "variants": [
        {
          "itemId": "LA-0009",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": true
        },
        {
          "itemId": "LA-1093",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": true
        }
      ],
      "localOption": {
        "itemId": "LA-1093",
        "label": "Find a licensed introductory glider flight near the Bay Area",
        "kind": "catalog-example",
        "searchUrl": "https://www.google.com/maps/search/?api=1&query=Find%20a%20licensed%20introductory%20glider%20flight%20near%20the%20Bay%20Area%20San%20Francisco%20South%20Bay",
        "verification": "Local example or instructor search; a specific provider, date, and suitability still need checking."
      },
      "relatedLandmarkIds": []
    },
    {
      "id": "first-flight-lesson",
      "title": "Try introductory flight controls with instruction",
      "kind": "activity",
      "classification": "while-there",
      "reason": "A simulator is not proof of completing an actual flight lesson; mixed entries do not automatically cover the family.",
      "itemIds": [
        "LA-0010",
        "LA-1092"
      ],
      "preferredItemIds": [
        "LA-1092"
      ],
      "variants": [
        {
          "itemId": "LA-0010",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": false
        },
        {
          "itemId": "LA-1092",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": true
        }
      ],
      "localOption": {
        "itemId": "LA-1092",
        "label": "Find a certified introductory flight lesson near home",
        "kind": "catalog-example",
        "searchUrl": "https://www.google.com/maps/search/?api=1&query=Find%20a%20certified%20introductory%20flight%20lesson%20near%20home%20San%20Francisco%20South%20Bay",
        "verification": "Local example or instructor search; a specific provider, date, and suitability still need checking."
      },
      "relatedLandmarkIds": []
    },
    {
      "id": "first-balloon-flight",
      "title": "Take one licensed balloon flight",
      "kind": "activity",
      "classification": "while-there",
      "reason": "A first balloon outing can use one suitable operator; destination-specific scenery remains an optional repeat.",
      "itemIds": [
        "LA-0007",
        "LA-1091"
      ],
      "preferredItemIds": [
        "LA-1091"
      ],
      "variants": [
        {
          "itemId": "LA-0007",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": true
        },
        {
          "itemId": "LA-1091",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": true
        }
      ],
      "localOption": {
        "itemId": "LA-1091",
        "label": "Research a licensed Bay Area or nearby balloon-flight introduction",
        "kind": "catalog-example",
        "searchUrl": "https://www.google.com/maps/search/?api=1&query=Research%20a%20licensed%20Bay%20Area%20or%20nearby%20balloon-flight%20introduction%20San%20Francisco%20South%20Bay",
        "verification": "Local example or instructor search; a specific provider, date, and suitability still need checking."
      },
      "relatedLandmarkIds": []
    },
    {
      "id": "first-sailing-lesson",
      "title": "Learn basic sailing with an instructor",
      "kind": "activity",
      "classification": "while-there",
      "reason": "First sailing skills do not require a separate trip to another bay.",
      "itemIds": [
        "LA-0641",
        "LA-1205"
      ],
      "preferredItemIds": [
        "LA-0641"
      ],
      "variants": [
        {
          "itemId": "LA-0641",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": true
        },
        {
          "itemId": "LA-1205",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": true
        }
      ],
      "localOption": {
        "itemId": "LA-0641",
        "label": "San Francisco Bay sailing introduction; find appropriate instruction",
        "kind": "catalog-example",
        "searchUrl": "https://www.google.com/maps/search/?api=1&query=San%20Francisco%20Bay%20sailing%20introduction%3B%20find%20appropriate%20instruction%20San%20Francisco%20South%20Bay",
        "verification": "Local example or instructor search; a specific provider, date, and suitability still need checking."
      },
      "relatedLandmarkIds": []
    },
    {
      "id": "beginner-rowing",
      "title": "Try an introductory rowing session",
      "kind": "activity",
      "classification": "while-there",
      "reason": "Choose one beginner club session with sheltered conditions and instruction.",
      "itemIds": [
        "LA-1062",
        "LA-1737"
      ],
      "preferredItemIds": [
        "LA-1737"
      ],
      "variants": [
        {
          "itemId": "LA-1062",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": true
        },
        {
          "itemId": "LA-1737",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": true
        }
      ],
      "localOption": {
        "itemId": "LA-1737",
        "label": "Research a beginner rowing-club session near home",
        "kind": "catalog-example",
        "searchUrl": "https://www.google.com/maps/search/?api=1&query=Research%20a%20beginner%20rowing-club%20session%20near%20home%20San%20Francisco%20South%20Bay",
        "verification": "Local example or instructor search; a specific provider, date, and suitability still need checking."
      },
      "relatedLandmarkIds": []
    },
    {
      "id": "first-climbing-session",
      "title": "Try a suitable beginner climbing session",
      "kind": "activity",
      "classification": "while-there",
      "reason": "A first climbing session can be local; a specific outdoor area remains an intentional location choice.",
      "itemIds": [
        "LA-0004",
        "LA-1318"
      ],
      "preferredItemIds": [
        "LA-1318"
      ],
      "variants": [
        {
          "itemId": "LA-0004",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": true
        },
        {
          "itemId": "LA-1318",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": true
        }
      ],
      "localOption": {
        "itemId": "LA-1318",
        "label": "Find an instructor-led indoor climbing introduction near home",
        "kind": "catalog-example",
        "searchUrl": "https://www.google.com/maps/search/?api=1&query=Find%20an%20instructor-led%20indoor%20climbing%20introduction%20near%20home%20San%20Francisco%20South%20Bay",
        "verification": "Local example or instructor search; a specific provider, date, and suitability still need checking."
      },
      "relatedLandmarkIds": []
    },
    {
      "id": "beginner-orienteering",
      "title": "Try one beginner orienteering course",
      "kind": "activity",
      "classification": "while-there",
      "reason": "A beginner club course can build the same introductory skill locally.",
      "itemIds": [
        "LA-0939",
        "LA-1741"
      ],
      "preferredItemIds": [
        "LA-1741"
      ],
      "variants": [
        {
          "itemId": "LA-0939",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": true
        },
        {
          "itemId": "LA-1741",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": true
        }
      ],
      "localOption": {
        "itemId": "LA-1741",
        "label": "Find a local club beginner orienteering course",
        "kind": "catalog-example",
        "searchUrl": "https://www.google.com/maps/search/?api=1&query=Find%20a%20local%20club%20beginner%20orienteering%20course%20San%20Francisco%20South%20Bay",
        "verification": "Local example or instructor search; a specific provider, date, and suitability still need checking."
      },
      "relatedLandmarkIds": []
    },
    {
      "id": "first-community-race",
      "title": "Choose and complete one appropriate community race",
      "kind": "activity",
      "classification": "while-there",
      "reason": "A first community race does not imply a half-marathon or competence at a longer distance.",
      "itemIds": [
        "LA-0002",
        "LA-1315"
      ],
      "preferredItemIds": [
        "LA-1315"
      ],
      "variants": [
        {
          "itemId": "LA-0002",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": true
        },
        {
          "itemId": "LA-1315",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": true
        }
      ],
      "localOption": {
        "itemId": "LA-1315",
        "label": "Choose a local community race at a suitable distance",
        "kind": "catalog-example",
        "searchUrl": "https://www.google.com/maps/search/?api=1&query=Choose%20a%20local%20community%20race%20at%20a%20suitable%20distance%20San%20Francisco%20South%20Bay",
        "verification": "Local example or instructor search; a specific provider, date, and suitability still need checking."
      },
      "relatedLandmarkIds": []
    },
    {
      "id": "first-ceramic-vessel",
      "title": "Make a first handmade ceramic vessel",
      "kind": "activity",
      "classification": "while-there",
      "reason": "Bowl and mug introductions are alternatives for first vessel-making. An unspecified workshop is not proof of a finished vessel.",
      "itemIds": [
        "LA-0237",
        "LA-1169",
        "LA-1334"
      ],
      "preferredItemIds": [
        "LA-1169"
      ],
      "variants": [
        {
          "itemId": "LA-0237",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": false
        },
        {
          "itemId": "LA-1169",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": true
        },
        {
          "itemId": "LA-1334",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": true
        }
      ],
      "localOption": {
        "itemId": "LA-1169",
        "label": "Find a beginner ceramic-vessel class near home",
        "kind": "catalog-example",
        "searchUrl": "https://www.google.com/maps/search/?api=1&query=Find%20a%20beginner%20ceramic-vessel%20class%20near%20home%20San%20Francisco%20South%20Bay",
        "verification": "Local example or instructor search; a specific provider, date, and suitability still need checking."
      },
      "relatedLandmarkIds": []
    },
    {
      "id": "introductory-glassmaking",
      "title": "Try a beginner hands-on glassmaking class",
      "kind": "activity",
      "classification": "while-there",
      "reason": "These introductory workshop settings can be researched locally first; cold stained-glass assembly is a separate skill.",
      "itemIds": [
        "LA-0236",
        "LA-0240"
      ],
      "preferredItemIds": [
        "LA-0236"
      ],
      "variants": [
        {
          "itemId": "LA-0236",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": true
        },
        {
          "itemId": "LA-0240",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": true
        }
      ],
      "localOption": {
        "itemId": null,
        "label": "Research a beginner glassmaking class near the Bay Area",
        "kind": "instructor-search",
        "searchUrl": "https://www.google.com/maps/search/?api=1&query=Research%20a%20beginner%20glassmaking%20class%20near%20the%20Bay%20Area%20San%20Francisco%20South%20Bay",
        "verification": "Local example or instructor search; a specific provider, date, and suitability still need checking."
      },
      "relatedLandmarkIds": []
    },
    {
      "id": "beginner-wood-project",
      "title": "Complete a first beginner wood project",
      "kind": "activity",
      "classification": "while-there",
      "reason": "One instructed beginner project can introduce tool use; different advanced projects remain separate goals.",
      "itemIds": [
        "LA-1168",
        "LA-1337"
      ],
      "preferredItemIds": [
        "LA-1168"
      ],
      "variants": [
        {
          "itemId": "LA-1168",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": true
        },
        {
          "itemId": "LA-1337",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": true
        }
      ],
      "localOption": {
        "itemId": "LA-1168",
        "label": "Research an instructed beginner woodworking project locally",
        "kind": "catalog-example",
        "searchUrl": "https://www.google.com/maps/search/?api=1&query=Research%20an%20instructed%20beginner%20woodworking%20project%20locally%20San%20Francisco%20South%20Bay",
        "verification": "Local example or instructor search; a specific provider, date, and suitability still need checking."
      },
      "relatedLandmarkIds": []
    },
    {
      "id": "basic-clothing-repair",
      "title": "Learn basic clothing repairs or alterations",
      "kind": "activity",
      "classification": "while-there",
      "reason": "Basic repairs/alterations can start at home or a local class; a new sewn object is still its own goal.",
      "itemIds": [
        "LA-1170",
        "LA-1288"
      ],
      "preferredItemIds": [
        "LA-1288"
      ],
      "variants": [
        {
          "itemId": "LA-1170",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": true
        },
        {
          "itemId": "LA-1288",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": true
        }
      ],
      "localOption": {
        "itemId": "LA-1288",
        "label": "Learn basic clothing repair or alteration locally",
        "kind": "catalog-example",
        "searchUrl": "https://www.google.com/maps/search/?api=1&query=Learn%20basic%20clothing%20repair%20or%20alteration%20locally%20San%20Francisco%20South%20Bay",
        "verification": "Local example or instructor search; a specific provider, date, and suitability still need checking."
      },
      "relatedLandmarkIds": []
    },
    {
      "id": "first-handbound-journal",
      "title": "Try bookbinding through a first journal",
      "kind": "activity",
      "classification": "while-there",
      "reason": "Binding a first journal is one entry point; an ambiguous handmade-paper project does not prove binding was done.",
      "itemIds": [
        "LA-1335",
        "LA-1341"
      ],
      "preferredItemIds": [
        "LA-1341"
      ],
      "variants": [
        {
          "itemId": "LA-1335",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": false
        },
        {
          "itemId": "LA-1341",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": true
        }
      ],
      "localOption": {
        "itemId": "LA-1341",
        "label": "Research a beginner bookbinding or journal-making class locally",
        "kind": "catalog-example",
        "searchUrl": "https://www.google.com/maps/search/?api=1&query=Research%20a%20beginner%20bookbinding%20or%20journal-making%20class%20locally%20San%20Francisco%20South%20Bay",
        "verification": "Local example or instructor search; a specific provider, date, and suitability still need checking."
      },
      "relatedLandmarkIds": []
    },
    {
      "id": "short-public-talk",
      "title": "Prepare and give a short useful talk",
      "kind": "activity",
      "classification": "while-there",
      "reason": "A private rehearsal is not the same as giving the talk; keep mixed/practice credit conservative.",
      "itemIds": [
        "LA-1108",
        "LA-1301"
      ],
      "preferredItemIds": [
        "LA-1301"
      ],
      "variants": [
        {
          "itemId": "LA-1108",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": true
        },
        {
          "itemId": "LA-1301",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": false
        }
      ],
      "localOption": {
        "itemId": "LA-1301",
        "label": "Prepare a short talk and find a suitable local speaking setting",
        "kind": "catalog-example",
        "searchUrl": "https://www.google.com/maps/search/?api=1&query=Prepare%20a%20short%20talk%20and%20find%20a%20suitable%20local%20speaking%20setting%20San%20Francisco%20South%20Bay",
        "verification": "Local example or instructor search; a specific provider, date, and suitability still need checking."
      },
      "relatedLandmarkIds": []
    },
    {
      "id": "public-lecture-discovery",
      "title": "Attend a public lecture outside your usual field",
      "kind": "activity",
      "classification": "while-there",
      "reason": "A public university/community lecture can be a local discovery rather than a reason for a separate trip.",
      "itemIds": [
        "LA-0021",
        "LA-1208"
      ],
      "preferredItemIds": [
        "LA-1208"
      ],
      "variants": [
        {
          "itemId": "LA-0021",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": true
        },
        {
          "itemId": "LA-1208",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": true
        }
      ],
      "localOption": {
        "itemId": "LA-1208",
        "label": "Research a local public lecture outside your field",
        "kind": "catalog-example",
        "searchUrl": "https://www.google.com/maps/search/?api=1&query=Research%20a%20local%20public%20lecture%20outside%20your%20field%20San%20Francisco%20South%20Bay",
        "verification": "Local example or instructor search; a specific provider, date, and suitability still need checking."
      },
      "relatedLandmarkIds": []
    },
    {
      "id": "first-instrument-song",
      "title": "Learn one complete song on an instrument",
      "kind": "activity",
      "classification": "while-there",
      "reason": "Choose an instrument for this introductory goal; another instrument can be deliberately added as a repeat.",
      "itemIds": [
        "LA-1096",
        "LA-1185",
        "LA-1186"
      ],
      "preferredItemIds": [
        "LA-1096"
      ],
      "variants": [
        {
          "itemId": "LA-1096",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": true
        },
        {
          "itemId": "LA-1185",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": true
        },
        {
          "itemId": "LA-1186",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": true
        }
      ],
      "localOption": {
        "itemId": "LA-1096",
        "label": "Learn one song at home or with a local music teacher",
        "kind": "catalog-example",
        "searchUrl": "https://www.google.com/maps/search/?api=1&query=Learn%20one%20song%20at%20home%20or%20with%20a%20local%20music%20teacher%20San%20Francisco%20South%20Bay",
        "verification": "Local example or instructor search; a specific provider, date, and suitability still need checking."
      },
      "relatedLandmarkIds": []
    },
    {
      "id": "social-swing-introduction",
      "title": "Try a beginner-friendly swing dance evening",
      "kind": "activity",
      "classification": "while-there",
      "reason": "A first social swing experience can be local; other dance traditions are not treated as the same skill.",
      "itemIds": [
        "LA-0323",
        "LA-1194"
      ],
      "preferredItemIds": [
        "LA-1194"
      ],
      "variants": [
        {
          "itemId": "LA-0323",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": true
        },
        {
          "itemId": "LA-1194",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": true
        }
      ],
      "localOption": {
        "itemId": "LA-1194",
        "label": "Research a beginner-friendly local swing dance session",
        "kind": "catalog-example",
        "searchUrl": "https://www.google.com/maps/search/?api=1&query=Research%20a%20beginner-friendly%20local%20swing%20dance%20session%20San%20Francisco%20South%20Bay",
        "verification": "Local example or instructor search; a specific provider, date, and suitability still need checking."
      },
      "relatedLandmarkIds": []
    },
    {
      "id": "finish-short-story",
      "title": "Finish one original short story",
      "kind": "activity",
      "classification": "while-there",
      "reason": "A first completed story can be written at home; a bookstore-town setting is optional.",
      "itemIds": [
        "LA-0456",
        "LA-1351"
      ],
      "preferredItemIds": [
        "LA-1351"
      ],
      "variants": [
        {
          "itemId": "LA-0456",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": true
        },
        {
          "itemId": "LA-1351",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": true
        }
      ],
      "localOption": {
        "itemId": "LA-1351",
        "label": "Finish a short story in a quiet local writing space",
        "kind": "catalog-example",
        "searchUrl": "https://www.google.com/maps/search/?api=1&query=Finish%20a%20short%20story%20in%20a%20quiet%20local%20writing%20space%20San%20Francisco%20South%20Bay",
        "verification": "Local example or instructor search; a specific provider, date, and suitability still need checking."
      },
      "relatedLandmarkIds": []
    },
    {
      "id": "elder-life-stories",
      "title": "Listen to an elder’s life stories with consent",
      "kind": "activity",
      "classification": "while-there",
      "reason": "An initial life-story conversation can be local or with family; this never assumes a particular relative is available.",
      "itemIds": [
        "LA-1132",
        "LA-1349"
      ],
      "preferredItemIds": [
        "LA-1349"
      ],
      "variants": [
        {
          "itemId": "LA-1132",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": true
        },
        {
          "itemId": "LA-1349",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": true
        }
      ],
      "localOption": {
        "itemId": "LA-1349",
        "label": "Arrange an optional, consent-based life-story conversation",
        "kind": "catalog-example",
        "searchUrl": "https://www.google.com/maps/search/?api=1&query=Arrange%20an%20optional%2C%20consent-based%20life-story%20conversation%20San%20Francisco%20South%20Bay",
        "verification": "Local example or instructor search; a specific provider, date, and suitability still need checking."
      },
      "relatedLandmarkIds": []
    },
    {
      "id": "quiet-service-day",
      "title": "Do a day of service without making it public",
      "kind": "activity",
      "classification": "while-there",
      "reason": "These entries describe the same private service intention; a cause-specific service project remains distinct.",
      "itemIds": [
        "LA-1211",
        "LA-1309"
      ],
      "preferredItemIds": [
        "LA-1211"
      ],
      "variants": [
        {
          "itemId": "LA-1211",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": true
        },
        {
          "itemId": "LA-1309",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": true
        }
      ],
      "localOption": {
        "itemId": "LA-1211",
        "label": "Find an appropriate local service opportunity",
        "kind": "catalog-example",
        "searchUrl": "https://www.google.com/maps/search/?api=1&query=Find%20an%20appropriate%20local%20service%20opportunity%20San%20Francisco%20South%20Bay",
        "verification": "Local example or instructor search; a specific provider, date, and suitability still need checking."
      },
      "relatedLandmarkIds": []
    },
    {
      "id": "community-meal",
      "title": "Join a welcoming community meal",
      "kind": "activity",
      "classification": "while-there",
      "reason": "Participation in a community meal can begin nearby; hosting a dinner is a separate action.",
      "itemIds": [
        "LA-1142",
        "LA-1249"
      ],
      "preferredItemIds": [
        "LA-1249"
      ],
      "variants": [
        {
          "itemId": "LA-1142",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": true
        },
        {
          "itemId": "LA-1249",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": true
        }
      ],
      "localOption": {
        "itemId": "LA-1249",
        "label": "Research a welcoming local community supper or potluck",
        "kind": "catalog-example",
        "searchUrl": "https://www.google.com/maps/search/?api=1&query=Research%20a%20welcoming%20local%20community%20supper%20or%20potluck%20San%20Francisco%20South%20Bay",
        "verification": "Local example or instructor search; a specific provider, date, and suitability still need checking."
      },
      "relatedLandmarkIds": []
    },
    {
      "id": "unhurried-reading-day",
      "title": "Spend an unhurried day reading",
      "kind": "activity",
      "classification": "while-there",
      "reason": "A quiet reading day can be at home or a public library; a named architectural library visit is a separate place goal.",
      "itemIds": [
        "LA-1128",
        "LA-1308"
      ],
      "preferredItemIds": [
        "LA-1128"
      ],
      "variants": [
        {
          "itemId": "LA-1128",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": true
        },
        {
          "itemId": "LA-1308",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": true
        }
      ],
      "localOption": {
        "itemId": "LA-1128",
        "label": "Choose a home or local-library reading day",
        "kind": "catalog-example",
        "searchUrl": "https://www.google.com/maps/search/?api=1&query=Choose%20a%20home%20or%20local-library%20reading%20day%20San%20Francisco%20South%20Bay",
        "verification": "Local example or instructor search; a specific provider, date, and suitability still need checking."
      },
      "relatedLandmarkIds": []
    },
    {
      "id": "thermal-bath-introduction",
      "title": "Try an appropriate thermal-bath or hot-spring outing",
      "kind": "activity",
      "classification": "while-there",
      "reason": "A generic first soak can be local/regional; a named historic bath or onsen culture can still be a deliberate destination angle.",
      "itemIds": [
        "LA-0654",
        "LA-1067",
        "LA-1348"
      ],
      "preferredItemIds": [
        "LA-0654"
      ],
      "variants": [
        {
          "itemId": "LA-0654",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": true
        },
        {
          "itemId": "LA-1067",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": true
        },
        {
          "itemId": "LA-1348",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": false
        }
      ],
      "localOption": {
        "itemId": "LA-0654",
        "label": "Research the Calistoga hot-spring/forest outing as a regional drive",
        "kind": "catalog-example",
        "searchUrl": "https://www.google.com/maps/search/?api=1&query=Research%20the%20Calistoga%20hot-spring/forest%20outing%20as%20a%20regional%20drive%20San%20Francisco%20South%20Bay",
        "verification": "Local example or instructor search; a specific provider, date, and suitability still need checking."
      },
      "relatedLandmarkIds": []
    },
    {
      "id": "overnight-train",
      "title": "Experience an overnight train journey",
      "kind": "generic-journey",
      "classification": "dedicated-trip",
      "reason": "Choose one workable sleeper route; routes, compartments, and countries remain explicit variants.",
      "itemIds": [
        "LA-1040",
        "LA-1066",
        "LA-1321"
      ],
      "preferredItemIds": [
        "LA-1040"
      ],
      "variants": [
        {
          "itemId": "LA-1040",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": true
        },
        {
          "itemId": "LA-1066",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": true
        },
        {
          "itemId": "LA-1321",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": true
        }
      ],
      "localOption": null,
      "relatedLandmarkIds": []
    },
    {
      "id": "car-free-city-introduction",
      "title": "Try transit-focused city living",
      "kind": "activity",
      "classification": "while-there",
      "reason": "A short sample does not prove a full week was completed; try an appropriate nearby transit-rich city first.",
      "itemIds": [
        "LA-0711",
        "LA-1323"
      ],
      "preferredItemIds": [
        "LA-1323"
      ],
      "variants": [
        {
          "itemId": "LA-0711",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": false
        },
        {
          "itemId": "LA-1323",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": true
        }
      ],
      "localOption": {
        "itemId": "LA-1323",
        "label": "Try a transit-focused local city day or week",
        "kind": "catalog-example",
        "searchUrl": "https://www.google.com/maps/search/?api=1&query=Try%20a%20transit-focused%20local%20city%20day%20or%20week%20San%20Francisco%20South%20Bay",
        "verification": "Local example or instructor search; a specific provider, date, and suitability still need checking."
      },
      "relatedLandmarkIds": []
    },
    {
      "id": "yosemite-park-visit",
      "title": "Visit Yosemite’s park landscape",
      "kind": "same-place",
      "classification": "trip-anchor",
      "reason": "These are overlapping Yosemite park-visit records. Half Dome, waterfalls, and specific viewpoints remain separate goals.",
      "itemIds": [
        "LA-0406",
        "LA-0421"
      ],
      "preferredItemIds": [
        "LA-0406"
      ],
      "variants": [
        {
          "itemId": "LA-0406",
          "role": "Same named place / route",
          "beginner": false,
          "bundleEligible": true,
          "completionEquivalent": true
        },
        {
          "itemId": "LA-0421",
          "role": "Same named place / route",
          "beginner": false,
          "bundleEligible": true,
          "completionEquivalent": true
        }
      ],
      "localOption": null,
      "relatedLandmarkIds": []
    },
    {
      "id": "redwood-parks-visit",
      "title": "Visit Redwood National and State Parks",
      "kind": "same-place",
      "classification": "trip-anchor",
      "reason": "These name the same redwood park system; distinct trails or cultural experiences are not automatically completed.",
      "itemIds": [
        "LA-0161",
        "LA-0404"
      ],
      "preferredItemIds": [
        "LA-0161"
      ],
      "variants": [
        {
          "itemId": "LA-0161",
          "role": "Same named place / route",
          "beginner": false,
          "bundleEligible": true,
          "completionEquivalent": true
        },
        {
          "itemId": "LA-0404",
          "role": "Same named place / route",
          "beginner": false,
          "bundleEligible": true,
          "completionEquivalent": true
        }
      ],
      "localOption": null,
      "relatedLandmarkIds": []
    },
    {
      "id": "sequoia-kings-visit",
      "title": "Visit Sequoia and Kings Canyon",
      "kind": "same-place",
      "classification": "trip-anchor",
      "reason": "These overlap as a combined park-area visit. A particular canyon route remains separate.",
      "itemIds": [
        "LA-0044",
        "LA-0419"
      ],
      "preferredItemIds": [
        "LA-0044"
      ],
      "variants": [
        {
          "itemId": "LA-0044",
          "role": "Same named place / route",
          "beginner": false,
          "bundleEligible": true,
          "completionEquivalent": true
        },
        {
          "itemId": "LA-0419",
          "role": "Same named place / route",
          "beginner": false,
          "bundleEligible": true,
          "completionEquivalent": true
        }
      ],
      "localOption": null,
      "relatedLandmarkIds": []
    },
    {
      "id": "grand-canyon-south-rim",
      "title": "Visit the Grand Canyon South Rim",
      "kind": "same-place",
      "classification": "trip-anchor",
      "reason": "These share the South Rim context. A canyon descent, Rim-to-Rim, flight, or a specific viewpoint is not the same goal.",
      "itemIds": [
        "LA-0105",
        "LA-0400",
        "LA-0491"
      ],
      "preferredItemIds": [
        "LA-0105"
      ],
      "variants": [
        {
          "itemId": "LA-0105",
          "role": "Same named place / route",
          "beginner": false,
          "bundleEligible": true,
          "completionEquivalent": true
        },
        {
          "itemId": "LA-0400",
          "role": "Same named place / route",
          "beginner": false,
          "bundleEligible": true,
          "completionEquivalent": true
        },
        {
          "itemId": "LA-0491",
          "role": "Same named place / route",
          "beginner": false,
          "bundleEligible": true,
          "completionEquivalent": true
        }
      ],
      "localOption": null,
      "relatedLandmarkIds": []
    },
    {
      "id": "denali-park-visit",
      "title": "Visit the Denali park area",
      "kind": "same-place",
      "classification": "trip-anchor",
      "reason": "These overlap as park-area visits. Climbing Denali and specific wildlife experiences remain separate.",
      "itemIds": [
        "LA-0359",
        "LA-0398",
        "LA-0423",
        "LA-0677"
      ],
      "preferredItemIds": [
        "LA-0359"
      ],
      "variants": [
        {
          "itemId": "LA-0359",
          "role": "Same named place / route",
          "beginner": false,
          "bundleEligible": true,
          "completionEquivalent": true
        },
        {
          "itemId": "LA-0398",
          "role": "Same named place / route",
          "beginner": false,
          "bundleEligible": true,
          "completionEquivalent": true
        },
        {
          "itemId": "LA-0423",
          "role": "Same named place / route",
          "beginner": false,
          "bundleEligible": true,
          "completionEquivalent": true
        },
        {
          "itemId": "LA-0677",
          "role": "Same named place / route",
          "beginner": false,
          "bundleEligible": true,
          "completionEquivalent": true
        }
      ],
      "localOption": null,
      "relatedLandmarkIds": []
    },
    {
      "id": "grand-teton-park-visit",
      "title": "Visit the Grand Teton park landscape",
      "kind": "same-place",
      "classification": "trip-anchor",
      "reason": "These overlap in park context. Oxbow Bend, wildlife routes, and rafting remain their own experiences.",
      "itemIds": [
        "LA-0362",
        "LA-0401"
      ],
      "preferredItemIds": [
        "LA-0362"
      ],
      "variants": [
        {
          "itemId": "LA-0362",
          "role": "Same named place / route",
          "beginner": false,
          "bundleEligible": true,
          "completionEquivalent": true
        },
        {
          "itemId": "LA-0401",
          "role": "Same named place / route",
          "beginner": false,
          "bundleEligible": true,
          "completionEquivalent": true
        }
      ],
      "localOption": null,
      "relatedLandmarkIds": []
    },
    {
      "id": "yellowstone-park-visit",
      "title": "Visit Yellowstone’s park landscape",
      "kind": "same-place",
      "classification": "trip-anchor",
      "reason": "These name the same park-visit goal. Geyser basins and Lamar Valley wildlife are kept distinct.",
      "itemIds": [
        "LA-0405",
        "LA-0675"
      ],
      "preferredItemIds": [
        "LA-0405"
      ],
      "variants": [
        {
          "itemId": "LA-0405",
          "role": "Same named place / route",
          "beginner": false,
          "bundleEligible": true,
          "completionEquivalent": true
        },
        {
          "itemId": "LA-0675",
          "role": "Same named place / route",
          "beginner": false,
          "bundleEligible": true,
          "completionEquivalent": true
        }
      ],
      "localOption": null,
      "relatedLandmarkIds": []
    },
    {
      "id": "everglades-park-visit",
      "title": "Visit the Everglades park landscape",
      "kind": "same-place",
      "classification": "trip-anchor",
      "reason": "These overlap as Everglades park visits. A particular guided water activity remains separate.",
      "itemIds": [
        "LA-0676",
        "LA-0678"
      ],
      "preferredItemIds": [
        "LA-0676"
      ],
      "variants": [
        {
          "itemId": "LA-0676",
          "role": "Same named place / route",
          "beginner": false,
          "bundleEligible": true,
          "completionEquivalent": true
        },
        {
          "itemId": "LA-0678",
          "role": "Same named place / route",
          "beginner": false,
          "bundleEligible": true,
          "completionEquivalent": true
        }
      ],
      "localOption": null,
      "relatedLandmarkIds": []
    },
    {
      "id": "hawaii-volcanoes-visit",
      "title": "Visit Hawaiʻi Volcanoes’ natural landscape",
      "kind": "same-place",
      "classification": "trip-anchor",
      "reason": "These overlap in the natural park landscape. Practitioner-led Native Hawaiian cultural learning is kept separate.",
      "itemIds": [
        "LA-0160",
        "LA-0402"
      ],
      "preferredItemIds": [
        "LA-0160"
      ],
      "variants": [
        {
          "itemId": "LA-0160",
          "role": "Same named place / route",
          "beginner": false,
          "bundleEligible": true,
          "completionEquivalent": true
        },
        {
          "itemId": "LA-0402",
          "role": "Same named place / route",
          "beginner": false,
          "bundleEligible": true,
          "completionEquivalent": true
        }
      ],
      "localOption": null,
      "relatedLandmarkIds": []
    },
    {
      "id": "going-to-sun-road",
      "title": "Experience Going-to-the-Sun Road",
      "kind": "same-place",
      "classification": "trip-anchor",
      "reason": "These refer to the same named road corridor; other Glacier trails and Lake McDonald are separate.",
      "itemIds": [
        "LA-0459",
        "LA-0566"
      ],
      "preferredItemIds": [
        "LA-0459"
      ],
      "variants": [
        {
          "itemId": "LA-0459",
          "role": "Same named place / route",
          "beginner": false,
          "bundleEligible": true,
          "completionEquivalent": true
        },
        {
          "itemId": "LA-0566",
          "role": "Same named place / route",
          "beginner": false,
          "bundleEligible": true,
          "completionEquivalent": true
        }
      ],
      "localOption": null,
      "relatedLandmarkIds": []
    },
    {
      "id": "sleeping-bear-dunes",
      "title": "See the dunes at Sleeping Bear",
      "kind": "same-place",
      "classification": "trip-anchor",
      "reason": "These overlap in the same dune landscape; another Great Lakes shore is not considered equivalent.",
      "itemIds": [
        "LA-0304",
        "LA-0437"
      ],
      "preferredItemIds": [
        "LA-0304"
      ],
      "variants": [
        {
          "itemId": "LA-0304",
          "role": "Same named place / route",
          "beginner": false,
          "bundleEligible": true,
          "completionEquivalent": true
        },
        {
          "itemId": "LA-0437",
          "role": "Same named place / route",
          "beginner": false,
          "bundleEligible": true,
          "completionEquivalent": true
        }
      ],
      "localOption": null,
      "relatedLandmarkIds": []
    },
    {
      "id": "big-sur-road",
      "title": "Experience the Big Sur coastal-road corridor",
      "kind": "same-place",
      "classification": "trip-anchor",
      "reason": "These overlap along Big Sur’s coastal corridor. A specific waterfall, beach, or cultural program is separate.",
      "itemIds": [
        "LA-0159",
        "LA-0430",
        "LA-0457"
      ],
      "preferredItemIds": [
        "LA-0159"
      ],
      "variants": [
        {
          "itemId": "LA-0159",
          "role": "Same named place / route",
          "beginner": false,
          "bundleEligible": true,
          "completionEquivalent": true
        },
        {
          "itemId": "LA-0430",
          "role": "Same named place / route",
          "beginner": false,
          "bundleEligible": true,
          "completionEquivalent": true
        },
        {
          "itemId": "LA-0457",
          "role": "Same named place / route",
          "beginner": false,
          "bundleEligible": true,
          "completionEquivalent": true
        }
      ],
      "localOption": null,
      "relatedLandmarkIds": []
    },
    {
      "id": "haleakala-sunrise",
      "title": "Experience Haleakalā summit sunrise",
      "kind": "same-place",
      "classification": "trip-anchor",
      "reason": "The sunrise/sunset alternative entry does not prove sunrise occurred; the specific moment remains explicit.",
      "itemIds": [
        "LA-0078",
        "LA-0627"
      ],
      "preferredItemIds": [
        "LA-0078"
      ],
      "variants": [
        {
          "itemId": "LA-0078",
          "role": "Same named place / route",
          "beginner": false,
          "bundleEligible": true,
          "completionEquivalent": true
        },
        {
          "itemId": "LA-0627",
          "role": "Same named place / route",
          "beginner": false,
          "bundleEligible": true,
          "completionEquivalent": false
        }
      ],
      "localOption": null,
      "relatedLandmarkIds": []
    },
    {
      "id": "monterey-aquarium",
      "title": "Visit Monterey Bay Aquarium",
      "kind": "same-place",
      "classification": "trip-anchor",
      "reason": "These name the same aquarium visit; a wild-animal outing and a dive are separate experiences.",
      "itemIds": [
        "LA-0358",
        "LA-0698"
      ],
      "preferredItemIds": [
        "LA-0358"
      ],
      "variants": [
        {
          "itemId": "LA-0358",
          "role": "Same named place / route",
          "beginner": false,
          "bundleEligible": true,
          "completionEquivalent": true
        },
        {
          "itemId": "LA-0698",
          "role": "Same named place / route",
          "beginner": false,
          "bundleEligible": true,
          "completionEquivalent": true
        }
      ],
      "localOption": null,
      "relatedLandmarkIds": []
    },
    {
      "id": "getty-center",
      "title": "Visit the Getty Center",
      "kind": "same-place",
      "classification": "trip-anchor",
      "reason": "These overlap at the same museum/architecture site; other Los Angeles museums are distinct.",
      "itemIds": [
        "LA-0056",
        "LA-0377"
      ],
      "preferredItemIds": [
        "LA-0056"
      ],
      "variants": [
        {
          "itemId": "LA-0056",
          "role": "Same named place / route",
          "beginner": false,
          "bundleEligible": true,
          "completionEquivalent": true
        },
        {
          "itemId": "LA-0377",
          "role": "Same named place / route",
          "beginner": false,
          "bundleEligible": true,
          "completionEquivalent": true
        }
      ],
      "localOption": null,
      "relatedLandmarkIds": []
    },
    {
      "id": "metropolitan-museum",
      "title": "Visit the Metropolitan Museum of Art",
      "kind": "same-place",
      "classification": "trip-anchor",
      "reason": "These are aliases for the same museum visit; a different museum is not treated as equivalent.",
      "itemIds": [
        "LA-0055",
        "LA-0373"
      ],
      "preferredItemIds": [
        "LA-0055"
      ],
      "variants": [
        {
          "itemId": "LA-0055",
          "role": "Same named place / route",
          "beginner": false,
          "bundleEligible": true,
          "completionEquivalent": true
        },
        {
          "itemId": "LA-0373",
          "role": "Same named place / route",
          "beginner": false,
          "bundleEligible": true,
          "completionEquivalent": true
        }
      ],
      "localOption": null,
      "relatedLandmarkIds": []
    },
    {
      "id": "live-jazz-introduction",
      "title": "Hear a live jazz session",
      "kind": "activity",
      "classification": "while-there",
      "reason": "A first generic live-jazz session can be local; a named historic venue retains its own place significance.",
      "itemIds": [
        "LA-0017",
        "LA-1097"
      ],
      "preferredItemIds": [
        "LA-1097"
      ],
      "variants": [
        {
          "itemId": "LA-0017",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": true
        },
        {
          "itemId": "LA-1097",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": true
        }
      ],
      "localOption": {
        "itemId": "LA-1097",
        "label": "Find a welcoming live-jazz session near home",
        "kind": "catalog-example",
        "searchUrl": "https://www.google.com/maps/search/?api=1&query=Find%20a%20welcoming%20live-jazz%20session%20near%20home%20San%20Francisco%20South%20Bay",
        "verification": "Local example or instructor search; a specific provider, date, and suitability still need checking."
      },
      "relatedLandmarkIds": []
    },
    {
      "id": "community-kitchen-service",
      "title": "Volunteer at a community kitchen",
      "kind": "activity",
      "classification": "while-there",
      "reason": "Choose one suitable local kitchen shift; different kinds of community contribution stay separate.",
      "itemIds": [
        "LA-0637",
        "LA-1118"
      ],
      "preferredItemIds": [
        "LA-1118"
      ],
      "variants": [
        {
          "itemId": "LA-0637",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": true
        },
        {
          "itemId": "LA-1118",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": true
        }
      ],
      "localOption": {
        "itemId": "LA-1118",
        "label": "Research an appropriate local community-kitchen volunteer shift",
        "kind": "catalog-example",
        "searchUrl": "https://www.google.com/maps/search/?api=1&query=Research%20an%20appropriate%20local%20community-kitchen%20volunteer%20shift%20San%20Francisco%20South%20Bay",
        "verification": "Local example or instructor search; a specific provider, date, and suitability still need checking."
      },
      "relatedLandmarkIds": []
    },
    {
      "id": "agricultural-fair-introduction",
      "title": "Visit a regional agricultural fair",
      "kind": "activity",
      "classification": "while-there",
      "reason": "A first regional fair experience can be local; named festivals and distinct cultural traditions remain separate.",
      "itemIds": [
        "LA-0011",
        "LA-0025"
      ],
      "preferredItemIds": [
        "LA-0025"
      ],
      "variants": [
        {
          "itemId": "LA-0011",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": true
        },
        {
          "itemId": "LA-0025",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": true
        }
      ],
      "localOption": {
        "itemId": "LA-0025",
        "label": "Research a local county or state agricultural fair",
        "kind": "catalog-example",
        "searchUrl": "https://www.google.com/maps/search/?api=1&query=Research%20a%20local%20county%20or%20state%20agricultural%20fair%20San%20Francisco%20South%20Bay",
        "verification": "Local example or instructor search; a specific provider, date, and suitability still need checking."
      },
      "relatedLandmarkIds": []
    },
    {
      "id": "first-sourdough-bake",
      "title": "Bake sourdough from a starter",
      "kind": "activity",
      "classification": "while-there",
      "reason": "A local class or home bake can cover the initial sourdough skill without a separate food trip.",
      "itemIds": [
        "LA-0216",
        "LA-1125"
      ],
      "preferredItemIds": [
        "LA-1125"
      ],
      "variants": [
        {
          "itemId": "LA-0216",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": true
        },
        {
          "itemId": "LA-1125",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": true
        }
      ],
      "localOption": {
        "itemId": "LA-1125",
        "label": "Bake sourdough at home or research a local baking class",
        "kind": "catalog-example",
        "searchUrl": "https://www.google.com/maps/search/?api=1&query=Bake%20sourdough%20at%20home%20or%20research%20a%20local%20baking%20class%20San%20Francisco%20South%20Bay",
        "verification": "Local example or instructor search; a specific provider, date, and suitability still need checking."
      },
      "relatedLandmarkIds": []
    },
    {
      "id": "handmade-pasta",
      "title": "Learn a first handmade pasta technique",
      "kind": "activity",
      "classification": "while-there",
      "reason": "A pasta/dumpling alternative entry does not prove pasta was made. Regional Italian techniques remain intentional variants.",
      "itemIds": [
        "LA-0841",
        "LA-1124"
      ],
      "preferredItemIds": [
        "LA-1124"
      ],
      "variants": [
        {
          "itemId": "LA-0841",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": true
        },
        {
          "itemId": "LA-1124",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": false
        }
      ],
      "localOption": {
        "itemId": "LA-1124",
        "label": "Research a local handmade-pasta lesson",
        "kind": "catalog-example",
        "searchUrl": "https://www.google.com/maps/search/?api=1&query=Research%20a%20local%20handmade-pasta%20lesson%20San%20Francisco%20South%20Bay",
        "verification": "Local example or instructor search; a specific provider, date, and suitability still need checking."
      },
      "relatedLandmarkIds": []
    },
    {
      "id": "first-whale-outing",
      "title": "Observe a whale responsibly",
      "kind": "activity",
      "classification": "while-there",
      "reason": "This is an introductory generic whale-observation goal. Species-specific and remote wildlife journeys remain separate.",
      "itemIds": [
        "LA-1103",
        "LA-0664"
      ],
      "preferredItemIds": [
        "LA-0664"
      ],
      "variants": [
        {
          "itemId": "LA-1103",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": true
        },
        {
          "itemId": "LA-0664",
          "role": "Alternative first experience; named locations remain separate records",
          "beginner": true,
          "bundleEligible": true,
          "completionEquivalent": true
        }
      ],
      "localOption": {
        "itemId": "LA-0664",
        "label": "Research a responsible Monterey Bay whale-watching outing as a regional visit",
        "kind": "catalog-example",
        "searchUrl": "https://www.google.com/maps/search/?api=1&query=Research%20a%20responsible%20Monterey%20Bay%20whale-watching%20outing%20as%20a%20regional%20visit%20San%20Francisco%20South%20Bay",
        "verification": "Local example or instructor search; a specific provider, date, and suitability still need checking."
      },
      "relatedLandmarkIds": []
    }
  ],
  "destinations": [
    {
      "id": "bay-area",
      "title": "San Francisco & South Bay discoveries",
      "scope": "USA",
      "regionIds": [
        "bay-area"
      ],
      "relatedItemIds": [
        "LA-0046",
        "LA-0180",
        "LA-0199",
        "LA-0216",
        "LA-0267",
        "LA-0341",
        "LA-0370",
        "LA-0375",
        "LA-0384",
        "LA-0507",
        "LA-0539",
        "LA-0575",
        "LA-0576",
        "LA-0641",
        "LA-0654",
        "LA-0028",
        "LA-0511",
        "LA-0520"
      ],
      "cuisineIds": [
        "CU-032",
        "CU-077",
        "CU-035",
        "CU-036",
        "CU-027",
        "CU-028",
        "CU-031",
        "CU-001",
        "CU-003",
        "CU-048",
        "CU-042"
      ],
      "canonicalActivityIds": [
        "tandem-skydiving",
        "first-sailing-lesson",
        "thermal-bath-introduction",
        "first-sourdough-bake",
        "beginner-surf",
        "glider-introduction",
        "first-flight-lesson",
        "first-balloon-flight",
        "beginner-rowing",
        "first-climbing-session",
        "beginner-orienteering",
        "first-community-race",
        "first-ceramic-vessel",
        "introductory-glassmaking",
        "beginner-wood-project",
        "basic-clothing-repair",
        "first-handbound-journal",
        "short-public-talk",
        "public-lecture-discovery",
        "first-instrument-song",
        "social-swing-introduction",
        "finish-short-story",
        "elder-life-stories",
        "quiet-service-day",
        "community-meal",
        "unhurried-reading-day",
        "car-free-city-introduction",
        "live-jazz-introduction",
        "community-kitchen-service",
        "agricultural-fair-introduction",
        "handmade-pasta",
        "first-whale-outing"
      ],
      "editorialScore": 90,
      "reason": "A strong local starting point for public science, neighborhoods, culture, food, and first skills; exact providers still need checking.",
      "visitedAliases": [
        "south bay",
        "san francisco bay area",
        "bay area"
      ],
      "lat": 37.77,
      "lon": -122.42,
      "precision": "city area",
      "mapLabel": "San Francisco city context; South Bay and other local goals spread across the Bay Area.",
      "coordinateSource": "existing item-location index: LA-0341",
      "multiBaseChoices": false,
      "routingNote": "Representative city/place context only. Related items are choices, not a promise that all fit one base or a five-/nine-day trip. Actual access and transport require checks."
    },
    {
      "id": "monterey",
      "title": "Monterey, Carmel & a chosen Big Sur angle",
      "scope": "USA",
      "regionIds": [
        "central-coast"
      ],
      "relatedItemIds": [
        "LA-0358",
        "LA-0698",
        "LA-0664",
        "LA-0480",
        "LA-1050",
        "LA-0639",
        "LA-0084",
        "LA-0159",
        "LA-0430",
        "LA-0457",
        "LA-0649"
      ],
      "cuisineIds": [],
      "canonicalActivityIds": [
        "big-sur-road",
        "monterey-aquarium",
        "first-whale-outing"
      ],
      "editorialScore": 89,
      "reason": "Marine learning and coastal landscapes can form one regional outing or a small trip; Big Sur access is a separate road check.",
      "visitedAliases": [],
      "lat": 36.6,
      "lon": -121.89,
      "precision": "city area",
      "mapLabel": "Monterey city base; Carmel and Big Sur are separate coastal outing choices.",
      "coordinateSource": "existing item-location index: LA-0698",
      "multiBaseChoices": true,
      "routingNote": "Representative city/place context only. Related items are choices, not a promise that all fit one base or a five-/nine-day trip. Actual access and transport require checks. Select a sector or allocate the distinct base/transfer days before counting coverage."
    },
    {
      "id": "tahoe",
      "title": "Tahoe & a chosen eastern-Sierra chapter",
      "scope": "USA",
      "regionIds": [
        "sierra"
      ],
      "relatedItemIds": [
        "LA-0303",
        "LA-0644",
        "LA-0497",
        "LA-0257",
        "LA-0004",
        "LA-0589"
      ],
      "cuisineIds": [],
      "canonicalActivityIds": [
        "first-climbing-session"
      ],
      "editorialScore": 85,
      "reason": "Lake time and optional skills can sit within a larger Sierra route; Bishop and Bridgeport are separate bases, not Tahoe day assumptions.",
      "visitedAliases": [],
      "lat": 38.94,
      "lon": -119.98,
      "precision": "city area",
      "mapLabel": "South Lake Tahoe context; Bridgeport, Bishop, and Owens Valley require separate bases.",
      "coordinateSource": "existing item-location index: LA-0303",
      "multiBaseChoices": true,
      "routingNote": "Representative city/place context only. Related items are choices, not a promise that all fit one base or a five-/nine-day trip. Actual access and transport require checks. Select a sector or allocate the distinct base/transfer days before counting coverage."
    },
    {
      "id": "yosemite",
      "title": "Yosemite valley & selected mountain goals",
      "scope": "USA",
      "regionIds": [
        "sierra"
      ],
      "relatedItemIds": [
        "LA-0406",
        "LA-0421",
        "LA-0369",
        "LA-0083",
        "LA-0645",
        "LA-0247",
        "LA-0243",
        "LA-0610"
      ],
      "cuisineIds": [],
      "canonicalActivityIds": [
        "yosemite-park-visit"
      ],
      "editorialScore": 92,
      "reason": "An exceptional park anchor with distinct valley, waterfall, and optional prepared hiking goals; routes and permits determine the plan.",
      "visitedAliases": [],
      "lat": 37.75,
      "lon": -119.59,
      "precision": "place area",
      "mapLabel": "Yosemite Valley area; specific mountain trails and viewpoints have their own access.",
      "coordinateSource": "existing item-location index: LA-0406",
      "multiBaseChoices": false,
      "routingNote": "Representative city/place context only. Related items are choices, not a promise that all fit one base or a five-/nine-day trip. Actual access and transport require checks."
    },
    {
      "id": "los-angeles",
      "title": "Los Angeles neighborhoods, art & food",
      "scope": "USA",
      "regionIds": [
        "los-angeles"
      ],
      "relatedItemIds": [
        "LA-0056",
        "LA-0377",
        "LA-0200",
        "LA-0265",
        "LA-0269",
        "LA-0225",
        "LA-0316",
        "LA-0379",
        "LA-0089",
        "LA-0167",
        "LA-0355",
        "LA-0453"
      ],
      "cuisineIds": [
        "CU-032",
        "CU-031",
        "CU-077",
        "CU-028",
        "CU-048"
      ],
      "canonicalActivityIds": [
        "getty-center"
      ],
      "editorialScore": 88,
      "reason": "A varied city anchor for museums, cultural neighborhoods, food, and creative observation; choose a few geographic sectors.",
      "visitedAliases": [],
      "lat": 34.05,
      "lon": -118.24,
      "precision": "city area",
      "mapLabel": "Los Angeles city context; its museum/neighborhood sectors have distinct road legs.",
      "coordinateSource": "existing item-location index: LA-0355",
      "multiBaseChoices": false,
      "routingNote": "Representative city/place context only. Related items are choices, not a promise that all fit one base or a five-/nine-day trip. Actual access and transport require checks."
    },
    {
      "id": "san-diego",
      "title": "San Diego coast & beginner ocean confidence",
      "scope": "USA",
      "regionIds": [
        "san-diego"
      ],
      "relatedItemIds": [
        "LA-0001",
        "LA-0069",
        "LA-0091",
        "LA-0623",
        "LA-0183",
        "LA-0333",
        "LA-0478",
        "LA-0656"
      ],
      "cuisineIds": [
        "CU-077"
      ],
      "canonicalActivityIds": [
        "beginner-surf"
      ],
      "editorialScore": 90,
      "reason": "Coast and city culture pair well; a beginner lesson is an optional activity rather than a reason to repeat a skill-only trip.",
      "visitedAliases": [],
      "lat": 32.72,
      "lon": -117.16,
      "precision": "city area",
      "mapLabel": "San Diego city context; North County and coast options are separate local routes.",
      "coordinateSource": "existing item-location index: LA-0333",
      "multiBaseChoices": false,
      "routingNote": "Representative city/place context only. Related items are choices, not a promise that all fit one base or a five-/nine-day trip. Actual access and transport require checks."
    },
    {
      "id": "seattle",
      "title": "Seattle & a selected Washington nature sector",
      "scope": "USA",
      "regionIds": [
        "washington"
      ],
      "relatedItemIds": [
        "LA-0201",
        "LA-0165",
        "LA-0240",
        "LA-0272",
        "LA-0276",
        "LA-0351",
        "LA-0403",
        "LA-0446",
        "LA-0434",
        "LA-0642",
        "LA-0090"
      ],
      "cuisineIds": [
        "CU-032",
        "CU-036",
        "CU-031"
      ],
      "canonicalActivityIds": [
        "introductory-glassmaking"
      ],
      "editorialScore": 91,
      "reason": "A city, craft, and nature combination with distinct peninsula/island transfer choices; it is not one compact all-Washington day.",
      "visitedAliases": [],
      "lat": 47.61,
      "lon": -122.33,
      "precision": "city area",
      "mapLabel": "Seattle city context; Olympic and San Juan Island choices require separate transfers.",
      "coordinateSource": "existing item-location index: LA-0351",
      "multiBaseChoices": true,
      "routingNote": "Representative city/place context only. Related items are choices, not a promise that all fit one base or a five-/nine-day trip. Actual access and transport require checks. Select a sector or allocate the distinct base/transfer days before counting coverage."
    },
    {
      "id": "portland",
      "title": "Portland, the Gorge & a coast choice",
      "scope": "USA",
      "regionIds": [
        "oregon"
      ],
      "relatedItemIds": [
        "LA-0128",
        "LA-0168",
        "LA-0266",
        "LA-0356",
        "LA-0433",
        "LA-0067",
        "LA-0312",
        "LA-0306",
        "LA-0512"
      ],
      "cuisineIds": [
        "CU-077",
        "CU-035",
        "CU-036"
      ],
      "canonicalActivityIds": [],
      "editorialScore": 88,
      "reason": "Neighborhood life and nearby landscapes provide variety; the coast requires its own route and base decisions.",
      "visitedAliases": [],
      "lat": 45.52,
      "lon": -122.68,
      "precision": "city area",
      "mapLabel": "Portland city context; Gorge and coast outings require their own road legs.",
      "coordinateSource": "existing item-location index: LA-0356",
      "multiBaseChoices": true,
      "routingNote": "Representative city/place context only. Related items are choices, not a promise that all fit one base or a five-/nine-day trip. Actual access and transport require checks. Select a sector or allocate the distinct base/transfer days before counting coverage."
    },
    {
      "id": "southern-utah",
      "title": "Zion, Bryce & Capitol Reef route choices",
      "scope": "USA",
      "regionIds": [
        "zion-bryce"
      ],
      "relatedItemIds": [
        "LA-0107",
        "LA-0410",
        "LA-0244",
        "LA-0245",
        "LA-0106",
        "LA-0076",
        "LA-0413",
        "LA-0463"
      ],
      "cuisineIds": [],
      "canonicalActivityIds": [],
      "editorialScore": 94,
      "reason": "A high-value red-rock region with different landscapes and optional active goals; multiple bases and route preparation matter.",
      "visitedAliases": [],
      "lat": 37.19,
      "lon": -113.0,
      "precision": "city area",
      "mapLabel": "Springdale/Zion gateway; Bryce and Capitol Reef are different bases.",
      "coordinateSource": "existing item-location index: LA-0244",
      "multiBaseChoices": true,
      "routingNote": "Representative city/place context only. Related items are choices, not a promise that all fit one base or a five-/nine-day trip. Actual access and transport require checks. Select a sector or allocate the distinct base/transfer days before counting coverage."
    },
    {
      "id": "moab",
      "title": "Moab, Arches & Canyonlands",
      "scope": "USA",
      "regionIds": [
        "moab"
      ],
      "relatedItemIds": [
        "LA-0171",
        "LA-0407",
        "LA-0412",
        "LA-0080",
        "LA-0568",
        "LA-0504"
      ],
      "cuisineIds": [],
      "canonicalActivityIds": [
        "tandem-skydiving"
      ],
      "editorialScore": 88,
      "reason": "Distinct sandstone landscapes can justify the destination; skydiving remains an optional first-skill variant.",
      "visitedAliases": [],
      "lat": 38.73,
      "lon": -109.59,
      "precision": "place area",
      "mapLabel": "Moab gateway; Arches and Canyonlands have separate park access routes.",
      "coordinateSource": "existing item-location index: LA-0407",
      "multiBaseChoices": false,
      "routingNote": "Representative city/place context only. Related items are choices, not a promise that all fit one base or a five-/nine-day trip. Actual access and transport require checks."
    },
    {
      "id": "northern-arizona",
      "title": "Sedona & a separate South Rim chapter",
      "scope": "USA",
      "regionIds": [
        "northern-arizona"
      ],
      "relatedItemIds": [
        "LA-0085",
        "LA-0551",
        "LA-0105",
        "LA-0400",
        "LA-0491",
        "LA-0082",
        "LA-0464",
        "LA-0108",
        "LA-0226",
        "LA-0110"
      ],
      "cuisineIds": [
        "CU-091"
      ],
      "canonicalActivityIds": [
        "grand-canyon-south-rim"
      ],
      "editorialScore": 88,
      "reason": "Desert landscapes, rim views, and locally interpreted heritage offer different angles; select a corridor rather than every northern-Arizona stop.",
      "visitedAliases": [],
      "lat": 34.87,
      "lon": -111.76,
      "precision": "city area",
      "mapLabel": "Sedona context; South Rim and Page are different bases.",
      "coordinateSource": "existing item-location index: LA-0551",
      "multiBaseChoices": true,
      "routingNote": "Representative city/place context only. Related items are choices, not a promise that all fit one base or a five-/nine-day trip. Actual access and transport require checks. Select a sector or allocate the distinct base/transfer days before counting coverage."
    },
    {
      "id": "colorado-rockies",
      "title": "Colorado Rockies: choose two bases",
      "scope": "USA",
      "regionIds": [
        "colorado"
      ],
      "relatedItemIds": [
        "LA-0409",
        "LA-0462",
        "LA-0189",
        "LA-0436",
        "LA-0252",
        "LA-0382",
        "LA-0667",
        "LA-0319"
      ],
      "cuisineIds": [],
      "canonicalActivityIds": [],
      "editorialScore": 89,
      "reason": "Mountain landscapes, culture, and restorative time can combine; altitude, roads, and transfer days shape what fits.",
      "visitedAliases": [],
      "lat": 40.38,
      "lon": -105.52,
      "precision": "city area",
      "mapLabel": "Estes Park context; the Roaring Fork Valley is a separate mountain transfer.",
      "coordinateSource": "existing item-location index: LA-0409",
      "multiBaseChoices": true,
      "routingNote": "Representative city/place context only. Related items are choices, not a promise that all fit one base or a five-/nine-day trip. Actual access and transport require checks. Select a sector or allocate the distinct base/transfer days before counting coverage."
    },
    {
      "id": "northern-new-mexico",
      "title": "Santa Fe, Albuquerque & Taos choices",
      "scope": "USA",
      "regionIds": [
        "new-mexico"
      ],
      "relatedItemIds": [
        "LA-0053",
        "LA-0057",
        "LA-0203",
        "LA-0217",
        "LA-0237",
        "LA-0280",
        "LA-0343",
        "LA-0553",
        "LA-0555",
        "LA-0007"
      ],
      "cuisineIds": [
        "CU-091"
      ],
      "canonicalActivityIds": [
        "first-balloon-flight",
        "first-ceramic-vessel"
      ],
      "editorialScore": 91,
      "reason": "A rich cultural/food/making region with heritage interpreted by the communities and institutions that welcome visitors.",
      "visitedAliases": [],
      "lat": 35.69,
      "lon": -105.94,
      "precision": "city area",
      "mapLabel": "Santa Fe city base; Albuquerque and Taos are separate route choices.",
      "coordinateSource": "existing item-location index: LA-0053",
      "multiBaseChoices": true,
      "routingNote": "Representative city/place context only. Related items are choices, not a promise that all fit one base or a five-/nine-day trip. Actual access and transport require checks. Select a sector or allocate the distinct base/transfer days before counting coverage."
    },
    {
      "id": "black-hills",
      "title": "Black Hills & Badlands regional choices",
      "scope": "USA",
      "regionIds": [
        "black-hills"
      ],
      "relatedItemIds": [
        "LA-0411",
        "LA-0115",
        "LA-0121",
        "LA-0390"
      ],
      "cuisineIds": [],
      "canonicalActivityIds": [],
      "editorialScore": 85,
      "reason": "A concentrated landscape-and-cave region; named outings remain distinct and the flight/road plan needs checking.",
      "visitedAliases": [],
      "lat": 44.08,
      "lon": -103.23,
      "precision": "base area",
      "mapLabel": "Rapid City regional base; Badlands, caves, and Devils Tower are separate outings.",
      "coordinateSource": "existing regional base: black-hills",
      "multiBaseChoices": true,
      "routingNote": "Representative city/place context only. Related items are choices, not a promise that all fit one base or a five-/nine-day trip. Actual access and transport require checks. Select a sector or allocate the distinct base/transfer days before counting coverage."
    },
    {
      "id": "chicago",
      "title": "Chicago architecture, art & neighborhoods",
      "scope": "USA",
      "regionIds": [
        "chicago"
      ],
      "relatedItemIds": [
        "LA-0045",
        "LA-0344",
        "LA-0621",
        "LA-0371",
        "LA-0262",
        "LA-0270",
        "LA-0164",
        "LA-0580",
        "LA-0560"
      ],
      "cuisineIds": [
        "CU-063",
        "CU-077",
        "CU-070"
      ],
      "canonicalActivityIds": [],
      "editorialScore": 92,
      "reason": "Architecture, museums, neighborhood food, and live culture create a strong multi-angle city anchor.",
      "visitedAliases": [],
      "lat": 41.88,
      "lon": -87.63,
      "precision": "city area",
      "mapLabel": "Chicago city context; regional town extensions have separate transfers.",
      "coordinateSource": "existing item-location index: LA-0344",
      "multiBaseChoices": false,
      "routingNote": "Representative city/place context only. Related items are choices, not a promise that all fit one base or a five-/nine-day trip. Actual access and transport require checks."
    },
    {
      "id": "new-york",
      "title": "New York City: choose an unfamiliar angle",
      "scope": "USA",
      "regionIds": [
        "new-york-philadelphia"
      ],
      "relatedItemIds": [
        "LA-0139",
        "LA-0327",
        "LA-0055",
        "LA-0373",
        "LA-0274",
        "LA-0374",
        "LA-0451",
        "LA-0579",
        "LA-0583",
        "LA-0260",
        "LA-0197",
        "LA-0204",
        "LA-0323",
        "LA-0005"
      ],
      "cuisineIds": [
        "CU-032",
        "CU-027",
        "CU-070",
        "CU-077",
        "CU-049"
      ],
      "canonicalActivityIds": [
        "social-swing-introduction",
        "metropolitan-museum"
      ],
      "editorialScore": 91,
      "reason": "A deep city with many distinct goals; prior city experience reduces novelty only, not the status of untracked experiences.",
      "visitedAliases": [
        "new york city",
        "new york"
      ],
      "lat": 40.71,
      "lon": -74.01,
      "precision": "city area",
      "mapLabel": "New York City context; individual borough/venue goals are not exact points here.",
      "coordinateSource": "existing item-location index: LA-0139",
      "multiBaseChoices": false,
      "routingNote": "Representative city/place context only. Related items are choices, not a promise that all fit one base or a five-/nine-day trip. Actual access and transport require checks."
    },
    {
      "id": "washington-dc",
      "title": "Washington, DC museums & public history",
      "scope": "USA",
      "regionIds": [
        "dc-virginia"
      ],
      "relatedItemIds": [
        "LA-0141",
        "LA-0142",
        "LA-0150",
        "LA-0282",
        "LA-0372",
        "LA-0472",
        "LA-0537",
        "LA-0250"
      ],
      "cuisineIds": [
        "CU-056",
        "CU-049"
      ],
      "canonicalActivityIds": [],
      "editorialScore": 90,
      "reason": "Public institutions, museums, and historical learning offer several different goals within one city.",
      "visitedAliases": [],
      "lat": 38.91,
      "lon": -77.04,
      "precision": "city area",
      "mapLabel": "Washington, DC city context; museums and public sites have separate access.",
      "coordinateSource": "existing item-location index: LA-0250",
      "multiBaseChoices": false,
      "routingNote": "Representative city/place context only. Related items are choices, not a promise that all fit one base or a five-/nine-day trip. Actual access and transport require checks."
    },
    {
      "id": "new-orleans",
      "title": "New Orleans music, history & neighborhood food",
      "scope": "USA",
      "regionIds": [
        "new-orleans"
      ],
      "relatedItemIds": [
        "LA-0052",
        "LA-0138",
        "LA-0170",
        "LA-0259",
        "LA-0321",
        "LA-0326",
        "LA-0381",
        "LA-0205",
        "LA-0210"
      ],
      "cuisineIds": [
        "CU-090"
      ],
      "canonicalActivityIds": [],
      "editorialScore": 92,
      "reason": "A distinctive city anchor for living music traditions, food, and locally interpreted history; performances and community events need context.",
      "visitedAliases": [],
      "lat": 29.95,
      "lon": -90.07,
      "precision": "city area",
      "mapLabel": "New Orleans city context; individual venues and community events need choosing.",
      "coordinateSource": "existing item-location index: LA-0052",
      "multiBaseChoices": false,
      "routingNote": "Representative city/place context only. Related items are choices, not a promise that all fit one base or a five-/nine-day trip. Actual access and transport require checks."
    },
    {
      "id": "boston",
      "title": "Boston neighborhoods & a chosen New England extension",
      "scope": "USA",
      "regionIds": [
        "boston-new-england"
      ],
      "relatedItemIds": [
        "LA-0049",
        "LA-0353",
        "LA-0540",
        "LA-0320",
        "LA-0620",
        "LA-0188",
        "LA-0363",
        "LA-0191",
        "LA-0360",
        "LA-0490"
      ],
      "cuisineIds": [
        "CU-093"
      ],
      "canonicalActivityIds": [],
      "editorialScore": 86,
      "reason": "City history and a northern extension are different choices. Known Boston visits do not imply all nearby goals were completed.",
      "visitedAliases": [
        "boston"
      ],
      "lat": 42.36,
      "lon": -71.06,
      "precision": "city area",
      "mapLabel": "Boston city context; White Mountains and Vermont extensions need different bases.",
      "coordinateSource": "existing item-location index: LA-0049",
      "multiBaseChoices": true,
      "routingNote": "Representative city/place context only. Related items are choices, not a promise that all fit one base or a five-/nine-day trip. Actual access and transport require checks. Select a sector or allocate the distinct base/transfer days before counting coverage."
    },
    {
      "id": "acadia",
      "title": "Acadia & a chosen Maine coast base",
      "scope": "USA",
      "regionIds": [
        "maine-acadia"
      ],
      "relatedItemIds": [
        "LA-0397",
        "LA-0074",
        "LA-0450",
        "LA-0309",
        "LA-0643",
        "LA-0456",
        "LA-0486"
      ],
      "cuisineIds": [
        "CU-093"
      ],
      "canonicalActivityIds": [
        "finish-short-story"
      ],
      "editorialScore": 85,
      "reason": "Park and coastal experiences can be meaningful new angles or revisits; a reported park visit leaves sunrise and specific outings untracked.",
      "visitedAliases": [
        "acadia national park",
        "acadia"
      ],
      "lat": 44.34,
      "lon": -68.27,
      "precision": "place area",
      "mapLabel": "Bar Harbor gateway; specific Acadia and Maine coastal outings have their own routes.",
      "coordinateSource": "existing item-location index: LA-0397",
      "multiBaseChoices": true,
      "routingNote": "Representative city/place context only. Related items are choices, not a promise that all fit one base or a five-/nine-day trip. Actual access and transport require checks. Select a sector or allocate the distinct base/transfer days before counting coverage."
    },
    {
      "id": "miami",
      "title": "Miami neighborhoods & an Everglades choice",
      "scope": "USA",
      "regionIds": [
        "south-florida"
      ],
      "relatedItemIds": [
        "LA-0347",
        "LA-0066",
        "LA-0220",
        "LA-0676",
        "LA-0678"
      ],
      "cuisineIds": [],
      "canonicalActivityIds": [
        "everglades-park-visit"
      ],
      "editorialScore": 86,
      "reason": "City culture, a garden, and a selected wetland visitor area can form distinct days; food-profile coverage is incomplete.",
      "visitedAliases": [],
      "lat": 25.76,
      "lon": -80.19,
      "precision": "base area",
      "mapLabel": "Miami regional base; Everglades access is a separate road/visitor-area decision.",
      "coordinateSource": "existing regional base: south-florida",
      "multiBaseChoices": false,
      "routingNote": "Representative city/place context only. Related items are choices, not a promise that all fit one base or a five-/nine-day trip. Actual access and transport require checks."
    },
    {
      "id": "florida-keys",
      "title": "Choose a Florida Keys base and water angle",
      "scope": "USA",
      "regionIds": [
        "south-florida"
      ],
      "relatedItemIds": [
        "LA-0476",
        "LA-0640",
        "LA-0332",
        "LA-0291",
        "LA-0315",
        "LA-0088",
        "LA-0460",
        "LA-0484"
      ],
      "cuisineIds": [],
      "canonicalActivityIds": [],
      "editorialScore": 85,
      "reason": "A selected Keys corridor can combine history and optional water learning; the islands and road legs are not interchangeable.",
      "visitedAliases": [],
      "lat": 25.09,
      "lon": -80.45,
      "precision": "city area",
      "mapLabel": "Key Largo context; Islamorada and Key West are different lower-Keys choices.",
      "coordinateSource": "existing item-location index: LA-0476",
      "multiBaseChoices": true,
      "routingNote": "Representative city/place context only. Related items are choices, not a promise that all fit one base or a five-/nine-day trip. Actual access and transport require checks. Select a sector or allocate the distinct base/transfer days before counting coverage."
    },
    {
      "id": "yellowstone-tetons",
      "title": "Yellowstone & Grand Teton route choices",
      "scope": "USA",
      "regionIds": [
        "yellowstone-tetons"
      ],
      "relatedItemIds": [
        "LA-0405",
        "LA-0675",
        "LA-0628",
        "LA-0680",
        "LA-0362",
        "LA-0401",
        "LA-0679",
        "LA-0671"
      ],
      "cuisineIds": [],
      "canonicalActivityIds": [
        "grand-teton-park-visit",
        "yellowstone-park-visit"
      ],
      "editorialScore": 95,
      "reason": "Different park landscapes, geothermal features, and wildlife goals justify a substantial regional trip, with rest and transfer time.",
      "visitedAliases": [],
      "lat": 43.79,
      "lon": -110.68,
      "precision": "place area",
      "mapLabel": "Jackson/Teton context; Yellowstone requires a separate park transfer/base.",
      "coordinateSource": "existing item-location index: LA-0362",
      "multiBaseChoices": true,
      "routingNote": "Representative city/place context only. Related items are choices, not a promise that all fit one base or a five-/nine-day trip. Actual access and transport require checks. Select a sector or allocate the distinct base/transfer days before counting coverage."
    },
    {
      "id": "glacier",
      "title": "Glacier: road, lake & selected trail goals",
      "scope": "USA",
      "regionIds": [
        "glacier-montana"
      ],
      "relatedItemIds": [
        "LA-0399",
        "LA-0424",
        "LA-0459",
        "LA-0566",
        "LA-0242",
        "LA-0229",
        "LA-0299"
      ],
      "cuisineIds": [],
      "canonicalActivityIds": [
        "going-to-sun-road"
      ],
      "editorialScore": 90,
      "reason": "The park road, lake landscape, and a prepared trail are distinct goals; seasonal access can change the route.",
      "visitedAliases": [],
      "lat": 48.2,
      "lon": -114.32,
      "precision": "base area",
      "mapLabel": "West Glacier gateway; specific park sectors and trails have their own access.",
      "coordinateSource": "existing item-location index: LA-0399",
      "multiBaseChoices": true,
      "routingNote": "Representative city/place context only. Related items are choices, not a promise that all fit one base or a five-/nine-day trip. Actual access and transport require checks. Select a sector or allocate the distinct base/transfer days before counting coverage."
    },
    {
      "id": "alaska-southcentral",
      "title": "Anchorage, Seward & a south-central Alaska corridor",
      "scope": "USA",
      "regionIds": [
        "alaska"
      ],
      "relatedItemIds": [
        "LA-0279",
        "LA-0352",
        "LA-0230",
        "LA-0235",
        "LA-0533",
        "LA-0465",
        "LA-0006",
        "LA-0234",
        "LA-0227"
      ],
      "cuisineIds": [],
      "canonicalActivityIds": [],
      "editorialScore": 89,
      "reason": "A corridor-focused combination of cultural learning and glacier/coastal landscapes; remote Alaska goals are separate journeys.",
      "visitedAliases": [],
      "lat": 61.22,
      "lon": -149.9,
      "precision": "city area",
      "mapLabel": "Anchorage city base; Seward, Talkeetna, and other sectors require transfers.",
      "coordinateSource": "existing item-location index: LA-0352",
      "multiBaseChoices": true,
      "routingNote": "Representative city/place context only. Related items are choices, not a promise that all fit one base or a five-/nine-day trip. Actual access and transport require checks. Select a sector or allocate the distinct base/transfer days before counting coverage."
    },
    {
      "id": "oahu",
      "title": "Oʻahu: culture, city & a suitable coast choice",
      "scope": "USA",
      "regionIds": [
        "hawaii"
      ],
      "relatedItemIds": [
        "LA-0338",
        "LA-0331",
        "LA-0519",
        "LA-0475",
        "LA-0070",
        "LA-0578",
        "LA-0571",
        "LA-1621",
        "LA-1055"
      ],
      "cuisineIds": [
        "CU-095",
        "CU-032"
      ],
      "canonicalActivityIds": [
        "beginner-surf"
      ],
      "editorialScore": 87,
      "reason": "Native Hawaiian learning, neighborhood life, and optional ocean experiences can combine. Advanced surf viewing does not establish beginner surfing skill.",
      "visitedAliases": [],
      "lat": 21.31,
      "lon": -157.86,
      "precision": "city area",
      "mapLabel": "Honolulu context on Oʻahu; coastal and practitioner-led outings require choosing sites.",
      "coordinateSource": "existing item-location index: LA-0331",
      "multiBaseChoices": false,
      "routingNote": "Representative city/place context only. Related items are choices, not a promise that all fit one base or a five-/nine-day trip. Actual access and transport require checks."
    },
    {
      "id": "tokyo",
      "title": "Tokyo neighborhoods & living culture",
      "scope": "World",
      "regionIds": [],
      "relatedItemIds": [
        "LA-0725",
        "LA-0704",
        "LA-1047",
        "LA-1569"
      ],
      "cuisineIds": [
        "CU-032"
      ],
      "canonicalActivityIds": [],
      "editorialScore": 95,
      "reason": "A rich city anchor for neighborhood exploration, daily rituals, and Japanese cultural/food angles; a specific class still needs research.",
      "visitedAliases": [],
      "lat": 35.68,
      "lon": 139.69,
      "precision": "city area",
      "mapLabel": "Tokyo city area; catalog context: Tokyo, Japan",
      "coordinateSource": "existing item-location index: LA-0725",
      "multiBaseChoices": false,
      "routingNote": "Representative city/place context only. Related items are choices, not a promise that all fit one base or a five-/nine-day trip. Actual access and transport require checks."
    },
    {
      "id": "kyoto",
      "title": "Kyoto temples, lanes & living traditions",
      "scope": "World",
      "regionIds": [],
      "relatedItemIds": [
        "LA-0859",
        "LA-0994",
        "LA-0811",
        "LA-0837",
        "LA-0850",
        "LA-1569"
      ],
      "cuisineIds": [
        "CU-032"
      ],
      "canonicalActivityIds": [],
      "editorialScore": 94,
      "reason": "Historic spaces, everyday lanes, and living traditions offer different experiences; public access and respectful participation matter.",
      "visitedAliases": [],
      "lat": 35.01,
      "lon": 135.77,
      "precision": "city area",
      "mapLabel": "Kyoto city area; catalog context: Kyoto, Japan",
      "coordinateSource": "existing item-location index: LA-0859",
      "multiBaseChoices": false,
      "routingNote": "Representative city/place context only. Related items are choices, not a promise that all fit one base or a five-/nine-day trip. Actual access and transport require checks."
    },
    {
      "id": "bangkok",
      "title": "Bangkok neighborhoods, markets & Thai food",
      "scope": "World",
      "regionIds": [],
      "relatedItemIds": [
        "LA-0717",
        "LA-0703",
        "LA-1145",
        "LA-1572",
        "LA-1573"
      ],
      "cuisineIds": [
        "CU-035"
      ],
      "canonicalActivityIds": [],
      "editorialScore": 92,
      "reason": "Neighborhood and market exploration anchors the place; initial Thai cuisine exposure can start locally.",
      "visitedAliases": [],
      "lat": 13.76,
      "lon": 100.5,
      "precision": "city area",
      "mapLabel": "Bangkok city area; catalog context: Bangkok, Thailand",
      "coordinateSource": "existing item-location index: LA-0717",
      "multiBaseChoices": false,
      "routingNote": "Representative city/place context only. Related items are choices, not a promise that all fit one base or a five-/nine-day trip. Actual access and transport require checks."
    },
    {
      "id": "hanoi",
      "title": "Hanoi neighborhoods & water-puppet tradition",
      "scope": "World",
      "regionIds": [],
      "relatedItemIds": [
        "LA-0729",
        "LA-1641"
      ],
      "cuisineIds": [
        "CU-036"
      ],
      "canonicalActivityIds": [],
      "editorialScore": 91,
      "reason": "The Old Quarter and a public water-puppet performance are distinctive place/cultural angles; a meal alone does not require the trip.",
      "visitedAliases": [],
      "lat": 21.03,
      "lon": 105.83,
      "precision": "city area",
      "mapLabel": "Hanoi city area; catalog context: Hanoi, Vietnam",
      "coordinateSource": "existing item-location index: LA-0729",
      "multiBaseChoices": false,
      "routingNote": "Representative city/place context only. Related items are choices, not a promise that all fit one base or a five-/nine-day trip. Actual access and transport require checks."
    },
    {
      "id": "mexico-city",
      "title": "Mexico City neighborhoods, markets & culture",
      "scope": "World",
      "regionIds": [],
      "relatedItemIds": [
        "LA-0722",
        "LA-0992",
        "LA-1145",
        "LA-1608"
      ],
      "cuisineIds": [
        "CU-077"
      ],
      "canonicalActivityIds": [],
      "editorialScore": 93,
      "reason": "A broad city anchor with neighborhood and food angles; distinct regional cooking remains more than a cuisine checkbox.",
      "visitedAliases": [],
      "lat": 19.43,
      "lon": -99.13,
      "precision": "city area",
      "mapLabel": "Mexico City city area; catalog context: Mexico City, Mexico",
      "coordinateSource": "existing item-location index: LA-0722",
      "multiBaseChoices": false,
      "routingNote": "Representative city/place context only. Related items are choices, not a promise that all fit one base or a five-/nine-day trip. Actual access and transport require checks."
    },
    {
      "id": "oaxaca",
      "title": "Oaxaca city, valley heritage & artisan learning",
      "scope": "World",
      "regionIds": [],
      "relatedItemIds": [
        "LA-0894",
        "LA-1422",
        "LA-1665",
        "LA-1666"
      ],
      "cuisineIds": [
        "CU-077"
      ],
      "canonicalActivityIds": [],
      "editorialScore": 93,
      "reason": "The heritage landscape and artisan-led practices are distinctive destination angles beyond first Mexican-food exposure.",
      "visitedAliases": [],
      "lat": 17.06,
      "lon": -96.73,
      "precision": "city area",
      "mapLabel": "Oaxaca City city area; catalog context: Oaxaca City, Mexico",
      "coordinateSource": "existing item-location index: LA-0894",
      "multiBaseChoices": false,
      "routingNote": "Representative city/place context only. Related items are choices, not a promise that all fit one base or a five-/nine-day trip. Actual access and transport require checks."
    },
    {
      "id": "rome",
      "title": "Rome & a chosen historic landscape",
      "scope": "World",
      "regionIds": [],
      "relatedItemIds": [
        "LA-0864",
        "LA-0841"
      ],
      "cuisineIds": [
        "CU-070"
      ],
      "canonicalActivityIds": [
        "handmade-pasta"
      ],
      "editorialScore": 92,
      "reason": "The city and Appian Way are specific historical anchors; an initial pasta lesson can be local or intentionally regional.",
      "visitedAliases": [],
      "lat": 41.9,
      "lon": 12.5,
      "precision": "city area",
      "mapLabel": "Rome city area; catalog context: Rome, Italy",
      "coordinateSource": "existing item-location index: LA-0864",
      "multiBaseChoices": false,
      "routingNote": "Representative city/place context only. Related items are choices, not a promise that all fit one base or a five-/nine-day trip. Actual access and transport require checks."
    },
    {
      "id": "bologna",
      "title": "Bologna & Emilia-Romagna food traditions",
      "scope": "World",
      "regionIds": [],
      "relatedItemIds": [
        "LA-0822",
        "LA-0841"
      ],
      "cuisineIds": [
        "CU-070"
      ],
      "canonicalActivityIds": [
        "handmade-pasta"
      ],
      "editorialScore": 90,
      "reason": "Neighborhood and regional food culture can anchor the visit; a generic first pasta skill can be done near home first.",
      "visitedAliases": [],
      "lat": 44.49,
      "lon": 11.34,
      "precision": "city area",
      "mapLabel": "Bologna city area; catalog context: Bologna, Italy",
      "coordinateSource": "existing item-location index: LA-0822",
      "multiBaseChoices": false,
      "routingNote": "Representative city/place context only. Related items are choices, not a promise that all fit one base or a five-/nine-day trip. Actual access and transport require checks."
    },
    {
      "id": "lisbon",
      "title": "Lisbon neighborhoods, riverfront & fado",
      "scope": "World",
      "regionIds": [],
      "relatedItemIds": [
        "LA-0730",
        "LA-0995",
        "LA-1041",
        "LA-0788",
        "LA-1602"
      ],
      "cuisineIds": [
        "CU-067"
      ],
      "canonicalActivityIds": [],
      "editorialScore": 92,
      "reason": "The city, tram context, and a fado evening are distinct angles; bakery skill exposure can also begin locally.",
      "visitedAliases": [],
      "lat": 38.72,
      "lon": -9.14,
      "precision": "city area",
      "mapLabel": "Lisbon city area; catalog context: Lisbon, Portugal",
      "coordinateSource": "existing item-location index: LA-0730",
      "multiBaseChoices": false,
      "routingNote": "Representative city/place context only. Related items are choices, not a promise that all fit one base or a five-/nine-day trip. Actual access and transport require checks."
    },
    {
      "id": "paris",
      "title": "Paris neighborhoods, museums & ordinary café life",
      "scope": "World",
      "regionIds": [],
      "relatedItemIds": [
        "LA-0723",
        "LA-0708",
        "LA-1129"
      ],
      "cuisineIds": [
        "CU-072"
      ],
      "canonicalActivityIds": [],
      "editorialScore": 91,
      "reason": "A deep city anchor for art and ordinary neighborhood experience; specific museums and venue calendars still need choosing.",
      "visitedAliases": [],
      "lat": 48.86,
      "lon": 2.35,
      "precision": "city area",
      "mapLabel": "Paris city area; catalog context: Paris, France",
      "coordinateSource": "existing item-location index: LA-0723",
      "multiBaseChoices": false,
      "routingNote": "Representative city/place context only. Related items are choices, not a promise that all fit one base or a five-/nine-day trip. Actual access and transport require checks."
    },
    {
      "id": "london",
      "title": "London neighborhoods, museums & public culture",
      "scope": "World",
      "regionIds": [],
      "relatedItemIds": [
        "LA-0721",
        "LA-1208"
      ],
      "cuisineIds": [],
      "canonicalActivityIds": [
        "public-lecture-discovery"
      ],
      "editorialScore": 89,
      "reason": "Neighborhoods and museums can anchor the place; a generic lecture is available locally. British-cuisine profiles are not yet in this catalog.",
      "visitedAliases": [],
      "lat": 51.51,
      "lon": -0.13,
      "precision": "city area",
      "mapLabel": "London city area; catalog context: London, United Kingdom",
      "coordinateSource": "existing item-location index: LA-0721",
      "multiBaseChoices": false,
      "routingNote": "Representative city/place context only. Related items are choices, not a promise that all fit one base or a five-/nine-day trip. Actual access and transport require checks."
    },
    {
      "id": "istanbul",
      "title": "Istanbul: neighborhoods, craft & performance",
      "scope": "World",
      "regionIds": [],
      "relatedItemIds": [
        "LA-0720",
        "LA-0999",
        "LA-0712",
        "LA-1658",
        "LA-1672",
        "LA-1595"
      ],
      "cuisineIds": [
        "CU-047"
      ],
      "canonicalActivityIds": [],
      "editorialScore": 93,
      "reason": "Historical city context, marbling, coffee traditions, and public performance provide different cultural angles.",
      "visitedAliases": [],
      "lat": 41.01,
      "lon": 28.98,
      "precision": "city area",
      "mapLabel": "Istanbul city area; catalog context: Istanbul, Türkiye",
      "coordinateSource": "existing item-location index: LA-0720",
      "multiBaseChoices": false,
      "routingNote": "Representative city/place context only. Related items are choices, not a promise that all fit one base or a five-/nine-day trip. Actual access and transport require checks."
    },
    {
      "id": "seoul",
      "title": "Seoul neighborhoods & public performance",
      "scope": "World",
      "regionIds": [],
      "relatedItemIds": [
        "LA-0733",
        "LA-0996",
        "LA-1568",
        "LA-1646",
        "LA-1647",
        "LA-0839"
      ],
      "cuisineIds": [
        "CU-031"
      ],
      "canonicalActivityIds": [],
      "editorialScore": 91,
      "reason": "Neighborhood exploration and Korean cultural practice can be distinctive even when the cuisine is familiar.",
      "visitedAliases": [],
      "lat": 37.57,
      "lon": 126.98,
      "precision": "city area",
      "mapLabel": "Seoul city area; catalog context: Seoul, South Korea",
      "coordinateSource": "existing item-location index: LA-0733",
      "multiBaseChoices": false,
      "routingNote": "Representative city/place context only. Related items are choices, not a promise that all fit one base or a five-/nine-day trip. Actual access and transport require checks."
    },
    {
      "id": "taipei",
      "title": "Taipei markets, tea & a selected local practice",
      "scope": "World",
      "regionIds": [],
      "relatedItemIds": [
        "LA-0735",
        "LA-0703",
        "LA-0705",
        "LA-1562",
        "LA-1563"
      ],
      "cuisineIds": [
        "CU-026"
      ],
      "canonicalActivityIds": [],
      "editorialScore": 91,
      "reason": "Markets and tea rituals anchor the place; cuisine familiarity does not complete these particular experiences.",
      "visitedAliases": [],
      "lat": 25.03,
      "lon": 121.57,
      "precision": "city area",
      "mapLabel": "Taipei city area; catalog context: Taipei, Taiwan",
      "coordinateSource": "existing item-location index: LA-0735",
      "multiBaseChoices": false,
      "routingNote": "Representative city/place context only. Related items are choices, not a promise that all fit one base or a five-/nine-day trip. Actual access and transport require checks."
    },
    {
      "id": "singapore",
      "title": "Singapore neighborhoods & hawker culture",
      "scope": "World",
      "regionIds": [],
      "relatedItemIds": [
        "LA-0817",
        "LA-0809"
      ],
      "cuisineIds": [
        "CU-039"
      ],
      "canonicalActivityIds": [],
      "editorialScore": 89,
      "reason": "Neighborhood and hawker context can be a place-led goal; an initial cuisine exposure is available through local research too.",
      "visitedAliases": [],
      "lat": 1.35,
      "lon": 103.82,
      "precision": "city area",
      "mapLabel": "Singapore city area; catalog context: Singapore, Singapore",
      "coordinateSource": "existing item-location index: LA-0817",
      "multiBaseChoices": false,
      "routingNote": "Representative city/place context only. Related items are choices, not a promise that all fit one base or a five-/nine-day trip. Actual access and transport require checks."
    },
    {
      "id": "hyderabad",
      "title": "Hyderabad & selected Telugu cultural/food angles",
      "scope": "World",
      "regionIds": [],
      "relatedItemIds": [
        "LA-1528",
        "LA-1531",
        "LA-1532",
        "LA-1626",
        "LA-1633",
        "LA-1635"
      ],
      "cuisineIds": [
        "CU-002",
        "CU-003"
      ],
      "canonicalActivityIds": [],
      "editorialScore": 89,
      "reason": "City food traditions and selected Telugu performances/crafts provide specific angles. A broad India visit does not imply this city was visited.",
      "visitedAliases": [],
      "lat": 17.39,
      "lon": 78.49,
      "precision": "city area",
      "mapLabel": "Hyderabad city area; catalog context: Hyderabad, Telangana",
      "coordinateSource": "existing item-location index: LA-1531",
      "multiBaseChoices": false,
      "routingNote": "Representative city/place context only. Related items are choices, not a promise that all fit one base or a five-/nine-day trip. Actual access and transport require checks."
    },
    {
      "id": "salento-colombia",
      "title": "Salento & Colombia’s coffee landscape",
      "scope": "World",
      "regionIds": [],
      "relatedItemIds": [
        "LA-0990",
        "LA-1028",
        "LA-0714"
      ],
      "cuisineIds": [
        "CU-083"
      ],
      "canonicalActivityIds": [],
      "editorialScore": 89,
      "reason": "The cultivated landscape and learning from coffee growers are destination-specific; a generic coffee tasting is a separate local option.",
      "visitedAliases": [],
      "lat": 4.64,
      "lon": -75.57,
      "precision": "city area",
      "mapLabel": "Salento context; Manizales and other coffee farms are separate choices.",
      "coordinateSource": "existing item-location index: LA-0990",
      "multiBaseChoices": true,
      "routingNote": "Representative city/place context only. Related items are choices, not a promise that all fit one base or a five-/nine-day trip. Actual access and transport require checks. Select a sector or allocate the distinct base/transfer days before counting coverage."
    },
    {
      "id": "northern-california",
      "title": "Northern California forest and volcanic chapters",
      "scope": "USA",
      "regionIds": [
        "northern-california"
      ],
      "relatedItemIds": [
        "LA-0161",
        "LA-0404",
        "LA-0633",
        "LA-0557"
      ],
      "cuisineIds": [],
      "canonicalActivityIds": [
        "redwood-parks-visit"
      ],
      "editorialScore": 89,
      "reason": "Choose one northern sector for a short break; redwood, Lassen, and Shasta experiences need different bases and transfers in a broader route.",
      "visitedAliases": [],
      "lat": 41.76,
      "lon": -124.2,
      "precision": "city area",
      "mapLabel": "Crescent City/redwood context; Lassen and Shasta need different bases.",
      "coordinateSource": "existing item-location index: LA-0161",
      "multiBaseChoices": true,
      "routingNote": "Representative city/place context only. Related items are choices, not a promise that all fit one base or a five-/nine-day trip. Actual access and transport require checks. Select a sector or allocate the distinct base/transfer days before counting coverage."
    },
    {
      "id": "tucson-sonoran",
      "title": "Tucson & selected Sonoran Desert outings",
      "scope": "USA",
      "regionIds": [
        "southern-arizona"
      ],
      "relatedItemIds": [
        "LA-0176",
        "LA-0116",
        "LA-0394",
        "LA-0543",
        "LA-0548"
      ],
      "cuisineIds": [
        "CU-091"
      ],
      "canonicalActivityIds": [],
      "editorialScore": 87,
      "reason": "Saguaro landscapes and a chosen cave or desert outing offer real regional goals. Benson and Organ Pipe require different road legs; a short trip should choose its sector.",
      "visitedAliases": [
        "tucson"
      ],
      "lat": 32.22,
      "lon": -110.97,
      "precision": "city area",
      "mapLabel": "Tucson gateway; Benson/Kartchner and Organ Pipe require separate road legs.",
      "coordinateSource": "existing item-location index: LA-0176",
      "multiBaseChoices": true,
      "routingNote": "Representative city/place context only. Related items are choices, not a promise that all fit one base or a five-/nine-day trip. Actual access and transport require checks. Select a sector or allocate the distinct base/transfer days before counting coverage."
    },
    {
      "id": "death-valley",
      "title": "Death Valley landscapes & a dark-sky choice",
      "scope": "USA",
      "regionIds": [
        "las-vegas-desert"
      ],
      "relatedItemIds": [
        "LA-0172",
        "LA-0077",
        "LA-1101"
      ],
      "cuisineIds": [],
      "canonicalActivityIds": [],
      "editorialScore": 89,
      "reason": "Extreme desert landscapes and a known dark-sky park context offer distinct goals. Night-sky quality, heat, access, and a safe route still depend on actual conditions.",
      "visitedAliases": [],
      "lat": 36.46,
      "lon": -116.87,
      "precision": "city area",
      "mapLabel": "Furnace Creek context in Death Valley; specific park/night-sky routes vary.",
      "coordinateSource": "existing item-location index: LA-0172",
      "multiBaseChoices": false,
      "routingNote": "Representative city/place context only. Related items are choices, not a promise that all fit one base or a five-/nine-day trip. Actual access and transport require checks."
    },
    {
      "id": "joshua-tree",
      "title": "Joshua Tree desert landscapes",
      "scope": "USA",
      "regionIds": [
        "los-angeles"
      ],
      "relatedItemIds": [
        "LA-0175",
        "LA-1101"
      ],
      "cuisineIds": [],
      "canonicalActivityIds": [],
      "editorialScore": 87,
      "reason": "The named desert park offers a specific landscape and a known dark-sky context. Darkness and access are conditions to check, not guaranteed by a city marker.",
      "visitedAliases": [],
      "lat": 34.14,
      "lon": -116.05,
      "precision": "city area",
      "mapLabel": "Twentynine Palms city-area gateway; this is not an exact Joshua Tree entrance.",
      "coordinateSource": "rounded city-area context for the named catalog gateway; source item LA-0175 has a Los Angeles fallback",
      "multiBaseChoices": false,
      "routingNote": "Representative city/place context only. Related items are choices, not a promise that all fit one base or a five-/nine-day trip. Actual access and transport require checks."
    },
    {
      "id": "las-vegas",
      "title": "Las Vegas & selected nearby desert/engineering days",
      "scope": "USA",
      "regionIds": [
        "las-vegas-desert"
      ],
      "relatedItemIds": [
        "LA-0354",
        "LA-0177",
        "LA-0181"
      ],
      "cuisineIds": [],
      "canonicalActivityIds": [],
      "editorialScore": 86,
      "reason": "City exploration, Valley of Fire, and Hoover Dam are distinct choices from a gateway base. A shared airport does not make every desert outing one local stop.",
      "visitedAliases": [
        "las vegas"
      ],
      "lat": 36.17,
      "lon": -115.14,
      "precision": "city area",
      "mapLabel": "Las Vegas gateway; Valley of Fire and Hoover Dam are separate road outings.",
      "coordinateSource": "existing item-location index: LA-0354",
      "multiBaseChoices": false,
      "routingNote": "Representative city/place context only. Related items are choices, not a promise that all fit one base or a five-/nine-day trip. Actual access and transport require checks."
    },
    {
      "id": "atlanta",
      "title": "Atlanta public history, neighborhoods & science",
      "scope": "USA",
      "regionIds": [
        "atlanta-alabama"
      ],
      "relatedItemIds": [
        "LA-0148",
        "LA-0624",
        "LA-0697"
      ],
      "cuisineIds": [],
      "canonicalActivityIds": [],
      "editorialScore": 86,
      "reason": "Civil-rights history, public urban space, and marine-science learning supply actual city goals. Other Alabama history sites belong to a separate regional route.",
      "visitedAliases": [
        "atlanta"
      ],
      "lat": 33.75,
      "lon": -84.39,
      "precision": "city area",
      "mapLabel": "Atlanta, GA",
      "coordinateSource": "existing item-location index: LA-0624",
      "multiBaseChoices": false,
      "routingNote": "Representative city/place context only. Related items are choices, not a promise that all fit one base or a five-/nine-day trip. Actual access and transport require checks."
    },
    {
      "id": "lowcountry",
      "title": "Savannah or Charleston: choose a Lowcountry base",
      "scope": "USA",
      "regionIds": [
        "lowcountry"
      ],
      "relatedItemIds": [
        "LA-0048",
        "LA-0314",
        "LA-0334",
        "LA-0350",
        "LA-0050",
        "LA-0151",
        "LA-0218",
        "LA-0264",
        "LA-0392",
        "LA-0439"
      ],
      "cuisineIds": [
        "CU-092"
      ],
      "canonicalActivityIds": [],
      "editorialScore": 89,
      "reason": "Historic neighborhoods, locally interpreted heritage, food, and marsh ecology offer different angles. Savannah and Charleston are separate bases rather than aliases for one city.",
      "visitedAliases": [
        "savannah",
        "charleston"
      ],
      "lat": 32.78,
      "lon": -79.93,
      "precision": "city area",
      "mapLabel": "Charleston city context; Savannah is a separate Lowcountry base choice.",
      "coordinateSource": "existing item-location index: LA-0050",
      "multiBaseChoices": true,
      "routingNote": "Representative city/place context only. Related items are choices, not a promise that all fit one base or a five-/nine-day trip. Actual access and transport require checks. Select a sector or allocate the distinct base/transfer days before counting coverage."
    },
    {
      "id": "philadelphia",
      "title": "Philadelphia history, markets & public culture",
      "scope": "USA",
      "regionIds": [
        "new-york-philadelphia"
      ],
      "relatedItemIds": [
        "LA-0047",
        "LA-0125",
        "LA-0145",
        "LA-0202",
        "LA-0348",
        "LA-0585",
        "LA-0594"
      ],
      "cuisineIds": [],
      "canonicalActivityIds": [],
      "editorialScore": 89,
      "reason": "Founding-history places, an old food hall, gardens, and neighborhood exploration provide several actual city goals. The current cuisine taxonomy does not cover every local food tradition.",
      "visitedAliases": [
        "philadelphia"
      ],
      "lat": 39.95,
      "lon": -75.17,
      "precision": "city area",
      "mapLabel": "Philadelphia, PA",
      "coordinateSource": "existing item-location index: LA-0348",
      "multiBaseChoices": false,
      "routingNote": "Representative city/place context only. Related items are choices, not a promise that all fit one base or a five-/nine-day trip. Actual access and transport require checks."
    },
    {
      "id": "banff-rockies",
      "title": "Canadian Rockies: Banff & a chosen parkway sector",
      "scope": "World",
      "regionIds": [],
      "relatedItemIds": [
        "LA-0943"
      ],
      "cuisineIds": [],
      "canonicalActivityIds": [],
      "editorialScore": 91,
      "reason": "The catalog names Banff, Lake Louise, and the Icefields Parkway as a real landscape route. Choose bases and road sectors; the full region is not a single five-day promise.",
      "visitedAliases": [
        "banff"
      ],
      "lat": 51.18,
      "lon": -115.57,
      "precision": "city area",
      "mapLabel": "Banff gateway; Lake Louise/Jasper/parkway sectors require route/base choices.",
      "coordinateSource": "existing item-location index: LA-0943",
      "multiBaseChoices": true,
      "routingNote": "Representative city/place context only. Related items are choices, not a promise that all fit one base or a five-/nine-day trip. Actual access and transport require checks. Select a sector or allocate the distinct base/transfer days before counting coverage."
    },
    {
      "id": "vancouver",
      "title": "Vancouver neighborhoods & waterfront life",
      "scope": "World",
      "regionIds": [],
      "relatedItemIds": [
        "LA-0745",
        "LA-1002"
      ],
      "cuisineIds": [],
      "canonicalActivityIds": [],
      "editorialScore": 88,
      "reason": "A real city/waterfront anchor pairs with a separate slow-living goal. A short visit does not automatically fulfill a longer stay or work-from-city experience.",
      "visitedAliases": [
        "vancouver"
      ],
      "lat": 49.28,
      "lon": -123.12,
      "precision": "city area",
      "mapLabel": "Vancouver city area; catalog context: Vancouver, Canada",
      "coordinateSource": "existing item-location index: LA-0745",
      "multiBaseChoices": false,
      "routingNote": "Representative city/place context only. Related items are choices, not a promise that all fit one base or a five-/nine-day trip. Actual access and transport require checks."
    },
    {
      "id": "new-zealand-south-island",
      "title": "South Island: choose Fiordland or Aoraki/Mackenzie",
      "scope": "World",
      "regionIds": [],
      "relatedItemIds": [
        "LA-0945",
        "LA-0948"
      ],
      "cuisineIds": [
        "CU-099"
      ],
      "canonicalActivityIds": [],
      "editorialScore": 92,
      "reason": "Fiordland and the Aoraki/Mackenzie landscape are actual catalog choices with different gateways. California travel and internal road legs need substantial calendar allowance.",
      "visitedAliases": [],
      "lat": -45.41,
      "lon": 167.72,
      "precision": "city area",
      "mapLabel": "Te Anau/Fiordland gateway; Aoraki/Twizel requires a separate base.",
      "coordinateSource": "existing item-location index: LA-0945",
      "multiBaseChoices": true,
      "routingNote": "Representative city/place context only. Related items are choices, not a promise that all fit one base or a five-/nine-day trip. Actual access and transport require checks. Select a sector or allocate the distinct base/transfer days before counting coverage. The California journey and date-line/connection effects need explicit calendar allowances; choose a single South Island sector for a short visit."
    },
    {
      "id": "iceland-south-coast",
      "title": "Iceland: Reykjavík & a chosen south-coast sector",
      "scope": "World",
      "regionIds": [],
      "relatedItemIds": [
        "LA-0754",
        "LA-0790",
        "LA-0963",
        "LA-0969"
      ],
      "cuisineIds": [],
      "canonicalActivityIds": [],
      "editorialScore": 92,
      "reason": "Public pool culture and the named south-coast landscape provide distinct goals. Skaftafell and guided ice-cave access require choosing a route, season, and provider.",
      "visitedAliases": [
        "reykjavik",
        "reykjavík"
      ],
      "lat": 64.15,
      "lon": -21.94,
      "precision": "city area",
      "mapLabel": "Reykjavík city context; Vík/Skaftafell and ice-cave routes require transfers.",
      "coordinateSource": "existing item-location index: LA-0754",
      "multiBaseChoices": true,
      "routingNote": "Representative city/place context only. Related items are choices, not a promise that all fit one base or a five-/nine-day trip. Actual access and transport require checks. Select a sector or allocate the distinct base/transfer days before counting coverage."
    },
    {
      "id": "swiss-bernese-alps",
      "title": "Bernese Alps & a chosen mountain-rail angle",
      "scope": "World",
      "regionIds": [],
      "relatedItemIds": [
        "LA-0949",
        "LA-0935",
        "LA-1044"
      ],
      "cuisineIds": [],
      "canonicalActivityIds": [],
      "editorialScore": 91,
      "reason": "The Bernese Oberland/Jungfrau context is an actual landscape anchor. Country-level cable-car and rack-rail examples require choosing the real line and mountain base.",
      "visitedAliases": [],
      "lat": 46.69,
      "lon": 7.86,
      "precision": "city area",
      "mapLabel": "Interlaken gateway; choose the actual Bernese mountain base/rail line.",
      "coordinateSource": "existing item-location index: LA-0949",
      "multiBaseChoices": true,
      "routingNote": "Representative city/place context only. Related items are choices, not a promise that all fit one base or a five-/nine-day trip. Actual access and transport require checks. Select a sector or allocate the distinct base/transfer days before counting coverage."
    },
    {
      "id": "porto-douro",
      "title": "Porto & a chosen Douro landscape chapter",
      "scope": "World",
      "regionIds": [],
      "relatedItemIds": [
        "LA-0741",
        "LA-1602"
      ],
      "cuisineIds": [
        "CU-067"
      ],
      "canonicalActivityIds": [],
      "editorialScore": 90,
      "reason": "The city, river landscape, and a possible Portuguese baking introduction are real catalog contexts. The Douro is a separate route choice and wine tasting is optional.",
      "visitedAliases": [
        "porto"
      ],
      "lat": 41.15,
      "lon": -8.61,
      "precision": "city area",
      "mapLabel": "Porto city context; Douro Valley towns are separate route choices.",
      "coordinateSource": "existing item-location index: LA-0741",
      "multiBaseChoices": true,
      "routingNote": "Representative city/place context only. Related items are choices, not a promise that all fit one base or a five-/nine-day trip. Actual access and transport require checks. Select a sector or allocate the distinct base/transfer days before counting coverage."
    },
    {
      "id": "barcelona",
      "title": "Barcelona & Catalan neighborhoods",
      "scope": "World",
      "regionIds": [],
      "relatedItemIds": [
        "LA-0726"
      ],
      "cuisineIds": [
        "CU-068"
      ],
      "canonicalActivityIds": [],
      "editorialScore": 90,
      "reason": "A named city/neighborhood goal anchors this stop. The linked Spanish profile is broad; it does not equate Catalan regional traditions with every other Spanish cuisine.",
      "visitedAliases": [
        "barcelona"
      ],
      "lat": 41.39,
      "lon": 2.17,
      "precision": "city area",
      "mapLabel": "Barcelona city area; catalog context: Barcelona, Spain",
      "coordinateSource": "existing item-location index: LA-0726",
      "multiBaseChoices": false,
      "routingNote": "Representative city/place context only. Related items are choices, not a promise that all fit one base or a five-/nine-day trip. Actual access and transport require checks."
    },
    {
      "id": "amsterdam",
      "title": "Amsterdam canals & a chosen Dutch cycling context",
      "scope": "World",
      "regionIds": [],
      "relatedItemIds": [
        "LA-0736",
        "LA-0928"
      ],
      "cuisineIds": [],
      "canonicalActivityIds": [],
      "editorialScore": 89,
      "reason": "Canal neighborhoods and a separately chosen dedicated cycle path offer actual catalog goals. The cycle-path example is country-level, not a located Amsterdam venue.",
      "visitedAliases": [
        "amsterdam"
      ],
      "lat": 52.37,
      "lon": 4.9,
      "precision": "city area",
      "mapLabel": "Amsterdam city area; catalog context: Amsterdam, Netherlands",
      "coordinateSource": "existing item-location index: LA-0736",
      "multiBaseChoices": false,
      "routingNote": "Representative city/place context only. Related items are choices, not a promise that all fit one base or a five-/nine-day trip. Actual access and transport require checks."
    },
    {
      "id": "bali",
      "title": "Bali: choose Ubud, Sidemen or a coastal base",
      "scope": "World",
      "regionIds": [],
      "relatedItemIds": [
        "LA-0737",
        "LA-1642"
      ],
      "cuisineIds": [
        "CU-037"
      ],
      "canonicalActivityIds": [],
      "editorialScore": 90,
      "reason": "The Bali landscape/neighborhood record and a public gamelan-performance alternative are real choices. Ubud, Sidemen, and coast outings need separate route decisions.",
      "visitedAliases": [],
      "lat": -8.51,
      "lon": 115.26,
      "precision": "city area",
      "mapLabel": "Ubud context on Bali; Sidemen and coast sectors need separate route choices.",
      "coordinateSource": "existing item-location index: LA-0737",
      "multiBaseChoices": true,
      "routingNote": "Representative city/place context only. Related items are choices, not a promise that all fit one base or a five-/nine-day trip. Actual access and transport require checks. Select a sector or allocate the distinct base/transfer days before counting coverage."
    },
    {
      "id": "penang",
      "title": "George Town, Penang neighborhood & food culture",
      "scope": "World",
      "regionIds": [],
      "relatedItemIds": [
        "LA-0816"
      ],
      "cuisineIds": [
        "CU-038"
      ],
      "canonicalActivityIds": [],
      "editorialScore": 91,
      "reason": "George Town is a specific catalog city/food-culture anchor. First Malaysian cuisine exposure can also happen locally; the heritage streets remain a place-led goal.",
      "visitedAliases": [
        "george town",
        "penang"
      ],
      "lat": 5.41,
      "lon": 100.34,
      "precision": "city area",
      "mapLabel": "George Town city area; catalog context: George Town, Malaysia",
      "coordinateSource": "existing item-location index: LA-0816",
      "multiBaseChoices": false,
      "routingNote": "Representative city/place context only. Related items are choices, not a promise that all fit one base or a five-/nine-day trip. Actual access and transport require checks."
    },
    {
      "id": "kuala-lumpur",
      "title": "Kuala Lumpur food & public pewter-craft choices",
      "scope": "World",
      "regionIds": [],
      "relatedItemIds": [
        "LA-1577",
        "LA-1645"
      ],
      "cuisineIds": [
        "CU-038"
      ],
      "canonicalActivityIds": [],
      "editorialScore": 86,
      "reason": "The catalog explicitly places a food example and public pewter workshop in Kuala Lumpur. City-wide coverage is limited; these are choices, not proof of a complete city itinerary.",
      "visitedAliases": [
        "kuala lumpur"
      ],
      "lat": 3.14,
      "lon": 101.69,
      "precision": "city area",
      "mapLabel": "Kuala Lumpur city area; catalog context: Kuala Lumpur",
      "coordinateSource": "existing item-location index: LA-1645",
      "multiBaseChoices": false,
      "routingNote": "Representative city/place context only. Related items are choices, not a promise that all fit one base or a five-/nine-day trip. Actual access and transport require checks."
    },
    {
      "id": "chiang-mai",
      "title": "Chiang Mai & northern Thai food culture",
      "scope": "World",
      "regionIds": [],
      "relatedItemIds": [
        "LA-0738",
        "LA-1572"
      ],
      "cuisineIds": [
        "CU-035"
      ],
      "canonicalActivityIds": [],
      "editorialScore": 90,
      "reason": "A specific northern-city anchor and a named food alternative are grounded in the catalog. A first Thai meal can be local; regional context remains a distinct angle.",
      "visitedAliases": [
        "chiang mai"
      ],
      "lat": 18.79,
      "lon": 98.99,
      "precision": "city area",
      "mapLabel": "Chiang Mai city area; catalog context: Chiang Mai, Thailand",
      "coordinateSource": "existing item-location index: LA-0738",
      "multiBaseChoices": false,
      "routingNote": "Representative city/place context only. Related items are choices, not a promise that all fit one base or a five-/nine-day trip. Actual access and transport require checks."
    },
    {
      "id": "ho-chi-minh-city",
      "title": "Ho Chi Minh City & a chosen Mekong gateway angle",
      "scope": "World",
      "regionIds": [],
      "relatedItemIds": [
        "LA-0740",
        "LA-1574"
      ],
      "cuisineIds": [
        "CU-036"
      ],
      "canonicalActivityIds": [],
      "editorialScore": 89,
      "reason": "The named city/gateway goal and a southern-Vietnam food alternative supply actual contexts. A Mekong excursion needs its own route and transport decision.",
      "visitedAliases": [
        "ho chi minh city"
      ],
      "lat": 10.82,
      "lon": 106.63,
      "precision": "city area",
      "mapLabel": "Ho Chi Minh City context; a Mekong outing has separate transport/access.",
      "coordinateSource": "existing item-location index: LA-0740",
      "multiBaseChoices": false,
      "routingNote": "Representative city/place context only. Related items are choices, not a promise that all fit one base or a five-/nine-day trip. Actual access and transport require checks."
    },
    {
      "id": "kerala",
      "title": "Kerala: choose backwaters, culture or hill country",
      "scope": "World",
      "regionIds": [],
      "relatedItemIds": [
        "LA-0904",
        "LA-0807",
        "LA-1536"
      ],
      "cuisineIds": [
        "CU-005"
      ],
      "canonicalActivityIds": [],
      "editorialScore": 91,
      "reason": "Backwaters/hill-country choices, a public Kathakali performance, and sadya are real catalog goals. Kochi, Alappuzha, and Munnar are different bases; a broad India visit does not complete them.",
      "visitedAliases": [
        "kochi",
        "kerala",
        "alappuzha",
        "munnar"
      ],
      "lat": 9.93,
      "lon": 76.26,
      "precision": "city area",
      "mapLabel": "Kochi gateway; Alappuzha and Munnar are separate backwater/hill bases.",
      "coordinateSource": "existing item-location index: LA-0904",
      "multiBaseChoices": true,
      "routingNote": "Representative city/place context only. Related items are choices, not a promise that all fit one base or a five-/nine-day trip. Actual access and transport require checks. Select a sector or allocate the distinct base/transfer days before counting coverage."
    },
    {
      "id": "rajasthan",
      "title": "Rajasthan: choose a fort-city corridor",
      "scope": "World",
      "regionIds": [],
      "relatedItemIds": [
        "LA-0950",
        "LA-1544"
      ],
      "cuisineIds": [
        "CU-010"
      ],
      "canonicalActivityIds": [],
      "editorialScore": 91,
      "reason": "The catalog names Jaipur/Jodhpur/Jaisalmer and a regional food example. Select a corridor; these cities are not one compact sightseeing base.",
      "visitedAliases": [
        "jaipur",
        "jodhpur",
        "jaisalmer"
      ],
      "lat": 26.91,
      "lon": 75.79,
      "precision": "city area",
      "mapLabel": "Jaipur context; Jodhpur and Jaisalmer are separate fort-city choices.",
      "coordinateSource": "existing item-location index: LA-0950",
      "multiBaseChoices": true,
      "routingNote": "Representative city/place context only. Related items are choices, not a promise that all fit one base or a five-/nine-day trip. Actual access and transport require checks. Select a sector or allocate the distinct base/transfer days before counting coverage."
    },
    {
      "id": "cape-town",
      "title": "Cape Town neighborhoods & a selected coastal angle",
      "scope": "World",
      "regionIds": [],
      "relatedItemIds": [
        "LA-0718",
        "LA-0993",
        "LA-1589"
      ],
      "cuisineIds": [
        "CU-062"
      ],
      "canonicalActivityIds": [],
      "editorialScore": 91,
      "reason": "Cape Town city/coast goals and a named food-learning alternative are actual contexts. Kruger is a separate domestic sector, not a local Cape Town nature day.",
      "visitedAliases": [
        "cape town"
      ],
      "lat": -33.92,
      "lon": 18.42,
      "precision": "city area",
      "mapLabel": "Cape Town city context; Kruger is a separate domestic travel sector.",
      "coordinateSource": "existing item-location index: LA-0718",
      "multiBaseChoices": false,
      "routingNote": "Representative city/place context only. Related items are choices, not a promise that all fit one base or a five-/nine-day trip. Actual access and transport require checks. Cape Town and Kruger should not be combined into a default nine-day California trip; the domestic sector and intercontinental travel consume separate calendar time."
    },
    {
      "id": "peru-sacred-valley",
      "title": "Cusco & a chosen Sacred Valley heritage chapter",
      "scope": "World",
      "regionIds": [],
      "relatedItemIds": [
        "LA-0861",
        "LA-1669"
      ],
      "cuisineIds": [
        "CU-085"
      ],
      "canonicalActivityIds": [],
      "editorialScore": 93,
      "reason": "The catalog links Machu Picchu/Sacred Valley and practitioner-led weaving to the Cusco region. Choose altitude adaptation, bases, permits, and guidance before counting a short route.",
      "visitedAliases": [
        "cusco"
      ],
      "lat": -13.53,
      "lon": -71.97,
      "precision": "city area",
      "mapLabel": "Cusco gateway; Sacred Valley/Machu Picchu access requires separate planning.",
      "coordinateSource": "existing item-location index: LA-0861",
      "multiBaseChoices": true,
      "routingNote": "Representative city/place context only. Related items are choices, not a promise that all fit one base or a five-/nine-day trip. Actual access and transport require checks. Select a sector or allocate the distinct base/transfer days before counting coverage."
    },
    {
      "id": "marrakech",
      "title": "Marrakech medina & a chosen local cultural angle",
      "scope": "World",
      "regionIds": [],
      "relatedItemIds": [
        "LA-0731",
        "LA-1000",
        "LA-1581"
      ],
      "cuisineIds": [
        "CU-053"
      ],
      "canonicalActivityIds": [],
      "editorialScore": 90,
      "reason": "The medina/riad context and a named folding/cooking example are actual city choices. Longer work/stay goals and Atlas/Sahara extensions are separate commitments.",
      "visitedAliases": [
        "marrakech"
      ],
      "lat": 31.63,
      "lon": -7.98,
      "precision": "city area",
      "mapLabel": "Marrakech city area; catalog context: Marrakech, Morocco",
      "coordinateSource": "existing item-location index: LA-0731",
      "multiBaseChoices": false,
      "routingNote": "Representative city/place context only. Related items are choices, not a promise that all fit one base or a five-/nine-day trip. Actual access and transport require checks."
    },
    {
      "id": "kruger",
      "title": "Kruger: choose a park sector and access base",
      "scope": "World",
      "regionIds": [],
      "relatedItemIds": [
        "LA-1081"
      ],
      "cuisineIds": [],
      "canonicalActivityIds": [],
      "editorialScore": 93,
      "reason": "The named wildlife landscape is an actual catalog goal. Select an appropriate sector, permitted provider, and access base; this is a separate South African journey from Cape Town.",
      "visitedAliases": [],
      "lat": -24.0,
      "lon": 31.5,
      "precision": "place area",
      "mapLabel": "Kruger park-area context; choose a sector, entry gateway, and permitted provider.",
      "coordinateSource": "existing item-location index: LA-1081",
      "multiBaseChoices": true,
      "routingNote": "Representative city/place context only. Related items are choices, not a promise that all fit one base or a five-/nine-day trip. Actual access and transport require checks. Select a sector or allocate the distinct base/transfer days before counting coverage. Cape Town and Kruger should not be combined into a default nine-day California trip; the domestic sector and intercontinental travel consume separate calendar time."
    }
  ],
  "categorySeeds": {
    "Nature & wildlife": [
      "LA-0406",
      "LA-0161",
      "LA-0413",
      "LA-0411",
      "LA-0399",
      "LA-0362",
      "LA-0678",
      "LA-1102",
      "LA-1101",
      "LA-0664"
    ],
    "Places & heritage": [
      "LA-0046",
      "LA-0045",
      "LA-0053",
      "LA-0141",
      "LA-0274",
      "LA-0278",
      "LA-0717",
      "LA-0722",
      "LA-0859",
      "LA-1422"
    ],
    "Adventure & movement": [
      "LA-0001",
      "LA-0004",
      "LA-1737",
      "LA-1727",
      "LA-1733",
      "LA-1741",
      "LA-1094",
      "LA-0937",
      "LA-0247",
      "LA-1726"
    ],
    "Journeys & transport": [
      "LA-1323",
      "LA-0029",
      "LA-0465",
      "LA-0463",
      "LA-0457",
      "LA-1041",
      "LA-0991",
      "LA-1016",
      "LA-1492",
      "LA-1321"
    ],
    "Food & drink": [
      "LA-1569",
      "LA-1608",
      "LA-1572",
      "LA-1577",
      "LA-1564",
      "LA-1565",
      "LA-1580",
      "LA-0841",
      "LA-1522",
      "LA-1531"
    ],
    "Arts & living culture": [
      "LA-0370",
      "LA-0055",
      "LA-0371",
      "LA-0451",
      "LA-0792",
      "LA-1096",
      "LA-1194",
      "LA-1641",
      "LA-1658",
      "LA-1667"
    ],
    "Learning & making": [
      "LA-0641",
      "LA-1168",
      "LA-1272",
      "LA-1169",
      "LA-1676",
      "LA-1351",
      "LA-1284",
      "LA-1717",
      "LA-1279",
      "LA-1724"
    ],
    "Everyday & local": [
      "LA-1220",
      "LA-1150",
      "LA-1147",
      "LA-1148",
      "LA-1230",
      "LA-1238",
      "LA-1769",
      "LA-1754",
      "LA-1774",
      "LA-1131"
    ],
    "Connection & contribution": [
      "LA-1116",
      "LA-0637",
      "LA-0638",
      "LA-1134",
      "LA-1260",
      "LA-1247",
      "LA-1255",
      "LA-1792",
      "LA-1793",
      "LA-1132"
    ],
    "Personal life & reflection": [
      "LA-1209",
      "LA-1225",
      "LA-1305",
      "LA-1308",
      "LA-1222",
      "LA-1307",
      "LA-1313",
      "LA-1345",
      "LA-1216",
      "LA-1818"
    ]
  },
  "itemOverrides": {
    "LA-0241": {
      "classification": "dedicated-trip",
      "reason": "Rim-to-Rim is a substantial canyon journey requiring preparation, logistics, and suitable conditions."
    },
    "LA-0247": {
      "classification": "dedicated-trip",
      "reason": "Half Dome is a substantial permit-dependent hiking goal, not a casual extra day."
    },
    "LA-0248": {
      "classification": "dedicated-trip",
      "reason": "The full Kalalau route is remote and demanding; route length, access, and support must be chosen."
    },
    "LA-0931": {
      "classification": "dedicated-trip",
      "reason": "This named multi-day trek needs its own route and preparation."
    },
    "LA-0937": {
      "classification": "dedicated-trip",
      "reason": "A via ferrata requires an appropriate route, equipment, and qualified guidance."
    },
    "LA-1102": {
      "classification": "dedicated-trip",
      "reason": "A total solar eclipse needs a future path/timing decision and safe viewing; no destination or date is assumed."
    },
    "LA-0614": {
      "classification": "dedicated-trip",
      "reason": "This future eclipse opportunity needs a path and timing decision."
    },
    "LA-0422": {
      "classification": "dedicated-trip",
      "reason": "A Fairbanks aurora attempt is a separate northern/seasonal Alaska journey; sightings are uncertain."
    },
    "LA-0426": {
      "classification": "dedicated-trip",
      "reason": "The remote Dalton Highway aurora journey has distinct winter travel and support requirements."
    },
    "LA-0427": {
      "classification": "dedicated-trip",
      "reason": "Fairbanks aurora viewing is seasonal and does not fit automatically into a south-central Alaska route."
    },
    "LA-0991": {
      "classification": "dedicated-trip",
      "reason": "This named Norwegian rail landscape can be a deliberate journey; it is not credited by another scenic train."
    },
    "LA-1016": {
      "classification": "dedicated-trip",
      "reason": "The Bernina route is a distinct alpine rail journey."
    },
    "LA-1492": {
      "classification": "dedicated-trip",
      "reason": "The Rhodope Railway is a distinct regional rail journey."
    },
    "LA-0571": {
      "classification": "while-there",
      "reason": "Pipeline is an advanced-wave viewing/place goal. Watching from an appropriate public area does not cover beginner surfing."
    },
    "LA-0575": {
      "classification": "local-option",
      "reason": "Mavericks is a nearby advanced-wave viewing/place goal; beginner learning needs a separate suitable lesson."
    },
    "LA-0576": {
      "classification": "local-option",
      "reason": "Steamer Lane is a nearby advanced surf scene, not a beginner lesson."
    },
    "LA-0577": {
      "classification": "while-there",
      "reason": "Trestles is a specific surf scene; it is not treated as equivalent to learning on a beginner beach."
    }
  },
  "locationQualifiers": {
    "LA-1055": "Portugal/Hawaiʻi are alternative examples; choose the actual beginner beach and provider.",
    "LA-0703": "Taipei/Bangkok are alternative examples; the selected city gives one context.",
    "LA-1145": "Bangkok/Mexico City are alternative examples; select the actual local tour.",
    "LA-1569": "Tokyo/Kyoto are alternative examples; a specific wagashi class must be researched.",
    "LA-0714": "Colombia/Costa Rica are alternative examples; choose the actual farm and visitor program.",
    "LA-1528": "Hyderabad/Warangal are alternative examples; select the actual cook/program.",
    "LA-1626": "Public-venue or city alternatives require choosing the actual recital.",
    "LA-1633": "Cheriyal/Hyderabad are alternative contexts; select a welcoming craft teacher.",
    "LA-1635": "Chennai/Hyderabad are alternative contexts; select the actual concert."
  }
};
