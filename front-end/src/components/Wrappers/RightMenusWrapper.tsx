
interface Props {
  children: React.ReactNode;
  title: string
}

export default function Wrapper(props: Props) {

  return (
    <div className="w-full h-fit bg-neutral-900 rounded-3xl mt-[1.7rem] py-[1.3rem] ">
      <h2 className="ml-[1.8rem] text-3xl font-bold">{props.title}</h2>
      {props.children}
    </div>
  )
}