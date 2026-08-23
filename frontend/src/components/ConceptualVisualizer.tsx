import React from 'react';
import { Eye, Zap, Compass, Activity, Dna, GitBranch, ShieldAlert } from 'lucide-react';
import { MathText } from './MathText';

interface ConceptualVisualizerProps {
  text: string;
  conceptualError?: string | null;
  subject?: string;
  grade?: string;
}

export const ConceptualVisualizer: React.FC<ConceptualVisualizerProps> = ({
  text,
  conceptualError = '',
  subject = 'Physics',
  grade = 'Class 10'
}) => {
  const combined = `${text} ${conceptualError} ${subject} ${grade}`.toLowerCase();

  // 1. Chemistry: Redox & Chromium Oxidation State in K2Cr2O7 (HIGH PRIORITY)
  if (combined.includes('k2cr2o7') || combined.includes('cr2o7') || combined.includes('dichromate') || combined.includes('chromium') || combined.includes('oxidation state') || combined.includes('redox')) {
    return (
      <div className="conceptual-diagram-card" style={{ marginTop: '16px', background: 'rgba(10, 12, 18, 0.85)', border: '1px solid rgba(255, 51, 102, 0.35)', borderRadius: '18px', padding: '18px 22px', display: 'flex', flexDirection: 'column', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldAlert size={14} color="#ff3366" />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#ff3366', fontWeight: 700 }}>
              CHEMISTRY: OXIDATION STATE BALANCE EQUATION
            </span>
          </div>
          <span className="agency-pill" style={{ fontSize: '0.62rem', borderColor: '#ff3366', color: '#ff3366' }}>
            SUM OF CHARGES = 0
          </span>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: '12px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.92rem', color: 'var(--neon-cyan)', fontWeight: 600 }}>
            K₂Cr₂O₇ ➔ 2(+1) + 2(x) + 7(-2) = 0
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#00ffa3', marginTop: '6px', fontWeight: 600 }}>
            +2 + 2x - 14 = 0 ➔ 2x = +12 ➔ x = +6 per individual Cr atom
          </div>
        </div>

        <div style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '10px', marginTop: '10px', width: '100%' }}>
          <MathText text="💡 **Principle:** Total $+12$ oxidation number is distributed equally across the 2 Chromium atoms, giving $+6$ per Cr." />
        </div>
      </div>
    );
  }

  // 2. Chemistry: Galvanic Cell & Nernst Reaction Quotient
  if (combined.includes('nernst') || combined.includes('galvanic') || combined.includes('ag+') || combined.includes('zn2+') || combined.includes('e_cell') || combined.includes('e0_cell')) {
    return (
      <div className="conceptual-diagram-card" style={{ marginTop: '16px', background: 'rgba(10, 12, 18, 0.85)', border: '1px solid rgba(139, 92, 246, 0.35)', borderRadius: '18px', padding: '18px 22px', display: 'flex', flexDirection: 'column', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Activity size={14} color="#8b5cf6" />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--neon-purple)', fontWeight: 700 }}>
              ELECTROCHEMISTRY: NERNST STOICHIOMETRIC QUOTIENT
            </span>
          </div>
          <span className="agency-pill" style={{ fontSize: '0.62rem', borderColor: 'var(--neon-purple)', color: 'var(--neon-purple)' }}>
            STOICHIOMETRY = EXPONENT
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', padding: '6px 0', width: '100%' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>ANODE (OXIDATION)</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--neon-cyan)', fontWeight: 600, marginTop: '4px' }}>
              Zn(s) → Zn²⁺ + 2e⁻
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>Coeff = 1 → [Zn²⁺]¹</div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>CATHODE (REDUCTION)</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--neon-purple)', fontWeight: 600, marginTop: '4px' }}>
              2Ag⁺ + 2e⁻ → 2Ag(s)
            </div>
            <div style={{ fontSize: '0.72rem', color: '#00ffa3', marginTop: '4px' }}>Coeff = 2 → [Ag⁺]²</div>
          </div>
        </div>

        <div style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '10px', marginTop: '8px' }}>
          <MathText text="💡 **Reaction Quotient:** $Q = \frac{[\text{Zn}^{2+}]}{[\text{Ag}^+]^2} \implies E_{\text{cell}} = E^\circ - \frac{0.0591}{2} \log\left(\frac{[\text{Zn}^{2+}]}{[\text{Ag}^+]^2}\right)$" />
        </div>
      </div>
    );
  }

  // 3. Biology: DNA Replication, Repair & Base Pairing
  if (combined.includes('dna') || combined.includes('base pair') || combined.includes('adenine') || combined.includes('thymine') || combined.includes('guanine') || combined.includes('cytosine') || combined.includes('chargaff')) {
    return (
      <div className="conceptual-diagram-card" style={{ marginTop: '16px', background: 'rgba(10, 12, 18, 0.85)', border: '1px solid rgba(0, 240, 255, 0.28)', borderRadius: '18px', padding: '18px 22px', display: 'flex', flexDirection: 'column', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Dna size={16} color="#00f0ff" />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--neon-cyan)', fontWeight: 700 }}>
              MOLECULAR BIOLOGY: COMPLEMENTARY BASE-PAIRING MAP
            </span>
          </div>
          <span className="agency-pill" style={{ fontSize: '0.62rem', borderColor: 'var(--neon-emerald)', color: 'var(--neon-emerald)' }}>
            CHARGAFF & ANTIPARALLEL RULES
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', padding: '6px 0' }}>
          <div style={{ background: 'rgba(0, 240, 255, 0.05)', border: '1px solid rgba(0, 240, 255, 0.25)', borderRadius: '12px', padding: '12px' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--neon-cyan)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>PURINE ⇄ PYRIMIDINE PAIRS</div>
            <div style={{ fontSize: '0.88rem', color: 'var(--ice-white)', fontWeight: 600, marginTop: '4px' }}>
              Adenine (A) = Thymine (T)<br />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>[ 2 Hydrogen Bonds ]</span>
            </div>
            <div style={{ fontSize: '0.88rem', color: 'var(--ice-white)', fontWeight: 600, marginTop: '8px' }}>
              Guanine (G) ≡ Cytosine (C)<br />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>[ 3 Hydrogen Bonds ]</span>
            </div>
          </div>

          <div style={{ background: 'rgba(139, 92, 246, 0.05)', border: '1px solid rgba(139, 92, 246, 0.25)', borderRadius: '12px', padding: '12px' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--neon-purple)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>ANTIPARALLEL STRAND ORIENTATION</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: '#00ffa3', marginTop: '6px' }}>
              Template Strand: 5' ➔ 3'<br />
              Opposing Strand: 3' ➔ 5'
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '6px' }}>
              DNA Polymerase synthesizes strictly in the 5' ➔ 3' direction.
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '10px', marginTop: '8px' }}>
          <MathText text="💡 **Rule:** Repair excision replaces damaged bases using complementary hydrogen-bonding ($A=T, G\equiv C$) to maintain 100% fidelity." />
        </div>
      </div>
    );
  }

  // 4. Biology: Lac Operon Induction Switch
  if (combined.includes('lac operon') || combined.includes('operon') || combined.includes('allolactose') || combined.includes('repressor')) {
    return (
      <div className="conceptual-diagram-card" style={{ marginTop: '16px', background: 'rgba(10, 12, 18, 0.85)', border: '1px solid rgba(0, 255, 163, 0.28)', borderRadius: '18px', padding: '18px 22px', display: 'flex', flexDirection: 'column', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <GitBranch size={16} color="#00ffa3" />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--neon-emerald)', fontWeight: 700 }}>
              GENETICS: LAC OPERON INDUCTION SWITCH
            </span>
          </div>
          <span className="agency-pill" style={{ fontSize: '0.62rem', borderColor: 'var(--neon-emerald)', color: 'var(--neon-emerald)' }}>
            INDUCER = ALLOLACTOSE
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', padding: '6px 0' }}>
          <div style={{ background: 'rgba(255, 51, 102, 0.06)', border: '1px solid rgba(255, 51, 102, 0.25)', borderRadius: '12px', padding: '12px' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#ff3366' }}>Lactose Absent (SWITCH OFF)</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '4px' }}>
              • Repressor binds Operator (O)<br />
              • RNA Polymerase blocked<br />
              • <strong>No Transcription</strong>
            </div>
          </div>

          <div style={{ background: 'rgba(0, 255, 163, 0.06)', border: '1px solid rgba(0, 255, 163, 0.25)', borderRadius: '12px', padding: '12px' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#00ffa3' }}>Lactose Present (SWITCH ON)</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '4px' }}>
              • Allolactose binds Repressor<br />
              • Repressor releases Operator<br />
              • <strong>z, y, a Genes Transcribed</strong>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 5. Biology: Photosynthesis & Light Reactions
  if (combined.includes('photosynthesis') || combined.includes('z-scheme') || combined.includes('calvin') || combined.includes('chlorophyll') || combined.includes('thylakoid')) {
    return (
      <div className="conceptual-diagram-card" style={{ marginTop: '16px', background: 'rgba(10, 12, 18, 0.85)', border: '1px solid rgba(212, 255, 0, 0.25)', borderRadius: '18px', padding: '18px 22px', display: 'flex', flexDirection: 'column', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Activity size={14} color="#d4ff00" />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#d4ff00', fontWeight: 700 }}>
              PLANT PHYSIOLOGY: PHOTOSYNTHETIC PATHWAY ARCHITECTURE
            </span>
          </div>
          <span className="agency-pill" style={{ fontSize: '0.62rem', borderColor: '#d4ff00', color: '#d4ff00' }}>
            ENERGY TRANSDUCTION
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', padding: '6px 0' }}>
          <div style={{ background: 'rgba(212,255,0,0.06)', border: '1px solid rgba(212,255,0,0.2)', borderRadius: '10px', padding: '10px' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#d4ff00' }}>Cyclic Pathway (PS-I)</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: '4px' }}>• Location: Stroma Lamellae<br />• Yield: <strong>ATP Only</strong></div>
          </div>
          <div style={{ background: 'rgba(0,240,255,0.06)', border: '1px solid rgba(0,240,255,0.2)', borderRadius: '10px', padding: '10px' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--neon-cyan)' }}>Non-Cyclic Z-Scheme</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: '4px' }}>• Location: Grana Thylakoids<br />• Yield: <strong>ATP + NADPH + O₂</strong></div>
          </div>
        </div>
      </div>
    );
  }

  // 6. Mathematics: Calculus Substitution & Area Graph
  if (combined.includes('integral') || combined.includes('calculus') || combined.includes('derivative') || combined.includes('tan^-1') || combined.includes('arctan') || combined.includes('x^4') || combined.includes('rational')) {
    return (
      <div className="conceptual-diagram-card" style={{ marginTop: '16px', background: 'rgba(10, 12, 18, 0.85)', border: '1px solid rgba(0, 255, 163, 0.25)', borderRadius: '18px', padding: '18px 22px', display: 'flex', flexDirection: 'column', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Eye size={14} color="#00ffa3" />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--neon-emerald)', fontWeight: 700 }}>
              CALCULUS: VARIABLE TRANSFORMATION MAP
            </span>
          </div>
          <span className="agency-pill" style={{ fontSize: '0.62rem', borderColor: 'var(--neon-emerald)', color: 'var(--neon-emerald)' }}>
            CHAIN RULE REVERSAL
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '12px 0', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-dim)' }}>ORIGINAL FORM (x)</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#ff3366', marginTop: '4px' }}>
              ∫ (1 + 1/x²) / ((x - 1/x)² + 2) dx
            </div>
          </div>
          <div style={{ color: 'var(--neon-cyan)', fontSize: '1.2rem' }}>➔</div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-dim)' }}>SUBSTITUTED FORM (u)</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#00ffa3', marginTop: '4px' }}>
              u = x - 1/x  |  du = (1 + 1/x²) dx
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '10px', marginTop: '8px' }}>
          <MathText text="💡 **Standard Form:** $\int \frac{du}{u^2 + (\sqrt{2})^2} = \frac{1}{\sqrt{2}} \tan^{-1}\left(\frac{u}{\sqrt{2}}\right) + C$" />
        </div>
      </div>
    );
  }

  // 7. Physics: Series LCR Circuit Phasor Diagram
  if (combined.includes('lcr') || combined.includes('phasor') || combined.includes('v_l') || combined.includes('v_r') || combined.includes('v_c') || combined.includes('30v') || combined.includes('80v') || combined.includes('40v') || combined.includes('150v')) {
    return (
      <div className="conceptual-diagram-card" style={{ marginTop: '16px', background: 'rgba(10, 12, 18, 0.85)', border: '1px solid rgba(0, 240, 255, 0.25)', borderRadius: '18px', padding: '18px 22px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Zap size={14} color="#00f0ff" />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--neon-cyan)', fontWeight: 700 }}>
              CONCEPTUAL VISUAL: LCR PHASOR VOLTAGE TRIANGLE
            </span>
          </div>
          <span className="agency-pill" style={{ fontSize: '0.62rem', borderColor: 'var(--neon-cyan)', color: 'var(--neon-cyan)' }}>
            PHASOR ADDITION ≠ ALGEBRAIC SUM
          </span>
        </div>

        <div style={{ width: '100%', maxWidth: '440px', display: 'flex', justifyContent: 'center', padding: '6px 0' }}>
          <svg width="100%" height="auto" viewBox="0 0 440 210" style={{ overflow: 'visible', maxWidth: '440px' }}>
            <defs>
              <marker id="arrow-cyan" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#00f0ff" />
              </marker>
              <marker id="arrow-purple" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#8b5cf6" />
              </marker>
              <marker id="arrow-emerald" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#00ffa3" />
              </marker>
            </defs>

            <line x1="30" y1="150" x2="380" y2="150" stroke="rgba(255,255,255,0.12)" strokeDasharray="3,3" />
            <line x1="80" y1="20" x2="80" y2="190" stroke="rgba(255,255,255,0.12)" strokeDasharray="3,3" />

            <rect x="235" y="135" width="15" height="15" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

            <line x1="80" y1="150" x2="250" y2="150" stroke="#00ffa3" strokeWidth="3.5" markerEnd="url(#arrow-emerald)" />
            <text x="135" y="174" fill="#00ffa3" fontSize="12" fontFamily="var(--font-mono)" fontWeight="700">V_R = 30V</text>

            <line x1="250" y1="150" x2="250" y2="55" stroke="#8b5cf6" strokeWidth="3" markerEnd="url(#arrow-purple)" />
            <text x="262" y="105" fill="#8b5cf6" fontSize="11" fontFamily="var(--font-mono)" fontWeight="600">(V_L - V_C) = 40V</text>

            <line x1="80" y1="150" x2="250" y2="55" stroke="#00f0ff" strokeWidth="4" markerEnd="url(#arrow-cyan)" />
            
            <rect x="40" y="24" width="220" height="26" rx="6" fill="rgba(0, 240, 255, 0.15)" stroke="rgba(0, 240, 255, 0.4)" />
            <text x="50" y="42" fill="#00f0ff" fontSize="11" fontFamily="var(--font-display)" fontWeight="700">
              V_net = √(30² + 40²) = 50V
            </text>
          </svg>
        </div>
        <div style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '10px', width: '100%' }}>
          <MathText text="💡 **Key Principle:** In AC circuits, voltages at right angles combine as $V = \sqrt{V_R^2 + (V_L - V_C)^2} = 50\text{V}$, NOT simple algebraic addition (150V)!" />
        </div>
      </div>
    );
  }

  // 8. Physics: Ray Optics (Concave Mirror / Convex Lens) ONLY when mirror or lens is specifically mentioned
  if (combined.includes('mirror') || combined.includes('concave mirror') || combined.includes('convex lens') || (combined.includes('lens') && !combined.includes('silicon'))) {
    return (
      <div className="conceptual-diagram-card" style={{ marginTop: '16px', background: 'rgba(10, 12, 18, 0.85)', border: '1px solid rgba(0, 240, 255, 0.25)', borderRadius: '18px', padding: '18px 22px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Compass size={14} color="#00f0ff" />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--neon-cyan)', fontWeight: 700 }}>
              OPTICS CARTESIAN SIGN CONVENTION (NCERT)
            </span>
          </div>
          <span className="agency-pill" style={{ fontSize: '0.62rem', borderColor: 'var(--neon-emerald)', color: 'var(--neon-emerald)' }}>
            POLE (P) = (0, 0) ORIGIN
          </span>
        </div>

        <div style={{ width: '100%', maxWidth: '440px', display: 'flex', justifyContent: 'center', padding: '6px 0' }}>
          <svg width="100%" height="auto" viewBox="0 0 420 160" style={{ overflow: 'visible', maxWidth: '420px' }}>
            <line x1="20" y1="80" x2="390" y2="80" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.4" />
            <path d="M 310,25 Q 295,80 310,135" fill="none" stroke="#00f0ff" strokeWidth="4" strokeLinecap="round" />
            <circle cx="302" cy="80" r="4" fill="#00f0ff" />
            <text x="308" y="98" fill="#00f0ff" fontSize="10" fontFamily="var(--font-mono)" fontWeight="700">P(0,0)</text>
            <circle cx="210" cy="80" r="3.5" fill="#ff3366" />
            <text x="200" y="98" fill="#ff3366" fontSize="10" fontFamily="var(--font-mono)" fontWeight="700">F (-f)</text>
            <circle cx="120" cy="80" r="3.5" fill="#8b5cf6" />
            <text x="110" y="98" fill="#8b5cf6" fontSize="10" fontFamily="var(--font-mono)" fontWeight="700">C (-2f)</text>
            <line x1="160" y1="80" x2="160" y2="38" stroke="#d4ff00" strokeWidth="2.5" />
            <text x="135" y="30" fill="#d4ff00" fontSize="10" fontFamily="var(--font-mono)" fontWeight="700">Object (u &lt; 0)</text>
            <line x1="40" y1="20" x2="120" y2="20" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1.5" strokeDasharray="3,3" />
            <text x="45" y="14" fill="rgba(255, 255, 255, 0.6)" fontSize="9" fontFamily="var(--font-mono)">Incident Light (+X)</text>
            <rect x="35" y="122" width="230" height="24" rx="5" fill="rgba(255, 51, 102, 0.12)" stroke="rgba(255, 51, 102, 0.3)" />
            <text x="45" y="138" fill="#ff99aa" fontSize="10" fontFamily="var(--font-mono)">
              LEFT OF POLE: ALWAYS NEGATIVE (-)
            </text>
          </svg>
        </div>
        <div style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '10px', width: '100%' }}>
          <MathText text="💡 **Rule:** All distances measured against incident light (left of Pole $P$) are negative: $u = -15\text{ cm}, f = -10\text{ cm}$ in $\frac{1}{f} = \frac{1}{v} + \frac{1}{u}$." />
        </div>
      </div>
    );
  }

  return null;
};
