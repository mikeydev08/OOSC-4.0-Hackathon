import { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { StudentView } from './components/StudentView';
import { TeacherDashboard } from './components/TeacherDashboard';
import { ScholarshipMatcher } from './components/ScholarshipMatcher';
import { LandingPage } from './components/LandingPage';
import { CustomCursor } from './components/CustomCursor';
import { InteractiveBackground } from './components/InteractiveBackground';

const API_BASE_URL = 'https://socratic-ai-tutor-gwot.onrender.com';

export function App() {
  const [view, setView] = useState<'landing' | 'app'>('landing');
  const [activeTab, setActiveTab] = useState<'student' | 'teacher' | 'scholarships'>('student');
  const [apiConnected, setApiConnected] = useState<boolean>(false);
  const [totalChunks, setTotalChunks] = useState<number>(14);
  const [presets, setPresets] = useState<Record<string, any>>({});

  // Check backend health and fetch presets/ncert info on mount
  useEffect(() => {
    const checkBackend = async () => {
      try {
        const rootRes = await fetch(`${API_BASE_URL}/`);
        if (rootRes.ok) {
          const rootData = await rootRes.json();
          setApiConnected(true);
          if (rootData.chapters_indexed) {
            setTotalChunks(rootData.chapters_indexed);
          }
        }

        const presetsRes = await fetch(`${API_BASE_URL}/api/presets`);
        if (presetsRes.ok) {
          const presetsData = await presetsRes.json();
          setPresets(presetsData);
        }
      } catch (err) {
        setApiConnected(false);
      }
    };

    checkBackend();
    const interval = setInterval(checkBackend, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <CustomCursor />
      <InteractiveBackground />
      {view === 'landing' ? (
        <LandingPage onEnterApp={() => setView('app')} />
      ) : (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 10 }}>
          {/* Top Header Navbar */}
          <Navbar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            apiConnected={apiConnected}
            totalChunks={totalChunks}
            onBackToLanding={() => setView('landing')}
          />

          {/* Main View Area */}
          <main style={{ flex: 1, maxWidth: '1380px', width: '100%', margin: '0 auto', padding: '0 32px 64px 32px' }}>
            {activeTab === 'student' ? (
              <StudentView apiBaseUrl={API_BASE_URL} presets={presets} />
            ) : activeTab === 'teacher' ? (
              <TeacherDashboard apiBaseUrl={API_BASE_URL} />
            ) : (
              <ScholarshipMatcher apiBaseUrl={API_BASE_URL} />
            )}
          </main>

          {/* Agency Footer */}
          <footer
            style={{
              textAlign: 'center',
              padding: '24px 32px',
              color: 'var(--text-dim)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              borderTop: '1px solid var(--border-subtle)',
              background: 'rgba(8, 9, 13, 0.95)'
            }}
          >
            Corrective RAG Socratic STEM AI &bull; Classes 10th–12th &bull; Built with LangGraph & Google Gemini
          </footer>
        </div>
      )}
    </>
  );
}

export default App;
