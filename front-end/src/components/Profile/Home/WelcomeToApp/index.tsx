
export default function Welcome() {
  return (
    <div className="flex flex-col items-start justify-center pt-[3rem] w-[60%] mx-auto">
      <h2 className="font-bold text-5xl" style={{lineHeight: '1.4'}}>Welcome to Lutsiu.App!</h2>
      <p className="text-zinc-500 text-2xl mt-[1rem]">
        This is the best place to see what’s happening in your world. Find some
        people and topics to follow now.
      </p>
      <div className="mt-[2.5rem] py-[1.5rem] px-[3.3rem] bg-purple-500 text-white font-semibold text-2xl rounded-[4rem]">Let's go!</div>
    </div>
  );
}
