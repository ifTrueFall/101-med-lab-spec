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
  `question: What is the primary function of plasma lipoproteins?
Transport lipids through the bloodstream, Store energy in adipose tissue, Catalyze metabolic reactions, Build cell membranes`,

  `question: What are the protein components of lipoproteins called that are primarily located on their surface?
Apolipoproteins, Glycoproteins, Albumins, Globulins`,

  `question: Apolipoproteins help maintain structural integrity of lipoproteins and serve as ligands for cell receptors and what else?
Activators and inhibitors of enzymes that modify lipoproteins, Transporters of glucose, Carriers of oxygen, Regulators of pH`,

  `question: Which apolipoprotein is the major protein of HDL and is frequently used as a measure of HDL amount?
Apo A-1, Apo B-100, Apo B-48, Apo C-II`,

  `question: Which apolipoprotein is the principal protein of LDL VLDL and chylomicrons existing in two forms Apo B-100 and Apo B-48?
Apo B, Apo A, Apo C, Apo E`,

  `question: Apo B-100 is found in LDL and VLDL and is a critical ligand for which receptor involved in LDL uptake by cells?
LDL receptor, HDL receptor, Scavenger receptor, Insulin receptor`,

  `question: Apo B-48 is found exclusively in which lipoprotein class?
Chylomicrons, LDL, VLDL, HDL`,

  `question: Which apolipoprotein is an important activator of lipoprotein lipase LPL?
Apo C-II, Apo A-I, Apo B-100, Apo E`,

  `question: Which apolipoprotein plays a critical role in the metabolism of triglyceride-rich lipoproteins like chylomicrons and VLDL?
Apo C, Apo A, Apo B-48, Apo D`,

  `question: Which apolipoprotein when present in multiple copies on a single LDL particle may reduce its binding to the LDL receptor?
Apo C-III, Apo A-I, Apo B-100, Apo E2`,

  `question: Which apolipoprotein is recognized by hepatic receptors for the removal of chylomicron remnants and IDL?
Apo E, Apo A-I, Apo B-48, Apo C-I`,

  `question: There are several different classes of lipoproteins that differ in size density and what other major characteristic?
Protein and lipid composition, Color, Solubility in water, Electrical charge`,

  `question: From largest and least dense to smallest and most dense what is the general order of the major lipoprotein classes?
Chylomicrons VLDL LDL HDL, HDL LDL VLDL Chylomicrons, LDL HDL Chylomicrons VLDL, VLDL Chylomicrons LDL HDL`,

  `question: Which lipoprotein class is the largest and least dense containing the highest percentage of triglycerides?
Chylomicrons, VLDL, LDL, HDL`,

  `question: Chylomicrons are primarily formed in which organ from dietary lipids?
Intestine, Liver, Adipose tissue, Pancreas`,

  `question: What is the primary function of chylomicrons?
To deliver dietary triglycerides to peripheral tissues, To transport cholesterol from liver to tissues, To remove cholesterol from tissues, To deliver endogenous triglycerides`,

  `question: Chylomicrons are normally absent from plasma after how many hours of fasting?
10 to 12 hours, 2 to 4 hours, 24 hours, 1 hour`,

  `question: Which apolipoprotein is essential for the assembly and secretion of chylomicrons from the intestine?
Apo B-48, Apo B-100, Apo A-I, Apo C-II`,

  `question: Which apolipoprotein do chylomicrons acquire in circulation that activates lipoprotein lipase LPL?
Apo C-II, Apo A-I, Apo B-48, Apo E`,

  `question: After triglyceride hydrolysis by LPL what are the remaining chylomicron particles called?
Chylomicron remnants, LDL particles, VLDL particles, Nascent HDL`,

  `question: Which lipoprotein is produced by the liver and is rich in endogenous triglycerides?
VLDL Very-Low-Density Lipoprotein, Chylomicrons, LDL Low-Density Lipoprotein, HDL High-Density Lipoprotein`,

  `question: Which apolipoprotein is the primary structural protein of VLDL?
Apo B-100, Apo B-48, Apo A-I, Apo D`,

  `question: What is the fate of VLDL after it releases triglycerides to tissues?
It is converted to IDL and then to LDL, It is directly taken up by the liver, It is converted to HDL, It is excreted in bile`,

  `question: Elevated levels of VLDL are associated with what appearance of plasma?
Turbid or milky, Clear, Yellowish, Greenish`,

  `question: LDL is formed from the metabolic breakdown of which other lipoprotein?
VLDL (via IDL), HDL, Chylomicrons, Lp(a)`,

  `question: LDL particles are the primary carriers of what to peripheral tissues?
Cholesterol, Triglycerides, Phospholipids, Fat-soluble vitamins`,

  `question: Which apolipoprotein on LDL binds to the LDL receptor facilitating cholesterol uptake by cells?
Apo B-100, Apo A-I, Apo C-II, Apo E`,

  `question: High plasma concentrations of LDL are a major risk factor for what disease?
Atherosclerosis, Diabetes mellitus, Liver disease, Kidney disease`,

  `question: LDL is often referred to as what type of cholesterol?
Bad cholesterol, Good cholesterol, Dietary cholesterol, Endogenous cholesterol`,

  `question: What is the characteristic structure of Lp(a) lipoprotein?
An LDL-like particle with Apo(a) covalently bound to Apo B-100, An HDL-like particle with Apo(a), A VLDL particle with extra Apo C, A chylomicron with Apo(a)`,

  `question: Elevated levels of Lp(a) are considered an independent risk factor for what?
Atherosclerotic cardiovascular disease, Gallstones, Pancreatitis, Fatty liver disease`,

  `question: Which lipoprotein is the smallest and most dense synthesized by both the liver and intestine?
HDL High-Density Lipoprotein, LDL Low-Density Lipoprotein, VLDL Very-Low-Density Lipoprotein, Chylomicrons`,

  `question: What is the major protein component of HDL?
Apo A-I, Apo B-100, Apo B-48, Apo C-II`,

  `question: What is the primary role of HDL in cholesterol metabolism?
Reverse cholesterol transport removing cholesterol from cells back to liver, Delivering cholesterol to peripheral tissues, Transporting dietary cholesterol, Synthesizing cholesterol`,

  `question: The newly secreted form of HDL is often discoidal and is most active in removing excess cholesterol from cells. True or False?
True, False, Only spherical HDL removes cholesterol, This describes nascent chylomicrons`,

  `question: When discoidal HDL acquires cholesteryl esters and triglycerides it transforms into what form?
Spherical HDL, LDL, VLDL, Chylomicron remnant`,

  `question: HDL is often referred to as what type of cholesterol?
Good cholesterol, Bad cholesterol, Oxidized cholesterol, Free cholesterol`,

  `question: Which enzyme is responsible for the cleavage or breakdown of triglycerides into glycerol and fatty acids?
Lipolysis (general term for the process specific enzymes are lipases), Amylase, Protease, Nuclease`,

  `question: What can glycerol derived from lipolysis be broken down into and used for glucose synthesis?
Pyruvate, Acetyl-CoA, Lactate, Ketone bodies`,

  `question: What process must fatty acids undergo to be used for energy production?
Oxidation (beta-oxidation), Reduction, Esterification, Hydrolysis`,

  `question: Fatty acid oxidation is also referred to as beta-oxidation because 2-carbon units are cleaved off at which carbon position?
Beta-carbon position second carbon from acid end, Alpha-carbon position, Omega-carbon position, Gamma-carbon position`,

  `question: The cleaved 2-carbon unit from beta-oxidation forms what molecule?
Acetyl-CoA, Pyruvate, Malonyl-CoA, Succinyl-CoA`,

  `question: When there is not enough glucose available for the brain the liver can use acetyl-CoA to synthesize what?
Ketone bodies ketogenesis, More glucose gluconeogenesis, Amino acids, Triglycerides`,

  `question: High levels of secreted ketones result in a condition known as ketosis or what other term if severe?
Ketoacidosis, Alkalosis, Hyperglycemia, Hypoglycemia`,

  `question: What effect do high levels of ketones in the blood have on blood pH?
Decreases blood pH makes it more acidic, Increases blood pH makes it more alkaline, No effect on blood pH, Stabilizes blood pH at 7.4`,

  `question: Is severe ketoacidosis a potentially lethal condition?
Yes, No it is generally mild, Only in children, Only if untreated for weeks`,

  `question: Which component of the lipoprotein structure helps to solubilize the lipids in the aqueous environment of plasma?
Apolipoproteins and phospholipid outer layer, Triglyceride core only, Cholesterol ester core only, Only cholesterol`,

  `question: Apo B-48 is synthesized in the intestine while Apo B-100 is synthesized where?
Liver, Adipose tissue, Muscle, Kidney`,

  `question: Which lipoprotein is primarily responsible for the turbidity of postprandial plasma after a fatty meal?
Chylomicrons, HDL, LDL, Lp(a)`,

  `question: The enzyme LCAT (lecithin-cholesterol acyltransferase) which esterifies cholesterol is primarily associated with which lipoprotein?
HDL, LDL, VLDL, Chylomicrons`,

  `question: What is the main metabolic fate of chylomicron remnants?
Uptake by the liver via Apo E recognition, Conversion to LDL, Direct excretion by kidneys, Storage in adipose tissue`,

  `question: Intermediate-Density Lipoprotein IDL is a transient particle formed during the conversion of what to what?
VLDL to LDL, Chylomicrons to VLDL, HDL to LDL, LDL to VLDL`,

  `question: Which apolipoprotein acts as a cofactor for LCAT?
Apo A-I, Apo B-100, Apo C-II, Apo B-48`,

  `question: The primary physiological role of LDL is to deliver cholesterol to cells that express what?
LDL receptors, HDL receptors, VLDL receptors, Scavenger receptors`,

  `question: What is the approximate percentage of protein in HDL particles?
45 percent, 5 percent, 20 percent, 10 percent`,

  `question: What is the approximate percentage of triglyceride in chylomicrons?
85 to 95 percent, 5 to 10 percent, 50 percent, 20 percent`,

  `question: The process where HDL retrieves cholesterol from cells and returns it to the liver is called what?
Reverse cholesterol transport, Forward cholesterol transport, Triglyceride cycling, Fatty acid esterification`,

  `question: In what cellular compartment does beta-oxidation of fatty acids mainly occur?
Mitochondria, Cytosol, Nucleus, Endoplasmic reticulum`,

  `question: Which of the following is a ketone body?
Acetoacetate, Pyruvate, Lactate, Acetyl-CoA`,

  `question: Diabetic ketoacidosis is a condition characterized by high levels of glucose and what else in the blood?
Ketone bodies, Triglycerides, Uric acid, Lactic acid`
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