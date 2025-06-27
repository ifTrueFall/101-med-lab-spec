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
  `question: Define terminology associated with vitamins, minerals, and nutritional assessment. Page 392. What is an enzymatically inactive protein part of an enzyme that requires a cofactor for its activity?
Apoenzyme, Holoenzyme, Coenzyme, Cofactor`,
  `question: Define terminology associated with vitamins, minerals, and nutritional assessment. Page 392. What is the term for any disease caused by a lack of vitamins?
Avitaminosis, Hypervitaminosis, Hypovitaminosis, Nutriture`,
  `question: Define terminology associated with vitamins, minerals, and nutritional assessment. Page 392. Beriberi is a disease caused by a lack of which vitamin?
Vitamin B1 (thiamine), Vitamin B3 (niacin), Vitamin B12 (cobalamin), Vitamin C (ascorbic acid)`,
  `question: Define terminology associated with vitamins, minerals, and nutritional assessment. Page 392. What are organic compounds that function as cofactors with enzymes in promoting metabolic reactions?
Coenzyme, Cofactor, Apoenzyme, Holoenzyme`,
  `question: Define terminology associated with vitamins, minerals, and nutritional assessment. Page 392. A non-protein chemical that assists with a biological chemical reaction is called a what?
Cofactor, Coenzyme, Apoenzyme, Holoenzyme`,
  `question: Define terminology associated with vitamins, minerals, and nutritional assessment. Page 392. What is a nutrient required for normal physiological functions that must be obtained from a dietary source?
Essential Nutrient, Trace Element, Vitamin, Mineral`,
  `question: Define terminology associated with vitamins, minerals, and nutritional assessment. Page 392. What are the active forms of enzymes called?
Holoenzyme, Apoenzyme, Coenzyme, Cofactor`,
  `question: Define terminology associated with vitamins, minerals, and nutritional assessment. Page 392. What is a condition of abnormally high storage levels of vitamins which can lead to toxic symptoms?
Hypervitaminosis, Hypovitaminosis, Avitaminosis, Nutriture`,
  `question: Define terminology associated with vitamins, minerals, and nutritional assessment. Page 392. A disorder that is caused by the deficiency of a vitamin is known as what?
Hypovitaminosis, Hypervitaminosis, Beriberi, Pellagra`,
  `question: Define terminology associated with vitamins, minerals, and nutritional assessment. Page 392. The state of the nutrition of the body is called what?
Nutriture, RDA, Avitaminosis, Hypervitaminosis`,
  `question: Define terminology associated with vitamins, minerals, and nutritional assessment. Page 392. Pellagra is a disease caused by a lack of which vitamin?
Vitamin B3 (niacin), Vitamin B1 (thiamine), Vitamin B12 (cobalamin), Vitamin C (ascorbic acid)`,
  `question: Define terminology associated with vitamins, minerals, and nutritional assessment. Page 392. What condition occurs when the body cannot make enough healthy red blood cells due to a lack of vitamin B12?
Pernicious Anemia, Beriberi, Pellagra, Scurvy`,
  `question: Define terminology associated with vitamins, minerals, and nutritional assessment. Page 392. Scurvy is a disease caused by a lack of which vitamin?
Vitamin C (ascorbic acid), Vitamin B1 (thiamine), Vitamin B3 (niacin), Vitamin B12 (cobalamin)`,
  `question: Define terminology associated with vitamins, minerals, and nutritional assessment. Page 392. Minerals that are required in amounts measured in milligrams are called what?
Trace Elements, Ultratrace Elements, Vitamins, Essential Nutrients`,
  `question: Define terminology associated with vitamins, minerals, and nutritional assessment. Page 392. Minerals that are required in amounts measured in nanograms are called what?
Ultratrace Elements, Trace Elements, Vitamins, Essential Nutrients`,
  `question: Discuss the dietary intake recommendations for vitamins and minerals. Page 394. Vitamins are organic compounds required in what amounts in the diet?
Trace amounts, Large amounts, Grams, Milliliters`,
  `question: Discuss the dietary intake recommendations for vitamins and minerals. Page 394. In addition to RDAs what did the Food and Nutrition Board establish because of the increased risk from supplements?
Tolerable upper intake levels (IU), Minimum daily requirements, Average intake levels, Estimated safe levels`,
  `question: Discuss the dietary intake recommendations for vitamins and minerals. Page 395. According to the RDA table what is the RDA for Vitamin D for both adult males and females?
15 ug/day, 15 mg/day, 900 ug/day, 400 ug/day`,
  `question: Discuss the dietary intake recommendations for vitamins and minerals. Page 395. According to the RDA table what is the RDA for Vitamin B12 for both adult males and females?
2.4 ug/day, 1.2 mg/day, 16 mg/day, 400 ug/day`,
  `question: Discuss the dietary intake recommendations for vitamins and minerals. Page 395. According to the RDA table which trace element has a higher RDA for adult males than for adult females?
Zinc, Copper, Molybdenum, Selenium`,
  `question: Describe the clinically significant vitamins and minerals. Page 396. Vitamins are classified on the basis of what property?
Their solubility, Their color, Their taste, Their source`,
  `question: Describe the clinically significant vitamins and minerals. Page 396. Which vitamins are fat-soluble?
Vitamins A D E and K, Vitamins B and C, Vitamins A and B, Vitamins C and D`,
  `question: Describe the clinically significant vitamins and minerals. Page 396. Fat-soluble vitamins must have what to transport them through blood?
Carrier molecules, Water, Bile acids, Micelles`,
  `question: Describe the clinically significant vitamins and minerals. Page 396. Which vitamins have a shorter life span in the body and are usually not stored but excreted through urine?
Water-soluble vitamins, Fat-soluble vitamins, All vitamins, All minerals`,
  `question: Describe the clinically significant vitamins and minerals. Page 396. Many water-soluble vitamins function as what in metabolic reactions?
Coenzymes, Hormones, Substrates, Inhibitors`,
  `question: Describe the clinically significant vitamins and minerals. Page 397. Vitamin A is critical for vision as an essential component of what protein?
Rhodopsin, Keratin, Collagen, Hemoglobin`,
  `question: Describe the clinically significant vitamins and minerals. Page 397. What is the major plant source of vitamin A?
Beta-carotene, Retinol, Retinal, Retinoic acid`,
  `question: Correlate laboratory findings with nutritional disorders. Page 397. A deficiency in Vitamin A leads to what vision-related condition?
Night blindness (nyctalopia), Color blindness, Astigmatism, Glaucoma`,
  `question: Describe the clinically significant vitamins and minerals. Page 398. Besides being available in diet Vitamin D is also produced endogenously when what strikes the skin?
Ultraviolet (UV) rays from sunlight, Infrared radiation, Blue light, X-rays`,
  `question: Correlate laboratory findings with nutritional disorders. Page 398. A deficiency in Vitamin D can lead to what condition in children?
Rickets, Scurvy, Beriberi, Pellagra`,
  `question: Correlate laboratory findings with nutritional disorders. Page 398. A deficiency in Vitamin D can lead to what condition in adults?
Osteomalacia, Osteoporosis, Osteoarthritis, Paget's disease`,
  `question: Describe the clinically significant vitamins and minerals. Page 399. Vitamin E is a powerful antioxidant and the primary defense against what?
Potentially harmful oxidations, Bacterial infections, Viral infections, Blood clotting`,
  `question: Correlate laboratory findings with nutritional disorders. Page 399. The major symptom of vitamin E deficiency is what condition?
Hemolytic anemia, Pernicious anemia, Iron deficiency anemia, Aplastic anemia`,
  `question: Describe the clinically significant vitamins and minerals. Page 400. Vitamin K is essential for the formation of prothrombin and what else?
At least five other coagulation proteins, Red blood cells, White blood cells, Platelets`,
  `question: Correlate laboratory findings with nutritional disorders. Page 400. A deficiency in Vitamin K may lead to what type of episode?
A hemorrhagic episode, A thrombotic episode, A hemolytic episode, A septic episode`,
  `question: Correlate laboratory findings with nutritional disorders. Page 400. What laboratory determination is an excellent index of prothrombin adequacy and is prolonged in vitamin K deficiency?
Prothrombin time (PT), Activated partial thromboplastin time (aPTT), Thrombin time (TT), Platelet count`,
  `question: Describe the clinically significant vitamins and minerals. Page 401. Vitamin B1 (thiamine) acts as a coenzyme in decarboxylation reactions in what major metabolic pathway?
Carbohydrate pathways, Lipid pathways, Protein pathways, Nucleic acid pathways`,
  `question: Correlate laboratory findings with nutritional disorders. Page 401. In Western society which group most often experiences thiamine deficiency?
Alcoholics, Children, Pregnant women, Athletes`,
  `question: Describe the clinically significant vitamins and minerals. Page 401. Vitamin B2 (riboflavin) functions primarily as a component of what two coenzymes?
FMN and FAD, NAD and NADP, Coenzyme A and Biotin, TPP and PLP`,
  `question: Describe the clinically significant vitamins and minerals. Page 402. Vitamin B3 (niacin) functions as a component of what two coenzymes?
NAD and NADP, FMN and FAD, Coenzyme A and Biotin, TPP and PLP`,
  `question: Correlate laboratory findings with nutritional disorders. Page 402. The clinical syndrome resulting from niacin deficiency is known as what?
Pellagra, Beriberi, Scurvy, Rickets`,
  `question: Describe the clinically significant vitamins and minerals. Page 402. Pyridoxine (vitamin B6) is three related compounds including pyridoxine pyridoxamine and what else?
Pyridoxal, Pyruvate, Pyrimidine, Purine`,
  `question: Correlate laboratory findings with nutritional disorders. Page 402. A deficiency in Vitamin B6 is more commonly seen in patients deficient in what?
Several B vitamins, Only Vitamin B6, Fat-soluble vitamins, Vitamin C`,
  `question: Describe the clinically significant vitamins and minerals. Page 403. Folate (Vitamin B9) is involved in the metabolism of what amino acid?
Homocysteine, Methionine, Cysteine, Glycine`,
  `question: Correlate laboratory findings with nutritional disorders. Page 403. The major clinical symptom of folate deficiency is what type of anemia?
Megaloblastic anemia, Hemolytic anemia, Microcytic anemia, Aplastic anemia`,
  `question: Describe the clinically significant vitamins and minerals. Page 403. Vitamin B12 (cobalamin) refers to a large group of compounds containing what element?
Cobalt, Iron, Copper, Zinc`,
  `question: Describe the clinically significant vitamins and minerals. Page 403. Vitamin B12 participates as a coenzyme in enzymatic reactions necessary for hematopoiesis and what other process?
Fatty acid metabolism, Carbohydrate metabolism, Protein synthesis, DNA replication`,
  `question: Describe the clinically significant vitamins and minerals. Page 404. What is the most commonly discussed vitamin which is a strong reducing compound that must be acquired via dietary ingestion?
Vitamin C (Ascorbic Acid), Vitamin A, Vitamin D, Vitamin E`,
  `question: Describe the clinically significant vitamins and minerals. Page 404. Vitamin C is important in the formation and stabilization of what protein?
Collagen, Keratin, Hemoglobin, Albumin`,
  `question: Describe the clinically significant vitamins and minerals. Page 405. Zinc Copper Selenium and Chromium are considered what?
Trace minerals, Ultratrace minerals, Toxic trace elements, Vitamins`,
  `question: Describe the clinically significant vitamins and minerals. Page 405. What is the function of many trace minerals in the diet?
They function as enzyme cofactors, They function as hormones, They provide energy, They build cell membranes`,
  `question: Describe the clinically significant vitamins and minerals. Page 405. Aluminum Cadmium Mercury and Lead are all considered what?
Toxic trace elements, Essential trace minerals, Water-soluble vitamins, Fat-soluble vitamins`,
  `question: Describe proper sample collection and various clinical test procedures for nutritional assessment. Page 406. According to the table what is the primary analytical methodology for Vitamins A D E and B6?
HPLC, Flurospectrophotometry, Competitive binding protein assay, Immunoassay`,
  `question: Describe proper sample collection and various clinical test procedures for nutritional assessment. Page 406. According to the table what analytical methodology can be used for Vitamin B1 (Thiamine)?
Flurospectrophotometry or HPLC, Immunoassay only, Competitive binding protein only, PT/APTT`,
  `question: Correlate laboratory findings with nutritional disorders. Page 406. According to the table a deficiency in Vitamin A can lead to the degeneration of what?
Eyes & skin, Bones & teeth, Nerves & muscles, Blood cells`,
  `question: Correlate laboratory findings with nutritional disorders. Page 406. According to the table a deficiency in Vitamin B3 (Niacin) leads to what disease?
Pellagra, Beriberi, Scurvy, Rickets`,
  `question: Correlate laboratory findings with nutritional disorders. Page 406. According to the table a deficiency in Vitamin B12 can lead to megaloblastic anemia and what other condition?
Pernicious anemia, Hemorrhagic disease, Beriberi, Scurvy`,
  `question: Correlate laboratory findings with nutritional disorders. Page 406. According to the table a deficiency in Vitamin C leads to what disease?
Scurvy, Pellagra, Rickets, Beriberi`,
  `question: Describe proper sample collection and various clinical test procedures for nutritional assessment. Page 406. According to the table what is a common analytical methodology for Vitamin B12?
Competitive binding protein or Immunoassay, HPLC only, Flurospectrophotometry only, PT/APTT`,
  `question: Discuss the dietary intake recommendations for vitamins and minerals. Page 394. When vitamin levels are deficient severe complications can occur to bones teeth blood clotting and what else?
Nerve function, Muscle growth, Hormone production, Vision`
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