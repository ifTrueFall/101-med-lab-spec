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
  `question: What is another name for Transthyretin TTR?
Prealbumin, Albumin, Haptoglobin, Ceruloplasmin`,
  `question: Is Transthyretin TTR a glycosylated protein?
No it is non-glycosylated, Yes it has one carbohydrate group, Yes it has multiple carbohydrate groups, Only in certain conditions`,
  `question: How many identical subunits make up Transthyretin TTR?
Four, Two, Three, Six`,
  `question: Transthyretin TTR contains binding sites for which hormones in its hollow core?
Thyroid hormones T3 and T4, Steroid hormones, Peptide hormones, Growth hormones`,
  `question: Approximately what percentage of thyroid hormones T3 and T4 does TTR bind and transport?
10 percent, 50 percent, 25 percent, 75 percent`,
  `question: Besides thyroid hormones TTR also helps with the transport of what other protein?
Retinol-binding protein RBP, Albumin, Transferrin, Hemoglobin`,
  `question: Where is Transthyretin TTR primarily synthesized?
Liver, Kidneys, Spleen, Pancreas`,
  `question: The synthesis of TTR is stimulated by which of these?
Glucocorticosteroid hormones, Insulin, Estrogen, Growth hormone`,
  `question: What is the approximate half-life of Transthyretin TTR?
2 to 3 days, 12 hours, 15 to 19 days, 5 days`,
  `question: The TTR RBP complex helps prevent excessive loss of RBP by which organ?
Kidneys, Liver, Spleen, Lungs`,
  `question: What is the primary function of Retinol-binding protein RBP?
Transport protein for active vitamin A, Transport protein for iron, Binds free hemoglobin, Major osmotic protein`,
  `question: In what organ is Retinol-binding protein RBP synthesized?
Liver, Brain, Muscle, Bone marrow`,
  `question: When RBP is transporting retinol in plasma it is bound to TTR in what ratio?
1 to 1 complex, 2 to 1 complex, 1 to 2 complex, Variable complex`,
  `question: What happens to apoRBP after it dissociates from transthyretin?
It is catabolized and cleared by the kidneys, It is recycled by the liver, It binds to albumin, It is excreted in bile`,
  `question: What is the typical half-life of RBP in individuals with normal renal function?
12 hours, 2 to 3 days, 5 days, 1 week`,
  `question: In what condition are Retinol-binding protein RBP levels typically increased?
Renal disease, Liver disease, Protein malnutrition, Acute phase reaction`,
  `question: A decrease in RBP levels is primarily seen in which of these conditions?
Liver disease, Renal failure, Dehydration, Pregnancy`,
  `question: Low serum concentrations of both RBP and vitamin A characterize what deficiency?
Zinc deficiency, Iron deficiency, Copper deficiency, Selenium deficiency`,
  `question: Why is TTR often used as an indicator of protein nutrition?
Its short half-life and high proportion of essential amino acids, Its long half-life and stability, Its large molecular size, Its role in oxygen transport`,
  `question: Concentrations of TTR typically decrease in which of these conditions?
Inflammation and malignancy, Dehydration, Early pregnancy, High protein diet`,
  `question: Genetic variations in TTR can affect the binding of T3 and T4 resulting in cases of what?
Hyper or hypothyroidism, Analbuminemia, Wilson disease, Hemochromatosis`,
  `question: What laboratory methods are normally used to measure TTR and RBP?
Immunoturbidimetric or immunonephelometric methods, Dye-binding methods, Electrophoresis, Spectrophotometry`,
  `question: What is the most abundant plasma protein from mid-gestation until death?
Albumin, Transthyretin, Alpha-fetoprotein, Immunoglobulin G`,
  `question: Besides plasma where else is albumin a major protein component?
CSF interstitial fluid urine and amniotic fluid, Only in blood, Saliva and sweat, Bile and pancreatic juice`,
  `question: What is the approximate half-life of albumin?
15 to 19 days, 2 to 3 days, 12 hours, 5 days`,
  `question: The synthesis of albumin is primarily controlled by what?
Colloidal osmotic pressure COP, Thyroid hormone levels, Iron availability, Vitamin K levels`,
  `question: What is the primary and most critical function of albumin?
Serving as the major contributor to COP, Transporting oxygen, Blood clotting, Enzymatic activity`,
  `question: When albumin concentrations are decreased what can happen to fluid in the vascular space?
It tends to go into the extravascular space, It is retained more effectively, It converts to lymph, It becomes more viscous`,
  `question: Besides its role in COP albumin also serves as a pH buffer and transports what?
Free fatty acids and bilirubin, Glucose and amino acids, Oxygen and carbon dioxide, Sodium and potassium`,
  `question: Increased capillary permeability and decreased hepatic synthesis of albumin can occur due to what condition?
Inflammation, Dehydration, High altitude, Vigorous exercise`,
  `question: The liver is able to maintain albumin levels until it experiences what percentage of functional loss?
50 percent or greater, 10 percent or greater, 25 percent or greater, 75 percent or greater`,
  `question: What is the term for small increases in urinary loss of albumin greater than 30mg per day?
Microalbuminuria, Macroalbuminuria, Proteinuria, Ketonuria`,
  `question: Severe glomerular injury is characterized by a loss of protein greater than what amount per day most of which is albumin?
3.5g per day, 1g per day, 500mg per day, 150mg per day`,
  `question: Which part of the kidney is responsible for reabsorption and degradation of albumin to prevent its loss in urine?
Proximal tubules, Distal tubules, Loop of Henle, Collecting ducts`,
  `question: Increased concentrations of albumin are mainly due to what condition?
Dehydration, Liver disease, Malnutrition, Renal disease`,
  `question: Prolonged tourniquet use or specimen evaporation before analysis can lead to what finding regarding albumin levels?
Increased concentrations, Decreased concentrations, No change in concentrations, Variable concentrations`,
  `question: Albumin is considered what type of acute-phase protein APP?
Negative APP, Positive APP, Neutral APP, Delayed APP`,
  `question: What is analbuminemia?
A very rare genetic deficiency of albumin, An excess of albumin, Albumin with abnormal structure, Antibodies against albumin`,
  `question: Patients with severe burns often experience a loss of albumin through what means?
Through the wounds, Primarily via kidney excretion, Due to liver failure, Through respiratory losses`,
  `question: What laboratory methods using dyes like bromcresol green BCG or purple BCP are commonly used for albumin testing?
Dye binding methods, Immunodiffusion methods, Enzymatic methods, Electrophoretic methods`,
  `question: Immunoturbidimetry and immunonephelometry are especially useful for detection of what albumin levels?
Low albumin levels, High albumin levels, Normal albumin levels only, Albumin variants`,
  `question: What is the most abundant plasma protein in early embryonic life?
alpha-Fetoprotein AFP, Albumin, Transthyretin, Gamma globulin`,
  `question: In normal fetuses AFP binds and transports which hormone?
Estradiol, Progesterone, Testosterone, Thyroxine`,
  `question: When do AFP levels typically drop to very low adult levels after birth?
Within the first 12 months, Within the first week, After 5 years, During puberty`,
  `question: Where is alpha-Fetoprotein AFP synthesized for the embryo fetus and after birth respectively?
Fetal yolk sac and then the liver, Placenta and then the kidneys, Fetal spleen and then bone marrow, Amniotic fluid and then fetal lungs`,
  `question: What is the approximate half-life of alpha-Fetoprotein AFP?
5 days, 12 hours, 2 to 3 days, 15 to 19 days`,
  `question: Elevated maternal AFP levels can be associated with which fetal condition?
Neural tube defects, Trisomy 21, Trisomy 18, Cystic fibrosis`,
  `question: Increased AFP levels are also seen in mothers with what pregnancy characteristic?
Multiple fetuses, Advanced maternal age, Gestational diabetes, Rh incompatibility`,
  `question: Low maternal AFP levels indicate an increased risk for which fetal conditions?
Trisomy 18 and trisomy 21, Spina bifida and anencephaly, Abdominal wall defects, General fetal distress`,
  `question: Alpha-Fetoprotein AFP is used as a tumor marker for which types of cancer?
Hepatocellular carcinoma HCC and germ cell carcinoma, Lung cancer and breast cancer, Colon cancer and pancreatic cancer, Leukemia and lymphoma`,
  `question: When should screening for AFP ideally be conducted during pregnancy?
Between 15 and 20 weeks gestational age, Before 10 weeks gestational age, Between 25 and 30 weeks gestational age, In the third trimester only`,
  `question: Which maternal condition can affect proper testing of AFP levels?
Presence of diabetes in the mother, Maternal hypertension, Maternal anemia, Maternal hypothyroidism`,
  `question: What kind of laboratory assays are required for AFP analysis due to typically low adult levels?
Highly sensitive immunoassays like RIA or EIA, Standard spectrophotometric assays, Dye-binding assays, Nephelometric assays for total protein`,
  `question: On routine electrophoresis where does AFP typically migrate?
Between Albumin and the alpha1-globulin band, With the gamma globulin band, At the point of application, With the beta globulin band`,
  `question: When used as a tumor marker AFP can be fractioned into three isoforms using what method?
Affinity electrophoresis, Standard gel electrophoresis, Capillary electrophoresis, Isoelectric focusing`,
  `question: What condition is characterized by two distinct areas on the albumin band in serum electrophoresis?
Bisalbuminemia, Analbuminemia, Hyperalbuminemia, Hypoalbuminemia`,
  `question: What is the major force that helps retain fluid in the vascular space and maintain vascular volume to which albumin is the primary contributor?
Colloidal osmotic pressure COP, Hydrostatic pressure, Oncotic pressure of globulins, Interstitial fluid pressure`,
  `question: The TTR RBP complex is important for preventing excessive loss of RBP by which physiological process in the kidneys?
Glomerular filtration, Tubular secretion, Tubular reabsorption, Micturition`,
  `question: Fluid drawn through paracentesis can help in the evaluation of the causes of what condition often linked to hypoalbuminemia?
Ascites, Pleural effusion, Pericardial effusion, Joint effusion`,
  `question: What is the normal approximate daily excretion of albumin in urine?
Around 10mg per day, Around 100mg per day, Around 1g per day, Less than 1mg per day`
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