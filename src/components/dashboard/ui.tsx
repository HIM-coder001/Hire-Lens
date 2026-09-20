import { Check } from "lucide-react";

export function Stat({ label, value, detail, trend, icon }: { label: string; value: string; detail: string; trend: string; icon: React.ReactNode }) {
  return <div className="stat-card"><div className="stat-top"><span>{label}</span><div className="stat-icon">{icon}</div></div><div className="stat-value">{value} {trend && <small>{trend}</small>}</div><p>{detail}</p></div>;
}

export function Requirement({ label, detail, matched = false }: { label: string; detail: string; matched?: boolean }) {
  return <div className="requirement"><div className={`check ${matched ? "matched" : "unmatched"}`}>{matched ? <Check size={12} /> : "-"}</div><div><strong>{label}</strong><small>{detail}</small></div></div>;
}
