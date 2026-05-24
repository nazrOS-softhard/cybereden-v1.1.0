import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Layers, Activity } from 'lucide-react';

export function GrowthNDetails() {
  const [activeTab, setActiveTab] = useState<'info' | 'specs' | 'status'>('info');
  const [cpuLoad, setCpuLoad] = useState<number[]>([45, 50, 48, 55, 60, 58, 62, 65, 59, 63]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuLoad(prev => [...prev.slice(1), Math.floor(Math.random() * (85 - 40) + 40)]);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 mt-4">
      {/* Переключатель вкладок */}
      <div className="flex border-b border-border/40 gap-2">
        {(['info', 'specs', 'status'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-display text-xs uppercase tracking-widest border-t-2 transition-all duration-300 ${
              activeTab === tab 
                ? 'border-neon-cyan text-neon-cyan bg-neon-cyan/5' 
                : 'border-transparent text-muted-foreground hover:text-white hover:bg-surface/20'
            }`}
          >
            {tab === 'info' && 'Назначение'}
            {tab === 'specs' && 'Характеристики'}
            {tab === 'status' && 'Телеметрия'}
          </button>
        ))}
      </div>

      {/* ВКЛАДКА 1: Назначение */}
      {activeTab === 'info' && (
        <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed pl-2 border-l border-neon-violet/40">
            РостН [growthN] — интеллектуальная модульная станция вычислительного роста и кибернетического расширения цифровой среды nazrOS. Создан как ядро разработки, анализа и управления высоконагруженными процессами внутри экосистемы КиберэдэН.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-border bg-surface/10 backdrop-blur">
              <h3 className="font-display text-xs tracking-wider text-neon-cyan uppercase mb-3 flex items-center gap-2">
                <Terminal className="w-4 h-4" /> Сферы применения
              </h3>
              <ul className="space-y-2 text-xs font-mono text-muted-foreground">
                <li className="flex items-center gap-2"><span className="text-neon-cyan">▪</span> Моделирование цифровых пространств</li>
                <li className="flex items-center gap-2"><span className="text-neon-cyan">▪</span> Киберспортивная аналитика и стриминг</li>
                <li className="flex items-center gap-2"><span className="text-neon-cyan">▪</span> AI production pipeline вычисления</li>
              </ul>
            </div>
            <div className="p-4 border border-border bg-surface/10 backdrop-blur">
              <h3 className="font-display text-xs tracking-wider text-neon-violet uppercase mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4" /> Архитектура
              </h3>
              <ul className="space-y-2 text-xs font-mono text-muted-foreground">
                <li className="flex items-center gap-2"><span className="text-neon-violet">▪</span> Рабочая станция архитекторов ядра</li>
                <li className="flex items-center gap-2"><span className="text-neon-violet">▪</span> Узел распределенной кибербезопасности</li>
                <li className="flex items-center gap-2"><span className="text-neon-violet">▪</span> Бесшумное модульное охлаждение</li>
              </ul>
            </div>
          </div>
          <blockquote className="p-4 border border-l-4 border-neon-acid bg-neon-acid/5 font-mono text-xs italic text-neon-acid/90">
            "Внутри цифровой среды nazrOS growthN рассматривается не как устройство, а как вычислительный организм цифровой эпохи."
          </blockquote>
        </motion.div>
      )}

      {/* ВКЛАДКА 2: Характеристики */}
      {activeTab === 'specs' && (
        <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="p-4 border border-border bg-surface/10 font-mono text-xs space-y-3">
          <div className="flex justify-between py-1 border-b border-border/20">
            <span className="text-muted-foreground">ГАБАРИТЫ СТАНЦИИ</span>
            <span className="text-neon-cyan">1800 x 900 x 600 мм</span>
          </div>
          <div className="flex justify-between py-1 border-b border-border/20">
            <span className="text-muted-foreground">ОБЪЁМ БИО-КАМЕРЫ</span>
            <span className="text-neon-cyan">420 литров</span>
          </div>
          <div className="flex justify-between py-1 border-b border-border/20">
            <span className="text-muted-foreground">УРОВНИ ВЫРАЩИВАНИЯ</span>
            <span className="text-neon-cyan">3 независимых лотка</span>
          </div>
          <div className="flex justify-between py-1 border-b border-border/20">
            <span className="text-neon-acid">ЭНЕРГОПОТРЕБЛЕНИЕ</span>
            <span className="text-neon-acid">120 кВт/сутки</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-muted-foreground">ПРОТОКОЛ ШЛЮЗА</span>
            <span className="text-neon-violet">nazrOS bio-link layer v4</span>
          </div>
        </motion.div>
      )}

      {/* ВКЛАДКА 3: Телеметрия */}
      {activeTab === 'status' && (
        <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-[11px] text-center">
            <div className="p-2 border border-border bg-black/40">
              <div className="text-muted-foreground">СТАТУС КОРА</div>
              <div className="text-neon-acid font-bold mt-0.5 animate-pulse">CONNECTED TO CORE</div>
            </div>
            <div className="p-2 border border-border bg-black/40">
              <div className="text-muted-foreground">КЛАСС УЗЛА</div>
              <div className="text-neon-violet font-bold mt-0.5">HYBRID DEV STATION</div>
            </div>
            <div className="p-2 border border-border bg-black/40">
              <div className="text-muted-foreground">ИНТЕРФЕЙС ШЛЮЗА</div>
              <div className="text-neon-cyan font-bold mt-0.5">nazrOS HUD READY</div>
            </div>
          </div>

          <div className="p-4 border border-border bg-surface/10 backdrop-blur space-y-3">
            <div className="flex justify-between items-center font-mono text-xs">
              <span className="flex items-center gap-2 text-neon-cyan"><Activity className="w-4 h-4 animate-pulse" /> Вычислительный поток ИИ</span>
              <span className="text-neon-cyan font-bold">{cpuLoad[cpuLoad.length - 1]}% Load</span>
            </div>
            <div className="h-16 flex items-end gap-1 pt-2 border-b border-l border-border/30 px-2 bg-black/20">
              {cpuLoad.map((val, idx) => (
                <div 
                  key={idx} 
                  className="w-full bg-gradient-to-t from-neon-cyan/40 to-neon-cyan transition-all duration-500"
                  style={{ height: `${val}%` }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
