/**
 * BOARD QUESTIONS DATA
 */

const boardQuestions = [
    // --- BIOGRAPHY ADVICE ---
    {
        q: "According to the board guide, how should you prepare your biography?",
        options: [
            "Memorize it on the spot",
            "Write it out beforehand and practice",
            "Keep it over 5 minutes long",
            "Focus only on your military history"
        ],
        answer: 1,
        explanation: "The guide states: 'Write it out beforehand and practice. Trying to come up with something on the spot will not go well.'",
        cite: "Board Bio Guide"
    },

    // --- CHAIN OF COMMAND ---
    {
        q: "Who are the Company Commander and First Sergeant?",
        options: [
            "CPT Rissler and 1SG Vue",
            "MAJ Rissler and 1SG Vue",
            "COL Gammons and CSM Thompson",
            "MAJ Rissler and SDS Jeffries"
        ],
        answer: 1,
        explanation: "Company Commander is MAJ Rissler. First Sergeant is 1SG Vue.",
        cite: "Chain of Command"
    },
    {
        q: "Identify the correct Senior Drill Sergeants (SDS) for 1st, 2nd, and 3rd Platoon.",
        options: [
            "1: SDS Loera, 2: SDS Duenes, 3: SDS Meach",
            "1: SDS Duenes, 2: SDS Loera, 3: SDS Meach",
            "1: SDS Meach, 2: SDS Duenes, 3: SDS Loera",
            "1: SDS Duenes, 2: SDS Jeffries, 3: SDS Meach"
        ],
        answer: 1,
        explanation: "1PLT: SDS Duenes. 2PLT: SDS Loera. 3PLT: SDS Meach. The Company SDS is SDS Jeffries.",
        cite: "Chain of Command"
    },
    {
        q: "Who constitutes the 232d Medical Battalion Command Team?",
        options: [
            "COL Menendez and CSM Bowley",
            "LTC Gammons and CSM Thompson",
            "COL Gammons and CSM Thompson",
            "MAJ Rissler and 1SG Vue"
        ],
        answer: 2,
        explanation: "232d Med BN: COL Gammons and CSM Thompson. (Note: COL Menendez and CSM Bowley are the 32d BDE team).",
        cite: "Chain of Command"
    },

    // --- UNIFORMS (AR 670-1) ---
    {
        q: "Which paragraph within AR 670-1 Chapter 3 (Appearance and Grooming) is punitive?",
        options: [
            "Paragraph 1",
            "Paragraph 2",
            "Paragraph 4",
            "None are punitive"
        ],
        answer: 1,
        explanation: "Paragraph 2 (Hair and Fingernail Standards and Grooming Policies) is punitive.",
        cite: "AR 670-1"
    },
    {
        q: "What are the standards for male haircuts regarding bulk and parts?",
        options: [
            "Max 2 inches on top, 1 inch on sides; Part cut into natural hairline",
            "Max 3 inches on top; No parts allowed",
            "Max 1.5 inches on top; Curved parts authorized",
            "No maximum length; Parts must be 1/4 inch wide"
        ],
        answer: 0,
        explanation: "Top bulk max 2 inches. Side bulk max 1 inch. Parts must be a straight line (or align with natural curve) and no wider than 1/8 inch.",
        cite: "AR 670-1"
    },
    {
        q: "Which statement regarding female hairstyles is FALSE?",
        options: [
            "Bangs must remain above the eyebrows",
            "Female Soldiers may shave or trim their heads (whole scalp)",
            "Ponytails are authorized in all uniforms including the AGSU",
            "Buns may extend a maximum of 3 inches from the scalp"
        ],
        answer: 2,
        explanation: "Ponytails are NOT authorized in the AGSU or ASU (Dress uniforms). They are only for ACU/APFU.",
        cite: "AR 670-1"
    },
    {
        q: "What are the standards for wearing a ponytail in ACU?",
        options: [
            "Max length 6 inches from collar; Bulk not exceeding head width",
            "Max length 12 inches; Single or double pony allowed",
            "Must be braided; No length limit",
            "Max length to shoulder blades; Ends must be tucked"
        ],
        answer: 0,
        explanation: "Length must not exceed 6 inches from the top of the collar. Bulk must not exceed width of the head.",
        cite: "AR 670-1"
    },
    {
        q: "What are the authorized dimensions for female earrings and braids?",
        options: [
            "Earrings: 6mm; Braids: Max 2 braids (1 inch width)",
            "Earrings: 4mm; Braids: Max 1 braid",
            "Earrings: 6mm (1/4 inch); Braids: Max 2 braids (2 inch width)",
            "Earrings: 1/2 inch; Braids: Unlimited"
        ],
        answer: 2,
        explanation: "Earrings max 6mm (1/4 inch). Two braids are allowed, max 2 inches in width.",
        cite: "AR 670-1"
    },
    {
        q: "Regarding accessories and grooming: Which is authorized?",
        options: [
            "Male soldiers wearing clear lip moisturizers",
            "Eyelash extensions",
            "Male soldiers shaping designs into their hair",
            "Sunglasses in formation (without a profile)"
        ],
        answer: 0,
        explanation: "All Soldiers are permitted to use clear lip moisturizers. Extensions, designs, and sunglasses in formation (no profile) are prohibited.",
        cite: "AR 670-1"
    },

    // --- BARRACKS & COUNSELING ---
    {
        q: "What items must be worn/carried in duty uniform, and when must you report to formation?",
        options: [
            "CAC/Tags/Camelbak/Profile; 10 minutes prior",
            "CAC/Tags/Camelbak/Profile; 5 minutes prior",
            "Weapon/Helmet; 15 minutes prior",
            "Note pad/Pen; At the exact time"
        ],
        answer: 1,
        explanation: "Items: CAC, ID tags, camelbak, profile. Timing: FIVE minutes prior to all formations.",
        cite: "Initial Counseling"
    },
    {
        q: "Which list of items are ALL considered Contraband in the barracks?",
        options: [
            "Alcohol, Tobacco, Illegal Drugs, Privately Owned Weapons, Hemp, Pornography",
            "Alcohol, Energy Drinks, Civilian Clothes, Laptops",
            "Tobacco, Supplements, Playing Cards, Speakers",
            "Pre-workout, Protein Powder, Coffee Makers"
        ],
        answer: 0,
        explanation: "Contraband includes: Alcohol, tobacco/nicotine, illegal drugs, privately owned weapons, hemp products, and pornographic material.",
        cite: "Barracks SOP"
    },
    {
        q: "Select the correct rules for Food/Drink and Electronics in the barracks.",
        options: [
            "Unlimited energy drinks; Electronics on bed during duty",
            "1 Energy drink; 6 Protein bars (or 16oz); Electronics secured in closet",
            "No food allowed; Electronics allowed in formation",
            "2 Energy drinks; Protein powder only; Quiet hours start at 2100"
        ],
        answer: 1,
        explanation: "1 Energy drink. 6 protein bars or 16oz total. Electronics secured in closets during POI/lights out.",
        cite: "Barracks SOP"
    },
    {
        q: "What is the definition of a proper Battle Buddy team and Duty Hours?",
        options: [
            "Any two soldiers; 0900-1700",
            "Two soldiers of same sex; First formation until release by Drill Sergeant",
            "Three soldiers mixed gender; 0500-1900",
            "Two soldiers same platoon; 24/7"
        ],
        answer: 1,
        explanation: "Battle Buddy: Two Soldier Medics of the same sex. Duty Hours: First formation until released by a Drill Sergeant.",
        cite: "Unit SOP"
    },
    {
        q: "When are quiet hours and what happens if you fail Height/Weight (AR 600-9)?",
        options: [
            "2100-0600; Extra PT",
            "2200-Wake up; Remain in Foxtrot or Separated",
            "2300-0500; Re-test next day",
            "2000-Wake up; Article 15"
        ],
        answer: 1,
        explanation: "Quiet hours: 2200-wake up. Ht/Wt Failure: Soldier remains in Foxtrot until standard is met or is separated.",
        cite: "Unit SOP"
    },

    // --- ARMY PROGRAMS ---
    {
        q: "Match the Regulation to the Program: ASAP, ACS, AER, SHARP, EO.",
        options: [
            "ASAP: 600-85, ACS: 608-1, AER: 930-4, SHARP: 600-52, EO: 690-12",
            "ASAP: 600-20, ACS: 600-85, AER: 670-1, SHARP: 600-20, EO: 600-20",
            "ASAP: 608-1, ACS: 930-4, AER: 600-85, SHARP: 690-12, EO: 600-52",
            "ASAP: 930-4, ACS: 600-85, AER: 608-1, SHARP: 600-20, EO: 600-20"
        ],
        answer: 0,
        explanation: "Correct Regs: ASAP (AR 600-85), ACS (AR 608-1), AER (AR 930-4), SHARP (AR 600-52), EO (AR 690-12).",
        cite: "Army Programs"
    },
    {
        q: "Who qualifies for an AER loan and what does ACS offer?",
        options: [
            "Only Officers; Loans for vacation",
            "Active Duty (and Reserve/NG >30 days); Financial/Employment/Relocation readiness",
            "Retired only; Free housing",
            "Civilians; Tuition assistance"
        ],
        answer: 1,
        explanation: "AER: Active duty, plus Reserve/NG on active status >30 days. ACS offers Financial, Employment, and Relocation readiness.",
        cite: "Army Programs"
    },

    // --- SHARP & EO ---
    {
        q: "What is the Army's slogan for SHARP and the difference between Restricted/Unrestricted?",
        options: [
            "I.A.M. STRONG; Restricted = No Investigation, Unrestricted = Investigation",
            "Army Strong; Restricted = Commander knows, Unrestricted = SARC knows",
            "Be All You Can Be; No difference",
            "Intervene Act Motivate; Restricted = Investigation, Unrestricted = No Investigation"
        ],
        answer: 0,
        explanation: "Slogan: I.A.M. STRONG. Restricted reports do NOT trigger an investigation (Cmdr notified of assault but no PII). Unrestricted reports DO trigger an investigation.",
        cite: "AR 600-52"
    },
    {
        q: "Who are the Company EOLs and what are the three types of complaints?",
        options: [
            "DS Brady/Grey; Verbal, Written, Physical",
            "SDS Meach/Jeffries; Anonymous, Informal, Formal",
            "1SG Vue; Fast, Slow, Medium",
            "MAJ Rissler; Restricted, Unrestricted, Semi-restricted"
        ],
        answer: 1,
        explanation: "EOLs: SDS Meach and SDS Jeffries. Complaints: Anonymous, Informal, Formal.",
        cite: "AR 690-12"
    },

    // --- DRILL & CEREMONY (TC 3-21.5) ---
    {
        q: "What are the three marching steps and their lengths?",
        options: [
            "Quick (30), Double (30), Mark Time",
            "Quick (15), Double (30), Half (15)",
            "Regular (30), Fast (36), Slow (15)",
            "Forward (30), Backward (15), Side (10)"
        ],
        answer: 0,
        explanation: "The three steps are Quick time (30 inches), Double time (30 inches @ 180bpm), and Mark time.",
        cite: "TC 3-21.5"
    },
    {
        q: "What is the 'Blue Book' and who wrote it?",
        options: [
            "TC 3-21.5; General Washington",
            "The Regulations for the Order and Discipline of the Troops of the US; Baron Von Steuben",
            "The Soldier's Creed; CSM of the Army",
            "AR 670-1; General Patton"
        ],
        answer: 1,
        explanation: "The Blue Book is 'The Regulations for the Order and Discipline of the Troops of the United States', written by Baron Von Steuben.",
        cite: "History"
    },
    {
        q: "Which command helps revoke a preparatory command, and what is the only command from Inspection Arms?",
        options: [
            "Carry On; Order Arms",
            "As You Were; Ready, Port, Arms",
            "Dismissed; Present Arms",
            "Fall Out; Order Arms"
        ],
        answer: 1,
        explanation: "Revoke: 'As you were'. Inspection Arms: 'Ready, Port, Arms'.",
        cite: "TC 3-21.5"
    },
    {
        q: "What are the four rest positions at the halt?",
        options: [
            "Parade Rest, Stand at Ease, At Ease, Rest",
            "Parade Rest, Attention, At Ease, Fall Out",
            "Rest, Relax, Recover, Return",
            "Stand at Ease, Attention, Order Arms, Rest"
        ],
        answer: 0,
        explanation: "The four positions: Parade Rest, Stand at Ease, At Ease, Rest.",
        cite: "TC 3-21.5"
    },

    // --- MAP READING (TC 3-25.26) ---
    {
        q: "Identify the 5 Major, 3 Minor, and 2 Supplementary terrain features.",
        options: [
            "Major: Hill/Valley/Ridge/Saddle/Depression; Minor: Draw/Spur/Cliff; Supp: Cut/Fill",
            "Major: Draw/Spur/Cliff/Cut/Fill; Minor: Hill/Valley/Ridge",
            "Major: Mountain/River/Lake; Minor: Path/Road",
            "Major: North/South/East/West; Minor: NE/SE/SW/NW"
        ],
        answer: 0,
        explanation: "Major: Hill, Valley, Ridge, Saddle, Depression. Minor: Draw, Spur, Cliff. Supp: Cut, Fill.",
        cite: "TC 3-25.26"
    },
    {
        q: "What do the colors Blue, Red, and Brown represent on a map?",
        options: [
            "Blue: Sky, Red: Enemies, Brown: Dirt",
            "Blue: Water, Red: Roads/Cultural, Brown: Relief/Contour",
            "Blue: Friendly, Red: Enemy, Brown: Neutral",
            "Blue: Water, Red: Vegetation, Brown: Roads"
        ],
        answer: 1,
        explanation: "Blue = Water. Red = Roads/Cultural features. Brown = Relief features/Cultivated land.",
        cite: "TC 3-25.26"
    },
    {
        q: "What are the three Norths and where is the Legend found?",
        options: [
            "True, Magnetic, Grid; Lower Left Margin",
            "Up, Down, Left; Top Right",
            "True, False, Magnetic; Center",
            "Grid, Polar, Celestial; Back of map"
        ],
        answer: 0,
        explanation: "Three Norths: True, Magnetic, Grid. Legend is found in the Lower Left margin.",
        cite: "TC 3-25.26"
    }
];

// --- INITIALIZATION ---
// This part is critical. It checks if the engine is loaded, then starts the quiz.
window.addEventListener('load', () => {
    if (typeof renderQuiz === 'function') {
        renderQuiz(boardQuestions, 'quizContainer');
    } else {
        console.error("QuizEngine.js is not loaded. Cannot render quiz.");
        const container = document.getElementById('quizContainer');
        if (container) {
            container.innerHTML = "<p style='color:red; text-align:center; padding:20px;'>Error: QuizEngine.js not found.<br>Check console for details.</p>";
        }
    }
});
