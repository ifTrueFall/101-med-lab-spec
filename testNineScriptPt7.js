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
  `question: What are immunoglobulins also known as?
Antibodies, Antigens, Haptens, Cytokines`,
  `question: Unlike most other plasma proteins where are antibodies NOT produced?
Liver, Plasma cells, B lymphocytes, Bone marrow`,
  `question: Immunoglobulins are produced by which type of cells?
Plasma cells, T lymphocytes, Hepatocytes, Erythrocytes`,
  `question: How many main classes of immunoglobulins are there?
5, 3, 7, 10`,
  `question: Which immunoglobulin class has 4 subclasses?
IgG, IgM, IgA, IgE`,
  `question: The basic unit of an antibody consists of how many heavy and light chains?
Two heavy and two light chains, One heavy and one light chain, Two heavy and one light chain, One heavy and two light chains`,
  `question: The heavy and light chains in an antibody are held together by what type of bonds?
Disulfide bonds, Hydrogen bonds, Ionic bonds, Peptide bonds`,
  `question: The smaller light chains of immunoglobulins are classified as either kappa or what other type?
Lambda, Alpha, Beta, Gamma`,
  `question: What is the typical ratio of kappa to lambda light chains that is sometimes used as an indicator of immune abnormalities?
2 to 1, 1 to 1, 1 to 2, 3 to 1`,
  `question: Which immunoglobulin class can exist in a pentamer structure?
IgM, IgG, IgA, IgE`,
  `question: Which immunoglobulin class can exist in a dimer structure?
IgA, IgM, IgG, IgD`,
  `question: What are the variable ends of the heavy and light chains also called?
Fab or antigen binding site, Fc or effector site, Constant region, Hinge region`,
  `question: The body's ability to recognize a diverse range of antigens with only 5 classes of antibodies is due to the variability of which part of the antibody?
Variable ends, Constant regions of heavy chains, Fc portion, Light chains only`,
  `question: The locations on an antigen where the Fab portion of an antibody binds are termed what?
Epitopes, Paratopes, Haptens, Adjuvants`,
  `question: The strength of attraction between a single Fab site and a single epitope is known as what?
Affinity, Avidity, Reactivity, Specificity`,
  `question: What occurs when an epitope of one antigen reacts with an antibody made for a different antigen due to structural similarities?
Cross reactivity, Autoimmunity, Opsonization, Agglutination`,
  `question: What term describes the overall combined strength of the reactions between all individual binding sites of an antibody and an antigen?
Avidity, Affinity, Potency, Capacity`,
  `question: The constant regions on the heavy chains determine what characteristic of an immunoglobulin?
Class and subclass, Antigen specificity, Affinity, Light chain type`,
  `question: Which immunoglobulin serves as the "first responder" appearing first in response to antigenic stimulation?
IgM, IgG, IgA, IgE`,
  `question: Which antibody is produced by the underdeveloped immune system of neonates?
IgM, IgG, IgA, IgE`,
  `question: Can IgM cross the placenta from mother to fetus?
No it cannot cross the placenta, Yes it readily crosses the placenta, Only in certain conditions, Only its Fab fragment crosses`,
  `question: In adults IgM makes up approximately what percentage of the total circulating immunoglobulins?
5 to 10 percent, 70 to 75 percent, 10 to 15 percent, Less than 1 percent`,
  `question: The majority of IgM in the serum exists in what structural format?
Pentamer, Monomer, Dimer, Trimer`,
  `question: Which immunoglobulin is often called the "naturally occurring antibody" due to its ability to bind antigens not previously encountered?
IgM, IgG, IgA, IgD`,
  `question: Which immunoglobulin is the most abundant in blood plasma and lymph?
IgG, IgM, IgA, IgE`,
  `question: How many subclasses does IgG have?
Four, Two, Three, None`,
  `question: What is the approximate circulating half-life of IgG?
22 days, 3 days, 5 days, 10 days`,
  `question: Which immunoglobulin class acts on bacteria fungi viruses and foreign particles by agglutination opsonization and activating complement?
IgG, IgM, IgA, IgE`,
  `question: Which region of IgG allows it to cross the placenta?
Fc region, Fab region, Variable region of light chain, Hinge region`,
  `question: IgG found in a newborn's serum was synthesized by whom?
The mother, The newborn, Both mother and newborn equally, The placenta`,
  `question: Hemolytic disease of the newborn can occur if maternal IgG reacts with fetal red cells often in what Rh scenario?
Rh negative mother and Rh positive baby, Rh positive mother and Rh negative baby, Both parents Rh positive, Both parents Rh negative`,
  `question: What happens to IgG concentrations in early infancy?
They fall as maternal IgG clears before the baby produces its own, They rise rapidly due to baby's production, They remain constant from birth, They are initially very low then rise`,
  `question: The bottom "Y" portion of the antibody also known as the effector site is called what?
Fc region, Fab region, N-terminal region, Variable domain`,
  `question: The Fc portion of an antibody interacts with cell receptors to regulate effects like opsonization and what other process?
Cell lysis, Antigen binding, Affinity maturation, Class switching`,
  `question: IgA makes up approximately what percentage of the total serum immunoglobulins?
10 to 15 percent, 70 to 75 percent, 5 to 10 percent, Less than 1 percent`,
  `question: Besides its monomer structure a portion of IgA in the body exists in what other form?
Dimeric structure, Pentameric structure, Trimeric structure, Tetrameric structure`,
  `question: IgA is synthesized heavily by plasma cells found in the gut bronchi and what other specific location?
Ductules in the breast of lactating women, Spleen, Thymus, Liver`,
  `question: Which immunoglobulin is the main antibody in body fluids such as tears saliva milk and colostrum?
IgA, IgG, IgM, IgE`,
  `question: What special structural feature allows IgA to be transported across mucosal epithelium into secretions?
Secretory unit, J chain, Extra disulfide bond, Modified Fc region`,
  `question: Which immunoglobulin is most associated with allergic reactions and anaphylactic reactions?
IgE, IgA, IgG, IgM`,
  `question: IgE has a monomer structure that rapidly and firmly binds to what type of cells?
Mast cells, Neutrophils, T lymphocytes, Erythrocytes`,
  `question: The Fc portion of IgE binds to receptors on mast cells triggering the release of what substance when cross-linked?
Histamine, Serotonin, Bradykinin, Prostaglandins`,
  `question: Which immunoglobulin class accounts for less than 1 percent of total plasma Ig and its primary function is not clearly understood?
IgD, IgE, IgM, IgA`,
  `question: Increases in IgG can be seen in patients with liver disease infections and what other condition?
IgG myeloma, Acute allergic reactions, Primary IgM response, Severe burns`,
  `question: Decreased IgG levels are associated with acquired immunodeficiency and what other clinical issue?
Increased susceptibility to infections, Chronic inflammation, Autoimmune complex diseases, Allergic hypersensitivity`,
  `question: Which immunoglobulin class is predominantly seen in many autoimmune diseases?
IgG, IgM, IgA, IgE`,
  `question: Many cryoglobulins which precipitate at temperatures lower than normal body temperature are of which immunoglobulin class?
IgM, IgG, IgA, IgE`,
  `question: IgE elevation is observed in many inflammatory and infectious diseases along with what other responses?
Allergic responses, Autoimmune responses, Graft versus host disease, Delayed hypersensitivity`,
  `question: IgD elevations can be seen in patients with infections liver disease and what other type of disorders?
Connective tissue disorders, Neurological disorders, Metabolic disorders, Hematological malignancies`,
  `question: Multiple Myeloma is a malignant neoplasm normally of a single clone of what type of cells?
Plasma cells, T cells, B cells precursor, Myeloid cells`,
  `question: A solitary tumor form of Multiple Myeloma is called what?
Plasmacytoma, Lymphoma, Sarcoma, Carcinoma`,
  `question: Symptoms of Multiple Myeloma include weight loss anemia hemorrhage and what kidney-related issue?
Renal failure due to paraproteins, Glomerulonephritis due to immune complexes, Kidney stones due to calcium, Polycystic kidney disease`,
  `question: On a serum protein electrophoresis SPE immunoglobulins typically migrate to which region?
Gamma region, Beta region, Alpha-2 region, Albumin region`,
  `question: Monoclonal increases of immunoglobulins are seen on an SPE pattern as what?
Spikes, Diffuse bands, Depressed areas, Not visible`,
  `question: What laboratory technique is used to evaluate monoclonal proteins in both serum and urine by separating main antibody classes and light chains?
Immunofixation electrophoresis IFE, Standard protein electrophoresis SPE, Capillary electrophoresis, Immunodiffusion`,
  `question: IFE separates the three main antibodies IgG IgM IgA as well as what other components?
Free light chains kappa and lambda, J chains, Secretory components, Heavy chain fragments`,
  `question: Immunoassays for free light chains are beneficial for measurement of disorders related to what?
Immunoglobulin synthesis, Complement activation, Antigen processing, Cell-mediated immunity`,
  `question: The light chains kappa and lambda are typically produced in what quantity relative to what is needed for intact immunoglobulins?
In excess, In deficit, Exactly the amount needed, Only upon stimulation`,
  `question: The primary structure of IgA found in secretions like milk and saliva is what?
Dimeric, Monomeric, Pentameric, Tetrameric`,
  `question: Which immunoglobulin class is known to activate the complement system effectively as part of its function?
IgG particularly certain subclasses, IgA only, IgE exclusively, IgD`
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