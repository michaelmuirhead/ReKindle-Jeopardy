/* Web Audio API sound effects — no external assets required */

let ctx = null;

function getCtx() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
  // Resume if suspended (browser autoplay policy)
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

function tone(freq, duration, type = "sine", gain = 0.4, startDelay = 0) {
  const c = getCtx();
  const osc = c.createOscillator();
  const vol = c.createGain();
  osc.connect(vol);
  vol.connect(c.destination);
  osc.type = type;
  osc.frequency.setValueAtTime(freq, c.currentTime + startDelay);
  vol.gain.setValueAtTime(gain, c.currentTime + startDelay);
  vol.gain.exponentialRampToValueAtTime(0.001, c.currentTime + startDelay + duration);
  osc.start(c.currentTime + startDelay);
  osc.stop(c.currentTime + startDelay + duration + 0.05);
}

export const sounds = {
  cellSelect() {
    tone(440, 0.08, "sine", 0.25, 0);
    tone(880, 0.08, "sine", 0.15, 0.07);
  },

  dailyDouble() {
    // Ascending fanfare: D5 → G5 → D6
    tone(587, 0.18, "triangle", 0.5, 0);
    tone(784, 0.18, "triangle", 0.5, 0.2);
    tone(1175, 0.5,  "triangle", 0.5, 0.4);
  },

  revealAnswer() {
    tone(880, 0.12, "sine", 0.3, 0);
    tone(1100, 0.18, "sine", 0.25, 0.1);
  },

  correct() {
    // C – E – G ascending arpeggio
    tone(523, 0.1, "sine", 0.4, 0);
    tone(659, 0.1, "sine", 0.4, 0.09);
    tone(784, 0.22, "sine", 0.4, 0.18);
  },

  wrong() {
    // Descending buzz
    tone(220, 0.12, "sawtooth", 0.3, 0);
    tone(185, 0.12, "sawtooth", 0.3, 0.1);
    tone(150, 0.22, "sawtooth", 0.2, 0.2);
  },

  finalReveal() {
    // Dramatic descend then sustain
    tone(1047, 0.22, "triangle", 0.45, 0);
    tone(784,  0.22, "triangle", 0.45, 0.24);
    tone(659,  0.22, "triangle", 0.45, 0.48);
    tone(523,  0.9,  "triangle", 0.4,  0.72);
  },

  winner() {
    // Four-note fanfare then held chord
    const run = [523, 659, 784, 1047];
    run.forEach((f, i) => tone(f, 0.22, "triangle", 0.45, i * 0.16));
    tone(523, 0.8, "sine", 0.25, 0.72);
    tone(659, 0.8, "sine", 0.25, 0.72);
    tone(784, 0.8, "sine", 0.25, 0.72);
  },
};
