import React, { useState } from 'react';
import { CheckCircle2, Send, RefreshCw, Sparkles, BookOpen, AlertCircle } from 'lucide-react';
import { MathText } from './MathText';

interface MCQQuestion {
  id?: string;
  class_grade?: string;
  subject?: string;
  chapter_name: string;
  topic: string;
  question: string;
  options: string[];
  correct_option: string;
  conceptual_error: string;
  socratic_explanation: string;
}

const SEED_MCQ_QUESTIONS: MCQQuestion[] = [
  {
    id: "q1",
    class_grade: "Class 10",
    subject: "Physics",
    chapter_name: "Light - Reflection and Refraction",
    topic: "Spherical Mirrors & Sign Convention",
    question: "A concave mirror has a focal length of 15 cm. According to the New Cartesian Sign Convention, what value should be substituted for f in the mirror formula?",
    options: ["+15 cm", "-15 cm", "+30 cm", "-30 cm"],
    correct_option: "-15 cm",
    conceptual_error: "Substituted positive focal length (+15 cm) for a concave mirror instead of negative (-15 cm).",
    socratic_explanation: "What sign does the Cartesian Sign Convention assign to distances measured in front of a concave mirror?"
  },
  {
    id: "q2",
    class_grade: "Class 11",
    subject: "Chemistry",
    chapter_name: "States of Matter & Gas Laws",
    topic: "Ideal Gas Equation Units",
    question: "In the ideal gas equation PV = nRT, if pressure is in atmospheres and volume in litres, what absolute temperature scale must be used?",
    options: ["Celsius (°C)", "Fahrenheit (°F)", "Kelvin (K)", "Rankine (°R)"],
    correct_option: "Kelvin (K)",
    conceptual_error: "Substituted temperature in Celsius instead of converting to absolute Thermodynamic scale in Kelvin.",
    socratic_explanation: "How is the zero point of the Celsius scale related to absolute zero in gas law calculations?"
  },
  {
    id: "q3",
    class_grade: "Class 12",
    subject: "Mathematics",
    chapter_name: "Differential Calculus",
    topic: "Chain Rule Differentiation",
    question: "What is the derivative of f(x) = sin(x^2) with respect to x?",
    options: ["cos(x^2)", "2x * cos(x^2)", "-cos(x^2)", "2x * sin(x)"],
    correct_option: "2x * cos(x^2)",
    conceptual_error: "Forgot to apply the Chain Rule to multiply by the derivative of the inner function (d/dx(x^2) = 2x).",
    socratic_explanation: "When differentiating a composite function g(u(x)), how must the derivative of the inner function u(x) be accounted for?"
  },
  {
    id: "q4",
    class_grade: "Class 12",
    subject: "Physics",
    chapter_name: "Wave Optics",
    topic: "Young's Double Slit Experiment",
    question: "In Young's double-slit experiment, what happens to fringe width (β) if the distance between the two slits (d) is doubled while keeping screen distance (D) constant?",
    options: ["Fringe width is halved", "Fringe width is doubled", "Fringe width is quadrupled", "Remains unchanged"],
    correct_option: "Fringe width is halved",
    conceptual_error: "Assumed fringe width is directly proportional to slit separation d instead of inversely proportional (β = λD / d).",
    socratic_explanation: "How does the fringe width formula (β = λD/d) show the mathematical relationship between β and slit separation d?"
  },
  {
    id: "q5",
    class_grade: "Class 11 / 12",
    subject: "Biology",
    chapter_name: "Cellular Respiration",
    topic: "Glycolysis & ATP Yield",
    question: "Where in a eukaryotic cell does glycolysis occur, and what is its net ATP yield per glucose molecule?",
    options: ["Mitochondrial Matrix, 36 ATP", "Cytoplasm, 2 ATP", "Inner Mitochondrial Membrane, 32 ATP", "Chloroplast Stroma, 4 ATP"],
    correct_option: "Cytoplasm, 2 ATP",
    conceptual_error: "Confused cytoplasmic glycolysis with mitochondrial oxidative phosphorylation.",
    socratic_explanation: "Does glycolysis require oxygen or mitochondria, or does it take place in the cell cytoplasm?"
  }
];

interface MCQQuizModuleProps {
  studentName: string;
  classGrade?: string;
  subjectName: string;
  onSubmissionComplete?: () => void;
  apiBaseUrl?: string;
}

