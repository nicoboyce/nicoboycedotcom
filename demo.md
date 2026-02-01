---
layout: blank
title: Flickbook Demo
---

<style>
  /* Long scroll container to give us scroll range */
  .flipbook-container {
    height: 3360vh;
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

  /* Flip eyes on every 8th frame along 120-degree axis */
  .frame:nth-child(8n+1) .eyes {
    transform: rotate(120deg) scaleX(-1) rotate(-120deg);
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

  /* Mug character parts positioning (following behind kettlephant) */
  .mug-body {
    position: absolute;
    top: 152px;
    left: 510.4px;
    width: 400px;
    z-index: 5;
  }

  .mug-eyes {
    position: absolute;
    top: 176px;
    left: 514.4px;
    width: 354px;
    z-index: 7;
  }

  .mug-pupils {
    position: absolute;
    top: 124px;
    left: 485.4px;
    width: 450px;
    z-index: 8;
    display: none;
  }

  /* Default: show center pupils */
  .frame .mug-pupils-c { display: block; }

  /* Every 5th frame starting at 5: show dot pupils */
  .frame:nth-child(10n+5) .mug-pupils-c { display: none; }
  .frame:nth-child(10n+5) .mug-pupils-dot { display: block; }

  /* Every 5th frame starting at 10: show x pupils */
  .frame:nth-child(10n) .mug-pupils-c { display: none; }
  .frame:nth-child(10n) .mug-pupils-x { display: block; }

  .mug-drip {
    position: absolute;
    top: 203px;
    left: 508.4px;
    width: 323px;
    z-index: 9;
  }

  .mug-coffee {
    position: absolute;
    top: 191px;
    left: 527.4px;
    width: 325px;
    z-index: 6;
    display: none;
  }

  /* Default: show coffee-1 */
  .frame .mug-coffee-1 { display: block; }

  /* Every 5th frame starting at 5: show coffee-2 */
  .frame:nth-child(10n+5) .mug-coffee-1 { display: none; }
  .frame:nth-child(10n+5) .mug-coffee-2 { display: block; }

  /* Every 5th frame starting at 10: show coffee-3 */
  .frame:nth-child(10n) .mug-coffee-1 { display: none; }
  .frame:nth-child(10n) .mug-coffee-3 { display: block; }

  .mug-legs {
    position: absolute;
    bottom: 262px;
    left: 529.4px;
    width: 344px;
    z-index: 3;
    display: none;
  }

  /* Cycle mug legs: r, 2, l, 4 */
  .frame:nth-child(4n+1) .mug-legs-r { display: block; }
  .frame:nth-child(4n+2) .mug-legs-2 { display: block; }
  .frame:nth-child(4n+3) .mug-legs-l { display: block; }
  .frame:nth-child(4n) .mug-legs-4 { display: block; }

  .mug-footprint {
    position: absolute;
    bottom: 200px;
    left: -200px;
    width: 150px;
    z-index: 2;
    display: none;
  }

  /* Frame-specific poses - Diagonal Pairs (from 0fbff34) */
  /* Frame 1 - Neutral */
  .frame-1 .leg.fl { transform: rotate(0deg); }
  .frame-1 .leg.fr { transform: rotate(0deg); }
  .frame-1 .leg.bl { transform: rotate(0deg); }
  .frame-1 .leg.br { transform: rotate(0deg); }
  .frame-1 .body { transform: translateX(-50%) translateY(0px); }
  .frame-1 .note { opacity: 0.3; transform: scale(0.8); }
  .frame-1 .mouth { transform: translateY(0px) scale(1); }

  /* Frame 2 - Start bend (FL+BR forward, FR+BL back) */
  .frame-2 .leg.fl { transform: rotate(-5deg); }
  .frame-2 .leg.fr { transform: rotate(5deg); }
  .frame-2 .leg.bl { transform: rotate(5deg); }
  .frame-2 .leg.br { transform: rotate(-5deg); }
  .frame-2 .body { transform: translateX(-50%) translateY(-3px); }
  .frame-2 .note { opacity: 0.4; transform: scale(0.9); }
  .frame-2 .mouth { transform: translateY(1px) scale(1.01); }

  /* Frame 3 - Deep bend */
  .frame-3 .leg.fl { transform: rotate(-10deg); }
  .frame-3 .leg.fr { transform: rotate(10deg); }
  .frame-3 .leg.bl { transform: rotate(10deg); }
  .frame-3 .leg.br { transform: rotate(-10deg); }
  .frame-3 .body { transform: translateX(-50%) translateY(-8px) scaleY(0.96); }
  .frame-3 .note { opacity: 0.5; transform: scale(1); }
  .frame-3 .mouth { transform: translateY(2px) scale(1.02); }

  /* Frame 4 - Return up */
  .frame-4 .leg.fl { transform: rotate(-5deg); }
  .frame-4 .leg.fr { transform: rotate(5deg); }
  .frame-4 .leg.bl { transform: rotate(5deg); }
  .frame-4 .leg.br { transform: rotate(-5deg); }
  .frame-4 .body { transform: translateX(-50%) translateY(-3px); }
  .frame-4 .note { opacity: 0.6; transform: scale(1.1); }
  .frame-4 .mouth { transform: translateY(1px) scale(1.01); }

  /* Frame 5 - Neutral stretch */
  .frame-5 .leg.fl { transform: rotate(0deg); }
  .frame-5 .leg.fr { transform: rotate(0deg); }
  .frame-5 .leg.bl { transform: rotate(0deg); }
  .frame-5 .leg.br { transform: rotate(0deg); }
  .frame-5 .body { transform: translateX(-50%) translateY(2px) scaleY(1.02); }
  .frame-5 .note { opacity: 0.7; transform: scale(1.2); }
  .frame-5 .mouth { transform: translateY(0px) scale(1); }

  /* Frame 6 - Opposite bend start (FR+BL forward, FL+BR back) */
  .frame-6 .leg.fl { transform: rotate(5deg); }
  .frame-6 .leg.fr { transform: rotate(-5deg); }
  .frame-6 .leg.bl { transform: rotate(-5deg); }
  .frame-6 .leg.br { transform: rotate(5deg); }
  .frame-6 .body { transform: translateX(-50%) translateY(-3px); }
  .frame-6 .note { opacity: 0.8; transform: scale(1.3); }
  .frame-6 .mouth { transform: translateY(1px) scale(1.02); }

  /* Frame 7 - Deep opposite bend */
  .frame-7 .leg.fl { transform: rotate(10deg); }
  .frame-7 .leg.fr { transform: rotate(-10deg); }
  .frame-7 .leg.bl { transform: rotate(-10deg); }
  .frame-7 .leg.br { transform: rotate(10deg); }
  .frame-7 .body { transform: translateX(-50%) translateY(-10px) scaleY(0.94); }
  .frame-7 .note { opacity: 1; transform: scale(1.4); }
  .frame-7 .mouth { transform: translateY(3px) scale(1.04); }

  /* Frame 8 - Return */
  .frame-8 .leg.fl { transform: rotate(5deg); }
  .frame-8 .leg.fr { transform: rotate(-5deg); }
  .frame-8 .leg.bl { transform: rotate(-5deg); }
  .frame-8 .leg.br { transform: rotate(5deg); }
  .frame-8 .body { transform: translateX(-50%) translateY(-3px); }
  .frame-8 .note { opacity: 0.8; transform: scale(1.2); }
  .frame-8 .mouth { transform: translateY(2px) scale(1.02); }

  /* Frame 9 - Neutral */
  .frame-9 .leg.fl { transform: rotate(0deg); }
  .frame-9 .leg.fr { transform: rotate(0deg); }
  .frame-9 .leg.bl { transform: rotate(0deg); }
  .frame-9 .leg.br { transform: rotate(0deg); }
  .frame-9 .body { transform: translateX(-50%) translateY(0px); }
  .frame-9 .note { opacity: 0.6; transform: scale(1); }
  .frame-9 .mouth { transform: translateY(0px) scale(1); }

  /* Frame 10 - Big bend start */
  .frame-10 .leg.fl { transform: rotate(-8deg); }
  .frame-10 .leg.fr { transform: rotate(8deg); }
  .frame-10 .leg.bl { transform: rotate(8deg); }
  .frame-10 .leg.br { transform: rotate(-8deg); }
  .frame-10 .body { transform: translateX(-50%) translateY(-5px) scaleY(0.97); }
  .frame-10 .note { opacity: 0.5; transform: scale(0.9); }
  .frame-10 .mouth { transform: translateY(1px) scale(1.02); }

  /* Frame 11 - Biggest bend */
  .frame-11 .leg.fl { transform: rotate(-15deg); }
  .frame-11 .leg.fr { transform: rotate(15deg); }
  .frame-11 .leg.bl { transform: rotate(15deg); }
  .frame-11 .leg.br { transform: rotate(-15deg); }
  .frame-11 .body { transform: translateX(-50%) translateY(-15px) scaleY(0.92); }
  .frame-11 .note { opacity: 1; transform: scale(1.5); }
  .frame-11 .mouth { transform: translateY(3px) scale(1.05); }

  /* Frame 12 - Return */
  .frame-12 .leg.fl { transform: rotate(-8deg); }
  .frame-12 .leg.fr { transform: rotate(8deg); }
  .frame-12 .leg.bl { transform: rotate(8deg); }
  .frame-12 .leg.br { transform: rotate(-8deg); }
  .frame-12 .body { transform: translateX(-50%) translateY(-5px); }
  .frame-12 .note { opacity: 0.7; transform: scale(1.2); }
  .frame-12 .mouth { transform: translateY(2px) scale(1.03); }

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

  /* Horizontal movement - right to left across 192 frames */
  .frame:nth-child(1) { left: calc(50% + 800.0px); }
  .frame:nth-child(2) { left: calc(50% + 792.7px); }
  .frame:nth-child(3) { left: calc(50% + 785.3px); }
  .frame:nth-child(4) { left: calc(50% + 778.0px); }
  .frame:nth-child(5) { left: calc(50% + 770.7px); }
  .frame:nth-child(6) { left: calc(50% + 763.4px); }
  .frame:nth-child(7) { left: calc(50% + 756.0px); }
  .frame:nth-child(8) { left: calc(50% + 748.7px); }
  .frame:nth-child(9) { left: calc(50% + 741.4px); }
  .frame:nth-child(10) { left: calc(50% + 734.0px); }
  .frame:nth-child(11) { left: calc(50% + 726.7px); }
  .frame:nth-child(12) { left: calc(50% + 719.4px); }
  .frame:nth-child(13) { left: calc(50% + 712.0px); }
  .frame:nth-child(14) { left: calc(50% + 704.7px); }
  .frame:nth-child(15) { left: calc(50% + 697.4px); }
  .frame:nth-child(16) { left: calc(50% + 690.1px); }
  .frame:nth-child(17) { left: calc(50% + 682.7px); }
  .frame:nth-child(18) { left: calc(50% + 675.4px); }
  .frame:nth-child(19) { left: calc(50% + 668.1px); }
  .frame:nth-child(20) { left: calc(50% + 660.7px); }
  .frame:nth-child(21) { left: calc(50% + 653.4px); }
  .frame:nth-child(22) { left: calc(50% + 646.1px); }
  .frame:nth-child(23) { left: calc(50% + 638.7px); }
  .frame:nth-child(24) { left: calc(50% + 631.4px); }
  .frame:nth-child(25) { left: calc(50% + 624.1px); }
  .frame:nth-child(26) { left: calc(50% + 616.8px); }
  .frame:nth-child(27) { left: calc(50% + 609.4px); }
  .frame:nth-child(28) { left: calc(50% + 602.1px); }
  .frame:nth-child(29) { left: calc(50% + 594.8px); }
  .frame:nth-child(30) { left: calc(50% + 587.4px); }
  .frame:nth-child(31) { left: calc(50% + 580.1px); }
  .frame:nth-child(32) { left: calc(50% + 572.8px); }
  .frame:nth-child(33) { left: calc(50% + 565.4px); }
  .frame:nth-child(34) { left: calc(50% + 558.1px); }
  .frame:nth-child(35) { left: calc(50% + 550.8px); }
  .frame:nth-child(36) { left: calc(50% + 543.5px); }
  .frame:nth-child(37) { left: calc(50% + 536.1px); }
  .frame:nth-child(38) { left: calc(50% + 528.8px); }
  .frame:nth-child(39) { left: calc(50% + 521.5px); }
  .frame:nth-child(40) { left: calc(50% + 514.1px); }
  .frame:nth-child(41) { left: calc(50% + 506.8px); }
  .frame:nth-child(42) { left: calc(50% + 499.5px); }
  .frame:nth-child(43) { left: calc(50% + 492.1px); }
  .frame:nth-child(44) { left: calc(50% + 484.8px); }
  .frame:nth-child(45) { left: calc(50% + 477.5px); }
  .frame:nth-child(46) { left: calc(50% + 470.2px); }
  .frame:nth-child(47) { left: calc(50% + 462.8px); }
  .frame:nth-child(48) { left: calc(50% + 455.5px); }
  .frame:nth-child(49) { left: calc(50% + 448.2px); }
  .frame:nth-child(50) { left: calc(50% + 440.8px); }
  .frame:nth-child(51) { left: calc(50% + 433.5px); }
  .frame:nth-child(52) { left: calc(50% + 426.2px); }
  .frame:nth-child(53) { left: calc(50% + 418.8px); }
  .frame:nth-child(54) { left: calc(50% + 411.5px); }
  .frame:nth-child(55) { left: calc(50% + 404.2px); }
  .frame:nth-child(56) { left: calc(50% + 396.9px); }
  .frame:nth-child(57) { left: calc(50% + 389.5px); }
  .frame:nth-child(58) { left: calc(50% + 382.2px); }
  .frame:nth-child(59) { left: calc(50% + 374.9px); }
  .frame:nth-child(60) { left: calc(50% + 367.5px); }
  .frame:nth-child(61) { left: calc(50% + 360.2px); }
  .frame:nth-child(62) { left: calc(50% + 352.9px); }
  .frame:nth-child(63) { left: calc(50% + 345.5px); }
  .frame:nth-child(64) { left: calc(50% + 338.2px); }
  .frame:nth-child(65) { left: calc(50% + 330.9px); }
  .frame:nth-child(66) { left: calc(50% + 323.6px); }
  .frame:nth-child(67) { left: calc(50% + 316.2px); }
  .frame:nth-child(68) { left: calc(50% + 308.9px); }
  .frame:nth-child(69) { left: calc(50% + 301.6px); }
  .frame:nth-child(70) { left: calc(50% + 294.2px); }
  .frame:nth-child(71) { left: calc(50% + 286.9px); }
  .frame:nth-child(72) { left: calc(50% + 279.6px); }
  .frame:nth-child(73) { left: calc(50% + 272.3px); }
  .frame:nth-child(74) { left: calc(50% + 264.9px); }
  .frame:nth-child(75) { left: calc(50% + 257.6px); }
  .frame:nth-child(76) { left: calc(50% + 250.3px); }
  .frame:nth-child(77) { left: calc(50% + 242.9px); }
  .frame:nth-child(78) { left: calc(50% + 235.6px); }
  .frame:nth-child(79) { left: calc(50% + 228.3px); }
  .frame:nth-child(80) { left: calc(50% + 220.9px); }
  .frame:nth-child(81) { left: calc(50% + 213.6px); }
  .frame:nth-child(82) { left: calc(50% + 206.3px); }
  .frame:nth-child(83) { left: calc(50% + 199.0px); }
  .frame:nth-child(84) { left: calc(50% + 191.6px); }
  .frame:nth-child(85) { left: calc(50% + 184.3px); }
  .frame:nth-child(86) { left: calc(50% + 177.0px); }
  .frame:nth-child(87) { left: calc(50% + 169.6px); }
  .frame:nth-child(88) { left: calc(50% + 162.3px); }
  .frame:nth-child(89) { left: calc(50% + 155.0px); }
  .frame:nth-child(90) { left: calc(50% + 147.6px); }
  .frame:nth-child(91) { left: calc(50% + 140.3px); }
  .frame:nth-child(92) { left: calc(50% + 133.0px); }
  .frame:nth-child(93) { left: calc(50% + 125.7px); }
  .frame:nth-child(94) { left: calc(50% + 118.3px); }
  .frame:nth-child(95) { left: calc(50% + 111.0px); }
  .frame:nth-child(96) { left: calc(50% + 103.7px); }
  .frame:nth-child(97) { left: calc(50% + 96.3px); }
  .frame:nth-child(98) { left: calc(50% + 89.0px); }
  .frame:nth-child(99) { left: calc(50% + 81.7px); }
  .frame:nth-child(100) { left: calc(50% + 74.3px); }
  .frame:nth-child(101) { left: calc(50% + 67.0px); }
  .frame:nth-child(102) { left: calc(50% + 59.7px); }
  .frame:nth-child(103) { left: calc(50% + 52.4px); }
  .frame:nth-child(104) { left: calc(50% + 45.0px); }
  .frame:nth-child(105) { left: calc(50% + 37.7px); }
  .frame:nth-child(106) { left: calc(50% + 30.4px); }
  .frame:nth-child(107) { left: calc(50% + 23.0px); }
  .frame:nth-child(108) { left: calc(50% + 15.7px); }
  .frame:nth-child(109) { left: calc(50% + 8.4px); }
  .frame:nth-child(110) { left: calc(50% + 1.0px); }
  .frame:nth-child(111) { left: calc(50% + -6.3px); }
  .frame:nth-child(112) { left: calc(50% + -13.6px); }
  .frame:nth-child(113) { left: calc(50% + -20.9px); }
  .frame:nth-child(114) { left: calc(50% + -28.3px); }
  .frame:nth-child(115) { left: calc(50% + -35.6px); }
  .frame:nth-child(116) { left: calc(50% + -42.9px); }
  .frame:nth-child(117) { left: calc(50% + -50.3px); }
  .frame:nth-child(118) { left: calc(50% + -57.6px); }
  .frame:nth-child(119) { left: calc(50% + -64.9px); }
  .frame:nth-child(120) { left: calc(50% + -72.3px); }
  .frame:nth-child(121) { left: calc(50% + -79.6px); }
  .frame:nth-child(122) { left: calc(50% + -86.9px); }
  .frame:nth-child(123) { left: calc(50% + -94.2px); }
  .frame:nth-child(124) { left: calc(50% + -101.6px); }
  .frame:nth-child(125) { left: calc(50% + -108.9px); }
  .frame:nth-child(126) { left: calc(50% + -116.2px); }
  .frame:nth-child(127) { left: calc(50% + -123.6px); }
  .frame:nth-child(128) { left: calc(50% + -130.9px); }
  .frame:nth-child(129) { left: calc(50% + -138.2px); }
  .frame:nth-child(130) { left: calc(50% + -145.5px); }
  .frame:nth-child(131) { left: calc(50% + -152.9px); }
  .frame:nth-child(132) { left: calc(50% + -160.2px); }
  .frame:nth-child(133) { left: calc(50% + -167.5px); }
  .frame:nth-child(134) { left: calc(50% + -174.9px); }
  .frame:nth-child(135) { left: calc(50% + -182.2px); }
  .frame:nth-child(136) { left: calc(50% + -189.5px); }
  .frame:nth-child(137) { left: calc(50% + -196.9px); }
  .frame:nth-child(138) { left: calc(50% + -204.2px); }
  .frame:nth-child(139) { left: calc(50% + -211.5px); }
  .frame:nth-child(140) { left: calc(50% + -218.8px); }
  .frame:nth-child(141) { left: calc(50% + -226.2px); }
  .frame:nth-child(142) { left: calc(50% + -233.5px); }
  .frame:nth-child(143) { left: calc(50% + -240.8px); }
  .frame:nth-child(144) { left: calc(50% + -248.2px); }
  .frame:nth-child(145) { left: calc(50% + -255.5px); }
  .frame:nth-child(146) { left: calc(50% + -262.8px); }
  .frame:nth-child(147) { left: calc(50% + -270.2px); }
  .frame:nth-child(148) { left: calc(50% + -277.5px); }
  .frame:nth-child(149) { left: calc(50% + -284.8px); }
  .frame:nth-child(150) { left: calc(50% + -292.1px); }
  .frame:nth-child(151) { left: calc(50% + -299.5px); }
  .frame:nth-child(152) { left: calc(50% + -306.8px); }
  .frame:nth-child(153) { left: calc(50% + -314.1px); }
  .frame:nth-child(154) { left: calc(50% + -321.5px); }
  .frame:nth-child(155) { left: calc(50% + -328.8px); }
  .frame:nth-child(156) { left: calc(50% + -336.1px); }
  .frame:nth-child(157) { left: calc(50% + -343.5px); }
  .frame:nth-child(158) { left: calc(50% + -350.8px); }
  .frame:nth-child(159) { left: calc(50% + -358.1px); }
  .frame:nth-child(160) { left: calc(50% + -365.4px); }
  .frame:nth-child(161) { left: calc(50% + -372.8px); }
  .frame:nth-child(162) { left: calc(50% + -380.1px); }
  .frame:nth-child(163) { left: calc(50% + -387.4px); }
  .frame:nth-child(164) { left: calc(50% + -394.8px); }
  .frame:nth-child(165) { left: calc(50% + -402.1px); }
  .frame:nth-child(166) { left: calc(50% + -409.4px); }
  .frame:nth-child(167) { left: calc(50% + -416.8px); }
  .frame:nth-child(168) { left: calc(50% + -424.1px); }
  .frame:nth-child(169) { left: calc(50% + -431.4px); }
  .frame:nth-child(170) { left: calc(50% + -438.7px); }
  .frame:nth-child(171) { left: calc(50% + -446.1px); }
  .frame:nth-child(172) { left: calc(50% + -453.4px); }
  .frame:nth-child(173) { left: calc(50% + -460.7px); }
  .frame:nth-child(174) { left: calc(50% + -468.1px); }
  .frame:nth-child(175) { left: calc(50% + -475.4px); }
  .frame:nth-child(176) { left: calc(50% + -482.7px); }
  .frame:nth-child(177) { left: calc(50% + -490.1px); }
  .frame:nth-child(178) { left: calc(50% + -497.4px); }
  .frame:nth-child(179) { left: calc(50% + -504.7px); }
  .frame:nth-child(180) { left: calc(50% + -512.0px); }
  .frame:nth-child(181) { left: calc(50% + -519.4px); }
  .frame:nth-child(182) { left: calc(50% + -526.7px); }
  .frame:nth-child(183) { left: calc(50% + -534.0px); }
  .frame:nth-child(184) { left: calc(50% + -541.4px); }
  .frame:nth-child(185) { left: calc(50% + -548.7px); }
  .frame:nth-child(186) { left: calc(50% + -556.0px); }
  .frame:nth-child(187) { left: calc(50% + -563.4px); }
  .frame:nth-child(188) { left: calc(50% + -570.7px); }
  .frame:nth-child(189) { left: calc(50% + -578.0px); }
  .frame:nth-child(190) { left: calc(50% + -585.3px); }
  .frame:nth-child(191) { left: calc(50% + -592.7px); }
  .frame:nth-child(192) { left: calc(50% + -600.0px); }
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 61 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 62 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 63 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 64 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 65 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 66 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 67 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 68 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 69 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 70 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 71 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 72 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 73 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 74 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 75 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 76 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 77 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 78 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 79 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 80 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 81 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 82 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 83 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 84 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 85 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 86 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 87 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 88 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 89 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 90 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 91 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 92 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 93 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 94 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 95 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 96 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 97 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 98 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 99 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 100 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 101 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 102 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 103 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 104 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 105 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 106 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 107 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 108 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 109 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 110 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 111 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 112 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 113 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 114 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 115 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 116 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 117 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 118 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 119 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 120 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 121 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 122 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 123 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 124 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 125 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 126 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 127 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 128 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 129 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 130 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 131 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 132 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 133 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 134 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 135 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 136 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 137 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 138 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 139 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 140 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 141 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 142 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 143 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 144 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 145 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 146 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 147 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 148 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 149 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 150 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 151 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 152 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 153 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 154 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 155 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 156 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 157 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 158 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 159 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 160 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 161 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 162 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 163 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 164 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 165 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 166 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 167 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 168 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 169 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 170 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 171 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 172 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 173 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 174 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 175 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 176 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 177 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 178 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 179 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 180 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 181 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 182 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 183 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 184 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 185 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 186 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 187 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 188 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 189 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 190 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 191 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
    </div>

    <!-- Frame 192 -->
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
      <img src="/public/svg/mug-mug.svg" class="mug-body">
      <img src="/public/svg/mug-eyes.svg" class="mug-eyes">
      <img src="/public/svg/mug-pupils-c.svg" class="mug-pupils mug-pupils-c">
      <img src="/public/svg/mug-pupils-dot.svg" class="mug-pupils mug-pupils-dot">
      <img src="/public/svg/mug-pupils-x.svg" class="mug-pupils mug-pupils-x">
      <img src="/public/svg/mug-drip.svg" class="mug-drip">
      <img src="/public/svg/mug-coffee-1.svg" class="mug-coffee mug-coffee-1">
      <img src="/public/svg/mug-coffee-2.svg" class="mug-coffee mug-coffee-2">
      <img src="/public/svg/mug-coffee-3.svg" class="mug-coffee mug-coffee-3">
      <img src="/public/svg/mug-legs-r.svg" class="mug-legs mug-legs-r">
      <img src="/public/svg/mug-legs-2.svg" class="mug-legs mug-legs-2">
      <img src="/public/svg/mug-legs-l.svg" class="mug-legs mug-legs-l">
      <img src="/public/svg/mug-legs-4.svg" class="mug-legs mug-legs-4">
      <img src="/public/svg/mug-footprint.svg" class="mug-footprint">
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
