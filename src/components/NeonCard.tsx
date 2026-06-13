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
  const hasGallery = galleryImages && galleryImages.length > 1;
  const displayImage = hasGallery ? galleryImages[currentIndex] : image;

  // ✅ Ваш кастомный SVG (повёрнутый для стрелки вперёд)
  const ArrowIcon = ({ direction = "right" }: { direction?: "left" | "right" }) => (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 182 227" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={direction === "left" ? "scale-x-[-1]" : ""}
    >
      <path d="M0 226.998L56.093 178.998L67 187.998L0 226.998Z" fill="white"/>
      <path d="M73 165.498L100.931 139.998L118 157.998L82.3103 178.998L73 165.498Z" fill="white"/>
      <path d="M84.0072 64.4016L118.144 81.6591L102.493 102.124L73.1185 76.5584L84.0072 64.4016Z" fill="white"/>
      <path d="M3.0999 15.7764L69.9917 55.2859L62.2142 67.4427L3.0999 15.7764Z" fill="white"/>
      <path d="M112 110.998L132.222 90.998L182 120.229L129.111 150.998L112 129.46L121.333 120.229L112 110.998Z" fill="white"/>
    </svg>
  );

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
            
            {/* ✅ Стрелки переключения галереи */}
            {hasGallery && (
              <div className="absolute inset-0 flex items-center justify-between p-2 pointer-events-none">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onPrev?.();
                  }}
                  className="pointer-events-auto bg-black/60 backdrop-blur-sm p-1.5 rounded-full hover:bg-black/80 transition-colors group/btn"
                >
                  <ArrowIcon direction="left" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onNext?.();
                  }}
                  className="pointer-events-auto bg-black/60 backdrop-blur-sm p-1.5 rounded-full hover:bg-black/80 transition-colors group/btn"
                >
                  <ArrowIcon direction="right" />
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
