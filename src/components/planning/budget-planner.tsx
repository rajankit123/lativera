"use client";

import { useMemo, useState, type FormEvent } from "react";

const expenseCategories = [
  { id: "transport", label: "Transporte" },
  { id: "stay", label: "Hospedagem" },
  { id: "food", label: "Alimentação" },
  { id: "activities", label: "Atividades" },
  { id: "other", label: "Outros gastos" },
] as const;

type ExpenseId = (typeof expenseCategories)[number]["id"];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 2,
  }).format(value);
}

function asAmount(value: string) {
  if (!value.trim()) return 0;
  const amount = Number(value);
  return Number.isFinite(amount) && amount >= 0 ? amount : 0;
}

export function BudgetPlanner() {
  const [totalBudget, setTotalBudget] = useState("");
  const [duration, setDuration] = useState("3");
  const [travelers, setTravelers] = useState("1");
  const [expenses, setExpenses] = useState<Record<ExpenseId, string>>({
    transport: "",
    stay: "",
    food: "",
    activities: "",
    other: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const totals = useMemo(() => {
    const expenseTotal = Object.values(expenses).reduce(
      (sum, amount) => sum + asAmount(amount),
      0,
    );
    const budget = asAmount(totalBudget);
    const travelerCount = Math.max(1, Number(travelers) || 1);
    const dayCount = Math.max(1, Number(duration) || 1);
    return {
      expenseTotal,
      budget,
      remaining: budget - expenseTotal,
      perTraveler: budget / travelerCount,
      perDay: budget / travelerCount / dayCount,
    };
  }, [duration, expenses, totalBudget, travelers]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    setSubmitted(true);
  }

  return (
    <div className="budget-layout">
      <form className="planner-panel budget-form" onSubmit={handleSubmit}>
        <fieldset className="planner-fieldset">
          <legend>Informações da viagem</legend>
          <div className="form-field">
            <label htmlFor="budget-total">Orçamento total planejado (R$)</label>
            <input
              id="budget-total"
              inputMode="decimal"
              min="0"
              onChange={(event) => setTotalBudget(event.target.value)}
              placeholder="Ex.: 5000"
              required
              step="0.01"
              type="number"
              value={totalBudget}
            />
          </div>
          <div className="form-field">
            <label htmlFor="budget-duration">Duração da viagem (dias)</label>
            <input
              id="budget-duration"
              min="1"
              onChange={(event) => setDuration(event.target.value)}
              required
              step="1"
              type="number"
              value={duration}
            />
          </div>
          <div className="form-field">
            <label htmlFor="budget-travelers">Número de viajantes</label>
            <input
              id="budget-travelers"
              min="1"
              onChange={(event) => setTravelers(event.target.value)}
              required
              step="1"
              type="number"
              value={travelers}
            />
          </div>
        </fieldset>

        <fieldset className="planner-fieldset">
          <legend>Suas despesas estimadas (opcional)</legend>
          <p className="planner-helper">
            Informe valores que você pesquisou ou estimou. Os campos começam
            vazios; a Lativera não fornece preços nem cotações.
          </p>
          {expenseCategories.map((category) => (
            <div className="form-field" key={category.id}>
              <label htmlFor={`expense-${category.id}`}>
                {category.label} (R$)
              </label>
              <input
                id={`expense-${category.id}`}
                inputMode="decimal"
                min="0"
                onChange={(event) =>
                  setExpenses((current) => ({
                    ...current,
                    [category.id]: event.target.value,
                  }))
                }
                placeholder="Opcional"
                step="0.01"
                type="number"
                value={expenses[category.id]}
              />
            </div>
          ))}
        </fieldset>
        <button className="button button-primary" type="submit">
          Atualizar planejamento
        </button>
        {submitted && (
          <p className="form-status" role="status">
            Planejamento atualizado com os valores informados. Revise as
            premissas antes de tomar decisões de viagem.
          </p>
        )}
      </form>

      <aside aria-labelledby="budget-summary-title" className="planner-panel budget-summary">
        <p className="eyebrow">Estimativa pessoal</p>
        <h2 id="budget-summary-title">Resumo do orçamento</h2>
        <dl className="budget-summary-list">
          <div>
            <dt>Orçamento total informado</dt>
            <dd>{formatCurrency(totals.budget)}</dd>
          </div>
          <div>
            <dt>Subtotal das categorias informadas</dt>
            <dd>{formatCurrency(totals.expenseTotal)}</dd>
          </div>
          {expenseCategories.map((category) => (
            <div key={category.id}>
              <dt>{category.label} estimado</dt>
              <dd>
                {expenses[category.id]
                  ? formatCurrency(asAmount(expenses[category.id]))
                  : "Não informado"}
              </dd>
            </div>
          ))}
          <div className={totals.remaining < 0 ? "budget-negative" : ""}>
            <dt>Diferença entre orçamento e despesas preenchidas</dt>
            <dd>{formatCurrency(totals.remaining)}</dd>
          </div>
          <div>
            <dt>Orçamento médio por pessoa</dt>
            <dd>{formatCurrency(totals.perTraveler)}</dd>
          </div>
          <div>
            <dt>Orçamento médio por pessoa/dia</dt>
            <dd>{formatCurrency(totals.perDay)}</dd>
          </div>
        </dl>
        <p className="planner-notice">
          Valores são cálculos ilustrativos baseados somente nos dados que você
          informou. Não incluem uma pesquisa automática e não garantem que a
          viagem caiba no orçamento. Confira tarifas, taxas, datas, câmbio e
          condições diretamente com os fornecedores.
        </p>
      </aside>
    </div>
  );
}
