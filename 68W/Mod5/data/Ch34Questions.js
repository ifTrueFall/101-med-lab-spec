 const ch34Questions = [
    {
        q: "What is 'Multisystem Trauma'?",
        options: [
            "A single injury that affects multiple family members",
            "One or more injuries that affect more than one body system",
            "Any injury that requires surgery",
            "An injury caused by a motor vehicle"
        ],
        answer: 1,
        explanation: "Multisystem trauma involves injuries to more than one body system (e.g., a head injury plus a femur fracture), carrying a higher risk of morbidity and mortality.",
        cite: "Page 1000"
    },
    {
        q: "What is the 'Platinum 10 Minutes'?",
        options: [
            "The time it takes to drive to the hospital",
            "The goal for on-scene time for a critical trauma patient (limit to 10 minutes)",
            "The time you have to splint all fractures",
            "The time allowed for paperwork"
        ],
        answer: 1,
        explanation: "For critical trauma patients, the goal is to limit scene time to 10 minutes or less to maximize the chance of survival within the 'Golden Hour'.",
        cite: "Page 1004"
    },
    {
        q: "According to the CDC Trauma Triage Guidelines, which physiologic criteria requires transport to a Trauma Center?",
        options: [
            "Systolic BP < 90 mmHg or GCS < 14",
            "Heart rate > 100",
            "Respiratory rate < 20",
            "Pain score > 5"
        ],
        answer: 0,
        explanation: "Physiologic criteria include GCS ≤ 13 (or < 14 depending on chart), Systolic BP < 90, or Respiratory Rate < 10 or > 29.",
        cite: "Page 1006"
    },
    {
        q: "Which of the following is an 'Anatomic' criterion for transport to a Trauma Center?",
        options: [
            "Two or more proximal long-bone fractures",
            "A simple wrist fracture",
            "A sprained ankle",
            "Laceration requiring sutures"
        ],
        answer: 0,
        explanation: "Anatomic criteria include 2+ proximal long-bone fractures, pelvic fractures, flail chest, amputation proximal to wrist/ankle, and paralysis.",
        cite: "Page 1006"
    },
    {
        q: "When treating a pregnant trauma patient in her third trimester, how should she be transported?",
        options: [
            "Supine on a backboard",
            "Tilted to the left (left lateral recumbent)",
            "Sitting up (Fowler's)",
            "Prone"
        ],
        answer: 1,
        explanation: "To prevent Supine Hypotensive Syndrome (uterus compressing the vena cava), tilt the backboard 15-30 degrees to the left.",
        cite: "Page 1008"
    },
    {
        q: "What is the primary treatment goal for a patient with multisystem trauma?",
        options: [
            "Splinting every individual fracture perfectly",
            "Diagnosing the exact cause of injury",
            "Identifying and treating immediate life threats (ABCs) and rapid transport",
            "Getting a complete medical history"
        ],
        answer: 2,
        explanation: "Do not waste scene time on secondary injuries. Fix the Airway, Breathing, and Circulation issues and transport immediately.",
        cite: "Page 1002"
    },
    {
        q: "For a geriatric trauma patient, what factor significantly increases the risk of intracranial bleeding?",
        options: [
            "Use of anticoagulant medications (blood thinners)",
            "High blood pressure",
            "Arthritis",
            "Poor hearing"
        ],
        answer: 0,
        explanation: "Many elderly patients take blood thinners (e.g., Warfarin/Coumadin), which makes even minor head bumps potentially fatal due to brain bleeds.",
        cite: "Page 1009"
    },
    {
        q: "Which MOI (Mechanism of Injury) finding warrants transport to a Trauma Center for an adult?",
        options: [
            "Fall > 20 feet (approx. 6 meters)",
            "Fall > 10 feet",
            "Rear-end collision at 10 mph",
            "Getting struck by a tennis ball"
        ],
        answer: 0,
        explanation: "Falls greater than 20 feet for an adult (or > 10 feet for a child) constitute a significant mechanism requiring trauma center evaluation.",
        cite: "Page 1006"
    },
    {
        q: "What is the Revised Trauma Score (RTS) based on?",
        options: [
            "Age, Weight, and Height",
            "Glasgow Coma Scale (GCS), Systolic Blood Pressure, and Respiratory Rate",
            "Heart rate, Skin color, and Pupil reaction",
            "Mechanism of injury only"
        ],
        answer: 1,
        explanation: "The RTS is a prognostic tool calculated using the GCS, Systolic BP, and Respiratory Rate to predict survival likelihood.",
        cite: "Page 1009"
    },
    {
        q: "In a stable patient with multisystem trauma, which assessment is performed en route to the hospital?",
        options: [
            "Primary Assessment",
            "Rapid Trauma Assessment",
            "Detailed Physical Exam",
            "Scene Size-up"
        ],
        answer: 2,
        explanation: "The Detailed Physical Exam is generally performed en route, time permitting, after life threats have been managed.",
        cite: "Page 1004"
    },
    {
        q: "Which intrusion depth into the passenger compartment of a vehicle suggests a high-priority transport?",
        options: [
            "> 6 inches",
            "> 12 inches (occupant site) or > 18 inches (any site)",
            "> 2 inches",
            "Any dent"
        ],
        answer: 1,
        explanation: "CDC guidelines state that intrusion > 12 inches at the occupant site or > 18 inches anywhere in the compartment indicates significant force.",
        cite: "Page 1007"
    },
    {
        q: "What characterizes a Level I Trauma Center?",
        options: [
            "It is a small community clinic",
            "It can stabilize patients but must transfer them for surgery",
            "It provides total care for every aspect of injury, 24/7, with specialists and research programs",
            "It only treats minor injuries"
        ],
        answer: 2,
        explanation: "Level I centers have 24-hour in-house surgeons, specialists (neuro, ortho, etc.), and usually a university/teaching affiliation.",
        cite: "Page 1009"
    },
    {
        q: "Why do pediatric patients often require transport to a Trauma Center for falls shorter than 20 feet?",
        options: [
            "They cry louder",
            "The threshold is lower: Falls > 10 feet or 2-3 times the child's height are significant",
            "They have harder bones",
            "They cannot speak"
        ],
        answer: 1,
        explanation: "Children have different anatomical vulnerabilities. A fall > 10 feet (or 2-3x their height) is considered a high-energy event.",
        cite: "Page 1007"
    },
    {
        q: "When prioritizing care for a multisystem trauma patient, what comes first?",
        options: [
            "Splinting a broken leg",
            "Managing a partially occluded airway",
            "Bandaging a minor laceration",
            "Taking a blood pressure"
        ],
        answer: 1,
        explanation: "Airway always comes first (A-B-C). You cannot treat other injuries effectively if the patient cannot breathe.",
        cite: "Page 1002"
    },
    {
        q: "If a trauma patient has a GCS of 10, a Respiratory Rate of 8, and a Systolic BP of 80, they are in:",
        options: [
            "Stable condition",
            "Decompensated Shock / Critical condition",
            "Compensated Shock",
            "Respiratory Arrest"
        ],
        answer: 1,
        explanation: "Low GCS, slow respirations, and hypotension (decompensated shock) clearly indicate a critical, life-threatening status.",
        cite: "Page 1006"
    },
    {
        q: "Which vital sign change is a late sign of shock in pediatric patients?",
        options: [
            "Tachycardia",
            "Hypotension (Low BP)",
            "Delayed capillary refill",
            "Cool skin"
        ],
        answer: 1,
        explanation: "Children compensate very well for a long time. When their BP finally drops (hypotension), they are near death.",
        cite: "Page 1008"
    },
    {
        q: "What is the most appropriate action for a patient with an impaled object in the cheek that is obstructing the airway?",
        options: [
            "Stabilize it in place",
            "Remove it",
            "Push it further in",
            "Wait for a surgeon"
        ],
        answer: 1,
        explanation: "This is one of the few exceptions to the 'do not remove' rule. If it blocks the airway, you must remove it to save the life.",
        cite: "Page 1003 (Review)"
    },
    {
        q: "Your patient has open fractures to both femurs and is unresponsive. You should:",
        options: [
            "Take time to traction splint both legs on scene",
            "Secure the legs to a backboard (rapid splinting) and transport immediately",
            "Wait for a helicopter",
            "Focus only on the legs"
        ],
        answer: 1,
        explanation: "For critical multisystem trauma, do not delay for time-consuming splints. Securing to the backboard provides gross stability for transport.",
        cite: "Page 1004"
    },
    {
        q: "What is the 'Golden Hour'?",
        options: [
            "The time when the sun sets",
            "The time from injury to definitive surgical care (optimal survival window)",
            "The time you have to write your report",
            "The time allowed for scene cleanup"
        ],
        answer: 1,
        explanation: "Survival rates drop significantly if the patient does not receive definitive care (surgery) within 1 hour of the injury.",
        cite: "Page 1004"
    },
    {
        q: "A 30-year-old male was ejected from a vehicle. He is conscious but confused. This mechanism is:",
        options: [
            "Low risk",
            "Moderate risk",
            "High risk / Significant",
            "No risk"
        ],
        answer: 2,
        explanation: "Ejection from a vehicle is a specific MOI criteria for transport to a Trauma Center due to the high likelihood of severe injury.",
        cite: "Page 1007"
    }
];
