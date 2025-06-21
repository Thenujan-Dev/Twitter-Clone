import React from "react";
import { tabType } from "./HomePage";

const Nav = ({
  tab,
  setTab,
}: {
  tab: tabType;
  setTab: React.Dispatch<React.SetStateAction<tabType>>;
}) => {
  return (
    <div className="w-full border-b border-slate-400">
      <div className="w-full p-2 flex justify-around">
        {["Follow You", "Following"].map((item) => (
          <li
            key={item}
            className="list-none cursor-pointer relative"
            onClick={() => setTab(item as tabType)}
          >
            {item}
            <span
              className={`absolute bottom-[-5px] left-0 h-1 bg-blue-600 w-full transform origin-left transition-transform duration-300 ease-in-out ${
                tab === item ? "scale-x-100" : "scale-x-0"
              }`}
            ></span>
          </li>
        ))}
      </div>
    </div>
  );
};

export default Nav;
