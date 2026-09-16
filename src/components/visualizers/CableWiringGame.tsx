import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { CheckCircle2, AlertCircle, RotateCcw, Activity, Sparkles, Zap } from 'lucide-react';
import { soundFx } from '../../lib/utils/audio';
import confetti from 'canvas-confetti';

interface WireColor {
  id: string;
  nameFa: string;
  nameEn: string;
  colorClass: string;
}

const ALL_WIRES: WireColor[] = [
  { id: 'wo', nameFa: 'سفید نارنجی', nameEn: 'White-Orange', colorClass: 'bg-orange-100 border-orange-400 text-orange-800' },
  { id: 'o', nameFa: 'نارنجی', nameEn: 'Orange', colorClass: 'bg-orange-500 text-white border-orange-600' },
  { id: 'wg', nameFa: 'سفید سبز', nameEn: 'White-Green', colorClass: 'bg-emerald-100 border-emerald-400 text-emerald-800' },
  { id: 'b', nameFa: 'آبی', nameEn: 'Blue', colorClass: 'bg-blue-600 text-white border-blue-700' },
  { id: 'wb', nameFa: 'سفید آبی', nameEn: 'White-Blue', colorClass: 'bg-sky-100 border-sky-400 text-sky-800' },
  { id: 'g', nameFa: 'سبز', nameEn: 'Green', colorClass: 'bg-emerald-600 text-white border-emerald-700' },
  { id: 'wbr', nameFa: 'سفید قهوه‌ای', nameEn: 'White-Brown', colorClass: 'bg-amber-100 border-amber-600 text-amber-900' },
  { id: 'br', nameFa: 'قهوه‌ای', nameEn: 'Brown', colorClass: 'bg-amber-800 text-white border-amber-900' },
];

const WIRE_MAP: Record<string, WireColor> = {
  wo: ALL_WIRES[0],
  o: ALL_WIRES[1],
  wg: ALL_WIRES[2],
  b: ALL_WIRES[3],
  wb: ALL_WIRES[4],
  g: ALL_WIRES[5],
  wbr: ALL_WIRES[6],
  br: ALL_WIRES[7],
};

const T568B_ORDER = ['wo', 'o', 'wg', 'b', 'wb', 'g', 'wbr', 'br'];
const T568A_ORDER = ['wg', 'g', 'wo', 'b', 'wb', 'o', 'wbr', 'br'];

