import { api } from "@/trpc/server";
import { type Impressum } from "@prisma/client";
import { CreateImpressum } from "./create-impressum";
import { EditImpressum } from "./edit-impressum";

export default async function ImpressumEditLoad() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-redundant-type-constituents
  const datenschutz: Impressum | null = await api.impressum.getLatest();
  if (!datenschutz) return <CreateImpressum />;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  return <EditImpressum aboutus={datenschutz} />;
}
