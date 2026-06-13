import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
  layoutId: string;
  onClick?: () => void;
  image?: string;
  eyebrow?: string;
  title: string;
  meta?: string;
  children?: ReactNode;
  // ✅ Пропсы для галереи
  galleryImages?: string[];
  currentIndex?: number;
  onPrev?: () => void;
  onNext?: () => void;
}

export function NeonCard({ 
  layoutId, 
  onClick, 
  image, 
  eyebrow, 
  title, 
  meta, 
  children,
  galleryImages,
  currentIndex = 0,
  onPrev,
  onNext
}: Props) {
  // Определяем, что показывать: галерею или основное изображение
  const hasGallery = galleryImages && galleryImages.length > 1;
  const displayImage = hasGallery ? galleryImages[currentIndex] : image;

  return (
    <button
      layoutId={layoutId}
      onClick={onClick}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
      className="text-left group relative bg-surface/60 backdrop-blur-sm border border-border hover:neon-border transition-all overflow-hidden"
    >
      <div className="hud-corners relative">
        {displayImage && (
          <div className="aspect-[4/3] overflow-hidden bg-background relative">
            <img
              src={displayImage}
              alt={title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            
            {/* ✅ Стрелки переключения галереи — только если есть галерея */}
            {hasGallery && (
              <div className="absolute inset-0 flex items-center justify-between p-2 pointer-events-none">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onPrev?.();
                  }}
                  className="pointer-events-auto bg-black/60 backdrop-blur-sm p-1.5 rounded-full hover:bg-black/80 transition-colors group/btn"
                >
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="white" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="group-hover/btn:scale-110 transition-transform"
                  >
                    <path d="M15 18L9 12L15 6" />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onNext?.();
                  }}
                  className="pointer-events-auto bg-black/60 backdrop-blur-sm p-1.5 rounded-full hover:bg-black/80 transition-colors group/btn"
                >
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="white" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="group-hover/btn:scale-110 transition-transform"
                  >
                    <path d="M9 18L15 12L9 6" />
                  </svg>
                </button>
              </div>
            )}

            {/* ✅ Индикатор текущего изображения */}
            {hasGallery && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 pointer-events-none">
                {galleryImages.map((_, idx) => (
                  <div 
                    key={idx}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${
                      idx === currentIndex 
                        ? 'bg-white scale-110' 
                        : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
        <div className="p-4">
          {eyebrow && (
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] neon-text-cyan mb-1.5">
              {eyebrow}
            </div>
          )}
          <div className="font-display text-base leading-tight group-hover:neon-text-violet transition-colors">
            {title}
          </div>
          {children && <div className="mt-2 text-xs text-muted-foreground line-clamp-2 overflow-hidden"><span>{children}</span></div>}
          {meta && (
            <div className="mt-3 font-mono text-xs neon-text-acid">{meta}</div>
          )}
        </div>
      </div>
    </button>
  );
}
