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
  `question: What is the minimum amount of energy required to activate atoms or molecules for a chemical transformation?
Activation Energy, Kinetic Energy, Potential Energy, Free Energy`,
  `question: What is the specific region of an enzyme where a substrate binds?
Active Site, Allosteric Site, Binding Pocket, Catalytic Cleft`,
  `question: A substance like a chloride ion that increases the activity of an enzyme is known as what?
Activator, Inhibitor, Coenzyme, Substrate`,
  `question: What is an enzyme whose activity changes when an effector binds to a nonactive site called?
Allosteric Enzyme, Isoenzyme, Apoenzyme, Holoenzyme`,
  `question: What is the term for a protein that combines with a coenzyme to form an active enzyme?
Apoenzyme, Holoenzyme, Proenzyme, Isoenzyme`,
  `question: What are the freely diffusing organic compounds that function as cofactors with enzymes called?
Coenzyme, Activator, Inhibitor, Substrate`,
  `question: What is the general term for a non-protein chemical that assists with a biological chemical reaction?
Cofactor, Ligand, Product, Hormone`,
  `question: An inhibitor that is similar in structure to the substrate and binds to the active site is known as what?
Competitive Inhibitor, Noncompetitive Inhibitor, Uncompetitive Inhibitor, Allosteric Inhibitor`,
  `question: Enzymes that are always present in a cell performing a metabolic function are called what?
Constitutive Enzymes, Inducible Enzymes, Allosteric Enzymes, Proenzymes`,
  `question: Biological molecules that significantly speed up the rate of chemical reactions in cells are known as what?
Enzymes, Hormones, Antibodies, Receptors`,
  `question: What is the temporary molecule formed when an enzyme comes into perfect contact with its substrate?
Enzyme-substrate ES Complex, Holoenzyme, Product Complex, Activated Complex`,
  `question: When the reaction rate declines and becomes dependent on substrate concentration what kind of kinetics is the reaction following?
First-order Kinetics, Zero-order Kinetics, Second-order Kinetics, Michaelis-Menten Kinetics`,
  `question: What is the term for an active enzyme consisting of its protein component and its coenzyme?
Holoenzyme, Apoenzyme, Isoenzyme, Zymogen`,
  `question: An enzyme that utilizes water to break a chemical bond belongs to which class?
Hydrolase, Transferase, Oxidoreductase, Ligase`,
  `question: What is the general term for substances that bind to an enzyme and cause a loss of activity without damaging the protein structure?
Inhibitor, Activator, Cofactor, Substrate`,
  `question: What are homologous enzymes that catalyze the same reaction but differ in structure called?
Isoenzyme, Isoform, Allosteric Enzyme, Proenzyme`,
  `question: What is the term for functionally similar proteins that have a similar but not identical amino acid sequence?
Isoform, Isoenzyme, Homolog, Analog`,
  `question: In acute myocardial infarction when serum levels of LD1 are greater than LD2 this is known as what?
LD Flipped Pattern, Isoenzyme Shift, Cardiac Profile, Enzyme Cascade`,
  `question: What type of inhibitor binds to a site other than the active site?
Noncompetitive Inhibitor, Competitive Inhibitor, Uncompetitive Inhibitor, Substrate Analog`,
  `question: An enzyme that acts as a catalyst for oxidation and reduction of compounds belongs to which class?
Oxidoreductase, Hydrolase, Transferase, Isomerase`,
  `question: What is an enzyme precursor that requires a biochemical change to become active called?
Proenzyme Zymogen, Apoenzyme, Holoenzyme, Coenzyme`,
  `question: An enzyme that catalyzes the transfer of a chemical group from one substrate to another belongs to which class?
Transferase, Hydrolase, Lyase, Ligase`,
  `question: An inhibitor that only binds to the enzyme-substrate complex is known as what?
Uncompetitive Inhibitor, Competitive Inhibitor, Noncompetitive Inhibitor, Reversible Inhibitor`,
  `question: When the reaction rate is constant and depends only on enzyme concentration this is known as what?
Zero-Order Kinetics, First-order Kinetics, Second-order Kinetics, Reaction Saturation`,
  `question: A noncompetitive inhibitor binds to what specific site on an enzyme?
An allosteric site, The active site, The substrate binding site, The product release site`,
  `question: Can the effect of a noncompetitive inhibitor be overcome by adding more substrate?
No it cannot be overcome by adding substrate, Yes it is easily overcome, Only at low inhibitor concentrations, Only at high temperatures`,
  `question: Competitive inhibition occurs because the inhibitor and the substrate compete for what?
The enzyme active site, The allosteric site, The coenzyme, The product`,
  `question: A competitive inhibitor often has a structure that resembles what?
The natural substrate, The enzyme's active site, The coenzyme, The product`,
  `question: The degree of competitive inhibition depends on the relative concentrations of the inhibitor and what else?
The substrate, The product, The enzyme, The cofactor`,
  `question: How is competitive inhibition typically overcome?
By increasing substrate concentration, By increasing inhibitor concentration, By removing the coenzyme, By lowering the temperature`,
  `question: What happens to enzyme activity if a competitive inhibitor is in excess or binds more strongly than the substrate?
Enzyme activity will be greatly decreased, Enzyme activity will be greatly increased, The enzyme becomes permanently denatured, There is no effect on activity`,
  `question: An uncompetitive inhibitor binds to what specific molecular complex?
The enzyme-substrate complex, The free enzyme only, The substrate only, The coenzyme`,
  `question: In uncompetitive inhibition what is the effect of increasing the substrate concentration?
It increases the inhibition, It decreases the inhibition, It has no effect on inhibition, It reverses the inhibition`,
  `question: Does an uncompetitive inhibitor bind to the free enzyme?
No it only binds to the ES complex, Yes it binds strongly to the free enzyme, Only when substrate is absent, Only at a low pH`,
  `question: Which type of inhibitor does not prevent the substrate from binding to the enzyme?
Noncompetitive Inhibitor, Competitive Inhibitor, Substrate analog, Active site blocker`,
  `question: A noncompetitive inhibitor works by changing the shape of what part of the enzyme?
The active site, The polypeptide backbone, The coenzyme, The substrate itself`,
  `question: Why are competitive inhibitors often referred to as structural analogs?
They resemble the structure of the natural substrate, They are analogs of the enzyme, They have a similar structure to the product, They mimic the transition state`,
  `question: If a natural substrate is present in excess what is the effect on competitive inhibition?
There will be little inhibition, Inhibition will be maximal, The enzyme will be saturated with inhibitor, The reaction will stop completely`,
  `question: What is a key difference between noncompetitive and uncompetitive inhibition?
Noncompetitive binds the enzyme while uncompetitive binds the ES complex, Noncompetitive is reversible while uncompetitive is not, Noncompetitive affects Vmax while uncompetitive affects Km, Noncompetitive binds the active site while uncompetitive binds the allosteric site`,
  `question: Which type of inhibitor can be overcome by adding a large excess of substrate?
Competitive Inhibitor, Noncompetitive Inhibitor, Uncompetitive Inhibitor, Irreversible Inhibitor`,
  `question: Which inhibitor's effectiveness increases as substrate concentration increases?
Uncompetitive Inhibitor, Competitive Inhibitor, Noncompetitive Inhibitor, Allosteric activator`,
  `question: A molecule that binds to an enzyme's allosteric site and reduces its activity is what type of inhibitor?
Noncompetitive Inhibitor, Competitive Inhibitor, Uncompetitive Inhibitor, Feedback Inhibitor`,
  `question: Can a competitive inhibitor bind to the enzyme at the same time as the substrate?
No they compete for the same site, Yes they bind at different sites, Only if the coenzyme is present, Only at the allosteric site`,
  `question: In a reaction following first-order kinetics the rate is proportional to what?
The concentration of substrate, The concentration of enzyme, The concentration of product, The temperature`,
  `question: For an enzyme to be active it may need to combine with a coenzyme to form what?
A holoenzyme, An apoenzyme, A zymogen, An isoform`,
  `question: What must a proenzyme or zymogen undergo to become an active enzyme?
A biochemical change like hydrolysis, Binding to a substrate, Association with an inhibitor, A change in temperature`,
  `question: An allosteric enzyme is regulated by effectors that bind to what?
A nonactive site on the enzyme, The active site, The substrate, The product`,
  `question: In zero-order kinetics the reaction rate is independent of what?
Substrate concentration, Enzyme concentration, Temperature, pH`,
  `question: What class of enzyme is a hydrolase?
An enzyme that uses water to break a bond, An enzyme that transfers a group, An enzyme that oxidizes a compound, An enzyme that rearranges atoms`,
  `question: The temporary ES complex is formed when a substrate fits into the enzyme's what?
Active site, Allosteric site, Cofactor, Quaternary structure`,
  `question: The LD flipped pattern is a key indicator for what clinical condition?
Acute myocardial infarction AMI, Acute pancreatitis, Viral hepatitis, Muscular dystrophy`,
  `question: What is the term for a protein component of an active enzyme?
Apoenzyme, Coenzyme, Cofactor, Activator`,
  `question: Oxidoreductases are a class of enzymes that catalyze what type of reactions?
Oxidation and reduction of compounds, Hydrolysis of bonds, Transfer of functional groups, Isomerization of molecules`,
  `question: Transferases are enzymes that catalyze the transfer of a chemical group from one substrate to what?
Another substrate, Water, The enzyme itself, A coenzyme`,
  `question: Which type of inhibitor prevents a reaction by directly blocking the active site?
Competitive Inhibitor, Noncompetitive Inhibitor, Uncompetitive Inhibitor, Allosteric Inhibitor`,
  `question: Which type of inhibitor causes a conformational change in the enzyme by binding to an allosteric site?
Noncompetitive Inhibitor, Competitive Inhibitor, Uncompetitive Inhibitor, Substrate Analog`,
  `question: The binding of an uncompetitive inhibitor is dependent on the prior formation of what?
The enzyme-substrate complex, The free enzyme, The apoenzyme, The holoenzyme`,
  `question: Which inhibitor type becomes more effective as more enzyme-substrate complex is formed?
Uncompetitive Inhibitor, Competitive Inhibitor, Noncompetitive Inhibitor, Feedback inhibitor`,
  `question: What is the key feature of a competitive inhibitor's structure?
It is similar to the substrate, It is identical to the product, It is a large protein, It is a metal ion`,
  `question: What distinguishes an activator from a coenzyme?
Activators are inorganic ions while coenzymes are organic compounds, Activators inhibit enzymes while coenzymes enhance them, Activators are proteins while coenzymes are not, Activators bind covalently while coenzymes bind non-covalently`
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