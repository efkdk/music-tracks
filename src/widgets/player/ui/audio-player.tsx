import { useAppSelector, useAppDispatch } from '@app/store';
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
import { Audio } from '@entities/track';

export const AudioPlayer = () => {
  const { currentTrack, isPlaying, volume, progress } = useAppSelector((state) => state.player);

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
    <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow flex flex-col gap-2 z-50">
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
      <div className="flex justify-between items-center">
        <div className="text-sm font-semibold">
          {currentTrack.title} — {currentTrack.artist}
        </div>
        <div className="flex gap-2">
          <Button disabled={isFirstTrack} onClick={() => dispatch(playPrevTrack())}>
            ⏮
          </Button>
          <Button onClick={() => dispatch(isPlaying ? pauseTrack() : resumeTrack())}>
            {isPlaying ? '⏸' : '▶️'}
          </Button>
          <Button disabled={isLastTrack} onClick={() => dispatch(playNextTrack())}>
            ⏭
          </Button>
        </div>
        <Slider
          defaultValue={[volume]}
          max={1}
          step={0.01}
          onValueChange={handleVolumeChange}
          className="w-[150px]"
        />
      </div>
      <Slider
        value={[progress]}
        max={audioRef.current?.duration || 100}
        onValueChange={(val) => {
          if (audioRef.current) {
            audioRef.current.currentTime = val[0];
            dispatch(setProgress(val[0]));
          }
        }}
      />
    </div>
  );
};
