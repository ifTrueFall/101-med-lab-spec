const chapter1Questions = [
    {
        q: "What is the primary purpose of the Combat Medical Aid Bag (CMAB)?",
        options: [
            "To provide long-term patient recovery supplies",
            "To carry equipment for treating life-threatening injuries on the battlefield",
            "To act as a storage unit for personal electronics",
            "To replace a stationary medical facility in the field"
        ],
        answer: 1,
        explanation: "The CMAB is designed to allow a medic to provide immediate, life-saving interventions for casualties in a tactical environment.",
        cite: "Page 3"
    },
    {
        q: "Which item in the CMAB is primarily used for massive hemorrhage control of an extremity?",
        options: [
            "H-bandage",
            "Combat Application Tourniquet (CAT)",
            "Abdominal Dressing",
            "Kerlix Gauze"
        ],
        answer: 1,
        explanation: "The CAT is a specialized tourniquet carried in the CMAB specifically for rapid, one-handed application to control life-threatening limb bleeding.",
        cite: "Page 5"
    },
    {
        q: "When organizing a medical bag, where should the most critical life-saving items be placed?",
        options: [
            "In the deepest internal compartment for protection",
            "In outside pockets or easily accessible areas",
            "At the very bottom of the bag to distribute weight",
            "Attached to the shoulder straps with tape"
        ],
        answer: 1,
        explanation: "Time-critical items like tourniquets and pressure dressings should be in external pockets to minimize the time spent searching for gear during a crisis.",
        cite: "Page 4"
    },
    {
        q: "What is the function of 'QuikClot Combat Gauze' found in the aid bag?",
        options: [
            "To provide a sterile covering for minor burns",
            "To promote blood clotting in deep, non-extremity wounds",
            "To clean surgical instruments",
            "To act as a secondary splinting material"
        ],
        answer: 1,
        explanation: "Combat Gauze is impregnated with a hemostatic agent that helps accelerate the natural clotting process in areas where a tourniquet cannot be applied.",
        cite: "Page 6"
    },
    {
        q: "Which item is used to manage an open pneumothorax (sucking chest wound)?",
        options: [
            "Occlusive Chest Seal",
            "Nasopharyngeal Airway",
            "14-gauge Needle",
            "SAM Splint"
        ],
        answer: 0,
        explanation: "An occlusive chest seal creates an airtight barrier over a chest wound to prevent air from entering the pleural space.",
        cite: "Page 7"
    },
    {
        q: "What size needle is typically included in the CMAB for performing a needle chest decompression?",
        options: [
            "18-gauge, 1.5 inch",
            "14-gauge, 3.25 inch",
            "22-gauge, 1 inch",
            "10-gauge, 5 inch"
        ],
        answer: 1,
        explanation: "A 14-gauge, 3.25-inch needle is the standard size required to penetrate the chest wall of most casualties to reach the pleural space.",
        cite: "Page 7"
    },
    {
        q: "The Nasopharyngeal Airway (NPA) is primarily used for patients who:",
        options: [
            "Have a complete airway obstruction",
            "Are conscious or unconscious and require a basic airway adjunct",
            "Require long-term mechanical ventilation",
            "Have a suspected fractured jaw and cannot open their mouth"
        ],
        answer: 1,
        explanation: "An NPA is a soft tube inserted into the nasal passage to maintain a patent airway in casualties with a decreased level of consciousness.",
        cite: "Page 8"
    },
    {
        q: "Why is it important to carry a permanent marker (like a Sharpie) in a medical aid bag?",
        options: [
            "For drawing diagrams of the injury for the doctor",
            "To mark the time of tourniquet application on the patient's forehead",
            "To label the medic's personal gear",
            "To track the number of patients treated"
        ],
        answer: 1,
        explanation: "Documentation of the time a tourniquet was applied is critical for the next level of care to prevent limb loss or complications.",
        cite: "Page 5"
    },
    {
        q: "What is the purpose of the 'Emergency Trauma Dressing' (Israeli Bandage)?",
        options: [
            "To serve as a temporary sling",
            "To apply direct pressure to a wound while providing a sterile covering",
            "To wrap around a splinted fracture",
            "To clean a patient's skin before surgery"
        ],
        answer: 1,
        explanation: "These dressings are designed with a built-in pressure bar to exert constant force on a wound to control bleeding.",
        cite: "Page 5"
    },
    {
        q: "How often should a combat medic inventory and check their aid bag?",
        options: [
            "Only after a combat mission",
            "On a regular, scheduled basis and after every use",
            "Once a year during the unit inspection",
            "When the medic notices items are missing"
        ],
        answer: 1,
        explanation: "Regular inventory ensures that expired items are replaced and that the medic is fully prepared for any casualty situation.",
        cite: "Page 4"
    },
    {
        q: "Which item in the bag is used to prevent hypothermia in a trauma casualty?",
        options: [
            "Wool blanket",
            "Ready-Heat Blanket or Blizzard Blanket",
            "Standard Army poncho",
            "Extra set of dry clothes"
        ],
        answer: 1,
        explanation: "Trauma casualties lose the ability to regulate body temperature; specialized heat-reflective blankets are used to conserve body heat.",
        cite: "Page 10"
    },
    {
        q: "The 'Cric-Key' or 'Cric-Kit' is intended for:",
        options: [
            "Clearing a blocked nose",
            "Performing an emergency surgical airway (Cricothyroidotomy)",
            "Suctioning fluid from the mouth",
            "Removing a foreign object from the throat"
        ],
        answer: 1,
        explanation: "When basic airway maneuvers fail, the Cric-Kit provides the tools necessary to create a surgical opening in the neck to restore breathing.",
        cite: "Page 8"
    },
    {
        q: "What is a 'TCCC Card' (DA Form 7656) used for?",
        options: [
            "Tracking medical supply orders",
            "Documenting casualty care provided at the point of injury",
            "Reporting the medic's hours of duty",
            "A certificate of training for the 68W"
        ],
        answer: 1,
        explanation: "This card stays with the patient and provides the next echelon of care with vital information regarding injuries and treatments.",
        cite: "Page 11"
    },
    {
        q: "Which of the following is an example of 'Personal Protective Equipment' (PPE) found in the aid bag?",
        options: [
            "Stethoscope",
            "Nitrile Gloves",
            "Pulse Oximeter",
            "Flashlight"
        ],
        answer: 1,
        explanation: "Gloves protect the medic from bloodborne pathogens while providing care to casualties.",
        cite: "Page 3"
    },
    {
        q: "A SAM Splint is carried in the CMAB because it is:",
        options: [
            "Heavy and rigid for maximum support",
            "Lightweight, flexible, and can be molded to fit various limb injuries",
            "Disposable after one use",
            "Made of wood to prevent electrical shock"
        ],
        answer: 1,
        explanation: "The SAM splint's versatility makes it ideal for the field, as it can be molded to provide strength for stabilizing fractures.",
        cite: "Page 9"
    },
    {
        q: "What is the function of the 'Pulse Oximeter' in the medic's kit?",
        options: [
            "To measure blood pressure",
            "To measure the oxygen saturation of the blood and heart rate",
            "To detect internal bleeding",
            "To monitor the patient's temperature"
        ],
        answer: 1,
        explanation: "This device helps the medic assess the effectiveness of respiratory treatments and the patient's circulatory status.",
        cite: "Page 10"
    },
    {
        q: "Why are 'Trauma Shears' a critical tool in the CMAB?",
        options: [
            "To cut through medical tape only",
            "To quickly cut through a casualty's uniform to expose injuries",
            "To perform minor surgery",
            "To open boxes of medical supplies"
        ],
        answer: 1,
        explanation: "Removing clothing is the first step in the assessment process to ensure no hidden life-threatening injuries are missed.",
        cite: "Page 3"
    },
    {
        q: "The 'Pill Pack' (Combat Wound Medication Pack) contains:",
        options: [
            "Vitamins and supplements",
            "Antibiotics and pain medication for immediate oral use",
            "Saline and glucose tablets",
            "Sleeping aids and anti-anxiety meds"
        ],
        answer: 1,
        explanation: "Providing early antibiotics and pain relief in the field helps prevent infection and manages the patient's distress.",
        cite: "Page 10"
    },
    {
        q: "What is the significance of the color-coded compartments often used in modern aid bags?",
        options: [
            "To make the bag look more professional",
            "To help the medic quickly identify different types of supplies (e.g., red for hemorrhage)",
            "To designate which supplies belong to which squad",
            "To indicate the price of the items"
        ],
        answer: 1,
        explanation: "Color coding reduces cognitive load on the medic during high-stress situations, allowing for faster retrieval of supplies.",
        cite: "Page 4"
    },
    {
        q: "In TCCC, what does the acronym 'MARCH' guide the medic to do?",
        options: [
            "Plan the route for evacuation",
            "Prioritize the treatment of life-threatening injuries",
            "Inventory the medical bag after a mission",
            "Communicate with the commander"
        ],
        answer: 1,
        explanation: "MARCH (Massive Hemorrhage, Airway, Respiration, Circulation, Hypothermia/Head) is the sequence used to treat injuries in the order they kill.",
        cite: "Page 11"
    }
];
