import { useState } from "react";
import { MdArrowDropDown, MdMenu, MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useTransition, animated } from "react-spring";

export default function MainNav(props) {
  const [active, setActive] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  let username = localStorage.getItem("username");
  const navigate = useNavigate();

  const handleSetActive = () => {
    setActive(!active);
    props.setSidebar(!active);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    navigate("/login");
  };

    const transitions = useTransition(dropdown ? [1] : [], {
        from: { opacity: 0, transform: "translateY(-10px)", duration: 10 },
        enter: { opacity: 1, transform: "translateY(0px)", duration: 10 },
        leave: { opacity: 0, transform: "translateY(-10px)", duration: 10 },
    });

  return (
    <div className="fixed bg-white w-full shadow">
      <div
        className={`flex justify-between py-4 px-24 items-center transition-all duration-300 ease-in-out ${
          active ? "pl-[54vh]" : "pl-24"
        }`}
      >
        <MdMenu
          size={24}
          onClick={handleSetActive}
          className="cursor-pointer"
          color="#696F79"
        />
        <div
          onClick={() => setDropdown(!dropdown)}
          className="dropdown  flex cursor-pointer items-center justify-end"
        >
          <div className="text-[16px] font-bold text-[#696F79]">{username}</div>
          <MdArrowDropDown color="#696F79" size={20} />
        </div>
        {transitions((style, item) =>
          item ? (
            <animated.div
              style={style}
              key="dropdown"
              className="flex cursor-pointer items-center gap-x-2.5 dropdown-content absolute text-[14px] right-24 top-14 bg-[#FAFAFC] shadow py-4 px-8"
            >
              <MdLogout color={"#696F79"} size={16} />
              <div
                onClick={handleLogout}
                className="text-[14px] font-semibold text-[#696F79]"
              >
                Logout
              </div>
            </animated.div>
          ) : null
        )}
      </div>
    </div>
  );
}
