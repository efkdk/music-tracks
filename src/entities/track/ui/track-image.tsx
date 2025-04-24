import { FC } from 'react';
import { ImageWithSkeleton } from '@shared/ui/image-with-skeleton';

type TrackImageProps = {
  title: string;
  coverImage?: string;
  className?: string;
};

export const TrackImage: FC<TrackImageProps> = ({ coverImage, title, className }) => {
  return (
    <ImageWithSkeleton
      src={coverImage || '/default-cover.png'}
      onError={(e) => {
        (e.target as HTMLImageElement).src = '/default-cover.png';
      }}
      alt={title}
      className={`flex-shrink-0 flex-grow-0 object-cover ${className ? className : ''}`}
    />
  );
};
