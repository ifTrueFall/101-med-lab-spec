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
  `question: Discuss the general guidelines for establishing a microbiology QC program. What is the definition of quality control (QC)? Page 32.
Measures to ensure medical reliability of lab data, Taking measures to ensure high-quality patient care, A proactive process of ensuring quality of health care, Actual laboratory testing`,
  `question: Discuss the general guidelines for establishing a microbiology QC program. Which of the following is considered a preanalytical activity? Page 32.
Test ordering and specimen collection, Actual laboratory testing, Result review, Result delivery`,
  `question: Discuss the general guidelines for establishing a microbiology QC program. Actual laboratory testing falls into which category of activity? Page 32.
Analytical, Preanalytical, Postanalytical, Clerical`,
  `question: Discuss the general guidelines for establishing a microbiology QC program. Which of the following is considered a postanalytical activity? Page 32.
Result review and delivery, Test ordering, Specimen collection, Actual laboratory testing`,
  `question: Discuss the general guidelines for establishing a microbiology QC program. What is the term for taking measures to ensure high-quality patient care? Page 32.
Quality assurance (QA), Quality control (QC), Performance improvement (PI), Analytical activity`,
  `question: Discuss the general guidelines for establishing a microbiology QC program. The Joint Commission (TJC) replaced the term Quality Assurance with what more proactive process? Page 32.
Performance Improvement (PI), Quality Control (QC), Risk Management, Corrective Action`,
  `question: Discuss the general guidelines for establishing a microbiology QC program. How often are temperature checks required on temperature-dependent equipment like incubators and refrigerators? Page 32.
Daily, Weekly, Monthly, Annually`,
  `question: Discuss the general guidelines for establishing a microbiology QC program. What type of thermometers should be used for QC temperature monitoring? Page 32.
NIST-calibrated, Mercury-based, Digital-only, Uncalibrated`,
  `question: Discuss the general guidelines for establishing a microbiology QC program. Thermometers used for QC should be based on what substance rather than hazardous mercury? Page 32.
Alcohol, Gallium, Silicone, Water`,
  `question: Discuss the general guidelines for establishing a microbiology QC program. When is a new thermometer calibrated against a NIST-certified thermometer? Page 33.
Upon arrival and not again until certificate expiration, Daily, Weekly, Annually`,
  `question: Discuss the general guidelines for establishing a microbiology QC program. Which of the following is an example of preventive maintenance for laboratory equipment? Page 33.
Replacing filters, Running daily controls, Verifying temperatures, Documenting errors`,
  `question: Discuss the general guidelines for establishing a microbiology QC program. According to CLSI document M22-A2 how long must media QC records be maintained? Page 33.
2 years, 6 months, 1 year, 5 years`,
  `question: Discuss the general guidelines for establishing a microbiology QC program. Which of the following is an example of a complex medium that requires further QC by the hospital laboratory? Page 33.
Chocolate agar, Blood agar, MacConkey agar, Nutrient agar`,
  `question: Discuss the general guidelines for establishing a microbiology QC program. Besides performance and sterility what is another factor that should be recorded for media QC? Page 33.
Free of moisture, Correct price, Correct manufacturer, Correct lot number`,
  `question: Discuss the general guidelines for establishing a microbiology QC program. For complex or in-house made media QC organisms should be chosen based on what characteristic? Page 33.
They should be the most fastidious, They should be the most common, They should be non-pathogenic, They should grow the fastest`,
  `question: Discuss the general guidelines for establishing a microbiology QC program. How often must reagents be tested with positive and negative controls? Page 33.
Each day of use, Once per week, Once per new lot, Only when problems are suspected`,
  `question: Discuss the general guidelines for establishing a microbiology QC program. Which of the following is an example of a reagent that requires daily QC? Page 34.
Optochin, Gram stain, Saline, Immersion oil`,
  `question: Discuss the general guidelines for establishing a microbiology QC program. Antimicrobial susceptibility QC must be performed using specific control strains from what source? Page 34.
ATCC, Patient isolates, Environmental samples, Commercial proficiency panels`,
  `question: Discuss the general guidelines for establishing a microbiology QC program. Which of the following is a variable that can affect antimicrobial susceptibility testing? Page 34.
Agar depth, Room temperature, Personnel experience, Time of day`,
  `question: Discuss the general guidelines for establishing a microbiology QC program. According to CLSI standards what is the required frequency for susceptibility testing controls after the initial 20-30 day validation period? Page 34.
Weekly, Daily, Monthly, Bi-weekly`,
  `question: Discuss the general guidelines for establishing a microbiology QC program. How long must susceptibility QC records be kept after the discontinuation of an antimicrobial agent? Page 34.
2 years, 6 months, 1 year, 5 years`,
  `question: Discuss the general guidelines for establishing a microbiology QC program. The ATCC strain of Pseudomonas aeruginosa is used to monitor the content of which cations in susceptibility testing media? Page 34.
Ca2+ and Mg2+, Na+ and K+, Fe2+ and Zn2+, H+ and Cl-`,
  `question: Discuss the general guidelines for establishing a microbiology QC program. The ATCC strain of Enterococcus faecalis is used to monitor for what substance that can cause false resistance to certain drugs? Page 34.
Thymidine, Calcium, Magnesium, Agar`,
  `question: Discuss the general guidelines for establishing a microbiology QC program. Which of the following is a method used to assess personnel competency? Page 35.
Direct observation, Peer reviews, Self-assessment, Patient feedback`,
  `question: Discuss the general guidelines for establishing a microbiology QC program. How often must personnel competency be evaluated using proficiency testing? Page 35.
At least twice per year, Once per year, Quarterly, Monthly`,
  `question: Discuss the general guidelines for establishing a microbiology QC program. How should proficiency testing samples be treated in the lab? Page 35.
The same as all patient samples, With special care and attention, By a supervisor only, By the most experienced technologist`,
  `question: Discuss the general guidelines for establishing a microbiology QC program. Where must proof of annual competency reverification be maintained? Page 35.
In the personnel file, In the QC logbook, With the laboratory director, In a central database`,
  `question: Discuss the general guidelines for establishing a microbiology QC program. What is the purpose of continuing education (CE) for laboratory personnel? Page 35.
To keep skills current, To meet annual training requirements, To get a promotion, To learn about new equipment`,
  `question: Discuss the general guidelines for establishing a microbiology QC program. Which of the following is a valid source for stock cultures used in QC? Page 37.
Commercial sources like ATCC, Leftover patient samples, Environmental swabs, Expired proficiency samples`,
  `question: Discuss the general guidelines for establishing a microbiology QC program. When preparing stock cultures the broth used should not contain what? Page 37.
Sugars, Peptones, Salts, Water`,
  `question: Discuss the general guidelines for establishing a microbiology QC program. What is an example of a broth suitable for storing stock cultures? Page 37.
Schaedler broth with glycerol, Thioglycolate broth, Brain-heart infusion broth, Nutrient broth`,
  `question: Discuss the general guidelines for establishing a microbiology QC program. What is the ideal long-term storage method for stock cultures to ensure viability? Page 37.
Lyophilized (freeze-dried), Refrigerator at 4 C, Incubator at 35 C, Room temperature`,
  `question: Discuss the general guidelines for establishing a microbiology QC program. How often should the laboratory's QC manual be reviewed? Page 37.
At least once a year, Every two years, Only when procedures change, Daily`,
  `question: Discuss the general guidelines for establishing a microbiology QC program. Who is responsible for making revisions to the QC manual as needed? Page 37.
A supervisor, The newest employee, The lab director, An external auditor`,
  `question: Discuss the general guidelines for establishing a microbiology QC program. Which of the following is NOT an agency that emphasizes Performance Improvement? Page 37.
FDA, TJC, CAP, CLIA`,
  `question: Discuss the general guidelines for establishing a microbiology QC program. What is a key principle of Performance Improvement (PI)? Page 37.
Problems are an opportunity for improvement, Problems are the fault of individuals, Problems should be documented and filed, Problems require disciplinary action`,
  `question: Discuss the general guidelines for establishing a microbiology QC program. Which type of PI monitor is easier for spotting disruptions in a process? Page 37.
Process monitors, Outcome monitors, Focused monitors, Random monitors`,
  `question: Discuss the general guidelines for establishing a microbiology QC program. Patient complications are an example of which type of PI monitor? Page 38.
Outcome monitors, Process monitors, Focused monitors, Daily monitors`,
  `question: Discuss the general guidelines for establishing a microbiology QC program. A monitor that is created in response to a suspected problem is known as what? Page 38.
A focused monitor, An outcome monitor, A process monitor, A threshold monitor`,
  `question: Discuss the general guidelines for establishing a microbiology QC program. In the PI model what does the "Plan" step involve? Page 38.
A coordinated organization-wide approach, Systematic data collection, Reviewing collected data, Redesigning processes`,
  `question: Discuss the general guidelines for establishing a microbiology QC program. In the PI model what does the "Measure" step involve? Page 38.
Systematic data collection, A coordinated approach, Reviewing collected data, Redesigning processes`,
  `question: Discuss the general guidelines for establishing a microbiology QC program. In the PI model what does the "Improve" step involve? Page 38.
Redesigning processes based on assessments, Systematic data collection, A coordinated approach, Reviewing collected data`,
  `question: Discuss the general guidelines for establishing a microbiology QC program. Which of the following is a measurable process that can be monitored for performance improvement? Page 38.
Specimen handling, Laboratory budget, Staff morale, Employee vacation time`,
  `question: Discuss the general guidelines for establishing a microbiology QC program. What is the purpose of a Problem/Action Form? Page 38.
To document issues and their resolution, To order new supplies, To request time off, To report equipment failure`,
  `question: Discuss the general guidelines for establishing a microbiology QC program. Which of the following is a key part of a Problem/Action Form? Page 39.
Corrective action, Employee signature, Cost of the error, Patient name`,
  `question: Discuss the general guidelines for establishing a microbiology QC program. Which of the following is considered a "customer" of the clinical laboratory? Page 39.
Patients, Vendors, Competitors, The media`,
  `question: Discuss the general guidelines for establishing a microbiology QC program. A physician's perception of quality in a lab is most often related to what? Page 40.
Turnaround time, Accuracy, Cost-effectiveness, Relief from pain`,
  `question: Discuss the general guidelines for establishing a microbiology QC program. An insurance company's perception of quality in a lab is most often related to what? Page 40.
Cost-effectiveness, Accuracy, Turnaround time, Patient comfort`,
  `question: Discuss the general guidelines for establishing a microbiology QC program. The ATCC strain of Escherichia coli 25922 is used as a control for what? Page 34.
Gram-negative drugs, Gram-positive drugs, Beta-lactamase inhibitor drugs, Cation content`,
  `question: Discuss the general guidelines for establishing a microbiology QC program. For primary culture media how should QC organisms be prepared? Page 33.
As a dilute suspension, As an undiluted suspension, Directly from a frozen stock, On a selective agar`,
  `question: Discuss the general guidelines for establishing a microbiology QC program. Which of the following is NOT a general guideline for establishing QC? Page 32.
Discarding all out-of-range results, Recording all QC activities, Having a list of tolerance limits, Recording all corrective actions`,
  `question: Discuss the general guidelines for establishing a microbiology QC program. The ATCC strain of Staphylococcus aureus 29213 is used as a control for what? Page 34.
Gram-positive drugs-minimal inhibitory concentration, Gram-positive drugs-Kirby-Bauer test, Gram-negative drugs, B-Lactamase inhibitor drugs`,
  `question: Discuss the general guidelines for establishing a microbiology QC program. What is a key component of a written PI plan? Page 37.
Vision and mission statements, A list of employee grievances, The laboratory's annual budget, A schedule of staff meetings`,
  `question: Discuss the general guidelines for establishing a microbiology QC program. What is one example of a broth that can be used for storing stock cultures? Page 37.
Skim milk, MacConkey broth, Selenite F broth, GN broth`,
  `question: Discuss the general guidelines for establishing a microbiology QC program. Freezer temperature for storing stock culture aliquots should be at or below what? Page 37.
-70 degrees C, -20 degrees C, 0 degrees C, 4 degrees C`,
  `question: Discuss the general guidelines for establishing a microbiology QC program. Proficiency testing is designed to test what? Page 35.
Identification skill, Speed and efficiency, Knowledge of safety rules, Adherence to dress code`,
  `question: Discuss the general guidelines for establishing a microbiology QC program. What is another name for The Joint Commission (TJC)? Page 32.
JCAHO, CLIA, CAP, CLSI`,
  `question: Discuss the general guidelines for establishing a microbiology QC program. Which PI step involves reviewing collected data using analytical tools and comparisons? Page 38.
Access (Assess), Plan, Design, Improve`,
  `question: Discuss the general guidelines for establishing a microbiology QC program. Which customer group is most likely to perceive laboratory quality in terms of accuracy? Page 40.
The Lab, The Physician, The Patient, The Insurer`
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