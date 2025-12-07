'use client';

import { useSearchParams } from 'next/navigation';

export default function Verificado() {
  const searchParams = useSearchParams();

  const ok = searchParams.get('ok');
  const error = searchParams.get('error');

  return (
    <main style={{ padding: 24, textAlign: 'center' }}>
      <h1>
        {ok === '1'
          ? ' E-mail verificado com sucesso!'
          : ' Não foi possível verificar seu e-mail'}
      </h1>
      {error && <p>Motivo: {error}</p>}
      <a
        href="/login"
        style={{ color: '#2563eb', textDecoration: 'underline' }}
      >
        Voltar ao login
      </a>
    </main>
  );
}
