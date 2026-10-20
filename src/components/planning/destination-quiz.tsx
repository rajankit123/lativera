"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import {
  DestinationCard,
  ExperienceCard,
} from "@/components/ui/travel-cards";
import { destinations } from "@/data/destinations";
import { experiences } from "@/data/experiences";
import {
  destinationInterests,
  rankExperiences,
  rankDestinations,
  travelStyles,
  type DestinationInterest,
  type DestinationQuizAnswers,
  type TravelStyle,
} from "@/lib/destination-matching";

type QuizFormAnswers = {
  interests: DestinationInterest[];
  duration: DestinationQuizAnswers["duration"] | "";
  budget: DestinationQuizAnswers["budget"] | "";
  style: TravelStyle | "";
  region: string;
};

const initialAnswers: QuizFormAnswers = {
  interests: [],
  duration: "",
  budget: "",
  style: "",
  region: "",
};

const durationOptions = [
  { value: "1-3", label: "1 a 3 dias" },
  { value: "4-7", label: "4 a 7 dias" },
  { value: "8-plus", label: "8 dias ou mais" },
] as const;

const budgetOptions = [
  { value: "up-to-1500", label: "Até R$ 1.500 por pessoa" },
  { value: "1501-3000", label: "De R$ 1.501 a R$ 3.000 por pessoa" },
  { value: "3001-6000", label: "De R$ 3.001 a R$ 6.000 por pessoa" },
  { value: "over-6000", label: "Acima de R$ 6.000 por pessoa" },
] as const;

