import LeftMenu from "../../components/Profile/LeftMenu";
import { Link, useRouteError } from "react-router-dom";
import useResponsive from "../../hooks/useResponsive";
import Header from "./Header";
export default function ErrorPage() {

  const width = useResponsive();
  const error = useRouteError();
  console.log(error)
  return (
    <div className="h-full flex relative justify-between">
      {width >= 1400 && <LeftMenu />}
      {width < 1400 && <Header/>}
      <section className="w-full">
        <h2 className='text-center text-2xl font-light text-zinc-400 mt-[11rem]'>
          Hmm...this page doesn’t exist. Try searching for something else.
        </h2>
        <Link to="/explore" className="block w-fit mx-auto mt-[3rem] bg-purple-500 py-[1rem] px-[2rem] text-2xl font-semibold rounded-[4rem] hover:bg-purple-600 duration-300">Search</Link>
      </section>
    </div>
  );
}
