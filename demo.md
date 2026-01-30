---
layout: page
title: Flickbook Demo
---

<style>
  /* Reset page styles for full control */
  .page {
    max-width: none;
    padding: 0;
  }

  /* Scroll sections */
  .scroll-section {
    height: 100vh;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .scroll-section:nth-child(1) { background: #f0e68c; }
  .scroll-section:nth-child(2) { background: #98d8c8; }
  .scroll-section:nth-child(3) { background: #ffb6c1; }

  /* Character container */
  .character {
    position: sticky;
    top: 50%;
    transform: translateY(-50%);
    width: 300px;
    height: 400px;
    position: relative;
  }

  /* Character parts positioning */
  .body {
    position: absolute;
    top: 80px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
  }

  .leg {
    position: absolute;
    bottom: 60px;
    width: 30px;
    z-index: 1;
  }

  .leg.left {
    left: 90px;
    transform-origin: 50% 0%;
  }

  .leg.right {
    left: 180px;
    transform-origin: 50% 0%;
  }

  .face {
    position: absolute;
    top: 120px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 3;
  }

  /* Animation states */
  .scroll-section:nth-child(1) .leg.left {
    animation: knee-bounce-left 0.6s steps(3) infinite;
  }

  .scroll-section:nth-child(1) .leg.right {
    animation: knee-bounce-right 0.6s steps(3) infinite;
  }

  .scroll-section:nth-child(1) .body {
    animation: body-bounce 0.6s steps(3) infinite;
  }

  .scroll-section:nth-child(2) .leg.left {
    animation: knee-walk-left 0.4s steps(2) infinite;
  }

  .scroll-section:nth-child(2) .leg.right {
    animation: knee-walk-right 0.4s steps(2) infinite;
  }

  .scroll-section:nth-child(2) .body {
    animation: body-walk 0.4s steps(2) infinite;
  }

  .scroll-section:nth-child(3) .leg.left {
    animation: knee-excited-left 0.3s steps(4) infinite;
  }

  .scroll-section:nth-child(3) .leg.right {
    animation: knee-excited-right 0.3s steps(4) infinite;
  }

  .scroll-section:nth-child(3) .body {
    animation: body-excited 0.3s steps(4) infinite;
  }

  /* Keyframes - Idle bounce */
  @keyframes knee-bounce-left {
    0%, 100% { transform: rotate(0deg); }
    50% { transform: rotate(-5deg); }
  }

  @keyframes knee-bounce-right {
    0%, 100% { transform: rotate(0deg); }
    50% { transform: rotate(5deg); }
  }

  @keyframes body-bounce {
    0%, 100% { transform: translateX(-50%) translateY(0px); }
    50% { transform: translateX(-50%) translateY(-10px); }
  }

  /* Keyframes - Walking */
  @keyframes knee-walk-left {
    0% { transform: rotate(-10deg); }
    50% { transform: rotate(10deg); }
    100% { transform: rotate(-10deg); }
  }

  @keyframes knee-walk-right {
    0% { transform: rotate(10deg); }
    50% { transform: rotate(-10deg); }
    100% { transform: rotate(10deg); }
  }

  @keyframes body-walk {
    0%, 100% { transform: translateX(-50%) translateY(0px); }
    50% { transform: translateX(-50%) translateY(-5px); }
  }

  /* Keyframes - Excited */
  @keyframes knee-excited-left {
    0% { transform: rotate(0deg); }
    25% { transform: rotate(-15deg); }
    50% { transform: rotate(0deg); }
    75% { transform: rotate(-10deg); }
    100% { transform: rotate(0deg); }
  }

  @keyframes knee-excited-right {
    0% { transform: rotate(0deg); }
    25% { transform: rotate(15deg); }
    50% { transform: rotate(0deg); }
    75% { transform: rotate(10deg); }
    100% { transform: rotate(0deg); }
  }

  @keyframes body-excited {
    0%, 100% { transform: translateX(-50%) translateY(0px) scaleY(1); }
    25% { transform: translateX(-50%) translateY(-20px) scaleY(0.9); }
    50% { transform: translateX(-50%) translateY(0px) scaleY(1.1); }
    75% { transform: translateX(-50%) translateY(-15px) scaleY(0.95); }
  }

  /* Label for sections */
  .label {
    position: absolute;
    top: 20px;
    left: 20px;
    font-size: 2rem;
    font-weight: bold;
    opacity: 0.3;
  }
</style>

<div class="scroll-section">
  <span class="label">Idle</span>
  <div class="character">
    <!-- Body (kettle) -->
    <svg class="body" width="120" height="140" viewBox="0 0 120 140" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="70" rx="50" ry="60" fill="#ff6b6b"/>
      <ellipse cx="60" cy="20" rx="25" ry="10" fill="#ff6b6b"/>
    </svg>

    <!-- Left leg -->
    <svg class="leg left" width="30" height="80" viewBox="0 0 30 80" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="0" width="20" height="60" rx="10" fill="#333"/>
      <ellipse cx="15" cy="70" rx="15" ry="10" fill="#222"/>
    </svg>

    <!-- Right leg -->
    <svg class="leg right" width="30" height="80" viewBox="0 0 30 80" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="0" width="20" height="60" rx="10" fill="#333"/>
      <ellipse cx="15" cy="70" rx="15" ry="10" fill="#222"/>
    </svg>

    <!-- Face -->
    <svg class="face" width="60" height="40" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="15" r="5" fill="#fff"/>
      <circle cx="40" cy="15" r="5" fill="#fff"/>
      <circle cx="20" cy="15" r="3" fill="#000"/>
      <circle cx="40" cy="15" r="3" fill="#000"/>
      <path d="M 15 30 Q 30 35 45 30" stroke="#000" stroke-width="3" fill="none"/>
    </svg>
  </div>
</div>

<div class="scroll-section">
  <span class="label">Walking</span>
  <div class="character">
    <!-- Body (kettle) -->
    <svg class="body" width="120" height="140" viewBox="0 0 120 140" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="70" rx="50" ry="60" fill="#ff6b6b"/>
      <ellipse cx="60" cy="20" rx="25" ry="10" fill="#ff6b6b"/>
    </svg>

    <!-- Left leg -->
    <svg class="leg left" width="30" height="80" viewBox="0 0 30 80" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="0" width="20" height="60" rx="10" fill="#333"/>
      <ellipse cx="15" cy="70" rx="15" ry="10" fill="#222"/>
    </svg>

    <!-- Right leg -->
    <svg class="leg right" width="30" height="80" viewBox="0 0 30 80" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="0" width="20" height="60" rx="10" fill="#333"/>
      <ellipse cx="15" cy="70" rx="15" ry="10" fill="#222"/>
    </svg>

    <!-- Face -->
    <svg class="face" width="60" height="40" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="15" r="5" fill="#fff"/>
      <circle cx="40" cy="15" r="5" fill="#fff"/>
      <circle cx="20" cy="15" r="3" fill="#000"/>
      <circle cx="40" cy="15" r="3" fill="#000"/>
      <path d="M 15 30 Q 30 35 45 30" stroke="#000" stroke-width="3" fill="none"/>
    </svg>
  </div>
</div>

<div class="scroll-section">
  <span class="label">Excited</span>
  <div class="character">
    <!-- Body (kettle) -->
    <svg class="body" width="120" height="140" viewBox="0 0 120 140" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="70" rx="50" ry="60" fill="#ff6b6b"/>
      <ellipse cx="60" cy="20" rx="25" ry="10" fill="#ff6b6b"/>
    </svg>

    <!-- Left leg -->
    <svg class="leg left" width="30" height="80" viewBox="0 0 30 80" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="0" width="20" height="60" rx="10" fill="#333"/>
      <ellipse cx="15" cy="70" rx="15" ry="10" fill="#222"/>
    </svg>

    <!-- Right leg -->
    <svg class="leg right" width="30" height="80" viewBox="0 0 30 80" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="0" width="20" height="60" rx="10" fill="#333"/>
      <ellipse cx="15" cy="70" rx="15" ry="10" fill="#222"/>
    </svg>

    <!-- Face -->
    <svg class="face" width="60" height="40" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="15" r="6" fill="#fff"/>
      <circle cx="40" cy="15" r="6" fill="#fff"/>
      <circle cx="20" cy="15" r="4" fill="#000"/>
      <circle cx="40" cy="15" r="4" fill="#000"/>
      <path d="M 10 32 Q 30 40 50 32" stroke="#000" stroke-width="3" fill="none"/>
    </svg>
  </div>
</div>
