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
  `question: Identify specimen handling and storage requirements for a manual WBC or platelet count. Page 231. What type of collection tube is used for a manual cell count specimen?
EDTA tube, Heparin tube, Sodium Citrate tube, Serum separator tube`,
  `question: Identify specimen handling and storage requirements for a manual WBC or platelet count. Page 231. For a manual count the specimen tube should be filled to what capacity?
At least half, Completely full, At least one-quarter, Less than half`,
  `question: Identify specimen handling and storage requirements for a manual WBC or platelet count. Page 231. Before use a whole blood specimen for a manual count should be well mixed on a rocker for how long?
At least 5 minutes, 1 minute, 10 minutes, 30 seconds`,
  `question: Identify specimen handling and storage requirements for a manual WBC or platelet count. Page 231. After a sample is diluted using a dilution system for how long is it stable?
3 hours, 1 hour, 8 hours, 24 hours`,
  `question: Identify specimen handling and storage requirements for a manual WBC or platelet count. Page 231. After 3 hours in the diluent what will begin to happen to the white blood cells?
They will lyse, They will multiply, They will clump, They will shrink`,
  `question: Identify specimen handling and storage requirements for a manual WBC or platelet count. Page 231. After dilution the prepared sample is ready to be loaded into what counting instrument?
Neubauer Hemacytometer, Coulter Counter, Flow Cytometer, Spectrophotometer`,
  `question: Identify the components main principles and procedure of manual WBC and Plt count utilizing the dilution system. Page 232. Manual leukocyte counts are performed to monitor the progress of diseases like bacterial infections viral infections and what else?
Leukemias, Anemias, Coagulation disorders, Hemoglobinopathies`,
  `question: Identify the components main principles and procedure of manual WBC and Plt count utilizing the dilution system. Page 232. Unopette and Leukochek are brand names for what type of commonly used system?
Dilution system, Staining system, Collection system, Quality control system`,
  `question: Identify the components main principles and procedure of manual WBC and Plt count utilizing the dilution system. Page 232. In a dilution system what does the reservoir contain?
Pre-measured volume of diluent, Pre-measured volume of blood, A staining solution, A lysing agent only`,
  `question: Identify the components main principles and procedure of manual WBC and Plt count utilizing the dilution system. Page 232. What chemical is present in the diluent to lyse red blood cells while preserving WBCs and platelets?
Ammonium oxalate, Sodium chloride, Potassium cyanide, Glacial acetic acid`,
  `question: Identify the components main principles and procedure of manual WBC and Plt count utilizing the dilution system. Page 232. What component of the dilution system is self-filling and fills by capillary action?
Capillary pipette, Reservoir, Pipette shield, Overflow chamber`,
  `question: Identify the components main principles and procedure of manual WBC and Plt count utilizing the dilution system. Page 232. What is the function of the pipette shield in a dilution system?
Puncture the reservoir, Protect the pipette, Prevent evaporation, All of the above`,
  `question: Identify the components main principles and procedure of manual WBC and Plt count utilizing the dilution system. Page 233. What is the fundamental principle of preparing a sample for a manual WBC or platelet count?
Dilute the sample, Concentrate the sample, Stain the cells, Fix the cells`,
  `question: Identify the components main principles and procedure of manual WBC and Plt count utilizing the dilution system. Page 233. The diluent is designed to lyse or hemolyze which cells?
Red cells, White cells, Platelets, All cells`,
  `question: Identify the components main principles and procedure of manual WBC and Plt count utilizing the dilution system. Page 233. Using a 20 µL capillary pipette and a 1.98 ml reservoir results in what final dilution?
1:100, 1:20, 1:50, 1:200`,
  `question: Identify the components main principles and procedure of manual WBC and Plt count utilizing the dilution system. Page 233. After adding the blood sample to the reservoir how long should you wait for the sample to hemolyze?
10 minutes, 1 minute, 5 minutes, 15 minutes`,
  `question: Identify the components main principles and procedure of manual WBC and Plt count utilizing the dilution system. Page 233. After charging the hemacytometer how long should you allow the cells to settle in a humidity chamber?
15 minutes, 5 minutes, 10 minutes, 20 minutes`,
  `question: Describe the Neubauer Hemacytometer. Page 234. A standard Neubauer Hemacytometer is a thick glass slide that has how many etched grid counting chambers?
Two, One, Four, Three`,
  `question: Describe the Neubauer Hemacytometer. Page 234. What is the depth between the specialized cover glass and the grid surface of the hemacytometer?
0.1 mm, 1.0 mm, 0.01 mm, 0.5 mm`,
  `question: Describe the Neubauer Hemacytometer. Page 234. Each counting chamber grid has a total ruled area of what?
9mm², 1mm², 3mm², 25mm²`,
  `question: Describe the Neubauer Hemacytometer. Page 234. The total ruled area of a counting chamber is divided into how many large squares?
9, 25, 16, 100`,
  `question: Describe the Neubauer Hemacytometer. Page 234. What is the area of each of the nine large squares on the hemacytometer grid?
1mm², 0.25mm², 0.2mm², 3mm²`,
  `question: Describe the Neubauer Hemacytometer. Page 235. The four large corner squares of the hemacytometer grid are each subdivided into how many equal portions?
16, 25, 9, 20`,
  `question: Describe the Neubauer Hemacytometer. Page 235. The large center square of the hemacytometer grid is subdivided into how many equal portions?
25, 16, 9, 20`,
  `question: Describe the Neubauer Hemacytometer. Page 235. When performing a manual WBC count which squares on the hemacytometer are typically counted?
The 9 large squares, The center square only, The 4 corner squares only, The 25 small center squares`,
  `question: Describe the Neubauer Hemacytometer. Page 235. When performing a manual platelet count which square on the hemacytometer is counted?
The center square, The 9 large squares, The 4 corner squares, The top left square`,
  `question: Describe the Neubauer Hemacytometer. Page 235. What microscope objective is used when counting white blood cells?
10x, 40x, 100x, 4x`,
  `question: Describe the Neubauer Hemacytometer. Page 235. What microscope objective is used when counting platelets?
40x, 10x, 100x, 20x`,
  `question: Describe the Neubauer Hemacytometer. Page 235. When counting cells what is the rule for cells that are touching the boundary lines?
Exclude lower and left lines, Include all touching lines, Exclude top and right lines, Include upper and right lines`,
  `question: Calculate the final results of manual cell counts. Page 236. For a manual WBC count the cell counts from both sides of the hemacytometer must be within what percentage of each other?
20%, 10%, 5%, 25%`,
  `question: Calculate the final results of manual cell counts. Page 237. For a manual platelet count the cell counts from both sides of the hemacytometer must be within what percentage of each other?
10%, 20%, 15%, 5%`,
  `question: Calculate the final results of manual cell counts. Page 236. In the manual cell count formula what is the depth factor?
10, 100, 1, 0.1`,
  `question: Calculate the final results of manual cell counts. Page 236. In the manual cell count formula for WBC and platelets what is the dilution factor?
100, 10, 20, 50`,
  `question: Calculate the final results of manual cell counts. Page 236. What is the correct formula for calculating the WBC count in cells/mm³?
(Avg # cells x 10 x 100) / Area, Avg # cells x 10 x 100 x Area, (Avg # cells + 10 + 100) / Area, Avg # cells / 10 / 100 / Area`,
  `question: Calculate the final results of manual cell counts. Page 236. When calculating a manual WBC count what number is used for the Area in the formula?
9, 1, 4, 25`,
  `question: Calculate the final results of manual cell counts. Page 237. When calculating a manual platelet count what number is used for the Area in the formula?
1, 9, 16, 25`,
  `question: Calculate the final results of manual cell counts. Page 236. If the WBC count on side 1 is 30 and on side 2 is 34 are the counts within the acceptable QC range?
Yes, No, Cannot be determined, Only if repeated`,
  `question: Calculate the final results of manual cell counts. Page 236. If the average number of WBCs counted is 90 across 9 squares what is the final WBC count/mm³?
10000, 9000, 90000, 81000`,
  `question: Calculate the final results of manual cell counts. Page 237. What is the normal adult reference range for a WBC count?
4.8-10.8 x 10^9/L, 150-450 x 10^9/L, 3.5-5.5 x 10^12/L, 10-20 x 10^9/L`,
  `question: Calculate the final results of manual cell counts. Page 237. What is the normal adult reference range for a platelet count?
150-450 x 10^9/L, 4.8-10.8 x 10^9/L, 50-100 x 10^9/L, 500-1000 x 10^9/L`,
  `question: Calculate the final results of manual cell counts. Page 237. If the platelet count on side 1 is 295 and on side 2 is 305 are the counts within the acceptable QC range?
Yes, No, Cannot be determined, Only if diluted further`,
  `question: Calculate the final results of manual cell counts. Page 238. If the average number of platelets counted is 300 in the center square what is the final platelet count/mm³?
300000, 30000, 3000, 3000000`,
  `question: Calculate the final results of manual cell counts. Page 238. Failing to mix the dilution reservoir before filling the hemacytometer is a common what?
Source of Error, Required Step, Quality Control Check, Calibration Procedure`,
  `question: Calculate the final results of manual cell counts. Page 238. Underfilling or overfilling the hemacytometer is considered a what?
Source of Error, Best Practice, Normal Variation, Recommended Technique`,
  `question: Calculate the final results of manual cell counts. Page 238. Failing to allow cells to settle in the hemacytometer for an adequate amount of time is a source of what?
Error, Efficiency, Accuracy, Precision`,
  `question: Calculate the final results of manual cell counts. Page 238. What is a common source of error when performing a manual platelet count?
Counting artifacts, Proper mixing, Using a clean slide, Correct dilution`,
  `question: Calculate the final results of manual cell counts. Page 238. Debris and what else can be mistaken for platelets during a manual count leading to a falsely elevated result?
Bacteria, Red blood cells, White blood cells, Fat globules`,
  `question: Calculate the final results of manual cell counts. Page 238. What type of sample is a source of error and cannot be used for an accurate manual cell count?
Clotted sample, Fresh sample, Well-mixed sample, Properly diluted sample`,
  `question: Identify the components main principles and procedure of manual WBC and Plt count utilizing the dilution system. Page 232. What is the storage temperature range for the dilution system reservoir?
1°C to 30°C, -20°C to 0°C, 37°C to 50°C, Room temperature only`,
  `question: Describe the Neubauer Hemacytometer. Page 234. The moats on a hemacytometer give the counting area what distinctive shape?
H shape, U shape, V shape, T shape`,
  `question: Calculate the final results of manual cell counts. Page 238. Failing to expel 3-4 drops from the pipette before charging the hemacytometer is a what?
Source of Error, Recommended procedure, Quality check, Calibration step`,
  `question: Calculate the final results of manual cell counts. Page 236. If WBC side 1 = 89 and side 2 = 91 what is the average number of cells counted?
90, 89, 91, 180`,
  `question: Identify the components main principles and procedure of manual WBC and Plt count utilizing the dilution system. Page 233. Before charging the Neubauer Hemacytometer should be cleaned with what?
An alcohol wipe, Distilled water, Saline, A dry cloth`,
  `question: Describe the Neubauer Hemacytometer. Page 235. Which cells are counted using the 10x objective?
WBCs, Platelets, RBCs, Reticulocytes`,
  `question: Calculate the final results of manual cell counts. Page 237. The purpose of a manual platelet count is to detect a count that is above or below what?
Normal, The WBC count, The RBC count, The critical value`,
  `question: Identify the components main principles and procedure of manual WBC and Plt count utilizing the dilution system. Page 233. What is contained in the diluent along with ammonium oxalate?
Sorensen's phosphate buffer, Acetic acid, Formaldehyde, Saline`,
  `question: Describe the Neubauer Hemacytometer. Page 235. The smaller squares within the large center square are used for counting what?
Platelets, WBCs, RBCs, All of the above`,
  `question: Calculate the final results of manual cell counts. Page 236. The 20% QC rule for WBC counts means you multiply the lower count by 0.20 and do what with the result?
Add it to the low count, Subtract it from the high count, Add it to the high count, Subtract it from the low count`,
  `question: Calculate the final results of manual cell counts. Page 237. The quality control check for platelets is stricter than for WBCs requiring the counts to be within what percentage?
10%, 20%, 15%, 5%`,
  `question: Calculate the final results of manual cell counts. Page 238. Uneven distribution of cells is a source of error indicated by the counts on both sides not being within what?
10% or 20%, 5%, 25%, 30%`
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