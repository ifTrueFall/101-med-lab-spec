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

//  DEFINE YOUR QUESTIONS HERE
//  The first line contains the full question.
//  The second line contains the correct answer followed by three wrong answers.
const myQuestions = [
  `question: Describe a modern blood bank laboratory. A blood bank laboratory is defined as a facility involved in the collection storage processing and what of human blood and blood products for transfusion? Page 203.
Distribution, Manufacturing, Analysis, Research`,
  `question: Describe a modern blood bank laboratory. Blood banks that depend on an outside source for their blood supplies usually receive their products in what form? Page 204.
Component form, Whole blood form, Frozen form, Irradiated form`,
  `question: State the governing agencies that regulate the blood bank laboratory. Which agency is the primary regulating agency for blood banks in the United States? Page 209.
Food and Drug Administration, American Association of Blood Banks, College of American Pathologists, Center for Biologics Evaluation and Research`,
  `question: State the governing agencies that regulate the blood bank laboratory. Which organization is the primary accrediting organization for blood banks? Page 209.
American Association of Blood Banks, Food and Drug Administration, The Joint Commission, College of American Pathologists`,
  `question: Describe the Armed Services Blood Program. The ASBP is a joint operation among which military services? Page 209.
Army Navy Air Force, Army Navy Marines, Army Air Force Coast Guard, Army Navy Space Force`,
  `question: Describe the Armed Services Blood Program. During World War II only what type of blood was sent into combat zones since it could be given to anyone? Page 210.
Type O negative, Type O positive, Type AB negative, Type A positive`,
  `question: Describe the process of requesting blood products through the Armed Services Blood Program (ASBP). Which report is submitted daily to the Blood Supply Unit (BSU) and contains the current blood inventory? Page 211.
Blood Report (BLDREP), Blood Shipment Report (BLDSHIPREP), Inventory Status Report (ISREP), Daily Supply Request (DSR)`,
  `question: Describe the process of requesting blood products through the Armed Services Blood Program (ASBP). Which report provides information on the receiver of the blood products and the arrival schedule? Page 212.
Blood Shipment Report (BLDSHIPREP), Blood Report (BLDREP), Transfer Manifest (TRANMAN), Logistics Report (LOGREP)`,
  `question: State the criteria for allogeneic autologous and pheresis donation to include the preparation of a blood donor site. What is the definition of an allogeneic donor? Page 213.
One who donates blood for use by others, One who donates blood for their own use, One who donates for a specific patient, One who receives a blood transfusion`,
  `question: State the criteria for allogeneic autologous and pheresis donation to include the preparation of a blood donor site. What is the definition of an autologous donor? Page 213.
One who donates blood for their own use, One who donates blood for use by others, One who is paid for donation, One who donates only plasma`,
  `question: State the criteria for allogeneic autologous and pheresis donation to include the preparation of a blood donor site. What is the minimum age for an allogeneic blood donor in most states? Page 214.
17 years old, 16 years old, 18 years old, 21 years old`,
  `question: State the criteria for allogeneic autologous and pheresis donation to include the preparation of a blood donor site. A donation of approximately 450 mL of whole blood requires the donor to weigh a minimum of how much? Page 217.
110 lbs, 100 lbs, 120 lbs, 150 lbs`,
  `question: State the criteria for allogeneic autologous and pheresis donation to include the preparation of a blood donor site. A potential donor's temperature must not exceed what? Page 217.
99.5 F, 98.6 F, 100.4 F, 99.0 F`,
  `question: State the criteria for allogeneic autologous and pheresis donation to include the preparation of a blood donor site. What is the acceptable pulse range for a blood donor? Page 217.
50-100 bpm, 60-120 bpm, 40-80 bpm, 70-110 bpm`,
  `question: State the criteria for allogeneic autologous and pheresis donation to include the preparation of a blood donor site. A donor's systolic blood pressure must be less than or equal to what? Page 217.
180 mm Hg, 160 mm Hg, 140 mm Hg, 200 mm Hg`,
  `question: State the criteria for allogeneic autologous and pheresis donation to include the preparation of a blood donor site. What is the minimum hemoglobin level for an allogeneic donor? Page 217.
12.5 g/dL, 11.0 g/dL, 13.0 g/dL, 10.5 g/dL`,
  `question: State the criteria for allogeneic autologous and pheresis donation to include the preparation of a blood donor site. What is the minimum hemoglobin level for an autologous donor? Page 217.
11.0 g/dL, 12.5 g/dL, 10.0 g/dL, 13.0 g/dL`,
  `question: Differentiate between acceptable donation and temporary or permanent deferral. What is the required time interval between allogeneic whole blood donations? Page 218.
8 weeks, 6 weeks, 12 weeks, 4 weeks`,
  `question: Differentiate between acceptable donation and temporary or permanent deferral. A donor who has received a live attenuated vaccine for measles mumps or polio has what deferral period? Page 219.
2-week deferral, 4-week deferral, 1-year deferral, No deferral`,
  `question: Differentiate between acceptable donation and temporary or permanent deferral. A donor who has received a live attenuated vaccine for German measles (Rubella) has what deferral period? Page 219.
4-week deferral, 2-week deferral, 1-year deferral, No deferral`,
  `question: Differentiate between acceptable donation and temporary or permanent deferral. Persons who have traveled to areas endemic for malaria have what deferral period upon return? Page 219.
1-year deferral, 3-year deferral, 6-month deferral, Permanent deferral`,
  `question: Differentiate between acceptable donation and temporary or permanent deferral. Donors who have received a blood transfusion or tissue transplant should be deferred for how long? Page 219.
12 months, 6 months, 3 months, permanently`,
  `question: Differentiate between acceptable donation and temporary or permanent deferral. A pregnancy in the past 6 weeks is a cause for what? Page 220.
Temporary deferral, Permanent deferral, Acceptable donation, Indefinite deferral`,
  `question: Differentiate between acceptable donation and temporary or permanent deferral. A history of hepatitis after which birthday is a cause for permanent deferral? Page 220.
11th birthday, 16th birthday, 18th birthday, 21st birthday`,
  `question: Differentiate between acceptable donation and temporary or permanent deferral. A donor who spent 6 months or more in the UK from 1980-1996 is deferred for how long? Page 221.
Indefinitely, 1 year, 5 years, Permanently`,
  `question: Differentiate the types of autologous donations. The last preoperative blood collection should occur no sooner than how many hours before the scheduled surgery? Page 222.
72 hours, 24 hours, 48 hours, 96 hours`,
  `question: Differentiate the types of autologous donations. What is the minimum hemoglobin required for a preoperative autologous donation? Page 222.
11 g/dL, 12.5 g/dL, 10 g/dL, 13 g/dL`,
  `question: Differentiate the types of autologous donations. What color tag is used to label autologous blood units? Page 222.
Green, Yellow, Red, Blue`,
  `question: Define apheresis and the various types of apheresis procedures. What is the general term for a procedure used to collect specific blood components while returning the rest to the donor? Page 223.
Apheresis, Hemodilution, Plasmapheresis, Phlebotomy`,
  `question: Define apheresis and the various types of apheresis procedures. A single plateletpheresis product is equivalent to how many random donor platelets? Page 223.
6 to 8, 2 to 4, 10 to 12, 1 to 2`,
  `question: Define apheresis and the various types of apheresis procedures. Donors are deferred for how long following a double RBC pheresis procedure? Page 224.
16 weeks, 8 weeks, 12 weeks, 24 weeks`,
  `question: Discuss the use of membrane technology in the separation of blood components. Apheresis employs an automated cell separator that uses what force to separate blood components based on density? Page 224.
Centrifugal force, Gravitational force, Magnetic force, Osmotic pressure`,
  `question: Identify the factors that can be removed by plasmapheresis. Which of these is a factor manufactured from plasma collected by plasmapheresis? Page 225.
Factor VIII concentrate, Red blood cells, Platelets, White blood cells`,
  `question: Discuss the possible adverse effects of apheresis. What is a common adverse effect in apheresis procedures due to the anticoagulant used? Page 225.
Citrate toxicity, Hypovolemia, Hemolysis, Air embolus`,
  `question: Describe the procedure for a whole blood collection. During aseptic preparation of the venipuncture site the area should be scrubbed for a minimum of how long? Page 226.
30 seconds, 15 seconds, 60 seconds, 5 seconds`,
  `question: Differentiate among mild moderate and severe donor reactions including recommended treatments for each. For a mild reaction such as fainting what is the first step a phlebotomist should take? Page 227.
Remove tourniquet and withdraw needle, Administer oxygen, Call a physician, Offer juice or water`,
  `question: Differentiate among mild moderate and severe donor reactions including recommended treatments for each. A localized collection of extravasated blood under the skin resulting in a bluish discoloration is called what? Page 228.
Hematoma, Syncope, Phlebitis, Hemolysis`,
  `question: Describe the approved anticoagulant-preservative solutions. What is the primary goal of red blood cell preservation? Page 228.
Provide viable and functional blood components, Maximize plasma yield, Minimize storage costs, Extend donor eligibility`,
  `question: Describe the approved anticoagulant-preservative solutions. FDA requirements state that what percentage of transfused RBCs must survive after 24 hours post-transfusion? Page 229.
75%, 50%, 90%, 65%`,
  `question: Describe the approved anticoagulant-preservative solutions. Which anticoagulant-preservative solution extends the storage time of red blood cells to 35 days? Page 229.
CPDA-1, ACD, CPD, CP2D`,
  `question: Describe the approved anticoagulant-preservative solutions. Additive solutions such as Adsol (AS-1) extend the shelf-life of packed RBCs to how many days? Page 229.
42 days, 35 days, 21 days, 56 days`,
  `question: Relate the volume of the anticoagulant-preservative solution to the size of the blood collection system. A 450-mL blood collection bag requires how much additive solution? Page 230.
100 mL, 110 mL, 50 mL, 75 mL`,
  `question: Describe the tests required for all allogeneic autologous and pheresis donation. If initial Rh testing on a donor is negative what additional test must be performed? Page 230.
Weak D test, Antibody screen, Direct antiglobulin test, Elution`,
  `question: Describe the tests required for all allogeneic autologous and pheresis donation. All donor units must be screened for the presence of HIV-1/2 antibody using what FDA-approved method? Page 231.
Enzyme-linked immunosorbent assay (ELISA), Western blot, Polymerase chain reaction (PCR), Rapid plasma reagin (RPR)`,
  `question: Discuss the labeling criteria for a unit of allogeneic and autologous blood. The unique ISBT donation number consists of how many characters? Page 232.
14, 12, 10, 16`,
  `question: Discuss the labeling criteria for a unit of allogeneic and autologous blood. What is the maximum number of unique identifiers that can be affixed to a single blood unit? Page 232.
Two, One, Three, Four`,
  `question: Describe the storage conditions shelf life quality control requirements and indications for RBC platelet plasma and factor concentrate products. What is the expiration time for RBC Aliquots? Page 233.
24 hours, 48 hours, 5 days, 42 days`,
  `question: Describe the storage conditions shelf life quality control requirements and indications for RBC platelet plasma and factor concentrate products. What is the shelf life of Red Blood Cells Irradiated? Page 234.
28 days, 14 days, 42 days, 5 days`,
  `question: Describe the storage conditions shelf life quality control requirements and indications for RBC platelet plasma and factor concentrate products. Platelets must be stored at what temperature with continuous agitation? Page 235.
20-24 C, 1-6 C, -18 C, 37 C`,
  `question: Describe the storage conditions shelf life quality control requirements and indications for RBC platelet plasma and factor concentrate products. Fresh Frozen Plasma (FFP) can be stored at -18°C for how long? Page 235.
1 year, 7 years, 6 months, 5 years`,
  `question: Describe the storage conditions shelf life quality control requirements and indications for RBC platelet plasma and factor concentrate products. Once cryoprecipitate is thawed what is the proper storage temperature? Page 236.
Room temperature (22-24 C), 1-6 C, -18 C, 37 C`,
  `question: Describe concepts regarding freezing and rejuvenation of red cells. When properly frozen with glycerol Red Blood Cells can be stored for up to how many years? Page 238.
10 years, 5 years, 20 years, 1 year`,
  `question: Describe concepts regarding freezing and rejuvenation of red cells. The high glycerol method which is most widely used requires a freezer capable of maintaining what temperature? Page 239.
-80 C, -20 C, -120 C, -40 C`,
  `question: Describe concepts regarding freezing and rejuvenation of red cells. Once RBCs have been thawed and deglycerolized they have an expiration time of how long? Page 239.
24 hours, 48 hours, 72 hours, 7 days`,
  `question: Discuss the importance of the Military Frozen Blood Program. The purpose of the Military Frozen Blood Program is to provide long-term storage of blood which allows for what? Page 240.
Stock piling, Decreased cost, Reduced testing, Faster transfusions`,
  `question: List the advantages and disadvantages of RBC glycerolization. What is a primary advantage of freezing RBCs? Page 241.
Long-term storage (10 years), Lower cost of product, Simple process, Shorter transfusion time`,
  `question: List the advantages and disadvantages of RBC glycerolization. What is a primary disadvantage of freezing RBCs? Page 241.
Higher cost of equipment and materials, Short-term storage, Reduced RBC viability, Increased plasma proteins`,
  `question: List the shipping requirements for blood bank components. When shipping non-frozen blood and blood components the temperature must be maintained between what range? Page 241.
1-10 C, 20-24 C, -18 C or colder, 0-4 C`,
  `question: Outline the steps in the final disposition of blood and blood components. Upon receipt blood products that do not comply with the facility's policies should be what? Page 242.
Quarantined, Immediately destroyed, Returned to sender, Released to inventory`,
  `question: Describe the process in returning blood products to the blood bank inventory. A blood unit that has been spiked for transfusion must be infused within how many hours or it must be discarded? Page 243.
4 hours, 2 hours, 6 hours, 24 hours`
];

const quizData = generateQuizHTML(myQuestions);
const quizForm = document.getElementById('quizForm');

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