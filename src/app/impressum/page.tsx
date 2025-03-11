import { api } from "@/trpc/server";

export default async function Impressum() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const impressum = await api.impressum.getLatest();

  return (
    <div className="mt-8 flex flex-col items-center gap-2">
      <div
        className="w-full max-w-4xl px-6 md:px-10"
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        dangerouslySetInnerHTML={{ __html: impressum?.content ?? "" }}
      />
    </div>
  );
}
