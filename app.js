let questionElement=document.querySelector(".question");
let ourForm=document.querySelector(".our-form");
let ourField=document.querySelector(".our-field");
let pointsNeeded=document.querySelector(".points-needed");
let mistakesAllowed=document.querySelector(".mistakes-allowed");
let progressBar=document.querySelector(".progress-inner");
let endMessage=document.querySelector(".end-message");
let restartGameBtn=document.querySelector(".restart-game");


let state={
    score:0,
    wrongAnswers:0,
    // currentQuestion:generateQuestions()
}

function generateRandomNumber(maxVal)
{
    return Math.floor(Math.random()*(maxVal+1));
}

function generateQuestions()
{
    return {
        num1:generateRandomNumber(10),
        num2:generateRandomNumber(10),
        operator:["+","-","x"][generateRandomNumber(2)]

    }
}

function updateProblem()
{
    state.currentQuestion=generateQuestions() //Storing the current question displayed on the screen in memory named "state"
    questionElement.innerHTML=`${state.currentQuestion.num1} ${state.currentQuestion.operator} ${state.currentQuestion.num2}`
    ourField.focus()

}

updateProblem()

ourForm.addEventListener("submit",function(e)
{
    e.preventDefault();
    let correctAnswer;

    if(state.currentQuestion.operator=="+") correctAnswer=state.currentQuestion.num1+state.currentQuestion.num2;
    if(state.currentQuestion.operator=="-") correctAnswer=state.currentQuestion.num1-state.currentQuestion.num2;
    if(state.currentQuestion.operator=="x") correctAnswer=state.currentQuestion.num1*state.currentQuestion.num2;

    if(parseInt(ourField.value)==correctAnswer)
    {
        state.score++;
        pointsNeeded.textContent=10-state.score;
        updateProblem();
        ourField.value=""
        ourField.focus()
       renderProgressBar()

    }else{
         state.wrongAnswers++;
         mistakesAllowed.textContent=2-state.wrongAnswers;
         questionElement.classList.add("animate-wrong");
         setTimeout(()=>questionElement.classList.remove("animate-wrong"),451)
         ourField.value=""
         ourField.focus()
    }
    winOrLose()
})

function winOrLose()
{
    if(state.score==10)
    {
        endMessage.textContent=`Congrats, You Won!`;
        document.body.classList.add("overlay-is-open");
        setTimeout(()=>{restartGameBtn.focus()},331)
        
    }

    if(state.wrongAnswers==3)
    {
        endMessage.textContent=`Sorry, You Lost!`;
        document.body.classList.add("overlay-is-open");
        setTimeout(()=>{restartGameBtn.focus()},331)
        
    }
}
restartGameBtn.addEventListener("click",restartGame);

function restartGame()
{
    document.body.classList.remove("overlay-is-open");
    updateProblem();
    state.score=0;
    state.wrongAnswers=0;
    renderProgressBar()
    ourField.focus()
    pointsNeeded.textContent=10;
    mistakesAllowed.textContent=2;
}

function renderProgressBar()
{
    progressBar.style.transform=`scaleX(${state.score/10})`
}