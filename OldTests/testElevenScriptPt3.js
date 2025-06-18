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
  `question: Page 172, Describe analytical methods of renal function testing and monitoring during treatment.
The three major waste products managed by the kidneys are urea creatinine and uric acid, The three major waste products are glucose ketones and protein, The three major waste products are sodium potassium and chloride, The three major waste products are ammonia bilirubin and myoglobin`,
  `question: Page 172, Describe analytical methods of renal function testing and monitoring during treatment.
Urea is formed in the liver from the deamination of amino acids, Urea is formed in the kidneys from protein breakdown, Urea is a direct byproduct of muscle contraction, Urea is a waste product of purine metabolism`,
  `question: Page 172, Describe analytical methods of renal function testing and monitoring during treatment.
The kidney is the only significant route of excretion for urea, The liver is the only significant route of excretion for urea, The skin is the only significant route of excretion for urea, The lungs are the only significant route of excretion for urea`,
  `question: Page 172, Describe analytical methods of renal function testing and monitoring during treatment.
Though freely filtered 40% to 60% of urea is passively reabsorbed in the collecting ducts, Urea is not reabsorbed after filtration, 100% of urea is reabsorbed in the proximal tubule, Urea is actively secreted into the filtrate`,
  `question: Page 173, Describe analytical methods of renal function testing and monitoring during treatment.
The most common enzymatic method for urea assay couples urease with glutamate dehydrogenase, The most common method for urea uses the Jaffe reaction, The most common method for urea uses uricase, The most common method for urea is immunoassay`,
  `question: Page 173, Describe specimen collection for renal function testing.
When measuring urea ammonium heparin tubes must be avoided, When measuring urea only green top tubes can be used, When measuring urea EDTA tubes are preferred, When measuring urea sodium fluoride is recommended`,
  `question: Page 174, Describe analytical methods of renal function testing and monitoring during treatment.
Creatinine is the final product of the decomposition of phosphocreatine, Creatinine is the final product of purine metabolism, Creatinine is the final product of protein breakdown, Creatinine is the final product of hemoglobin breakdown`,
  `question: Page 174, Describe analytical methods of renal function testing and monitoring during treatment.
Unlike urea creatinine is not reabsorbed by the tubules, Like urea creatinine is 40% to 60% reabsorbed, Creatinine is 100% reabsorbed in the proximal tubule, Creatinine is actively secreted in large amounts`,
  `question: Page 174, Describe analytical methods of renal function testing and monitoring during treatment.
The most frequent methods to measure creatinine are based on the Jaffe reaction, The most frequent methods for creatinine use the urease enzyme, The most frequent methods for creatinine use the uricase enzyme, The most frequent methods for creatinine are immunoassays`,
  `question: Page 174, Describe analytical methods of renal function testing and monitoring during treatment.
In the Jaffe reaction creatinine reacts with picric acid in an alkaline solution, In the Jaffe reaction creatinine reacts with urease, In the Jaffe reaction creatinine reacts with glutamate dehydrogenase, In the Jaffe reaction creatinine reacts with uricase`,
  `question: Page 175, Describe specimen collection for renal function testing.
For creatinine measurement hemolyzed and icteric samples should be avoided, For creatinine measurement slightly hemolyzed samples are acceptable, For creatinine measurement only plasma can be used, For creatinine measurement lipemia has no effect`,
  `question: Page 176, Describe analytical methods of renal function testing and monitoring during treatment.
Uric acid is the primary waste product of purine metabolism, Uric acid is the primary waste product of muscle metabolism, Uric acid is the primary waste product of protein metabolism, Uric acid is the primary waste product of glucose metabolism`,
  `question: Page 176, Describe analytical methods of renal function testing and monitoring during treatment.
Almost all filtered uric acid is reabsorbed in the proximal tubule then secreted, Uric acid is filtered and not reabsorbed or secreted, Uric acid is only secreted and not filtered, Uric acid is only filtered and excreted`,
  `question: Page 177, Describe analytical methods of renal function testing and monitoring during treatment.
Methods using uricase are highly specific for uric acid and used almost exclusively, Methods using the Jaffe reaction are used for uric acid, Methods using urease are used for uric acid, Immunoassays are the primary method for uric acid`,
  `question: Page 177, Describe specimen collection for renal function testing.
For uric acid testing serum should be removed from cells quickly, For uric acid testing whole blood is the required specimen, For uric acid testing slight hemolysis is acceptable, For uric acid testing lipemic samples are preferred`,
  `question: Page 179, Describe analytical methods of renal function testing and monitoring during treatment.
The creatinine clearance test is more universally used for GFR assessment than inulin clearance, The inulin clearance test is the most common GFR test, The urea clearance test is the gold standard for GFR, The uric acid clearance test is used to measure GFR`,
  `question: Page 179, Describe analytical methods of renal function testing and monitoring during treatment.
A decrease in GFR precedes kidney failure in all forms of progressive disease, An increase in GFR precedes kidney failure, GFR remains stable in all kidney diseases, GFR is not a reliable indicator of kidney failure`,
  `question: Page 180, Describe analytical methods of renal function testing and monitoring during treatment.
Creatinine clearance measures the amount of creatinine eliminated from the blood by the kidneys, Creatinine clearance measures the amount of urea in blood, Creatinine clearance measures the amount of glucose in urine, Creatinine clearance measures liver function`,
  `question: Page 180, Describe specimen collection for renal function testing.
Creatinine clearance requires both a 24-hour urine specimen and a serum creatinine value, Creatinine clearance requires only a random urine sample, Creatinine clearance requires only a serum sample, Creatinine clearance requires a first morning void`,
  `question: Page 181, Describe specimen collection for renal function testing.
During a 24-hour urine collection the first morning specimen is discarded, The first morning specimen is the only one saved, All urine is collected for 48 hours, Only nighttime urine is collected`,
  `question: Page 181, Describe specimen collection for renal function testing.
A source of error in 24-hour urine collection is loss of some portions of urine, A source of error is drinking too much water, A source of error is light exercise, A source of error is refrigerating the sample`,
  `question: Page 182, Describe analytical methods of renal function testing and monitoring during treatment.
Microalbuminuria describes small amounts of albumin (30 to 300mg) in the urine, Microalbuminuria describes large amounts of protein in urine, Microalbuminuria is the presence of red blood cells, Microalbuminuria is the absence of albumin in urine`,
  `question: Page 182, Describe analytical methods of renal function testing and monitoring during treatment.
A 24-hour urine albumin measurement is important in managing patients with diabetes mellitus, A 24-hour urine albumin is for diagnosing gout, A 24-hour urine albumin is for monitoring liver disease, A 24-hour urine albumin is for assessing muscle injury`,
  `question: Page 182, Describe analytical methods of renal function testing and monitoring during treatment.
Myoglobin is a protein associated with acute skeletal and cardiac muscle injury, Myoglobin is a protein associated with liver damage, Myoglobin is a protein related to glucose metabolism, Myoglobin is a waste product of purines`,
  `question: Page 182, Describe specimen collection for renal function testing.
For a routine urinalysis initial morning specimens are preferred, For a routine urinalysis a 24-hour specimen is required, For a routine urinalysis a random specimen is unacceptable, For a routine urinalysis a catheterized specimen is always needed`,
  `question: Page 182, Describe specimen collection for renal function testing.
A urine specimen must be analyzed within 1 hour if held at room temperature, A urine specimen can be held at room temp for 8 hours, A urine specimen must be immediately frozen, A urine specimen is stable at room temperature for 24 hours`,
  `question: Page 183, Describe analytical methods of renal function testing and monitoring during treatment.
The darker the color of urine the more concentrated is the specimen, The darker the color of urine the more dilute it is, Urine color does not correlate with concentration, Clear urine is always the most concentrated`,
  `question: Page 184, Describe analytical methods of renal function testing and monitoring during treatment.
The specific gravity of urine gives an indication of the density of the fluid, The specific gravity of urine measures its pH, The specific gravity of urine detects bacteria, The specific gravity of urine measures glucose only`,
  `question: Page 185, Describe analytical methods of renal function testing and monitoring during treatment.
Measurement of urine osmolality is more valid than specific gravity for assessing concentrating ability, Specific gravity is more valid than osmolality, Osmolality and specific gravity measure the same thing, Osmolality measures urine color`,
  `question: Page 186, Describe analytical methods of renal function testing and monitoring during treatment.
Chemical analysis reagent strips signal a qualitative deviation from normality, Reagent strips provide exact quantitative values, Reagent strips are only for microscopic analysis, Reagent strips measure blood cell counts`,
  `question: Page 186, Describe analytical methods of renal function testing and monitoring during treatment.
Reagent strips for protein are specific only for albumin, Reagent strips for protein detect all proteins equally, Reagent strips do not test for protein, Reagent strips for protein are highly quantitative`,
  `question: Page 186, Describe analytical methods of renal function testing and monitoring during treatment.
Leukocyte esterase in conjunction with positive nitrite are excellent indicators of UTI, Positive leukocyte esterase alone confirms a UTI, Positive nitrite alone confirms a UTI, Negative nitrite and leukocyte esterase confirm a UTI`,
  `question: Page 188, Describe analytical methods of renal function testing and monitoring during treatment.
Evaluation of formed elements like cells is best done by averaging at least 10 microscopic fields, Formed elements are evaluated using a dipstick, Only one microscopic field is needed for evaluation, Formed elements are not typically evaluated`,
  `question: Page 189, Describe analytical methods of renal function testing and monitoring during treatment.
RBC casts are always pathologic and diagnostic for glomerular damage, RBC casts are considered normal in small numbers, RBC casts indicate a urinary tract infection, RBC casts are seen with severe exercise`,
  `question: Page 189, Describe analytical methods of renal function testing and monitoring during treatment.
WBC casts are always pathologic and are diagnostic for inflammation of the nephrons, WBC casts are normal findings in urine, WBC casts indicate kidney stones, WBC casts are caused by high glucose`,
  `question: Page 190, Correlate laboratory findings with the pathophysiology of the renal system.
Chronic kidney damage lasts 3 months and beyond, Chronic kidney damage lasts for 24 hours, Chronic kidney damage occurs in hours to days, Chronic kidney damage is always reversible`,
  `question: Page 190, Correlate laboratory findings with the pathophysiology of the renal system.
A significant reduction in functioning renal mass may occur before major symptoms appear, A small reduction in renal mass causes immediate symptoms, GFR increases as renal mass is lost, Symptoms always precede biochemical alterations`,
  `question: Page 191, Correlate laboratory findings with the pathophysiology of the renal system.
Acute kidney injury is a sudden sharp decline in renal function over hours or days, Acute kidney injury is a gradual decline over months, Acute kidney injury only results from infections, Acute kidney injury is always irreversible`,
  `question: Page 191, Correlate laboratory findings with the pathophysiology of the renal system.
Acute glomerulonephritis findings usually include rapid onset of hematuria and proteinuria, Acute glomerulonephritis findings include high glucose, Acute glomerulonephritis findings include lipiduria, Acute glomerulonephritis findings include low GFR only`,
  `question: Page 191, Correlate laboratory findings with the pathophysiology of the renal system.
Chronic glomerulonephritis may lead to glomerular scarring and loss of functioning nephrons, Chronic glomerulonephritis resolves quickly without scarring, Chronic glomerulonephritis is an acute condition, Chronic glomerulonephritis has no effect on nephrons`,
  `question: Page 192, Correlate laboratory findings with the pathophysiology of the renal system.
Nephrotic syndrome results from increased permeability of the glomerular basement membrane, Nephrotic syndrome results from tubular damage only, Nephrotic syndrome is caused by kidney stones, Nephrotic syndrome is a lower urinary tract infection`,
  `question: Page 192, Correlate laboratory findings with the pathophysiology of the renal system.
Nephrotic syndrome almost always yields massive proteinuria and hypoalbuminemia, Nephrotic syndrome yields mild proteinuria only, Nephrotic syndrome yields hematuria and bacteriuria, Nephrotic syndrome has no effect on plasma proteins`,
  `question: Page 192, Correlate laboratory findings with the pathophysiology of the renal system.
Other symptoms of nephrotic syndrome are hyperlipidemia and lipiduria, Other symptoms include hypoglycemia and hyperkalemia, Other symptoms include low blood pressure and dehydration, Other symptoms include normal lipid levels`,
  `question: Page 192, Correlate laboratory findings with the pathophysiology of the renal system.
Nephrolithiasis is the presence of renal calculi or kidney stones, Nephrolithiasis is inflammation of the glomerulus, Nephrolithiasis is a bacterial infection of the bladder, Nephrolithiasis is another term for nephrotic syndrome`,
  `question: Page 193, Correlate laboratory findings with the pathophysiology of the renal system.
Chronic kidney disease is a gradual decline in renal function for at least 3 months, Chronic kidney disease is a rapid decline in renal function, Chronic kidney disease is defined as lasting one month, Chronic kidney disease is always caused by trauma`,
  `question: Page 193, Correlate laboratory findings with the pathophysiology of the renal system.
Diabetes is the leading cause of CKD, Hypertension is the leading cause of CKD, Gout is the leading cause of CKD, Autoimmune disease is the leading cause of CKD`,
  `question: Page 193, Correlate laboratory findings with the pathophysiology of the renal system.
Diabetic nephropathy is the clinical diagnosis based on the finding of proteinuria in a patient with diabetes, Diabetic nephropathy is diagnosed by high blood sugar alone, Diabetic nephropathy is diagnosed by the presence of ketones, Diabetic nephropathy is diagnosed by hematuria`,
  `question: Page 194, Correlate laboratory findings with the pathophysiology of the renal system.
A GFR of less than 15mL/min/1.73m2 is considered renal failure, A GFR of 60mL/min/1.73m2 is considered renal failure, A GFR of 90mL/min/1.73m2 is considered renal failure, A GFR of 30mL/min/1.73m2 is considered renal failure`,
  `question: Page 195, Discuss therapy types for acute and chronic renal failure.
GFR levels are used to determine when a patient needs to prepare for renal replacement therapy, Blood urea levels alone determine the need for dialysis, Serum creatinine levels alone determine the need for dialysis, Urine output alone determines the need for dialysis`,
  `question: Page 195, Discuss therapy types for acute and chronic renal failure.
Renal replacement therapy in the form of dialysis is necessary for uremic symptoms and uncontrolled hyperkalemia, Dialysis is an optional treatment for kidney failure, Dialysis is only used for acute kidney injury, Dialysis is primarily for controlling blood sugar`,
  `question: Page 195, Discuss therapy types for acute and chronic renal failure.
All forms of dialysis use a semipermeable membrane surrounded by a dialysate bath, All forms of dialysis require a kidney transplant, All forms of dialysis filter blood inside the body, Dialysis works by adding waste products to the blood`,
  `question: Page 195, Discuss therapy types for acute and chronic renal failure.
Traditional hemodialysis utilizes a synthetic membrane and filtering is performed outside the body, Traditional hemodialysis uses the patient's peritoneal wall, Traditional hemodialysis is performed 24 hours a day, Traditional hemodialysis is less rigorous than peritoneal dialysis`,
  `question: Page 195, Discuss therapy types for acute and chronic renal failure.
Peritoneal dialysis uses the patient's peritoneal wall as the dialysate membrane, Peritoneal dialysis uses a synthetic membrane outside the body, Peritoneal dialysis is a type of kidney transplant, Peritoneal dialysis has higher clearance than hemodialysis`,
  `question: Page 195, Discuss therapy types for acute and chronic renal failure.
Slow continuous renal replacement therapies treat acute renal failure in critically ill patients, Slow therapies are used for all chronic kidney disease patients, Slow therapies are the first line of treatment for UTIs, Slow therapies are a form of kidney transplant`,
  `question: Page 196, Discuss therapy types for acute and chronic renal failure.
For irreversible kidney failure dialysis and transplantation are the only two therapeutic options, For irreversible kidney failure only medication is used, For irreversible kidney failure lifestyle changes are sufficient, For irreversible kidney failure the only option is dialysis`,
  `question: Page 196, Discuss therapy types for acute and chronic renal failure.
Kidney transplantation offers the greatest chance for full return to a healthy productive life, Dialysis offers the greatest chance for a full return to health, Medication offers the greatest chance for a full return to health, There is no treatment for irreversible kidney failure`,
  `question: Page 196, Discuss therapy types for acute and chronic renal failure.
Kidney transplantation is limited by a significant shortage of organ donors, Kidney transplantation is limited by its high failure rate, Kidney transplantation is limited by its cost only, Kidney transplantation is available to all patients`,
  `question: Page 196, Describe analytical methods of renal function testing and monitoring during treatment.
The laboratory plays a critical role in evaluating the effectiveness of renal replacement therapy, The laboratory has no role in managing renal replacement therapy, Only the physician evaluates the effectiveness of therapy, The patient determines the effectiveness of therapy`,
  `question: Page 173, Describe specimen collection for renal function testing.
Urea is susceptible to bacterial decomposition so specimens should be refrigerated if delayed, Urea specimens are stable at room temperature for 48 hours, Urea does not require refrigeration for urine samples, Bacterial decomposition does not affect urea levels`,
  `question: Page 178, Correlate laboratory findings with the pathophysiology of the renal system.
An estimated GFR or eGFR does not require a timed urine collection, An eGFR requires a 24-hour urine collection, An eGFR is calculated from urine creatinine alone, An eGFR is less accurate than a single serum creatinine`
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