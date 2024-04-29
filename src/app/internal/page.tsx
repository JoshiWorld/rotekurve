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
            className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-slate-50"
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-background px-3 py-1 text-sm font-medium backdrop-blur-3xl">
              {session ? "Abmelden" : "Einloggen"}
            </span>
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