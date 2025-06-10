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
 `question: What are the two major acute liver diseases?
Acute hepatitis and cholestasis, Chronic hepatitis and cirrhosis, Cirrhosis and hepatocellular carcinoma, Acute hepatitis and chronic hepatitis`,
 `question: What are the long-term complications of chronic liver injury?
Cirrhosis and hepatocellular carcinoma (HCC), Acute hepatitis and cholestasis, Jaundice and ascites, Liver failure and portal hypertension`,
 `question: What type of injury occurs with certain drugs like acetaminophen or with ischemia?
Direct injury, Indirect injury, Immunologically mediated injury, Viral-mediated injury`,
 `question: What type of liver injury is immunologically mediated and occurs with hepatitis viruses and most drugs?
Indirect injury, Direct injury, Toxic injury, Ischemic injury`,
 `question: In most forms of acute hepatitis which enzyme is typically higher than the other?
ALT is typically higher than AST, AST is typically higher than ALT, ALP is typically higher than ALT, GGT is typically higher than AST`,
 `question: What is an important predictor of acute liver failure?
Impaired synthetic function, Elevated ALT levels, The presence of jaundice, Mildly elevated ALP`,
 `question: In acute viral or alcoholic hepatitis a PT more than how many seconds is associated with a poor prognosis?
15 seconds, 10 seconds, 20 seconds, 25 seconds`,
 `question: Persistent elevation of PT for more than how many days after acetaminophen ingestion indicates a high risk for liver failure?
4 days, 2 days, 6 days, 8 days`,
 `question: What is the most common cause of acute viral hepatitis in North America?
Hepatitis A Virus (HAV), Hepatitis B Virus (HBV), Hepatitis C Virus (HCV), Cytomegalovirus (CMV)`,
 `question: What is the best test to diagnose acute HAV infection?
IgM antibody (anti-HAV IgM), Total antibody to HAV, Hepatitis A viral load, Liver biopsy`,
 `question: How long is chronic hepatitis characterized by continuing inflammatory damage to hepatocytes?
>6 months, <6 months, >1 year, <1 year`,
 `question: What are the most common causes of chronic hepatitis?
Hepatitis B virus (HBV) Hepatitis C virus (HCV) and NASH, Hepatitis A virus (HAV) and alcohol, Autoimmune hepatitis and drugs, Wilson disease and hemochromatosis`,
 `question: What is the first serological marker to appear in an HBV infection?
HBsAg, Anti-HBc, Anti-HBs, HBeAg`,
 `question: Which antibody is considered evidence of immunity to hepatitis B?
Antibody to the hepatitis B surface antigen (anti-HBs), Antibody to the hepatitis B core antigen (anti-HBc), IgM anti-HBc, Antibody to the hepatitis B e-antigen (anti-HBe)`,
 `question: Chronic HBV infection is identified by the persistence of what marker?
HBsAg, Anti-HBs, IgM anti-HBc, HBV DNA`,
 `question: The primary goals of chronic HBV treatment include suppression of viral replication and what else?
Improvement in the degree of liver injury, Eradication of the virus, Development of anti-HBs, Clearance of HBeAg`,
 `question: What is the most common chronic viral infection worldwide?
Hepatitis B Virus (HBV), Hepatitis C Virus (HCV), Hepatitis A Virus (HAV), Human Immunodeficiency Virus (HIV)`,
 `question: What is the most common cause of chronic hepatitis in North America Europe and Japan?
Hepatitis C Virus (HCV), Hepatitis B Virus (HBV), Nonalcoholic Steatohepatitis (NASH), Alcoholic Liver Disease`,
 `question: What is the principal screening test for HCV exposure?
Measurement of the antibody to HCV (anti-HCV), HCV RNA, HCV genotype, Liver biopsy`,
 `question: In toxic hepatitis what is the first laboratory abnormality to appear?
An increase in PT, Increased activities of cytosolic enzymes, Increased bilirubin, Decreased albumin`,
 `question: In North America and Europe what is the most commonly linked drug to drug-induced liver injury (DILI)?
Acetaminophen, Ibuprofen, Aspirin, Ethanol`,
 `question: What is the defining characteristic of Nonalcoholic fatty liver disease (NAFLD) and Nonalcoholic Steatohepatitis (NASH)?
Liver fat accumulation with minimal to no alcohol intake, Inflammation caused by excessive alcohol intake, Autoimmune destruction of hepatocytes, Viral-induced liver damage`,
 `question: In acute alcoholic hepatitis which enzyme activity is typically more than two times that of the other?
AST activity is typically more than two times that of ALT, ALT activity is typically more than two times that of AST, GGT activity is typically more than two times that of ALP, ALP activity is typically more than two times that of GGT`,
 `question: What is the anatomical definition of cirrhosis?
Diffuse fibrosis with nodular regeneration, Acute inflammation of hepatocytes, Obstruction of bile flow, Accumulation of fat in the liver`,
 `question: What are the earliest laboratory abnormalities in cirrhosis?
Fall in platelet count and increase in PT, Increase in ALT and AST, Increase in ALP and GGT, Decrease in albumin and bilirubin`,
 `question: An increase in the AST/ALT activity ratio to greater than 1 is an early laboratory abnormality for what condition?
Cirrhosis, Acute hepatitis, Cholestasis, Toxic hepatitis`,
 `question: What is the most important prognostic marker in acute liver disease?
Prothrombin Time (PT), Serum Albumin, Plasma Bilirubin, Alanine Aminotransferase (ALT)`,
 `question: Which tests are used to differentiate hepatocellular disease from cholestatic disease?
AST ALT ALP and GGT, Albumin and PT, Bilirubin and AFP, Platelet count and globulin`,
 `question: A decrease in the albumin to globulin concentration ratio to less than 1 is an early laboratory abnormality for what condition?
Cirrhosis, Acute Hepatitis, Chronic Hepatitis, Cholestasis`
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