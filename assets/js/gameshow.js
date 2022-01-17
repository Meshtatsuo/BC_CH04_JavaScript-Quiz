// question object contains question, all answers, and index of correct answer
let question = {
  qText: "",
  qAns1: "",
  qAns2: "",
  qAns3: "",
  qAns4: "",
  correctIndex: 1,
};

// list of questions
let questionList = [];

// FUNCTIONS

let beginQuiz = function () {
  removeAllButtons();
};

let removeAllButtons = function () {
  // Remove all buttons from ordered list
};
// On load execute
document.querySelector(".answer-button").click(beginQuiz());
console.log("hello");
