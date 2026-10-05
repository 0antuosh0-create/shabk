import React, { useState } from 'react';
import { CourseModule, Lesson } from '../../types/course';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import confetti from 'canvas-confetti';
import {
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Lightbulb,
  Clock,
  CheckCircle2,
  ExternalLink,
  BookMarked,
  Terminal,
  Layers,
  ShieldAlert,
} from 'lucide-react';
import { OsiStackInspector } from '../visualizers/OsiStackInspector';
import { PacketFlowAnimator } from '../visualizers/PacketFlowAnimator';
import { CableWiringGame } from '../visualizers/CableWiringGame';
import { TcpHandshakeViewer } from '../visualizers/TcpHandshakeViewer';
import { MicroChallengeWidget } from './MicroChallengeWidget';
import { IncidentScenarioCard } from './IncidentScenarioCard';
import { MarkdownRenderer } from './MarkdownRenderer';
import { MultiPlatformCodeBlock } from './MultiPlatformCodeBlock';
import { getLessonMicroChallenge, getLessonIncidentScenario } from '../../data/modules/lesson-interactive-catalog';
import { renderBidiText, toPersianDigits } from '../../lib/utils/bidi';
export interface LessonViewerProps {
  module: CourseModule;
  lesson: Lesson;
  isCompleted: boolean;
  onMarkComplete: (lessonId: string) => void;
  onNavigateLesson: (moduleId: string, lessonId: string) => void;
  onOpenQuiz: (module: CourseModule) => void;
  renderCustomVisualizer?: (type: string) => React.ReactNode;
}

