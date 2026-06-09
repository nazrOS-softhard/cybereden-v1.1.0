
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Lock, Download, ChevronDown, ChevronRight, Wrench, FileText, Cpu, Box, Code2, CheckCircle2, AlertCircle } from "lucide-react";
import { useAuth, apiPost } from "@/lib/auth";

export type StageFile = { name: string; type: "PDF"|"STL"|"GERBER"|"CODE"|"CAD"|"MANUAL"|"VIDEO"; description: string; url?: string; };
export type DeviceStage = { id: number; title: string; description: string; px_cost: number; tools: string[]; time_estimate: string; files: StageFile[]; outcome: string; };

const FILE_ICONS: Record<string,any> = { PDF:FileText, STL:Box, GERBER:Cpu, CODE:Code2, CAD:Box, MANUAL:FileText, VIDEO:FileText };
const FILE_COLORS: Record<string,string> = { PDF:"neon-text-acid", STL:"neon-text-cyan", GERBER:"neon-text-violet", CODE:"neon-text-cyan", CAD:"neon-text-violet", MANUAL:"text-muted-foreground", VIDEO:"neon-text-acid" };

function StageCard({ stage, index, isUnlocked, isAvailable, userXp, itemId, onUnlocked }: {
  stage: DeviceStage; index: number; isUnlocked: boolean; isAvailable: boolean; userXp: number; itemId: string; onUnlocked:(id:number)=>void;
}) {
  const [expanded,  setExpanded]  = useState(isUnlocked && index === 0);
  const [unlocking, setUnlocking] = useState(false);
  const [error,     setError]     = useState<string|null>(null);
  const canAfford = userXp >= stage.px_cost;

  const handleUnlock = async () => {
    if (!canAfford || unlocking) return;
    setUnlocking(true); setError(null);
    try {
      const res = await apiPost("/api/market/unlock-stage", { item_id: itemId, stage_id: stage.id });
      const d   = await res.json();
      if (res.ok) { onUnlocked(stage.id); setExpanded(true); }
      else setError(d.error || "Ошибка");
    } catch(e:any) { setError(e.message||"Нет соединения"); }
    finally { setUnlocking(false); }
  };

  return (
    <div className={`border transition-all ${isUnlocked?"border-neon-cyan/40 bg-neon-cyan/5":isAvailable?"border-border bg-surface/40":"border-border/30 bg-background/20 opacity-60"}`}>
      <button className="w-full flex items-center gap-3 px-4 py-3 text-left" onClick={()=>(isUnlocked||isAvailable)&&setExpanded(e=>!e)}>
        <div className={`w-8 h-8 rounded-full border flex items-center justify-center font-mono text-xs font-bold flex-shrink-0 ${isUnlocked?"border-neon-cyan bg-neon-cyan/20 neon-text-cyan":isAvailable?"border-border text-muted-foreground":"border-border/40 text-muted-foreground/40"}`}>
          {isUnlocked?<CheckCircle2 size={16}/>:index+1}
        </div>
        <div className="flex-1 min-w-0">
          <div className={`font-display text-sm ${isUnlocked?"neon-text-cyan":"text-foreground"}`}>{stage.title}</div>
          <div className="font-mono text-[10px] text-muted-foreground mt-0.5">{stage.time_estimate} · {stage.files.length} файлов</div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {isUnlocked ? <span className="font-mono text-[10px] neon-text-acid">✓ Открыто</span>
            : <span className={`font-mono text-xs font-bold ${canAfford&&isAvailable?"neon-text-acid":"text-muted-foreground"}`}>{stage.px_cost.toLocaleString("ru-RU")} ПХ</span>}
          {(isUnlocked||isAvailable) ? (expanded?<ChevronDown size={14} className="text-muted-foreground"/>:<ChevronRight size={14} className="text-muted-foreground"/>)
            : <Lock size={14} className="text-muted-foreground/40"/>}
        </div>
      </button>
      <AnimatePresence>
        {expanded && (isUnlocked||isAvailable) && (
          <motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}} className="overflow-hidden">
            <div className="px-4 pb-4 space-y-4 border-t border-border/40 pt-3">
              <p className="font-mono text-xs text-muted-foreground leading-relaxed">{stage.description}</p>
              <div className="p-3 border border-neon-acid/20 bg-neon-acid/5">
                <div className="font-mono text-[10px] uppercase tracking-widest neon-text-acid mb-1">Результат стадии</div>
                <div className="font-mono text-xs text-muted-foreground">{stage.outcome}</div>
              </div>
              {stage.tools.length>0&&(
                <div>
                  <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2"><Wrench size={11}/> Оснащение</div>
                  <div className="flex flex-wrap gap-1.5">{stage.tools.map(t=><span key={t} className="px-2 py-0.5 border border-border/50 font-mono text-[10px] text-muted-foreground">{t}</span>)}</div>
                </div>
              )}
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Файлы стадии</div>
                <div className="space-y-1.5">
                  {stage.files.map((file,fi)=>{
                    const Icon=FILE_ICONS[file.type]||FileText;
                    return(
                      <div key={fi} className={`flex items-center justify-between p-2 border ${isUnlocked?"border-border/50 bg-background/40 hover:neon-border transition":"border-border/20 bg-background/10"}`}>
                        <div className="flex items-center gap-2 min-w-0">
                          <Icon size={14} className={FILE_COLORS[file.type]||"text-muted-foreground"}/>
                          <div className="min-w-0">
                            <div className="font-mono text-xs truncate">{file.name}</div>
                            <div className="font-mono text-[10px] text-muted-foreground">{file.description}</div>
                          </div>
                        </div>
                        {isUnlocked ? (file.url?<a href={file.url} target="_blank" rel="noreferrer" className="flex items-center gap-1 font-mono text-[10px] neon-text-acid hover:underline whitespace-nowrap ml-2"><Download size={11}/> Скачать</a>:<span className="font-mono text-[10px] text-muted-foreground/40 ml-2">Скоро</span>)
                          : <Lock size={11} className="text-muted-foreground/30 ml-2 flex-shrink-0"/>}
                      </div>
                    );
                  })}
                </div>
              </div>
              {!isUnlocked&&isAvailable&&(
                <div className="space-y-2">
                  {error&&<div className="flex items-center gap-2 font-mono text-xs text-red-400"><AlertCircle size={12}/> {error}</div>}
                  {!canAfford&&<div className="font-mono text-[10px] text-muted-foreground">Нужно ещё {(stage.px_cost-userXp).toLocaleString("ru-RU")} ПХ</div>}
                  <button onClick={handleUnlock} disabled={!canAfford||unlocking}
                    className={`w-full py-2.5 font-display text-xs tracking-widest uppercase transition ${canAfford&&!unlocking?"bg-primary text-primary-foreground hover:brightness-110 pulse-glow":"bg-background/40 text-muted-foreground cursor-not-allowed border border-border"}`}>
                    {unlocking?"Разблокировка…":`Разблокировать · ${stage.px_cost.toLocaleString("ru-RU")} ПХ`}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function DeviceStages({ itemId, stages, initialUnlocked, onStageUnlocked }: {
  itemId: string; stages: DeviceStage[]; initialUnlocked?: Set<number>; onStageUnlocked?: (id:number)=>void;
}) {
  const { user, refreshUser } = useAuth();
  const [unlockedIds, setUnlockedIds] = useState<Set<number>>(initialUnlocked??new Set());
  useEffect(()=>{ if(initialUnlocked) setUnlockedIds(initialUnlocked); },[initialUnlocked]);

  const userXp=user?.xp??0, totalCost=stages.reduce((s,st)=>s+st.px_cost,0);
  const progressPct=stages.length>0?Math.round((unlockedIds.size/stages.length)*100):0;

  const handleUnlocked=(id:number)=>{ setUnlockedIds(prev=>new Set([...prev,id])); onStageUnlocked?.(id); refreshUser(); };

  if(!user) return <div className="p-6 border border-border/40 text-center font-mono text-xs text-muted-foreground">Войди в CyberEden чтобы открывать стадии</div>;

  return (
    <div className="space-y-4">
      <div className="p-4 border border-border bg-background/40">
        <div className="flex justify-between items-center mb-2">
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Прогресс сборки</div>
          <div className="font-mono text-xs neon-text-acid">{unlockedIds.size} / {stages.length} стадий</div>
        </div>
        <div className="w-full bg-background/60 border border-border h-2 mb-2">
          <motion.div className="bg-neon-cyan h-full" initial={{width:0}} animate={{width:`${progressPct}%`}} transition={{duration:0.5}}/>
        </div>
        <div className="flex justify-between font-mono text-[10px] text-muted-foreground">
          <span>ПХ: <span className="neon-text-cyan">{userXp.toLocaleString("ru-RU")}</span></span>
          <span>Полная стоимость: <span className="neon-text-acid">{totalCost.toLocaleString("ru-RU")} ПХ</span></span>
        </div>
      </div>
      <div className="space-y-2">
        {stages.map((stage,i)=>(
          <StageCard key={stage.id} stage={stage} index={i}
            isUnlocked={unlockedIds.has(stage.id)}
            isAvailable={i===0||unlockedIds.has(stages[i-1].id)}
            userXp={userXp} itemId={itemId} onUnlocked={handleUnlocked}
          />
        ))}
      </div>
      {progressPct===100&&(
        <motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}}
          className="p-4 border border-neon-acid bg-neon-acid/10 text-center">
          <div className="font-display text-lg neon-text-acid mb-1">✓ Все стадии открыты</div>
          <div className="font-mono text-xs text-muted-foreground">У тебя есть все материалы для сборки</div>
        </motion.div>
      )}
    </div>
  );
}
