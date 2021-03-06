import React, { useState } from 'react';
import logoImg from '../../assets/logo.svg';
import {FiArrowLeft} from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import api from '../../services/api';

export default function NewIncident() {

    const [title, setTitle] = useState();
    const [description, setdescription] = useState();
    const [value, setValue] = useState();
    const ongId = localStorage.getItem('ongId');
    const history = useHistory();

    async function handleNewIncident(e) {

        e.preventDefault();

        const data = {
            title,
            description,
            value
        }

        try {
            await api.post('incidentes',data,{
                headers:{
                    Authorization: ongId,
                }
            })

            history.push('/profile');

        } catch (error) {
            alert('Erro ao cadastrar caso, tente novamente')
        }
    }

    return (
        <div className="new-incident-container">
        <div className="content">
            <section>
                <img src={logoImg} alt="Be The Hero"/>
                <h1>Cadastrar novo caso</h1>
                <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso</p>

                <Link to="/Profile" className="back-link">
                    < FiArrowLeft size={16} color="#e02041" />
                    Voltar para home
                </Link>
            </section>

            <form onSubmit={handleNewIncident}>
                <input 
                     placeholder="Título do Caso"
                     value={title}
                     onChange={e => setTitle(e.target.value)}

                    />
                <textarea 
                     placeholder="Descrição"
                     value={description}
                     onChange={e => setdescription(e.target.value)}
                />          
                     


                <input 
                     placeholder="Valor em Reais (R$)"
                     value={value}
                     onChange={e => setValue(e.target.value)}
                     />   
                     


                 
            
                <button className="button">Cadastrar</button>
            </form>
        </div>
    </div>
    );
}