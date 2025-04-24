import { ReactNode } from 'react';

export const GenreBadge = ({ children }: { children: ReactNode }) => {
  return (
    <span className="inline-flex whitespace-nowrap items-center px-2 py-1 rounded-full text-sm font-medium bg-secondary text-secondary-foreground">
      {children}
    </span>
  );
};
