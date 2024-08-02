import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube, FaLinkedinIn } from 'react-icons/fa';
import api from '../services/api';
import '../styles/pages/pag_salas.css';
import Logo from "../imgs/logo_ccer.png";

// Definição do tipo de props
interface PaginasSalasProps {
    sala: {
        titulo: string;
        texto: string;
        urlFoto: string;
        urlAudio: string;
        urlVideo: string;
    }
}

function Sala() {
    const [sala, setSala] = useState<PaginasSalasProps>();
    const { id } = useParams<{ id: string }>();
    const [isSpeaking, setIsSpeaking] = useState(false);

    // Carregar dados da API
    useEffect(() => {
        api.get(`salas/${id}`).then(response => {
            setSala(response.data);
        }).catch(error => {
            console.error('Erro ao carregar os dados:', error);
        });
    }, [id]);

    // Função para iniciar a leitura do texto
    const handleReadText = () => {
        if (sala && sala.sala.texto) {
            console.log('Texto para leitura:', sala.sala.texto);

            if ('speechSynthesis' in window) {
                console.log('API de síntese de fala está disponível');

                const voice = new SpeechSynthesisUtterance(sala.sala.texto);
                
                voice.onstart = () => console.log('Iniciando leitura');
                voice.onend = () => {
                    console.log('Leitura concluída');
                    setIsSpeaking(false);
                };
                voice.onerror = (event) => {
                    console.error('Erro na leitura:', event);
                    setIsSpeaking(false);
                };

                window.speechSynthesis.speak(voice);
                setIsSpeaking(true);
            } else {
                console.error('API de síntese de fala não é suportada neste navegador');
            }
        }
    };

    if (!sala) {
        return <p>Carregando...</p>;
    }

    return (
        <div className="container">
            <div className="header">
                <div className="container-header">
                    <img src={sala.sala.urlFoto} alt="" className="container-header--img" />
                    <span>{sala.sala.titulo}</span>
                </div>
                
                <div className="container-imgs">
                    <img src={Logo} alt="" className="gallery-image" />
                    <div className="social-icons">
                        <a href="https://www.instagram.com/eliziariorangel/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                        <a href="https://www.facebook.com/eliziariorangel" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
                        <a href="https://x.com/i/flow/login?redirect_after_login=%2Feliziariorangel" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                        <a href="https://www.youtube.com/channel/UCRzKAGzFNOsK7sS7X-Qz2EQ" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
                        <a href="https://www.linkedin.com/company/elizi%C3%A1rio-rangel/" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
                    </div>
                </div>
            </div>
            <div className="content">
                <p>{sala.sala.texto}</p>
                <button onClick={handleReadText} disabled={isSpeaking}>
                    {isSpeaking ? 'Lendo...' : 'Ler Texto'}
                </button>
            </div>
        </div>
    );
}

export default Sala;
