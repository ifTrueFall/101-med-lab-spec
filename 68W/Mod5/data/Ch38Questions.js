const ch38Questions = [
    {
        q: "What is the legal concept of 'Due Regard' when operating an emergency vehicle?",
        options: [
            "The ambulance always has the right of way",
            "You are exempt from all traffic laws regardless of safety",
            "You may disobey traffic laws only if you do not endanger the life or property of others",
            "You must drive 10 mph below the speed limit at all times"
        ],
        answer: 2,
        explanation: "Due Regard means you are responsible for the safety of others. If you crash while running a red light, even with sirens on, you can be held liable if you didn't ensure the intersection was clear.",
        cite: "Page 1153"
    },
    {
        q: "Where do the majority of ambulance collisions occur?",
        options: [
            "On the highway",
            "In parking lots",
            "At intersections",
            "In driveways"
        ],
        answer: 2,
        explanation: "Intersections present the greatest risk. Drivers may not hear the siren or may react unpredictably. Always come to a complete stop before proceeding through a red light.",
        cite: "Page 1156"
    },
    {
        q: "What is the recommended size for a helicopter landing zone (LZ)?",
        options: [
            "50 by 50 feet",
            "100 by 100 feet",
            "200 by 200 feet",
            "Any flat road"
        ],
        answer: 1,
        explanation: "A standard LZ should be 100 feet by 100 feet, on flat ground, and clear of debris and overhead wires.",
        cite: "Page 1172"
    },
    {
        q: "When approaching a helicopter, you should:",
        options: [
            "Approach from the rear to avoid the pilot's view",
            "Approach from the front or side, in a crouch, only after the pilot/crew signals you",
            "Run quickly to minimize exposure",
            "Stand upright to be seen"
        ],
        answer: 1,
        explanation: "Never approach from the rear (tail rotor danger). Wait for the signal, and stay low (crouched) to avoid the main rotor, which can dip low.",
        cite: "Page 1173"
    },
    {
        q: "Which of the following is true regarding the use of police escorts for ambulances?",
        options: [
            "They are highly recommended for all calls",
            "They significantly reduce the risk of collision",
            "They are dangerous and should be avoided unless absolutely necessary",
            "They allow you to drive faster"
        ],
        answer: 2,
        explanation: "Escorts are dangerous. Motorists often yield for the police car and then pull back out, not seeing the ambulance following behind.",
        cite: "Page 1156"
    },
    {
        q: "The process of killing ALL microorganisms, including spores, is called:",
        options: [
            "Cleaning",
            "Disinfection",
            "Sterilization",
            "Sanitizing"
        ],
        answer: 2,
        explanation: "Sterilization (usually via steam/autoclave) kills everything. Disinfection (what you do to the ambulance) kills most pathogens but not all spores.",
        cite: "Page 1167"
    },
    {
        q: "When driving with lights and sirens, most motorists:",
        options: [
            "Will immediately pull to the right",
            "May panic, stop abruptly, or swerve",
            "Will speed up to get out of your way",
            "Can hear you from 500 feet away"
        ],
        answer: 1,
        explanation: "Never assume people hear you. Modern cars are soundproof. When they do notice you, they often panic and act unpredictably.",
        cite: "Page 1155"
    },
    {
        q: "What is the 'Cushion of Safety' regarding following distance?",
        options: [
            "Staying 1 second behind the vehicle in front",
            "Staying 2 seconds behind",
            "Staying 4-5 seconds behind the vehicle in front",
            "Staying close enough to be seen in the mirror"
        ],
        answer: 2,
        explanation: "Ambulances are heavy and take longer to stop. Maintain a 4-5 second following distance.",
        cite: "Page 1156"
    },
    {
        q: "Which cleaning solution is recommended for cleaning blood off ambulance surfaces?",
        options: [
            "Soap and water only",
            "A 1:100 bleach-to-water dilution",
            "Alcohol",
            "Ammonia"
        ],
        answer: 1,
        explanation: "A 1:100 bleach solution (or an EPA-approved germicide) is the standard for disinfecting surfaces contaminated with blood.",
        cite: "Page 1167"
    },
    {
        q: "When is it appropriate to use a helicopter (Air Medical) transport?",
        options: [
            "For every cardiac arrest",
            "When the patient has a minor fracture",
            "When transport time by ground is prolonged or the patient requires critical care unavailable by ground",
            "When the family requests it"
        ],
        answer: 2,
        explanation: "Air transport is high-risk and expensive. It is reserved for time-critical patients (trauma, stroke, STEMI) or remote access issues.",
        cite: "Page 1171"
    },
    {
        q: "What is the first phase of an ambulance call?",
        options: [
            "Dispatch",
            "Preparation for the call",
            "En route to the scene",
            "Arrival at scene"
        ],
        answer: 1,
        explanation: "The call begins with Preparation (checking the truck, fuel, and equipment) at the start of the shift.",
        cite: "Page 1144"
    },
    {
        q: "According to federal regulations, all personnel working on a highway incident must wear:",
        options: [
            "A uniform shirt",
            "Turnout gear",
            "High-visibility ANSI safety vests",
            "Hazmat suits"
        ],
        answer: 2,
        explanation: "Federal law mandates high-visibility ANSI vests for all responders working near moving traffic.",
        cite: "Page 1158"
    },
    {
        q: "When parking at the scene of a crash where no fire or chemical hazards are present, you should park:",
        options: [
            "100 feet past the wreckage (downstream)",
            "50 feet before the wreckage",
            "Next to the wreckage",
            "On the opposite side of the road"
        ],
        answer: 0,
        explanation: "Park 100 feet past (downstream) the crash. This puts the ambulance in the 'safe zone' protected by the police/fire vehicles blocking traffic behind you.",
        cite: "Page 1159"
    },
    {
        q: "If you arrive at a scene with downed power lines, you should:",
        options: [
            "Drive under them quickly",
            "Park at least one full span of wires away and stay in the vehicle",
            "Move the wires with a wooden stick",
            "Exit and assess the patient immediately"
        ],
        answer: 1,
        explanation: "Stay away. Park beyond the reach of the wires (one span) and wait for the power company to de-energize them.",
        cite: "Page 1159"
    },
    {
        q: "The use of lights and sirens (running 'Hot') typically saves how much time?",
        options: [
            "10-15 minutes",
            "Only a few seconds to a few minutes",
            "Half the travel time",
            "It makes no difference"
        ],
        answer: 1,
        explanation: "Studies show lights and sirens save very little time (often < 2 minutes) but vastly increase the risk of a crash. Use them sparingly.",
        cite: "Page 1163"
    },
    {
        q: "What information should you provide to the helicopter pilot when setting up an LZ?",
        options: [
            "Patient's insurance info",
            "Terrain, major landmarks, and hazards (wires/towers)",
            "Your driving history",
            "The hospital destination"
        ],
        answer: 1,
        explanation: "The pilot needs to know about ground hazards: wires, poles, slope of the ground, and wind direction.",
        cite: "Page 1172"
    },
    {
        q: "Hydroplaning (tires lifting off the road on water) can occur at speeds as low as:",
        options: [
            "30 mph",
            "50 mph",
            "70 mph",
            "10 mph"
        ],
        answer: 0,
        explanation: "Hydroplaning can begin at speeds as low as 30 mph on wet roads. Slow down significantly in rain.",
        cite: "Page 1156"
    },
    {
        q: "If you are the first unit on scene of a highway crash, you should:",
        options: [
            "Park downstream",
            "Use your vehicle to block traffic and protect the scene (upstream)",
            "Park in the median",
            "Park on the shoulder"
        ],
        answer: 1,
        explanation: "If you are first, you are the shield. Park upstream (before the crash) to block traffic. Once fire/police arrive to block, move the ambulance downstream to the safe zone.",
        cite: "Page 1158"
    },
    {
        q: "Carbon Monoxide (CO) levels in an ambulance can increase if:",
        options: [
            "The windows are open",
            "The exhaust system is damaged or you idle with windows closed",
            "The AC is on",
            "You drive too fast"
        ],
        answer: 1,
        explanation: "CO is odorless and deadly. Regular vehicle maintenance and avoiding idling in confined spaces are critical.",
        cite: "Page 1150"
    },
    {
        q: "Leaving a patient at the hospital without transferring care to a nurse or physician constitutes:",
        options: [
            "Negligence",
            "Battery",
            "Abandonment",
            "Assault"
        ],
        answer: 2,
        explanation: "You must give a verbal report to a higher or equal level provider. Leaving a patient in the hallway is abandonment.",
        cite: "Page 1164"
    }
];
