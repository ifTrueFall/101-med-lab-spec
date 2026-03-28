const chapter14Questions = [
    {
        q: "What are the three layers of the skin, from outermost to innermost?",
        options: [
            "Dermis, Epidermis, Subcutaneous",
            "Epidermis, Dermis, Subcutaneous",
            "Subcutaneous, Dermis, Epidermis",
            "Epidermis, Hypodermis, Dermis"
        ],
        answer: 1,
        explanation: "The skin consists of the epidermis (outer), dermis (middle), and the subcutaneous/hypodermis (inner fatty layer).",
        cite: "Page 267"
    },
    {
        q: "Which type of burn is characterized by damage only to the epidermis, resulting in redness and pain without blisters?",
        options: [
            "First-degree (Superficial)",
            "Second-degree (Partial-thickness)",
            "Third-degree (Full-thickness)",
            "Fourth-degree"
        ],
        answer: 0,
        explanation: "Superficial burns, like a mild sunburn, only involve the epidermis and heal quickly without scarring.",
        cite: "Page 268"
    },
    {
        q: "What is a defining characteristic of a 'Second-degree' (Partial-thickness) burn?",
        options: [
            "Charred, leathery skin",
            "Lack of pain due to nerve destruction",
            "The presence of blisters and intense pain",
            "Damage extending into the bone"
        ],
        answer: 2,
        explanation: "Partial-thickness burns involve the epidermis and varying depths of the dermis, typically causing blisters and significant pain.",
        cite: "Page 268"
    },
    {
        q: "Why is a 'Third-degree' (Full-thickness) burn often described as being 'painless' at the center?",
        options: [
            "The patient is in shock.",
            "The burn has destroyed the sensory nerve endings in the dermis.",
            "The heat cauterizes the brain's pain receptors.",
            "Third-degree burns are actually the most painful."
        ],
        answer: 1,
        explanation: "Full-thickness burns destroy the entire dermis, including the nerve endings, though surrounding areas remain painful.",
        cite: "Page 269"
    },
    {
        q: "Using the 'Rule of Nines,' what percentage of TBSA is assigned to the entire front torso (chest and abdomen)?",
        options: [
            "9%",
            "18%",
            "36%",
            "4.5%"
        ],
        answer: 1,
        explanation: "The anterior (front) trunk is 18%, and the posterior (back) trunk is 18%, totaling 36% for the entire torso.",
        cite: "Page 270"
    },
    {
        q: "According to the 'Rule of Nines,' the entire left leg of an adult casualty accounts for what percentage of TBSA?",
        options: [
            "9%",
            "13.5%",
            "18%",
            "27%"
        ],
        answer: 2,
        explanation: "Each entire lower extremity (front and back) is calculated as 18% of the TBSA.",
        cite: "Page 270"
    },
    {
        q: "When using the 'Rule of Palms' for small burns, the casualty's palm (including fingers) represents approximately what percentage of their TBSA?",
        options: [
            "0.5%",
            "1%",
            "3%",
            "5%"
        ],
        answer: 1,
        explanation: "The area of the patient's own hand is roughly 1% of their total body surface area.",
        cite: "Page 270"
    },
    {
        q: "What is the primary clinical concern for a casualty with facial burns, singed nasal hairs, or carbonaceous sputum?",
        options: [
            "Scarring of the face",
            "Inhalation injury and potential airway obstruction",
            "Loss of vision",
            "Infection of the nose"
        ],
        answer: 1,
        explanation: "These are signs of inhalation injury; heat or chemicals can cause rapid swelling (edema) of the airway, leading to obstruction.",
        cite: "Page 272"
    },
    {
        q: "In TCCC, what is the initial fluid resuscitation rate for an adult with burns covering 20% or more of TBSA (Rule of 10)?",
        options: [
            "TBSA % x 10 mL/hr",
            "TBSA % x 100 mL/hr",
            "500 mL bolus every hour",
            "Fixed rate of 1000 mL/hr"
        ],
        answer: 0,
        explanation: "The 'Rule of 10' calculation is: (TBSA % rounded to nearest 10) x 10 = initial mL/hr rate.",
        cite: "Page 275"
    },
    {
        q: "For a casualty weighing over 80 kg, how much extra fluid is added to the 'Rule of 10' for every 10 kg of additional body weight?",
        options: [
            "50 mL/hr",
            "100 mL/hr",
            "150 mL/hr",
            "200 mL/hr"
        ],
        answer: 1,
        explanation: "For every 10 kg above 80 kg, you add 100 mL/hr to the initial infusion rate.",
        cite: "Page 275"
    },
    {
        q: "What is the preferred fluid for resuscitation of a burn casualty NOT in hemorrhagic shock?",
        options: [
            "Normal Saline",
            "Lactated Ringers or Plasma-Lyte",
            "Whole Blood",
            "5% Dextrose"
        ],
        answer: 1,
        explanation: "Isotonic crystalloids like LR or Plasma-Lyte are preferred for burn shock to maintain electrolyte balance.",
        cite: "Page 275"
    },
    {
        q: "If a burn casualty is ALSO in hemorrhagic shock, what is the priority for fluid resuscitation?",
        options: [
            "Lactated Ringers for the burns",
            "HES (Hespan)",
            "Blood products (Whole Blood) for the hemorrhagic shock",
            "Oral fluids"
        ],
        answer: 2,
        explanation: "Hemorrhagic shock kills faster than burn shock; therefore, resuscitation with blood products takes priority.",
        cite: "Page 275"
    },
    {
        q: "Why should you avoid applying ice or ice water directly to a large burn?",
        options: [
            "It causes too much pain.",
            "It can cause hypothermia and further tissue damage due to vasoconstriction.",
            "It makes the burn harder to see.",
            "It increases the risk of infection."
        ],
        answer: 1,
        explanation: "Large burns destroy the skin's ability to regulate temperature; cooling them with ice can lead to systemic hypothermia.",
        cite: "Page 276"
    },
    {
        q: "What is the correct way to manage 'White Phosphorus' particles embedded in the skin?",
        options: [
            "Brush them off with a dry cloth",
            "Keep the area smothered with water, wet dressings, or mud to prevent re-ignition",
            "Apply a dry sterile dressing",
            "Use a flashlight to burn them out"
        ],
        answer: 1,
        explanation: "White phosphorus ignites when exposed to oxygen; keeping it wet prevents it from burning the casualty further.",
        cite: "Page 278"
    },
    {
        q: "A 'Circumferential' burn to an extremity is a medical emergency because:",
        options: [
            "It requires more bandages.",
            "As the tissue swells, the non-elastic burned skin cuts off circulation (Compartment Syndrome).",
            "It always results in amputation.",
            "The patient cannot move the limb."
        ],
        answer: 1,
        explanation: "Burned skin (eschar) is rigid. Swelling underneath can compress vessels and nerves, requiring an escharotomy.",
        cite: "Page 276"
    },
    {
        q: "What is the major internal danger of a high-voltage electrical burn?",
        options: [
            "Visible skin charring",
            "Cardiac arrhythmias or arrest and deep muscle damage",
            "Loss of hearing",
            "Singed hair"
        ],
        answer: 1,
        explanation: "Electricity travels through the body, often causing significant internal damage and disrupting the heart's rhythm.",
        cite: "Page 279"
    },
    {
        q: "Which medication is used for pain control in a burn casualty who is NOT in shock and NOT at risk for respiratory distress?",
        options: [
            "Aspirin",
            "Ketamine or OTFC (Fentanyl)",
            "Oral fluids only",
            "Antibiotics"
        ],
        answer: 1,
        explanation: "Burn pain is severe; TCCC analgesia protocols (Ketamine/Fentanyl) should be followed effectively.",
        cite: "Page 277"
    },
    {
        q: "When covering a burn for transport, which type of dressing is preferred?",
        options: [
            "Wet, soaked gauze",
            "Dry, sterile dressing or a clean sheet",
            "Adhesive bandages",
            "Topical antibiotic cream"
        ],
        answer: 1,
        explanation: "Dry dressings are preferred for transport to help prevent hypothermia.",
        cite: "Page 277"
    },
    {
        q: "What is the 'target' urine output for a burn casualty being resuscitated with fluids?",
        options: [
            "10-20 mL/hr",
            "30-50 mL/hr",
            "100-150 mL/hr",
            "500 mL/hr"
        ],
        answer: 1,
        explanation: "A urine output of 30-50 mL per hour indicates that the kidneys are being adequately perfused.",
        cite: "Page 275"
    },
    {
        q: "True or False: Antibiotics are given to every burn casualty at the point of injury, even if there are no other wounds.",
        options: [
            "True",
            "False"
        ],
        answer: 1,
        explanation: "Antibiotics are indicated for penetrating trauma; they are NOT routinely given for isolated burns at the point of injury.",
        cite: "Page 277"
    }
];
