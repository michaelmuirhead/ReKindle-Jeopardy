import { useState, useEffect } from "react";



/* ── Data ── */
const CATEGORIES = [
  "Characters",
  "Life of Jesus",
  "Miracles",
  "Women of the Bible",
  "Numbers & Facts",
  "The Early Church",
];

const QUESTIONS = {
  "Characters": {
    200:  { q: "This man was swallowed by a great fish after running from God's call.", a: "Jonah" },
    400:  { q: "He was Israel's first king — chosen by God but later rejected for his disobedience.", a: "King Saul" },
    600:  { q: "This man wrestled with God all night and walked away with both a limp and a brand new name.", a: "Jacob (Israel)" },
    800:  { q: "He was sold into slavery by his own brothers but rose to become second-in-command of all Egypt.", a: "Joseph" },
    1000: { q: "This prophet called down fire from heaven on Mount Carmel to defeat 450 false prophets.", a: "Elijah" },
  },
  "Life of Jesus": {
    200:  { q: "In what town was Jesus born?", a: "Bethlehem" },
    400:  { q: "What was Jesus' very first recorded miracle?", a: "Turning water into wine (wedding at Cana)" },
    600:  { q: "Jesus fasted for how many days in the wilderness before being tempted by Satan?", a: "40 days" },
    800:  { q: "What did Jesus say when He was 12 and His parents found Him in the temple?", a: "That He must be about His Father's business (Luke 2:49)" },
    1000: { q: "Name the three disciples Jesus took with Him to the Garden of Gethsemane the night He was arrested.", a: "Peter, James, and John" },
  },
  "Miracles": {
    200:  { q: "Jesus fed over 5,000 people with this tiny meal.", a: "5 loaves and 2 fish" },
    400:  { q: "Jesus raised this man from the dead after he had already been in the tomb for four days.", a: "Lazarus" },
    600:  { q: "God parted this body of water so Moses and the Israelites could escape Egypt on dry ground.", a: "The Red Sea" },
    800:  { q: "Peter walked on water briefly — but sank when he did this one thing. What was it?", a: "He took his eyes off Jesus and looked at the storm (he doubted)" },
    1000: { q: "What miracle did Elisha perform for a widow involving jars of oil?", a: "He multiplied her small amount of oil to fill every jar she had (2 Kings 4)" },
  },
  "Women of the Bible": {
    200:  { q: "This woman said 'wherever you go, I will go' to her mother-in-law.", a: "Ruth" },
    400:  { q: "She was the first person to speak to Jesus after His resurrection.", a: "Mary Magdalene" },
    600:  { q: "This queen risked her life approaching the king uninvited to save her people from genocide.", a: "Esther" },
    800:  { q: "She was the first woman judge in Israel and led an army to a great victory.", a: "Deborah" },
    1000: { q: "This woman in the early church was struck dead for lying about how much money she gave to God.", a: "Sapphira (Acts 5)" },
  },
  "Numbers & Facts": {
    200:  { q: "How many days and nights did it rain during Noah's flood?", a: "40 days and 40 nights" },
    400:  { q: "How many books are in the entire Bible?", a: "66 books" },
    600:  { q: "How many disciples did Jesus choose?", a: "12" },
    800:  { q: "How many plagues did God send on Egypt before Pharaoh let the Israelites go?", a: "10 plagues" },
    1000: { q: "Methuselah is the oldest person in the Bible. How old was he when he died?", a: "969 years old (Genesis 5:27)" },
  },
  "The Early Church": {
    200:  { q: "On what special day did the Holy Ghost first fall on the disciples in the upper room?", a: "Pentecost (Acts 2)" },
    400:  { q: "This man held the coats of those who stoned Stephen — and later became the greatest missionary in history.", a: "Saul (Paul)" },
    600:  { q: "Peter and John told a lame man they had no silver or gold. What did they give him instead?", a: "Healing in the name of Jesus Christ (Acts 3:6)" },
    800:  { q: "An angel freed this apostle from prison the night before his scheduled execution while believers prayed.", a: "Peter (Acts 12)" },
    1000: { q: "What was the name of the city where followers of Jesus were first called 'Christians'?", a: "Antioch (Acts 11:26)" },
  },
};

