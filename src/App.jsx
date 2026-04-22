import { useState, useEffect, useRef, useCallback } from "react";

/* ─────────────────────────────────────────────
   GLOBAL STYLES injected once
───────────────────────────────────────────── */
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --navy:   #0b1f45;
      --deep:   #132d6e;
      --mid:    #1e4db7;
      --bright: #2f80ed;
      --cyan:   #56ccf2;
      --white:  #f0f6ff;
      --glass:  rgba(255,255,255,0.07);
      --glass2: rgba(255,255,255,0.13);
      --border: rgba(255,255,255,0.14);
      --text:   #c8deff;
      --muted:  rgba(200,222,255,0.55);
      --accent: #00e5c9;
      --warn:   #f7b731;
    }

    html { scroll-behavior: smooth; }

    body {
      font-family: 'DM Sans', sans-serif;
      background: var(--navy);
      color: var(--white);
      overflow-x: hidden;
    }

    h1,h2,h3,h4,h5 { font-family: 'Sora', sans-serif; }

    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: var(--navy); }
    ::-webkit-scrollbar-thumb { background: var(--mid); border-radius: 3px; }

    .gradient-text {
      background: linear-gradient(135deg, #56ccf2 0%, #2f80ed 50%, #00e5c9 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .glass-card {
      background: var(--glass);
      border: 1px solid var(--border);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
    }

    .glass-card2 {
      background: var(--glass2);
      border: 1px solid var(--border);
      backdrop-filter: blur(20px);
    }

    .btn-primary {
      background: linear-gradient(135deg, #2f80ed, #00e5c9);
      color: #fff;
      font-family: 'Sora', sans-serif;
      font-weight: 600;
      font-size: 0.9rem;
      letter-spacing: 0.02em;
      padding: 0.75rem 2rem;
      border-radius: 50px;
      border: none;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 32px rgba(47,128,237,0.45);
    }
    .btn-primary::after {
      content: '';
      position: absolute; inset: 0;
      background: linear-gradient(135deg,rgba(255,255,255,0.18),transparent);
      opacity: 0; transition: opacity 0.2s;
    }
    .btn-primary:hover::after { opacity: 1; }

    .btn-ghost {
      background: transparent;
      color: var(--white);
      font-family: 'Sora', sans-serif;
      font-weight: 600;
      font-size: 0.9rem;
      padding: 0.72rem 1.9rem;
      border-radius: 50px;
      border: 1.5px solid var(--border);
      cursor: pointer;
      transition: background 0.2s, border-color 0.2s, transform 0.2s;
    }
    .btn-ghost:hover {
      background: var(--glass2);
      border-color: var(--bright);
      transform: translateY(-2px);
    }

    .section-tag {
      display: inline-flex; align-items: center; gap: 0.5rem;
      font-size: 0.75rem; font-family: 'Sora', sans-serif;
      font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
      color: var(--accent);
      background: rgba(0,229,201,0.10);
      border: 1px solid rgba(0,229,201,0.25);
      padding: 0.3rem 0.9rem; border-radius: 50px;
      margin-bottom: 1rem;
    }

    @keyframes float {
      0%,100% { transform: translateY(0px) rotate(0deg); }
      50%      { transform: translateY(-18px) rotate(4deg); }
    }
    @keyframes pulse-ring {
      0%   { transform: scale(0.8); opacity: 0.8; }
      100% { transform: scale(2.2); opacity: 0; }
    }
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(30px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideIn {
      from { opacity: 0; transform: translateX(-20px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes shimmer {
      0%   { background-position: -200% center; }
      100% { background-position:  200% center; }
    }
    @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }

    .animate-float     { animation: float 4s ease-in-out infinite; }
    .animate-float2    { animation: float 5.5s ease-in-out infinite 1s; }
    .animate-float3    { animation: float 3.8s ease-in-out infinite 0.5s; }
    .animate-fadeUp    { animation: fadeUp 0.7s ease forwards; }
    .animate-spin-slow { animation: spin-slow 18s linear infinite; }

    .fade-in {
      opacity: 0; transform: translateY(24px);
      transition: opacity 0.7s ease, transform 0.7s ease;
    }
    .fade-in.visible {
      opacity: 1; transform: translateY(0);
    }

    .product-card:hover .card-inner {
      transform: translateY(-6px);
      box-shadow: 0 20px 60px rgba(47,128,237,0.25);
    }

    .nav-link {
      color: var(--text); font-size:0.88rem; font-weight:500;
      text-decoration:none; padding:0.3rem 0;
      position:relative; cursor:pointer; transition:color 0.2s;
    }
    .nav-link::after {
      content:''; position:absolute; bottom:0; left:0;
      width:0; height:1.5px; background: var(--accent);
      transition: width 0.25s;
    }
    .nav-link:hover { color:#fff; }
    .nav-link:hover::after { width:100%; }
    .nav-link.active { color:#fff; }
    .nav-link.active::after { width:100%; }

    .mesh-bg {
      position:absolute; inset:0; overflow:hidden; pointer-events:none;
    }
    .mesh-circle {
      position:absolute; border-radius:50%;
      background: radial-gradient(circle, rgba(47,128,237,0.18) 0%, transparent 70%);
    }

    .step-line {
      position:absolute; top:50%; left:100%;
      width:100%; height:2px;
      background: linear-gradient(90deg, var(--bright), transparent);
    }

    @media(max-width:768px){
      .desktop-nav { display:none; }
      .hero-grid   { grid-template-columns:1fr !important; }
      .features-grid { grid-template-columns: 1fr 1fr !important; }
      .products-grid { grid-template-columns: 1fr !important; }
    }
    @media(max-width:480px){
      .features-grid { grid-template-columns: 1fr !important; }
    }
  `}</style>
);

/* ─────────────────────────────────────────────
   INTERSECTION OBSERVER HOOK
───────────────────────────────────────────── */
function useFadeIn() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */


// This is main product part
const PRODUCTS = [
  {
    id: "rpm",
    icon: "🫀",
    name: "Remote Patient Monitoring",
    short: "Continuous vitals tracking with real-time AI alerts sent directly to care teams.",
    color: "#2f80ed",
    tag: "Core Product",
    features: ["Real-time ECG & SpO2 monitoring","Smart alert escalation engine","HIPAA-compliant data pipeline","Wearable device integration","Predictive risk scoring"],
    benefits: ["50% reduction in hospital readmissions","3x faster response to deterioration","24/7 automated oversight","Seamless EHR integration"],
    desc: "Giloys360 RPM is the flagship product that enables healthcare providers to monitor patients outside clinical settings. From wearable biosensors to AI-powered dashboards, RPM closes the gap between visits and keeps patients safe at home."
  },
  {
    id: "analytics",
    icon: "📊",
    name: "Smart Health Analytics",
    short: "Turn raw clinical data into actionable population health intelligence.",
    color: "#00e5c9",
    tag: "Analytics",
    features: ["Population health dashboards","Cohort risk stratification","Custom KPI reporting","ML-driven trend forecasting","Interoperability with HL7/FHIR"],
    benefits: ["Data-driven care decisions","Identify high-risk patients early","Reduce operational costs by 30%","Real-time executive reporting"],
    desc: "Smart Health Analytics aggregates data across your entire patient population and surfaces critical insights. Built on modern data infrastructure, it enables predictive modelling and operational excellence for large health systems."
  },
  {
    id: "tele",
    icon: "📹",
    name: "Telemedicine Platform",
    short: "Secure, high-definition virtual consultations for any specialty.",
    color: "#f7b731",
    tag: "Telehealth",
    features: ["HD encrypted video calls","Integrated e-prescriptions","Multi-party consultation rooms","Automated appointment reminders","Patient portal & mobile app"],
    benefits: ["Expand reach to rural patients","Reduce no-show rates by 40%","Faster specialist access","Improved patient satisfaction scores"],
    desc: "Our telemedicine platform is a white-label, fully HIPAA-compliant video consultation suite. Integrated directly with RPM data, providers enter each call already informed — reducing time-to-treatment and improving outcomes."
  },
  {
    id: "ai",
    icon: "🤖",
    name: "AI Health Assistant",
    short: "Conversational AI that supports both patients and clinicians around the clock.",
    color: "#9b51e0",
    tag: "AI / ML",
    features: ["Symptom triage chatbot","Medication adherence nudges","Clinical decision support","Natural language summaries","Multi-language support"],
    benefits: ["Deflect 60% of routine inquiries","Improve medication adherence","24/7 patient engagement","Reduce physician burnout"],
    desc: "Powered by large language models fine-tuned on clinical ontologies, Giloys360's AI Health Assistant acts as an always-on copilot — triaging symptoms, answering patient questions, and surfacing relevant literature for clinicians."
  },
  {
    id: "hms",
    icon: "🏥",
    name: "Hospital Management System",
    short: "End-to-end operations management from admissions to billing.",
    color: "#eb5757",
    tag: "Operations",
    features: ["Smart bed management","OT scheduling & tracking","Automated billing & claims","Inventory & pharmacy module","Staff rostering & payroll"],
    benefits: ["Increase bed utilization by 25%","Cut billing errors by 80%","Real-time operational visibility","Integrated compliance reporting"],
    desc: "Giloys360 HMS is a modular, cloud-native hospital operations platform. Each module can be deployed independently or as a unified suite, integrating seamlessly with RPM and Telemedicine for a truly connected care ecosystem."
  },
];

const FEATURES = [
  { icon: "⚡", title: "Real-Time Monitoring", desc: "Sub-second vitals streaming from any wearable or bedside device direct to your dashboard." },
  { icon: "🧠", title: "AI-Powered Alerts", desc: "Intelligent anomaly detection flags deterioration before it becomes an emergency." },
  { icon: "🔐", title: "Secure Cloud Infrastructure", desc: "SOC-2 Type II & HIPAA-compliant, zero-trust architecture with 99.99% uptime SLA." },
  { icon: "📱", title: "Unified Doctor Dashboard", desc: "A single pane of glass for patient panels, alerts, trends and communication." },
  { icon: "🔗", title: "Seamless EHR Integration", desc: "Native HL7/FHIR connectors for Epic, Cerner, Meditech, and 40+ other systems." },
  { icon: "📈", title: "Outcome Analytics", desc: "Track clinical and financial KPIs in real time with customisable executive reports." },
];

const STEPS = [
  { n: "01", icon: "📡", title: "Device Integration", desc: "Connect wearables, IoT sensors, and bedside monitors via Bluetooth, WiFi, or LTE in minutes." },
  { n: "02", icon: "☁️", title: "Secure Data Collection", desc: "All vitals stream encrypted to our HIPAA-compliant cloud pipeline with zero data loss." },
  { n: "03", icon: "🧬", title: "AI Analysis", desc: "Our models score risk, detect trends, and generate natural-language summaries continuously." },
  { n: "04", icon: "👨‍⚕️", title: "Doctor Insights", desc: "Clinicians receive prioritised, actionable insights via dashboard, mobile app, or smart alerts." },
];

const TESTIMONIALS = [
  { name: "Dr. Ananya Sharma", role: "Chief of Cardiology, Apollo Hospitals", text: "Giloys360 RPM has fundamentally changed how we manage our post-cardiac patients. We catch deterioration 12 hours earlier on average.", avatar: "AS" },
  { name: "James Whitfield", role: "CTO, MedFirst Health System", text: "The API-first architecture made integration with our existing Epic deployment seamless. Best-in-class engineering team.", avatar: "JW" },
  { name: "Dr. Priya Nair", role: "Head of Telemedicine, AIIMS", text: "Our rural outreach programme scaled 4x after deploying the telemedicine platform. Patients in tier-3 cities now have specialist access.", avatar: "PN" },
];

const PLANS = [
  { name: "Starter", price: "$299", period: "/mo", desc: "Perfect for small clinics and independent practitioners.", features: ["Up to 50 monitored patients","RPM Core dashboard","Email & SMS alerts","Standard EHR connector","Email support"], accent: "#2f80ed" },
  { name: "Growth", price: "$899", period: "/mo", desc: "Scaling hospitals with advanced analytics needs.", features: ["Up to 300 monitored patients","RPM + Analytics bundle","AI-powered risk scoring","Custom reporting dashboards","Priority 24/7 support"], accent: "#00e5c9", popular: true },
  { name: "Enterprise", price: "Custom", period: "", desc: "Large health systems and hospital networks.", features: ["Unlimited patients","Full product suite","White-labelling","Dedicated CSM","SLA-guaranteed uptime","On-premise option"], accent: "#9b51e0" },
];

const BLOG_POSTS = [
  { title: "How Remote Patient Monitoring is Reducing Readmissions by 50%", date: "Apr 12, 2025", tag: "RPM", read: "6 min read", img: "🫀" },
  { title: "The Future of AI in Clinical Decision Support", date: "Mar 28, 2025", tag: "AI", read: "8 min read", img: "🤖" },
  { title: "Building HIPAA-Compliant Cloud Architecture for Healthcare", date: "Mar 10, 2025", tag: "Security", read: "5 min read", img: "🔐" },
  { title: "Telemedicine Adoption Trends in Emerging Markets", date: "Feb 22, 2025", tag: "Telehealth", read: "7 min read", img: "📹" },
  { title: "Integrating HL7 FHIR APIs: A Practical Guide", date: "Feb 8, 2025", tag: "Engineering", read: "10 min read", img: "🔗" },
  { title: "Patient Engagement Strategies That Actually Work", date: "Jan 30, 2025", tag: "Strategy", read: "4 min read", img: "💡" },
];

const CAREERS = [
  { title: "Senior Full-Stack Engineer", dept: "Engineering", location: "Remote / Bangalore", type: "Full-time" },
  { title: "Clinical Informatics Specialist", dept: "Clinical", location: "Mumbai", type: "Full-time" },
  { title: "Product Manager – RPM", dept: "Product", location: "Remote", type: "Full-time" },
  { title: "Healthcare Solutions Architect", dept: "Sales Engineering", location: "Hyderabad / Remote", type: "Full-time" },
  { title: "Machine Learning Engineer", dept: "AI / ML", location: "Remote", type: "Full-time" },
  { title: "Customer Success Manager", dept: "Customer Success", location: "Delhi", type: "Full-time" },
];

/* ─────────────────────────────────────────────
   NAVBAR
───────────────────────────────────────────── */
const NAV_ITEMS = ["Home","About","Products","How It Works","Pricing","Blog","Careers","Contact"];

function Navbar({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (p) => { setPage(p); setOpen(false); window.scrollTo(0,0); };

  return (
    <nav style={{
      position:"fixed", top:0, left:0, right:0, zIndex:1000,
      padding: scrolled ? "0.8rem 2rem" : "1.2rem 2rem",
      background: scrolled ? "rgba(11,31,69,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "none",
      transition:"all 0.35s ease",
      display:"flex", alignItems:"center", justifyContent:"space-between"
    }}>
      {/* Logo */}
      <div onClick={() => go("Home")} style={{cursor:"pointer",display:"flex",alignItems:"center",gap:"0.6rem"}}>
        <div style={{
          width:36,height:36,borderRadius:10,
          background:"linear-gradient(135deg,#2f80ed,#00e5c9)",
          display:"flex",alignItems:"center",justifyContent:"center",
          fontSize:"1.1rem",fontWeight:800,fontFamily:"Sora,sans-serif",color:"#fff"
        }}>G</div>
        <span style={{fontFamily:"Sora,sans-serif",fontWeight:700,fontSize:"1.1rem",color:"#fff"}}>
          Giloys<span style={{color:"var(--accent)"}}>360</span>
        </span>
      </div>

      {/* Desktop links */}
      <div className="desktop-nav" style={{display:"flex",gap:"2rem",alignItems:"center"}}>
        {NAV_ITEMS.map(n => (
          <span key={n} className={`nav-link${page===n?" active":""}`} onClick={() => go(n)}>{n}</span>
        ))}
      </div>

      <div className="desktop-nav" style={{display:"flex",gap:"0.75rem"}}>
        <button className="btn-ghost" style={{padding:"0.5rem 1.2rem",fontSize:"0.82rem"}} onClick={() => go("Contact")}>Login</button>
        <button className="btn-primary" style={{padding:"0.5rem 1.3rem",fontSize:"0.82rem"}} onClick={() => go("Contact")}>Get Started</button>
      </div>

      {/* Hamburger */}
      <button onClick={() => setOpen(!open)} style={{
        display:"none",background:"none",border:"none",color:"#fff",fontSize:"1.5rem",
        cursor:"pointer",
        ...(window.innerWidth <= 768 ? {display:"block"} : {})
      }}>☰</button>

      {/* Mobile menu */}
      {open && (
        <div style={{
          position:"fixed",top:0,left:0,right:0,bottom:0,
          background:"rgba(11,31,69,0.98)",backdropFilter:"blur(20px)",
          zIndex:999,display:"flex",flexDirection:"column",alignItems:"center",
          justifyContent:"center",gap:"2rem",
          animation:"fadeUp 0.3s ease"
        }}>
          <button onClick={() => setOpen(false)} style={{
            position:"absolute",top:"1.5rem",right:"1.5rem",
            background:"none",border:"none",color:"#fff",fontSize:"1.8rem",cursor:"pointer"
          }}>✕</button>
          {NAV_ITEMS.map(n => (
            <span key={n} onClick={() => go(n)} style={{
              fontFamily:"Sora,sans-serif",fontWeight:600,fontSize:"1.4rem",
              color: page===n ? "var(--accent)" : "var(--white)",cursor:"pointer"
            }}>{n}</span>
          ))}
          <button className="btn-primary" onClick={() => go("Contact")}>Get Started</button>
        </div>
      )}
    </nav>
  );
}

/* ─────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────── */
function Footer({ setPage }) {
  const go = (p) => { setPage(p); window.scrollTo(0,0); };
  return (
    <footer style={{
      borderTop:"1px solid var(--border)",
      padding:"4rem 2rem 2rem",
      background:"linear-gradient(to top, rgba(7,15,40,0.95), transparent)"
    }}>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr",gap:"2rem",marginBottom:"3rem"}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:"0.6rem",marginBottom:"1rem"}}>
              <div style={{width:36,height:36,borderRadius:10,background:"linear-gradient(135deg,#2f80ed,#00e5c9)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.1rem",fontWeight:800,color:"#fff"}}>G</div>
              <span style={{fontFamily:"Sora,sans-serif",fontWeight:700,fontSize:"1.1rem"}}>Giloys<span style={{color:"var(--accent)"}}>360</span></span>
            </div>
            <p style={{color:"var(--muted)",fontSize:"0.85rem",lineHeight:1.7,maxWidth:220}}>
              Transforming patient care through connected health technology and AI-driven insights.
            </p>
            <div style={{display:"flex",gap:"0.75rem",marginTop:"1.25rem"}}>
              {["𝕏","in","fb","▶"].map(s => (
                <div key={s} style={{
                  width:34,height:34,borderRadius:8,
                  background:"var(--glass2)",border:"1px solid var(--border)",
                  display:"flex",alignItems:"center",justifyContent:"center",
                  fontSize:"0.75rem",cursor:"pointer",transition:"background 0.2s"
                }} onMouseEnter={e=>e.target.style.background="var(--glass)"}
                   onMouseLeave={e=>e.target.style.background="var(--glass2)"}>{s}</div>
              ))}
            </div>
          </div>
          {[
            { title:"Products", links:["Remote Patient Monitoring","Smart Analytics","Telemedicine","AI Assistant","Hospital Management"]},
            { title:"Company",  links:["About","Careers","Blog","Press","Partners"]},
            { title:"Legal",    links:["Privacy Policy","Terms of Service","HIPAA Notice","Cookie Policy"]},
            { title:"Contact",  links:["hello@giloys360.com","Bangalore, India","support.giloys360.com"]},
          ].map(col => (
            <div key={col.title}>
              <h4 style={{fontFamily:"Sora,sans-serif",fontWeight:600,fontSize:"0.85rem",marginBottom:"1rem",color:"#fff"}}>{col.title}</h4>
              {col.links.map(l => (
                <p key={l} onClick={() => go(l.includes("Policy")||l.includes("Terms")?"Privacy":l.includes("About")?"About":"Contact")}
                   style={{color:"var(--muted)",fontSize:"0.82rem",marginBottom:"0.6rem",cursor:"pointer",transition:"color 0.2s"}}
                   onMouseEnter={e=>e.target.style.color="var(--accent)"}
                   onMouseLeave={e=>e.target.style.color="var(--muted)"}>{l}</p>
              ))}
            </div>
          ))}
        </div>
        <div style={{borderTop:"1px solid var(--border)",paddingTop:"1.5rem",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"1rem"}}>
          <p style={{color:"var(--muted)",fontSize:"0.8rem"}}>© 2025 Giloys360 Technologies Pvt. Ltd. All rights reserved.</p>
          <p style={{color:"var(--muted)",fontSize:"0.8rem"}}>HIPAA Compliant · SOC-2 Certified · ISO 27001</p>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   MESH BG COMPONENT
───────────────────────────────────────────── */
function MeshBg() {
  return (
    <div className="mesh-bg">
      <div className="mesh-circle" style={{width:600,height:600,top:"-200px",right:"-200px",opacity:0.6}}/>
      <div className="mesh-circle" style={{width:400,height:400,bottom:"10%",left:"-150px",opacity:0.4}}/>
      <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(rgba(47,128,237,0.06) 1px,transparent 1px)",backgroundSize:"40px 40px"}}/>
    </div>
  );
}

/* ─────────────────────────────────────────────
   HOME PAGE
───────────────────────────────────────────── */
function HomePage({ setPage }) {
  const f1 = useFadeIn(), f2 = useFadeIn(), f3 = useFadeIn(), f4 = useFadeIn(), f5 = useFadeIn(), f6 = useFadeIn();

  return (
    <div>
      {/* HERO */}
      <section style={{
        minHeight:"100vh",position:"relative",overflow:"hidden",
        background:"linear-gradient(135deg, #0b1f45 0%, #132d6e 50%, #0d1f3c 100%)",
        display:"flex",alignItems:"center",paddingTop:80
      }}>
        <MeshBg/>
        {/* Floating orbs */}
        <div style={{position:"absolute",top:"20%",right:"8%",width:280,height:280,borderRadius:"50%",background:"radial-gradient(circle,rgba(47,128,237,0.12),transparent 70%)"}} className="animate-float"/>
        <div style={{position:"absolute",bottom:"15%",left:"5%",width:180,height:180,borderRadius:"50%",background:"radial-gradient(circle,rgba(0,229,201,0.1),transparent 70%)"}} className="animate-float2"/>

        <div style={{maxWidth:1200,margin:"0 auto",padding:"2rem",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4rem",alignItems:"center",position:"relative",zIndex:1}} className="hero-grid">
          {/* Left */}
          <div style={{animation:"fadeUp 0.8s ease forwards"}}>
            <div className="section-tag">✦ Healthcare Innovation Platform</div>
            <h1 style={{fontSize:"clamp(2.2rem,4.5vw,3.5rem)",fontWeight:800,lineHeight:1.15,marginBottom:"1.5rem",color:"#fff"}}>
              Transform Patient Care with{" "}
              <span className="gradient-text">Advanced Remote Monitoring</span>
            </h1>
            <p style={{color:"var(--muted)",fontSize:"1.05rem",lineHeight:1.75,marginBottom:"2.5rem",maxWidth:500}}>
              Giloys360 delivers real-time patient insights, AI-powered alerts and seamless EHR integration — keeping patients safe and clinicians informed, always.
            </p>
            <div style={{display:"flex",gap:"1rem",flexWrap:"wrap"}}>
              <button className="btn-primary" onClick={() => { setPage("Contact"); window.scrollTo(0,0); }}>Get Started →</button>
              <button className="btn-ghost" onClick={() => { setPage("Products"); window.scrollTo(0,0); }}>Explore Products</button>
            </div>
            {/* Stats */}
            <div style={{display:"flex",gap:"2.5rem",marginTop:"3rem",flexWrap:"wrap"}}>
              {[["500+","Hospitals"],["2M+","Patients Monitored"],["99.99%","Uptime SLA"]].map(([n,l]) => (
                <div key={l}>
                  <div style={{fontFamily:"Sora,sans-serif",fontWeight:800,fontSize:"1.6rem",color:"#fff"}}>{n}</div>
                  <div style={{color:"var(--muted)",fontSize:"0.8rem"}}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right – visual */}
          <div style={{position:"relative",display:"flex",justifyContent:"center",animation:"fadeUp 1s ease 0.2s forwards",opacity:0}}>
            {/* Big card */}
            <div className="glass-card2" style={{borderRadius:24,padding:"2rem",width:"100%",maxWidth:420,position:"relative",zIndex:2}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1.5rem"}}>
                <div>
                  <div style={{fontFamily:"Sora,sans-serif",fontWeight:700,fontSize:"0.9rem",color:"#fff"}}>Patient Dashboard</div>
                  <div style={{color:"var(--muted)",fontSize:"0.75rem"}}>Live vitals • 24 patients</div>
                </div>
                <div style={{width:10,height:10,borderRadius:"50%",background:"var(--accent)",boxShadow:"0 0 8px var(--accent)",animation:"blink 1.5s ease infinite"}}/>
              </div>
              {/* Vital rows */}
              {[
                { label:"Heart Rate", val:"72 bpm",  bar:72,  color:"#eb5757" },
                { label:"SpO₂",       val:"98%",     bar:98,  color:"#00e5c9" },
                { label:"BP",         val:"118/76",  bar:78,  color:"#2f80ed" },
                { label:"Temp",       val:"36.8 °C", bar:65,  color:"#f7b731" },
              ].map(v => (
                <div key={v.label} style={{marginBottom:"1.1rem"}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:"0.3rem"}}>
                    <span style={{fontSize:"0.78rem",color:"var(--text)"}}>{v.label}</span>
                    <span style={{fontSize:"0.78rem",fontWeight:600,color:v.color}}>{v.val}</span>
                  </div>
                  <div style={{height:5,borderRadius:10,background:"rgba(255,255,255,0.1)"}}>
                    <div style={{height:"100%",width:`${v.bar}%`,borderRadius:10,background:`linear-gradient(90deg,${v.color}88,${v.color})`,transition:"width 1s ease"}}/>
                  </div>
                </div>
              ))}
              <div style={{marginTop:"1rem",padding:"0.75rem",background:"rgba(235,87,87,0.12)",border:"1px solid rgba(235,87,87,0.3)",borderRadius:12}}>
                <span style={{fontSize:"0.78rem",color:"#eb5757"}}>⚠ Alert: Patient #14 — Elevated HR trend detected</span>
              </div>
            </div>

            {/* Floating badge */}
            <div className="glass-card animate-float2" style={{
              position:"absolute",top:-20,right:-20,borderRadius:16,padding:"0.75rem 1rem",
              display:"flex",alignItems:"center",gap:"0.5rem",zIndex:3
            }}>
              <span style={{fontSize:"1.2rem"}}>🤖</span>
              <div>
                <div style={{fontSize:"0.72rem",fontWeight:700,color:"#fff"}}>AI Alert</div>
                <div style={{fontSize:"0.68rem",color:"var(--accent)"}}>Risk: LOW</div>
              </div>
            </div>

            <div className="glass-card animate-float3" style={{
              position:"absolute",bottom:-15,left:-15,borderRadius:16,padding:"0.75rem 1.2rem",zIndex:3
            }}>
              <div style={{fontSize:"0.72rem",color:"var(--muted)"}}>Active Monitoring</div>
              <div style={{fontFamily:"Sora,sans-serif",fontWeight:700,fontSize:"1.1rem",color:"var(--accent)"}}>2,847 Patients</div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{padding:"6rem 2rem",position:"relative",overflow:"hidden"}}>
        <MeshBg/>
        <div ref={f1} className="fade-in" style={{maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1}}>
          <div style={{textAlign:"center",marginBottom:"3.5rem"}}>
            <div className="section-tag">✦ Platform Capabilities</div>
            <h2 style={{fontSize:"clamp(1.8rem,3.5vw,2.6rem)",fontWeight:800,color:"#fff"}}>
              Everything you need to deliver{" "}
              <span className="gradient-text">connected care</span>
            </h2>
          </div>
          <div className="features-grid" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1.5rem"}}>
            {FEATURES.map((f,i) => (
              <div key={f.title} className="glass-card" style={{
                borderRadius:20,padding:"2rem 1.75rem",
                transition:"transform 0.3s,box-shadow 0.3s",cursor:"default",
                animationDelay:`${i*0.1}s`
              }}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-6px)";e.currentTarget.style.boxShadow="0 20px 60px rgba(47,128,237,0.2)"}}
                onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none"}}
              >
                <div style={{fontSize:"2rem",marginBottom:"1rem"}}>{f.icon}</div>
                <h3 style={{fontFamily:"Sora,sans-serif",fontWeight:700,fontSize:"1rem",marginBottom:"0.5rem",color:"#fff"}}>{f.title}</h3>
                <p style={{color:"var(--muted)",fontSize:"0.85rem",lineHeight:1.7}}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS PREVIEW */}
      <section style={{padding:"4rem 2rem 6rem",position:"relative"}}>
        <MeshBg/>
        <div ref={f2} className="fade-in" style={{maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1}}>
          <div style={{textAlign:"center",marginBottom:"3.5rem"}}>
            <div className="section-tag">✦ Our Products</div>
            <h2 style={{fontSize:"clamp(1.8rem,3.5vw,2.6rem)",fontWeight:800,color:"#fff"}}>
              A complete <span className="gradient-text">healthcare technology</span> ecosystem
            </h2>
            <p style={{color:"var(--muted)",maxWidth:550,margin:"1rem auto",fontSize:"0.95rem",lineHeight:1.7}}>
              From continuous patient monitoring to AI-powered decision support — every product built to integrate.
            </p>
          </div>
          <div className="products-grid" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1.5rem"}}>
            {PRODUCTS.map((p,i) => (
              <div key={p.id} className="product-card" style={{cursor:"pointer"}} onClick={() => { setPage("ProductDetail"); window.scrollTo(0,0); sessionStorage.setItem("pid",p.id); }}>
                <div className="card-inner glass-card" style={{borderRadius:22,padding:"2rem",transition:"transform 0.3s,box-shadow 0.3s",height:"100%"}}>
                  <div style={{display:"flex",alignItems:"center",gap:"0.75rem",marginBottom:"1rem"}}>
                    <div style={{width:48,height:48,borderRadius:14,background:`${p.color}22`,border:`1px solid ${p.color}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.4rem"}}>{p.icon}</div>
                    <span style={{fontSize:"0.7rem",color:p.color,fontFamily:"Sora,sans-serif",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",background:`${p.color}15`,padding:"0.2rem 0.6rem",borderRadius:50}}>{p.tag}</span>
                  </div>
                  <h3 style={{fontFamily:"Sora,sans-serif",fontWeight:700,fontSize:"1rem",marginBottom:"0.6rem",color:"#fff"}}>{p.name}</h3>
                  <p style={{color:"var(--muted)",fontSize:"0.83rem",lineHeight:1.7,marginBottom:"1.5rem"}}>{p.short}</p>
                  <span style={{color:p.color,fontSize:"0.83rem",fontWeight:600,fontFamily:"Sora,sans-serif"}}>Learn More →</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{textAlign:"center",marginTop:"2.5rem"}}>
            <button className="btn-ghost" onClick={() => { setPage("Products"); window.scrollTo(0,0); }}>View All Products</button>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{padding:"5rem 2rem",background:"linear-gradient(135deg,rgba(19,45,110,0.5),rgba(11,31,69,0.5))"}}>
        <div ref={f3} className="fade-in" style={{maxWidth:1200,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:"3.5rem"}}>
            <div className="section-tag">✦ How It Works</div>
            <h2 style={{fontSize:"clamp(1.8rem,3.5vw,2.6rem)",fontWeight:800,color:"#fff"}}>
              Up and running in <span className="gradient-text">4 simple steps</span>
            </h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:"2rem"}}>
            {STEPS.map((s,i) => (
              <div key={s.n} style={{textAlign:"center",position:"relative"}}>
                <div style={{
                  width:72,height:72,borderRadius:20,margin:"0 auto 1.25rem",
                  background:"linear-gradient(135deg,rgba(47,128,237,0.2),rgba(0,229,201,0.1))",
                  border:"1px solid rgba(47,128,237,0.35)",
                  display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.8rem"
                }}>{s.icon}</div>
                <div style={{fontFamily:"Sora,sans-serif",fontWeight:800,fontSize:"0.7rem",letterSpacing:"0.15em",color:"var(--accent)",marginBottom:"0.4rem"}}>{s.n}</div>
                <h3 style={{fontFamily:"Sora,sans-serif",fontWeight:700,fontSize:"1rem",marginBottom:"0.6rem",color:"#fff"}}>{s.title}</h3>
                <p style={{color:"var(--muted)",fontSize:"0.83rem",lineHeight:1.7}}>{s.desc}</p>
                {i < STEPS.length-1 && <div style={{position:"absolute",top:36,left:"calc(50% + 36px)",width:"calc(100% - 72px)",height:"1px",background:"linear-gradient(90deg,rgba(47,128,237,0.5),transparent)",display:"none"}}/>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{padding:"5rem 2rem"}}>
        <div ref={f4} className="fade-in" style={{maxWidth:1200,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:"3.5rem"}}>
            <div className="section-tag">✦ Testimonials</div>
            <h2 style={{fontSize:"clamp(1.8rem,3.5vw,2.6rem)",fontWeight:800,color:"#fff"}}>
              Trusted by <span className="gradient-text">leading clinicians</span>
            </h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"1.5rem"}}>
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="glass-card" style={{borderRadius:22,padding:"2rem",transition:"transform 0.3s"}}
                onMouseEnter={e=>e.currentTarget.style.transform="translateY(-5px)"}
                onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}
              >
                <div style={{fontSize:"1.5rem",color:"var(--accent)",marginBottom:"1rem"}}>❝</div>
                <p style={{color:"var(--text)",fontSize:"0.88rem",lineHeight:1.8,marginBottom:"1.5rem",fontStyle:"italic"}}>{t.text}</p>
                <div style={{display:"flex",alignItems:"center",gap:"0.75rem"}}>
                  <div style={{width:42,height:42,borderRadius:"50%",background:"linear-gradient(135deg,#2f80ed,#00e5c9)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"Sora,sans-serif",fontWeight:700,fontSize:"0.85rem",color:"#fff"}}>{t.avatar}</div>
                  <div>
                    <div style={{fontFamily:"Sora,sans-serif",fontWeight:700,fontSize:"0.88rem",color:"#fff"}}>{t.name}</div>
                    <div style={{color:"var(--muted)",fontSize:"0.75rem"}}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section ref={f5} className="fade-in" style={{padding:"4rem 2rem"}}>
        <div style={{maxWidth:900,margin:"0 auto",textAlign:"center",background:"linear-gradient(135deg,rgba(19,45,110,0.8),rgba(47,128,237,0.2))",border:"1px solid rgba(47,128,237,0.3)",borderRadius:28,padding:"4rem 2rem",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(rgba(47,128,237,0.08) 1px,transparent 1px)",backgroundSize:"30px 30px"}}/>
          <div style={{position:"relative",zIndex:1}}>
            <h2 style={{fontSize:"clamp(1.8rem,3.5vw,2.4rem)",fontWeight:800,color:"#fff",marginBottom:"1rem"}}>
              Ready to modernize your <span className="gradient-text">patient monitoring?</span>
            </h2>
            <p style={{color:"var(--muted)",marginBottom:"2rem",fontSize:"0.95rem",maxWidth:500,margin:"0 auto 2rem"}}>
              Join 500+ hospitals already delivering better outcomes with Giloys360.
            </p>
            <div style={{display:"flex",gap:"1rem",justifyContent:"center",flexWrap:"wrap"}}>
              <button className="btn-primary" onClick={() => { setPage("Contact"); window.scrollTo(0,0); }}>Request a Demo</button>
              <button className="btn-ghost" onClick={() => { setPage("Pricing"); window.scrollTo(0,0); }}>View Pricing</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─────────────────────────────────────────────
   ABOUT PAGE
───────────────────────────────────────────── */
function AboutPage() {
  const f1 = useFadeIn(), f2 = useFadeIn(), f3 = useFadeIn();
  return (
    <div style={{paddingTop:80}}>
      <section style={{padding:"5rem 2rem",background:"linear-gradient(135deg,#0b1f45,#132d6e)",position:"relative",overflow:"hidden"}}>
        <MeshBg/>
        <div style={{maxWidth:900,margin:"0 auto",textAlign:"center",position:"relative",zIndex:1,animation:"fadeUp 0.8s ease forwards"}}>
          <div className="section-tag">✦ Our Story</div>
          <h1 style={{fontSize:"clamp(2rem,4vw,3rem)",fontWeight:800,color:"#fff",marginBottom:"1.5rem"}}>
            Built by clinicians, <span className="gradient-text">powered by engineers</span>
          </h1>
          <p style={{color:"var(--muted)",fontSize:"1rem",lineHeight:1.85,maxWidth:700,margin:"0 auto"}}>
            Giloys360 was founded in 2019 by a team of physicians and software engineers who experienced first-hand the dangerous gaps in post-discharge patient care. Our mission is singular: use technology to ensure no patient falls through the cracks.
          </p>
        </div>
      </section>

      <section style={{padding:"5rem 2rem"}}>
        <div ref={f1} className="fade-in" style={{maxWidth:1200,margin:"0 auto"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4rem",alignItems:"center"}}>
            <div>
              <div className="section-tag">✦ Our Mission</div>
              <h2 style={{fontSize:"clamp(1.6rem,3vw,2.2rem)",fontWeight:800,color:"#fff",marginBottom:"1.25rem"}}>
                Closing the care gap for <span className="gradient-text">every patient</span>
              </h2>
              <p style={{color:"var(--muted)",lineHeight:1.8,fontSize:"0.95rem",marginBottom:"1.5rem"}}>
                Every year, millions of patients are discharged from hospitals into a monitoring void. Giloys360 bridges that gap — providing hospitals, clinics, and home care agencies with the tools to monitor, engage, and protect patients wherever they are.
              </p>
              <p style={{color:"var(--muted)",lineHeight:1.8,fontSize:"0.95rem"}}>
                We build every product with clinical workflows at the centre, ensuring adoption is seamless and outcomes are measurable.
              </p>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem"}}>
              {[["2019","Founded"],["500+","Hospital Partners"],["2M+","Lives Monitored"],["40+","Countries"]].map(([n,l]) => (
                <div key={l} className="glass-card" style={{borderRadius:18,padding:"1.75rem",textAlign:"center"}}>
                  <div style={{fontFamily:"Sora,sans-serif",fontWeight:800,fontSize:"1.8rem",color:"var(--accent)"}}>{n}</div>
                  <div style={{color:"var(--muted)",fontSize:"0.82rem",marginTop:"0.3rem"}}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{padding:"4rem 2rem 6rem"}}>
        <div ref={f2} className="fade-in" style={{maxWidth:1200,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:"3rem"}}>
            <div className="section-tag">✦ Leadership</div>
            <h2 style={{fontSize:"clamp(1.6rem,3vw,2.2rem)",fontWeight:800,color:"#fff"}}>Meet the <span className="gradient-text">team</span></h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:"1.5rem"}}>
            {[
              {n:"Dr. Arjun Mehta",role:"CEO & Co-Founder",bg:"#2f80ed",init:"AM"},
              {n:"Sneha Kulkarni",role:"CTO & Co-Founder",bg:"#00e5c9",init:"SK"},
              {n:"Dr. Ritu Verma",role:"Chief Medical Officer",bg:"#f7b731",init:"RV"},
              {n:"Rahul Desai",role:"Chief Product Officer",bg:"#9b51e0",init:"RD"},
            ].map(p => (
              <div key={p.n} className="glass-card" style={{borderRadius:20,padding:"2rem",textAlign:"center",transition:"transform 0.3s"}}
                onMouseEnter={e=>e.currentTarget.style.transform="translateY(-5px)"}
                onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}
              >
                <div style={{width:70,height:70,borderRadius:"50%",background:`linear-gradient(135deg,${p.bg}88,${p.bg})`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 1.25rem",fontFamily:"Sora,sans-serif",fontWeight:700,fontSize:"1.2rem",color:"#fff"}}>{p.init}</div>
                <div style={{fontFamily:"Sora,sans-serif",fontWeight:700,fontSize:"0.95rem",color:"#fff",marginBottom:"0.3rem"}}>{p.n}</div>
                <div style={{color:"var(--muted)",fontSize:"0.78rem"}}>{p.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PRODUCTS PAGE
───────────────────────────────────────────── */
function ProductsPage({ setPage }) {
  const [filter, setFilter] = useState("All");
  const tags = ["All", ...new Set(PRODUCTS.map(p => p.tag))];

  const filtered = filter === "All" ? PRODUCTS : PRODUCTS.filter(p => p.tag === filter);

  return (
    <div style={{paddingTop:80}}>
      <section style={{padding:"5rem 2rem 3rem",background:"linear-gradient(135deg,#0b1f45,#132d6e)",position:"relative",overflow:"hidden",textAlign:"center"}}>
        <MeshBg/>
        <div style={{position:"relative",zIndex:1,animation:"fadeUp 0.8s ease forwards"}}>
          <div className="section-tag">✦ Product Suite</div>
          <h1 style={{fontSize:"clamp(2rem,4vw,3rem)",fontWeight:800,color:"#fff",marginBottom:"1rem"}}>
            Our <span className="gradient-text">healthcare products</span>
          </h1>
          <p style={{color:"var(--muted)",maxWidth:500,margin:"0 auto",fontSize:"0.95rem",lineHeight:1.7}}>
            An interconnected ecosystem of tools designed to improve outcomes at every touchpoint.
          </p>
        </div>
      </section>

      <section style={{padding:"3rem 2rem 6rem"}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          {/* Filter tabs */}
          <div style={{display:"flex",gap:"0.75rem",marginBottom:"3rem",flexWrap:"wrap",justifyContent:"center"}}>
            {tags.map(t => (
              <button key={t} onClick={() => setFilter(t)} style={{
                padding:"0.5rem 1.25rem",borderRadius:50,border:"1px solid var(--border)",
                background: filter===t ? "linear-gradient(135deg,#2f80ed,#00e5c9)" : "var(--glass)",
                color:"#fff",fontFamily:"Sora,sans-serif",fontWeight:600,fontSize:"0.82rem",
                cursor:"pointer",transition:"all 0.2s"
              }}>{t}</button>
            ))}
          </div>

          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:"1.5rem"}}>
            {filtered.map(p => (
              <div key={p.id} className="glass-card" style={{borderRadius:22,padding:"2.5rem",cursor:"pointer",transition:"transform 0.3s,box-shadow 0.3s"}}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-7px)";e.currentTarget.style.boxShadow=`0 20px 60px ${p.color}33`}}
                onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none"}}
                onClick={() => { sessionStorage.setItem("pid",p.id); setPage("ProductDetail"); window.scrollTo(0,0); }}
              >
                <div style={{width:56,height:56,borderRadius:16,background:`${p.color}22`,border:`1px solid ${p.color}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.6rem",marginBottom:"1.25rem"}}>{p.icon}</div>
                <span style={{fontSize:"0.7rem",color:p.color,fontFamily:"Sora,sans-serif",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",background:`${p.color}15`,padding:"0.2rem 0.6rem",borderRadius:50,display:"inline-block",marginBottom:"0.75rem"}}>{p.tag}</span>
                <h3 style={{fontFamily:"Sora,sans-serif",fontWeight:700,fontSize:"1.05rem",color:"#fff",marginBottom:"0.7rem"}}>{p.name}</h3>
                <p style={{color:"var(--muted)",fontSize:"0.85rem",lineHeight:1.7,marginBottom:"1.5rem"}}>{p.short}</p>
                <div style={{display:"flex",gap:"0.5rem",flexWrap:"wrap",marginBottom:"1.5rem"}}>
                  {p.features.slice(0,3).map(f => (
                    <span key={f} style={{fontSize:"0.72rem",color:"var(--text)",background:"rgba(255,255,255,0.07)",padding:"0.2rem 0.6rem",borderRadius:50,border:"1px solid var(--border)"}}>{f}</span>
                  ))}
                </div>
                <span style={{color:p.color,fontSize:"0.85rem",fontWeight:600}}>View Details →</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PRODUCT DETAIL PAGE
───────────────────────────────────────────── */
function ProductDetailPage({ setPage }) {
  const pid = sessionStorage.getItem("pid") || "rpm";
  const product = PRODUCTS.find(p => p.id === pid) || PRODUCTS[0];
  const f1 = useFadeIn(), f2 = useFadeIn();

  return (
    <div style={{paddingTop:80}}>
      {/* Hero */}
      <section style={{padding:"5rem 2rem 4rem",background:"linear-gradient(135deg,#0b1f45,#132d6e)",position:"relative",overflow:"hidden"}}>
        <MeshBg/>
        <div style={{maxWidth:1100,margin:"0 auto",position:"relative",zIndex:1}}>
          <button onClick={() => { setPage("Products"); window.scrollTo(0,0); }} style={{background:"none",border:"none",color:"var(--muted)",cursor:"pointer",fontSize:"0.85rem",marginBottom:"2rem",display:"flex",alignItems:"center",gap:"0.4rem"}}>← Back to Products</button>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4rem",alignItems:"center",animation:"fadeUp 0.8s ease forwards"}} className="hero-grid">
            <div>
              <div style={{display:"flex",alignItems:"center",gap:"0.75rem",marginBottom:"1.5rem"}}>
                <div style={{width:64,height:64,borderRadius:18,background:`${product.color}22`,border:`1px solid ${product.color}55`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"2rem"}}>{product.icon}</div>
                <span style={{fontSize:"0.75rem",color:product.color,fontFamily:"Sora,sans-serif",fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",background:`${product.color}15`,padding:"0.3rem 0.9rem",borderRadius:50}}>{product.tag}</span>
              </div>
              <h1 style={{fontSize:"clamp(1.8rem,3.5vw,2.8rem)",fontWeight:800,color:"#fff",marginBottom:"1.25rem"}}>{product.name}</h1>
              <p style={{color:"var(--muted)",fontSize:"0.98rem",lineHeight:1.8,marginBottom:"2rem"}}>{product.desc}</p>
              <div style={{display:"flex",gap:"1rem",flexWrap:"wrap"}}>
                <button className="btn-primary" onClick={() => { setPage("Contact"); window.scrollTo(0,0); }}>Request Demo</button>
                <button className="btn-ghost">Download Datasheet</button>
              </div>
            </div>
            <div className="glass-card2" style={{borderRadius:24,padding:"2.5rem"}}>
              <h3 style={{fontFamily:"Sora,sans-serif",fontWeight:700,fontSize:"1rem",marginBottom:"1.5rem",color:"#fff"}}>Key Features</h3>
              {product.features.map(f => (
                <div key={f} style={{display:"flex",alignItems:"center",gap:"0.75rem",marginBottom:"1rem"}}>
                  <div style={{width:22,height:22,borderRadius:"50%",background:`${product.color}22`,border:`1px solid ${product.color}55`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.65rem",color:product.color,flexShrink:0}}>✓</div>
                  <span style={{color:"var(--text)",fontSize:"0.88rem"}}>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section ref={f1} className="fade-in" style={{padding:"5rem 2rem"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:"3rem"}}>
            <div className="section-tag">✦ Measurable Impact</div>
            <h2 style={{fontSize:"clamp(1.6rem,3vw,2.2rem)",fontWeight:800,color:"#fff"}}>Proven <span className="gradient-text">outcomes</span></h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:"1.5rem"}}>
            {product.benefits.map((b,i) => (
              <div key={b} className="glass-card" style={{borderRadius:18,padding:"2rem",textAlign:"center",borderTop:`3px solid ${product.color}`}}>
                <div style={{fontSize:"2rem",marginBottom:"0.75rem"}}>{"🏆🎯📈💡"[i]}</div>
                <p style={{color:"var(--text)",fontSize:"0.88rem",lineHeight:1.7}}>{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Products */}
      <section ref={f2} className="fade-in" style={{padding:"3rem 2rem 6rem"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <h3 style={{fontFamily:"Sora,sans-serif",fontWeight:700,fontSize:"1.2rem",marginBottom:"1.5rem",color:"#fff"}}>Explore other products</h3>
          <div style={{display:"flex",gap:"1rem",flexWrap:"wrap"}}>
            {PRODUCTS.filter(p => p.id !== product.id).map(p => (
              <div key={p.id} className="glass-card" style={{borderRadius:16,padding:"1rem 1.5rem",cursor:"pointer",display:"flex",alignItems:"center",gap:"0.75rem",transition:"transform 0.2s"}}
                onMouseEnter={e=>e.currentTarget.style.transform="translateY(-3px)"}
                onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}
                onClick={() => { sessionStorage.setItem("pid",p.id); window.scrollTo(0,0); }}
              >
                <span style={{fontSize:"1.2rem"}}>{p.icon}</span>
                <span style={{fontFamily:"Sora,sans-serif",fontWeight:600,fontSize:"0.85rem",color:"#fff"}}>{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─────────────────────────────────────────────
   HOW IT WORKS PAGE
───────────────────────────────────────────── */
function HowItWorksPage({ setPage }) {
  const f1 = useFadeIn();
  return (
    <div style={{paddingTop:80}}>
      <section style={{padding:"5rem 2rem 3rem",textAlign:"center",background:"linear-gradient(135deg,#0b1f45,#132d6e)",position:"relative",overflow:"hidden"}}>
        <MeshBg/>
        <div style={{position:"relative",zIndex:1,animation:"fadeUp 0.8s ease forwards"}}>
          <div className="section-tag">✦ The Process</div>
          <h1 style={{fontSize:"clamp(2rem,4vw,3rem)",fontWeight:800,color:"#fff",marginBottom:"1rem"}}>
            How <span className="gradient-text">Giloys360 works</span>
          </h1>
          <p style={{color:"var(--muted)",maxWidth:520,margin:"0 auto",lineHeight:1.7,fontSize:"0.95rem"}}>
            From device onboarding to actionable clinical insight — here's the complete journey.
          </p>
        </div>
      </section>

      <section style={{padding:"5rem 2rem 6rem"}}>
        <div style={{maxWidth:900,margin:"0 auto"}}>
          {STEPS.map((s, i) => (
            <div key={s.n} style={{display:"flex",gap:"2rem",marginBottom:"3.5rem",alignItems:"flex-start",animation:`fadeUp 0.7s ease ${i*0.15}s forwards`,opacity:0}}>
              <div style={{flexShrink:0}}>
                <div style={{width:64,height:64,borderRadius:18,background:"linear-gradient(135deg,rgba(47,128,237,0.25),rgba(0,229,201,0.1))",border:"1px solid rgba(47,128,237,0.4)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.8rem"}}>{s.icon}</div>
              </div>
              <div className="glass-card" style={{borderRadius:20,padding:"2rem",flex:1}}>
                <div style={{fontFamily:"Sora,sans-serif",fontWeight:800,fontSize:"0.7rem",letterSpacing:"0.15em",color:"var(--accent)",marginBottom:"0.5rem"}}>{s.n}</div>
                <h2 style={{fontFamily:"Sora,sans-serif",fontWeight:700,fontSize:"1.2rem",color:"#fff",marginBottom:"0.75rem"}}>{s.title}</h2>
                <p style={{color:"var(--muted)",lineHeight:1.8,fontSize:"0.9rem"}}>{s.desc}</p>
              </div>
            </div>
          ))}
          <div style={{textAlign:"center",marginTop:"2rem"}}>
            <button className="btn-primary" onClick={() => { setPage("Contact"); window.scrollTo(0,0); }}>See it in action →</button>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PRICING PAGE
───────────────────────────────────────────── */
function PricingPage({ setPage }) {
  return (
    <div style={{paddingTop:80}}>
      <section style={{padding:"5rem 2rem 3rem",textAlign:"center",background:"linear-gradient(135deg,#0b1f45,#132d6e)",position:"relative",overflow:"hidden"}}>
        <MeshBg/>
        <div style={{position:"relative",zIndex:1,animation:"fadeUp 0.8s ease forwards"}}>
          <div className="section-tag">✦ Simple Pricing</div>
          <h1 style={{fontSize:"clamp(2rem,4vw,3rem)",fontWeight:800,color:"#fff",marginBottom:"1rem"}}>
            Transparent pricing, <span className="gradient-text">no surprises</span>
          </h1>
          <p style={{color:"var(--muted)",maxWidth:480,margin:"0 auto",fontSize:"0.95rem",lineHeight:1.7}}>
            Start small and scale as your programme grows. Cancel or change plans at any time.
          </p>
        </div>
      </section>

      <section style={{padding:"4rem 2rem 6rem"}}>
        <div style={{maxWidth:1050,margin:"0 auto"}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"1.5rem",alignItems:"start"}}>
            {PLANS.map(plan => (
              <div key={plan.name} style={{
                borderRadius:24,padding:"2.5rem",
                background: plan.popular ? `linear-gradient(135deg,rgba(47,128,237,0.2),rgba(0,229,201,0.1))` : "var(--glass)",
                border: plan.popular ? `2px solid ${plan.accent}55` : "1px solid var(--border)",
                backdropFilter:"blur(16px)",position:"relative",
                transform: plan.popular ? "scale(1.04)" : "none",
                boxShadow: plan.popular ? `0 30px 80px ${plan.accent}22` : "none",
                transition:"transform 0.3s"
              }}
                onMouseEnter={e=>!plan.popular && (e.currentTarget.style.transform="translateY(-5px)")}
                onMouseLeave={e=>!plan.popular && (e.currentTarget.style.transform="translateY(0)")}
              >
                {plan.popular && <div style={{position:"absolute",top:-14,left:"50%",transform:"translateX(-50%)",background:"linear-gradient(135deg,#2f80ed,#00e5c9)",padding:"0.3rem 1.2rem",borderRadius:50,fontSize:"0.72rem",fontFamily:"Sora,sans-serif",fontWeight:700,color:"#fff",whiteSpace:"nowrap"}}>Most Popular</div>}
                <div style={{fontFamily:"Sora,sans-serif",fontWeight:800,fontSize:"1rem",color:"#fff",marginBottom:"0.5rem"}}>{plan.name}</div>
                <div style={{display:"flex",alignItems:"flex-end",gap:"0.3rem",marginBottom:"0.75rem"}}>
                  <span style={{fontFamily:"Sora,sans-serif",fontWeight:800,fontSize:"2.4rem",color:plan.accent}}>{plan.price}</span>
                  <span style={{color:"var(--muted)",fontSize:"0.85rem",paddingBottom:"0.4rem"}}>{plan.period}</span>
                </div>
                <p style={{color:"var(--muted)",fontSize:"0.83rem",lineHeight:1.6,marginBottom:"2rem"}}>{plan.desc}</p>
                {plan.features.map(f => (
                  <div key={f} style={{display:"flex",gap:"0.6rem",alignItems:"flex-start",marginBottom:"0.85rem"}}>
                    <span style={{color:plan.accent,marginTop:"0.1rem",fontSize:"0.85rem",flexShrink:0}}>✓</span>
                    <span style={{color:"var(--text)",fontSize:"0.85rem"}}>{f}</span>
                  </div>
                ))}
                <button className={plan.popular ? "btn-primary" : "btn-ghost"} style={{width:"100%",marginTop:"1.5rem",textAlign:"center"}} onClick={() => { setPage("Contact"); window.scrollTo(0,0); }}>
                  {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                </button>
              </div>
            ))}
          </div>
          <p style={{textAlign:"center",color:"var(--muted)",fontSize:"0.8rem",marginTop:"2.5rem"}}>All plans include 14-day free trial. No credit card required.</p>
        </div>
      </section>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CONTACT PAGE
───────────────────────────────────────────── */
function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({name:"",email:"",org:"",msg:""});
  const handle = (k,v) => setForm(f => ({...f,[k]:v}));
  const submit = () => { if (form.name && form.email) setSent(true); };

  return (
    <div style={{paddingTop:80}}>
      <section style={{padding:"5rem 2rem 3rem",textAlign:"center",background:"linear-gradient(135deg,#0b1f45,#132d6e)",position:"relative",overflow:"hidden"}}>
        <MeshBg/>
        <div style={{position:"relative",zIndex:1,animation:"fadeUp 0.8s ease forwards"}}>
          <div className="section-tag">✦ Get in Touch</div>
          <h1 style={{fontSize:"clamp(2rem,4vw,3rem)",fontWeight:800,color:"#fff",marginBottom:"1rem"}}>
            Let's <span className="gradient-text">talk</span>
          </h1>
          <p style={{color:"var(--muted)",maxWidth:440,margin:"0 auto",fontSize:"0.95rem",lineHeight:1.7}}>
            Whether you're exploring RPM for the first time or ready to sign, we'd love to hear from you.
          </p>
        </div>
      </section>

      <section style={{padding:"4rem 2rem 6rem"}}>
        <div style={{maxWidth:1000,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4rem",alignItems:"start"}}>
          <div>
            <h2 style={{fontFamily:"Sora,sans-serif",fontWeight:700,fontSize:"1.3rem",color:"#fff",marginBottom:"2rem"}}>Contact Information</h2>
            {[
              {icon:"📍",label:"Address",val:"12th Floor, Brigade Gateway, Bangalore 560055, India"},
              {icon:"📧",label:"Email",val:"hello@giloys360.com"},
              {icon:"📞",label:"Phone",val:"+91 80 4567 8900"},
              {icon:"🕐",label:"Business Hours",val:"Mon–Fri, 9am–6pm IST"},
            ].map(i => (
              <div key={i.label} style={{display:"flex",gap:"1rem",alignItems:"flex-start",marginBottom:"1.5rem"}}>
                <div style={{width:40,height:40,borderRadius:12,background:"var(--glass2)",border:"1px solid var(--border)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1rem",flexShrink:0}}>{i.icon}</div>
                <div>
                  <div style={{fontFamily:"Sora,sans-serif",fontWeight:600,fontSize:"0.82rem",color:"var(--accent)",marginBottom:"0.2rem"}}>{i.label}</div>
                  <div style={{color:"var(--muted)",fontSize:"0.85rem",lineHeight:1.6}}>{i.val}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="glass-card" style={{borderRadius:24,padding:"2.5rem"}}>
            {sent ? (
              <div style={{textAlign:"center",padding:"2rem"}}>
                <div style={{fontSize:"3rem",marginBottom:"1rem"}}>✅</div>
                <h3 style={{fontFamily:"Sora,sans-serif",fontWeight:700,fontSize:"1.2rem",color:"#fff",marginBottom:"0.75rem"}}>Message sent!</h3>
                <p style={{color:"var(--muted)",fontSize:"0.88rem"}}>Our team will be in touch within one business day.</p>
              </div>
            ) : (
              <>
                <h2 style={{fontFamily:"Sora,sans-serif",fontWeight:700,fontSize:"1.1rem",color:"#fff",marginBottom:"1.75rem"}}>Send us a message</h2>
                {[
                  {k:"name",label:"Full Name",ph:"Dr. Jane Smith",type:"text"},
                  {k:"email",label:"Work Email",ph:"jane@hospital.com",type:"email"},
                  {k:"org",label:"Organisation",ph:"City Hospital",type:"text"},
                ].map(({k,label,ph,type}) => (
                  <div key={k} style={{marginBottom:"1.25rem"}}>
                    <label style={{display:"block",fontSize:"0.8rem",fontFamily:"Sora,sans-serif",fontWeight:600,color:"var(--text)",marginBottom:"0.4rem"}}>{label}</label>
                    <input type={type} placeholder={ph} value={form[k]} onChange={e => handle(k, e.target.value)}
                      style={{width:"100%",padding:"0.75rem 1rem",borderRadius:12,background:"rgba(255,255,255,0.06)",border:"1px solid var(--border)",color:"#fff",fontSize:"0.88rem",outline:"none",fontFamily:"DM Sans,sans-serif"}}
                      onFocus={e=>e.target.style.borderColor="var(--bright)"}
                      onBlur={e=>e.target.style.borderColor="var(--border)"}
                    />
                  </div>
                ))}
                <div style={{marginBottom:"1.75rem"}}>
                  <label style={{display:"block",fontSize:"0.8rem",fontFamily:"Sora,sans-serif",fontWeight:600,color:"var(--text)",marginBottom:"0.4rem"}}>Message</label>
                  <textarea rows={4} placeholder="Tell us about your monitoring needs..." value={form.msg} onChange={e => handle("msg",e.target.value)}
                    style={{width:"100%",padding:"0.75rem 1rem",borderRadius:12,background:"rgba(255,255,255,0.06)",border:"1px solid var(--border)",color:"#fff",fontSize:"0.88rem",resize:"vertical",outline:"none",fontFamily:"DM Sans,sans-serif"}}
                    onFocus={e=>e.target.style.borderColor="var(--bright)"}
                    onBlur={e=>e.target.style.borderColor="var(--border)"}
                  />
                </div>
                <button className="btn-primary" style={{width:"100%",textAlign:"center"}} onClick={submit}>Send Message →</button>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CAREERS PAGE
───────────────────────────────────────────── */
function CareersPage({ setPage }) {
  return (
    <div style={{paddingTop:80}}>
      <section style={{padding:"5rem 2rem 3rem",textAlign:"center",background:"linear-gradient(135deg,#0b1f45,#132d6e)",position:"relative",overflow:"hidden"}}>
        <MeshBg/>
        <div style={{position:"relative",zIndex:1,animation:"fadeUp 0.8s ease forwards"}}>
          <div className="section-tag">✦ We're Hiring</div>
          <h1 style={{fontSize:"clamp(2rem,4vw,3rem)",fontWeight:800,color:"#fff",marginBottom:"1rem"}}>
            Build the future of <span className="gradient-text">healthcare</span>
          </h1>
          <p style={{color:"var(--muted)",maxWidth:480,margin:"0 auto",fontSize:"0.95rem",lineHeight:1.7}}>
            Join a mission-driven team of engineers, clinicians, and designers working to save lives through technology.
          </p>
        </div>
      </section>

      <section style={{padding:"4rem 2rem 6rem"}}>
        <div style={{maxWidth:900,margin:"0 auto"}}>
          <div style={{display:"flex",gap:"1.5rem",flexWrap:"wrap",marginBottom:"2.5rem"}}>
            {["🌍 Remote-first","🏥 Mission-driven","💰 Competitive equity","🎓 Learning budget","🩺 Health coverage"].map(b => (
              <div key={b} className="glass-card" style={{padding:"0.5rem 1.1rem",borderRadius:50,fontSize:"0.82rem",color:"var(--text)"}}>{b}</div>
            ))}
          </div>
          {CAREERS.map(job => (
            <div key={job.title} className="glass-card" style={{borderRadius:18,padding:"1.75rem 2rem",marginBottom:"1rem",cursor:"pointer",transition:"transform 0.2s,box-shadow 0.2s",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"1rem"}}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateX(5px)";e.currentTarget.style.boxShadow="0 8px 30px rgba(47,128,237,0.15)"}}
              onMouseLeave={e=>{e.currentTarget.style.transform="translateX(0)";e.currentTarget.style.boxShadow="none"}}
            >
              <div>
                <h3 style={{fontFamily:"Sora,sans-serif",fontWeight:700,fontSize:"1rem",color:"#fff",marginBottom:"0.35rem"}}>{job.title}</h3>
                <div style={{display:"flex",gap:"1rem",flexWrap:"wrap"}}>
                  <span style={{color:"var(--muted)",fontSize:"0.78rem"}}>🏢 {job.dept}</span>
                  <span style={{color:"var(--muted)",fontSize:"0.78rem"}}>📍 {job.location}</span>
                  <span style={{color:"var(--muted)",fontSize:"0.78rem"}}>⏱ {job.type}</span>
                </div>
              </div>
              <button className="btn-ghost" style={{fontSize:"0.8rem",padding:"0.5rem 1.2rem"}} onClick={() => { setPage("Contact"); window.scrollTo(0,0); }}>Apply Now</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ─────────────────────────────────────────────
   BLOG PAGE
───────────────────────────────────────────── */
function BlogPage() {
  return (
    <div style={{paddingTop:80}}>
      <section style={{padding:"5rem 2rem 3rem",textAlign:"center",background:"linear-gradient(135deg,#0b1f45,#132d6e)",position:"relative",overflow:"hidden"}}>
        <MeshBg/>
        <div style={{position:"relative",zIndex:1,animation:"fadeUp 0.8s ease forwards"}}>
          <div className="section-tag">✦ Insights</div>
          <h1 style={{fontSize:"clamp(2rem,4vw,3rem)",fontWeight:800,color:"#fff",marginBottom:"1rem"}}>
            The <span className="gradient-text">Giloys360 Blog</span>
          </h1>
          <p style={{color:"var(--muted)",maxWidth:440,margin:"0 auto",fontSize:"0.95rem",lineHeight:1.7}}>
            Perspectives on digital health, clinical informatics, and the future of patient monitoring.
          </p>
        </div>
      </section>
      <section style={{padding:"4rem 2rem 6rem"}}>
        <div style={{maxWidth:1100,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:"1.5rem"}}>
          {BLOG_POSTS.map(post => (
            <div key={post.title} className="glass-card" style={{borderRadius:22,overflow:"hidden",cursor:"pointer",transition:"transform 0.3s,box-shadow 0.3s"}}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-6px)";e.currentTarget.style.boxShadow="0 20px 50px rgba(47,128,237,0.2)"}}
              onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none"}}
            >
              <div style={{height:140,background:"linear-gradient(135deg,rgba(47,128,237,0.2),rgba(0,229,201,0.1))",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"3rem"}}>{post.img}</div>
              <div style={{padding:"1.5rem"}}>
                <div style={{display:"flex",gap:"0.75rem",marginBottom:"0.75rem",alignItems:"center"}}>
                  <span style={{fontSize:"0.7rem",color:"var(--accent)",background:"rgba(0,229,201,0.1)",border:"1px solid rgba(0,229,201,0.2)",padding:"0.2rem 0.6rem",borderRadius:50,fontFamily:"Sora,sans-serif",fontWeight:700}}>{post.tag}</span>
                  <span style={{color:"var(--muted)",fontSize:"0.75rem"}}>{post.read}</span>
                </div>
                <h3 style={{fontFamily:"Sora,sans-serif",fontWeight:700,fontSize:"0.95rem",color:"#fff",lineHeight:1.5,marginBottom:"0.75rem"}}>{post.title}</h3>
                <p style={{color:"var(--muted)",fontSize:"0.78rem"}}>{post.date}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PRIVACY / TERMS PAGE
───────────────────────────────────────────── */
function PrivacyPage() {
  const sections = [
    {title:"1. Information We Collect",body:"We collect information you provide directly to us, including name, email, organisation details, and health platform usage data. We also collect technical data such as IP addresses, browser type, and access logs through standard server-side logging."},
    {title:"2. How We Use Your Information",body:"We use collected information to provide, maintain, and improve our services; send transactional and promotional communications (with consent); comply with legal obligations; and perform analytics to understand platform usage."},
    {title:"3. HIPAA Compliance",body:"Giloys360 acts as a Business Associate under HIPAA. We sign Business Associate Agreements (BAA) with all covered entity clients. Protected Health Information (PHI) is encrypted at rest and in transit, and access is strictly controlled through role-based permissions."},
    {title:"4. Data Sharing",body:"We do not sell personal data. We may share data with trusted service providers who operate under strict data processing agreements, and with law enforcement when legally required."},
    {title:"5. Data Retention",body:"We retain personal data for as long as necessary to fulfill the purposes described in this policy, or as required by law. PHI is retained per applicable healthcare regulations."},
    {title:"6. Your Rights",body:"Depending on your jurisdiction, you may have rights to access, correct, delete, or port your personal data. Contact privacy@giloys360.com to exercise these rights."},
    {title:"7. Contact",body:"For privacy-related queries, contact our Data Protection Officer at privacy@giloys360.com or write to Giloys360 Technologies Pvt. Ltd., 12th Floor, Brigade Gateway, Bangalore 560055, India."},
  ];
  return (
    <div style={{paddingTop:80}}>
      <section style={{padding:"5rem 2rem 3rem",textAlign:"center",background:"linear-gradient(135deg,#0b1f45,#132d6e)",position:"relative",overflow:"hidden"}}>
        <MeshBg/>
        <div style={{position:"relative",zIndex:1,animation:"fadeUp 0.8s ease forwards"}}>
          <div className="section-tag">✦ Legal</div>
          <h1 style={{fontSize:"clamp(1.8rem,4vw,2.8rem)",fontWeight:800,color:"#fff",marginBottom:"1rem"}}>
            Privacy Policy & <span className="gradient-text">Terms of Service</span>
          </h1>
          <p style={{color:"var(--muted)",fontSize:"0.85rem"}}>Last updated: 1 April 2025</p>
        </div>
      </section>
      <section style={{padding:"4rem 2rem 6rem"}}>
        <div style={{maxWidth:800,margin:"0 auto"}}>
          {sections.map(s => (
            <div key={s.title} className="glass-card" style={{borderRadius:18,padding:"2rem",marginBottom:"1.25rem"}}>
              <h2 style={{fontFamily:"Sora,sans-serif",fontWeight:700,fontSize:"1rem",color:"var(--accent)",marginBottom:"0.75rem"}}>{s.title}</h2>
              <p style={{color:"var(--muted)",fontSize:"0.88rem",lineHeight:1.85}}>{s.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ─────────────────────────────────────────────
   ROOT APP
───────────────────────────────────────────── */
export default function App() {
  const [page, setPage] = useState("Home");

  const renderPage = () => {
    switch(page) {
      case "Home":          return <HomePage setPage={setPage}/>;
      case "About":         return <AboutPage/>;
      case "Products":      return <ProductsPage setPage={setPage}/>;
      case "ProductDetail": return <ProductDetailPage setPage={setPage}/>;
      case "How It Works":  return <HowItWorksPage setPage={setPage}/>;
      case "Pricing":       return <PricingPage setPage={setPage}/>;
      case "Contact":       return <ContactPage/>;
      case "Careers":       return <CareersPage setPage={setPage}/>;
      case "Blog":          return <BlogPage/>;
      case "Privacy":       return <PrivacyPage/>;
      default:              return <HomePage setPage={setPage}/>;
    }
  };

  return (
    <>
      <GlobalStyle/>
      <Navbar page={page} setPage={setPage}/>
      <main style={{minHeight:"100vh"}}>
        {renderPage()}
      </main>
      <Footer setPage={setPage}/>
    </>
  );
}
