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
`question: Describe megaloblastic anemia as a macrocytic anemia. Page 89. Megaloblastic anemia is caused by a deficiency in folic acid and/or what other vitamin?
Vitamin B12, Vitamin C, Vitamin D, Vitamin K`,
`question: Describe megaloblastic anemia as a macrocytic anemia. Page 89. The deficiency in Vitamin B12 or folic acid leads to impaired synthesis of what?
DNA, RNA, Protein, Heme`,
`question: Describe megaloblastic anemia as a macrocytic anemia. Page 89. A key feature of megaloblastic anemia is a Mean Corpuscular Volume (MCV) greater than what value?
110 fL, 100 fL, 90 fL, 80 fL`,
`question: Describe the pathway of vitamin B12 and folic acid from ingestion through incorporation into the red cell. Page 89. Liver meat fish eggs and dairy products are all dietary sources of what?
Vitamin B12, Folic Acid, Iron, Vitamin C`,
`question: Describe the pathway of vitamin B12 and folic acid from ingestion through incorporation into the red cell. Page 89. For transport through the stomach Vitamin B12 must combine with what substance?
Intrinsic factor (IF), Transcobalamin II (TCII), Salivary enzymes, Folic acid`,
`question: Describe the pathway of vitamin B12 and folic acid from ingestion through incorporation into the red cell. Page 90. After absorption into the plasma B12 forms a complex with what for transportation through circulation?
Transcobalamin II (TCII), Intrinsic factor (IF), Albumin, Haptoglobin`,
`question: Describe the pathway of vitamin B12 and folic acid from ingestion through incorporation into the red cell. Page 90. Green leafy vegetables fruit and broccoli are good dietary sources of what?
Folic acid, Vitamin B12, Heme iron, Vitamin D`,
`question: Describe the pathway of vitamin B12 and folic acid from ingestion through incorporation into the red cell. Page 90. Folic acid is reduced to methyl tetrahydrofolate (THF) by what enzyme in mucosal cells?
Dihydrofolate reductase, Homocysteine methyltransferase, Intrinsic factor, Salivary amylase`,
`question: Describe the pathway of vitamin B12 and folic acid from ingestion through incorporation into the red cell. Page 90. Flawed folate or Vitamin B12 metabolism can cause an accumulation of what which may lead to thrombosis?
Homocysteine, Methionine, Bilirubin, Uric acid`,
`question: Describe the pathway of vitamin B12 and folic acid from ingestion through incorporation into the red cell. Page 90. Vitamin B12 acts as a cofactor to help create what key component of DNA synthesis?
Thymidine triphosphate (TTP), Deoxyuridine triphosphate (DTP), Adenosine triphosphate (ATP), Guanosine triphosphate (GTP)`,
`question: List the causes of vitamin B12 and folic acid deficiency. Page 91. A dietary deficiency of Vitamin B12 is very rare but can be seen in what group of people?
Vegetarians/vegans, Alcoholics, Pregnant women, The elderly`,
`question: List the causes of vitamin B12 and folic acid deficiency. Page 91. Pregnancy and infancy are conditions that cause a deficiency in folic acid due to what?
Increased requirement, Lack of availability, Malabsorption, Dietary deficiency`,
`question: List the causes of vitamin B12 and folic acid deficiency. Page 91. A lack of intrinsic factor due to gastrectomy can lead to a deficiency in what?
Vitamin B12, Folic Acid, Iron, Vitamin C`,
`question: List the causes of vitamin B12 and folic acid deficiency. Page 91. The fish tapeworm (Diphyllobothrium latum) competes for which vitamin in the intestine?
Vitamin B12, Folic Acid, Thiamine, Niacin`,
`question: Describe red blood cell maturation during megaloblastic anemia and the morphological changes seen in the peripheral smear. Page 92. What is the term for the asynchronous maturation of red blood cell precursors seen in megaloblastic anemia?
Nuclear and cytoplasmic ages do not correspond, The nucleus develops faster than the cytoplasm, Ineffective erythropoiesis, Intramedullary hemolysis`,
`question: Describe red blood cell maturation during megaloblastic anemia and the morphological changes seen in the peripheral smear. Page 92. The premature destruction of red cell precursors before they enter circulation is known as what?
Ineffective Erythropoiesis, Effective Erythropoiesis, Aplastic Anemia, Myelodysplasia`,
`question: Describe red blood cell maturation during megaloblastic anemia and the morphological changes seen in the peripheral smear. Page 92. In megaloblastic anemia what is the typical myeloid:erythroid ratio in the bone marrow?
1:1 to 1:3, 3:1 to 4:1, 10:1, 1:10`,
`question: Describe red blood cell maturation during megaloblastic anemia and the morphological changes seen in the peripheral smear. Page 248. The peripheral smear in megaloblastic anemia often shows macrocytes and what other specific shape variation?
Macro-ovalocytes, Spherocytes, Schistocytes, Target cells`,
`question: Describe red blood cell maturation during megaloblastic anemia and the morphological changes seen in the peripheral smear. Page 92. In megaloblastic anemia a low reticulocyte count is also known as what?
Reticulocytopenia, Reticulocytosis, Pancytopenia, Leukopenia`,
`question: Describe red blood cell maturation during megaloblastic anemia and the morphological changes seen in the peripheral smear. Page 93. What morphological feature is an indicator of megaloblastic anemias in white blood cells?
Hypersegmented neutrophils, Toxic granulation, Dohle bodies, Auer rods`,
`question: Describe the clinical symptoms of a patient with megaloblastic anemia. Page 93. Glossitis a symptom of megaloblastic anemia is a sore or enlarged what?
Tongue, Spleen, Liver, Lymph node`,
`question: Describe the clinical symptoms of a patient with megaloblastic anemia. Page 93. Numbness and difficulties in balance and walking are what type of symptoms that may be seen in megaloblastic anemia?
Neurologic involvement, Gastrointestinal symptoms, Cardiac symptoms, Respiratory symptoms`,
`question: Describe the clinical symptoms of a patient with megaloblastic anemia. Page 93. Demyelination of peripheral nerves the spinal column and the brain can be a severe consequence of what deficiency?
Vitamin B12 deficiency, Folic acid deficiency, Iron deficiency, Vitamin C deficiency`,
`question: Describe pernicious anemia and its clinical and laboratory findings. Page 94. Pernicious anemia is caused by a lack of what which is significant in the absorption of Vitamin B12?
The intrinsic factor (IF), Transcobalamin II (TCII), Folic acid, Dihydrofolate reductase`,
`question: Describe pernicious anemia and its clinical and laboratory findings. Page 94. The clinical and hematological findings of pernicious anemia are similar to all what?
Megaloblastic anemias, Microcytic anemias, Hemolytic anemias, Aplastic anemias`,
`question: Describe the laboratory tests used in diagnosing megaloblastic anemia. Page 94. A Vitamin B12 value less than what level indicates the need for additional testing?
200 ng/L, 500 ng/L, 1000 ng/L, 100 ng/L`,
`question: Describe the laboratory tests used in diagnosing megaloblastic anemia. Page 94. Metabolites Methylmalonic Acid (MMA) and homocysteine are elevated when what vitamin is deficient?
Vitamin B12, Folic Acid, Vitamin B6, Thiamine`,
`question: Describe the laboratory tests used in diagnosing megaloblastic anemia. Page 95. Which antibodies are seen in 90% of patients during the initial diagnosis of pernicious anemia?
Parietal cell antibodies, Intrinsic Factor antibodies, Anti-nuclear antibodies, Anti-platelet antibodies`,
`question: Describe treatments for Megaloblastic anemias. Page 95. If a patient with pernicious anemia shows a good response to therapy what should be seen within 2 to 3 days?
Rapid reticulocyte response, A drop in MCV, Normalization of hemoglobin, Disappearance of hypersegmented neutrophils`,
`question: Describe treatments for Megaloblastic anemias. Page 95. For a patient with pernicious anemia is the treatment with Vitamin B12 typically short-term or lifelong?
Lifelong treatment, Short-term therapy, A one-time dose, A six-month course`,
`question: Differentiate the anemias macrocytic but are not megaloblastic. Page 96. What is the characteristic shape of macrocytes in megaloblastic anemia?
Large and oval, Large and round, Small and oval, Small and round`,
`question: Differentiate the anemias macrocytic but are not megaloblastic. Page 96. Round hypochromic macrocytes are a non-megaloblastic feature seen in alcoholism hypothyroidism and what other condition?
Liver disease, Pernicious anemia, Folic acid deficiency, Tropical Sprue`,
`question: Differentiate the anemias macrocytic but are not megaloblastic. Page 96. A blue-tinged macrocyte seen on a smear typically represents what type of cell?
Reticulocytes, Pronormoblasts, Orthochromic normoblasts, Mature RBCs`,
`question: Describe the red cell membrane defect in hereditary spherocytosis. Page 99. Hereditary Spherocytosis is common among which population?
Northern Europeans, Southeast Asians, West Africans, Mediterranean ethnicities`,
`question: Describe the red cell membrane defect in hereditary spherocytosis. Page 99. The defect in Hereditary Spherocytosis is represented by a deficiency in which membrane proteins?
Spectrin & Ankyrin, Stomatin & Band 3, Glycophorin A & B, Protein 4.2 & Adducin`,
`question: Describe the red cell membrane defect in hereditary spherocytosis. Page 99. The proteins spectrin and ankyrin are responsible for what characteristic of the red cell membrane?
Elasticity and deformability, Ion and gas transportation, Antigenic structure, Lipid bilayer stability`,
`question: Describe the red cell membrane defect in hereditary spherocytosis. Page 99. Spherocytes are formed in what organ?
The spleen, The bone marrow, The liver, The kidneys`,
`question: Relate the clinical findings and laboratory data to include red cell morphology in patients with hereditary spherocytosis. Page 100. The classic clinical triad for hereditary spherocytosis is anemia jaundice and what?
Splenomegaly, Hepatomegaly, Glossitis, Paresthesia`,
`question: Relate the clinical findings and laboratory data to include red cell morphology in patients with hereditary spherocytosis. Page 100. In 50% of patients with hereditary spherocytosis what is the MCHC value?
Greater than 36%, Less than 32%, Normal, Decreased`,
`question: Describe the osmotic fragility tests and its clinical usefulness. Page 100. What is the confirmatory test of choice for the diagnosis of Hereditary Spherocytosis?
Osmotic fragility test, Complete blood count, Serum bilirubin, Hemoglobin electrophoresis`,
`question: Describe the osmotic fragility tests and its clinical usefulness. Page 100. Normal RBCs initially hemolyze at what salt concentration in the osmotic fragility test?
0.45% NaCl, 0.65% NaCl, 0.85% NaCl, 0.0% NaCl`,
`question: Describe the osmotic fragility tests and its clinical usefulness. Page 100. RBCs from patients with Hereditary Spherocytosis are less able to tolerate an influx of water and lyse at what salt concentration?
0.65% NaCl, 0.45% NaCl, 0.85% NaCl, 0.25% NaCl`,
`question: Relate the red cell membrane defects clinical findings and laboratory data to include RBC morphology in hereditary stomatocytosis. Page 101. Hereditary Stomatocytosis is a rare hemolytic disorder involving a deficiency of what membrane protein?
Stomatin, Spectrin, Ankyrin, Band 3`,
`question: Relate the red cell membrane defects clinical findings and laboratory data to include RBC morphology in hereditary stomatocytosis. Page 101. Stomatocytosis can also be seen in patients with what rare blood type condition?
Rh null disease, Bombay phenotype, Kell null phenotype, Duffy null phenotype`,
`question: Relate the red cell membrane defects clinical findings and laboratory data to include RBC morphology of hereditary elliptocytosis (ovalocytosis). Page 101. Hereditary Elliptocytosis (HE) is due to a defective or deficient what?
Spectrin, Stomatin, Ankyrin, Band 3`,
`question: Relate the red cell membrane defects clinical findings and laboratory data to include RBC morphology of hereditary elliptocytosis (ovalocytosis). Page 102. What subtype of HE is prevalent in the Melanesia/Malaysian population and involves a Band 3 defect?
Southeast Asian Ovalocytosis, Common hereditary elliptocytosis, Spherocytic hereditary elliptocytosis, Hereditary pyropoikilocytosis`,
`question: Relate the red cell membrane defects clinical findings and laboratory data to include RBC morphology of hereditary elliptocytosis (ovalocytosis). Page 102. Southeast Asian Ovalocytosis provides mild protection against what parasitic infection?
Malaria, Babesiosis, Leishmaniasis, Trypanosomiasis`,
`question: Relate the red cell membrane defects clinical findings and laboratory data to include RBC morphology of hereditary elliptocytosis (ovalocytosis). Page 102. Which HE subtype is a cross between Hereditary Spherocytosis and Hereditary Elliptocytosis?
Spherocytic Hereditary Elliptocytosis, Common Hereditary Elliptocytosis, Southeast Asian Ovalocytosis, Hereditary Pyropoikilocytosis`,
`question: Relate the red cell membrane defects clinical findings and laboratory data to include RBC morphology of hereditary elliptocytosis (ovalocytosis). Page 103. Which HE subtype is rare and autosomal recessive unlike most other HE subtypes?
Hereditary Pyropoikilocytosis, Common Hereditary Elliptocytosis, Spherocytic Hereditary Elliptocytosis, Southeast Asian Ovalocytosis`,
`question: Describe the mutations and ethnic distinctions in pyruvate kinase deficiency. Page 104. Pyruvate kinase deficiency is a rare enzyme disorder of which metabolic pathway?
Embden-Meyerhof pathway, Pentose Phosphogluconate pathway, Methemoglobin Reductase pathway, Rapoport-Luebering shunt`,
`question: Describe the mutations and ethnic distinctions in pyruvate kinase deficiency. Page 104. In pyruvate kinase deficiency red blood cells are unable to generate what for membrane function?
ATP, NADPH, NADH, Reduced glutathione`,
`question: Describe the mutations and ethnic distinctions in glucose-6-phosphate dehydrogenase deficiency. Page 104. G6PD deficiency is the most common what in the world?
Enzyme deficiency, Membrane defect, Hemoglobinopathy, Vitamin deficiency`,
`question: Describe the mutations and ethnic distinctions in glucose-6-phosphate dehydrogenase deficiency. Page 104. G6PD is a key part of the phosphogluconate pathway and helps prevent what?
Oxidative stress, ATP depletion, Membrane loss, Iron overload`,
`question: Describe the mutations and ethnic distinctions in glucose-6-phosphate dehydrogenase deficiency. Page 105. What is the inheritance pattern of G6PD deficiency?
X-linked recessive, Autosomal dominant, Autosomal recessive, X-linked dominant`,
`question: Describe the mutations and ethnic distinctions in glucose-6-phosphate dehydrogenase deficiency. Page 105. One of the four clinical conditions of G6PD deficiency occurs within hours of contact with what food?
Fava beans, Peanuts, Soybeans, Shellfish`,
`question: Describe the mutations and ethnic distinctions in glucose-6-phosphate dehydrogenase deficiency. Page 105. In drug-induced acute hemolytic anemia due to G6PD deficiency the peripheral smear may show what characteristic cells?
Bite cells, Sickle cells, Target cells, Spherocytes`,
`question: Describe the mutations and ethnic distinctions in glucose-6-phosphate dehydrogenase deficiency. Page 106. Why should G6PD deficiency testing not be performed during a hemolytic episode?
The result may be falsely normal, The enzyme is unstable, The sample will be hemolyzed, The test is inaccurate`,
`question: Describe the general characteristics of the hemoglobinopathies. Page 109. Hemoglobinopathies are a group of genetic disorders characterized by the creation of abnormal hemoglobin causing what?
Hemolysis, Iron deficiency, B12 deficiency, Bone marrow failure`,
`question: Describe the general characteristics of the hemoglobinopathies. Page 109. What is the most common type of defect in globin chain production that results in a hemoglobinopathy?
Single amino acid substitution, Fusion of hemoglobin chains, Extension of amino acid chain, Abnormal synthesis of a chain`
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