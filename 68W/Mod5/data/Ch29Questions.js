const ch29Questions = [
    {
        q: "What is the definition of 'Shock' (Hypoperfusion)?",
        options: [
            "Low blood pressure",
            "A heart rate greater than 100 beats per minute",
            "The body's inability to adequately circulate blood to the body's cells to supply them with oxygen and nutrients",
            "Severe internal bleeding"
        ],
        answer: 2,
        explanation: "Shock is defined as the inability of the body to adequately circulate blood to the body's cells to supply them with oxygen and nutrients. It is a life-threatening condition.",
        cite: "Page 786"
    },
    {
        q: "Which of the following characterizes 'Arterial Bleeding'?",
        options: [
            "Dark red blood that flows steadily",
            "Bright red blood that is often spurting and profuse",
            "Slow, oozing blood that is easily controlled",
            "Blood that contains air bubbles"
        ],
        answer: 1,
        explanation: "Arterial bleeding is bright red (oxygen-rich) and often spurts with the heartbeat due to high pressure.",
        cite: "Page 800"
    },
    {
        q: "What is the primary distinction between 'Compensated Shock' and 'Decompensated Shock'?",
        options: [
            "The heart rate (Decompensated has a slow heart rate)",
            "The respiratory rate (Compensated has normal breathing)",
            "The blood pressure (Decompensated shock is characterized by falling blood pressure)",
            "The skin condition (Decompensated shock has warm skin)"
        ],
        answer: 2,
        explanation: "In compensated shock, the body maintains BP via vasoconstriction and tachycardia. When BP drops, the patient has moved into decompensated shock.",
        cite: "Page 793"
    },
    {
        q: "The 'Deadly Triad' of trauma consists of which three conditions?",
        options: [
            "Hypothermia, Acidosis, and Coagulopathy",
            "Hypertension, Tachycardia, and Tachypnea",
            "Hypoxia, Hyperthermia, and Alkalosis",
            "Bleeding, Pain, and Unconsciousness"
        ],
        answer: 0,
        explanation: "The deadly triad—Acidosis, Hypothermia, and Coagulopathy—significantly contributes to mortality in shock patients.",
        cite: "Page 798"
    },
    {
        q: "When treating a patient with massive extremity hemorrhage, when should a tourniquet be applied?",
        options: [
            "Only after 15 minutes of direct pressure",
            "If direct pressure fails or is inappropriate (e.g., protruding bone ends or massive bleeding)",
            "Immediately for every cut",
            "Only if the patient is unconscious"
        ],
        answer: 1,
        explanation: "Tourniquets are used when direct pressure fails to control bleeding or is inappropriate due to the nature of the injury (e.g., mangled extremity).",
        cite: "Page 811"
    },
    {
        q: "Which type of shock is caused by a failure of the heart to pump blood effectively (e.g., after a massive heart attack)?",
        options: [
            "Hypovolemic Shock",
            "Distributive Shock",
            "Cardiogenic Shock",
            "Obstructive Shock"
        ],
        answer: 2,
        explanation: "Cardiogenic shock is caused by 'pump failure'—the heart's inability to circulate blood.",
        cite: "Page 790"
    },
    {
        q: "What is the correct treatment for a patient with a nosebleed (Epistaxis)?",
        options: [
            "Lean back and swallow the blood",
            "Pack the nose with cotton",
            "Sit forward and apply direct pressure to the fleshy portion of the nostrils",
            "Apply ice to the back of the neck only"
        ],
        answer: 2,
        explanation: "Have the patient sit down, lean forward, and apply direct pressure to the nostrils. Leaning back causes blood to flow into the stomach.",
        cite: "Page 817"
    },
    {
        q: "In 'Neurogenic Shock' (a type of distributive shock), what skin signs might you expect, unlike other forms of shock?",
        options: [
            "Pale, cool, and clammy skin",
            "Warm, flushed, and dry skin",
            "Mottled and cyanotic skin",
            "Profuse sweating"
        ],
        answer: 1,
        explanation: "Because the nervous system loses control of blood vessel tone, vessels dilate everywhere, making the skin warm and dry rather than pale and clammy.",
        cite: "Page 797 (Table 29-2)"
    },
    {
        q: "What is 'Pulse Pressure' and what does a narrowing pulse pressure indicate?",
        options: [
            "The heart rate; indicates pain",
            "The difference between systolic and diastolic BP; narrowing suggests vasoconstriction/compensation",
            "The speed of capillary refill; indicates heat stroke",
            "The oxygen saturation; indicates hypoxia"
        ],
        answer: 1,
        explanation: "Narrowing pulse pressure (systolic and diastolic getting closer) indicates the body is vasoconstricting to maintain pressure during shock.",
        cite: "Page 795"
    },
    {
        q: "When is 'Wound Packing' indicated?",
        options: [
            "For chest and abdominal wounds",
            "For superficial scrapes",
            "For junctional areas (groin/axilla) or extremity cavities where direct pressure alone is ineffective",
            "Only for head injuries"
        ],
        answer: 2,
        explanation: "Wound packing is used for extremities and junctional areas (groin/armpit) to fill void spaces. NEVER pack chest or abdominal wounds.",
        cite: "Page 809"
    },
    {
        q: "Which patient population relies heavily on heart rate to compensate for shock and can crash rapidly?",
        options: [
            "Geriatric patients",
            "Pediatric patients",
            "Athletes",
            "Obese patients"
        ],
        answer: 1,
        explanation: "Children compensate well with vasoconstriction and heart rate but can crash suddenly when they decompensate. Do not wait for BP to drop.",
        cite: "Page 792"
    },
    {
        q: "What signs would suggest a patient has internal bleeding?",
        options: [
            "Vomiting coffee-grounds material or bright red blood",
            "Dark tarry stools (Melena)",
            "Rigid, tender, or distended abdomen",
            "All of the above"
        ],
        answer: 3,
        explanation: "Internal bleeding signs include vomiting blood, tarry stools, and abdominal rigidity/tenderness.",
        cite: "Page 819"
    },
    {
        q: "Hypovolemic Shock is caused by:",
        options: [
            "Infection",
            "Spinal cord injury",
            "Loss of blood or fluid volume (e.g., bleeding, dehydration, burns)",
            "Heart failure"
        ],
        answer: 2,
        explanation: "Hypovolemic shock results from an insufficient volume of blood or fluid in the circulatory system.",
        cite: "Page 789"
    },
    {
        q: "Where should a tourniquet be placed?",
        options: [
            "Directly over the wound",
            "Distal to the wound",
            "Proximal to the wound (between heart and wound), avoiding joints",
            "Only at the very top of the limb, regardless of wound location"
        ],
        answer: 2,
        explanation: "Place the tourniquet proximal to the wound (about 2-3 inches) and never over a joint.",
        cite: "Page 815"
    },
    {
        q: "What is the primary function of 'Hemostatic Agents'?",
        options: [
            "To numb the pain",
            "To clean the wound",
            "To promote rapid blood clotting",
            "To prevent infection"
        ],
        answer: 2,
        explanation: "Hemostatic agents are dressings impregnated with substances that speed up the clotting process.",
        cite: "Page 810"
    },
    {
        q: "Obstructive Shock can be caused by:",
        options: [
            "Severe allergic reaction",
            "Tension pneumothorax or Pulmonary Embolism",
            "Uncontrolled bleeding",
            "Spinal injury"
        ],
        answer: 1,
        explanation: "Obstructive shock occurs when blood flow is physically blocked, such as by a tension pneumothorax compressing the heart.",
        cite: "Page 790"
    },
    {
        q: "Why does the skin become pale, cool, and clammy during shock?",
        options: [
            "Because the body is overheating",
            "Because blood is shunted away from the skin to vital organs (vasoconstriction)",
            "Because the heart has stopped",
            "Because of an allergic reaction"
        ],
        answer: 1,
        explanation: "The body constricts peripheral blood vessels to shunt blood to the brain and heart, leaving the skin pale and cool.",
        cite: "Page 797"
    },
    {
        q: "If you apply a tourniquet and the bleeding continues, what should you do?",
        options: [
            "Remove it and try again",
            "Tighten it further or apply a second tourniquet proximal to the first",
            "Give up and drive faster",
            "Apply a pressure dressing over it"
        ],
        answer: 1,
        explanation: "If one tourniquet fails, tighten it more or apply a second one just above the first to achieve arterial occlusion.",
        cite: "Page 816"
    },
    {
        q: "What is the first step in managing massive external hemorrhage?",
        options: [
            "Apply a tourniquet",
            "Apply direct pressure (gloved hand or dressing)",
            "Apply a hemostatic agent",
            "Elevate the limb"
        ],
        answer: 1,
        explanation: "Direct pressure is the first and most effective step for most external bleeding. If massive and uncontrolled, move to tourniquet.",
        cite: "Page 806"
    },
    {
        q: "Septic Shock is a form of Distributive Shock caused by:",
        options: [
            "Severe infection leading to systemic vasodilation",
            "Loss of blood",
            "Heart failure",
            "Spinal cord damage"
        ],
        answer: 0,
        explanation: "Septic shock is caused by a severe infection that triggers massive vasodilation and capillary permeability.",
        cite: "Page 790"
    }
];
