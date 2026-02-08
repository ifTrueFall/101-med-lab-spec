const ch40Questions = [
    {
        q: "What is the primary method used by the first-arriving unit to protect the work area at a highway incident?",
        options: [
            "Placing flares",
            "Instituting 'upstream blocking' with the apparatus",
            "Parking on the shoulder",
            "Using a police escort"
        ],
        answer: 1,
        explanation: "The first-arriving unit must institute blocking to protect the work area. Fire apparatus is preferred for this due to its size and weight.",
        cite: "Page 1215"
    },
    {
        q: "When positioning blocking apparatus, how many lanes of traffic should be blocked?",
        options: [
            "Only the lane of the crash",
            "One-and-a-half to two lanes",
            "All lanes in both directions",
            "The shoulder only"
        ],
        answer: 1,
        explanation: "Apparatus used to block should be positioned to create one-and-a-half to two lanes of blockage to create a safe work zone.",
        cite: "Page 1216"
    },
    {
        q: "Ideally, where should an ambulance be parked at a highway crash scene?",
        options: [
            "Upstream of the crash (before the scene)",
            "Next to the crash in the median",
            "Downstream from the crash in the 'safe zone'",
            "In the opposing lane of traffic"
        ],
        answer: 2,
        explanation: "Ambulances should be positioned downstream from the crash. This allows for safer patient loading and rapid departure.",
        cite: "Page 1216"
    },
    {
        q: "According to 2012 statistics on line-of-duty deaths (LODD) at highway incidents, which group suffered the highest number of fatalities?",
        options: [
            "EMS Personnel",
            "Firefighters",
            "Police Officers",
            "Tow Operators"
        ],
        answer: 2,
        explanation: "120 Police officers were killed, compared to 83 firefighters, 34 tow operators, and 21 EMS personnel.",
        cite: "Page 1216"
    },
    {
        q: "Federal law (23 CFR Part 634) mandates that all workers on public roadways wear:",
        options: [
            "A helmet",
            "A standard uniform",
            "High-visibility ANSI Class 2 safety vests",
            "Turnout gear"
        ],
        answer: 2,
        explanation: "Since 2009, federal mandate requires ANSI Class 2 safety vests for all responders working on federal-aid highways.",
        cite: "Page 1217"
    },
    {
        q: "During night operations, which lighting combination provides maximum visibility without blinding oncoming drivers?",
        options: [
            "Headlights ON, Red/Amber lights ON",
            "Red/Amber warning lights ON, Headlights OFF, Fog lights OFF",
            "All lights ON including strobes",
            "Four-way flashers only"
        ],
        answer: 1,
        explanation: "Headlights and fog lights can blind drivers. The best combo is Red/Amber warning lights ON, Headlights/Fog lights OFF, and Traffic directional boards operating.",
        cite: "Page 1218"
    },
    {
        q: "What is the first phase of the extrication/rescue process?",
        options: [
            "Sizing up the situation",
            "Preparing for rescue",
            "Recognizing hazards",
            "Stabilizing the vehicle"
        ],
        answer: 1,
        explanation: "There are 10 phases. The first is 'Preparing for rescue' (training, practice, and equipment).",
        cite: "Page 1219"
    },
    {
        q: "Any personnel working in the 'inner circle' (immediately around the vehicle) should wear:",
        options: [
            "Standard uniform",
            "Full protective turnout gear",
            "A safety vest only",
            "Latex gloves"
        ],
        answer: 1,
        explanation: "Personnel in the inner circle must wear full protective turnout gear to avoid injury from glass, metal, and fluids.",
        cite: "Page 1220"
    },
    {
        q: "Which type of blanket is recommended to protect a patient from broken glass and debris during extrication?",
        options: [
            "Paper blanket",
            "Aluminized rescue blanket",
            "Cotton sheet",
            "None, to avoid overheating"
        ],
        answer: 1,
        explanation: "An aluminized rescue blanket offers protection from flying particles. A paper blanket does not; it merely hides the view of the debris.",
        cite: "Page 1223"
    },
    {
        q: "When using flares for traffic control, you should:",
        options: [
            "Use them as traffic wands to direct cars",
            "Throw them out of the moving ambulance",
            "Position them every 10 feet to channel vehicles",
            "Hold them close to your body to block the wind"
        ],
        answer: 2,
        explanation: "Position flares every 10 feet. Never use a flare as a traffic wand because molten phosphorus can cause severe burns.",
        cite: "Page 1224"
    },
    {
        q: "The 'smoke' often seen after an airbag deployment is actually:",
        options: [
            "Smoke from a fire",
            "Cornstarch or talcum powder",
            "Toxic nerve gas",
            "Steam"
        ],
        answer: 1,
        explanation: "The cloud is dust from cornstarch or talcum used to lubricate the bag. It may contain sodium hydroxide which can irritate skin.",
        cite: "Page 1225"
    },
    {
        q: "If you see a 'loaded' energy-absorbing bumper on a crashed vehicle, you should:",
        options: [
            "Stand directly in front of it",
            "Hit it to release the energy",
            "Never stand in front of it; approach from an oblique angle",
            "Ignore it"
        ],
        answer: 2,
        explanation: "Compressed bumpers can release explosively. Never stand in front of them; always approach from the side/angle.",
        cite: "Page 1225"
    },
    {
        q: "What is 'Ground Gradient' in relation to electrical hazards?",
        options: [
            "The slope of the road",
            "Voltage diminishing with distance from the point of contact with the ground",
            "A type of transformer",
            "The grounding wire on a pole"
        ],
        answer: 1,
        explanation: "Voltage is highest at the contact point and diminishes outward. This gradient can cause current to flow up one leg and down the other if you walk.",
        cite: "Page 1226"
    },
    {
        q: "If you feel a tingling sensation in your legs near a downed wire, you should:",
        options: [
            "Run away",
            "Turn 180 degrees and shuffle away with feet together",
            "Drop and roll",
            "Stand on one foot"
        ],
        answer: 1,
        explanation: "Shuffling with feet together prevents your body from completing a circuit between two points of different voltage potential on the ground.",
        cite: "Page 1226"
    },
    {
        q: "For a fire in the engine compartment where the hood is fully open, you should stand:",
        options: [
            "In front of the bumper",
            "Close to an A-post (front roof pillar)",
            "Behind the vehicle",
            "Inside the vehicle"
        ],
        answer: 1,
        explanation: "Stand close to the A-post (with back to the wind) to protect yourself from flare-ups or exploding bumpers.",
        cite: "Page 1229"
    },
    {
        q: "Which fire extinguisher is recommended for a vehicle fire?",
        options: [
            "Water can",
            "15- or 20-pound Class A:B:C dry chemical",
            "CO2",
            "Halon"
        ],
        answer: 1,
        explanation: "A Class A:B:C dry chemical extinguisher is effective on upholstery, fuel, and electrical fires.",
        cite: "Page 1227"
    },
    {
        q: "How should the front wheels of blocking fire apparatus be positioned?",
        options: [
            "Straight ahead",
            "Rotated away from the incident",
            "Rotated toward the incident",
            "It does not matter"
        ],
        answer: 1,
        explanation: "Wheels should be rotated away from the incident so that if the apparatus is struck from behind, it rolls away from the rescuers/patients.",
        cite: "Page 1216"
    },
    {
        q: "To disable a vehicle's airbag system, you should:",
        options: [
            "Cut the yellow wires",
            "Disconnect the battery",
            "Turn off the ignition",
            "Splash water on the sensor"
        ],
        answer: 1,
        explanation: "Disconnecting the battery (negative cable first) is the primary method, though systems may hold a charge for several minutes.",
        cite: "Page 1225"
    },
    {
        q: "When treating a patient during extrication, your primary role inside the vehicle is to:",
        options: [
            "Help cut the metal",
            "Act as the patient's advocate and protector",
            " hold the flashlight",
            "Direct the rescue team"
        ],
        answer: 1,
        explanation: "The EMT monitors the patient's condition, provides care, and shields them from debris and noise.",
        cite: "Page 1223"
    },
    {
        q: "If you are the first unit on scene and must use your ambulance to block, you should:",
        options: [
            "Park downstream",
            "Park upstream to block traffic",
            "Park in the median",
            "Park on the opposite shoulder"
        ],
        answer: 1,
        explanation: "Ideally, fire trucks block. But if you are first, you must protect the scene by parking upstream until heavier units arrive.",
        cite: "Page 1215"
    }
];
