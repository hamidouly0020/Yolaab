import { IsString, IsOptional, IsEmail } from 'class-validator';

export class CreateReservationDto {
  @IsString()
  nom: string;

  @IsString()
  prenom: string;

  @IsString()
  telephone: string;

  @IsOptional()
  @IsString()
  localisation?: string;

  @IsString()
  typeService: string;

  @IsOptional()
  @IsString()
  duree?: string;

  @IsOptional()
  serviceDetails?: any;

  @IsOptional()
  @IsEmail()
  email?: string;
}

export class UpdateReservationDto {
  @IsOptional()
  @IsString()
  nom?: string;

  @IsOptional()
  @IsString()
  prenom?: string;

  @IsOptional()
  @IsString()
  telephone?: string;

  @IsOptional()
  @IsString()
  localisation?: string;

  @IsOptional()
  @IsString()
  typeService?: string;

  @IsOptional()
  @IsString()
  duree?: string;

  @IsOptional()
  serviceDetails?: any;

  @IsOptional()
  @IsEmail()
  email?: string;
}