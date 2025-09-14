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
  `Identify specimen requirements for immunologic procedures. Page 49. The majority of immunology tests are performed on which type of specimen?
Serum, Plasma, Whole blood, Urine`,
  `Identify specimen requirements for immunologic procedures. Page 49. Lipemia hemolysis or any bacterial contamination can make a specimen what?
Unacceptable, Ideal, Acceptable with notation, Suitable for testing`,
  `Identify specimen requirements for immunologic procedures. Page 49. To avoid the presence of chyle when should blood specimens be collected?
Before a meal, After a meal, During a meal, At any time`,
  `Identify specimen requirements for immunologic procedures. Page 49. Contamination with alkali or acid can have what effect on serum proteins making the specimen useless?
A denaturing effect, A stabilizing effect, A neutralizing effect, An enhancing effect`,
  `Identify specimen requirements for immunologic procedures. Page 49. For a urine hCG assay to be accurate the specimen must be collected at a suitable time to allow the hormone to reach what?
A detectable level, A peak level, A low level, A stable level`,
  `Describe how complement is inactivated in a serum sample. Page 49. What is the process that destroys complement activity called?
Inactivation, Activation, Agglutination, Precipitation`,
  `Describe how complement is inactivated in a serum sample. Page 49. Complement is known to interfere with the reactions of certain tests for which disease?
Syphilis, Influenza, Hepatitis, Mononucleosis`,
  `Describe how complement is inactivated in a serum sample. Page 49. In latex passive agglutination assays what can active complement cause?
A false-positive reaction, A false-negative reaction, A true-positive reaction, No reaction`,
  `Describe how complement is inactivated in a serum sample. Page 49. By what method is complement activity destroyed in a serum sample?
Heating to 56° C for 30 minutes, Freezing to 0° C for 10 minutes, Boiling at 100° C for 5 minutes, Cooling to 4° C for 60 minutes`,
  `Describe how complement is inactivated in a serum sample. Page 49. If more than 4 hours has passed since inactivation how can a specimen be reinactivated?
Heating it to 56° C for 10 minutes, Heating it to 56° C for 30 minutes, Freezing it for 5 minutes, Adding a neutralizing agent`,
  `Describe the principle of agglutination. Page 50. What is the term for the aggregation of soluble test antigens?
Precipitation, Agglutination, Flocculation, Hemolysis`,
  `Describe the principle of agglutination. Page 50. What is the term for the aggregation of particulate test antigens?
Agglutination, Precipitation, Lysis, Neutralization`,
  `Describe the principle of agglutination. Page 50. Agglutination is the visible expression of the aggregation of antigens and what other molecules?
Antibodies, Complement, Enzymes, Lipids`,
  `Describe the principle of agglutination. Page 50. Latex particles and colloidal charcoal are examples of what type of carriers?
Artificial carriers, Biologic carriers, Natural carriers, Soluble carriers`,
  `Describe the principle of agglutination. Page 50. The quality of test results depends on time of incubation amount of antigen and what else?
Conditions of the test environment, The type of specimen container, The patient's age, The time of day`,
  `Compare the characteristics of agglutination methods. Page 50. In latex agglutination procedures what is bound to the surface of the latex beads?
Antibody molecules, Soluble antigens, Whole bacterial cells, Red blood cells`,
  `Compare the characteristics of agglutination methods. Page 50. In latex agglutination if an antigen is present in the specimen it will bind to the antibody on the beads forming what?
Visible cross-linked aggregates, A colored solution, A fine precipitate, A single large clump`,
  `Compare the characteristics of agglutination methods. Page 51. Flocculation tests are based on the interaction of soluble antigen with antibody forming what?
A precipitate of fine particles, A large agglutinate, A colored product, A lysed solution`,
  `Compare the characteristics of agglutination methods. Page 51. The classic Venereal Disease Research Laboratories (VDRL) test is an example of what type of testing?
Flocculation, Latex agglutination, Hemagglutination, Bacterial agglutination`,
  `Compare the characteristics of agglutination methods. Page 51. In the RPR test what substance is included in the antigen suspension to allow for macroscopically visible flocculation?
Charcoal particles, Latex beads, Colloidal gold, Red blood cells`,
  `Compare the characteristics of agglutination methods. Page 51. Direct agglutination of whole pathogens is used to detect what?
Antibodies directed against the pathogens, Antigens on the pathogens' surface, Complement components, Haptens in serum`,
  `Compare the characteristics of agglutination methods. Page 51. The binding of specific antibodies to surface antigens of bacteria causes the bacteria to do what?
Clump together, Lyse, Change color, Precipitate`,
  `Compare the characteristics of agglutination methods. Page 52. The hemagglutination method of testing is used to detect antibodies to what?
Erythrocyte antigens, Bacterial antigens, Viral antigens, Fungal antigens`,
  `Compare the characteristics of agglutination methods. Page 52. What is the method called when antigens are bound to the RBC surface to detect antibodies to substances other than erythrocyte antigens?
Passive hemagglutination, Direct hemagglutination, Reverse agglutination, Agglutination inhibition`,
  `Describe methods for enhancing agglutination. Page 52. Which technique uses high gravitational force to physically force cells together?
Centrifugation, Enzyme treatment, Colloid use, AHG testing`,
  `Describe methods for enhancing agglutination. Page 52. What is the purpose of treating cells with proteolytic enzymes?
To alter the zeta potential, To increase antigen sites, To bind free antibodies, To lyse the cells`,
  `Describe methods for enhancing agglutination. Page 52. The use of colloids helps adjust the zeta potential so which type of antibodies will be able to agglutinate?
IgG, IgM, IgA, IgE`,
  `Describe methods for enhancing agglutination. Page 53. Which test is very useful to facilitate agglutination if other techniques fail especially with deeply embedded antigens?
Antihuman globulin (AHG) testing, Centrifugation, Enzyme treatment, Colloid use`,
  `Describe the characteristics of graded agglutination reactions. Page 53. How should the test tube be treated when observing for agglutination?
Delicately, Shaken hard, Inverted rapidly, Warmed gently`,
  `Describe the characteristics of graded agglutination reactions. Page 53. Why must hard shaking of the test tube be avoided?
Agglutination is a reversible reaction, It can cause hemolysis, It can create air bubbles, It may denature the antibody`,
  `Describe the characteristics of graded agglutination reactions. Page 53. The rupture or hemolysis of erythrocytes is considered just as important as finding what?
Agglutination, Precipitation, A color change, A negative result`,
  `Describe the characteristics of graded agglutination reactions. Page 53. What grade is assigned to a reaction with one large solid agglutinate and no free cells?
4+, 3+, 2+, 1+`,
  `Describe the characteristics of graded agglutination reactions. Page 53. What is the appearance of the supernate in a 4+ agglutination reaction?
Clear, Turbid, Hemolyzed, Dark`,
  `Describe the characteristics of graded agglutination reactions. Page 53. What grade is described as having many small agglutinates and many free cells with a turbid supernate?
1+, W+, 2+, 0`,
  `Describe the characteristics of graded agglutination reactions. Page 53. In a 0 graded reaction how is the cell suspension described?
Dark turbid homogenous, Clear with a small button, Slightly cloudy, Gelatinous`,
  `Describe the principles of pregnancy testing. Page 51. Pregnancy tests are designed to detect minute amounts of which hormone?
Human chorionic gonadotropin (hCG), Luteinizing hormone (LH), Follicle-stimulating hormone (FSH), Thyroid-stimulating hormone (TSH)`,
  `Describe the principles of pregnancy testing. Page 54. The alpha subunit of hCG is identical to that of LH FSH and which other hormone?
Thyroid-stimulating hormone (TSH), Prolactin, Estrogen, Progesterone`,
  `Describe the principles of pregnancy testing. Page 54. To increase specificity many pregnancy test kits use a monoclonal antibody directed against which subunit of hCG?
Beta (β) subunit, Alpha (a) subunit, Gamma subunit, Delta subunit`,
  `Describe the principles of pregnancy testing. Page 54. In early pregnancy how often does the level of hCG typically double?
Every 2 to 3 days, Every week, Every 24 hours, Every 12 hours`,
  `Describe the principles of pregnancy testing. Page 54. In a rapid direct monoclonal latex slide agglutination test what indicates a positive result?
Agglutination within 2 minutes, No agglutination within 2 minutes, A color change, A fine precipitate`,
  `Describe the principles of pregnancy testing. Page 54. A hydatidiform mole is a condition that can cause what kind of pregnancy test result?
False positive, False negative, A weak positive, An invalid result`,
  `Describe the principles of pregnancy testing. Page 54. What is the most common reason for a false negative pregnancy test?
Testing is performed too early, The urine is too dilute, The antibody is expired, The patient drank too much water`,
  `Describe the principles of pregnancy testing. Page 54. When are peak levels of hCG typically reached?
2 to 3 months after the last menstrual period, 1 week after conception, At the time of delivery, 4 weeks after conception`,
  `Describe the principles of pregnancy testing. Page 54. In an agglutination inhibition test for pregnancy what result is evidenced by agglutination?
A negative result, A positive result, An invalid result, An indeterminate result`,
  `Describe the principles of pregnancy testing. Page 54. Excessive ingestion of what common medication can lead to a false positive pregnancy test?
Aspirin, Acetaminophen, Ibuprofen, Antacids`,
  `Identify specimen requirements for immunologic procedures. Page 49. Besides serum what other specimen is commonly used for pregnancy tests?
Urine, Saliva, Cerebrospinal fluid, Amniotic fluid`,
  `Describe how complement is inactivated in a serum sample. Page 49. What unwanted event may complement cause in hemagglutination assays?
Lysis of the indicator cells, Enhancement of agglutination, False-negative reactions, Neutralization of antibody`,
  `Describe the principle of agglutination. Page 50. In what type of testing are whole bacterial cells used as the source of antigen?
Bacterial agglutination, Latex agglutination, Flocculation, Hemagglutination`,
  `Compare the characteristics of agglutination methods. Page 51. In the VDRL test what antibody-like protein binds to the cardiolipin-lecithin-coated cholesterol particles?
Reagin, Immunoglobulin G, Immunoglobulin M, Albumin`,
  `Compare the characteristics of agglutination methods. Page 52. Why is tube testing generally considered more sensitive than slide testing for direct bacterial agglutination?
It allows more time for antigen-antibody reaction, It uses a larger volume of sample, It is easier to read visually, It requires no heating`,
  `Compare the characteristics of agglutination methods. Page 52. What chemicals can be used to cross-link antigens to red blood cells for passive hemagglutination?
Chromic chloride tannic acid and glutaraldehyde, Sodium chloride and potassium chloride, Saline and albumin, Proteolytic enzymes`,
  `Describe methods for enhancing agglutination. Page 52. Centrifugation counteracts what effect between cells?
The repulsive effect, The attractive effect, The gravitational effect, The magnetic effect`,
  `Describe the characteristics of graded agglutination reactions. Page 53. What must be done to all the cells in the button before an accurate observation can be made?
They must be resuspended, They must be allowed to settle, They must be washed, They must be heated`,
  `Describe the characteristics of graded agglutination reactions. Page 53. What grade is described as having many medium-sized agglutinates a moderate number of free cells and a clear supernate?
2+, 1+, 3+, W+`,
  `Describe the characteristics of graded agglutination reactions. Page 53. What grade describes several large agglutinates with a few free cells and a clear supernate?
3+, 2+, 4+, 1+`,
  `Describe the principles of pregnancy testing. Page 54. If a pregnancy test is negative in the first week after conception what is the recommended course of action?
The test should be repeated within a week, The result should be considered final, A blood test should be done immediately, The test should be repeated in one month`,
  `Describe the principles of pregnancy testing. Page 54. The rapid latex slide test for hCG is based on the principle of agglutination between hCG and what?
Latex particles coated with anti-hCG antibodies, Free anti-hCG antibodies in solution, Red blood cells coated with hCG, Charcoal particles coated with anti-hCG`,
  `Compare the characteristics of agglutination methods. Page 51. The most basic direct bacterial agglutination tests measure the antibody produced by whom?
The host, The bacteria, The test kit manufacturer, The laboratory`,
  `Identify specimen requirements for immunologic procedures. Page 49. Icteric or turbid serum may give valid results for some tests but may do what in others?
Interfere, Enhance the reaction, Cause hemolysis, Have no effect`,
  `Compare the characteristics of agglutination methods. Page 51. What is the binding of specific antibodies to surface antigens of bacteria called?
Bacterial agglutination, Flocculation, Precipitation, Hemagglutination`
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