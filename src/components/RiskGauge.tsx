import { useEffect, useState } from "react";

interface RiskGaugeProps {
  percentage: number;
  label: string;
}

const RiskGauge = ({ percentage, label }: RiskGaugeProps) => {
  const [animatedPercent, setAnimatedPercent] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedPercent(percentage), 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  const getColor = (p: number) => {
    if (p < 30) return { ring: "text-safe", glow: "glow-safe", label: "LOW RISK" };
    if (p < 60) return { ring: "text-warning", glow: "glow-warning", label: "MODERATE" };
    if (p < 80) return { ring: "text-danger", glow: "glow-danger", label: "HIGH RISK" };
    return { ring: "text-critical", glow: "glow-danger", label: "CRITICAL" };
  };

  const { ring, glow, label: riskLabel } = getColor(animatedPercent);
  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset = circumference - (animatedPercent / 100) * circumference;

  return (
    <div className={`flex flex-col items-center gap-4 p-6 rounded-xl bg-card border border-border ${glow}`}>
      <p className="text-muted-foreground text-xs font-mono uppercase tracking-widest">{label}</p>
      <div className="relative w-48 h-48">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
          <circle
            cx="80" cy="80" r="70"
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="8"
          />
          <circle
            cx="80" cy="80" r="70"
            fill="none"
            className={ring}
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: "stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-4xl font-mono font-bold ${ring}`}>
            {Math.round(animatedPercent)}%
          </span>
          <span className={`text-xs font-mono font-semibold mt-1 ${ring} pulse-ring`}>
            {riskLabel}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RiskGauge;
