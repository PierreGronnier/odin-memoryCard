import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Card from "./components/Card";
import "./App.css";

function App() {
  const [allChampions, setAllChampions] = useState([]);
  const [displayedChampions, setDisplayedChampions] = useState([]);
  const [clickedChampions, setClickedChampions] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const version = "15.5.1";

  useEffect(() => {
    const fetchChampions = async () => {
      try {
        const response = await fetch(
          `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`
        );
        const data = await response.json();
        const championsArray = Object.values(data.data).map((champ) => ({
          id: champ.id,
          name: champ.name,
          imageUrl: `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champ.id}_0.jpg`,
        }));
        setAllChampions(championsArray);
        setDisplayedChampions(getRandomChampions(championsArray));
      } catch (error) {
        console.error("Error loading champions:", error);
      }
    };

    fetchChampions();
  }, []);

  const getRandomChampions = (champions) => {
    const shuffled = [...champions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 12);
  };

  const handleClick = (champion) => {
    const alreadyClicked = clickedChampions.find((c) => c.id === champion.id);
    if (alreadyClicked) {
      alert("You clicked the same champion! Game reset.");
      setBestScore((prev) => Math.max(prev, score));
      setScore(0);
      setClickedChampions([]);
    } else {
      const newScore = score + 1;
      setScore(newScore);
      setClickedChampions([...clickedChampions, champion]);
    }

    setDisplayedChampions(getRandomChampions(allChampions));
  };

  return (
    <div className="app-container">
      <div className="background" />
      <Header score={score} bestScore={bestScore} />
      <div className="cards-container">
        {displayedChampions.map((champion) => (
          <Card
            key={champion.id}
            name={champion.name}
            imageUrl={champion.imageUrl}
            onClick={() => handleClick(champion)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