export function DestinationQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizFormAnswers>(initialAnswers);
  const [error, setError] = useState("");
  const [resultAnswers, setResultAnswers] =
    useState<DestinationQuizAnswers | null>(null);
  const stepHeadingRef = useRef<HTMLLegendElement>(null);
  const resultsHeadingRef = useRef<HTMLHeadingElement>(null);
  const previousStep = useRef(step);

  const rankedDestinations = useMemo(
    () => (resultAnswers ? rankDestinations(destinations, resultAnswers) : []),
    [resultAnswers],
  );
  const rankedExperiences = useMemo(
    () =>
      resultAnswers
        ? rankExperiences(experiences, destinations, resultAnswers)
        : [],
    [resultAnswers],
  );
  const recommendations = rankedDestinations.length
    ? rankedDestinations
    : resultAnswers
      ? destinations.slice(0, 3).map((destination) => ({
          destination,
          score: 0,
          reasons: [],
        }))
      : [];
  const recommendedDestinationSlugs = new Set(
    recommendations.map(({ destination }) => destination.slug),
  );
  const experienceSuggestions = rankedExperiences.length
    ? rankedExperiences
    : experiences
        .filter((experience) =>
          recommendedDestinationSlugs.has(experience.destinationSlug),
        )
        .slice(0, 3)
        .map((experience) => ({
          experience,
          score: 0,
          reasons: [],
        }));

  useEffect(() => {
    if (previousStep.current !== step) stepHeadingRef.current?.focus();
    previousStep.current = step;
  }, [step]);

  useEffect(() => {
    if (resultAnswers) resultsHeadingRef.current?.focus();
  }, [resultAnswers]);

  function submitStep(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step === 0 && answers.interests.length === 0) {
      setError("Escolha pelo menos um interesse para continuar.");
      return;
    }
    if (step === 1 && (!answers.duration || !answers.budget)) {
      setError("Selecione a duração e a faixa de orçamento para continuar.");
      return;
    }
    if (step === 2) {
      if (!answers.style) {
        setError("Escolha um estilo de viagem para ver as recomendações.");
        return;
      }
      if (!answers.duration || !answers.budget) {
        setError("Complete as preferências de duração e orçamento.");
        setStep(1);
        return;
      }
      setResultAnswers({
        interests: answers.interests,
        duration: answers.duration,
        budget: answers.budget,
        style: answers.style,
        region: answers.region,
      });
      setError("");
      return;
    }
    setError("");
    setStep((current) => current + 1);
  }

  function restartQuiz() {
    setAnswers(initialAnswers);
    setResultAnswers(null);
    setStep(0);
    setError("");
  }

  function toggleInterest(interest: DestinationInterest) {
    setAnswers((current) => ({
      ...current,
      interests: current.interests.includes(interest)
        ? current.interests.filter((item) => item !== interest)
        : [...current.interests, interest],
    }));
    setError("");
  }

  const budgetLabel = budgetOptions.find(
    ({ value }) => value === resultAnswers?.budget,
  )?.label;

  if (resultAnswers) {
    return (
      <div className="quiz-results">
        <div className="quiz-result-intro">
          <p className="eyebrow">Sua seleção</p>
          <h2 ref={resultsHeadingRef} tabIndex={-1}>
            Ideias que combinam com suas preferências
          </h2>
          <p>
            Interesses:{" "}
            {resultAnswers.interests
              .map(
                (interest) =>
                  destinationInterests.find((item) => item.id === interest)?.label,
              )
              .filter(Boolean)
              .join(", ")}
            . Duração:{" "}
            {durationOptions.find(({ value }) => value === resultAnswers.duration)?.label}.
            Orçamento informado: {budgetLabel}.
          </p>
          <p className="fine-print">
            O orçamento não é usado para prever custos ou classificar destinos:
            a Lativera não tem estimativas verificadas de transporte,
            hospedagem, alimentação ou atividades. A duração só influencia
            quando um destino já está identificado no conteúdo como escapada
            de fim de semana. Confirme condições atuais antes de viajar.
          </p>
        </div>
        {rankedDestinations.length === 0 && (
          <p className="planner-notice" role="status">
            Não encontramos uma correspondência direta entre todos os seus
            interesses e os marcadores atuais. Estas sugestões editoriais são
            um ponto de partida; explore os detalhes para escolher.
          </p>
        )}
        <div className="card-grid card-grid-three listing-grid">
          {recommendations.map(({ destination, reasons }, index) => (
            <div className="quiz-recommendation" key={destination.slug}>
              <p className="quiz-match-reason">
                {reasons.length
                  ? `Por que combina: ${reasons.join("; ")}.`
                  : "Sugestão editorial para ampliar sua busca."}
              </p>
              <DestinationCard
                destination={destination}
                imageLoading={index === 0 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>
        <section aria-labelledby="quiz-experiences-title" className="quiz-experience-results">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Ideias relacionadas</p>
              <h2 id="quiz-experiences-title">Experiências para continuar explorando</h2>
            </div>
          </div>
          {experienceSuggestions.length ? (
            <div className="card-grid card-grid-three listing-grid">
              {experienceSuggestions.map(({ experience, reasons }) => (
                <div className="quiz-recommendation" key={experience.slug}>
                  <p className="quiz-match-reason">
                    {reasons.length
                      ? `Por que combina: ${reasons.join("; ")}.`
                      : "Experiência relacionada a um dos destinos sugeridos; ainda não há marcador específico para todas as suas preferências."}
                  </p>
                  <ExperienceCard experience={experience} imageLoading="lazy" />
                </div>
              ))}
            </div>
          ) : (
            <p className="planner-notice">
              Ainda não há experiências cadastradas para os destinos sugeridos.
              Explore o catálogo para conhecer outras ideias.
            </p>
          )}
        </section>
        <button className="button button-secondary" onClick={restartQuiz} type="button">
          Refazer o quiz
        </button>
      </div>
    );
  }

  return (
    <section aria-labelledby="quiz-step-title" className="planner-panel quiz-panel">
      <div
        aria-label={`Etapa ${step + 1} de 3`}
        aria-valuemax={3}
        aria-valuemin={1}
        aria-valuenow={step + 1}
        className="quiz-progress"
        role="progressbar"
      >
        <span style={{ width: `${((step + 1) / 3) * 100}%` }} />
      </div>
      <p className="eyebrow">Etapa {step + 1} de 3</p>
      <form onSubmit={submitStep}>
        {step === 0 && (
          <fieldset className="quiz-fieldset">
            <legend id="quiz-step-title" ref={stepHeadingRef} tabIndex={-1}>
              O que você gostaria de explorar?
            </legend>
            <p className="planner-helper">Escolha uma ou mais opções.</p>
            <div className="quiz-choice-grid">
              {destinationInterests.map((interest) => (
                <label className="quiz-choice" key={interest.id}>
                  <input
                    checked={answers.interests.includes(interest.id)}
                    onChange={() => toggleInterest(interest.id)}
                    type="checkbox"
                  />
                  <span>{interest.label}</span>
                </label>
              ))}
            </div>
          </fieldset>
        )}
        {step === 1 && (
          <fieldset className="quiz-fieldset">
            <legend id="quiz-step-title" ref={stepHeadingRef} tabIndex={-1}>
              Como você está planejando?
            </legend>
            <div className="form-field">
              <label htmlFor="quiz-duration">Duração aproximada</label>
              <select
                id="quiz-duration"
                onChange={(event) =>
                  setAnswers((current) => ({
                    ...current,
                    duration: event.target.value as QuizFormAnswers["duration"],
                  }))
                }
                value={answers.duration}
              >
                <option value="">Selecione a duração</option>
                {durationOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="quiz-budget">Orçamento aproximado por pessoa</label>
              <select
                id="quiz-budget"
                onChange={(event) =>
                  setAnswers((current) => ({
                    ...current,
                    budget: event.target.value as QuizFormAnswers["budget"],
                  }))
                }
                value={answers.budget}
              >
                <option value="">Selecione uma faixa</option>
                {budgetOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <span className="planner-helper">
                Esta resposta ajuda a organizar sua ideia, mas não representa
                preços de viagem e não é usada para estimar custos.
              </span>
            </div>
          </fieldset>
        )}
        {step === 2 && (
          <fieldset className="quiz-fieldset">
            <legend id="quiz-step-title" ref={stepHeadingRef} tabIndex={-1}>
              Qual estilo tem mais a ver com você?
            </legend>
            <div className="form-field">
              <label htmlFor="quiz-style">Estilo de viagem</label>
              <select
                id="quiz-style"
                onChange={(event) =>
                  setAnswers((current) => ({
                    ...current,
                    style: event.target.value as QuizFormAnswers["style"],
                  }))
                }
                value={answers.style}
              >
                <option value="">Selecione um estilo</option>
                {travelStyles.map((style) => (
                  <option key={style.id} value={style.id}>
                    {style.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="quiz-region">Região de preferência (opcional)</label>
              <select
                id="quiz-region"
                onChange={(event) =>
                  setAnswers((current) => ({ ...current, region: event.target.value }))
                }
                value={answers.region}
              >
                <option value="">Qualquer região</option>
                {[...new Set(destinations.map(({ region }) => region))]
                  .sort((first, second) => first.localeCompare(second, "pt-BR"))
                  .map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
              </select>
            </div>
          </fieldset>
        )}
        {error && (
          <p className="form-status planner-error" id="quiz-error" role="alert">
            {error}
          </p>
        )}
        <div className="planner-navigation">
          <button
            className="button button-secondary"
            disabled={step === 0}
            onClick={() => {
              setStep((current) => current - 1);
              setError("");
            }}
            type="button"
          >
            Voltar
          </button>
          <button className="button button-primary" type="submit">
            {step === 2 ? "Ver recomendações" : "Continuar"}
          </button>
          <button className="planner-text-button" onClick={restartQuiz} type="button">
            Reiniciar
          </button>
        </div>
      </form>
    </section>
  );
}
