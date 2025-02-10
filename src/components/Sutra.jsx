import React, { useState, useRef, useEffect } from 'react';

const SUTRAS = [
  {
    id: 'heart-sutra',
    title: '般若波罗蜜多心经',
    audio: '/audio/heart-sutra.mp3',
    description: '《心经》是佛教最简短、最重要的经典之一，阐述了佛教的核心智慧。',
    content: `观自在菩萨，行深般若波罗蜜多时，照见五蕴皆空，度一切苦厄。
舍利子，色不异空，空不异色，色即是空，空即是色，受想行识，亦复如是。
舍利子，是诸法空相，不生不灭，不垢不净，不增不减。
是故空中无色，无受想行识，无眼耳鼻舌身意，无色声香味触法，无眼界，乃至无意识界。
无无明，亦无无明尽，乃至无老死，亦无老死尽。
无苦集灭道，无智亦无得。
以无所得故，菩提萨埵，依般若波罗蜜多故，心无挂碍。
无挂碍故，无有恐怖，远离颠倒梦想，究竟涅槃。
三世诸佛，依般若波罗蜜多故，得阿耨多罗三藐三菩提。
故知般若波罗蜜多，是大神咒，是大明咒，是无上咒，是无等等咒。
能除一切苦，真实不虚。
故说般若波罗蜜多咒，即说咒曰：
揭谛揭谛，波罗揭谛，波罗僧揭谛，菩提萨婆诃。`
  },
  {
    id: 'great-compassion',
    title: '大悲咒',
    audio: '/audio/great-compassion.mp3',
    description: '《大悲咒》是观世音菩萨的心咒，具有不可思议的力量。',
    content: `南无大悲观世音，愿我速知一切法。
南无大悲观世音，愿我早得智慧眼。
南无大悲观世音，愿我速度一切众。
南无大悲观世音，愿我早得善方便。
南无大悲观世音，愿我速乘般若船。
南无大悲观世音，愿我早得越苦海。
南无大悲观世音，愿我速得戒定道。
南无大悲观世音，愿我早登涅槃山。
南无大悲观世音，愿我速会无为舍。
南无大悲观世音，愿我早同法性身。`
  }
];

const SutraReader = () => {
  const [currentSutra, setCurrentSutra] = useState(SUTRAS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  const handleSutraChange = (sutra) => {
    setCurrentSutra(sutra);
    setIsPlaying(false);
    setProgress(0);
  };

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="sutra-reader">
      <div className="sutra-selector">
        <h2>经文选择</h2>
        <div className="sutra-list">
          {SUTRAS.map(sutra => (
            <button
              key={sutra.id}
              className={`sutra-button ${currentSutra.id === sutra.id ? 'active' : ''}`}
              onClick={() => handleSutraChange(sutra)}
            >
              {sutra.title}
            </button>
          ))}
        </div>
      </div>

      <div className="sutra-content">
        <h3>{currentSutra.title}</h3>
        <p className="sutra-description">{currentSutra.description}</p>
        
        <div className="audio-player">
          <audio
            ref={audioRef}
            src={currentSutra.audio}
            onTimeUpdate={(e) => setProgress((e.target.currentTime / e.target.duration) * 100)}
          />
          <button className="play-button" onClick={togglePlay}>
            {isPlaying ? '暂停' : '播放'}
          </button>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="sutra-text">
          {currentSutra.content}
        </div>
      </div>
    </div>
  );
};

export default SutraReader; 