const chapter5Questions = [
    {
        q: "What is the primary difference between treating casualties in a civilian environment versus a tactical one?",
        options: [
            "Civilian medics use better equipment",
            "Combat medics must assess the tactical situation before taking action",
            "Combat medics are not allowed to use tourniquets",
            "Civilian environments are always more dangerous"
        ],
        answer: 1,
        explanation: "In TCCC, the tactical situation dictates the timing and amount of care provided to avoid additional casualties and mission failure.",
        cite: "Page 70"
    },
    {
        q: "What are the three main objectives of TCCC?",
        options: [
            "Treat casualties, prevent infection, and record data",
            "Treat casualties, prevent additional casualties, and complete the mission",
            "Stabilize the patient, call for MEDEVAC, and notify next of kin",
            "Eliminate the enemy, recover gear, and treat wounds"
        ],
        answer: 1,
        explanation: "TCCC emphasizes that a medically correct intervention performed at the wrong time can lead to more casualties and mission failure.",
        cite: "Page 70"
    },
    {
        q: "During 'Care Under Fire' (CUF), what is the tactical priority?",
        options: [
            "Check for a radial pulse",
            "Establish an airway",
            "Take cover, return fire, and obtain fire superiority",
            "Start a primary assessment"
        ],
        answer: 2,
        explanation: "Fire superiority is the best medicine on the battlefield during the CUF phase to ensure the safety of the medic and the casualty.",
        cite: "Page 71"
    },
    {
        q: "What is the only medical priority in the CUF phase?",
        options: [
            "Needle chest decompression",
            "Control of life-threatening external extremity hemorrhage",
            "Managing an obstructed airway",
            "Performing a blood sweep"
        ],
        answer: 1,
        explanation: "If tactically safe, the only medical action taken during CUF is applying a tourniquet to stop catastrophic limb bleeding.",
        cite: "Page 71"
    },
    {
        q: "Where should a 'hasty' tourniquet be applied during the CUF phase?",
        options: [
            "Directly on the skin 2 inches above the wound",
            "Over the clothing, 'high and tight' on the injured limb",
            "Below the level of the knee or elbow",
            "Only on the groin or axilla"
        ],
        answer: 1,
        explanation: "A hasty tourniquet is applied over the uniform as proximal (high) as possible when the exact site of bleeding is not readily apparent in a high-threat environment.",
        cite: "Page 71"
    },
    {
        q: "What does the 'A' in the AVPU scale stand for when assessing a casualty's level of consciousness?",
        options: [
            "Airway",
            "Alert",
            "Action",
            "Abnormal"
        ],
        answer: 1,
        explanation: "AVPU stands for Alert, Verbal, Pain, and Unresponsive, used to quickly determine mental status during TFC.",
        cite: "Page 74"
    },
    {
        q: "In Tactical Field Care (TFC), a 'Blood Sweep' includes checking which specific areas?",
        options: [
            "Only the legs and arms",
            "The chest and abdomen only",
            "Neck, axillae, groin, pelvis, and extremities",
            "The head and scalp"
        ],
        answer: 2,
        explanation: "A blood sweep is a systematic check of junctional areas and limbs to find unrecognized life-threatening bleeding.",
        cite: "Page 75"
    },
    {
        q: "When managing the airway of an unconscious casualty without an obstruction, what is the first step?",
        options: [
            "Perform a surgical cricothyroidotomy",
            "Insert an oropharyngeal airway",
            "Place the casualty in the recovery position",
            "Immediately begin bag-valve-mask ventilations"
        ],
        answer: 2,
        explanation: "Placing an unconscious casualty in the recovery position helps prevent the tongue from obstructing the airway.",
        cite: "Page 75"
    },
    {
        q: "If a casualty has significant torso trauma and is in traumatic cardiac arrest, what must the medic do before discontinuing treatment?",
        options: [
            "Administer 2 liters of saline",
            "Decompress both sides of the chest",
            "Apply a junctional tourniquet",
            "Perform 30 minutes of CPR"
        ],
        answer: 1,
        explanation: "Bilateral needle decompression ensures that a treatable tension pneumothorax is not the cause of the arrest before care is terminated.",
        cite: "Page 75"
    },
    {
        q: "What is the preferred treatment for an open or sucking chest wound?",
        options: [
            "Gauze and tape",
            "Vented chest seal",
            "A hasty tourniquet",
            "Hemostatic gauze"
        ],
        answer: 1,
        explanation: "A vented chest seal allows air to escape the pleural space while preventing it from entering, reducing the risk of a tension pneumothorax.",
        cite: "Page 77"
    },
    {
        q: "When should you suspect a tension pneumothorax in a casualty with torso trauma?",
        options: [
            "If they have a minor headache",
            "If they exhibit progressive respiratory distress and oxygen saturation < 90%",
            "If their radial pulse is strong and steady",
            "If they are talking and joking"
        ],
        answer: 1,
        explanation: "Signs like severe respiratory distress, tachypnea, and low oxygen levels are critical indicators of a tension pneumothorax.",
        cite: "Page 77"
    },
    {
        q: "What is the standard needle gauge and length for chest decompression in TCCC?",
        options: [
            "18-gauge, 1.5-inch",
            "14-gauge or 10-gauge, 3.25-inch",
            "22-gauge, 1-inch",
            "14-gauge, 1.25-inch"
        ],
        answer: 1,
        explanation: "A 3.25-inch needle is required to ensure penetration through the chest wall into the pleural space in most casualties.",
        cite: "Page 78"
    },
    {
        q: "Which finding indicates that a casualty has a perfusing blood pressure and does not immediately require IV fluids?",
        options: [
            "Presence of a radial pulse",
            "Presence of a carotid pulse only",
            "Being able to blink",
            "Having warm hands"
        ],
        answer: 0,
        explanation: "A palpable radial pulse suggests a systolic blood pressure high enough to maintain perfusion, meaning resuscitation can be deferred.",
        cite: "Page 80"
    },
    {
        q: "What is the correct dose and administration for Tranexamic Acid (TXA)?",
        options: [
            "1 gram fast IV push",
            "2 grams slow IV or IO push over 1-2 minutes",
            "500 mg IM",
            "1 gram PO"
        ],
        answer: 1,
        explanation: "TXA should be given as 2 grams via slow IV/IO push as soon as possible, but no later than 3 hours after injury.",
        cite: "Page 81"
    },
    {
        q: "What is the resuscitation fluid of choice for casualties in hemorrhagic shock?",
        options: [
            "Normal Saline",
            "Lactated Ringers",
            "Cold stored low titer O whole blood",
            "HES (Hespan)"
        ],
        answer: 2,
        explanation: "Whole blood is the gold standard for resuscitation as it replaces exactly what the patient has lost (RBCs, plasma, and platelets).",
        cite: "Page 81"
    },
    {
        q: "At what core body temperature do clotting factors in a casualty's blood stop working?",
        options: [
            "98.6 degrees",
            "95 degrees",
            "93 degrees",
            "90 degrees"
        ],
        answer: 2,
        explanation: "Hypothermia severely impairs the body's ability to form clots, contributing to the 'lethal triad' of trauma.",
        cite: "Page 83"
    },
    {
        q: "Which medication in the Combat Wound Medication Pack (CWMP) is used for mild to moderate pain in a casualty who can still fight?",
        options: [
            "Ketamine",
            "Morphine",
            "Acetaminophen and Meloxicam",
            "Fentanyl"
        ],
        answer: 2,
        explanation: "Acetaminophen (Tylenol) and Meloxicam (Mobic) provide pain relief without affecting the casualty's level of consciousness or ability to remain engaged.",
        cite: "Page 84"
    },
    {
        q: "What is the recommended dose of Oral Transmucosal Fentanyl Citrate (OTFC) for moderate to severe pain in a casualty NOT in shock?",
        options: [
            "100 mcg",
            "400 mcg",
            "800 mcg",
            "1600 mcg"
        ],
        answer: 2,
        explanation: "800 mcg is the standard OTFC dose; it is 'taped' to the finger and placed between the cheek and gum.",
        cite: "Page 84"
    },
    {
        q: "Which antibiotic is given to casualties who are capable of swallowing oral medications?",
        options: [
            "Ertapenem",
            "Penicillin",
            "Moxifloxacin",
            "Ceftriaxone"
        ],
        answer: 2,
        explanation: "Moxifloxacin (400 mg) is the oral antibiotic provided in the pill pack for all open combat wounds.",
        cite: "Page 85"
    },
    {
        q: "Altered Mental Status (AMS) in a casualty without a head injury is most likely caused by:",
        options: [
            "Fear and anxiety",
            "Hypovolemia (shock) and/or hypoxia",
            "Lack of sleep",
            "Medication side effects"
        ],
        answer: 1,
        explanation: "If a casualty is confused but hasn't hit their head, the brain is likely not getting enough oxygen or blood due to shock or respiratory issues.",
        cite: "Page 85"
    }
];
