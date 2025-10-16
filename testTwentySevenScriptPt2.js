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
  `question: Describe autoimmunity. Autoimmunity represents a breakdown of the immune system's ability to discriminate between what? Page 323.
Self and nonself, Bacteria and viruses, Benign and malignant cells, Innate and adaptive immunity`,
  `question: Describe autoimmunity. In autoimmune disorders immunoglobulins or cytotoxic T cells display specificity for what? Page 324.
Self-antigens, Foreign antigens, Bacterial antigens, Viral antigens`,
  `question: Describe autoimmunity. Autoimmune disorders represent the fourth largest cause of disability in the United States and where else? Page 324.
Europe, Asia, Africa, South America`,
  `question: Describe autoimmunity. Autoimmune disease is usually prevented by the normal functioning of what? Page 324.
Immunologic regulatory mechanisms, The innate immune system, The complement cascade, Phagocytic cells`,
  `question: Describe autoimmunity. Which of the following is a potential cause of an autoimmune response? Page 324.
A foreign antigen that cross-reacts with self-antigens, A normally functioning T-cell subset, A decrease in antibody production, A lack of immunogenic stimuli`,
  `question: Describe autoimmunity. The loss of immunoregulatory function by which T-cell subset can lead to an autoimmune response? Page 324.
Suppressor T-cells, Helper T-cells, Cytotoxic T-cells, Memory T-cells`,
  `question: Describe the immunologic manifestations of SLE including diagnostic evaluation. Systemic Lupus Erythematosus (SLE) is the classic model of what type of disease? Page 324.
Autoimmune disease, Immunodeficiency disease, Hypersensitivity reaction, Malignant disease`,
  `question: Describe the immunologic manifestations of SLE including diagnostic evaluation. After puberty SLE occurs how many times more frequently in women than in men? Page 324.
10 to 15 times, 2 to 3 times, 5 to 8 times, 20 to 25 times`,
  `question: Describe the immunologic manifestations of SLE including diagnostic evaluation. The course of SLE is variable but usually follows what pattern? Page 324.
Chronic and irregular with exacerbations and remissions, Acute and self-limiting, Progressively worsening with no remission, A single severe episode`,
  `question: Describe the immunologic manifestations of SLE including diagnostic evaluation. What are the leading causes of death in hospitalized SLE patients? Page 324.
Progressive renal disease or CNS disease, Cardiovascular events, Malignancy, Joint destruction`,
  `question: Describe the immunologic manifestations of SLE including diagnostic evaluation. Immunosuppression from steroid treatment can interfere with host defense against what? Page 325.
Opportunistic infections, Common viral infections, Encapsulated bacteria, Parasitic infections`,
  `question: Describe the immunologic manifestations of SLE including diagnostic evaluation. Which of the following is considered an early sign of SLE? Page 325.
Fatigue weight loss and fever, Butterfly rash, Glomerulonephritis, Pericarditis`,
  `question: Describe the immunologic manifestations of SLE including diagnostic evaluation. What is the name of the characteristic rash seen in more than 40% of SLE patients? Page 325.
Butterfly rash, Discoid rash, Petechial rash, Psoriatic rash`,
  `question: Describe the immunologic manifestations of SLE including diagnostic evaluation. Which of the following is a common hematologic finding in SLE? Page 325.
Moderate anemia, Polycythemia, Leukocytosis, Thrombocytosis`,
  `question: Describe the immunologic manifestations of SLE including diagnostic evaluation. High levels of which type of antibodies are a key serologic manifestation of SLE? Page 325.
Antinuclear Antibodies, Rheumatoid Factor, Anti-cardiolipin antibodies, Anti-histone antibodies`,
  `question: Describe the laboratory evaluation of antinuclear antibodies. Which autoantibodies are considered the hallmark of SLE? Page 326.
Antinuclear Antibodies, Anti-dsDNA antibodies, Anti-Smith antibodies, Anti-histone antibodies`,
  `question: Describe the laboratory evaluation of antinuclear antibodies. ANAs are a heterogeneous group of immunoglobulins that react with what? Page 326.
The whole nucleus or nuclear components, The cytoplasm of cells, The cell membrane, Red blood cell antigens`,
  `question: Describe the laboratory evaluation of antinuclear antibodies. Antibodies directed to which phospholipid are present in some SLE patients and are associated with thrombosis? Page 326.
Cardiolipin, Phosphatidylserine, Sphingomyelin, Lecithin`,
  `question: Describe the laboratory evaluation of antinuclear antibodies. An elevation of anti-cardiolipin antibodies may be predictive of a risk of thrombosis or what other condition? Page 326.
Recurrent spontaneous abortions, Renal failure, Neurologic disorders, Joint destruction`,
  `question: Describe the etiology epidemiology and signs and symptoms of rheumatoid arthritis. Rheumatoid Arthritis (RA) is a progressive inflammatory disease that primarily affects what? Page 326.
The joints, The skin, The kidneys, The nervous system`,
  `question: Describe the etiology epidemiology and signs and symptoms of rheumatoid arthritis. Severe cases of RA can manifest as a destructive polyarthritis where what parts of the body are severely deformed? Page 326.
The hands and feet, The spine, The hips and knees, The shoulders and elbows`,
  `question: Describe the etiology epidemiology and signs and symptoms of rheumatoid arthritis. Persons with which HLA haplotype have a significantly higher incidence of RA? Page 326.
HLA-DR4, HLA-B27, HLA-A1, HLA-DQ2`,
  `question: Describe the etiology epidemiology and signs and symptoms of rheumatoid arthritis. Immunoglobulin M rheumatoid factor is manifested in approximately what percentage of adults with RA? Page 326.
70%, 50%, 90%, 30%`,
  `question: Describe the immunologic manifestations and diagnostic evaluations of rheumatoid arthritis. Rheumatoid Factor (RF) is typically an IgM antibody that reacts against what? Page 326.
A patient's own IgG, Nuclear antigens, Joint cartilage, Red blood cells`,
  `question: Describe the immunologic manifestations and diagnostic evaluations of rheumatoid arthritis. Is Rheumatoid Factor considered a cause of RA? Page 327.
No it is produced during the course of the disease, Yes it is the primary cause, Only in severe cases, It is a result of treatment`,
  `question: Describe the immunologic manifestations and diagnostic evaluations of rheumatoid arthritis. High titers of RF are associated with what? Page 327.
Severe Rheumatoid disease, Mild disease, Early onset RA, A better prognosis`,
  `question: Describe the immunologic manifestations and diagnostic evaluations of rheumatoid arthritis. Agglutination tests for RF such as the sensitized sheep cell test generally detect which class of RF? Page 327.
IgM RFs, IgG RFs, IgA RFs, All RF classes`,
  `question: Describe the immunologic manifestations and diagnostic evaluations of rheumatoid arthritis. Antinuclear antibodies are demonstrable in what percentage of RA patients? Page 327.
14% to 28%, 50% to 60%, 70% to 80%, Less than 5%`,
  `question: Describe the immunologic manifestations and diagnostic evaluations of rheumatoid arthritis. In RA patients with vasculitis what can be observed with complement levels? Page 327.
They are usually normal, They are always elevated, They are always depressed, They are not measurable`,
  `question: Describe the histocompatibility antigens. The Major Histocompatibility Complex (MHC) is a cluster of genes found on the short arm of which chromosome? Page 327.
Chromosome 6, Chromosome 9, Chromosome 1, Chromosome 19`,
  `question: Describe the histocompatibility antigens. The MHC encodes for which antigens which are the basis for T-cell discrimination of "self" from "nonself"? Page 327.
Human Leukocyte Antigens (HLAs), Red Blood Cell Antigens, Platelet Antigens, T-cell Receptor Antigens`,
  `question: Describe the histocompatibility antigens. MHC proteins are found on all of what type of cells in the body? Page 327.
Nucleated cells, Red blood cells, Platelets, Neurons`,
  `question: Describe the histocompatibility antigens. What is the main function of MHC molecules? Page 327.
Bring an antigen to the cell surface for T-cell recognition, Directly kill infected cells, Produce antibodies, Phagocytize pathogens`,
  `question: Describe the histocompatibility antigens. After ABO antigens what is the second most influential factor in the survival or rejection of transplanted organs? Page 327.
MHC, Rh antigens, Kell antigens, Platelet antigens`,
  `question: Describe the histocompatibility antigens. MHC class I molecules can be found on the surface of most nucleated cells in the body. Page 328.
True, False, Only on immune cells, Only on epithelial cells`,
  `question: Describe the histocompatibility antigens. MHC class II molecules are only found on certain cells associated with what system? Page 328.
The Immune System, The Nervous System, The Endocrine System, The Skeletal System`,
  `question: Describe the histocompatibility antigens. What is the term for the fact that T-cells will only recognize an antigen bound to a certain MHC molecule? Page 328.
MHC restriction, Clonal selection, Antigen presentation, Immune tolerance`,
  `question: Describe the histocompatibility antigens. Helper T-cells (CD4) can interact with antigens bound to which class of MHC molecules? Page 328.
MHC class II, MHC class I, Both MHC class I and II, Neither MHC class`,
  `question: Describe the histocompatibility antigens. Cytotoxic T-cells (CD8) only interact with antigens bound to which class of MHC molecules? Page 328.
MHC class I, MHC class II, Both MHC class I and II, Neither MHC class`,
  `question: Describe graft-versus-host disease. Graft-versus-host disease (GVHD) is common after which type of transplantation? Page 328.
Allogeneic bone marrow, Autologous bone marrow, Solid organ, Xenotransplantation`,
  `question: Describe graft-versus-host disease. GVHD is a syndrome that primarily affects the liver gut and what other organ? Page 328.
Skin, Kidneys, Lungs, Heart`,
  `question: Describe graft-versus-host disease. TA-GVHD is defined as an immunologic attack by viable donor lymphocytes against whom? Page 328.
The transfusion recipient, The donor's own cells, The remaining blood unit, The transfusion equipment`,
  `question: Describe graft-versus-host disease. TA-GVHD occurs between 3 and 30 days post-transfusion of what type of blood component? Page 328.
A non-irradiated cellular component, An irradiated cellular component, Fresh frozen plasma, Cryoprecipitate`,
  `question: Describe graft-versus-host disease. TA-GVHD leads to profound marrow aplasia and has a mortality rate greater than what percentage? Page 328.
90%, 75%, 50%, 25%`,
  `question: Describe graft-versus-host disease. In TA-GVHD death typically occurs how long after the first symptoms appear? Page 328.
1 to 3 weeks, 24 to 48 hours, 2 to 3 months, 6 to 12 months`,
  `question: Describe graft-versus-host disease. What is the key to managing TA-GVHD? Page 329.
Prevention, Early diagnosis, Aggressive treatment, Supportive care`,
  `question: Describe graft-versus-host disease. What is done to cellular components to prevent TA-GVHD in immunocompromised individuals? Page 329.
Irradiating the components, Washing the components, Freezing the components, Filtering the components`,
  `question: Describe autoimmunity. What is a self-antigen also called? Page 324.
Autoantigen, Alloantigen, Xenoantigen, Neoantigen`,
  `question: Describe the immunologic manifestations of SLE including diagnostic evaluation. What is the estimated 10-year survival rate for individuals with SLE? Page 324.
Greater than 90%, Approximately 75%, Approximately 50%, Less than 25%`,
  `question: Describe the immunologic manifestations of SLE including diagnostic evaluation. Which of the following is a potential multi-organ system involvement in SLE? Page 325.
Renal system, Respiratory system only, Skeletal system only, Endocrine system only`,
  `question: Describe the etiology epidemiology and signs and symptoms of rheumatoid arthritis. Joint symptoms in RA usually appear in what manner? Page 326.
Gradually over weeks to months, Suddenly over a few hours, Immediately after an injury, Only in the morning`,
  `question: Describe the histocompatibility antigens. Where on Chromosome 6 is the MHC cluster of genes found? Page 327.
Band 21 of the short arm, Band 11 of the long arm, The centromere, The telomere`,
  `question: Describe graft-versus-host disease. The presenting reaction in TA-GVHD is often what type of rash? Page 328.
Maculopapular, Petechial, Vesicular, Psoriatic`,
  `question: Describe autoimmunity. An autoimmune response can be caused by antigens that do not normally do what? Page 324.
Circulate in the blood, Bind to antibodies, Enter the body, Interact with T-cells`,
  `question: Describe the immunologic manifestations of SLE including diagnostic evaluation. Decreased lymphocytes or what other hematologic finding might be found in SLE blood tests? Page 325.
Lymphocytopenia, Lymphocytosis, Leukemia, Polycythemia`,
  `question: Describe the laboratory evaluation of antinuclear antibodies. Besides SLE in what other autoimmune disease can ANAs be found? Page 326.
Rheumatoid Arthritis, Multiple Sclerosis, Type 1 Diabetes, Myasthenia Gravis`,
  `question: Describe the immunologic manifestations and diagnostic evaluations of rheumatoid arthritis. High titers of RF correlate with vasculitis Felty's syndrome and what other syndrome? Page 327.
Sjogren's syndrome, Raynaud's syndrome, Cushing's syndrome, Turner syndrome`,
  `question: Describe the histocompatibility antigens. Helper T-cells activate which other lymphocytes after interacting with an antigen on an APC? Page 328.
B-lymphocytes, Cytotoxic T-cells, Natural Killer cells, Suppressor T-cells`,
  `question: Describe graft-versus-host disease. The irradiation doses to prevent GVHD range from 2500 to how many cGy? Page 329.
5000 cGy, 1000 cGy, 7500 cGy, 10000 cGy`,
  `question: Describe graft-versus-host disease. Higher doses of irradiation are more effective at preventing GVHD but are more damaging to what? Page 329.
RBCs, Plasma, Platelets, The recipient`
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