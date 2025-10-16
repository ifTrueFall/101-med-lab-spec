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
  `question: Define autoantibody. What is the term for an antibody directed against an individual's own red blood cells? Page 304.
Autoantibody, Alloantibody, Isoantibody, Heteroantibody`,
  `question: Define autoantibody. The presence of an autoantibody may complicate which routine blood bank tests? Page 304.
ABO/Rh typing and compatibility testing, White blood cell count, Hemoglobin electrophoresis, Coagulation studies`,
  `question: Define autoantibody. Autoimmune hemolytic anemia (AIHA) is defined as a shortened RBC survival mediated through what? Page 304.
Humoral antibody production, T-cell mediated cytotoxicity, A bone marrow defect, Nutritional deficiency`,
  `question: Define autoantibody. Before a diagnosis of AIHA is established it is important to verify the presence of what? Page 304.
Immune-mediated RBC destruction, Decreased hemoglobin, A positive DAT, An underlying disease`,
  `question: Compare the types of hemolytic anemias. In compensated hemolytic anemia what is the relationship between RBC production and destruction? Page 305.
Production nearly equals destruction, Destruction exceeds production, Production exceeds destruction, Production has ceased`,
  `question: Compare the types of hemolytic anemias. In uncompensated hemolytic anemia which of the following laboratory findings would be expected on a blood smear? Page 305.
Macrocytosis and spherocytosis, Microcytosis and hypochromia, Normal morphology, Target cells and basophilic stippling`,
  `question: Compare the types of hemolytic anemias. In uncompensated hemolytic anemia haptoglobin levels are markedly decreased due to its role in clearing what from the plasma? Page 305.
Hemoglobin, Bilirubin, Lactate dehydrogenase, Reticulocytes`,
  `question: Compare the types of hemolytic anemias. AIHA must be confirmed by additional serologic testing including a DAT and characterization of the autoantibody in the serum or what? Page 305.
Eluate, Urine, Saliva, Bone marrow`,
  `question: Compare the types of hemolytic anemias. AIHA may be diagnosed and classified as cold reactive warm reactive or what other type? Page 306.
Drug-induced, Alloimmune, Transfusion-related, Inherited`,
  `question: Describe the characteristics of cold autoagglutinins. At what temperature are benign cold agglutinins most commonly detected? Page 306.
4 C, 37 C, 22 C, 56 C`,
  `question: Describe the characteristics of cold autoagglutinins. Benign cold autoantibodies are typically which class of immunoglobulin? Page 306.
IgM, IgG, IgA, IgE`,
  `question: Describe the characteristics of cold autoagglutinins. How can false-positive reactions in ABO typing due to cold agglutinins be resolved? Page 306.
Washing the cells with warm saline, Using a different reagent, Adding LISS, Performing an elution`,
  `question: Describe the characteristics of cold autoagglutinins. The DAT of a patient with benign cold autoagglutinins is typically negative unless what type of specimen is used? Page 307.
A clotted specimen, An EDTA specimen, A heparinized specimen, A fresh specimen`,
  `question: Describe the characteristics of cold autoagglutinins. Most cold reactive autoantibodies have which specificity? Page 307.
Anti-I, Anti-i, Anti-H, Anti-P`,
  `question: Describe the characteristics of cold autoagglutinins. The I antigen is fully expressed on adult RBCs but is only weakly expressed on what type of RBCs? Page 307.
Cord RBCs, Senescent RBCs, Reticulocytes, O-type RBCs`,
  `question: Describe the characteristics of cold autoagglutinins. At what age do infants' RBCs typically reach adult levels of I antigen expression? Page 307.
2 years, 6 months, 1 year, 5 years`,
  `question: Describe the characteristics of cold autoagglutinins. Anti-H is a cold agglutinin sometimes found in the sera of individuals with what blood types? Page 308.
A1 and A1B, O and A2, B and AB, All ABO types`,
  `question: Describe the characteristics of cold autoagglutinins. It is important not to confuse benign cold reactive anti-H with the potent alloanti-H found in the serum of individuals with what phenotype? Page 308.
Oh (Bombay), A3, Bx, Rh-null`,
  `question: Discuss pathologic cold autoagglutinins including laboratory testing and treatment. Cold Hemagglutinin Disease (CHD) is an AIHA that can be a chronic idiopathic condition or an acute disorder associated with what infectious agent? Page 308.
Mycoplasma pneumoniae, Staphylococcus aureus, Streptococcus pyogenes, Escherichia coli`,
  `question: Discuss pathologic cold autoagglutinins including laboratory testing and treatment. Cold hemagglutinin disease (CHD) has a peak incidence in individuals of what age? Page 309.
Over 50 years, Under 20 years, 20 to 40 years, All ages equally`,
  `question: Discuss pathologic cold autoagglutinins including laboratory testing and treatment. The antibody specificity in CHD is almost always what? Page 309.
Anti-I, Anti-i, Anti-H, Anti-P`,
  `question: Discuss pathologic cold autoagglutinins including laboratory testing and treatment. Symptoms of CHD such as pain and a bluish tinge in the fingertips and toes are known as what? Page 309.
Raynaud's disease, Acrocyanosis, Hemoglobinuria, Jaundice`,
  `question: Discuss pathologic cold autoagglutinins including laboratory testing and treatment. The DAT in a patient with CHD is positive due to what? Page 309.
Complement only, IgG only, IgG and complement, IgM only`,
  `question: Discuss pathologic cold autoagglutinins including laboratory testing and treatment. What is the most important treatment for patients with CHD who do not require transfusion? Page 309.
Avoid the cold and keep warm, Corticosteroids, Splenectomy, Immunosuppressive drugs`,
  `question: Discuss pathologic cold autoagglutinins including laboratory testing and treatment. Paroxysmal Cold Hemoglobinuria (PCH) is the least common type of AIHA and often occurs in children following what? Page 310.
Viral illnesses, Bacterial infections, Transfusion, Trauma`,
  `question: Discuss pathologic cold autoagglutinins including laboratory testing and treatment. The classic antibody produced in PCH is called the Donath-Landsteiner antibody and has what specificity? Page 310.
Autoanti-P, Autoanti-I, Autoanti-i, Autoanti-H`,
  `question: Discuss pathologic cold autoagglutinins including laboratory testing and treatment. The Donath-Landsteiner antibody is referred to as a biphasic autohemolysin because it binds to RBCs at lower temperatures and does what? Page 310.
Fixes complement, Elutes at warm temperatures, Causes direct agglutination, Is neutralized by plasma`,
  `question: Discuss pathologic cold autoagglutinins including laboratory testing and treatment. What is the only useful therapy for patients with PCH? Page 310.
Protection from cold exposure, Steroids, Splenectomy, Plasma exchange`,
  `question: Differentiate between idiopathic warm autoimmune hemolytic anemia (WAIHA) and drug-induced immune hemolytic anemia. About what percentage of reported AIHA cases are of the warm reactive type? Page 311.
70%, 18%, 10%, 90%`,
  `question: Differentiate between idiopathic warm autoimmune hemolytic anemia (WAIHA) and drug-induced immune hemolytic anemia. The serology workup for DIIHA is unique in that the antibody will only be reactive with RBCs in the presence of what? Page 311.
The drug, The patient's serum, Complement, A specific enzyme`,
  `question: Differentiate between idiopathic warm autoimmune hemolytic anemia (WAIHA) and drug-induced immune hemolytic anemia. In the drug-adsorption (hapten) mechanism of DIIHA where does the drug bind? Page 311.
To proteins on the RBC membrane, To the antibody molecule, To complement components, To soluble plasma proteins`,
  `question: Differentiate between idiopathic warm autoimmune hemolytic anemia (WAIHA) and drug-induced immune hemolytic anemia. Which drug is most commonly associated with the drug-adsorption mechanism? Page 312.
Penicillin, Methyldopa, Cephalothin, Quinidine`,
  `question: Differentiate between idiopathic warm autoimmune hemolytic anemia (WAIHA) and drug-induced immune hemolytic anemia. In the immune complex ("innocent bystander") mechanism what sensitizes the cell and may proceed to lysis? Page 312.
Complement, The drug itself, IgG antibody, The drug-antibody complex`,
  `question: Differentiate between idiopathic warm autoimmune hemolytic anemia (WAIHA) and drug-induced immune hemolytic anemia. Which drug is known for causing nonimmunologic protein adsorption to the RBC membrane? Page 312.
Cephalothin (Keflin), Penicillin, Methyldopa, L-dopa`,
  `question: Differentiate between idiopathic warm autoimmune hemolytic anemia (WAIHA) and drug-induced immune hemolytic anemia. Which drug induces the production of a true autoantibody that recognizes RBC antigens by altering T-suppressor cell function? Page 312.
Alpha-methyldopa (Aldomet), Penicillin, Cephalothin, Quinidine`,
  `question: Describe the clinical and laboratory findings in WAIHA. The onset of WAIHA may be precipitated by factors such as infection trauma surgery or what else? Page 313.
Pregnancy, Certain foods, Cold exposure, Vaccination`,
  `question: Describe the clinical and laboratory findings in WAIHA. A peripheral blood smear in a patient with WAIHA usually exhibits polychromasia and macrocytosis reflecting what? Page 313.
Reticulocytosis, Iron deficiency, Aplastic crisis, Bone marrow failure`,
  `question: Describe the clinical and laboratory findings in WAIHA. Most patients with WAIHA have which immunoglobulins and/or complement components on their RBCs? Page 313.
Both IgG and complement, IgG only, Complement only, IgM only`,
  `question: Describe the clinical and laboratory findings in WAIHA. RBC destruction resulting from sensitization with IgG antibody is primarily what type of hemolysis? Page 313.
Extravascular, Intravascular, Mechanical, Osmotic`,
  `question: Describe the clinical and laboratory findings in WAIHA. Warm reactive autoantibodies are typically which class of immunoglobulin? Page 313.
IgG, IgM, IgA, IgE`,
  `question: Describe the clinical and laboratory findings in WAIHA. The presence of warm autoantibodies can interfere with Rh(D) typing requiring the use of what? Page 313.
A separate Rh control, Monoclonal anti-D only, A DAT test, An eluate`,
  `question: Describe the clinical and laboratory findings in WAIHA. What is a common first-line therapy for WAIHA that involves corticosteroids? Page 314.
Prednisone, Splenectomy, Immunosuppressive drugs, Plasma exchange`,
  `question: Describe the clinical and laboratory findings in WAIHA. If steroid therapy fails for a WAIHA patient what is usually the next recommended treatment? Page 314.
Splenectomy, Immunosuppressive drugs, IVIG, Rituximab`,
  `question: Compare and contrast the procedures used to detect alloantibodies in the presence of cold and warm autoantibodies. Reactivity caused by cold autoagglutinins can mask the presence of what? Page 314.
Clinically significant alloantibodies, Benign autoantibodies, ABO discrepancies, Rh discrepancies`,
  `question: Compare and contrast the procedures used to detect alloantibodies in the presence of cold and warm autoantibodies. The use of which antiglobulin reagent will eliminate most problems with cold autoagglutinin reactivity in the IAT phase? Page 314.
Anti-IgG, Polyspecific, Anti-C3d, Anti-IgM`,
  `question: Compare and contrast the procedures used to detect alloantibodies in the presence of cold and warm autoantibodies. What is the preferred method to remove a cold reacting autoantibody to investigate underlying alloantibodies? Page 314.
Cold autoadsorption, Prewarm technique, Elution, Enzyme treatment`,
  `question: Compare and contrast the procedures used to detect alloantibodies in the presence of cold and warm autoantibodies. Rabbit erythrocyte stroma is commercially available and rich in which antigen making it useful in adsorption procedures? Page 314.
I antigen, i antigen, P antigen, H antigen`,
  `question: Compare and contrast the procedures used to detect alloantibodies in the presence of cold and warm autoantibodies. To determine a patient's RBC phenotype in the presence of a positive DAT their RBCs can be treated with what chemical to remove coating IgG? Page 314.
Chloroquine diphosphate, Dithiothreitol (DTT), Ficin, Saline`,
  `question: Define autoantibody. A positive DAT in a healthy asymptomatic blood donor is a relatively common finding. Page 304.
True, False, Only in O-negative donors, Only in female donors`,
  `question: Compare the types of hemolytic anemias. A reticulocyte count greater than what percentage is often seen in uncompensated hemolytic anemia? Page 305.
3%, 1%, 10%, 0.5%`,
  `question: Describe the characteristics of cold autoagglutinins. Anti-i is a relatively uncommon autoantibody that reacts best with which type of cells? Page 308.
Cord RBCs, Adult RBCs, O-type RBCs, A1-type RBCs`,
  `question: Differentiate between idiopathic warm autoimmune hemolytic anemia (WAIHA) and drug-induced immune hemolytic anemia. Most penicillin antibodies are of what immunoglobulin class and therefore not detected by the antiglobulin test? Page 312.
IgM, IgG, IgA, IgD`,
  `question: Differentiate between idiopathic warm autoimmune hemolytic anemia (WAIHA) and drug-induced immune hemolytic anemia. The penicillin antibody responsible for a positive DAT and hemolysis is most often of what class? Page 312.
IgG, IgM, IgA, IgE`,
  `question: Discuss pathologic cold autoagglutinins including laboratory testing and treatment. Besides M. pneumoniae infection secondary cold AIHA is also often associated with what other infectious disease? Page 308.
Infectious mononucleosis, Pneumonia, Syphilis, Influenza`,
  `question: Describe the characteristics of cold autoagglutinins. Anti-IH is a cold autoagglutinin that agglutinates only RBCs that have which two antigens? Page 308.
I and H antigens, i and H antigens, I and A antigens, H and P antigens`,
  `question: Differentiate between idiopathic warm autoimmune hemolytic anemia (WAIHA) and drug-induced immune hemolytic anemia. A positive DAT is found in approximately 3% of patients receiving which drug due to nonimmunologic protein adsorption? Page 312.
Cephalothin (Keflin), Penicillin, Methyldopa, Quinidine`,
  `question: Describe the clinical and laboratory findings in WAIHA. A patient with WAIHA having both IgG and complement on their RBCs is the most common finding. Page 313.
True, False, Only in drug-induced cases, Only in idiopathic cases`,
  `question: Describe the characteristics of cold autoagglutinins. The DAT of a patient with benign cold autoagglutinins is negative. Page 307.
True, False, Always positive, Only positive with anti-IgG`,
  `question: Compare and contrast the procedures used to detect alloantibodies in the presence of cold and warm autoantibodies. Which technique can be useful in differentiating between cold autoantibodies and alloantibodies? Page 314.
Prewarm technique, Direct antiglobulin test, Elution technique, ABO typing`,
  `question: Compare the types of hemolytic anemias. A decrease in which of the following is an indicator of increased RBC destruction? Page 305.
Haptoglobin, Reticulocyte count, Unconjugated bilirubin, LDH`
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