import { Home } from "@/components/home";
import { Suspense } from "react";

export default async function HomePage() {
  return (
    <Suspense fallback={<p>Carregando...</p>}>
      <Home />
    </Suspense>
  );
}
