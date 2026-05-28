import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Trophy, Github, Twitch, Globe, ShoppingBag, Upload, BookOpen, Zap, Database } from "lucide-react";
import { useState, useEffect } from "react"; // Добавили useEffect
import { PageShell } from "@/components/PageShell";
import { useI18n } from "@/lib/i18n";
import { DatacenterModal } from "@/components/DatacenterModal";

// ... (оставь константы accounts, inventory, achievements как есть)

function ProfilePage() {
  const { t } = useI18n();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [uploadedAssets, setUploadedAssets] = useState<any[]>([]); 
  const [knowledge, setKnowledge] = useState<any[]>([]);
  const [datacenterOpen, setDatacenterOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Загрузка данных при монтировании
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch("https://cybereden-v1-1-0.vercel.app/api/profile", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          setKnowledge(data.knowledge || []);
          setUploadedAssets(data.assets || []);
        }
      } catch (err) {
        console.error("Ошибка загрузки данных профиля", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://cybereden-v1-1-0.vercel.app/api/upload/avatar", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}` // Токен передается здесь
        },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setAvatarPreview(data.avatarUrl);
      } else {
        alert(`Ошибка: ${data.message || data.error}`);
      }
    } catch (error) {
      alert("Ошибка сети при загрузке аватара.");
    }
  };

  // ... (остальные функции handleAssetUpload и handleOAuthClick остаются без изменений)

  return (
    <PageShell eyebrow={t("profile.eyebrow")} title="@f00rtime" subtitle={t("profile.subtitle")}>
      {/* --- ТРЕУГОЛЬНИК И СЕТКА ОСТАЮТСЯ КАК БЫЛИ --- */}
      {/* ... */}
      
      {/* ПРИМЕР ИСПОЛЬЗОВАНИЯ ДИНАМИЧЕСКИХ ДАННЫХ В СЕКЦИИ KNOWLEDGE */}
      {/* Замени твой map в секции Knowledge на этот: */}
      <div className="space-y-4">
        {knowledge.map((item, idx) => (
          <div key={idx} className="space-y-2">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-display text-sm">{item.title}</div>
                <div className="font-mono text-xs text-muted-foreground">{item.type}</div>
              </div>
              <div className="font-mono text-xs neon-text-acid">+{item.xp} ПХ</div>
            </div>
            <div className="w-full bg-background/40 border border-border h-2">
              <div className="bg-neon-cyan h-full transition-all" style={{ width: `${item.progress}%` }} />
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}

export const Route = createFileRoute("/profile")({ component: ProfilePage });
