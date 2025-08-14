import Login from "../components/auth/Login"
import Header from "../components/layout/Header";
import { useNavigate } from "react-router-dom";

function LoginPage() {

    const navigate = useNavigate()
    const headerButtons = [
        {
            label: "No Account?",
            onClick: () => navigate("/signup"),
        },
    ];

    return(
        <>
            <Header buttons={headerButtons}/>
            <Login />
        </>
    )
}

export default LoginPage