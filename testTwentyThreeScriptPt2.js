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
  `Describe the effects of disease on the expression of H A and B antigens and antibodies. What effect can diseases like leukemia have on red cell antigens? Page 91.
Depress antigen strength, Enhance antigen strength, Create new antigens, No effect`,
  `Describe the effects of disease on the expression of H A and B antigens and antibodies. What type of agglutination reaction is often seen in patients with leukemia? Page 91.
Mixed-field agglutination, Strong 4+ agglutination, No agglutination, Rouleaux formation`,
  `Describe the effects of disease on the expression of H A and B antigens and antibodies. What phenomenon can be caused by disorders of the lower intestinal tract like carcinoma of the colon? Page 91.
Acquired B phenomenon, Bombay phenotype, Chimerism, Polyagglutination`,
  `Describe the effects of disease on the expression of H A and B antigens and antibodies. The acquired B phenomenon allows which bacteria's serotype to enter the patient's blood? Page 91.
E coli, Staphylococcus aureus, Streptococcus pyogenes, Pseudomonas aeruginosa`,
  `Describe the effects of disease on the expression of H A and B antigens and antibodies. In the acquired B phenomenon a group A patient's red cells absorb a B-like polysaccharide that reacts with what? Page 91.
Human-source anti-B, Anti-A lectin, Anti-H lectin, Reagent anti-A`,
  `Describe the effects of disease on the expression of H A and B antigens and antibodies. Carcinoma of the stomach or pancreas can cause a lack of detectable ABO antigens due to what? Page 91.
Excessive soluble substances, Antigen depression, Red cell destruction, Antibody overproduction`,
  `Describe the effects of disease on the expression of H A and B antigens and antibodies. How do excessive soluble substances cause a forward typing discrepancy? Page 91.
They neutralize the antisera, They block antigen sites, They destroy red cells, They cause rouleaux`,
  `Differentiate between the ABO group discrepancies. What must be done with all ABO discrepancies before a blood transfusion can occur? Page 91.
They must be resolved, They must be documented, They must be reported, They can be ignored`,
  `Differentiate between the ABO group discrepancies. What does an ABO discrepancy imply? Page 92.
The forward and reverse groupings do not agree, The patient has a rare antibody, The sample is hemolyzed, The patient has a positive DAT`,
  `Differentiate between the ABO group discrepancies. A transfusion with ABO incompatible blood due to a mistype can result in in-vivo red cell destruction and what other severe consequence? Page 92.
Patient death, A delayed reaction, A mild allergic reaction, Iron overload`,
  `Differentiate between the ABO group discrepancies. What is the cause of most ABO discrepancies? Page 92.
Technical error, Patient subgroups, Cold antibodies, Plasma abnormalities`,
  `Differentiate between the ABO group discrepancies. Which of the following is a technical source of error in ABO grouping? Page 92.
Inadequate specimen identification, A rare patient subgroup, Unexpected antibodies, Rouleaux formation`,
  `Differentiate between the ABO group discrepancies. Using a cell suspension that is too heavy or too light is an example of what kind of error? Page 92.
Technical error, Clerical error, Non-technical error, Pathological error`,
  `Differentiate between the ABO group discrepancies. If a discrepancy persists after a technical review what is the first piece of information you should acquire about the patient? Page 92.
Patient's age, Patient's diet, Patient's blood pressure, Patient's weight`,
  `Differentiate between the ABO group discrepancies. If a discrepancy is suspected to be due to a collection error what is the next step? Page 92.
Draw a new sample from the patient, Issue O-compatible blood, Perform an antibody panel, Consult a pathologist`,
  `Differentiate between the ABO group discrepancies. While a discrepancy is being resolved what must be done with the interpretation of the ABO type? Page 92.
It must be delayed, It must be estimated, It must be recorded as O, It must be sent for review`,
  `Differentiate between the ABO group discrepancies. In an emergency what type of RBCs may be administered before a discrepancy is resolved? Page 92.
Group O-compatible RBCs, Group AB plasma, The patient's suspected type, Washed red blood cells`,
  `Differentiate between the ABO group discrepancies. Non-technical ABO discrepancies are divided into how many major categories? Page 93.
Four, Three, Five, Two`,
  `Differentiate between the ABO group discrepancies. Which category of discrepancies is related to weakly reacting or missing antibodies? Page 93.
Group I, Group II, Group III, Group IV`,
  `Differentiate between the ABO group discrepancies. What is a common reason for missing or weak isoagglutinins in Group I discrepancies? Page 93.
Depressed antibody production, Strong antigen expression, Technical error, Protein abnormalities`,
  `Differentiate between the ABO group discrepancies. Which patient population is commonly associated with Group I discrepancies? Page 93.
Newborns, Healthy adults, Teenagers, Pregnant women`,
  `Differentiate between the ABO group discrepancies. Elderly patients often have which type of ABO discrepancy? Page 93.
Group I, Group II, Group III, Group IV`,
  `Differentiate between the ABO group discrepancies. Patients with hypogammaglobulinemia would fall into which discrepancy category? Page 93.
Group I, Group IV, Group II, Group III`,
  `Differentiate between the ABO group discrepancies. What is the term for the presence of two cell populations in a single individual? Page 93.
Chimerism, Mosaicism, Polyagglutination, Rouleaux`,
  `Differentiate between the ABO group discrepancies. Artificial chimerism is most commonly due to what? Page 93.
Transfusions, Twin births, Genetic mutations, Autoimmune disease`,
  `Differentiate between the ABO group discrepancies. What is the first step in resolving a weak (1+ or less) Group I discrepancy? Page 93.
Incubate at room temperature for 15-30 minutes, Wash the cells with saline, Perform a saline replacement, Warm the sample to 37 C`,
  `Differentiate between the ABO group discrepancies. If room temperature incubation doesn't resolve a Group I discrepancy what is the next step? Page 93.
Incubate at 4 C, Add more plasma, Use a different reagent, Request a new sample`,
  `Differentiate between the ABO group discrepancies. Which category of discrepancies is associated with weakly reacting or missing antigens? Page 94.
Group II, Group I, Group III, Group IV`,
  `Differentiate between the ABO group discrepancies. How frequently are Group II discrepancies encountered? Page 94.
The least frequently, The most frequently, Very frequently, Moderately frequently`,
  `Differentiate between the ABO group discrepancies. Which of the following is a cause of Group II discrepancies? Page 94.
Subgroups of A and B, Cold reactive antibodies, Multiple Myeloma, Use of plasma expanders`,
  `Differentiate between the ABO group discrepancies. Leukemia yielding weakened A or B antigens is an example of which discrepancy group? Page 94.
Group II, Group I, Group III, Group IV`,
  `Differentiate between the ABO group discrepancies. The 'Acquired B phenomenon' is a cause for which type of discrepancy? Page 94.
Group II, Group III, Group I, Group IV`,
  `Differentiate between the ABO group discrepancies. How can a Group II discrepancy caused by excess soluble substances be resolved? Page 94.
Wash patient cells 3 more times, Incubate at 4 C, Perform an elution, Use saline replacement`,
  `Differentiate between the ABO group discrepancies. Which category of discrepancies is caused by protein or plasma abnormalities? Page 94.
Group III, Group II, Group I, Group IV`,
  `Differentiate between the ABO group discrepancies. What phenomenon is the hallmark of a Group III discrepancy? Page 94.
Rouleaux formation, Mixed-field agglutination, True agglutination, Hemolysis`,
  `Differentiate between the ABO group discrepancies. What is another term for rouleaux formation? Page 94.
Pseudoagglutination, Polyagglutination, Panagglutination, Autoagglutination`,
  `Differentiate between the ABO group discrepancies. The coin-like stacking of erythrocytes is known as what? Page 94.
Rouleaux, Chimerism, Bombay, Agglutination`,
  `Differentiate between the ABO group discrepancies. Which of these conditions is a common cause of Group III discrepancies? Page 94.
Multiple Myeloma, Leukemia, Anemia, Hemophilia`,
  `Differentiate between the ABO group discrepancies. Use of plasma expanders like Dextran can cause which type of discrepancy? Page 94.
Group III, Group I, Group II, Group IV`,
  `Differentiate between the ABO group discrepancies. Contamination of a cord blood sample with Wharton's jelly can cause what? Page 94.
Group III discrepancy, Group II discrepancy, A false negative result, A weakened antigen`,
  `Differentiate between the ABO group discrepancies. What is the primary method for resolving a Group III discrepancy? Page 94.
Use a saline replacement technique, Incubate the sample at 4 C, Wash the cells with plasma, Warm the sample to 37 C`,
  `Differentiate between the ABO group discrepancies. What is the purpose of washing red cells to resolve a Group III discrepancy? Page 94.
To remove excess protein, To enhance antibody uptake, To elute antibodies, To strengthen antigens`,
  `Differentiate between the ABO group discrepancies. Which category includes miscellaneous problems like cold reactive antibodies and polyagglutination? Page 95.
Group IV, Group III, Group II, Group I`,
  `Differentiate between the ABO group discrepancies. Cold reactive autoantibodies are a cause of which discrepancy group? Page 95.
Group IV, Group II, Group III, Group I`,
  `Differentiate between the ABO group discrepancies. The presence of unexpected ABO isoagglutinins falls into which category? Page 95.
Group IV, Group I, Group II, Group III`,
  `Differentiate between the ABO group discrepancies. What is a possible resolution for a Group IV discrepancy caused by cold antibodies? Page 95.
Warm blood to 37 C, Incubate at 4 C, Perform saline replacement, Add LISS`,
  `Differentiate between the ABO group discrepancies. How can a Group IV discrepancy caused by T-antigen activation be investigated? Page 95.
Test patient cells with a series of lectins, Perform an antibody screen, Run an auto-control, Check for rouleaux microscopically`,
  `Differentiate between the ABO group discrepancies. What important information should be reviewed to help resolve a Group IV discrepancy? Page 95.
Patient history for diagnosis and drugs, Patient's diet and lifestyle, The time of sample collection, The phlebotomist's name`,
  `Differentiate between the ABO group discrepancies. What is the term for a discrepancy caused by the presence of antibodies against the anti-sera reagents? Page 95.
Group IV, Group I, Group III, Group II`,
  `Differentiate between the ABO group discrepancies. What procedure can be used to remove a cold autoantibody causing a Group IV discrepancy? Page 95.
Auto-absorption, Saline replacement, Elution, Cell washing`,
  `Differentiate between the ABO group discrepancies. Which procedure is used to remove antibodies that are attached to red blood cells? Page 95.
Elution, Absorption, Neutralization, Adsorption`,
  `Differentiate between the ABO group discrepancies. Failure to add reagents during testing is an example of what? Page 92.
Technical error, A Group I discrepancy, A Group II discrepancy, A non-technical error`,
  `Differentiate between the ABO group discrepancies. An uncalibrated centrifuge is a potential source of what? Page 92.
Technical error, Group III discrepancy, Chimerism, A patient-specific problem`,
  `Differentiate between the ABO group discrepancies. Missed observation of hemolysis is considered what type of error? Page 92.
Technical error, Administrative error, Group IV discrepancy, Pathological error`,
  `Differentiate between the ABO group discrepancies. Warming of a sample during centrifugation is an example of what? Page 92.
Technical error, A necessary procedure, A resolution technique, A Group III issue`,
  `Differentiate between the ABO group discrepancies. What should be run concurrently when attempting to resolve a Group I discrepancy at lower temperatures? Page 93.
An auto-control and an O cell control, A direct antiglobulin test, An antibody panel, A new patient sample`,
  `Differentiate between the ABO group discrepancies. Hodgkin's Lymphoma can cause which two types of discrepancies? Page 94.
Group II and Group III, Group I and Group IV, Group I and Group II, Group III and Group IV`,
  `Differentiate between the ABO group discrepancies. What is the primary cause of artificial chimerism? Page 93.
Fetal-maternal bleeding, Being a twin, A genetic disorder, An autoimmune condition`,
  `Differentiate between the ABO group discrepancies. What is the potential risk of incubating a test at 4 C to resolve a Group I discrepancy? Page 93.
It may enhance other cold antibodies, It may destroy the patient's antibodies, It may weaken the antigens, It can cause hemolysis`,
  `Differentiate between the ABO group discrepancies. Which of these is NOT a technical source of error? Page 92.
Subgroups of A, Clerical errors, Samples mix-up, Contaminated reagents`
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