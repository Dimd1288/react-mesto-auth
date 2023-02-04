import React from "react";
import { useState } from "react";
import { authorize } from "../utils/authApi";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

function Login(props) {
    const [ creds, setCredentials ] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    function handleChange(e) {
        const { name, value } = e.target;

        setCredentials({
            ...creds,
            [name]: value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        const {email, password} = creds;

        authorize(email, password).then((data) => {
            if (data.token){
              setCredentials({username: '', password: ''});
              props.onLogIn();  
              navigate('/', {replace: true});
            }
          })
          .catch(err => console.log(err));
    }

    return (
        <>
            <Header link="/sign-up" linkName="Зарегистрироваться"/>
            <main className="auth-page">
                <div className="auth-page__form-container">
                    <h2 className="auth-page__title">Вход</h2>
                    <form className="auth-page__form" onSubmit={handleSubmit}>
                        <input name="email" className="auth-page__input" placeholder="Email" onChange={handleChange} value={creds.email || ''}/>
                        <input name="password" className="auth-page__input" placeholder="Пароль" onChange={handleChange} value={creds.password || ''}/>
                        <button className="auth-page__button" >Войти</button>
                    </form>
                </div>
            </main>
        </>
    );
}

export default Login;