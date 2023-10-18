import { Link } from "react-router-dom"
import { UserType } from "../../../interfaces/models";
import UserLink from "./UserLink";


interface Props {
  inputIsActive: boolean,
  inputValue: string,
  users: UserType[] | null
}
export default function SearchBarPopup(props: Props) {

  const {inputIsActive, inputValue, users} = props;
  return (
    <div
        className="w-[100%] min-h-[10rem] bg-neutral-950 border-[1px] border-gray-600 shadow rounded-xl absolute top-[4.4rem] z-[10]"
        style={{ display: inputIsActive ? "block" : "none" }}
      >
        {inputValue.length === 0 && (
          <p className="text-2xl font-thin text-gray-400 text-center mt-[2rem]">
            Search people or companies by nicknames
          </p>
        )}
        {inputValue && (
          <div className="w-full h-full">
            <div
              className=" block text-2xl py-[1.4rem] px-[1rem] duration-300 hover:bg-zinc-800"
            >
              Search for "{inputValue}"
            </div>
            <ul className="w-full">
              {users && users.length > 0 && users.map((user,i) => {
                return <UserLink key={i} user={user}/>
              })}
            </ul>
            <div
              className=" block text-2xl py-[1.4rem] px-[1rem] duration-300 hover:bg-zinc-800"
            >
              Go to @{inputValue}
            </div>
          </div>
        )}
      </div>
  )
}