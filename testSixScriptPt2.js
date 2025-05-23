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
  `question: What is a compound or mixture that has been separated in a chromatography column and has left it called?
Eluate, Mobile phase, Stationary phase, Analyte`,

  `question: What is the time that has elapsed from the injection of a sample into a chromatograph until it elutes into the detector called?
Retention Time, Elution Volume, Separation Factor, Peak Width`,

  `question: Chromatography refers to a group of techniques used to separate complex mixtures on the basis of different what?
Physical interactions, Chemical reactions only, Molecular weights only, Electrical charges only`,

  `question: In chromatography separation takes place on a stationary or nonmoving phase under the influence of what other phase?
A mobile or moving phase, A static gas phase, A solid support phase, A reactive liquid phase`,

  `question: Molecules are separated in chromatography based on their solubility and their interaction with what?
The stationary and mobile phases, Only the stationary phase, Only the mobile phase, The detector`,

  `question: During chromatography the mobile phase carries the sample through a bed layer or what else containing the stationary phase?
Column, Filter, Membrane, Capillary tube`,

  `question: In chromatography solutes with greater affinity for the stationary phase migrate how compared to those with less affinity?
More slowly, Faster, At the same rate, In reverse direction`,

  `question: Solutes with less affinity for the stationary phase reside mostly in which phase and migrate faster?
Mobile phase, Stationary phase, Gaseous phase, Solid phase`,

  `question: How can strongly bound solutes be displaced from the stationary phase in chromatography?
By changing the physical or chemical nature of the mobile phase, By increasing the temperature only, By reversing the flow direction, By adding a catalyst`,

  `question: In planar chromatography the stationary phase is coated on a sheet of paper or bound to what?
A solid surface like in TLC, A liquid film, The inside of a column, Magnetic beads`,

  `question: What is Thin-Layer Chromatography TLC a type of?
Planar chromatography, Column chromatography, Gas chromatography, Liquid chromatography`,

  `question: In column chromatography the stationary phase may be packed into a tube or coated on what?
The inner surface of the tube or support particles, A flat plate, Filter paper, A membrane`,

  `question: Gas chromatography GC or liquid chromatography LC is termed based on whether the mobile phase involves what?
A gas or a liquid, A solid or a liquid, Only a gas, Only a liquid`,

  `question: The instrument used to perform a GC or LC separation is known as a gas or liquid what?
Chromatograph, Spectrometer, Detector, Injector`,

  `question: When the stationary phase in LC consists of small-diameter particles the technique is called what?
High-Performance Liquid Chromatography HPLC, Gas Chromatography GC, Thin-Layer Chromatography TLC, Paper Chromatography`,

  `question: Gas Chromatography-Mass Spectrometry GCMS is an example of what type of technique?
Hyphenated or hybrid technique, Planar chromatography, Adsorption chromatography, Ion-exchange chromatography`,

  `question: Ion-exchange partition adsorption size-exclusion and affinity are classifications of chromatographic separations based on what?
The processes used to separate the solutes, The type of detector used, The shape of the column, The temperature of the system`,

  `question: Ion-exchange chromatography is based on an exchange of ions between a charged stationary phase and ions of what charge in the mobile phase?
The opposite charge, The same charge, No charge, Variable charge`,

  `question: Cation-exchange particles contain negatively charged functional groups that bind what type of components in the mobile phase?
Positively charged components cations, Negatively charged components anions, Neutral components, Large molecules`,

  `question: Separation of amino acids oligonucleotides and hemoglobin variants are clinical applications of what type of chromatography?
Ion-exchange chromatography, Adsorption chromatography, Size-exclusion chromatography, Partition chromatography`,

  `question: The differential distribution of solutes between two immiscible liquids is the basis for what type of chromatography?
Partition Chromatography, Ion-Exchange Chromatography, Adsorption Chromatography, Affinity Chromatography`,

  `question: In partition chromatography one of the immiscible liquids serves as which phase?
Stationary phase, Mobile phase only, Gaseous phase, Solid support`,

  `question: Separation in partition chromatography is based on differences in the relative solubility of solute molecules between what?
Stationary and mobile phases, Two solid phases, Two gaseous phases, The solute and the column material`,

  `question: Gas-liquid chromatography GLC and liquid-liquid chromatography LLC are classifications of what type of chromatography?
Partition chromatography, Adsorption chromatography, Ion-exchange chromatography, Size-exclusion chromatography`,

  `question: What is the basis of separation by adsorption chromatography?
Differential adsorption of solutes on the surface of the stationary phase, Partitioning between two liquid phases, Exchange of ions, Molecular size and shape`,

  `question: Silica and alumina are principal polar adsorbents used in what type of chromatography?
Liquid chromatography LC (specifically adsorption), Gas chromatography GC, Paper chromatography, Ion-exchange chromatography`,

  `question: Hydrogen-bonding and interactions with surface hydroxyl groups are mechanisms of separation in which type of chromatography using silica?
Adsorption Chromatography, Partition Chromatography, Size-Exclusion Chromatography, Affinity Chromatography`,

  `question: Size-exclusion chromatography is also known by what other names?
Gel-filtration or molecular-sieve chromatography, Ion-exchange or ion chromatography, Adsorption or surface chromatography, Partition or liquid-liquid chromatography`,

  `question: Molecular-sieve chromatography separates solutes on the basis of their what?
Molecular size and shape in solution, Charge and polarity, Affinity for a ligand, Adsorption to a surface`,

  `question: Size-exclusion chromatography is commonly used to separate large molecules like proteins and nucleic acids from what?
Small molecules such as salts or oligonucleotides, Other large molecules of similar size, Charged ions, Polar compounds`,

  `question: In affinity chromatography the analyte binds to what on a support material?
A support-bound ligand, A charged resin, A porous gel, An inert gas`,

  `question: The use of antibody to antigen binding is a specific example of what type of chromatography?
Affinity Chromatography, Ion-Exchange Chromatography, Size-Exclusion Chromatography, Adsorption Chromatography`,

  `question: What is the energy of interaction of a single antibody-combining site and its corresponding epitope on the antigen called?
Affinity, Avidity, Specificity, Sensitivity`,

  `question: What is an Immunoglobulin Ig class of molecule that binds specifically to an antigen?
Antibody, Antigen, Epitope, Immunogen`,

  `question: What is any material capable of reacting with an antibody without necessarily being capable of inducing antibody formation called?
Antigen, Immunogen, Epitope, Hapten`,

  `question: What term describes the overall strength of binding of antibody and antigen including the sum of all binding affinities?
Avidity, Affinity, Reactivity, Complementarity`,

  `question: What are the specific antibody binding sites found on an antigen called?
Epitope Antigenic Determinant, Paratope, Active site, Allosteric site`,

  `question: What is a substance capable of inducing an immune response called?
Immunogen, Antigen, Antibody, Hapten`,

  `question: What are proteins with antibody activity collectively known as?
Immunoglobulins Ig, Albumins, Globulins (general term), Cytokines`,

  `question: An immunoassay is an analytical method that uses antibodies or antigens as reagents to measure what?
Specific chemicals or analytes, Only proteins, Only hormones, Only drugs of abuse`,

  `question: Immunoassays are reliable and sensitive to what concentration levels of analyte?
Very low concentration levels, Only high concentration levels, Only moderate concentration levels, A wide range regardless of sensitivity`,

  `question: Most immunoassay tests performed in the clinical chemistry laboratory use antibodies as the reagent to measure what?
Antigens of interest, Other antibodies, Enzymes, Electrolytes`,

  `question: Antibodies are proteins produced by B lymphocytes and their progeny plasma cells in response to what?
Immunogens, Antigens only, All foreign substances, Specific infections only`,

  `question: Immunoassays require minimum sample preparation because antibodies bind only to what?
Specific antigens, Any protein, Carbohydrates, Lipids`,

  `question: The strength of antibody binding or affinity determines the sensitivity of an immunoassay while what allows detection of one antigen in a complex sample?
Specificity, Avidity, Cross-reactivity, Concentration`,

  `question: What is the common basic structure of immunoglobulins?
Four polypeptide chains two heavy H and two light L, Two polypeptide chains, Six polypeptide chains, One large polypeptide chain`,

  `question: Which part of the antibody structure determines the antibody class or subclass?
The bottom portion of the heavy chains, The top of the Y structure, The light chains only, The variable region of the light chain`,

  `question: Which part of the Y structure of an antibody binds to the epitopes of the antigen?
The top of the Y structure, The bottom of the heavy chains, The constant region of light chains, The hinge region`,

  `question: How many classes of antibodies are found in human beings?
Five IgG IgM IgA IgE and IgD, Three IgG IgM IgA, Four IgG IgM IgA IgE, Six`,

  `question: Which antibody class is predominant in the initial immune response to an antigen?
IgM, IgG, IgA, IgE`,

  `question: Which antibody class is the most abundant in serum and can cross the placenta?
IgG, IgM, IgA, IgD`,

  `question: Which antibody is the predominant immunoglobulin in body secretions such as saliva tears and human milk?
IgA, IgG, IgM, IgE`,

  `question: Which antibody class is responsible for the physiological manifestations of allergy?
IgE, IgG, IgA, IgM`,

  `question: Which antibody class has an unknown main function and is present in serum in trace amounts?
IgD, IgE, IgA, IgM`,

  `question: An immunogen is typically a protein or a substance coupled to what?
A carrier usually a protein, A lipid, A carbohydrate, A nucleic acid`,

  `question: What is the portion of an antigen that an antibody interacts with called?
Antigenic determinant or epitope, Paratope, Hinge region, Fc region`,

  `question: The strength of binding of an antibody to an antigen is directly related to the affinity avidity concentration of antibody and epitopes specificity and what else?
Environmental conditions pH temperature, Light intensity, Sample volume, Incubation time only`,

  `question: Intermolecular forces such as hydrogen bonding van der Waals forces and hydrophobic interactions influence what in antigen-antibody binding?
Binding strength, Antibody class, Epitope number, Immunogen size`,

  `question: In Non-competitive immunoassays the capture antibody is typically adsorbed or covalently bound to what?
The surface of a solid phase, A labeled antigen, A free antibody in solution, The patient sample itself`,

  `question: In Type II noncompetitive immunoassays what is typically tagged with a label?
A second antibody, The patient antigen, The solid phase, The capture antibody`
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