const POINT_VALUES = [200, 400, 600, 800, 1000];
const TEAM_COLORS = ["#06b6d4", "#f43f5e", "#a3e635", "#f97316"];
const TEAM_BG = ["rgba(6,182,212,0.18)", "rgba(244,63,94,0.18)", "rgba(163,230,53,0.18)", "rgba(249,115,22,0.18)"];

/* ── Helpers ── */
function dollar(n) { return `$${n}`; }

/* ── Shimmer animation injected once ── */
const styleEl = document.createElement("style");
styleEl.textContent = `
  @keyframes shimmer {
    0%   { background-position: -800px 0; }
    100% { background-position:  800px 0; }
  }
  @keyframes cellPulse {
    0%,100% { box-shadow: inset 0 0 0px rgba(255,200,0,0); }
    50%      { box-shadow: inset 0 0 24px rgba(255,200,0,0.15); }
  }
  @keyframes boardIn {
    from { opacity:0; transform: scale(0.97); }
    to   { opacity:1; transform: scale(1); }
  }
  @keyframes qSlide {
    from { opacity:0; transform: translateY(30px); }
    to   { opacity:1; transform: translateY(0); }
  }
  @keyframes ddPulse {
    0%,100% { text-shadow: 0 0 20px #ffd700, 0 0 40px #ffd700; }
    50%     { text-shadow: 0 0 60px #ffd700, 0 0 100px #ffaa00; }
  }
  @keyframes answerReveal {
    from { opacity:0; transform: scaleY(0.6); }
    to   { opacity:1; transform: scaleY(1); }
  }
  @keyframes winnerGlow {
    0%,100% { text-shadow: 0 0 30px #ffd700, 0 0 60px #ffd700; }
    50%     { text-shadow: 0 0 80px #ffd700, 0 0 140px #ffaa00; }
  }
  .cell-hover:hover {
    filter: brightness(1.18) !important;
    transform: scale(1.03) !important;
    z-index: 2;
    cursor: pointer;
  }
  .reveal-hover:hover { filter: brightness(1.15); transform: scale(1.02); }
  .award-hover:hover  { filter: brightness(1.2);  transform: scale(1.04); }
  * { box-sizing: border-box; }
`;
document.head.appendChild(styleEl);

/* ══════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════ */
export default function BibleJeopardy() {
  const [teams, setTeams]       = useState([{ name: "Team 1", score: 0 }, { name: "Team 2", score: 0 }]);
  const [numTeams, setNumTeams] = useState(2);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [used, setUsed]         = useState({});
  const [screen, setScreen]     = useState("setup");
  const [winner, setWinner]     = useState(null);
  const [dailyDouble, setDailyDouble] = useState(null);
  const [ddPhase, setDdPhase]   = useState(false); // show DD card before question

  const initDD = () => {
    const cat = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
    const pts = POINT_VALUES[2 + Math.floor(Math.random() * 3)]; // 600–1000
    return `${cat}-${pts}`;
  };

  const startGame = () => { setDailyDouble(initDD()); setScreen("board"); };

  const selectQuestion = (cat, pts) => {
    const key = `${cat}-${pts}`;
    if (used[key]) return;
    const isDD = key === dailyDouble;
    setSelected({ cat, pts, key });
    setRevealed(false);
    if (isDD) { setDdPhase(true); setScreen("question"); }
    else       { setDdPhase(false); setScreen("question"); }
  };

  const awardPoints = (teamIdx, pts) => {
    setTeams(teams.map((t, i) => i === teamIdx ? { ...t, score: t.score + pts } : t));
    closeQuestion();
  };

  const deductPoints = (teamIdx, pts) => {
    setTeams(teams.map((t, i) => i === teamIdx ? { ...t, score: Math.max(0, t.score - pts) } : t));
  };

  const closeQuestion = () => {
    const newUsed = { ...used, [selected.key]: true };
    setUsed(newUsed);
    setSelected(null); setRevealed(false); setDdPhase(false);
    setScreen("board");
    if (Object.keys(newUsed).length === CATEGORIES.length * POINT_VALUES.length) {
      const max = Math.max(...teams.map(t => t.score));
      setWinner(teams.filter(t => t.score === max));
    }
  };

  const resetGame = () => {
    setUsed({}); setSelected(null); setRevealed(false);
    setWinner(null); setDdPhase(false);
    setScreen("setup");
    setTeams(teams.map(t => ({ ...t, score: 0 })));
  };

  const isDailyDouble = selected && selected.key === dailyDouble;

  /* ── SETUP ── */
  if (screen === "setup") return <SetupScreen teams={teams} setTeams={setTeams} numTeams={numTeams} setNumTeams={setNumTeams} onStart={startGame} />;

  /* ── WINNER ── */
  if (winner) return <WinnerScreen winner={winner} teams={teams} onReset={resetGame} />;

  /* ── QUESTION ── */
  if (screen === "question" && selected) {
    const q = QUESTIONS[selected.cat][selected.pts];
    return (
      <QuestionScreen
        q={q} selected={selected} isDailyDouble={isDailyDouble}
        ddPhase={ddPhase} setDdPhase={setDdPhase}
        revealed={revealed} setRevealed={setRevealed}
        teams={teams} onAward={awardPoints} onDeduct={deductPoints}
        onClose={closeQuestion}
      />
    );
  }

  /* ── BOARD ── */
  return <BoardScreen teams={teams} used={used} onSelect={selectQuestion} onReset={resetGame} />;
}

