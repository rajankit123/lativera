import { ArrowUpRight, MessageCircle, Phone } from "lucide-react";
import { createFlightWhatsAppUrl, flightContactNumbers } from "@/lib/flight-contact";
import type { FlightRoute } from "@/data/flight-routes";

export function FlightContactOptions({ route }: { route?: FlightRoute }) {
  return (
    <div className="flight-contact-options">
      {flightContactNumbers.map((contact, index) => (
        <article className="flight-contact-card" key={contact.international}>
          <div className="flight-contact-copy">
            <span className="eyebrow">
              {index === 0 ? "Fale com nossa equipe" : `Opção ${index + 1}`}
            </span>
            <h3>{contact.label}</h3>
          </div>
          <div className="flight-contact-actions">
            <a
              aria-label={`Ligar para ${contact.label}`}
              className="button button-secondary"
              href={`tel:+${contact.international}`}
            >
              <Phone aria-hidden="true" size={17} />
              Ligar
            </a>
            <a
              aria-label={`Conversar pelo WhatsApp com ${contact.label}`}
              className="button button-primary"
              href={createFlightWhatsAppUrl(contact.international, route)}
              rel="noreferrer"
              target="_blank"
            >
              <MessageCircle aria-hidden="true" size={17} />
              WhatsApp
              <ArrowUpRight aria-hidden="true" size={15} />
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}
