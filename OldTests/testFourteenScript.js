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
  `question: Describe the significance of the field of hematology in relation to sickness and health. Page 13. What is the study of blood in health and pathologic conditions called?
Hematology, Microbiology, Chemistry, Immunology`,
  `question: Describe the significance of the field of hematology in relation to sickness and health. Page 13. Hematology helps provide patient care and studies the relationship of the bone marrow to what?
The systemic circulation, The nervous system, The digestive tract, The urinary system`,
  `question: Describe the significance of the field of hematology in relation to sickness and health. Page 13. Hematology studies the relationship of the plasma environment to what?
The red blood cell life span, The white blood cell count, Platelet aggregation, The clotting cascade`,
  `question: Describe the significance of the field of hematology in relation to sickness and health. Page 13. Hematology also studies the relationship of hemoglobin to what cell?
The red blood cell, The white blood cell, The platelet, The plasma cell`,
  `question: Describe the significance of the field of hematology in relation to sickness and health. Page 13. Who laid the foundation for hematology with his theory of the body's four humors?
Hippocrates, Galen, Virchow, Ehrlich`,
  `question: Describe the basic parts of the compound light microscope. Page 14. What tool is essential to the hematology laboratory professional?
The Microscope, The Centrifuge, The Spectrophotometer, The Incubator`,
  `question: Describe the basic parts of the compound light microscope. Page 14. The basic structure of a compound microscope falls into four main categories: The Framework The Magnification System The Focusing System and what else?
The Illumination System, The Cooling System, The Computer System, The Power System`,
  `question: Describe the basic parts of the compound light microscope. Page 15. Which part is the main vertical support of the microscope?
Base, Arm, Stage, Head`,
  `question: Describe the basic parts of the compound light microscope. Page 15. The light source of the microscope is usually built into what part?
The microscope base, The arm, The stage, The nosepiece`,
  `question: Describe the basic parts of the compound light microscope. Page 15. What part of the microscope holds the stage and its related components?
Arm, Base, Head, Oculars`,
  `question: Describe the basic parts of the compound light microscope. Page 15. What is the moveable platform on which the microscope slide is placed?
Mechanical Stage, Base, Arm, Rotating Nosepiece`,
  `question: Describe the basic parts of the compound light microscope. Page 15. The stage X and Y axis knobs allow you to move the stage in what directions?
Left/right and front/back, Up and down only, Diagonally only, In a circle`,
  `question: Describe the basic parts of the compound light microscope. Page 15. What part of the microscope holds the objectives?
Rotating Nosepiece, Mechanical Stage, Arm, Base`,
  `question: Describe the basic parts of the compound light microscope. Page 16. What part of the microscope consists of two lenses that evenly distribute and focus light onto the slide?
Abbe condenser, Field diaphragm, Light source, Filter`,
  `question: Describe the basic parts of the compound light microscope. Page 16. What part located below the Abbe condenser controls the amount of light to the condenser?
Field Diaphragm, Light source, Filter clamp, Centering adjustment`,
  `question: Describe the basic parts of the compound light microscope. Page 17. What are the main magnifiers of the compound microscope located on the rotating nosepiece?
Objectives, Oculars, Condenser, Diaphragm`,
  `question: Describe the basic parts of the compound light microscope. Page 17. What part of the microscope magnifies the intermediate image and typically has a 10x magnification?
Oculars (Eyepieces), Objectives, Condenser lens, Field lens`,
  `question: Describe the basic parts of the compound light microscope. Page 17. The distance from the oculars to the objectives is known as what?
Optical Tube Length, Working Distance, Focal Length, Field of View`,
  `question: Describe the basic parts of the compound light microscope. Page 17. What is the smaller outer knob used to obtain optimum resolution or clarity?
Fine focus knob, Coarse focus knob, Condenser knob, Stage knob`,
  `question: Describe the basic parts of the compound light microscope. Page 17. What is the large inner knob used with the 10x objective to bring objects into focus?
Coarse focus knob, Fine focus knob, Iris diaphragm control, Condenser knob`,
  `question: Discuss the function and magnification of each of the microscope objectives and the principle of illumination. Page 18. What is the formula for Total Magnification?
Ocular Magnification x Objective Magnification, Ocular Magnification + Objective Magnification, Objective Magnification / Ocular Magnification, Ocular Magnification - Objective Magnification`,
  `question: Discuss the function and magnification of each of the microscope objectives and the principle of illumination. Page 18. What is the ability to gather light and distinguish images close to each other called?
Resolution, Magnification, Contrast, Illumination`,
  `question: Discuss the function and magnification of each of the microscope objectives and the principle of illumination. Page 18. Which objective is used for initial focusing and locating the feathered edge of a slide?
Low power (10x), Medium high-dry (40x), Oil immersion (100x), Scanning (4x)`,
  `question: Discuss the function and magnification of each of the microscope objectives and the principle of illumination. Page 18. Immersion oil should never be used on which objective?
Medium high-dry (40x), Low power (10x), Oil immersion (100x), Scanning (4x)`,
  `question: Discuss the function and magnification of each of the microscope objectives and the principle of illumination. Page 18. What is the primary use of the oil immersion (100x) objective?
Identification and enumeration of cellular constituents, Initial focusing, Scanning the slide, Estimating counts`,
  `question: Discuss the function and magnification of each of the microscope objectives and the principle of illumination. Page 18. Immersion oil allows the objective lens to collect more light providing what?
High resolution of detail, Lower magnification, Increased contrast, A wider field of view`,
  `question: Discuss the function and magnification of each of the microscope objectives and the principle of illumination. Page 19. What term refers to your ability to distinguish an object from the background?
Contrast, Resolution, Magnification, Brightness`,
  `question: Discuss the function and magnification of each of the microscope objectives and the principle of illumination. Page 19. Opening or closing what part can increase or reduce the volume of light directed toward the image?
The iris diaphragm, The objective lens, The ocular lens, The coarse focus knob`,
  `question: Discuss the function and magnification of each of the microscope objectives and the principle of illumination. Page 19. What is the most utilized microscopic technique that makes objects dark against a bright background?
Bright-field microscopy, Dark-field microscopy, Phase-contrast microscopy, Polarizing microscopy`,
  `question: Discuss the function and magnification of each of the microscope objectives and the principle of illumination. Page 19. Magnification alone does not provide more information about an object unless there is also adequate resolution and what?
Contrast, Brightness, Illumination, Focus`,
  `question: Identify appropriate corrective actions when encountering routine problems with the operation of a microscope. Page 20. If an image can be seen at 10x but not at 100x what might be the problem?
You might be on the incorrect side of the slide, The objective is dirty, The ocular is dirty, The light is too low`,
  `question: Identify appropriate corrective actions when encountering routine problems with the operation of a microscope. Page 20. If fine details cannot be detected in immature cells what should be done?
Use 100x lens with diaphragm on maximum light, Use the 40x objective, Clean the oculars, Adjust the coarse focus`,
  `question: Identify appropriate corrective actions when encountering routine problems with the operation of a microscope. Page 20. If the 40x objective is blurred perhaps due to transferred oil what should you do?
Wipe off 40x lens with lint free paper, Use more immersion oil on it, Adjust the fine focus, Clean the slide`,
  `question: Identify appropriate corrective actions when encountering routine problems with the operation of a microscope. Page 20. If particles appear on the slide that are not large enough to be platelets what should be your first corrective action?
Clean the eyepiece with lens cleaner, Clean the objective lens, Replace the slide, Adjust the condenser`,
  `question: Explain standard precautions as related to biological hazards. Page 21. What is an essential part of training personnel in laboratory operations?
Safety training, Microscope use, Phlebotomy, Data entry`,
  `question: Explain standard precautions as related to biological hazards. Page 21. In hematology what are potential sources of bacterial fungal and viral infections?
Human body fluids, Chemical reagents, Electrical equipment, Glassware`,
  `question: Explain standard precautions as related to biological hazards. Page 21. Adherence to what set of guidelines is strictly enforced in the laboratory?
Standard precautions, General lab rules, Fire safety plan, Chemical hygiene plan`,
  `question: Explain standard precautions as related to biological hazards. Page 21. When working with laboratory samples what should be worn each time?
Gloves, Goggles, A face shield, A respirator`,
  `question: Explain standard precautions as related to biological hazards. Page 21. Gloves should be changed immediately when they are contaminated or what?
Damaged, Too tight, Too loose, After one hour`,
  `question: Explain standard precautions as related to biological hazards. Page 21. Laboratory gowns should be fluid-resistant and have what features?
Long sleeves and wrist cuffs, Short sleeves, No sleeves, An open back`,
  `question: Explain standard precautions as related to biological hazards. Page 21. Laboratory coats should not be worn where?
Outside the laboratory, In the breakroom, At your desk, When using the microscope`,
  `question: Explain standard precautions as related to biological hazards. Page 21. Goggles face shields and masks are all examples of what?
Splash shields, Gowns, Gloves, Lab coats`,
  `question: Explain standard precautions as related to biological hazards. Page 21. Splash shields are used to minimize exposure to body fluids and the risk of what?
Aerosols and specimen splashes, Chemical spills, Fire, Electrical shock`,
  `question: Explain standard precautions as related to biological hazards. Page 21. Biological hazards in the laboratory include bacteria fungi and what?
Viruses, Chemicals, Radiation, Fire`,
  `question: Describe safe work practices for personal protective equipment and disposal of biological hazards. Page 22. What is the first step in the decontamination protocol?
Handwashing, Removing gloves, Wiping down the bench, Disposing of sharps`,
  `question: Describe safe work practices for personal protective equipment and disposal of biological hazards. Page 22. When handwashing you should scrub your hands for at least how long?
10 to 15 seconds, 5 seconds, 30 seconds, 1 minute`,
  `question: Describe safe work practices for personal protective equipment and disposal of biological hazards. Page 22. Handwashing is expected after what action?
After gloves are removed, Before putting on gloves, At the start of the shift only, At the end of the shift only`,
  `question: Describe safe work practices for personal protective equipment and disposal of biological hazards. Page 22. What is the rule regarding fingernails in the laboratory?
Must be no longer than 1/4 inch beyond the finger edge, Can be any length, Must have nail polish, Must be kept short and unpolished`,
  `question: Describe safe work practices for personal protective equipment and disposal of biological hazards. Page 22. Which of the following is strictly forbidden in the laboratory?
Eating drinking and smoking, Talking, Listening to music, Using a computer`,
  `question: Describe safe work practices for personal protective equipment and disposal of biological hazards. Page 22. What method of pipetting is never permitted in the laboratory?
Mouth pipetting, Mechanical pipetting, Automated pipetting, Glass pipetting`,
  `question: Describe safe work practices for personal protective equipment and disposal of biological hazards. Page 22. Contaminated needles blades pipettes and glass slides must be placed in what?
Puncture-resistant containers, Regular trash cans, Red biohazard bags, Autoclave bags`,
  `question: Describe safe work practices for personal protective equipment and disposal of biological hazards. Page 22. Contaminated gloves and lab coats are placed in assigned what?
Contaminated bins (red bags), Sharps containers, Regular trash, Laundry bins`,
  `question: Describe the basic parts of the compound light microscope. Page 15. What part of the microscope serves as its handle when you need to move or transport it?
Arm, Base, Head, Stage`,
  `question: Discuss the function and magnification of each of the microscope objectives and the principle of illumination. Page 18. Higher resolution allows for what to be seen?
Greater details, A larger area, Brighter images, More colors`,
  `question: Identify appropriate corrective actions when encountering routine problems with the operation of a microscope. Page 20. If mascara has been left on the eyepiece what might you see?
Particles that appear like dust, A blurry image, A double image, A dark field`,
  `question: Explain standard precautions as related to biological hazards. Page 21. Besides blood what is another example of a potentially infectious human body fluid in the hematology lab?
Organ or joint fluids, Saliva, Tears, Sweat`,
  `question: Describe safe work practices for personal protective equipment and disposal of biological hazards. Page 22. What is the rule for long hair in the laboratory?
Must be tied back, Must be cut short, Must be covered by a hairnet, No specific rule`,
  `question: Describe safe work practices for personal protective equipment and disposal of biological hazards. Page 22. Besides notebooks and textbooks what other common items must be kept away from the mouth?
Pens and pencils, Microscopes, Centrifuges, Computers`,
  `question: Describe safe work practices for personal protective equipment and disposal of biological hazards. Page 22. What is the rule regarding beards in the laboratory?
Must be trimmed to no more than 1 inch in length, Must be clean-shaven, Must be covered by a beard net, No specific rule`,
  `question: Describe safe work practices for personal protective equipment and disposal of biological hazards. Page 22. What type of jewelry is not allowed in the laboratory?
Earrings necklaces and other dangling jewelry, Plain wedding bands, Medical alert bracelets, Watches`
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