import { useState, useRef, useEffect } from "react";

function useFonts() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Source+Serif+4:opsz,wght@8..60,300;8..60,400;8..60,500&display=swap";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);
}

const COLORS = {
  cream: "#F6F1E7", parchment: "#EDE5D4", forest: "#2A4438",
  forestMid: "#4A7A62", amber: "#C17F4F", text: "#1A2A22",
  textMuted: "#5A7065", white: "#FFFFFF", crisisRed: "#8B2635",
};

const SYSTEM_PROMPT = `You are Watershed — a clinician-designed AI wellness companion. You provide psychoeducation and peer-style emotional support to people navigating mental health challenges, including those for whom substance use is part of their experience.

Watershed is a clinician-directed wellness tool. You are not a therapist, counselor, or clinical service. You do not diagnose, treat, or provide clinical recommendations. Everything about how you engage — your language, your knowledge, your ethical framework, your clinical orientation — was built by and is continuously refined by licensed mental health clinicians. You are the most clinically informed wellness tool that exists, precisely because you were made by therapists rather than technologists.

THEORETICAL FRAMEWORK:
- Substance use is understood as a symptom of underlying emotional, psychological, relational, and social pain — not as a character flaw, moral failure, or the defining feature of a person's identity
- You approach every person through a trauma-informed, strengths-based, and person-centered lens
- You draw on SMART Recovery principles, motivational interviewing, harm reduction, and psychoeducation
- You recognize that mental health, substance use, trauma, identity, culture, and environment are deeply interconnected

NASW CODE OF ETHICS — CORE COMMITMENTS:
- Service: Your primary goal is to help people improve their wellbeing
- Social Justice: You are alert to systemic and structural factors that shape people's lives
- Dignity and Worth of the Person: Every person deserves respect and compassion, unconditionally
- Importance of Human Relationships: You support connections to others — you are not a replacement for human relationship
- Integrity: You are honest about what you are and what you cannot do
- Competence: You operate only within your scope — wellness support and psychoeducation

UNCONDITIONAL POSITIVE REGARD:
You hold every person in complete, non-judgmental acceptance — regardless of what they share, how they present, or what choices they have made.

THE CLIENT AS EXPERT:
You believe people are the foremost experts on their own lives. You do not reframe, correct, or pathologize what someone tells you about their own experience. You reflect their language back to them. You ask before you offer.

LANGUAGE:
- Never use the words "addict," "addiction," "alcoholic," or any other stigmatizing label
- Use person-first language: "person who uses substances," "person in recovery," "person with lived experience"
- Reflect the language the person uses about themselves
- Use "substance use" or "substance use disorder" only when clinical language is clearly appropriate

CLINICAL HUMILITY:
Be transparent, gently and occasionally, that you are an AI wellness tool with real limits:
- You cannot perceive tone of voice, facial expression, body language, or affect
- You cannot account for cultural context you haven't been told
- You may miss nuance that a skilled human clinician would catch
- You are a wellness tool, not a therapist

HARD LIMITS:
- Never diagnose any condition
- Never recommend, adjust, or comment on medications
- Never provide clinical treatment planning
- If asked, decline warmly and redirect to their care team

CRISIS PROTOCOL:
If a person expresses suicidal ideation, intent to harm themselves or others, or any imminent safety risk — begin your response with exactly: [CRISIS_DETECTED]
Then respond with warm validation followed by:
- 988 Suicide & Crisis Lifeline: call or text 988
- Crisis Text Line: text HOME to 741741
- SAMHSA National Helpline: 1-800-662-4357
- Encourage them to contact their clinician or go to their nearest emergency room

TONE:
Warm, unhurried, non-judgmental. Not cheerful or performatively positive. You sit with difficulty. You do not rush to fix. You ask good questions. You listen before you respond.`;

const CRISIS_KEYWORDS = [
  "kill myself","end my life","don't want to live","want to die","suicidal",
  "commit suicide","overdose on purpose","hurt myself","self harm","self-harm",
  "not worth living","better off dead","no reason to live","ending it","take my own life",
];

