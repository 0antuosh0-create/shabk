import React, { useState } from 'react';
import { IncidentScenario } from '../../types/course';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Terminal, ChevronDown, ChevronUp, CheckCircle2, ShieldAlert } from 'lucide-react';

export interface IncidentScenarioCardProps {
  incident: IncidentScenario;
}

export const IncidentScenarioCard: React.FC<IncidentScenarioCardProps> = ({ incident }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <Card className="my-6 border-slate-300 dark:border-slate-800 shadow-card overflow-hidden">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0">
            <ShieldAlert size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="amber" size="sm">تیکت عملیاتی: {incident.ticketId}</Badge>
              <span className="text-xs text-slate-500 font-medium">موردکاوی دنیای واقعی</span>
            </div>
            <h4 className="font-extrabold text-sm md:text-base text-ink-primary dark:text-ink-light mt-0.5">
              {incident.titleFa}
            </h4>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          icon={isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        >
          {isExpanded ? 'بستن تحلیل' : 'مشاهده سناریو و لاگ'}
        </Button>
      </div>

      {/* Background Story */}
      <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 my-3 leading-relaxed">
        {incident.backgroundFa}
      </p>

      {/* Terminal CLI Snippet (Strictly LTR) */}
      <div className="my-3 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 font-mono text-xs text-slate-200 shadow-inner text-left" dir="ltr">
        <div className="flex items-center justify-between px-3.5 py-1.5 bg-slate-900 border-b border-slate-800 text-[11px] text-slate-400" dir="ltr">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            <Terminal size={13} className="text-net-blue ml-1.5" />
            <span className="font-mono text-slate-300">Incident Terminal Log</span>
          </div>
          <span className="text-[10px] text-slate-500 font-mono">Captured Output</span>
        </div>
        <pre className="p-3.5 overflow-x-auto ltr-text text-left text-xs leading-relaxed whitespace-pre font-mono text-emerald-400 bg-black/40" dir="ltr">
          <code>{incident.cliSnippet.trim()}</code>
        </pre>
      </div>

      {/* Step-by-Step Diagnostic Walkthrough (Expandable) */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3 animate-in fade-in duration-200">
          <h5 className="font-bold text-xs text-net-blue flex items-center gap-1.5">
            <CheckCircle2 size={16} />
            <span>گام‌های تفکر مهندسی و تحلیل لاگ:</span>
          </h5>

          <ol className="list-decimal list-inside space-y-1.5 text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {incident.diagnosisStepsFa.map((step, sIdx) => (
              <li key={sIdx}>{step}</li>
            ))}
          </ol>

          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-950 dark:text-emerald-200 leading-relaxed flex items-start gap-2">
            <CheckCircle2 size={16} className="text-net-green shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block mb-0.5">نتیجه‌گیری و راهکار استاندارد:</span>
              {incident.takeawayFa}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};
