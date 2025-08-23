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
  `question: Define the common features of the chronic lymphoproliferative disorders. Page 183. Chronic lymphoproliferative disorders are clonal malignant proliferations of what cells?
B and T lymphocytes, Myeloid stem cells, Plasma cells, Erythroid precursors`,
  `question: Define the common features of the chronic lymphoproliferative disorders. Page 183. Which age group is primarily affected by chronic lymphoproliferative disorders?
Elderly, Children, Young adults, Infants`,
  `question: Define the common features of the chronic lymphoproliferative disorders. Page 183. Most complications associated with chronic lymphoproliferative disorders are related to what?
Compromised immune systems, Bone marrow failure, Organomegaly, Hyperviscosity`,
  `question: Describe the symptoms peripheral smear morphology and treatment of individuals with Chronic Lymphocytic Leukemia. Page 183. What is the most common type of chronic leukemia?
Chronic Lymphocytic Leukemia, Hairy Cell Leukemia, Chronic Myeloid Leukemia, Prolymphocytic Leukemia`,
  `question: Describe the symptoms peripheral smear morphology and treatment of individuals with Chronic Lymphocytic Leukemia. Page 183. Chronic Lymphocytic Leukemia is a clonal proliferation of which type of cells?
B lymphocytes, T lymphocytes, Plasma cells, Myeloblasts`,
  `question: Describe the symptoms peripheral smear morphology and treatment of individuals with Chronic Lymphocytic Leukemia. Page 183. What is the most common initial symptom of Chronic Lymphocytic Leukemia?
Lymphadenopathy, Bone pain, Fever, Bleeding`,
  `question: Describe the symptoms peripheral smear morphology and treatment of individuals with Chronic Lymphocytic Leukemia. Page 183. What is a common WBC count for a patient with CLL?
Over 100x10^9/L, Below 4x10^9/L, 20-30x10^9/L, 50-75x10^9/L`,
  `question: Describe the symptoms peripheral smear morphology and treatment of individuals with Chronic Lymphocytic Leukemia. Page 183. What is a characteristic finding on a peripheral smear of a patient with CLL?
Smudge cells, Auer rods, Döhle bodies, Toxic granulation`,
  `question: Describe the symptoms peripheral smear morphology and treatment of individuals with Chronic Lymphocytic Leukemia. Page 183. What is the predominant cell type seen on a peripheral smear in CLL?
Small lymphocytes, Lymphoblasts, Plasma cells, Atypical lymphocytes`,
  `question: Describe the symptoms peripheral smear morphology and treatment of individuals with Chronic Lymphocytic Leukemia. Page 184. What is a treatment used to reduce the lymphocyte burden in CLL?
Cytotoxic drugs, Antibiotics, Antiviral therapy, Blood transfusion`,
  `question: Identify the complications of chronic lymphocytic leukemias with respect to immunocompetency and bone marrow involvement. Page 184. In 80% of CLL cases which anti-apoptosis gene is present leading to longer-living dysfunctional B cells?
BCL2, p53, BRCA1, MYC`,
  `question: Identify the complications of chronic lymphocytic leukemias with respect to immunocompetency and bone marrow involvement. Page 184. In CLL the development of platelet antibodies can lead to what condition?
Idiopathic thrombocytopenic purpura, Autoimmune hemolytic anemia, Aplastic anemia, Pernicious anemia`,
  `question: Identify the complications of chronic lymphocytic leukemias with respect to immunocompetency and bone marrow involvement. Page 184. Between 10-30% of CLL cases develop into which autoimmune condition?
Autoimmune hemolytic anemia, Rheumatoid arthritis, Systemic lupus erythematosus, Multiple sclerosis`,
  `question: Identify the complications of chronic lymphocytic leukemias with respect to immunocompetency and bone marrow involvement. Page 184. A deficiency in immunoglobulins found in 50% of CLL patients is called what?
Hypogammaglobinemia, Hypergammaglobulinemia, Agammaglobulinemia, Dysgammaglobulinemia`,
  `question: Identify the complications of chronic lymphocytic leukemias with respect to immunocompetency and bone marrow involvement. Page 184. The accumulation of lymphocytes in the bone marrow in CLL causes anemia thrombocytopenia and what other condition?
Neutropenia, Polycythemia, Thrombocytosis, Leukocytosis`,
  `question: Describe the pertinent features of hairy cell leukemia to include clinical presentation peripheral smear and pertinent cytochemical stains. Page 184. Hairy cell leukemia is a rare malignancy of which cell type?
B cell, T cell, Plasma cell, Monocyte`,
  `question: Describe the pertinent features of hairy cell leukemia to include clinical presentation peripheral smear and pertinent cytochemical stains. Page 184. A key clinical finding in 80% of patients with hairy cell leukemia is a massively enlarged what?
Spleen, Liver, Lymph node, Kidney`,
  `question: Describe the pertinent features of hairy cell leukemia to include clinical presentation peripheral smear and pertinent cytochemical stains. Page 184. What is a common CBC finding in patients with hairy cell leukemia?
Pancytopenia, Leukocytosis, Thrombocytosis, Erythrocytosis`,
  `question: Describe the pertinent features of hairy cell leukemia to include clinical presentation peripheral smear and pertinent cytochemical stains. Page 185. What is the key morphological feature of cells in hairy cell leukemia?
Hair-like projections, Auer rods, Russell bodies, Reed-Sternberg cells`,
  `question: Describe the pertinent features of hairy cell leukemia to include clinical presentation peripheral smear and pertinent cytochemical stains. Page 185. When bone marrow cannot be aspirated due to being filled with fibrotic material this is known as a what?
Dry tap, Wet tap, Bloody tap, Clear tap`,
  `question: Describe the pertinent features of hairy cell leukemia to include clinical presentation peripheral smear and pertinent cytochemical stains. Page 185. What cytochemical stain is used to confirm a diagnosis of hairy cell leukemia?
TRAP, Myeloperoxidase, Sudan Black B, Non-specific esterase`,
  `question: Describe the pertinent features of hairy cell leukemia to include clinical presentation peripheral smear and pertinent cytochemical stains. Page 185. In the TRAP stain how do hairy cells react when tartrate acid is added?
Retain stain, Fade, Stain brighter, Do not stain`,
  `question: Describe the clinical features of Sezary syndrome. Page 185. Sézary syndrome is a lymphoma involving which type of cell?
T-cell, B-cell, Plasma cell, NK-cell`,
  `question: Describe the clinical features of Sezary syndrome. Page 185. What is the name of the cutaneous manifestation associated with Sézary syndrome?
Mycosis fungoides, Psoriasis, Eczema, Dermatitis herpetiformis`,
  `question: Describe the clinical features of Sezary syndrome. Page 185. What is a characteristic feature of the nucleus in a Sézary cell?
Ovoid clefted or folded, Round and smooth, Segmented, Kidney-bean shaped`,
  `question: Describe the clinical features of Sezary syndrome. Page 185. Due to their appearance Sézary cells may be mistaken for what other type of cell?
Monocytes, Lymphoblasts, Myelocytes, Promyelocytes`,
  `question: Describe the clinical features of Hodgkin's and Non-Hodgkin's Lymphoma. Page 186. Hodgkin's lymphoma has a bimodal incidence affecting males aged 14-40 and those over what age?
50, 60, 70, 80`,
  `question: Describe the clinical features of Hodgkin's and Non-Hodgkin's Lymphoma. Page 186. The diagnosis of Hodgkin's lymphoma is based on the presence of which characteristic cell in a lymph node biopsy?
Reed-Sternberg cell, Hairy cell, Sézary cell, Plasma cell`,
  `question: Describe the clinical features of Hodgkin's and Non-Hodgkin's Lymphoma. Page 186. The multinucleated Reed-Sternberg cell has a characteristic appearance that resembles what?
Owl's eye, A fried egg, A raspberry, A starry sky`,
  `question: Describe the clinical features of Hodgkin's and Non-Hodgkin's Lymphoma. Page 186. Which lymphoma is approximately three times more common than Hodgkin's lymphoma?
Non-Hodgkin's Lymphoma, T-cell lymphoma, B-cell lymphoma, Burkitt lymphoma`,
  `question: Describe the clinical features of Hodgkin's and Non-Hodgkin's Lymphoma. Page 186. Unlike Hodgkin's lymphoma Non-Hodgkin's lymphoma can spread to the skin liver spleen and which other systems?
GI and respiratory, Cardiovascular and endocrine, Nervous and urinary, Musculoskeletal and reproductive`,
  `question: Identify the morphological features of the plasma cell. Page 187. Plasma cells evolve from which type of lymphocyte?
B lymphocyte, T lymphocyte, NK cell, Atypical lymphocyte`,
  `question: Identify the morphological features of the plasma cell. Page 187. What term describes the typical location of the nucleus in a plasma cell?
Eccentric, Central, Lobulated, Bilobed`,
  `question: Identify the morphological features of the plasma cell. Page 187. The chromatin in a mature plasma cell is often organized in what structure?
Pinwheel, Lacy, Clumped, Smooth`,
  `question: Identify the morphological features of the plasma cell. Page 187. The cytoplasm of a plasma cell has a distinct color described as what?
Sea blue/cornflower, Pale lilac, Gray-blue, Robin's egg blue`,
  `question: Identify the morphological features of the plasma cell. Page 187. Plasma cells are responsible for producing what?
Immunoglobulins, Cytokines, Complement, Histamine`,
  `question: Identify the morphological features of the plasma cell. Page 187. Which immunoglobulin is associated with the primary immune response?
IgM, IgG, IgA, IgE`,
  `question: Identify the morphological features of the plasma cell. Page 187. Which immunoglobulin is associated with the secondary immune response and can cross the placenta?
IgG, IgM, IgD, IgE`,
  `question: Differentiate the clinical and laboratory findings of Multiple Myeloma and Waldenström's Macroglobulinemia. Page 187. Multiple Myeloma is a malignant disorder characterized by the overproduction of what cells?
Plasma cells, Lymphocytes, Myeloblasts, Monocytes`,
  `question: Differentiate the clinical and laboratory findings of Multiple Myeloma and Waldenström's Macroglobulinemia. Page 188. In IgA myeloma what type of plasma cells may be seen?
Flame cells, Mott cells, Grape cells, Morula cells`,
  `question: Differentiate the clinical and laboratory findings of Multiple Myeloma and Waldenström's Macroglobulinemia. Page 188. The activation of osteoclasts in multiple myeloma leads to what clinical problem?
Inevitable bone loss, Increased bone density, Abnormal bone growth, Pathologic fractures`,
  `question: Differentiate the clinical and laboratory findings of Multiple Myeloma and Waldenström's Macroglobulinemia. Page 188. What characteristic RBC formation is a key laboratory finding in Multiple Myeloma?
Rouleaux, Agglutination, Spherocytosis, Howell-Jolly bodies`,
  `question: Differentiate the clinical and laboratory findings of Multiple Myeloma and Waldenström's Macroglobulinemia. Page 188. What abnormal protein is often found in the urine of patients with Multiple Myeloma?
Bence-Jones protein, Albumin, Hemoglobin, Myoglobin`,
  `question: Differentiate the clinical and laboratory findings of Multiple Myeloma and Waldenström's Macroglobulinemia. Page 188. Bone pain in the back and ribs is a common symptom of Multiple Myeloma caused by what?
Plasma cell acceleration, Excess calcium, Anemia, Hyper-viscosity`,
  `question: Differentiate the clinical and laboratory findings of Multiple Myeloma and Waldenström's Macroglobulinemia. Page 189. Waldenström's Macroglobulinemia is characterized by the overproduction of which immunoglobulin?
IgM, IgG, IgA, IgD`,
  `question: Differentiate the clinical and laboratory findings of Multiple Myeloma and Waldenström's Macroglobulinemia. Page 189. The predominant cell type in Waldenström's Macroglobulinemia is what?
Plasmacytoid lymphocytes, Mature plasma cells, Hairy cells, Reed-Sternberg cells`,
  `question: Differentiate the clinical and laboratory findings of Multiple Myeloma and Waldenström's Macroglobulinemia. Page 189. In Waldenström's Macroglobulinemia the excess IgM interferes with coagulation factors by doing what?
Coating platelets, Activating fibrinogen, Inhibiting factor VIII, Degrading factor V`,
  `question: Differentiate the clinical and laboratory findings of Multiple Myeloma and Waldenström's Macroglobulinemia. Page 189. The presence of cryoglobulins in some patients with Waldenström's can lead to what phenomenon?
Raynaud's phenomenon, Döhle body formation, Toxic granulation, Auer rod development`,
  `question: Differentiate the clinical and laboratory findings of Multiple Myeloma and Waldenström's Macroglobulinemia. Page 190. According to the overview table what is the predominant cell type in Multiple Myeloma?
Plasma cells in marrow, Mature lymphocytes, Hairy cells, Plasmacytoid lymphocytes`,
  `question: Differentiate the clinical and laboratory findings of Multiple Myeloma and Waldenström's Macroglobulinemia. Page 190. Based on the overview table which malignant lymphoproliferative disorder has a poor survival rate?
Non-Hodgkin's Lymphoma, Hairy Cell Leukemia, Hodgkin's Lymphoma, Chronic Lymphocytic Leukemia`,
  `question: Differentiate the clinical and laboratory findings of Multiple Myeloma and Waldenström's Macroglobulinemia. Page 190. According to the overview table a massively enlarged spleen is the main organ involvement for which disorder?
Hairy Cell Leukemia, Chronic Lymphocytic Leukemia, Multiple Myeloma, Hodgkin's Lymphoma`,
  `question: Differentiate the clinical and laboratory findings of Multiple Myeloma and Waldenström's Macroglobulinemia. Page 190. Based on the overview table what is a significant lab finding in Waldenström's Macroglobulinemia?
Monoclonal gammopathy (IgM), Increased calcium, TRAP positive, 90% lymphocytes`,
  `question: Differentiate the clinical and laboratory findings of Multiple Myeloma and Waldenström's Macroglobulinemia. Page 190. According to the table the presence of Reed-Sternberg cells is characteristic of which disorder?
Hodgkin's Lymphoma, Non-Hodgkin's Lymphoma, Multiple Myeloma, Hairy Cell Leukemia`,
  `question: Differentiate the clinical and laboratory findings of Multiple Myeloma and Waldenström's Macroglobulinemia. Page 190. Which two disorders listed in the table primarily involve the kidneys and bone marrow?
Multiple Myeloma and Waldenström's, CLL and HCL, HL and NHL, HCL and HL`,
  `question: Identify the possible causes of the myelodysplastic syndromes. Page 194. What is the term for new cases of MDS that are unrelated to any other treatment?
De novo, Secondary, Congenital, Acquired`,
  `question: Identify the possible causes of the myelodysplastic syndromes. Page 194. Secondary cases of MDS are related to prior therapy with radiation or what other treatment?
Alkylating therapy, Antibiotic therapy, Antiviral therapy, Immunotherapy`,
  `question: Identify the possible causes of the myelodysplastic syndromes. Page 194. Which of the following is an environmental exposure that makes a population more susceptible to MDS?
Benzene, Asbestos, Lead, Mercury`,
  `question: Identify the possible causes of the myelodysplastic syndromes. Page 194. What percentage of all MDS cases transform into acute leukemia?
30-40%, 10-20%, 50-60%, 70-80%`,
  `question: Differentiate the clinical and laboratory findings of Multiple Myeloma and Waldenström's Macroglobulinemia. Page 188. In Multiple Myeloma headache and blurred vision are symptoms caused by what?
Hyper-viscosity, Anemia, Excess calcium, Bone lesions`,
  `question: Describe the pertinent features of hairy cell leukemia to include clinical presentation peripheral smear and pertinent cytochemical stains. Page 190. According to the overview table what is the survival rate for Hairy Cell Leukemia?
Good, Poor, Variable, Unknown`
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