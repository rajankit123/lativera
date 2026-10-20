import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { FlightRoute } from "@/data/flight-routes";
import { TravelImage } from "@/components/ui/travel-image";

export function FlightRouteCard({ route }: { route: FlightRoute }) {
  return (
    <article className="flight-route-card">
      <div className="flight-route-card-images">
        <div className="flight-route-card-image image-frame">
          <TravelImage
            alt={route.origin.imageAlt}
            src={route.origin.image}
            sizes="(max-width: 700px) 50vw, (max-width: 1100px) 25vw, 20vw"
          />
        </div>
        <div className="flight-route-card-image image-frame">
          <TravelImage
            alt={route.destination.imageAlt}
            src={route.destination.image}
            sizes="(max-width: 700px) 50vw, (max-width: 1100px) 25vw, 20vw"
          />
        </div>
        <span aria-hidden="true" className="flight-route-arrow">
          <ArrowRight size={18} />
        </span>
      </div>
      <div className="flight-route-card-copy">
        <span className="eyebrow">
          {route.origin.code} <span aria-hidden="true">→</span>{" "}
          {route.destination.code}
        </span>
        <h3>
          <Link href={`/voos/${route.slug}`}>
            {route.origin.city} <span aria-hidden="true">→</span>{" "}
            {route.destination.city}
          </Link>
        </h3>
        <p>
          {route.origin.airportName} para {route.destination.airportName}
        </p>
        <Link className="text-link" href={`/voos/${route.slug}`}>
          Consultar com a equipe <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  );
}
