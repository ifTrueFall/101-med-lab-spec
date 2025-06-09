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
  `question: What is the term for the measure of the binding strength of a single antibody-antigen reaction?
Affinity, Avidity, Reactivity, Specificity`,
  `question: What term describes the unfolding or disorganization of a protein's tertiary structure rendering it insoluble?
Denaturation, Hydrolysis, Condensation, Polymerization`,
  `question: What are the building blocks or subunits of proteins called?
Amino Acid, Nucleic Acid, Fatty Acid, Monosaccharide`,
  `question: A protein that is lacking the ligand or prosthetic group it needs to be fully functional is called what?
Apoprotein, Holoprotein, Glycoprotein, Lipoprotein`,
  `question: A whole or completely functional protein made up of an apoprotein and its ligand is called what?
Holoprotein, Apoprotein, Simple Protein, Conjugated Protein`,
  `question: What is a non-protein chemical group bound to a protein and responsible for its biological activity called?
Prosthetic Group, Side Chain, Active Site, Allosteric Site`,
  `question: What is the term for a systemic response to infection tissue injury or an inflammatory process?
Acute Phase Reaction, Allergic Reaction, Autoimmune Response, Anaphylactic Shock`,
  `question: A monoclonal immunoglobulin produced in excessive amounts in disorders like multiple myeloma is called what?
Paraprotein, Cryoglobulin, Agglutinin, Opsonin`,
  `question: What type of bond is the covalent amide bond between the primary amino group of one amino acid and the carboxylic group of another?
Peptide Bond, Hydrogen Bond, Ionic Bond, Disulfide Bond`,
  `question: What unit of DNA specifies the production of proteins and RNA molecules?
Gene, Codon, Anticodon, Genome`,
  `question: What process involves transferring sequence information from gene regions of DNA to an mRNA molecule?
Transcription, Translation, Replication, Transduction`,
  `question: What is the process whereby an mRNA sequence forms an amino acid sequence with the help of tRNA?
Translation, Transcription, Splicing, Conjugation`,
  `question: Protein structure that consists of the specific sequence or order of amino acids is called what?
Primary structure, Secondary structure, Tertiary structure, Quaternary structure`,
  `question: The alpha-helix and beta-pleated sheet patterns are examples of what level of protein structure?
Secondary structure, Primary structure, Tertiary structure, Quaternary structure`,
  `question: The three-dimensional folded and convoluted shape of a single polypeptide chain is what level of protein structure?
Tertiary structure, Quaternary structure, Secondary structure, Primary structure`,
  `question: What is the primary function of transport proteins like hemoglobin and transferrin?
Carry materials from one place to another, Catalyze biological reactions, Provide structural support, Store nutrients`,
  `question: What is the most abundant plasma protein which is a major contributor to colloidal osmotic pressure?
Albumin, Fibrinogen, Transferrin, Haptoglobin`,
  `question: Which protein is a weak and late-reacting APR that binds to free hemoglobin to prevent its loss and toxic effects?
Haptoglobin, Albumin, Transferrin, Ceruloplasmin`,
  `question: A deficiency in alpha-1-Antitrypsin AAT can lead to what irreversible lung condition?
Emphysema, Asthma, Bronchitis, Pulmonary fibrosis`,
  `question: Ceruloplasmin's primary role is to oxidize iron from what state to what state enabling its transport?
Fe2+ to Fe3+, Fe3+ to Fe2+, Fe to Fe2+, Fe3+ to Fe`,
  `question: Transferrin is the major transport protein for which element?
Iron, Copper, Zinc, Calcium`,
  `question: In cases of iron deficiency anemia what happens to transferrin levels?
They are increased, They are decreased, They remain normal, They become undetectable`,
  `question: What is the most specific and sensitive protein marker for cardiac muscle injury?
Troponin, Creatine Kinase CK-MB, Myoglobin, Aspartate aminotransferase AST`,
  `question: C-reactive protein CRP is one of the first and strongest what?
Acute-phase proteins, Negative acute-phase proteins, Transport proteins, Coagulation factors`,
  `question: Chronically high levels of which coagulation protein are associated with an increased risk of cardiovascular disease?
Fibrinogen, Thrombin, Plasminogen, Prothrombin`,
  `question: Elevated levels of beta-2-microglobulin are indicative of what?
Impaired renal clearance, Normal liver function, Acute pancreatitis, Dehydration`,
  `question: Low levels of maternal alpha-Fetoprotein AFP indicate an increased risk for what fetal conditions?
Trisomy 18 and trisomy 21, Neural tube defects, Abdominal wall defects, Fetal distress`,
  `question: Antibodies are produced by which type of cells?
Plasma cells, Hepatocytes, T-lymphocytes, Erythrocytes`,
  `question: Which immunoglobulin class is the first to appear in response to antigenic stimulation?
IgM, IgG, IgA, IgE`,
  `question: Which immunoglobulin is the most abundant in blood plasma and can cross the placenta?
IgG, IgM, IgA, IgD`,
  `question: Which immunoglobulin is the main antibody found in body secretions like tears saliva and milk?
IgA, IgG, IgM, IgE`,
  `question: Which immunoglobulin is most associated with allergic and anaphylactic reactions?
IgE, IgA, IgM, IgG`,
  `question: Multiple Myeloma is a malignant neoplasm of a single clone of what cell type?
Plasma cells, Myeloid cells, T-cells, B-cells`,
  `question: What is a primary preanalytical concern for protein specimens that can be caused by vigorous mixing or pH shifts?
Denaturation, Precipitation, Contamination, Evaporation`,
  `question: What common specimen condition resulting from red blood cell lysis should be avoided for protein testing?
Hemolysis, Lipemia, Icterus, Turbidity`,
  `question: What classic protein testing method is based on quantifying the amount of nitrogen in proteins?
Kjeldahl Method, Biuret Method, Electrophoresis, Dye-Binding Method`,
  `question: The Biuret method measures the reaction of peptide bonds with what ions in alkaline conditions?
Cu2+ cupric ions, Fe3+ ferric ions, Mg2+ magnesium ions, Cl- chloride ions`,
  `question: Dye-binding methods for protein testing rely on shifts in what when dyes bind to proteins?
Absorbance spectra, Refractive index, Light scatter, pH`,
  `question: Which analytical technique separates proteins into five distinct bands based on their electrical charge?
Electrophoresis, Chromatography, Spectrophotometry, Nephelometry`,
  `question: On a serum electrophoresis strip which protein makes up the most prominent band?
Albumin, Gamma globulin, Alpha-1 globulin, Beta globulin`,
  `question: Which electrophoretic technique uses antibodies to evaluate individual immunoglobulin classes and light chains?
Immunofixation Electrophoresis IFE, Capillary Electrophoresis, Gel Electrophoresis, Western Blot`,
  `question: Turbidimetry and nephelometry are widely used to assay high abundance proteins by assessing the formation of what?
Aggregates, Colored products, Precipitates that dissolve, Gas bubbles`,
  `question: The direct photometric method for protein measurement is affected by the variable content of which two amino acids?
Tyrosine and tryptophan, Alanine and glycine, Leucine and valine, Cysteine and methionine`,
  `question: Which immunoglobulin is the predominate antibody seen in many autoimmune diseases?
IgG, IgM, IgA, IgE`,
  `question: Which protein is a sensitive indicator of hepatobiliary disease but is also elevated during periods of accelerated bone growth?
Alkaline Phosphatase ALP, Alanine Aminotransferase ALT, Aspartate Aminotransferase AST, Gamma-Glutamyltransferase GGT`,
  `question: Which enzyme is a more specific indicator of liver inflammation than AST?
Alanine Aminotransferase ALT, Lactate Dehydrogenase LD, Alkaline Phosphatase ALP, Creatine Kinase CK`,
  `question: What is the name of the protein that transports copper throughout the body?
Ceruloplasmin, Transferrin, Haptoglobin, Albumin`,
  `question: What is a key function of structural proteins like collagen and keratin?
Provide mechanical support, Catalyze reactions, Transport oxygen, Regulate pH`,
  `question: Insulin and glucagon are examples of what type of proteins?
Hormonal Proteins, Defensive Proteins, Transport Proteins, Structural Proteins`,
  `question: The basic structural unit of an immunoglobulin consists of two heavy chains and what else?
Two light chains, Two J chains, One secretory component, One carbohydrate chain`,
  `question: What is the fragment antigen binding site on an antibody also known as?
Fab, Fc, Hinge Region, Constant Domain`,
  `question: What is the effector site on an antibody that binds to cell receptors and determines its class called?
Fc, Fab, Variable Region, Light Chain`,
  `question: Which analytical method is considered the reference method for protein quantification but is too time-consuming for routine use?
Kjeldahl Method, Biuret Method, Dye-Binding Method, Nephelometry`,
  `question: The Biuret method requires the presence of at least how many peptide bonds to generate a detectable color change?
Three or more, Two, One, Four or more`,
  `question: On serum protein electrophoresis a monoclonal increase in immunoglobulins is seen as what?
A sharp spike in the gamma region, A broad increase in the gamma region, A decrease in the albumin band, An increase in the alpha-2 band`,
  `question: Which enzyme is primarily used to diagnose and monitor acute pancreatitis and is more specific than amylase?
Lipase, Alkaline Phosphatase, Aspartate Aminotransferase, Lactate Dehydrogenase`,
  `question: What is a major function of defensive proteins like antibodies?
Destroy and remove harmful material, Store iron, Transport lipids, Regulate blood sugar`,
  `question: Which protein's measurement is used to distinguish between in vivo and in vitro hemolysis?
Haptoglobin, Hemoglobin, Albumin, Fibrinogen`,
  `question: The synthesis of most plasma proteins such as albumin and fibrinogen occurs in which organ?
Liver, Kidneys, Spleen, Pancreas`,
  `question: The five fractions seen on serum electrophoresis are albumin alpha-1 alpha-2 beta and what other fraction?
Gamma, Delta, Epsilon, Zeta`
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