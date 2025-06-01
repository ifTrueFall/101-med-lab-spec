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
  `question: What program regulates laboratories that test human specimens ensuring accurate reliable and timely results?
Clinical Laboratory Improvement Amendments of 1988 CLIA, Occupational Safety and Health Administration OSHA, Food and Drug Administration FDA, College of American Pathologists CAP`,

  `question: What is the term for the rupture or destruction of red blood cells causing release of intracellular contents?
Hemolysis, Lipemia, Icterus, Glycolysis`,

  `question: What is the testing of unknown specimens sent to a third party for evaluation called?
Proficiency Testing PT, Quality Control QC, Quality Assessment QA, Calibration Verification`,

  `question: In the testing laboratory quality is interpreted as compliance with specifications and meeting customers expectations. True or False?
True, False, Only for waived tests, Only for research labs`,

  `question: What is the evaluation of lab results using known standards and proficiency panels to validate QC and QA programs?
Quality Assessment, Quality Control, Quality Planning, Quality Improvement`,

  `question: What generic term refers to monitoring and assessment of laboratory testing processes to identify problems and maintain performance?
Quality Control QC, Quality System QS, Quality Assessment QA, Total Quality Management TQM`,

  `question: What is a formalized system that documents processes procedures and responsibilities for achieving quality policies and objectives?
Quality System, Standard Operating Procedure, Proficiency Test, Control Chart`,

  `question: What is a set of values including upper and lower limits of a lab test based on a group of otherwise healthy individuals?
Reference Range, Control Limit, Action Limit, Therapeutic Range`,

  `question: What is a set of written instructions describing in detail how to perform a laboratory process safely and effectively?
Standard Operating Procedure SOP, Quality Manual QM, Laboratory Information System LIS, Test Requisition TR`,

  `question: What management approach aims for long-term success through customer satisfaction?
Total Quality Management TQM, Lean Six Sigma LSS, Continuous Quality Improvement CQI, Project Management PM`,

  `question: What term encompasses the entire testing process including preanalytical analytical and postanalytical steps?
Total Testing Process, Analytical Phase Only, Specimen Journey, Result Pathway`,

  `question: What is the amount of time between when a specimen is received by the laboratory and when results are available?
Turnaround Time TAT, Processing Time PT, Analysis Duration AD, Reporting Interval RI`,

  `question: What is the main purpose of the Clinical Laboratory Improvement Amendments CLIA of 1988?
Outline minimum requirements for clinical laboratory operation in the US, Set prices for laboratory tests, Mandate specific laboratory equipment, Define research protocols`,

  `question: CLIA '88 defines clinical laboratories as any facility performing tests on human specimens for what purpose?
Diagnosis prevention or treatment of disease or health assessment, Research purposes only, Forensic analysis only, Educational training only`,

  `question: Under CLIA laboratory testing may be classified as either waived or what other category?
Nonwaived, Unregulated, Experimental, Complex only`,

  `question: Waived tests are simple lab exams cleared by the FDA for what type of use?
Home use, Hospital use only, Research use only, Emergency use only`,

  `question: Nonwaived tests are moderately and highly complex tests defined by requirements for operator skill reagent preparation automation and what else?
Difficulty of interpretation of results, Cost of the test, Speed of the test, Size of the instrument`,

  `question: Laboratories performing nonwaived testing are regulated under guidelines covering quality standards for proficiency testing patient test management quality control personnel qualifications and what else?
Quality assurance, Laboratory safety, Billing practices, Instrument maintenance`,

  `question: What is considered the principal outcome measure in the CLIA regulatory process?
Proficiency testing PT, Turnaround time TAT, Cost per test CPT, Patient satisfaction scores`,

  `question: How often does CLIA mandated proficiency testing typically consist of challenges for each test?
Five challenges three times a year, Three challenges five times a year, One challenge annually, Monthly challenges`,

  `question: What is the primary goal of CLIA regulation regarding proficiency testing failures?
Educational rather than punitive, Strictly punitive with immediate closure, Focused on cost recovery, To increase testing volume`,

  `question: Quality management in healthcare laboratories is founded on the principles of quality management assurance and what else?
Control, Cost reduction, Speed, Automation`,

  `question: Quality is defined as conformance to the requirements of users or customers and the satisfaction of their what?
Needs and expectations, Financial constraints, Time limitations, Prescribed treatment`,

  `question: What concept and principles have become the basis for managing cost reduction and quality improvement in clinical labs?
Total Quality Management TQM, Just In Time JIT inventory, Management by Objectives MBO, Re-engineering`,

  `question: What are the five components of the quality management process that work together in a feedback loop?
Quality Laboratory Processes Quality Control Quality Assessment Quality Improvement Quality Planning, Preanalytical Analytical Postanalytical Reporting Billing, Personnel Equipment Reagents Procedures Records, Standards Calibrators Controls Patients Results`,

  `question: What do Quality Laboratory Processes QLPs include?
Analytical processes and general policies practices and procedures, Only analytical procedures, Only personnel training, Only instrument calibration`,

  `question: Quality Control QC emphasizes statistical control procedures and what other types of checks?
Non-statistical checks like linearity reagent and temperature checks, Only Levy-Jennings charts, Only Westgard rules, Only proficiency testing`,

  `question: What does Quality Control QC help monitor and estimate regarding errors?
Sources of error and magnitude of errors, Only the number of errors, Only errors by new staff, Only errors in billing`,

  `question: Quality Assessment QA is a complete system aimed at providing the most reliable patient lab results and minimizing errors in which phases?
Preanalytical analytical and postanalytical phases, Analytical phase only, Preanalytical phase only, Postanalytical phase only`,

  `question: QA is concerned with broader measures and monitors laboratory performance such as turnaround time specimen ID patient ID and what else?
Test utility, Cost of reagents, Staff overtime, Instrument downtime`,

  `question: Quality Improvement QI is a systematic formal approach to the analysis of practice performance and efforts to do what?
Improve performance, Reduce staff, Increase test volume, Automate all processes`,

  `question: What is the purpose of Quality Planning QP?
Standardize quality improvements establish monitoring measures ensure performance satisfies requirements and document new QLPs, Plan daily work schedules, Order new equipment, Set budget allocations`,

  `question: The total testing process is a framework used for identifying and reducing errors in how many phases of laboratory testing?
Three phases, Two phases, Four phases, One phase`,

  `question: What does the preanalytical phase refer to?
Everything creating an impact on the patient specimen before it is tested, Only the specimen collection process, The actual testing of the analyte, The reporting of results`,

  `question: What can happen if a patient and specimen are not correctly identified or handled properly?
The specimen wont be worthy of testing, The analytical phase will correct it, The postanalytical phase will catch it, Results will be slightly off`,

  `question: Suitable transport conditions like ice water or protection from light may be necessary to preserve what in a specimen?
Certain analytes, The specimen container, The patient's identity, The test requisition form`,

  `question: What does the analytical phase refer to?
Everything creating an impact on the patient specimen during the testing of the analyte, Only instrument calibration, Only reagent preparation, Only data entry`,

  `question: Maintaining instrument function and testing known QC samples along with unknown samples are part of which phase?
Analytical Phase, Preanalytical Phase, Postanalytical Phase, Quality Planning Phase`,

  `question: What do postanalytical variables affect?
Patient results in the reporting stage, Specimen collection quality, Instrument calibration accuracy, Reagent stability`,

  `question: Reporting patient results in a timely manner and in an accepted format that can be correctly interpreted is part of which phase?
Postanalytical Phase, Analytical Phase, Preanalytical Phase, Quality Control Phase`,

  `question: Some specimen variations like photodegradation of bilirubin by light or heat lability of enzymes are what type of variables?
Preanalytical variables, Analytical variables, Postanalytical variables, Control variables`,

  `question: If there is any question as to the integrity or identification of a sample what should the laboratory do?
Reject the sample and request recollection, Test it anyway with a disclaimer, Use half the sample volume, Call the physician for advice`,

  `question: Who is responsible for minimizing preanalytical errors based on acceptance or rejection of received specimens even if they did not collect them?
Laboratory personnel, Only the phlebotomist who collected it, The attending physician, The hospital administration`,

  `question: Quality control QC is an aspect of Quality Assessment QA that is used to assess which phase of patient testing?
Analytical phase, Preanalytical phase, Postanalytical phase, Entire testing process equally`,

  `question: QC samples are solutions of chemicals of known concentration that mimic what?
A patients specimen, Pure water, Highly concentrated standards, Diluted reagents`,

  `question: Federal regulations require how many QC samples to be analyzed at least once per day for each analyte?
Two QC samples, One QC sample, Three QC samples, Four QC samples`,

  `question: What types of errors can the measurement of QC samples detect over time?
Problems of precision and accuracy, Only transcription errors, Only patient identification errors, Only billing errors`,

  `question: Interpretation of control results is based on using specific rules for acceptance and rejection of QC results documenting results and what else?
Having a process for resolving problems that result in rejection, Immediately rerunning all patient samples, Changing the control lot number, Adjusting the mean of the control`,

  `question: Patient-related factors such as ambulation time of day age and gender are considered what type of variables?
Preanalytical variables, Analytical variables, Postanalytical variables, Constant variables`,

  `question: Collection of specimens after strenuous exercise can impact total proteins lipids and what other substances?
Other protein-bound substances, Glucose levels only, Electrolytes only, Blood gases only`,

  `question: Intake of food greatly impacts glucose triglycerides certain hormones and what else?
Electrolytes, Blood cell counts, Enzyme activities, Drug levels unrelated to food`,

  `question: Laboratories are required to participate in external programs that send unknown samples for analysis. What are these programs called?
Proficiency testing programs, Calibration verification programs, Quality assessment initiatives, Interlaboratory comparison studies`,

  `question: Acceptable performance in proficiency testing programs is required by CAP CLIA and TJC to maintain what?
Laboratory accreditation, Individual staff certification, Instrument warranties, Reagent discounts`,

  `question: When a laboratory performs proficiency testing how should the unknown samples be analyzed?
In the same manner as patient specimens, With extra QC and calibration, By supervisory staff only, After all patient samples are done`,

  `question: What is a strict requirement regarding proficiency test values or samples during the testing cycle?
They must not be shared with other laboratories, They should be discussed with peers for consensus, They can be sent to reference labs for confirmation, They should be analyzed multiple times`,

  `question: Proficiency testing allows each laboratory to compare its test results with those of other laboratories using the same or similar what?
Instruments and methods, Staffing levels, Budgets, Geographical locations`,

  `question: If a laboratory produces more than two incorrect results for any analyte in a PT survey it is considered what?
On probation, Suspended, Excellent, In need of retraining only`,

  `question: What is the main purpose of a Standard Operating Procedure SOP?
To ensure consistency accuracy and quality of data by providing step-by-step instructions, To list all available tests in the lab, To document staff training records, To detail budget and inventory`,

  `question: Which of these is a common section found in an SOP?
Purpose of the SOP, List of all laboratory employees, Manufacturer contact information, Cost analysis of the procedure`,

  `question: The scope of an SOP defines what?
To whom or what the particular set of procedures applies, The historical background of the procedure, The time required to perform the procedure, The limitations of the instrument used`
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