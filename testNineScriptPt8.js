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
  `question: Which of these is a body fluid typically examined for protein content?
Serum, Gastric acid, Sweat only, Bile only`,
  `question: What common specimen issue should be avoided for protein testing as with other chemistry specimens?
Hemolysis, High glucose, Low pH, Presence of electrolytes`,
  `question: Proteins are at risk of what if care is not taken during specimen handling?
Denaturation, Polymerization, Reduction, Glycation`,
  `question: Which of these can cause damage to proteins resulting in problems with their testing?
Sudden shifts in pH, Stable temperature, Gentle mixing, Neutral pH`,
  `question: Mechanical damage caused by what action can damage proteins?
Very vigorous mixing, Slow centrifugation, Refrigeration, Freezing`,
  `question: The Kjeldahl Method for protein testing is based off quantifying the amount of what element present in proteins?
Nitrogen, Carbon, Oxygen, Sulfur`,
  `question: In the Kjeldahl Method what are nitrogen atoms in the protein converted into using an acid digestion process?
Ammonium ions, Nitrate ions, Nitrite ions, Urea`,
  `question: After conversion to ammonium ions in the Kjeldahl Method how are these ions quantified?
Using titration, Using spectrophotometry, Using chromatography, Using electrophoresis`,
  `question: In the Kjeldahl Method titration values are multiplied by what factor to obtain the final reportable protein results?
6.25, 3.14, 1.00, 10.0`,
  `question: Why is the Kjeldahl Method not typically used for routine patient testing despite its accuracy?
It is too time consuming and inconvenient, It lacks sensitivity, It is not reproducible, It requires large sample volumes`,
  `question: The Kjeldahl Method now serves as a means to validate what?
Reference materials and other protein testing methods, Only reference materials, Only other protein testing methods, Daily quality control`,
  `question: Dye-binding methods for protein testing rely on shifts in what when dyes bind to proteins?
Absorbance spectra, Refractive index, Light scatter, Fluorescence emission`,
  `question: What is a noted limitation of dye-binding assays for protein testing?
Variable binding affinity of dyes to different proteins, Interference from small ions, Low sensitivity, Requirement for acidic pH`,
  `question: What is a benefit of dye-binding methods for protein testing?
Limited interference from small compounds and good sensitivity, Universal binding to all proteins equally, No pH dependency, Stability at high temperatures`,
  `question: Which dye is commonly used specifically for albumin measurement in dye-binding methods?
Bromocresol green or purple, Coomassie brilliant blue, Amido black, Ponceau S`,
  `question: Which dye is often used for diluted samples like urine and CSF to increase sensitivity in protein testing?
Pyrogallol red, Trypan blue, Methylene blue, Crystal violet`,
  `question: The Biuret method is based off measuring the reaction of peptide bonds with what ions in alkaline conditions?
Cu2+ cupric ions, Fe3+ ferric ions, Mg2+ magnesium ions, Ca2+ calcium ions`,
  `question: The binding of peptide bonds to Cu2+ ions in the Biuret method causes a color change readable at what wavelength?
540nm, 450nm, 600nm, 280nm`,
  `question: The Biuret reagent contains Cu2+ ions and what other substance as an antioxidant?
Iodide, Sulfite, Ascorbate, Citrate`,
  `question: What is the initial color of the Biuret reagent due to high levels of Cu2+ ions?
Blue, Red, Yellow, Colorless`,
  `question: In the Biuret method the color change from pink to reddish violet is proportional to what?
The number of peptide bonds present, The number of free amino acids, The amount of nitrogen, The molecular weight of the protein`,
  `question: To be evaluated by the Biuret test a protein must have the presence of at least what?
Tripeptide bonds or higher, At least one peptide bond, Only free amino acids, Disulfide bonds`,
  `question: Which of these can affect the Biuret method making specimens with these problems unsuitable?
Bilirubin hemolysis or lipemia, High glucose levels, Presence of anticoagulants, Slight turbidity from bacteria`,
  `question: Which method uses antibodies in agarose gel to separate immunoglobulins for evaluation of individual classes and light chains?
Immunofixation Electrophoresis IFE, Kjeldahl Method, Biuret Method, Direct Photometric Method`,
  `question: Compared to serum protein electrophoresis SPE Immunofixation Electrophoresis IFE offers more sensitive detection of what?
Monoclonal components, Total protein, Albumin levels, All protein fractions equally`,
  `question: In IFE what is the purpose of the additional step that washes away other proteins?
To prevent them from interfering with the results, To concentrate the immunoglobulins, To denature the immunoglobulins, To stain the immunoglobulins`,
  `question: Electrophoretic techniques can be used to measure protein content in which biological fluid?
Serum plasma urine and CSF, Serum only, Urine only, CSF only`,
  `question: Why is serum more commonly used than plasma for electrophoresis?
To prevent the presence of fibrinogen interference, Because plasma contains too much protein, Because anticoagulants in plasma interfere with migration, Because serum proteins are more stable`,
  `question: Fibrinogen when present in electrophoresis creates a band that interferes with which region?
Gamma region, Alpha-1 region, Albumin band, Beta region`,
  `question: Electrophoresis provides an estimate of what rather than measuring a single analyte?
Overall protein content, Specific enzyme activity, Nitrogen balance, Amino acid sequence`,
  `question: In electrophoresis a sample is applied to a support medium saturated with a buffer of what typical pH?
Alkaline pH 8.6, Acidic pH 4.5, Neutral pH 7.0, Very acidic pH 2.0`,
  `question: Which of these is a typical support medium used in protein electrophoresis?
Agarose gel, Silica gel, Filter paper, Polyacrylamide gel for all proteins`,
  `question: In protein electrophoresis all major serum proteins carry a net negative charge and will migrate towards which electrode?
Anode, Cathode, Both anode and cathode, Neither electrode they remain stationary`,
  `question: Under common electrophoresis methods proteins appear in how many distinct bands?
5, 3, 7, 10`,
  `question: Which of these is one of the 5 distinct protein bands seen in serum electrophoresis?
Albumin, Prealbumin, Hemoglobin, Myoglobin`,
  `question: After separation in electrophoresis protein fractions are fixed by immersing the support medium in what type of solution?
Acid solution, Alkaline solution, Neutral salt solution, Alcohol solution`,
  `question: What is the purpose of fixing proteins after electrophoretic separation?
To denature and immobilize them, To stain them for visibility, To elute them from the gel, To concentrate them`,
  `question: Which dye is considered the most sensitive for staining proteins in electrophoresis?
Coomassie brilliant blue, Ponceau S, Amido black, Bromophenol blue`,
  `question: While electrophoretic bands can be visually observed they are typically read using what instrument?
Densitometer, Spectrophotometer, Fluorometer, Nephelometer`,
  `question: Direct photometric methods measure protein content by assessing the absorbance of what?
UV light at 200-225nm and 270-290nm, Visible light at 540nm, Infrared light, Fluorescent light after dye binding`,
  `question: The accuracy of direct photometric protein measurement is affected by the variable content of which amino acids?
Tyrosine and tryptophan, Glycine and alanine, Leucine and isoleucine, Serine and threonine`,
  `question: Uric acid and bilirubin can interfere with direct photometric protein measurement because they absorb UV light around what wavelength?
280nm, 540nm, 340nm, 600nm`,
  `question: Measurement of proteins using the direct photometric method may require the removal of low molecular weight items using what process?
Gel filtration, Dialysis, Centrifugation, Precipitation`,
  `question: Turbidimetric and nephelometric methods are widely used to assay which type of proteins due to their speed and ease of use?
High abundance proteins, Low abundance proteins, Only albumin, Only immunoglobulins`,
  `question: Turbidimetry and nephelometry assess the formation of what when reagent is added to lower protein solubility or antibody is added?
Aggregates, Soluble complexes, Colored products, Precipitates that redissolve`,
  `question: How does turbidimetry measure the formation of aggregates?
Measures the changes in absorbance, Measures the light scattered at an angle, Measures fluorescence emitted, Measures heat produced`,
  `question: How does nephelometry differ from turbidimetry in measuring aggregates?
It measures with the detector at an angle to read reflected light, It measures absorbance directly through the sample, It requires a colored reagent, It measures changes in pH`,
  `question: What type of specimens can interfere with turbidimetric and nephelometric testing?
Specimens that are already turbid such as lipemic samples, Hemolyzed specimens, Icteric specimens, Specimens with high glucose`,
  `question: How can interference from turbid specimens be addressed for turbidimetry or nephelometry?
Cleared by a high-speed centrifuge or testing a fasting specimen, Diluting the sample significantly, Adding a clearing reagent, Using a different wavelength`,
  `question: Which classic protein testing method involves an acid digestion process?
Kjeldahl Method, Biuret Method, Dye-Binding Method, Electrophoresis`,
  `question: Bromocresol green is a dye specifically mentioned for quantifying which protein?
Albumin, Globulin, Fibrinogen, Hemoglobin`,
  `question: The reaction of peptide bonds with Cu2+ ions is central to which protein quantification method?
Biuret Method, Kjeldahl Method, Dye-Binding Method, Direct Photometric Method`,
  `question: Which protein separation technique provides an estimate of overall protein content rather than a single analyte?
Electrophoresis, Immunofixation Electrophoresis, Kjeldahl Method, Biuret Method`,
  `question: Capillary electrophoresis uses what as a support medium?
Narrow bore-fused silica capillaries, Agarose gel, Cellulose acetate, Polyacrylamide`,
  `question: Ponceau S and Amido black are dyes commonly used for what purpose in electrophoresis?
To stain the proteins after separation, As part of the buffer solution, To label antibodies in IFE, To precipitate proteins before electrophoresis`,
  `question: The absorbance of UV light at 200-225nm is utilized in which protein measurement method?
Direct Photometric, Turbidimetry, Nephelometry, Biuret Method`,
  `question: Formation of aggregates when an antibody is added to a protein is assessed by which methods?
Turbidimetry and Nephelometry, Kjeldahl Method, Dye-Binding Methods, Direct Photometric Methods`,
  `question: Which method is validated using the Kjeldahl method due to the Kjeldahl method's high accuracy?
Other protein testing methods and reference materials, Only dye-binding methods, Only electrophoresis, Patient samples directly`,
  `question: What is a primary concern for protein specimens that requires careful handling?
Risk of denaturation, Spontaneous precipitation, Bacterial contamination within minutes, Rapid oxidation`,
  `question: Which of these is NOT one of the 5 distinct bands typically seen in serum protein electrophoresis?
Prealbumin band, Albumin band, Alpha-1 band, Gamma band`
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