'use client';

import { useRef, useState } from 'react';
import {
  Play, Pause, Maximize, PictureInPicture2, Gauge, CheckCircle2,
} from 'lucide-react';

const SPEEDS = [0.75, 1, 1.25, 1.5, 2];

export default function VideoPlayer({
  title,
  onComplete,
}: {
  title: string;
  onComplete?: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [completed, setCompleted] = useState(false);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const cycleSpeed = () => {
    const next = SPEEDS[(SPEEDS.indexOf(speed) + 1) % SPEEDS.length];
    setSpeed(next);
    if (videoRef.current) videoRef.current.playbackRate = next;
  };

  const enterPiP = async () => {
    try {
      if (videoRef.current && document.pictureInPictureEnabled) {
        await videoRef.current.requestPictureInPicture();
      }
    } catch {
      /* PiP not supported in this environment — safe to ignore */
    }
  };

  const enterFullscreen = () => {
    videoRef.current?.requestFullscreen?.();
  };

  const markComplete = () => {
    setCompleted(true);
    onComplete?.();
  };

  return (
    <div className="overflow-hidden rounded-xl2 border border-line bg-ink shadow-card">
      <div className="relative aspect-video bg-ink">
        <video
          ref={videoRef}
          className="h-full w-full"
          poster="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80"
          onEnded={markComplete}
        >
          {/* Real deployments point this at the lesson's Cloudinary-hosted source */}
          <source src="" type="video/mp4" />
        </video>
        {!playing && (
          <button
            onClick={togglePlay}
            aria-label="Play video"
            className="absolute inset-0 flex items-center justify-center bg-ink/30 transition hover:bg-ink/40"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-brand shadow-lift">
              <Play size={26} className="ml-1" />
            </span>
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 bg-ink px-4 py-3 text-white">
        <div className="flex items-center gap-3">
          <button onClick={togglePlay} aria-label={playing ? 'Pause' : 'Play'} className="rounded-full bg-white/10 p-2 hover:bg-white/20">
            {playing ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <span className="text-sm text-white/80">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={cycleSpeed} className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-xs font-mono hover:bg-white/20">
            <Gauge size={13} /> {speed}×
          </button>
          <button onClick={enterPiP} aria-label="Picture in picture" className="rounded-full bg-white/10 p-2 hover:bg-white/20">
            <PictureInPicture2 size={15} />
          </button>
          <button onClick={enterFullscreen} aria-label="Fullscreen" className="rounded-full bg-white/10 p-2 hover:bg-white/20">
            <Maximize size={15} />
          </button>
          <button
            onClick={markComplete}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
              completed ? 'bg-sage text-white' : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            <CheckCircle2 size={14} />
            {completed ? 'Completed' : 'Mark complete'}
          </button>
        </div>
      </div>
    </div>
  );
}
