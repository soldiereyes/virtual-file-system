import React, {Component} from "react";
import './DirectoryList.css';
import {StringUtils} from "../Utils/StringUtils";


class DirectoryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            directories: [],
            editFileId: null,
            editFileName: StringUtils.STRING_EMPTY
        };
    }

    componentDidMount() {
       this.fetchDirectories()
    }

    fetchDirectories() {
        fetch("http://localhost:8080/api/directories")
            .then((response) => response.json())
            .then((data) => {
                this.setState({ directories: data });
            })
            .catch((error) => {
                console.error("Erro ao buscar diretórios:", error);
            });
    }

    handleDeleteFile = (fileId) => {
        fetch(`http://localhost:8080/api/files/${fileId}`, {
            method: 'DELETE'
        })
            .then(() => {
                this.fetchDirectories();
            })
            .catch((error) => {
                console.error("Erro ao excluir arquivo:", error);
            });
    };

    handleEditFile = (fileId, currentName) => {
        this.setState({
            editFileId: fileId,
            editFileName: currentName
        });
    };

    handleSaveEdit = () => {
        const { editFileId, editFileName } = this.state;

        fetch(`http://localhost:8080/api/files/${editFileId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: editFileName })
        })
            .then(() => {
                this.setState({ editFileId: null, editFileName: "" });
                this.fetchDirectories(); // Atualiza a lista de diretórios após a edição
            })
            .catch((error) => {
                console.error("Erro ao editar arquivo:", error);
            });
    };

    handleCancelEdit = () => {
        this.setState({ editFileId: null, editFileName: "" });
    };

    render() {
        const { directories, editFileId, editFileName } = this.state;

        return (
            <div className="App">
                <h1>Lista de Diretórios</h1>
                <div className="directory-list">
                    {directories.map((directory) => (
                        <div key={directory.id} className="directory-card">
                            <h2>{directory.name}</h2>
                            <p>ID: {directory.id}</p>

                            {/* Se estiver editando, mostrar o formulário de edição */}
                            {editFileId === directory.id ? (
                                <div>
                                    <input
                                        type="text"
                                        value={editFileName}
                                        onChange={(e) => this.setState({ editFileName: e.target.value })}
                                    />
                                    <button onClick={this.handleSaveEdit}>Salvar</button>
                                    <button onClick={this.handleCancelEdit}>Cancelar</button>
                                </div>
                            ) : (
                                <>
                                    {/* Botões de Editar e Excluir */}
                                    <button onClick={() => this.handleEditFile(directory.id, directory.name)}>Editar</button>
                                    <button onClick={() => this.handleDeleteFile(directory.id)}>Excluir</button>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default DirectoryList;
