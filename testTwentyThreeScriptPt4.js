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
`Define the terms associated with antibodies. Antibody detection methods primarily focus on which type of antibodies? Page 118.
Irregular or unexpected, Expected or regular, Natural or common, ABO antibodies`,
`Define the terms associated with antibodies. Unexpected antibodies of primary importance are the immune alloantibodies which are produced in response to stimulation from what? Page 118.
Red blood cells, Environmental sources, Bacteria, A patient's own cells`,
`Define the terms associated with antibodies. Detecting antibodies is critical for investigating potential hemolytic transfusion reactions and what other condition? Page 118.
Immune hemolytic anemias, Iron deficiency anemia, Sickle cell anemia, Pernicious anemia`,
`Differentiate between the following antibodies: expected and unexpected immune naturally occurring passive autoantibody and alloantibody warm and cold. Which antibodies are naturally occurring and produced without exposure to RBCs? Page 118.
Expected antibodies, Unexpected antibodies, Immune antibodies, Passive antibodies`,
`Differentiate between the following antibodies: expected and unexpected immune naturally occurring passive autoantibody and alloantibody warm and cold. The ABO antibodies are a primary example of what type of antibody? Page 118.
Expected antibodies, Unexpected antibodies, Autoantibodies, Warm antibodies`,
`Differentiate between the following antibodies: expected and unexpected immune naturally occurring passive autoantibody and alloantibody warm and cold. Which antibodies are produced in response to RBC stimulation via transfusion transplantation or pregnancy? Page 118.
Unexpected antibodies, Expected antibodies, Naturally occurring antibodies, Passive antibodies`,
`Differentiate between the following antibodies: expected and unexpected immune naturally occurring passive autoantibody and alloantibody warm and cold. Immune alloantibodies fall into which main category? Page 119.
Unexpected antibodies, Expected antibodies, Natural antibodies, Cold antibodies`,
`Differentiate between the following antibodies: expected and unexpected immune naturally occurring passive autoantibody and alloantibody warm and cold. Immune antibodies are mostly what type of immunoglobulin that reacts best at 37C? Page 119.
IgG, IgM, IgA, IgE`,
`Differentiate between the following antibodies: expected and unexpected immune naturally occurring passive autoantibody and alloantibody warm and cold. Which antibodies are formed from exposure to environmental sources like pollen fungus and bacteria? Page 119.
Naturally occurring antibodies, Immune antibodies, Passive antibodies, Alloantibodies`,
`Differentiate between the following antibodies: expected and unexpected immune naturally occurring passive autoantibody and alloantibody warm and cold. Naturally occurring antibodies are mostly what type of immunoglobulin? Page 119.
IgM, IgG, IgE, IgD`,
`Differentiate between the following antibodies: expected and unexpected immune naturally occurring passive autoantibody and alloantibody warm and cold. What is the term for antibodies produced in one individual and transmitted to another? Page 119.
Passive antibodies, Active antibodies, Autoantibodies, Alloantibodies`,
`Differentiate between the following antibodies: expected and unexpected immune naturally occurring passive autoantibody and alloantibody warm and cold. Intravenous immunoglobulin (IVIG) is an example of what kind of antibody? Page 119.
Passive antibody, Autoantibody, Natural antibody, Immune antibody`,
`Differentiate between the following antibodies: expected and unexpected immune naturally occurring passive autoantibody and alloantibody warm and cold. What are antibodies directed against an individual's own RBCs called? Page 119.
Autoantibodies, Alloantibodies, Passive antibodies, Natural antibodies`,
`Differentiate between the following antibodies: expected and unexpected immune naturally occurring passive autoantibody and alloantibody warm and cold. What are antibodies produced after exposure to genetically different or nonself antigens called? Page 119.
Alloantibodies, Autoantibodies, Natural antibodies, Expected antibodies`,
`Differentiate between the following antibodies: expected and unexpected immune naturally occurring passive autoantibody and alloantibody warm and cold. Which antibodies are typically IgG and react best by the indirect antiglobulin technique? Page 119.
Warm antibodies, Cold antibodies, Natural antibodies, Expected antibodies`,
`Differentiate between the following antibodies: expected and unexpected immune naturally occurring passive autoantibody and alloantibody warm and cold. Warm antibodies most often have specificities within which blood group system? Page 119.
Rh, ABO, Kell, Lewis`,
`Differentiate between the following antibodies: expected and unexpected immune naturally occurring passive autoantibody and alloantibody warm and cold. Which antibodies are most commonly encountered at an incubation temperature of 4C? Page 119.
Cold antibodies, Warm antibodies, Immune antibodies, Passive antibodies`,
`Differentiate between the following antibodies: expected and unexpected immune naturally occurring passive autoantibody and alloantibody warm and cold. Cold antibodies are typically which type of immunoglobulin? Page 120.
IgM, IgG, IgA, IgE`,
`Describe the clinical significance of specific antibodies. What is the main characteristic of a clinically significant antibody? Page 120.
It causes decreased survival of RBCs, It reacts only at room temperature, It is always IgM, It does not react with screening cells`,
`Describe the clinical significance of specific antibodies. Clinically significant antibodies are typically which immunoglobulin class? Page 120.
IgG, IgM, IgA, IgE`,
`Describe the clinical significance of specific antibodies. At what temperature do clinically significant antibodies typically react best? Page 120.
37 C, 4 C, 22 C, 56 C`,
`Describe the clinical significance of specific antibodies. After an antibody screen detects an antibody what is the next step? Page 120.
Perform an antibody identification panel, Perform an elution, Issue crossmatch compatible blood, Perform a DAT`,
`Discuss the importance of an antibody screen. The AABB requires an antibody screen for blood recipients as part of what process? Page 120.
Pretransfusion compatibility testing, A routine physical exam, A complete blood count, A white blood cell differential`,
`Discuss the importance of an antibody screen. Why is an antibody screen performed on prenatal obstetric patients? Page 120.
To evaluate the risk of HDFN, To determine the baby's blood type, To check for anemia, To screen for gestational diabetes`,
`Discuss the importance of an antibody screen. The traditional tube method for antibody detection is what type of test? Page 120.
Indirect antiglobulin test, Direct antiglobulin test, Elution test, Adsorption test`,
`Discuss the importance of an antibody screen. What is the first phase of testing in the tube method? Page 120.
Immediate spin, 37 C incubation, AHG phase, Check cell phase`,
`Discuss the importance of an antibody screen. Clinically significant IgG antibodies are most often detected in which phase of testing? Page 121.
AHG phase, Immediate spin, Room temperature, Saline phase`,
`Discuss the composition of screening cell sets. Screening cells are reagent red cells that come from individuals with which blood group? Page 121.
Group O, Group A, Group B, Group AB`,
`Discuss the composition of screening cell sets. Screening cell sets are typically packaged in sets of how many cell suspensions? Page 121.
2 or 3, 4 or 5, 6 or 7, 8 or more`,
`Discuss the composition of screening cell sets. What is the name of the document that details which antigens are present in each vial of screening cells? Page 121.
Antigen profile sheet, Standard operating procedure, Quality control log, Reagent package insert`,
`Discuss the composition of screening cell sets. To avoid missing antibodies that show dosage screening cells should have what kind of antigen expression? Page 121.
Homozygous, Heterozygous, Weak, Denatured`,
`Describe the impact of various enhancement media on antibody detection. Which enhancement reagent works by reducing the zeta potential? Page 121.
22% Albumin, Polyethylene glycol, Saline, Dithiothreitol`,
`Describe the impact of various enhancement media on antibody detection. Which enhancement reagent increases the uptake of antibody onto the RBC during sensitization? Page 121.
LISS, 22% Albumin, Ficin, Papain`,
`Describe the impact of various enhancement media on antibody detection. Which enhancement reagent is the most sensitive but can cause nonspecific aggregation of cells? Page 121.
Polyethylene glycol, 22% Albumin, LISS, Saline`,
`Describe the impact of various enhancement media on antibody detection. Centrifugation is not performed after the 37C incubation when using which enhancement media? Page 121.
PEG, LISS, Albumin, Saline`,
`Describe the principles of gel and solid-phase technology. What type of AHG reagent may lead to the detection of clinically insignificant antibodies? Page 122.
Polyspecific, Monospecific, Anti-IgG only, Anti-C3 only`,
`Describe the principles of gel and solid-phase technology. The microtubule used in the gel method is filled with what substance? Page 122.
Dextran acrylamide gel, Polyethylene glycol, LISS, 22% Albumin`,
`Describe the principles of gel and solid-phase technology. What is an advantage of the gel method? Page 122.
Standardized reading of reactions, Shorter turnaround time, Lower cost of equipment, Increased sensitivity for IgM`,
`Describe the principles of gel and solid-phase technology. What is a disadvantage of the gel method? Page 122.
Less sensitive detection of ABO antibodies, Requires smaller specimen volume, Stable reaction endpoints, No special equipment needed`,
`Describe the principles of gel and solid-phase technology. In the Solid Phase Adherence Method what are the microtiter wells coated with? Page 122.
RBC antigens, RBC antibodies, Anti-IgG, Dextran acrylamide gel`,
`Describe the principles of gel and solid-phase technology. In Solid Phase testing what is added after the washing step to detect bound IgG? Page 122.
Indicator RBCs coated with anti-IgG, Polyspecific AHG, LISS, Patient plasma`,
`Describe the principles of gel and solid-phase technology. What is an advantage of the Solid Phase method? Page 122.
Automation of the method, Longer turnaround time, Requires careful pipetting, Prone to interference`,
`Describe the principles of gel and solid-phase technology. What is a disadvantage of the Solid Phase method? Page 123.
Hemolyzed or lipemic samples may interfere, Endpoint is unstable, Requires large sample volume, Cannot be automated`,
`Describe the limitations of the antibody screening test. What constitutes a positive result in an antibody screen? Page 123.
Agglutination or hemolysis, Agglutination only, Hemolysis only, A color change only`,
`Describe the limitations of the antibody screening test. A positive autologous control may indicate the presence of what? Page 123.
A possible autoantibody, A strong alloantibody, An ABO discrepancy, A dosage effect`,
`Describe the limitations of the antibody screening test. If the autologous control is positive which test should be performed next? Page 123.
A DAT, An elution, An antibody panel, A crossmatch`,
`Describe the limitations of the antibody screening test. The presence of true agglutination must be differentiated from what phenomenon? Page 123.
Rouleaux, Prozone, Postzone, Hemolysis`,
`Describe the limitations of the antibody screening test. A negative result with a 3-cell screen gives what percentage of confidence that no clinically significant antibodies are present? Page 124.
95%, 90%, 99%, 100%`,
`Describe the limitations of the antibody screening test. An antibody screen may not detect antibodies that have a titer below the level of what? Page 124.
Sensitivity, Significance, Reactivity, Specificity`,
`Describe the limitations of the antibody screening test. An antibody screen may fail to detect antibodies to what type of antigens? Page 124.
Low-frequency antigens, High-frequency antigens, Rh antigens, Kell antigens`,
`Describe the limitations of the antibody screening test. Which of these factors can influence the sensitivity of an antibody screen? Page 124.
Cell-to-serum ratio, Patient's age, Patient's gender, Time of day`,
`Describe the limitations of the antibody screening test. At what pH range do antibodies typically react best? Page 124.
6.8 to 7.2, 7.5 to 8.0, 6.0 to 6.5, 8.0 to 8.5`,
`Discuss the importance of an antibody screen. Donors of allogeneic blood and stem cells are required by AABB to have what test performed? Page 120.
Antibody screen, Complete blood count, Liver function test, Infectious disease panel`,
`Describe the impact of various enhancement media on antibody detection. PEG is not recommended for patients with elevated levels of plasma protein such as those with what condition? Page 121.
Multiple myeloma, Anemia, Leukemia, Hemophilia`,
`Differentiate between the following antibodies: expected and unexpected immune naturally occurring passive autoantibody and alloantibody warm and cold. Alloantibodies can be formed against antigens on red cells white cells and what other component? Page 119.
Platelets, Plasma proteins, Hemoglobin, Haptoglobin`,
`Discuss the composition of screening cell sets. Heterozygous expression of antigens on screening cells may cause what? Page 121.
Weaker reactions, Stronger reactions, False positives, Hemolysis`,
`Describe the principles of gel and solid-phase technology. To avoid investigations of insignificant antibodies what type of AHG reagent is recommended? Page 122.
Monospecific, Polyspecific, Broad-spectrum, High-titer`,
`Compare gel and solid-phase technologies. Which method is described as having stable reaction endpoints for up to 24 hours? Page 122.
Gel Method, Tube Method, Solid Phase Method, Slide Method`,
`Compare gel and solid-phase technologies. Which method is ideal for pediatric testing due to the smaller sample size required? Page 122.
Solid Phase Method, Gel Method, Tube Method, Capillary Method`,
`Compare gel and solid-phase technologies. Which testing technology uses indicator RBCs coated with anti-IgG instead of liquid AHG reagent? Page 122.
Solid Phase Adherence, Gel Technology, Tube Method, Microplate Method`
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