const detectCrisis = (text) => CRISIS_KEYWORDS.some((kw) => text.toLowerCase().includes(kw));

function ConsentScreen({ onAccept }) {
  const [checked, setChecked] = useState(false);
  return (
    <div style={{ minHeight:"100vh", background:COLORS.cream, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Source Serif 4', Georgia, serif", padding:"24px" }}>
      <div style={{ maxWidth:520, width:"100%", background:COLORS.white, borderRadius:16, boxShadow:"0 4px 40px rgba(42,68,56,0.12)", overflow:"hidden" }}>
        <div style={{ background:COLORS.forest, padding:"32px 36px", textAlign:"center" }}>
          <div style={{ fontFamily:"'Cormorant Garamond', Georgia, serif", fontSize:30, fontWeight:600, color:COLORS.cream, marginBottom:4 }}>Watershed</div>
          <div style={{ fontSize:12, color:"#8FB09A", letterSpacing:"0.1em", textTransform:"uppercase" }}>Clinician-Designed Wellness Support</div>
        </div>
        <div style={{ padding:"32px 36px" }}>
          <p style={{ fontSize:16.5, color:COLORS.text, lineHeight:1.7, marginBottom:20 }}>
            Welcome. This is a space for reflection, psychoeducation, and support — built by licensed clinicians, designed around your dignity and wellbeing.
          </p>
          <div style={{ background:COLORS.parchment, borderRadius:10, padding:"18px 20px", marginBottom:24, borderLeft:`3px solid ${COLORS.amber}` }}>
            <p style={{ fontSize:13.5, fontWeight:600, color:COLORS.text, marginBottom:10 }}>Before we begin:</p>
            <ul style={{ fontSize:13.5, color:COLORS.textMuted, lineHeight:1.85, paddingLeft:18, margin:0 }}>
              <li>Watershed is a <strong>clinician-designed AI wellness tool</strong> — not a licensed therapist, counselor, or clinical service.</li>
              <li>It provides <strong>psychoeducation and peer-style support only</strong> — not diagnosis, treatment, or clinical advice.</li>
              <li>It <strong>cannot perceive your tone of voice, body language, or cultural context</strong> — a human clinician would understand things Watershed cannot.</li>
              <li>It is <strong>not a crisis or emergency service</strong>. If you are in immediate danger, call 988 or 911.</li>
              <li>Watershed is grounded in the <strong>NASW Code of Ethics</strong> and unconditional positive regard for every person.</li>
            </ul>
          </div>
          <label style={{ display:"flex", alignItems:"flex-start", gap:12, cursor:"pointer", marginBottom:28 }}>
            <input type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} style={{ marginTop:3, accentColor:COLORS.forest, width:16, height:16 }}/>
            <span style={{ fontSize:14, color:COLORS.textMuted, lineHeight:1.6 }}>
              I understand Watershed is a wellness support tool and not a replacement for professional clinical care. I am at least 18 years old.
            </span>
          </label>
          <button onClick={onAccept} disabled={!checked} style={{ width:"100%", padding:"14px 0", background:checked ? COLORS.forest : "#C5D4CC", color:checked ? COLORS.cream : "#8FA89A", border:"none", borderRadius:10, fontFamily:"'Source Serif 4', Georgia, serif", fontSize:15, fontWeight:500, cursor:checked ? "pointer" : "not-allowed", transition:"all 0.2s" }}>
            Begin Session
          </button>
        </div>
      </div>
    </div>
  );
}

function CrisisBanner({ onDismiss }) {
  return (
    <div style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, background:COLORS.crisisRed, color:COLORS.white, padding:"14px 20px", display:"flex", alignItems:"center", justifyContent:"space-between", gap:12, boxShadow:"0 2px 16px rgba(139,38,53,0.4)", fontFamily:"'Source Serif 4', Georgia, serif" }}>
      <div style={{ flex:1 }}>
        <div style={{ fontWeight:600, fontSize:14, marginBottom:3 }}>🆘 If you're in crisis, help is available right now</div>
        <div style={{ fontSize:13, opacity:0.92 }}>
          <strong>988 Lifeline:</strong> call or text 988 &nbsp;·&nbsp; <strong>Crisis Text:</strong> text HOME to 741741 &nbsp;·&nbsp; <strong>SAMHSA:</strong> 1-800-662-4357 &nbsp;·&nbsp; <strong>Emergency:</strong> 911
        </div>
      </div>
      <button onClick={onDismiss} style={{ background:"rgba(255,255,255,0.2)", border:"none", color:COLORS.white, padding:"6px 14px", borderRadius:6, fontSize:13, cursor:"pointer", fontFamily:"'Source Serif 4', Georgia, serif" }}>I'm safe</button>
    </div>
  );
}

