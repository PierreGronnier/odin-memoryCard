import "../styles/card.css";

export default function Card({ name, imageUrl, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <img src={imageUrl} alt={name} className="card-image" />
      <p className="card-name">{name}</p>
    </div>
  );
}
