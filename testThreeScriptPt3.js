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
    `question: What is a hydrocarbon containing carbon and hydrogen joined into straight chains, branched chains, or non-aromatic rings?
Aliphatic Hydrocarbon, Aromatic Hydrocarbon, Saturated Hydrocarbon, Substituted Hydrocarbon`,

    `question: What are saturated hydrocarbons consisting of only single bonds?
Alkane, Alkene, Alkyne, Cycloalkane`,

    `question: What are unsaturated hydrocarbons with at least one carbon-to-carbon double bond?
Alkenes, Alkanes, Alkynes, Aromatic Hydrocarbons`,

    `question: What are unsaturated hydrocarbons with at least one carbon-to-carbon triple bond?
Alkynes, Alkanes, Alkenes, Cycloalkanes`,

    `question: What are unsaturated hydrocarbons that contain one or more benzene rings?
Aromatic Hydrocarbons, Aliphatic Hydrocarbons, Saturated Hydrocarbons, Alkanes`,

    `question: What is an aromatic functional group characterized by a ring of six carbon atoms, bonded by alternating single and double bonds?
Benzene Ring, Cycloalkane Ring, Ketone Group, Carboxylic Acid Group`,

    `question: What are molecules with the same number and type of atoms but different geometrical configurations called?
Cis-Trans Isomers (Geometric Isomers), Structural Isomers, Stereoisomers, Enantiomers`,

    `question: What are saturated hydrocarbons with a ring-like structure called?
Cycloalkanes, Alkanes, Aromatic Hydrocarbons, Alkenes`,

    `question: What are specific groupings of atoms within molecules that have their own characteristic properties, regardless of other atoms present?
Functional Group, Isomer Group, Hydrocarbon Group, Substituent Group`,

    `question: Alcohols, amines, carboxylic acids, and ketones are common examples of what?
Functional Groups, Hydrocarbons, Alkanes, Isomers`,

    `question: What is a molecule consisting entirely of carbon and hydrogen atoms called?
Hydrocarbon, Carbohydrate, Organic Acid, Amino Acid`,

    `question: What type of hydrocarbon molecules only contain single bonds and have all carbon atoms bonded with as many hydrogen atoms as possible?
Saturated Hydrocarbon, Unsaturated Hydrocarbon, Aromatic Hydrocarbon, Substituted Hydrocarbon`,

    `question: What are molecules that have the same molecular formula but differ only in how their atoms are arranged in three-dimensional space?
Stereoisomers, Structural Isomers, Geometric Isomers, Constitutional Isomers`,

    `question: What are molecules with the same molecular formula, but their atoms have different arrangements or bonds?
Structural Isomers, Stereoisomers, Cis-Trans Isomers, Enantiomers`,

    `question: What is a hydrocarbon with one or more hydrogen atoms replaced by other atoms called?
Substituted Hydrocarbon, Saturated Hydrocarbon, Pure Hydrocarbon, Aliphatic Hydrocarbon`,

    `question: Organic chemistry is primarily the study of compounds containing which element?
Carbon, Oxygen, Nitrogen, Hydrogen`,

    `question: Carbon can form stable, covalent bonds with which other elements besides carbon itself?
Oxygen- nitrogen- sulfur- and halogens, Only hydrogen, Only other carbon atoms, Noble gases`,

    `question: Besides linear chains, what other arrangements are common for carbon atoms in organic compounds?
Ring structures and branched chains, Only ring structures, Only branched chains, Only tetrahedral structures`,

    `question: Two organic compounds that have the same number and kinds of atoms but completely different structures and properties are called?
Isomers, Allotropes, Isotopes, Polymers`,

    `question: What type of hydrocarbons contain at least one double or triple bond between carbon atoms?
Unsaturated Hydrocarbon, Saturated Hydrocarbon, Aromatic Hydrocarbon (necessarily), Cycloalkane`,

    `question: Isomers are two or more molecules with the same molecular formula but different what?
Structural or spatial arrangement of atoms, Number of atoms, Types of elements, Overall charge`,

    `question: What are the two major classes of isomers?
Structural isomers and stereoisomers, Aliphatic isomers and aromatic isomers, Saturated isomers and unsaturated isomers, Cis isomers and trans isomers`,

    `question: In which type of isomers are the atoms connected or bonded differently?
Structural (or Constitutional) Isomers, Stereoisomers, Enantiomers, Diastereomers`,

    `question: What is the general classification of organic compounds that divides them into two main groups?
Hydrocarbons and substituted hydrocarbons, Alkanes and alkenes, Saturated and unsaturated compounds, Aliphatic and aromatic compounds`,

    `question: A hydrocarbon molecule contains only which two elements?
Carbon and Hydrogen, Carbon and Oxygen, Carbon and Nitrogen, Hydrogen and Oxygen`,

    `question: What type of hydrocarbons are non-aromatic, meaning they do not have a benzene ring in their structure?
Aliphatic hydrocarbons, Aromatic hydrocarbons, Substituted hydrocarbons, Polycyclic hydrocarbons`,

    `question: Alkanes, cycloalkanes, alkenes, and alkynes are families of which broader hydrocarbon classification?
Aliphatic hydrocarbons, Aromatic hydrocarbons, Saturated hydrocarbons only, Unsaturated hydrocarbons only`,

    `question: What is the defining characteristic of alkanes regarding their chemical bonds?
They contain only single bonds, They contain at least one double bond, They contain at least one triple bond, They contain a benzene ring`,

    `question: ethene is an example of which family of aliphatic hydrocarbons?
Alkenes, Alkanes, Alkynes, Cycloalkanes`,

    `question: ethyne is an example of which family of aliphatic hydrocarbons?
Alkynes, Alkanes, Alkenes, Aromatic compounds`,

    `question: Organic compounds typically have what type of bonding?
Mostly covalent bonding, Mostly ionic bonding, Metallic bonding, Hydrogen bonding only`,

    `question: Compared to inorganic compounds, organic compounds generally have what kind of boiling and melting points?
Low, High, Similar, Extremely variable with no trend`,

    `question: How is the solubility of most organic compounds in water?
Mostly insoluble, Mostly soluble, Always soluble, Soluble only if they contain oxygen`,

    `question: Are most organic compounds generally conductors or non-conductors of electricity?
Non-conductor (Nonelectrolytes), Conductor (Electrolytes), Semiconductor, Superconductor`,

    `question: What is the flammability characteristic of almost all organic compounds?
Almost all burn, Most are not combustible, Only long-chain ones burn, Only cyclic ones burn`,

    `question: What is the general formula for alkanes, where n is the number of carbon atoms?
CnH2n+2, CnH2n, CnH2n-2, CnHn`,

    `question: Which type of chemical formula tells the kind and number of each type of atom in a molecule but does not show the bonding pattern?
Molecular formula, Structural formula, Condensed formula, Line formula`,

    `question: Which type of chemical formula shows each atom and bond in a molecule?
Structural formula, Molecular formula, Empirical formula, Line formula`,

    `question: Which type of chemical formula shows all atoms in a molecule in a sequential order indicating bonding?
Condensed formula, Structural formula, Molecular formula, Skeletal formula`,

    `question: In the line formula for organic compounds, what is assumed to be at any location where two or more lines intersect?
A carbon atom, A hydrogen atom, A methyl group, An oxygen atom`,

    `question: In the line formula, what is assumed to be at the end of any line?
A methyl group, A single carbon atom, A hydrogen atom, A double bond`,

    `question: Although a carbon atom may be involved in single- double- or triple bond; it always shares how many pairs of electrons?
Four, Two, Three, One`,

    `question: What is the IUPAC system used for in organic chemistry?
A universal system for naming organic compounds, Classifying compounds by solubility, Determining the physical state of compounds, Measuring the bond energy of compounds`,

    `question: What is an alkyl group?
An alkane with one less hydrogen atom, An alkane with an added functional group, Any branched alkane, An alkane in a ring structure`,

    `question: How is the name of an alkyl group derived from the corresponding alkane?
The -ane ending is replaced by -yl, The -ane ending is replaced by -ene, The prefix is changed, A number is added to the name`,

    `question: A carbon atom directly bonded to only one other carbon atom is classified as what?
Primary  carbon, Secondary  carbon, Tertiary  carbon, Quaternary  carbon`,

    `question: A carbon atom bonded to three other carbon atoms is classified as what?
Tertiary  carbon, Primary  carbon, Secondary  carbon, Quaternary  carbon`,

    `question: At room temperature, alkanes with 1 to 4 carbon atoms are typically in what physical state?
Gases, Liquids, Solids, Plasma`,

    `question: At room temperature, alkanes with 5 to 17 carbon atoms are typically in what physical state?
Colorless liquids, Gases, White waxy solids, Colored solutions`,

    `question: What weak intermolecular force causes nonpolar atoms or molecules to condense into liquids or solids as temperature is lowered?
London dispersion forces, Hydrogen bonds, Dipole-dipole interactions, Ionic bonds`,

    `question: How do branched-chain alkanes' melting and boiling points generally compare to their straight-chain isomers?
Lower, Higher, The same, Unpredictably different`,

    `question: In IUPAC nomenclature, what is the first step in naming an alkane?
Determine the name of the parent compound (longest continuous carbon chain), Number the substituents, Identify all functional groups, Alphabetize the branches`,

    `question: In IUPAC nomenclature, how should the parent chain be numbered if substituents are present?
To give the lowest number to the carbon bonded to the first group encountered, From left to right always, To give the highest numbers to substituents, Alphabetically based on substituent names`,

    `question: How are substituents placed in the final IUPAC name?
In alphabetical order before the parent compound name, In numerical order of their position, In order of size (smallest first), Halogens always last`,

    `question: What type of isomers are stereoisomers that are non-superimposable mirror images of each other?
Enantiomers, Diastereomers, Cis-trans isomers, Structural isomers`,

    `question: What does the prefix "Cis-" indicate in cis-trans isomerism?
Isomers contain atoms oriented on the same side of a bond, Isomers contain atoms oriented on opposite sides of a bond, The molecule is cyclic, The molecule has a chiral center`,

    `question: What does the prefix "Trans-" indicate in cis-trans isomerism?
Isomers contain atoms oriented on opposite sides of a bond, Isomers contain atoms oriented on the same side of a bond, The molecule is a straight chain, The molecule is aromatic`,

    `question: Unsaturated hydrocarbons contain at least one carbon-to-carbon what?
Double or triple bond, Single bond only, Benzene ring, Oxygen atom`


    // *** PASTE OR ADD OTHER QUESTIONS HERE ***
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