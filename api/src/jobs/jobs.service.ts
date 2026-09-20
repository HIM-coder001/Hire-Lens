import { Injectable } from '@nestjs/common';
import sanitizeHtml from 'sanitize-html';
import { PrismaService } from '../prisma.service';
@Injectable()
export class JobsService {
  constructor(private readonly prisma: PrismaService) {}
  list(page = 1, limit = 20) { return this.prisma.job.findMany({ skip: (page - 1) * limit, take: Math.min(limit, 50), select: { id: true, title: true, description: true, location: true, remote: true, minYearsExperience: true, requiredSkills: true, screeningQuestions: true, createdAt: true }, orderBy: { createdAt: 'desc' } }); }
  create(input: any) { return this.prisma.job.create({ data: { ...input, description: sanitizeHtml(input.description, { allowedTags: [], allowedAttributes: {} }), screeningQuestions: { create: input.screeningQuestions.map((prompt: string, order: number) => ({ prompt: sanitizeHtml(prompt, { allowedTags: [], allowedAttributes: {} }), order })) } }, include: { screeningQuestions: true } }); }
}
