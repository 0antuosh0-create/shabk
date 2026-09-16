import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import {
  Play,
  Pause,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  Laptop,
  HardDrive,
  Router,
  Server,
  Activity,
  Layers,
} from 'lucide-react';

interface TransmissionHop {
  hopIndex: number;
  stageNameFa: string;
  stageSubtitleEn: string;
  location: 'hostA' | 'cable1' | 'switch' | 'cable2' | 'router' | 'cable3' | 'hostB';
  descriptionFa: string;
  ttl: number;
  l2Frame: {
    srcMac: string;
    dstMac: string;
    noteFa: string;
  };
  l3Packet: {
    srcIp: string;
    dstIp: string;
    protocol: string;
  };
  l4Segment: {
    srcPort: number;
    dstPort: number;
    seq: number;
  };
  payload: string;
}

const TRANSMISSION_HOPS: TransmissionHop[] = [
  {
    hopIndex: 0,
    stageNameFa: '۱. تولید داده در کلاینت (Encapsulation)',
    stageSubtitleEn: 'Host A Encapsulation',
    location: 'hostA',
    descriptionFa: 'کاربر درخواست HTTP را در مرورگر ارسال می‌کند. بسته با سرآیند TCP (پورت ۵۲۴۱۰ به ۸۰)، سرآیند IP (192.168.1.10 به 10.0.0.50) و فریم لایه ۲ کپسوله می‌شود. چون مقصد خارج از ساب‌نت است، مک‌آدرس مقصد برابر با مک روتر گیت‌وی قرار می‌گیرد.',
    ttl: 64,
    l2Frame: {
      srcMac: '00:1A:2B:11:22:33 (Host A)',
      dstMac: '00:1A:2B:FE:00:01 (Gateway Router)',
      noteFa: 'مک‌آدرس روتر گیت‌وی به عنوان مقصد فریم لایه ۲ قرار گرفت',
    },
    l3Packet: {
      srcIp: '192.168.1.10',
      dstIp: '10.0.0.50',
      protocol: 'TCP (6)',
    },
    l4Segment: {
      srcPort: 52410,
      dstPort: 80,
      seq: 1001,
    },
    payload: 'GET /index.html HTTP/1.1',
  },
  {
    hopIndex: 1,
    stageNameFa: '۲. عبور از کابل به سمت سوئیچ محلی',
    stageSubtitleEn: 'Transmission over Cat-6 Cable to Switch',
    location: 'cable1',
    descriptionFa: 'بیت‌های سیگنال الکتریکی روی زوج‌سیم‌های کابل Cat-6 منتقل شده و وارد پورت شماره ۱ سوئیچ شبکه محلی می‌شوند.',
    ttl: 64,
    l2Frame: {
      srcMac: '00:1A:2B:11:22:33 (Host A)',
      dstMac: '00:1A:2B:FE:00:01 (Gateway Router)',
      noteFa: 'سیگنال در حال عبور از پورت ۱ سوئیچ',
    },
    l3Packet: {
      srcIp: '192.168.1.10',
      dstIp: '10.0.0.50',
      protocol: 'TCP (6)',
    },
    l4Segment: {
      srcPort: 52410,
      dstPort: 80,
      seq: 1001,
    },
    payload: 'GET /index.html HTTP/1.1',
  },
  {
    hopIndex: 2,
    stageNameFa: '۳. بررسی جدول CAM در سوئیچ لایه ۲',
    stageSubtitleEn: 'Switch Layer 2 CAM Lookup',
    location: 'switch',
    descriptionFa: 'سوئیچ مک‌آدرس فرستنده (Host A) را در پورت ۱ یاد می‌گیرد. سپس جدول CAM را نگاه می‌کند؛ مک روتر در پورت ۴ ثبت است، بنابراین فریم را بدون دستکاری لایه ۳ مستقیماً به سمت پورت ۴ هدایت می‌کند.',
    ttl: 64,
    l2Frame: {
      srcMac: '00:1A:2B:11:22:33 (Host A)',
      dstMac: '00:1A:2B:FE:00:01 (Gateway Router)',
      noteFa: 'سوئیچ فقط لایه ۲ را بررسی کرد؛ لایه ۳ دست‌نخورده باقی ماند',
    },
    l3Packet: {
      srcIp: '192.168.1.10',
      dstIp: '10.0.0.50',
      protocol: 'TCP (6)',
    },
    l4Segment: {
      srcPort: 52410,
      dstPort: 80,
      seq: 1001,
    },
    payload: 'GET /index.html HTTP/1.1',
  },
  {
    hopIndex: 3,
    stageNameFa: '۴. رسیدن به روتر، کاهش TTL و بازنویسی مک‌آدرس (Routing)',
    stageSubtitleEn: 'Router L3 Routing & L2 MAC Rewrite',
    location: 'router',
    descriptionFa: 'روتر فریم لایه ۲ را دور می‌ریزد (Decapsulate). جدول روتینگ را بررسی می‌کند، مقدار TTL را از ۶۴ به ۶۳ کاهش می‌دهد و فریم لایه ۲ جدیدی با مک‌آدرس خروجی خود به عنوان مبدأ و مک‌آدرس وب‌سرور به عنوان مقصد می‌سازد!',
    ttl: 63,
    l2Frame: {
      srcMac: '00:1A:2B:FE:00:02 (Router Egress)',
      dstMac: '00:1A:2B:99:88:77 (Server Host B)',
      noteFa: 'مهم: مک‌آدرس لایه ۲ بازنویسی شد؛ IPهای لایه ۳ ثابت ماندند',
    },
    l3Packet: {
      srcIp: '192.168.1.10',
      dstIp: '10.0.0.50',
      protocol: 'TCP (6)',
    },
    l4Segment: {
      srcPort: 52410,
      dstPort: 80,
      seq: 1001,
    },
    payload: 'GET /index.html HTTP/1.1',
  },
  {
    hopIndex: 4,
    stageNameFa: '۵. تحویل به وب‌سرور مقصد (Decapsulation)',
    stageSubtitleEn: 'Host B Receipt & Application Delivery',
    location: 'hostB',
    descriptionFa: 'سرور فریم لایه ۲ را با مک خود تطبیق داده، بسته لایه ۳ و سگمنت لایه ۴ را باز می‌کند و درخواست HTTP را تحویل پردازه وب‌سرور (پورت ۸۰) می‌دهد و پاسخ 200 OK تولید می‌شود.',
    ttl: 63,
    l2Frame: {
      srcMac: '00:1A:2B:FE:00:02 (Router)',
      dstMac: '00:1A:2B:99:88:77 (Server)',
      noteFa: 'فریم لایه ۲ باز و مصرف شد',
    },
    l3Packet: {
      srcIp: '192.168.1.10',
      dstIp: '10.0.0.50',
      protocol: 'TCP (6)',
    },
    l4Segment: {
      srcPort: 52410,
      dstPort: 80,
      seq: 1001,
    },
    payload: 'HTTP/1.1 200 OK (Response Generated)',
  },
];

