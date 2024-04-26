import { InternalNav } from "../_components/internal/internal-nav";

export default function InternalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="mt-8 flex flex-col items-center gap-2">
        <div className="flex flex-col items-center justify-center gap-4">
          <InternalNav />
          {children}
        </div>
      </div>
    </section>
  );
}
