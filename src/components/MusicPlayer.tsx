import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, SkipForward, SkipBack, Volume2, Music, Disc } from 'lucide-react';

const TRACKS = [
  {
    id: 1,
    title: "Neon Lights",
    artist: "Cyber Synth",
    url: "https://cdn.pixabay.com/audio/2022/03/10/audio_c3629e924a.mp3",
    cover: "https://picsum.photos/seed/neon/400/400"
  },
  {
    id: 2,
    title: "System Hack",
    artist: "Neural Network",
    url: "https://cdn.pixabay.com/audio/2021/11/23/audio_0af79c3d4e.mp3",
    cover: "https://picsum.photos/seed/cyber/400/400"
  },
  {
    id: 3,
    title: "Void Runner",
    artist: "Retro Wave",
    url: "https://cdn.pixabay.com/audio/2022/01/21/audio_2287042a9b.mp3",
    cover: "https://picsum.photos/seed/retro/400/400"
  }
];

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const currentTrack = TRACKS[currentTrackIndex];

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setProgress(0);
    // Auto play if it was already playing
    if (isPlaying) {
      setTimeout(() => audioRef.current?.play(), 0);
    }
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setProgress(0);
    if (isPlaying) {
      setTimeout(() => audioRef.current?.play(), 0);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      if (duration) {
        setProgress((current / duration) * 100);
      }
    }
  };

  const handleEnded = () => {
    nextTrack();
  };

  // Visualizer bars (dummy)
  const bars = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    height: Math.random() * 100
  }));

  return (
    <div className="flex-1 flex items-center gap-10">
      <audio 
        ref={audioRef} 
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />

      {/* Playback Buttons */}
      <div className="flex items-center gap-5">
        <button 
          onClick={prevTrack}
          className="w-10 h-10 flex items-center justify-center border border-white/20 text-white hover:border-neon-primary transition-all"
        >
          <SkipBack size={18} />
        </button>
        <button 
          onClick={togglePlay}
          className="w-14 h-14 flex items-center justify-center border-2 border-neon-primary text-neon-primary hover:bg-neon-primary hover:text-black transition-all"
        >
          {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
        </button>
        <button 
          onClick={nextTrack}
          className="w-10 h-10 flex items-center justify-center border border-white/20 text-white hover:border-neon-primary transition-all"
        >
          <SkipForward size={18} />
        </button>
      </div>

      {/* Progress Area */}
      <div className="flex-1">
        <div className="flex justify-between text-[11px] mb-2 font-mono">
            <span className="neon-text-primary">
                {audioRef.current ? Math.floor(audioRef.current.currentTime / 60).toString().padStart(2, '0') : '00'}:
                {audioRef.current ? Math.floor(audioRef.current.currentTime % 60).toString().padStart(2, '0') : '00'}
            </span>
            <span className="text-[#555]">
                {audioRef.current && !isNaN(audioRef.current.duration) ? Math.floor(audioRef.current.duration / 60).toString().padStart(2, '0') : '00'}:
                {audioRef.current && !isNaN(audioRef.current.duration) ? Math.floor(audioRef.current.duration % 60).toString().padStart(2, '0') : '00'}
            </span>
        </div>
        <div className="h-1 bg-[#222] relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-neon-primary shadow-neon-primary"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Track Info */}
      <div className="text-right min-w-[200px]">
        <motion.div 
          key={currentTrack.title}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-sm font-bold text-white mb-1"
        >
          {currentTrack.title}
        </motion.div>
        <div className="text-[10px] text-[#555] uppercase tracking-[2px]">STREAMING NOW</div>
      </div>
    </div>
  );
}
