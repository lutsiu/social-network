import { TweetType, UserType } from "../../../../interfaces/models";

export default function Recipient(props: { user: UserType; tweet: TweetType }) {
  const { user, tweet } = props;

  const currentDate = new Date();
  const tweetDate = new Date(tweet.createdAt);
  const hoursGap = (Math.abs(currentDate.getTime() - tweetDate.getTime()) / 1000 / 60 / 60);
  let time;

  if (hoursGap > 24) {
    const days = Math.floor(hoursGap / 24);
    time = `${days}d`;
  }

  if (hoursGap < 24 && hoursGap >= 1) {
    time = `${Math.floor(hoursGap)}h`
  }
  if (hoursGap < 1) {
    const minutes = Math.floor(hoursGap * 60);
    time = `${minutes}m`
  }

  return (
    <div className="flex ml-[0.4rem] mt-[2rem] items-start ">
      <div className="flex-[1] flex flex-col items-center">
        <div className="w-[4rem] h-[4rem]">
          <img
            src={`http://localhost:3000/${user.profileImg}`}
            alt="User's avatar"
            className="rounded-full h-full w-full object-cover"
          />
        </div>
        <div className="w-[1px] bg-zinc-600 h-[8rem] mt-[0.5rem]"></div>
      </div>
      <div className="flex items-start flex-[9] flex-col ml-[1rem]">
        <div className="flex items-center">
          <h3 className="text-2xl font-bold">{user.fullName}</h3>
          <div className="ml-[0.5rem] flex items-start gap-[0.5rem] text-zinc-500">
            <span className="text-2xl  font-medium">@{user.userName}</span>
            <span className=" text-xl font-semibold">·</span>
            <span className="text-2xl">{time}</span>
          </div>
        </div>
        <p className="text-2xl mt-[0.3rem]">
          {tweet.description.slice(0, 200)}
        </p>
        <div className="mt-[1.5rem]">
          <span className="text-zinc-500 text-2xl">Replying to</span>
          <span className="ml-[0.3rem] text-2xl text-purple-500">
            @{user.userName}
          </span>
        </div>
      </div>
    </div>
  );
}
