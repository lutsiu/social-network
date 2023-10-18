import ThreeDots from "../ThreeDots";



export default function Trend(props: {trend: string}) {


  return (
    <li className="w-full duration-300 hover:bg-zinc-800 relative">
      <div
        className="w-full flex justify-between items-center py-[1rem] px-[1.8rem]"
      >
        <div>
          <p className="text-xl text-zinc-400">Trending in Poland</p>
          <p className="text-2xl font-semibold">{props.trend}</p>
        </div>
        <ThreeDots />
      </div>
      
    </li>
  );
}
