import { Controller, Get, Post, Body, Param, Put, Delete, InternalServerErrorException, Query, CacheTTL } from '@nestjs/common';
import { ReservationService } from './reservation.service';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly service: ReservationService) {}

  @Post()
  create(@Body() data: any) {
    console.log('📨 Appel envoi mail pour:', data.email);
    return this.service.create(data);
  }

  @Get()
  @CacheTTL(60) // Cache for 60 seconds
  async findAll(@Query('limit') limit?: string, @Query('offset') offset?: string) {
    try {
      const l = limit ? parseInt(limit, 10) : undefined;
      const o = offset ? parseInt(offset, 10) : undefined;
      return await this.service.findAll({ limit: l, offset: o });
    } catch (err) {
      console.error('Error fetching reservations', err);
      throw new InternalServerErrorException('Erreur serveur lors du chargement des réservations');
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
