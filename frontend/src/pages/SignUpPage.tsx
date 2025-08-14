import SignUp from "../components/auth/SignUp"
import Header from "../components/layout/Header"
import { useNavigate } from "react-router-dom";

function SignUpPage() {

    const navigate = useNavigate()
    const headerButtons = [
        {
            label: "Login",
            onClick: () => navigate("/login"),
        },
    ];

    return(
        <>
            <Header buttons={headerButtons}/>
            <SignUp />
        </>
    )
}

export default SignUpPage