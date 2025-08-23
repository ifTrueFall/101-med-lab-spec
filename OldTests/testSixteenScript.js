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
  `question: Describe leukopoiesis and the steps leading from immature to mature forms. Page 134. What is the term for the production of White Blood Cells?
Leukopoiesis, Erythropoiesis, Thrombopoiesis, Hematopoiesis`,
  `question: Describe leukopoiesis and the steps leading from immature to mature forms. Page 134. Leukopoiesis originates from which type of stem cells?
Pluripotent stem cells, Myeloid stem cells, Lymphoid stem cells, Committed stem cells`,
  `question: Describe leukopoiesis and the steps leading from immature to mature forms. Page 134. What stimulates pluripotent stem cells to mature into leukocytes?
Cytokines, Hormones, Antigens, Erythropoietin`,
  `question: Describe leukopoiesis and the steps leading from immature to mature forms. Page 134. Which stem cells give rise to neutrophils eosinophils basophils and monocytes?
Myeloid stem cells, Lymphoid stem cells, Pluripotent stem cells, Erythroid stem cells`,
  `question: Describe leukopoiesis and the steps leading from immature to mature forms. Page 134. Which stem cells give rise to B and T lymphocytes?
Lymphoid stem cells, Myeloid stem cells, Pluripotent stem cells, Granulocytic stem cells`,
  `question: Describe leukopoiesis and the steps leading from immature to mature forms. Page 134. How many distinct forms of mature white blood cells are there?
Five, Three, Seven, Ten`,
  `question: Describe leukopoiesis and the steps leading from immature to mature forms. Page 134. Eosinophils originate from which stem cell line?
Myeloid, Lymphoid, Pluripotent, Megakaryocytic`,
  `question: Describe leukopoiesis and the steps leading from immature to mature forms. Page 134. B and T lymphocytes are produced in the bone marrow and what other organ?
Thymus, Spleen, Liver, Kidney`,
  `question: Describe leukopoiesis and the steps leading from immature to mature forms. Page 134. What term refers to cells originating from the lymphoid stem cell line?
Lymphocytic, Myelocytic, Granulocytic, Monocytic`,
  `question: Describe leukopoiesis and the steps leading from immature to mature forms. Page 134. What term refers to cells originating from the myeloid stem cell line?
Myelocytic, Lymphocytic, Pluripotent, Agranulocytic`,
  `question: Describe leukopoiesis and the steps leading from immature to mature forms. Page 134. White blood cells are also known by what other name?
Leukocytes, Erythrocytes, Thrombocytes, Platelets`,
  `question: Describe leukopoiesis and the steps leading from immature to mature forms. Page 134. Leukocytes defend against bacteria viruses fungi and what other threat?
Foreign substances, Old red cells, Platelet clumps, Abnormal proteins`,
  `question: Distinguish between the marginating and circulating pools of leukocytes. Page 135. Neutrophils are divided evenly between the circulating pool and which other pool?
Marginating, Storage, Reserve, Mitotic`,
  `question: Distinguish between the marginating and circulating pools of leukocytes. Page 135. Which pool consists of white blood cells that remain in the bloodstream?
Circulating, Marginating, Splenic, Bone Marrow`,
  `question: Distinguish between the marginating and circulating pools of leukocytes. Page 135. The marginating pool is located along the inner layer of blood vessels known as the what?
Vessel endothelium, Vessel epithelium, Arteriolar wall, Capillary bed`,
  `question: Distinguish between the marginating and circulating pools of leukocytes. Page 135. Which pool is positioned to quickly migrate to a site of injury or infection?
Marginating, Circulating, Systemic, Reserve`,
  `question: Identify morphological features used to differentiate cells of the leukocytic series. Page 136. Which feature is NOT one of the four main morphological features for cell differentiation?
Function, Cell size, N:C ratio, Cytoplasmic quality`,
  `question: Identify morphological features used to differentiate cells of the leukocytic series. Page 136. Observing the density and pattern of chromatin in the nucleus falls under which feature?
Chromatin pattern, N:C ratio, Cell size, Cytoplasmic quality`,
  `question: Identify morphological features used to differentiate cells of the leukocytic series. Page 136. Assessing the cytoplasm color and presence of granules is part of which feature?
Cytoplasmic quality, Cell size, Chromatin pattern, N:C ratio`,
  `question: Describe the maturation sequence of the granulocytic and agranulocytic series. Page 136. As leukocytes mature what is the general trend for the cell size?
Decreases, Increases, Stays the same, Fluctuates`,
  `question: Describe the maturation sequence of the granulocytic and agranulocytic series. Page 136. As leukocytes mature what typically happens to the Nucleus:Cytoplasm ratio?
Decreases, Increases, Stays the same, Doubles`,
  `question: Describe the maturation sequence of the granulocytic and agranulocytic series. Page 136. What happens to the nucleoli as most leukocytes mature?
Disappear, Appear, Increase in number, Enlarge`,
  `question: Describe the maturation sequence of the granulocytic and agranulocytic series. Page 136. As a leukocyte matures its chromatin generally does what?
Condenses, Loosens, Fragments, Disappears`,
  `question: Describe the maturation sequence of the granulocytic and agranulocytic series. Page 136. Which of the following cells is classified as a granulocyte?
Eosinophil, Monocyte, Lymphocyte, Plasmacyte`,
  `question: Describe the maturation sequence of the granulocytic and agranulocytic series. Page 136. Which of the following cells is classified as an agranulocyte?
Lymphocyte, Eosinophil, Basophil, Neutrophil`,
  `question: Describe the maturation sequence of the granulocytic and agranulocytic series. Page 137. What is the earliest recognizable stage in the granulocytic maturation sequence?
Myeloblast, Promyelocyte, Myelocyte, Metamyelocyte`,
  `question: Describe the maturation sequence of the granulocytic and agranulocytic series. Page 137. Prominent primary non-specific granules are characteristic of which stage?
Promyelocyte, Myeloblast, Myelocyte, Metamyelocyte`,
  `question: Describe the maturation sequence of the granulocytic and agranulocytic series. Page 137. At which stage do specific granules that differentiate granulocytes first appear?
Myelocyte, Promyelocyte, Myeloblast, Metamyelocyte`,
  `question: Describe the maturation sequence of the granulocytic and agranulocytic series. Page 137. What is the last stage in the granulocytic series that is capable of mitosis?
Myelocyte, Metamyelocyte, Band, Promyelocyte`,
  `question: Describe the maturation sequence of the granulocytic and agranulocytic series. Page 137. Which granulocytic stage is identified by its kidney bean-shaped nucleus?
Metamyelocyte, Myelocyte, Band, Promyelocyte`,
  `question: Describe the maturation sequence of the granulocytic and agranulocytic series. Page 137. A C-shaped or S-shaped nucleus is the key feature of which cell?
Band, Metamyelocyte, Neutrophil, Myelocyte`,
  `question: Describe the maturation sequence of the granulocytic and agranulocytic series. Page 138. A mature segmented neutrophil typically has how many nuclear lobes?
2-5, 1-2, 6-8, 1`,
  `question: Describe the maturation sequence of the granulocytic and agranulocytic series. Page 138. What is the typical size of a promyelocyte?
15-22 µm, 14-20 µm, 10-18 µm, 9-15 µm`,
  `question: Describe the maturation sequence of the granulocytic and agranulocytic series. Page 138. A mature eosinophil nucleus is usually described as what?
Bilobed, Round, 3-5 lobes, Cloverleaf`,
  `question: Describe the maturation sequence of the granulocytic and agranulocytic series. Page 138. What is the earliest stage in the monocytic maturation sequence?
Monoblast, Promonocyte, Monocyte, Macrophage`,
  `question: Describe the maturation sequence of the granulocytic and agranulocytic series. Page 138. Which monocytic stage may show folding and creasing of the nucleus?
Promonocyte, Monoblast, Monocyte, Histiocyte`,
  `question: Describe the maturation sequence of the granulocytic and angranulocytic series. Page 138. A mature monocyte nucleus is often described as having what appearance?
Brainy convolutions, Perfectly round, Segmented, Pyknotic`,
  `question: Describe the maturation sequence of the granulocytic and agranulocytic series. Page 138. The abundant cytoplasm of a mature monocyte is typically what color?
Gray-blue, Basophilic, Pinkish-tan, Pale lilac`,
  `question: Describe the maturation sequence of the granulocytic and agranulocytic series. Page 139. What is the earliest recognizable stage in the lymphocytic series?
Lymphoblast, Prolymphocyte, Small Lymphocyte, Large Lymphocyte`,
  `question: Describe the maturation sequence of the granulocytic and agranulocytic series. Page 139. Which lymphocyte is characterized by a high N:C ratio and coarse lumpy chromatin in a compact cell?
Small Lymphocyte, Large Lymphocyte, Prolymphocyte, Lymphoblast`,
  `question: Describe the maturation sequence of the granulocytic and agranulocytic series. Page 139. A larger amount of lighter-colored cytoplasm is characteristic of which lymphocyte?
Large Lymphocyte, Small Lymphocyte, Prolymphocyte, Lymphoblast`,
  `question: Describe the features that differentiate the granules of the neutrophilic eosinophilic and basophilic cell lines. Page 140. At what stage of development can the three types of granulocytes first be distinguished from each other?
Myelocyte, Promyelocyte, Myeloblast, Metamyelocyte`,
  `question: Describe the features that differentiate the granules of the neutrophilic eosinophilic and basophilic cell lines. Page 140. How are the secondary granules of a neutrophil described?
Very fine and pinkish, Round and large, Large and dark blue, Dirty-orange`,
  `question: Describe the features that differentiate the granules of the neutrophilic eosinophilic and basophilic cell lines. Page 140. What are the characteristics of an eosinophil's secondary granules?
Round large dirty-orange, Fine and pinkish, Large dark blue-purple, Small and black`,
  `question: Describe the features that differentiate the granules of the neutrophilic eosinophilic and basophilic cell lines. Page 140. The secondary granules of a basophil are described as what?
Large dark blue-purple, Round large dirty-orange, Fine and pinkish, Small and red`,
  `question: Describe the physiology and function of granulocytes. Page 140. What is the primary function of neutrophils?
Seek ingest and kill bacteria, Respond to allergic reactions, Regulate inflammation, Produce antibodies`,
  `question: Describe the physiology and function of granulocytes. Page 140. The internalization of microorganisms for destruction is known as what?
Phagocytosis, Exocytosis, Pinocytosis, Apoptosis`,
  `question: Describe the physiology and function of granulocytes. Page 140. Which leukocyte is typically the most numerous in circulation?
Neutrophil, Eosinophil, Basophil, Lymphocyte`,
  `question: Describe the physiology and function of granulocytes. Page 140. Eosinophils are primarily involved in the response to parasitic infections and what else?
Allergic reactions, Bacterial infections, Viral infections, Fungal infections`,
  `question: Describe the physiology and function of granulocytes. Page 140. The granules of eosinophils contain what substance to regulate inflammation?
Histaminase, Histamine, Heparin, Peroxidase`,
  `question: Describe the physiology and function of granulocytes. Page 140. Basophils are primarily involved in inflammation and what other type of reactions?
Hypersensitivity, Phagocytic, Parasitic, Autoimmune`,
  `question: Describe the physiology and function of granulocytes. Page 140. The granules of basophils contain histamine and what other anticoagulant substance?
Heparin, Histaminase, Warfarin, Lysozyme`,
  `question: Describe the lymphatic system and its relationship to lymphocyte production. Page 141. The lymphatic system is responsible for blood filtration fluid balance and what else?
Antibody generation, Oxygen transport, Hormone production, Red blood cell storage`,
  `question: Describe the lymphatic system and its relationship to lymphocyte production. Page 141. What is the name of the clear thin fluid derived from plasma in the lymphatic system?
Lymph Fluid, Serum, Interstitial fluid, Cytosol`,
  `question: Describe the lymphatic system and its relationship to lymphocyte production. Page 141. What are the primary locations for the process of lymphopoiesis?
Bone marrow and Thymus, Spleen and Lymph nodes, Peyer's patches and Tonsils, Liver and Kidney`,
  `question: Describe the lymphatic system and its relationship to lymphocyte production. Page 141. In which organ do T-Cells primarily mature?
Thymus, Bone marrow, Spleen, Lymph nodes`,
  `question: Describe the lymphatic system and its relationship to lymphocyte production. Page 141. In which location do B-Cells primarily develop?
Bone marrow, Thymus, Spleen, Peyer's patches`,
  `question: Describe the role of stimulated and unstimulated lymphocytes. Page 141. All lymphocytes ultimately arise from which type of stem cell?
Lymphoid, Myeloid, Pluripotent, Granulocytic`,
  `question: Describe the role of stimulated and unstimulated lymphocytes. Page 141. Lymphoid stem cells that migrate to the thymus differentiate into what cells?
T cells, B cells, NK cells, Plasma cells`,
  `question: Describe the role of stimulated and unstimulated lymphocytes. Page 141. Lymphoid stem cells that stay in the bone marrow can become B cells and what other cell type?
NK cells, T helper cells, T suppressor cells, Monocytes`
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