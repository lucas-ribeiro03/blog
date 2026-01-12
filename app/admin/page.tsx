import { AdminMenu } from "@/components/admin/admin-menu";
import { ErrorMessage } from "@/components/error-message";
import { verifyLogin } from "@/utils/manage-login";

export default async function AdminPage() {
  const isAdmin = await verifyLogin();
  if (isAdmin.payload.role !== "admin") {
    return <ErrorMessage message="Página restrita" className="mt-22" />;
  }
  return <AdminMenu />;
}
