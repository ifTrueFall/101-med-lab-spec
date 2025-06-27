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
  `question: Describe drug disposition in the body and the factors affecting these processes. Page 352. What synthesizes clinical information and laboratory testing to facilitate selection of the optimal drug and dose for each patient?
Therapeutic drug monitoring (TDM), Pharmacodynamics, Clinical trials, A patient's prescription`,
  `question: Describe drug disposition in the body and the factors affecting these processes. Page 352. The location where target molecules upon which a drug acts are found is called the what?
Site of action, Therapeutic range, Dosing regimen, Distribution site`,
  `question: Describe various drug actions in biological systems. Page 353. The therapeutic range represents the relationship between the minimum effective concentration (MEC) and what other value?
Minimum toxic concentration (MTC), Maximum effective concentration, Median therapeutic dose, Onset of action`,
  `question: Describe various drug actions in biological systems. Page 354. In an optimal dosing cycle the trough concentration should not fall below what level?
The MEC, The MTC, The peak concentration, The steady state`,
  `question: Describe various drug actions in biological systems. Page 354. In an optimal dosing cycle the peak concentration should not rise higher than what level?
The MTC, The MEC, The trough concentration, The initial dose`,
  `question: Describe various drug actions in biological systems. Page 355. What is the term for the equilibrium between the rate of drug administration and elimination?
Steady state, Half-life, Therapeutic range, Bioavailability`,
  `question: Describe various drug actions in biological systems. Page 355. If the dose interval is the same as the drug half-life how many half-lives does it take to reach steady state?
Roughly 5 half-lives, Roughly 2 half-lives, Roughly 10 half-lives, Exactly 1 half-life`,
  `question: Describe drug disposition in the body and the factors affecting these processes. Page 356. What field may be defined as what the body does to drugs including absorption distribution metabolism and excretion?
Pharmacokinetics, Pharmacodynamics, Toxicology, Pharmacology`,
  `question: Describe drug disposition in the body and the factors affecting these processes. Page 356. What field may be defined as what drugs do to the body including mechanisms of action and biochemical effects?
Pharmacodynamics, Pharmacokinetics, Clinical chemistry, Therapeutic monitoring`,
  `question: Describe drug disposition in the body and the factors affecting these processes. Page 357. The four key processes of drug disposition (ADME) are absorption distribution metabolism and what?
Excretion, Efficacy, Elimination, Effect`,
  `question: Describe drug disposition in the body and the factors affecting these processes. Page 359. Which route of drug administration places the entire dose into immediate circulation?
Intravenous (IV) delivery, Oral administration, Topical application, Intramuscular injection`,
  `question: Describe drug disposition in the body and the factors affecting these processes. Page 359. For an orally administered drug to be absorbed it must dissociate from its dosing form and cross what?
Cell membranes, The blood-brain barrier, The glomerulus, The liver`,
  `question: Describe drug disposition in the body and the factors affecting these processes. Page 359. The amount of drug absorbed relative to the quantity given is referred to as its what?
Bioavailability, Half-life, Potency, Efficacy`,
  `question: Describe drug disposition in the body and the factors affecting these processes. Page 359. The activity of metabolic enzymes in the intestine and liver that reduces the quantity of drug reaching systemic circulation is known as what?
First-pass metabolism, Second-pass metabolism, Final excretion, Drug distribution`,
  `question: Describe drug disposition in the body and the factors affecting these processes. Page 361. The distribution pattern of a drug to a particular site in the body depends on factors like molecular size lipid solubility and what?
Extent of protein binding, The time of day, The patient's age, The drug's color`,
  `question: Describe drug disposition in the body and the factors affecting these processes. Page 361. As free drug is more accessible to drug receptors which fraction is considered the active component?
The free fraction, The protein-bound fraction, The metabolized fraction, The excreted fraction`,
  `question: Describe drug disposition in the body and the factors affecting these processes. Page 363. What is the process of biotransformation of the parent drug molecule to one or more metabolites called?
Metabolism, Absorption, Distribution, Excretion`,
  `question: Describe drug disposition in the body and the factors affecting these processes. Page 363. Metabolism occurs primarily in what two organs?
The liver and the kidneys, The lungs and the heart, The stomach and the intestine, The brain and the muscles`,
  `question: Describe drug disposition in the body and the factors affecting these processes. Page 363. What are the two major routes of drug excretion from the body?
Through the kidney into urine and through the liver into bile, Through sweat and expired air, Through saliva and mammary glands, Through skin and hair`,
  `question: Describe drug disposition in the body and the factors affecting these processes. Page 246. What is the time required to reduce the blood level concentration of a drug to one-half after equilibrium is obtained?
The elimination half-life, The absorption time, The peak time, The steady state`,
  `question: Describe various drug actions in biological systems. Page 365. When performing TDM for a drug administered multiple times once steady-state is achieved measurements are generally made when?
At trough (immediately before a scheduled dose), At peak (1 hour after a dose), Randomly during the day, At the midpoint between doses`,
  `question: Describe various drug actions in biological systems. Page 365. How many half-lives after the last dose must pass for more than 95% of the steady-state concentration to be eliminated?
Five to seven half-lives, One to two half-lives, Ten half-lives, Three half-lives`,
  `question: Describe the clinical significance of TDM. Page 366. One of the main goals of a robust TDM program is to optimize dose support compliance and what?
Minimize toxicity, Maximize absorption, Speed up metabolism, Shorten half-life`,
  `question: Describe the clinical significance of TDM. Page 366. What is a key criterion for a drug to be a good candidate for TDM?
Narrow therapeutic index, Wide therapeutic index, Short-term therapy use, No drug interactions`,
  `question: Describe the clinical significance of TDM. Page 366. TDM allows determination of a baseline therapeutic concentration which can be used over time to do what?
Assess compliance, Diagnose the disease, Choose the initial drug, Prevent side effects`,
  `question: Describe specific classifications of drugs and the need for TDM. Page 368. Drugs that are routinely monitored are conveniently classified by what?
The type of therapy they support, Their chemical structure, Their cost, Their brand name`,
  `question: Describe specific classifications of drugs and the need for TDM. Page 369. Phenobarbital phenytoin and valproic acid are all common drugs in which TDM category?
Antiepileptic drugs, Antimicrobial drugs, Cardioactive drugs, Psychoactive drugs`,
  `question: Describe specific classifications of drugs and the need for TDM. Page 370. TDM for antibiotics primarily includes the aminoglycosides and what other drug?
Vancomycin, Penicillin, Tetracycline, Sulfonamides`,
  `question: Describe specific classifications of drugs and the need for TDM. Page 370. Aminoglycosides are a group of antibiotics used for the treatment of infections with what type of bacteria?
Gram-negative bacteria, Gram-positive bacteria, Acid-fast bacilli, Fungi`,
  `question: Describe specific classifications of drugs and the need for TDM. Page 370. Vancomycin is a glycopeptide antibiotic that is effective against what type of bacteria?
Gram-positive cocci and bacilli, Gram-negative bacteria, Spirochetes, Mycoplasma`,
  `question: Describe specific classifications of drugs and the need for TDM. Page 371. What is one of the few antineoplastic drugs in which TDM offers benefits to a therapeutic regimen?
Methotrexate, Cisplatin, Doxorubicin, Paclitaxel`,
  `question: Describe specific classifications of drugs and the need for TDM. Page 372. The major cardioactive drugs requiring TDM include the cardiac glycoside digoxin and what other agents?
Antiarrhythmic agents, Beta blockers, Calcium channel blockers, ACE inhibitors`,
  `question: Describe specific classifications of drugs and the need for TDM. Page 372. Digoxin is a cardiac glycoside used in the treatment of congestive heart failure and what other condition?
Arrhythmias, Hypertension, Angina, Myocardial infarction`,
  `question: Describe specific classifications of drugs and the need for TDM. Page 372. What is the most common serious arrhythmia?
Atrial fibrillation, Ventricular tachycardia, Bradycardia, Heart block`,
  `question: Describe specific classifications of drugs and the need for TDM. Page 372. Quinidine procainamide and disopyramide are all examples of what type of drug?
Antiarrhythmic agents, Cardiac glycosides, Beta blockers, Diuretics`,
  `question: Describe specific classifications of drugs and the need for TDM. Page 373. What are drugs that affect the mind or behavior called?
Psychoactive drugs, Cardioactive drugs, Antineoplastic drugs, Antimicrobial drugs`,
  `question: Describe specific classifications of drugs and the need for TDM. Page 373. Two classes of psychoactive drugs requiring TDM are tricyclic antidepressants and what other agents?
Neuroleptic agents, Benzodiazepines, SSRIs, MAOIs`,
  `question: Describe specific classifications of drugs and the need for TDM. Page 373. Lithium has long been used as a mood-stabilizing agent in the treatment of what disorder?
Bipolar disorder, Major depression, Schizophrenia, Anxiety disorders`,
  `question: Describe specific classifications of drugs and the need for TDM. Page 374. What class of drugs is used for treatment of neonatal breathing disorders or in respiratory conditions like asthma?
Bronchodilators, Antihistamines, Decongestants, Corticosteroids`,
  `question: Describe specific classifications of drugs and the need for TDM. Page 374. Theophylline a bronchodilator is primarily used to treat persistent asthma and what other condition?
Neonatal apnea, Chronic bronchitis, Emphysema, Cystic fibrosis`,
  `question: Describe specific classifications of drugs and the need for TDM. Page 374. Which bronchodilator is used in premature infants to treat neonatal apnea?
Caffeine, Theophylline, Albuterol, Ipratropium`,
  `question: Describe proper sample collection and various clinical test procedures for TDM samples. Page 375. What is the single most important factor in TDM?
Timing of specimen collection, The type of collection tube, The patient's diet, The time of day`,
  `question: Describe proper sample collection and various clinical test procedures for TDM samples. Page 375. Trough concentrations for most drugs are drawn at what time?
Right before the next dose, 1 hour after the dose, 2 hours after the dose, Randomly between doses`,
  `question: Describe proper sample collection and various clinical test procedures for TDM samples. Page 375. Peak concentrations are drawn at what time after an orally administered dose?
1 hour, 30 minutes, 2 hours, Immediately`,
  `question: Describe proper sample collection and various clinical test procedures for TDM samples. Page 375. Determination of serum concentrations should only be done after what has been achieved?
Steady state, The first dose, The peak concentration, The trough concentration`,
  `question: Describe proper sample collection and various clinical test procedures for TDM samples. Page 375. What is the specimen of choice for most TDM drug assays?
Serum or plasma, Whole blood, Urine, Saliva`,
  `question: Describe proper sample collection and various clinical test procedures for TDM samples. Page 375. Immunoassays are a common TDM analytical technique because they provide rapid results and what other benefit?
Ready automation, High specificity for all drugs, Low cost, No interferences`,
  `question: Describe proper sample collection and various clinical test procedures for TDM samples. Page 375. Which chromatographic technique is progressively replacing other HPLC-based methods for TDM?
Liquid chromatography-mass spectrometry/mass spectrometry (LC-MS/MS), Gas chromatography-mass spectrometry (GC-MS), Thin-layer chromatography (TLC), Paper chromatography`,
  `question: Describe proper sample collection and various clinical test procedures for TDM samples. Page 376. According to the table what is the optimal sample for aminoglycoside antibiotics?
Peak & Trough, Trough only, Peak only, 24 hours after dosage`,
  `question: Describe proper sample collection and various clinical test procedures for TDM samples. Page 376. According to the table what is the optimal sample timing for the antineoplastic drug methotrexate?
24 48 & 72 hours after dosage, Trough, Peak, Peak & Trough`,
  `question: Describe proper sample collection and various clinical test procedures for TDM samples. Page 376. According to the table what analytical methodology is used for Lithium?
Ion-selective Electrode (ISE), Immunoassay, LC-MS/MS, GC-MS`,
  `question: Describe various drug actions in biological systems. Page 353. The y-axis on the therapeutic range graph represents what?
Concentration, Time, Dose, Efficacy`,
  `question: Describe various drug actions in biological systems. Page 354. The 'Peak' in the 'Peak and Trough' diagram represents the highest concentration achieved when?
Within the dosing cycle, Right before the next dose, At the start of therapy, At steady state`,
  `question: Describe drug disposition in the body and the factors affecting these processes. Page 359. The rate and extent of drug absorption is greatly affected by the solubility of the drug the formulation matrix and what?
The physiological environment, The patient's weight, The drug's color, The time of administration`,
  `question: Describe drug disposition in the body and the factors affecting these processes. Page 360. In the 'First-Pass Effect' diagram where does the initial absorption of the drug occur?
Small intestine, Stomach, Liver, Hepatic-portal circulation`,
  `question: Describe various drug actions in biological systems. Page 365. The 'Dosing interval' on the steady state graph represents the time between what?
Administering doses, The peak and trough, The start of therapy and steady state, The MEC and MTC`,
  `question: Describe the clinical significance of TDM. Page 366. A baseline therapeutic concentration is used to assess compliance and address what other changes?
Physiological or pathological changes, Drug formulation changes, Insurance coverage changes, Dosing schedule changes`,
  `question: Describe specific classifications of drugs and the need for TDM. Page 369. Antiepileptic drugs are used to treat epilepsy convulsions and what other condition?
Seizures, Migraines, Neuropathic pain, Insomnia`,
  `question: Describe proper sample collection and various clinical test procedures for TDM samples. Page 376. According to the table what is the optimal sample for the cardioactive drug digoxin?
Trough, Peak, Peak & Trough, Random`,
  `question: Describe proper sample collection and various clinical test procedures for TDM samples. Page 376. According to the table what is the primary analytical methodology for Tricyclic Antidepressants (TCAs)?
LC-MS/MS, Immunoassay, ISE, GC-MS`
]

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