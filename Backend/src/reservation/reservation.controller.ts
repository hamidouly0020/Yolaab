import { Controller, Get, Post, Body, Param, Put, Delete, InternalServerErrorException } from '@nestjs/common';
import { ReservationService } from './reservation.service';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly service: ReservationService) {}

  @Post()
  create(@Body() data: any) {
    return this.service.create(data);
  }

  @Get()
  async findAll() {
    try {
      return await this.service.findAll();
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
