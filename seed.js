let seed, rng, questions, numQuestions, currentQuestion = 0, score = 0;
let answers = [];
let correctAnswers = [];
let startTime, timerInterval;

function startQuiz() {
  seed = document.querySelector("#seed").value;
  numQuestions = parseInt(document.querySelector("#questions").value);
  rng = new Math.seedrandom(seed);
  questions = generateQuestions(numQuestions);
  currentQuestion = 0;
  score = 0;
  answers = [];
  correctAnswers = [];

  document.querySelector("#timer").textContent = "Time: 0:00.0";
  document.querySelector("#question").textContent = questions[currentQuestion].question;
  document.querySelector("#score").textContent = "";
  document.querySelector("#result").innerHTML = "";
  document.querySelector("#answer").value = '';
  document.querySelector("#menu").style.display = "none";
  document.querySelector("#input").style.display = "block";
  document.querySelector("#answer").focus();

  startTime = new Date();

  // Start live timer
  clearInterval(timerInterval);
  timerInterval = setInterval(updateTimer, 100);
}

function updateTimer() {
  let currentTime = new Date();
  let elapsedTime = (currentTime - startTime) / 1000; // Time in seconds

  let minutes = Math.floor(elapsedTime / 60);
  let seconds = Math.floor(elapsedTime % 60);
  let tenths = Math.floor((elapsedTime * 10) % 10);

  document.querySelector("#timer").textContent = `Time: ${minutes}:${seconds.toString().padStart(2, '0')}.${tenths}`;
}

function generateQuestions(num) {
  let questionsList = [];
  for (let i = 0; i < num; i++) {
    let a = Math.floor(rng() * 10) + 1;
    let b = Math.floor(rng() * 10) + 1;
    questionsList.push({
      question: `What is ${a} x ${b}?`,
      answer: a * b
    });
  }
  return questionsList;
}

function submitAnswer() {
  let userAnswer = parseInt(document.querySelector("#answer").value);
  let correctAnswer = questions[currentQuestion].answer;

  answers.push(userAnswer);
  correctAnswers.push(userAnswer === correctAnswer);

  currentQuestion++;

  if (userAnswer === correctAnswer) {
    score++;
  }

  if (currentQuestion < numQuestions) {
    document.querySelector("#question").textContent = questions[currentQuestion].question;
    document.querySelector("#answer").value = '';
    document.querySelector("#answer").focus();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  clearInterval(timerInterval); // Stop the timer

  let endTime = new Date();
  // let timeTaken = Math.floor((endTime - startTime) / 1000);

  // Show answers
  let resultList = document.querySelector("#result");
  for (let i = 0; i < numQuestions; i++) {
    let resultItem = document.createElement("li");
    resultItem.textContent = `Q${i+1}: ${questions[i].question} Your answer: ${answers[i]} - ${correctAnswers[i] ? "Correct" : "Incorrect"}`;
    resultList.appendChild(resultItem);
  }

  // Show score
  document.querySelector("#score").textContent = `You scored ${score} out of ${numQuestions}!`;
}

function handleEnterPress(event) {
  if (event.key === "Enter") {
    submitAnswer();
  }
}

// Event listeners
document.querySelector("#startQuiz").addEventListener("click", startQuiz);
document.querySelector("#submitAnswer").addEventListener("click", submitAnswer);
document.querySelector("#answer").addEventListener("keydown", handleEnterPress);
