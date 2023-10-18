import Tweet from "../../components/Widgets/Tweets/Tweet";
import { useEffect, useState } from "react";
import {
  UserType,
  TweetType,
  TweetAndUser,
  ReplyType,
} from "../../interfaces/models";
import { useSelector } from "react-redux";
import { ReduxState } from "../../interfaces/redux";
import { useLoaderData, useOutletContext } from "react-router-dom";
interface Props {
  showTweets?: boolean;
  showMedia?: boolean;
  showLikes?: boolean;
  showReplies?: boolean;
}

export default function ProfilePage(props: Props) {
  const { showTweets, showReplies, showLikes, showMedia } = props;
  const myUser = useSelector((state: ReduxState) => state.auth.user);
  const [tweetAndUser, setTweetAndUser] = useState<null | TweetAndUser[]>(null);
  const [repliesAndUser, setRepliesAndUser] = useState<
    null | { replyTweet: TweetType; userName: string }[]
  >(null);
  const data = useOutletContext();
  const { userData, isUserAccount } = data as {
    userData: UserType;
    isUserAccount: boolean;
  };
  
  useEffect(() => {
    async function fetchTweets() {
      try {
        if (showTweets || showMedia) {
          const res = await fetch(
            `http://localhost:3000/tweet/get-all-user-tweets/${
              userData._id 
            }`
          );
          if (!res.ok) {
            return setTweetAndUser(null);
          }
          const data = (await res.json()) as TweetAndUser[];
          setTweetAndUser(data);
        }
        if (showReplies) {
          const res = await fetch(
            `http://localhost:3000/tweet/get-all-user-replies/${
              userData._id 
            }`
          );
          if (!res.ok) {
            return setTweetAndUser(null);
          }
          const data = (await res.json()) as {
            replyTweet: TweetType;
            userName: string;
          }[];
          setRepliesAndUser(data);
        }
        if (showLikes) {
          const res = await fetch(
            `http://localhost:3000/tweet/get-all-user-likes/${
              userData._id 
            }`
          );
          if (!res.ok) {
            return setTweetAndUser(null);
          }
          const data = (await res.json()) as TweetAndUser[];
          setTweetAndUser(data);
        }
      } catch (err) {
        console.log(err);
      }
    }
    void fetchTweets();
  }, [userData, showTweets, showReplies, showLikes, showMedia]);

  let content = (
    <>
      {tweetAndUser &&
        tweetAndUser.length > 0 &&
        tweetAndUser.map((data, i) => {
          return <Tweet user={data.user} tweet={data.tweet} />;
        })}
      {!tweetAndUser && (
        <div className="text-center mt-[4rem] text-2xl">
          You didn't create any tweet. It's time to fix it :)
        </div>
      )}
    </>
  );
  if (showReplies) {
    content = (
      <>
        {repliesAndUser &&
          repliesAndUser.length > 0 &&
          repliesAndUser.map((data, i) => {
            return (
              <Tweet
                user={myUser!}
                tweet={data.replyTweet}
                toWhom={data.userName}
              />
            );
          })}
        {!tweetAndUser && (
          <div className="text-center mt-[4rem] text-2xl">
            You didn't create any tweet. It's time to fix it :)
          </div>
        )}
      </>
    );
  }
  if (showLikes) {
    content = (
      <>
        {tweetAndUser &&
          tweetAndUser.length > 0 &&
          tweetAndUser.map((data, i) => {
            return <Tweet user={data.user} tweet={data.tweet} />;
          })}
        {!tweetAndUser && (
          <div className="text-center mt-[4rem] text-2xl">
            You didn't create any tweet. It's time to fix it :)
          </div>
        )}
      </>
    );
  }
  if (showMedia) {
    content = (
      <>
        {tweetAndUser &&
          tweetAndUser.length > 0 &&
          tweetAndUser
            .filter((data) => data.tweet.images.length > 0)
            .map((data, i) => {
              return <Tweet user={data.user} tweet={data.tweet} />;
            })}
        {!tweetAndUser && (
          <div className="text-center mt-[4rem] text-2xl">
            You didn't create any tweet. It's time to fix it :)
          </div>
        )}
      </>
    );
  }

  return <div className="w-full">{content}</div>;
}
