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
  `question: How many major pathways are involved in lipoprotein metabolism?
Four, Three, Five, Two`,

  `question: Which three lipoprotein metabolism pathways depend on apo B containing lipoprotein particles?
Lipid absorption exogenous and endogenous pathways, Reverse cholesterol transport exogenous and endogenous pathways, Lipid absorption endogenous and reverse cholesterol transport, Only exogenous and endogenous pathways`,

  `question: The lipid absorption exogenous and endogenous pathways are critical in transporting what to peripheral cells for energy metabolism?
Fatty acids, Glucose, Amino acids, Ketone bodies`,

  `question: In terms of atherosclerosis pathogenesis the net result of the lipid absorption exogenous and endogenous pathways is the delivery of what to peripheral cells?
Cholesterol, Triglycerides, Phospholipids, Bile acids`,

  `question: Why are peripheral cells prone to accumulating cholesterol?
They synthesize their own cholesterol and cannot catabolize it, They primarily absorb dietary cholesterol, They lack LDL receptors, They only store cholesterol not use it`,

  `question: What is the first step in the lipid absorption pathway involving dietary lipids?
Emulsification of fats by bile acids in the intestine, Uptake of chylomicrons by the liver, Hydrolysis of triglycerides by pancreatic lipase, Formation of VLDL in the liver`,

  `question: During lipid absorption dietary triglycerides are hydrolyzed by pancreatic lipase into what absorbable components?
Monoglycerides and free fatty acids, Glycerol and three fatty acids, Cholesterol and fatty acids, Phospholipids and glycerol`,

  `question: After absorption into intestinal cells monoglycerides and fatty acids are re-esterified to form what?
Triglycerides, Cholesterol esters, Phospholipids, Free cholesterol`,

  `question: Newly formed triglycerides and cholesterol are packaged into what lipoprotein particles within intestinal cells?
Chylomicrons, VLDL, LDL, HDL`,

  `question: Which apolipoprotein is unique to chylomicrons and essential for their secretion from intestinal cells?
Apo B-48, Apo B-100, Apo A-I, Apo E`,

  `question: Where do chylomicrons first enter circulation after being secreted from intestinal cells?
The lymphatic system then the bloodstream, Directly into the portal vein to the liver, Directly into systemic arterial circulation, They are stored in adipose tissue first`,

  `question: What is the primary function of the exogenous lipoprotein metabolism pathway?
To transport dietary lipids (triglycerides and cholesterol) to tissues, To transport endogenous lipids from the liver, To remove cholesterol from peripheral tissues, To synthesize new lipids in the liver`,

  `question: In the exogenous pathway chylomicrons acquire Apo C-II in the circulation which activates what enzyme?
Lipoprotein lipase LPL, Hormone-sensitive lipase HSL, Lecithin-cholesterol acyltransferase LCAT, Pancreatic lipase`,

  `question: Lipoprotein lipase LPL hydrolyzes triglycerides in chylomicrons releasing free fatty acids for uptake by what tissues?
Muscle and adipose tissue, Liver only, Brain only, Kidneys only`,

  `question: After most triglycerides are removed from chylomicrons what are the remaining particles called?
Chylomicron remnants, LDL particles, VLDL particles, HDL precursors`,

  `question: Chylomicron remnants are rich in what lipid component?
Cholesteryl esters, Triglycerides, Free fatty acids, Phospholipids`,

  `question: How are chylomicron remnants cleared from circulation?
By hepatic receptors recognizing Apo E, By LDL receptors in peripheral tissues, By scavenger receptors on macrophages, By excretion through the kidneys`,

  `question: The endogenous lipoprotein metabolism pathway involves the metabolism of lipoproteins that originate from where?
The liver, The intestine from dietary fat, Peripheral tissues, Adipose tissue during fasting`,

  `question: Which lipoprotein is primarily synthesized by the liver to transport endogenous triglycerides?
VLDL Very-Low-Density Lipoprotein, Chylomicrons, HDL High-Density Lipoprotein, LDL Low-Density Lipoprotein`,

  `question: VLDL particles contain which major apolipoprotein similar to LDL?
Apo B-100, Apo B-48, Apo A-I, Apo C-I`,

  `question: Like chylomicrons VLDL acquires Apo C-II to activate lipoprotein lipase for triglyceride hydrolysis. True or False?
True, False, VLDL does not interact with LPL, Only chylomicrons use Apo C-II`,

  `question: As VLDL loses triglycerides through LPL activity it is converted into what transient lipoprotein?
IDL Intermediate-Density Lipoprotein, LDL Low-Density Lipoprotein, HDL High-Density Lipoprotein, Chylomicron remnant`,

  `question: IDL particles can be further metabolized by hepatic lipase or taken up by the liver or converted into what other lipoprotein?
LDL Low-Density Lipoprotein, HDL High-Density Lipoprotein, VLDL Very-Low-Density Lipoprotein, Lp(a)`,

  `question: The conversion of VLDL to IDL and then to LDL results in particles progressively richer in what?
Cholesteryl esters and relatively lower in triglycerides, Triglycerides and relatively lower in cholesterol, Phospholipids only, Free fatty acids only`,

  `question: What is the primary function of LDL?
To deliver cholesterol to peripheral cells and the liver, To transport triglycerides to adipose tissue, To remove cholesterol from cells, To carry dietary fats`,

  `question: LDL uptake by cells is mediated by the LDL receptor which recognizes which apolipoprotein on LDL?
Apo B-100, Apo A-I, Apo E, Apo C-II`,

  `question: What happens to the LDL receptor after it delivers LDL into the cell?
It recycles back to the cell surface, It is degraded along with the LDL, It remains in the endosome, It is secreted from the cell`,

  `question: What effect does intracellular cholesterol accumulation have on LDL receptor synthesis?
It suppresses LDL receptor synthesis, It increases LDL receptor synthesis, It has no effect on LDL receptor synthesis, It modifies the LDL receptor`,

  `question: The reverse cholesterol transport pathway involves the removal of excess cholesterol from peripheral cells by which lipoprotein?
HDL High-Density Lipoprotein, LDL Low-Density Lipoprotein, VLDL Very-Low-Density Lipoprotein, Chylomicrons`,

  `question: HDL is synthesized and secreted by the liver and what other organ?
Intestine, Adipose tissue, Pancreas, Kidneys`,

  `question: Nascent or newly secreted HDL is typically what shape?
Discoidal, Spherical, Cylindrical, Cuboidal`,

  `question: Which enzyme associated with HDL esterifies free cholesterol into cholesteryl esters trapping it in the HDL core?
LCAT Lecithin-Cholesterol Acyltransferase, LPL Lipoprotein Lipase, HSL Hormone-Sensitive Lipase, ACAT Acyl-CoA Cholesterol Acyltransferase`,

  `question: Which apolipoprotein on HDL is a major activator of LCAT?
Apo A-I, Apo B-100, Apo C-II, Apo E`,

  `question: As HDL accumulates cholesteryl esters it transforms from a discoidal to what shape?
Spherical, Flattened, Tubular, Aggregated`,

  `question: How does HDL deliver cholesterol back to the liver?
Directly via SR-B1 receptor or indirectly via CETP transfer to other lipoproteins, Only directly via LDL receptor, Only indirectly via VLDL, It does not deliver cholesterol to liver`,

  `question: Cholesteryl Ester Transfer Protein CETP mediates the exchange of cholesteryl esters from HDL for what from VLDL and LDL?
Triglycerides, Phospholipids, Free cholesterol, Apo B-100`,

  `question: What is a major risk factor for Coronary Heart Disease CHD related to lipoprotein levels?
High LDL-C and low HDL-C, Low LDL-C and high HDL-C, High chylomicrons, High VLDL only`,

  `question: What is the recommended minimum fasting period for routine triglyceride measurement?
10 to 12 hours, 6 to 8 hours, No fasting necessary, 24 hours`,

  `question: Is fasting necessary for routine total cholesterol measurement according to current guidelines?
Generally no, Yes a 12 hour fast is required, Yes an 8 hour fast is required, Only if patient has diabetes`,

  `question: What is a common reason for a turbid or milky serum or plasma sample?
High triglyceride levels often from chylomicrons or VLDL, High HDL cholesterol, High LDL cholesterol, Low albumin levels`,

  `question: What is the most common method for measuring total cholesterol in clinical laboratories?
Enzymatic methods, Chemical precipitation methods, Ultracentrifugation, Electrophoresis`,

  `question: Enzymatic cholesterol assays typically involve cholesterol esterase cholesterol oxidase and what other enzyme reaction?
Peroxidase reaction, Lipase reaction, Amylase reaction, Kinase reaction`,

  `question: What is the primary purpose of cholesterol esterase in enzymatic cholesterol assays?
To hydrolyze cholesteryl esters to free cholesterol, To oxidize free cholesterol, To produce a colored product, To reduce interfering substances`,

  `question: What is the typical first step in enzymatic triglyceride measurement?
Hydrolysis of triglycerides to glycerol and free fatty acids by lipase, Oxidation of glycerol, Reduction of fatty acids, Esterification of glycerol`,

  `question: After hydrolysis what product of triglyceride breakdown is commonly measured in enzymatic assays?
Glycerol, Free fatty acids, Acetyl-CoA, Phospholipids`,

  `question: HDL cholesterol measurement often involves a pretreatment step to remove what?
Non-HDL lipoproteins like VLDL and LDL, Chylomicrons only, All triglycerides, Free fatty acids`,

  `question: What is a common method used for the pretreatment step in HDL cholesterol assays?
Precipitation using polyanions and divalent cations or direct homogenous methods, Ultracentrifugation, Electrophoresis, Solvent extraction`,

  `question: The Friedewald equation estimates LDL-C using measured total cholesterol HDL-C and what other lipid?
Triglycerides, Phospholipids, Free fatty acids, Lp(a)`,

  `question: What is the Friedewald equation formula?
LDL-C equals Total cholesterol - HDL-C - (Triglycerides/5) (mg/dL units), LDL-C equals Total cholesterol + HDL-C + (Triglycerides/5), LDL-C equals Total cholesterol - HDL-C - Triglycerides, LDL-C equals (Total cholesterol - HDL-C) / 5`,

  `question: The Friedewald calculation should not be used if triglyceride concentrations are above what level?
400 mg/dL, 200 mg/dL, 150 mg/dL, 100 mg/dL`,

  `question: The Friedewald calculation is also invalid if what lipoprotein is present in significant amounts such as in nonfasting samples?
Chylomicrons, HDL, Lp(a), IDL`,

  `question: Direct LDL-C measurement methods are available and do not require what?
Fasting or the Friedewald calculation, Triglyceride measurement, HDL-C measurement, Total cholesterol measurement`,

  `question: Lipoprotein electrophoresis separates lipoproteins based on differences in their net electrical charge and what other property?
Size, Density, Lipid composition, Apolipoprotein content`,

  `question: In lipoprotein electrophoresis which fraction typically remains at or near the origin?
Chylomicrons, HDL alpha-lipoprotein, LDL beta-lipoprotein, VLDL pre-beta-lipoprotein`,

  `question: Which lipoprotein fraction migrates to the alpha-globulin region in electrophoresis?
HDL, LDL, VLDL, Chylomicrons`,

  `question: Which lipoprotein fraction migrates to the beta-globulin region in electrophoresis?
LDL, HDL, VLDL, Chylomicrons`,

  `question: Which lipoprotein fraction migrates to the pre-beta-globulin region in electrophoresis?
VLDL, HDL, LDL, Chylomicrons`,

  `question: What is considered the reference method for lipoprotein quantitation due to its ability to separate based on hydrated densities?
Ultracentrifugation, Electrophoresis, Enzymatic assays, Friedewald calculation`,

  `question: Is ultracentrifugation widely used in routine clinical laboratories for lipoprotein analysis?
No due to labor skill and equipment required, Yes it is the most common method, Only in specialized reference labs, Yes for STAT lipid panels`,

  `question: LDL-C is a well-validated treatable risk factor for CHD and is the primary basis for treatment decisions in which clinical guidelines mentioned?
NCEP National Cholesterol Education Program, AHA American Heart Association, WHO World Health Organization, FDA Food and Drug Administration`
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