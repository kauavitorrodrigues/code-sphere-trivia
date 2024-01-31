// INITIAL DATA
let currentQuestion = 0 // Question number 
let correctAnswers = 0 // Corrected questions number

let progressBar = document.querySelector('.progress--bar') // Progress bar element

// Questions elements
let questionArea = document.querySelector('.questionArea')
let questionTittle = document.querySelector('.question')
let questionOption = document.querySelector('.options')

// Final score elements
let scoreArea = document.querySelector('.scoreArea')
let scoreTittle = document.querySelector('.scoreText1')
let scorePct = document.querySelector('.scorePct')
let scoreText = document.querySelector('.scoreText2')

/**
 * Displays the current question and updates the progress bar.
 * If there are more questions, it prepares the question interface.
 * If no more questions, it calls finishQuiz to display the final score.
 */
function showQuestion() {

    if(questions[currentQuestion]) {

        let questionDATA = questions[currentQuestion]

        // Calculate and update progress bar width
        let barPct = Math.floor((currentQuestion / questions.length) * 100)
        progressBar.style.width = `${barPct}%`

        // Hide final score and show question interface
        scoreArea.style.display = 'none'
        questionArea.style.display = 'block'

        // Display the current question
        questionTittle.innerHTML = questionDATA.question

        // Generate HTML for question options
        let optionsHTML = ''
        for(i in questionDATA.options) {
            optionsHTML += `<div data-op=${i} class="option"><span>${parseInt(i) + 1}</span>${questionDATA.options[i]}</div>`
        }
        questionOption.innerHTML = optionsHTML

        // Add click event listener to each option
        document.querySelectorAll('.option').forEach(item => {
            item.addEventListener('click', verifyOption)
        })

    } else {
        finishQuiz()
    }

}

/**
 * Verifies the selected option and updates the correctAnswers count.
 * Advances to the next question by calling showQuestion.
 * @param {Event} event - The click event on the option.
 */
function verifyOption(event) {

    let clickedOption = parseInt(event.target.getAttribute('data-op'))

    // Check if the selected option is correct
    if(questions[currentQuestion].answer === clickedOption) {
        correctAnswers++
    }

    // Move to the next question
    currentQuestion++
    showQuestion()

}

/**
 * Displays the final quiz score, including title, percentage, and additional text.
 * Adds a click event listener to the restart button.
 */
function finishQuiz() {

    // Calculate percentage of correct answers
    let points = Math.floor((correctAnswers / questions.length) * 100)

    // Adjust progress bar to full width
    progressBar.style.width = `100%`

    // Show final score and hide question interface
    scoreArea.style.display = 'block'
    questionArea.style.display = 'none'

    // Determine score title based on correctAnswers
    if(correctAnswers < 3) {
        scoreTittle.innerHTML = `Não foi dessa vez`
        scorePct.style.color = 'red'
    } else if(correctAnswers >= 3 && correctAnswers < 70) {
        scoreTittle.innerHTML = `Quase lá`
        scorePct.style.color = 'yellow'
    } else {
        scoreTittle.innerHTML = `Parabéns!`
    }
    
    // Display the percentage and additional text
    scorePct.innerHTML = `Acertou ${points}%`
    scoreText.innerHTML = `Você respondeu 10 questões e acertou ${correctAnswers}.`

    // Add click event listener to the restart button
    document.querySelector('.scoreArea button').addEventListener('click', restart)

}

/**
 * Restarts the quiz by resetting question counters and calling showQuestion.
 */
function restart() {
    currentQuestion = 0
    correctAnswers = 0
    showQuestion()
}

function showElements() {
    let headerEl = document.querySelector("header")
    let mainEl = document.querySelector("main")
    let footerEl = document.querySelector("footer")    

    setTimeout(() => {

        headerEl.style.opacity = '100%'
        mainEl.style.opacity = '100%'
        footerEl.style.opacity = '100%'
        showQuestion()
    }, 100)
}

// Initial display of the first question
showElements()
