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

//    DEFINE YOUR QUESTIONS HERE
//    Use the format: 'question: <Question's Text> <new line> 
// <Correct Answer>, <Wrong1>, <Wrong2>, <Wrong3>'
const myQuestions = [
  `question: What is defined as a systemic response to infection tissue injury or inflammatory process?
Acute Phase Reaction, Affinity Reaction, Avidity Process, Allergic Reaction`,
  `question: What term describes the measure of binding strength of a single antibody-antigen reaction?
Affinity, Avidity, Reactivity, Specificity`,
  `question: What are the building blocks or subunits of proteins called?
Amino Acids, Nucleic Acids, Fatty Acids, Monosaccharides`,
  `question: What is an apoprotein?
A protein lacking its ligand or prosthetic group, A fully functional protein, A protein bound to a carbohydrate, A denatured protein`,
  `question: What is the term for an accumulation of fluid in the abdominal cavity?
Ascites, Edema, Effusion, Hydrops`,
  `question: What term describes the overall strength of binding antibody to antigen including all binding sites?
Avidity, Affinity, Potency, Capacity`,
  `question: Lipoproteins are an example of what type of protein?
Conjugated Proteins, Simple Proteins, Fibrous Proteins, Globular Proteins`,
  `question: What is a molecule with a chemical structure similar to an antigen that binds the specific antibody called?
Cross Reactant, Isoantigen, Alloantigen, Autoantigen`,
  `question: What term describes the unfolding or disorganization of a protein's tertiary structure?
Denaturation, Hydrolysis, Polymerization, Saturation`,
  `question: What is a primary consequence of protein denaturation?
Loss of function, Alteration of primary structure, Increased solubility, Formation of new peptide bonds`,
  `question: Which of these is a cause of protein denaturation?
Changes in pH, Stable temperature, Neutral salt solutions, Low mechanical stress`,
  `question: What molecule carries genetic information and is a double-stranded polymer of nucleotides?
Deoxyribonucleic Acid DNA, Ribonucleic Acid RNA, Amino Acid, Polypeptide`,
  `question: What is an increase in interstitial fluid volume called?
Edema, Ascites, Lymphedema, Anasarca`,
  `question: What are the two types of nucleic acids critical to living organisms?
DNA and RNA, Proteins and Lipids, Carbohydrates and Fats, ATP and ADP`,
  `question: Which of these is a component of nucleic acids?
Phosphate group, Sulfate group, Amino group, Carboxyl group`,
  `question: Which five-carbon sugar is found in DNA?
2'-deoxyribose, Ribose, Glucose, Fructose`,
  `question: The physiological function of a nucleic acid is based off its what?
Structure, Size, Location, Color`,
  `question: Adenine and Guanine are examples of what type of nitrogenous base?
Purines, Pyrimidines, Nucleosides, Nucleotides`,
  `question: Cytosine Thymine and Uracil are examples of what type of nitrogenous base?
Pyrimidines, Purines, Amino acids, Pentoses`,
  `question: Which nitrogenous base is found in RNA but not in DNA?
Uracil, Thymine, Guanine, Adenine`,
  `question: Which nitrogenous base is found in DNA but not in RNA?
Thymine, Uracil, Cytosine, Adenine`,
  `question: What is the term for the process of transferring sequence information from DNA to an mRNA molecule?
Transcription, Translation, Replication, Transduction`,
  `question: What process involves an mRNA sequence forming an amino acid sequence with the help of tRNA?
Translation, Transcription, Conjugation, Mutation`,
  `question: What cyclic series of reactions detoxifies ammonium ions by incorporating them into urea?
Urea Cycle, Krebs Cycle, Glycolysis, Gluconeogenesis`,
  `question: What is a unit of DNA that specifies production of proteins and RNA molecules called?
Gene, Codon, Anticodon, Operon`,
  `question: What is the term for the amount of time required to reduce a substance in the plasma to one half of its initial value?
Half-Life, Doubling Time, Lag Phase, Steady State`,
  `question: What is a holoprotein?
A completely functional protein with its ligand or prosthetic group, A protein without its ligand, A structural protein, An enzyme inhibitor`,
  `question: Hemoglobin is an example of what type of protein?
Holoprotein, Apoprotein, Simple protein, Fibrous protein`,
  `question: What is a ligand in the context of protein structure?
A molecule ion or atom that is part of a completely functional protein, The protein itself, A lipid attached to a protein, A carbohydrate chain`,
  `question: What is formed by the combination of a sugar with a purine or pyrimidine base?
Nucleoside, Nucleotide, Nucleic Acid, Amino Acid`,
  `question: What is a unit of DNA or RNA consisting of a base sugar and at least one phosphate group called?
Nucleotide, Nucleoside, Peptide, Polynucleotide`,
  `question: DNA and RNA are polymers made of what monomers?
Nucleotide monomers, Amino acid monomers, Glucose monomers, Fatty acid monomers`,
  `question: What are chains of amino acid residues up to 5 residues in length called?
Oligopeptide, Polypeptide, Protein, Dipeptide`,
  `question: What is a monoclonal immunoglobulin produced in excessive amounts often seen in multiple myeloma?
Paraprotein, Cryoglobulin, Agglutinin, Opsonin`,
  `question: What type of bond is formed between a primary amino group of one amino acid and the carboxylic group of another?
Peptide Bond, Hydrogen Bond, Disulfide Bond, Ionic Bond`,
  `question: What are chains of amino acid residues that are 6 to 30 residues in length called?
Polypeptide, Oligopeptide, Protein subunit, Amino acid sequence`,
  `question: What is a non-protein chemical group bound to a protein and responsible for its biological activity called?
Prosthetic Group, Ligand, Substrate, Cofactor`,
  `question: Coenzymes are examples of what type of group that can be bound to a protein?
Prosthetic Group, Active Site, Allosteric Site, Inhibitory Group`,
  `question: How are nucleotides linked in DNA and RNA polymers?
Through phosphate-glycoside bonds at the 3 prime and 5 prime positions, Through peptide bonds, Through hydrogen bonds between sugars, Through disulfide bridges`,
  `question: What determines the genetic code within a cell?
The order or sequence of nucleotides in DNA, The number of chromosomes, The type of RNA polymerase, The amount of protein synthesized`,
  `question: What is the characteristic structure of DNA?
Double helix, Single strand, Branched chain, Circular loop`,
  `question: The two strands of DNA are held together in large part by what type of bonds between nitrogenous bases?
Hydrogen bonds, Covalent bonds, Ionic bonds, Peptide bonds`,
  `question: In DNA base pairing Adenine bonds with which base?
Thymine, Guanine, Cytosine, Uracil`,
  `question: In DNA base pairing Cytosine bonds with which base?
Guanine, Thymine, Adenine, Uracil`,
  `question: Why are the two strands of DNA termed complementary?
The base sequence of one strand determines the base sequence of the other, They have identical sequences, They run in the same direction, They have the same number of purines`,
  `question: The two strands of DNA run in opposite directions this formation is called what?
Antiparallel, Parallel, Orthogonal, Co-linear`,
  `question: How are the carbons of the sugar ring in a nucleoside labeled to distinguish them from the base ring carbons?
With a prime symbol, With a number, With a letter, With a Roman numeral`,
  `question: What is the nucleoside formed when ribose combines with adenine?
Adenosine, Deoxyadenosine, Guanosine, Cytidine`,
  `question: What is the nucleoside formed when 2'-deoxyribose combines with thymine?
Thymidine, Deoxyuridine, Uridine, Deoxycytidine`,
  `question: Which nucleoside is only found in DNA and does not require a prefix like 'deoxy'?
Thymidine, Uridine, Adenosine, Cytidine`,
  `question: Which base is only found in RNA and will not be combined with 2'-deoxyribose?
Uracil, Thymine, Guanine, Adenine`,
  `question: Purines and pyrimidines serve as core components of DNA RNA and what energy molecule?
Adenosine triphosphate ATP, Glucose-6-phosphate, Creatine phosphate, Nicotinamide adenine dinucleotide NAD`,
  `question: The synthesis of mRNA from a DNA template is a process called what?
Transcription, Translation, Replication, Post-translational modification`,
  `question: Transcription is catalyzed by which enzyme?
RNA polymerase, DNA polymerase, Helicase, Ligase`,
  `question: What is the first stage of transcription where RNA polymerase binds to a specific nucleotide sequence?
Initiation, Elongation, Termination, Activation`,
  `question: The process of protein synthesis from an mRNA template is also called what?
Translation, Transcription, Transamination, Translocation`,
  `question: Which type of RNA carries the genetic information for a protein from DNA to the ribosomes?
Messenger RNA mRNA, Transfer RNA tRNA, Ribosomal RNA rRNA, Small nuclear RNA snRNA`,
  `question: What is the 3-nucleotide sequence on mRNA that interacts with the anticodon on tRNA during protein synthesis?
Codon, Anticodon, Gene, Exon`,
  `question: Which type of RNA is a structural and functional component of the ribosomes?
Ribosomal RNA rRNA, Messenger RNA mRNA, Transfer RNA tRNA, MicroRNA miRNA`,
  `question: Which type of RNA translates the genetic code of mRNA into the primary sequence of amino acids in a protein?
Transfer RNA tRNA, Messenger RNA mRNA, Ribosomal RNA rRNA, Long non-coding RNA lncRNA`
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