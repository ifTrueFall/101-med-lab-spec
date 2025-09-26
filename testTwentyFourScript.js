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
  `question: Describe the characteristics of the Lewis Blood Group system to include their clinical significance. How are Lewis antigens placed onto the red blood cell membrane? Page 129.
They are passively adsorbed from the plasma, They are integral to the RBC membrane, They are produced by erythroid precursors, They are attached via an Rh-associated glycoprotein`,
  `question: Describe the formation and secretion of Lewis antigens and their adsorption onto red cells. The Se gene is located on Chromosome 19 and is responsible for producing an enzyme that adds L-Fucose to what? Page 130.
Type 1 Precursor Chains, Type 2 Precursor Chains, The H antigen, The D antigen`,
  `question: Describe the formation and secretion of Lewis antigens and their adsorption onto red cells. Approximately what percentage of the random population are "Secretors" (possess the Se gene)? Page 130.
80%, 20%, 50%, 99%`,
  `question: Discuss the inheritance of the Lewis genes and their interactions with the other blood group genes. The Lewis gene (FUT3) is located on which chromosome? Page 131.
Chromosome 19, Chromosome 1, Chromosome 6, Chromosome 9`,
  `question: Describe the Lewis phenotypes to include substances present in secretions. An individual with the Le(a+b-) phenotype lacks which gene? Page 131.
The Se gene, The Le gene, The H gene, The O gene`,
  `question: Describe the Lewis phenotypes to include substances present in secretions. In order to have the Le(a-b+) phenotype which genes must an individual inherit? Page 131.
Le and Se genes, Le and sese genes, lele and Se genes, lele and sese genes`,
  `question: Describe the Lewis phenotypes to include substances present in secretions. An individual with the Le(a-b-) phenotype lacks which gene? Page 132.
The Lewis gene (lele), The Secretor gene (sese), The H gene (hh), The B gene`,
  `question: Describe the role of secretor genes in formation of Lewis antigens. The presence of the Se gene is required for the conversion of Leª antigen to what? Page 132.
Leᵇ antigen, H antigen, A antigen, P1 antigen`,
  `question: Explain the process of development of the Lewis antigens after birth. At birth newborns typically have which Lewis phenotype? Page 133.
Le(a-b-), Le(a+b-), Le(a-b+), Le(a+b+)`,
  `question: Describe the changes in Lewis phenotypes during pregnancy. What commonly happens to Lewis antigen strength during pregnancy? Page 134.
It may decline dramatically, It increases significantly, It remains unchanged, It converts to a different phenotype`,
  `question: Describe the characteristics of the Lewis antibodies to include their clinical significance. The most commonly encountered Lewis antibody is what? Page 134.
Anti-Leª, Anti-Leᵇ, Anti-Leᵃᵇ, Anti-Leˣ`,
  `question: Describe the characteristics of the Lewis antibodies to include their clinical significance. Lewis antibodies are generally considered clinically insignificant because they are usually which type of immunoglobulin? Page 135.
IgM, IgG, IgA, IgE`,
  `question: Describe the antigens and possible phenotypes of the MNS Blood Group system. The M and N antigens are found on which major sialoglycoprotein? Page 136.
Glycophorin A, Glycophorin B, Glycophorin C, Glycophorin D`,
  `question: Describe the antigens and possible phenotypes of the MNS Blood Group system. The S and s antigens are located on which sialoglycoprotein? Page 136.
Glycophorin B, Glycophorin A, Band 3, Aquaporin-1`,
  `question: Describe the characteristics of the MNS Blood Group antibodies to include their significance. Anti-M is usually what type of immunoglobulin and is rarely clinically significant? Page 136.
IgM, IgG, IgA, IgE`,
  `question: Describe the characteristics of the MNS Blood Group antibodies to include their significance. Anti-S and Anti-s are usually what class of immunoglobulin and are considered clinically significant? Page 137.
IgG, IgM, IgD, IgE`,
  `question: Describe the characteristics of the MNS Blood Group antibodies to include their significance. The S-s-U- phenotype which can produce the dangerous Anti-U is seen almost exclusively in which population? Page 137.
African American, Caucasian, Asian, Hispanic`,
  `question: Describe the reaction of MNS antigens when treated with enzyme AET DTT and ZZAP. How do enzymes like ficin and papain affect the M and N antigens? Page 138.
They are easily destroyed, They are enhanced, They are unaffected, They are partially denatured`,
  `question: Describe the antigens and possible phenotypes of the P and Globoside Blood Group System. The P P1 and Pk antigens are synthesized from which common precursor substance? Page 139.
Lactosylceramide, Paragloboside, Glycophorin A, Ceramide`,
  `question: Describe the antigens and possible phenotypes of the P and Globoside Blood Group System. The P1 antigen's expression may take up to how many years to be fully expressed after birth? Page 140.
7 years, 2 years, 18 years, 6 months`,
  `question: Describe the characteristics of the P and Globoside Blood Group antibodies. The common naturally occurring IgM antibody frequently found in the serum of P₂ individuals is what? Page 141.
Anti-P₁, Anti-P, Anti-Pk, Anti-LKE`,
  `question: Describe the characteristics of the P and Globoside Blood Group antibodies. Which antibody is known as the Donath-Landsteiner antibody and is a powerful biphasic hemolysin? Page 141.
Anti-P, Anti-P₁, Anti-Pk, Anti-PP₁Pk`,
  `question: Describe the diseases associated with the P and Globoside Blood Group System. The Donath-Landsteiner antibody is associated with what condition? Page 142.
Paroxysmal Cold Hemoglobinuria, Infectious Mononucleosis, Mycoplasma pneumonia, Delayed transfusion reactions`,
  `question: Describe the reaction of P antigens when treated with enzymes DTT Chloroquine and Glycine-acid EDTA. How are P system antigens affected by treatment with ficin and papain? Page 142.
They are resistant, They are destroyed, They are enhanced, They are denatured`,
  `question: Describe the reciprocal relationship of I antigen to i antigen. Red cells of newborns are rich in which antigen? Page 142.
i antigen, I antigen, P antigen, M antigen`,
  `question: Describe the reciprocal relationship of I antigen to i antigen. By about 2 years of age a person's red cells are strongly positive for which antigen? Page 142.
I antigen, i antigen, Lewis antigen, Kell antigen`,
  `question: Describe the characteristics of the li Blood Group antibodies. A strong autoanti-I is often associated with infections by which organism? Page 143.
Mycoplasma pneumoniae, Helicobacter pylori, Staphylococcus aureus, Epstein-Barr virus`,
  `question: Describe the characteristics of the li Blood Group antibodies. Anti-i is often associated with which disease? Page 144.
Infectious mononucleosis, Paroxysmal Cold Hemoglobinuria, Malaria, Peptic ulcers`,
  `question: Describe the antigens and possible phenotypes of the Kell Blood Group system. Which Kell system antigen is considered a powerful immunogen second only to the D antigen? Page 145.
K, k, Kpᵃ, Jsᵃ`,
  `question: Describe the antigens and possible phenotypes of the Kell Blood Group system. The Kell-null phenotype (K₀K₀) results in red cells that lack all Kell antigens but express large amounts of what antigen? Page 145.
Kx antigen, U antigen, I antigen, P antigen`,
  `question: Describe the characteristics of the Kell Blood Group Antibodies. After ABO and Rh antibodies which is the most common clinically significant antibody seen in the Blood Bank? Page 146.
Anti-K, Anti-M, Anti-Leᵃ, Anti-P₁`,
  `question: Describe the common characteristics of the McLeod Syndrome. The McLeod phenotype is associated with a lack of which gene leading to poor expression of Kell antigens? Page 147.
XK gene, Ko gene, H gene, Se gene`,
  `question: Describe the common characteristics of the McLeod Syndrome. Red cells in McLeod syndrome exhibit which characteristic morphology? Page 147.
Acanthocytosis, Spherocytosis, Stomatocytosis, Target cells`,
  `question: Describe the reaction of Kell/Kx antigens when treated with enzymes AET DTT and ZZAP. How do routine enzymes like ficin and papain affect Kell antigens? Page 147.
They cannot denature them, They destroy them, They enhance them, They partially destroy them`,
  `question: Describe the reaction of Kell/Kx antigens when treated with enzymes AET DTT and ZZAP. Kell antigens are destroyed by which type of reagents? Page 145.
Sulfhydryl reagents (DTT), Proteolytic enzymes (ficin), Saline, Albumin`,
  `question: Describe the association of the Fy(a-b-) phenotype with Plasmodium vivax resistance. The Fy(a-b-) phenotype confers resistance to red cell invasion by which organism? Page 148.
Plasmodium vivax, Mycoplasma pneumoniae, Helicobacter pylori, Epstein-Barr virus`,
  `question: Describe the antigens and possible phenotypes of the Duffy Blood Group System. The Fy(a-b-) phenotype is found in approximately 68% of which population? Page 148.
American Black, Caucasian, Asian, Hispanic`,
  `question: Describe the characteristics of the Duffy Blood Group antibodies. Duffy antibodies like Anti-Fyᵃ and Anti-Fyᵇ are usually what class of immunoglobulin? Page 149.
IgG, IgM, IgA, IgE`,
  `question: Describe the reaction of Duffy antigens when treated with enzymes AET DTT and ZZAP. How do proteolytic enzymes like ficin and papain affect the Fyᵃ and Fyᵇ antigens? Page 149.
They are destroyed, They are enhanced, They are resistant, They are weakly reactive`,
  `question: Describe the antigens and possible phenotypes of the Kidd Blood Group System. The product of the JK gene is what type of molecule that spans the RBC membrane? Page 149.
Urea transporter, Glycoprotein, Sialoglycoprotein, Anion exchanger`,
  `question: Describe the antigens and possible phenotypes of the Kidd Blood Group System. Red blood cells with the Jk(a-b-) phenotype are resistant to lysis in what solution? Page 149.
2M Urea, Saline, Albumin, LISS`,
  `question: Describe the characteristics of the Kidd Blood Group antibodies. Kidd system antibodies have a notorious reputation in the blood bank because of what characteristic? Page 150.
They fade quickly from circulation, They are always strongly reactive, They are naturally occurring, They are always IgM`,
  `question: Describe why the Kidd antibodies are a common cause of delayed hemolytic transfusion reactions. The decline in antibody reactivity in-vivo is why Kidd antibodies are a primary cause of what condition? Page 151.
Delayed hemolytic transfusion reactions, Acute hemolytic transfusion reactions, Hemolytic disease of the newborn, Paroxysmal Cold Hemoglobinuria`,
  `question: Describe the antigens and possible phenotypes of the Lutheran Blood Group System. The Lutheran null phenotype Lu(a-b-) can be caused by a dominant suppressor gene called what? Page 152.
InLu, LuLu, Se, Xk`,
  `question: Describe the characteristics of the Lutheran Blood Group antibodies. Anti-Luᵃ often displays what characteristic reaction pattern during in vitro testing? Page 153.
Loose mixed-field, Strong 4+ agglutination, Hemolysis, Rouleaux`,
  `question: Describe the characteristics of the Lutheran Blood Group antibodies. Which Lutheran antibody is rare but considered clinically significant and is usually IgG? Page 153.
Anti-Luᵇ, Anti-Luᵃ, Anti-Lu3, Anti-P₁`,
  `question: Describe the biological significance of Lewis antigens. Lewis antigens act as receptors for which microorganism that causes peptic ulcers? Page 135.
Helicobacter pylori, Mycoplasma pneumoniae, Plasmodium vivax, E coli`,
  `question: Describe the reaction of MNS antigens when treated with enzyme AET DTT and ZZAP. Which MNS system antigens are NOT destroyed by trypsin? Page 138.
S and s, M and N, U, Enᵃ`,
  `question: Describe the characteristics of the Kell Blood Group Antibodies. Antibodies to high frequency Kell antigens like anti-k are rare because of what reason? Page 146.
Few people lack the antigen, The antigens are not immunogenic, The antibodies are unstable, The antibodies are IgM`,
  `question: Describe the antigens and possible phenotypes of the Kidd Blood Group System. Are Kidd system antigens well-developed at birth? Page 150.
Yes, No, Only Jkᵃ is developed, Only Jkᵇ is developed`,
  `question: Describe the characteristics of the MNS Blood Group antibodies to include their significance. Most examples of anti-M are naturally occurring ________ agglutinins. Page 137.
cold, warm, IgG, biphasic`
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