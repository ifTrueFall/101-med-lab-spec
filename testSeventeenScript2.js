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
  `question: Explain principles of operation and advantages the of automated hematology analyzers. Page 211. What is a primary advantage of automated hematology analyzers over manual cell counting?
Improved accuracy and precision, Lower cost, Less maintenance, Smaller footprint`,
  `question: Explain principles of operation and advantages the of automated hematology analyzers. Page 211. Automated analyzers improve efficiency and accuracy because they do what?
Count many more cells, Use smaller samples, Require less QC, Run faster`,
  `question: Explain principles of operation and advantages the of automated hematology analyzers. Page 211. A three-part WBC differential identifies granulocytes lymphocytes and what other cell type?
Monocytes, Neutrophils, Eosinophils, Basophils`,
  `question: Explain principles of operation and advantages the of automated hematology analyzers. Page 211. A five-part WBC differential identifies neutrophils lymphocytes monocytes eosinophils and what other cell type?
Basophils, Granulocytes, Bands, Metamyelocytes`,
  `question: Explain principles of operation and advantages the of automated hematology analyzers. Page 211. Which of the following parameters is directly measured by basic automated hematology analyzers?
White Blood Cell count, Hematocrit, Mean Corpuscular Hemoglobin, Red Blood Cell Distribution Width`,
  `question: Explain principles of operation and advantages the of automated hematology analyzers. Page 211. Which of the following parameters is directly measured by basic automated hematology analyzers?
Hemoglobin, Hematocrit, Mean Corpuscular Volume, Mean Platelet Volume`,
  `question: Explain principles of operation and advantages the of automated hematology analyzers. Page 211. Which of the following parameters is always a calculated value?
Mean Corpuscular Hemoglobin, Red Blood Cell count, White Blood Cell count, Platelet count`,
  `question: Explain principles of operation and advantages the of automated hematology analyzers. Page 211. Which parameter can be either directly measured or calculated depending on the instrument?
Hematocrit, Hemoglobin, Platelet count, MCHC`,
  `question: Explain principles of operation and advantages the of automated hematology analyzers. Page 211. The abbreviation RDW stands for what?
Red Blood Cell Distribution Width, Red Cell Diameter Width, Relative Density Width, Red Cell Deformability Window`,
  `question: Explain principles of operation and advantages the of automated hematology analyzers. Page 211. The abbreviation MPV stands for what?
Mean Platelet Volume, Mean Platelet Value, Maximum Platelet Volume, Mean Platelet Viability`,
  `question: Describe the principle and methodology of electrical impedance radio frequency and optical light scatter. Page 213. What is another name for the electrical impedance principle used in cell counting?
Coulter principle, Optical scatter principle, Flow cytometry principle, VCS principle`,
  `question: Describe the principle and methodology of electrical impedance radio frequency and optical light scatter. Page 213. In the electrical impedance method the number of pulses generated is proportional to what?
The number of cells, The size of the cells, The density of the cells, The granularity of the cells`,
  `question: Describe the principle and methodology of electrical impedance radio frequency and optical light scatter. Page 213. In the electrical impedance method the size of the voltage pulse is directly proportional to what?
The volume of the cell, The number of cells, The conductivity of the cell, The shape of the cell`,
  `question: Describe the principle and methodology of electrical impedance radio frequency and optical light scatter. Page 213. For the electrical impedance method cells are suspended in what type of diluent?
Electrically conductive, Non-conductive, Isotonic, Hypotonic`,
  `question: Describe the principle and methodology of electrical impedance radio frequency and optical light scatter. Page 214. The radio frequency (RF) method provides information on what characteristics of a cell?
Internal characteristics, Surface characteristics, Overall shape, Color`,
  `question: Describe the principle and methodology of electrical impedance radio frequency and optical light scatter. Page 214. In the RF method the cell's interior density is directly proportional to the pulse size or change in what?
RF resistance, Electrical current, Light scatter, Voltage`,
  `question: Describe the principle and methodology of electrical impedance radio frequency and optical light scatter. Page 214. The optical scatter method uses a focused beam of what to analyze cells as they pass through a flow cell?
Light (laser), Radio waves, Sound waves, Microwaves`,
  `question: Describe the principle and methodology of electrical impedance radio frequency and optical light scatter. Page 214. In the optical scatter method photodetectors convert the scattered light into what?
An electric pulse, A sound wave, A heat signature, A pressure change`,
  `question: Describe the principle and methodology of electrical impedance radio frequency and optical light scatter. Page 214. Using optical scatter which of the following can be determined by analyzing the scattered light data?
Cell structure, Cell temperature, Cell pH, Cell metabolism`,
  `question: Interpret the term histogram in relation to an automated CBC. Page 215. In the context of automated hematology what is a histogram?
A graphical distribution of data, A numerical list of results, A quality control chart, A calibration curve`,
  `question: Interpret the term histogram in relation to an automated CBC. Page 215. A histogram from an automated analyzer measures cell frequency versus what other parameter?
Size, Density, Shape, Color`,
  `question: Interpret the term histogram in relation to an automated CBC. Page 215. What are the three common types of histograms used by automated analyzers?
RBC WBC and PLT, Hgb Hct and MCV, MCH MCHC and RDW, Neutrophil Lymphocyte and Monocyte`,
  `question: Interpret the term histogram in relation to an automated CBC. Page 215. A shift to the left on an RBC histogram indicates that the average cell size is below normal which is seen in what condition?
Microcytic anemia, Macrocytic anemia, Normocytic anemia, Hemolytic anemia`,
  `question: Interpret the term histogram in relation to an automated CBC. Page 215. A shift to the right on an RBC histogram indicates that the average cell size is above normal which is seen in what condition?
Macrocytic anemia, Microcytic anemia, Normocytic anemia, Spherocytic anemia`,
  `question: Interpret the term histogram in relation to an automated CBC. Page 215. A normal RBC histogram typically has what shape?
Bell curve, Bimodal curve, Skewed left, Skewed right`,
  `question: Interpret the term histogram in relation to an automated CBC. Page 215. The WBC histogram sorts the white blood cell populations according to what feature?
Nuclear size, Cytoplasmic granularity, Overall cell size, Cell density`,
  `question: Interpret the term histogram in relation to an automated CBC. Page 215. On a WBC histogram cells measuring between 35 to 90 fL are classified as what cell type?
Lymphocytes, Mononuclear cells, Granulocytes, Blasts`,
  `question: Interpret the term histogram in relation to an automated CBC. Page 215. On a WBC histogram cells measuring between 160 to 450 fL are classified as what cell type?
Granulocytes, Lymphocytes, Mononuclear cells, Platelets`,
  `question: Interpret the term histogram in relation to an automated CBC. Page 216. What information does the platelet histogram help to identify?
Giant platelets, Platelet clumps, Platelet satellitism, Activated platelets`,
  `question: Interpret the term histogram in relation to an automated CBC. Page 216. Particles with cell volumes between what range are typically counted as platelets?
2 - 20 fL, 35 - 90 fL, 90 - 160 fL, 160 - 450 fL`,
  `question: Interpret the term histogram in relation to an automated CBC. Page 217. A scatterplot is a graphic representation of how many measurable characteristics of cells?
Two or more, Only one, Only two, Only three`,
  `question: Describe the sample limitations associated with sources of error in automated cell counting to include corrective actions used for interfering substances. Page 218. What is the term for the clumping of RBCs that occurs due to a drop in temperature?
Cold Agglutinins, Rouleaux, Autoagglutination, Hemagglutination`,
  `question: Describe the sample limitations associated with sources of error in automated cell counting to include corrective actions used for interfering substances. Page 218. The presence of cold agglutinins can falsely decrease the RBC count and falsely increase what parameter?
MCH, Hct, PLT, MCV`,
  `question: Describe the sample limitations associated with sources of error in automated cell counting to include corrective actions used for interfering substances. Page 219. What is the corrective action for a sample that has cold agglutinins?
Warm blood to 37°C, Refrigerate the sample, Mix the sample vigorously, Perform a plasma replacement`,
  `question: Describe the sample limitations associated with sources of error in automated cell counting to include corrective actions used for interfering substances. Page 218. What is the term for excess fats in the blood that can cause turbidity?
Lipemia, Icterus, Hemolysis, Hyperproteinemia`,
  `question: Describe the sample limitations associated with sources of error in automated cell counting to include corrective actions used for interfering substances. Page 218. Lipemia can cause a falsely elevated result for which two parameters?
Hgb and MCH, RBC and Hct, WBC and PLT, MCV and RDW`,
  `question: Describe the sample limitations associated with sources of error in automated cell counting to include corrective actions used for interfering substances. Page 220. What is the recommended corrective action for a lipemic sample that is affecting results?
Replace plasma with normal saline, Warm the sample, Recollect in a different tube, Centrifuge at high speed`,
  `question: Describe the sample limitations associated with sources of error in automated cell counting to include corrective actions used for interfering substances. Page 218. What is the term for the yellowish pigmentation of body fluids caused by high levels of bilirubin?
Icterus, Lipemia, Cyanosis, Erythema`,
  `question: Describe the sample limitations associated with sources of error in automated cell counting to include corrective actions used for interfering substances. Page 218. An icteric sample can cause turbidity and will falsely elevate which two parameters?
Hgb and MCH, RBC and Hct, WBC and PLT, MCV and RDW`,
  `question: Describe the sample limitations associated with sources of error in automated cell counting to include corrective actions used for interfering substances. Page 219. RBC fragments like schistocytes may fall into the platelet counting threshold and cause what erroneous result?
Falsely increased PLT, Falsely decreased PLT, Falsely increased RBC, Falsely decreased RBC`,
  `question: Describe the sample limitations associated with sources of error in automated cell counting to include corrective actions used for interfering substances. Page 220. What is the term for the phenomenon where platelets adhere to and surround neutrophils?
Platelet satellitism, Platelet aggregation, Platelet adhesion, Platelet clumping`,
  `question: Describe the sample limitations associated with sources of error in automated cell counting to include corrective actions used for interfering substances. Page 220. What is the recommended corrective action when platelet satellitism is observed?
Recollect with sodium citrate, Warm the sample, Use a different instrument, Perform a manual dilution`,
  `question: Describe the sample limitations associated with sources of error in automated cell counting to include corrective actions used for interfering substances. Page 219. The presence of platelet clumps in a sample can lead to a falsely decreased platelet count and a falsely increased what?
WBC count, RBC count, Hgb, Hct`,
  `question: Describe the sample limitations associated with sources of error in automated cell counting to include corrective actions used for interfering substances. Page 219. What is a corrective action for platelet clumps in a sample?
Warm and agitate the specimen, Centrifuge and resuspend, Add a dispersing agent, Recollect in a heparin tube`,
  `question: Describe the sample limitations associated with sources of error in automated cell counting to include corrective actions used for interfering substances. Page 218. Some variant forms of hemoglobin can make erythrocytes resistant to what process impacting counts?
Lysis, Agglutination, Sedimentation, Staining`,
  `question: Describe the sample limitations associated with sources of error in automated cell counting to include corrective actions used for interfering substances. Page 219. The presence of lysis-resistant RBCs can interfere with the colorimetric reading and cause a falsely elevated what?
WBC count, PLT count, RBC count, Hct`,
  `question: Describe the sample limitations associated with sources of error in automated cell counting to include corrective actions used for interfering substances. Page 220. What problem can giant platelets cause in an automated count?
Counted as WBCs, Counted as RBCs, Not counted at all, Interfere with Hgb reading`,
  `question: Describe the sample limitations associated with sources of error in automated cell counting to include corrective actions used for interfering substances. Page 220. The precipitation of abnormal plasma proteins by lysing reagents can cause what erroneous result?
Falsely increased WBC, Falsely decreased WBC, Falsely increased PLT, Falsely decreased PLT`,
  `question: Describe the sample limitations associated with sources of error in automated cell counting to include corrective actions used for interfering substances. Page 220. Hemolysis in a sample will cause a falsely decreased RBC count and what other parameter?
HCT, Hgb, MCH, MCHC`,
  `question: Interpret the term histogram in relation to an automated CBC. Page 215. Particles with cell volumes greater than what value are identified as RBCs on a histogram?
36 fL, 20 fL, 90 fL, 160 fL`,
  `question: Interpret the term histogram in relation to an automated CBC. Page 215. On a WBC histogram cells measuring between 90 to 160 fL are classified as what?
Mononuclear cells, Lymphocytes, Granulocytes, Blasts`,
  `question: Interpret the term histogram in relation to an automated CBC. Page 217. Scatterplots provide information about population abnormalities and what else?
Sub-population of cells, Cell viability, Cell age, Cell metabolism`,
  `question: Explain principles of operation and advantages the of automated hematology analyzers. Page 211. Automated analyzers have virtually replaced what?
Manual cell counting, Manual staining, Manual slide making, Manual QC`,
  `question: Describe the sample limitations associated with sources of error in automated cell counting to include corrective actions used for interfering substances. Page 219. According to the table which indicator would point to the presence of cold agglutinins?
Increased MCV, Left shift on histogram, Platelet flag, Decreased Hgb`,
  `question: Describe the principle and methodology of electrical impedance radio frequency and optical light scatter. Page 213. The electrical impedance method uses a low-frequency electrical current applied between how many electrodes?
2, 1, 3, 4`,
  `question: Explain principles of operation and advantages the of automated hematology analyzers. Page 211. Which calculated index reflects the average volume of a red blood cell?
MCV, MCH, MCHC, RDW`,
  `question: Interpret the term histogram in relation to an automated CBC. Page 215. A normal WBC histogram will show how many distinct populations of WBCs?
Three, Two, Four, One`,
  `question: Describe the principle and methodology of electrical impedance radio frequency and optical light scatter. Page 214. The radio frequency method uses a high-frequency pulsating what?
Sine wave, Square wave, Sawtooth wave, Triangle wave`,
  `question: Describe the sample limitations associated with sources of error in automated cell counting to include corrective actions used for interfering substances. Page 219. If platelet clumps are confirmed by slide review what is the recommended corrective action?
Warm and agitate, Recollect sample, Plasma replacement, Manual dilution`,
  `question: Explain principles of operation and advantages the of automated hematology analyzers. Page 211. The enumeration of which cell type can be performed by more sophisticated instruments?
nRBCs, Reticulocytes, Blasts, Plasma cells`
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