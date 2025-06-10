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
  `question: What is the most specific clinical manifestation of hepatic dysfunction?
Jaundice, Portal hypertension, Disordered hemostasis, Enzyme release`,
  `question: What substance is used as an accelerator in the Malloy-Evelyn method for bilirubin?
Methanol, Sodium benzoate-caffeine, Ascorbic acid, Alkaline titrate`,
  `question: In the Jendrassik-Grof method what is the final color of the azobilirubin product measured?
Blue, Red-purple, Green, Yellow`,
  `question: The yellow appearance of the skin mucous membranes and sclera is known as what?
Icterus, Ascites, Varices, Peritonitis`,
  `question: What is the most common cause of sinusoidal portal hypertension?
Cirrhosis, Portal vein thrombosis, Hepatic vein occlusion, Congestive heart failure`,
  `question: A serum-ascites albumin gradient (SAAG) greater than what value is diagnostic of ascites due to portal hypertension?
1.1 g/dL, 0.5 g/dL, 2.0 g/dL, 1.5 g/dL`,
  `question: What is the most commonly used accelerator in the Jendrassik-Grof method?
Sodium benzoate-caffeine reagent, Methanol, Diazotized sulfanilic acid, Ascorbic acid`,
  `question: In the Malloy-Evelyn method the reaction is typically performed at what pH?
1.2, 7.4, 5.0, 9.8`,
  `question: Which condition is defined as the accumulation of fluid in the abdominal cavity and is a common finding in portal hypertension?
Ascites, Varices, Jaundice, Hepatorenal syndrome`,
  `question: A normal plasma ammonia concentration is helpful in excluding what condition as a cause of cerebral dysfunction?
Hepatic encephalopathy, Hepatorenal syndrome, Spontaneous bacterial peritonitis, Acute viral hepatitis`,
  `question: Which two enzymes are considered the most specific markers for liver injury based on tissue distribution?
ALT and GGT, AST and LD, ALP and AST, LD and GGT`,
  `question: A patient with impaired bilirubin clearance might present with what color stools?
Acholic or gray-colored, Dark brown, Black and tarry, Bright red`,
  `question: For accurate bilirubin testing a serum or plasma specimen must be protected from what?
Light, Heat, Freezing, Agitation`,
  `question: Which of the following are cytosolic enzymes released with cell injury?
AST ALT and LD, ALP and GGT, GGT and LD, ALP and AST`,
  `question: What is the most life-threatening consequence of portosystemic shunting?
Development of varices, Ascites, Jaundice, Hepatic encephalopathy`,
  `question: The Malloy-Evelyn method produces a red-purple color with a maximal absorption at what wavelength?
560nm, 600nm, 450nm, 540nm`,
  `question: Which form of Hepatorenal Syndrome (HRS) is characterized by a rapidly declining renal function?
Type 1 HRS, Type 2 HRS, Chronic HRS, Acute HRS`,
  `question: Why is disordered hemostasis a common clinical manifestation of liver disease?
Numerous coagulation factors are manufactured by the liver, Platelet production is increased by the liver, The liver clears anticoagulants from the blood, Red blood cell synthesis occurs in the liver`,
  `question: The Jendrassik-Grof method measures the absorbance of blue azobilirubin at what wavelength?
600nm, 560nm, 455nm, 575nm`,
  `question: ALP and GGT are what type of enzymes found on the canalicular membrane of hepatocytes?
Membrane-bound glycoprotein enzymes, Cytosolic enzymes, Mitochondrial isoenzymes, Nuclear enzymes`,
  `question: Patients with ascites are predisposed to what life-threatening condition?
Spontaneous bacterial peritonitis, Variceal bleeding, Hepatorenal syndrome, Acute liver failure`,
  `question: The accumulation of what substance due to impaired metabolic function can lead to hepatic encephalopathy?
Ammonia, Bilirubin, Albumin, Glucose`,
  `question: How long is a separated serum specimen for bilirubin testing stable if stored in the dark at 4 degrees Celsius?
1 week, 2 days, 24 hours, Indefinitely`,
  `question: What is the term for enlarged and tortuous veins that develop as a consequence of portosystemic shunting?
Varices, Ascites, Shunts, Stenoses`,
  `question: Which pattern of aminotransferases is commonly seen in patients with cirrhosis or alcohol abuse?
Lower ALT than AST, Higher ALT than AST, Equal ALT and AST levels, Normal ALT and AST levels`,
  `question: The diazo reagent in bilirubin methods reacts at which part of the bilirubin molecule?
The central methylene carbon, The outer vinyl group, The propionic acid side chain, The pyrrole nitrogen`,
  `question: What is the typical color of urine in a patient with increased water-soluble conjugated bilirubin?
Tea-colored, Pale yellow, Bright red, Colorless`,
  `question: What is the simplest mechanism that allows leakage of cytoplasmic enzymes from hepatocytes?
Cell injury, Increased synthesis, Membrane fragmentation, Apoptosis`,
  `question: What is used to distinguish the pattern of liver injury?
The aminotransferases and ALP, Prothrombin Time and Albumin, Bilirubin and GGT, LD and AST`,
  `question: In acute liver injury what test can be used to determine the severity of the damage?
Prothrombin Time (PT), Serum albumin, Complete blood count, Serum electrolytes`,
  `question: What is the most common cause of presinusoidal portal hypertension?
Portal vein thrombosis or schistosomiasis, Cirrhosis, Budd-Chiari syndrome, Congestive heart failure`,
  `question: What is the half-life of ALT in plasma?
24-48 hours, 16-18 hours, 4.1 days, 1 to 10 days`,
  `question: What kind of specimen is preferred for bilirubin testing?
Non-hemolyzed serum, Whole blood, Heparinized plasma, Urine`,
  `question: What term describes accelerated programmed cell death where the cell participates in its own demise?
Apoptosis, Necrosis, Lysis, Fibrosis`,
  `question: Most forms of acute and chronic hepatitis are associated with which type of cell death?
Apoptosis, Necrosis, Ischemic injury, Toxic injury`,
  `question: Which of the following is NOT listed as one of the four major conditions indicative of liver disease?
Anemia, Jaundice, Portal hypertension, Disordered hemostasis`,
  `question: What is the most common form of Hepatorenal Syndrome (HRS)?
Type 2 HRS, Type 1 HRS, Classic HRS, Acute HRS`,
  `question: A diagnosis of spontaneous bacterial peritonitis is established by examination of what?
The ascitic fluid, The blood, The urine, A liver biopsy`,
  `question: What is the half-life of cytosolic AST in plasma?
16-18 hours, 24-48 hours, 4.1 days, 7 days`,
  `question: Which type of cellular death is referred to as "cell murder" and results from an injurious environment?
Necrosis, Apoptosis, Fibrosis, Phagocytosis`,
  `question: The longer half-life of ALT leads to what typical finding in most forms of hepatocellular injury?
Higher activities of ALT than AST, Lower activities of ALT than AST, Equal activities of ALT and AST, Undetectable ALT levels`,
  `question: What is a key factor in all cases of HRS that develop in chronic liver disease?
Portal hypertension, Acute viral infection, High blood pressure, Autoimmune response`,
  `question: Impaired synthetic functions in portal hypertension result in decreased concentrations of what?
Most plasma proteins and clotting factors, Red blood cells, Bile acids, Ammonia`,
  `question: What important cause of postsinusoidal hypertension involves hepatic vein occlusion?
Budd-Chiari syndrome, Cirrhosis, Schistosomiasis, Portal vein thrombosis`,
  `question: In the Jendrassik-Grof method what is added to the specimen before the diazotized sulfanilic acid?
Sodium benzoate-caffeine reagent, Methanol, Ascorbic acid, Saline`,
  `question: Besides the skin and sclera where else does the yellow appearance of jaundice manifest?
Mucous membranes, Hair follicles, Fingernails, Teeth`,
  `question: Jaundice may occur with bilirubin overproduction from what condition?
Hemolysis, Dehydration, Malnutrition, Infection`,
  `question: What is the name for the physiological jaundice that can occur in neonates due to short-term liver immaturity?
Physiological jaundice, Pathological jaundice, Hemolytic jaundice, Obstructive jaundice`,
  `question: In chronic liver injury prognosis is related to the degree of impairment in liver function such as what?
Increased bilirubin and prolonged PT, Decreased AST and ALT, Normal albumin and platelets, Increased GGT only`,
  `question: Cellular injury from compounds like aspirin or acetaminophen occurs for the most part by what process?
Necrosis, Apoptosis, Fibrosis, Inflammation`,
  `question: The pattern and degree of what varies with the type of liver disease?
Enzyme activity elevation, Serum albumin concentration, Blood glucose levels, Red blood cell count`,
  `question: What is the most common location for varices to occur?
The esophagus and stomach, The small intestine, The colon, The rectum`,
  `question: The diagnosis for spontaneous bacterial peritonitis typically involves finding what type of bacteria in the ascitic fluid?
Gram negative, Gram positive, Acid-fast, Spirochetes`,
  `question: How long is a separated plasma specimen for bilirubin stable if stored at -20 degrees Celsius?
Indefinitely, 1 week, 2 days, 1 month`,
  `question: Which factors govern the ability of liver enzymes to assist in diagnosis?
Tissue specificity and subcellular distribution, Color and turbidity of the sample, Patient age and gender, Time of day of the blood draw`,
  `question: In the Jendrassik-Grof method the addition of what substances results in the final blue color?
Ascorbic acid and alkaline titrate, Methanol and diazo reagent, Sodium benzoate and caffeine, Saline and sulfanilic acid`,
  `question: Impaired liver function can lead to patients being predisposed to what two opposing conditions?
Excessive bleeding and to venous thrombosis, Hypoglycemia and hyperglycemia, Dehydration and fluid overload, Anemia and polycythemia`,
  `question: How is the serum-ascites albumin gradient (SAAG) calculated?
The difference in albumin between plasma and ascitic fluid, The sum of albumin in plasma and ascitic fluid, The ratio of albumin to globulin in plasma, The product of albumin and bilirubin levels`,
  `question: Which of these enzymes is only occasionally used in liver panels because it is nonspecific?
Lactate dehydrogenase (LD), Alanine aminotransferase (ALT), Aspartate aminotransferase (AST), Alkaline phosphatase (ALP)`
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