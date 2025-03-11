import { api } from "@/trpc/server";
import { type DataSecurity } from "@prisma/client";
import { CreateDatenschutz } from "./create-datenschutz";
import { EditDatenschutz } from "./edit-datenschutz";

export default async function DatenschutzEditLoad() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-redundant-type-constituents
  const datenschutz: DataSecurity | null = await api.datenschutz.getLatest();
  if (!datenschutz) return <CreateDatenschutz />;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  return <EditDatenschutz aboutus={datenschutz} />;
}
