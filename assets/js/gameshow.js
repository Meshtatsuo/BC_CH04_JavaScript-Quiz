// Global variables
const listEl = document.querySelector("#answers");

var currentQuestion = 0;
var timer = 0;
const startingTime = 120;
var score = 0;

// leaderBoard member object containing the name nad score
var leaderBoardItem = {
  name: "",
  score: 0,
};

var leaderBoard = [];
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
  {
    // Q3
    qText:
      "Which of the following is the incorrect way to declare a variable in JavaScript?",
    qAns1: "let promptUser = function() {};",
    qAns2: "int myNumber = 15;",
    qAns3: "const pi = 3.14159;",
    qAns4: "var myCollection = [];",
    correctAns: 2,
  },
  {
    // Q4
    qText: "What does console.log('Hello World!') do?",
    qAns1: "Prints 'Hello World!' to the viewport",
    qAns2: "Saves 'Hello World!' to a log file in local storage.",
    qAns3: "Prints 'Hello World!' to the developer tools console.",
    qAns4: "All of the Above",
    correctAns: 3,
  },
  {
    // Q5
    qText: "What does Document.querySelector do?",
    qAns1:
      "Attaches an event listener to an element in the DOM that matches the specified selector",
    qAns2:
      "Returns the first element within the document that matches the specified selector.",
    qAns3: "Creates a new element that matches the specified selector.",
    qAns4:
      "Adds a new element that matches the specified selector and adds it to the DOM.",
    correctAns: 2,
  },
  {
    // Q6
    qText: "What is the Document Object Model?",
    qAns1: "The index.html file in a website's root directory",
    qAns2:
      "The method a web browser uses to apply stylings to an HTML document",
    qAns3:
      "A generated version of the HTML script that can be read and used by JavaScript",
    qAns4: "All of the above",
    correctAns: 3,
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
  // Called along with an interval so it triggers once every second
  // decrements timer by 1 and finishes game if timer reaches 0
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
  // Checks answer index and compare it to the index associated by
  // the clicked button's id attribute.
  // If correct, updates feedback text and moves on to next question
  // If incorrect, applies penalty, updates feedback text, and moves on to next question
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
  // Docks the player's timer (and as a result their score) by the penalty amount
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
  // Some very intense calculations to determine the player's score
  score = timer;
  return score;
};

var displayResults = function (hasScore) {
  // Displays the results to the player
  // Only displays the form to submit high score if player has a score
  // to submit, otherwise displays the play button
  let resultTextEl = document.querySelector("#question-text");
  // Display results to screen
  if (hasScore) {
    resultTextEl.textContent =
      "You finished with a score of " +
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
  // Creates elements and generates the high score form,
  // then adds it to the screen item by item
  let containerEl = listEl;
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
  // Finishes the game and computes then displays results to the
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
  // Updates the feedback text
  let feedbackTxtEl = document.querySelector("#feedback-text");
  feedbackTxtEl.textContent = textToReplace;
};

var loadScores = function () {
  // load scores from local storage and store them in highScores array
  let loadedScores = localStorage.getItem("High Scores");
  if (loadedScores) {
    leaderBoard = JSON.parse(loadedScores);
  } else {
    return false;
  }
};

var saveScores = function () {
  // Save high score array to local storage
  localStorage.setItem("High Scores", JSON.stringify(leaderBoard));
};

// add scores to a leaderBoard. Not sorted
var addToleaderBoard = function (inputName, playerScore) {
  // If we have 10 names, replace the last one on the list
  if (leaderBoard.length >= 10) {
    // Find score in leaderBoard just beneath player score
    for (i = 0; i <= leaderBoard.length - 1; i++) {
      let lastIndexSmaller = true;
      if (playerScore > leaderBoard[i].score) {
        lastIndexSmaller = true;
      } else if (playerScore <= leaderBoard[i].score) {
        // if previous check was greater than, splice player's name and score into that last checked index
        // and remove the last index of leaderBoard array to bring total length back to 10
        if ((lastIndexSmaller = true)) {
          leaderBoard.splice(1, 0, { name: inputName, score: playerScore });
          console.log(leaderBoard);
          //remove last index of array
          leaderBoard.splice(leaderBoard.length - 1, 1);
          console.log(leaderBoard);
          return true;
        } else {
          // in this instance something went terribly wrong. log for testing but just add new score
          // to first index (after sort this will be the lowest score) of array.
          leaderBoard[0] = { name: inputName, score: playerScore };
        }
      }
    }
  }
  // If not, just add to the bottom of the list
  else {
    leaderBoard.push({ name: inputName, score: playerScore });
  }
  saveScores();
};

var displayleaderBoard = function (submittedScore) {
  // displays leaderBoard to the screen
  let container = listEl;
  let leaderBoardEl = document.createElement("ul");

  // set attributes
  leaderBoardEl.setAttribute("id", "answers leaderBoard");

  // add unordered list to screen to be populated with the loop
  container.appendChild(leaderBoardEl);

  // I wanted to properly sort all the high scores by value so
  // the leaderboard was sorted properly, but having the property
  // stored as a key value in an object made sorting it much
  // more difficult and I ran out of time. V2 maybe!

  // loop through the array of scores and display them
  for (i = 0; i <= leaderBoard.length - 1; i++) {
    let listItemEl = document.createElement("li");
    let nameItemEl = document.createElement("h3");
    let scoreItemEl = document.createElement("h3");

    listItemEl.className = "answer-button";
    listItemEl.setAttribute("id", "leaderBoardItem");
    nameItemEl.setAttribute("id", "leaderBoardText");
    nameItemEl.className = "leaderBoardText";
    scoreItemEl.setAttribute("id", "leaderBoardScore");
    scoreItemEl.className = "leaderBoardText";

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
  if (submittedScore) {
    form.remove();
  }
};

//Startup logic

//Load any scores saved to local storage
loadScores();

// create and add event listener to answers ID elements
let btnClickListener = listEl;

btnClickListener.addEventListener("click", function () {
  let target = event.target;
  if (event.target.matches("#begin")) {
    if (document.querySelector("ul")) {
      // remove leaderBoard if currently displaying
      let leaderBoardEl = document.querySelector("ol");
      leaderBoardEl.removeChild(document.querySelector("ul"));
    }
    beginQuiz();
  } else if (target.matches(".answer-button")) {
    evaluateAnswer(+target.id.replace(/\D+/g, ""));
  } else if (target.matches("#submit-name")) {
    // Save high score to array and display high scores
    addToleaderBoard(document.getElementById("textForm").value, score);
    saveScores();
    removeAllButtons();
    displayleaderBoard(true);
  }
});

// create and add event lister for "view high scores" element
let highScoreListener = document.querySelector(".high-scores");

highScoreListener.addEventListener("click", function () {
  removeAllButtons();
  displayleaderBoard(false);
});
