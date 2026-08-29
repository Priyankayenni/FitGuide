import { useState } from 'react';
import { Play, Video, Clock, Signal } from 'lucide-react';
import type { Translation } from '@/lib/i18n';
import type { VideoTutorial } from '@/types';
import { videoTutorials } from '@/lib/videos';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface VideoTutorialsProps {
  t: Translation;
}

export function VideoTutorials({ t }: VideoTutorialsProps) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();
  const [activeVideo, setActiveVideo] = useState<VideoTutorial | null>(null);

  const categories = Array.from(new Set(videoTutorials.map((v) => v.category)));
  const [filter, setFilter] = useState<string>('all');

  const filtered = filter === 'all' ? videoTutorials : videoTutorials.filter((v) => v.category === filter);

  const levelColors: Record<string, string> = {
    Beginner: '#10b981',
    Intermediate: '#f59e0b',
    Advanced: '#ef4444',
  };

  return (
    <section id="videos" className="section-padding py-20 md:py-28">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/10 text-accent-600 dark:text-accent-400 mb-4">
            <Video className="w-4 h-4" />
            <span className="text-sm font-600">{t.videos.title}</span>
          </div>
          <h2 className="font-display font-700 text-4xl md:text-5xl tracking-tight">{t.videos.title}</h2>
          <p className="mt-3 text-neutral-500 dark:text-neutral-400 text-lg">{t.videos.subtitle}</p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-600 transition-all ${
              filter === 'all'
                ? 'bg-primary-500 text-white shadow-glow'
                : 'bg-neutral-100 dark:bg-ink-700 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-ink-600'
            }`}
          >
            {t.videos.all}
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-600 transition-all ${
                filter === cat
                  ? 'bg-primary-500 text-white shadow-glow'
                  : 'bg-neutral-100 dark:bg-ink-700 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-ink-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Video grid */}
        <div ref={ref} className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-6 ${visible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          {filtered.map((video, i) => (
            <button
              key={video.id}
              onClick={() => setActiveVideo(video)}
              className="card-surface overflow-hidden text-left group hover:shadow-cinematic transition-all duration-500 hover:-translate-y-1"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="relative h-44 overflow-hidden">
                <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full glass-strong flex items-center justify-center group-hover:scale-110 group-hover:bg-primary-500 transition-all duration-300">
                    <Play className="w-6 h-6 text-white group-hover:fill-white transition-all" />
                  </div>
                </div>
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded-full glass-strong text-2xs font-600">
                    <Clock className="w-3 h-3" />{video.duration}
                  </span>
                  <span
                    className="flex items-center gap-1 px-2.5 py-1 rounded-full text-2xs font-700"
                    style={{ backgroundColor: `${levelColors[video.level]}30`, color: levelColors[video.level] }}
                  >
                    <Signal className="w-3 h-3" />{video.level}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <span className="text-2xs font-600 text-primary-500 uppercase tracking-wider">{video.category}</span>
                <h3 className="font-display font-700 text-base mt-1 mb-1.5">{video.title}</h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">{video.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Video modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in" onClick={() => setActiveVideo(null)}>
          <div className="absolute inset-0 bg-ink-900/90 backdrop-blur-sm" />
          <div className="relative w-full max-w-3xl glass-strong rounded-3xl shadow-cinematic overflow-hidden animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <div className="relative aspect-video bg-ink-900 flex items-center justify-center">
              <img src={activeVideo.thumbnail} alt={activeVideo.title} className="w-full h-full object-cover opacity-40" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div className="w-20 h-20 rounded-full bg-primary-500 flex items-center justify-center shadow-glow-lg animate-pulse-glow">
                  <Play className="w-10 h-10 text-white fill-white" />
                </div>
                <p className="text-neutral-300 font-500 text-sm">{t.videos.comingSoon}</p>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xs font-600 text-primary-500 uppercase tracking-wider">{activeVideo.category}</span>
                <span className="flex items-center gap-1 text-2xs font-600 text-neutral-400"><Clock className="w-3 h-3" />{activeVideo.duration}</span>
                <span className="text-2xs font-700 px-2 py-0.5 rounded-full" style={{ backgroundColor: `${levelColors[activeVideo.level]}30`, color: levelColors[activeVideo.level] }}>{activeVideo.level}</span>
              </div>
              <h3 className="font-display font-700 text-xl mb-2">{activeVideo.title}</h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">{activeVideo.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
