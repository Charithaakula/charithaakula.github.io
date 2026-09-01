/* Life OS — domain catalog.
 * All demo data lives here so the four views + planner share one source of truth.
 * Nothing in this file is medical, financial, or legal advice; the numbers are
 * illustrative defaults meant to be edited per person.
 */
(function (root) {
  var LifeOS = (root.LifeOS = root.LifeOS || {});

  /* ---------------------------------------------------------------- modes */
  LifeOS.MODES = [
    { key: 'minimum', label: 'Minimum Mode', blurb: 'A hard stretch. Life OS protects only the essentials.' },
    { key: 'base', label: 'Base Mode', blurb: 'Sustainable normal life. The default.' },
    { key: 'build', label: 'Build Mode', blurb: 'You have extra time and capacity to push on something.' },
    { key: 'optimize', label: 'Optimize Mode', blurb: 'Advanced tuning once the base is genuinely automatic.' }
  ];

  /* ------------------------------------------------------------- domains
   * Colour is NOT here on purpose. Each domain renders with a `dom-<key>`
   * class and styles.css maps that to the active theme's palette, so
   * restyling the whole app means editing one block of CSS. */
  LifeOS.DOMAINS = [
    { key: 'nutrition', group: 'fuel',     label: 'Nutrition',
      minimum: 'Greens, beans and berries most days; varied whole foods',
      next: 'Add cruciferous vegetables more consistently' },
    { key: 'strength', group: 'move',      label: 'Strength',
      minimum: '2 sessions / week',
      next: 'Progressive overload on the main lifts' },
    { key: 'cardio', group: 'move',        label: 'Cardio',
      minimum: '2 sessions / week',
      next: 'Build an easy aerobic base before adding intensity' },
    { key: 'mobility', group: 'move',      label: 'Mobility',
      minimum: '10 min, 3x / week',
      next: 'Add a desk mobility reset on work days' },
    { key: 'sleep', group: 'rest',         label: 'Sleep',
      minimum: '7–8 hrs, consistent wake time',
      next: 'Protect the wind-down hour' },
    { key: 'preventive', group: 'care',    label: 'Preventive Care',
      minimum: 'Stay current on screenings and dental',
      next: 'Book the appointments that are already due' },
    { key: 'money', group: 'upkeep',         label: 'Money',
      minimum: 'A short weekly check-in you actually do',
      next: 'Review retirement contributions and cash flow' },
    { key: 'career', group: 'work',        label: 'Career',
      minimum: 'Protected deep work + deliberate learning',
      next: 'Pick one skill and make it the quarter’s theme' },
    { key: 'relationships', group: 'people', label: 'Relationships',
      minimum: 'Meaningful connection every week',
      next: 'Put the recurring ones on the calendar' },
    { key: 'home', group: 'upkeep',          label: 'Home',
      minimum: 'Laundry + one reset per week',
      next: 'Batch the reset instead of scattering it' },
    { key: 'admin', group: 'upkeep',         label: 'Life Admin',
      minimum: 'One small weekly batch',
      next: 'Let Life OS hold the dates you don’t need today' },
    { key: 'hobby', group: 'mind',         label: 'Hobby / Play',
      minimum: 'Some protected time that is only for you',
      next: 'Defend one block a week' },
    { key: 'learning', group: 'work',      label: 'Learning',
      minimum: 'Something you are deliberately getting better at',
      next: 'Shorter sessions, more often' },
    { key: 'grooming', group: 'care',      label: 'Body & Skin',
      minimum: 'A short routine that survives a bad day',
      next: 'Keep the recurring appointments booked ahead' },
    { key: 'desk',   group: 'care',          label: 'Desk & Screen',
      minimum: 'Move the parts a desk seizes up — back, neck, eyes',
      next: 'Take the eye breaks; they are the easiest to skip' },
    { key: 'events', group: 'people',        label: 'Events & Going Out',
      minimum: 'Say yes to something you actually want to do',
      next: 'Decide on invites once a week instead of never' },
    { key: 'mind', group: 'mind',          label: 'Mind & Mood',
      minimum: 'A regular way to get what is in your head onto paper',
      next: 'Protect the reflective time already on the calendar' },
    { key: 'digital', group: 'upkeep',       label: 'Digital Life',
      minimum: 'Backups running, passwords not reused',
      next: 'One cleanup pass a month' },
    { key: 'travel', group: 'upkeep',        label: 'Travel', optional: true,
      minimum: 'Nothing booked in a panic',
      next: 'Plan the next trip before the prices climb' },
    { key: 'pets', group: 'upkeep',          label: 'Pets', optional: true,
      minimum: 'Fed, walked, vet up to date',
      next: 'Book the next check-up' }
  ];


  /* ------------------------------------------------------------- groups
   * Domains cluster into families. `competes` marks a family whose members
   * fight over the same slot in a day — one workout window, one free evening.
   * Collapsing those is not just tidier: it exposes the clash.
   */
  LifeOS.GROUPS = [
    { key: 'move',   label: 'Movement',  competes: true,
      note: 'One training window a day — two things here means a choice.' },
    { key: 'fuel',   label: 'Fuel',      competes: false },
    { key: 'rest',   label: 'Rest',      competes: false },
    { key: 'work',   label: 'Work',      competes: true,
      note: 'Deep work and deliberate learning both want your best hours.' },
    { key: 'people', label: 'People',    competes: true,
      note: 'Seeing people and going out land in the same evenings.' },
    { key: 'mind',   label: 'Mind',      competes: true,
      note: 'Reflection and play compete for the same quiet time.' },
    { key: 'upkeep', label: 'Upkeep',    competes: false },
    { key: 'care',   label: 'Care',      competes: false }
  ];

  LifeOS.group = function (key) {
    for (var gi = 0; gi < LifeOS.GROUPS.length; gi++) {
      if (LifeOS.GROUPS[gi].key === key) return LifeOS.GROUPS[gi];
    }
    return { key: key, label: key, competes: false };
  };

  LifeOS.domain = function (key) {
    for (var i = 0; i < LifeOS.DOMAINS.length; i++) {
      if (LifeOS.DOMAINS[i].key === key) return LifeOS.DOMAINS[i];
    }
    return { key: key, label: key };
  };

  /* --------------------------------------------------------------- items
   * type:  CONSUME | DO | MAINTAIN | REVIEW   (internal, not shown in the UI)
   * cad:   { unit: 'day'|'week'|'month'|'quarter'|'halfyear'|'year'|'event',
   *          times: n           -> n times per week
   *          anchorMonths: [..] -> 0-indexed months this lands in
   *          dayOfWeek: 0..6    -> 0 = Monday
   *          weekdaysOnly: bool }
   * modes: which life modes keep this item
   * slot:  morning | workday | evening | night | anytime
   */
  LifeOS.ITEMS = [
    /* ---- Nutrition (illustrative; inspired by the Daily Dozen) ---------- */
    { id: 'n-greens',   domain: 'nutrition', type: 'CONSUME', title: 'Greens',
      detail: 'Spinach, kale, arugula, chard — rotate so it does not get boring',
      cad: { unit: 'day' }, modes: ['minimum','base','build','optimize'], slot: 'anytime',
      why: 'Leafy greens are one of the few things nearly every dietary framework agrees on.' },
    { id: 'n-beans',    domain: 'nutrition', type: 'CONSUME', title: 'Beans or lentils',
      detail: 'Lentils, chickpeas, black beans — cheap, filling, batch-cookable',
      cad: { unit: 'day' }, modes: ['minimum','base','build','optimize'], slot: 'anytime',
      why: 'Legumes cover fibre and protein at once, which is why they anchor the plan.' },
    { id: 'n-berries',  domain: 'nutrition', type: 'CONSUME', title: 'Berries',
      detail: 'Blueberries, raspberries, strawberries, blackberries — frozen counts',
      cad: { unit: 'day' }, modes: ['base','build','optimize'], slot: 'morning',
      why: 'Easiest high-value habit to attach to something you already eat.' },
    { id: 'n-cruciferous', domain: 'nutrition', type: 'CONSUME', title: 'Cruciferous vegetables',
      detail: 'Broccoli, cauliflower, cabbage, brussels sprouts',
      cad: { unit: 'day' }, modes: ['base','build','optimize'], slot: 'anytime',
      why: 'The category people most often skip, so Life OS surfaces it explicitly.' },
    { id: 'n-wholegrain', domain: 'nutrition', type: 'CONSUME', title: 'Whole grains',
      detail: 'Oats, quinoa, brown rice, barley',
      cad: { unit: 'day' }, modes: ['minimum','base','build','optimize'], slot: 'anytime' },
    { id: 'n-flax',     domain: 'nutrition', type: 'CONSUME', title: 'Ground flax',
      detail: 'A spoonful stirred into whatever you are already eating',
      cad: { unit: 'day' }, modes: ['base','build','optimize'], slot: 'morning' },
    { id: 'n-nuts',     domain: 'nutrition', type: 'CONSUME', title: 'Nuts & seeds',
      detail: 'Walnuts, almonds, pumpkin seeds',
      cad: { unit: 'day' }, modes: ['base','build','optimize'], slot: 'anytime' },
    { id: 'n-fruit',    domain: 'nutrition', type: 'CONSUME', title: 'Other fruit',
      detail: 'Whatever is in season and actually gets eaten',
      cad: { unit: 'day' }, modes: ['base','build','optimize'], slot: 'anytime' },
    { id: 'n-veg',      domain: 'nutrition', type: 'CONSUME', title: 'Other vegetables',
      detail: 'Peppers, carrots, mushrooms, squash',
      cad: { unit: 'day' }, modes: ['base','build','optimize'], slot: 'anytime' },
    { id: 'n-herbs',    domain: 'nutrition', type: 'CONSUME', title: 'Herbs & spices',
      detail: 'Turmeric, garlic, ginger, whatever your cuisine already uses',
      cad: { unit: 'day' }, modes: ['build','optimize'], slot: 'anytime' },
    { id: 'n-water',    domain: 'nutrition', type: 'CONSUME', title: 'Hydration',
      detail: 'Water, tea — keep a glass where you work',
      cad: { unit: 'day' }, modes: ['minimum','base','build','optimize'], slot: 'anytime' },
    { id: 'n-protein',  domain: 'nutrition', type: 'CONSUME', title: 'Protein anchor at each meal',
      detail: 'Adjust the source to your diet — dairy, eggs, fish, tofu, tempeh, legumes',
      cad: { unit: 'day' }, modes: ['minimum','base','build','optimize'], slot: 'anytime' },
    { id: 'n-mealprep', domain: 'nutrition', type: 'DO', title: 'Meal prep',
      detail: 'Cook the two things that make the week easy',
      cad: { unit: 'week', dayOfWeek: 5 }, modes: ['base','build','optimize'], slot: 'anytime', minutes: 90 },
    { id: 'n-groceries',domain: 'nutrition', type: 'DO', title: 'Groceries',
      detail: 'Shop the plan, not the aisles',
      cad: { unit: 'week', dayOfWeek: 5 }, modes: ['minimum','base','build','optimize'], slot: 'anytime', minutes: 45 },

    /* ---- Strength / Cardio / Mobility ---------------------------------- */
    { id: 'f-strength', domain: 'strength', type: 'DO', title: 'Strength session',
      detail: 'Full body: a push, a pull, a squat or hinge, a carry',
      cad: { unit: 'week', times: 2 }, modes: ['base','build','optimize'], slot: 'morning', minutes: 45,
      why: 'Two sessions a week is the smallest dose that reliably holds strength.' },
    { id: 'f-strength3',domain: 'strength', type: 'DO', title: 'Third strength session',
      detail: 'Only in Build Mode, when the first two are automatic',
      cad: { unit: 'week', times: 1, offset: 5 }, modes: ['build','optimize'], slot: 'morning', minutes: 45 },
    { id: 'f-cardio',   domain: 'cardio', type: 'DO', title: 'Cardio session',
      detail: 'Easy conversational pace — run, bike, row, swim',
      cad: { unit: 'week', times: 2, offset: 1 }, modes: ['base','build','optimize'], slot: 'morning', minutes: 35 },
    { id: 'f-walk',     domain: 'cardio', type: 'DO', title: 'Walk',
      detail: 'The one thing that survives every bad week',
      cad: { unit: 'day' }, modes: ['minimum','base','build','optimize'], slot: 'anytime', minutes: 20,
      why: 'Kept even in Minimum Mode because it is the cheapest thing to protect.' },
    { id: 'f-mobility', domain: 'mobility', type: 'DO', title: 'Dynamic mobility',
      detail: 'Hips, thoracic spine, ankles — moving through range, not holding a stretch',
      why: 'Static stretching improves flexibility but does not reduce injury rates; ACSM recommends ' +
           'dynamic work in warm-ups. Do this for range of motion, not for injury prevention.',
      cad: { unit: 'week', times: 3, offset: 2 }, modes: ['base','build','optimize'], slot: 'evening', minutes: 10 },
    /* ---- Desk & screen: what sitting at a computer actually costs ------- */
    { id: 'dk-eyes',    domain: 'desk', type: 'DO', title: 'Eye breaks (20-20-20)',
      detail: 'Every 20 minutes, look at something 20 feet away for 20 seconds',
      cad: { unit: 'day', weekdaysOnly: true }, modes: ['minimum','base','build','optimize'],
      slot: 'workday', minutes: 2,
      why: 'The American Optometric Association’s standing recommendation for digital eye strain. ' +
           'Kept in Minimum Mode because it costs seconds.' },
    { id: 'dk-neck',    domain: 'desk', type: 'DO', title: 'Neck & shoulder strengthening',
      detail: 'Chin tucks, band pull-aparts, scapular work — loaded, not just stretched',
      cad: { unit: 'week', times: 3, offset: 4 }, modes: ['base','build','optimize'], slot: 'evening', minutes: 8,
      why: 'Cochrane found strength-specific training helps mechanical neck pain, while generic ' +
           'stretching and general exercise programmes did not. So this one is strengthening.' },
    { id: 'dk-back',    domain: 'desk', type: 'DO', title: 'Back & hip work',
      detail: 'Motor-control work, hip flexors, glutes, thoracic extension — or yoga, which counts',
      cad: { unit: 'week', times: 3, offset: 1 }, modes: ['base','build','optimize'], slot: 'evening', minutes: 12,
      why: 'Exercise is first-line non-pharmacologic treatment for chronic low back pain in the ACP ' +
           'guideline, which names motor control exercise, yoga and tai chi explicitly.' },
    { id: 'dk-stand',   domain: 'desk', type: 'DO', title: 'Walk 2–3 minutes',
      detail: 'Every half hour or so. Walk, do not just stand — the trials separate those two',
      cad: { unit: 'day', weekdaysOnly: true }, modes: ['base','build','optimize'], slot: 'workday', minutes: 5,
      why: 'Breaking up sitting with light walking improved post-meal glucose in randomised trials; ' +
           'standing breaks in the same comparison did not.' },

    /* ---- Sleep ---------------------------------------------------------- */
    { id: 's-sleep',    domain: 'sleep', type: 'DO', title: 'Sleep 7–8 hrs',
      detail: 'Same wake time matters more than the same bedtime',
      cad: { unit: 'day' }, modes: ['minimum','base','build','optimize'], slot: 'night',
      why: 'Every other domain degrades first when this one slips, so it is never cut.' },
    { id: 's-winddown', domain: 'sleep', type: 'DO', title: 'Wind-down',
      detail: 'Screens down, lights low, something dull on purpose',
      cad: { unit: 'day' }, modes: ['base','build','optimize'], slot: 'night', minutes: 30 },
    { id: 's-sunlight', domain: 'sleep', type: 'DO', title: 'Morning light',
      detail: 'Outside within an hour of waking, even briefly',
      cad: { unit: 'day' }, modes: ['base','build','optimize'], slot: 'morning', minutes: 10 },

    /* ---- Career / Learning ---------------------------------------------- */
    { id: 'c-deepwork', domain: 'career', type: 'DO', title: 'Deep work block',
      detail: 'One protected block on the thing that actually matters',
      cad: { unit: 'day', weekdaysOnly: true }, modes: ['minimum','base','build','optimize'], slot: 'workday', minutes: 90 },
    { id: 'c-learning', domain: 'learning', type: 'DO', title: 'Deliberate learning',
      detail: 'Reading, a course, a side build — something with a direction',
      cad: { unit: 'week', times: 2, offset: 2 }, modes: ['base','build','optimize'], slot: 'evening', minutes: 40 },
    { id: 'c-review',   domain: 'career', type: 'REVIEW', title: 'Career review',
      detail: 'What moved, what stalled, what is the next quarter about',
      cad: { unit: 'quarter' }, modes: ['base','build','optimize'], slot: 'anytime', minutes: 45 },

    /* ---- Relationships --------------------------------------------------- */
    { id: 'r-social',   domain: 'relationships', type: 'DO', title: 'See a friend',
      detail: 'In person if you can, a call if you cannot',
      cad: { unit: 'week' }, modes: ['minimum','base','build','optimize'], slot: 'evening', minutes: 90 },
    { id: 'r-family',   domain: 'relationships', type: 'DO', title: 'Call family',
      detail: 'The call you keep meaning to make',
      cad: { unit: 'week', dayOfWeek: 2 }, modes: ['minimum','base','build','optimize'], slot: 'evening', minutes: 30 },
    { id: 'r-date',     domain: 'relationships', type: 'DO', title: 'Date night',
      detail: 'Protected, phones away',
      cad: { unit: 'week', dayOfWeek: 3 }, modes: ['base','build','optimize'], slot: 'evening', minutes: 120 },
    { id: 'r-checkin',  domain: 'relationships', type: 'REVIEW', title: 'Relationship check-in',
      detail: 'Who have you not spoken to in too long',
      cad: { unit: 'month' }, modes: ['base','build','optimize'], slot: 'anytime', minutes: 15 },

    /* ---- Money ----------------------------------------------------------- */
    { id: 'm-weekly',   domain: 'money', type: 'REVIEW', title: 'Money check-in',
      detail: 'Balances, anything unexpected, anything due',
      cad: { unit: 'week', dayOfWeek: 1 }, modes: ['minimum','base','build','optimize'], slot: 'evening', minutes: 15,
      why: 'Short and weekly beats thorough and never.' },
    { id: 'm-cashflow', domain: 'money', type: 'REVIEW', title: 'Budget & cash flow',
      detail: 'What came in, what went out, what surprised you',
      cad: { unit: 'month' }, modes: ['base','build','optimize'], slot: 'anytime', minutes: 30 },
    /* Retirement, in the order the decisions actually matter. Every one of
     * these is a prompt to go and check something — never an instruction. */
    { id: 'm-match',    domain: 'money', type: 'REVIEW', title: 'Am I getting the full match?',
      detail: 'The one with a deadline you cannot get back. Check the formula and your rate',
      cad: { unit: 'halfyear', anchorMonths: [0, 6] }, modes: ['minimum','base','build','optimize'],
      slot: 'anytime', minutes: 20,
      why: 'An unmatched dollar is the only part of this whole domain that is unambiguously free, ' +
           'and it expires at the end of the plan year.' },
    { id: 'm-deferral', domain: 'money', type: 'REVIEW', title: 'Pre-tax or Roth deferral?',
      detail: 'Which bucket your salary deferral goes into — a tax-rate-now vs tax-rate-later call',
      cad: { unit: 'year', anchorMonths: [0] }, modes: ['base','build','optimize'], slot: 'anytime', minutes: 30 },
    { id: 'm-limit',    domain: 'money', type: 'REVIEW', title: 'Check this year’s limits',
      detail: 'The IRS numbers move most years — deferral, catch-up, IRA, compensation cap',
      cad: { unit: 'year', anchorMonths: [0] }, modes: ['base','build','optimize'], slot: 'anytime', minutes: 20 },
    { id: 'm-backdoor', domain: 'money', type: 'REVIEW', title: 'Backdoor Roth — does it apply?',
      detail: 'Only relevant above the income limits, and only worth it if the pro-rata rule is clear',
      cad: { unit: 'year', anchorMonths: [1] }, modes: ['build','optimize'], slot: 'anytime', minutes: 45,
      why: 'The pro-rata rule is the trap: existing pre-tax IRA balances make this messy and taxable. ' +
           'Worth an hour with someone qualified before doing it, not after.' },
    { id: 'm-mega',     domain: 'money', type: 'REVIEW', title: 'Does my plan allow after-tax + conversion?',
      detail: 'The "mega backdoor" route — many plans simply do not offer it, so this is a phone call',
      cad: { unit: 'year', anchorMonths: [1] }, modes: ['optimize'], slot: 'anytime', minutes: 30 },
    { id: 'm-rebal',    domain: 'money', type: 'REVIEW', title: 'Rebalance & fee check',
      detail: 'Drift back to target; look at what the funds actually cost you',
      cad: { unit: 'year', anchorMonths: [10] }, modes: ['base','build','optimize'], slot: 'anytime', minutes: 45 },
    { id: 'm-alloc',    domain: 'money', type: 'REVIEW', title: 'Investment allocation',
      detail: 'Drift check — not a trading session',
      cad: { unit: 'quarter' }, modes: ['base','build','optimize'], slot: 'anytime', minutes: 30 },
    { id: 'm-subs',     domain: 'money', type: 'MAINTAIN', title: 'Subscription audit',
      detail: 'Cancel the two you forgot about',
      cad: { unit: 'quarter' }, modes: ['base','build','optimize'], slot: 'anytime', minutes: 20 },
    { id: 'm-taxes',    domain: 'money', type: 'MAINTAIN', title: 'Taxes',
      detail: 'Gather documents, then file',
      cad: { unit: 'year', anchorMonths: [3] }, modes: ['minimum','base','build','optimize'], slot: 'anytime' },
    { id: 'm-insurance',domain: 'money', type: 'REVIEW', title: 'Insurance review',
      detail: 'Health, renters or home, auto, life if relevant',
      cad: { unit: 'year', anchorMonths: [11] }, modes: ['base','build','optimize'], slot: 'anytime' },
    { id: 'm-annual',   domain: 'money', type: 'REVIEW', title: 'Annual planning',
      detail: 'The one long session that sets the year',
      cad: { unit: 'year', anchorMonths: [11] }, modes: ['base','build','optimize'], slot: 'anytime' },

    /* ---- Home ------------------------------------------------------------ */
    { id: 'h-laundry',  domain: 'home', type: 'MAINTAIN', title: 'Laundry',
      cad: { unit: 'week', dayOfWeek: 6 }, modes: ['minimum','base','build','optimize'], slot: 'anytime', minutes: 45 },
    { id: 'h-reset',    domain: 'home', type: 'MAINTAIN', title: 'Home reset',
      detail: 'Surfaces clear, dishes done, floor visible',
      cad: { unit: 'week', dayOfWeek: 5 }, modes: ['minimum','base','build','optimize'], slot: 'anytime', minutes: 30 },
    { id: 'h-tidy',     domain: 'home', type: 'MAINTAIN', title: '10-minute tidy',
      cad: { unit: 'day' }, modes: ['base','build','optimize'], slot: 'evening', minutes: 10 },
    { id: 'h-sheets',   domain: 'home', type: 'MAINTAIN', title: 'Change sheets',
      cad: { unit: 'weeks', n: 2 }, modes: ['base','build','optimize'], slot: 'anytime', minutes: 15 },
    { id: 'h-deep',     domain: 'home', type: 'MAINTAIN', title: 'Deep clean',
      detail: 'The corners the weekly reset never reaches',
      cad: { unit: 'month' }, modes: ['base','build','optimize'], slot: 'anytime', minutes: 90 },
    { id: 'h-filters',  domain: 'home', type: 'MAINTAIN', title: 'Replace filters',
      detail: 'HVAC, water — the things that fail silently',
      cad: { unit: 'quarter' }, modes: ['base','build','optimize'], slot: 'anytime', minutes: 20 },
    { id: 'h-car',      domain: 'home', type: 'MAINTAIN', title: 'Car service',
      cad: { unit: 'halfyear', anchorMonths: [2, 8] }, modes: ['base','build','optimize'], slot: 'anytime' },

    /* ---- Life admin ------------------------------------------------------ */
    { id: 'a-batch',    domain: 'admin', type: 'MAINTAIN', title: 'Life admin batch',
      detail: 'Every small task in one 30-minute block instead of all week',
      cad: { unit: 'week', dayOfWeek: 3 }, modes: ['minimum','base','build','optimize'], slot: 'evening', minutes: 30,
      why: 'Batching is what stops admin from leaking into every evening.' },
    { id: 'a-docs',     domain: 'admin', type: 'MAINTAIN', title: 'Document renewals',
      detail: 'Passport, licence, visa — check the expiry dates',
      cad: { unit: 'year', anchorMonths: [1] }, modes: ['base','build','optimize'], slot: 'anytime' },

    /* ---- Preventive care -------------------------------------------------- */
    { id: 'p-dental',   domain: 'preventive', type: 'MAINTAIN', title: 'Dental cleaning',
      cad: { unit: 'halfyear', anchorMonths: [4, 10] }, modes: ['minimum','base','build','optimize'], slot: 'anytime',
      why: 'Twice a year is the standard interval; your dentist may set a different one.' },
    { id: 'p-physical', domain: 'preventive', type: 'MAINTAIN', title: 'Annual physical & labs',
      cad: { unit: 'year', anchorMonths: [2] }, modes: ['minimum','base','build','optimize'], slot: 'anytime' },
    { id: 'p-eye',      domain: 'preventive', type: 'MAINTAIN', title: 'Eye exam',
      cad: { unit: 'year', anchorMonths: [8] }, modes: ['base','build','optimize'], slot: 'anytime' },
    { id: 'p-derm',     domain: 'preventive', type: 'MAINTAIN', title: 'Skin check',
      cad: { unit: 'year', anchorMonths: [6] }, modes: ['build','optimize'], slot: 'anytime' },

    /* ---- Grooming --------------------------------------------------------- */
    { id: 'g-skin-am',  domain: 'grooming', type: 'MAINTAIN', title: 'Skincare — morning',
      detail: 'Cleanse, moisturise, SPF. Three steps, not twelve',
      cad: { unit: 'day' }, modes: ['minimum','base','build','optimize'], slot: 'morning', minutes: 5,
      why: 'Kept even in Minimum Mode because it is short and compounds daily.' },
    { id: 'g-skin-pm',  domain: 'grooming', type: 'MAINTAIN', title: 'Skincare — evening',
      detail: 'Take the day off your face before bed',
      cad: { unit: 'day' }, modes: ['base','build','optimize'], slot: 'night', minutes: 5 },
    { id: 'g-body',     domain: 'grooming', type: 'MAINTAIN', title: 'Body care',
      detail: 'Moisturiser, hands, feet — the bits that get skipped',
      cad: { unit: 'day' }, modes: ['build','optimize'], slot: 'night', minutes: 3 },
    { id: 'g-exfoliate',domain: 'grooming', type: 'MAINTAIN', title: 'Exfoliate',
      cad: { unit: 'week', dayOfWeek: 6 }, modes: ['base','build','optimize'], slot: 'evening', minutes: 10 },
    { id: 'g-hair',     domain: 'grooming', type: 'MAINTAIN', title: 'Hair treatment',
      detail: 'Mask or oil — whatever your hair actually needs',
      cad: { unit: 'weeks', n: 2, dayOfWeek: 6 }, modes: ['base','build','optimize'], slot: 'evening', minutes: 20 },
    { id: 'g-nails',    domain: 'grooming', type: 'MAINTAIN', title: 'Nails',
      cad: { unit: 'weeks', n: 2, dayOfWeek: 5 }, modes: ['base','build','optimize'], slot: 'anytime', minutes: 25 },
    { id: 'g-haircut',  domain: 'grooming', type: 'MAINTAIN', title: 'Haircut',
      cad: { unit: 'weeks', n: 6 }, modes: ['base','build','optimize'], slot: 'anytime' },

    /* ---- Events & going out ------------------------------------------- */
    { id: 'e-scan',     domain: 'events', type: 'REVIEW', title: 'Check invites',
      detail: 'Luma, Partiful, group chats — decide once instead of all week',
      cad: { unit: 'week', dayOfWeek: 2 }, modes: ['base','build','optimize'], slot: 'evening', minutes: 15,
      why: 'Batching the yes/no is what stops invites quietly expiring.' },
    { id: 'e-go',       domain: 'events', type: 'DO', title: 'Go to something',
      detail: 'A show, a dinner, a launch, a run club — anything that gets you out',
      cad: { unit: 'weeks', n: 2, dayOfWeek: 4 }, modes: ['base','build','optimize'], slot: 'evening', minutes: 180 },
    { id: 'e-tickets',  domain: 'events', type: 'MAINTAIN', title: 'Book ahead',
      detail: 'The things that sell out if you wait',
      cad: { unit: 'month' }, modes: ['base','build','optimize'], slot: 'anytime', minutes: 20 },
    { id: 'e-birthday', domain: 'events', type: 'REVIEW', title: 'Birthdays & occasions',
      detail: 'Who is coming up, and does it need a gift or a plan',
      cad: { unit: 'month' }, modes: ['minimum','base','build','optimize'], slot: 'anytime', minutes: 10 },
    { id: 'e-host',     domain: 'events', type: 'DO', title: 'Host something',
      detail: 'Small and low effort still counts',
      cad: { unit: 'quarter' }, modes: ['build','optimize'], slot: 'anytime' },

    /* ---- Mind & mood ---------------------------------------------------- */
    { id: 'md-journal', domain: 'mind', type: 'DO', title: 'Journal',
      detail: 'Ten minutes to get it out of your head',
      cad: { unit: 'week', times: 3, offset: 1 }, modes: ['base','build','optimize'], slot: 'night', minutes: 10 },
    { id: 'md-still',   domain: 'mind', type: 'DO', title: 'Stillness',
      detail: 'Meditation, breathing, or just sitting without a screen',
      cad: { unit: 'day' }, modes: ['build','optimize'], slot: 'morning', minutes: 10 },
    { id: 'md-stress',  domain: 'mind', type: 'DO', title: 'Stress reset',
      detail: 'Ten minutes of whatever actually settles you — breathing, a walk, sitting still',
      cad: { unit: 'week', times: 3, offset: 5 }, modes: ['base','build','optimize'], slot: 'evening', minutes: 10,
      why: 'Meditation programmes show moderate evidence for anxiety and depression, but no better ' +
           'than active alternatives like exercise — so the item is deliberately open about the method.' },
    { id: 'md-screens', domain: 'mind', type: 'REVIEW', title: 'Screen-time check',
      detail: 'Look at the number without flinching',
      cad: { unit: 'week', dayOfWeek: 6 }, modes: ['base','build','optimize'], slot: 'evening', minutes: 5 },
    { id: 'md-support', domain: 'mind', type: 'DO', title: 'Therapy or check-in',
      detail: 'Whatever support looks like for you',
      cad: { unit: 'weeks', n: 2, dayOfWeek: 2 }, modes: ['minimum','base','build','optimize'], slot: 'evening', minutes: 60 },

    /* ---- Digital life ----------------------------------------------------- */
    { id: 'dg-inbox',   domain: 'digital', type: 'MAINTAIN', title: 'Inbox & messages',
      detail: 'One pass, then close it',
      cad: { unit: 'week', dayOfWeek: 4 }, modes: ['base','build','optimize'], slot: 'workday', minutes: 30 },
    { id: 'dg-backup',  domain: 'digital', type: 'MAINTAIN', title: 'Backup check',
      detail: 'Confirm it actually ran — that is the whole job',
      cad: { unit: 'month' }, modes: ['minimum','base','build','optimize'], slot: 'anytime', minutes: 10 },
    { id: 'dg-photos',  domain: 'digital', type: 'MAINTAIN', title: 'Photo & file cleanup',
      cad: { unit: 'quarter' }, modes: ['base','build','optimize'], slot: 'anytime', minutes: 45 },
    { id: 'dg-secure',  domain: 'digital', type: 'REVIEW', title: 'Passwords & 2FA audit',
      detail: 'Reused passwords, old logins, recovery codes',
      cad: { unit: 'halfyear', anchorMonths: [1, 7] }, modes: ['base','build','optimize'], slot: 'anytime', minutes: 40 },

    /* ---- Travel ----------------------------------------------------------- */
    { id: 't-plan',     domain: 'travel', type: 'REVIEW', title: 'Plan the next trip',
      detail: 'Dates first, details later',
      cad: { unit: 'quarter' }, modes: ['base','build','optimize'], slot: 'anytime', minutes: 45 },
    { id: 't-book',     domain: 'travel', type: 'MAINTAIN', title: 'Book flights & stays',
      detail: 'Both get worse the longer you wait',
      cad: { unit: 'quarter' }, modes: ['base','build','optimize'], slot: 'anytime', minutes: 60 },

    /* ---- Pets -------------------------------------------------------------- */
    { id: 'pt-walk',    domain: 'pets', type: 'DO', title: 'Walk the dog',
      cad: { unit: 'day' }, modes: ['base','build','optimize'], slot: 'morning', minutes: 30 },
    { id: 'pt-meds',    domain: 'pets', type: 'MAINTAIN', title: 'Flea & worm treatment',
      cad: { unit: 'month' }, modes: ['base','build','optimize'], slot: 'anytime', minutes: 5 },
    { id: 'pt-vet',     domain: 'pets', type: 'MAINTAIN', title: 'Vet check-up',
      cad: { unit: 'year', anchorMonths: [5] }, modes: ['base','build','optimize'], slot: 'anytime' },

    /* ---- Hobby ------------------------------------------------------------ */
    { id: 'hb-block',   domain: 'hobby', type: 'DO', title: 'Hobby block',
      detail: 'The thing with no outcome attached',
      cad: { unit: 'week', dayOfWeek: 4 }, modes: ['base','build','optimize'], slot: 'evening', minutes: 90,
      why: 'Listed explicitly because it is the first thing people quietly drop.' },
    { id: 'hb-class',   domain: 'hobby', type: 'DO', title: 'Class or workshop',
      detail: 'Perfume making, ceramics, a language — whatever you actually signed up for',
      cad: { unit: 'week', dayOfWeek: 5 }, modes: ['base','build','optimize'], slot: 'anytime', minutes: 120,
      why: 'A booked class is the one hobby format that survives a busy week, because someone else ' +
           'is holding the time.' },
    { id: 'hb-side',    domain: 'hobby', type: 'DO', title: 'Side project',
      detail: 'The thing you are exploring with no deadline attached',
      cad: { unit: 'week', times: 2, offset: 3 }, modes: ['base','build','optimize'], slot: 'evening', minutes: 90 },
    { id: 'hb-reflect', domain: 'hobby', type: 'REVIEW', title: 'Reflection & planning',
      detail: 'Fifteen minutes to look at the week ahead',
      cad: { unit: 'week', dayOfWeek: 6 }, modes: ['base','build','optimize'], slot: 'evening', minutes: 20 }
  ];

  /* ------------------------------------------------- nutrition rotation */
  LifeOS.NUTRITION = {
    note: 'An illustrative template inspired by Dr. Michael Greger’s Daily Dozen. ' +
          'It is a guide, not a prescription — swap any category for what fits your ' +
          'diet, culture, budget and allergies.',
    source: { label: 'Daily Dozen — NutritionFacts.org', url: 'https://nutritionfacts.org/daily-dozen/' },
    dailyBase: [
      'A whole grain (oats, quinoa, brown rice)',
      'A protein anchor that fits your diet',
      'Ground flax',
      'Water or tea within reach all day'
    ],
    categories: [
      { key: 'berries',     label: 'Berries',     foods: ['Blueberries','Raspberries','Strawberries','Blackberries'] },
      { key: 'fruit',       label: 'Other fruit', foods: ['Apple','Orange','Banana','Pear','Mango','Kiwi','Grapes'] },
      { key: 'greens',      label: 'Greens',      foods: ['Spinach','Kale','Arugula','Swiss chard'] },
      { key: 'cruciferous', label: 'Cruciferous', foods: ['Broccoli','Cauliflower','Cabbage','Brussels sprouts'] },
      { key: 'veg',         label: 'Other veg',   foods: ['Peppers','Carrots','Mushrooms','Squash','Tomatoes'] },
      { key: 'legumes',     label: 'Legumes',     foods: ['Lentils','Chickpeas','Black beans','Kidney beans','Split peas'] },
      { key: 'grains',      label: 'Whole grains',foods: ['Oats','Quinoa','Brown rice','Barley','Buckwheat'] },
      { key: 'nuts',        label: 'Nuts & seeds', foods: ['Walnuts','Almonds','Pumpkin seeds','Sunflower seeds'] }
    ],
    /* Substitutions applied when a constraint is present. */
    swaps: {
      vegan:       { 'A protein anchor that fits your diet': 'Tofu, tempeh, or a legume-forward meal' },
      dairyfree:   { 'A protein anchor that fits your diet': 'Eggs, fish, tofu, or legumes — no dairy' },
      glutenfree:  { 'A whole grain (oats, quinoa, brown rice)': 'Quinoa, brown rice, or certified GF oats' },
      nutallergy:  { 'Ground flax': 'Ground flax or chia — seeds only, no tree nuts' }
    }
  };

  /* --------------------------------------------------- calendar scaffold */
  LifeOS.DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
  LifeOS.SLOTS = [
    { key: 'morning', label: 'Morning' },
    { key: 'workday', label: 'Workday' },
    { key: 'evening', label: 'Evening' },
    { key: 'night',   label: 'Night' }
  ];

  /* Preferred weekday spread for N-times-per-week items, 0 = Monday. */
  LifeOS.SPREAD = {
    1: [0],
    2: [0, 3],
    3: [0, 2, 4],
    4: [0, 1, 3, 4],
    5: [0, 1, 2, 3, 4],
    6: [0, 1, 2, 3, 4, 5],
    7: [0, 1, 2, 3, 4, 5, 6]
  };
})(window);
