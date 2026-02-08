/* * Soldier of the Month Board Questions
 * Source: Provided Biography & Regulations (AR 670-1, TC 3-21.5, AR 600-85, TC 3-25.26)
 */

const questions = [
    // ==========================================
    // CHAIN OF COMMAND & UNIT HISTORY
    // ==========================================
    {
        category: "Chain of Command",
        question: "Who is the Company Commander of Foxtrot Company?",
        options: [
            "CPT Rissler",
            "MAJ Rissler",
            "COL Gammons",
            "1SG Vue"
        ],
        answer: 1, // MAJ Rissler
        [span_0](start_span)context: "Per the bio, the Company Commander is MAJ Rissler and the 1SG is 1SG Vue.[span_0](end_span)"
    },
    {
        category: "Chain of Command",
        question: "Who constitutes the 232d Medical Battalion Command Team?",
        options: [
            "LTC Gammons and CSM Thompson",
            "COL Menendez and CSM Bowley",
            "COL Gammons and CSM Thompson",
            "MAJ Rissler and 1SG Vue"
        ],
        answer: 2, // COL Gammons and CSM Thompson
        [span_1](start_span)context: "COL Gammons is the Battalion Commander and CSM Thompson is the Battalion CSM.[span_1](end_span)"
    },
    {
        category: "Chain of Command",
        question: "Who is the Brigade Commander of the 32d Medical Brigade?",
        options: [
            "COL Menendez",
            "COL Gammons",
            "CSM Bowley",
            "SDS Jeffries"
        ],
        answer: 0, // COL Menendez
        [span_2](start_span)context: "The 32d Medical Brigade Command Team is COL Menendez and CSM Bowley.[span_2](end_span)"
    },
    
    // ==========================================
    // THE SOLDIER'S CREED
    // ==========================================
    {
        category: "Soldier's Creed",
        question: "Fill in the blank: 'I serve the people of the United States, and live the ______.'",
        options: [
            "Army Values",
            "Warrior Ethos",
            "American Dream",
            "Soldier's Code"
        ],
        answer: 0,
        [span_3](start_span)context: "The line is: 'I serve the people of the United States, and live the Army Values.'[span_3](end_span)"
    },
    {
        category: "Soldier's Creed",
        question: "Which of the following is NOT a line from the Soldier's Creed?",
        options: [
            "I will never quit.",
            "I will always place the mission first.",
            "I am a guardian of freedom and the American way of life.",
            "I will never leave a fallen comrade behind."
        ],
        answer: 3, 
        context: "The correct line is 'I will never leave a fallen comrade.' [span_4](start_span)The word 'behind' is not in the official creed text provided.[span_4](end_span)"
    },

    // ==========================================
    // WEAR AND APPEARANCE (AR 670-1)
    // ==========================================
    {
        category: "Uniforms (AR 670-1)",
        question: "Which paragraph of AR 670-1, Chapter 3 is punitive?",
        options: [
            "Paragraph 1 (General)",
            "Paragraph 2 (Hair and Fingernail Standards and Grooming Policies)",
            "Paragraph 3 (Tattoos)",
            "Paragraph 4 (Jewelry)"
        ],
        answer: 1,
        context: "Paragraph 2 is punitive. [span_5](start_span)Violation of the specific grooming standards can result in UCMJ action.[span_5](end_span)"
    },
    {
        category: "Uniforms (AR 670-1)",
        question: "What is the maximum authorized bulk for male hair on top of the head?",
        options: [
            "1 inch",
            "1.5 inches",
            "2 inches",
            "3 inches"
        ],
        answer: 2,
        context: "The bulk of the hair at the top of the scalp will not exceed 2 inches. [span_6](start_span)Side bulk is limited to 1 inch.[span_6](end_span)"
    },
    {
        category: "Uniforms (AR 670-1)",
        question: "Are female Soldiers authorized to wear a ponytail in the Army Service Uniform (ASU) or AGSU?",
        options: [
            "Yes, if it does not exceed 6 inches.",
            "Yes, but only during physical training.",
            "No, ponytails are not authorized in dress uniforms.",
            "Yes, if secured with a specifically colored scrunchie."
        ],
        answer: 2,
        context: "No. [span_7](start_span)Ponytails are authorized in ACU and APFU, but NOT in any variation of the dress uniform (AGSU/ASU).[span_7](end_span)"
    },
    {
        category: "Uniforms (AR 670-1)",
        question: "What is the maximum length a female Soldier's ponytail may extend from the top of the collar?",
        options: [
            "3 inches",
            "6 inches",
            "9 inches",
            "12 inches"
        ],
        answer: 1,
        [span_8](start_span)context: "The ponytail length must not exceed 6 inches from the top of the collar.[span_8](end_span)"
    },
    {
        category: "Uniforms (AR 670-1)",
        question: "What is the standard for male fingernails?",
        options: [
            "Must not exceed 1/4 inch.",
            "Must not extend beyond the tip of the finger.",
            "Must be clear coat only.",
            "Must be clipped weekly."
        ],
        answer: 1,
        [span_9](start_span)context: "Male fingernails will be kept trimmed and will not extend beyond the tip of the finger.[span_9](end_span)"
    },
    {
        category: "Uniforms (AR 670-1)",
        question: "What types of bracelets are authorized for wear in uniform?",
        options: [
            "Fitbit, Medical Alert, Religious",
            "Medical Alert, POW/MIA (Black/Silver), Religious",
            "Any black or silver bracelet",
            "Paracord bracelets in unit colors"
        ],
        answer: 1,
        [span_10](start_span)context: "Authorized: Medical alert, missing/killed in action (black or silver only), and religious bracelets.[span_10](end_span)"
    },
    {
        category: "Uniforms (AR 670-1)",
        question: "Are male Soldiers authorized to cut a part into their hair?",
        options: [
            "No, never.",
            "Yes, provided it is a curved line.",
            "Yes, if the hair does not part naturally (one straight line).",
            "Yes, if it is hard-parted by a barber."
        ],
        answer: 2,
        context: "If hair does not part naturally, a male Soldier may cut a part. [span_11](start_span)It must be one straight line, not sloped or curved.[span_11](end_span)"
    },

    // ==========================================
    // BARRACKS & INITIAL COUNSELING
    // ==========================================
    {
        category: "Barracks Rules",
        question: "What is the authorized quantity of protein bars allowed in the barracks?",
        options: [
            "3 bars or 8 oz",
            "6 bars or 16 oz",
            "1 box per person",
            "None are authorized"
        ],
        answer: 1,
        [span_12](start_span)context: "Soldiers are authorized SIX protein bars or 16 ounces total of protein products.[span_12](end_span)"
    },
    {
        category: "Barracks Rules",
        question: "When are you required to report to formation?",
        options: [
            "At the exact time stated.",
            "10 minutes prior.",
            "5 minutes prior.",
            "15 minutes prior (Soldier time)."
        ],
        answer: 2,
        [span_13](start_span)context: "You are required to report FIVE minutes prior to all formations.[span_13](end_span)"
    },
    {
        category: "Barracks Rules",
        question: "What constitutes a proper Battle Buddy team?",
        options: [
            "Any two Soldiers.",
            "Two Soldiers of the same sex.",
            "Three Soldiers mixed gender.",
            "A Soldier and their NCO."
        ],
        answer: 1,
        [span_14](start_span)context: "A proper battle buddy team consists of two Soldier Medics of the same sex.[span_14](end_span)"
    },
    {
        category: "Barracks Rules",
        question: "When are quiet hours in the barracks?",
        options: [
            "2100 - 0500",
            "2200 - Wake up",
            "2000 - 0600",
            "Lights out - 0400"
        ],
        answer: 1,
        [span_15](start_span)context: "Quiet hours are from 2200 until wake up.[span_15](end_span)"
    },

    // ==========================================
    // DRILL AND CEREMONY (TC 3-21.5)
    // ==========================================
    {
        category: "Drill & Ceremony",
        question: "What is the length of a marching step at Quick Time?",
        options: [
            "15 inches",
            "30 inches",
            "36 inches",
            "24 inches"
        ],
        answer: 1,
        context: "A normal step at quick time is 30 inches. (120 steps per minute)[span_16](start_span)."
    },
    {
        category: "Drill & Ceremony",
        question: "What are the three methods of instruction used to teach Drill?",
        options: [
            "Step-by-step, Talk-through, By-the-numbers",
            "Visual, Auditory, Kinesthetic",
            "Demonstration, Conference, Lecture",
            "Quick time, Double time, Mark time"
        ],
        answer: 0,
        context: "Note: While not explicitly in the bio snippet, this is standard TC 3-21.5 knowledge. The bio lists the three *marching steps* (Quick, Double, Mark time)[span_16](end_span)."
    },
    {
        category: "Drill & Ceremony",
        question: "What is a 'Combined Command'?",
        options: [
            "A command with a preparatory and execution phase.",
            "A command given by two leaders at once.",
            "A command that has no preparatory command.",
            "A command used to combine units."
        ],
        answer: 2,
        [span_17](start_span)context: "A combined command has no preparatory command (e.g., 'Fall In', 'At Ease').[span_17](end_span)"
    },
    {
        category: "Drill & Ceremony",
        question: "What is the only command given from the position of 'Inspection Arms'?",
        options: [
            "Order Arms",
            "Ready, Port, Arms",
            "Dismissed",
            "Present Arms"
        ],
        answer: 1,
        [span_18](start_span)context: "The command 'Ready, Port, Arms' is the only command given from Inspection Arms.[span_18](end_span)"
    },

    // ==========================================
    // LAND NAVIGATION (TC 3-25.26)
    // ==========================================
    {
        category: "Land Navigation",
        question: "Which of the following is a Major Terrain Feature?",
        options: [
            "Draw",
            "Saddle",
            "Cliff",
            "Spur"
        ],
        answer: 1,
        context: "Major features: Hill, Valley, Ridge, Saddle, Depression. (Remember: Hidden Valley Ranch Salad Dressing)[span_19](start_span)."
    },
    {
        category: "Land Navigation",
        question: "What does the color RED represent on a military map?",
        options: [
            "Vegetation",
            "Water",
            "Cultural features and main roads",
            "Elevation"
        ],
        answer: 2,
        context: "Red represents cultural features, populated areas, and main roads.[span_19](end_span)"
    },
    {
        category: "Land Navigation",
        question: "What are the three types of contour lines?",
        options: [
            "High, Low, Flat",
            "Index, Intermediate, Supplementary",
            "Primary, Secondary, Tertiary",
            "Major, Minor, Critical"
        ],
        answer: 1,
        [span_20](start_span)context: "The three types of contour lines are Index (bold), Intermediate (thin), and Supplementary (dashed).[span_20](end_span)"
    },
    {
        category: "Land Navigation",
        question: "Where is the Legend found on a map?",
        options: [
            "Top center",
            "Lower right margin",
            "Lower left margin",
            "Back of the map"
        ],
        answer: 2,
        [span_21](start_span)context: "The map legend is found in the lower left margin.[span_21](end_span)"
    },

    // ==========================================
    // ARMY PROGRAMS
    // ==========================================
    {
        category: "Army Programs",
        question: "What regulation covers the SHARP program?",
        options: [
            "AR 600-20",
            "AR 600-85",
            "AR 600-52",
            "AR 608-1"
        ],
        answer: 2,
        [span_22](start_span)context: "AR 600-52 now covers the Army SHARP program.[span_22](end_span)"
    },
    {
        category: "Army Programs",
        question: "Who constitutes the Brigade SARC?",
        options: [
            "SFC Chalos",
            "SSG Smith",
            "MAJ Rissler",
            "SDS Meach"
        ],
        answer: 0,
        [span_23](start_span)context: "The BDE SARC is SFC Chalos (210-771-2821).[span_23](end_span)"
    },
    {
        category: "Army Programs",
        question: "Which of the following qualifies for an AER loan?",
        options: [
            "Buying a new car",
            "Paying off credit card debt",
            "Emergency travel and vehicle repairs",
            "Down payment on a house"
        ],
        answer: 2,
        [span_24](start_span)context: "Qualifying reasons: Emergency travel, rent, groceries, utilities, vehicle costs, child seats, medical bills.[span_24](end_span)"
    },
    {
        category: "Army Programs",
        question: "What does the acronym ASAP stand for?",
        options: [
            "Army Sexual Assault Prevention",
            "As Soon As Possible",
            "Army Substance Abuse Program",
            "Army Suicide Awareness Program"
        ],
        answer: 2,
        [span_25](start_span)context: "ASAP stands for Army Substance Abuse Program (AR 600-85).[span_25](end_span)"
    }
];

// Export for use in the engine
if (typeof module !== 'undefined') {
    module.exports = questions;
}
