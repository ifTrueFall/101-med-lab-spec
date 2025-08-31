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
  `question: Describe the role and function of fibrinogen in the coagulation and the fibrinolytic system. Page 273. What is the principal substrate of the coagulation and fibrinolytic systems?
Fibrinogen, Thrombin, Plasmin, Factor XIII`,
  `question: Describe the role and function of fibrinogen in the coagulation and the fibrinolytic system. Page 273. What is the normal reference range for fibrinogen in plasma?
200-400 mg/dL, 100-200 mg/dL, 400-600 mg/dL, <100 mg/dL`,
  `question: Describe the role and function of fibrinogen in the coagulation and the fibrinolytic system. Page 273. The primary function of fibrinogen is to be converted into what insoluble substance to stabilize a blood clot?
Fibrin, Plasmin, Thrombin, Collagen`,
  `question: Describe the role and function of fibrinogen in the coagulation and the fibrinolytic system. Page 273. What enzyme acts on fibrinogen to remove fibrinopeptides A and B creating fibrin monomers?
Thrombin, Plasmin, Factor XIIIa, tPA`,
  `question: Describe the role and function of fibrinogen in the coagulation and the fibrinolytic system. Page 273. After fibrin monomers polymerize what factor stabilizes the polymer with covalent bond cross-links?
Factor XIII, Factor V, Factor VIII, Factor X`,
  `question: Identify the disorders of fibrinogen. Page 274. During inflammation pregnancy and stress fibrinogen acts as an acute phase reactant and its levels will do what?
Increase, Decrease, Remain unchanged, Fluctuate`,
  `question: Identify the disorders of fibrinogen. Page 274. Acquired decreases in fibrinogen can be caused by acute liver disease acute renal disease or what other condition?
Disseminated intravascular coagulation (DIC), Pregnancy, Diabetes, Hepatitis`,
  `question: Identify the disorders of fibrinogen. Page 274. What is the name of the inherited autosomal recessive disorder characterized by less than 10 mg/dL of fibrinogen in the plasma?
Afibrinogenemia, Hypofibrinogenemia, Dysfibrinogenemia, Hyperfibrinogenemia`,
  `question: Identify the disorders of fibrinogen. Page 274. Umbilical bleeding and poor wound healing are symptoms associated with which inherited fibrinogen disorder?
Afibrinogenemia, Dysfibrinogenemia, Hypofibrinogenemia, Factor XIII deficiency`,
  `question: Identify the disorders of fibrinogen. Page 274. In a patient with afibrinogenemia what are the expected results for PT PTT and thrombin time?
Increased, Decreased, Normal, Variable`,
  `question: Identify the disorders of fibrinogen. Page 274. What is the name of the heterozygous form of afibrinogenemia where fibrinogen levels are between 20-100 mg/dL?
Hypofibrinogenemia, Afibrinogenemia, Dysfibrinogenemia, Parafibrinogenemia`,
  `question: Identify the disorders of fibrinogen. Page 275. Which inherited fibrinogen disorder is a qualitative defect where the fibrinogen molecule does not function properly?
Dysfibrinogenemia, Afibrinogenemia, Hypofibrinogenemia, Cryofibrinogenemia`,
  `question: Identify the disorders of fibrinogen. Page 275. In dysfibrinogenemia the quantitative fibrinogen assay is abnormal but which other assay for fibrinogen is typically normal?
Immunologic assay, Functional assay, Clot-based assay, Chromogenic assay`,
  `question: Differentiate the role of thrombin in both the coagulation and fibrinolytic systems. Page 276. In addition to converting fibrinogen to fibrin thrombin also participates in platelet aggregation and what other platelet function?
Platelet release reaction, Platelet adhesion, Platelet production, Platelet inhibition`,
  `question: Differentiate the role of thrombin in both the coagulation and fibrinolytic systems. Page 276. Thrombin provides positive feedback in the coagulation cascade by activating which two factors?
Factor V and Factor VIII, Factor IX and Factor X, Factor XI and Factor XII, Factor II and Factor VII`,
  `question: Differentiate the role of thrombin in both the coagulation and fibrinolytic systems. Page 276. Thrombin provides negative feedback to the coagulation system by activating which naturally occurring inhibitor?
Protein C, Antithrombin, TFPI, Alpha-2-antiplasmin`,
  `question: Differentiate the role of thrombin in both the coagulation and fibrinolytic systems. Page 276. In the fibrinolytic system thrombin plays a key role in negative feedback by converting plasminogen to what?
Plasmin, Fibrin, Fibrinogen, D-dimer`,
  `question: Differentiate the role of thrombin in both the coagulation and fibrinolytic systems. Page 276. Once a clot is dissolved thrombin promotes wound healing and what other process?
Tissue repair, Inflammation, Vasodilation, Angiogenesis`,
  `question: Describe the function and components of the fibrinolytic system. Page 277. What is the primary function of the fibrinolytic system?
Dissolution of fibrin clots, Formation of fibrin clots, Platelet aggregation, Vasoconstriction`,
  `question: Describe the function and components of the fibrinolytic system. Page 277. What is the name of the inactive plasma enzyme synthesized in the liver that is the precursor to plasmin?
Plasminogen, Fibrinogen, Prothrombin, Kallikrein`,
  `question: Describe the function and components of the fibrinolytic system. Page 277. What substance is released from damaged endothelial cells and helps convert plasminogen to plasmin?
Tissue Plasminogen activator (tPA), Urokinase, Factor XIIa, Kallikrein`,
  `question: Describe the function and components of the fibrinolytic system. Page 277. As a pharmaceutical product tPA is often used to treat patients experiencing what medical event?
Stroke episodes, Hemorrhage, Sepsis, Anaphylaxis`,
  `question: Describe the function and components of the fibrinolytic system. Page 277. Factor XIIa Kallikrein and HMWK are part of the contact group and can serve as activators for what?
Plasminogen, Fibrinogen, Prothrombin, Platelets`,
  `question: Describe the function and components of the fibrinolytic system. Page 278. Which inhibitor suppresses the function of tPA?
Plasminogen activator inhibitor 1 (PAI-1), Alpha-2 antiplasmin, C1 inactivator, a2-macroglobulin`,
  `question: Describe the function and components of the fibrinolytic system. Page 278. What is considered the most important inhibitor of the fibrinolytic system as it prevents plasmin from binding to fibrin?
Alpha-2 antiplasmin, Plasminogen activator inhibitor 1 (PAI-1), a1-antitrypsin, Antithrombin`,
  `question: Describe the laboratory tests for measurable product of fibrinolysis. Page 279. The breakdown of a fibrin clot by plasmin results in the creation of what measurable by-products?
Fibrin split/degradation products, Fibrin monomers, Prothrombin fragments, Platelet microparticles`,
  `question: Describe the laboratory tests for measurable product of fibrinolysis. Page 279. Fragments X Y D and E are all examples of what?
Fibrin degradation products, Coagulation factors, Platelet granules, Plasma proteins`,
  `question: Describe the laboratory tests for measurable product of fibrinolysis. Page 279. What is the specific name for the by-product that indicates the breakdown of a cross-linked stabilized fibrin clot?
D-Dimers, Fragment X, Fragment Y, Fibrinopeptide A`,
  `question: Describe the laboratory tests for measurable product of fibrinolysis. Page 279. D-dimers are by-products that contain the covalent bond created by which factor?
Factor XIII, Factor V, Factor VIII, Factor Xa`,
  `question: Describe the laboratory tests for measurable product of fibrinolysis. Page 280. What does an increased D-dimer level in the plasma indicate?
Excessive clotting, Excessive bleeding, Liver disease, Platelet dysfunction`,
  `question: Describe the laboratory tests for measurable product of fibrinolysis. Page 280. The D-dimer assay is a useful test to help assess for thromboembolic episodes such as deep vein thrombosis and what other condition?
Pulmonary embolism, Myocardial infarction, Stroke, Sepsis`,
  `question: Describe the laboratory tests for measurable product of fibrinolysis. Page 280. Which laboratory test measures the degradation of cross-linked fibrin only?
D-dimer test, FDPs test, Prothrombin time, Thrombin time`,
  `question: Describe Disseminated Intravascular Coagulation (DIC) and its potential causes. Page 281. What is the condition where the hemostatic system becomes unbalanced leading to hyperactivation of both coagulation and fibrinolysis?
Disseminated Intravascular Coagulation (DIC), Hemophilia, von Willebrand Disease, Thrombotic Thrombocytopenic Purpura (TTP)`,
  `question: Describe Disseminated Intravascular Coagulation (DIC) and its potential causes. Page 281. An imbalance in the hemostatic system during DIC can lead to excessive hemorrhage or the excessive creation of what?
Thrombi, Platelets, Red blood cells, Antibodies`,
  `question: Describe Disseminated Intravascular Coagulation (DIC) and its potential causes. Page 281. Which of the following is a potential cause of DIC?
Infections (Sepsis), Aspirin use, Vitamin K deficiency, Factor V Leiden`,
  `question: Describe Disseminated Intravascular Coagulation (DIC) and its potential causes. Page 281. Tissue injury from trauma malignancies like leukemia and what other condition are common causes of DIC?
Obstetrical complications, Autoimmune disorders, Genetic mutations, Nutritional deficiencies`,
  `question: Describe the symptoms laboratory results and management of patients with DIC. Page 281. Extensive skin and mucous membrane bleeding such as ecchymosis and epistaxis are common symptoms of what condition?
DIC, Anemia, Thrombocytosis, Polycythemia`,
  `question: Describe the symptoms laboratory results and management of patients with DIC. Page 281. Patients with DIC may develop a microangiopathic hemolytic anemia due to the disposition of what in the small vessels?
Microthrombi, Immune complexes, Cholesterol plaques, Sickled red cells`,
  `question: Describe the symptoms laboratory results and management of patients with DIC. Page 282. What characteristic red blood cell morphology is observed on the peripheral smear of a patient with DIC?
Schistocytes, Spherocytes, Target cells, Sickle cells`,
  `question: Describe the symptoms laboratory results and management of patients with DIC. Page 282. In a patient with DIC what would be the expected result for the PT and APTT?
Increased, Decreased, Normal, Unmeasurable`,
  `question: Describe the symptoms laboratory results and management of patients with DIC. Page 282. What would be the expected result for the fibrinogen level in a patient with DIC?
Decreased, Increased, Normal, Highly variable`,
  `question: Describe the symptoms laboratory results and management of patients with DIC. Page 282. What would be the expected result for the platelet count in a patient with DIC?
Decreased, Increased, Normal, Fluctuating`,
  `question: Describe the symptoms laboratory results and management of patients with DIC. Page 282. What would be the expected result for the D-Dimer test in a patient with DIC?
Increased, Decreased, Normal, Negative`,
  `question: Describe the symptoms laboratory results and management of patients with DIC. Page 282. What is the most critical first step in the management and treatment of a patient with DIC?
Resolve the cause, Administer heparin, Transfuse platelets, Give FFP`,
  `question: Describe the symptoms laboratory results and management of patients with DIC. Page 282. What blood product is given to patients with DIC as a source of all the clotting factors?
FFP, pRBCs, Cryoprecipitate, Whole Blood`,
  `question: Describe the symptoms laboratory results and management of patients with DIC. Page 282. What blood product is given to DIC patients to restore oxygen-carrying capacity?
pRBCs, FFP, Platelet concentrates, Albumin`,
  `question: Describe the symptoms laboratory results and management of patients with DIC. Page 282. What medication has been used in DIC cases when combined with antithrombin?
Heparin, Warfarin, Aspirin, tPA`,
  `question: Describe the role and function of fibrinogen in the coagulation and the fibrinolytic system. Page 273. Fibrinogen is considered what type of protein that increases during inflammation?
Acute phase reactant, Structural protein, Enzyme, Transport protein`,
  `question: Identify the disorders of fibrinogen. Page 274. In afibrinogenemia what is the expected result for the bleeding time (BT)?
Elongated, Normal, Shortened, Undetectable`,
  `question: Differentiate the role of thrombin in both the coagulation and fibrinolytic systems. Page 276. Thrombin stimulates the production of what platelet inhibitor?
Prostacyclin, Thromboxane A2, ADP, Serotonin`,
  `question: Describe the function and components of the fibrinolytic system. Page 277. Urokinase is a plasminogen activator that is secreted by which organs?
Kidneys, Liver, Lungs, Spleen`,
  `question: Describe Disseminated Intravascular Coagulation (DIC) and its potential causes. Page 281. Toxins from what source can be a cause of DIC?
Snake bites, Bacterial endotoxins, Environmental pollutants, Heavy metals`,
  `question: Describe the laboratory tests for measurable product of fibrinolysis. Page 280. What is the normal reference value for a D-dimer test?
<0.5 µg/ml, 1.0-2.0 µg/ml, >2.0 µg/ml, 0.5-1.0 µg/ml`,
  `question: Describe the function and components of the fibrinolytic system. Page 278. PAI-1 is secreted by what cells during injury?
Endothelial cells, Platelets, White blood cells, Liver cells`,
  `question: Describe the symptoms laboratory results and management of patients with DIC. Page 281. What is the term for a symptom of DIC where there is bluish discoloration of the extremities?
Acrocyanosis, Jaundice, Pallor, Erythema`,
  `question: Describe the role and function of fibrinogen in the coagulation and the fibrinolytic system. Page 273. After forming fibrin polymers what type of bonds initially hold them together before stabilization?
Hydrogen bonds, Covalent bonds, Ionic bonds, Peptide bonds`,
  `question: Identify the disorders of fibrinogen. Page 275. What is the inheritance pattern for dysfibrinogenemia?
Autosomal dominant, Autosomal recessive, X-linked, Mitochondrial`,
  `question: Describe the laboratory tests for measurable product of fibrinolysis. Page 280. Immunoturbidity and chemiluminescence are test methods for which assay?
D-dimer test, Prothrombin time, Fibrinogen level, Platelet count`,
  `question: Differentiate the role of thrombin in both the coagulation and fibrinolytic systems. Page 276. In coagulation thrombin converts fibrinogen to fibrin and in fibrinolysis it converts plasminogen to what?
Plasmin, Activated protein C, Fibrin peptides, D-dimer`,
  `question: Describe the symptoms laboratory results and management of patients with DIC. Page 282. In the case of septicemia what treatment may help resolve the underlying cause of DIC?
Widespread use of antibiotics, Surgery, Antiviral therapy, Chemotherapy`
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