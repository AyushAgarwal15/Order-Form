interface headerProps {
  isHamburgerClicked: boolean;
  handleMenu: () => void;
}
function Header({ isHamburgerClicked, handleMenu }: headerProps) {
  return (
    <header className="bg-black w-full flex justify-between items-center mt-0 p-7 ">
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
      <h1
        className="text-white text-3xl lg:text-4xl font-bold mt-0 hover:cursor-pointer"
        onClick={() => window.location.reload()}
      >
        <span className="text-red-500">S</span>hop{" "}
        <span className="text-red-500">Now</span>
      </h1>
      <div className="border-2 border-white rounded-full w-20 text-white text-center text-xl font-semibold mt-0 lg:text-2xl lg:w-40">
        User
      </div>
    </header>
  );
}

export default Header;
