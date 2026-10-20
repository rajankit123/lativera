"use client";

import { useTravelPlanner } from "./travel-planner-provider";
import { DestinationCard, ExperienceCard } from "@/components/ui/travel-cards";
import { destinations } from "@/data/destinations";
import { experiences } from "@/data/experiences";

export function SavedItems() {
  const { saved, isReady, storageAvailable } = useTravelPlanner();
  const savedDestinations = destinations.filter(({ slug }) =>
    saved.destinations.includes(slug),
  );
  const savedExperiences = experiences.filter(({ slug }) =>
    saved.experiences.includes(slug),
  );
  const itemCount = savedDestinations.length + savedExperiences.length;

  if (!isReady) {
    return <p role="status">Carregando itens salvos neste navegador…</p>;
  }

  return (
    <div className="saved-items-page">
      {storageAvailable === false && (
        <p className="planner-notice" role="status">
          O armazenamento local está indisponível. Você pode salvar itens
          durante esta sessão, mas eles não permanecerão após fechar o
          navegador.
        </p>
      )}
      {itemCount ? (
        <>
          {savedDestinations.length > 0 && (
            <section aria-labelledby="saved-destinations-title" className="section-block">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">{saved.destinations.length} salvos</p>
                  <h2 id="saved-destinations-title">Destinos</h2>
                </div>
              </div>
              <div className="card-grid card-grid-three listing-grid">
                {savedDestinations.map((destination, index) => (
                  <DestinationCard
                    destination={destination}
                    imageLoading={index === 0 ? "eager" : "lazy"}
                    key={destination.slug}
                  />
                ))}
              </div>
            </section>
          )}
          {savedExperiences.length > 0 && (
            <section aria-labelledby="saved-experiences-title" className="section-block">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">{saved.experiences.length} salvas</p>
                  <h2 id="saved-experiences-title">Experiências</h2>
                </div>
              </div>
              <div className="card-grid card-grid-three listing-grid">
                {savedExperiences.map((experience, index) => (
                  <ExperienceCard
                    experience={experience}
                    imageLoading={index === 0 ? "eager" : "lazy"}
                    key={experience.slug}
                  />
                ))}
              </div>
            </section>
          )}
        </>
      ) : (
        <div className="planner-empty-state">
          <h2>Nenhum item salvo por enquanto</h2>
          <p>
            Use o botão “Salvar” nos cartões e nas páginas de destino ou
            experiência. Seus itens ficam associados a este navegador, sem
            cadastro.
          </p>
        </div>
      )}
      <p className="planner-helper">
        Itens salvos são armazenados somente no navegador deste dispositivo.
        Eles podem ser removidos ao limpar os dados do site e não são
        sincronizados entre dispositivos.
      </p>
    </div>
  );
}
