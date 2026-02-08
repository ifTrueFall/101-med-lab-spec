/**
 * BOARD QUESTIONS DATA
 * Comprehensive coverage of "Soldier of the Month Bio.pdf"
 * Structure matches QuizEngine requirements exactly.
 */

const boardQuestions = [
    // --- BIOGRAPHY ---
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
        q: "Who constitutes the 232d Medical Battalion Command Team?",
        options: [
            "COL Menendez and CSM Bowley",
            "LTC Gammons and CSM Thompson",
            "COL Gammons and CSM Thompson",
            "MAJ Rissler and 1SG Vue"
        ],
        answer: 2,
        explanation: "232d Med BN: COL Gammons and CSM Thompson. (COL Menendez and CSM Bowley are the 32d BDE team).",
        cite: "Chain of Command"
    },
    {
        q: "Who is the 32d Medical Brigade Command Team?",
        options: [
            "COL Gammons and CSM Thompson",
            "COL Menendez and CSM Bowley",
            "GEN George and SMA Weimer",
            "LTC Rissler and 1SG Vue"
        ],
        answer: 1,
        explanation: "The 32d Medical Brigade Command Team is COL Menendez and CSM Bowley.",
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

    // --- UNIFORMS (AR 670-1) ---
    {
        q: "Which paragraph within AR 670-1 Chapter 3 is punitive?",
        options: [
            "Paragraph 1",
            "Paragraph 2 (Hair and Grooming)",
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
        q: "What are the fingernail standards for Male and Female Soldiers?",
        options: [
            "Male: 1/8 inch; Female: 1/2 inch",
            "Male: Not beyond tip; Female: Max 1/4 inch",
            "Male: Not beyond tip; Female: No limit",
            "Male: 1 inch; Female: 1 inch"
        ],
        answer: 1,
        explanation: "Male fingernails will not extend beyond the tip of the finger. Female fingernails will not exceed 1/4 inch from the tip.",
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
        q: "What jewelry is authorized for wear in uniform?",
        options: [
            "Any gold or silver bracelet",
            "Medical alert, MIA/KIA (black/silver), and religious bracelets",
            "Smartwatches with bright colored bands",
            "Thumb rings"
        ],
        answer: 1,
        explanation: "Authorized bracelets: Medical alert, missing/killed in action (black or silver only), and religious bracelets.",
        cite: "AR 670-1"
    },
    {
        q: "Regarding accessories: Are cosmetics or sunglasses authorized?",
        options: [
            "Males may wear clear lip moisturizer; Sunglasses not allowed in formation (unless profile)",
            "Males may wear nail polish; Sunglasses allowed anytime",
            "Females may wear eyelash extensions; Males may wear cosmetics",
            "Lipstick is authorized in field environments"
        ],
        answer: 0,
        explanation: "Males: Cosmetics prohibited (except clear lip moisturizer). Sunglasses: No in formation unless profile. Eyelash extensions/Lipstick: Not authorized.",
        cite: "AR 670-1"
    },

    // --- BARRACKS & SOP ---
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
        q: "Which areas are designated 'Off-Limits'?",
        options: [
            "The PX and Commissary",
            "The Bowling Alley",
            "Non-Foxtrot areas, Salado Creek, construction areas, Navy/Air Force barracks",
            "The Gym and Track"
        ],
        answer: 2,
        explanation: "Off-limits: Non-Foxtrot areas, Salado Creek, permanent party housing, aquatic center, construction areas, Navy/AF barracks, vacant rooms.",
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
        q: "What is required during Bed Checks?",
        options: [
            "Full uniform and weapon",
            "ID Card and ID Tags",
            "Physical Fitness Uniform",
            "Room inspection only"
        ],
        answer: 1,
        explanation: "You are required to present your ID card and ID tags to the Drill Sergeant during bed checks.",
        cite: "Barracks SOP"
    },
    {
        q: "When are Quiet Hours?",
        options: [
            "2100-0600",
            "2200-Wake up",
            "2300-0500",
            "After final formation"
        ],
        answer: 1,
        explanation: "Quiet hours are from 2200 until wake up.",
        cite: "Barracks SOP"
    },
    {
        q: "What happens if a Soldier fails Height/Weight or AFT?",
        options: [
            "Nothing",
            "Remains in Foxtrot Company until standard is met or separated",
            "Demoted immediately",
            "Transferred to Charlie Company"
        ],
        answer: 1,
        explanation: "If failing Ht/Wt (AR 600-9), the Soldier remains in Foxtrot until standards are met or separated. A passing AFT is required to graduate/phase up.",
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
        q: "What is MFLC and where can you find info?",
        options: [
            "Medical Field Logistics; army.mil",
            "Military Family Life Counselor; militaryonesource.mil",
            "Military Financial Loan Center; aer.mil",
            "Major Field Leadership Course; tradoc.army.mil"
        ],
        answer: 1,
        explanation: "MFLC offers free/confidential counseling. Website: militaryonesource.mil.",
        cite: "Army Programs"
    },
    {
        q: "Who qualifies for an AER loan?",
        options: [
            "Only Officers",
            "Active Duty, and Reserve/NG on active duty >30 days",
            "Retired only",
            "Civilians"
        ],
        answer: 1,
        explanation: "Active duty, plus Reserve/NG on active status >30 days qualify for AER.",
        cite: "Army Programs"
    },

    // --- SHARP & EO ---
    {
        q: "What is the Army's slogan for SHARP?",
        options: [
            "Army Strong",
            "I.A.M. STRONG",
            "Be All You Can Be",
            "Intervene, Act, Motivate"
        ],
        answer: 1,
        explanation: "The slogan is I.A.M. STRONG (Intervene, Act, Motivate).",
        cite: "AR 600-52"
    },
    {
        q: "What are the 3 categories of Sexual Harassment?",
        options: [
            "Verbal, Non-Verbal, Physical",
            "Mild, Moderate, Severe",
            "Public, Private, Online",
            "Restricted, Unrestricted, Anonymous"
        ],
        answer: 0,
        explanation: "The three categories are Verbal, Non-Verbal, and Physical.",
        cite: "AR 600-52"
    },
    {
        q: "Who is the Brigade SARC?",
        options: [
            "SFC Chalos",
            "SDS Jeffries",
            "MAJ Rissler",
            "CSM Bowley"
        ],
        answer: 0,
        explanation: "The Brigade SARC is SFC Chalos.",
        cite: "SHARP"
    },
    {
        q: "What are the protected categories under EO?",
        options: [
            "Rank, MOS, Unit, Duty Station",
            "Race, Color, Sex, National Origin, Religion, Sexual Orientation",
            "Age, Height, Weight, PT Score",
            "Political Affiliation, Education, Marital Status"
        ],
        answer: 1,
        explanation: "Protected categories: Race, color, sex, national origin, religion, sexual orientation.",
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
        q: "Which command helps revoke a preparatory command?",
        options: [
            "Carry On",
            "As You Were",
            "Dismissed",
            "Fall Out"
        ],
        answer: 1,
        explanation: "'As you were' revokes a preparatory command.",
        cite: "TC 3-21.5"
    },
    {
        q: "What is a 'Review' in ceremonies?",
        options: [
            "A type of inspection",
            "A ceremony to honor a dignitary, present decorations, or recognize achievements",
            "A practice session for drill",
            "A disciplinary action"
        ],
        answer: 1,
        explanation: "A Review is a military ceremony used to honor a dignitary, present decorations, recognize achievements, and commemorate events.",
        cite: "TC 3-21.5"
    },
    {
        q: "Who is the only person in a platoon never out of step?",
        options: [
            "The Platoon Leader",
            "The Guide",
            "The Squad Leader",
            "The Drummer"
        ],
        answer: 1,
        explanation: "The Guide is the only person in a platoon that is never out of step.",
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
        q: "What is an Azimuth?",
        options: [
            "A vertical line on a map",
            "A horizontal angle measured clockwise from a north base line",
            "The distance between two points",
            "A type of compass"
        ],
        answer: 1,
        explanation: "An azimuth is a horizontal angle measured clockwise from a north base line, used to express direction.",
        cite: "TC 3-25.26"
    },
    {
        q: "What is the distance between grid lines on a combat map?",
        options: [
            "1 Mile",
            "1 Kilometer (1000 meters)",
            "100 Meters",
            "10 Kilometers"
        ],
        answer: 1,
        explanation: "The distance between grid lines on a combat map is 1 kilometer (1000 meters).",
        cite: "TC 3-25.26"
    }
];
