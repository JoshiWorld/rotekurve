import Link from "next/link";
import { getServerAuthSession } from "@/server/auth";
import { InternalDashboard } from "../_components/internal/internal-dashboard";

export default async function InternalLogin() {
    const session = await getServerAuthSession();

    return (
      <div className="mt-8 flex flex-col items-center gap-2">
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-center text-2xl">
            {session && <span>Eingeloggt als {session.user?.name}</span>}
          </p>
          <Link
            href={session ? "/api/auth/signout" : "/api/auth/signin"}
            className="rounded-full px-10 py-3 font-semibold no-underline transition"
          >
            {session ? "Ausloggen" : "Einloggen"}
          </Link>

          <ShowDashboard />
        </div>
      </div>
    );
}

async function ShowDashboard() {
    const session = await getServerAuthSession();
    if(!session) return null;

    return <InternalDashboard />
}