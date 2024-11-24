const LoadingError = () => {
  return (
    <div className="flex justify-center items-center py-6">
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">
          There was an error loading the bikes. Please try again later.
        </span>
      </div>
    </div>
  );
};

export default LoadingError;
