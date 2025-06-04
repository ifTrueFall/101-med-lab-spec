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
  `question: What is the approximate size of beta-2-microglobulin BMG?
11.8kDa, 40kDa, 725kDa, 66kDa`,
  `question: Beta-2-microglobulin BMG is found on the surface of which cells and in especially high numbers on lymphocytes?
All nucleated cells, Only red blood cells, Only platelets, Only epithelial cells`,
  `question: BMG is a light chain component of which important immune system complex?
Major histocompatibility complex HLA, Complement system, Immunoglobulin M, T-cell receptor`,
  `question: Due to its small size BMG is filtered by the glomerulus and mostly reabsorbed where in the kidney?
Proximal tubules, Distal tubules, Loop of Henle, Collecting ducts`,
  `question: Elevated plasma levels of beta-2-microglobulin are indicative of what?
Impaired renal clearance, Normal liver function, Acute pancreatitis, Efficient glomerular filtration`,
  `question: Overproduction of BMG can occur in which of these inflammatory diseases?
Rheumatoid arthritis, Osteoarthritis, Gout, Psoriasis`,
  `question: For HIV patients without renal disease monitoring BMG levels can help indicate what?
Large lymphocyte turnover, Viral load directly, CD4 count accurately, Opportunistic infection presence`,
  `question: BMG is used as a tumor marker for staging which type of cancer?
Multiple myeloma, Lung cancer, Breast cancer, Colon cancer`,
  `question: High levels of BMG in patients with chronic lymphocytic leukemia indicate what prognosis?
Decreased survival, Increased survival, No change in survival, Remission likelihood`,
  `question: Evaluation of urinary excretion of beta-2-microglobulin can be used as a marker of what?
Renal tubular function, Glomerular filtration rate, Liver damage, Muscle breakdown`,
  `question: Patients on long-term dialysis will have which protein's levels periodically monitored?
beta-2-microglobulin, Albumin, Transferrin, Haptoglobin`,
  `question: What is the typical testing method for quantification of BMG in blood and urine samples?
Immunoassays, Spectrophotometry, Electrophoresis, Chromatography`,
  `question: Normally what percentage of filtered BMG is excreted in the urine?
Less than 1 percent, About 10 percent, About 25 percent, More than 50 percent`,
  `question: Renal failure can cause plasma concentrations of BMG to elevate up to what level?
40mg/L, 10mg/L, 100mg/L, 5mg/L`,
  `question: BMG levels in healthy individuals are typically what?
Low, High, Extremely variable, Undetectable`,
  `question: Fibrinogen is critical to which physiological system?
Coagulation system, Immune system, Endocrine system, Digestive system`,
  `question: Where are coagulation factors including fibrinogen mainly produced?
Liver, Kidneys, Spleen, Bone marrow`,
  `question: Fibrinogen assists in clot formation after it is cleaved or activated by which enzyme?
Thrombin, Plasmin, Elastase, Trypsin`,
  `question: Once activated fibrinogen aggregates to form long fibers called what?
Fibrin, Collagen, Elastin, Keratin`,
  `question: Fibrin has binding sites for platelets and other cells to become trapped in its mesh network to form what?
A clot, An antibody-antigen complex, A lipoprotein particle, A hormone receptor`,
  `question: Proper levels of fibrinogen in the body are critical in preventing what?
Bleeding, Infection, Dehydration, Inflammation`,
  `question: How does fibrinogen behave as an Acute Phase Reactant APR?
It significantly elevates during the acute phase, It significantly decreases, It shows no change, It is a weak and late reactant`,
  `question: Chronically high levels of fibrinogen are associated with an increased risk of what?
Cardiovascular disease, Autoimmune disorders, Kidney stones, Liver cirrhosis`,
  `question: Low levels of fibrinogen can result from its usage to control extensive bleeding or a problem like what?
Disseminated intravascular coagulation DIC, Severe infection, Malnutrition, Dehydration`,
  `question: How is fibrinogen typically measured in the laboratory?
Functional assays that evaluate clotting, Primarily by electrophoresis, Using dye-binding methods, By measuring its breakdown products`,
  `question: On an electrophoresis pattern fibrinogen migrates to the area between which two regions?
Beta and gamma, Alpha-1 and alpha-2, Albumin and alpha-1, Prealbumin and albumin`,
  `question: An unintentional fibrinogen band on a serum electrophoresis pattern can be caused by what?
A serum specimen that is not allowed to fully clot, Hemolysis of the specimen, High lipid content in the specimen, Old or degraded specimen`,
  `question: Patient use of what type of therapy could lead to the unintentional presence of fibrinogen on serum electrophoresis?
Anticoagulation therapy, Antibiotic therapy, Chemotherapy, Hormone replacement therapy`,
  `question: Fibrinogen is one of the largest what?
Plasma proteins, Intracellular proteins, Membrane proteins, Hormones`,
  `question: What does thrombin do to fibrinogen?
Cleaves it activates it, Binds to it transports it, Inhibits its synthesis, Causes its denaturation`,
  `question: Where is C-reactive protein CRP synthesized?
Liver, Spleen, Lymph nodes, Bone marrow`,
  `question: How is C-reactive protein CRP classified as an acute-phase protein?
One of the first and strongest to elevate, A late and weak reactant, A negative acute-phase protein, Not an acute-phase protein`,
  `question: Within how many hours of onset of a triggering disease state do CRP levels begin to rise?
6 to 12 hours, 24 to 48 hours, 1 to 2 hours, 3 to 5 days`,
  `question: Peak levels of CRP are typically reached within how many hours from the initial onset?
48 hours, 12 hours, 72 hours, 96 hours`,
  `question: C-reactive protein assists in protecting the body against which types of infectious organisms?
Bacteria fungi and protozoans, Viruses only, Helminths only, Prions only`,
  `question: The process of protein-coating bacteria or fungus to enhance phagocytosis facilitated by CRP and complement is called what?
Opsonization, Neutralization, Agglutination, Precipitation`,
  `question: A CRP result greater than what value is usually considered high?
1mg/dL, 0.1mg/dL, 5mg/dL, 10mg/dL`,
  `question: Most infections and inflammations will result in CRP levels greater than what value?
10mg/dL, 1mg/dL, 5mg/dL, 20mg/dL`,
  `question: The American Heart Association and CDC have published evidence of a connection between CRP levels and what conditions?
Coronary heart disease and stroke, Liver disease and pancreatitis, Kidney disease and hypertension, Autoimmune disorders and allergies`,
  `question: Elevated levels of CRP are associated with an increased risk of developing which metabolic disorder?
Type 2 diabetes, Hyperthyroidism, Gout, Phenylketonuria`,
  `question: CRP levels are used to monitor disease activity in which chronic inflammatory disease?
Rheumatoid arthritis, Osteoarthritis, Fibromyalgia, Multiple sclerosis`,
  `question: In which of these conditions is C-reactive protein significantly elevated?
Myocardial infarctions, Chronic fatigue syndrome, Mild allergies, Stable hypertension`,
  `question: What method is generally used for measuring CRP?
Immunological methods such as turbidimetry, Electrophoresis, Spectrophotometry, Functional clotting assays`,
  `question: What is High-Sensitivity CRP hsCRP testing used for?
Measurement at lower levels such as in healthy subjects, Detecting only very high CRP levels, Identifying CRP isoforms, Measuring CRP in urine`,
  `question: The adult reference range for CRP is typically less than what value?
0.5mg/dL, 1.0mg/dL, 5.0mg/dL, 0.1mg/dL`,
  `question: On a serum electrophoresis strip CRPs location is based on the calcium content of the buffer and migrates between which regions?
gamma to mid beta regions, alpha-1 to alpha-2 regions, Albumin to alpha-1 region, Only in the gamma region`,
  `question: The complement system is a complex system of at least how many different proteins?
20, 10, 5, 50`,
  `question: Where are complement proteins mainly synthesized?
Liver, Kidneys, Spleen, Lymph nodes`,
  `question: The Classic Pathway of complement activation is primarily activated by complexes of immunoglobulins and what other protein?
CRP, Albumin, Fibrinogen, Transferrin`,
  `question: The Alternative Pathway of complement activation can be activated by what?
Bacterial lipopolysaccharides, Antibodies only, Viral RNA, Histamine`,
  `question: Which complement proteins most notably C3 and C4 elevate after an APR but are typically weak and late reacting?
C3 and C4, C1 and C2, C5 and C9, Factor B and Factor D`,
  `question: Genetic deficiency of complement C2 and C4 is commonly linked to which autoimmune complex disease?
Systemic lupus erythematosus SLE, Rheumatoid arthritis, Multiple sclerosis, Type 1 diabetes`,
  `question: Secondary decreases of complement components result from what?
Their use during a response, Decreased liver synthesis, Increased renal excretion, Genetic mutations only`,
  `question: Testing to differentiate between primary and secondary complement deficiency may include what?
Family studies phenotyping or DNA analysis, Only measuring C3 levels, Only measuring C4 levels, A complete blood count`,
  `question: Which cells produce small quantities of complement proteins besides the liver?
Monocytes, Erythrocytes, Platelets, Adipocytes`,
  `question: What is a characteristic of BMG due to its role in HLA?
It is a cornerstone for the immune system, It primarily transports lipids, It is an enzyme inhibitor, It is a major clotting factor`,
  `question: The fibrous network formed by aggregated fibrinogen is called what?
Fibrin, Thrombus, Embolus, Plaque`,
  `question: CRP can neutralize histones released after what event?
Cell death, Cell division, Phagocytosis, Viral entry`,
  `question: Cobra venom can activate which complement pathway?
The Alternative Pathway, The Classic Pathway, The Lectin Pathway, All pathways equally`,
  `question: What type of sample is typically used for BMG quantification via immunoassays?
Both blood and urine samples, Blood samples only, Urine samples only, CSF samples only`
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