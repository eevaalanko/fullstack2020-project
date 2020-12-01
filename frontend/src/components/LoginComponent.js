import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'
import LoginForm from "./LoginForm";

// TODO: add sign in
const LoginComponent = () => {
    return (
        <div>
            <LoginForm/>
        </div>
    )
}

export default LoginComponent