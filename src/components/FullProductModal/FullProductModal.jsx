
import React, { useState } from 'react';
import './FullProductModal.css';

const FullProductModal = ({ isOpen, onClose }) => {
  const [isPurchased, setIsPurchased] = useState(false);

  if (!isOpen) return null;

  const handlePurchase = () => {
    setIsPurchased(true);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        
        {/* Кнопка закрытия в правом верхнем углу */}
        <button className="close-modal-btn" onClick={onClose}>✕</button>

        <div className="system-grid">
          
          {/* ЛЕВАЯ КОЛОНКА */}
          <div className="left-meta-panel">
            <div className="meta-section">
              <span className="meta-label">// СИСТЕМА</span>
              <h2 className="meta-value text-neon-blue">РОСТН</h2>
            </div>
            <div className="meta-section">
              <span className="meta-label">// КАТЕГОРИЯ</span>
              <h4 className="meta-value">БИОТЕХНОЛОГИИ</h4>
            </div>
            <div className="meta-section">
              <span className="meta-label">// НАЗНАЧЕНИЕ</span>
              <p className="meta-value text-small">ХРАНЕНИЕ СЕМЯН,<br/>ВЫРАЩИВАНИЕ РАСТЕНИЙ,<br/>ПОДДЕРЖАНИЕ БИОБАЛАНСА</p>
            </div>
            <div className="meta-section">
              <span className="meta-label">// ИНДЕКС</span>
              <h4 className="meta-value font-mono">BT-ROSTN-01</h4>
            </div>
            
            <div className="purchase-action-zone">
              <button 
                className={`cyber-buy-btn ${isPurchased ? 'success' : ''}`}
                onClick={handlePurchase}
                disabled={isPurchased}
              >
                {isPurchased ? 'СИСТЕМА ИНТЕГРИРОВАНА' : 'ПРИОБРЕСТИ ЗА 24 800 XP'}
              </button>
            </div>
          </div>

          {/* ЦЕНТРАЛЬНЫЙ БЛОК */}
          <div className="center-display-panel">
            <div className="main-preview-frame">
              <img src="/path-to-your-growthN-image.jpg" alt="РОСТН system" />
            </div>

            <div className="widgets-row">
              <div className="widget-box">
                <h5 className="widget-title">БИОРЕСУРСЫ</h5>
                <ul className="widget-list">
                  <li><span>• ЗЕЛЕНЬ</span><span className="neon-cyan">98%</span></li>
                  <li><span>• МИКРОЗЕЛЕНЬ</span><span className="neon-cyan">95%</span></li>
                  <li><span>• ЛЕКАРСТВЕННЫЕ ТРАВЫ</span><span className="neon-cyan">88%</span></li>
                </ul>
              </div>

              <div className="widget-box border-pulse">
                <h5 className="widget-title">СТАТУС СИСТЕМЫ</h5>
                <div className="status-pulse-text">• СИСТЕМА АКТИВНА</div>
                <p className="status-sub-text">ВСЕ ПРОЦЕССЫ В НОРМЕ</p>
                <div className="status-meta">РЕЖИМ: АВТОНОМНЫЙ</div>
              </div>
            </div>
          </div>

          {/* ПРАВАЯ КОЛОНКА */}
          <div className="right-specs-panel">
            <h1 className="main-cyber-title">РОСТН <span className="sub-title">| growthN</span></h1>
            
            <p className="main-description">
              <strong>growthN</strong> — урбанистическая интеллектуальная система контролируемого культивирования, разработанная внутри экосистемы <strong>nazrOS</strong> для автономного выращивания растительных культур в условиях цифровой городской среды.
            </p>

            <div className="specs-section">
              <h5 className="section-divider">ТЕХНИЧЕСКИЕ ХАРАКТЕРИСТИКИ</h5>
              <ul className="specs-list">
                <li><span className="spec-name">ГАБАРИТЫ</span><span className="spec-val">1800 х 900 х 600 мм</span></li>
                <li><span className="spec-name">ОБЪЁМ КАМЕРЫ</span><span className="spec-val">420 л</span></li>
                <li><span className="spec-name">УРОВНИ ВЫРАЩИВАНИЯ</span><span className="spec-val">3</span></li>
                <li><span className="spec-name">ПОДКЛЮЧЕНИЕ</span><span className="neon-cyan">nazrOS bio-link</span></li>
                <li><span className="spec-name">ВЛАЖНОСТЬ</span><span className="spec-val">40% - 80%</span></li>
              </ul>
            </div>

            {/* ИНТЕГРИРОВАННАЯ КНОПКА С ВАШИМ SVG ДЛЯ СВЁРТЫВАНИЯ */}
            <div className="back-button-zone">
              <button className="cyber-back-btn" onClick={onClose} aria-label="Назад в систему">
                <svg className="back-arrow-svg" viewBox="0 0 1248 1000" fill="none" xmlns="http://w3.org">
                  <path d="M1247.25 4.3869e-05L983.518 308.201L1032.97 368.129L1247.25 4.3869e-05Z" fill="currentColor"/>
                  <path d="M909.34 401.111L769.23 554.577L868.131 648.362L983.516 452.266L909.34 401.111Z" fill="currentColor"/>
                  <path d="M353.863 461.567L448.684 649.132L561.129 563.137L420.659 401.74L353.863 461.567Z" fill="currentColor"/>
                  <path d="M86.6894 17.0468L303.774 384.581L370.569 341.848L86.6894 17.0468Z" fill="currentColor"/>
                  <path d="M609.888 615.387L499.998 726.498L660.607 1000L829.668 709.404L711.325 615.387L660.607 666.669L609.888 615.387Z" fill="currentColor"/>
                </svg>
                <span className="back-btn-text">НАЗАД В СИСТЕМУ</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default FullProductModal;
