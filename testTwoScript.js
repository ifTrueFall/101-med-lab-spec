/*
    ============================
    Quiz Generation Function
    ============================ 
*/

/*
  Takes a list of questions in the specified format and generates HTML
  and the correct answer key.

  Args:
    questionList (Array<string>): An array where each element is a two-line string:
      "question: <Question Text>\n<Correct Answer>, <Answer2>, <Answer3>, <Answer4>"
      (Assumes the first answer listed is the correct one)

  Returns:
    Object: { html: string, answers: object }
      - html: A string containing all the generated HTML question divs.
      - answers: An object mapping question IDs (q1, q2, ...) to the correct answer letter (a, b, c, or d).
*/
function generateQuizHTML(questionList) {
  let fullHTML = '';
  const correctAnswers = {};
  const answerLetters = ['a', 'b', 'c', 'd'];

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  questionList.forEach((questionBlock, index) => {
    const questionNumber = index + 1;
    const questionId = `q${questionNumber}`;
    const lines = questionBlock.trim().split('\n');

    if (lines.length !== 2 || !lines[0].toLowerCase().startsWith('question:') || !lines[1]) {
      console.error(`Skipping invalid question block format at index ${index}:`, questionBlock);
      return;
    }

    const questionText = lines[0].substring(lines[0].indexOf(':') + 1).trim();
    const allAnswers = lines[1].split(',').map(ans => ans.trim());

    if (allAnswers.length !== 4) {
       console.error(`Skipping question ${questionNumber} due to incorrect number of answers (found ${allAnswers.length}, expected 4).`);
       return;
    }
    const correctAnswerText = allAnswers[0];

    let answerObjects = allAnswers.map(ans => ({
      text: ans,
      isCorrect: ans === correctAnswerText
    }));

    answerObjects = shuffleArray(answerObjects);

    let questionHTML = `<div class="question-container" id="${questionId}">\n`;
    questionHTML += `  <p><strong>${questionNumber}. ${questionText}</strong></p>\n`;

    answerObjects.forEach((ansObj, ansIndex) => {
      const letter = answerLetters[ansIndex];
      questionHTML += `  <label>\n`;
      questionHTML += `    <input type="radio" name="${questionId}" value="${letter}" style="vertical-align: middle;"> ${letter}) ${ansObj.text}\n`;
      questionHTML += `    <span class="feedback"></span>\n`;
      questionHTML += `  </label>\n`;

      if (ansObj.isCorrect) {
        correctAnswers[questionId] = letter;
      }
    });

    questionHTML += `</div>\n\n`; 
    fullHTML += questionHTML; 
  });

  return {
    html: fullHTML,
    answers: correctAnswers
  };
}


/* 
    ============================
    Quiz Data and Execution
    ============================ 
*/