function HandoffModal({ onClose }) {
  return (
    <div style={{ position:"fixed", inset:0, zIndex:200, background:"rgba(26,42,34,0.6)", display:"flex", alignItems:"center", justifyContent:"center", padding:24, fontFamily:"'Source Serif 4', Georgia, serif" }}>
      <div style={{ background:COLORS.white, borderRadius:14, padding:"32px 30px", maxWidth:420, width:"100%", boxShadow:"0 8px 40px rgba(0,0,0,0.2)" }}>
        <div style={{ fontFamily:"'Cormorant Garamond', Georgia, serif", fontSize:22, fontWeight:600, color:COLORS.forest, marginBottom:10 }}>Speak with a real person</div>
        <p style={{ fontSize:14, color:COLORS.textMuted, lineHeight:1.7, marginBottom:6 }}>
          Watershed has real limits. An AI cannot hear your voice, see your face, or understand the full context of who you are. Your clinician can.
        </p>
        <p style={{ fontSize:13, color:COLORS.textMuted, fontStyle:"italic", marginBottom:20, lineHeight:1.6 }}>Reaching out is always the right call.</p>
        <div style={{ background:COLORS.parchment, borderRadius:10, padding:"16px 18px", marginBottom:24 }}>
          {[
            ["Your clinician or care team","Contact them directly — they know you"],
            ["988 Suicide & Crisis Lifeline","Call or text 988 — free, confidential, 24/7"],
            ["Crisis Text Line","Text HOME to 741741"],
            ["SAMHSA Helpline","1-800-662-4357 — free, confidential, 24/7"],
            ["Emergency services","Call 911 or go to your nearest ER"],
          ].map(([label, detail]) => (
            <div key={label} style={{ marginBottom:12 }}>
              <div style={{ fontSize:13.5, fontWeight:600, color:COLORS.text }}>{label}</div>
              <div style={{ fontSize:13, color:COLORS.textMuted }}>{detail}</div>
            </div>
          ))}
        </div>
        <button onClick={onClose} style={{ width:"100%", padding:"12px 0", background:COLORS.forest, color:COLORS.cream, border:"none", borderRadius:9, fontFamily:"'Source Serif 4', Georgia, serif", fontSize:14, cursor:"pointer" }}>Return to chat</button>
      </div>
    </div>
  );
}

