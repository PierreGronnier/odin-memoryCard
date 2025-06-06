import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Card from "./components/Card";
import ModalOver from "./components/ModalOver";
import "./App.css";

function App() {
  const [allChampions, setAllChampions] = useState([]);
  const [displayedChampions, setDisplayedChampions] = useState([]);
  const [clickedChampions, setClickedChampions] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const version = "15.5.1";

  const backgrounds = [
    "/background.png",
    "/background2.jpeg",
    "/background3.jpg",
    "/background4.jpg",
    "/background5.jpg",
  ];

  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  useEffect(() => {
    backgrounds.forEach((bg) => {
      new Image().src = bg;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

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
        setDisplayedChampions(getRandomChampions(championsArray, [], 0));
      } catch (error) {
        console.error("Error loading champions:", error);
      }
    };

    fetchChampions();
  }, []);

  const getRandomChampions = (all, clicked, round) => {
    const numTotal = 12;

    let numClickedToShow = Math.min(clicked.length, Math.floor(round / 2) + 1);
    numClickedToShow = Math.min(numClickedToShow, numTotal - 1);

    const clickedShuffled = [...clicked].sort(() => 0.5 - Math.random());
    const clickedToShow = clickedShuffled.slice(0, numClickedToShow);

    const remainingPool = all.filter(
      (champ) => !clickedToShow.some((c) => c.id === champ.id)
    );
    const randomOthers = remainingPool
      .sort(() => 0.5 - Math.random())
      .slice(0, numTotal - clickedToShow.length);

    const combined = [...clickedToShow, ...randomOthers].sort(
      () => 0.5 - Math.random()
    );

    return combined;
  };

  const handleClick = (champion) => {
    const alreadyClicked = clickedChampions.find((c) => c.id === champion.id);
    if (alreadyClicked) {
      setBestScore((prev) => Math.max(prev, score));
      setIsGameOver(true);
    } else {
      const newScore = score + 1;
      const newClicked = [...clickedChampions, champion];
      setScore(newScore);
      setClickedChampions(newClicked);
      setDisplayedChampions(
        getRandomChampions(allChampions, newClicked, newScore)
      );
    }
  };

  const restartGame = () => {
    setScore(0);
    setClickedChampions([]);
    setDisplayedChampions(getRandomChampions(allChampions, [], 0));
    setIsGameOver(false);
  };

  return (
    <div className="app-container">
      <div
        className="background"
        style={{ backgroundImage: `url(${backgrounds[currentBgIndex]})` }}
      />
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
      <ModalOver isOpen={isGameOver} onRestart={restartGame} score={score} />
      <Footer />
    </div>
  );
}

export default App;
