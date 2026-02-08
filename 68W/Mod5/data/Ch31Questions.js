const ch31Questions = [
    {
        q: "What is 'Paradoxical Motion' in the context of chest trauma?",
        options: [
            "The chest moving inward during inhalation and outward during exhalation",
            "The chest moving faster on one side than the other",
            "A fast heart rate with a slow respiratory rate",
            "The inability to move the arms"
        ],
        answer: 0,
        explanation: "Paradoxical motion occurs in a Flail Chest where a detached segment of ribs moves in the opposite direction of the rest of the chest wall during breathing.",
        cite: "Page 872"
    },
    {
        q: "What is the immediate treatment for an open chest wound (sucking chest wound)?",
        options: [
            "Pack the wound with gauze",
            "Apply an occlusive dressing (airtight seal)",
            "Leave it open to the air",
            "Apply a tourniquet"
        ],
        answer: 1,
        explanation: "You must seal the wound with an occlusive dressing (like a gloved hand initially, then a commercial seal or plastic) to prevent air from being sucked into the chest cavity.",
        cite: "Page 879"
    },
    {
        q: "Which condition is characterized by air entering the chest cavity, accumulating under pressure, and pushing the heart/lungs to the opposite side?",
        options: [
            "Simple Pneumothorax",
            "Tension Pneumothorax",
            "Hemothorax",
            "Flail Chest"
        ],
        answer: 1,
        explanation: "Tension Pneumothorax is a life-threatening condition where air pressure collapses the lung and compresses the heart and great vessels, reducing cardiac output.",
        cite: "Page 873"
    },
    {
        q: "What is the correct treatment for an abdominal evisceration (organs protruding)?",
        options: [
            "Push the organs back inside",
            "Cover with a dry sterile dressing",
            "Cover with a sterile dressing moistened with sterile saline, then an occlusive dressing",
            "Pack the abdomen with ice"
        ],
        answer: 2,
        explanation: "Never push organs back in. Cover them with a moist, sterile dressing to prevent drying out, then an occlusive layer to retain heat and moisture.",
        cite: "Page 889"
    },
    {
        q: "Beck's Triad (indicative of Cardiac Tamponade) consists of which three signs?",
        options: [
            "Hypertension, Bradycardia, Irregular breathing",
            "Distended neck veins (JVD), Muffled heart sounds, Narrowing pulse pressure",
            "Hypotension, Tachycardia, Flat neck veins",
            "Cyanosis, Tracheal deviation, Absent breath sounds"
        ],
        answer: 1,
        explanation: "Cardiac Tamponade (blood filling the pericardial sac) compresses the heart, causing JVD, muffled sounds, and low BP with narrowing pulse pressure.",
        cite: "Page 874"
    },
    {
        q: "Commotio Cordis is defined as:",
        options: [
            "A penetrating wound to the heart",
            "Sudden cardiac arrest caused by a blunt impact to the chest at a precise moment in the cardiac cycle",
            "A tearing of the aorta",
            "A collapsed lung"
        ],
        answer: 1,
        explanation: "Commotio Cordis is a rare event where a blow to the chest (like a baseball) triggers Ventricular Fibrillation if it hits during the repolarization phase.",
        cite: "Page 875"
    },
    {
        q: "What is 'Traumatic Asphyxia'?",
        options: [
            "Choking on food",
            "Sudden compression of the chest forcing blood out of the right atrium and up into the jugular veins/face",
            "A blockage of the airway by blood",
            "Inhalation of toxic gas"
        ],
        answer: 1,
        explanation: "Traumatic Asphyxia presents with extensive bruising of the face and neck, bulging eyes, and JVD due to sudden crushing chest pressure.",
        cite: "Page 874"
    },
    {
        q: "When applying an occlusive dressing to an open chest wound, most modern protocols recommend:",
        options: [
            "Taping it on 3 sides only to create a flutter valve",
            "Taping it on all 4 sides immediately",
            "Using a porous gauze",
            "Using a commercial chest seal with a built-in one-way valve (if available)"
        ],
        answer: 3,
        explanation: "While the '3-sided tape' method is a classic field improvisation (flutter valve), commercial chest seals with valves are preferred. If using plastic, a flutter valve effect is the goal.",
        cite: "Page 880"
    },
    {
        q: "A patient with a chest injury is coughing up frothy red blood. This is a sign of:",
        options: [
            "Hemothorax or punctured lung",
            "Stomach ulcer",
            "Stroke",
            "Heart attack"
        ],
        answer: 0,
        explanation: "Hemoptysis (coughing up blood) in a trauma patient usually indicates the lung has been punctured or damaged.",
        cite: "Page 875"
    },
    {
        q: "The condition where blood accumulates in the chest cavity is called:",
        options: [
            "Pneumothorax",
            "Hemothorax",
            "Pyothorax",
            "Hydrothorax"
        ],
        answer: 1,
        explanation: "Hemo- means blood. Hemothorax is blood filling the pleural space, which can cause both lung collapse and shock from blood loss.",
        cite: "Page 874"
    },
    {
        q: "Which organ is most commonly injured in blunt trauma to the Right Upper Quadrant?",
        options: [
            "Spleen",
            "Liver",
            "Stomach",
            "Appendix"
        ],
        answer: 1,
        explanation: "The liver is a large, solid, vascular organ located primarily in the Right Upper Quadrant (RUQ).",
        cite: "Page 885"
    },
    {
        q: "Which organ is most commonly injured in blunt trauma to the Left Upper Quadrant?",
        options: [
            "Spleen",
            "Liver",
            "Gallbladder",
            "Appendix"
        ],
        answer: 0,
        explanation: "The spleen is located in the LUQ and is highly vascular. Injury can cause life-threatening internal bleeding.",
        cite: "Page 885"
    },
    {
        q: "If a patient has an impaled object in the chest, you should:",
        options: [
            "Remove it immediately to perform CPR",
            "Stabilize it with bulky dressings and leave it in place",
            "Cut it off flush with the skin",
            "Wiggle it to see how deep it is"
        ],
        answer: 1,
        explanation: "Do not remove impaled objects unless they interfere with CPR (in specific arrest scenarios) or airway. Stabilize in place to prevent further damage.",
        cite: "Page 881"
    },
    {
        q: "Tracheal deviation is a late sign of which life-threatening condition?",
        options: [
            "Simple Pneumothorax",
            "Tension Pneumothorax",
            "Flail Chest",
            "Rib Fracture"
        ],
        answer: 1,
        explanation: "As pressure builds in a Tension Pneumothorax, it pushes the mediastinum away, causing the trachea to shift. This is a very late and ominous sign.",
        cite: "Page 873"
    },
    {
        q: "What is the best position for a patient with an abdominal injury who is NOT in shock/spinal precautions?",
        options: [
            "Prone (face down)",
            "Supine with knees flexed (bent)",
            "Standing up",
            "Sitting fully upright"
        ],
        answer: 1,
        explanation: "Supine with knees flexed relaxes the abdominal muscles, reducing pain and pressure on the injury.",
        cite: "Page 888"
    },
    {
        q: "A Flail Chest occurs when:",
        options: [
            "One rib is broken in one place",
            "Two or more consecutive ribs are fractured in two or more places",
            "The sternum is fractured",
            "The lung collapses spontaneously"
        ],
        answer: 1,
        explanation: "Flail chest requires a 'free-floating' segment of ribs, created by breaks in at least two places on multiple adjacent ribs.",
        cite: "Page 872"
    },
    {
        q: "Subcutaneous Emphysema produces which sensation upon palpation?",
        options: [
            "Heat and throbbing",
            "A crackling or crunching sensation (like Rice Krispies) under the skin",
            "Rigidity and guarding",
            "Numbness"
        ],
        answer: 1,
        explanation: "Air escaping into the soft tissues causes a crackling sensation known as subcutaneous emphysema or crepitus.",
        cite: "Page 871"
    },
    {
        q: "The membrane lining the abdominal cavity is called the:",
        options: [
            "Pleura",
            "Peritoneum",
            "Pericardium",
            "Meninges"
        ],
        answer: 1,
        explanation: "The peritoneum lines the abdominal cavity. The pleura lines the chest.",
        cite: "Page 885"
    },
    {
        q: "Pulsus Paradoxus (a drop in blood pressure during inhalation) is a sign of:",
        options: [
            "Tension Pneumothorax or Cardiac Tamponade",
            "Flail Chest",
            "Rib Fracture",
            "Commotio Cordis"
        ],
        answer: 0,
        explanation: "Both Tension Pneumothorax and Cardiac Tamponade restrict the heart's ability to fill, which is exacerbated during inhalation.",
        cite: "Page 876"
    },
    {
        q: "For a patient with a Flail Chest and inadequate breathing, your priority is:",
        options: [
            "Taping the ribs",
            "Applying a sandbag",
            "Positive Pressure Ventilation (BVM)",
            "Transport only"
        ],
        answer: 2,
        explanation: "If breathing is inadequate, you must ventilate. Positive pressure ventilation also helps splint the flail segment internally.",
        cite: "Page 879"
    }
];
