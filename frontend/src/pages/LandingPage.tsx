import Header from "../components/layout/Header"
import { useNavigate } from "react-router-dom"
import "./CombinedCSS.css";

function LandingPage() {

    const navigate = useNavigate()

    const headerButtons = [
        {
            label: "Login",
            onClick: () => navigate("/login"),
        },
    ];


    return (
        <>
            <Header buttons={headerButtons} />
            <main className="landing-container">
                <h1>So many points. So little memory.</h1>
                <h2>Don't worry. We'll remember for you.</h2>
                <h3>Look back on your food point usage. Dive into fun analytics, favorite spots, and forgotten late-night snacks.</h3>
                <button className="cta-button" onClick={() => navigate("/signup")}>
                    Get started today
                </button>
            </main>
        </>
    );
}

export default LandingPage