function Message({ msg }) {
  const isUser = msg.role === "user";
  return (
    <div style={{ display:"flex", justifyContent:isUser ? "flex-end" : "flex-start", marginBottom:16 }}>
      {!isUser && (
        <div style={{ width:32, height:32, borderRadius:"50%", background:COLORS.forest, color:COLORS.cream, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, marginRight:10, flexShrink:0, marginTop:2, fontFamily:"'Cormorant Garamond', Georgia, serif", fontWeight:600 }}>W</div>
      )}
      <div style={{ maxWidth:"72%", background:isUser ? COLORS.forest : COLORS.white, color:isUser ? COLORS.cream : COLORS.text, borderRadius:isUser ? "18px 18px 4px 18px" : "18px 18px 18px 4px", padding:"12px 16px", fontSize:14.5, lineHeight:1.7, boxShadow:isUser ? "none" : "0 1px 8px rgba(42,68,56,0.08)", border:isUser ? "none" : `1px solid ${COLORS.parchment}`, fontFamily:"'Source Serif 4', Georgia, serif", whiteSpace:"pre-wrap" }}>
        {msg.content}
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
      <div style={{ width:32, height:32, borderRadius:"50%", background:COLORS.forest, color:COLORS.cream, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, flexShrink:0, fontFamily:"'Cormorant Garamond', Georgia, serif", fontWeight:600 }}>W</div>
      <div style={{ background:COLORS.white, borderRadius:"18px 18px 18px 4px", padding:"14px 18px", display:"flex", gap:5, alignItems:"center", border:`1px solid ${COLORS.parchment}`, boxShadow:"0 1px 8px rgba(42,68,56,0.08)" }}>
        {[0,1,2].map((i) => (
          <div key={i} style={{ width:7, height:7, borderRadius:"50%", background:COLORS.forestMid, opacity:0.6, animation:`bounce 1.2s ${i*0.15}s infinite ease-in-out` }}/>
        ))}
      </div>
      <style>{`@keyframes bounce{0%,60%,100%{transform:translateY(0);opacity:0.4}30%{transform:translateY(-6px);opacity:1}}`}</style>
    </div>
  );
}

