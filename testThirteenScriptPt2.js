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
  `question: Define terminology associated with toxicology. Page 379. What is a laboratory procedure conducted after an initial positive screen to collaborate or contradict the result?
Confirmatory Testing, Screening Test, Toxidrome, Intoxication`,
  `question: Define terminology associated with toxicology. Page 379. The use of illegal drugs or prescription drugs for non-intended purposes is defined as what?
Drugs of Abuse, Intoxication, Confirmatory Testing, A Toxidrome`,
  `question: Define terminology associated with toxicology. Page 379. What is the term for a state in which a person's normal capacity to act or reason is inhibited by a substance?
Intoxication, A Toxidrome, A Poison, A Sedative`,
  `question: Define terminology associated with toxicology. Page 379. What is defined as anything that kills or injures through its chemical actions?
Poison, Toxin, Sedative, Drug of Abuse`,
  `question: Define terminology associated with toxicology. Page 379. A preliminary test that yields a qualitative positive or negative result is called what?
Screening Test, Confirmatory Testing, Toxidrome, Assay`,
  `question: Define terminology associated with toxicology. Page 379. What is a drug that calms a patient easing agitation and permitting sleep?
Sedative, Stimulant, Poison, Toxin`,
  `question: Define terminology associated with toxicology. Page 379. What is a group of signs and symptoms associated with exposure to a particular substance or class of substances called?
Toxidrome, Syndrome, Disease, Condition`,
  `question: Define terminology associated with toxicology. Page 379. What is any poisonous substance produced by bacteria animals or plants called?
Toxins, Poisons, Sedatives, Drugs`,
  `question: Discuss methodologies of screening and confirmation testing of a drug or toxin. Page 380. Current toxicology testing protocols require what kind of approach?
A two-step approach, A single-step approach, A qualitative only approach, A quantitative only approach`,
  `question: Discuss methodologies of screening and confirmation testing of a drug or toxin. Page 380. Specimens are first tested with rapid less specific procedures like immunoassay to obtain what kind of results?
Qualitative results, Quantitative results, Confirmatory results, Definitive results`,
  `question: Discuss methodologies of screening and confirmation testing of a drug or toxin. Page 380. Samples that test positive in the screening process are designated as what?
Presumptive positive, Confirmed negative, Definitive positive, Inconclusive`,
  `question: Discuss methodologies of screening and confirmation testing of a drug or toxin. Page 380. Presumptive positive results must be confirmed by a method that is what compared to the screening technique?
A different technique, The same technique, A less specific technique, A faster technique`,
  `question: Discuss methodologies of screening and confirmation testing of a drug or toxin. Page 380. What is considered the gold standard for confirmatory testing in toxicology?
Mass spectrometry coupled to GC or HPLC, Immunoassay, Enzymatic Spectrophotometry, Ion-specific Electrode`,
  `question: Discuss methodologies of screening and confirmation testing of a drug or toxin. Page 385. Screening procedures for drugs of abuse should be simple rapid inexpensive and what other characteristic?
Capable of being automated, Highly specific, Quantitative, Manually performed`,
  `question: Discuss methodologies of screening and confirmation testing of a drug or toxin. Page 385. A negative result from a screening test can do what with a reasonable degree of certainty?
Rule out an analyte, Confirm the presence of an analyte, Quantify an analyte, Identify a metabolite`,
  `question: Describe the major classes of toxic or potentially toxic agents and their effects on the body. Page 381. What is the most widely used and often abused chemical substance?
Ethanol, Methanol, Isopropanol, Ethylene Glycol`,
  `question: Describe the major classes of toxic or potentially toxic agents and their effects on the body. Page 381. What common solvent is often implicated in poisonings from home-brewed alcohols?
Methanol, Ethanol, Isopropanol, Ethylene Glycol`,
  `question: Describe the major classes of toxic or potentially toxic agents and their effects on the body. Page 381. What is the common name for isopropanol?
Rubbing alcohol, Wood alcohol, Grain alcohol, Antifreeze`,
  `question: Describe the major classes of toxic or potentially toxic agents and their effects on the body. Page 381. Ingestion of what common component of hydraulic fluid and antifreeze is relatively common in children due to its sweet taste?
Ethylene glycol, Methanol, Ethanol, Isopropanol`,
  `question: Describe the major classes of toxic or potentially toxic agents and their effects on the body. Page 381. What is the method of choice for medical testing of ethanol?
Enzymatic Spectrophotometry, Gas Chromatography, Mass Spectrometry, Immunoassay`,
  `question: Describe the major classes of toxic or potentially toxic agents and their effects on the body. Page 381. What is the reference method for ethanol determination?
Gas Chromatography (GC), Enzymatic Spectrophotometry, Immunoassay, Ion-specific Electrode`,
  `question: Describe the major classes of toxic or potentially toxic agents and their effects on the body. Page 382. What colorless odorless tasteless gas is rapidly absorbed into the blood from inspired air?
Carbon monoxide (CO), Carbon dioxide (CO2), Cyanide (CN), Oxygen (O2)`,
  `question: Describe the major classes of toxic or potentially toxic agents and their effects on the body. Page 382. Carbon monoxide interferes with oxygen transport resulting in what condition?
Cellular hypoxia, Metabolic acidosis, Respiratory alkalosis, Hyperglycemia`,
  `question: Describe the major classes of toxic or potentially toxic agents and their effects on the body. Page 382. When inhaled carbon monoxide combines tightly with the heme of hemoglobin to form what?
Carboxyhemoglobin (COHb), Methemoglobin, Oxyhemoglobin, Deoxyhemoglobin`,
  `question: Describe the major classes of toxic or potentially toxic agents and their effects on the body. Page 382. What is the most common analytical method used for carbon monoxide testing?
Spectrophotometry, Gas Chromatography, Mass Spectrometry, Immunoassay`,
  `question: Describe the major classes of toxic or potentially toxic agents and their effects on the body. Page 383. Cyanide expresses its toxicity by binding to what?
Heme iron, Hemoglobin globin chains, Plasma albumin, Red blood cell membranes`,
  `question: Describe the major classes of toxic or potentially toxic agents and their effects on the body. Page 383. What are two analytical methods for evaluating cyanide exposure?
Ion-specific Electrode and Spectrophotometry, GC-MS and Immunoassay, HPLC and Enzymatic assay, Colorimetry and Titration`,
  `question: Describe the potential toxicity of therapeutic drugs and drugs of abuse. Page 384. All drugs are capable of what at the right dosage?
Toxic effects, Therapeutic effects only, Curative effects, No effects`,
  `question: Describe the potential toxicity of therapeutic drugs and drugs of abuse. Page 384. Aspirin is a commonly used analgesic antipyretic and what type of drug?
Anti-inflammatory, Sedative, Stimulant, Antibiotic`,
  `question: Describe the potential toxicity of therapeutic drugs and drugs of abuse. Page 384. Excessive salicylate (aspirin) ingestion is associated with what acid-base disorder?
Metabolic acidosis, Metabolic alkalosis, Respiratory acidosis, Respiratory alkalosis`,
  `question: Describe the potential toxicity of therapeutic drugs and drugs of abuse. Page 384. Salicylates directly stimulate the respiratory center resulting in what condition?
Respiratory alkalosis, Respiratory acidosis, Apnea, Bradypnea`,
  `question: Describe the potential toxicity of therapeutic drugs and drugs of abuse. Page 384. Classic spectrophotometric methods for salicylate analysis are based on the method of what?
Trinder, Jaffe, Biuret, Kjeldahl`,
  `question: Describe the potential toxicity of therapeutic drugs and drugs of abuse. Page 384. Overdose of what common analgesic drug is associated with severe hepatotoxicity?
Acetaminophen, Aspirin, Ibuprofen, Naproxen`,
  `question: Describe the potential toxicity of therapeutic drugs and drugs of abuse. Page 384. Chronic heavy consumers of what substance are more susceptible to acetaminophen toxicity?
Ethanol, Methanol, Isopropanol, Caffeine`,
  `question: Describe the potential toxicity of therapeutic drugs and drugs of abuse. Page 386. Amphetamine and methamphetamine are therapeutic drugs used for narcolepsy and what other disorder?
Attention deficit disorder, Depression, Anxiety, Schizophrenia`,
  `question: Describe the potential toxicity of therapeutic drugs and drugs of abuse. Page 386. Amphetamines are stimulants with a high abuse potential that produce an initial sense of what?
Increased mental and physical capacity, Profound sedation, Hallucinations, Analgesia`,
  `question: Describe the potential toxicity of therapeutic drugs and drugs of abuse. Page 386. Barbiturates are what type of drug that was popular in the 1960s and 1970s?
Sedative-hypnotic, Stimulant, Analgesic, Psychedelic`,
  `question: Describe the potential toxicity of therapeutic drugs and drugs of abuse. Page 386. Barbiturates have largely been replaced by what class of drugs due to their low therapeutic index?
Benzodiazepines, Opioids, Amphetamines, Cannabinoids`,
  `question: Describe the potential toxicity of therapeutic drugs and drugs of abuse. Page 387. What class of sedative-hypnotic drugs includes diazepam (Valium) and alprazolam (Xanax)?
Benzodiazepines, Barbiturates, Opioids, Amphetamines`,
  `question: Describe the potential toxicity of therapeutic drugs and drugs of abuse. Page 387. What is the most potent and abundant psychoactive compound found in marijuana?
THC, CBD, CBN, CBC`,
  `question: Describe the potential toxicity of therapeutic drugs and drugs of abuse. Page 387. Besides a sense of well-being and euphoria cannabinoids are associated with impairment of what?
Short-term memory and intellectual functions, Long-term memory, Motor coordination, Hearing`,
  `question: Describe the potential toxicity of therapeutic drugs and drugs of abuse. Page 388. Cocaine is a highly addictive stimulant made from the leaves of what plant?
The coca plant, The poppy plant, The cannabis plant, The rye fungus`,
  `question: Describe the potential toxicity of therapeutic drugs and drugs of abuse. Page 388. What is the term for the free-base form of cocaine that can be smoked?
Crack, Acid, Ice, Speed`,
  `question: Describe the potential toxicity of therapeutic drugs and drugs of abuse. Page 388. What class of substances is capable of analgesia sedation and anesthesia?
Opiates and opioids, Benzodiazepines, Amphetamines, Cannabinoids`,
  `question: Describe the potential toxicity of therapeutic drugs and drugs of abuse. Page 388. Drugs naturally found in the poppy plant such as morphine and codeine are called what?
Opiates, Opioids, Synthetics, Hallucinogens`,
  `question: Describe the potential toxicity of therapeutic drugs and drugs of abuse. Page 388. Manufactured drugs that are similar to opiates but not found in nature like heroin and fentanyl are called what?
Opioids, Opiates, Alkaloids, Tinctures`,
  `question: Describe the potential toxicity of therapeutic drugs and drugs of abuse. Page 388. Most screening immunoassays for opiates are primarily designed to detect what two substances?
Morphine and codeine, Heroin and fentanyl, Oxycodone and hydromorphone, Methadone and buprenorphine`,
  `question: Describe the potential toxicity of therapeutic drugs and drugs ofabe. Page 389. What extremely potent psychedelic drug is made from a substance found in ergot a fungus that infects rye?
Lysergic acid diethylamide (LSD), Phencyclidine (PCP), Psilocybin, Mescaline`,
  `question: Describe the potential toxicity of therapeutic drugs and drugs of abuse. Page 389. What illicit drug has stimulant depressant anesthetic and hallucinogenic properties?
Phencyclidine (PCP), Lysergic acid diethylamide (LSD), Cocaine, Heroin`,
  `question: Describe the potential toxicity of therapeutic drugs and drugs of abuse. Page 385. Testing for drugs of abuse typically involves screening what type of specimen?
A single urine specimen, A serum specimen, A whole blood specimen, A saliva specimen`,
  `question: Describe methodologies of screening and confirmation testing of a drug or toxin. Page 385. What is the reference method for confirmation of most drugs of abuse?
GC-mass spectrophotometry (GC-MS), Immunoassay, Enzymatic assay, Spectrophotometry`,
  `question: Describe the major classes of toxic or potentially toxic agents and their effects on the body. Page 381. Correlations have been established between what and impairment of psychomotor function?
Ethanol concentrations in the blood (BAC), Methanol in urine, Isopropanol in saliva, Ethylene glycol in breath`,
  `question: Describe the potential toxicity of therapeutic drugs and drugs of abuse. Page 384. A high-performance liquid chromatography is an analytical method used for which common therapeutic drug?
Acetaminophen, Salicylates, Barbiturates, Benzodiazepines`,
  `question: Describe the potential toxicity of therapeutic drugs and drugs of abuse. Page 386. A severe form of chronic amphetamine intoxication can produce a psychosis similar to what mental illness?
Schizophrenia, Bipolar disorder, Major depression, Obsessive-compulsive disorder`,
  `question: Describe the potential toxicity of therapeutic drugs and drugs of abuse. Page 386. What is a common analytical screening method for both amphetamines and barbiturates?
Immunoassay, GC-MS, LC-MS, HPLC`,
  `question: Describe the potential toxicity of therapeutic drugs and drugs of abuse. Page 387. What is the confirmatory testing method for cannabinoids?
GC-MS, Immunoassay, HPLC, Spectrophotometry`,
  `question: Describe the potential toxicity of therapeutic drugs and drugs of abuse. Page 388. Insufflation or intravenous injection are two ways of administering what drug?
Cocaine, Heroin, LSD, PCP`,
  `question: Describe the potential toxicity of therapeutic drugs and drugs of abuse. Page 389. LSD can be found on what popular dosage forms besides powder and tablets?
Impregnated sugar cubes and filter paper, Lollipops and candy bars, Cigarettes and cigars, Vials and ampules`,
  `question: Describe the potential toxicity of therapeutic drugs and drugs of abuse. Page 389. PCP can be ingested or inhaled by smoking PCP-laced tobacco or what other substance?
Marijuana, Cocaine, Heroin, Opium`
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