const finalExamQuestions = [
    {
        q: "An 86-year-old female complains of pain in her sacral area. You observe a four-centimeter decubitus ulcer in the area. Her son tells you that she is bedridden and that he cares for her. Her bedding is wet and smells like urine. You should suspect:",
        options: [
            "Psychological abuse",
            "Physical neglect",
            "Psychological neglect",
            "Physical abuse"
        ],
        answer: 1,
        explanation: "The presence of decubitus ulcers (bedsores) and unchanged, soil bedding in a dependent elderly patient are classic signs of physical neglect (failure to provide necessary hygiene and care).",
        cite: "Chapter 37: Patients with Special Challenges"
    },
    {
        q: "Seizures due to complications of pregnancy generally occur during which of the following time periods?",
        options: [
            "In the first trimester",
            "In the second trimester",
            "Before the mother even knows she is pregnant",
            "Late in pregnancy"
        ],
        answer: 3,
        explanation: "Eclampsia (seizures resulting from severe preeclampsia) typically occurs late in pregnancy (third trimester) or shortly after delivery.",
        cite: "Chapter 36: Obstetric and Gynecologic Emergencies"
    },
    {
        q: "You are assisting the ventilation of a 57-year-old female who is in respiratory failure. Her initial vital signs were P 102, R 32, BP 142/84, and SpO2 was 88% on room air. After five minutes of assisted ventilation, her vital signs are P 96, R 18 (assisted), BP 108/80, and SpO2 is 95% on oxygen 15 L/minute by BVM. You should:",
        options: [
            "Increase the tidal volume of your ventilation",
            "Decrease the tidal volume of your ventilation",
            "Decrease your ventilation rate",
            "Maintain the current ventilation rate and volume"
        ],
        answer: 3,
        explanation: "The patient's condition has improved (SpO2 up to 95%, HR down to 96). The current strategy is working effectively. You should maintain the current rate and volume.",
        cite: "Chapter 10: Airway Management"
    },
    {
        q: "Which of the following allows EMTs to give certain medications or perform certain procedures without contacting a physician?",
        options: [
            "On-line medical direction",
            "Standing orders (Off-line medical direction)",
            "Direct medical orders",
            "Reciprocity"
        ],
        answer: 1,
        explanation: "Standing orders (or protocols) are a form of off-line medical direction that allow EMTs to perform specific acts (like giving Oxygen or Epi) without speaking to a doctor first.",
        cite: "Chapter 1: Introduction to EMS"
    },
    {
        q: "A 1-year-old male is irritable, and his skin is diaphoretic. His mother tells you that he has coarctation of his aorta. His lungs are clear to auscultation with good chest rise. His vital signs are P 138, R 28, BP 116/68, and SpO2 is 93% on room air. You should:",
        options: [
            "Administer aspirin",
            "Assist his ventilation",
            "Assist with the administration of his nitroglycerin",
            "Administer oxygen"
        ],
        answer: 3,
        explanation: "With an SpO2 of 93% and a known cardiac history, supplemental oxygen is the most appropriate initial intervention. Nitroglycerin and Aspirin are contraindicated for a 1-year-old.",
        cite: "Chapter 37: Patients with Special Challenges"
    },
    {
        q: "Janie is having difficulty breathing. Her current tidal volume is 350 mL, and she is breathing at 28 times per minute. What would be her minute volume?",
        options: [
            "12.5 mL",
            "9,800 mL",
            "342 mL",
            "378 mL"
        ],
        answer: 1,
        explanation: "Minute Volume = Tidal Volume × Respiratory Rate. 350 mL × 28 breaths/min = 9,800 mL (or 9.8 Liters).",
        cite: "Chapter 6: Anatomy and Physiology"
    },
    {
        q: "When using radio communications, you should:",
        options: [
            "Avoid codes",
            "Speak quickly to save time",
            "Press the talk button and begin speaking immediately",
            "Place the microphone less than one inch in front of your lips"
        ],
        answer: 0,
        explanation: "Modern EMS communication standards recommend using 'Plain English' and avoiding 10-codes to ensure clarity across different agencies (NIMS/ICS standard).",
        cite: "Chapter 17: Communication and Documentation"
    },
    {
        q: "An unresponsive 58-year-old female had a single seizure prior to your arrival. Bystanders tell you that she hasn't woken up since she stopped shaking. While you are performing your assessment, she has a brief tonic period followed by generalized clonic activity. You should next:",
        options: [
            "Assess her blood glucose level",
            "Restrain her extremities",
            "Check for a pulse",
            "Insert an OPA"
        ],
        answer: 0,
        explanation: "Hypoglycemia is a common and reversible cause of seizures. Checking blood glucose is a critical step in assessing any seizing or post-ictal patient.",
        cite: "Chapter 22: Diabetic Emergencies"
    },
    {
        q: "Which of the following can result in the occlusion of a coronary artery?",
        options: [
            "Reduced cardiac output",
            "Increased systemic vascular resistance",
            "Atherosclerosis of a coronary artery",
            "Pulmonary artery embolism"
        ],
        answer: 2,
        explanation: "Atherosclerosis is the buildup of plaque (fat/cholesterol) inside the arteries, which can eventually block (occlude) blood flow, causing an MI.",
        cite: "Chapter 20: Cardiac Emergencies"
    },
    {
        q: "During the assessment of a patient with a behavioral emergency, you should:",
        options: [
            "Stand directly in front of the patient",
            "Stay at least 3 feet from the patient until you determine they are not a threat",
            "Agree with the patient's hallucinations to keep them calm",
            "Spend as little time as possible on the scene"
        ],
        answer: 1,
        explanation: "Safety is the priority. Maintain a safe distance (often suggested as more than 3 feet or 'arm's length') until you are sure the patient is not violent.",
        cite: "Chapter 28: Psychiatric Emergencies"
    },
    {
        q: "A 70-year-old male complains of short of breath. He has ankle edema and JVD (Jugular Venous Distension). Which of the following is the most likely cause?",
        options: [
            "Left-sided heart failure",
            "Right-sided heart failure",
            "Pneumonia",
            "Pulmonary Embolism"
        ],
        answer: 1,
        explanation: "JVD and peripheral (ankle) edema are classic signs of Right-Sided Heart Failure (Cor Pulmonale), where blood backs up into the body.",
        cite: "Chapter 20: Cardiac Emergencies"
    },
    {
        q: "You are treating a patient with a possible stroke. He is conscious but unable to speak. He appears to understand your questions but cannot form words. This is called:",
        options: [
            "Receptive Aphasia",
            "Expressive Aphasia",
            "Dysarthria",
            "Hemiparesis"
        ],
        answer: 1,
        explanation: "Expressive Aphasia is the inability to produce speech (speak words) despite understanding language. Receptive aphasia is the inability to understand.",
        cite: "Chapter 22: Altered Mental Status (Stroke)"
    },
    {
        q: "Which of the following is a sign of adequate ventilation?",
        options: [
            "Respiratory rate of 8 breaths/min",
            "Chest rise and fall with each breath",
            "Paradoxical chest movement",
            "Use of accessory muscles"
        ],
        answer: 1,
        explanation: "Visible, equal chest rise and fall is the primary indicator that air is actually entering the lungs.",
        cite: "Chapter 10: Airway Management"
    },
    {
        q: "A 24-year-old female has been stabbed in the chest. You note a bubbling sound coming from the wound. You should:",
        options: [
            "Apply a dry sterile dressing",
            "Apply an occlusive dressing",
            "Apply direct pressure with a gloved hand only",
            "Leave the wound open"
        ],
        answer: 1,
        explanation: "Bubbling indicates a 'sucking chest wound' (open pneumothorax). An occlusive (airtight) dressing is required to prevent air from entering the chest cavity.",
        cite: "Chapter 31: Chest Trauma"
    },
    {
        q: "Which of the following would be the most significant mechanism of injury for a child?",
        options: [
            "A fall from 2 times the child's height",
            "A fall from a standing position",
            "A low-speed bicycle crash",
            "A fall from greater than 10 feet"
        ],
        answer: 3,
        explanation: "For pediatrics, a fall greater than 10 feet (or 2-3 times the patient's height) is considered a significant MOI requiring transport to a trauma center.",
        cite: "Chapter 34: Multisystem Trauma"
    }
];
