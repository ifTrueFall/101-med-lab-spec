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
  `question: Describe the quantitative platelets disorders. Page 256. What is the normal reference range for a platelet count?
150 to 450x10^9/L, 50 to 100x10^9/L, 500 to 1000x10^9/L, 100 to 200x10^9/L`,
  `question: Describe the quantitative platelets disorders. Page 256. What is the medical term for bleeding from the gums?
Gingival bleeding, Epistaxis, Ecchymosis, Petechiae`,
  `question: Describe the quantitative platelets disorders. Page 256. What is the medical term for a nosebleed?
Epistaxis, Gingival bleeding, Purpura, Ecchymosis`,
  `question: Describe the quantitative platelets disorders. Page 256. What is the term for small pinpoint hemorrhage spots on the skin?
Petechiae, Purpura, Ecchymosis, Epistaxis`,
  `question: Describe the quantitative platelets disorders. Page 256. A platelet count below what level may result in a risk of bleeding into the Central Nervous System?
<10x10^9/L, 60x10^9/L, 100x10^9/L, 150x10^9/L`,
  `question: Describe the quantitative platelets disorders. Page 256. A lack of megakaryocytes in the bone marrow leading to a low platelet count is called what?
Bone Marrow aplasia, Chemotherapy, Cancer, Consumption`,
  `question: Describe the quantitative platelets disorders. Page 256. Idiopathic thrombocytopenia purpura is a condition where a low platelet count is caused by what mechanism?
Consumption of platelets, Decreased production, Altered distribution, Drug induction`,
  `question: Describe the quantitative platelets disorders. Page 256. An enlarged spleen that traps a large quantity of platelets is an example of what cause of thrombocytopenia?
Altered distribution, Decreased production, Consumption, Immune destruction`,
  `question: Describe how preanalytic variables may affect coagulation studies or the platelet count. Page 257. What color top tube containing 3.2% Sodium citrate is used for coagulation studies?
Blue top, Lavender top, Green top, Red top`,
  `question: Describe how preanalytic variables may affect coagulation studies or the platelet count. Page 257. What is the required blood to anticoagulant ratio for a coagulation sample?
9:1, 1:9, 1:1, 4:1`,
  `question: Describe how preanalytic variables may affect coagulation studies or the platelet count. Page 257. To be acceptable for testing a blue top tube must be filled to at least what capacity?
90%, 50%, 75%, 100%`,
  `question: Describe how preanalytic variables may affect coagulation studies or the platelet count. Page 257. What is the term for the phenomenon where platelets form a ring or rosette around neutrophils?
Platelet Satellitism, Platelet Aggregation, Platelet Adhesion, Platelet Clumping`,
  `question: Describe how preanalytic variables may affect coagulation studies or the platelet count. Page 257. Platelet satellitism is caused by an IgG antibody that reacts in the presence of which anticoagulant?
EDTA, Sodium citrate, Heparin, Sodium fluoride`,
  `question: Describe how preanalytic variables may affect coagulation studies or the platelet count. Page 257. What is the corrective action for a sample showing platelet satellitism to get an accurate platelet count?
Re-draw in a blue top tube, Warm the sample, Vortex the sample, Perform a manual count`,
  `question: Describe drug-induced immune thrombocytopenia. Page 257. In drug-induced thrombocytopenia the ingestion of certain drugs causes the formation of what?
Antibodies, Antigens, Platelet clumps, Immune complexes`,
  `question: Describe drug-induced immune thrombocytopenia. Page 257. In one mechanism of drug-induced thrombocytopenia the antibody binds to a platelet glycoprotein causing the platelet to be removed by what system?
RES, Spleen, Liver, Bone Marrow`,
  `question: Describe drug-induced immune thrombocytopenia. Page 257. Heparin quinines and NSAIDS are all classifications of drugs that can cause what condition?
Drug-induced immune thrombocytopenia, Platelet satellitism, Von Willebrand's disease, Bernard Soulier syndrome`,
  `question: Compare and contrast acute versus chronic idiopathic thrombocytopenic purpura. Page 258. Idiopathic Thrombocytopenic Purpura (ITP) is a decreased platelet count that results from what?
Immune destruction, Decreased production, Splenic sequestration, Drug effects`,
  `question: Compare and contrast acute versus chronic idiopathic thrombocytopenic purpura. Page 258. The autoantibody in ITP is typically directed against which platelet glycoproteins?
GP IIb/IIIa or GP Ib-Factor IX, ADAMTS-13, vWF, Thromboxane A2`,
  `question: Compare and contrast acute versus chronic idiopathic thrombocytopenic purpura. Page 258. Which form of ITP typically affects young children often after a viral illness?
Acute ITP, Chronic ITP, Drug-induced ITP, Secondary ITP`,
  `question: Compare and contrast acute versus chronic idiopathic thrombocytopenic purpura. Page 258. Which form of ITP typically affects adults and can last for months to years?
Chronic ITP, Acute ITP, Neonatal ITP, Congenital ITP`,
  `question: Compare and contrast acute versus chronic idiopathic thrombocytopenic purpura. Page 258. What is the typical platelet count seen in acute ITP?
< 20000, 30000 to 80000, > 100000, > 450000`,
  `question: Compare and contrast acute versus chronic idiopathic thrombocytopenic purpura. Page 258. Steroids and splenectomy are common therapies for which type of ITP?
Chronic ITP, Acute ITP, Asymptomatic ITP, Mild ITP`,
  `question: Describe thrombotic thrombocytopenic purpura. Page 258. Thrombotic Thrombocytopenic Purpura (TTP) is caused by a deficiency of which enzyme?
ADAMTS-13, G6PD, Pyruvate kinase, Catalase`,
  `question: Describe thrombotic thrombocytopenic purpura. Page 258. What is the normal function of the ADAMTS-13 enzyme?
Cleaves von Willebrand factor, Activates platelets, Lyses fibrin, Binds to collagen`,
  `question: Describe thrombotic thrombocytopenic purpura. Page 259. What is the typical finding for the PT and PTT tests in a patient with TTP?
Within reference range, Prolonged, Shortened, Unobtainable`,
  `question: Describe thrombotic thrombocytopenic purpura. Page 259. The presence of schistocytes on a peripheral blood smear is a key feature of which condition?
Microangiopathic anemia, Iron deficiency anemia, Megaloblastic anemia, Sideroblastic anemia`,
  `question: Describe thrombotic thrombocytopenic purpura. Page 259. Fever neurologic symptoms and renal disease are all symptoms of what disorder?
TTP, HUS, Acute ITP, Bernard Soulier syndrome`,
  `question: Describe hemolytic uremic syndrome. Page 259. Hemolytic Uremic Syndrome (HUS) is typically caused by a toxin produced by which bacteria?
E. coli O157:H7, Staphylococcus aureus, Streptococcus pyogenes, Pseudomonas aeruginosa`,
  `question: Describe hemolytic uremic syndrome. Page 259. HUS usually affects children in what age range?
6 months-4 years, 5-10 years, 11-15 years, 16-20 years`,
  `question: Describe hemolytic uremic syndrome. Page 259. A key symptom of HUS that is generally absent in TTP is what?
Bloody diarrhea, Neurologic symptoms, Fever, Anemia`,
  `question: Describe hemolytic uremic syndrome. Page 259. HUS is characterized by microangiopathic hemolytic anemia thrombocytopenia and what other major symptom?
Renal failure, Liver failure, Respiratory failure, Heart failure`,
  `question: Describe the characteristics of the inherited qualitative platelet disorders. Page 260. What is the most prevalent inherited platelet adhesion disease and bleeding disorder?
Von Willebrand's disease, Bernard Soulier syndrome, Glanzmann's thrombasthenia, Hemophilia A`,
  `question: Describe the characteristics of the inherited qualitative platelet disorders. Page 260. Von Willebrand's disease is a qualitative or quantitative defect in which factor?
Von Willebrand's factor, Factor VIII, Factor IX, GPIb/IX complex`,
  `question: Describe the characteristics of the inherited qualitative platelet disorders. Page 260. The Ristocetin co-factor activity assay is the single best predictive assay for what disorder?
Von Willebrand's disease, Bernard Soulier syndrome, Glanzmann's thrombasthenia, ITP`,
  `question: Describe the characteristics of the inherited qualitative platelet disorders. Page 260. Bernard Soulier syndrome is a rare inherited adhesion defect involving which platelet glycoprotein complex?
GPIb/IX complex, GPIIb/IIIa, vWF, ADAMTS-13`,
  `question: Describe the characteristics of the inherited qualitative platelet disorders. Page 260. What is a characteristic finding on the peripheral blood smear of a patient with Bernard Soulier syndrome?
Giant platelets, Small platelets, Agranular platelets, Fragmented platelets`,
  `question: Describe the characteristics of the inherited qualitative platelet disorders. Page 261. Glanzmann's thrombasthenia is a rare inherited aggregation disorder caused by an abnormality of which glycoprotein?
GPIIb/IIIa, GPIb/IX complex, vWF, Fibrinogen`,
  `question: Describe the characteristics of the inherited qualitative platelet disorders. Page 261. In Glanzmann's thrombasthenia what is the expected platelet count and morphology?
Normal, Decreased with giant platelets, Increased with small platelets, Normal count with abnormal granules`,
  `question: Describe platelet abnormalities due to acquired defects. Page 261. What is the most popular drug that can cause an acquired defect of platelet function?
Aspirin, Penicillin, Acetaminophen, Ibuprofen`,
  `question: Describe platelet abnormalities due to acquired defects. Page 261. How does aspirin inhibit platelet function?
Inhibits production of thromboxane A2, Blocks the GPIIb/IIIa receptor, Prevents vWF binding, Destroys platelet granules`,
  `question: Describe platelet abnormalities due to acquired defects. Page 261. Multiple Myeloma can cause an extrinsic platelet abnormality because excessive immunoglobulins interfere with what?
Activation of coagulation factors, Platelet adhesion, Platelet production, vWF function`,
  `question: Interpret laboratory tests helpful in evaluating platelet disorders. Page 262. A platelet function analyzer measures the time it takes for platelets to plug a membrane-coated aperture. What is this time called?
Closing Time (CT), Bleeding Time (BT), Prothrombin Time (PT), Activated Partial Thromboplastin Time (aPTT)`,
  `question: Interpret laboratory tests helpful in evaluating platelet disorders. Page 262. The vWD antigen is measured by immunoassay using what substance?
Ristocetin, Collagen, ADP, Epinephrine`,
  `question: Describe the effect of Ristocetin on platelet aggregation. Page 262. What is the primary use of Ristocetin in the laboratory?
To assess platelet function, To treat bleeding disorders, To prevent clotting, To dissolve clots`,
  `question: Describe the effect of Ristocetin on platelet aggregation. Page 262. The Ristocetin cofactor assay assesses vWF function by measuring its binding to what platelet glycoprotein?
GPIb, GPIIb/IIIa, Fibrinogen, Collagen`,
  `question: Describe the effect of Ristocetin on platelet aggregation. Page 262. In which disorder is platelet aggregation normal with Ristocetin but abnormal with other agonists like ADP and collagen?
Glanzmann's thrombasthenia, Bernard Soulier syndrome, Von Willebrand's disease, Aspirin ingestion`,
  `question: Describe the characteristics of the inherited qualitative platelet disorders. Page 260. In Bernard Soulier syndrome platelet aggregation is absent with Ristocetin but normal with what other agonists?
Epinephrine collagen thrombin, Aspirin vWF ADP, Fibrinogen thrombin ADP, Epinephrine Ristocetin collagen`,
  `question: Describe the quantitative platelets disorders. Page 256. Petechiae are small hemorrhage spots while purpura refers to hemorrhage into the skin and what else?
Mucous membranes, Joints, Muscles, Organs`,
  `question: Compare and contrast acute versus chronic idiopathic thrombocytopenic purpura. Page 258. In which type of ITP is a prior history of viral illness common?
Acute ITP, Chronic ITP, Drug-induced ITP, Familial ITP`,
  `question: Describe thrombotic thrombocytopenic purpura. Page 259. A deficiency of ADAMTS-13 leaves larger vWF molecules with more binding sites leading to the formation of what?
Excessive platelet clots, Autoantibodies, Fibrin degradation products, Immune complexes`,
  `question: Describe the quantitative platelets disorders. Page 256. Cancer can cause a decreased platelet count because blast cells do what in the bone marrow?
Crowd out normal cells, Destroy megakaryocytes, Consume platelets, Inhibit thrombopoietin`,
  `question: Describe how preanalytic variables may affect coagulation studies or the platelet count. Page 257. An automated hematology counter will report what kind of platelet count in a patient with platelet satellitism?
Falsely low, Falsely high, Normal, Variable`,
  `question: Describe thrombotic thrombocytopenic purpura. Page 258. The clots formed in TTP are located where?
Within circulation, At the site of injury, In the spleen, In the bone marrow`,
  `question: Describe hemolytic uremic syndrome. Page 259. The symptoms of HUS mimic those of TTP with the notable exception of what?
No neurologic symptoms, No renal failure, No fever, No anemia`,
  `question: Describe the characteristics of the inherited qualitative platelet disorders. Page 260. Heavy menses also known as menorrhagia is a common symptom of what disorder?
Von Willebrand's disease, Bernard Soulier syndrome, Glanzmann's thrombasthenia, TTP`,
  `question: Interpret laboratory tests helpful in evaluating platelet disorders. Page 262. Platelet function analyzer cartridges use a membrane coated with collagen and what other substance?
Epinephrine or ADP, Ristocetin or thrombin, Fibrinogen or vWF, Heparin or Warfarin`,
  `question: Describe the quantitative platelets disorders. Page 256. Excessive bruising is medically termed what?
Ecchymosis, Petechiae, Purpura, Epistaxis`,
  `question: Describe how preanalytic variables may affect coagulation studies or the platelet count. Page 257. What is a potential pre-analytical error if a blue top tube is not properly mixed?
Small clots may form, Hemolysis will occur, The sample will be diluted, Platelet satellitism will occur`,
  `question: Compare and contrast acute versus chronic idiopathic thrombocytopenic purpura. Page 258. What is the typical duration of chronic ITP?
Months to years, 2 to 6 weeks, 1 to 2 days, Lifelong`
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