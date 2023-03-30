
export class CoffeDto {
    name: string;
    price: number;
    description: string;
    beansClass : BeansClass

}
export enum BeansClass{
    PREMIUM = 'premium',
    SPETIALTY = 'spetialty'
}
