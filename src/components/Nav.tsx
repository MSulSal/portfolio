"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    name: "home",
    path: "/",
    external: false,
  },
  {
    name: "projects",
    path: "/projects",
    external: false,
  },
  {
    name: "resume",
    path: "/resume",
    external: false,
  },
  {
    name: "upwork",
    path: "https://www.upwork.com/freelancers/~0155bc92ca790b58b7",
    external: true,
  },
];

const Nav = () => {
  const pathname = usePathname();

  return (
    <nav className="flex gap-8">
      {links.map((link, index) =>
        link.external ? (
          <a
            key={index}
            href={link.path}
            target="_blank"
            rel="noopener noreferrer"
            className="capitalize font-medium hover:text-accent transitional-all"
          >
            {link.name}
          </a>
        ) : (
          <Link
            key={index}
            href={link.path}
            className={`${
              link.path === pathname && "text-accent border-b-2 border-accent"
            } capitalize font-medium hover:text-accent transitional-all`}
          >
            {link.name}
          </Link>
        )
      )}
    </nav>
  );
};

export default Nav;
