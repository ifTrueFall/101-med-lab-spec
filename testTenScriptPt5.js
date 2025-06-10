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
  `question: What are the two major forms of acute liver disease?
Acute hepatitis and cholestasis, Chronic hepatitis and cirrhosis, Cirrhosis and hepatic tumors, Fatty liver and alcoholic hepatitis`,
  `question: What are the long-term complications of chronic liver injury?
Cirrhosis and hepatocellular carcinoma (HCC), Acute liver failure and jaundice, Gallstones and pancreatitis, Portal hypertension and ascites`,
  `question: In most forms of acute hepatitis what is the typical relationship between ALT and AST?
ALT is typically higher than AST, AST is typically higher than ALT, Both are equally elevated, Both are within normal limits`,
  `question: What is the most important prognostic marker in acute liver disease?
Prothrombin Time (PT), Alanine Aminotransferase (ALT), Alkaline Phosphatase (ALP), Gamma-Glutamyl Transferase (GGT)`,
  `question: An increase in AST activity that is more than two times the ALT activity is characteristic of what condition?
Acute alcoholic hepatitis, Acute viral hepatitis, Toxic hepatitis, Ischemic hepatitis`,
  `question: Which combination of tests helps to differentiate hepatocellular disease from cholestatic disease?
AST ALT ALP and GGT, PT and Albumin, Bilirubin and AFP, Complete Blood Count`,
  `question: Direct injury to hepatocytes such as from acetaminophen results in what pattern of enzyme release?
A rapid rise and fall of ALT and AST, A gradual rise and plateau of ALT and AST, A sharp increase in ALP only, A slow increase in GGT`,
  `question: What is the most common cause of acute viral hepatitis in North America?
Hepatitis A Virus (HAV), Hepatitis B Virus (HBV), Hepatitis C Virus (HCV), Cytomegalovirus (CMV)`,
  `question: What is the best laboratory test to diagnose an acute Hepatitis A infection?
IgM antibody (anti-HAV IgM), Total antibody to HAV, Hepatitis A viral load, Liver biopsy`,
  `question: Which form of hepatitis does not have a chronic form?
Hepatitis A, Hepatitis B, Hepatitis C, Hepatitis D`,
  `question: Chronic hepatitis is characterized by inflammatory damage to hepatocytes lasting longer than how many months?
6 months, 3 months, 12 months, 1 month`,
  `question: What are the three most common causes of chronic hepatitis?
HBV HCV and NASH, HAV alcohol and drugs, AIH Wilson disease and Hemochromatosis, HBV HAV and HCV`,
  `question: Which laboratory marker is used to detect a current Hepatitis B infection?
HBsAg, Anti-HBs, Anti-HBc IgM, Anti-HBe`,
  `question: The presence of which antibody is considered evidence of immunity to hepatitis B?
Antibody to the hepatitis B surface antigen (anti-HBs), Antibody to the hepatitis B core antigen (anti-HBc), IgM anti-HBc, HBeAg`,
  `question: What is the most common chronic viral infection worldwide?
Hepatitis B Virus (HBV), Hepatitis C Virus (HCV), Hepatitis A Virus (HAV), Human Immunodeficiency Virus (HIV)`,
  `question: What is the first laboratory abnormality to appear in toxic hepatitis?
An increase in PT, An increase in ALT, A decrease in albumin, An increase in bilirubin`,
  `question: Which drug is most commonly linked to drug-induced liver injury (DILI) in North America and Europe?
Acetaminophen, Ibuprofen, Aspirin, Prednisone`,
  `question: Chronic HCV infection is defined by the persistent presence of what for more than 6 months?
HCV RNA, Anti-HCV antibody, Elevated ALT, Jaundice`,
  `question: What is the principal screening test for exposure to Hepatitis C?
Measurement of the antibody to HCV (anti-HCV), HCV RNA detection, HCV genotyping, Liver biopsy`,
  `question: For accurate measurement of HCV RNA what is the preferred specimen type?
EDTA plasma, Serum, Whole blood, Urine`,
  `question: What condition is associated with liver fat accumulation in patients with minimal to no alcohol intake?
Nonalcoholic fatty liver disease (NAFLD), Alcoholic liver disease, Autoimmune hepatitis, Wilson disease`,
  `question: What is the anatomical definition of cirrhosis?
Diffuse fibrosis with nodular regeneration, Acute inflammation of hepatocytes, Obstruction of bile flow, Accumulation of fat in the liver`,
  `question: Which of the following is one of the earliest laboratory abnormalities in a patient developing cirrhosis?
A fall in platelet count, An increase in serum albumin, A decrease in PT, A normal AST/ALT ratio`,
  `question: An AST/ALT activity ratio greater than 1 is an early laboratory finding for what condition?
Cirrhosis, Acute viral hepatitis, Cholestasis, Toxic hepatitis`,
  `question: What are the primary laboratory indicators of cholestasis?
Increased ALP and GGT, Increased AST and ALT, Decreased serum albumin, Prolonged bilirubin clearance`,
  `question: The measurement of serum albumin is useful in assessing what aspects of liver disease?
Chronicity and severity, The specific type of virus, The degree of bile duct obstruction, The presence of tumors`,
  `question: If an adult patient has an elevated ALP how can you confirm it is of hepatobiliary origin?
By measuring GGT, By measuring AST, By checking the PT, By testing for viral markers`,
  `question: What is the most widely used plasma tumor marker for screening high-risk individuals for HCC?
Alpha fetoprotein (AFP), Carcinoembryonic antigen (CEA), Prostate-specific antigen (PSA), Cancer antigen 125 (CA-125)`,
  `question: In acute viral or alcoholic hepatitis a PT greater than how many seconds is associated with a poor prognosis?
15 seconds, 10 seconds, 20 seconds, 12 seconds`,
  `question: A persistent elevation of PT for more than 4 days after an acetaminophen ingestion indicates a high risk for what?
Liver failure, Chronic hepatitis, Cirrhosis, Cholestasis`,
  `question: The clinical form of chronic liver injury is generally what?
Chronic hepatitis, Acute hepatitis, Cholestasis, Ischemic hepatitis`,
  `question: Immunologically mediated or indirect liver injury is seen with what agents?
Hepatitis viruses and ethanol, Acetaminophen and ischemia, Toxins and chemicals, Iron and copper`,
  `question: What is the typical enzyme pattern in indirect liver injury?
A gradual rise plateau and gradual resolution, A rapid rise and rapid fall, An isolated increase in ALP, A sharp spike in GGT only`,
  `question: Although a key clinical finding jaundice is often absent in what condition?
Acute hepatitis, End-stage cirrhosis, Biliary obstruction, Hemolytic anemia`,
  `question: Hepatitis A epidemics have been associated with what type of contamination?
Waterborne and food-borne, Bloodborne, Sexual contact, Vertical transmission`,
  `question: In adults what percentage with acute HAV infection develop jaundice?
70%, 10%, 90%, 50%`,
  `question: In chronic hepatitis ALT activity is strongly correlated with what?
Necroinflammatory activity, The degree of fibrosis, The risk of jaundice, The patient's symptoms`,
  `question: "Recovery" from a natural HBV infection is associated with the loss of HBsAg and the appearance of what?
Anti-HBs and anti-HBc, Only anti-HBs, Only anti-HBc, HBeAg`,
  `question: The measurement of plasma HBeAg has been used to establish what?
If a patient is infectious, If a patient has immunity, The presence of liver cancer, The degree of liver fibrosis`,
  `question: One of the primary goals of chronic HBV treatment is the normalization of which enzyme?
ALT, AST, ALP, GGT`,
  `question: What is a major risk factor for HCV infection?
Injection drug use, Food contamination, Alcohol consumption, Obesity`,
  `question: An inherited liver disease characterized by iron overload is called what?
Hemochromatosis, Wilson disease, Alpha1-antitrypsin deficiency, Gilbert syndrome`,
  `question: Which autoimmune liver disease most commonly occurs in young to middle-aged women?
Autoimmune hepatitis (AIH), Primary sclerosing cholangitis (PSC), Primary biliary cirrhosis (PBC), Alcoholic hepatitis`,
  `question: Primary biliary cirrhosis (PBC) is an autoimmune disorder that targets what?
Intrahepatic bile ducts, Hepatocytes, The portal vein, Extrahepatic bile ducts`,
  `question: Primary sclerosing cholangitis (PSC) is a chronic inflammatory disease that occurs primarily in what demographic?
Males, Females, Children, Elderly adults`,
  `question: A prolonged PT in a patient with cholestasis can often be corrected by the administration of what?
Parenteral vitamin K, Fresh frozen plasma, Albumin infusion, Saline`,
  `question: In what stage of cirrhosis might a patient have no signs or symptoms of liver damage?
Compensated cirrhosis, Decompensated cirrhosis, End-stage cirrhosis, Acute cirrhosis`,
  `question: What is the 10-year survival rate once a patient's cirrhosis decompensates?
About 20%, About 90%, About 50%, About 5%`,
  `question: If a patient has elevated aminotransferases and the ALT activity is greater than the AST what is the likely source?
The liver, The heart, Skeletal muscle, The kidneys`,
  `question: Cirrhosis is typically present in patients who develop what primary liver tumor?
Hepatocellular carcinoma (HCC), Cholangiocarcinoma, Hepatic adenoma, Hemangioma`,
  `question: What is the utility of measuring GGT?
Diagnosis of cholestasis and evaluation of alcoholic liver damage, Assessing severity of cirrhosis, Differentiating viral from toxic hepatitis, Screening for liver cancer`,
  `question: What test is more reliable than albumin for determining synthetic liver function?
Prothrombin Time (PT), Total bilirubin, AST/ALT ratio, Platelet count`,
  `question: What is the primary treatment for alcoholic liver disease?
Abstinence from alcohol, Liver transplant, Antiviral medication, Immunosuppressive therapy`,
  `question: What is the major treatment for Nonalcoholic fatty liver disease (NAFLD)?
Weight loss, Antiviral drugs, Vitamin K supplements, A high-protein diet`,
  `question: A decrease in the albumin to globulin concentration ratio to less than 1 is an early laboratory sign for what condition?
Cirrhosis, Acute Hepatitis, Chronic Hepatitis, Cholestasis`,
  `question: If serum is used for HCV RNA testing what step is critical for accuracy?
Rapid separation of serum from clot, Protecting the specimen from light, Adding a preservative, Freezing the sample immediately`,
  `question: Which inherited liver disease is caused by the deposition of copper in tissues?
Wilson disease, Hemochromatosis, Alpha1-antitrypsin deficiency, Crigler-Najjar syndrome`,
  `question: Which disease is typically preceded by ulcerative colitis in 80% of patients?
Primary sclerosing cholangitis (PSC), Primary biliary cirrhosis (PBC), Autoimmune hepatitis (AIH), Ischemic hepatitis`,
  `question: What is the major cause of death in individuals with PSC?
Cholangiocarcinoma, Liver failure, Variceal bleeding, Sepsis`
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