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
  `question: What organization guides the development and implementation of standards for laboratories?
The Clinical and Laboratory Standards Institute CLSI, The American Chemical Society ACS, The Occupational Safety and Health Administration OSHA, The National Formulary NF`,

  `question: What is the treatment process called through which undesired chemical compounds organic and inorganic materials and biological contaminants are removed from water?
Water Purification, Water Distillation, Water Deionization, Water Filtration`,

  `question: Tap water is generally considered what for most laboratory applications including reagent preparation?
Unsuitable, Ideal, Acceptable if boiled, Suitable after filtering`,

  `question: Which type of water did CLSI define as meeting specifications for most routine clinical laboratory testing?
Clinical Laboratory Reagent Water CLRW, Special Reagent Water SRW, Distilled Water only, Deionized Water only`,

  `question: Is water quality in the laboratory defined solely by the purification process used?
No water quality is not defined solely by the process, Yes the process dictates the exact quality, Only for Type I water, Only if distillation is used`,

  `question: Which of these is a process used to prepare reagent grade water?
Distillation, Hydration, Titration, Sonication`,

  `question: Which water purification method involves boiling water vaporizing it then cooling the vapor to a liquid state?
Distillation, Deionization, Reverse Osmosis, Ultrafiltration`,

  `question: In distillation what happens to many impurities as the water vaporizes?
They remain in the boiling apparatus, They rise with the water vapor, They are neutralized by heat, They are filtered out by the condenser`,

  `question: What type of water has some or all ions removed but may still contain organic materials and is not necessarily sterile?
Deionized water, Distilled water, Tap water, Spring water`,

  `question: Deionized water is produced using either an anion or a cation exchange what?
Resin, Filter, Membrane, Column`,

  `question: Deionization is excellent in removing what from water?
Dissolved ionized solids and dissolved gases, Particulate matter and bacteria, Organic contaminants, Pyrogens`,

  `question: Which water purification process uses pressure to force water through a semipermeable membrane?
Reverse Osmosis, Distillation, Deionization, Ultraviolet Oxidation`,

  `question: Does reverse osmosis effectively remove dissolved gases from water?
No it does not remove dissolved gases, Yes it removes all impurities, Only if combined with deionization, Only at high pressures`,

  `question: What is one use of reverse osmosis in water treatment?
Pretreatment of water, Final sterilization, Removal of organic materials only, pH adjustment`,

  `question: Ultrafiltration is a process where water is passed through semipermeable membranes of what approximate pore size?
Less than 0.2 mm (micrometers), Greater than 1.0 mm, Exactly 0.5 mm, Variable based on pressure`,

  `question: Ultrafiltration removes particulate matter emulsified solids most bacteria and what else?
Pyrogens, Dissolved ions, Dissolved gases, Small organic molecules`,

  `question: Does ultrafiltration effectively remove dissolved ionized solids and gases?
No it does not effectively remove these, Yes it removes all dissolved substances, Only if pressure is very high, Only dissolved gases`,

  `question: Ultraviolet UV oxidation and sterilization are used after other purification processes to remove trace quantities of what?
Organic contaminants and bacteria, Dissolved ions and salts, Particulate matter, Dissolved gases`,

  `question: What wavelength is typically used for UV sterilization of water?
254 nm, 185 nm, 300 nm, 200 nm`,

  `question: What wavelength is typically used for UV oxidation to remove organic contaminants from water?
185 nm, 254 nm, 220 nm, 280 nm`,

  `question: UV treatment effectiveness is limited by intensity contact time and what other factor?
Flow rate, Water temperature, Water pH, Water hardness`,

  `question: According to CLSI how many categories of reagent grade water are there based on specifications for use?
Six categories, Three categories Type I II III, Four categories, Two categories`,

  `question: Clinical Laboratory Reagent Water is one of the categories defined by CLSI. True or False?
True, False, CLSI only defines Type I II and III, CLSI defines SRW only`,

  `question: Which type of water has the most stringent requirements and is generally suitable for routine laboratory use?
Type I water, Type II water, Type III water, CLRW water (this is a category not a type)`,

  `question: Type I water is also known as what?
Ultrapure water, Purified water, Primary grade water, Distilled water`,

  `question: For which procedures is Type I water typically used?
Highly sensitive procedures like HPLC or trace element analysis, General glassware rinsing, Filling autoclaves, Buffer preparation for non-critical assays`,

  `question: How does Type II water purity compare to Type I and Type III?
Cleaner than Type III but not as pure as Type I, Purer than Type I, Less pure than Type III, Equal to Type I`,

  `question: What is Type II water commonly used for in the laboratory?
Preparation of reagents for chemical analysis or sample dilution, Only for glassware washing, HPLC mobile phase preparation, Critical cell culture`,

  `question: Is Type III water acceptable for analysis or reagent preparation?
No it is not acceptable for analysis or reagent preparation, Yes it is acceptable for all uses, Only for qualitative analysis, Only for non-aqueous reagents`,

  `question: What are common uses for Type III water?
Glassware rinsing or filling autoclaves, Trace metal analysis, Preparing standards and controls, Molecular biology procedures`,

  `question: What is the general term for Clinical Laboratory Reagent Water CLRW according to its use?
It should be used in all quantitative and most qualitative laboratory procedures, It is only for washing glassware, It is specifically for HPLC, It is interchangeable with tap water`,

  `question: For trace element and heavy metal analysis what might be necessary even if using CLRW?
Further treatment of CLRW, No further treatment needed, Dilution with tap water, Adding stabilizing agents`,

  `question: Special purpose reagent water may be necessary for specific procedures like HPLC or what other example given?
Chromosome analyses or HLA testing, General reagent dilution, Autoclave feed, Glassware final rinse`,

  `question: What term describes a function defining the relationship between instrument signal and analyte concentration within an acceptable range?
Calibration, Control, Verification, Standardization`,

  `question: What is a standard or reference material used to calibrate an instrument or laboratory procedure called?
Calibrator, Control, Reagent, Sample`,

  `question: A substance used to correlate or adjust an instruments readings and can assess or correct accuracy is a what?
Calibrator, Control solution, Blank material, Working standard`,

  `question: What is a patient-like specimen or solution analyzed solely for quality control purposes to verify method performance?
Control, Calibrator, Standard, Reagent blank`,

  `question: What is a material with one or more properties sufficiently established for calibrating equipment verifying methods or assigning values to materials?
Reference Material, Control Material, Test Sample, Blank Solution`,

  `question: What are materials containing a precisely known concentration of a substance for use in quantitative analysis?
Standards, Controls, Calibrators (can be standards but standards is more direct for known concentration), Reagents`,

  `question: The quality of analytical results is a direct result of the purity of chemicals and the quality of what else?
Reference materials used to calibrate and monitor performance, The brand of the analyzer, The room lighting conditions, The number of tests run per day`,

  `question: What is one use of a reference material?
Calibration of equipment, Diluting patient samples, Washing glassware, Storing reagents`,

  `question: Can a reference material be used for the verification of a measurement method?
Yes, No, Only if its a primary standard, Only for qualitative methods`,

  `question: Are controls and calibrators the same or different in their function?
Different each has a separate function, Same they serve identical purposes, Controls are diluted calibrators, Calibrators are concentrated controls`,

  `question: What is the primary function of calibrators?
To set the reported values accurately, To verify the stability of the testing system only, To monitor day-to-day precision, To check for interfering substances`,

  `question: What is the primary function of controls?
To verify the stability and accuracy of calibration and testing system, To establish the initial measurement range, To determine the exact concentration of patient samples, To set the instruments baseline`,

  `question: Control materials are analyzed solely for what purpose?
Quality control purposes, Calibrating the instrument, Determining patient values, Establishing reference ranges`,

  `question: The expected values for control materials are represented by intervals of acceptable values known as what?
Control limits, Reference intervals, Calibration ranges, Reportable ranges`,

  `question: What characteristic should control materials have concerning the patient specimen matrix?
Should be the same matrix as the specimen, Should be a different matrix to test robustness, Matrix does not matter, Should be pure chemical solutions`,

  `question: Control materials must be available in sufficient quantity to last at least how long?
One year, One month, One week, One day`,

  `question: How does a commercially available calibrator typically get its assigned value?
Manufacturer establishes it using a definitive or reference method or traceable reference materials, Laboratory determines it through repeated patient testing, It is an average of control values, It is set by the instrument software automatically`,

  `question: What does the process of calibration establish regarding the instruments output signal?
Correspondence with known concentrations, The precision of the method, The lower limit of detection, The day-to-day variability`,

  `question: What are highly purified chemicals directly weighed or measured to produce a solution whose concentration is exactly known?
Primary reference materials or primary standards, Secondary reference materials or secondary standards, Quality control materials, Working calibrators`,

  `question: The IUPAC has proposed what degree of purity for primary reference materials?
99.98 percent, 99.0 percent, 95.5 percent, 100.00 percent`,

  `question: What document is typically supplied for each lot of primary reference materials?
Certificates of analysis, Safety Data Sheets, User manuals, Calibration curves`,

  `question: What are solutions whose concentrations cannot be prepared by simply weighing the solute and dissolving it into a known volume of solution?
Secondary reference materials or secondary standards, Primary reference materials or primary standards, Assayed controls, Unassayed controls`,

  `question: How is the concentration of secondary reference materials typically determined?
By analysis using a reference method calibrated with a primary reference material, By precise weighing and volumetric dilution, By comparison to patient samples, By manufacturer assignment without analysis`,

  `question: In the traceability pyramid which material is at the top having the least uncertainty?
Primary reference material, Secondary reference material, Quality control material, Patient sample`,

  `question: As you move down the traceability pyramid from primary reference material to patient sample what happens to the uncertainty of measurement?
It increases, It decreases, It remains constant, It becomes zero`,

  `question: Are controls used to set the reported values of an instrument?
No calibrators set the values, Yes controls primarily set values, Only if calibrators are unavailable, Controls and calibrators are used interchangeably for this`,

  `question: Should control materials be aliquoted in stable form?
Yes, No stability is not a concern, Only if used within 24 hours, Only for lyophilized controls`
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