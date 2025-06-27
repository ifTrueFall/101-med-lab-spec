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
  `question: Define terminology associated with tumor markers, tumors, and cancers. Page 409. A noncancerous enlargement of the prostate gland is known as what?
Benign Prostatic Hyperplasia, Prostate Cancer, Prostatitis, A Malignant Tumor`,
  `question: Define terminology associated with tumor markers, tumors, and cancers. Page 409. What is a noncancerous growth that does not invade nearby tissue called?
Benign Tumor, Malignant Tumor, Carcinoma, Metastasis`,
  `question: Define terminology associated with tumor markers, tumors, and cancers. Page 409. The uncontrolled growth of abnormal cells anywhere in the body is known as what?
Cancer, A Benign Tumor, A Carcinogen, A Goiter`,
  `question: Define terminology associated with tumor markers, tumors, and cancers. Page 409. What process describes the size of a tumor and how far it has spread?
Cancer Staging, Metastasis, Prognosis, Diagnosis`,
  `question: Define terminology associated with tumor markers, tumors, and cancers. Page 409. Antigens found on the surface of tumor cells or secreted by them are known as what type of markers?
Carbohydrate Markers, Enzyme Markers, Hormone Markers, Protein Markers`,
  `question: Define terminology associated with tumor markers, tumors, and cancers. Page 409. What is the term for any number of agents that can cause cancer in humans?
Carcinogen, Toxin, Poison, Oncofetal Antigen`,
  `question: Define terminology associated with tumor markers, tumors, and cancers. Page 409. Cancer that begins in the skin or in tissues that line or cover internal organs is called what?
Carcinoma, Sarcoma, Lymphoma, Melanoma`,
  `question: Define terminology associated with tumor markers, tumors, and cancers. Page 409. What is a cancer of the lymphatic system?
Lymphoma, Leukemia, Myeloma, Carcinoma`,
  `question: Define terminology associated with tumor markers, tumors, and cancers. Page 409. A cancerous tumor capable of metastasis is known as what?
Malignant Tumor, Benign Tumor, Polyp, Cyst`,
  `question: Define terminology associated with tumor markers, tumors, and cancers. Page 409. A cancer of the melanocytes is called what?
Melanoma, Carcinoma, Lymphoma, Sarcoma`,
  `question: Define terminology associated with tumor markers, tumors, and cancers. Page 409. The movement or spreading of cancer cells from one organ or tissue to another is called what?
Metastasis, Staging, Prognosis, Proliferation`,
  `question: Define terminology associated with tumor markers, tumors, and cancers. Page 409. What is a tool for analyzing gene expressions that consists of a small slide containing samples of many genes?
Microarray, Immunoassay, Electrophoresis, Chromatography`,
  `question: Define terminology associated with tumor markers, tumors, and cancers. Page 409. An antigen normally expressed in the fetus that may reappear in an adult with a tumor is a what?
Oncofetal Antigen, Carbohydrate Marker, Cancer Antigen, Tumor-Specific Antigen`,
  `question: Define terminology associated with tumor markers, tumors, and cancers. Page 409. The predicted outcome of a disease and the chances of recovery is the what?
Prognosis, Diagnosis, Staging, Metastasis`,
  `question: Describe the clinical significance of cancers and tumors. Page 410. In developed countries what is the second leading cause of mortality?
Cancer, Heart Disease, Stroke, Diabetes`,
  `question: Describe the clinical significance of cancers and tumors. Page 410. Biologically cancer refers to the uncontrolled growth of cells that often forms a solid mass called a tumor or what?
Neoplasm, Carcinogen, Lesion, Polyp`,
  `question: Describe the clinical significance of cancers and tumors. Page 410. Cancer severity is generally classified by tumor size histology regional lymph node involvement and what other factor?
Presence of metastasis, Patient age, Patient gender, Tumor location`,
  `question: Describe the clinical significance of cancers and tumors. Page 410. For most solid tumors higher stages in the I to IV classification system are indicative of what?
Significant spreading and severe systemic disease, Localized cancer with a good prognosis, A benign tumor, A pre-cancerous condition`,
  `question: Describe the clinical significance of cancers and tumors. Page 411. What offers the best chance for a cancer cure?
Early detection, Chemotherapy alone, Radiation therapy alone, Palliative care`,
  `question: Describe the clinical significance of cancers and tumors. Page 411. Most cancers do not produce symptoms until the tumors are too large to be removed surgically or until what has happened?
Cancerous cells have already metastasized, The patient is in remission, The tumor becomes benign, The cancer is in Stage I`,
  `question: Describe the characteristics and uses of tumor markers. Page 412. Tumor markers are produced either directly by the tumor or as an effect of the tumor on what?
Healthy tissue (host), Nearby organs only, The immune system, The circulatory system`,
  `question: Describe the characteristics and uses of tumor markers. Page 412. Tumor markers encompass an array of diverse molecules such as serum proteins oncofetal antigens hormones metabolites receptors and what?
Enzymes, Carbohydrates, Lipids, Nucleic acids`,
  `question: Describe the characteristics and uses of tumor markers. Page 412. Depending on the marker tumor markers may be used for screening diagnosis prognosis detecting recurrence and what other purpose?
Therapy monitoring, Cancer prevention, Definitively staging cancer, Identifying carcinogens`,
  `question: Describe the characteristics and uses of tumor markers. Page 412. An ideal tumor marker would be tumor specific readily detectable in body fluids and what else?
Absent in healthy individuals, Present in all individuals, Elevated in benign conditions, Stable during therapy`,
  `question: Describe the characteristics and uses of tumor markers. Page 412. With the possible exception of PSA no tumor marker identified to date can be used to effectively do what?
Screen asymptomatic populations, Monitor therapy, Determine prognosis, Detect recurrence`,
  `question: Describe the characteristics and uses of tumor markers. Page 412. Why are most tumor markers not used for general population screening?
They are also found in normal cells and benign conditions, They are too expensive, The tests are not accurate enough, They require a tissue biopsy`,
  `question: Describe the characteristics and uses of tumor markers. Page 412. Screening asymptomatic populations with most tumor markers would result in detection of what?
False positives, Only true positives, Only late-stage cancers, No cancers`,
  `question: Describe the characteristics and uses of tumor markers. Page 413. Tumor marker concentration generally increases with what?
Tumor progression, Tumor regression, Successful therapy, Early detection`,
  `question: Describe the characteristics and uses of tumor markers. Page 413. High concentrations of a serum tumor marker at diagnosis might indicate the presence of malignancy and what else?
Possible metastasis, A benign condition, A localized tumor, A complete cure`,
  `question: Describe the characteristics and uses of tumor markers. Page 413. What is one of the most useful and common applications of tumor markers?
Monitoring therapy and detecting disease recurrence, Screening the general population, Making a definitive diagnosis, Staging a primary tumor`,
  `question: Describe methods and tests for identifying cancers and tumors. Page 414. What is the most commonly used method to measure tumor markers?
Immunoassays, HPLC, Microarrays, Immunohistochemistry`,
  `question: Describe methods and tests for identifying cancers and tumors. Page 414. High-performance liquid chromatography (HPLC) is commonly used for the detection of what type of tumor markers?
Small molecules like endocrine metabolites, Large protein antigens, Oncofetal antigens, Cell surface carbohydrates`,
  `question: Describe methods and tests for identifying cancers and tumors. Page 414. Immunohistochemistry is used to identify tumor markers in what type of samples?
Tissue sections from biopsies, Serum or plasma, Whole blood, Urine`,
  `question: Describe methods and tests for identifying cancers and tumors. Page 415. What method is used for detecting several DNA sequences at once using a chip impregnated with spots of different DNA sequences?
Microarrays, Immunoassays, HPLC, Electrophoresis`,
  `question: Describe clinical applications of tumor markers. Page 416. Cancer antigen 15-3 (CA 15-3) is a carbohydrate marker associated with what type of cancer?
Breast cancer, Ovarian cancer, Colorectal cancer, Prostate cancer`,
  `question: Describe clinical applications of tumor markers. Page 416. What is the most useful application for CA 15-3?
Monitoring therapy and disease progression in metastatic breast cancer, Screening for primary breast cancer, Diagnosing early-stage breast cancer, Staging breast cancer`,
  `question: Describe clinical applications of tumor markers. Page 417. Cancer antigen 125 (CA-125) is a carbohydrate marker associated with what carcinomas?
Ovarian and endometrial, Breast and lung, Colorectal and pancreatic, Liver and testicular`,
  `question: Describe clinical applications of tumor markers. Page 417. CA-125 levels correlate with ovarian tumor size and what else?
Cancer stage, Patient age, Histology type, Prognosis`,
  `question: Describe clinical applications of tumor markers. Page 417. In postmenopausal women with a palpable abdominal mass a high level of CA-125 has a high positive predictive value for what?
Ovarian cancer, A benign cyst, Endometriosis, Liver disease`,
  `question: Describe clinical applications of tumor markers. Page 418. Liver and bone are the primary sources of what enzyme tumor marker?
Alkaline Phosphatase (ALP), Lactate Dehydrogenase (LD), Prostate-Specific Antigen (PSA), Amylase`,
  `question: Describe clinical applications of tumor markers. Page 418. Elevation of what nonspecific enzyme has been shown in cancers like Non-Hodgkin's lymphoma and acute leukemia?
Lactate Dehydrogenase (LD), Alkaline Phosphatase (ALP), Lipase, Creatine Kinase`,
  `question: Describe clinical applications of tumor markers. Page 418. Although rarely considered for staging serum LD concentrations are used in the staging of what cancers?
Testicular cancers and melanoma, Breast and ovarian cancers, Lung and colon cancers, Liver and pancreatic cancers`,
  `question: Describe clinical applications of tumor markers. Page 419. Prostate-specific antigen (PSA) is a protein produced by what gland?
The prostate gland, The pituitary gland, The thyroid gland, The adrenal gland`,
  `question: Describe clinical applications of tumor markers. Page 419. Besides screening what is the greatest clinical use of PSA?
Monitoring of definitive treatment for prostate cancer, Diagnosing benign prostatic hyperplasia, Staging prostate cancer, Determining the aggressiveness of the tumor`,
  `question: Describe clinical applications of tumor markers. Page 419. PSA is specific for prostatic tissue but not for what?
Prostatic cancer, Benign prostatic hyperplasia, Prostatitis, Normal prostate tissue`,
  `question: Describe clinical applications of tumor markers. Page 420. The production of a hormone at a distant site by a nonendocrine tissue is called what?
Ectopic syndrome, Endocrine production, Paraneoplastic syndrome, Metastasis`,
  `question: Describe clinical applications of tumor markers. Page 420. About half of the ectopic production of ACTH is a result of what type of cancer?
Small cell carcinoma of the lung, Medullary thyroid cancer, Breast cancer, Prostate cancer`,
  `question: Describe clinical applications of tumor markers. Page 420. An elevated calcitonin concentration is usually associated with what type of cancer?
Medullary carcinoma of the thyroid, Papillary thyroid cancer, Follicular thyroid cancer, Anaplastic thyroid cancer`,
  `question: Describe clinical applications of tumor markers. Page 421. Human chorionic gonadotropin (hCG) is a prognostic indicator for ovarian cancer a diagnostic marker for testicular cancer and most useful for what?
Detection of gestational trophoblastic diseases, Monitoring prostate cancer, Screening for colorectal cancer, Staging lung cancer`,
  `question: Describe clinical applications of tumor markers. Page 421. hCG together with what other marker is useful in detecting nonseminomatous testicular tumors?
a-fetoprotein (AFP), Carcinoembryonic antigen (CEA), Cancer antigen 125 (CA-125), Prostate-specific antigen (PSA)`,
  `question: Describe clinical applications of tumor markers. Page 422. a-Fetoprotein (AFP) is synthesized in large quantities by the fetal yolk sac and what other organ?
Liver, Pancreas, Kidney, Spleen`,
  `question: Describe the clinical applications of tumor markers. Page 422. AFP is a tumor marker for hepatocellular carcinoma and what other cancer type?
Germ cell (nonseminoma) carcinoma, Small cell lung carcinoma, Colorectal cancer, Breast cancer`,
  `question: Describe clinical applications of tumor markers. Page 422. In non-pregnant patients an AFP concentration greater than 1000 ug/L is indicative of what?
Cancer, A benign condition, A normal finding, Pregnancy`,
  `question: Describe clinical applications of tumor markers. Page 422. An elevated AFP concentration after surgery for hepatocellular carcinoma may indicate what?
Incomplete removal of the tumor or metastasis, Successful surgery, A benign liver condition, A different type of cancer`,
  `question: Describe clinical applications of tumor markers. Page 423. What is the most widely used tumor marker for colorectal cancer?
Carcinoembryonic antigen (CEA), a-fetoprotein (AFP), Cancer antigen 15-3 (CA 15-3), Prostate-specific antigen (PSA)`,
  `question: Describe clinical applications of tumor markers. Page 423. Although not specific CEA can be used to aid in the diagnosis prognosis and what else for colorectal cancer?
Therapy monitoring, Screening, Staging, Prevention`,
  `question: Describe clinical applications of tumor markers. Page 423. Monoclonal immunoglobulins have been used as a marker for what disease for more than 100 years?
Multiple myeloma, Lymphoma, Leukemia, Breast cancer`,
  `question: Describe clinical applications of tumor markers. Page 423. What is a free monoclonal immunoglobulin light chain found in the serum and urine of multiple myeloma patients?
Bence Jones protein, Albumin, C-reactive protein, Ferritin`,
  `question: Describe methods and tests for identifying cancers and tumors. Page 416. CA 15-3 is measured using what type of methods that utilize capture and labeled antibodies?
Immunoassay methods, HPLC methods, Microarray methods, Electrophoresis methods`,
  `question: Describe methods and tests for identifying cancers and tumors. Page 422. AFP is typically measured using what type of immunoassays?
Sandwich immunoassays, Competitive immunoassays, Fluorescence polarization immunoassays, Homogeneous immunoassays`
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