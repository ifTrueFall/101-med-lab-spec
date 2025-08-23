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
  `question: Describe the chronic myeloproliferative disorders. Page 169. Chronic Myeloproliferative Disorders are considered clonal malignancies of what cell?
Hematopoietic stem cell, B-lymphocyte, T-lymphocyte, Plasma cell`,
  `question: Describe the chronic myeloproliferative disorders. Page 169. In the context of CMPDs what does the term clonal mean?
Unregulated proliferation, Regulated proliferation, Atypical maturation, Normal development`,
  `question: Describe the chronic myeloproliferative disorders. Page 169. Which of the following is classified as a Chronic Myeloproliferative Disorder?
Polycythemia Vera, Acute Myeloid Leukemia, Multiple Myeloma, Hairy Cell Leukemia`,
  `question: Describe the chronic myeloproliferative disorders. Page 169. Myelofibrosis with Myeloid Metaplasia (MMM) is a synonymous term for which disorder?
Primary Myelofibrosis, Polycythemia Vera, Essential thrombocythemia, Chronic myelogenous leukemia`,
  `question: Describe the chronic myeloproliferative disorders. Page 170. Many Chronic Myeloproliferative Disorders are known to terminate as what condition?
Acute myelogenous leukemia, Chronic lymphocytic leukemia, Multiple myeloma, Aplastic anemia`,
  `question: Identify the major cell lines involved with the Chronic Myeloproliferative Disorders (CMPD). Page 170. Which cell line is primarily affected in Chronic Myelogenous Leukemia (CML)?
Granulocytic, Erythrocytic, Megakaryocytic, Fibroblast`,
  `question: Identify the major cell lines involved with the Chronic Myeloproliferative Disorders (CMPD). Page 170. Which cell line is primarily affected in Polycythemia Vera (PV)?
Erythrocytic, Granulocytic, Megakaryocytic, Fibroblast`,
  `question: Identify the major cell lines involved with the Chronic Myeloproliferative Disorders (CMPD). Page 170. Which cell line is primarily affected in Essential Thrombocythemia (ET)?
Megakaryocytic, Erythrocytic, Granulocytic, Fibroblast`,
  `question: Identify the major cell lines involved with the Chronic Myeloproliferative Disorders (CMPD). Page 170. Which cell line is primarily affected in Primary Myelofibrosis (PMF/IMF)?
Fibroblast, Erythrocytic, Granulocytic, Megakaryocytic`,
  `question: Describe the pathogenesis clinical features peripheral blood smear and bone marrow abnormalities diagnostic criteria cytogenetic abnormalities and treatment of Chronic Myelogenous Leukemia. Page 171. What cytogenetic abnormality is found in 90-95% of CML cases?
Philadelphia chromosome, JAK2 mutation, Trisomy 21, Monosomy 7`,
  `question: Describe the pathogenesis clinical features peripheral blood smear and bone marrow abnormalities diagnostic criteria cytogenetic abnormalities and treatment of Chronic Myelogenous Leukemia. Page 171. The Philadelphia chromosome results from a translocation between which two chromosomes?
22 and 9, 8 and 21, 15 and 17, 14 and 18`,
  `question: Describe the pathogenesis clinical features peripheral blood smear and bone marrow abnormalities diagnostic criteria cytogenetic abnormalities and treatment of Chronic Myelogenous Leukemia. Page 171. The BCR-ABL1 hybrid gene formed in CML leads to increased activity of what enzyme?
Tyrosine kinase, DNA polymerase, RNA polymerase, Helicase`,
  `question: Describe the pathogenesis clinical features peripheral blood smear and bone marrow abnormalities diagnostic criteria cytogenetic abnormalities and treatment of Chronic Myelogenous Leukemia. Page 171. One of the diagnostic criteria for CML is a WBC count greater than what value?
50000/cu mm, 20000/cu mm, 100000/cu mm, 10000/cu mm`,
  `question: Describe the pathogenesis clinical features peripheral blood smear and bone marrow abnormalities diagnostic criteria cytogenetic abnormalities and treatment of Chronic Myelogenous Leukemia. Page 172. The Leukocyte Alkaline Phosphatase (LAP) score is used to differentiate CML from what condition?
Leukemoid reaction, Polycythemia Vera, Aplastic anemia, An infection`,
  `question: Describe the pathogenesis clinical features peripheral blood smear and bone marrow abnormalities diagnostic criteria cytogenetic abnormalities and treatment of Chronic Myelogenous Leukemia. Page 172. What would be the expected LAP score for a patient with CML?
<13, 20-100, >100, 150`,
  `question: Describe the pathogenesis clinical features peripheral blood smear and bone marrow abnormalities diagnostic criteria cytogenetic abnormalities and treatment of Chronic Myelogenous Leukemia. Page 172. What are the three defined phases of CML?
Chronic Accelerated Blast, Initial Progressive Terminal, Latent Active Remission, Early Middle Late`,
  `question: Describe the pathogenesis clinical features peripheral blood smear and bone marrow abnormalities diagnostic criteria cytogenetic abnormalities and treatment of Chronic Myelogenous Leukemia. Page 172. What percentage of blasts in the peripheral blood or bone marrow defines the blast phase of CML?
Greater than 20%, Less than 5%, 5% - 20%, 10%`,
  `question: Describe the pathogenesis clinical features peripheral blood smear and bone marrow abnormalities diagnostic criteria cytogenetic abnormalities and treatment of Chronic Myelogenous Leukemia. Page 173. What is the median survival for a patient diagnosed with CML?
4-6 years, <1 year, >10 years, 2-3 months`,
  `question: Describe the pathogenesis clinical features peripheral blood smear and bone marrow abnormalities diagnostic criteria cytogenetic abnormalities and treatment of Chronic Myelogenous Leukemia. Page 173. One of the primary goals of CML treatment is to obtain a negative result for what?
pH chromosome, LAP score, JAK2 mutation, Blood culture`,
  `question: Describe the pathogenesis clinical features peripheral blood smear and bone marrow abnormalities diagnostic criteria cytogenetic abnormalities and treatment of Polycythemia Vera. Page 173. What genetic mutation is found in 90-95% of patients with Polycythemia Vera?
JAK2, BCR-ABL1, p53, FLT3`,
  `question: Describe the pathogenesis clinical features peripheral blood smear and bone marrow abnormalities diagnostic criteria cytogenetic abnormalities and treatment of Polycythemia Vera. Page 173. The mutation in Polycythemia Vera leads to increased RBC production that is independent of what hormone?
Erythropoietin, Thrombopoietin, G-CSF, Insulin`,
  `question: Describe the pathogenesis clinical features peripheral blood smear and bone marrow abnormalities diagnostic criteria cytogenetic abnormalities and treatment of Polycythemia Vera. Page 173. The significantly increased red blood cell count in Polycythemia Vera leads to what condition?
Hyperviscosity, Anemia, Leukopenia, Thrombocytopenia`,
  `question: Describe the pathogenesis clinical features peripheral blood smear and bone marrow abnormalities diagnostic criteria cytogenetic abnormalities and treatment of Polycythemia Vera. Page 174. What is the most significant finding used to diagnose Polycythemia Vera?
Increase RCM, Decreased RCM, Normal RCM, Absence of RCM`,
  `question: Describe the pathogenesis clinical features peripheral blood smear and bone marrow abnormalities diagnostic criteria cytogenetic abnormalities and treatment of Polycythemia Vera. Page 174. A patient with PV who has an increased count in RBCs WBCs and platelets is said to have what?
Pancytosis, Panmyelosis, Pancytopenia, Panhyperplasia`,
  `question: Describe the pathogenesis clinical features peripheral blood smear and bone marrow abnormalities diagnostic criteria cytogenetic abnormalities and treatment of Polycythemia Vera. Page 174. What is the primary treatment for Polycythemia Vera which aims to decrease the hematocrit?
Therapeutic phlebotomy, Chemotherapy, Radiation, Bone marrow transplant`,
  `question: Describe the pathogenesis clinical features peripheral blood smear and bone marrow abnormalities diagnostic criteria cytogenetic abnormalities and treatment of Polycythemia Vera. Page 174. An increase in hematocrit due to low plasma volume from dehydration is called what?
Relative erythrocytosis, Secondary erythrocytosis, Absolute erythrocytosis, True erythrocytosis`,
  `question: Describe the pathogenesis clinical features peripheral blood smear and bone marrow abnormalities diagnostic criteria cytogenetic abnormalities and treatment of Polycythemia Vera. Page 174. What is the median survival for patients with Polycythemia Vera?
More than 10 years, 3-5 years, 4-6 years, Less than 1 year`,
  `question: Describe the pathogenesis clinical features peripheral blood smear and bone marrow abnormalities diagnostic criteria cytogenetic abnormalities and treatment of Primary Myelofibrosis (PMF). Page 175. The initial stage of Primary Myelofibrosis is characterized by what feature in the bone marrow?
Hypercellular bone marrow, Hypocellular bone marrow, Fibrotic bone marrow, Aplastic bone marrow`,
  `question: Describe the pathogenesis clinical features peripheral blood smear and bone marrow abnormalities diagnostic criteria cytogenetic abnormalities and treatment of Primary Myelofibrosis (PMF). Page 175. The later fibrotic stage of PMF is characterized by marked reticulin or collagen fibrosis and what CBC finding?
Pancytopenia, Pancytosis, Normal CBC, Erythrocytosis`,
  `question: Describe the pathogenesis clinical features peripheral blood smear and bone marrow abnormalities diagnostic criteria cytogenetic abnormalities and treatment of Primary Myelofibrosis (PMF). Page 175. What is the term for hematopoiesis that occurs in the spleen and liver due to a fibrotic bone marrow?
Extramedullary hematopoiesis, Medullary hematopoiesis, Ineffective hematopoiesis, Dyshematopoiesis`,
  `question: Describe the pathogenesis clinical features peripheral blood smear and bone marrow abnormalities diagnostic criteria cytogenetic abnormalities and treatment of Primary Myelofibrosis (PMF). Page 176. What characteristic red blood cell morphology is a key feature on the peripheral smear of a patient with PMF?
Teardrop cells, Sickle cells, Spherocytes, Target cells`,
  `question: Describe the pathogenesis clinical features peripheral blood smear and bone marrow abnormalities diagnostic criteria cytogenetic abnormalities and treatment of Primary Myelofibrosis (PMF). Page 176. What is a common result of a bone marrow aspiration procedure in a patient with PMF due to fibrosis?
Dry tap, Bloody tap, Clear aspirate, Paucicellular aspirate`,
  `question: Describe the pathogenesis clinical features peripheral blood smear and bone marrow abnormalities diagnostic criteria cytogenetic abnormalities and treatment of Primary Myelofibrosis (PMF). Page 176. Which of the CMPDs has the worst prognosis with a median survival of 3-5 years?
PMF, CML, PV, ET`,
  `question: Describe the pathogenesis clinical features peripheral blood smear and bone marrow abnormalities diagnostic criteria cytogenetic abnormalities and treatment of Primary Myelofibrosis (PMF). Page 177. What is a cytoreductive therapy used in PMF to control leukocytosis and thrombocytosis?
Hydroxyurea, Aspirin, Phlebotomy, Penicillin`,
  `question: Describe the pathogenesis clinical features peripheral blood smear and bone marrow abnormalities diagnostic criteria cytogenetic abnormalities and treatment of Essential Thrombocythemia. Page 177. Essential Thrombocythemia is a clonal disorder where the main increase is in which cell line?
Megakaryocytes, Granulocytes, Erythrocytes, Monocytes`,
  `question: Describe the pathogenesis clinical features peripheral blood smear and bone marrow abnormalities diagnostic criteria cytogenetic abnormalities and treatment of Essential Thrombocythemia. Page 177. Patients with Essential Thrombocythemia experience both hemorrhagic and what other type of episodes?
Thrombotic, Infectious, Anemic, Febrile`,
  `question: Describe the pathogenesis clinical features peripheral blood smear and bone marrow abnormalities diagnostic criteria cytogenetic abnormalities and treatment of Essential Thrombocythemia. Page 178. What is the hallmark diagnostic criteria for Essential Thrombocythemia?
Unexplained elevated platelet count, Elevated RBC mass, Philadelphia chromosome, Teardrop cells`,
  `question: Describe the pathogenesis clinical features peripheral blood smear and bone marrow abnormalities diagnostic criteria cytogenetic abnormalities and treatment of Essential Thrombocythemia. Page 178. To diagnose ET and rule out CML what must be absent?
Philadelphia Chromosome, JAK2 mutation, Teardrop RBCs, Increased RBC mass`,
  `question: Describe the pathogenesis clinical features peripheral blood smear and bone marrow abnormalities diagnostic criteria cytogenetic abnormalities and treatment of Essential Thrombocythemia. Page 178. To diagnose ET and rule out PMF what must be absent?
Teardrop RBCs, Philadelphia Chromosome, Increased RBC mass, Hgb > 13g/dL`,
  `question: Describe the pathogenesis clinical features peripheral blood smear and bone marrow abnormalities diagnostic criteria cytogenetic abnormalities and treatment of Essential Thrombocythemia. Page 178. What emergency procedure can be performed to rapidly decrease the platelet count in severe cases of ET?
Plateletpheresis, Leukapheresis, Phlebotomy, Plasmapheresis`,
  `question: Describe the pathogenesis clinical features peripheral blood smear and bone marrow abnormalities diagnostic criteria cytogenetic abnormalities and treatment of Essential Thrombocythemia. Page 178. For 64-80% of patients with ET what is the survival rate?
10 years, 3-5 years, 4-6 years, >15 years`,
  `question: Correlate the clinical and laboratory features of the Chronic Myeloproliferative Disorders. Page 179. According to the differentiation table which CMPD presents with a markedly increased hematocrit?
PV, CML, PMF, ET`,
  `question: Correlate the clinical and laboratory features of the Chronic Myeloproliferative Disorders. Page 179. According to the differentiation table which CMPD is characterized by teardrop red blood cells?
PMF, CML, PV, ET`,
  `question: Correlate the clinical and laboratory features of the Chronic Myeloproliferative Disorders. Page 179. Based on the differentiation table a marked neutrophilia with a shift to the left is characteristic of which CMPD?
CML, PMF, PV, ET`,
  `question: Correlate the clinical and laboratory features of the Chronic Myeloproliferative Disorders. Page 179. Which CMPD's bone marrow is described as having increased fibrosis and often results in a dry tap?
PMF, CML, PV, ET`,
  `question: Correlate the clinical and laboratory features of the Chronic Myeloproliferative Disorders. Page 179. A platelet count greater than 600x10^9/L with no known cause for reactive thrombocytosis is a key criterion for which disorder?
ET, CML, PMF, PV`,
  `question: Correlate the clinical and laboratory features of the Chronic Myeloproliferative Disorders. Page 179. The presence of the Ph+ chromosome in 90-95% of cases is a diagnostic criterion for which CMPD?
CML, PMF, PV, ET`,
  `question: Correlate the clinical and laboratory features of the Chronic Myeloproliferative Disorders. Page 179. Excessive red blood cell production is the defining feature of which CMPD?
PV, CML, PMF, ET`,
  `question: Correlate the clinical and laboratory features of the Chronic Myeloproliferative Disorders. Page 179. A leukoerythroblastic picture with teardrop red blood cells on the peripheral smear is a classic finding for which disorder?
PMF, CML, PV, ET`,
  `question: Correlate the clinical and laboratory features of the Chronic Myeloproliferative Disorders. Page 179. In which two CMPDs is splenomegaly a consistent finding?
PMF and PV, CML and ET, CML and PV, PMF and ET`,
  `question: Describe the pathogenesis clinical features peripheral blood smear and bone marrow abnormalities diagnostic criteria cytogenetic abnormalities and treatment of Chronic Myelogenous Leukemia. Page 172. In the chronic phase of CML what is the M:E ratio in the bone marrow?
10:1, 3:1, 1:1, 25:1`,
  `question: Describe the pathogenesis clinical features peripheral blood smear and bone marrow abnormalities diagnostic criteria cytogenetic abnormalities and treatment of Polycythemia Vera. Page 174. A red or ruddy complexion seen in patients with PV is known as what?
Plethora, Jaundice, Cyanosis, Pallor`,
  `question: Describe the pathogenesis clinical features peripheral blood smear and bone marrow abnormalities diagnostic criteria cytogenetic abnormalities and treatment of Primary Myelofibrosis (PMF). Page 176. In PMF as the disease progresses what happens to the WBC RBC and platelet counts?
Decrease, Increase, Remain normal, Fluctuate wildly`,
  `question: Describe the pathogenesis clinical features peripheral blood smear and bone marrow abnormalities diagnostic criteria cytogenetic abnormalities and treatment of Essential Thrombocythemia. Page 178. A temporary elevation in platelet count due to acute infections is called what?
Reactive Thrombocytosis, Essential Thrombocythemia, Clonal Thrombocytosis, Pseudo Thrombocytosis`,
  `question: Correlate the clinical and laboratory features of the Chronic Myeloproliferative Disorders. Page 179. In which CMPD would you expect to find micro-megakaryocytes?
ET, CML, PMF, PV`,
  `question: Identify the major cell lines involved with the Chronic Myeloproliferative Disorders (CMPD). Page 1. According to the distribution chart which CMPD has the highest probability of transforming into ANLL?
CML, PV, ET, PMF`,
  `question: Correlate the clinical and laboratory features of the Chronic Myeloproliferative Disorders. Page 179. In the differentiation table which two disorders show a hypercellular bone marrow with megakaryocytic hyperplasia?
PMF and ET, CML and PV, PV and PMF, CML and ET`,
  `question: Describe the pathogenesis clinical features peripheral blood smear and bone marrow abnormalities diagnostic criteria cytogenetic abnormalities and treatment of Polycythemia Vera. Page 174. The most common causes of death in untreated PV patients are hemorrhage or what?
Thrombosis, Infection, Marrow failure, Kidney failure`,
  `question: Describe the pathogenesis clinical features peripheral blood smear and bone marrow abnormalities diagnostic criteria cytogenetic abnormalities and treatment of Essential Thrombocythemia. Page 178. What medication is used in ET to reduce the platelet count and risk of vaso-occlusion?
Hydroxyurea, Aspirin, Warfarin, Penicillin`,
  `question: Describe the pathogenesis clinical features peripheral blood smear and bone marrow abnormalities diagnostic criteria cytogenetic abnormalities and treatment of Chronic Myelogenous Leukemia. Page 171. The increased tyrosine kinase activity in CML prevents what cellular process leading to excess cell production?
Apoptosis, Mitosis, Meiosis, Phagocytosis`
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