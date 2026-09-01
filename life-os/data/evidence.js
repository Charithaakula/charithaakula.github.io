/* Life OS — where each recommendation comes from.
 *
 * The point of this file is honesty about strength of evidence. Some of what
 * Life OS suggests sits on a major public-health guideline. Some is sensible
 * convention with no trial behind it. Some is pure preference. Presenting all
 * three in the same voice would be the dishonest thing, so every entry carries
 * a confidence grade and the UI shows it.
 *
 *   strong      a named guideline from a major body (WHO, AASM, AAD, NIST…)
 *   general     widely recommended by credible sources, less formally codified
 *   convention  a sensible default. No evidence base — it is an organising choice
 *   preference  entirely yours. Life OS only holds the slot
 *
 * Every URL here was fetched and read while writing this file. Where a number
 * could not be verified directly from the source, the entry says so rather
 * than quoting it as though it had been.
 */
(function (root) {
  var LifeOS = (root.LifeOS = root.LifeOS || {});

  LifeOS.CONFIDENCE = {
    strong:     { label: 'Strong consensus', note: 'A named guideline from a major public-health body.' },
    general:    { label: 'General guidance', note: 'Widely recommended by credible sources; less formally codified.' },
    convention: { label: 'Convention',       note: 'A sensible default with no evidence base. An organising choice, not a finding.' },
    preference: { label: 'Your call',        note: 'Entirely personal. Life OS only holds the slot open.' }
  };

  LifeOS.EVIDENCE = {

    /* ------------------------------------------------------------ movement */
    strength: {
      headline: '2 sessions a week',
      confidence: 'strong',
      what: 'Muscle-strengthening activity on 2 or more days a week, working all major muscle groups.',
      why: 'This is the floor in every major national and international physical-activity guideline. ' +
           'Two sessions is not an ambitious target — it is the minimum dose associated with maintaining ' +
           'strength and function. Life OS treats it as an essential rather than an optimisation.',
      caveat: 'The WHO fact sheet states the 150-minute aerobic figure explicitly; the "2 days a week" ' +
              'muscle-strengthening figure comes from the fuller guideline documents linked below rather ' +
              'than the summary page, so treat it as guideline-sourced but not quoted here verbatim.',
      sources: [
        { label: 'WHO — Physical activity fact sheet', url: 'https://www.who.int/news-room/fact-sheets/detail/physical-activity',
          note: 'States "at least 150 minutes of moderate-intensity physical activity per week" for adults.' },
        { label: 'Physical Activity Guidelines for Americans, 2nd edition', url: 'https://odphp.health.gov/our-work/nutrition-physical-activity/physical-activity-guidelines/current-guidelines',
          note: 'The full US guideline document. Numbers live in the PDF, not the landing page.' }
      ]
    },

    cardio: {
      headline: '150 minutes a week, moderate',
      confidence: 'strong',
      what: 'At least 150 minutes of moderate-intensity aerobic activity per week — or the vigorous ' +
            'equivalent, which is roughly half that.',
      why: 'The single most consistently repeated number in public health. Life OS splits it into two ' +
           'sessions plus a daily walk rather than one heroic block, because a plan you can miss once ' +
           'and still hit is better than one you cannot.',
      caveat: 'WHO also stresses that "any amount of physical activity is better than none" — the ' +
              'threshold is a target, not a pass/fail line.',
      sources: [
        { label: 'WHO — Physical activity fact sheet', url: 'https://www.who.int/news-room/fact-sheets/detail/physical-activity',
          note: 'Verified: "at least 150 minutes of moderate-intensity physical activity per week".' }
      ]
    },

    walk: {
      headline: 'A daily walk',
      confidence: 'general',
      what: 'Twenty minutes of walking, most days.',
      why: 'Kept even in Minimum Mode because it is the cheapest thing to protect and the first thing ' +
           'to survive a bad week. It also does real work against sedentary time, which WHO calls out ' +
           'separately from exercise.',
      caveat: 'Specific step-count targets (10,000 and so on) are marketing heritage, not guideline. ' +
              'Life OS deliberately does not set one.',
      sources: [
        { label: 'WHO — Physical activity fact sheet', url: 'https://www.who.int/news-room/fact-sheets/detail/physical-activity',
          note: '"All age groups should limit the amount of time being sedentary."' }
      ]
    },

    mobility: {
      headline: 'Dynamic, not static — and not for injury prevention',
      confidence: 'general',
      what: 'Ten minutes of *dynamic* mobility for hips, thoracic spine and ankles, three times a week.',
      why: 'Static stretching does reliably improve flexibility — moderate-to-large gains with regular ' +
           'practice. If range of motion is what you want, it works. Life OS schedules it on that basis ' +
           'and no other.',
      caveat: 'Do not do this expecting fewer injuries. A systematic review found moderate-to-strong ' +
              'evidence that routine static stretching does not reduce overall injury rates, with all ' +
              'four RCTs concluding it was ineffective for that purpose. ACSM and the European College ' +
              'of Sports Sciences recommend dynamic stretching over static in warm-ups, which is why the ' +
              'item says dynamic. The specific dose — ten minutes, three times a week — remains ' +
              'Life OS’s choice, not a guideline number.',
      sources: [
        { label: 'Static stretching in warm-up and injury prevention: systematic review (PubMed)', url: 'https://pubmed.ncbi.nlm.nih.gov/18785063/',
          note: 'Verified: moderate-to-strong evidence static stretching does not reduce overall injury rates.' },
        { label: 'Optimising the dose of static stretching to improve flexibility (PubMed)', url: 'https://pubmed.ncbi.nlm.nih.gov/39614059/',
          note: 'Verified: it does improve flexibility — that is the reason to do it.' }
      ]
    },

    /* --------------------------------------------------------------- sleep */
    sleep: {
      headline: '7 or more hours',
      confidence: 'strong',
      what: 'Adults should sleep 7 or more hours per night on a regular basis.',
      why: 'A joint consensus statement of the American Academy of Sleep Medicine and the Sleep Research ' +
           'Society, from a 12-month project by a panel of 15 sleep experts. Life OS never cuts sleep, ' +
           'in any mode, because every other domain degrades first when it slips.',
      caveat: 'The panel placed no upper limit on hours. The common "7–9" framing adds a ceiling the ' +
              'consensus statement itself does not.',
      sources: [
        { label: 'AASM — Seven or more hours of sleep per night', url: 'https://aasm.org/seven-or-more-hours-of-sleep-per-night-a-health-necessity-for-adults/',
          note: 'Verified: 7+ hours, no upper limit set.' },
        { label: 'AASM / SRS joint consensus statement (JCSM)', url: 'https://jcsm.aasm.org/doi/10.5664/jcsm.4758',
          note: 'The underlying peer-reviewed statement.' }
      ]
    },

    /* ----------------------------------------------------------- nutrition */
    nutrition: {
      headline: 'The Daily Dozen, filtered by season',
      confidence: 'general',
      what: 'A daily checklist of food categories — beans ×3, berries ×1, greens ×2, whole grains ×3, ' +
            'and so on — narrowed to what is actually in season where you live.',
      why: 'The Daily Dozen is a well-known, coherent framework that converts "eat healthily" into ' +
           'something checkable. Life OS uses it as one selectable framework, not as settled truth.',
      caveat: 'Its author describes it as "a checklist to inspire you", explicitly "not meant to be ' +
              'prescriptive" and "an aspirational minimum that can be customized". It is also ' +
              'plant-forward by design and does not speak to protein targets — see Protein below.',
      sources: [
        { label: 'NutritionFacts.org — Dr. Greger’s Daily Dozen', url: 'https://nutritionfacts.org/daily-dozen/',
          note: 'Verified: the twelve categories and their serving counts.' }
      ]
    },

    protein: {
      headline: '0.8 g/kg minimum; 1.2–2.0 g/kg if you train',
      confidence: 'strong',
      what: 'The RDA is 0.8 g of protein per kg of body weight per day. For physically active people, ' +
            'a joint position of the Academy of Nutrition and Dietetics, Dietitians of Canada and the ' +
            'American College of Sports Medicine recommends 1.2–2.0 g/kg/day.',
      why: 'The Daily Dozen is a food-category checklist and carries no macronutrient targets, so on its ' +
           'own it will not tell you whether you are eating enough protein. Life OS adds this layer ' +
           'explicitly rather than leaving the gap.',
      caveat: 'The RDA is defined as the minimum to prevent loss of lean mass — it is frequently ' +
              'misread as an optimum. Kidney disease and some other conditions change the picture ' +
              'entirely; this is a conversation for your doctor, not a web page.',
      sources: [
        { label: 'Current Concepts in Dietary Protein Requirements in Adults (PMC)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5420553/',
          note: 'Verified: RDA 0.8 g/kg/d; joint AND/DC/ACSM recommendation of 1.2–2.0 g/kg/d for active adults.' },
        { label: 'Harvard Health — How much protein do you need every day?', url: 'https://www.health.harvard.edu/blog/how-much-protein-do-you-need-every-day-201506188096',
          note: 'Plain-language explainer of the same numbers.' }
      ]
    },

    /* ------------------------------------------------------- body and skin */
    grooming: {
      headline: 'SPF 30+, broad spectrum, daily',
      confidence: 'strong',
      what: 'Sunscreen that is SPF 30 or higher, broad spectrum, and water resistant (40 or 80 minutes).',
      why: 'The American Academy of Dermatology names all three properties explicitly. It is the ' +
           'shortest-duration, highest-return item in the whole catalog, which is why Life OS keeps ' +
           'morning skincare even in Minimum Mode.',
      caveat: 'The AAD page verified the SPF, spectrum and water-resistance figures. It did not state ' +
              'application quantity or reapplication interval on that page, so Life OS does not quote one. ' +
              'Everything else in a routine — actives, order, frequency — is preference and marketing.',
      sources: [
        { label: 'AAD — How to select a sunscreen', url: 'https://www.aad.org/public/everyday-care/sun-protection/shade-clothing-sunscreen/how-to-select-sunscreen',
          note: 'Verified: "SPF 30 or higher", broad spectrum, water resistant 40 or 80 minutes.' }
      ]
    },

    /* --------------------------------------------------------------- money */
    money: {
      headline: 'A weekly check-in, then an emergency fund',
      confidence: 'general',
      what: 'A short weekly look at balances and anything due; separately, savings set aside for shocks.',
      why: 'The CFPB frames emergency savings around your own history rather than a universal multiple: ' +
           'look at the unexpected expenses you have actually had and what they cost, and set the goal ' +
           'from that. It uses "at least a month of income saved" as one marker of security.',
      caveat: 'The familiar "3–6 months of expenses" rule is convention, not a regulator’s number, and ' +
              'Life OS does not assert it. Nothing here is investment advice — this domain is reminders ' +
              'and organisation only.',
      sources: [
        { label: 'CFPB — An essential guide to building an emergency fund', url: 'https://www.consumerfinance.gov/an-essential-guide-to-building-an-emergency-fund/',
          note: 'Verified: goal-setting from your own past expenses; at least one month of income as a marker.' },
        { label: 'CFPB — Saving for financial shocks and emergencies (PDF)', url: 'https://files.consumerfinance.gov/f/cfpb_fin-ed-digest_saving-for-emergencies.pdf',
          note: 'The underlying financial-education digest.' }
      ]
    },

    /* ------------------------------------------------------- digital life */
    digital: {
      headline: 'Long passwords, no forced rotation, breach-checked',
      confidence: 'strong',
      what: 'Use long passphrases, do not rotate them on a schedule, and check them against known breach lists.',
      why: 'NIST SP 800-63B is explicit that verifiers should not require memorized secrets to be changed ' +
           'arbitrarily or periodically, and that chosen passwords should be compared against a blocklist ' +
           'drawn from previous breach corpuses. Life OS therefore schedules an audit twice a year rather ' +
           'than a quarterly rotation ritual.',
      caveat: 'This is guidance for systems as much as for people. The practical version: a password ' +
              'manager, unique long passphrases, 2FA, and change on evidence of compromise — not on a timer.',
      sources: [
        { label: 'NIST SP 800-63B — Strength of passwords', url: 'https://pages.nist.gov/800-63-4/sp800-63b/passwords/',
          note: 'Verified: no arbitrary periodic change; compare against breach blocklists; allow length.' },
        { label: 'NIST SP 800-63B (full document)', url: 'https://pages.nist.gov/800-63-4/sp800-63b.html', note: '' }
      ]
    },

    /* --------------------------------------------------- desk and screen */
    desk: {
      headline: '20-20-20 for eyes; move the rest hourly',
      confidence: 'strong',
      what: 'Every 20 minutes, look at something 20 feet away for 20 seconds. Separately: get out of ' +
            'the chair roughly hourly, reset neck and shoulders between meetings, and do back and hip ' +
            'work a few times a week.',
      why: 'The American Optometric Association recommends the 20-20-20 rule specifically for digital ' +
           'eye strain, and lists neck and shoulder pain among the symptoms of the same syndrome — which ' +
           'is why Life OS groups eyes, neck and back together rather than filing them separately.',
      caveat: 'The eye rule is AOA guidance and one study found adherence significantly associated with ' +
              'reduced symptom severity. The back-and-neck doses here — three sessions a week, a few ' +
              'minutes between meetings — are convention, not guideline. Persistent pain or vision change ' +
              'is a clinician’s question, not a scheduling one.',
      sources: [
        { label: 'AOA — 20-20-20 rule and digital eye strain (PDF)', url: 'https://www.aoa.org/AOA/Images/Patients/Eye%20Conditions/20-20-20-rule.pdf',
          note: 'Verified: 20-second break, 20 feet away, every 20 minutes.' },
        { label: 'AOA — Computer vision syndrome (digital eye strain)', url: 'https://www.aoa.org/healthy-eyes/eye-and-vision-conditions/computer-vision-syndrome',
          note: 'Defines the syndrome; lists eyestrain, headaches, blurred vision, dry eyes, neck and shoulder pain.' },
        { label: 'AOA — Protecting your eyes at work', url: 'https://www.aoa.org/healthy-eyes/caring-for-your-eyes/protecting-your-vision', note: '' }
      ]
    },

    /* ---------------------------------------------------------- retirement */
    retirement: {
      headline: 'Match first. Then limits. Then the clever stuff.',
      confidence: 'strong',
      what: 'A fixed order of operations: capture the full employer match, decide pre-tax versus Roth, ' +
            'check this year’s limits, and only then look at backdoor routes. Life OS schedules each as ' +
            'a prompt to go and check something — never as an instruction to do it.',
      why: 'The dollar amounts are published by the IRS and change most years, which is exactly why ' +
           'this belongs on a yearly cadence rather than in your head. For 2026 the elective deferral ' +
           'limit is $24,500; catch-up is $8,000 at 50+, and $11,250 at ages 60–63 under SECURE 2.0; ' +
           'the IRA limit is $7,500; compensation counted is capped at $360,000. ' +
           'The match is first in the order because it is the only unambiguously free money here, ' +
           'and it expires with the plan year.',
      caveat: 'Two traps worth naming. **The pro-rata rule applies to the backdoor Roth IRA but not to ' +
              'the mega backdoor inside a 401(k)** — a 401(k) has no aggregation rule, so after-tax and ' +
              'pre-tax money there do not contaminate each other, while an existing pre-tax *IRA* ' +
              'balance makes a backdoor Roth partly taxable. And the mega backdoor only exists if your ' +
              'plan permits after-tax non-Roth contributions *and* in-plan or in-service conversion — ' +
              'many do not, so the first step is a phone call, not a transfer. ' +
              'Numbers above were read from the IRS in 2026 and will go stale; the item on your plan ' +
              'says "check this year’s limits" for that reason. None of this is investment or tax ' +
              'advice, and the moment real money is involved it is worth an hour with someone qualified.',
      sources: [
        { label: 'IRS — 401(k) limit increases to $24,500 for 2026, IRA limit to $7,500', url: 'https://www.irs.gov/newsroom/401k-limit-increases-to-24500-for-2026-ira-limit-increases-to-7500',
          note: 'Verified: the 2026 figures quoted above.' },
        { label: 'IRS — 401(k) and profit-sharing plan contribution limits', url: 'https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-401k-and-profit-sharing-plan-contribution-limits',
          note: 'The page to re-check each January.' },
        { label: 'IRS — Catch-up contributions', url: 'https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-catch-up-contributions',
          note: 'Verified: $8,000 at 50+; $11,250 at 60–63 under SECURE 2.0.' },
        { label: 'IRS — Rollovers of after-tax contributions in retirement plans', url: 'https://www.irs.gov/retirement-plans/rollovers-of-after-tax-contributions-in-retirement-plans',
          note: 'Verified: simultaneous distributions to multiple destinations are treated as one, letting pre-tax and after-tax amounts be split.' },
        { label: 'Bogleheads — Mega-backdoor Roth', url: 'https://www.bogleheads.org/wiki/Mega-backdoor_Roth',
          note: 'Community wiki, not a regulator. Useful on the pro-rata distinction; verify against the IRS.' }
      ]
    },

    /* ------------------------------------------------------ back and neck */
    back: {
      headline: 'Exercise is the first-line treatment',
      confidence: 'strong',
      what: 'Specific back and hip work a few times a week — motor-control exercise, yoga or tai chi ' +
            'all qualify. Not "stretch your back when it hurts".',
      why: 'The American College of Physicians guideline puts non-pharmacologic treatment first for ' +
           'chronic low back pain precisely because it carries fewer harms than drugs, and names ' +
           'exercise, motor control exercise, yoga and tai chi among the options. This is one of the ' +
           'better-evidenced recommendations in the whole app.',
      caveat: 'The guideline is about *treating* existing chronic low back pain. Evidence that this ' +
              'prevents back pain in people who do not have it is weaker. Several of the listed options ' +
              'rest on low-quality evidence — exercise and multidisciplinary rehabilitation are the ' +
              'moderate-quality ones. New, severe, or radiating pain is a clinician’s question.',
      sources: [
        { label: 'ACP — Noninvasive Treatments for Low Back Pain (Annals of Internal Medicine)', url: 'https://www.acpjournals.org/doi/10.7326/M16-2367',
          note: 'Verified: non-pharmacologic first-line; exercise, motor control exercise, yoga, tai chi, MBSR named.' },
        { label: 'Cochrane — Exercise therapy for chronic low back pain (Hayden 2021)', url: 'https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD009790.pub2/full',
          note: 'The underlying systematic review of exercise specifically.' }
      ]
    },

    neck: {
      headline: 'Specific strengthening — not general stretching',
      confidence: 'strong',
      what: 'Targeted neck and shoulder-girdle strengthening. Life OS deliberately does not schedule ' +
            'generic "neck stretches".',
      why: 'This is the finding that changed what Life OS recommends. The Cochrane review of exercise ' +
           'for mechanical neck disorders reports a standardised mean difference of −0.71 for pain with ' +
           'strength-specific training — but also that chronic neck pain does *not* respond to upper-' +
           'extremity stretching, or to a general exercise programme. Doing something vague is closer ' +
           'to doing nothing than most people assume.',
      caveat: 'Effect sizes are modest — roughly a 10–15% improvement in self-reported pain, about 1 to ' +
              '1.5 points on a 0–10 scale. Cochrane rates much of this low-to-moderate quality and says ' +
              'further research is likely to change the estimate.',
      sources: [
        { label: 'Cochrane — Exercises for mechanical neck disorders (Gross 2015)', url: 'https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD004250.pub5/full',
          note: 'Verified: strength-specific training SMD −0.71; general programmes and upper-extremity stretching not effective.' },
        { label: 'Effectiveness and optimal dosage of exercise for chronic neck pain (PMC)', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7286530/',
          note: 'Narrative synthesis of dosage.' }
      ]
    },

    sitting: {
      headline: 'Walk for 2–3 minutes. Standing up is not enough.',
      confidence: 'strong',
      what: 'Interrupt long sitting roughly every 30 minutes with a couple of minutes of light walking.',
      why: 'The second finding that changed the app. Trials breaking up sitting with short walks show ' +
           'clinically meaningful improvements in post-meal glucose and insulin — one reported the ' +
           '5-hour glucose area-under-curve 55.5% lower with light walking every 20 minutes versus ' +
           'uninterrupted sitting. Crucially, in that comparison **standing breaks did not improve ' +
           'metabolic outcomes; walking did.** Life OS used to say "stand up". It now says "walk".',
      caveat: 'Most of these are small acute crossover trials measuring same-day metabolic markers, not ' +
              'long-term outcomes. The direction is consistent; the magnitude in daily life is not settled.',
      sources: [
        { label: 'Breaking Up Prolonged Sitting With Standing or Walking (Diabetes Care)', url: 'https://diabetesjournals.org/care/article/39/1/130/31522/Breaking-Up-Prolonged-Sitting-With-Standing-or',
          note: 'Verified: walking breaks improved postprandial metabolism; standing breaks did not.' },
        { label: 'Acute effects of breaking up seated office work (PubMed)', url: 'https://pubmed.ncbi.nlm.nih.gov/28422556/',
          note: 'Verified: interstitial glucose iAUC 55.5% lower with light walking every 20 min.' },
        { label: 'Frequency of Interruptions to Sitting Time (PMC)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8247505/', note: '' }
      ]
    },

    stress: {
      headline: 'Meditation helps anxiety — modestly, and no better than exercise',
      confidence: 'general',
      what: 'A short regular practice — meditation, breathing, or simply writing it down.',
      why: 'The largest systematic review of meditation programmes (47 trials, 3,320 participants, ' +
           'JAMA Internal Medicine) found moderate evidence of improvement in anxiety (effect size 0.38 ' +
           'at 8 weeks, 0.22 at 3–6 months), depression (0.30) and pain (0.33).',
      caveat: 'Read the rest of that paper before buying an app subscription. It found *low* evidence ' +
              'for stress and distress specifically, and either low evidence of no effect or insufficient ' +
              'evidence for positive mood, attention, sleep, eating and weight. It also found **no ' +
              'evidence that meditation was better than any active treatment** — drugs, exercise, or ' +
              'other behavioural therapies. If you already train, you may be getting much of this.',
      sources: [
        { label: 'Goyal et al. — Meditation Programs for Psychological Stress and Well-being (JAMA Intern Med)', url: 'https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/1809754',
          note: 'Verified: effect sizes above; no superiority over active treatments.' },
        { label: 'Full text (PMC)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4142584/', note: '' }
      ]
    },

    /* ----------------------------------------------- honest about the rest */
    preventive: {
      headline: 'Stay current on screenings',
      confidence: 'general',
      what: 'Dental roughly twice a year, an annual physical, eye and skin checks.',
      why: 'These intervals are standard practice rather than a single citable rule, and the right ' +
           'schedule genuinely depends on your age, history and risk factors.',
      caveat: 'Screening intervals are individual. Life OS holds a placeholder date so the appointment ' +
              'gets booked; your clinician sets the actual cadence. Do not treat these dates as advice.',
      sources: [
        { label: 'US Preventive Services Task Force — recommendation topics', url: 'https://www.uspreventiveservicestaskforce.org/uspstf/topic_search_results?topic_status=P',
          note: 'The authoritative index for what is recommended at what age. Not quoted here — read it with your doctor.' }
      ]
    },

    career:        { headline: 'Protected deep work', confidence: 'convention',
      what: 'One protected block a day for the thing that actually matters, plus deliberate learning.',
      why: 'A widely used organising idea, not a clinical finding. Life OS schedules it because ' +
           'unprotected time reliably gets taken.',
      caveat: 'The productivity literature here is popular rather than rigorous. Treat the block length ' +
              'as a starting point and tune it.', sources: [] },

    relationships: { headline: 'Meaningful contact weekly', confidence: 'general',
      what: 'One real conversation or meeting a week, plus a monthly look at who you have not spoken to.',
      why: 'Social connection is consistently associated with health outcomes, but no body publishes ' +
           '"see a friend N times a week". The cadence is Life OS’s choice.',
      caveat: 'The frequency is invented. The category is not.', sources: [] },

    events:        { headline: 'Decide on invites once a week', confidence: 'convention',
      what: 'A single weekly pass over Luma, Partiful and group chats, and something in the diary every ' +
            'fortnight.',
      why: 'Pure organising logic: invitations expire quietly, and batching the yes/no is what stops that.',
      caveat: 'No evidence base whatsoever. It is a scheduling trick.', sources: [] },

    home:          { headline: 'Laundry and one reset a week', confidence: 'convention',
      what: 'A weekly reset, a daily ten-minute tidy, and maintenance on a slow cadence.',
      why: 'Chosen so the house never reaches the state that needs a whole weekend.',
      caveat: 'Entirely convention.', sources: [] },

    admin:         { headline: 'One weekly batch', confidence: 'convention',
      what: 'Thirty minutes for every small task, once a week.',
      why: 'Batching is what stops admin from leaking into every evening. This is the single most ' +
           'load-bearing convention in the whole system.',
      caveat: 'Convention, not evidence.', sources: [] },

    mind:          { headline: 'Get it out of your head', confidence: 'general',
      what: 'Journalling a few times a week, optional stillness, a weekly look at screen time.',
      why: 'Expressive writing has a reasonable literature behind it; the specific cadence here does not.',
      caveat: 'Life OS is not a mental-health tool. If something here is load-bearing for you, that ' +
              'belongs with a professional, and the "Therapy or check-in" item exists to hold that slot.',
      sources: [] },

    learning:      { headline: 'Two focused sessions a week', confidence: 'preference',
      what: 'Deliberate learning with a direction, twice a week.',
      why: 'Entirely a personal target. Life OS holds the slot so it does not get eaten.',
      caveat: '', sources: [] },

    hobby:         { headline: 'Protected time that is only yours', confidence: 'preference',
      what: 'One block a week with no outcome attached, plus whatever projects you name.',
      why: 'Listed explicitly because it is the first thing people quietly drop, and the last thing they ' +
           'notice is missing.',
      caveat: 'There is no correct amount. The point is that it is on the grid at all.', sources: [] },

    travel:        { headline: 'Plan before prices climb', confidence: 'convention',
      what: 'A quarterly look at the next trip, and booking ahead.',
      why: 'Logistics, not wellbeing.', caveat: '', sources: [] },

    pets:          { headline: 'Fed, walked, vet up to date', confidence: 'general',
      what: 'Daily walks, monthly preventatives, an annual check-up.',
      why: 'Standard practice; your vet sets the real schedule.',
      caveat: 'Preventative schedules vary by species, region and parasite risk. Ask your vet.',
      sources: [] }
  };

  LifeOS.evidenceFor = function (key) { return LifeOS.EVIDENCE[key] || null; };
})(window);
