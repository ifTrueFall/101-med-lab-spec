const chapter9Questions = [
    {
        q: "What anatomical structures form the most superior border of the thorax?",
        options: [
            "The first pair of ribs",
            "The clavicles",
            "The acromion process",
            "The manubrium"
        ],
        answer: 1,
        explanation: "The clavicles (collarbones) mark the uppermost boundary of the thoracic cavity as they move posteriorly toward the acromioclavicular joint.",
        cite: "Page 146"
    },
    {
        q: "How many pairs of ribs are considered 'floating' because they only attach to the vertebrae?",
        options: [
            "Two pairs",
            "Five pairs",
            "Ten pairs",
            "Twelve pairs"
        ],
        answer: 0,
        explanation: "While there are twelve pairs of ribs total, the inferior two pairs are considered 'floating' because they lack an anterior attachment to the sternum.",
        cite: "Page 146"
    },
    {
        q: "Where is the neurovascular bundle (artery, vein, and nerve) located in relation to each rib?",
        options: [
            "Directly on the top aspect of the rib",
            "In the middle of the intercostal muscle",
            "On the bottom aspect of each rib",
            "Behind the thoracic vertebrae"
        ],
        answer: 2,
        explanation: "The neurovascular bundle runs along the inferior (bottom) border of each rib; this is why medical procedures like needle decompression are performed over the top of the rib to avoid hitting these structures.",
        cite: "Page 146"
    },
    {
        q: "What is the primary function of the pleural fluid found between the visceral and parietal pleura?",
        options: [
            "To provide nutrients to the lung tissue",
            "To create a suction that helps create negative pressure for ventilation",
            "To act as a shock absorber for the heart",
            "To stimulate the Hering-Breuer reflex"
        ],
        answer: 1,
        explanation: "Pleural fluid creates a suction between the membrane covering the lungs (visceral) and the membrane lining the chest wall (parietal), which maintains the negative pressure necessary for the lungs to expand with the chest wall.",
        cite: "Page 147"
    },
    {
        q: "In a healthy adult, what is the typical amount of air actively moved during a single respiration (Tidal Volume)?",
        options: [
            "150 mL",
            "300 mL",
            "500 mL",
            "1000 mL"
        ],
        answer: 2,
        explanation: "Average tidal volume is approximately 500 mL, though about 150 mL of that is 'dead space' air that never reaches the alveoli for gas exchange.",
        cite: "Page 148"
    },
    {
        q: "What is a 'VQ Mismatch'?",
        options: [
            "A difference in heart rate and pulse rate",
            "A discrepancy between ventilation (air reaching lungs) and perfusion (blood reaching alveoli)",
            "An imbalance between inhaled oxygen and exhaled nitrogen",
            "A mismatch in blood pressure between the left and right arms"
        ],
        answer: 1,
        explanation: "VQ mismatch occurs when there is an imbalance between the amount of air (V) entering the lungs and the amount of blood (Q) flowing to the lungs to pick up oxygen.",
        cite: "Page 149"
    },
    {
        q: "Which abnormal breathing pattern is characterized by progressively more rapid, deep breathing followed by periods of apnea, often caused by increased ICP?",
        options: [
            "Kussmaul respirations",
            "Biot's respirations",
            "Cheynes-Stokes respirations",
            "Apneustic respirations"
        ],
        answer: 2,
        explanation: "Cheynes-Stokes is a specific pattern of waxing and waning breathing commonly associated with severe traumatic brain injuries or increased intracranial pressure.",
        cite: "Page 149"
    },
    {
        q: "During the 'Care Under Fire' phase, how should a medic manage a casualty with a suspected open chest wound?",
        options: [
            "Perform immediate needle decompression",
            "Apply a vented occlusive dressing immediately",
            "Defer treatment until Tactical Field Care, though the casualty can place their own hand over the wound",
            "Stuff the wound with hemostatic gauze"
        ],
        answer: 2,
        explanation: "Thoracic trauma management is deferred to the TFC phase to minimize risk to the rescuer; however, simple measures like the casualty's own hand over the hole can slow the injury's progression.",
        cite: "Page 150"
    },
    {
        q: "A penetrating thoracic wound at the level of the nipples (4th intercostal space) or lower should be assumed to be which type of injury?",
        options: [
            "Thoracic injury only",
            "Abdominal injury only",
            "Both a thoracic and an abdominal injury",
            "A spinal cord injury"
        ],
        answer: 2,
        explanation: "Because the diaphragm moves higher during expiration, any wound at or below the 4th ICS must be treated as having potentially damaged both thoracic and abdominal organs.",
        cite: "Page 153"
    },
    {
        q: "Which type of blast injury is caused by the 'shock wave' itself and primarily affects hollow organs like the lungs?",
        options: [
            "Primary blast injury",
            "Secondary blast injury",
            "Tertiary blast injury",
            "Quaternary blast injury"
        ],
        answer: 0,
        explanation: "Primary blast injuries result from the overpressure wave, which is particularly damaging to air-filled structures like the lungs and gastrointestinal tract.",
        cite: "Page 153"
    },
    {
        q: "What is the hallmark physiological event of a tension pneumothorax that makes it a terminal event if not treated?",
        options: [
            "The lung stops absorbing oxygen",
            "Increased pressure collapses the lung and compresses the heart/vena cava, reducing preload",
            "Blood fills the bronchial tree, causing drowning",
            "The diaphragm becomes paralyzed"
        ],
        answer: 1,
        explanation: "As air traps in the pleural space, it creates tension that shifts the mediastinum, obstructing the vena cava and preventing blood from returning to the heart (decreasing preload), which leads to cardiovascular collapse.",
        cite: "Page 156"
    },
    {
        q: "When applying an occlusive dressing (OCD), when is the ideal time to seal the wound to minimize residual air?",
        options: [
            "During the peak of inhalation",
            "While the patient is holding their breath",
            "During exhalation",
            "Immediately, regardless of the respiratory cycle"
        ],
        answer: 2,
        explanation: "Applying the seal during exhalation helps ensure that as much air as possible has been pushed out of the pleural space before the wound is closed.",
        cite: "Page 157"
    },
    {
        q: "What does the procedure of 'burping' a chest seal involve?",
        options: [
            "Having the patient cough while you press on the chest",
            "Briefly peeling back the seal to allow trapped air or blood to escape",
            "Applying a second seal over the first one",
            "Manually compressing the diaphragm"
        ],
        answer: 1,
        explanation: "If a casualty with an occlusive dressing develops respiratory distress, 'burping' the seal (opening it temporarily) can relieve built-up pressure that was causing a tension pneumothorax.",
        cite: "Page 158"
    },
    {
        q: "Which of the following is an approved landmark for performing a Needle Chest Decompression (NDC)?",
        options: [
            "2nd intercostal space in the midclavicular line",
            "5th intercostal space in the anterior axillary line",
            "Both A and B are approved sites",
            "Directly through the center of the sternum"
        ],
        answer: 2,
        explanation: "TCCC guidelines allow for decompression at either the 2nd ICS (midclavicular) or the 5th ICS (anterior axillary) depending on the casualty's anatomy and injuries.",
        cite: "Page 159"
    },
    {
        q: "When performing an NDC, the needle must be inserted at what angle to the chest wall?",
        options: [
            "15 degrees",
            "45 degrees",
            "90 degrees (perpendicular)",
            "Parallel to the ribs"
        ],
        answer: 2,
        explanation: "The needle-catheter unit is inserted perpendicular to the chest wall to ensure it enters the pleural space directly and avoids sliding along the ribs.",
        cite: "Page 159"
    },
    {
        q: "What should a medic do if a casualty with torso trauma has no pulse or respirations during Tactical Field Care?",
        options: [
            "Declare them Expectant and move to the next patient",
            "Perform 30 minutes of CPR",
            "Perform bilateral needle decompression to rule out tension pneumothorax",
            "Immediately start a whole blood transfusion"
        ],
        answer: 2,
        explanation: "Before discontinuing care in a traumatic cardiac arrest, bilateral NDC is required to ensure that treatable tension pneumothoraces are not the cause of the arrest.",
        cite: "Page 160"
    },
    {
        q: "Where is the recommended incision site for a finger thoracostomy?",
        options: [
            "2nd intercostal space, midclavicular line",
            "4th or 5th intercostal space, anterior axillary line",
            "Directly over the xiphoid process",
            "In the supraclavicular notch"
        ],
        answer: 1,
        explanation: "The finger thoracostomy is performed in the 4th or 5th intercostal space along the anterior axillary line, which is roughly level with the nipple in males.",
        cite: "Page 162"
    },
    {
        q: "What is the recommended analgesic for the intense pain caused by a finger thoracostomy if the casualty is conscious?",
        options: [
            "Morphine 5 mg IV",
            "Fentanyl 800 mcg OTFC",
            "Ketamine 1-2 mg/kg and 1-2% Lidocaine infiltration",
            "Acetaminophen 1000 mg PO"
        ],
        answer: 2,
        explanation: "Due to the invasive nature of the procedure, ketamine is used for systemic dissociation and lidocaine is used to locally anesthetize the rib and incision site.",
        cite: "Page 162"
    },
    {
        q: "When monitoring a chest tube (tubal thoracostomy), what initial volume of blood drainage is considered 'normal' before leveling off?",
        options: [
            "Up to 100 mL",
            "Up to 500 mL",
            "Up to 1500 mL",
            "Drainage of any amount is always abnormal"
        ],
        answer: 2,
        explanation: "Initial drainage can be up to 1500 mL of blood that was already trapped in the chest; however, ongoing drainage exceeding 200 mL per hour is abnormal and indicates active major vessel bleeding.",
        cite: "Page 164"
    },
    {
        q: "Which complication can occur if a chest tube is not properly sealed with an occlusive dressing at the base?",
        options: [
            "Hyperventilation syndrome",
            "Reoccurrence of a tension pneumothorax due to air leaking back in",
            "Total collapse of the circulatory system",
            "Traumatic asphyxia"
        ],
        answer: 1,
        explanation: "A poor seal around the chest tube insertion site allows air to enter the pleural space, which can re-establish the positive pressure and tension that the tube was meant to resolve.",
        cite: "Page 164"
    }
];
