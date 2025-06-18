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
  `question: Page 158, Describe the macroscopic and microscopic structure of the kidneys.
The kidneys are paired bean-shaped organs, The kidneys are single triangular organs, The kidneys are located in the chest cavity, The kidneys are part of the digestive system`,
  `question: Page 158, Describe the macroscopic and microscopic structure of the kidneys.
The two discernible regions of a dissected kidney are the cortex and the medulla, The two discernible regions are the pelvis and the hilum, The two discernible regions are the apex and the base, The two discernible regions are the major and minor calyces`,
  `question: Page 158, Describe the macroscopic and microscopic structure of the kidneys.
The cortex contains most of the glomeruli and the proximal and distal tubules, The cortex contains the loops of Henle and collecting ducts, The cortex is the inner pale region of the kidney, The cortex directly connects to the urethra`,
  `question: Page 158, Describe the macroscopic and microscopic structure of the kidneys.
The medulla consists of most of the Loops of Henle and Collecting ducts, The medulla contains the glomeruli and Bowman's capsule, The medulla is the outer dark region of the kidney, The medulla is where blood enters the kidney`,
  `question: Page 158, Describe the macroscopic and microscopic structure of the kidneys.
Each kidney contains approximately 1 million nephrons, Each kidney contains approximately 10000 nephrons, Each kidney contains a single large nephron, Each kidney contains approximately 10 million nephrons`,
  `question: Page 160, Describe the macroscopic and microscopic structure of the kidneys.
The glomerulus is a capillary tuft surrounded by Bowman's capsule, The glomerulus is a long straight tubule for reabsorption, The glomerulus is the final site of urine concentration, The glomerulus produces the hormone aldosterone`,
  `question: Page 160, Describe the macroscopic and microscopic structure of the kidneys.
The primary role of the glomerulus is to serve as a filter for the nephron, The primary role of the glomerulus is to reabsorb glucose, The primary role of the glomerulus is to secrete hydrogen ions, The primary role of the glomerulus is to store urine`,
  `question: Page 160, Describe the macroscopic and microscopic structure of the kidneys.
The proximal tubule is primarily concerned with reabsorption, The proximal tubule is primarily concerned with filtration, The proximal tubule is primarily concerned with pH balance, The proximal tubule is primarily concerned with urine storage`,
  `question: Page 160, Describe the macroscopic and microscopic structure of the kidneys.
The distal convoluted tubule's role is primarily for electrolyte and pH balance, The distal convoluted tubule's role is for bulk reabsorption of water, The distal convoluted tubule's role is to filter blood cells, The distal convoluted tubule's role is to produce erythropoietin`,
  `question: Page 160, Describe the macroscopic and microscopic structure of the kidneys.
Collecting ducts merge and empty their contents into the renal pelvis, Collecting ducts merge and empty into the afferent arteriole, Collecting ducts are where initial filtration occurs, Collecting ducts are located entirely within the cortex`,
  `question: Page 162, Describe the major biochemical functions of the renal system.
An important physiological component of renal function is glomerular filtration, An important physiological component is bile production, An important physiological component is food digestion, An important physiological component is hormone storage`,
  `question: Page 162, Describe the major biochemical functions of the renal system.
The vasa recta provides oxygen and nutrients to the nephron, The vasa recta filters blood plasma, The vasa recta stores newly formed urine, The vasa recta produces the hormone renin`,
  `question: Page 163, Describe the major biochemical functions of the renal system.
The volume of blood filtered per minute is the glomerular filtration rate (GFR), The volume of blood filtered per minute is the renal blood volume, The volume of blood filtered per minute is the urinary output rate, The volume of blood filtered per minute is the cardiac output`,
  `question: Page 163, Describe the major biochemical functions of the renal system.
Healthy kidneys receive approximately one-quarter of the total cardiac output, Healthy kidneys receive all of the cardiac output, Healthy kidneys receive one-tenth of the total cardiac output, Healthy kidneys receive half of the total cardiac output`,
  `question: Page 163, Describe the major biochemical functions of the renal system.
The main size discriminant barrier in filtration is the glomerular basement membrane, The main size discriminant barrier is the afferent arteriole wall, The main size discriminant barrier is the collecting duct epithelium, The main size discriminant barrier is the wall of the bladder`,
  `question: Page 163, Describe the major biochemical functions of the renal system.
The membrane molecular size cutoff value is approximately 66kDa, The membrane molecular size cutoff value is approximately 10kDa, The membrane molecular size cutoff value is approximately 200kDa, The membrane molecular size cutoff value is approximately 1kDa`,
  `question: Page 163, Describe the major biochemical functions of the renal system.
Substances like albumin and plasma proteins are too large to be normally filtered, Substances like albumin and plasma proteins are freely filtered, Substances like water and electrolytes are too large to be filtered, Substances like glucose and amino acids are not filtered`,
  `question: Page 163, Describe the major biochemical functions of the renal system.
Negatively charged molecules such as proteins are repelled by the basement membrane, Negatively charged molecules are attracted to the basement membrane, The basement membrane is positively charged, The basement membrane has a neutral charge`,
  `question: Page 164, Describe the major biochemical functions of the renal system.
The proximal tubule is the most metabolically active part of the nephron, The collecting duct is the most metabolically active part, The glomerulus is the most metabolically active part, The Loop of Henle is the most metabolically active part`,
  `question: Page 164, Describe the major biochemical functions of the renal system.
In the proximal tubule 100% of glucose is reabsorbed up to the renal threshold, In the proximal tubule 50% of glucose is reabsorbed, In the proximal tubule all glucose is secreted, Glucose is not transported in the proximal tubule`,
  `question: Page 164, Describe the major biochemical functions of the renal system.
In the proximal tubule 75% of water sodium and chloride are reabsorbed, In the proximal tubule 25% of water sodium and chloride are reabsorbed, In the proximal tubule 100% of water sodium and chloride are reabsorbed, All water is reabsorbed in the collecting duct only`,
  `question: Page 164, Describe the major biochemical functions of the renal system.
Tubular reabsorption requires either active transport or passive transport, Tubular reabsorption requires only passive transport, Tubular reabsorption requires only active transport, Tubular reabsorption does not require energy`,
  `question: Page 164, Describe the major biochemical functions of the renal system.
The plasma concentration above which a substance appears in urine is the renal threshold, The plasma concentration is known as the glomerular filtration rate, The plasma concentration is known as the plasma set point, The plasma concentration is known as the urine concentration limit`,
  `question: Page 164, Describe the major biochemical functions of the renal system.
A second function of the proximal tubule is to secrete products to the tubular lumen, A second function is to store excess glucose, A second function is to produce red blood cells, A second function is to filter out large proteins`,
  `question: Page 165, Describe the major biochemical functions of the renal system.
Sodium and chloride are reabsorbed into the medullary interstitial fluid in the ascending limb, Sodium and chloride are secreted from the ascending limb, Water is actively transported out of the ascending limb, The ascending limb is highly permeable to water`,
  `question: Page 165, Describe the major biochemical functions of the renal system.
The descending limb is only permeable to water, The descending limb is only permeable to sodium, The descending limb is impermeable to water, The descending limb actively transports urea`,
  `question: Page 165, Describe the major biochemical functions of the renal system.
The function of the distal tubule is to effect small adjustments to achieve electrolyte and acid-base homeostasis, The function of the distal tubule is bulk reabsorption of water, The function of the distal tubule is initial blood filtration, The function of the distal tubule is hormone production`,
  `question: Page 165, Describe the major biochemical functions of the renal system.
Adjustments in the distal tubule occur under the control of ADH and aldosterone, Adjustments in the distal tubule occur under the control of renin and insulin, Adjustments in the distal tubule occur under the control of EPO and vitamin D, Adjustments in the distal tubule occur under the control of glucagon and cortisol`,
  `question: Page 165, Describe the major biochemical functions of the renal system.
The collecting ducts are the final site for either concentrating or diluting urine, The collecting ducts are the primary site for filtration, The collecting ducts are where glucose is reabsorbed, The collecting ducts produce antidiuretic hormone`,
  `question: Page 166, Describe the major biochemical functions of the renal system.
A typical characteristic of healthy urine is a slightly acidic pH of 4.7-7.8, A typical characteristic is a highly alkaline pH of 9.0, A typical characteristic is a neutral pH of 7.0 exactly, A typical characteristic is a cloudy appearance`,
  `question: Page 166, Describe the major biochemical functions of the renal system.
Anuria is a urinary output of less than 100mL/day, Anuria is a urinary output of more than 3L/day, Anuria is a normal urinary output, Anuria is the absence of urination for one hour`,
  `question: Page 166, Describe the major biochemical functions of the renal system.
Oliguria is a urinary output of less than 400mL/day, Oliguria is a urinary output of more than 3L/day, Oliguria is a urinary output of exactly 500mL/day, Oliguria is painful urination`,
  `question: Page 166, Describe the major biochemical functions of the renal system.
Polyuria is a urinary output of greater than 3L/day, Polyuria is a urinary output of less than 100mL/day, Polyuria is a urinary output of less than 400mL/day, Polyuria is the presence of glucose in urine`,
  `question: Page 167, Describe the major biochemical functions of the renal system.
The two organ systems that regulate body pH are the kidneys and lungs, The two organ systems are the liver and spleen, The two organ systems are the heart and brain, The two organ systems are the stomach and intestines`,
  `question: Page 167, Describe the major biochemical functions of the renal system.
The kidneys regulate pH by conserving bicarbonate ions and removing waste metabolic acids, The kidneys regulate pH by producing strong acids, The kidneys regulate pH by reabsorbing all filtered acids, The kidneys regulate pH by excreting bicarbonate ions`,
  `question: Page 167, Describe the major biochemical functions of the renal system.
The major buffer of the pH system conserved by the kidneys is bicarbonate, The major buffer of the pH system is hydrochloric acid, The major buffer of the pH system is sodium chloride, The major buffer of the pH system is ammonia`,
  `question: Page 168, Describe the major biochemical functions of the renal system.
Primary endocrine functions of the kidneys refer to production of specific hormones by the kidneys themselves, Primary endocrine functions refer to hormone degradation, Primary endocrine functions refer to responding to hormones from other organs, Primary endocrine functions refer to hormone storage`,
  `question: Page 168, Describe the major biochemical functions of the renal system.
Hormones produced by the kidneys include renin and erythropoietin, Hormones produced by the kidneys include insulin and glucagon, Hormones produced by the kidneys include ADH and aldosterone, Hormones produced by the kidneys include cortisol and adrenaline`,
  `question: Page 168, Describe the major biochemical functions of the renal system.
Kidney production of erythropoietin is regulated by blood oxygen levels, Kidney production of erythropoietin is regulated by blood glucose levels, Kidney production of erythropoietin is regulated by blood calcium levels, Kidney production of erythropoietin is regulated by blood pH`,
  `question: Page 168, Describe the major biochemical functions of the renal system.
EPO acts on cells in the bone marrow to increase the number of red blood cells, EPO acts on the liver to produce glucose, EPO acts on the adrenal gland to release aldosterone, EPO acts on the thyroid to produce TSH`,
  `question: Page 168, Describe the major biochemical functions of the renal system.
The kidneys are the site of formation of the active form of vitamin D, The liver is the site of active vitamin D formation, The skin is the site of active vitamin D formation, The bone marrow is the site of active vitamin D formation`,
  `question: Page 168, Describe the major biochemical functions of the renal system.
Secondary endocrine functions are when the kidneys serve as the site of action for hormones like insulin and ADH, Secondary functions are when kidneys produce renin, Secondary functions are when kidneys produce EPO, Secondary functions are when kidneys activate vitamin D`,
  `question: Page 169, Describe the major biochemical functions of the renal system.
Antidiuretic hormone is produced by the hypothalamus and secreted by the posterior pituitary, Antidiuretic hormone is produced and secreted by the adrenal gland, Antidiuretic hormone is produced and secreted by the kidneys, Antidiuretic hormone is produced and secreted by the liver`,
  `question: Page 169, Describe the major biochemical functions of the renal system.
One major function of ADH is the retention of water in the body, One major function of ADH is the excretion of water, One major function of ADH is the reabsorption of sodium, One major function of ADH is the production of urine`,
  `question: Page 169, Describe the major biochemical functions of the renal system.
ADH increases water permeability in the distal tubules and the collecting ducts, ADH decreases water permeability in the distal tubules, ADH increases sodium permeability in the proximal tubule, ADH acts primarily on the Loop of Henle`,
  `question: Page 169, Describe the major biochemical functions of the renal system.
In states of dehydration the renal tubules reabsorb water at their maximal rate, In states of dehydration the renal tubules excrete water, In states of dehydration ADH secretion is suppressed, In states of dehydration dilute urine is produced`,
  `question: Page 169, Describe the major biochemical functions of the renal system.
Aldosterone is a steroid hormone produced by the cortex of the adrenal glands, Aldosterone is a peptide hormone produced by the pituitary, Aldosterone is produced by the kidneys, Aldosterone is produced by the hypothalamus`,
  `question: Page 169, Describe the major biochemical functions of the renal system.
Aldosterone acts on the distal tubules and collecting ducts to facilitate sodium reabsorption, Aldosterone acts on the glomerulus to increase filtration, Aldosterone acts on the proximal tubule to block water reabsorption, Aldosterone acts on the liver to release glucose`,
  `question: Page 170, Describe the major biochemical functions of the renal system.
The juxtaglomerular apparatus (JGA) plays an important part in maintaining systemic blood pressure, The juxtaglomerular apparatus produces urine, The juxtaglomerular apparatus filters blood cells, The juxtaglomerular apparatus reabsorbs glucose`,
  `question: Page 170, Describe the major biochemical functions of the renal system.
The JGA consists of the macula densa and granular cells in the afferent arteriole, The JGA consists of the glomerulus and Bowman's capsule, The JGA consists of the collecting duct and renal pelvis, The JGA consists of the proximal tubule and vasa recta`,
  `question: Page 170, Describe the major biochemical functions of the renal system.
Renin is released primarily in response to decreased afferent arteriolar pressure, Renin is released primarily in response to increased blood pressure, Renin is released in response to high sodium levels, Renin is released in response to high blood glucose`,
  `question: Page 170, Describe the major biochemical functions of the renal system.
Renin cleaves a plasma protein called angiotensinogen to create angiotensin I, Renin cleaves angiotensin II to stop its effects, Renin converts angiotensin I into angiotensin II, Renin cleaves aldosterone to activate it`,
  `question: Page 170, Describe the major biochemical functions of the renal system.
Angiotensin I is converted to angiotensin II in the lungs by angiotensin-converting enzyme (ACE), Angiotensin I is converted to angiotensin II in the kidneys, Angiotensin I is converted to angiotensin II by renin, Angiotensin I is the final active hormone`,
  `question: Page 170, Describe the major biochemical functions of the renal system.
Angiotensin II is a powerful vasoconstrictor that increases blood pressure, Angiotensin II is a powerful vasodilator that lowers blood pressure, Angiotensin II stimulates glucose uptake by cells, Angiotensin II causes red blood cell production`,
  `question: Page 170, Describe the major biochemical functions of the renal system.
Angiotensin II stimulates the release of aldosterone from the adrenal cortex, Angiotensin II stimulates the release of insulin from the pancreas, Angiotensin II stimulates the release of ADH from the kidneys, Angiotensin II inhibits the release of renin`,
  `question: Page 170, Describe the major biochemical functions of the renal system.
The RAAS process increases sodium reabsorption under the influence of aldosterone, The RAAS process decreases sodium reabsorption, The RAAS process increases potassium reabsorption, The RAAS process decreases blood volume`,
  `question: Page 171, Describe the major biochemical functions of the renal system.
Nonprotein nitrogen compounds are waste products from the metabolism of nucleic acids and proteins, NPNs are essential nutrients from carbohydrates, NPNs are hormones produced by the adrenal glands, NPNs are enzymes used in digestion`,
  `question: Page 171, Describe the major biochemical functions of the renal system.
The three principal NPN compounds are urea creatinine and uric acid, The three principal NPNs are glucose fructose and sucrose, The three principal NPNs are sodium potassium and chloride, The three principal NPNs are renin aldosterone and ADH`,
  `question: Page 1, Describe the macroscopic and microscopic structure of the kidneys.
The kidneys' most prominent functions are removal of unwanted substances and homeostasis, The kidneys' most prominent function is producing digestive enzymes, The kidneys' most prominent function is storing bile, The kidneys' most prominent function is absorbing nutrients`,
  `question: Page 1, Describe the macroscopic and microscopic structure of the kidneys.
The bilateral ureters connect the kidneys to the urinary bladder, The bilateral ureters connect the bladder to the urethra, The bilateral ureters connect the kidneys to the aorta, The bilateral ureters store urine temporarily`
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