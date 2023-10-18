import HeaderButton from "../../Buttons/HeaderButton";
import Wrapper from "../../Wrappers/HeaderWrappers";
import CreateTweet from "../../Widgets/CreateTweet";
import Tweets from "../../Widgets/Tweets";
import useResponsive from "../../../hooks/useResponsive";
import Tweet from "../../Widgets/Tweets/Tweet";
import { useLoaderData } from "react-router-dom";
import { TweetType, UserType, TweetAndUser } from "../../../interfaces/models";
import {useState, useEffect} from 'react';
import Welcome from "./WelcomeToApp";
import { useSelector } from "react-redux";
import { ReduxState } from "../../../interfaces/redux";
import useTweet from "../../../hooks/useTweets";
export default function Home() {
  const usersAndTweets =
    (useLoaderData() as TweetAndUser[]) || [];

  const width = useResponsive();
  const [tweets, setTweets] = useState<TweetAndUser[]>(usersAndTweets);
  const myUser = useSelector((state: ReduxState) => state.auth.user);
  console.log(usersAndTweets);
  const updatedTweets = useTweet(tweets);
  return (
    <main className="min-h-[100vh] w-full border-x-[1px] border-zinc-700">
      {width >= 1400 && (
        <>
          <Wrapper title="Home">
            <div className="mt-[1.8rem]">
              <HeaderButton width={50} buttonIndex={0}>
                For you
              </HeaderButton>
              <HeaderButton width={50} buttonIndex={1}>
                Following
              </HeaderButton>
            </div>
          </Wrapper>
          <CreateTweet />
        </>
      )}
      {updatedTweets.length > 0 && (
        <ul>
          {updatedTweets
            .sort(
              (a, b) =>
                new Date(b.tweet.createdAt).getTime() -
                new Date(a.tweet.createdAt).getTime()
            )
            .map((tweet, i) => {
              return <Tweet key={i} {...updatedTweets[i]} />;
            })}
        </ul>
      )}
      {updatedTweets.length === 0 && <Welcome />}
    </main>
  );
}
