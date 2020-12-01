import React from 'react'
import LoginForm from "./LoginForm";

// TODO: add sign in
const LoginComponent = ({setError}) => {
    return (
        <div>
            <LoginForm setError={setError}/>
        </div>
    )
}

export default LoginComponent