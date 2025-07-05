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
`question: Describe the morphological classification of anemias to include the general symptoms. Page 71. A condition in which red blood cells are no longer able to supply oxygen to body tissues is called what?
Anemia, Polycythemia, Leukemia, Thrombocytosis`,
`question: Describe the morphological classification of anemias to include the general symptoms. Page 71. The morphological classification of anemia is based on what?
Red blood cell indices, Bone marrow response, Clinical symptoms, Patient physiology`,
`question: Describe the morphological classification of anemias to include the general symptoms. Page 71. A microcytic anemia is defined by an MCV less than what value?
80 fL, 100 fL, 90 fL, 120 fL`,
`question: Describe the morphological classification of anemias to include the general symptoms. Page 71. A hypochromic anemia is defined by an MCHC less than what value?
32%, 36%, 30%, 40%`,
`question: Describe the morphological classification of anemias to include the general symptoms. Page 71. Dyspnea angina pectoris and syncope are all general symptoms of what condition?
Anemia, Iron overload, Thalassemia, Infection`,
`question: Describe iron transport from ingestion to incorporation in hemoglobin. Page 72. In the body's iron cycle where is ferritin found?
Liver spleen skeletal muscle bone marrow, Only in the liver, Only in the bone marrow, In circulating red blood cells`,
`question: Describe iron transport from ingestion to incorporation in hemoglobin. Page 72. Iron and globin are recycled as a result of what process?
Red blood cell senescence, Daily dietary intake, Bone marrow production, Liver synthesis`,
`question: Describe iron transport from ingestion to incorporation in hemoglobin. Page 73. About how much of the iron ingested is actually absorbed?
10%, 50%, 90%, 100%`,
`question: Describe iron transport from ingestion to incorporation in hemoglobin. Page 73. The health of the gastric mucosa GERD and gastrectomy are all factors that affect what?
Iron absorption, Iron storage, Iron loss, Iron recycling`,
`question: Describe iron transport from ingestion to incorporation in hemoglobin. Page 73. Orange juice Vitamin C pickles and alcohol are all considered what?
Iron absorption enhancers, Iron absorption inhibitors, Sources of heme iron, Sources of non-heme iron`,
`question: Describe iron transport from ingestion to incorporation in hemoglobin. Page 73. Tea coffee oregano and milk are all considered what?
Iron absorption inhibitors, Iron absorption enhancers, High in dietary iron, Necessary for iron transport`,
`question: Identify the iron needs of children and adults. Page 74. Adults recycle what percentage of the iron used for RBC production?
95%, 70%, 50%, 100%`,
`question: Identify the iron needs of children and adults. Page 74. Women should absorb about how much iron per day?
0.2 to 2.0 mg/day, 1.0 mg/day, 0.5 mg/day, 5.0 mg/day`,
`question: Identify the iron needs of children and adults. Page 74. As an infant develops and rapidly gains weight there is a high demand for what?
Iron, Vitamin C, Vitamin B12, Folic acid`,
`question: Describe the pathophysiology and clinical symptoms of iron deficiency anemia. Page 75. In Stage I of Iron Deficiency Anemia (IDA) there is a continuum of iron depletion from what location?
Marrow, Liver, Spleen, Circulation`,
`question: Describe the pathophysiology and clinical symptoms of iron deficiency anemia. Page 75. A fully developed case of IDA with microcytes and hypochromia in the peripheral circulation is what stage?
Stage III, Stage I, Stage II, Pre-anemia`,
`question: Describe the pathophysiology and clinical symptoms of iron deficiency anemia. Page 75. Growth spurts in infants and pregnancy are examples of what cause of IDA pathophysiology?
Increased demands, Lack of Iron intake, Blood Loss, Nutritional deficiency`,
`question: Describe the pathophysiology and clinical symptoms of iron deficiency anemia. Page 75. IDA is what percentage of all anemia in the US?
50%, 25%, 75%, 10%`,
`question: Describe the pathophysiology and clinical symptoms of iron deficiency anemia. Page 75. Fatigue pallor vertigo and dyspnea are all clinical symptoms of what condition?
Iron Deficiency Anemia, Hereditary Hemochromatosis, Thalassemia, Sideroblastic Anemia`,
`question: Describe the pathophysiology and clinical symptoms of iron deficiency anemia. Page 76. Cravings for abnormal substances like dirt or ice is a unique symptom of IDA known as what?
Pica, Cheilitis, Koilonychia, Vertigo`,
`question: Describe the pathophysiology and clinical symptoms of iron deficiency anemia. Page 76. The spooning of the nail beds is a unique symptom of IDA known as what?
Koilonychia, Cheilitis, Pica, Pallor`,
`question: Correlate the laboratory findings of an individual with iron deficiency anemia. Page 76. Which of the following is one of the most sensitive indicators of iron stores?
Serum Ferritin, Serum Iron, Transferrin, TIBC`,
`question: Correlate the laboratory findings of an individual with iron deficiency anemia. Page 76. What is the plasma protein used as an iron transport vehicle?
Transferrin, Ferritin, Hemosiderin, Albumin`,
`question: Correlate the laboratory findings of an individual with iron deficiency anemia. Page 76. The availability of binding sites on transferrin is measured by what test?
Total Iron Binding Capacity (TIBC), Serum Ferritin, Serum Iron, Transferrin Saturation`,
`question: Correlate the laboratory findings of an individual with iron deficiency anemia. Page 77. The peripheral smear in a patient with IDA will show what RBC morphology?
Microcytic hypochromic cells, Macrocytic normochromic cells, Normocytic normochromic cells, Spherocytes`,
`question: Correlate the laboratory findings of an individual with iron deficiency anemia. Page 77. In Iron Deficiency Anemia how is the Total Iron Binding Capacity (TIBC) typically affected?
Elevated, Decreased, Normal, Absent`,
`question: Describe the iron overload conditions. Page 78. What type of anemia is characterized by an accumulation of iron in the mitochondria?
Sideroblastic Anemias, Iron Deficiency Anemia, Thalassemia, Megaloblastic Anemia`,
`question: Describe the iron overload conditions. Page 78. In Sideroblastic Anemia a Prussian blue stain of the bone marrow reveals iron deposits in RBC precursors called what?
Ringed sideroblasts, Siderotic granules, Pappenheimer bodies, Howell-Jolly bodies`,
`question: Describe the iron overload conditions. Page 78. The presence of Pappenheimer bodies in a Wright's stain is associated with what condition?
Sideroblastic Anemias, Iron Deficiency Anemia, Thalassemia Major, Hereditary Hemochromatosis`,
`question: Describe the pathophysiology and clinical symptoms of hereditary hemochromatosis. Page 79. Hereditary Hemochromatosis (HH) is what type of genetic disorder?
An autosomal recessive disorder, An autosomal dominant disorder, A sex-linked disorder, A chromosomal abnormality`,
`question: Describe the pathophysiology and clinical symptoms of hereditary hemochromatosis. Page 79. HH is caused by an abnormal gene called HFE which affects what process?
Iron absorption, Iron excretion, Globin synthesis, Heme synthesis`,
`question: Describe the pathophysiology and clinical symptoms of hereditary hemochromatosis. Page 79. In HH the abnormal HFE gene causes iron to be continuously placed into where?
Storage, Circulation, Urine, Feces`,
`question: Describe the pathophysiology and clinical symptoms of hereditary hemochromatosis. Page 79. Chronic fatigue cirrhosis of the liver hyperpigmentation and diabetes are all clinical symptoms of what disorder?
Hereditary Hemochromatosis, Iron Deficiency Anemia, Sideroblastic Anemia, Thalassemia`,
`question: Correlate the laboratory findings and clinical management of individuals with hereditary hemochromatosis. Page 80. In a patient with Hereditary Hemochromatosis what is the expected result for serum ferritin?
Elevated, Decreased, Normal, Absent`,
`question: Correlate the laboratory findings and clinical management of individuals with hereditary hemochromatosis. Page 80. In Hereditary Hemochromatosis the transferrin saturation level is expected to be what?
Elevated, Decreased, Normal, Variable`,
`question: Correlate the laboratory findings and clinical management of individuals with hereditary hemochromatosis. Page 80. What is a primary treatment for Hereditary Hemochromatosis?
Therapeutic phlebotomy, Iron supplements, Blood transfusion, Vitamin C therapy`,
`question: Describe the basic defects in the thalassemia syndromes. Page 81. Thalassemia syndromes result from a lack of production of what?
Alpha or beta globin chains, Heme molecules, Iron, Vitamin B12`,
`question: Describe the basic defects in the thalassemia syndromes. Page 81. The red blood cells in thalassemia may develop to have what morphology?
Microcytic anemia and hypochromasia, Macrocytic anemia, Normocytic anemia, Spherocytic anemia`,
`question: Describe the basic defects in the thalassemia syndromes. Page 81. The iron status in a patient with thalassemia is typically what?
Not linked to an iron problem, Severely deficient, Severely overloaded, Slightly elevated`,
`question: Describe the alpha thalassemic conditions with regard to gene deletions and clinical symptoms. Page 82. The four alpha thalassemia conditions are a result of a deletion of one or more what?
Alpha genes, Beta genes, Gamma genes, Delta genes`,
`question: Describe the alpha thalassemic conditions with regard to gene deletions and clinical symptoms. Page 82. Which alpha thalassemia condition is characterized by a complete absence of alpha globin chain synthesis?
Bart's hydrops fetalis, Hemoglobin H disease, Alpha thalassemia trait, Silent carrier`,
`question: Describe the alpha thalassemic conditions with regard to gene deletions and clinical symptoms. Page 82. Hgb Bart's is created with four of which type of globin chain?
Gamma globin (y4), Beta globin (B4), Alpha globin (a4), Delta globin (64)`,
`question: Describe the alpha thalassemic conditions with regard to gene deletions and clinical symptoms. Page 82. What is the clinical outcome for Bart's hydrops fetalis?
Incompatible with life, Mild anemia, Asymptomatic, Requires transfusions`,
`question: Describe the alpha thalassemic conditions with regard to gene deletions and clinical symptoms. Page 83. Hemoglobin H disease is a result of how many alpha gene deletions?
3 gene deletions, 4 gene deletions, 2 gene deletions, 1 gene deletion`,
`question: Describe the alpha thalassemic conditions with regard to gene deletions and clinical symptoms. Page 83. In Hemoglobin H disease Hgb H is formed which consists of four of what globin chain?
Beta globin (B4), Gamma globin (y4), Alpha globin (a4), Delta globin (64)`,
`question: Describe the alpha thalassemic conditions with regard to gene deletions and clinical symptoms. Page 83. When stained with a supravital stain RBCs with Hgb H inclusions resemble what?
A pitted golf ball, A target, A sickle, A teardrop`,
`question: Describe the alpha thalassemic conditions with regard to gene deletions and clinical symptoms. Page 84. A patient with two functional alpha genes has which condition?
Alpha thalassemia trait, Hemoglobin H disease, Bart's hydrops fetalis, Silent carrier`,
`question: Describe the alpha thalassemic conditions with regard to gene deletions and clinical symptoms. Page 84. What is the clinical expression of the alpha thalassemia silent carrier state?
Hematologically normal, Severe anemia, Mild anemia, Incompatible with life`,
`question: Describe the beta thalassemic conditions with regard to gene mutations clinical symptoms and treatment. Page 85. Beta thalassemia major also known as Cooley's anemia results from what genetic state?
Homozygous, Heterozygous, Gene deletion, Chromosomal translocation`,
`question: Describe the beta thalassemic conditions with regard to gene mutations clinical symptoms and treatment. Page 85. In Beta Thalassemia Major an imbalance of what globin chains causes them to precipitate inside the red cell?
Alpha chains, Beta chains, Gamma chains, Delta chains`,
`question: Describe the beta thalassemic conditions with regard to gene mutations clinical symptoms and treatment. Page 85. The RBC life span in Beta Thalassemia Major is decreased to how many days?
7-22 days, 30-60 days, 60-90 days, 120 days`,
`question: Describe the beta thalassemic conditions with regard to gene mutations clinical symptoms and treatment. Page 85. What abnormal hemoglobin is seen on electrophoresis in Beta Thalassemia Major?
Hgb F, Hgb H, Hgb Bart's, Hgb A`,
`question: Describe the beta thalassemic conditions with regard to gene mutations clinical symptoms and treatment. Page 85. Patients with Beta Thalassemia Major often require transfusions which can lead to what complication?
Iron overload, Iron deficiency, Vitamin B12 deficiency, Folic acid deficiency`,
`question: Describe the beta thalassemic conditions with regard to gene mutations clinical symptoms and treatment. Page 86. Which type of beta thalassemia is a not well-defined subset of thalassemia major where problems develop later in life?
Beta Thalassemia Intermedia, Beta Thalassemia Trait (Minor), Beta Thalassemia Major, Silent Carrier`,
`question: Describe the beta thalassemic conditions with regard to gene mutations clinical symptoms and treatment. Page 86. Beta Thalassemia Trait (Minor) is a heterozygous condition that often mimics what other anemia?
Iron Deficiency Anemia (IDA), Megaloblastic anemia, Sideroblastic anemia, Anemia of chronic disease`,
`question: Describe the beta thalassemic conditions with regard to gene mutations clinical symptoms and treatment. Page 86. In contrast to IDA what CBC parameter is typically increased in Beta Thalassemia Trait?
RBC count, MCV, MCHC, RDW`,
`question: Describe the beta thalassemic conditions with regard to gene mutations clinical symptoms and treatment. Page 86. What RBC inclusion may be seen in Beta Thalassemia Trait?
Basophilic stippling, Howell-Jolly bodies, Pappenheimer bodies, Heinz bodies`,
`question: Describe the beta thalassemic conditions with regard to gene mutations clinical symptoms and treatment. Page 85. Changes in facial structures and pathological fractures are symptoms of what severe condition?
Beta Thalassemia Major, Beta Thalassemia Trait, Alpha Thalassemia Trait, Silent Carrier`,
`question: Correlate the laboratory findings and clinical management of individuals with hereditary hemochromatosis. Page 80. A serum ferritin level >300 ug/L and a transferrin saturation >60% are indicative of what disorder?
Hereditary Hemochromatosis (HH), Iron Deficiency Anemia (IDA), Thalassemia, Sideroblastic Anemia`
]

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