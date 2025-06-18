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
  `question: Define terminology associated with endocrinology. Page 272. What is the anterior lobe of the pituitary gland that secretes many major hormones called?
Adenohypophysis, Neurohypophysis, Hypothalamus, Thyroid`,
  `question: Define terminology associated with endocrinology. Page 272. What form of hormonal signaling involves a cell secreting a hormone that binds to its own receptors?
Autocrine Action, Paracrine Action, Endocrine Action, Exocrine Action`,
  `question: Define terminology associated with endocrinology. Page 272. What is the term for the material found within the follicles of the thyroid?
Colloid, Thyroglobulin, Iodine, Cytosol`,
  `question: Define terminology associated with endocrinology. Page 272. What is a ductless gland that secretes hormones directly into the blood stream called?
Endocrine Gland, Exocrine Gland, Salivary Gland, Lymph Node`,
  `question: Define terminology associated with endocrinology. Page 272. An enlargement of the thyroid gland is known as what?
Goiter, Tumor, Adenoma, Follicle`,
  `question: Define terminology associated with endocrinology. Page 272. What is a chemical substance produced and secreted into the blood by an organ that has a specific effect on a target tissue?
Hormone, Enzyme, Neurotransmitter, Cytokine`,
  `question: Define terminology associated with endocrinology. Page 273. What is the posterior lobe of the pituitary gland that is an extension of the central nervous system called?
Neurohypophysis, Adenohypophysis, Sella Turcica, Pineal Gland`,
  `question: Define terminology associated with endocrinology. Page 273. What type of hormone function involves a hormone binding to receptors in nearby cells?
Paracrine Action, Autocrine Action, Endocrine Action, Synaptic Action`,
  `question: Define terminology associated with endocrinology. Page 273. What are peptides synthesized by the hypothalamus that affect pituitary hormone secretion called?
Releasing Factors, Second Messengers, Tropic Hormones, Trophic Hormones`,
  `question: Define terminology associated with endocrinology. Page 273. What are hormones that stimulate the activity of another endocrine gland called?
Tropic Hormones, Trophic Hormones, Steroid Hormones, Peptide Hormones`,
  `question: Define terminology associated with endocrinology. Page 273. What are hormones that stimulate a cell or tissue to increase growth effects called?
Trophic Hormones, Tropic Hormones, Releasing Factors, Androgens`,
  `question: Define terminology associated with endocrinology. Page 273. What is an intracellular signal that translates a message from a first messenger into a cellular response?
Second Messenger, Releasing Factor, Receptor, Paracrine Agent`,
  `question: Describe the fundamentals of endocrinology. Page 274. The endocrine system is part of the extracellular communication system that links the brain to organs controlling functions like what?
Body metabolism, Digestion, Respiration, Muscle contraction`,
  `question: Describe the fundamentals of endocrinology. Page 275. In which system do hormones synthesized and released by one cell type bind to receptors of nearby cells of a different type?
Paracrine system, Autocrine system, Endocrine system, Nervous system`,
  `question: Describe the fundamentals of endocrinology. Page 275. The endocrine system uses what to transport its chemical messengers called hormones?
Blood circulation, Lymphatic vessels, Nerve fibers, Interstitial fluid`,
  `question: Describe the fundamentals of endocrinology. Page 276. All hormones act on their target glands and tissues through highly specific binding proteins called what?
Receptors, Second messengers, Enzymes, Antibodies`,
  `question: Describe the fundamentals of endocrinology. Page 277. Which chemical class of hormones is water soluble and circulates freely in the plasma?
Polypeptide/Protein Hormones, Steroid Hormones, Cholesterol Hormones, Lipid Hormones`,
  `question: Describe the fundamentals of endocrinology. Page 277. Which type of hormone requires a second messenger system to produce its specific actions?
Peptide hormones, Steroid hormones, Thyroid hormones, Sex hormones`,
  `question: Describe the fundamentals of endocrinology. Page 278. Steroid hormones are derived from what molecule?
Cholesterol, Amino Acids, Peptides, Glycogen`,
  `question: Describe the fundamentals of endocrinology. Page 278. How do free steroid hormones enter a cell?
By passive diffusion, By active transport, Through a channel protein, Via a second messenger`,
  `question: Describe the fundamentals of endocrinology. Page 279. Thyroxine and catecholamines are examples of what chemical class of hormones?
Amino Acid Derived Hormones, Steroid Hormones, Polypeptide Hormones, Protein Hormones`,
  `question: Describe the fundamentals of endocrinology. Page 280. The hypothalamus is a small region in the brain that plays a key role in regulating the release of what?
Many hormones, Only pituitary hormones, Only thyroid hormones, Only adrenal hormones`,
  `question: Describe the fundamentals of endocrinology. Page 281. When high levels of a circulating hormone provide feedback to the hypothalamus to suppress its releasing hormones this is called what?
Negative feedback, Positive feedback, Autocrine action, Paracrine action`,
  `question: Describe the fundamentals of endocrinology. Page 281. When a hormone or CNS stimulation triggers a response from the hypothalamus resulting in hormone secretion this is called what?
A positive-feedback loop, A negative-feedback loop, A tropic effect, A trophic effect`,
  `question: Describe the types of glands and their specific hormones. Page 283. Which gland releases neurosecretory factors to stimulate or inhibit the release of hormones from the adenohypophysis?
Hypothalamus, Pineal gland, Adrenal gland, Thyroid gland`,
  `question: Describe the types of glands and their specific hormones. Page 283. Which hypothalamic hormone triggers the release of TSH from the pituitary?
Thyrotropin-releasing hormone (TRH), Gonadotropin-releasing hormone (GnRH), Corticotropin-releasing hormone (CRH), Somatostatin (SS)`,
  `question: Describe the types of glands and their specific hormones. Page 283. Which neurotransmitter also known as PRIF suppresses the synthesis and secretion of prolactin?
Dopamine, Serotonin, Acetylcholine, Norepinephrine`,
  `question: Describe the types of glands and their specific hormones. Page 283. Which two hormones are synthesized in the hypothalamus but stored in the neurohypophysis?
Arginine vasopressin (AVP) and oxytocin, TSH and ACTH, LH and FSH, Prolactin and Growth Hormone`,
  `question: Describe the types of glands and their specific hormones. Page 285. The pituitary gland is located at the base of the skull in a bone cavity called the what?
Sella Turcica, Foramen Magnum, Cranial Fossa, Sphenoid Sinus`,
  `question: Describe the types of glands and their specific hormones. Page 285. Which gland is called the master endocrine organ?
Pituitary Gland, Hypothalamus, Adrenal Gland, Thyroid Gland`,
  `question: Describe the types of glands and their specific hormones. Page 285. The neurohypophysis functions as a reservoir for two hormones that were produced by what gland?
Hypothalamus, Adenohypophysis, Pineal Gland, Adrenal Cortex`,
  `question: Describe the types of glands and their specific hormones. Page 286. What is the major physiological function of Antidiuretic Hormone (ADH)?
Water homeostasis, Glucose metabolism, Calcium regulation, Growth promotion`,
  `question: Describe the types of glands and their specific hormones. Page 286. Deficient production or action of ADH results in what condition?
Polyuria, Oliguria, Anuria, Hematuria`,
  `question: Describe the types of glands and their specific hormones. Page 287. Which hormone promotes uterine contractions and milk ejection?
Oxytocin, Prolactin, Estrogen, Progesterone`,
  `question: Describe the types of glands and their specific hormones. Page 287. What is the primary stimulus for the release of oxytocin?
Suckling, High estrogen levels, Low blood pressure, Emotional stress`,
  `question: Describe the types of glands and their specific hormones. Page 288. Which anterior pituitary hormone acts directly on peripheral tissue rather than on another endocrine gland?
Growth Hormone (GH), Thyroid-Stimulating Hormone (TSH), Adrenocorticotropic Hormone (ACTH), Luteinizing Hormone (LH)`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 289. What is the most common cause of pituitary hypersecretion?
The presence of a pituitary adenoma, A bacterial infection, A genetic disorder, Head trauma`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 289. Prolactin-secreting pituitary adenoma is the most common form of what?
Hypersecreting pituitary disease, Hyposecreting pituitary disease, Hypothalamic disease, Adrenal disease`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 289. When low cortisol is due to a pituitary deficiency of ACTH it is defined as what?
Secondary adrenal deficiency, Primary adrenal deficiency, Tertiary adrenal deficiency, Adrenal overproduction`,
  `question: Relate endocrine disorders to disease states. Page 290. The diagnosis of pituitary disease often requires what type of testing?
