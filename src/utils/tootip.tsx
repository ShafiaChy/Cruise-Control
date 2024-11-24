import { ReactNode, useState } from "react";

interface TooltipProps {
  children: ReactNode;
  text: string;
}

const Tooltip: React.FC<TooltipProps> = ({ children, text }) => {
  const [show, setShow] = useState(false);

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div className="absolute top-full left-1/3 transform translate-x-1/8 mt-0 px-2 py-1 text-sm bg-transparent text-white w-36">
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
