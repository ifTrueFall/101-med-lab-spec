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
  `question: Identify the specimen requirements for coagulation testing. Page 295. What is the required anticoagulant for routine coagulation testing?
3.2% sodium citrate, EDTA, Heparin, 3.8% sodium citrate`,
  `question: Identify the specimen requirements for coagulation testing. Page 295. What is the correct ratio of blood to anticoagulant for a coagulation specimen?
9:1, 1:9, 10:1, 1:1`,
  `question: Identify the specimen requirements for coagulation testing. Page 295. To ensure the correct blood to anticoagulant ratio a coagulation sample tube must be filled to at least what capacity?
90%, 75%, 50%, 100%`,
  `question: Identify the specimen requirements for coagulation testing. Page 295. Immediately after collection how many times must the coagulation tube be inverted to ensure proper mixing?
5 to 10 times, 1 to 2 times, 3 to 4 times, More than 10 times`,
  `question: Identify the specimen requirements for coagulation testing. Page 295. To prepare platelet-poor plasma the specimen should be centrifuged at 3000 rpm for how long?
5 minutes, 1 minute, 10 minutes, 15 minutes`,
  `question: Identify the specimen requirements for coagulation testing. Page 295. It is critical that coagulation specimens are not obtained from what type of line to avoid contamination?
A heparin lock, An arterial line, A central line, A peripheral IV`,
  `question: Identify methodologies and principles of coagulation testing. Page 295. All automated and semi-automated coagulation methodologies are based on the detection of what event?
Clot formation, Platelet aggregation, Fibrinolysis, Factor activation`,
  `question: Identify methodologies and principles of coagulation testing. Page 295. The time from mixing the patient sample and reagent until a measurable clot is formed is reported in what units?
Seconds, Minutes, Milligrams per deciliter, International Units`,
  `question: Identify methodologies and principles of coagulation testing. Page 295. Which mechanical end-point detection method uses two metal electrodes to measure a change in conductivity?
Impedance, Electromagnetic, Optical, Chromogenic`,
  `question: Identify methodologies and principles of coagulation testing. Page 295. In the mechanical impedance method what event interrupts the electrical current between the two electrodes and stops the timer?
Clot formation, Bubbles in the sample, Temperature change, Reagent addition`,
  `question: Identify methodologies and principles of coagulation testing. Page 295. Which mechanical end-point detection method is based on measuring changes in viscosity using an oscillating metal ball?
Electromagnetic, Impedance, Turbidity, Nephelometry`,
  `question: Identify methodologies and principles of coagulation testing. Page 295. In the electromagnetic method the formation of what increases the viscosity of the sample slowing the oscillating ball?
Fibrin strands, Platelet clumps, Red cell aggregates, Lipid layers`,
  `question: Identify methodologies and principles of coagulation testing. Page 296. Which photometric method measures the change in optical density or turbidity as a clot forms?
Turbidity, Nephelometry, Chromogenic, Immunologic`,
  `question: Identify methodologies and principles of coagulation testing. Page 296. In the photometric turbidity method the formation of fibrin increases the opacity of the sample and does what to light transmission?
Decreases light transmission, Increases light transmission, Does not change light transmission, Scatters light transmission`,
  `question: Identify methodologies and principles of coagulation testing. Page 296. Which method provides quantitative testing by measuring light that is scattered at different angles?
Nephelometry, Turbidity, Impedance, Electromagnetic`,
  `question: Identify methodologies and principles of coagulation testing. Page 296. Which methodology measures enzyme activity by using a color-generating substance called a chromophore?
Chromogenic, Immunologic, Photometric, Mechanical`,
  `question: Identify methodologies and principles of coagulation testing. Page 296. In the chromogenic method the amount of color produced is proportional to what?
Enzyme activity, Fibrin concentration, Platelet count, D-dimer level`,
  `question: Identify methodologies and principles of coagulation testing. Page 296. Which methodology is commonly used for D-Dimer testing and involves latex-coated monoclonal antibodies?
Immunologic, Chromogenic, Mechanical, Optical`,
  `question: Identify methodologies and principles of coagulation testing. Page 296. In an immunologic assay for D-dimer the agglutination of latex particles causes an increase in what?
Light absorbance, Electrical impedance, Viscosity, Color intensity`,
  `question: Describe general types of coagulation testing instrumentation. Page 297. Coagulation analyzers can be classified as semi-automated or what other type?
Automated, Manual, Point-of-Care, High-throughput`,
  `question: Describe general types of coagulation testing instrumentation. Page 297. The Fibrometer is an example of what type of coagulation analyzer?
Semi-Automated, Fully Automated, Point-of-Care, Manual`,
  `question: Describe general types of coagulation testing instrumentation. Page 297. The Diagnostica Stago STA Series of analyzers uses mechanical chromogenic and what other methodology?
Immunologic, Optical, Electromagnetic, Nephelometry`,
  `question: Describe general types of coagulation testing instrumentation. Page 297. The Instrumentation Laboratories ACL Top series of analyzers uses optical chromogenic and what other methodology?
Immunologic, Mechanical, Impedance, Viscosity-based`,
  `question: Describe general types of coagulation testing instrumentation. Page 297. The Siemens Healthcare Sysmex series of analyzers uses optical immunologic and what other methodology?
Chromogenic, Mechanical, Electromagnetic, Impedance`,
  `question: Describe general types of coagulation testing instrumentation. Page 297. Which of the listed major automated analyzers uses a mechanical end-point detection method?
Diagnostica Stago STA Series, Instrumentation Laboratories ACL Top, Siemens Healthcare Sysmex, All of the above`,
  `question: Describe general types of coagulation testing instrumentation. Page 297. What is the term for handheld instrumentation used for testing at the patient's bedside?
Point-of-Care, Semi-Automated, Mainframe, Modular`,
  `question: Describe general types of coagulation testing instrumentation. Page 297. The Hemachron Jr. is a point-of-care instrument that uses which methodology?
Photometric, Impedance, Electromagnetic, Chromogenic`,
  `question: Describe general types of coagulation testing instrumentation. Page 297. The iSTAT is a point-of-care instrument that uses which methodology?
Impedance, Photometric, Electromagnetic, Immunologic`,
  `question: Describe prothrombin time testing reporting and use of International Normalized Ratio (INR). Page 298. The Prothrombin Time (PT) is the exclusive test for a deficiency in which coagulation factor?
Factor VII, Factor VIII, Factor IX, Factor X`,
  `question: Describe prothrombin time testing reporting and use of International Normalized Ratio (INR). Page 298. The PT test is commonly used to monitor which type of oral anticoagulant therapy?
Warfarin/Coumadin, Heparin, Aspirin, Plavix`,
  `question: Describe prothrombin time testing reporting and use of International Normalized Ratio (INR). Page 298. What is the normal reference range for a Prothrombin Time test?
11.0 to 13.0 seconds, 25.0 to 35.0 seconds, <10.0 seconds, 15.0 to 20.0 seconds`,
  `question: Describe prothrombin time testing reporting and use of International Normalized Ratio (INR). Page 298. A Prothrombin Time result greater than 50.00 seconds is considered to be what?
A critical value, A normal value, A therapeutic value, An invalid value`,
  `question: Describe prothrombin time testing reporting and use of International Normalized Ratio (INR). Page 298. What calculated value is widely used to monitor oral anticoagulant therapy and standardize results between labs?
International Normalized Ratio (INR), Activated Partial Thromboplastin Time (aPTT), Thrombin Time (TT), Fibrinogen Level`,
  `question: Describe prothrombin time testing reporting and use of International Normalized Ratio (INR). Page 298. The INR allows for standardized therapy regardless of variations in which reagent?
Thromboplastin reagents, Calcium chloride, Sodium citrate, Phospholipid reagents`,
  `question: Calculate the International Normalized Ratio (INR). Page 298. What is the purpose of the International Normalized Ratio (INR)?
To standardize the prothrombin time ratio, To measure Factor VII activity, To monitor heparin therapy, To detect lupus anticoagulants`,
  `question: Calculate the International Normalized Ratio (INR). Page 298. The INR calculation compares the patient's PT to the geometric mean PT of what population?
Normal patients from the laboratory, Patients on warfarin, A commercial control, The patient's baseline`,
  `question: Calculate the International Normalized Ratio (INR). Page 298. In the INR formula the ratio of the patient PT to the geometric mean PT is raised to the power of what value?
ISI, PT, 2.0, 10`,
  `question: Calculate the International Normalized Ratio (INR). Page 298. What does the acronym ISI stand for in the context of coagulation testing?
International Sensitivity Index, Instrument Sensitivity Index, International Standard of Identity, Internal System Indicator`,
  `question: Calculate the International Normalized Ratio (INR). Page 298. The International Sensitivity Index (ISI) is a value assigned by whom for each batch of reagents?
The manufacturer, The laboratory director, The FDA, The College of American Pathologists`,
  `question: Calculate the International Normalized Ratio (INR). Page 298. Why is a geometric mean used in the INR calculation instead of a standard arithmetic mean?
It increases precision by compensating for outliers, It is easier to calculate, It is required by law, It accounts for patient age`,
  `question: Identify specimen requirements for coagulation testing. Page 295. The removal of most platelets from a specimen to create platelet-poor plasma is achieved by what process?
Centrifugation, Filtration, Agglutination, Hemolysis`,
  `question: Identify methodologies and principles of coagulation testing. Page 295. All coagulation methodologies whether automated or semi-automated rely on detecting an end point which is what?
Clot formation, Color change, Antibody binding, Light scatter`,
  `question: Identify methodologies and principles of coagulation testing. Page 296. The photometric method measures a change in what as a clot forms?
Optical density, Electrical current, Viscosity, Magnetic field`,
  `question: Identify methodologies and principles of coagulation testing. Page 296. A chromogenic assay indirectly or directly measures the activity of what?
Enzymes, Substrates, Inhibitors, Antigens`,
  `question: Identify methodologies and principles of coagulation testing. Page 296. The immunologic method for D-Dimer relies on agglutination which is proportional to what?
Antigen level, Antibody concentration, Fibrinogen level, Platelet count`,
  `question: Describe general types of coagulation testing instrumentation. Page 297. Automated coagulation systems are preferred and considered the standard in modern laboratories.
True, False, Depends on the test, Only for STATs`,
  `question: Describe prothrombin time testing reporting and use of International Normalized Ratio (INR). Page 298. A prolonged PT without any other abnormality is an indication of a deficiency in which factor?
Factor VII, Factor VIII, Factor IX, Factor XI`,
  `question: Calculate the International Normalized Ratio (INR). Page 298. The geometric mean PT used in the INR calculation is based on a local what?
Normal population, Patient population, Control population, Reference population`,
  `question: Identify specimen requirements for coagulation testing. Page 295. The use of 3.2% sodium citrate as an anticoagulant is standard for which type of testing?
Coagulation, Hematology CBC, Chemistry, Blood bank`,
  `question: Identify methodologies and principles of coagulation testing. Page 295. In the electromagnetic method the timer stops when the oscillation of the metal ball drops below what?
A pre-determined range, The initial speed, Half the speed, Zero`,
  `question: Identify methodologies and principles of coagulation testing. Page 296. In the turbidity method an increase in optical density is converted into what type of signal?
Electrical signal, Audible signal, Mechanical signal, Thermal signal`,
  `question: Describe general types of coagulation testing instrumentation. Page 297. Large automated analyzers often use several different what on a single platform?
Methods, Reagents, Sample types, Anticoagulants`,
  `question: Describe prothrombin time testing reporting and use of International Normalized Ratio (INR). Page 298. What is the main reason for using the INR system?
Standardization, Cost-effectiveness, Speed, Simplicity`,
  `question: Identify methodologies and principles of coagulation testing. Page 295. Which methodology is NOT based on endpoint detection of a physical clot?
Chromogenic, Mechanical Impedance, Mechanical Electromagnetic, Photometric`,
  `question: Describe general types of coagulation testing instrumentation. Page 297. Which major analyzer brand is listed as using a mechanical methodology?
Diagnostica Stago, Instrumentation Laboratories, Siemens, All of the above`,
  `question: Calculate the International Normalized Ratio (INR). Page 298. Variations in what can cause different PT results for the same sample between different labs?
Thromboplastin reagents, Patient diet, Time of day, Altitude`,
  `question: Identify methodologies and principles of coagulation testing. Page 296. Which method is described as using differentiation of angles to generate a curve?
Nephelometry, Turbidity, Impedance, Chromogenic`,
  `question: Describe prothrombin time testing reporting and use of International Normalized Ratio (INR). Page 298. A PT result is always reported in what unit of measurement?
Seconds, INR, Percent activity, Ratio`,
  `question: Identify methodologies and principles of coagulation testing. Page 296. In the chromogenic method enzymes cleave what from a synthetic substrate to produce color?
Marked tags, Fibrinogen, Prothrombin, Platelets`,
  `question: Describe general types of coagulation testing instrumentation. Page 297. What is the primary difference between semi-automated and automated analyzers?
Level of manual intervention, Methodologies used, Types of tests performed, Size of the instrument`
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