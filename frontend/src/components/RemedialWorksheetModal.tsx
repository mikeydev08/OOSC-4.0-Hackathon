import React, { useState } from 'react';
import { X, Printer, Copy, Check, Sparkles, BookOpen, AlertTriangle, ArrowRight } from 'lucide-react';
import { MathText } from './MathText';

export interface RemedialWorksheetData {
  title: string;
  target_ncert_ref: string;
  diagnostic_summary: string;
  part1_foundational_inquiry: {
    heading: string;
    question: string;
    guiding_hint: string;
  };
  part2_counterfactual_problem: {
    heading: string;
    problem: string;
    why_flawed_logic_fails: string;
  };
  part3_mastery_challenge: {
    heading: string;
    problem: string;
    expected_self_derivation: string;
  };
}

interface RemedialWorksheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  worksheet: RemedialWorksheetData | null;
  studentName?: string;
  topic?: string;
}

export const RemedialWorksheetModal: React.FC<RemedialWorksheetModalProps> = ({
  isOpen,
  onClose,
  worksheet,
  studentName = 'Classroom Learners',
  topic = 'STEM Misconception'
}) => {
  const [copied, setCopied] = useState(false);
  const [assigned, setAssigned] = useState(false);

  if (!isOpen || !worksheet) return null;

  const handleCopy = () => {
    const textToCopy = `
=====================================================
${worksheet.title}
Target NCERT: ${worksheet.target_ncert_ref}
Student: ${studentName}
=====================================================
DIAGNOSTIC SUMMARY:
${worksheet.diagnostic_summary}

${worksheet.part1_foundational_inquiry.heading}
Q: ${worksheet.part1_foundational_inquiry.question}
Hint: ${worksheet.part1_foundational_inquiry.guiding_hint}

${worksheet.part2_counterfactual_problem.heading}
Problem: ${worksheet.part2_counterfactual_problem.problem}
Analysis: ${worksheet.part2_counterfactual_problem.why_flawed_logic_fails}

${worksheet.part3_mastery_challenge.heading}
Challenge: ${worksheet.part3_mastery_challenge.problem}
=====================================================
`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleAssign = () => {
    setAssigned(true);
    setTimeout(() => setAssigned(false), 3000);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(5, 7, 10, 0.85)',
        backdropFilter: 'blur(16px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
      }}
    >
      <div
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: '850px',
          maxHeight: '90vh',
          overflowY: 'auto',
          background: 'rgba(12, 14, 22, 0.98)',
          border: '1px solid rgba(0, 240, 255, 0.35)',
          boxShadow: '0 20px 60px -10px rgba(0, 240, 255, 0.25)',
          borderRadius: '28px',
          padding: '36px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          position: 'relative'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: 'none',
            color: 'var(--ice-white)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
            <span className="agency-pill active" style={{ fontSize: '0.68rem' }}>
              <Sparkles size={12} color="#00f0ff" />
              <span>1-CLICK REMEDIAL INTERVENTION</span>
            </span>
            <span className="agency-pill" style={{ color: 'var(--neon-emerald)', borderColor: 'rgba(16, 185, 129, 0.4)', fontSize: '0.68rem' }}>
              <BookOpen size={12} />
              <span>{worksheet.target_ncert_ref?.replace(/\bClass\s+\d+\s+Class\s+\d+\s+Class\s+(\d+)\b/gi, 'Class $1').replace(/\bClass\s+\d+\s+Class\s+(\d+)\b/gi, 'Class $1').replace(/\b(Class\s+\d+)\s+\1\b/gi, '$1')}</span>
            </span>
          </div>

          <h2 style={{ fontSize: '1.6rem', color: 'var(--ice-white)', fontWeight: 800 }}>
            {worksheet.title}
          </h2>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--neon-cyan)', marginTop: '4px' }}>
            GENERATED FOR: {studentName.toUpperCase()} &bull; TOPIC: {topic.toUpperCase()}
          </div>
        </div>

        {/* Diagnostic Misconception Alert */}
        <div style={{
          background: 'rgba(255, 51, 102, 0.1)',
          border: '1px solid rgba(255, 51, 102, 0.35)',
          borderRadius: '16px',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px'
        }}>
          <AlertTriangle size={18} color="#ff3366" style={{ marginTop: '2px', flexShrink: 0 }} />
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--neon-coral)', fontWeight: 700, textTransform: 'uppercase' }}>
              DIAGNOSTIC TARGET
            </div>
            <div style={{ fontSize: '0.9rem', color: '#ffe4ea', marginTop: '2px', lineHeight: 1.5 }}>
              <MathText text={worksheet.diagnostic_summary} />
            </div>
          </div>
        </div>

        {/* ─── 3-PART SOCRATIC WORKSHEET CONTAINER ─── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          
          {/* Part 1: Foundational Inquiry */}
          <div style={{ background: 'rgba(0, 0, 0, 0.45)', border: '1px solid var(--border-subtle)', borderRadius: '18px', padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--neon-cyan)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '8px' }}>
              <span>01 //</span>
              <span>{worksheet.part1_foundational_inquiry.heading}</span>
            </div>
            <div style={{ fontSize: '1.02rem', color: 'var(--ice-white)', fontWeight: 600, lineHeight: 1.5, marginBottom: '12px' }}>
              <MathText text={worksheet.part1_foundational_inquiry.question} />
            </div>
            <div style={{ background: 'rgba(0, 240, 255, 0.06)', borderLeft: '3px solid var(--neon-cyan)', padding: '8px 14px', borderRadius: '4px 8px 8px 4px', fontSize: '0.82rem', color: '#d0f8ff', fontFamily: 'var(--font-tech)' }}>
              💡 <strong>Socratic Hint:</strong> <MathText text={worksheet.part1_foundational_inquiry.guiding_hint} />
            </div>
          </div>

          {/* Part 2: Counterfactual Problem */}
          <div style={{ background: 'rgba(0, 0, 0, 0.45)', border: '1px solid var(--border-subtle)', borderRadius: '18px', padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--neon-purple)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '8px' }}>
              <span>02 //</span>
              <span>{worksheet.part2_counterfactual_problem.heading}</span>
            </div>
            <div style={{ fontSize: '1.02rem', color: 'var(--ice-white)', fontWeight: 600, lineHeight: 1.5, marginBottom: '12px' }}>
              <MathText text={worksheet.part2_counterfactual_problem.problem} />
            </div>
            <div style={{ background: 'rgba(139, 92, 246, 0.08)', borderLeft: '3px solid var(--neon-purple)', padding: '8px 14px', borderRadius: '4px 8px 8px 4px', fontSize: '0.82rem', color: '#e5d9ff', fontFamily: 'var(--font-tech)' }}>
              ⚠️ <strong>Why It Fails:</strong> <MathText text={worksheet.part2_counterfactual_problem.why_flawed_logic_fails} />
            </div>
          </div>

          {/* Part 3: Mastery Challenge */}
          <div style={{ background: 'rgba(0, 0, 0, 0.45)', border: '1px solid var(--border-subtle)', borderRadius: '18px', padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--neon-emerald)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '8px' }}>
              <span>03 //</span>
              <span>{worksheet.part3_mastery_challenge.heading}</span>
            </div>
            <div style={{ fontSize: '1.02rem', color: 'var(--ice-white)', fontWeight: 600, lineHeight: 1.5, marginBottom: '12px' }}>
              <MathText text={worksheet.part3_mastery_challenge.problem} />
            </div>
            <div style={{ background: 'rgba(16, 185, 129, 0.08)', borderLeft: '3px solid var(--neon-emerald)', padding: '8px 14px', borderRadius: '4px 8px 8px 4px', fontSize: '0.82rem', color: '#d1fae5', fontFamily: 'var(--font-tech)' }}>
              🎯 <strong>Expected Mastery Step:</strong> <MathText text={worksheet.part3_mastery_challenge.expected_self_derivation} />
            </div>
          </div>

        </div>

        {/* Action Buttons Toolbar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={handleCopy}
              className="agency-pill"
              style={{ cursor: 'pointer', background: 'rgba(255,255,255,0.06)' }}
            >
              {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
              <span>{copied ? 'COPIED TO CLIPBOARD' : 'COPY WORKSHEET'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="agency-pill"
              style={{ cursor: 'pointer', background: 'rgba(255,255,255,0.06)' }}
            >
              <Printer size={14} />
              <span>PRINT / PDF</span>
            </button>
          </div>

          <button
            onClick={handleAssign}
            className="btn-magnetic btn-magnetic-primary"
            style={{ padding: '10px 24px' }}
          >
            <span>{assigned ? '✓ ASSIGNED TO CLASS!' : 'ASSIGN WORKSHEET'}</span>
            <div className="arrow-circle" style={{ width: '26px', height: '26px' }}>
              <ArrowRight size={14} />
            </div>
          </button>
        </div>

      </div>
    </div>
  );
};
