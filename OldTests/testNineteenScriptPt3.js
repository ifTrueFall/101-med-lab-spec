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
  `question: Describe the reagent strip test to include techniques, specimen processing, and quality control. Page 27. When removing a reagent strip from a specimen you should remove excess urine by running the edge of the strip on what?
    The container, An absorbent medium, Your gloved finger, A paper towel`,
  `question: Describe the reagent strip test to include techniques, specimen processing, and quality control. Page 27. To prevent run-over between chemical pads how should the strip be held when comparing colors?
    Horizontally, Vertically, At an angle, Towards the light`,
  `question: Describe the reagent strip test to include techniques, specimen processing, and quality control. Page 27. Leaving the reagent strip in the urine for an extended period may cause what to happen?
    Leaching of reagents, False positives, Color intensification, Pad separation`,
  `question: Describe the reagent strip test to include techniques, specimen processing, and quality control. Page 28. To protect them from light and moisture reagent strips are packaged in opaque containers with a what?
    Desiccant, Preservative, Stabilizer, Humidifier`,
  `question: Describe the reagent strip test to include techniques, specimen processing, and quality control. Page 28. How often is quality control testing of reagent strips usually performed?
    Every 24 hours, Weekly, Monthly, With each patient sample`,
  `question: Describe the reagent strip test to include techniques, specimen processing, and quality control. Page 28. Besides on a schedule quality control should be performed when questionable results are obtained or when what occurs?
    A new bottle is opened, The shift changes, A new tech is trained, The instrument is moved`,
  `question: Describe the purpose, clinical significance, and method used to determine the pH of urine. Page 28. What is the typical pH of a first morning urine specimen?
    5.0 to 6.0, 4.5 to 5.0, 6.0 to 7.0, 7.0 to 8.0`,
  `question: Describe the purpose, clinical significance, and method used to determine the pH of urine. Page 28. The pH of normal random urine samples can range from 4.5 to what?
    8.0, 7.5, 8.5, 9.0`,
  `question: Describe the purpose, clinical significance, and method used to determine the pH of urine. Page 29. Which condition is a cause of acidic urine?
    Dehydration, Vomiting, Hyperventilation, Vegetarian diet`,
  `question: Describe the purpose, clinical significance, and method used to determine the pH of urine. Page 29. Which condition is a cause of alkaline urine?
    Vegetarian diet, Starvation, Emphysema, High-protein diet`,
  `question: Describe the purpose, clinical significance, and method used to determine the pH of urine. Page 29. Reagent strips use a double-indicator system of methyl red and what other indicator for pH?
    Bromothymol blue, Phenol red, Litmus, Phenolphthalein`,
  `question: Describe the purpose, clinical significance, reagent strip, and Sulfosalicylic Acid precipitation test for proteins in urine. Page 30. Proteinuria is often associated with early disease of what organ?
    Renal, Liver, Heart, Pancreas`,
  `question: Describe the purpose, clinical significance, reagent strip, and Sulfosalicylic Acid precipitation test for proteins in urine. Page 30. What is the major serum protein found in normal urine?
    Albumin, Globulin, Fibrinogen, Uromodulin`,
  `question: Describe the purpose, clinical significance, reagent strip, and Sulfosalicylic Acid precipitation test for proteins in urine. Page 31. What is the name of the protein associated with multiple myeloma that coagulates at 40-60°C and dissolves at 100°C?
    Bence Jones protein, Tamm-Horsfall protein, Albumin, Myoglobin`,
  `question: Describe the purpose, clinical significance, reagent strip, and Sulfosalicylic Acid precipitation test for proteins in urine. Page 32. What type of proteinuria occurs in a vertical posture but disappears when horizontal?
    Orthostatic, Tubular, Glomerular, Prerenal`,
  `question: Describe the purpose, clinical significance, reagent strip, and Sulfosalicylic Acid precipitation test for proteins in urine. Page 33. The reagent strip for protein uses the principle of the protein error of what?
    Indicators, Enzymes, Antibodies, Reagents`,
  `question: Describe the purpose, clinical significance, reagent strip, and Sulfosalicylic Acid precipitation test for proteins in urine. Page 34. What test is a cold precipitation test that reacts equally with all forms of protein?
    Sulfosalicylic Acid SSA, Reagent strip, Heat precipitation, Biuret method`,
  `question: Describe the purpose, clinical significance, reagent strip, and Clinitest for glucose in urine. Page 34. The renal threshold for glucose at which tubular reabsorption stops is approximately what level?
    160 to 180 mg/dL, 100 to 120 mg/dL, 200 to 220 mg/dL, 80 to 100 mg/dL`,
  `question: Describe the purpose, clinical significance, reagent strip, and Clinitest for glucose in urine. Page 34. Hyperglycemia that occurs during pregnancy is called what?
    Gestational diabetes, Type 1 diabetes, Type 2 diabetes, Renal glycosuria`,
  `question: Describe the purpose, clinical significance, reagent strip, and Clinitest for glucose in urine. Page 35. The reagent strip test for glucose uses a double sequential enzyme reaction involving peroxidase and what other enzyme?
    Glucose oxidase, Hexokinase, Catalase, Amylase`,
  `question: Describe the purpose, clinical significance, reagent strip, and Clinitest for glucose in urine. Page 36. What test relies on the ability of glucose to reduce copper sulfate to cuprous oxide?
    Clinitest, Reagent strip, Acetest, Ictotest`,
  `question: Describe the purpose, clinical significance, reagent strip, and Clinitest for glucose in urine. Page 37. When high levels of a reducing substance cause the Clinitest color to pass through orange and back to green-brown it is known as what?
    Pass through, Reversal, Oversaturation, Interference`,
  `question: Describe the purpose, clinical significance, reagent strip, and Clinitest for glucose in urine. Page 38. The Clinitest is used as a quick screening test for what condition in newborns?
    Galactosemia, Phenylketonuria, Diabetes, Cystic fibrosis`,
  `question: Describe the purpose, clinical significance, reagent strip, and Acetest for ketones in urine. Page 39. Ketones represent three intermediate products of the metabolism of what?
    Fat, Carbohydrate, Protein, Nucleic acid`,
  `question: Describe the purpose, clinical significance, reagent strip, and Acetest for ketones in urine. Page 39. Which of the three ketone bodies is present in the highest concentration (78%) during ketosis?
    B-hydroxybutyrate, Acetoacetic acid, Acetone, Pyruvate`,
  `question: Describe the purpose, clinical significance, reagent strip, and Acetest for ketones in urine. Page 39. Testing for urinary ketones is most valuable in the management and monitoring of which condition?
    Type 1 diabetes mellitus, Type 2 diabetes mellitus, Gestational diabetes, Liver disease`,
  `question: Describe the purpose, clinical significance, reagent strip, and Acetest for ketones in urine. Page 39. The reagent strip test for ketones primarily measures what substance?
    Acetoacetic acid, Acetone, B-hydroxybutyrate, All ketones equally`,
  `question: Describe the purpose, clinical significance, reagent strip, and Acetest for ketones in urine. Page 39. In an alkaline medium acetoacetic acid reacts with what chemical on the reagent strip to produce a purple color?
    Sodium nitroprusside, Copper sulfate, Diazo salt, Ehrlich reagent`,
  `question: Describe the clinical significance of hematuria, hemoglobinuria, and the method for testing blood in urine. Page 41. The presence of intact red blood cells in urine is termed what?
    Hematuria, Hemoglobinuria, Myoglobinuria, Bilirubinuria`,
  `question: Describe the clinical significance of hematuria, hemoglobinuria, and the method for testing blood in urine. Page 41. Urine that is red and cloudy is most indicative of what?
    Hematuria, Hemoglobinuria, Myoglobinuria, Porphyrinuria`,
  `question: Describe the clinical significance of hematuria, hemoglobinuria, and the method for testing blood in urine. Page 41. Urine that is red and clear is most indicative of what?
    Hemoglobinuria, Hematuria, Pyuria, Bacteriuria`,
  `question: Describe the clinical significance of hematuria, hemoglobinuria, and the method for testing blood in urine. Page 41. What is a non-pathological cause of hematuria?
    Strenuous exercise, Glomerular disease, Renal calculi, Tumors`,
  `question: Describe the clinical significance of hematuria, hemoglobinuria, and the method for testing blood in urine. Page 41. Transfusion reactions severe burns and hemolytic anemias can result in what condition?
    Hemoglobinuria, Hematuria, Myoglobinuria, Ketonuria`,
  `question: Describe the clinical significance of hematuria, hemoglobinuria, and the method for testing blood in urine. Page 42. What pattern is seen on the blood reagent pad when intact red blood cells are present?
    Speckled pattern, Uniform color, Striped pattern, No change`,
  `question: Describe the clinical significance of hematuria, hemoglobinuria, and the method for testing blood in urine. Page 42. Chemical tests for blood use the pseudoperoxidase activity of what?
    Hemoglobin, Catalase, Leukocyte esterase, Urease`,
  `question: Describe the purpose, clinical significance, reagent strip, and Ictotest for bilirubin in urine. Page 44. The appearance of bilirubin in the urine can provide an early indication of what type of disease?
    Liver, Kidney, Heart, Pancreatic`,
  `question: Describe the purpose, clinical significance, reagent strip, and Ictotest for bilirubin in urine. Page 44. The kidneys can excrete bilirubin only when it is in what form?
    Conjugated, Unconjugated, Bound to albumin, Oxidized`,
  `question: Describe the purpose, clinical significance, reagent strip, and Ictotest for bilirubin in urine. Page 45. What is the name of the confirmatory test for bilirubin?
    Ictotest, Acetest, Clinitest, SSA test`,
  `question: Describe the purpose, clinical significance, reagent strip, and Ictotest for bilirubin in urine. Page 44. The reagent strip test for bilirubin uses what type of reaction?
    Diazo, Ehrlich, Griess, Benedict`,
  `question: Describe the purpose, clinical significance, reagent strip, and Ictotest for bilirubin in urine. Page 45. A false negative bilirubin result can be caused by exposure to light which converts bilirubin to what?
    Biliverdin, Urobilinogen, Stercobilinogen, Urobilin`,
  `question: Describe the purpose, clinical significance, and method of testing urobilinogen in the urine. Page 45. A small amount of what substance is normally found in the urine at levels less than 1 mg/dL?
    Urobilinogen, Bilirubin, Glucose, Ketones`,
  `question: Describe the purpose, clinical significance, and method of testing urobilinogen in the urine. Page 45. An increased urine urobilinogen is seen in hemolytic disorders and what other condition?
    Liver disease, Bile duct obstruction, Kidney disease, Pancreatitis`,
  `question: Describe the purpose, clinical significance, and method of testing urobilinogen in the urine. Page 46. What finding is characteristic of a bile duct obstruction?
    Absence of urobilinogen, Positive bilirubin, Increased urobilinogen, Negative bilirubin`,
  `question: Describe the purpose, clinical significance, and method of testing urobilinogen in the urine. Page 46. The Multistix reagent strip test for urobilinogen uses what reaction?
    Ehrlich's aldehyde, Diazo, Griess, Peroxidase`,
  `question: Describe the purpose, clinical significance, and method of testing nitrite in urine. Page 47. The nitrite test is a rapid screening tool for what?
    Urinary tract infection, Kidney stones, Glomerular disease, Liver damage`,
  `question: Describe the purpose, clinical significance, and method of testing nitrite in urine. Page 47. The test relies on the ability of certain bacteria to reduce nitrate into what substance?
    Nitrite, Nitrogen, Ammonia, Urea`,
  `question: Describe the purpose, clinical significance, and method of testing nitrite in urine. Page 47. What is the name of the reaction used to detect nitrite?
    Griess reaction, Ehrlich reaction, Diazo reaction, Benedict reaction`,
  `question: Describe the purpose, clinical significance, and method of testing nitrite in urine. Page 47. How are nitrite results reported?
    Negative or positive, Trace small moderate large, 1+ 2+ 3+ 4+, In mg/dL`,
  `question: Describe the purpose, clinical significance, and method of testing for leukocyte esterase in urine. Page 48. The Leukocyte Esterase test detects esterase in which type of white blood cells?
    Granulocytic, Lymphocytic, All white blood cells, Agranulocytic`,
  `question: Describe the purpose, clinical significance, and method of testing for leukocyte esterase in urine. Page 48. Which specific leukocyte is not detected by the LE test?
    Lymphocytes, Neutrophils, Eosinophils, Basophils`,
  `question: Describe the purpose, clinical significance, and method of testing for leukocyte esterase in urine. Page 48. Besides bacterial infections increased leukocytes are also seen in infections caused by yeast Chlamydia and what else?
    Trichomonas, E. coli, Pseudomonas, Staphylococcus`,
  `question: Describe the purpose, clinical significance, and method of testing for leukocyte esterase in urine. Page 49. Which of all the reagent strip reactions requires the longest time to complete at 120 seconds?
    Leukocyte Esterase, Nitrite, Glucose, pH`,
  `question: Describe the purpose, clinical significance, and method of testing for specific gravity of urine. Page 50. What term is used to describe urine with a specific gravity of 1.010?
    Isosthenuric, Hyposthenuric, Hypersthenuric, Anuric`,
  `question: Describe the purpose, clinical significance, and method of testing for specific gravity of urine. Page 50. Urine with a specific gravity below 1.010 is described as what?
    Hyposthenuric, Isosthenuric, Hypersthenuric, Stenuric`,
  `question: Describe the purpose, clinical significance, and method of testing for specific gravity of urine. Page 50. What is the typical specific gravity range for most random urine specimens?
    1.015 to 1.030, 1.002 to 1.010, 1.010 to 1.015, 1.030 to 1.040`,
  `question: Describe the purpose, clinical significance, and method of testing for specific gravity of urine. Page 50. Excretion of radiographic contrast media can cause an abnormally high specific gravity above what value?
    1.040, 1.030, 1.020, 1.010`,
  `question: Describe the purpose, clinical significance, and method of testing for specific gravity of urine. Page 51. The reagent strip reaction for specific gravity is based on the change in pKa of a what?
    Polyelectrolyte, Chromogen, Diazonium salt, Buffer`,
  `question: Describe the purpose, clinical significance, and method of testing for specific gravity of urine. Page 51. The indicator used on the specific gravity reagent pad is what?
    Bromothymol blue, Methyl red, Tetrabromophenol blue, Phenol red`,
  `question: Describe the purpose, clinical significance, and method of testing for specific gravity of urine. Page 51. What instrument determines the concentration of dissolved particles by measuring the refractive index?
    Refractometer, Hydrometer, Osmometer, Spectrophotometer`,
  `question: Describe the reagent strip test to include techniques, specimen processing, and quality control. Page 27. What is a potential source of error if a urine specimen is not well-mixed before testing?
    Formed elements sinking, Incorrect pH reading, Inaccurate glucose, Diluted solutes`
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