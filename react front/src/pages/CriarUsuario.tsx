import { useState } from 'react';
import axios from 'axios';

export default function CriarUsuario() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5678/webhook/criar-usuario', {
        nome,
        email,
      });

      setMensagem(response.data.message || 'Usuário criado com sucesso!');
      setNome('');
      setEmail('');
    } catch (err) {
      console.error(err);
      setMensagem('Erro ao criar usuário');
    }
  };

  return (
    <div style={{ padding: 40, maxWidth: 400 }}>
      <h1>Criar Usuário</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 10 }}>
          <label>Nome</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%' }}
          />
        </div>
        <button type="submit">Criar</button>
      </form>

      {mensagem && <p style={{ marginTop: 20 }}>{mensagem}</p>}
    </div>
  );
}