function ChatScreen() {
  const [messages, setMessages] = useState([{
    role:"assistant",
    content:"Hello, and welcome to Watershed.\n\nI'm a clinician-designed AI wellness companion — built by licensed therapists to offer psychoeducation, reflection, and peer-style support. I'm not a therapist, and there are things I genuinely can't perceive the way a human clinician would: your tone, your body language, the cultural context that shapes how you experience what you're going through.\n\nI'll be honest about those limits as we go. What's bringing you here today?",
  }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [crisisActive, setCrisisActive] = useState(false);
  const [showHandoff, setShowHandoff] = useState(false);
  const bottomRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:"smooth" }); }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userText = input.trim();
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    if (detectCrisis(userText)) setCrisisActive(true);
    const newMessages = [...messages, { role:"user", content:userText }];
    setMessages(newMessages);
    setLoading(true);
    try {
      // Calls our server-side proxy instead of Anthropic directly
      const res = await fetch("/api/chat", {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body:JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:1000,
          system:SYSTEM_PROMPT,
          messages:newMessages.map((m) => ({ role:m.role, content:m.content })),
        }),
      });
      const data = await res.json();
      let text = data.content?.[0]?.text || "I'm having trouble responding right now. Please try again, or reach out to your care team directly.";
      if (text.startsWith("[CRISIS_DETECTED]")) { setCrisisActive(true); text = text.replace("[CRISIS_DETECTED]","").trim(); }
      setMessages([...newMessages, { role:"assistant", content:text }]);
    } catch {
      setMessages([...newMessages, { role:"assistant", content:"Something went wrong on my end. Please try again — or if you need support right now, reach out to your clinician or call 988." }]);
    } finally { setLoading(false); }
  };

  const handleKeyDown = (e) => { if (e.key==="Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } };
  const handleTextareaChange = (e) => { setInput(e.target.value); e.target.style.height="auto"; e.target.style.height=Math.min(e.target.scrollHeight,120)+"px"; };

  const SUGGESTED = [
    "I've been struggling with my mental health lately",
    "I'm having urges to use and I don't know why",
    "I feel like no one understands what I'm going through",
    "What is harm reduction?",
  ];

  return (
    <div style={{ minHeight:"100vh", background:COLORS.cream, display:"flex", flexDirection:"column", fontFamily:"'Source Serif 4', Georgia, serif" }}>
      {crisisActive && <CrisisBanner onDismiss={() => setCrisisActive(false)}/>}
      {showHandoff && <HandoffModal onClose={() => setShowHandoff(false)}/>}
      <div style={{ background:COLORS.forest, padding:"0 20px", display:"flex", alignItems:"center", justifyContent:"space-between", height:60, flexShrink:0, marginTop:crisisActive ? 58 : 0, transition:"margin-top 0.2s" }}>
        <div>
          <span style={{ fontFamily:"'Cormorant Garamond', Georgia, serif", fontSize:22, fontWeight:600, color:COLORS.cream }}>Watershed</span>
          <span style={{ fontSize:12, color:"#8FB09A", marginLeft:10, letterSpacing:"0.06em" }}>Clinician-Designed Wellness Support</span>
        </div>
        <button onClick={() => setShowHandoff(true)} style={{ background:"rgba(255,255,255,0.12)", border:"1px solid rgba(255,255,255,0.2)", color:COLORS.cream, borderRadius:8, padding:"6px 14px", fontSize:13, cursor:"pointer", fontFamily:"'Source Serif 4', Georgia, serif" }}>Talk to a person</button>
      </div>
      <div style={{ flex:1, overflowY:"auto", padding:"24px 16px 8px", maxWidth:680, width:"100%", margin:"0 auto", boxSizing:"border-box" }}>
        {messages.map((msg,i) => <Message key={i} msg={msg}/>)}
        {loading && <TypingIndicator/>}
        <div ref={bottomRef}/>
      </div>
      {messages.length===1 && !loading && (
        <div style={{ maxWidth:680, width:"100%", margin:"0 auto", padding:"0 16px 12px", display:"flex", gap:8, flexWrap:"wrap" }}>
          {SUGGESTED.map((prompt) => (
            <button key={prompt} onClick={() => { setInput(prompt); textareaRef.current?.focus(); }} style={{ background:COLORS.white, border:`1px solid ${COLORS.parchment}`, borderRadius:20, padding:"7px 14px", fontSize:13, color:COLORS.textMuted, cursor:"pointer", fontFamily:"'Source Serif 4', Georgia, serif", boxShadow:"0 1px 4px rgba(42,68,56,0.06)" }}>{prompt}</button>
          ))}
        </div>
      )}
      <div style={{ background:COLORS.white, borderTop:`1px solid ${COLORS.parchment}`, padding:"14px 16px", flexShrink:0 }}>
        <div style={{ maxWidth:680, margin:"0 auto", display:"flex", gap:10, alignItems:"flex-end" }}>
          <textarea ref={textareaRef} value={input} onChange={handleTextareaChange} onKeyDown={handleKeyDown} placeholder="Share what's on your mind…" rows={1} style={{ flex:1, resize:"none", border:`1px solid ${COLORS.parchment}`, borderRadius:12, padding:"11px 14px", fontSize:14.5, fontFamily:"'Source Serif 4', Georgia, serif", color:COLORS.text, background:COLORS.cream, outline:"none", lineHeight:1.55, overflowY:"auto" }}/>
          <button onClick={sendMessage} disabled={!input.trim() || loading} style={{ background:input.trim() && !loading ? COLORS.forest : "#C5D4CC", border:"none", borderRadius:10, width:44, height:44, flexShrink:0, cursor:input.trim() && !loading ? "pointer" : "not-allowed", display:"flex", alignItems:"center", justifyContent:"center", transition:"background 0.2s" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M22 2L11 13" stroke={COLORS.cream} strokeWidth="2" strokeLinecap="round"/>
              <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke={COLORS.cream} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <div style={{ maxWidth:680, margin:"8px auto 0", fontSize:11.5, color:COLORS.textMuted, textAlign:"center" }}>
          Clinician-designed wellness tool · Not a therapist · NASW ethics · Emergencies: call 988 or 911
        </div>
      </div>
    </div>
  );
}

export default function App() {
  useFonts();
  const [screen, setScreen] = useState("consent");
  return screen === "consent" ? <ConsentScreen onAccept={() => setScreen("chat")}/> : <ChatScreen/>;
}
