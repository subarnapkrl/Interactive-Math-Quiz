let questionElement=document.querySelector(".question");
let ourForm=document.querySelector(".our-form")

let state={
    score:0,
    wrongAnswers:0,
    currentQuestion:generateQuestions()
}

function generateRandomNumber(maxVal)
{
    return Math.floor(Math.random()*(maxVal+1))
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
    // state.currentQuestion=generateQuestions() //Storing the current question displayed on the screen in memory named "state"
    questionElement.innerHTML=`${state.currentQuestion.num1} ${state.currentQuestion.operator} ${state.currentQuestion.num2}`

}

updateProblem()

ourForm.addEventListener("submit",function(e)
{
    e.preventDefault();
})