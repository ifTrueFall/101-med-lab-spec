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
  `question: What is the hydronium ion concentration of pure water at 25 degrees C?
1.0 x 10-7 M, 1.0 x 10-14 M, 7.0 M, 1.0 M`,

  `question: In pure water at 25 degrees C if the hydronium ion concentration is 1.0 x 10-7 M what is the hydroxide ion concentration?
1.0 x 10-7 M, 1.0 x 10-14 M, 1.0 x 10-0 M, 14.0 M`,

  `question: What is the product of hydronium and hydroxide ion concentrations in pure water called?
Ion product for water Kw, Acid dissociation constant Ka, Base dissociation constant Kb, pH value`,

  `question: What is the value of the ion product for water Kw at 25 degrees C?
1.0 x 10-14, 1.0 x 10-7, 7.0, 14.0`,

  `question: Is the ion product for water Kw constant if the temperature changes?
No it is a temperature-dependent quantity, Yes it is always constant, Only for strong acids, Only for strong bases`,

  `question: The addition of an acid to water increases the concentration of which ion?
Hydronium ion H3O+, Hydroxide ion OH-, Bicarbonate ion HCO3-, Chloride ion Cl-`,

  `question: The addition of a base to water increases the concentration of which ion and decreases H3O+?
Hydroxide ion OH-, Hydronium ion H3O+, Sulfate ion SO4 2-, Ammonium ion NH4+`,

  `question: The pH scale gauges the hydronium ion concentration and reflects the degree of what in a solution?
Acidity or basicity, Temperature or heat, Density or specific gravity, Salinity or saltiness`,

  `question: What is the range of the pH scale?
0 to 14, 1 to 7, 0 to 10, -7 to +7`,

  `question: What pH value is considered neutral?
7, 0, 14, 1`,

  `question: A solution with a pH of 2 is considered what?
Very acidic, Very basic, Neutral, Slightly acidic`,

  `question: A solution with a pH of 13 is considered what?
Very basic, Very acidic, Neutral, Slightly basic`,

  `question: How can the pH of aqueous solutions be approximated visually in a lab?
Using indicating paper pH paper, Using a thermometer, Using a hydrometer, By tasting the solution`,

  `question: For a more exact pH measurement than pH paper what instrument is used?
pH meter, Spectrophotometer, Balance, Microscope`,

  `question: The pH of a solution is defined as the negative logarithm of the molar concentration of which ion?
Hydronium ion H3O+, Hydroxide ion OH-, Sodium ion Na+, Chloride ion Cl-`,

  `question: What is the formula to calculate pH given the hydronium ion concentration [H3O+]?
pH = -log[H3O+], pH = log[H3O+], pH = 14 + log[H3O+], pH = [H3O+] / 10`,

  `question: What formula relates [H3O+] and [OH-] concentrations at 25 degrees C?
[H3O+][OH-] = 1.0 x 10-14, [H3O+] / [OH-] = 1.0 x 10-7, [H3O+] + [OH-] = 14, [H3O+] - [OH-] = 0`,

  `question: What is the formula to calculate [H3O+] concentration given the pH?
[H3O+] = 10-pH, [H3O+] = pH / 10, [H3O+] = -log(pH), [H3O+] = 14 - pH`,

  `question: A tenfold change in hydronium ion concentration changes the pH by how many units?
One unit, Ten units, Zero units, Two units`,

  `question: If a solution of HCl (a strong acid) is 1.0 x 10-3 M what is its pH?
3.00, 11.00, 1.00, -3.00`,

  `question: If a solution has a pH of 4.00 what is its [H3O+] concentration?
10-4 M, 4.0 M, 10-10 M, 10 M`,

  `question: If a NaOH solution (a strong base) is 1.0 x 10-5 M what is the [OH-]?
1.0 x 10-5 M, 1.0 x 10-9 M, 1.0 x 10-14 M, 5.0 M`,

  `question: For a 1.0 x 10-5 M NaOH solution with [OH-] = 1.0 x 10-5 M what is the [H3O+]?
1.0 x 10-9 M, 1.0 x 10-5 M, 1.0 x 10-14 M, 1.0 x 10-7 M`,

  `question: What is the pH of a 1.0 x 10-5 M NaOH solution?
9.00, 5.00, 14.00, 7.00`,

  `question: If a NaOH solution has a pH of 10.00 what is its [H3O+]?
10-10 M, 10-4 M, 10 M, 4 M`,

  `question: For a NaOH solution with pH = 10.00 and [H3O+] = 10-10 M what is the [OH-]?
1.0 x 10-4 M, 1.0 x 10-10 M, 1.0 x 10-14 M, 1.0 x 10-7 M`,

  `question: What is the reaction of an acid with a base to produce a salt and water referred to as?
Neutralization, Oxidation, Reduction, Hydrolysis`,

  `question: In the strictest sense neutralization requires equal numbers of moles of H3O+ and OH- to produce what type of solution?
A neutral solution, An acidic solution, A basic solution, A buffered solution`,

  `question: In the reaction HCl(aq) + NaOH(aq) -> NaCl(aq) + H2O(l) what are the Na+ and Cl- ions termed?
Spectator ions, Reactant ions, Product ions, Catalytic ions`,

  `question: What is the most correct net balanced ionic equation for any strong acid-strong base neutralization?
H3O+(aq) + OH-(aq) -> 2H2O(l), H+(aq) + OH-(aq) -> H2O(l), Acid + Base -> Salt + Water, HCl + NaOH -> NaCl + H2O`,

  `question: What technique involves adding measured amounts of a standard solution to neutralize a second unknown solution to find its concentration?
Titration, Filtration, Distillation, Chromatography`,

  `question: What are polyprotic substances?
Substances that donate or accept more than one proton per formula unit, Substances that only donate one proton, Substances that only accept one proton, Substances that do not react with acids or bases`,

  `question: HCl dissociates to produce one H+ ion per HCl molecule. It is termed a what?
Monoprotic acid, Diprotic acid, Triprotic acid, Polyprotic base`,

  `question: Sulfuric acid H2SO4 produces two H+ ions per unit. It is termed a what?
Diprotic acid, Monoprotic acid, Triprotic acid, Monoprotic base`,

  `question: Phosphoric acid H3PO4 produces three H+ ions per unit. It is termed a what?
Triprotic acid, Diprotic acid, Monoprotic acid, Diprotic base`,

  `question: How many moles of NaOH are required to neutralize one mole of H2SO4?
Two moles, One mole, Three moles, Half a mole`,

  `question: Why is pH control important in agriculture?
Crops grow best in soil of proper pH, To prevent acid rain, To purify drinking water, To make processed foods`,

  `question: What would happen if the pH of human blood shifted significantly by one unit?
We would die, It would improve oxygen transport, It would have no major effect, It would increase enzyme activity`,

  `question: What is a characteristic of many biochemical reactions in living organisms regarding pH?
They are extremely pH dependent, They are pH independent, They function best at very low pH, They function best at very high pH`,

  `question: Acid rain results largely from the reaction of nitrogen and sulfur oxides with what?
Water, Carbon dioxide, Oxygen, Ozone`,

  `question: What type of solution contains components that enable it to resist large changes in pH when acids or bases are added?
Buffer solution, Neutral solution, Standard solution, Saturated solution`,

  `question: What is the major buffering agent mixture in human blood?
Carbonic acid H2CO3 and bicarbonate ions HCO3-, Acetic acid and sodium acetate, Phosphate ions, Hemoglobin`,

  `question: The basis of buffer action is the establishment of an equilibrium between a weak acid and its conjugate base or a weak base and its what?
Conjugate acid, Strong acid, Strong base, Neutral salt`,

  `question: A common buffer solution can be prepared from acetic acid CH3COOH and what other substance?
Sodium acetate CH3COONa, Hydrochloric acid HCl, Sodium hydroxide NaOH, Pure water`,

  `question: In the acetic acid/sodium acetate buffer system CH3COOH is the weak acid and CH3COO- is the what?
Conjugate base, Strong acid, Conjugate acid, Strong base`,

  `question: Buffer solutions function in accordance with which principle regarding equilibrium shifts due to stress?
LeChateliers principle, Hunds rule, Aufbau principle, Pauli exclusion principle`,

  `question: If a base (OH-) is added to an acetic acid/acetate buffer what happens?
Molecular acetic acid dissociates to replace H3O+ maintaining pH, Acetate ion combines with OH- increasing pH, pH drops sharply, The buffer precipitates`,

  `question: If an acid (H3O+) is added to an acetic acid/acetate buffer what happens?
Acetate ion combines with H3O+ to form more molecular acetic acid, Molecular acetic acid dissociates further lowering pH, pH rises sharply, The buffer capacity is exceeded immediately`,

  `question: What is buffer capacity a measure of?
The ability of a solution to resist large changes in pH, The initial pH of the buffer, The concentration of strong acid in the buffer, The volume of the buffer solution`,

  `question: The buffering capacity against a base is a function of the concentration of what component in the buffer?
The weak acid, The conjugate base, The strong acid, The salt anion`,

  `question: The buffering capacity against an acid is dependent on the concentration of what component in the buffer?
The anion of the salt (the conjugate base), The weak acid, The strong base, The hydronium ion`,

  `question: What is defined as the loss of electrons loss of hydrogen atoms or gain of oxygen atoms?
Oxidation, Reduction, Neutralization, Hydrolysis`,

  `question: What is defined as a gain of electrons gain of hydrogen atoms or loss of oxygen atoms?
Reduction, Oxidation, Precipitation, Dissociation`,

  `question: Are oxidation and reduction complementary processes?
Yes they always occur together, No they are independent processes, Only in acidic solutions, Only in basic solutions`,

  `question: What is a substance that is oxidized loses electrons and causes reduction called?
Reducing agent, Oxidizing agent, Catalyst, Spectator ion`,

  `question: What is a substance that is reduced gains electrons and causes oxidation called?
Oxidizing agent, Reducing agent, Inhibitor, Buffer component`,

  `question: In the reaction Mg + Cl2 -> Mg2+ + 2Cl- which element is oxidized?
Mg Magnesium, Cl Chlorine, Mg2+ Magnesium ion, Cl- Chloride ion`,

  `question: In the reaction Mg + Cl2 -> Mg2+ + 2Cl- which element is reduced?
Cl Chlorine, Mg Magnesium, Mg2+ Magnesium ion, Cl- Chloride ion`,

  `question: In the reaction Mg + Cl2 -> Mg2+ + 2Cl- Mg is the what?
Reducing agent, Oxidizing agent, Catalyst, Product`,

  `question: What is the deterioration of metals caused by an oxidation-reduction process termed?
Corrosion, Combustion, Neutralization, Precipitation`,

  `question: The simplest fossil fuel methane CH4 is what type of compound?
A hydrocarbon, An alcohol, An acid, A salt`
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