import { Controller, Post, Body, Get, Query, CacheTTL } from '@nestjs/common'
import { DevisService } from './devis.service'

@Controller('devis')
export class DevisController {
  constructor(private readonly service: DevisService) {}

  @Post()
  async create(@Body() data: any) {
    // minimal server-side validation - description is optional
    if (!data.nom || !data.prenom || !data.telephone) {
      return { ok: false, error: 'Nom, Prénom et Téléphone sont requis' }
    }

    console.log('📨 Appel envoi mail pour:', data.email);
    const created = await this.service.create(data)
    return { ok: true, devis: created }
  }

  @Post('test-email')
  async testEmail() {
    try {
      const result = await this.service.sendDevisEmail({
        nom: 'Test',
        prenom: 'Email',
        telephone: '0123456789',
        localisation: 'Test Location',
        service: 'Test Service',
        description: 'Ceci est un email de test depuis Railway'
      })
      return { success: true, result }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  @Get()
  @CacheTTL(60) // Cache for 60 seconds
  async findAll(@Query('limit') limit?: string, @Query('offset') offset?: string) {
    const l = limit ? parseInt(limit, 10) : undefined;
    const o = offset ? parseInt(offset, 10) : undefined;
    return await this.service.findAll({ limit: l, offset: o });
  }
}
