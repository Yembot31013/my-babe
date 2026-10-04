/* ==========================================================================
   MAIN APPLICATION SCRIPT — INTERACTIONS & STORY FLOW
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // Elements
  const body = document.body;
  const envelopeScreen = document.getElementById('envelopeScreen');
  const envelopeBox = document.getElementById('envelopeBox');
  const waxSeal = document.getElementById('waxSeal');
  const reopenEnvelopeBtn = document.getElementById('reopenEnvelopeBtn');

  const musicToggleBtn = document.getElementById('musicToggleBtn');
  const musicLabel = document.getElementById('musicLabel');

  const topLoveBtn = document.getElementById('topLoveBtn');
  const giantLoveBtn = document.getElementById('giantLoveBtn');
  const loveCounter = document.getElementById('loveCounter');
  let currentLoveCount = 1000000;

  // Flowers Bloom Logic
  const flowerNodes = document.querySelectorAll('.flower-node');
  const bloomCountEl = document.getElementById('bloomCount');
  const allBloomedMsg = document.getElementById('allBloomedMsg');
  let bloomedCount = 0;

  // Secret Lockbox Logic
  const lockGraphic = document.getElementById('lockGraphic');
  const unlockPromiseBtn = document.getElementById('unlockPromiseBtn');
  const unlockBtnText = document.getElementById('unlockBtnText');
  const secretLetter = document.getElementById('secretLetter');
  let isUnlocked = false;

  // Tooltip Logic
  const poetTooltip = document.getElementById('poetTooltip');
  const tooltipContent = document.getElementById('tooltipContent');
  const poetHighlights = document.querySelectorAll('.poet-highlight');


  // ==========================================================================
  // 1. ENVELOPE OPENING EXPERIENCE
  // ==========================================================================
  function openEnvelope() {
    if (envelopeScreen.classList.contains('opened')) return;

    // Audio effects
    if (window.celestialAudio) {
      window.celestialAudio.playWaxSealSound();
      // Start ambient serenity music seamlessly
      setTimeout(() => {
        if (!window.celestialAudio.isPlaying) {
          window.celestialAudio.startAmbient();
          updateMusicUI(true);
        }
      }, 800);
    }

    // Shower of petals and hearts
    if (window.celestialParticles) {
      window.celestialParticles.triggerLoveShower(90);
    }

    // Add opened animation
    envelopeScreen.classList.add('opened');
    body.classList.remove('envelope-active');

    // Scroll to top of sanctuary
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function reopenEnvelope() {
    envelopeScreen.classList.remove('opened');
    body.classList.add('envelope-active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.celestialAudio) {
      window.celestialAudio.playChime(659.25, 1.2, 'sine');
    }
  }

  if (envelopeBox) {
    envelopeBox.addEventListener('click', openEnvelope);
    envelopeBox.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openEnvelope();
      }
    });
  }

  if (waxSeal) {
    waxSeal.addEventListener('click', (e) => {
      e.stopPropagation();
      openEnvelope();
    });
  }

  if (reopenEnvelopeBtn) {
    reopenEnvelopeBtn.addEventListener('click', reopenEnvelope);
  }


  // ==========================================================================
  // 2. AUDIO & MUSIC CONTROL
  // ==========================================================================
  function updateMusicUI(isPlaying) {
    if (isPlaying) {
      musicToggleBtn.classList.add('music-playing');
      musicLabel.textContent = 'Playing';
    } else {
      musicToggleBtn.classList.remove('music-playing');
      musicLabel.textContent = 'Serenade';
    }
  }

  if (musicToggleBtn) {
    musicToggleBtn.addEventListener('click', () => {
      if (window.celestialAudio) {
        const isNowPlaying = window.celestialAudio.toggleMusic();
        updateMusicUI(isNowPlaying);
      }
    });
  }


  // ==========================================================================
  // 3. FLOWER BOUQUET INTERACTION
  // ==========================================================================
  flowerNodes.forEach(flower => {
    flower.addEventListener('click', () => {
      const isBloomed = flower.classList.contains('bloomed');
      
      if (!isBloomed) {
        flower.classList.add('bloomed');
        bloomedCount++;
        bloomCountEl.textContent = bloomedCount;

        if (window.celestialAudio) {
          window.celestialAudio.playFlowerBloomSound();
        }
        if (window.celestialParticles) {
          window.celestialParticles.triggerLoveShower(25);
        }

        // Check if all bloomed
        if (bloomedCount === flowerNodes.length) {
          setTimeout(() => {
            allBloomedMsg.classList.add('active');
            if (window.celestialAudio) {
              window.celestialAudio.playWaxSealSound();
            }
            if (window.celestialParticles) {
              window.celestialParticles.triggerLoveShower(100);
            }
          }, 400);
        }
      } else {
        // Play soft chime on already bloomed
        if (window.celestialAudio) {
          window.celestialAudio.playChime(783.99, 0.8, 'sine');
        }
      }
    });
  });

  // Close bloom celebration modal
  const closeBloomModalBtn = document.getElementById('closeBloomModalBtn');
  const confirmBloomBtn = document.getElementById('confirmBloomBtn');

  function closeBloomModal() {
    if (allBloomedMsg) {
      allBloomedMsg.classList.remove('active');
    }
  }

  if (closeBloomModalBtn) {
    closeBloomModalBtn.addEventListener('click', closeBloomModal);
  }
  if (confirmBloomBtn) {
    confirmBloomBtn.addEventListener('click', closeBloomModal);
  }
  if (allBloomedMsg) {
    allBloomedMsg.addEventListener('click', (e) => {
      if (e.target === allBloomedMsg) {
        closeBloomModal();
      }
    });
  }


  // ==========================================================================
  // 4. SECRET LOCKBOX UNLOCKING
  // ==========================================================================
  const promiseTeaser = document.getElementById('promiseTeaser');

  function unlockSecretPromise() {
    if (isUnlocked) return;
    isUnlocked = true;

    lockGraphic.classList.add('unlocked');
    secretLetter.classList.add('active');
    unlockBtnText.textContent = 'Vow Revealed Forever';
    unlockPromiseBtn.style.opacity = '0.7';
    unlockPromiseBtn.style.pointerEvents = 'none';
    if (promiseTeaser) {
      promiseTeaser.style.display = 'none';
    }

    if (window.celestialAudio) {
      window.celestialAudio.playUnlockSound();
    }
    if (window.celestialParticles) {
      window.celestialParticles.triggerLoveShower(80);
    }
  }

  if (unlockPromiseBtn) {
    unlockPromiseBtn.addEventListener('click', unlockSecretPromise);
  }
  if (lockGraphic) {
    lockGraphic.addEventListener('click', unlockSecretPromise);
  }


  // ==========================================================================
  // 5. LOVE SHOWER BUTTONS (LINKED TO FLOWER FRENZY & LOVE PLENTY)
  // ==========================================================================
  function triggerLoveCelebration(e) {
    if (typeof onFrenzyTap === 'function') {
      onFrenzyTap(e);
    }
  }

  if (topLoveBtn) {
    topLoveBtn.addEventListener('click', triggerLoveCelebration);
    topLoveBtn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      triggerLoveCelebration(e.touches ? e.touches[0] : e);
    }, { passive: false });
  }

  if (giantLoveBtn) {
    giantLoveBtn.addEventListener('click', triggerLoveCelebration);
    giantLoveBtn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      triggerLoveCelebration(e.touches ? e.touches[0] : e);
    }, { passive: false });
  }


  // ==========================================================================
  // 6. POET HIGHLIGHTS & TOOLTIPS
  // ==========================================================================
  poetHighlights.forEach(hl => {
    const tip = hl.getAttribute('data-tooltip');

    hl.addEventListener('mouseenter', (e) => {
      showTooltip(e, tip);
      if (window.celestialAudio) {
        window.celestialAudio.playChime(880, 0.5, 'sine');
      }
    });

    hl.addEventListener('mousemove', (e) => {
      positionTooltip(e);
    });

    hl.addEventListener('mouseleave', () => {
      hideTooltip();
    });

    // Touch support for phones
    hl.addEventListener('click', (e) => {
      e.stopPropagation();
      showTooltip(e, tip);
      if (window.celestialAudio) {
        window.celestialAudio.playChime(880, 0.5, 'sine');
      }
    });
  });

  function showTooltip(e, text) {
    tooltipContent.textContent = text;
    poetTooltip.classList.add('active');
    positionTooltip(e);
  }

  function positionTooltip(e) {
    const rect = e.target.getBoundingClientRect();
    const tooltipWidth = poetTooltip.offsetWidth || 220;
    const padding = 16;
    let x = rect.left + rect.width / 2;

    // Clamp within mobile screen bounds
    const minX = tooltipWidth / 2 + padding;
    const maxX = window.innerWidth - tooltipWidth / 2 - padding;
    x = Math.max(minX, Math.min(x, maxX));

    let y = rect.top;
    if (y < 75) {
      y = rect.bottom + 12;
      poetTooltip.classList.add('tooltip-below');
    } else {
      poetTooltip.classList.remove('tooltip-below');
    }

    poetTooltip.style.left = `${x}px`;
    poetTooltip.style.top = `${y}px`;
  }

  function hideTooltip() {
    poetTooltip.classList.remove('active');
    poetTooltip.classList.remove('tooltip-below');
  }

  document.addEventListener('click', () => {
    hideTooltip();
  });


  // ==========================================================================
  // 7. FLOWER FRENZY & LOVE PLENTY (RAPID-TAP METER)
  // ==========================================================================
  const frenzyBtn = document.getElementById('frenzyBtn');
  const frenzyBadge = document.getElementById('frenzyBadge');
  const frenzyText = document.getElementById('frenzyText');
  const frenzyProgressCircle = document.getElementById('frenzyProgressCircle');
  const frenzyChargeLabel = document.getElementById('frenzyChargeLabel');
  const flowerSproutContainer = document.getElementById('flowerSproutContainer');

  const lovePlentyModal = document.getElementById('lovePlentyModal');
  const lovePlentyBackdrop = document.getElementById('lovePlentyBackdrop');
  const lovePlentyCloseBtn = document.getElementById('lovePlentyCloseBtn');
  const plentyShowerBtn = document.getElementById('plentyShowerBtn');
  const plentyContinueBtn = document.getElementById('plentyContinueBtn');

  let frenzyCharge = 0; // 0 to 100
  let lastTapTime = 0;
  let isCelebrationActive = false;
  let lastFrameTime = performance.now();

  // Flower emojis pool for floating DOM animations
  const flowerEmojiPool = ['🌸', '🌺', '🌹', '🌷', '💐', '🌼', '💖', '✨', '💕', '🤍'];

  // Spawn DOM floating flowers from specific screen coordinates
  function spawnDomFlowers(originX, originY, count = 4) {
    if (!flowerSproutContainer) return;

    for (let i = 0; i < count; i++) {
      const flower = document.createElement('span');
      flower.className = 'floating-flower-node';
      flower.textContent = flowerEmojiPool[Math.floor(Math.random() * flowerEmojiPool.length)];

      const size = Math.floor(Math.random() * 22 + 22); // 22px to 44px
      const duration = (Math.random() * 0.8 + 1.8).toFixed(2); // 1.8s to 2.6s
      const drift = Math.floor((Math.random() - 0.5) * 140); // -70px to +70px drift
      const rot = Math.floor((Math.random() - 0.5) * 120); // rotation

      flower.style.setProperty('--size', `${size}px`);
      flower.style.setProperty('--duration', `${duration}s`);
      flower.style.setProperty('--drift', `${drift}px`);
      flower.style.setProperty('--rot', `${rot}deg`);

      // Position near tap
      const startX = originX + (Math.random() - 0.5) * 40;
      const startY = originY + (Math.random() - 0.5) * 20;
      flower.style.left = `${startX}px`;
      flower.style.top = `${startY}px`;

      flowerSproutContainer.appendChild(flower);

      // Remove after animation completes
      setTimeout(() => {
        if (flower.parentNode) {
          flower.parentNode.removeChild(flower);
        }
      }, parseFloat(duration) * 1000 + 100);
    }
  }

  // Update SVG ring and text labels based on frenzyCharge
  function updateFrenzyUI() {
    // ONLY show when actively charging (frenzyCharge > 0); completely hidden at 0%
    if (flowerFrenzyWidget) {
      if (frenzyCharge > 0) {
        flowerFrenzyWidget.classList.add('active-charging');
      } else {
        flowerFrenzyWidget.classList.remove('active-charging');
      }
    }

    if (!frenzyProgressCircle || !frenzyChargeLabel) return;

    const isSmall = window.innerWidth <= 600;
    const circumference = isSmall ? 182.2 : 207.35;
    const offset = circumference * (1 - frenzyCharge / 100);

    frenzyProgressCircle.style.strokeDashoffset = offset;
    frenzyChargeLabel.textContent = `${Math.round(frenzyCharge)}%`;

    // Dynamic stroke color based on heat
    if (frenzyCharge > 75) {
      frenzyProgressCircle.style.stroke = '#ffd700'; // Gold
    } else if (frenzyCharge > 40) {
      frenzyProgressCircle.style.stroke = '#ff3366'; // Intense pink/rose
    } else {
      frenzyProgressCircle.style.stroke = '#ff6b8b';
    }

    // Badge text feedback
    if (frenzyBadge && frenzyText) {
      if (frenzyCharge <= 0) {
        frenzyText.textContent = 'Tap fast for Love Plenty! 🌸';
        frenzyBadge.classList.remove('charging');
        if (frenzyBtn) frenzyBtn.classList.remove('shaking');
      } else if (frenzyCharge < 25) {
        frenzyText.textContent = `Warming Up! 💖 ${Math.round(frenzyCharge)}%`;
        frenzyBadge.classList.add('charging');
        if (frenzyBtn) frenzyBtn.classList.remove('shaking');
      } else if (frenzyCharge < 55) {
        frenzyText.textContent = `Faster! Petals Rising! 🌺 ${Math.round(frenzyCharge)}%`;
        frenzyBadge.classList.add('charging');
        if (frenzyBtn) frenzyBtn.classList.remove('shaking');
      } else if (frenzyCharge < 85) {
        frenzyText.textContent = `Almost Overflowing! 🔥 ${Math.round(frenzyCharge)}%`;
        frenzyBadge.classList.add('charging');
        if (frenzyBtn) frenzyBtn.classList.add('shaking');
      } else {
        frenzyText.textContent = `BURSTING LOVE! KEEP GOING! 🎆 ${Math.round(frenzyCharge)}%`;
        frenzyBadge.classList.add('charging');
        if (frenzyBtn) frenzyBtn.classList.add('shaking');
      }
    }
  }

  // Helper to extract coordinates and target safely
  function getSafeTargetAndCoords(e) {
    let x = window.innerWidth - 65;
    let y = window.innerHeight - 50;
    let target = null;

    if (e) {
      if (e.touches && e.touches.length > 0) {
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
        target = e.target;
      } else if (e.clientX !== undefined && e.clientY !== undefined) {
        x = e.clientX;
        y = e.clientY;
        target = e.target || e.currentTarget;
      } else if (e.target) {
        target = e.target;
      }
    }
    return { x, y, target };
  }

  // Triggered on every rapid click (from floating flower button or Shower Love buttons)
  function onFrenzyTap(e) {
    if (isCelebrationActive) return;

    const now = performance.now();
    lastTapTime = now;

    // Increment love counter on every tap
    currentLoveCount += 1000;
    if (loveCounter) {
      loveCounter.textContent = currentLoveCount.toLocaleString();
    }

    // Gain charge: each quick tap adds 13%
    const prevCharge = frenzyCharge;
    frenzyCharge = Math.min(100, frenzyCharge + 13);
    const chargeRatio = frenzyCharge / 100;

    // Milestone thresholds feedback (25%, 50%, 75%)
    if (prevCharge < 25 && frenzyCharge >= 25) {
      if (window.celestialParticles) window.celestialParticles.spawnFloatingFlowers(window.innerWidth - 65, window.innerHeight - 50, 4);
    } else if (prevCharge < 50 && frenzyCharge >= 50) {
      if (window.celestialParticles) window.celestialParticles.spawnFloatingFlowers(window.innerWidth - 65, window.innerHeight - 50, 6);
    } else if (prevCharge < 75 && frenzyCharge >= 75) {
      if (window.celestialParticles) window.celestialParticles.spawnFloatingFlowers(window.innerWidth - 65, window.innerHeight - 50, 8);
    }

    // Determine bottom origin for flowers based on trigger button
    let startX = window.innerWidth - 65;
    let startY = window.innerHeight - 50;

    const { target } = getSafeTargetAndCoords(e);
    const isTopLove = target && target.closest && target.closest('#topLoveBtn');
    const isGiantLove = target && target.closest && target.closest('#giantLoveBtn');

    if (isTopLove) {
      // Top nav "Shower Love" button: flowers sprout upwards across bottom of screen
      startX = Math.random() * (window.innerWidth * 0.7) + (window.innerWidth * 0.15);
      startY = window.innerHeight - 30;
      if (topLoveBtn) {
        topLoveBtn.classList.add('pulse-tap');
        setTimeout(() => topLoveBtn.classList.remove('pulse-tap'), 180);
      }
    } else if (isGiantLove) {
      // Giant love section button: flowers sprout upwards from bottom center
      startX = window.innerWidth * 0.5 + (Math.random() - 0.5) * 160;
      startY = window.innerHeight - 30;
      if (giantLoveBtn) {
        giantLoveBtn.classList.add('pulse-tap');
        setTimeout(() => giantLoveBtn.classList.remove('pulse-tap'), 180);
      }
    } else if (frenzyBtn) {
      const rect = frenzyBtn.getBoundingClientRect();
      startX = rect.left + rect.width / 2;
      startY = rect.top + rect.height / 2;
    }

    // 1. Play ascending audio chime
    if (window.celestialAudio && typeof window.celestialAudio.playFlowerPop === 'function') {
      window.celestialAudio.playFlowerPop(chargeRatio);
    }

    // 2. Launch canvas particles
    if (window.celestialParticles && typeof window.celestialParticles.spawnFloatingFlowers === 'function') {
      window.celestialParticles.spawnFloatingFlowers(startX, startY, 6);
    }

    // 3. Spawn floating DOM flowers from bottom
    spawnDomFlowers(startX, startY, 5);

    // 4. Update UI
    updateFrenzyUI();

    // 5. Check if charged to max!
    if (frenzyCharge >= 100) {
      triggerLovePlentyCelebration();
    }
  }

  // The Grand "Love Plenty" celebration
  function triggerLovePlentyCelebration() {
    isCelebrationActive = true;
    frenzyCharge = 100;
    updateFrenzyUI();

    // Sound fanfare
    if (window.celestialAudio && typeof window.celestialAudio.playLovePlentyFanfare === 'function') {
      window.celestialAudio.playLovePlentyFanfare();
    }

    // Massive screen flower explosion
    if (window.celestialParticles && typeof window.celestialParticles.triggerLovePlentyBurst === 'function') {
      window.celestialParticles.triggerLovePlentyBurst();
      // Second staggered wave
      setTimeout(() => {
        if (window.celestialParticles) {
          window.celestialParticles.triggerLovePlentyBurst();
        }
      }, 700);
    }

    // Spawn multiple flower clusters across the bottom
    for (let offset = 0.15; offset <= 0.85; offset += 0.18) {
      setTimeout(() => {
        spawnDomFlowers(window.innerWidth * offset, window.innerHeight - 30, 8);
      }, offset * 400);
    }

    // Open Love Plenty Modal
    setTimeout(() => {
      if (lovePlentyModal) {
        lovePlentyModal.classList.add('active');
      }
    }, 450);

    // Reset charge smoothly after victory freeze
    setTimeout(() => {
      frenzyCharge = 0;
      updateFrenzyUI();
    }, 1200);
  }

  function closeLovePlentyModal() {
    if (lovePlentyModal) {
      lovePlentyModal.classList.remove('active');
    }
    isCelebrationActive = false;
    frenzyCharge = 0;
    updateFrenzyUI();
  }

  // Continuous loop: decays charge if user stops tapping
  function frenzyDecayLoop(time) {
    const dt = (time - lastFrameTime) / 1000;
    lastFrameTime = time;

    // Only decay if user has not tapped within the last 300ms and modal is not active
    if (!isCelebrationActive && time - lastTapTime > 300 && frenzyCharge > 0) {
      const decayRate = 22; // loses 22% per second
      frenzyCharge = Math.max(0, frenzyCharge - decayRate * dt);
      updateFrenzyUI();
    }

    requestAnimationFrame(frenzyDecayLoop);
  }
  requestAnimationFrame(frenzyDecayLoop);

  // Attach event listeners to entire flowerFrenzyWidget so every pixel is clickable
  if (flowerFrenzyWidget) {
    flowerFrenzyWidget.addEventListener('click', (e) => {
      onFrenzyTap(e);
    });
    flowerFrenzyWidget.addEventListener('touchstart', (e) => {
      e.preventDefault();
      const touch = e.touches && e.touches[0] ? e.touches[0] : e;
      onFrenzyTap(touch);
    }, { passive: false });
  }

  // Love Plenty Modal controls
  if (lovePlentyCloseBtn) {
    lovePlentyCloseBtn.addEventListener('click', closeLovePlentyModal);
  }
  if (lovePlentyBackdrop) {
    lovePlentyBackdrop.addEventListener('click', closeLovePlentyModal);
  }
  if (plentyContinueBtn) {
    plentyContinueBtn.addEventListener('click', closeLovePlentyModal);
  }
  if (plentyShowerBtn) {
    plentyShowerBtn.addEventListener('click', () => {
      if (window.celestialAudio && typeof window.celestialAudio.playLovePlentyFanfare === 'function') {
        window.celestialAudio.playLovePlentyFanfare();
      }
      if (window.celestialParticles && typeof window.celestialParticles.triggerLovePlentyBurst === 'function') {
        window.celestialParticles.triggerLovePlentyBurst();
      }
      spawnDomFlowers(window.innerWidth / 2, window.innerHeight - 80, 14);
    });
  }

});
