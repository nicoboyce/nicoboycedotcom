---
layout: blank
title: Flickbook Demo
---

<style>
  /* Long scroll container to give us scroll range */
  .flipbook-container {
    height: 1500vh;
    position: relative;
    background: linear-gradient(180deg, #f0e68c 0%, #98d8c8 50%, #ffb6c1 100%);
  }

  /* Character stays fixed in viewport */
  .character-fixed {
    position: fixed;
    top: 50%;
    left: 64%;
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
    top: 80px;
    left: 130px;
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
    bottom: 270px;
  }

  .leg.fr {
    left: 283px;
    bottom: 255px;
  }

  .leg.bl {
    left: 430px;
    bottom: 290px;
  }

  .leg.br {
    left: 355px;
    bottom: 267px;
  }

  /* Frame-specific poses - Overlapping Leg Sequence Walk with Bounce */
  /* Frame 1: FL forward peak, BL finishing - big bounce */
  .frame-1 .leg.fl { transform: rotate(-15deg); }
  .frame-1 .leg.fr { transform: rotate(8deg); }
  .frame-1 .leg.bl { transform: rotate(8deg); }
  .frame-1 .leg.br { transform: rotate(-8deg); }
  .frame-1 .body { transform: translateX(-50%) translateY(-12px) scaleY(0.94); }
  .frame-1 .note { opacity: 1; transform: scale(1.4); }
  .frame-1 .mouth { transform: translateY(10px) scale(1.02); }

  /* Frame 2: FL finishing, BR starting */
  .frame-2 .leg.fl { transform: rotate(-10deg); }
  .frame-2 .leg.fr { transform: rotate(10deg); }
  .frame-2 .leg.bl { transform: rotate(10deg); }
  .frame-2 .leg.br { transform: rotate(-10deg); }
  .frame-2 .body { transform: translateX(-50%) translateY(-5px); }
  .frame-2 .note { opacity: 0.7; transform: scale(1.1); }

  /* Frame 3: FL back, BR moving forward - neutral stretch */
  .frame-3 .leg.fl { transform: rotate(-5deg); }
  .frame-3 .leg.fr { transform: rotate(12deg); }
  .frame-3 .leg.bl { transform: rotate(12deg); }
  .frame-3 .leg.br { transform: rotate(-12deg); }
  .frame-3 .body { transform: translateX(-50%) translateY(2px) scaleY(1.02); }
  .frame-3 .note { opacity: 0.5; transform: scale(0.9); }

  /* Frame 4: BR forward peak - big bounce */
  .frame-4 .leg.fl { transform: rotate(8deg); }
  .frame-4 .leg.fr { transform: rotate(8deg); }
  .frame-4 .leg.bl { transform: rotate(8deg); }
  .frame-4 .leg.br { transform: rotate(-15deg); }
  .frame-4 .body { transform: translateX(-50%) translateY(-12px) scaleY(0.94); }
  .frame-4 .note { opacity: 1; transform: scale(1.4); }
  .frame-4 .mouth { transform: translateY(10px) scale(1.02); }

  /* Frame 5: BR finishing, FR starting */
  .frame-5 .leg.fl { transform: rotate(10deg); }
  .frame-5 .leg.fr { transform: rotate(-10deg); }
  .frame-5 .leg.bl { transform: rotate(10deg); }
  .frame-5 .leg.br { transform: rotate(-10deg); }
  .frame-5 .body { transform: translateX(-50%) translateY(-5px); }
  .frame-5 .note { opacity: 0.7; transform: scale(1.1); }

  /* Frame 6: BR back, FR moving forward - neutral stretch */
  .frame-6 .leg.fl { transform: rotate(12deg); }
  .frame-6 .leg.fr { transform: rotate(-12deg); }
  .frame-6 .leg.bl { transform: rotate(12deg); }
  .frame-6 .leg.br { transform: rotate(-5deg); }
  .frame-6 .body { transform: translateX(-50%) translateY(2px) scaleY(1.02); }
  .frame-6 .note { opacity: 0.5; transform: scale(0.9); }

  /* Frame 7: FR forward peak - big bounce */
  .frame-7 .leg.fl { transform: rotate(8deg); }
  .frame-7 .leg.fr { transform: rotate(-15deg); }
  .frame-7 .leg.bl { transform: rotate(8deg); }
  .frame-7 .leg.br { transform: rotate(8deg); }
  .frame-7 .body { transform: translateX(-50%) translateY(-12px) scaleY(0.94); }
  .frame-7 .note { opacity: 1; transform: scale(1.4); }
  .frame-7 .mouth { transform: translateY(10px) scale(1.02); }

  /* Frame 8: FR finishing, BL starting */
  .frame-8 .leg.fl { transform: rotate(10deg); }
  .frame-8 .leg.fr { transform: rotate(-10deg); }
  .frame-8 .leg.bl { transform: rotate(-10deg); }
  .frame-8 .leg.br { transform: rotate(10deg); }
  .frame-8 .body { transform: translateX(-50%) translateY(-5px); }
  .frame-8 .note { opacity: 0.7; transform: scale(1.1); }

  /* Frame 9: FR back, BL moving forward - neutral stretch */
  .frame-9 .leg.fl { transform: rotate(12deg); }
  .frame-9 .leg.fr { transform: rotate(-5deg); }
  .frame-9 .leg.bl { transform: rotate(-12deg); }
  .frame-9 .leg.br { transform: rotate(12deg); }
  .frame-9 .body { transform: translateX(-50%) translateY(2px) scaleY(1.02); }
  .frame-9 .note { opacity: 0.5; transform: scale(0.9); }

  /* Frame 10: BL forward peak - big bounce */
  .frame-10 .leg.fl { transform: rotate(8deg); }
  .frame-10 .leg.fr { transform: rotate(8deg); }
  .frame-10 .leg.bl { transform: rotate(-15deg); }
  .frame-10 .leg.br { transform: rotate(8deg); }
  .frame-10 .body { transform: translateX(-50%) translateY(-12px) scaleY(0.94); }
  .frame-10 .note { opacity: 1; transform: scale(1.4); }
  .frame-10 .mouth { transform: translateY(10px) scale(1.02); }

  /* Frame 11: BL finishing, FL starting */
  .frame-11 .leg.fl { transform: rotate(-10deg); }
  .frame-11 .leg.fr { transform: rotate(10deg); }
  .frame-11 .leg.bl { transform: rotate(-10deg); }
  .frame-11 .leg.br { transform: rotate(10deg); }
  .frame-11 .body { transform: translateX(-50%) translateY(-5px); }
  .frame-11 .note { opacity: 0.7; transform: scale(1.1); }

  /* Frame 12: BL back, FL moving forward - neutral stretch */
  .frame-12 .leg.fl { transform: rotate(-12deg); }
  .frame-12 .leg.fr { transform: rotate(12deg); }
  .frame-12 .leg.bl { transform: rotate(-5deg); }
  .frame-12 .leg.br { transform: rotate(12deg); }
  .frame-12 .body { transform: translateX(-50%) translateY(2px) scaleY(1.02); }
  .frame-12 .note { opacity: 0.5; transform: scale(0.9); }

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

    <!-- Frame 13 -->
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

    <!-- Frame 14 -->
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

    <!-- Frame 15 -->
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

    <!-- Frame 16 -->
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

    <!-- Frame 17 -->
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

    <!-- Frame 18 -->
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

    <!-- Frame 19 -->
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

    <!-- Frame 20 -->
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

    <!-- Frame 21 -->
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

    <!-- Frame 22 -->
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

    <!-- Frame 23 -->
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

    <!-- Frame 24 -->
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

    <!-- Frame 25 -->
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

    <!-- Frame 26 -->
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

    <!-- Frame 27 -->
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

    <!-- Frame 28 -->
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

    <!-- Frame 29 -->
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

    <!-- Frame 30 -->
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

    <!-- Frame 31 -->
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

    <!-- Frame 32 -->
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

    <!-- Frame 33 -->
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

    <!-- Frame 34 -->
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

    <!-- Frame 35 -->
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

    <!-- Frame 36 -->
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

    <!-- Frame 37 -->
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

    <!-- Frame 38 -->
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

    <!-- Frame 39 -->
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

    <!-- Frame 40 -->
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

    <!-- Frame 41 -->
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

    <!-- Frame 42 -->
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

    <!-- Frame 43 -->
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

    <!-- Frame 44 -->
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

    <!-- Frame 45 -->
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

    <!-- Frame 46 -->
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

    <!-- Frame 47 -->
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

    <!-- Frame 48 -->
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

    <!-- Frame 49 -->
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

    <!-- Frame 50 -->
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

    <!-- Frame 51 -->
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

    <!-- Frame 52 -->
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

    <!-- Frame 53 -->
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

    <!-- Frame 54 -->
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

    <!-- Frame 55 -->
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

    <!-- Frame 56 -->
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

    <!-- Frame 57 -->
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

    <!-- Frame 58 -->
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

    <!-- Frame 59 -->
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

    <!-- Frame 60 -->
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
