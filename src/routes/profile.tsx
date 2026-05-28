import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Trophy,
  Github,
  Twitch,
  Globe,
  ShoppingBag,
  Upload,
  BookOpen,
  Zap,
  Database,
} from "lucide-react";
import { useState } from "react";
import { PageShell } from "@/components/PageShell";
import { useI18n } from "@/lib/i18n";
import { DatacenterModal } from "@/components/DatacenterModal";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile · nazrOS" },
      { name: "description", content: "Аватар, подключённые аккаунты, инвентарь и достижения." },
      { property: "og:title", content: "Profile · nazrOS" },
      { property: "og:description", content: "Профиль пользователя nazrOS." },
    ],
  }),
  component: ProfilePage,
});

const accounts = [
  { name: "GitHub", handle: "@nazr-os", icon: Github, connected: true, url: "https://github.com" },
  { name: "Twitch", handle: "@nazr.os", icon: Twitch, connected: true, url: "https://twitch.tv" },
  { name: "Darknet", handle: "node://4a82…", icon: Globe, connected: false },
];

const inventory = [
  { name: "cloN-001", tier: "S" },
  { name: "rostN-001", tier: "A" },
  { name: "piN-001", tier: "B" },
  { name: "visioN-001", tier: "S" },
  { name: "blaN-001", tier: "B" },
  { name: "biohN-001", tier: "A" },
  { name: "paragoN-001", tier: "S" },
];

const achievements = [
  { name: "КиберХак 2026", date: "..." },
  { name: "РазрабКонф 2026", date: "..." },
];

const assets = [
  { id: "a1", name: "Интерфейс Спутникого терминал Сфера", size: "245 MB", xp: 500 },
  { id: "a2", name: "Цифровой протокол ПО СтраННо", size: "12 MB", xp: 250 },
];

const knowledge = [
  { title: "KILLNET: Как хакерские группировки стали частью цифровой геополитики", progress: 85, xp: 1200, type: "Публикация" },
  { title: "TEAM YANDEX: Как корпорации заходят в цифровой спорт", progress: 60, xp: 800, type: "Интервью" },
  { title: "Архитектура нового доверия", progress: 45, xp: 600, type: "Алгоритм" },
];

function ProfilePage() {
  const { t } = useI18n();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [uploadedAssets, setUploadedAssets] = useState(assets);
  const [datacenterOpen, setDatacenterOpen] = useState(false);

  const userId = "6a2f7412-8724-4632-9df7-0245a4b7d142";

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 4.5 * 1024 * 1024) {
      alert("Размер файла превышает 4.5 МБ. Выберите изображение поменьше.");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);
    formData.append("userId", userId);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://cybereden-v1-1-0.vercel.app/api/upload/avatar", {
        method: "POST",
        headers: {
          ...(token ? { "Authorization": `Bearer ${token}` } : {}),
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setAvatarPreview(data.avatarUrl);
      } else {
        alert(`Ошибка при сохранении аватара: ${data.error || "Неизвестная ошибка"}`);
      }
    } catch (error) {
      console.error("Ошибка отправки аватара:", error);
      alert("Не удалось связаться с сервером бэкенда.");
    }
  };

  const handleAssetUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedAssets([
        ...uploadedAssets,
        {
          id: `a${uploadedAssets.length + 1}`,
          name: file.name,
          size: `${Math.round(file.size / 1024 / 1024)} MB`,
          xp: Math.floor(Math.random() * 500) + 200,
        },
      ]);
    }
  };

  const handleOAuthClick = (account: typeof accounts[0]) => {
    if (account.url && account.connected) {
      alert(`OAuth подключён к ${account.name}`);
    }
  };

  return (
    <PageShell
      eyebrow={t("profile.eyebrow")}
      title="@f00rtime"
      subtitle={t("profile.subtitle")}
    >
        {/* ОСТАЛЬНАЯ РАЗМЕТКА ПРОФИЛЯ БЕЗ ИЗМЕНЕНИЙ (соответствует вашему первому сообщению) */}
        {/* ... (вставьте остальной JSX код отсюда) */}
    </PageShell>
  );
}
