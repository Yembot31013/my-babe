/* ==========================================================================
   WEB AUDIO API ROMANTIC SYNTHESIZER
   Zero external dependencies, instant ethereal soundscapes & chimes.
   ========================================================================== */

class CelestialAudio {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.ambientTimer = null;
    this.currentStep = 0;
    
    // Romantic chords progression (Fmaj7 - G - Cmaj7 - Am7) in MIDI/frequency
    this.chordProgression = [
      [349.23, 440.00, 523.25, 659.25], // F4, A4, C5, E5 (Fmaj7)
      [392.00, 493.88, 587.33, 783.99], // G4, B4, D5, G5 (G)
      [261.63, 329.63, 392.00, 493.88], // C4, E4, G4, B4 (Cmaj7)
      [220.00, 261.63, 329.63, 440.00]  // A3, C4, E4, A4 (Am7)
    ];

    // Master volume gain
    this.masterGain = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play a single crystalline harp / bell chime
  playChime(freq = 523.25, duration = 1.2, type = 'sine') {
    this.init();
    const now = this.ctx.currentTime;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);

    // Warm envelope
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.3, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + duration);
  }

  // Play envelope unsealing sound (lush harp sweep + chime)
  playWaxSealSound() {
    this.init();
    const notes = [440, 523.25, 659.25, 783.99, 880, 1046.5];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playChime(freq, 1.8, 'triangle');
      }, idx * 90);
    });
  }

  // Sound for flower blooming
  playFlowerBloomSound() {
    this.init();
    const notes = [587.33, 739.99, 880];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playChime(freq, 1.4, 'sine');
      }, idx * 120);
    });
  }

  // Sound for secret lockbox
  playUnlockSound() {
    this.init();
    const notes = [392, 523.25, 659.25, 1046.5];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playChime(freq, 2.0, 'triangle');
      }, idx * 140);
    });
  }

  // Sound for Shower of Love
  playLoveShowerSound() {
    this.init();
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playChime(freq, 1.5, 'sine');
      }, idx * 70);
    });
  }

  // Rapid flower pop with ascending pitch based on charge ratio (0 to 1)
  playFlowerPop(chargeRatio = 0) {
    this.init();
    const now = this.ctx.currentTime;
    
    // Musical scale steps: C5, D5, E5, G5, A5, C6, D6, E6, G6
    const scale = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50, 1174.66, 1318.51, 1567.98];
    const index = Math.min(scale.length - 1, Math.floor(chargeRatio * scale.length));
    const baseFreq = scale[index] + (Math.random() * 20 - 10);

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = chargeRatio > 0.7 ? 'triangle' : 'sine';
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.15, now + 0.08);

    // Dynamic volume & crisp pop envelope
    const peakVolume = 0.22 + chargeRatio * 0.12;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(peakVolume, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.32);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.34);
  }

  // Triumphant Love Plenty fanfare
  playLovePlentyFanfare() {
    this.init();
    const arpeggio = [
      { freq: 523.25, delay: 0 },
      { freq: 659.25, delay: 90 },
      { freq: 783.99, delay: 180 },
      { freq: 1046.50, delay: 270 },
      { freq: 1318.51, delay: 370 },
      { freq: 1567.98, delay: 480 },
      { freq: 2093.00, delay: 600 }
    ];

    arpeggio.forEach(item => {
      setTimeout(() => {
        this.playChime(item.freq, 2.2, 'triangle');
      }, item.delay);
    });

    // Warm resonant chord backdrop
    setTimeout(() => {
      [261.63, 329.63, 392.00, 523.25].forEach(f => {
        this.playChime(f, 3.8, 'sine');
      });
    }, 320);
  }

  // Soft ambient serenade loop
  startAmbient() {
    this.init();
    this.isPlaying = true;
    this.currentStep = 0;

    const playNextChord = () => {
      if (!this.isPlaying) return;

      const chord = this.chordProgression[this.currentStep % this.chordProgression.length];
      this.currentStep++;

      // Arpeggiate chord notes softly
      chord.forEach((freq, i) => {
        setTimeout(() => {
          if (!this.isPlaying) return;
          const now = this.ctx.currentTime;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now);

          gain.gain.setValueAtTime(0.0001, now);
          gain.gain.exponentialRampToValueAtTime(0.12, now + 0.3);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

          osc.connect(gain);
          gain.connect(this.masterGain);

          osc.start(now);
          osc.stop(now + 3.4);
        }, i * 380);
      });

      // Next chord in 3.6 seconds
      this.ambientTimer = setTimeout(playNextChord, 3600);
    };

    playNextChord();
  }

  stopAmbient() {
    this.isPlaying = false;
    if (this.ambientTimer) {
      clearTimeout(this.ambientTimer);
      this.ambientTimer = null;
    }
  }

  toggleMusic() {
    if (this.isPlaying) {
      this.stopAmbient();
      return false;
    } else {
      this.startAmbient();
      return true;
    }
  }
}

// Global instance
window.celestialAudio = new CelestialAudio();
