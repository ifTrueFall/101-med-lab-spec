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
`question: Which RBC variation is described as compact small dense and round with no central pallor?
Spherocyte, Ovalocyte, Echinocyte, Acanthocyte`,
`question: Hereditary spherocytosis and hemolytic anemia with antibody-coated cells are associated with which RBC shape?
Spherocyte, Drepanocyte, Codocyte, Stomatocyte`,
`question: An increased hemoglobin content and a lack of the bi-concave shape are characteristic of what cell?
Spherocyte, Schistocyte, Keratocyte, Dacrocyte`,
`question: Post-transfusion reactions can sometimes lead to the appearance of which RBC morphology?
Spherocyte, Elliptocyte, Codocyte, Drepanocyte`,
`question: Which RBC variation is described as oval or egg-shaped?
Ovalocyte, Elliptocyte, Spherocyte, Stomatocyte`,
`question: Which RBC variation is described as being more pencil-shaped?
Elliptocyte, Ovalocyte, Dacrocyte, Drepanocyte`,
`question: Thalassemia and megaloblastic anemia are associated with which RBC shape variation?
Ovalocytes, Spherocytes, Echinocytes, Schistocytes`,
`question: Hereditary elliptocytosis which involves an abnormal spectrin protein is associated with what RBC shape?
Elliptocytes, Acanthocytes, Stomatocytes, Dacrocytes`,
`question: A patient with iron deficiency anemia might show which pencil-shaped RBCs on a peripheral smear?
Elliptocytes, Drepanocytes, Keratocytes, Ovalocytes`,
`question: Which RBC variation has rounded spicules evenly distributed over its entire surface?
Echinocyte, Acanthocyte, Schistocyte, Keratocyte`,
`question: Echinocytes are generally seen due to technical error during slide manufacturing or what other cause?
Increased hypertonic solutions of saline, Hereditary enzyme defects, Post-splenectomy, Liver disease`,
`question: Hypernatremia renal disease and severe burns are all associated with which RBC morphology?
Echinocyte, Acanthocyte, Stomatocyte, Spherocyte`,
`question: Which RBC variation has irregularly spaced blunt spicules?
Acanthocyte, Echinocyte, Schistocyte, Drepanocyte`,
`question: Liver diseases alcoholism and post-splenectomy states are associated with which irregularly spiculated RBC?
Acanthocyte, Echinocyte, Dacrocyte, Ovalocyte`,
`question: A deficiency in what vitamin can lead to the formation of acanthocytes?
Vitamin E, Vitamin K, Vitamin B12, Vitamin C`,
`question: What are extremely fragmented cells that are usually bizarre looking called?
Schistocyte, Spherocyte, Keratocyte, Acanthocyte`,
`question: The presence of schistocytes should alert for immediate medical evaluation and can be seen in what condition?
Disseminated Intravascular Coagulation (DIC), Iron deficiency anemia, Thalassemia, Liver disease`,
`question: Fragmentation of RBCs due to artificial heart valves can lead to the formation of what cell type?
Schistocyte, Spherocyte, Stomatocyte, Codocyte`,
`question: Which crescent-shaped cells are rigid and inflexible with two pointed ends?
Drepanocyte (Sickle Cell), Dacrocyte (Tear drop cell), Elliptocyte, Keratocyte`,
`question: Sickle cell anemia is associated with the presence of Hemoglobin S and what characteristic RBC shape?
Drepanocyte, Codocyte, Spherocyte, Stomatocyte`,
`question: Which hypochromic cells resemble targets due to an increased central pallor?
Codocyte (Target Cell), Spherocyte, Stomatocyte, Echinocyte`,
`question: Codocytes (Target Cells) have an excess of what in relation to the amount of hemoglobin present?
Cell membrane, Cytoplasm, Iron stores, RNA remnants`,
`question: What cell is considered the hallmark cell of liver disease?
Codocyte (Target Cell), Acanthocyte, Stomatocyte, Schistocyte`,
`question: Besides liver disease Hemoglobin C disease post-splenectomy and iron deficiency anemia are associated with what cell?
Codocyte (Target Cell), Drepanocyte, Spherocyte, Dacrocyte`,
`question: Which cells are described as being pear or teardrop shaped with an elongated tail at one end?
Dacrocyte (Tear drop cell), Drepanocyte (Sickle Cell), Elliptocyte, Keratocyte`,
`question: Dacrocytes are often seen when red blood cells pass through what organ?
The spleen, The liver, The kidney, The bone marrow`,
`question: Thalassemia and iron deficiency are two conditions associated with what teardrop-shaped cell?
Dacrocyte, Stomatocyte, Codocyte, Spherocyte`,
`question: Which cells are described as half-moon shaped with two or more spicules?
Keratocyte (Bite cell or Helmet cell), Schistocyte, Acanthocyte, Echinocyte`,
`question: Glucose-6-Phosphate Dehydrogenase (G6PD) deficiency is associated with what cell morphology?
Keratocyte, Drepanocyte, Spherocyte, Ovalocyte`,
`question: Besides G6PD deficiency pulmonary embolism and DIC can be associated with what cell shape?
Keratocyte, Dacrocyte, Codocyte, Stomatocyte`,
`question: Which RBCs have elongated areas of central pallor that look like a mouth or slit?
Stomatocyte, Spherocyte, Codocyte, Ovalocyte`,
`question: Chronic liver disease due to alcoholism can lead to the formation of what cell?
Stomatocyte, Drepanocyte, Keratocyte, Dacrocyte`,
`question: Besides liver disease what hereditary condition is associated with stomatocytes?
Hereditary stomatocytosis, Hereditary elliptocytosis, Thalassemia, Sickle cell anemia`,
`question: What are the RBC inclusions composed of remnants of DNA?
Howell-Jolly Bodies, Pappenheimer Bodies, Basophilic Stippling, Cabot's Ring`,
`question: Howell-Jolly bodies appear as round deep purple granules and are typically located where in the cytoplasm?
Eccentrically, Centrally, Peripherally, Throughout`,
`question: A single Howell-Jolly Body is often seen after what surgical procedure?
The spleen is removed, A blood transfusion, Heart valve replacement, Liver transplant`,
`question: The presence of multiple Howell-Jolly bodies in red blood cells is indicative of what condition?
Megaloblastic anemia, Iron deficiency anemia, Sickle cell anemia, Thalassemia`,
`question: What are the small beaded blue-purple granules of free iron located along the RBC periphery?
Pappenheimer Bodies, Howell-Jolly Bodies, Basophilic Stippling, Heinz Bodies`,
`question: Pappenheimer bodies can be distinguished from Howell-Jolly bodies by using what specific stain?
Prussian blue stain (an iron stain), Wright's stain, New methylene blue stain, Crystal violet stain`,
`question: Hereditary Hemochromatosis and iron-loading anemias are associated with what iron-containing inclusions?
Pappenheimer Bodies, Howell-Jolly Bodies, Basophilic Stippling, Cabot's Ring`,
`question: Dark blue granules that appear as a result of RNA and mitochondrial remnants are called what?
Basophilic Stippling, Pappenheimer Bodies, Howell-Jolly Bodies, Heinz Bodies`,
`question: The granules of basophilic stippling are located where in the cytoplasm?
Throughout the cytoplasm, Only on the periphery, Eccentrically, Only in the center`,
`question: Lead poisoning or Thalassemia may be indicated by the presence of what RBC inclusion?
Basophilic Stippling, Cabot's Ring, Heinz Bodies, Howell-Jolly Bodies`,
`question: Which rare RBC inclusion is described as a thin twisted figure-8 threadlike strand?
Cabot's Ring, Heinz Bodies, Pappenheimer Bodies, Basophilic Stippling`,
`question: Cabot's rings are very rare but can be seen in what toxic condition?
Lead poisoning, Iron overload, Alcoholism, Renal disease`,
`question: What are stained aggregates of denatured precipitated hemoglobin called?
Heinz Bodies, Howell-Jolly Bodies, Pappenheimer Bodies, Cabot's Ring`,
`question: Heinz bodies are not seen in Wright's stain but require what type of stain to be visualized?
Crystal violet or brilliant cresyl blue, Prussian blue, New methylene blue, Giemsa stain`,
`question: Heinz bodies are usually taken out of the RBC by what organ?
The spleen, The liver, The bone marrow, The kidney`,
`question: G6PD deficiency and Alpha Thalassemia are associated with what hemoglobin-based inclusion?
Heinz Bodies, Cabot's Ring, Howell-Jolly Bodies, Pappenheimer Bodies`,
`question: The Plasmodium species parasite develops within RBCs and causes what disease?
Malaria, Babesiosis, Leishmaniasis, Trypanosomiasis`,
`question: What is the defining characteristic of a spherocyte's appearance?
No central pallor, A large central pallor, A sickle shape, A teardrop shape`,
`question: Abnormally shaped spectrin is the cause of what condition associated with elliptocytes?
Hereditary elliptocytosis, Hereditary spherocytosis, Thalassemia, Iron deficiency anemia`,
`question: A slide made with an error in manufacturing might artifactually create what cell type?
Echinocyte, Spherocyte, Drepanocyte, Schistocyte`,
`question: Which poikilocyte's presence should alert for immediate medical evaluation?
Schistocyte, Ovalocyte, Echinocyte, Stomatocyte`,
`question: Sickle cell anemia is caused by the presence of what abnormal hemoglobin?
Hemoglobin S, Hemoglobin C, Fetal Hemoglobin, Hemoglobin A2`,
`question: Which RBC inclusion is composed of free iron not bound by hemoglobin?
Pappenheimer Bodies, Howell-Jolly Bodies, Basophilic Stippling, Heinz Bodies`,
`question: Which poikilocyte is described as having an elongated tail at one end?
Dacrocyte (Tear drop cell), Elliptocyte, Drepanocyte, Stomatocyte`,
`question: Which inclusion is a result of rushed RBC maturation?
Howell-Jolly Bodies, Pappenheimer Bodies, Heinz Bodies, Cabot's Ring`,
`question: Which poikilocyte is considered the hallmark cell of liver disease and is also seen in Hemoglobin C disease?
Codocyte (Target Cell), Spherocyte, Schistocyte, Drepanocyte`
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