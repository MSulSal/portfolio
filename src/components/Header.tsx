import Link from "next/link";
import { Button } from "./ui/button";

import MobileNav from "./MobileNav";
import Nav from "./Nav";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--border)] bg-[color:var(--bg)] backdrop-blur">
      <div className="portfolio-shell flex min-h-[4.25rem] items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2" aria-label="Suleman Saleem home">
          <span className="text-xl font-semibold tracking-tight text-primary sm:text-2xl">
            suleman.saleem
          </span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <Nav />
          <ThemeToggle />
          <Button variant="outline" asChild>
            <Link href="/contact">Contact</Link>
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
