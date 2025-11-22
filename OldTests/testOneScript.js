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
//  The script will automatically randomize the order when the page is loaded.
//  DEFINE YOUR QUESTIONS HERE
//  The first line contains the full question.
//  The second line contains the correct answer followed by three wrong answers.
//  DEFINE YOUR QUESTIONS HERE
//  The first line contains the full question.
//  The second line contains the correct answer followed by three wrong answers.
const myQuestions = [
  `question: A medical image showing a "slice" of the abdomen from top from bottom would be in which plane?
Transverse, Frontal, Sagittal, Midsagittal`,
  `question: If a surgeon needs to divide the body into equal left and right halves, which plane would they reference?
Midsagittal, Coronal, Sagittal, Transverse`,
  `question: Which plane is used to separate the front of the body from the back?
Frontal, Transverse, Sagittal, Oblique`,
  `question: During a physical exam, if a patient is instructed to lie on their back with their face upward, they are in the ____ position.
Supine, Prone, Lateral, Anatomical`,
  `question: Which position is often used for blood collection?
Supine, Prone, Anatomical, Fowlers`,
  `question: "Pronation" refers to the movement of the:
Foot, Hand, Head, Leg`,
  `question: Which of the following is NOT a function of the integumentary system?
Gas exchange, Vitamin D production, Temperature regulation, Protection`,
  `question: Where does the production of red and white blood cells normally occur?
Bone Marrow, Liver, Spleen, Pancreas`,
  `question: Which type of muscle tissue is found in the walls of hollow organs?
Smooth, Cardiac, Skeletal, Striated`,
  `question: The main function of red blood cells is to:
Carry oxygen, Fight infection, Clot blood, Digest nutrients`,
  `question: What is the fluid-filled sac surrounding the heart called?
Pericardium, Endocardium, Myocardium, Epicardium`,
  `question: Which blood vessels carry blood away from the heart?
Arteries, Veins, Capillaries, Venules`,
  `question: A condition in which the blood pH is above 7.45 is called:
Alkalosis, Acidosis, Homeostasis, Metabolism`,
  `question: When a patient is lying face down, it is called the _____ position.
Prone, Supine, Anatomical, Lateral`,
  `question: In the anatomical position, the palms are facing:
Forward, Backward, Inward, Downard`,
  `question: Which layer of the skin contains blood vessels and nerves?
Dermis, Epidermis, Subcutaneous layer, Stratum corneum`,
  `question: What is the outermost layer of the skin called?
Epidermis, Dermis, Subcutaneous layer, Stratum germinativum`,
  `question: Which type of tissue covers and protects the body?
Epithelial tissue, Connective tissue, Muscle tissue, Nerve tissue`,
  `question: What is the function of ribosomes?
Assembles proteins from amino acids, Digest substances within the cell, Stores and moves substances in or out of the cell, Packages nutrients to send to other parts of the cell or body`,
  `question: Which cell component is responsible for energy production?
Mitochondria, Lysosomes, Golgi apparatus, Endoplasmic reticulum`,
  `question: The heart and lungs are located in the:
Thoracic cavity, Abdominal cavity, Pelvic cavity, Dorsal cavity`,
  `question: Which cavity houses the brain?
Cranial cavity, Thoracic cavity, Abdominal cavity, Spinal cavity`,
  `question: Which term refers to being closer to the midline of the body?
Medial, Lateral, Distal, Proximal`,
  `question: What is the opposite of "anterior"?
Posterior, Superior, Inferior, Medial`,
  `question: Which plane divides the body horizontally?
Transverse plane, Coronal plane, Sagittal plane, Midsagittal plane`,
  `question: The Midsagittal plane divides the body into:
Equally right and left, Front and back, Upper and lower, Right and left`,
  `question: The abbreviation "IU" can be mistaken for:
IV, UTI, IM, ID`,
  `question: According to The Joint Commission, it is acceptable to use a trailing zero in:
Hand written Laboratory reports, Written medication orders, Electronic medication orders, Electronic Laboratory notes`,
  `question: What is the normal blood pH range?
7.35 to 7.45, 8.45 to 8.55, 7.25 to 7.35, 8.45 to 8.55`,
  `question: what is the meaning of the abbreviation FBS?
fasting blood sugar, full back surgery, falling blood sugar, free bill staging`,
  `question: What does the suffix -lysis mean?
Destruction, Open, Close, Heal`,
  `question: what is the meaning of the root viscer?
Organ, Heart, Wound, Eye`,
  `question: what is the two systems of the Nervous system?
PNS and CNS, Somatic and Automatic, Semiantic and Voluntary, SPB and CBS`
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