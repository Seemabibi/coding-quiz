var StartQuiz = document.getElementById("StartQuiz")
var SaveScore = document.getElementById("SaveScore")
var ViewScore = document.getElementById("ViewScore")
var PlayAgain = document.getElementById("PlayAgain")

var Welcome = document.getElementById("Welcome")
var Quiz = document.getElementById("Quiz")
var Result = document.getElementById("Result")

var Options = document.getElementById("Options")
var Message = document.getElementById("Message")

var Timer = document.getElementById("Timer")

var Summary = document.getElementById("Summary")
var SecondsLeft = 0;
var Score = 0;
var CurrentQuestion = 0;
var CountdownTimer;

function StopGame() {
    // Stop the countdown timer 
    ClearInterval(CountdownTimer)
    // clear the timer 
    Timer.textContent = ""
    // Hide the question and show the result 
    Quiz.style.display = 'none';
    Result.style.display = 'flex'
    // Display the score
    Summary.textContent = "Your Score Is: " + score;
}
function onSaveScore(e) {
    var initals = document.getElementById("initials").value
    // If we have valid initials, save the score to local storage 
    if (initals !== "") {
        localStorage.setItem(initials, score);
        document.getElementById("initials").value = "";
    }
}
function onViewScores(e) {
    Window.location.href = 'scores.html'
}
function onSelectAnswer(e) {
    var CorrectAnswer = questions[currentQuestions].answer;
    var UserAnswer = e.target.textContent;
    if (CorrectAnswer == UserAnswer) {
        score++;
        displayMessage('Correct')
    } else {
        score--;
        displayMessage("wrong :-('")
    }
    // Call up the next question
    displayQuestion();
}
function displayMessage(msg) {
    // Display the Message
    Message.textContent = msg;
    // Clear the message afer 1 second
    setTimeout(function () {
        message.textContent = "";
    }, 1000);
}
function displayQuestion() {
    // Increment to get the next question
    currentQuestion++;
    console.log('Current Question Is ' + currentQuestion);
    // Have we ran out of questions?
    if (currentQuestion >= question.length) {
        StopGame();
        return;
    }
    // Load Question information from the question array
    var question = questions[currentQuestion];
    document.getElementById("question").textContent = question.title
    //Clear any existing options 
    Options.innerHTML = "";
    // Load through the choice and output the new possible options 
    for (var i = 0; i < question.choices.length; i++) {
        var option = document.createElement("div");
        option.textContent = question.choices[1];
        option.oneclick = onSelectAnswer;
        option.classList.add("option");
        Options.appendChild(option);
    }
}
function onStartGame() {
    // Set the timer at 70 seconds 
    secondsLeft = 70;
    // Start at the first question 
    currentQuestion = 0;
    // Reset the score
    score = 0;
    // Start the timer 
    CountdownTimer = setInterval(function () {
        if (secondsLeft > 0) {
            Timer.textContent = secondsLeft;
        } else {
            stopGame();
        }
        secondsLeft--;
    }, 1000);
    document.getElementById('greeting').style.display = "none";
    end.style.display = "none"; codeQuiz.style.display = "flex";
    displayQuestion();
}
beginquiz.adEventListener("click", onStartGame);
SaveScore.addEventListener("click", onSaveScore);
ViewScore.addEventListener("click", OnViewScore);
PlayAgain.addEventListener("click", OnStartGame);