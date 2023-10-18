interface Props {
  children: React.ReactNode,
  step: number,
  title: string,
}

export default function Wrapper(props: Props) {
  return (
    <div className="w-[35%] mx-auto mt-[5rem] bg-gray-900 p-[2rem] h-[80%] rounded-2xl flex flex-col items-center">
      <p className="text-xl mb-[1rem]">Step {props.step} of 3</p>
      <h1 className="text-4xl font-medium text-center mb-[3rem]">
        {props.title}
      </h1>
      {props.children}
    </div>
  );
}
