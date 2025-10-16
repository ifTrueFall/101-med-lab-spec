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
  `question: Describe the characteristics of hemolytic disease of the newborn and fetus (HDFN). HDFN is the destruction of fetal and neonatal red blood cells by antibodies produced by whom? Page 292.
The mother, The father, The fetus itself, The newborn itself`,
  `question: Describe the characteristics of hemolytic disease of the newborn and fetus (HDFN). The incidence of HDFN caused by anti-D has steadily decreased since 1968 due to the introduction of what? Page 292.
Rh-immune globulin, Phototherapy, Intrauterine transfusions, Doppler ultrasonography`,
  `question: Describe the characteristics of hemolytic disease of the newborn and fetus (HDFN). Only antibodies of which immunoglobulin class are actively transported across the placenta? Page 293.
IgG, IgM, IgA, IgE`,
  `question: Describe the characteristics of hemolytic disease of the newborn and fetus (HDFN). Maternal antibodies that cause HDFN are directed against antigens on fetal RBCs that were inherited from whom? Page 293.
The father, The mother, A previous transfusion, The environment`,
  `question: Describe the characteristics of hemolytic disease of the newborn and fetus (HDFN). The release of immature fetal RBCs (erythroblasts) into the circulation due to HDFN is known as what? Page 293.
Erythroblastosis fetalis, Hydrops fetalis, Kernicterus, Hepatosplenomegaly`,
  `question: Describe the characteristics of hemolytic disease of the newborn and fetus (HDFN). A severe condition of HDFN characterized by high-output cardiac failure with generalized edema effusions and ascites is called what? Page 293.
Hydrops fetalis, Erythroblastosis fetalis, Kernicterus, Anemia`,
  `question: Describe the role of the technician in the diagnosis and clinical management of HDFN. Serologic and clinical tests performed during pregnancy can accurately determine the level of antibody in which circulation? Page 293.
Maternal circulation, Fetal circulation, Paternal circulation, Neonatal circulation`,
  `question: Compare and Contrast ABO and Rh HDFN. Which type of HDFN can occur in a first pregnancy? Page 294.
ABO HDFN, Rh HDFN, Kell HDFN, Duffy HDFN`,
  `question: Compare and Contrast ABO and Rh HDFN. ABO HDFN is nearly always limited to A or B infants of mothers with what blood group? Page 294.
Group O, Group A, Group B, Group AB`,
  `question: Compare and Contrast ABO and Rh HDFN. After birth the immature newborn liver cannot adequately process what substance leading to jaundice? Page 294.
Unconjugated bilirubin, Conjugated bilirubin, Hemoglobin, Erythroblasts`,
  `question: Compare and Contrast ABO and Rh HDFN. Toxic levels of unconjugated bilirubin in an infant's brain can cause what condition? Page 294.
Kernicterus, Hydrops fetalis, Erythroblastosis fetalis, Hepatosplenomegaly`,
  `question: Compare and Contrast ABO and Rh HDFN. What treatment is commonly used for slowly rising bilirubin levels in newborns? Page 294.
Phototherapy, Exchange transfusion, IVIG, RhIG`,
  `question: Compare and Contrast ABO and Rh HDFN. Why is the Rh-positive firstborn infant of an Rh-negative mother usually unaffected by HDFN? Page 294.
The mother has not yet been immunized, The infant's antigens are weak, Maternal antibodies cannot cross the placenta, The father is also Rh-negative`,
  `question: Compare and Contrast ABO and Rh HDFN. During which event is the risk of fetomaternal hemorrhage and maternal immunization to the D antigen greatest? Page 295.
Delivery, First trimester, Second trimester, Amniocentesis`,
  `question: Compare and Contrast ABO and Rh HDFN. As little as what volume of fetal RBCs can immunize an Rh-negative mother? Page 295.
1 mL, 10 mL, 30 mL, 0.1 mL`,
  `question: Compare and Contrast ABO and Rh HDFN. Of all RBC antigens which is the most antigenic? Page 295.
D, K, c, E`,
  `question: Compare and Contrast ABO and Rh HDFN. After anti-D which non-Rh system antibody is considered the most clinically significant in its ability to cause HDFN? Page 295.
Anti-Kell, Anti-Fya, Anti-Jka, Anti-M`,
  `question: Compare and Contrast ABO and Rh HDFN. How can ABO incompatibility between the mother and fetus offer some protection against Rh immunization? Page 296.
ABO-incompatible fetal RBCs are hemolyzed in the maternal circulation, It blocks D antigen sites on fetal cells, It prevents maternal antibody production, It strengthens the placental barrier`,
  `question: Describe Rh-Immune Globulin. Rho(D) Immune Globulin is a solution of concentrated what? Page 296.
anti-Rho(D), D antigen, Rho(D) positive plasma, Albumin`,
  `question: Describe Rh-Immune Globulin. RhIG is prepared from pooled human plasma from patients who were what? Page 296.
Hyperimmunized, Immunocompromised, Never exposed to D antigen, D-positive`,
  `question: Describe Rh-Immune Globulin. RhIG contains predominantly which class of anti-D? Page 296.
IgG, IgM, IgA, IgE`,
  `question: Describe Rh-Immune Globulin. The administration of RhIG is a form of what type of immunization? Page 296.
Passive, Active, Natural, Adjuvant`,
  `question: Describe Rh-Immune Globulin. A full dose of RhIG (300-ug) provides protection against a fetomaternal hemorrhage of how many mL of D-positive RBCs? Page 296.
15 mL, 30 mL, 5 mL, 50 mL`,
  `question: Identify the indications and contraindications for administration of Rh-Immune globulin. Antenatal RhIG is typically given to an Rh-negative mother at how many weeks' gestation? Page 296.
28 weeks, 12 weeks, 36 weeks, 40 weeks`,
  `question: Identify the indications and contraindications for administration of Rh-Immune globulin. Postpartum RhIG should be given to a nonimmunized Rh-negative mother within how many hours after delivery of an Rh-positive infant? Page 297.
72 hours, 24 hours, 48 hours, 1 week`,
  `question: Identify the indications and contraindications for administration of Rh-Immune globulin. Which of the following is an indication for RhIG administration? Page 297.
Amniocentesis, A D-negative fetus, A previously immunized mother, A D-positive mother`,
  `question: Identify the indications and contraindications for administration of Rh-Immune globulin. RhIG may be contraindicated in patients who have antibodies to what? Page 297.
IgA, Albumin, IgG, IgM`,
  `question: Identify the indications and contraindications for administration of Rh-Immune globulin. Is RhIG of any benefit once a person has been actively immunized and has formed anti-D? Page 298.
No, Yes, Only if the titer is low, Only in the first pregnancy`,
  `question: Describe the storage conditions shelf life and quality control requirements for Rh-Immune globulin. What is the proper storage temperature for RhIG? Page 297.
2-8 C, -18 C, Room temperature, 37 C`,
  `question: Describe the storage conditions shelf life and quality control requirements for Rh-Immune globulin. What is the approximate half-life of IgG in an antenatal RhIG dose? Page 297.
25 days, 10 days, 50 days, 7 days`,
  `question: List the tests used for detection of fetomaternal hemorrhage. The Kleihauer-Betke test is used to determine the volume of what? Page 298.
Fetal hemorrhage, Amniotic fluid, Maternal blood, Cord blood`,
  `question: List the tests used for detection of fetomaternal hemorrhage. In the Kleihauer-Betke test fetal RBCs are resistant to acid and remain what color? Page 298.
Pink, Blue, Clear, Brown`,
  `question: List the tests used for detection of fetomaternal hemorrhage. In the Kleihauer-Betke test maternal RBCs are not resistant to acid and appear as what? Page 298.
Ghost cells, Spherocytes, Sickle cells, Target cells`,
  `question: List the tests used for detection of fetomaternal hemorrhage. The volume of fetal hemorrhage is divided by what number to determine the required vials of RhIG? Page 298.
30, 15, 50, 10`,
  `question: List the tests used for detection of fetomaternal hemorrhage. What noninvasive procedure can reliably predict anemia in the fetus? Page 298.
Color Doppler MCA-PSV, Amniocentesis, Cordocentesis, Kleihauer-Betke test`,
  `question: List the tests used for detection of fetomaternal hemorrhage. The concentration of bilirubin pigment in amniotic fluid is measured by what procedure? Page 299.
AOD 450 nm, Kleihauer-Betke test, Doppler ultrasound, Antibody titer`,
  `question: Describe the protocol for testing of maternal and cord blood in cases of suspected HDFN. When is it recommended to perform the type and antibody screen on a pregnant woman? Page 299.
First prenatal visit, Second trimester, Third trimester, At delivery`,
  `question: Describe the protocol for testing of maternal and cord blood in cases of suspected HDFN. If a pregnant woman's antibody screen is reactive what is the next step? Page 299.
Determine the antibody identity, Administer RhIG, Perform an amniocentesis, Schedule an early delivery`,
  `question: Describe the protocol for testing of maternal and cord blood in cases of suspected HDFN. Weakly reactive anti-D in a pregnant woman who received antenatal RhIG is an example of what type of immunization? Page 299.
Passive, Active, Natural, Autoimmune`,
  `question: Describe the protocol for testing of maternal and cord blood in cases of suspected HDFN. Besides anti-D which antibody is one of the most common and significant causes of HDFN? Page 300.
Anti-K, Anti-M, Anti-Lea, Anti-P1`,
  `question: Describe the protocol for testing of maternal and cord blood in cases of suspected HDFN. If the mother has a clinically significant antibody and the father is likely heterozygous for the corresponding antigen what testing can be performed on the fetus? Page 300.
Fetal DNA testing, Paternal phenotyping, Maternal antibody titer, Cord blood DAT`,
  `question: Describe the protocol for testing of maternal and cord blood in cases of suspected HDFN. What is the most important diagnostic test performed on a cord blood sample to confirm HDFN? Page 300.
DAT, ABO and Rh typing, Hemoglobin and Hematocrit, Bilirubin level`,
  `question: Describe the protocol for testing of maternal and cord blood in cases of suspected HDFN. Why must cord blood be collected by venipuncture? Page 300.
To avoid contamination with Wharton's jelly, To get a larger sample volume, To prevent clotting, To ensure sterility`,
  `question: Describe the protocol for testing of maternal and cord blood in cases of suspected HDFN. An antibody titer of what level is an indication for Color Doppler studies to check for fetal anemia? Page 301.
32 or above, 16, 8, 4`,
  `question: State the blood components and the maximum age of the donor unit preferred for intrauterine or exchange transfusions. For intrauterine transfusion what is the maximum age of the donor blood unit? Page 301.
Less than 7 days, Less than 14 days, Less than 21 days, Less than 42 days`,
  `question: State the blood components and the maximum age of the donor unit preferred for intrauterine or exchange transfusions. Blood transfused to a fetus or premature infant should be treated with what process to prevent GVHD? Page 301.
Irradiation, Leukoreduction, Washing, Freezing`,
  `question: State the blood components and the maximum age of the donor unit preferred for intrauterine or exchange transfusions. For an intrauterine transfusion the hematocrit level of the RBCs should be greater than what? Page 301.
70%, 50%, 60%, 80%`,
  `question: State the blood components and the maximum age of the donor unit preferred for intrauterine or exchange transfusions. IVIG works by competing with the mother's antibodies for what receptors on macrophages in the infant's spleen? Page 301.
Fc receptors, Antigen receptors, Complement receptors, Cytokine receptors`,
  `question: State the blood components and the maximum age of the donor unit preferred for intrauterine or exchange transfusions. What procedure uses whole blood to replace a neonate's circulating blood primarily to remove high levels of bilirubin? Page 301.
Exchange transfusion, Intrauterine transfusion, Simple transfusion, Autologous transfusion`,
  `question: Discuss crossmatch considerations for neonates. What blood group is most commonly selected for intrauterine and neonatal transfusions? Page 302.
Group O negative, Group O positive, Mother's blood type, Infant's blood type`,
  `question: Discuss crossmatch considerations for neonates. RBCs selected for neonatal transfusion must be negative for which antigens? Page 302.
Antigens corresponding to maternal antibodies, All Rh antigens, All Kell antigens, All ABO antigens`,
  `question: Discuss crossmatch considerations for neonates. It is preferred that blood donors for neonatal transfusions are negative for which virus? Page 302.
Cytomegalovirus (CMV), Hepatitis B Virus (HBV), Human Immunodeficiency Virus (HIV), Epstein-Barr Virus (EBV)`,
  `question: Compare and Contrast ABO and Rh HDFN. In the black population which group of infants are more often affected by ABO HDFN? Page 294.
Group B infants, Group A infants, Group O infants, Group AB infants`,
  `question: Describe Rh-Immune Globulin. Besides HDFN what is the other primary use for RhIG? Page 296.
Idiopathic Thrombocytopenic Purpura (ITP), Hemophilia A, Sickle Cell Anemia, Autoimmune Hemolytic Anemia`,
  `question: Describe the protocol for testing of maternal and cord blood in cases of suspected HDFN. A rising antibody titer in a pregnant woman indicates what? Page 301.
Ongoing fetal RBC destruction, A successful pregnancy, The presence of passive antibody, A healthy fetus`,
  `question: Describe the characteristics of hemolytic disease of the newborn and fetus (HDFN). When does hydrops fetalis typically develop? Page 293.
18-20 weeks' gestation, 10-12 weeks' gestation, 28-30 weeks' gestation, After 36 weeks' gestation`,
  `question: Identify the indications and contraindications for administration of Rh-Immune globulin. If more than 72 hours have passed since delivery should RhIG still be given to an eligible mother? Page 297.
Yes, No, Only a half dose, Only if the baby is jaundiced`,
  `question: List the tests used for detection of fetomaternal hemorrhage. After calculating the required vials of RhIG from the KB test result what is the final step? Page 298.
One vial is added to the calculated answer, The result is rounded to the nearest whole number, One vial is subtracted from the answer, The result is doubled`,
  `question: State the blood components and the maximum age of the donor unit preferred for intrauterine or exchange transfusions. What is a primary advantage of an exchange transfusion? Page 302.
Removal of circulating maternal antibody, It is less invasive than simple transfusion, It uses less donor blood, It does not require a crossmatch`,
  `question: Compare and Contrast ABO and Rh HDFN. Are ABO antigens fully developed at birth? Page 302.
No they may show weaker reactions, Yes they are fully developed, Only A and B antigens are developed, Only H antigen is developed`
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