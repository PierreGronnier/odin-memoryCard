import githubLogo from "../assets/github.png";
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-text">Made by Pierre Gronnier</p>
        <a
          href="https://github.com/PierreGronnier"
          target="_blank"
          rel="noopener noreferrer"
          className="github-link"
        >
          <img src={githubLogo} alt="GitHub" className="github-icon" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
