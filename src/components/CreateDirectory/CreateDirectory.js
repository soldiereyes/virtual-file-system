import React, { useState } from 'react';
import './CreateDirectory.css';

const CreateDirectory = ({ onClose, onCreate }) => {
    const [directoryName, setDirectoryName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("http://localhost:8080/api/directories", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: directoryName }),
        })
            .then((response) => response.json())
            .then((data) => {
                onCreate(data);
                onClose();
            })
            .catch((error) => {
                console.error("Erro ao criar diretório:", error);
            });
    };

    return (
        <div className="create-directory-modal">
            <h2>Criar Diretório</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nome do Diretório"
                    value={directoryName}
                    onChange={(e) => setDirectoryName(e.target.value)}
                    required
                />
                <button type="submit">Criar</button>
                <button type="button" onClick={onClose}>Cancelar</button>
            </form>
        </div>
    );
};

export default CreateDirectory;
