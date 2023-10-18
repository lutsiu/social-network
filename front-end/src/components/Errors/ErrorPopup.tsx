export default function ErrorPopup(props: { message: string }) {
  return (
    <div
      className="text-white text-2xl z-50 bg-purple-500 py-[1rem] px-[1.5rem] rounded-lg font-normal absolute md:bottom-[5rem] bottom-[0] left-[50%]"
      style={{ transform: "translateX(-50%)" }}
    >
      {props.message}
    </div>
  );
}
