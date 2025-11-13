// --- Global Variables ---
let score = 0;
let time = 30; // Game duration in seconds
let correctAnswer = 0;
let timerInterval;

// --- DOM Elements ---
const scoreDisplay = document.getElementById('score');
const timeLeftDisplay = document.getElementById('time-left');
const questionDisplay = document.getElementById('question');
const answerInput = document.getElementById('answer-input');
const submitButton = document.getElementById('submit-button');
const feedbackDisplay = document.getElementById('feedback');
const gameOverScreen = document.getElementById('game-over-screen');
const gameArea = document.querySelector('.game-area');
const finalScoreDisplay = document.getElementById('final-score');
const restartButton = document.getElementById('restart-button');

// --- Core Functions ---

/**
 * 1. Generates a new random addition question.
 * - Uses JavaScript to generate random numbers.
 * - Stores the correct answer.
 * - Updates the question element.
 */
function generateQuestion() {
    // Generate two random numbers between 1 and 10 (inclusive)
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    
    // Simple Addition (The core math operation)
    correctAnswer = num1 + num2;
    
    // Update the question display
    questionDisplay.textContent = `${num1} + ${num2} = ?`;
    
    // Clear the input and focus for quick answering
    answerInput.value = '';
    answerInput.focus();
}

/**
 * 2. Checks the user's answer against the correct answer.
 * - Checks whether the answer is correct.
 * - Updates the score and feedback (Correct / Wrong).
 * - Updates some form of score, progress, or result.
 */
function checkAnswer() {
    const userAnswer = parseInt(answerInput.value);
    
    // Basic input validation
    if (isNaN(userAnswer)) {
        feedbackDisplay.textContent = "Please enter a valid number!";
        feedbackDisplay.className = 'feedback wrong';
        return;
    }
    
    // Check if the answer is correct
    if (userAnswer === correctAnswer) {
        // Correct Answer Logic
        score += 5; // Increase score
        feedbackDisplay.textContent = '✅ Correct! (+5 points)';
        feedbackDisplay.className = 'feedback correct';
    } else {
        // Wrong Answer Logic
        feedbackDisplay.textContent = `❌ Wrong. Answer: ${correctAnswer}.`;
        feedbackDisplay.className = 'feedback wrong';
    }

    // Update the score display
    scoreDisplay.textContent = score;

    // Generate the next question immediately
    generateQuestion();

    // Clear feedback after a short delay
    setTimeout(() => {
        feedbackDisplay.textContent = '';
        feedbackDisplay.className = 'feedback';
    }, 1500);
}

/**
 * 3. Manages the game timer and calls endGame when time runs out.
 */
function startTimer() {
    // Clear any existing timer before starting a new one
    clearInterval(timerInterval); 
    
    timerInterval = setInterval(() => {
        time--;
        timeLeftDisplay.textContent = time;

        if (time <= 0) {
            endGame();
        }
    }, 1000); // 1000ms = 1 second
}

/**
 * 4. Ends the game.
 */
function endGame() {
    clearInterval(timerInterval);
    
    // Hide game area, show game over screen
    gameArea.classList.add('hidden');
    gameOverScreen.classList.remove('hidden');
    
    // Display final score
    finalScoreDisplay.textContent = score;
    
    // Disable input and button to prevent further attempts
    submitButton.disabled = true;
    answerInput.disabled = true;
}

/**
 * 5. Initializes or restarts the game.
 */
function startGame() {
    // Reset state
    score = 0;
    time = 30;
    scoreDisplay.textContent = score;
    timeLeftDisplay.textContent = time;
    
    // Reset screen visibility
    gameArea.classList.remove('hidden');
    gameOverScreen.classList.add('hidden');
    
    // Enable input and button
    submitButton.disabled = false;
    answerInput.disabled = false;
    
    // Start fresh
    generateQuestion();
    startTimer();
}


// --- Event Listeners ---

// 1. Handle the submit button click
submitButton.addEventListener('click', checkAnswer);

// 2. Handle the Enter key press in the input field for faster gameplay
answerInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' && time > 0) {
        checkAnswer();
    }
});

// 3. Handle the restart button click
restartButton.addEventListener('click', startGame);


// --- Game Start ---
// Start the game when the page loads
startGame();
