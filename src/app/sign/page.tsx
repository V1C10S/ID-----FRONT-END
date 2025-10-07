'use client';

import './gback.css';
import './gcard.css';
import './gcheck.css';
import './gbutt.css';
import './gpass.css';
import './gmodal.css';

import React, { useState } from 'react';
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
    <div className="checkbox-alt-wrapper"> 
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="checkbox-alt" 
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [email1, setEmail1] = useState('');
  const [email2, setEmail2] = useState('');
  const [senha1, setSenha1] = useState('');
  const [senha2, setSenha2] = useState('');
  const [nascimento, setNascimento] = useState('');
  const [cpf, setCpf] = useState('');
  const [erro, setErro] = useState('');
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [termos, setTermos] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);
  const [checkboxBlocked, setCheckboxBlocked] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !email1 || !email2 || !senha1 || !senha2 || !nascimento || !cpf) {
      setErro('Preencha todos os campos.');
      return;
    }
    if (senha1 !== senha2) {
      setErro('As senhas não coincidem.');
      return;
    }
    if (email1 !== email2) {
      setErro('Os emails não coincidem.');
      return;
    }
    const [diaStr, mesStr, anoStr] = nascimento.split('/');
    const dia = Number(diaStr);
    const mes = Number(mesStr);
    const ano = Number(anoStr);

    if (!dia || !mes || !ano || dia < 1 || dia > 31 || mes < 1 || mes > 12 || ano < 1900 || ano > 3000) {
      setErro('Data de nascimento inválida.');
      return;
    }

    const cpfLimpo = cpf.replace(/\D/g, '');
    if (cpfLimpo.length !== 11) {
      setErro('CPF inválido.');
      return;
    }

    if (!termos) {
      setErro('Você deve aceitar os termos.');
      return;
    }

    setErro('');
    try {
  const res = await fetch('http://localhost:5500/sign', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username,
      password: senha1,
      email1,
      email2,
      nascimento,
      cpf
    })
  });

  const result = await res.json();
  if (result.success) {
    router.push('/login');
  } else {
    setErro(result.message || 'Erro no cadastro. Tente novamente.');
  }
} catch (err) {
  setErro('Erro de conexão com o servidor. ' + err);
  console.error('Erro no fetch:', err); 
    }
  };

  const handleNascimentoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 8) value = value.slice(0, 8);

    const dia = value.slice(0, 2);
    const mes = value.slice(2, 4);
    const ano = value.slice(4, 8);

    let formatted = dia;
    if (mes) formatted += '/' + mes;
    if (ano) formatted += '/' + ano;

    setNascimento(formatted);
  };

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);

    let formatted = value;
    if (value.length > 9) formatted = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    else if (value.length > 6) formatted = value.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
    else if (value.length > 3) formatted = value.replace(/(\d{3})(\d{1,3})/, '$1.$2');

    setCpf(formatted);
  };

  const handleCheckboxClick = () => {
    if (!checkboxBlocked) setModalAberto(true);
  };

  const handleConcordo = () => {
    setTermos(true);
    setCheckboxBlocked(true);
    setModalAberto(false);
  };

  return (
    <div className="background-alt">
      <div className="card-alt">
        <h1 className="card-title-alt">SIGN UP</h1> 
        {erro && <div className="erro-signup-alt">{erro}</div>} 

        <form onSubmit={handleSubmit} className="form-wrapper-alt">
          {/* USERNAME */}
          <div className="form-row-alt"> 
            <div className="ribbon-alt">USERNAME</div> 
            <input
              type="text"
              className="input-line-alt" 
              placeholder="Seu usuário"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>

          {/* EMAIL */}
          <div className="form-row-alt">
            <div className="ribbon-alt">EMAIL</div>
            <input
              type="email"
              className="input-line-alt"
              placeholder="Email principal"
              value={email1}
              onChange={e => setEmail1(e.target.value)}
            />
          </div>

          {/* CONFIRM EMAIL */}
          <div className="form-row-alt">
            <div className="ribbon-alt">CONFIRMAR</div>
            <input
              type="email"
              className="input-line-alt"
              placeholder="Repita o email"
              value={email2}
              onChange={e => setEmail2(e.target.value)}
            />
          </div>

          {/* PASSWORD */}
          <div className="form-row-alt">
            <div className="ribbon-2-alt">PASSWORD</div>
            <div className="password-wrapper-alt"> 
              <input type="text" style={{ display: 'none' }} autoComplete="username" />
              <input
                type={visible1 ? "text" : "password"}
                className="input-line-pass-alt" 
                placeholder="Senha"
                value={senha1}
                onChange={e => setSenha1(e.target.value)}
                autoComplete="off"
                name="no-save-password"
              />
              <button type="button" className="toggle-password-alt" onClick={() => setVisible1(v => !v)}> {/* Alterado */}
                <img
                  src={visible1
                    ? "https://img.icons8.com/?size=100&id=gz4RWMk8jmSl&format=png&color=960000"
                    : "https://img.icons8.com/?size=100&id=xqLgR5TUSOL3&format=png&color=960000"}
                  alt={visible1 ? "Senha visível" : "Senha oculta"}
                  width="32"
                  height="32"
                />
              </button>
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="form-row-alt">
            <div className="ribbon-2-alt">CONFIRMAR</div>
            <div className="password-wrapper-alt">
              <input type="text" style={{ display: 'none' }} autoComplete="username" />
              <input
                type={visible2 ? "text" : "password"}
                className="input-line-pass-alt"
                placeholder="Repita a senha"
                value={senha2}
                onChange={e => setSenha2(e.target.value)}
                autoComplete="off"
                name="no-save-password"
              />
              <button type="button" className="toggle-password-alt" onClick={() => setVisible2(v => !v)}>
                <img
                  src={visible2
                    ? "https://img.icons8.com/?size=100&id=gz4RWMk8jmSl&format=png&color=960000"
                    : "https://img.icons8.com/?size=100&id=xqLgR5TUSOL3&format=png&color=960000"}
                  alt={visible2 ? "Senha visível" : "Senha oculta"}
                  width="32"
                  height="32"
                />
              </button>
            </div>
          </div>

          {/* NASCIMENTO */}
          <div className="form-row-alt">
            <div className="ribbon-alt">NASCIMENTO</div>
            <input
              type="text"
              className="input-line-alt"
              placeholder="DD/MM/YYYY"
              value={nascimento}
              onChange={handleNascimentoChange}
              maxLength={10}
              autoComplete="off"
              inputMode="numeric"
              spellCheck={false}
            />
          </div>

          {/* CPF */}
          <div className="form-row-alt">
            <div className="ribbon-alt">CPF</div>
            <input
              type="text"
              className="input-line-alt"
              placeholder="000.000.000-00"
              value={cpf}
              onChange={handleCpfChange}
            />
          </div>

          {/* CHECKBOX */}
          <Checkbox
            id="termos"
            label="Aceito os termos"
            checked={termos}
            onChange={handleCheckboxClick}
            disabled={checkboxBlocked}
          />

          {/* MODAL */}
          {modalAberto && (
            <div className="modal-termos-alt"> 
              <div className="modal-content-alt"> 
                <h2 style={{ marginTop: '5px', marginBottom: '35px' }}>TERMOS DE USO</h2>
                <p><>
  <h3 style={{ marginBottom: '10px' }}>1. ACESSO E ACEITAÇÃO</h3>
  <p style={{ marginBottom: '15px' }}>
    Ao acessar e utilizar este aplicativo/plataforma, o usuário concorda integralmente com este Termo de Uso, que estabelece regras sobre acesso, utilização, responsabilidades e direitos relacionados ao serviço disponibilizado.
  </p>
  <p style={{ marginBottom: '35px' }}>
    O uso desta plataforma implica a aceitação automática e irrestrita de todas as condições presentes neste documento. Caso não concorde, o usuário deve interromper imediatamente o uso do serviço.
  </p>

  <h3 style={{ marginBottom: '10px' }}>2. CADASTRO</h3>
  <p style={{ marginBottom: '35px' }}>
    O usuário é responsável por fornecer informações verdadeiras, completas e atualizadas durante o processo de cadastro, sendo responsabilizado pela veracidade dos dados informados.
  </p>

  <h3 style={{ marginBottom: '10px' }}>3. PROPRIEDADE INTELECTUAL</h3>
  <p style={{ marginBottom: '35px' }}>
    Todo o conteúdo deste aplicativo/plataforma, incluindo textos, imagens, códigos, logos e marcas, está protegido por direitos autorais e propriedade intelectual, não podendo ser copiado ou reproduzido sem autorização.
  </p>

  <h3 style={{ marginBottom: '10px' }}>4. PRIVACIDADE E DADOS PESSOAIS</h3>
  <p style={{ marginBottom: '35px' }}>
    O serviço respeita a privacidade dos usuários e cumpre as normas da LGPD. Informações pessoais são coletadas apenas para fins de funcionamento do serviço e não serão compartilhadas com terceiros sem consentimento expresso.
  </p>

  <h3 style={{ marginBottom: '10px' }}>5. OBRIGAÇÕES DO USUÁRIO</h3>
  <p style={{ marginBottom: '35px' }}>
    O usuário se compromete a utilizar o serviço de acordo com a legislação vigente, sem praticar atos ilícitos, vandalismo, tentativas de ataque ou violação de direitos de terceiros.
  </p>

  <h3 style={{ marginBottom: '10px' }}>6. LIMITAÇÃO DE RESPONSABILIDADE</h3>
  <p style={{ marginBottom: '35px' }}>
    O provedor do serviço não se responsabiliza por eventuais danos ou perdas decorrentes do uso ou impossibilidade de uso do serviço, incluindo falhas técnicas, indisponibilidade ou erro de funcionamento.
  </p>

  <h3 style={{ marginBottom: '10px' }}>7. ALTERAÇÕES NOS TERMOS</h3>
  <p style={{ marginBottom: '35px' }}>
    O provedor reserva-se o direito de modificar este documento a qualquer momento. Recomenda-se que o usuário consulte esta página regularmente.
  </p>

  <h3 style={{ marginBottom: '10px' }}>8. CONTATO</h3>
  <p>
    Em caso de dúvidas ou solicitações, o usuário pode entrar em contato pelo canal de atendimento disponível na plataforma.
  </p>
</>
</p>
                <button type="button" onClick={handleConcordo}>
                  Concordo
                </button>
              </div>
            </div>
          )}

          {/* BUTTONS*/}
          <div className="buttons-alt"> 
            <button className="button-custom-alt" type="submit"><span>CADASTRAR</span></button>
            <button className="button-custom-alt" type="button" onClick={() => router.push('/login')}><span>VOLTAR</span></button>
          </div>

        </form>
      </div>
    </div>
  );
}