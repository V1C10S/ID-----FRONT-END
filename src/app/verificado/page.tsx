export default async function Verificado({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string; error?: string }>;
}) {
  const params = await searchParams;

  return (
    <main style={{ padding: 24, textAlign: 'center' }}>
      <h1>
        {params.ok === '1'
          ? '✅ E-mail verificado com sucesso!'
          : '❌ Não foi possível verificar seu e-mail'}
      </h1>

      {params.error && <p>Motivo: {params.error}</p>}

      <a
        href="/login"
        style={{ color: '#2563eb', textDecoration: 'underline' }}
      >
        Voltar ao login
      </a>
    </main>
  );
}