//    DEFINE YOUR QUESTIONS HERE
//    Use the format: 'question: <Question's Text> <new line> 
// <Correct Answer>, <Wrong1>, <Wrong2>, <Wrong3>'
const myQuestions = [
    `question: What is the term for a portion of a specimen used for testing?
Aliquot, Aerosol, Centrifuge, Analyte`,

    `question: According to CLSI, what is the maximum time serum/plasma aliquots can remain at room temperature?
8 hours, 2 hours, 24 hours, 48 hours`,

    `question: What is the most common antiseptic used for routine blood collection site cleaning?
70% isopropyl alcohol, Povidone-iodine, Benzalkonium chloride, Hydrogen peroxide`,

    `question: Which tube additive prevents glycolysis?
Sodium Fluoride, Heparin, EDTA, Sodium Citrate`,

    `question: What does the abbreviation QNS stand for in specimen processing?
Quantity Not Sufficient, Quality Near Standard, Quick Needle Stick, Questionable Normal Sample`,

    `question: In the order of draw, which tube is collected AFTER a serum tube (red/SST) but BEFORE an EDTA tube?
Heparin tube (green/PST), Sodium Citrate (light blue), Sodium Fluoride (gray), Blood Culture`,

    `question: What is the primary purpose of a thixotropic gel in a collection tube?
To form a physical barrier between cells and serum/plasma, To activate clotting, To prevent glycolysis, To chelate calcium`,

    `question: Which needle gauge number represents the smallest diameter needle?
23, 21, 20, 18`,

    `question: What is the required time for a bleach disinfectant to be effective?
10 minutes, 1 minute, 5 minutes, 30 minutes`,

    `question: What is the term for a fine mist of specimen?
Aerosol, Aliquot, Analyte, Additive`,

    `question: What is the term for a portion of a specimen used for testing?
Aliquot, Aerosol, Centrifuge, Reagent`,

    `question: What is the screening and prioritizing area where specimens are received and prepared for testing called?
Central Processing, Accessioning Area, STAT Zone, Aliquot Station`,

    `question: What machine spins blood tubes at high revolutions per minute?
Centrifuge, Vortexer, Incubator, Spectrophotometer`,

    `question: What does the abbreviation QNS stand for?
Quantity Not Sufficient, Quality Not Suitable, Quick Needle Stick, Quebec Nursing Standard`,

    `question: The time it takes to complete a process, such as testing, is known as?
Turnaround Time (TAT), Processing Time, Accession Time, Result Time`,

    `question: In which phase of the laboratory process do the majority of errors occur?
Preanalytical (pre-examination), Analytical, Post-analytical (post-examination), Reporting`,

    `question: What is the general maximum time limit suggested by labs for separating serum or plasma from cells?
2 hours, 30 minutes, 8 hours, 24 hours`,

    `question: Which type of specimen requires centrifugation without delay after collection?
Plasma (in anticoagulant tubes), Serum (in plain red top), Clotted blood for DNA, Urine for culture`,

    `question: Which specimens should be transported, processed, and tested immediately, taking priority over all others?
STAT or medical emergency specimens, Routine fasting specimens, Timed glucose tolerance tests, Batched chemistry panels`,

    `question: How should blood ammonia specimens be handled after collection?
Placed in an ice slurry and transported immediately, Kept at body temperature (37 C), Protected from light at room temperature, Centrifuged after 30 minutes clotting time`,

    `question: How long are glucose specimens in sodium fluoride tubes generally stable at room temperature?
24 hours, 2 hours, 8 hours, 72 hours`,

    `question: According to CLSI guidelines, serum/plasma aliquots can remain at room temperature for no longer than?
8 hours, 2 hours, 24 hours, 48 hours`,

    `question: According to CLSI guidelines, serum/plasma aliquots can be refrigerated for up to?
48 hours, 8 hours, 24 hours, 7 days`,

    `question: What does the term 'Accession' mean in the context of phlebotomy?
Process of recording in the order received, Gaining entry to the patient's room, Attaching the needle to the holder, Checking the patient's ID band`,

    `question: What does it mean to 'Anchor' a vein?
To secure firmly by pulling skin taut, To locate the vein by palpation, To apply the tourniquet tightly, To mark the vein with ink`,

    `question: What does the abbreviation ASAP mean?
As soon as possible, After specimen arrives promptly, Always sanitize and proceed, Assess site and palpate`,

    `question: The behavior of a healthcare provider toward a patient is known as?
Bedside Manner, Professional Conduct, Patient Interaction, Clinical Demeanor`,

    `question: What does 'Fasting' typically mean for phlebotomy?
No food or drink, except water, for a specified time, No food, including water, for 8 hours, Only clear liquids allowed, No strenuous activity before draw`,

    `question: What is the term for an intense fear of needles?
Trypanophobia, Hemophobia, Aichmophobia, Algophobia`,

    `question: What is a needle sheath?
Needle cap or cover, The hollow bore of the needle, The slanted tip of the needle, The plastic hub`,

    `question: What does 'Palpate' mean?
Examine by feel or touch, Puncture the vein, Cleanse the site, Apply pressure`,

    `question: What is a requisition?
A formal written request for laboratory testing, The patient's identification band, The list of tubes needed, The specimen transport bag`,

    `question: What does STAT mean?
Immediately, Standard Test And Timing, Send To Analytical Testing, Subcutaneous Tissue Access Test`,

    `question: What is legally required before starting a venipuncture?
Obtaining patient's consent/permission, Verifying insurance information, Checking the patient's temperature, Asking about last meal regardless of test`,

    `question: Which action is most critical for patient safety during specimen collection?
Correctly identifying the patient, Using the smallest gauge needle possible, Filling tubes completely, Applying the tourniquet loosely`,

    `question: How should an outpatient typically be identified before blood collection?
Ask patient to state full name and DOB, Ask 'Are you Mrs. Smith?', Check driver's license only, Use name on the appointment sheet`,

    `question: What is the 'three-way ID' for inpatients?
Verbal statement, check ID band, compare labeled tube to ID band, Verbal statement, check room number, ask nurse, Check ID band, check chart, ask relative, Verbal statement, check DOB on chart, ask patient to sign`,

    `question: How long should the antiseptic be allowed to air-dry before venipuncture?
30 seconds to 1 minute, Immediately after wiping, 5 seconds, 2 minutes`,

    `question: Which area is the preferred site for venipuncture in adults?
Antecubital (AC) area, Back of the hand, Wrist (radial side), Ankle veins`,

    `question: Which veins are the first choice for venipuncture?
Median cubital and median veins, Cephalic and median cephalic veins, Basilic and median basilic veins, Dorsal hand veins`,

    `question: Which veins are the last choice due to proximity to nerve and artery?
Basilic and median basilic veins, Median cubital and median veins, Cephalic and median cephalic veins, Thumb side wrist veins`,

    `question: How far above the intended venipuncture site should the tourniquet be applied?
3 to 4 inches, 1 to 2 inches, 5 to 6 inches, Directly over the site`,

    `question: What is the maximum time a tourniquet should be left on the arm?
1 minute (60 seconds), 2 minutes, 3 minutes, 30 seconds`,

    `question: What is the recommended angle of needle insertion for routine AC venipuncture?
30 degrees or less, 45 degrees, 10 degrees or less, Exactly 90 degrees`,

    `question: When should the tourniquet ideally be released?
As soon as blood flows freely into the first tube, After the last tube is filled, Just before removing the needle, After removing the needle`,

    `question: What is the correct action immediately after withdrawing the needle?
Activate the safety feature, Apply the bandage, Label the tubes, Dispose of the needle`,

    `question: How long should firm pressure be applied to the venipuncture site after needle removal?
3 to 5 minutes (or until bleeding stops), 30 seconds, 1 minute, 10 minutes`,

    `question: When must collection tubes be labeled?
Immediately after collection, in the patient's presence, Before entering the patient's room, After returning to the lab, While the last tube is filling`,

    `question: Which information is essential on a specimen label?
Patient's full name, ID number or DOB, date/time of collection, phlebotomist's initials, Patient's room number, diagnosis, physician name, Tube color, volume drawn, lab section, Tube additive, patient's age, insurance number`,

    `question: What is the primary purpose of the order of draw?
To minimize additive carryover/cross-contamination, To ensure tubes fill completely, To speed up the collection process, To match tube color with test type`,

    `question: Which tube or collection is always first in the CLSI order of draw?
Blood cultures (SPS or bottles), Sodium Citrate (light blue), Serum (red/SST), EDTA (lavender)`,

    `question: Which tube is collected second in the order of draw, after blood cultures?
Sodium Citrate (light blue), Serum (red/SST), Heparin (green/PST), EDTA (lavender)`,

    `question: What type of tube is collected third in the order of draw (after light blue)?
Serum tube (red, SST), Heparin tube (green, PST), EDTA tube (lavender), Sodium Fluoride tube (gray)`,

    `question: Which additive is found in light blue top tubes?
Sodium Citrate, EDTA, Heparin, Sodium Fluoride`,

    `question: What type of testing are light blue top tubes primarily used for?
Coagulation, Hematology (CBC), Chemistry electrolytes, Blood bank typing`,

    `question: Which additive is primarily used for hematology tests (like CBC) because it preserves cell morphology?
EDTA (Lavender/Purple top), Heparin (Green top), Sodium Citrate (Light blue top), Sodium Fluoride (Gray top)`,

    `question: Which additive inhibits thrombin formation and is often used for STAT chemistry tests?
Heparin (Green/PST), EDTA (Lavender), Sodium Citrate (Light blue), Potassium Oxalate`,

    `question: Which additive is an antiglycolytic agent?
Sodium Fluoride, EDTA, Heparin, Sodium Citrate`,

    `question: Which additive combination is typically found in gray top tubes?
Sodium Fluoride and Potassium Oxalate, EDTA and Gel, Heparin and Gel, Thrombin`,

    `question: What is the function of silica particles in an SST (serum separator tube)?
Clot activator, Anticoagulant, Antiglycolytic agent, Preservative`,

    `question: What is the function of the thixotropic gel in SST or PST tubes after centrifugation?
Forms a physical barrier between cells and serum/plasma, Prevents glycolysis, Actively binds analytes, Enhances coagulation`,

    `question: When is a winged infusion (butterfly) set most commonly indicated?
Collecting from small or difficult veins (hand, pediatric, elderly), Collecting large volumes quickly, Performing arterial blood gas collection, Drawing blood cultures only`,

    `question: What system uses a multi-sample needle and allows collection into evacuated tubes?
Evacuated Tube System (ETS), Syringe System, Capillary Collection System, Arterial Line System`,

    `question: Which needle gauge represents the largest diameter lumen?
18 gauge, 21 gauge, 23 gauge, 25 gauge`,

    `question: What substance is used to prevent sepsis by inhibiting microbial growth on skin?
Antiseptic, Disinfectant, Sterilant, Antibiotic`,

    `question: What is the most commonly used antiseptic for routine blood collection?
70% isopropyl alcohol, Povidone-iodine, Chlorhexidine gluconate, Hydrogen peroxide`,

    `question: What chemical substances are used to remove or kill microorganisms on surfaces and instruments?
Disinfectants, Antiseptics, Detergents, Solvents`,

    `question: What is the appropriate dilution of household bleach for decontaminating surfaces after cleaning up blood spills?
1:100, 1:10, 1:50, 1:1000`,

    `question: What primary document details the hazards, handling, and emergency procedures for a specific chemical?
Safety Data Sheet (SDS), Chemical Hygiene Plan (CHP), Laboratory Safety Manual, Exposure Control Plan`,

    `question: Which mandated plan includes Safety Data Sheets (SDS) for every hazardous chemical in the lab?
Chemical Hygiene Plan (CHP), Bloodborne Pathogen Exposure Control Plan, Tuberculosis Exposure Control Plan, Ergonomics Program`


    // *** PASTE OR ADD OTHER QUESTIONS HERE ***
];

