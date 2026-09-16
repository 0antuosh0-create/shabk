import React from 'react';

export interface CommandSuggestionsProps {
  onSelectCommand: (cmd: string) => void;
}

const COMMON_COMMANDS = [
  { cmd: 'ipconfig /all', descFa: 'مشاهده مشخصات کامل کارت شبکه' },
  { cmd: 'ifconfig', descFa: 'معادل لینوکسی دستور شبکه' },
  { cmd: 'ping 8.8.8.8', descFa: 'تست اتصال اینترنت (گوگل)' },
  { cmd: 'ping 192.168.1.1', descFa: 'تست ارتباط با گیت‌وی محلی' },
  { cmd: 'tracert 8.8.8.8', descFa: 'ردیابی روترهای مسیر' },
  { cmd: 'arp -a', descFa: 'مشاهده جدول کش مک‌آدرس‌ها' },
  { cmd: 'netstat -an', descFa: 'مشاهده پورت‌های لیسن و فعال' },
  { cmd: 'nslookup google.com', descFa: 'استعلام آدرس سرور DNS' },
  { cmd: 'ipconfig /flushdns', descFa: 'تخلیه حافظه کش DNS' },
  { cmd: 'help', descFa: 'راهنمای تمام دستورات' },
];

export const CommandSuggestions: React.FC<CommandSuggestionsProps> = ({ onSelectCommand }) => {
  return (
    <div className="flex flex-wrap items-center gap-1.5 p-2 bg-slate-900 border-t border-slate-800 text-xs text-left" dir="ltr">
      <span className="text-slate-400 text-[11px] font-sans font-medium mr-1" dir="rtl">پیشنهاد سریع:</span>
      {COMMON_COMMANDS.map((c) => (
        <button
          key={c.cmd}
          onClick={() => onSelectCommand(c.cmd)}
          title={c.descFa}
          className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-mono text-[11px] transition-colors border border-slate-700 cursor-pointer"
        >
          {c.cmd}
        </button>
      ))}
    </div>
  );
};
