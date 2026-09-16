import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Layers, ShieldCheck, ArrowDownUp } from 'lucide-react';

interface LayerInfo {
  osiNumber: number;
  nameFa: string;
  nameEn: string;
  pdu: string;
  dodLayer: string;
  color: string;
  protocols: string[];
  hardware: string;
  descriptionFa: string;
}

const OSI_LAYERS: LayerInfo[] = [
  {
    osiNumber: 7,
    nameFa: 'لایه کاربرد',
    nameEn: 'Application',
    pdu: 'Data (داده خام)',
    dodLayer: 'Process / Application',
    color: 'border-purple-500 bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300',
    protocols: ['HTTP', 'HTTPS', 'DNS', 'DHCP', 'FTP', 'SSH'],
    hardware: 'کامپیوتر میزبان، مرورگر، وب‌سرور',
    descriptionFa: 'نزدیک‌ترین لایه به کاربر نهایی. پروتکل‌های مورد استفاده برنامه‌ها در این لایه اجرا می‌شوند.'
  },
  {
    osiNumber: 6,
    nameFa: 'لایه ارائه',
    nameEn: 'Presentation',
    pdu: 'Data (فرمت‌شده)',
    dodLayer: 'Process / Application',
    color: 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300',
    protocols: ['TLS / SSL', 'JPEG', 'ASCII', 'MIME', 'GZIP'],
    hardware: 'سیستم‌عامل و ماژول‌های رمزنگاری',
    descriptionFa: 'وظیفه ترجمه فرمت‌ها، فشرده‌سازی و رمزنگاری/رمزگشایی داده‌ها را بر عهده دارد.'
  },
  {
    osiNumber: 5,
    nameFa: 'لایه نشست',
    nameEn: 'Session',
    pdu: 'Data (نشست فعال)',
    dodLayer: 'Process / Application',
    color: 'border-blue-500 bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300',
    protocols: ['NetBIOS', 'RPC', 'PPTP', 'Sockets API'],
    hardware: 'مدیریت نشست سیستم‌عامل',
    descriptionFa: 'برقراری، مدیریت، نگهداری و اتمام جلسات ارتباطی دوطرفه (Simplex, Half-Duplex, Full-Duplex).'
  },
  {
    osiNumber: 4,
    nameFa: 'لایه انتقال',
    nameEn: 'Transport',
    pdu: 'Segment (سگمنت)',
    dodLayer: 'Host-to-Host (Transport)',
    color: 'border-teal-500 bg-teal-50 dark:bg-teal-950/30 text-teal-700 dark:text-teal-300',
    protocols: ['TCP', 'UDP'],
    hardware: 'پشته نرم‌افزاری شبکه سیستم‌عامل، فایروال پورت',
    descriptionFa: 'قطعه‌بندی داده‌ها، شماره‌گذاری توالی، کنترل جریان و تضمین قابلیت اطمینان ارتباط (پورت‌ها).'
  },
  {
    osiNumber: 3,
    nameFa: 'لایه شبکه',
    nameEn: 'Network',
    pdu: 'Packet (بسته)',
    dodLayer: 'Internet',
    color: 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300',
    protocols: ['IPv4', 'IPv6', 'ICMP', 'ARP', 'OSPF', 'BGP'],
    hardware: 'روتر (Router)، سوئیچ لایه ۳ (L3 Switch)',
    descriptionFa: 'آدرس‌دهی منطقی جهانی با آدرس‌های IP و یافتن بهترین مسیر بین شبکه‌های ناهمگن.'
  },
  {
    osiNumber: 2,
    nameFa: 'لایه پیوند داده',
    nameEn: 'Data Link',
    pdu: 'Frame (فریم)',
    dodLayer: 'Network Access (Link)',
    color: 'border-amber-500 bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300',
    protocols: ['Ethernet (IEEE 802.3)', 'Wi-Fi (802.11)', 'PPP', 'VLAN 802.1Q'],
    hardware: 'سوئیچ (Switch)، کارت شبکه (NIC)، بریج (Bridge)',
    descriptionFa: 'آدرس‌دهی فیزیکی با مک‌آدرس (MAC)، دسترسی به رسانه فیزیکی، فریم‌بندی و کنترل خطای فیزیکی.'
  },
  {
    osiNumber: 1,
    nameFa: 'لایه فیزیکی',
    nameEn: 'Physical',
    pdu: 'Bits (بیت‌ها و امواج)',
    dodLayer: 'Network Access (Link)',
    color: 'border-rose-500 bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300',
    protocols: ['1000Base-T', '10Base2', 'DSL', 'Wireless Radio (RF)'],
    hardware: 'کابل شبکه (Cat6)، فیبر نوری، هاب (Hub)، تکرارکننده (Repeater)',
    descriptionFa: 'انتقال فیزیکی بیت‌های ۰ و ۱ به صورت پالس الکتریکی روی مس، پرتو نور در فیبر یا امواج رادیویی در هوا.'
  }
];

