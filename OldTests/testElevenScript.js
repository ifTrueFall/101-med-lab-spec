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
  `question:  A sudden, sharp decline in renal function that occurs over hours and days is called:
Acute Kidney Injury, Chronic Kidney Disease, End-Stage Renal Disease, Nephritis`,
  `question:  Which hormone is secreted by the posterior pituitary in response to increased blood osmolality or decreased blood volume?
Antidiuretic Hormone, Aldosterone, Renin, Erythropoietin`,
  `question:  Abnormalities of kidney structure or function present for greater than 3 months is known as:
Chronic Kidney Disease, Acute Kidney Injury, Diabetes Insipidus, Glomerulonephritis`,
  `question:  What is the condition with excessive production of urine due to insufficient synthesis of antidiuretic hormone (ADH)?
Diabetes Insipidus, Nephrotic Syndrome, Uremia, Pyelonephritis`,
  `question:  A condition where renal function is inadequate to support life is called:
End-Stage Renal Disease, Acute Kidney Injury, Microalbuminuria, Renal Clearance`,
  `question:  A formula used to predict GFR based on serum creatinine, age, body size, gender, and race is the:
Estimated Glomerular Filtration Rate, Renal Clearance formula, Peritoneal Dialysis rate, Hemodialysis calculation`,
  `question:  What is the rate in milliliters per minute at which small molecules are filtered from the blood through the kidney's glomeruli?
Glomerular Filtration Rate, Renal Threshold, Urinary Flow Rate, Blood Osmolality Rate`,
  `question:  Nephritis accompanied by inflammation of the capillary loops of the glomeruli is called:
Glomerulonephritis, Pyelonephritis, Urinary Tract Infection, Nephrotic Syndrome`,
  `question:  A tuft of blood vessels found in each nephron that are involved in the filtration of the blood is the:
Glomerulus, Nephron, Ureter, Bladder`,
  `question:  What is the renal replacement therapy that utilizes a dialyzing solution to remove certain elements from the blood through diffusion?
Hemodialysis, Hemofiltration, Peritoneal Dialysis, Rhabdomyolysis`,
  `question:  What is the process where solutes and water are slowly and continuously filtered from the blood across a semipermeable membrane?
Hemofiltration, Hemodialysis, Renal Clearance, Glomerular Filtration`,
  `question:  The presence of small amounts of albumin in the urine (30 to 300 mg) is termed:
Microalbuminuria, Proteinuria, Hematuria, Lipiduria`,
  `question:  Inflammation of the kidney that may involve the glomerulus, tubule, or interstitial renal tissue is:
Nephritis, Pyelonephritis, Glomerulonephritis, Uremia`,
  `question:  What is the functional unit of the kidney?
Nephron, Glomerulus, Ureter, Medulla`,
  `question:  A group of diseases resulting in injury and increased permeability of the glomerular basement membrane is called:
Nephrotic Syndrome, Diabetes Insipidus, Chronic Kidney Disease, Acute Kidney Injury`,
  `question:  What process uses gravity to introduce and remove dialyzing solution through the peritoneal membrane?
Peritoneal Dialysis, Hemodialysis, Hemodiafiltration, Renal Clearance`,
  `question:  Inflammation of the kidney due to a sudden and often severe bacterial infection is called:
Pyelonephritis, Nephritis, Glomerulonephritis, Cystitis`,
  `question:  The volume of plasma from which a substance is completely cleared by the kidneys per unit of time is:
Renal Clearance, Glomerular Filtration Rate, Renal Threshold, Estimated GFR`,
  `question:  What is the plasma concentration of a substance above which the kidneys begin to eliminate it into the urine?
Renal Threshold, Renal Clearance, Saturation Point, Filtration Limit`,
  `question:  A condition with rapid breakdown of skeletal muscle that can lead to acute renal failure is:
Rhabdomyolysis, Uremia, Pyelonephritis, Nephrotic Syndrome`,
  `question:  A very high concentration of urea, creatinine, and other nitrogenous end products in the blood is called:
Uremia, Azotemia, Rhabdomyolysis, Diabetes Insipidus`,
  `question:  An infection in any part of the urinary system is called a:
Urinary Tract Infection, Pyelonephritis, Glomerulonephritis, Bladder Infection`
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