export const PacketFlowAnimator: React.FC = () => {
  const [currentHop, setCurrentHop] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentHop((prev) => (prev >= TRANSMISSION_HOPS.length - 1 ? 0 : prev + 1));
    }, 2500);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const hop = TRANSMISSION_HOPS[currentHop];

  return (
    <Card className="my-6 border-slate-300 dark:border-slate-800 shadow-card bg-slate-50/50 dark:bg-canvas-card-dark">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Activity size={18} className="text-net-blue animate-pulse" />
            <h4 className="font-extrabold text-base text-ink-primary dark:text-ink-light">
              شبیه‌ساز واقعی انتقال فریم و بسته شبکه (Packet Flow & Header Transformation)
            </h4>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            مشاهده زنده تغییرات سرآیندهای لایه ۲ (MAC)، کاهش TTL در لایه ۳ (IP) و تحویل سوکت در لایه ۴
          </p>
        </div>

        <Badge variant="blue" size="md">
          گام {hop.hopIndex + 1} از {TRANSMISSION_HOPS.length}
        </Badge>
      </div>

      {/* Network Topology Transmission Canvas */}
      <div className="my-6 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 relative overflow-hidden shadow-inner">
        {/* Animated Connecting Cable Tracks */}
        <div className="flex items-center justify-between max-w-2xl mx-auto relative z-10">
          {/* Node 1: Host A */}
          <div className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${
            hop.location === 'hostA' ? 'scale-110' : 'opacity-70'
          }`}>
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all ${
              hop.location === 'hostA'
                ? 'bg-net-blue text-white border-net-blue shadow-lg ring-4 ring-sky-100 dark:ring-sky-950'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-700'
            }`}>
              <Laptop size={26} />
            </div>
            <span className="text-xs font-bold text-ink-primary dark:text-ink-light">Host A</span>
            <span className="text-[10px] font-mono text-slate-500 ltr-text">192.168.1.10</span>
          </div>

          {/* Cable 1 with Pulse */}
          <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-800 mx-2 relative rounded-full overflow-hidden">
            {(hop.location === 'hostA' || hop.location === 'cable1') && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-net-blue to-transparent animate-pulse" />
            )}
          </div>

          {/* Node 2: Switch */}
          <div className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${
            hop.location === 'switch' ? 'scale-110' : 'opacity-70'
          }`}>
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all ${
              hop.location === 'switch'
                ? 'bg-amber-500 text-white border-amber-500 shadow-lg ring-4 ring-amber-100 dark:ring-amber-950'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-700'
            }`}>
              <HardDrive size={26} />
            </div>
            <span className="text-xs font-bold text-ink-primary dark:text-ink-light">Switch L2</span>
            <span className="text-[10px] text-slate-500">CAM Table</span>
          </div>

          {/* Cable 2 with Pulse */}
          <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-800 mx-2 relative rounded-full overflow-hidden">
            {(hop.location === 'switch' || hop.location === 'cable2') && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500 to-transparent animate-pulse" />
            )}
          </div>

          {/* Node 3: Router */}
          <div className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${
            hop.location === 'router' ? 'scale-110' : 'opacity-70'
          }`}>
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all ${
              hop.location === 'router'
                ? 'bg-emerald-500 text-white border-emerald-500 shadow-lg ring-4 ring-emerald-100 dark:ring-emerald-950'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-700'
            }`}>
              <Router size={26} />
            </div>
            <span className="text-xs font-bold text-ink-primary dark:text-ink-light">Router L3</span>
            <span className="text-[10px] font-mono text-slate-500">TTL Decrement</span>
          </div>

          {/* Cable 3 with Pulse */}
          <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-800 mx-2 relative rounded-full overflow-hidden">
            {(hop.location === 'router' || hop.location === 'cable3') && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500 to-transparent animate-pulse" />
            )}
          </div>

          {/* Node 4: Host B (Web Server) */}
          <div className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${
            hop.location === 'hostB' ? 'scale-110' : 'opacity-70'
          }`}>
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all ${
              hop.location === 'hostB'
                ? 'bg-purple-600 text-white border-purple-600 shadow-lg ring-4 ring-purple-100 dark:ring-purple-950'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-700'
            }`}>
              <Server size={26} />
            </div>
            <span className="text-xs font-bold text-ink-primary dark:text-ink-light">Server (Host B)</span>
            <span className="text-[10px] font-mono text-slate-500 ltr-text">10.0.0.50:80</span>
          </div>
        </div>
      </div>

      {/* Stage Description Box */}
      <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 mb-5">
        <div className="flex items-center justify-between mb-1.5">
          <h5 className="font-bold text-sm text-ink-primary dark:text-ink-light">
            {hop.stageNameFa}
          </h5>
          <span className="text-[11px] font-mono text-slate-400 ltr-text">{hop.stageSubtitleEn}</span>
        </div>
        <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {hop.descriptionFa}
        </p>
      </div>

      {/* Packet Header Dissection Inspector */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Layers size={15} className="text-net-blue" />
            <span>کالبدشکافی لایه‌های هدر بسته در این گام:</span>
          </span>
          <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            TTL = {hop.ttl}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
          {/* Layer 2 Frame */}
          <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-1">
            <div className="font-bold text-amber-800 dark:text-amber-300 text-[11px] font-sans flex items-center justify-between">
              <span>فریم لایه ۲ (Ethernet L2)</span>
              <span className="text-[10px] font-mono">MAC</span>
            </div>
            <div className="text-[11px] text-slate-700 dark:text-slate-300 ltr-text truncate">
              Src: {hop.l2Frame.srcMac}
            </div>
            <div className="text-[11px] text-slate-700 dark:text-slate-300 ltr-text truncate">
              Dst: {hop.l2Frame.dstMac}
            </div>
            <p className="text-[10px] font-sans text-amber-700 dark:text-amber-400/90 pt-1 border-t border-amber-200/50">
              {hop.l2Frame.noteFa}
            </p>
          </div>

          {/* Layer 3 Packet */}
          <div className="p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 space-y-1">
            <div className="font-bold text-emerald-800 dark:text-emerald-300 text-[11px] font-sans flex items-center justify-between">
              <span>بسته لایه ۳ (IPv4 Packet)</span>
              <span className="text-[10px] font-mono">IP</span>
            </div>
            <div className="text-[11px] text-slate-700 dark:text-slate-300 ltr-text">
              Src: {hop.l3Packet.srcIp}
            </div>
            <div className="text-[11px] text-slate-700 dark:text-slate-300 ltr-text">
              Dst: {hop.l3Packet.dstIp}
            </div>
            <div className="text-[10px] text-slate-500 font-sans pt-1 border-t border-emerald-200/50 flex justify-between">
              <span>پروتکل: {hop.l3Packet.protocol}</span>
              <span>TTL: {hop.ttl}</span>
            </div>
          </div>

          {/* Layer 4 Segment */}
          <div className="p-3 rounded-xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/50 space-y-1">
            <div className="font-bold text-purple-800 dark:text-purple-300 text-[11px] font-sans flex items-center justify-between">
              <span>سگمنت لایه ۴ (TCP)</span>
              <span className="text-[10px] font-mono">Port</span>
            </div>
            <div className="text-[11px] text-slate-700 dark:text-slate-300 ltr-text">
              Port: {hop.l4Segment.srcPort} → {hop.l4Segment.dstPort}
            </div>
            <div className="text-[11px] text-slate-700 dark:text-slate-300 ltr-text">
              Seq: {hop.l4Segment.seq}
            </div>
            <p className="text-[10px] font-mono text-purple-700 dark:text-purple-400 pt-1 border-t border-purple-200/50 truncate">
              {hop.payload}
            </p>
          </div>
        </div>
      </div>

      {/* Tactile Playback Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-5 mt-5 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Button
            variant={isPlaying ? 'secondary' : 'primary'}
            size="sm"
            onClick={() => setIsPlaying(!isPlaying)}
            icon={isPlaying ? <Pause size={15} /> : <Play size={15} />}
          >
            {isPlaying ? 'توقف موقت' : 'پخش خودکار انتقال'}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => { setIsPlaying(false); setCurrentHop(0); }}
            icon={<RotateCcw size={14} />}
          >
            شروع مجدد
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentHop === 0}
            onClick={() => { setIsPlaying(false); setCurrentHop((p) => Math.max(0, p - 1)); }}
            icon={<ArrowRight size={15} />}
          >
            گام قبلی
          </Button>

          <Button
            variant="primary"
            size="sm"
            disabled={currentHop === TRANSMISSION_HOPS.length - 1}
            onClick={() => { setIsPlaying(false); setCurrentHop((p) => Math.min(TRANSMISSION_HOPS.length - 1, p + 1)); }}
            icon={<ArrowLeft size={15} />}
          >
            گام بعدی
          </Button>
        </div>
      </div>
    </Card>
  );
};
