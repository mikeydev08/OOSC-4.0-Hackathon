import React from 'react';
import katex from 'katex';

interface MathTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export const MathText: React.FC<MathTextProps> = ({ text, className, style }) => {
  if (!text) return null;

  // Render a math segment safely with KaTeX
  const renderMath = (math: string, displayMode = false) => {
    try {
      const html = katex.renderToString(math.trim(), {
        displayMode,
        throwOnError: false,
        output: 'htmlAndMathml'
      });
      return <span key={Math.random()} dangerouslySetInnerHTML={{ __html: html }} />;
    } catch {
      return <span key={Math.random()} className="font-mono">{math}</span>;
    }
  };

  // Convert common ASCII math expressions (like ∫ 2x * cos(x^2) dx, 1/f = 1/v + 1/u, beta = lambda*D/d) into LaTeX
  const preprocessMathText = (input: string): string => {
    let processed = input;

    // Pattern 1: Integral expressions like ∫ 2x * cos(x^2) dx or ∫ ... dx
    processed = processed.replace(/∫\s*([^d]+?)\s*dx/g, (_, body) => {
      const formattedBody = body.replace(/\*/g, ' \\cdot ').replace(/\^(\w+|\([^)]+\))/g, '^{$1}');
      return `$ \\int ${formattedBody} \\, dx $`;
    });

    // Pattern 2: Young's double slit fringe formula beta = lambda * D / d
    processed = processed.replace(/(?:beta|β)\s*=\s*(?:lambda|λ)\s*\*\s*D\s*\/\s*d/gi, '$ \\beta = \\frac{\\lambda D}{d} $');
    processed = processed.replace(/(?:beta|β)\s*=\s*\((?:lambda|λ)\s*\*\s*d\)\s*\/\s*D/gi, '$ \\beta = \\frac{\\lambda d}{D} $');

    // Pattern 3: Mirror / Lens formula like 1/f = 1/v + 1/u or 1/v = 1/f - 1/u
    processed = processed.replace(/1\/f\s*=\s*1\/v\s*\+\s*1\/u/g, '$ \\frac{1}{f} = \\frac{1}{v} + \\frac{1}{u} $');
    processed = processed.replace(/1\/v\s*=\s*1\/f\s*-\s*1\/u/g, '$ \\frac{1}{v} = \\frac{1}{f} - \\frac{1}{u} $');
    processed = processed.replace(/1\/R_?eq\s*=\s*1\/R_?1\s*\+\s*1\/R_?2/gi, '$ \\frac{1}{R_{\\text{eq}}} = \\frac{1}{R_1} + \\frac{1}{R_2} $');
    processed = processed.replace(/R_?eq\s*=\s*R_?1\s*\+\s*R_?2/gi, '$ R_{\\text{eq}} = R_1 + R_2 $');

    // Pattern 4: Ideal gas law PV = nRT
    processed = processed.replace(/PV\s*=\s*nRT/g, '$ PV = nRT $');

    // Pattern 5: Chemical Formulas like K2Cr2O7 or Cr2
    processed = processed.replace(/\bK2Cr2O7\b/g, '$ \\text{K}_2\\text{Cr}_2\\text{O}_7 $');

    return processed;
  };

  const enrichedText = preprocessMathText(text);

  // Split by $...$ for LaTeX math tokens
  const parts = enrichedText.split(/(\$\$[\s\S]+?\$\$|\$[^\$]+?\$)/g);

  return (
    <span className={className} style={{ ...style, display: 'inline' }}>
      {parts.map((part, index) => {
        if (part.startsWith('$$') && part.endsWith('$$')) {
          const math = part.slice(2, -2);
          return renderMath(math, true);
        } else if (part.startsWith('$') && part.endsWith('$')) {
          const math = part.slice(1, -1);
          return renderMath(math, false);
        } else {
          return <span key={index}>{part}</span>;
        }
      })}
    </span>
  );
};
