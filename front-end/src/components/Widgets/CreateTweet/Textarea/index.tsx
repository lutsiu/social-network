import { useDispatch } from "react-redux";
import { ReduxState } from "../../../../interfaces/redux";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
import { setTweet } from "../../../../state/ui";
import useResponsive from "../../../../hooks/useResponsive";


export default function TextBox() {

  const dispatch = useDispatch();
  const {tweet} = useSelector((state: ReduxState) => state.ui);
  const width = useResponsive();

  return (
    <textarea
      placeholder="What is happening?!"
      className="text-white w-full bg-transparent mt-[1.4rem] py-[1rem] text-3xl outline-none font-medium"
      rows={width >=768 ? 2  : 4}
      maxLength={100}
      value={tweet}
      onChange={(e) => dispatch(setTweet(e.currentTarget.value))}
    ></textarea>
  );
}
