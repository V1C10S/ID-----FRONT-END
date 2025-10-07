export default function Verificado({ searchParams }: { searchParams: { ok?: string; error?: string } }) {
  return (
    <main style={{ padding: 24, textAlign: "center" }}>
      <h1>
        {searchParams.ok
          ? "✅ E-mail verificado com sucesso!"
          : "❌ Não foi possível verificar seu e-mail"}
      </h1>
      {searchParams.error && <p>Motivo: {searchParams.error}</p>}
      <a href="/login" style={{ color: "#2563eb", textDecoration: "underline" }}>
        Voltar ao login
      </a>
    </main>
  );
}
