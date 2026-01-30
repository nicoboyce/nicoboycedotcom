---
layout: blank
title: Flickbook Demo
---

<style>
  /* Long scroll container to give us scroll range */
  .flipbook-container {
    height: 300vh;
    position: relative;
    background: linear-gradient(180deg, #f0e68c 0%, #98d8c8 50%, #ffb6c1 100%);
  }

  /* Character stays fixed in viewport */
  .character-fixed {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 800px;
    height: 800px;
  }

  /* Stack all frames in same space */
  .frame {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  /* Character parts positioning */
  .body {
    position: absolute;
    top: 150px;
    left: 30%;
    transform: translateX(-50%);
    width: 500px;
    z-index: 5;
  }

  .eyes {
    position: absolute;
    top: 233px;
    left: 265px;
    width: 60px;
    z-index: 7;
  }

  .mouth {
    position: absolute;
    top: 215px;
    left: 10%;
    width: 290px;
    z-index: 6;
  }

  .handle {
    position: absolute;
    top: 192px;
    right: 270px;
    width: 130px;
    z-index: 4;
  }

  .note {
    position: absolute;
    top: 50px;
    left: 80px;
    width: 50px;
    z-index: 8;
    opacity: 0.5;
  }

  /* Legs */
  .leg {
    position: absolute;
    width: 70px;
    z-index: 3;
    transform-origin: 50% 10%;
  }

  .leg.fl {
    left: 220px;
    bottom: 120px;
  }

  .leg.fr {
    left: 340px;
    bottom: 120px;
  }

  .leg.bl {
    left: 280px;
    bottom: 120px;
  }

  .leg.br {
    left: 400px;
    bottom: 120px;
  }

  /* Frame-specific poses */
  /* Frame 1 - Neutral */
  .frame-1 .leg.fl { transform: rotate(0deg); }
  .frame-1 .leg.fr { transform: rotate(0deg); }
  .frame-1 .leg.bl { transform: rotate(0deg); }
  .frame-1 .leg.br { transform: rotate(0deg); }
  .frame-1 .body { transform: translateX(-50%) translateY(0px); }
  .frame-1 .note { opacity: 0.3; transform: scale(0.8); }

  /* Frame 2 - Start bend */
  .frame-2 .leg.fl { transform: rotate(-5deg); }
  .frame-2 .leg.fr { transform: rotate(5deg); }
  .frame-2 .leg.bl { transform: rotate(5deg); }
  .frame-2 .leg.br { transform: rotate(-5deg); }
  .frame-2 .body { transform: translateX(-50%) translateY(-3px); }
  .frame-2 .note { opacity: 0.4; transform: scale(0.9); }

  /* Frame 3 - Deep bend */
  .frame-3 .leg.fl { transform: rotate(-10deg); }
  .frame-3 .leg.fr { transform: rotate(10deg); }
  .frame-3 .leg.bl { transform: rotate(10deg); }
  .frame-3 .leg.br { transform: rotate(-10deg); }
  .frame-3 .body { transform: translateX(-50%) translateY(-8px) scaleY(0.96); }
  .frame-3 .note { opacity: 0.5; transform: scale(1); }

  /* Frame 4 - Return up */
  .frame-4 .leg.fl { transform: rotate(-5deg); }
  .frame-4 .leg.fr { transform: rotate(5deg); }
  .frame-4 .leg.bl { transform: rotate(5deg); }
  .frame-4 .leg.br { transform: rotate(-5deg); }
  .frame-4 .body { transform: translateX(-50%) translateY(-3px); }
  .frame-4 .note { opacity: 0.6; transform: scale(1.1); }

  /* Frame 5 - Neutral stretch */
  .frame-5 .leg.fl { transform: rotate(0deg); }
  .frame-5 .leg.fr { transform: rotate(0deg); }
  .frame-5 .leg.bl { transform: rotate(0deg); }
  .frame-5 .leg.br { transform: rotate(0deg); }
  .frame-5 .body { transform: translateX(-50%) translateY(2px) scaleY(1.02); }
  .frame-5 .note { opacity: 0.7; transform: scale(1.2); }

  /* Frame 6 - Opposite bend start */
  .frame-6 .leg.fl { transform: rotate(5deg); }
  .frame-6 .leg.fr { transform: rotate(-5deg); }
  .frame-6 .leg.bl { transform: rotate(-5deg); }
  .frame-6 .leg.br { transform: rotate(5deg); }
  .frame-6 .body { transform: translateX(-50%) translateY(-3px); }
  .frame-6 .note { opacity: 0.8; transform: scale(1.3); }

  /* Frame 7 - Deep opposite bend */
  .frame-7 .leg.fl { transform: rotate(10deg); }
  .frame-7 .leg.fr { transform: rotate(-10deg); }
  .frame-7 .leg.bl { transform: rotate(-10deg); }
  .frame-7 .leg.br { transform: rotate(10deg); }
  .frame-7 .body { transform: translateX(-50%) translateY(-10px) scaleY(0.94); }
  .frame-7 .note { opacity: 1; transform: scale(1.4); }
  .frame-7 .mouth { transform: translateY(10px) scale(1.02); }

  /* Frame 8 - Return */
  .frame-8 .leg.fl { transform: rotate(5deg); }
  .frame-8 .leg.fr { transform: rotate(-5deg); }
  .frame-8 .leg.bl { transform: rotate(-5deg); }
  .frame-8 .leg.br { transform: rotate(5deg); }
  .frame-8 .body { transform: translateX(-50%) translateY(-3px); }
  .frame-8 .note { opacity: 0.8; transform: scale(1.2); }

  /* Frame 9 - Neutral */
  .frame-9 .leg.fl { transform: rotate(0deg); }
  .frame-9 .leg.fr { transform: rotate(0deg); }
  .frame-9 .leg.bl { transform: rotate(0deg); }
  .frame-9 .leg.br { transform: rotate(0deg); }
  .frame-9 .body { transform: translateX(-50%) translateY(0px); }
  .frame-9 .note { opacity: 0.6; transform: scale(1); }

  /* Frame 10 - Big bend start */
  .frame-10 .leg.fl { transform: rotate(-8deg); }
  .frame-10 .leg.fr { transform: rotate(8deg); }
  .frame-10 .leg.bl { transform: rotate(8deg); }
  .frame-10 .leg.br { transform: rotate(-8deg); }
  .frame-10 .body { transform: translateX(-50%) translateY(-5px) scaleY(0.97); }
  .frame-10 .note { opacity: 0.5; transform: scale(0.9); }

  /* Frame 11 - Biggest bend */
  .frame-11 .leg.fl { transform: rotate(-15deg); }
  .frame-11 .leg.fr { transform: rotate(15deg); }
  .frame-11 .leg.bl { transform: rotate(15deg); }
  .frame-11 .leg.br { transform: rotate(-15deg); }
  .frame-11 .body { transform: translateX(-50%) translateY(-15px) scaleY(0.92); }
  .frame-11 .note { opacity: 1; transform: scale(1.5); }
  .frame-11 .mouth { transform: translateY(10px) scale(1.03); }

  /* Frame 12 - Return */
  .frame-12 .leg.fl { transform: rotate(-8deg); }
  .frame-12 .leg.fr { transform: rotate(8deg); }
  .frame-12 .leg.bl { transform: rotate(8deg); }
  .frame-12 .leg.br { transform: rotate(-8deg); }
  .frame-12 .body { transform: translateX(-50%) translateY(-5px); }
  .frame-12 .note { opacity: 0.7; transform: scale(1.2); }

  /* Scroll indicator */
  .scroll-hint {
    position: fixed;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 1rem;
    opacity: 0.5;
    pointer-events: none;
  }
</style>

<div class="flipbook-container">
  <div class="character-fixed">
    <!-- Frame 1 -->
    <div class="frame frame-1">
      <img src="/public/svg/body.svg" class="body">
      <img src="/public/svg/eyes.svg" class="eyes">
      <img src="/public/svg/mouth.svg" class="mouth">
      <img src="/public/svg/handle.svg" class="handle">
      <img src="/public/svg/leg.svg" class="leg fl">
      <img src="/public/svg/leg.svg" class="leg fr">
      <img src="/public/svg/leg.svg" class="leg bl">
      <img src="/public/svg/leg.svg" class="leg br">
      <img src="/public/svg/note.svg" class="note">
    </div>

    <!-- Frame 2 -->
    <div class="frame frame-2">
      <img src="/public/svg/body.svg" class="body">
      <img src="/public/svg/eyes.svg" class="eyes">
      <img src="/public/svg/mouth.svg" class="mouth">
      <img src="/public/svg/handle.svg" class="handle">
      <img src="/public/svg/leg.svg" class="leg fl">
      <img src="/public/svg/leg.svg" class="leg fr">
      <img src="/public/svg/leg.svg" class="leg bl">
      <img src="/public/svg/leg.svg" class="leg br">
      <img src="/public/svg/note.svg" class="note">
    </div>

    <!-- Frame 3 -->
    <div class="frame frame-3">
      <img src="/public/svg/body.svg" class="body">
      <img src="/public/svg/eyes.svg" class="eyes">
      <img src="/public/svg/mouth.svg" class="mouth">
      <img src="/public/svg/handle.svg" class="handle">
      <img src="/public/svg/leg.svg" class="leg fl">
      <img src="/public/svg/leg.svg" class="leg fr">
      <img src="/public/svg/leg.svg" class="leg bl">
      <img src="/public/svg/leg.svg" class="leg br">
      <img src="/public/svg/note.svg" class="note">
    </div>

    <!-- Frame 4 -->
    <div class="frame frame-4">
      <img src="/public/svg/body.svg" class="body">
      <img src="/public/svg/eyes.svg" class="eyes">
      <img src="/public/svg/mouth.svg" class="mouth">
      <img src="/public/svg/handle.svg" class="handle">
      <img src="/public/svg/leg.svg" class="leg fl">
      <img src="/public/svg/leg.svg" class="leg fr">
      <img src="/public/svg/leg.svg" class="leg bl">
      <img src="/public/svg/leg.svg" class="leg br">
      <img src="/public/svg/note.svg" class="note">
    </div>

    <!-- Frame 5 -->
    <div class="frame frame-5">
      <img src="/public/svg/body.svg" class="body">
      <img src="/public/svg/eyes.svg" class="eyes">
      <img src="/public/svg/mouth.svg" class="mouth">
      <img src="/public/svg/handle.svg" class="handle">
      <img src="/public/svg/leg.svg" class="leg fl">
      <img src="/public/svg/leg.svg" class="leg fr">
      <img src="/public/svg/leg.svg" class="leg bl">
      <img src="/public/svg/leg.svg" class="leg br">
      <img src="/public/svg/note.svg" class="note">
    </div>

    <!-- Frame 6 -->
    <div class="frame frame-6">
      <img src="/public/svg/body.svg" class="body">
      <img src="/public/svg/eyes.svg" class="eyes">
      <img src="/public/svg/mouth.svg" class="mouth">
      <img src="/public/svg/handle.svg" class="handle">
      <img src="/public/svg/leg.svg" class="leg fl">
      <img src="/public/svg/leg.svg" class="leg fr">
      <img src="/public/svg/leg.svg" class="leg bl">
      <img src="/public/svg/leg.svg" class="leg br">
      <img src="/public/svg/note.svg" class="note">
    </div>

    <!-- Frame 7 -->
    <div class="frame frame-7">
      <img src="/public/svg/body.svg" class="body">
      <img src="/public/svg/eyes.svg" class="eyes">
      <img src="/public/svg/mouth.svg" class="mouth">
      <img src="/public/svg/handle.svg" class="handle">
      <img src="/public/svg/leg.svg" class="leg fl">
      <img src="/public/svg/leg.svg" class="leg fr">
      <img src="/public/svg/leg.svg" class="leg bl">
      <img src="/public/svg/leg.svg" class="leg br">
      <img src="/public/svg/note.svg" class="note">
    </div>

    <!-- Frame 8 -->
    <div class="frame frame-8">
      <img src="/public/svg/body.svg" class="body">
      <img src="/public/svg/eyes.svg" class="eyes">
      <img src="/public/svg/mouth.svg" class="mouth">
      <img src="/public/svg/handle.svg" class="handle">
      <img src="/public/svg/leg.svg" class="leg fl">
      <img src="/public/svg/leg.svg" class="leg fr">
      <img src="/public/svg/leg.svg" class="leg bl">
      <img src="/public/svg/leg.svg" class="leg br">
      <img src="/public/svg/note.svg" class="note">
    </div>

    <!-- Frame 9 -->
    <div class="frame frame-9">
      <img src="/public/svg/body.svg" class="body">
      <img src="/public/svg/eyes.svg" class="eyes">
      <img src="/public/svg/mouth.svg" class="mouth">
      <img src="/public/svg/handle.svg" class="handle">
      <img src="/public/svg/leg.svg" class="leg fl">
      <img src="/public/svg/leg.svg" class="leg fr">
      <img src="/public/svg/leg.svg" class="leg bl">
      <img src="/public/svg/leg.svg" class="leg br">
      <img src="/public/svg/note.svg" class="note">
    </div>

    <!-- Frame 10 -->
    <div class="frame frame-10">
      <img src="/public/svg/body.svg" class="body">
      <img src="/public/svg/eyes.svg" class="eyes">
      <img src="/public/svg/mouth.svg" class="mouth">
      <img src="/public/svg/handle.svg" class="handle">
      <img src="/public/svg/leg.svg" class="leg fl">
      <img src="/public/svg/leg.svg" class="leg fr">
      <img src="/public/svg/leg.svg" class="leg bl">
      <img src="/public/svg/leg.svg" class="leg br">
      <img src="/public/svg/note.svg" class="note">
    </div>

    <!-- Frame 11 -->
    <div class="frame frame-11">
      <img src="/public/svg/body.svg" class="body">
      <img src="/public/svg/eyes.svg" class="eyes">
      <img src="/public/svg/mouth.svg" class="mouth">
      <img src="/public/svg/handle.svg" class="handle">
      <img src="/public/svg/leg.svg" class="leg fl">
      <img src="/public/svg/leg.svg" class="leg fr">
      <img src="/public/svg/leg.svg" class="leg bl">
      <img src="/public/svg/leg.svg" class="leg br">
      <img src="/public/svg/note.svg" class="note">
    </div>

    <!-- Frame 12 -->
    <div class="frame frame-12">
      <img src="/public/svg/body.svg" class="body">
      <img src="/public/svg/eyes.svg" class="eyes">
      <img src="/public/svg/mouth.svg" class="mouth">
      <img src="/public/svg/handle.svg" class="handle">
      <img src="/public/svg/leg.svg" class="leg fl">
      <img src="/public/svg/leg.svg" class="leg fr">
      <img src="/public/svg/leg.svg" class="leg bl">
      <img src="/public/svg/leg.svg" class="leg br">
      <img src="/public/svg/note.svg" class="note">
    </div>
  </div>

  <div class="scroll-hint">Scroll to flip ↓</div>
</div>

<script>
  const frames = document.querySelectorAll('.frame');
  const totalFrames = frames.length;

  function updateFrame() {
    const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    const frameIndex = Math.min(Math.floor(scrollPercent * totalFrames), totalFrames - 1);

    frames.forEach((frame, index) => {
      frame.style.opacity = index === frameIndex ? '1' : '0';
    });
  }

  window.addEventListener('scroll', updateFrame);
  updateFrame(); // Initial frame
</script>
