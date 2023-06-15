import { BsFillChatLeftDotsFill } from "react-icons/bs";

const Loader = () => (
  <div className="flex justify-center items-center">
    <BsFillChatLeftDotsFill size={100} className="animate-pulse text-6xl text-[#00B8C4] mt-4" />
  </div>
);

export default Loader;
