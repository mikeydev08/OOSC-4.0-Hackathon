import React, { useState, useEffect } from 'react';
import { Cpu, Search, Brain, Sparkles, Activity } from 'lucide-react';

interface ThinkingEngineProps {
  classGrade?: string;
  subjectName?: string;
}

const THINKING_STAGES = [
  {
    badge: 'NODE 01 // MULTIMODAL PARSER',
    title: 'Parsing handwritten symbols & spatial diagram structure...',
    icon: Cpu,
    color: '#00f0ff'
  },
  {
    badge: 'NODE 02 // PINECONE VECTOR RETRIEVAL',
    title: 'Searching high-dimensional NCERT embedding space...',
    icon: Search,
    color: '#8b5cf6'
  },
  {
    badge: 'NODE 03 // SELF-REFLECTION & GRADER',
    title: 'Validating conceptual grounding & zero-spoiler policy...',
    icon: Brain,
    color: '#d4ff00'
  },
  {
    badge: 'NODE 04 // SOCRATIC PEDAGOGICAL SYNTHESIS',
    title: 'Formulating step-by-step guiding inquiry...',
    icon: Sparkles,
    color: '#ff3366'
  }
];

export const ThinkingEngine: React.FC<ThinkingEngineProps> = ({ classGrade = 'Class 10', subjectName = 'Physics' }) => {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [elapsedMs, setElapsedMs] = useState(0);

  useEffect(() => {
    const stageInterval = setInterval(() => {
      setCurrentStageIndex((prev) => (prev + 1) % THINKING_STAGES.length);
    }, 1100);

    const timerInterval = setInterval(() => {
      setElapsedMs((prev) => prev + 50);
    }, 50);

    return () => {
      clearInterval(stageInterval);
      clearInterval(timerInterval);
    };
  }, []);

  const stage = THINKING_STAGES[currentStageIndex];
  const Icon = stage.icon;

  return (
    <div
      className="glass-card"
      style={{
        padding: '24px 32px',
        borderRadius: '24px',
        background: 'rgba(10, 12, 18, 0.95)',
        border: `1px solid ${stage.color}`,
        boxShadow: `0 10px 40px -10px ${stage.color}40`,
        maxWidth: '920px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.4s ease, box-shadow 0.4s ease'
      }}
    >
      {/* Animated Glowing Laser Scanline */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '60%',
          height: '100%',
          background: `linear-gradient(90deg, transparent, ${stage.color}18, transparent)`,
          animation: 'scanline 2s cubic-bezier(0.4, 0, 0.2, 1) infinite',
          pointerEvents: 'none'
        }}
      />

      {/* Top Telemetry Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '10px',
              background: `${stage.color}1a`,
              border: `1px solid ${stage.color}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: stage.color
            }}
          >
            <Icon size={16} />
          </div>

          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: stage.color,
              letterSpacing: '0.06em'
            }}
          >
            [ {stage.badge} ]
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="agency-pill" style={{ padding: '3px 10px', fontSize: '0.65rem' }}>
            <Activity size={10} color="#00f0ff" />
            <span>{(elapsedMs / 1000).toFixed(1)}s ELAPSED</span>
          </span>

          <span className="agency-pill active" style={{ padding: '3px 10px', fontSize: '0.65rem' }}>
            <span>{classGrade.toUpperCase()} • {subjectName.toUpperCase()}</span>
          </span>
        </div>
      </div>

      {/* Active Stage Title */}
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.08rem', fontWeight: 700, color: 'var(--ice-white)', marginBottom: '16px', lineHeight: 1.4 }}>
        {stage.title}
      </div>

      {/* 4-Node Pipeline Progress Indicators & Equalizer Waveform */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
        {/* Step dots */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {THINKING_STAGES.map((s, idx) => (
            <div
              key={idx}
              style={{
                width: idx === currentStageIndex ? '28px' : '8px',
                height: '8px',
                borderRadius: '100px',
                background: idx === currentStageIndex ? s.color : idx < currentStageIndex ? 'var(--neon-emerald)' : 'rgba(255, 255, 255, 0.1)',
                boxShadow: idx === currentStageIndex ? `0 0 10px ${s.color}` : 'none',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>

        {/* Neural Frequency Waveform Bars */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '18px' }}>
          {[12, 18, 8, 22, 14, 20, 10, 16, 24, 12, 19, 15].map((h, i) => (
            <div
              key={i}
              style={{
                width: '3px',
                height: `${h}px`,
                background: stage.color,
                borderRadius: '2px',
                animation: `pulse-bar 0.8s ease-in-out infinite alternate ${i * 0.08}s`
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scanline {
          0% { left: -60%; }
          100% { left: 140%; }
        }
        @keyframes pulse-bar {
          0% { transform: scaleY(0.3); opacity: 0.4; }
          100% { transform: scaleY(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};
