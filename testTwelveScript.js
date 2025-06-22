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
  `question: Describe growth hormone disorders and diseases. Page 293. Growth Hormone Excess is characterized by the abnormal overgrowth of what tissues?
Cartilage and soft tissue, Bone marrow and blood cells, Nervous tissue and neurons, Adipose tissue and skin`,
  `question: Describe growth hormone disorders and diseases. Page 293. The major effect of growth hormone is that it induces the synthesis of what factor by the liver?
Insulin-like growth factor (IGF-1), Epidermal growth factor (EGF), Fibroblast growth factor (FGF), Nerve growth factor (NGF)`,
  `question: Describe growth hormone disorders and diseases. Page 293. Prolonged exposure to GH excess causes an overgrowth of the skeleton and what else?
Soft tissue overgrowth, Muscle atrophy, Decreased organ size, Hair loss`,
  `question: Describe growth hormone disorders and diseases. Page 293. What is the condition called when there are chronically elevated Growth Hormone levels in adults?
Acromegaly, Pituitary gigantism, Cushing's disease, Addison's disease`,
  `question: Describe growth hormone disorders and diseases. Page 293. Besides soft-tissue changes acromegaly may cause severe disability or death from what?
Cardiac or respiratory problems, Liver failure, Kidney failure, Autoimmune disorders`,
  `question: Describe growth hormone disorders and diseases. Page 293. Which of the following is a biochemical abnormality found in acromegaly?
Hyperphosphatemia, Hypoglycemia, Low blood pressure, Hyponatremia`,
  `question: Describe growth hormone disorders and diseases. Page 293. The most important requirement for the diagnosis of acromegaly is the demonstration of what?
Inappropriate and excessive GH secretion, Low levels of IGF-1, High levels of TSH, A rapid growth spurt`,
  `question: Describe growth hormone disorders and diseases. Page 293. What is the condition called when chronic GH excess is seen before long-bone growth is complete?
Pituitary gigantism, Acromegaly, Psychosocial dwarfism, Laron syndrome`,
  `question: Describe growth hormone disorders and diseases. Page 293. Pituitary gigantism results in a striking acceleration of what type of growth?
Linear growth, Organ growth only, Horizontal growth, Soft tissue growth only`,
  `question: Describe growth hormone disorders and diseases. Page 293. The features of acromegaly develop how over time?
Slowly, Rapidly, In sudden bursts, Only during puberty`,
  `question: Describe growth hormone disorders and diseases. Page 293. In severe or advanced cases of GH excess the diagnosis can be made on the basis of what alone?
Physical appearance, A single blood test, A urine test, Patient symptoms`,
  `question: Describe growth hormone disorders and diseases. Page 294. What is the cause for the vast majority of patients who suffer from autonomous GH excess?
Pituitary tumors, Hypothalamic tumors, Ectopic production of GHRH, Genetic mutations`,
  `question: Describe growth hormone disorders and diseases. Page 294. Patients with acromegaly have a higher risk of what?
Cancer, Autoimmune disease, Infectious disease, Blood clots`,
  `question: Describe growth hormone disorders and diseases. Page 294. Patients with untreated acromegaly have what kind of life expectancy?
A shortened life expectancy, A normal life expectancy, An extended life expectancy, A variable life expectancy`,
  `question: Describe growth hormone disorders and diseases. Page 294. Treatment for acromegaly can involve different methods for what?
Tumor removal/destruction, GH replacement therapy, IGF-1 replacement therapy, Thyroid suppression`,
  `question: Describe growth hormone disorders and diseases. Page 294. Some patients with acromegaly may be required to use what type of therapy using a variety of hormone antagonists?
Hormone suppression therapy, Hormone stimulation therapy, Growth factor therapy, Immunotherapy`,
  `question: Describe growth hormone disorders and diseases. Page 294. The reversibility of the tissue changes in acromegaly depends largely on what?
The duration of the disease, The age of the patient, The size of the tumor, The type of treatment`,
  `question: Describe growth hormone disorders and diseases. Page 295. Children with inadequate GH production or a GH receptor defect do not do what normally?
Grow, Metabolize sugar, Produce red blood cells, Digest food`,
  `question: Describe growth hormone disorders and diseases. Page 295. Children with growth hormone deficiency can be treated with what to advance their growth pattern?
Recombinant GH, Insulin, Thyroid hormone, Cortisol`,
  `question: Describe growth hormone disorders and diseases. Page 295. GH deficiency may be congenital or what?
Acquired, Only genetic, Always idiopathic, Never due to damage`,
  `question: Describe growth hormone disorders and diseases. Page 295. A reversible GH deficiency state caused by environmental stress is known as what?
Psychosocial dwarfism, Pituitary gigantism, Acromegaly, Laron syndrome`,
  `question: Describe growth hormone disorders and diseases. Page 295. What is the term for growth failure despite normal or increased serum GH concentrations?
Resistance to GH, Isolated GH deficiency, Psychosocial dwarfism, Congenital GH deficiency`,
  `question: Describe growth hormone disorders and diseases. Page 295. In individuals with resistance to GH what is the effect of administering exogenous GH?
It fails to produce any appreciable metabolic changes or promote growth, It causes rapid growth, It corrects the growth failure, It increases IGF-1 levels`,
  `question: Describe growth hormone disorders and diseases. Page 295. GH deficiency in adults is probably the most common demonstrable abnormality in patients with what condition?
Large pituitary adenomas, Hypothalamic lesions, Thyroid cancer, Adrenal tumors`,
  `question: Describe growth hormone disorders and diseases. Page 295. Growth hormone deficiency in adults can lead to what?
Premature mortality, Increased bone density, Improved quality of life, Abnormal lipid storage`,
  `question: Describe growth hormone disorders and diseases. Page 295. Adult GH deficiency can lead to decreased bone density with an increase in what risk?
Fracture risk, Cancer risk, Infection risk, Cardiovascular risk`,
  `question: Describe growth hormone disorders and diseases. Page 295. What is considered the standard of care for GH-deficient adults?
GH replacement therapy, IGF-1 replacement therapy, A high-protein diet, Regular exercise`,
  `question: Describe laboratory tests used for the diagnosis and treatment of endocrine disease states. Page 296. Why is the measurement of GH under random conditions not generally considered useful?
GH concentrations vary widely under normal circumstances, GH levels are always stable, GH is difficult to measure, GH is not present in blood`,
  `question: Describe laboratory tests used for the diagnosis and treatment of endocrine disease states. Page 296. GH measurements are best determined as part of testing involving what?
The use of pharmacological or physiological stimuli, A 24-hour urine collection, A single fasting blood sample, A saliva sample`,
  `question: Describe laboratory tests used for the diagnosis and treatment of endocrine disease states. Page 296. What are the usual methods used to measure GH and IGFs?
Immunoassays, Chromatography, Electrophoresis, Mass spectrometry`,
  `question: Describe laboratory tests used for the diagnosis and treatment of endocrine disease states. Page 296. What is the most reliable test for the diagnosis of GH excess?
The oral glucose tolerance test, The insulin challenge test, A random GH measurement, A 24-hour urine GH`,
  `question: Describe laboratory tests used for the diagnosis and treatment of endocrine disease states. Page 296. In a normal response to an oral glucose tolerance test GH is expected to fall to what level?
Less than 1 ng/mL, Greater than 2 ng/mL, Between 5 and 10 ng/mL, Exactly 0 ng/mL`,
  `question: Describe laboratory tests used for the diagnosis and treatment of endocrine disease states. Page 296. Most patients with GH excess will have GH levels above what value after glucose ingestion?
Greater than 2 ng/mL, Less than 1 ng/mL, Between 1 and 2 ng/mL, Exactly 0 ng/mL`,
  `question: Describe laboratory tests used for the diagnosis and treatment of endocrine disease states. Page 296. Besides the OGTT routine measurement of what is now also being used for the diagnosis of acromegaly?
IGF-1 levels, Glucose levels, Phosphate levels, Calcium levels`,
  `question: Describe laboratory tests used for the diagnosis and treatment of endocrine disease states. Page 297. What is the most commonly performed challenge test for a growth hormone deficiency?
The insulin challenge test, The oral glucose tolerance test, The GHRH stimulation test, A random GH measurement`,
  `question: Describe laboratory tests used for the diagnosis and treatment of endocrine disease states. Page 297. For adult patients with suspected GH deficiency what test do endocrinologists use exclusively?
The insulin-induced hypoglycemia test, The oral glucose tolerance test, The arginine stimulation test, The L-dopa test`,
  `question: Describe laboratory tests used for the diagnosis and treatment of endocrine disease states. Page 297. In the insulin challenge test what response will individuals with normal GH production have?
A prompt increase in serum GH concentration, A prompt decrease in serum GH concentration, No change in serum GH concentration, A delayed increase in serum GH`,
  `question: Describe laboratory tests used for the diagnosis and treatment of endocrine disease states. Page 297. For pediatric patients endocrinologists often use a combination of insulin-induced hypoglycemia and what drug?
Levodopa (L-dopa), Glucose, Arginine, GHRH`,
  `question: Describe laboratory tests used for the diagnosis and treatment of endocrine disease states. Page 297. Administration of GH-RH and measurement of GH are useful in discerning growth deficiencies of what origin?
Hypothalamic origin, Pituitary origin, Ectopic origin, Genetic origin`,
  `question: Describe growth hormone disorders and diseases. Page 293. Overt diabetes mellitus is a potential biochemical abnormality in what condition?
Acromegaly, GH deficiency, Psychosocial dwarfism, Laron syndrome`,
  `question: Describe growth hormone disorders and diseases. Page 295. What type of growth retardation can be caused by environmental stress that inhibits pituitary and hypothalamic function?
Psychosocial dwarfism, Congenital dwarfism, Acquired GH deficiency, GH resistance`,
  `question: Describe laboratory tests used for the diagnosis and treatment of endocrine disease states. Page 297. L-dopa acts in the CNS to induce what?
Pituitary release of GH, Hypothalamic release of GHRH, Suppression of GH, Release of IGF-1`,
  `question: Describe growth hormone disorders and diseases. Page 293. Impaired glucose tolerance is a biochemical abnormality associated with which disorder?
Acromegaly, GH deficiency, Addison's Disease, Hypothyroidism`,
  `question: Describe growth hormone disorders and diseases. Page 294. Ectopic production of GH or GHRH are considered what kind of causes of GH excess?
Rare cases, Common causes, The only causes, Impossible causes`,
  `question: Describe growth hormone disorders and diseases. Page 295. Children with growth retardation or what other condition should be screened for GH deficiency?
Pituitary dwarfism, Gigantism, Acromegaly, Marfan syndrome`,
  `question: Describe laboratory tests used for the diagnosis and treatment of endocrine disease states. Page 296. Immunoassays use what to specifically measure GH?
Antibodies, Antigens, Enzymes, Substrates`,
  `question: Describe growth hormone disorders and diseases. Page 293. In pituitary gigantism the acceleration of linear growth is particularly evident where?
In the face and extremities, In the torso, In the skull, In the spine`,
  `question: Describe growth hormone disorders and diseases. Page 293. Patients with acromegaly may complain of headaches which are a local effect of what?
A pituitary tumor, High blood pressure, High blood sugar, Increased IGF-1`,
  `question: Describe growth hormone disorders and diseases. Page 295. GH deficiency can be idiopathic or caused by anatomical damage to what glands?
The pituitary gland or hypothalamus, The thyroid gland or parathyroid, The adrenal glands, The gonads`,
  `question: Describe laboratory tests used for the diagnosis and treatment of endocrine disease states. Page 296. The graph of the Oral Glucose Testing for GH excess shows that an acromegalic patient's GH levels do what after glucose administration?
Remain elevated, Decrease significantly, Increase slightly, Fluctuate wildly`,
  `question: Describe growth hormone disorders and diseases. Page 293. Neurological sequelae are a potential cause of death in which condition?
Acromegaly, GH deficiency, Hypothyroidism, Addison's Disease`,
  `question: Describe growth hormone disorders and diseases. Page 294. Besides surgery and irradiation what is another treatment for acromegaly?
Hormone suppression therapy, GH replacement, IGF-1 injections, Chemotherapy`,
  `question: Describe growth hormone disorders and diseases. Page 295. Adult GH deficiency can result in abnormal body composition and impaired levels of what?
Serum lipids, Blood glucose, Serum electrolytes, Red blood cells`,
  `question: Describe laboratory tests used for the diagnosis and treatment of endocrine disease states. Page 297. In the pediatric insulin challenge test how often is blood collected for GH assessment after insulin is administered?
At 30-minute intervals for 90 minutes, Every hour for 3 hours, Once after 60 minutes, At 15-minute intervals for 60 minutes`,
  `question: Describe growth hormone disorders and diseases. Page 293. An overgrowth of the developing skeleton is a characteristic of what condition?
GH excess, GH deficiency, Hypothyroidism, Adrenal insufficiency`,
  `question: Describe growth hormone disorders and diseases. Page 295. GH deficiency can be associated with deficiencies of what?
Other pituitary hormones, Only thyroid hormones, Only adrenal hormones, Only sex hormones`,
  `question: Describe laboratory tests used for the diagnosis and treatment of endocrine disease states. Page 296. For the diagnosis of acromegaly the oral glucose tolerance test involves the administration of how much glucose?
75 g, 50 g, 100 g, 25 g`,
  `question: Describe laboratory tests used for the diagnosis and treatment of endocrine disease states. Page 297. The insulin challenge test for GH deficiency relies on inducing what state?
Hypoglycemia, Hyperglycemia, Euglycemia, Ketoacidosis`,
  `question: Describe growth hormone disorders and diseases. Page 295. Children with psychosocial dwarfism usually have healthy pituitary function after what?
A few days of hospital stay, Long-term GH therapy, Surgical intervention, A change in diet`,
  `question: Describe growth hormone disorders and diseases. Page 293. Is a patient with pituitary gigantism shorter or taller than average?
Taller, Shorter, Average height, It varies`
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