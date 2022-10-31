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

function StopGame () {

    // Stop the countdown timer 
    ClearInterval (CountdownTimer)

    // clear the timer 
    Timer.textContent = ""

    // Hide the question and show the result 
    Quiz.style.display = 'none';
    Result.style.display = 'flex'

    // Display the score
    Summary.textContent = "Your Score Is: " + score;
}

function onSaveScore (e) {
    var initals = document.getElementById ("initials").value

    // If we have valid initials, save the score to local storage 
    if (initals !=="") {
        localStorage.setItem(initials, score);

        document.getElementById("initials").value = "";
    }
}

function onViewScores (e) {
     Window.location.href = 'scores.html'
}

function onSelectAnswer (e) {
    var CorrectAnswer = questions [currentQuestions].answer;
    var UserAnswer = e.target.textContent;
    
    if (CorrectAnswer == UserAnswer) {
        score++;

    displayMessage ('Correct')

    }
}

