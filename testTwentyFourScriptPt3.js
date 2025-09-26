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
  `question: Discuss antigen typing techniques. Antigen typing is performed for patients who have a history of what? Page 165.
Clinically-significant antibodies, Naturally-occurring antibodies, Cold autoantibodies, ABO antibodies`,
  `question: Discuss antigen typing techniques. Blood units for a patient with a known clinically significant antibody should be what for the corresponding antigen? Page 166.
Antigen-negative, Antigen-positive, Weakly reactive, Homozygous`,
  `question: Discuss antigen typing techniques. In the formula to calculate how many units to screen what number goes in the numerator? Page 166.
The number of units requested, The frequency of the antigen, The number of antibodies present, The patient's hematocrit`,
  `question: Discuss antigen typing techniques. The number of units requested is divided by what value to determine how many units to screen? Page 166.
The frequency of antigen-negative individuals, The frequency of antigen-positive individuals, The antibody titer, The number of available units`,
  `question: Discuss antigen typing techniques. If a calculation for units to screen results in 2.8 how many units should be typed? Page 166.
Three, Two, One, Four`,
  `question: Discuss antigen typing techniques. If a patient has multiple antibodies how are the frequencies of antigen-negative individuals used in the calculation? Page 166.
They are multiplied together, They are added together, They are averaged, Only the lowest frequency is used`,
  `question: Discuss antigen typing techniques. What patient information is helpful during unit selection for antigen testing because antigen frequencies vary? Page 166.
Donor's race, Donor's age, Donor's gender, Donor's blood type`,
  `question: Describe the necessity of antigen-typing when fulfilling a crossmatch request. When an antibody is identified what should be done to the patient's own red cells? Page 166.
They should be phenotyped for the corresponding antigen, They should be discarded, They should be tested with enzymes, They should be crossmatched`,
  `question: Describe the necessity of antigen-typing when fulfilling a crossmatch request. Phenotyping the patient's cells for the corresponding antigen helps confirm what? Page 166.
The validity of the test results, The patient's blood type, The presence of an autoantibody, The need for a transfusion`,
  `question: Describe the necessity of antigen-typing when fulfilling a crossmatch request. A patient should lack the antigen to their identified antibody with what exception? Page 166.
The antibody is an autoantibody, The antibody is IgM, The antibody is naturally occurring, The antibody is clinically insignificant`,
  `question: Describe the necessity of antigen-typing when fulfilling a crossmatch request. Why might a recently transfused patient appear to have an antigen corresponding to their antibody? Page 166.
The antigen is on transfused donor red cells, The antibody is an autoantibody, The typing reagent is incorrect, The patient has a subgroup`,
  `question: Describe the necessity of antigen-typing when fulfilling a crossmatch request. Before transfusion donor cells will be phenotyped to ensure they ________ the corresponding antigen to the patient's antibody. Page 166.
lack, possess, have a weak expression of, have a homozygous expression of`,
  `question: Compare exclusion and inclusion methods. Once an antibody screen is positive what is required to identify the antibody? Page 167.
Additional testing, An elution, An adsorption, A transfusion`,
  `question: Compare exclusion and inclusion methods. What patient information is extremely valuable and may assist in the antibody identification process? Page 167.
Patient history, Current medications, Recent diet, Vital signs`,
  `question: Compare exclusion and inclusion methods. Pregnancy or transfusion may expose a patient to what leading to antibody formation? Page 167.
Non-self antigens, Self-antigens, Bacterial antigens, Environmental antigens`,
  `question: Compare exclusion and inclusion methods. The antibody identification technique based on negative results is called what? Page 167.
Exclusion, Inclusion, Adsorption, Elution`,
  `question: Compare exclusion and inclusion methods. The "rule-out" technique is another name for which method? Page 167.
Exclusion, Inclusion, Neutralization, Titration`,
  `question: Compare exclusion and inclusion methods. To avoid excluding a weak antibody showing dosage it is advisable to perform the rule-out technique using cells with what antigen expression? Page 167.
Homozygous, Heterozygous, Weak, Negative`,
  `question: Correlate antibody identification panel findings with serologic characteristics. The inclusion technique involves seeing if the pattern of reactivity matches a pattern of what? Page 167.
Antigen-positive cells, Antigen-negative cells, Homozygous cells, Heterozygous cells`,
  `question: Correlate antibody identification panel findings with serologic characteristics. The exclusion system is based on negative results obtained with a panel of 11-20 manufactured cells of what blood type? Page 167.
O cells, A cells, B cells, AB cells`,
  `question: Correlate antibody identification panel findings with serologic characteristics. If an antigen is present on a panel cell and the patient's serum did not react what can be tentatively done? Page 168.
The corresponding antibody can be ruled out, The corresponding antibody is confirmed, A second antibody is suspected, The panel is invalid`,
  `question: Correlate antibody identification panel findings with serologic characteristics. During panel evaluation what is the first logical question to ask about positive reactions? Page 168.
In what phase(s) and at what strength(s) did they occur, Is the autologous control positive, Is the patient on medication, Does the patient have a history of transfusion`,
  `question: Correlate antibody identification panel findings with serologic characteristics. What does a positive autologous control on a panel suggest? Page 168.
A possible autoantibody or recent transfusion, A strong alloantibody, An ABO discrepancy, A dosage effect`,
  `question: Correlate antibody identification panel findings with serologic characteristics. What must be checked to confirm an antibody's identity after a pattern is matched? Page 168.
Does the patient lack the corresponding antigen, Is the patient's DAT positive, Is the antibody IgG or IgM, Does the antibody show dosage`,
  `question: Discuss additional laboratory testing procedures that will increase the probability of antibody identification. If multiple antibodies are present what technique can help separate the specificities? Page 169.
Treating the panel cells with enzymes, Performing an elution, Lowering the incubation temperature, Increasing the serum-to-cell ratio`,
  `question: Discuss additional laboratory testing procedures that will increase the probability of antibody identification. Enzymes modify the RBC surface by removing sialic acid and denaturing or removing what? Page 169.
Glycoproteins, Phospholipids, Carbohydrates, H-antigen`,
  `question: Discuss additional laboratory testing procedures that will increase the probability of antibody identification. The effect of enzyme treatment is to destroy certain antigens and do what to others? Page 169.
Enhance the expression, Weaken the expression, Have no effect, Temporarily block them`,
  `question: Deduce when additional panel cells should be tested. When should additional panel cells be tested? Page 169.
When the antibody panel does not clearly identify one specific antibody, When the autocontrol is positive, When all panel cells are positive, When the antibody screen is negative`,
  `question: Deduce when additional panel cells should be tested. Selected cells for an additional panel should have what characteristic? Page 169.
Minimal overlap in the antigens they possess, Maximum overlap in the antigens they possess, Only homozygous antigen expression, Only antigens from the Kell system`,
  `question: Deduce when additional panel cells should be tested. Selected cell panels are useful when a patient has a known antibody and the technologist is trying to determine if what is present? Page 169.
Additional antibodies, An autoantibody, A dosage effect, A high-frequency antigen`,
  `question: Deduce when additional panel cells should be tested. To differentiate between a possible anti-K and anti-Jkª what cell should be tested? Page 169.
A cell that is K+ and Jkª(-), A cell that is K+ and Jkª(+), A cell that is K- and Jkª(-), Any O-positive cell`,
  `question: Discuss antigen typing techniques. If 2 units of E-negative blood are needed and the frequency of E-negative individuals is 0.70 what is the calculation? Page 166.
2 divided by 0.70, 2 multiplied by 0.70, 0.70 divided by 2, 2 added to 0.70`,
  `question: Describe the necessity of antigen-typing when fulfilling a crossmatch request. A positive DAT is an exception to the rule that a patient should lack the antigen to their corresponding antibody. Page 166.
True, False, Only for IgM antibodies, Only for cold antibodies`,
  `question: Compare exclusion and inclusion methods. Which method is also known as the "rule-out" technique? Page 167.
Exclusion, Inclusion, Adsorption, Neutralization`,
  `question: Compare exclusion and inclusion methods. In which method do you look for a pattern of reactivity that matches a pattern of antigen-positive cells? Page 167.
Inclusion, Exclusion, Elution, Titration`,
  `question: Correlate antibody identification panel findings with serologic characteristics. Does a reaction in a single phase or multiple phases provide clues for antibody identification? Page 168.
Yes, No, Only if the autocontrol is positive, Only if the reaction is 4+`,
  `question: Correlate antibody identification panel findings with serologic characteristics. The autologous control is a test of the patient's serum against what? Page 168.
The patient's own cells, A group O screening cell, An A1 cell, A B cell`,
  `question: Discuss additional laboratory testing procedures that will increase the probability of antibody identification. What is the purpose of using enzymes in antibody identification? Page 169.
To destroy certain antigens and enhance others, To strengthen all antigen reactions, To weaken all antibody reactions, To neutralize antibodies in the serum`,
  `question: Deduce when additional panel cells should be tested. If anti-K and anti-Jkª are both possibilities a cell that is K- and Jkª(+) would be useful to test. Page 169.
True, False, Only if the autocontrol is positive, Only if the patient is K-negative`,
  `question: Discuss antigen typing techniques. A crossmatch request for a patient with a history of anti-K requires what kind of donor units? Page 165.
K-negative, K-positive, O-negative, Freshly drawn`,
  `question: Discuss antigen typing techniques. If you need 2 E-negative c-negative units and E-neg frequency is 0.70 while c-neg is 0.20 what is the denominator in your calculation? Page 166.
0.70 multiplied by 0.20, 0.70 added to 0.20, The average of 0.70 and 0.20, The larger of the two values`,
  `question: Describe the necessity of antigen-typing when fulfilling a crossmatch request. Confirming the patient's phenotype for the corresponding antigen helps prevent errors from what? Page 166.
Misidentification of the antibody, A weak antibody, A cold antibody, An ABO discrepancy`,
  `question: Compare exclusion and inclusion methods. Patient history can reveal exposure to non-self antigens through what two primary events? Page 167.
Transfusion and pregnancy, Vaccination and infection, Diet and medication, Surgery and trauma`,
  `question: Compare exclusion and inclusion methods. Positive DATs can be associated with autoimmune disorders and what other condition if transfused less than 3 months ago? Page 167.
Delayed hemolytic transfusion reaction, Acute hemolytic transfusion reaction, Febrile non-hemolytic reaction, Allergic reaction`,
  `question: Compare exclusion and inclusion methods. Ruling out antibodies based on non-reactivity with cells expressing the antigen is the principle of which method? Page 167.
Exclusion, Inclusion, Adsorption, Elution`,
  `question: Correlate antibody identification panel findings with serologic characteristics. The process of elimination used in antibody panels is another term for which method? Page 167.
Exclusion, Inclusion, Neutralization, Titration`,
  `question: Correlate antibody identification panel findings with serologic characteristics. After ruling out antibodies what should be done with the remaining possibilities? Page 167.
Examine them to see if they match the reaction pattern, Rule them out as well, Assume they are all present, Test for them using enzymes`,
  `question: Correlate antibody identification panel findings with serologic characteristics. To have sufficient evidence to prove a suspected antibody what is typically required? Page 168.
The text does not specify a rule, One positive reacting cell, Two positive reacting cells, Three positive reacting cells`,
  `question: Discuss additional laboratory testing procedures that will increase the probability of antibody identification. Which technique involves removing an antibody from the red cell surface? Page 169.
Elution, Adsorption, Neutralization, Titration`,
  `question: Discuss additional laboratory testing procedures that will increase the probability of antibody identification. Which technique involves removing an antibody from serum by adding red cells that have the corresponding antigen? Page 169.
Adsorption, Elution, Neutralization, Titration`,
  `question: Discuss additional laboratory testing procedures that will increase the probability of antibody identification. Which technique involves inactivating an antibody by adding a soluble form of the antigen? Page 169.
Neutralization, Adsorption, Elution, Titration`,
  `question: Deduce when additional panel cells should be tested. If a patient has a known anti-K selected cells can be used to check for what? Page 169.
Additional underlying antibodies, The strength of the anti-K, The presence of an autoantibody, The patient's K-antigen status`,
  `question: Deduce when additional panel cells should be tested. After testing selected cells what process should be used on the results? Page 169.
The rule-out process, The inclusion process, A DAT, An elution`,
  `question: Discuss antigen typing techniques. Calculating the number of units to screen helps manage what? Page 166.
Reagent and technologist time, The patient's transfusion schedule, The blood inventory, The risk of transfusion reaction`,
  `question: Describe the necessity of antigen-typing when fulfilling a crossmatch request. In which situation would a patient's red cells be positive for an antigen to which they have an antibody? Page 166.
The patient has an autoantibody, The patient has never been transfused, The antibody is IgM, The antibody is naturally occurring`,
  `question: Compare exclusion and inclusion methods. The use of homozygous cells for ruling out is preferred because heterozygous cells may give weaker reactions due to what? Page 167.
Dosage, The prozone effect, The postzone effect, Interference from other antibodies`,
  `question: Correlate antibody identification panel findings with serologic characteristics. If all panel cells and the autocontrol are positive what might be suspected? Page 168.
An antibody to a high-frequency antigen or an autoantibody, An antibody to a low-frequency antigen, Multiple alloantibodies, A dosage effect`,
  `question: Correlate antibody identification panel findings with serologic characteristics. If reactions are only seen in the immediate spin phase what type of antibody is likely? Page 168.
A cold-reacting IgM antibody, A warm-reacting IgG antibody, A high-titer low-avidity antibody, A drug-dependent antibody`,
  `question: Deduce when additional panel cells should be tested. The goal of selecting additional cells is to find cells that are positive for one suspected antigen and _______ for the others. Page 169.
negative, positive, weakly positive, heterozygous`,
  `question: Correlate antibody identification panel findings with serologic characteristics. Are all commonly encountered RBC antibodies always excluded after the initial panel? Page 168.
No, Yes, Only if the autocontrol is negative, Only if using homozygous cells`
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