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
  `question: Where is alpha-2-Macroglobulin AMG synthesized?
Liver, Spleen, Kidneys, Bone marrow`,
  `question: What is a key characteristic of alpha-2-Macroglobulin AMG due to its large size of approximately 725kDa?
It does not diffuse significantly into extracellular fluids, It easily passes through glomerular filters, It is rapidly cleared by the kidneys, It is primarily an intracellular protein`,
  `question: Alpha-2-Macroglobulin AMG inhibits enzymes with which components in their catalytic sites?
Serine cysteine and metal ions, Only serine, Only cysteine, Only metal ions`,
  `question: How is alpha-2-Macroglobulin AMG activated to bind to proteases?
By proteolytic cleavage, By binding to calcium, By phosphorylation, By glycosylation`,
  `question: What happens to alpha-2-Macroglobulin AMG once it is cleaved by a protease?
It is rapidly cleared by hepatic receptors, Its half-life extends significantly, It becomes a more potent inhibitor, It dissociates into smaller subunits`,
  `question: What effect does estrogen have on alpha-2-Macroglobulin AMG levels?
Increases AMG levels, Decreases AMG levels, No significant effect, Causes AMG denaturation`,
  `question: How do alpha-2-Macroglobulin AMG levels in infants and children compare to adult concentrations?
Two to three times higher than adult levels, Significantly lower than adult levels, Similar to adult levels, Highly variable and unpredictable`,
  `question: Is alpha-2-Macroglobulin AMG considered an acute phase reactant APR for humans?
No it stays fairly constant, Yes it is a strong positive APR, Yes it is a negative APR, Only in severe inflammation`,
  `question: In which condition are increases of alpha-2-Macroglobulin AMG typically seen unlike most other proteins which decrease?
Nephrotic syndrome, Acute pancreatitis, Advanced prostate cancer, Severe burns`,
  `question: Which of these conditions is associated with increased levels of alpha-2-Macroglobulin AMG?
Diabetes, Hypothyroidism, Iron deficiency anemia, Vitamin D deficiency`,
  `question: Decreases in alpha-2-Macroglobulin AMG are seen in individuals with which of these conditions?
Acute pancreatitis, Nephrotic syndrome, Pregnancy, Diabetes`,
  `question: Haptoglobin and alpha-2-Macroglobulin make up the majority of which band on a serum electrophoresis strip?
alpha-2 globulin band, alpha-1 globulin band, beta globulin band, gamma globulin band`,
  `question: In what situation would alpha-2-Macroglobulin AMG alone be the main contributor to the alpha-2 zone on electrophoresis?
Unborn babies into the newborn period and after in vivo hemolysis, In healthy adults, During severe dehydration, In patients with high albumin`,
  `question: How is alpha-2-Macroglobulin AMG typically quantified in the laboratory?
Immunoturbidimetry or immunonephelometry, Dye-binding methods, Enzyme-linked immunosorbent assay ELISA, Spectrophotometry`,
  `question: The intact form of alpha-2-Macroglobulin AMG has a half-life of how long?
Several days, Several hours, Several weeks, Several months`,
  `question: Alpha-2-Macroglobulin AMG is a major plasma what?
Proteinase inhibitor, Oxygen carrier, Lipid transporter, Clotting factor`,
  `question: Which animals are mentioned as having alpha-2-Macroglobulin as an APR monitored in research?
Rats, Dogs, Cats, Monkeys`,
  `question: Advanced prostate cancer is associated with what change in AMG levels?
Decreases of AMG, Increases of AMG, No change in AMG, Fluctuation of AMG`,
  `question: Ceruloplasmin Cp is an alpha-2 globulin that contains approximately what percentage of the total serum copper?
95 percent, 50 percent, 75 percent, 25 percent`,
  `question: What gives Ceruloplasmin Cp its characteristic blueish tint?
Very high content of copper, High iron content, Presence of bilirubin, Bound lipids`,
  `question: In what organ is Ceruloplasmin Cp primarily synthesized?
Liver, Kidneys, Spleen, Pancreas`,
  `question: What is essential for the normal folding of the Ceruloplasmin polypeptide chain?
Copper, Zinc, Iron, Magnesium`,
  `question: What can happen if the liver produces ApoCp without copper due to low copper levels or lack of ATPase?
It is very unstable and decreased amounts are released, It becomes more stable and circulates longer, It binds iron more effectively, It is rapidly excreted by the kidneys`,
  `question: Decreased release of functional Ceruloplasmin can result in increased levels of what accumulating in the bloodstream over time?
Iron, Copper, Zinc, Calcium`,
  `question: What are the most important copper transport proteins besides Ceruloplasmin?
Albumin and transcuprein, Transferrin and ferritin, Haptoglobin and hemopexin, Lipoproteins and globulins`,
  `question: What is the primary role of Ceruloplasmin Cp?
Serve as a catalyst for redox reactions, Bind and transport oxygen, Regulate plasma pH, Inhibit proteases`,
  `question: The most crucial redox reaction catalyzed by Ceruloplasmin is the oxidizing of iron from what state to what state?
Fe2+ to Fe3+ ferrous to ferric, Fe3+ to Fe2+ ferric to ferrous, Copper1+ to Copper2+, Zinc2+ to elemental Zinc`,
  `question: Why is the conversion of iron from ferrous to ferric by Ceruloplasmin important for iron transport?
Iron is not able to be transported by transferrin otherwise, Ferric iron is more easily absorbed, Ferrous iron is toxic, It prevents iron precipitation`,
  `question: How is Ceruloplasmin classified as an Acute Phase Reactant APR?
Weak and late reacting APR, Strong and early reacting APR, Not an APR, A negative APR`,
  `question: In which condition are Ceruloplasmin concentrations significantly increased?
Elevated estrogen levels such as pregnancy, Iron deficiency, Acute blood loss, Severe burns`,
  `question: A rare primary genetic deficiency of Ceruloplasmin may result in accumulation of what substance similar to hereditary hemochromatosis?
Iron, Copper, Bilirubin, Uric acid`,
  `question: Secondary deficiency of Ceruloplasmin is more common and can result from what?
Dietary copper insufficiency or defective copper incorporation, Excessive iron intake, Vitamin C deficiency, High zinc supplementation`,
  `question: What genetic disorder involves defective incorporation of copper into developing Ceruloplasmin?
Wilson disease, Menkes disease, Hemochromatosis, Alpha-1 antitrypsin deficiency`,
  `question: Wilson disease results in increased total body copper levels being deposited in tissues including the liver brain and what part of the eye?
Periphery of the iris Kayser-Fleischer rings, Retina, Lens, Cornea`,
  `question: Symptoms for Wilson disease such as hepatitis and neurological disorders do not typically begin to show until what age range?
20s or 30s, Childhood before age 10, Adolescence 12 to 18 years, Late adulthood after 50`,
  `question: How is Ceruloplasmin typically measured in the laboratory?
Immunoturbidimetry or immunonephelometry, Copper oxidase assays for functional activity, Atomic absorption for copper, Dye-binding methods`,
  `question: To which section does Ceruloplasmin migrate on a serum electrophoresis?
alpha-2 section, alpha-1 section, beta section, gamma section`,
  `question: Ceruloplasmin is subject to what changes during storage making it labile?
Oxidation and proteolysis, Glycosylation and phosphorylation, Aggregation and precipitation, Denaturation by heat`,
  `question: To reduce lability how should serum or plasma for Ceruloplasmin testing be handled if not run immediately?
Separated from cells ASAP stored refrigerated up to 3 days or frozen at -70C, Stored at room temperature for up to 24 hours, Frozen immediately at -20C, Acidified to stabilize the protein`,
  `question: In which electrophoretic region is Transferrin TRF typically found?
Beta region, Alpha-1 region, Alpha-2 region, Gamma region`,
  `question: What is the major transport protein for iron in the body?
Transferrin TRF, Albumin, Ceruloplasmin, Haptoglobin`,
  `question: Transferrin makes up most of which iron-related laboratory measurement?
Total iron-binding capacity TIBC, Serum iron, Ferritin, Hemoglobin`,
  `question: Before transferrin can bind to iron the iron must first be oxidized by which protein?
Ceruloplasmin, Haptoglobin, Albumin, Alpha-2-Macroglobulin`,
  `question: How many molecules of ferric iron Fe3+ can one molecule of transferrin reversibly bind?
Up to two molecules, One molecule only, Up to four molecules, Up to three molecules`,
  `question: Normally what percentage of transferrin binding sites are occupied by iron?
20 percent to 50 percent, Less than 10 percent, 50 percent to 75 percent, Greater than 75 percent`,
  `question: The Transferrin-Fe3+ complex is transported to cells to be incorporated into ferritin hemoglobin and what other protein?
Myoglobin, Cytochrome, Catalase, Peroxidase`,
  `question: Transferrin concentrations are primarily regulated by the amount of what available in the plasma?
Iron, Copper, Zinc, Protein`,
  `question: In cases of iron deficiency anemia what typically happens to Transferrin TRF levels?
TRF levels are increased, TRF levels are decreased, TRF levels remain normal, TRF levels fluctuate wildly`,
  `question: In anemias resulting from chronic disease not iron deficiency what is often true about transferrin levels and saturation?
Transferrin levels are normal or low but saturated with iron, Transferrin levels are high and poorly saturated, Transferrin levels are low and poorly saturated, Transferrin levels are high and highly saturated`,
  `question: In an iron overload state like hemochromatosis what are the typical Transferrin TRF levels and saturation?
TRF levels are normal but highly saturated, TRF levels are high and highly saturated, TRF levels are low and highly saturated, TRF levels are normal and poorly saturated`,
  `question: During pregnancy or estrogen administration what happens to Transferrin TRF levels?
High levels of TRF are seen, Low levels of TRF are seen, TRF levels remain unchanged, TRF is undetectable`,
  `question: How does Transferrin behave as an Acute Phase Protein APP?
It serves as a negative APP, It serves as a positive APP, It is not an APP, It is a weak positive APP`,
  `question: Decreased synthesis of Transferrin is seen with protein malnutrition and what other condition?
Chronic liver disease, Acute kidney injury, Hyperthyroidism, Diabetes mellitus`,
  `question: Low levels of Transferrin are seen in patients with inflammation and which other condition?
Nephrotic syndrome, Iron overload, Pregnancy, Pernicious anemia`,
  `question: What rare congenital disorder is characterized by very low transferrin levels iron overload and severe hypochromic anemia?
Atransferrinemia, Hemochromatosis, Wilson disease, Menkes syndrome`,
  `question: Iron deposits in the liver and heart leading to potential heart failure can occur in which disorder?
Atransferrinemia, Thalassemia, Sickle cell anemia, Spherocytosis`,
  `question: Why are morning specimens preferred for the evaluation of iron levels?
Iron levels are highest in the morning and lowest in the evenings, Iron is more stable in morning samples, Diurnal variation affects transferrin more than iron, To minimize dietary interference`,
  `question: What methods are used for the determination of total iron-binding capacity TIBC?
Photometric methods, Immunological methods, Electrophoretic methods, Chromatographic methods`,
  `question: How is Transferrin TRF typically measured in the laboratory?
Immunoturbidimetry and immunonephelometry, Dye-binding assays, Enzyme assays, Spectrophotometry after iron removal`,
  `question: Some genetic variations of Transferrin can cause it to shift from the beta-1 region to which other region on serum electrophoresis?
Beta-2 region, Alpha-2 region, Gamma region, Prealbumin region`
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