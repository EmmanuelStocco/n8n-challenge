import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setMensagem('');
    setError('');

    try {
      const response = await axios.post('http://localhost:5678/webhook/login', {
        email,
        senha,
      });
      console.log('Login response:', response.data[0].token);
      const token = response.data[0].token;
      if (token) {
        localStorage.setItem('token', token);
        setMensagem('Login realizado com sucesso!');

        // Redireciona para página de listar usuários
        navigate('/listar-usuarios');
      } else {
        setError('Token não recebido');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };



  return (
    <div style={{ padding: 40, maxWidth: 400 }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 10 }}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%' }}
            disabled={loading}
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>Senha</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            style={{ width: '100%' }}
            disabled={loading}
          />
        </div>
        <button type="submit" disabled={loading || !email || !senha}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>

      {mensagem && <p style={{ marginTop: 20, color: 'green' }}>{mensagem}</p>}
      {error && <p style={{ marginTop: 20, color: 'red' }}>{error}</p>}
    </div>
  );
}
