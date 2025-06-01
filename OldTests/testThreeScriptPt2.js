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
    `question: What is defined as the total mass of the protons, neutrons, and electrons in a single atom at rest?
Atomic Mass, Atomic Number, Mass Number, Isotopic Mass`,

    `question: What is the positively charged center of the atom, consisting of protons and neutrons?
Atomic Nucleus, Electron Cloud, Orbital Shell, Valence Shell`,

    `question: What is the term for the number of protons in the nucleus of an atom of an element?
Atomic Number, Mass Number, Neutron Number, Electron Number`,

    `question: What is the force that holds atoms together in a chemical compound?
Chemical Bond, Van der Waals Force, Gravitational Force, Magnetic Force`,

    `question: What type of chemical link between atoms involves the sharing of electron pairs?
Covalent Bond, Ionic Bond, Metallic Bond, Hydrogen Bond`,

    `question: What does the principal energy level of an electron refer to?
The shell or orbital in which the electron is located relative to the atom's nucleus, The speed of the electron, The charge of the electron, The spin of the electron`,

    `question: What is a stable, negatively charged subatomic particle?
Electron, Proton, Neutron, Positron`,

    `question: What is the measure of the ability of an atom to accept an electron?
Electron Affinity, Ionization Energy, Electronegativity, Atomic Radius`,

    `question: What are the vertical columns on the periodic table consisting of elements that share periodic properties called?
Group, Period, Series, Block`,

    `question: What is an atom or molecule which has a different number of protons than electrons, resulting in a net electrical charge?
Ion, Isotope, Element, Compound`,

    `question: What type of bond involves the attractive force between ions resulting from electron transfer?
Ionic Bond, Covalent Bond, Metallic Bond, Polar Covalent Bond`,

    `question: What is the energy required to completely remove an electron from an atom called?
Ionization Energy, Electron Affinity, Bond Energy, Activation Energy`,

    `question: What are atoms that have the same number of protons but different numbers of neutrons?
Isotopes, Isobars, Isotones, Isomers`,

    `question: What is a substance with high electrical conductivity, luster, and malleability, which readily loses electrons?
Metal, Nonmetal, Metalloid, Halogen`,

    `question: What is an element that has both metallic and nonmetallic properties?
Metalloid, Metal, Nonmetal, Noble Gas`,

    `question: Which particle in the atomic nucleus has a mass of 1 and a net neutral electrical charge?
Neutron, Proton, Electron, Quark`,

    `question: Which elements tend to gain electrons to form negative ions (anions) during chemical reactions?
Nonmetal, Metal, Metalloid, Alkali Metal`,

    `question: What principle states that bonded atoms share their eight outer electrons, resembling a noble gas?
Octet Rule, Hund's Rule, Pauli Exclusion Principle, Aufbau Principle`,

    `question: What are the horizontal rows of the periodic table, where elements have the same highest unexcited electron energy level?
Period, Group, Family, Series`,

    `question: What law states that the properties of elements recur predictably when arranged by increasing atomic number?
Periodic Law, Law of Conservation of Mass, Law of Definite Proportions, Avogadro's Law`,

    `question: Which component of the atomic nucleus has a defined mass of 1 and a charge of +1?
Proton, Neutron, Electron, Photon`,

    `question: What are elements in which all inner shells are complete but outer shells are incomplete called?
Representative Elements, Transition Elements, Noble Gases, Lanthanides`,

    `question: What are alternative forms of elements with different molecular weights that are found naturally and do not decay radioactively?
Stable Isotopes, Radioisotopes, Allotropes, Isomers`,

    `question: What are elements whose atoms have an incomplete d sub-shell called?
Transition Elements, Representative Elements, Alkali Metals, Halogens`,

    `question: What is the outermost electron most likely to participate in bond formation or a chemical reaction called?
Valence Electron, Core Electron, Paired Electron, Lone Electron`,

    `question: What is the basic structural unit of an element that retains the chemical properties of that element?
Atom, Molecule, Compound, Ion`,

    `question: The atom is composed of which three primary particles?
Protons, Neutrons, Electrons, Photons, Quarks, Leptons, Neutrinos, Bosons, Gluons, Ions, Molecules, Compounds`,

    `question: Which two particles are found in the nucleus of an atom?
Protons and Neutrons, Electrons and Protons, Electrons and Neutrons, Only Protons`,

    `question: Which subatomic particle is very low in mass compared to protons and neutrons and populates the region surrounding the nucleus?
Electron, Proton, Neutron, Positron`,

    `question: What is the charge of a proton?
+1, -1, 0, +2`,

    `question: What is the charge of an electron?
-1, +1, 0, -2`,

    `question: What determines the identity of an atom?
Number of protons, Number of neutrons, Number of electrons, Number of electron shells`,

    `question: When an atom is neutral, the number of protons is equal to the number of what?
Electrons, Neutrons, Quarks, Orbitals`,

    `question: What does the mass number (A) of an atom represent?
Sum of protons and neutrons, Number of protons, Number of neutrons, Number of electrons`,

    `question: How is the number of neutrons in an atom calculated?
Mass number - Atomic number, Atomic number - Mass number, Mass number + Atomic number, Number of protons + Number of electrons`,

    `question: Modern periodic law states that the physical and chemical properties of elements are periodic functions of their what?
Atomic numbers, Atomic masses, Number of neutrons, Valence electrons`,

    `question: Isotopes of the same element have different numbers of which particle?
Neutrons, Protons, Electrons, Electron shells`,

    `question: The atomic mass of an element listed on the periodic table is a weighted average of the masses of its what?
Isotopes, Ions, Molecules, Allotropes`,

    `question: Which group of elements on the periodic table separates metals from nonmetals?
Metalloids, Halogens, Noble Gases, Alkali Metals`,

    `question: Which element is an exception that has properties of a nonmetal at normal conditions but can act as an alkali metal under extremely high pressure?
Hydrogen, Helium, Boron, Carbon`,

    `question: What do metals tend to do during a chemical change?
Lose electrons, Gain electrons, Share electrons equally, Remain neutral`,

    `question: Which of these is a characteristic property of metals?
Good electrical conductivity, Poor heat conductivity, Brittle, Tendency to form anions`,

    `question: Boron (B), Silicon (Si), and Arsenic (As) are examples of what type of elements?
Metalloids, Metals, Nonmetals, Noble Gases`,

    `question: What do nonmetals tend to do during a chemical change?
Gain electrons, Lose electrons, Form cations, Conduct electricity well`,

    `question: The bonding process between atoms is a direct consequence of the arrangement of what?
Electrons, Protons, Neutrons, The nucleus`,

    `question: What do the horizontal rows on the periodic table, numbered 1 through 7, represent?
Periods, Groups, Families, Series`,

    `question: To which period do the lanthanide series elements belong?
Period 6, Period 5, Period 7, Period 4`,

    `question: What are the vertical columns of elements in the periodic table called?
Groups or Families, Periods, Series, Blocks`,

    `question: Elements in Group A of the periodic table are also known as what?
Representative elements, Transition elements, Lanthanides, Actinides`,

    `question: Group IA elements are also known by what common name?
Alkali metals, Alkaline earth metals, Halogens, Noble gases`,

    `question: Group VIIIA elements (e.g., Helium, Neon, Argon) are also known as what?
Noble gases, Halogens, Alkali metals, Transition metals`,

    `question: How do metallic elements typically form ions?
By loss of electrons to form cations, By gain of electrons to form anions, By sharing electrons to form covalent bonds, By accepting protons`,

    `question: How do nonmetallic elements typically form ions?
By gaining electrons to form anions, By losing electrons to form cations, By losing protons, By sharing neutrons`,

    `question: For representative elements, the number of valence electrons in an atom generally corresponds to what?
The group number (associated with letter A), The period number, The atomic number, The mass number`,

    `question: How many valence electrons do noble gases (except Helium) typically have?
Eight, Two, Seven, One`,

    `question: The octet rule states that elements usually react to attain the electron configuration of which group of elements?
Noble gases, Halogens, Alkali metals, Transition metals`,

    `question: Anions are formed by the parent atom doing what?
Gaining one or more electrons, Losing one or more electrons, Losing one or more protons, Gaining one or more neutrons`,

    `question: Cations are formed by the parent atom doing what?
Losing one or more electrons, Gaining one or more electrons, Gaining one or more protons, Losing one or more neutrons`,

    `question: How does atomic size generally change from left to right across a period in the periodic table?
Decreases, Increases, Stays the same, Increases then decreases`,

    `question: How does atomic size generally change from top to bottom down a group in the periodic table?
Increases, Decreases, Stays the same, Decreases then increases`
    // *** PASTE OR ADD OTHER QUESTIONS HERE ***
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