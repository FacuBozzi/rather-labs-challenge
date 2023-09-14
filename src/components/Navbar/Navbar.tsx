import { useMetaMask } from "@/hooks/useMetaMask";
import React, { useState } from "react";

const Navbar: React.FC = () => {
  const { connect, disconnect, isConnected, address } = useMetaMask();

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // Explicitly type the event handler
  const handleConnectClick: React.MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    event.preventDefault();
    connect();
  };

  const handleDisconnectClick: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    event.preventDefault();
    disconnect();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className="relative flex w-full flex-wrap items-center justify-between bg-[#FBFBFB] py-2 text-white shadow-lg hover:text-neutral-700 focus:text-neutral-700 lg:py-4"
      data-te-navbar-ref
    >
      <div className="flex w-full flex-wrap items-center justify-between px-3">
        <div>
          <a
            className="mx-2 my-1 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 lg:mb-0 lg:mt-0"
            href="#"
          >
            <img
              className="mr-2"
              src="https://cdn-images-1.medium.com/v2/resize:fit:1200/format:png/1*_EBNxj-yhOKgdBh120aFXg.png"
              style={{ height: "30px" }}
              alt="TE Logo"
              loading="lazy"
            />
          </a>
        </div>

        <button
          className="block border-0 bg-transparent px-2 text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-primaryGray lg:hidden"
          type="button"
          data-te-collapse-init
          data-te-target="#navbarSupportedContent4"
          aria-controls="navbarSupportedContent4"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={toggleMenu}
        >
          <span className="[&>svg]:w-7">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-7 w-7"
            >
              <path
                fillRule="evenodd"
                d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>
        {isMenuOpen && (
          <div className="flex flex-col w-[100%] items-center font-medium uppercase text-primary-gray hover:shadow-lg">
            <button
              type="button"
              data-te-ripple-init
              data-te-ripple-color="light"
              className="mr-3 inline-block rounded px-6 pb-2 pt-2.5 font-medium uppercase leading-normal text-primary-gray hover:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-700 text-md"
              onClick={handleConnectClick}
            >
              {/* {isConnected ? address : "Connect Metamask wallet"} */}
              {!!address && isConnected ? address : "Connect Metamask wallet"}
            </button>
          </div>
        )}

        <div
          className="!visible mt-2 hidden flex-grow basis-[100%] items-center lg:mt-0 lg:!flex lg:basis-auto"
          id="navbarSupportedContent4"
          data-te-collapse-item
        >
          <ul
            className="list-style-none mr-auto flex flex-col pl-0 lg:mt-1 lg:flex-row"
            data-te-navbar-nav-ref
          >
            <li
              className="my-4 pl-2 lg:my-0 lg:pl-2 lg:pr-1"
              data-te-nav-item-ref
            >
              <a
                className="text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-primaryGray dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                aria-current="page"
                data-te-nav-link-ref
              >
                Rather Labs
              </a>
            </li>
          </ul>

          <div className="flex items-center">
            <button
              type="button"
              data-te-ripple-init
              data-te-ripple-color="light"
              className="mr-3 inline-block rounded bg-black px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-lg focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] motion-reduce:transition-none dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              onClick={handleConnectClick}
            >
              {/* {isConnected ? address : "Connect Metamask wallet"} */}
              {!!address && isConnected ? address : "Connect Metamask wallet"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
