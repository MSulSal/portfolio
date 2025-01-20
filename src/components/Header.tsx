import Link from "next/link";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="py-8 xl:py-12 text-white">
      <div className="container mx-auto">
        {/* logo */}
        <Link href="/">
          <h1 className="text-4xl font-semibold">
            Suleman<span className="text-accent">.</span>
          </h1>
        </Link>
        {/* desktop nav */}
      </div>
    </header>
  );
};

export default Header;
