import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Tabs } from '../ui/Tabs';
import { Laptop, Server, ArrowLeft, ArrowRight, RotateCcw, CheckCircle2 } from 'lucide-react';

export const TcpHandshakeViewer: React.FC = () => {
  const [mode, setMode] = useState<'handshake' | 'teardown'>('handshake');
  const [step, setStep] = useState<number>(0);

  const handshakeSteps = [
    {
      step: 0,
      sender: 'none',
      titleFa: 'وضعیت اولیه: کلاینت آماده و سرور در حالت شنود (LISTEN)',
      descriptionFa: 'سرور وب روی پورت ۸۰ در وضعیت LISTEN منتظر دریافت درخواست اتصال است. کلاینت آماده آغاز ارتباط است.',
      flags: '',
      seqAck: '',
    },
    {
      step: 1,
      sender: 'client',
      titleFa: 'گام اول (Client → Server): ارسال بسته همگام‌سازی (SYN)',
      descriptionFa: 'کلاینت با پرچم SYN=1 شماره توالی اولیه تصادفی خود (مثلاً ISN = 1000) را برای سرور ارسال می‌کند و وارد وضعیت SYN_SENT می‌شود.',
      flags: 'SYN = 1, ACK = 0',
      seqAck: 'Seq = 1000, Ack = 0',
    },
    {
      step: 2,
      sender: 'server',
      titleFa: 'گام دوم (Server → Client): پاسخ تأیید و همگام‌سازی متقابل (SYN-ACK)',
      descriptionFa: 'سرور درخواست را می‌پذیرد. شماره کلاینت را تأیید کرده (Ack = 1001) و شماره توالی خود را اعلام می‌کند (Seq = 5000) و وارد وضعیت SYN_RECEIVED می‌شود.',
      flags: 'SYN = 1, ACK = 1',
      seqAck: 'Seq = 5000, Ack = 1001',
    },
    {
      step: 3,
      sender: 'client',
      titleFa: 'گام سوم (Client → Server): تأیید نهایی کلاینت (ACK)',
      descriptionFa: 'کلاینت تأییدیه سرور را تصدیق می‌کند (Ack = 5001). هر دو طرف وارد وضعیت امن ESTABLISHED شده و انتقال داده‌ها آغاز می‌شود!',
      flags: 'SYN = 0, ACK = 1',
      seqAck: 'Seq = 1001, Ack = 5001',
    },
  ];

  const teardownSteps = [
    {
      step: 0,
      sender: 'none',
      titleFa: 'وضعیت اولیه: اتصال برقرار است (ESTABLISHED)',
      descriptionFa: 'انتقال صفحات وب یا فایل به پایان رسیده و یکی از طرفین تصمیم به قطع ارتباط می‌گیرد.',
      flags: '',
      seqAck: '',
    },
    {
      step: 1,
      sender: 'client',
      titleFa: 'گام اول (Client → Server): درخواست اتمام نشست (FIN)',
      descriptionFa: 'کلاینت اعلام می‌کند داده دیگری برای ارسال ندارد و پرچم FIN=1 را ارسال کرده و وارد وضعیت FIN_WAIT_1 می‌شود.',
      flags: 'FIN = 1, ACK = 1',
      seqAck: 'Seq = 2000, Ack = 6000',
    },
    {
      step: 2,
      sender: 'server',
      titleFa: 'گام دوم (Server → Client): تأیید بسته شدن از سوی سرور (ACK)',
      descriptionFa: 'سرور پایان ارسال کلاینت را تأیید می‌کند (Ack = 2001) اما ممکن است هنوز داده‌هایی برای تحویل به کلاینت داشته باشد (CLOSE_WAIT).',
      flags: 'ACK = 1',
      seqAck: 'Seq = 6000, Ack = 2001',
    },
    {
      step: 3,
      sender: 'server',
      titleFa: 'گام سوم (Server → Client): اعلام پایان کامل ترافیک سرور (FIN)',
      descriptionFa: 'سرور نیز تمام کارهای باقیمانده را تحویل داده و پرچم FIN=1 را برای بستن کانال خود ارسال می‌کند (LAST_ACK).',
      flags: 'FIN = 1, ACK = 1',
      seqAck: 'Seq = 6001, Ack = 2001',
    },
    {
      step: 4,
      sender: 'client',
      titleFa: 'گام چهارم (Client → Server): تأیید نهایی و وضعیت TIME_WAIT',
      descriptionFa: 'کلاینت پایان سرور را تأیید می‌کند (Ack = 6002) و برای جلوگیری از تداخل بسته‌های دیرهنگام در وضعیت TIME_WAIT قرار می‌گیرد، سپس بسته می‌شود (CLOSED).',
      flags: 'ACK = 1',
      seqAck: 'Seq = 2001, Ack = 6002',
    },
  ];

  const currentSteps = mode === 'handshake' ? handshakeSteps : teardownSteps;
  const current = currentSteps[step] || currentSteps[0];
  const maxStep = currentSteps.length - 1;

  return (
    <Card className="my-6 border-slate-300 dark:border-slate-800 shadow-card">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h4 className="font-bold text-ink-primary dark:text-ink-light">
            شبیه‌ساز تعاملی دست‌تکانی TCP (3-Way Handshake & 4-Way Teardown)
          </h4>
          <p className="text-xs text-ink-muted dark:text-ink-light-muted">
            مشاهده پرچم‌های SYN، ACK، FIN و مقادیر ترتیبی Sequence Number در زمان واقعی.
          </p>
        </div>

        <Tabs
          tabs={[
            { id: 'handshake', label: 'برقراری اتصال (Handshake)' },
            { id: 'teardown', label: 'قطع اتصال (Teardown)' }
          ]}
          activeTab={mode}
          onChange={(id) => { setMode(id as 'handshake' | 'teardown'); setStep(0); }}
        />
      </div>

      {/* Interactive Communication Track */}
      <div className="my-6 p-6 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between max-w-xl mx-auto relative mb-6">
          {/* Client Node */}
          <div className="flex flex-col items-center gap-2">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-colors ${
              current.sender === 'client'
                ? 'bg-net-blue text-white border-net-blue ring-4 ring-sky-100 dark:ring-sky-950'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
            }`}>
              <Laptop size={28} />
            </div>
            <span className="text-xs font-bold">کلاینت (Client)</span>
          </div>

          {/* Animated Flow Arrow */}
          <div className="flex-1 px-4 flex flex-col items-center">
            {step === 0 ? (
              <span className="text-xs text-slate-400 font-medium">برای شروع، گام بعدی را بزنید</span>
            ) : (
              <div className="w-full flex flex-col items-center animate-in fade-in duration-300">
                <Badge variant={current.sender === 'client' ? 'blue' : 'green'} size="md">
                  {current.flags}
                </Badge>
                <div className="w-full h-1 bg-slate-300 dark:bg-slate-700 my-2 relative">
                  <div className={`absolute top-0 h-full bg-net-blue transition-all duration-300 ${
                    current.sender === 'client' ? 'left-0 right-0' : 'left-0 right-0'
                  }`} />
                </div>
                <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 ltr-text">
                  {current.seqAck}
                </span>
              </div>
            )}
          </div>

          {/* Server Node */}
          <div className="flex flex-col items-center gap-2">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-colors ${
              current.sender === 'server'
                ? 'bg-net-green text-white border-net-green ring-4 ring-emerald-100 dark:ring-emerald-950'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
            }`}>
              <Server size={28} />
            </div>
            <span className="text-xs font-bold">سرور وب (Server)</span>
          </div>
        </div>

        {/* Step details box */}
        <div className="p-4 bg-white dark:bg-canvas-card-dark rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h5 className="font-bold text-sm text-ink-primary dark:text-ink-light">
              {current.titleFa}
            </h5>
            <Badge variant="slate" size="sm">گام {step} از {maxStep}</Badge>
          </div>
          <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {current.descriptionFa}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800">
        <Button variant="secondary" size="sm" onClick={() => setStep(0)} icon={<RotateCcw size={14} />}>
          شروع مجدد
        </Button>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={step === 0}
            onClick={() => setStep((p) => Math.max(0, p - 1))}
            icon={<ArrowRight size={14} />}
          >
            گام قبلی
          </Button>
          <Button
            variant="primary"
            size="sm"
            disabled={step === maxStep}
            onClick={() => setStep((p) => Math.min(maxStep, p + 1))}
            icon={step === maxStep ? <CheckCircle2 size={14} /> : <ArrowLeft size={14} />}
          >
            {step === maxStep ? 'پایان چرخه' : 'گام بعدی'}
          </Button>
        </div>
      </div>
    </Card>
  );
};
