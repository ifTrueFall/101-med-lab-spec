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
  `question: Describe the normal structural elements related to hemoglobin synthesis. Page 56. Heme synthesis occurs in the mitochondria and cytoplasm and involves incorporating what into a protoporphyrin ring?
An iron atom (Fe2+), A globin chain, A polypeptide chain, A carbon atom`,
  `question: Describe the normal structural elements related to hemoglobin synthesis. Page 56. Globin synthesis occurs on what cellular organelle via transcription of the genetic code?
The ribosomes, The mitochondria, The nucleus, The cytoplasm`,
  `question: Describe the normal structural elements related to hemoglobin synthesis. Page 56. Each complete hemoglobin molecule consists of how many heme structures?
Four, Two, Six, One`,
  `question: Describe the normal structural elements related to hemoglobin synthesis. Page 56. Each complete hemoglobin molecule consists of how many pairs of unlike globin chains?
Two pairs, One pair, Four pairs, Three pairs`,
  `question: Describe the normal structural elements related to hemoglobin synthesis. Page 56. An alpha-globin chain and a non-alpha globin chain bind to form what structure?
A heterodimer, A tetramer, A monomer, A polymer`,
  `question: Describe the normal structural elements related to hemoglobin synthesis. Page 56. Two heterodimers combine to form what final hemoglobin molecule structure?
A tetramer, A dimer, An octamer, A trimer`,
  `question: Describe the origin of hemoglobin synthesis in erythroid precursors. Page 56. Hemoglobin synthesis begins in which stage of RBC development?
Polychromatophilic normoblast stage, Pronormoblast stage, Basophilic normoblast stage, Mature Red Cell stage`,
  `question: Describe the origin of hemoglobin synthesis in erythroid precursors. Page 56. The beginning of hemoglobin synthesis in the polychromatophilic normoblast stage is known as what?
The dawn of hemoglobinization, The end of maturation, The start of hemolysis, The globin shift`,
  `question: Describe the origin of hemoglobin synthesis in erythroid precursors. Page 56. Hemoglobin synthesis ends in which stage of RBC development?
Reticulocyte stage, Mature Red Cell stage, Orthochromic normoblast stage, Polychromatophilic normoblast stage`,
  `question: Describe the origin of hemoglobin synthesis in erythroid precursors. Page 57. According to the table at which stage of RBC development does Hgb synthesis first appear?
Polychromatophilic normoblast, Basophilic normoblast, Pronormoblast, Reticulocyte`,
  `question: Describe the origin of hemoglobin synthesis in erythroid precursors. Page 57. According to the table is Hgb synthesis occurring in a mature red cell?
No, Yes, Only sometimes, Only in disease states`,
  `question: Describe the normal adult hemoglobins to include the chemical configuration and percentages of each. Page 57. What is the globin chain configuration of Hemoglobin A?
2 alpha and 2 beta, 2 alpha and 2 delta, 2 alpha and 2 gamma, 2 zeta and 2 epsilon`,
  `question: Describe the normal adult hemoglobins to include the chemical configuration and percentages of each. Page 57. What is the normal percentage range of Hemoglobin A in an adult?
95-98%, >60%, 20%, 3-5%`,
  `question: Describe the normal adult hemoglobins to include the chemical configuration and percentages of each. Page 57. What is the globin chain configuration of Hemoglobin F?
2 alpha and 2 gamma, 2 alpha and 2 beta, 2 alpha and 2 delta, 2 zeta and 2 gamma`,
  `question: Describe the normal adult hemoglobins to include the chemical configuration and percentages of each. Page 57. What is the normal percentage of Hemoglobin F in an adult?
<2%, >60%, 20%, 95-98%`,
  `question: Relate the shift from fetal hemoglobin to adult hemoglobin in terms of fetal to adult development. Page 57. Chromosome 16 contains the production genes for which globin chain?
Alpha (a) chain, Beta (B) chain, Gamma (y) chain, Delta (6) chain`,
  `question: Relate the shift from fetal hemoglobin to adult hemoglobin in terms of fetal to adult development. Page 57. Chromosome 11 contains the production genes for which globin chain?
Beta (B) chain, Alpha (a) chain, Zeta (Z) chain, Epsilon (e) chain`,
  `question: Relate the shift from fetal hemoglobin to adult hemoglobin in terms of fetal to adult development. Page 58. Embryonic hemoglobin is present up to what point post-conception?
About 3 months, About 6 months, About 9 months, Until birth`,
  `question: Relate the shift from fetal hemoglobin to adult hemoglobin in terms of fetal to adult development. Page 58. Fetal hemoglobin (Hgb F) is the primary hemoglobin from 3 months post-conception until what point?
About 6 months post-birth, About 3 months post-birth, Until 1 year of age, Until puberty`,
  `question: Relate the shift from fetal hemoglobin to adult hemoglobin in terms of fetal to adult development. Page 58. Adult hemoglobins begin to reach adult levels at about what age?
6 months, 1 year, 2 years, Birth`,
  `question: Describe hemoglobin function. Page 58. What is the primary function of hemoglobin?
Pick up oxygen from lungs and provide it to tissues, Fight infection, Form blood clots, Transport nutrients`,
  `question: Describe hemoglobin function. Page 58. Hemoglobin is able to perform its function due to its ability to do what with oxygen?
Reversibly bind, Irreversibly bind, Covalently bond, Oxidize`,
  `question: Describe hemoglobin function. Page 58. In addition to oxygen what waste product does hemoglobin pick up from tissues and transport to the lungs?
Carbon dioxide, Urea, Lactic acid, Ammonia`,
  `question: Describe hemoglobin function. Page 58. Hemoglobin also binds cellular waste such as acid (H+) and what other molecule?
2,3-diphosphoglycerate (2,3-DPG), Glucose, ATP, Iron`,
  `question: Describe hemoglobin function. Page 59. Normal blood pH balance is maintained by hemoglobin binding or releasing what?
H+ atoms, O2 molecules, CO2 molecules, 2,3-DPG`,
  `question: Outline the steps involved in oxygen delivery and the elimination of carbon dioxide. Page 59. In the lungs the release of CO2 from hemoglobin causes an allosteric change that allows hemoglobin to take on what shape?
Relaxed shape, Tense shape, Oxidized shape, Reduced shape`,
  `question: Outline the steps involved in oxygen delivery and the elimination of carbon dioxide. Page 59. The relaxed form of hemoglobin is also known as what?
Oxygenated or oxyhemoglobin, De-oxygenated or deoxyhemoglobin, Methemoglobin, Carboxyhemoglobin`,
  `question: Outline the steps involved in oxygen delivery and the elimination of carbon dioxide. Page 59. In the tissues the binding of H+ to hemoglobin causes it to take on what shape?
Tense shape, Relaxed shape, Linear shape, Globular shape`,
  `question: Outline the steps involved in oxygen delivery and the elimination of carbon dioxide. Page 59. The tense form of hemoglobin is also known as what?
De-oxygenated or deoxyhemoglobin, Oxygenated or oxyhemoglobin, Sulfhemoglobin, Fetal hemoglobin`,
  `question: Outline the steps involved in oxygen delivery and the elimination of carbon dioxide. Page 59. The tense shape of hemoglobin facilitates the release of O2 and allows what molecule to bind?
2,3-DPG, CO2, H+, Heme`,
  `question: Describe the oxygen dissociation curve in general terms. Page 59. What does the oxygen dissociation curve represent?
The relationship of O2 released from hemoglobin to the tissues based upon PO2, The rate of hemoglobin synthesis, The amount of iron in hemoglobin, The lifespan of a red blood cell`,
  `question: Describe the oxygen dissociation curve in general terms. Page 60. A shift to the right of the oxygen dissociation curve means that hemoglobin is what?
More likely to release oxygen to tissue, Less likely to release oxygen to tissue, Permanently bound to oxygen, Unable to bind oxygen`,
  `question: Describe the oxygen dissociation curve in general terms. Page 60. A shift to the right of the oxygen dissociation curve indicates what kind of oxygen affinity?
Lower O2 affinity, Higher O2 affinity, No change in O2 affinity, Irreversible O2 affinity`,
  `question: Describe the oxygen dissociation curve in general terms. Page 60. Which of the following conditions would cause a shift to the right in the oxygen dissociation curve?
Increased H+ (Acidosis), Decreased H+ (Alkalosis), Decreased CO2 levels, Lower body temperature`,
  `question: Describe the oxygen dissociation curve in general terms. Page 60. A shift to the left of the oxygen dissociation curve means that hemoglobin has what kind of oxygen affinity?
Higher O2 affinity, Lower O2 affinity, A neutral O2 affinity, A complete lack of O2 affinity`,
  `question: Describe the oxygen dissociation curve in general terms. Page 60. Which of the following conditions would cause a shift to the left in the oxygen dissociation curve?
Decreased 2,3-DPG, Increased CO2 levels, Increased H+ (Acidosis), Anemia`,
  `question: Differentiate the abnormal hemoglobins in terms of toxicity and oxygen capacity. Page 61. Abnormal hemoglobins can result from ingestion of harmful substances or what other cause?
Inherited defects, Bacterial infections, Viral infections, Nutritional deficiencies`,
  `question: Differentiate the abnormal hemoglobins in terms of toxicity and oxygen capacity. Page 61. What is the state of the iron atom in methemoglobin?
Ferric (Fe+3), Ferrous (Fe+2), Elemental (Fe), Oxidized (Fe+4)`,
  `question: Differentiate the abnormal hemoglobins in terms of toxicity and oxygen capacity. Page 61. The oxidized iron in methemoglobin is incapable of combining with what?
Oxygen, Carbon dioxide, Hydrogen, Globin`,
  `question: Differentiate the abnormal hemoglobins in terms of toxicity and oxygen capacity. Page 61. A build-up of methemoglobin in circulation can lead to what condition if the level is >10%?
Cyanosis, Jaundice, Pallor, Erythrocytosis`,
  `question: Differentiate the abnormal hemoglobins in terms of toxicity and oxygen capacity. Page 61. What is the abnormal hemoglobin formed by the binding of carbon monoxide to heme iron?
Carboxyhemoglobin, Methemoglobin, Sulfhemoglobin, Hemoglobin S`,
  `question: Differentiate the abnormal hemoglobins in terms of toxicity and oxygen capacity. Page 61. Hemoglobin's affinity for carbon monoxide is how many times greater than its affinity for oxygen?
200x, 100x, 50x, 10x`,
  `question: Differentiate the abnormal hemoglobins in terms of toxicity and oxygen capacity. Page 62. What abnormal hemoglobin is formed by the irreversible oxidation of hemoglobin by certain drugs like sulfonamides?
Sulfhemoglobin, Carboxyhemoglobin, Methemoglobin, Hemoglobin M`,
  `question: Differentiate the abnormal hemoglobins in terms of toxicity and oxygen capacity. Page 62. The oxygen affinity of sulfhemoglobin is how much lower than a normal hemoglobin?
100X lower, 200X lower, 10X lower, 2X lower`,
  `question: Describe terms associated with hemolytic anemia. Page 63. What is the definition of hemolysis?
Premature destruction of red blood cells, Normal destruction of aged red blood cells, Increased production of red blood cells, Decreased production of red blood cells`,
  `question: Describe hemolysis in terms of its effect on the bone marrow blood smear and blood chemistry. Page 63. In the bone marrow what is a clinical event or symptom of hemolysis?
Erythroid hyperplasia, Erythroid hypoplasia, Myeloid hyperplasia, Lymphoid hyperplasia`,
  `question: Describe hemolysis in terms of its effect on the bone marrow blood smear and blood chemistry. Page 63. An increase in polychromasia and the presence of spherocytes on a peripheral smear are signs of what?
Hemolysis, Infection, Inflammation, Iron deficiency`,
  `question: Describe hemolysis in terms of its effect on the bone marrow blood smear and blood chemistry. Page 63. An increased bilirubin and LDH along with a decreased haptoglobin are plasma chemistry findings in what process?
Hemolysis, Normal RBC production, Aplastic anemia, Polycythemia`,
  `question: Correlate extravascular and intravascular hemolysis with respect to organ of origin and laboratory diagnosis. Page 64. What type of hemolysis accounts for 90% of all hemolysis?
Extravascular Hemolysis, Intravascular Hemolysis, Mechanical Hemolysis, Immune Hemolysis`,
  `question: Correlate extravascular and intravascular hemolysis with respect to organ of origin and laboratory diagnosis. Page 64. Extravascular hemolysis occurs outside a blood vessel typically by macrophage ingestion in what organs?
Spleen liver bone marrow, Heart lungs kidneys, Brain spinal cord nerves, Stomach intestines colon`,
  `question: Correlate extravascular and intravascular hemolysis with respect to organ of origin and laboratory diagnosis. Page 65. What type of hemolysis accounts for 10% of all hemolysis and occurs within a blood vessel?
Intravascular Hemolysis, Extravascular Hemolysis, Osmotic Hemolysis, Autoimmune Hemolysis`,
  `question: Correlate extravascular and intravascular hemolysis with respect to organ of origin and laboratory diagnosis. Page 65. The presence of hemoglobinemia and hemoglobinuria are distinguishing conditions for what type of hemolysis?
Intravascular Lysis, Extravascular Lysis, Normal RBC destruction, Both types of lysis`,
  `question: Differentiate Intrinsic Red Cell Defect causes of anemia with the Extrinsic Red Cell causes. Page 66. Hemoglobinopathies red cell membrane defects and red cell enzyme defects are all examples of what?
Intrinsic Red Cell Defects, Extrinsic Red Cell Defects, Nutritional Deficiencies, Bone Marrow Failures`,
  `question: Differentiate Intrinsic Red Cell Defect causes of anemia with the Extrinsic Red Cell causes. Page 66. Autoimmune hemolytic anemia (AIHA) parasitic infections and venoms are all examples of what?
Extrinsic Red Cell Defects, Intrinsic Red Cell Defects, Inherited Disorders, Stem Cell Defects`,
  `question: Identify laboratory testing methods of hemoglobin to include the principle reference ranges and test interpretation. Page 67. The gravimetric method for Hgb screening involves dropping blood into a solution of what?
Copper sulfate (CuSO4), Sodium chloride (NaCl), Potassium cyanide (KCN), Distilled water`,
  `question: Identify laboratory testing methods of hemoglobin to include the principle reference ranges and test interpretation. Page 67. In the gravimetric method if a drop of blood falls to the bottom in 15 seconds it contains at least how much Hgb?
12.5 g/dL, 10.0 g/dL, 15.0 g/dL, 7.5 g/dL`,
  `question: Identify laboratory testing methods of hemoglobin to include the principle reference ranges and test interpretation. Page 67. The photometric method is based on Hgb's ability to combine with other substances and form what?
Pigments measured spectrophotometrically, Precipitates measured by weight, Agglutination measured visually, Clots measured by time`,
  `question: Identify laboratory testing methods of hemoglobin to include the principle reference ranges and test interpretation. Page 67. In the photometric method Drabkin's reagent oxidizes Hgb to methemoglobin which then combines with cyanide to form what stable pigment?
Cyanmethemoglobin, Oxyhemoglobin, Carboxyhemoglobin, Sulfhemoglobin`,
  `question: Identify laboratory testing methods of hemoglobin to include the principle reference ranges and test interpretation. Page 67. The cyanmethemoglobin pigment's concentration is measured at what wavelength using a spectrophotometer?
540 nm, 450 nm, 620 nm, 340 nm`,
  `question: Identify laboratory testing methods of hemoglobin to include the principle reference ranges and test interpretation. Page 67. Decreased hemoglobin values are seen in anemia while increased values are seen in what condition?
Polycythemia (erythrocytosis), Leukemia, Thrombocytopenia, Leukopenia`
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