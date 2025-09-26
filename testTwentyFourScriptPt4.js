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
  `Describe the process of adsorption. What is the principle of the adsorption technique? Page 172.
Antibodies are removed from serum by adding the target antigen, Antibodies are eluted from red cells using heat, Antibodies are neutralized by soluble substances, Antibodies are identified using a panel of cells`,
  `Describe the process of adsorption. What commercial reagent is used to adsorb Bg-like antibodies from serum? Page 172.
Human platelet concentrate, Rabbit erythrocyte stroma, LISS, PEG`,
  `Describe the process of adsorption. Rabbit erythrocyte stroma (RESt) is used to remove which type of interfering antibodies? Page 173.
Cold-reacting autoantibodies, Warm-reacting autoantibodies, Clinically significant alloantibodies, Drug-dependent antibodies`,
  `Describe the process of adsorption. What is the simplest method for removing autoantibodies from a patient's serum? Page 173.
Autoadsorption using the patient's own RBCs, Homologous adsorption using donor RBCs, Elution using an organic solvent, Neutralization with soluble antigens`,
  `Describe the process of adsorption. What is the first step in an autoadsorption procedure? Page 173.
Thoroughly washing the patient's own cells, Incubating serum with RESt, Acid treating the patient's cells, Performing a DAT`,
  `Describe the process of adsorption. Which adsorption method is used when a patient is severely anemic or has been recently transfused? Page 173.
Homologous or differential adsorption, Autoadsorption, Elution, Neutralization`,
  `Describe the process of adsorption. In homologous adsorption how are the RBCs for adsorption selected? Page 174.
They are phenotypically matched to the patient, They are always group O R1R1, They are enzyme-treated, They are selected at random`,
  `Describe the process of adsorption. Differential adsorption is performed when phenotyping the patient is difficult due to a positive DAT or what other reason? Page 174.
Recent transfusion, Severe anemia, The presence of a cold antibody, The patient is a newborn`,
  `Describe elution. What is the purpose of an elution technique? Page 174.
To dissociate antibodies from the RBC surface for identification, To remove antibodies from serum, To destroy red blood cell antigens, To neutralize antibodies in plasma`,
  `Describe elution. The solution into which a freed antibody is released is called what? Page 175.
An eluate, An adsorbate, A neutralizate, A diluent`,
  `Compare elution techniques. Which type of elution destroys RBC antigens and is necessary for antibody identification? Page 175.
Total elution, Partial elution, Gentle heat elution, Autoadsorption`,
  `Compare elution techniques. Which type of elution removes antibody but leaves RBC antigens intact for phenotyping? Page 175.
Partial elution, Total elution, Lui Freeze method, Acid elution`,
  `Compare elution techniques. The Gentle Heat method performed at 45°C is an example of what type of elution? Page 175.
Partial elution, Total elution, pH method, Organic solvent method`,
  `Compare elution techniques. The Lui Freeze method where RBCs are frozen and thawed rapidly is an example of what? Page 175.
A total elution method, A partial elution method, A neutralization technique, An adsorption technique`,
  `Discuss the chemicals used in preparing an elution. What is the common pH method for total elution of non-ABO antibodies? Page 176.
Acid elution, Alkaline elution, Neutral elution, Solvent elution`,
  `Discuss the chemicals used in preparing an elution. Organic solvents like Dichloromethane act on what part of the RBC membrane to reverse van der Waals forces? Page 176.
Lipids, Proteins, Glycoproteins, Carbohydrates`,
  `Discuss the chemicals used in preparing an elution. What is the most critical step in preparing an eluate to prevent false-positive results? Page 176.
The original washing to remove unbound immunoglobulins, Neutralizing the pH, Rapidly freezing the sample, Using the correct organic solvent`,
  `Explain neutralization technique. What is the principle of neutralization? Page 177.
Soluble antigens bind with antibody inhibiting reactions, Enzymes destroy red cell antigens, Antibodies are removed from serum via adsorption, Antibodies are removed from red cells via elution`,
  `Explain the principles related to enzyme techniques. What is the purpose of treating panel cells with enzymes like ficin? Page 177.
To help separate antibody specificities, To enhance all antibody reactions, To destroy all red cell antigens, To neutralize all antibodies in serum`,
  `Explain the principles related to enzyme techniques. Enzymes modify the RBC surface by removing what substance or by denaturing glycoproteins? Page 177.
Sialic Acid Residues, Lipids, H-antigen, ABO antigens`,
  `Describe dilution procedures and their importance in immunologic reactions. Dilution is an indication of what? Page 178.
Relative concentration, Absolute concentration, Antibody specificity, Antigen strength`,
  `Describe the types of dilutions. What is used to correct for having used a diluted sample in a determination? Page 179.
A dilution factor, A standard curve, A control serum, A correction coefficient`,
  `Calculate the concentration of a single dilution. If a 1:5 dilution of a specimen has a concentration of 100 mg/dL what is the concentration of the original specimen? Page 181.
500 mg/dL, 20 mg/dL, 100 mg/dL, 105 mg/dL`,
  `Describe the preparation of a serial dilution. What is the general rule for calculating the concentration of a solution in a serial dilution? Page 181.
Multiply the original concentration by each dilution fraction in series, Add the dilution factors together, Average the dilutions, Divide the original concentration by the final dilution`,
  `Describe the importance of antibody testing in blood banking. To detect a rise in antibody titer for an infectious disease blood should be drawn during the acute phase and which other phase? Page 183.
The convalescent phase, The incubation phase, The prodromal phase, The recovery phase`,
  `Describe the antibody titer level procedure. How is an antibody titer defined? Page 184.
The reciprocal of the highest dilution with a detectable antibody reaction, The strongest reaction observed in a dilution series, The dilution with a 2+ reaction, The total score of all reactions`,
  `Describe the antibody titer level procedure. What is considered a significant increase in an antibody titer when comparing serial samples? Page 185.
A fourfold or greater increase, A twofold increase, Any increase in reactivity, An increase in score of 5`,
  `Describe the antibody titer level procedure. When performing a titer what is a key step to avoid falsely elevated results from contamination? Page 185.
Changing pipette tips between each tube, Using the same pipette tip for all tubes, Testing only homozygous cells, Reading from least diluted to most diluted`,
  `Calculate the antibody titer and score. The titer level is the reciprocal of the greatest dilution in which agglutination of what strength is observed? Page 186.
1+ or greater, 2+ or greater, 3+ or greater, 4+ only`,
  `Calculate the antibody titer and score. How is an antibody score determined? Page 186.
By adding up the individual values of each reaction's strength, By taking the reciprocal of the last positive tube, By multiplying the titer by 10, By averaging the reaction grades`,
  `Explain the purpose of Pretransfusion Testing. What is a primary purpose of a crossmatch? Page 189.
To prevent a transfusion reaction, To guarantee 100% safety of a transfusion, To prevent immunization of the recipient, To detect all clerical errors`,
  `Explain the purpose of Pretransfusion Testing. Agglutination or hemolysis in a crossmatch is considered evidence of what? Page 189.
Incompatibility, Compatibility, A cold antibody, An autoantibody`,
  `Outline the procedure for testing of donor and patient specimens. What is the major cause of transfusion-associated fatalities? Page 190.
Clerical errors, Bacterial contamination, Allergic reactions, Incompatible blood types`,
  `Outline the procedure for testing of donor and patient specimens. To prevent collection from the wrong patient the request form should be compared to what? Page 190.
The patient's wristband, The patient's chart, The label on a previous sample, The nurse's verbal confirmation`,
  `Outline the procedure for testing of donor and patient specimens. A fresh serum or plasma sample for pretransfusion testing should be less than how many days old? Page 191.
3 days, 1 day, 7 days, 14 days`,
  `Compare and contrast Type and Screen and Type and Crossmatch. Which procedure involves an ABO/Rh type and an antibody screen but does not set aside specific units for the patient? Page 192.
Type and Screen, Type and Crossmatch, An antibody panel, A DAT`,
  `Compare and contrast Type and Screen and Type and Crossmatch. If a patient has a positive antibody screen in a Type and Screen what is the next step? Page 192.
Identify the antibody and perform an AHG crossmatch, Issue O-negative blood immediately, Proceed with an immediate spin crossmatch, Cancel the transfusion request`,
  `Describe the procedure for selection of donor units. For packed RBCs the preferred donor unit has the same ABO and Rh as the recipient what is the first alternative for a Type A patient? Page 193.
Type O, Type B, Type AB, No alternative is acceptable`,
  `Describe the procedure for selection of donor units. What must be done with donor units that appear abnormal such as cloudy or hemolyzed? Page 193.
They must be quarantined and investigated, They can be used in an emergency, They should be washed before use, They should be returned to the collection facility`,
  `Describe the procedure for selection of donor units. When transfusing whole blood what is the rule for ABO and Rh type selection? Page 193.
It must be the same ABO and Rh as the recipient, An ABO alternative is allowed if Rh matched, O-negative can always be used, It depends on the antibody screen`,
  `Explain compatibility testing procedures and protocols in special circumstances. The crossmatch is a final check on ABO compatibility and may detect antibodies not present during which test? Page 194.
The antibody screen, The DAT, The elution, The antibody panel`,
  `Explain compatibility testing procedures and protocols in special circumstances. In an extreme emergency when there is no time for testing what blood type can be used? Page 195.
O Rh-negative, O Rh-positive, AB Rh-negative, The patient's historical blood type`,
  `Explain compatibility testing procedures and protocols in special circumstances. Blood for an intrauterine transfusion must be compatible with which antibodies? Page 195.
Maternal antibodies capable of crossing the placenta, Fetal ABO antibodies, The father's antibodies, Any IgM antibodies present`,
  `Explain compatibility testing procedures and protocols in special circumstances. A massive transfusion is defined as transfusing a volume of blood exceeding the patient's total blood volume within what time frame? Page 196.
24 hours, 1 hour, 8 hours, 48 hours`,
  `Describe the limitations of compatibility testing procedures. Does a compatible crossmatch guarantee that transfused RBCs will survive normally in the recipient? Page 196.
No, Yes, Only if the antibody screen is negative, Only if the patient has no history`,
  `Discuss the factors that cause inaccurate test results. Which of the following is considered a factor that can cause inaccurate crossmatch results? Page 197.
Incorrect ABO grouping of the patient or donor, A low hematocrit, The patient's age, The time of day`,
  `Identify possible resolutions for crossmatch incompatibilities. If a crossmatch is positive what is the immediate consequence for the transfusion? Page 197.
The recipient will not receive transfusion until the cause is determined, The blood will be issued with a warning label, O-negative blood will be substituted, The blood will be washed and re-tested`,
  `Describe effective blood utilization. What is the purpose of a Maximum Surgical Blood Ordering Schedule (MSBOS)? Page 197.
To promote more efficient utilization of blood, To ensure all surgical patients have blood crossmatched, To reduce the number of Type and Screens, To increase the blood bank's inventory`,
  `Discuss the requirements for labeling and issuing blood. Before issuing blood what must be done with all serologic discrepancies? Page 198.
They must be resolved, They must be documented, They can be ignored in an emergency, They must be reported to the pathologist`,
  `Discuss the requirements for labeling and issuing blood. What is the minimum number of patient identifiers required to identify the intended recipient of a blood unit? Page 198.
Two, One, Three, Four`,
  `Discuss the requirements for labeling and issuing blood. Before release what must the issuing technician do to the unit? Page 198.
Inspect the unit for abnormal appearance, Warm the unit to 37C, Spike the bag for the nurse, Vent the unit`,
  `Describe the antibody titer level procedure. Titer level studies are useful in monitoring an obstetric patient who has what type of antibody? Page 185.
An IgG antibody that may cause HDFN, An IgM antibody that may cause HDFN, A cold autoantibody, A naturally occurring antibody`,
  `Describe the antibody titer level procedure. A titer level of what is rarely exceeded in cases of passively acquired anti-D due to RhIG administration? Page 186.
4, 64, 128, 256`,
  `Describe the antibody titer level procedure. Weakly positive reactions at the AHG phase that persist through extensive dilutions are characteristic of what type of antibodies? Page 186.
High Titer Low Avidity (HTLA), Low Titer High Avidity, Cold reactive, Clinically significant`,
  `Explain the purpose of Pretransfusion Testing. Can a compatible crossmatch prevent the immunization of the recipient to new blood group antigens? Page 190.
No, Yes, Only if the donor is O-negative, Only if the patient is immunosuppressed`,
  `Outline the procedure for testing of donor and patient specimens. Why is a non-hemolyzed specimen required for pretransfusion testing? Page 191.
Hemolysis can mask antibody-induced hemolysis, Hemolysis interferes with ABO typing, Hemolysis indicates bacterial contamination, Hemolysis neutralizes the AHG reagent`,
  `Explain compatibility testing procedures and protocols in special circumstances. For neonatal transfusions antibody detection is performed using serum from whom? Page 196.
The mother, The father, A random donor, The infant after 1 month`,
  `Explain compatibility testing procedures and protocols in special circumstances. Blood for preoperative autologous use must be labeled with what phrase? Page 196.
For autologous use only, Biologically hazardous material, For emergency use only, Not for transfusion`,
  `Identify possible resolutions for crossmatch incompatibilities. When a crossmatch is incompatible what test results are reviewed first to help identify the cause? Page 197.
The autocontrol and antibody screening test, The patient's CBC, The patient's previous transfusion records, The donor's screening results`,
  `Discuss the requirements for labeling and issuing blood. A blood unit must have an attached label or tie tag that contains the recipient's two identifiers and what other critical piece of information? Page 198.
Donation identification number, The phlebotomist's initials, The time of crossmatch, The name of the blood bank`,
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