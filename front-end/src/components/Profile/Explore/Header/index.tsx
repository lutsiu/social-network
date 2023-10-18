import SearchBar from "../../../Widgets/SearchBar";

export default function Header() {
  return (
    <header
      className="w-[90%] h-[5rem] flex items-center gap-[3.4rem] pt-[1rem] pl-[1rem]"
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      <SearchBar/>
    </header>
  );
}
