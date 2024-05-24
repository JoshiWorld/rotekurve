import { CreateUser } from "@/app/_components/internal/user/create-user";
import { UsersTable } from "@/app/_components/internal/user/user-table";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import { type User } from "@prisma/client";

export default async function AdminUser() {
    const session = await getServerAuthSession();
    if (!session) return null;
    const users: User[] = await api.user.getAll();

    return (
        <div className="container w-full">
            <UsersTable data={users} />
            <CreateUser />
        </div>
    )
}