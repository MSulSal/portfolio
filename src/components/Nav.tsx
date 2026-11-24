"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const links = [
  { name: "Projects", path: "/projects" },
  { name: "Resume", path: "/resume" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main" className="flex items-center gap-6">
      {links.map(({ name, path }) => {
        const isActive = pathname === path || pathname.startsWith(`${path}/`);
        return (
          <Link
            key={path}
            href={path}
            aria-current={pathname === path ? "page" : undefined}
            className={cn("text-sm font-medium hover:text-accent", isActive ? "text-accent" : "muted-text")}
          >
            {name}
          </Link>
        );
      })}
    </nav>
  );
}
