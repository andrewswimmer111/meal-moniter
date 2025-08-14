import { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../../contexts/UserContext";
import { registerUser } from "../../api_calls/auth";

import type { RegisterInfo } from "../../types/auth";


function SignUp() {

    const navigate = useNavigate();
    const {login} = useContext(UserContext)

    const [warning, setWarning] = useState("")
    const [registerInfo, setRegisterInfo] = useState<RegisterInfo>({
        name: "", 
        email: "", 
        password: "", 
        confirmpassword: ""
    })

    const validateInput = (registerInfo: RegisterInfo): string => {

        const { name, email, password, confirmpassword } = registerInfo;

        if (!name.trim() || !email.trim() || !password.trim() || !confirmpassword.trim()) {
            return "All fields must be filled.";
        }
        if (password !== confirmpassword) {
            return "Passwords do not match.";
        }
        if (password.length < 5) {
            return "Passwords must be longer than 5 characters"
        }
        return ""
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        setRegisterInfo(values => ({...values, [name]: value}))
    }

    const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const validationResult = validateInput(registerInfo)
        
        if (validationResult !== "") {
            setWarning(validationResult)
        } else {
            const apiResult = await registerUser(registerInfo)
            if (!apiResult.success) {
                setWarning(apiResult.message)
            }
            else {
                login(apiResult.user)
                navigate('/dashboard')
            }
        }
    }

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleRegister}>
                <label htmlFor="name"> Name: </label>
                <input 
                    type="text" 
                    id="name"
                    name="name"
                    value={registerInfo.name}
                    onChange={handleChange}
                ></input>
                <label htmlFor="email"> Email: </label>
                <input 
                    type="email" 
                    id="email"
                    name="email"
                    value={registerInfo.email}
                    onChange={handleChange}
                ></input>
                <label htmlFor="password"> Password: </label>
                <input 
                    type="password" 
                    id="password"
                    name="password"
                    value={registerInfo.password}
                    onChange={handleChange}
                ></input>
                <label htmlFor="confirmpassword"> Confirm Password: </label>
                <input 
                    type="password" 
                    id="confirmpassword"
                    name="confirmpassword"
                    value={registerInfo.confirmpassword}
                    onChange={handleChange}
                ></input>
                <input type="submit" value="Sign Up" className="auth-button"></input>
                {warning && <div className="warning">{warning}</div>}
            </form>
        </div>
    )
}

export default SignUp