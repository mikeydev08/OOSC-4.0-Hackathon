import React from 'react';
import { Eye, Zap, Compass, Activity, CheckCircle2 } from 'lucide-react';
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

  // 1. Series LCR Circuit Phasor Diagram
  if (combined.includes('lcr') || combined.includes('phasor') || combined.includes('v_l') || combined.includes('v_r') || combined.includes('resonance') || combined.includes('30v')) {
    return (
      <div className="conceptual-diagram-card" style={{ marginTop: '16px', background: 'rgba(0, 0, 0, 0.65)', border: '1px solid rgba(0, 240, 255, 0.25)', borderRadius: '18px', padding: '18px 22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
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

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px 0' }}>
          <svg width="340" height="180" viewBox="0 0 340 180" style={{ overflow: 'visible' }}>
            <defs>
              <marker id="arrow-cyan" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <path d="M0,0 L8,4 L0,8 Z" fill="#00f0ff" />
              </marker>
              <marker id="arrow-purple" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <path d="M0,0 L8,4 L0,8 Z" fill="#8b5cf6" />
              </marker>
              <marker id="arrow-emerald" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <path d="M0,0 L8,4 L0,8 Z" fill="#00ffa3" />
              </marker>
            </defs>

            {/* Axes */}
            <line x1="40" y1="90" x2="300" y2="90" stroke="rgba(255,255,255,0.15)" strokeDasharray="3,3" />
            <line x1="120" y1="20" x2="120" y2="160" stroke="rgba(255,255,255,0.15)" strokeDasharray="3,3" />

            {/* V_R Vector (Horizontal) */}
            <line x1="120" y1="90" x2="220" y2="90" stroke="#00ffa3" strokeWidth="3" markerEnd="url(#arrow-emerald)" />
            <text x="170" y="82" fill="#00ffa3" fontSize="11" fontFamily="var(--font-mono)" fontWeight="700">V_R = 30V</text>

            {/* V_L Vector (Upward +90 deg) */}
            <line x1="120" y1="90" x2="120" y2="30" stroke="#8b5cf6" strokeWidth="2.5" strokeDasharray="4,4" markerEnd="url(#arrow-purple)" />
            <text x="75" y="45" fill="#8b5cf6" fontSize="10" fontFamily="var(--font-mono)">V_L = 80V</text>

            {/* V_C Vector (Downward -90 deg) */}
            <line x1="120" y1="90" x2="120" y2="140" stroke="#ff3366" strokeWidth="2.5" strokeDasharray="4,4" />
            <text x="75" y="135" fill="#ff3366" fontSize="10" fontFamily="var(--font-mono)">V_C = 40V</text>

            {/* (V_L - V_C) Net Reactive Vector */}
            <line x1="220" y1="90" x2="220" y2="40" stroke="#8b5cf6" strokeWidth="2.5" markerEnd="url(#arrow-purple)" />
            <text x="226" y="65" fill="#8b5cf6" fontSize="10" fontFamily="var(--font-mono)">(V_L - V_C) = 40V</text>

            {/* Resultant V Vector */}
            <line x1="120" y1="90" x2="220" y2="40" stroke="#00f0ff" strokeWidth="3.5" markerEnd="url(#arrow-cyan)" />
            <text x="140" y="55" fill="#00f0ff" fontSize="12" fontFamily="var(--font-display)" fontWeight="700">
              V_net = √(30² + 40²) = 50V
            </text>
          </svg>
        </div>
        <div style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '8px' }}>
          <MathText text="💡 **Key Principle:** In AC circuits, voltages at right angles combine as $V = \sqrt{V_R^2 + (V_L - V_C)^2} = 50\text{V}$, NOT simple addition (150V)!" />
        </div>
      </div>
    );
  }

  // 2. Optics: Concave Mirror & Lens Cartesian Sign Convention
  if (combined.includes('mirror') || combined.includes('lens') || combined.includes('concave') || combined.includes('focal') || combined.includes('cartesian') || combined.includes('sign convention') || combined.includes('15cm')) {
    return (
      <div className="conceptual-diagram-card" style={{ marginTop: '16px', background: 'rgba(0, 0, 0, 0.65)', border: '1px solid rgba(0, 240, 255, 0.25)', borderRadius: '18px', padding: '18px 22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
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

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px 0' }}>
          <svg width="340" height="150" viewBox="0 0 340 150">
            {/* Principal Axis */}
            <line x1="20" y1="75" x2="320" y2="75" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.4" />
            
            {/* Mirror Arc (Concave) */}
            <path d="M 230,25 Q 215,75 230,125" fill="none" stroke="#00f0ff" strokeWidth="4" strokeLinecap="round" />
            {/* Mirror Silvering dashes */}
            <line x1="230" y1="35" x2="238" y2="30" stroke="#00f0ff" strokeWidth="1" strokeOpacity="0.5" />
            <line x1="226" y1="55" x2="234" y2="50" stroke="#00f0ff" strokeWidth="1" strokeOpacity="0.5" />
            <line x1="223" y1="75" x2="231" y2="70" stroke="#00f0ff" strokeWidth="1" strokeOpacity="0.5" />
            <line x1="226" y1="95" x2="234" y2="90" stroke="#00f0ff" strokeWidth="1" strokeOpacity="0.5" />
            <line x1="230" y1="115" x2="238" y2="110" stroke="#00f0ff" strokeWidth="1" strokeOpacity="0.5" />

            {/* Pole P */}
            <circle cx="223" cy="75" r="4" fill="#00f0ff" />
            <text x="227" y="92" fill="#00f0ff" fontSize="10" fontFamily="var(--font-mono)" fontWeight="700">P(0,0)</text>

            {/* Focus F */}
            <circle cx="150" cy="75" r="3" fill="#ff3366" />
            <text x="145" y="92" fill="#ff3366" fontSize="10" fontFamily="var(--font-mono)">F (-f)</text>

            {/* Center of Curvature C */}
            <circle cx="80" cy="75" r="3" fill="#8b5cf6" />
            <text x="75" y="92" fill="#8b5cf6" fontSize="10" fontFamily="var(--font-mono)">C (-2f)</text>

            {/* Object Arrow */}
            <line x1="110" y1="75" x2="110" y2="38" stroke="#d4ff00" strokeWidth="2.5" />
            <text x="90" y="32" fill="#d4ff00" fontSize="10" fontFamily="var(--font-mono)" fontWeight="700">Object (u &lt; 0)</text>

            {/* Light Ray (Incident Light ->) */}
            <line x1="40" y1="20" x2="160" y2="20" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1.5" strokeDasharray="3,3" />
            <text x="45" y="14" fill="rgba(255, 255, 255, 0.6)" fontSize="9" fontFamily="var(--font-mono)">Incident Light (+X Axis)</text>

            {/* Negative region label */}
            <rect x="25" y="115" width="180" height="22" rx="4" fill="rgba(255, 51, 102, 0.12)" stroke="rgba(255, 51, 102, 0.3)" />
            <text x="35" y="130" fill="#ff99aa" fontSize="9" fontFamily="var(--font-mono)">
              LEFT OF POLE: ALWAYS NEGATIVE (-)
            </text>
          </svg>
        </div>
        <div style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '8px' }}>
          <MathText text="💡 **Rule:** All distances measured against incident light (left of Pole $P$) are negative: $u = -15\text{ cm}, f = -10\text{ cm}$ in $\frac{1}{f} = \frac{1}{v} + \frac{1}{u}$." />
        </div>
      </div>
    );
  }

  // 3. Chemistry: Galvanic Cell & Nernst Reaction Quotient
  if (combined.includes('nernst') || combined.includes('galvanic') || combined.includes('cell') || combined.includes('redox') || combined.includes('ag+') || combined.includes('zn2+')) {
    return (
      <div className="conceptual-diagram-card" style={{ marginTop: '16px', background: 'rgba(0, 0, 0, 0.65)', border: '1px solid rgba(139, 92, 246, 0.25)', borderRadius: '18px', padding: '18px 22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
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

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', padding: '8px 0' }}>
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

        <div style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '8px' }}>
          <MathText text="💡 **Reaction Quotient:** $Q = \frac{[\text{Zn}^{2+}]}{[\text{Ag}^+]^2} \implies E_{\text{cell}} = E^\circ - \frac{0.0591}{2} \log\left(\frac{[\text{Zn}^{2+}]}{[\text{Ag}^+]^2}\right)$" />
        </div>
      </div>
    );
  }

  // 4. Mathematics: Calculus Substitution & Area Graph
  if (combined.includes('integral') || combined.includes('calculus') || combined.includes('derivative') || combined.includes('substitution') || combined.includes('dx') || combined.includes('rational')) {
    return (
      <div className="conceptual-diagram-card" style={{ marginTop: '16px', background: 'rgba(0, 0, 0, 0.65)', border: '1px solid rgba(0, 255, 163, 0.25)', borderRadius: '18px', padding: '18px 22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
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

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '10px 0', background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}>
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

        <div style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '8px' }}>
          <MathText text="💡 **Standard Form:** $\int \frac{du}{u^2 + (\sqrt{2})^2} = \frac{1}{\sqrt{2}} \tan^{-1}\left(\frac{u}{\sqrt{2}}\right) + C$" />
        </div>
      </div>
    );
  }

  // 5. Biology: Photosynthesis & Molecular Genetics
  if (combined.includes('photosynthesis') || combined.includes('z-scheme') || combined.includes('calvin') || combined.includes('operon') || combined.includes('dna') || combined.includes('chlorophyll')) {
    return (
      <div className="conceptual-diagram-card" style={{ marginTop: '16px', background: 'rgba(0, 0, 0, 0.65)', border: '1px solid rgba(212, 255, 0, 0.25)', borderRadius: '18px', padding: '18px 22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={14} color="#d4ff00" />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#d4ff00', fontWeight: 700 }}>
              BIOLOGICAL PATHWAY ARCHITECTURE (NCERT)
            </span>
          </div>
          <span className="agency-pill" style={{ fontSize: '0.62rem', borderColor: '#d4ff00', color: '#d4ff00' }}>
            ENERGY TRANSDUCTION
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', padding: '8px 0', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '130px', background: 'rgba(212,255,0,0.06)', border: '1px solid rgba(212,255,0,0.2)', borderRadius: '10px', padding: '10px' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#d4ff00' }}>Cyclic Pathway (PS-I)</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: '4px' }}>• Location: Stroma Lamellae<br />• Yield: <strong>ATP Only</strong></div>
          </div>
          <div style={{ flex: 1, minWidth: '130px', background: 'rgba(0,240,255,0.06)', border: '1px solid rgba(0,240,255,0.2)', borderRadius: '10px', padding: '10px' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--neon-cyan)' }}>Non-Cyclic Z-Scheme</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: '4px' }}>• Location: Grana Thylakoids<br />• Yield: <strong>ATP + NADPH + O₂</strong></div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
