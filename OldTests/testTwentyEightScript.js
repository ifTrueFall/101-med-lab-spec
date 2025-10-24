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
  `question: Define the terms associated with sterilization disinfection and antiseptic. Which early scientist demonstrated that handwashing can prevent disease? Page 7.
Semmelweis, Lister, Pasteur, Koch`,
  `question: Define the terms associated with sterilization disinfection and antiseptic. What is the definition of sterilization? Page 7.
The destruction of all forms of life, The elimination of a defined scope of microorganisms, A substance applied to the skin, A chemical applied to inanimate objects`,
  `question: Define the terms associated with sterilization disinfection and antiseptic. What is the definition of disinfection? Page 7.
The elimination of a defined scope of microorganisms, The destruction of all forms of life, The reduction of bacteria on the skin, The removal of all spores`,
  `question: Define the terms associated with sterilization disinfection and antiseptic. A chemical agent applied to an inanimate object is known as a what? Page 7.
Disinfectant, Antiseptic, Sterilant, Surfactant`,
  `question: Define the terms associated with sterilization disinfection and antiseptic. What is a substance applied to the skin to eliminate or reduce bacteria called? Page 7.
Antiseptic, Disinfectant, Chemosterilizer, Detergent`,
  `question: Define the terms associated with sterilization disinfection and antiseptic. Antiseptics are unable to kill what form of microbial life? Page 7.
Spores, Bacteria, Fungi, Viruses`,
  `question: Describe the factors that influence the degree of killing microorganisms. For alcohol and iodine preparations to be effective what is the minimum required contact time? Page 10.
1 to 2 minutes, 30 seconds, 5 minutes, 10 seconds`,
  `question: Describe the factors that influence the degree of killing microorganisms. Disinfectants are generally most effective at what temperature? Page 10.
Room temperature (20-22 C), Refrigerated temperature (4 C), Body temperature (37 C), Boiling temperature (100 C)`,
  `question: Describe the factors that influence the degree of killing microorganisms. In general what is the relationship between temperature and the killing of microorganisms? Page 10.
The higher the temperature the better the killing, The lower the temperature the better the killing, Temperature has no effect on killing, Only extreme cold is effective`,
  `question: Describe the factors that influence the degree of killing microorganisms. A community of microorganisms living within a shared mass of secreted slime is called what? Page 10.
A biofilm, A colony, An agar, A culture`,
  `question: Describe the factors that influence the degree of killing microorganisms. When two disinfectants work better together than they do alone this is known as what? Page 10.
Synergy, Antagony, Compatibility, Neutralization`,
  `question: Describe the factors that influence the degree of killing microorganisms. When two disinfectants inactivate each other this is known as what? Page 10.
Antagony, Synergy, Saturation, Potentiation`,
  `question: Describe the methods used in disinfection and sterilization. The agent used in autoclaves to sterilize materials is what? Page 11.
Moist heat under pressure, Dry heat, Ionizing radiation, Ethylene oxide gas`,
  `question: Describe the methods used in disinfection and sterilization. At what temperature and for how long are materials typically autoclaved to achieve sterilization? Page 11.
121 C for 15 min, 100 C for 30 min, 160 C for 2 hours, 72 C for 15 sec`,
  `question: Describe the methods used in disinfection and sterilization. Which physical method of microbial control achieves disinfection but not sterilization? Page 11.
Boiling, Autoclaving, Dry heat oven, Ionizing radiation`,
  `question: Describe the methods used in disinfection and sterilization. Pasteurization is a method used for disinfection of what? Page 11.
Food, Glassware, Surgical instruments, Disposables`,
  `question: Describe the methods used in disinfection and sterilization. Which type of radiation has a short wavelength and high energy giving it high penetrance for sterilization? Page 11.
Ionizing, Nonionizing, Ultraviolet, Infrared`,
  `question: Describe the methods used in disinfection and sterilization. Which type of radiation has a long wavelength and low energy making it suitable for disinfecting surfaces? Page 11.
Nonionizing, Ionizing, Gamma rays, Electron beams`,
  `question: Describe the methods used in disinfection and sterilization. Which of the following is NOT a way that chemosterilizers exert their killing effect? Page 11.
Enhancing replication, Denaturing cellular proteins, Damaging RNA and DNA, Reacting with cytoplasmic membrane components`,
  `question: Describe the methods used in disinfection and sterilization. What is the primary mechanism of action for alcohols like ethyl and isopropyl alcohol? Page 12.
Denaturing proteins, Disrupting the cell membrane, Alkylating nucleic acids, Oxidizing cellular components`,
  `question: Describe the methods used in disinfection and sterilization. Formaldehyde is typically used as a 37% aqueous solution known as what? Page 12.
Formalin, Glutaraldehyde, Phenol, Alcohol`,
  `question: Describe the methods used in disinfection and sterilization. The usefulness of formaldehyde is limited by its irritability and its potential to be what? Page 12.
A carcinogen, An explosive, Corrosive, Inactivated by organics`,
  `question: Describe the methods used in disinfection and sterilization. Glutaraldehyde works by causing alkylation of RNA and DNA via what chemical groups? Page 12.
Sulfhydryl groups, Amino groups, Carboxyl groups, Hydroxyl groups`,
  `question: Describe the methods used in disinfection and sterilization. What is an iodophor? Page 12.
Iodine and a neutral polymer carrier, A solution of pure iodine, An iodine and alcohol mixture, A type of detergent`,
  `question: Describe the methods used in disinfection and sterilization. What is the most common and best-known iodophor used as a preoperative skin prep? Page 12.
Povidone-iodine, Tincture of iodine, Lugol's solution, Chlorine`,
  `question: Describe the methods used in disinfection and sterilization. Sodium hypochlorite is the chemical name for what common disinfectant? Page 12.
Bleach, Vinegar, Alcohol, Ammonia`,
  `question: Describe the methods used in disinfection and sterilization. What is a major disadvantage of using sodium hypochlorite (bleach)? Page 12.
It is inactivated by organic matter, It is very expensive, It has a narrow spectrum of activity, It is not effective against viruses`,
  `question: Describe the methods used in disinfection and sterilization. Quaternary ammonium compounds are surface-active agents also known as what? Page 12.
Detergents, Alcohols, Aldehydes, Phenolics`,
  `question: Describe the methods used in disinfection and sterilization. Quaternary ammonium compounds disrupt cell membranes which causes what to happen? Page 12.
Cell leakage, Protein denaturation, DNA damage, Enzyme inactivation`,
  `question: Describe the methods used in disinfection and sterilization. The original phenolic compound phenol is also known as what? Page 13.
Carbolic acid, Acetic acid, Hydrochloric acid, Citric acid`,
  `question: Describe the methods used in disinfection and sterilization. What is the mechanism of action for phenolic compounds? Page 13.
Disrupt cell walls and precipitate proteins, Denature nucleic acids, Inhibit cell wall synthesis, Block metabolic pathways`,
  `question: Describe the methods used in disinfection and sterilization. Chlorhexidine gluconate is sensitive to what factor? Page 13.
pH, Temperature, Light, Organic material`,
  `question: Describe the methods used in disinfection and sterilization. Hexachlorophene is primarily effective against which type of bacteria? Page 13.
Gram-positive bacteria, Gram-negative bacteria, Acid-fast bacteria, Spores`,
  `question: Describe the methods used in disinfection and sterilization. Which phenolic compound is available by prescription only due to its toxic effects? Page 13.
Hexachlorophene, Chloroxylenol, Triclosan, Phenol`,
  `question: Describe the methods used in disinfection and sterilization. What is the primary use for Triclosan? Page 13.
A hand wash and surgical scrub, Surface disinfection, Sterilizing instruments, Water purification`,
  `question: Describe the methods used in disinfection and sterilization. Heavy metals like silver nitrate are rarely used today due to their toxicity and role as what? Page 14.
Pollutants, Carcinogens, Allergens, Mutagens`,
  `question: Describe the methods used in disinfection and sterilization. A substance that prevents the growth of bacteria without killing them is described as what? Page 14.
Bacteriostatic, Bactericidal, Sporicidal, Virucidal`,
  `question: Describe the methods used in disinfection and sterilization. What is the most common gas used for sterilizing materials that cannot withstand steam? Page 14.
Ethylene oxide, Vaporized hydrogen peroxide, Formaldehyde gas, Nitrogen dioxide`,
  `question: Describe the methods used in disinfection and sterilization. What is a major hazard associated with using ethylene oxide? Page 14.
It is an explosive hazard, It is highly corrosive, It is a liquid at room temperature, It is inactivated by plastic`,
  `question: Describe the methods used in disinfection and sterilization. Ethylene oxide kills microorganisms through what chemical process? Page 14.
Alkylation of nucleic acids, Denaturation of proteins, Oxidation of cell walls, Disruption of membranes`,
  `question: Describe the methods used in disinfection and sterilization. The goal of hygienic hand washing is to eliminate what? Page 14.
Transient flora, Resident flora, All microorganisms, Only viruses`,
  `question: Describe the methods used in disinfection and sterilization. The objective of a surgical hand scrub is to eliminate transient flora and what else? Page 14.
Most resident flora, Only pathogenic bacteria, All spores, Biofilms`,
  `question: Distinguish chemical agents as disinfectants or antiseptics. Ethyl and isopropyl alcohol are used for what purpose in hospitals? Page 11.
Disinfection, Sterilization, Decontamination, Antisepsis`,
  `question: Distinguish chemical agents as disinfectants or antiseptics. Povidone-iodine is a well-known preoperative skin prep making it an example of a what? Page 12.
Antiseptic, Disinfectant, Sterilant, Detergent`,
  `question: Distinguish chemical agents as disinfectants or antiseptics. Sodium hypochlorite (bleach) is generally used for what purpose? Page 12.
Surface decontamination, Skin antisepsis, Sterilizing heat-sensitive items, Air purification`,
  `question: Distinguish chemical agents as disinfectants or antiseptics. Quaternary ammonium compounds are generally used on noncritical surfaces making them what? Page 12.
Disinfectants, Antiseptics, Sterilants, Chemosterilizers`,
  `question: Distinguish chemical agents as disinfectants or antiseptics. Chloroxylenol is used primarily in what type of applications? Page 13.
Skin applications, Surface disinfection, Instrument sterilization, Food preservation`,
  `question: Distinguish chemical agents as disinfectants or antiseptics. Silver nitrate was previously used prophylactically as an antiseptic for what condition in newborns? Page 14.
Gonococcal conjunctivitis, Diaper rash, Skin infections, Oral thrush`,
  `question: Describe the methods used in disinfection and sterilization. What does "sporicidal" mean? Page 12.
Kills spores, Prevents spore growth, Ineffective against spores, Only kills vegetative cells`,
  `question: Describe the factors that influence the degree of killing microorganisms. Do spores require more or less contact time with disinfectants compared to vegetative bacteria? Page 10.
Much longer, Much shorter, The same amount, It does not matter`,
  `question: Describe the methods used in disinfection and sterilization. Which two alcohols are most effectively and regularly used in hospitals? Page 11.
Ethyl alcohol and Isopropyl alcohol, Methyl alcohol and Ethyl alcohol, Propyl alcohol and Butyl alcohol, Isopropyl alcohol and Methyl alcohol`,
  `question: Define the terms associated with sterilization disinfection and antiseptic. Which scientist is credited with the idea of using chemicals to sterilize the air and wound dressings? Page 7.
Lister, Semmelweis, Pasteur, Koch`,
  `question: Describe the methods used in disinfection and sterilization. Iodophors require proper dilution because their effectiveness depends on the presence of what? Page 12.
Free iodine, Bound iodine, The polymer carrier, Alcohol`,
  `question: Describe the methods used in disinfection and sterilization. Are alcohols like ethyl and isopropyl alcohol sporicidal? Page 11.
No, Yes, Only at high concentrations, Only with long exposure`,
  `question: Describe the methods used in disinfection and sterilization. Which gas sterilant is primarily used in manufacturing for pharmaceutical and medical devices? Page 14.
Vaporized hydrogen peroxide, Ethylene oxide, Chlorine gas, Formaldehyde`,
  `question: Distinguish chemical agents as disinfectants or antiseptics. Chlorhexidine gluconate can cause severe skin reactions in which patient population? Page 13.
Infants younger than 2 months, Elderly adults, Immunocompromised patients, Pregnant women`,
  `question: Describe the methods used in disinfection and sterilization. A tincture is a solution that contains what solvent? Page 12.
Alcohol, Water, Acetone, Glycerin`,
  `question: Describe the factors that influence the degree of killing microorganisms. What is the typical shelf life of a diluted sodium hypochlorite (bleach) solution? Page 12.
30 days max, 24 hours, 7 days, 1 year`,
  `question: Describe the methods used in disinfection and sterilization. Which class of chemical agents is stable biodegradable and active in the presence of organic matter? Page 13.
Phenolics, Alcohols, Aldehydes, Halogens`,
  `question: Describe the methods used in disinfection and sterilization. Waterless hand rubs are appropriate to use when there is no what? Page 14.
Visible soiling, Patient contact, Entry to a high-risk area, Time for hand washing`
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