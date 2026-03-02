

const Spinner = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-50 bg-white bg-opacity-50">
      <div className="border-t-4 border-gold w-40 h-40 rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
