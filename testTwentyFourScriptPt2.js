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
  `Describe the principle of the antiglobulin test. The Antiglobulin Test is also known by what other name? Page 157.
Coombs' Test, Landsteiner's Test, Wiener's Test, Mourant's Test`,
  `Describe the principle of the antiglobulin test. The Antiglobulin Test is based on the principle that antihuman globulins (AHGs) bind to what? Page 157.
Human globulins like IgG or complement, Red blood cell antigens directly, Haptoglobin, Transferrin`,
  `Describe the principle of the antiglobulin test. The antiglobulin reagent is obtained from what source? Page 157.
Immunized nonhuman species, Purified human serum, Monoclonal plant lectins, Synthetic polymers`,
  `Describe the principle of the antiglobulin test. The test is used to detect RBCs that have been sensitized with what type of antibodies? Page 157.
Nonagglutinating incomplete antibodies, Naturally occurring IgM antibodies, Cold-reacting autoantibodies, ABO antibodies`,
  `Describe the principle of the antiglobulin test. The discovery and use of the AHG reagent led to the finding of which blood group systems? Page 157.
Kell Duffy and Kidd, ABO Lewis and P, Rh and MNS, Lutheran and I`,
  `Discuss the use of polyspecific versus monospecific AHG in the Indirect Antiglobulin Test. Which technology is used for the production of monoclonal AHG reagents? Page 158.
Hybridoma technology, Recombinant DNA technology, Animal immunization, Cell culture`,
  `Discuss the use of polyspecific versus monospecific AHG in the Indirect Antiglobulin Test. Polyclonal antisera is produced by injecting animals with what? Page 158.
Human globulin components, Specific red cell antigens, Purified antibodies, Synthetic epitopes`,
  `Discuss the use of polyspecific versus monospecific AHG in the Indirect Antiglobulin Test. What does a monospecific AHG reagent contain? Page 158.
Only one antibody specificity, Multiple antibody specificities, Both anti-IgG and anti-C3d, A blend of polyclonal antibodies`,
  `Discuss the use of polyspecific versus monospecific AHG in the Indirect Antiglobulin Test. A monospecific AHG reagent would contain either anti-IgG or antibody to what? Page 158.
Specific complements like C3d, The D antigen, The K antigen, The entire Rh complex`,
  `Discuss the use of polyspecific versus monospecific AHG in the Indirect Antiglobulin Test. What does a polyspecific AHG reagent contain? Page 159.
Multi-antibodies to human IgG and C3d, Only anti-IgG, Only anti-C3d, A single monoclonal antibody`,
  `Discuss the advantages and disadvantages of monoclonal and polyclonal AHG production. What is an advantage of monoclonal AHG production? Page 159.
No batch variation, Low specificity, It is cheaper, It can detect all genetic variants`,
  `Discuss the advantages and disadvantages of monoclonal and polyclonal AHG production. What is a disadvantage of monoclonal AHG production? Page 159.
Over-specificity, Low titer, It is subject to cross-reactivity, It has high batch variation`,
  `Discuss the advantages and disadvantages of monoclonal and polyclonal AHG production. What is an advantage of polyclonal AHG production? Page 160.
It is more likely to pick up genetic variants, It has a high titer, It has high specificity, It has no batch variation`,
  `Discuss the advantages and disadvantages of monoclonal and polyclonal AHG production. What is a disadvantage of polyclonal AHG production? Page 160.
Low specificity, No cross-reactivity, It is overly sensitive, It is pure and uncontaminated`,
  `Discuss the advantages and disadvantages of monoclonal and polyclonal AHG production. AHG reagents must contain antibody activity to which immunoglobulin class? Page 160.
IgG, IgM, IgA, IgE`,
  `Describe the IAT and DAT to include principle applications and red blood cell sensitization. The Indirect Antiglobulin Test (IAT) is designed to detect which type of sensitization? Page 161.
In-vitro sensitized red cells, In-vivo sensitized red cells, Only complement-coated red cells, Only IgG-coated red cells`,
  `Describe the IAT and DAT to include principle applications and red blood cell sensitization. Which of the following is an application of the IAT? Page 161.
Antibody detection and identification, Investigating Hemolytic Disease of the Newborn, Investigating Autoimmune Hemolytic Anemia, Investigating a Hemolytic Transfusion Reaction`,
  `Describe the IAT and DAT to include principle applications and red blood cell sensitization. The IAT is described as what type of procedure? Page 161.
A two-stage procedure, A single-stage procedure, A direct test, A biphasic test`,
  `Describe the IAT and DAT to include principle applications and red blood cell sensitization. The Direct Antiglobulin Test (DAT) is designed to detect which type of sensitization? Page 161.
In-vivo sensitized red cells, In-vitro sensitized red cells, Antibodies in patient serum, Antigens on screening cells`,
  `Describe the IAT and DAT to include principle applications and red blood cell sensitization. Which of the following conditions is an application for the DAT? Page 161.
Autoimmune Hemolytic Anemia, Antibody screening, Compatibility testing, Du testing`,
  `Describe the IAT and DAT to include principle applications and red blood cell sensitization. Why does the DAT not require an incubation phase? Page 161.
The antigen-antibody complexes formed in-vivo, The test is less sensitive, The antibodies are IgM, The test uses a different reagent`,
  `Explain the importance of the procedural steps in the DAT and IAT. What is the purpose of the incubation at 37°C in the IAT? Page 161.
To allow antibodies to sensitize the RBCs, To elute antibodies from the RBCs, To activate complement, To destroy IgM antibodies`,
  `Explain the importance of the procedural steps in the DAT and IAT. Collection of blood in which type of tube can help minimize in-vitro red cell sensitization for a DAT? Page 161.
EDTA, Red top (clot tube), Heparin, Sodium citrate`,
  `Interpret the results of a DAT panel. An initial DAT is typically performed using which type of reagent? Page 162.
Polyspecific AHG, Monospecific anti-IgG, Monospecific anti-C3d, Saline`,
  `Interpret the results of a DAT panel. If an initial DAT is positive what is the next step? Page 162.
Monitor with a DAT panel using monospecific reagents, Report the blood as incompatible, Perform an elution, Repeat the test with a new sample`,
  `Interpret the results of a DAT panel. A DAT panel result of Polyspecific: Positive Anti-IgG: Positive and Anti-C3d: Negative indicates sensitization with what? Page 162.
IgG only, Complement only, Both IgG and complement, An unknown protein`,
  `Interpret the results of a DAT panel. A DAT panel result of Polyspecific: Positive Anti-IgG: Negative and Anti-C3d: Positive indicates sensitization with what? Page 162.
Complement only, IgG only, Both IgG and complement, A cold autoantibody`,
  `Interpret the results of a DAT panel. A DAT panel result of Polyspecific: Positive Anti-IgG: Positive and Anti-C3d: Positive indicates sensitization with what? Page 162.
Both IgG and complement, IgG only, Complement only, A technical error`,
  `Describe the factors that affect the antiglobulin test. The IAT can detect between 100 and 200 IgG molecules on the cell to obtain what result? Page 162.
A positive reaction, A negative reaction, Hemolysis, A 4+ reaction`,
  `Describe the factors that affect the antiglobulin test. Which factor can influence the number of IgG molecules that sensitize an RBC? Page 162.
Ratio of serum to cells, Patient's age, Patient's gender, Time of collection`,
  `Describe the factors that affect the antiglobulin test. What is the effect of using an enhancement media like LISS or PEG? Page 162.
Influences the rate of sensitization, Decreases test sensitivity, Prevents complement activation, Destroys red cell antigens`,
  `Describe the factors that affect the antiglobulin test. What is the optimal temperature for the incubation phase of an IAT? Page 162.
37 C, 22 C, 4 C, 56 C`,
  `Describe the factors that affect the antiglobulin test. What procedural step is critical for removing unbound globulins before adding AHG reagent? Page 162.
Washing of RBCs, Centrifugation, Incubation, Reading for hemolysis`,
  `Describe the sources of error associated with the performance of the antiglobulin test. What is a potential cause of a false-positive antiglobulin test? Page 163.
Bacterial contamination of cells, Poor washing of cells, Omitting the antiglobulin sera, Using old serum`,
  `Describe the sources of error associated with the performance of the antiglobulin test. Contamination of saline and glassware with what substance can cause a false positive? Page 163.
Silica particles, Human globulins, Calcium, Heavy metals`,
  `Describe the sources of error associated with the performance of the antiglobulin test. What centrifugation error can lead to a false positive? Page 163.
Over-centrifugation, Under-centrifugation, No centrifugation, Centrifuging too slowly`,
  `Describe the sources of error associated with the performance of the antiglobulin test. Extreme reticulocytosis may cause a false positive DAT because what protein is attached to the retic membrane? Page 163.
Transferrin, Albumin, Haptoglobin, Fibrinogen`,
  `Describe the sources of error associated with the performance of the antiglobulin test. Why can't cells that are positive by the DAT be used in an indirect test? Page 163.
They would always be positive, They would always be negative, They will hemolyze, They will not sensitize`,
  `Describe the sources of error associated with the performance of the antiglobulin test. A positive DAT obtained from a refrigerated specimen may be caused by what? Page 163.
Cold autoantibodies sensitizing cells with complement, Warm autoantibodies, Alloantibodies from a previous transfusion, Passively acquired antibodies`,
  `Describe the sources of error associated with the performance of the antiglobulin test. What is a potential cause of a false-negative antiglobulin test? Page 163.
Poor washing, Over-centrifugation, Bacterial contamination, Contaminated saline`,
  `Describe the sources of error associated with the performance of the antiglobulin test. Poor washing causes neutralization of the AHG reagent by what? Page 163.
Unbound globulins in the serum, Bound IgG on the red cells, Bound complement on the red cells, Antigens in the saline`,
  `Describe the sources of error associated with the performance of the antiglobulin test. If complement-dependent antibodies are being tested what sample type may cause a false negative? Page 163.
Anticoagulated plasma, Fresh serum, A clotted sample, A heel stick sample`,
  `Describe the sources of error associated with the performance of the antiglobulin test. What happens if the antiglobulin sera is omitted from the test? Page 163.
A false negative result, A false positive result, No effect on the result, Hemolysis will occur`,
  `Describe the principle of the antiglobulin test. Antihuman globulins are capable of binding to human globulins that are free in serum or what? Page 157.
Attached to antigens on red blood cells, Bound to platelets, Present in saliva, Attached to white blood cells`,
  `Discuss the use of polyspecific versus monospecific AHG in the Indirect Antiglobulin Test. A monoclonal antibody produced by a hybridoma is directed against a single what? Page 158.
Epitope, Antigen, Paratope, Immunoglobulin`,
  `Describe the IAT and DAT to include principle applications and red blood cell sensitization. A DAT may be required as part of pretransfusion testing if the patient has been transfused within what time frame? Page 161.
The last two weeks, The last 24 hours, The last 6 months, The last year`,
  `Describe the factors that affect the antiglobulin test. The DAT can detect a level of 100 to 500 of which type of molecules per RBC? Page 162.
IgG, IgM, IgA, IgE`,
  `Describe the factors that affect the antiglobulin test. The DAT can detect a level of 400 to 1100 of which type of molecules per RBC? Page 162.
C3d, IgG, IgM, C4d`,
  `Describe the sources of error associated with the performance of the antiglobulin test. Bacterial contamination of cells can lead to T-activation which causes a false positive because Anti-T occurs naturally in what? Page 163.
Everyone's serum, The AHG reagent, The saline, The screening cells`,
  `Describe the sources of error associated with the performance of the antiglobulin test. Elution of the antibody during which step can cause a false negative result? Page 163.
The washing phase, The incubation phase, The centrifugation phase, The reading phase`,
  `Describe the sources of error associated with the performance of the antiglobulin test. Using an improper concentration of cells and serum is a source of what type of error? Page 163.
False negative, False positive, Clerical error, No error`,
  `Describe the principle of the antiglobulin test. What is another term for nonagglutinating antibodies that the antiglobulin test helps detect? Page 157.
Incomplete antibodies, Complete antibodies, Natural antibodies, Cold antibodies`,
  `Discuss the advantages and disadvantages of monoclonal and polyclonal AHG production. Why might several different monoclonal antibodies need to be blended for use? Page 159.
The antigen is composed of multiple epitopes, To increase the titer, To reduce the cost, To add complement activity`,
  `Describe the IAT and DAT to include principle applications and red blood cell sensitization. Detection of antigens like Du Kell Duffy and Kidd often requires which test? Page 161.
IAT, DAT, Elution, Adsorption`,
  `Describe the sources of error associated with the performance of the antiglobulin test. If a fresh specimen is not available how can a false positive DAT from a refrigerated sample be avoided? Page 163.
The prompt does not specify a resolution method, Use pre-warmed saline, Add a neutralizing agent, Increase the wash cycles`,
  `Explain the importance of the procedural steps in the DAT and IAT. What does grading the agglutination reaction in the IAT help determine? Page 161.
The strength of the reaction, The class of the antibody, The specificity of the antibody, The presence of hemolysis`,
  `Interpret the results of a DAT panel. Interpreting the significance of a positive DAT requires knowledge of the patient's diagnosis and what other information? Page 162.
Drug therapy and transfusion history, Diet and lifestyle, Family history, Recent travel`,
  `Describe the factors that affect the antiglobulin test. Adding the AHG reagent is a critical step that should not be delayed after what procedural step? Page 162.
Washing of RBCs, Incubation, Centrifugation, Adding patient serum`,
  `Describe the sources of error associated with the performance of the antiglobulin test. How can the antiglobulin reagent become contaminated with human globulins leading to neutralization? Page 163.
Touching the dropper with a serum covered finger, Leaving the vial open to the air, Storing it at the wrong temperature, Using it after the expiration date`
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