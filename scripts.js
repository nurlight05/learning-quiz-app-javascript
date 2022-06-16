const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const resultsButton = document.getElementById('results-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const resultsContainerElement = document.getElementById('results-container')
const resultElement = document.getElementById('result')
const correctAnswersElement = document.getElementById('correct-answers')
const allAnswersElement = document.getElementById('all-answers')

let shuffledQuestions, currentQuestionIndex
let score, total

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})
resultsButton.addEventListener('click', showResults)

function startGame() {
    console.log('Started')
    score = 0
    startButton.classList.add('hide')
    resultsContainerElement.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function showResults() {
    clearStatusClass(document.body)

    total = Math.floor(score * 100 / questions.length)
    resultElement.innerText = `${total}%`
    correctAnswersElement.innerText = score
    allAnswersElement.innerText = questions.length

    resultsContainerElement.classList.remove('hide')
    questionContainerElement.classList.add('hide')
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
    resultsButton.classList.add('hide')
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct

    if (correct) score++
    disableAnswerButtons()

    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        resultsButton.classList.remove('hide')
    }
}

function disableAnswerButtons() {
    Array.from(answerButtonsElement.children).forEach(button => {
        button.removeEventListener('click', selectAnswer)
    })
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: 'What is 2 + 2?',
        answers: [
            { text: '4', correct: true },
            { text: '22', correct: false },
            { text: '5', correct: false },
        ]
    },
    {
        question: 'What is 4 + 4?',
        answers: [
            { text: '8', correct: true },
            { text: '12', correct: false },
            { text: '16', correct: false },
            { text: '2', correct: false },
        ]
    }
]