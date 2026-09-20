import { Injectable } from '@nestjs/common';

type ScoreInput = { requiredSkills: string[]; candidateSkills: string[]; minYears: number; candidateYears: number };
@Injectable()
export class ScoringService {
  calculate(input: ScoreInput) {
    const normalized = input.candidateSkills.map((skill) => skill.toLowerCase());
    const skills = input.requiredSkills.map((skill) => ({ skill, matched: normalized.includes(skill.toLowerCase()) }));
    const matchedSkills = skills.filter((item) => item.matched).length;
    const skillScore = skills.length ? Math.round((matchedSkills / skills.length) * 70) : 0;
    const yearsMatched = input.candidateYears >= input.minYears;
    const yearsScore = yearsMatched ? 30 : Math.min(30, Math.round((input.candidateYears / Math.max(1, input.minYears)) * 30));
    return { score: skillScore + yearsScore, breakdown: { skills, years: { required: input.minYears, actual: input.candidateYears, matched: yearsMatched, points: yearsScore }, weights: { skills: 70, years: 30 } } };
  }
}
