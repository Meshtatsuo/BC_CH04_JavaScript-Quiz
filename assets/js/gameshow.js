// Global variable
let listEl = document.querySelector("#answers");

let currentQuestion = 0;
let timer = 0;
let startingTime = 10;
let score = 0;
// used to clear the timer interval
let timerInterval;
// question object contains question, all answers, and index of correct answer

let answerReward = 0;
let answerPenalty = -10;
let question = {
  qText: "",
  qAns1: "",
  qAns2: "",
  qAns3: "",
  qAns4: "",
  correctAns: 1,
};

// list of questions
let questionList = [
  {
    // Q1
    qText: "Test Question One",
    qAns1: "Correct Answer",
    qAns2: "incorrect Answer",
    qAns3: "incorrect Answer",
    qAns4: "incorrect Answer",
    correctAns: 1,
  },
  {
    // Q2
    qText: "Test Question Two",
    qAns1: "incorrect Answer",
    qAns2: "Correct Answer",
    qAns3: "incorrect Answer",
    qAns4: "incorrect Answer",
    correctAns: 2,
  },
];

// FUNCTIONS

let beginQuiz = function () {
  removeAllButtons();
  currentQuestion = 0;
  initalizeTimer(startingTime);
  createNextQuestion(currentQuestion);
};

let initalizeTimer = function (startingTime) {
  let timerEl = document.querySelector("#timer");
  timer = startingTime;
  timerEl.textContent = startingTime;
  timerInterval = setInterval(updateTimer, 1000);
};

let updateTimer = function () {
  timer -= 1;
  let timerEl = document.querySelector("#timer");
  if (timer <= 0) {
    timer = 0;
    timerEl.textContent = "Times Up!";
    finishGame();
  } else {
    timerEl.textContent = timer;
  }
};

let removeAllButtons = function () {
  // Remove all buttons from ordered list
  while (document.querySelector(".answer-button")) {
    let listEl = document.querySelector("#answers");
    let listItemEl = document.querySelector(".answer-button");
    listEl.removeChild(listItemEl);
  }
};

let createNextQuestion = function (index) {
  // create next question elements based on index
  // Set values to vars for easy creation
  let qText = questionList[index].qText;
  let question = document.querySelector("#question-text");
  //Set question text content to new question
  question.textContent = qText;

  for (i = 1; i <= 4; i++) {
    // Appends a variable based on
    // loop index, then  uses that string to do a lookup
    // for the qAns variable of the proper index.
    let ans = "qAns" + i;
    createAnswerButton(questionList[index][ans], i);
  }
};

let createAnswerButton = function (answer, index) {
  // Creates list item, button, and assigns appropriate class, ID,
  // and text content values for each button
  let newAnsEl = document.createElement("li");
  newAnsEl.className = "answer-button";
  let newAnsBtnEl = document.createElement("button");
  // adds an ID of the corresponding index to the button. used
  // when checking for correct answer later
  newAnsBtnEl.id = "answer " + index;
  newAnsBtnEl.textContent = answer;
  newAnsEl.appendChild(newAnsBtnEl);
  listEl.appendChild(newAnsEl);
};

let createBeginButton = function () {
  // Creates list item, button, and assigns appropriate class, ID,
  // and text content values for each button
  let newAnsEl = document.createElement("li");
  newAnsEl.className = "answer-button";
  let newAnsBtnEl = document.createElement("button");
  // adds an ID of the corresponding index to the button. used
  // when checking for correct answer later
  newAnsBtnEl.id = "answer begin";
  newAnsBtnEl.textContent = "Play Again";
  newAnsEl.appendChild(newAnsBtnEl);
  listEl.appendChild(newAnsEl);
};

let evaluateAnswer = function (ansIndex) {
  if (ansIndex === questionList[currentQuestion].correctAns) {
    let response = document.querySelector("#feedback");
    response.textContent = "Correct!";
  } else {
    let response = document.querySelector("#feedback");
    response.textContent = "Wrong!";
    penalizePlayer();
  }
  if (currentQuestion >= questionList.length - 1) {
    finishGame();
  } else {
    // Set next question as current and update to new question.
    removeAllButtons();
    currentQuestion++;
    createNextQuestion(currentQuestion);
  }
};

let penalizePlayer = function () {
  debugger;
  timer += answerPenalty;
  let timerTextEl = document.querySelector("#timer");
  timerTextEl.textContent = timer;
  if (timer <= 0) {
    timer = 0;
    timerTextEl.textContent = "Times Up!";
    finishGame();
  }
};

let computeResults = function () {
  // calculate results
  score = timer;
  return score;
};

let displayResults = function (hasScore) {
  let resultTextEl = document.querySelector("#question-text");
  // Display results to screen
  if (hasScore) {
    resultTextEl.textContent =
      "Congratulations on finishing! You finished with a score of " +
      score +
      ". Click below to try again!";
  } else {
    resultTextEl.textContent =
      "Sorry, you ran out of time! Click below to try again!";
  }
  // Create begin button
  createBeginButton();
};

let finishGame = function () {
  // set current question to high number to prevent continuing quiz after losing
  currentQuestion = 9999;
  removeAllButtons();
  clearInterval(timerInterval);
  if (timer <= 0) {
    timer = 0;
    displayResults(false);
  } else {
    let score = computeResults();
    displayResults(true);
  }
};

//Startup logic
let clickListener = document.querySelector("#answers");

clickListener.addEventListener("click", function () {
  let idVals = event.target.id;
  if (idVals.includes("begin")) {
    beginQuiz();
  } else {
    evaluateAnswer(+idVals.replace(/\D+/g, ""));
  }
});
