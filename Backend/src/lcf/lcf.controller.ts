import { Controller, Post, Body, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { LcfService } from './lcf.service';

export class LcfLoginDto {
  code: string;
}

@Controller('lcf')
export class LcfController {
  constructor(private readonly lcfService: LcfService) {}

  @Post('authenticate')
  async authenticate(@Body() dto: LcfLoginDto): Promise<{ token: string; expiresIn: string }> {
    if (!dto.code) {
      throw new BadRequestException('Code d\'accès requis');
    }

    const result = await this.lcfService.verifyCode(dto.code);
    if (!result) {
      throw new UnauthorizedException('Code d\'accès invalide');
    }

    return result;
  }
}
