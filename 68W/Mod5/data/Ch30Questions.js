const ch30Questions = [
    {
        q: "Which layer of the skin contains blood vessels, nerves, sweat glands, and hair follicles?",
        options: [
            "Epidermis",
            "Dermis",
            "Subcutaneous layer",
            "Fascia"
        ],
        answer: 1,
        explanation: "The dermis is the second layer of skin, rich in blood vessels, nerves, and specialized structures. The epidermis (outer layer) has no blood vessels.",
        cite: "Page 827"
    },
    {
        q: "A closed wound characterized by a large collection of blood beneath the skin (often involving a liter of blood or more) is called a:",
        options: [
            "Contusion",
            "Hematoma",
            "Abrasion",
            "Laceration"
        ],
        answer: 1,
        explanation: "While a contusion is a simple bruise, a hematoma involves a larger amount of tissue damage and a significant collection of blood.",
        cite: "Page 828"
    },
    {
        q: "What is the primary difference between a Partial Thickness burn and a Full Thickness burn?",
        options: [
            "Partial thickness burns are painless; Full thickness burns are painful.",
            "Partial thickness burns involve blisters and intense pain; Full thickness burns appear charred/white and may lack sensation.",
            "Full thickness burns heal on their own in 48 hours.",
            "Partial thickness burns involve bone damage."
        ],
        answer: 1,
        explanation: "Partial thickness (2nd degree) burns are red, blistered, and painful. Full thickness (3rd degree) burns damage all layers, often appearing charred or dry/white with damaged nerves.",
        cite: "Page 847"
    },
    {
        q: "According to the Rule of Nines for an adult, what percentage of the body surface area does one entire arm represent?",
        options: [
            "4.5%",
            "9%",
            "13.5%",
            "18%"
        ],
        answer: 1,
        explanation: "Each upper extremity (arm) represents 9% of the total body surface area in an adult.",
        cite: "Page 848 (Figure 30-28)"
    },
    {
        q: "When treating a patient with a dry chemical powder on their skin, what is your first action?",
        options: [
            "Immediately flush with water.",
            "Brush away the dry chemical first, then flush with water.",
            "Apply a neutralizing agent like vinegar.",
            "Wrap the area in a dry sterile dressing."
        ],
        answer: 1,
        explanation: "Always brush off dry chemicals first. Adding water immediately can activate some chemicals (like dry lime) and cause a corrosive reaction.",
        cite: "Page 854"
    },
    {
        q: "An 'Avulsion' is defined as:",
        options: [
            "A scratch or scrape.",
            "A smooth or jagged cut.",
            "The tearing away or tearing off of a piece or flap of skin/soft tissue.",
            "A puncture wound."
        ],
        answer: 2,
        explanation: "An avulsion involves flaps of skin or tissue torn loose or pulled off completely (e.g., degloving or ear torn off).",
        cite: "Page 832"
    },
    {
        q: "Under what specific circumstance should you remove an impaled object?",
        options: [
            "If the object is in the abdomen.",
            "If the object is impaled in the cheek and creating an airway obstruction.",
            "If the object is very long and won't fit in the ambulance.",
            "Never remove an impaled object."
        ],
        answer: 1,
        explanation: "You generally stabilize impaled objects in place. The exception is an object in the cheek that penetrates into the mouth and threatens the airway.",
        cite: "Page 841"
    },
    {
        q: "What is the correct way to care for an amputated body part?",
        options: [
            "Place it directly on ice.",
            "Immerse it in saline or water.",
            "Wrap it in sterile dressing, place in a plastic bag, and keep cool (do not freeze).",
            "Scrub it clean and place in warm water."
        ],
        answer: 2,
        explanation: "Wrap the part in sterile dressing, bag it, and keep it cool. Direct contact with ice can freeze tissue, destroying it.",
        cite: "Page 843"
    },
    {
        q: "Which type of dressing is required for an open wound to the neck or chest?",
        options: [
            "Universal dressing",
            "Pressure dressing",
            "Occlusive dressing",
            "Self-adherent roller bandage"
        ],
        answer: 2,
        explanation: "An occlusive (airtight) dressing is required for neck/chest wounds to prevent air from entering the bloodstream (air embolism) or chest cavity (pneumothorax).",
        cite: "Page 861"
    },
    {
        q: "In a blast injury, 'Secondary Injuries' are caused by:",
        options: [
            "The high-pressure blast wave hitting the body.",
            "Projectiles (shrapnel) and debris hitting the patient.",
            "The patient being thrown against the ground.",
            "Burns from the heat of the explosion."
        ],
        answer: 1,
        explanation: "Primary is the pressure wave; Secondary is shrapnel/debris; Tertiary is the patient being thrown.",
        cite: "Page 835"
    },
    {
        q: "How long should you irrigate a chemical burn to the eye?",
        options: [
            "5 minutes",
            "10 minutes",
            "At least 20 minutes or until arrival at the hospital",
            "Until the pain stops"
        ],
        answer: 2,
        explanation: "Continue washing the eye for at least 20 minutes, flowing from the medial (nose) corner to the lateral (outside) corner.",
        cite: "Page 855"
    },
    {
        q: "Which of the following is considered a 'Superficial Burn' (1st Degree)?",
        options: [
            "A burn with blisters and swelling.",
            "A burn involving only the epidermis, characterized by redness (e.g., sunburn).",
            "A burn that is charred black.",
            "A burn involving muscle and bone."
        ],
        answer: 1,
        explanation: "Superficial burns involve only the epidermis and present with redness and pain, but no blisters.",
        cite: "Page 846"
    },
    {
        q: "What is the proper treatment for an object impaled in the eye?",
        options: [
            "Remove it carefully.",
            "Stabilize with gauze and cover with a rigid protection (like a cup).",
            "Bandage flat against the eye.",
            "Apply direct pressure to the object."
        ],
        answer: 1,
        explanation: "Stabilize the object with bulky dressing and place a rigid cup over it to prevent accidental movement. Bandage the uninjured eye as well to prevent sympathetic movement.",
        cite: "Page 842"
    },
    {
        q: "A burn that encircles a body part (Circumferential Burn) is dangerous because:",
        options: [
            "It looks scary.",
            "It can constrict the skin, interrupting circulation or restricting breathing.",
            "It is always a full thickness burn.",
            "It cannot be bandaged."
        ],
        answer: 1,
        explanation: "Circumferential burns act like a tourniquet as the skin tightens, potentially cutting off blood flow or restricting chest expansion.",
        cite: "Page 848"
    },
    {
        q: "For a high-pressure injection injury (e.g., grease gun), the most important action is:",
        options: [
            "Apply heat to the area.",
            "Apply cold to the area.",
            "Transport immediately, even if the wound looks minor.",
            "Squeeze the wound to remove the grease."
        ],
        answer: 2,
        explanation: "These injuries look minor but cause massive internal tissue death. Do not apply cold (causes vasoconstriction). Immediate surgical evaluation is required.",
        cite: "Page 835"
    },
    {
        q: "What is the 'Rule of Palm' used for?",
        options: [
            "To estimate blood loss.",
            "To estimate the surface area of a burn (Patient's palm = ~1%).",
            "To check for nerve damage.",
            "To measure the depth of a laceration."
        ],
        answer: 1,
        explanation: "The patient's palm (and fingers) equals approximately 1% of their total body surface area.",
        cite: "Page 849"
    },
    {
        q: "When dressing a hand injury, you should:",
        options: [
            "Wrap the fingers tightly together.",
            "Place the hand in a flat splint.",
            "Bandage it in the 'position of function' (holding a curled object).",
            "Leave the wound open to the air."
        ],
        answer: 2,
        explanation: "Bandaging in the position of function (like holding a soda can) prevents contractures and stiffness.",
        cite: "Page 859 (Scan 30-1)"
    },
    {
        q: "What characterizes an 'Electrical Burn'?",
        options: [
            "It is usually superficial.",
            "It typically has an Entrance and an Exit wound, with extensive internal damage.",
            "It bleeds profusely.",
            "It is caused by radiation."
        ],
        answer: 1,
        explanation: "Electrical injuries often show small entrance/exit wounds, but the internal damage to nerves, muscles, and organs can be massive.",
        cite: "Page 857"
    },
    {
        q: "What is the definition of an 'Abrasion'?",
        options: [
            "A smooth cut.",
            "A jagged cut.",
            "A scrape or scratch where the outer layer of skin is damaged.",
            "A puncture wound."
        ],
        answer: 2,
        explanation: "Abrasions are simple scrapes (e.g., road rash) involving the outer layers of skin.",
        cite: "Page 830"
    },
    {
        q: "In the Rule of Nines for an INFANT, the head represents what percentage?",
        options: [
            "9%",
            "18%",
            "4.5%",
            "14%"
        ],
        answer: 1,
        explanation: "Infants have larger heads relative to their body. Their head is 18%, whereas an adult head is 9%.",
        cite: "Page 848 (Figure 30-28)"
    }
];
