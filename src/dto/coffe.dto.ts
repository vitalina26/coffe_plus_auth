import { IsNotEmpty } from 'class-validator';
export class CoffeDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  beansClass: BeansClass;

  @IsNotEmpty()
  cookingMethod: CookingMethod;

  @IsNotEmpty()
  degreeOfRoasting: DegreeOfRoasting;

  @IsNotEmpty()
  country: Country;

  @IsNotEmpty()
  processingType: ProcessingType;
}

export enum BeansClass {
  PREMIUM = 'premium',
  SPETIALTY = 'spetialty',
}
export enum CookingMethod {
  CEZVA = 'cezva',
  FILTER = 'filter',
  ESPRESSO = 'espresso',
  GEYSER = 'geyser',
}

export enum DegreeOfRoasting {
  OMNI = 'omni',
  LIGHT = 'light',
  MEDIUM = 'medium',
}
export enum Country {
  EC = 'Ecuador',
  ET = 'Ethiopia',
  GT = 'Guatemala',
  GN = 'Guinea',
  ID = 'IDIndonesia',
  KE = 'Kenya',
  CO = 'Colombia',
}
export enum ProcessingType {
  WASHED = 'washed',
  NATURAL = 'natural',
  MIXED = 'mixed',
}
