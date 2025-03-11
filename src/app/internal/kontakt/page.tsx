import { CreateKontakt } from "@/app/_components/internal/kontakt/create-kontakt";
import { SocialsTable } from "@/app/_components/internal/kontakt/kontakt";
import { getServerAuthSession } from "@/server/auth";

export default async function Kontakts() {
  const session = await getServerAuthSession();

  if (!session) return null;

  return (
    <div className="mt-8 flex flex-col items-center gap-2">
      <SocialsTable />
      <CreateKontakt />
    </div>
  );
}
