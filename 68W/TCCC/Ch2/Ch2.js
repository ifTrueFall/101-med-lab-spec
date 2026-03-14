const chapter2Questions = [
    {
        q: "What are the three distinct phases of Tactical Combat Casualty Care (TCCC)?",
        options: [
            "Search, Rescue, and Recovery",
            "Care Under Fire, Tactical Field Care, and Tactical Evacuation Care",
            "Initial Assessment, Treatment, and Documentation",
            "Point of Injury, MedEvac, and Hospital Care"
        ],
        answer: 1,
        explanation: "TCCC is divided into three phases based on the threat level: Care Under Fire (active threat), Tactical Field Care (threat suppressed), and TACEVAC (transport).",
        cite: "Page 13"
    },
    {
        q: "During the 'Care Under Fire' (CUF) phase, what is the single most important medical intervention?",
        options: [
            "Performing a needle chest decompression",
            "Establishing a patent airway",
            "Applying a limb tourniquet for life-threatening bleeding",
            "Starting an IV for fluid resuscitation"
        ],
        answer: 2,
        explanation: "In CUF, the only treatment that should be performed is the application of a tourniquet for massive limb hemorrhage, as the priority is suppression of enemy fire and moving the casualty to cover.",
        cite: "Page 14"
    },
    {
        q: "In which TCCC phase does the medic first perform the full 'MARCH' assessment?",
        options: [
            "Care Under Fire",
            "Tactical Field Care",
            "Tactical Evacuation Care",
            "Post-Deployment Review"
        ],
        answer: 1,
        explanation: "Tactical Field Care (TFC) occurs when the medic and casualty are no longer under effective enemy fire, allowing for a more thorough assessment using the MARCH algorithm.",
        cite: "Page 15"
    },
    {
        q: "What is the primary difference between a 'MEDEVAC' and a 'CASEVAC'?",
        options: [
            "MEDEVAC uses civilian vehicles, CASEVAC uses military vehicles",
            "MEDEVAC involves dedicated medical platforms with medical personnel; CASEVAC uses non-medical vehicles",
            "There is no difference; the terms are interchangeable",
            "CASEVAC is only for deceased personnel"
        ],
        answer: 1,
        explanation: "MEDEVAC uses standardized medical platforms (like HH-60 helicopters) with medical crews, while CASEVAC uses whatever vehicle is available (like a Humvee or Stryker).",
        cite: "Page 16"
    },
    {
        q: "Which injury is identified as the leading cause of preventable death on the battlefield?",
        options: [
            "Tension Pneumothorax",
            "Airway Obstruction",
            "Exsanguination (bleeding out) from extremity wounds",
            "Traumatic Brain Injury"
        ],
        answer: 2,
        explanation: "Massive hemorrhage from extremities is the #1 cause of preventable death, emphasizing why rapid tourniquet application is stressed in training.",
        cite: "Page 12"
    },
    {
        q: "What is the correct treatment for a casualty with a 'sucking chest wound' during the Tactical Field Care phase?",
        options: [
            "Leave the wound open to allow air to escape",
            "Apply a non-occlusive gauze dressing",
            "Apply an occlusive dressing (vented if possible) and monitor for tension pneumothorax",
            "Pack the wound with hemostatic gauze"
        ],
        answer: 2,
        explanation: "An occlusive dressing prevents air from entering the chest through the wound; a vented dressing is preferred to allow trapped air to escape.",
        cite: "Page 22"
    },
    {
        q: "If a tourniquet was applied during 'Care Under Fire,' when should it be reassessed?",
        options: [
            "Once the casualty reaches the hospital",
            "Immediately upon entering the Tactical Field Care phase",
            "Only if the casualty begins to complain of pain",
            "Tourniquets should never be reassessed in the field"
        ],
        answer: 1,
        explanation: "As soon as you enter TFC, you must check the tourniquet to ensure it is effective and decide if it can be replaced with a pressure dressing (tourniquet conversion).",
        cite: "Page 17"
    },
    {
        q: "Which of the following is the preferred method for opening the airway in a trauma casualty with a suspected neck injury?",
        options: [
            "Head-Tilt Chin-Lift",
            "Jaw-Thrust maneuver",
            "Blind Finger Sweep",
            "Forcing the mouth open with a tongue depressor"
        ],
        answer: 1,
        explanation: "The jaw-thrust maneuver is used to open the airway without moving the cervical spine in casualties where trauma is suspected.",
        cite: "Page 19"
    },
    {
        q: "What does the 'M' in the MARCH algorithm stand for?",
        options: [
            "Medical History",
            "Movement of Casualty",
            "Massive Hemorrhage",
            "Mental Status"
        ],
        answer: 2,
        explanation: "Massive Hemorrhage is addressed first because a casualty can bleed to death in as little as 2 to 3 minutes.",
        cite: "Page 18"
    },
    {
        q: "Tension Pneumothorax is addressed under which letter of the MARCH algorithm?",
        options: [
            "M",
            "A",
            "R",
            "C"
        ],
        answer: 2,
        explanation: "Respiration (R) focuses on the lungs and chest. Tension pneumothorax is a critical respiratory threat that requires immediate needle decompression.",
        cite: "Page 21"
    },
    {
        q: "Which of the following describes the 'Casualty Collection Point' (CCP)?",
        options: [
            "The hospital where casualties are sent",
            "A pre-designated location where casualties are moved for treatment and further evacuation",
            "The exact spot where the casualty was wounded",
            "The commander's vehicle"
        ],
        answer: 1,
        explanation: "The CCP is a tactical location where casualties are consolidated to simplify medical care and evacuation logistics.",
        cite: "Page 15"
    },
    {
        q: "During Tactical Evacuation Care, what is the primary focus of the medic?",
        options: [
            "Performing surgery",
            "Maintaining care provided in previous phases and monitoring for changes in condition",
            "Interrogating the casualty for intel",
            "Cleaning the medical equipment"
        ],
        answer: 1,
        explanation: "The evacuation phase focuses on sustaining life during transport and providing additional treatments that were too time-consuming during the field care phase.",
        cite: "Page 16"
    },
    {
        q: "What should a medic do if a tourniquet is ineffective and bleeding continues?",
        options: [
            "Remove the tourniquet and try again",
            "Apply a second tourniquet side-by-side (proximal) to the first",
            "Wait 5 minutes for the clotting to start",
            "Apply a pressure dressing over the tourniquet"
        ],
        answer: 1,
        explanation: "If one tourniquet fails to stop the bleeding, a second one should be applied directly above the first to increase the pressure on the artery.",
        cite: "Page 17"
    },
    {
        q: "The acronym 'TCCC' stands for:",
        options: [
            "Tactical Combat Care Coordination",
            "Tactical Combat Casualty Care",
            "Triage Combat Casualty Care",
            "Tactical Casualty Care Center"
        ],
        answer: 1,
        explanation: "TCCC is the standard of care for prehospital trauma in the tactical environment.",
        cite: "Page 12"
    },
    {
        q: "In the MARCH algorithm, 'Hypothermia' prevention is addressed because:",
        options: [
            "The medic wants to keep the patient comfortable",
            "Blood cannot clot effectively if the body temperature drops",
            "Cold weather is always present in combat",
            "It is required by Army regulations"
        ],
        answer: 1,
        explanation: "Hypothermia is part of the 'Lethal Triad' of trauma; if a patient's temperature drops, their ability to form clots decreases significantly, leading to more bleeding.",
        cite: "Page 28"
    },
    {
        q: "Which of the following is NOT a preventable cause of battlefield death?",
        options: [
            "Tension Pneumothorax",
            "Extremity Hemorrhage",
            "Immediate death from massive head trauma",
            "Airway Obstruction"
        ],
        answer: 2,
        explanation: "Severe brain injuries or massive trauma to the heart are often un-survivable, regardless of the medical care provided.",
        cite: "Page 12"
    },
    {
        q: "During the 'Care Under Fire' phase, the best medicine is often:",
        options: [
            "A tourniquet",
            "Fire Superiority",
            "Morphine",
            "An IV"
        ],
        answer: 1,
        explanation: "Suppressing the enemy's fire prevents more casualties and allows the medic to eventually provide care in a safer environment.",
        cite: "Page 14"
    },
    {
        q: "What is the recommended site for needle chest decompression in TCCC?",
        options: [
            "5th intercostal space in the anterior axillary line",
            "2nd intercostal space in the midclavicular line",
            "Both A and B are acceptable sites",
            "Directly into the center of the sternum"
        ],
        answer: 2,
        explanation: "Both the 2nd intercostal space (mid-clavicular) and the 5th intercostal space (anterior axillary) are approved sites for decompressing the chest.",
        cite: "Page 21"
    },
    {
        q: "When should you NOT use a Nasopharyngeal Airway (NPA)?",
        options: [
            "If the patient is unconscious",
            "If the patient has clear fluid (CSF) leaking from their nose or ears, suggesting a skull fracture",
            "If the patient has a gag reflex",
            "If the patient is snoring"
        ],
        answer: 1,
        explanation: "An NPA is contraindicated if there is evidence of a basilar skull fracture, as the tube could potentially enter the cranial cavity.",
        cite: "Page 19"
    },
    {
        q: "What information is vital to include when calling for a 9-Line MEDEVAC request?",
        options: [
            "The medic's name and rank",
            "Number of patients by precedence and special equipment required",
            "The patient's social security number",
            "The exact brand of tourniquet used"
        ],
        answer: 1,
        explanation: "Standardized 9-Line requests ensure the evacuation pilots know how many patients there are, how stable they are, and what gear (like a hoist) is needed.",
        cite: "Page 16"
    }
];
