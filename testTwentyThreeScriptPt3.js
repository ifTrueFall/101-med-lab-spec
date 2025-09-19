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
`Explain the origin of the term Rh. Who first discovered the antibody that led to the Rh system in the serum of a mother who had a transfusion reaction to her husband's blood? Page 98.
Levine and Stetson, Landsteiner and Wiener, Fisher and Race, Rosenfield and Coworkers`,
`Explain the origin of the term Rh. Landsteiner and Wiener identified the Rh system by immunizing guinea pigs and rabbits with red cells from what animal? Page 98.
Rhesus monkeys, Chimpanzees, Baboons, Humans`,
`Explain the origin of the term Rh. The antibody produced in animals by Landsteiner and Wiener was later renamed to what? Page 99.
Anti-LW, Anti-Rh, Anti-D, Anti-hr`,
`Explain the origin of the term Rh. After ABO the Rh system is considered the _________ most important blood group system. Page 98.
second, third, fourth, least`,
`Explain the origin of the term Rh. Unlike ABO antigens which are carbohydrates Rh specific antigens reside on what? Page 98.
Proteins, Lipids, Glycolipids, Polysaccharides`,
`Differentiate the Fisher-Race and Wiener theories of Rh inheritance. The Fisher-Race theory proposed that the Rh locus contains how many distinct genes? Page 99.
Three, One, Two, Five`,
`Differentiate the Fisher-Race and Wiener theories of Rh inheritance. The Wiener theory proposed how many genes were responsible for defining Rh? Page 99.
One, Three, Two, Four`,
`Differentiate the Fisher-Race and Wiener theories of Rh inheritance. In the Wiener theory one gene produces an agglutinogen containing a series of what? Page 99.
Blood factors, Haplotypes, Antigens, Antibodies`,
`Differentiate the Fisher-Race and Wiener theories of Rh inheritance. What percentage of the population is considered D-positive? Page 99.
85%, 15%, 50%, 100%`,
`Differentiate the five major Rh antigens genotypes and haplotypes from one nomenclature to another. Which nomenclature uses the DdCcEe symbols? Page 100.
Fisher-Race, Wiener, Rosenfield, ISBT`,
`Differentiate the five major Rh antigens genotypes and haplotypes from one nomenclature to another. In the Fisher-Race terminology what does the 'd' notation signify? Page 100.
The absence of D antigen, The presence of a weak D, A different D antigen, A silent allele`,
`Differentiate the five major Rh antigens genotypes and haplotypes from one nomenclature to another. Which Rh antigen has the highest frequency in Caucasians? Page 100.
e, D, c, C`,
`Differentiate the five major Rh antigens genotypes and haplotypes from one nomenclature to another. Which Rh antigen has the lowest frequency in Caucasians? Page 100.
E, e, D, c`,
`Differentiate the five major Rh antigens genotypes and haplotypes from one nomenclature to another. In the Wiener nomenclature what does an upper case 'R' indicate? Page 100.
Presence of the D antigen, Absence of the D antigen, Presence of the C antigen, Presence of the E antigen`,
`Differentiate the five major Rh antigens genotypes and haplotypes from one nomenclature to another. Which nomenclature assigns numbers to Rh antigens in order of their discovery? Page 101.
Rosenfield, Wiener, Fisher-Race, ISBT`,
`Differentiate the five major Rh antigens genotypes and haplotypes from one nomenclature to another. In the Rosenfield system what designation is given to the D antigen? Page 101.
RH1, RH2, RH3, RH4`,
`Differentiate the five major Rh antigens genotypes and haplotypes from one nomenclature to another. What is the three-digit number assigned to the Rh system by the ISBT? Page 101.
004, 001, 002, 003`,
`Describe the basic biochemical structure of Rh. The RH locus which contains the genes for Rh antigens is assigned to which chromosome? Page 102.
Chromosome 1, Chromosome 6, Chromosome 9, Chromosome 19`,
`Describe the basic biochemical structure of Rh. Which two closely linked genes are responsible for the expression of Rh protein antigens? Page 102.
RHD and RHCE, RHAG and RHD, RHCE and RHAG, RHD and RH50`,
`Describe the basic biochemical structure of Rh. The RHD gene determines the presence or absence of which antigen? Page 102.
D antigen, C antigen, E antigen, c antigen`,
`Describe the basic biochemical structure of Rh. The RHCE gene is responsible for the production of which antigens? Page 102.
C or c and E or e, Only D, Only C and c, Only E and e`,
`Describe the basic biochemical structure of Rh. Which gene located on chromosome 6 is called a coexpressor and is necessary for Rh antigen expression? Page 102.
RHAG, RHD, RHCE, FY`,
`Describe the basic biochemical structure of Rh. The proteins produced by the RHD and RHCE genes are described as what? Page 102.
Nonglycosylated, Glycosylated, Phosphorylated, Acetylated`,
`Describe the basic biochemical structure of Rh. Besides maintaining structural integrity of the RBC what other function might Rh proteins have? Page 103.
Gas transporters, Oxygen carriers, Glucose transporters, Ion channels`,
`Predict the offspring's Rh phenotypes and genotypes related to various Rh matings. In individuals of European ethnicity what is the most common cause of an Rh-negative phenotype? Page 103.
Deletion of RHD gene, RHD pseudogene, Alteration in RHD gene, Deletion of RHCE gene`,
`Predict the offspring's Rh phenotypes and genotypes related to various Rh matings. In individuals of African ethnicity an Rh-negative phenotype is often caused by what? Page 103.
RHD pseudogene, Deletion of RHD gene, A mutated RHCE gene, Deletion of RHAG gene`,
`Predict the offspring's Rh phenotypes and genotypes related to various Rh matings. A father with genotype R1R1 and a mother with genotype R1R2 have a 50% chance of having a child with which genotype? Page 104.
R1R1, R1R2, R2R2, r'r'`,
`Predict the offspring's Rh phenotypes and genotypes related to various Rh matings. A father with genotype Ror and a mother with genotype R1R2 can have an offspring with which genotype? Page 104.
R1Ro, R1R1, R2R1, Rr`,
`Differentiate the mechanisms that result in weak-D expression on red blood cells. A weak D is a D antigen that types as D-negative on immediate spin but D-positive in which phase of testing? Page 104.
Indirect antiglobulin test, Saline phase, LISS phase, Enzyme phase`,
`Differentiate the mechanisms that result in weak-D expression on red blood cells. Which type of weak D is the result of inheriting genes that code for a weakened expression of the D antigen? Page 105.
Genetic Weak D, Position Effect, Partial D, Del`,
`Differentiate the mechanisms that result in weak-D expression on red blood cells. Which mechanism of weak D expression is more common in Blacks and rarely found in whites? Page 105.
Genetic Weak D, Partial D, Del, C in Trans`,
`Differentiate the mechanisms that result in weak-D expression on red blood cells. What is the term for the weak D expression that occurs when the C antigen is in the trans position to the D antigen? Page 105.
Position Effect, Genetic Weak D, Partial D, D Mosaic`,
`Differentiate the mechanisms that result in weak-D expression on red blood cells. Which type of weak D is also known as D Mosaic? Page 105.
Partial D, Genetic Weak D, Position Effect, Del`,
`Differentiate the mechanisms that result in weak-D expression on red blood cells. Individuals with which type of weak D can produce anti-D when transfused with normal D-positive RBCs? Page 105.
Partial D, Genetic Weak D, Position Effect, C in Trans`,
`Differentiate the mechanisms that result in weak-D expression on red blood cells. Which weak D phenotype results from missing some of the D components or epitopes on the extracellular loops? Page 105.
Partial D, Genetic Weak D, Trans C, Del`,
`List the instances in which the weak-D status of an individual must be determined. Determination of weak D status is required when testing blood from which group? Page 106.
Donors, All patients, All newborns, Geriatric patients`,
`List the instances in which the weak-D status of an individual must be determined. Determining the Rh status for which patient population is considered critical? Page 106.
Obstetric patients, Trauma patients, Pediatric patients, Oncology patients`,
`List the instances in which the weak-D status of an individual must be determined. Rh-negative mothers are candidates for what treatment to prevent the development of anti-D? Page 106.
Rh Immune Globulin, A blood transfusion, Intravenous immunoglobulin, A plasma exchange`,
`Describe characteristics of Rh antibodies. What is the most common immunoglobulin class for Rh antibodies? Page 106.
IgG, IgM, IgA, IgE`,
`Describe characteristics of Rh antibodies. At what temperature do Rh antibodies show optimal detection? Page 106.
37 C, 4 C, 22 C, 56 C`,
`Describe characteristics of Rh antibodies. How is the reactivity of Rh antibodies affected by enzyme treatment of red cells? Page 107.
Enhanced, Decreased, Unaffected, Destroyed`,
`Describe characteristics of Rh antibodies. What serological phenomenon do most Rh antibodies (except anti-D) typically show? Page 107.
Dosage, Prozone, Postzone, Mixed-field`,
`Describe characteristics of Rh antibodies. The D antigen is the most immunogenic antigen outside of which system? Page 107.
ABO system, Kell system, Duffy system, MNS system`,
`Describe characteristics of Rh antibodies. Do Rh antibodies typically bind complement? Page 107.
Very rarely, Always, Often, Never`,
`Describe symptoms associated with an Rh hemolytic transfusion reaction. After a secondary exposure to an Rh antigen how quickly can a circulating antibody appear? Page 108.
2 to 7 days, 120 days, 30 days, 6 months`,
`Describe symptoms associated with an Rh hemolytic transfusion reaction. Which of the following is a symptom of an Rh hemolytic transfusion reaction? Page 108.
Unexplained fever, High blood pressure, Decreased bilirubin, Increased haptoglobin`,
`Describe symptoms associated with an Rh hemolytic transfusion reaction. In an Rh transfusion reaction what is the expected result of a DAT? Page 108.
Usually positive, Always negative, Variable, Usually negative`,
`Describe symptoms associated with an Rh hemolytic transfusion reaction. Which subclasses of IgG are of the greatest clinical significance for Rh antibodies? Page 108.
IgG1 and IgG3, IgG2 and IgG4, IgG1 and IgG2, IgG3 and IgG4`,
`Describe symptoms associated with an Rh hemolytic transfusion reaction. Why is HDFN caused by Rh antibodies often severe? Page 108.
Rh antigens are well developed on fetal cells, Rh antibodies are IgM, Rh antibodies bind complement, Fetal cells lack Rh antigens`,
`Describe symptoms associated with an Rh hemolytic transfusion reaction. What is Rh-immune globulin a purified preparation of? Page 108.
IgG anti-D, IgM anti-D, IgA anti-D, IgE anti-D`,
`Describe the regulator type of Rhnull and the amorphic Rhnull. In the regulator type of Rhnull what gene is absent or mutated? Page 109.
RHAG, RHD, RHCE, RH50`,
`Describe the regulator type of Rhnull and the amorphic Rhnull. In the amorph type of Rhnull which genes are mutated or deleted? Page 109.
RHCE and RHD, RHAG, RHAG and RHD, RHAG and RHCE`,
`Describe the regulator type of Rhnull and the amorphic Rhnull. The total absence of Rh system antigens results in a defect in the red cell membrane causing what condition? Page 109.
Mild hemolytic anemia, Severe hemolytic anemia, Sickle cell anemia, Aplastic anemia`,
`Compare and contrast Rhnull and Rhmod. Individuals who fail to express any Rh antigens on their RBC surface are said to have what? Page 109.
Rhnull syndrome, Rhmod phenotype, Weak D phenotype, Partial D phenotype`,
`Compare and contrast Rhnull and Rhmod. What is the genetic cause of the Rhmod phenotype? Page 109.
Mutations in the RHAG gene, Deletion of the RHD gene, A normal RHAG gene, Mutations in the RHD gene`,
`Compare and contrast Rhnull and Rhmod. How does the clinical condition of Rhmod patients compare to those with Rhnull syndrome? Page 109.
Usually less severe, Always more severe, Identical, Unrelated`,
`Compare and contrast Rhnull and Rhmod. An individual with Rhnull syndrome who requires a transfusion can only receive what type of blood? Page 109.
Rhnull blood, O negative blood, Any Rh negative blood, Washed O negative blood`,
`Compare and contrast Rhnull and Rhmod. What abnormal red blood cell morphology is associated with Rhnull syndrome? Page 109.
Stomatocytosis, Spherocytosis, Target cells, Sickle cells`,
`Compare and contrast Rhnull and Rhmod. The Rhmod phenotype exhibits a partial suppression of Rh gene expression resulting in what? Page 109.
Severely reduced Rh antigens, No Rh antigens, Normal Rh antigens, Enhanced Rh antigens`
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