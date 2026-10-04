/* ==========================================================================
   PARTICLES SYSTEM — PETALS, STARDUST, CURSOR TRAIL & LOVE SHOWER
   Ultra-smooth canvas animation with delicate physics.
   ========================================================================== */

class CelestialParticles {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.petals = [];
    this.sparks = [];
    this.cursorTrail = [];
    this.loveShowerParticles = [];
    this.isMobile = window.innerWidth <= 768;
    this.maxPetals = this.isMobile ? 18 : 35;
    this.maxSparks = this.isMobile ? 22 : 40;
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());

    // Populate ambient petals
    for (let i = 0; i < this.maxPetals; i++) {
      this.petals.push(this.createPetal(true));
    }

    // Populate ambient stardust
    for (let i = 0; i < this.maxSparks; i++) {
      this.sparks.push(this.createSpark(true));
    }

    // Cursor & touch tracking
    window.addEventListener('mousemove', (e) => this.addCursorSparkle(e.clientX, e.clientY));
    
    // Mobile touch events
    window.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) {
        for (let i = 0; i < 3; i++) {
          this.addCursorSparkle(e.touches[0].clientX, e.touches[0].clientY);
        }
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        this.addCursorSparkle(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    // Start loop
    this.animate();
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  createPetal(randomY = false) {
    return {
      x: Math.random() * this.width,
      y: randomY ? Math.random() * this.height : -20,
      size: Math.random() * 10 + 9,
      speedY: Math.random() * 1.2 + 0.8,
      speedX: Math.random() * 1.5 - 0.75,
      angle: Math.random() * Math.PI * 2,
      angularSpeed: (Math.random() - 0.5) * 0.03,
      sway: Math.random() * 0.02 + 0.01,
      swayOffset: Math.random() * Math.PI * 2,
      opacity: Math.random() * 0.5 + 0.35,
      // Blush pink & peach shades
      color: Math.random() > 0.4 ? '#fca5bb' : '#ffd0de'
    };
  }

  createSpark(randomY = false) {
    return {
      x: Math.random() * this.width,
      y: randomY ? Math.random() * this.height : Math.random() * this.height,
      radius: Math.random() * 1.8 + 0.5,
      alpha: Math.random() * 0.8 + 0.2,
      speedAlpha: (Math.random() - 0.5) * 0.02,
      color: Math.random() > 0.5 ? '#ffd97d' : '#ffffff'
    };
  }

  addCursorSparkle(x, y) {
    if (this.cursorTrail.length > 30) return;
    this.cursorTrail.push({
      x: x + (Math.random() - 0.5) * 12,
      y: y + (Math.random() - 0.5) * 12,
      size: Math.random() * 8 + 6,
      alpha: 1,
      decay: Math.random() * 0.03 + 0.02,
      isHeart: Math.random() > 0.6,
      color: Math.random() > 0.5 ? '#f87295' : '#d4af37'
    });
  }

  triggerLoveShower(count = 70) {
    const emojis = ['💖', '💕', '🌸', '✨', '👑', '🌷', '🤍'];
    for (let i = 0; i < count; i++) {
      this.loveShowerParticles.push({
        x: Math.random() * this.width,
        y: this.height + 20 + Math.random() * 100,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        size: Math.random() * 22 + 18,
        speedY: -(Math.random() * 6 + 5),
        speedX: (Math.random() - 0.5) * 4,
        rotation: (Math.random() - 0.5) * 0.2,
        currentRotation: 0,
        alpha: 1
      });
    }
  }

  // Flower fountain rising from button coordinates or bottom
  spawnFloatingFlowers(originX, originY, count = 6) {
    const flowerEmojis = ['🌸', '🌺', '🌹', '🌷', '💐', '🌼', '💖', '✨', '💕'];
    const startX = originX !== undefined ? originX : (this.width - 60);
    const startY = originY !== undefined ? originY : (this.height - 60);

    for (let i = 0; i < count; i++) {
      this.loveShowerParticles.push({
        x: startX + (Math.random() - 0.5) * 35,
        y: startY + (Math.random() - 0.5) * 20,
        emoji: flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)],
        size: Math.random() * 20 + 20,
        speedY: -(Math.random() * 7 + 6.5),
        speedX: (Math.random() - 0.65) * 4.5,
        rotation: (Math.random() - 0.5) * 0.2,
        currentRotation: Math.random() * Math.PI,
        alpha: 1
      });
    }
  }

  // Grand Love Plenty celebration burst across entire screen
  triggerLovePlentyBurst() {
    const emojis = ['🌸', '🌺', '🌹', '🌷', '💐', '💖', '💕', '👑', '✨', '🥂', '🎉'];
    const total = this.isMobile ? 100 : 180;
    for (let i = 0; i < total; i++) {
      this.loveShowerParticles.push({
        x: Math.random() * this.width,
        y: this.height + 15 + Math.random() * 90,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        size: Math.random() * 26 + 18,
        speedY: -(Math.random() * 11 + 6.5),
        speedX: (Math.random() - 0.5) * 7,
        rotation: (Math.random() - 0.5) * 0.3,
        currentRotation: Math.random() * Math.PI,
        alpha: 1
      });
    }
  }

  drawPetal(p) {
    this.ctx.save();
    this.ctx.translate(p.x, p.y);
    this.ctx.rotate(p.angle);
    this.ctx.globalAlpha = p.opacity;

    this.ctx.beginPath();
    this.ctx.fillStyle = p.color;
    // Draw romantic petal curve
    this.ctx.moveTo(0, 0);
    this.ctx.bezierCurveTo(p.size / 2, -p.size / 2, p.size, 0, 0, p.size * 1.4);
    this.ctx.bezierCurveTo(-p.size, 0, -p.size / 2, -p.size / 2, 0, 0);
    this.ctx.fill();

    this.ctx.restore();
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // 1. Ambient Stardust
    for (let s of this.sparks) {
      s.alpha += s.speedAlpha;
      if (s.alpha <= 0.1 || s.alpha >= 0.9) s.speedAlpha *= -1;

      this.ctx.save();
      this.ctx.globalAlpha = s.alpha;
      this.ctx.fillStyle = s.color;
      this.ctx.shadowBlur = 6;
      this.ctx.shadowColor = s.color;
      this.ctx.beginPath();
      this.ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    // 2. Ambient Falling Petals
    for (let i = 0; i < this.petals.length; i++) {
      let p = this.petals[i];
      p.y += p.speedY;
      p.x += Math.sin(p.y * p.sway + p.swayOffset) * 1.2 + p.speedX;
      p.angle += p.angularSpeed;

      this.drawPetal(p);

      // Reset when below view
      if (p.y > this.height + 30 || p.x < -30 || p.x > this.width + 30) {
        this.petals[i] = this.createPetal(false);
      }
    }

    // 3. Cursor Stardust Trail
    for (let i = this.cursorTrail.length - 1; i >= 0; i--) {
      let c = this.cursorTrail[i];
      c.alpha -= c.decay;
      c.y -= 0.6;

      if (c.alpha <= 0) {
        this.cursorTrail.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = c.alpha;
      if (c.isHeart) {
        this.ctx.font = `${c.size}px serif`;
        this.ctx.fillText('💖', c.x, c.y);
      } else {
        this.ctx.fillStyle = c.color;
        this.ctx.shadowBlur = 8;
        this.ctx.shadowColor = c.color;
        this.ctx.beginPath();
        this.ctx.arc(c.x, c.y, c.size / 3, 0, Math.PI * 2);
        this.ctx.fill();
      }
      this.ctx.restore();
    }

    // 4. Love Shower Explosions
    for (let i = this.loveShowerParticles.length - 1; i >= 0; i--) {
      let lp = this.loveShowerParticles[i];
      lp.y += lp.speedY;
      lp.x += lp.speedX;
      lp.speedY += 0.08; // gravity
      lp.currentRotation += lp.rotation;

      // Start fading when descending
      if (lp.speedY > 0) {
        lp.alpha -= 0.015;
      }

      if (lp.alpha <= 0 || lp.y > this.height + 50) {
        this.loveShowerParticles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, lp.alpha);
      this.ctx.translate(lp.x, lp.y);
      this.ctx.rotate(lp.currentRotation);
      this.ctx.font = `${lp.size}px serif`;
      this.ctx.textAlign = 'center';
      this.ctx.fillText(lp.emoji, 0, 0);
      this.ctx.restore();
    }

    requestAnimationFrame(() => this.animate());
  }
}

// Instantiate particles when DOM loads
window.addEventListener('DOMContentLoaded', () => {
  window.celestialParticles = new CelestialParticles('magicCanvas');
});
