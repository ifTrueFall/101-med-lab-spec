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
  `question: Describe the fundamentals of specimen collection related to microbiology. To ensure the best chance of recovering the causative agent when should a specimen be collected? Page 102.
In the acute phase of infection before antibiotics are given, After a course of antibiotics is complete, During the recovery phase of infection, At any time during the infection`,
  `question: Describe the fundamentals of specimen collection related to microbiology. What is the primary goal of specimen collection and transport? Page 102.
To maintain the specimen as near its original state as possible, To sterilize the specimen before transport, To encourage the growth of all bacteria, To collect the largest quantity possible`,
  `question: Describe the fundamentals of specimen collection related to microbiology. Why are cotton-tipped swabs not recommended for collecting some bacteriology specimens? Page 102.
Cotton can be toxic to some bacteria, Cotton absorbs too much moisture, Cotton is not sterile, Cotton degrades quickly`,
  `question: Describe the fundamentals of specimen collection related to microbiology. For lesions wounds and abscesses where should the specimen be collected from? Page 102.
The site of infection via needle aspiration, The surface of the wound with a swab, The oldest part of the lesion, Any area of the affected tissue`,
  `question: Describe the fundamentals of specimen collection related to microbiology. What is the preferred urine specimen for detecting a urinary tract infection? Page 103.
First morning clean-catch midstream, A 24-hour urine collection, A random urine specimen, The first portion of voided urine`,
  `question: Describe the fundamentals of specimen collection related to microbiology. A sputum specimen is preferred over saliva for diagnosing what condition? Page 103.
Bacterial pneumonia, Strep throat, Oral thrush, Viral meningitis`,
  `question: Describe the fundamentals of specimen collection related to microbiology. For bacterial stool cultures how many specimens are typically collected? Page 103.
Three specimens one a day for 3 days, One specimen only, Three specimens collected over 10 days, Two specimens 24 hours apart`,
  `question: Describe the fundamentals of specimen collection related to microbiology. Stool specimens should not be contaminated with what? Page 103.
Urine, Water, Toilet paper, Preservative`,
  `question: Describe labeling and requisitions related to microbiology. Which of the following is a required piece of information on a properly labeled specimen? Page 105.
Culture site, Patient diagnosis, Patient's insurance, Nurse's name`,
  `question: Describe labeling and requisitions related to microbiology. Which of the following is a required piece of information on a test requisition? Page 105.
Specific anatomic site, Physician's home address, Time of result, Cost of the test`,
  `question: Describe labeling and requisitions related to microbiology. For safety how should specimen containers be transported? Page 105.
In leak-proof secondary containers, Wrapped in the paper requisition, Hand-carried to the lab, In a standard paper bag`,
  `question: Describe the use of preservatives and anticoagulants. What preservative is often used in urine transport tubes to maintain the bacterial population? Page 106.
Boric acid, Formalin, Sodium citrate, EDTA`,
  `question: Describe the use of preservatives and anticoagulants. For a stool specimen that cannot be processed within 2 hours what transport medium should be used? Page 107.
Cary-Blair, Stuart's, Amie's, Formalin`,
  `question: Describe the use of preservatives and anticoagulants. Which anticoagulant is acceptable for most bacterial cultures at a concentration not exceeding 0.025%? Page 107.
SPS, Heparin, EDTA, Citrate`,
  `question: Describe the use of preservatives and anticoagulants. Which anticoagulant is used for viral cultures and mycobacterium from blood? Page 107.
Heparin, SPS, EDTA, Citrate`,
  `question: Describe storage conditions based on specimen types. In general specimens should be transported to the lab within how long after collection? Page 106.
30 minutes, 2 hours, 4 hours, 24 hours`,
  `question: Describe storage conditions based on specimen types. An unpreserved urine specimen should be stored under what condition if processing is delayed? Page 106.
Refrigerated, At room temperature, Frozen, In an incubator`,
  `question: Describe storage conditions based on specimen types. A cerebrospinal fluid (CSF) specimen for bacterial culture should be stored under what condition if processing is delayed? Page 106.
At room temperature, Refrigerated, Frozen, In an incubator`,
  `question: Describe shipping requirements for infectious materials. The shipment of clinical specimens is governed by which U.S. government agency? Page 107.
Department of Transportation (DOT), Food and Drug Administration (FDA), Centers for Disease Control (CDC), Environmental Protection Agency (EPA)`,
  `question: Describe specimen prioritization guidelines. According to the levels of specimen priority which of the following is considered a Level 1 critical/invasive specimen? Page 109.
Cerebrospinal fluid, Sputum, Urine in preservative, A swab in holding medium`,
  `question: Describe specimen prioritization guidelines. Sputum and unpreserved feces fall into which level of specimen priority? Page 109.
Level 2, Level 1, Level 3, Level 4`,
  `question: Describe specimen prioritization guidelines. A swab in holding medium is considered what level of specimen priority? Page 109.
Level 4, Level 3, Level 2, Level 1`,
  `question: Explain specimen rejection criteria. Which of the following is a valid reason for rejecting a microbiology specimen? Page 110.
Transport time longer than 2 hours with no preservative, The specimen volume is very large, The patient is on antibiotics, The requisition is handwritten`,
  `question: Explain specimen rejection criteria. An expectorated sputum specimen may be rejected if the gram stain shows greater than 10 of what type of cell per low power field? Page 110.
Epithelial cells, White blood cells, Red blood cells, Bacterial cells`,
  `question: Explain specimen rejection criteria. What should a technician do if a physician requires a culture on a specimen that meets rejection criteria? Page 110.
Plate the culture but comment on the compromised quality, Discard the specimen immediately, Ask the physician to sign a waiver, Refuse to process the specimen`,
  `question: Discuss macroscopic observation of microbiology specimens. Observing that a fluid specimen is cloudy rather than clear is an example of what? Page 110.
Macroscopic observation, Microscopic observation, Culture workup, Specimen rejection`,
  `question: Discuss the types of microscopes used in microbiology. Which type of microscopy passes visible light through the specimen and uses a series of lenses for magnification? Page 111.
Bright-field (Light) microscopy, Phase contrast microscopy, Fluorescent microscopy, Electron microscopy`,
  `question: Discuss the types of microscopes used in microbiology. If the objective lens magnifies 100X and the ocular lens magnifies 10X what is the total magnification? Page 112.
1000X, 110X, 100X, 10X`,
  `question: Discuss the types of microscopes used in microbiology. Which microscope component is closest to the specimen? Page 112.
Objective lens, Ocular lens, Condenser lens, Light source`,
  `question: Discuss the types of microscopes used in microbiology. Which type of microscopy is often used to identify fungi in culture without the use of stains? Page 113.
Phase contrast microscopy, Bright-field microscopy, Fluorescent microscopy, Electron microscopy`,
  `question: Discuss the types of microscopes used in microbiology. Which microscope uses fluorescent dyes (fluorochromes) to stain a specimen? Page 114.
Fluorescent microscopy, Phase contrast microscopy, Dark-field microscopy, Bright-field microscopy`,
  `question: Discuss the types of microscopes used in microbiology. Which fluorochrome stain is used to detect mycobacterial cells? Page 114.
Auramine-Rhodamine, Acridine Orange, Calcofluor White, Gram stain`,
  `question: Discuss the types of microscopes used in microbiology. Which fluorochrome stain is used to detect fungal elements? Page 114.
Calcofluor White, Acridine Orange, Auramine-Rhodamine, Methylene Blue`,
  `question: Discuss the types of microscopes used in microbiology. Dark-field microscopy is particularly useful for detecting what type of organism? Page 115.
Spirochetes, Fungi, Mycobacteria, Viruses`,
  `question: Discuss the types of microscopes used in microbiology. Which type of microscope uses electrons instead of light and can magnify objects over 100000X? Page 116.
Electron microscopy, Bright-field microscopy, Fluorescent microscopy, Phase contrast microscopy`,
  `question: Discuss the types of microscopes used in microbiology. Which type of electron microscope provides a three-dimensional view of an object's surface? Page 116.
Scanning electron microscope (SEM), Transmission electron microscope (TEM), Phase contrast microscope, Fluorescent microscope`,
  `question: Describe microscopic examinations of microbiology specimens. What is the primary stain used in the microscopic examination of bacteria? Page 113.
Gram stain, Acridine Orange, Calcofluor White, India ink`,
  `question: Describe microscopic examinations of microbiology specimens. What is one of the key purposes of performing a direct microscopic examination of a specimen? Page 111.
To determine the quality of the specimen, To get a definitive organism ID, To perform antimicrobial susceptibility, To check for specimen leaks`,
  `question: Describe the media of choice for recovery of pathogens based on specimen type. Media that supports the growth of most nonfastidious organisms like sheep blood agar is known as what? Page 117.
Nonselective media, Selective media, Enriched media, Differential media`,
  `question: Describe the media of choice for recovery of pathogens based on specimen type. Media that supports the growth of one group of microbes but not another is called what? Page 117.
Selective media, Differential media, Enriched media, Broth media`,
  `question: Describe the media of choice for recovery of pathogens based on specimen type. Media that allows the grouping of microbes based on the characteristics they demonstrate on the media is known as what? Page 117.
Differential media, Selective media, Enriched media, Nonselective media`,
  `question: Describe the media of choice for recovery of pathogens based on specimen type. Media containing growth enhancers for fastidious organisms like chocolate agar is called what? Page 117.
Enriched media, Selective media, Differential media, Broth media`,
  `question: Describe the media of choice for recovery of pathogens based on specimen type. A liquid medium designed to encourage the growth of a small number of specific organisms is what? Page 117.
An enrichment broth, A nonselective broth, A differential broth, An enriched agar`,
  `question: Describe isolation technique for recovery of pathogens based on specimen type. For large volumes of sterile body fluids what step is taken to increase the recovery of bacteria? Page 118.
The fluid is concentrated by centrifugation, The fluid is diluted with saline, The fluid is plated directly, The fluid is incubated overnight`,
  `question: Describe isolation technique for recovery of pathogens based on specimen type. What is the purpose of the four-quadrant isolation streak? Page 118.
To allow grading of the relative concentration of organisms, To quantify the number of bacteria present, To select for a single type of organism, To speed up the growth of bacteria`,
  `question: Describe isolation technique for recovery of pathogens based on specimen type. In which quadrant of a properly performed isolation streak would you expect to find the most isolated colonies? Page 118.
The fourth quadrant, The first quadrant, The second quadrant, The third quadrant`,
  `question: Describe isolation technique for recovery of pathogens based on specimen type. A quantitative isolation streak is most commonly used for what type of specimen? Page 119.
Urine cultures, Sputum cultures, Stool cultures, Blood cultures`,
  `question: Describe the incubation conditions required for the recovery of pathogens. Most bacterial cultures are incubated at what temperature range? Page 120.
35 C to 37 C, 20 C to 25 C, 40 C to 42 C, 4 C to 8 C`,
  `question: Describe the incubation conditions required for the recovery of pathogens. Organisms that cannot grow in the presence of oxygen are known as what? Page 120.
Anaerobic, Aerobic, Capnophilic, Microaerophilic`,
  `question: Describe the incubation conditions required for the recovery of pathogens. Organisms that require an increased concentration of CO2 are known as what? Page 120.
Capnophilic, Aerobic, Anaerobic, Halophilic`,
  `question: Describe the incubation conditions required for the recovery of pathogens. Organisms that grow in reduced oxygen and increased CO2 are called what? Page 120.
Microaerophilic, Aerobic, Anaerobic, Capnophilic`,
  `question: Describe the incubation conditions required for the recovery of pathogens. Most routine bacterial cultures are held for how long before being finalized as negative? Page 120.
48 to 72 hours, 24 hours, 5 to 7 days, 2 weeks`,
  `question: Discuss the steps involved in the culture workup. Which of the following is a key question to ask when beginning a culture workup? Page 122.
What is the specimen source, What is the patient's name, How much did the test cost, Who collected the specimen`,
  `question: Describe the interpretation considerations for culture workups. In a culture workup what is the importance of knowing if a specimen source has normal flora? Page 122.
To differentiate potential pathogens from normal flora, To know which media to discard, To estimate the total bacteria count, To determine the patient's immune status`,
  `question: Discuss planning considerations for processing nonstandard specimens. For a non-routine specimen like a heart valve who must establish the protocol for processing? Page 122.
The microbiology laboratory, The surgeon, The nursing staff, The manufacturer`,
  `question: Discuss the importance of communicating preliminary and critical microbiology results. Why must critical values be reported immediately? Page 123.
They may indicate a life-threatening situation, It is required by hospital policy, To avoid confusing the physician, To complete the workup faster`,
  `question: Discuss the importance of communicating preliminary and critical microbiology results. Which of the following is an example of a critical value in microbiology? Page 123.
Positive blood culture, Normal flora from a throat swab, A negative urine culture, Contamination on a skin culture`,
  `question: Discuss the importance of communicating preliminary and critical microbiology results. To avoid confusion when reporting results what should laboratory professionals avoid? Page 123.
Technical jargon and abbreviations, Reporting preliminary results, Calling the physician directly, Providing reference ranges`,
  `question: Describe the media of choice for recovery of pathogens based on specimen type. Which enriched medium contains X and V factors? Page 129.
Chocolate agar, Blood agar, CNA agar, MacConkey agar`,
  `question: Describe the media of choice for recovery of pathogens based on specimen type. Colistin and Nalidixic Acid (CNA) agar is selective for what type of organisms? Page 129.
Gram-positive bacteria, Gram-negative bacteria, Fungi, Anaerobes`
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