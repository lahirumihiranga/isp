import { HeroHeader } from "@/components/landing/header";
import FooterSection from "@/components/landing/footer";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <HeroHeader />
      {children}
      <FooterSection />
    </div>
  );
}
