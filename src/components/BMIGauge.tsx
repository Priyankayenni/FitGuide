import type { BMIResult } from '@/types';
import type { Translation } from '@/lib/i18n';

interface BMIGaugeProps {
  result: BMIResult;
  label: string;
  t: Translation;
}

const SIZE = 240;
const STROKE = 16;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = Math.PI * RADIUS; // semicircle

export function BMIGauge({ result, label, t }: BMIGaugeProps) {
  const offset = CIRCUMFERENCE - (result.percentage / 100) * CIRCUMFERENCE;

  return (
    <div className="relative flex flex-col items-center">
      <svg width={SIZE} height={SIZE / 2 + 40} viewBox={`0 0 ${SIZE} ${SIZE / 2 + 40}`}>
        <defs>
          <linearGradient id="gauge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="35%" stopColor="#10b981" />
            <stop offset="65%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
        </defs>

        {/* Background track */}
        <path
          d={`M ${STROKE / 2} ${SIZE / 2} A ${RADIUS} ${RADIUS} 0 0 1 ${SIZE - STROKE / 2} ${SIZE / 2}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={STROKE}
          strokeLinecap="round"
          className="text-neutral-200 dark:text-neutral-700"
        />

        {/* Gradient progress arc */}
        <path
          d={`M ${STROKE / 2} ${SIZE / 2} A ${RADIUS} ${RADIUS} 0 0 1 ${SIZE - STROKE / 2} ${SIZE / 2}`}
          fill="none"
          stroke="url(#gauge-gradient)"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          style={{
            transition: 'stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />

        {/* Needle */}
        <g
          style={{
            transformOrigin: `${SIZE / 2}px ${SIZE / 2}px`,
            transform: `rotate(${-90 + (result.percentage / 100) * 180}deg)`,
            transition: 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <line
            x1={SIZE / 2}
            y1={SIZE / 2}
            x2={SIZE / 2}
            y2={SIZE / 2 - RADIUS + 24}
            stroke={result.color}
            strokeWidth={3}
            strokeLinecap="round"
          />
          <circle cx={SIZE / 2} cy={SIZE / 2} r={6} fill={result.color} />
        </g>

        {/* Scale labels */}
        <text x={STROKE / 2} y={SIZE / 2 + 20} textAnchor="middle" className="fill-neutral-400 text-2xs font-600">
          15
        </text>
        <text x={SIZE / 2} y={SIZE / 2 + 20} textAnchor="middle" className="fill-neutral-400 text-2xs font-600">
          25
        </text>
        <text x={SIZE - STROKE / 2} y={SIZE / 2 + 20} textAnchor="middle" className="fill-neutral-400 text-2xs font-600">
          40
        </text>
      </svg>

      {/* BMI value display */}
      <div className="absolute bottom-0 flex flex-col items-center">
        <span
          className="font-display font-800 text-5xl leading-none animate-count-up"
          style={{ color: result.color }}
        >
          {result.value.toFixed(1)}
        </span>
        <span className="mt-1 text-sm font-500 text-neutral-400">{t.calculator.yourBmi}</span>
      </div>
    </div>
  );
}
