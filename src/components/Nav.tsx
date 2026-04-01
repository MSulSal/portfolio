"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Home", path: "/", external: false },
  { name: "Projects", path: "/projects", external: false },
  { name: "Resume", path: "/resume", external: false },
  { name: "Contact", path: "/contact", external: false },
];

const Nav = () => {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-6">
      {links.map((link) => {
        const isActive = !link.external && pathname === link.path;

        if (link.external) {
          return (
            <a
              key={link.name}
              href={link.path}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium tracking-tight text-[color:var(--muted)] hover:text-accent"
            >
              {link.name}
            </a>
          );
        }

        return (
          <Link
            key={link.name}
            href={link.path}
            className={`text-sm font-medium tracking-tight transition-colors hover:text-accent ${
              isActive ? "text-accent" : "text-[color:var(--muted)]"
            }`}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default Nav;
