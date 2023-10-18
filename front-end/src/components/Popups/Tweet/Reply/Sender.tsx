import { useSelector } from "react-redux";
import { ReduxState } from "../../../../interfaces/redux";

interface Props {
  reply: string;
  setReply: (char: string) => void;
}

export default function Sender(props: Props) {
  const {user} = useSelector((state: ReduxState) => state.auth);
  return (
    <div className="flex  w-full items-start ml-[1.3rem] mt-[1rem] pr-[1rem]">
      <div className="flex justify-center flex-[1]">
        <div className="w-[4rem] h-[4rem] mr-[2rem]">
          <img
            src={`http://localhost:3000/${user!.profileImg}`}
            alt="User's avatar"
            className="rounded-full h-full w-full object-cover"
          />
        </div>
      </div>
      <textarea
        className="flex-[9] text-white bg-transparent py-[1rem] text-3xl outline-none font-medium"
        placeholder="What is happening?!"
        rows={1}
        maxLength={200}
        value={props.reply}
        onChange={(e) => props.setReply(e.currentTarget.value)}
      />
    </div>
  );
}
