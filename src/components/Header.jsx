import "../styles/header.css";

export default function Header({ score, bestScore }) {
  return (
    <div className="header">
      <div className="title">
        <h1>League of Legends Memory Game</h1>
        <h2>
          Get points by clicking on an image but don't click on any more than
          once!
        </h2>
      </div>
      <div className="score-container">
        <div className="score">
          <p>Score: {score}</p>
          <p>Best Score: {bestScore}</p>
        </div>
      </div>
    </div>
  );
}
