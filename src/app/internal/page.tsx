import Link from "next/link";
import { getServerAuthSession } from "@/server/auth";

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
            {session ? "Sign out" : "Sign in"}
          </Link>
        </div>
      </div>
    );
}