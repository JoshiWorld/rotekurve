import {
  Footer,
  FooterCopyright,
  FooterLink,
  FooterLinkGroup,
} from "flowbite-react";

export function SiteFooter() {
    const currentYear = new Date().getFullYear();

  return (
    <Footer container className="rounded-none mt-10">
      <FooterCopyright href="#" by="Rotekurve" year={currentYear} />
      <FooterLinkGroup>
        <FooterLink href="#">Impressum</FooterLink>
        <FooterLink href="#">Datenschutz</FooterLink>
        <FooterLink href="#">Kontakt</FooterLink>
      </FooterLinkGroup>
    </Footer>
  );
}
