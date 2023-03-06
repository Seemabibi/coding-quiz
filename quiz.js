
  var highScores = document.getElementById("highScores");
  var highScoreList = document.getElementById("highScoreList");
  

  var startQuiz = document.getElementById("startQuiz");
  var currentScore = document.getElementById("currentScore");
  var question = document.getElementById("question");
  var option = document.getElementById("option");
  var message = document.getElementById("message");
  

  var results = document.getElementById("results");
  var viewScores = document.getElementById("viewScores");
  var submit = document.getElementById("submit");
  var welcome = document.getElementById("welcome");
  var initials = document.getElementById("initials");
  var finalScore = document.getElementById("finalScore");
  var playAgain = document.getElementById("play-again");
  

  var timer = document.getElementById("timer");
  
  //Setting variables to 0 for start
  var secondsLeft = 0;
  var currentScore = 0;
  var currentQuestionIndex = 0;
  var countDownTimer;
  results.style.display = "none";
  highScoreList.style.display = "none";
  timer.textContent = ""
  

  //clear coundown timer to stop game
  function stopGame() {
    clearInterval(countDownTimer);
  

    timer.textContent = "";
  

    quiz.style.display = "none";
    welcome.style.display = "none";
    results.style.display = "";
  

    finalScore.textContent = currentScore;
  }
  

  function updateTimer() {
    timer.textContent = secondsLeft + " seconds left";
  

    if (secondsLeft <= 0) {
      stopGame();
    }
  }
  

  //Function to begin the game
  function startGame() {
    secondsLeft = 60;
    currentQuestionIndex = 0;
    currentScore = 0;
  

    //Start the timer countdown
    updateTimer();
    countDownTimer = setInterval(function () {
      secondsLeft--;
      updateTimer();
    }, 1000);
  

    //hiding the last section and first section
    welcome.style.display = "none";
    results.style.display = "none";
    quiz.style.display = "";
  

    displayQuestion();
  }
  

  function viewHighScore() {
    //hide uneccessary stuff
    welcome.style.display = "none";
    quiz.style.display = "none";
  }
  

  //display question function
  

  function displayQuestion() {
    //have we run out of questions?
    if (currentQuestionIndex >= questions.length) {
      stopGame();
      return;
    }
  

    //load question from the question array
    var question = questions[currentQuestionIndex];
    document.getElementById("question").textContent =
      currentQuestionIndex + 1 + ". " + question.title;
  

    //clear any existing options from prev question
  

    option.innerHTML = "";
  

    //adding the button to HTML
    for (i = 0; i < question.choices.length; i++) {
      createButton(question.choices[i]);
    }
  }
  //function to create button and add event listener
  function createButton(text) {
    var button = document.createElement("button");
    button.textContent = text;
    option.appendChild(button);
    button.addEventListener("click", handleAnswerClick);
  }
  

  //
  function handleAnswerClick(event) {
    var button = event.target;
  

    //what button was clicked
    var selectedAnswer = button.textContent;
  

    //what was the correct answer
    var currentQuestion = questions[currentQuestionIndex];
  

    var currentAnswer = currentQuestion.answer;
  

    //compare  selectred response to correct answer
    if (currentAnswer === selectedAnswer) {
      // - dispaly "correct"
      displayMessage("Correct!");
  

      //add point to score
      currentScore += 10;
  

      setTimeout(function () {
        message.textContent = " ";
      }, 1000);
    } else {
      // - display "wrong"
      displayMessage("Wrong :(");
  

      //- deduct 10s from timer
      secondsLeft -= 10;
  

      if (secondsLeft < 0) {
        secondsLeft = 0;
      }
  

      updateTimer();
  

      //make the message go away after 1s
      setTimeout(function () {
        message.textContent = " ";
      }, 1000);
    }
  

    //increiment the next question
    currentQuestionIndex++;
  

    //loading in next answers and question
    displayQuestion();
  }
  

  //create a function to save the results
  

  function displayMessage(responseMessage) {
    message.textContent = responseMessage;
  }
  

  function saveScore() {
    //get the name and save into a variable
    var initial = initials.value;
    
    // create an empty array for scores
    var scores = [];
  

    // retrieves the scores from local storage
    var existingScoresJson = localStorage.getItem("score");
  

    if (existingScoresJson !== null) {
      scores = JSON.parse(existingScoresJson);
    }
  

    scores.push({
      name: initial,
      score: currentScore,
    });
  

    // save the JSON string of score to local storage under key score
    localStorage.setItem("score", JSON.stringify(scores));
  

    getHighScores();
  }
  

  function getHighScores() {
    //clear ui
    highScoreList.innerHTML = "";
  

    //display new score
    var score = JSON.parse(localStorage.getItem("score"));
   
  //sorts scores from highest to lowesst
    var sortedScores = score.sort((a, b) => b.score - a.score);
  

  

    // save top 5 scores to local storage
    sortedScores.splice(5);
  

    //stores top 5 scores into local storage 
    localStorage.setItem("topScores", JSON.stringify(sortedScores));
  

    
  //retrieve from local storage
  var topScores = JSON.parse(localStorage.getItem("topScores"));
  

  //mapping top scores into HTML
    highScoreList.innerHTML = topScores
      .map((score) => {
        return `<span>${score.name} - ${score.score}</span>`;
      }).join("");
    
    highScoreList.style.display = "block"
    
  }
  

  startQuiz.addEventListener("click", startGame);
  highScores.addEventListener("click", getHighScores);
  submit.addEventListener("click", saveScore);
  playAgain.addEventListener("click", startGame)
