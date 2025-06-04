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
  `question: What are the fundamental building blocks of proteins?
Amino acids, Fatty acids, Nucleic acids, Monosaccharides`,
  `question: An amino acid used for forming proteins is classified as what type due to the placement of its amino group?
alpha-amino acid, beta-amino acid, gamma-amino acid, delta-amino acid`,
  `question: Approximately how many natural amino acids serve as the ingredients for proteins?
20, 10, 30, 50`,
  `question: Amino acids differ from one another based on the chemical composition of what group?
R groups side chains, Amino groups, Carboxyl groups, Phosphate groups`,
  `question: What term describes amino acids that must be supplied by the diet because the body cannot synthesize them rapidly enough?
Essential amino acids, Non-essential amino acids, Conditional amino acids, Dispensable amino acids`,
  `question: What is the primary purpose of amino acids in the body?
Synthesis of body proteins, Production of energy, Storage of fats, Formation of carbohydrates`,
  `question: Purines and pyrimidines are examples of what type of compounds synthesized from amino acids?
Nonprotein nitrogen-containing compounds, Protein compounds, Lipid compounds, Carbohydrate compounds`,
  `question: Which organ is a very active site for both metabolism and synthesis of amino acids?
Liver, Kidney, Spleen, Pancreas`,
  `question: The use of amino acids as a fuel source results in the production of what waste product before its conversion in the liver?
Ammonium ions, Uric acid, Creatinine, Bilirubin`,
  `question: In the liver ammonium ions are converted to what substance via the urea cycle?
Urea, Uric acid, Ammonia, Amino acids`,
  `question: Thyroid hormones T3 and T4 are examples of signaling molecules for which amino acids serve as precursors?
Hormones, Neurotransmitters, Enzymes, Antibodies`,
  `question: How are amino acids covalently linked together in a protein?
Peptide bond, Hydrogen bond, Ionic bond, Disulfide bond`,
  `question: The formation of a peptide bond is what type of reaction due to the loss of water?
Dehydration reaction, Hydration reaction, Oxidation reaction, Reduction reaction`,
  `question: What happens during denaturation of a protein?
Unfolding of the protein structure, Formation of new peptide bonds, Synthesis of amino acids, Hydrolysis of the protein`,
  `question: Which of the following can cause protein denaturation?
Increases in temperature, Stable pH, Low mechanical stress, Presence of coenzymes`,
  `question: Is the damage caused by protein denaturation typically reversible or irreversible?
Irreversible, Reversible, Partially reversible, Conditionally reversible`,
  `question: What level of protein structure involves the combination of multiple protein subunits?
Quaternary structure, Primary structure, Secondary structure, Tertiary structure`,
  `question: Lactate dehydrogenase and hemoglobin are examples of proteins with what level of structure?
Quaternary structure, Primary structure, Secondary structure, Only tertiary structure`,
  `question: How many subunits make up a molecule of hemoglobin?
Four, Two, Three, Five`,
  `question: Creatine kinase isoenzymes like CK-MM CK-MB or CK-BB are formed from combinations of how many different subunits?
Two M or B, Three M B or H, Four M B H or L, One type only`,
  `question: What are proteins called when they are lacking their ligand or prosthetic group such as apolipoproteins lacking lipids?
Apoproteins, Holoproteins, Glycoproteins, Metalloproteins`,
  `question: What defines the primary structure of a protein?
The specific sequence of amino acids, The alpha-helix formation, The three-dimensional folding, The subunit arrangement`,
  `question: A chain of how many or more amino acids linked by peptide bonds is then considered a protein?
40, 10, 20, 100`,
  `question: The primary structure of a protein is ultimately defined by information in what cellular molecules?
DNA or RNA, Lipids, Carbohydrates, Minerals`,
  `question: What type of bonds are primarily responsible for maintaining the secondary structure of a protein?
Hydrogen bonds, Peptide bonds, Ionic bonds, Disulfide bonds`,
  `question: Which of the following is a common pattern found in the secondary structure of proteins?
alpha-helix, beta-strand only, gamma-turn, delta-loop`,
  `question: What level of protein structure is the three-dimensional folded and convoluted shape of a single polypeptide chain?
Tertiary structure, Primary structure, Secondary structure, Quaternary structure`,
  `question: Which level of protein structure grants the protein its specific biological properties and physical appearance?
Tertiary structure, Primary structure, Only secondary structure, Aggregate structure`,
  `question: Which of the following is a major function of proteins?
Enzymatic, Energy storage primarily, Genetic information carrier, Solvent for reactions`,
  `question: What is the role of enzymatic proteins?
Biological catalysts, Structural support, Oxygen transport, Hormone signaling`,
  `question: What is an apoenzyme?
An enzyme lacking its cofactor or coenzyme, A fully functional enzyme, A denatured enzyme, An enzyme substrate complex`,
  `question: Coenzymes required for some enzyme function are usually sourced from what?
Vitamins, Minerals, Lipids, Nucleic acids`,
  `question: Oxidoreductases are a class of enzymes that catalyze what type of reactions?
Electron transfer or oxidation reduction reactions, Transfer of functional groups, Hydrolysis reactions, Isomerization reactions`,
  `question: Kinases which transfer phosphate groups belong to what major enzyme class?
Transferases, Hydrolases, Lyases, Isomerases`,
  `question: Amylase which cleaves bonds with the addition of water belongs to what enzyme class?
Hydrolases, Transferases, Oxidoreductases, Ligases`,
  `question: Proteins can be broadly split into which two major groups?
Simple and compound proteins, Acidic and basic proteins, Soluble and insoluble proteins, Monomeric and polymeric proteins`,
  `question: Albumin and immunoglobulins are examples of what type of simple proteins?
Globular proteins, Fibrous proteins, Membrane proteins, Structural proteins`,
  `question: Collagens and keratins are examples of what type of simple proteins?
Fibrous proteins, Globular proteins, Transport proteins, Enzymatic proteins`,
  `question: Mucoproteins and lipoproteins are examples of what type of proteins that contain a nonprotein prosthetic group?
Compound conjugated proteins, Simple proteins, Denatured proteins, Incomplete proteins`,
  `question: Which protein is typically NOT present in a serum sample but is found in plasma?
Fibrinogen, Albumin, Transferrin, Immunoglobulin G`,
  `question: Where are the majority of plasma proteins produced?
Liver or B lymphocytes, Kidneys or spleen, Bone marrow or thymus, Muscle or adipose tissue`,
  `question: Which of these factors can affect plasma protein levels in the body?
Nutritional status, Blood type, Eye color, Height`,
  `question: Which of the following is one of the five major fractions seen on serum protein electrophoresis?
Albumin, Hemoglobin fraction, Myoglobin fraction, Creatine kinase fraction`,
  `question: Which serum electrophoresis fraction is further divided into beta-1 and beta-2 but grouped together on the test?
Beta fraction, Alpha-1 fraction, Alpha-2 fraction, Gamma fraction`,
  `question: Receptor proteins are typically located where in the cell?
Membrane of cells, Nucleus, Cytoplasm, Mitochondria`,
  `question: Actin and myosin are examples of what type of proteins necessary for movement?
Contractile Proteins, Transport Proteins, Storage Proteins, Defensive Proteins`,
  `question: Plasma proteins can serve as a reserve source of energy during what condition?
Starvation, Exercise, Sleep, Digestion`,
  `question: Some proteins like albumin help regulate pH by acting as what?
Buffers, Enzymes, Hormones, Carriers`,
  `question: Plasma proteins like albumin regulate the distribution of water throughout body compartments by contributing to what force?
Osmotic Force, Hydrostatic Force, Electromotive Force, Gravitational Force`,
  `question: Significantly reduced levels of plasma protein can lead to an increase in interstitial fluid and what clinical condition?
Edema, Dehydration, Hypertension, Jaundice`,
  `question: Keratin which makes up hair and fingernails is an example of what type of protein?
Structural Proteins, Hormonal Proteins, Enzymatic Proteins, Receptor Proteins`,
  `question: Insulin and glucagon are examples of what type of proteins that act as chemical messengers?
Hormonal Proteins, Defensive Proteins, Storage Proteins, Contractile Proteins`,
  `question: Antibodies which help destroy and remove harmful material are examples of what type of proteins?
Defensive Proteins, Transport Proteins, Structural Proteins, Enzymatic Proteins`,
  `question: Ferritin which stores iron is an example of what type of protein?
Storage Proteins, Hormonal Proteins, Receptor Proteins, Contractile Proteins`,
  `question: Transferrin which transports ferric ions is an example of what type of protein?
Transport Proteins, Storage Proteins, Defensive Proteins, Structural Proteins`,
  `question: What is the systemic response to infection injury or inflammatory processes that affects plasma protein concentrations?
Acute phase response APR, Allergic reaction, Autoimmune response, Chronic fatigue syndrome`,
  `question: Proteins that elevate in response to an APR are termed what?
Positive APPs, Negative APPs, Neutral APPs, Reactive APPs`,
  `question: Proteins that lower in response to an APR are termed what?
Negative APPs, Positive APPs, Suppressed APPs, Inhibited APPs`,
  `question: The length of time of an injury inflammation or illness affects the levels of APPs leading to differences between what phases?
Acute and chronic phases, Initial and resolving phases, Latent and active phases, Early and late phases`,
  `question: Concentrations of plasma proteins depend on their rate of synthesis their rate of clearance and what other factor?
Extracellular distribution, Intracellular degradation, Genetic predisposition, Dietary intake only`
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