/* ══════════════════════════════════════════
   SETUP SCREEN
══════════════════════════════════════════ */
function SetupScreen({ teams, setTeams, numTeams, setNumTeams, onStart }) {
  return (
    <div style={{ width:"100vw", height:"100vh", background:"#060b2e", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", fontFamily:"'Oswald', sans-serif" }}>
      {/* Stars bg */}
      <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 50% 0%, #0d1f6e 0%, #060b2e 70%)", zIndex:0 }} />

      <div style={{ position:"relative", zIndex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:32, width:680 }}>
        {/* Logo */}
        <div style={{ textAlign:"center" }}>
          <div style={{ fontSize:18, color:"#7ec8e3", letterSpacing:8, marginBottom:8, fontWeight:400 }}>REKINDLE STUDENTS PRESENTS</div>
          <div style={{ fontSize:96, fontWeight:700, color:"#ffd700", letterSpacing:6, lineHeight:1, textShadow:"0 0 40px rgba(255,215,0,0.5), 0 4px 0 #b8860b" }}>
            BIBLE
          </div>
          <div style={{ fontSize:96, fontWeight:700, color:"#ffd700", letterSpacing:6, lineHeight:1, textShadow:"0 0 40px rgba(255,215,0,0.5), 0 4px 0 #b8860b" }}>
            JEOPARDY
          </div>
          <div style={{ width:"100%", height:4, background:"linear-gradient(90deg, transparent, #ffd700, transparent)", margin:"16px 0" }} />
        </div>

        {/* Teams selector */}
        <div style={{ width:"100%", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:16, padding:"36px 40px", display:"flex", flexDirection:"column", gap:24 }}>
          <div>
            <div style={{ color:"#7ec8e3", fontSize:14, letterSpacing:4, marginBottom:14 }}>NUMBER OF TEAMS</div>
            <div style={{ display:"flex", gap:12 }}>
              {[2,3,4].map(n => (
                <button key={n} onClick={() => { setNumTeams(n); setTeams(Array.from({length:n},(_,i)=>({name:`Team ${i+1}`,score:0}))); }}
                  style={{ flex:1, height:64, borderRadius:10, border: numTeams===n ? "3px solid #ffd700" : "2px solid rgba(255,255,255,0.2)", background: numTeams===n ? "rgba(255,215,0,0.15)" : "transparent", color: numTeams===n ? "#ffd700" : "rgba(255,255,255,0.5)", fontSize:28, fontWeight:700, cursor:"pointer", fontFamily:"'Oswald',sans-serif", transition:"all 0.2s" }}>
                  {n}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div style={{ color:"#7ec8e3", fontSize:14, letterSpacing:4, marginBottom:14 }}>TEAM NAMES</div>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {teams.slice(0,numTeams).map((t,i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <div style={{ width:14, height:14, borderRadius:3, background:TEAM_COLORS[i], flexShrink:0 }} />
                  <input value={t.name}
                    onChange={e => { const u=[...teams]; u[i]={...u[i],name:e.target.value}; setTeams(u); }}
                    style={{ flex:1, padding:"14px 18px", borderRadius:10, border:`2px solid ${TEAM_COLORS[i]}44`, background:"rgba(255,255,255,0.06)", color:"white", fontSize:20, fontFamily:"'Oswald',sans-serif", outline:"none", letterSpacing:1 }}
                  />
                </div>
              ))}
            </div>
          </div>

          <button onClick={onStart}
            style={{ marginTop:8, padding:"22px", background:"linear-gradient(180deg,#ffd700,#c8a000)", color:"#060b2e", border:"none", borderRadius:12, fontSize:26, fontWeight:700, letterSpacing:5, cursor:"pointer", fontFamily:"'Oswald',sans-serif", boxShadow:"0 4px 24px rgba(255,215,0,0.4)", transition:"all 0.2s" }}>
            START GAME
          </button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   BOARD SCREEN  — true 1920×1080 layout
══════════════════════════════════════════ */
function BoardScreen({ teams, used, onSelect, onReset }) {
  const ROWS = POINT_VALUES.length;
  const COLS = CATEGORIES.length;

  return (
    <div style={{ width:"100vw", height:"100vh", background:"#060b2e", display:"flex", flexDirection:"column", overflow:"hidden", fontFamily:"'Oswald',sans-serif" }}>

      {/* ── Top bar: title + scores ── */}
      <div style={{ display:"flex", alignItems:"center", padding:"0 40px", height:110, flexShrink:0, borderBottom:"3px solid #ffd70033", background:"linear-gradient(180deg,#0a1245,#060b2e)" }}>
        {/* Title */}
        <div style={{ flex:"0 0 auto", marginRight:40 }}>
          <span style={{ fontSize:52, fontWeight:700, color:"#ffd700", letterSpacing:5, textShadow:"0 0 24px rgba(255,215,0,0.4)" }}>BIBLE JEOPARDY</span>
          <span style={{ fontSize:15, color:"rgba(255,255,255,0.35)", letterSpacing:4, marginLeft:20 }}>REKINDLE STUDENTS</span>
        </div>
        <div style={{ flex:1 }} />
        {/* Score cards */}
        {teams.map((t,i) => (
          <div key={i} style={{ display:"flex", flexDirection:"column", alignItems:"center", marginLeft:24, padding:"8px 28px", borderRadius:12, border:`2px solid ${TEAM_COLORS[i]}`, background:TEAM_BG[i] }}>
            <span style={{ fontSize:13, color:TEAM_COLORS[i], letterSpacing:3 }}>{t.name.toUpperCase()}</span>
            <span style={{ fontSize:40, fontWeight:700, color:"white", lineHeight:1.1, fontVariantNumeric:"tabular-nums" }}>{dollar(t.score)}</span>
          </div>
        ))}
        <button onClick={onReset} style={{ marginLeft:32, background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.15)", color:"rgba(255,255,255,0.4)", borderRadius:8, padding:"10px 18px", cursor:"pointer", fontSize:22, fontFamily:"'Oswald',sans-serif" }}>↺</button>
      </div>

      {/* ── Board grid ── */}
      <div style={{ flex:1, display:"grid", gridTemplateColumns:`repeat(${COLS},1fr)`, gridTemplateRows:`auto repeat(${ROWS},1fr)`, gap:6, padding:"6px 6px 8px", animation:"boardIn 0.4s ease" }}>

        {/* Category headers */}
        {CATEGORIES.map(cat => (
          <div key={cat} style={{ background:"linear-gradient(180deg,#0d2080,#091660)", display:"flex", alignItems:"center", justifyContent:"center", borderRadius:6, padding:"0 12px", minHeight:90, border:"2px solid #1a2f9a" }}>
            <span style={{ color:"#7ec8e3", fontSize:22, fontWeight:600, textAlign:"center", lineHeight:1.2, letterSpacing:2, textTransform:"uppercase" }}>{cat}</span>
          </div>
        ))}

        {/* Dollar cells */}
        {POINT_VALUES.map(pts =>
          CATEGORIES.map(cat => {
            const key = `${cat}-${pts}`;
            const isUsed = used[key];
            return (
              <div key={key}
                className={isUsed ? "" : "cell-hover"}
                onClick={() => !isUsed && onSelect(cat, pts)}
                style={{
                  background: isUsed ? "#07103a" : "linear-gradient(180deg,#0e2191 0%,#091660 100%)",
                  border: isUsed ? "2px solid #0d1850" : "2px solid #1a3aab",
                  borderRadius:6,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  transition:"all 0.15s",
                  animation: isUsed ? "none" : "cellPulse 4s infinite",
                }}>
                {!isUsed && (
                  <span style={{ fontSize:54, fontWeight:700, color:"#ffd700", textShadow:"0 2px 12px rgba(255,200,0,0.5)", fontVariantNumeric:"tabular-nums" }}>
                    {dollar(pts)}
                  </span>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   QUESTION SCREEN
══════════════════════════════════════════ */
function QuestionScreen({ q, selected, isDailyDouble, ddPhase, setDdPhase, revealed, setRevealed, teams, onAward, onDeduct, onClose }) {

  return (
    <div style={{ width:"100vw", height:"100vh", background:"#060b2e", display:"flex", flexDirection:"column", fontFamily:"'Oswald',sans-serif", overflow:"hidden" }}>

      {/* Header strip */}
      <div style={{ height:80, background:"linear-gradient(180deg,#0a1245,#060b2e)", borderBottom:"3px solid #ffd70033", display:"flex", alignItems:"center", padding:"0 60px", flexShrink:0, gap:24 }}>
        <span style={{ fontSize:22, color:"#7ec8e3", letterSpacing:4 }}>{selected.cat.toUpperCase()}</span>
        <span style={{ fontSize:22, color:"rgba(255,255,255,0.25)" }}>|</span>
        <span style={{ fontSize:22, color:"#ffd700", letterSpacing:3 }}>{isDailyDouble ? "DAILY DOUBLE" : dollar(selected.pts)}</span>
        <div style={{ flex:1 }} />
        <button onClick={onClose} style={{ background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.15)", color:"rgba(255,255,255,0.45)", borderRadius:8, padding:"10px 24px", cursor:"pointer", fontSize:16, letterSpacing:3, fontFamily:"'Oswald',sans-serif" }}>
          ← BACK TO BOARD
        </button>
      </div>

      {/* Daily Double card */}
      {isDailyDouble && ddPhase ? (
        <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:40 }}>
          <div style={{ fontSize:160, fontWeight:700, color:"#ffd700", letterSpacing:8, animation:"ddPulse 1.5s infinite", lineHeight:1 }}>DAILY</div>
          <div style={{ fontSize:160, fontWeight:700, color:"#ffd700", letterSpacing:8, animation:"ddPulse 1.5s infinite 0.3s", lineHeight:1 }}>DOUBLE</div>
          <div style={{ fontSize:22, color:"rgba(255,255,255,0.5)", letterSpacing:4, marginTop:20 }}>⭐ BONUS QUESTION ⭐</div>
          <button onClick={() => setDdPhase(false)} className="reveal-hover"
            style={{ marginTop:20, padding:"24px 80px", background:"linear-gradient(180deg,#ffd700,#c8a000)", color:"#060b2e", border:"none", borderRadius:14, fontSize:28, fontWeight:700, letterSpacing:5, cursor:"pointer", fontFamily:"'Oswald',sans-serif", boxShadow:"0 4px 30px rgba(255,215,0,0.5)", transition:"all 0.15s" }}>
            REVEAL QUESTION
          </button>
        </div>
      ) : (
        /* Question + controls */
        <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"space-between", padding:"40px 120px 32px", animation:"qSlide 0.35s ease" }}>

          {/* Question card */}
          <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", width:"100%", maxWidth:1400, background:"linear-gradient(160deg,#0c1e8a,#070e52)", border:`3px solid ${isDailyDouble ? "#ffd700" : "#1a3aab"}`, borderRadius:20, padding:"60px 100px", boxShadow:"0 0 60px rgba(0,60,200,0.3)", marginBottom:32 }}>
            <p style={{ fontSize:52, color:"white", textAlign:"center", lineHeight:1.45, margin:0, fontWeight:400, letterSpacing:1 }}>{q.q}</p>
          </div>

          {/* Answer box */}
          {revealed && (
            <div style={{ width:"100%", maxWidth:1400, background:"rgba(255,215,0,0.08)", border:"3px solid #ffd700", borderRadius:16, padding:"28px 60px", marginBottom:32, textAlign:"center", animation:"answerReveal 0.3s ease", transformOrigin:"top" }}>
              <div style={{ fontSize:13, color:"#ffd700", letterSpacing:5, marginBottom:10 }}>ANSWER</div>
              <div style={{ fontSize:42, color:"white", fontWeight:600, letterSpacing:1 }}>{q.a}</div>
            </div>
          )}

          {/* Controls */}
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:18, width:"100%", maxWidth:1400 }}>

            {!revealed ? (
              <button onClick={() => setRevealed(true)} className="reveal-hover"
                style={{ padding:"24px 120px", background:"linear-gradient(180deg,#ffd700,#c8a000)", color:"#060b2e", border:"none", borderRadius:14, fontSize:26, fontWeight:700, letterSpacing:5, cursor:"pointer", fontFamily:"'Oswald',sans-serif", boxShadow:"0 4px 24px rgba(255,215,0,0.4)", transition:"all 0.15s" }}>
                REVEAL ANSWER
              </button>
            ) : (
              <>
                {/* Award row */}
                <div style={{ fontSize:14, color:"rgba(255,255,255,0.4)", letterSpacing:4, marginBottom:4 }}>AWARD POINTS TO</div>
                <div style={{ display:"flex", gap:16, flexWrap:"wrap", justifyContent:"center" }}>
                  {teams.map((t,i) => (
                    <button key={i} onClick={() => onAward(i, selected.pts)} className="award-hover"
                      style={{ padding:"20px 44px", background:TEAM_BG[i], border:`2px solid ${TEAM_COLORS[i]}`, borderRadius:12, color:TEAM_COLORS[i], fontSize:22, fontWeight:700, letterSpacing:3, cursor:"pointer", fontFamily:"'Oswald',sans-serif", transition:"all 0.15s", minWidth:200 }}>
                      {t.name}
                      <span style={{ display:"block", fontSize:14, color:"rgba(255,255,255,0.5)", fontWeight:400, letterSpacing:2 }}>{dollar(t.score)}</span>
                    </button>
                  ))}
                </div>

                {/* Deduct row */}
                <div style={{ display:"flex", gap:24, marginTop:4 }}>
                  {teams.map((t,i) => (
                    <span key={i} onClick={() => onDeduct(i, selected.pts)}
                      style={{ fontSize:14, color:TEAM_COLORS[i], opacity:0.6, cursor:"pointer", letterSpacing:2, textDecoration:"underline" }}>
                      -{dollar(selected.pts)} {t.name}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════
   WINNER SCREEN
══════════════════════════════════════════ */
function WinnerScreen({ winner, teams, onReset }) {
  return (
    <div style={{ width:"100vw", height:"100vh", background:"#060b2e", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", fontFamily:"'Oswald',sans-serif", gap:48 }}>
      <div style={{ fontSize:200, lineHeight:1 }}>🏆</div>
      <div style={{ fontSize:winner.length>1 ? 80 : 96, fontWeight:700, color:"#ffd700", letterSpacing:6, animation:"winnerGlow 2s infinite", textAlign:"center" }}>
        {winner.length > 1 ? "IT'S A TIE!" : `${winner[0].name.toUpperCase()} WINS!`}
      </div>

      <div style={{ display:"flex", gap:24, marginTop:8 }}>
        {teams.map((t,i) => (
          <div key={i} style={{ padding:"20px 48px", background:TEAM_BG[i], border:`3px solid ${TEAM_COLORS[i]}`, borderRadius:14, textAlign:"center", minWidth:220 }}>
            <div style={{ fontSize:18, color:TEAM_COLORS[i], letterSpacing:3 }}>{t.name.toUpperCase()}</div>
            <div style={{ fontSize:56, fontWeight:700, color:"white" }}>{dollar(t.score)}</div>
          </div>
        ))}
      </div>

      <button onClick={onReset} style={{ padding:"22px 80px", background:"linear-gradient(180deg,#ffd700,#c8a000)", color:"#060b2e", border:"none", borderRadius:14, fontSize:26, fontWeight:700, letterSpacing:5, cursor:"pointer", fontFamily:"'Oswald',sans-serif", boxShadow:"0 4px 24px rgba(255,215,0,0.4)", marginTop:8 }}>
        PLAY AGAIN
      </button>
    </div>
  );
}
