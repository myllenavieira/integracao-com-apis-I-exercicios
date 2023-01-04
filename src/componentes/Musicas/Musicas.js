import React, { useState, useEffect } from 'react'
import { Botao, ContainerInputs, ContainerMusicas, InputMusica, Musica } from './styled'
import axios from 'axios';

export default function Musicas(props) {
    const [musicas, setMusicas] = useState([])
    const [nome, setNome] = useState("")
    const [artista, setArtista] = useState("")
    const [url, setUrl] = useState("")

    const config = { headers: { Authorization: "myllena-vieira-barbosa" } }

    const getPlaylistTracks = () => {
        axios.get(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks`, config)
        .then((resposta) => {
            setMusicas(resposta.data.result.tracks)
        })
        .catch((erro) => {
            console.log(erro)
        })

    }
    useEffect(() => {
        getPlaylistTracks()
    })


    const addTrackToPlaylist = () => {
        const body = {
            name: nome,
            artist: artista,
            url: url,
        }

        axios.post(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks`, body, config)
        .then((resposta) => {
            setNome("")
            setArtista("")
            setUrl("")
        })
        .catch((erro) => {
            console.log(erro)
        })
    }


    const removeTrackFromPlaylist= (id) => {
        axios.delete(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks/${id}`, config)
        .then((resposta) => {
            
        })
        .catch((erro) => {
            console.log(erro)
        })
    }


    return (
        <ContainerMusicas>
        <h2>{props.playlist.name}</h2>
        {musicas.map((musica) => {
            return (
                <Musica key={musica.id}>
                    <h3>{musica.name} - {musica.artist}</h3>
                    <audio src={musica.url} controls />
                    <button onClick={() => removeTrackFromPlaylist(musica.id)}>X</button>
                </Musica>)
        })}
        <ContainerInputs>
            <InputMusica placeholder="artista" value={artista} onChange={(e) => setArtista(e.target.value)} />
            <InputMusica placeholder="musica" value={nome} onChange={(e) => setNome(e.target.value)} />
            <InputMusica placeholder="url" value={url} onChange={(e) => setUrl(e.target.value)} />
            <Botao onClick={addTrackToPlaylist}>Adicionar musica</Botao>
        </ContainerInputs>
    </ContainerMusicas>
    )
}

