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
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 333. What is the principal androgen in the human male?
Testosterone, Estrogen, Progesterone, Inhibin`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 333. Testosterone is required for sexual differentiation spermatogenesis and what other process?
Promotion and maintenance of sexual maturity, Regulation of the menstrual cycle, Maintenance of pregnancy, Production of ova`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 333. What is the primary function of the testes?
To synthesize sperm and androgens, To secrete FSH and LH, To produce GnRH, To store mature sperm`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 333. Which cells in the seminiferous tubules have a crucial role in sperm maturation?
Sertoli cells, Leydig cells, Spermatogonium, Primary spermatocytes`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 333. What glycoprotein do Sertoli cells secrete to inhibit the pituitary secretion of FSH?
Inhibin, Testosterone, Androstenedione, Estradiol`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 333. What is the primary site of androgen production in males?
Interstitial Leydig cells, Sertoli cells, The epididymis, The seminiferous tubules`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 334. In the hypothalamic-pituitary-gonadal axis what does GnRH stimulate the anterior pituitary to release?
Both FSH and LH, Only FSH, Only LH, Testosterone`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 334. In adult men what hormone acts on Leydig cells to stimulate the production of testosterone?
LH, FSH, GnRH, Inhibin`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 334. In adult men what hormone acts on Sertoli cells and is central to the maintenance of spermatogenesis?
FSH, LH, GnRH, Testosterone`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 334. Testosterone provides negative feedback control of which hormone's secretion?
LH secretion, FSH secretion, GnRH secretion, Inhibin secretion`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 334. As males age beyond 30 to 40 years the levels of circulating testosterone begin to decrease in a process termed what?
Andropause, Menopause, Puberty, Spermatogenesis`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 335. What are the two primary functions of the ovaries?
Produce ova and secrete estrogens and progesterone, Secrete FSH and LH, Produce GnRH and inhibin, Store and mature ova`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 335. What hormones are responsible for the development and maintenance of female sex organs and secondary sex characteristics?
Estrogens, Androgens, Progestins, Gonadotropins`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 335. Progesterone is essential in preparing the uterus for implantation and what other role?
Maintaining pregnancy, Regulating bone mass, Increasing plasma proteins, Stimulating ovulation`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 336. In non-pregnant women what is the most potent estrogen secreted by the ovaries?
Estradiol, Estriol, Estrone, Progesterone`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 336. In non-pregnant women what structure synthesizes progesterone after ovulation?
The corpus luteum, The developing follicle, The adrenal cortex, The placenta`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 336. During pregnancy what is the major source of estrogens?
The placenta, The ovaries, The adrenal cortex, The corpus luteum`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 336. In the female HPG axis what does FSH serve to stimulate?
Follicular growth, Ovulation, Progesterone production, Uterine development`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 336. In the female HPG axis what does LH stimulate?
Ovulation and development of the corpus luteum, Follicular growth, Estrogen secretion, Endometrial thickening`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 337. The normal menstrual cycle consists of what two phases in order?
The follicular phase and the luteal phase, The luteal phase and the follicular phase, The ovulation phase and the menstrual phase, The proliferative phase and the secretory phase`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 337. Low concentrations of estradiol during the follicular phase affect the negative feedback center to influence the release of what hormone from the pituitary?
FSH, LH, Progesterone, Inhibin`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 337. High concentrations of estradiol just before the midcycle trigger the hypothalamus to influence the release of what hormone from the pituitary?
LH, FSH, Prolactin, Oxytocin`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 337. Normal healthy females are born with a set number of what?
Primordial follicles, Mature ova, Corpus luteums, Zygotes`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 338. What event terminates the follicular phase?
Ovulation, Menstruation, The LH surge, A drop in estrogen`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 338. The dramatic increase in estrogen secretion by the follicle just before ovulation triggers what event?
The LH surge, The FSH peak, The start of menstruation, The formation of the corpus luteum`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 338. What event serves as a reliable predictor of ovulation?
The LH surge, The FSH peak, A rise in progesterone, A drop in estradiol`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 339. The luteal phase is the last half of the cycle that starts with what event?
Ovulation, Menstruation, Follicular growth, The LH surge`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 339. After ovulation circulating LH acts on the ruptured follicular cells to develop them into what structure?
The corpus luteum, A new follicle, The endometrium, A blastocyst`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 339. During the luteal phase FSH and LH are suppressed by what hormones?
Estradiol progesterone and inhibin, Only progesterone, Only estradiol, Only inhibin`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 339. The concentration of progesterone reaches a peak at about how many days post-ovulation?
8 days, 2 days, 14 days, 1 day`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 339. In the absence of conception what happens to the corpus luteum?
It resolves, It continues to grow, It produces hCG, It implants in the uterus`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 339. The drop in what hormone triggers the breakdown and shedding of the uterine lining?
Progesterone, Estrogen, LH, FSH`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 339. If fertilization and pregnancy occur the developing embryo produces what hormone?
Human chorionic gonadotropin (hCG), Progesterone, Estrogen, LH`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 341. What is the term for the complete cessation of menstruation that occurs around age 50?
Menopause, Andropause, Perimenopause, Amenorrhea`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 341. The transition phase to menopause where the ovary's response to gonadotropins decreases is termed what?
Perimenopause, Premature ovarian failure, Postmenopause, Luteal phase defect`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 341. During the perimenopause transition what happens to FSH and estradiol concentrations?
FSH increases and estradiol decreases, FSH decreases and estradiol increases, Both increase, Both decrease`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 341. Prolonged estrogen deficiency after menopause can lead to accelerated bone loss and what condition?
Osteoporosis, Osteoarthritis, Rickets, Paget's disease`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 342. What structure is the primary link between the fetus and mother nourishing the fetus and producing hormones?
The placenta, The corpus luteum, The ovary, The uterus`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 342. With the exception of hCG concentrations of hormones derived from the placenta do what as the placenta increases in size?
Increase in maternal peripheral blood, Decrease in maternal peripheral blood, Remain stable, Fluctuate unpredictably`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 342. High estrogen concentrations during pregnancy suppress the secretion of which two pituitary hormones?
LH and FSH, TSH and ACTH, Prolactin and GH, ADH and Oxytocin`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 343. What hormone stimulates the ovary to produce progesterone which prevents menstruation and protects the pregnancy?
Chorionic gonadotropin (hCG), LH, FSH, Estriol`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 343. In later stages of pregnancy what structure directly produces enough progesterone to maintain the pregnancy?
The placenta, The corpus luteum, The maternal ovary, The adrenal gland`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 343. The placenta produces significant amounts of which estrogen that increases throughout pregnancy?
Estriol, Estradiol, Estrone, Progesterone`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 344. In normal intrauterine pregnancy during the second through fifth weeks the hCG concentration doubles in about how long?
1.5 days, 3.5 days, 5 days, 1 week`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 344. Peak hCG concentrations typically occur at what point in the pregnancy?
About 8 to 10 weeks, About 4 to 6 weeks, About 12 to 14 weeks, At the end of the first trimester`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 344. The presence of twins has what effect on hCG concentrations?
Approximately doubles CG concentrations, Halves CG concentrations, Has no effect on CG concentrations, Causes CG concentrations to decrease`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 345. What is the term for a pregnancy where a fertilized egg implants in a location other than the body of the uterus?
Ectopic pregnancy, Molar pregnancy, Intrauterine pregnancy, Normal pregnancy`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 345. Most abnormal implantations in an ectopic pregnancy occur where?
In the fallopian tube, In the abdomen, On the ovary, On the cervix`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 345. Ectopic pregnancies frequently produce abnormal hCG concentrations and what kind of rate of increase?
Slow rates of increase or even decrease, Rapid rates of increase, Normal doubling times, A higher peak concentration`,
  `question: Describe laboratory tests used for the diagnosis and treatment of endocrine disease states. Page 345. Besides hCG measurement of what other hormone is more predictive of an abnormal pregnancy?
Progesterone, Estriol, Estradiol, LH`,
  `question: Describe specimen collection and processing for endocrine testing. Page 346. For testosterone measurement what type of sample is preferred?
Morning specimens, Evening specimens, Random specimens, 24-hour urine specimens`,
  `question: Describe laboratory tests used for the diagnosis and treatment of endocrine disease states. Page 346. For measuring low levels of testosterone in females what is the method of choice?
Mass spectrometry, Enzymatic immunoassays, Competitive immunoassays, Chemiluminescence`,
  `question: Describe specimen collection and processing for endocrine testing. Page 347. For measurement of estrogens what type of sample can be used?
Serum or plasma, Whole blood only, Urine only, Saliva only`,
  `question: Describe laboratory tests used for the diagnosis and treatment of endocrine disease states. Page 347. For routine measurement of progesterone what method is preferred?
Immunoassays, Mass spectrometry, Gas chromatography, HPLC`,
  `question: Describe specimen collection and processing for endocrine testing. Page 348. What is the preferred specimen for gonadotropin (LH and FSH) measurements?
Serum, Plasma, Whole blood, Urine`,
  `question: Describe laboratory tests used for the diagnosis and treatment of endocrine disease states. Page 348. Analytical methods for measuring gonadotropins must recognize what unique part of the hormone?
The unique Beta subunits, The common Alpha subunit, The carbohydrate portion, The C-terminal peptide`,
  `question: Describe specimen collection and processing for endocrine testing. Page 348. For hCG testing what type of sample is preferred?
Serum specimens, Plasma specimens, Urine specimens, Whole blood specimens`,
  `question: Describe laboratory tests used for the diagnosis and treatment of endocrine disease states. Page 348. What method is used to easily obtain both qualitative and quantitative measurements of hCG?
Immunoassay methods, Mass spectrometry, Electrophoresis, Chromatography`,
  `question: Describe the functions regulations and clinical significance of glandular hormones. Page 335. Besides regulating the menstrual cycle estrogens and progesterone participate in what?
Breast and uterine growth, Bone degradation, Decreasing plasma proteins, Stimulating spermatogenesis`,
  `question: Describe laboratory tests used for the diagnosis and treatment of endocrine disease states. Page 345. hCG testing is used to screen for Down syndrome and what other chromosomal abnormality?
Trisomy 18, Turner syndrome, Klinefelter syndrome, Trisomy 13`
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