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
  `question: Compare and contrast acute versus chronic leukemia. Page 159. What is the typical onset for acute leukemia?
Abrupt, Subtle, Gradual, Intermittent`,
  `question: Compare and contrast acute versus chronic leukemia. Page 159. What is the typical onset for chronic leukemia?
Subtle, Abrupt, Rapid, Sudden`,
  `question: Compare and contrast acute versus chronic leukemia. Page 159. The predominant cells found in acute leukemia are what?
Blasts, Mature cells, Plasma cells, Prolymphocytes`,
  `question: Compare and contrast acute versus chronic leukemia. Page 159. The predominant cells found in chronic leukemia are what?
Mature, Blasts, Immature, Atypical`,
  `question: Compare and contrast acute versus chronic leukemia. Page 159. Chronic leukemia is most commonly seen in which age group?
Adults, All, Children, Toddlers`,
  `question: Compare and contrast acute versus chronic leukemia. Page 159. Morbidity for untreated acute leukemia is measured in what time frame?
Months, Years, Weeks, Days`,
  `question: Compare and contrast acute versus chronic leukemia. Page 159. Morbidity for chronic leukemia is measured in what time frame?
Years, Months, Weeks, Days`,
  `question: Compare and contrast acute versus chronic leukemia. Page 159. How is organomegaly typically characterized in chronic leukemia?
Marked, Mild, Absent, Variable`,
  `question: Compare and contrast acute versus chronic leukemia. Page 159. How is the WBC count typically described in chronic leukemia?
Elevated, Variable, Normal, Decreased`,
  `question: Compare and contrast acute versus chronic leukemia. Page 159. Leukemia results from a mutation of which cell?
Pluripotent stem cell, Myeloblast, Red blood cell, Megakaryocyte`,
  `question: Describe the acute leukemias with emphasis on age of onset symptoms at presentation prognosis and laboratory findings. Page 160. Diagnosis of acute leukemia requires what minimum percentage of blasts in the bone marrow?
20%, 5%, 10%, 50%`,
  `question: Describe the acute leukemias with emphasis on age of onset symptoms at presentation prognosis and laboratory findings. Page 160. If left untreated acute leukemia is typically fatal within what timeframe?
2-3 months, 1-2 years, 4-6 weeks, 5-7 days`,
  `question: Describe the acute leukemias with emphasis on age of onset symptoms at presentation prognosis and laboratory findings. Page 160. Auer rods are inclusion bodies that are only found in what type of blast?
Myeloblasts, Lymphoblasts, Monoblasts, Megakaryoblasts`,
  `question: Describe the acute leukemias with emphasis on age of onset symptoms at presentation prognosis and laboratory findings. Page 160. What is the most common acute leukemia that affects adults?
Acute Myeloid Leukemia, Acute Lymphoblastic Leukemia, Chronic Myeloid Leukemia, Chronic Lymphocytic Leukemia`,
  `question: Describe the acute leukemias with emphasis on age of onset symptoms at presentation prognosis and laboratory findings. Page 160. What are the most common presenting symptoms for a patient with AML?
Fatigue and weakness, Bone pain and fever, Bleeding and bruising, Headaches and nausea`,
  `question: Describe the acute leukemias with emphasis on age of onset symptoms at presentation prognosis and laboratory findings. Page 161. Which abnormal white blood cell morphology may be seen on a peripheral smear in a patient with AML?
Pseudo Pelger-Hüet cells, Toxic granulation, Dohle bodies, Hypersegmented neutrophils`,
  `question: Describe the acute leukemias with emphasis on age of onset symptoms at presentation prognosis and laboratory findings. Page 161. What is the most prevalent form of malignancy in children?
Acute Lymphoblastic Leukemia, Acute Myeloid Leukemia, Neuroblastoma, Wilms tumor`,
  `question: Describe the acute leukemias with emphasis on age of onset symptoms at presentation prognosis and laboratory findings. Page 161. Acute Lymphoblastic Leukemia typically peaks between what ages in children?
2-6, 10-15, 1-2, 8-12`,
  `question: Describe the acute leukemias with emphasis on age of onset symptoms at presentation prognosis and laboratory findings. Page 161. In addition to lethargy and fever what is a common symptom in children with ALL?
Bone pain, Weight gain, Skin rash, Vision changes`,
  `question: Describe the acute leukemias with emphasis on age of onset symptoms at presentation prognosis and laboratory findings. Page 161. What is the remission rate for children diagnosed with ALL?
95%, 70%, 50%, 25%`,
  `question: Describe the acute leukemias with emphasis on age of onset symptoms at presentation prognosis and laboratory findings. Page 162. According to the ALL prognostic factors table which factor is considered favorable?
Female, Male, Age <2, Black`,
  `question: Describe the acute leukemias with emphasis on age of onset symptoms at presentation prognosis and laboratory findings. Page 162. Based on the ALL prognostic factors table which WBC count is considered unfavorable?
>50x10^9/L, <10x10^9/L, 25x10^9/L, 15x10^9/L`,
  `question: Describe the acute leukemias with emphasis on age of onset symptoms at presentation prognosis and laboratory findings. Page 162. Which age range is associated with a favorable prognosis in ALL?
2 to 9 years, <2 and 10 years, 10 to 15 years, <1 year`,
  `question: Describe the acute leukemias with emphasis on age of onset symptoms at presentation prognosis and laboratory findings. Page 162. For ALL prognosis the absence of what condition is considered favorable?
CNS leukemia, Anemia, Thrombocytopenia, Neutropenia`,
  `question: Describe the World Health Organization (WHO) classification for acute leukemias. Page 162. What is the abnormal maturation of cells in the bone marrow called?
Dysplasia, Aplasia, Hyperplasia, Metaplasia`,
  `question: Describe the World Health Organization (WHO) classification for acute leukemias. Page 162. AML with Myelodysplasia requires evidence of dysplasia in at least how many cell lines?
Two, One, Three, Four`,
  `question: Describe the World Health Organization (WHO) classification for acute leukemias. Page 163. Hypogranulation and hyposegmentation are dysplastic features of which cell line?
Neutrophilic, Erythroid, Platelet, Monocytic`,
  `question: Describe the World Health Organization (WHO) classification for acute leukemias. Page 163. Ringed sideroblasts and megaloblastic features are dysplastic features of which cell line?
Erythroid, Neutrophilic, Platelet, Lymphoid`,
  `question: Describe the World Health Organization (WHO) classification for acute leukemias. Page 163. A micromegakaryocyte is a dysplastic feature of which cell line?
Platelet, Erythroid, Neutrophilic, Monocytic`,
  `question: Describe the World Health Organization (WHO) classification for acute leukemias. Page 163. AML that develops after a patient has had chemotherapy is classified as what?
Therapy-Related AML, AML with Myelodysplasia, AML Not Otherwise Specified, AML with maturation`,
  `question: Describe the World Health Organization (WHO) classification for acute leukemias. Page 163. What is the most common form of AML falling under the Not Otherwise Specified category?
Acute myeloid leukemia with maturation, Acute monoblastic leukemia, Acute erythroid leukemia, Acute megakaryoblastic leukemia`,
  `question: Describe the World Health Organization (WHO) classification for acute leukemias. Page 163. A hallmark clinical feature of acute monocytic leukemia is extramedullary disease which can present as what?
Gingival hypertrophy, Splenomegaly, Skin lesions, Bone pain`,
  `question: Describe the World Health Organization (WHO) classification for acute leukemias. Page 163. In the classification of Acute Erythroid Leukemia what is the definition of pure erythroid leukemia?
>80% erythroid precursors, >50% erythroid precursors, >30% myeloblasts, >20% blasts`,
  `question: Describe the World Health Organization (WHO) classification for acute leukemias. Page 164. What is the most rare form of the AMLs?
Acute Megakaryoblastic Leukemia, Acute Erythroid leukemia, Acute Monoblastic Leukemia, Acute Promyelocytic Leukemia`,
  `question: Describe the World Health Organization (WHO) classification for acute leukemias. Page 164. The WHO recognizes Precursor T cell and what other group of Acute Lymphoblastic Leukemias?
Precursor B cell, Mature B cell, Mature T cell, NK cell`,
  `question: Describe the World Health Organization (WHO) classification for acute leukemias. Page 164. A diagnosis of Lymphoblastic Lymphoma is made when there is a mass lesion and the bone marrow contains what percentage of lymphoblasts?
≤25%, >25%, 50%, 100%`,
  `question: Describe how cytochemical staining aides the diagnosis of acute leukemias. Page 7. What is the primary purpose of using cytochemical stains in diagnosing leukemia?
Differentiate hematopoietic cell lines, Enumerate red blood cells, Identify bacteria, Measure hemoglobin`,
  `question: Describe how cytochemical staining aides the diagnosis of acute leukemias. Page 7. The Myeloperoxidase (MPO) stain is used to identify neutrophil primary granules and is strongly positive in which cells?
Myeloblasts, Lymphoblasts, Erythroblasts, Monoblasts`,
  `question: Describe how cytochemical staining aides the diagnosis of acute leukemias. Page 7. The Sudan Black B (SBB) stain identifies what cellular element?
Phospholipids, Glycogen, Enzymes, Iron`,
  `question: Describe how cytochemical staining aides the diagnosis of acute leukemias. Page 7. Which stain is strongly positive in myeloblasts?
Specific esterase (CAE), Non-Specific Esterase (NSE), Periodic acid-Schiff (PAS), Acid Phosphatase (TRAP)`,
  `question: Describe how cytochemical staining aides the diagnosis of acute leukemias. Page 7. Which stain is strongly positive in monoblasts?
Non-Specific Esterase (NSE), Specific esterase (CAE), Myeloperoxidase (MPO), Sudan Black B (SBB)`,
  `question: Describe how cytochemical staining aides the diagnosis of acute leukemias. Page 7. The intranuclear enzyme Terminal deoxynucleotidyl transferase (TdT) is a positive marker for which cells?
Lymphoblasts, Myeloblasts, Monoblasts, Erythroblasts`,
  `question: Describe how cytochemical staining aides the diagnosis of acute leukemias. Page 7. A coarse or block-like positivity with the Periodic acid-Schiff (PAS) stain is often seen in what cell?
Lymphoblasts, Myeloblasts, Monoblasts, Promyelocytes`,
  `question: Describe how cytochemical staining aides the diagnosis of acute leukemias. Page 8. In the differentiation of acute leukemias how does ALL typically stain with MPO and SBB?
Negative, ++, +/-, +`,
  `question: Describe how cytochemical staining aides the diagnosis of acute leukemias. Page 8. How would monoblasts stain with Non-specific esterase (NSE)?
diffuse ++, Negative, +, block +`,
  `question: Describe how cytochemical staining aides the diagnosis of acute leukemias. Page 8. How would lymphoblasts stain with Periodic acid-Schiff (PAS)?
++ (block +), Negative, +/-, +`,
  `question: Identify the most consistent cytogenetic abnormalities in the acute leukemias. Page 8. Recurrent genetic abnormalities in AML frequently involve what type of chromosomal change?
Reciprocal translocations, Deletions, Inversions, Aneuploidy`,
  `question: Identify the most consistent cytogenetic abnormalities in the acute leukemias. Page 8. Auer rods are elliptical spindle-like inclusions composed of what?
Azurophilic granule, Ribosomal RNA, Fused mitochondria, Nuclear fragments`,
  `question: Identify the most consistent cytogenetic abnormalities in the acute leukemias. Page 8. Which AML subtype with a recurrent genetic abnormality is associated with a good long-term survival?
t(8:21), t(9:22), inv(3), t(15:17)`,
  `question: Identify the most consistent cytogenetic abnormalities in the acute leukemias. Page 8. AML with inv(16) was formerly known as AMML with an increase in what cell type?
Eosinophils, Basophils, Neutrophils, Monocytes`,
  `question: Identify the most consistent cytogenetic abnormalities in the acute leukemias. Page 8. Which translocation is characteristic of Acute Promyelocytic Leukemia (APL)?
t(15:17), t(8:21), inv(16), t(9:22)`,
  `question: Identify the most consistent cytogenetic abnormalities in the acute leukemias. Page 8. The presence of multiple or bundled Auer rods is a key morphologic feature of which AML subtype?
Acute promyelocytic leukemia t(15:17), Acute myeloid leukemia t(8:21), Acute myeloid leukemia inv(16), Acute myeloid leukemia with 11q23`,
  `question: Identify the most consistent cytogenetic abnormalities in the acute leukemias. Page 8. Acute promyelocytic leukemia is strongly associated with which life-threatening condition?
DIC, Sepsis, Anaphylaxis, Heart failure`,
  `question: Identify the most consistent cytogenetic abnormalities in the acute leukemias. Page 8. The presence of monoblasts and promonocytes often showing pseudopodia is characteristic of which AML?
Acute myeloid leukemia with 11q23, Acute myeloid leukemia t(8:21), Acute promyelocytic leukemia t(15:17), Acute myeloid leukemia inv(16)`,
  `question: Describe the World Health Organization (WHO) classification for acute leukemias. Page 162. The WHO classification for AML requires a blast percentage of what in the blood or marrow?
≥20%, ≥30%, ≥10%, ≥50%`,
  `question: Describe the acute leukemias with emphasis on age of onset symptoms at presentation prognosis and laboratory findings. Page 161. What is the long term cure rate for children with ALL?
70-80%, 95-100%, 50-60%, 30-40%`,
  `question: Compare and contrast acute versus chronic leukemia. Page 159. Leukemia impairs the production of red blood cells platelets and what else?
Leukocytes, Plasma, Fibrinogen, Hormones`,
  `question: Describe how cytochemical staining aides the diagnosis of acute leukemias. Page 7. SBB staining is strong positive in myeloblasts and faint positive in what other blast?
Monoblasts, Lymphoblasts, Pronormoblasts, Megakaryoblasts`,
  `question: Identify the most consistent cytogenetic abnormalities in the acute leukemias. Page 8. Acute myeloid leukemia inv(16) is known to have what kind of remission rates?
High, Low, Variable, Poor`,
  `question: Describe the World Health Organization (WHO) classification for acute leukemias. Page 164. Lymphoblastic Leukemia involves the bone marrow and what else?
Blood, Lymph tissue, Spleen, Liver`
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