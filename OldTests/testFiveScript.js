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
  const myQuestions = 
  [
    `question: What is a compound or mixture used in a chemical reaction to detect measure examine or produce other substances?
  Reagent, Solvent, Solute, Catalyst`,

    `question: What is a material or substance with one or more physical or chemical properties sufficiently established for equipment calibration method verification or assigning values to materials?
  Reference Material, Control Substance, Analytical Standard, Certified Reagent`,

    `question: The quality of analytical results produced by a laboratory is a direct indication of the purity of what?
  Chemicals used as analytical reagents, The type of instrumentation, The laboratorys location, The number of staff`,

    `question: What does OSHA require manufacturers to clearly indicate on chemical labels in addition to the lot number?
  Any physical or biologic health hazard and precautions, The date of manufacture only, The suggested retail price, The chemical formula only`,

    `question: What is the document called that a manufacturer must provide with technical data sheets for each chemical?
  Safety Data Sheet SDS, Product Specification Guide, Certificate of Analysis COA, User Instruction Manual`,

    `question: Chemicals meeting American Chemical Society ACS specifications are described as what grade?
  Analytical Reagent AR Grade, Chemically Pure CP Grade, Technical Grade, USP Grade`,

    `question: Labels on AR grade reagents typically state the actual impurities or list the what?
  Maximum allowable impurities, Minimum purity percentage, Recommended uses, Storage temperature`,

    `question: For what are AR grade chemicals generally suitable?
  Use in most analytical laboratory procedures, Only for educational purposes, Industrial manufacturing, Non-critical cleaning tasks`,

    `question: Ultrapure chemicals undergo additional purification for use in specific procedures like chromatography or molecular diagnosis. True or False?
  True, False, Only for chromatography, Only for molecular diagnosis`,

    `question: Ultrapure reagents might carry what designations on their labels?
  HPLC or chromatographic, CP or Pure Grade, Technical or Commercial, USP or NF`,

    `question: What do the reagent designations Chemically Pure CP or pure grade indicate about impurity limitations?
  Impurity limitations are not stated, Impurities are less than 0.01 percent, All impurities are listed, They are free of all impurities`,

    `question: When is it recommended for clinical laboratories to use CP grade chemicals for reagent preparation?
  Only if further purification or a reagent blank is included, Always for cost savings, Never under any circumstance, For all non-automated tests`,

    `question: Chemicals graded as United States Pharmacopeia USP or National Formulary NF are primarily used to manufacture what?
  Drugs, Laboratory diagnostic kits, Industrial solvents, Agricultural fertilizers`,

    `question: The purity standards for USP and NF grade chemicals are based on what primary criterion?
  Not being injurious to individuals, Meeting specific analytical laboratory needs, Extreme chemical purity, Suitability for all chemical reactions`,

    `question: While USP/NF chemicals might be pure enough for some procedures why might they not meet all lab assay requirements?
  Purity standards are not based on laboratory needs, They are always less pure than AR grade, They contain specific stabilizers, They are intended for external use only`,

    `question: In what field are Technical or Commercial grade reagents primarily used?
  Manufacturing, Clinical laboratory analysis, Pharmaceutical research, Ultrapure synthesis`,

    `question: What is the recommendation for using Technical or Commercial grade reagents in the clinical laboratory?
  Should never be used, Can be used for general cleaning, Acceptable for non-quantitative tests, Only if AR grade is unavailable`,

    `question: What is the process used to measure the mass of a substance?
  Gravimetry (using a balance), Volumetry, Spectrophotometry, Titration`,

    `question: Weight is a function of mass under the influence of what force?
  Gravity, Magnetism, Centrifugal force, Buoyancy`,

    `question: What are the two main types of balances mentioned for determining mass?
  Mechanical and Electronic, Spring and Beam, Digital and Analog, Top-loading and Bottom-loading`,

    `question: How do mechanical scales generally operate?
  By a fulcrum mechanism, By electromagnetic force, Using strain gauges, Using piezoelectric sensors`,

    `question: How do electronic balances typically restore the balance arm to the null position?
  Using electromagnetic force, Using a series of counterweights, Using calibrated springs, Using hydraulic pressure`,

    `question: What are standard weights used to counter balance object weights and verify balance accuracy called?
  Analytical weights, Tare weights, Calibration masses, Comparison standards`,

    `question: How often should balances in the clinical laboratory be calibrated at a minimum according to the text?
  At least monthly, Daily, Annually, Only when serviced`,

    `question: What is the process of determining and deducting the weight of a container from the gross weight called?
  Taring, Zeroing, Nulling, Calibrating`,

    `question: What is the simplest type of mechanical balance described consisting of a single beam with equal length arms?
  Double-Pan Balance, Single-Pan Balance, Analytical Balance, Electronic Balance`,

    `question: Which type of balance is stated to be the least accurate?
  Double-Pan Balance, Electronic Analytical Balance, Top-Loading Single-Pan Balance, Mechanical Analytical Balance`,

    `question: Which balance type is mentioned as the most commonly used in clinical labs with moderate accuracy and ease of use?
  Single-Pan Balance, Double-Pan Balance, Microbalance, Spring Balance`,

    `question: What is the most accurate type of balance often precise to 0.1 mg?
  Analytical Balance, Single-Pan Top-Loading Balance, Double-Pan Balance, Triple Beam Balance`,

    `question: The feature on an electronic analytical balance that allows it to determine the mass of the weighing vessel and reset to zero is called what?
  Tare capability, Auto-calibration, Zero-point adjustment, Mass compensation`,

    `question: Centrifugation uses centrifugal force to separate solution portions based on what property?
  Heaviness or density, Color, Volume, Chemical reactivity`,

    `question: What is the primary purpose of centrifuges in a clinical chemistry laboratory?
  Separate clotted blood or cells from serum or plasma, Mix reagents thoroughly, Measure sample volumes accurately, Incubate samples at specific temperatures`,

    `question: Centrifugal speed is measured in what units?
  Revolutions per minute rpm, Gravity units g, Meters per second m/s, Joules J`,

    `question: What are the three main types of centrifuges listed?
  Horizontal-head angle-head and ultracentrifuges, Benchtop floor-model and micro-hematocrit, Refrigerated non-refrigerated and vacuum, Manual electrical and gas-powered`,

    `question: In Horizontal-Head or swinging bucket centrifuges what is the orientation of tubes when the centrifuge is fully in motion?
  Horizontal, Vertical, Angled at 45 degrees, Inverted`,

    `question: Which type of centrifuge is specifically recommended for serum separator devices?
  Horizontal-Head Centrifuge, Angle-Head Centrifuge, Ultracentrifuge, Fixed-rotor microfuge`,

    `question: Angle-Head centrifuges hold tubes at a fixed angle typically between what degrees?
  25 to 52 degrees, 0 to 15 degrees, 60 to 75 degrees, Exactly 90 degrees`,

    `question: Is decantation generally recommended with an angle-head centrifuge due to how the sediment forms?
  No not recommended, Yes it is ideal, Only for urine samples, Only with very dense sediments`,

    `question: Which type of centrifuge generates the highest speeds and is often refrigerated to reduce heat from friction?
  Ultracentrifuge, Standard Angle-Head Centrifuge, Horizontal-Head Centrifuge, Benchtop clinical centrifuge`,

    `question: Ultracentrifuges are particularly useful for what type of separations because refrigeration enhances this separation?
  Lipoprotein separations, Red blood cell packing, Urine sediment concentration, Bacterial pelleting`,

    `question: What is one of the most critical safety considerations when operating any centrifuge?
  To balance the load properly, To always use the maximum speed, To manually stop the rotor, To leave the lid open for observation`,

    `question: What can severe imbalance in a centrifuge lead to?
  Serious vibrations tube breakage and potential centrifuge damage or injury, Slightly longer spin times, Incomplete sample mixing, Reduced motor lifespan only`,

    `question: How often should the inside surfaces of a centrifuge be cleaned with a 10 percent bleach solution or equivalent disinfectant?
  Daily, Weekly, Monthly, Annually`,

    `question: If tube breakage occurs in a centrifuge what must be done immediately to the parts in contact with infectious material?
  Decontaminated, Rinsed with tap water only, Wiped with a dry paper towel, Left until the next scheduled cleaning`,

    `question: After tube breakage how should the centrifuge bowl ideally be cleaned?
  With a germicidal disinfectant, With soap and water, With 70 percent alcohol, By autoclaving the entire bowl`,

    `question: How frequently should the speed of a centrifuge be checked using a tachometer?
  At least once every 6 months, Only when a problem is noticed, Every 2 years, Annually`,

    `question: The measured speed of a centrifuge should not differ by more than what percentage from its rated speed?
  5 percent, 1 percent, 10 percent, 0.5 percent`,

    `question: How often should a centrifuge timer be checked against a reference timer?
  At least once every 6 months, Daily, Annually, Only if it seems inaccurate`,

    `question: A centrifuge timer should not differ by more than what percentage when compared to a stopwatch?
  10 percent, 2 percent, 5 percent, 1 percent`,

    `question: If labware that contacted biohazardous material is not disposable what must be done to it?
  Decontaminated according to appropriate protocols, Soaked in saline solution, Washed in a standard dishwasher, Air dried for 24 hours`,

    `question: What is the recommended initial step for cleaning dirty lab utensils after use?
  Rinse immediately and soak in weak detergent or 10 percent bleach, Autoclave them directly, Scrub with abrasive powder, Store them for batch washing later`,

    `question: What should be ensured about labware before it is used after cleaning and washing?
  It should be completely dried, It should be slightly damp for better reagent adherence, It should be stored in a humidified cabinet, It should be chilled`,

    `question: What shape does a beaker typically have?
  Shaped like a drinking glass with a small pour spout, Conical with a flat bottom and narrow neck, Spherical with multiple necks, Tall and cylindrical with precise markings`,

    `question: Of the flask types mentioned (beakers Erlenmeyer graduated cylinders) which has the least accuracy for volume measurements?
  Beakers, Graduated cylinders, Erlenmeyer flasks, Volumetric flasks (implied comparison)`,

    `question: What are beakers commonly used for in a laboratory setting?
  Holding stock solutions or diluents for short-term use, Precise measurement of reactant volumes, Titration procedures, Calibrating pipettes`,

    `question: How is a graduated cylinder described in terms of its shape and markings?
  A tall flask with multiple volume gradations, A wide-mouthed conical flask, A flat-bottomed round flask, A pear-shaped flask with one mark`,

    `question: What is the main purpose of a graduated cylinder in making reagent dilutions or determining fluid volumes?
  To aliquot volumes of a fluid, To mix reagents by swirling, To store chemicals long-term, To heat solutions`,

    `question: A graduated cylinder has a higher degree of accuracy than which other flask type specifically mentioned in comparison?
  An Erlenmeyer flask, A volumetric flask, A beaker (implied also), A reagent bottle`,

    `question: The volume markings on a graduated cylinder are graduated to at least what percentage of its total volume?
  5 percent, 1 percent, 0.5 percent, 10 percent`,

    `question: Isopropyl alcohol labeled "ACS REAGENT GRADE" meets the specifications of which organization?
  American Chemical Society ACS, United States Pharmacopeia USP, National Formulary NF, Food and Drug Administration FDA`
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