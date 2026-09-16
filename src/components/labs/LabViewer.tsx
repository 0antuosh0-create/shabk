import React, { useState } from 'react';
import { VirtualNetworkNode } from '../../types/network';
import { TroubleshootingLabScenario } from '../../data/labs/troubleshooting-scenarios';
import { NetworkSimulator } from '../../lib/network/simulator';
import { TopologyGraph } from './TopologyGraph';
import { TerminalWindow } from '../terminal/TerminalWindow';
import { LabFeedbackBanner } from './LabFeedbackBanner';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { AlertCircle, HelpCircle, CheckCircle, ShieldAlert } from 'lucide-react';
import confetti from 'canvas-confetti';

export interface LabViewerProps {
  scenario: TroubleshootingLabScenario;
  onCompleted?: () => void;
  onNextLab?: () => void;
}

export const LabViewer: React.FC<LabViewerProps> = ({
  scenario,
  onCompleted,
  onNextLab,
}) => {
  const [simulator] = useState(() => new NetworkSimulator(scenario.initialTopology));
  const [showHints, setShowHints] = useState<boolean>(false);
  const [isSolved, setIsSolved] = useState<boolean>(false);
  const [verifyMsg, setVerifyMsg] = useState<string | null>(null);

  const handleVerify = () => {
    const currentNodeA = simulator.getNode('host-a');
    const currentNodeB = simulator.getNode('host-b');
    const nodes = [currentNodeA, currentNodeB].filter(Boolean) as VirtualNetworkNode[];

    const result = scenario.verifySolution(nodes);
    setVerifyMsg(result.messageFa);

    if (result.isSolved) {
      setIsSolved(true);
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      if (onCompleted) {
        onCompleted();
      }
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16 animate-in fade-in duration-200">
      {/* Header */}
      <Card className="border-slate-300 dark:border-slate-800 shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <Badge variant="rose" size="md">
            <ShieldAlert size={14} />
            <span>آزمایشگاه عملی عیب‌یابی شبکه</span>
          </Badge>
          <span className="text-xs font-mono text-slate-500 ltr-text">{scenario.titleEn}</span>
        </div>

        <h1 className="text-2xl font-black text-ink-primary dark:text-ink-light mb-3">
          {scenario.titleFa}
        </h1>

        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
          {scenario.scenarioBriefFa}
        </p>

        {/* Symptoms list */}
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
            نشانه‌های گزارش شده:
          </span>
          <ul className="list-disc list-inside space-y-1 text-xs text-slate-600 dark:text-slate-400">
            {scenario.symptomsFa.map((s, idx) => (
              <li key={idx}>{s}</li>
            ))}
          </ul>
        </div>
      </Card>

      {/* Network Topology Graph */}
      <TopologyGraph nodes={scenario.initialTopology} activeNodeId="host-a" />

      {/* Embedded Terminal connected to this Lab Simulator */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-bold text-sm text-ink-primary dark:text-ink-light">
            محیط خط فرمان ترمینال برای عیب‌یابی سیستم کلاینت (PC-A):
          </h4>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowHints(!showHints)}
            icon={<HelpCircle size={15} />}
          >
            {showHints ? 'پنهان کردن راهنما' : 'مشاهده راهنمای گام‌به‌گام'}
          </Button>
        </div>

        {/* Hints Drawer */}
        {showHints && (
          <div className="p-4 mb-4 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 text-xs text-sky-900 dark:text-sky-200 space-y-2 animate-in fade-in duration-200">
            <span className="font-bold block text-sm">راهنمای تشخیصی:</span>
            <ol className="list-decimal list-inside space-y-1">
              {scenario.hintsFa.map((hint, idx) => (
                <li key={idx}>{hint}</li>
              ))}
            </ol>
          </div>
        )}

        <TerminalWindow
          simulator={simulator}
          initialMessageFa={`سناریوی ${scenario.titleFa} فعال شد. از دستورات ipconfig، ping و arp برای کشف ریشه مشکل استفاده کنید.`}
          className="h-80"
        />
      </div>

      {/* Verification Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white dark:bg-canvas-card-dark rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
            آیا فکر می‌کنید مشکل شبکه برطرف شده است؟
          </span>
          <span className="text-[11px] text-slate-500">
            روی دکمه زیر کلیک کنید تا درستی وضعیت شبکه به صورت خودکار ارزیابی شود.
          </span>
        </div>

        <Button variant="primary" size="md" onClick={handleVerify} icon={<CheckCircle size={16} />}>
          بررسی صحت عیب‌یابی
        </Button>
      </div>

      {/* Result feedback */}
      {verifyMsg && !isSolved && (
        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 text-amber-900 dark:text-amber-200 text-xs flex items-center gap-2">
          <AlertCircle size={18} className="shrink-0 text-amber-600" />
          <span>{verifyMsg}</span>
        </div>
      )}

      {/* Success banner */}
      <LabFeedbackBanner
        isSolved={isSolved}
        takeawayFa={scenario.diagnosticTakeawayFa}
        onNextLab={onNextLab}
      />
    </div>
  );
};
