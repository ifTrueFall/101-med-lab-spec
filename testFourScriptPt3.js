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
  `question: What is the number of particles found in one mole of a substance equal to $6.02 \times 10^{23} mol^{-1}$?
Avogadros Number, Einsteins Number, Plancks Constant, Faradays Constant`,

  `question: What is defined as the number of grams of an ion corresponding to Avogadros number of electrical charges?
Equivalent, Mole, Gram-Molecular Weight, Molarity`,

  `question: What is the mass in grams of 1 mole of a substance also known as molar mass?
Gram-Molecular Weight, Equivalent Weight, Atomic Mass Unit, Formula Weight`,

  `question: What is a measure of concentration defined as the number of moles of solute per liter of solution?
Molarity, Normality, Molality, Percent Concentration`,

  `question: What is a measure of concentration defined as the number of equivalents per liter of solution?
Normality, Molarity, Osmolarity, Specific Gravity`,

  `question: Molarity is symbolized as M or what other unit?
mol/L, eq/L, g/mol, mol/kg`,

  `question: What is the formula for Molarity (M)?
Number of Moles (mol) / Volume (L), Mass (g) / Volume (L), Number of Equivalents (eq) / Volume (L), Moles (mol) / Mass (kg)`,

  `question: One mole of a compound has a characteristic mass in grams which is proportional to what?
The molecular weight of the substance, The density of the substance, The volume of the solution, The number of equivalents`,

  `question: What is the formula for calculating the Number of Moles (mol) given mass and molecular weight?
Mass (g) / Molecular Weight (GMW or g/mol), Molecular Weight (g/mol) / Mass (g), Mass (g) * Molecular Weight (g/mol), Volume (L) * Molarity (mol/L)`,

  `question: What is the molecular weight (GMW)?
The sum of the atomic weights of all atoms appearing in a molecular formula, The mass of one mole of electrons, The number of particles in a mole, The weight of the solvent`,

  `question: What is the general formula used to calculate mass from molar solutions given concentration molecular weight and volume?
Mass (g) = Concentration (mol/L) * Molecular Weight (g/mol) * Volume (L), Mass (g) = Concentration (mol/L) / (Molecular Weight (g/mol) * Volume (L)), Mass (g) = Volume (L) / (Concentration (mol/L) * Molecular Weight (g/mol)), Mass (g) = Molecular Weight (g/mol) / (Concentration (mol/L) * Volume (L))`,

  `question: How many moles are in 117.0 g of NaCl if the GMW of NaCl is 58.5 g/mol?
2.0 moles, 1.0 mole, 0.5 moles, 4.0 moles`,

  `question: To calculate the molecular weight (GMW) of $Na_2SO_4$ what must you sum?
The atomic weights of 2 Na 1 S and 4 O atoms, The moles of Na S and O, The equivalents of Na S and O, The charges of Na S and O`,

  `question: If the GMW of $Na_2SO_4$ is 142.1 g/mol how much $Na_2SO_4$ (g) is needed to prepare 300 mL of a 2.00 mol/L solution?
85.26 g, 142.1 g, 284.2 g, 42.63 g`,

  `question: To prepare a solution of a specific molarity what unit must the volume typically be converted to for the calculation Mass (g) = (mol/L)(GMW)(L)?
Liters (L), Milliliters (mL), Grams (g), Moles (mol)`,

  `question: What volume (mL) of a $CaCO_3$ solution can be prepared from 25.0 g of $CaCO_3$ (GMW 100.1 g/mol) if a 0.50 mol/L solution is desired?
499.5 mL, 250.0 mL, 100.1 mL, 50.05 mL`,

  `question: What is the first step usually recommended when solving molarity problems such as calculating the mass of solute needed?
Summarize the information from the problem, Convert all units to moles, Calculate the number of equivalents, Titrate the solution`,

  `question: If you need to determine the molarity (mol/L) of a solution prepared by dissolving 200.0 mg of NaOH (GMW 40.0 g/mol) in 250.0 mL of water what is the mass of NaOH in grams?
0.2 g, 200.0 g, 2.0 g, 0.02 g`,

  `question: What is the molarity (mol/L) of a solution prepared by dissolving 0.2 g of NaOH (GMW 40.0 g/mol) in 0.25 L of water?
0.02 mol/L, 0.2 mol/L, 2.0 mol/L, 0.005 mol/L`,

  `question: What are compounds containing one or more water molecules as an integral part of their structure termed?
Hydrates, Anhydrous compounds, Solvates, Desiccants`,

  `question: In the formula of a hydrate like $CuSO_4 \cdot 5H_2O$ what does the dot preceding $5H_2O$ indicate?
Water is part of a larger structure, Water is a solvent, Water is a catalyst, Water is an impurity`,

  `question: When calculating the molecular weight of a hydrate like $CuSO_4 \cdot 5H_2O$ is the mass of water included?
Yes the mass of water is included, No the mass of water is excluded, Only if the water is bound ionically, Only half the mass of water is included`,

  `question: If the GMW of $CuSO_4 \cdot 5H_2O$ is 249.6 g/mol how much $CuSO_4 \cdot 5H_2O$ (g) is required to prepare 250 mL of a 2.00 mol/L $CuSO_4$ solution?
124.8 g, 249.6 g, 499.2 g, 62.4 g`,

  `question: Normality relates the amount of solute to the total volume of a solution and is specifically used for what types of substances?
Acids and bases, Salts and sugars, Metals and nonmetals, Organic and inorganic compounds`,

  `question: Normality is symbolized as N or what other unit?
eq/L, mol/L, g/eq, mol/kg`,

  `question: How is Normality (N or eq/L) defined?
Number of Equivalents (eq) / Volume (L), Number of Moles (mol) / Volume (L), Mass (g) / Volume (L), Equivalents (eq) / Mass (kg)`,

  `question: What does Total Positive Ionic Valence (TPIV) express?
Number of equivalents per mole of substance, Number of moles per equivalent, Number of grams per mole, Number of charges per atom`,

  `question: For elements the number of equivalents is the absolute value of its what?
Valence charge, Atomic number, Mass number, Electronegativity`,

  `question: For ionic compounds the number of equivalents is the absolute value of what?
The net positive or net negative charge in the compound, The sum of all atomic masses, The number of atoms in the formula, The oxidation state of the metal`,

  `question: How is the Equivalent Weight (GEW) of an element or compound calculated?
Molecular Weight (g/mol) / Number of Equivalents (eq/mol), Number of Equivalents (eq/mol) / Molecular Weight (g/mol), Molecular Weight (g/mol) * Number of Equivalents (eq/mol), Mass (g) / Number of Equivalents (eq)`,

  `question: What is the general formula used to calculate mass from normal solutions given concentration equivalent weight and volume?
Mass (g) = Concentration (eq/L) * Equivalent Weight (g/eq) * Volume (L), Mass (g) = Concentration (eq/L) / (Equivalent Weight (g/eq) * Volume (L)), Mass (g) = Equivalent Weight (g/eq) / (Concentration (eq/L) * Volume (L)), Mass (g) = Volume (L) / (Concentration (eq/L) * Equivalent Weight (g/eq))`,

  `question: To determine how much NaCl (GMW 58.5 g/mol) is needed to prepare 500 mL of a 25.00 eq/L NaCl solution what is the TPIV for NaCl ($Na^{+1}Cl^{-1}$)?
1 eq/mol, 2 eq/mol, 25 eq/mol, 58.5 eq/mol`,

  `question: What is the Gram Equivalent Weight (GEW) of NaCl if its GMW is 58.5 g/mol and its TPIV is 1 eq/mol?
58.5 g/eq, 29.25 g/eq, 117.0 g/eq, 1 g/eq`,

  `question: How many grams of NaCl (GEW 58.5 g/eq) are needed to prepare 500 mL (0.500 L) of a 25.00 eq/L solution?
731.2 g (rounded from 731.25), 585.0 g, 1462.5 g, 25.0 g`,

  `question: To determine how much NaOH (GMW 40.0 g/mol) is needed to prepare 400 mL of a 10.00 eq/L NaOH solution what is the TPIV for NaOH ($Na^{+1}OH^{-1}$)?
1 eq/mol, 2 eq/mol, 10 eq/mol, 40 eq/mol`,

  `question: What is the Gram Equivalent Weight (GEW) of NaOH if its GMW is 40.0 g/mol and its TPIV is 1 eq/mol?
40.0 g/eq, 20.0 g/eq, 80.0 g/eq, 10.0 g/eq`,

  `question: How many grams of NaOH (GEW 40.0 g/eq) are needed to prepare 400 mL (0.400 L) of a 10.00 eq/L solution?
160.0 g, 400.0 g, 40.0 g, 100.0 g`,

  `question: To calculate the $eq/L$ concentration of an $AlPO_4$ solution (GMW 122.0 g/mol) what is the TPIV for $AlPO_4$ ($Al^{+3}PO_4^{-3}$)?
3 eq/mol, 1 eq/mol, 2 eq/mol, 4 eq/mol`,

  `question: What is the Gram Equivalent Weight (GEW) of $AlPO_4$ if its GMW is 122.0 g/mol and its TPIV is 3 eq/mol?
40.67 g/eq (approx), 122.0 g/eq, 366.0 g/eq, 61.0 g/eq`,

  `question: What is the $eq/L$ concentration if 120.0 g of $AlPO_4$ (GEW 40.67 g/eq) is dissolved to make 250 mL (0.250 L) of solution?
11.8 eq/L, 2.95 eq/L, 47.2 eq/L, 120.0 eq/L`,

  `question: To determine the volume of $PbSO_4$ solution (GMW 303.3 g/mol) that can be prepared from 80.0 g if a 0.5 eq/L solution is desired what is the TPIV for $PbSO_4$ ($Pb^{+2}SO_4^{-2}$)?
2 eq/mol, 1 eq/mol, 0.5 eq/mol, 4 eq/mol`,

  `question: What is the Gram Equivalent Weight (GEW) of $PbSO_4$ if its GMW is 303.3 g/mol and its TPIV is 2 eq/mol?
151.65 g/eq, 303.3 g/eq, 75.825 g/eq, 606.6 g/eq`,

  `question: What volume (in Liters initially) can be prepared from 80.0 g of $PbSO_4$ (GEW 151.65 g/eq) if a 0.5 eq/L solution is desired?
1.055 L (approx), 0.527 L, 2.11 L, 80.0 L`,

  `question: The molecular weight of NaCl is 58.5 g/mol. This value represents what?
The mass of one mole of NaCl, The mass of one molecule of NaCl, The number of equivalents in NaCl, The density of NaCl`,

  `question: A solution with a concentration of 1 mol/L is also described as being?
1 Molar, 1 Normal, 1 Molal, 1 Equivalent`,

  `question: A solution with a concentration of 1 eq/L is also described as being?
1 Normal, 1 Molar, 1 Osmolar, 1 Gram-equivalent`,

  `question: When calculating GMW of a compound like $Na_2SO_4$ how many sodium atoms (Na atomic weight 23.0) are accounted for?
Two, One, Three, Four`,

  `question: How many mL are in 0.300 L?
300 mL, 30 mL, 3 mL, 0.003 mL`,

  `question: If you need to convert milligrams (mg) to grams (g) for a calculation how do you do it?
Divide mg by 1000, Multiply mg by 1000, Divide mg by 100, Multiply mg by 100`,

  `question: The concentration unit 'mol/L' is the definition for which term?
Molarity, Normality, Molality, Mole fraction`,

  `question: The concentration unit 'eq/L' is the definition for which term?
Normality, Molarity, Equivalency, Ionization`,

  `question: In the formula for Gram Equivalent Weight (GEW) what does 'eq/mol' represent?
Total Positive Ionic Valence (TPIV), Avogadros Number, Number of moles, Number of grams`,

  `question: If a problem asks for the final answer to be rounded to the tenths decimal place what does 11.803 become?
11.8, 11.80, 11.803, 12.0`,

  `question: How many grams are in one mole of a substance if its molecular weight is 100.1 g/mol?
100.1 grams, 1 gram, 6.022 x 10^23 grams, Variable grams`,

  `question: In the compound $H_2SO_4$ if $H^{+1}$ and $SO_4^{-2}$ what is the Total Positive Ionic Valence (TPIV)?
2 eq/mol, 1 eq/mol, 4 eq/mol, 3 eq/mol`,

  `question: If a substance has a molecular weight of 98 g/mol and a TPIV of 2 eq/mol what is its GEW?
49 g/eq, 98 g/eq, 196 g/eq, 2 g/eq`,

  `question: What does GMW stand for in these calculations?
Gram-Molecular Weight, Grams Moles Water, General Molar Volume, Great Molar Weight`,

  `question: What is the fundamental quantity that Avogadros number ($6.022 \times 10^{23}$) represents?
The number of particles in one mole, The mass of one mole in grams, The volume of one mole of gas, The charge of one mole of electrons`,

  `question: To calculate the number of moles what two quantities are divided?
Mass in grams by Gram-Molecular Weight, Gram-Molecular Weight by Mass in grams, Mass in grams by Volume in Liters, Equivalents by Total Positive Ionic Valence`
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