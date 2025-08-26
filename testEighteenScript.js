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
  `question: Describe the basic function of hemostasis. Page 242. What is the name of the process by which the body controls bleeding and maintains blood in a fluid form?
Hemostasis, Fibrinolysis, Coagulation, Aggregation`,
  `question: Identify the difference between primary and secondary hemostasis. Page 242. Primary hemostasis is activated by damage to what type of vessel?
Small vessel, Large artery, Major vein, Capillary bed`,
  `question: Identify the difference between primary and secondary hemostasis. Page 242. Secondary hemostasis is activated by major trauma surgery or what else?
Hemorrhage, Minor cuts, Bruising, Inflammation`,
  `question: Identify the difference between primary and secondary hemostasis. Page 242. The vascular system and platelets are the two minor systems that make up what?
Primary hemostasis, Secondary hemostasis, The fibrinolytic system, The coagulation cascade`,
  `question: Identify the difference between primary and secondary hemostasis. Page 242. The clotting factor system and the fibrinolytic system are the two minor systems that make up what?
Secondary hemostasis, Primary hemostasis, Platelet activation, Vasoconstriction`,
  `question: Identify the difference between primary and secondary hemostasis. Page 242. What is the primary function of the fibrinolytic system?
Dissolution of the clot, Formation of the clot, Platelet adhesion, Vasoconstriction`,
  `question: Describe the interaction of the vascular system and platelets. Page 243. What is the initial response of the vascular system to control blood loss from a damaged vessel?
Vasoconstriction, Vasodilation, Platelet aggregation, Fibrin formation`,
  `question: Describe the interaction of the vascular system and platelets. Page 243. Damage to a blood vessel exposes which substance in the fibrous tissue that then reacts with platelets?
Collagen, Elastin, Fibrinogen, Thrombin`,
  `question: Describe the interaction of the vascular system and platelets. Page 243. The interaction between exposed collagen and platelets is mediated by which factor?
von Willebrand factor, Factor V, Factor VIII, Tissue factor`,
  `question: Describe the role of platelets in hemostasis. Page 243. What is the normal lifespan of a platelet in blood circulation?
7-10 days, 2-3 days, 24 hours, 120 days`,
  `question: Describe the role of platelets in hemostasis. Page 243. What is the normal reference range for platelets in blood circulation?
150-450x10^9/L, 50-100x10^9/L, 500-1000x10^9/L, 4.5-5.5x10^12/L`,
  `question: Describe the role of platelets in hemostasis. Page 244. What is the first phase of platelet function when a vessel is damaged?
Adhesion, Aggregation, Secretion, Shape Change`,
  `question: Describe the role of platelets in hemostasis. Page 244. Platelet adhesion to collagen is enabled by von Willebrand Factor and what glycoprotein on the platelet surface?
GpIb, GpIIb/IIIa, Fibrinogen, Thrombin`,
  `question: Describe the role of platelets in hemostasis. Page 244. During activation platelets change from discs to spiny spheres in what phase of function?
Shape Change, Adhesion, Aggregation, Amplification`,
  `question: Describe the role of platelets in hemostasis. Page 244. ADP serotonin and calcium are released from which type of platelet granules?
Dense granules, Alpha granules, Mitochondria, Lysosomes`,
  `question: Describe the role of platelets in hemostasis. Page 244. What is the final phase of platelet function where platelets adhere to one another to form the primary plug?
Aggregation, Adhesion, Amplification, Secretion`,
  `question: Describe the role of platelets in hemostasis. Page 244. Platelet aggregation is enabled by fibrinogen binding to what glycoprotein complex on separate platelets?
GpIIb/IIIa, GpIb, von Willebrand Factor, Thromboxane A2`,
  `question: Describe the coagulation factors their common names and functions. Page 245. With the exception of Factor XIII most coagulation factors are what type of enzymes?
Serine proteases, Transglutaminases, Kinases, Phosphatases`,
  `question: Describe the coagulation factors their common names and functions. Page 245. Factors that accelerate enzyme activity such as Factor V and Factor VIII are classified as what?
Cofactors, Substrates, Enzymes, Inhibitors`,
  `question: Describe the coagulation factors their common names and functions. Page 246. What is the common name for Coagulation Factor I?
Fibrinogen, Prothrombin, Tissue factor, Calcium`,
  `question: Describe the coagulation factors their common names and functions. Page 246. What is the common name for Coagulation Factor II?
Prothrombin, Fibrinogen, Labile factor, Stable factor`,
  `question: Describe the coagulation factors their common names and functions. Page 246. What is the common name for Coagulation Factor III?
Tissue factor, Calcium, Proaccelerin, Proconvertin`,
  `question: Describe the coagulation factors their common names and functions. Page 246. What is the common name for Coagulation Factor IV?
Calcium, Fibrinogen, Prothrombin, Tissue factor`,
  `question: Describe the coagulation factors their common names and functions. Page 247. A deficiency in Factor VIII also known as Antihemophilic Factor causes what disorder?
Hemophilia A, Hemophilia B, von Willebrand Disease, Christmas disease`,
  `question: Describe the coagulation factors their common names and functions. Page 247. A deficiency in Factor IX also known as Christmas factor causes what disorder?
Hemophilia B, Hemophilia A, Factor V Leiden, Prothrombin deficiency`,
  `question: Describe the coagulation factors their common names and functions. Page 248. Which factor is known as the Fibrin Stabilizing Factor?
Factor XIII, Factor X, Factor XI, Factor XII`,
  `question: Describe the coagulation factors their common names and functions. Page 248. Factors II VII IX and X belong to which group and are dependent on Vitamin K?
Prothrombin Group, Fibrinogen Group, Contact Group, Labile Group`,
  `question: Describe the coagulation factors their common names and functions. Page 248. Factors I V VIII and XIII belong to which group?
Fibrinogen Group, Prothrombin Group, Contact Group, Stable Group`,
  `question: Describe the coagulation factors their common names and functions. Page 248. Factors XI XII Prekallikrein and HMWK belong to which group?
Contact Group, Prothrombin Group, Fibrinogen Group, Vitamin K Dependent Group`,
  `question: Describe the coagulation factors their common names and functions. Page 247. Which numbered coagulation factor is considered non-existent?
Factor VI, Factor III, Factor IV, Factor XV`,
  `question: Describe the intrinsic extrinsic and common pathways the factors involved in each and their role in the coagulation system. Page 249. Which coagulation pathway is activated by contact factors found within the circulating blood?
Intrinsic pathway, Extrinsic pathway, Common pathway, Fibrinolytic pathway`,
  `question: Describe the intrinsic extrinsic and common pathways the factors involved in each and their role in the coagulation system. Page 249. Factors XII XI IX and VIII are all involved in which pathway?
Intrinsic pathway, Extrinsic pathway, Common pathway, Final pathway`,
  `question: Describe the intrinsic extrinsic and common pathways the factors involved in each and their role in the coagulation system. Page 249. Which coagulation pathway is activated by Tissue Factor (Factor III) released from damaged cells?
Extrinsic pathway, Intrinsic pathway, Common pathway, Contact pathway`,
  `question: Describe the intrinsic extrinsic and common pathways the factors involved in each and their role in the coagulation system. Page 249. Factors III and VII are the primary factors involved in which pathway?
Extrinsic pathway, Intrinsic pathway, Common pathway, Feedback pathway`,
  `question: Describe the intrinsic extrinsic and common pathways the factors involved in each and their role in the coagulation system. Page 250. Factors X V II and I are all part of which pathway?
Common pathway, Intrinsic pathway, Extrinsic pathway, Tissue factor pathway`,
  `question: Describe the intrinsic extrinsic and common pathways the factors involved in each and their role in the coagulation system. Page 250. The activation of which factor marks the beginning of the common pathway?
Factor X, Factor V, Factor II, Factor I`,
  `question: Describe the intrinsic extrinsic and common pathways the factors involved in each and their role in the coagulation system. Page 250. What is the active form of Factor II that cleaves Fibrinogen to produce fibrin?
Thrombin, Prothrombin, Fibrin, Plasmin`,
  `question: Describe the intrinsic extrinsic and common pathways the factors involved in each and their role in the coagulation system. Page 250. Thrombin activates which factor to crosslink and form a stabilized fibrin clot?
Factor XIII, Factor V, Factor VIII, Factor XI`,
  `question: Identify the inhibitors and their role in hemostasis. Page 250. What is the general function of naturally occurring coagulation inhibitors?
Block activated coagulation factors, Promote clot formation, Activate platelets, Dissolve fibrin`,
  `question: Identify the inhibitors and their role in hemostasis. Page 251. Which major regulatory inhibitor inactivates thrombin and other serine proteases like IXa Xa and XIa?
Antithrombin, Protein C, Protein S, TFPI`,
  `question: Identify the inhibitors and their role in hemostasis. Page 251. Which two Vitamin K dependent inhibitors work together to inactivate factors V and VIII?
Protein C/Protein S, Antithrombin/Heparin, TFPI/Factor Xa, Plasmin/Antiplasmin`,
  `question: Identify the inhibitors and their role in hemostasis. Page 251. The fibrinolytic system is responsible for dissolving blood clots. What is its main enzyme?
Plasmin, Plasminogen, Thrombin, Fibrinogen`,
  `question: Identify the inhibitors and their role in hemostasis. Page 251. Plasmin breaks down a fibrin clot into what products?
Fibrin split products, Fibrin monomers, D-dimers, Fibrinogen`,
  `question: Identify the inhibitors and their role in hemostasis. Page 251. Which protein produced by endothelial cells activates the conversion of plasminogen to plasmin?
Tissue plasminogen activator (tPA), Plasminogen activator inhibitor (PAI), Alpha-2-antiplasmin, Urokinase`,
  `question: Identify the inhibitors and their role in hemostasis. Page 251. What is the primary inhibitor of plasmin?
Alpha-2-antiplasmin, Plasminogen activator inhibitor (PAI), Antithrombin, Protein C`,
  `question: Correlate the relationship between the prothrombin time activated partial thromboplastin time and factor assays. Page 252. The Prothrombin Time (PT) test is used to measure the integrity of which coagulation pathway?
Extrinsic pathway, Intrinsic pathway, Fibrinolytic pathway, Contact pathway`,
  `question: Correlate the relationship between the prothrombin time activated partial thromboplastin time and factor assays. Page 252. The PT test is most sensitive to early changes in which coagulation factor?
Factor VII, Factor VIII, Factor IX, Factor XI`,
  `question: Correlate the relationship between the prothrombin time activated partial thromboplastin time and factor assays. Page 252. The PT test is commonly used to monitor which oral anticoagulant therapy?
Warfarin/Coumadin, Heparin, Aspirin, Plavix`,
  `question: Correlate the relationship between the prothrombin time activated partial thromboplastin time and factor assays. Page 252. The Activated Partial Thromboplastin Time (aPTT) test is used to measure which coagulation pathway?
Intrinsic pathway, Extrinsic pathway, Final common pathway, Platelet pathway`,
  `question: Correlate the relationship between the prothrombin time activated partial thromboplastin time and factor assays. Page 252. The aPTT test is most sensitive to abnormalities in factors VIII IX XI and what other factor?
XII, VII, V, X`,
  `question: Correlate the relationship between the prothrombin time activated partial thromboplastin time and factor assays. Page 252. The aPTT test is commonly used to monitor which inpatient anticoagulant therapy?
Heparin, Warfarin, Coumadin, Lovenox`,
  `question: Correlate the relationship between the prothrombin time activated partial thromboplastin time and factor assays. Page 252. What type of test is used to assess the specific percent activity of a single clotting factor?
Factor assays, Prothrombin Time, Activated Partial Thromboplastin Time, Thrombin Time`,
  `question: Correlate the relationship between the prothrombin time activated partial thromboplastin time and factor assays. Page 253. An abnormal PT with a normal PTT suggests a possible deficiency in which factor?
VII, VIII, IX, X`,
  `question: Correlate the relationship between the prothrombin time activated partial thromboplastin time and factor assays. Page 253. A normal PT with an abnormal PTT suggests a possible deficiency in which group of factors?
XII XI IX VIII, X V II I, VII, III`,
  `question: Correlate the relationship between the prothrombin time activated partial thromboplastin time and factor assays. Page 253. An abnormal PT and an abnormal PTT suggest a possible deficiency in which group of factors?
X V II I, XII XI IX VIII, VII, III`,
  `question: Describe the role of platelets in hemostasis. Page 244. The amplification phase of platelet function involves secreted substances like Thromboxane A2 that do what?
Recruit more platelets, Inhibit platelet function, Dissolve the clot, Stabilize fibrin`,
  `question: Describe the coagulation factors their common names and functions. Page 246. Which factor produced in the liver is a Vitamin K dependent protein?
Factor II, Factor I, Factor V, Factor VIII`,
  `question: Describe the intrinsic extrinsic and common pathways the factors involved in each and their role in the coagulation system. Page 249. Which pathway is quantitatively more significant and provides a larger burst of thrombin generation?
Intrinsic pathway, Extrinsic pathway, Common pathway, Fibrinolytic pathway`,
  `question: Identify the inhibitors and their role in hemostasis. Page 251. Which inhibitor binds to Protein S reducing its availability to act as a cofactor for Protein C?
C4b binding protein, Antithrombin, TFPI, Alpha-2-antiplasmin`,
  `question: Describe the role of platelets in hemostasis. Page 243. Platelets contain dense granules and what other type of granules?
Alpha granules, Beta granules, Gamma granules, Delta granules`
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