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
  `question: What is the main function of creatine kinase CK?
Generation and facilitation of transportation of high-energy phosphates, Digestion of dietary fats, Metabolism of amino acids, Breaking down acetylcholine`,
  `question: Creatine kinase CK is found predominantly in skeletal muscle cardiac muscle brain and what other tissues?
Other visceral tissues, Only connective tissues, Adipose tissue, Epithelial tissue`,
  `question: Which isoenzyme of creatine kinase CK is found primarily in skeletal muscle and is the major isoenzyme in normal serum?
CK-MM, CK-MB, CK-BB, CK-NN`,
  `question: Which isoenzyme of creatine kinase CK is sensitive and specific to myocardial injury?
CK-MB, CK-MM, CK-BB, CK-MN`,
  `question: Which anticoagulant should be used for CK analysis if plasma is collected?
Heparin, EDTA, Citrate, Oxalate`,
  `question: What is the reference method for the measurement of CK isoenzymes?
Electrophoresis, Ion-exchange chromatography, Immunoassay, Spectrophotometry`,
  `question: Which troponin initiates muscle contraction by binding calcium?
Troponin-C TnC, Troponin-I TnI, Troponin-T TnT, Troponin-M TnM`,
  `question: Which troponin inhibits muscle contraction in the absence of calcium?
Troponin-I TnI, Troponin-C TnC, Troponin-T TnT, Troponin-A TnA`,
  `question: Which troponin anchors the troponin complex to the muscle fiber structure?
Troponin-T TnT, Troponin-C TnC, Troponin-I TnI, Troponin-B TnB`,
  `question: Compared to CK-MB how specific and sensitive are Troponin-T and Troponin-I for cardiac muscle injury?
More specific and sensitive, Less specific and sensitive, Equally specific and sensitive, More specific but less sensitive`,
  `question: What type of specimens can be used for troponin analysis?
EDTA blood and serum, Heparinized plasma only, Serum only, Whole blood only`,
  `question: Aspartate aminotransferase AST is an enzyme that helps metabolize what?
Amino acids, Carbohydrates, Lipids, Nucleic acids`,
  `question: AST is found primarily in the heart liver skeletal muscle and what other organ?
Kidneys, Lungs, Spleen, Pancreas`,
  `question: Most causes of liver cell injury are associated with a greater increase in which enzyme compared to AST?
Alanine aminotransferase ALT, Alkaline phosphatase ALP, Lactate dehydrogenase LD, Gamma-glutamyltransferase GGT`,
  `question: An AST to ALT ratio greater than 1 is suggestive of what condition?
Alcoholic liver disease, Viral hepatitis, Ischemic liver injury, Toxic liver injury`,
  `question: What common preanalytical error should be avoided for AST analysis as it can dramatically increase serum concentration?
Hemolysis, Lipemia, Icterus, Slight turbidity`,
  `question: What is the principle of the Karmen method used for AST measurements?
An enzymatic rate method measured spectrophotometrically, A colorimetric endpoint method, An immunoassay method, An electrophoretic separation method`,
  `question: Lactate dehydrogenase LD is an enzyme required for converting what into energy for cells?
Glucose, Fats, Proteins, Ketones`,
  `question: The highest concentration of LD is found in the heart liver skeletal muscles kidneys and what other cells?
Erythrocytes, Platelets, Neurons, Osteoblasts`,
  `question: Is LD considered a specific or non-specific marker for tissue damage?
Non-specific marker, Highly specific marker, Specific only for liver damage, Specific only for heart damage`,
  `question: Which LD isoenzyme is found in the heart and erythrocytes?
LD-1, LD-3, LD-4, LD-5`,
  `question: Which LD isoenzyme is found in the liver and skeletal muscles?
LD-5, LD-1, LD-2, LD-3`,
  `question: What is the "flip" in the usual ratio of LD-1 to LD-2 indicative of?
Myocardial infarction, Liver disease, Lung injury, Kidney disease`,
  `question: Why should hemolyzed specimens not be used for LD analysis?
Erythrocytes contain 150 times more LD activity than serum, Hemoglobin interferes with the assay reaction, Free iron from hemolysis inhibits the enzyme, It causes a colorimetric interference`,
  `question: Alanine aminotransferase ALT is found primarily in the liver and what other organ?
Kidneys, Heart, Spleen, Brain`,
  `question: Compared to AST is ALT considered a more or less specific indicator of liver inflammation?
More specific, Less specific, Equally specific, Not specific at all`,
  `question: In acute inflammatory conditions of the liver why do ALT elevations tend to remain elevated longer than AST?
Longer half-life of ALT in serum, Slower clearance of ALT by kidneys, Continuous release of ALT from liver, Reversible inhibition of AST`,
  `question: Alkaline phosphatase ALP is an enzyme responsible for removing what group from proteins and other molecules?
Phosphate group, Amino group, Carboxyl group, Methyl group`,
  `question: What is the optimal pH for ALP enzymatic reactions?
9.0 to 10.0, 7.0 to 8.0, 5.0 to 6.0, 3.0 to 4.0`,
  `question: ALP requires what ion as an activator?
Mg2+, Ca2+, Na+, K+`,
  `question: In bone tissue ALP enzyme activity is confined to which cells involved in bone matrix production?
Osteoblasts, Osteoclasts, Osteocytes, Chondrocytes`,
  `question: Elevated ALP levels are of most diagnostic significance in hepatobiliary disease and what other type of disorders?
Bone disorders associated with increased osteoblastic activity, Muscle disorders, Neurological disorders, Pancreatic disorders`,
  `question: Why might a considerable rise in ALP activity be seen in children and juveniles?
Increased osteoblast activity following accelerated bone growth, Normal developmental variation, Higher dietary intake of phosphate, Presence of placental ALP`,
  `question: Why should ALP assays be run as soon as possible after collection?
Serum samples show an increase in enzyme activity over time, The enzyme is very unstable at room temperature, It is rapidly cleared from serum, It is prone to precipitation`,
  `question: Gamma-glutamyltransferase GGT is an enzyme that takes part in the transfer of what across the cell membrane?
Amino acids and peptides, Glucose and fructose, Fatty acids and glycerol, Sodium and potassium ions`,
  `question: GGT is elevated in virtually all hepatobiliary disorders making it one of the most sensitive enzyme assays for these conditions because of its location in the liver's canaliculi and what other cells?
Epithelial cells lining the biliary ductulus, Kupffer cells, Hepatocytes only, Stellate cells`,
  `question: Elevated GGT levels may indicate what condition particularly when chronic?
Alcoholism, Viral hepatitis, Gallstones, Hemochromatosis`,
  `question: How long does it usually take for elevated GGT levels to return to normal after cessation of alcohol consumption?
2 to 3 weeks, 2 to 3 days, 2 to 3 months, 2 to 3 hours`,
  `question: GGT activity is useful in differentiating the source of an elevated ALP level because GGT levels are normal in what type of disorders?
Bone disorders, Liver disorders, Biliary disorders, Pancreatic disorders`,
  `question: Amylase AMY is an enzyme produced primarily by the pancreas and what other glands to help digest carbohydrates?
Salivary glands, Adrenal glands, Thyroid gland, Pituitary gland`,
  `question: Amylase requires what two ions for its activation?
Calcium and chloride ions, Sodium and potassium ions, Magnesium and phosphate ions, Iron and copper ions`,
  `question: Amylase is the smallest enzyme which allows it to be readily filtered by the renal glomerulus and appear where?
In the urine, In the CSF, In saliva, In sweat`,
  `question: While amylase is sensitive for pancreatic disease why is it not considered specific?
An elevated level may indicate a problem not related to the pancreas, It is not elevated in all pancreatic diseases, It is cleared from the blood too quickly, It is inhibited by many common drugs`,
  `question: Which analytical method for amylase measures the disappearance of starch substrate?
Amyloclastic Method, Saccharogenic Method, Chromogenic Method, Continuous Monitoring`,
  `question: Lipase LPS is an enzyme primarily produced by the pancreas to help digest what?
Dietary fats, Dietary carbohydrates, Dietary proteins, Dietary nucleic acids`,
  `question: Why is lipase considered more specific for pancreatic disorders than amylase?
LPS levels are normal in conditions of salivary gland involvement, LPS is only produced in the pancreas, LPS has a shorter half-life, LPS is not filtered by the kidneys`,
  `question: In acute pancreatitis how long do lipase elevations persist compared to amylase elevations?
Approximately 8 days for LPS versus 2 to 3 days for AMY, Approximately 1 day for LPS versus 5 days for AMY, Both persist for the same duration, LPS persists for less time than AMY`,
  `question: Why should hemolysis be avoided for lipase analysis?
Hemoglobin inhibits the activity of serum LPS, It causes a positive interference, Lipase is released from red blood cells, It damages the lipase enzyme`,
  `question: Which lipase measurement method involves an estimation of liberated fatty acids?
Titrimetric Method, Turbidimetric Method, Colorimetric Method, Enzymatic Method`,
  `question: Cholinesterase CHE measures the activity of two separate enzymes: acetylcholinesterase and what other enzyme?
Pseudocholinesterase, Butyrylcholinesterase, Pancreatic cholinesterase, Serum cholinesterase`,
  `question: Acetylcholinesterase is found in nerve tissue erythrocytes lungs spleen and what part of the brain?
Gray matter, White matter, Cerebellum, Brainstem`,
  `question: Pseudocholinesterase is found primarily in the liver but is also present in the white matter of the brain pancreas heart and where else?
Serum, Cerebrospinal fluid, Urine, Saliva`,
  `question: Acetylcholinesterase is involved in the transmission of nerve impulses by breaking down what neurotransmitter?
Acetylcholine, Dopamine, Serotonin, Norepinephrine`,
  `question: A decrease in CHE activity reflects impaired synthesis of the enzyme by what organ in the absence of genetic causes or inhibitors?
Liver, Pancreas, Kidneys, Brain`,
  `question: Measurement of CHE activity can be used as an indicator of possible poisoning by what?
Insecticides, Heavy metals, Alcohol, Carbon monoxide`,
  `question: Workers in which industries may be subject to poisoning by cholinesterase inhibitors?
Agriculture and organic chemical industries, Mining and construction, Healthcare and food service, Technology and manufacturing`,
  `question: Atypical forms of pseudocholinesterase put patients at risk for prolonged responses to what type of drugs used in surgery?
Certain muscle relaxants like succinylcholine, Anesthetics, Antibiotics, Opioids`,
  `question: In patients with low pseudocholinesterase activity why is the destruction of a drug like succinylcholine impaired?
The drug is not metabolized rapidly enough, The drug binds irreversibly to the enzyme, The drug is excreted too slowly, The drug is not absorbed properly`,
  `question: What is the preferred specimen for CHE analysis?
Serum, Heparinized plasma, Urine, Whole blood`,
  `question: Which isoenzyme of CK is primarily found in neuronal tissue and its elevation can be a tumor-associated marker?
CK-BB, CK-MM, CK-MB, CK-mt`
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