import { useEffect, useState } from 'react';
import { API_URL } from '@shared/lib/constants';

export const Audio = ({ fileName }: { fileName: string }) => {
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
      } catch (e) {
        console.error(e);
      }
    };

    fetchTrack();
  }, [fileName]);
  return (
    <>
      {audioUrl && (
        <audio controls src={audioUrl}>
          Your browser doesn't support audio
        </audio>
      )}
    </>
  );
};
