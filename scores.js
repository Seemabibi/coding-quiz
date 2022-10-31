var scoresheet = document.getElementById("scoresheet")
var BackToQuiz = document.getElementById("BackToQuiz")

function onBackToQuiz () {
      window.location.href = 'index.html';
}

for (var i = 0; i <localStorage.length; i++) {

    var initials = localStorage.key(i);
    var score = localStorage.getItem(initials);
    var result = document.createElement("div");
    result.classList.add('result');

     result.innerHTML= '<div class='score-item'>${initials}</div> 
     <div class='score-item'>$(score)</div>

     scoresheet.appendChild(result);
}

BackToQuiz.addEventListener("click", onBackToQuiz)