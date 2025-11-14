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
  `question: Describe utilization of carbohydrates in a culture media. The degradation of lactose requires which two enzymes? Page 149.
ß-galactoside permease and ß-galactosidase, Lactase and sucrase, Amylase and maltase, Permease and oxidase`,
  `question: Describe utilization of carbohydrates in a culture media. A slow lactose fermenter is an organism that lacks ß-galactoside permease but possesses what enzyme? Page 149.
ß-galactosidase, Catalase, Oxidase, Urease`,
  `question: Describe utilization of carbohydrates in a culture media. Which metabolic pathway for glucose degradation begins with glucose-6-phosphate and ends with two molecules of pyruvic acid? Page 149.
Embden-Meyerhof Pathway, Entner-Doudoroff Pathway, Kreb's Cycle, Pentose Phosphate Pathway`,
  `question: Describe utilization of carbohydrates in a culture media. The O/F basal media test is used to differentiate microorganisms based on their ability to do what? Page 150.
Oxidize or ferment carbohydrates, Produce indole, Hydrolyze urea, Reduce nitrate`,
  `question: Describe utilization of carbohydrates in a culture media. Organisms that utilize carbohydrates aerobically are known as what? Page 150.
Oxidizers, Fermenters, Asaccharolytic, Anaerobes`,
  `question: Describe utilization of carbohydrates in a culture media. Organisms that do not utilize carbohydrates and instead use molecules like amino acids are called what? Page 150.
Asaccharolytic, Oxidizers, Fermenters, Autotrophs`,
  `question: Describe utilization of carbohydrates in a culture media. In O/F basal media an organism that produces acid both with and without oxygen is classified as a what? Page 151.
Oxidizer/Fermenter, Oxidizer/Nonfermenter, Nonoxidizer/Nonfermenter, Asaccharolytic`,
  `question: Describe utilization of carbohydrates in a culture media. What three sugars are present in Triple Sugar Iron (TSI) agar? Page 151.
Glucose lactose and sucrose, Glucose maltose and sucrose, Fructose galactose and lactose, Mannitol sorbitol and glucose`,
  `question: Describe utilization of carbohydrates in a culture media. On a TSI or KIA slant what reaction indicates that only glucose has been fermented? Page 152.
Alkaline slant/acid butt (K/A), Acid slant/acid butt (A/A), Alkaline slant/alkaline butt (K/K), Red slant/acid butt (R/A)`,
  `question: Describe utilization of carbohydrates in a culture media. On a TSI or KIA slant what does an acid slant/acid butt (A/A) reaction indicate? Page 152.
Lactose sucrose fermentation or both, Glucose fermentation only, No fermentation, H2S production`,
  `question: Describe utilization of carbohydrates in a culture media. On a TSI or KIA slant what does a black precipitate indicate? Page 152.
H2S production, Gas production, No fermentation, Sucrose fermentation`,
  `question: Describe utilization of carbohydrates in a culture media. The ONPG test is used to determine an organism's ability to produce which enzyme helping to identify slow lactose fermenters? Page 153.
ß-galactosidase, ß-galactoside permease, Tryptophanase, Catalase`,
  `question: Describe utilization of carbohydrates in a culture media. What does a positive ONPG test look like? Page 153.
A yellow color, A red color, A purple color, No color change`,
  `question: Discuss glucose fermentation and by-products. The Methyl Red (MR) and Voges-Proskauer (VP) tests are used to differentiate members of which bacterial family? Page 154.
Enterobacteriaceae, Staphylococcaceae, Streptococcaceae, Pseudomonadaceae`,
  `question: Discuss glucose fermentation and by-products. A positive Methyl Red (MR) test indicated by a bright red color signifies what? Page 154.
Mixed acid fermentation, Acetoin production, Glucose oxidation, Citrate utilization`,
  `question: Discuss glucose fermentation and by-products. The Voges-Proskauer (VP) test is used to detect the production of what neutral end product from glucose fermentation? Page 154.
Acetoin, Mixed acids, Hydrogen sulfide, Indole`,
  `question: Discuss amino acid utilization testing and reactions. Decarboxylase tests determine if a bacteria can remove which group from an amino acid? Page 156.
The carboxyl group, The amino group, The R group, The hydrogen atom`,
  `question: Discuss amino acid utilization testing and reactions. A positive decarboxylase test is indicated by what color change in the medium? Page 156.
Purple, Yellow, Red, No color change`,
  `question: Discuss miscellaneous testing and reactions. The ability of an organism to use sodium citrate as its sole carbon source depends on the presence of which enzyme? Page 157.
Citrate-permease, Tryptophanase, Urease, Gelatinase`,
  `question: Discuss miscellaneous testing and reactions. In the citrate utilization test a positive result is indicated by growth and what color change? Page 158.
Green to blue, Yellow to red, Red to yellow, Blue to green`,
  `question: Discuss miscellaneous testing and reactions. The DNase test is used to distinguish Serratia from Enterobacter and Staphylococcus aureus from what? Page 159.
Other species of staphylococci, Streptococci, Enterococci, Micrococci`,
  `question: Discuss miscellaneous testing and reactions. A positive DNase test is visualized as what? Page 159.
A colorless zone around the colony, A green zone around the colony, A black precipitate, A pink color change`,
  `question: Discuss miscellaneous testing and reactions. The gelatin hydrolysis test is used to determine if an organism produces which type of enzymes? Page 160.
Gelatinases, Lipases, Amylases, Catalases`,
  `question: Discuss miscellaneous testing and reactions. A positive gelatin hydrolysis test is indicated by what observation? Page 160.
The medium is liquid at 4 C, The medium is solid at 4 C, The medium turns red, The medium turns blue`,
  `question: Discuss miscellaneous testing and reactions. The indole test is used to identify organisms that can produce which enzyme? Page 161.
Tryptophanase, Catalase, Oxidase, Urease`,
  `question: Discuss miscellaneous testing and reactions. A positive indole test is indicated by what color ring after adding the reagent? Page 161.
Pink to wine-colored, Blue-green, Yellow, No color change`,
  `question: Discuss miscellaneous testing and reactions. The malonate utilization test determines if an organism can use malonate as its sole source of what? Page 162.
Carbon, Nitrogen, Sulfur, Phosphorus`,
  `question: Discuss miscellaneous testing and reactions. A positive malonate test is indicated by the bromothymol blue indicator changing from green to what color? Page 162.
Blue, Red, Yellow, Orange`,
  `question: Discuss miscellaneous testing and reactions. A positive motility test is evident by what observation in a semisolid medium? Page 163.
A diffuse zone of growth extending from the stab line, Growth only along the stab line, A color change in the medium, Gas production`,
  `question: Discuss miscellaneous testing and reactions. The nitrate reduction test is used to determine an organism's ability to reduce nitrate to what? Page 164.
Nitrite, Nitrogen gas, Ammonia, Amino acids`,
  `question: Discuss miscellaneous testing and reactions. In the nitrate reduction test if the broth turns red after adding solutions A and B what does this indicate? Page 164.
Nitrate was reduced to nitrite, Nitrate was not reduced, Nitrite was reduced to other compounds, The test is invalid`,
  `question: Discuss miscellaneous testing and reactions. In the nitrate reduction test if the broth does not turn red after adding reagents A and B but turns red after adding zinc what is the interpretation? Page 164.
Negative for nitrate reduction, Positive for nitrate reduction to nitrite, Positive for nitrate reduction to nitrogen gas, The test is inconclusive`,
  `question: Discuss miscellaneous testing and reactions. The oxidase test is used to determine the presence of what? Page 165.
Cytochrome oxidase, Catalase, Tryptophanase, Beta-galactosidase`,
  `question: Discuss miscellaneous testing and reactions. A positive oxidase test is indicated by the development of what color within 10 seconds? Page 165.
Dark purple, Bright red, Yellow, Green`,
  `question: Discuss miscellaneous testing and reactions. The urease test determines an organism's ability to hydrolyze urea into ammonia and what else? Page 166.
CO2, Water, Acid, Hydrogen sulfide`,
  `question: Discuss miscellaneous testing and reactions. A positive urease test is indicated by the phenol red indicator changing from light orange to what color? Page 166.
Magenta (pink), Yellow, Green, Blue`,
  `question: Discuss miscellaneous testing and reactions. On Lysine Iron Agar (LIA) what does an alkaline slant/alkaline butt (K/K) reaction indicate? Page 167.
Lysine decarboxylation, Lysine deamination, Glucose fermentation only, H2S production`,
  `question: Discuss miscellaneous testing and reactions. On Lysine Iron Agar (LIA) a red slant over an acid butt (R/A) indicates what? Page 167.
Lysine deamination and glucose fermentation, Lysine decarboxylation, Hydrogen sulfide production, No fermentation`,
  `question: Discuss miscellaneous testing and reactions. The MIO agar is a combination medium that tests for motility indole and what else? Page 168.
Ornithine decarboxylase, Urease, Citrate, H2S production`,
  `question: Discuss miscellaneous testing and reactions. The SIM medium is a combination test used to determine H2S production indole formation and what else? Page 168.
Motility, Ornithine decarboxylase, Urease, Citrate utilization`,
  `question: Describe rapid reporting of presumptive bacterial identification. Rapid identification systems often rely on carbohydrate utilization or what type of substrates? Page 169.
Chromogenic substrates, Amino acid substrates, Lipid substrates, Nucleic acid substrates`,
  `question: Describe rapid reporting of presumptive bacterial identification. The catalase test is used to differentiate staphylococci from what other group of organisms? Page 170.
Streptococci, Enterobacteriaceae, Pseudomonads, Neisseria`,
  `question: Describe rapid reporting of presumptive bacterial identification. The principle of the catalase test is the breakdown of hydrogen peroxide into what? Page 170.
Oxygen and water, Hydrogen and acid, Carbon dioxide and water, Peroxide and gas`,
  `question: Describe rapid reporting of presumptive bacterial identification. The bile solubility test is used for the presumptive identification of what organism? Page 170.
Streptococcus pneumoniae, Staphylococcus aureus, Enterococcus faecalis, Listeria monocytogenes`,
  `question: Describe rapid reporting of presumptive bacterial identification. The PYR test is a rapid method for identifying group A streptococci and what other genus? Page 170.
Enterococcus, Staphylococcus, Listeria, Corynebacterium`,
  `question: Describe rapid reporting of presumptive bacterial identification. The rapid hippurate hydrolysis test is used for the speciation of Streptococcus agalactiae and what other organism? Page 171.
Campylobacter jejuni, Escherichia coli, Klebsiella pneumoniae, Proteus mirabilis`,
  `question: Describe rapid reporting of presumptive bacterial identification. The MUG test is used for the presumptive identification of what organism? Page 171.
E coli, Enterococcus faecalis, Staphylococcus aureus, Streptococcus pyogenes`,
  `question: Describe rapid reporting of presumptive bacterial identification. The LAP test is used for the presumptive identification of what group of organisms? Page 171.
Catalase-negative gram-positive cocci, Catalase-positive gram-positive cocci, Gram-negative rods, Non-fermenters`,
  `question: Discuss the automated identification systems in microbiology. The API Crystal E/NF and Enterotube II systems are all examples of what? Page 172.
Manual systems for microbial identification, Automated systems, Molecular assays, Serological tests`,
  `question: Discuss the automated identification systems in microbiology. The Microscan Sensititre and Vitek systems are all examples of what? Page 174.
Automated systems for microbial identification, Manual kit systems, Rapid spot tests, Molecular assays`,
  `question: Discuss miscellaneous testing and reactions. The spot indole test uses what reagent to produce a blue to blue-green color? Page 170.
DMAC, Kovac's, Alpha-naphthol, Ninhydrin`,
  `question: Discuss miscellaneous testing and reactions. The PYR test detects the presence of what enzyme? Page 170.
Pyrrolidonyl Arylamidase, Catalase, Tryptophanase, Hippuricase`,
  `question: Describe utilization of carbohydrates in a culture media. An organism that is an oxidizer will show what result in an O/F basal media test? Page 151.
Acid production in the open tube only, Acid production in both tubes, No acid production in either tube, Gas production`,
  `question: Describe utilization of carbohydrates in a culture media. On TSI a non-fermenter would show what reaction? Page 152.
Alkaline slant/alkaline butt (K/K), Acid slant/acid butt (A/A), Alkaline slant/acid butt (K/A), Black precipitate`,
  `question: Discuss glucose fermentation and by-products. The MR and VP tests are typically performed on the same broth culture. Are the results usually inverse (one positive and one negative)? Page 154.
Yes, No, They are always both positive, They are always both negative`,
  `question: Discuss miscellaneous testing and reactions. What color is a negative citrate utilization test? Page 158.
Green, Blue, Red, Yellow`,
  `question: Discuss miscellaneous testing and reactions. The urease test is a screening test for Cryptococcus and which bacterial genus? Page 171.
Proteus, Staphylococcus, Streptococcus, Enterococcus`,
  `question: Discuss the automated identification systems in microbiology. The API and Enterotube II systems are primarily used to identify what group of organisms? Page 172.
Enterobacteriaceae, Staphylococci, Streptococci, Anaerobes`,
  `question: Discuss the automated identification systems in microbiology. The Gonochek system is designed to identify which organisms? Page 173.
Neisseria/Moraxella spp, Enterobacteriaceae, Streptococci, Yeasts`,
  `question: Discuss miscellaneous testing and reactions. On LIA a black precipitate can mask the butt reaction but always indicates what? Page 167.
H2S production, Lysine decarboxylation, Glucose fermentation, Lysine deamination`
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