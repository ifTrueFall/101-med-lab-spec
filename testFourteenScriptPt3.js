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
  `question: Describe hematopoiesis and the organs used for hematopoiesis throughout fetal and adult life. Page 25. What is the production development differentiation and maturation of all blood cells called?
Hematopoiesis, Erythropoiesis, Leukopoiesis, Thrombopoiesis`,
  `question: Describe hematopoiesis and the organs used for hematopoiesis throughout fetal and adult life. Page 25. During the first 2 weeks to 2 months of fetal life what is the primary site of hematopoiesis?
Yolk sac, Liver, Spleen, Bone marrow`,
  `question: Describe hematopoiesis and the organs used for hematopoiesis throughout fetal and adult life. Page 25. The hepatic period of fetal hematopoiesis occurs from 2 to 7 months and primarily involves which two organs?
Liver and Spleen, Yolk sac and Bone marrow, Thymus and Lymph nodes, Heart and Lungs`,
  `question: Describe hematopoiesis and the organs used for hematopoiesis throughout fetal and adult life. Page 25. From 7 months post-conception through the remainder of life what assumes the primary role in hematopoiesis?
Bone marrow, Liver, Spleen, Lymph nodes`,
  `question: Describe hematopoiesis and the organs used for hematopoiesis throughout fetal and adult life. Page 25. When there is bone marrow damage what non-bone marrow sites can compensate?
Spleen thymus and lymph nodes, Heart and lungs, Kidneys and pancreas, Brain and spinal cord`,
  `question: Differentiate between intramedullary and extramedullary hematopoiesis. Page 26. What is the term for hematopoiesis that occurs inside the bone marrow?
Intramedullary hematopoiesis, Extramedullary hematopoiesis, Hepatic hematopoiesis, Mesoblastic hematopoiesis`,
  `question: Differentiate between intramedullary and extramedullary hematopoiesis. Page 26. What is the term for hematopoiesis that occurs outside the bone marrow environment?
Extramedullary hematopoiesis, Intramedullary hematopoiesis, Medullary hematopoiesis, Myeloid hematopoiesis`,
  `question: Differentiate between intramedullary and extramedullary hematopoiesis. Page 26. In an adult extramedullary hematopoiesis occurs primarily in what two organs?
The liver and spleen, The thymus and lymph nodes, The kidneys and pancreas, The lungs and heart`,
  `question: Explain the four functions of the spleen. Page 26. The spleen acts as a reservoir storing one-third of the circulating pool of what cells?
Platelets and granulocytes, Red blood cells, Lymphocytes, Monocytes`,
  `question: Explain the four functions of the spleen. Page 26. One function of the spleen is filtration where it inspects red blood cells and platelets for abnormalities and what else?
Inclusions, Size variations, Color variations, Antigen presence`,
  `question: Explain the four functions of the spleen. Page 26. The spleen's immunologic role involves providing opsonizing antibodies that make bacteria vulnerable to what process?
Phagocytosis, Apoptosis, Lysis, Agglutination`,
  `question: Describe the microenvironment and factors affecting differentiation of the pluripotent stem cell (PSC). Page 27. The bone marrow microenvironment is home to what type of stem cells?
Multipotential (Pluripotent) stem cells, Myeloid committed cells, Lymphoid committed cells, Erythroid precursor cells`,
  `question: Describe the microenvironment and factors affecting differentiation of the pluripotent stem cell (PSC). Page 27. Pluripotent stem cells are capable of differentiation into what two precursor committed cell lines?
Myeloid (Non-Lymphoid) or lymphoid, Erythroid or granulocytic, Megakaryocytic or monocytic, T-cell or B-cell`,
  `question: Describe the microenvironment and factors affecting differentiation of the pluripotent stem cell (PSC). Page 27. Myeloid committed cells (CFU-GEMM) can develop into RBCs WBCs and what other cell family?
Megakaryocytic family, Lymphoid family, Plasma cell family, Monocytic family`,
  `question: Describe the microenvironment and factors affecting differentiation of the pluripotent stem cell (PSC). Page 27. What proteins send chemical signals to promote specific cell lineage selection and maturation rate?
Cytokines and interleukins, Hemoglobins, Albumins, Antibodies`,
  `question: Define the myeloid:erythroid ratio. Page 29. The M:E ratio provides the approximate number of myeloid elements to what other elements in the marrow?
Erythroid elements, Lymphoid elements, Megakaryocytic elements, Plasma cells`,
  `question: Define the myeloid:erythroid ratio. Page 29. What is the normal Myeloid:Erythroid ratio?
3:1 to 4:1, 1:1, 1:3, 10:1`,
  `question: Define the myeloid:erythroid ratio. Page 29. The normal M:E ratio reflects the relationship between production and what characteristic of the various cell types?
Life span, Size, Function, Shape`,
  `question: Describe the bone marrow procedure methods and materials and the technician's role in ensuring the bone marrow is recovered. Page 30. What is the site of choice for a bone marrow procedure?
Iliac crest, Sternum, Femur, Tibia`,
  `question: Describe the bone marrow procedure methods and materials and the technician's role in ensuring the bone marrow is recovered. Page 30. What is a key role for the technician during a bone marrow aspirate?
Locates spicules from the specimen, Performs the aspiration, Anesthetizes the patient, Generates the final report`,
  `question: Describe the bone marrow procedure methods and materials and the technician's role in ensuring the bone marrow is recovered. Page 30. What are spicules in a bone marrow sample?
Areas in the sample richest with cells, Fragments of bone, Clumps of fat cells, Aggregates of platelets`,
  `question: Describe the bone marrow procedure methods and materials and the technician's role in ensuring the bone marrow is recovered. Page 30. What stain is used to evaluate iron stores in a bone marrow sample?
Prussian blue stain, Wright's stain, New methylene blue stain, Giemsa stain`,
  `question: Describe the bone marrow procedure methods and materials and the technician's role in ensuring the bone marrow is recovered. Page 30. Wright's stain is used to evaluate the M:E ratio overall cellularity and what else?
Maturation of each cell line, Iron stores, Reticulocyte count, Hemoglobin content`,
  `question: List the components of the complete blood count (CBC). Page 31. What is the most frequently ordered test in Hematology?
Complete Blood Count (CBC), Prothrombin Time (PT), Basic Metabolic Panel (BMP), Urinalysis (UA)`,
  `question: List the components of the complete blood count (CBC). Page 31. Which of the following CBC parameters is electronically (directly) measured?
Red Blood Cell count (RBC), Mean Corpuscular Hemoglobin (MCH), Mean Cell Hemoglobin Content (MCHC), Red Blood Cell Distribution Width (RDW)`,
  `question: List the components of the complete blood count (CBC). Page 31. Which of the following CBC parameters is a calculated quantity?
Mean Corpuscular Hemoglobin (MCH), White Blood Cell count (WBC), Platelet count (PLT), Hemoglobin (Hgb)`,
  `question: Distinguish normal and critical values in an automated CBC. Page 32. What is the normal reference range for the WBC count in an adult male or female?
4.8-10.8 (x 10^9/L), 9-30 (x 10^9/L), 3.0-7.0 (x 10^9/L), 150-450 (x 10^9/L)`,
  `question: Distinguish normal and critical values in an automated CBC. Page 32. What is the critical low value for Hemoglobin (Hgb)?
7.0 g/dL, 12.0 g/dL, 3.0 g/dL, 19.0 g/dL`,
  `question: Distinguish normal and critical values in an automated CBC. Page 32. What is the critical low value for the Platelet count (PLT)?
20 (x10^9/L), 150 (x10^9/L), 1000 (x10^9/L), 50 (x10^9/L)`,
  `question: Describe the importance of correlation checks in a CBC. Page 33. The correlation check between hemoglobin and hematocrit is known as what?
The Rule of Three, The Rule of Fives, Quality Control, A Delta Check`,
  `question: Describe the importance of correlation checks in a CBC. Page 33. What is the formula for the 'Rule of Three' correlation check?
Hgb x 3 = Hct +/- 3, RBC x 3 = Hct, Hgb x 3 = RBC, RBC + 3 = Hgb`,
  `question: Describe the importance of correlation checks in a CBC. Page 33. The 'Rule of Three' only applies to what type of red blood cells?
Normocytic/normochromic, Microcytic/hypochromic, Macrocytic/normochromic, All types of red blood cells`,
  `question: Outline erythropoiesis from origin to maturation. Page 36. Erythropoiesis originates from what type of stem cells?
Pluripotent stem cells (PSC), Myeloid committed cells, Lymphoid committed cells, Erythroid precursors`,
  `question: Outline erythropoiesis from origin to maturation. Page 36. What hormone released from the kidney stimulates pronormoblasts to mature into erythrocytes?
Erythropoietin (EPO), Thrombopoietin (TPO), Granulocyte colony-stimulating factor (GCSF), Interleukin-3 (IL-3)`,
  `question: Outline erythropoiesis from origin to maturation. Page 36. During maturation the cell size is reduced the N:C ratio decreases and the nuclear chromatin becomes what?
More condensed, Less condensed, Fragmented, Unchanged`,
  `question: Describe immature red cells with regard to nucleus: cytoplasm ratio, cytoplasm, nuclear structure, and size. Page 37. Comparing immature to mature red cells the N:C ratio of an immature cell is what?
High, Low, 1:1, Absent`,
  `question: Describe immature red cells with regard to nucleus: cytoplasm ratio, cytoplasm, nuclear structure, and size. Page 37. The cytoplasm of an immature red cell is what color?
Blue, Salmon, Pink, Colorless`,
  `question: Describe immature red cells with regard to nucleus: cytoplasm ratio, cytoplasm, nuclear structure, and size. Page 38. The basophilic normoblast stage exhibits what feature around the nucleus?
Perinuclear HALO, A condensed nucleus, Orange-red cytoplasm, No nucleus`,
  `question: Describe immature red cells with regard to nucleus: cytoplasm ratio, cytoplasm, nuclear structure, and size. Page 39. The 'dawn of hemoglobinization' occurs in which stage of RBC maturation?
Polychromatophilic Normoblast, Pronormoblast, Basophilic Normoblast, Orthochromic Normoblast`,
  `question: Describe immature red cells with regard to nucleus: cytoplasm ratio, cytoplasm, nuclear structure, and size. Page 39. A dense velvet-appearing homogenous chromatin (pyknotic) nucleus is characteristic of what RBC stage?
Orthochromic Normoblast, Polychromatophilic Normoblast, Basophilic Normoblast, Pronormoblast`,
  `question: Describe immature red cells with regard to nucleus: cytoplasm ratio, cytoplasm, nuclear structure, and size. Page 40. A reticulocyte contains remnants of RNA that can be visualized with what stain?
New methylene blue stain, Wright's stain, Prussian blue stain, Gram stain`,
  `question: Describe effective and ineffective erythropoiesis. Page 41. What is the term for the destruction of red blood cell precursors in the bone marrow before they reach circulation?
Ineffective Erythropoiesis, Effective Erythropoiesis, Aplastic Anemia, Hemolytic Anemia`,
  `question: Describe effective and ineffective erythropoiesis. Page 41. The presence of polychromasia and nucleated RBCs on a peripheral smear are signs of what process?
Effective erythropoiesis, Ineffective erythropoiesis, Bone marrow failure, Leukemia`,
  `question: Describe the composition of the red cell membrane with regard to key proteins and lipids. Page 42. The RBC membrane is composed of 50% protein 10% cholesterol and what percentage of phospholipid?
40%, 20%, 30%, 50%`,
  `question: Describe the composition of the red cell membrane with regard to key proteins and lipids. Page 42. The outer layer of the trilaminar RBC membrane contains what?
Glycolipids and glycoproteins, Cholesterol and phospholipids, The cytoskeleton, Integral proteins`,
  `question: Describe the composition of the red cell membrane with regard to key proteins and lipids. Page 42. The cytoskeleton of the RBC membrane is responsible for what property?
Deformability/elasticity, Antigen structure, Molecule transport, Cell signaling`,
  `question: Describe red cell metabolism with regard to energy needs. Page 43. Which metabolic pathway provides 90% of the ATP required to support the sodium-potassium pump in an RBC?
Embden-Meyerhof Pathway, Pentose Phosphogluconate Pathway, Methemoglobin Reductase Pathway, Krebs Cycle`,
  `question: Describe red cell metabolism with regard to energy needs. Page 43. Which pathway generates NADPH to protect the RBC against oxidative damage?
Pentose Phosphogluconate Pathway, Embden-Meyerhof Pathway, Methemoglobin Reductase Pathway, Rapoport-Luebering Shunt`,
  `question: Describe red cell metabolism with regard to energy needs. Page 43. Which pathway maintains hemoglobin iron in the Fe2+ (ferrous) state?
Methemoglobin Reductase Pathway, Embden-Meyerhof Pathway, Pentose Phosphogluconate Pathway, Glycolytic Pathway`,
  `question: Describe and calculate the red blood indices. Page 45. Which RBC index measures the average volume of one RBC?
Mean corpuscular volume (MCV), Mean corpuscular hemoglobin (MCH), Mean corpuscular hemoglobin content (MCHC), Red Blood Cell Distribution Width (RDW)`,
  `question: Describe and calculate the red blood indices. Page 45. What is the reference range for MCV?
80-100 fL, 27-31 pg, 32%-36%, 11.5-14.5%`,
  `question: Correlate RBC indices with RBC morphology based on Hqb Hct and RBC values. Page 46. A decreased MCV and MCHC corresponds to what RBC morphology?
Microcytic/Hypochromic, Normocytic/Normochromic, Macrocytic/Normochromic, Macrocytic/Hypochromic`,
  `question: Describe clinical conditions that cause valid shifts in the mean corpuscular volume. Page 47. What patient condition can create a FALSELY increased MCV?
Cold agglutinins, Transfusion therapy, Reticulocytosis, Hyperglycemia`,
  `question: Differentiate between microcyte and macrocyte to include clinical conditions due to variations in size. Page 47. What is the term for variation in the size of the RBCs?
Anisocytosis, Poikilocytosis, Polychromasia, Hypochromia`,
  `question: Differentiate between microcyte and macrocyte to include clinical conditions due to variations in size. Page 47. Iron deficiency anemia and thalassemia are clinical conditions associated with what cell size?
Microcytes, Macrocytes, Normocytes, Spherocytes`,
  `question: Differentiate between microcyte and macrocyte to include clinical conditions due to variations in size. Page 48. Megaloblastic anemia liver disease and alcoholism are clinical conditions associated with what cell size?
Macrocytes, Microcytes, Normocytes, Schistocytes`,
  `question: Identify the pathophysiology and clinical conditions that may lead to poikilocytosis. Page 49. Compact round RBCs that lack central pallor are known as what?
Spherocyte, Ovalocyte, Echinocyte, Acanthocyte`,
  `question: Identify the pathophysiology and clinical conditions that may lead to poikilocytosis. Page 50. Crescent-shaped cells that are rigid and inflexible are called what?
Drepanocyte (Sickle Cell), Codocyte (Target Cell), Dacrocyte (Tear drop cell), Keratocyte (Bite cell)`,
  `question: Describe the most common red cell inclusions and disease states in which they are observed. Page 51. Remnants of DNA that appear as round deep purple granules within an RBC are called what?
Howell-Jolly Bodies, Pappenheimer Bodies, Basophilic Stippling, Cabot's Ring`,
  `question: Relate clinical conditions to the variations of hemoglobin content in red blood cells. Page 52. What term describes RBCs with a faint blue color due to RNA?
Polychromic, Hypochromic, Normochromic, Anisochromic`,
  `question: Describe the clinical conditions that exhibit polychromatophilic cells and elevate the reticulocyte count. Page 52. Rapid blood loss and response to anemic stress will cause an elevation in what?
Reticulocyte Count, Platelet Count, White Blood Cell Count, Hematocrit`
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