"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState, type KeyboardEvent } from "react";
import { Container } from "./container";
import { siteNavigation } from "@/lib/navigation";

function NavigationItems({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <>
      {siteNavigation.map((item) => (
        <li key={item.label}>
          <Link
            aria-current={
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(`${item.href}/`))
                ? "page"
                : undefined
            }
            className="site-nav-link"
            href={item.href}
            onClick={onNavigate}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </>
  );
}

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function handleMenuKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (isMenuOpen && event.key === "Escape") {
      closeMenu();
      menuButtonRef.current?.focus();
    }
  }

  return (
    <header className="site-header" onKeyDown={handleMenuKeyDown}>
      <Container>
        <div className="header-row">
          <Link
            aria-label="Lativera — início"
            className="wordmark"
            href="/"
            onClick={closeMenu}
          >
            Lativera
          </Link>

          <nav aria-label="Navegação principal" className="desktop-navigation">
            <ul className="navigation-list">
              <NavigationItems pathname={pathname} />
            </ul>
          </nav>

          <button
            aria-controls="mobile-navigation"
            aria-expanded={isMenuOpen}
            aria-label={
              isMenuOpen
                ? "Fechar menu de navegação"
                : "Abrir menu de navegação"
            }
            className="mobile-menu-toggle"
            onClick={() => setIsMenuOpen((open) => !open)}
            ref={menuButtonRef}
            type="button"
          >
            {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>

        <nav
          aria-label="Navegação móvel"
          className="mobile-navigation"
          hidden={!isMenuOpen}
          id="mobile-navigation"
        >
          <ul className="mobile-navigation-list">
            <NavigationItems pathname={pathname} onNavigate={closeMenu} />
          </ul>
        </nav>
      </Container>
    </header>
  );
}
