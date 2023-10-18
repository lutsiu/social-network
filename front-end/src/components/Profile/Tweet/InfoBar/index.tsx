interface Props {
  retweets: number,
  likes: number,
  bookmarks: number
}
export default function InfoBar(props: Props) {
  const {retweets, likes, bookmarks} = props;
  return (
    <div className="flex gap-[2rem] text-stone-400 sm:text-2xl text-xl mt-[2rem] pb-[2rem] border-b-[1px] border-b-zinc-700">
      <div>
        <span className="text-white font-semibold">{retweets}</span>
        <span className="ml-[0.4rem]">Retweets</span>
      </div>
      <div>
        <span className="text-white font-semibold">{likes}</span>
        <span className="ml-[0.4rem]">Likes</span>
      </div>
      <div>
        <span className="text-white font-semibold">{bookmarks}</span>
        <span className="ml-[0.4rem]">Bookmarks</span>
      </div>
    </div>
  )
}