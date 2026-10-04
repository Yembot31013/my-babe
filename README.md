# Beyond Olympus — For Esther ✨

> *"For beauty may have once belonged to the gods... but it found its true home in you, Esther."*

An ethereal, interactive love letter and celestial tribute website designed specifically for **Esther**. Built with modern vanilla web technologies, a real-time Web Audio API synthesizer, custom canvas physics, and a rapid-tap **Flower Frenzy & "Love Plenty"** celebration engine.

---

## 🌟 Key Features

### 1. ✉️ Stage 1: The Interactive Wax-Sealed Envelope
- **3D Interactive Envelope**: A royal wax-sealed letter personalized with Esther's golden monogram (**"E"**).
- **Harp & Chime Unsealing**: Breaking the wax seal triggers an ascending crystalline harp sweep and an explosive shower of petals and starlight.
- **Seamless Sanctuary Transition**: Smoothly unseals the letter and transitions into the celestial sanctuary. Can be re-sealed and replayed anytime from the footer.

### 2. 🏛️ Stage 2: The Celestial Sanctuary
- **Cinematic Love Poem ("Beyond Olympus")**:
  - Divided into illuminated parchment stanzas comparing Esther's quiet smile to ancient Greek deities (*Aphrodite, Olympus, Homer's poetry*).
  - **Interactive Poetic Tooltips**: Hovering or tapping highlighted poetic phrases reveals secret affectionate annotations.
- **The Celestial Portrait & Aurora Spotlight**:
  - Framed portrait with dynamic glowing aurora rings and divine attributes (Eyes, Laugh, Quiet Smile).
- **Olympus vs. Esther Comparison Tablets**:
  - Four interactive comparison tablets exploring why cold marble temples and gold crowns pale in comparison to Esther’s sacred presence.
- **Enchanted Flower Bouquet**:
  - 5 interactive floral nodes (*Rose of Warmth, Peony of Radiance, Lily of Peace, Tulip of Joy, Star of Devotion*).
  - Tapping each flower blooms its secret love note and increments the bloom counter. Blooming all five unlocks a celebration modal.
- **The Secret Heart Lockbox**:
  - A permanent sealed vault containing an exclusive romantic vow to Esther that unlocks with crystalline bell chimes and particle fireworks.

### 3. 🌸 Flower Frenzy & "Love Plenty" Celebration Engine
- **Rapid-Click Frenzy Gauge**:
  - Fast, passionate tapping outpaces a decay engine to charge the Love Meter from 0% to 100%.
  - **Ascending Harmonic Audio**: Each tap plays a melodic chime whose musical pitch rises as the meter fills.
  - **Sprouting Flowers**: Every tap launches fluttering flower petals and hearts upwards from the bottom of the screen.
  - **Unified Multi-Button Controls**: Works seamlessly across the top-nav **"Shower Love"** button, the section **"Shower Esther With A Million Hearts!"** button, and the floating flower widget.
  - **Clean 0% Auto-Hide**: The floating widget stays 100% hidden when idle at 0% to keep the screen uncluttered, blooming into view as soon as love is showered.
- **Grand "LOVE PLENTY FOR ESTHER!" Modal**:
  - Reaching 100% triggers a full-screen flower fireworks eruption, multi-chord fanfare, and a royal celebration card dedicated to Esther's infinite love.

### 4. 🎶 Zero-Dependency Web Audio API Synthesizer (`audio.js`)
- **No external audio files or dependencies** — 100% synthesized in real time via the browser's native `AudioContext`.
- Soft ambient serenade chord progression (*Fmaj7 - G - Cmaj7 - Am7*).
- Crystalline bell chimes, envelope harp sweeps, ascending flower pops, and triumphant celebration fanfare.

### 5. ✨ Physics Particle Systems (`particles.js`)
- Ambient falling blush rose petals with sway physics and rotation.
- Soft twinkling stardust and ambient celestial glow.
- Interactive cursor & touch sparkle trail.
- Directional flower fountains and screen-filling celebration bursts.

### 6. 🎨 Luxury Aesthetic & Custom Scrollbar (`style.css`)
- **Curated Palette**: Soft blush pinks (`#fff5f8`, `#f87295`), radiant crimson (`#ee3b6a`), champagne gold (`#d4af37`), and lavender mist.
- **Typography**: Google Fonts pairing *Cinzel Decorative*, *Playfair Display*, *Alex Brush*, and *Plus Jakarta Sans*.
- **Custom Romantic Scrollbars**: 
  - Sleek, rounded 8px rose-gradient scrollbar for WebKit and Firefox across the entire site.
  - Inset 6px floating pill scrollbar for modals that never clips rounded golden borders.
- **Responsive & Touch-Optimized**: Crafted with `clamp()`, flexible layouts, and `touch-action: manipulation` for mobile, tablet, and desktop.

---

## 📁 Project Structure

```
├── index.html        # Main semantic markup, envelope, sanctuary & celebration modals
├── style.css         # Complete design system, animations, luxury scrollbars & responsive rules
├── script.js         # Core application logic, story flow, Love Plenty frenzy engine
├── audio.js          # Web Audio API real-time synthesizer & soundscapes
├── particles.js      # HTML5 Canvas particle physics, falling petals & fireworks
├── poet.txt          # Original poem transcript
├── assets/           # High-resolution generated celestial artwork and wax seal graphics
│   ├── envelope.jpg  # Wax-sealed envelope front texture
│   ├── portrait.jpg  # Celestial Esther portrait
│   └── sanctuary.jpg # Olympus backdrop
└── README.md         # Project documentation
```

---

## 🚀 Running Locally

No build tools or package managers required. Simply serve the directory with any local HTTP server:

### Option 1: Python
```bash
python3 -m http.server 5500
```
Open [http://localhost:5500](http://localhost:5500) in your browser.

### Option 2: Node.js (npx serve)
```bash
npx serve -l 5500
```

### Option 3: VS Code / IDE Live Server
Right-click `index.html` and select **"Open with Live Server"**.

---

## 💖 Made With Love
Crafted with boundless devotion for **Esther**. Love Plenty, always & forever. 🌸✨
