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
  `question: Describe the types of glands and their specific hormones. Page 299. The thyroid gland is a butterfly-shaped gland located in the front of the neck just above the what?
Trachea, Esophagus, Larynx, Carotid artery`,
  `question: Describe the types of glands and their specific hormones. Page 299. The two lobes of the thyroid gland are connected by what structure?
The isthmus, The colloid, The follicle, The C cell`,
  `question: Describe the types of glands and their specific hormones. Page 299. What are the secretory units of the thyroid gland called?
Thyroid follicles, C cells, Isthmus, Colloid`,
  `question: Describe the types of glands and their specific hormones. Page 299. The amorphous material enclosed by the outer layer of epithelial cells in a follicle is called what?
Colloid, Thyroglobulin, Iodine, Calcitonin`,
  `question: Describe the types of glands and their specific hormones. Page 299. Colloid is mainly composed of what protein required for the production of major thyroid hormones?
Thyroglobulin (Tg), Albumin, Keratin, Collagen`,
  `question: Describe the types of glands and their specific hormones. Page 299. What cells in the thyroid gland produce calcitonin?
Parafollicular or C cells, Follicular cells, Epithelial cells, Isthmus cells`,
  `question: Describe the types of glands and their specific hormones. Page 299. Besides T4 and T3 what is the third hormone secreted by the thyroid gland?
Calcitonin, TSH, TRH, PTH`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 300. What is the major function of thyroid hormones?
Control of the basal metabolic rate, Regulation of blood glucose, Stimulation of red blood cell production, Control of blood pressure`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 300. Thyroid hormones stimulate adrenergic activity which leads to what cardiac effects?
Increased heart rate and myocardial contractility, Decreased heart rate and blood pressure, Vasodilation and slow pulse, Vasoconstriction and weak contractility`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 300. Thyroid hormones increase the synthesis and degradation of what molecules?
Cholesterol and triglycerides, Glucose and glycogen, Proteins and amino acids, Vitamins and minerals`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 301. The Hypothalamic-Pituitary-Thyroid axis is central in the regulation of what?
Thyroid hormones, Adrenal hormones, Growth hormone, Sex hormones`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 301. What hormone from the pituitary stimulates the 'iodide pump' and thyroglobulin synthesis?
TSH, TRH, ACTH, GH`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 301. Prolonged TSH stimulation leads to increased vascularity and eventual hypertrophic enlargement of the thyroid gland called what?
Goiter, Adenoma, Carcinoma, Nodule`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 301. What is the basic element involved in the synthesis of thyroid hormones?
Dietary iodine, Dietary calcium, Dietary protein, Dietary cholesterol`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 301. The coupling of iodine molecules to individual tyrosines on thyroglobulin creates what?
Thyroid hormone precursors (MIT and DIT), Active thyroid hormones (T3 and T4), Calcitonin, Reverse T3`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 302. What two precursors couple to form the thyronines (T4 and T3)?
MIT and DIT, Tyrosine and Iodine, Thyroglobulin and TSH, Albumin and TBG`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 302. In circulation T4 and T3 are almost entirely bound to what?
Carrier proteins, Red blood cells, Platelets, Free fatty acids`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 302. Approximately 40% of secreted T4 is converted in peripheral tissues to yield what more potent hormone?
T3, rT3, Calcitonin, TSH`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 302. Because it is converted to a more potent form in the periphery T4 is considered to be a what?
Prohormone, Active hormone, Inactive metabolite, Carrier protein`,
  `question: Relate endocrine disorders to disease states. Page 303. What is considered the most useful and sensitive test for assessing thyroid function?
TSH measurement, Total T4 measurement, Total T3 measurement, Thyroglobulin measurement`,
  `question: Relate endocrine disorders to disease states. Page 304. What is the term for a hypermetabolic condition caused by excessive production of thyroid hormones?
Hyperthyroidism, Hypothyroidism, Euthyroidism, Goiter`,
  `question: Relate endocrine disorders to disease states. Page 304. What is the typical biochemical picture of primary hyperthyroidism?
Increases in T4 and T3 with a suppressed TSH, Decreases in T4 and T3 with an elevated TSH, Normal T4 and T3 with a suppressed TSH, Normal T4 and T3 with an elevated TSH`,
  `question: Relate endocrine disorders to disease states. Page 305. What is the most common cause of hyperthyroidism in North America?
Graves' Disease, A toxic solitary adenoma, A pituitary tumor, Thyroiditis`,
  `question: Relate endocrine disorders to disease states. Page 305. Graves' disease results from the development of an IgG antibody against what?
The thyroid TSH receptor, Thyroglobulin, The sodium-iodide symporter, Thyroid peroxidase`,
  `question: Relate endocrine disorders to disease states. Page 306. A patient with previously treated hyperthyroidism must be monitored for the development of what condition for the rest of their life?
Hypothyroidism, Graves' Disease, Thyroid cancer, Goiter`,
  `question: Relate endocrine disorders to disease states. Page 307. What is the term for a deficiency in thyroid hormone secretion and/or action?
Hypothyroidism, Hyperthyroidism, Thyrotoxicosis, Euthyroidism`,
  `question: Relate endocrine disorders to disease states. Page 307. A severe form of hypothyroidism characterized by the accumulation of mucopolysaccharides in the skin is called what?
Myxedema, Cretinism, Graves' disease, Goiter`,
  `question: Relate endocrine disorders to disease states. Page 307. Severe hypothyroidism that develops in the newborn is referred to as what?
Congenital Hypothyroidism (cretinism), Myxedema, Hashimoto thyroiditis, Graves' disease`,
  `question: Relate endocrine disorders to disease states. Page 308. Primary hypothyroidism occurs when the synthesis of T4 and T3 by which gland is impaired?
The thyroid gland, The pituitary gland, The hypothalamus, The adrenal gland`,
  `question: Relate endocrine disorders to disease states. Page 308. What is the most frequent cause of primary hypothyroidism in developed countries where iodine intake is sufficient?
Hashimoto thyroiditis, Goiter, Thyroid cancer, Pituitary failure`,
  `question: Relate endocrine disorders to disease states. Page 309. Worldwide what is the most common cause of primary hypothyroidism?
Iodine deficiency, Autoimmune disease, Surgical removal, Pituitary tumors`,
  `question: Relate endocrine disorders to disease states. Page 309. Central thyroid disease occurs as a result of a deficiency in what hormones?
TSH or TRH, T4 or T3, PTH or Calcitonin, ACTH or CRH`,
  `question: Describe the types of glands and their specific hormones. Page 311. Where are the four parathyroid glands typically located?
On or near the thyroid gland capsule, Inside the thyroid gland, In the front of the neck below the trachea, Behind the sternum`,
  `question: Describe the types of glands and their specific hormones. Page 311. Which cells in the parathyroid gland synthesize store and secrete parathyroid hormone (PTH)?
Chief cells, Oxyphil cells, Follicular cells, C cells`,
  `question: Describe the types of glands and their specific hormones. Page 311. Unlike other endocrine glands the parathyroid glands are not under the control of what?
The hypothalamus and pituitary, The adrenal glands, The thyroid gland, The kidneys`,
  `question: Describe the types of glands and their specific hormones. Page 311. PTH acts directly on the bones and kidneys to regulate what?
Calcium levels in the blood stream, Sodium levels in the blood stream, Glucose levels in the blood stream, Potassium levels in the blood stream`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 312. Calcium is critical for numerous physiological functions including what?
Muscle contraction and hormone secretion, Nerve impulse transmission only, Blood glucose regulation, Oxygen transport`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 312. What percentage of calcium in plasma is in the free (ionized) biologically active form?
50%, 40%, 10%, 99%`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 313. What part of the body serves as the primary storage site for calcium?
The skeleton, The liver, The muscles, The kidneys`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 313. Which cells are mainly responsible for resorbing bone?
Osteoclasts, Osteoblasts, Chief cells, Oxyphil cells`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 313. Which cells are mainly responsible for synthesizing new bone?
Osteoblasts, Osteoclasts, Chondrocytes, Fibroblasts`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 314. What is the primary physiological regulator of PTH synthesis and secretion?
The concentration of free calcium in blood, The concentration of TSH in blood, The concentration of phosphate in blood, The concentration of magnesium in blood`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 314. Besides calcium what else influences the synthesis and secretion of PTH?
Magnesium and 1,25(OH)2D, Sodium and Potassium, TSH and TRH, Phosphate and Vitamin K`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 314. Chronic severe hypomagnesemia such as in alcoholism is associated with what?
Impaired PTH secretion, Enhanced PTH secretion, Increased calcium levels, Decreased phosphate levels`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 315. In the kidneys PTH increases calcium reabsorption and decreases reabsorption of what?
Phosphate, Sodium, Potassium, Bicarbonate`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 315. PTH increases total and free plasma calcium and what effect does it have on plasma phosphate?
Decreases plasma phosphate, Increases plasma phosphate, Has no effect on plasma phosphate, Causes phosphate to deposit in bone`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 316. Deficiency of what vitamin results in impaired formation of bone producing rickets in children and osteomalacia in adults?
Vitamin D, Vitamin C, Vitamin A, Vitamin K`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 316. What is the main circulating form of Vitamin D that reflects a person's nutritional status?
25-hydroxyvitamin D [25(OH)D], 1,25-dihydroxyvitamin D [1,25(OH)2D], Vitamin D2, Vitamin D1`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 316. What is the active form of Vitamin D that regulates calcium and phosphate?
1,25-dihydroxyvitamin D [1,25(OH)2D], 25-hydroxyvitamin D [25(OH)D], Cholecalciferol, Ergocalciferol`,
  `question: Relate endocrine disorders to disease states. Page 318. What is the most common cause of hypercalcemia in outpatients?
