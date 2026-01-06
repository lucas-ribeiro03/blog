// app/admin/layout.tsx

import { AdminNavbar } from "@/components/admin/admin-navbar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

// Este layout envolve todas as páginas dentro da rota /admin
export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      <AdminNavbar />
      <main className="grow container mx-auto px-4 py-10">{children}</main>
    </div>
  );
}
