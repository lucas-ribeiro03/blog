import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Settings } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { BR, US } from "country-flag-icons/react/1x1";

function getInitialTheme() {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("theme") === "dark";
}

export const SettingsDropdown = () => {
  const [showLanguageDialog, setShowLanguageDialog] = useState(false);
  // TODO   const [languageSelected, setLanguageSelected] = useState<"BR" | "US">("BR");
  //TODO NOTIFICAÇÕES

  const [isDark, setIsDark] = useState(getInitialTheme);

  const toggleDarkTheme = () => {
    const newValue = !isDark;
    setIsDark(newValue);
    localStorage.setItem("theme", newValue ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newValue);
  };

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="text-slate-600 hover:text-blue-600 hover:bg-blue-50 dark:text-slate-400 dark:hover:text-blue-400 dark:hover:bg-blue-950"
            aria-label="Acessar configurações do usuário"
            title="Configurações"
          >
            <Settings className="h-5 w-5" aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 " align="start">
          <DropdownMenuLabel>Configurações</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={isDark}
            onCheckedChange={toggleDarkTheme}
            className="cursor-pointer"
          >
            Tema escuro
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem className="cursor-pointer">
            Notificações
          </DropdownMenuCheckboxItem>
          <DropdownMenuItem
            className="ml-6 cursor-pointer"
            onSelect={() => setShowLanguageDialog(true)}
          >
            Linguagem
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={showLanguageDialog} onOpenChange={setShowLanguageDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Selecionar linguagem</DialogTitle>
            <DialogDescription>
              Altere para a linguagem de sua preferência
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-around">
            <div className="bg-slate-700 rounded-md hover:bg-slate-800 transition duration-200 cursor-pointer group">
              <US className="w-20 h-20 rounded-full cursor-pointer p-1 group-hover:brightness-50 transition" />
            </div>
            <div className="bg-slate-700 rounded-md hover:bg-slate-800 transition duration-200 group cursor-pointer">
              <BR className="w-20 h-20 rounded-full  p-1 group-hover:brightness-50 transition" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button className="hover:text-red-500" variant={"outline"}>
                Cancelar
              </Button>
            </DialogClose>
            <Button>Confirmar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
