import { HiArrowLeft } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header
      className="2xl:w-[43%] fixed 2xl:relative z-20 w-full h-[5rem] flex items-center gap-[2.4rem] 2xl:pt-[1rem] pl-[1rem] lg:py-[1rem]"
      style={{ background: "rgba(0,0,0,0.8)" }}
    >
      <div>
        <Link
          to="/home"
          className="p-[1rem] rounded-full block hover:bg-zinc-800 duration-300"
        >
          <HiArrowLeft className="text-3xl" />
        </Link>
      </div>
      <h2 className="text-3xl font-semibold">Tweet</h2>
    </header>
  );
}
