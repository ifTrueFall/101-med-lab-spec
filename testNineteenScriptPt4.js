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
  `question: Describe the preparation and examination of urine sediment for microscopic analysis. Page 54. For microscopic analysis a urine specimen should be centrifuged for 5 minutes at what relative centrifugal force RCF?
    400, 1000, 200, 1500`,
  `question: Describe the preparation and examination of urine sediment for microscopic analysis. Page 54. In what type of urine can RBCs WBCs and hyaline casts disintegrate rapidly?
    Dilute alkaline, Concentrated acidic, Neutral, Concentrated alkaline`,
  `question: Describe the preparation and examination of urine sediment for microscopic analysis. Page 54. Refrigeration of a urine specimen may cause the precipitation of amorphous urates and what else?
    Phosphates, Oxalates, Sulfates, Carbonates`,
  `question: Describe the preparation and examination of urine sediment for microscopic analysis. Page 54. What is the standard amount of urine typically centrifuged for microscopic analysis?
    10 to 15 mL, 5 to 10 mL, 1 to 5 mL, 20 to 25 mL`,
  `question: Describe the preparation and examination of urine sediment for microscopic analysis. Page 55. Why should the braking mechanism on a centrifuge not be used when preparing urine sediment?
    It causes disruption of the sediment, It damages the centrifuge, It heats the specimen, It is too slow`,
  `question: Describe the preparation and examination of urine sediment for microscopic analysis. Page 55. Using the conventional glass-slide method what volume of sediment is placed on the slide?
    20 uL, 50 uL, 10 uL, 100 uL`,
  `question: Describe the preparation and examination of urine sediment for microscopic analysis. Page 55. Under what microscope power are casts initially detected and enumerated?
    Low power 10X, High power 40X, Oil immersion 100X, Scanning power 4X`,
  `question: Describe the preparation and examination of urine sediment for microscopic analysis. Page 56. How are RBCs and WBCs reported?
    Average number per 10 hpf, Average number per 10 lpf, Semiquantitative terms, Presence or absence`,
  `question: Describe the sediment stains used for microscopic analysis of urine. Page 56. What is the most frequently used stain in urinalysis consisting of crystal violet and safranin?
    Sternheimer-Malbin, Toluidine Blue, Hansel Stain, Acetic Acid`,
  `question: Describe the sediment stains used for microscopic analysis of urine. Page 57. What metachromatic stain is useful for enhancing nuclear detail to differentiate WBCs and RTE cells?
    Toluidine blue, Sternheimer-Malbin, 2% Acetic Acid, Oil Red O`,
  `question: Describe the sediment stains used for microscopic analysis of urine. Page 57. Which stain lyses RBCs and cannot be used for the initial sediment analysis?
    2% Acetic Acid, Toluidine Blue, Sternheimer-Malbin, Hansel Stain`,
  `question: Describe the sediment stains used for microscopic analysis of urine. Page 57. Oil Red O and Sudan III are used to stain what substances?
    Lipids, Eosinophils, Hemosiderin, Bacteria`,
  `question: Describe the sediment stains used for microscopic analysis of urine. Page 57. What is the preferred stain for identifying urinary eosinophils?
    Hansel Stain, Prussian blue, Sternheimer-Malbin, Toluidine blue`,
  `question: Describe the clinical significance of red blood cells in urine to include origin and identifying characteristics. Page 58. In concentrated hypersthenuric urine what happens to RBCs?
    They become crenated, They become ghost cells, They swell and lyse, They remain unchanged`,
  `question: Describe the clinical significance of red blood cells in urine to include origin and identifying characteristics. Page 58. In dilute hyposthenuric urine RBCs absorb water swell and lyse leaving only the cell membrane and are called what?
    Ghost cells, Crenated cells, Glitter cells, Target cells`,
  `question: Describe the clinical significance of red blood cells in urine to include origin and identifying characteristics. Page 58. The presence of RBCs in the urine is associated with vascular injury or damage to what part of the nephron?
    Glomerular membrane, Proximal tubule, Loop of Henle, Collecting duct`,
  `question: Describe the clinical significance of white blood cells in urine to include origin and identifying characteristics. Page 59. What is the predominant WBC found in urine sediment?
    Neutrophil, Lymphocyte, Eosinophil, Monocyte`,
  `question: Describe the clinical significance of white blood cells in urine to include origin and identifying characteristics. Page 59. Neutrophils that swell in hypotonic urine and exhibit Brownian movement of their granules are called what?
    Glitter cells, Ghost cells, Clue cells, Decoy cells`,
  `question: Describe the clinical significance of white blood cells in urine to include origin and identifying characteristics. Page 59. The presence of urinary eosinophils is primarily associated with what condition?
    Drug-induced interstitial nephritis, Pyelonephritis, Glomerulonephritis, Cystitis`,
  `question: Describe the clinical significance of white blood cells in urine to include origin and identifying characteristics. Page 60. An increase in urinary WBCs is called what?
    Pyuria, Hematuria, Lipiduria, Ketonuria`,
  `question: Describe the clinical significance of white blood cells in urine to include origin and identifying characteristics. Page 60. What is a frequent cause of pyuria?
    Cystitis, Dehydration, Diabetes, Gout`,
  `question: Describe the clinical significance of epithelial cells in urine to include origin and identifying characteristics. Page 60. Which type of epithelial cell is the largest found in urine sediment?
    Squamous, Transitional, Renal Tubular, Caudate`,
  `question: Describe the clinical significance of epithelial cells in urine to include origin and identifying characteristics. Page 61. Squamous epithelial cells covered with Gardnerella vaginalis bacteria are known as what?
    Clue cells, Glitter cells, Ghost cells, Decoy cells`,
  `question: Describe the clinical significance of epithelial cells in urine to include origin and identifying characteristics. Page 61. Which type of epithelial cells can appear as spherical polyhedral or caudate shapes?
    Transitional, Squamous, Renal Tubular, Columnar`,
  `question: Describe the clinical significance of epithelial cells in urine to include origin and identifying characteristics. Page 61. Which epithelial cells are the most clinically significant?
    Renal Tubular Epithelial, Squamous, Transitional, Urothelial`,
  `question: Describe the clinical significance of epithelial cells in urine to include origin and identifying characteristics. Page 61. Groups of three or more collecting duct RTE cells are called what?
    Renal fragments, Casts, Clumps, Clue cells`,
  `question: Describe the clinical significance of epithelial cells in urine to include origin and identifying characteristics. Page 62. An increased amount of RTE cells is indicative of what condition?
    Tubular necrosis, Glomerular damage, Bladder infection, Dehydration`,
  `question: Describe the clinical significance of epithelial cells in urine to include origin and identifying characteristics. Page 62. RTE cells that have absorbed lipids are called what?
    Oval fat bodies, Clue cells, Glitter cells, Ghost cells`,
  `question: Describe identifying characteristics, clinical significance and identifying characteristics of sediment constituents. Page 63. To be considered significant for a UTI bacteria in the urine should be accompanied by what?
    WBCs, RBCs, Casts, Crystals`,
  `question: Describe identifying characteristics, clinical significance and identifying characteristics of sediment constituents. Page 63. A true yeast infection in the urine should be accompanied by WBCs but will have a negative result for what on the reagent strip?
    Nitrite, Leukocyte Esterase, Protein, Blood`,
  `question: Describe identifying characteristics, clinical significance and identifying characteristics of sediment constituents. Page 63. What is the most frequent parasite encountered in urine?
    Trichomonas vaginalis, Giardia lamblia, Enterobius vermicularis, Schistosoma haematobium`,
  `question: Describe identifying characteristics, clinical significance and identifying characteristics of sediment constituents. Page 64. What is the major protein constituent of mucus?
    Tamm-Horsfall protein, Albumin, Globulin, Hemoglobin`,
  `question: Describe the process of cast formation. Page 65. Casts are formed within the lumens of the collecting ducts and what other part of the nephron?
    Distal convoluted tubules, Proximal convoluted tubules, Loop of Henle, Glomerulus`,
  `question: Describe the process of cast formation. Page 65. What is the major constituent of urinary casts?
    Tamm-Horsfall protein, Albumin, Globulin, Hemoglobin`,
  `question: Describe the clinical significance of the seven types of casts to include origin and identifying characteristics. Page 66. What is the most frequently seen cast in urinary sediment?
    Hyaline, RBC, WBC, Granular`,
  `question: Describe the clinical significance of the seven types of casts to include origin and identifying characteristics. Page 66. Nonpathological increases in hyaline casts can be seen following emotional stress dehydration and what else?
    Strenuous exercise, A high-protein meal, A long period of sleep, Taking vitamins`,
  `question: Describe the clinical significance of the seven types of casts to include origin and identifying characteristics. Page 66. The presence of RBC casts is much more specific for bleeding within the what?
    Nephron, Bladder, Urethra, Ureter`,
  `question: Describe the clinical significance of the seven types of casts to include origin and identifying characteristics. Page 67. The presence of WBC casts signifies infection or inflammation within the nephron and is a primary marker for distinguishing pyelonephritis from what?
    Cystitis, Glomerulonephritis, Nephrotic syndrome, Urethritis`,
  `question: Describe the clinical significance of the seven types of casts to include origin and identifying characteristics. Page 68. Casts containing RTE cells represent the presence of advanced what?
    Tubular destruction, Glomerular disease, Bladder inflammation, Dehydration`,
  `question: Describe the clinical significance of the seven types of casts to include origin and identifying characteristics. Page 68. Fatty casts are confirmed using polarized microscopy which reveals what characteristic formation with cholesterol?
    Maltese cross, Coffin lid, Envelope, Thorny apple`,
  `question: Describe the clinical significance of the seven types of casts to include origin and identifying characteristics. Page 69. When granular casts remain in the tubules for extended periods the granules disintegrate further to form what type of cast?
    Waxy, Hyaline, Cellular, Fatty`,
  `question: Describe the clinical significance of the seven types of casts to include origin and identifying characteristics. Page 69. The confirmation of bacterial casts is best made by performing what stain on the sediment?
    Gram stain, Sternheimer-Malbin, Hansel stain, Toluidine blue`,
  `question: Describe the clinical significance of the seven types of casts to include origin and identifying characteristics. Page 70. Which casts are referred to as renal failure casts and represent extreme urine stasis?
    Broad casts, Hyaline casts, Granular casts, RBC casts`,
  `question: Describe the process of crystal formation. Page 71. What is a valuable aid in the identification of crystals?
    pH of the specimen, Specific gravity, Color of the specimen, Presence of protein`,
  `question: Describe the characteristics of normal and abnormal crystals in acidic and alkaline urine. Page 72. Which of the following is a common crystal seen in acidic urine?
    Uric acid, Triple phosphate, Ammonium biurate, Calcium carbonate`,
  `question: Describe the characteristics of normal and abnormal crystals in acidic and alkaline urine. Page 72. Uric acid crystals are highly birefringent and can appear in what characteristic shape?
    Rhombic, Coffin lid, Envelope, Dumbbell`,
  `question: Describe the characteristics of normal and abnormal crystals in acidic and alkaline urine. Page 73. Which crystals are colorless prism shapes that frequently resemble coffin lids?
    Triple phosphate, Uric acid, Calcium oxalate, Ammonium biurate`,
  `question: Describe the characteristics of normal and abnormal crystals in acidic and alkaline urine. Page 73. Which crystals appear as yellow-brown spicule-covered spheres described as thorny apples?
    Ammonium biurate, Calcium carbonate, Triple phosphate, Amorphous phosphates`,
  `question: Describe the characteristics of normal and abnormal crystals in acidic and alkaline urine. Page 74. Which abnormal crystals appear as colorless hexagonal plates?
    Cystine, Cholesterol, Tyrosine, Leucine`,
  `question: Describe the characteristics of normal and abnormal crystals in acidic and alkaline urine. Page 74. Which abnormal crystals appear as rectangular plates with a notched corner?
    Cholesterol, Cystine, Tyrosine, Bilirubin`,
  `question: Describe the characteristics of normal and abnormal crystals in acidic and alkaline urine. Page 74. In severe liver disorders crystals of leucine bilirubin and what other substance may be found?
    Tyrosine, Cholesterol, Cystine, Uric acid`,
  `question: Describe and identify artifacts that may be found in urine. Page 75. Which artifact is described as a highly refractile sphere with a dimpled center that can be confused with RBCs?
    Starch, Oil droplet, Pollen grain, Air bubble`,
  `question: Describe and identify artifacts that may be found in urine. Page 76. Hair and fibers found in urine sediment may be mistaken for what?
    Casts, Crystals, Cells, Bacteria`,
  `question: Describe the clinical significance of epithelial cells in urine to include origin and identifying characteristics. Page 62. Lipiduria is most frequently associated with damage to the glomerulus caused by what syndrome?
    Nephrotic, Cushing, Conn, Reye`,
  `question: Describe identifying characteristics, clinical significance and identifying characteristics of sediment constituents. Page 64. Which of the following has no clinical significance?
    Mucus, Bacteria with WBCs, Yeast with WBCs, Trichomonas`,
  `question: Describe the clinical significance of white blood cells in urine to include origin and identifying characteristics. Page 59. Lymphocytes may be seen in increased numbers in the early stages of what?
    Renal transplant rejection, Cystitis, Pyelonephritis, Glomerulonephritis`,
  `question: Describe the characteristics of normal and abnormal crystals in acidic and alkaline urine. Page 73. Which are the only urate crystals seen in alkaline urine?
    Ammonium biurate, Amorphous urates, Uric acid, Sodium urates`,
  `question: Describe the preparation and examination of urine sediment for microscopic analysis. Page 56. How are casts reported?
    Average number per 10 lpf, Average number per 10 hpf, Semiquantitative terms, 1+ to 4+`,
  `question: Describe the sediment stains used for microscopic analysis of urine. Page 57. The Prussian blue stain is used to identify what substance in urine sediment?
    Hemosiderin, Eosinophils, Lipids, Nuclei`,
  `question: Describe the characteristics of normal and abnormal crystals in acidic and alkaline urine. Page 73. The monohydrate form of calcium oxalate crystals which can be oval or dumbbell shaped is associated with what type of poisoning?
    Ethylene glycol, Salicylate, Lead, Heavy metal`
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