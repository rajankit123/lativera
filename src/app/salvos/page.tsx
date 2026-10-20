import { Container } from "@/components/layout/container";
import { SavedItems } from "@/components/planning/saved-items";
import { PageIntro } from "@/components/ui/page-intro";
import { createCanonicalPageMetadata } from "@/lib/metadata";

export const metadata = {
  ...createCanonicalPageMetadata(
    "/salvos",
    "Destinos e experiências salvos",
    "Consulte e gerencie os destinos e as experiências salvos neste navegador.",
  ),
  robots: { index: false, follow: true },
};

export default function SavedItemsPage() {
  return (
    <div className="editorial-page">
      <Container>
        <PageIntro
          description="Seus itens salvos ficam localmente neste navegador e não exigem cadastro."
          eyebrow="Sua coleção local"
          title="Destinos e experiências salvos"
        />
        <SavedItems />
      </Container>
    </div>
  );
}
