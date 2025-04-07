import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="p-2 shadow-md flex justify-between items-center p-4">
      <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <img src="/logo.svg" alt="WonderMate Logo" />
        <h1 className="text-xl font-bold">WonderMate</h1>
      </Link>

      <div>
        <Button>Sign In</Button>
      </div>
    </div>
  );
};

export default Header;
