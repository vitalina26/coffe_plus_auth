export class CoffeDto {
  name: string;
  price: number;
  description: string;
  beansClass: BeansClass;
  cookingMethod: CookingMethod;
  degreeOfRoasting: DegreeOfRoasting;
  country: Country;
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
export enum Country {}
export enum ProcessingType {
  WASHED = 'washed',
  NATURAL = 'natural',
  MIXED = 'mixed',
}
