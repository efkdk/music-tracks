export const ErrorPage = () => {
  return (
    <div className="h-screen w-full flex flex-col gap-4 items-center justify-center">
      <span className="text-6xl font-bold text-red-400">500</span>
      <p className="text-xl text-center font-semibold max-w-xl">
        We encountered a problem while loading this page. Please refresh or come back later.
      </p>
    </div>
  );
};
