import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { IsIn, IsString } from 'class-validator';
import { UploadsService } from './uploads.service';
import { JwtGuard } from '../auth/jwt.guard';
class PresignDto { @IsString() filename!: string; @IsIn(['application/pdf', 'video/webm', 'video/mp4']) contentType!: string; }
@Controller('uploads') @UseGuards(JwtGuard) export class UploadsController { constructor(private readonly uploads: UploadsService) {} @Post('presign') presign(@Body() dto: PresignDto) { return this.uploads.presign(dto.filename, dto.contentType); } }
