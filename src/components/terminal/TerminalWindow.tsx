import React, { useState, useRef, useEffect } from 'react';
import { TerminalEngine } from '../../lib/network/terminal-engine';
import { NetworkSimulator } from '../../lib/network/simulator';
import { TerminalOutput } from './TerminalOutput';
import { CommandSuggestions } from './CommandSuggestions';
import { OutputLine } from '../../types/terminal';
import { Terminal, Trash2, Maximize2, Minimize2 } from 'lucide-react';

export interface TerminalWindowProps {
  simulator?: NetworkSimulator;
  initialMessageFa?: string;
  onStateChange?: () => void;
  className?: string;
}

export const TerminalWindow: React.FC<TerminalWindowProps> = ({
  simulator,
  initialMessageFa,
  onStateChange,
  className = '',
}) => {
  const [engine] = useState(() => new TerminalEngine(simulator));
  const [history, setHistory] = useState<OutputLine[]>(() => {
    const lines: OutputLine[] = [
      { id: 'banner-1', text: 'Shabk Network+ Diagnostics Terminal [Version 1.0.0]', type: 'header', isLtr: true },
      { id: 'banner-2', text: '(c) Shabk Network Platform. All rights reserved.', type: 'normal', isLtr: true },
      { id: 'banner-3', text: '', type: 'normal' },
    ];
    if (initialMessageFa) {
      lines.push({ id: 'initial-tip', text: initialMessageFa, type: 'educational-tip', isLtr: false });
    } else {
      lines.push({ id: 'tip-1', text: 'راهنمایی: دستور help یا ipconfig /all را برای شروع وارد نمایید.', type: 'educational-tip', isLtr: false });
    }
    return lines;
  });

  const [inputVal, setInputVal] = useState<string>('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (simulator) {
      engine.setSimulator(simulator);
    }
  }, [simulator, engine]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleExecute = (cmdToRun?: string) => {
    const raw = cmdToRun !== undefined ? cmdToRun : inputVal;
    if (!raw.trim()) return;

    // Echo user prompt
    const promptLine: OutputLine = {
      id: `prompt-${Date.now()}`,
      text: `C:\\Users\\Student> ${raw}`,
      type: 'header',
      isLtr: true,
    };

    const out = engine.execute(raw);

    if (out.lines.length === 1 && out.lines[0].text === '__CLEAR__') {
      setHistory([]);
    } else {
      setHistory((prev) => [...prev, promptLine, ...out.lines, { id: `blank-${Date.now()}`, text: '', type: 'normal' }]);
    }

    setCmdHistory((prev) => [raw, ...prev]);
    setHistoryIndex(-1);
    setInputVal('');

    if (out.stateDelta && onStateChange) {
      onStateChange();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleExecute();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0 && historyIndex < cmdHistory.length - 1) {
        const nextIdx = historyIndex + 1;
        setHistoryIndex(nextIdx);
        setInputVal(cmdHistory[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(cmdHistory[nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    }
  };

  return (
    <div
      className={`flex flex-col bg-slate-950 rounded-2xl border border-slate-800 shadow-elevated overflow-hidden font-mono transition-all text-left ${
        isExpanded
          ? 'fixed inset-0 sm:inset-4 z-50 h-full sm:h-[calc(100vh-2rem)] rounded-none sm:rounded-2xl'
          : 'h-80 sm:h-96'
      } ${className}`}
      onClick={() => inputRef.current?.focus()}
      dir="ltr"
    >
      {/* Terminal Titlebar (LTR) */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 select-none text-left" dir="ltr">
        <div className="flex items-center gap-2 text-slate-300 text-xs">
          <div className="flex items-center gap-1.5 mr-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <Terminal size={14} className="text-net-blue" />
          <span className="font-bold text-[11px] text-slate-300 font-mono">Shabk Diagnostic Terminal (CMD / Bash)</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={(e) => { e.stopPropagation(); setHistory([]); }}
            className="p-1 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded transition-colors cursor-pointer"
            title="Clear Terminal"
          >
            <Trash2 size={13} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
            className="p-1 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded transition-colors cursor-pointer"
            title={isExpanded ? 'Minimize' : 'Maximize'}
          >
            {isExpanded ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
          </button>
        </div>
      </div>

      {/* Terminal Output Stream */}
      <div className="flex-1 p-4 overflow-y-auto space-y-1">
        <TerminalOutput lines={history} />

        {/* Live Input Row */}
        <div className="flex items-center gap-2 pt-1 pb-1" dir="ltr">
          <span className="text-slate-400 text-xs font-bold shrink-0">
            <span className="hidden sm:inline">C:\Users\Student</span>
            <span className="sm:hidden">C:\</span>
            &gt;
          </span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-slate-100 text-xs font-mono outline-none border-none p-0 focus:ring-0 min-w-0"
            autoFocus
            spellCheck={false}
            autoComplete="off"
          />
          {inputVal.trim().length > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleExecute();
              }}
              className="px-2 py-0.5 rounded bg-net-blue text-white text-[10px] font-sans font-bold hover:bg-net-blue/90 active:scale-95 touch-manipulation cursor-pointer shrink-0"
            >
              اجرا
            </button>
          )}
        </div>
        <div ref={endRef} />
      </div>

      {/* Quick Suggestions Bar */}
      <CommandSuggestions onSelectCommand={(cmd) => handleExecute(cmd)} />
    </div>
  );
};
