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
  `question: What is the net movement of solute or solvent molecules from an area of high concentration to an area of low concentration?
Diffusion, Osmosis, Dialysis, Filtration`,

  `question: Henry's Law states that the amount of dissolved gas in a liquid is proportional to what?
The partial pressure of the gas, The temperature of the liquid, The volume of the liquid, The type of solvent`,

  `question: Which type of solution has a lower osmolarity than the cytoplasm of cells causing water to move into cells?
Hypotonic Solution, Hypertonic Solution, Isotonic Solution, Saturated Solution`,

  `question: Which type of solution has a greater osmolarity than the cytoplasm of cells causing water to move out of cells?
Hypertonic Solution, Hypotonic Solution, Isotonic Solution, Supersaturated Solution`,

  `question: What type of solution has the same osmolarity as the cytoplasm of cells?
Isotonic Solution, Hypotonic Solution, Hypertonic Solution, Concentrated Solution`,

  `question: What is the term for the total molar concentration of all the solutes in a given solution?
Osmolarity, Molarity, Normality, Molality`,

  `question: What is the net movement of water across a semi-permeable membrane from an area of low solute concentration to high solute concentration?
Osmosis, Diffusion, Active Transport, Facilitated Diffusion`,

  `question: What is the pressure needed to stop the flow of solvent across a semi-permeable membrane called?
Osmotic Pressure, Hydrostatic Pressure, Vapor Pressure, Atmospheric Pressure`,

  `question: What is a solution that contains all the solute that can be dissolved at a particular temperature called?
Saturated Solution, Unsaturated Solution, Supersaturated Solution, Dilute Solution`,

  `question: What is a series of dilutions of progressive regular increments where each subsequent dilution is less concentrated by a constant amount?
Serial Dilution, Simple Dilution, Titration, Stepwise Dilution`,

  `question: In a solution what is the component present in a concentration less than that of the solvent called?
Solute, Solvent, Precipitate, Colloid`,

  `question: What is a homogeneous mixture of two or more substances composed of one or more solutes dissolved in a solvent?
Solution, Suspension, Emulsion, Gel`,

  `question: In a solution what is the component present in the largest quantity called?
Solvent, Solute, Concentrate, Dispersant`,

  `question: What is a solution that contains more dissolved particles than could be dissolved by the solvent under normal circumstances?
Supersaturated Solution, Saturated Solution, Unsaturated Solution, Isotonic Solution`,

  `question: What is the ability of an extracellular solution to make water move in or out of a cell or the measure of osmotic pressure?
Tonicity, Osmolarity, Viscosity, Diffusibility`,

  `question: What is a homogeneous mixture with uniform properties throughout where solute cannot be isolated by filtration?
True solution, Colloid suspension, Suspension, Emulsion`,

  `question: Which component of a solution is present in a lesser quantity than the other component?
Solute, Solvent, Mixture, Compound`,

  `question: If water is the solvent what is the solution referred to as?
Aqueous solution, Nonaqueous solution, Organic solution, Tincture`,

  `question: Can solutions be formed in gases and solids as well as liquids?
Yes, No only in liquids, No only in liquids and gases, No only in solids and liquids`,

  `question: Air is an example of what type of solution?
Gaseous solution, Liquid solution, Solid solution, Colloidal solution`,

  `question: Alloys such as brass are examples of what type of solution?
Solid solution, Liquid solution, Gaseous solution, Suspension`,

  `question: What visual characteristic is typical of liquid true solutions?
Clear and transparent, Cloudy and opaque, Separates into layers, Always colored`,

  `question: Solutions of electrolytes are formed from solutes that are what type of compounds?
Soluble ionic compounds, Nonpolar covalent compounds, Insoluble salts, Pure metals`,

  `question: Are solutions of electrolytes good or poor conductors of electricity?
Good conductors, Poor conductors, Non-conductors, Semiconductors`,

  `question: The principle "Like dissolves like" refers to what property when considering solubility?
Polarity, Temperature, Pressure, Particle size`,

  `question: How does temperature generally affect the solubility of most solid substances?
Solubility increases with temperature, Solubility decreases with temperature, Temperature has no effect, Solubility doubles with every 10C rise`,

  `question: How does temperature affect the solubility of gases?
Gas solubility tends to decrease as temperature increases, Gas solubility tends to increase as temperature increases, Temperature has no effect on gas solubility, Gas solubility is highest at boiling point`,

  `question: How does pressure affect the solubility of solid and liquid solutes?
Pressure has little effect, Solubility is directly proportional to pressure, Solubility is inversely proportional to pressure, Solubility increases exponentially with pressure`,

  `question: The solubility of a gas in a liquid is directly proportional to what according to Henrys Law?
Applied pressure of the gas, Temperature of the liquid, Volume of the solvent, Polarity of the gas`,

  `question: What is a solution called when it is in equilibrium with undissolved solute?
Saturated solution, Unsaturated solution, Supersaturated solution, Dilute solution`,

  `question: What is a precipitate?
A solid created from a solution often due to cooling or reaction, A liquid that separates from a solution, A gas that bubbles out of a solution, The solvent in a saturated solution`,

  `question: What is the Tyndall effect?
The scattering of light by large particles in a colloidal suspension making it appear hazy, The separation of particles by size, The movement of particles due to an electric field, The dissolution of a solute in a solvent`,

  `question: Colloidal particles typically range in size between what values?
1 nanometer and 200 nanometers, 0.01 nanometer and 1 nanometer, 200 nanometers and 1 micrometer, Less than 0.01 nanometer`,

  `question: Which type of mixture contains particles much larger than a colloidal suspension that may settle over time?
Suspension, True solution, Colloid, Emulsion`,

  `question: In the laboratory when are dilutions commonly performed?
When unknown concentration is greater than linearity limits or making reagents, Only when making stock solutions, Only for qualitative tests, When the sample volume is too small`,

  `question: Diluting is a technique that uses a solvent to increase the volume of a solution thereby doing what to the concentration?
Decreasing the concentration, Increasing the concentration, Keeping concentration the same, Precipitating the solute`,

  `question: How is a dilution ratio conventionally expressed?
As a ratio of one unit of original volume to the final volume like 1to5, As total volume to sample volume like 10to2, As a percentage like 20 percent, As diluent volume to sample volume like 4to1`,

  `question: If 2 mL of sample is added to 8 mL of diluent what is the preferred expression of the dilution?
1to5 dilution, 2to10 dilution, 1to4 dilution, 2to8 dilution`,

  `question: What is the dilution factor?
The reciprocal of the dilution ratio, The dilution ratio itself, The volume of diluent added, The final volume of the solution`,

  `question: If a serum sample is diluted 1to10 for a glucose test the result must be multiplied by what factor to get the true concentration?
10, 1, 0.1, 100`,

  `question: In a serial dilution if a sample is diluted 1to2 then that dilution is diluted 1to2 again what is the final dilution?
1to4, 1to2, 1to1, 2to1`,

  `question: If a serum specimen was diluted 1to2 then 1to2 then 1to2 again what is the final dilution ratio?
1to8, 1to6, 1to4, 3to2`,

  `question: If 3 mL of serum is combined with 21 mL of saline what is the dilution ratio of the serum?
1to8, 3to21, 1to7, 3to24`,

  `question: When diluting a stock solution what happens to the mass of the solute in the solution?
The mass of the solute does not change, The mass of the solute decreases, The mass of the solute increases, The mass of the solute dissolves`,

  `question: What is the basic formula used for single dilutions relating initial and final concentrations and volumes?
C1V1=C2V2, C1V2=C2V1, C1C2=V1V2, C1/V1=C2/V2`,

  `question: To use the C1V1=C2V2 formula how many of the four values must be known?
Three, Two, All four, Only one`,

  `question: What must be true about the units of volume and concentration respectively when using C1V1=C2V2?
Units must be the same for V1 and V2 and for C1 and C2, Units can be different as long as converted later, Volume must be mL and concentration percent, Volume must be L and concentration molarity`,

  `question: If you need to prepare 250 mL of a 2.50 mol/L HCl solution from a 12.0 mol/L HCl stock solution how much stock is needed?
52.1 mL, 12.0 mL, 25.0 mL, 250 mL`,

  `question: What is the formula for preparing a new standard by mixing two different standards of known concentration C1V1 and C2V2?
C1V1+C2V2=C3V3 where V3=V1+V2, C1V1=C2V2=C3V3, (C1+C2)(V1+V2)=C3V3, C1/V1 + C2/V2 = C3/V3`,

  `question: If you mix 3.0 mL of a 50.0 mg/dL standard with 2.0 mL of a 300.0 mg/dL standard what is the final volume V3?
5.0 mL, 3.0 mL, 2.0 mL, 1.0 mL`,

  `question: If you mix 3.0 mL of 50.0 mg/dL standard with 2.0 mL of 300.0 mg/dL standard what is the concentration of the new standard?
150.0 mg/dL, 175.0 mg/dL, 350.0 mg/dL, 100.0 mg/dL`,

  `question: The movement of water into a cell placed in a hypotonic solution causes the cell to do what?
Swell and potentially burst, Shrink, Stay the same size, Dissolve`,

  `question: The movement of water out of a cell placed in a hypertonic solution causes the cell to do what?
Shrink, Swell and potentially burst, Stay the same size, Divide`,

  `question: What type of membrane is essential for osmosis to occur?
Semi-permeable membrane, Fully permeable membrane, Impermeable membrane, Charged membrane`,

  `question: Diffusion is the net movement of particles from an area of its ___ concentration to an area of its ___ concentration.
High to low, Low to high, Equal to equal, High to higher`,

  `question: Because of the cell membrane structure what size of molecules are generally able to diffuse freely across it?
Small molecules, Large molecules only, Only charged ions, Only water molecules`,

  `question: Is the statement 'Volumes of liquid solute and liquid solvent are always additive' e.g. 1L alcohol + 1L water = exactly 2L solution true?
No they are not always exactly additive, Yes they are always exactly additive, Only if they have similar densities, Only if the temperature is constant`,

  `question: What is a characteristic of solute particles in a true solution regarding settling out over time?
They will not settle out, They will settle out quickly, They will settle out slowly, They form a precipitate immediately`,

  `question: The molarity of particles in a solution used for osmotic pressure calculations is called what?
Osmolarity, Normality, Molality, Formality`,

  `question: What effect does increasing temperature generally have on the solubility of gases in liquids?
Decreases solubility, Increases solubility, No effect on solubility, Makes them insoluble`
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