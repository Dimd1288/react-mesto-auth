import React from "react";
import { useState } from "react";
import Header from "./Header";
import { Link } from 'react-router-dom'

function Register() {
    const [creds, setCredentials] = useState({
        email: '',
        password: ''
    });

    function handleChange(e) {
        const { name, value } = e.target;

        setCredentials({ 
            ...creds, 
            [name]: value 
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
    }

    return (
        <>
            <Header link="/sign-in" linkName="Войти" />
            <main className="auth-page">
                <div className="auth-page__form-container">
                    <h2 className="auth-page__title">Регистрация</h2>
                    <form className="auth-page__form">
                        <input name="email" className="auth-page__input" placeholder="Email" onChange={handleChange} value={creds.email || ''} id="email-input" />
                        <input name="password" className="auth-page__input" placeholder="Пароль" onChange={handleChange} value={creds.password || ''} id="password-input" />
                        <button className="auth-page__button" onSubmit={handleSubmit}>Зарегистрироваться</button>
                    </form>
                    <p className="auth-page__form-caption">Уже зарегистрированы? <Link className="auth-page__link" to="/sign-in">Войти</Link></p>
                </div>
            </main>
        </>
    );
}

export default Register;