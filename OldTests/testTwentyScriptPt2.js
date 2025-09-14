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
  `question: State the structures involved in sperm production and their function. Page 96. Semen is composed of four fractions contributed by the testes epididymis seminal vessels and what else?
    Prostate and Bulbourethral glands, Vas deferens and Urethra, Bladder and Ejaculatory ducts, Scrotum and Penis`,
  `question: State the structures involved in sperm production and their function. Page 96. What percentage of semen is composed of spermatozoa?
    5%, 20-30%, 60-70%, 10%`,
  `question: State the structures involved in sperm production and their function. Page 96. What cells provide support and nutrients for germ cells during spermatogenesis?
    Sertoli cells, Germ cells, Epithelial cells, Leydig cells`,
  `question: State the structures involved in sperm production and their function. Page 96. Where do sperm mature and develop flagella?
    Epididymis, Testes, Vas deferens, Seminiferous tubules`,
  `question: State the structures involved in sperm production and their function. Page 97. The seminal vesicles produce fluid containing a high concentration of flavin and what other substance for sperm metabolism?
    Fructose, Zinc, Citric acid, Acid phosphatase`,
  `question: State the structures involved in sperm production and their function. Page 97. What is responsible for the gray color of semen?
    Flavin, Fructose, Zinc, Spermatozoa`,
  `question: State the structures involved in sperm production and their function. Page 97. The acidic fluid from what gland contains acid phosphatase citric acid zinc and proteolytic enzymes?
    Prostate Gland, Seminal Vesicles, Bulbourethral Glands, Testes`,
  `question: Describe semen specimen collection and handling. Page 98. For fertility testing patients should have a period of sexual abstinence from 2 to 3 days but not longer than how many days?
    5, 7, 10, 14`,
  `question: Describe semen specimen collection and handling. Page 98. Specimens collected from home should be delivered to the lab within what time frame?
    1 hour, 2 hours, 30 minutes, 4 hours`,
  `question: Describe semen specimen collection and handling. Page 98. Specimens collected following prolonged abstinence tend to have decreased motility and what else?
    Higher volumes, Lower volumes, Increased motility, Normal volumes`,
  `question: Describe semen specimen collection and handling. Page 98. For fertility testing how many abnormal samples are considered significant?
    Two, One, Three, Four`,
  `question: Describe the physical and chemical examination of semen. Page 99. What does white turbidity in a semen specimen indicate?
    Presence of WBCs and infection, Presence of RBCs, Urine contamination, Prolonged abstinence`,
  `question: Describe the physical and chemical examination of semen. Page 99. A fresh semen specimen is clotted and should liquefy within what time frame after collection?
    30 to 60 minutes, 10 to 20 minutes, 2 hours, 5 minutes`,
  `question: Describe the physical and chemical examination of semen. Page 99. Failure of liquefaction may be caused by a deficiency in enzymes from what gland?
    Prostatic, Seminal, Bulbourethral, Testicular`,
  `question: Describe the physical and chemical examination of semen. Page 100. What is the normal range for semen volume?
    2 to 5 mL, 1 to 2 mL, 5 to 7 mL, 0.5 to 1 mL`,
  `question: Describe the physical and chemical examination of semen. Page 100. Droplets with threads longer than what length are considered highly viscous?
    2 cm, 1 cm, 4 cm, 0.5 cm`,
  `question: Describe the physical and chemical examination of semen. Page 100. Increased viscosity and incomplete liquefaction can impede what sperm parameter?
    Motility, Morphology, Concentration, Viability`,
  `question: Describe the physical and chemical examination of semen. Page 101. What is the normal pH range of semen?
    7.2 to 8.0, 6.5 to 7.0, 8.0 to 8.5, 6.0 to 6.5`,
  `question: Describe the physical and chemical examination of semen. Page 101. An increased semen pH is indicative of what?
    Infection, Increased prostatic fluid, Urine contamination, Dehydration`,
  `question: Describe the microscopic examination of sperm. Page 102. What is the normal value for sperm concentration?
    20-250 million sperm/mL, 10-20 million sperm/mL, 5-10 million sperm/mL, Over 250 million sperm/mL`,
  `question: Describe the microscopic examination of sperm. Page 102. Total sperm counts greater than what amount per ejaculate are considered normal?
    40 million, 20 million, 60 million, 10 million`,
  `question: Describe the microscopic examination of sperm. Page 102. What is the most commonly used dilution for sperm counts?
    1:20, 1:10, 1:50, 1:100`,
  `question: Describe the microscopic examination of sperm. Page 103. Greater than 1 million WBCs per milliliter is associated with what condition?
    Inflammation or infection, Disruption of spermatogenesis, Normal fertility, Prolonged abstinence`,
  `question: Describe the microscopic examination of sperm. Page 103. The presence of sperm capable of what type of movement is critical for fertility?
    Forward progressive, Circular, Vibrating, Backward`,
  `question: Describe the microscopic examination of sperm. Page 104. A minimum motility of what percentage after 1 hour is considered normal?
    50%, 25%, 75%, 40%`,
  `question: Describe the microscopic examination of sperm. Page 104. What enzyme-containing cap located at the tip of the sperm head is critical to ovum penetration?
    Acrosomal cap, Nuclear cap, Midpiece cap, Tail cap`,
  `question: Describe the microscopic examination of sperm. Page 105. When evaluating sperm morphology at least how many sperm should be evaluated?
    200, 100, 50, 500`,
  `question: Describe methods of additional testing for semen analysis. Page 106. Post vasectomy semen analysis is used to check for the presence or absence of what?
    Spermatozoa, Seminal fluid, Prostatic fluid, Fructose`,
  `question: Describe methods of additional testing for semen analysis. Page 106. Post vasectomy testing begins at 2 months and continues until how many consecutive monthly specimens show no spermatozoa?
    Two, Three, One, Four`,
  `question: Describe methods of additional testing for semen analysis. Page 106. Detection of what substance can aid in determining the presence of semen in cases of alleged rape?
    Prostatic acid phosphatase, Fructose, Zinc, Citric acid`,
  `question: Describe the physiology of synovial fluid and the diseases associated with an abnormal synovial fluid. Page 109. Synovial fluid is found in the cavities of what type of joints?
    Movable (diarthroses), Immovable (synarthroses), Slightly movable (amphiarthroses), Fibrous`,
  `question: Describe the physiology of synovial fluid and the diseases associated with an abnormal synovial fluid. Page 109. What specialized cells in the synovial membrane secrete hyaluronic acid?
    Synoviocytes, Chondrocytes, Osteocytes, Fibroblasts`,
  `question: Describe the physiology of synovial fluid and the diseases associated with an abnormal synovial fluid. Page 110. What substance contributes to the noticeable viscosity of synovial fluid?
    Hyaluronic acid, Albumin, Glucose, Uric acid`,
  `question: Describe the physiology of synovial fluid and the diseases associated with an abnormal synovial fluid. Page 110. Joint disorders are classified as noninflammatory inflammatory septic or what?
    Hemorrhagic, Degenerative, Immunologic, Microbial`,
  `question: Describe the physiology of synovial fluid and the diseases associated with an abnormal synovial fluid. Page 110. Rheumatoid arthritis and lupus erythematosus are examples of what type of joint disorder?
    Inflammatory, Noninflammatory, Septic, Hemorrhagic`,
  `question: Describe the physiology of synovial fluid and the diseases associated with an abnormal synovial fluid. Page 110. Gout and pseudogout are examples of what type of inflammatory disorder?
    Crystal-induced, Immunologic, Microbial, Autoimmune`,
  `question: Describe synovial fluid collection and handling. Page 111. What is the name for the needle aspiration procedure used to collect synovial fluid?
    Arthrocentesis, Lumbar puncture, Thoracentesis, Paracentesis`,
  `question: Describe synovial fluid collection and handling. Page 111. What is the normal amount of fluid in an adult knee cavity?
    Less than 3.5 mL, 5 to 10 mL, 10 to 15 mL, Greater than 25 mL`,
  `question: Describe synovial fluid collection and handling. Page 111. Why should powdered anticoagulants not be used for synovial fluid collection?
    They produce artifacts, They cause clotting, They lyse cells, They alter pH`,
  `question: Describe synovial fluid collection and handling. Page 111. Which tube is required for a glucose analysis of synovial fluid?
    Sodium fluoride, Heparin, EDTA, Non-anticoagulated`,
  `question: Describe the physical and chemical examination synovial fluid. Page 112. Normal viscous synovial fluid resembles what common food item?
    Egg white, Milk, Honey, Water`,
  `question: Describe the physical and chemical examination synovial fluid. Page 112. A greenish tinge in synovial fluid may indicate what?
    Bacterial infection, Inflammation, Hemorrhage, Gout`,
  `question: Describe the physical and chemical examination synovial fluid. Page 112. The string test is used to measure what property of synovial fluid?
    Viscosity, Clarity, Color, Volume`,
  `question: Describe the physical and chemical examination synovial fluid. Page 113. Normal synovial fluid contains less than what amount of protein?
    3 g/dL, 5 g/dL, 1 g/dL, 10 g/dL`,
  `question: Describe the physical and chemical examination synovial fluid. Page 113. A normal synovial fluid glucose should not be more than how much lower than the blood value?
    10 mg/dL, 20 mg/dL, 30 mg/dL, 5 mg/dL`,
  `question: Describe the physical and chemical examination synovial fluid. Page 113. Markedly decreased glucose levels in synovial fluid are seen in inflammatory disorders and what else?
    Septic disorders, Hemorrhagic disorders, Noninflammatory disorders, Gout`,
  `question: Describe the physical and chemical examination synovial fluid. Page 114. According to the reference table what is the normal leukocyte count for synovial fluid?
    < 200 cells/uL, < 1000 cells/uL, < 500 cells/uL, < 2000 cells/uL`,
  `question: Describe the physical and chemical examination synovial fluid. Page 114. According to the reference table neutrophils should account for less than what percentage of the differential?
    25%, 50%, 10%, 75%`,
  `question: Describe the microscopic examination of synovial fluid. Page 115. What is the most frequently performed cell count on synovial fluid?
    Total leukocyte count, Red blood cell count, Neutrophil count, Monocyte count`,
  `question: Describe the microscopic examination of synovial fluid. Page 115. Why should the normal WBC diluting fluid containing acetic acid not be used for synovial fluid counts?
    It causes mucin clots, It lyses WBCs, It precipitates crystals, It alters pH`,
  `question: Describe the microscopic examination of synovial fluid. Page 115. Monocytes macrophages and what other cells are the primary cells seen in normal synovial fluid?
    Synovial tissue cells, Neutrophils, Lymphocytes, Eosinophils`,
  `question: Describe the microscopic examination of synovial fluid. Page 116. Gout is caused by the excess accumulation of what type of crystals in the joints?
    Monosodium urate, Calcium pyrophosphate, Cholesterol, Calcium oxalate`,
  `question: Describe the microscopic examination of synovial fluid. Page 117. What are the primary crystals seen in cases of pseudogout?
    Calcium pyrophosphate, Monosodium urate, Hydroxyapatite, Corticosteroids`,
  `question: Describe the microscopic examination of synovial fluid. Page 118. Monosodium urate MSU crystals are routinely seen as what shape?
    Needle-shaped, Rhombic-shaped, Square, Envelope-shaped`,
  `question: Describe the microscopic examination of synovial fluid. Page 118. Calcium pyrophosphate CPPD crystals usually appear as short rods or what other shape?
    Rhombic-shaped, Needle-shaped, Hexagonal, Coffin lid`,
  `question: Describe the microscopic examination of synovial fluid. Page 118. Positive identification of crystals is made using direct polarization and what other microscopy technique?
    Compensated polarized light, Phase-contrast, Dark-field, Bright-field`,
  `question: Describe additional test procedures in synovial fluid analysis. Page 119. What are the two most important microbiologic tests performed on synovial fluid?
    Gram stains and cultures, Acid-fast stains and wet preps, Serology and PCR, Antigen tests and antibody tests`,
  `question: Describe additional test procedures in synovial fluid analysis. Page 119. The common organisms that cause septic arthritis include Streptococcus Haemophilus species and what else?
    Staphylococcus, E. coli, Pseudomonas, Klebsiella`,
  `question: Describe additional test procedures in synovial fluid analysis. Page 119. Arthritis is a frequent complication of what tick-borne illness?
    Lyme disease, Rocky Mountain spotted fever, Ehrlichiosis, Babesiosis`
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