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
  `question: Discuss the history of urinalysis and its importance in the diagnosis of disease. Page 9. The analysis of what substance is considered the beginning of laboratory medicine? Urine, Blood, Saliva, Stool`,
  `question: Discuss the history of urinalysis and its importance in the diagnosis of disease. Page 9. Early physicians noted that certain urine specimens attracted ants or tasted what? Sweet, Salty, Sour, Bitter`,
  `question: Discuss the history of urinalysis and its importance in the diagnosis of disease. Page 9. By what year were color charts developed that described the significance of 20 different urine colors? 1140 AD, 1694 AD, 1827 AD, 1930 AD`,
  `question: Discuss the history of urinalysis and its importance in the diagnosis of disease. Page 9. What were the charlatans who compromised the credibility of urinalysis called? Piss prophets, Urine wizards, Fluid fortune-tellers, Water weavers`,
  `question: Discuss the history of urinalysis and its importance in the diagnosis of disease. Page 9. The discovery of what substance in 1694 was made by boiling urine? Albuminuria, Glucosuria, Ketonuria, Bilirubinuria`,
  `question: Discuss the history of urinalysis and its importance in the diagnosis of disease. Page 9. The invention of what instrument in the 17th century led to the examination of urinary sediment? Microscope, Telescope, Stethoscope, Centrifuge`,
  `question: Discuss the history of urinalysis and its importance in the diagnosis of disease. Page 9. In what year did urinalysis become part of a routine patient examination? 1827, 1627, 1930, 1140`,
  `question: Discuss the history of urinalysis and its importance in the diagnosis of disease. Page 10. Which is NOT a reason for performing urinalysis? Assessing respiratory function, Aiding in disease diagnosis, Screening for asymptomatic diseases, Monitoring therapy effectiveness`,
  `question: Discuss the history of urinalysis and its importance in the diagnosis of disease. Page 10. According to the text what are two unique characteristics of a urine specimen? Readily available and easily collected, Difficult to obtain and costly to test, Stable at all temperatures and requires no preservation, Only useful for kidney disease diagnosis`,
  `question: Discuss the physiology of urine formation. Page 11. The kidneys continuously form urine as an ultrafiltrate of what bodily fluid? Plasma, Lymph, Saliva, Bile`,
  `question: Discuss the physiology of urine formation. Page 11. Approximately how many milliliters of plasma are converted to 1200 mL of urine? 170000, 1200, 15000, 200000`,
  `question: Discuss the physiology of urine formation. Page 11. The kidneys excrete two to three times more urine during what period? Day, Night, Evening, Morning`,
  `question: Identify the organic and inorganic chemical constituents of urine. Page 11. Urine is normally composed of 95% water and what percentage of solutes? 5%, 10%, 15%, 1%`,
  `question: Identify the organic and inorganic chemical constituents of urine. Page 11. What is the major organic solute in urine accounting for nearly half of all dissolved solids? Urea, Creatinine, Uric acid, Glucose`,
  `question: Identify the organic and inorganic chemical constituents of urine. Page 11. Urea is a metabolic waste product produced in the liver from the breakdown of protein and what else? Amino acids, Carbohydrates, Lipids, Nucleic acids`,
  `question: Identify the organic and inorganic chemical constituents of urine. Page 11. Besides urea what are the other primary organic substances found in urine? Creatinine and uric acid, Glucose and ketones, Bilirubin and urobilinogen, Hormones and vitamins`,
  `question: Identify the organic and inorganic chemical constituents of urine. Page 11. What is the major inorganic solid dissolved in urine? Chloride, Sodium, Potassium, Calcium`,
  `question: Identify the organic and inorganic chemical constituents of urine. Page 11. Besides chloride what are the next most common inorganic solids dissolved in urine? Sodium and potassium, Magnesium and sulfate, Phosphate and ammonium, Calcium and bicarbonate`,
  `question: Recognize normal and abnormal daily urine volumes. Page 12. In a healthy adult what is the normal daily urine output range? 1200 to 1500 mL, 600 to 1000 mL, 2000 to 2500 mL, 400 to 800 mL`,
  `question: Recognize normal and abnormal daily urine volumes. Page 12. For laboratory testing a range of 600 mL to what volume is considered normal? 2000 mL, 1500 mL, 2500 mL, 1200 mL`,
  `question: Recognize normal and abnormal daily urine volumes. Page 12. What term describes a decrease in urine output to less than 400 mL/day in adults? Oliguria, Anuria, Polyuria, Nocturia`,
  `question: Recognize normal and abnormal daily urine volumes. Page 12. A common cause of oliguria is dehydration resulting from excessive water loss from vomiting diarrhea or what? Severe burns, Excessive fluid intake, Diuretic use, High salt diet`,
  `question: Recognize normal and abnormal daily urine volumes. Page 12. What term describes the complete cessation of urine flow? Anuria, Oliguria, Polyuria, Dysuria`,
  `question: Recognize normal and abnormal daily urine volumes. Page 12. What is the term for an increase in the nocturnal excretion of urine? Nocturia, Polyuria, Anuria, Oliguria`,
  `question: Recognize normal and abnormal daily urine volumes. Page 12. An increase in daily urine volume greater than 2.5 L/day in adults is known as what? Polyuria, Oliguria, Anuria, Nocturia`,
  `question: Recognize normal and abnormal daily urine volumes. Page 12. Polyuria is often associated with diabetes mellitus and what other condition? Diabetes insipidus, Kidney stones, Urinary tract infection, Hypertension`,
  `question: Recognize normal and abnormal daily urine volumes. Page 12. Diuretics caffeine and alcohol can artificially induce polyuria by suppressing the secretion of what hormone? Antidiuretic hormone, Insulin, Aldosterone, Glucagon`,
  `question: Recognize normal and abnormal daily urine volumes. Page 12. Diabetes mellitus is caused by a defect in the production or function of what? Insulin, Antidiuretic hormone, Glucose, Glycogen`,
  `question: Recognize normal and abnormal daily urine volumes. Page 12. In diabetes mellitus the urine specimen appears dilute but has a high what? Specific Gravity, pH, Ketone level, Protein level`,
  `question: Recognize normal and abnormal daily urine volumes. Page 13. Diabetes insipidus results from a decreased production or function of what hormone? ADH, Insulin, Glucagon, Aldosterone`,
  `question: Describe collection and handling procedures of urine specimens. Page 14. Specimens must be collected in containers that are clean dry and what? Leak-proof, Sterile, Brown, Refrigerated`,
  `question: Describe collection and handling procedures of urine specimens. Page 14. What is the recommended capacity of a standard urine collection container? 50 mL, 12 mL, 100 mL, 25 mL`,
  `question: Describe collection and handling procedures of urine specimens. Page 14. Specimen labels must be attached to the container and not to what part? Lid, Bottom, Side, Bag`,
  `question: Describe collection and handling procedures of urine specimens. Page 14. Which of the following is NOT listed as a reason for specimen rejection? Correctly labeled container, Unlabeled container, Contaminated specimen, Insufficient sample quantity`,
  `question: Describe collection and handling procedures of urine specimens. Page 14. Specimens should be delivered to the lab promptly and tested within how many hours? 2, 4, 6, 8`,
  `question: Describe collection and handling procedures of urine specimens. Page 14. What is the primary cause of significant changes in urine sample integrity when left unpreserved at room temperature? Bacteria, Oxidation, Light exposure, Evaporation`,
  `question: Describe collection and handling procedures of urine specimens. Page 15. What is the most routinely used and preferred method of urine preservation? Refrigeration, Chemical preservation, Freezing, UV light exposure`,
  `question: Describe collection and handling procedures of urine specimens. Page 15. Refrigeration of a urine specimen can cause the precipitation of what? Crystals, Bacteria, Cells, Casts`,
  `question: Describe collection and handling procedures of urine specimens. Page 15. Before chemical testing with reagent strips a refrigerated specimen must be at what temperature? Room temperature, Body temperature, Freezing temperature, Boiling temperature`,
  `question: Describe collection and handling procedures of urine specimens. Page 15. In an unpreserved urine specimen what happens to the pH level over time? Increased, Decreased, Unchanged, Stabilized`,
  `question: Describe collection and handling procedures of urine specimens. Page 15. The breakdown of urea to ammonia by urease-producing bacteria causes an increase in what? pH, Glucose, Ketones, Bilirubin`,
  `question: Describe collection and handling procedures of urine specimens. Page 15. What analyte decreases in unpreserved urine due to glycolysis and bacterial utilization? Glucose, pH, Nitrite, Bacteria`,
  `question: Describe collection and handling procedures of urine specimens. Page 15. What analyte decreases in unpreserved urine due to exposure to light? Bilirubin, Urobilinogen, Glucose, Ketones`,
  `question: Describe collection and handling procedures of urine specimens. Page 15. The multiplication of nitrate-reducing bacteria will cause an increase in what analyte? Nitrite, Glucose, Ketones, Bilirubin`,
  `question: Describe the purpose and types of urine specimens. Page 16. What is the most commonly received urine sample due to its ease of collection? Random, First Morning, 24-Hour, Catheterized`,
  `question: Describe the purpose and types of urine specimens. Page 16. What is the ideal screening specimen because it is typically the most concentrated? First Morning Void, Random, Timed, Postprandial`,
  `question: Describe the purpose and types of urine specimens. Page 16. The first morning void is the preferred collection type for what kind of test? Pregnancy, Glucose tolerance, Drug screen, Routine screening`,
  `question: Describe the purpose and types of urine specimens. Page 16. What type of urine specimens are collected to correspond with blood samples drawn during a GTT? Glucose Tolerance, Random, First Morning, 24-Hour`,
  `question: Describe the purpose and types of urine specimens. Page 17. What type of collection is required for substances that vary with daily activities like exercise and meals? 24-Hour, Random, First Morning, Midstream`,
  `question: Describe the purpose and types of urine specimens. Page 17. To obtain an accurate timed specimen the patient must begin and end the collection period with what? An empty bladder, A full bladder, A sterile container, A first morning void`,
  `question: Describe the purpose and types of urine specimens. Page 17. During a 24-hour collection how should the specimens be stored? Refrigerated or on ice, At room temperature, In a dark cabinet, Frozen solid`,
  `question: Describe the purpose and types of urine specimens. Page 17. In a 24-hour collection what does the patient do with the first specimen voided on Day 1 at 7 a.m.? Discards, Collects, Tests, Refrigerates`,
  `question: Describe the purpose and types of urine specimens. Page 17. What type of specimen is collected under sterile conditions by passing a hollow tube through the urethra into the bladder? Catheterized, Midstream Clean-Catch, Suprapubic, Random`,
  `question: Describe the purpose and types of urine specimens. Page 17. Which specimen provides a sample that is less contaminated by epithelial cells and bacteria? Midstream Clean-Catch, Random, First Morning, 24-Hour`,
  `question: Describe the purpose and types of urine specimens. Page 17. During a midstream clean-catch collection where should the patient begin to void? Into the toilet, Into the container, On the cleansing towelette, Into the collection bag`,
  `question: Describe the purpose and types of urine specimens. Page 18. What collection method involves the external introduction of a needle through the abdomen into the bladder? Suprapubic Aspiration, Catheterization, Midstream Clean-Catch, Random`,
  `question: Describe the purpose and types of urine specimens. Page 18. A suprapubic aspiration provides a sample for bacterial culture that is completely free of what? Extraneous contamination, Normal urine components, White blood cells, Red blood cells`,
  `question: Describe the purpose and types of urine specimens. Page 18. What type of collection uses soft clear plastic bags with hypoallergenic skin adhesive? Pediatric, Geriatric, Adult male, Adult female`,
  `question: Identify the organic and inorganic chemical constituents of urine. Page 11. Urine samples can be differentiated from other bodily fluids by testing for creatinine and what other substance? Urea, Chloride, Sodium, Water`,
  `question: Recognize normal and abnormal daily urine volumes. Page 12. What term describes excessive thirst often associated with diabetes mellitus and insipidus? Polydipsia, Polyuria, Polyphagia, Anuria`
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