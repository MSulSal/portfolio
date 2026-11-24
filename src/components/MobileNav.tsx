"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const links = [
  { name: "Projects", path: "/projects" },
  { name: "Resume", path: "/resume" },
  { name: "Contact", path: "/contact" },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger aria-label="Open navigation" className="flex size-10 items-center justify-center rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-strong)] text-primary">
        <Menu className="size-5" aria-hidden="true" />
      </SheetTrigger>
      <SheetContent aria-describedby={undefined}>
        <SheetTitle className="mt-12">Navigation</SheetTitle>
        <nav aria-label="Mobile" className="mt-5 flex flex-col gap-2">
          {links.map(({ name, path }) => (
            <SheetClose key={path} asChild>
              <Link
                href={path}
                aria-current={pathname === path ? "page" : undefined}
                className={cn("py-2 text-lg font-semibold hover:text-accent", pathname === path ? "text-accent" : "muted-text")}
              >
                {name}
              </Link>
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
