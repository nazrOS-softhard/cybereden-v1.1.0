
import React, { useState } from 'react';
// Импортируем созданные компоненты
import MarketCard from './components/MarketCard/MarketCard';
import FullProductModal from './components/FullProductModal/FullProductModal';

function App() {
  // Стейт, отвечающий за видимость полноразмерной карточки
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="market-container">
      {/* Сетка товаров вашего маркетплейса */}
      <div className="market-grid">
        
        {/* Передаем функцию открытия модалки в мини-карточку */}
        <MarketCard onOpenModal={() => setIsModalOpen(true)} />
        
      </div>

      {/* Модальное окно рендерится параллельно и слушает стейт */}
      <FullProductModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}

export default App;
