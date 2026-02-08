const ch39Questions = [
    {
        q: "What is the definition of a Hazardous Material?",
        options: [
            "Any material that smells bad",
            "Any substance or material in a form that poses an unreasonable risk to health, safety, and property when transported in commerce",
            "Any liquid that is flammable",
            "Nuclear waste only"
        ],
        answer: 1,
        explanation: "The Department of Transportation (DOT) defines hazardous materials as substances posing unreasonable risk to health, safety, and property.",
        cite: "Page 1180"
    },
    {
        q: "The primary responsibility of the EMT at a hazardous materials incident is:",
        options: [
            "To identify the material",
            "To rescue victims from the hot zone",
            "Personal safety (Self-preservation)",
            "To contain the spill"
        ],
        answer: 2,
        explanation: "Your primary responsibility is to keep yourself safe. You cannot help anyone if you become a victim.",
        cite: "Page 1181"
    },
    {
        q: "Which training level is required for those who are likely to witness or discover a hazardous substance release?",
        options: [
            "First Responder Awareness",
            "First Responder Operations",
            "Hazardous Materials Technician",
            "Hazardous Materials Specialist"
        ],
        answer: 0,
        explanation: "First Responder Awareness level is for those who witness/discover a release. They are trained to recognize the problem, call for help, and secure the scene.",
        cite: "Page 1181"
    },
    {
        q: "The 'Hot Zone' (Exclusion Zone) is defined as:",
        options: [
            "The area where decontamination takes place",
            "The area immediately surrounding a HazMat incident",
            "The area where the command post is located",
            "The area at the hospital receiving patients"
        ],
        answer: 1,
        explanation: "The Hot Zone is the contaminated area. It extends far enough to prevent primary contamination of people outside it.",
        cite: "Page 1184"
    },
    {
        q: "The 'Warm Zone' (Contamination Reduction Zone) is used for:",
        options: [
            "Initial assessment of the scene",
            "Decontamination of personnel and equipment",
            "Staging ambulances",
            "Command post operations"
        ],
        answer: 1,
        explanation: "The Warm Zone is where decontamination occurs. It acts as a buffer between the Hot (contaminated) and Cold (safe) zones.",
        cite: "Page 1184"
    },
    {
        q: "The 'Cold Zone' (Support Zone) is where:",
        options: [
            "The chemical spill is located",
            "Decontamination happens",
            "The Incident Command Post and other support functions are located",
            "Only HazMat technicians are allowed"
        ],
        answer: 2,
        explanation: "The Cold Zone is the safe area where the Command Post, EMS treatment area, and staging are located. No contaminated gear is allowed here.",
        cite: "Page 1185"
    },
    {
        q: "Which shipping paper is used on a roadway/truck shipment?",
        options: [
            "Bill of Lading (or Freight Bill)",
            "Waybill",
            "Manifest",
            "Air Bill"
        ],
        answer: 0,
        explanation: "Trucks carry a Bill of Lading in the cab within reach of the driver.",
        cite: "Page 1188"
    },
    {
        q: "The NFPA 704 System uses a diamond-shaped placard with four colors. What does the BLUE diamond represent?",
        options: [
            "Fire Hazard",
            "Reactivity Hazard",
            "Health Hazard",
            "Specific Hazard"
        ],
        answer: 2,
        explanation: "Blue = Health hazard. Red = Fire hazard. Yellow = Reactivity. White = Specific hazard (e.g., oxidizer, alkali).",
        cite: "Page 1187"
    },
    {
        q: "In the Incident Command System (ICS), what is 'Unity of Command'?",
        options: [
            "Everyone reports to the Safety Officer",
            "Each individual reports to only one supervisor",
            "All agencies work independently",
            "The Fire Chief is always in charge"
        ],
        answer: 1,
        explanation: "Unity of Command means every person has one specific supervisor to whom they report, preventing conflicting orders.",
        cite: "Page 1200"
    },
    {
        q: "The 'Span of Control' principle states that a single supervisor can effectively manage:",
        options: [
            "10-15 people",
            "1-2 people",
            "3-7 people",
            "20 people"
        ],
        answer: 2,
        explanation: "To be effective, one supervisor should manage between 3 and 7 subordinates (5 is optimal).",
        cite: "Page 1200"
    },
    {
        q: "What is a 'Unified Command'?",
        options: [
            "One person from one agency makes all decisions",
            "Managers from different jurisdictions (e.g., Police, Fire, EMS) coordinate their response from a single command post",
            "The military takes over control",
            "Command is transferred to the hospital"
        ],
        answer: 1,
        explanation: "Unified Command allows multiple agencies with jurisdiction to work together to set objectives and strategy without losing their authority.",
        cite: "Page 1198"
    },
    {
        q: "According to the START Triage system, a patient is tagged 'RED' (Immediate) if:",
        options: [
            "They are not breathing and do not start after opening the airway",
            "They are walking around",
            "They have a respiratory rate > 30, no radial pulse, or cannot follow simple commands",
            "They have a broken leg but are alert"
        ],
        answer: 2,
        explanation: "Red (Immediate) patients have life threats: RPM (Respirations > 30, Perfusion absent/cap refill > 2s, Mental Status altered).",
        cite: "Page 1205"
    },
    {
        q: "A patient who is not breathing, and does not start breathing after you open their airway, is tagged:",
        options: [
            "Red (Immediate)",
            "Yellow (Delayed)",
            "Green (Minor)",
            "Black (Deceased)"
        ],
        answer: 3,
        explanation: "In an MCI, if a patient remains apneic after a simple airway maneuver, they are tagged Black (Deceased/Expectant).",
        cite: "Page 1205"
    },
    {
        q: "Patients who are able to walk ('Walking Wounded') are immediately tagged:",
        options: [
            "Red",
            "Yellow",
            "Green",
            "Black"
        ],
        answer: 2,
        explanation: "All ambulatory patients are initially categorized as Green (Minor) and directed to a safe area.",
        cite: "Page 1205"
    },
    {
        q: "What is the role of the 'Safety Officer'?",
        options: [
            "To talk to the media",
            "To monitor the scene for hazards and unsafe conditions (has authority to stop operations)",
            "To track costs",
            "To coordinate supplies"
        ],
        answer: 1,
        explanation: "The Safety Officer's sole job is personnel safety. They have the authority to bypass the chain of command to stop unsafe acts.",
        cite: "Page 1199"
    },
    {
        q: "Which ICS Section is responsible for tactical operations (e.g., extrication, triage, treatment)?",
        options: [
            "Planning Section",
            "Logistics Section",
            "Operations Section",
            "Finance Section"
        ],
        answer: 2,
        explanation: "The Operations Section Chief carries out the tactical objectives (the 'doers'). Planning thinks, Logistics gets stuff, Finance pays.",
        cite: "Page 1199"
    },
    {
        q: "A Multiple-Casualty Incident (MCI) is defined as:",
        options: [
            "Any incident with more than 3 patients",
            "An incident that places excessive demands on personnel and equipment",
            "A bus crash",
            "A hazardous materials leak"
        ],
        answer: 1,
        explanation: "An MCI is any event that overwhelms the available resources of the responding system.",
        cite: "Page 1197"
    },
    {
        q: "In START Triage, what does the mnemonic 'RPM' stand for?",
        options: [
            "Respirations, Pulse, Motor",
            "Respirations, Perfusion, Mental Status",
            "Run, Panic, Move",
            "Rapid, Patient, Movement"
        ],
        answer: 1,
        explanation: "RPM checks: Respirations (rate), Perfusion (radial pulse/cap refill), and Mental Status (follow commands).",
        cite: "Page 1205"
    },
    {
        q: "Which zone is recommended for establishing the Medical/Treatment Area at a HazMat scene?",
        options: [
            "Hot Zone",
            "Warm Zone",
            "Cold Zone",
            "Rehab Zone"
        ],
        answer: 2,
        explanation: "Treatment should occur in the Cold Zone to prevent contaminating equipment and ambulances. Only life-saving airway/hemorrhage control happens in Warm.",
        cite: "Page 1185"
    },
    {
        q: "The 'Emergency Response Guidebook' (ERG) is primarily used to:",
        options: [
            "Diagnose patients",
            "Provide initial identification and isolation distances for hazardous materials",
            "Map the route to the hospital",
            "Contact the chemical manufacturer"
        ],
        answer: 1,
        explanation: "The ERG (yellow book) helps first responders identify chemicals via placard/UN number and determine safe standoff distances.",
        cite: "Page 1189"
    }
];
