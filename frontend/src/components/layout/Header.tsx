import "./Header.css";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  buttons?: { label: string; onClick: () => void }[];
}

const Header: React.FC<HeaderProps> = ({ buttons }) => {

  const navigate = useNavigate()
  return (
    <header className="header">
      <h1 className="header-title" onClick={() => navigate('/')}>Meal Moniter</h1>
      <div className="header-buttons">
        {buttons?.map((btn, idx) => (
          <button
            key={idx}
            className="header-button"
            onClick={btn.onClick}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </header>
  );
};

export default Header;
