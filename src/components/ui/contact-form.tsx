"use client";

import { useState, type FormEvent } from "react";

export function ContactForm() {
  const [status, setStatus] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    setStatus(
      "Os campos estão preenchidos corretamente, mas sua mensagem não foi enviada. O formulário ainda não está conectado a um serviço.",
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="contact-name">Seu nome</label>
        <input
          autoComplete="name"
          id="contact-name"
          maxLength={100}
          name="name"
          required
        />
      </div>
      <div className="form-field">
        <label htmlFor="contact-email">E-mail</label>
        <input
          autoComplete="email"
          id="contact-email"
          maxLength={254}
          name="email"
          required
          type="email"
        />
      </div>
      <div className="form-field">
        <label htmlFor="contact-subject">Assunto</label>
        <select defaultValue="" id="contact-subject" name="subject" required>
          <option disabled value="">Selecione uma opção</option>
          <option value="suggestion">Sugestão de conteúdo</option>
          <option value="question">Dúvida sobre a Lativera</option>
          <option value="other">Outro assunto</option>
        </select>
      </div>
      <div className="form-field">
        <label htmlFor="contact-message">Mensagem</label>
        <textarea
          id="contact-message"
          maxLength={2000}
          minLength={10}
          name="message"
          required
          rows={5}
        />
      </div>
      <button
        className="button button-primary"
        type="submit"
      >
        Validar formulário
      </button>
      <p aria-live="polite" className="form-status" role="status">
        {status}
      </p>
    </form>
  );
}
