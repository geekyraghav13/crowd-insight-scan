import { useState } from "react";
import { Shield, Zap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import ImageDropZone from "@/components/ImageDropZone";
import RiskGauge from "@/components/RiskGauge";
import AnalysisPanel from "@/components/AnalysisPanel";

interface AnalysisResult {
  stampedeRisk: number;
  crowdDensity: string;
  riskFactors: string[];
  recommendation: string;
  details: string;
}

const Index = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleImageDrop = async (file: File, previewUrl: string) => {
    setPreview(previewUrl);
    setResult(null);
    setIsAnalyzing(true);

    try {
      const { data, error } = await supabase.functions.invoke("analyze-crowd", {
        body: { imageBase64: previewUrl },
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);

      setResult(data);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to analyze image");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setPreview(null);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background grid-bg">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground tracking-tight">CrowdGuard</h1>
              <p className="text-xs font-mono text-muted-foreground">STAMPEDE RISK ANALYZER</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-3 h-3 text-safe" />
            <span className="text-xs font-mono text-muted-foreground">AI POWERED</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left: Upload */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-mono text-muted-foreground uppercase tracking-widest">Image Input</h2>
              {preview && (
                <button
                  onClick={handleReset}
                  className="text-xs font-mono text-primary hover:text-primary/80 transition-colors"
                >
                  RESET
                </button>
              )}
            </div>
            <ImageDropZone
              onImageDrop={handleImageDrop}
              preview={preview}
              isAnalyzing={isAnalyzing}
            />
            {!preview && (
              <p className="text-xs text-muted-foreground text-center">
                Upload a crowd image to analyze stampede risk using AI vision
              </p>
            )}
          </div>

          {/* Right: Results */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-sm font-mono text-muted-foreground uppercase tracking-widest">Analysis Output</h2>

            {result ? (
              <div className="space-y-4">
                <RiskGauge percentage={result.stampedeRisk} label="Stampede Probability" />
                <AnalysisPanel result={result} />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 rounded-xl border border-border bg-card/50 text-center p-6">
                <Shield className="w-12 h-12 text-muted-foreground/30 mb-4" />
                <p className="text-muted-foreground text-sm">
                  {isAnalyzing ? "Processing image..." : "Drop an image to begin analysis"}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
