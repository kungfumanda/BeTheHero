import React, {useState} from 'react';
import './styles.css';
import {Link, useHistory} from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import {FiArrowLeft} from 'react-icons/fi';
import api from '../../services/api';

export default function NewIncident(){
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const ongID = localStorage.getItem('ongID');
    
    
    async function handleNewIncident(e){
            e.preventDefault()
            const data = {
                title, 
                description,
                value
            }
            try {
                await api.post('incidents', data, {
                    headers: {
                        Authorization: ongID
                    }
                })
            history.push('/profile')
            } catch (error) {
                alert("Erro ao cadastrar caso")
            }
    }
    return (
        <div className="new-incident-container">
        <div className="content">
            <section>
                <img src={logoImg} alt = "Be The Hero" />
                <h1> Cadastrar novo Caso</h1>
                <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
            <Link className= "back-link" to = "/profile">
            <FiArrowLeft size = {16} color = "#e02041" />
            Voltar para home
            </Link>
            </section>
            <form onSubmit={handleNewIncident}>
                <input 
                value = {title}
                onChange={e => setTitle(e.target.value)}
                placeholder ="Título do caso"/>
                <textarea 
                value ={description}
                onChange = {e => setDescription(e.target.value)}
                placeholder  = "Descrição"/>
                <input 
                value = {value}
                onChange = {e =>setValue(e.target.value)}
                placeholder = "Valor em reais"/>

                <button className ="button" type="submit">Cadastrar</button>
            </form>
        </div>
    </div>
    );}
