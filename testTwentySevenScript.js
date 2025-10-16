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
  `question: Describe the types of hypersensitivity to include terms associated with hypersensitivity. What is the definition of hypersensitivity? Page 317.
An exaggerated or uncontrolled immune response, A suppressed immune response, An autoimmune reaction, A primary immune deficiency`,
  `question: Describe the types of hypersensitivity to include terms associated with hypersensitivity. Which of the following is NOT one of the four main types of hypersensitivity? Page 317.
Type V - Stimulatory reaction, Type I - Anaphylactic reaction, Type II - Cytotoxic reaction, Type IV - T cell-dependent`,
  `question: Describe the types of hypersensitivity to include terms associated with hypersensitivity. Type I hypersensitivity is also known as what type of reaction? Page 317.
Anaphylactic, Cytotoxic, Immune complex, T cell-dependent`,
  `question: Describe the types of hypersensitivity to include terms associated with hypersensitivity. Immediate hypersensitivity that includes conditions like asthma and food allergies is referred to as what? Page 318.
Atopy, Allergy, Anaphylaxis, Cytotoxicity`,
  `question: Describe the types of hypersensitivity to include terms associated with hypersensitivity. Type I hypersensitivity reactions are mediated by which class of immunoglobulin? Page 318.
IgE, IgG, IgM, IgA`,
  `question: Describe the types of hypersensitivity to include terms associated with hypersensitivity. In a Type I reaction what chemical is released by mast cells or basophils? Page 318.
Histamine, Complement, Interleukin-2, Lysozyme`,
  `question: Describe the types of hypersensitivity to include terms associated with hypersensitivity. Skin rashes and hives are examples of what type of allergic reaction? Page 318.
Urticarial reactions, Cytotoxic reactions, Immune complex reactions, Delayed-type hypersensitivity`,
  `question: Describe the types of hypersensitivity to include terms associated with hypersensitivity. Difficulty breathing a drop in blood pressure and loss of consciousness are characteristic of what type of reaction? Page 318.
Systemic anaphylaxis, Local anaphylaxis, A cytotoxic reaction, An immune complex reaction`,
  `question: Describe the types of hypersensitivity to include terms associated with hypersensitivity. Which cells can be attracted to an area of allergic activity and may limit the effects of the reaction? Page 318.
Eosinophils, Neutrophils, B-lymphocytes, Monocytes`,
  `question: Describe the types of hypersensitivity to include terms associated with hypersensitivity. An allergic reaction to a bee sting or penicillin is an example of which type of hypersensitivity? Page 318.
Type I, Type II, Type III, Type IV`,
  `question: Describe the types of hypersensitivity to include terms associated with hypersensitivity. Type II hypersensitivity reactions are a consequence of which immunoglobulins binding to the surface of cells? Page 318.
IgG or IgM, IgE only, IgA or IgD, T-cells only`,
  `question: Describe the types of hypersensitivity to include terms associated with hypersensitivity. What is the primary laboratory test for a Type II hypersensitivity reaction? Page 318.
DAT, Skin prick test, RAST test, Nephelometry`,
  `question: Describe the types of hypersensitivity to include terms associated with hypersensitivity. Hemolytic Transfusion Reactions (HTRs) and Hemolytic Disease of the Newborn (HDN) are examples of which type of hypersensitivity? Page 318.
Type II, Type I, Type III, Type IV`,
  `question: Describe the types of hypersensitivity to include terms associated with hypersensitivity. In Goodpasture's syndrome IgG autoantibodies bind to the basement membrane of the glomeruli and what other organ? Page 318.
Lungs, Liver, Spleen, Heart`,
  `question: Describe the types of hypersensitivity to include terms associated with hypersensitivity. What is the cause of a Type III immune complex reaction? Page 319.
Deposition of immune complexes, IgE mediated histamine release, T-cell activation, Direct cell cytotoxicity`,
  `question: Describe the types of hypersensitivity to include terms associated with hypersensitivity. A localized Type III reaction that occurs after repeated exposure to an antigen is called what? Page 319.
Arthus reaction, Anaphylaxis, Contact dermatitis, Goodpasture's syndrome`,
  `question: Describe the types of hypersensitivity to include terms associated with hypersensitivity. Farmer's lung is a pulmonary reaction to thermophilic actinomycetes found in what? Page 319.
Moldy hay, Plastic resin, Bathtub refinisher, Toluene diisocyanate`,
  `question: Describe the types of hypersensitivity to include terms associated with hypersensitivity. Which laboratory assay can be used to detect immune complexes in a Type III reaction? Page 319.
Nephelometry, Direct antiglobulin test, Skin patch test, RAST test`,
  `question: Describe the types of hypersensitivity to include terms associated with hypersensitivity. Type IV reactions are moderated by what type of immunity? Page 319.
Cell-mediated immunity, Humoral immunity, Innate immunity, Passive immunity`,
  `question: Describe the types of hypersensitivity to include terms associated with hypersensitivity. Type IV immunity is moderated by the link between phagocytic cells and what other cells? Page 319.
T lymphocytes, B lymphocytes, Mast cells, Basophils`,
  `question: Describe the types of hypersensitivity to include terms associated with hypersensitivity. Contact dermatitis and infection allergies are examples of what type of hypersensitivity? Page 319.
Type IV, Type I, Type II, Type III`,
  `question: Compare the general characteristics of monoclonal and polyclonal gammopathies. A monoclonal gammopathy results from a single clone of what type of cells? Page 320.
Lymphoid plasma cells, T-helper cells, Myeloid stem cells, Natural killer cells`,
  `question: Compare the general characteristics of monoclonal and polyclonal gammopathies. Monoclonal antibodies (MAbs) are purified antibodies cloned from what? Page 320.
A single cell, Multiple cell lines, A patient's serum, A mixture of B-cells`,
  `question: Compare the general characteristics of monoclonal and polyclonal gammopathies. Monoclonal antibodies are able to recognize and bind to what? Page 320.
A specific antigen, Multiple antigens, A broad range of epitopes, Self-antigens only`,
  `question: Compare the general characteristics of monoclonal and polyclonal gammopathies. A monoclonal gammopathy results in the production of high levels of a single class of immunoglobulin called an M protein or what else? Page 320.
Paraprotein, Polyclonal protein, Cryoglobulin, Light chain`,
  `question: Compare the general characteristics of monoclonal and polyclonal gammopathies. What is the most common plasma cell disorder which is a premalignant precursor of myeloma? Page 320.
MGUS, Multiple Myeloma, Waldenstroms Macroglobulinemia, Polyclonal Gammopathy`,
  `question: Compare the general characteristics of monoclonal and polyclonal gammopathies. Multiple Myeloma is a plasma cell neoplasm characterized by the accumulation of malignant plasma cells within what? Page 320.
The bone marrow, The peripheral blood, The lymph nodes, The spleen`,
  `question: Compare the general characteristics of monoclonal and polyclonal gammopathies. In Multiple Myeloma the concentration of plasma cells in the bone marrow can rise from a normal 1% to as high as what? Page 320.
90%, 50%, 25%, 10%`,
  `question: Compare the general characteristics of monoclonal and polyclonal gammopathies. The most common form of Multiple Myeloma involves which immunoglobulin? Page 321.
IgG, IgM, IgA, IgD`,
  `question: Compare the general characteristics of monoclonal and polyclonal gammopathies. Most patients with Multiple Myeloma die within 1 to 3 years due to sepsis and what other condition? Page 321.
Renal insufficiency, Bone fractures, Heart failure, Anemia`,
  `question: Compare the general characteristics of monoclonal and polyclonal gammopathies. The most consistent immunologic feature of Multiple Myeloma is the synthesis of what? Page 321.
A dysfunctional single monoclonal protein, Functional polyclonal antibodies, Excess light chains only, Excess heavy chains only`,
  `question: Compare the general characteristics of monoclonal and polyclonal gammopathies. What is a common finding on a peripheral blood smear from a patient with Multiple Myeloma due to increased monoclonal protein? Page 321.
Rouleaux formation, Spherocytosis, Target cells, Sickle cells`,
  `question: Compare the general characteristics of monoclonal and polyclonal gammopathies. Proteinuria is a common finding in Multiple Myeloma patients with over 50% excreting what? Page 321.
Bence Jones protein, Albumin, Hemoglobin, Myoglobin`,
  `question: Compare the general characteristics of monoclonal and polyclonal gammopathies. Waldenstrom's Macroglobulinemia is a B cell disorder characterized by the presence of what type of monoclonal gammopathy? Page 321.
IgM, IgG, IgA, IgE`,
  `question: Compare the general characteristics of monoclonal and polyclonal gammopathies. What initial symptoms are of major concern in patients with Waldenstrom's Macroglobulinemia? Page 321.
Bleeding from the nose and gums, Bone pain, Pathologic fractures, Recurrent infections`,
  `question: Compare the general characteristics of monoclonal and polyclonal gammopathies. Unlike in Multiple Myeloma what symptom is almost non-existent in Waldenstrom's Macroglobulinemia? Page 322.
Bone pain, Weakness and fatigue, Weight loss, Anemia`,
  `question: Compare the general characteristics of monoclonal and polyclonal gammopathies. Blurred vision in Waldenstrom's Macroglobulinemia can be caused by retinal hemorrhage due to elevated levels of what? Page 322.
IgM, IgG, Red blood cells, Platelets`,
  `question: Compare the general characteristics of monoclonal and polyclonal gammopathies. Congestive heart failure affects what percentage of patients with chronic uncontrolled Waldenstrom's Macroglobulinemia? Page 322.
90%, 50%, 25%, 10%`,
  `question: Compare the general characteristics of monoclonal and polyclonal gammopathies. What is a key characteristic of a polyclonal gammopathy? Page 322.
An increase in more than one immunoglobulin, An increase in only one immunoglobulin, The presence of Bence Jones protein, Suppression of normal immunoglobulins`,
  `question: Compare the general characteristics of monoclonal and polyclonal gammopathies. A polyclonal gammopathy involves how many clones of plasma cells? Page 322.
Several clones, A single clone, A malignant clone, No clones`,
  `question: Compare the general characteristics of monoclonal and polyclonal gammopathies. Polyclonal gammopathies are often seen in patients with what type of condition? Page 322.
Chronic infections, Acute infections, Multiple Myeloma, Bone marrow failure`,
  `question: Describe the types of hypersensitivity to include terms associated with hypersensitivity. Type II Cytotoxic reactions can lead to what condition in newborns? Page 318.
HDN, Asthma, Eczema, MGUS`,
  `question: Describe the types of hypersensitivity to include terms associated with hypersensitivity. Type IV hypersensitivity is also known as what? Page 319.
Delayed-type hypersensitivity, Immediate hypersensitivity, Anaphylaxis, Arthus reaction`,
  `question: Compare the general characteristics of monoclonal and polyclonal gammopathies. What does MM stand for in the context of immunoproliferative disorders? Page 321.
Multiple Myeloma, Monoclonal Macroglobulinemia, Malignant Monocytosis, Myeloid Metaplasia`,
  `question: Compare the general characteristics of monoclonal and polyclonal gammopathies. What does WM stand for in the context of immunoproliferative disorders? Page 321.
Waldenstroms Macroglobulinemia, White Matter disease, Wasting Myeloma, Waterhouse-Friderichsen Myeloma`,
  `question: Describe the types of hypersensitivity to include terms associated with hypersensitivity. A reaction to a mosquito bite is an example of what? Page 318.
Local anaphylaxis, Systemic anaphylaxis, Cytotoxic reaction, Arthus reaction`,
  `question: Compare the general characteristics of monoclonal and polyclonal gammopathies. Broadly disseminated destruction of what tissue is found in 90% of Multiple Myeloma patients? Page 321.
Their skeleton, Their lymph nodes, Their liver, Their spleen`,
  `question: Compare the general characteristics of monoclonal and polyclonal gammopathies. In about 10% of Multiple Myeloma patients what is the only monoclonal protein produced? Page 321.
BJ proteins, IgG heavy chains, IgM pentamers, IgA dimers`,
  `question: Describe the types of hypersensitivity to include terms associated with hypersensitivity. A delayed hemolytic transfusion reaction that occurs 7 to 10 days after transfusion is an example of what hypersensitivity type? Page 318.
Type II, Type I, Type III, Type IV`,
  `question: Compare the general characteristics of monoclonal and polyclonal gammopathies. Waldenstrom's Macroglobulinemia is often found in older individuals with a median survival of how long after diagnosis? Page 321.
3 years, 1 year, 5 years, 10 years`,
  `question: Compare the general characteristics of monoclonal and polyclonal gammopathies. A polyclonal gammopathy consists of one or more heavy-chain classes and how many light-chain types? Page 322.
Both light-chain types, Only kappa light chains, Only lambda light chains, Neither light-chain type`,
  `question: Describe the types of hypersensitivity to include terms associated with hypersensitivity. Bathtub refinisher's lung is an example of what type of hypersensitivity reaction? Page 319.
Type III, Type I, Type II, Type IV`,
  `question: Compare the general characteristics of monoclonal and polyclonal gammopathies. Is a monoclonal gammopathy always malignant? Page 320.
No it can be benign or malignant, Yes it is always malignant, No it is always benign, Yes but only in older patients`,
  `question: Describe the types of hypersensitivity to include terms associated with hypersensitivity. Antireceptor antibodies that bind to cells and affect their function without causing damage are a mechanism of which hypersensitivity type? Page 319.
Type II, Type I, Type III, Type IV`,
  `question: Compare the general characteristics of monoclonal and polyclonal gammopathies. In MM what percentage of patients have an M component in their serum urine or both? Page 321.
99%, 75%, 50%, 25%`,
  `question: Describe the types of hypersensitivity to include terms associated with hypersensitivity. Which of the following is an example of a Type I systemic anaphylactic trigger? Page 318.
Bee sting, Mosquito bite, Allergy testing, Eczema`,
  `question: Compare the general characteristics of monoclonal and polyclonal gammopathies. What type of anemia is commonly seen in patients with Waldenstrom's Macroglobulinemia? Page 322.
Moderate to severe anemia, Mild anemia only, Aplastic anemia, Iron deficiency anemia`,
  `question: Describe the types of hypersensitivity to include terms associated with hypersensitivity. Erythema nodosum is a common skin condition associated with which hypersensitivity type? Page 319.
Type III, Type I, Type II, Type IV`,
  `question: Compare the general characteristics of monoclonal and polyclonal gammopathies. Waldenstrom's Macroglobulinemia occurs about 10% as frequently as what other disorder? Page 321.
Multiple Myeloma, MGUS, Chronic lymphocytic leukemia, Hairy cell leukemia`,
  `question: Describe the types of hypersensitivity to include terms associated with hypersensitivity. T-cells respond to antigens in a Type IV reaction either directly or by the release of what? Page 319.
Lymphokines, Histamine, Antibodies, Complement`
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