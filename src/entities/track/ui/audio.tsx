import { forwardRef, useEffect, useState } from 'react';
import { API_URL } from '@shared/lib/constants';

type AudioProps = {
  fileName: string;
  onAudioReady?: () => void;
} & React.ComponentProps<'audio'>;

export const Audio = forwardRef<HTMLAudioElement, AudioProps>((props: AudioProps, ref) => {
  const { fileName, onAudioReady, ...restProps } = props;
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const response = await fetch(`${API_URL}files/${fileName}`);
        const blob = await response.blob();

        if (!response.ok) {
          throw new Error(`Failed to fetch ${fileName} file.`);
        }

        const url = URL.createObjectURL(blob);
        setAudioUrl(url);

        onAudioReady?.();
      } catch (e) {
        console.error(e);
      }
    };

    fetchTrack();
  }, [fileName, onAudioReady]);

  return (
    <>
      {audioUrl && (
        <audio src={audioUrl} {...restProps} ref={ref}>
          Your browser doesn't support audio
        </audio>
      )}
    </>
  );
});
