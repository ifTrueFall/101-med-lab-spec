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
  `question: Describe the clinical significance of normal and abnormal color appearance to urine. Page 21. The physical examination of urine includes the determination of urine color clarity and what else? Specific gravity, pH, Glucose, Ketones`,
  `question: Describe the clinical significance of normal and abnormal color appearance to urine. Page 21. What is the primary pigment responsible for the yellow color of urine? Urochrome, Urobilin, Uroerythrin, Bilirubin`,
  `question: Describe the clinical significance of normal and abnormal color appearance to urine. Page 21. Under normal conditions the body produces urochrome at what kind of rate? Constant, Variable, Increasing, Decreasing`,
  `question: Describe the clinical significance of normal and abnormal color appearance to urine. Page 21. What happens to the amount of urochrome in urine that stands at room temperature? Increases, Decreases, Stays the same, Disappears`,
  `question: Describe the clinical significance of normal and abnormal color appearance to urine. Page 21. Besides urochrome what two additional pigments contribute to normal urine color? Uroerythrin and Urobilin, Melanin and Homogentisic acid, Bilirubin and Biliverdin, Hemoglobin and Myoglobin`,
  `question: Describe the clinical significance of normal and abnormal color appearance to urine. Page 21. Which of the following is a commonly described color for normal urine? Amber, Red, Green, Black`,
  `question: Describe the clinical significance of normal and abnormal color appearance to urine. Page 21. Observing urine color and clarity can suggest disorders such as glomerular bleeding urinary tract infection and what else? Liver disease, Kidney stones, Diabetes mellitus, Hypertension`,
  `question: Describe the clinical significance of normal and abnormal color appearance to urine. Page 21. The actual amount of urochrome produced is dependent on the body's what? Metabolic state, Hydration level, Diet, Physical activity`,
  `question: Describe the clinical significance of normal and abnormal color appearance to urine. Page 22. Dark yellow or amber urine may be normal due to being concentrated or abnormal due to the presence of what? Bilirubin, Urobilin, Glucose, Protein`,
  `question: Describe the clinical significance of normal and abnormal color appearance to urine. Page 22. A urine specimen containing bilirubin will produce what color foam when shaken? Yellow, White, Orange, No foam`,
  `question: Describe the clinical significance of normal and abnormal color appearance to urine. Page 22. A large amount of white foam in a urine specimen indicates an increased concentration of what? Protein, Glucose, Bilirubin, Ketones`,
  `question: Describe the clinical significance of normal and abnormal color appearance to urine. Page 22. What medication given for urinary tract infections produces a thick orange pigment in urine? Pyridium, Rifampin, Levodopa, Amitriptyline`,
  `question: Describe the clinical significance of normal and abnormal color appearance to urine. Page 22. The photo-oxidation of bilirubin produces a yellow-green color due to the formation of what substance? Biliverdin, Urobilin, Melanin, Porphyrin`,
  `question: Describe the clinical significance of normal and abnormal color appearance to urine. Page 22. What is one of the most common causes of abnormal urine color? Presence of blood, High protein, Dehydration, Bacterial infection`,
  `question: Describe the clinical significance of normal and abnormal color appearance to urine. Page 22. A fresh brown urine containing blood may indicate glomerular bleeding due to the conversion of hemoglobin to what? Methemoglobin, Myoglobin, Bilirubin, Urobilinogen`,
  `question: Describe the clinical significance of normal and abnormal color appearance to urine. Page 22. When intact RBCs are present in urine how does it appear? Red and cloudy, Red and clear, Brown and clear, Pink and clear`,
  `question: Describe the clinical significance of normal and abnormal color appearance to urine. Page 22. When hemoglobin or myoglobin is present in urine how does it appear? Red and clear, Red and cloudy, Brown and cloudy, Orange and clear`,
  `question: Describe the clinical significance of normal and abnormal color appearance to urine. Page 22. The in vivo breakdown of RBCs results in hemoglobinuria which is accompanied by what color plasma? Red, Clear, Yellow, Brown`,
  `question: Describe the clinical significance of normal and abnormal color appearance to urine. Page 22. The breakdown of skeletal muscle produces what substance that can turn urine red? Myoglobin, Hemoglobin, Bilirubin, Porphobilinogen`,
  `question: Describe the clinical significance of normal and abnormal color appearance to urine. Page 23. In contrast to hemoglobinuria myoglobin in the urine does not affect the color of what? Plasma, Serum, Saliva, Lymph`,
  `question: Describe the clinical significance of normal and abnormal color appearance to urine. Page 23. Urine specimens containing what substance may appear red after standing due to oxidation? Porphyrins, Melanin, Homogentisic acid, Indican`,
  `question: Describe the clinical significance of normal and abnormal color appearance to urine. Page 23. In genetically susceptible persons eating what vegetable can cause red alkaline urine? Beets, Carrots, Spinach, Blackberries`,
  `question: Describe the clinical significance of normal and abnormal color appearance to urine. Page 23. Ingestion of what fruit can produce a red color in acidic urine? Blackberries, Beets, Strawberries, Cherries`,
  `question: Describe the clinical significance of normal and abnormal color appearance to urine. Page 23. What medication also known as Flagyl can produce a brown or black urine? Metronidazole, Levodopa, Rifampin, Pyridium`,
  `question: Describe the clinical significance of normal and abnormal color appearance to urine. Page 23. Urine that turns black upon standing and is negative for blood may contain homogentisic acid or what other substance? Melanin, Porphyrins, Indican, Biliverdin`,
  `question: Describe the clinical significance of normal and abnormal color appearance to urine. Page 23. Melanin is produced in excess when what condition is present? Malignant melanoma, Alkaptonuria, Liver disease, Porphyria`,
  `question: Describe the clinical significance of normal and abnormal color appearance to urine. Page 23. Homogentisic acid imparts a black color to alkaline urine in persons with what inborn error of metabolism? Alkaptonuria, Phenylketonuria, Tyrosinemia, Melanuria`,
  `question: Describe the clinical significance of normal and abnormal color appearance to urine. Page 23. A urinary tract infection by what bacterial species can be a pathogenic cause of blue or green urine? Pseudomonas, Escherichia, Staphylococcus, Streptococcus`,
  `question: Describe the clinical significance of normal and abnormal color appearance to urine. Page 23. Ingestion of what breath deodorizer can result in green urine? Clorets, Listerine, Scope, Binaca`,
  `question: Describe the clinical significance of normal and abnormal color appearance to urine. Page 23. The medication amitriptyline also known as Elavil may cause what color urine? Blue, Red, Black, Orange`,
  `question: Describe the clinical significance of normal and abnormal color appearance to urine. Page 22. Photo-oxidation of urobilinogen to urobilin can produce what color urine? Yellow-orange, Yellow-green, Red-brown, Blue-green`,
  `question: Describe the clinical significance of normal and abnormal color appearance to urine. Page 23. Which of the following is NOT a medication listed that produces red urine? Methocarbamol, Rifampin, Phenolphthalein, Phenothiazines`,
  `question: Describe the clinical significance of normal and abnormal color appearance to urine. Page 23. Levodopa and methyldopa are medications that can produce what color urine? Brown or black, Red or pink, Blue or green, Yellow or orange`,
  `question: Describe the clinical significance of normal and abnormal color appearance to urine. Page 23. Homogentisic acid is a metabolite of what? Phenylalanine, Tyrosine, Tryptophan, Methionine`,
  `question: Describe the clinical significance of normal and abnormal color appearance to urine. Page 23. Intestinal tract infections can result in increased urinary indican causing what color urine? Blue or green, Red or brown, Yellow or orange, Dark brown or black`,
  `question: Describe the clinical significance of urine clarity. Page 24. What general term refers to the transparency or turbidity of a urine specimen? Clarity, Color, Odor, Viscosity`,
  `question: Describe the clinical significance of urine clarity. Page 24. In routine urinalysis how is clarity determined? Visually examining the mixed specimen, Using a spectrophotometer, Measuring with a refractometer, Testing with a reagent strip`,
  `question: Describe the clinical significance of urine clarity. Page 24. Which of the following is a common term used to report urine clarity? Turbid, Opaque, Luminous, Dense`,
  `question: Describe the clinical significance of urine clarity. Page 24. A freshly voided normal urine specimen is usually what clarity? Clear, Hazy, Cloudy, Turbid`,
  `question: Describe the clinical significance of urine clarity. Page 24. What clarity term means there are no visible particulates and the urine is transparent? Clear, Hazy, Cloudy, Milky`,
  `question: Describe the clinical significance of urine clarity. Page 24. What clarity term describes urine with few particulates where print is easily seen through it? Hazy, Clear, Cloudy, Turbid`,
  `question: Describe the clinical significance of urine clarity. Page 24. What clarity term describes urine with many particulates where print is blurred through it? Cloudy, Hazy, Turbid, Milky`,
  `question: Describe the clinical significance of urine clarity. Page 24. If print cannot be seen through a urine specimen what clarity term is used? Turbid, Cloudy, Hazy, Milky`,
  `question: Describe the clinical significance of urine clarity. Page 24. The presence of squamous epithelial cells and what else can result in a nonpathological hazy urine? Mucus, Bacteria, Red blood cells, White blood cells`,
  `question: Describe the clinical significance of urine clarity. Page 24. Specimens that are refrigerated may develop turbidity from the precipitation of amorphous urates and what else? Phosphates, Oxalates, Sulfates, Carbonates`,
  `question: Describe the clinical significance of urine clarity. Page 24. Improper preservation of a urine specimen can result in what which increases turbidity? Bacterial growth, Crystal formation, Pigment oxidation, RBC lysis`,
  `question: Describe the clinical significance of urine clarity. Page 24. What are the most commonly encountered pathologic causes of turbidity in a fresh specimen? RBCs WBCs and bacteria, Crystals yeast and lipids, Mucus and epithelial cells, Amorphous urates and phosphates`,
  `question: Describe the clinical significance of urine clarity. Page 24. Which of the following is a less frequently encountered cause of pathologic turbidity? Yeast, Mucus, Squamous epithelial cells, Amorphous urates`,
  `question: Describe the clinical significance of urine clarity. Page 24. Pathologic turbidity is often caused by an infection or what other type of disorder? Systemic organ, Metabolic, Genetic, Endocrine`,
  `question: Describe the clinical significance of urine clarity. Page 24. Which term is NOT a standard descriptor for urine clarity? Opaque, Clear, Hazy, Turbid`,
  `question: Describe the clinical significance of urine clarity. Page 24. The presence of lymph fluid and what other substance are less frequent pathologic causes of turbidity? Lipids, Glucose, Ketones, Protein`,
  `question: Describe the clinical significance of normal and abnormal color appearance to urine. Page 21. For best results urine color should be examined under a good light source and against what? A white background, A black background, A colored chart, A light source`,
  `question: Describe the clinical significance of normal and abnormal color appearance to urine. Page 22. What happens to the small amount of foam produced by shaking normal urine? It rapidly disappears, It turns yellow, It turns white, It persists for minutes`,
  `question: Describe the clinical significance of normal and abnormal color appearance to urine. Page 22. Pyridium pigment interferes with chemical tests performed using what? Reagent strips, A microscope, A refractometer, A spectrophotometer`,
  `question: Describe the clinical significance of normal and abnormal color appearance to urine. Page 22. Red blood cells remaining in what type of urine for several hours produce a brown color? Acidic, Alkaline, Neutral, Dilute`,
  `question: Describe the clinical significance of normal and abnormal color appearance to urine. Page 23. What is a nonpathogenic cause of red urine in women? Menstrual contamination, Urinary tract infection, Glomerular bleeding, Kidney stones`,
  `question: Describe the clinical significance of urine clarity. Page 24. A midstream clean-catch specimen is most likely to have what clarity upon fresh voiding? Clear, Hazy, Cloudy, Turbid`,
  `question: Describe the clinical significance of urine clarity. Page 24. Nonpathological turbidity in specimens from women is often due to mucus and what other cell type? Squamous epithelial, Transitional epithelial, Renal tubular, White blood`,
  `question: Describe the clinical significance of urine clarity. Page 24. Abnormal amounts of what type of cells are a pathologic cause of turbidity? Non-squamous epithelial, Squamous epithelial, Red blood, White blood`,
  `question: Describe the clinical significance of urine clarity. Page 24. The term 'milky' suggests the specimen may have precipitated or be what? Clotted, Infected, Diluted, Contaminated`
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