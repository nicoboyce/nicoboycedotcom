---
layout: page
title: Pirate Quest
---

<div id="estimation-game">
  <div id="game-header">
    <h2>🏴‍☠️ Pirate Quest</h2>
    <div id="timer">Time: <span id="time-remaining">60</span>s</div>
    <div id="score">Score: <span id="current-score">0</span></div>
  </div>

  <div id="challenge-area">
    <div id="challenge-text">
      <p>Ahoy matey! Ready to set sail on your pirate quest?</p>
    </div>

    <div id="answer-area">
      <button id="start-game">Begin Quest</button>
      <div id="slider-area" style="display:none;">
        <div id="slider-container">
          <div id="range-labels">
            <span id="min-label">0</span>
            <span id="max-label">100</span>
          </div>
          <input type="range" id="estimation-slider" min="0" max="100" value="50" step="1">
          <div id="slider-value">50</div>
          <button id="submit-estimate">Submit Estimate</button>
        </div>
      </div>
    </div>

    <div id="feedback">
      <!-- Feedback messages appear here -->
    </div>
  </div>

  <div id="game-controls">
    <!-- Auto-advance, no manual next button needed -->
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

#slider-area {
  text-align: center;
  margin: 1rem 0;
}

#slider-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 1rem;
}

#range-labels {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-weight: bold;
  font-size: 1.1rem;
  color: #2c1810;
}

#estimation-slider {
  width: 100%;
  height: 8px;
  border-radius: 5px;
  background: #ddd;
  outline: none;
  margin: 1rem 0;
  cursor: pointer;
}

#estimation-slider::-webkit-slider-thumb {
  appearance: none;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #8b4513;
  cursor: pointer;
  border: 2px solid #654321;
}

#estimation-slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #8b4513;
  cursor: pointer;
  border: 2px solid #654321;
}

#slider-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #8b4513;
  margin: 1rem 0;
}

#submit-estimate {
  background: #8b4513;
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  font-size: 1.1rem;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 1rem;
}

#submit-estimate:hover {
  background: #654321;
}

#submit-estimate:disabled {
  background: #ccc;
  cursor: not-allowed;
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