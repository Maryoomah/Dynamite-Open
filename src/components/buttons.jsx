

    function Button({ text, variant = "primary", onClick, type = "button" }) {
  const baseStyle =
    "px-6 py-3 text-lg rounded-lg cursor-pointer transition-all";

  const variants = {
    primary: "bg-green-800 text-yellow-400 font-bold hover:bg-green-600 hover:text-white",
    secondary:
      "bg-transparent border border-white text-white hover:bg-white hover:text-green-900",
  };

  return (
    <button type={type}
      onClick={onClick} className={`${baseStyle} ${variants[variant]}`}>
      {text}
    </button>
  );
}

export default Button;