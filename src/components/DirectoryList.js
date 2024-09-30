import React, {Component} from "react";
import './DirectoryList.css';
import {StringUtils} from "../Utils/StringUtils";
import CircularButton from "./CircularButton/CircularButton";
import CreateDirectory from "./CreateDirectory/CreateDirectory";


class DirectoryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            directories: [],
            editFileId: null,
            editFileName: StringUtils.STRING_EMPTY,
            isCreateDialogOpen: false,
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

    handleCreateDirectory = (newDirectory) => {
        this.setState((prevState) => ({
            directories: [...prevState.directories, newDirectory],
        }));
    };

    handleDeleteFile = (fileId) => {
        fetch(`http://localhost:8080/api/directories/${fileId}`, {
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

        fetch(`http://localhost:8080/api/directories/${editFileId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: editFileName })
        })
            .then(() => {
                this.setState({ editFileId: null, editFileName: "" });
                this.fetchDirectories();
            })
            .catch((error) => {
                console.error("Erro ao editar arquivo:", error);
            });
    };

    handleCancelEdit = () => {
        this.setState({ editFileId: null, editFileName: StringUtils.STRING_EMPTY });
    };

    render() {
        const { directories, editFileId, editFileName, isCreateDialogOpen } = this.state;

        return (
            <div className="App">
                <h1>Lista de Diretórios</h1>
                <div className="directory-list">
                    {directories.map((directory) => (
                        <div key={directory.id} className="directory-card">
                            <h2>{directory.name}</h2>

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
                                    <button onClick={() => this.handleEditFile(directory.id, directory.name)}>Editar</button>
                                    <button onClick={() => this.handleDeleteFile(directory.id)}>Excluir</button>
                                </>
                            )}
                        </div>
                    ))}
                </div>
                {isCreateDialogOpen && (
                    <CreateDirectory
                        onClose={() => this.setState({ isCreateDialogOpen: false })}
                        onCreate={this.handleCreateDirectory}
                    />
                )}

                <CircularButton onClick={() => this.setState({ isCreateDialogOpen: true })} />
            </div>
        );
    }
}

export default DirectoryList;
