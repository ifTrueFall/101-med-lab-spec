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
  `question: Describe components of Quality Assurance in hematology. Page 223. What is the primary goal of a comprehensive Quality Management (QM) plan?
Ensure reliable patient results, Reduce laboratory costs, Increase test turnaround time, Minimize staff training`,
  `question: Describe components of Quality Assurance in hematology. Page 223. Calibrators controls and reference values are all part of what plan?
Quality Management Plan, Laboratory Safety Plan, Employee Training Plan, Instrument Maintenance Plan`,
  `question: Describe components of Quality Assurance in hematology. Page 223. Issues with specimen identification collection time and specimen integrity fall under which category of quality indicators?
Pre-Analytical Factors, Analytical Factors, Post-analytical Factors, Administrative Factors`,
  `question: Describe components of Quality Assurance in hematology. Page 223. Issues with reagents and equipment fall under which category of quality indicators?
Analytical Factors, Pre-Analytical Factors, Post-analytical Factors, Environmental Factors`,
  `question: Describe components of Quality Assurance in hematology. Page 223. Issues with documentation calculations and reporting fall under which category of quality indicators?
Post-analytical Factors, Analytical Factors, Pre-Analytical Factors, Procedural Factors`,
  `question: Describe components of Quality Assurance in hematology. Page 223. Reference intervals or normal values for an analyte are determined by testing what?
A healthy population, A diseased population, A single individual, Commercial controls`,
  `question: Describe components of Quality Assurance in hematology. Page 223. To establish reference values at least how many samples from healthy subgroups are required?
20, 10, 50, 100`,
  `question: Describe components of Quality Assurance in hematology. Page 223. What is the term for a material or medical device with known quantitative characteristics used to standardize an instrument?
Calibrator, Control, Reagent, Standard`,
  `question: Describe components of Quality Assurance in hematology. Page 223. What is the term for a stabilized material with established values used to verify that an instrument is running properly?
Control, Calibrator, Reference, Analyte`,
  `question: Describe components of Quality Assurance in hematology. Page 224. Control materials should be tested with patient samples and have what levels of analyte?
Normal and abnormal, Only normal, Only abnormal, Random`,
  `question: Describe components of Quality Assurance in hematology. Page 224. What is the term for the arithmetic average of a set of data points?
Mean, Median, Mode, Range`,
  `question: Describe components of Quality Assurance in hematology. Page 224. What term describes a sudden change of a control value in relation to the mean?
Shift, Trend, Outlier, Drift`,
  `question: Describe components of Quality Assurance in hematology. Page 224. What term describes a continuous movement of a control value in a single direction?
Trend, Shift, Fluctuation, Jump`,
  `question: Describe components of Quality Assurance in hematology. Page 224. What statistical measure is used to quantify the amount of variation or dispersion of a set of data values from the mean?
Standard Deviation, Coefficient of Variation, Mean, Range`,
  `question: Describe components of Quality Assurance in hematology. Page 224. What percentage of measured values fall within the mean and +/- 1SD from the mean?
68.6%, 95.5%, 99.7%, 50.0%`,
  `question: Describe components of Quality Assurance in hematology. Page 224. The accepted limit for clinical laboratory control values is that 95.5% of values fall within the mean and what range?
+/- 2SD, +/- 1SD, +/- 3SD, +/- 1.5SD`,
  `question: Describe components of Quality Assurance in hematology. Page 224. The standard deviation expressed as a percentage is known as what?
Coefficient of Variation, Standard Deviation, Mean Percentage, Variance`,
  `question: Describe components of Quality Assurance in hematology. Page 224. A lower Coefficient of Variation (CV) indicates that the data is more what?
Precise, Accurate, Variable, Random`,
  `question: Describe components of Quality Assurance in hematology. Page 225. What term describes how close a result is to the true value?
Accuracy, Precision, Reliability, Validity`,
  `question: Describe components of Quality Assurance in hematology. Page 225. What term describes the reproducibility and repeatability of test samples using the same methodology?
Precision, Accuracy, Consistency, Specificity`,
  `question: Describe components of Quality Assurance in hematology. Page 225. The target image showing results that are not accurate but are precise would be which one?
B, A, C, None`,
  `question: Describe components of Quality Assurance in hematology. Page 225. What type of testing involves analyzing samples with unknown values to assess laboratory performance?
Proficiency testing, Quality control testing, Calibration testing, Validation testing`,
  `question: Describe components of Quality Assurance in hematology. Page 225. Military laboratories exclusively utilize which organization for accreditation and proficiency testing?
College of American Pathologists (CAP), The Joint Commission (TJC), Clinical Laboratory Improvement Amendments (CLIA), American Association of Blood Banks (AABB)`,
  `question: Explain analytical quality indicators for hematology analyzers. Page 226. What analytical procedure ensures the accuracy of an analyte by setting the instrument to known values?
Calibration, Quality control, Validation, Verification`,
  `question: Explain analytical quality indicators for hematology analyzers. Page 226. How often is calibration typically required or as recommended by the manufacturer?
Every 6 months, Every day, Every week, Every year`,
  `question: Explain analytical quality indicators for hematology analyzers. Page 226. Calibration is required after instrument installation after major maintenance and when there is doubt of what?
Accuracy, Precision, Linearity, Specificity`,
  `question: Explain analytical quality indicators for hematology analyzers. Page 226. What process verifies the accuracy and precision of an instrument and ensures it is in good working condition?
Quality control, Calibration, Preventive maintenance, Proficiency testing`,
  `question: Explain analytical quality indicators for hematology analyzers. Page 226. Quality control must be performed after calibration after a new reagent lot and after what else?
A set amount of time, Every patient sample, Every 100 samples, A power outage`,
  `question: Explain analytical quality indicators for hematology analyzers. Page 226. To establish a new mean for a quality control lot how many data points are required at a minimum?
20, 10, 30, 50`,
  `question: Explain analytical quality indicators for hematology analyzers. Page 226. How often should daily controls typically be run in a busy laboratory setting?
Every 8 hrs, Once a day, Every 12 hrs, Twice a week`,
  `question: Explain analytical quality indicators for hematology analyzers. Page 226. For daily controls to be acceptable their values must fall within what range of the mean?
±2SD, ±1SD, ±3SD, ±2.5SD`,
  `question: Explain analytical quality indicators for hematology analyzers. Page 226. If a control result is not within the acceptable range what is the immediate action that must be taken?
Patient results cannot be reported, Rerun the patient samples, Calibrate the instrument, Call for service`,
  `question: Explain analytical quality indicators for hematology analyzers. Page 226. After an error with a control has been investigated and resolved what must be done before running patient samples?
Rerun the controls, Document the error, Calibrate the instrument, Run a proficiency test`,
  `question: Explain analytical quality indicators for hematology analyzers. Page 226. What do multiple data points for a control help to detect?
Shift or trend, Random errors, Instrument failure, Sample mix-ups`,
  `question: Apply quality assurance principles to patient testing. Page 227. Ensuring that a patient's sample label is legible and matches the request form is part of which phase of testing?
Pre-Analytical, Analytical, Post-Analytical, Reporting`,
  `question: Apply quality assurance principles to patient testing. Page 227. Checking a sample for the proper anticoagulant to blood ratio to avoid underfill or overfill issues is a check of what?
Specimen integrity, Patient identification, Sample quality, Collection time`,
  `question: Apply quality assurance principles to patient testing. Page 227. Making sure that blood samples are properly mixed by inverting or using a rotator is part of which testing phase?
Pre-Analytical, Analytical, Post-Analytical, Data entry`,
  `question: Apply quality assurance principles to patient testing. Page 227. Ensuring that quality control materials are within their acceptable limits before running patient samples is part of which phase?
Analytical, Pre-Analytical, Post-Analytical, Archiving`,
  `question: Apply quality assurance principles to patient testing. Page 227. If all patient samples run in a batch exhibit similar abnormal results it may be indicative of what type of errors?
Accuracy or precision errors, Patient-specific issues, Sample collection errors, Clerical errors`,
  `question: Apply quality assurance principles to patient testing. Page 227. What is the term for a message from an analyzer that indicates a result requires further action or review?
Flag, Alert, Warning, Error code`,
  `question: Apply quality assurance principles to patient testing. Page 227. What is it called when an abnormal result from an analyzer automatically triggers an order for additional testing through the LIS?
Reflex testing, Delta check, Critical value reporting, Manual review`,
  `question: Apply quality assurance principles to patient testing. Page 228. What is the term for a historical comparison of a patient's current laboratory results with their previous results?
Delta checks, Trend analysis, Retrospective review, Longitudinal analysis`,
  `question: Apply quality assurance principles to patient testing. Page 228. Delta checks are particularly useful for identifying what type of errors?
Pre-analytical errors, Analytical errors, Post-analytical errors, Instrument malfunctions`,
  `question: Apply quality assurance principles to patient testing. Page 228. What is the term for a patient result that is so far outside the reference range that it may be life-threatening?
Critical value, Abnormal value, Flagged result, Panic value`,
  `question: Apply quality assurance principles to patient testing. Page 228. Who is responsible for establishing the critical value thresholds at a given facility?
A hospital committee, The laboratory director, The instrument manufacturer, A government agency`,
  `question: Apply quality assurance principles to patient testing. Page 228. What is the term for checks that compare the interrelations between different tests and measurements within a test?
Multivariate Checks, Delta Checks, Quality Control Checks, System Checks`,
  `question: Apply quality assurance principles to patient testing. Page 228. The "Rule of Three" is a multivariate check that examines the correlation of erythrocyte indices with what test?
CBC, Peripheral blood smear, Reticulocyte count, ESR`,
  `question: Apply quality assurance principles to patient testing. Page 227. What does the acronym LIS stand for in a laboratory setting?
Laboratory Information System, Laboratory Instrument Service, Localized Information Standard, Lab Integrated Software`,
  `question: Describe components of Quality Assurance in hematology. Page 225. Based on the target diagrams what does target C represent?
Accurate and precise, Neither accurate nor precise, Not accurate but precise, Accurate but not precise`,
  `question: Describe components of Quality Assurance in hematology. Page 223. The hemoglobin standard of 12g/100mL is an example of a what?
Calibrator, Control, Reagent, Diluent`,
  `question: Describe components of Quality Assurance in hematology. Page 224. What percentage of measured values fall within the mean and +/- 3SD from the mean?
99.7%, 95.5%, 68.6%, 100%`,
  `question: Apply quality assurance principles to patient testing. Page 227. An analyzer flag may use numbers letters or what else to indicate a need for further action?
Symbols, Colors, Sounds, Barcodes`,
  `question: Describe components of Quality Assurance in hematology. Page 225. Proficiency testing is required by what regulatory amendment?
CLIA, HIPAA, OSHA, CAP`,
  `question: Explain analytical quality indicators for hematology analyzers. Page 226. What is a common way to obtain the 20 data points needed to establish a new control mean?
2 runs per day for 10 days, 1 run per day for 20 days, 4 runs per day for 5 days, 5 runs per day for 4 days`,
  `question: Apply quality assurance principles to patient testing. Page 227. Improperly mixed samples can cause erroneous results. Samples can be mixed by a rotator or by what other method?
Inversion, Shaking, Vortexing, Stirring`,
  `question: Apply quality assurance principles to patient testing. Page 228. Delta checks are usually performed automatically by what system?
LIS, The analyzer, The middleware, The EHR`,
  `question: Apply quality assurance principles to patient testing. Page 228. A key multivariate check is reviewing the correlation between the CBC and what other test?
Peripheral blood smear, Bone marrow aspirate, Reticulocyte count, Hemoglobin electrophoresis`,
  `question: Describe components of Quality Assurance in hematology. Page 224. A Levey-Jennings chart is used to plot and visualize what type of data?
Statistical Quality Control, Patient results, Calibration data, Proficiency testing results`,
  `question: Explain analytical quality indicators for hematology analyzers. Page 226. If an unusual trend or shift is observed in quality control data what should be established?
A new mean, A new calibrator, A new reagent lot, A new instrument`,
  `question: Describe components of Quality Assurance in hematology. Page 225. In proficiency testing are the values of the challenge samples known to the laboratory?
No, Yes, Sometimes, Only for certain tests`
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