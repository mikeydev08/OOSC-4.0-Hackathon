import React from 'react';
import { GraduationCap, LayoutDashboard, BookOpen, ArrowLeft, Award } from 'lucide-react';

interface NavbarProps {
  activeTab: 'student' | 'teacher' | 'scholarships';
  setActiveTab: (tab: 'student' | 'teacher' | 'scholarships') => void;
  apiConnected: boolean;
  totalChunks: number;
  onBackToLanding?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  apiConnected,
  totalChunks,
  onBackToLanding
}) => {
  return (
    <header
      className="glass-card"
      style={{
        borderRadius: '0 0 24px 24px',
        padding: '16px 32px',
        marginBottom: '28px',
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: 'none',
        background: 'rgba(10, 11, 16, 0.85)',
        backdropFilter: 'blur(20px)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        
        {/* Brand & Back Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {onBackToLanding && (
            <button
              onClick={onBackToLanding}
              data-cursor-text="BACK"
              className="agency-pill"
              style={{ cursor: 'pointer' }}
            >
              <ArrowLeft size={14} color="#00f0ff" />
              <span>SHOWCASE</span>
            </button>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '1.2rem',
                letterSpacing: '-0.02em',
                color: 'var(--ice-white)'
              }}
            >
              SOCRATIC<span style={{ color: 'var(--neon-cyan)' }}>//</span>STEM
            </div>
            <span className="agency-pill" style={{ padding: '2px 8px', fontSize: '0.68rem', color: 'var(--neon-cyan)', borderColor: 'rgba(0, 240, 255, 0.3)' }}>
              CLASSES 10–12 STEM
            </span>
          </div>
        </div>

        {/* Mode Switcher Tabs (Noomo Brutalist Pill) */}
        <div
          style={{
            display: 'flex',
            background: 'rgba(0, 0, 0, 0.6)',
            padding: '4px',
            borderRadius: '100px',
            border: '1px solid var(--border-subtle)',
            gap: '4px'
          }}
        >
          <button
            onClick={() => setActiveTab('student')}
            data-cursor-text="STUDENT"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              borderRadius: '100px',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              transition: 'all 0.25s ease',
              background: activeTab === 'student' ? 'var(--neon-cyan)' : 'transparent',
              color: activeTab === 'student' ? '#000000' : 'var(--text-muted)'
            }}
          >
            <GraduationCap size={15} />
            Student Workspace
          </button>

          <button
            onClick={() => setActiveTab('teacher')}
            data-cursor-text="TEACHER"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              borderRadius: '100px',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              transition: 'all 0.25s ease',
              background: activeTab === 'teacher' ? 'var(--neon-purple)' : 'transparent',
              color: activeTab === 'teacher' ? '#ffffff' : 'var(--text-muted)'
            }}
          >
            <LayoutDashboard size={15} />
            Teacher Radar
          </button>

          <button
            onClick={() => setActiveTab('scholarships')}
            data-cursor-text="SCHOLARSHIPS"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              borderRadius: '100px',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              transition: 'all 0.25s ease',
              background: activeTab === 'scholarships' ? '#d4ff00' : 'transparent',
              color: activeTab === 'scholarships' ? '#000000' : '#d4ff00'
            }}
          >
            <Award size={15} />
            <span>Scholarships & Aid</span>
          </button>
        </div>

        {/* Telemetry & System Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="agency-pill" style={{ color: 'var(--text-muted)' }}>
            <BookOpen size={12} color="#d4ff00" />
            <span>{totalChunks} Chunks</span>
          </div>

          <div className="agency-pill">
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: apiConnected ? 'var(--neon-emerald)' : 'var(--neon-coral)',
                boxShadow: apiConnected ? '0 0 8px var(--neon-emerald)' : 'none'
              }}
            />
            <span style={{ color: apiConnected ? 'var(--neon-emerald)' : 'var(--neon-coral)' }}>
              {apiConnected ? 'SYS: ONLINE' : 'SYS: CONNECTING'}
            </span>
          </div>
        </div>

      </div>
    </header>
  );
};
