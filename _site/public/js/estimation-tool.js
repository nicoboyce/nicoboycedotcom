class PirateEstimationGame {
    constructor() {
        this.timeRemaining = 60;
        this.score = 0;
        this.currentChallenge = null;
        this.gameActive = false;
        this.timer = null;

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
        this.updateDisplay();
        this.startTimer();
        this.nextChallenge();

        document.getElementById('start-game').style.display = 'none';
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

        this.currentChallenge = this.generateChallenge();
        this.displayChallenge();
        document.getElementById('answer-input').value = '';
        document.getElementById('answer-input').focus();
        document.getElementById('feedback').textContent = '';
    }

    generateChallenge() {
        const challenges = [
            this.generateDotCountChallenge(),
            this.generateTreasureChallenge(),
            this.generateCrewChallenge(),
            this.generateCannonballChallenge()
        ];

        return challenges[Math.floor(Math.random() * challenges.length)];
    }

    generateDotCountChallenge() {
        const count = 20 + Math.floor(Math.random() * 60); // 20-80 dots
        return {
            type: 'dots',
            answer: count,
            tolerance: Math.max(5, Math.floor(count * 0.15)), // 15% tolerance or min 5
            question: `How many gold coins are scattered on the deck?`,
            data: { count }
        };
    }

    generateTreasureChallenge() {
        const chests = 3 + Math.floor(Math.random() * 8); // 3-10 chests
        const pirates = 2 + Math.floor(Math.random() * 6); // 2-7 pirates
        const answer = Math.floor(chests / pirates);

        return {
            type: 'division',
            answer: answer,
            tolerance: 1,
            question: `${chests} treasure chests to split between ${pirates} pirates. About how many chests each?`,
            data: { chests, pirates }
        };
    }

    generateCrewChallenge() {
        const shovels = 4 + Math.floor(Math.random() * 6); // 4-9 shovels
        const chests = 15 + Math.floor(Math.random() * 25); // 15-40 chests
        const timePerChest = 3; // minutes
        const answer = Math.ceil(chests / shovels) * timePerChest;

        return {
            type: 'limiting',
            answer: answer,
            tolerance: Math.max(3, Math.floor(answer * 0.2)), // 20% tolerance or min 3
            question: `${chests} chests to bury, ${shovels} shovels, 3 minutes per chest. How many minutes total?`,
            data: { chests, shovels }
        };
    }

    generateCannonballChallenge() {
        const base = 100;
        const multiplier = Math.pow(10, Math.floor(Math.random() * 3)); // 1, 10, or 100
        const answer = base * multiplier + Math.floor(Math.random() * base * multiplier * 0.5);

        return {
            type: 'magnitude',
            answer: answer,
            tolerance: Math.floor(answer * 0.3), // 30% tolerance for big numbers
            question: `About how many cannonballs in this pile?`,
            data: { count: answer }
        };
    }

    displayChallenge() {
        document.getElementById('challenge-text').innerHTML =
            `<p><strong>${this.currentChallenge.question}</strong></p>`;

        this.clearCanvas();

        switch(this.currentChallenge.type) {
            case 'dots':
                this.drawDots(this.currentChallenge.data.count);
                break;
            case 'division':
            case 'limiting':
                this.drawTextChallenge();
                break;
            case 'magnitude':
                this.drawPile(this.currentChallenge.data.count);
                break;
        }
    }

    clearCanvas() {
        this.ctx.fillStyle = '#e6ddd4';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawDots(count) {
        this.clearCanvas();
        this.ctx.fillStyle = '#ffd700'; // Gold color

        for (let i = 0; i < count; i++) {
            const x = 20 + Math.random() * (this.canvas.width - 40);
            const y = 20 + Math.random() * (this.canvas.height - 40);
            const radius = 3 + Math.random() * 4;

            this.ctx.beginPath();
            this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
            this.ctx.fill();
        }
    }

    drawTextChallenge() {
        this.clearCanvas();
        this.ctx.fillStyle = '#654321';
        this.ctx.font = '24px Georgia';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('🏴‍☠️ Think quickly! 🏴‍☠️', this.canvas.width / 2, this.canvas.height / 2);
    }

    drawPile(count) {
        this.clearCanvas();

        // Draw a visual representation of a pile
        const pileHeight = Math.min(200, 50 + Math.log10(count) * 30);
        const pileWidth = 150;
        const centerX = this.canvas.width / 2;
        const baseY = this.canvas.height - 50;

        // Draw pile outline
        this.ctx.fillStyle = '#8b4513';
        this.ctx.beginPath();
        this.ctx.moveTo(centerX - pileWidth/2, baseY);
        this.ctx.lineTo(centerX, baseY - pileHeight);
        this.ctx.lineTo(centerX + pileWidth/2, baseY);
        this.ctx.closePath();
        this.ctx.fill();

        // Add some texture dots
        this.ctx.fillStyle = '#654321';
        for (let i = 0; i < 30; i++) {
            const x = centerX - pileWidth/4 + Math.random() * pileWidth/2;
            const ratio = (baseY - x + centerX) / pileHeight;
            const y = baseY - Math.random() * pileHeight * ratio;

            this.ctx.beginPath();
            this.ctx.arc(x, y, 2, 0, 2 * Math.PI);
            this.ctx.fill();
        }
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

        document.getElementById('challenge-text').innerHTML =
            `<h3>🏴‍☠️ Game Over! 🏴‍☠️</h3>
             <p>Final Score: ${this.score} seconds</p>
             <p>Well done, Captain! Your estimation skills are improving!</p>`;

        this.clearCanvas();
        document.getElementById('feedback').textContent = '';
        document.getElementById('start-game').style.display = 'inline-block';
        document.getElementById('new-challenge').style.display = 'none';
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PirateEstimationGame();
});