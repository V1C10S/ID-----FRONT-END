                                      'use client';
import './back.css';
import './card.css';
import './check.css';
import './butt.css';
import './assword.css';


import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type CheckboxProps = {
  id: string;
  label: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
};

function Checkbox({ id, label, checked, onChange, disabled }: CheckboxProps) {
  return (
    <div className="checkbox-custom-wrapper">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="checkbox-custom"
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

export default function Page() {
  const [username, setUsername] = useState('');
  const [senha, setSenha] = useState('');
  const [lembrar, setLembrar] = useState(false);
  const [erro, setErro] = useState('');
  const [visible, setVisible] = useState(false);
  const router = useRouter();

const handleSubmmit = async (e) => {
  e.preventDefault();
  if (!username || !senha) {
    setErro('Preencha todos os campos.');
    return;
  }
  if (username.length < 2 || senha.length < 2) {
    setErro('Os campos devem ter pelo menos uma letra.');
    return;
  }

  setErro('');

    try {
      const res = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password: senha,
        }),
      });

    const result = await res.json();

    if (res.status === 403 && result.error === "email_not_verified") {
  setErro("Confirme seu e-mail para continuar.");
  return;
}

    if (result.success) {
      try {

        localStorage.setItem('user', username);
      } catch (e) {
        console.error('Erro ao salvar usuário no localStorage:', e);
      }

      router.push('/home');
    } else {
      setErro(result.message || 'Usuário ou senha incorretos.');
    }
  } catch (err) {
    setErro('Erro de conexão com o servidor.');
  }
};

  return (
    <div className="background">
      <div className="card-tridimensional">
        <h1 className="card-title">LOGIN</h1>
        {erro && <div className="erro-login">{erro}</div>}


{/* Campo USER */}
      <div className="input-ribbon-wrapper">
        <div className="ribbon">
           <span></span> USERNAME
        </div>
        <input
            type="text"
            className="input-line"
            placeholder="Seu usuário"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
      </div>

{/* Campo SENHA */}
    <div className="input-ribbon-wrapper-pass">
        <div className="ribbon-2">
          <span></span>PASSWORD
        </div>
        <input type="text" style={{ display: 'none' }} autoComplete="username" />
        <input
            type={visible ? "text" : "password"}
            className="input-line-pass"
            placeholder="Sua senha"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            autoComplete="off"
            name="no-save-password"
          />
         <button
           type="button"
           className="toggle-password"
           onClick={() => setVisible(v => !v)}
           tabIndex={0}
           aria-label={visible ? "Ocultar senha" : "Exibir senha"}
         >        
           <img
               src={visible ? "https://img.icons8.com/?size=100&id=gz4RWMk8jmSl&format=png&color=960000" : "https://img.icons8.com/?size=100&id=xqLgR5TUSOL3&format=png&color=960000"}
               alt={visible ? "Senha visível" : "Senha oculta"}
               width="32"
               height="32"
               style={{ transition: "opacity 0.3s" }}
             />
         </button>
    </div>

{/* CHECKBOX */}
        <Checkbox
          id="lembrar"
          label="Lembrar-me"
          checked={lembrar}
          onChange={e => setLembrar(e.target.checked)}
        />

{/* BUTTONS */}
    <form onSubmit={handleSubmmit}>
        <div className="buttons">
          <button className="button-custom" type="submit">
            <span>ENTRAR</span>
          </button>
            <button className="button-custom" type="button" onClick={() => router.push('/sign')}>
            <span>CADASTRAR</span>
          </button>
        </div>
    </form>
  </div>
</div>
);
}
