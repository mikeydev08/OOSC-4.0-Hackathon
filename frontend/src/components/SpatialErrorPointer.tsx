import React, { useState } from 'react';
import { Target, ZoomIn, ZoomOut, AlertCircle, Sparkles } from 'lucide-react';
import { MathText } from './MathText';

interface SpatialErrorPointerProps {
  imageSrc: string;
  boundingBox?: number[] | null; // [ymin, xmin, ymax, xmax] normalized (0 - 1000)
  label?: string | null;
  errorText?: string | null;
  altText?: string;
}

export const SpatialErrorPointer: React.FC<SpatialErrorPointerProps> = ({
  imageSrc,
  boundingBox,
  label = 'FLAWED STEP DETECTED',
  errorText,
  altText = 'Student Submission'
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);

  // Default realistic bounding box if not explicitly given
  const [ymin, xmin, ymax, xmax] = boundingBox && boundingBox.length === 4
    ? boundingBox
    : [300, 80, 580, 920];

  const topPct = (ymin / 10).toFixed(1);
  const leftPct = (xmin / 10).toFixed(1);
  const widthPct = Math.max((xmax - xmin) / 10, 15).toFixed(1);
  const heightPct = Math.max((ymax - ymin) / 10, 10).toFixed(1);

  return (
    <div style={{ position: 'relative', display: 'inline-block', maxWidth: '100%', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
      
      {/* Top Toolbar Controls */}
      <div style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        display: 'flex',
        gap: '8px',
        zIndex: 10,
        background: 'rgba(8, 9, 13, 0.85)',
        backdropFilter: 'blur(10px)',
        padding: '4px 8px',
        borderRadius: '100px',
        border: '1px solid var(--border-subtle)'
      }}>
        <button
          onClick={() => setShowOverlay(!showOverlay)}
          data-cursor-text="BOX"
          style={{
            background: showOverlay ? 'rgba(255, 51, 102, 0.2)' : 'transparent',
            border: 'none',
            color: showOverlay ? 'var(--neon-coral)' : 'var(--text-muted)',
            fontSize: '0.72rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            cursor: 'pointer',
            padding: '4px 8px',
            borderRadius: '100px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <Target size={12} />
          <span>{showOverlay ? 'Hide Pointer' : 'Show Error Box'}</span>
        </button>

        <button
          onClick={() => setIsZoomed(!isZoomed)}
          data-cursor-text="ZOOM"
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--ice-white)',
            fontSize: '0.72rem',
            fontFamily: 'var(--font-mono)',
            cursor: 'pointer',
            padding: '4px 8px',
            borderRadius: '100px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          {isZoomed ? <ZoomOut size={12} /> : <ZoomIn size={12} />}
          <span>{isZoomed ? 'Reset' : 'Zoom'}</span>
        </button>
      </div>

      {/* Main Image View */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <img
          src={imageSrc}
          alt={altText}
          style={{
            display: 'block',
            maxWidth: '100%',
            maxHeight: isZoomed ? '480px' : '260px',
            borderRadius: '16px',
            transform: isZoomed ? 'scale(1.2)' : 'scale(1)',
            transformOrigin: `${leftPct}% ${topPct}%`,
            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        />

        {/* Spatial Neon Bounding Box */}
        {showOverlay && (
          <div
            style={{
              position: 'absolute',
              top: `${topPct}%`,
              left: `${leftPct}%`,
              width: `${widthPct}%`,
              height: `${heightPct}%`,
              border: '2px dashed var(--neon-coral)',
              background: 'rgba(255, 51, 102, 0.16)',
              borderRadius: '8px',
              boxShadow: '0 0 20px rgba(255, 51, 102, 0.4), inset 0 0 15px rgba(255, 51, 102, 0.2)',
              pointerEvents: 'none',
              animation: 'pulse-glow 2s infinite ease-in-out',
              zIndex: 5
            }}
          >
            {/* Corner Crosshairs */}
            <div style={{ position: 'absolute', top: '-4px', left: '-4px', width: '8px', height: '8px', borderTop: '2px solid #fff', borderLeft: '2px solid #fff' }} />
            <div style={{ position: 'absolute', top: '-4px', right: '-4px', width: '8px', height: '8px', borderTop: '2px solid #fff', borderRight: '2px solid #fff' }} />
            <div style={{ position: 'absolute', bottom: '-4px', left: '-4px', width: '8px', height: '8px', borderBottom: '2px solid #fff', borderLeft: '2px solid #fff' }} />
            <div style={{ position: 'absolute', bottom: '-4px', right: '-4px', width: '8px', height: '8px', borderBottom: '2px solid #fff', borderRight: '2px solid #fff' }} />

            {/* Floating Socratic Label Pill */}
            <div style={{
              position: 'absolute',
              top: '-24px',
              left: '0',
              background: 'var(--neon-coral)',
              color: '#000',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              fontWeight: 800,
              padding: '2px 8px',
              borderRadius: '4px',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.5)'
            }}>
              <AlertCircle size={10} />
              <span>{label || 'FLAWED STEP DETECTED'}</span>
            </div>
          </div>
        )}
      </div>

      {/* Misconception Description Caption */}
      {errorText && (
        <div style={{
          padding: '10px 16px',
          background: 'rgba(255, 51, 102, 0.08)',
          borderTop: '1px solid rgba(255, 51, 102, 0.25)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontFamily: 'var(--font-tech)',
          fontSize: '0.8rem',
          color: '#ffe4ea'
        }}>
          <Sparkles size={12} color="#ff3366" />
          <span>Spatial Pointer: <MathText text={errorText} /></span>
        </div>
      )}

      <style>{`
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.85; box-shadow: 0 0 15px rgba(255, 51, 102, 0.3); }
          50% { opacity: 1; box-shadow: 0 0 25px rgba(255, 51, 102, 0.6); }
        }
      `}</style>
    </div>
  );
};