Primary Hyperparathyroidism, Malignancy, Vitamin D toxicity, Renal failure`,
  `question: Relate endocrine disorders to disease states. Page 318. In hospitalized patients what is the most common cause of hypercalcemia?
Malignancy, Primary Hyperparathyroidism, Hypothyroidism, Sarcoidosis`,
  `question: Relate endocrine disorders to disease states. Page 318. Primary hyperparathyroidism is most often caused by what?
An adenoma, Parathyroid carcinoma, Gland hyperplasia, Malignancy`,
  `question: Relate endocrine disorders to disease states. Page 318. Chronic hypercalcemia with hypercalciuria has been known to lead to the formation of what?
Calcium-containing kidney stones, Phosphate-containing gallstones, Uric acid crystals in joints, Cholesterol plaques in arteries`,
  `question: Relate endocrine disorders to disease states. Page 319. What is the most common cause of decreased total calcium with normal free calcium?
Hypoalbuminemia, Chronic renal failure, Hypoparathyroidism, Magnesium deficiency`,
  `question: Relate endocrine disorders to disease states. Page 319. Hypoparathyroidism is most commonly caused by what?
Parathyroid gland destruction during neck surgery, An autoimmune disorder, A genetic mutation, A dietary deficiency`,
  `question: Relate endocrine disorders to disease states. Page 319. What is characterized by resistance to PTH with elevated PTH levels and low calcium levels?
Pseudohypoparathyroidism, Primary hyperparathyroidism, Secondary hyperparathyroidism, Hypoalbuminemia`,
  `question: Describe specimen collection and processing for endocrine testing. Page 310. What specimens can be used for testing thyroid hormones?
Serum and plasma, Whole blood only, Urine only, Saliva only`,
  `question: Describe laboratory tests used for the diagnosis and treatment of endocrine disease states. Page 310. Finding a low TSH concentration and an elevated FT4 concentration is usually sufficient to establish the diagnosis of what?
Hyperthyroidism, Hypothyroidism, Euthyroid sick syndrome, Central hypothyroidism`,
  `question: Describe laboratory tests used for the diagnosis and treatment of endocrine disease states. Page 310. A TRH test may offer benefit for diagnosing and managing what condition?
Central thyroid disease, Primary hyperthyroidism, Graves' disease, Hashimoto thyroiditis`,
  `question: Describe laboratory tests used for the diagnosis and treatment of endocrine disease states. Page 317. The measurement of PTH is useful in the differential diagnosis of what?
Both hypercalcemia and hypocalcemia, Hyperthyroidism only, Hypothyroidism only, Adrenal disorders only`
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