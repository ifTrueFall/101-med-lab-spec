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
  `question: Describe the blood components currently available for therapeutic use. What is a primary purpose of transfusion therapy? Page 248.
To treat inadequate oxygen-carrying capacity, To treat hypertension, To prevent future anemia, To promote wound healing`,
  `question: Describe the blood components currently available for therapeutic use. Transfusion of whole blood is contraindicated in patients with severe chronic anemia due to the risk of what condition? Page 248.
Volume overload, Allergic reaction, Iron deficiency, Coagulopathy`,
  `question: Describe the blood components currently available for therapeutic use. Leukocyte-reduced Red Blood Cells are indicated to decrease which of the following? Page 249.
Febrile nonhemolytic reactions, Severe allergic reactions, Iron overload, Delayed hemolytic reactions`,
  `question: Describe the blood components currently available for therapeutic use. Washed Red Blood Cells are primarily used for patients with a history of what type of transfusion reaction? Page 249.
Severe allergic reactions, Febrile reactions, Hemolytic reactions, Delayed reactions`,
  `question: Describe the blood components currently available for therapeutic use. Each unit of platelets prepared from whole blood must contain at least how many platelets? Page 250.
5.5x10^10, 3.0x10^11, 2.0x10^9, 1.0x10^10`,
  `question: Describe the blood components currently available for therapeutic use. Granulocytes collected by pheresis should be transfused within how many hours of collection? Page 250.
24 hours, 48 hours, 72 hours, 5 days`,
  `question: Describe the blood components currently available for therapeutic use. Which blood product is the treatment of choice for patients with multiple coagulation factor deficiencies and active bleeding? Page 251.
Fresh Frozen Plasma, Whole Blood, Platelets, Cryoprecipitate`,
  `question: Describe the blood components currently available for therapeutic use. Therapeutic erythrocytapheresis is most commonly performed for patients with what condition? Page 250.
Sickle cell disease, Malaria, Babesia infections, Leukemia`,
  `question: Correlate the expected increase in hematocrit or platelet count levels when given RBCs or platelets. For a 70-kg adult each unit of whole blood should increase the hematocrit level by how much? Page 253.
3%, 1%, 5%, 10%`,
  `question: Correlate the expected increase in hematocrit or platelet count levels when given RBCs or platelets. For a 70-kg adult each unit of transfused RBCs is expected to increase the hemoglobin level by how much? Page 253.
1 g/dL, 3 g/dL, 0.5 g/dL, 2 g/dL`,
  `question: Correlate the expected increase in hematocrit or platelet count levels when given RBCs or platelets. One plateletpheresis component should increase an adult patient's platelet count by how much? Page 254.
20000-60000/uL, 5000-10000/uL, 1000-5000/uL, 75000-100000/uL`,
  `question: Correlate the expected increase in hematocrit or platelet count levels when given RBCs or platelets. Each unit of platelets from whole blood should increase the platelet count by how much in a 70-kg person? Page 254.
5000-10000/uL, 20000-60000/uL, 1000-5000/uL, 15000-25000/uL`,
  `question: Describe the required procedures to prepare blood components for special transfusions. The goal of leukocyte reduction is to leave fewer than how many leukocytes in the RBC unit? Page 254.
5x10^6, 5x10^8, 2x10^9, 3x10^11`,
  `question: Describe the required procedures to prepare blood components for special transfusions. In which cells is Cytomegalovirus (CMV) carried in a latent or infectious form? Page 255.
Monocytes and neutrophils, Red blood cells, Platelets, B-lymphocytes`,
  `question: Describe the required procedures to prepare blood components for special transfusions. To prevent transfusion-associated graft-versus-host disease (GVHD) cellular blood components are treated with what? Page 255.
Gamma radiation, UV light, Leukocyte filters, Saline washing`,
  `question: List the groups of recipients at highest risk of infection from transfusion of cytomegalovirus-positive RBCs or platelets. Which group is considered at highest risk for severe sequelae of CMV infections from transfusion? Page 255.
CMV-negative pregnant women, Elderly patients, Trauma patients, Patients with anemia`,
  `question: List the groups of recipients at highest risk of infection from transfusion of cytomegalovirus-positive RBCs or platelets. Premature infants weighing less than what amount are considered high risk for CMV infection? Page 255.
1200 grams, 1500 grams, 2000 grams, 2500 grams`,
  `question: Discuss Human Leukocyte Antigen (HLA). The genes that determine Major Histocompatibility Factors are located in a region on which chromosome? Page 256.
Chromosome 6, Chromosome 9, Chromosome 1, Chromosome 19`,
  `question: Discuss Human Leukocyte Antigen (HLA). The Class I region of the Major Histocompatibility Complex (MHC) encodes for which classic transplantation molecules? Page 256.
HLA-A HLA-B and HLA-C, HLA-DR HLA-DP and HLA-DQ, Complement C2 and C4, Tumor necrosis factor`,
  `question: Discuss Human Leukocyte Antigen (HLA). The Class II region of the Major Histocompatibility Complex (MHC) encodes for which molecules? Page 256.
HLA-DR HLA-DP and HLA-DQ, HLA-A HLA-B and HLA-C, Complement C2 and C4, Tumor necrosis factor`,
  `question: Describe the characteristics of HLA antibodies. The majority of HLA alloantibodies belong to which immunoglobulin class? Page 257.
IgG, IgM, IgA, IgE`,
  `question: Discuss the role of irradiation in the prevention of transfusion-associated graft-versus-host disease (GVHD). What is the key method of preventing TA-GVHD? Page 257.
Irradiating cellular components, Using leukocyte reduction filters, Washing red blood cells, Providing CMV-negative units`,
  `question: Discuss the role of irradiation in the prevention of transfusion-associated graft-versus-host disease (GVHD). TA-GVHD primarily affects the skin liver and what other system? Page 258.
Gut, Kidneys, Lungs, Heart`,
  `question: Discuss component selection for the prevention of mismatched bone marrow transplants. Siblings have what chance of being HLA-identical? Page 258.
1 in 4, 1 in 2, 1 in 8, 1 in 100`,
  `question: Discuss component selection for the prevention of mismatched bone marrow transplants. What is considered the ideal (syngeneic) donor for a hematopoietic stem cell transplant? Page 258.
Identical twin, Sibling, Parent, Unrelated matched donor`,
  `question: Discuss component selection for the prevention of mismatched bone marrow transplants. To lessen the risk of GVHD in HPC transplants what process can be performed on the product? Page 258.
Leukocyte reduction, Plasma reduction, Irradiation, Saline washing`,
  `question: List the advantages and disadvantages of autologous transfusions. What is considered the primary advantage of an autologous transfusion? Page 259.
It is the safest possible blood, It is less expensive, It is always available, It does not require testing`,
  `question: List the advantages and disadvantages of autologous transfusions. What is a significant disadvantage of predeposit autologous donation programs? Page 259.
About half the units are not used, Risk of disease transmission, High rate of allergic reactions, Lower hemoglobin increase`,
  `question: Describe the factors to consider when an emergency transfusion is indicated. In an emergency what blood type should be used for a female of childbearing potential whose type is unknown? Page 260.
Group O-negative, Group O-positive, Group AB-negative, Group A-positive`,
  `question: Describe the factors to consider when an emergency transfusion is indicated. Transfusions should generally be reserved for patients who are losing more than what percentage of their blood volume? Page 260.
20%, 10%, 30%, 5%`,
  `question: Describe massive transfusion. Massive transfusion is defined as the replacement of one or more blood volumes within how many hours? Page 260.
24 hours, 12 hours, 6 hours, 48 hours`,
  `question: Describe massive transfusion. Massive transfusion is also defined as the administration of about how many units of blood to an adult? Page 260.
10 units, 5 units, 20 units, 15 units`,
  `question: Describe massive transfusion. In a massive transfusion protocol plasma is typically needed if the patient's PT ratio or INR is greater than what? Page 260.
1.5, 1.0, 2.0, 2.5`,
  `question: Describe massive transfusion. In a massive transfusion protocol cryoprecipitate may be indicated if the fibrinogen level is less than what value? Page 261.
100 mg/dL, 150 mg/dL, 200 mg/dL, 50 mg/dL`,
  `question: Discuss the risk factors associated with transfusions. What represents the main cause of transfusion-related deaths and acute hemolytic transfusion reactions? Page 262.
Clerical errors, Bacterial contamination, Allergic reactions, Component storage issues`,
  `question: Discuss the risk factors associated with transfusions. Standard blood administration sets have a filter designed to remove clots and cellular debris; what is the size of this filter? Page 262.
170 to 260 um, 50 to 100 um, 300 to 400 um, 10 to 20 um`,
  `question: Discuss the risk factors associated with transfusions. Blood components must be infused within what maximum time period? Page 262.
4 hours, 2 hours, 6 hours, 8 hours`,
  `question: Discuss the risk factors associated with transfusions. Which type of intravenous fluid is approved for the dilution of blood components? Page 262.
0.9% saline, 5% dextrose, Lactated Ringer's, Sterile water`,
  `question: Discuss transfusion reaction. Any transfusion-related adverse event that occurs during or after the transfusion is known as a what? Page 263.
Transfusion reaction, Side effect, Complication, Allergic response`,
  `question: Identify the types of transfusion reactions according to time interval between transfusion and presentation of adverse effects. A febrile nonhemolytic transfusion reaction is classified as what type of reaction? Page 263.
Acute, Delayed, Chronic, Anaphylactic`,
  `question: Identify the types of transfusion reactions according to time interval between transfusion and presentation of adverse effects. Transfusion-associated Graft-Versus-Host Disease is classified as what type of reaction? Page 263.
Delayed, Acute, Immediate, Chronic`,
  `question: Compare and contrast immediate hemolytic transfusion reactions (IHTR) with delayed hemolytic transfusion reactions (DHTR). An IHTR is a reaction that occurs within how many hours of a transfusion? Page 264.
24 hours, 48 hours, 72 hours, 1 week`,
  `question: Compare and contrast immediate hemolytic transfusion reactions (IHTR) with delayed hemolytic transfusion reactions (DHTR). The most severe immediate hemolytic transfusion reactions are associated with incompatibility in which blood group system? Page 264.
ABO, Rh, Kell, Duffy`,
  `question: Compare and contrast immediate hemolytic transfusion reactions (IHTR) with delayed hemolytic transfusion reactions (DHTR). A Delayed Hemolytic Transfusion Reaction (DHTR) is typically diagnosed how long after transfusion? Page 265.
5-10 days, 1-2 hours, 24-48 hours, 30 days`,
  `question: Compare and contrast immediate hemolytic transfusion reactions (IHTR) with delayed hemolytic transfusion reactions (DHTR). A DHTR usually occurs as what type of immune response in a previously sensitized individual? Page 265.
Anamnestic, Primary, Autoimmune, Allergic`,
  `question: Identify the antibodies most commonly associated with IHTRs and DHTRs. Which IgM antibody is commonly associated with immediate hemolytic transfusion reactions? Page 266.
Anti-A, Anti-Kell, Anti-Jka, Anti-Fya`,
  `question: Identify the antibodies most commonly associated with IHTRs and DHTRs. Which IgG antibody is most commonly associated with delayed hemolytic transfusion reactions? Page 266.
Anti-Jk, Anti-A, Anti-P1, Anti-M`,
  `question: Describe immediate nonhemolytic transfusion reactions. A Febrile Nonhemolytic Transfusion Reaction is defined by at least what increase in body temperature? Page 267.
1 degree C, 2 degrees C, 0.5 degrees C, 1 degree F`,
  `question: Describe immediate nonhemolytic transfusion reactions. An allergic transfusion reaction occurs when recipient antibodies usually of what class react to a donor-derived allergen? Page 267.
IgE, IgG, IgM, IgA`,
  `question: Describe immediate nonhemolytic transfusion reactions. Transfusion-Related Acute Lung Injury (TRALI) is a pulmonary complication that typically occurs within how many hours of a transfusion? Page 268.
6 hours, 12 hours, 24 hours, 2 hours`,
  `question: Describe immediate nonhemolytic transfusion reactions. Transfusing blood too quickly can overload the circulatory system causing a condition known as what? Page 268.
TACO, TRALI, TAS, FNHTR`,
  `question: Describe immediate nonhemolytic transfusion reactions. Transfusion-Associated Sepsis (TAS) is most frequently caused by transfusion of which bacterially contaminated product due to its storage temperature? Page 269.
Platelets, Red Blood Cells, Fresh Frozen Plasma, Whole Blood`,
  `question: Describe delayed nonhemolytic transfusions. TAGVHD is caused by an immunologic attack by viable donor lymphocytes against whom? Page 269.
The transfusion recipient, The donor's own cells, The remaining blood unit, The transfusion equipment`,
  `question: Describe delayed nonhemolytic transfusions. Post-Transfusion Purpura (PTP) is a delayed immune complication that presents with profound what? Page 270.
Thrombocytopenia, Anemia, Leukopenia, Pancytopenia`,
  `question: Describe delayed nonhemolytic transfusions. Iron overload is a risk for chronically transfused patients and can lead to damage in the liver heart and what other organs? Page 270.
Endocrine organs, Kidneys, Lungs, Spleen`,
  `question: Discuss the importance of the patient's history relative to medications transfusion history and pregnancies. Which herbal supplements are known to increase a patient's bleeding risk? Page 271.
Garlic ginkgo and ginseng, St John's wort, Echinacea, Saw palmetto`,
  `question: List the steps and procedures to follow in a laboratory investigation of transfusion reactions. The immediate investigation of a suspected transfusion reaction should always begin with what? Page 272.
Clerical checks, A DAT test, An antibody screen, A crossmatch`,
  `question: Discuss reporting requirements for transfusion reaction work-ups. A transfusion reaction resulting in a fatality must be reported immediately by telephone to the Director of the Office of Compliance for which agency? Page 274.
CBER, AABB, CAP, The Joint Commission`,
  `question: State regulatory requirements and procedures for reporting a fatal transfusion reactions. A written report of a fatal transfusion reaction must be submitted to the director of CBER within how many days? Page 274.
7 days, 14 days, 30 days, 3 days`,
  `question: Identify the agencies involved in determining transfusion reactions policies. Which of the following is a primary agency involved in setting policies for transfusion reactions? Page 273.
AABB, CDC, NIH, OSHA`
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