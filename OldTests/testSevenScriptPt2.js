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
  `question: Which hormone is primarily responsible for lowering blood glucose levels by promoting glucose entry into cells?
Insulin, Glucagon, Cortisol, Epinephrine`,

  `question: Which hormone is primarily responsible for increasing blood glucose levels by stimulating glycogenolysis and gluconeogenesis?
Glucagon, Insulin, Aldosterone, Somatostatin`,

  `question: Insulin is synthesized by which cells in the pancreas?
Beta cells of islets of Langerhans, Alpha cells of islets of Langerhans, Delta cells of islets of Langerhans, Acinar cells`,

  `question: Glucagon is synthesized by which cells in the pancreas?
Alpha cells of islets of Langerhans, Beta cells of islets of Langerhans, Gamma cells of islets of Langerhans, F cells`,

  `question: When are insulin levels normally increased?
When blood glucose levels are high, When blood glucose levels are low, During fasting, During strenuous exercise`,

  `question: When are glucagon levels normally increased?
When blood glucose levels are low (hypoglycemia), When blood glucose levels are high (hyperglycemia), Immediately after a meal, During sleep`,

  `question: What effect does insulin have on glycogen synthesis in the liver?
Promotes glycogen synthesis and storage, Inhibits glycogen synthesis, Converts glycogen to glucose, Has no effect on glycogen`,

  `question: What effect does glucagon have on glycogenolysis in the liver?
Increases glycogenolysis, Decreases glycogenolysis, Promotes glycogen synthesis, No direct effect`,

  `question: Epinephrine is produced by the adrenal medulla and generally has what effect on plasma glucose?
Increases plasma glucose, Decreases plasma glucose, Stabilizes plasma glucose, No effect on plasma glucose`,

  `question: How does epinephrine increase plasma glucose levels regarding insulin secretion?
By inhibiting insulin secretion, By stimulating insulin secretion, By mimicking insulin action, By binding to insulin receptors`,

  `question: Cortisol is released from the adrenal cortex and has what general effect on plasma glucose?
Increases plasma glucose, Decreases plasma glucose, Maintains constant plasma glucose, Initially lowers then raises plasma glucose`,

  `question: How does cortisol affect gluconeogenesis?
Increases gluconeogenesis, Decreases gluconeogenesis, Has no effect on gluconeogenesis, Inhibits glucose formation from all sources`,

  `question: Growth hormone released by the anterior pituitary gland has what effect on plasma glucose?
Increases plasma glucose, Decreases plasma glucose, No significant effect on plasma glucose, Only affects glucose in children`,

  `question: How does growth hormone affect the entry of glucose into cells?
Decreases the entry of glucose into cells, Increases the entry of glucose into cells, Facilitates glucose transport equally, No effect on glucose entry`,

  `question: Somatostatin is produced by the delta-cells of the islets of Langerhans and the hypothalamus. What is its role if blood glucose levels are low?
Inhibits the release of insulin, Stimulates the release of insulin, Stimulates the release of glucagon, Directly raises blood glucose`,

  `question: If blood glucose levels are high what action does somatostatin take regarding glucagon?
Inhibits the release of glucagon, Stimulates the release of glucagon, Enhances glucagons effect, Has no effect on glucagon`,

  `question: Which is the only hormone listed that primarily decreases blood glucose levels?
Insulin, Glucagon, Epinephrine, Cortisol`,

  `question: Glucagon can be referred to as what type of agent due to its effect on blood glucose?
A hyperglycemic agent, A hypoglycemic agent, An anti-diabetic agent, A glucose-neutral agent`,

  `question: Insulin can be referred to as what type of agent due to its effect on blood glucose?
A hypoglycemic agent, A hyperglycemic agent, A diabetogenic agent, A gluconeogenic agent`,

  `question: Which two hormones produced by the pancreas have opposing actions in controlling blood glucose?
Insulin and Glucagon, Amylin and Somatostatin, Insulin and Somatostatin, Glucagon and Pancreatic Polypeptide`
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