export const LessonViewer: React.FC<LessonViewerProps> = ({
  module,
  lesson,
  isCompleted,
  onMarkComplete,
  onNavigateLesson,
  onOpenQuiz,
  renderCustomVisualizer,
}) => {
  const [activeStepTab, setActiveStepTab] = useState<'all' | 'step1' | 'step2' | 'step3' | 'step4'>('all');

  const currentIndex = module.lessons.findIndex((l) => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? module.lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < module.lessons.length - 1 ? module.lessons[currentIndex + 1] : null;

  const handleNextAction = () => {
    if (!isCompleted) {
      onMarkComplete(lesson.id);
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.7 } });
    }
    if (nextLesson) {
      onNavigateLesson(module.id, nextLesson.id);
    } else {
      onOpenQuiz(module);
    }
  };
  const activeChallenge = lesson.microChallenge || getLessonMicroChallenge(lesson.id, module.id);
  const activeIncident = lesson.incidentScenario || getLessonIncidentScenario(lesson.id, module.id);


  const codeSnippets = getLessonCodeSnippets(lesson.id);

  return (
    <div className="space-y-6 w-full pb-24 md:pb-16 animate-in fade-in duration-200">
      {/* Lesson Header Card */}
      <Card className="border-slate-200 dark:border-slate-800 shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-net-blue">
            <span>{module.titleFa}</span>
            <span>/</span>
            <span>درس {lesson.order} از {module.lessons.length}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
              <Clock size={14} />
              <span>زمان مطالعه تقریبی: ۱۰ دقیقه</span>
            </span>
            {isCompleted && (
              <Badge variant="green" size="sm">
                <CheckCircle2 size={12} />
                <span>تکمیل شده</span>
              </Badge>
            )}
          </div>
        </div>

        <h1 className="text-xl md:text-2xl lg:text-3xl font-black text-ink-primary dark:text-ink-light mb-2 leading-relaxed">
          {renderBidiText(lesson.titleFa)}
        </h1>
        <p className="text-xs md:text-sm font-mono text-slate-500 dark:text-slate-400 ltr-text text-right mb-4">
          {lesson.titleEn}
        </p>

        {/* 4-Step Task-Based Navigation Pills */}
        {/* 4-Step Task-Based Navigation Pills (Smooth Horizontal Touch Carousel on Mobile) */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1">
          <button
            onClick={() => setActiveStepTab('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 whitespace-nowrap touch-manipulation ${
              activeStepTab === 'all'
                ? 'bg-net-blue text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            نمایش همه گام‌ها
          </button>
          <button
            onClick={() => setActiveStepTab('step1')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 whitespace-nowrap touch-manipulation ${
              activeStepTab === 'step1'
                ? 'bg-net-blue text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <Lightbulb size={14} />
            <span>گام ۱: مفاهیم و تمثیل</span>
          </button>
          <button
            onClick={() => setActiveStepTab('step2')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 whitespace-nowrap touch-manipulation ${
              activeStepTab === 'step2'
                ? 'bg-net-blue text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <Terminal size={14} />
            <span>گام ۲: چالش خط فرمان</span>
          </button>
          <button
            onClick={() => setActiveStepTab('step3')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 whitespace-nowrap touch-manipulation ${
              activeStepTab === 'step3'
                ? 'bg-net-blue text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <Layers size={14} />
            <span>گام ۳: ابزار تعاملی</span>
          </button>
          <button
            onClick={() => setActiveStepTab('step4')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 whitespace-nowrap touch-manipulation ${
              activeStepTab === 'step4'
                ? 'bg-net-blue text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <ShieldAlert size={14} />
            <span>گام ۴: سناریوی عیب‌یابی</span>
          </button>
        </div>
      </Card>

      {/* STEP 1: Conceptual Summary & Engineering Analogy */}
      {(activeStepTab === 'all' || activeStepTab === 'step1') && (
        <section className="space-y-6">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2 text-sm font-extrabold text-ink-primary dark:text-ink-light">
              <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 text-white flex items-center justify-center text-sm font-sans font-black shadow-xs">
                ۱
              </span>
              <span>گام ۱: مفاهیم کلیدی، جعبه‌ابزار ذهنی و تمثیل مهندسی</span>
            </div>
            <Badge variant="amber" size="sm">درک مفهومی و شهودی</Badge>
          </div>

          {/* Enhanced Mental Model & Analogy Showcase Card */}
          {lesson.keyTakeawaysFa && lesson.keyTakeawaysFa.length > 0 && (
            <div className="p-6 md:p-7 rounded-3xl bg-gradient-to-br from-amber-500/15 via-white to-sky-500/10 dark:from-amber-500/15 dark:via-canvas-card-dark dark:to-sky-950/20 border-2 border-amber-200/90 dark:border-amber-900/60 shadow-card">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-2xl bg-amber-500 text-white shadow-md shadow-amber-500/20 shrink-0">
                  <Lightbulb size={22} />
                </div>
                <div>
                  <Badge variant="amber" size="sm" className="mb-1">
                    جعبه‌ابزار ذهنی و تمثیل‌های ملموس (Mental Models)
                  </Badge>
                  <h3 className="font-black text-base md:text-lg text-ink-primary dark:text-ink-light">
                    شاه‌کلیدهای طلایی درک عمیق این مبحث
                  </h3>
                </div>
              </div>

              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                پیش از ورود به جزئیات فنی، این نکات کلیدی و تمثیل‌های کاربردی را در ذهن داشته باشید تا یادگیری تا همیشه ماندگار شود:
              </p>

              {/* Insight Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {lesson.keyTakeawaysFa.map((takeaway, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white dark:bg-slate-900/90 border border-amber-200/80 dark:border-amber-900/40 shadow-xs flex items-start gap-3 transition-all hover:border-amber-400 dark:hover:border-amber-600"
                  >
                    <span className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-sans font-black shrink-0 mt-0.5 shadow-2xs">
                      {toPersianDigits(idx + 1)}
                    </span>
                    <p className="text-xs md:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                      {renderBidiText(takeaway)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Main Comprehensive Architecture Card */}
          <Card className="border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-card">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3 mb-5 flex items-center justify-between">
              <h4 className="font-bold text-sm text-slate-700 dark:text-slate-300">
                تشریح تفصیلی و جامع مبحث آموزشی:
              </h4>
              <span className="text-xs font-mono text-slate-400 ltr-text">CompTIA Network+ Syllabus</span>
            </div>
            <MarkdownRenderer content={lesson.contentMarkdownFa} />
          </Card>
        </section>
      )}

      {/* STEP 2: Unified Multi-Platform Terminal Code Block */}
      {(activeStepTab === 'all' || activeStepTab === 'step2') && (
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2 text-sm font-extrabold text-ink-primary dark:text-ink-light">
              <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-600 text-white flex items-center justify-center text-sm font-sans font-black shadow-xs">
                ۲
              </span>
              <span>گام ۲: چالش و دستورات خط فرمان مرتبط (CLI Practice)</span>
            </div>
            <Badge variant="blue" size="sm">تمرین خط فرمان</Badge>
          </div>

          <MultiPlatformCodeBlock
            title={`دستورات کاربردی متناظر با ${lesson.titleFa.slice(0, 30)}`}
            snippets={codeSnippets}
          />
        </section>
      )}

      {/* STEP 3: Interactive Visualizer & Micro-Challenge */}
      {(activeStepTab === 'all' || activeStepTab === 'step3') && (
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2 text-sm font-extrabold text-ink-primary dark:text-ink-light">
              <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-500 to-indigo-600 text-white flex items-center justify-center text-sm font-sans font-black shadow-xs">
                ۳
              </span>
              <span>گام ۳: بازرسی تعاملی هدرها و مینی چالش فعال</span>
            </div>
            <Badge variant="purple" size="sm">تمرین و تحلیل عملی</Badge>
          </div>

          {/* Embedded Specialized Visualizer (if assigned) */}
          {lesson.visualizerType === 'osi-stack' && <OsiStackInspector />}
          {lesson.visualizerType === 'packet-flow' && <PacketFlowAnimator />}
          {lesson.visualizerType === 'cable-wiring' && <CableWiringGame />}
          {lesson.visualizerType === 'tcp-handshake' && <TcpHandshakeViewer />}
          {lesson.visualizerType && ['bit-flipper', 'cam-table'].includes(lesson.visualizerType) && renderCustomVisualizer && (
            renderCustomVisualizer(lesson.visualizerType)
          )}

          {/* Micro-Challenge Widget - Always populated with interactive task */}
          <MicroChallengeWidget challenge={activeChallenge} />
        </section>
      )}

      {/* STEP 4: Real-world Debugging Scenario */}
      {(activeStepTab === 'all' || activeStepTab === 'step4') && (
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2 text-sm font-extrabold text-ink-primary dark:text-ink-light">
              <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500 to-red-600 text-white flex items-center justify-center text-sm font-sans font-black shadow-xs">
                ۴
              </span>
            </div>
            <Badge variant="rose" size="sm">موردکاوی تیکت سازمانی</Badge>
          </div>

          {/* Real-World Incident Card - Always populated with incident & logs */}
          <IncidentScenarioCard incident={activeIncident} />
        </section>
      )}

      {/* Further Reading & RFC References Card */}
      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex items-center gap-2 text-ink-primary dark:text-ink-light font-bold text-sm">
          <BookMarked size={18} className="text-net-blue shrink-0" />
          <span>مطالعه بیشتر و مراجع استاندارد بین‌المللی (RFCs & Standards)</span>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          برای عمیق‌تر شدن در مباحث این درس و آمادگی آزمون‌های بین‌المللی CompTIA Network+ و CCNA، مطالعه اسناد زیر پیشنهاد می‌شود:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          {(lesson.references || getDefaultLessonReferences(module.id)).map((ref, rIdx) => (
            <a
              key={rIdx}
              href={ref.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 hover:border-net-blue dark:hover:border-net-blue flex items-center justify-between gap-3 text-xs transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-2 truncate">
                <Badge variant="blue" size="sm" className="shrink-0">{ref.source}</Badge>
                <span className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-net-blue transition-colors truncate">
                  {ref.titleFa}
                </span>
              </div>
              <ExternalLink size={14} className="text-slate-400 group-hover:text-net-blue shrink-0 transition-colors" />
            </a>
          ))}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3.5 sm:p-4 bg-white dark:bg-canvas-card-dark rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="w-full sm:w-auto">
          {prevLesson ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigateLesson(module.id, prevLesson.id)}
              icon={<ArrowRight size={16} />}
              className="w-full sm:w-auto justify-center"
            >
              <span>درس قبلی: {prevLesson.titleFa.slice(0, 22)}...</span>
            </Button>
          ) : (
            <div />
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <Button
            variant={isCompleted ? 'secondary' : 'success'}
            size="md"
            onClick={() => onMarkComplete(lesson.id)}
            icon={<CheckCircle size={16} />}
            className="w-full sm:w-auto justify-center"
          >
            {isCompleted ? 'تکمیل شده (علامت مجدد)' : 'علامت به عنوان تکمیل‌شده'}
          </Button>

          <Button
            variant="primary"
            size="md"
            onClick={handleNextAction}
            icon={<ArrowLeft size={16} />}
            className="w-full sm:w-auto justify-center"
          >
            {nextLesson ? 'درس بعدی' : 'شرکت در آزمون پایان فصل'}
          </Button>
        </div>
      </div>
    </div>
  );
};

function getLessonCodeSnippets(lessonId: string): { cmd: string; powershell: string; bash: string } {
  const map: Record<string, { cmd: string; powershell: string; bash: string }> = {
    'lesson-1-1': {
      cmd: 'ping 8.8.8.8 -n 4',
      powershell: 'Test-Connection 8.8.8.8 -Count 4',
      bash: 'ping -c 4 8.8.8.8',
    },
    'lesson-1-2': {
      cmd: 'netstat -e',
      powershell: 'Get-NetAdapterStatistics',
      bash: 'ip -s link',
    },
    'lesson-1-3': {
      cmd: 'ping -f -l 1472 192.168.1.1',
      powershell: 'Test-NetConnection -ComputerName 192.168.1.1',
      bash: 'ping -M do -s 1472 192.168.1.1',
    },
    'lesson-1-4': {
      cmd: 'tracert 8.8.8.8',
      powershell: 'Test-NetConnection 8.8.8.8 -TraceRoute',
      bash: 'traceroute 8.8.8.8',
    },
    'lesson-3-1': {
      cmd: 'getmac /v /fo list',
      powershell: 'Get-NetAdapter | Select Name, MacAddress',
      bash: 'ip link show',
    },
    'lesson-4-1': {
      cmd: 'ipconfig /all',
      powershell: 'Get-NetIPAddress -AddressFamily IPv4',
      bash: 'ip -4 a',
    },
    'lesson-5-1': {
      cmd: 'arp -a',
      powershell: 'Get-NetNeighbor -AddressFamily IPv4',
      bash: 'ip neigh show',
    },
    'lesson-5-3': {
      cmd: 'tracert google.com',
      powershell: 'Test-NetConnection google.com -TraceRoute',
      bash: 'traceroute google.com',
    },
    'lesson-6-1': {
      cmd: 'netstat -ano',
      powershell: 'Get-NetTCPConnection -State Established',
      bash: 'ss -tulpn',
    },
    'lesson-7-1': {
      cmd: 'ipconfig /renew',
      powershell: 'Restart-NetAdapter -Name "Ethernet"',
      bash: 'sudo dhclient -r && sudo dhclient',
    },
    'lesson-7-2': {
      cmd: 'nslookup google.com 8.8.8.8',
      powershell: 'Resolve-DnsName google.com -Server 8.8.8.8',
      bash: 'dig @8.8.8.8 google.com',
    },
  };

  return (
    map[lessonId] || {
      cmd: 'ipconfig /all',
      powershell: 'Get-NetIPConfiguration',
      bash: 'ip a',
    }
  );
}

function getDefaultLessonReferences(moduleId: string) {
  const defaultsByModule: Record<string, { titleFa: string; source: string; url: string }[]> = {
    'module-1': [
      { titleFa: 'معماری پروتکل‌های اینترنت و مدل لایه‌ای', source: 'RFC 1122', url: 'https://datatracker.ietf.org/doc/html/rfc1122' },
      { titleFa: 'شبیه‌ساز و مانیتورینگ بسته‌ها با Wireshark', source: 'Wireshark Tool', url: 'https://www.wireshark.org/' },
    ],
    'module-2': [
      { titleFa: 'استاندارد کابل‌کشی تجاری ساختمان T568A/B', source: 'ANSI/TIA-568', url: 'https://en.wikipedia.org/wiki/ANSI/TIA-568' },
      { titleFa: 'استانداردهای کابل شبکه و اترنت سیمی', source: 'IEEE 802.3', url: 'https://standards.ieee.org/standard/802_3-2022.html' },
    ],
    'module-3': [
      { titleFa: 'استاندارد شبکه‌های محلی مجازی و ترانکینگ', source: 'IEEE 802.1Q', url: 'https://standards.ieee.org/standard/802_1Q-2022.html' },
      { titleFa: 'پروتکل درخت پوشا و ممانعت از حلقه‌های لایه ۲', source: 'IEEE 802.1D STP', url: 'https://en.wikipedia.org/wiki/Spanning_Tree_Protocol' },
    ],
    'module-4': [
      { titleFa: 'استاندارد بازه‌های آدرس‌های خصوصی اینترنت', source: 'RFC 1918', url: 'https://datatracker.ietf.org/doc/html/rfc1918' },
      { titleFa: 'زیرشبکه‌سازی پیشرفته با پیشوند ۳۱ بیتی در روترها', source: 'RFC 3021', url: 'https://datatracker.ietf.org/doc/html/rfc3021' },
    ],
    'module-5': [
      { titleFa: 'پروتکل تفکیک آدرس اترنت به مک‌آدرس', source: 'RFC 826 ARP', url: 'https://datatracker.ietf.org/doc/html/rfc826' },
      { titleFa: 'مشخصات پیام‌های خطایابی و کنترل اینترنت', source: 'RFC 792 ICMP', url: 'https://datatracker.ietf.org/doc/html/rfc792' },
    ],
    'module-6': [
      { titleFa: 'مشخصات رسمی پروتکل کنترل انتقال', source: 'RFC 793 TCP', url: 'https://datatracker.ietf.org/doc/html/rfc793' },
      { titleFa: 'مشخصات پروتکل بسته‌های داده کاربر', source: 'RFC 768 UDP', url: 'https://datatracker.ietf.org/doc/html/rfc768' },
    ],
    'module-7': [
      { titleFa: 'پروتکل تخصیص خودکار آدرس‌های شبکه', source: 'RFC 2131 DHCP', url: 'https://datatracker.ietf.org/doc/html/rfc2131' },
      { titleFa: 'سامانه نام‌های دامنه و پیاده‌سازی سرویس', source: 'RFC 1035 DNS', url: 'https://datatracker.ietf.org/doc/html/rfc1035' },
    ],
    'module-8': [
      { titleFa: 'ترجمه آدرس شبکه و پورت سنتی', source: 'RFC 3022 NAT', url: 'https://datatracker.ietf.org/doc/html/rfc3022' },
      { titleFa: 'معماری نوین امنیت شبکه و اعتماد صفر', source: 'NIST SP 800-207', url: 'https://csrc.nist.gov/publications/detail/sp/800-207/final' },
    ],
  };
  return defaultsByModule[moduleId] || defaultsByModule['module-1'];
}
