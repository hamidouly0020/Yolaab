import { Controller, Post, Body } from '@nestjs/common'
import { DevisService } from './devis.service'

@Controller('devis')
export class DevisController {
  constructor(private readonly service: DevisService) {}

  @Post()
  async create(@Body() data: any) {
    // minimal server-side validation
    if (!data.nom || !data.prenom || !data.telephone || !data.description) {
      return { ok: false, error: 'Champs requis manquants' }
    }

    const created = await this.service.create(data)
    return { ok: true, devis: created }
  }
}
