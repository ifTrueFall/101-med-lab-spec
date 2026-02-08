const ch33Questions = [
    {
        q: "What is the 'Cushing Reflex' (Cushing's Triad) indicating rising intracranial pressure (ICP)?",
        options: [
            "Increased blood pressure and decreased heart rate",
            "Decreased blood pressure and increased heart rate",
            "Increased blood pressure and increased heart rate",
            "Decreased blood pressure and decreased heart rate"
        ],
        answer: 0,
        explanation: "As ICP rises, the body forces blood to the brain by raising BP. The heart rate slows in response to the high pressure (and vagus nerve compression).",
        cite: "Page 956"
    },
    {
        q: "Which type of hematoma is caused by arterial bleeding between the dura and the skull, typically resulting in rapid deterioration?",
        options: [
            "Subdural hematoma",
            "Epidural hematoma",
            "Intracerebral hematoma",
            "Subarachnoid hemorrhage"
        ],
        answer: 1,
        explanation: "Epidural hematomas involve arterial bleeding (usually middle meningeal artery), leading to rapid symptom onset.",
        cite: "Page 955"
    },
    {
        q: "A patient exhibits flexion of the arms and extension of the legs. This is known as:",
        options: [
            "Decerebrate posturing",
            "Decorticate posturing",
            "Fencing response",
            "Ataxic posturing"
        ],
        answer: 1,
        explanation: "Decorticate posturing (flexing toward the 'core') indicates severe brain injury but is slightly less ominous than decerebrate (extension) posturing.",
        cite: "Page 957"
    },
    {
        q: "What is the Glasgow Coma Scale (GCS) score for a patient who opens eyes to speech, is confused, and obeys commands?",
        options: [
            "13",
            "14",
            "12",
            "10"
        ],
        answer: 0,
        explanation: "Eye Opening to Speech (3) + Verbal Confused (4) + Motor Obeys Commands (6) = 13.",
        cite: "Page 962"
    },
    {
        q: "What is the primary risk associated with an open neck wound?",
        options: [
            "Spinal cord damage",
            "Air embolism (air bubble sucked into the vein)",
            "Infection",
            "Vomiting"
        ],
        answer: 1,
        explanation: "Large veins in the neck are under low pressure and can suck air in, causing a fatal pulmonary air embolism.",
        cite: "Page 965"
    },
    {
        q: "Battle's Sign (bruising behind the ear) and Raccoon Eyes are late signs of:",
        options: [
            "Mandible fracture",
            "Basilar skull fracture",
            "Concussion",
            "Subdural hematoma"
        ],
        answer: 1,
        explanation: "These signs indicate a fracture at the base of the skull. They often take hours to appear.",
        cite: "Page 958"
    },
    {
        q: "Neurogenic Shock is characterized by:",
        options: [
            "Pale, cool, clammy skin and tachycardia",
            "Warm, dry, flushed skin and a normal or slow heart rate",
            "Excessive sweating and hypertension",
            "Agitation and anxiety"
        ],
        answer: 1,
        explanation: "Loss of sympathetic tone causes blood vessels to dilate (warm skin) and prevents the heart from speeding up (normal/slow rate) despite low BP.",
        cite: "Page 974"
    },
    {
        q: "When should a helmet be removed from a trauma patient?",
        options: [
            "Always remove the helmet to inspect the head",
            "Never remove the helmet",
            "Only if it interferes with airway management or is loose/improperly fitted",
            "Only if the patient asks you to"
        ],
        answer: 2,
        explanation: "Leave the helmet on unless it blocks the airway, prevents breathing assessment, is loose, or interferes with immobilization.",
        cite: "Page 991"
    },
    {
        q: "What does the 'Cheyne-Stokes' breathing pattern look like?",
        options: [
            "Rapid, deep respirations (hyperventilation)",
            "Quickening and deepening respirations followed by a period of apnea",
            "Irregular, unpredictable breathing",
            "Slow, shallow breathing"
        ],
        answer: 1,
        explanation: "Cheyne-Stokes is a distinct pattern of waxing and waning breathing with apnea periods, caused by brainstem injury or compression.",
        cite: "Page 957"
    },
    {
        q: "A 'Coup' injury occurs:",
        options: [
            "On the side of the brain opposite the blow",
            "On the same side of the brain as the blow",
            "Only in open head injuries",
            "In the spinal cord"
        ],
        answer: 1,
        explanation: "Coup is the bruising directly under the impact. Contrecoup is the rebounding injury on the opposite side.",
        cite: "Page 955"
    },
    {
        q: "According to the NEXUS criteria, which of the following allows you to clear a C-spine (no immobilization)?",
        options: [
            "The patient has a distracting injury (e.g., broken leg)",
            "The patient is intoxicated",
            "The patient has no midline tenderness, no neurologic deficits, is alert, and has no distracting injuries",
            "The patient says 'I'm fine' despite a large head laceration"
        ],
        answer: 2,
        explanation: "Spinal motion restriction is not needed if the patient is reliable (sober/alert), has no distracting injuries, no neurologic deficits, and no midline spine pain/tenderness.",
        cite: "Page 975"
    },
    {
        q: "In the dermatome chart, the nipple level corresponds to which spinal nerve?",
        options: [
            "C4",
            "T4",
            "T10",
            "L1"
        ],
        answer: 1,
        explanation: "T4 is the landmark for the nipple line. T10 is the umbilicus (belly button).",
        cite: "Page 972"
    },
    {
        q: "What is the proper treatment for an object impaled in the cranium?",
        options: [
            "Remove it gently",
            "Stabilize it in place with bulky dressings",
            "Cut it off flush with the skull",
            "Wrap tape around the head"
        ],
        answer: 1,
        explanation: "Do not remove objects impaled in the skull. Stabilize them to prevent movement that could further damage brain tissue.",
        cite: "Page 963"
    },
    {
        q: "Priapism (persistent erection) is a sign of:",
        options: [
            "Head injury",
            "Spinal cord injury",
            "Internal bleeding",
            "Heat stroke"
        ],
        answer: 1,
        explanation: "Priapism is a sign of severe spinal cord injury affecting the nerves controlling the external genitalia.",
        cite: "Page 974"
    },
    {
        q: "What is 'Distraction' as a mechanism of spinal injury?",
        options: [
            "Compression of the spine (e.g., diving)",
            "Excessive twisting of the spine",
            "Excessive pulling or stretching of the spine (e.g., hanging)",
            "Lateral bending"
        ],
        answer: 2,
        explanation: "Distraction involves pulling the spine apart, commonly seen in hangings.",
        cite: "Page 969"
    },
    {
        q: "How should you manage an open neck wound to prevent air embolism?",
        options: [
            "Apply a tourniquet",
            "Apply a porous gauze dressing",
            "Apply an occlusive (airtight) dressing",
            "Pack the wound with hemostatic gauze"
        ],
        answer: 2,
        explanation: "An occlusive dressing seals the wound preventing air from being sucked into the venous system.",
        cite: "Page 965"
    },
    {
        q: "Which of the following is considered a 'Secondary Injury' to the brain?",
        options: [
            "The initial impact of the car crash",
            "The knife penetrating the skull",
            "Hypoxia and hypotension causing further damage after the event",
            "The laceration of the scalp"
        ],
        answer: 2,
        explanation: "Primary injury is the impact. Secondary injury is the damage caused afterwards by lack of oxygen (hypoxia) or blood flow (hypotension/shock).",
        cite: "Page 960"
    },
    {
        q: "If a patient has a subdural hematoma, symptoms may be:",
        options: [
            "Immediate and violent",
            "Delayed for hours or even days",
            "Non-existent",
            "Relieved by aspirin"
        ],
        answer: 1,
        explanation: "Subdural hematomas are venous bleeds (low pressure), so symptoms can develop slowly over hours or days.",
        cite: "Page 956"
    },
    {
        q: "When ventilating a patient with a brain injury, what rate should you maintain to avoid excessive vasoconstriction?",
        options: [
            "20-25 breaths/min",
            "6-8 breaths/min",
            "10-12 breaths/min",
            "As fast as possible"
        ],
        answer: 2,
        explanation: "Standard ventilation is 10-12 breaths/min. Excessive hyperventilation blows off too much CO2, constricting cerebral vessels and reducing brain perfusion.",
        cite: "Page 960"
    },
    {
        q: "Which vertebrae are most susceptible to injury because they are not supported by other bony structures?",
        options: [
            "Thoracic and Sacral",
            "Cervical and Lumbar",
            "Coccygeal",
            "All are equal"
        ],
        answer: 1,
        explanation: "The cervical (neck) and lumbar (lower back) spine are the most flexible and least supported, making them prone to injury.",
        cite: "Page 970"
    }
];
