
import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { X, Download, Zap } from "lucide-react";
import { assetCategories, datacenterAssets } from "@/lib/mockData";

const badgeColors: Record<string, string> = {
  LIVE: "bg-neon-acid text-black",
  NEW: "bg-neon-cyan text-black",
  CORE: "bg-neon-violet text-white",
  SYSTEM: "bg-blue-600 text-white",
  FEATURED: "bg-yellow-600 text-white",
  RESTRICTED: "bg-red-600 text-white",
  EXPERIMENTAL: "bg-orange-600 text-white",
  ALPHA: "bg-purple-600 text-white",
  BETA: "bg-indigo-600 text-white",
  CLASSIFIED: "bg-gray-700 text-white",
};
