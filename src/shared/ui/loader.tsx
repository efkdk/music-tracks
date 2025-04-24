import { Music } from 'lucide-react';

export function Loader({ className }: { className?: string }) {
  return (
    <div
      data-testid="loading-tracks"
      className={`flex flex-col items-center justify-center min-h-[400px] animate-pulse ${className ? className : ''}`}
    >
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
        <div className="absolute inset-0 border-4 border-t-primary rounded-full animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Music className="w-8 h-8 text-primary animate-bounce" />
        </div>
      </div>
      <p className="mt-4 text-lg font-medium text-muted-foreground">Loading tracks...</p>
    </div>
  );
}
