import React, { useState, useEffect } from 'react';
import api from '../services/api';

const DirectoryList = () => {
    const [directories, setDirectories] = useState([]);

    useEffect(() => {
        const fetchDirectories = async () => {
            try {
                const response = await api.get('/directories');
                setDirectories(response.data);
            } catch (error) {
                console.error('Erro ao buscar diretórios:', error);
            }
        };

        fetchDirectories();
    }, []);

    return (
        <div>
            <h1>Diretórios</h1>
            <ul>
                {directories.map((directory) => (
                    <li key={directory.id}>{directory.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default DirectoryList;
