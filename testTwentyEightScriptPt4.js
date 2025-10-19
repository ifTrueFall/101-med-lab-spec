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
  `question: Discuss the terms associated with microbial flora. What is the term for two organisms living together? Page 72.
Symbiosis, Commensalism, Mutualism, Parasitism`,
  `question: Discuss the terms associated with microbial flora. Which term describes a relationship where the microorganism benefits and the host is not harmed? Page 72.
Commensalism, Mutualism, Parasitism, Symbiosis`,
  `question: Discuss the terms associated with microbial flora. Which term describes a relationship where both the microorganism and the host benefit? Page 72.
Mutualism, Commensalism, Parasitism, Symbiosis`,
  `question: Discuss the terms associated with microbial flora. Which term describes a relationship where the microorganism benefits and the host is harmed? Page 72.
Parasitism, Mutualism, Commensalism, Symbiosis`,
  `question: Describe factors that influence the composition of microbial flora in the body. Is a fetus sterile until birth? Page 73.
Yes, No, Only in the first trimester, Only if the mother is healthy`,
  `question: Describe factors that influence the composition of microbial flora in the body. Microorganisms commonly found on or in healthy persons are known as what? Page 73.
Indigenous flora, Pathogenic flora, Transient flora, Foreign flora`,
  `question: Describe factors that influence the composition of microbial flora in the body. Microorganisms that colonize an area for months or years are referred to as what? Page 73.
Resident flora, Transient flora, Pathogenic flora, Accidental flora`,
  `question: Describe factors that influence the composition of microbial flora in the body. Microorganisms that temporarily colonize a host are known as what? Page 73.
Transient flora, Resident flora, Permanent flora, Obligate flora`,
  `question: Describe factors that influence the composition of microbial flora in the body. When a host harbors a disease-causing organism but shows no symptoms this is known as what? Page 73.
A carrier state, An acute infection, A chronic disease, A symbiotic relationship`,
  `question: Describe factors that influence the composition of microbial flora in the body. Which of the following is an antibacterial substance produced by the body that influences microbial flora? Page 73.
Lysozyme, Glucose, Hemoglobin, Water`,
  `question: Describe factors that influence the composition of microbial flora in the body. What environmental factor in the female genital tract and GI tract of breast-fed infants influences flora composition? Page 73.
Low pH, High pH, High oxygen, Low moisture`,
  `question: Describe factors that influence the composition of microbial flora in the body. What is the primary function of normal flora on the skin surface? Page 73.
Prevent pathogens from colonizing, Cause skin infections, Produce odorous amines, Metabolize sweat`,
  `question: Describe the pathogenesis of infectious disease. Infections caused by an individual's own resident flora are known as what? Page 77.
Opportunistic infections, True pathogenic infections, Primary infections, Latrogenic infections`,
  `question: Describe the pathogenesis of infectious disease. What is the ability of an organism to produce disease in a susceptible host called? Page 78.
Pathogenicity, Virulence, Colonization, Invasion`,
  `question: Describe the pathogenesis of infectious disease. An organism that causes disease in nearly all situations such as Yersinia pestis is referred to as what? Page 78.
A true pathogen, An opportunistic pathogen, A commensal organism, A resident flora`,
  `question: Describe the pathogenesis of infectious disease. An infection that occurs as a result of medical treatment or procedures is known as what? Page 78.
An iatrogenic infection, A nosocomial infection, A community-acquired infection, An opportunistic infection`,
  `question: Describe the pathogenesis of infectious disease. What term refers to the relative ability of a microorganism to cause disease or the degree of pathogenicity? Page 78.
Virulence, Pathogenicity, Infectivity, Toxicity`,
  `question: Describe mechanisms by which microbes may overcome host defenses. What is the most common mechanism used by microorganisms to evade phagocytosis? Page 80.
Having a polysaccharide capsule, Producing leukocidins, Inhibiting chemotaxis, Escaping to the cytoplasm`,
  `question: Describe mechanisms by which microbes may overcome host defenses. What are leukocidins? Page 80.
Substances that damage or kill leukocytes, Substances that attract leukocytes, Structures that prevent phagocytosis, Enzymes that digest antibodies`,
  `question: Describe mechanisms by which microbes may overcome host defenses. How does Protein A produced by staphylococci help evade the immune system? Page 81.
It binds the Fc portion of IgG preventing opsonization, It directly kills phagocytes, It creates a protective capsule, It digests host antibodies`,
  `question: Describe mechanisms by which microbes may overcome host defenses. What is the function of bacterial fimbriae (pili)? Page 81.
To enable attachment to host surface structures, To allow for motility, To secrete toxins, To resist phagocytosis`,
  `question: Describe mechanisms by which microbes may overcome host defenses. The cell surface structures on a microbe that mediate attachment are called what? Page 81.
Adhesins, Receptors, Toxins, Capsules`,
  `question: Describe mechanisms by which microbes may overcome host defenses. Some bacteria can produce IgA proteases to circumvent which host defense? Page 81.
Secretory antibody, Phagocytosis, Complement, Low pH`,
  `question: Discuss concepts and factors contributing to pathogenesis and virulence. What is the term for a microbe's ability to penetrate and grow in tissues? Page 82.
Invasion, Adhesion, Colonization, Evasion`,
  `question: Discuss concepts and factors contributing to pathogenesis and virulence. What is the term for the spread of an infection from the initial site to distant sites? Page 82.
Dissemination, Localization, Colonization, Germination`,
  `question: Discuss concepts and factors contributing to pathogenesis and virulence. Poisonous substances secreted by organisms that contain a binding and a toxic subunit are known as what? Page 82.
Exotoxins, Endotoxins, Adhesins, Invasins`,
  `question: Discuss concepts and factors contributing to pathogenesis and virulence. The toxic activity of lipopolysaccharide (LPS) from gram-negative bacteria is associated with which component? Page 84.
Lipid A, O-specific polysaccharide, The core polysaccharide, Peptidoglycan`,
  `question: Discuss concepts and factors contributing to pathogenesis and virulence. Which of the following is an effect of endotoxin? Page 84.
Fever, Muscle paralysis, Increased mucus production, Hemolysis`,
  `question: Discuss concepts and factors contributing to pathogenesis and virulence. Which type of toxin is a simple protein that is labile to heat? Page 84.
Exotoxins, Endotoxins, Both exotoxins and endotoxins, Neither exotoxin nor endotoxin`,
  `question: Discuss concepts and factors contributing to pathogenesis and virulence. Which type of toxin is a part of the cell wall of gram-negative bacteria? Page 84.
Endotoxins, Exotoxins, Both exotoxins and endotoxins, Neither exotoxin nor endotoxin`,
  `question: Describe the factors by which the human host is protected from microbial invasion. Which of the following is a physical barrier that protects the host from microbial invasion? Page 85.
Intact skin, Lysozyme, Hydrochloric acid, Complement`,
  `question: Describe the factors by which the human host is protected from microbial invasion. Tears urine and mucus are examples of what type of host defense mechanism? Page 85.
Cleansing mechanisms, Antimicrobial substances, Immune proteins, Phagocytosis`,
  `question: Describe the factors by which the human host is protected from microbial invasion. What is the function of the antimicrobial substance lysozyme? Page 85.
It hydrolyzes the peptidoglycan in bacterial cell walls, It creates a low pH environment, It binds free iron, It opsonizes bacteria`,
  `question: Describe the factors by which the human host is protected from microbial invasion. What is the function of indigenous microbial flora in host protection? Page 85.
They prevent pathogen colonization, They produce helpful vitamins, They stimulate antibody production, They digest food`,
  `question: Describe the factors by which the human host is protected from microbial invasion. What are the body's first line of defense among phagocytic cells? Page 86.
Neutrophils and macrophages, B-cells and T-cells, Mast cells and basophils, Eosinophils and NK cells`,
  `question: Describe the factors by which the human host is protected from microbial invasion. What is the chemically caused movement of a phagocyte to a location of infection called? Page 87.
Chemotaxis, Diapedesis, Opsonization, Ingestion`,
  `question: Describe the factors by which the human host is protected from microbial invasion. What is the movement of phagocytes from blood vessels into tissues called? Page 87.
Diapedesis, Chemotaxis, Margination, Extravasation`,
  `question: Describe the factors by which the human host is protected from microbial invasion. Substances that facilitate the attachment of an organism to a phagocyte are known as what? Page 87.
Opsonins, Adhesins, Agglutinins, Precipitins`,
  `question: Describe the factors by which the human host is protected from microbial invasion. During phagocytosis after a particle is ingested it is enclosed within what structure? Page 87.
A phagosome, A lysosome, The nucleus, The cytoplasm`,
  `question: Describe the factors by which the human host is protected from microbial invasion. What are the four classic signs of inflammation? Page 89.
Redness swelling heat and pain, Itching rash fever and chills, Nausea vomiting diarrhea and cramps, Coughing sneezing congestion and fatigue`,
  `question: Describe the factors by which the human host is protected from microbial invasion. What is another name for innate immunity? Page 90.
Natural or nonspecific immunity, Acquired or specific immunity, Humoral immunity, Cell-mediated immunity`,
  `question: Describe the factors by which the human host is protected from microbial invasion. Which of the following is a component of innate immunity? Page 90.
Phagocytosis, Antibody production, T-cell activation, Memory cells`,
  `question: Describe the factors by which the human host is protected from microbial invasion. What is another name for adaptive immunity? Page 90.
Specific immunity, Innate immunity, Natural immunity, Nonspecific immunity`,
  `question: Describe the factors by which the human host is protected from microbial invasion. Which cells are responsible for producing immunoglobulins (antibodies)? Page 92.
B cells, T cells, Macrophages, Neutrophils`,
  `question: Describe the factors by which the human host is protected from microbial invasion. Which immunoglobulin class is a monomer and makes up 70-75% of serum immunoglobulin? Page 92.
IgG, IgM, IgA, IgE`,
  `question: Describe the factors by which the human host is protected from microbial invasion. Which immunoglobulin is the first antibody produced in an immune response? Page 92.
IgM, IgG, IgA, IgE`,
  `question: Describe the factors by which the human host is protected from microbial invasion. Which immunoglobulin is found secreted at mucous membranes as a primary defense? Page 92.
IgA, IgG, IgM, IgE`,
  `question: Describe the routes of transmission for microorganisms. The bite of an infected arthropod is an example of what route of transmission? Page 86.
Vector-borne, Airborne, Contact, Fecal-oral`,
  `question: Describe factors that influence the composition of microbial flora in the body. Which area of the upper respiratory tract is normally considered sterile? Page 75.
None the upper respiratory tract is not sterile, Nasopharynx, Oropharynx, Larynx`,
  `question: Describe factors that influence the composition of microbial flora in the body. Why is the stomach normally sterile? Page 76.
Its acidic pH destroys most microorganisms, It contains powerful enzymes, It is protected by a thick mucus layer, It has no nutrients for bacteria`,
  `question: Describe factors that influence the composition of microbial flora in the body. Which of the following is a sterile site in the genitourinary tract? Page 76.
Bladder, Vagina, Distal urethra, Cervix`,
  `question: Describe the pathogenesis of infectious disease. What type of organism is Pseudomonas aeruginosa in a burn patient? Page 78.
Opportunistic pathogen, True pathogen, Commensal organism, Resident flora`,
  `question: Discuss concepts and factors contributing to pathogenesis and virulence. What component of the gram-negative cell wall is synonymous with endotoxin? Page 84.
Lipopolysaccharide (LPS), Peptidoglycan, Teichoic acid, Outer membrane protein`,
  `question: Describe mechanisms by which microbes may overcome host defenses. What is the name of the leukocidin produced by staphylococci that is lethal to leukocytes? Page 81.
Panton-Valentine leukocidin, Streptolysin, M substance, Protein A`,
  `question: Describe the factors by which the human host is protected from microbial invasion. In what tissue would you find Kupffer cells? Page 88.
Liver, Blood, Lung, Kidney`,
  `question: Describe the factors by which the human host is protected from microbial invasion. In what tissue would you find alveolar macrophages? Page 88.
Lung, Liver, Blood, Brain`,
  `question: Describe the factors by which the human host is protected from microbial invasion. What is the term for redness at the site of inflammation? Page 89.
Erythema, Edema, Pyrexia, Dolor`,
  `question: Describe the factors by which the human host is protected from microbial invasion. Which immunoglobulin is a pentamer and is efficient at complement fixation? Page 92.
IgM, IgG, IgA, IgD`,
  `question: Describe the factors by which the human host is protected from microbial invasion. Which immunoglobulin can cross the placenta? Page 92.
IgG, IgM, IgA, IgE`
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