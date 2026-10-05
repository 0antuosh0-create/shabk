import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export interface CodePlatformSnippet {
  platform: 'cmd' | 'powershell' | 'bash';
  label: string;
  command: string;
  outputPreview?: string;
}

export interface MultiPlatformCodeBlockProps {
  title?: string;
  snippets: CodePlatformSnippet[] | { cmd?: string; powershell?: string; bash?: string; generic?: string };
  defaultPlatform?: 'cmd' | 'powershell' | 'bash';
}

export const MultiPlatformCodeBlock: React.FC<MultiPlatformCodeBlockProps> = ({
  title,
  snippets,
  defaultPlatform = 'cmd',
}) => {
  // Normalize snippets into array
  const normalizedSnippets: CodePlatformSnippet[] = Array.isArray(snippets)
    ? snippets
    : [
        snippets.cmd && { platform: 'cmd' as const, label: 'Windows CMD', command: snippets.cmd },
        snippets.powershell && { platform: 'powershell' as const, label: 'PowerShell', command: snippets.powershell },
        snippets.bash && { platform: 'bash' as const, label: 'Linux Bash', command: snippets.bash },
        snippets.generic && { platform: 'cmd' as const, label: 'دستور ترمینال', command: snippets.generic },
      ].filter(Boolean) as CodePlatformSnippet[];

  const [activePlatform, setActivePlatform] = useState<'cmd' | 'powershell' | 'bash'>(
    normalizedSnippets[0]?.platform || defaultPlatform
  );
  const [copied, setCopied] = useState<boolean>(false);

  const activeSnippet = normalizedSnippets.find((s) => s.platform === activePlatform) || normalizedSnippets[0];

  const handleCopy = () => {
    if (!activeSnippet) return;
    navigator.clipboard.writeText(activeSnippet.command.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!activeSnippet) return null;

  return (
    <div className="my-5 rounded-2xl overflow-hidden border border-slate-800 bg-[#0c1322] shadow-card text-xs">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-[#111a2e] border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          {/* Terminal Window Dots */}
          <div className="flex items-center gap-1.5 ml-2" dir="ltr">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>

          {title && (
            <span className="font-bold text-slate-300 text-xs mr-1 font-sans">
              {title}
            </span>
          )}
        </div>

        {/* Platform Tabs & Copy Button */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {normalizedSnippets.length > 1 && (
            <div className="flex items-center gap-1 p-0.5 rounded-lg bg-slate-900 border border-slate-800" dir="ltr">
              {normalizedSnippets.map((s) => (
                <button
                  key={s.platform}
                  onClick={() => setActivePlatform(s.platform)}
                  className={`px-2 sm:px-2.5 py-1 rounded-md text-[10px] sm:text-[11px] font-mono font-medium transition-colors cursor-pointer touch-manipulation ${
                    activePlatform === s.platform
                      ? 'bg-net-blue text-white shadow-2xs'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <span className="sm:hidden">{s.platform === 'cmd' ? 'CMD' : s.platform === 'powershell' ? 'PS' : 'Bash'}</span>
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
              ))}
            </div>
          )}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700 cursor-pointer select-none"
            title="کپی در حافظه موقت"
          >
            {copied ? (
              <>
                <Check size={13} className="text-emerald-400" />
                <span className="text-[11px] text-emerald-400 font-sans">کپی شد</span>
              </>
            ) : (
              <>
                <Copy size={13} />
                <span className="text-[11px] font-sans">کپی</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code / Command Display */}
      <div className="p-4 overflow-x-auto ltr-text text-left font-mono text-xs leading-relaxed" dir="ltr">
        <div className="flex items-start gap-2.5">
          <span className="text-slate-500 select-none font-bold">
            {activeSnippet.platform === 'cmd' ? 'C:\\>' : activeSnippet.platform === 'powershell' ? 'PS>' : '$'}
          </span>
          <pre className="text-emerald-400 font-semibold flex-1 overflow-x-auto whitespace-pre-wrap break-all">
            <code>{activeSnippet.command.trim()}</code>
          </pre>
        </div>

        {/* Expected Output Preview (if provided) */}
        {activeSnippet.outputPreview && (
          <div className="mt-3 pt-3 border-t border-slate-800/80 text-slate-300">
            <div className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mb-1.5 select-none font-sans">
              خروجی نمونه ترمینال (Expected Output):
            </div>
            <pre className="text-slate-300 text-[11px] leading-relaxed overflow-x-auto">
              <code>{activeSnippet.outputPreview.trim()}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
