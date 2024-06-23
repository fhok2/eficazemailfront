const LoadingScreen = () => {
  return (
    <div className="animate-pulse flex flex-col items-center gap-4 w-screen h-screen justify-center">
      <div className="w-full gap-x-2 flex justify-center items-center">
        <div className="w-5 bg-gradient-accent-gbv h-5 rounded-full animate-bounce"></div>
        <div className="w-5 h-5 animate-pulse bg-border-primary rounded-full animate-bounce"></div>
        <div className="w-5 h-5 bg-primary rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
