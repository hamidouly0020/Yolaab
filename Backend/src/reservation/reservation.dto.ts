import { IsString, IsEmail, IsPhoneNumber, IsOptional, IsDateString, IsEnum } from 'class-validator';

export class CreateReservationDto {
  @IsString()
  service: string;

  @IsString()
  clientName: string;

  @IsEmail()
  clientEmail: string;

  @IsString()
  clientPhone: string;

  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateReservationDto {
  @IsOptional()
  @IsString()
  service?: string;

  @IsOptional()
  @IsString()
  clientName?: string;

  @IsOptional()
  @IsEmail()
  clientEmail?: string;

  @IsOptional()
  @IsString()
  clientPhone?: string;

  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsEnum(['pending', 'confirmed', 'completed', 'cancelled'])
  status?: string;
}