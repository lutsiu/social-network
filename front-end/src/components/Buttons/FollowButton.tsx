import { TweetType, UserType } from "../../interfaces/models";
import { ReduxState } from "../../interfaces/redux";
import { useSelector } from "react-redux";

interface Props{ 
  userData: UserType,
  handleFollowAccount: () => void,
  isFollowing: boolean
}

export default function FollowButton(props: Props) {
  const { userData, handleFollowAccount, isFollowing } = props;

  

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <button className="follow-button bg-white text-black w-[8rem] px-[1rem] py-[0.8rem] text-xl font-bold rounded-[4rem] duration-300 hover:bg-gray-300" onMouseDown={handleFollowAccount}>
      {isFollowing ? 'Following' : 'Follow'}
    </button>
  );
}
