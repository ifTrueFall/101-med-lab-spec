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
  `question: Determine the elements included in an exposure control plan. A laboratory safety program must be updated how often for all employees? Page 18.
Annually, Every two years, Monthly, Only for new hires`,
  `question: Determine the elements included in an exposure control plan. An exposure control plan is a requirement of which regulatory agency? Page 18.
OSHA, CDC, WHO, CLSI`,
  `question: Determine the elements included in an exposure control plan. How often must an exposure control plan be reviewed? Page 18.
Annually, Monthly, Every two years, Only when an incident occurs`,
  `question: Determine the elements included in an exposure control plan. An exposure control plan must be available to whom? Page 18.
All employees, Only management, OSHA inspectors, The safety officer`,
  `question: Differentiate standard precautions and transmission-based precautions. The central concept of standard precautions is to treat all blood and body fluids as what? Page 19.
Infectious, Sterile, Contaminated, Non-hazardous`,
  `question: Differentiate standard precautions and transmission-based precautions. What is the only body fluid that is an exception to standard precautions? Page 19.
Sweat, Saliva, Urine, Tears`,
  `question: Differentiate standard precautions and transmission-based precautions. Which of the following is NOT addressed by standard precautions? Page 19.
Patient isolation, Hand washing, Gloves, Appropriate sharps disposal`,
  `question: Differentiate standard precautions and transmission-based precautions. MRSA and Clostridium difficile are examples of organisms requiring what type of precautions? Page 19.
Contact precautions, Airborne precautions, Droplet precautions, Standard precautions`,
  `question: Differentiate standard precautions and transmission-based precautions. Neisseria meningitidis is an example of an organism requiring what type of precautions? Page 19.
Droplet precautions, Airborne precautions, Contact precautions, Enteric precautions`,
  `question: Differentiate standard precautions and transmission-based precautions. Which of the following microorganisms requires airborne precautions? Page 19.
Mycobacterium tuberculosis, MRSA, Clostridium difficile, Neisseria meningitidis`,
  `question: Describe engineering and work practice controls and personal protective equipment (PPE). Which of the following is an example of an engineering control? Page 19.
Eye wash stations, Frequent hand washing, Wearing gloves, No mouth pipetting`,
  `question: Describe engineering and work practice controls and personal protective equipment (PPE). Negative air pressure in a laboratory is an example of what type of control? Page 19.
An engineering control, A work practice control, PPE, A standard precaution`,
  `question: Describe engineering and work practice controls and personal protective equipment (PPE). Prohibiting eating drinking and smoking in the laboratory is an example of what? Page 19.
A work practice control, An engineering control, Personal protective equipment, A standard precaution`,
  `question: Describe engineering and work practice controls and personal protective equipment (PPE). What is the proper work practice for disposing of used needles? Page 19.
Dispose in a puncture-resistant container without recapping, Recap and place in biohazard bag, Bend the needle before disposal, Place in regular trash`,
  `question: Describe engineering and work practice controls and personal protective equipment (PPE). Gloves lab coats and masks are all examples of what? Page 20.
Personal Protective Equipment (PPE), Engineering controls, Work practice controls, Biologic safety cabinets`,
  `question: Describe engineering and work practice controls and personal protective equipment (PPE). When must PPE be worn? Page 20.
When potential for exposure exists, At all times in the lab, Only when handling known pathogens, During emergencies only`,
  `question: Discuss the World Health Organization (WHO) classification of infectious microorganisms. An organism in WHO Risk Group 1 is described as having what level of risk? Page 21.
No or Low Individual and Community Risk, Moderate Individual Risk Low Community Risk, High Individual Risk Low Community Risk, High Individual and Community Risk`,
  `question: Discuss the World Health Organization (WHO) classification of infectious microorganisms. An organism that can cause human disease but is unlikely to be a serious hazard belongs to which WHO Risk Group? Page 21.
Risk Group 2, Risk Group 1, Risk Group 3, Risk Group 4`,
  `question: Discuss the World Health Organization (WHO) classification of infectious microorganisms. An organism that usually causes serious human disease but does not ordinarily spread between individuals belongs to which WHO Risk Group? Page 21.
Risk Group 3, Risk Group 2, Risk Group 1, Risk Group 4`,
  `question: Discuss the World Health Organization (WHO) classification of infectious microorganisms. An organism that usually causes serious human disease and can be readily transmitted belongs to which WHO Risk Group? Page 21.
Risk Group 4, Risk Group 3, Risk Group 2, Risk Group 1`,
  `question: Discuss the World Health Organization (WHO) classification of infectious microorganisms. What is the first step in the CDC's guidelines for safe work practices? Page 21.
Identify the hazards associated with an infectious agent, Evaluate and prioritize risks, Develop and implement controls, Consider the competencies of personnel`,
  `question: Describe types of biosafety cabinets. What is the primary purpose of a Biological Safety Cabinet (BSC)? Page 22.
To protect from aerosol transmission of organisms, To sterilize equipment, To store hazardous chemicals, To incubate cultures`,
  `question: Describe types of biosafety cabinets. In a Class I biosafety cabinet when is the air filtered? Page 22.
BEFORE being exhausted, AFTER reaching the work surface, BEFORE and AFTER the work surface, It is not filtered`,
  `question: Describe types of biosafety cabinets. Which class of biosafety cabinet is the most common in clinical labs and filters air before and after it reaches the work surface? Page 22.
Class II, Class I, Class III, Class IV`,
  `question: Describe types of biosafety cabinets. Which class of biosafety cabinet is a self-contained ventilated system for highly infectious microorganisms? Page 22.
Class III, Class I, Class II, A fume hood`,
  `question: Describe categories of biosafety levels. Agents that are well-classified and not known to cause disease require which Biosafety Level? Page 23.
BSL-1, BSL-2, BSL-3, BSL-4`,
  `question: Describe categories of biosafety levels. Staphylococcus aureus and HBV are examples of agents that require which Biosafety Level? Page 23.
BSL-2, BSL-1, BSL-3, BSL-4`,
  `question: Describe categories of biosafety levels. Agents with potential for aerosol transmission that may have serious lethal consequences like Mycobacterium tuberculosis require which Biosafety Level? Page 23.
BSL-3, BSL-2, BSL-1, BSL-4`,
  `question: Describe categories of biosafety levels. Dangerous and exotic pathogens like the Marburg virus must be handled at which Biosafety Level? Page 23.
BSL-4, BSL-3, BSL-2, BSL-1`,
  `question: Describe categories of biosafety levels. Which Biosafety Level requires decontamination of the room and personnel after use? Page 23.
BSL-4, BSL-3, BSL-2, BSL-1`,
  `question: Describe hazardous waste. What is the definition of hazardous waste? Page 24.
Substances that pose a threat to human health, Any waste generated by a lab, Only chemical waste, Only infectious waste`,
  `question: Describe hazardous waste. Which organization provides the Clinical Laboratory Waste Management Approved Guideline? Page 24.
CLSI, OSHA, CDC, WHO`,
  `question: Describe hazardous waste. What are the two most common methods for disposing of infectious waste? Page 24.
Autoclaving or incineration, Burial in a landfill, Disposal in regular trash, Chemical disinfection`,
  `question: Describe hazardous waste. What is one way to reduce hazardous waste in the laboratory? Page 25.
Substitute less hazardous chemicals when possible, Mix all waste types together, Order chemicals in bulk, Use more of each chemical`,
  `question: Interpret information contained in Safety Data Sheets (SDS). What regulation provides for a chemical hygiene plan for employees? Page 26.
Employee Right to Know, Hazardous Waste Operations, Bloodborne Pathogens Standard, Respiratory Protection Standard`,
  `question: Interpret information contained in Safety Data Sheets (SDS). What system's hazard rating diamond must be used to label all hazardous chemicals? Page 26.
NFPA, OSHA, CLSI, WHO`,
  `question: Interpret information contained in Safety Data Sheets (SDS). On the NFPA hazard rating diamond what does the blue section represent? Page 26.
Health hazard, Fire hazard, Reactivity, Specific hazard`,
  `question: Interpret information contained in Safety Data Sheets (SDS). On the NFPA hazard rating diamond what does the red section represent? Page 26.
Fire hazard, Health hazard, Reactivity, Specific hazard`,
  `question: Interpret information contained in Safety Data Sheets (SDS). On the NFPA hazard rating diamond what does the yellow section represent? Page 26.
Reactivity, Fire hazard, Health hazard, Specific hazard`,
  `question: Interpret information contained in Safety Data Sheets (SDS). A '4' in the health hazard section of the NFPA diamond indicates what level of danger? Page 26.
Deadly, Extreme danger, Hazardous, Slightly hazardous`,
  `question: Interpret information contained in Safety Data Sheets (SDS). Who provides the Safety Data Sheets (SDS) for a chemical? Page 27.
The manufacturer, The laboratory manager, OSHA, The CDC`,
  `question: Interpret information contained in Safety Data Sheets (SDS). Which of the following pieces of information is found on an SDS? Page 27.
Emergency and first aid procedures, The cost of the chemical, The date of manufacture, The laboratory's inventory level`,
  `question: Describe the components of basic fire safety within the microbiology laboratory. In the fire safety acronym RACE what does the 'R' stand for? Page 30.
Rescue, Report, React, Respond`,
  `question: Describe the components of basic fire safety within the microbiology laboratory. In the fire safety acronym RACE what does the 'A' stand for? Page 30.
Alarm, Alert, Assemble, Assess`,
  `question: Describe the components of basic fire safety within the microbiology laboratory. In the fire safety acronym RACE what does the 'C' stand for? Page 30.
Contain, Control, Communicate, Clear`,
  `question: Describe the components of basic fire safety within the microbiology laboratory. In the fire safety acronym RACE what does the 'E' stand for? Page 30.
Extinguish, Evacuate, Escape, Exit`,
  `question: Describe the components of basic fire safety within the microbiology laboratory. A Class A fire extinguisher is used for fires involving what type of materials? Page 30.
Ordinary combustibles like wood and paper, Flammable liquids and gases, Electrical equipment, Combustible metals`,
  `question: Describe the components of basic fire safety within the microbiology laboratory. A Class B fire extinguisher is used for fires involving what type of materials? Page 30.
Flammable liquids and gases, Ordinary combustibles, Electrical equipment, Radioactive materials`,
  `question: Describe the components of basic fire safety within the microbiology laboratory. A Class C fire extinguisher is used for fires involving what? Page 30.
Electrical equipment, Flammable liquids, Wood and paper, Greases`,
  `question: Describe the components of basic fire safety within the microbiology laboratory. Where should compressed gas cylinders be stored? Page 30.
Secured and in vented areas, Alphabetically, In the main laboratory, Near an exit`,
  `question: Describe engineering and work practice controls and personal protective equipment (PPE). What are the two major sources of biologic hazards in the lab? Page 20.
Processing patient specimens and handling active cultures, Chemical spills and fires, Broken glass and sharps, Electrical and ergonomic hazards`,
  `question: Describe hazardous waste. How should infectious waste be segregated from other trash? Page 25.
Place in appropriate containers labeled with a biohazard symbol, Place in any sealed container, Double-bag in regular trash bags, No segregation is needed`,
  `question: Interpret information contained in Safety Data Sheets (SDS). What information is NOT found on an SDS? Page 27.
Cost of the chemical, Nature of the chemical, First aid procedures, Spill cleanup procedures`,
  `question: Describe the components of basic fire safety within the microbiology laboratory. What is the proper way to lift heavy objects to prevent back injury? Page 31.
Use legs to lift not the back, Bend at the waist, Lift quickly, Twist while lifting`,
  `question: Determine the elements included in an exposure control plan. What vaccination is recommended for all microbiology personnel? Page 31.
Hepatitis B, Measles Mumps Rubella, Tetanus, Influenza`,
  `question: Describe the components of basic fire safety within the microbiology laboratory. What does TJC stand for? Page 31.
The Joint Commission, The Job Committee, The Judicial Council, The Journey Continues`,
  `question: Describe hazardous waste. Which chemical used in the lab is listed as a potential or proven carcinogen? Page 26.
Formaldehyde, Methanol, Acetone, Hydrogen peroxide`,
  `question: Describe categories of biosafety levels. Bacillus subtilis is an example of an organism handled at which biosafety level? Page 23.
BSL-1, BSL-2, BSL-3, BSL-4`,
  `question: Interpret information contained in Safety Data Sheets (SDS). How should chemicals be stored in the laboratory? Page 29.
According to compatibility, Alphabetically, By date of purchase, By frequency of use`,
  `question: Describe the components of basic fire safety within the microbiology laboratory. What type of plug should all electrical equipment have? Page 31.
Grounded three-prong plugs, Two-prong plugs, Plugs with adapters, Any plug is acceptable`
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