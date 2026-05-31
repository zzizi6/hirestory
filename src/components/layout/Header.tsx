import Link from "next/link";
import { Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const NAV_LINKS = [
  { href: "/applications", label: "지원 기록" },
  { href: "/interviews", label: "면접 노트" },
  { href: "/calendar", label: "캘린더" },
  { href: "/dashboard", label: "대시보드" },
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-foreground"
          aria-label="Hirestory 홈"
        >
          <Briefcase className="h-5 w-5" aria-hidden="true" />
          <span>Hirestory</span>
        </Link>

        <nav aria-label="주 네비게이션">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          href="/auth/signin"
          className={cn(buttonVariants({ variant: "default", size: "sm" }))}
        >
          로그인
        </Link>
      </div>
    </header>
  );
}
