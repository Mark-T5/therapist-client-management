import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

const Home = () => {
  const cards = [
    {
      title: "Therapists",
      description: "Manage your therapist details and availability.",
      path: "/therapists",
      color: "#3182ce",
      icon: "👨‍⚕️"
    },
    {
      title: "Clients",
      description: "Track client information.",
      path: "/clients",
      color: "#38a169",
      icon: "👥"
    },
    {
      title: "Sessions",
      description: "Schedule appointments.",
      path: "/sessions",
      color: "#805ad5",
      icon: "📆"
    }
  ];

  return (
    <div className="container page-wrapper home-container">
      <div className="hero-section">
        <h1 className="page-title">
          Ther<span className="heart">❤️</span>ppy Management System
        </h1>
        <p className="hero-subtitle">
          Where we get to the heart of the matter
        </p>
      </div>

      <div className="card-container">
        {cards.map((card, index) => (
          <Link to={card.path} className="card" key={index}>
            <div className="card-icon" style={{ backgroundColor: card.color }}>
              {card.icon}
            </div>
            <div className="card-content">
              <h2 className="card-title">{card.title}</h2>
              <p className="card-description">{card.description}</p>
            </div>
            <div className="card-arrow">→</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;