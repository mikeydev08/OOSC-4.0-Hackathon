import React, { useEffect, useRef, useState } from 'react';
import {
  Sparkles,
  Brain,
  Search,
  AlertCircle,
  ArrowUpRight,
  ChevronDown,
  Terminal,
  Activity,
  Cpu,
  BookOpen,
  Zap,
  ShieldCheck,
  Code2
} from 'lucide-react';
import { MathText } from './MathText';

interface LandingPageProps {
  onEnterApp: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [currentTime, setCurrentTime] = useState('');
  const [activeDemoPreset, setActiveDemoPreset] = useState<'physics' | 'chemistry' | 'math' | 'biology'>('physics');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Clock in UTC/IST
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // 3D Canvas Particle Mesh Simulation (Noomo Agency interactive ambient background)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      baseAlpha: number;
    }> = [];

    const colors = ['#00f0ff', '#8b5cf6', '#d4ff00', '#f5f6fa'];
    const count = Math.min(Math.floor((width * height) / 18000), 75);

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        baseAlpha: Math.random() * 0.4 + 0.2,
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 2;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove);

    let animId: number;
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        const dxMouse = mouseX - p1.x;
        const dyMouse = mouseY - p1.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 180) {
          p1.x += (dxMouse / distMouse) * 0.4;
          p1.y += (dyMouse / distMouse) * 0.4;
        }

        ctx.fillStyle = p1.color;
        ctx.globalAlpha = p1.baseAlpha;
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.size, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.strokeStyle = '#dae2f2';
            ctx.globalAlpha = (1 - dist / 120) * 0.12;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  // 3D Tilt Card calculation
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  // Pipeline Blueprint data
  const pipelineSteps = [
    {
      num: '01',
      title: 'Multimodal Vision Parser',
      tech: 'Gemini 2.5 Flash + Spatial OCR',
      desc: 'Ingests handwritten student solutions across Physics, Chemistry, Math & Biology. Extracts equations, diagrams, and logic paths.',
      badge: 'NODE 01: MULTI-SUBJECT PARSER',
      icon: Cpu,
      color: '#00f0ff',
      status: 'GRADES: 10, 11, 12 • LATENCY 42ms'
    },
    {
      num: '02',
      title: 'Pinecone Vector Retrieval',
      tech: 'Pinecone Serverless (Cosine Top-K)',
      desc: 'Retrieves authoritative NCERT curriculum chunks across Physics, Chemistry, Math & Biology with exact chapter and page grounding.',
      badge: 'NODE 02: PINECONE RAG',
      icon: Search,
      color: '#8b5cf6',
      status: 'INDEX: NCERT-ALL-STEM • TOP_K: 3'
    },
    {
      num: '03',
      title: 'Self-Reflection Evaluator',
      tech: 'LangGraph Cyclic Guardrail',
      desc: 'Validates retrieved textbook context against student question. Re-ranks concepts and executes automated query expansion if needed.',
      badge: 'NODE 03: GRADER',
      icon: Brain,
      color: '#d4ff00',
      status: 'CONFIDENCE: 99.4% • RE-RANK'
    },
    {
      num: '04',
      title: 'Socratic Guider',
      tech: 'Socratic Prompt Chain + Gemini Pro',
      desc: 'Never reveals formulas or answers directly. Formulates exactly ONE thought-provoking guiding question matched to student grade level.',
      badge: 'NODE 04: SOCRATIC SYNTHESIS',
      icon: Sparkles,
      color: '#ff3366',
      status: 'DIRECT SPOILER GUARD: ACTIVE'
    }
  ];

  // Demo Scenarios across STEM Subjects
  const demoScenarios = {
    physics: {
      subject: 'Physics (Class 10/12)',
      title: 'Concave Mirror Sign Convention Error',
      studentInput: 'Object at u = -30cm, Concave mirror f = 15cm. 1/v = 1/f - 1/u = 1/15 - 1/(-30) => v = +10cm.',
      errorDetected: 'Substituted positive focal length (+15cm) instead of negative (-15cm) for concave mirror.',
      retrievedContext: 'NCERT Class 10/12 Physics: Light & Optics (Cartesian Sign Convention).',
      socraticPrompt: 'What sign does the Cartesian Sign Convention assign to distances measured in front of a concave mirror? (Ref: NCERT Chapter Light)'
    },
    chemistry: {
      subject: 'Chemistry (Class 11)',
      title: 'Ideal Gas Law & Absolute Temperature',
      studentInput: 'P = 1 atm, V = 22.4 L, T = 27°C. n = PV / (RT) = (1 * 22.4) / (0.0821 * 27) = 10.1 moles.',
      errorDetected: 'Substituted Celsius temperature (27°C) directly instead of converting to Kelvin (300 K).',
      retrievedContext: 'NCERT Class 11 Chemistry: States of Matter & Gas Laws (Page 142).',
      socraticPrompt: 'In thermodynamic gas calculations with universal constant R, what temperature scale must be used to ensure temperature is proportional to kinetic energy? (Ref: NCERT Chemistry Chapter 5)'
    },
    math: {
      subject: 'Mathematics (Class 12)',
      title: 'Calculus Integration by Substitution',
      studentInput: 'Integral of (2x * cos(x^2)) dx = (x^2) * sin(x^2) + C.',
      errorDetected: 'Integrated terms separately as a product instead of recognizing inner derivative for u-substitution.',
      retrievedContext: 'NCERT Class 12 Mathematics: Integral Calculus (Page 298: Substitution Method).',
      socraticPrompt: 'If we substitute u = x^2, what is the derivative du/dx, and how does it simplify the integrand 2x * cos(x^2) dx? (Ref: NCERT Math Chapter 7)'
    },
    biology: {
      subject: 'Biology (Class 11/12)',
      title: 'Photosynthesis Light vs Dark Reaction',
      studentInput: 'During Calvin cycle in stroma, chlorophyll absorbs photons to directly synthesize ATP and NADPH.',
      errorDetected: 'Confused light-harvesting thylakoid reactions with the dark stroma enzymatic fixation.',
      retrievedContext: 'NCERT Class 11 Biology: Photosynthesis in Higher Plants (Page 210).',
      socraticPrompt: 'Which specific sub-cellular compartment contains the chlorophyll pigment complexes where light absorption and ATP photophosphorylation take place? (Ref: NCERT Biology Chapter 13)'
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: 'var(--bg-black)', overflowX: 'hidden' }}>
      {/* Background Interactive Particle Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 1,
          opacity: 0.6
        }}
      />

      {/* Ambient Glow & Noise */}
      <div className="ambient-glow" />
      <div className="noise-overlay" />

      {/* ─── FIXED NOOMO-STYLE AGENCY HEADER ─── */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 100,
          padding: '20px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          background: 'rgba(8, 9, 13, 0.65)',
          borderBottom: '1px solid var(--border-subtle)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div
            onClick={onEnterApp}
            data-cursor-text="LAUNCH"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: '1.2rem',
              letterSpacing: '-0.03em',
              color: 'var(--ice-white)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer'
            }}
          >
            <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'var(--neon-cyan)', boxShadow: '0 0 12px var(--neon-cyan)' }} />
            <span>SOCRATIC<span style={{ color: 'var(--neon-cyan)' }}>//</span>STEM</span>
          </div>

          <div className="agency-pill" style={{ display: 'flex' }}>
            <span className="dot" />
            <span>CLASSES 10–12 • PHYSICS • CHEM • MATH • BIO</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div className="agency-pill" style={{ color: 'var(--text-muted)' }}>
            <Activity size={12} color="#00f0ff" />
            <span>{currentTime || '00:00:00'} IST</span>
          </div>

          <button
            onClick={onEnterApp}
            data-cursor-text="START"
            className="btn-magnetic btn-magnetic-primary"
            style={{ padding: '10px 22px', fontSize: '0.8rem' }}
          >
            <span>LAUNCH APP</span>
            <div className="arrow-circle">
              <ArrowUpRight size={14} />
            </div>
          </button>
        </div>
      </header>

      {/* ─── HERO SECTION ─── */}
      <section
        style={{
          position: 'relative',
          zIndex: 10,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '140px 32px 60px 32px',
          maxWidth: '1380px',
          margin: '0 auto'
        }}
      >
        <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <div className="agency-pill active">
            <span className="dot" />
            <span>[ 01 // MULTI-GRADE STEM CORRECTIVE RAG ]</span>
          </div>
          <div className="agency-pill">
            <ShieldCheck size={12} color="#10b981" />
            <span>CLASSES 10TH TO 12TH</span>
          </div>
          <div className="agency-pill">
            <Zap size={12} color="#d4ff00" />
            <span>PHYSICS • CHEMISTRY • MATH • BIOLOGY</span>
          </div>
        </div>

        {/* Main Kinetic Headline */}
        <h1 className="hero-title" style={{ maxWidth: '1200px', marginBottom: '32px' }}>
          <div>SOCRATIC</div>
          <div><span className="outline-text">INTELLIGENCE</span></div>
          <div style={{ color: 'var(--neon-cyan)', display: 'inline-flex', alignItems: 'center', gap: '16px' }}>
            FOR ALL STEM.
            <span style={{ fontSize: '0.35em', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 500, letterSpacing: '0.04em' }}>
              [CLASSES 10–12]
            </span>
          </div>
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-tech)',
            fontSize: 'clamp(1.1rem, 2vw, 1.45rem)',
            color: 'var(--text-muted)',
            maxWidth: '720px',
            lineHeight: 1.55,
            marginBottom: '48px'
          }}
        >
          A multimodal Socratic AI Tutor engineered on cyclic graph reasoning across Classes 10th, 11th & 12th. It diagnoses handwritten student misconceptions in Physics, Chemistry, Mathematics & Biology and guides students to self-discovery without ever giving away the answers.
        </p>

        {/* Magnetic Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <button
            onClick={onEnterApp}
            data-cursor-text="ENTER"
            className="btn-magnetic btn-magnetic-primary"
            style={{ padding: '18px 38px', fontSize: '1rem' }}
          >
            <span>ENTER TUTOR RUNTIME</span>
            <div className="arrow-circle" style={{ width: '32px', height: '32px' }}>
              <ArrowUpRight size={18} />
            </div>
          </button>

          <a
            href="#blueprint"
            data-cursor-text="SCROLL"
            className="btn-magnetic btn-magnetic-ghost"
            style={{ padding: '18px 32px', fontSize: '0.95rem' }}
          >
            <span>EXPLORE BLUEPRINT</span>
            <ChevronDown size={18} color="#00f0ff" />
          </a>
        </div>

        {/* Hero Telemetry Ribbon */}
        <div
          style={{
            marginTop: '80px',
            paddingTop: '28px',
            borderTop: '1px solid var(--border-subtle)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px'
          }}
        >
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
              CURRICULUM REACH
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--ice-white)', marginTop: '4px' }}>
              Classes 10, 11 & 12
            </div>
          </div>

          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
              SUBJECT DOMAINS
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--neon-cyan)', marginTop: '4px' }}>
              Physics, Chem, Math, Bio
            </div>
          </div>

          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
              AGENT ORCHESTRATION
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--neon-purple)', marginTop: '4px' }}>
              LangGraph Cyclic Flow
            </div>
          </div>

          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
              PEDAGOGICAL POLICY
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--neon-lime)', marginTop: '4px' }}>
              100% Socratic Non-Solver
            </div>
          </div>
        </div>
      </section>

      {/* ─── DUAL INFINITE MARQUEE TICKERS ─── */}
      <div style={{ position: 'relative', zIndex: 10, margin: '40px 0' }}>
        <div className="marquee-container">
          <div className="marquee-content">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="marquee-item">
                <span>PHYSICS</span>
                <span className="sep">✦</span>
                <span>CHEMISTRY</span>
                <span className="sep">✦</span>
                <span>MATHEMATICS</span>
                <span className="sep">✦</span>
                <span>BIOLOGY</span>
                <span className="sep">✦</span>
                <span>CLASSES 10TH TO 12TH</span>
                <span className="sep">✦</span>
                <span>SOCRATIC GUIDANCE</span>
                <span className="sep">✦</span>
              </div>
            ))}
          </div>
        </div>

        <div className="marquee-container" style={{ borderTop: 'none' }}>
          <div className="marquee-content reverse">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="marquee-item" style={{ color: 'var(--neon-cyan)' }}>
                <span>MULTIMODAL HOMEWORK VISION</span>
                <span className="sep">●</span>
                <span>TEACHER MISCONCEPTION RADAR</span>
                <span className="sep">●</span>
                <span>PINECONE VECTOR RAG</span>
                <span className="sep">●</span>
                <span>ZERO DIRECT SPOILERS</span>
                <span className="sep">●</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── SECTION 02: THE SOCRATIC ENGINE BLUEPRINT ─── */}
      <section
        id="blueprint"
        style={{
          position: 'relative',
          zIndex: 10,
          padding: '120px 32px',
          maxWidth: '1380px',
          margin: '0 auto'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '60px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div className="agency-pill active" style={{ marginBottom: '14px' }}>
              <span>[ 02 // ARCHITECTURAL BLUEPRINT ]</span>
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.8rem)' }}>
              CORRECTIVE RAG <span style={{ color: 'var(--neon-purple)' }}>PIPELINE</span>
            </h2>
          </div>
          <p style={{ fontFamily: 'var(--font-tech)', color: 'var(--text-muted)', maxWidth: '420px', fontSize: '0.95rem' }}>
            Unlike naive chatbots that calculate answers and hallucinate, our 4-node cyclic state graph grounds every question in official NCERT textbook context across all STEM subjects.
          </p>
        </div>

        {/* 4 Interactive Pipeline Node Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '20px' }}>
          {pipelineSteps.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = activeStep === idx;
            return (
              <div
                key={step.num}
                onClick={() => setActiveStep(idx)}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                data-cursor-text="INSPECT"
                className="glass-card glass-card-tilt"
                style={{
                  padding: '32px 28px',
                  borderColor: isSelected ? step.color : 'var(--border-subtle)',
                  background: isSelected ? 'rgba(25, 30, 48, 0.95)' : 'var(--bg-card)',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: step.color, fontWeight: 700 }}>
                    {step.num}
                  </span>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '12px',
                      background: `rgba(255, 255, 255, 0.04)`,
                      border: `1px solid ${step.color}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: step.color
                    }}
                  >
                    <Icon size={20} />
                  </div>
                </div>

                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-dim)', marginBottom: '8px', textTransform: 'uppercase' }}>
                  {step.badge}
                </div>

                <h3 style={{ fontSize: '1.35rem', marginBottom: '12px', color: 'var(--ice-white)' }}>
                  {step.title}
                </h3>

                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '20px' }}>
                  {step.desc}
                </p>

                <div
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    background: 'rgba(0,0,0,0.5)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: step.color
                  }}
                >
                  {step.status}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── SECTION 03: NOOMO-STYLE CASE SHOWCASE ROWS (MULTI-SUBJECT STEM) ─── */}
      <section
        style={{
          position: 'relative',
          zIndex: 10,
          padding: '80px 32px 120px 32px',
          maxWidth: '1380px',
          margin: '0 auto'
        }}
      >
        <div style={{ marginBottom: '40px' }}>
          <div className="agency-pill active" style={{ marginBottom: '14px' }}>
            <span>[ 03 // STEM SUBJECT DOMAINS ]</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.8rem)' }}>
            CURRICULUM <span style={{ color: 'var(--neon-lime)' }}>CHAPTERS</span>
          </h2>
        </div>

        <div>
          <div
            className="showcase-row"
            onClick={onEnterApp}
            data-cursor-text="OPEN"
          >
            <span className="index-num">01</span>
            <div className="title-area">
              <div className="title-main">Physics (Classes 10, 11, 12)</div>
              <div className="category-tag">Ray & Wave Optics • Electrodynamics • Thermodynamics • Kinematics & Mechanics • Modern Physics</div>
            </div>
            <div className="arrow-action">
              <ArrowUpRight size={20} />
            </div>
          </div>

          <div
            className="showcase-row"
            onClick={onEnterApp}
            data-cursor-text="OPEN"
          >
            <span className="index-num">02</span>
            <div className="title-area">
              <div className="title-main">Chemistry (Classes 10, 11, 12)</div>
              <div className="category-tag">Organic Mechanisms • Chemical Kinetics • Redox Reactions • Electrochemistry • Periodic Trends</div>
            </div>
            <div className="arrow-action">
              <ArrowUpRight size={20} />
            </div>
          </div>

          <div
            className="showcase-row"
            onClick={onEnterApp}
            data-cursor-text="OPEN"
          >
            <span className="index-num">03</span>
            <div className="title-area">
              <div className="title-main">Mathematics (Classes 10, 11, 12)</div>
              <div className="category-tag">Differential & Integral Calculus • Linear Algebra • Trigonometry • Coordinate Geometry • Probability</div>
            </div>
            <div className="arrow-action">
              <ArrowUpRight size={20} />
            </div>
          </div>

          <div
            className="showcase-row"
            onClick={onEnterApp}
            data-cursor-text="OPEN"
          >
            <span className="index-num">04</span>
            <div className="title-area">
              <div className="title-main">Biology & Life Sciences (Classes 10, 11, 12)</div>
              <div className="category-tag">Molecular Genetics • Photosynthesis & Cellular Respiration • Human Physiology • Biotechnology</div>
            </div>
            <div className="arrow-action">
              <ArrowUpRight size={20} />
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 04: LIVE INTERACTIVE SOCRATIC PLAYGROUND SIMULATOR ─── */}
      <section
        style={{
          position: 'relative',
          zIndex: 10,
          padding: '60px 32px 120px 32px',
          maxWidth: '1380px',
          margin: '0 auto'
        }}
      >
        <div className="glass-card" style={{ padding: '48px 36px', borderRadius: '28px', border: '1px solid var(--border-active)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div className="agency-pill" style={{ marginBottom: '10px' }}>
                <Terminal size={12} color="#00f0ff" />
                <span>LIVE SIMULATION PLAYGROUND</span>
              </div>
              <h3 style={{ fontSize: '1.8rem', color: 'var(--ice-white)' }}>
                Experience Multi-Subject Socratic Guidance
              </h3>
            </div>

            {/* Scenario Switcher */}
            <div style={{ display: 'flex', gap: '8px', background: 'rgba(0,0,0,0.5)', padding: '6px', borderRadius: '100px', border: '1px solid var(--border-subtle)', flexWrap: 'wrap' }}>
              <button
                onClick={() => setActiveDemoPreset('physics')}
                style={{
                  padding: '8px 16px',
                  borderRadius: '100px',
                  border: 'none',
                  background: activeDemoPreset === 'physics' ? 'var(--neon-cyan)' : 'transparent',
                  color: activeDemoPreset === 'physics' ? '#000' : 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                ⚛️ PHYSICS
              </button>

              <button
                onClick={() => setActiveDemoPreset('chemistry')}
                style={{
                  padding: '8px 16px',
                  borderRadius: '100px',
                  border: 'none',
                  background: activeDemoPreset === 'chemistry' ? 'var(--neon-purple)' : 'transparent',
                  color: activeDemoPreset === 'chemistry' ? '#fff' : 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                🧪 CHEMISTRY
              </button>

              <button
                onClick={() => setActiveDemoPreset('math')}
                style={{
                  padding: '8px 16px',
                  borderRadius: '100px',
                  border: 'none',
                  background: activeDemoPreset === 'math' ? 'var(--neon-lime)' : 'transparent',
                  color: activeDemoPreset === 'math' ? '#000' : 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                📐 MATHEMATICS
              </button>

              <button
                onClick={() => setActiveDemoPreset('biology')}
                style={{
                  padding: '8px 16px',
                  borderRadius: '100px',
                  border: 'none',
                  background: activeDemoPreset === 'biology' ? 'var(--neon-coral)' : 'transparent',
                  color: activeDemoPreset === 'biology' ? '#fff' : 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                🧬 BIOLOGY
              </button>
            </div>
          </div>

          {/* Interactive Inspection Layout */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {/* Student Submission Card */}
            <div style={{ background: 'rgba(0,0,0,0.4)', borderRadius: '18px', padding: '24px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                  [ INCOMING STUDENT SUBMISSION ]
                </span>
                <span className="agency-pill" style={{ fontSize: '0.65rem' }}>
                  {demoScenarios[activeDemoPreset].subject}
                </span>
              </div>
              <div style={{ fontSize: '0.95rem', color: 'var(--ice-white)', lineHeight: 1.6, marginBottom: '16px' }}>
                "<MathText text={demoScenarios[activeDemoPreset].studentInput} />"
              </div>

              <div style={{ background: 'rgba(255, 51, 102, 0.12)', border: '1px solid rgba(255, 51, 102, 0.3)', borderRadius: '12px', padding: '12px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--neon-coral)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700 }}>
                  <AlertCircle size={14} />
                  <span>MISCONCEPTION CLASSIFIED</span>
                </div>
                <div style={{ fontSize: '0.85rem', color: '#ffd6e0', marginTop: '6px' }}>
                  <MathText text={demoScenarios[activeDemoPreset].errorDetected} />
                </div>
              </div>
            </div>

            {/* AI Socratic Output Card */}
            <div style={{ background: 'rgba(0, 240, 255, 0.04)', borderRadius: '18px', padding: '24px', border: '1px solid rgba(0, 240, 255, 0.25)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--neon-cyan)' }}>
                  [ SOCRATIC REASONING OUTPUT ]
                </div>
                <div className="agency-pill" style={{ padding: '2px 8px', fontSize: '0.65rem' }}>
                  <span>NON-SOLVER</span>
                </div>
              </div>

              <div style={{ fontSize: '1.05rem', color: 'var(--ice-white)', lineHeight: 1.5, fontWeight: 600, marginBottom: '16px' }}>
                "<MathText text={demoScenarios[activeDemoPreset].socraticPrompt} />"
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--neon-emerald)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                <BookOpen size={14} />
                <span>{demoScenarios[activeDemoPreset].retrievedContext}</span>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '32px', textAlign: 'center' }}>
            <button
              onClick={onEnterApp}
              data-cursor-text="LAUNCH"
              className="btn-magnetic btn-magnetic-primary"
              style={{ padding: '16px 36px' }}
            >
              <span>TRY WITH YOUR OWN ASSIGNMENT PHOTO / PDF</span>
              <div className="arrow-circle">
                <ArrowUpRight size={16} />
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* ─── SECTION 05: AGENCY METRICS BENTO GRID ─── */}
      <section
        style={{
          position: 'relative',
          zIndex: 10,
          padding: '0 32px 140px 32px',
          maxWidth: '1380px',
          margin: '0 auto'
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          <div
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            className="glass-card glass-card-tilt"
            style={{ padding: '36px 32px' }}
          >
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '3.6rem', fontWeight: 800, color: 'var(--neon-cyan)', lineHeight: 1 }}>
              100%
            </div>
            <div style={{ fontFamily: 'var(--font-tech)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--ice-white)', marginTop: '12px' }}>
              Multi-Subject Grounding
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '8px' }}>
              Every Socratic inquiry is grounded strictly with real page and chapter citations across Classes 9 to 12.
            </p>
          </div>

          <div
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            className="glass-card glass-card-tilt"
            style={{ padding: '36px 32px' }}
          >
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '3.6rem', fontWeight: 800, color: 'var(--neon-lime)', lineHeight: 1 }}>
              &lt;250ms
            </div>
            <div style={{ fontFamily: 'var(--font-tech)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--ice-white)', marginTop: '12px' }}>
              Sub-second Retrieval
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '8px' }}>
              Pinecone Serverless vector database indexed for instant high-dimensional similarity matching across all STEM topics.
            </p>
          </div>

          <div
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            className="glass-card glass-card-tilt"
            style={{ padding: '36px 32px' }}
          >
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '3.6rem', fontWeight: 800, color: 'var(--neon-purple)', lineHeight: 1 }}>
              0%
            </div>
            <div style={{ fontFamily: 'var(--font-tech)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--ice-white)', marginTop: '12px' }}>
              Direct Answer Spoiling
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '8px' }}>
              Enforces pedagogical discipline. Students construct conceptual knowledge through structured hints in Physics, Chem, Math, and Bio.
            </p>
          </div>
        </div>
      </section>

      {/* ─── GRAND AGENCY FOOTER ─── */}
      <footer
        style={{
          position: 'relative',
          zIndex: 10,
          background: 'rgba(5, 6, 9, 0.95)',
          borderTop: '1px solid var(--border-subtle)',
          padding: '80px 32px 40px 32px'
        }}
      >
        <div style={{ maxWidth: '1380px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '32px', marginBottom: '80px' }}>
            <div>
              <h2 style={{ fontSize: 'clamp(2.4rem, 6vw, 4.8rem)', lineHeight: 0.95, marginBottom: '20px' }}>
                READY TO EXPERIENCE<br />
                <span style={{ color: 'var(--neon-cyan)' }}>THE FUTURE OF STEM TUTORING?</span>
              </h2>
              <button
                onClick={onEnterApp}
                data-cursor-text="LAUNCH"
                className="btn-magnetic btn-magnetic-primary"
                style={{ padding: '16px 36px' }}
              >
                <span>ENTER APPLICATION NOW</span>
                <div className="arrow-circle">
                  <ArrowUpRight size={16} />
                </div>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="agency-pill">
                <span className="dot" />
                <span>BUILD: MULTI-GRADE STEM 2026</span>
              </div>
              <div className="agency-pill">
                <Code2 size={12} color="#8b5cf6" />
                <span>LANGGRAPH • FASTAPI • PINECONE</span>
              </div>
            </div>
          </div>

          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 14vw, 12rem)',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '-0.04em',
              lineHeight: 0.8,
              color: 'rgba(255, 255, 255, 0.03)',
              userSelect: 'none',
              textAlign: 'center',
              margin: '40px 0'
            }}
          >
            SOCRATIC//STEM
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '24px', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
              &copy; 2026 Socratic STEM AI Tutor. Classes 10th, 11th & 12th (Physics, Chemistry, Mathematics, Biology).
            </div>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              data-cursor-text="TOP"
              className="agency-pill"
              style={{ cursor: 'pointer', border: 'none', background: 'transparent' }}
            >
              <span>BACK TO TOP ↑</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
