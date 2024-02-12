import React, { useState, useRef } from "react";
import "./App.css";

const GameController: React.FC = () => {
  const [direction, setDirection] = useState<string | null>(null);
  const [intervalSeconds, setIntervalSeconds] = useState<number>(2);
  const [countdown, setCountdown] = useState<number | null>(null);
  const intervalRef = useRef<number | null>(null);

  const directions: string[] = ["前", "後ろ", "右", "左"];

  const startGame = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    document.querySelector(".gameVision")?.classList.remove("none");

    // カウントダウンの処理
    setCountdown(3);
    const countdownInterval = setInterval(() => {
      setCountdown((prevCount) => prevCount && prevCount - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(countdownInterval);
      intervalRef.current = window.setInterval(() => {
        const randomIndex = Math.floor(Math.random() * directions.length);
        setDirection(directions[randomIndex]);
      }, intervalSeconds * 1000);
      setCountdown(null);
    }, 5000);
  };

  const stopGame = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setCountdown(null);
    setDirection(null);

    document.querySelector(".gameVision")?.classList.add("none");
  };

  const handleIntervalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value: number = parseInt(event.target.value);
    setIntervalSeconds(value);
  };

  return (
    <div className="container">
      <h1 className="headingTitle">前後左右ゲーム</h1>
      <div className="mainContents" role="main">
        <label htmlFor="interval">音が出る間隔（秒）</label>
        <input
          type="number"
          id="interval"
          min="1"
          max="3"
          value={intervalSeconds}
          onChange={handleIntervalChange}
        />
      </div>
      <div className="btnContents">
        <button
          id="btnStart"
          className="button buttonRound"
          onClick={startGame}
        >
          <div className="buttonWrapper">
            <span className="buttonText">ゲームスタート</span>
          </div>
        </button>
      </div>
      <div className="gameVision none">
        <div className="gameContents">
          <div className="gameArea">
            {countdown !== null && <h2>{countdown}</h2>}
            {direction && countdown === null && <h2>{direction}</h2>}
          </div>

          <button
            id="btnStop"
            className="button buttonRound btnStop"
            onClick={stopGame}
          >
            <div className="buttonWrapper stop">
              <span className="buttonText">ゲームストップ</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameController;