const quizData = generateQuizHTML(myQuestions);
const quizForm = document.getElementById('quizForm');

// Insert the generated HTML into the designated form element
if (quizForm) {
    quizForm.innerHTML = quizData.html;
} else {
    console.error("CRITICAL: Could not find HTML element with ID 'quizForm'. Quiz cannot be loaded.");
}

const correctAnswers = quizData.answers;


/*
     ============================
    Feedback Handling Script
    ============================ 
*/

if (quizForm) {
  quizForm.addEventListener('change', function(event) {
    if (event.target.type === 'radio') {
      const questionName = event.target.name;
      const selectedValue = event.target.value;
      const questionContainer = document.getElementById(questionName);

      if (!questionContainer) return;

      const feedbackSpans = questionContainer.querySelectorAll('.feedback');

      feedbackSpans.forEach(span => {
        span.textContent = '';
        span.className = 'feedback';
      });

      const selectedLabel = event.target.closest('label');
      if (!selectedLabel) return;
      const feedbackSpan = selectedLabel.querySelector('.feedback');
      if (!feedbackSpan) return;

      if (correctAnswers.hasOwnProperty(questionName) && selectedValue === correctAnswers[questionName]) {
        feedbackSpan.textContent = 'Correct';
        feedbackSpan.className = 'feedback correct';
      } else if (correctAnswers.hasOwnProperty(questionName)) {
        feedbackSpan.textContent = 'Wrong';
        feedbackSpan.className = 'feedback incorrect';
      } else {
          console.warn(`No answer key found for question ${questionName}. Cannot provide feedback.`);
      }
    }
  });
}