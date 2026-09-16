import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import {
  exportProgressToJson,
  exportProgressToBackupCode,
  importProgressFromJson,
  importProgressFromBackupCode,
} from '../../lib/storage/progress-store';
import { Download, Upload, Copy, Check, AlertCircle, CheckCircle2 } from 'lucide-react';

export interface BackupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRestored: () => void;
}

export const BackupModal: React.FC<BackupModalProps> = ({
  isOpen,
  onClose,
  onRestored,
}) => {
  const [activeTab, setActiveTab] = useState<'export' | 'import'>('export');
  const [copied, setCopied] = useState<boolean>(false);
  const [importInput, setImportInput] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const backupCode = isOpen ? exportProgressToBackupCode() : '';

  const handleDownloadJson = () => {
    const jsonStr = exportProgressToJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `shabk-progress-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(backupCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleImportSubmit = () => {
    if (!importInput.trim()) return;

    let res;
    if (importInput.trim().startsWith('{')) {
      res = importProgressFromJson(importInput);
    } else {
      res = importProgressFromBackupCode(importInput);
    }

    if (res.success) {
      setStatusMessage({ type: 'success', text: 'کارنامه و سوابق شما با موفقیت بازیابی شد!' });
      setTimeout(() => {
        onRestored();
        onClose();
      }, 1000);
    } else {
      setStatusMessage({ type: 'error', text: res.error || 'خطا در بازیابی سوابق.' });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const res = importProgressFromJson(content);
      if (res.success) {
        setStatusMessage({ type: 'success', text: 'فایل پشتیبان با موفقیت بارگذاری شد!' });
        setTimeout(() => {
          onRestored();
          onClose();
        }, 1000);
      } else {
        setStatusMessage({ type: 'error', text: res.error || 'فایل نامعتبر است.' });
      }
    };
    reader.readAsText(file);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="مدیریت و پشتیبان‌گیری سوابق یادگیری">
      <div className="space-y-4">
        {/* Toggle export / import */}
        <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1">
          <button
            onClick={() => { setActiveTab('export'); setStatusMessage(null); }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'export'
                ? 'bg-white dark:bg-slate-900 text-net-blue shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            خروجی گرفتن (پشتیبان)
          </button>
          <button
            onClick={() => { setActiveTab('import'); setStatusMessage(null); }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'import'
                ? 'bg-white dark:bg-slate-900 text-net-blue shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            بازیابی کارنامه (انتقال)
          </button>
        </div>

        {statusMessage && (
          <div className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
            statusMessage.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200'
              : 'bg-rose-50 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-200'
          }`}>
            {statusMessage.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            <span>{statusMessage.text}</span>
          </div>
        )}

        {activeTab === 'export' ? (
          <div className="space-y-4 text-right">
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              شما می‌توانید وضعیت پیشرفت، درس‌های تکمیل‌شده و نمرات آزمون خود را دانلود کرده یا با کپی کد اختصاصی، آن را به گوشی یا مرورگر دیگر منتقل کنید:
            </p>

            <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-[11px] font-bold text-slate-500 block mb-1">کد پشتیبان سریع:</span>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={backupCode}
                  className="flex-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 p-2 text-xs font-mono rounded-lg ltr-text truncate text-slate-700 dark:text-slate-300 select-all"
                />
                <Button variant="secondary" size="sm" onClick={handleCopyCode} icon={copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}>
                  {copied ? 'کپی شد' : 'کپی'}
                </Button>
              </div>
            </div>

            <div className="pt-2 flex justify-center">
              <Button variant="primary" size="md" onClick={handleDownloadJson} icon={<Download size={16} />}>
                دانلود فایل کارنامه (JSON)
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 text-right">
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              کد پشتیبان یا محتوای فایل JSON را در کادر زیر وارد کنید، یا فایل ذخیره شده را مستقیماً آپلود نمایید:
            </p>

            <textarea
              value={importInput}
              onChange={(e) => setImportInput(e.target.value)}
              placeholder="کد پشتیبان یا رشته JSON را اینجا الصاق (Paste) کنید..."
              className="w-full h-24 p-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-mono ltr-text text-slate-800 dark:text-slate-200 outline-none focus:border-net-blue"
            />

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <label className="text-xs text-slate-500 hover:text-net-blue cursor-pointer flex items-center gap-1.5">
                <Upload size={14} />
                <span>بارگذاری فایل JSON از کامپیوتر</span>
                <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
              </label>

              <Button variant="primary" size="md" onClick={handleImportSubmit}>
                تأیید و بازیابی سوابق
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
