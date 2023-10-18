export default function Wrapper(props: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className="pt-[1.5rem] border-b-[1px] border-zinc-700 sticky">
      <h2 className="text-3xl font-bold ml-[1.5rem]">{props.title}</h2>
      {props.children}
    </div>
  );
}
