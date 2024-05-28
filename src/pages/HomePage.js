// src/pages/HomePage.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();
  const playSound = (soundFile) => {
    const audio = new Audio(soundFile);
    audio.play();
  };

  const startGame = () => {
    playSound('/assets/start.wav');
    navigate('/game');
  };

  const playButtonSound = () => {
    playSound('/assets/wrong.mp3');
  };

  return (
    <div className="home-page">
      <h1 className="title">GAME TIME</h1>
      <div className="info-box">
        <div className="info-box-header">
          <span>Game Information</span>
          <button className="close-button" onClick={playButtonSound}>x</button>
        </div>
        <div className="info-box-content">
          <p>Welcome to the game! This is a simple platformer where you need to jump on platforms to avoid falling. Use the arrow keys to move and jump.</p>
        </div>
      </div>
      <button className="start-button" onClick={startGame}>Start Game</button>

      {/* Desktop Icons */}
      <div className="desktop-icons">
        <div className="desktop-icon">
          <img src="/assets/robot.png" alt="Game Icon" />
          <span>Game</span>
        </div>
      </div>

      {/* Taskbar */}
      <div className="taskbar">
        <button className="taskbar-start-button" onClick={startGame}>
          <img src="/assets/Start.png" alt="Start Icon" />
        </button>
        <div className="taskbar-icons">
          <img src="/assets/Blog.png" alt="Taskbar Icon 1" onClick={playButtonSound} />
          <img src="/assets/Console.png" alt="Taskbar Icon 2" onClick={playButtonSound} />
          <img src="/assets/Mans.png" alt="Taskbar Icon 3" onClick={playButtonSound} />
          <img src="/assets/Flower.png" alt="Taskbar Icon 4" onClick={playButtonSound} />
        </div>
        <img src="/assets/Bot_run.gif" alt="Running Robot" className="running-robot" />
      </div>


    <img src="/assets/Dragon.gif" alt="Moving Dragon" className="moving-dragon" />  
    </div>
  );
}

export default HomePage;
