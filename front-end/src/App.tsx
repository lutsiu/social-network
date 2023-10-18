import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";
import HomePage from "./pages/Home";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "./interfaces/redux";
import RestorePassword from "./pages/Login/restore-password";
import TweetPage from "./pages/Tweet";
import MainWrapperBigScreens from "./components/Wrappers/MainWrapper";
import ExplorePage from "./pages/Explore";
import ProfileWrapper from "./components/Profile/Profile/Wrappers";
import ProfileResponsiveWrapper from "./components/Profile/Profile/Wrappers/Responsive";
import ProfilePage from "./pages/Profile";
// responsive design
import useResponsive from "./hooks/useResponsive";
import MainWrapperResponsive from "./components/ResponsiveDesign/MainWrapper";
import HomeHeaderResponsive from "./components/ResponsiveDesign/Headers/HomeHeader";
import SearchHeaderResponsive from "./components/ResponsiveDesign/Headers/SearchHeader";
import ResponsiveTweet from "./components/Profile/Tweet/ResponsiveTweet";
import { UserType, TweetType } from "./interfaces/models";
import {  useCallback } from "react";
import ErrorPage from "./pages/Error";
import { setChangeProfile } from "./state/auth";

export default function App() {
  const isAuth = Boolean(useSelector((state: ReduxState) => state.auth.token));
  const getUser = useCallback((state: ReduxState) => state.auth.user, []);
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const width = useResponsive();
  const router = createBrowserRouter([
    { index: true, element: !isAuth ? <LoginPage /> : <Navigate to="/home" /> },
    { path: "/signup", element: <SignupPage /> },
    { path: "/restore-password", element: <RestorePassword /> },
    {
      path: "/home",
      errorElement: <ErrorPage />,
      element:
        width >= 1400 ? (
          <MainWrapperBigScreens
            searchBar={true}
            trends={true}
            whoToFollow={true}
          />
        ) : (
          <MainWrapperResponsive trends={true} whoToFollow={true}>
            <HomeHeaderResponsive />
          </MainWrapperResponsive>
        ),

      children: [
        {
          index: true,
          element: isAuth ? <HomePage /> : <Navigate to="/" />,
          errorElement: <ErrorPage />,
          loader: async () => {
            try {
              const resUserTweets = await fetch(
                `http://localhost:3000/tweet/get-all-user-tweets/${
                  user?._id as string
                }`
              );

              const resFollowingTweets = await fetch(
                `http://localhost:3000/tweet/get-all-following-tweets/${
                  user?._id as string
                }`
              );
              if (
                resUserTweets.status === 404 &&
                resFollowingTweets.status === 404
              ) {
                return [];
              }
              if (
                resUserTweets.status === 200 &&
                resFollowingTweets.status === 404
              ) {
                const userTweets = (await resUserTweets.json()) as {
                  user: UserType;
                  tweet: TweetType;
                }[];
                return userTweets;
              }
              if (
                resUserTweets.status === 404 &&
                resFollowingTweets.status === 200
              ) {
                const followingTweets = (await resFollowingTweets.json()) as {
                  user: UserType;
                  tweet: TweetType;
                }[];
                return followingTweets;
              }
              if (
                resUserTweets.status === 200 &&
                resFollowingTweets.status === 200
              ) {
                const userTweets = (await resUserTweets.json()) as {
                  user: UserType;
                  tweet: TweetType;
                }[];
                const followingTweets = (await resFollowingTweets.json()) as {
                  user: UserType;
                  tweet: TweetType;
                }[];
                return [...userTweets, ...followingTweets];
              }
            } catch (err) {
              throw new Error(err as never);
            }
          },
        },
      ],
    },
    {
      path: "/explore",
      element:
        width >= 1400 ? (
          <MainWrapperBigScreens
            searchBar={false}
            trends={false}
            whoToFollow={true}
          />
        ) : (
          <MainWrapperResponsive whoToFollow={true}>
            <SearchHeaderResponsive />
          </MainWrapperResponsive>
        ),
      children: [
        {
          index: true,
          element: isAuth ? <ExplorePage /> : <Navigate to="/" />,
        },
      ],
    },
    {
      path: "/:userName/status/:tweetId",
      element:
        width > 1400 ? (
          <MainWrapperBigScreens
            searchBar={true}
            trends={true}
            whoToFollow={true}
          />
        ) : (
          <ResponsiveTweet />
        ),
      children: [
        {
          index: true,
          element: isAuth ? <TweetPage /> : <Navigate to="/" />,
          loader: async ({ params }) => {
            try {
              const { userName, tweetId } = params;
              const resProfile = await fetch(
                `http://localhost:3000/profile/${userName as string}`
              );
              const resTweet = await fetch(
                `http://localhost:3000/tweet/${tweetId as string}`
              );
              const resReplies = await fetch(
                `http://localhost:3000/tweet/get-replies/${tweetId as string}`
              );
              if (!resProfile.ok || !resTweet.ok) {
                throw new Error("Account doesn't exist");
              }
              const user = (await resProfile.json()) as UserType;
              const tweet = (await resTweet.json()) as TweetType;
              let replies;
              if (resReplies.status === 404 || resReplies.status === 304) {
                ("");
              }
              if (resReplies.ok) {
                replies = (await resReplies.json()) as {
                  reply: TweetType[];
                  user: UserType;
                };
              }
              return { user, tweet, replies };
            } catch (err) {
              throw new Error("Something went wrong");
            }
          },
        },
      ],
    },

    {
      path: "/:profile",
      element:
        width >= 1400 ? <ProfileWrapper /> : <ProfileResponsiveWrapper />,
      errorElement: <ErrorPage />,
      loader: async ({ params }) => {
        try {
          const { profile } = params;
          // check whether account is matching with user account
          const isUserAccount = profile === user?.userName;
          // get a profile data
          const res = await fetch(
            `http://localhost:3000/profile/${profile as string}`
          );

          if (!res.ok) {
            throw new Error("Account doesn't exist");
          }
          const userData = (await res.json()) as UserType;
          if (userData._id === user?._id) {
            dispatch(setChangeProfile({profileImg: userData.profileImg, fullName: userData.fullName}));
          }
          return { isUserAccount, userData };
        } catch {
          throw new Error("Account doesn't exist");
        }
      },
      children: [
        {
          index: true,
          element: isAuth ? (
            <ProfilePage showTweets={true} />
          ) : (
            <Navigate to="/" />
          ),
        },
        {
          path: "replies",
          element: isAuth ? (
            <ProfilePage showReplies={true} />
          ) : (
            <Navigate to="/" />
          ),
        },
        {
          path: "media",
          element: isAuth ? (
            <ProfilePage showMedia={true} />
          ) : (
            <Navigate to="/" />
          ),
        },
        {
          path: "likes",
          element: isAuth ? (
            <ProfilePage showLikes={true} />
          ) : (
            <Navigate to="/" />
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
