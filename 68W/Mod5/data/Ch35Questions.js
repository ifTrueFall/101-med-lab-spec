const ch35Questions = [
    {
        q: "What is the primary mechanism by which the body loses heat through direct contact with a colder object (e.g., lying on cold ground)?",
        options: [
            "Convection",
            "Radiation",
            "Conduction",
            "Evaporation"
        ],
        answer: 2,
        explanation: "Conduction is the transfer of heat from one material to another through direct contact. Water chills the body 25 times faster than air via conduction.",
        cite: "Page 1016"
    },
    {
        q: "Which of the following is a classic sign of 'Heat Stroke' that differentiates it from Heat Exhaustion?",
        options: [
            "Profuse sweating and muscle cramps",
            "Hot, dry skin and Altered Mental Status (AMS)",
            "Pale, cool, clammy skin",
            "Normal body temperature"
        ],
        answer: 1,
        explanation: "Heat stroke occurs when the body's temperature-regulating mechanisms fail. The patient stops sweating, and the skin becomes hot and dry. AMS is key.",
        cite: "Page 1029"
    },
    {
        q: "Why must you handle a patient with severe hypothermia extremely gently?",
        options: [
            "Their bones are brittle and will break",
            "Rough handling can trigger Ventricular Fibrillation (V-Fib)",
            "They are likely to vomit",
            "It causes them intense pain"
        ],
        answer: 1,
        explanation: "A hypothermic heart is irritable. Rough movement can cause it to go into a fatal dysrhythmia like V-Fib.",
        cite: "Page 1024"
    },
    {
        q: "What is the correct treatment for a Late/Deep Local Cold Injury (Frostbite)?",
        options: [
            "Rub the area vigorously to warm it",
            "Immerse in boiling water",
            "Rewarm rapidly in warm water (100°F-105°F) ONLY if there is no chance of refreezing",
            "Break the blisters to release pressure"
        ],
        answer: 2,
        explanation: "Never rub frostbite. Rapid rewarming should only be done if transport is delayed and there is absolutely no risk of the tissue refreezing.",
        cite: "Page 1026"
    },
    {
        q: "When assessing a pulse in a patient with severe hypothermia, how long should you check?",
        options: [
            "5 seconds",
            "10 seconds",
            "30 to 45 seconds",
            "1 minute"
        ],
        answer: 2,
        explanation: "Metabolic rates are so slow that the heart rate may be barely perceptible. Check for 30-45 seconds before starting CPR.",
        cite: "Page 1024"
    },
    {
        q: "What is 'Passive Rewarming'?",
        options: [
            "Applying heat packs to the groin and axilla",
            "Preventing further heat loss (removing wet clothes, covering with blankets) and allowing the body to warm itself",
            "Giving hot fluids by mouth",
            "Putting the patient in a warm bath"
        ],
        answer: 1,
        explanation: "Passive rewarming involves covering the patient and letting their own metabolism generate heat. It is suitable for mild hypothermia.",
        cite: "Page 1021"
    },
    {
        q: "Which spider bite typically causes a dull ache that becomes severe muscle cramps, rigidity, and abdominal pain?",
        options: [
            "Brown Recluse",
            "Black Widow",
            "Tarantula",
            "Garden Spider"
        ],
        answer: 1,
        explanation: "Black Widow venom is a neurotoxin leading to severe muscle spasms and cramping. Brown Recluse bites cause tissue necrosis.",
        cite: "Page 1043"
    },
    {
        q: "Decompression Sickness ('The Bends') is caused by:",
        options: [
            "Nitrogen bubbles forming in the blood and tissues due to rapid ascent",
            "Holding your breath while diving",
            "Oxygen toxicity",
            "Carbon monoxide poisoning"
        ],
        answer: 0,
        explanation: "Nitrogen dissolved in the blood under pressure comes out of solution if the diver surfaces too quickly, forming bubbles that block vessels.",
        cite: "Page 1033"
    },
    {
        q: "What is the primary difference between Air Embolism (AGE) and Decompression Sickness (DCS) in a diver?",
        options: [
            "AGE appears immediately (minutes); DCS symptoms are often delayed (1-48 hours)",
            "AGE is caused by nitrogen; DCS is caused by air",
            "AGE affects the joints; DCS affects the brain",
            "There is no difference"
        ],
        answer: 0,
        explanation: "Arterial Gas Embolism (AGE) is a rapid onset event (usually upon surfacing). Decompression sickness takes time for bubbles to form and cause pain.",
        cite: "Page 1034"
    },
    {
        q: "The process of losing body heat through wind or air moving across the skin is called:",
        options: [
            "Radiation",
            "Conduction",
            "Convection",
            "Respiration"
        ],
        answer: 2,
        explanation: "Convection is heat loss to moving air or water currents (wind chill factor).",
        cite: "Page 1016"
    },
    {
        q: "For a patient with Heat Exhaustion (moist, pale, normal-to-cool skin), your treatment should include:",
        options: [
            "Rapid cooling with ice baths",
            "Moving to a cool environment, splashing with water, and fanning",
            "Administering salt tablets",
            "Keeping them warm to prevent shock"
        ],
        answer: 1,
        explanation: "Remove them from the heat, remove excess clothing, and cool them (but not to the point of shivering). Treat for shock.",
        cite: "Page 1029"
    },
    {
        q: "What is the proper emergency care for a snakebite?",
        options: [
            "Cut the wound and suck out the venom",
            "Apply a tourniquet",
            "Apply ice to neutralize the venom",
            "Keep the patient calm, immobilize the extremity, and keep it at or below heart level"
        ],
        answer: 3,
        explanation: "Do NOT cut, suck, or ice. Keep the patient calm to slow the heart rate and spread of venom. Immobilize the limb.",
        cite: "Page 1045"
    },
    {
        q: "High Altitude Pulmonary Edema (HAPE) presents with:",
        options: [
            "Severe headache and vomiting",
            "Shortness of breath, dry cough progressing to frothy sputum, and cyanosis",
            "Visual hallucinations",
            "Leg pain"
        ],
        answer: 1,
        explanation: "HAPE is fluid in the lungs caused by altitude. HACE (Cerebral Edema) presents with headache and AMS.",
        cite: "Page 1047"
    },
    {
        q: "What is the most effective way to treat a marine sting (jellyfish)?",
        options: [
            "Pour fresh water on it",
            "Rub it with sand",
            "Rinse with vinegar (or hot water) to neutralize nematocysts",
            "Apply ice"
        ],
        answer: 2,
        explanation: "Vinegar (acetic acid) helps neutralize the stinging cells. Fresh water can cause them to discharge more venom.",
        cite: "Page 1046"
    },
    {
        q: "In a drowning incident, 'dry drowning' refers to:",
        options: [
            "Drowning in sand",
            "Laryngospasm sealing the airway so no water enters the lungs",
            "Water filling the stomach but not the lungs",
            "Drowning that occurs hours later"
        ],
        answer: 1,
        explanation: "Approximately 10% of drownings are 'dry,' where the larynx spasms shut to prevent water entry, causing asphyxia without water in the lungs.",
        cite: "Page 1032"
    },
    {
        q: "Biological death may be delayed in a drowning victim if:",
        options: [
            "The water is very cold (mammalian diving reflex)",
            "The water is warm",
            "The water is salt water",
            "The patient is elderly"
        ],
        answer: 0,
        explanation: "Cold water can depress metabolic rates and preserve brain function. Always resuscitate cold water drowning victims; 'They aren't dead until they're warm and dead.'",
        cite: "Page 1032"
    },
    {
        q: "Central Rewarming means:",
        options: [
            "Applying heat to the arms and legs",
            "Applying heat to the lateral chest, neck, armpits, and groin",
            "Placing the patient in a warm room",
            "Drinking hot coffee"
        ],
        answer: 1,
        explanation: "Central rewarming focuses on the core. Warming extremities first can cause 'rewarming shock' by sending cold, stagnant blood back to the heart.",
        cite: "Page 1023"
    },
    {
        q: "Which skin sign indicates an Early/Superficial Local Cold Injury (Frostnip)?",
        options: [
            "Black and hard",
            "Waxy and white",
            "Reddening (blanching) of the skin, numbness, tingling",
            "Blistered and purple"
        ],
        answer: 2,
        explanation: "Early injury presents with redness (light skin) or blanching (dark skin) and numbness. The skin remains soft.",
        cite: "Page 1025"
    },
    {
        q: "When treating a patient with active Heat Stroke, you should stop cooling measures when:",
        options: [
            "The patient shivers",
            "The body temperature reaches 101.5°F (38.6°C)",
            "The patient asks you to stop",
            "You reach the hospital"
        ],
        answer: 0,
        explanation: "Shivering generates heat, which is counterproductive. If the patient shivers, slow the cooling. Aim to cool to ~102°F.",
        cite: "Page 1030"
    },
    {
        q: "What is the priority for a patient pulled from the water who is in cardiac arrest?",
        options: [
            "Perform the Heimlich maneuver to remove water",
            "Begin CPR immediately (Airway/Ventilation focus)",
            "Immobilize the spine first",
            "Dry them off completely"
        ],
        answer: 1,
        explanation: "Do NOT do Heimlich; it causes vomiting. Start CPR. In drowning, Airway and Breathing are critical (A-B-C is preferred over C-A-B).",
        cite: "Page 1033"
    }
];
