
import React from 'react';
import './MarketCard.css';

const MarketCard = ({ onOpenModal }) => {
  const productData = {
    category: 'БИОТЕХНОЛОГИИ',
    title: 'РОСТН',
    shortDesc: 'growthN — урбанистическая интеллектуальная система контролируемого культивирования, разработанная внутри экосистемы nazrOS.',
    price: '24 800'
  };

  return (
    <div className="sector-card" onClick={onOpenModal}>
      {/* Декоративный уголок сверху-слева */}
      <div className="corner-decor top-left"></div>
      
      <div className="card-image-wrapper">
        {/* Замените ссылку ниже на путь к вашему изображению фермы */}
        <img 
          src="https://unsplash.com" 
          alt={productData.title} 
          className="card-main-image"
        />
      </div>
      
      <div className="card-info-block">
        <span className="card-tag">{productData.category}</span>
        <h3 className="card-name">{productData.title}</h3>
        <p className="card-short-text">{productData.shortDesc}</p>
        
        <div className="card-price-row">
          <span className="price-value">{productData.price}</span>
          <span className="currency-label">XP</span>
        </div>
      </div>

      {/* Декоративный уголок снизу-справа */}
      <div className="corner-decor bottom-right"></div>
    </div>
  );
};

export default MarketCard;
