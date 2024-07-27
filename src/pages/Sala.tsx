import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube, FaLinkedinIn } from 'react-icons/fa';

import api from '../services/api';

import '../styles/pages/pag_salas.css';
import Logo from "../imgs/logo_ccer.png";

// deploy site

interface PaginasSalasProps {
  titulo: string;
  texto: string;
  urlFoto: string;
  urlAudio: string;
  urlVideo: string;
  images: Array<{
    id: number;
    url: string
  }>
}

function Sala() {
    const [sala, setSala] = useState<PaginasSalasProps>();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        api.get(`salas/${id}`).then(response => {
        setSala(response.data);
        })
    }, [id])

    if(!sala) {
        return <p>Carregando...</p>
    }

    return (
        <div className="container">
            <div className="header">
                <div className="container-header">
                    <img src={sala.images[0].url} alt="" className="container-header--img" />
                    <span>{sala.titulo}</span>
                </div>
                
                <div className="container-imgs">
                <img src={Logo} alt="" className="gallery-image" />
                <div className="social-icons">
                    <a href="#"><FaInstagram /></a>
                    <a href="#"><FaFacebookF /></a>
                    <a href="#"><FaTwitter /></a>
                    <a href="#"><FaYoutube /></a>
                    <a href="#"><FaLinkedinIn /></a>
                </div>
                </div>
            </div>
            <div className="content">
                <p>{sala.texto}</p>
            </div>
        </div>  
    )
}

export default Sala;