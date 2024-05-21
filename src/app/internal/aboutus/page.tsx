import AboutusEditLoad from "@/app/_components/internal/aboutus/load-aboutus";
import { getServerAuthSession } from "@/server/auth";

export default async function AboutUs() {
  const session = await getServerAuthSession();
  if (!session) return null;

  return (
    <div className="mt-8 flex flex-col items-center gap-2">
      <AboutusEditLoad />
    </div>
  );
}
