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
  `question: Describe the types of glands and their specific hormones. Page 322. Where are the two adrenal glands located?
On top of each kidney, Below each kidney, Adjacent to the pancreas, Within the thoracic cavity`,
  `question: Describe the types of glands and their specific hormones. Page 322. Each adrenal gland consists of a yellow outer part and a gray inner part called what?
Outer cortex and inner medulla, Outer medulla and inner cortex, Outer capsule and inner zona, Outer fascia and inner reticulum`,
  `question: Describe the types of glands and their specific hormones. Page 322. Which layer of the adrenal cortex constitutes approximately 15% of the cortex?
Zona glomerulosa, Zona fasciculata, Zona reticularis, Medulla`,
  `question: Describe the types of glands and their specific hormones. Page 322. Which layer of the adrenal cortex composes about 75% of the cortex and has large lipid-laden cells?
Zona fasciculata, Zona glomerulosa, Zona reticularis, Medulla`,
  `question: Describe the types of glands and their specific hormones. Page 322. What is the innermost zone of the adrenal cortex containing irregular-looking cells with little lipid content?
Zona reticularis, Zona glomerulosa, Zona fasciculata, Adrenal medulla`,
  `question: Describe the types of glands and their specific hormones. Page 323. The adrenal cortex synthesizes and secretes three major classes of what type of hormones?
Steroid hormones, Peptide hormones, Amino acid hormones, Protein hormones`,
  `question: Describe the types of glands and their specific hormones. Page 323. Aldosterone is classified as what type of hormone?
Mineralocorticoid, Glucocorticoid, Adrenal androgen, Catecholamine`,
  `question: Describe the types of glands and their specific hormones. Page 323. Cortisol is classified as what type of hormone?
Glucocorticoid, Mineralocorticoid, Adrenal androgen, Catecholamine`,
  `question: Describe the types of glands and their specific hormones. Page 325. Dehydroepiandrosterone (DHEA) is classified as what type of hormone?
Adrenal androgen, Mineralocorticoid, Glucocorticoid, Catecholamine`,
  `question: Describe the types of glands and their specific hormones. Page 325. The adrenal medulla synthesizes what class of hormones?
Catecholamines, Steroids, Mineralocorticoids, Glucocorticoids`,
  `question: Describe the types of glands and their specific hormones. Page 325. Epinephrine norepinephrine and dopamine are all examples of what?
Catecholamines, Androgens, Glucocorticoids, Mineralocorticoids`,
  `question: Describe the types of glands and their specific hormones. Page 333. What is the principal androgen in the human male?
Testosterone, DHEA, Androstenedione, Estradiol`,
  `question: Describe the types of glands and their specific hormones. Page 333. Which cells in the seminiferous tubules of the testes have a crucial role in sperm maturation?
Sertoli cells, Leydig cells, Spermatogonium, Primary spermatocytes`,
  `question: Describe the types of glands and their specific hormones. Page 333. The interstitial Leydig cells are the primary site of what?
Androgen production, Sperm maturation, Inhibin secretion, Sperm storage`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 323. What is the main function of mineralocorticoids?
Regulate salt homeostasis and extracellular fluid volume, Regulate glucose metabolism, Promote secondary sex characteristics, Increase cardiac output`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 323. What is the most potent naturally occurring mineralocorticoid?
Aldosterone, Cortisol, DHEA, Testosterone`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 324. What is the major glucocorticoid synthesized in the human adrenal cortex?
Cortisol, Aldosterone, Androstenedione, Epinephrine`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 324. Glucocorticoids like cortisol increase what process in carbohydrates metabolism?
Gluconeogenesis, Glycolysis, Glycogenolysis, Fat storage`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 324. What effect does cortisol have on appetite?
Increases appetite, Decreases appetite, No effect on appetite, Suppresses thirst`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 324. Glucocorticoids are powerful anti-inflammatory hormones that suppress what?
The activity of pro-inflammatory enzymes, The production of cortisol, The release of aldosterone, The synthesis of androgens`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 325. In pubertal and adult women what do adrenal androgens affect?
Underarm and pubic hair growth, Menstrual cycle regulation, Breast development, Maintenance of pregnancy`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 325. The medullary catecholamine products serve as the first responders to stress to promote what response?
Fight or flight response, Rest and digest response, Sleep-wake cycle, Immune response`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 325. Catecholamines increase cardiac output increase blood pressure and divert blood toward what areas?
Muscle and brain, Skin and GI tract, Kidneys and liver, Lungs and heart`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 326. Human steroid hormones are synthesized primarily from what molecule in the adrenal glands and gonads?
Cholesterol, Amino acids, Glucose, Fatty acids`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 326. What hormone from the anterior pituitary stimulates the synthesis and release of cortisol?
Adrenocorticotropic hormone (ACTH), Thyroid-stimulating hormone (TSH), Luteinizing hormone (LH), Growth hormone (GH)`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 326. What is the initial rate-limiting step of steroid hormone production in the adrenal cortex?
The transport of intracellular cholesterol, The release of ACTH, The synthesis of CRH, The binding of cortisol to CBG`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 326. Cortisol feeds back negatively to what part of the brain?
The hypothalamus, The cerebellum, The cerebrum, The pons`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 332. The hormones of the hypothalamic-pituitary-gonadal axis are crucial for what function?
Reproductive function, Glucose metabolism, Salt balance, Stress response`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 333. Besides spermatogenesis testosterone is required for what?
Sexual differentiation, Regulating blood sugar, Increasing cardiac output, Maintaining blood pressure`,
  `question: Relate endocrine disorders to disease states. Page 327. What condition is diagnosed when the pituitary gland is directly responsible for elevated cortisol levels?
