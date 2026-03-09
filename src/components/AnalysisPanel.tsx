import { Shield, AlertTriangle, Users, Activity } from "lucide-react";

interface AnalysisResult {
  stampedeRisk: number;
  crowdDensity: string;
  riskFactors: string[];
  recommendation: string;
  details: string;
}

interface AnalysisPanelProps {
  result: AnalysisResult | null;
}

const AnalysisPanel = ({ result }: AnalysisPanelProps) => {
  if (!result) return null;

  const getRiskColor = (risk: number) => {
    if (risk < 30) return "text-safe";
    if (risk < 60) return "text-warning";
    return "text-danger";
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 rounded-lg bg-card border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Crowd Density</span>
          </div>
          <p className={`font-mono font-bold text-lg ${getRiskColor(result.stampedeRisk)}`}>
            {result.crowdDensity}
          </p>
        </div>
        <div className="p-4 rounded-lg bg-card border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Threat Level</span>
          </div>
          <p className={`font-mono font-bold text-lg ${getRiskColor(result.stampedeRisk)}`}>
            {result.stampedeRisk < 30 ? "STABLE" : result.stampedeRisk < 60 ? "ELEVATED" : "CRITICAL"}
          </p>
        </div>
      </div>

      {result.riskFactors.length > 0 && (
        <div className="p-4 rounded-lg bg-card border border-border">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-warning" />
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Risk Factors</span>
          </div>
          <ul className="space-y-2">
            {result.riskFactors.map((factor, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-secondary-foreground">
                <span className="text-danger mt-0.5">•</span>
                {factor}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="p-4 rounded-lg bg-card border border-border">
        <div className="flex items-center gap-2 mb-3">
          <Shield className="w-4 h-4 text-safe" />
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Recommendation</span>
        </div>
        <p className="text-sm text-secondary-foreground leading-relaxed">{result.recommendation}</p>
      </div>

      <div className="p-4 rounded-lg bg-card border border-border">
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">Detailed Analysis</p>
        <p className="text-sm text-muted-foreground leading-relaxed">{result.details}</p>
      </div>
    </div>
  );
};

export default AnalysisPanel;
