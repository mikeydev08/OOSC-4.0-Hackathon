import React, { useState, useEffect } from 'react';
import { Award, IndianRupee, CheckCircle2, AlertCircle, ExternalLink, Sparkles, Filter, FileText, ChevronRight, Globe } from 'lucide-react';

interface Scholarship {
  id: string;
  name: string;
  offered_by: string;
  category_tags: string[];
  award_amount: string;
  award_amount_num: number;
  deadline: string;
  portal_url: string;
  overview: string;
  eligibility_criteria: string[];
  required_documents: string[];
  match_score: number;
  is_eligible: boolean;
  ineligibility_reasons: string[];
  application_status: string;
}

interface ScholarshipMatcherProps {
  apiBaseUrl?: string;
}

export const ScholarshipMatcher: React.FC<ScholarshipMatcherProps> = ({ apiBaseUrl = 'http://localhost:8000' }) => {
  const [classGrade, setClassGrade] = useState('Class 10');
  const [annualIncome, setAnnualIncome] = useState<number>(180000);
  const [category, setCategory] = useState('OBC');
  const [gender, setGender] = useState('Female');
  const [language, setLanguage] = useState('English');
  const [stream] = useState('Science');

  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [eligibleCount, setEligibleCount] = useState<number>(0);
  const [totalAidPotential, setTotalAidPotential] = useState<string>('₹0');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Eligible' | 'STEM' | 'Girls'>('All');

  // AI Guidance Modal
  const [activeGuidance, setActiveGuidance] = useState<any | null>(null);
  const [guidanceLoading, setGuidanceLoading] = useState<boolean>(false);
  const [guidanceScholarshipName, setGuidanceScholarshipName] = useState<string>('');

  const fetchMatches = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${apiBaseUrl}/api/scholarships/match`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student_name: 'Student',
          class_grade: classGrade,
          annual_income: annualIncome,
          category,
          gender,
          stream
        })
      });
      const data = await res.json();
      if (data.status === 'success') {
        setScholarships(data.matches || []);
        setEligibleCount(data.eligible_count || 0);
        setTotalAidPotential(data.total_aid_potential || '₹0');
      }
    } catch (e) {
      console.error('Failed to match scholarships:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, [classGrade, annualIncome, category, gender, stream]);

  const handleGetAIGuidance = async (sch: Scholarship) => {
    setGuidanceLoading(true);
    setGuidanceScholarshipName(sch.name);
    try {
      const res = await fetch(`${apiBaseUrl}/api/scholarships/ai_guidance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scholarship_id: sch.id,
          class_grade: classGrade,
          annual_income: annualIncome,
          category,
          gender,
          language
        })
      });
      const data = await res.json();
      if (data.status === 'success') {
        setActiveGuidance(data.guidance);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setGuidanceLoading(false);
    }
  };

  const filteredScholarships = scholarships.filter((s) => {
    if (selectedFilter === 'Eligible') return s.is_eligible;
    if (selectedFilter === 'STEM') return s.category_tags.includes('STEM') || s.category_tags.includes('Science');
    if (selectedFilter === 'Girls') return s.category_tags.includes('Girl Child') || s.category_tags.includes('Women in Science');
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', position: 'relative', zIndex: 5 }}>
      
      {/* ─── HEADER & VALUE PROPOSITION ─── */}
      <div
        className="glass-card"
        style={{
          padding: '32px 36px',
          borderRadius: '28px',
          background: 'radial-gradient(ellipse at 80% 20%, rgba(212, 255, 0, 0.08) 0%, rgba(10, 11, 16, 0.95) 70%)',
          border: '1px solid rgba(212, 255, 0, 0.25)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '24px'
        }}
      >
        <div style={{ maxWidth: '680px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', borderRadius: '100px', background: 'rgba(212, 255, 0, 0.12)', border: '1px solid #d4ff00', color: '#d4ff00', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 700, marginBottom: '12px' }}>
            <Award size={13} color="#d4ff00" />
            <span>AI EQUITABLE EDUCATION ACCESS & AID MATCHER</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800, color: 'var(--ice-white)', lineHeight: 1.15, marginBottom: '8px' }}>
            Scholarship & Aid Eligibility Engine
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.5 }}>
            Bridging the opportunity divide by matching Class 10th–12th learners directly with Indian Central/State Government (NSP, DST, MoE) and philanthropic merit-cum-means financial aid.
          </p>
        </div>

        {/* Live Potential KPI Card */}
        <div
          style={{
            background: 'rgba(0, 0, 0, 0.65)',
            border: '1px solid rgba(212, 255, 0, 0.4)',
            borderRadius: '20px',
            padding: '20px 28px',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            boxShadow: '0 0 30px rgba(212, 255, 0, 0.15)'
          }}
        >
          <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(212, 255, 0, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #d4ff00' }}>
            <IndianRupee size={24} color="#d4ff00" />
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
              YOUR AID POTENTIAL
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.7rem', fontWeight: 900, color: '#d4ff00' }}>
              {totalAidPotential}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--neon-emerald)' }}>
              ✓ {eligibleCount} Schemes 100% Qualified
            </div>
          </div>
        </div>
      </div>

      {/* ─── INTERACTIVE ELIGIBILITY PROFILER BAR ─── */}
      <div
        className="glass-card"
        style={{
          padding: '24px 28px',
          borderRadius: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          border: '1px solid var(--border-subtle)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem', color: 'var(--ice-white)' }}>
            <Filter size={16} color="var(--neon-cyan)" />
            <span>STUDENT ELIGIBILITY PROFILE</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Globe size={14} color="var(--neon-purple)" />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-dim)' }}>ADVICE LANGUAGE:</span>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              style={{
                background: 'rgba(0,0,0,0.6)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '100px',
                padding: '4px 12px',
                color: 'var(--ice-white)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <option value="English">English</option>
              <option value="Hindi">हिन्दी (Hindi)</option>
              <option value="Tamil">தமிழ் (Tamil)</option>
              <option value="Telugu">తెలుగు (Telugu)</option>
              <option value="Marathi">मराठी (Marathi)</option>
              <option value="Bengali">বাংলা (Bengali)</option>
            </select>
          </div>
        </div>

        {/* Input Controls Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          
          {/* Class Grade */}
          <div>
            <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-dim)', marginBottom: '6px' }}>
              CURRENT CLASS GRADE
            </label>
            <select
              value={classGrade}
              onChange={(e) => setClassGrade(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(0,0,0,0.5)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '12px',
                padding: '10px 14px',
                color: 'var(--ice-white)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.82rem',
                outline: 'none'
              }}
            >
              <option value="Class 10">Class 10th (Secondary)</option>
              <option value="Class 11">Class 11th (Senior Sec)</option>
              <option value="Class 12">Class 12th (Senior Sec)</option>
            </select>
          </div>

          {/* Social Category */}
          <div>
            <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-dim)', marginBottom: '6px' }}>
              SOCIAL / CASTE CATEGORY
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(0,0,0,0.5)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '12px',
                padding: '10px 14px',
                color: 'var(--ice-white)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.82rem',
                outline: 'none'
              }}
            >
              <option value="OBC">OBC (Other Backward Classes)</option>
              <option value="SC">SC (Scheduled Caste)</option>
              <option value="ST">ST (Scheduled Tribe)</option>
              <option value="EWS">EWS (Economically Weaker)</option>
              <option value="General">General / Open Merit</option>
            </select>
          </div>

          {/* Gender */}
          <div>
            <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-dim)', marginBottom: '6px' }}>
              GENDER INCENTIVE
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(0,0,0,0.5)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '12px',
                padding: '10px 14px',
                color: 'var(--ice-white)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.82rem',
                outline: 'none'
              }}
            >
              <option value="Female">Female (Includes Girl-Child Aid)</option>
              <option value="Male">Male</option>
              <option value="Any">Any / Other</option>
            </select>
          </div>

          {/* Annual Family Income */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-dim)', marginBottom: '6px' }}>
              <span>ANNUAL FAMILY INCOME</span>
              <span style={{ color: '#d4ff00', fontWeight: 700 }}>₹{annualIncome.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min={50000}
              max={1000000}
              step={25000}
              value={annualIncome}
              onChange={(e) => setAnnualIncome(Number(e.target.value))}
              style={{
                width: '100%',
                accentColor: '#d4ff00',
                cursor: 'pointer'
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
              <span>₹50K</span>
              <span>₹2.5L</span>
              <span>₹5L</span>
              <span>₹10L</span>
            </div>
          </div>

        </div>

        {/* Filter Badges */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', paddingTop: '8px', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
          {(['All', 'Eligible', 'STEM', 'Girls'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedFilter(tab)}
              style={{
                padding: '6px 16px',
                borderRadius: '100px',
                border: selectedFilter === tab ? '1px solid var(--neon-cyan)' : '1px solid var(--border-subtle)',
                background: selectedFilter === tab ? 'rgba(0, 240, 255, 0.15)' : 'rgba(0,0,0,0.4)',
                color: selectedFilter === tab ? 'var(--neon-cyan)' : 'var(--text-muted)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {tab === 'All' && `All Schemes (${scholarships.length})`}
              {tab === 'Eligible' && `100% Eligible (${eligibleCount})`}
              {tab === 'STEM' && 'STEM & Science Only'}
              {tab === 'Girls' && 'Girl-Child Schemes'}
            </button>
          ))}
        </div>
      </div>

      {/* ─── SCHOLARSHIPS CARDS GRID ─── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '22px' }}>
        {isLoading ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '48px', color: 'var(--neon-cyan)', fontFamily: 'var(--font-mono)' }}>
            <Sparkles size={24} className="animate-spin" style={{ margin: '0 auto 8px auto' }} />
            <div>Matching against National & State Eligibility Schemes...</div>
          </div>
        ) : (
          filteredScholarships.map((sch) => (
          <div
            key={sch.id}
            className="glass-card"
            style={{
              borderRadius: '22px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '18px',
              border: sch.is_eligible ? '1px solid rgba(0, 240, 255, 0.35)' : '1px solid var(--border-subtle)',
              background: sch.is_eligible
                ? 'radial-gradient(circle at top right, rgba(0, 240, 255, 0.06) 0%, rgba(12, 14, 22, 0.95) 100%)'
                : 'rgba(10, 11, 16, 0.9)',
              position: 'relative'
            }}
          >
            {/* Top Tag & Match Badge */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', marginBottom: '12px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    color: 'var(--text-dim)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em'
                  }}
                >
                  {sch.offered_by}
                </span>

                <span
                  className="agency-pill"
                  style={{
                    padding: '3px 10px',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    borderColor: sch.is_eligible ? 'var(--neon-emerald)' : 'var(--neon-coral)',
                    color: sch.is_eligible ? 'var(--neon-emerald)' : 'var(--neon-coral)',
                    background: sch.is_eligible ? 'rgba(0, 255, 163, 0.1)' : 'rgba(255, 51, 102, 0.1)'
                  }}
                >
                  {sch.is_eligible ? `✓ ${sch.match_score}% MATCH` : 'CRITERIA GAP'}
                </span>
              </div>

              {/* Title & Amount */}
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 800, color: 'var(--ice-white)', marginBottom: '8px', lineHeight: 1.25 }}>
                {sch.name}
              </h3>

              {/* Award Amount Badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 14px',
                  borderRadius: '100px',
                  background: 'rgba(212, 255, 0, 0.1)',
                  border: '1px solid rgba(212, 255, 0, 0.3)',
                  color: '#d4ff00',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  marginBottom: '14px'
                }}
              >
                <IndianRupee size={13} />
                <span>{sch.award_amount}</span>
              </div>

              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.45, marginBottom: '14px' }}>
                {sch.overview}
              </p>

              {/* Eligibility Check List */}
              <div style={{ background: 'rgba(0,0,0,0.4)', borderRadius: '14px', padding: '12px 14px', marginBottom: '14px', border: '1px solid rgba(255, 255, 255, 0.04)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-dim)', marginBottom: '6px', textTransform: 'uppercase' }}>
                  KEY ELIGIBILITY CONDITIONS:
                </div>
                {sch.eligibility_criteria.slice(0, 3).map((crit, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.78rem', color: 'var(--ice-white)', marginTop: '4px' }}>
                    <CheckCircle2 size={13} color={sch.is_eligible ? '#00ffa3' : '#a0aec0'} style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span>{crit}</span>
                  </div>
                ))}
              </div>

              {/* Ineligibility Reason Note */}
              {!sch.is_eligible && sch.ineligibility_reasons.length > 0 && (
                <div style={{ background: 'rgba(255, 51, 102, 0.08)', border: '1px solid rgba(255, 51, 102, 0.3)', borderRadius: '10px', padding: '8px 12px', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <AlertCircle size={14} color="#ff3366" />
                  <span style={{ fontSize: '0.72rem', color: '#ffb3c6' }}>
                    {sch.ineligibility_reasons[0]}
                  </span>
                </div>
              )}
            </div>

            {/* Action Buttons Footer */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '14px' }}>
              <button
                onClick={() => handleGetAIGuidance(sch)}
                className="btn-secondary"
                style={{
                  flex: 1,
                  padding: '9px 14px',
                  borderRadius: '100px',
                  fontSize: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <Sparkles size={13} color="var(--neon-cyan)" />
                <span>AI Prep Guide</span>
              </button>

              <a
                href={sch.portal_url.split(' ')[0]}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
                style={{
                  padding: '9px 16px',
                  borderRadius: '100px',
                  fontSize: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  textDecoration: 'none'
                }}
              >
                <span>Apply Portal</span>
                <ExternalLink size={12} />
              </a>
            </div>

          </div>
        )))}
      </div>

      {/* ─── AI APPLICATION STRATEGY & GUIDANCE MODAL ─── */}
      {(guidanceLoading || activeGuidance) && (
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
              maxWidth: '620px',
              padding: '32px',
              borderRadius: '28px',
              border: '1px solid rgba(0, 240, 255, 0.4)',
              boxShadow: '0 0 50px rgba(0, 240, 255, 0.2)',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '12px', background: 'rgba(0, 240, 255, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--neon-cyan)' }}>
                  <Sparkles size={18} color="#00f0ff" />
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 800, color: 'var(--ice-white)' }}>
                    AI APPLICATION ACTION GUIDE
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--neon-cyan)' }}>
                    {guidanceScholarshipName}
                  </div>
                </div>
              </div>

              <button
                onClick={() => { setActiveGuidance(null); setGuidanceLoading(false); }}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '28px',
                  height: '28px',
                  color: '#fff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ✕
              </button>
            </div>

            {guidanceLoading ? (
              <div style={{ textAlign: 'center', padding: '36px 0', color: 'var(--neon-cyan)', fontFamily: 'var(--font-mono)' }}>
                <Sparkles size={28} className="animate-spin" style={{ margin: '0 auto 12px auto' }} />
                <div>Synthesizing Application Strategy in {language}...</div>
              </div>
            ) : activeGuidance ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                
                {/* Verdict */}
                <div style={{ background: 'rgba(0, 255, 163, 0.08)', border: '1px solid rgba(0, 255, 163, 0.3)', borderRadius: '14px', padding: '14px 18px' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--neon-emerald)', marginBottom: '4px' }}>
                    ELIGIBILITY VERDICT & TARGET STRATEGY:
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--ice-white)', fontWeight: 500 }}>
                    {activeGuidance.eligibility_verdict}
                  </div>
                </div>

                {/* Step-by-Step Flow */}
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--neon-cyan)', marginBottom: '8px' }}>
                    APPLICATION ROADMAP:
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {activeGuidance.step_by_step_application_flow?.map((step: string, idx: number) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '10px 14px', background: 'rgba(0,0,0,0.4)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)', fontSize: '0.82rem', color: 'var(--ice-white)' }}>
                        <ChevronRight size={14} color="var(--neon-cyan)" style={{ marginTop: '2px', flexShrink: 0 }} />
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Documents */}
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#d4ff00', marginBottom: '8px' }}>
                    MANDATORY VERIFICATION DOCUMENTS:
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {activeGuidance.key_documents_to_prepare?.map((doc: string, idx: number) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        <FileText size={13} color="#d4ff00" />
                        <span>{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Winning Tip */}
                {activeGuidance.expert_tip_to_win && (
                  <div style={{ background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.3)', borderRadius: '12px', padding: '12px 16px' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--neon-purple)', marginBottom: '4px' }}>
                      PRO TIP TO PREVENT DISQUALIFICATION:
                    </div>
                    <div style={{ fontSize: '0.84rem', color: '#f3e8ff' }}>
                      {activeGuidance.expert_tip_to_win}
                    </div>
                  </div>
                )}

              </div>
            ) : null}
          </div>
        </div>
      )}

    </div>
  );
};
