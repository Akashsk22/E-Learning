import { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { motion } from 'framer-motion';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Settings,
  SkipBack,
  SkipForward
} from 'lucide-react';

interface VideoPlayerProps {
  url: string;
  title: string;
  onProgress?: (progress: number) => void;
  onComplete?: () => void;
}

const VideoPlayer = ({ url, title, onProgress, onComplete }: VideoPlayerProps) => {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [seeking, setSeeking] = useState(false);
  const [ready, setReady] = useState(false);
  const [controlsTimeout, setControlsTimeout] = useState<NodeJS.Timeout | null>(null);
  const playerRef = useRef<ReactPlayer>(null);

  // Reset playing state when URL changes
  useEffect(() => {
    setPlaying(false);
    setPlayed(0);
    setReady(false);
    setShowControls(true);
  }, [url]);

  // Auto-hide controls after 3 seconds of inactivity
  useEffect(() => {
    if (playing && showControls) {
      const timeout = setTimeout(() => {
        setShowControls(false);
      }, 3000);
      setControlsTimeout(timeout);
    }
    return () => {
      if (controlsTimeout) {
        clearTimeout(controlsTimeout);
      }
    };
  }, [playing, showControls]);

  const showControlsTemporarily = () => {
    setShowControls(true);
    if (controlsTimeout) {
      clearTimeout(controlsTimeout);
    }
  };

  const handlePlayPause = () => {
    if (ready) {
      setPlaying(!playing);
      showControlsTemporarily();
    }
  };

  const handleVideoClick = () => {
    handlePlayPause();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setMuted(newVolume === 0);
    showControlsTemporarily();
  };

  const handleMute = () => {
    setMuted(!muted);
    showControlsTemporarily();
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setPlayed(newTime);
    setSeeking(true);
    if (playerRef.current) {
      playerRef.current.seekTo(newTime);
    }
    showControlsTemporarily();
  };

  const handleProgress = (state: { played: number; playedSeconds: number }) => {
    if (!seeking) {
      setPlayed(state.played);
      onProgress?.(state.played * 100);
    }
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  const handleEnded = () => {
    setPlaying(false);
    setPlayed(0);
    setShowControls(true);
    onComplete?.();
  };

  const handleReady = () => {
    setReady(true);
  };

  const handleError = (error: any) => {
    console.error('Video player error:', error);
    setPlaying(false);
    setReady(false);
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const skipTime = (seconds: number) => {
    if (playerRef.current && ready) {
      const currentTime = playerRef.current.getCurrentTime();
      const newTime = Math.max(0, Math.min(currentTime + seconds, duration));
      playerRef.current.seekTo(newTime);
    }
    showControlsTemporarily();
  };

  return (
    <div className="relative bg-black rounded-lg overflow-hidden group">
      {/* Video Player */}
      <div className="relative aspect-video">
        <ReactPlayer
          ref={playerRef}
          url={url}
          playing={playing}
          volume={muted ? 0 : volume}
          played={played}
          onProgress={handleProgress}
          onDuration={handleDuration}
          onEnded={handleEnded}
          onReady={handleReady}
          onError={handleError}
          onSeek={() => setSeeking(false)}
          onSeekStart={() => setSeeking(true)}
          width="100%"
          height="100%"
          style={{ objectFit: 'cover' }}
          config={{
            youtube: {
              playerVars: {
                modestbranding: 1,
                controls: 0,
                rel: 0,
                showinfo: 0,
                enablejsapi: 1,
                origin: window.location.origin,
                disablekb: 1,
              },
            },
            file: {
              attributes: {
                controlsList: 'nodownload',
              },
            },
          }}
        />

        {/* Clickable Overlay for Play/Pause */}
        <div 
          className="absolute inset-0 cursor-pointer"
          onClick={handleVideoClick}
          onMouseMove={showControlsTemporarily}
          onMouseEnter={showControlsTemporarily}
        />

        {/* Video Title */}
        <div className="absolute top-4 left-4 right-4 z-10">
          <h3 className="text-white text-lg font-semibold drop-shadow-lg">
            {title}
          </h3>
        </div>

        {/* Center Play Button */}
        {!playing && ready && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            onClick={handlePlayPause}
            className="absolute inset-0 flex items-center justify-center z-20"
          >
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
              <Play className="w-8 h-8 text-white" />
            </div>
          </motion.button>
        )}

        {/* Loading State */}
        {!ready && (
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
              <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        )}

        {/* Bottom Controls */}
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: showControls ? 0 : 100 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 z-30"
          onMouseEnter={showControlsTemporarily}
          onMouseLeave={() => {
            if (playing) {
              const timeout = setTimeout(() => {
                setShowControls(false);
              }, 3000);
              setControlsTimeout(timeout);
            }
          }}
        >
          {/* Progress Bar */}
          <div className="mb-3">
            <input
              type="range"
              min={0}
              max={1}
              step={0.001}
              value={played}
              onChange={handleSeek}
              className="w-full h-1 bg-white/30 rounded-full appearance-none cursor-pointer slider"
            />
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handlePlayPause}
                disabled={!ready}
                className={`transition-colors duration-200 ${
                  ready 
                    ? 'text-white hover:text-primary-400' 
                    : 'text-white/50 cursor-not-allowed'
                }`}
              >
                {playing ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </button>

              <button
                onClick={() => skipTime(-10)}
                disabled={!ready}
                className={`transition-colors duration-200 ${
                  ready 
                    ? 'text-white hover:text-primary-400' 
                    : 'text-white/50 cursor-not-allowed'
                }`}
              >
                <SkipBack className="w-5 h-5" />
              </button>

              <button
                onClick={() => skipTime(10)}
                disabled={!ready}
                className={`transition-colors duration-200 ${
                  ready 
                    ? 'text-white hover:text-primary-400' 
                    : 'text-white/50 cursor-not-allowed'
                }`}
              >
                <SkipForward className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleMute}
                  className="text-white hover:text-primary-400 transition-colors duration-200"
                >
                  {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.1}
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-16 h-1 bg-white/30 rounded-full appearance-none cursor-pointer slider"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-white text-sm">
                {formatTime(played * duration)} / {formatTime(duration)}
              </span>
              
              <button className="text-white hover:text-primary-400 transition-colors duration-200">
                <Settings className="w-5 h-5" />
              </button>
              
              <button className="text-white hover:text-primary-400 transition-colors duration-200">
                <Maximize className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
        }
        
        .slider::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default VideoPlayer; 