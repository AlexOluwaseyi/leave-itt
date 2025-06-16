// components/MobileFooterNav.tsx
"use client";
import { usePathname } from "next/navigation";
import { navLinks } from "@/mock";

export default function MobileFooterNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 min-h-[73px]">
      <nav className="flex justify-around py-2">
        {navLinks.map((link, index) => {
          const IconComponent = link.icon;
          return (
            <a
              key={index}
              href={link.href}
              className={`flex flex-col items-center p-2 rounded-lg ${
                isActive(link.href)
                  ? "text-gray-200 dark:text-gray-900 bg-gray-900 dark:bg-gray-200"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              <IconComponent size={20} />
              <span className="text-xs mt-1">{link.text}</span>
            </a>
          );
        })}
      </nav>
    </footer>
  );
}
