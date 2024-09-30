import React, {useState, useEffect} from 'react';
import api from '../services/api';

export const DirectoryList = () => {
    const [directories, setDirectories] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/directories")
            .then((response) => response.json())
            .then((data) => {
                setDirectories(data);
            })
            .catch((error) => {
                console.error("Erro ao buscar diretórios:", error);
            });
    }, []);

    return (
        <div className="App">
            <h1>Lista de Diretórios</h1>
            <div className="directory-list">
                {directories.map((directory) => (
                    <div key={directory.id} className="directory-card">
                        <h2>{directory.name}</h2>
                        <p>ID: {directory.id}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
