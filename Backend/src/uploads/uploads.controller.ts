import { Controller, Get, Post, Body } from '@nestjs/common';

@Controller('uploads')
export class UploadsController {
  @Get('test')
  test() {
    return { status: 'ok', message: 'Uploads controller test endpoint' };
  }

  @Post()
  uploadFile(@Body() body: any) {
    return { url: '/uploads/test.mp4', success: true };
  }
}
