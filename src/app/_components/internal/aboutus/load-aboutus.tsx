import { api } from "@/trpc/server";
import { type AboutUs } from "@prisma/client";
import { EditAboutus } from "./edit-aboutus";
import { CreateAboutus } from "./create-aboutus";

export default async function AboutusEditLoad() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-redundant-type-constituents
  const aboutus: AboutUs | null = await api.aboutus.getLatest();
  if (!aboutus) return <CreateAboutus />;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  return <EditAboutus aboutus={aboutus} />;
}
