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
  `question: Describe acid-base homeostasis in the body. Page 243. What is a substance which releases hydrogen ions (H+) when dissolved in water called?
An acid, A base, A buffer, A salt`,
  `question: Describe acid-base homeostasis in the body. Page 243. What is a substance that accepts hydrogen ions (H+) called?
A base, An acid, A salt, An element`,
  `question: Describe acid-base homeostasis in the body. Page 243. What is a system that minimizes changes in pH by 'mopping up' hydrogen ions called?
A buffer, An acid, A base, A catalyst`,
  `question: Describe acid-base homeostasis in the body. Page 244. A pH below the reference range of 7.35 is referred to as what condition?
Acidosis, Alkalosis, Homeostasis, Neutrality`,
  `question: Describe acid-base homeostasis in the body. Page 244. A pH above the reference range of 7.45 is referred to as what condition?
Alkalosis, Acidosis, Homeostasis, Neutrality`,
  `question: Describe acid-base homeostasis in a body. Page 244. The body controls and excretes H+ in order to maintain what?
pH homeostasis, Blood glucose, Oxygen saturation, Body temperature`,
  `question: Describe acid-base homeostasis in the body. Page 245. What is the most important buffer of the plasma?
The bicarbonate-carbonic acid pair, The phosphate buffer system, The hemoglobin buffer system, The protein buffer system`,
  `question: Describe acid-base homeostasis in the body. Page 245. Which organ system controls carbonic acid levels by the expiration of CO2?
The lungs, The kidneys, The liver, The pancreas`,
  `question: Describe acid-base homeostasis in the body. Page 246. What is the major buffer system inside the red blood cells?
Hemoglobin, Bicarbonate, Phosphate, Albumin`,
  `question: Describe acid-base homeostasis in the body. Page 246. What is an important buffer in the urine?
Phosphate, Hemoglobin, Albumin, Bicarbonate`,
  `question: Describe acid-base homeostasis in the body. Page 252. What is the kidney's main role in maintaining acid-base homeostasis?
To reabsorb bicarbonate, To excrete bicarbonate, To produce acids, To filter proteins`,
  `question: Describe acid-base homeostasis in the body. Page 254. In the tubule cells which ions compete with H+ to exchange with Na+?
Potassium ions (K+), Chloride ions (Cl-), Calcium ions (Ca2+), Magnesium ions (Mg2+)`,
  `question: Describe the roles of oxygen carbon dioxide and bicarbonate in blood circulation. Page 233. For adequate tissue oxygenation which of the following conditions is necessary?
Adequate ventilation, Low atmospheric oxygen, Insufficient hemoglobin, Blocked gas exchange`,
  `question: Describe the roles of oxygen carbon dioxide and bicarbonate in blood circulation. Page 238. Most O2 in arterial blood is transported to the tissue cells by what?
Hemoglobin, Plasma, Albumin, Bicarbonate`,
  `question: Describe the roles of oxygen carbon dioxide and bicarbonate in blood circulation. Page 238. Each adult hemoglobin molecule can combine reversibly with up to how many molecules of O2?
Four, Two, Six, One`,
  `question: Describe the roles of oxygen carbon dioxide and bicarbonate in blood circulation. Page 238. What byproduct of glycolysis facilitates the release of O2 into the tissue?
2,3-diphosphoglycerate (2,3-DPG), Lactic acid, Pyruvate, Acetyl-CoA`,
  `question: Describe the roles of oxygen carbon dioxide and bicarbonate in blood circulation. Page 241. What does a right shift in the hemoglobin-oxygen dissociation curve indicate?
Decreased affinity for O2, Increased affinity for O2, No change in O2 affinity, Binding of CO`,
  `question: Describe the roles of oxygen carbon dioxide and bicarbonate in blood circulation. Page 242. What does a left shift in the hemoglobin-oxygen dissociation curve indicate?
Increased affinity for O2, Decreased affinity for O2, No change in O2 affinity, Increased temperature`,
  `question: Describe the roles of oxygen carbon dioxide and bicarbonate in blood circulation. Page 242. What is a cause of a left shift in the oxygen dissociation curve?
Increased pH, Decreased pH, Increased body temperature, Elevated 2,3-DPG`,
  `question: Describe the roles of oxygen carbon dioxide and bicarbonate in blood circulation. Page 242. What is a cause of a right shift in the oxygen dissociation curve?
Decreased pH, Increased pH, Decreased body temperature, Reduced pCO2 levels`,
  `question: Describe the roles of oxygen carbon dioxide and bicarbonate in blood circulation. Page 247. Most of the CO2 produced in the tissues is transported to the lungs in what form?
Bicarbonate (HCO3-) in the plasma, Dissolved CO2 in plasma, Carbamino compounds, Carbonic acid in RBCs`,
  `question: Describe the roles of oxygen carbon dioxide and bicarbonate in blood circulation. Page 240. Hemoglobin that is unable to bind O2 because its iron is in an oxidized (Fe3+) state is called what?
Methemoglobin, Carboxyhemoglobin, Oxyhemoglobin, Deoxyhemoglobin`,
  `question: Describe the roles of oxygen carbon dioxide and bicarbonate in blood circulation. Page 240. What is the term for hemoglobin bound to carbon monoxide?
Carboxyhemoglobin, Methemoglobin, Oxyhemoglobin, Deoxyhemoglobin`,
  `question: Describe the roles of oxygen carbon dioxide and bicarbonate in blood circulation. Page 240. The bond between carbon monoxide and hemoglobin is how many times as strong as the bond between O2 and hemoglobin?
200 times, 100 times, 50 times, 10 times`,
  `question: Describe causes of disturbances in acid-base balance. Page 257. In the Henderson-Hasselbalch equation which organ system mainly controls the bicarbonate concentration?
The kidneys, The lungs, The liver, The heart`,
  `question: Describe causes of disturbances in acid-base balance. Page 257. In the Henderson-Hasselbalch equation which organ system participates rapidly in pH regulation by retaining or eliminating CO2?
The lungs, The kidneys, The pancreas, The spleen`,
  `question: Describe causes of disturbances in acid-base balance. Page 259. A disorder caused by a change in the pCO2 is termed what?
Primary respiratory acidosis or alkalosis, Primary metabolic acidosis or alkalosis, Compensated acidosis, Uncompensated alkalosis`,
  `question: Describe causes of disturbances in acid-base balance. Page 259. A disorder resulting from a change in the bicarbonate level is termed what?
Primary metabolic acidosis or alkalosis, Primary respiratory acidosis or alkalosis, Compensated alkalosis, Uncompensated acidosis`,
  `question: Describe causes of disturbances in acid-base balance. Page 259. When the body tries to restore acid-base homeostasis by altering the factor not primarily affected this action is termed what?
Compensation, Correction, Pathophysiology, Homeostasis`,
  `question: Describe causes of disturbances in acid-base balance. Page 259. For a metabolic imbalance how does the body compensate?
By altering ventilation, By altering renal function, By increasing acid production, By decreasing buffer systems`,
  `question: Describe causes of disturbances in acid-base balance. Page 259. For a respiratory imbalance how do the kidneys compensate?
By selectively excreting or reabsorbing anions and cations, By increasing the breathing rate, By decreasing ventilation, By producing more CO2`,
  `question: Describe causes of disturbances in acid-base balance. Page 261. Metabolic acidosis is also known as what?
Primary bicarbonate deficit, Primary bicarbonate excess, Primary CO2 excess, Primary CO2 deficit`,
  `question: Describe causes of disturbances in acid-base balance. Page 261. How does the body compensate for metabolic acidosis?
Through hyperventilation, Through hypoventilation, By excreting bicarbonate, By retaining CO2`,
  `question: Describe causes of disturbances in acid-base balance. Page 262. Metabolic alkalosis is also known as what?
Primary bicarbonate excess, Primary bicarbonate deficit, Primary CO2 deficit, Primary CO2 excess`,
  `question: Describe causes of disturbances in acid-base balance. Page 262. An excessive loss of acid from prolonged vomiting can lead to what condition?
Metabolic alkalosis, Respiratory acidosis, Metabolic acidosis, Respiratory alkalosis`,
  `question: Describe causes of disturbances in acid-base balance. Page 264. Any condition that diminishes the elimination of CO2 by the lungs will cause what?
Respiratory acidosis, Respiratory alkalosis, Metabolic alkalosis, Metabolic acidosis`,
  `question: Describe causes of disturbances in acid-base balance. Page 265. What condition results from an increased rate of alveolar ventilation causing excessive elimination of CO2?
Respiratory alkalosis, Respiratory acidosis, Metabolic acidosis, Metabolic alkalosis`,
  `question: Describe the analysis of blood gas levels. Page 266. What does Oxygen Saturation (SO2) refer to?
The ratio of O2 bound to hemoglobin versus total capable hemoglobin, The amount of O2 dissolved in blood, The ratio of oxyhemoglobin to total hemoglobin, The noninvasive measurement of O2`,
  `question: Describe the analysis of blood gas levels. Page 266. What does Fractional Oxyhemoglobin (FO2Hb) refer to?
The ratio of oxyhemoglobin compared to the total hemoglobin present, The ratio of O2 bound to hemoglobin versus capable hemoglobin, The amount of O2 dissolved in blood, The noninvasive measurement of O2`,
  `question: Describe the analysis of blood gas levels. Page 266. What does Partial Pressure of Oxygen (pO2) measure?
The amount of O2 dissolved in blood, The O2 bound to hemoglobin, The total hemoglobin present, The total O2 in the body`,
  `question: Describe the analysis of blood gas levels. Page 266. What is the normal range for Oxygen Saturation (SO2)?
94% to 98%, 90% to 95%, 85% to 90%, 80% to 85%`,
  `question: Describe the analysis of blood gas levels. Page 266. Which noninvasive measurement is obtained with pulse oximetry?
SpO2, pO2, FO2Hb, SO2`,
  `question: Describe the analysis of blood gas levels. Page 267. The actual percent oxyhemoglobin can be determined spectrophotometrically using what instrument?
A CO-Oximeter, A pulse oximeter, A Clarke electrode, A Severinghaus electrode`,
  `question: Describe the analysis of blood gas levels. Page 267. At a minimum how many wavelengths should CO-Oximeters have for measurements?
Four, Two, Six, One`,
  `question: Describe the analysis of blood gas levels. Page 268. The measurement of pO2 is based on changes in electrical current at what type of electrode?
A Clarke electrode, A Severinghaus electrode, A pH electrode, A reference electrode`,
  `question: Describe the analysis of blood gas levels. Page 268. The measurement of pCO2 and pH are what type of measurement?
Potentiometric, Amperometric, Spectrophotometric, Colorimetric`,
  `question: Describe the analysis of blood gas levels. Page 268. The pCO2 is determined with a modified pH electrode called a what?
Severinghaus electrode, Clarke electrode, Calomel electrode, Glass electrode`,
  `question: Describe the analysis of blood gas levels. Page 266. What is the normal range for Fractional (Percent) Oxyhemoglobin (FO2Hb)?
90% to 95%, 94% to 98%, 85% to 90%, 98% to 100%`,
  `question: Describe specimen collection and processing of blood gasses. Page 269. What is the specimen of choice for blood gas analysis?
Whole blood, Serum, Plasma, Urine`,
  `question: Describe specimen collection and processing of blood gasses. Page 269. What type of collection device is ideal for arterial blood sampling?
A self-filling plastic disposable syringe, An evacuated collection tube, A capillary tube, A serum separator tube`,
  `question: Describe specimen collection and processing of blood gasses. Page 269. Why are evacuated collection tubes not appropriate for blood gases?
They can alter the sample, They are too large, They contain the wrong anticoagulant, They do not maintain an anaerobic environment`,
  `question: Describe specimen collection and processing of blood gasses. Page 269. Why is liquid heparin not recommended for blood gas collection?
Excessive amounts can dilute the sample, It interferes with pH measurement, It causes hemolysis, It binds to CO2`,
  `question: Describe specimen collection and processing of blood gasses. Page 269. Maintaining what kind of environment is critical to correct blood gas results?
An anaerobic environment, An aerobic environment, A cold environment, A warm environment`,
  `question: Describe specimen collection and processing of blood gasses. Page 269. Any air trapped in the syringe during a blood gas draw should be what?
Immediately expelled at the completion of the draw, Left in the syringe, Ignored, Injected into the patient`,
  `question: Describe specimen collection and processing of blood gasses. Page 269. Why is adequate mixing of a blood gas sample important?
To re-suspend the settled cells, To activate the anticoagulant, To prevent clotting, To ensure anaerobic conditions`,
  `question: Describe specimen collection and processing of blood gasses. Page 269. What is the consequence of a delay in analysis on a blood gas sample?
Cell metabolism alters gas and glucose levels, The sample remains stable, The sample clots, The pH increases`,
  `question: Describe specimen collection and processing of blood gasses. Page 269. What can happen if a blood gas sample is placed in an ice water slurry?
pO2 can increase due to oxygen diffusing from the water, pO2 will decrease, The sample will freeze, There is no effect on the sample`,
  `question: Describe specimen collection and processing of blood gasses. Page 269. Lower temperatures have what effect on oxygen solubility in blood?
Increased oxygen solubility, Decreased oxygen solubility, No effect on oxygen solubility, Variable effect on oxygen solubility`,
  `question: Describe specimen collection and processing of blood gasses. Page 269. To avoid preanalytical errors what is the best practice for analysis time?
Analyze the sample as quickly as possible (within 30 minutes), Analyze within 2 hours, Analyze within 24 hours, Analyze after refrigeration`,
  `question: Describe specimen collection and processing of blood gasses. Page 269. Which anticoagulants are recommended for pH and blood gas analysis?
Sodium and lithium salts of heparin, EDTA, Sodium citrate, Potassium oxalate`
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