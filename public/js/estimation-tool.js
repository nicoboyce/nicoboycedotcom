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

        // Add event listeners for slider
        const slider = document.getElementById('estimation-slider');
        const submitBtn = document.getElementById('submit-estimate');

        if (slider) {
            slider.addEventListener('input', () => this.updateSliderValue());
        }

        if (submitBtn) {
            submitBtn.addEventListener('click', () => this.submitEstimate());
        }
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
        document.getElementById('slider-area').style.display = 'block';
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
        this.setupSliderRange();
        this.displayChallenge();
        this.resetSlider();
        document.getElementById('feedback').textContent = '';
    }

    generateChallenge() {
        // Progressive difficulty based on challenge number
        if (this.challengeNumber <= 10) {
            return this.generateEasyChallenge();
        } else if (this.challengeNumber <= 20) {
            return this.generateMediumChallenge();
        } else {
            return this.generateHardChallenge();
        }
    }

    generateEasyChallenge() {
        const easyTemplates = [
            {
                template: "{chests} treasure chests to split equally between {pirates} pirates. How many chests each?",
                ranges: { chests: [2, 5], pirates: [2, 4] },
                calculate: (vars) => vars.chests / vars.pirates,
                tolerance: 0,
                riskType: "exact",
                explanation: "Must be exactly right - unfair splits cause fights!",
                generateVars: (template) => {
                    const chestsEach = 2 + Math.floor(Math.random() * 4); // 2-5 chests each
                    const pirates = 2 + Math.floor(Math.random() * 3); // 2-4 pirates
                    return { chests: chestsEach * pirates, pirates: pirates };
                }
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
            },
            {
                template: "Fighting scurvy: {crew} pirates need {lemonsPerDay} lemons each daily for {days} days to stay healthy. How many lemons total?",
                ranges: { crew: [6, 12], lemonsPerDay: [2, 3], days: [5, 10] },
                calculate: (vars) => vars.crew * vars.lemonsPerDay * vars.days,
                tolerance: 15,
                riskType: "over_better",
                explanation: "Better to have extra - crew gets scurvy without enough!"
            },
            {
                template: "Hoisting the main sail: Takes {piratesPerRope} pirates per rope, main sail has {ropes} ropes to hoist. How many pirates needed?",
                ranges: { piratesPerRope: [3, 5], ropes: [4, 6] },
                calculate: (vars) => vars.piratesPerRope * vars.ropes,
                tolerance: 2,
                riskType: "over_better",
                explanation: "Better to have extra pirates - too few and the sail won't rise!"
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
            },
            {
                template: "Tavern celebration: Each rum barrel serves {servingsPerBarrel} pirates, we have {crew} crew for a victory toast. Need {servingsPerPirate} servings each. How many barrels for a proper celebratory toast?",
                ranges: { servingsPerBarrel: [8, 12], crew: [25, 40], servingsPerPirate: [2, 3] },
                calculate: (vars) => Math.ceil((vars.crew * vars.servingsPerPirate) / vars.servingsPerBarrel),
                tolerance: 2,
                riskType: "over_better",
                explanation: "Better to have extra rum - nothing worse than a disappointed crew!"
            },
            {
                template: "Merchant convoy: {ships} merchant ships, each carrying {cargoValue} gold worth of cargo. Rough total value if we capture all?",
                ranges: { ships: [3, 7], cargoValue: [800, 1500] },
                calculate: (vars) => vars.ships * vars.cargoValue,
                tolerance: 1000,
                riskType: "either",
                explanation: "Just need rough planning for splitting the treasure."
            },
            {
                template: "Sail repairs: We can patch {patchesPerHour} sail tears per hour, storm caused {totalTears} tears. About how long to fix everything?",
                ranges: { patchesPerHour: [3, 6], totalTears: [20, 45] },
                calculate: (vars) => Math.ceil(vars.totalTears / vars.patchesPerHour),
                tolerance: 2,
                riskType: "over_better",
                explanation: "Better to overestimate time - rush the job and the sail fails when we need it most!"
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

    calculateRange(correctAnswer) {
        // Find smallest power of 10 where correct_answer * 1.1 fits
        const upperBound = correctAnswer * 1.1;
        const powerOfTen = Math.pow(10, Math.ceil(Math.log10(upperBound)));
        return { min: 0, max: powerOfTen };
    }

    setupSliderRange() {
        const correctAnswer = this.currentChallenge.answer;
        const range = this.calculateRange(correctAnswer);

        const slider = document.getElementById('estimation-slider');
        const minLabel = document.getElementById('min-label');
        const maxLabel = document.getElementById('max-label');

        slider.min = range.min;
        slider.max = range.max;
        slider.value = Math.floor(range.max / 2); // Start at middle

        minLabel.textContent = range.min.toLocaleString();
        maxLabel.textContent = range.max.toLocaleString();

        this.currentRange = range;
        this.updateSliderValue();
    }

    updateSliderValue() {
        const slider = document.getElementById('estimation-slider');
        const valueDisplay = document.getElementById('slider-value');
        valueDisplay.textContent = parseInt(slider.value).toLocaleString();
    }

    resetSlider() {
        const submitBtn = document.getElementById('submit-estimate');
        const slider = document.getElementById('estimation-slider');

        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Estimate';

        // Reset slider visual feedback
        slider.style.background = '#ddd';

        // Remove any existing markers
        const existingMarkers = document.querySelectorAll('.slider-marker');
        existingMarkers.forEach(marker => marker.remove());
    }

    showSliderFeedback(userAnswer, correctAnswer, score) {
        const slider = document.getElementById('estimation-slider');
        const sliderContainer = document.getElementById('slider-container');
        const range = this.currentRange;

        // Calculate positions as percentages of the slider range
        const userPosition = ((userAnswer - range.min) / (range.max - range.min)) * 100;
        const correctPosition = ((correctAnswer - range.min) / (range.max - range.min)) * 100;

        // Calculate good range based on risk type
        const bufferSize = Math.min(correctAnswer * 0.2, range.max * 0.1);
        let goodRangeMin, goodRangeMax;

        const riskType = this.currentChallenge.riskType;
        if (riskType === 'over_better') {
            // Green zone extends upward from correct answer
            goodRangeMin = correctAnswer;
            goodRangeMax = Math.min(range.max, correctAnswer + bufferSize);
        } else if (riskType === 'under_better') {
            // Green zone extends downward from correct answer
            goodRangeMin = Math.max(range.min, correctAnswer - bufferSize);
            goodRangeMax = correctAnswer;
        } else if (riskType === 'exact') {
            // Very narrow green zone around correct answer
            const exactBuffer = Math.min(correctAnswer * 0.05, range.max * 0.02);
            goodRangeMin = Math.max(range.min, correctAnswer - exactBuffer);
            goodRangeMax = Math.min(range.max, correctAnswer + exactBuffer);
        } else {
            // 'either' - symmetric green zone (current behaviour)
            goodRangeMin = Math.max(range.min, correctAnswer - bufferSize);
            goodRangeMax = Math.min(range.max, correctAnswer + bufferSize);
        }

        const goodRangeMinPos = ((goodRangeMin - range.min) / (range.max - range.min)) * 100;
        const goodRangeMaxPos = ((goodRangeMax - range.min) / (range.max - range.min)) * 100;

        // Create gradient background showing good zone
        const gradient = `linear-gradient(to right,
            #ddd 0%,
            #ddd ${goodRangeMinPos}%,
            #66bb6a ${goodRangeMinPos}%,
            #66bb6a ${goodRangeMaxPos}%,
            #ddd ${goodRangeMaxPos}%,
            #ddd 100%)`;

        slider.style.background = gradient;

        // Get slider position relative to container for accurate positioning
        const sliderRect = slider.getBoundingClientRect();
        const containerRect = sliderContainer.getBoundingClientRect();
        const sliderOffsetLeft = sliderRect.left - containerRect.left;
        const sliderWidth = sliderRect.width;

        // Calculate actual pixel positions
        const correctPx = sliderOffsetLeft + (correctPosition / 100) * sliderWidth;
        const userPx = sliderOffsetLeft + (userPosition / 100) * sliderWidth;

        // Add arrow marker for correct answer
        const correctMarker = document.createElement('div');
        correctMarker.className = 'slider-marker correct-marker';
        correctMarker.innerHTML = '▼';
        correctMarker.style.cssText = `
            position: absolute;
            left: ${correctPx}px;
            top: -25px;
            font-size: 16px;
            color: #1b5e20;
            transform: translateX(-50%);
            z-index: 10;
            font-weight: bold;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
        `;

        // Add arrow marker for user answer
        const userMarker = document.createElement('div');
        userMarker.className = 'slider-marker user-marker';
        const userColor = score >= 60 ? '#1b5e20' : score >= 30 ? '#ff9800' : '#d32f2f';
        userMarker.innerHTML = '▲';
        userMarker.style.cssText = `
            position: absolute;
            left: ${userPx}px;
            top: 15px;
            font-size: 16px;
            color: ${userColor};
            transform: translateX(-50%);
            z-index: 10;
            font-weight: bold;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
        `;

        // Ensure container is positioned for absolute markers
        sliderContainer.style.position = 'relative';

        sliderContainer.appendChild(correctMarker);
        sliderContainer.appendChild(userMarker);
    }

    submitEstimate() {
        if (!this.gameActive || !this.currentChallenge) return;

        const slider = document.getElementById('estimation-slider');
        const userAnswer = parseInt(slider.value);

        // Pause timer during feedback
        this.pauseTimer();

        // Disable submit button
        const submitBtn = document.getElementById('submit-estimate');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitted!';

        this.processAnswer(userAnswer);
    }

    generateFromTemplate(templates) {
        const template = templates[Math.floor(Math.random() * templates.length)];
        let vars = {};

        // Use custom variable generation if provided
        if (template.generateVars) {
            vars = template.generateVars(template);
        } else {
            // Generate random values for each variable
            for (const [key, range] of Object.entries(template.ranges)) {
                const [min, max] = range;
                vars[key] = min + Math.floor(Math.random() * (max - min + 1));
            }
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

    processAnswer(userAnswer) {
        const correct = this.currentChallenge.answer;
        const riskType = this.currentChallenge.riskType;
        const diff = userAnswer - correct;
        const absDiff = Math.abs(diff);

        // Calculate percentage error
        const percentageError = (absDiff / correct) * 100;

        // Base score from accuracy (0-100)
        let baseScore = Math.max(0, 100 - percentageError);

        // Apply risk type penalties
        let penaltyMultiplier = 1;
        let riskMessage = '';

        if (riskType === 'over_better' && diff < 0) {
            penaltyMultiplier = 0.3; // Harsh penalty for underestimating
            riskMessage = ' (dangerous underestimate!)';
        } else if (riskType === 'under_better' && diff > 0) {
            penaltyMultiplier = 0.3; // Harsh penalty for overestimating
            riskMessage = ' (dangerous overestimate!)';
        } else if (riskType === 'exact' && absDiff > 0) {
            penaltyMultiplier = 0.7; // Moderate penalty for inexact
            riskMessage = ' (must be exact!)';
        }

        const finalScore = Math.floor(baseScore * penaltyMultiplier);
        const timeBonus = Math.floor(finalScore * 0.5); // Convert to time bonus

        // Generate feedback message
        let feedback;
        if (finalScore >= 95) {
            feedback = '🎯 Perfect estimation! Legendary!';
        } else if (finalScore >= 80) {
            feedback = '⚡ Excellent work, Captain!';
        } else if (finalScore >= 60) {
            feedback = '👍 Good estimate, getting warmer!';
        } else if (finalScore >= 30) {
            feedback = '⚠️ Not quite right, but you\'re learning!';
        } else {
            feedback = '💥 Way off the mark, matey!';
        }

        this.timeRemaining += timeBonus;
        this.score += timeBonus;

        const accuracyPercent = Math.floor(100 - percentageError);

        // Show visual feedback on slider
        this.showSliderFeedback(userAnswer, correct, finalScore);

        document.getElementById('feedback').innerHTML =
            `<div style="color: ${finalScore >= 60 ? 'green' : finalScore >= 30 ? 'orange' : 'red'}">${feedback}${riskMessage}</div>
             <div style="color: #0e0518;">Accuracy: ${Math.max(0, accuracyPercent)}% | Score: ${finalScore} | +${timeBonus} seconds!</div>
             <div style="color: #0e0518;">Your guess: ${userAnswer.toLocaleString()} | <strong>Correct: ${correct.toLocaleString()}</strong></div>
             <div style="font-size: 0.9em; margin-top: 10px; color: #0e0518;">Next challenge in <span id="countdown">3</span> seconds...</div>`;

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
        document.getElementById('slider-area').style.display = 'none';
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PirateEstimationGame();
});