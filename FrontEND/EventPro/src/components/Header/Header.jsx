import React from 'react';
import Nav from "./Nav";
import ProgressBar from "../Animation/ProgressBar";

const logo = "Logo.png"

function Header() {
  return (
    <>
    <header className="top-0 mb-8 bg-primary-500 dark:bg-primary-600 flex-wrap z-[20] mx-auto flex w-full items-center justify-between pr-8 pl-8]">
      
      <img src={logo} className="logo w-40 -mt-4 -mb-2" alt="Logo"/>

      <Nav/>

    </header>

    <ProgressBar/>
    </>
  );
}

export default Header;