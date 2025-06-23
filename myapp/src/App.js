import React, { useEffect, useState, useRef } from "react";
import Confetti from "react-confetti";
import { FaBirthdayCake, FaMapMarkerAlt, FaClock, FaPlay, FaPause } from "react-icons/fa";

function App() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.log("Autoplay prevented:", error);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;600;700&display=swap');

          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: 'Be Vietnam Pro', sans-serif;
            overflow-y: auto;
            height: 100vh;
          }

          .page-container {
            min-height: 100vh;
            background: linear-gradient(135deg, #FFE4E9, #FFD1DC, #F8C7D1);
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 24px;
            position: relative;
            animation: glow 4s ease-in-out infinite alternate;
          }

          @keyframes glow {
            0% { background: linear-gradient(135deg, #FFE4E9, #FFD1DC, #F8C7D1); }
            100% { background: linear-gradient(135deg, #F8C7D1, #FFD1DC, #FFE4E9); }
          }

          .card {
            max-width: 450px;
            width: 100%;
            background: rgba(255, 255, 255, 0.95);
            border-radius: 24px;
            padding: 24px;
            text-align: center;
            box-shadow: 0 10px 28px rgba(255, 209, 220, 0.4);
            position: relative;
          }

          .header .title {
            font-family: 'Be Vietnam Pro', sans-serif;
            font-size: 36px;
            background: linear-gradient(45deg, #FFD1DC, #F8C7D1, #FFE4E9);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            margin-bottom: 16px;
            text-shadow: 0 3px 8px rgba(255, 209, 220, 0.3);
            letter-spacing: 1px;
            animation: shimmer 3s infinite;
          }

          @keyframes shimmer {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          .header .invitation {
            font-size: 20px;
            color: #5C2E38;
            font-weight: 400;
            font-style: italic;
            margin-bottom: 12px;
            letter-spacing: 0.8px;
            animation: fadeInText 2s ease-in-out;
            font-family: 'Be Vietnam Pro', sans-serif;
          }

          @keyframes fadeInText {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }

          .header .name {
            font-family: 'Be Vietnam Pro', sans-serif;
            font-size: 48px;
            color: #FFD1DC;
            font-weight: 700;
            margin-bottom: 8px;
            text-shadow: 0 2px 4px rgba(255, 209, 220, 0.2);
          }

          .image-container {
            margin: 24px auto;
            position: relative;
            width: 260px;
            height: 260px;
            overflow: hidden;
            border-radius: 50%;
          }

          .profile-image {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            object-fit: cover;
            border: 6px solid #F8C7D1;
          }

          .content {
            margin-bottom: 24px;
          }

          .event-details {
            background: linear-gradient(45deg, #FFE4E9, #F8C7D1);
            padding: 18px;
            border-radius: 8px;
            margin: 20px 0;
            border: 2px dashed #F8C7D1;
            box-shadow: 0 3px 10px rgba(255, 209, 220, 0.25);
          }

          .event-details h2 {
            font-family: 'Be Vietnam Pro', sans-serif;
            font-size: 24px;
            color: #5C2E38;
            margin-bottom: 12px;
            letter-spacing: 0.8px;
          }

          .event-details p {
            font-size: 16px;
            color: #5C2E38;
            margin: 6px 0;
            font-weight: normal;
            line-height: 1.7;
          }

          .event-details p strong {
            color: #FFD1DC;
          }

          .quote {
            font-size: 15px;
            color: #5C2E38;
            font-style: italic;
            padding: 0 16px;
            margin-top: 12px;
            line-height: 1.8;
          }

          .quote-author {
            color: #FFD1DC;
            font-weight: 600;
            display: inline-block;
          }

          .heart-icon {
            font-size: 16px;
            color: #FFD1DC;
            margin-left: 4px;
            vertical-align: middle;
          }

          .button-container {
            text-align: center;
          }

          .rsvp-button {
            display: inline-block;
            background: linear-gradient(45deg, #FFD1DC, #F8C7D1);
            color: #5C2E38;
            padding: 14px 40px;
            border-radius: 20px;
            text-decoration: none;
            font-size: 16px;
            font-weight: 500;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .rsvp-button:hover {
            box-shadow: 0 6px 20px rgba(255, 209, 220, 0.5);
          }

          .rsvp-button:active {
            transform: scale(0.95);
            box-shadow: 0 2px 10px rgba(255, 209, 220, 0.3);
          }

          .age-text {
            font-size: 22px;
            color: #5C2E38;
            font-family: 'Be Vietnam Pro', sans-serif;
            margin-top: 8px;
            position: relative;
            display: inline-block;
          }

          .highlight-age {
            font-size: 48px;
            font-family: 'Be Vietnam Pro', sans-serif;
            font-weight: 900;
            background: linear-gradient(45deg, #FFD1DC, #F8C7D1, #FFE4E9);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            text-shadow: 0 0 10px rgba(255, 209, 220, 0.5);
            animation: pulse 1.5s infinite;
            position: relative;
            z-index: 1;
          }

          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }

          .highlight-age::after {
            content: '✨';
            position: absolute;
            top: -20px;
            right: 8px;
            font-size: 20px;
            color: #FFD1DC;
            animation: sparkle 2.5s infinite;
          }

          @keyframes sparkle {
            0% { opacity: 0; transform: rotate(0deg); }
            50% { opacity: 1; transform: rotate(360deg); }
            100% { opacity: 0; transform: rotate(720deg); }
          }

          .audio-control {
            position: absolute;
            top: 20px;
            right: 20px;
            background: linear-gradient(45deg, #FFD1DC, #F8C7D1);
            border-radius: 50%;
            padding: 10px;
            cursor: pointer;
            box-shadow: 0 3px 10px rgba(255, 209, 220, 0.3);
            transition: transform 0.2s ease;
            z-index: 10;
          }

          .audio-control:hover {
            transform: scale(1.1);
          }

          .audio-control:active {
            transform: scale(0.95);
          }

          .audio-icon {
            font-size: 20px;
            color: #5C2E38;
          }
        `}
      </style>

      <div className="page-container">
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={windowSize.width <= 768 ? 20 : 30}
          gravity={0.03}
          wind={0.01}
          colors={["#ffcc99", "#66ccff", "#ff99cc", "#e0f7fa"]}
        />
        <div className="card">
          <audio ref={audioRef} loop>
            <source src="/hb.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          <div
            className="audio-control"
            onClick={toggleAudio}
            role="button"
            aria-label={isPlaying ? "Pause music" : "Play music"}
          >
            {isPlaying ? <FaPause className="audio-icon" /> : <FaPlay className="audio-icon" />}
          </div>
          <div className="header">
            <h1 className="title">Thiệp Mời <br />Sinh Nhật Sam</h1>
            <p className="invitation">Thân mời mọi người đến chung vui cùng Sam Sam!</p>
          </div>
          <div className="image-container">
            <img
              src="../thu1.JPG"
              className="profile-image"
              alt="Hình ảnh bé yêu"
              aria-label="Hình ảnh của bé yêu"
            />
          </div>
          <div className="header">
            <div className="name">
              Lê Nguyễn
              <br /> Minh Thư
            </div>
            <p className="age-text">
              Mừng Bé Tròn <span className="highlight-age">1</span> Tuổi
            </p>
          </div>
          <div className="content">
            <div className="event-details">
              <h2>
                <FaClock /> Thông Tin <br />Tiệc Sinh Nhật
              </h2>
              <p>
                <FaBirthdayCake /> <b>Thời gian:</b> 17:00 chiều, Thứ Ba, ngày 01/07/2025
              </p>
              <p>
                <FaMapMarkerAlt /> <b>Địa điểm:</b> Dương Sơn, Hòa Châu, Hòa Vang, Đà Nẵng
              </p>
            </div>
            <p className="quote">
              "Sự hiện diện của mọi người sẽ làm ngày sinh nhật đầu tiên của Sam thêm trọn vẹn!"
              <br />
              <span className="quote-author">
                <span className="heart-icon">❤️</span>
                <span className="heart-icon">❤️</span>
                <span className="heart-icon">❤️</span>
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
