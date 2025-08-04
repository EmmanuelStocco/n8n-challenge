import { useState, useEffect } from 'react';
import axios from 'axios';

interface Usuario {
  _id: string;
  nome: string;
  email: string;
}

export default function ListarUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mensagem, setMensagem] = useState(''); 

  useEffect(() => {
    const fetchUsuarios = async () => {
      setLoading(true);
      setError('');
      setMensagem('');

      const token = localStorage.getItem('token');
      console.log('Token:', token);
      if (!token) {
        setError('Token não encontrado. Faça login primeiro.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:5678/webhook/all-users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
 
        const usersData = response.data.users || response.data; 
        setUsuarios(usersData);
        setMensagem('Usuários carregados com sucesso!');
      } catch (err: any) {
        console.error(err);
        setError(err.response?.data?.message || 'Erro ao carregar usuários');
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  return (
    <div style={{ padding: 40, maxWidth: 600 }}>
      <h1>Lista de Usuários</h1>

      {loading && <p>Carregando usuários...</p>}
      {mensagem && <p style={{ color: 'green' }}>{mensagem}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {usuarios.map((user) => (
          <li key={user._id}>
            <strong>{user.nome}</strong> — {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
