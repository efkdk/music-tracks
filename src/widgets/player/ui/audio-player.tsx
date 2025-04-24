import { useAppSelector, useAppDispatch } from '@shared/lib/hooks';
import {
  pauseTrack,
  resumeTrack,
  setProgress,
  setVolume,
  playNextTrack,
  playPrevTrack,
  isFirstTrackSelector,
  isLastTrackSelector,
} from '@features/player';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@shared/ui/button';
import { Slider } from '@shared/ui/slider';
import { Audio, TrackImage } from '@entities/track';
import { Pause, Play, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { formatTime } from '@widgets/player/lib/helpers';

export const AudioPlayer = () => {
  const { currentTrack, isPlaying, volume, progress } = useAppSelector((state) => state.player);
  const [prevVolume, setPrevVolume] = useState<number>(0);

  const isLastTrack = useAppSelector(isLastTrackSelector);
  const isFirstTrack = useAppSelector(isFirstTrackSelector);

  const [isAudioReady, setIsAudioReady] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsAudioReady(false);
    }
  }, [currentTrack?.id]);

  useEffect(() => {
    if (!audioRef.current || !isAudioReady) return;

    const audio = audioRef.current;

    if (isPlaying) {
      audio.play().catch((err) => {
        console.warn('Play failed:', err);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying, isAudioReady]);

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    dispatch(setProgress(audioRef.current.currentTime));
  };

  const handleVolumeChange = (val: number[]) => {
    dispatch(setVolume(val[0]));
  };

  if (!currentTrack || !currentTrack.audioFile) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-2 sm:p-4 flex flex-col gap-4 sm:gap-6 z-50 h-[10rem] sm:h-[8rem] rounded-xl border text-card-foreground border-t shadow-lg bg-background/80 backdrop-blur-sm">
      <Audio
        ref={audioRef}
        fileName={currentTrack.audioFile}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => dispatch(playNextTrack())}
        onCanPlayThrough={() => {
          setIsAudioReady(true);
          if (isPlaying && audioRef.current) {
            audioRef.current.volume = volume;
            audioRef.current.play().catch(console.error);
          }
        }}
      />
      <div className="flex flex-wrap gap-2 justify-between items-center">
        <div className="flex gap-2 items-center">
          <TrackImage
            className="w-8 h-8 sm:w-12 sm:h-12"
            title={currentTrack.title}
            coverImage={currentTrack.coverImage}
          />
          <div>
            <p className="font-semibold sm:font-bold">{currentTrack.title}</p>
            <span> — </span>
            <span className="sm:font-semibold text-gray-500">{currentTrack.artist}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button disabled={isFirstTrack} onClick={() => dispatch(playPrevTrack())}>
            <SkipBack />
          </Button>
          <Button
            className="justify-self-center"
            onClick={() => dispatch(isPlaying ? pauseTrack() : resumeTrack())}
          >
            {isPlaying ? <Pause /> : <Play />}
          </Button>
          <Button disabled={isLastTrack} onClick={() => dispatch(playNextTrack())}>
            <SkipForward />
          </Button>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => {
              if (volume !== 0) {
                setPrevVolume(volume);
                dispatch(setVolume(0));
              } else {
                dispatch(setVolume(prevVolume));
              }
            }}
          >
            {volume !== 0 ? <Volume2 /> : <VolumeX />}
          </Button>
          <Slider
            value={[volume]}
            max={1}
            step={0.01}
            onValueChange={handleVolumeChange}
            className="w-[150px]"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="font-semibold">{formatTime(progress)}</span>
        <Slider
          value={[progress]}
          max={audioRef.current?.duration || 100}
          onValueChange={(val) => {
            if (audioRef.current) {
              dispatch(pauseTrack());
              audioRef.current.currentTime = val[0];
              dispatch(setProgress(val[0]));
            }
          }}
          onValueCommit={() => {
            if (audioRef.current) {
              dispatch(resumeTrack());
            }
          }}
        />
        <span className="font-semibold">{formatTime(audioRef.current?.duration)}</span>
      </div>
    </div>
  );
};
