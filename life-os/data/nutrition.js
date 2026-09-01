/* Life OS — nutrition reference.
 *
 * Two separate things live here, deliberately:
 *
 *  1. DAILY_DOZEN — Dr. Michael Greger's checklist, reproduced with its own
 *     serving counts. The source describes it as "a checklist to inspire you
 *     to include some of the healthiest foods in your diet", explicitly "not
 *     meant to be prescriptive" and "an aspirational minimum that can be
 *     customized". Life OS treats it that way: one selectable framework, not
 *     settled truth, and every category is swappable.
 *     https://nutritionfacts.org/daily-dozen/
 *
 *  2. SEASONAL — which produce is actually available where you are, month by
 *     month. A checklist that tells a Londoner to eat berries in January, or
 *     an Australian to eat stone fruit in July, is advice nobody can follow.
 *     Only produce is seasonal; beans, grains, nuts, seeds, flax and spices
 *     are pantry staples and carry no months.
 *
 *  Seasonality is approximate and varies by microclimate and grower — treat
 *  it as a prompt for the market, not a rule.
 */
(function (root) {
  var LifeOS = (root.LifeOS = root.LifeOS || {});

  LifeOS.DAILY_DOZEN = [
    { key: 'beans',       label: 'Beans',                servings: 3, unit: '½ c. cooked, or ¼ c. hummus', seasonal: false },
    { key: 'berries',     label: 'Berries',              servings: 1, unit: '½ c. fresh or frozen, ¼ c. dried', seasonal: true },
    { key: 'fruit',       label: 'Other fruits',         servings: 3, unit: '1 medium fruit, ¼ c. dried', seasonal: true },
    { key: 'greens',      label: 'Greens',               servings: 2, unit: '1 c. raw, ½ c. cooked', seasonal: true },
    { key: 'cruciferous', label: 'Cruciferous veg',      servings: 1, unit: '½ c. chopped', seasonal: true },
    { key: 'veg',         label: 'Other vegetables',     servings: 2, unit: '½ c. non-leafy', seasonal: true },
    { key: 'flax',        label: 'Flaxseed',             servings: 1, unit: '1 tbsp ground', seasonal: false },
    { key: 'nuts',        label: 'Nuts & seeds',         servings: 1, unit: '¼ c. nuts, 2 tbsp nut butter', seasonal: false },
    { key: 'spices',      label: 'Herbs & spices',       servings: 1, unit: '¼ tsp turmeric', seasonal: false },
    { key: 'grains',      label: 'Whole grains',         servings: 3, unit: '½ c. hot cereal, 1 slice bread', seasonal: false },
    { key: 'drinks',      label: 'Beverages',            servings: 5, unit: '60 oz total — water, green tea, hibiscus', seasonal: false },
    { key: 'exercise',    label: 'Exercise',             servings: 1, unit: '90 min moderate, or 40 min vigorous', seasonal: false,
      handled: 'Life OS already schedules this under Movement.' }
  ];

  LifeOS.DOZEN_NOTE =
    'Dr. Greger describes the Daily Dozen as a checklist to inspire you, not a meal plan — ' +
    'an aspirational minimum meant to be customised. Life OS treats it as one selectable ' +
    'framework among several. Swap anything that does not fit your diet, budget or culture.';

  LifeOS.B12_NOTE =
    'The same source pairs the list with a B12 supplement (2,000 mcg weekly, or 50 mcg daily) ' +
    'for anyone eating mostly plants. That is a question for your doctor, not for this page.';

  /* Pantry staples — always available, so they anchor every region. */
  LifeOS.PANTRY = {
    beans:  ['Lentils', 'Chickpeas', 'Black beans', 'Kidney beans', 'Split peas', 'Cannellini'],
    grains: ['Oats', 'Quinoa', 'Brown rice', 'Barley', 'Buckwheat', 'Whole wheat'],
    nuts:   ['Walnuts', 'Almonds', 'Pumpkin seeds', 'Sunflower seeds', 'Pistachios'],
    flax:   ['Ground flaxseed'],
    spices: ['Turmeric', 'Garlic', 'Ginger', 'Cinnamon', 'Cumin', 'Black pepper'],
    drinks: ['Water', 'Green tea', 'Hibiscus tea']
  };

  /* Months are 0-indexed. [name, category, months] */
  LifeOS.REGIONS = [
    { key: 'us-ca', label: 'California / US West', hemisphere: 'N', default: true },
    { key: 'us-ne', label: 'US Northeast & Midwest', hemisphere: 'N' },
    { key: 'uk',    label: 'UK & Ireland', hemisphere: 'N' },
    { key: 'in',    label: 'India', hemisphere: 'N' },
    { key: 'au',    label: 'Australia / NZ', hemisphere: 'S' },
    { key: 'any',   label: 'Anywhere — skip seasonality', hemisphere: '-' }
  ];

  var ALL = [0,1,2,3,4,5,6,7,8,9,10,11];
  function mo(from, to) {            // inclusive, wraps across the new year
    var out = [], i = from;
    while (true) { out.push(i); if (i === to) break; i = (i + 1) % 12; }
    return out;
  }

  LifeOS.SEASONAL = {
    'us-ca': [
      ['Strawberries','berries',mo(2,8)], ['Blueberries','berries',mo(3,7)],
      ['Blackberries','berries',mo(5,7)], ['Raspberries','berries',mo(5,9)],
      ['Navel oranges','fruit',mo(10,4)], ['Mandarins','fruit',mo(10,3)],
      ['Grapefruit','fruit',mo(0,5)],     ['Avocado','fruit',mo(1,8)],
      ['Peaches & nectarines','fruit',mo(4,8)], ['Plums','fruit',mo(4,8)],
      ['Grapes','fruit',mo(6,9)],         ['Figs','fruit',mo(5,9)],
      ['Persimmons','fruit',mo(9,11)],    ['Pomegranate','fruit',mo(8,11)],
      ['Apples','fruit',mo(7,10)],        ['Melon','fruit',mo(5,8)],
      ['Kale','greens',ALL],              ['Spinach','greens',mo(9,4)],
      ['Swiss chard','greens',ALL],       ['Arugula','greens',mo(8,4)],
      ['Broccoli','cruciferous',mo(9,3)], ['Cauliflower','cruciferous',mo(9,3)],
      ['Cabbage','cruciferous',mo(9,4)],  ['Brussels sprouts','cruciferous',mo(8,1)],
      ['Bok choy','cruciferous',mo(9,3)],
      ['Tomatoes','veg',mo(5,9)],         ['Peppers','veg',mo(6,9)],
      ['Zucchini','veg',mo(5,8)],         ['Winter squash','veg',mo(8,11)],
      ['Sweet potato','veg',mo(8,11)],    ['Carrots','veg',ALL],
      ['Asparagus','veg',mo(1,4)],        ['Artichoke','veg',mo(2,4)],
      ['Sweetcorn','veg',mo(5,8)],        ['Mushrooms','veg',ALL]
    ],
    'us-ne': [
      ['Strawberries','berries',mo(5,6)], ['Blueberries','berries',mo(6,7)],
      ['Raspberries','berries',mo(6,8)],  ['Blackberries','berries',mo(7,8)],
      ['Apples','fruit',mo(8,10)],        ['Pears','fruit',mo(8,9)],
      ['Peaches','fruit',mo(6,8)],        ['Plums','fruit',mo(7,8)],
      ['Cranberries','fruit',mo(9,10)],   ['Rhubarb','fruit',mo(4,5)],
      ['Kale','greens',mo(5,10)],         ['Spinach','greens',mo(3,10)],
      ['Swiss chard','greens',mo(5,9)],   ['Lettuce','greens',mo(4,9)],
      ['Broccoli','cruciferous',mo(5,9)], ['Cauliflower','cruciferous',mo(7,10)],
      ['Cabbage','cruciferous',mo(6,10)], ['Brussels sprouts','cruciferous',mo(8,11)],
      ['Sweetcorn','veg',mo(6,8)],        ['Tomatoes','veg',mo(6,8)],
      ['Zucchini','veg',mo(6,8)],         ['Winter squash','veg',mo(8,10)],
      ['Beets','veg',mo(5,10)],           ['Carrots','veg',mo(5,11)],
      ['Asparagus','veg',mo(4,5)],        ['Potatoes','veg',mo(7,10)]
    ],
    'uk': [
      ['Strawberries','berries',mo(5,8)], ['Raspberries','berries',mo(5,8)],
      ['Blackberries','berries',mo(7,9)], ['Blackcurrants','berries',mo(5,7)],
      ['Apples','fruit',mo(8,10)],        ['Pears','fruit',mo(8,10)],
      ['Plums','fruit',mo(7,9)],          ['Rhubarb','fruit',mo(1,5)],
      ['Kale','greens',mo(9,2)],          ['Spinach','greens',mo(3,8)],
      ['Watercress','greens',mo(3,9)],    ['Chard','greens',mo(5,9)],
      ['Broccoli','cruciferous',mo(5,9)], ['Cauliflower','cruciferous',ALL],
      ['Cabbage','cruciferous',ALL],      ['Brussels sprouts','cruciferous',mo(9,1)],
      ['Leeks','veg',mo(9,3)],            ['Parsnips','veg',mo(9,1)],
      ['Carrots','veg',ALL],              ['Beetroot','veg',mo(5,9)],
      ['Tomatoes','veg',mo(5,8)],         ['Courgette','veg',mo(5,8)],
      ['Runner beans','veg',mo(6,8)],     ['Asparagus','veg',mo(3,5)]
    ],
    'in': [
      ['Jamun','berries',mo(5,6)],        ['Strawberries','berries',mo(11,2)],
      ['Mulberries','berries',mo(2,4)],
      ['Mango','fruit',mo(3,6)],          ['Guava','fruit',mo(10,1)],
      ['Papaya','fruit',ALL],             ['Banana','fruit',ALL],
      ['Pomegranate','fruit',mo(8,1)],    ['Orange','fruit',mo(11,2)],
      ['Watermelon','fruit',mo(2,5)],     ['Custard apple','fruit',mo(7,10)],
      ['Amla','fruit',mo(9,0)],           ['Chikoo','fruit',mo(11,2)],
      ['Palak (spinach)','greens',mo(9,2)], ['Methi (fenugreek)','greens',mo(9,2)],
      ['Sarson (mustard greens)','greens',mo(10,1)], ['Amaranth leaves','greens',mo(5,9)],
      ['Cauliflower','cruciferous',mo(9,1)], ['Cabbage','cruciferous',mo(9,1)],
      ['Knol khol','cruciferous',mo(10,1)],
      ['Bottle gourd','veg',mo(2,8)],     ['Okra (bhindi)','veg',mo(3,8)],
      ['Brinjal','veg',ALL],              ['Tomato','veg',ALL],
      ['Drumstick','veg',mo(1,4)],        ['Pumpkin','veg',mo(5,9)],
      ['Carrot','veg',mo(10,1)]
    ],
    'au': [
      ['Strawberries','berries',mo(8,1)], ['Blueberries','berries',mo(10,1)],
      ['Raspberries','berries',mo(10,1)],
      ['Mango','fruit',mo(9,2)],          ['Stone fruit','fruit',mo(11,2)],
      ['Citrus','fruit',mo(4,9)],         ['Apples','fruit',mo(2,7)],
      ['Avocado','fruit',ALL],            ['Figs','fruit',mo(1,3)],
      ['Kale','greens',mo(3,9)],          ['Spinach','greens',mo(3,10)],
      ['Silverbeet','greens',ALL],
      ['Broccoli','cruciferous',mo(4,9)], ['Cauliflower','cruciferous',mo(4,9)],
      ['Cabbage','cruciferous',mo(3,9)],  ['Brussels sprouts','cruciferous',mo(3,7)],
      ['Tomatoes','veg',mo(11,3)],        ['Zucchini','veg',mo(10,2)],
      ['Pumpkin','veg',mo(2,7)],          ['Sweet potato','veg',mo(2,8)],
      ['Asparagus','veg',mo(8,11)],       ['Carrots','veg',ALL]
    ],
    'any': []
  };

  /* Everything in season for a region in a given month, grouped by category. */
  LifeOS.inSeason = function (regionKey, monthIdx) {
    var rows = LifeOS.SEASONAL[regionKey] || [];
    var out = {};
    rows.forEach(function (r) {
      if (r[2].indexOf(monthIdx) === -1) return;
      (out[r[1]] = out[r[1]] || []).push(r[0]);
    });
    return out;
  };

  /* Fallbacks when a region has nothing listed for a category this month —
   * better to name something generic than to show an empty slot. */
  LifeOS.GENERIC = {
    berries:     ['Frozen mixed berries'],
    fruit:       ['Whatever looks best at the market'],
    greens:      ['Any leafy green'],
    cruciferous: ['Broccoli or cabbage'],
    veg:         ['Any non-leafy vegetable']
  };

  LifeOS.region = function (key) {
    for (var i = 0; i < LifeOS.REGIONS.length; i++) {
      if (LifeOS.REGIONS[i].key === key) return LifeOS.REGIONS[i];
    }
    return LifeOS.REGIONS[0];
  };
})(window);