export const MCQQuizModule: React.FC<MCQQuizModuleProps> = ({
  studentName,
  classGrade = "Class 10",
  subjectName,
  onSubmissionComplete,
  apiBaseUrl = 'http://localhost:8000'
}) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<any | null>(null);

  const currentQ = SEED_MCQ_QUESTIONS[currentQIndex % SEED_MCQ_QUESTIONS.length];

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setResult(null);
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setResult(null);
    setCurrentQIndex((prev) => prev + 1);
  };

  const handleGenerateAIMCQ = async () => {
    setGenerating(true);
    setSelectedOption(null);
    setResult(null);

    try {
      const res = await fetch(`${apiBaseUrl}/api/mcq/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chapter_name: currentQ.chapter_name,
          class_grade: classGrade,
          subject_name: subjectName
        })
      });
      const data = await res.json();
      if (data.mcq && data.mcq.question) {
        // Switch to next or replace
        setCurrentQIndex((prev) => prev + 1);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setGenerating(false);
    }
  };

  const handleSubmit = async () => {
    if (!selectedOption) return;
    setSubmitting(true);

    try {
      const res = await fetch(`${apiBaseUrl}/api/mcq/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student_name: studentName,
          subject_name: (subjectName || 'Physics').replace(/Class\s*\d+\s*/gi, '').trim(),
          chapter_name: currentQ.chapter_name,
          topic: currentQ.topic,
          question: currentQ.question,
          selected_option: selectedOption,
          correct_option: currentQ.correct_option,
          conceptual_error: currentQ.conceptual_error,
          explanation: currentQ.socratic_explanation
        })
      });

      const data = await res.json();
      setResult(data);
      if (onSubmissionComplete) onSubmissionComplete();
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  const isCorrect = result?.is_correct;

  return (
    <div className="glass-card" style={{ padding: '32px', borderRadius: '24px', position: 'relative' }}>
      
      {/* Header Info */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '6px' }}>
            <span className="agency-pill active" style={{ fontSize: '0.68rem' }}>
              {currentQ.class_grade || classGrade} • {currentQ.subject || subjectName}
            </span>
            <span className="agency-pill" style={{ color: 'var(--text-muted)' }}>
              {currentQ.chapter_name}
            </span>
          </div>
          <h3 style={{ fontSize: '1.2rem', color: 'var(--ice-white)' }}>
            Topic: {currentQ.topic}
          </h3>
        </div>

        <button
          onClick={handleGenerateAIMCQ}
          disabled={generating}
          className="btn-secondary"
          style={{ padding: '8px 16px', fontSize: '0.78rem' }}
        >
          {generating ? <RefreshCw className="node-pulse" size={14} /> : <Sparkles size={14} color="#00f0ff" />}
          <span>{generating ? 'Synthesizing...' : 'Next AI Question'}</span>
        </button>
      </div>

      {/* Question Text */}
      <div style={{
        background: 'rgba(0,0,0,0.4)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '24px',
        fontSize: '1.05rem',
        color: 'var(--ice-white)',
        lineHeight: 1.6
      }}>
        <MathText text={currentQ.question} />
      </div>

      {/* Options Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px', marginBottom: '28px' }}>
        {currentQ.options.map((opt, idx) => {
          const isSelected = selectedOption === opt;
          return (
            <button
              key={idx}
              onClick={() => handleOptionSelect(opt)}
              style={{
                background: isSelected ? 'rgba(0, 240, 255, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                border: isSelected ? '1px solid var(--neon-cyan)' : '1px solid var(--border-subtle)',
                borderRadius: '14px',
                padding: '16px 20px',
                textAlign: 'left',
                color: isSelected ? 'var(--neon-cyan)' : 'var(--ice-white)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.92rem',
                fontWeight: isSelected ? 700 : 500,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <span style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: isSelected ? 'var(--neon-cyan)' : 'rgba(255,255,255,0.06)',
                color: isSelected ? '#000' : 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                fontWeight: 700,
                fontFamily: 'var(--font-mono)'
              }}>
                {String.fromCharCode(65 + idx)}
              </span>
              <span><MathText text={opt} /></span>
            </button>
          );
        })}
      </div>

      {/* Submit or Result Action */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <button
          onClick={handleSubmit}
          disabled={!selectedOption || submitting}
          className="btn-primary"
          style={{ padding: '14px 32px' }}
        >
          {submitting ? <RefreshCw className="node-pulse" size={16} /> : <Send size={16} />}
          <span>{submitting ? 'Evaluating...' : 'Submit & Analyze'}</span>
        </button>

        <button
          onClick={handleNextQuestion}
          className="btn-secondary"
          style={{ padding: '12px 20px' }}
        >
          <span>Skip / Next Question →</span>
        </button>
      </div>

      {/* Socratic Diagnostics Feedback */}
      {result && (
        <div style={{
          marginTop: '28px',
          background: isCorrect ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255, 51, 102, 0.1)',
          border: isCorrect ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(255, 51, 102, 0.3)',
          borderRadius: '18px',
          padding: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            {isCorrect ? (
              <>
                <CheckCircle2 size={20} color="#10b981" />
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--neon-emerald)', fontSize: '1rem' }}>
                  CORRECT APPLICATION OF CONCEPT!
                </span>
              </>
            ) : (
              <>
                <AlertCircle size={20} color="#ff3366" />
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--neon-coral)', fontSize: '1rem' }}>
                  CONCEPTUAL ERROR LOGGED TO TEACHER RADAR
                </span>
              </>
            )}
          </div>

          <p style={{ fontSize: '0.92rem', color: 'var(--ice-white)', lineHeight: 1.6, marginBottom: '14px' }}>
            <MathText text={result.socratic_response} />
          </p>

          <div className="agency-pill" style={{ color: 'var(--neon-cyan)', borderColor: 'rgba(0, 240, 255, 0.3)' }}>
            <BookOpen size={12} />
            <span>{result.citation}</span>
          </div>
        </div>
      )}

    </div>
  );
};
