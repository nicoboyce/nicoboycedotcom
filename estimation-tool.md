---
layout: page
title: Pirate Estimation Challenge
---

<div id="estimation-game">
  <div id="game-header">
    <h2>🏴‍☠️ Captain's Estimation Challenge</h2>
    <div id="timer">Time: <span id="time-remaining">60</span>s</div>
    <div id="score">Score: <span id="current-score">0</span></div>
  </div>

  <div id="challenge-area">
    <div id="challenge-text">
      <p>Ahoy matey! Ready to test your estimation skills?</p>
    </div>

    <div id="answer-area">
      <button id="start-game">Start Challenge</button>
      <div id="multiple-choice" style="display:none;">
        <button class="choice-btn" data-choice="0"></button>
        <button class="choice-btn" data-choice="1"></button>
        <button class="choice-btn" data-choice="2"></button>
        <button class="choice-btn" data-choice="3"></button>
      </div>
    </div>

    <div id="feedback">
      <!-- Feedback messages appear here -->
    </div>
  </div>

  <div id="game-controls">
    <button id="new-challenge" style="display:none;">Next Challenge</button>
  </div>
</div>

<style>
#game-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #2c1810;
  color: #f4e4bc;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

#timer, #score {
  font-size: 1.2rem;
  font-weight: bold;
}

#challenge-area {
  background: #f8f5f0;
  border: 3px solid #8b4513;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1rem;
}

#challenge-text {
  font-size: 1.1rem;
  margin-bottom: 1rem;
  text-align: center;
  color: #0e0518;
}

#challenge-text p {
  color: #0e0518 !important;
}

#challenge-text strong {
  color: #0e0518 !important;
}

#game-canvas {
  display: block;
  margin: 1rem auto;
  border: 2px solid #654321;
  background: #e6ddd4;
}

#answer-area {
  text-align: center;
  margin: 1rem 0;
}

#multiple-choice {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin: 1rem 0;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.choice-btn {
  background: #8b4513;
  color: white;
  border: none;
  padding: 1rem;
  font-size: 1.1rem;
  border-radius: 8px;
  cursor: pointer;
  min-height: 60px;
}

.choice-btn:hover {
  background: #654321;
}

.choice-btn.correct {
  background: #2d5a2d;
}

.choice-btn.incorrect {
  background: #8b2d2d;
}

#estimation-game button:not(.choice-btn) {
  background: #8b4513;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
}

#estimation-game button:not(.choice-btn):hover {
  background: #654321;
}

#feedback {
  text-align: center;
  font-size: 1.1rem;
  min-height: 2rem;
  font-weight: bold;
}

#game-controls {
  text-align: center;
}
</style>

<script src="/public/js/estimation-tool.js"></script>