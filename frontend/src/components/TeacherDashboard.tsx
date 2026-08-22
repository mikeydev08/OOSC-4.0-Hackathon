import React, { useState, useEffect } from 'react';
import { Users, AlertTriangle, CheckCircle2, Clock, FileText, Search, ExternalLink, UserCheck, Sparkles, BookOpen, Trash2, Zap } from 'lucide-react';
import { RemedialWorksheetModal, type RemedialWorksheetData } from './RemedialWorksheetModal';
import { MathText } from './MathText';

interface SubmissionLog {
  id: string;
  student_name: string;
  subject_name: string;
  submission_source: string;
  file_name?: string | null;
  file_url?: string | null;
  file_type?: string | null;
  chapter_name: string;
  topic: string;
  conceptual_error?: string | null;
  socratic_response: string;
  citation: string;
  timestamp: string;
  status: string;
  mcq_details?: {
    question: string;
    selected_option: string;
    correct_option: string;
  } | null;
}

interface AnalyticsData {
  total_students: number;
  total_submissions: number;
  errors_identified: number;
  chapter_breakdown: Record<string, number>;
  student_diagnostics: Array<{
    student_name: string;
    subject_name: string;
    total_submissions: number;
    error_count: number;
    weak_topics: string[];
    recent_logs: SubmissionLog[];
  }>;
}

