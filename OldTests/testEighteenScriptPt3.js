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
  `question: Describe the plasma clotting disorders to include the general types of bleeding associated with them. Page 265. Plasma factor disorders can be caused by poor synthesis mutations or inactivation by what?
Inhibitors, Cofactors, Substrates, Enzymes`,
  `question: Describe the plasma clotting disorders to include the general types of bleeding associated with them. Page 265. All plasma clotting disorders are technically classified under what general term?
Hemophilias, Thrombocytopenias, Anemias, Leukemias`,
  `question: Describe the plasma clotting disorders to include the general types of bleeding associated with them. Page 265. Bleeding from the gums tongue or tonsils is classified as what type of bleeding?
Open bleeding, Closed bleeding, Internal bleeding, Spontaneous bleeding`,
  `question: Describe the plasma clotting disorders to include the general types of bleeding associated with them. Page 265. Bleeding in muscles bones joints and the skull is classified as what type of bleeding?
Closed bleeding, Open bleeding, Superficial bleeding, External bleeding`,
  `question: Describe the plasma clotting disorders to include the general types of bleeding associated with them. Page 265. What is the medical term for a nosebleed?
Epistaxis, Menorrhagia, Hemarthrosis, Hematoma`,
  `question: Describe the plasma clotting disorders to include the general types of bleeding associated with them. Page 265. What is the medical term for heavy or prolonged menstrual bleeding?
Menorrhagia, Epistaxis, Hematuria, Hemoptysis`,
  `question: Describe the pathophysiology and symptoms of Hemophilia A and B. Page 266. Hemophilia A is a deficiency of which coagulation factor?
Factor VIII, Factor IX, Factor VII, Factor X`,
  `question: Describe the pathophysiology and symptoms of Hemophilia A and B. Page 266. Hemophilia B is a deficiency of which coagulation factor?
Factor IX, Factor VIII, Factor XI, Factor V`,
  `question: Describe the pathophysiology and symptoms of Hemophilia A and B. Page 266. The genes for Hemophilia A and B are controlled by which chromosome making them sex-linked diseases?
X-chromosome, Y-chromosome, Chromosome 12, Chromosome 9`,
  `question: Describe the pathophysiology and symptoms of Hemophilia A and B. Page 266. What percentage of all hemophilia cases are attributed to Hemophilia A?
85%, 10%, 25%, 50%`,
  `question: Describe the pathophysiology and symptoms of Hemophilia A and B. Page 266. What percentage of all hemophilia cases are attributed to Hemophilia B?
10%, 85%, 5%, 15%`,
  `question: Describe the pathophysiology and symptoms of Hemophilia A and B. Page 266. Factor VIII and Factor IX are both part of which coagulation pathway?
Intrinsic pathway, Extrinsic pathway, Common pathway, Fibrinolytic pathway`,
  `question: Describe the pathophysiology and symptoms of Hemophilia A and B. Page 266. Why are the physical symptoms of Hemophilia A and B indistinguishable from one another?
Both factors are in the same pathway, They are caused by the same gene, They affect the same organs, They have the same inheritance pattern`,
  `question: Describe the pathophysiology and symptoms of Hemophilia A and B. Page 266. What is the term for bleeding or bloody effusion inside a joint a common symptom in hemophiliacs?
Hemarthrosis, Hematoma, Ecchymosis, Petechiae`,
  `question: Describe the pathophysiology and symptoms of Hemophilia A and B. Page 266. For transportation in the plasma Factor VIII forms a complex with which other factor?
vWF, Factor IX, Factor V, Fibrinogen`,
  `question: Differentiate the laboratory results and treatments of an individual with Hemophilia A & B. Page 267. In a patient with Hemophilia A or B what would be the expected Bleeding Time result?
Normal, Increased, Decreased, Variable`,
  `question: Differentiate the laboratory results and treatments of an individual with Hemophilia A & B. Page 267. What is the expected Prothrombin Time (PT) result for a patient with Hemophilia A or B?
Normal, Increased, Decreased, Clotted`,
  `question: Differentiate the laboratory results and treatments of an individual with Hemophilia A & B. Page 267. What is the expected Activated Partial Thromboplastin Time (APTT) result for a patient with Hemophilia A or B?
Increased, Normal, Decreased, Unmeasurable`,
  `question: Differentiate the laboratory results and treatments of an individual with Hemophilia A & B. Page 267. To specifically test for Hemophilia B a 1:10 dilution of patient plasma is mixed with what reagent?
Factor IX deficient reagent, Factor VIII deficient reagent, Normal plasma, Saline`,
  `question: Differentiate the laboratory results and treatments of an individual with Hemophilia A & B. Page 267. To specifically test for Hemophilia A a 1:10 dilution of patient plasma is mixed with what reagent?
Factor VIII deficient reagent, Factor IX deficient reagent, Normal plasma, Prothrombin complex`,
  `question: Differentiate the laboratory results and treatments of an individual with Hemophilia A & B. Page 267. Most coagulation factors need to be at what minimum percentage of activity to achieve hemostasis?
30%, 10%, 50%, 100%`,
  `question: Differentiate the laboratory results and treatments of an individual with Hemophilia A & B. Page 267. A patient with a clotting factor activity level of less than 1% is classified as having what severity of disease?
Severe, Moderate, Mild, Asymptomatic`,
  `question: Differentiate the laboratory results and treatments of an individual with Hemophilia A & B. Page 267. A patient with a clotting factor activity level between 1% and 5% is classified as having what severity of disease?
Moderate, Severe, Mild, Subclinical`,
  `question: Differentiate the laboratory results and treatments of an individual with Hemophilia A & B. Page 267. A patient with a clotting factor activity level between 6% and 24% is classified as having what severity of disease?
Mild, Severe, Moderate, Carrier`,
  `question: Differentiate the laboratory results and treatments of an individual with Hemophilia A & B. Page 268. In the past what blood product was commonly used to treat Hemophilia A?
Cryoprecipitate, Fresh Frozen Plasma, Packed Red Blood Cells, Whole Blood`,
  `question: Differentiate the laboratory results and treatments of an individual with Hemophilia A & B. Page 268. What modern products are now available for treating both Hemophilia A and B?
Recombinant products, Prothrombin complex, Vitamin K, Desmopressin`,
  `question: Differentiate the laboratory results and treatments of an individual with Hemophilia A & B. Page 268. What is another name for Hemophilia B?
Christmas Disease, von Willebrand Disease, Hemophilia C, Stuart-Prower Disease`,
  `question: Differentiate the laboratory results and treatments of an individual with Hemophilia A & B. Page 268. Treatment for Hemophilia B can consist of Factor IX concentrates or what other product?
Prothrombin complex, Cryoprecipitate, Factor VIII concentrate, Fresh Frozen Plasma`,
  `question: Differentiate the laboratory results and treatments of an individual with Hemophilia A & B. Page 268. Patients with hemophilia who receive infusion products run the risk of developing what?
Inhibitors or antibodies, Allergic reactions, Thrombosis, Liver disease`,
  `question: Describe the Congenital Factor Deficiencies. Page 269. Deficiencies of factors II V VII and X are rare and typically have what mode of inheritance?
Autosomal recessive, Autosomal dominant, X-linked recessive, X-linked dominant`,
  `question: Describe the Congenital Factor Deficiencies. Page 269. Deficiencies in factors of the common pathway such as Factor X would result in what PT and APTT results?
Prolonged PT and APTT, Normal PT and APTT, Prolonged PT and Normal APTT, Normal PT and Prolonged APTT`,
  `question: Describe the Congenital Factor Deficiencies. Page 269. Prothrombin complex concentrates are used to treat deficiencies of factors II X and what other factor?
VII, V, VIII, IX`,
  `question: Describe the Congenital Factor Deficiencies. Page 269. Deficiencies in contact activation factors like XII HMWK and Prekallikrein are associated with a higher risk of what condition?
Thrombosis, Bleeding, Infection, Anemia`,
  `question: Describe the Congenital Factor Deficiencies. Page 269. A deficiency in Factor XI is also known as what?
Hemophilia C, Hemophilia A, Hemophilia B, Parahemophilia`,
  `question: Describe the Congenital Factor Deficiencies. Page 269. Which factor deficiency presents with a normal PT and PTT but is associated with poor wound healing and umbilical cord bleeding?
Factor XIII Deficiency, Factor XI Deficiency, Factor XII Deficiency, Factor V Deficiency`,
  `question: Describe the Congenital Factor Deficiencies. Page 269. The 5 M urea test which measures the stability of a clot after 24 hours is used to diagnose a deficiency in which factor?
Factor XIII, Factor XII, Factor X, Factor VIII`,
  `question: Describe the Congenital Factor Deficiencies. Page 269. Without Factor XIII a clot will not properly do what?
Stabilize, Form, Lyse, Retract`,
  `question: Describe the Congenital Factor Deficiencies. Page 269. Factor XIII deficiency can be associated with leukemias disseminated intravascular coagulation and what other disease?
Cohn's disease, Sickle Cell Anemia, Thalassemia, Lupus`,
  `question: Describe the acquired bleeding disorders. Page 270. What fat-soluble vitamin is required for the activation of factors II VII IX and X?
Vitamin K, Vitamin C, Vitamin D, Vitamin B12`,
  `question: Describe the acquired bleeding disorders. Page 270. In addition to being obtained from green leafy vegetables fish and liver Vitamin K is also synthesized by what?
Intestinal flora, The liver, The kidneys, Bone marrow`,
  `question: Describe the acquired bleeding disorders. Page 270. Antibiotic therapy malabsorption syndrome and what other condition are common causes of Vitamin K deficiency?
Liver disease, Kidney disease, Heart disease, Autoimmune disorders`,
  `question: Describe the acquired bleeding disorders. Page 270. What would be the expected PT and APTT results in a patient with a significant Vitamin K deficiency?
Increased PT and APTT, Normal PT and APTT, Increased PT and Normal APTT, Normal PT and Increased APTT`,
  `question: Describe the acquired bleeding disorders. Page 270. How is a bleeding disorder caused by a Vitamin K deficiency typically treated?
Providing vitamin K, Infusing plasma, Giving factor concentrates, Administering cryoprecipitate`,
  `question: Describe the plasma clotting disorders to include the general types of bleeding associated with them. Page 265. What is one of the causes listed for plasma factor disorders where factors are used up by abnormal clotting?
Rouge clotting processes, Poor synthesis, Mutations, Functional impairment`,
  `question: Describe the pathophysiology and symptoms of Hemophilia A and B. Page 266. A significant portion of Hemophilia A cases (20%-30%) arise from what?
Spontaneous mutation, Environmental factors, Viral infections, Autosomal inheritance`,
  `question: Differentiate the laboratory results and treatments of an individual with Hemophilia A & B. Page 268. In the 1980s 80%-90% of hemophilia A patients treated with certain products contracted what virus?
HIV virus, Hepatitis C virus, Epstein-Barr virus, Cytomegalovirus`,
  `question: Describe the Congenital Factor Deficiencies. Page 269. Deficiencies of factors in the contact activation group such as Factor XI are involved early in which process?
Coagulation cascade, Fibrinolysis, Platelet adhesion, Platelet aggregation`,
  `question: Describe the pathophysiology and symptoms of Hemophilia A and B. Page 266. Bleeding in the GI tract kidneys gums and muscles are all symptoms of what disorders?
Hemophilia A and B, Von Willebrand Disease, Factor XIII deficiency, Thrombocytopenia`,
  `question: Differentiate the laboratory results and treatments of an individual with Hemophilia A & B. Page 267. Factor assays are performed in conjunction with which screening test?
APTT tests, PT tests, Bleeding time, Thrombin time`,
  `question: Describe the Congenital Factor Deficiencies. Page 269. Keloid scarring is a unique symptom associated with a deficiency of which factor?
Factor XIII, Factor XI, Factor X, Factor XII`,
  `question: Describe the acquired bleeding disorders. Page 270. A depressed activity of a specific vitamin K dependent factor would be revealed by what test?
Factor assays, PT, APTT, Bleeding Time`,
  `question: Describe the plasma clotting disorders to include the general types of bleeding associated with them. Page 265. Umbilical cord and circumcisional bleeding are examples of what?
Open bleeding, Closed bleeding, Hemarthrosis, Thrombosis`,
  `question: Differentiate the laboratory results and treatments of an individual with Hemophilia A & B. Page 268. Prothrombin complex used to treat Hemophilia B contains factors II IX X and what other factor?
VII, V, VIII, I`,
  `question: Describe the Congenital Factor Deficiencies. Page 269. A deficiency in which factor has little or no bleeding manifestations?
XII, V, VII, X`,
  `question: Describe the pathophysiology and symptoms of Hemophilia A and B. Page 266. Factor IX deficiency is what type of genetic disease?
Recessive sex-linked, Dominant sex-linked, Autosomal recessive, Autosomal dominant`,
  `question: Differentiate the laboratory results and treatments of an individual with Hemophilia A & B. Page 267. An abnormal factor assay result suggests that the patient is missing what?
The same factor, A different factor, An inhibitor, A cofactor`,
  `question: Describe the Congenital Factor Deficiencies. Page 269. In a Factor XIII deficiency a clot forms initially but what happens to it?
It does not stabilize, It lyses too quickly, It retracts poorly, It becomes too large`,
  `question: Describe the acquired bleeding disorders. Page 270. Which organ is a major source of coagulation problems and synthesizes most clotting factors?
Liver, Spleen, Kidney, Bone marrow`,
  `question: Describe the Congenital Factor Deficiencies. Page 269. Patients with deficiencies of factors II V VII and X either lack the coagulant protein or have a what?
Nonfunctional variant, An inhibitor, An antibody, An overactive enzyme`,
  `question: Describe the plasma clotting disorders to include the general types of bleeding associated with them. Page 265. Generally speaking which two disorders are typically named as hemophilias?
Hemophilia A and B, Hemophilia C and D, Factor V and VII deficiency, Factor X and II deficiency`
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