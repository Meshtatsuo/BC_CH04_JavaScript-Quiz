// Global variable
const listEl = document.querySelector("#answers");

var currentQuestion = 0;
var timer = 0;
const startingTime = 120;
var score = 0;

// leaderboard member object containing the name nad score
var leaderBoardItem = {
  name: "",
  score: 0,
};

var leaderBoard = [
  {
    name: "joe",
    score: 5,
  },
  {
    name: "bob",
    score: 33,
  },
  {
    name: "frankie",
    score: 341,
  },
];
// used to clear the timer interval
var timerInterval;
// question object contains question, all answers, and index of correct answer

const answerReward = 0;
const answerPenalty = -10;
const question = {
  qText: "",
  qAns1: "",
  qAns2: "",
  qAns3: "",
  qAns4: "",
  correctAns: 1,
};

// list of questions
const questionList = [
  {
    // Q1
    qText: "What are the three phases of event propagation?",
    qAns1: "Target > Capturing > Bubbling",
    qAns2: "Bubbling > Target > Capturing",
    qAns3: "Target > Bubbling > Capturing",
    qAns4: "Capturing > Target > Bubbling",
    correctAns: 4,
  },
  {
    // Q2
    qText: "Which answer is a correct example of an anonymous function?",
    qAns1: "addEventListener('click', function () { console.log('Hello'); };",
    qAns2: "var myFuction = function() { console.log('hello') };",
    qAns3: "myFunction() { console.log('hello') };",
    qAns4: "var myFunction() { console.log('hello') };",
    correctAns: 1,
  },
];

// FUNCTIONS

var beginQuiz = function () {
  removeAllButtons();
  replaceFeedbackText("");
  currentQuestion = 0;
  initalizeTimer(startingTime);
  createNextQuestion(currentQuestion);
};

var initalizeTimer = function (startingTime) {
  let timerEl = document.querySelector("#timer");
  timer = startingTime;
  timerEl.textContent = startingTime;
  timerInterval = setInterval(updateTimer, 1000);
};

