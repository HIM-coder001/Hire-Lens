"use client";

import { ChevronRight, MoreHorizontal, Play, Sparkles, Video } from "lucide-react";
import type { Candidate } from "./data";
import { Requirement } from "./ui";

export function CandidateDetailRail({ candidate }: { candidate: Candidate }) {
  return <aside className="detail-rail"><div className="detail-header"><span>Candidate overview</span><button><MoreHorizontal size={18} /></button></div><div className="detail-profile"><div className="large-avatar" style={{ background: candidate.color }}>{candidate.initials}</div><h2>{candidate.name}</h2><p>{candidate.role}</p><span className="location">{candidate.location} <span>·</span> Applied {candidate.applied}</span><div className="detail-actions"><button className="secondary-button"><Video size={15} /> Review video</button><button className="square-button"><MoreHorizontal size={17} /></button></div></div><div className="match-card"><div className="match-header"><span>Match score</span><strong>{candidate.score}%</strong></div><div className="big-track"><i style={{ width: `${candidate.score}%` }} /></div><p><Sparkles size={14} /> Strong match for this role</p></div><div className="detail-section"><div className="section-title"><h3>Requirement match</h3><button>View all</button></div><Requirement label="Product strategy" detail="5+ years required · 7 years" matched /><Requirement label="Figma & prototyping" detail="Required skill · Matched" matched /><Requirement label="B2B SaaS experience" detail="Preferred · Not found" /><Requirement label="Remote - US timezones" detail="Required · Matched" matched /></div><div className="detail-section interview-section"><div className="section-title"><h3>Screening responses</h3><span className="response-count">3 / 3</span></div><Response title="Tell us about a complex product..." time="02:14" /><Response title="How do you partner with engineering?" time="01:48" /></div></aside>;
}

function Response({ title, time }: { title: string; time: string }) { return <div className="response-item"><div className="play-icon"><Play size={13} fill="currentColor" /></div><div><strong>{title}</strong><small>{time} · Recorded video</small></div><ChevronRight size={15} /></div>; }
