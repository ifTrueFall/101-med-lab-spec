const ch39Questions = [
    {
        q: "What is the primary responsibility of the EMT at a Hazardous Materials (HazMat) incident?",
        options: [
            "Put on a suit and rescue patients",
            "Identify the material",
            "Personal and public safety (Scene Safety)",
            "Triage patients in the Hot Zone"
        ],
        answer: 2,
        explanation: "Your primary duty is to keep yourself and the public safe. You should not enter a HazMat zone unless trained and equipped. Stay upwind and uphill.",
        cite: "Standard HazMat Curriculum"
    },
    {
        q: "In the NIMS Incident Command System, who is the ONE person ultimately responsible for the entire operation?",
        options: [
            "Safety Officer",
            "Incident Commander (IC)",
            "Triage Officer",
            "Chief of Police"
        ],
        answer: 1,
        explanation: "The Incident Commander (IC) is the single person in charge of the entire scene, regardless of rank or agency.",
        cite: "NIMS / ICS Doctrine"
    },
    {
        q: "Which HazMat Control Zone is the area of contamination (where the spill is located) and requires the highest level of PPE?",
        options: [
            "Cold Zone",
            "Warm Zone",
            "Hot Zone",
            "Support Zone"
        ],
        answer: 2,
        explanation: "The Hot Zone (Exclusion Zone) is the area of actual contamination. Only fully protected HazMat technicians may enter.",
        cite: "Standard HazMat Curriculum"
    },
    {
        q: "In the START Triage system, a patient who is walking around ('Walking Wounded') is tagged as:",
        options: [
            "Red (Immediate)",
            "Yellow (Delayed)",
            "Green (Minor)",
            "Black (Deceased)"
        ],
        answer: 2,
        explanation: "Anyone who can walk is immediately categorized as Green (Minor) and directed to a collection point.",
        cite: "START Triage Protocols"
    },
    {
        q: "In START Triage, you encounter a patient who is NOT breathing. You open the airway, and they start breathing. How do you tag them?",
        options: [
            "Green",
            "Yellow",
            "Red",
            "Black"
        ],
        answer: 2,
        explanation: "If breathing returns after opening the airway, the patient is tagged RED (Immediate). If they still do not breathe, they are tagged Black.",
        cite: "START Triage Protocols"
    },
    {
        q: "In which Control Zone does life-saving emergency care and decontamination typically take place?",
        options: [
            "Hot Zone",
            "Warm Zone",
            "Cold Zone",
            "Danger Zone"
        ],
        answer: 1,
        explanation: "The Warm Zone (Contamination Reduction Zone) is where decontamination occurs. Life-saving care can happen here by protected personnel before moving to the Cold Zone.",
        cite: "Standard HazMat Curriculum"
    },
    {
        q: "What does the blue diamond on the NFPA 704 placard represent?",
        options: [
            "Fire Hazard",
            "Health Hazard",
            "Reactivity Hazard",
            "Special Hazard"
        ],
        answer: 1,
        explanation: "Blue = Health, Red = Fire, Yellow = Reactivity/Instability, White = Special info.",
        cite: "NFPA 704 Standards"
    },
    {
        q: "A Multiple-Casualty Incident (MCI) is defined as:",
        options: [
            "Any incident with more than 2 patients",
            "Any incident that overwhelms the available resources",
            "A bus crash",
            "An incident involving hazardous materials"
        ],
        answer: 1,
        explanation: "An MCI is any event where the needs of the patients exceed the immediate resources available.",
        cite: "Standard MCI Curriculum"
    },
    {
        q: "In START Triage, a patient has a respiratory rate of 34 breaths per minute. How do you tag them?",
        options: [
            "Green",
            "Yellow",
            "Red",
            "Black"
        ],
        answer: 2,
        explanation: "Respiratory rate > 30 is an automatic RED tag in the START algorithm.",
        cite: "START Triage Protocols"
    },
    {
        q: "What is the purpose of 'Staging' in an MCI?",
        options: [
            "To treat patients",
            "To keep ambulances and resources in one place until assigned",
            "To decontaminate patients",
            "To allow the media to film"
        ],
        answer: 1,
        explanation: "The Staging Area prevents congestion at the scene. Units wait there until the IC requests them.",
        cite: "NIMS / ICS Doctrine"
    },
    {
        q: "In START Triage, a patient has no radial pulse but has a carotid pulse. How do you tag them?",
        options: [
            "Green",
            "Yellow",
            "Red",
            "Black"
        ],
        answer: 2,
        explanation: "Absent radial pulse (or cap refill > 2 seconds) indicates shock/poor perfusion. This is a RED tag.",
        cite: "START Triage Protocols"
    },
    {
        q: "Where should the Ambulance/Treatment area be located at a HazMat scene?",
        options: [
            "In the Hot Zone",
            "In the Warm Zone",
            "In the Cold Zone",
            "Downwind of the incident"
        ],
        answer: 2,
        explanation: "All treatment and transport operations occur in the Cold Zone (Support Zone), which is free of contamination.",
        cite: "Standard HazMat Curriculum"
    },
    {
        q: "Which shipping paper is found in the cab of a truck?",
        options: [
            "Bill of Lading",
            "Waybill",
            "Manifest",
            "Air Bill"
        ],
        answer: 0,
        explanation: "Trucks carry a Bill of Lading in the cab. Trains have a Waybill/Consist. Ships have a Manifest. Planes have an Air Bill.",
        cite: "DOT HazMat Regulations"
    },
    {
        q: "In START Triage, a patient is breathing 20 times a minute, has a radial pulse, but cannot follow simple commands (unconscious or confused). How do you tag them?",
        options: [
            "Green",
            "Yellow",
            "Red",
            "Black"
        ],
        answer: 2,
        explanation: "Altered mental status (inability to follow commands) classifies the patient as RED (Immediate).",
        cite: "START Triage Protocols"
    },
    {
        q: "What is the role of the 'Safety Officer' in the Incident Command System?",
        options: [
            "To direct traffic",
            "To monitor the scene for hazards and stop unsafe acts (has authority to stop the entire operation)",
            "To count patients",
            "To talk to the media"
        ],
        answer: 1,
        explanation: "The Safety Officer ensures personnel safety and has the absolute authority to stop any unsafe activity immediately.",
        cite: "NIMS / ICS Doctrine"
    },
    {
        q: "Patients tagged 'Yellow' (Delayed) in START Triage typically have:",
        options: [
            "Minor injuries like scrapes",
            "Serious but non-life-threatening injuries (e.g., broken bone with good pulses, conscious)",
            "Shock and airway problems",
            "No pulse"
        ],
        answer: 1,
        explanation: "Yellow patients cannot walk (so not Green) but have stable ABCs (so not Red). They can wait a short time for transport.",
        cite: "START Triage Protocols"
    },
    {
        q: "The 'Emergency Response Guidebook' (ERG) is used to:",
        options: [
            "Treat patients with trauma",
            "Identify hazardous materials and determine initial isolation distances",
            "Fix the ambulance engine",
            "Map out the route to the hospital"
        ],
        answer: 1,
        explanation: "The ERG (yellow/orange book) is the primary reference for first responders to identify chemicals and set up safe perimeters.",
        cite: "DOT HazMat Regulations"
    },
    {
        q: "When approaching a potential HazMat scene, you should park:",
        options: [
            "Downhill and downwind",
            "Uphill and upwind",
            "Right next to the spill",
            "In the drainage ditch"
        ],
        answer: 1,
        explanation: "Always approach from Uphill and Upwind to avoid gases or liquids flowing toward you.",
        cite: "Standard HazMat Curriculum"
    },
    {
        q: "What is 'Span of Control' in ICS?",
        options: [
            "The distance a radio can transmit",
            "The number of subordinates one supervisor can effectively manage (optimally 3-7, ideal is 5)",
            "The length of the fire hose",
            "The time the incident lasts"
        ],
        answer: 1,
        explanation: "Span of Control dictates that one person should manage between 3 and 7 people (5 is ideal) to remain effective.",
        cite: "NIMS / ICS Doctrine"
    },
    {
        q: "In START Triage, a patient is not breathing. You open the airway, and they still do not breathe. You should:",
        options: [
            "Start CPR",
            "Tag them Red",
            "Tag them Black (Deceased)",
            "Give rescue breaths"
        ],
        answer: 2,
        explanation: "In an MCI, CPR is generally not performed. If the patient does not breathe after a simple airway maneuver, they are tagged Black.",
        cite: "START Triage Protocols"
    }
];
