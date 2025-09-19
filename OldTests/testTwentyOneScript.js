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
`question: Define terms associated with immunology. Page 9. What is the process by which a host organism protects itself from attacks by external and internal agents called?
Immunity, Phagocytosis, Inflammation, Opsonization`,
`question: Define terms associated with immunology. Page 9. Acquired immunity relies on the formation of what specific complexes?
Antigen-antibody, Self-nonself, Cytokine-receptor, T-cell-B-cell`,
`question: Describe the components of the immune system to include their functions. Page 10. Cellular immunity is mediated by IS cells such as macrophages dendritic cells and what other cell type?
T cells, B cells, NK cells, Basophils`,
`question: Describe the components of the immune system to include their functions. Page 10. What soluble protein molecules function as powerful mediators of the immune system and communicate between cells?
Cytokines, Antigens, Antibodies, Opsonins`,
`question: Describe the components of the immune system to include their functions. Page 10. Lymphokines are produced by lymphocytes while Monokines are produced by what cells?
Monocytes and macrophages, T cells and B cells, Neutrophils and eosinophils, Dendritic cells and NK cells`,
`question: Describe the components of the immune system to include their functions. Page 10. What is the key feature of antigen-antibody reactions?
Specificity, Sensitivity, Avidity, Affinity`,
`question: Describe the first line of defense natural immunity and adaptive immunity as body defense mechanisms. Page 11. Which type of immunity is nonspecific and present at birth?
Natural Immunity, Adaptive Immunity, Acquired Immunity, Humoral Immunity`,
`question: Describe the first line of defense natural immunity and adaptive immunity as body defense mechanisms. Page 11. Which type of immunity develops a memory to remember previous infecting agents?
Adaptive Immunity, Natural Immunity, Innate Immunity, Cellular Immunity`,
`question: Compare the innate and adaptive immunity. Page 12. Intact skin mucous membranes and cilia are examples of what type of barrier in the innate immune system?
Physical Barriers, Biochemical Barriers, Cellular Barriers, Mechanical Barriers`,
`question: Compare the innate and adaptive immunity. Page 12. Polymorphonuclear cells and mononuclear cells are the two major types of what kind of cells in the innate immune system?
Phagocytic cells, Lymphocytic cells, Plasma cells, Dendritic cells`,
`question: Compare the innate and adaptive immunity. Page 13. What are factors that coat pathogens to facilitate phagocytosis called?
Opsonins, Cytokines, Chemokines, Antigens`,
`question: Compare the innate and adaptive immunity. Page 13. Which arm of the immune system is the most highly evolved and allows the system to remember pathogens?
Adaptive Immunity, Innate Immunity, Natural Immunity, Humoral Immunity`,
`question: Describe the characteristics of the major cells of the immune system to include their functions. Page 13. Where do all cells of the immune system originate from?
Pluripotent stem cells, Mature T cells, Activated B cells, Dendritic cells`,
`question: Describe the characteristics of the major cells of the immune system to include their functions. Page 13. B-Lymphocytes are responsible for which type of immunity?
Humoral immunity, Cell-mediated immunity, Innate immunity, Natural immunity`,
`question: Describe the characteristics of the major cells of the immune system to include their functions. Page 13. When B-Lymphocytes become activated and start producing antibodies what are they called?
Plasma cells, T-cells, Macrophages, Monocytes`,
`question: Describe the characteristics of the major cells of the immune system to include their functions. Page 14. T-Lymphocytes originate in the bone marrow and mature in which organ?
Thymus, Spleen, Liver, Kidney`,
`question: Describe the characteristics of the major cells of the immune system to include their functions. Page 14. Which T-cells are involved in activating and directing the actions of other immune cells?
Helper/Inducer T-cells (CD4), Cytotoxic T-Cells (CD8), Regulatory Suppressor T-Cells, Memory T-cells`,
`question: Describe the characteristics of the major cells of the immune system to include their functions. Page 14. Which T-cells attack and lyse cells infected with viruses tumor cells and bacteria?
Cytotoxic T-Cells (CD8), Helper/Inducer T-cells (CD4), Regulatory Suppressor T-Cells, Naive T-cells`,
`question: Describe the characteristics of the major cells of the immune system to include their functions. Page 15. Which large granular lymphocytes can lyse virally infected cells without prior antigenic stimulation?
Natural Killer Cells, T-Cells, B-Cells, Macrophages`,
`question: Describe the characteristics of the major cells of the immune system to include their functions. Page 15. Which granulocytes accumulate at inflammatory sites and release histamines?
Basophils, Neutrophils, Eosinophils, Monocytes`,
`question: Describe the characteristics of the major cells of the immune system to include their functions. Page 15. Which granulocytes control allergic reactions by emitting histaminase?
Eosinophils, Basophils, Neutrophils, Lymphocytes`,
`question: Describe the characteristics of the major cells of the immune system to include their functions. Page 16. What do monocytes become when they enter tissues?
Tissue macrophages, Plasma cells, Dendritic cells, Mast cells`,
`question: Describe the characteristics of the major cells of the immune system to include their functions. Page 16. Besides phagocytosis what is the other important function of monocytes/macrophages?
Serve as antigen-presenting cells, Produce antibodies, Release histamine, Lyse tumor cells`,
`question: Describe the major effector molecules to include their roles in an immune response. Page 17. What are the chemical signals released by infected or damaged cells that form a concentration gradient?
Chemokines, Cytokines, Antibodies, Antigens`,
`question: Describe the major effector molecules to include their roles in an immune response. Page 17. Interleukins interferons and tumor necrosis factors are classes of what molecules?
Cytokines, Chemokines, Immunoglobulins, Opsonins`,
`question: Explain the function of the major histocompatibility complex (MHC) class I and II molecules. Page 18. MHC Class I molecules play a key role in the function of which cells?
CD8 Cytotoxic T Cells, CD4 Helper T Cells, B-Lymphocytes, Natural Killer Cells`,
`question: Explain the function of the major histocompatibility complex (MHC) class I and II molecules. Page 18. On which cells are MHC Class II molecules present?
Antigen-presenting cells, All nucleated cells, Red blood cells, Platelets`,
`question: Define the terms antigen and antibody. Page 21. What is a substance recognized by the body as being foreign which causes an immune response called?
Antigen, Antibody, Cytokine, Chemokine`,
`question: Define the terms antigen and antibody. Page 21. The antigenic determinants on an antigen that react specifically with an antibody are called what?
Epitopes, Haptens, Opsonins, Adjuvants`,
`question: Describe the characteristics of the five immunoglobulin classes. Page 21. Which immunoglobulin is the most involved in immune responses and can cross the placenta?
IgG, IgM, IgA, IgE`,
`question: Describe the characteristics of the five immunoglobulin classes. Page 22. Which immunoglobulin is the largest and is the first antibody involved in the primary immune response?
IgM, IgG, IgA, IgD`,
`question: Describe the characteristics of the five immunoglobulin classes. Page 22. Which immunoglobulin is known as the "secretor antibody" and is found in tears saliva and breast milk?
IgA, IgG, IgM, IgE`,
`question: Describe the characteristics of the five immunoglobulin classes. Page 22. Which immunoglobulin is important in allergic reactions and mediates the release of histamines?
IgE, IgG, IgM, IgA`,
`question: Describe a typical immunoglobulin molecular structure. Page 23. A basic immunoglobulin unit consists of two large heavy chains and how many smaller light chains?
2, 1, 3, 4`,
`question: Describe a typical immunoglobulin molecular structure. Page 24. What are the upper portions of the "Y" known as that are capable of antigen binding?
FAB sites, FC site, Hinge region, Constant domain`,
`question: Describe a typical immunoglobulin molecular structure. Page 24. Which part of the antibody is the lower stem portion of the "Y" and can bind to receptors on immune cells?
FC site, FAB sites, Variable domain, Hinge region`,
`question: Describe the four phases of an antibody response. Page 26. In which phase of an antibody response is no antibody detectable?
Lag phase, Log phase, Plateau phase, Decline phase`,
`question: Describe the four phases of an antibody response. Page 26. In which phase of an antibody response does the antibody titer increase logarithmically?
Log phase, Lag phase, Plateau phase, Decline phase`,
`question: Describe the characteristics of a primary and secondary response. Page 26. In a secondary (anamnestic) response which type of antibody is predominant?
IgG, IgM, IgA, IgE`,
`question: Describe the characteristics of a primary and secondary response. Page 26. What is the initial force of attraction between a single Fab site and a single epitope called?
Antibody affinity, Antibody avidity, Antibody specificity, Antibody sensitivity`,
`question: Describe the method of production of a monoclonal antibody. Page 27. What is the multiplying hybrid cell culture that secretes monoclonal antibodies called?
Hybridoma, Myeloma, Lymphoma, Carcinoma`,
`question: Describe the activation sequences of the three major complement pathways. Page 28. The classical alternative and lectin pathways all converge at the cleavage of which component?
C3, C1, C5, C9`,
`question: Describe the activation sequences of the three major complement pathways. Page 28. The classical pathway is initiated when what binds to an antigen?
Antibody, Lectin, Polysaccharide, Properdin`,
`question: Describe the activation sequences of the three major complement pathways. Page 28. Which pathway is older in evolution and can be activated without acquired immunity?
Alternative pathway, Classical pathway, Lectin pathway, Common pathway`,
`question: Describe the activation sequences of the three major complement pathways. Page 29. What is the final step of complement activation which forms a pore in the cell membrane called?
Membrane Attack Complex, C3 Convertase, C5 Convertase, Opsonization`,
`question: Describe methods used to detect antibodies and complement bound to red blood cells (RBCs). Page 31. What is the first stage of a hemagglutination reaction where no agglutination is visible?
Sensitization, Precipitation, Lysis, Inhibition`,
`question: Describe methods used to detect antibodies and complement bound to red blood cells (RBCs). Page 31. What is the second stage of a hemagglutination reaction where a visible lattice structure is formed?
Precipitation reaction, Sensitization, Hemolysis, Opsonization`,
`question: Describe the immune response including antigen-antibody reactions lymphocyte functions and host factors. Page 32. What is the "fit" between an antigen and its antibody binding site often referred to as?
Lock and key mechanism, Induced fit model, Clonal selection, Affinity maturation`,
`question: Describe the immune response including antigen-antibody reactions lymphocyte functions and host factors. Page 32. Nutritional status hormones genetics and age are all examples of what?
Host factors, Antigen properties, Antibody properties, Zonal reactions`,
`question: Discuss the various factors affecting agglutination reactions. Page 34. IgM antibodies react best within what temperature range?
4°C to 27°C, 37°C to 40°C, 0°C to 4°C, 40°C to 56°C`,
`question: Discuss the various factors affecting agglutination reactions. Page 34. IgG antibodies are better detected at what temperature?
37°C, 4°C, 25°C, 56°C`,
`question: Discuss the various factors affecting agglutination reactions. Page 35. LISS PEG and 22% Albumin are examples of what?
Enhancement Media, Buffer solutions, Anticoagulants, Preservatives`,
`question: Discuss the various factors affecting agglutination reactions. Page 35. What is a false negative reaction that occurs due to an excess amount of antibody called?
Prozone Reaction, Postzone Reaction, Zone of Equivalence, Zonal Reaction`,
`question: Discuss the various factors affecting agglutination reactions. Page 35. A false negative reaction that occurs due to an excess amount of antigen is called what?
Postzone Reaction, Prozone Reaction, Zone of Equivalence, Equivalence Reaction`,
`question: Describe common diseases that can affect agglutination reactions. Page 36. Which type of hypersensitivity is also called anaphylaxis and involves IgE?
Type I, Type II, Type III, Type IV`,
`question: Describe common diseases that can affect agglutination reactions. Page 37. Transfusion reactions and Hemolytic Disease of the Newborn (HDN) are examples of which type of hypersensitivity?
Type II, Type I, Type III, Type IV`,
`question: Describe common diseases that can affect agglutination reactions. Page 37. Which type of hypersensitivity is a T-cell mediated response such as graft-versus-host disease?
Type IV, Type I, Type II, Type III`,
`question: Describe common diseases that can affect agglutination reactions. Page 37. Patients with multiple myeloma often demonstrate what phenomenon during testing due to abnormal immunoglobulins?
Rouleaux, Agglutination, Hemolysis, Precipitation`,
`question: Describe common diseases that can affect agglutination reactions. Page 37. What are antibodies produced against the host's own cells and tissues called?
Autoantibodies, Alloantibodies, Monoclonal antibodies, Polyclonal antibodies`,
`question: Describe common diseases that can affect agglutination reactions. Page 38. Severe Hemolytic Disease of the Fetus and Newborn (HDFN) is most often associated with which class of antibodies?
IgG, IgM, IgA, IgE`
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