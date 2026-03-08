import { Controller, Post, Body } from '@nestjs/common'
import { DevisService } from './devis.service'

@Controller('devis')
export class DevisController {
  constructor(private readonly service: DevisService) {}

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
}
