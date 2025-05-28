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
  `question: What are proteins or lipids that become glycated after exposure to sugars called?
Advanced Glycated End Products AGEs, Monosaccharides, Disaccharides, Polysaccharides`,

  `question: What is an organic compound with a carbonyl group at the end of the carbon chain bonded to hydrogen and an R group?
Aldehyde, Ketone, Alcohol, Ether`,

  `question: Carbohydrates are biological molecules made of carbon hydrogen and oxygen in roughly what ratio of carbon atoms to water molecules?
One carbon atom to one water molecule, Two carbon atoms to one water molecule, One carbon atom to two water molecules, Three carbon atoms to one water molecule`,

  `question: What is the metabolic pathway in which lactate from anaerobic glycolysis in muscles moves to the liver and is converted to glucose?
Cori Cycle Lactic Acid Cycle, Krebs Cycle, Glycolysis, Gluconeogenesis`,

  `question: What group of metabolic disorders is characterized by a high blood sugar level over a prolonged period?
Diabetes Mellitus, Hypoglycemia, Glycogen Storage Disease, Galactosemia`,

  `question: What type of progressive kidney disease may occur in people who have diabetes?
Diabetic Nephropathy, Diabetic Retinopathy, Diabetic Neuropathy, Glomerulonephritis`,

  `question: What eye condition can cause vision loss and blindness in people who have diabetes?
Diabetic Retinopathy, Diabetic Nephropathy, Cataracts, Glaucoma`,

  `question: What are sugars formed when two monosaccharides are joined by a glycosidic linkage called?
Disaccharide, Monosaccharide, Polysaccharide, Oligosaccharide`,

  `question: What is any degree of glucose intolerance with onset or first recognition during pregnancy called?
Gestational Diabetes Mellitus GDM, Type 1 Diabetes Mellitus, Type 2 Diabetes Mellitus, Neonatal Diabetes`,

  `question: What is the process of adding a carbohydrate to a protein or lipid called?
Glycation, Glycolysis, Gluconeogenesis, Glycogenolysis`,

  `question: What is the formation of glycogen from glucose called?
Glycogenesis, Glycogenolysis, Glycolysis, Gluconeogenesis`,

  `question: What is the breakdown of glycogen back into glucose called?
Glycogenolysis, Glycogenesis, Gluconeogenesis, Glycolysis`,

  `question: What is the metabolic process that breaks down carbohydrates and sugars through a series of reactions to release energy?
Glycolysis, Glycogenesis, Gluconeogenesis, Lipolysis`,

  `question: What are simple sugars that cannot be broken down into simpler sugars by hydrolysis?
Monosaccharide, Disaccharide, Polysaccharide, Oligosaccharide`,

  `question: What are carbohydrates containing two to ten monosaccharide units?
Oligosaccharide, Monosaccharide, Disaccharide, Polysaccharide`,

  `question: What are complex carbohydrates composed of many monosaccharide units joined by glycosidic linkages?
Polysaccharide, Monosaccharide, Disaccharide, Oligosaccharide`,

  `question: What is the storage form of glucose in the liver and muscles?
Glycogen, Starch, Cellulose, Fructose`,

  `question: Carbohydrates are widely distributed in nature and serve as a major what for living organisms?
Source of metabolic energy, Structural component only, Storage of genetic information, Catalyst for reactions`,

  `question: Carbohydrates are composed of what three elements?
Carbon Hydrogen Oxygen, Carbon Nitrogen Oxygen, Carbon Hydrogen Nitrogen, Carbon Sulfur Phosphorus`,

  `question: The term carbohydrate literally means what?
Hydrates of carbon, Sugar chains, Sweet molecules, Energy packets`,

  `question: Monosaccharides are classified based on the number of carbon atoms they contain and what else?
The type of carbonyl group aldehyde or ketone, Their color, Their solubility in water, Their taste`,

  `question: A monosaccharide with an aldehyde group is called an aldose and one with a ketone group is called a what?
Ketose, Aldose, Hexose, Pentose`,

  `question: Glucose fructose and galactose are examples of what type of monosaccharide based on carbon number?
Hexoses six carbons, Pentoses five carbons, Trioses three carbons, Tetroses four carbons`,

  `question: What is the most abundant monosaccharide in nature and the most important for the human body?
Glucose, Fructose, Galactose, Ribose`,

  `question: Which monosaccharide is known as fruit sugar and is the sweetest of all sugars?
Fructose, Glucose, Galactose, Mannose`,

  `question: Which monosaccharide is a component of lactose or milk sugar?
Galactose, Glucose, Fructose, Sucrose`,

  `question: When two monosaccharides combine what type of bond is formed between them?
Glycosidic bond, Peptide bond, Ester bond, Hydrogen bond`,

  `question: Lactose maltose and sucrose are the most common examples of what?
Disaccharides, Monosaccharides, Polysaccharides, Oligosaccharides`,

  `question: Lactose is composed of which two monosaccharides?
Glucose and Galactose, Glucose and Fructose, Two Glucose units, Glucose and Mannose`,

  `question: Sucrose commonly known as table sugar is composed of which two monosaccharides?
Glucose and Fructose, Glucose and Galactose, Two Glucose units, Fructose and Galactose`,

  `question: Maltose is composed of which two monosaccharides?
Two Glucose units, Glucose and Fructose, Glucose and Galactose, Fructose and Galactose`,

  `question: Polysaccharides can be linear or what other type of structure?
Branched, Cyclic, Spiral, Planar`,

  `question: Starch glycogen and cellulose are examples of what type of carbohydrate?
Polysaccharides, Disaccharides, Monosaccharides, Simple sugars`,

  `question: What is the storage form of carbohydrates in plants?
Starch, Glycogen, Cellulose, Chitin`,

  `question: What is the major structural component of plant cell walls?
Cellulose, Starch, Glycogen, Lignin`,

  `question: Can humans digest cellulose?
No, Yes easily, Only if cooked, Partially`,

  `question: What happens to carbohydrates in the mouth during digestion?
Salivary amylase begins starch digestion, Protein digestion begins, Fat emulsification occurs, No carbohydrate digestion occurs`,

  `question: In the small intestine pancreatic amylase continues the digestion of what?
Starch and glycogen, Proteins, Fats, Nucleic acids`,

  `question: The final digestion of disaccharides into monosaccharides occurs by enzymes located where?
On the brush border of intestinal mucosal cells, In the stomach, In the large intestine, In the liver`,

  `question: Glucose galactose and fructose are absorbed from the intestine and transported to where?
The liver via the portal vein, The kidneys for excretion, The pancreas for storage, The muscles directly`,

  `question: Which organ plays a central role in regulating blood glucose levels?
Liver, Pancreas, Kidneys, Spleen`,

  `question: After a carbohydrate meal excess glucose is converted to glycogen in the liver by which process?
Glycogenesis, Glycogenolysis, Gluconeogenesis, Lipogenesis`,

  `question: When blood glucose levels fall the liver can break down glycogen to release glucose through which process?
Glycogenolysis, Glycogenesis, Glycolysis, Lipolysis`,

  `question: What is the synthesis of glucose from non-carbohydrate sources such as amino acids lactate or glycerol called?
Gluconeogenesis, Glycogenesis, Glycogenolysis, Ketogenesis`,

  `question: The complete pathway for the oxidation of glucose to produce ATP is called what?
Cellular respiration including glycolysis and citric acid cycle, Photosynthesis, Fermentation, Beta-oxidation`,

  `question: Which hormone is secreted by the beta cells of the pancreas in response to high blood glucose?
Insulin, Glucagon, Cortisol, Epinephrine`,

  `question: What is the primary action of insulin?
To lower blood glucose by promoting glucose uptake into cells, To raise blood glucose by promoting glycogenolysis, To stimulate gluconeogenesis, To inhibit glucose absorption`,

  `question: Which hormone is secreted by the alpha cells of the pancreas in response to low blood glucose?
Glucagon, Insulin, Somatostatin, Amylin`,

  `question: What is the primary action of glucagon?
To raise blood glucose by stimulating glycogenolysis and gluconeogenesis, To lower blood glucose by inhibiting glucose production, To promote glucose storage as fat, To increase insulin sensitivity`,

  `question: Epinephrine cortisol and growth hormone are hormones that tend to do what to blood glucose levels?
Increase them, Decrease them, Have no effect on them, Stabilize them at a low level`,

  `question: What is the hallmark symptom of diabetes mellitus?
Hyperglycemia, Hypoglycemia, Ketonuria, Proteinuria`,

  `question: Type 1 diabetes mellitus is characterized by what?
Autoimmune destruction of pancreatic beta cells leading to insulin deficiency, Insulin resistance and relative insulin deficiency, Glucose intolerance during pregnancy, Maturity onset diabetes of the young`,

  `question: Type 2 diabetes mellitus is primarily characterized by what?
Insulin resistance and often relative insulin deficiency, Absolute insulin deficiency from birth, Autoimmune attack on alpha cells, Overproduction of glucagon`,

  `question: Which type of diabetes accounts for the vast majority of cases worldwide?
Type 2 Diabetes Mellitus, Type 1 Diabetes Mellitus, Gestational Diabetes Mellitus, Monogenic Diabetes`,

  `question: What is a common acute complication of uncontrolled Type 1 diabetes leading to metabolic acidosis?
Diabetic Ketoacidosis DKA, Hyperosmolar Hyperglycemic State HHS, Hypoglycemic coma, Lactic acidosis`,

  `question: Chronic complications of diabetes mellitus can affect which organs or systems?
Eyes kidneys nerves and blood vessels, Only the pancreas, Only the liver, Only the digestive system`,

  `question: What is a blood glucose level below the established reference range called?
Hypoglycemia, Hyperglycemia, Euglycemia, Dysglycemia`,

  `question: Symptoms of hypoglycemia can include confusion dizziness sweating and palpitations. True or False?
True, False, Only in diabetics, Only after a large meal`,

  `question: Glycogen storage diseases are inherited disorders affecting what process?
The synthesis or breakdown of glycogen, The absorption of glucose, The secretion of insulin, The production of glucagon`,

  `question: The oral glucose tolerance test OGTT is used to diagnose what condition?
Diabetes mellitus and gestational diabetes, Hypoglycemia only, Glycogen storage diseases, Pancreatic enzyme deficiency`
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