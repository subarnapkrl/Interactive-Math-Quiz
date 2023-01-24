let questionElement=document.querySelector(".question");
let ourForm=document.querySelector(".our-form");
let ourField=document.querySelector(".our-field");
let pointsNeeded=document.querySelector(".points-needed");
let mistakesAllowed=document.querySelector(".mistakes-allowed")

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

    }else{
         state.wrongAnswers++;
         mistakesAllowed.textContent=2-state.wrongAnswers;
    }
})