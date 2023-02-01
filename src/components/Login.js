import React from "react";
import { useState } from "react";
import Header from "./Header";

function Login(props) {
    const [ creds, setCredentials ] = useState({
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
            <Header link="/sign-up" linkName="Зарегистрироваться" loggedIn={props.isLoggedIn} />
            <main className="auth-page">
                <div className="auth-page__form-container">
                    <h2 className="auth-page__title">Вход</h2>
                    <form className="auth-page__form">
                        <input name="email" className="auth-page__input" placeholder="Email" onChange={handleChange} value={creds.email || ''}/>
                        <input name="password" className="auth-page__input" placeholder="Пароль" onChange={handleChange} value={creds.password || ''}/>
                        <button className="auth-page__button" onSubmit={handleSubmit}>Войти</button>
                    </form>
                </div>
            </main>
        </>
    );
}

export default Login;