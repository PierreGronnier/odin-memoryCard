import "../styles//ModalOver.css";

const Modal = ({ isOpen, onRestart, score }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Game Over</h2>
        <p>Your score : {score}</p>
        <button onClick={onRestart} className="modal-button">
          Replay
        </button>
      </div>
    </div>
  );
};

export default Modal;
