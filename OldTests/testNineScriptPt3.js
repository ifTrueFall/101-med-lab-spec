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
  `question: What family of proteins does a1-Acid Glycoprotein belong to?
Lipocalin family, Serpin family, Albumin family, Globulin family`,
  `question: Where is a1-Acid Glycoprotein primarily synthesized?
Liver, Kidneys, Spleen, Pancreas`,
  `question: What is the approximate molecular size of a1-Acid Glycoprotein?
40kDa, 60kDa, 20kDa, 100kDa`,
  `question: Approximately what percentage of a1-Acid Glycoprotein is carbohydrate?
45 percent, 12 percent, 30 percent, 60 percent`,
  `question: What is the approximate half-life of a1-Acid Glycoprotein?
3 days, 1 day, 7 days, 10 days`,
  `question: How is a1-Acid Glycoprotein cleared from the body?
Hepatic asialoglycoprotein receptors, Renal filtration, Biliary excretion, Phagocytosis by macrophages`,
  `question: Which of these substances does a1-Acid Glycoprotein bind?
Progesterone, Thyroxine, Insulin, Glucose`,
  `question: Which basic drug is mentioned as binding to a1-Acid Glycoprotein?
Propranolol, Penicillin, Aspirin, Metformin`,
  `question: How can a1-Acid Glycoprotein binding to drugs affect their bioavailability?
Reduce bioavailability, Increase bioavailability, No effect on bioavailability, Enhance absorption`,
  `question: When measuring certain drug levels why might AAG measurement also be required?
Because AAG binding affects free drug concentration, Because AAG enhances drug efficacy, Because AAG indicates drug toxicity, Because AAG is a drug metabolite`,
  `question: As an Acute Phase Reactant APR levels of a1-Acid Glycoprotein will increase with what condition?
GI inflammatory disease, Liver failure, Kidney disease, Viral infections`,
  `question: Which of these can cause increased levels of a1-Acid Glycoprotein?
Corticosteroids, Beta-blockers, Diuretics, Antihistamines`,
  `question: What condition can lead to decreased levels of a1-Acid Glycoprotein?
Protein losing syndromes, Acute infection, Dehydration, High protein diet`,
  `question: What effect do higher estrogen levels have on a1-Acid Glycoprotein synthesis?
Decrease synthesis, Increase synthesis, No effect on synthesis, Inhibit clearance`,
  `question: Why does a1-Acid Glycoprotein not stain well with normal protein stains?
High carbohydrate content, Low protein content, High lipid content, Small molecular size`,
  `question: What type of stain must be used for a1-Acid Glycoprotein analysis requiring staining?
Acid-Schiff stain, Coomassie blue stain, Gram stain, Wright stain`,
  `question: What immunochemical methods are commonly used to analyze a1-Acid Glycoprotein?
Turbidimetry or nephelometry, ELISA or RIA, Western blot or chromatography, Electrophoresis or spectrophotometry`,
  `question: To what group of proteins does a1-Antitrypsin AAT belong?
Serpin, Lipocalin, Fibrinogen, Albumin`,
  `question: What is the primary site of synthesis for a1-Antitrypsin?
Liver, Lungs, Bone marrow, Spleen`,
  `question: What is the main function of a1-Antitrypsin AAT?
Inhibit leukocyte elastase, Transport lipids, Bind hemoglobin, Clot blood`,
  `question: Deficiency in AAT can lead to damage of elastin in which organ?
Lungs, Liver, Kidneys, Heart`,
  `question: Unchecked leukocyte elastase activity due to AAT deficiency can develop into what irreversible condition?
Emphysema, Cirrhosis, Nephritis, Arthritis`,
  `question: How many genetic variations of a1-Antitrypsin are mentioned?
More than 70, Exactly 50, Less than 20, Around 100`,
  `question: What can cause an increase in a1-Antitrypsin levels besides being an APR?
Estrogen level elevations, Androgen level elevations, Low protein intake, Vigorous exercise`,
  `question: Which condition can be associated with decreased levels of AAT?
Neonatal respiratory distress syndrome, Hypertension, Diabetes mellitus, Hyperthyroidism`,
  `question: Individuals with genetic variations causing low AAT levels are at risk for what specific lung condition?
Basilar pulmonary emphysema, Lobar pneumonia, Bronchial asthma, Pulmonary fibrosis`,
  `question: At what age range can the emphysema associated with AAT deficiency begin?
20 to 40 years old, 50 to 60 years old, Over 65 years old, Under 10 years old`,
  `question: What effect does smoking cessation have on emphysema caused by AAT deficiency?
Will not prevent or cure it, Completely cures it, Significantly slows progression, Prevents its onset`,
  `question: Genetic variations of AAT are also associated with which liver condition?
Neonatal cholestasis, Fatty liver disease, Hepatitis A, Gilbert syndrome`,
  `question: Testing of AAT is recommended for patients with onset or family history of COPD before what age?
Age 45, Age 55, Age 65, Age 35`,
  `question: What methods are usually used for measuring a1-Antitrypsin?
Immunoturbidimetry or immunonephelometry, Spectrophotometry or colorimetry, Chromatography or mass spectrometry, Manual titration or precipitation`,
  `question: On routine electrophoresis a1-Antitrypsin is the major constituent of which band?
a1 globulin band, a2 globulin band, Beta globulin band, Gamma globulin band`,
  `question: What does a decrease in the a1 band on electrophoresis suggest?
Problems with AAT, Problems with haptoglobin, Problems with albumin, Problems with immunoglobulins`,
  `question: What type of molecule is Haptoglobin Hp?
a2-glycoprotein, a1-glycoprotein, Beta-lipoprotein, Gamma-globulin`,
  `question: What substance does Haptoglobin bind to almost immediately?
Free hemoglobin, Free iron, Bilirubin, Myoglobin`,
  `question: Where is Haptoglobin synthesized?
Liver, Spleen, Bone marrow, Kidneys`,
  `question: How does binding of Haptoglobin to Hemoglobin affect renal clearance of hemoglobin?
Prevents renal clearance of hemoglobin, Enhances renal clearance of hemoglobin, No effect on renal clearance, Slows renal clearance slightly`,
  `question: Binding of Haptoglobin to Hemoglobin prevents hemoglobin from exerting toxic effects on what part of the kidneys?
Tubules, Glomeruli, Pelvis, Medulla`,
  `question: Regulation of free Hb by haptoglobin protects what molecule in the blood stream?
Nitric oxide, Carbon dioxide, Oxygen, Glucose`,
  `question: Where are Hp Hb complexes rapidly bound and removed from circulation?
Reticuloendothelial cells in spleen and liver, Kidneys and bladder, Lungs and alveoli, Brain and cerebrospinal fluid`,
  `question: How is Haptoglobin classified as an Acute Phase Reactant APR?
Weak and late reacting, Strong and early reacting, Moderate and intermediate reacting, Not an APR`,
  `question: Which hormone can increase Haptoglobin concentrations?
Cortisol, Insulin, Glucagon, Parathyroid hormone`,
  `question: Which type of drugs can increase Haptoglobin concentrations?
Nonsteroidal anti-inflammatory drugs NSAIDs, Antibiotics, Antiviral drugs, Antifungal drugs`,
  `question: What happens to Haptoglobin levels during intravascular hemolysis?
Drop severely, Increase significantly, Remain unchanged, Fluctuate unpredictably`,
  `question: Can measurement of Haptoglobin distinguish between in vivo and in vitro hemolysis?
Yes in vitro hemolysis does not decrease Hp, No it cannot distinguish, Only in severe cases, Only if measured within an hour`,
  `question: What is the effect of most forms of liver disease on haptoglobin levels?
Decreases in haptoglobin levels, Increases in haptoglobin levels, No change in haptoglobin levels, Highly variable effects`,
  `question: What are the typical haptoglobin levels in neonates?
Very low, Very high, Normal adult levels, Undetectable`,
  `question: What are the typical assay methods for haptoglobin?
Immunoturbidimetry and immunonephelometry, Electrophoresis and densitometry, Radioimmunoassay and ELISA, Spectrophotometry and chromatography`,
  `question: Haptoglobin and what other protein make up the majority of the a2 globulin band on serum electrophoresis?
a2-macroglobulin, a1-antitrypsin, Transferrin, Ceruloplasmin`,
  `question: Under what condition might Haptoglobin NOT be a portion of the a2 region on electrophoresis?
In vivo hemolysis, Dehydration, High protein diet, Acute infection`,
  `question: What percentage of sialic acid is a1-Acid Glycoprotein composed of?
About 12 percent, About 45 percent, About 5 percent, About 25 percent`,
  `question: Which of the following is a function of a1-Acid Glycoprotein AAG?
Binds basic drugs, Inhibits proteases, Transports oxygen, Involved in clotting`,
  `question: Malignant neoplasms can cause what change in a1-Acid Glycoprotein levels?
Increase, Decrease, No change, Fluctuation`,
  `question: What is the primary role of leukocyte elastase that AAT inhibits?
Break down elastin, Synthesize collagen, Transport oxygen, Digest bacteria`,
  `question: Liver disease patients with AAT variants have an increased risk of developing what?
Hepatocellular carcinoma HCC, Gallstones, Pancreatitis, Hepatitis B`,
  `question: Each aB pair in haptoglobin binds to what from hemoglobin?
An aB dimer, A heme group, A globin chain, An iron atom`,
  `question: Free hemoglobin can reduce the availability of nitric oxide potentially contributing to what?
Pulmonary hypertension, Systemic hypotension, Anemia, Polycythemia`,
  `question: An increase in Haptoglobin can be seen with which inflammatory disease?
Ulcerative colitis, Osteoarthritis, Asthma, Eczema`,
  `question: Haptoglobin levels are typically low in which group of individuals apart from neonates?
Pregnant women, Elderly men, Athletes, Vegetarians`,
  `question: What is the structural composition of Haptoglobin subunits?
Equal number of a and B subunits, More a subunits than B, More B subunits than a, Only a subunits`
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