const chapter1Questions = [
    {
        q: "What is the primary function of MHS GENESIS?",
        options: [
            "To track the logistical supplies of a Battalion Aid Station.",
            "It is the new electronic health record for the Military Health System providing enhanced, secure technology to manage health information.",
            "To serve as the primary communication tool between commanders and soldiers.",
            "It is an algorithm-directed troop medical care manual."
        ],
        answer: 1,
        explanation: "MHS GENESIS is implemented by the Defense Health Agency (DHA) as the new electronic health record for the MHS, integrating inpatient and outpatient solutions to connect medical and dental information.",
        cite: "Page 3"
    },
    {
        q: "What is the primary purpose of the DD Form 689?",
        options: [
            "It serves as a means of communication between medical personnel and the patient's commander.",
            "It is the basic form used to document the chronological record of outpatient treatment.",
            "It provides a detailed account of the objective and subjective findings during a sick call.",
            "It is the physical profile record used for long-term duty limitations."
        ],
        answer: 0,
        explanation: "The DD Form 689 is the Individual Sick Call Slip, which serves as a means of communication between medical personnel and the patient's commander regarding evaluation, treatment, and disposition.",
        cite: "Page 4"
    },
    {
        q: "Which form is considered the basic form used to document the chronological record of outpatient treatment?",
        options: [
            "DD Form 1380",
            "DD Form 689",
            "SF 600",
            "DA Form 3349"
        ],
        answer: 2,
        explanation: "The SF 600 (Chronological Record of Medical Care) is the basic form used to document the chronological record of outpatient treatment.",
        cite: "Page 4"
    },
    {
        q: "When making medical entries on an SF 600, what color ink is authorized?",
        options: [
            "Only black ink",
            "Black or blue-black ink",
            "Blue ink only",
            "Any color ink as long as it is legible"
        ],
        answer: 1,
        explanation: "Required procedures for making medical entries dictate that they must be legibly typed or handwritten in black or blue-black ink.",
        cite: "Page 5"
    },
    {
        q: "What is the proper procedure for correcting an entry error on a medical form?",
        options: [
            "Erase the error and write the correct information over it.",
            "Use correction fluid and write the correct information once dry.",
            "Scribble out the error completely so it cannot be read, then initial.",
            "Draw a single line through the information, write 'ERROR', the date, and your initials."
        ],
        answer: 3,
        explanation: "To correct an entry error, you must draw a single line through the incorrect information, write 'ERROR', the date, and your initials. The original information must remain readable, and you must never use correction fluid or obliterate the text.",
        cite: "Page 5"
    },
    {
        q: "In the SOAP note format, what does the 'S' stand for?",
        options: [
            "Symptoms",
            "Subjective",
            "Situation",
            "Surgical history"
        ],
        answer: 1,
        explanation: "The SOAP note format consists of Subjective information, Objective information, Assessment, and Plan.",
        cite: "Page 6"
    },
    {
        q: "What is the purpose of Algorithm Directed Troop Medical Care (ADTMC)?",
        options: [
            "To track patient demographics electronically.",
            "To prescribe permanent profiles for injured soldiers.",
            "To provide a clinical protocol for use in medical screening to determine the urgency and level of care required.",
            "To restrict soldiers to their barracks for 72 hours."
        ],
        answer: 2,
        explanation: "ADTMC provides a clinical protocol for use by enlisted medical personnel in medical screening to determine the urgency and level of care required in walk-in ambulatory care settings.",
        cite: "Page 7"
    },
    {
        q: "Unauthorized disclosure of medical information can result in action taken under which of the following?",
        options: [
            "AR 40-66",
            "Uniform Code of Military Justice (UCMJ)",
            "DA Form 4700",
            "Health Care Documentation Act"
        ],
        answer: 1,
        explanation: "Unauthorized disclosure of medical information is not only subject to federal law (HIPAA), but action can also be taken against the offender under the Uniform Code of Military Justice (UCMJ).",
        cite: "Page 9"
    },
    {
        q: "Personnel not involved in a patient's care will NOT have access to patient information UNLESS which of the following situations apply?",
        options: [
            "The requester is the patient's platoon sergeant.",
            "Access is required by law (court order) or authorized by the patient.",
            "The requester outranks the patient.",
            "The patient is returning to duty the same day."
        ],
        answer: 1,
        explanation: "Access to medical information by personnel not involved in the patient's care is only allowed if required by law (court order), needed for hospital accreditation, or authorized by the patient.",
        cite: "Page 9"
    },
    {
        q: "Which type of questioning technique helps you get more complete and accurate information from a patient?",
        options: [
            "Leading questions",
            "Yes or no questions",
            "Open-ended questions",
            "Rapid-fire questions"
        ],
        answer: 2,
        explanation: "Open-ended questions help you get more complete and accurate information. For example, asking 'what does the pain feel like?' is more useful than a yes/no question.",
        cite: "Page 10"
    },
    {
        q: "Which of the following is considered 'Subjective' information in a SOAP note?",
        options: [
            "The patient's blood pressure and pulse.",
            "Issues you cannot necessarily find in an examination, such as what the patient reports he feels.",
            "Your physical examination findings of the patient's abdomen.",
            "The prescribed medication and dosage."
        ],
        answer: 1,
        explanation: "Subjective information includes issues you cannot necessarily find in an examination—specifically, what the patient reports he feels or understands as the problem. This is usually documented in direct quotes.",
        cite: "Page 11"
    },
    {
        q: "What mnemonic is used to gather information for the subjective portion of a SOAP note regarding the patient's history?",
        options: [
            "DCAP-BTLS",
            "AVPU",
            "SAMPLE",
            "MARCH"
        ],
        answer: 2,
        explanation: "The mnemonic SAMPLE is used to gather information needed for the subjective portions: Signs and symptoms, Allergies, Medications, Past pertinent history, Last oral intake, and Events leading up to illness/injury.",
        cite: "Page 11"
    },
    {
        q: "When gathering the History of Present Illness (HPI), what does the 'P' in OPQRST stand for?",
        options: [
            "Pulse/Perfusion",
            "Provoking/Palliative factors",
            "Past medical history",
            "Pain scale"
        ],
        answer: 1,
        explanation: "In OPQRST, the 'P' stands for Provoking/Palliative factors—identifying what makes the pain or symptom worse or better.",
        cite: "Page 11"
    },
    {
        q: "Which of the following details should be recorded under the 'Objective' section of a SOAP note?",
        options: [
            "The patient's description of their pain.",
            "Vital signs and physical examination findings.",
            "The events leading up to the injury.",
            "The patient's suspected diagnosis."
        ],
        answer: 1,
        explanation: "Objective Information consists of vital signs, physical examination findings, and a general impression. Nothing from the patient's comments or history is recorded here.",
        cite: "Page 13"
    },
    {
        q: "During the objective examination of the abdomen, what is the normal rate for bowel sounds per minute in each quadrant?",
        options: [
            "1-4 clicks or gurgles",
            "5-34 clicks or gurgles",
            "35-50 clicks or gurgles",
            "60-100 clicks or gurgles"
        ],
        answer: 1,
        explanation: "The peristaltic action of the bowel normally produces between 5-34 clicks or gurgles per minute in each quadrant.",
        cite: "Page 14"
    },
    {
        q: "In a SOAP note, what does the 'Assessment' represent?",
        options: [
            "The patient's chief complaint only.",
            "The development of the treatment plan.",
            "The suspected diagnosis based on the history and physical exam.",
            "The list of medications prescribed."
        ],
        answer: 2,
        explanation: "The Assessment in a SOAP Note is your suspected (presumptive) diagnosis based on the history of the patient and your physical examination findings.",
        cite: "Page 15"
    },
    {
        q: "If a combat medic is unsure of the diagnosis while writing the Assessment portion of a SOAP note, what should they do?",
        options: [
            "Leave the Assessment section blank.",
            "Guess the most likely severe injury.",
            "Simply restate the patient's chief complaint.",
            "Write 'Refer to Medical Officer' in the Assessment block."
        ],
        answer: 2,
        explanation: "If you are unsure of the diagnosis, you should simply restate the patient's chief complaint (e.g., 'A - Right knee pain') or write it as a 'rule out' (R/O).",
        cite: "Page 15"
    },
    {
        q: "Which of the following is typically documented in the 'Plan' section of a SOAP note?",
        options: [
            "The patient's vital signs.",
            "The mechanism of injury.",
            "Special actions such as ice/heat, compression, elevation, or splint.",
            "The patient's social history (e.g., smoking)."
        ],
        answer: 2,
        explanation: "The Treatment Plan includes courses of action relevant to the assessment, such as medication, duty restrictions, special actions (ice, heat, splints), referral to a medical officer, and follow-up instructions.",
        cite: "Page 15"
    },
    {
        q: "What does the term 'QUARTERS' mean when prescribed as a disposition by a medical officer?",
        options: [
            "The patient is returned to his unit for full duty without restrictions.",
            "The patient is restricted to bed with allowances only for the latrine and dining facility.",
            "The patient is restricted to their place of domicile, with freedom of movement to the dining facility and medical facility.",
            "The patient is admitted to an inpatient hospital ward."
        ],
        answer: 2,
        explanation: "'QUARTERS' means restriction and rest in the patient's place of domicile (barracks, etc.), and freedom of movement extends to the dining facility, day room, and medical treatment facility. They may not perform military duties.",
        cite: "Page 16"
    },
    {
        q: "A disposition of 'QUARTERS' will normally not exceed what duration?",
        options: [
            "24 hours",
            "48 hours",
            "72 hours",
            "96 hours"
        ],
        answer: 2,
        explanation: "According to sick call protocols, Quarters will not normally exceed 72 hours.",
        cite: "Page 16"
    }
];
