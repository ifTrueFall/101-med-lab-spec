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
  `question: Describe terms associated with thrombosis. Page 285. What is the term for inherited and acquired conditions that predispose an individual to thrombosis?
Thrombophilia, Hemophilia, Thrombocytopenia, Anemia`,
  `question: Describe terms associated with thrombosis. Page 285. What is the term for the formation of a blood clot within the vasculature?
Thrombosis, Fibrinolysis, Hemostasis, Aggregation`,
  `question: Describe terms associated with thrombosis. Page 285. An arterial thrombosis which is primarily composed of platelets RBCs and WBCs is also known as what?
White clot, Red clot, Mixed clot, Fibrin clot`,
  `question: Describe terms associated with thrombosis. Page 285. Venous thrombosis is primarily composed of RBCs and what other substance?
Fibrin, Platelets, WBCs, Collagen`,
  `question: Describe terms associated with thrombosis. Page 285. Hypertension atherosclerosis and hyperviscosity are all potential causes of what type of thrombosis?
Arterial thrombosis, Venous thrombosis, Deep Vein Thrombosis, Pulmonary Embolism`,
  `question: Describe terms associated with thrombosis. Page 285. Slow blood flow and an impaired fibrinolytic system are potential causes of what type of thrombosis?
Venous thrombosis, Arterial thrombosis, White clot, Septic thrombosis`,
  `question: Describe terms associated with thrombosis. Page 285. Deep Vein Thrombosis (DVT) and Pulmonary Embolism (PE) are examples of what type of thrombosis?
Venous thrombosis, Arterial thrombosis, Microvascular thrombosis, Capillary thrombosis`,
  `question: Describe the pathophysiology of thrombosis. Page 285. Any damage to which type of cells can cause platelet activation and trigger the coagulation cascade?
Endothelial cells, Red blood cells, Smooth muscle cells, Fibroblasts`,
  `question: Describe the pathophysiology of thrombosis. Page 285. A decrease in which physiological process can result in both arterial and venous thrombosis?
Fibrinolysis, Coagulation, Platelet adhesion, Vasoconstriction`,
  `question: Describe the pathophysiology of thrombosis. Page 285. A lack or deficiency of what allows the coagulation cascade to continue unchecked leading to thrombosis?
Coagulation inhibitors, Coagulation factors, Platelets, Fibrinogen`,
  `question: Describe the inhibitors antithrombin heparin Protein C & Protein S. Page 286. Where is the coagulation inhibitor Antithrombin synthesized?
The liver, The kidneys, Bone marrow, Endothelial cells`,
  `question: Describe the inhibitors antithrombin heparin Protein C & Protein S. Page 286. Antithrombin is a serine protease inhibitor that primarily neutralizes which two activated factors?
IIa and Xa, Va and VIIIa, IXa and XIa, VIIa and TF`,
  `question: Describe the inhibitors antithrombin heparin Protein C & Protein S. Page 286. What substance found on the surface of endothelial cells greatly enhances the inhibitor activity of Antithrombin?
Heparin, Protein C, Protein S, Thrombomodulin`,
  `question: Describe the inhibitors antithrombin heparin Protein C & Protein S. Page 286. Where is the Vitamin K dependent protein Protein C produced?
The liver, The spleen, The pancreas, The lungs`,
  `question: Describe the inhibitors antithrombin heparin Protein C & Protein S. Page 286. Activated Protein C (APC) is a serine protease that deactivates which two coagulation factors?
Va and VIIIa, IIa and Xa, IXa and XIa, VIIa and TF`,
  `question: Describe the inhibitors antithrombin heparin Protein C & Protein S. Page 286. What Vitamin K dependent protein acts as a cofactor for Protein C?
Protein S, Antithrombin, Factor V, Thrombomodulin`,
  `question: Describe the inhibitors antithrombin heparin Protein C & Protein S. Page 286. Protein S circulates in a free active form and also in a bound inactive form attached to what protein?
C4b-binding protein, Albumin, Hemoglobin, Fibrinogen`,
  `question: Describe inherited risk factors for thrombosis and their frequency of occurrence. Page 287. Which inherited disorder of an inhibitor has a quantitative Type I deficiency and a qualitative Type II deficiency?
Antithrombin Deficiency, Protein C Deficiency, Protein S Deficiency, Factor V Leiden`,
  `question: Describe inherited risk factors for thrombosis and their frequency of occurrence. Page 287. What is the most common inherited cause for thromboembolism?
Factor V Leiden, Prothrombin Mutation, Antithrombin Deficiency, Protein C Deficiency`,
  `question: Describe inherited risk factors for thrombosis and their frequency of occurrence. Page 287. Factor V Leiden is the most common form of which condition?
Activated Protein C Resistance (APCR), Antithrombin Deficiency, Protein S Deficiency, Dysfibrinogenemia`,
  `question: Describe inherited risk factors for thrombosis and their frequency of occurrence. Page 287. The Factor V Leiden mutation is a single gene mutation of Factor V designated as what?
Arg506Gln, G20210A, C677T, A1298C`,
  `question: Describe inherited risk factors for thrombosis and their frequency of occurrence. Page 287. What is the second most prevalent cause of an inherited form of hypercoagulability?
Prothrombin Mutation G20210A, Factor V Leiden, Antithrombin Deficiency, Protein S Deficiency`,
  `question: Describe inherited risk factors for thrombosis and their frequency of occurrence. Page 288. An inherited or acquired condition involving elevated levels of an amino acid that increases thrombosis risk is called what?
Hyperhomocysteinemia, Phenylketonuria, Alkaptonuria, Tyrosinemia`,
  `question: Describe inherited risk factors for thrombosis and their frequency of occurrence. Page 288. A deficiency in which inhibitor that targets Factor Xa and the Factor VIIa-TF complex can lead to thrombosis?
Tissue factor pathway inhibitor (TFPI), Antithrombin, Protein C, Protein S`,
  `question: Describe the most common acquired risk factors associated with thrombosis. Page 288. Heparin-induced thrombocytopenia (HIT) and what other syndrome are the most common acquired thrombotic disorders?
Antiphospholipid Syndrome, Myeloproliferative Neoplasms, Nephrotic Syndrome, Disseminated Intravascular Coagulation`,
  `question: Describe the most common acquired risk factors associated with thrombosis. Page 288. Antiphospholipid Syndrome is an autoimmune disorder where antibodies are created against proteins associated with what?
Phospholipids, Glycoproteins, Nucleic acids, Carbohydrates`,
  `question: Describe the most common acquired risk factors associated with thrombosis. Page 288. Lupus anticoagulant antibody and what other antibody are the most common forms of antiphospholipid antibodies?
Anticardiolipin antibody, Anti-B2GPI antibody, Anti-nuclear antibody, Rheumatoid factor`,
  `question: Describe the most common acquired risk factors associated with thrombosis. Page 289. What is the name of the immune-mediated complication associated with heparin therapy?
Heparin-induced thrombocytopenia (HIT), Warfarin-induced skin necrosis, Aspirin resistance, Protamine reaction`,
  `question: Describe the most common acquired risk factors associated with thrombosis. Page 289. In HIT the body produces antibodies against which complex?
Heparin-platelet factor IV complex, Heparin-antithrombin complex, Heparin-fibrin complex, Heparin-vWF complex`,
  `question: Describe the most common acquired risk factors associated with thrombosis. Page 289. HIT typically develops how many days after the initiation of heparin therapy?
5-14 days, 1-2 days, 15-20 days, Over 30 days`,
  `question: Describe the mechanism of action of each anticoagulant drug commonly used for the treatment of thrombotic disorders. Page 290. Which antiplatelet drug works by irreversibly inhibiting the cyclo-oxygenase (COX) enzyme?
Aspirin, Clopidogrel (Plavix), Heparin, Warfarin`,
  `question: Describe the mechanism of action of each anticoagulant drug commonly used for the treatment of thrombotic disorders. Page 290. By inhibiting the COX enzyme aspirin prevents the formation of what potent platelet-activating substance?
Thromboxane A2, Prostacyclin, ADP, Serotonin`,
  `question: Describe the mechanism of action of each anticoagulant drug commonly used for the treatment of thrombotic disorders. Page 290. What is the mechanism of action for the anticoagulant drug Heparin?
Binds to antithrombin, Vitamin K antagonist, Activates plasmin, Inhibits Factor V`,
  `question: Describe the mechanism of action of each anticoagulant drug commonly used for the treatment of thrombotic disorders. Page 290. What is the mechanism of action for the anticoagulant drug Coumadin (Warfarin)?
Vitamin K antagonist, Binds to antithrombin, Activates Protein C, Inhibits thrombin directly`,
  `question: Describe the mechanism of action of each anticoagulant drug commonly used for the treatment of thrombotic disorders. Page 290. Coumadin inhibits the function of which group of coagulation factors?
II VII IX X, I V VIII XIII, XI XII PK HMWK, V and VIII`,
  `question: Describe the mechanism of action of each anticoagulant drug commonly used for the treatment of thrombotic disorders. Page 290. What is the mechanism of action for the thrombolytic drug Tissue Plasminogen Activator (tPA)?
Activates plasmin, Inhibits thrombin, Prevents fibrin formation, Blocks platelet aggregation`,
  `question: Describe the laboratory tests used for monitoring heparin and coumadin therapy. Page 291. Unfractionated heparin therapy is monitored using which laboratory test?
aPTT, PT/INR, D-dimer, Fibrinogen`,
  `question: Describe the laboratory tests used for monitoring heparin and coumadin therapy. Page 291. The therapeutic range for unfractionated heparin aims for an aPTT that is how many times the mean of the lab's reference range?
1.5 to 2.5, 2.0 to 3.0, 1.0 to 1.5, 3.0 to 4.0`,
  `question: Describe the laboratory tests used for monitoring heparin and coumadin therapy. Page 291. A 40% reduction in the platelet count from its baseline during heparin therapy is evidence of what condition?
Heparin-induced thrombocytopenia (HIT), Disseminated intravascular coagulation (DIC), Thrombotic thrombocytopenic purpura (TTP), ITP`,
  `question: Describe the laboratory tests used for monitoring heparin and coumadin therapy. Page 291. Coumadin (Warfarin) therapy is monitored using which laboratory test?
PT/INR, aPTT, Thrombin Time, Bleeding Time`,
  `question: Describe the laboratory tests used for monitoring heparin and coumadin therapy. Page 291. What is the purpose of the International Normalized Ratio (INR)?
To standardize PT assays, To measure heparin levels, To detect Factor V Leiden, To assess platelet function`,
  `question: Describe the laboratory tests used for monitoring heparin and coumadin therapy. Page 291. What is the typical therapeutic INR range for the treatment of venous thromboembolism (VTE)?
2.0 to 3.0, 1.5 to 2.5, 2.5 to 3.5, <2.0`,
  `question: Describe the laboratory tests used for monitoring heparin and coumadin therapy. Page 291. An INR value greater than 3.0 indicates a higher risk for what complication?
Bleeding, Clotting, Infection, Anemia`,
  `question: Describe the laboratory tests used for the diagnosis of factor Leiden heparin-induced thrombocytopenia and antiphospholipid therapy. Page 292. A two-part aPTT test where APC is added to the patient's plasma is used to screen for what condition?
Activated Protein C Resistance, Antithrombin Deficiency, Lupus Anticoagulant, HIT`,
  `question: Describe the laboratory tests used for the diagnosis of factor Leiden heparin-induced thrombocytopenia and antiphospholipid therapy. Page 292. If the aPTT does not change or prolong when Activated Protein C is added to the plasma what does this indicate?
The patient has APCR, The patient does not have APCR, The patient has an inhibitor, The sample is clotted`,
  `question: Describe the laboratory tests used for the diagnosis of factor Leiden heparin-induced thrombocytopenia and antiphospholipid therapy. Page 292. What is the confirmatory test for Factor V Leiden?
DNA testing, aPTT with APC, Prothrombin time, D-dimer`,
  `question: Describe the laboratory tests used for the diagnosis of factor Leiden heparin-induced thrombocytopenia and antiphospholipid therapy. Page 292. Functional immunoassays such as heparin-induced platelet aggregation are used to diagnose what disorder?
Heparin-Induced Thrombocytopenia, Antiphospholipid Syndrome, Factor V Leiden, Protein C Deficiency`,
  `question: Describe the laboratory tests used for the diagnosis of factor Leiden heparin-induced thrombocytopenia and antiphospholipid therapy. Page 292. Which test is commonly used along with the aPTT to detect Lupus Anticoagulants?
Dilute Russell Viper Venom test (DRVVT), Prothrombin Time, Thrombin Time, Reptilase Time`,
  `question: Describe the laboratory tests used for the diagnosis of factor Leiden heparin-induced thrombocytopenia and antiphospholipid therapy. Page 292. If a prolonged aPTT does not correct to normal after being mixed with normal plasma what is likely present?
An inhibitor (LA), A factor deficiency, Platelet dysfunction, Fibrinogen abnormality`,
  `question: Describe the laboratory tests used for the diagnosis of factor Leiden heparin-induced thrombocytopenia and antiphospholipid therapy. Page 292. A mixing study for a suspected Lupus Anticoagulant is confirmed by adding excess what to the test system?
Platelets, Calcium, Phospholipids, Fibrinogen`,
  `question: Describe terms associated with thrombosis. Page 285. A blood clot that travels through the vasculature such as in a pulmonary embolism is known by what general term?
Embolism, Thrombus, Infarction, Atheroma`,
  `question: Describe the inhibitors antithrombin heparin Protein C & Protein S. Page 286. Thrombin binds to what receptor on endothelial cells to activate the Protein C pathway?
Thrombomodulin, Glycoprotein Ib, Tissue Factor, Fibrinogen Receptor`,
  `question: Describe inherited risk factors for thrombosis and their frequency of occurrence. Page 287. Smoking increases the risk of thrombosis 30-fold in patients with what condition?
Factor V Leiden, Prothrombin Mutation, Antithrombin Deficiency, Protein S Deficiency`,
  `question: Describe the most common acquired risk factors associated with thrombosis. Page 288. Antiphospholipid Syndrome can be a primary autoimmune disorder or secondary to what other disease?
Systemic Lupus Erythematosus, Rheumatoid Arthritis, Sjogren's Syndrome, Multiple Sclerosis`,
  `question: Describe the mechanism of action of each anticoagulant drug commonly used for the treatment of thrombotic disorders. Page 290. What is an example of another antiplatelet drug besides aspirin?
Clopidogrel (Plavix), Heparin, Coumadin, tPA`,
  `question: Describe the laboratory tests used for monitoring heparin and coumadin therapy. Page 291. Before starting heparin therapy a baseline aPTT and what other test must be performed?
Platelet count, Prothrombin time, D-dimer, Fibrinogen`,
  `question: Describe the pathophysiology of thrombosis. Page 285. Tissue infarctions are a common consequence of what type of thrombosis?
Arterial thrombosis, Venous thrombosis, DVT, PE`,
  `question: Describe inherited risk factors for thrombosis and their frequency of occurrence. Page 287. Which inherited thrombotic disorder is associated with recurrent venous thromboembolism?
Protein C Deficiency, Factor V Leiden, Prothrombin Mutation, Antithrombin Deficiency`,
  `question: Describe the mechanism of action of each anticoagulant drug commonly used for the treatment of thrombotic disorders. Page 290. Low-molecular-weight heparin (LMWH) works more on inhibiting which factor?
Factor Xa, Factor IIa, Factor Va, Factor VIIIa`,
  `question: Describe the laboratory tests used for the diagnosis of factor Leiden heparin-induced thrombocytopenia and antiphospholipid therapy. Page 292. ELISA is a common method used to detect antibodies against what complex in HIT?
Heparin-platelet factor 4, Heparin-antithrombin, Platelet-glycoprotein, Phospholipid-protein`
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