Provocative testing of gland function, A single baseline hormone level, A routine blood chemistry panel, A complete blood count`,
  `question: Relate endocrine disorders to disease states. Page 290. Hypothalamus-based disorders are what compared to abnormal hormone secretion from pituitary disease?
Relatively rare, More common, Equally common, Always congenital`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 291. What is the most abundant hormone produced by the adenohypophysis?
Growth Hormone (GH), Prolactin (PRL), Thyroid-Stimulating Hormone (TSH), Adrenocorticotropic Hormone (ACTH)`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 291. During the evening hours adults and children show a marked rise in GH secretory activity approximately how long after the onset of sleep?
90 minutes, 30 minutes, 3 hours, 6 hours`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 291. GH concentrations reach a peak value during what period?
The period of deepest sleep, Immediately after waking, 3 hours after a meal, During intense exercise`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 291. A single determination of GH is not particularly useful in establishing its inadequate or excessive release due to what?
Numerous influencing factors, Its long half-life, Its stable secretion rate, Its lack of a receptor`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 291. GH triggers the liver to synthesize and release what polypeptide?
Insulin-like growth factor I (IGF-I), Glucagon, Albumin, Thyroxine`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 292. GH is considered what type of hormone as it directly influences both anabolic and catabolic processes?
An amphibolic hormone, A tropic hormone, A steroid hormone, A releasing hormone`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 292. GH directly antagonizes the effect of which hormone on glucose metabolism?
Insulin, Glucagon, Cortisol, Thyroxine`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 292. Besides antagonizing insulin what metabolic processes does GH promote?
Hepatic gluconeogenesis and lipolysis, Glycogen storage and fat synthesis, Protein breakdown and ketogenesis, Glycolysis and glucose uptake`,
  `question: Relate endocrine disorders to disease states. Page 293. Chronically elevated Growth Hormone levels in adults is known as what?
