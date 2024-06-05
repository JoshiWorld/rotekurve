import { getServerAuthSession } from "@/server/auth";
import ImpressumEditLoad from "./impressum";

export default async function Datenschutz() {
  const session = await getServerAuthSession();
  if (!session) return null;

  return (
    <div className="mt-8 flex flex-col items-center gap-2">
      <ImpressumEditLoad />
    </div>
  );
}
