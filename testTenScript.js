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
  `question: Enzymes are large naturally occurring proteins distinguished from other proteins by what action?
Catalytic action, Structural support, Oxygen transport, Hormonal signaling`,
  `question: The specific amino acid sequence of an enzyme is known as what level of protein structure?
Primary structure, Secondary structure, Tertiary structure, Quaternary structure`,
  `question: The spatial relationship between the subunits of an enzyme containing more than one polypeptide unit is called what?
Quaternary structure, Tertiary structure, Secondary structure, Primary structure`,
  `question: Enzymes that catalyze oxidation-reduction reactions belong to which class?
Oxidoreductases, Transferases, Hydrolases, Lyases`,
  `question: Enzymes that catalyze the transfer of functional groups from one molecule to another belong to which class?
Transferases, Oxidoreductases, Isomerases, Ligases`,
  `question: Enzymes that catalyze hydrolysis reactions by adding a water molecule to break a bond belong to which class?
Hydrolases, Lyases, Ligases, Isomerases`,
  `question: Enzymes that catalyze the addition of a group to a double bond or removal of a group to form one belong to which class?
Lyases, Hydrolases, Transferases, Oxidoreductases`,
  `question: Enzymes that catalyze the rearrangement of functional groups within a molecule are classified as what?
Isomerases, Ligases, Lyases, Hydrolases`,
  `question: Enzymes that catalyze a reaction in which a C-C C-S C-O or C-N bond is made or broken belong to which class?
Ligases, Isomerases, Transferases, Hydrolases`,
  `question: Different forms of an enzyme that exist within the same individual and maintain the same catalytic function are known as what?
Isoenzymes or isozymes, Apoenzymes, Holoenzymes, Coenzymes`,
  `question: What are the nonprotein substances that are needed for some enzymatic activity called?
Cofactors, Substrates, Products, Inhibitors`,
  `question: Organic compounds that are loosely bound to an enzyme and required for its activity are called what?
Coenzymes, Activators, Apoenzymes, Holoenzymes`,
  `question: Inorganic ions like chloride and magnesium that are needed for enzymatic activity are called what?
Activators, Coenzymes, Prosthetic groups, Substrates`,
  `question: An enzyme without its associated cofactors is referred to as what?
Apoenzyme, Holoenzyme, Isoenzyme, Zymogen`,
  `question: What is the term for the complete and active enzyme-cofactor complex?
Holoenzyme, Apoenzyme, Coenzyme, Activator`,
  `question: What is the name of the water-free cavity on an enzyme where the substrate interacts?
Active site, Allosteric site, Binding pocket, Catalytic cleft`,
  `question: A cavity on an enzyme other than the active site that may bind regulator molecules is called what?
Allosteric site, Active site, Regulatory pocket, Inhibition site`,
  `question: How do enzymes increase the rate of a chemical reaction?
By lowering the activation energy, By increasing the reaction temperature, By altering the equilibrium constant, By increasing the substrate concentration`,
  `question: The physical binding of a substrate to the active site of an enzyme forms what?
Enzyme-substrate complex, Enzyme-product complex, Holoenzyme, Activated enzyme`,
  `question: The ability of an enzyme to bind only one or very few substrates is known as what?
Enzyme specificity, Enzyme kinetics, Enzyme activity, Enzyme regulation`,
  `question: An enzyme that catalyzes the reaction of only one substrate has what type of specificity?
Absolute specificity, Group specificity, Linkage specificity, Stereochemical specificity`,
  `question: An enzyme that catalyzes processes involving similar molecules with the same functional group has what type of specificity?
Group specificity, Absolute specificity, Linkage specificity, Stereochemical specificity`,
  `question: An enzyme that catalyzes the formation or breakage of only certain bonds in a molecule has what type of specificity?
Linkage specificity, Group specificity, Absolute specificity, Stereochemical specificity`,
  `question: What type of specificity does an enzyme have if it can distinguish one enantiomer from the other?
Stereochemical specificity, Linkage specificity, Group specificity, Absolute specificity`,
  `question: At a low substrate concentration when the enzyme amount exceeds the substrate amount the reaction rate follows what order of kinetics?
First-order kinetics, Zero-order kinetics, Second-order kinetics, Mixed-order kinetics`,
  `question: In first-order kinetics the reaction rate is directly proportional to what?
Substrate concentration, Enzyme concentration, Product concentration, Temperature`,
  `question: When the substrate concentration is high enough to saturate all available enzyme the reaction velocity reaches its peak and follows what order of kinetics?
Zero-order kinetics, First-order kinetics, Second-order kinetics, Pseudo-first-order kinetics`,
  `question: In zero-order kinetics the reaction rate depends only on what?
Enzyme concentration, Substrate concentration, Product concentration, pH`,
  `question: As long as the substrate concentration exceeds the enzyme concentration the velocity of the reaction is proportional to what?
The enzyme concentration, The substrate concentration, The temperature, The pH`,
  `question: Most enzymes are active only within what kind of pH range?
A very narrow pH range, A very wide pH range, Only acidic pH, Only basic pH`,
  `question: What is the pH of the cytoplasm of a cell where most enzymes function best?
7, 5, 9, 3`,
  `question: How do extreme changes in pH affect an enzyme?
It becomes denatured, It becomes more active, It changes its substrate specificity, It doubles its reaction rate`,
  `question: How does a modest increase in temperature affect the rate of an enzyme-catalyzed reaction?
The rate increases, The rate decreases, The rate remains the same, The reaction stops completely`,
  `question: What happens to an enzyme if the environmental temperature rises too high such as above 37 degrees Celsius?
It is rapidly destroyed or denatured, It becomes more stable, Its activity doubles with every 10-degree rise, It becomes dormant but not destroyed`,
  `question: What are chemicals that can bind to enzymes and either eliminate or drastically reduce their catalytic ability called?
Enzyme inhibitors, Enzyme activators, Enzyme cofactors, Enzyme substrates`,
  `question: What type of enzyme inhibitor resembles the structure of the natural substrate and competes for the active site?
Competitive inhibitor, Noncompetitive inhibitor, Uncompetitive inhibitor, Allosteric inhibitor`,
  `question: In competitive inhibition the degree of inhibition depends on the relative concentrations of the inhibitor and what other molecule?
The substrate, The product, The coenzyme, The activator`,
  `question: How can competitive inhibition be overcome?
By having the natural substrate present in excess, By adding more inhibitor, By increasing the temperature, By changing the pH`,
  `question: Where does a noncompetitive enzyme inhibitor bind to an enzyme?
At a place other than the active site often an allosteric site, Only at the active site, To the substrate directly, To the coenzyme`,
  `question: Can noncompetitive inhibition be reversed by the addition of more substrate?
No because they bind at a different location, Yes it is easily reversed, Only if the inhibitor concentration is low, Only at high temperatures`,
  `question: When does uncompetitive enzyme inhibition occur?
When the inhibitor binds to the enzyme-substrate complex, When the inhibitor binds to the free enzyme, When the inhibitor binds to the substrate, When the inhibitor binds to the product`,
  `question: How does increasing substrate concentration affect uncompetitive inhibition?
It increases the inhibition, It decreases the inhibition, It has no effect on the inhibition, It reverses the inhibition`,
  `question: Since enzymes are usually present in very small quantities what is a convenient method for their quantitation?
Measurement of catalytic activity, Direct mass measurement by weighing, Titration with a strong acid, Staining and visual estimation`,
  `question: Common methods for measuring enzyme activity photometrically measure a decrease in substrate concentration or an increase in what?
Product concentration, Enzyme concentration, Inhibitor concentration, Cofactor concentration`,
  `question: In which method for measuring enzyme activity are reactants combined for a designated time before the reaction is stopped?
Fixed-time Method, Continuous-monitoring or Kinetic Assays, Electrophoretic method, Immunochemical method`,
  `question: The fixed-time method assumes that the reaction is what over the reaction time?
Linear, Exponential, Logarithmic, Stationary`,
  `question: Which method for measuring enzyme activity involves taking multiple measurements of absorbance change during the reaction?
Continuous-monitoring or Kinetic Assays, Fixed-time Method, Endpoint Method, Manual Method`,
  `question: What is an advantage of continuous-monitoring assays over fixed-time methods?
The linearity of the reaction may be more adequately verified, They require less sophisticated equipment, They are less affected by temperature, They use less reagent`,
  `question: When enzymes are quantified relative to their activity the units used to report their levels are called what?
Activity units, Mass units, Molar units, Concentration units`,
  `question: What is the standard unit for reporting enzyme activity?
International unit IU, Katal Kat, Enzyme unit EU, Bodansky unit`,
  `question: One International Unit IU is the amount of enzyme that will catalyze the reaction of 1 micromole of substrate per what time?
Minute, Second, Hour, Day`,
  `question: Immunoassay methodologies that quantify enzyme concentration by mass are routinely used for which enzyme?
Creatine kinase CK-MB, Alkaline phosphatase ALP, Amylase AMY, Lactate dehydrogenase LD`,
  `question: Which laboratory technique can provide resolution of isoenzymes and isoforms?
Electrophoretic techniques, Spectrophotometry, Titration, Nephelometry`,
  `question: Enzymes that are always present in cells performing some metabolic function are called what?
Constitutive enzymes, Inducible enzymes, Allosteric enzymes, Zymogens`,
  `question: Enzymes that are not always present but are produced in response to a stimulus like a drug are called what?
Inducible enzymes, Constitutive enzymes, Apoenzymes, Isoenzymes`,
  `question: Which organ is noted for having inducible enzymes that metabolize drugs?
Liver, Kidneys, Lungs, Spleen`,
  `question: The determination of several enzymes in plasma can give a pattern of activities that is indicative of what?
The tissue or cell type from which the enzymes have been derived, The patient's nutritional status, The patient's blood type, The patient's hydration level`,
  `question: Enzymes are used as analytical reagents to measure what?
Metabolites and substrates, Only pH and temperature, Only other enzymes, The viscosity of a sample`,
  `question: In competitive inhibition what happens if the inhibitor is in excess or binds more strongly than the substrate?
Enzyme activity will be greatly decreased, Enzyme activity will be greatly increased, There will be no change in enzyme activity, The enzyme will become denatured`,
  `question: What does an enzyme do to the equilibrium constant for the reaction it catalyzes?
It cannot alter the equilibrium constant, It increases the equilibrium constant, It decreases the equilibrium constant, It doubles the equilibrium constant`
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