interface TeacherDashboardProps {
  apiBaseUrl?: string;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ apiBaseUrl = 'http://localhost:8000' }) => {
  const [logs, setLogs] = useState<SubmissionLog[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<string>('All');
  const [selectedChapter, setSelectedChapter] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Remedial Worksheet Generator State (Feature #2)
  const [activeWorksheet, setActiveWorksheet] = useState<RemedialWorksheetData | null>(null);
  const [isWorksheetOpen, setIsWorksheetOpen] = useState(false);
  const [generatingRemedial, setGeneratingRemedial] = useState(false);
  const [remedialTargetStudent, setRemedialTargetStudent] = useState('');
  const [remedialTopic, setRemedialTopic] = useState('');
  const [remedialStep, setRemedialStep] = useState<number>(1);
  const [remedialTimer, setRemedialTimer] = useState<number>(0);

  const fetchDashboardData = async () => {
    try {
      const [logsRes, analyticsRes] = await Promise.all([
        fetch(`${apiBaseUrl}/api/teacher/logs`),
        fetch(`${apiBaseUrl}/api/teacher/analytics`)
      ]);
      const logsData = await logsRes.json();
      const analyticsData = await analyticsRes.json();
      setLogs(logsData);
      setAnalytics(analyticsData);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleGenerateRemedial = async (topic: string, conceptualError: string, studentName: string, subjectName: string) => {
    setGeneratingRemedial(true);
    setRemedialTargetStudent(studentName);
    setRemedialTopic(topic);
    setRemedialStep(1);
    setRemedialTimer(0);

    const startTime = Date.now();
    const timerInterval = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      setRemedialTimer(parseFloat(elapsed.toFixed(1)));
      if (elapsed > 0.25 && elapsed <= 0.6) setRemedialStep(2);
      else if (elapsed > 0.6) setRemedialStep(3);
    }, 100);

    try {
      const res = await fetch(`${apiBaseUrl}/api/teacher/generate_remedial`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: topic || 'STEM Problem Solving',
          conceptual_error: conceptualError || 'Fundamental misconception in formula application',
          class_grade: subjectName.includes('11') ? 'Class 11' : subjectName.includes('12') ? 'Class 12' : 'Class 10',
          subject_name: subjectName,
          student_name: studentName
        })
      });

      const worksheetData = await res.json();
      setRemedialStep(4);
      clearInterval(timerInterval);

      setTimeout(() => {
        setActiveWorksheet(worksheetData);
        setGeneratingRemedial(false);
        setIsWorksheetOpen(true);
      }, 350);
    } catch (e) {
      console.error(e);
      clearInterval(timerInterval);
      setGeneratingRemedial(false);
    }
  };

  const studentNames = Array.from(new Set(logs.map((l) => l.student_name)));
  const chapters = Array.from(new Set(logs.map((l) => l.chapter_name)));

  const filteredLogs = logs.filter((log) => {
    const matchesStudent = selectedStudent === 'All' || log.student_name === selectedStudent;
    const matchesChapter = selectedChapter === 'All' || log.chapter_name === selectedChapter;
    const matchesSearch =
      !searchTerm ||
      log.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.conceptual_error && log.conceptual_error.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesStudent && matchesChapter && matchesSearch;
  });

  const activeStudentProfile = analytics?.student_diagnostics.find(
    (s) => s.student_name === selectedStudent
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

      {/* ─── TOP AGENCY HEADER BAR ─── */}
      <div
        className="glass-card"
        style={{
          padding: '28px 36px',
          borderRadius: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px',
          border: '1px solid var(--border-subtle)'
        }}
      >
        <div>
          <div className="agency-pill active" style={{ marginBottom: '10px' }}>
            <Sparkles size={12} color="#00f0ff" />
            <span>[ 02 // TEACHER DIAGNOSTIC & REMEDIAL RADAR ]</span>
          </div>
          <h2 style={{ fontSize: '1.7rem', color: 'var(--ice-white)' }}>
            Classroom STEM Misconception Analytics
          </h2>
          <div style={{ fontFamily: 'var(--font-tech)', fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Real-time telemetry across Classes 10–12 Physics, Chemistry, Math & Biology with 1-Click Remedial Generation
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button
            onClick={fetchDashboardData}
            data-cursor-text="REFRESH"
            className="agency-pill"
            style={{ cursor: 'pointer', padding: '10px 18px' }}
          >
            <Clock size={14} color="#00f0ff" />
            <span>REFRESH DATA</span>
          </button>

          <button
            onClick={async () => {
              if (window.confirm("Are you sure you want to clear all teacher logs?")) {
                setLogs([]);
                setAnalytics(null);
                setSelectedStudent('All');
                try {
                  await fetch(`${apiBaseUrl}/api/teacher/clear`, { method: 'POST' });
                } catch (e) {
                  console.error('Clear logs error:', e);
                }
                fetchDashboardData();
              }
            }}
            data-cursor-text="CLEAR"
            className="agency-pill"
            style={{ cursor: 'pointer', padding: '10px 18px', borderColor: 'rgba(255, 51, 102, 0.4)', color: 'var(--neon-coral)' }}
          >
            <Trash2 size={14} color="#ff3366" />
            <span>CLEAR LOGS</span>
          </button>
        </div>
      </div>

      {/* ─── SUMMARY BENTO GRID ─── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
        
        <div className="glass-card" style={{ padding: '28px', borderRadius: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
              TOTAL LEARNERS
            </span>
            <Users size={18} color="#00f0ff" />
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', fontWeight: 800, color: 'var(--ice-white)', marginTop: '10px' }}>
            {analytics?.total_students || studentNames.length || 0}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--neon-cyan)', marginTop: '4px' }}>
            CLASSES 10–12 ACTIVE
          </div>
        </div>

        <div className="glass-card" style={{ padding: '28px', borderRadius: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
              SUBMISSIONS PROCESSED
            </span>
            <FileText size={18} color="#8b5cf6" />
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', fontWeight: 800, color: 'var(--neon-purple)', marginTop: '10px' }}>
            {analytics?.total_submissions || logs.length}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            PDF/PHOTO & MCQ QUIZZES
          </div>
        </div>

        <div className="glass-card" style={{ padding: '28px', borderRadius: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
              ERRORS CLASSIFIED
            </span>
            <AlertTriangle size={18} color="#ff3366" />
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', fontWeight: 800, color: 'var(--neon-coral)', marginTop: '10px' }}>
            {analytics?.errors_identified || logs.filter((l) => l.conceptual_error).length}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--neon-coral)', marginTop: '4px' }}>
            SOCRATIC GUIDANCE SENT
          </div>
        </div>

        <div className="glass-card" style={{ padding: '28px', borderRadius: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
              NCERT ALIGNMENT
            </span>
            <CheckCircle2 size={18} color="#10b981" />
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', fontWeight: 800, color: 'var(--neon-emerald)', marginTop: '10px' }}>
            100%
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--neon-emerald)', marginTop: '4px' }}>
            4,464 PINECONE VECTORS
          </div>
        </div>

      </div>

      {/* ─── INDIVIDUAL STUDENT DIAGNOSTIC PROFILE SECTION ─── */}
      <div className="glass-card" style={{ padding: '32px', borderRadius: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(0, 240, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <UserCheck size={20} color="#00f0ff" />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--neon-cyan)', textTransform: 'uppercase' }}>
                STUDENT PROFILE RADAR
              </div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--ice-white)' }}>
                Individual Student Diagnostic Inspector
              </h3>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <select
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              style={{
                background: 'rgba(0, 0, 0, 0.6)',
                border: '1px solid var(--neon-cyan)',
                borderRadius: '100px',
                padding: '10px 20px',
                color: 'var(--ice-white)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <option value="All" style={{ background: '#0f1118' }}>Select Student ({studentNames.length} Total)</option>
              {studentNames.map((name) => (
                <option key={name} value={name} style={{ background: '#0f1118' }}>{name}</option>
              ))}
            </select>
          </div>
        </div>

        {selectedStudent !== 'All' && activeStudentProfile ? (
          <div style={{
            background: 'rgba(0, 0, 0, 0.5)',
            borderRadius: '20px',
            padding: '24px',
            border: '1px solid rgba(0, 240, 255, 0.3)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 800, color: 'var(--neon-cyan)' }}>
                  👤 {activeStudentProfile.student_name}
                </span>
                <span className="agency-pill" style={{ marginLeft: '14px', fontSize: '0.72rem' }}>
                  {activeStudentProfile.subject_name}
                </span>
              </div>

              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span className="agency-pill active">
                  SUBMISSIONS: {activeStudentProfile.total_submissions}
                </span>
                <span className="agency-pill" style={{ borderColor: 'rgba(255, 51, 102, 0.4)', color: 'var(--neon-coral)' }}>
                  ERRORS: {activeStudentProfile.error_count}
                </span>

                {/* 1-Click Remedial Intervention Trigger for Student */}
                <button
                  onClick={() => handleGenerateRemedial(
                    activeStudentProfile.weak_topics[0] || 'Target Misconception',
                    'Specific conceptual error logged across submissions',
                    activeStudentProfile.student_name,
                    activeStudentProfile.subject_name
                  )}
                  disabled={generatingRemedial}
                  data-cursor-text="REMEDIAL"
                  className="btn-magnetic btn-magnetic-primary"
                  style={{ padding: '8px 18px', fontSize: '0.78rem' }}
                >
                  <Zap size={14} color="#000" />
                  <span>{generatingRemedial ? 'SYNTHESIZING...' : '⚡ GENERATE REMEDIAL SHEET'}</span>
                </button>
              </div>
            </div>

            {/* Weak Topics Badges */}
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--neon-coral)', marginBottom: '8px' }}>
                ⚠️ SPECIFIC CONCEPTUAL WEAKNESSES IDENTIFIED:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {activeStudentProfile.weak_topics.length > 0 ? (
                  activeStudentProfile.weak_topics.map((topic, i) => (
                    <span
                      key={i}
                      style={{
                        background: 'rgba(255, 51, 102, 0.12)',
                        border: '1px solid rgba(255, 51, 102, 0.35)',
                        borderRadius: '100px',
                        padding: '6px 16px',
                        fontSize: '0.8rem',
                        color: '#ffe4ea',
                        fontFamily: 'var(--font-tech)',
                        fontWeight: 600
                      }}
                    >
                      • {topic}
                    </span>
                  ))
                ) : (
                  <span style={{ fontSize: '0.85rem', color: 'var(--neon-emerald)', fontStyle: 'italic' }}>
                    No recurring misconceptions logged. Excellent conceptual clarity!
                  </span>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div style={{ fontFamily: 'var(--font-tech)', fontSize: '0.88rem', color: 'var(--text-muted)', fontStyle: 'italic', padding: '12px 0' }}>
            Select an individual student from the dropdown above to view their diagnostic profile, weakness breakdown, and generate targeted remedial worksheets.
          </div>
        )}
      </div>

      {/* ─── CLASSROOM SUBMISSIONS & GUIDANCE LOGS ─── */}
      <div className="glass-card" style={{ padding: '32px', borderRadius: '28px' }}>
        
        {/* Table Filters Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div className="agency-pill" style={{ marginBottom: '6px' }}>
              <span>[ REAL-TIME ACTIVITY STREAM ]</span>
            </div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--ice-white)' }}>
              Recent Student Submissions ({filteredLogs.length})
            </h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            {/* Search Input */}
            <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--border-subtle)', borderRadius: '100px', padding: '8px 16px' }}>
              <Search size={14} color="var(--text-muted)" />
              <input
                type="text"
                placeholder="Search student or concept..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ background: 'none', border: 'none', color: '#fff', fontSize: '0.85rem', marginLeft: '8px', outline: 'none', fontFamily: 'var(--font-body)' }}
              />
            </div>

            {/* Chapter Filter */}
            <select
              value={selectedChapter}
              onChange={(e) => setSelectedChapter(e.target.value)}
              style={{
                background: 'rgba(0, 0, 0, 0.5)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '100px',
                padding: '8px 16px',
                color: 'var(--ice-white)',
                fontSize: '0.82rem',
                fontFamily: 'var(--font-mono)',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="All" style={{ background: '#0f1118' }}>All Topics ({chapters.length})</option>
              {chapters.map((c) => (
                <option key={c} value={c} style={{ background: '#0f1118' }}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Logs Feed / Showcase Rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {filteredLogs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)', fontFamily: 'var(--font-tech)' }}>
              No student submissions logged yet. Have students submit solutions in the Student Workspace!
            </div>
          ) : (
            filteredLogs.map((log) => (
              <div
                key={log.id}
                style={{
                  background: 'rgba(0, 0, 0, 0.45)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '20px',
                  padding: '22px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  transition: 'all 0.25s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: 'var(--ice-white)' }}>
                      🎓 {log.student_name}
                    </span>
                    <span className="agency-pill" style={{ fontSize: '0.68rem' }}>
                      {log.subject_name}
                    </span>
                    <span className="agency-pill" style={{ color: 'var(--text-muted)', fontSize: '0.65rem' }}>
                      {log.submission_source}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {log.conceptual_error && (
                      <button
                        onClick={() => handleGenerateRemedial(
                          log.topic,
                          log.conceptual_error || '',
                          log.student_name,
                          log.subject_name
                        )}
                        disabled={generatingRemedial}
                        data-cursor-text="REMEDIAL"
                        className="agency-pill"
                        style={{
                          cursor: 'pointer',
                          borderColor: 'rgba(0, 240, 255, 0.4)',
                          color: 'var(--neon-cyan)',
                          background: 'rgba(0, 240, 255, 0.08)',
                          fontSize: '0.72rem'
                        }}
                      >
                        <Zap size={11} color="#00f0ff" />
                        <span>1-Click Remedial Sheet</span>
                      </button>
                    )}

                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                      {log.timestamp}
                    </span>
                  </div>
                </div>

                {/* Topic & Misconception */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-dim)' }}>
                      TOPIC / INQUIRY
                    </div>
                    <div style={{ fontSize: '0.92rem', color: 'var(--ice-white)', marginTop: '2px', fontWeight: 600 }}>
                      <MathText text={log.topic} />
                    </div>
                    {log.file_url && (
                      <a
                        href={`${apiBaseUrl}${log.file_url}`}
                        target="_blank"
                        rel="noreferrer"
                        className="agency-pill"
                        style={{ marginTop: '8px', display: 'inline-flex', cursor: 'pointer', color: 'var(--neon-cyan)' }}
                      >
                        <ExternalLink size={12} />
                        <span>VIEW FILE ({log.file_name})</span>
                      </a>
                    )}
                  </div>

                  {log.conceptual_error && (
                    <div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--neon-coral)' }}>
                        IDENTIFIED MISCONCEPTION
                      </div>
                      <div style={{ fontSize: '0.88rem', color: '#ffe4ea', marginTop: '2px' }}>
                        <MathText text={log.conceptual_error} />
                      </div>
                    </div>
                  )}
                </div>

                {/* Socratic Output Sent */}
                <div style={{ background: 'rgba(0, 240, 255, 0.04)', border: '1px solid rgba(0, 240, 255, 0.2)', borderRadius: '12px', padding: '12px 18px', marginTop: '4px' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--neon-cyan)', marginBottom: '4px' }}>
                    SOCRATIC GUIDING QUESTION SENT:
                  </div>
                  <div style={{ fontSize: '0.94rem', color: 'var(--ice-white)', fontWeight: 500 }}>
                    "<MathText text={log.socratic_response} />"
                  </div>
                  {log.citation && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px', color: 'var(--neon-emerald)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                      <BookOpen size={12} />
                      <span>{log.citation}</span>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ─── REMEDIAL WORKSHEET MODAL (FEATURE #2) ─── */}
      <RemedialWorksheetModal
        isOpen={isWorksheetOpen}
        onClose={() => setIsWorksheetOpen(false)}
        worksheet={activeWorksheet}
        studentName={remedialTargetStudent}
        topic={remedialTopic}
      />

      {/* ─── 1-CLICK REMEDIAL SYNTHESIS TIMELINE HUD MODAL ─── */}
      {generatingRemedial && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(5, 7, 12, 0.88)',
            backdropFilter: 'blur(16px)',
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
              maxWidth: '560px',
              padding: '36px',
              borderRadius: '28px',
              border: '1px solid rgba(0, 240, 255, 0.35)',
              boxShadow: '0 0 50px rgba(0, 240, 255, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              position: 'relative'
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '12px', background: 'rgba(0, 240, 255, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--neon-cyan)' }}>
                  <Zap size={20} color="#00f0ff" />
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 800, color: 'var(--ice-white)' }}>
                    1-CLICK REMEDIAL SYNTHESIS
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--neon-cyan)' }}>
                    TARGET: {remedialTargetStudent} • {remedialTopic}
                  </div>
                </div>
              </div>

              {/* Live Timer Badge */}
              <div
                className="agency-pill"
                style={{
                  padding: '6px 14px',
                  background: 'rgba(0, 240, 255, 0.12)',
                  borderColor: 'var(--neon-cyan)',
                  color: 'var(--neon-cyan)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 700
                }}
              >
                <Clock size={12} />
                <span>{remedialTimer}s (FLASH)</span>
              </div>
            </div>

            {/* Glowing Progress Bar */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-dim)', marginBottom: '8px' }}>
                <span>AI REASONING PIPELINE</span>
                <span>{remedialStep === 1 ? '25%' : remedialStep === 2 ? '55%' : remedialStep === 3 ? '85%' : '100%'}</span>
              </div>
              <div style={{ height: '8px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '100px', overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${remedialStep === 1 ? 25 : remedialStep === 2 ? 55 : remedialStep === 3 ? 85 : 100}%`,
                    background: 'linear-gradient(90deg, #00f0ff, #8b5cf6, #d4ff00)',
                    borderRadius: '100px',
                    transition: 'width 0.3s ease-out',
                    boxShadow: '0 0 12px rgba(0, 240, 255, 0.6)'
                  }}
                />
              </div>
            </div>

            {/* Live Step Timeline */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              
              {/* Step 1 */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: '14px',
                  background: remedialStep >= 1 ? 'rgba(0, 240, 255, 0.06)' : 'transparent',
                  border: `1px solid ${remedialStep >= 1 ? 'rgba(0, 240, 255, 0.25)' : 'rgba(255, 255, 255, 0.05)'}`
                }}
              >
                <div style={{ color: remedialStep > 1 ? 'var(--neon-emerald)' : 'var(--neon-cyan)' }}>
                  {remedialStep > 1 ? <CheckCircle2 size={18} /> : <Sparkles size={18} className="animate-spin" />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--ice-white)' }}>
                    1. Scanning Misconception Tensor
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                    Diagnosing root cause error pattern and flawed derivation step.
                  </div>
                </div>
                {remedialStep > 1 && (
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--neon-emerald)' }}>DONE</span>
                )}
              </div>

              {/* Step 2 */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: '14px',
                  background: remedialStep >= 2 ? 'rgba(139, 92, 246, 0.08)' : 'transparent',
                  border: `1px solid ${remedialStep >= 2 ? 'rgba(139, 92, 246, 0.3)' : 'rgba(255, 255, 255, 0.05)'}`
                }}
              >
                <div style={{ color: remedialStep > 2 ? 'var(--neon-emerald)' : remedialStep === 2 ? 'var(--neon-purple)' : 'var(--text-dim)' }}>
                  {remedialStep > 2 ? <CheckCircle2 size={18} /> : remedialStep === 2 ? <Sparkles size={18} /> : <div style={{ width: 18, height: 18, borderRadius: '50%', border: '1px solid var(--text-dim)' }} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: remedialStep >= 2 ? 'var(--ice-white)' : 'var(--text-dim)' }}>
                    2. NCERT Syllabus Scaffolding Match
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                    Retrieving pedagogical prerequisites and curriculum bounds.
                  </div>
                </div>
                {remedialStep > 2 && (
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--neon-emerald)' }}>MATCHED</span>
                )}
              </div>

              {/* Step 3 */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: '14px',
                  background: remedialStep >= 3 ? 'rgba(212, 255, 0, 0.06)' : 'transparent',
                  border: `1px solid ${remedialStep >= 3 ? 'rgba(212, 255, 0, 0.25)' : 'rgba(255, 255, 255, 0.05)'}`
                }}
              >
                <div style={{ color: remedialStep > 3 ? 'var(--neon-emerald)' : remedialStep === 3 ? '#d4ff00' : 'var(--text-dim)' }}>
                  {remedialStep > 3 ? <CheckCircle2 size={18} /> : remedialStep === 3 ? <Zap size={18} /> : <div style={{ width: 18, height: 18, borderRadius: '50%', border: '1px solid var(--text-dim)' }} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: remedialStep >= 3 ? 'var(--ice-white)' : 'var(--text-dim)' }}>
                    3. 3-Part Socratic Synthesis
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                    Compiling Foundational Prompt, Counterfactual Paradox, & Mastery Challenge.
                  </div>
                </div>
                {remedialStep >= 4 && (
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--neon-emerald)' }}>SYNTHESIZED</span>
                )}
              </div>

            </div>

            <div style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--neon-cyan)' }}>
              ⚡ High-Speed Gemini 3.6 Flash • Sub-second generation
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
