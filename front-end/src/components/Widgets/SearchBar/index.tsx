import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { BsXCircleFill } from "react-icons/bs";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserType } from "../../../interfaces/models";
import SearchBarPopup from "../../Popups/SearchBar";
export default function MediumSearchBar() {
  const [inputIsActive, setInputIsActive] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [foundUsers, setFoundUsers] = useState<null | UserType[]>(null);
  const purple = "rgb(147 51 234)";
  const gray = "rgb(39 39 42)";

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const request = e.currentTarget.value;
    setInputValue(request);
  };

  useEffect(() => {
    const handleFindUser = async function(): Promise<void> {
      try {
        const res = await fetch(`http://localhost:3000/search?query=${inputValue}`);
        if (res.status === 409) {
          return;
        }
        if (res.status === 304) {
          setFoundUsers(null)
          return;
        }
        const users = await res.json() as UserType[];
        setFoundUsers(users);
      } catch (err) {
        console.log(err);   
      }
    };
    if (inputValue) {
      void handleFindUser();
    }
  }, [inputValue]);

  useEffect(() => {
    function handleClosePopup(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (target.closest('.close-search-bar-button') || !target.closest('.search-bar')) {
        setInputIsActive(false);
      }
    }
    document.addEventListener('click', handleClosePopup);
    return () => {
      document.removeEventListener('click', handleClosePopup);
    }
  }, []);

  return (
    <div className="w-full relative search-bar">
      <form
        className={`${
          inputIsActive ? "bg-black" : "bg-zinc-800"
        } w-full relative px-[1.7rem] py-[1rem] h-[4.3rem] rounded-[4rem]  flex items-center border-[1px]`}
        style={{ borderColor: inputIsActive ? purple : gray }}
        onClick={() => {
          setInputIsActive(true);
        }}
      >
        <HiOutlineMagnifyingGlass
          className={`text-4xl  mr-[1.8rem] ${
            inputIsActive ? "text-purple-600" : "text-gray-400"
          }`}
        />
        <input
          type="text"
          name="seachInput"
          className="w-[85%] text-white text-2xl bg-transparent outline-none"
          placeholder="Search people"
          maxLength={20}
          onChange={handleInputChange}
          value={inputValue}
        />
        <BsXCircleFill
          className={`close-search-bar-button absolute 2xl:right-[1.5rem] right-[1rem]  text-4xl cursor-pointer z-20 hover:text-purple-500 duration-300 ${
            inputIsActive ? "text-purple-600" : "text-gray-400"
          }`}
          style={{ opacity: inputValue.length !== 0 && inputIsActive ? 1 : 0 }}
          onClick={(e: React.MouseEvent<SVGElement, MouseEvent>) => {
            setInputValue("");
            e.stopPropagation();
          }}
        />
      </form>
      <SearchBarPopup inputIsActive={inputIsActive} inputValue={inputValue} users={foundUsers}/>
    </div>
  );
}
