import React from 'react';
import { Eye, Database, ShieldCheck, RefreshCw, HelpCircle } from 'lucide-react';

export interface TraceLog {
  step: number;
  node: string;
  status: string;
  details: any;
  is_valid?: boolean;
}

interface RAGTraceVisualizerProps {
  logs: TraceLog[];
  isEvaluating: boolean;
}

export const RAGTraceVisualizer: React.FC<RAGTraceVisualizerProps> = ({ logs, isEvaluating }) => {
  const getNodeState = (nodeName: string) => {
    const matching = logs.filter(l => l.node.toLowerCase().includes(nodeName.toLowerCase()));
    if (matching.length > 0) {
      const last = matching[matching.length - 1];
      return { active: true, log: last };
    }
    return { active: false, log: null };
  };

  const visionState = getNodeState('vision');
  const retrievalState = getNodeState('retrieval');
  const reflectionState = getNodeState('self-reflection');
  const rewriteState = getNodeState('query rewrite');
  const socraticState = getNodeState('socratic');

  return (
    <div className="glass-card" style={{ padding: '20px', marginBottom: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '1rem', color: '#06b6d4', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
          <RefreshCw className={isEvaluating ? 'node-pulse' : ''} size={18} />
          LangGraph Corrective RAG Workflow Trace
        </h3>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          {isEvaluating ? 'Agent Processing State Graph...' : `${logs.length} Steps Executed`}
        </span>
      </div>

      {/* Nodes Flow Diagram */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: '12px',
        alignItems: 'center'
      }}>

        {/* Node 1: Vision Parser */}
        <div style={{
          background: visionState.active ? 'rgba(6, 182, 212, 0.12)' : 'rgba(255, 255, 255, 0.03)',
          border: visionState.active ? '1px solid #06b6d4' : '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '12px',
          padding: '14px',
          transition: 'all 0.3s ease'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: visionState.active ? '#06b6d4' : 'var(--text-muted)' }}>
            <Eye size={18} />
            <strong style={{ fontSize: '0.85rem' }}>1. Vision Parser</strong>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '6px' }}>
            {visionState.log ? visionState.log.details.conceptual_error?.substring(0, 45) + '...' : 'Awaiting image input'}
          </p>
        </div>

        {/* Node 2: Retrieval */}
        <div style={{
          background: retrievalState.active ? 'rgba(139, 92, 246, 0.12)' : 'rgba(255, 255, 255, 0.03)',
          border: retrievalState.active ? '1px solid #8b5cf6' : '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '12px',
          padding: '14px',
          transition: 'all 0.3s ease'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: retrievalState.active ? '#8b5cf6' : 'var(--text-muted)' }}>
            <Database size={18} />
            <strong style={{ fontSize: '0.85rem' }}>2. Retrieval</strong>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '6px' }}>
            {retrievalState.log ? `NCERT Top Score: ${retrievalState.log.details.top_score}` : 'NCERT Vector Search'}
          </p>
        </div>

        {/* Node 3: Self-Reflection */}
        <div style={{
          background: reflectionState.active ? (reflectionState.log?.details?.is_valid ? 'rgba(16, 185, 129, 0.12)' : 'rgba(245, 158, 11, 0.12)') : 'rgba(255, 255, 255, 0.03)',
          border: reflectionState.active ? (reflectionState.log?.details?.is_valid ? '1px solid #10b981' : '1px solid #f59e0b') : '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '12px',
          padding: '14px',
          transition: 'all 0.3s ease'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: reflectionState.active ? (reflectionState.log?.details?.is_valid ? '#10b981' : '#f59e0b') : 'var(--text-muted)' }}>
            <ShieldCheck size={18} />
            <strong style={{ fontSize: '0.85rem' }}>3. Reflection</strong>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '6px' }}>
            {reflectionState.log ? (reflectionState.log.details.is_valid ? 'Valid Context' : 'Context Rewrite Required') : 'Grade Context'}
          </p>
        </div>

        {/* Node 4: Query Rewrite */}
        <div style={{
          background: rewriteState.active ? 'rgba(245, 158, 11, 0.12)' : 'rgba(255, 255, 255, 0.02)',
          border: rewriteState.active ? '1px dashed #f59e0b' : '1px dashed rgba(255, 255, 255, 0.08)',
          borderRadius: '12px',
          padding: '14px',
          opacity: rewriteState.active ? 1 : 0.6,
          transition: 'all 0.3s ease'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: rewriteState.active ? '#f59e0b' : 'var(--text-muted)' }}>
            <RefreshCw size={18} />
            <strong style={{ fontSize: '0.85rem' }}>4. Query Rewrite</strong>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '6px' }}>
            {rewriteState.log ? `Retry #${rewriteState.log.details.retry_count}` : 'Cyclic Loop (Max 2)'}
          </p>
        </div>

        {/* Node 5: Socratic Generation */}
        <div style={{
          background: socraticState.active ? 'rgba(16, 185, 129, 0.12)' : 'rgba(255, 255, 255, 0.03)',
          border: socraticState.active ? '1px solid #10b981' : '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '12px',
          padding: '14px',
          transition: 'all 0.3s ease'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: socraticState.active ? '#10b981' : 'var(--text-muted)' }}>
            <HelpCircle size={18} />
            <strong style={{ fontSize: '0.85rem' }}>5. Socratic Hint</strong>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '6px' }}>
            {socraticState.log ? 'Guiding Question Ready' : 'Generate Question'}
          </p>
        </div>

      </div>

      {/* Execution Step Log Details */}
      {logs.length > 0 && (
        <div style={{ marginTop: '16px', background: 'rgba(0,0,0,0.3)', borderRadius: '10px', padding: '12px', maxHeight: '120px', overflowY: 'auto' }}>
          <div style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: '#9ca3af' }}>
            {logs.map((log, i) => (
              <div key={i} style={{ marginBottom: '4px', display: 'flex', gap: '8px' }}>
                <span style={{ color: '#06b6d4' }}>[Step {log.step}]</span>
                <strong style={{ color: '#f3f4f6' }}>{log.node}:</strong>
                <span>{JSON.stringify(log.details)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
