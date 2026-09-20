import * as React from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  Maximize2,
  CheckCircle2,
  Clock,
  QrCode,
  Truck,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

interface MandiVideoPlayerProps {
  darkMode?: boolean;
}

export const MandiVideoPlayer: React.FC<MandiVideoPlayerProps> = ({ darkMode = false }) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [isMuted, setIsMuted] = React.useState(true);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(10);
  const [activeSceneIndex, setActiveSceneIndex] = React.useState(0);

  const [viewMode, setViewMode] = React.useState<'video' | 'still'>('video');

  const scenes = [
    {
      id: 1,
      startTime: 0,
      endTime: 2.5,
      title: 'Tractor Queue & Wheat Delays',
      desc: 'Farmers sweating in long queues with wheat crop sacks under hot sun, facing 14+ hours of mandi delay.',
      icon: Clock,
      color: 'text-red-500 dark:text-red-400',
      badge: 'The Problem',
      badgeClass: 'bg-red-500/20 text-red-700 dark:text-red-300 border-red-500/40',
      activeBorder: 'border-red-500',
      activeBg: 'bg-red-50/70 dark:bg-red-950/40'
    },
    {
      id: 2,
      startTime: 2.5,
      endTime: 5.0,
      title: 'Guaranteed Mandi Slot Booking',
      desc: 'Farmer selects harvest date, grain mandi depot & reserved 1-hour arrival window on mobile phone.',
      icon: Sparkles,
      color: 'text-orange-500 dark:text-orange-400',
      badge: 'Step 1: Booking',
      badgeClass: 'bg-orange-500/20 text-orange-700 dark:text-orange-300 border-orange-500/40',
      activeBorder: 'border-orange-500',
      activeBg: 'bg-orange-50/70 dark:bg-orange-950/40'
    },
    {
      id: 3,
      startTime: 5.0,
      endTime: 7.5,
      title: 'Instant Verified QR Gate Token',
      desc: 'Tamper-proof digital pass #SP-7892 verified: Easy, fast & hassle-free arrival token for the farmer.',
      icon: QrCode,
      color: 'text-amber-500 dark:text-amber-400',
      badge: 'Step 2: Token',
      badgeClass: 'bg-amber-500/20 text-amber-800 dark:text-amber-300 border-amber-500/40',
      activeBorder: 'border-amber-500',
      activeBg: 'bg-amber-50/70 dark:bg-amber-950/40'
    },
    {
      id: 4,
      startTime: 7.5,
      endTime: 10.0,
      title: 'Book. Drive. Sell. (Smart Farming)',
      desc: 'Direct weighbridge check-in, automated crane unloading & 100% MSP credited straight to farmer bank account.',
      icon: Truck,
      color: 'text-emerald-600 dark:text-emerald-400',
      badge: 'Step 3: Direct Sale',
      badgeClass: 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/40',
      activeBorder: 'border-emerald-500',
      activeBg: 'bg-emerald-50/70 dark:bg-emerald-950/40'
    }
  ];

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      if (video.duration && !isNaN(video.duration)) {
        setDuration(video.duration);
      }
      // Calculate current scene
      const foundIdx = scenes.findIndex(
        (s) => video.currentTime >= s.startTime && video.currentTime < s.endTime
      );
      if (foundIdx !== -1 && foundIdx !== activeSceneIndex) {
        setActiveSceneIndex(foundIdx);
      }
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [activeSceneIndex, scenes]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const jumpToScene = (startTime: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = startTime;
    if (video.paused) {
      video.play().catch(() => {});
    }
  };

  const handleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.requestFullscreen) {
      video.requestFullscreen();
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-8 sm:mt-12">
      <div
        className={`relative rounded-3xl overflow-hidden border shadow-2xl transition-all ${
          darkMode
            ? 'bg-neutral-950 border-neutral-800 shadow-emerald-950/20'
            : 'bg-white border-emerald-200/90 shadow-xl'
        }`}
      >
        {/* Top Header Bar with Red, Orange, and Yellow highlights */}
        <div
          className={`px-5 py-3.5 border-b flex items-center justify-between flex-wrap gap-2 ${
            darkMode
              ? 'bg-gradient-to-r from-neutral-950 via-emerald-950 to-neutral-950 border-neutral-800'
              : 'bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-white border-emerald-950'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-600 text-white shadow-xs">
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              <span>LIVE VIDEO</span>
            </span>
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-amber-400">
              SmartProcure Mandi Walkthrough
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Toggle (Live Video vs High-Res Mandi Capture) */}
            <div className="inline-flex rounded-lg p-0.5 bg-black/40 border border-white/10 text-xs">
              <button
                type="button"
                onClick={() => setViewMode('video')}
                className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer ${
                  viewMode === 'video'
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 shadow-xs'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                Motion Video
              </button>
              <button
                type="button"
                onClick={() => setViewMode('still')}
                className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer ${
                  viewMode === 'still'
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 shadow-xs'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                High-Res Photo
              </button>
            </div>
          </div>
        </div>

        {/* Video Player Box */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden group">
          {viewMode === 'video' ? (
            <video
              ref={videoRef}
              src="/smartprocure-live.mp4"
              poster="/pexels-hson-32954665.jpg"
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            />
          ) : (
            <img
              src="/pexels-hson-32954665.jpg"
              alt="Live grain procurement depot and harvest operations"
              className="w-full h-full object-cover"
            />
          )}

          {/* Controls Bar Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none flex flex-col justify-between p-4 sm:p-6">
            <div className="flex justify-between items-center pointer-events-auto">
              <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-amber-300 text-xs font-bold border border-amber-400/30 shadow-md">
                Scene {activeSceneIndex + 1} of 4: {scenes[activeSceneIndex]?.title}
              </span>

              <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-emerald-300 text-xs font-bold border border-emerald-400/30">
                Official MSP Procurement Facility
              </span>
            </div>

            {/* Bottom Scrubber & Buttons */}
            <div className="pointer-events-auto space-y-2">
              {/* Progress Bar with vibrant Red-Orange-Yellow gradient */}
              <div
                className="w-full h-2 bg-white/20 rounded-full cursor-pointer overflow-hidden"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pos = (e.clientX - rect.left) / rect.width;
                  if (videoRef.current) {
                    videoRef.current.currentTime = pos * (duration || 10);
                  }
                }}
              >
                <div
                  className="h-full bg-gradient-to-r from-red-500 via-orange-500 to-amber-400 rounded-full transition-all shadow-xs"
                  style={{ width: `${((currentTime || 0) / (duration || 10)) * 100}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-white text-xs">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors cursor-pointer"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 text-amber-300" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => jumpToScene(0)}
                    className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors cursor-pointer"
                    aria-label="Replay from start"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    onClick={toggleMute}
                    className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors cursor-pointer"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4 text-emerald-400" />}
                  </button>

                  <span className="font-mono text-xs font-bold text-amber-300">
                    00:0{Math.floor(currentTime)} / 00:10
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleFullscreen}
                    className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors cursor-pointer"
                    aria-label="Fullscreen"
                  >
                    <Maximize2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scene Steps Bar (Directly beneath video with impactful colors) */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x border-t transition-colors ${
            darkMode
              ? 'bg-neutral-950 divide-neutral-800 border-neutral-800 text-white'
              : 'bg-white divide-slate-100 border-slate-200 text-slate-900'
          }`}
        >
          {scenes.map((s, idx) => {
            const Icon = s.icon;
            const isActive = activeSceneIndex === idx;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => jumpToScene(s.startTime)}
                className={`p-3.5 sm:p-4 text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? `${s.activeBg} border-b-3 md:border-b-0 md:border-t-3 ${s.activeBorder} shadow-sm`
                    : 'hover:bg-black/5 dark:hover:bg-white/5 opacity-80 hover:opacity-100'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded border ${s.badgeClass}`}>
                      {s.badge}
                    </span>
                    <Icon className={`h-4 w-4 ${s.color}`} />
                  </div>
                  <div className="font-bold text-xs sm:text-sm mt-1">{s.title}</div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed font-medium">
                    {s.desc}
                  </p>
                </div>

                <div className="mt-2.5 flex items-center justify-between text-[10px] font-semibold text-slate-400">
                  <span>0{Math.floor(s.startTime)}s - 0{Math.floor(s.endTime)}s</span>
                  {isActive && (
                    <span className={`font-black flex items-center gap-1 ${s.color}`}>
                      <CheckCircle2 className="h-3 w-3" /> Active
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
