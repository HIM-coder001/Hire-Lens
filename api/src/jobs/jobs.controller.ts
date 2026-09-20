import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { IsArray, IsBoolean, IsInt, IsString, Max, Min, ArrayMinSize, ArrayMaxSize } from 'class-validator';
import { JobsService } from './jobs.service';
import { JwtGuard } from '../auth/jwt.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
class CreateJobDto { @IsString() title!: string; @IsString() description!: string; @IsString() location!: string; @IsBoolean() remote!: boolean; @IsInt() @Min(0) minYearsExperience!: number; @IsArray() requiredSkills!: string[]; @IsArray() @ArrayMinSize(3) @ArrayMaxSize(5) screeningQuestions!: string[]; }
@Controller('jobs') export class JobsController { constructor(private readonly jobs: JobsService) {} @Get() list(@Query('page') page = '1', @Query('limit') limit = '20') { return this.jobs.list(Number(page), Number(limit)); } @Post() @UseGuards(JwtGuard, RolesGuard) @Roles('ADMIN', 'RECRUITER') create(@Body() dto: CreateJobDto) { return this.jobs.create({ ...dto, education: 'NONE', scoreWeights: { skills: 70, years: 30 } }); } }
