"use client";

import { useEffect, useState } from "react";

// Contador compartilhado no serviço gratuito Abacus (https://abacus.jasoncameron.dev).
// Cada clique soma 1 no servidor; o número salvo lá é o que aparece para todo mundo.
const URL_CONTADOR = "https://abacus.jasoncameron.dev/{acao}/clone-tabnews-ia-poema/instante";

async function chamar(acao) {
  const r = await fetch(URL_CONTADOR.replace("{acao}", acao), { cache: "no-store" });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const { value } = await r.json();
  if (typeof value !== "number") throw new Error("Resposta inválida");
  return value;
}

export default function Curtir() {
  const [valor, setValor] = useState(null); // null = ainda não sabemos o número do servidor
  const [curtido, setCurtido] = useState(false);

  const atualizar = (novo) => setValor((atual) => Math.max(atual ?? 0, novo));

  useEffect(() => {
    const carregar = () =>
      chamar("get")
        .then(atualizar)
        .catch((erro) => console.error("Não foi possível carregar as curtidas:", erro));

    // No celular a aba fica "congelada" em segundo plano e volta sem recarregar:
    // busca o número de novo sempre que a página volta a ficar visível.
    const aoVoltar = () => document.visibilityState === "visible" && carregar();
    const aoMostrar = (e) => e.persisted && carregar();

    carregar();
    document.addEventListener("visibilitychange", aoVoltar);
    window.addEventListener("pageshow", aoMostrar);
    return () => {
      document.removeEventListener("visibilitychange", aoVoltar);
      window.removeEventListener("pageshow", aoMostrar);
    };
  }, []);

  async function curtir() {
    setCurtido(true);
    setValor((atual) => (atual === null ? null : atual + 1));
    try {
      atualizar(await chamar("hit"));
    } catch (erro) {
      console.error("Não foi possível salvar a curtida:", erro);
      setValor((atual) => (atual === null ? null : atual - 1));
    }
  }

  return (
    <button
      className={curtido ? "curtir curtido" : "curtir"}
      type="button"
      aria-label="Curtir o poema"
      onClick={curtir}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 21s-7.5-4.6-9.5-9.4C1.2 8.4 3.3 4.5 7 4.5c2.1 0 3.6 1.1 5 3 1.4-1.9 2.9-3 5-3 3.7 0 5.8 3.9 4.5 7.1C19.5 16.4 12 21 12 21z" />
      </svg>
      <span className="contador">{valor ?? "–"}</span>
    </button>
  );
}
