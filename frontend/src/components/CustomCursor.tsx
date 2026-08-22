import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }

      // Check hover target
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('button, a, input, [data-cursor], .showcase-row, .glass-card, .btn-magnetic');
        if (interactive) {
          setIsHovered(true);
          const customText = interactive.getAttribute('data-cursor-text');
          setCursorText(customText || '');
        } else {
          setIsHovered(false);
          setCursorText('');
        }
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const render = () => {
      // Lerp smooth follow for the ring
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
      animId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="custom-cursor-dot"
        style={{
          opacity: isHovered ? 0 : 1,
          left: 0,
          top: 0,
        }}
      />
      <div
        ref={ringRef}
        className={`custom-cursor-ring ${isHovered ? 'hovered' : ''} ${cursorText ? 'text-mode' : ''}`}
        style={{
          left: 0,
          top: 0,
        }}
      >
        {cursorText && (
          <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#08090d', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            {cursorText}
          </span>
        )}
      </div>
    </>
  );
};
