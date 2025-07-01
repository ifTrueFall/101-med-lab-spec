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
`question: A patient's CBC shows an MCV of 72 fL. This value indicates the patient's red blood cells are:
Microcytic, Normocytic, Macrocytic, Hypochromic`,
`question: A patient's CBC shows an MCV of 95 fL. This value indicates the patient's red blood cells are:
Normocytic, Microcytic, Macrocytic, Normochromic`,
`question: A patient's CBC shows an MCV of 110 fL. This value indicates the patient's red blood cells are:
Macrocytic, Normocytic, Microcytic, Hypochromic`,
`question: A patient's CBC shows an MCV of 68 fL. How would you classify the red blood cell size?
Microcytic, Normocytic, Macrocytic, Hyperchromic`,
`question: A patient's CBC shows an MCV of 88 fL. How would you classify the red blood cell size?
Normocytic, Microcytic, Macrocytic, Hypochromic`,
`question: A patient's CBC shows an MCV of 121 fL. How would you classify the red blood cell size?
Macrocytic, Microcytic, Normocytic, Normochromic`,
`question: A patient's CBC shows an MCV of 79 fL. This value is below the reference range indicating the cells are:
Microcytic, Normocytic, Macrocytic, Polychromic`,
`question: A patient's CBC shows an MCV of 100 fL. This value is within the reference range indicating the cells are:
Normocytic, Microcytic, Macrocytic, Hypochromic`,
`question: A patient's CBC shows an MCV of 103 fL. This value is above the reference range indicating the cells are:
Macrocytic, Normocytic, Microcytic, Normochromic`,
`question: A patient's CBC shows an MCV of 80 fL. How would you classify the red blood cell size?
Normocytic, Microcytic, Macrocytic, Hypochromic`,
`question: A patient's CBC shows an MCHC of 30%. This value indicates the patient's red blood cells are:
Hypochromic, Normochromic, Hyperchromic, Microcytic`,
`question: A patient's CBC shows an MCHC of 34%. This value indicates the patient's red blood cells are:
Normochromic, Hypochromic, Hyperchromic, Macrocytic`,
`question: A patient's CBC shows an MCHC of 28%. How would you classify the red blood cell hemoglobin content?
Hypochromic, Normochromic, Hyperchromic, Normocytic`,
`question: A patient's CBC shows an MCHC of 36%. How would you classify the red blood cell hemoglobin content?
Normochromic, Hypochromic, Hyperchromic, Microcytic`,
`question: A patient's CBC shows an MCHC of 37%. This value is above the reference range suggesting the cells could be:
Hyperchromic, Hypochromic, Normochromic, Macrocytic`,
`question: A patient's CBC shows an MCHC of 32%. How would you classify the red blood cell hemoglobin content?
Normochromic, Hypochromic, Hyperchromic, Microcytic`,
`question: A patient's CBC shows an MCHC of 25%. This value indicates the patient's red blood cells are:
Hypochromic, Normochromic, Hyperchromic, Normocytic`,
`question: A patient's CBC shows an MCHC of 33%. This value indicates the patient's red blood cells are:
Normochromic, Hypochromic, Hyperchromic, Microcytic`,
`question: A patient's CBC shows an MCHC of 38%. This elevated value suggests the red blood cells are:
Hyperchromic, Hypochromic, Normochromic, Macrocytic`,
`question: A patient's CBC shows an MCHC of 31%. This value is below the reference range suggesting the cells are:
Hypochromic, Normochromic, Hyperchromic, Normocytic`,
`question: A patient has an MCV of 75 fL and an MCHC of 28%. What is the RBC morphology?
Microcytic Hypochromic, Normocytic Normochromic, Macrocytic Normochromic, Normocytic Hypochromic`,
`question: A patient has an MCV of 90 fL and an MCHC of 33%. What is the RBC morphology?
Normocytic Normochromic, Microcytic Hypochromic, Macrocytic Normochromic, Normocytic Hypochromic`,
`question: A patient has an MCV of 115 fL and an MCHC of 34%. What is the RBC morphology?
Macrocytic Normochromic, Normocytic Normochromic, Microcytic Hypochromic, Macrocytic Hyperchromic`,
`question: A patient has an MCV of 69 fL and an MCHC of 26%. How would you classify the RBC morphology?
Microcytic Hypochromic, Normocytic Hypochromic, Macrocytic Hypochromic, Microcytic Normochromic`,
`question: A patient has an MCV of 85 fL and an MCHC of 35%. How would you classify the RBC morphology?
Normocytic Normochromic, Microcytic Normochromic, Macrocytic Normochromic, Normocytic Hyperchromic`,
`question: A patient has an MCV of 108 fL and an MCHC of 38%. How would you classify the RBC morphology?
Macrocytic Hyperchromic, Normocytic Normochromic, Macrocytic Normochromic, Microcytic Hyperchromic`,
`question: A patient has an MCV of 78 fL and an MCHC of 30%. What is the RBC morphology?
Microcytic Hypochromic, Normocytic Normochromic, Macrocytic Hypochromic, Microcytic Normochromic`,
`question: A patient has an MCV of 99 fL and an MCHC of 32%. What is the RBC morphology?
Normocytic Normochromic, Microcytic Normochromic, Macrocytic Normochromic, Normocytic Hypochromic`,
`question: A patient has an MCV of 105 fL and an MCHC of 33%. What is the RBC morphology?
Macrocytic Normochromic, Normocytic Normochromic, Microcytic Normochromic, Macrocytic Hyperchromic`,
`question: A patient has an MCV of 93 fL and an MCHC of 29%. What is the RBC morphology?
Normocytic Hypochromic, Normocytic Normochromic, Microcytic Hypochromic, Macrocytic Hypochromic`
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