import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { SwitchSimulator, SwitchDispatchResult } from '../../lib/network/cam-table';
import { HardDrive, Laptop, Send, RotateCcw, ArrowLeftRight, CheckCircle2, AlertTriangle, ShieldAlert, ShieldCheck, Skull } from 'lucide-react';
import { soundFx } from '../../lib/utils/audio';

interface SwitchNode {
  port: number;
  name: string;
  mac: string;
  ip: string;
}

const CONNECTED_DEVICES: SwitchNode[] = [
  { port: 1, name: 'PC-1', mac: '00:1A:2B:00:00:01', ip: '192.168.1.10' },
  { port: 2, name: 'PC-2', mac: '00:1A:2B:00:00:02', ip: '192.168.1.20' },
  { port: 3, name: 'PC-3', mac: '00:1A:2B:00:00:03', ip: '192.168.1.30' },
  { port: 4, name: 'Server', mac: '00:1A:2B:00:00:FE', ip: '192.168.1.100' },
];

export const CamTableSandbox: React.FC = () => {
  const [simulator] = useState(() => new SwitchSimulator(4));
  const [srcPort, setSrcPort] = useState<number>(1);
  const [dstPort, setDstPort] = useState<number>(2);
  const [lastResult, setLastResult] = useState<SwitchDispatchResult | null>(null);
  const [entries, setEntries] = useState(simulator.getTableEntries());
  const [isFloodMode, setIsFloodMode] = useState<boolean>(false);
  const [portSecurityEnabled, setPortSecurityEnabled] = useState<boolean>(false);

  const handleSendFrame = () => {
    soundFx.playPop();

    if (portSecurityEnabled && srcPort === 3 && isFloodMode) {
      setLastResult({
        action: 'forward',
        egressPorts: [],
        learnedSrcMac: 'BLOCKED (Port Security Violation)',
        ingressPort: 3,
        explanationFa: 'قابلیت Port Security پورت شماره ۳ را به دلیل ارسال مک‌آدرس‌های جعلی در حالت Error-Disabled خاموش کرد!',
      });
      return;
    }

    const srcDevice = CONNECTED_DEVICES.find((d) => d.port === srcPort);
    const dstDevice = dstPort === 0 
      ? { mac: 'FF:FF:FF:FF:FF:FF' } 
      : CONNECTED_DEVICES.find((d) => d.port === dstPort);

    if (!srcDevice || !dstDevice) return;

    const res = simulator.processFrame({
      srcMac: srcDevice.mac,
      dstMac: dstDevice.mac,
      ingressPort: srcPort,
    });

    setLastResult(res);
    setEntries(simulator.getTableEntries());
  };

  const handleSimulateMacFlood = () => {
    soundFx.playPop();
    setIsFloodMode(true);
    setPortSecurityEnabled(false);

    // Rapidly inject 6 fake MACs
    const fakeMacs = [
      'DE:AD:BE:EF:01:01',
      'DE:AD:BE:EF:02:02',
      'DE:AD:BE:EF:03:03',
      'DE:AD:BE:EF:04:04',
      'DE:AD:BE:EF:05:05',
      'DE:AD:BE:EF:06:06',
    ];

    fakeMacs.forEach((mac) => {
      simulator.processFrame({
        srcMac: mac,
        dstMac: 'FF:FF:FF:FF:FF:FF',
        ingressPort: 3, // Attacker on port 3
      });
    });

    setEntries(simulator.getTableEntries());
    setLastResult({
      action: 'flood',
      egressPorts: [1, 2, 4],
      learnedSrcMac: 'ATTACKER_SPOOFED_MACS',
      ingressPort: 3,
      explanationFa: 'هشدار سرریز جدول CAM! مهاجم با ارسال مک‌های فیک ظرفیت حافظه را پر کرد. سوئیچ به حالت Fail-Open (هاب) سقوط کرد و همه بسته‌ها شنود می‌شوند!',
    });
  };

  const handleEnablePortSecurity = () => {
    soundFx.playSuccess();
    setPortSecurityEnabled(true);
    setIsFloodMode(false);
    simulator.clearTable();
    setEntries([]);
    setLastResult({
      action: 'forward',
      egressPorts: [],
      learnedSrcMac: 'SECURED',
      ingressPort: 1,
      explanationFa: 'قابلیت Port Security فعال شد. هر پورت به حداکثر ۱ مک‌آدرس محدود شد و پورت مهاجم مسدود گردید.',
    });
  };

  const handleReset = () => {
    soundFx.playPop();
    simulator.clearTable();
    setEntries([]);
    setLastResult(null);
    setIsFloodMode(false);
    setPortSecurityEnabled(false);
  };

  return (
    <Card className="my-6 border-slate-300 dark:border-slate-800 shadow-card bg-slate-50/50 dark:bg-canvas-card-dark">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <HardDrive className="text-net-blue" size={20} />
            <h4 className="font-extrabold text-base text-ink-primary dark:text-ink-light">
              سندباکس شبیه‌ساز یادگیری جدول مک سوئیچ (CAM Table & Port Security)
            </h4>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            مشاهده زنده ثبت مک‌آدرس مبدأ، هدایت هوشمند فریم‌ها و شبیه‌سازی دفاع در برابر حمله MAC Flooding
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={handleReset} icon={<RotateCcw size={14} />}>
            پاک‌سازی جدول
          </Button>
          <Button
            variant={portSecurityEnabled ? 'success' : 'outline'}
            size="sm"
            onClick={handleEnablePortSecurity}
            icon={portSecurityEnabled ? <ShieldCheck size={14} /> : <ShieldAlert size={14} />}
          >
            {portSecurityEnabled ? 'Port Security فعال است' : 'فعال‌سازی Port Security'}
          </Button>
        </div>
      </div>

      {/* Interactive Switch Hardware View */}
      <div className="my-6 p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-center mb-6">
          <div className={`px-6 py-3.5 rounded-2xl border-2 flex items-center gap-3 transition-all ${
            isFloodMode
              ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-800 dark:text-rose-200 ring-4 ring-rose-200 dark:ring-rose-950'
              : portSecurityEnabled
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-800 dark:text-emerald-200 ring-4 ring-emerald-100 dark:ring-emerald-950'
              : 'bg-slate-50 dark:bg-slate-800 border-net-blue/50 text-ink-primary dark:text-ink-light shadow-md'
          }`}>
            <HardDrive size={30} className={isFloodMode ? 'text-rose-500 animate-bounce' : portSecurityEnabled ? 'text-emerald-500' : 'text-net-blue'} />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold block">
                  سوئیچ لایه ۲ (4-Port Switch)
                </span>
                <Badge variant={isFloodMode ? 'rose' : portSecurityEnabled ? 'green' : 'blue'} size="sm">
                  {isFloodMode ? 'FAIL-OPEN / HUB MODE' : portSecurityEnabled ? 'SECURED' : 'NORMAL'}
                </Badge>
              </div>
              <span className="text-[11px] text-slate-500 font-mono">
                {entries.length} مک‌آدرس ثبت شده در حافظه CAM
              </span>
            </div>
          </div>
        </div>

        {/* 4 Connected Devices */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 max-w-2xl mx-auto">
          {CONNECTED_DEVICES.map((dev) => {
            const isSrc = srcPort === dev.port;
            const isDst = dstPort === dev.port;
            const isEgress = lastResult?.egressPorts.includes(dev.port);
            const isBlocked = portSecurityEnabled && dev.port === 3 && isFloodMode;

            return (
              <div
                key={dev.port}
                className={`p-3.5 rounded-2xl border text-center transition-all ${
                  isBlocked
                    ? 'border-rose-500 bg-rose-50/70 dark:bg-rose-950/30 opacity-60'
                    : isEgress
                    ? 'ring-2 ring-amber-400 bg-amber-50 dark:bg-amber-950/30 border-amber-300 scale-105'
                    : isSrc
                    ? 'ring-2 ring-net-blue bg-sky-50 dark:bg-sky-950/30 border-sky-300 scale-105'
                    : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700'
                }`}
              >
                <div className="flex justify-center mb-2">
                  <div className="p-2 rounded-xl bg-white dark:bg-slate-700 shadow-2xs">
                    <Laptop size={22} className="text-slate-700 dark:text-slate-300" />
                  </div>
                </div>
                <div className="font-extrabold text-xs text-ink-primary dark:text-ink-light">{dev.name}</div>
                <div className="text-[10px] font-mono text-net-blue font-black mt-0.5">Port {dev.port}</div>
                <div className="text-[9px] font-mono text-slate-400 ltr-text truncate">{dev.mac}</div>
                
                <div className="mt-2 flex items-center justify-center gap-1">
                  {isSrc && <Badge variant="blue" size="sm">فرستنده</Badge>}
                  {isDst && <Badge variant="green" size="sm">مقصد</Badge>}
                  {isEgress && !isDst && <Badge variant="amber" size="sm">طغیان</Badge>}
                  {isBlocked && <Badge variant="rose" size="sm">مسدود</Badge>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Frame Dispatch Controls & Hacker Mode */}
      <div className="p-3.5 sm:p-4 bg-white dark:bg-slate-900 rounded-2xl mb-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
          <div className="flex items-center justify-between sm:justify-start gap-2">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 shrink-0">فرستنده:</span>
            <select
              value={srcPort}
              onChange={(e) => setSrcPort(Number(e.target.value))}
              className="flex-1 sm:flex-none text-xs p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold"
            >
              {CONNECTED_DEVICES.map((d) => (
                <option key={d.port} value={d.port}>{d.name} (Port {d.port})</option>
              ))}
            </select>
          </div>

          <div className="hidden sm:flex justify-center">
            <ArrowLeftRight size={16} className="text-slate-400" />
          </div>

          <div className="flex items-center justify-between sm:justify-start gap-2">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 shrink-0">مقصد:</span>
            <select
              value={dstPort}
              onChange={(e) => setDstPort(Number(e.target.value))}
              className="flex-1 sm:flex-none text-xs p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold max-w-full"
            >
              <option value={0}>برودکست همگانی (FF:FF:FF:FF:FF:FF)</option>
              {CONNECTED_DEVICES.filter((d) => d.port !== srcPort).map((d) => (
                <option key={d.port} value={d.port}>{d.name} (Port {d.port})</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1 sm:pt-0">
          <button
            onClick={handleSimulateMacFlood}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800 text-xs font-bold transition-all cursor-pointer select-none touch-manipulation active:scale-95"
            title="شبیه‌سازی ارسال هزاران مک جعلی برای اشباع حافظه سوئیچ"
          >
            <Skull size={15} />
            <span>حمله MAC Flood</span>
          </button>

          <Button variant="primary" size="sm" onClick={handleSendFrame} icon={<Send size={14} />} className="flex-1 sm:flex-none justify-center">
            ارسال فریم
          </Button>
        </div>
      </div>

      {/* Live Result Feedback */}
      {lastResult && (
        <div className={`p-4 rounded-2xl mb-6 flex items-start gap-3 border ${
          lastResult.action === 'forward' && !lastResult.explanationFa.includes('خاموش')
            ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 text-emerald-900 dark:text-emerald-200'
            : 'bg-amber-50 dark:bg-amber-950/30 border-amber-300 text-amber-900 dark:text-amber-200'
        }`}>
          {lastResult.action === 'forward' && !lastResult.explanationFa.includes('خاموش') ? (
            <CheckCircle2 size={20} className="shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
          ) : (
            <AlertTriangle size={20} className="shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
          )}
          <div className="text-xs leading-relaxed">
            <span className="font-bold block mb-0.5">
              {lastResult.action === 'forward' ? 'ارسال تک‌پخشی هوشمند (Unicast Forwarding)' : 'طغیان عمومی فریم (Flooding)'}
            </span>
            {lastResult.explanationFa}
          </div>
        </div>
      )}

      {/* Current CAM Table View */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h5 className="font-extrabold text-sm text-ink-primary dark:text-ink-light">
            جدول حافظه دسترسی محتوا سوئیچ (CAM Table)
          </h5>
          <span className="text-[11px] text-slate-400">Aging Timer: 300s</span>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs">
          <table className="w-full text-xs text-right">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">
              <tr>
                <th className="p-3">شماره پورت (Port)</th>
                <th className="p-3">مک‌آدرس ثبت شده (MAC Address)</th>
                <th className="p-3">نوع نگاشت</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900/60">
              {entries.length === 0 ? (
                <tr>
                  <td colSpan={3} className="p-5 text-center text-slate-400">
                    جدول CAM سوئیچ در حال حاضر خالی است. با ارسال اولین فریم، سوئیچ مک‌آدرس فرستنده را به همراه پورت ثبت خواهد کرد.
                  </td>
                </tr>
              ) : (
                entries.map((ent, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-3 font-bold font-mono text-net-blue">Port {ent.port}</td>
                    <td className="p-3 font-mono text-slate-700 dark:text-slate-300 ltr-text">{ent.macAddress}</td>
                    <td className="p-3">
                      <Badge variant="green" size="sm">Dynamic (Learned)</Badge>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
};
