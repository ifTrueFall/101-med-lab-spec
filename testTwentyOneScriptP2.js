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
  `Describe the general functions of white blood cells as components of the immune system. Page 40. The entire leukocytic cell system is designed to defend the body against what?
Disease, Antigens, Allergens, Toxins`,
  `Describe the general functions of white blood cells as components of the immune system. Page 41. Leukocytes can be functionally divided into the general categories of granulocyte monocyte-macrophage and what other category?
lymphocyte-plasma cell, erythrocyte-megakaryocyte, thrombocyte-platelet, reticulocyte-normoblast`,
  `Describe the general functions of white blood cells as components of the immune system. Page 41. Which cells are considered the primary phagocytic cells?
PMN leukocytes and monocytes-macrophages, B cells and T cells, Basophils and Eosinophils, Plasma cells and Lymphocytes`,
  `Describe the general functions of white blood cells as components of the immune system. Page 41. What is the first step in the process of phagocytosis?
Chemotaxis, Adherence, Engulfment, Digestion`,
  `Describe the general functions of white blood cells as components of the immune system. Page 41. Neutrophils eosinophils and basophils are subdivisions of which leukocyte type?
Granulocytic cells, Mononuclear cells, Lymphocytic cells, Plasma cells`,
  `Describe the general functions of white blood cells as components of the immune system. Page 41. Which cells represent the only immunologically specific cellular components of the immune system?
Lymphocytes, Macrophages, Neutrophils, Basophils`,
  `Describe the general functions of white blood cells as components of the immune system. Page 41. The adaptive component of immunity is organized around which two specialized cell classes?
T lymphocytes and B lymphocytes, Neutrophils and Eosinophils, Monocytes and Macrophages, Basophils and Mast cells`,
  `Describe the function of primary and secondary lymphoid tissue. Page 42. In mammals which organs are classified as primary lymphoid organs?
Bone marrow and thymus, Spleen and lymph nodes, GALT and BALT, Liver and blood`,
  `Describe the function of primary and secondary lymphoid tissue. Page 42. Which of the following is considered a secondary lymphoid tissue?
Spleen, Thymus, Bone marrow, Fetal liver`,
  `Describe the function of primary and secondary lymphoid tissue. Page 42. Which of the following is NOT listed as a secondary lymphoid tissue?
Kidney, Lymph nodes, Spleen, Blood`,
  `Describe the function of primary and secondary lymphoid tissue. Page 42. GALT and BALT are examples of what type of tissue?
Secondary lymphoid tissue, Primary lymphoid tissue, Connective tissue, Epithelial tissue`,
  `Describe the functions of T and B lymphocytes in immunity. Page 42. Which cells are responsible for recognizing foreign antigens?
Lymphocytes, Macrophages, Neutrophils, Monocytes`,
  `Describe the functions of T and B lymphocytes in immunity. Page 42. In which organ do T cells mature?
Thymus gland, Bone marrow, Spleen, Liver`,
  `Describe the functions of T and B lymphocytes in immunity. Page 42. T cells are responsible for which type of immune response?
Cellular immune responses, Humoral immune responses, Innate immune responses, Allergic responses`,
  `Describe the functions of T and B lymphocytes in immunity. Page 42. What are antibody-synthesizing cells called?
Plasma cells, T cells, Macrophages, Monocytes`,
  `Describe the functions of T and B lymphocytes in immunity. Page 42. What is the primary function of plasma cells?
Synthesis and excretion of immunoglobulins, Phagocytosis of bacteria, Regulation of antibody reactions, Antigen presentation`,
  `Describe the functions of T and B lymphocytes in immunity. Page 42. Plasma cells arise as the end stage of differentiation for which cell type?
B-cell, T-cell, Monocyte, Neutrophil`,
  `Describe the functions of T and B lymphocytes in immunity. Page 42. Plasma cells are not normally found in the circulating blood but are found where?
Bone marrow, Spleen, Lymph nodes, Thymus`,
  `Describe the functions of T and B lymphocytes in immunity. Page 43. Both B and T cells mature into what are called as effector cells which are the functional units of what?
The immune system, The nervous system, The endocrine system, The circulatory system`,
  `Describe the complement activation pathways. Page 43. How do complement components normally circulate in the body?
In inactive form, In active form, Bound to antibodies, Within red blood cells`,
  `Describe the complement activation pathways. Page 43. Which pathway is activated by the binding of an antigen with an antibody like IgM or IgG?
The classical pathway, The alternative pathway, The lectin pathway, The extrinsic pathway`,
  `Describe the complement activation pathways. Page 43. Which pathway is activated by high molecular weight molecules on the surfaces of target cells?
The alternative pathway, The classical pathway, The lectin pathway, The intrinsic pathway`,
  `Describe the complement activation pathways. Page 43. The lectin pathway is activated by the attachment of plasma mannose-binding lectin (MBL) to what?
Microbes, Antibodies, T cells, Platelets`,
  `Describe the complement activation pathways. Page 43. In the lectin pathway MBL activates proteins of which other pathway?
Classical pathway, Alternative pathway, Coagulation pathway, Fibrinolytic pathway`,
  `Describe the mechanisms and consequences of complement activation. Page 43. What is the basis for the sequential numbering of complement components C1 through C9?
Their discovery date, Their activation sequence, Their molecular weight, Their function`,
  `Describe the mechanisms and consequences of complement activation. Page 43. Factor B Factor D and Factor P are unique serum proteins found in which pathway?
Alternative pathway, Classical pathway, Lectin pathway, Intrinsic pathway`,
  `Describe the mechanisms and consequences of complement activation. Page 43. How are cleavage products of complement distinguished from their parent molecules?
By suffixes, By prefixes, By numbers, By colors`,
  `Describe the mechanisms and consequences of complement activation. Page 44. What is the purpose of inhibitory proteins in the complement system?
To modulate its own reactions, To enhance inflammation, To activate phagocytosis, To produce antibodies`,
  `Describe the mechanisms and consequences of complement activation. Page 44. Blood vessel dilation and increased vascular permeability are what type of consequences of complement activation?
Physiologic, Cellular, Pathologic, Genetic`,
  `Describe the mechanisms and consequences of complement activation. Page 44. Cytolysis opsonization and hemolysis are what type of consequences of complement activation?
Cellular, Physiologic, Systemic, Humoral`,
  `Describe the mechanisms and consequences of complement activation. Page 44. In blood banking what is the most important concern regarding complement's ability to produce?
Cell membrane lysis, Increased vascular permeability, Blood vessel dilation, Inflammation`,
  `Describe the biologic functions of the Complement system. Page 44. The biologic functions of the complement system fall into cell lysis by the MAC and what other general category?
Biologic effects of proteolytic fragments, Activation of T cells, Production of immunoglobulins, Enhancement of phagocytosis`,
  `Describe the biologic functions of the Complement system. Page 44. Which complex is responsible for the cell lysis function of complement?
Membrane attack complex (MAC), C1 complex, C3 convertase, C5 convertase`,
  `Describe the biologic functions of the Complement system. Page 44. The situation in which the MAC leads to osmotic lysis of a cell is also considered what?
The final step of complement activation, The first step of complement activation, A failure of the complement system, A regulatory mechanism`,
  `Describe the biologic functions of the Complement system. Page 44. The multiple other effects of complement in immunity and inflammation are mediated by what?
Proteolytic fragments, Intact C1 components, The MAC complex, Inhibitory proteins`,
  `Associate changes in complement levels to diagnostic evaluations. Page 44. Elevated complement levels are often associated with which condition?
Inflammatory conditions, Genetic defects, Autoimmune disorders, Chronic infections`,
  `Associate changes in complement levels to diagnostic evaluations. Page 45. Why are increased complement levels of limited clinical significance?
They are common and nonspecific, They are rare and specific, They are difficult to measure, They do not change with disease`,
  `Associate changes in complement levels to diagnostic evaluations. Page 45. Low levels of complement suggest that complement has been excessively activated or what else?
Is currently being consumed, Is being overproduced, Is inactive, Has mutated`,
  `Associate changes in complement levels to diagnostic evaluations. Page 45. The most frequent evaluation of complement is by assay of what specimen?
Serum/plasma, Urine, Cerebrospinal fluid, Saliva`,
  `Associate changes in complement levels to diagnostic evaluations. Page 45. Which method can be used to assess complement components like C3 and C4?
Nephelometry, Chromatography, Electrophoresis, Spectrophotometry`,
  `Associate changes in complement levels to diagnostic evaluations. Page 45. Evaluation of C3b and C3d components is useful in the investigation of what?
Hemolytic transfusion reactions, Acute bacterial infections, Viral hepatitis, Rheumatoid arthritis`,
  `Describe the clinical applications of C-reactive protein. Page 45. Acute-phase reactants are known as nonspecific indicators of what process?
An inflammatory process, An allergic reaction, A genetic defect, A metabolic disorder`,
  `Describe the clinical applications of C-reactive protein. Page 45. Which of the following is listed as an acute-phase reactant?
C-reactive protein, Albumin, Hemoglobin, Insulin`,
  `Describe the clinical applications of C-reactive protein. Page 45. C-reactive protein is prominent among acute-phase proteins due to its what?
Great sensitivity, Low cost, High specificity, Long half-life`,
  `Describe the clinical applications of C-reactive protein. Page 45. CRP is a direct and quantitative measure of what?
The acute-phase reaction, Antibody levels, T-cell count, Blood glucose`,
  `Describe the clinical applications of C-reactive protein. Page 45. CRP assessment is highly valuable in monitoring therapy and disease activity in which condition?
Rheumatoid arthritis, Diabetes mellitus, Hyperthyroidism, Chronic kidney disease`,
  `Describe the clinical applications of C-reactive protein. Page 46. An elevated CRP can signal infection many hours before what other test?
Bacterial culture confirmation, Complete blood count, Urinalysis, X-ray`,
  `Describe the clinical applications of C-reactive protein. Page 46. What is a strong predictor of cardiovascular events?
LDL cholesterol, CRP, ESR, WBC count`,
  `Describe the clinical applications of C-reactive protein. Page 46. Which of the following is another method used to detect inflammation?
Erythrocyte Sedimentation Rate, Prothrombin time, Blood urea nitrogen, Serum electrolytes`,
  `Describe the clinical applications of C-reactive protein. Page 46. The ESR is a nonspecific indicator of disease with increased sedimentation seen in acute and chronic inflammation and what else?
Malignancies, Allergies, Metabolic disorders, Nutritional deficiencies`,
  `Describe the clinical applications of C-reactive protein. Page 46. Despite being nonspecific which test is one of the most frequently performed for inflammatory diseases?
Erythrocyte Sedimentation Rate, C-reactive protein, White blood cell count, Complement C3 assay`,
  `Describe acute-phase reactant methods. Page 46. The C-Reactive Protein Rapid Latex Agglutination Test is based on what type of reaction?
Antigen-antibody reaction, Enzyme-substrate reaction, Polymerase chain reaction, Oxidation-reduction reaction`,
  `Describe acute-phase reactant methods. Page 46. In the CRP rapid latex agglutination test the patient serum contains CRP which acts as the what?
Antigen, Antibody, Enzyme, Substrate`,
  `Describe acute-phase reactant methods. Page 46. In the CRP rapid latex agglutination test what is coated onto the surface of the latex particles?
Antihuman (CRP) antibody, Human CRP antigen, Patient serum, Polystyrene`,
  `Describe acute-phase reactant methods. Page 46. What is the purpose of using coated latex particles in this test?
To enhance detection of agglutination, To stabilize the patient sample, To color the reaction, To measure enzyme activity`,
  `Describe acute-phase reactant methods. Page 46. CRP testing is used to evaluate and detect what general category of diseases?
Inflammatory diseases, Metabolic diseases, Genetic diseases, Cardiovascular diseases`,
  `Describe the general functions of white blood cells as components of the immune system. Page 41. What is the mononuclear phagocyte system widely distributed throughout the body?
A physiologic system, An endocrine system, A nervous system, A cardiovascular system`,
  `Describe the functions of T and B lymphocytes in immunity. Page 42. B1 cells are distinguished by which CD marker?
CD5, CD4, CD8, CD19`,
  `Describe the functions of T and B lymphocytes in immunity. Page 42. T lymphocytes are derived from bone marrow progenitor cells that mature where?
Thymus gland, Spleen, Liver, Lymph node`,
  `Describe the clinical applications of C-reactive protein. Page 46. Which disease is mentioned as being monitored by CRP assessment?
Crohn's disease, Celiac disease, Addison's disease, Cushing's syndrome`
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