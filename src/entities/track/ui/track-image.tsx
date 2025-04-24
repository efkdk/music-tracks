import { ImageWithSkeleton } from '@shared/ui/image-with-skeleton';

export const TrackImage = ({
  coverImage,
  title,
  className,
}: {
  title: string;
  coverImage?: string;
  className?: string;
}) => {
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
