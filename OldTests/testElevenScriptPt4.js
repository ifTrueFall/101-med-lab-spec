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
  `question: Describe the functions of electrolytes. According to the definition what are ions capable of carrying an electrical charge called? 
Electrolytes, Anodes, Cathodes, Cations`,
  `question: Describe the functions of electrolytes. What are negatively charged ions that move toward an anode called? 
Anions, Cations, Electrolytes, Cathodes`,
  `question: Describe the functions of electrolytes. What are positively charged ions that move toward a cathode called? 
Cations, Anions, Electrolytes, Anodes`,
  `question: Describe the functions of electrolytes. Which three electrolytes are primarily involved in volume and osmotic regulation? 
Sodium Chloride and Potassium, Potassium Magnesium and Calcium, Magnesium Calcium and Zinc, Bicarbonate Potassium and Chloride`,
  `question: Describe the functions of electrolytes. Which three electrolytes are primarily involved in myocardial rhythm and contraction? 
Potassium Magnesium and Calcium, Sodium Chloride and Potassium, Magnesium Calcium and Zinc, Bicarbonate Potassium and Chloride`,
  `question: Describe the functions of electrolytes. Which electrolyte is a key cofactor in the regulation of adenosine triphosphatase (ATPase) ion pumps? 
Magnesium, Calcium, Sodium, Potassium`,
  `question: Describe the functions of electrolytes. Which three electrolytes are essential for maintaining acid-base balance? 
Bicarbonate Potassium and Chloride, Sodium Chloride and Potassium, Potassium Magnesium and Calcium, Magnesium Calcium and Zinc`,
  `question: Describe the functions of electrolytes. Which two electrolytes are required for blood coagulation? 
Calcium and Magnesium, Sodium and Chloride, Potassium and Bicarbonate, Zinc and Phosphate`,
  `question: Describe the functions of electrolytes. Which two electrolytes are essential for the production and use of ATP from glucose? 
Magnesium and Phosphate, Calcium and Zinc, Sodium and Potassium, Chloride and Bicarbonate`,
  `question: Describe the functions of electrolytes. What is the common term for a panel that determines the concentration of Na+ K+ Cl- and HCO3-? 
Electrolyte profile, Anion gap panel, Blood gas analysis, Renal function panel`,
  `question: Describe the functions of electrolytes. Which class of electrolytes includes Chloride and Bicarbonate? 
Anions, Cations, Metals, Noble gases`,
  `question: Describe the functions of electrolytes. Which class of electrolytes includes Sodium and Potassium? 
Cations, Anions, Halogens, Nonmetals`,
  `question: Describe the functions of electrolytes. The activation of many enzymes requires which electrolytes as cofactors? 
Magnesium Calcium and Zinc, Sodium Potassium and Chloride, Bicarbonate Phosphate and Sulfate, Iron Copper and Manganese`,
  `question: Describe the functions of electrolytes. What is the primary role of sodium potassium and chloride in the body? 
Volume and osmotic regulation, Blood coagulation, Enzyme activation, ATP production`,
  `question: Describe the functions of electrolytes. The body has complex systems for monitoring and maintaining electrolyte concentrations within what kind of range? 
Narrow ranges, Wide ranges, Unregulated ranges, Fluctuating ranges`,
  `question: Describe the balance of electrolytes and water in the body. What percentage of the average human body is water? 
40% to 75%, 25% to 50%, 80% to 90%, 10% to 20%`,
  `question: Describe the balance of electrolytes and water in the body. The fluid inside the cells which accounts for about two-thirds of total body water is called what? 
Intracellular fluid (ICF), Extracellular fluid (ECF), Plasma, Interstitial fluid`,
  `question: Describe the balance of electrolytes and water in the body. What are the two subdivisions of extracellular fluid (ECF)? 
Plasma and interstitial fluid, Intracellular fluid and plasma, Interstitial fluid and lymph, Plasma and lymph`,
  `question: Describe the balance of electrolytes and water in the body. Normal plasma is what percentage water? 
93%, 75%, 50%, 100%`,
  `question: Describe the balance of electrolytes and water in the body. Regulation of which two things are interrelated in controlling blood volume? 
Sodium and water, Potassium and chloride, Calcium and phosphate, Magnesium and bicarbonate`,
  `question: Describe the balance of electrolytes and water in the body. The renin-angiotensin-aldosterone system is responsible for regulating blood pressure as well as retention of what? 
Water and sodium, Potassium and chloride, Calcium and magnesium, Phosphate and sulfate`,
  `question: Describe the balance of electrolytes and water in the body. What hormone induces the distal convoluted tubules to reabsorb sodium and chloride in exchange for potassium? 
Aldosterone, Angiotensin II, Renin, Antidiuretic hormone`,
  `question: Describe the balance of electrolytes and water in the body. What is the term for a measurement of the solute to water ratio in a solution? 
Osmolality, Molarity, Density, Specific gravity`,
  `question: Describe the balance of electrolytes and water in the body. An increase in blood osmolality stimulates the hypothalamus to release which hormone? 
Antidiuretic hormone (ADH), Aldosterone, Renin, Angiotensin II`,
  `question: Describe the balance of electrolytes and water in the body. A low osmolality has what effect on the release of ADH? 
It suppresses ADH release, It increases ADH release, It has no effect on ADH, It causes a surge in ADH`,
  `question: Describe the balance of electrolytes and water in the body. What are the two most frequently used methods for determining osmolality? 
Freezing point depression and vapor pressure decrease, Titration and colorimetry, Spectrophotometry and chromatography, Electrophoresis and immunoassay`,
  `question: Describe the balance of electrolytes and water in the body. The intravascular component of the extracellular fluid is also known as what? 
Plasma, Interstitial fluid, Intracellular fluid, Cytosol`,
  `question: Describe the balance of electrolytes and water in the body. What enzyme released from the lungs acts on angiotensin I to form angiotensin II? 
ACE, Renin, Aldosterone, Angiotensinogen`,
  `question: Describe the balance of electrolytes and water in thebody. What is the primary function of water as it pertains to nutrients and waste products? 
Transport, Storage, Metabolism, Production`,
  `question: Describe the balance of electrolytes and water in the body. Which electrolytes provide the largest contribution to the osmolality value of serum? 
Sodium Chloride and Bicarbonate, Potassium Calcium and Magnesium, Phosphate Sulfate and Lactate, Glucose Urea and Protein`,
  `question: Describe the major electrolytes and their clinical significance. What is the major cation of the extracellular fluid (ECF)? 
Sodium (Na+), Potassium (K+), Calcium (Ca2+), Magnesium (Mg2+)`,
  `question: Describe the major electrolytes and their clinical significance. What is the major intracellular cation in the body? 
Potassium (K+), Sodium (Na+), Calcium (Ca2+), Magnesium (Mg2+)`,
  `question: Describe the major electrolytes and their clinical significance. What is the major extracellular anion? 
Chloride (Cl-), Bicarbonate (HCO3-), Phosphate (PO4-), Sulfate (SO42-)`,
  `question: Describe the major electrolytes and their clinical significance. What is the second most abundant anion in the ECF? 
Bicarbonate (HCO3-), Chloride (Cl-), Phosphate (PO4-), Sulfate (SO42-)`,
  `question: Describe the major electrolytes and their clinical significance. A serum/plasma Na+ concentration less than 135 mmol/L is defined as what condition? 
Hyponatremia, Hypernatremia, Hypokalemia, Hyperkalemia`,
  `question: Describe the major electrolytes and their clinical significance. A serum/plasma Na+ concentration greater than 150 mmol/L is defined as what condition? 
Hypernatremia, Hyponatremia, Hyperkalemia, Hypokalemia`,
  `question: Describe the major electrolytes and their clinical significance. A serum/plasma K+ concentration less than 3.5 mmol/L is defined as what condition? 
Hypokalemia, Hyperkalemia, Hyponatremia, Hypernatremia`,
  `question: Describe the major electrolytes and their clinical significance. A serum/plasma K+ concentration greater than 5.1 mmol/L is defined as what condition? 
Hyperkalemia, Hypokalemia, Hyponatremia, Hypernatremia`,
  `question: Describe the major electrolytes and their clinical significance. What is calculated as the concentration difference between commonly measured cations and commonly measured anions? 
Anion gap, Osmolal gap, Cation gap, Henderson-Hasselbalch equation`,
  `question: Describe the major electrolytes and their clinical significance. An elevated anion gap may be caused by what condition that leads to phosphate and sulfate retention? 
Uremia/renal failure, Hypoalbuminemia, Hypercalcemia, Respiratory alkalosis`,
  `question: Describe the major electrolytes and their clinical significance. Which term describes the process where bicarbonate diffuses out of the red blood cell in exchange for chloride? 
Chloride shift, Sodium-potassium pump, Anion exchange, Active transport`,
  `question: Describe the major electrolytes and their clinical significance. What is the principal determinant of urinary K+ excretion? 
The distal tubule, The proximal tubule, The glomerulus, The collecting duct`,
  `question: Describe the major electrolytes and their clinical significance. Which hormone promotes acute entry of K+ into skeletal muscle and liver cells? 
Insulin, Glucagon, Aldosterone, Cortisol`,
  `question: Describe the major electrolytes and their clinical significance. What is the most common cause of hyperkalemia in hospitalized patients? 
Therapeutic K+ administration, Renal failure, Metabolic acidosis, Cellular breakdown`,
  `question: Describe the major electrolytes and their clinical significance. A low anion gap may be seen with what condition which causes a decrease in unmeasured anions? 
Hypoalbuminemia, Ketoacidosis, Lactic acidosis, Methanol poisoning`,
  `question: Describe analytical testing for electrolytes. What is the most routinely used method for measuring sodium concentration in clinical laboratories? 
Ion-selective electrodes (ISEs), Flame photometry, Atomic absorption, Colorimetry`,
  `question: Describe analytical testing for electrolytes. The current method of choice for potassium analysis is what? 
Ion-selective electrode (ISE), Spectrophotometry, Titration, Gravimetric analysis`,
  `question: Describe analytical testing for electrolytes. What type of membrane is used in an ISE system for sodium measurement? 
Glass ion-exchange membrane, Valinomycin membrane, Liquid polymer membrane, Solid-state crystal membrane`,
  `question: Describe analytical testing for electrolytes. For potassium ISE measurements what membrane is used to selectively bind K+? 
Valinomycin membrane, Glass ion-exchange membrane, Silver chloride membrane, Gas-permeable membrane`,
  `question: Describe analytical testing for electrolytes. What is the most common cause of artifactual hyperkalemia? 
Hemolysis after the blood is drawn, Prolonged tourniquet use, Storing blood on ice, High platelet count`,
  `question: Describe analytical testing for electrolytes. Why should whole blood samples for potassium determination be stored at room temperature and never iced? 
Storing on ice promotes the release of K+ from cells, It prevents glycolysis, It maintains sample pH, It preserves red blood cell morphology`,
  `question: Describe analytical testing for electrolytes. A serum K+ may be 0.1 to 0.7 mmol/L higher than plasma K+ because of the release of K+ from what? 
Platelets during coagulation, Red blood cells, White blood cells, The endothelium`,
  `question: Describe analytical testing for electrolytes. What analysis is used to confirm the diagnosis of cystic fibrosis (CF)? 
Analysis of sweat for increased Cl- concentration, Serum potassium measurement, Urine sodium analysis, Blood gas analysis`,
  `question: Describe analytical testing for electrolytes. In the sweat test for cystic fibrosis what drug is used to stimulate the sweat glands? 
Pilocarpine, Atropine, Epinephrine, Valinomycin`,
  `question: Describe analytical testing for electrolytes. For highest accuracy samples for bicarbonate analysis should be what? 
Anaerobic, Aerobic, Hemolyzed, Diluted`,
  `question: Describe analytical testing for electrolytes. If a sample for bicarbonate analysis is left uncapped what happens? 
CO2 escapes and levels decrease, O2 enters and levels increase, CO2 is absorbed and levels increase, The sample remains stable`,
  `question: Describe analytical testing for electrolytes. The direct ISE method uses what kind of sample? 
An undiluted sample, A diluted sample, A centrifuged sample, A filtered sample`,
  `question: Describe analytical testing for electrolytes. The indirect ISE method uses what kind of sample? 
A diluted sample, An undiluted sample, A whole blood sample, A hemolyzed sample`,
  `question: Describe analytical testing for electrolytes. For total CO2 measurements what type of electrode is used in indirect electrode-based methods? 
A pCO2 electrode, A pH electrode, An O2 electrode, A sodium electrode`,
  `question: Describe analytical testing for electrolytes. What is the anticoagulant of choice for potassium analysis? 
Heparin, EDTA, Sodium Citrate, Potassium Oxalate`
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