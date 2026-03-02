"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CiMenuFries } from "react-icons/ci";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const links = [
  { name: "Home", path: "/", external: false },
  { name: "Projects", path: "/projects", external: false },
  { name: "Resume", path: "/resume", external: false },
  {
    name: "Upwork",
    path: "https://www.upwork.com/freelancers/~0155bc92ca790b58b7",
    external: true,
  },
  { name: "Contact", path: "/contact", external: false },
];

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger className="flex items-center justify-center rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-strong)] p-2 text-primary">
        <CiMenuFries className="text-2xl" />
      </SheetTrigger>

      <SheetContent>
        <div className="mt-10">
          <p className="text-2xl font-semibold tracking-tight text-primary">
            suleman.saleem
          </p>
          <p className="mt-1 text-sm muted-text">Full-Stack Software Engineer</p>
        </div>

        <nav className="mt-10 flex flex-col gap-5">
          {links.map((link) => {
            const isActive = !link.external && pathname === link.path;

            if (link.external) {
              return (
                <a
                  key={link.name}
                  href={link.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold muted-text hover:text-accent"
                >
                  {link.name}
                </a>
              );
            }

            return (
              <Link
                key={link.name}
                href={link.path}
                className={`text-lg font-semibold hover:text-accent ${
                  isActive ? "text-accent" : "muted-text"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
