"use client";

import { Bell, BriefcaseBusiness, ChevronRight, FileText, Plus, Search, Sparkles, Users } from "lucide-react";
import { useState } from "react";
import { candidates, type Candidate } from "./data";
import { CandidateDetailRail } from "./CandidateDetailRail";
import { CandidatePipeline, Stat } from "./CandidatePipeline";
import { Sidebar } from "./Sidebar";

export function Dashboard() {
  const [selected, setSelected] = useState<Candidate>(candidates[0]);
  const [activeNav, setActiveNav] = useState("Overview");
  const [stage, setStage] = useState("All candidates");

  return <div className="app-shell"><Sidebar activeNav={activeNav} onNavigate={setActiveNav} /><main className="main-content"><header className="topbar"><div className="crumbs"><span>Workspace</span><ChevronRight size={14} /><strong>{activeNav}</strong></div><div className="top-actions"><button className="icon-button"><Search size={18} /></button><button className="icon-button notification"><Bell size={18} /><i /></button><div className="top-avatar">AR</div></div></header><div className="content-wrap"><section className="page-heading"><div><p className="eyebrow">MONDAY, SEPTEMBER 22, 2025</p><h1>Good morning, Alex <span>✦</span></h1><p className="subhead">Here&apos;s what&apos;s moving across your hiring pipeline.</p></div><button className="primary-button"><Plus size={17} /> Create a job</button></section><section className="stats-grid"><Stat label="Open roles" value="5" detail="2 closing this week" trend="↑ 20%" icon={<BriefcaseBusiness size={18} />} /><Stat label="Active candidates" value="42" detail="8 new this week" trend="↑ 14%" icon={<Users size={18} />} /><Stat label="Needs review" value="12" detail="Across 3 open roles" trend="" icon={<FileText size={18} />} /><Stat label="Avg. match score" value="82%" detail="Across active pipeline" trend="↑ 6%" icon={<Sparkles size={18} />} /></section><CandidatePipeline candidates={candidates} selected={selected} stage={stage} onSelect={setSelected} onStageChange={setStage} /></div></main><CandidateDetailRail candidate={selected} /></div>;
}
