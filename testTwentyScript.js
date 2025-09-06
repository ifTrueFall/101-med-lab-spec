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
  `question: Describe the formation, physiology, and specimen processing of CSF. Page 80. What is a primary function of CSF?
Supply nutrients, Produce red blood cells, Regulate body temperature, Transport hormones`,

  `question: Describe the formation, physiology, and specimen processing of CSF. Page 80. The meninges consist of three layers. What is the outer layer that lines the skull?
Dura Mater, Arachnoid, Pia Mater, Choroid Plexus`,

  `question: Describe the formation, physiology, and specimen processing of CSF. Page 80. What is the filamentous spiderlike inner membrane of the meninges called?
Arachnoid, Dura Mater, Pia Mater, Ventricle`,

  `question: Describe the formation, physiology, and specimen processing of CSF. Page 80. Which thin membrane lines the surfaces of the brain and spinal cord?
Pia Mater, Dura Mater, Arachnoid, Ependyma`,

  `question: Describe the formation, physiology, and specimen processing of CSF. Page 80. Where is cerebrospinal fluid primarily produced?
Choroid plexuses, Arachnoid granulations, Subarachnoid space, Pituitary gland`,

  `question: Describe the formation, physiology, and specimen processing of CSF. Page 80. In adults approximately how much CSF is produced every hour?
20 mL, 50 mL, 100 mL, 5 mL`,

  `question: Describe the formation, physiology, and specimen processing of CSF. Page 80. What is the normal CSF volume for an adult?
90-150 mL, 10-60 mL, 200-250 mL, 50-75 mL`,

  `question: Describe the formation, physiology, and specimen processing of CSF. Page 80. What is the normal CSF volume for a neonate?
10-60 mL, 90-150 mL, 70-120 mL, 160-200 mL`,

  `question: Describe the formation, physiology, and specimen processing of CSF. Page 80. Where is CSF reabsorbed back into the blood capillaries?
Arachnoid granulations, Choroid plexuses, Dura mater, Pia mater`,

  `question: Describe the formation, physiology, and specimen processing of CSF. Page 81. The tight-fitting structure of endothelial cells in the choroid plexuses is termed the what?
Blood-brain barrier, Meningeal layer, Neural sheath, Ventricular wall`,

  `question: Describe the formation, physiology, and specimen processing of CSF. Page 81. Which condition can disrupt the blood-brain barrier allowing leukocytes and proteins to enter the CSF?
Meningitis, Hydrocephalus, Anemia, Hypertension`,

  `question: Describe the formation, physiology, and specimen processing of CSF. Page 81. How is CSF routinely collected from a patient?
Lumbar puncture, Venipuncture, Arterial stick, Biopsy`,

  `question: Describe the formation, physiology, and specimen processing of CSF. Page 81. When collecting CSF specimens in three sterile tubes which tube is used for chemical and serologic tests?
Tube 1, Tube 2, Tube 3, Tube 4`,

  `question: Describe the formation, physiology, and specimen processing of CSF. Page 82. Which CSF collection tube is designated for microbiology?
Tube 2, Tube 1, Tube 3, Tube 4`,

  `question: Describe the formation, physiology, and specimen processing of CSF. Page 82. Which CSF collection tube is used by hematology for the cell count?
Tube 3, Tube 1, Tube 2, Tube 4`,

  `question: Describe the formation, physiology, and specimen processing of CSF. Page 82. How should the specimen for microbiology Tube 2 be stored?
Room temperature, Frozen, Refrigerated, Incubated`,

  `question: Describe the formation, physiology, and specimen processing of CSF. Page 82. How should the specimen for hematology Tube 3 be stored if analysis is delayed?
Refrigerated, Frozen, Room temperature, In an incubator`,

  `question: Describe the appearance and significance of CSF. Page 83. What term is used to describe a cloudy or turbid CSF specimen?
Cloudy, Xanthochromic, Hemolyzed, Crystal clear`,

  `question: Describe the appearance and significance of CSF. Page 83. The presence of what cell type is a common cause of cloudiness in a CSF specimen?
WBCs, RBCs, Platelets, Ependymal cells`,

  `question: Describe the appearance and significance of CSF. Page 83. What term describes CSF supernatant that is pink orange or yellow?
Xanthochromia, Erythrocytosis, Hemolysis, Turbidity`,

  `question: Describe the appearance and significance of CSF. Page 83. A yellow color in CSF supernatant is due to the conversion of oxyhemoglobin to what?
Unconjugated bilirubin, Methemoglobin, Hemosiderin, Fibrinogen`,

  `question: Describe the appearance and significance of CSF. Page 83. What does a pink CSF supernatant indicate?
Slight amount of oxyhemoglobin, Heavy hemolysis, Bilirubin presence, High protein levels`,

  `question: Differentiate between an intracranial hemorrhage and a traumatic tap. Page 84. In an intracranial hemorrhage how is blood distributed throughout the three CSF specimen tubes?
Evenly distributed, Decreasing amounts, Increasing amounts, Only in tube 1`,

  `question: Differentiate between an intracranial hemorrhage and a traumatic tap. Page 84. How will blood concentration appear in the collection tubes from a traumatic tap?
Gradually diminishing, Evenly distributed, Gradually increasing, Only in tube 3`,

  `question: Differentiate between an intracranial hemorrhage and a traumatic tap. Page 84. Which CSF collection event is more likely to cause clot formation due to the introduction of plasma fibrinogen?
Traumatic tap, Intracranial hemorrhage, Subarachnoid bleed, Ventricular puncture`,

  `question: Calculate the final results of a CSF count. Page 85. What is the most routinely performed cell count on CSF specimens?
WBC count, RBC count, Platelet count, Total cell count`,

  `question: Calculate the final results of a CSF count. Page 85. Cell counts should be performed immediately because WBCs and RBCs begin to lyse within what time frame?
1 hour, 4 hours, 8 hours, 24 hours`,

  `question: Calculate the final results of a CSF count. Page 85. What is the normal range of WBCs in adult CSF?
0 to 5 WBCs/µL, 10 to 20 WBCs/µL, 20 to 30 WBCs/µL, 30 to 50 WBCs/µL`,

  `question: Calculate the final results of a CSF count. Page 85. Up to how many mononuclear cells per microliter can be considered normal in newborns?
30, 5, 10, 50`,

  `question: Calculate the final results of a CSF count. Page 86. What counting chamber is typically used for performing CSF cell counts?
Neubauer, Fuchs-Rosenthal, McMaster, Sedgewick-Rafter`,

  `question: Calculate the final results of a CSF count. Page 86. When calculating cells/µL what factor is multiplied by the number of cells counted?
Dilution factor, Chamber depth, Area counted, Objective power`,

  `question: Calculate the final results of a CSF count. Page 86. To perform a WBC count what must be done to the RBCs in the specimen?
Lysis, Staining, Preservation, Concentration`,

  `question: Calculate the final results of a CSF count. Page 86. What reagent is used to dilute CSF specimens and lyse RBCs for a WBC count?
3% glacial acetic acid, Normal saline, Methylene blue, Wright's stain`,

  `question: Differentiate CSF cellular constituents to include their clinical significance. Page 87. How should a CSF differential count be performed?
On a stained smear, In the counting chamber, Using flow cytometry, With a digital scanner`,

  `question: Differentiate CSF cellular constituents to include their clinical significance. Page 87. What method is used to concentrate CSF specimens for a differential count?
Cytocentrifugation, Filtration, Sedimentation, Evaporation`,

  `question: Differentiate CSF cellular constituents to include their clinical significance. Page 87. When performing a differential count how many cells should ideally be counted and classified?
100, 50, 200, 500`,

  `question: Differentiate CSF cellular constituents to include their clinical significance. Page 88. What are the primary cells found in normal CSF?
Lymphocytes and monocytes, Neutrophils and eosinophils, Basophils and mast cells, Plasma cells and macrophages`,

  `question: Differentiate CSF cellular constituents to include their clinical significance. Page 88. What is the term for an increased number of normal cells in CSF?
Pleocytosis, Leukopenia, Thrombocytosis, Anisocytosis`,

  `question: Differentiate CSF cellular constituents to include their clinical significance. Page 88. A high CSF WBC count with a majority of neutrophils is indicative of what condition?
Bacterial meningitis, Viral meningitis, Fungal meningitis, Parasitic meningitis`,

  `question: Differentiate CSF cellular constituents to include their clinical significance. Page 88. An elevated CSF WBC count with a majority of lymphocytes and monocytes suggests what type of infection?
Viral meningitis, Bacterial meningitis, Septicemia, Systemic infection`,

  `question: Differentiate CSF cellular constituents to include their clinical significance. Page 89. Besides bacterial meningitis when else might increased neutrophils be seen in CSF?
CNS hemorrhage, Viral infections, Multiple sclerosis, Leukemia`,

  `question: Differentiate CSF cellular constituents to include their clinical significance. Page 89. In what conditions are increased eosinophils commonly seen in the CSF?
Parasitic infections, Bacterial infections, Viral infections, CNS hemorrhage`,

  `question: Differentiate CSF cellular constituents to include their clinical significance. Page 90. What is the primary purpose of macrophages in the CSF?
Remove cellular debris, Produce antibodies, Fight bacterial infections, Regulate pressure`,

  `question: Differentiate CSF cellular constituents to include their clinical significance. Page 90. Macrophages phagocytize RBCs during a hemorrhage and degrade them into what iron-containing granules?
Hemosiderin granules, Hematoidin crystals, Bilirubin granules, Myelin fragments`,

  `question: Differentiate CSF cellular constituents to include their clinical significance. Page 90. What non-clinically significant cells from the lining of the ventricles and neural canal can be found in CSF?
Ependymal cells, Choroidal cells, Spindle-shaped cells, Squamous epithelial cells`,

  `question: Differentiate CSF cellular constituents to include their clinical significance. Page 90. The presence of lymphoblasts myeloblasts or monoblasts in the CSF is a serious complication of what condition?
Acute leukemia, Multiple sclerosis, Bacterial meningitis, Chronic lymphoma`,

  `question: Differentiate CSF cellular constituents to include their clinical significance. Page 91. Cells from primary CNS tumors found in CSF can include astrocytomas retinoblastomas and what else?
Medulloblastomas, Lymphomas, Carcinomas, Sarcomas`,

  `question: Describe the clinical significance of proteins in the CSF. Page 92. What is the most frequently performed chemical test on CSF?
Protein determination, Glucose level, Lactate level, Chloride measurement`,

  `question: Describe the clinical significance of proteins in the CSF. Page 92. What are the normal values for total CSF protein?
15 to 45 mg/dL, 50 to 100 mg/dL, 100 to 150 mg/dL, 5 to 10 mg/dL`,

  `question: Describe the clinical significance of proteins in the CSF. Page 92. What protein makes up the majority of CSF protein?
Albumin, Prealbumin, Globulin, Fibrinogen`,

  `question: Describe the clinical significance of proteins in the CSF. Page 92. What is the second most prevalent protein fraction in CSF?
Prealbumin, Albumin, Transferrin, Immunoglobulin`,

  `question: Describe the clinical significance of proteins in the CSF. Page 92. What are the most common causes of elevated CSF protein?
Meningitis and hemorrhage, Dehydration and trauma, Neurological disorders, Liver disease`,

  `question: Describe the clinical significance of glucose in the CSF. Page 93. The normal value of CSF glucose is approximately what percentage of the plasma glucose?
60% to 70%, 20% to 30%, 40% to 50%, 80% to 90%`,

  `question: Describe the clinical significance of glucose in the CSF. Page 93. For an accurate comparison how long before the spinal tap should blood glucose be drawn?
2 hours, 30 minutes, 4 hours, Immediately after`,

  `question: Describe the clinical significance of glucose in the CSF. Page 93. A significantly low CSF glucose value is a classic sign of what condition?
Meningitis, Hyperglycemia, Intracranial hemorrhage, Multiple sclerosis`,

  `question: Describe the clinical significance of glucose in the CSF. Page 93. According to the table which type of meningitis is associated with low glucose and a high neutrophil count?
Bacterial Meningitis, Viral Meningitis, Tubercular Meningitis, Fungal Meningitis`,

  `question: Describe the clinical significance of glucose in the CSF. Page 93. Which type of meningitis is associated with normal glucose and a high lymphocyte count?
Viral Meningitis, Bacterial Meningitis, Tubercular Meningitis, Parasitic Meningitis`,

  `question: Describe the clinical significance of glucose in the CSF. Page 93. According to the table what are the expected glucose and cell findings in tubercular meningitis?
Low glucose and lymphocytes, Low glucose and neutrophils, Normal glucose and lymphocytes, High glucose and neutrophils`,

  `question: Differentiate CSF cellular constituents to include their clinical significance. Page 88. What type of meningitis tends to affect immunocompromised patients?
Fungal meningitis, Bacterial meningitis, Viral meningitis, Tubercular meningitis`,

  `question: Differentiate CSF cellular constituents to include their clinical significance. Page 90. Malignant lymphoma cells in the CSF indicate dissemination from what tissue?
Lymphoid tissue, Bone marrow, Brain tissue, Lung tissue`
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