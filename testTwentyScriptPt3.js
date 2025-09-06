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
  `question: Describe the formation of serous fluid. Page 122. What is the name of the membrane that lines the cavity wall?
    Parietal membrane, Visceral membrane, Serous membrane, Pleural membrane`,
  `question: Describe the formation of serous fluid. Page 122. What is the name of the membrane that covers the organs within a cavity?
    Visceral membrane, Parietal membrane, Peritoneal membrane, Pericardial membrane`,
  `question: Describe the formation of serous fluid. Page 122. What is the primary function of serous fluid?
    Lubrication, Nutrient supply, Waste removal, Oxygen transport`,
  `question: Describe the formation of serous fluid. Page 123. Serous fluids are formed as ultrafiltrates of what?
    Plasma, Lymph, Cytoplasm, Interstitial fluid`,
  `question: Describe the formation of serous fluid. Page 123. An increase in fluid between the serous membranes is termed what?
    Effusion, Edema, Ascites, Hydrops`,
  `question: Describe the formation of serous fluid. Page 123. Increased hydrostatic pressure a cause of effusion is commonly associated with what condition?
    Congestive heart failure, Hypoproteinemia, Tumors, Inflammation`,
  `question: Describe the formation of serous fluid. Page 123. Decreased oncotic pressure a cause of effusion is associated with what condition?
    Hypoproteinemia, Congestive heart failure, Infection, Tumors`,
  `question: Describe the formation of serous fluid. Page 123. Lymphatic obstruction a cause of effusion is commonly associated with what?
    Tumors, Infection, Inflammation, Hypoproteinemia`,
  `question: Describe the formation of serous fluid. Page 123. Effusions formed because of a systemic disorder that disrupts fluid balance are called what?
    Transudates, Exudates, Ascites, Edema`,
  `question: Describe the formation of serous fluid. Page 123. Effusions produced by conditions that directly involve the membranes of a cavity are called what?
    Exudates, Transudates, Lymphedema, Cysts`,
  `question: Describe serous fluid collection and handling. Page 124. What is the name of the procedure used to collect pleural fluid?
    Thoracentesis, Pericardiocentesis, Paracentesis, Arthrocentesis`,
  `question: Describe serous fluid collection and handling. Page 124. What is the name of the procedure used to collect peritoneal fluid?
    Paracentesis, Thoracentesis, Pericardiocentesis, Culdocentesis`,
  `question: Describe serous fluid collection and handling. Page 124. Which collection tube is used for cell counts and the differential in serous fluid?
    EDTA, Sterile heparinized, Plain, Sodium fluoride`,
  `question: Describe serous fluid collection and handling. Page 124. Which collection tubes are used for microbiology and cytology of serous fluid?
    Sterile heparinized, EDTA, Plain, Sodium citrate`,
  `question: Describe serous fluid collection and handling. Page 124. Specimens for what test must be maintained anaerobically in ice?
    pH, Glucose, Protein, Cell count`,
  `question: Describe the different types of serous fluids to including the examination used to differentiate the various types. Page 125. Normal and transudate pleural fluids appear clear and what color?
    Pale yellow, Deep yellow, Colorless, White`,
  `question: Describe the different types of serous fluids to including the examination used to differentiate the various types. Page 125. Turbidity in pleural fluid is usually related to the presence of what?
    WBCs, RBCs, Lipids, Crystals`,
  `question: Describe the different types of serous fluids to including the examination used to differentiate the various types. Page 125. A pleural fluid hematocrit that is more than 50% of the whole blood hematocrit indicates what condition?
    Hemothorax, Traumatic tap, Chronic effusion, Malignancy`,
  `question: Describe the different types of serous fluids to including the examination used to differentiate the various types. Page 125. A milky pleural fluid due to thoracic duct leakage is known as what?
    Chylous, Pseudochylous, Lipemic, Purulent`,
  `question: Describe the different types of serous fluids to including the examination used to differentiate the various types. Page 125. Chylous material contains a high concentration of what?
    Triglycerides, Cholesterol, Protein, Glucose`,
  `question: Describe the different types of serous fluids to including the examination used to differentiate the various types. Page 125. Pseudochylous material produced in chronic inflammatory conditions has a higher concentration of what?
    Cholesterol, Triglycerides, WBCs, RBCs`,
  `question: Describe the different types of serous fluids to including the examination used to differentiate the various types. Page 126. What is the most diagnostically significant hematology test performed on serous fluids?
    Differential cell count, Total WBC count, Total RBC count, Hematocrit`,
  `question: Describe the different types of serous fluids to including the examination used to differentiate the various types. Page 126. A decrease or lack of mesothelial cells in pleural fluid is associated with what condition?
    Tuberculosis, Pancreatitis, Viral Infection, Malignancy`,
  `question: Describe the different types of serous fluids to including the examination used to differentiate the various types. Page 126. Malignant pleural effusions most frequently contain large irregular cells from what type of cancer?
    Adenocarcinoma, Small-cell carcinoma, Metastatic breast carcinoma, Lymphoma`,
  `question: Describe the different types of serous fluids to including the examination used to differentiate the various types. Page 127. An elevated triglyceride level in pleural fluid indicates what type of effusion?
    Chylous, Pseudochylous, Hemorrhagic, Bacterial`,
  `question: Describe the different types of serous fluids to including the examination used to differentiate the various types. Page 127. A decreased glucose level in pleural fluid is seen in purulent infections and what other condition?
    Rheumatoid inflammation, Pancreatitis, Malignancy, Tuberculosis`,
  `question: Describe the different types of serous fluids to including the examination used to differentiate the various types. Page 127. An elevated adenosine deaminase (ADA) level in pleural fluid is seen in malignancy and what other condition?
    Tuberculosis, Pancreatitis, Bacterial infection, Viral infection`,
  `question: Describe the different types of serous fluids to including the examination used to differentiate the various types. Page 127. An elevated amylase level in pleural fluid can indicate malignancy esophageal rupture or what else?
    Pancreatitis, Tuberculosis, Pneumonia, Rheumatoid inflammation`,
  `question: Describe the different types of serous fluids to including the examination used to differentiate the various types. Page 127. A markedly decreased pleural fluid pH of less than 6.0 suggests what?
    Esophageal rupture, Pneumonia, Tuberculosis, Pancreatitis`,
  `question: Describe the different types of serous fluids to including the examination used to differentiate the various types. Page 127. A fluid-to-serum protein ratio greater than 0.5 helps to classify an effusion as what?
    Exudate, Transudate, Chylous, Hemorrhagic`,
  `question: Describe the different types of serous fluids to including the examination used to differentiate the various types. Page 128. What is the normal amount of pericardial fluid found between the serous membranes?
    10 to 50 mL, Less than 10 mL, 50 to 100 mL, Over 100 mL`,
  `question: Describe the different types of serous fluids to including the examination used to differentiate the various types. Page 128. The presence of a pericardial effusion is often suspected when what condition is noted during an examination?
    Cardiac compression (tamponade), Heart murmur, Arrhythmia, Hypertension`,
  `question: Describe the different types of serous fluids to including the examination used to differentiate the various types. Page 128. Pericardial exudates are primarily the result of infection trauma or what else?
    Malignancy, Hypothyroidism, Uremia, Autoimmune disorders`,
  `question: Describe the different types of serous fluids to including the examination used to differentiate the various types. Page 128. Uremia hypothyroidism and autoimmune disorders can cause what type of pericardial effusion?
    Transudates, Exudates, Chylous, Hemorrhagic`,
  `question: Describe the different types of serous fluids to including the examination used to differentiate the various types. Page 128. A pericardial WBC count greater than 1000 cells/uL with a high percentage of neutrophils can indicate what?
    Bacterial endocarditis, Viral pericarditis, Malignancy, Tuberculosis`,
  `question: Describe the different types of serous fluids to including the examination used to differentiate the various types. Page 128. Malignant cells most frequently encountered in pericardial fluid are the result of metastatic breast or what other type of carcinoma?
    Lung, Colon, Liver, Stomach`,
  `question: Describe the different types of serous fluids to including the examination used to differentiate the various types. Page 129. The accumulation of fluid in the peritoneal cavity is called what?
    Ascites, Effusion, Edema, Lavage`,
  `question: Describe the different types of serous fluids to including the examination used to differentiate the various types. Page 129. Peritoneal exudates are often produced by bacterial infections (peritonitis) as a result of a ruptured appendix or what?
    Intestinal perforation, Cirrhosis, Pancreatitis, Nephrotic syndrome`,
  `question: Describe the different types of serous fluids to including the examination used to differentiate the various types. Page 129. Peritoneal transudates are most commonly produced by what type of disorder?
    Hepatic, Cardiac, Renal, Autoimmune`,
  `question: Describe the different types of serous fluids to including the examination used to differentiate the various types. Page 129. What sensitive test is used for the detection of intra-abdominal bleeding in blunt trauma cases?
    Peritoneal lavage, Paracentesis, CT scan, Ultrasound`,
  `question: Describe the different types of serous fluids to including the examination used to differentiate the various types. Page 129. In a peritoneal lavage an RBC count greater than what is indicative of blunt trauma injuries?
    100,000/uL, 50,000/uL, 10,000/uL, 1,000/uL`,
  `question: Describe the different types of serous fluids to including the examination used to differentiate the various types. Page 130. What calculation provides the best differentiation between ascitic fluid transudates and exudates?
    Serum-ascites albumin gradient (SAAG), Fluid-to-serum protein ratio, Fluid-to-serum LD ratio, Total protein measurement`,
  `question: Describe the different types of serous fluids to including the examination used to differentiate the various types. Page 130. A SAAG result greater than 1.1 suggests what type of effusion?
    Transudate of hepatic origin, Exudate, Transudate of cardiac origin, Malignant effusion`,
  `question: Describe the different types of serous fluids to including the examination used to differentiate the various types. Page 130. A SAAG result less than 1.1 suggests what type of effusion?
    Exudate, Transudate, Chylous effusion, Hepatic effusion`,
  `question: Describe the different types of serous fluids to including the examination used to differentiate the various types. Page 130. A green-brown color in peritoneal fluid is associated with the presence of what?
    Bile, Blood, Bacteria, Lipids`,
  `question: Describe the different types of serous fluids to including the examination used to differentiate the various types. Page 130. A milky appearance in peritoneal fluid can be caused by lymphatic vessel blockage or what else?
    Trauma, Infection, Bile leakage, Malignancy`,
  `question: Describe the formation of serous fluid. Page 122. Which cavity is NOT lined by a serous membrane?
    Cranial, Pleural, Pericardial, Peritoneal`,
  `question: Describe the formation of serous fluid. Page 123. Which pressure is primarily responsible for causing fluid to enter the space between the serous membranes?
    Hydrostatic pressure, Oncotic pressure, Osmotic pressure, Atmospheric pressure`,
  `question: Describe serous fluid collection and handling. Page 124. What is the procedure to collect pericardial fluid called?
    Pericardiocentesis, Thoracentesis, Paracentesis, Arthrocentesis`,
  `question: Describe the different types of serous fluids to including the examination used to differentiate the various types. Page 125. In pleural fluid what cells are significant for Tuberculosis and malignancy?
    Lymphocytes, Neutrophils, Eosinophils, Mesothelial Cells`,
  `question: Describe the different types of serous fluids to including the examination used to differentiate the various types. Page 126. What cells have pleomorphic abundant blue cytoplasm and round nuclei?
    Mesothelial cells, Lymphocytes, Neutrophils, Plasma cells`,
  `question: Describe the different types of serous fluids to including the examination used to differentiate the various types. Page 127. A fluid-to-serum LD ratio greater than 0.6 helps to classify an effusion as what?
    Exudate, Transudate, Normal fluid, Hemorrhagic`,
  `question: Describe the different types of serous fluids to including the examination used to differentiate the various types. Page 128. What is the significance of a turbid blood-streaked pericardial fluid?
    Infection or Malignancy, Normal, Cardiac Puncture, Chylous material`,
  `question: Describe the different types of serous fluids to including the examination used to differentiate the various types. Page 128. What test is particularly important for pericardial fluid analysis when endocarditis is suspected?
    Bacterial cultures and Gram stains, WBC count, Differential, Protein ratio`,
  `question: Describe the different types of serous fluids to including the examination used to differentiate the various types. Page 129. Peritoneal transudates are most often caused by what specific hepatic disorder?
    Cirrhosis, Hepatitis, Liver cancer, Bile duct obstruction`,
  `question: Describe the different types of serous fluids to including the examination used to differentiate the various types. Page 130. How is the serum-ascites albumin gradient (SAAG) calculated?
    Serum albumin - fluid albumin, Fluid albumin - serum albumin, Serum albumin / fluid albumin, Fluid albumin / serum albumin`,
  `question: Describe the different types of serous fluids to including the examination used to differentiate the various types. Page 126. In pleural fluid increased eosinophils can be seen in parasitic infections allergic reactions and what else?
    Trauma, Tuberculosis, Viral infection, Malignancy`,
  `question: Describe the different types of serous fluids to including the examination used to differentiate the various types. Page 126. An increased number of plasma cells in pleural fluid is associated with what?
    Tuberculosis, Pancreatitis, Viral Infection, Trauma`,
  `question: Describe the different types of serous fluids to including the examination used to differentiate the various types. Page 125. How does blood from a traumatic tap appear in pleural fluid?
    Streaked and uneven, Uniformly bloody, Clotted, Dark brown`,
  `question: Describe the different types of serous fluids to including the examination used to differentiate the various types. Page 127. An elevated lactate level in pleural fluid is associated with what?
    Bacterial infection, Viral infection, Malignancy, Pancreatitis`
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