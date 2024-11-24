const Spinner = () => {
  return (
    <div className="flex items-center h-[80vh]">
      <div className="flex space-x-2 justify-center items-center bg-gray-800/10 h-56 w-1/2 mx-auto">
        <span className="sr-only">Loading...</span>
        <div className="h-6 w-6 bg-custom-green rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-6 w-6 bg-custom-green rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-6 w-6 bg-custom-green rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

export default Spinner;
