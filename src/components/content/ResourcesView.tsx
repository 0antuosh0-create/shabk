import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { CURATED_RESOURCES, FOUNDATIONAL_ATTRIBUTION } from '../../data/cheatsheet/resources-data';
import { BookOpen, ExternalLink, Award, Search } from 'lucide-react';

export const ResourcesView: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'rfc' | 'tools' | 'cisco'>('all');
  const [search, setSearch] = useState<string>('');

  const filtered = CURATED_RESOURCES.filter((res) => {
    const matchesFilter = filter === 'all' || res.category === filter;
    const matchesSearch =
      res.titleFa.includes(search) ||
      res.titleEn.toLowerCase().includes(search.toLowerCase()) ||
      res.badge.toLowerCase().includes(search.toLowerCase()) ||
      res.descriptionFa.includes(search);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-20 md:pb-16 animate-in fade-in duration-200">
      {/* Foundational Attribution & Credit Banner */}
      <Card className="border-slate-300 dark:border-slate-800 bg-gradient-to-l from-net-blue/10 via-canvas-card to-canvas-card dark:from-net-blue/20 dark:via-canvas-card-dark dark:to-canvas-card-dark shadow-card p-6 md:p-8">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-net-blue text-white shadow-md shadow-net-blue/20 shrink-0 mt-1">
            <Award size={28} />
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge variant="blue" size="md">مرجع اصلی دوره و سرفصل‌ها</Badge>
              <Badge variant="slate" size="md">{FOUNDATIONAL_ATTRIBUTION.standard}</Badge>
            </div>

            <h2 className="text-2xl font-black text-ink-primary dark:text-ink-light mb-2">
              قدردانی و استناد علمی (Attribution)
            </h2>

            <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              {FOUNDATIONAL_ATTRIBUTION.descriptionFa}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600 dark:text-slate-400 pt-3 border-t border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400">مدرس جزوه:</span>
                <span className="text-net-blue font-bold">{FOUNDATIONAL_ATTRIBUTION.instructorFa}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400">گردآورنده:</span>
                <span className="text-ink-primary dark:text-ink-light">{FOUNDATIONAL_ATTRIBUTION.compilerFa}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400">منبع پایه:</span>
                <span className="text-ink-primary dark:text-ink-light">{FOUNDATIONAL_ATTRIBUTION.courseNameFa}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-extrabold text-ink-primary dark:text-ink-light flex items-center gap-2">
            <BookOpen size={20} className="text-net-blue" />
            <span>کتابخانه مراجع استاندارد و ابزارهای پیشنهادی</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            اسناد رسمی سازمان مهندسی اینترنت (IETF RFC)، استانداردهای سیسکو و ابزارهای تمرین عملی
          </p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="جستجو در مراجع و ابزارها..."
            className="w-full pr-8 pl-3 py-1.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-ink-primary dark:text-ink-light outline-none focus:border-net-blue"
          />
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              filter === 'all'
                ? 'bg-white dark:bg-slate-900 text-net-blue shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            همه مراجع
          </button>
          <button
            onClick={() => setFilter('rfc')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              filter === 'rfc'
                ? 'bg-white dark:bg-slate-900 text-net-blue shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            اسناد RFC
          </button>
          <button
            onClick={() => setFilter('tools')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              filter === 'tools'
                ? 'bg-white dark:bg-slate-900 text-net-blue shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            نرم‌افزارهای عملی
          </button>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((res) => (
          <Card key={res.id} variant="interactive" className="flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-3 mb-2.5">
                <div>
                  <Badge variant={res.category === 'rfc' ? 'blue' : res.category === 'tools' ? 'green' : 'purple'} size="sm" className="mb-1.5">
                    {res.badge}
                  </Badge>
                  <h4 className="font-bold text-base text-ink-primary dark:text-ink-light">
                    {res.titleFa}
                  </h4>
                </div>

                <a
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl text-slate-400 hover:text-net-blue hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
                  title="مشاهده سند رسمی"
                >
                  <ExternalLink size={18} />
                </a>
              </div>

              <span className="text-[11px] font-mono text-slate-500 ltr-text block mb-3 text-right">
                {res.titleEn}
              </span>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                {res.descriptionFa}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono ltr-text truncate max-w-[240px]">
                {res.url.replace(/^https?:\/\//, '')}
              </span>
              <a
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-net-blue hover:underline flex items-center gap-1"
              >
                <span>مطالعه سند</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
