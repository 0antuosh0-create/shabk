import React from 'react';
import { Copy, Check, Terminal, Sparkles } from 'lucide-react';
import { toPersianDigits } from '../../lib/utils/bidi';

export interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = React.memo(({ content }) => {
  const elements = React.useMemo(() => parseMarkdownBlocks(content), [content]);
  return (
    <div className="space-y-4 text-ink-primary dark:text-ink-light leading-relaxed text-sm md:text-base" dir="rtl">
      {elements}
    </div>
  );
});

interface CodeBlockProps {
  language?: string;
  code: string;
}

const CodeBlockItem: React.FC<CodeBlockProps> = ({ language, code }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const promptSymbol = language === 'cmd' ? 'C:\\>' : language === 'bash' || language === 'sh' ? '$' : '';

  return (
    <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 bg-[#0b1220] shadow-sm text-xs text-left" dir="ltr">
      <div className="flex items-center justify-between px-3.5 py-2 bg-[#10192b] border-b border-slate-800 text-slate-400">
        <div className="flex items-center gap-1.5 font-mono text-[11px]">
          <Terminal size={13} className="text-net-blue" />
          <span>{language || 'Terminal Output'}</span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] transition-colors cursor-pointer"
        >
          {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
          <span>{copied ? 'کپی شد' : 'کپی'}</span>
        </button>
      </div>

      <div className="p-4 overflow-x-auto ltr-text text-left font-mono text-xs leading-relaxed">
        <pre className="text-emerald-400 whitespace-pre-wrap break-all">
          {promptSymbol && <span className="text-slate-500 select-none mr-2 font-bold">{promptSymbol}</span>}
          <code>{code.trim()}</code>
        </pre>
      </div>
    </div>
  );
};

function parseMarkdownBlocks(md: string): React.ReactNode[] {
  if (!md) return [];
  const lines = md.split('\n');
  const nodes: React.ReactNode[] = [];
  let i = 0;
  let keyIndex = 0;

  while (i < lines.length) {
    const prevI = i;
    const line = lines[i];

    // 1. Fenced Code Blocks
    if (line.trim().startsWith('```')) {
      const lang = line.trim().replace(/^```/, '').trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      if (i < lines.length) i++; // Skip closing ```
      nodes.push(
        <CodeBlockItem
          key={`code-${keyIndex++}`}
          language={lang}
          code={codeLines.join('\n')}
        />
      );
      continue;
    }

    // 2. Markdown Tables (| Header | Header |)
    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|')) {
        tableLines.push(lines[i].trim());
        i++;
      }

      if (tableLines.length >= 2) {
        const headerRow = tableLines[0].split('|').filter(Boolean).map((s) => s.trim());
        const bodyRows = tableLines.slice(2).map((r) => r.split('|').filter(Boolean).map((s) => s.trim()));

        nodes.push(
          <div key={`table-${keyIndex++}`} className="my-5 overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <table className="w-full text-xs text-right divide-y divide-slate-200 dark:divide-slate-800">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-ink-primary dark:text-ink-light font-bold">
                <tr>
                  {headerRow.map((h, hIdx) => (
                    <th key={hIdx} className="p-3 whitespace-nowrap">
                      {renderInlineFormatting(h)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 bg-white dark:bg-slate-900/40">
                {bodyRows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="p-3 leading-relaxed">
                        {renderInlineFormatting(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        continue;
      } else {
        // Fallback: render single table lines as paragraphs
        for (const tLine of tableLines) {
          nodes.push(
            <p key={`p-tbl-${keyIndex++}`} className="text-slate-700 dark:text-slate-300 leading-loose text-sm my-2">
              {renderInlineFormatting(tLine)}
            </p>
          );
        }
        continue;
      }
    }

    // 3. Headings: Section Banners
    if (line.startsWith('### ')) {
      const title = line.replace('### ', '').trim();
      nodes.push(
        <div key={`h3-${keyIndex++}`} className="flex items-center gap-3 pt-6 pb-2.5 border-b border-slate-100 dark:border-slate-800">
          <div className="w-2.5 h-6 rounded-full bg-gradient-to-b from-net-blue to-cyan-500 shrink-0" />
          <h3 className="text-base md:text-lg font-extrabold text-ink-primary dark:text-ink-light tracking-tight">
            {renderInlineFormatting(title)}
          </h3>
        </div>
      );
      i++;
      continue;
    }

    if (line.startsWith('## ')) {
      const title = line.replace('## ', '').trim();
      nodes.push(
        <div key={`h2-${keyIndex++}`} className="flex items-center gap-3 pt-8 pb-3 border-b-2 border-slate-200/80 dark:border-slate-800">
          <div className="p-1.5 rounded-xl bg-net-blue/10 text-net-blue shrink-0">
            <Sparkles size={18} />
          </div>
          <h2 className="text-lg md:text-xl font-black text-ink-primary dark:text-ink-light">
            {renderInlineFormatting(title)}
          </h2>
        </div>
      );
      i++;
      continue;
    }

    // 4. Unordered Lists -> Transformed into Concept Insight Cards
    if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
      const listItems: string[] = [];
      while (i < lines.length && (lines[i].trim().startsWith('* ') || lines[i].trim().startsWith('- '))) {
        listItems.push(lines[i].trim().replace(/^[\*\-]\s+/, ''));
        i++;
      }
      nodes.push(
        <div key={`ul-${keyIndex++}`} className="space-y-2 my-3">
          {listItems.map((item, lIdx) => (
            <div
              key={lIdx}
              className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-900/50 border border-slate-200/70 dark:border-slate-800/70 hover:border-net-blue/40 dark:hover:border-net-blue/40 transition-colors flex items-start gap-3"
            >
              <div className="w-2 h-2 rounded-full bg-net-blue shrink-0 mt-2 shadow-2xs" />
              <div className="flex-1 text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                {renderInlineFormatting(item)}
              </div>
            </div>
          ))}
        </div>
      );
      continue;
    }

    // 5. Numbered Lists (1. , 2. ) -> Transformed into Sequential Step Rows
    if (/^\d+\.\s+/.test(line.trim())) {
      const stepItems: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        stepItems.push(lines[i].trim().replace(/^\d+\.\s+/, ''));
        i++;
      }
      nodes.push(
        <div key={`steps-${keyIndex++}`} className="space-y-2.5 my-4">
          {stepItems.map((item, sIdx) => (
            <div
              key={sIdx}
              className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 flex items-start gap-3 shadow-2xs"
            >
              <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-net-blue font-black flex items-center justify-center text-xs shrink-0 mt-0.5 font-sans">
                {toPersianDigits(sIdx + 1)}
              </span>
              <div className="flex-1 text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                {renderInlineFormatting(item)}
              </div>
            </div>
          ))}
        </div>
      );
      continue;
    }

    // 6. Empty line
    if (!line.trim()) {
      i++;
      continue;
    }

    // 7. Normal Paragraph
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].trim().startsWith('```') &&
      !lines[i].startsWith('##') &&
      !lines[i].trim().startsWith('* ') &&
      !lines[i].trim().startsWith('- ') &&
      !/^\d+\.\s+/.test(lines[i].trim()) &&
      !(lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|'))
    ) {
      paraLines.push(lines[i]);
      i++;
    }

    if (paraLines.length > 0) {
      nodes.push(
        <p key={`p-${keyIndex++}`} className="text-slate-700 dark:text-slate-300 leading-loose text-sm md:text-[15px] my-3">
          {renderInlineFormatting(paraLines.join(' '))}
        </p>
      );
    }

    // 8. CRITICAL GUARANTEE: If i did not advance in this iteration, advance it by 1!
    if (i === prevI) {
      if (lines[i].trim()) {
        nodes.push(
          <p key={`p-fallback-${keyIndex++}`} className="text-slate-700 dark:text-slate-300 leading-loose text-sm md:text-[15px] my-2">
            {renderInlineFormatting(lines[i])}
          </p>
        );
      }
      i++;
    }
  }

  return nodes;
}

function renderInlineFormatting(text: string): React.ReactNode {
  const regex = /(`[^`]+`|\*\*[^*]+\*\*)/g;
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, idx) => {
        if (!part) return null;

        if (part.startsWith('`') && part.endsWith('`')) {
          const codeContent = part.slice(1, -1);
          return (
            <code
              key={idx}
              className="ltr-text text-xs font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-net-blue dark:text-net-cyan border border-slate-200 dark:border-slate-700 mx-1 align-baseline"
            >
              {codeContent}
            </code>
          );
        }

        if (part.startsWith('**') && part.endsWith('**')) {
          const boldContent = part.slice(2, -2);
          return (
            <strong key={idx} className="font-extrabold text-ink-primary dark:text-ink-light">
              {boldContent}
            </strong>
          );
        }

        return <span key={idx}>{part}</span>;
      })}
    </>
  );
}
