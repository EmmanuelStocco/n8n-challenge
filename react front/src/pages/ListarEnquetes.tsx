import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ListarEnquete() {
    const [question, setQuestion] = useState('');
    const [optionsText, setOptionsText] = useState('');
    const [polls, setPolls] = useState([]);

    // Buscar enquetes existentes
    const fetchPolls = async () => {
        // const res = await fetch('http://localhost:5678/webhook-test/listar');
        const { data } = await axios.get('http://localhost:5678/webhook/listar');
        const pollsArray = Array.isArray(data) ? data : [data];

        setPolls(pollsArray as any);
    };

    useEffect(() => {
        fetchPolls();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const options = optionsText.split('\n').filter(Boolean);
        const payload = {
            question,
            options,
        };

        try {
            await axios.post('http://localhost:5678/webhook/criar-enquete', payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            }); 
            setQuestion('');
            setOptionsText('');
            fetchPolls();
        } catch (error) {
            console.error('Erro ao criar enquete:', error);
        }
    };


    return (
        <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
            <h2>Criar Enquete</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Pergunta"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    style={{ width: '100%', marginBottom: 10 }}
                />
                <textarea
                    placeholder="Opções (1 por linha)"
                    value={optionsText}
                    onChange={(e) => setOptionsText(e.target.value)}
                    rows={5}
                    style={{ width: '100%', marginBottom: 10 }}
                />
                <button type="submit">Criar Enquete</button>
            </form>

            <hr />

            <h2>Enquetes Existentes</h2>
            <ul>
                {polls.map((poll: any) => (
                    <li key={poll._id}>
                        <strong>{poll.body.question}</strong>
                        <ul>
                            {poll.body.options.map((opt: any, idx: any) => (
                                <li key={idx}>{opt}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListarEnquete;
