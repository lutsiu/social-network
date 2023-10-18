import { useState, useEffect } from "react";
interface Props {
  children: React.ReactNode;
  width: number;
  buttonIndex: number;
}
export default function HeaderButton(props: Props) {
  const [activeButton, setActiveButton] = useState(0);
  useEffect(() => {
    
    const handleButtonClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const button = target.closest('.headerButton') as HTMLButtonElement;
      
      if (!button )return;
      const child = button.contains(target);
      if (button || child) {
        const index = button.dataset.buttonIndex;
        if (index) {
          setActiveButton(+index);
        }
      }


    };

    addEventListener('click', handleButtonClick);

    return () => {
      removeEventListener('click', handleButtonClick)
    }
  }, []);

  return (
    <button
      className="text-center py-[1.7rem] duration-300 hover:bg-zinc-900 headerButton"
      data-button-index={props.buttonIndex}
      style={{ width: `${props.width}%`}}
    >
      <span className="text-2xl font-medium w-fit text-center pb-[1.3rem] " style={{borderBottom: activeButton === props.buttonIndex ? '4px solid rgb(147 51 234)' : '', color: activeButton === props.buttonIndex ? 'white' : 'rgb(161 161 170)'}}>{props.children}</span>
    </button>
  );
}
