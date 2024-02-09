import React, { useState, useRef } from "react";

const GameController: React.FC = () => {
  const [direction, setDirection] = useState<string | null>(null);
  const [intervalSeconds, setIntervalSeconds] = useState<number>(5);
  const [countdown, setCountdown] = useState<number | null>(null);
  const intervalRef = useRef<number | null>(null);

  const directions: string[] = ["前", "後ろ", "右", "左"];

  const startGame = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // カウントダウンの処理
    setCountdown(5);
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
  };

  const handleIntervalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value: number = parseInt(event.target.value);
    setIntervalSeconds(value);
  };

  return (
    <div>
      <h1 className="headingTitle">前後左右ゲーム</h1>
      <div>
        <label htmlFor="interval">音が出る間隔（秒）:</label>
        <input
          type="number"
          id="interval"
          min="1"
          value={intervalSeconds}
          onChange={handleIntervalChange}
        />
      </div>
      <div>
        <button onClick={startGame}>ゲームスタート</button>
        <button onClick={stopGame}>ゲームストップ</button>
      </div>
      <div>
        {countdown !== null && <h2>{countdown}</h2>}
        {direction && countdown === null && <h2>{direction}</h2>}
      </div>
    </div>
  );
};

export default GameController;
