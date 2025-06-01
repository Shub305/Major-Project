const questions = [
  {
    question: "Which of these is a right?",
    choices: ["Playing", "Getting unlimited candy", "Skipping school"],
    correct: 0
  },
  {
    question: "What does every child deserve?",
    choices: ["Love and care", "To be ignored", "To never go outside"],
    correct: 0
  },
  {
    question: "Which is NOT a child’s right?",
    choices: ["Protection", "Education", "Being punished unfairly"],
    correct: 2
  },
  {
    question: "Who has children's rights?",
    choices: ["Only rich children", "All children", "Only children in school"],
    correct: 1
  }
];

let current = 0;
let score = 0;

const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("nextBtn");
const scoreBoard = document.getElementById("scoreBoard");

const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");

function showQuestion() {
  const q = questions[current];
  questionEl.textContent = q.question;
  choicesEl.innerHTML = "";
  feedbackEl.textContent = "";

  q.choices.forEach((choice, index) => {
    const btn = document.createElement("div");
    btn.className = "choice";
    btn.textContent = choice;
    btn.onclick = () => checkAnswer(index);
    choicesEl.appendChild(btn);
  });

  nextBtn.disabled = true;
}

function checkAnswer(selected) {
  const q = questions[current];
  if (selected === q.correct) {
    feedbackEl.textContent = "✅ Correct!";
    feedbackEl.style.color = "green";
    correctSound.play();
    score += 1;
  } else {
    feedbackEl.textContent = "❌ Wrong!";
    feedbackEl.style.color = "red";
    wrongSound.play();
  }

  scoreBoard.textContent = `Score: ${score}`;
  document.querySelectorAll(".choice").forEach((c) => c.onclick = null);
  nextBtn.disabled = false;
}

nextBtn.onclick = () => {
  current += 1;
  if (current < questions.length) {
    showQuestion();
  } else {
    questionEl.textContent = "🎉 Quiz Complete!";
    choicesEl.innerHTML = "";
    feedbackEl.textContent = `Final Score: ${score} / ${questions.length}`;
    nextBtn.disabled = true;
  }
};

showQuestion();
