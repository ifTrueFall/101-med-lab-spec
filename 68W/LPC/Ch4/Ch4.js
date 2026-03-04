const chapter4Questions = [
    {
        q: "What is the definition of pharmacokinetics?",
        options: [
            "The study of the biochemical and physiologic effects of drugs.",
            "The body's action on a medication, often described as 'what the body does to the drug.'",
            "The study of how medications bind to protein receptors.",
            "The study of therapeutic doses in pediatric patients."
        ],
        answer: 1,
        explanation: "Pharmacokinetics refers to the body's action on a medication, including absorption, distribution, metabolism, and elimination.",
        cite: "Page 60"
    },
    {
        q: "Which route of medication administration results in the fastest onset of action?",
        options: [
            "Intramuscular (IM)",
            "Oral (PO)",
            "Intravenous (IV) / Intraosseous (IO)",
            "Inhaled (Nebulized)"
        ],
        answer: 2,
        explanation: "IV and IO medications have the fastest onset because they are injected directly into the circulatory system and do not require absorption.",
        cite: "Page 60"
    },
    {
        q: "The process by which enzyme proteins transform medications into other chemicals for elimination is known as:",
        options: [
            "Absorption",
            "Distribution",
            "Metabolism (Biotransformation)",
            "Adherence"
        ],
        answer: 2,
        explanation: "Metabolism, also known as biotransformation, is the process where the body's enzymes chemically alter a substance's structure so it can be eliminated.",
        cite: "Page 60"
    },
    {
        q: "What is the difference between agonist and antagonist medications?",
        options: [
            "Agonists are trade names; antagonists are generic names.",
            "Agonists stimulate receptors to start an action; antagonists prevent actions.",
            "Agonists are for bacterial infections; antagonists are for fungal infections.",
            "Agonists are oral liquids; antagonists are solids."
        ],
        answer: 1,
        explanation: "Agonist medications bind and stimulate receptors to produce a desired response, while antagonist medications block actions by agonist chemicals.",
        cite: "Page 61"
    },
    {
        q: "In medical terminology, how often should a medication be given if the order says 'q.i.d.'?",
        options: [
            "Once a day",
            "Twice a day",
            "Three times a day",
            "Four times a day"
        ],
        answer: 3,
        explanation: "The abbreviation 'q.i.d.' stands for four times a day. (Note: 'b.i.d.' is twice and 't.i.d.' is three times).",
        cite: "Page 62"
    },
    {
        q: "One tablespoon (tbsp) is equivalent to how many milliliters (mL)?",
        options: [
            "5 mL",
            "10 mL",
            "15 mL",
            "30 mL"
        ],
        answer: 2,
        explanation: "In liquid units of measure, 1 tablespoon is equivalent to 3 teaspoons or 15 mL.",
        cite: "Page 62"
    },
    {
        q: "When converting a patient's weight from pounds (lbs) to kilograms (kg), you should:",
        options: [
            "Multiply the weight in lbs by 2.2",
            "Divide the weight in lbs by 2.2",
            "Subtract 2.2 from the weight in lbs",
            "Add 2.2 to the weight in lbs"
        ],
        answer: 1,
        explanation: "To convert pounds to kilograms, divide the weight in pounds by 2.2.",
        cite: "Page 63"
    },
    {
        q: "Calculate the specific gravity of a 10 mL vial containing 500 mg of Ketamine.",
        options: [
            "5 mg/mL",
            "50 mg/mL",
            "500 mg/mL",
            "0.5 mg/mL"
        ],
        answer: 1,
        explanation: "Specific gravity (concentration) is calculated as Total Weight / Total Volume. 500 mg / 10 mL = 50 mg/mL.",
        cite: "Page 65"
    },
    {
        q: "A Medical Officer orders 30 mg of Ketorolac IM. The vial on hand is labeled 60 mg/2 mL. How much volume should you draw up?",
        options: [
            "0.5 mL",
            "1.0 mL",
            "1.5 mL",
            "2.0 mL"
        ],
        answer: 1,
        explanation: "Using the ratio: (60 mg / 2 mL) = (30 mg / X mL). Cross-multiplying: 60X = 60; X = 1.0 mL.",
        cite: "Page 66"
    },
    {
        q: "Why is Aspirin (ASA) contraindicated for service members in a combat environment?",
        options: [
            "It causes severe drowsiness.",
            "It is too expensive to supply forward.",
            "It inhibits platelets and prolongs bleeding time, risking excessive blood loss.",
            "It only works for minor headaches and not trauma."
        ],
        answer: 2,
        explanation: "Aspirin is an anti-platelet that prolongs bleeding time. In combat, this can cause a casualty to bleed excessively from wounds.",
        cite: "Page 69"
    },
    {
        q: "Prolonged use or overdose of Acetaminophen (Tylenol) can cause damage to which primary organ?",
        options: [
            "Kidneys",
            "Heart",
            "Liver",
            "Lungs"
        ],
        answer: 2,
        explanation: "Acetaminophen is primarily metabolized in the liver, and toxicity can result in hepatic necrosis (liver death).",
        cite: "Page 71"
    },
    {
        q: "What is the primary difference between first and second-generation H1-receptor antagonists (antihistamines)?",
        options: [
            "First-generation causes sedation; second-generation has little to no sedation.",
            "First-generation is more expensive.",
            "Second-generation can only be given via IV.",
            "There is no clinical difference."
        ],
        answer: 0,
        explanation: "First-generation antihistamines (like Benadryl) cross the blood-brain barrier and cause marked sedation. Second-generation (like Claritin) do not cross the barrier and are non-sedating.",
        cite: "Page 72-73"
    },
    {
        q: "What is the standard adult dose and concentration of Epinephrine for the treatment of Anaphylaxis?",
        options: [
            "1.0 mg (1:10,000) IV",
            "0.3-0.5 mg (1:1,000) IM or SQ",
            "5.0 mg (1:100) Oral",
            "0.1 mg (1:1,000) IV"
        ],
        answer: 1,
        explanation: "The standard adult dose for anaphylaxis is 0.3-0.5 mg of a 1:1,000 solution administered IM or SQ.",
        cite: "Page 74"
    },
    {
        q: "Why is it vital that a patient finishes their entire prescribed antibiotic regimen?",
        options: [
            "To ensure the unit receives full funding for the meds.",
            "Failure to finish can potentially create drug-resistant 'super bugs.'",
            "Antibiotics are only effective on the last day of the cycle.",
            "To prevent the pills from expiring in the cabinet."
        ],
        answer: 1,
        explanation: "If antibiotics fail to kill all targeted bacteria because the regimen was stopped early, the survivors can evolve mechanisms to withstand the drug, creating resistance.",
        cite: "Page 75"
    },
    {
        q: "For a combat casualty in mild to moderate pain who is still able to fight, which medications are included in the Combat Wound Medication Pack (CWMP)?",
        options: [
            "Morphine and Narcan",
            "Fentanyl and Ketamine",
            "Acetaminophen (650mg) and Meloxicam (15mg)",
            "Aspirin and Ibuprofen"
        ],
        answer: 2,
        explanation: "The CWMP contains Acetaminophen and Meloxicam (Mobic) for casualties who are in mild to moderate pain but remain PO tolerant and able to fight.",
        cite: "Page 80"
    },
    {
        q: "What is the correct way to administer Oral Transmucosal Fentanyl Citrate (OTFC)?",
        options: [
            "The casualty should swallow the lozenge immediately with water.",
            "The lozenge should be placed between the gums and cheek (transbuccal).",
            "The lozenge should be crushed and put into an IV bag.",
            "It should be applied as a topical ointment to the wound."
        ],
        answer: 1,
        explanation: "OTFC is absorbed through the mucosa inside the cheek. The lozenge is placed between the gums and cheek and should not be chewed or swallowed.",
        cite: "Page 81"
    },
    {
        q: "By what mechanism does Naloxone (Narcan) treat an opioid overdose?",
        options: [
            "It stimulates the heart to beat faster.",
            "It binds to the same receptors in the brain as opioids, blocking them and reversing effects.",
            "It acts as a sedative to calm the patient down.",
            "It thins the blood to wash the drug out faster."
        ],
        answer: 1,
        explanation: "Naloxone is an opioid antagonist that binds to the same brain receptors as opioids, effectively blocking the opioid and reversing respiratory depression.",
        cite: "Page 81"
    },
    {
        q: "What are the indications for using Ketamine for analgesia in TCCC?",
        options: [
            "Only for patients with minor scratches.",
            "For casualties with minor pain who are still fighting.",
            "For casualties in moderate to severe pain, including those in hemorrhagic shock or respiratory distress.",
            "Only for patients with a history of schizophrenia."
        ],
        answer: 2,
        explanation: "Ketamine is indicated for moderate to severe pain. Unlike opioids, it is safe for casualties in or at risk of hemorrhagic shock or respiratory distress.",
        cite: "Page 82"
    },
    {
        q: "What is the standard TCCC antibiotic for a casualty who is unable to take medications orally?",
        options: [
            "Moxifloxacin (400mg) PO",
            "Ertapenem (1g) IV/IO/IM",
            "Penicillin G IM",
            "Neosporin Topical"
        ],
        answer: 1,
        explanation: "Ertapenem (1g once per day) is the recommended TCCC antibiotic for casualties with open wounds who cannot tolerate oral intake.",
        cite: "Page 83"
    },
    {
        q: "The Antidote Treatment Nerve Agent Autoinjector (ATNAA) contains which two medications?",
        options: [
            "Ketamine and Midazolam",
            "Atropine and Pralidoxime Chloride (2-PAM)",
            "Epinephrine and Diphenhydramine",
            "Diazepam and Morphine"
        ],
        answer: 1,
        explanation: "An ATNAA is a dual-chamber injector that sequentially administers 2.1 mg of Atropine and 600 mg of 2-PAM through a single needle.",
        cite: "Page 84"
    }
];
