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
  `question: State the composition and functions of amniotic fluid. Page 133. Which of the following is a primary function of amniotic fluid?
    Permit proper lung development, Provide nutrients to the fetus, Regulate maternal blood pressure, Remove fetal waste`,
  `question: State the composition and functions of amniotic fluid. Page 133. During the first trimester amniotic fluid is derived primarily from what?
    The maternal circulation, Fetal urine, Fetal swallowing, Fetal lung fluid`,
  `question: State the composition and functions of amniotic fluid. Page 133. During the third trimester amniotic fluid volume is primarily derived from what?
    Fetal urine, The maternal circulation, Fetal lung fluid, Intramembranous flow`,
  `question: State the composition and functions of amniotic fluid. Page 134. Lung surfactants found in amniotic fluid serve as an index of what?
    Fetal lung maturity, Fetal distress, Fetal age, Fetal infection`,
  `question: State the composition and functions of amniotic fluid. Page 134. An excessive accumulation of amniotic fluid is termed what?
    Polyhydramnios, Oligohydramnios, Anhydramnios, Hydrocephalus`,
  `question: State the composition and functions of amniotic fluid. Page 134. A decreased amniotic fluid volume due to increased fetal swallowing or membrane leakage is termed what?
    Oligohydramnios, Polyhydramnios, Amnionitis, Hydramnios`,
  `question: State the composition and functions of amniotic fluid. Page 134. As fetal urine production begins what substances increase in the amniotic fluid?
    Creatinine urea and uric acid, Glucose and protein, Bilirubin and lipids, Enzymes and electrolytes`,
  `question: State the composition and functions of amniotic fluid. Page 134. Polyhydramnios can be an indication of fetal structural anomalies or what else?
    Neural tube disorders, Umbilical cord compression, Congenital malformations, Premature membrane rupture`,
  `question: Describe the specimen handling and processing procedures for testing amniotic fluid. Page 136. What is the name of the procedure to obtain amniotic fluid by needle aspiration?
    Amniocentesis, Paracentesis, Thoracentesis, Arthrocentesis`,
  `question: Describe the specimen handling and processing procedures for testing amniotic fluid. Page 136. Fluid collected for bilirubin analysis must be protected from what?
    Light, Heat, Cold, Agitation`,
  `question: Describe the specimen handling and processing procedures for testing amniotic fluid. Page 136. How should fluid for fetal lung maturity (FLM) tests be transported to the laboratory?
    Placed in ice, Kept at room temperature, Kept at body temperature, Protected from light`,
  `question: Describe the specimen handling and processing procedures for testing amniotic fluid. Page 136. To prolong the life of the cells how should specimens for cytogenetic studies be maintained?
    At room or body temperature, Frozen, Refrigerated, Placed in ice`,
  `question: Describe the specimen handling and processing procedures for testing amniotic fluid. Page 136. A maximum of how much amniotic fluid is typically collected during amniocentesis?
    30 mL, 10 mL, 50 mL, 100 mL`,
  `question: Describe amniotic fluid laboratory analysis. Page 137. What is the color of normal amniotic fluid?
    Colorless, Yellow, Dark Green, Dark Red`,
  `question: Describe amniotic fluid laboratory analysis. Page 137. A yellow color in amniotic fluid is indicative of what?
    Hemolytic Disease of Newborn, Fetal Death, Meconium, A traumatic tap`,
  `question: Describe amniotic fluid laboratory analysis. Page 137. A dark green color in amniotic fluid is caused by the presence of what?
    Meconium, Bilirubin, Fetal hemoglobin, Maternal blood`,
  `question: Describe amniotic fluid laboratory analysis. Page 137. A very dark red-brown amniotic fluid is associated with what?
    Fetal Death, Meconium, HDFN, A traumatic tap`,
  `question: Describe amniotic fluid laboratory analysis. Page 137. The source of blood in a blood-streaked fluid can be determined using what test?
    Kleihauer-Betke test, Fern test, Liley graph, AFP test`,
  `question: Describe amniotic fluid laboratory analysis. Page 138. The presence of 'fernlike' crystals in a vaginal fluid specimen is a positive screen for what?
    Amniotic fluid, Maternal urine, Semen, Cervical mucus`,
  `question: Describe amniotic fluid laboratory analysis. Page 138. The destruction of fetal red blood cells in HDFN results in the appearance of what substance in the amniotic fluid?
    Unconjugated bilirubin, Conjugated bilirubin, Alpha-fetoprotein, Acetylcholinesterase`,
  `question: Describe amniotic fluid laboratory analysis. Page 138. What can be given to at-risk pregnant females to prevent anti-Rh antibody production?
    Rh immunoglobulin (RhoGAM), Aspirin, Antibiotics, Corticosteroids`,
  `question: Describe amniotic fluid laboratory analysis. Page 139. On a Liley graph a value falling in which zone suggests a severely affected fetus?
    Zone III, Zone I, Zone II, Zone IV`,
  `question: Describe amniotic fluid laboratory analysis. Page 139. Increased levels of alpha-fetoprotein (AFP) in maternal circulation and amniotic fluid can indicate what?
    Fetal neural tube defects, Hemolytic disease, Fetal lung immaturity, Fetal death`,
  `question: Describe amniotic fluid laboratory analysis. Page 139. Spina bifida and anencephaly are examples of what type of defect?
    Neural tube defects, Cardiac defects, Chromosomal abnormalities, Congenital infections`,
  `question: Describe amniotic fluid laboratory analysis. Page 140. Elevated amniotic fluid AFP levels are typically followed by measurement of what more specific enzyme?
    Amniotic acetylcholinesterase (AChE), Creatine kinase, Alkaline phosphatase, Lactate dehydrogenase`,
  `question: Describe the normal composition of feces. Page 143. Diarrhea is defined as an increase in daily stool weight above how many grams?
    200 g, 100 g, 500 g, 150 g`,
  `question: Describe the normal composition of feces. Page 143. The major mechanisms of diarrhea are osmotic altered motility and what else?
    Secretory, Inflammatory, Exudative, Malabsorptive`,
  `question: Describe the normal composition of feces. Page 144. Infections with E. coli Clostridium and Vibrio cholerae cause what type of diarrhea?
    Secretory, Osmotic, Altered Motility, Maldigestion`,
  `question: Describe the normal composition of feces. Page 144. Lactose intolerance and celiac disease are common causes of what type of diarrhea?
    Osmotic, Secretory, Altered Motility, Inflammatory`,
  `question: Describe the normal composition of feces. Page 145. Irritable bowel syndrome (IBS) is a functional disorder categorized as what mechanism of diarrhea?
    Altered Motility, Secretory, Osmotic, Malabsorption`,
  `question: Describe the normal composition of feces. Page 146. An increase in stool fat that exceeds 6 g per day is termed what?
    Steatorrhea, Diarrhea, Constipation, Creatorrhea`,
  `question: Describe the normal composition of feces. Page 146. What test is used to differentiate steatorrhea caused by malabsorption from that caused by maldigestion?
    D-xylose test, Fecal fat test, Occult blood test, Stool pH`,
  `question: Describe the normal composition of feces. Page 146. In the D-xylose test a low level of D-xylose in the urine indicates what condition?
    Malabsorption, Maldigestion, Pancreatitis, Pancreatic insufficiency`,
  `question: Describe fecal collection methods. Page 147. A timed specimen usually a 3-day collection is required for what quantitative test?
    Fecal fat, Occult blood, Leukocytes, Muscle fibers`,
  `question: Describe fecal collection methods. Page 147. Specimens for fecal analysis must not be contaminated with toilet water or what else?
    Urine, Blood, Mucus, Bile`,
  `question: Describe the macroscopic examination of an abnormal fecal specimen. Page 148. The normal brown color of feces results from the intestinal oxidation of stercobilinogen to what?
    Urobilin, Bilirubin, Biliverdin, Urobilinogen`,
  `question: Describe the macroscopic examination of an abnormal fecal specimen. Page 148. Pale or clay-colored stools may signify a blockage of what?
    The bile duct, The small intestine, The stomach, The large intestine`,
  `question: Describe the macroscopic examination of an abnormal fecal specimen. Page 148. Blood that originates from the esophagus or stomach produces what characteristic appearance in stool?
    Black and tarry, Bright red, Dark red, Streaked with blood`,
  `question: Describe the macroscopic examination of an abnormal fecal specimen. Page 148. Ingestion of iron bismuth or what other substance can also produce a black stool?
    Charcoal, Beets, Barium, Antibiotics`,
  `question: Describe the macroscopic examination of an abnormal fecal specimen. Page 148. Green stools may be observed in patients taking oral antibiotics due to the oxidation of fecal bilirubin to what?
    Biliverdin, Urobilin, Stercobilin, Urobilinogen`,
  `question: Describe the macroscopic examination of an abnormal fecal specimen. Page 149. Slender ribbon-like stools suggest what condition?
    An obstruction, Diarrhea, Constipation, Steatorrhea`,
  `question: Describe the macroscopic examination of an abnormal fecal specimen. Page 149. Pale bulky frothy and foul-smelling stools are associated with what?
    Steatorrhea, Biliary obstruction, Intestinal obstruction, Diarrhea`,
  `question: Describe the microscopic examination of a fecal specimen. Page 150. The presence of fecal leukocytes is seen in conditions that affect the intestinal mucosa such as bacterial dysentery and what?
    Ulcerative colitis, Celiac disease, Lactose intolerance, Irritable bowel syndrome`,
  `question: Describe the microscopic examination of a fecal specimen. Page 150. As few as how many neutrophils per high-power field can be indicative of an invasive condition?
    Three, Ten, One, Five`,
  `question: Describe the microscopic examination of a fecal specimen. Page 151. The presence of undigested striated muscle fibers in feces can be helpful in diagnosing what condition?
    Pancreatic insufficiency, Biliary obstruction, Celiac disease, Crohn disease`,
  `question: Describe the microscopic examination of a fecal specimen. Page 151. When counting muscle fibers only which type of fibers are counted?
    Undigested, Partially digested, Digested, All fibers`,
  `question: Describe the microscopic examination of a fecal specimen. Page 151. For the qualitative fecal fats test what stain is used to visualize the lipids?
    Sudan III, Methylene blue, Eosin, Wright's stain`,
  `question: Describe the microscopic examination of a fecal specimen. Page 151. The neutral fat stain consists of observing for large orange-red droplets representing what?
    Triglycerides, Fatty acids, Soaps, Cholesterol`,
  `question: Describe chemical testing of fecal specimens. Page 153. What is the most frequently performed chemical analysis on feces?
    Occult blood, Fat, pH, Electrolytes`,
  `question: Describe chemical testing of fecal specimens. Page 153. The principle of the guaiac-based fecal occult blood test (gFOBT) is based on the pseudoperoxidase activity of what?
    Hemoglobin, Myoglobin, Peroxidase, Catalase`,
  `question: Describe chemical testing of fecal specimens. Page 153. The immunochemical fecal occult blood test (iFOBT) is specific for the globin portion of what?
    Human hemoglobin, Animal hemoglobin, Porphyrin, Myoglobin`,
  `question: Describe chemical testing of fecal specimens. Page 153. Which occult blood test is more sensitive to upper GI bleeding?
    HemoQuant, gFOBT, iFOBT, All are equal`,
  `question: Describe chemical testing of fecal specimens. Page 153. Which occult blood test is more sensitive to lower GI bleeding?
    iFOBT, gFOBT, HemoQuant, All are equal`,
  `question: Describe chemical testing of fecal specimens. Page 154. What substance in amounts greater than 250 mg/D can cause a false-negative result on a gFOBT?
    Vitamin C, Aspirin, Red meat, Iron supplements`,
  `question: Describe chemical testing of fecal specimens. Page 154. Ingestion of red meat horseradish and certain raw vegetables can cause what kind of result on a gFOBT?
    False Positive, False Negative, True Positive, True Negative`,
  `question: Describe amniotic fluid laboratory analysis. Page 138. Which condition is caused by an ABO/Rh incompatibility between mother and baby?
    HDFN, Neural tube defect, Polyhydramnios, Oligohydramnios`,
  `question: Describe the normal composition of feces. Page 144. Which condition is an example of malabsorption that can cause osmotic diarrhea?
    Celiac disease, Lactose intolerance, Pancreatitis, Ulcerative colitis`,
  `question: Describe the macroscopic examination of an abnormal fecal specimen. Page 149. Blood-streaked mucus in stool suggests damage to the intestinal walls possibly caused by malignancy or what?
    Bacterial or amebic dysentery, Constipation, Biliary obstruction, Steatorrhea`,
  `question: Describe the microscopic examination of a fecal specimen. Page 150. Bacteria such as Staphylococcus aureus and Vibrio that cause diarrhea by toxin production do not cause the appearance of what in feces?
    Fecal leukocytes, Mucus, Blood, Undigested food`,
  `question: Describe the normal composition of feces. Page 145. Rapid gastric emptying or dumping syndrome describes what condition?
    Hypermotility of the stomach, Slow motility of the stomach, Malabsorption, Maldigestion`
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