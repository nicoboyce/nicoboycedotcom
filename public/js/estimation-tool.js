class PirateEstimationGame {
    constructor() {
        this.timeRemaining = 60;
        this.score = 0;
        this.currentChallenge = null;
        this.gameActive = false;
        this.timer = null;
        this.challengeNumber = 0;

        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');

        this.setupEventListeners();
        this.showWelcomeMessage();
    }

    setupEventListeners() {
        document.getElementById('start-game').addEventListener('click', () => this.startGame());
        document.getElementById('submit-answer').addEventListener('click', () => this.submitAnswer());
        document.getElementById('new-challenge').addEventListener('click', () => this.nextChallenge());
        document.getElementById('answer-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.submitAnswer();
        });
    }

    showWelcomeMessage() {
        document.getElementById('challenge-text').innerHTML =
            '<p>🏴‍☠️ Ahoy matey! Ready to test your estimation skills?</p>' +
            '<p>Quick thinking beats precise counting - trust your instincts!</p>';
        this.clearCanvas();
    }

    startGame() {
        this.gameActive = true;
        this.timeRemaining = 60;
        this.score = 0;
        this.challengeNumber = 0;
        this.updateDisplay();
        this.startTimer();
        this.nextChallenge();

        document.getElementById('start-game').style.display = 'none';
        document.getElementById('answer-input').style.display = 'inline-block';
        document.getElementById('submit-answer').style.display = 'inline-block';
        document.getElementById('new-challenge').style.display = 'inline-block';
    }

    startTimer() {
        this.timer = setInterval(() => {
            this.timeRemaining--;
            this.updateDisplay();

            if (this.timeRemaining <= 0) {
                this.endGame();
            }
        }, 1000);
    }

    updateDisplay() {
        document.getElementById('time-remaining').textContent = this.timeRemaining;
        document.getElementById('current-score').textContent = this.score;
    }

    nextChallenge() {
        if (!this.gameActive) return;

        this.challengeNumber++;
        this.currentChallenge = this.generateChallenge();
        this.displayChallenge();
        document.getElementById('answer-input').value = '';
        document.getElementById('answer-input').focus();
        document.getElementById('feedback').textContent = '';
    }

    generateChallenge() {
        // Progressive difficulty based on challenge number
        if (this.challengeNumber <= 3) {
            return this.generateEasyChallenge();
        } else if (this.challengeNumber <= 6) {
            return this.generateMediumChallenge();
        } else {
            return this.generateHardChallenge();
        }
    }

    generateEasyChallenge() {
        const easyScenarios = [
            {
                question: "8 treasure chests to split between 4 pirates. How many chests each?",
                answer: 2,
                tolerance: 0
            },
            {
                question: "15 gold coins split between 3 crew members. About how many each?",
                answer: 5,
                tolerance: 1
            },
            {
                question: "The ship sailed 47 miles. About how far to the nearest 10?",
                answer: 50,
                tolerance: 10
            },
            {
                question: "We have 23 barrels of rum. About how many tens is that?",
                answer: 2,
                tolerance: 0
            },
            {
                question: "3 bags with about 20 coins each. Roughly how many total?",
                answer: 60,
                tolerance: 10
            },
            {
                question: "We need 4 trips, each takes about 15 minutes. About how long total?",
                answer: 60,
                tolerance: 10
            }
        ];

        const scenario = easyScenarios[Math.floor(Math.random() * easyScenarios.length)];
        return {
            type: 'captain',
            ...scenario
        };
    }

    generateMediumChallenge() {
        const mediumScenarios = [
            {
                question: "50 crew, each needs 10 biscuits daily, 7 days to port. Biscuits come in boxes of 100. How many boxes?",
                answer: 35,
                tolerance: 5
            },
            {
                question: "We have 200 barrels of water, crew of 40, each drinks 3 barrels per week. How many weeks will it last?",
                answer: 17,
                tolerance: 3
            },
            {
                question: "Enemy ship fires every 30 seconds, battle lasts 8 minutes. About how many cannonballs will they fire?",
                answer: 16,
                tolerance: 3
            },
            {
                question: "Each chest holds about 500 gold coins, we've captured 7 chests. Roughly how much gold?",
                answer: 3500,
                tolerance: 500
            },
            {
                question: "Storm approaching at 15mph, we're 60 miles away. How long until it hits?",
                answer: 4,
                tolerance: 1
            },
            {
                question: "Island is 120 miles away, we sail at 8mph. About how many hours voyage?",
                answer: 15,
                tolerance: 3
            }
        ];

        const scenario = mediumScenarios[Math.floor(Math.random() * mediumScenarios.length)];
        return {
            type: 'captain',
            ...scenario
        };
    }

    generateHardChallenge() {
        const hardScenarios = [
            {
                question: "King's fleet 200 miles behind, their ships 5mph faster than ours at 12mph. How many hours until they catch us?",
                answer: 40,
                tolerance: 8
            },
            {
                question: "Port Royal has 5,000 people. About how many meals get eaten there per day?",
                answer: 15000,
                tolerance: 5000
            },
            {
                question: "847 gold coins between 7 pirates. About how much each?",
                answer: 121,
                tolerance: 20
            },
            {
                question: "Each pirate eats 3 meals daily. 12 pirates for a 25-day voyage. About how many meals needed?",
                answer: 900,
                tolerance: 100
            },
            {
                question: "If we capture 3 ships per month, each worth about 400 gold, roughly how much in a year?",
                answer: 14400,
                tolerance: 2000
            },
            {
                question: "Lookout duty: 4 shifts daily, 3 pirates per shift, 20-day voyage. How many duty assignments?",
                answer: 240,
                tolerance: 30
            }
        ];

        const scenario = hardScenarios[Math.floor(Math.random() * hardScenarios.length)];
        return {
            type: 'captain',
            ...scenario
        };
    }

    displayChallenge() {
        const difficultyText = this.challengeNumber <= 3 ? "Easy" :
                              this.challengeNumber <= 6 ? "Medium" : "Hard";

        document.getElementById('challenge-text').innerHTML =
            `<p><em>Challenge ${this.challengeNumber} (${difficultyText})</em></p>
             <p><strong>${this.currentChallenge.question}</strong></p>`;

        this.clearCanvas();
        this.drawCaptainScene();
    }

    clearCanvas() {
        this.ctx.fillStyle = '#e6ddd4';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawCaptainScene() {
        this.clearCanvas();

        // Draw simple pirate ship scene
        this.ctx.fillStyle = '#654321';
        this.ctx.font = '48px Georgia';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('🏴‍☠️', this.canvas.width / 2, this.canvas.height / 2 - 40);

        this.ctx.font = '24px Georgia';
        this.ctx.fillText('Captain\'s Decision', this.canvas.width / 2, this.canvas.height / 2 + 20);

        this.ctx.font = '16px Georgia';
        this.ctx.fillText('Think like a pirate captain!', this.canvas.width / 2, this.canvas.height / 2 + 50);
    }

    submitAnswer() {
        if (!this.gameActive || !this.currentChallenge) return;

        const userAnswer = parseInt(document.getElementById('answer-input').value);
        if (isNaN(userAnswer)) {
            document.getElementById('feedback').textContent = 'Please enter a number, matey!';
            return;
        }

        const correct = this.currentChallenge.answer;
        const tolerance = this.currentChallenge.tolerance;
        const diff = Math.abs(userAnswer - correct);

        let feedback, timeBonus;

        if (diff === 0) {
            feedback = '🎯 Perfect! Right on target!';
            timeBonus = 30;
        } else if (diff <= tolerance) {
            feedback = '⭐ Great estimate! Close enough!';
            timeBonus = 15;
        } else if (diff <= tolerance * 2) {
            feedback = '👍 Not bad! Getting warmer...';
            timeBonus = 5;
        } else {
            feedback = '💥 Way off course! The answer was ' + correct;
            timeBonus = 0;
        }

        this.timeRemaining += timeBonus;
        this.score += timeBonus;

        document.getElementById('feedback').innerHTML =
            `<div style="color: ${timeBonus > 10 ? 'green' : timeBonus > 0 ? 'orange' : 'red'}">${feedback}</div>
             <div>+${timeBonus} seconds! Answer was ${correct}</div>`;

        setTimeout(() => this.nextChallenge(), 2000);
    }

    endGame() {
        this.gameActive = false;
        clearInterval(this.timer);

        let encouragementMessage;
        if (this.score === 0) {
            encouragementMessage = "Don't be shy, matey! Try answering some questions next time - even rough guesses earn you points!";
        } else if (this.score < 50) {
            encouragementMessage = "Not bad for a landlubber! Keep practising those estimation skills!";
        } else if (this.score < 150) {
            encouragementMessage = "Well done, Captain! Your estimation skills are improving!";
        } else {
            encouragementMessage = "Incredible work, Admiral! You're a true estimation master!";
        }

        document.getElementById('challenge-text').innerHTML =
            `<h3>🏴‍☠️ Game Over! 🏴‍☠️</h3>
             <p>Final Score: ${this.score} seconds</p>
             <p>${encouragementMessage}</p>`;

        this.clearCanvas();
        document.getElementById('feedback').textContent = '';
        document.getElementById('start-game').style.display = 'inline-block';
        document.getElementById('answer-input').style.display = 'none';
        document.getElementById('submit-answer').style.display = 'none';
        document.getElementById('new-challenge').style.display = 'none';
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PirateEstimationGame();
});