const chapter2Questions = [
    {
        q: "What is the primary goal of medical documentation on the battlefield?",
        options: [
            "To assign blame for injuries sustained in combat.",
            "To provide a written record of assessment findings and treatments given.",
            "To track the location of all medical personnel at all times.",
            "To request immediate resupply of medical equipment."
        ],
        answer: 1,
        explanation: "The overall goal is to provide a written record of what was found and what was done, as the medic will likely not accompany the casualty through the entire evacuation system.",
        cite: "Page 20"
    },
    {
        q: "Which form is the standard for prehospital battlefield documentation of casualty care?",
        options: [
            "SF 600",
            "DA Form 4700",
            "DD Form 1380 (TCCC Card)",
            "DD Form 3019"
        ],
        answer: 2,
        explanation: "The DD Form 1380, Tactical Combat Casualty Care (TCCC) Card, is the standard form for documenting prehospital care at the point of injury.",
        cite: "Page 20"
    },
    {
        q: "How should a completed DD Form 1380 be kept with the casualty?",
        options: [
            "Placed inside the casualty's left cargo pocket.",
            "Stored inside the medic's aid bag for safekeeping.",
            "It must be visibly attached to the casualty.",
            "Handed directly to the pilot of the evacuation aircraft."
        ],
        answer: 2,
        explanation: "To ensure continuity of care, the completed TCCC card must be visibly attached to the casualty so subsequent providers can see it immediately.",
        cite: "Page 22"
    },
    {
        q: "What is the acronym for the system that provides operational virtual health to connect medics with expert clinicians in urgent situations?",
        options: [
            "GENESIS",
            "ADVISOR",
            "MHS",
            "TACEVAC"
        ],
        answer: 1,
        explanation: "ADVISOR (Advanced Virtual Support for Operational Forces) provides synchronized telemedicine to deliver expert advice to local caregivers when rapid evacuation is constrained.",
        cite: "Page 21"
    },
    {
        q: "According to the instructions for the DD Form 1380, how is a 'Battle Roster #' typically created?",
        options: [
            "Casualty's last name and last four of SSN.",
            "Casualty's rank and unit designation.",
            "First letter of first name, first letter of last name, and last four of SSN.",
            "The date of injury followed by the casualty's initials."
        ],
        answer: 2,
        explanation: "A Battle Roster # (e.g., 'JD1234' for John Doe) is used for tracking and consists of the first initials of the name and the last four of the Social Security Number.",
        cite: "Page 23"
    },
    {
        q: "Which of the following describes MEDEVAC?",
        options: [
            "The use of non-medical vehicles or aircraft of opportunity to transport casualties.",
            "The movement of casualties on vehicles with medical personnel and equipment dedicated to providing en route care.",
            "The process of clearing deceased personnel from the battlefield.",
            "The administrative movement of healthy soldiers to a medical facility."
        ],
        answer: 1,
        explanation: "MEDEVAC utilizes dedicated assets (ground or air ambulances) staffed with medical personnel to treat and stabilize patients during transport.",
        cite: "Page 25"
    },
    {
        q: "What is the definition of CASEVAC?",
        options: [
            "Evacuation performed by dedicated medical aircraft.",
            "Evacuation to a host nation facility only.",
            "The use of non-medical vehicles or aircraft of opportunity that do not have dedicated medical equipment or personnel.",
            "The movement of casualties between Role 2 and Role 3 facilities."
        ],
        answer: 2,
        explanation: "CASEVAC involves using available 'vehicles of opportunity' (like a Bradley or a cargo helicopter) that are not dedicated to medical missions and lack specific en route care capabilities.",
        cite: "Page 27"
    },
    {
        q: "Which evacuation precedence is assigned to casualties that require evacuation within a maximum of 1 hour to save life, limb, or eyesight?",
        options: [
            "Priority",
            "Routine",
            "Urgent",
            "Convenience"
        ],
        answer: 2,
        explanation: "URGENT is assigned to emergency cases that must be evacuated as soon as possible (within 1 hour) to save life, limb, or eyesight or prevent permanent disability.",
        cite: "Page 26"
    },
    {
        q: "A casualty categorized as 'PRIORITY' should be evacuated within what timeframe?",
        options: [
            "1 hour",
            "4 hours",
            "24 hours",
            "72 hours"
        ],
        answer: 1,
        explanation: "PRIORITY is assigned to sick and wounded personnel who require prompt medical care and should be evacuated within 4 hours.",
        cite: "Page 26"
    },
    {
        q: "What does the 'Routine' precedence indicate regarding the timeframe for evacuation?",
        options: [
            "Within 4 hours.",
            "Within 12 hours.",
            "Within 24 hours.",
            "As soon as an aircraft is empty."
        ],
        answer: 2,
        explanation: "ROUTINE is for personnel whose condition is not expected to deteriorate significantly; they should be evacuated within 24 hours.",
        cite: "Page 26"
    },
    {
        q: "In a 9-Line MEDEVAC Request, what information is provided in Line 1?",
        options: [
            "Radio frequency and call sign.",
            "Location of the pickup site (6-digit grid).",
            "Number of casualties by precedence.",
            "Method of marking the pickup site."
        ],
        answer: 1,
        explanation: "Line 1 provides the 6-digit military grid coordinates (including grid zone letters) so the evacuation crew knows where to go.",
        cite: "Page 28"
    },
    {
        q: "Whose radio frequency and call sign are provided in Line 2 of a 9-Line MEDEVAC Request?",
        options: [
            "The higher headquarters.",
            "The medical treatment facility (MTF).",
            "The person/unit at the pickup site.",
            "The air ambulance dispatch center."
        ],
        answer: 2,
        explanation: "Line 2 provides the frequency and call sign of the radio at the pickup site so the crew can contact the unit directly for updates while en route.",
        cite: "Page 28"
    },
    {
        q: "What is the maximum time allowed for transmitting the first five lines of a 9-Line MEDEVAC Request?",
        options: [
            "15 seconds",
            "25 seconds",
            "45 seconds",
            "60 seconds"
        ],
        answer: 1,
        explanation: "To ensure unit survivability and rapid response, transmission time for lines 1-5 must be kept to a maximum of 25 seconds.",
        cite: "Page 32"
    },
    {
        q: "Which lines of the 9-Line MEDEVAC Request are required to initiate the mission?",
        options: [
            "All 9 lines.",
            "Lines 1 through 3.",
            "Lines 1 through 5.",
            "Lines 1, 2, and 9."
        ],
        answer: 2,
        explanation: "Lines 1-5 provide enough essential information (location, frequency, precedence, special equipment, and patient type) for the evacuation unit to begin the mission without delay.",
        cite: "Page 33"
    },
    {
        q: "During wartime, what information is transmitted in Line 6 of the 9-Line Request?",
        options: [
            "Type of wound or injury.",
            "Security of the pickup site (enemy presence).",
            "Method of marking the site.",
            "CBRN contamination."
        ],
        answer: 1,
        explanation: "In wartime, Line 6 indicates the security of the pickup site using brevity codes (N, P, E, X) to inform the crew of potential enemy threats.",
        cite: "Page 30"
    },
    {
        q: "In peacetime, what information replaces 'Security of Pickup Site' in Line 6?",
        options: [
            "Terrain features.",
            "Number and type of wound, injury, or illness.",
            "Casualty nationality.",
            "Name of the senior medic."
        ],
        answer: 1,
        explanation: "In peacetime, Line 6 is used to describe the nature of the injuries (e.g., 'two gunshot wounds') to help the medical crew prepare.",
        cite: "Page 30"
    },
    {
        q: "In a M.I.S.T. Report, what does the 'S' stand for?",
        options: [
            "Severity of injury.",
            "Special equipment needed.",
            "Signs (vital signs like BP and pulse).",
            "Surgical intervention required."
        ],
        answer: 2,
        explanation: "M.I.S.T. stands for Mechanism of injury, Injury type, Signs (vital signs), and Treatment rendered.",
        cite: "Page 32"
    },
    {
        q: "When using Line 7 to describe the method of marking the pickup site, what must you NOT transmit until the aircraft makes contact?",
        options: [
            "The brevity code (A, B, or C).",
            "The specific color of the smoke or panels.",
            "The number of markers being used.",
            "The name of the marker operator."
        ],
        answer: 1,
        explanation: "For security reasons, the specific color of smoke or panels should not be transmitted until the aircraft is in direct contact just prior to arrival.",
        cite: "Page 30"
    },
    {
        q: "Line 9 of the 9-Line MEDEVAC Request is only included during wartime if what condition exists?",
        options: [
            "There are more than 5 casualties.",
            "A hoist is required.",
            "CBRN contamination is present.",
            "An armed escort is required."
        ],
        answer: 2,
        explanation: "In wartime, Line 9 is used to indicate Chemical, Biological, Radiological, or Nuclear contamination. If not applicable, the line is omitted.",
        cite: "Page 31"
    },
    {
        q: "What is the correct opening statement for requesting a MEDEVAC over the radio?",
        options: [
            "I need a MEDEVAC immediately.",
            "Requesting medical bird at this grid.",
            "I have a MEDEVAC request.",
            "9-Line, 9-Line, 9-Line."
        ],
        answer: 2,
        explanation: "The standard opening statement to alert the receiver is, 'I have a MEDEVAC request'.",
        cite: "Page 32"
    }
];
