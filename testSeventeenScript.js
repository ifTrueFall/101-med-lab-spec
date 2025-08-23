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
  `question: Identify specimen requirements equipment and proper procedures in preparing a slide for a differential. Page 198. What type of collection tube is required for preparing a blood smear for a differential?
EDTA, Heparin, Sodium Citrate, No additive`,
  `question: Identify specimen requirements equipment and proper procedures in preparing a slide for a differential. Page 198. A blood slide from a standard EDTA tube should be prepared within how many hours of collection?
2 to 3 hours, 1 hour, 4 hours, 24 hours`,
  `question: Identify specimen requirements equipment and proper procedures in preparing a slide for a differential. Page 198. A blood slide from a microtainer should be prepared within how many hours of collection?
1 hour, 2 to 3 hours, 30 minutes, 4 hours`,
  `question: Identify specimen requirements equipment and proper procedures in preparing a slide for a differential. Page 198. What is the most common method used for preparing a peripheral blood smear?
Push-Wedge method, Cover glass method, Automated method, Spinner method`,
  `question: Identify specimen requirements equipment and proper procedures in preparing a slide for a differential. Page 198. What is the proper angle to hold the spreader slide when making a push-wedge smear?
30°-45°, 15°-25°, 50°-60°, 90°`,
  `question: Identify specimen requirements equipment and proper procedures in preparing a slide for a differential. Page 199. After a smear is made and air-dried what is the stain of choice for a differential?
Wright stain, Giemsa stain, New Methylene Blue, Prussian Blue`,
  `question: Identify specimen requirements equipment and proper procedures in preparing a slide for a differential. Page 200. Which microscope objective is used to perform the initial scan of a peripheral blood smear?
10x, 40x, 50x, 100x`,
  `question: Identify specimen requirements equipment and proper procedures in preparing a slide for a differential. Page 200. In which area of the blood smear is blood cell morphology typically evaluated?
Thin area, Feathered edge, Thick area, Frosted end`,
  `question: Identify specimen requirements equipment and proper procedures in preparing a slide for a differential. Page 200. The initial scan is used to check for proper staining even cell distribution rouleaux and what else?
Platelet clumps, Parasites, Bacteria, Howell-Jolly bodies`,
  `question: Identify specimen requirements equipment and proper procedures in preparing a slide for a differential. Page 200. What counting pattern should be used when performing a manual differential?
Zig-Zag method, Battlement method, Straight-line method, Circular method`,
  `question: Identify specimen requirements equipment and proper procedures in preparing a slide for a differential. Page 200. Besides the 100-WBC count what is another component of a manual differential?
RBC morphology, Reticulocyte count, ESR, Hemoglobin`,
  `question: Describe the process of evaluating red cell morphology. Page 202. Approximately how many oil immersion fields should be scanned to evaluate RBC morphology?
10, 5, 20, 50`,
  `question: Describe the process of evaluating red cell morphology. Page 202. How should normal red blood cells be reported?
Normocytic/Normochromic, Microcytic/Hypochromic, Macrocytic/Normochromic, Anisocytosis/Poikilocytosis`,
  `question: Describe the process of evaluating red cell morphology. Page 202. What is the general term for a variation in the size of red blood cells?
Anisocytosis, Poikilocytosis, Hypochromia, Polychromasia`,
  `question: Describe the process of evaluating red cell morphology. Page 202. What is the general term for a variation in the shape of red blood cells?
Poikilocytosis, Anisocytosis, Spherocytosis, Schistocytosis`,
  `question: Describe the process of evaluating red cell morphology. Page 202. Red blood cells that are smaller than normal with an increased central pallor are reported as what?
Microcytic/Hypochromic, Macrocytic/Normochromic, Normocytic/Normochromic, Sickle/Target`,
  `question: Describe the process of evaluating red cell morphology. Page 202. Red blood cells that are larger than normal with a normal hemoglobin concentration are reported as what?
Macrocytic/Normochromic, Microcytic/Hypochromic, Normocytic/Normochromic, Polychromatic/Basophilic`,
  `question: Describe the proper procedure for performing a differential WBC count. Page 203. How many white blood cells must be counted and classified for a standard manual differential?
100, 50, 200, 500`,
  `question: Describe the proper procedure for performing a differential WBC count. Page 203. What is the normal reference range for segmented neutrophils in an adult?
50%-70%, 20%-44%, 2%-9%, 0%-4%`,
  `question: Describe the proper procedure for performing a differential WBC count. Page 203. What is the normal reference range for lymphocytes in an adult?
20%-44%, 50%-70%, 48%-78%, 2%-9%`,
  `question: Describe the proper procedure for performing a differential WBC count. Page 203. Which white blood cell is typically the most numerous in an infant's blood?
Lymphocytes, Segmented neutrophils, Monocytes, Eosinophils`,
  `question: Describe the proper procedure for performing a differential WBC count. Page 203. What is the normal reference range for eosinophils in an adult?
0%-4%, 0%-2%, 2%-9%, 20%-44%`,
  `question: Describe the proper procedure for performing a differential WBC count. Page 203. What is the normal reference range for monocytes in an adult?
2%-9%, 0%-2%, 0%-4%, 20%-44%`,
  `question: Calculate a corrected WBC count when nRBCs are observed. Page 204. A WBC count correction is necessary when how many nRBCs are seen per 100 WBCs?
≥6, 5, 1-5, >10`,
  `question: Calculate a corrected WBC count when nRBCs are observed. Page 204. What is the correct formula for a corrected WBC count?
(#WBCx100)/(100+#nRBCs), (#WBC+#nRBCs)/100, (#WBCx#nRBCs)/100, (100+#nRBCs)/#WBC`,
  `question: Calculate a corrected WBC count when nRBCs are observed. Page 204. If the automated WBC count is 9.0 x 10^9/L and 8 nRBCs are counted what is the corrected WBC count?
8.3 x 10^9/L, 9.0 x 10^9/L, 9.8 x 10^9/L, 8.8 x 10^9/L`,
  `question: Calculate a corrected WBC count when nRBCs are observed. Page 204. A patient has a WBC count of 22.0 x 10^9/L with 10 nRBCs counted. What is the corrected WBC count?
20.0 x 10^9/L, 22.0 x 10^9/L, 18.0 x 10^9/L, 24.0 x 10^9/L`,
  `question: Describe the procedure and reporting terms of platelet estimation. Page 205. Which microscope objective should be used when performing a platelet estimate?
100x, 10x, 40x, 50x`,
  `question: Describe the procedure and reporting terms of platelet estimation. Page 205. For a platelet estimate how many fields should be counted and averaged?
10, 5, 15, 20`,
  `question: Describe the procedure and reporting terms of platelet estimation. Page 205. What is the approximate value each platelet represents in a wedge preparation estimate?
20000 PLTs/µL, 10000 PLTs/µL, 5000 PLTs/µL, 1000 PLTs/µL`,
  `question: Describe the procedure and reporting terms of platelet estimation. Page 205. An average of 8 to 20 platelets per oil immersion field is considered what?
Adequate, Decreased, Increased, Normal`,
  `question: Describe the procedure and reporting terms of platelet estimation. Page 205. An average of 7 or fewer platelets per oil immersion field is reported as what?
Decreased, Adequate, Increased, Clumped`,
  `question: Describe the procedure and reporting terms of platelet estimation. Page 205. An average of 21 or more platelets per oil immersion field is reported as what?
Increased, Decreased, Adequate, Abnormal`,
  `question: Describe the procedure and reporting terms of platelet estimation. Page 205. A platelet estimate cannot be performed if the specimen is what?
Clumped, Hemolyzed, Lipemic, Icteric`,
  `question: Calculate a platelet estimate. Page 205. What is the formula to calculate a platelet estimate?
(Total Platelets/10) x 20000, (Total Platelets x 10) / 20000, (Total Platelets x 20000) + 10, Total Platelets / 20000`,
  `question: Calculate a platelet estimate. Page 205. If 150 platelets are counted across 10 fields what is the platelet estimate?
300000, 150000, 200000, 250000`,
  `question: Calculate a platelet estimate. Page 206. If the average number of platelets per field is 10-15 what is the estimated platelet count range?
200000-300000/L, 100000-160000/L, 320000-400000/L, Less than 20000/L`,
  `question: Calculate a platelet estimate. Page 206. If the platelet count estimate is less than 20000/L what is the average number of platelets seen per 100x field?
0-1, 1-4, 5-8, 10-15`,
  `question: Describe the procedure and reporting terms of WBC estimation. Page 207. Which microscope objective is used to perform a WBC estimate?
40x, 10x, 50x, 100x`,
  `question: Describe the procedure and reporting terms of WBC estimation. Page 207. To perform a WBC estimate you count the total number of WBCs in 10 fields and then do what?
Divide by 10, Multiply by 10, Divide by 100, Multiply by 100`,
  `question: Describe the procedure and reporting terms of WBC estimation. Page 207. Each white blood cell seen under the 40x objective represents approximately how many WBCs per microliter?
2000, 1000, 500, 5000`,
  `question: Calculate a WBC estimate. Page 207. What is the correct formula to calculate a WBC estimate?
average # WBC x 2000, average # WBC / 2000, total # WBC x 2000, total # WBC / 2000`,
  `question: Calculate a WBC estimate. Page 207. If you see an average of 4 WBCs per high-power field what is the estimated WBC count?
8000, 4000, 6000, 10000`,
  `question: Calculate a WBC estimate. Page 207. An average of 6-10 WBCs per high-power field corresponds to what estimated WBC count range?
10.0-13.0 x 10^9/L, 4.0-7.0 x 10^9/L, 7.0-10.0 x 10^9/L, 13.0-18.0 x 10^9/L`,
  `question: Calculate a WBC estimate. Page 207. If a total of 70 WBCs are counted in 10 high-power fields what is the estimated WBC count?
14000, 7000, 20000, 10000`,
  `question: Compare the WBC estimation to automated WBC count. Page 208. What is the primary reason for comparing a manual WBC estimate with an automated WBC count?
Verification, Calibration, Quality Control, Billing`,
  `question: Compare the WBC estimation to automated WBC count. Page 208. When an automated analyzer flags a value as abnormal or critical what is required?
Verification, Recalibration, Maintenance, Re-running the control`,
  `question: Compare the WBC estimation to automated WBC count. Page 208. How is verification of an automated count typically performed?
By performing manual methods, By using a different analyzer, By checking the expiration date, By calling the manufacturer`,
  `question: Compare the WBC estimation to automated WBC count. Page 208. A technologist makes a rough estimate of WBCs to determine if the numbers correlate with what?
Automated hematology analyzers, The previous day's results, The patient's diagnosis, The reference range`,
  `question: Identify specimen requirements equipment and proper procedures in preparing a slide for a differential. Page 199. The feathered edge is part of which section of a blood smear?
Tail, Head, Body, Frosted end`,
  `question: Describe the process of evaluating red cell morphology. Page 202. Scanning approximately 10 oil immersion fields allows for the observation of how many RBCs per field?
200 to 250, 100 to 150, 50 to 100, 300 to 400`,
  `question: Describe the proper procedure for performing a differential WBC count. Page 203. What is the normal reference range for basophils in an adult?
0%-2%, 0%-4%, 2%-9%, 20%-44%`,
  `question: Calculate a corrected WBC count when nRBCs are observed. Page 204. Why is it important to count nRBCs during a WBC differential?
To correct the WBC count, To estimate RBC production, To diagnose anemia, To assess platelet function`,
  `question: Describe the procedure and reporting terms of platelet estimation. Page 205. In what area of the slide are platelet estimates performed?
Same fields as RBC morphology, Feathered edge, Thick area, Near the frosted end`,
  `question: Describe the procedure and reporting terms of WBC estimation. Page 207. Where should a WBC estimate be performed on the peripheral smear?
Slight overlapping of RBCs, Feathered edge, Thick area where RBCs overlap, Any area of the slide`,
  `question: Calculate a platelet estimate. Page 205. If 80 platelets are counted in 10 oil immersion fields what is the platelet estimate?
160000, 80000, 200000, 240000`,
  `question: Identify specimen requirements equipment and proper procedures in preparing a slide for a differential. Page 198. What is a DIFF-SAFE device used for?
Avoiding removal of EDTA tube top, Spreading the blood drop, Staining the slide, Counting the cells`,
  `question: Describe the proper procedure for performing a differential WBC count. Page 203. What is the reference range for lymphocytes in an infant?
48%-78%, 20%-44%, 50%-70%, 2%-11%`,
  `question: Describe the procedure and reporting terms of platelet estimation. Page 205. The text states that counting fewer than 10 fields with increased platelets is likely what?
Invalid, Acceptable, Recommended, Required`,
  `question: Identify specimen requirements equipment and proper procedures in preparing a slide for a differential. Page 200. Which objective is used to perform the manual WBC differential count?
100x, 10x, 40x, 20x`
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