import Link from "next/link";
import { Container } from "@/components/layout/container";
import { PageIntro } from "@/components/ui/page-intro";

export default function NotFound() {
  return (
    <div className="editorial-page">
      <Container>
        <PageIntro
          description="O endereço pode ter mudado ou não existir. Explore nossos destinos e encontre outro caminho."
          eyebrow="Página não encontrada"
          title="Este caminho não está no mapa."
        />
        <Link className="button button-primary" href="/destinos">
          Explorar destinos
        </Link>
      </Container>
    </div>
  );
}
