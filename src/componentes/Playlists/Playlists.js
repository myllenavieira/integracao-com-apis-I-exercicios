import React, { useState, useEffect } from "react";
import Musicas from "../Musicas/Musicas";
import axios from 'axios';


function Playlists() {

    const [playlists, setPlaylists] = useState([])
    const config = { headers: { Authorization: "myllena-vieira-barbosa" } }
    const url = "https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists";
    const getAllPlaylists = () => {
        axios.get(url, config)
            .then((resposta) => {
                setPlaylists(resposta.data.result.list)
            })
            .catch((erro) => {
                console.log(erro)
            })
    }
    useEffect(() => {
        getAllPlaylists()
    }, [])

    const [pesquisa, setPesquisa] = useState("");

    const searchPlaylist = async (pesquisa) => {
        try {
            const resposta = await axios.get(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/search?name=${pesquisa}`, { headers: { Authorization: "myllena-vieira-barbosa" } })
            console.log(resposta);
            setPlaylists(resposta.data.result.playlist)
            setPesquisa("");
            // setNomePlaylist("");

        } catch (error) {
            console.log(error.response, "erro de searchPlaylist");
        }
    }

    const deletePlaylist = async (id) => {
        try {
            const resposta = axios.delete(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${id}`, { headers: { Authorization: "myllena-vieira-barbosa" } })
            console.log(resposta);
            alert("Playlist deletada com sucesso!")
            getAllPlaylists()
        } catch (error) {
            console.log(error.response);
        }
    }

    return (

        <div>
            <input
                value={pesquisa}
                onChange={(e) => setPesquisa(e.target.value)}
                placeholder="Digite o nome da playlist"
            />

            <button onClick={() => searchPlaylist(pesquisa)}>Pesquisar</button>

            <button onClick={getAllPlaylists}>Voltar</button>

            {playlists.map((playlist) => {
                return ( 
                    <><Musicas key={playlist.id} playlist={playlist} />
                    <button onClick={()=>deletePlaylist(playlist.id)}>Excluir</button></>
                )
            })}

        </div>
    );
}

export default Playlists;