Cushing disease, Cushing syndrome, Addison disease, Conn's syndrome`,
  `question: Relate endocrine disorders to disease states. Page 327. In the ectopic ACTH syndrome what develops the ability to secrete ACTH?
Non-endocrine tumors, The pituitary gland, The adrenal gland, The hypothalamus`,
  `question: Relate endocrine disorders to disease states. Page 327. Truncal obesity moon faces and a 'buffalo' hump are signs of what condition?
Cushing syndrome/disease, Addison disease, Hypothyroidism, Hyperthyroidism`,
  `question: Relate endocrine disorders to disease states. Page 328. What is the term for primary adrenal insufficiency?
Addison disease, Cushing disease, Conn's syndrome, Pheochromocytoma`,
  `question: Relate endocrine disorders to disease states. Page 328. Primary adrenal insufficiency results from progressive destruction or dysfunction of what?
The adrenal glands, The pituitary gland, The hypothalamus, The thyroid gland`,
  `question: Relate endocrine disorders to disease states. Page 328. A complete mineralocorticoid deficiency leads to dehydration with what electrolyte abnormalities?
Hyponatremia and hyperkalemia, Hypernatremia and hypokalemia, Hypocalcemia and hyperphosphatemia, Hypercalcemia and hypophosphatemia`,
  `question: Relate endocrine disorders to disease states. Page 328. A patient with inadequate cortisol production due to a destructive process in the pituitary has what condition?
Secondary adrenal insufficiency, Primary adrenal insufficiency, Tertiary adrenal insufficiency, Addison disease`,
  `question: Relate endocrine disorders to disease states. Page 328. What is the most common cause of tertiary cortisol insufficiency?
Long-term administration of glucocorticoids, A pituitary tumor, An adrenal tumor, An autoimmune process`,
  `question: Describe specimen collection and processing for endocrine testing. Page 329. Besides blood and urine what is used as an alternative specimen to estimate free steroid hormone concentrations?
Saliva, Sweat, Cerebrospinal fluid, Tears`,
  `question: Describe specimen collection and processing for endocrine testing. Page 329. What is the principal advantage of using saliva for hormone assays?
Ease of collection, Higher hormone concentrations, Better stability, Less interference`,
  `question: Describe specimen collection and processing for endocrine testing. Page 329. A 24-hour urine specimen for cortisol should be collected with what to maintain the pH below 7.5?
Boric acid, Sodium fluoride, Potassium oxalate, Heparin`,
  `question: Describe specimen collection and processing for endocrine testing. Page 329. What is the largest source of error with a 24-hour urine cortisol measurement?
Incorrectly timed samples, Patient diet, Patient hydration status, Sample exposure to light`,
  `question: Describe laboratory tests used for the diagnosis and treatment of endocrine disease states. Page 330. For many years what has been considered the best screening test for Cushing related disease?
24-hour Urinary Free Cortisol, A single serum cortisol, A random urine cortisol, A salivary cortisol`,
  `question: Describe laboratory tests used for the diagnosis and treatment of endocrine disease states. Page 330. An elevation of free cortisol in the urine is a good indicator of what?
Overproduction, Underproduction, Normal adrenal function, Pituitary failure`,
  `question: Describe laboratory tests used for the diagnosis and treatment of endocrine disease states. Page 330. What test is performed when an abnormal elevation in cortisol is observed and a tumor is suspected?
Low-dose dexamethasone suppression test, ACTH stimulation test, CRH stimulation test, Glucose tolerance test`,
  `question: Describe laboratory tests used for the diagnosis and treatment of endocrine disease states. Page 330. In a dexamethasone suppression test a lack of cortisol suppression is suggestive of what?
A pituitary tumor, Adrenal insufficiency, Normal function, Hypothalamic failure`,
  `question: Describe laboratory tests used for the diagnosis and treatment of endocrine disease states. Page 331. A morning cortisol is a useful screening test for what condition?
Adrenal insufficiency, Cushing syndrome, Hyperaldosteronism, Pheochromocytoma`,
  `question: Describe laboratory tests used for the diagnosis and treatment of endocrine disease states. Page 331. Morning cortisol specimens are recommended to be collected between what hours?
0700 to 1000 hours, 1200 to 1400 hours, 1600 to 1800 hours, 2200 to 0000 hours`,
  `question: Describe laboratory tests used for the diagnosis and treatment of endocrine disease states. Page 331. Which test is designed to document the functional capacity of the adrenal glands to synthesize cortisol?
The Adrenocorticotropic Hormone Stimulation Test, The dexamethasone suppression test, The CRH stimulation test, A 24-hour urine free cortisol`,
  `question: Describe laboratory tests used for the diagnosis and treatment of endocrine disease states. Page 331. The ACTH stimulation test distinguishes primary adrenal insufficiency from what other causes?
Secondary or tertiary causes, Cushing disease, Ectopic ACTH syndrome, Adrenal tumors`,
  `question: Describe laboratory tests used for the diagnosis and treatment of endocrine disease states. Page 331. In an ACTH stimulation test the adrenal glands are stimulated by what synthetic protein?
Cosyntropin, Dexamethasone, Metyrapone, Prednisone`,
  `question: Describe laboratory tests used for the diagnosis and treatment of endocrine disease states. Page 331. In a healthy person an injection of exogenous CRH stimulates the secretion of what hormone within 60 to 180 minutes?
ACTH, Cortisol, Aldosterone, DHEA`,
  `question: Describe laboratory tests used for the diagnosis and treatment of endocrine disease states. Page 331. The CRH stimulation test is useful in differentiating between what two conditions?
Secondary and tertiary adrenal insufficiency, Primary and secondary adrenal insufficiency, Cushing disease and Cushing syndrome, Addison disease and Conn's syndrome`,
  `question: Describe laboratory tests used for the diagnosis and treatment of endocrine disease states. Page 331. What is the preferred method for the measurement of free cortisol?
LC-MS-MS, Immunoassays, HPLC, Spectrophotometry`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 323. Aldosterone is synthesized exclusively in what region of the adrenal cortex?
Zona glomerulosa, Zona fasciculata, Zona reticularis, Medulla`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 324. Cortisol is principally bound to and transported by what protein?
Corticosteroid-binding globulin (CBG), Albumin, Hemoglobin, Transferrin`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 325. Pheochromocytoma is a tumor that produces what?
Catecholamines, Cortisol, Aldosterone, Androgens`,
  `question: Describe the types of glands and their specific hormones. Page 323. The term 'corticosteroids' is used to describe which two groups of adrenal steroids?
Mineralocorticoids and glucocorticoids, Glucocorticoids and androgens, Androgens and catecholamines, Catecholamines and mineralocorticoids`,
  `question: Describe the types of glands and their specific hormones. Page 333. Sertoli cells secrete inhibin which has what function?
Inhibits the pituitary secretion of FSH, Stimulates the pituitary secretion of LH, Inhibits testosterone production, Stimulates spermatogenesis`,
  `question: Relate endocrine disorders to disease states. Page 327. Besides truncal obesity what is another common sign of Cushing syndrome?
Moon faces, Weight loss, Jaundice, Anemia`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 328. Complete glucocorticoid deficiency can manifest as what symptom?
Fasting hypoglycemia, Hyperglycemia, Weight gain, Hypertension`
]

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