
interface Props {
  disabled: boolean;
  text: string;

}

export default function TweetButton(props: Props) {
  return (
    <button
      type="submit"
      disabled={props.disabled}
    
      className="py-[1rem] px-[1.3rem] rounded-[4rem] duration-300 hover:bg-purple-600 text-2xl font-semibold "
      style={{backgroundColor: props.disabled ? "rgb(88 28 135)" : "rgb(126 34 206)", color: props.disabled ? 'rgb(113 113 122)' : '#fff'}}

    >
      {props.text}
    </button>
  );
}
