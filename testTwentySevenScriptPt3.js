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
  `question: Compare heterogenous and homogenous immunoassays. Which type of immunoassay involves a solid phase and requires washing steps? Page 332.
Heterogeneous, Homogeneous, Competitive, Noncompetitive`,
  `question: Compare heterogenous and homogenous immunoassays. Which type of immunoassay consists of only a liquid phase and does not require washing steps? Page 332.
Homogeneous, Heterogeneous, Direct, Indirect`,
  `question: Compare heterogenous and homogenous immunoassays. What is an advantage of homogeneous immunoassays over heterogeneous ones? Page 332.
They are faster and easier to automate, They are more sensitive, They have noncompetitive formats, They use enzyme labels`,
  `question: Compare heterogenous and homogenous immunoassays. Heterogeneous immunoassays can have a competitive or what other format? Page 332.
A noncompetitive format, A direct format, An indirect format, A liquid format`,
  `question: Describe the characteristics of the different types of labels used in immunoassay. Which of the following is NOT one of the three main types of labels used in modern immunoassays? Page 332.
Radioisotope, Enzyme immunoassay, Chemiluminescence, Fluorescent substances`,
  `question: Describe the characteristics of the different types of labels used in immunoassay. The original technique of using antigen-coated cells or particles may be considered the earliest form of labeling in which type of technique? Page 332.
Agglutination, ELISA, Chemiluminescence, Nephelometry`,
  `question: Describe chemiluminescence. Chemiluminescence is defined as light emission produced during what type of event? Page 333.
A chemical reaction, An enzymatic reaction, A radioactive decay, An electrical discharge`,
  `question: Describe chemiluminescence. What is an advantage of using chemiluminescence methodology in immunoassays? Page 333.
Excellent sensitivity and dynamic range, It requires sample radiation, Reagents are highly toxic, It is a subjective measurement`,
  `question: Compare and contrast chemiluminescence enzyme immunoassay (EIA) and immunofluorescence techniques. Enzyme-linked immunosorbent assay (ELISA) is also known as what? Page 333.
Enzyme immunoassay (EIA), Chemiluminescence, Immunofluorescence, Nephelometry`,
  `question: Compare and contrast chemiluminescence enzyme immunoassay (EIA) and immunofluorescence techniques. What is a key advantage of using nonisotopic labels in EIA? Page 333.
Safety, Low cost, Speed, Simplicity`,
  `question: Compare and contrast chemiluminescence enzyme immunoassay (EIA) and immunofluorescence techniques. Which of the following is NOT a required characteristic for an enzyme to be used in an EIA? Page 334.
It must be present in the antigen or antibody being tested, It must exhibit a high degree of stability, It must show extreme specificity, It must not be present in the sample`,
  `question: Compare and contrast chemiluminescence enzyme immunoassay (EIA) and immunofluorescence techniques. In a noncompetitive EIA the amount of color that develops is what to the amount of antibody in the patient's serum? Page 334.
Proportional, Inversely proportional, Unrelated, Exponentially related`,
  `question: Compare and contrast chemiluminescence enzyme immunoassay (EIA) and immunofluorescence techniques. In a competitive EIA the amount of color that develops is what to the amount of antibody in the patient's serum? Page 334.
Inversely proportional, Proportional, Unrelated, Logarithmically related`,
  `question: Compare and contrast chemiluminescence enzyme immunoassay (EIA) and immunofluorescence techniques. A capture EIA is designed to detect a specific type of what? Page 334.
Antibody, Antigen, Enzyme, Substrate`,
  `question: Compare and contrast chemiluminescence enzyme immunoassay (EIA) and immunofluorescence techniques. In a competitive chemiluminescence immunoassay the amount of light emitted is what to the amount of analyte measured? Page 335.
Inversely proportional, Directly proportional, Not related, Exponentially related`,
  `question: Compare and contrast chemiluminescence enzyme immunoassay (EIA) and immunofluorescence techniques. In a sandwich chemiluminescence immunoassay the amount of emitted light is what to the analyte concentration? Page 335.
Directly proportional, Inversely proportional, Not related, Logarithmically related`,
  `question: Compare and contrast chemiluminescence enzyme immunoassay (EIA) and immunofluorescence techniques. Which of the following is a major group of chemiluminescent labels? Page 335.
Acridinium esters, Fluorescein isothiocyanate, Horseradish peroxidase, Alkaline phosphatase`,
  `question: Compare and contrast chemiluminescence enzyme immunoassay (EIA) and immunofluorescence techniques. What is a common fluorescent compound used to label antibodies in immunofluorescence techniques? Page 335.
Fluorescein isothiocyanate (FITC), Acridinium ester, Luminol, Biotin`,
  `question: Compare and contrast chemiluminescence enzyme immunoassay (EIA) and immunofluorescence techniques. What is a key advantage of using enzyme-substrate marker systems like HRP or ALP over fluorescent dyes? Page 336.
They only require a standard light microscope, They are more sensitive, They are faster, They are less expensive`,
  `question: Compare and contrast chemiluminescence enzyme immunoassay (EIA) and immunofluorescence techniques. Which immunofluorescent assay uses a conjugated antibody to detect antigen-antibody reactions at a microscopic level? Page 336.
Direct immunofluorescent assay (DFA), Indirect immunofluorescent assay (IFA), Inhibition immunofluorescent assay (IIA), Competitive immunofluorescent assay`,
  `question: Compare and contrast chemiluminescence enzyme immunoassay (EIA) and immunofluorescence techniques. Which immunofluorescent assay is used extensively in the detection of autoantibodies? Page 336.
Indirect immunofluorescent assay (IFA), Direct immunofluorescent assay (DFA), Inhibition immunofluorescent assay (IIA), Sandwich immunofluorescent assay`,
  `question: Compare and contrast chemiluminescence enzyme immunoassay (EIA) and immunofluorescence techniques. SQUID technology uses superparamagnetic particles to tag antibodies and has been used to detect what bacteria? Page 336.
Listeria monocytogenes, Escherichia coli, Staphylococcus aureus, Streptococcus pyogenes`,
  `question: Describe the principles of Nephelometry. Nephelometry depends on what property of antigen-antibody complexes? Page 337.
Light-scattering, Light-absorption, Fluorescence, Chemiluminescence`,
  `question: Describe the principles of Nephelometry. In immunology nephelometry is used to measure complement components antibodies and what else? Page 337.
Immune complexes, Cell counts, DNA concentration, Enzyme activity`,
  `question: Describe the principles of Nephelometry. What is used in nephelometry to enhance and stabilize precipitates increasing the speed and sensitivity of the technique? Page 337.
Polyethylene glycol (PEG), Bovine serum albumin (BSA), Low ionic strength saline (LISS), Distilled water`,
  `question: Describe the principles of Nephelometry. The relationship between the quantity of antigen and the measuring signal at a constant antibody concentration is expressed by what? Page 338.
The Heidelberger curve, The Lineweaver-Burk plot, The Michaelis-Menten curve, The standard deviation curve`,
  `question: Describe the principles of Nephelometry. In nephelometry if the antigen overwhelms the quantity of antibody what happens to the measured signal? Page 338.
The signal drops, The signal increases, The signal stays constant, The signal becomes negative`,
  `question: Describe the principles of Flow Cytometry. Flow cytometry combines fluid dynamics optics laser science computers and what other component? Page 338.
Fluorochrome-conjugated monoclonal antibodies, Enzyme-labeled antibodies, Radiolabeled antigens, Magnetic beads`,
  `question: Describe the principles of Flow Cytometry. What is a major application of flow cytometry? Page 338.
Identification and sorting of cells, Measuring protein concentration, Amplifying DNA, Separating nucleic acids`,
  `question: Describe the principles of Flow Cytometry. The principle of flow cytometry is based on cells being stained in suspension with what? Page 338.
A fluorochrome, An enzyme, A radioisotope, A magnetic particle`,
  `question: Describe the Polymerase Chain Reaction (PCR) amplification technique. What is the primary function of the Polymerase Chain Reaction (PCR)? Page 339.
To amplify low levels of specific DNA sequences, To sequence entire genomes, To separate proteins by size, To detect antigen-antibody complexes`,
  `question: Describe the Polymerase Chain Reaction (PCR) amplification technique. To use PCR technology what must be known about the DNA sequence? Page 339.
The target sequence, The entire genome sequence, The protein it codes for, Its chromosomal location`,
  `question: Describe the Polymerase Chain Reaction (PCR) amplification technique. What is the first step in a PCR cycle? Page 339.
DNA denaturation, Primer annealing, Extension of primed DNA, Ligation`,
  `question: Describe the Polymerase Chain Reaction (PCR) amplification technique. The separation of double DNA strands into two single strands through the use of heat is called what? Page 339.
Denaturation, Annealing, Extension, Hybridization`,
  `question: Describe the Polymerase Chain Reaction (PCR) amplification technique. The recombination of oligonucleotide primers with the single-stranded original DNA is called what? Page 339.
Primer annealing, Denaturation, Extension, Ligation`,
  `question: Describe the Polymerase Chain Reaction (PCR) amplification technique. The enzyme DNA polymerase synthesizes new complementary strands during which step of the PCR cycle? Page 339.
Extension, Annealing, Denaturation, Termination`,
  `question: Describe the Polymerase Chain Reaction (PCR) amplification technique. Each cycle of PCR theoretically does what to the amount of specific DNA sequence present? Page 339.
Doubles it, Halves it, Triples it, It stays the same`,
  `question: Describe the Polymerase Chain Reaction (PCR) amplification technique. After cycling is completed PCR products are typically examined using what method? Page 339.
Gel electrophoresis, Flow cytometry, Nephelometry, ELISA`,
  `question: Describe the Polymerase Chain Reaction (PCR) amplification technique. What is a significant disadvantage of the highly sensitive PCR assay? Page 340.
It is prone to producing false-positive results, It is very slow, It requires a large sample size, It has low specificity`,
  `question: Describe the Polymerase Chain Reaction (PCR) amplification technique. Which modified PCR technique uses reverse transcriptase to identify RNA viral agents like HIV? Page 341.
Reverse Transcriptase PCR, Real-time PCR, Multiplex PCR, Nested PCR`,
  `question: Describe the Polymerase Chain Reaction (PCR) amplification technique. Which modified PCR technique uses fluorescence to quantitate DNA sequences and is less susceptible to contamination? Page 341.
Real-time PCR, Reverse Transcriptase PCR, Multiplex PCR, Nucleic Acid Sequence-based Amplification`,
  `question: Describe the Polymerase Chain Reaction (PCR) amplification technique. Which molecular method is considered the "gold standard" to which other molecular methods are compared? Page 341.
DNA sequencing, PCR, Southern blot, Northern blot`,
  `question: Describe the general concept of Nucleic Acid blotting. Which of the following is NOT a major type of blotting technique? Page 341.
Eastern blot, Southern blot, Northern blot, Western blot`,
  `question: Describe the general concept of Nucleic Acid blotting. Which of the following is a procedural step shared by Southern and Northern blotting techniques? Page 342.
Transfer of nucleic acid fragments to a solid support, Use of restriction enzymes, Detection of proteins, Use of reverse transcriptase`,
  `question: Describe the general concept of Nucleic Acid blotting. In Southern and Northern blotting what is the solid support to which nucleic acid fragments are transferred? Page 342.
Nitrocellulose, Agarose gel, Polyacrylamide, A plastic bead`,
  `question: Describe the general concept of Nucleic Acid blotting. What is the process of binding a labeled probe to a nucleic acid fragment on a solid support called? Page 342.
Hybridization, Electrophoresis, Denaturation, Blotting`,
  `question: Compare the characteristics and clinical applications of Southern Northern and Western blotting techniques. The Southern blot technique is used to detect what? Page 342.
Specific DNA fragments, Specific RNA fragments, Specific proteins, Specific antibodies`,
  `question: Compare the characteristics and clinical applications of Southern Northern and Western blotting techniques. In a Southern blot what is used to create DNA fragments from the specimen DNA? Page 342.
Restriction enzymes, DNA polymerase, Reverse transcriptase, Heat`,
  `question: Compare the characteristics and clinical applications of Southern Northern and Western blotting techniques. The Southern blot can be used in the clinical diagnosis of which genetic disorder? Page 342.
Sickle cell anemia, Down syndrome, Type 1 diabetes, Rheumatoid arthritis`,
  `question: Compare the characteristics and clinical applications of Southern Northern and Western blotting techniques. The Northern blot technique is used for the detection of what? Page 342.
Specific mRNA, Specific DNA, Specific proteins, Specific lipids`,
  `question: Compare the characteristics and clinical applications of Southern Northern and Western blotting techniques. Is the Northern blot routinely used in clinical molecular diagnostics? Page 343.
No, Yes, Only for genetic diseases, Only for infectious diseases`,
  `question: Compare the characteristics and clinical applications of Southern Northern and Western blotting techniques. The Western blot technique is used to identify what? Page 343.
Specific proteins, Specific DNA sequences, Specific RNA sequences, Specific carbohydrates`,
  `question: Compare the characteristics and clinical applications of Southern Northern and Western blotting techniques. In a Western blot what is used to identify the protein of interest after it is transferred to a membrane? Page 343.
Labeled antibodies, Labeled DNA probes, A specific substrate, A fluorescent dye`,
  `question: Compare the characteristics and clinical applications of Southern Northern and Western blotting techniques. The Western blot is used to detect antibodies to specific epitopes of what? Page 343.
Antigen subspecies, DNA subspecies, RNA subspecies, Lipid subspecies`,
  `question: Compare and contrast chemiluminescence enzyme immunoassay (EIA) and immunofluorescence techniques. A direct immunofluorescent assay uses what to detect antigen-antibody reactions? Page 336.
A conjugated antibody, An unconjugated primary antibody, A labeled antigen, A secondary labeled antibody`,
  `question: Describe the Polymerase Chain Reaction (PCR) amplification technique. What are the short DNA sequences that are complementary to the 3' ends of the target sequence called? Page 339.
Primers, Probes, Amplicons, Templates`,
  `question: Describe the principles of Nephelometry. What is the term for the cloudiness of a solution that can be measured photometrically? Page 337.
Turbidity, Opacity, Density, Viscosity`,
  `question: Compare and contrast chemiluminescence enzyme immunoassay (EIA) and immunofluorescence techniques. What does FITC stand for? Page 335.
Fluorescein isothiocyanate, Ferrous iron transport complex, Fluorescent immunoassay test component, Fast immunologic test cassette`,
  `question: Describe the Polymerase Chain Reaction (PCR) amplification technique. PCR can detect gene mutations that signify the early development of what disease? Page 340.
Cancer, Diabetes, Arthritis, Heart disease`,
  `question: Compare the characteristics and clinical applications of Southern Northern and Western blotting techniques. In a Western blot electrophoresis separates antigen components by what property? Page 343.
Molecular weight, Electrical charge, Shape, Solubility`
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