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
  `question: Describe the relationship between ABO antigens and antibodies for the major blood groups. Question: Who discovered the ABO blood group system in 1901? Page 79.
Karl Landsteiner, Gregor Mendel, Louis Pasteur, Marie Curie`,
  `question: Describe the relationship between ABO antigens and antibodies for the major blood groups. Question: What does Landsteiner's Rule state will be absent in the serum if an ABO antigen is present on the cells? Page 79.
The corresponding antibody, The H antigen, The Rh antigen, The corresponding genotype`,
  `question: Describe the relationship between ABO antigens and antibodies for the major blood groups. Question: What does Landsteiner's Rule state will be absent on the cells if an ABO antibody is present in the serum? Page 79.
The corresponding antigen, The H antibody, The Rh antibody, The secretor gene`,
  `question: Describe the relationship between ABO antigens and antibodies for the major blood groups. Question: What is the most important blood group system in transfusion and transplantation practice? Page 80.
ABO, Rh, Kell, Duffy`,
  `question: Describe the relationship between ABO antigens and antibodies for the major blood groups. Question: Transfusion reactions involving which blood group system are the most serious? Page 80.
ABO, Kell, MNS, Lewis`,
  `question: Describe the relationship between ABO antigens and antibodies for the major blood groups. Question: What color is the Anti-A reagent? Page 80.
Blue, Yellow, Colorless, Red`,
  `question: Describe the relationship between ABO antigens and antibodies for the major blood groups. Question: What color is the Anti-B reagent? Page 80.
Yellow, Blue, Green, Purple`,
  `question: Describe the relationship between ABO antigens and antibodies for the major blood groups. Question: What is another name for Forward Grouping? Page 81.
Front type, Back type, Secretor study, Antibody screen`,
  `question: Describe the relationship between ABO antigens and antibodies for the major blood groups. Question: Forward grouping tests for unknown antigens on red blood cells using what? Page 81.
Known antibodies, Known antigens, Patient serum, Lectins`,
  `question: Describe the relationship between ABO antigens and antibodies for the major blood groups. Question: What is another name for Reverse Grouping? Page 81.
Back type, Front type, Antigen study, H typing`,
  `question: Describe the relationship between ABO antigens and antibodies for the major blood groups. Question: Reverse grouping tests for unknown antibodies in serum using what? Page 82.
Known reagent red blood cells, Known reagent antisera, Patient red blood cells, Anti-H lectin`,
  `question: Identify the population frequencies of the four major blood groups. Question: In the Caucasian population what is the most frequent ABO phenotype? Page 82.
O, A, B, AB`,
  `question: Identify the population frequencies of the four major blood groups. Question: In the Asian population what is the percentage of people with type B blood? Page 82.
25%, 11%, 20%, 40%`,
  `question: Identify the population frequencies of the four major blood groups. Question: In the African American population which ABO phenotype is the least common? Page 82.
AB, O, B, A`,
  `question: Identify the population frequencies of the four major blood groups. Question: What are the three major antigens of the ABO system? Page 82.
A B H, A B D, C E A, Kell Lewis Duffy`,
  `question: Explain the effect of age on the production of ABO antibodies. Question: When is the production of ABO antibodies typically initiated? Page 83.
At birth, At 1 year, During puberty, In adulthood`,
  `question: Explain the effect of age on the production of ABO antibodies. Question: At what age does ABO antibody production typically peak? Page 83.
5 to 10 years, 3 to 6 months, 20 to 30 years, Over 50 years`,
  `question: Explain the effect of age on the production of ABO antibodies. Question: Why are blood type results from infants younger than 4-6 months not considered valid? Page 83.
Antibodies may be of maternal origin, Antigens are not fully developed, Antibody production has not started, Their serum is too weak`,
  `question: Compare the immunoglobulin classes of ABO antibodies. Question: What is the predominant immunoglobulin class of ABO antibodies? Page 83.
IgM, IgG, IgA, IgE`,
  `question: Compare the immunoglobulin classes of ABO antibodies. Question: ABO antibodies are described as naturally occurring because they are produced without any exposure to what? Page 83.
RBCs, Bacteria, Viruses, Allergens`,
  `question: Compare the immunoglobulin classes of ABO antibodies. Question: The separate cross-reacting anti-A B antibody is usually what class of immunoglobulin? Page 84.
IgG, IgM, IgD, IgE`,
  `question: Predict the offspring's ABO phenotypes and genotypes related to various ABO matings. Question: On which chromosome are the A B and O genes located? Page 84.
Chromosome 9, Chromosome 19, Chromosome 6, Chromosome 1`,
  `question: Predict the offspring's ABO phenotypes and genotypes related to various ABO matings. Question: The A and B genes are considered what in relation to each other? Page 84.
Codominant, Recessive, Dominant, Amorph`,
  `question: Predict the offspring's ABO phenotypes and genotypes related to various ABO matings. Question: The O gene is considered an amorph gene because it produces what? Page 84.
No detectable antigen, A weak antigen, The H antigen, A soluble substance`,
  `question: Predict the offspring's ABO phenotypes and genotypes related to various ABO matings. Question: A mating between parents with genotypes AO and BO can produce an offspring with which phenotype? Page 85.
AB A B or O, A or B only, AB only, O only`,
  `question: Describe the formation of H A and B antigens on the red blood cells. Question: The formation of ABH antigens results from the interaction of genes at how many separate loci? Page 85.
Three, Two, Four, One`,
  `question: Describe the formation of H A and B antigens on the red blood cells. Question: On which chromosome is the H gene located? Page 86.
Chromosome 19, Chromosome 9, Chromosome 21, Chromosome 4`,
  `question: Describe the formation of H A and B antigens on the red blood cells. Question: The H gene produces an enzyme that transfers which sugar to form the H antigen? Page 86.
L-fucose, D-galactose, GalNAc, D-glucose`,
  `question: Describe the formation of H A and B antigens on the red blood cells. Question: The A gene produces an enzyme that adds which sugar to the H chain? Page 87.
N-acetyl-D-Galactosamine, D-galactose, L-fucose, D-mannose`,
  `question: Describe the formation of H A and B antigens on the red blood cells. Question: The B gene produces an enzyme that adds which sugar to the H chain? Page 87.
D-galactose, N-acetyl-D-Galactosamine, L-fucose, L-rhamnose`,
  `question: Describe the formation of H A and B antigens on the red blood cells. Question: Which blood group's red cells have the greatest amount of H antigen? Page 86.
O, A1, B, A1B`,
  `question: Describe the formation of H A and B antigens on the red blood cells. Question: Which blood group's red cells have the least amount of H antigen? Page 86.
A1B, O, A2, B`,
  `question: Describe the formation of H A and B soluble substances. Question: The presence of ABH soluble substances in body secretions depends on inheriting which gene? Page 88.
Secretor gene, H gene, A gene, B gene`,
  `question: Describe the formation of H A and B soluble substances. Question: What percentage of the U.S. population are secretors? Page 88.
80%, 50%, 20%, 99%`,
  `question: Describe the formation of H A and B soluble substances. Question: What is the precursor substance for ABH antigens in secretions called? Page 88.
Type I, Type II, Paragloboside, Glycan`,
  `question: Describe the qualitative and quantitative A subgroup phenotypes to include their characteristics. Question: What is the most common subgroup of A? Page 88.
A1, A2, A3, Aint`,
  `question: Describe the qualitative and quantitative A subgroup phenotypes to include their characteristics. Question: Which A subgroup is known for exhibiting a classic mixed-field agglutination reaction? Page 89.
A3, A1, A2, Ax`,
  `question: Describe the qualitative and quantitative A subgroup phenotypes to include their characteristics. Question: The anti-A1 lectin is made from the seeds of which plant? Page 89.
Dolichos biflorus, Ulex europaeus, Vicia graminea, Salvia sclarea`,
  `question: Describe the qualitative and quantitative A subgroup phenotypes to include their characteristics. Question: Anti-A1 lectin will agglutinate A1 cells but will not agglutinate which cells? Page 89.
A2 cells, O cells, B cells, Bombay cells`,
  `question: Describe the characteristics of the Bombay phenotype to include the reaction with Ulex europaeus. Question: What is the genotype for the Bombay phenotype? Page 90.
hh, HH, Hh, SeSe`,
  `question: Describe the characteristics of the Bombay phenotype to include the reaction with Ulex europaeus. Question: Individuals with the Bombay phenotype cannot make the transferase needed to produce what? Page 90.
H chains, A chains, B chains, O chains`,
  `question: Describe the characteristics of the Bombay phenotype to include the reaction with Ulex europaeus. Question: An individual with the Bombay phenotype makes a potent antibody against which antigen? Page 90.
Anti-H, Anti-A, Anti-B, Anti-A1`,
  `question: Describe the characteristics of the Bombay phenotype to include the reaction with Ulex europaeus. Question: How do red blood cells of the Bombay phenotype react with anti-H lectin? Page 90.
They do not react, They show strong agglutination, They show weak agglutination, They show mixed-field agglutination`,
  `question: Describe the characteristics of the Bombay phenotype to include the reaction with Ulex europaeus. Question: A person with the Bombay phenotype can only receive blood from whom? Page 90.
Another Bombay individual, A group O individual, A group A individual, A universal donor`,
  `question: Describe the effects of disease on the expression of H A and B antigens and antibodies. Question: Which condition is associated with the 'acquired B phenomenon'? Page 91.
Carcinoma of the colon, Leukemia, Hodgkin's disease, Multiple Myeloma`,
  `question: Describe the effects of disease on the expression of H A and B antigens and antibodies. Question: Carcinoma of the stomach or pancreas may cause a lack of detectable ABO antigens in forward typing due to what? Page 91.
Excessive soluble substances, Weakened antigens, Chromosome translocation, Mixed-field reactions`,
  `question: Differentiate between the ABO group discrepancies. Question: What does an ABO discrepancy imply? Page 92.
The forward and reverse grouping do not agree, The patient has a rare blood type, The sample is contaminated, The reagents are expired`,
  `question: Differentiate between the ABO group discrepancies. Question: What is the most frequent cause of ABO discrepancies? Page 92.
Technical error, Subgroups of A, Cold autoantibodies, Rouleaux`,
  `question: Differentiate between the ABO group discrepancies. Question: Which group of discrepancies is due to weakly reacting or missing antibodies? Page 93.
Group I, Group II, Group III, Group IV`,
  `question: Differentiate between the ABO group discrepancies. Question: Newborns and elderly patients are common populations for which group of discrepancies? Page 93.
Group I, Group II, Group III, Group IV`,
  `question: Differentiate between the ABO group discrepancies. Question: What is the presence of two cell populations in a single individual called? Page 93.
Chimerism, Mosaicism, Bombay, Polyagglutination`,
  `question: Differentiate between the ABO group discrepancies. Question: Which group of discrepancies is associated with unexpected reactions in the forward grouping due to weakly reacting or missing antigens? Page 94.
Group II, Group I, Group III, Group IV`,
  `question: Differentiate between the ABO group discrepancies. Question: Subgroups of A and B are a common cause of which group of discrepancies? Page 94.
Group II, Group I, Group III, Group IV`,
  `question: Differentiate between the ABO group discrepancies. Question: Which group of discrepancies is caused by protein or plasma abnormalities leading to rouleaux? Page 94.
Group III, Group I, Group II, Group IV`,
  `question: Differentiate between the ABO group discrepancies. Question: The coin-like stacking of erythrocytes seen in Group III discrepancies is called what? Page 94.
Rouleaux, Agglutination, Hemolysis, Chimerism`,
  `question: Differentiate between the ABO group discrepancies. Question: What is the recommended technique to resolve a Group III discrepancy caused by rouleaux? Page 94.
Saline replacement, Incubation at 4 C, Using lectins, Washing cells with plasma`,
  `question: Differentiate between the ABO group discrepancies. Question: Which group of discrepancies includes problems like cold reactive antibodies and polyagglutination? Page 95.
Group IV, Group I, Group II, Group III`,
  `question: Differentiate between the ABO group discrepancies. Question: How might a Group IV discrepancy caused by a cold autoantibody be resolved? Page 95.
Warm blood to 37C, Incubate at room temperature, Use saline replacement, Test with lectins`,
  `question: Differentiate between the ABO group discrepancies. Question: If an ABO discrepancy cannot be resolved and blood is needed emergently what should be administered? Page 92.
Group O-compatible RBCs, Group AB plasma, The patient's own type, Whole blood`,
  `question: Differentiate between the ABO group discrepancies. Question: Before blood transfusion all ABO discrepancies MUST be what? Page 91.
Resolved, Documented, Ignored, Reported`
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