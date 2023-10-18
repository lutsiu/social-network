import { NavLink, useLocation, useNavigate  } from "react-router-dom";
import styles from "../styles.module.scss";
export default function ButtonsGroup() {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  const main = !pathname.includes('/replies') && !pathname.includes('/media') && !pathname.includes('/likes');
  const tweetsPath = pathname.split('/')[1];
  return (
    <div className="md:mt-[3rem] mt-[1rem] flex justify-between">
      <div
      className={main
        ? `text-white rounded-sm relative ${styles.link}  h-[6rem] flex-1 text-2xl font-semibold hover:bg-zinc-900 duration-200 cursor-pointer flex items-center justify-center`
        : "text-zinc-400 w-fullh-[6rem] flex-1 text-2xl font-semibold hover:bg-zinc-900 duration-200 cursor-pointer flex items-center justify-center"}
        onClick={() => {
          console.log('click');
          navigate(`/${tweetsPath}`)
        }}
      >
        Tweets
      </div>
      <NavLink
        to="replies"
        className={({ isActive }) =>
          isActive
            ? `text-white rounded-sm ${styles.link} relative  h-[6rem] flex-1 text-2xl font-semibold hover:bg-zinc-900 duration-200 cursor-pointer flex items-center justify-center`
            : "text-zinc-400 w-fullh-[6rem] flex-1 text-2xl font-semibold hover:bg-zinc-900 duration-200 cursor-pointer flex items-center justify-center"
        }
      >
        Replies
      </NavLink>
      <NavLink
        to="media"
        className={({ isActive }) =>
          isActive
            ? `text-white rounded-sm ${styles.link} relative  h-[6rem] flex-1 text-2xl font-semibold hover:bg-zinc-900 duration-200 cursor-pointer flex items-center justify-center`
            : "text-zinc-400 w-fullh-[6rem] flex-1 text-2xl font-semibold hover:bg-zinc-900 duration-200 cursor-pointer flex items-center justify-center"
        }
      >
        Media
      </NavLink>
      <NavLink
        to="likes"
        className={({ isActive }) =>
          isActive
            ? `text-white rounded-sm ${styles.link} relative  h-[6rem] flex-1 text-2xl font-semibold hover:bg-zinc-900 duration-200 cursor-pointer flex items-center justify-center`
            : "text-zinc-400 w-fullh-[6rem] flex-1 text-2xl font-semibold hover:bg-zinc-900 duration-200 cursor-pointer flex items-center justify-center"
        }
      >
        Likes
      </NavLink>
    </div>
  );
}
