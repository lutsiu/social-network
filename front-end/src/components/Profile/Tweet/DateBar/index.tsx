import months from "../../../../utils/months";
interface Props {
  views: number;
  createdAt: string
}

export default function DateBar(props: Props) {

  const {views, createdAt} = props;

  const date = new Date(createdAt);

  const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}`: date.getMinutes();  
  const hours = date.getHours();
  const day = date.getDate();
  const month = months[date.getMonth() + 1];
  const year = date.getFullYear();
  return (
    <div className="mt-[2rem] text-stone-400 text-2xl flex gap-[0.4rem] border-b-[1px] border-b-zinc-700 pb-[2rem] flex-wrap">
      <div className="flex gap-[0.4rem]">
        <span>{hours}:{minutes}</span>
        <span>·</span>
        <span>{month.slice(0,3)}, {day}, {year}</span>
        <span>·</span>
      </div>
      <div className="flex gap-[0.4rem]">
        <span className="text-white font-semibold">{views}</span>
        <span>Views</span>
      </div>
    </div>
  );
}
