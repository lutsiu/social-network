import { useNavigate } from "react-router-dom";
import { UserType } from "../../../interfaces/models";

interface Props {
  user: UserType
}

export default function UserLink(props: Props) {
  const {user} = props;
  const navigate = useNavigate();
  return (
    <li className="w-full point">
      <div
      onClick={() => navigate(`/${user.userName}`)}
        className="w-full  flex h-full pl-[1rem] py-[1rem] duration-300 hover:bg-zinc-800"
      >
        <div className="w-[5rem] h-[5rem] rounded-full">
          <img
            src={`http://localhost:3000/${user.profileImg}`}
            alt="user avatar"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="h-[4rem] ml-[1rem]">
          <p className="text-xl font-semibold">{user.fullName}</p>
          <p className="mt-[0.3rem] text-xl text-gray-400">{user.userName}</p>
        </div>
      </div>
    </li>
  );
}
