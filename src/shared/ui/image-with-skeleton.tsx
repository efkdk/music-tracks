import { useState } from "react";

export const ImageWithSkeleton = ({
  src,
  alt,
  className,
  ...props
}: React.ComponentProps<"img">) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative ${className}`}>
      {!isLoaded && (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-200 animate-pulse rounded" />
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        {...props}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
};
