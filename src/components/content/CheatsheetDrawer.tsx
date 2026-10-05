import React, { useState } from 'react';
import { X, Search, Bookmark, Terminal, Binary, Hash } from 'lucide-react';
import { CHEATSHEET_PORTS, CHEATSHEET_CIDR, CHEATSHEET_CLI } from '../../data/cheatsheet/cheatsheet-data';
import { Tabs } from '../ui/Tabs';
import { Badge } from '../ui/Badge';

export interface CheatsheetDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheatsheetDrawer: React.FC<CheatsheetDrawerProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'ports' | 'cidr' | 'cli'>('ports');
  const [search, setSearch] = useState<string>('');

  if (!isOpen) return null;

  const filteredPorts = CHEATSHEET_PORTS.filter(
    (p) =>
      p.service.toLowerCase().includes(search.toLowerCase()) ||
      String(p.port).includes(search) ||
      p.descriptionFa.includes(search)
  );

  const filteredCidr = CHEATSHEET_CIDR.filter(
    (c) =>
      c.prefix.includes(search) ||
      c.mask.includes(search) ||
      c.useCaseFa.includes(search)
  );

  const filteredCli = CHEATSHEET_CLI.filter(
    (cmd) =>
      cmd.command.toLowerCase().includes(search.toLowerCase()) ||
      cmd.descriptionFa.includes(search)
  );

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      dir="rtl"
    >
      <div
        className="w-full sm:max-w-xl bg-white dark:bg-canvas-card-dark h-full shadow-2xl flex flex-col border-l border-slate-200 dark:border-slate-800 animate-in slide-in-from-left duration-300 pb-safe"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-net-blue/10 text-net-blue">
              <Bookmark size={20} />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-ink-primary dark:text-ink-light">
                جعبه‌ابزار مهندس شبکه (Network+ Cheatsheet)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                مرجع سریع پورت‌ها، جدول محاسبات ساب‌نت و دستورات کلیدی
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900/40">
          <div className="relative">
            <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="جستجو در پورت‌ها، دستورات یا ساب‌نت‌ها..."
              className="w-full pr-9 pl-4 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-ink-primary dark:text-ink-light outline-none focus:border-net-blue"
            />
          </div>

          <div className="mt-3">
            <Tabs
              tabs={[
                { id: 'ports', label: 'پورت‌ها (Ports)', icon: <Hash size={14} /> },
                { id: 'cidr', label: 'جدول CIDR', icon: <Binary size={14} /> },
                { id: 'cli', label: 'دستورات CLI', icon: <Terminal size={14} /> },
              ]}
              activeTab={activeTab}
              onChange={(t) => setActiveTab(t as 'ports' | 'cidr' | 'cli')}
            />
          </div>
        </div>
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {activeTab === 'ports' && (
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredPorts.map((p) => (
                <div key={p.port} className="py-2.5 flex items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-ink-primary dark:text-ink-light">
                        {p.service}
                      </span>
                      <Badge variant={p.proto.includes('UDP') ? 'amber' : 'blue'} size="sm">
                        {p.proto}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {p.descriptionFa}
                    </p>
                  </div>
                  <span className="text-base font-mono font-black text-net-blue ltr-text shrink-0 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                    Port {p.port}
                  </span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'cidr' && (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-right">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold">
                  <tr>
                    <th className="p-2.5">پیشوند</th>
                    <th className="p-2.5">ساب‌نت ماسک</th>
                    <th className="p-2.5">هاست مجاز</th>
                    <th className="p-2.5">کاربرد</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredCidr.map((c) => (
                    <tr key={c.prefix} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 font-mono">
                      <td className="p-2.5 font-bold text-net-blue ltr-text">{c.prefix}</td>
                      <td className="p-2.5 ltr-text">{c.mask}</td>
                      <td className="p-2.5 text-emerald-600 font-bold">{c.usableHosts}</td>
                      <td className="p-2.5 font-sans text-[11px] text-slate-600 dark:text-slate-400">{c.useCaseFa}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'cli' && (
            <div className="space-y-3">
              {filteredCli.map((cmd) => (
                <div key={cmd.command} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <code className="text-xs font-bold font-mono text-net-blue ltr-text bg-white dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                      {cmd.syntax}
                    </code>
                    <Badge variant="slate" size="sm">{cmd.platform}</Badge>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                    {cmd.descriptionFa}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
