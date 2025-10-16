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
  `question: Describe the pathology epidemiology laboratory testing and prophylaxis/treatment of transfusion transmitted diseases. Which of the following is a required serologic test performed on all donor blood? Page 277.
Hepatitis B surface antigen, CMV antibody, EBV antibody, Parvovirus B19`,
  `question: Describe the pathology epidemiology laboratory testing and prophylaxis/treatment of transfusion transmitted diseases. Which confirmatory test is used to detect false-positives for various diseases in blood screening? Page 278.
Western Blot, Complete Blood Count, Blood Culture, Urinalysis`,
  `question: Describe the pathology epidemiology laboratory testing and prophylaxis/treatment of transfusion transmitted diseases. Hepatitis A (HAV) and Hepatitis E (HEV) are mainly transmitted through which route? Page 278.
Fecal-oral route, Parenteral route, Respiratory route, Sexual contact`,
  `question: Describe the pathology epidemiology laboratory testing and prophylaxis/treatment of transfusion transmitted diseases. Which types of Hepatitis are primarily transmitted parenterally? Page 278.
HBV HCV and HDV, HAV and HEV, HAV and HBV, HCV and HEV`,
  `question: Describe the pathology epidemiology laboratory testing and prophylaxis/treatment of transfusion transmitted diseases. The presence of which antibody is required for the laboratory diagnosis of an acute Hepatitis A infection? Page 279.
IgM anti-HAV, IgG anti-HAV, HBsAg, HCV RNA`,
  `question: Describe the pathology epidemiology laboratory testing and prophylaxis/treatment of transfusion transmitted diseases. In Hepatitis B infection which viral marker is detected first and is located on the outer envelope of the virus? Page 279.
HBsAg, HBcAg, HBeAg, HBV DNA`,
  `question: Describe the pathology epidemiology laboratory testing and prophylaxis/treatment of transfusion transmitted diseases. What is the method of pathogen inactivation used for albumin that has prevented HBV transmission since 1948? Page 279.
Heat inactivation, Solvent/detergent treatment, Nanofiltration, Irradiation`,
  `question: Describe the pathology epidemiology laboratory testing and prophylaxis/treatment of transfusion transmitted diseases. What percentage of individuals infected with Hepatitis C develop chronic liver disease such as cirrhosis or liver cancer? Page 280.
60% to 70%, 10% to 20%, 30% to 40%, 80% to 90%`,
  `question: Describe the pathology epidemiology laboratory testing and prophylaxis/treatment of transfusion transmitted diseases. Which tests are used as confirmatory tests for Hepatitis C? Page 280.
RIBA and NAT, EIA and Western Blot, PCR and ELISA, HBsAg and anti-HBc`,
  `question: Describe the pathology epidemiology laboratory testing and prophylaxis/treatment of transfusion transmitted diseases. The Hepatitis D virus is a defective RNA virus that requires the presence of which other virus to replicate? Page 280.
Hepatitis B virus, Hepatitis C virus, Hepatitis A virus, HIV`,
  `question: Describe the pathology epidemiology laboratory testing and prophylaxis/treatment of transfusion transmitted diseases. Are there any recorded cases of Hepatitis E being transmitted by transfusion? Page 280.
No, Yes, Only in rare cases, The data is inconclusive`,
  `question: Describe the pathology epidemiology laboratory testing and prophylaxis/treatment of transfusion transmitted diseases. Hepatitis G Virus (HGV) is transmitted by the blood-borne route but is not implicated as a cause of what? Page 281.
Hepatitis or liver failure, Asymptomatic infection, Chronic viremia, Mild symptoms`,
  `question: Describe the pathology epidemiology laboratory testing and prophylaxis/treatment of transfusion transmitted diseases. HIV is the etiologic agent of what syndrome? Page 281.
AIDS, Hepatitis, Mononucleosis, Leukemia`,
  `question: Describe the pathology epidemiology laboratory testing and prophylaxis/treatment of transfusion transmitted diseases. HIV enters cells by binding its glycoprotein 120 to which cell surface receptor? Page 282.
CD4, CD8, CD3, CD19`,
  `question: Describe the pathology epidemiology laboratory testing and prophylaxis/treatment of transfusion transmitted diseases. A patient is classified as having clinical AIDS when their CD4 count falls below what level? Page 282.
200/uL, 500/uL, 1000/uL, 100/uL`,
  `question: Describe the pathology epidemiology laboratory testing and prophylaxis/treatment of transfusion transmitted diseases. What technology closes the window period for HIV detection by identifying viral RNA? Page 282.
Nucleic Acid Test (NAT), Enzyme Immunoassay (EIA), Western Blot (WB), Immunofluorescence assay (IFA)`,
  `question: Describe the pathology epidemiology laboratory testing and prophylaxis/treatment of transfusion transmitted diseases. Human T-Cell Lymphotropic Virus Type I (HTLV-I) is associated with what malignancy? Page 282.
Adult T-cell lymphoma/leukemia, Kaposi's sarcoma, Non-Hodgkin's lymphoma, Hairy cell leukemia`,
  `question: Describe the pathology epidemiology laboratory testing and prophylaxis/treatment of transfusion transmitted diseases. HTLV-I is associated with a progressive neurological disorder known as HAM/TSP which stands for what? Page 282.
HTLV-I-associated myelopathy/tropical spastic paraparesis, Hemolytic Anemia Myelopathy/Thrombotic Spastic Purpura, Hepatic Associated Myeloma/Transmitted Spleen Pancytopenia, Human Anemia Myelopathy/Thrombocytopenia Syndrome Purpura`,
  `question: Describe the pathology epidemiology laboratory testing and prophylaxis/treatment of transfusion transmitted diseases. What is the primary mode of transmission for West Nile Virus to humans? Page 283.
Mosquito bite, Blood transfusion, Sexual contact, Fecal-oral route`,
  `question: Describe the pathology epidemiology laboratory testing and prophylaxis/treatment of transfusion transmitted diseases. Once an individual is exposed to Cytomegalovirus (CMV) the virus can remain latent in what for years? Page 284.
Tissues and leukocytes, Red blood cells, Liver cells, Nerve ganglia`,
  `question: Describe the pathology epidemiology laboratory testing and prophylaxis/treatment of transfusion transmitted diseases. Which patient population is at the highest risk of a severe CMV infection from a blood transfusion? Page 284.
Fetuses and allogeneic marrow recipients, Healthy adults, Elderly patients, Trauma victims`,
  `question: Describe the pathology epidemiology laboratory testing and prophylaxis/treatment of transfusion transmitted diseases. To prevent CMV transmission to high-risk patients what type of blood products should be used? Page 284.
Leukocyte-reduced or seronegative blood, Whole blood only, Plasma products only, Irradiated blood products`,
  `question: Describe the pathology epidemiology laboratory testing and prophylaxis/treatment of transfusion transmitted diseases. Epstein-Barr Virus (EBV) is most frequently associated with which illness often called "the kissing disease"? Page 284.
Infectious mononucleosis, Hepatitis, AIDS, Chickenpox`,
  `question: Describe the pathology epidemiology laboratory testing and prophylaxis/treatment of transfusion transmitted diseases. Human B19 Parvovirus is also known as "Fifth Disease" or what other common name? Page 285.
Slapped Cheek Syndrome, German Measles, Roseola, Chickenpox`,
  `question: Describe the pathology epidemiology laboratory testing and prophylaxis/treatment of transfusion transmitted diseases. Parvovirus B19 is able to invade and lyse early erythroid precursors in the bone marrow which can lead to what condition? Page 285.
Severe aplastic anemia, Hemolytic anemia, Thrombocytopenia, Leukemia`,
  `question: Describe the pathology epidemiology laboratory testing and prophylaxis/treatment of transfusion transmitted diseases. Human Herpesvirus 8 (HHV-8) is associated with which condition commonly seen in immunocompromised patients? Page 285.
Kaposi's sarcoma, Roseola infantum, Infectious mononucleosis, Shingles`,
  `question: Describe the pathology epidemiology laboratory testing and prophylaxis/treatment of transfusion transmitted diseases. Which blood component has been the most frequent source of septic transfusion reactions? Page 285.
Platelets, Red Blood Cells, Fresh Frozen Plasma, Cryoprecipitate`,
  `question: Describe the pathology epidemiology laboratory testing and prophylaxis/treatment of transfusion transmitted diseases. What are the most common signs and symptoms of transfusion-associated sepsis? Page 285.
Rigors fever and tachycardia, Jaundice and dark urine, Nausea and vomiting, Rash and itching`,
  `question: Describe the pathology epidemiology laboratory testing and prophylaxis/treatment of transfusion transmitted diseases. The causative agent of syphilis Treponema pallidum is what type of microorganism? Page 286.
Spirochete, Virus, Fungus, Protozoan`,
  `question: Describe the pathology epidemiology laboratory testing and prophylaxis/treatment of transfusion transmitted diseases. Donors with a confirmed positive serologic test for syphilis can be reinstated for donation after 12 months with documentation of what? Page 286.
Treatment, A negative follow-up test, A physician's note, No symptoms`,
  `question: Describe the pathology epidemiology laboratory testing and prophylaxis/treatment of transfusion transmitted diseases. The disease babesiosis is usually transmitted by the bite of what? Page 286.
An infected deer tick, A reduviid bug, An Anopheles mosquito, A sandfly`,
  `question: Describe the pathology epidemiology laboratory testing and prophylaxis/treatment of transfusion transmitted diseases. Patients who are elderly asplenic or immunocompromised are at increased risk for severe complications from which parasite? Page 286.
Babesia microti, Trypanosoma cruzi, Plasmodium species, Leishmania donovani`,
  `question: Describe the pathology epidemiology laboratory testing and prophylaxis/treatment of transfusion transmitted diseases. Trypanosoma cruzi is the etiologic agent of which disease? Page 287.
Chagas disease, Malaria, Babesiosis, Leishmaniasis`,
  `question: Describe the pathology epidemiology laboratory testing and prophylaxis/treatment of transfusion transmitted diseases. Chagas' disease is endemic in which parts of the world? Page 287.
Central and South America, West Africa, Southeast Asia, Eastern Europe`,
  `question: Describe the pathology epidemiology laboratory testing and prophylaxis/treatment of transfusion transmitted diseases. Malaria is caused by several species of which intra-erythrocytic protozoan? Page 287.
Plasmodium, Babesia, Trypanosoma, Leishmania`,
  `question: Describe the pathology epidemiology laboratory testing and prophylaxis/treatment of transfusion transmitted diseases. How is malaria transmitted to humans? Page 288.
Bite of a female Anopheles mosquito, Bite of a deer tick, Bite of a reduviid bug, Contaminated water`,
  `question: Describe the pathology epidemiology laboratory testing and prophylaxis/treatment of transfusion transmitted diseases. Donors who have traveled to an area endemic for malaria are deferred from donating blood for how long? Page 288.
1 year, 3 years, 6 months, 5 years`,
  `question: Describe the pathology epidemiology laboratory testing and prophylaxis/treatment of transfusion transmitted diseases. Donors who have had malaria are deferred from donating for how long? Page 288.
3 years, 1 year, 5 years, permanently`,
  `question: Describe the pathology epidemiology laboratory testing and prophylaxis/treatment of transfusion transmitted diseases. The causative agent of Creutzfeldt-Jakob Disease (CJD) is believed to be what? Page 288.
A prion, A virus, A bacterium, A parasite`,
  `question: Describe the pathology epidemiology laboratory testing and prophylaxis/treatment of transfusion transmitted diseases. The variant form of CJD (vCJD) which affects younger individuals has been linked to what? Page 288.
Bovine spongiform encephalopathy, Contaminated surgical equipment, Human growth hormone, Dura mater transplants`,
  `question: Describe the implications of non-tested transfusion transmitted diseases. The "look back" process is required when a donor tests positive for HBV HCV HIV or what other virus? Page 289.
HTLV, WNV, CMV, EBV`,
  `question: Describe the implications of non-tested transfusion transmitted diseases. If a patient develops a TTD after receiving a single unit from one donor that donor must be what? Page 289.
Permanently deferred, Temporarily deferred, Retested in 6 months, Counseled on risk factors`,
  `question: Describe the implications of non-tested transfusion transmitted diseases. When a donor is implicated in a TTD case what must be done with other recipients of components from that donor? Page 289.
They should be contacted, They are not notified, They are deferred from donation, They are monitored for symptoms`,
  `question: Describe pathogen inactivation for plasma and cellular components. What method of pathogen inactivation is effective against lipid-enveloped viruses like HIV HBV and HCV? Page 289.
Solvent/detergent treatment, Heat treatment, Irradiation, Nanofiltration`,
  `question: Describe pathogen inactivation for plasma and cellular components. Solvent/detergent treatment and nanofiltration are not effective against which type of viruses? Page 289.
Non-lipid-enveloped viruses, Retroviruses, DNA viruses, RNA viruses`,
  `question: Describe the pathology epidemiology laboratory testing and prophylaxis/treatment of transfusion transmitted diseases. Jaundice hepatomegaly and dark urine are symptoms of what condition? Page 278.
Hepatitis, AIDS, Malaria, Babesiosis`,
  `question: Describe the pathology epidemiology laboratory testing and prophylaxis/treatment of transfusion transmitted diseases. What is the most common form of hepatitis? Page 278.
Hepatitis A, Hepatitis B, Hepatitis C, Hepatitis D`,
  `question: Describe the pathology epidemiology laboratory testing and prophylaxis/treatment of transfusion transmitted diseases. In a recovering Hepatitis B patient which antigen typically disappears before HBsAg? Page 279.
HBeAg, HBcAg, HBV DNA, Anti-HBc`,
  `question: Describe the pathology epidemiology laboratory testing and prophylaxis/treatment of transfusion transmitted diseases. Is there currently a vaccine available for Hepatitis C? Page 280.
No, Yes a recombinant vaccine, Yes a live attenuated vaccine, Yes but it is not widely available`,
  `question: Describe the pathology epidemiology laboratory testing and prophylaxis/treatment of transfusion transmitted diseases. HIV-1 RNA detection by NAT is used to close what period in testing? Page 282.
The window period, The acute phase, The asymptomatic phase, The ARC phase`,
  `question: Describe the pathology epidemiology laboratory testing and prophylaxis/treatment of transfusion transmitted diseases. The best prophylaxis for HTLV-I and HTLV-II is to do what? Page 283.
Prevent exposure, Get vaccinated, Take corticosteroids, Use antiretroviral therapy`,
  `question: Describe the pathology epidemiology laboratory testing and prophylaxis/treatment of transfusion transmitted diseases. What is the incubation period for West Nile Virus following a mosquito bite? Page 283.
3 to 14 days, 1 to 2 days, 2 to 4 weeks, 1 to 3 months`,
  `question: Describe the pathology epidemiology laboratory testing and prophylaxis/treatment of transfusion transmitted diseases. How is Human B19 Parvovirus primarily spread? Page 285.
Respiratory droplets/aerosols, Blood transfusion, Fecal-oral route, Sexual contact`,
  `question: Describe the pathology epidemiology laboratory testing and prophylaxis/treatment of transfusion transmitted diseases. What is the cellular receptor for Parvovirus B19? Page 285.
P antigen, CD4 antigen, H antigen, Duffy antigen`,
  `question: Describe the pathology epidemiology laboratory testing and prophylaxis/treatment of transfusion transmitted diseases. Which childhood disease is caused by Human Herpesvirus 6 (HHV-6)? Page 285.
Roseola infantum, Fifth disease, Chickenpox, Measles`,
  `question: Describe the pathology epidemiology laboratory testing and prophylaxis/treatment of transfusion transmitted diseases. Before a unit of blood is issued it should be inspected for discoloration hemolysis and what else that might indicate contamination? Page 285.
Clots, Gas bubbles, Precipitate, Fibrin strands`,
  `question: Describe the pathology epidemiology laboratory testing and prophylaxis/treatment of transfusion transmitted diseases. The diagnosis of Babesia microti can be made by examining a blood smear for what? Page 286.
Intraerythrocytic organisms, Spirochetes, Flagellates, Extracellular bacteria`,
  `question: Describe the pathology epidemiology laboratory testing and prophylaxis/treatment of transfusion transmitted diseases. In which phase of Chagas' disease are asymptomatic patients most likely to transmit the parasite via transfusion? Page 287.
Latent phase, Acute phase, Chronic phase, Convalescent phase`,
  `question: Describe the pathology epidemiology laboratory testing and prophylaxis/treatment of transfusion transmitted diseases. The most common form of classic Creutzfeldt-Jakob Disease (CJD) is what? Page 288.
Sporadic, Inherited, Iatrogenic, Variant`,
  `question: Describe the implications of non-tested transfusion transmitted diseases. If a donor's current donation tests positive for a TTD what must be done with any prior components still in date? Page 289.
They must be quarantined, They can be used immediately, They must be destroyed, They must be re-tested`
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