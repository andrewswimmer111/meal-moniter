import Header from "../components/layout/Header"
import { useNavigate } from "react-router-dom"
import "./CombinedCSS.css";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

function LandingPage() {

    const navigate = useNavigate()
    const { user } = useContext(UserContext);

    const headerButtons = [
        {
            label: "Login",
            onClick: () => {
                if (user) {
                    navigate("/dashboard");
                } else {
                    navigate("/login");
                }
            },
        },
    ];


    return (
        <>
            <Header buttons={headerButtons} />
            <main className="landing-container">
                <div className="landing-content">
                    <h1>So many points. So little memory.</h1>
                    <h2>Don't worry. We'll remember for you.</h2>
                    <h3>Look back on your food point usage. <br /> Dive into fun analytics, favorite spots, and forgotten late-night snacks.</h3>
                    <button className="cta-button" onClick={() => navigate("/signup")}>
                        Get started today
                    </button>
                </div>
            </main>
        </>
    );
}

export default LandingPage