var updateTimer = function () {
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

var removeAllButtons = function () {
  // Remove all buttons from ordered list
  while (document.querySelector(".answer-button")) {
    let listEl = document.querySelector("#answers");
    let listItemEl = document.querySelector(".answer-button");
    listEl.removeChild(listItemEl);
  }
};

var createNextQuestion = function (index) {
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

var createAnswerButton = function (answer, index) {
  // Creates list item, button, and assigns appropriate class, ID,
  // and text content values for each button
  let newAnsEl = document.createElement("li");
  newAnsEl.className = "answer-button";
  let newAnsBtnEl = document.createElement("button");
  // adds an ID of the corresponding index to the button. used
  // when checking for correct answer later
  newAnsBtnEl.className = "answer-button";
  newAnsBtnEl.id = "answer " + index;
  newAnsBtnEl.textContent = answer;
  newAnsEl.appendChild(newAnsBtnEl);
  listEl.appendChild(newAnsEl);
};
var createBeginButton = function () {
  // Creates list item, button, and assigns appropriate class, ID,
  // and text content values for each button
  let newAnsEl = document.createElement("li");
  newAnsEl.className = "answer-button";
  let newAnsBtnEl = document.createElement("button");
  // adds an ID of the corresponding index to the button. used
  // when checking for correct answer later
  newAnsBtnEl.id = "begin";
  newAnsBtnEl.textContent = "Play Again";
  newAnsEl.appendChild(newAnsBtnEl);
  listEl.appendChild(newAnsEl);
};

var evaluateAnswer = function (ansIndex) {
  if (ansIndex === questionList[currentQuestion].correctAns) {
    replaceFeedbackText("Correct!");
  } else {
    replaceFeedbackText("Wrong!");
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

var penalizePlayer = function () {
  timer += answerPenalty;
  let timerTextEl = document.querySelector("#timer");
  timerTextEl.textContent = timer;
  if (timer <= 0) {
    timer = 0;
    timerTextEl.textContent = "Times Up!";
    finishGame();
  }
};

var computeResults = function () {
  // calculate results
  score = timer;
  return score;
};

var displayResults = function (hasScore) {
  let resultTextEl = document.querySelector("#question-text");
  // Display results to screen
  if (hasScore) {
    resultTextEl.textContent =
      "Congratulations on finishing! You finished with a score of " +
      score +
      ". Enter your name to save your score!";
    displayHighScoreForm();
  } else {
    resultTextEl.textContent =
      "Sorry, you ran out of time! Click below to try again!";
    // Create begin button
    createBeginButton();
  }
};

var displayHighScoreForm = function (score) {
  let containerEl = document.querySelector("#answers");
  let formEl = document.createElement("form");
  let textEntryEl = document.createElement("input");
  let formButton = document.createElement("button");
  // add attributes to formEl
  formEl.className = "highScoreForm";
  // add attributers to textEntryEl
  textEntryEl.setAttribute("type", "text");
  textEntryEl.setAttribute("id", "textForm");
  textEntryEl.setAttribute("name", "name");
  // add attributes to form button
  formButton.setAttribute("type", "button");
  formButton.setAttribute("id", "submit-name");
  formButton.className = "answerButton";
  formButton.textContent = "Submit Score";

  //append and display elements
  formEl.appendChild(textEntryEl);
  formEl.appendChild(formButton);
  containerEl.appendChild(formEl);
};

var finishGame = function () {
  // set current question to high number to prevent continuing quiz after losing
  currentQuestion = 9999;
  removeAllButtons();
  replaceFeedbackText("");
  clearInterval(timerInterval);
  if (timer <= 0) {
    timer = 0;
    displayResults(false);
  } else {
    let score = computeResults();
    displayResults(true);
  }
};

var replaceFeedbackText = function (textToReplace) {
  let feedbackTxtEl = document.querySelector("#feedback-text");
  feedbackTxtEl.textContent = textToReplace;
};

var loadScores = function () {
  // load scores from local storage and store them in highScores array
};

var saveScores = function () {
  // Save high score array to local storage
  localStorage.setItem("High Scores", JSON.stringify(leaderBoard));
};

// add scores to a leaderboard. Not sorted
var addToLeaderboard = function (inputName, playerScore) {
  // If we have 10 names, replace the last one on the list
  if (leaderBoard.length >= 10) {
    leaderBoard[leaderBoard.length - 1] = {
      name: inputName.toUpperCase,
      score: playerScore,
    };
  }
  // If not, just add to the bottom of the list
  else {
    leaderBoard.push({ name: inputName, score: playerScore });
  }
  saveScores();
};

var displayLeaderboard = function () {
  // displays leaderboard to the screen
  let container = document.querySelector("#answers");
  let leaderBoardEl = document.createElement("ul");

  // set attributes
  leaderBoardEl.setAttribute("id", "answers leaderboard");

  // add unordered list to screen to be populated with the loop
  container.appendChild(leaderBoardEl);

  // loop through the array of scores and display them
  for (i = 0; i <= leaderBoard.length - 1; i++) {
    let listItemEl = document.createElement("li");
    let nameItemEl = document.createElement("h3");
    let scoreItemEl = document.createElement("h3");

    listItemEl.className = "answer-button";
    listItemEl.setAttribute("id", "leaderBoardItem");
    nameItemEl.setAttribute("id", "leaderBoardText");
    nameItemEl.className = "leaderboardText";
    scoreItemEl.setAttribute("id", "leaderBoardScore");
    scoreItemEl.className = "leaderboardText";

    nameItemEl.textContent = leaderBoard[i].name;
    scoreItemEl.textContent = leaderBoard[i].score;

    //add items to screen
    listItemEl.appendChild(nameItemEl);
    listItemEl.appendChild(scoreItemEl);
    leaderBoardEl.appendChild(listItemEl);
  }

  //update text and generate "new game" button
  var text = document.querySelector("#question-text");
  text.textContent = "High Scores";
  createBeginButton();

  // remove high score submission form
  let form = document.querySelector(".highScoreForm");
  form.remove();
};

//Startup logic
let btnClickListener = document.querySelector("#answers");

let highScoreListener = document.querySelector(".high-scores");

btnClickListener.addEventListener("click", function () {
  let target = event.target;
  if (event.target.matches("#begin")) {
    if (document.querySelector("ul")) {
      // remove leaderboard if currently displaying
      let leaderboardEl = document.querySelector("ol");
      leaderboardEl.removeChild(document.querySelector("ul"));
    }
    beginQuiz();
  } else if (target.matches(".answer-button")) {
    evaluateAnswer(+target.id.replace(/\D+/g, ""));
  } else if (target.matches("#submit-name")) {
    // Save high score to array and display high scores
    addToLeaderboard(document.getElementById("textForm").value, score);
    removeAllButtons();
    displayLeaderboard();
  }
});

highScoreListener.addEventListener("click", function () {
  removeAllButtons();
  displayLeaderboard();
});
