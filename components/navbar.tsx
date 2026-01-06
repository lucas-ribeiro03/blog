"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, User, Settings, LogIn, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProfileDropdown } from "./profile-dropdown";
import { SettingsDropdown } from "./settings-dropdown";

type NavbarProps = {
  isLoggedIn?: boolean;
} & React.ComponentProps<"nav">;

export const Navbar = ({ isLoggedIn, className, ...props }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className={`sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/80 ${
        className || ""
      }`}
      {...props}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-blue-500 to-purple-600 text-white font-bold text-lg">
              B
            </div>
            <span className="text-xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Blog
            </span>
          </div>

          {/* Desktop: Search Bar */}
          <div className="hidden md:flex flex-1 items-center justify-center px-4">
            <div className="relative w-full max-w-md">
              <Search
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                aria-label="Ícone de busca"
              />
              <Input
                type="search"
                placeholder="Buscar posts..."
                className="w-full pl-10 bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-slate-800"
                aria-label="Campo de busca de posts"
              />
            </div>
          </div>

          {/* Desktop: Actions */}
          <div className="hidden md:flex items-center gap-2">
            {isLoggedIn ? (
              <>
                <ProfileDropdown />
                <SettingsDropdown />
              </>
            ) : (
              <Button
                asChild
                variant="default"
                className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                aria-label="Fazer login na plataforma"
              >
                <Link href="/login" className="flex items-center gap-2">
                  <LogIn className="h-4 w-4" aria-hidden="true" />
                  Fazer Login
                </Link>
              </Button>
            )}
          </div>

          {/* Mobile: Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-slate-600 hover:text-blue-600 hover:bg-blue-50 dark:text-slate-400 dark:hover:text-blue-400 dark:hover:bg-blue-950"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            title={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            <div className="relative h-5 w-5">
              <Menu
                className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${
                  isMenuOpen
                    ? "opacity-0 rotate-90 scale-0"
                    : "opacity-100 rotate-0 scale-100"
                }`}
                aria-hidden="true"
              />
              <X
                className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${
                  isMenuOpen
                    ? "opacity-100 rotate-0 scale-100"
                    : "opacity-0 -rotate-90 scale-0"
                }`}
                aria-hidden="true"
              />
            </div>
          </Button>
        </div>

        {/* Mobile: Dropdown Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 space-y-4 border-t border-slate-200 dark:border-slate-800">
            {/* Mobile: Search Bar */}
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                aria-label="Ícone de busca"
              />
              <Input
                type="search"
                placeholder="Buscar posts..."
                className="w-full pl-10 bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-slate-800"
                aria-label="Campo de busca de posts"
              />
            </div>

            {/* Mobile: Actions */}
            <div className="flex flex-col gap-2">
              {isLoggedIn ? (
                <>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-slate-600 hover:text-blue-600 hover:bg-blue-50 dark:text-slate-400 dark:hover:text-blue-400 dark:hover:bg-blue-950"
                    aria-label="Acessar perfil do usuário"
                  >
                    <User className="h-4 w-4 mr-2" aria-hidden="true" />
                    Perfil
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-slate-600 hover:text-purple-600 hover:bg-purple-50 dark:text-slate-400 dark:hover:text-purple-400 dark:hover:bg-purple-950"
                    aria-label="Acessar configurações"
                  >
                    <Settings className="h-4 w-4 mr-2" aria-hidden="true" />
                    Configurações
                  </Button>
                </>
              ) : (
                <Button
                  asChild
                  variant="default"
                  className="w-full bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  aria-label="Fazer login na plataforma"
                >
                  <Link
                    href="/login"
                    className="flex items-center justify-center"
                  >
                    <LogIn className="h-4 w-4 mr-2" aria-hidden="true" />
                    Fazer Login
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
