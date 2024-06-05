import { HoverEffect } from "@/components/ui/card-hover-effect";

export function InternalDashboard() {
  return (
    <div className="mx-auto max-w-5xl px-8 z-0">
      <HoverEffect items={projects} />
    </div>
  );
}
export const projects = [
  {
    title: "Mitglieder",
    description: "Hier kannst du alle Mitglieder verwalten",
    link: "/mitglieder",
    disabled: true,
  },
  {
    title: "Finanzen",
    description: "Hier kannst du die Finanzen einsehen",
    link: "/finanzen",
    disabled: true,
  },
  {
    title: "Mail",
    description: "Hier kannst du auf den Posteingang zugreifen",
    link: "/mail",
    disabled: false,
  },
  {
    title: "Aktuelles",
    description:
      "Hier kannst du einen neuen Beitrag erstellen, bearbeiten oder archivieren",
    link: "/posts",
    disabled: false,
  },
  {
    title: "Über uns",
    description: "Hier kannst du die Details von Über uns bearbeiten",
    link: "/aboutus",
    disabled: true,
  },
  {
    title: "Spielplan",
    description: "Hier kannst du den Spielplan bearbeiten",
    link: "/spielplan",
    disabled: true,
  },
  {
    title: "Links",
    description: "Hier kannst du die Links bearbeiten",
    link: "/links",
    disabled: true,
  },
  {
    title: "Kontakt",
    description: "Hier kannst du die Kontaktdaten bearbeiten",
    link: "/kontakt",
    disabled: true,
  },
  {
    title: "Cloud",
    description: "Zugriff auf die interne Cloud",
    link: "/cloud",
    disabled: true,
  },
  {
    title: "User",
    description: "Nutzer verwalten",
    link: "/user",
    disabled: false,
  },
];
