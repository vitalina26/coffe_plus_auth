import {
  BeansClass,
  CookingMethod,
  Country,
  DegreeOfRoasting,
  ProcessingType,
} from './coffe.dto';

export class CoffeUpdateDto {
  img_url?: string;
  name?: string;
  price?: number;
  description?: string;
  beansClass?: BeansClass;
  cookingMethod?: CookingMethod;
  degreeOfRoasting?: DegreeOfRoasting;
  country?: Country;
  processingType?: ProcessingType;
}
