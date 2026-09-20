import { Body, Controller, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { IsArray, IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { ApplicationStatus } from '@prisma/client';
import { ApplicationsService } from './applications.service';
import { JwtGuard } from '../auth/jwt.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
class ApplyDto { @IsString() jobId!: string; @IsInt() @Min(0) yearsExperience!: number; @IsArray() skills!: string[]; @IsArray() responses!: { questionId: string; textFallback?: string; storageKey?: string }[]; }
@Controller('applications') @UseGuards(JwtGuard) export class ApplicationsController { constructor(private readonly applications: ApplicationsService) {} @Get() list(@Req() req: any, @Query('jobId') jobId?: string, @Query('status') status?: ApplicationStatus, @Query('minScore') minScore?: string) { return this.applications.list(req.user, { jobId, status, minScore: minScore ? Number(minScore) : undefined }); } @Get(':id') get(@Req() req: any, @Param('id') id: string) { return this.applications.own(req.user, id); } @Post() @Roles('CANDIDATE') @UseGuards(RolesGuard) create(@Req() req: any, @Body() dto: ApplyDto) { return this.applications.create(req.user.sub, dto); } @Patch(':id/status') @Roles('ADMIN', 'RECRUITER') @UseGuards(RolesGuard) move(@Param('id') id: string, @Body('status') status: ApplicationStatus) { return this.applications.move(id, status); } }
