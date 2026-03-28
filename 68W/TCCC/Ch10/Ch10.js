const chapter10Questions = [
    {
        q: "What is the primary difference in ATP production between aerobic and anaerobic metabolism?",
        options: [
            "Aerobic produces 2 ATP; Anaerobic produces 38 ATP.",
            "Aerobic produces 38 ATP; Anaerobic produces 2 ATP.",
            "Both produce the same amount of ATP.",
            "Anaerobic metabolism does not produce ATP."
        ],
        answer: 1,
        explanation: "Aerobic metabolism is highly efficient, producing 38 ATP molecules per cycle, while anaerobic metabolism is a secondary 'backup' method that only produces 2 ATP.",
        cite: "Page 168"
    },
    {
        q: "Which metabolic byproduct is unique to anaerobic metabolism and contributes to the 'Lethal Triad'?",
        options: [
            "Carbon dioxide",
            "Water",
            "Lactic acid",
            "Glucose"
        ],
        answer: 2,
        explanation: "Anaerobic metabolism produces lactic acid, which decreases the body's pH and leads to metabolic acidosis, a critical component of the lethal triad in trauma.",
        cite: "Page 168"
    },
    {
        q: "Shock is described as what type of feedback loop in the human body?",
        options: [
            "Negative feedback loop",
            "Neutral feedback loop",
            "Positive feedback loop",
            "Stabilizing feedback loop"
        ],
        answer: 2,
        explanation: "Shock is a positive feedback loop because the resulting hypoxia and acidosis cause further cell death, which in turn worsens the shock state, amplifying the harm.",
        cite: "Page 171"
    },
    {
        q: "What is the clinical definition of shock?",
        options: [
            "An emotional response to trauma",
            "Insufficient tissue perfusion and oxygenation at the cellular level",
            "A sudden drop in heart rate",
            "High blood pressure caused by pain"
        ],
        answer: 1,
        explanation: "Shock occurs when the circulatory system fails to provide enough oxygenated blood to the cells to support aerobic metabolism and energy production.",
        cite: "Page 171"
    },
    {
        q: "The Fick Principle identifies that the physiology of shock is essentially a problem with:",
        options: [
            "Blood volume only",
            "Heart rate only",
            "Oxygenation",
            "Water retention"
        ],
        answer: 2,
        explanation: "The Fick Principle breaks down oxygenation into on-loading in the lungs, delivery to tissues, and off-loading at the cellular level; failure in any part leads to shock.",
        cite: "Page 172"
    },
    {
        q: "Which pressure is created by large protein molecules that cannot pass through a semipermeable membrane, helping to keep fluid inside the vessels?",
        options: [
            "Hydrostatic pressure",
            "Oncotic pressure",
            "Atmospheric pressure",
            "Osmotic pressure"
        ],
        answer: 1,
        explanation: "Oncotic pressure is the specific type of osmotic pressure exerted by proteins like albumin that pulls or holds fluid within the intravascular space.",
        cite: "Page 169"
    },
    {
        q: "What happens to the fluid shift when a 'Hypertonic' solution like Hextend is administered?",
        options: [
            "Fluid shifts from the vessels into the cells.",
            "There is no net fluid shift.",
            "Fluid shifts from the intracellular/interstitial space into the intravascular space.",
            "Fluid is immediately excreted by the kidneys."
        ],
        answer: 2,
        explanation: "Hypertonic solutions have a higher solute concentration than the blood, causing them to draw water out of the cells and into the blood vessels to increase volume.",
        cite: "Page 170"
    },
    {
        q: "Starling's Law describes the relationship between which of the following?",
        options: [
            "Oxygen levels and respiratory rate",
            "Preload, heart muscle stretch, and the strength of contraction",
            "Blood pressure and kidney function",
            "Heart rate and afterload"
        ],
        answer: 1,
        explanation: "Starling's Law states that the more the heart is filled (preload), the more the muscle fibers stretch, leading to a stronger contraction—up to a point of over-stretching.",
        cite: "Page 174"
    },
    {
        q: "In 'Neurogenic Shock,' how does the casualty's skin typically appear below the level of the spinal cord injury?",
        options: [
            "Pale, cool, and diaphoretic",
            "Warm, dry, and normal color",
            "Cyanotic and moist",
            "Bruised and swollen"
        ],
        answer: 1,
        explanation: "Due to the loss of sympathetic nervous system control, blood vessels dilate and sweat glands stop functioning below the injury, leading to warm, dry skin instead of the typical 'shocky' appearance.",
        cite: "Page 176"
    },
    {
        q: "What is the 'number one treatment' for Anaphylactic shock?",
        options: [
            "500 mL IV bolus of Normal Saline",
            "Intubation",
            "Epinephrine via autoinjector or IM injection",
            "Diphenhydramine (Benadryl)"
        ],
        answer: 2,
        explanation: "Epinephrine is life-saving because it causes immediate vasoconstriction (raising BP), relaxes airway muscles, and increases cardiac output.",
        cite: "Page 177"
    },
    {
        q: "Which type of shock is often referred to as 'Pump Failure'?",
        options: [
            "Hypovolemic shock",
            "Distributive shock",
            "Cardiogenic shock",
            "Obstructive shock"
        ],
        answer: 2,
        explanation: "Cardiogenic shock occurs when the heart itself is damaged (e.g., from a heart attack) and cannot pump enough blood to meet the body's needs.",
        cite: "Page 177"
    },
    {
        q: "Which form of Obstructive Shock can be directly treated by a Combat Medic in the field?",
        options: [
            "Pulmonary embolism",
            "Tension pneumothorax",
            "Pericardial tamponade",
            "Aortic rupture"
        ],
        answer: 1,
        explanation: "A Tension pneumothorax is an obstructive issue that a medic can resolve using needle decompression or a finger thoracostomy to restore preload and cardiac output.",
        cite: "Page 180"
    },
    {
        q: "Why is a decreased blood pressure considered a 'very late sign' of hemorrhagic shock?",
        options: [
            "Because the blood pressure cuff is usually broken.",
            "Because the body can compensate by shunting and increasing heart rate until 25-35% of blood volume is lost.",
            "Because the heart beats faster to keep the pressure high.",
            "Because blood pressure is not affected by blood loss."
        ],
        answer: 1,
        explanation: "The body is very good at maintaining pressure through compensation; once the blood pressure drops, those compensatory mechanisms have failed, indicating severe loss.",
        cite: "Page 182"
    },
    {
        q: "Which components make up the 'Lethal Triad' of trauma?",
        options: [
            "Pain, Fear, and Fatigue",
            "Hypotension, Tachycardia, and AMS",
            "Hypothermia, Acidosis, and Coagulopathy",
            "Bleeding, Infection, and Shock"
        ],
        answer: 2,
        explanation: "These three conditions—low temperature, acidic blood, and the inability to clot—form a self-reinforcing cycle that leads to death if not interrupted.",
        cite: "Page 182"
    },
    {
        q: "What is a major disadvantage of using Crystalloids (like NS or LR) for hemorrhagic shock resuscitation?",
        options: [
            "They are too expensive.",
            "They only stay in the vascular space for about an hour before 80% shifts to the tissues.",
            "They carry too much oxygen.",
            "They increase the body's temperature too quickly."
        ],
        answer: 1,
        explanation: "Crystalloids shift out of the blood vessels rapidly; after 1 hour, a 1000 mL bag only provides 200 mL of volume expansion, while the rest causes tissue edema.",
        cite: "Page 186"
    },
    {
        q: "What is the resuscitation fluid of choice for combat casualties in hemorrhagic shock?",
        options: [
            "Hextend",
            "Normal Saline",
            "Lactated Ringers",
            "Cold stored low titer O whole blood"
        ],
        answer: 3,
        explanation: "Whole blood is the gold standard because it replaces what was lost: oxygen-carrying capacity, volume, and clotting factors.",
        cite: "Page 187"
    },
    {
        q: "A Combat Medic finds a casualty with Altered Mental Status and a weak radial pulse. What is the estimated systolic blood pressure?",
        options: [
            "60 mmHg",
            "70 mmHg",
            "80 mmHg",
            "120 mmHg"
        ],
        answer: 2,
        explanation: "In a noisy environment, a palpable radial pulse provides a quick estimate that the systolic blood pressure is at least 80 mmHg.",
        cite: "Page 189"
    },
    {
        q: "What is the 'target' systolic blood pressure during hypotensive resuscitation for a non-TBI casualty?",
        options: [
            "80 mmHg",
            "100 mmHg",
            "120 mmHg",
            "140 mmHg"
        ],
        answer: 1,
        explanation: "A pressure of 100 mmHg is high enough to perfuse vital organs but low enough to avoid 'popping the clot' or dislodging internal clots at the site of injury.",
        cite: "Page 191"
    },
    {
        q: "Why should a medic administer 1 gram of Calcium after the first unit of citrated blood products?",
        options: [
            "To strengthen the casualty's bones.",
            "To prevent hypocalcemia caused by the citrate preservative in the blood.",
            "To increase the casualty's heart rate.",
            "To reduce the pain of the transfusion."
        ],
        answer: 1,
        explanation: "Citrate is an anticoagulant added to stored blood that binds to the patient's calcium; giving calcium prevents the complications of low calcium levels after transfusion.",
        cite: "Page 191"
    },
    {
        q: "What is the antibody titer threshold for 'universally safe' Low Titer Type-O Whole Blood?",
        options: [
            "Less than 1:100",
            "Less than 1:256",
            "Greater than 1:512",
            "1:1000"
        ],
        answer: 1,
        explanation: "If anti-A and anti-B antibody levels are less than a 1:256 dilution, there aren't enough antibodies in the plasma to cause a lethal hemolytic reaction in a recipient of a different type.",
        cite: "Page 193"
    }
];
