export default function FollowingGroup(props: {
  following: number;
  followers: number;
}) {
  return (
    <div className="flex gap-[2rem]">
      <div>
        <span className="sm:text-2xl text-xl font-bold">{props.following}</span>
        <span className="text-zinc-500 ml-[0.3rem] sm:text-2xl text-xl">Following</span>
      </div>
      <div>
        <span className="sm:text-2xl text-xl font-bold">{props.followers}</span>
        <span className="text-zinc-500 ml-[0.3rem] sm:text-2xl text-xl">Followers</span>
      </div>
    </div>
  );
}
