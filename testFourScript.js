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
    `question: In the number 7.314, how many significant figures are there?
Four, Three, Five, Two`,

  `question: How many significant figures are in the number 60.052?
Five, Four, Three, Six`,

  `question: How many significant figures does the number 4.70 have?
Three, Two, One, Four`,

  `question: How many significant figures are in the number 1000 (without a decimal point)?
One, Four, Three, Two`,

  `question: How many significant figures are present in the measurement 0.0032?
Two, Four, Five, Three`,

  `question: Are leading zeros (zeros to the left of the first non-zero digit) considered significant figures?
No, Yes, Only if there's a decimal point, Sometimes`,

  `question: Are zeros sandwiched between non-zero digits considered significant?
Yes, No, Only if after a decimal point, Only in whole numbers`,

  `question: Are trailing zeros to the right of a decimal point considered significant?
Yes, No, Only if the number is greater than 1, Never`,

  `question: What determines the number of significant figures associated with a measurement?
The measuring device, The number of zeros present, The presence of a decimal point, The magnitude of the number`,

  `question: According to the rounding rules, if the digit to be dropped is less than 5, what should you do?
Drop it and all digits to the right, Round the last kept digit up by 1, Round to the nearest even number, Keep the digit`,

  `question: According to the rounding rules, if the digit to be dropped is greater than 5, what should you do?
Increase the last digit to be kept by 1, Drop it and all digits to the right, Round to the nearest odd number, Keep the digit`,

  `question: When rounding, if the digit to be dropped is exactly 5, what is the rule?
Round the last kept digit to the nearest even number, Always round up, Always round down, Drop the 5`,

  `question: Round 12.683 to four significant figures.
12.68, 12.69, 12.70, 12.6`,

  `question: Round 9.87 to two significant figures.
9.9, 9.8, 10, 9.87`,

  `question: Round 8936.5 to four significant figures using the 'round to even' rule for 5.
8936, 8937, 8936.5, 8940`,

  `question: Round 3.35 to two significant figures using the 'round to even' rule for 5.
3.4, 3.3, 3.35, 3.0`,

  `question: What does the exponent in a number like  6^3  indicate?
Multiply the base (6) by itself 3 times, Multiply the base (6) by the exponent (3), Divide the base (6) by itself 3 times, Add the base (6) to itself 3 times`,

  `question: What does a negative exponent, like in  2^{-3} , indicate?
Multiply the reciprocal of the base (1/2) by itself 3 times, Multiply the base (2) by -3, Make the result of  2^3  negative, Divide the base (2) by -3`,

  `question: According to the Power Rule for exponents, what is  (x^5)^3 ?
 x^{15} ,  x^8 ,  x^2 ,  3x^5 `,

  `question: According to the Product Rule for exponents, what is  (x^6)(x^2) ?
 x^8 ,  x^{12} ,  x^4 ,  2x^6 `,

  `question: According to the Quotient Rule for exponents, what is  x^7 / x^4 ?
 x^3 ,  x^{11} ,  x^{28} ,  x^{7/4} `,

  `question: Scientific notation is a way of handling what kind of numbers?
Very large or very small numbers, Only whole numbers, Only negative numbers, Only fractions`,

  `question: In scientific notation ( 1.00 \times 10^2 ), what is the number 1.00 called?
Coefficient, Base, Exponent, Power`,

  `question: What must always be the base number in scientific notation?
10, 1, e, Any number`,

  `question: In scientific notation, what does a positive exponent indicate?
The decimal point was moved to the left (making a large number), The decimal point was moved to the right (making a small number), The number is positive, The coefficient is large`,

  `question: In scientific notation, what does a negative exponent indicate?
The decimal point was moved to the right (making a small number), The decimal point was moved to the left (making a large number), The number is negative, The coefficient is small`,

  `question: Convert the number 314 into standard scientific notation.
 3.14 \times 10^2 ,  31.4 \times 10^1 ,  0.314 \times 10^3 ,  3.14 \times 10^{-2} `,

  `question: Convert the number 0.0062 into standard scientific notation.
 6.20 \times 10^{-3} ,  6.2 \times 10^3 ,  0.62 \times 10^{-2} ,  62.0 \times 10^{-4} `,

  `question: When adding or subtracting numbers in scientific notation, what must be true about their exponents before performing the operation (unless converting to standard form)?
The exponents must be the same, The coefficients must be the same, One exponent must be positive, one negative, The bases must be different`,

  `question: When multiplying numbers in scientific notation, what operation is performed on the exponents?
Add the exponents, Multiply the exponents, Subtract the exponents, Divide the exponents`,

  `question: When dividing numbers in scientific notation, what operation is performed on the exponents?
Subtract the exponents (numerator - denominator), Divide the exponents, Add the exponents, Multiply the exponents`,

  `question: What is a ratio?
A comparison of two quantities, The answer to a division problem, A statement that two fractions are equal, A number expressed in scientific notation`,

  `question: If a test tube contains 6 mL of saline and 3 mL of serum, what is the saline to serum ratio?
2:1, 1:2, 6:3, 3:6`,

  `question: What is a proportion?
A statement that two ratios are equal, A comparison of three quantities, A single fraction, A percentage calculation`,

  `question: When one number in a proportion is unknown, what method can be used to find the unknown variable?
Cross multiplication, Scientific notation, Rounding rules, Significant figures`,

  `question: When setting up a ratio and proportion, what must be consistent across the numerators and denominators?
The units of the individual ratios, The number of significant figures, The exponents, The coefficients`,

  `question: Solve for x: (20 g / 100 mL) = (x g / 20 mL)
4 g, 1 g, 10 g, 400 g`,

  `question: What is defined as the description of something in terms of a numerical value?
Measurement, Observation, Calculation, Estimation`,

  `question: Which system of measurement is most commonly used in scientific work and globally?
Metric system, English system, Imperial system, US customary system`,

  `question: The metric system is composed of units related to each other decimally, based on powers of what number?
Ten, Two, Twelve, Sixty`,

  `question: What does mass describe?
The quantity of matter in an object, The pull of gravity on an object, The space occupied by an object, The distance between two points`,

  `question: What is the standard metric unit for mass?
Gram (g), Kilogram (kg), Pound (lb), Ounce (oz)`,

  `question: What is the difference between mass and weight?
Mass is the amount of matter, weight is the pull of gravity, Weight is the amount of matter, mass is the pull of gravity, Mass and weight are identical, Mass is measured in Newtons, weight in grams`,

  `question: What is the standard metric unit for length?
Meter (m), Foot (ft), Yard (yd), Mile (mi)`,

  `question: What is the standard metric unit for volume?
Liter (L), Gallon (gal), Quart (qt), Pint (pt)`,

  `question: What is the metric prefix for  10^3 ?
Kilo (k), Milli (m), Mega (M), Centi (c)`,

  `question: What is the metric prefix for  10^{-3} ?
Milli (m), Kilo (k), Micro (µ), Deci (d)`,

  `question: What is the metric prefix for  10^{-6} ?
Micro (µ), Milli (m), Nano (n), Kilo (k)`,

  `question: When converting from a smaller metric unit to a larger metric unit (e.g., mL to L), which way do you move the decimal point?
To the left, To the right, Depends on the unit, Do not move it`,

  `question: Convert 1000 mL to Liters.
1.0 L, 10 L, 0.1 L, 100 L`,

  `question: What is the formula to convert temperature from Fahrenheit (°F) to Celsius (°C)?
 C = (°F - 32) / 1.8 ,  C = (°F \times 1.8) + 32 ,  C = (°F + 32) \times 1.8 ,  C = (°F / 1.8) - 32 `,

  `question: What is the formula to convert temperature from Celsius (°C) to Fahrenheit (°F)?
 °F = (1.8 \times °C) + 32 ,  °F = (°C - 32) / 1.8 ,  °F = (°C / 1.8) + 32 ,  °F = (°C + 32) \times 1.8 `,

  `question: Convert -10°C to °F.
14°F, -22°F, 50°F, 25.6°F`,

  `question: What is density?
The ratio of mass to volume (m/v), The ratio of volume to mass (v/m), The mass of a substance, The volume occupied by a substance`,

  `question: If mass is in grams (g) and volume is in milliliters (mL), what are the units for density?
g/mL, mL/g, g mL, g`,

  `question: What is the relationship between mL,  cm^3 , and cc?
 1 mL = 1 cm^3 = 1 cc ,  1 mL = 10 cm^3 = 10 cc ,  10 mL = 1 cm^3 = 1 cc ,  1 mL = 0.1 cm^3 = 0.1 cc `,

  `question: Calculate the density of a substance if a 2.00 mL sample weighs 5.40 g.
2.70 g/mL, 10.8 g/mL, 0.37 g/mL, 7.40 g/mL`,

  `question: What is specific gravity?
The ratio of the density of an object to the density of water at 4°C, The density of an object in g/mL, The weight of an object compared to water, The mass of an object divided by its specific heat`,

  `question: What is the density of pure water at 4°C, used as the reference for specific gravity?
1.00 g/mL, 0.98 g/mL, 1.00 kg/L, 4.0 g/mL`,

  `question: Why is specific gravity a unit-less term?
Because it's a ratio of two densities with the same units, Because density has no units, Because water has a density of 1, Because it's measured with a hydrometer`

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