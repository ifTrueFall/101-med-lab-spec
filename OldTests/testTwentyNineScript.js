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
  `question: Discuss the importance of colony morphology. The characteristics and form of bacterial colonies are known as what? Page 126.
Colony morphology, Gram stain reaction, Biochemical profile, Cellular structure`,
  `question: Discuss the importance of colony morphology. Observing colony morphology can provide what type of diagnosis in times of critical need? Page 126.
A presumptive diagnosis, A definitive diagnosis, A negative diagnosis, A final diagnosis`,
  `question: Discuss the importance of colony morphology. Being able to differentiate potential pathogens from normal flora helps to do what? Page 126.
Direct the diagnostic workup toward potential pathogens, Sterilize the culture media, Determine antibiotic resistance, Identify the patient's immune status`,
  `question: Discuss the importance of colony morphology. Correlating colony characteristics to a suspected organism can help troubleshoot errors in what systems? Page 126.
Commercial or automated systems, Specimen collection systems, LIS reporting systems, Safety management systems`,
  `question: Describe initial observation and interpretation of cultures. When is the initial observation of colony morphology on a culture plate typically performed? Page 127.
18 to 24 hours post culture, Immediately after inoculation, 48 to 72 hours post culture, After one week of incubation`,
  `question: Describe initial observation and interpretation of cultures. The comparative examination of colony morphology on various culture media is referred to as what? Page 127.
Plate reading, Gram staining, Biochemical testing, Susceptibility testing`,
  `question: Describe initial observation and interpretation of cultures. Media used for the supportive growth of most non-fastidious organisms is categorized as what? Page 127.
Supportive, Selective, Differential, Enrichment`,
  `question: Describe initial observation and interpretation of cultures. Media that grows certain organisms while inhibiting the growth of others is known as what? Page 127.
Selective, Supportive, Differential, Enrichment`,
  `question: Describe initial observation and interpretation of cultures. Media with factors that demonstrate different characteristics or reactions to identify organisms is called what? Page 127.
Differential, Selective, Supportive, Enrichment`,
  `question: Describe initial observation and interpretation of cultures. Media that enhances the growth of specific organisms is called what? Page 127.
Enrichment, Selective, Supportive, Differential`,
  `question: Describe initial observation and interpretation of cultures. Which type of agar grows most organisms including fastidious ones? Page 127.
Chocolate agar (CHOC), Blood agar (BAP), MacConkey's agar (MAC), CNA agar`,
  `question: Describe initial observation and interpretation of cultures. On MacConkey agar organisms that ferment lactose typically appear what color? Page 127.
Pink, Colorless, Green, Black`,
  `question: Describe initial observation and interpretation of cultures. On MacConkey agar organisms that do not ferment lactose appear what color? Page 127.
Colorless, Pink, Yellow, Black`,
  `question: Describe initial observation and interpretation of cultures. Klebsiella and Enterobacter species typically produce what kind of colonies on MacConkey agar? Page 127.
Large mucoid pink colonies, Small dry pink colonies, Colorless colonies, Small yellow colonies`,
  `question: Discuss the types of hemolysis on blood agar culture medium. What is the purpose of Sheep Blood Agar (SBA)? Page 128.
To support growth of most bacteria and differentiate hemolysis, To select for gram-negative bacteria, To enrich for fastidious organisms, To inhibit gram-positive bacteria`,
  `question: Discuss the types of hemolysis on blood agar culture medium. What technique uses a light source behind the plate to help visualize hemolysis? Page 134.
Transillumination, Backlighting, Direct illumination, Oblique illumination`,
  `question: Discuss the types of hemolysis on blood agar culture medium. Partial clearing of blood on a blood agar plate that results in a green discoloration is known as what? Page 135.
Alpha-hemolysis, Beta-hemolysis, Gamma-hemolysis, Delta-hemolysis`,
  `question: Discuss the types of hemolysis on blood agar culture medium. Complete clearing of red blood cells around a colony on a blood agar plate is known as what? Page 135.
Beta-hemolysis, Alpha-hemolysis, Gamma-hemolysis, Non-hemolytic`,
  `question: Discuss the types of hemolysis on blood agar culture medium. A lack of hemolysis on a blood agar plate is referred to as what? Page 135.
Non-hemolytic or Gamma-hemolysis, Alpha-hemolysis, Beta-hemolysis, Double-zone hemolysis`,
  `question: Describe the colony characteristics of microorganisms. Gram-positive bacteria generally produce what size colonies compared to gram-negative bacteria? Page 135.
Smaller, Larger, The same size, More irregular`,
  `question: Describe the colony characteristics of microorganisms. Which genus typically produces larger colonies Staphylococcus or Streptococcus? Page 135.
Staphylococcus, Streptococcus, They are the same size, It depends on the media`,
  `question: Describe the colony characteristics of microorganisms. Bacillus anthracis is known for having what type of colony form or margin? Page 136.
Filamentous, Smooth, Irregular, Rough`,
  `question: Describe the colony characteristics of microorganisms. A hazy blanket of growth on the surface of the agar is known as what? Page 136.
Swarming, Filamentous, Mucoid, Spreading`,
  `question: Describe the colony characteristics of microorganisms. Which organism is well known for its ability to swarm on culture media? Page 136.
Proteus spp, Staphylococcus aureus, Escherichia coli, Streptococcus pyogenes`,
  `question: Describe the colony characteristics of microorganisms. Colonies with "feet" or "pedicles" are a characteristic of which organism? Page 136.
Candida albicans, Proteus mirabilis, Bacillus anthracis, Diphtheroids`,
  `question: Describe the colony characteristics of microorganisms. A colony with a concave or depressed center like that sometimes seen with S. pneumoniae is described as having what elevation? Page 138.
Umbilicate, Umbonate, Convex, Raised`,
  `question: Describe the colony characteristics of microorganisms. A colony that is convex with a protruding nipple-like center often seen with diphtheroids has what type of elevation? Page 138.
Umbonate, Umbilicate, Flat, Raised`,
  `question: Describe the colony characteristics of microorganisms. What term describes a colony that light cannot pass through? Page 138.
Opaque, Transparent, Translucent, Clear`,
  `question: Describe the colony characteristics of microorganisms. Group B strep colonies are often described as semi-opaque or having what appearance? Page 138.
A bull's-eye colony, A ground-glass colony, A water droplet colony, A fried-egg colony`,
  `question: Describe the colony characteristics of microorganisms. Coagulase-negative staphylococcus typically produces colonies of what color? Page 139.
White, Gray, Yellow, Buff`,
  `question: Describe the colony characteristics of microorganisms. Enterococcus and most gram-negative rods typically produce colonies of what color? Page 139.
Gray, White, Yellow, Red`,
  `question: Describe the colony characteristics of microorganisms. How is the consistency of a bacterial colony determined? Page 139.
By touching a colony with a loop, By smelling the plate, By observing the color, By measuring the size`,
  `question: Describe the colony characteristics of microorganisms. Staphylococcus aureus colonies are known for having what kind of consistency? Page 139.
Creamy, Brittle, Dry, Waxy`,
  `question: Describe the colony characteristics of microorganisms. When touched with a loop a colony that comes entirely off the plate is described as having what consistency a trait often seen with Neisseria? Page 139.
Sticky, Brittle, Creamy, Dry`,
  `question: Describe the colony characteristics of microorganisms. Nocardia colonies often have what type of consistency? Page 139.
Brittle, Creamy, Sticky, Waxy`,
  `question: Describe the colony characteristics of microorganisms. Which organism is known for producing a green or green metallic sheen pigment on culture media? Page 140.
Pseudomonas aeruginosa, Serratia marcescens, Kluyvera, Chromobacterium violaceum`,
  `question: Describe the colony characteristics of microorganisms. A brick-red pigment is a characteristic of which organism? Page 140.
Serratia marcescens, Pseudomonas aeruginosa, Kluyvera, Prevotella melaninogenica`,
  `question: Describe the colony characteristics of microorganisms. Prevotella melaninogenica an anaerobe is known for producing what color pigment? Page 140.
Brown-black, Green, Brick red, Purple`,
  `question: Describe the colony characteristics of microorganisms. A characteristic fruity or grape-like odor is associated with which organism? Page 141.
Pseudomonas aeruginosa, Staphylococcus aureus, Proteus mirabilis, Haemophilus spp`,
  `question: Describe the colony characteristics of microorganisms. An "old sock" odor is sometimes associated with which organism? Page 141.
Staphylococcus aureus, Pseudomonas aeruginosa, Proteus mirabilis, Nocardia spp`,
  `question: Describe the colony characteristics of microorganisms. A putrid odor is often associated with which organism? Page 141.
Proteus mirabilis, Pseudomonas aeruginosa, Staphylococcus aureus, Haemophilus spp`,
  `question: Describe the colony characteristics of microorganisms. A "musty basement" odor is characteristic of which genus? Page 141.
Haemophilus spp, Nocardia spp, Proteus mirabilis, Pseudomonas aeruginosa`,
  `question: Describe the colony characteristics of microorganisms. An odor of a "freshly plowed field" is associated with which genus? Page 141.
Nocardia spp, Haemophilus spp, Staphylococcus aureus, Proteus mirabilis`,
  `question: Discuss the microbial growth in liquid media. An overall cloudiness in a liquid medium indicating microbial growth is known as what? Page 144.
Turbidity, Streamers, Scum, Sediment`,
  `question: Discuss the microbial growth in liquid media. Vinelike or puff-ball-like growth in a broth often associated with Streptococci is described as what? Page 144.
Streamers, Turbidity, Pellicle, Flocculent`,
  `question: Discuss the microbial growth in liquid media. Scum-like growth on the surface of a liquid medium is often characteristic of what? Page 144.
Yeast, Streptococci, Enterics, Anaerobes`,
  `question: Discuss the microbial growth in liquid media. The production of gas bubbles in a liquid medium is a characteristic of which group of bacteria? Page 144.
Enterics, Streptococci, Staphylococci, Yeast`,
  `question: Describe initial observation and interpretation of cultures. Chocolate agar is an enrichment medium because it contains what from lysed red blood cells? Page 129.
Hemoglobin, 5% sheep blood, Colistin and Nalidixic Acid, Crystal violet and bile salts`,
  `question: Describe initial observation and interpretation of cultures. Chocolate agar provides which factors required for the growth of Haemophilus and Neisseria? Page 129.
X Factor and V factor, Salt and peptones, Lactose and sucrose, Bile salts and neutral red`,
  `question: Describe initial observation and interpretation of cultures. Colistin Nalidixic Agar (CNA) is selective for what type of organisms? Page 129.
Gram-positive bacteria, Gram-negative bacteria, Fungi, Anaerobes`,
  `question: Describe initial observation and interpretation of cultures. What two ingredients in MacConkey agar inhibit the growth of gram-positive organisms? Page 130.
Crystal violet and bile salts, Colistin and Nalidixic Acid, Lactose and neutral red, Peptone and salt`,
  `question: Describe initial observation and interpretation of cultures. What is the pH indicator in MacConkey agar? Page 130.
Neutral red, Phenol red, Bromthymol blue, Methylene blue`,
  `question: Describe initial observation and interpretation of cultures. Hektoen Enteric (HEK) agar is selective for which two pathogens? Page 131.
Salmonella and Shigella, Staphylococcus and Streptococcus, Escherichia and Klebsiella, Neisseria and Haemophilus`,
  `question: Describe initial observation and interpretation of cultures. On Hektoen Enteric (HEK) agar colonies that appear orange are what? Page 131.
Lactose fermenters, Non-lactose fermenters, Hydrogen sulfide producers, Urease positive`,
  `question: Describe initial observation and interpretation of cultures. On Hektoen Enteric (HEK) agar what does a black precipitate in the center of a colony indicate? Page 131.
H2S production, Lactose fermentation, Sucrose fermentation, Salicin fermentation`,
  `question: Describe initial observation and interpretation of cultures. Modified Thayer-Martin (MTM) agar is selective for which organisms? Page 132.
Neisseria gonorrhoeae and Neisseria meningitidis, Salmonella and Shigella, Staphylococcus and Streptococcus, Enterococcus and Listeria`,
  `question: Describe initial observation and interpretation of cultures. What antibiotic in MTM agar inhibits Proteus species from swarming? Page 132.
Trimethoprim, Vancomycin, Colistin, Nystatin`,
  `question: Describe initial observation and interpretation of cultures. What is the purpose of Thioglycollate Broth? Page 133.
Supportive for aerobic anaerobic microaerophilic and fastidious organisms, To select for gram-negative rods, To differentiate lactose fermenters, To grow only fungi`,
  `question: Describe initial observation and interpretation of cultures. In Thioglycollate broth where would a strictly aerobic organism grow? Page 133.
Toward the top of the broth, Throughout the broth, In the bottom of the broth, As puff balls`,
  `question: Describe initial observation and interpretation of cultures. In Thioglycollate broth where would a strictly anaerobic organism grow? Page 133.
In the bottom of the broth, Toward the top of the broth, Throughout the broth, Only on the surface`
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