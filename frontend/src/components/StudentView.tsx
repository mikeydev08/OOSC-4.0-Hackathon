import React, { useState, useRef, useEffect } from 'react';
import { Upload, RefreshCw, AlertCircle, Volume2, FileText, User, BookMarked, GraduationCap, ArrowUpRight, Eye, EyeOff, Sparkles, Pause, Play, Square } from 'lucide-react';
import { MCQQuizModule } from './MCQQuizModule';
import { MathText } from './MathText';
import { ThinkingEngine } from './ThinkingEngine';
import { SpatialErrorPointer } from './SpatialErrorPointer';
import { ConceptualVisualizer } from './ConceptualVisualizer';
import { DEFAULT_PRESETS } from '../constants/presets';

interface Message {
  id: string;
  sender: 'student' | 'tutor';
  text: string;
  image?: string | null;
  file_name?: string | null;
  file_url?: string | null;
  conceptual_error?: string | null;
  bounding_box?: number[] | null;
  bounding_box_label?: string | null;
  citation?: string | null;
  timestamp: string;
}

interface StudentViewProps {
  presets: Record<string, any>;
  onSolveComplete?: () => void;
  apiBaseUrl?: string;
}

export const StudentView: React.FC<StudentViewProps> = ({ presets = DEFAULT_PRESETS, onSolveComplete, apiBaseUrl = 'http://localhost:8000' }) => {
  const [studentName, setStudentName] = useState('Aarav Sharma');
  const [classGrade, setClassGrade] = useState('Class 10');
  const [subjectName, setSubjectName] = useState('Physics');
  const [showPresets, setShowPresets] = useState(true);
  const [presetSubjectFilter, setPresetSubjectFilter] = useState<'All' | 'Physics' | 'Chemistry' | 'Mathematics' | 'Biology'>('All');
  const [assignmentMode, setAssignmentMode] = useState<'upload' | 'mcq'>('upload');

  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [userText, setUserText] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedPreview, setUploadedPreview] = useState<string | null>(null);
  const [isAutoDetected, setIsAutoDetected] = useState(false);
  const [autoDetectLabel, setAutoDetectLabel] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const thinkingEngineRef = useRef<HTMLDivElement>(null);
  const latestResponseRef = useRef<HTMLDivElement>(null);

  const [audioState, setAudioState] = useState<{
    isPlaying: boolean;
    isPaused: boolean;
    currentMessageId: string | null;
  }>({
    isPlaying: false,
    isPaused: false,
    currentMessageId: null
  });

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init_1',
      sender: 'tutor',
      text: 'Welcome to your Socratic STEM AI Workspace. Type any problem or upload a handwritten assignment—Subject & Grade will auto-detect automatically!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  // Reactive Smooth Scroll: Auto-scroll when analyzing
  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        thinkingEngineRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  // Reactive Smooth Scroll: Auto-scroll directly to the newly generated AI answer
  useEffect(() => {
    if (messages.length > 1) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg.sender === 'tutor') {
        const timer = setTimeout(() => {
          latestResponseRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 120);
        return () => clearTimeout(timer);
      }
    }
  }, [messages]);

  // Real-time automatic Subject & Grade Classifier
  const autoDetectSubjectAndGrade = (text: string) => {
    const t = (text || '').toLowerCase();
    if (!t.trim() || t.length < 3) return null;

    // 1. Biology detection (High Priority Biological & Physiology Markers)
    const bioWords = [
      'calvin cycle', 'stroma', 'chlorophyll', 'thylakoid', 'photosynthesis', 'grana', 'rubisco',
      'atp and nadph', 'light reaction', 'dark reaction', 'chemiosmosis', 'photophosphorylation',
      'dna', 'rna', 'transcription', 'translation', 'replication', 'genetics', 'mendel', 'allele',
      'punnett', 'chromosome', 'pedigree', 'meiosis', 'mitosis', 'neuron', 'synapse', 'axon',
      'action potential', 'nephron', 'glomerulus', 'cardiac cycle', 'ecg', 'heart', 'kidney',
      'hormone', 'pituitary', 'pancreas', 'insulin', 'ecology', 'trophic', 'biomass', 'food chain',
      'evolution', 'hardy weinberg', 'reproduction', 'embryo', 'gamete', 'pollination', 'lac operon',
      'cell division', 'ribosome', 'mitochondria', 'endoplasmic', 'golgi', 'life processes', 'glucose fixation',
      'glucose synthesis', 'stroma lamellae', 'ps-i', 'ps-ii', 'z-scheme'
    ];
    if (bioWords.some(w => t.includes(w))) {
      if (['calvin cycle', 'photosynthesis', 'thylakoid', 'stroma', 'rubisco', 'photophosphorylation', 'plant physiology', 'cell cycle', 'mitosis', 'chlorophyll', 'glucose fixation', 'glucose synthesis', 'stroma lamellae'].some(w => t.includes(w))) {
        return { subject: 'Biology', grade: 'Class 11' };
      } else if (['lac operon', 'genetics', 'dna replication', 'transcription', 'hardy weinberg', 'biotechnology', 'ecology', 'human reproduction'].some(w => t.includes(w))) {
        return { subject: 'Biology', grade: 'Class 12' };
      }
      return { subject: 'Biology', grade: 'Class 10' };
    }

    // 2. Chemistry Specific Markers (Nernst, Galvanic, Electrochemistry, Redox, Organic)
    const chemWords = [
      'nernst', 'e_cell', 'e0_cell', 'galvanic', 'electrolysis', 'k2cr2o7', 'naoh', 'hcl', 'benzene',
      'oxidation', 'redox', 'mole', 'avogadro', 'pv=nrt', 'gas law', 'organic', 'hydrocarbon',
      'coordination compound', 'isomerism', 'haloalkane', 'aldehyde', 'ketone', 'molarity', 'normality',
      'titration', 'chemical reaction', 'acid', 'base', 'valency', 'equilibrium constant', 'catalyst'
    ];
    if (chemWords.some(w => t.includes(w))) {
      if (['acid', 'base', 'metal', 'non-metal', 'carbon compound', 'chemical equation'].some(w => t.includes(w))) {
        return { subject: 'Chemistry', grade: 'Class 10' };
      } else if (['nernst', 'e_cell', 'e0_cell', 'k2cr2o7', 'coordination', 'electrochemistry', 'kinetics', 'haloalkane', 'aldehyde', 'galvanic'].some(w => t.includes(w))) {
        return { subject: 'Chemistry', grade: 'Class 12' };
      }
      return { subject: 'Chemistry', grade: 'Class 11' };
    }

    // 3. Physics detection (Optics, AC Circuits, Electrodynamics, Mechanics)
    const physWords = [
      'lens', 'mirror', 'focal', 'refract', 'reflect', 'optics', 'convex', 'concave', 'resistor',
      'ohm', 'current', 'voltage', 'circuit', 'magnetic', 'fleming', 'force', 'gravity', 'gravitation',
      'velocity', 'acceleration', 'kinematics', 'newton', 'thermodynamics', 'electrostat', 'wave',
      'fringe width', 'young double slit', 'ydse', 'lcr', 'lcr circuit', 'resonance', 'phasor', 'capacitance',
      'inductor', 'lorentz force', 'prism', 'snell', 'ac circuit', 'alternating current', 'v_r', 'v_l', 'v_c', 'mica sheet'
    ];
    if (physWords.some(w => t.includes(w))) {
      if (['electrostat', 'wave optics', 'semiconductor', 'lcr', 'resonance', 'phasor', 'fringe width', 'magnetic field', 'lorentz', 'alternating current', 'v_r', 'v_l', 'v_c', 'mica sheet', 'ydse'].some(w => t.includes(w))) {
        return { subject: 'Physics', grade: 'Class 12' };
      } else if (['lens', 'mirror', 'focal', 'reflection', 'refraction', 'resistor', 'ohm', 'circuit', 'prism'].some(w => t.includes(w))) {
        return { subject: 'Physics', grade: 'Class 10' };
      }
      return { subject: 'Physics', grade: 'Class 11' };
    }

    // 4. Mathematics detection (High Priority Calculus & Algebra)
    const mathWords = [
      'integral', 'derivative', 'differentiat', 'calculus', 'matrix', 'matrices', 'determinant', 
      'quadratic', 'polynomial', 'algebra', 'trigonometr', 'sin(', 'cos(', 'tan(', 'arctan', 'dx', 'limit',
      'probability', 'vector', 'pythagor', 'geometry', 'roots', 'theorem', 'log(', 'power series',
      'taylor series', 'fourier series', 'ap gp', 'geometric progression', '∫',
      'evaluate ∫', 'evaluate int', 'dy/dx', 'cot(', 'sec(', 'cosec(', 'partial fraction', 'differential equation'
    ];
    if (mathWords.some(w => t.includes(w))) {
      if (['integral', 'derivative', 'calculus', 'matrix', 'determinant', 'vector', 'dx', '∫', 'dy/dx', 'partial fraction', 'differential equation', 'arctan'].some(w => t.includes(w))) {
        return { subject: 'Mathematics', grade: 'Class 12' };
      } else if (['trigonometr', 'sin(', 'cos(', 'polynomial', 'quadratic', 'pythagor'].some(w => t.includes(w))) {
        return { subject: 'Mathematics', grade: 'Class 10' };
      }
      return { subject: 'Mathematics', grade: 'Class 11' };
    }

    return null;
  };

  const handleUserTextChange = (text: string) => {
    setUserText(text);
    const auto = autoDetectSubjectAndGrade(text);
    if (auto) {
      setSubjectName(auto.subject);
      setClassGrade(auto.grade);
      setIsAutoDetected(true);
      setAutoDetectLabel(`${auto.grade} • ${auto.subject}`);
    }
  };

  // Card 3D tilt interaction
  const handleCardTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
  };

  const handleCardTiltReset = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFile(file);
    const auto = autoDetectSubjectAndGrade(file.name);
    if (auto) {
      setSubjectName(auto.subject);
      setClassGrade(auto.grade);
      setIsAutoDetected(true);
      setAutoDetectLabel(`${auto.grade} • ${auto.subject}`);
    }
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setUploadedPreview(null);
    }
  };

  const handleSelectPreset = (presetKey: string) => {
    const preset = activePresets[presetKey];
    if (!preset) return;
    setSelectedPreset(presetKey);
    setUserText(preset.description || (preset as any).handwritten_text || '');
    if (preset.class_grade) setClassGrade(preset.class_grade.includes('11') ? 'Class 11' : preset.class_grade.includes('12') ? 'Class 12' : 'Class 10');
    if (preset.subject) setSubjectName(preset.subject);
    setIsAutoDetected(true);
    setAutoDetectLabel(`${preset.class_grade || 'Class 10'} • ${preset.subject || 'Physics'}`);
    setUploadedFile(null);
    setUploadedPreview(null);
  };

  const handleSubmit = async () => {
    if (!userText.trim() && !uploadedFile && !selectedPreset) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsgText = userText.trim() || (selectedPreset ? activePresets[selectedPreset]?.description : 'Uploaded Assignment');

    const newStudentMsg: Message = {
      id: `msg_${Date.now()}`,
      sender: 'student',
      text: userMsgText,
      image: uploadedPreview,
      file_name: uploadedFile?.name,
      timestamp
    };

    setMessages((prev) => [...prev, newStudentMsg]);
    setIsLoading(true);
    setUserText('');

    try {
      const formData = new FormData();
      formData.append('student_name', studentName || 'Student');
      formData.append('class_grade', classGrade || 'Class 10');
      formData.append('subject_name', `${classGrade} ${subjectName}`);
      formData.append('submission_source', 'Uploaded Assignment (PDF/Image)');

      if (userMsgText) formData.append('user_message', userMsgText);
      if (selectedPreset) formData.append('preset_id', selectedPreset);
      if (uploadedFile) formData.append('file', uploadedFile);

      const res = await fetch(`${apiBaseUrl}/api/tutor/solve`, {
        method: 'POST',
        body: formData
      });

      const data = await res.json();

      // Synchronize auto-detected subject & grade from backend
      if (data.detected_subject) {
        setSubjectName(data.detected_subject);
        if (data.detected_grade) setClassGrade(data.detected_grade);
        setIsAutoDetected(true);
        setAutoDetectLabel(`${data.detected_grade || classGrade} • ${data.detected_subject}`);
      }

      const newTutorMsg: Message = {
        id: `tutor_${Date.now()}`,
        sender: 'tutor',
        text: data.socratic_response || 'What foundational concept governs this problem?',
        conceptual_error: data.conceptual_error,
        bounding_box: data.bounding_box,
        bounding_box_label: data.bounding_box_label,
        citation: data.citation,
        file_name: data.file_name,
        file_url: data.file_url,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, newTutorMsg]);
      setSelectedPreset(null);
      setUploadedFile(null);
      setUploadedPreview(null);

      // Smooth scroll down to the newly rendered Socratic answer
      setTimeout(() => {
        latestResponseRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 150);

      if (onSolveComplete) onSolveComplete();
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const cleanTextForSpeech = (raw: string) => {
    let s = raw || '';
    // Remove reference citation for natural speech
    s = s.replace(/\(Ref:[^)]+\)/gi, '');
    // Simplify common mathematical expressions for clear audio viva
    s = s.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '$1 over $2');
    s = s.replace(/\\sqrt\{([^}]+)\}/g, 'square root of $1');
    s = s.replace(/\\tan\^\{-1\}/g, 'inverse tangent ');
    s = s.replace(/\\sin/g, 'sine');
    s = s.replace(/\\cos/g, 'cosine');
    s = s.replace(/\\tan/g, 'tangent');
    s = s.replace(/\\int/g, 'integral of');
    s = s.replace(/\\text\{([^}]+)\}/g, '$1');
    s = s.replace(/[\$\\\{\}\^_\`]/g, ' ');
    s = s.replace(/\s+/g, ' ').trim();
    return s;
  };

  const handlePlayAudio = (msgId: string, text: string) => {
    if (!('speechSynthesis' in window)) return;

    if (audioState.currentMessageId === msgId && audioState.isPlaying) {
      if (audioState.isPaused) {
        window.speechSynthesis.resume();
        setAudioState({ isPlaying: true, isPaused: false, currentMessageId: msgId });
      } else {
        window.speechSynthesis.pause();
        setAudioState({ isPlaying: true, isPaused: true, currentMessageId: msgId });
      }
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = cleanTextForSpeech(text);
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.92;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      setAudioState({ isPlaying: true, isPaused: false, currentMessageId: msgId });
    };

    utterance.onend = () => {
      setAudioState({ isPlaying: false, isPaused: false, currentMessageId: null });
    };

    utterance.onerror = () => {
      setAudioState({ isPlaying: false, isPaused: false, currentMessageId: null });
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleStopAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setAudioState({ isPlaying: false, isPaused: false, currentMessageId: null });
  };

  // Filter presets by subject (Instant 0ms Fallback)
  const activePresets = (presets && Object.keys(presets).length > 0) ? presets : DEFAULT_PRESETS;
  const presetKeys = Object.keys(activePresets);
  const filteredPresetKeys = presetKeys.filter((key) => {
    if (presetSubjectFilter === 'All') return true;
    const p = activePresets[key];
    return p && p.subject && p.subject.toLowerCase().includes(presetSubjectFilter.toLowerCase());
  });

  const getSubjectEmoji = (subj: string) => {
    if (subj?.includes('Physics')) return '⚛️';
    if (subj?.includes('Chemistry')) return '🧪';
    if (subj?.includes('Math')) return '📐';
    if (subj?.includes('Bio')) return '🧬';
    return '✦';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', position: 'relative', zIndex: 5 }}>

      {/* ─── TOP AGENCY CONFIGURATION BAR ─── */}
      <div
        className="glass-card"
        style={{
          padding: '20px 28px',
          borderRadius: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          border: '1px solid var(--border-subtle)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, minWidth: '320px', flexWrap: 'wrap' }}>
          
          {/* Student Name */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: '180px', flex: 1 }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(0, 240, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <User size={16} color="#00f0ff" />
            </div>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Student Name"
              style={{
                width: '100%',
                background: 'rgba(0,0,0,0.5)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '100px',
                padding: '10px 18px',
                color: 'var(--ice-white)',
                fontFamily: 'var(--font-tech)',
                fontSize: '0.88rem',
                outline: 'none'
              }}
            />
          </div>

          {/* Class Grade Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: '140px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(212, 255, 0, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <GraduationCap size={16} color="#d4ff00" />
            </div>
            <select
              value={classGrade}
              onChange={(e) => setClassGrade(e.target.value)}
              style={{
                background: 'rgba(0,0,0,0.5)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '100px',
                padding: '10px 18px',
                color: 'var(--ice-white)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.82rem',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <option value="Class 10" style={{ background: '#0f1118' }}>Class 10th</option>
              <option value="Class 11" style={{ background: '#0f1118' }}>Class 11th</option>
              <option value="Class 12" style={{ background: '#0f1118' }}>Class 12th</option>
            </select>
          </div>

          {/* Subject Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: '150px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(139, 92, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BookMarked size={16} color="#8b5cf6" />
            </div>
            <select
              value={subjectName}
              onChange={(e) => {
                setSubjectName(e.target.value);
                setPresetSubjectFilter(e.target.value as any);
                setIsAutoDetected(false);
              }}
              style={{
                background: 'rgba(0,0,0,0.5)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '100px',
                padding: '10px 18px',
                color: 'var(--ice-white)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.82rem',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <option value="Physics" style={{ background: '#0f1118' }}>⚛️ Physics</option>
              <option value="Chemistry" style={{ background: '#0f1118' }}>🧪 Chemistry</option>
              <option value="Mathematics" style={{ background: '#0f1118' }}>📐 Mathematics</option>
              <option value="Biology" style={{ background: '#0f1118' }}>🧬 Biology</option>
            </select>
          </div>

          {/* Auto-Detected Badge */}
          {isAutoDetected && (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '100px',
                background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.18), rgba(139, 92, 246, 0.18))',
                border: '1px solid var(--neon-cyan)',
                color: 'var(--neon-cyan)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                boxShadow: '0 0 16px rgba(0, 240, 255, 0.25)',
                animation: 'pulse 2.5s infinite'
              }}
            >
              <Sparkles size={13} color="#00f0ff" />
              <span>AUTO-DETECTED: {autoDetectLabel || `${classGrade} • ${subjectName}`}</span>
            </div>
          )}

        </div>

        {/* Mode Switcher Tabs */}
        <div style={{ display: 'flex', background: 'rgba(0,0,0,0.6)', padding: '4px', borderRadius: '100px', border: '1px solid var(--border-subtle)' }}>
          <button
            onClick={() => setAssignmentMode('upload')}
            data-cursor-text="MODE"
            style={{
              padding: '10px 20px',
              borderRadius: '100px',
              border: 'none',
              background: assignmentMode === 'upload' ? 'var(--neon-cyan)' : 'transparent',
              color: assignmentMode === 'upload' ? '#000000' : 'var(--text-muted)',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              cursor: 'pointer',
              transition: 'all 0.25s ease'
            }}
          >
            📄 Solve Mode
          </button>

          <button
            onClick={() => setAssignmentMode('mcq')}
            data-cursor-text="MODE"
            style={{
              padding: '10px 20px',
              borderRadius: '100px',
              border: 'none',
              background: assignmentMode === 'mcq' ? 'var(--neon-purple)' : 'transparent',
              color: assignmentMode === 'mcq' ? '#ffffff' : 'var(--text-muted)',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              cursor: 'pointer',
              transition: 'all 0.25s ease'
            }}
          >
            📝 MCQ Quiz
          </button>
        </div>
      </div>

      {assignmentMode === 'mcq' ? (
        <MCQQuizModule
          studentName={studentName}
          classGrade={classGrade}
          subjectName={subjectName}
          onSubmissionComplete={onSolveComplete}
          apiBaseUrl={apiBaseUrl}
        />
      ) : (
        <>
          {/* ─── COMPACT PARALLAX PRESETS CAROUSEL (CLEAN & RELIEVING) ─── */}
          <div className="glass-card" style={{ padding: '24px 28px', borderRadius: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: showPresets ? '16px' : '0', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span className="agency-pill active" style={{ fontSize: '0.7rem' }}>
                  <Sparkles size={12} color="#00f0ff" />
                  <span>PRESET SCENARIOS</span>
                </span>

                {/* Subject Filter Pills */}
                {showPresets && (
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {(['All', 'Physics', 'Chemistry', 'Mathematics', 'Biology'] as const).map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setPresetSubjectFilter(filter)}
                        data-cursor-text="FILTER"
                        className={`agency-pill ${presetSubjectFilter === filter ? 'active' : ''}`}
                        style={{ padding: '4px 10px', fontSize: '0.65rem', cursor: 'pointer' }}
                      >
                        <span>{filter}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Collapsible Focus Mode Button */}
              <button
                onClick={() => setShowPresets(!showPresets)}
                data-cursor-text="TOGGLE"
                className="agency-pill"
                style={{ cursor: 'pointer', background: 'rgba(255, 255, 255, 0.05)' }}
              >
                {showPresets ? <EyeOff size={12} /> : <Eye size={12} color="#00f0ff" />}
                <span>{showPresets ? 'Focus Mode (Hide)' : 'Show Presets (Expand)'}</span>
              </button>
            </div>

            {/* Horizontal Scrollable / Parallax Cards Deck */}
            {showPresets && (
              <div
                style={{
                  display: 'flex',
                  gap: '14px',
                  overflowX: 'auto',
                  padding: '8px 4px 14px 4px',
                  scrollSnapType: 'x mandatory'
                }}
              >
                {filteredPresetKeys.map((key) => {
                  const p = activePresets[key];
                  const isSelected = selectedPreset === key;
                  const emoji = getSubjectEmoji(p.subject || '');
                  return (
                    <div
                      key={key}
                      onClick={() => handleSelectPreset(key)}
                      onMouseMove={handleCardTilt}
                      onMouseLeave={handleCardTiltReset}
                      data-cursor-text="SELECT"
                      className="glass-card"
                      style={{
                        flex: '0 0 260px',
                        scrollSnapAlign: 'start',
                        padding: '18px',
                        borderRadius: '18px',
                        cursor: 'pointer',
                        background: isSelected ? 'rgba(0, 240, 255, 0.14)' : 'rgba(12, 14, 20, 0.8)',
                        borderColor: isSelected ? 'var(--neon-cyan)' : 'var(--border-subtle)',
                        transition: 'transform 0.12s ease-out, border-color 0.25s ease, background 0.25s ease',
                        boxShadow: isSelected ? '0 0 20px rgba(0, 240, 255, 0.2)' : 'none'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ fontSize: '1.2rem' }}>{emoji}</span>
                        <span className="agency-pill" style={{ padding: '2px 8px', fontSize: '0.62rem' }}>
                          {p.class_grade || 'Class 10'}
                        </span>
                      </div>

                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.88rem', fontWeight: 700, color: 'var(--ice-white)', lineHeight: 1.3 }}>
                        {p.title}
                      </div>

                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: isSelected ? 'var(--neon-cyan)' : 'var(--text-dim)', marginTop: '8px' }}>
                        {isSelected ? '✓ ACTIVE PRESET' : 'CLICK TO LOAD'}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* ─── UPLOAD & INTERACTIVE PROMPT BAR ─── */}
          <div className="glass-card" style={{ padding: '24px 28px', borderRadius: '24px' }}>
            {uploadedPreview && (
              <div style={{ position: 'relative', display: 'inline-block', marginBottom: '18px' }}>
                <img
                  src={uploadedPreview}
                  alt="Uploaded Solution"
                  style={{ maxHeight: '180px', borderRadius: '14px', border: '1px solid var(--neon-cyan)' }}
                />
                <button
                  onClick={() => { setUploadedFile(null); setUploadedPreview(null); }}
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    background: 'rgba(0,0,0,0.85)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '50%',
                    width: '26px',
                    height: '26px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  ✕
                </button>
              </div>
            )}

            {uploadedFile && !uploadedPreview && (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '8px 16px', borderRadius: '100px', background: 'rgba(0, 240, 255, 0.12)', border: '1px solid var(--neon-cyan)', marginBottom: '16px' }}>
                <FileText size={14} color="#00f0ff" />
                <span style={{ fontSize: '0.82rem', color: 'var(--ice-white)', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
                  FILE: {uploadedFile.name}
                </span>
                <button
                  onClick={() => setUploadedFile(null)}
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', marginLeft: '6px' }}
                >
                  ✕
                </button>
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <input
                type="file"
                id="assignment-file"
                accept=".pdf, .jpg, .jpeg, .png, .webp"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />

              <label htmlFor="assignment-file" style={{ cursor: 'pointer' }}>
                <div className="btn-secondary" style={{ padding: '12px 20px', borderRadius: '100px' }}>
                  <Upload size={15} color="#00f0ff" />
                  <span style={{ fontFamily: 'var(--font-display)', textTransform: 'uppercase', fontSize: '0.8rem' }}>Upload Photo / PDF</span>
                </div>
              </label>

              <input
                type="text"
                value={userText}
                onChange={(e) => handleUserTextChange(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder={
                  selectedPreset
                    ? `Preset Loaded: ${presets[selectedPreset]?.title}. Press Enter...`
                    : `Describe solution or ask question in ${classGrade} ${subjectName}...`
                }
                style={{
                  flex: 1,
                  minWidth: '260px',
                  background: 'rgba(0, 0, 0, 0.55)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '100px',
                  padding: '12px 22px',
                  color: 'var(--ice-white)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.92rem',
                  outline: 'none'
                }}
              />

              <button
                onClick={handleSubmit}
                disabled={isLoading}
                data-cursor-text="ANALYZE"
                className="btn-magnetic btn-magnetic-primary"
                style={{ padding: '12px 28px' }}
              >
                <span>{isLoading ? 'ANALYZING...' : 'ANALYZE'}</span>
                <div className="arrow-circle" style={{ width: '28px', height: '28px' }}>
                  {isLoading ? <RefreshCw className="node-pulse" size={13} /> : <ArrowUpRight size={15} />}
                </div>
              </button>
            </div>
          </div>

          {/* ─── DUAL-CARD SOCRATIC REASONING FEED ─── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {messages.map((msg, idx) => (
              <div key={msg.id}>
                {msg.sender === 'student' ? (
                  /* Student Submission Box */
                  <div
                    className="glass-card"
                    style={{
                      background: 'rgba(0, 0, 0, 0.5)',
                      borderRadius: '24px',
                      padding: '24px 28px',
                      border: '1px solid var(--border-subtle)',
                      maxWidth: '920px',
                      marginBottom: '16px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-dim)', letterSpacing: '0.06em' }}>
                        [ INCOMING STUDENT SUBMISSION ]
                      </span>
                      <span className="agency-pill" style={{ fontSize: '0.65rem' }}>
                        {classGrade.toUpperCase()} • {subjectName.toUpperCase()}
                      </span>
                    </div>

                    {msg.image && (
                      <div style={{ marginBottom: '16px' }}>
                        <SpatialErrorPointer
                          imageSrc={msg.image}
                          boundingBox={msg.bounding_box}
                          label={msg.bounding_box_label}
                          errorText={msg.conceptual_error}
                          altText="Student Solution"
                        />
                      </div>
                    )}

                    <div style={{ fontSize: '1.02rem', color: 'var(--ice-white)', lineHeight: 1.6, marginBottom: '16px' }}>
                      "<MathText text={msg.text} />"
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '10px' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-dim)' }}>
                        STUDENT: {studentName}
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-dim)' }}>
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                ) : (
                  /* AI Socratic Reasoning Output Box */
                  <div
                    ref={idx === messages.length - 1 ? latestResponseRef : null}
                    className="glass-card"
                    style={{
                      background: 'rgba(0, 240, 255, 0.04)',
                      borderRadius: '24px',
                      padding: '28px 32px',
                      border: '1px solid rgba(0, 240, 255, 0.28)',
                      maxWidth: '920px',
                      boxShadow: '0 10px 40px -10px rgba(0, 240, 255, 0.15)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--neon-cyan)', letterSpacing: '0.06em' }}>
                        [ SOCRATIC REASONING OUTPUT ]
                      </div>
                      <div className="agency-pill" style={{ padding: '3px 10px', fontSize: '0.65rem', borderColor: 'var(--neon-cyan)', color: 'var(--neon-cyan)' }}>
                        <span>NON-SOLVER</span>
                      </div>
                    </div>

                    {msg.conceptual_error && (
                      <div style={{
                        marginBottom: '16px',
                        background: 'rgba(255, 51, 102, 0.12)',
                        border: '1px solid rgba(255, 51, 102, 0.35)',
                        borderRadius: '14px',
                        padding: '12px 18px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                      }}>
                        <AlertCircle size={16} color="#ff3366" />
                        <div>
                          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--neon-coral)', fontWeight: 700, textTransform: 'uppercase' }}>
                            MISCONCEPTION CLASSIFIED
                          </div>
                          <div style={{ fontSize: '0.88rem', color: '#ffe4ea', marginTop: '2px' }}>
                            <MathText text={msg.conceptual_error} />
                          </div>
                        </div>
                      </div>
                    )}

                    {(() => {
                      const cleanMsgText = (msg.text || '').replace(/\(Ref:[^)]+\)/gi, '').trim();
                      return (
                        <>
                          <div style={{ fontSize: '1.14rem', color: 'var(--ice-white)', lineHeight: 1.55, fontWeight: 600, marginBottom: '18px' }}>
                            "<MathText text={cleanMsgText} />"
                          </div>

                          {/* Interactive Conceptual Visual Diagram Blueprint */}
                          <ConceptualVisualizer
                            text={cleanMsgText}
                            conceptualError={msg.conceptual_error}
                            subject={subjectName}
                            grade={classGrade}
                          />
                        </>
                      );
                    })()}

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      flexWrap: 'wrap',
                      gap: '12px',
                      borderTop: '1px solid rgba(255,255,255,0.08)',
                      paddingTop: '14px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button
                          onClick={() => handlePlayAudio(msg.id, msg.text || '')}
                          data-cursor-text="AUDIO"
                          className="agency-pill"
                          style={{
                            cursor: 'pointer',
                            background: audioState.currentMessageId === msg.id && audioState.isPlaying
                              ? 'rgba(0, 240, 255, 0.2)'
                              : 'rgba(255,255,255,0.06)',
                            color: audioState.currentMessageId === msg.id && audioState.isPlaying
                              ? 'var(--neon-cyan)'
                              : 'var(--ice-white)',
                            borderColor: audioState.currentMessageId === msg.id && audioState.isPlaying
                              ? 'var(--neon-cyan)'
                              : 'var(--border-subtle)'
                          }}
                        >
                          {audioState.currentMessageId === msg.id && audioState.isPlaying ? (
                            audioState.isPaused ? (
                              <>
                                <Play size={12} color="#00ffa3" />
                                <span>Resume Audio</span>
                              </>
                            ) : (
                              <>
                                <Pause size={12} color="#00f0ff" />
                                <span>Pause Audio</span>
                              </>
                            )
                          ) : (
                            <>
                              <Volume2 size={12} color="#00f0ff" />
                              <span>Listen Audio</span>
                            </>
                          )}
                        </button>

                        {audioState.currentMessageId === msg.id && audioState.isPlaying && (
                          <button
                            onClick={handleStopAudio}
                            data-cursor-text="STOP"
                            className="agency-pill"
                            style={{
                              cursor: 'pointer',
                              background: 'rgba(255, 51, 102, 0.15)',
                              color: '#ff3366',
                              borderColor: 'rgba(255, 51, 102, 0.4)'
                            }}
                          >
                            <Square size={10} color="#ff3366" />
                            <span>Stop</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Neural Socratic Processing Engine */}
            {isLoading && (
              <div ref={thinkingEngineRef}>
                <ThinkingEngine classGrade={classGrade} subjectName={subjectName} />
              </div>
            )}

            {/* ─── BOTTOM FOLLOW-UP DOUBT BAR (NO SCROLLING UP NEEDED) ─── */}
            <div
              className="glass-card"
              style={{
                marginTop: '12px',
                padding: '22px 26px',
                borderRadius: '24px',
                background: 'rgba(10, 12, 20, 0.82)',
                border: '1px solid rgba(0, 240, 255, 0.28)',
                boxShadow: '0 12px 40px -10px rgba(0, 0, 0, 0.6)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={16} color="#00f0ff" />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--neon-cyan)', fontWeight: 700, letterSpacing: '0.05em' }}>
                    HAVE A DOUBT ON THIS STEP? ASK SOCRATIC AI
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => {
                      setUserText("Can you explain why this formula is used in simpler words?");
                    }}
                    className="agency-pill"
                    style={{ fontSize: '0.66rem', cursor: 'pointer', background: 'rgba(255,255,255,0.04)' }}
                  >
                    💬 Simpler explanation
                  </button>
                  <button
                    onClick={() => {
                      setUserText("What is the next calculation step I should perform?");
                    }}
                    className="agency-pill"
                    style={{ fontSize: '0.66rem', cursor: 'pointer', background: 'rgba(255,255,255,0.04)' }}
                  >
                    🔍 Guide my next step
                  </button>
                </div>
              </div>

              {/* Upload preview thumbnail if attached */}
              {uploadedPreview && (
                <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(0,0,0,0.4)', padding: '6px 12px', borderRadius: '10px', width: 'fit-content' }}>
                  <img src={uploadedPreview} alt="Preview" style={{ height: '36px', borderRadius: '6px', border: '1px solid var(--neon-cyan)' }} />
                  <span style={{ fontSize: '0.75rem', color: 'var(--ice-white)' }}>{uploadedFile?.name}</span>
                  <button onClick={() => { setUploadedFile(null); setUploadedPreview(null); }} style={{ background: 'none', border: 'none', color: '#ff3366', cursor: 'pointer', fontSize: '0.75rem', marginLeft: '6px' }}>✕ Remove</button>
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                {/* Fast Upload Attachment Button */}
                <label
                  data-cursor-text="ATTACH"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '46px',
                    height: '46px',
                    borderRadius: '14px',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid var(--border-subtle)',
                    cursor: 'pointer',
                    color: 'var(--neon-cyan)',
                    flexShrink: 0
                  }}
                  title="Upload follow-up handwritten photo or PDF"
                >
                  <Upload size={18} />
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                  />
                </label>

                {/* Follow-up Question Input */}
                <input
                  type="text"
                  value={userText}
                  onChange={(e) => {
                    setUserText(e.target.value);
                    autoDetectSubjectAndGrade(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit();
                    }
                  }}
                  placeholder="Ask your follow-up doubt or type your next calculation..."
                  style={{
                    flex: 1,
                    minWidth: '220px',
                    background: 'rgba(0,0,0,0.55)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '14px',
                    padding: '13px 18px',
                    color: 'var(--ice-white)',
                    fontFamily: 'var(--font-tech)',
                    fontSize: '0.92rem',
                    outline: 'none'
                  }}
                />

                {/* Submit Doubt Button */}
                <button
                  onClick={handleSubmit}
                  disabled={isLoading || (!userText.trim() && !uploadedFile)}
                  className="agency-button-primary"
                  style={{
                    padding: '13px 26px',
                    borderRadius: '14px',
                    opacity: (isLoading || (!userText.trim() && !uploadedFile)) ? 0.5 : 1,
                    cursor: (isLoading || (!userText.trim() && !uploadedFile)) ? 'not-allowed' : 'pointer'
                  }}
                >
                  <span>{isLoading ? 'ANALYZING...' : 'ASK DOUBT'}</span>
                  <div className="arrow-circle" style={{ width: '26px', height: '26px' }}>
                    {isLoading ? <RefreshCw className="node-pulse" size={12} /> : <ArrowUpRight size={14} />}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </>
      )}

    </div>
  );
};
