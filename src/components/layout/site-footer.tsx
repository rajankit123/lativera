import Link from "next/link";
import { Container } from "./container";
import { siteNavigation } from "@/lib/navigation";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Container>
        <div className="footer-content">
          <div className="footer-brand">
            <Link className="footer-wordmark" href="/">
              Lativera
            </Link>
            <p>
              Descubra destinos, atrações, experiências e guias de viagem para
              quem vive no Brasil.
            </p>
          </div>

          <nav aria-label="Navegação do rodapé" className="footer-navigation">
            <ul>
              {siteNavigation.map((item) => (
                <li key={item.label}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© Lativera</span>
          <Link href="/fontes-e-creditos">Fontes e créditos</Link>
        </div>
      </Container>
    </footer>
  );
}
