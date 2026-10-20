import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { PageIntro } from "@/components/ui/page-intro";
import { photoCredits } from "@/data/photo-credits";
import { createCanonicalPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createCanonicalPageMetadata(
  "/fontes-e-creditos",
  "Fontes e créditos de imagem",
  "Consulte a autoria, a fonte e a licença das fotografias usadas nas páginas da Lativera.",
);

export default function SourcesAndCreditsPage() {
  const credits = Object.entries(photoCredits);

  return (
    <div className="editorial-page">
      <Container>
        <PageIntro
          description="A Lativera usa fotografias com informações de autoria e licença identificadas. Consulte a página de origem para verificar os termos aplicáveis a cada imagem."
          eyebrow="Transparência e atribuição"
          title="Fontes e créditos de imagem"
        />
        <p>
          As fotografias são contribuições de terceiros e não são apresentadas
          como imagens exclusivas da Lativera. As condições de reutilização
          dependem da licença indicada na fonte.
        </p>
        <ul className="image-credit-list">
          {credits.map(([src, credit]) => (
            <li className="image-credit-item" key={src}>
              <h2>{credit.title}</h2>
              <p>
                Fotografia: {credit.artist}. Arquivo local:{" "}
                <code>{src}</code>.
              </p>
              <p>
                <a href={credit.sourceUrl} rel="noreferrer" target="_blank">
                  Ver fonte original
                </a>
                {" · "}
                <a href={credit.licenseUrl} rel="noreferrer" target="_blank">
                  Consultar licença {credit.license}
                </a>
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
