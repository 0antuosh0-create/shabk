import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { calculateSubnet, isValidIpv4 } from '../../lib/network/ipv4';
import { soundFx } from '../../lib/utils/audio';
import { Network, CheckCircle2, Copy, Check, Layers, Sliders } from 'lucide-react';
import { toPersianDigits } from '../../lib/utils/bidi';

const BIT_WEIGHTS = [128, 64, 32, 16, 8, 4, 2, 1];

export const SubnetCalculator: React.FC = () => {
  const [ipInput, setIpInput] = useState<string>('192.168.10.45');
  const [cidr, setCidr] = useState<number>(26);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const isValid = isValidIpv4(ipInput);
  const calc = isValid ? calculateSubnet(ipInput, cidr) : null;

  const handleCopy = (field: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    soundFx.playPop();
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleCidrChange = (newCidr: number) => {
    setCidr(newCidr);
    soundFx.playPop();
  };

  // Convert binary string to array of 4 octets (each containing 8 bits)
  const binaryOctets = calc ? calc.binaryIp.split('.').map((oct) => oct.split('')) : [];
  const ipOctets = calc ? calc.inputIp.split('.') : ['0', '0', '0', '0'];
  const maskOctets = calc ? calc.subnetMask.split('.') : ['0', '0', '0', '0'];

  const interestingOctetIndex = Math.min(3, Math.floor((cidr - 1) / 8));
  const interestingMaskOctet = calc ? parseInt(maskOctets[interestingOctetIndex], 10) : 255;
  const blockSize = 256 - interestingMaskOctet;

  return (
    <Card className="my-6 border-slate-300 dark:border-slate-800 shadow-card bg-slate-50/50 dark:bg-canvas-card-dark">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Network className="text-net-blue" size={20} />
            <h4 className="font-extrabold text-base text-ink-primary dark:text-ink-light">
              سندباکس تعاملی و ماتریس باینری ساب‌نتینگ IPv4
            </h4>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            مشاهده زنده تفکیک چهار اکتت، اوزان باینری (۱۲۸ تا ۱)، و مرز دقیق ساب‌نت
          </p>
        </div>

        {calc && (
          <div className="flex items-center gap-2">
            <Badge variant={calc.isPrivate ? 'amber' : 'blue'} size="sm">
              {calc.isPrivate ? 'آدرس خصوصی (RFC 1918)' : 'آدرس عمومی (Public IP)'}
            </Badge>
            <Badge variant="purple" size="sm">کلاس {calc.ipClass}</Badge>
          </div>
        )}
      </div>

      {/* Input Controls Grid */}
      <div className="my-6 grid grid-cols-1 md:grid-cols-12 gap-6 p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="md:col-span-5 space-y-2">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
            آدرس IPv4 مورد نظر:
          </label>
          <input
            type="text"
            value={ipInput}
            onChange={(e) => setIpInput(e.target.value)}
            className={`w-full p-3 rounded-xl border text-sm font-mono ltr-text text-left outline-none transition-all ${
              isValid
                ? 'bg-slate-50 dark:bg-slate-800/80 border-slate-300 dark:border-slate-700 text-ink-primary dark:text-ink-light focus:border-net-blue focus:ring-2 focus:ring-sky-100 dark:focus:ring-sky-950'
                : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 text-rose-800'
            }`}
            placeholder="192.168.1.1"
          />
          {!isValid && (
            <span className="text-[11px] text-rose-500 font-medium block">
              فرمت آدرس نامعتبر است (چهار عدد بین ۰ تا ۲۵۵ مانند 192.168.1.1).
            </span>
          )}

          {/* Quick IP Presets */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="text-[10px] text-slate-400 font-bold ml-1">پیشنهاد:</span>
            {['192.168.1.10', '10.0.0.1', '172.16.50.1', '8.8.8.8'].map((preset) => (
              <button
                key={preset}
                onClick={() => { setIpInput(preset); soundFx.playPop(); }}
                className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-[10px] font-mono text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        <div className="md:col-span-7 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Sliders size={14} className="text-net-blue" />
              <span>پیشوند طول ماسک (CIDR):</span>
              <span className="font-mono text-net-blue font-extrabold text-sm ltr-text px-2 py-0.5 rounded-lg bg-net-blue/10">
                /{cidr}
              </span>
            </label>
            <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-300 ltr-text">
              {calc?.subnetMask || '...'}
            </span>
          </div>

          <input
            type="range"
            min={8}
            max={30}
            value={cidr}
            onChange={(e) => handleCidrChange(Number(e.target.value))}
            className="w-full accent-net-blue cursor-pointer h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg transition-all"
          />

          <div className="flex justify-between text-[10px] font-mono text-slate-400 font-semibold" dir="ltr">
            <span>/8 (Class A)</span>
            <span>/16 (Class B)</span>
            <span>/24 (Class C)</span>
            <span>/26</span>
            <span>/28</span>
            <span>/30 (P2P)</span>
          </div>
        </div>
      </div>

      {calc && (
        <div className="space-y-6">
          {/* Output Metric Cards with One-Click Copy */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs relative group">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] text-slate-500 font-bold">Network ID:</span>
                <button
                  onClick={() => handleCopy('net', calc.networkAddress)}
                  className="text-slate-400 hover:text-net-blue p-1 rounded transition-colors cursor-pointer"
                  title="کپی آدرس شبکه"
                >
                  {copiedField === 'net' ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
                </button>
              </div>
              <span className="text-sm md:text-base font-black font-mono text-net-blue ltr-text block truncate">
                {calc.networkAddress}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs relative group">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] text-slate-500 font-bold">Broadcast:</span>
                <button
                  onClick={() => handleCopy('bcast', calc.broadcastAddress)}
                  className="text-slate-400 hover:text-purple-500 p-1 rounded transition-colors cursor-pointer"
                  title="کپی آدرس برودکست"
                >
                  {copiedField === 'bcast' ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
                </button>
              </div>
              <span className="text-sm md:text-base font-black font-mono text-purple-600 dark:text-purple-400 ltr-text block truncate">
                {calc.broadcastAddress}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-[11px] text-slate-500 font-bold block mb-1">هاست مجاز:</span>
              <span className="text-sm md:text-base font-black font-sans text-emerald-600 dark:text-emerald-400 block truncate">
                {toPersianDigits(calc.usableHosts)} میزبان
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs relative group">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] text-slate-500 font-bold">Subnet Mask:</span>
                <button
                  onClick={() => handleCopy('mask', calc.subnetMask)}
                  className="text-slate-400 hover:text-ink-primary p-1 rounded transition-colors cursor-pointer"
                  title="کپی ماسک"
                >
                  {copiedField === 'mask' ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
                </button>
              </div>
              <span className="text-sm md:text-base font-black font-mono text-ink-primary dark:text-ink-light ltr-text block truncate">
                {calc.subnetMask}
              </span>
            </div>
          </div>

          {/* Usable Host Range Banner */}
          <div className="p-4 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={20} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div>
                <span className="text-xs md:text-sm font-extrabold text-emerald-950 dark:text-emerald-200 block">
                  محدوده آدرس‌های معتبر کارت شبکه (Usable Range):
                </span>
                <span className="text-[11px] text-emerald-800 dark:text-emerald-400">
                  آدرس‌های بین Network ID و Broadcast
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-mono text-xs md:text-sm font-black text-emerald-700 dark:text-emerald-300 ltr-text bg-white dark:bg-slate-900 px-3 py-1 rounded-xl border border-emerald-200 dark:border-emerald-800 shadow-2xs">
                {calc.firstUsableIp} — {calc.lastUsableIp}
              </span>
              <button
                onClick={() => handleCopy('range', `${calc.firstUsableIp} - ${calc.lastUsableIp}`)}
                className="p-1.5 rounded-lg text-emerald-700 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors cursor-pointer"
                title="کپی محدوده مجاز"
              >
                {copiedField === 'range' ? <Check size={15} className="text-emerald-600" /> : <Copy size={15} />}
              </button>
            </div>
          </div>

          {/* Upgraded 4-Octet Binary Matrix Showcase */}
          <div className="p-3 sm:p-5 md:p-6 bg-[#080e1a] text-slate-100 rounded-2xl sm:rounded-3xl border border-slate-800/90 shadow-elevated space-y-4 sm:space-y-5" dir="rtl">
            {/* Top Matrix Title & Legend */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 border-b border-slate-800/80 pb-3 sm:pb-4">
              <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-slate-100">
                <Layers size={16} className="text-net-blue shrink-0" />
                <span>تفکیک باینری چهار اکتت آدرس IPv4 و مرز زیرشبکه:</span>
              </div>

              <div className="flex items-center gap-3 text-xs" dir="ltr">
                <span className="flex items-center gap-1.5 text-sky-400 font-sans">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-400 shadow-xs shadow-sky-400" />
                  <span className="text-[11px]">بیت‌های شبکه ({toPersianDigits(cidr)} بیت)</span>
                </span>
                <span className="flex items-center gap-1.5 text-emerald-400 font-sans">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-xs shadow-emerald-400" />
                  <span className="text-[11px]">بیت‌های هاست ({toPersianDigits(32 - cidr)} بیت)</span>
                </span>
              </div>
            </div>

            {/* 4 Distinct Octet Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4" dir="ltr">
              {binaryOctets.map((octetBits, octetIdx) => {
                const octetStartBit = octetIdx * 8;
                const octetEndBit = octetStartBit + 8;
                const isAllNetwork = cidr >= octetEndBit;
                const isAllHost = cidr <= octetStartBit;
                const isSubnetBoundaryOctet = !isAllNetwork && !isAllHost;

                return (
                  <div
                    key={octetIdx}
                    className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border transition-all ${
                      isSubnetBoundaryOctet
                        ? 'bg-slate-900/90 border-amber-400/60 ring-2 ring-amber-400/20 shadow-md'
                        : isAllNetwork
                        ? 'bg-slate-900/60 border-sky-500/40'
                        : 'bg-slate-900/60 border-emerald-500/40'
                    }`}
                  >
                    {/* Octet Header */}
                    <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-slate-800/80">
                      <div>
                        <span className="text-[10px] text-slate-400 font-sans font-bold block">
                          اکتت شماره {toPersianDigits(octetIdx + 1)}
                        </span>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-base font-black font-mono text-white">
                            {ipOctets[octetIdx]}
                          </span>
                          <span className="text-[10px] font-mono text-slate-500">
                            (ماسک: {maskOctets[octetIdx]})
                          </span>
                        </div>
                      </div>

                      <span className={`text-[10px] font-sans font-bold px-2 py-0.5 rounded-md ${
                        isSubnetBoundaryOctet
                          ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                          : isAllNetwork
                          ? 'bg-sky-400/15 text-sky-300'
                          : 'bg-emerald-400/15 text-emerald-300'
                      }`}>
                        {isSubnetBoundaryOctet ? 'مرز ساب‌نت' : isAllNetwork ? 'Net ID' : 'Host ID'}
                      </span>
                    </div>

                    {/* 8 Bits in Octet with Place Values */}
                    <div className="grid grid-cols-8 gap-0.5 sm:gap-1">
                      {octetBits.map((bit, bitInOctetIdx) => {
                        const globalBitIdx = octetStartBit + bitInOctetIdx;
                        const isNetBit = globalBitIdx < cidr;
                        const isLaserBoundary = globalBitIdx === cidr - 1;
                        const weight = BIT_WEIGHTS[bitInOctetIdx];

                        return (
                          <div
                            key={bitInOctetIdx}
                            className={`relative flex flex-col items-center justify-between py-1 sm:py-1.5 px-0.5 rounded-md sm:rounded-lg border text-center transition-all ${
                              isNetBit
                                ? 'bg-sky-500/15 border-sky-500/50 text-sky-300'
                                : 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300'
                            }`}
                          >
                            <span className="text-[7px] sm:text-[8px] font-mono text-slate-400 select-none">
                              {weight}
                            </span>
                            <span className="text-[11px] sm:text-xs font-mono font-black my-0.5">
                              {bit}
                            </span>

                            {/* Animated glowing laser boundary marker */}
                            {isLaserBoundary && (
                              <div
                                className="absolute -right-0.5 sm:-right-1 inset-y-0 w-0.5 bg-amber-400 shadow-md shadow-amber-400 z-10 animate-pulse"
                                title={`مرز ساب‌نت /${cidr}`}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 3-Card Formula & Metrics Deck */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center space-y-0.5">
                <span className="text-[11px] text-slate-400 font-sans block">تعداد کل آدرس‌های ساب‌نت:</span>
                <div className="text-sm font-mono font-bold text-white ltr-text" dir="ltr">
                  2^({32 - cidr}) = {calc.totalHosts.toLocaleString()} IPs
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center space-y-0.5">
                <span className="text-[11px] text-slate-400 font-sans block">ارزش گام پرش (Block Size):</span>
                <div className="text-sm font-mono font-bold text-amber-400 ltr-text" dir="ltr">
                  256 - {interestingMaskOctet} = {blockSize}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center space-y-0.5">
                <span className="text-[11px] text-slate-400 font-sans block">هاست‌های معتبر ($2^h - 2$):</span>
                <div className="text-sm font-mono font-bold text-emerald-400 ltr-text" dir="ltr">
                  {calc.usableHosts.toLocaleString()} Usable
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};
