const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { text: "Shark", correct: false },
            { text: "Blue Whale", correct: true },
            { text: "Giraffe", correct: false },
            { text: "Elephant", correct: false }
        ]
    },
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Paris", correct: true },
            { text: "Rome", correct: false }
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Saturn", correct: false }
        ]
    },
    {
        question: "What is the boiling point of water?",
        answers: [
            { text: "90°C", correct: false },
            { text: "100°C", correct: true },
            { text: "110°C", correct: false },
            { text: "120°C", correct: false }
        ]
    },
    {
        question: "Who wrote 'Hamlet'?",
        answers: [
            { text: "Charles Dickens", correct: false },
            { text: "William Shakespeare", correct: true },
            { text: "Jane Austen", correct: false },
            { text: "Mark Twain", correct: false }
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answers: [
            { text: "Asia", correct: false },
            { text: "Australia", correct: true },
            { text: "Europe", correct: false },
            { text: "Antarctica", correct: false }
        ]
    }
];

// DOM Elements
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timerElement = document.getElementById("timer");
const progressBar = document.getElementById("progressBar");

// State Variables
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10;
let timer;

// Start the Quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 10;
    nextButton.innerHTML = "Next";
    progressBar.value = 0;
    showQuestion();
}

// Show Current Question
function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });

    updateProgressBar(); // Update progress
    startTimer(); // Start the timer
}

// Reset the State for the Next Question
function resetState() {
    nextButton.style.display = "none";
    clearInterval(timer); // Stop previous timer
    timeLeft = 10; // Reset time for the new question
    timerElement.innerHTML = `Time Left: ${timeLeft}s`;

    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

// Timer Functionality
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerElement.innerHTML = `Time Left: ${timeLeft}s`;

        if (timeLeft === 0) {
            clearInterval(timer);
            showCorrectAnswer(); // Show correct answer when time is up
            nextButton.style.display = "block";
        }
    }, 1000);
}

// Show the Correct Answer After Timer or Selection
function showCorrectAnswer() {
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        } else {
            button.classList.add("incorrect");
        }
        button.disabled = true;
    });
}

// Handle User Answer Selection
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    showCorrectAnswer(); // Show correct answer after selection
    clearInterval(timer); // Stop timer when user selects
    nextButton.style.display = "block"; // Show next button
}

// Show Final Score
function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

// Update Progress Bar
function updateProgressBar() {
    let progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.value = progressPercent;
}

// Handle Next Button Click
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

// Event Listeners
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

// Start the Quiz on Page Load
startQuiz();