Acromegaly, Pituitary gigantism, Dwarfism, Cushing's disease`,
  `question: Relate endocrine disorders to disease states. Page 293. When chronic GH excess is seen before long-bone growth is complete what is the condition called?
Pituitary gigantism, Acromegaly, Cretinism, Addison's disease`,
  `question: Relate endocrine disorders to disease states. Page 293. What is the most important requirement for the diagnosis of acromegaly?
Demonstration of inappropriate and excessive GH secretion, Observation of tall stature, Measurement of low IGF-I levels, Presence of a goiter`,
  `question: Relate endocrine disorders to disease states. Page 293. Besides soft-tissue changes what is a biochemical abnormality seen in acromegaly?
Impaired glucose tolerance, Hypophosphatemia, Low blood pressure, Anemia`,
  `question: Relate endocrine disorders to disease states. Page 293. Pituitary gigantism involves a striking acceleration of what type of growth?
Linear growth, Organ growth only, Soft tissue growth only, Horizontal growth`,
  `question: Relate endocrine disorders to disease states. Page 293. Patients with acromegaly may complain of local effects of the pituitary tumor such as what?
Headaches, Weight loss, Hair growth, Improved vision`,
  `question: Relate endocrine disorders to disease states. Page 294. Pituitary tumors are the cause for the vast majority of patients who suffer from what?
Autonomous GH excess, GH deficiency, Hypothyroidism, Adrenal insufficiency`,
  `question: Relate endocrine disorders to disease states. Page 294. Patients with untreated acromegaly have what?
A shortened life expectancy, A normal life expectancy, An extended life expectancy, A reduced cancer risk`,
  `question: Relate endocrine disorders to disease states. Page 294. Treatment for acromegaly can involve different methods for what?
Tumor removal/destruction, Hormone replacement, Gland stimulation, Diet modification`,
  `question: Relate endocrine disorders to disease states. Page 294. Some patients with acromegaly may be required to use what type of therapy using hormone antagonists?
Hormone suppression therapy, Hormone replacement therapy, Radiation therapy, Chemotherapy`
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