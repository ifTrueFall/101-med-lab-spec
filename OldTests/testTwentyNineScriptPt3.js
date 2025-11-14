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
  `question: Describe the mechanism of action for antimicrobial agents based on types. A chemical compound used to kill or suppress microorganisms is known as what? Page 180.
An antimicrobial agent, An antibiotic, An antiseptic, A disinfectant`,
  `question: Describe the mechanism of action for antimicrobial agents based on types. The SOS response is a state of high-activity DNA repair activated in bacteria by what? Page 180.
Exposure to DNA-damaging agents, Starvation, Temperature changes, pH shifts`,
  `question: Describe the targets of antibiotic classes. The primary target for B-lactam antibiotics like penicillins and cephalosporins is what? Page 181.
Penicillin-binding proteins (PBPs), The 30S ribosome, DNA gyrase, The cell membrane`,
  `question: Describe the targets of antibiotic classes. B-lactam antibiotics are structural analogues of what normal substrate in cell wall synthesis? Page 181.
Acyl-D-alanyl-D-alanine, N-acetylglucosamine, N-acetylmuramic acid, Lipopolysaccharide`,
  `question: Describe the targets of antibiotic classes. What is the primary target of glycopeptides like vancomycin? Page 182.
The terminal D-Ala-D-Ala dipeptide, Penicillin-binding proteins, The 50S ribosome, Dihydrofolate reductase`,
  `question: Describe the targets of antibiotic classes. Lipopeptides such as Daptomycin and Polymixin B primarily target what? Page 182.
The cell membrane, The cell wall, DNA replication, Protein synthesis`,
  `question: Describe the targets of antibiotic classes. The folic acid pathway is inhibited by which class of antibiotics? Page 183.
Trimethoprim-sulfamethoxazole, Fluoroquinolones, B-Lactams, Glycopeptides`,
  `question: Describe the targets of antibiotic classes. What two key enzymes are involved in the formation of tetrahydrofolate (THF)? Page 183.
Dihydropteroate synthase and dihydrofolate reductase, DNA gyrase and topoisomerase IV, Transpeptidase and transglycosylase, RNA polymerase`,
  `question: Describe the targets of antibiotic classes. Fluoroquinolones like Ciprofloxacin interfere with DNA replication by targeting DNA gyrase and what other enzyme? Page 183.
Topoisomerase IV, DNA polymerase, RNA polymerase, Helicase`,
  `question: Describe the targets of antibiotic classes. Rifamycins like Rifampin interfere with what process by targeting DNA-dependent RNA polymerase? Page 184.
DNA transcription, DNA replication, mRNA translation, Cell wall synthesis`,
  `question: Describe the targets of antibiotic classes. Aminoglycosides and tetracyclines interfere with mRNA translation by targeting what? Page 184.
The 30S ribosomal subunit, The 50S ribosomal subunit, DNA-dependent RNA polymerase, DNA gyrase`,
  `question: Describe the targets of antibiotic classes. Macrolides streptogramins and phenicols interfere with protein synthesis by targeting what? Page 184.
The 50S ribosomal subunit, The 30S ribosomal subunit, The cell wall, Folic acid synthesis`,
  `question: Describe the targets of antibiotic classes. Which antibiotic class includes drugs like Gentamicin and Tobramycin? Page 184.
Aminoglycosides, Tetracyclines, Macrolides, Phenicols`,
  `question: Describe the targets of antibiotic classes. Which antibiotic class includes drugs like Doxycycline and Minocycline? Page 185.
Tetracyclines, Aminoglycosides, Macrolides, Streptogramins`,
  `question: Describe the targets of antibiotic classes. Which antibiotic class includes drugs like Erythromycin and Azithromycin? Page 185.
Macrolides, Tetracyclines, Phenicols, Aminoglycosides`,
  `question: Describe mechanisms of antibiotic resistance. Resistance that is naturally found in bacteria and is chromosomally encoded is known as what? Page 186.
Intrinsic resistance, Acquired resistance, Target site modification, Enzymatic inactivation`,
  `question: Describe mechanisms of antibiotic resistance. The impermeability of the gram-negative outer membrane to vancomycin is an example of what? Page 186.
Intrinsic resistance, Acquired resistance, An efflux pump, Target modification`,
  `question: Describe mechanisms of antibiotic resistance. Sessile bacterial communities embedded in an exopolysaccharide matrix are called what? Page 186.
Biofilms, Colonies, Plasmids, Transposons`,
  `question: Describe mechanisms of antibiotic resistance. Transporter proteins that extrude toxic substances and antibiotics from the interior of a bacterial cell are called what? Page 186.
Efflux pumps, Porins, Penicillin-binding proteins, Adhesins`,
  `question: Describe mechanisms of antibiotic resistance. The production of B-lactamase is an example of which mechanism of resistance? Page 187.
Enzymatic inactivation, Target site modification, Efflux pump, Impermeability`,
  `question: Describe mechanisms of antibiotic resistance. Resistance that results from the acquisition of exogenous DNA via plasmids or transposons is known as what? Page 187.
Acquired resistance, Intrinsic resistance, Biofilm formation, Impermeability`,
  `question: Describe indications for performing antimicrobial susceptibility tests. What organization publishes and frequently updates the standards for susceptibility testing? Page 193.
CLSI, FDA, CDC, WHO`,
  `question: Describe indications for performing antimicrobial susceptibility tests. Why should susceptibility testing of normal biota generally be avoided? Page 193.
It may encourage treatment of a normal condition, They are always resistant, They are always susceptible, The tests do not work on them`,
  `question: Describe antimicrobial agent selection for testing reporting and reporting. Which agency determines the approved use and dosages for antimicrobial agents in the U.S.? Page 195.
FDA, CLSI, CDC, TJC`,
  `question: Describe antimicrobial agent selection for testing reporting and reporting. Fluoroquinolones are sometimes contraindicated in pediatric patients because they may impair what? Page 195.
Cartilage development, Tooth development, Bone growth, Liver function`,
  `question: Describe antimicrobial agent selection for testing reporting and reporting. Tetracycline is sometimes contraindicated in pediatric patients because it can damage what? Page 195.
Developing teeth, Cartilage, Kidneys, The nervous system`,
  `question: Describe antimicrobial agent selection for testing reporting and reporting. When reporting susceptibility results what is the term for agents that should be reported first? Page 196.
Group A (primary), Group B (secondary), Group C (supplemental), Group U (urine only)`,
  `question: Describe antimicrobial agent selection for testing reporting and reporting. A secondary (Group B) agent should be reported if the isolate is what? Page 196.
Resistant to primary agents, Susceptible to primary agents, A gram-positive organism, A gram-negative organism`,
  `question: Describe traditional antimicrobial susceptibility test methods. Inoculum preparation is standardized using what to achieve a bacterial concentration of approximately 1.5x10^8 CFUs/mL? Page 198.
The McFarland turbidity standard, A spectrophotometer, A hemocytometer, Serial dilutions`,
  `question: Describe traditional antimicrobial susceptibility test methods. Using too few bacteria in an inoculum can lead to what result? Page 198.
False susceptibility, False resistance, No growth, Inconclusive results`,
  `question: Describe traditional antimicrobial susceptibility test methods. Using too many bacteria in an inoculum can lead to what result? Page 198.
False resistance, False susceptibility, Contamination, Inconclusive results`,
  `question: Describe traditional antimicrobial susceptibility test methods. What is the definition of the Minimal Inhibitory Concentration (MIC)? Page 199.
The lowest concentration of an agent that inhibits bacterial growth, The concentration that kills 99.9% of bacteria, The highest concentration that is not toxic, The concentration found in the patient's blood`,
  `question: Describe traditional antimicrobial susceptibility test methods. In a dilution susceptibility test what does a result of "susceptible" mean? Page 199.
The organism should respond to the normally recommended dosage, The organism will not respond to therapy, The drug may work at higher doses, The result is inconclusive`,
  `question: Describe traditional antimicrobial susceptibility test methods. What is a common cause of "skipped wells" in a broth-microdilution test? Page 200.
Contamination, Using the wrong media, Incubating for too long, An incorrect McFarland standard`,
  `question: Describe traditional antimicrobial susceptibility test methods. The Kirby-Bauer test is what type of susceptibility testing method? Page 200.
Disk diffusion, Broth microdilution, Agar dilution, E-test`,
  `question: Describe traditional antimicrobial susceptibility test methods. What type of agar is used for the Kirby-Bauer disk diffusion method? Page 200.
Mueller-Hinton, Blood agar, MacConkey agar, Chocolate agar`,
  `question: Describe traditional antimicrobial susceptibility test methods. In a Kirby-Bauer test what is measured to determine susceptibility? Page 200.
The diameter of the zone of inhibition, The turbidity of the broth, The color change of the agar, The lowest concentration with no growth`,
  `question: Describe traditional antimicrobial susceptibility test methods. The E-test uses a plastic strip impregnated with what? Page 204.
An antimicrobial concentration gradient, A single concentration of antibiotic, A pH indicator, A growth supplement`,
  `question: Describe beta lactamase testing method. The production of B-lactamase is a significant resistance mechanism in which organism? Page 206.
Haemophilus influenzae, Streptococcus pyogenes, Enterococcus faecalis, Listeria monocytogenes`,
  `question: Describe beta lactamase testing method. A positive chromogenic B-lactamase test is indicated by the development of what color? Page 206.
A pink or red color, A blue or purple color, A zone of clearing, A black precipitate`,
  `question: Describe beta lactamase testing method. What is an advantage of a B-lactamase test over a full susceptibility test? Page 206.
It is more rapid, It is more accurate, It provides an MIC, It tests more drugs`,
  `question: Describe additional methods for susceptibility testing. Streptococci do not grow well on Mueller-Hinton and require media supplemented with what? Page 206.
Lysed horse blood or sheep's blood, Extra salt, Glucose, A pH indicator`,
  `question: Describe additional methods for susceptibility testing. Haemophilus test medium (HTM) is a Mueller-Hinton base supplemented with what factors? Page 207.
X (hemin) and V (NAD), Salt and peptones, Sheep blood, Bile salts`,
  `question: Describe additional methods for susceptibility testing. Resistance to methicillin in S. aureus is mediated by which gene? Page 207.
mecA, vanA, erm, blaKPC`,
  `question: Describe additional methods for susceptibility testing. For disk diffusion what disk is now recommended for detecting methicillin resistance in S. aureus? Page 207.
Cefoxitin, Oxacillin, Penicillin, Vancomycin`,
  `question: Describe additional methods for susceptibility testing. What is the purpose of the D-zone test? Page 208.
To detect inducible clindamycin resistance in staphylococci, To screen for vancomycin resistance, To confirm ESBL production, To detect high-level aminoglycoside resistance`,
  `question: Describe additional methods for susceptibility testing. A vancomycin screening agar plate is used to detect VRE and what other organism? Page 209.
S. aureus (VISA/VRSA), Enterobacteriaceae, Pseudomonas aeruginosa, Haemophilus influenzae`,
  `question: Describe additional methods for susceptibility testing. Klebsiella pneumoniae and E. coli are common producers of what type of B-lactamases? Page 209.
Extended Spectrum B-Lactamases (ESBLs), Carbapenemases, AmpC B-lactamases, Penicillinases`,
  `question: Describe additional methods for susceptibility testing. Carbapenemases produced by organisms like Klebsiella pneumoniae are also referred to as what? Page 209.
KPCs, ESBLs, MRSA, VRE`,
  `question: Describe automated antimicrobial susceptibility test methods. Most automated susceptibility instruments use what principle to detect bacterial growth? Page 210.
Turbidimetric detection, Fluorescent detection, Colorimetric detection, Nephelometry`,
  `question: Describe automated antimicrobial susceptibility test methods. The BD Phoenix Microscan Walkaway and VITEK are all examples of what? Page 210.
Automated instrument systems, Manual kit systems, Disk diffusion readers, Molecular testing platforms`,
  `question: Discuss quality control of antimicrobial susceptibility tests. QC for susceptibility tests involves testing standard reference strains from what source? Page 211.
ATCC, Patient isolates, Environmental samples, Proficiency testing providers`,
  `question: Discuss quality control of antimicrobial susceptibility tests. What QC strain is used for testing the antimicrobial susceptibility of gram-positive organisms? Page 211.
Staphylococcus aureus ATCC 25923, Escherichia coli ATCC 25922, Pseudomonas aeruginosa ATCC 27853, Haemophilus influenzae ATCC 49247`,
  `question: Discuss quality control of antimicrobial susceptibility tests. What QC strain is used for testing the antimicrobial susceptibility of gram-negative organisms? Page 211.
Escherichia coli ATCC 25922, Staphylococcus aureus ATCC 25923, Enterococcus faecalis ATCC 29212, Streptococcus pneumoniae ATCC 49619`,
  `question: Discuss quality control of antimicrobial susceptibility tests. The overall antimicrobial susceptibility profile of a bacterial isolate to a battery of agents is known as what? Page 212.
An antibiogram, An MIC panel, A QC report, A resistance profile`,
  `question: Discuss quality control of antimicrobial susceptibility tests. Antibiograms are useful for guiding physicians in what type of therapy? Page 212.
Empirical therapy, Targeted therapy, Prophylactic therapy, Adjuvant therapy`,
  `question: Describe additional methods for susceptibility testing. What does VISA stand for? Page 207.
Vancomycin-intermediate S. aureus, Vancomycin-isolated S. aureus, Very-invasive S. aureus, Vancomycin-induced S. aureus`,
  `question: Describe automated antimicrobial susceptibility test methods. What does MIC stand for? Page 199.
Minimal Inhibitory Concentration, Maximal Inhibitory Concentration, Mean Inhibitory Concentration, Measured Inhibitory Concentration`,
  `question: Describe additional methods for susceptibility testing. What does PPNG stand for in the context of Neisseria gonorrhoeae? Page 207.
Penicillinase-producing Neisseria gonorrhoeae, Penicillin-phylogenetic Neisseria gonorrhoeae, Partially-penicillinase Neisseria gonorrhoeae, Penicillin-porin Neisseria gonorrhoeae`,
  `question: Discuss quality control of antimicrobial susceptibility tests. An increase in MRSA detected through antibiogram analysis may indicate what? Page 212.
A nosocomial outbreak, A community outbreak, A new antibiotic, A QC failure`
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