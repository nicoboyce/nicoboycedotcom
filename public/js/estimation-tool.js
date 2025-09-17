class PirateEstimationGame {
    constructor() {
        this.timeRemaining = 60;
        this.score = 0;
        this.currentChallenge = null;
        this.gameActive = false;
        this.timer = null;
        this.challengeNumber = 0;
        this.choices = [];
        this.timerPaused = false;

        this.setupEventListeners();
        this.showWelcomeMessage();
    }

    setupEventListeners() {
        document.getElementById('start-game').addEventListener('click', () => this.startGame());

        // Add event listeners for multiple choice buttons
        document.querySelectorAll('.choice-btn').forEach((btn, index) => {
            btn.addEventListener('click', () => this.selectChoice(index));
        });
    }

    showWelcomeMessage() {
        document.getElementById('challenge-text').innerHTML =
            '<p>🏴‍☠️ Ahoy matey! Ready to test your estimation skills?</p>' +
            '<p>Quick thinking beats precise counting - trust your instincts!</p>';
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
        document.getElementById('multiple-choice').style.display = 'grid';
    }

    startTimer() {
        this.timer = setInterval(() => {
            if (!this.timerPaused) {
                this.timeRemaining--;
                this.updateDisplay();

                if (this.timeRemaining <= 0) {
                    this.endGame();
                }
            }
        }, 1000);
    }

    pauseTimer() {
        this.timerPaused = true;
    }

    resumeTimer() {
        this.timerPaused = false;
    }

    updateDisplay() {
        document.getElementById('time-remaining').textContent = this.timeRemaining;
        document.getElementById('current-score').textContent = this.score;
    }

    nextChallenge() {
        if (!this.gameActive) return;

        this.challengeNumber++;
        this.currentChallenge = this.generateChallenge();
        this.generateChoices();
        this.displayChallenge();
        this.resetChoiceButtons();
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
                template: "{chests} treasure chests to split equally between {pirates} pirates. How many chests each?",
                ranges: { chests: [6, 20], pirates: [2, 4] },
                calculate: (vars) => Math.floor(vars.chests / vars.pirates),
                tolerance: 1,
                riskType: "exact",
                explanation: "Must be exactly right - unfair splits cause fights!"
            },
            {
                template: "We need biscuits for {crew} crew, {days} days voyage. Each pirate eats {biscuitsPerDay} per day. How many biscuits total?",
                ranges: { crew: [8, 15], days: [4, 8], biscuitsPerDay: [8, 12] },
                calculate: (vars) => vars.crew * vars.days * vars.biscuitsPerDay,
                tolerance: 20,
                riskType: "over_better",
                explanation: "Better to have too many - crew mutinies if they starve!"
            },
            {
                template: "Storm approaching! We can sail for {maxHours} hours before it hits. Journey to safety takes {actualHours} hours. How long do we have?",
                ranges: { maxHours: [8, 15], actualHours: [6, 12] },
                calculate: (vars) => vars.maxHours - vars.actualHours,
                tolerance: 2,
                riskType: "under_better",
                explanation: "Better to underestimate - overestimate and we get caught in the storm!"
            },
            {
                template: "We captured {bags} bags of silver, each bag holds about {coinsPerBag} coins. Roughly how many coins total?",
                ranges: { bags: [3, 6], coinsPerBag: [15, 25] },
                calculate: (vars) => vars.bags * vars.coinsPerBag,
                tolerance: 15,
                riskType: "either",
                explanation: "Just need a rough count for planning."
            },
            {
                template: "Fresh water: {crew} crew needs {litresPerDay} litres each daily for {days} days. How many litres total?",
                ranges: { crew: [6, 12], litresPerDay: [3, 5], days: [4, 8] },
                calculate: (vars) => vars.crew * vars.litresPerDay * vars.days,
                tolerance: 15,
                riskType: "over_better",
                explanation: "Better to have extra - crew dies of thirst without enough!"
            },
            {
                template: "Buying supplies: rope costs {costPerLength} gold per length, we need {lengths} lengths. Total cost?",
                ranges: { costPerLength: [5, 15], lengths: [4, 8] },
                calculate: (vars) => vars.costPerLength * vars.lengths,
                tolerance: 10,
                riskType: "exact",
                explanation: "Must be exactly right for fair trading!"
            },
            {
                template: "We captured {prisoners} prisoners, need {guards} guards per {prisonersPer} prisoners. How many guards needed?",
                ranges: { prisoners: [9, 18], guards: [2, 3], prisonersPer: [3, 4] },
                calculate: (vars) => Math.ceil(vars.prisoners / vars.prisonersPer) * vars.guards,
                tolerance: 2,
                riskType: "over_better",
                explanation: "Better to have extra guards - prisoners escape if undermanned!"
            },
            {
                template: "Tide changes every {tideCycle} hours, it's been {elapsed} hours since last change. When's the next? (hours from now)",
                ranges: { tideCycle: [6, 8], elapsed: [2, 5] },
                calculate: (vars) => vars.tideCycle - vars.elapsed,
                tolerance: 1,
                riskType: "exact",
                explanation: "Must be exactly right for safe navigation!"
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
            },
            {
                template: "Shore leave: {crew} crew, groups of {groupSize}, each group gets {hours} hours. How long for everyone?",
                ranges: { crew: [40, 60], groupSize: [6, 10], hours: [2, 4] },
                calculate: (vars) => Math.ceil(vars.crew / vars.groupSize) * vars.hours,
                tolerance: 3,
                riskType: "either",
                explanation: "Just need rough planning for shore leave scheduling."
            },
            {
                template: "Port tax is {taxPerPerson} gold per crew member, we have {crew} pirates. About how much tax?",
                ranges: { taxPerPerson: [30, 70], crew: [25, 45] },
                calculate: (vars) => vars.taxPerPerson * vars.crew,
                tolerance: 200,
                riskType: "over_better",
                explanation: "Better to have extra gold - short on tax means trouble with port authorities!"
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
            },
            {
                template: "If one cannon weighs {cannonWeight}kg, about how much do {cannons} cannons weigh?",
                ranges: { cannonWeight: [400, 800], cannons: [6, 12] },
                calculate: (vars) => vars.cannonWeight * vars.cannons,
                tolerance: 1000,
                riskType: "under_better",
                explanation: "Better to underestimate weight - overload and the ship won't sail!"
            },
            {
                template: "We can load {cannonsPerMinute} cannons per minute, need {totalCannons} loaded for battle. How long to prepare?",
                ranges: { cannonsPerMinute: [3, 6], totalCannons: [18, 30] },
                calculate: (vars) => Math.ceil(vars.totalCannons / vars.cannonsPerMinute),
                tolerance: 2,
                riskType: "under_better",
                explanation: "Better to underestimate time - overestimate and enemy attacks while unprepared!"
            },
            {
                template: "Gold bags weigh {bagWeight}kg each. We've got {pirates} pirates, each carries {carryWeight}kg. How many trips for {totalBags} bags?",
                ranges: { bagWeight: [6, 12], pirates: [2, 4], carryWeight: [20, 35], totalBags: [40, 80] },
                calculate: (vars) => {
                    const bagsPerPirate = Math.floor(vars.carryWeight / vars.bagWeight);
                    const bagsPerTrip = bagsPerPirate * vars.pirates;
                    return Math.ceil(vars.totalBags / bagsPerTrip);
                },
                tolerance: 2,
                riskType: "either",
                explanation: "Multi-step calculation - bags per pirate, then total trips needed."
            },
            {
                template: "{crews} cannon crews working together: {crew1Rate} and {crew2Rate} cannons per minute. Need {totalCannons} loaded. How many minutes?",
                ranges: { crews: [2, 2], crew1Rate: [3, 5], crew2Rate: [4, 6], totalCannons: [35, 60] },
                calculate: (vars) => Math.ceil(vars.totalCannons / (vars.crew1Rate + vars.crew2Rate)),
                tolerance: 2,
                riskType: "under_better",
                explanation: "Better to underestimate - multiple crews working together, enemy won't wait!"
            },
            {
                template: "Supply carts: {carts} carts with {cart1Cap}, {cart2Cap}, and {cart3Cap} barrel capacity. Need to move {totalBarrels} barrels. How many trips?",
                ranges: { carts: [3, 3], cart1Cap: [4, 6], cart2Cap: [5, 8], cart3Cap: [6, 10], totalBarrels: [80, 120] },
                calculate: (vars) => Math.ceil(vars.totalBarrels / (vars.cart1Cap + vars.cart2Cap + vars.cart3Cap)),
                tolerance: 3,
                riskType: "either",
                explanation: "Complex resource management - different cart capacities working together."
            }
        ];

        return this.generateFromTemplate(hardTemplates);
    }

    generateChoices() {
        const correctAnswer = this.currentChallenge.answer;

        // Round answers to appropriate level based on magnitude
        const roundToSignificantDigits = (num) => {
            // Always ensure we have an integer first
            num = Math.round(num);

            if (num < 10) return num;
            if (num < 100) return Math.round(num / 5) * 5; // Round to nearest 5
            if (num < 1000) return Math.round(num / 10) * 10; // Round to nearest 10
            if (num < 10000) return Math.round(num / 100) * 100; // Round to nearest 100
            return Math.round(num / 1000) * 1000; // Round to nearest 1000
        };

        const roundedCorrect = roundToSignificantDigits(correctAnswer);

        // Generate plausible wrong answers at similar rounding levels
        const wrongChoices = [
            roundToSignificantDigits(correctAnswer * 0.4),
            roundToSignificantDigits(correctAnswer * 0.7),
            roundToSignificantDigits(correctAnswer * 1.6)
        ];

        // Remove duplicates and ensure variety
        const uniqueChoices = [...new Set([roundedCorrect, ...wrongChoices])];

        // If we need more choices, add some more variants
        while (uniqueChoices.length < 4) {
            const variant = roundToSignificantDigits(correctAnswer * (0.3 + Math.random() * 1.5));
            if (!uniqueChoices.includes(variant)) {
                uniqueChoices.push(variant);
            }
        }

        // Shuffle and take first 4
        this.choices = uniqueChoices.slice(0, 4).sort(() => Math.random() - 0.5);
        this.correctChoiceIndex = this.choices.indexOf(roundedCorrect);

        // Update the current challenge answer to match the rounded version
        this.currentChallenge.answer = roundedCorrect;
    }

    resetChoiceButtons() {
        document.querySelectorAll('.choice-btn').forEach((btn, index) => {
            btn.textContent = this.choices[index];
            btn.className = 'choice-btn';
            btn.disabled = false;
            btn.style.opacity = '1'; // Reset opacity
        });
    }

    selectChoice(choiceIndex) {
        if (!this.gameActive || !this.currentChallenge) return;

        // Pause timer during feedback
        this.pauseTimer();

        // Disable all buttons
        document.querySelectorAll('.choice-btn').forEach(btn => btn.disabled = true);

        // Enhanced visual feedback based on risk type
        const userAnswer = this.choices[choiceIndex];
        const correctAnswer = this.currentChallenge.answer;
        const riskType = this.currentChallenge.riskType;

        document.querySelectorAll('.choice-btn').forEach((btn, index) => {
            if (index === this.correctChoiceIndex) {
                btn.classList.add('correct');
            } else if (index === choiceIndex) {
                // Color based on how bad the choice was for this risk type
                const diff = this.choices[index] - correctAnswer;

                if (riskType === 'over_better' && diff < 0) {
                    btn.classList.add('very-bad'); // Too low when over is better = dangerous
                } else if (riskType === 'under_better' && diff > 0) {
                    btn.classList.add('very-bad'); // Too high when under is better = dangerous
                } else {
                    btn.classList.add('incorrect'); // Regular wrong answer
                }
            } else {
                // Show other options in muted style
                btn.style.opacity = '0.5';
            }
        });

        this.processAnswer(choiceIndex === this.correctChoiceIndex, userAnswer);
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
            riskType: template.riskType || 'either',
            explanation: template.explanation || '',
            vars: vars
        };
    }

    displayChallenge() {
        const difficultyText = this.challengeNumber <= 3 ? "Easy" :
                              this.challengeNumber <= 6 ? "Medium" : "Hard";

        const riskIcon = {
            'exact': '🎯',
            'over_better': '⬆️',
            'under_better': '⬇️',
            'either': '≈'
        }[this.currentChallenge.riskType];

        document.getElementById('challenge-text').innerHTML =
            `<p><em>Challenge ${this.challengeNumber} (${difficultyText}) ${riskIcon}</em></p>
             <p><strong>${this.currentChallenge.question}</strong></p>
             <p><small><em>${this.currentChallenge.explanation}</em></small></p>`;
    }

    processAnswer(isCorrect, userAnswer) {
        const correct = this.currentChallenge.answer;
        const tolerance = this.currentChallenge.tolerance;
        const diff = userAnswer - correct;
        const absDiff = Math.abs(diff);

        let feedback, timeBonus;

        if (isCorrect) {
            feedback = '🎯 Excellent estimation! Great thinking!';
            timeBonus = 30;
        } else {
            // Use asymmetric scoring for close answers
            if (this.currentChallenge.riskType === 'over_better' && diff > 0 && diff <= tolerance * 2) {
                feedback = '⚠️ Too high but better than too low!';
                timeBonus = 10;
            } else if (this.currentChallenge.riskType === 'under_better' && diff < 0 && absDiff <= tolerance * 2) {
                feedback = '⚠️ Too low but better safe than sorry!';
                timeBonus = 10;
            } else if (absDiff <= tolerance * 2) {
                feedback = '👍 Not the best choice, but in the right range!';
                timeBonus = 5;
            } else {
                feedback = '💥 Way off! Think about the captain\'s priorities!';
                timeBonus = 0;
            }
        }

        this.timeRemaining += timeBonus;
        this.score += timeBonus;

        document.getElementById('feedback').innerHTML =
            `<div style="color: ${timeBonus > 10 ? 'green' : timeBonus > 0 ? 'orange' : 'red'}">${feedback}</div>
             <div>+${timeBonus} seconds! Correct answer was ${correct}</div>
             <div style="font-size: 0.9em; margin-top: 10px;">Next challenge in <span id="countdown">3</span> seconds...</div>`;

        // Show countdown and auto-advance
        let countdownTime = 3;
        const countdownInterval = setInterval(() => {
            countdownTime--;
            const countdownEl = document.getElementById('countdown');
            if (countdownEl) {
                countdownEl.textContent = countdownTime;
            }

            if (countdownTime <= 0) {
                clearInterval(countdownInterval);
                // Only proceed if game is still active
                if (this.gameActive) {
                    this.resumeTimer();
                    this.nextChallenge();
                } else {
                    // If game ended during feedback, show manual continue option
                    this.showManualContinue();
                }
            }
        }, 1000);
    }

    showManualContinue() {
        // Show a continue button when auto-advance fails
        document.getElementById('feedback').innerHTML +=
            '<br><button onclick="location.reload()">Continue Playing</button>';
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

        document.getElementById('feedback').textContent = '';
        document.getElementById('start-game').style.display = 'inline-block';
        document.getElementById('multiple-choice').style.display = 'none';
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PirateEstimationGame();
});