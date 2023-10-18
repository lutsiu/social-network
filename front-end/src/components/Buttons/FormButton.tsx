export default function FormButton(props: { content: string, disabled: boolean }) {

  const {disabled} = props;

  return (
    <button
      type="submit"
      className="mt-[2rem] bg-gray-200 w-full py-[1.3rem] rounded-[25rem] duration-300 hover:bg-gray-200 text-black text-2xl font-semibold"
      disabled={props.disabled}
      style={{backgroundColor: disabled ? 'rgb(107 114 128)' : 'rgb(229 231 235)'}}
>
      {props.content}
    </button>
  );
}
