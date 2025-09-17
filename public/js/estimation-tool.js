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
        const easyTemplates = [
            {
                template: "{chests} treasure chests to split between {pirates} pirates. How many chests each?",
                ranges: { chests: [6, 16], pirates: [2, 4] },
                calculate: (vars) => Math.floor(vars.chests / vars.pirates),
                tolerance: 1
            },
            {
                template: "{coins} gold coins split between {crew} crew members. About how many each?",
                ranges: { coins: [12, 24], crew: [3, 6] },
                calculate: (vars) => Math.round(vars.coins / vars.crew),
                tolerance: 1
            },
            {
                template: "The ship sailed {miles} miles. About how far to the nearest 10?",
                ranges: { miles: [23, 87] },
                calculate: (vars) => Math.round(vars.miles / 10) * 10,
                tolerance: 10
            },
            {
                template: "We have {barrels} barrels of rum. About how many tens is that?",
                ranges: { barrels: [15, 45] },
                calculate: (vars) => Math.floor(vars.barrels / 10),
                tolerance: 1
            },
            {
                template: "{bags} bags with about {coinsPerBag} coins each. Roughly how many total?",
                ranges: { bags: [3, 6], coinsPerBag: [15, 25] },
                calculate: (vars) => vars.bags * vars.coinsPerBag,
                tolerance: 15
            },
            {
                template: "We need {trips} trips, each takes about {minutes} minutes. About how long total?",
                ranges: { trips: [3, 8], minutes: [12, 25] },
                calculate: (vars) => vars.trips * vars.minutes,
                tolerance: 15
            }
        ];

        return this.generateFromTemplate(easyTemplates);
    }

    generateMediumChallenge() {
        const mediumTemplates = [
            {
                template: "{crew} crew, each needs {biscuits} biscuits daily, {days} days to port. Biscuits come in boxes of {boxSize}. How many boxes?",
                ranges: { crew: [30, 60], biscuits: [8, 12], days: [5, 10], boxSize: [80, 120] },
                calculate: (vars) => Math.ceil((vars.crew * vars.biscuits * vars.days) / vars.boxSize),
                tolerance: 5
            },
            {
                template: "We have {barrels} barrels of water, crew of {crew}, each drinks {weekly} barrels per week. How many weeks will it last?",
                ranges: { barrels: [150, 250], crew: [30, 50], weekly: [2, 4] },
                calculate: (vars) => Math.floor(vars.barrels / (vars.crew * vars.weekly)),
                tolerance: 3
            },
            {
                template: "Enemy ship fires every {seconds} seconds, battle lasts {minutes} minutes. About how many cannonballs will they fire?",
                ranges: { seconds: [20, 40], minutes: [6, 12] },
                calculate: (vars) => Math.floor((vars.minutes * 60) / vars.seconds),
                tolerance: 3
            },
            {
                template: "Each chest holds about {coinsPerChest} gold coins, we've captured {chests} chests. Roughly how much gold?",
                ranges: { coinsPerChest: [400, 600], chests: [5, 9] },
                calculate: (vars) => vars.coinsPerChest * vars.chests,
                tolerance: 500
            },
            {
                template: "Storm approaching at {stormSpeed}mph, we're {distance} miles away. How long until it hits?",
                ranges: { stormSpeed: [12, 18], distance: [40, 80] },
                calculate: (vars) => Math.round(vars.distance / vars.stormSpeed),
                tolerance: 2
            },
            {
                template: "Island is {distance} miles away, we sail at {speed}mph. About how many hours voyage?",
                ranges: { distance: [80, 160], speed: [6, 12] },
                calculate: (vars) => Math.round(vars.distance / vars.speed),
                tolerance: 3
            }
        ];

        return this.generateFromTemplate(mediumTemplates);
    }

    generateHardChallenge() {
        const hardTemplates = [
            {
                template: "King's fleet {distance} miles behind, their ships {advantage}mph faster than ours at {ourSpeed}mph. How many hours until they catch us?",
                ranges: { distance: [150, 300], advantage: [3, 7], ourSpeed: [8, 15] },
                calculate: (vars) => Math.round(vars.distance / vars.advantage),
                tolerance: 8
            },
            {
                template: "Port {portName} has {population} people. About how many meals get eaten there per day?",
                ranges: { population: [3000, 8000] },
                calculate: (vars) => vars.population * 3,
                tolerance: 2000,
                portNames: ["Royal", "Nassau", "Tortuga", "Kingston"]
            },
            {
                template: "{coins} gold coins between {pirates} pirates. About how much each?",
                ranges: { coins: [600, 1200], pirates: [6, 9] },
                calculate: (vars) => Math.round(vars.coins / vars.pirates),
                tolerance: 25
            },
            {
                template: "Each pirate eats {meals} meals daily. {pirates} pirates for a {days}-day voyage. About how many meals needed?",
                ranges: { meals: [2, 4], pirates: [8, 15], days: [20, 35] },
                calculate: (vars) => vars.meals * vars.pirates * vars.days,
                tolerance: 150
            },
            {
                template: "If we capture {ships} ships per month, each worth about {value} gold, roughly how much in a year?",
                ranges: { ships: [2, 5], value: [300, 600] },
                calculate: (vars) => vars.ships * vars.value * 12,
                tolerance: 3000
            },
            {
                template: "Lookout duty: {shifts} shifts daily, {piratesPerShift} pirates per shift, {days}-day voyage. How many duty assignments?",
                ranges: { shifts: [3, 5], piratesPerShift: [2, 4], days: [15, 30] },
                calculate: (vars) => vars.shifts * vars.piratesPerShift * vars.days,
                tolerance: 50
            }
        ];

        return this.generateFromTemplate(hardTemplates);
    }

    generateFromTemplate(templates) {
        const template = templates[Math.floor(Math.random() * templates.length)];
        const vars = {};

        // Generate random values for each variable
        for (const [key, range] of Object.entries(template.ranges)) {
            const [min, max] = range;
            vars[key] = min + Math.floor(Math.random() * (max - min + 1));
        }

        // Handle special cases like port names
        if (template.portNames) {
            vars.portName = template.portNames[Math.floor(Math.random() * template.portNames.length)];
        }

        // Replace placeholders in template
        let question = template.template;
        for (const [key, value] of Object.entries(vars)) {
            question = question.replace(new RegExp(`{${key}}`, 'g'), value);
        }

        // Calculate answer
        const answer = template.calculate(vars);
        const tolerance = typeof template.tolerance === 'function'
            ? template.tolerance(vars)
            : template.tolerance;

        return {
            type: 'captain',
            question: question,
            answer: answer,
            tolerance: tolerance,
            vars: vars
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