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
  `question: What are esters of fatty acids and alcohols found in the diet and used for energy storage?
Triglycerides, Phospholipids, Sterols, Lipoproteins`,

  `question: What is a class of lipids derived from a four-membered fused ring system called cyclopentanoperhydrophenanthrene?
Sterols, Fatty acids, Triglycerides, Waxes`,

  `question: What is a water-insoluble compound containing carbon hydrogen and oxygen that yields fatty acids and complex alcohols after hydrolysis?
Lipid, Carbohydrate, Protein, Nucleic acid`,

  `question: What is an organic acid commonly found in animal and vegetable fats and oils that is a monocarboxylic acid with a long carbon chain?
Fatty Acid, Amino Acid, Nucleic Acid, Citric Acid`,

  `question: What type of lipoprotein transports dietary triglycerides and cholesterol from the intestine to the liver and other tissues?
Chylomicrons, LDL, HDL, VLDL`,

  `question: What type of lipoprotein transports endogenous triglycerides from the liver to muscle and adipose tissue?
Very-Low-Density Lipoprotein VLDL, Low-Density Lipoprotein LDL, High-Density Lipoprotein HDL, Chylomicrons`,

  `question: Which lipoprotein is known as bad cholesterol and is the principal carrier of cholesterol to peripheral tissues?
Low-Density Lipoprotein LDL, High-Density Lipoprotein HDL, Very-Low-Density Lipoprotein VLDL, Chylomicrons`,

  `question: Which lipoprotein is known as good cholesterol and is involved in reverse cholesterol transport removing cholesterol from tissues?
High-Density Lipoprotein HDL, Low-Density Lipoprotein LDL, Very-Low-Density Lipoprotein VLDL, Intermediate-Density Lipoprotein IDL`,

  `question: What is the process of converting fatty acids to acetyl-CoA called?
Beta-oxidation, Lipogenesis, Glycolysis, Gluconeogenesis`,

  `question: What condition is characterized by elevated levels of cholesterol and or triglycerides in the blood?
Hyperlipidemia, Hypolipidemia, Atherosclerosis, Steatorrhea`,

  `question: What is a major type of lipid found in cell membranes that is amphipathic having both polar and nonpolar regions?
Phospholipid, Triglyceride, Cholesterol ester, Wax`,

  `question: What are protein components of lipoprotein particles that help solubilize lipids and can act as enzyme cofactors or receptor ligands?
Apolipoproteins, Glycoproteins, Proteoglycans, Metalloproteins`,

  `question: What term refers to a collection of organic molecules primarily containing nonpolar carbon-hydrogen C-H bonds?
Lipid, Carbohydrate, Amino acid, Nucleotide`,

  `question: Lipids serve as structural components of cell membranes and as a major source of what for the body?
Energy, Genetic information, Catalytic activity, Immune defense`,

  `question: Which lipids are the most abundant in the human body and diet?
Triglycerides, Phospholipids, Cholesterol, Sphingolipids`,

  `question: What is the basic structure of a triglyceride?
A glycerol molecule esterified with three fatty acids, A glycerol molecule with two fatty acids and a phosphate group, A sphingosine backbone with one fatty acid, A sterol ring system`,

  `question: Fatty acids consist of a straight alkyl chain terminating with what group?
A carboxyl group COOH, An amino group NH2, A hydroxyl group OH, A phosphate group PO4`,

  `question: What type of fatty acid contains no carbon-carbon double bonds in its hydrocarbon chain?
Saturated fatty acid, Unsaturated fatty acid, Polyunsaturated fatty acid, Trans fatty acid`,

  `question: What type of fatty acid contains one or more carbon-carbon double bonds in its hydrocarbon chain?
Unsaturated fatty acid, Saturated fatty acid, Branched-chain fatty acid, Essential fatty acid`,

  `question: Monounsaturated fatty acids MUFAs contain how many carbon-carbon double bonds?
One, Two or more, None, Only triple bonds`,

  `question: Polyunsaturated fatty acids PUFAs contain how many carbon-carbon double bonds?
Two or more, One, None, Only single bonds`,

  `question: What is the most common configuration of naturally occurring unsaturated fatty acids the cis or trans form?
Cis form, Trans form, Both are equally common, Neither form occurs naturally`,

  `question: Which lipids are complex lipids containing phosphate and are major constituents of cell membranes?
Phospholipids, Triglycerides, Cholesterol esters, Waxes`,

  `question: A phospholipid molecule consists of a glycerol backbone two fatty acids a phosphate group and what other group?
A variable alcohol group like choline or ethanolamine, A third fatty acid, A sugar molecule, A sterol ring`,

  `question: What is the most common phospholipid found on the outer leaflet of animal cell membranes?
Phosphatidylcholine, Phosphatidylethanolamine, Phosphatidylserine, Sphingomyelin`,

  `question: Cholesterol belongs to which class of lipids?
Sterols, Phospholipids, Triglycerides, Fatty acids`,

  `question: Is cholesterol found in plants?
No it is almost exclusively synthesized by animals, Yes in large quantities, Yes in small quantities as phytosterols, Plants do not contain any sterols`,

  `question: Cholesterol is a precursor for the synthesis of which important biological molecules?
Bile acids steroid hormones and Vitamin D, Triglycerides and fatty acids, Phospholipids and sphingolipids, Carbohydrates and proteins`,

  `question: Is cholesterol readily catabolized by most cells to serve as a source of fuel?
No it is not readily catabolized for fuel, Yes it is a primary fuel source, Only in liver cells, Only during fasting`,

  `question: What are complexes of lipids and proteins that are essential for the transport of lipids in the aqueous environment of the blood?
Lipoproteins, Glycolipids, Proteolipids, Apolipoproteins`,

  `question: What is the general structure of a lipoprotein particle?
A spherical particle with a core of nonpolar lipids and a surface of polar lipids and proteins, A bilayer sheet of lipids and proteins, A micelle of fatty acids only, A protein core surrounded by lipids`,

  `question: Which lipoprotein is the largest and least dense responsible for transporting dietary lipids?
Chylomicrons, HDL, LDL, VLDL`,

  `question: Which apolipoprotein is the major protein component of chylomicrons and is essential for their assembly?
Apolipoprotein B-48 Apo B-48, Apolipoprotein A-I Apo A-I, Apolipoprotein C-II Apo C-II, Apolipoprotein E Apo E`,

  `question: VLDLs are produced in the liver and primarily transport what type of lipid?
Endogenous triglycerides, Dietary triglycerides, Cholesterol esters, Free cholesterol`,

  `question: Which apolipoprotein is the major protein on VLDL LDL and IDL?
Apolipoprotein B-100 Apo B-100, Apolipoprotein A-I Apo A-I, Apolipoprotein C-III Apo C-III, Apolipoprotein B-48 Apo B-48`,

  `question: What happens to VLDL as it circulates and unloads triglycerides to tissues?
It is converted to IDL and then LDL, It is directly converted to HDL, It returns to the liver unchanged, It is excreted by the kidneys`,

  `question: LDL particles are the primary carriers of what to peripheral tissues?
Cholesterol, Triglycerides, Phospholipids, Fat-soluble vitamins`,

  `question: High levels of which lipoprotein are strongly associated with an increased risk of atherosclerosis and coronary heart disease?
LDL, HDL, Chylomicrons, VLDL`,

  `question: HDL is synthesized in the liver and intestine and is involved in what important process?
Reverse cholesterol transport, Delivery of triglycerides to tissues, Transport of dietary fats, Formation of atherosclerotic plaques`,

  `question: Which apolipoprotein is the major protein component of HDL and activates LCAT?
Apolipoprotein A-I Apo A-I, Apolipoprotein B-100 Apo B-100, Apolipoprotein C-II Apo C-II, Apolipoprotein E Apo E`,

  `question: High levels of which lipoprotein are generally considered protective against heart disease?
HDL, LDL, VLDL, IDL`,

  `question: What is the name of the enzyme that hydrolyzes triglycerides in chylomicrons and VLDL releasing fatty acids for tissue uptake?
Lipoprotein lipase LPL, Hormone-sensitive lipase HSL, Lecithin-cholesterol acyltransferase LCAT, Pancreatic lipase`,

  `question: Where does beta-oxidation of fatty acids primarily occur within the cell?
Mitochondria, Cytoplasm, Endoplasmic reticulum, Golgi apparatus`,

  `question: What are ketone bodies produced from when fatty acid oxidation is accelerated?
Excess acetyl-CoA, Glucose, Amino acids, Pyruvate`,

  `question: What is a condition characterized by the accumulation of lipids in artery walls leading to plaque formation?
Atherosclerosis, Steatosis, Xanthomatosis, Lipemia retinalis`,

  `question: A patient sample appearing milky or turbid often indicates the presence of high levels of what?
Triglycerides likely from chylomicrons or VLDL, HDL cholesterol, LDL cholesterol, Free fatty acids`,

  `question: What is the recommended fasting period for accurate triglyceride measurement?
10 to 12 hours, 6 to 8 hours, No fasting required, 24 hours`,

  `question: Is fasting generally required for routine cholesterol testing according to recent guidelines?
No fasting is often not required for cholesterol alone, Yes 12 hour fast is mandatory, Yes 8 hour fast is mandatory, Only if triglycerides are also ordered`,

  `question: What is the common enzymatic method for cholesterol measurement based on?
Cholesterol esterase cholesterol oxidase and peroxidase reactions, Triglyceride hydrolysis, Fatty acid oxidation, Apolipoprotein quantification`,

  `question: What is the Friedewald equation used to estimate?
LDL cholesterol concentration, HDL cholesterol concentration, Total cholesterol concentration, Triglyceride concentration`,

  `question: The Friedewald equation cannot be used if triglyceride levels are above what concentration?
400 mg/dL, 200 mg/dL, 150 mg/dL, 100 mg/dL`,

  `question: Methods for HDL cholesterol measurement often involve precipitation of non-HDL lipoproteins followed by cholesterol measurement in the supernatant or what other approach?
Direct or homogeneous assays, Ultracentrifugation only, Electrophoresis only, Immunoassay for Apo A-I`,

  `question: Lipoprotein electrophoresis separates lipoproteins based on their charge and size into what major bands?
Alpha HDL beta LDL pre-beta VLDL and chylomicrons, Only LDL and HDL, Triglycerides and cholesterol, Apolipoproteins only`,

  `question: Which lipoprotein fraction remains at the origin during standard lipoprotein electrophoresis?
Chylomicrons, HDL alpha-lipoprotein, LDL beta-lipoprotein, VLDL pre-beta-lipoprotein`,

  `question: Which lipoprotein fraction migrates fastest towards the anode corresponding to alpha-globulins?
HDL alpha-lipoprotein, LDL beta-lipoprotein, VLDL pre-beta-lipoprotein, Chylomicrons`,

  `question: What is a common specimen requirement for most lipid panel testing regarding patient state?
Fasting state ideally 10-12 hours for triglycerides, Non-fasting state, Post-prandial state 2 hours after meal, Random state`,

  `question: What is the desirable level for total cholesterol according to many guidelines?
Less than 200 mg/dL, 200 to 239 mg/dL, Greater than 240 mg/dL, Less than 150 mg/dL`,

  `question: What is considered an optimal level for LDL cholesterol?
Less than 100 mg/dL, 130 to 159 mg/dL, 160 to 189 mg/dL, Greater than 190 mg/dL`,

  `question: What level of HDL cholesterol is considered protective or "good"?
Greater than or equal to 60 mg/dL, Less than 40 mg/dL for men, Less than 50 mg/dL for women, Between 40 and 50 mg/dL`,

  `question: What is the primary cause of most familial hypercholesterolemias?
Defects in LDL receptor pathways, Overproduction of chylomicrons, Deficiency of lipoprotein lipase, Increased HDL catabolism`
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