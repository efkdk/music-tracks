import { ImageWithSkeleton } from '@shared/ui/image-with-skeleton';

export const TrackImage = ({ coverImage, title }: { coverImage?: string; title: string }) => {
  return (
    <ImageWithSkeleton
      src={coverImage || '/default-cover.png'}
      onError={(e) => {
        (e.target as HTMLImageElement).src = '/default-cover.png';
      }}
      alt={title}
      className="flex-shrink-0 flex-grow-0 w-32 h-32 object-cover"
    />
  );
};
