import { useState } from "react";
import SideBarMenu from "./SideBarMenu";

function Header() {
  const [isHamburgerClicked, setIsHamburgerClicked] = useState<boolean>(false);

  function handleMenu() {
    setIsHamburgerClicked((prev) => !prev);
  }

  return (
    <>
      <header className="header">
        {isHamburgerClicked ? (
          <img
            src="/icons-png/close-menu.png"
            alt="menu-icon"
            className="hover:cursor-pointer"
            onClick={() => handleMenu()}
          />
        ) : (
          <img
            src="/icons-png/open-menu.png"
            alt="menu-icon"
            className="w-10 hover:cursor-pointer"
            onClick={() => handleMenu()}
          />
        )}
        <h1 className="logo" onClick={() => window.location.reload()}>
          <span className="dark-font">S</span>hop{" "}
          <span className="dark-font">Now</span>
        </h1>
        <div className="user">user</div>
      </header>
      {isHamburgerClicked && <SideBarMenu />}
    </>
  );
}

export default Header;
