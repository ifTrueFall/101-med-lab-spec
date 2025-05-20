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
  `question: What term describes how close a measurement result comes to the true value?
Accuracy, Precision, Variance, Median`,

  `question: What is a substance or sample being analyzed called?
Analyte, Reagent, Control, Standard`,

  `question: What statistical measure represents the ratio of standard deviation to the mean often expressed as a percentage?
Coefficient of Variation CV, Standard Deviation SD, Variance s2, Range R`,

  `question: What is a graph called where quality control data is plotted to give a visual indication of test performance with distance from the mean in standard deviations?
Levey-Jennings Chart, Histogram, Scatter Plot, Bar Graph`,

  `question: What is the sum of a group of measurements divided by the number of measurements also known as the average?
Mean X, Median, Mode, Range`,

  `question: In a group of measurements arranged from lowest to highest what is the middle value called?
Median, Mean, Mode, Standard Deviation`,

  `question: What is the most frequently occurring value in a group of measurements?
Mode, Mean, Median, Variance`,

  `question: What type of probability distribution is symmetric around the mean showing data near the mean are more frequent often appearing as a bell curve?
Normal Distribution Gaussian Distribution, Binomial Distribution, Poisson Distribution, Skewed Distribution`,

  `question: What term describes the reproducibility of a result or measurement or the closeness of two or more measurements to each other?
Precision, Accuracy, Bias, Trueness`,

  `question: What statistical measure describes how widely spread data points are?
Standard Deviation SD, Mean X, Median, Mode`,

  `question: What statistical measurement describes the spread between numbers in a data set specifically how far each number is from the mean?
Variance s2, Range R, Coefficient of Variation CV, Interquartile Range IQR`,

  `question: Why are descriptive statistics considered the foundation for monitoring performance known as QC in clinical labs?
They summarize data to monitor test performance, They predict future outcomes, They eliminate all errors, They automate testing processes`,

  `question: One use of statistical descriptions of data sets in the clinical laboratory is to identify how a population of data is what?
Distributed, Collected, Reported, Billed`,

  `question: Statistical descriptions of data can be used to assess what type of variation in a population of data?
Random variation, Systematic variation only, Known variation, Expected variation`,

  `question: When comparing and analyzing collections of laboratory data patterns can be described by their center spread and what other characteristic?
Shape, Size, Color, Cost`,

  `question: Assessment of data dispersion or spread allows laboratorians to assess what in a laboratory test or measurement?
Predictability and the lack of it, Only the accuracy, Only the cost-effectiveness, The sample volume needed`,

  `question: Which is generally considered more powerful for comparing laboratory data patterns the center of data or the spread of data?
Comparing the spread can be even more powerful, Comparing the center is always more powerful, Both are equally powerful, Neither is very powerful`,

  `question: What are the three most commonly used descriptions of the center of a dataset?
Mean median and mode, Range variance and standard deviation, Accuracy precision and bias, Skewness kurtosis and distribution`,

  `question: How should the mean be reported in terms of decimal places compared to the original data?
To the same decimal place as the original data, To one more decimal place, To one less decimal place, Always as a whole number`,

  `question: What does the summation sign sigma represent in statistical formulas?
The sum of a series of values like x1 + x2 + x3, The product of a series of values, The average of a series of values, The range of a series of values`,

  `question: If you have the data set 103 104 102 100 106 102 103 104 102 101 what is the sum of these values?
1027, 1020, 1030, 1017`,

  `question: For the data set 103 104 102 100 106 102 103 104 102 101 with a sum of 1027 and 10 observations what is the mean?
102.7, 102, 103, 1027`,

  `question: To determine the median what must first be done to the data?
The data must be placed in numerical order from lowest to highest, The mean must be calculated, The standard deviation must be found, The data must be squared`,

  `question: For the sorted data 100 101 102 102 102 103 103 104 104 106 what is the median?
102.5, 102, 103, 102.7`,

  `question: For the data set 100 101 102 102 102 103 103 104 104 106 what is the mode?
102, 103, 104, 102.5`,

  `question: What does the spread of a dataset represent?
The relationship of all the data points to the mean, Only the highest and lowest values, The central tendency of the data, The shape of the data distribution`,

  `question: What are the three commonly used descriptions of spread for a dataset?
Range standard deviation SD and coefficient of variation CV, Mean median and mode, Accuracy precision and trueness, Skewness kurtosis and modality`,

  `question: What is the range of a dataset?
The difference between the highest and lowest data points, The average of all data points, The most frequent data point, The square root of the variance`,

  `question: Standard deviation SD is a measure of dispersion of a group of values around what?
The mean, The median, The mode, The range`,

  `question: Standard deviation is derived from the curve of normal distribution and is used to assess what?
Precision, Accuracy, Bias, Linearity`,

  `question: To calculate the standard deviation of a dataset it is easiest to first determine what value?
Variance s2, Range, Mean, Median`,

  `question: Variance s2 represents the average of the squared differences from what?
The mean, The median, The mode, Zero`,

  `question: What is the formula for variance s2?
Sum of (x - mean)squared / (n - 1), Sum of x / n, Square root of (Sum of (x - mean)squared / (n - 1)), Highest value minus lowest value`,

  `question: For the dataset with a sum of squared differences from the mean of 26.1 and 10 observations (n=10) what is the variance?
2.9, 2.61, 26.1, 2.34`,

  `question: How is the standard deviation SD calculated from the variance s2?
Take the square root of the variance, Square the variance, Divide the variance by n-1, Multiply the variance by the mean`,

  `question: If the variance of a dataset is 2.9 what is the standard deviation approximately?
1.7, 2.9, 8.41, 0.83`,

  `question: Standard deviation SD is typically rounded to how many additional decimal places from the original data?
One additional decimal place, The same number of decimal places, Two additional decimal places, No rounding is needed`,

  `question: What is the formula for Coefficient of Variation percent CV?
(SD / Mean) multiplied by 100, (Mean / SD) multiplied by 100, (Range / Mean) multiplied by 100, (Variance / Mean) multiplied by 100`,

  `question: The percent CV is always reported to what decimal place?
The tenths place, The hundredths place, The nearest whole number, Three decimal places`,

  `question: If SD is 1.7029 and Mean is 102.7 what is the percent CV approximately?
1.7 percent, 1.66 percent, 0.017 percent, 17.0 percent`,

  `question: What is the most commonly discussed data distribution shape in laboratory statistics?
Gaussian distribution normal distribution, Skewed distribution, Bimodal distribution, Uniform distribution`,

  `question: In a Gaussian or normal distribution what is the relationship between the mean median and mode?
They are identical, The mean is highest, The median is highest, The mode is highest`,

  `question: What term describes the symmetry of a Gaussian distribution?
Symmetric half values left of mean half right, Asymmetric skewed to the left, Asymmetric skewed to the right, Multimodal`,

  `question: What is the common name for the symmetrical shape of a Gaussian distribution?
Bell curve, U-shaped curve, J-shaped curve, Straight line`,

  `question: According to the 68-95-99 Rule what percentage of data falls between plus minus 1 SD from the mean in a Gaussian distribution?
68 percent, 95 percent, 99 percent, 50 percent`,

  `question: According to the 68-95-99 Rule what percentage of data falls between plus minus 2 SD from the mean in a Gaussian distribution?
95 percent, 68 percent, 99 percent, 99.7 percent`,

  `question: According to the 68-95-99 Rule what percentage of data falls between plus minus 3 SD from the mean in a Gaussian distribution?
99.7 percent (or 99 percent as simplified in one part of text), 95 percent, 68 percent, 100 percent`,

  `question: What are the key characteristics used to describe patterns in laboratory data?
Center spread and shape, Accuracy precision and bias, Mean range and mode only, Linearity specificity and sensitivity`,

  `question: Descriptive statistics are primarily used for what purpose in monitoring QC?
To provide basic information about variables and highlight potential relationships, To definitively prove causality, To eliminate all laboratory errors, To automate data entry`,

  `question: If a dataset has many slight measurement differences what can be said about their values?
They form patterns that can be visualized and analyzed, They are all errors, They cannot be analyzed, They must be identical`,

  `question: Laboratorians view and describe data patterns using graphical representations and what other tools?
Descriptive statistics, Inferential statistics only, Predictive modeling, Cost analysis`,

  `question: The range of a dataset represents the what of data one might encounter?
Extremes, Average, Most common values, Predictability`,

  `question: Variance is a measure of dispersion representing the difference between each value and what?
The average of the data the mean, The median of the data, The mode of the data, The lowest value`,

  `question: In the formula for variance s2 what does 'n' represent?
The number of observations, The mean, The standard deviation, The range`,

  `question: The calculation for variance involves summing the squared differences between each value and the mean then dividing by what?
n - 1, n, The mean, The standard deviation`,

  `question: Is accuracy the same as precision?
No accuracy is closeness to true value precision is reproducibility, Yes they are identical terms, Accuracy refers to spread precision refers to center, Precision is a type of accuracy`,

  `question: If a series of measurements are all very close to each other but far from the true value they are considered?
Precise but not accurate, Accurate but not precise, Both accurate and precise, Neither accurate nor precise`,

  `question: If the mean of a dataset is 100 and the SD is 5 what is the percent CV?
5 percent, 0.05 percent, 20 percent, 500 percent`,

  `question: When plotting a Levey-Jennings chart the x-axis typically represents what?
Time day or run number, Concentration values, Standard deviation units, Mean values`,

  `question: On a Levey-Jennings chart horizontal lines are typically drawn for the mean and what other values?
The mean plus minus 1s 2s and 3s, Only the mean, The range limits, The median and mode`
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