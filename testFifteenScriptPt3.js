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
`question: Identify the amino acid substitution in sickle cell disorders. Page 110. In Hgb S the amino acid valine replaces what other amino acid on the 6th position of the beta globin chain?
Glutamic acid, Lysine, Leucine, Alanine`,
`question: Describe the inheritance patterns of the sickle disorders. Page 110. Sickle cell anemia follows what inheritance pattern?
Autosomal Co-dominant, Autosomal Recessive, Autosomal Dominant, X-Linked Recessive`,
`question: Describe the inheritance patterns of the sickle disorders. Page 110. The inheritance of one normal beta globin chain and one abnormal beta globin chain results in what?
Trait, Disease, No disorder, A carrier state only`,
`question: Describe the inheritance patterns of the sickle disorders. Page 110. A person with a heterozygous inheritance of Hgb S (genotype AS) has what condition?
Sickle Cell Trait, Sickle Cell Disease, Hemoglobin C Trait, Normal Hemoglobin`,
`question: Describe the inheritance patterns of the sickle disorders. Page 110. A homozygous inheritance of two abnormal Hgb S genes results in what condition?
Sickle Cell Disease, Sickle Cell Trait, Hemoglobin SC Disease, Thalassemia`,
`question: Describe the pathophysiology of the sickle disorders. Page 111. Hgb S forms long thin polymers in areas of what?
Low oxygenation, High oxygenation, High pH, Low temperature`,
`question: Describe the pathophysiology of the sickle disorders. Page 111. The polymerization of Hgb S causes the RBC to become what?
Rigid and inflexible, Soft and deformable, Larger in size, More resistant to lysis`,
`question: Describe the pathophysiology of the sickle disorders. Page 111. Besides low oxygenation what is another condition that may induce sickling?
Acidosis, Alkalosis, Hyperhydration, Normal body temperature`,
`question: Describe the pathophysiology of the sickle disorders. Page 111. The formation of rigid sickle cells can lead to what problem in blood vessels?
Obstruction and slowing of circulation, Increased blood flow, Vasodilation, Decreased viscosity`,
`question: Describe the physiological conditions that most typically affect individuals with sickle cell anemia. Page 111. Sickle cell disease is typically diagnosed between what ages?
6 months and 2 years, Birth and 6 months, 5 and 10 years, 15 and 20 years`,
`question: Describe the physiological conditions that most typically affect individuals with sickle cell anemia. Page 111. Recurrent painful attacks bacterial infections and deterioration of organ function are basic clinical considerations for what?
Sickle cell anemia, Sickle cell trait, Hemoglobin C trait, Thalassemia minor`,
`question: Describe the physiological conditions that most typically affect individuals with sickle cell anemia. Page 112. In sickle cell anemia the red blood cell life span is shortened to how many days?
10-20 days, 30-40 days, 60-90 days, 120 days`,
`question: Describe the physiological conditions that most typically affect individuals with sickle cell anemia. Page 112. The spleen initially enlarges in sickle cell anemia but eventually becomes fibrosed and shriveled in a process called what?
Autosplenectomy, Splenomegaly, Splenic sequestration, Hypersplenism`,
`question: Describe the physiological conditions that most typically affect individuals with sickle cell anemia. Page 112. A patient with sickle cell anemia is more susceptible to pneumonia and what other lung condition?
Acute chest syndrome, Asthma, Emphysema, Pulmonary fibrosis`,
`question: Describe the physiological conditions that most typically affect individuals with sickle cell anemia. Page 112. What is the trademark symptom of a vaso-occlusive episode in sickle cell anemia?
Painful crisis, Chronic fatigue, Jaundice, Fever`,
`question: Describe the physiological conditions that most typically affect individuals with sickle cell anemia. Page 112. The severity of symptoms in sickle cell disease depends on the genetic variations known as what?
Haplotypes, Genotypes, Phenotypes, Alleles`,
`question: Describe the physiological conditions that most typically affect individuals with sickle cell anemia. Page 113. According to the table which sickle cell haplotype is associated with the highest percent of Hgb F?
Senegal, Benin, Bantu, CAR`,
`question: Describe the treatment protocol for patients with sickle cell anemia. Page 113. What medication increases the production of Hgb F and is used to treat sickle cell disease?
Hydroxyurea, Penicillin, Ibuprofen, Folic acid`,
`question: Describe the treatment protocol for patients with sickle cell anemia. Page 113. Management of sickle cell disease includes prophylactic antibiotics and what other preventative measure?
Transfusion, Splenectomy, Bone marrow transplant, Iron chelation`,
`question: Identify the amino acid substitution in hemoglobin C disease. Page 113. In the formation of Hgb C the amino acid lysine replaces glutamic acid on the 6th position of which globin chain?
Beta globin chain, Alpha globin chain, Gamma globin chain, Delta globin chain`,
`question: Describe the clinical and laboratory findings of sickle cell anemia sickle cell trait Hemoglobin C disease Hemoglobin C trait and Hemoglobin SC disease. Page 113. A crisis smear in sickle cell disease will show polychromasia nRBCs sickle cells and what other morphology?
Target cells, Spherocytes, Stomatocytes, Echinocytes`,
`question: Describe the clinical and laboratory findings of sickle cell anemia sickle cell trait Hemoglobin C disease Hemoglobin C trait and Hemoglobin SC disease. Page 114. The dithionate solubility test is a screening test based on the principle that Hgb S does what in the reagent?
Precipitates, Dissolves, Changes color, Agglutinates`,
`question: Describe the clinical and laboratory findings of sickle cell anemia sickle cell trait Hemoglobin C disease Hemoglobin C trait and Hemoglobin SC disease. Page 114. Individuals with sickle cell trait are protected against what parasitic disease?
Malaria, Babesiosis, Leishmaniasis, Trypanosomiasis`,
`question: Describe the clinical and laboratory findings of sickle cell anemia sickle cell trait Hemoglobin C disease Hemoglobin C trait and Hemoglobin SC disease. Page 114. A person with sickle cell trait has approximately what percentage of Hgb A and Hgb S?
60% Hgb A and 40% Hgb S, 40% Hgb A and 60% Hgb S, 50% Hgb A and 50% Hgb S, 90% Hgb A and 10% Hgb S`,
`question: Describe the clinical and laboratory findings of sickle cell anemia sickle cell trait Hemoglobin C disease Hemoglobin C trait and Hemoglobin SC disease. Page 114. The presence of 'bars of gold' crystals is characteristic of what condition?
Hemoglobin C Disease, Hemoglobin SC Disease, Sickle Cell Anemia, Thalassemia`,
`question: Describe the clinical and laboratory findings of sickle cell anemia sickle cell trait Hemoglobin C disease Hemoglobin C trait and Hemoglobin SC disease. Page 115. A patient with no clinical complications but 40% target cells on their smear likely has what condition?
Hemoglobin C Trait, Hemoglobin C Disease, Sickle Cell Trait, Hemoglobin SC Disease`,
`question: Describe the clinical and laboratory findings of sickle cell anemia sickle cell trait Hemoglobin C disease Hemoglobin C trait and Hemoglobin SC disease. Page 115. What is the approximate percentage of Hgb S and Hgb C in Hemoglobin SC disease?
50% Hgb S and 50% Hgb C, 60% Hgb S and 40% Hgb C, 40% Hgb S and 60% Hgb C, 80% Hgb S and 20% Hgb C`,
`question: Describe the clinical and laboratory findings of sickle cell anemia sickle cell trait Hemoglobin C disease Hemoglobin C trait and Hemoglobin SC disease. Page 115. SC crystals described as 'Washington monument' or 'gloved hand' are unique identifiers for what disease?
Hemoglobin SC disease, Hemoglobin C Disease, Sickle Cell Anemia, Hemoglobin H disease`,
`question: Differentiate the clinical and laboratory findings of other abnormal hemoglobins such as hemoglobins E D Punjab G Phila and O Arab. Page 116. What is the 2nd most common hemoglobin variant world-wide seen in people from Southeast Asia?
Hemoglobin E, Hemoglobin C, Hemoglobin S, Hemoglobin D`,
`question: Differentiate the clinical and laboratory findings of other abnormal hemoglobins such as hemoglobins E D Punjab G Phila and O Arab. Page 116. Hgb D and Hgb G migrate in the same position as what other hemoglobin at alkaline electrophoresis?
Hgb S, Hgb C, Hgb A, Hgb F`,
`question: Differentiate the clinical and laboratory findings of other abnormal hemoglobins such as hemoglobins E D Punjab G Phila and O Arab. Page 116. Hgb O Arab must be distinguished from Hgb C using what method?
Citrate electrophoresis at pH 6.0, Alkaline electrophoresis at pH 8.6, Isoelectric focusing, HPLC`,
`question: Identify the features of Hemoglobin S as it relates to the thalassemias. Page 116. A patient with Hemoglobin S-Beta Thalassemia will have virtually no Hgb A and what type of RBC morphology?
Microcytic/hypochromic, Macrocytic/normochromic, Normocytic/normochromic, Spherocytic`,
`question: Summarize the general principles of acid and alkaline electrophoresis and isoelectric focusing. Page 117. Hemoglobin electrophoresis is based on the principle that hemoglobin migrates at different positions depending on what?
pH, Temperature, Globin chain size, Heme content`,
`question: Summarize the general principles of acid and alkaline electrophoresis and isoelectric focusing. Page 117. After electrophoresis the bands are quantified using what instrument?
Densitometry, Spectrophotometry, A microscope, A centrifuge`,
`question: Summarize the general principles of acid and alkaline electrophoresis and isoelectric focusing. Page 117. What is the method of choice for most newborn hemoglobin screening in the U.S.?
Isoelectric Focusing, Alkaline electrophoresis, Acid electrophoresis, Dithionate solubility test`,
`question: Identify hemoglobin patterns utilizing electrophoresis at pH 8.6 and 6.0. Page 118. On cellulose acetate at pH 8.6 which three hemoglobins migrate to the same position?
Hgb A2 C and E, Hgb S D and G, Hgb A F and S, Hgb C S and A`,
`question: Identify hemoglobin patterns utilizing electrophoresis at pH 8.6 and 6.0. Page 118. On cellulose acetate at pH 8.6 Hgb S migrates with what other two hemoglobins?
Hgb D and G, Hgb C and E, Hgb A and F, Hgb A2 and O`,
`question: Identify hemoglobin patterns utilizing electrophoresis at pH 8.6 and 6.0. Page 118. On citrate agar at pH 6.0 which hemoglobin is separated from the other variants and migrates by itself?
Hgb C, Hgb S, Hgb A, Hgb F`,
`question: Identify hemoglobin patterns utilizing electrophoresis at pH 8.6 and 6.0. Page 118. On citrate agar at pH 6.0 Hgb S separates from which two hemoglobins it travels with at alkaline pH?
Hgb D and G, Hgb C and E, Hgb A and F, Hgb A2 and O`,
`question: Describe the principle procedure and reference ranges of the spun microhematocrit. Page 121. What is the definition of a hematocrit?
The percentage of total blood volume occupied by erythrocytes, The weight of hemoglobin in red cells, The average volume of a single red cell, The number of red cells per liter`,
`question: Describe the principle procedure and reference ranges of the spun microhematocrit. Page 121. The microhematocrit is also known as what?
Packed red blood cell volume, Mean corpuscular volume, Red cell distribution width, Erythrocyte count`,
`question: Describe the principle procedure and reference ranges of the spun microhematocrit. Page 121. A capillary tube with a blue tip contains what?
EDTA, Heparin, No anticoagulant, Sodium Citrate`,
`question: Describe the principle procedure and reference ranges of the spun microhematocrit. Page 121. What is the normal hematocrit reference range for an adult male?
42-52%, 37-47%, 53-65%, 30-40%`,
`question: Describe the principle procedure and reference ranges of the spun microhematocrit. Page 121. For quality control a microhematocrit must be run in duplicate and the results must agree within what range?
+/- 1%, +/- 2%, +/- 5%, +/- 10%`,
`question: Describe the principle procedure reference ranges and factors affecting the modified Westergren Erythrocyte Sedimentation Rate (ESR) test. Page 123. What is the purpose of the ESR test?
It is a nonspecific screening test for inflammation, It is a specific test for anemia, It is a screening test for sickle cell, It is a confirmatory test for infection`,
`question: Describe the principle procedure reference ranges and factors affecting the modified Westergren Erythrocyte Sedimentation Rate (ESR) test. Page 123. The ESR is normal in angina pectoris but elevated in what other cardiac condition?
Myocardial infarction, Congestive heart failure, Atrial fibrillation, Hypertension`,
`question: Describe the principle procedure reference ranges and factors affecting the modified Westergren Erythrocyte Sedimentation Rate (ESR) test. Page 123. What is the required specimen for an ESR test?
Whole blood - EDTA, Serum, Plasma, Heparinized whole blood`,
`question: Describe the principle procedure reference ranges and factors affecting the modified Westergren Erythrocyte Sedimentation Rate (ESR) test. Page 124. How long should the Westergren tube stand vertically and undisturbed for an ESR test?
60 minutes, 30 minutes, 15 minutes, 2 hours`,
`question: Describe the principle procedure reference ranges and factors affecting the modified Westergren Erythrocyte Sedimentation Rate (ESR) test. Page 125. The ESR is directly proportional to plasma viscosity and what other factor?
RBC mass, RBC shape, RBC count, Hematocrit`,
`question: Describe the principle procedure reference ranges and factors affecting the modified Westergren Erythrocyte Sedimentation Rate (ESR) test. Page 125. The presence of abnormally shaped RBCs will cause the ESR to be what?
Decreased, Increased, Normal, Falsely elevated`,
`question: Describe the principle procedure reference ranges and factors affecting the modified Westergren Erythrocyte Sedimentation Rate (ESR) test. Page 125. Increased plasma fibrinogen and globulin levels which cause rouleaux will have what effect on the ESR?
Increased ESR, Decreased ESR, No effect on ESR, Variable ESR`,
`question: Describe the principle procedure reference ranges and factors affecting the manual reticulocyte count. Page 126. What is the principle of the reticulocyte count?
It is an index of bone marrow red blood cell production, It measures the amount of hemoglobin, It screens for inflammation, It detects sickle cells`,
`question: Describe the principle procedure reference ranges and factors affecting the manual reticulocyte count. Page 126. The RNA content in a reticulocyte can be observed using what type of stain?
Supravital stain, Wright's stain, Gram stain, Prussian blue stain`,
`question: Describe the principle procedure reference ranges and factors affecting the manual reticulocyte count. Page 126. New methylene blue is an example of what type of stain?
Supravital stain, Romanowsky stain, Acid-fast stain, Fluorescent stain`,
`question: Describe the principle procedure reference ranges and factors affecting the manual reticulocyte count. Page 126. The supravital stain precipitates the RNA to form dark-blue clusters and filaments called what?
Reticulum, Howell-Jolly bodies, Basophilic stippling, Pappenheimer bodies`,
`question: Describe the principle procedure reference ranges and factors affecting the manual reticulocyte count. Page 127. When performing a manual reticulocyte count how many total red blood cells are counted?
1000 cells, 100 cells, 500 cells, 2000 cells`,
`question: Describe the principle procedure reference ranges and factors affecting the manual reticulocyte count. Page 127. What is the normal reference range for an adult reticulocyte count?
0.5%-2.0%, 2.0%-6.0%, 0.1%-0.5%, 5.0%-10.0%`,
`question: Describe the principle procedure reference ranges and factors affecting the manual reticulocyte count. Page 127. Hemolytic anemias patients with hemorrhage and those undergoing iron therapy would have what kind of reticulocyte count?
Increased, Decreased, Normal, Variable`,
`question: Describe the principle procedure reference ranges and factors affecting the sickle cell screening test. Page 129. The sickle cell screening test is based on the principle that Hemoglobin S is what in the test reagent?
Insoluble, Soluble, Fluorescent, Colored`,
`question: Describe the principle procedure reference ranges and factors affecting the sickle cell screening test. Page 129. How is a positive sickle cell screening test interpreted?
Sample is turbid and lines are not visible, Sample is clear and lines are visible, Sample turns red, Sample forms a clot`,
`question: Describe the principle procedure reference ranges and factors affecting the sickle cell screening test. Page 130. A false negative result in a sickle cell screen may be caused by what condition?
Severe anemia, High plasma proteins, Recent transfusion, Polycythemia`
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