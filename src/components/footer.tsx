import {
  Footer,
  FooterCopyright,
  FooterLink,
  FooterLinkGroup,
} from "flowbite-react";

export function SiteFooter() {
    const currentYear = new Date().getFullYear();

  return (
    <Footer container className="sticky bottom-0 mt-10 rounded-none dark:bg-zinc-800">
      <FooterCopyright href="#" by="Rote Kurve" year={currentYear} />
      <FooterLinkGroup>
        <FooterLink href="/impressum">Impressum</FooterLink>
        <FooterLink href="/datenschutz">Datenschutz</FooterLink>
        <FooterLink href="/internal">Intern</FooterLink>
      </FooterLinkGroup>
    </Footer>
  );
}
