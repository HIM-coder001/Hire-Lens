import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
@Injectable()
export class UploadsService { private readonly s3: S3Client; constructor(private readonly config: ConfigService) { this.s3 = new S3Client({ region: config.getOrThrow('S3_REGION'), endpoint: config.getOrThrow('S3_ENDPOINT'), forcePathStyle: true, credentials: { accessKeyId: config.getOrThrow('S3_ACCESS_KEY_ID'), secretAccessKey: config.getOrThrow('S3_SECRET_ACCESS_KEY') } }); } async presign(filename: string, contentType: string) { if (!['application/pdf', 'video/webm', 'video/mp4'].includes(contentType)) throw new Error('Unsupported file type'); const key = `uploads/${crypto.randomUUID()}-${filename.replace(/[^a-zA-Z0-9._-]/g, '')}`; const url = await getSignedUrl(this.s3, new PutObjectCommand({ Bucket: this.config.getOrThrow('S3_BUCKET'), Key: key, ContentType: contentType }), { expiresIn: 300 }); return { key, url, expiresIn: 300 }; } }
