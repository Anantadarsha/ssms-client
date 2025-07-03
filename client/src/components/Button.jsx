import { useNavigate } from "react-router-dom";
import { FaArrowCircleRight } from "react-icons/fa";

const Button = (props) => {
  const navigate = useNavigate();
  return (
    <button
      className="w-fit h-10 p-2 rounded-lg text-white bg-blue-600 cursor-pointer hover:bg-blue-500 transition-colors"
      onClick={() => {
        navigate(props.onClick);
      }}
    >
      <div className="flex justify-center items-center gap-2">
        {props.title}
        <FaArrowCircleRight />
      </div>
    </button>
  );
};

export default Button;
