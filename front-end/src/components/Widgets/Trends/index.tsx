import Trend from "./Trend";
import { useEffect, useState } from "react";
import trends from "./data";
import Wrapper from "../../Wrappers/RightMenusWrapper";
export default function Trends() {
  return (
    <Wrapper title="Trends for you">
      <ul className="w-full 2xl:mt-[1rem]">
        {trends.map((trend, i) => {
          return <Trend key={i} trend={trend}/>
        })}
      </ul>
    </Wrapper>
  );
}
