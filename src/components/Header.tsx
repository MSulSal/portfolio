import Link from "next/link";
import { Button } from "./ui/button";

import MobileNav from "./MobileNav";
import Nav from "./Nav";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--border)] bg-[color:var(--bg)] backdrop-blur">
      <div className="container mx-auto flex items-center justify-between py-5">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-semibold text-primary sm:text-3xl">
            Suleman Saleem
          </span>
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          <Nav />
          <ThemeToggle />
          <Button asChild>
            <Link href="/contact">Start a conversation</Link>
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
