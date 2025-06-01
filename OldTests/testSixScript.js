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
  `question: What is clinical laboratory testing that is conducted close to the site of patient care called?
Point-of-care testing POCT, Central laboratory testing, Reference laboratory testing, Send-out testing`,

  `question: Point-of-care testing POCT refers to any testing performed outside of what traditional laboratory setting?
The core or central laboratory, The physician office laboratory, The research laboratory, The outpatient clinic`,

  `question: Regulatory guidelines for POCT address training quality control documentation and what else to ensure quality results?
Quality assurance, Cost-effectiveness, Patient convenience, Instrument portability`,

  `question: Which of these is another term used to describe POCT?
Alternate site testing, Core lab testing, High-complexity testing, Batch testing`,

  `question: Ancillary testing and bedside testing are other terms used to describe what type of laboratory testing?
Point-of-care testing POCT, Centralized testing, Proficiency testing, Confirmatory testing`,

  `question: Is the emergency room a common environment where POCT might be employed?
Yes, No POCT is for outpatient only, Only for waived tests, Only if central lab is closed`,

  `question: Can POCT be performed in a paramedical support vehicle like an ambulance or helicopter?
Yes, No only in fixed locations, Only if results are not critical, Only by a certified lab scientist`,

  `question: One advantage of POCT is a reduced turnaround time for test results. True or False?
True, False, Only for STAT samples, Depends on the analyte`,

  `question: Does POCT typically lead to improved patient management due to faster results?
Yes, No result speed does not impact management, Only in critical care units, Only if results are manually entered`,

  `question: Reduced preanalytical errors due to immediate sample processing can be an advantage of what testing methodology?
POCT, Centralized batch testing, Manual testing methods, Reference lab testing`,

  `question: Is a reduction in the volume of blood needed for testing considered an advantage of POCT?
Yes, No POCT requires larger volumes, Only for pediatric patients, Volume reduction is negligible`,

  `question: Is a potential disadvantage of POCT the higher cost per test compared to central lab testing?
Yes, No POCT is always cheaper, Costs are identical, Only if reagents are expensive`,

  `question: Can maintaining adequate quality control and quality assurance be a challenge or disadvantage for POCT programs?
Yes, No QC is simpler for POCT, QA is not required for POCT, Only if staff are poorly trained`,

  `question: Is ensuring proper documentation and record keeping typically easier or more challenging with POCT compared to a central LIS?
More challenging, Easier due to fewer tests, The same as central lab, Not required for POCT`,

  `question: The use of non-laboratorians for POCT testing may require significant effort in what areas?
Training and competency assessment, Scheduling and payroll, Equipment purchasing, Test menu selection`,

  `question: How does CLIA '88 categorize tests based on complexity?
Waived and nonwaived moderate or high complexity, Simple and complex only, Automated and manual, STAT and routine`,

  `question: Many POCT methods fall into which CLIA category of test complexity?
Waived, High complexity only, Moderate complexity only, Non-regulated`,

  `question: Does POCT regardless of complexity level require adherence to good laboratory practices including QC and QA?
Yes, No waived tests are exempt from QC, Only if non-waived, QA is optional for POCT`,

  `question: What must be established and followed for each POCT device concerning quality control?
Manufacturer's recommendations and laboratory-defined QC procedures, Daily calibration only, Weekly proficiency testing, Annual maintenance only`,

  `question: Who is typically responsible for establishing and overseeing a POCT program within an institution?
The laboratory, The nursing department, The hospital administration, Individual physicians`,

  `question: To ensure quality POCT results what must be addressed regarding personnel performing the tests?
Training competency and adherence to procedures, Only initial training, Annual certification only, Their medical specialty`,

  `question: One characteristic of POCT devices is often their portability. True or False?
True, False they are usually large, Only for glucose meters, This is not a typical characteristic`,

  `question: What does LIS stand for in the context of a clinical laboratory?
Laboratory Information System, Laboratory Instrumentation Service, Lab Integrated Software, Local Information Server`,

  `question: What is a computer network of hardware and software for managing and sharing laboratory information?
Laboratory Information System LIS, Hospital Information System HIS, Electronic Medical Record EMR, Picture Archiving and Communication System PACS`,

  `question: An LIS can assist with managing patient demographics test orders and what else related to results?
Results reporting and storage, Only test orders, Only patient billing, Only instrument maintenance logs`,

  `question: What is one of the primary functions of an LIS in the preanalytical phase of testing?
Patient identification and test order entry, Performing the actual test, Calibrating instruments, Storing historical QC data`,

  `question: How does an LIS typically handle specimen tracking and management?
Using barcoding and accession numbers, Manual logbooks only, Verbal communication, Color-coded tubes only`,

  `question: Generating specimen collection lists and labels is a function of what laboratory system?
LIS, HIS, PACS, HRIS`,

  `question: In the analytical phase how can an LIS improve productivity and decrease errors with automated instruments?
By interfacing these instruments to the LIS, By requiring manual result entry for all tests, By limiting access to authorized personnel only, By scheduling daily maintenance`,

  `question: What does automated results entry from an interfaced instrument to an LIS reduce?
Transcription errors and personnel time, Instrument downtime, Reagent costs, Sample carryover`,

  `question: Can an LIS be programmed to flag results that are outside established reference ranges or critical values?
Yes, No this is a manual process, Only if integrated with HIS, Only for STAT results`,

  `question: What is the process by which an LIS allows previously performed test results for a patient to be accessed?
Retrieval of historical data, Archiving of old records, Batch processing, Data mining`,

  `question: In the postanalytical phase what is a key role of the LIS regarding test results?
Results reporting and delivery, Final instrument shutdown, Reagent inventory management, Staff performance evaluation`,

  `question: How have Electronic Medical Record EMR systems integrated with LIS affected test result availability?
Reduced delays to seconds, Increased delays due to data transfer, No significant impact on delays, Made paper reports obsolete immediately`,

  `question: Computer reporting and retrieval of laboratory results via LIS/EMR have virtually replaced paper reports reducing what?
Personnel time and errors associated with manual transmission, The need for printers, The cost of paper, The storage space for charts`,

  `question: What is the term for the range of analyte concentrations a method can directly measure without dilution or concentration?
Analytical Measurement Range AMR, Limit of Detection LOD, Limit of Quantitation LOQ, Reportable Range RR`,

  `question: What is defined as the smallest concentration of an analyte that can be reliably measured by an analytical procedure?
Limit of Quantitation LOQ or Limit of Detection LOD, Limit of Linearity LOL, Upper limit of normal ULN, Critical low value CLV`,

  `question: The process of testing materials with known analyte concentrations to ensure a method performs as expected is called?
Calibration verification, Proficiency testing, Quality control, Method validation`,

  `question: What does system integration refer to in the context of LIS HIS and EMR?
The linking of these computer systems to share data, The physical location of servers, The use of a single vendor for all systems, The type of network cables used`,

  `question: Does an LIS typically have features for managing quality control data including storing results and generating charts?
Yes, No QC data is managed separately, Only for manual QC entry, Only if a specific QC module is purchased`,

  `question: What is a delta check in the context of LIS functionality?
Comparison of a patient's current test result with their previous results, A check of instrument calibration, A verification of QC material integrity, A comparison of results between two instruments`,

  `question: Can an LIS assist in managing reagent inventory and lot numbers?
Yes, No this is a manual process, Only for high-volume tests, Only if barcoded reagents are used`,

  `question: User access levels and security are important features of which laboratory system to ensure data confidentiality?
LIS, POCT devices, Autoclaves, Centrifuges`,

  `question: What is autoverification in an LIS?
Automated release of test results based on predefined criteria without manual review, Manual verification by two technologists, Verification of patient identity by barcode, Automated instrument self-calibration`,

  `question: What is a requirement for POCT devices that are connected to an LIS or EMR for data transmission?
Ensuring data integrity and security, Using wireless transmission only, Manual data entry as a backup, Daily data synchronization`,

  `question: Can POCT results be directly transmitted to a patient's EMR if the POCT device is interfaced?
Yes, No all POCT results require manual entry, Only if the EMR is cloud-based, Only for glucose results`,

  `question: What is an advantage of interfacing POCT devices with an LIS/EMR?
Improved data accuracy and reduced transcription errors, Increased cost per test, Slower result availability, Greater need for manual data review`,

  `question: What is a critical aspect of LIS implementation and maintenance?
Regular data backups and disaster recovery plans, Using the oldest available hardware, Limiting user access to a single person, Avoiding software updates`,

  `question: Compliance with regulations like HIPAA regarding patient data privacy is a crucial aspect of managing what system?
LIS, Centrifuge maintenance logs, Reagent ordering system, Staff work schedules`,

  `question: Can an LIS generate workload statistics and management reports?
Yes, No these are generated by accounting software, Only if specific reporting modules are active, Only for manual tests`,

  `question: Interfacing with billing systems is often a capability of which laboratory system?
LIS, HIS (Hospital Information System often handles billing), POCT data manager, QC software`,

  `question: What type of LIS error can occur if patient demographic information is entered incorrectly?
Preanalytical error, Analytical error, Postanalytical error, Instrument error`,

  `question: If an interfaced instrument transmits an incorrect result to the LIS this is primarily what type of error?
Analytical error, Preanalytical error, Postanalytical error, Clerical error`,

  `question: If a correct result is in the LIS but is reported to the wrong patient chart this is what type of error?
Postanalytical error, Analytical error, Preanalytical error, Instrument error`,

  `question: One of the main benefits of an LIS is the reduction of what type of errors?
Manual data entry and transcription errors, Instrument mechanical failures, Reagent degradation issues, Sample collection errors`,

  `question: What is a common method for identifying specimens and linking them to test orders within an LIS?
Barcode scanning, Handwritten labels only, Verbal confirmation, Color-coded caps only`,

  `question: Does POCT eliminate the need for quality control testing?
No quality control is still required, Yes for waived tests, Only non-waived POCT needs QC, QC is optional for POCT`,

  `question: The selection of POCT devices should consider factors like ease of use accuracy and what other important aspect?
Connectivity to LIS or EMR, Portability only, Cost only, Brand name`,

  `question: Training and competency assessment for personnel performing POCT is whose responsibility?
The laboratory director or designee, The instrument manufacturer, The nursing supervisor only, The individual operator`,

  `question: What is a key advantage of POCT in terms of patient care decisions?
Faster availability of results enabling quicker decisions, Lower cost of testing, Reduced need for skilled operators, Increased test menu availability`
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