import { FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Socials = () => {
  return (
    <div className={"w-full flex justify-center items-center"}>
      <a
        className={"mr-10"}
        target="_blank"
        href="https://www.linkedin.com/in/christine-wangui-65468120a/"
      >
        {" "}
        <FaLinkedin color={"#B5179E"} size={32} />
      </a>
      <a
        className={"mr-10"}
        target="_blank"
        href="https://www.x.com/wangui_wamutitu/"
      >
        {" "}
        <FaSquareXTwitter color={"#B5179E"} size={32} />
      </a>
      <a target="_blank" href="mailto:wanguiwamutitu@gmail.com">
        {" "}
        <MdEmail color={"#B5179E"} size={32} />
      </a>
    </div>
  );
};

export default Socials;
