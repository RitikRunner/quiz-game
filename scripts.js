const questions = [
  {
    question: "Which is the largest ocean in the world?",
    answers: [
      { text: "Indian Ocean", correct: false },
      { text: "Atlantic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
      { text: "Arctic Ocean", correct: false }
    ]
  },
  {
    question: "Which of these animals is the national animal of India?",
    answers: [
      { text: "Royal Bengal Tiger", correct: true },
      { text: "Asiatic Elephant", correct: false },
      { text: "Asiatic Rhino", correct: false },
      { text: "Golden Langur", correct: false }
    ]
  },
  {
    question: "What is the name of the tallest mountain in our galaxy?",
    answers: [
      { text: "Mount Everest", correct: false },
      { text: "Mount Olympus", correct: true },
      { text: "Mount Titan", correct: false },
      { text: "Mount Megalithic", correct: false }
    ]
  },
  {
    question: "How many dots appear on a pair of dice?",
    answers: [
      { text: "40", correct: false },
      { text: "41", correct: false },
      { text: "42", correct: true },
      { text: "43", correct: false }
    ]
  },
  {
    question: "Which country has the most islands?",
    answers: [
      { text: "Thailand", correct: false },
      { text: "Japan", correct: false },
      { text: "Canada", correct: false },
      { text: "Sweden", correct: true }
    ]
  }
];

const questionElement = document.getElementById("questions");
const answerButtons = document.getElementById("answer-buttons");  // ✅ Fixed ID
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  
  let currentQuestion = questions[currentQuestionIndex];  // ✅ Fixed typo (was `question`)
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;  // ✅ Fixed typo (was `answers.text`)
    button.classList.add("btn");
    answerButtons.appendChild(button);  // ✅ Fixed (was appending to wrong variable)

    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";  // ✅ Fixed typo (was `iscorrect`)

  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }

  nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
  nextButton.addEventListener("click", startQuiz);
}

startQuiz();