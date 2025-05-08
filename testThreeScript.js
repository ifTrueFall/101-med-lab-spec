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
    `question: What are characteristics of a material that become evident when it undergoes a chemical reaction?
Chemical Properties, Physical Properties, Intensive Properties, Extensive Properties`,

    `question: What is defined as a chemical change occurring when two or more substances combine to form a new substance?
Chemical Reactions, Physical Changes, Mixtures, Solutions`,

    `question: What is the study of matter and energy and the interactions between them?
Chemistry, Physics, Biology, Geology`,

    `question: What is a chemical species formed when two or more atoms form a chemical bond?
Compound, Element, Mixture, Solution`,

    `question: What is a substance that cannot be broken down by chemical means and is identified by the number of protons in its atoms?
Element, Compound, Molecule, Ion`,

    `question: What is defined as the ability to do work, where work is the movement of an object by some force?
Energy, Matter, Mass, Volume`,

    `question: What type of property of matter changes with the amount of matter in a sample?
Extensive Properties, Intensive Properties, Chemical Properties, Physical Properties`,

    `question: Which state of matter has no fixed shape and no fixed volume?
Gaseous State, Liquid State, Solid State, Plasma State`,

    `question: What type of mixture has components that are not uniform?
Heterogeneous Mixture, Homogeneous Mixture, Pure Substance, Compound`,

    `question: What type of mixture has a composition that is uniform throughout?
Homogeneous Mixture, Heterogeneous Mixture, Element, Suspension`,

    `question: What is an idea or explanation that can be tested through study and experimentation?
Hypothesis, Theory, Law, Observation`,

    `question: What type of property of matter does not change as the amount of matter changes?
Intensive Properties, Extensive Properties, Chemical Properties, Nuclear Properties`,

    `question: What is defined as anything that has mass and volume (takes up space)?
Matter, Energy, Force, Work`,

    `question: What is a substance made by combining two or more different materials in such a way that no chemical reaction occurs?
Mixture, Compound, Element, Molecule`,

    `question: What are characteristics of matter that may be observed and measured without changing the identity of the sample?
Physical Properties, Chemical Properties, Nuclear Properties, Extensive Properties`,

    `question: What are substances that are made of only one type of atom or one type of molecule called?
Pure Substances, Homogeneous Mixtures, Heterogeneous Mixtures, Solutions`,

    `question: What is a statement that describes an observable occurrence in nature that appears to always be true?
Scientific Law, Hypothesis, Theory, Observation`,

    `question: What is a system for acquiring knowledge and solving problems through observation and experiential testing of a hypothesis?
Scientific Method, Theoretical Postulation, Philosophical Inquiry, Random Experimentation`,

    `question: Which state of matter is characterized by particles arranged so their shape and volume are relatively stable?
Solid State, Liquid State, Gaseous State, Plasma State`,

    `question: What is a set of statements or principles devised to explain a group of facts or phenomena, often supported by extensive experimentation?
Theory, Hypothesis, Law, Guess`,

    `question: What is the first step listed in the scientific method process described in the document?
Make an observation, Formulate a hypothesis, Design an experiment, Draw conclusions`,

    `question: According to the scientific method, what must a valid hypothesis be?
Testable and falsifiable, Universally accepted, Proven correct immediately, Based on a scientific law`,

    `question: In the scientific method, if numerous experiments support a hypothesis, what is established?
A theory, A scientific law, A new observation, A final conclusion`,

    `question: What is at the core of the scientific method for demonstrating the correctness of hypotheses and theories?
Carrying out carefully designed experiments, Publishing initial observations, Debating with other scientists, Citing historical data`,

    `question: The law of conservation of matter states that matter cannot be created or destroyed, only...?
Converted from one form to another, Reduced to energy, Broken into smaller elements, Combined into complex compounds`,

    `question: All matter is classified as either a pure substance or a...?
Mixture, Solution, Suspension, Colloid`,

    `question: A pure substance can be either a chemical element or a...?
Compound, Homogeneous mixture, Heterogeneous mixture, Solution`,

    `question: A substance that cannot be broken down into simpler ones by chemical changes is known as an?
Element, Compound, Mixture, Molecule`,

    `question: What type of matter contains two or more elements and has properties usually different from its constituent elements?
Compound, Element, Homogeneous mixture, Heterogeneous mixture`,

    `question: What is a combination of two or more pure substances where each retains its own identity?
Mixture, Compound, Element, Isotope`,

    `question: Homogeneous mixtures are also called?
Solutions, Suspensions, Colloids, Pure substances`,

    `question: Which of these is given as an example of a homogeneous mixture?
Saline (salt and water), Chocolate chip cookie dough, Rusting iron, Burning wood`,

    `question: Which of these is given as an example of a heterogeneous mixture?
Chocolate chip cookie dough, Saline, Pure water, Oxygen gas`,

    `question: Chemical properties of matter result in a change in composition and can be observed only through?
Chemical reactions, Physical measurements, Changes in state, Separation techniques`,

    `question: In a chemical reaction, a chemical substance is converted to different substances by rearranging, removing, replacing, or adding what?
Atoms, Molecules, Energy levels, Electrons`,

    `question: Which of the following is an example of a chemical property or change?
Iron rusting, Ice melting, Chopping wood, Shredding paper`,

    `question: Physical properties can be observed or measured without changing the what of a substance?
Composition or identity, Chemical bonds, Number of atoms, Energy content`,

    `question: Which of the following is an example of a physical change?
Ice melting, Wood burning, A banana rotting, Iron rusting`,

    `question: A property that does not change as the amount of matter changes is known as an?
Intensive property, Extensive property, Chemical property, Mass property`,

    `question: Which of these is an example of an intensive property?
Color, Mass, Volume, Length`,

    `question: Boiling point is an example of what type of property?
Intensive property, Extensive property, Chemical property, Relational property`,

    `question: A property that is dependent on the amount of material is known as an?
Extensive property, Intensive property, Specific property, Intrinsic property`,

    `question: Which of these is an example of an extensive property?
Mass, Hardness, Temperature, Boiling point`,

    `question: Volume is an example of what type of property?
Extensive property, Intensive property, Density, Specific gravity`,

    `question: Matter is defined as anything that has mass and...?
Occupies space (volume), Contains energy, Can be seen, Is a pure substance`,

    `question: Energy is defined as the ability to do work to accomplish some...?
Change, Reaction, Measurement, Observation`,

    `question: Which state of matter is made up of particles that are widely separated?
Gaseous state, Liquid state, Solid state, Crystalline state`,

    `question: A gas will expand to fill any container because it has no definite shape or...?
Volume, Mass, Temperature, Pressure`,

    `question: In which state of matter are particles closer together than in a gas, having a definite volume but no definite shape?
Liquid state, Solid state, Gaseous state, Plasma state`,

    `question: Which state of matter has both fixed volume and fixed shape?
Solid state, Liquid state, Gaseous state, Fluid state`,

    `question: What term describes the predictable pattern of particle arrangement often found in solids?
Crystalline, Amorphous, Random, Dispersed`,

    `question: The scientific method is a process for experimentation used to explore observations and answer what?
Questions, Laws, Beliefs, Assumptions`,

    `question: When scientists observe a phenomenon and want to explain it, the process often begins with a(n)?
Hypothesis, Experiment, Conclusion, Law`,

    `question: An educated guess that can be tested is a(n)?
Hypothesis, Theory, Observation, Fact`,

    `question: What process involves demonstrating the correctness of hypotheses by carrying out carefully designed procedures?
Experiments, Observations, Formulations, Calculations`,

    `question: A scientific law is described as a summary of a large quantity of what?
Information (gathered from experiments), Hypotheses, Theories, Educated guesses`,

    `question: Rusting iron and burning wood are examples of what type of changes/properties?
Chemical, Physical, Intensive, Extensive`,

    `question: Chopping wood and shredding paper are examples of what type of changes/properties?
Physical, Chemical, Extensive, Nuclear`,

    `question: Specific gravity is listed as an example of what type of property?
Intensive Property, Extensive Property, Chemical Property, Mass-dependent property`,

    `question: What characteristic defines an element?
It cannot be broken down by chemical means, It is a uniform mixture, It has variable composition, It is formed by chemical bonds between different atoms`

    // *** PASTE OR ADD OTHER QUESTIONS HERE ***
];

const quizData = generateQuizHTML(myQuestions);
const quizForm = document.getElementById('quizForm');

// Insert the generated HTML into the designated form element
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