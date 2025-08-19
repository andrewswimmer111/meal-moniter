import { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { loginUser } from "../../api_calls/auth";
import { UserContext } from "../../contexts/UserContext";

import type { LoginInfo } from "../../types/auth";
import './auth.css'

function Login() {

    const navigate = useNavigate();
    const { login } = useContext(UserContext)

    const [warning, setWarning] = useState("")
    const [loginInfo, setLoginInfo] = useState<LoginInfo>({
        email: "",
        password: "",
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        setLoginInfo(values => ({ ...values, [name]: value }))
    }

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!loginInfo.email.trim() || !loginInfo.password.trim()) {
            setWarning("All fields must be filled.")
            return;
        }
        const apiResult = await loginUser(loginInfo)
        if (!apiResult.success) {
            setWarning(apiResult.message)
        }
        else {
            login(apiResult.user)
            navigate('/dashboard')
        }
    }

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleLogin}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={loginInfo.email}
                    onChange={handleChange}
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={loginInfo.password}
                    onChange={handleChange}
                />
                <input type="submit" value="Login" className="auth-button" />
                {warning && <div className="warning">{warning}</div>}
            </form>
        </div>
    )


}

export default Login