export const CableWiringGame: React.FC = () => {
  const [targetStandard, setTargetStandard] = useState<'T568B' | 'T568A'>('T568B');
  const [userOrder, setUserOrder] = useState<string[]>([
    'o', 'wo', 'b', 'wg', 'g', 'wb', 'br', 'wbr'
  ]);
  const [selectedPinIndex, setSelectedPinIndex] = useState<number | null>(null);
  const [activePinSweep, setActivePinSweep] = useState<number>(-1);
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [checkResult, setCheckResult] = useState<{ isCorrect: boolean; message: string; wrongPin?: number } | null>(null);

  const handlePinClick = (index: number) => {
    if (isTesting) return;
    soundFx.playPop();

    if (selectedPinIndex === null) {
      setSelectedPinIndex(index);
    } else {
      const updated = [...userOrder];
      const temp = updated[selectedPinIndex];
      updated[selectedPinIndex] = updated[index];
      updated[index] = temp;
      setUserOrder(updated);
      setSelectedPinIndex(null);
      setCheckResult(null);
    }
  };

  const handleRunFlukeTest = () => {
    if (isTesting) return;
    setIsTesting(true);
    setCheckResult(null);
    setActivePinSweep(0);

    const expected = targetStandard === 'T568B' ? T568B_ORDER : T568A_ORDER;

    // Run sequential LED pin sweep across 8 pins
    let current = 0;
    const interval = setInterval(() => {
      current++;
      soundFx.playPop();
      setActivePinSweep(current);

      if (current >= 8) {
        clearInterval(interval);
        setIsTesting(false);
        setActivePinSweep(-1);

        const firstWrongIdx = userOrder.findIndex((id, idx) => id !== expected[idx]);
        const isCorrect = firstWrongIdx === -1;

        if (isCorrect) {
          soundFx.playSuccess();
          confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
          setCheckResult({
            isCorrect: true,
            message: `تست فلوک با موفقیت PASS شد! استاندارد ${targetStandard} بدون نویز و با رسانایی ۱۰۰٪ تأیید گردید.`,
          });
        } else {
          setCheckResult({
            isCorrect: false,
            message: `خطای تست فلوک (FAIL): در پین شماره ${firstWrongIdx + 1} عدم تطابق رنگ وجود دارد. به زوج‌های ۱-۲ و ۳-۶ دقت کنید.`,
            wrongPin: firstWrongIdx + 1,
          });
        }
      }
    }, 180);
  };

  const handleAutoSolve = () => {
    soundFx.playSuccess();
    setUserOrder(targetStandard === 'T568B' ? [...T568B_ORDER] : [...T568A_ORDER]);
    setSelectedPinIndex(null);
    setCheckResult({
      isCorrect: true,
      message: `استاندارد ${targetStandard} به صورت خودکار مرتب شد. موقعیت هر ۸ پین را به خاطر بسپارید!`,
    });
  };

  const handleReset = () => {
    soundFx.playPop();
    setUserOrder(['o', 'wo', 'b', 'wg', 'g', 'wb', 'br', 'wbr']);
    setSelectedPinIndex(null);
    setCheckResult(null);
    setActivePinSweep(-1);
  };

  return (
    <Card className="my-6 border-slate-300 dark:border-slate-800 shadow-card bg-slate-50/50 dark:bg-canvas-card-dark">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Zap className="text-amber-500" size={20} />
            <h4 className="font-extrabold text-base text-ink-primary dark:text-ink-light">
              کارگاه تعاملی سوکت‌زنی RJ45 و تستر کابل فلوک (Fluke Cable Tester)
            </h4>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            با کلیک روی هر دو پین، جای سیم‌ها را جابجا کنید و با تستر دیجیتال فلوک سلامت پین‌ها را بیازمایید
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => { setTargetStandard('T568B'); setCheckResult(null); soundFx.playPop(); }}
            className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
              targetStandard === 'T568B'
                ? 'bg-net-blue text-white border-net-blue shadow-xs scale-[1.02]'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
            }`}
          >
            استاندارد T568B (رایج)
          </button>
          <button
            onClick={() => { setTargetStandard('T568A'); setCheckResult(null); soundFx.playPop(); }}
            className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
              targetStandard === 'T568A'
                ? 'bg-net-blue text-white border-net-blue shadow-xs scale-[1.02]'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
            }`}
          >
            استاندارد T568A
          </button>
        </div>
      </div>

      {/* Fluke 8-Pin LED Tester Bar */}
      <div className="my-5 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-inner flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono" dir="ltr">
        <div className="flex items-center gap-2 text-slate-300 font-bold">
          <Activity size={16} className="text-emerald-400" />
          <span>FLUKE PIN TESTER:</span>
        </div>

        {/* 8 LED Indicator Lights */}
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((pin) => {
            const isSweepActive = activePinSweep === pin;
            const isErrorPin = checkResult && !checkResult.isCorrect && checkResult.wrongPin === pin;
            const isSuccess = checkResult && checkResult.isCorrect;

            return (
              <div key={pin} className="flex flex-col items-center gap-1">
                <div
                  className={`w-4 h-4 rounded-full border transition-all ${
                    isErrorPin
                      ? 'bg-rose-500 border-rose-400 shadow-lg shadow-rose-500 animate-ping'
                      : isSweepActive
                      ? 'bg-amber-400 border-amber-300 shadow-lg shadow-amber-400 scale-125'
                      : isSuccess
                      ? 'bg-emerald-500 border-emerald-400 shadow-sm'
                      : 'bg-slate-800 border-slate-700'
                  }`}
                />
                <span className="text-[10px] text-slate-400">{pin}</span>
              </div>
            );
          })}
        </div>

        <span className={`text-[11px] font-bold ${
          checkResult?.isCorrect ? 'text-emerald-400' : checkResult && !checkResult.isCorrect ? 'text-rose-400' : 'text-slate-400'
        }`}>
          {isTesting ? 'SWEEPING PINS...' : checkResult?.isCorrect ? 'VERIFIED: PASS' : checkResult ? 'FAULT DETECTED' : 'READY TO TEST'}
        </span>
      </div>

      {/* RJ45 Plug Interactive View */}
      <div className="my-6 p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 max-w-xl mx-auto shadow-sm">
        <div className="text-center text-xs font-bold text-slate-500 dark:text-slate-400 mb-3">
          سوکت شفاف RJ45 (پین‌های ۱ تا ۸ از چپ به راست)
        </div>

        <div className="grid grid-cols-8 gap-2 p-3 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700" dir="ltr">
          {userOrder.map((wireId, idx) => {
            const wire = WIRE_MAP[wireId] || ALL_WIRES[0];
            const isSelected = selectedPinIndex === idx;

            return (
              <button
                key={idx}
                onClick={() => handlePinClick(idx)}
                className={`h-36 rounded-xl border-2 flex flex-col items-center justify-between py-2.5 transition-all cursor-pointer ${
                  wire.colorClass
                } ${
                  isSelected
                    ? 'ring-4 ring-net-blue scale-105 shadow-md border-white'
                    : 'hover:scale-[1.02] border-transparent'
                }`}
              >
                <span className="text-[11px] font-bold font-mono bg-black/25 text-white rounded-full w-5 h-5 flex items-center justify-center">
                  {idx + 1}
                </span>

                <div className="writing-vertical text-[10px] font-mono font-medium tracking-tighter opacity-90">
                  {wire.nameEn}
                </div>

                <div className="w-2 h-4 bg-amber-400 rounded-xs shadow-xs" title="پین طلایی مس" />
              </button>
            );
          })}
        </div>

        <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-3">
          {selectedPinIndex !== null
            ? `پین شماره ${selectedPinIndex + 1} انتخاب شد. روی سیم دوم کلیک کنید تا جابجا شوند.`
            : 'روی هر سیمی که در جایگاه اشتباه است کلیک کنید تا برای جابجایی انتخاب شود.'}
        </p>
      </div>

      {/* Result feedback */}
      {checkResult && (
        <div className={`p-4 rounded-2xl mb-4 flex items-center gap-3 border ${
          checkResult.isCorrect
            ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 border-emerald-300'
            : 'bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 border-rose-300'
        }`}>
          {checkResult.isCorrect ? <CheckCircle2 size={20} className="shrink-0 text-emerald-600" /> : <AlertCircle size={20} className="shrink-0 text-rose-600" />}
          <span className="text-xs md:text-sm font-bold leading-relaxed">{checkResult.message}</span>
        </div>
      )}

      {/* Action Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={handleReset} icon={<RotateCcw size={14} />}>
            شروع مجدد
          </Button>
          <Button variant="ghost" size="sm" onClick={handleAutoSolve} icon={<Sparkles size={14} />}>
            مشاهده ترتیب استاندارد
          </Button>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={handleRunFlukeTest}
          disabled={isTesting}
          icon={<Activity size={15} className={isTesting ? 'animate-spin' : ''} />}
        >
          {isTesting ? 'در حال تست پین‌ها...' : 'تست فلوک سوکت شبکه'}
        </Button>
      </div>
    </Card>
  );
};