export const OsiStackInspector: React.FC = () => {
  const [selectedLayer, setSelectedLayer] = useState<number>(7);
  const active = OSI_LAYERS.find((l) => l.osiNumber === selectedLayer) || OSI_LAYERS[0];

  return (
    <Card className="my-6 border-slate-300 dark:border-slate-800 shadow-card">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Layers className="text-net-blue" size={24} />
          <div>
            <h4 className="font-bold text-ink-primary dark:text-ink-light">
              کاوشگر تعاملی لایه‌های مدل OSI و تطبیق با DoD
            </h4>
            <p className="text-xs text-ink-muted dark:text-ink-light-muted">
              برای مشاهده جزئیات پروتکل‌ها، سخت‌افزارها و واحد داده (PDU)، روی هر لایه کلیک کنید.
            </p>
          </div>
        </div>
        <Badge variant="blue" size="sm">تعاملی</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-5">
        {/* Layer selector stack */}
        <div className="lg:col-span-6 space-y-2">
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 px-1 mb-1 flex items-center justify-between">
            <span>لایه‌های هفت‌گانه OSI</span>
            <span>مدل ۴ لایه‌ای DoD</span>
          </div>

          {OSI_LAYERS.map((layer) => {
            const isSelected = layer.osiNumber === selectedLayer;
            return (
              <button
                key={layer.osiNumber}
                onClick={() => setSelectedLayer(layer.osiNumber)}
                className={`w-full flex items-center justify-between p-3 rounded-xl border text-right transition-all cursor-pointer select-none ${
                  isSelected
                    ? `${layer.color} shadow-sm font-semibold scale-[1.01]`
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${
                    isSelected ? 'bg-white/80 dark:bg-black/30' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}>
                    {layer.osiNumber}
                  </span>
                  <div>
                    <div className="text-sm">{layer.nameFa}</div>
                    <div className="text-xs opacity-75 font-mono">{layer.nameEn}</div>
                  </div>
                </div>

                <div className="text-left">
                  <span className="text-xs px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono text-[11px]">
                    {layer.dodLayer}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Layer Details Pane */}
        <div className="lg:col-span-6 flex flex-col justify-between p-5 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-bold text-net-blue">لایه شماره {active.osiNumber}</span>
                <h3 className="text-xl font-extrabold text-ink-primary dark:text-ink-light">
                  {active.nameFa} ({active.nameEn})
                </h3>
              </div>
              <Badge variant="purple" size="md">
                <ArrowDownUp size={12} />
                <span>PDU: {active.pdu}</span>
              </Badge>
            </div>

            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-5">
              {active.descriptionFa}
            </p>

            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1.5">
                  پروتکل‌های پرکاربرد این لایه:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {active.protocols.map((proto) => (
                    <span
                      key={proto}
                      className="text-xs font-mono px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-ink-primary dark:text-ink-light shadow-2xs"
                    >
                      {proto}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1">
                  تجهیزات سخت‌افزاری و نقاط پردازش:
                </span>
                <div className="text-sm font-medium text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <ShieldCheck size={16} className="text-net-green shrink-0" />
                  <span>{active.hardware}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span>جایگاه در مدل مرجع وزارت دفاع آمریکا (DoD):</span>
            <span className="font-bold text-ink-primary dark:text-ink-light">{active.dodLayer}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
