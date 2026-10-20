import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { ContactForm } from "@/components/ui/contact-form";
import { PageIntro } from "@/components/ui/page-intro";
import { createCanonicalPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createCanonicalPageMetadata(
  "/contato",
  "Contato",
  "Envie uma mensagem à equipe da Lativera. O formulário ainda não está conectado a um serviço de envio.",
);

export default function ContactPage() {
  return (
    <div className="editorial-page">
      <Container>
        <PageIntro
          description="Tem uma sugestão de destino, uma dúvida sobre o conteúdo ou quer compartilhar uma ideia? Conte para nós."
          eyebrow="Vamos conversar"
          title="Entre em contato"
        />
        <div className="contact-layout">
          <aside className="contact-note">
            <p className="eyebrow">Uma observação</p>
            <h2>Estamos preparando este canal.</h2>
            <p>
              O formulário ajuda a organizar sua mensagem, mas ainda não está
              conectado a um serviço de envio. As informações preenchidas não
              são transmitidas nem armazenadas pela Lativera.
            </p>
          </aside>
          <ContactForm />
        </div>
      </Container>
    </div>
  );
}
